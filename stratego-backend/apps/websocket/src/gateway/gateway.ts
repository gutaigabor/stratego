/* Gateway for Websocket */
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from '../guards/auth.guard';
import { GameService } from '../game/game.service';
import { jwtConstants } from '@app/common/constants';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class Gateway implements OnModuleInit {
  constructor(
    private readonly gameService: GameService,
    private jwtService: JwtService,
  ) {}

  /* Init WS server */
  @WebSocketServer()
  server: Server;

  /* Before bootstrap handle client connections */
  onModuleInit() {
    this.server.on('connection', async (socket) => {
      try {
        // Get JWT token from headers
        const token = socket.handshake.headers.authorization.split(' ')[1];

        // Read userId from JWT token
        const { sub } = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });

        // Create lobby user on connection
        this.gameService.createLobby(sub, socket.id);

        // Handle user disconnect
        socket.on('disconnect', async () => {
          await this.disconnectUsers(sub);
        });
      } catch (e) {
        throw new WsException('Cannot connect');
      }
    });
  }

  /* Handle user disconnect */
  private async disconnectUsers(userId: string) {
    // Delete lobby user from DB
    await this.gameService.deleteLobbyUser(userId);
    // Find other user
    const otherUser = await this.gameService.findOtherLobbyUser(userId);
    // Send disconnect message to other user with socketId from DB
    this.server
      .to(otherUser ? otherUser.socketId : null)
      .emit('opponentDisconnect');
  }

  /* Send available characters from DB to user */
  @UseGuards(AuthGuard)
  @SubscribeMessage('getCharacters')
  async getCharacters(client: any) {
    const { sub } = client.user;

    const user = await this.gameService.findLobbyUser(sub);
    const characters = await this.gameService.getCharacters();

    this.server.to(user ? user.socketId : null).emit('onGetCharacters', {
      characters: characters,
    });
  }

  /* User is ready in lobby */
  @UseGuards(AuthGuard)
  @SubscribeMessage('readyInLobby')
  async readyInLobby(client: any) {
    const { sub } = client.user;

    const user = await this.gameService.findLobbyUser(sub);
    const otherUser = await this.gameService.findOtherLobbyUser(sub);

    if (otherUser && otherUser.isReady) {
      const match = await this.gameService.createMatch(sub, otherUser.userId);
      await this.gameService.changeLobbyUserReady(otherUser.userId);
      this.server.emit('onReadyInLobby', match._id.toString());

      const isRedUser = match.redUserId === sub;

      // Determine for both users if they are red or blue
      this.server
        .to(user ? user.socketId : null)
        .emit('onIsRedUser', isRedUser);

      this.server
        .to(otherUser ? otherUser.socketId : null)
        .emit('onIsRedUser', !isRedUser);

      return;
    }

    this.gameService.changeLobbyUserReady(sub);
  }

  /* User is ready in setup */
  @UseGuards(AuthGuard)
  @SubscribeMessage('readyInSetup')
  async readyInSetup(client: any, data: any) {
    const { sub } = client.user;

    const user = await this.gameService.findLobbyUser(sub);
    const otherUser = await this.gameService.findOtherLobbyUser(sub);
    await this.gameService.setMatchStartingBoard(data, sub);

    if (otherUser && otherUser.isReady) {
      const match = await this.gameService.createCurrentBoard(data.matchId);
      const userBoard = this.gameService.mapCurrentBoardForPlayer(
        match.currentBoard,
        otherUser.userId,
      );
      const otherUserBoard = this.gameService.mapCurrentBoardForPlayer(
        match.currentBoard,
        user.userId,
      );
      await this.gameService.changeLobbyUserReady(otherUser.userId);
      this.server
        .to(user ? user.socketId : null)
        .emit('onReadyInSetup', userBoard);
      this.server
        .to(otherUser ? otherUser.socketId : null)
        .emit('onReadyInSetup', otherUserBoard);
      return;
    }

    this.gameService.changeLobbyUserReady(sub);
  }

  /* User move */
  @UseGuards(AuthGuard)
  @SubscribeMessage('userMove')
  async userMove(client: any, data: any) {
    const { sub } = client.user;

    const user = await this.gameService.findLobbyUser(sub);
    const otherUser = await this.gameService.findOtherLobbyUser(sub);

    const { match, message, status } = await this.gameService.userMove(
      data.matchId,
      data.from,
      data.to,
      user.userId,
      otherUser.userId,
    );

    const userBoard = this.gameService.mapCurrentBoardForPlayer(
      match.currentBoard,
      otherUser.userId,
    );
    const otherUserBoard = this.gameService.mapCurrentBoardForPlayer(
      match.currentBoard,
      user.userId,
    );

    this.server.to(user ? user.socketId : null).emit('onUserMove', {
      isMyTurn: match.currentTurnUserId === user.userId,
      board: userBoard,
      message,
      status,
    });

    this.server.to(otherUser ? otherUser.socketId : null).emit('onUserMove', {
      isMyTurn: match.currentTurnUserId !== user.userId,
      board: otherUserBoard,
      message,
      status: status === 'win' ? 'lose' : status === 'lose' ? 'win' : status,
    });

    return;
  }

  /* Test function */
  @UseGuards(AuthGuard)
  @SubscribeMessage('newMessage')
  async onNewMessage(client: any, data: any) {
    const { sub } = client.user;

    const user = await this.gameService.findLobbyUser(sub);
    const otherUser = await this.gameService.findOtherLobbyUser(sub);

    this.server.to(user ? user.socketId : null).emit('onMessage', {
      msg: 'New message',
      content: data,
    });

    this.server.to(otherUser ? otherUser.socketId : null).emit('onMessage', {
      msg: 'New message',
      content: 'Other',
    });
  }
}
