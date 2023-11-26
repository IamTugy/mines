import {shallowEqual, useSelector} from 'react-redux'
import {gameFinalStates, getCellType, getInitializedCell} from '../features/board/boardSlice'

export const useBoardCell = (x, y) => {
  const boardWidth = useSelector(state => state.board.boardWidth);
  const gameState = useSelector(state => state.board.gameState);
  const isSupermanMode = useSelector(state => state.additionalData.isSupermanMode);
  const location = x * boardWidth + y
  const cellData = useSelector(state => state.board.cellsContent[location], shallowEqual) || getInitializedCell();
  return {
    cellType: getCellType(cellData, (isSupermanMode || gameFinalStates.includes(gameState))),
    cellData,
  }
}
