import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";

const ACTIVITY_BY_KIND = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

/**
 * Service that retrieves data from SportSeeAPI to feed the dashboard.
 * @param {string} service
 * @param {string} userId
 * @returns {undefined|Object}
 */
export function useSportSeeApi(service, userId) {
  
  /** the "service" parameter allows access to the endpoint*/
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const endpoints ={
    "first-name" :`user/${userId}`,
    "user" : `user/${userId}`, 
    "daily-activity" : `user/${userId}/activity`, 
    "average-sessions": `user/${userId}/average-sessions`,
    "performance" : `user/${userId}/performance`,
    "score" : `user/${userId}`
  }

  let endpoint;
  
  useEffect(() => {
    
    for(let i in endpoints){
        let value = endpoints[i];
        if(i === service){
          endpoint = value;
        }
    }

    setIsLoading(true);

    fetch(`${BASE_URL}/${endpoint}`)
        .then(res =>res.json())
        .then((data) => {
            const extractedData = getDataByService(data, service);
            setData(extractedData)
            setIsLoading(false)
        })
        .catch ((err) =>{
            console.log(err)
            setError(true);
        })
   
  }, [service, userId, endpoint]);

  return { data, isLoading, error };
}

/**
 * Specialized functions to obtain the data of each service.
 * @param {string|Object} data
 * @param {string} service
 * @returns {undefined|string|number|Object|array.Object}
 */
function getDataByService(data, service) {
  if (data) {
    switch (service) {

      case "first-name":
        return getFirstName(data.data.userInfos.firstName);

      case "daily-activity":
        return getDailyActivities(data.data.sessions);

      case "average-sessions":
          return getAverageSessions(data.data.sessions);
  
      case "performance":
        return getActivities(data.data.data);

      case "score":
        return getScore(data);

      case "user":
          return getKeyData(data);

      default:
        console.error(
          `getDataByService error: service "${service}" is not defined.`
        );
        return;
    }
  }

  console.error("getDataByService error: no data to process.");
  return;
}

/**
 * @returns {array.Object} default data for Performance.jsx
 */
// export function defaultActivities() {
//   const activities = [];

//   for (let kind in ACTIVITY_BY_KIND) {
//     activities.push({
//       activity: ACTIVITY_BY_KIND[kind],
//       value: 0,
//     });
//   }

//   return activities;
// }

/**
 * @param {array.Object} userData
 * @returns {array.Object} data for Performance.jsx
 */
function getActivities(userData) {
  const activities = [];
  if (userData) {
    for (let item of userData) {
      activities.push({
        activity: ACTIVITY_BY_KIND[item.kind],
        value: item.value,
      });
    }

    return activities;
  }

  // return defaultActivities();
}

/**
 * @returns {array.Object} default data for AverageSessions.jsx
 */
export function defaultAverageSessions() {
  const averageSessions = [
    {
      day: "L",
      sessionLength: 0,
    },
    {
      day: "M",
      sessionLength: 0,
    },
    {
      day: "M",
      sessionLength: 0,
    },
    {
      day: "J",
      sessionLength: 0,
    },
    {
      day: "V",
      sessionLength: 0,
    },
    {
      day: "S",
      sessionLength: 0,
    },
    {
      day: "D",
      sessionLength: 0,
    },
  ];

  return averageSessions;
}

/**
 * @param {array.Object} userData
 * @returns {array.Object} data for AverageSessions.jsx
 */
function getAverageSessions(userData) {
  
  let averageSessions = defaultAverageSessions();
  
  for (let index in userData) {
    /** replace each default (0) sessionLength with sessionLength from api data 
     * as well as the number of days by the initials of the days
     */
    averageSessions[index].sessionLength = userData[index].sessionLength;
  }
  
  return averageSessions;
}

/** A REVOIR 
 * Build an array with the dates of the 7 previous days.
 * @returns {array.Object} default data for DailyActivities
 */
// export function defaultDailyActivities() {
//   const dailyActivity = [];

//   let currentDate = new Date(Date.now());

//   // eslint-disable-next-line no-unused-vars
//   for (let _ of "1234567") {
   
//     //let date = currentDate.toLocaleDateString("fr");

//     dailyActivity.push({
//       day: currentDate.getDate(),
//       kilogram: 0,
//       calories: 0,
//     });
    
//   }
// console.log(dailyActivity)
//   return dailyActivity;
// }

/**
 * @param {array.Object} userData
 * @returns {array.Object} dailyActivity
 */
function getDailyActivities(userData) {
  
  if (userData) {
    const dailyActivity = [];

    for (let item of userData) {
      /** split the date to get only the day */
      const [yyyy, mm, dd] = item.day.split("-");
      const [diz, unit] = dd
      
      dailyActivity.push({
        /** if the day is less than 10 I keep only the units digit */
        day: `${dd}` < 10 ? unit : `${dd}`,
        kilogram: item.kilogram,
        calories: item.calories,
      });
    }
    return dailyActivity;
  }

  // return defaultDailyActivities();
}

/**
 * @param {string} userData
 * @returns {string} user first name
 */
function getFirstName(userData) {
  return userData === "Impossible d'obtenir l'utilisateur"
    ? "Utilisateur inconnu"
    : userData;
}


// export function defaultKeyData() {
//   return {
//     calorieCount: 0,
//     proteinCount: 0,
//     carbohydrateCount: 0,
//     lipidCount: 0,
//   };
// }


function getKeyData(userData) {
  return userData === "Impossible d'obtenir l'utilisateur" ? "Impossible d'obtenir l'utilisateur" : userData.data.keyData;
  //return userData === "Impossible d'obtenir l'utilisateur" ? defaultKeyData() : userData.data.keyData;
}


function getScore(userData) {
  return userData === "Impossible d'obtenir l'utilisateur" ? 0 : userData.data.todayScore || userData.data.score;
}
