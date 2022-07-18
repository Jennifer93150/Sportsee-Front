import PropTypes from "prop-types";
import React from 'react';

/** datas */
import { FacadePattern } from "../services/FacadePattern";

/** styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";


const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  margin: 0;

  @media (max-width: 1340px) {
    font-size: 2.5rem;
  }
`;

const FirstNameUser = styled.span`
  color: ${color.red};
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin: 2rem 0 4rem 0;
  
  @media (max-width: 1340px) {
    font-size: 1.05rem;
    margin: 0.5rem 0 2rem 0;

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
                {firstNameById === "" ? (
                "Nous n'arrivons pas à vous identifier"
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

