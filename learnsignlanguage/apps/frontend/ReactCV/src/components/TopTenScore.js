import "../App.css";
import React, { useEffect } from "react";
import styled from "styled-components";
import backgroundImg from "../assets/images/download1.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { getTopUsersByScore } from '../redux/score';
import {
  TimelineContainer,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  RankBadge,
  PlayerInfo,
  ScoreDisplay
} from '../styles';
const StyledWrapper = styled.div`
  color: rgb(40, 44, 52);
  background-image: url(${backgroundImg});
  background-size: cover;
  height: auto;
  padding: 20px 0 0 0;
`;
const StyledAppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: poppins;
  align-items: center;
  gap: 12px;
  @media only screen and (max-width: 680px) {
    padding-top: 40px;
  }
`;
const StyledAppBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 8px;
`;
const StyledH1 = styled.h1`
  font-size: 28px;
  padding: 0;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
const StyledContentBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
const StyledDescription = styled.div`
  text-align: center;
  margin: 4px;
  max-width: 50rem;
  font-size: 14px;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0;
    max-width: 70%;
  }
`;
const StyledIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function TopTenScore({
  index, limit = 10,
  title = "Top Ten Score",
  description,
}) {
  const dispatch = useDispatch();
  const { topScores, loading, error } = useSelector((state) => state.score);
  useEffect(() => {
    dispatch(getTopUsersByScore());
  }, [dispatch]);

  const displayedScores = topScores && topScores.length > 0
    ? topScores.slice(0, limit)
    : [];
  return (
    <StyledWrapper backgroundImg={backgroundImg}>
      <StyledAppContainer>
        <StyledAppBar>
          <StyledIntroContainer>
            <StyledH1>{title}</StyledH1>
            <StyledDescription>{description}</StyledDescription>
          </StyledIntroContainer>
        </StyledAppBar>
        <StyledContentBody style={{background:"none"}}>
          <TimelineContainer style={{background:"none"}}>
            {loading ? (
              <div>Loading top scores...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : displayedScores.length > 0 ? (
              displayedScores.map((item, index) => (
                <TimelineItem key={item.userId || index} >
                  <TimelineIcon rank={item.rank}>
                    {item.rank === 1 ? (
                      <svg width="21" height="20" viewBox="0 0 24 24">
                        <path fill="#fff" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : item.rank === 2 ? (
                      <svg width="21" height="20" viewBox="0 0 24 24">
                        <path fill="#fff" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : item.rank === 3 ? (
                      <svg width="21" height="20" viewBox="0 0 24 24">
                        <path fill="#fff" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : (
                      <svg width="21" height="20" viewBox="0 0 24 24">
                        <path fill="#fff" d="M12 2c-1.1 0-2 .9-2 2v2h4V4c0-1.1-.9-2-2-2zm-1 5H9v2h6V7h-2zm5 4h-2v6h2v-6zm-7 0H7v6h2v-6zm3 8c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
                      </svg>
                    )}
                  </TimelineIcon>
                  <TimelineContent isRight={index % 2 === 1}>
                    <RankBadge rank={item.rank}>#{item.rank}</RankBadge>
                    <PlayerInfo>
                      <h2>{item.user.name}</h2>
                      <ScoreDisplay>
                        <span>{item.totalScore} PTS</span>
                      </ScoreDisplay>
                    </PlayerInfo>
                  </TimelineContent>
                </TimelineItem>
              ))
            ) : (
              <div>No top scores available</div>
            )}
          </TimelineContainer>
        </StyledContentBody>
      </StyledAppContainer>

    </StyledWrapper>
  );
}

export default TopTenScore;
