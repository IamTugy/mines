import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { FaCaretSquareLeft } from 'react-icons/fa';

import ScoreDisplay from '../../ScoreDisplay/ScoreDisplay';

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 500px;
  width: 400px;
`;

const TopDialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const DialogTitle = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const DialogContentTextWrapper = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HighScoreListWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;

  padding-left: 50px;
`;

const NoDataText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HighScoreDialog = ({open, closeDialog}) => {
  const gameMode = useSelector(state => state.additionalData.gameMode);
  const bestScores = useSelector(state => state.additionalData.bestScores[gameMode]);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >
      <DialogWrapper>
        <TopDialog>
          <DialogTitle>{'High Score Top 25'}</DialogTitle>
          <DialogContentTextWrapper>
            {gameMode}
          </DialogContentTextWrapper>
        </TopDialog>
        {bestScores ?
          <HighScoreListWrapper>
              {bestScores.map((score, index) => 
                  <ScoreDisplay key={`${gameMode}-${index}`} {...score}/>)
              }
          </HighScoreListWrapper> : 
          <NoDataText>
            No scores to show yet, Now go and be the hero!
          </NoDataText>
        }
        <ButtonsRow>
            <Button onClick={closeDialog} style={{ margin: '10px' }}>
              <FaCaretSquareLeft style={{ marginRight: '5px' }}/>
              back to board
            </Button>
        </ButtonsRow>
      </DialogWrapper>
    </Dialog>
  );
}

export default HighScoreDialog;