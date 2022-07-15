import PropTypes from "prop-types";

/** Styles */
import styled from "styled-components";
import { color } from "../utils/style/styleVariables";

/** Recharts */
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

/** Datas */
import { FacadePattern } from "../hooks/FacadePattern";


const ACTIVITIES_ORDER_IN_CHART = [
  "Intensité",
  "Vitesse",
  "Force",
  "Endurance",
  "Energie",
  "Cardio",
];

export function Performance({ userId }) {

  const performances = FacadePattern( "performance", userId);

  const orderedActivities = [];

  for (let activity of ACTIVITIES_ORDER_IN_CHART) {
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
            fill={`${color.primary500}`}
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

const PerformancesWrapper = styled.div`
  background: ${color.neutral800};
`;