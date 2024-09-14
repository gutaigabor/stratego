/* Repository Module */
import { Module } from '@nestjs/common';
import { LobbyRepository } from './lobby.repository';
import { MatchRepository } from './match.repository';
import { CharacterRepository } from './character.repository';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LobbyUser, LobbySchema } from '../schemas/lobby.schema';
import { Match, MatchSchema } from '../schemas/match.schema';
import { Character, CharacterSchema } from '../schemas/character.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: LobbyUser.name, schema: LobbySchema },
      { name: Match.name, schema: MatchSchema },
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  providers: [LobbyRepository, MatchRepository, CharacterRepository],
  exports: [LobbyRepository, MatchRepository, CharacterRepository],
})
export class RepositoryModule {}
