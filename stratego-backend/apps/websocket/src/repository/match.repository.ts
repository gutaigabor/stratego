/* Match Repository */
import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Match } from '../schemas/match.schema';

@Injectable()
export class MatchRepository extends AbstractRepository<Match> {
  protected readonly logger = new Logger(MatchRepository.name);

  constructor(
    @InjectModel(Match.name) matchModel: Model<Match>,
    @InjectConnection() connection: Connection,
  ) {
    super(matchModel, connection);
  }
}
