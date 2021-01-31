import React from 'react';
import styled from 'styled-components';
import { FaTrophy, FaChild } from 'react-icons/fa';

import { getTimerAsText } from '../../utils/TimeUtils';

const ScoreDisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 2px;
  margin: 2px;
`;

const ScoreDisplay = ({ playerName, time }) => {
  return (
    <ScoreDisplayWrapper>
      <FaTrophy style={{ marginRight: "5px" }}/>
      { getTimerAsText(time) }
      <div style={{ width: "20px" }}/>
      <FaChild/>
      { playerName }
    </ScoreDisplayWrapper>
  )
}

export default ScoreDisplay;