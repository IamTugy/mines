# Minesweeper

#### About the game:
The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them,
with help from clues about the number of neighboring mines in each field. 
"LeftClick" is used to reveal a square, Press "Shift"+"LeftClick" to put a flag on a square that you think there is a mine hiding beneath it.
The game is won after all the mines are marked with a flag.

#### Other Features:
 - You can pick a board or generate a custom one.
 - After you entered a board you can click the timewatch to see the high score at this board.
 - Click the mask to enter "Supervillain" mode, and to see all the answers.
 - After you have won or lost, you can stay and review the board, if you're bored just click the arrow to go back to the lobby.

dont worry. all the high scores will be saved for the next time you want to blow some bombs.


## Access
You can access the game [here](https://mmm1513.github.io/mines-web/).


## Run the app
You dont trust github-pages and want to host the app yourself?
no problem. all you need to do is to copy this next lines:
```bash
git clone https://github.com/mmm1513/mines-web.git
cd mines-web
yarn start
```


## Run the tests:
```bash
git clone https://github.com/mmm1513/mines-web.git
cd mines-web
yarn test --watchAll
```
These tests checks all the board logics.

Output example:
```bash
    ✓ should reveal the right cells on reveal action on empty space (32 ms)
    ✓ should display all empty cells and not the flag cell contained in that area (12 ms)
    ✓ should enter to flag mode on spesified key (shift) pressed (5 ms)
    ✓ should add a flag to selected cell (4 ms)
    ✓ should remove a flag to selected cell (5 ms)
    ✓ should disable any extra flags to be sdded after reaching the limit (4 ms)
    ✓ should not reveal flag when clicked on (3 ms)
    ✓ should create a board with same amount of bombs and flags, and also numbers with close bombs (7 ms)
    ✓ should end the game and win when the last bomb was flagged (6 ms)
    ✓ should stop the game when bomb was clicked (3 ms)
    ✓ should show only the number after clicked on a number cell (4 ms)
```


## Publish
To publish the app copy this next lines:
```bash
yarn predeploy  # building the app
yarn deploy  # publish to github-pages
```

## Technologies:
 - React
 - Redux Toolkit
 - Storybook
 - Virtualized grid
 - Styled Components
