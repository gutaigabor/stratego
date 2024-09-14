/* Character Schema */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

/* Character possible types */
export enum CharacterType {
  MARSHAL = 'MARSHAL',
  GENERAL = 'GENERAL',
  COLONEL = 'COLONEL',
  MAJOR = 'MAJOR',
  CAPTAIN = 'CAPTAIN',
  LIEUTENANT = 'LIEUTENANT',
  SERGEANT = 'SERGEANT',
  MINER = 'MINER',
  SCOUT = 'SCOUT',
  SPY = 'SPY',
  BOMB = 'BOMB',
  FLAG = 'FLAG',
  LAKE = 'LAKE',
  UNKNOWN = 'UNKNOWN',
}

@Schema({ versionKey: false })
export class Character extends AbstractDocument {
  @Prop()
  characterType: CharacterType;

  @Prop()
  rank: number;

  @Prop()
  count: number;

  @Prop()
  isTerrain: boolean;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
