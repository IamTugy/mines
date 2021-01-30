import boardReduser from '../board/boardSlice';
import rootReducer from '../../app/rootReducer'

import {showEmptyCellsGivenState, showEmptyCellsExpectedState} from '../__fixtures__/shownEmptyCells';
import {showEmptyButNoFlagGivenState, showEmptyButNoFlagsExpectedState} from '../__fixtures__/showEmptyButNoFlag';
import {enterIsFlagModeGivenState, enterIsFlagModeExpectedState} from '../__fixtures__/enterIsFlagMode';
import {addFlagGivenState, addFlagsExpectedState} from '../__fixtures__/addFlag';
import {removeFlagsGivenState, removeFlagsExpectedState} from '../__fixtures__/removeFlag';
import {maxFlagsLimitGivenState, maxFlagsLimitExpectedState} from '../__fixtures__/maxFlagsLimit';
import {wontRevealFlagGivenState, wontRevealFlagExpectedState} from '../__fixtures__/wontRevealFlag';
import {createBoardGivenState, createBoardExpectedState} from '../__fixtures__/createBoard';
import {clickBombAndLoseGivenState, clickBombAndLoseExpectedState} from '../__fixtures__/clickBombAndLose';
import {winGameGivenState, winGameExpectedState} from '../__fixtures__/winGame';

describe('test board reducer', () => {
  it('should reveal the right cells on reveal action on empty space', () => {
    const actualState = boardReduser(showEmptyCellsGivenState, {type:'board/handleUserClick',payload:{x:6,y:7}});
    expect(actualState).toEqual(showEmptyCellsExpectedState);
  })

  it('should display all empty cells and not the flag cell contained in that area', () => {
    const actualState = boardReduser(showEmptyButNoFlagGivenState, {type:'board/handleUserClick',payload:{x:6,y:3}});
    expect(actualState).toEqual(showEmptyButNoFlagsExpectedState);
  })

  it('should enter to flag mode on spesified key (shift) pressed', () => {
    const actualState = boardReduser(enterIsFlagModeGivenState, {type:'board/setIsFlagMode',payload:true});
    expect(actualState).toEqual(enterIsFlagModeExpectedState);
  })

  it('should add a flag to selected cell', () => {
    const actualState = boardReduser(addFlagGivenState, {type:'board/handleUserClick',payload:{x:3,y:8}});
    expect(actualState).toEqual(addFlagsExpectedState);
  })

  it('should remove a flag to selected cell', () => {
    const actualState = boardReduser(removeFlagsGivenState, {type:'board/handleUserClick',payload:{x:3,y:8}});
    expect(actualState).toEqual(removeFlagsExpectedState);
  })
  
  it('should disable any extra flags to be sdded after reaching the limit', () => {
    const actualState = boardReduser(maxFlagsLimitGivenState, {type:'board/handleUserClick',payload:{x:3,y:16}});
    expect(actualState).toEqual(maxFlagsLimitExpectedState);
  })
  
  it('should not reveal flag when clicked on', () => {
    const actualState = boardReduser(wontRevealFlagGivenState, {type:'board/handleUserClick',payload:{x:3,y:8}});
    expect(actualState).toEqual(wontRevealFlagExpectedState);
  })
  
  it('should create a board with same amount of bombs and flags, and also numbers with close bombs', () => {
    const actualState = boardReduser(createBoardGivenState, {type:'board/createBoard',payload:{height:10,width:20,flagAmount:15}});
    expect(actualState).toEqual(createBoardExpectedState);
  })
})

describe('test combine reducers', () => {
  it('should stop the game when bomb was clicked', () => {
    const actualState = rootReducer(clickBombAndLoseGivenState, {type:'board/handleUserClick',payload:{x:4,y:8}});
    expect(actualState).toEqual(clickBombAndLoseExpectedState);
  })
  
  it('should end the game and win when the last bomb was flagged', () => {
    const actualState = rootReducer(winGameGivenState, {type:'board/handleUserClick',payload:{x:9,y:12}});
    expect(actualState).toEqual(winGameExpectedState);
  })
})