import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components';

import { calculateDiffToNow, getTimerAsText} from '../../../utils/TimeUtils';
import InfoButton from '../AbstractInfoButton';
import { gameFinalStates } from '../../../features/board/boardSlice'

import { FaStopwatch } from 'react-icons/fa';

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const Timer = () => {
  const [timerMs, setTimerMs] = useState(null);
  
  const gameBeginningTime = useSelector(state => state.additionalData.gameBeginningTime)
  const gameState = useSelector(state => state.board.gameState);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!gameFinalStates.includes(gameState)) {
        setTimerMs(calculateDiffToNow(gameBeginningTime));
      }
    }, 1000)
    return () => {
      clearInterval(timerInterval)
    }
  }, [gameBeginningTime, gameState]);

  return (
      <InfoButton>
        <FaStopwatch/>
        <TextWrapper>
          {getTimerAsText(timerMs)}
        </TextWrapper>
      </InfoButton>
  )
}

export default Timer;