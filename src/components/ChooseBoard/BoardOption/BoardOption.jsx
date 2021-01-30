import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import lodash from 'lodash';

import { FaFlag, FaBorderAll, FaTrophy, FaChild } from 'react-icons/fa';

import { createBoard } from '../../../features/board/boardSlice';
import { startGame } from '../../../features/additionalData/additionalInfoSlice';
import { getTimerAsText } from '../../../utils/TimeUtils';

const BoardOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isClickable && "pointer" };

  height: 125px;
  width: 300px;
  border-radius: 20px;
  font-size: 20px;
  background-color: #c2c2c2;

  margin: 10px;
`;

const CustomOptionWrapper = styled(BoardOptionWrapper)`
  width: 400px;
`;

const BoardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 2px;
  margin: 2px;
`;

const InputText = styled.input`
  height: 20px;
  width: 50px;
  background-color: white;
  outline: none;
  border-width: 0;
  border-radius: 5px;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  color: ${props => props.isTextValid ? 'black' : 'red'};
`;

const isPositiveNumber = str => Number.isInteger(lodash.toNumber(str)) && parseInt(str) > 0;

const NumericStyledInput = ({ onChangeHandler }) => {
  const [isTextValid, setIsTextValid] = useState(true);

  const onChange = event => {
    const newValue = event.target.value;
    const isValueValid = isPositiveNumber(newValue) || ["", null].includes(newValue);
    setIsTextValid(isValueValid);
    if ( isValueValid ) {
      onChangeHandler(parseInt(newValue));
    } else {
      onChangeHandler(null);
    }
  }

  return (
    <InputText 
      onChange={onChange} 
      isTextValid={isTextValid}
      onClick={event => event.stopPropagation()}
    />
  )
} 

const BestScore = ({ gameMode }) => {
  const bestScores = useSelector(state => state.additionalData.bestScores[gameMode]);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => {
    const minTimeScore = lodash.minBy(bestScores, (obj) => obj.time);
    setBestScore(minTimeScore);
  }, [bestScores])

  return (
    bestScore ? 
      (<BoardContentWrapper>
        <FaTrophy style={{ marginRight: "5px" }}/>
        { getTimerAsText(bestScore.time) }
        <div style={{ width: "20px" }}/>
        <FaChild/>
        { bestScore.playerName }
      </BoardContentWrapper>) : null
  )

}

export const CastumBoardOption = () => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [flagAmount, setFlagAmount] = useState(null);
  const modeName = 'Custom Mode';
  const fullGameMode = `${modeName} ${height}X${width}/${flagAmount}`;
  const isClickable = height && width && flagAmount;
  
  return (
    <CustomOptionWrapper 
      isClickable={isClickable}
      onClick={() => {
      if ( isClickable )
        dispatch(createBoard({height, width, flagAmount}));
        dispatch(startGame({ gameMode: fullGameMode}));
      }}
      style={{ backgroundColor: isClickable && "#a8d0a8" }}
    >
      {"Custom Mode"}
      <BoardContentWrapper>
        <FaFlag/>
        <NumericStyledInput onChangeHandler={setFlagAmount}/>
        <div style={{ width: "20px" }}/>
        <FaBorderAll/>
        <NumericStyledInput onChangeHandler={setHeight}/>
        {'X'}
        <NumericStyledInput onChangeHandler={setWidth}/>
      </BoardContentWrapper>
      <BestScore gameMode={fullGameMode}/>
    </CustomOptionWrapper>
  )
}

const BoardOption = ({ modeName, height, width, flagAmount }) => {
  const dispatch = useDispatch();
  const fullGameMode = `${modeName} ${height}X${width}/${flagAmount}`;

  return (
    <BoardOptionWrapper 
      isClickable
      onClick={() => {
        dispatch(createBoard({height, width, flagAmount}));
        dispatch(startGame({ gameMode: fullGameMode }));
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
      <BestScore gameMode={fullGameMode}/>
    </BoardOptionWrapper>
  )
}

export default BoardOption;