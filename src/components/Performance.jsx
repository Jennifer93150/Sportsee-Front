import PropTypes from "prop-types";

/** Recharts */
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

/** Datas */
import { FacadePattern } from "../services/FacadePattern";
import { useSportSeeApi } from "../services/useSportSeeApi";
import { MockedData } from "../services/useMockedData";

/** Styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";

const PerformancesWrapper = styled.div`
  background: ${color.black};
`;

const ACTIVITIES_ORDER = [
  "Intensité",
  "Vitesse",
  "Force",
  "Endurance",
  "Energie",
  "Cardio",
];

/**
 * Performances chart
 * @param {number} userId 
 */
export function Performance({ userId }) {
  
  const performances = FacadePattern("performance", userId);
  
  const orderedActivities = [];

  for (let activity of ACTIVITIES_ORDER) {
    for (let item of performances) {
      if (item.activity === activity) {
        orderedActivities.push({
          activity: activity,
          value: item.value,
        });
      }
    }
  }

  return (
    <PerformancesWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={orderedActivities}
          outerRadius={window.innerWidth > 1340 ? "70%" : "60%"}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="activity"
            stroke="white"
            dy={4}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <Radar
            dataKey="value"
            fill={`${color.red}`}
            fillOpacity={0.7}
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </PerformancesWrapper>
  );
}

Performance.propTypes = {
  userId: PropTypes.number.isRequired,
};

