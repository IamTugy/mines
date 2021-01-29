import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import moment from 'moment';
import styled from 'styled-components';

import { calculateDiffToNow, getTimerAsText} from '../../../utils/TimeUtils';
import InfoButton from '../AbstractInfoButton';
import { gameFinalStates } from '../../../features/board/boardSlice'

import { FaStopwatch } from 'react-icons/fa';

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const TimerDisplay = ({gameState}) => {
  const [timerMs, setTimerMs] = useState(null);
  const gameBeginningTime = useSelector(state => state.additionalData.gameBeginningTime)


  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!gameFinalStates.includes(gameState)) {
        setTimerMs(calculateDiffToNow(moment(gameBeginningTime)));
      }
    }, 1000)
    return () => {
      clearInterval(timerInterval)
    }
  }, [gameBeginningTime, gameState]);

  return (
    <TextWrapper>
      {timerMs ? getTimerAsText(timerMs) : null}
    </TextWrapper>
  )
}

const Timer = () => {
  const gameState = useSelector(state => state.board.gameState);

  return (
      <InfoButton>
        <FaStopwatch 
          style={{ color: gameFinalStates.includes(gameState) && "red"}}
        />
        <TimerDisplay gameState={gameState}/>
      </InfoButton>
  )
}

export default Timer;