import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumericInput from 'react-numeric-input';
import styled from 'styled-components';

import { FaFlag, FaBorderAll } from 'react-icons/fa';

import { createBoard } from '../../../features/board/boardSlice';
import { startGame } from '../../../features/additionalData/additionalInfoSlice';

const BoarsOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  height: 100px;
  width: 250px;
  border-radius: 20px;
  font-size: 20px;
  background-color: #c2c2c2;

  margin: 10px;
`;

const BoardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 5px;
`;

const InputText = styled(NumericInput)`
  height: 20px;
  width: 30px;
  background-color: white;
  outline: none;
  border-width: 0;
  border-radius: 5px;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const NumericStyledInput = ({ onClick }) => {
  return (
    <InputText
      
    />
  )
} 

export const CastumBoardOption = () => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [flagAmount, setFlagAmount] = useState(null);
  // const { } = useSelector(state => state.board);

  console.log({flagAmount})

  return (
    <BoarsOptionWrapper onClick={() => {
      if ( height && width && flagAmount )
        // dispatch(createBoard({height, width, flagAmount}));
        dispatch(startGame());
      }}
    >
      {"Custom Mode"}
      <BoardContentWrapper>
        <FaFlag/>
        <NumericStyledInput onChange={event => setFlagAmount(event.target.value)}/>
        <div style={{ width: "20px" }}/>
        <FaBorderAll/>
        <NumericStyledInput/>
        {'X'}
        <NumericStyledInput/>
      </BoardContentWrapper>
    </BoarsOptionWrapper>
  )
}

const BoardOption = ({ modeName, height, width, flagAmount }) => {
  const dispatch = useDispatch();
  // const { } = useSelector(state => state.board);

  return (
    <BoarsOptionWrapper onClick={() => {
        dispatch(createBoard({height, width, flagAmount}));
        dispatch(startGame());
      }}
    >
      {modeName}
      <BoardContentWrapper>
        <FaFlag style={{ marginRight: "5px" }}/>
        {flagAmount}
        <div style={{ width: "20px" }}/>
        <FaBorderAll style={{ marginRight: "5px" }}/>
        {`${height} X ${width}`}
      </BoardContentWrapper>
    </BoarsOptionWrapper>
  )
}

export default BoardOption;