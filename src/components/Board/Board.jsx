import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-virtualized';
import styled from 'styled-components';
import useDimensions from "react-use-dimensions";

import Cell from './Cell/Cell';

const BoardWeapper = styled.div`
  display: flex;
  flex: 6;
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
  const [ref, { width, height }] = useDimensions();

  const boardHeight = useSelector(state => state.board.boardHeight);
  const boardWidth = useSelector(state => state.board.boardWidth);

  return (
    <BoardWeapper ref={ref}>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={boardWidth}
        rowCount={boardHeight}
        columnWidth={cellSize}
        rowHeight={cellSize}
        height={ Math.min(cellSize * boardHeight, height ?? 0) }
        width={ Math.min(cellSize * boardWidth + 20, width ?? 0) }
        style={{ outline: 'none', borderWidth: 0 }}
      />
    </BoardWeapper>
  );
}

export default Board;
