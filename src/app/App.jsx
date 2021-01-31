import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaHourglassHalf } from 'react-icons/fa';

import { endGame } from '../features/additionalData/additionalInfoSlice';
import { gameFinalStates, gameWon, gamePreRunning, gameOnConfigurations } from '../features/board/boardSlice';
import TopInfoBar from '../components/TopInfo';
import ChooseBoard from '../components/ChooseBoard/index';
import Board from '../components/Board/Board';
import GameEndedDialog from '../components/GameEndedDialog';

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  
  height: 100%;
  width: 100%;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  font-size: 200px;
  margin: auto;
`;

const RenderSwitch = ({ gameState }) => {
  switch ( gameState ) {
    case gameOnConfigurations:
      return <ChooseBoard/>;

    case gamePreRunning:
      return <LoadingWrapper><FaHourglassHalf/>Loading...</LoadingWrapper>;

    default:
      return (
        <>
          <TopInfoBar/>
            <Board
              cellSize={50}
            />
          <GameEndedDialog gameState={gameState}/>
        </>
      );
  }
}

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
      <RenderSwitch gameState={gameState}/>
    </MainPage>
  );
}

export default App;
