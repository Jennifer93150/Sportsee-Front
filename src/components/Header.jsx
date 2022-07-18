import { useParams } from "react-router";
/**assets */
import logo from "../assets/logo.svg";

/** styles */
import styled from "styled-components";
import { color } from "../utils/styleVariables";


const HeaderContainer = styled.header`
  background: ${color.darkblack};
  color: white;
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const LogoLink = styled.a`
  padding: 1rem 2rem;
  @media (max-width: 1340px) {
    padding: 0.75rem 1.5rem;
  }
`;

const LinksList = styled.ul`
  display: grid;
  font-weight: 500;
  grid-template-columns: repeat(4, 1fr);
  height: 100%;
  list-style-type:none;
  text-align: center;
  align-items: center;
  margin: 0;
`;

const HeaderLink = styled.a`
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
  text-decoration: none;
  @media (max-width: 1340px) {
    font-size: 1.25rem;
  }
`;

export function Header() {
  let { id } = useParams();
  let userId = parseInt(id);

  return (
    <div>
      <HeaderContainer data-testid="header">
        <LogoLink href="/">
          <img src={logo} alt="SportSee" />
        </LogoLink>
        {}
        <nav>
          <LinksList>
            <li>
              <HeaderLink href="/">Accueil</HeaderLink>
            </li>
            {userId === 12 ? (
              <li>
                <HeaderLink href="/dashboard/18">Profil</HeaderLink>
              </li>
              ) : (
              <li>
                <HeaderLink href="/dashboard/12">Profil</HeaderLink>
              </li>
            )}
            
            <li>
              <HeaderLink href="/">Réglage</HeaderLink>
            </li>
            <li>
              <HeaderLink href="/">Communauté</HeaderLink>
            </li>
          </LinksList>
        </nav>
      </HeaderContainer>
    </div>
  );
}
