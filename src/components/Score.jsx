import PropTypes from "prop-types";

/** Recharts */
import { 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer 
} from "recharts";

/** Datas */
import { FacadePattern } from "../services/FacadePattern";
import { useSportSeeApi } from "../services/useSportSeeApi";

/** Styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";

const ScoreContainer = styled.div`
  background: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ScoreTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  @media (max-width: 1340px) {
    top: 1rem;
    left: 1rem;
  }
`;

const ScoreLabel = styled.p`
  font-size: 1rem;
  position: absolute;
  text-align: center;
`;

const ScoreValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export function Score({ userId }) {
  
  const score = FacadePattern( "score", userId);
  
  const data = [
    { name: "completed", value: score, fillColor: `${color.red}` },
    { name: "not-completed", value: 1 - score, fillColor: "transparent" },
  ];

  return (
    <ScoreContainer>
      <ScoreTitle>Score</ScoreTitle>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fillColor}
                cornerRadius="50%"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <ScoreLabel>
        <ScoreValue>{`${100 * score}%`}</ScoreValue>
        <br />
        de votre
        <br />
        objectif
      </ScoreLabel>
    </ScoreContainer>
  );
}

Score.propTypes = {
  userId: PropTypes.number.isRequired,
};

