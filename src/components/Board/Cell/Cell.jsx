import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { FaBomb, FaFlag } from 'react-icons/fa';

import { 
    gameFinalStates, Flag, Bomb, Number, Empty, 
    getCellType, gameLost, gameWon, handleUserClick 
} from '../../../features/board/boardSlice';

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
    const cellData = useSelector(state => state.board.cellsContent[x][y], shallowEqual);
    const gameState = useSelector(state => state.board.gameState);
    const isSupermanMode = useSelector(state => state.additionalData.isSupermanMode);
    const dispatch = useDispatch();

    const [cellType, setCellType] = useState(Empty);
    const [isCellSelected, setIsCellSelected] = useState(false);
    const [closedBombs, setClosedBombs] = useState(Empty);

    useEffect(() => {
        setIsCellSelected(cellData.isSelected);
        setClosedBombs(cellData.closeBombs);
        setCellType(getCellType({...cellData, isSupermanMode: (isSupermanMode || (gameState === gameLost))}));
    }, [cellData, isSupermanMode, gameState])

    const handleClick = () => {
        if (!isCellSelected && !gameFinalStates.includes(gameState)) {
            dispatch(handleUserClick({x, y}))
        }
    }

    return (
        <CellWrapper style={style}>
            <CellBackground 
                isSelected={isCellSelected}
                gameState={gameState}
                cellType={cellType}
                isSupermanMode={ isSupermanMode}
                onClick={handleClick}
            >
                <CellContent 
                    type={cellType} 
                    number={closedBombs}
                />
            </CellBackground>
        </CellWrapper>
    )
}

export default Cell;