import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';

import { endGame } from '../features/additionalData/additionalInfoSlice'
import { gameFinalStates, gameWon } from '../features/board/boardSlice'
import TopInfoBar from '../components/TopInfo';
import Board from '../components/Board/Board';

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

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
      <TopInfoBar/>
      <Board/>
    </MainPage>
  );
}

export default App;
