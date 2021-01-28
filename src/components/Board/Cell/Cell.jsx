import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaBomb, FaFlag } from 'react-icons/fa';

import { 
    displayCell, toggleFlag, gameFinalStates, 
    Flag, Bomb, Number, Empty, getCellType 
} from '../../../features/board/boardSlice';
import { useKeyPress } from '../../../utils/hooks';

const unselectedColor = "#dedede";
const shownUnselectedColor = "#757575";
const selectedColor = "#c1c1c1";


const CellWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  background-color: ${props => (props.isSelected ? selectedColor : ((props.isSupermanMode || props.isGameEnded) ? shownUnselectedColor : unselectedColor))};
  border-radius: 20%;
  margin: 5px;
  cursor: ${props => (props.isSelected || props.isGameEnded) ? 'default' : 'pointer'};

  color: ${props => ((props.cellType === Bomb) && props.isSelected) ? "red" : "black"};
  font-size: 25px;
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


const Cell = ({ x, y }) => {
    const cellData = useSelector(state => state.board.cellsContent[x][y]);
    const { gameState } = useSelector(state => state.board);
    const isSupermanMode = useSelector(state => state.additionalData.isSupermanMode);
    const dispatch = useDispatch();

    const [cellType, setCellType] = useState(Empty);
    const [isCellSelected, setIsCellSelected] = useState(false);
    const [closedBombs, setClosedBombs] = useState(Empty);

    const isShiftPressed = useKeyPress("Shift");

    useEffect(() => {
        setIsCellSelected(cellData.isSelected);
        setClosedBombs(cellData.closeBombs);
        setCellType(getCellType({...cellData, isSupermanMode: (isSupermanMode || gameFinalStates.includes(gameState))}));
    }, [cellData, isSupermanMode, gameState])

    const handleClick = () => {
        if (!isCellSelected && !gameFinalStates.includes(gameState)) {
            if (isShiftPressed) {
                dispatch(toggleFlag({x, y}))
            } else {
                dispatch(displayCell({x, y}))
            }
        }
    }

    return (
        <CellWrapper 
            isSelected={isCellSelected}
            isGameEnded={gameFinalStates.includes(gameState)}
            cellType={cellType}
            isSupermanMode={ isSupermanMode}
            onClick={handleClick}
        >
            <CellContent 
                type={cellType} 
                number={closedBombs}
            />
        </CellWrapper>
    )
}

export default Cell;