/* Game Service */
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { LobbyRepository } from '../repository/lobby.repository';
import { MatchRepository } from '../repository/match.repository';
import { CharacterRepository } from '../repository/character.repository';
import { Cell, MatchStateType } from '../schemas/match.schema';
import { Character, CharacterType } from '../schemas/character.schema';

const BOARD_ROW_COL = 10;
const START_BOARD_ROW = 4;
const BLUE_START_ROW = 6;
@Injectable()
export class GameService {
  constructor(
    private readonly lobbyRepository: LobbyRepository,
    private readonly matchRepository: MatchRepository,
    private readonly characterRepository: CharacterRepository,
  ) {}

  /* Create lobby user if possible */
  async createLobby(userId: string, socketId: string) {
    const query = {
      userId: userId,
    };

    // Find the current user from the request
    const user = await this.lobbyRepository.findOne(query);
    // Get all users
    const allUser = await this.lobbyRepository.find({});

    if (user) {
      // Update socket id for lobby user
      await this.lobbyRepository.upsert(query, {
        userId,
        socketId,
        isReady: false,
      });
    } else if (allUser && allUser.length < 2) {
      // If 2 users not yet in lobby create user
      await this.lobbyRepository.create({
        userId,
        socketId,
        isReady: false,
      });
    } else {
      // If 2 users already in lobby, throw Exception
      throw new WsException('There are too many players');
    }
  }

  /* Delete lobby user by userId */
  async deleteLobbyUser(userId: string) {
    await this.lobbyRepository.deleteOne({
      userId: userId,
    });
  }

  /* Find lobby user ny userId */
  async findLobbyUser(userId: string) {
    const query = {
      userId: userId,
    };

    return await this.lobbyRepository.findOne(query);
  }

  /* There is maximum 2 lobby users, find the other user by userId */
  async findOtherLobbyUser(userId: string) {
    const query = {
      userId: { $ne: userId },
    };

    return await this.lobbyRepository.findOne(query);
  }

