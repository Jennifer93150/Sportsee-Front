//import PropTypes from "prop-types";

/** Assets */
import calorieIcon from "../assets/icon-calorie.png";
import proteinIcon from "../assets/icon-protein.png";
import carbohydrateIcon from "../assets/icon-carbohydrate.png";
import lipidIcon from "../assets/icon-lipid.png";

/** Datas */
import { FacadePattern } from "../services/FacadePattern";


/** Styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";

const WrapperCard = styled.div`
  background: ${color.white}; 
  border-radius: 5px;
  display: flex;
  margin: 0 0 20px 0;
  padding: 2rem;
  text-align: left;
  @media (max-width: 1340px) {
    padding: 1.75rem 1.25rem;
  }
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 1.5rem;

  @media (max-width: 1340px) {
    padding: 0 0 0 1rem;
  }
`;

const Measure = styled.div`
  margin: 0.125rem 0;
  font-size: 1.2rem;
  font-weight: 700;

  @media (max-width: 1340px) {
    font-size: 1.1rem;
  }
`;

const NameMeasure = styled.div`
  font-size: 12px
`;

export function CaloriesCard({ userId }) {

  const calorieInfos = FacadePattern( "user", userId);

  return (
    <div>
      <WrapperCard>
        <img src={calorieIcon} alt="Logo calorie" width="60" height="60" />
        
        <InfoCard>
          <Measure data-testid="card-measure">
          {calorieInfos.calorieCount}kCal
          </Measure>
          <NameMeasure>Calories</NameMeasure>
        </InfoCard>
      
      </WrapperCard>
      <WrapperCard>
        <img src={proteinIcon} alt="Logo proteine" width="60" height="60" />
    
        <InfoCard>
          <Measure data-testid="card-measure">
          {calorieInfos.proteinCount}g
          </Measure>
          <NameMeasure>Protéines</NameMeasure>
        </InfoCard>
    
      </WrapperCard>
      <WrapperCard>
        <img src={carbohydrateIcon} alt="Logo glucide" width="60" height="60" />
      
        <InfoCard>
          <Measure data-testid="card-measure">
          {calorieInfos.carbohydrateCount}g
          </Measure>
          <NameMeasure>Glucides</NameMeasure>
        </InfoCard>
      
      </WrapperCard>
      <WrapperCard>
        <img src={lipidIcon} alt="Logo lipide" width="60" height="60" />
      
        <InfoCard>
          <Measure data-testid="card-measure">
          {calorieInfos.lipidCount}g
          </Measure>
          <NameMeasure>Lipides</NameMeasure>
        </InfoCard>
      
      </WrapperCard>
    </div>
  );
}
