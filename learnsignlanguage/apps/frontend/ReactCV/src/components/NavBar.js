// Import dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import closeIcon from "../../src/assets/icons/close.png";
import menuIcon from "../../src/assets/icons/menu.png";
import learnSignLogo from "../../src/assets/images/learnSignLogo.png";
import { NAV_ITEMS } from "../constants/navigation";

const StyledAppBar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 16px 0;
  @media only screen and (max-width: 768px) {
    align-items: flex-start;
  }
`;
const StyledIntro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;
const StyledLogo = styled.img`
 height:4rem;
  padding: 0;
  margin-left: 2rem;
  @media only screen and (max-width: 768px) {
    // width: 10px;
  }
`;
const StyledNavToggle = styled.div`
  display: none;
  &:hover {
    opacity: 0.75;
  }
  @media only screen and (max-width: 768px) {
    display: inline;
    align-self: flex-end;
    cursor: pointer;
  }
`;
const StyledNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const StyledTabBar = styled.nav`
  display: flex;
  flex-direction: row;
  transition: all 0.5s;
  @media only screen and (max-width: 768px) {
    border-radius: 5%;
    background-color: rgb(240, 248, 255, 0.5);
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    display: ${(props) => (props.showNav ? `flex` : `none`)};
  }
`;
const StyledLink = styled(Link)`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 13px;
  font-weight: 400;
  color: black;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const StyledLinkBox = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid black;
  text-align: center;
  &:hover {
    border-bottom: 2px solid rgb(139, 0, 139);
    ${StyledLink} {
      color: rgb(139, 0, 139);
      font-weight: 600;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-top: 12px;
    border-bottom: 1px solid black;
    width: 100%;
    ${StyledLink} {
      font-size: 9px;
    }
  }
`;
const StyledIcon = styled.img`
  height: 1em;
  width: 1em;
  margin-right: 32px;
`;
function NavBar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleToggleClick = () => setIsNavCollapsed(!isNavCollapsed);
  const collapseNav = () => setIsNavCollapsed(true);

  return (
    <StyledAppBar onBlur={collapseNav}>
      <StyledIntro>
        <StyledLogo src={learnSignLogo} alt="Learn Sign" />
      </StyledIntro>
      <StyledNavContainer>
        <StyledNavToggle onClick={handleToggleClick}>
          {isNavCollapsed && <StyledIcon src={menuIcon} alt="Menu" />}
          {!isNavCollapsed && <StyledIcon src={closeIcon} alt="Close menu" />}
        </StyledNavToggle>
        <StyledTabBar showNav={!isNavCollapsed}>
          {Object.keys(NAV_ITEMS).map((key) => {
            const item = NAV_ITEMS[key];
            return (
              <StyledLinkBox key={key}>
                <StyledLink to={item.to}>{item.text}</StyledLink>
              </StyledLinkBox>
            );
          })}
        </StyledTabBar>
      </StyledNavContainer>
    </StyledAppBar>
  );
}

export default NavBar;
