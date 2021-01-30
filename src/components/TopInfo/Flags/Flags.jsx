import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';

import InfoButton from '../AbstractInfoButton';
import { gameWon } from '../../../features/board/boardSlice';
import { FaFlag } from 'react-icons/fa';

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const Flags = () => {
  const [totalFlagsAmount, usedFlagsAmount, gameState] = useSelector(
    state => [
      state.board.totalFlagsAmount, 
      state.board.usedFlagsAmount, 
      state.board.gameState
    ], shallowEqual);

  return (
      <InfoButton>
        <FaFlag 
          style={{ color: (gameState === gameWon) ? "green" : (usedFlagsAmount === totalFlagsAmount) && "red"}}
        />
        <TextWrapper>
          {`${usedFlagsAmount}/${totalFlagsAmount}`}
        </TextWrapper>
      </InfoButton>
  )
}

export default Flags;