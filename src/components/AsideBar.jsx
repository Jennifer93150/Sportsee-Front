/** assets */
import pictoBodybuilding from "../assets/picto-bodybuilding.png";
import pictoCycling from "../assets/picto-cycling.png";
import pictoMeditation from "../assets/picto-meditation.png";
import pictoSwimming from "../assets/picto-swimming.png";

/** styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";

const AsideBarContainer = styled.div`
  background: ${color.darkblack};
  color: white;
  display: grid;
  grid-template-rows: 3fr 2fr;
  max-width: 140px;
  @media (max-width: 1340px) {
    max-height: 780px;
  }
`;

const ActivitiesList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  list-style-type:none;
  padding-left:20%
`;

const ActivityPicto = styled.img`
  padding: 0.5rem;
`;

const Disclaimer = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  padding: 3rem 0;
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  @media (max-width: 1340px) {
    padding: 2rem;
  }
`;

export function AsideBar() {
  return (
    <AsideBarContainer>
      <nav>
        <ActivitiesList>
          <li>
            <a href="/">
              <ActivityPicto src={pictoMeditation} alt="Méditation" />
            </a>
          </li>
          <li>
            <a href="/">
              <ActivityPicto src={pictoSwimming} alt="Natation" />
            </a>
          </li>
          <li>
            <a href="/">
              <ActivityPicto src={pictoCycling} alt="Cyclisme" />
            </a>
          </li>
          <li>
            <a href="/">
              <ActivityPicto src={pictoBodybuilding} alt="Musculation" />
            </a>
          </li>
        </ActivitiesList>
      </nav>

      <Disclaimer>Copyright SportSee 2021</Disclaimer>
    </AsideBarContainer>
  );
}
