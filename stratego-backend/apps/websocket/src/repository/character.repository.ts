/* Character Repository */
import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Character } from '../schemas/character.schema';

@Injectable()
export class CharacterRepository extends AbstractRepository<Character> {
  protected readonly logger = new Logger(CharacterRepository.name);

  constructor(
    @InjectModel(Character.name) characterModel: Model<Character>,
    @InjectConnection() connection: Connection,
  ) {
    super(characterModel, connection);
  }
}
