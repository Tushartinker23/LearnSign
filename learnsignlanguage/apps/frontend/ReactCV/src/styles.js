import styled from 'styled-components';

const lighten = (color, percent) => {
  const num = parseInt(color.replace("#",""),16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return "#" + (
    0x1000000 + 
    (R<255?R<1?0:R:255)*0x10000 + 
    (G<255?G<1?0:G:255)*0x100 + 
    (B<255?B<1?0:B:255)
  ).toString(16).slice(1);
};

const themeColor = '#00000033';
const primaryColor = '#00aaff';
const secondaryColor = '#333333';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: ${themeColor};
  min-height: 100vh;
  backdrop-filter: blur(2px);  // Adds a subtle blur effect
`;

export const ProjectName = styled.h1`
  text-align: center;
  padding: 20px 0;
  color: ${primaryColor};
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
`;

export const TimelineContainer = styled.div`
  width: 100%;
  margin: 30px auto;
  position: relative;
  padding: 0 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%);

  &:before {
    content: "";
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #FFD700, ${primaryColor});
    left: 50%;
    top: 0;
    position: absolute;
    border-radius: 2px;
    box-shadow: 0 0 5px rgba(0,170,255,0.3);
  }

  @media screen and (max-width: 768px) {
    margin: 20px;
    padding: 0;
    width: 90%;
    &:before {
      left: 0;
    }
  }
`;

export const TimelineItem = styled.div`
  margin-bottom: 50px;
  position: relative;
  &:after, &:before {
    content: '';
    display: block;
    width: 100%;
    clear: both;
  }
`;

export const TimelineIcon = styled.div`
  background: ${props => props.rank === 1 ? '#FFD700' : 
                       props.rank === 2 ? '#C0C0C0' : 
                       props.rank === 3 ? '#CD7F32' : primaryColor};
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -25px;
  border-radius: 50%;
  border: 2px solid ${secondaryColor};
  box-shadow: 0 0 8px rgba(0,0,0,0.2);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 768px) {
    left: 0;
  }
`;

export const TimelineContent = styled.div`
  width: 45%;
  background: rgba(255,255,255,0.9);
  padding: 0;
  box-shadow: 0 3px 12px rgba(0,0,0,0.15);
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
  float: ${props => props.isRight ? 'right' : 'left'};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    ${props => props.isRight ? 'right: 45%;' : 'left: 45%;'}
    top: 15px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    ${props => props.isRight ? 
      `border-right: 7px solid ${primaryColor};` : 
      `border-left: 7px solid ${primaryColor};`
    }
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    float: right;
    &:before {
      left: 10%;
      margin-left: -6px;
      border-left: 0;
      border-right: 7px solid ${primaryColor};
    }
  }
`;

export const RankBadge = styled.div`
  background: ${props => props.rank === 1 ? '#FFD700' : 
                        props.rank === 2 ? '#C0C0C0' : 
                        props.rank === 3 ? '#CD7F32' : primaryColor};
  color: ${props => props.rank <= 3 ? '#1a1a1a' : 'white'};
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid ${lighten(secondaryColor, 10)};
`;

export const PlayerInfo = styled.div`
  padding: 15px;
  background: rgba(245,245,245,0.95);

  h2 {
    margin: 0 0 8px 0;
    color: ${secondaryColor};
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const ScoreDisplay = styled.div`
  span {
    display: inline-block;
    background: ${lighten(primaryColor, 40)};
    color: ${secondaryColor};
    padding: 5px 15px;
    border-radius: 15px;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid ${lighten(primaryColor, 20)};
  }
`;