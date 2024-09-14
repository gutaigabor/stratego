/* Lobby Repository */
import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { LobbyUser } from '../schemas/lobby.schema';

@Injectable()
export class LobbyRepository extends AbstractRepository<LobbyUser> {
  protected readonly logger = new Logger(LobbyRepository.name);

  constructor(
    @InjectModel(LobbyUser.name) lobbyModel: Model<LobbyUser>,
    @InjectConnection() connection: Connection,
  ) {
    super(lobbyModel, connection);
  }
}
