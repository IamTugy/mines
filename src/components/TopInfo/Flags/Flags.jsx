import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';

import InfoButton from '../AbstractInfoButton';
import { gameWon } from '../../../features/board/boardSlice';
import { FaFlag } from 'react-icons/fa';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FlagAmountWrapper = styled.div`
  margin-left: 10px;
`;

const CommenttWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 15px;
  color: #5a5a5a;
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
        <MainWrapper>
          <RowWrapper>
            <FaFlag 
              style={{ color: (gameState === gameWon) ? "green" : (usedFlagsAmount === totalFlagsAmount) && "red"}}
            />
            <FlagAmountWrapper>
              {`${usedFlagsAmount}/${totalFlagsAmount}`}
            </FlagAmountWrapper>
          </RowWrapper>
          <CommenttWrapper>
            {`Shift+LeftClick for Flag`}
          </CommenttWrapper>
        </MainWrapper>
      </InfoButton>
  )
}

export default Flags;