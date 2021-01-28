import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { createBoard } from '../../features/board/boardSlice';
import { startGame } from '../../features/additionalData/additionalInfoSlice';
import Cell from './Cell/Cell';

const BoardWeapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const RowWeapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const Board = () => {
  const { cellsContent } = useSelector(state => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGame())
    dispatch(createBoard({
      height: 10,
      width: 20,
      flagAmount: 40
    }));
  }, [dispatch])

  return (
    <BoardWeapper>
      {
        cellsContent && cellsContent.map((row, x) => 
        <RowWeapper key={`row-${x}`}>
          {row.map((content, y) => 
          <Cell x={x} y={y} key={`cell-${x}-${y}`}/>)}
        </RowWeapper>)
      }
    </BoardWeapper>
  );
}

export default Board;
