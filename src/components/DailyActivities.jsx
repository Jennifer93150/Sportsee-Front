import PropTypes from "prop-types";
import React from 'react';

/** Recharts */
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

/** datas */
import { FacadePattern } from "../services/FacadePattern";
import { useSportSeeApi } from "../services/useSportSeeApi";

/** styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";


const DailyActivityWrapper = styled.div`
  background: ${color.white};
  height: 100%;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  position: absolute;
  top: 1.5rem;
  left: 2rem;

  @media (max-width: 1340px) {
    top: 1rem;
    left: 1.5rem;
  }
`;

const LegendWrapper = styled.div`
  color: ${color.darkgrey};
  display: flex;
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  @media (max-width: 1340px) {
    top: 1rem;
    right: 1.5rem;
  }
`;

const LegendDetail = styled.p`
  margin: 0 0 0 2rem;
`;

const Color = styled.span`
background: ${(props) => props.background};
border-radius: 50%;
display: inline-block;
height: 0.5rem;
margin: 0 0.5rem 0 0;
width: 0.5rem;
`;

const TooltipContainer = styled.div`
border: 2px solid rgba(255, 255, 255, 0.3);
`;

const TooltipLine = styled.p`
background: ${(props) => props.background};
color: white;
font-size: 0.7rem;
font-weight: 500;
padding: 0.75rem;
margin: 0;

`;

/**
 * Daily activity chart
 * @param {number} userId 
 */
export function DailyActivities({ userId }) {
  
  const dailyActivities = FacadePattern( "daily-activity", userId);
  
    return (
        <DailyActivityWrapper>
          <Title>Activité quotidienne</Title>
          <LegendWrapper>
            <LegendDetail>
              <Color background={`${color.black}`}></Color>
              Poids (kg)
            </LegendDetail>
            <LegendDetail>
              <Color background={`${color.red}`}></Color>
              Calories brûlées (kCal)
            </LegendDetail>
          </LegendWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyActivities}
              margin={{ top: 80, right: 48, bottom: 32, left: 48 }}
              barGap={8}
              barCategoryGap="35%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={`${color.grey}`}
              />
              <XAxis
                dataKey="day"
                dy={16}
                padding={{ left: -48, right: -48 }}
                stroke={`${color.darkgreylight}`}
                tickLine={false}
                tick={{ fontSize: 14, fontWeight: 500 }}
              />
              <YAxis
                yAxisId="kg"
                dataKey="kilogram"
                domain={["dataMin - 1", "dataMax + 1"]}
                allowDecimals={false}
                dx={50}
                orientation="right"
                stroke={`${color.darkgreylight}`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="cal"
                dataKey="calories"
                domain={[0, "dataMax + 50"]}
                hide={true}
              />
              <Bar
                yAxisId="kg"
                dataKey="kilogram"
                maxBarSize={7}
                fill={`${color.black}`}
                radius={[50, 50, 0, 0]}
              />
              <Bar
                yAxisId="cal"
                dataKey="calories"
                maxBarSize={7}
                fill={`${color.red}`}
                radius={[50, 50, 0, 0]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "rgba(0, 0, 0, 0.1)",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        
        </DailyActivityWrapper>
       
    );
  }

function CustomTooltip({ active, payload }) {
    if (active && payload) {
      return (
        <TooltipContainer>
          <TooltipLine background={`${color.black}`}>
            {`${payload[0].value} kg`}
          </TooltipLine>
          <TooltipLine background={`${color.red}`}>
            {`${payload[1].value} kCal`}
          </TooltipLine>
        </TooltipContainer>
      );
    }
  
    return null;
  }
  
  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
  };

