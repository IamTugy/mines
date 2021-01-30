import reducers from '../board/boardSlice'
import {givenState, expectedState} from '../__snapshots__/shownEmptyCells.js'

describe('test reducers', () => {
  it('should reveal the right cells on reveal action on empty space', () => {
    const actualState = reducers(givenState, {type:'board/handleUserClick',payload:{x:6,y:7}});
    expect(actualState).toEqual(expectedState);
  })
})