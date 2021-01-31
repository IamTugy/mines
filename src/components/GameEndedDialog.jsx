import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { gameFinalStates, resetBoard, gameWon } from '../features/board/boardSlice';

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 400px;
`;

const DialogContentTextWrapper = styled.div`
  font-size: 40px;
  color: ${props => props.gameState === gameWon ? "green" : "red"};
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const GameEndedDialog = ({gameState}) => {
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.additionalData.playerName);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(gameFinalStates.includes(gameState));
  }, [gameState])

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogWrapper>
        <DialogTitle>{`Hey there ${playerName}`}</DialogTitle>
        <DialogContentTextWrapper gameState={gameState}>
          {`YOU ${gameState}`}
        </DialogContentTextWrapper>
        {gameState === gameWon && 'your score will be added to the score board'}
        <ButtonsRow>
          <Button onClick={() => dispatch(resetBoard())} style={{ margin: '10px' }}>
            back to lobby
          </Button>
          <Button onClick={() => setOpen(false)} style={{ margin: '10px' }}>
            back to board
          </Button>
        </ButtonsRow>
      </DialogWrapper>
    </Dialog>
  );
}

export default GameEndedDialog;