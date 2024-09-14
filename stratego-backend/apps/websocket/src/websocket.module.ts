/* Websocket Module */
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './gateway/gateway.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from '@app/common/constants';
import { GameModule } from './game/game.module';
import { WebsocketService } from './websocket.service';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    GatewayModule,
    GameModule,
    RepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/websocket/.env',
    }),
  ],
  providers: [WebsocketService],
})
export class WebsocketModule {}
