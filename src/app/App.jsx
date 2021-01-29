import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';

import { endGame } from '../features/additionalData/additionalInfoSlice'
import { gameFinalStates, gameWon } from '../features/board/boardSlice'
import TopInfoBar from '../components/TopInfo';
import ChooseBoard from '../components/ChooseBoard/index'
import Board from '../components/Board/Board';
const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const App = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.board.gameState);

  useEffect(() => {
    if (gameFinalStates.includes(gameState)) {
      dispatch(endGame({ isGameWon: gameState === gameWon }));
    }
  }, [dispatch, gameState])

  return (
    <MainPage>
      <ChooseBoard/>
      <TopInfoBar/>
      <Board
        cellSize={50}
      />
    </MainPage>
  );
}

export default App;
