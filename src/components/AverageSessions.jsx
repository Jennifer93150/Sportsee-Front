import PropTypes from "prop-types";
import React from 'react';

/** Recharts */
import { 
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

/** Datas */
import { FacadePattern } from "../services/FacadePattern";

/** Styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";
import { useSportSeeApi } from "../services/useSportSeeApi";

const AverageSessionsWrapper = styled.div`
background: ${color.red};
position: relative;
`;

const AverageSessionsTitle = styled.h2`
color: rgba(255, 255, 255, 0.6);
position: absolute;
  top: 1.5rem;
  left: 2rem;
font-size: 1rem;
font-weight: 500;
margin: 0;

@media (max-width: 1340px) {
  top: 1rem;
  left: 1.5rem;
}
`;

const TooltipContainer = styled.p`
background: white;
font-size: 0.7rem;
font-weight: 500;
padding: 0.5rem;
`;

/**
 * Average Session Duration Graph
 * @param {number} userId 
 */
export function AverageSessions({ userId }) {
  
  const averageSession = FacadePattern( "average-sessions", userId);
  
    return (
        <AverageSessionsWrapper>
            <AverageSessionsTitle>
                Durée moyenne des
                <br />
                sessions
            </AverageSessionsTitle>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={averageSession}
                outerRadius="75%"
                margin={{ top: 0, right: 12, bottom: 24, left: 12 }}
                >
                <XAxis
                    dataKey="day"
                    stroke="rgba(255, 255, 255, 0.6)"
                    axisLine={false}
                    dy={10}
                    tickLine={false}
                    tick={{
                    fontSize: 12,
                    fontWeight: 500,
                    }}
                />
                <YAxis
                    dataKey="sessionLength"
                    domain={[0, "dataMax + 60"]}
                    hide={true}
                />
                <Line
                    dataKey="sessionLength"
                    type={`${userId === "18" ? "step" : "monotone"}`}
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                    stroke: "rgba(255,255,255, 0.6)",
                    strokeWidth: 10,
                    r: 5,
                    }}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                    stroke: "rgba(0, 0, 0, 0.1)",
                    strokeWidth: 32,
                    }}
                />
                </LineChart>
            </ResponsiveContainer>
        </AverageSessionsWrapper>
       
    );
}


AverageSessions.propTypes = {
    userId: PropTypes.number.isRequired,
};
  
function CustomTooltip({ active, payload }) {
  if (active && payload) {
    return <TooltipContainer>{`${payload[0].value} min`}</TooltipContainer>;
  }
  
    return null;
}
  
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};
  








