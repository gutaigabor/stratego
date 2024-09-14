/* Lobby Schema */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class LobbyUser extends AbstractDocument {
  @Prop()
  userId: string;

  @Prop()
  socketId: string;

  @Prop()
  isReady?: boolean;
}

export const LobbySchema = SchemaFactory.createForClass(LobbyUser);
