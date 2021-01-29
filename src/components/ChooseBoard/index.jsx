import React from 'react';
import styled from 'styled-components';

import BoardOption, { CastumBoardOption } from './BoardOption/BoardOption'

const ChooseBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

export const ChooseBoard = () => {
  return (
    <ChooseBoardWrapper>
      <BoardRowWrapper>
        <BoardOption 
          modeName='Child Mode'
          height={10}
          width={20}
          flagAmount={15}
        />
        <BoardOption 
          modeName="'Trust me im good' Mode"
          height={40}
          width={30}
          flagAmount={250}
        />
      </BoardRowWrapper>
      <BoardRowWrapper>
        <BoardOption 
          modeName='Fuck Me Mode'
          height={300}
          width={300}
          flagAmount={10000}
        />
        <BoardOption 
          modeName='Check my limits Mode'
          height={1000}
          width={1000}
          flagAmount={100000}
        />
      </BoardRowWrapper>
      <BoardRowWrapper>
        <CastumBoardOption/>
      </BoardRowWrapper>
    </ChooseBoardWrapper>
  )
}

export default ChooseBoard;