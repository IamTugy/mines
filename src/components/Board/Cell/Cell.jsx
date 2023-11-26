import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { FaBomb, FaFlag } from 'react-icons/fa';

import {
    gameFinalStates, Flag, Bomb, Number, Empty,
    getCellType, gameWon, handleUserClick, getInitializedCell,
} from '../../../features/board/boardSlice'
import {useBoardCell} from '../../../app/hooks'

const selectedColor = "#dedede";
const shownUnselectedColor = "#757575";
const unselectedColor = "#c1c1c1";


const CellWrapper = styled.div`
    display: flex;
`;


const CellBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 5px);
  height: calc(100% - 5px);
  background-color: ${props => ((props.isSelected || (props.gameState === gameWon)) ? selectedColor : ((props.isSupermanMode || gameFinalStates.includes(props.gameState)) ? shownUnselectedColor : unselectedColor))};
  border-radius: 20%;
  cursor: ${props => (props.isSelected || gameFinalStates.includes(props.gameState)) ? 'default' : 'pointer'};

  color: ${props => ((props.cellType === Bomb) && props.isSelected) ? "red" : "black"};
  font-size: 25px;
  margin: auto;
`;


const CellContent = ({type, number}) => {
    switch (type) {
        case Flag:
            return <FaFlag/>;
        
        case Bomb:
            return <FaBomb/>;

        case Number:
            return (<div>{number}</div>);

        default:
            return <div/>;
    }
} 


const Cell = ({ x, y, style }) => {
    const {cellData: {isSelected, closeBombs}, cellType} = useBoardCell(x, y);
    const gameState = useSelector(state => state.board.gameState);
    const isSupermanMode = useSelector(state => state.additionalData.isSupermanMode);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!isSelected && !gameFinalStates.includes(gameState)) {
            dispatch(handleUserClick({x, y}));
        }
    }

    return (
        <CellWrapper style={style}>
            <CellBackground 
                isSelected={isSelected}
                gameState={gameState}
                cellType={cellType}
                isSupermanMode={ isSupermanMode}
                onClick={handleClick}
            >
                <CellContent 
                    type={cellType} 
                    number={closeBombs}
                />
            </CellBackground>
        </CellWrapper>
    )
}

export default Cell;
