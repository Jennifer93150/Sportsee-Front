import PropTypes from "prop-types";
import React from 'react';

/** datas */
import { FacadePattern } from "../hooks/FacadePattern";

/** styles */
import styled from "styled-components";
import { color } from "../utils/style/styleVariables";


const MainTitle = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 500;

  @media (max-width: 1340px) {
    font-size: 2.5rem;
  }
`;

const FirstNameUser = styled.span`
  color: ${color.primary500};
`;

const Message = styled.p`
  margin: 2rem 0 4rem 0;

  font-size: 1.1rem;

  @media (max-width: 1340px) {
    margin: 0.5rem 0 2rem 0;

    font-size: 1.05rem;
  }
`;


export function FirstName({ userId }) {

    const firstNameById = FacadePattern("first-name", userId);

    return (
        <div>
            <MainTitle>
                Bonjour <FirstNameUser>{firstNameById}</FirstNameUser>
            </MainTitle>
            <Message>
                {firstNameById === "Utilisateur inconnu" ? (
                ""
                ) : (
                <span>
                    Félicitations ! Vous avez explosé vos objectifs hier
                    !&nbsp;👏
                </span>
                )}
            </Message>
        </div>
    );
}

