import { useParams } from "react-router";

/** components */
import { Header } from "../components/Header";
import { AsideBar } from "../components/AsideBar";
import { FirstName } from "../components/FirstName";
import { DailyActivities } from "../components/DailyActivities";
import { CaloriesCard } from "../components/CaloriesCard";
import { AverageSessions } from "../components/AverageSessions";
import {Performance} from "../components/Performance";
import { Score } from "../components/Score";
import { Error } from "../pages/Error";


/** Datas */
import { useSportSeeApi } from "../services/useSportSeeApi";

/** styles */
import "../styles/dashboard.css";
import styled from "styled-components";

const DashboardContainer = styled.main`
  display: grid;
  grid-template-columns: 7.5rem 1fr;
`;

const MainContent = styled.section`
  padding: 3rem 5rem;

  @media (max-width: 1340px) {
    padding: 1.5rem 2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 1340px) {
    gap: 1rem;
  }
`;

const ChartsGrid = styled.div`
  grid-column: 1/4;

  display: grid;
  grid-template: 20rem 16rem / repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1340px) {
    grid-template: 18rem 14rem / repeat(3, 1fr);
    gap: 1rem;
  }

  > * {
    border-radius: 0.25rem;
    overflow: hidden;
  }
`;

const MainChart = styled.div`
  grid-column: 1/4;
`;

export function Dashboard() {
  let { id } = useParams();
  let userId = parseInt(id);

  const { error } = useSportSeeApi("firstName",userId);
  
  if ( error ) {
    return <Error/>;
  }

  return (
    <div>
      <DashboardContainer>
        <AsideBar />
        <MainContent>
          <FirstName userId={userId}/>
          
          <ContentGrid>
            <ChartsGrid>
              <MainChart>
                <DailyActivities userId={userId}/>
              </MainChart>
              
              <AverageSessions userId={userId} />

              <Performance userId={userId} />

              <Score userId={userId} /> 
            </ChartsGrid>

            <CaloriesCard userId={userId} />
          </ContentGrid>
        </MainContent>
      </DashboardContainer>
    </div>
  );
}

