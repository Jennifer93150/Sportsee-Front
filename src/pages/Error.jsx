import { useParams } from "react-router";

/** components */
import { Header } from "../components/Header";
import { AsideBar } from "../components/AsideBar";

/** styles */
import "../styles/dashboard.css";
import styled from "styled-components";

const DashboardContainer = styled.main`
  display: grid;
  grid-template-columns: 7.5rem 1fr;
`;

const MainContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 5rem;
  @media (max-width: 1340px) {
    padding: 1.5rem 2rem;
  }
`;

const MessageError = styled.div`
  font-size: 40px;
  text-align: center;
  width: 60%;
`

export function Error() {
  
    return (
      <div>
        <DashboardContainer>
          <AsideBar />
          <MainContent>
            <MessageError>
                Oups! <br/>La page que vous demandez n'existe pas.
            </MessageError>
          </MainContent>
        </DashboardContainer>
      </div>
    );
}

