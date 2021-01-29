import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-virtualized';
import styled from 'styled-components';

import Cell from './Cell/Cell';

const BoardWeapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const cellRenderer = ({ columnIndex, rowIndex, style }) => {
  return (
    <Cell 
      x={rowIndex}
      y={columnIndex}
      key={`cell-${rowIndex}-${columnIndex}`}
      style={style}
    />);
}


const Board = ({ cellSize }) => {
  const boardHeight = useSelector(state => state.board.boardHeight);
  const boardWidth = useSelector(state => state.board.boardWidth);

  return (
    <BoardWeapper>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={boardWidth}
        rowCount={boardHeight}
        columnWidth={cellSize}
        rowHeight={cellSize}
        height={ Math.min(cellSize * boardHeight, cellSize * 14) }
        width={ Math.min(cellSize * boardWidth, cellSize * 37) + 20 }
        style={{ outline: 'none', borderWidth: 0 }}
      />
    </BoardWeapper>
  );
}

export default Board;
