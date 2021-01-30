import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import BoardOption, { CastumBoardOption } from './BoardOption/BoardOption';
import { changePlayerName } from '../../features/additionalData/additionalInfoSlice';

const ChooseBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
`;

const BoardRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const PlayerNameInput = () => {
  const prevPlayerName = useSelector(state => state.additionalData.playerName)
  const [playerName, setPlayerName] = useState(prevPlayerName);
  const dispatch = useDispatch()

  useEffect(() => {
    if (playerName !== prevPlayerName){
      dispatch(changePlayerName(playerName));
    }
  }, [dispatch, playerName, prevPlayerName])

  return (
    <TextField 
      label="Player Name" 
      defaultValue={prevPlayerName}
      onChange={event => {setPlayerName(event.target.value)}}
    />
  )

}

export const ChooseBoard = () => {
  return (
    <ChooseBoardWrapper>
      <BoardRowWrapper style={{ marginBottom: '20px' }}>
        <PlayerNameInput/>
      </BoardRowWrapper>
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