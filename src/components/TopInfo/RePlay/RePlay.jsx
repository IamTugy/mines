import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { gameFinalStates, resetBoard } from '../../../features/board/boardSlice'
import InfoButton from '../AbstractInfoButton';
import { FaReply } from 'react-icons/fa';


const RePlay = () => {
  const gameState = useSelector(state => state.board.gameState)
  const dispatch = useDispatch();

  return (
      <InfoButton 
        onClick={() => dispatch(resetBoard())}
      >
        <FaReply style={{ 
          color: gameFinalStates.includes(gameState) && "red",
          fontSize: "60px"}}
        />
      </InfoButton>
  )
}

export default RePlay;