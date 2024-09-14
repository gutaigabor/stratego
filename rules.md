# Stratego rules

## Introduction

On a lonely battlefield you meet your opponent for a skirmish that will decide the fate of your army.
You must plan the battle, advance your men, attack and capture the enemy Flag.

Your Marshal is your strongest man but vulnerable if not protected from the Spy. Your Scouts are weak
but mobile and effective in discovering your enemy's manpower. You need the skills of Miners
to disarm enemy Bombs, so don't lose them all early in the battle. Plant your Bombs skillfully.
They will protect the most precious piece on the gameboard, your Flag.

Stratego is a game where skillful planning, clever deception and good memory work are
used to defeat your opponent. Every time you play,
the battle is different.

## Object

To capture your opponent's Flag.

## Pieces

## 33 movable pieces:

| Name       | Rank | Privilege                                                                                              | Piece(s) on the board |
| ---------- | ---- | ------------------------------------------------------------------------------------------------------ | --------------------- |
| Marshal    | 10   | -                                                                                                      | 1                     |
| General    | 9    | -                                                                                                      | 1                     |
| Colonel    | 8    | -                                                                                                      | 2                     |
| Major      | 7    | -                                                                                                      | 3                     |
| Captain    | 6    | -                                                                                                      | 4                     |
| Lieutenant | 5    | -                                                                                                      | 4                     |
| Sergeant   | 4    | -                                                                                                      | 4                     |
| Miner      | 3    | <ul><li>can disarm bombs</li></ul>                                                                     | 5                     |
| Scout      | 2    | <ul><li>can move any number of squares at once </li><li>can move and attack in the same turn</li></ul> | 8                     |
| Spy        | S    | <ul><li>can slay the Marshal </li><li> gets slain if any character attacks it</li></ul>                | 1                     |

## 7 non-movable pieces:

- 6 bombs
- 1 flag

## General:

The board is made up of 10 rows and 10 columns. That divides the table for 100 fields. Out of those 100 fields, 2x4 fields are covered by lakes (an obstacle) which makes them impossible to move on. Characters can only move around them, but not onto them. The lakes are situated on the following fields (indexes start from 0):

- rowIndex: 4, columnIndex: 2
- rowIndex: 4, columnIndex: 3
- rowIndex: 5, columnIndex: 2
- rowIndex: 5, columnIndex: 3

Those are 4 fields, making up a larger square. And:

- rowIndex: 4, columnIndex: 6
- rowIndex: 4, columnIndex: 7
- rowIndex: 5, columnIndex: 6
- rowIndex: 5, columnIndex: 7

Which are also 4 fields, making up another larger square.

## Preparation phase

Each player has 40 pieces in total that can be placed on the board. Each player must place all 40 pieces on the 4 closest rows to them. The board should look like this after the preparation phase. All pieces are facing down (meaning that the opponent doesn't see them, just the player who plays them).

<center>RED PLAYER</center>

<center>

|     | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 1   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 2   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 3   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 4   |     |     | L   | A   |     |     | L   | A   |     |     |
| 5   |     |     | K   | E   |     |     | K   | E   |     |     |
| 6   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 7   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 8   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |
| 9   | x   | x   | x   | x   | x   | x   | x   | x   | x   | x   |

</center>

<center>BLUE PLAYER</center>

If both players have placed all their pieces, the game can begin.

## Gameplay

The two players alternate turns. The red player moves first.

If a player's turn comes, they must do one of the following:

`Move` - one of your their pieces to an open adjacent space.

OR

`Attack`- one of their opponent's playing pieces.

Note: If they cannot do either action, the game is over and they lose.

### Rules for Movement

The Flag and Bomb pieces cannot be moved and must remain on the squares where they were originally placed throughout the game.

1. Pieces move one square at a time, forward, backward, or sideways. (Exception: See Special Scout Movement Privilege, below).

2. Pieces cannot move diagonally. They cannot jump over another piece. They cannot move onto a square already occupied by another piece (unless attacking).

3. Pieces cannot jump over or move onto the two lake areas in the center of the gameboard.

4. A piece cannot move back and forth between the same two squares in three consecutive turns.

5. Only one piece can be moved on a turn.

#### Special Scout Movement Privilege

A Scout can move any number of open squares forward, backward, or
sideways. This movement will let the opponent know the value of that piece. Once its rank is known, that piece could be left vulnerable for an attack.

### Rules for Attack

The Flag and Bomb pieces cannot attack.

1. Attack Position: When a red and blue piece occupy adjacent spaces either back to back, side to side, or face to face, they are in a position to attack.

2. How to Attack: To attack on your turn, click your attacking piece and then click your opponent's piece (just like in online chess). Then, show the ranks of both pieces to both players.

3. The piece with the lower rank is captured, and removed from the board. If the attacking piece is the remaining and winning piece, it moves onto the space formerly occupied by the defending piece. If the remaining and winning piece is the defending piece, it stays on the square it was on when it was attacked.

4. When pieces of the same rank battle, both pieces are removed from the board.

5. Attacking is always optional.

#### Special Scout Attack Privilege

Scouts are the only pieces allowed to both
move and attack on the same turn. A Scout can move
forward, backward, or sideways any number of open spaces into an attack position. Once in position,
it can then attack.

#### Special Miner Attack Privilege

When any piece (except a Miner, ranked `3`) strikes a Bomb, that piece is lost and removed from the board. Exception: When a Miner strikes a Bomb, the Bomb is defused and removed from the gameboard. The miner then moves onto the Bomb's space on the board. Bombs remain on the same space throughout the game unless they are defused. Bombs cannot attack or move.

#### Special Spy Attack Privilege

The Spy is ranked with the letter "S." If any
piece attacks it, it is captured and removed from the board. But the Spy has a unique attack privilege. It is the only piece that can capture a Marshal (ranked `10`), providing the Spy attacks the Marshal first. If the Marshal attacks first, then the Spy is removed.

## Strategy hints

1. When setting up your pieces, place your Flag somewhere in the back row. Place Bombs around it to protect it. Another strategy is to use Bombs as corner decoys and hide your Flag in the middle of the back row. Then place a high-ranking piece near it for protection. Warning! It is usually not a good idea to place Bombs in the front row. They can block you in.

2. Protect your Miners! If your opponent has surrounded his or her Flag with Bombs, you will need a Miner later in the game to open up a pathway to the Flag.

3. Place some of your Scouts in the first two rows. Use them to reveal the rank of the enemy moving towards you. Keep some Scouts safe and use them later in the game to capture the Flag!

4. Place some of your higher-ranking pieces in the front line to capture Scouts and other lower- ranking pieces.

5. Do not move your higher-ranked pieces into unknown enemy territory. You don't want to lose your Marshal to a Spy or Bomb.

6. Keep your Spy near your General (`#9`). If the enemy Marshal is nearby, you might be able to lure him over to capture your General. Then you can strike back with your Spy!

7. Once you know you own the highest-ranking piece on the board, you can capture anything that moves! Try to remember what pieces have moved during the game.

8. Be wary of pieces that have not moved. If you detect a cluster of pieces that have remained stationary throughout the game, they are more than likely the Bombs and Flag.

## Winning the Game

The first player to attack an opponent's Flag captures it and wins the game.

If all of your movable pieces have
been removed and you cannot move or attack on a turn, you must give up and declare your opponent the winner.
