import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { endGame } from '../features/additionalData/additionalInfoSlice';
import { gameFinalStates, gameWon, gameOnConfigurations } from '../features/board/boardSlice';
import TopInfoBar from '../components/TopInfo';
import ChooseBoard from '../components/ChooseBoard/index';
import Board from '../components/Board/Board';
import GameEndedDialog from '../components/GameEndedDialog'

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  
  height: 100%;
  width: 100%;
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
      {
      (gameState === gameOnConfigurations) ? <ChooseBoard/> :
      <>
        <TopInfoBar/>
        <Board
          cellSize={50}
        />
        <GameEndedDialog gameState={gameState}/>
      </>
    }
    </MainPage>
  );
}

export default App;
