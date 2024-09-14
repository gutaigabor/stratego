/* Match Schema */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Character } from './character.schema';

export enum MatchStateType {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export interface Cell {
  userId: string;
  character: Character;
  hasMoved?: boolean;
}

@Schema({ versionKey: false })
export class Match extends AbstractDocument {
  @Prop()
  matchState: MatchStateType;

  @Prop()
  currentTurnUserId: string;

  @Prop()
  redUserId: string;

  @Prop()
  blueUserId: string;

  @Prop()
  redStartBoard: Array<Array<Character>>;

  @Prop()
  blueStartBoard: Array<Array<Character>>;

  @Prop()
  currentBoard: Array<Array<Cell | null>>;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