  /* Set lobby user to ready */
  async changeLobbyUserReady(userId: string) {
    const user = await this.findLobbyUser(userId);

    user.isReady = !user.isReady;

    const query = {
      userId: userId,
    };

    return await this.lobbyRepository.upsert(query, user);
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  /* Create match */
  async createMatch(userId: string, otherUserId: string) {
    const random = this.getRandomInt(2);

    let blueUserId = userId;
    let redUserId = otherUserId;

    if (random === 0) {
      redUserId = userId;
      blueUserId = otherUserId;
    }

    return await this.matchRepository.create({
      matchState: MatchStateType.NOT_STARTED,
      currentTurnUserId: redUserId,
      redUserId: redUserId,
      blueUserId: blueUserId,
      redStartBoard: [],
      blueStartBoard: [],
      currentBoard: [],
    });
  }

  /* Set starter board for given user */
  async setMatchStartingBoard(
    data: { matchId: string; board: Array<Array<Character>> },
    userId: string,
  ) {
    const query = {
      _id: data.matchId,
    };

    const match = await this.matchRepository.findOne(query);

    const isRedUser = match.redUserId === userId;

    if (isRedUser) {
      match.redStartBoard = data.board;
    } else {
      match.blueStartBoard = data.board;
    }

    await this.matchRepository.upsert(query, match);
  }

  /* Fill board with null values */
  private initEmptyBoard() {
    const initBoard: Array<Array<Cell | null>> = [];

    // Create board matrix
    for (let i = 0; i < BOARD_ROW_COL; i++) {
      const row: Array<Cell | null> = [];
      for (let j = 0; j < BOARD_ROW_COL; j++) {
        const cell = null;
        row.push(cell);
      }
      initBoard.push(row);
    }

    return initBoard;
  }

  /* Create starting full board */
  async createCurrentBoard(matchId: string) {
    const query = {
      _id: matchId,
    };

    const match = await this.matchRepository.findOne(query);

    const redStartBoard = match.redStartBoard;
    const blueStartBoard = match.blueStartBoard;
    const redUserId = match.redUserId;
    const blueUserId = match.blueUserId;

    let initBoard: Array<Array<Cell | null>> = this.initEmptyBoard();

    // Fill board with red user characters
    for (let i = 0; i < START_BOARD_ROW; i++) {
      for (let j = 0; j < BOARD_ROW_COL; j++) {
        initBoard[i][j] = {
          userId: redUserId,
          character: redStartBoard[i][j],
        };
      }
    }

    // Fill board with blue user characters
    for (let i = 0; i < START_BOARD_ROW; i++) {
      for (let j = 0; j < BOARD_ROW_COL; j++) {
        initBoard[i + BLUE_START_ROW][j] = {
          userId: blueUserId,
          character: blueStartBoard[i][j],
        };
      }
    }

    initBoard = await this.setLakeCells(initBoard);

    match.currentBoard = initBoard;

    return await this.matchRepository.upsert(query, match);
  }

  /* User move */
  async userMove(
    matchId: string,
    from: { i: number; j: number },
    to: { i: number; j: number },
    userId: string,
    otherUserId: string,
  ) {
    // Find current match
    const query = {
      _id: matchId,
    };

    const match = await this.matchRepository.findOne(query);

    // Handle user move
    const {
      message: message,
      status: status,
      board: board,
    } = this.handleMove(match.currentBoard, from, to, userId, otherUserId);

    if (status !== 'invalid') {
      match.currentTurnUserId = otherUserId;
    }

    match.currentBoard = board;

    const updatedMatch = await this.matchRepository.upsert(query, match);

    return { match: updatedMatch, message, status };
  }

  /* Handles different outcomes of move */
  private handleMove(
    board: Array<Array<Cell | null>>,
    from: { i: number; j: number },
    to: { i: number; j: number },
    userId: string,
    otherUserId: string,
  ) {
    const fromCell = board[from.i][from.j];
    const toCell = board[to.i][to.j];

    // ----- Handle invalid -----
    // Handle invalid from cell
    if (!fromCell) {
      return { message: 'INVALID', status: 'invalid', board: board };
    }

    // Handle if user attacks own piece
    if (toCell && toCell.userId && toCell.userId !== otherUserId) {
      return { message: 'INVALID', status: 'invalid', board: board };
    }

    // Handle is move is not valid
    if (!this.isValidMove(from, to)) {
      return { message: 'INVALID MOVE', status: 'invalid', board: board };
    }

    // Handle if non-movable piece is moved
    if (
      !fromCell ||
      fromCell.character.characterType === CharacterType.BOMB ||
      fromCell.character.characterType === CharacterType.FLAG
    ) {
      return { message: 'INVALID', status: 'invalid', board: board };
    }

    // ----- Handle win by capturing the Flag -----
    if (toCell && toCell.character.characterType === CharacterType.FLAG) {
      return { message: 'WIN', status: 'win', board: board };
    }

    // ----- Handle movement -----
    if (fromCell.character && !toCell) {
      board[to.i][to.j] = fromCell;
      board[from.i][from.j] = null;
      return { message: 'MOVED', status: 'moved', board: board };
    }

    // ----- Handle attack -----
    // Handle Spy attacks
    if (
      fromCell.character.characterType === CharacterType.SPY &&
      toCell &&
      toCell.character.characterType === CharacterType.MARSHAL
    ) {
      board[to.i][to.j] = fromCell;
      board[from.i][from.j] = null;
      return { message: 'ATTACK', status: 'attack', board: board };
    }

    // Handle bomb encounters
    if (
      fromCell.character.characterType === CharacterType.MINER &&
      toCell &&
      toCell.character.characterType === CharacterType.BOMB
    ) {
      board[to.i][to.j] = fromCell;
      board[from.i][from.j] = null;
      return { message: 'ATTACK', status: 'attack', board: board };
    }

    // Handle general encounters
    if (fromCell.character && toCell && toCell.userId === otherUserId) {
      // Handle rank scenarios
      if (fromCell.character.rank > toCell.character.rank) {
        board[to.i][to.j] = fromCell;
        board[from.i][from.j] = null;
      } else if (fromCell.character.rank < toCell.character.rank) {
        board[from.i][from.j] = null;
      } else {
        board[to.i][to.j] = null;
        board[from.i][from.j] = null;
      }
    }

    // ----- Handle win by no more move for opponent -----
    if (!this.hasMoreMoves(userId, board)) {
      return { message: 'LOSE', status: 'lose', board: board };
    }

    if (!this.hasMoreMoves(otherUserId, board)) {
      return { message: 'WIN', status: 'win', board: board };
    }

    return { message: 'ATTACK', status: 'attack', board: board };
  }

  /* Return if the user has any movable pieces left */
  private hasMoreMoves(userId: string, board: Array<Array<Cell | null>>) {
    // Find any movable piece on the board for user
    const hasMoreMoves =
      board.find((row) => {
        return (
          row.find((cell) => {
            return (
              cell &&
              cell.userId === userId &&
              cell.character &&
              cell.character.characterType !== CharacterType.BOMB &&
              cell.character.characterType !== CharacterType.FLAG
            );
          }) != null
        );
      }) != null;

    return hasMoreMoves;
  }

  /* Validate move on board */
  private isValidMove(
    from: { i: number; j: number },
    to: { i: number; j: number },
  ) {
    // Diagonal movement not valid
    if (from.i !== to.i && from.j !== to.j) {
      return false;
    }

    // Greater movement then 1 is not valid
    const toSum = to.i + to.j;
    const fromSum = from.i + from.j;

    if (toSum > fromSum + 1 || toSum < fromSum - 1) {
      return false;
    }

    return true;
  }

  /* Set lake cells on board */
  async setLakeCells(initBoard: Array<Array<Cell | null>>) {
    const lakeCharacter = await this.characterRepository.findOne({
      characterType: CharacterType.LAKE,
    });

    initBoard[4][2] = { userId: undefined, character: lakeCharacter };
    initBoard[4][3] = { userId: undefined, character: lakeCharacter };
    initBoard[5][2] = { userId: undefined, character: lakeCharacter };
    initBoard[5][3] = { userId: undefined, character: lakeCharacter };
    initBoard[4][6] = { userId: undefined, character: lakeCharacter };
    initBoard[4][7] = { userId: undefined, character: lakeCharacter };
    initBoard[5][6] = { userId: undefined, character: lakeCharacter };
    initBoard[5][7] = { userId: undefined, character: lakeCharacter };

    return initBoard;
  }

  /* Map the board that the other player"s characters are unknown */
  mapCurrentBoardForPlayer(
    currentBoard: Array<Array<Cell | null>>,
    otherUserId: string,
  ) {
    const userBoard = JSON.parse(JSON.stringify(currentBoard)) as Array<
      Array<Cell | null>
    >;

    userBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell && cell.character && cell.userId === otherUserId) {
          cell.character.characterType = CharacterType.UNKNOWN;
        }
      });
    });

    return userBoard;
  }

  /* Return all characters from DB */
  async getCharacters() {
    let characters = await this.characterRepository.find({ isTerrain: false });
    characters = characters.sort((c1, c2) => c2.rank - c1.rank);
    return characters;
  }
}
