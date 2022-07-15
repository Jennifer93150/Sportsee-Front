import {
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_MAIN_DATA,
    USER_PERFORMANCE,
} from "../datas/data";

 
export class MockedData {

   /**
   * @param {number} userId
   * @returns {string}
   */
  getFirstNameById(userId) {
      for (let user of USER_MAIN_DATA) {
        if (user.id === userId) {
          return user.userInfos.firstName;
        }
      }
  
      return "Utilisateur inconnu";
  }
  
  /**
   * @param {number} userId
   * @returns {array.Object}
   */
  getPerformancesById(userId) {
    const ACTIVITY_BY_KIND = {
      1: "Cardio",
      2: "Energie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };

    const activities = [];

    for (let user of USER_PERFORMANCE) {
      if (user.userId === userId) {
        for (let item of user.data) {
          activities.push({
            activity: ACTIVITY_BY_KIND[item.kind],
            value: item.value,
          });
        }

        return activities;
      }
    }
  }

  /**
   * @param {number}} userId
   * @returns {array.Object}
   */
  getAverageSessionsById(userId) {
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

    for (let user of USER_AVERAGE_SESSIONS) {
      if (user.userId === userId) {
        for (let index in user.sessions) {
          averageSessions[index].sessionLength =
            user.sessions[index].sessionLength;
        }
      }
    }

    return averageSessions;
  }

  /**
   * @param {number}} userId
   * @returns {array.Object}
   */
  getDailyActivitiesById(userId) {
    const dailyActivity = [];

    for (let user of USER_ACTIVITY) {
      if (user.userId === userId) {
        user.sessions.forEach((item, index) => {
          dailyActivity.push({
            day: `${index+1}`,
            kilogram: item.kilogram,
            calories: item.calories,
          });
        });
       
        return dailyActivity;
      }
    }

  }

  /**
   * @param {number} userId
   * @returns {Object}
   */
  getKeyDataById(userId) {
    for (let user of USER_MAIN_DATA) {
      if (user.id === userId) {
        return user.keyData;
      }
    }

    return this.defaultKeyData;
  }

  /**
   * @param {number} userId
   * @returns {number}
   */
  getScoreById(userId) {
    for (let user of USER_MAIN_DATA) {
      if (user.id === userId) {
        return user.todayScore;
      }
    }
    return 0;
  }

  /**
   * Specialized functions to obtain the data of each service.
   * @param {string} service
   * @param {number} userId
   * @returns {undefined|string|number|Object|array.Object}
   */
   getDataMockedByService(service, userId) {
    if (userId) {
      switch (service) {

        case "first-name":
          return this.getFirstNameById(userId);

        case "daily-activity":
          return this.getDailyActivitiesById(userId);

        case "average-sessions":
          return this.getAverageSessionsById(userId);

        case "performance":
            return this.getPerformancesById(userId);

        case "score":
          return this.getScoreById(userId);

        case "user":
          return this.getKeyDataById(userId);

        default:
          console.error(
            `getDataMockedByService error: service "${service}" is not defined.`
          );
          return;
      }
    }

    return;
  }
}
  