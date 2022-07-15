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
import { FacadePattern } from "../hooks/FacadePattern";

/** styles */
import styled from "styled-components";
import { color } from "../utils/style/styleVariables";


export function DailyActivities({ userId }) {

  const dailyActivities = FacadePattern( "daily-activity", userId);
  
    return (
        <DailyActivityWrapper>
          <Title>Activité quotidienne</Title>
          <LegendWrapper>
            <LegendDetail>
              <Color background={`${color.neutral800}`}></Color>
              Poids (kg)
            </LegendDetail>
            <LegendDetail>
              <Color background={`${color.primary500}`}></Color>
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
                stroke={`${color.neutral200}`}
              />
              <XAxis
                dataKey="day"
                dy={16}
                padding={{ left: -48, right: -48 }}
                stroke={`${color.neutral400}`}
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
                stroke={`${color.neutral400}`}
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
                fill={`${color.neutral800}`}
                radius={[50, 50, 0, 0]}
              />
              <Bar
                yAxisId="cal"
                dataKey="calories"
                maxBarSize={7}
                fill={`${color.primary500}`}
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
          <TooltipLine background={`${color.neutral800}`}>
            {`${payload[0].value} kg`}
          </TooltipLine>
          <TooltipLine background={`${color.primary500}`}>
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


  const DailyActivityWrapper = styled.div`
  position: relative;

  height: 100%;

  background: ${color.neutral100};
`;

const Title = styled.h2`
  position: absolute;
  top: 1.5rem;
  left: 2rem;

  margin: 0;

  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 1340px) {
    top: 1rem;
    left: 1.5rem;
  }
`;

const LegendWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 1.5rem;
  right: 2rem;

  color: ${color.neutral500};

  @media (max-width: 1340px) {
    top: 1rem;
    right: 1.5rem;
  }
`;

const LegendDetail = styled.p`
  margin: 0 0 0 2rem;
`;

const Color = styled.span`
display: inline-block;

width: 0.5rem;
height: 0.5rem;
margin: 0 0.5rem 0 0;
border-radius: 50%;

background: ${(props) => props.background};
`;

const TooltipContainer = styled.div`
border: 2px solid rgba(255, 255, 255, 0.3);
`;

const TooltipLine = styled.p`
padding: 0.75rem;
margin: 0;

color: white;
font-size: 0.7rem;
font-weight: 500;

background: ${(props) => props.background};
`;