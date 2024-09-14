/* Gateway Service */
import { Injectable } from '@nestjs/common';
import { CharacterRepository } from './repository/character.repository';
import { CharacterType } from './schemas/character.schema';

@Injectable()
export class WebsocketService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  // On application start seed constant DB data
  async onModuleInit() {
    try {
      this.seedCharacters();
    } catch (error) {
      console.error('Failed to seed database');
    }
  }

  // Seed constant DB data
  async seedCharacters() {
    const existing = await this.characterRepository.find({});

    if (!existing || existing.length === 0) {
      const marshal = {
        characterType: CharacterType.MARSHAL,
        rank: 10,
        count: 1,
        isTerrain: false,
      };
      const general = {
        characterType: CharacterType.GENERAL,
        rank: 9,
        count: 1,
        isTerrain: false,
      };
      const colonel = {
        characterType: CharacterType.COLONEL,
        rank: 8,
        count: 2,
        isTerrain: false,
      };
      const major = {
        characterType: CharacterType.MAJOR,
        rank: 7,
        count: 3,
        isTerrain: false,
      };
      const captain = {
        characterType: CharacterType.CAPTAIN,
        rank: 6,
        count: 4,
        isTerrain: false,
      };
      const lieutenant = {
        characterType: CharacterType.LIEUTENANT,
        rank: 5,
        count: 4,
        isTerrain: false,
      };
      const sergeant = {
        characterType: CharacterType.SERGEANT,
        rank: 4,
        count: 4,
        isTerrain: false,
      };
      const miner = {
        characterType: CharacterType.MINER,
        rank: 3,
        count: 5,
        isTerrain: false,
      };
      const scout = {
        characterType: CharacterType.SCOUT,
        rank: 2,
        count: 8,
        isTerrain: false,
      };
      const spy = {
        characterType: CharacterType.SPY,
        rank: -1,
        count: 1,
        isTerrain: false,
      };
      const bomb = {
        characterType: CharacterType.BOMB,
        rank: 11,
        count: 6,
        isTerrain: false,
      };
      const flag = {
        characterType: CharacterType.FLAG,
        rank: 0,
        count: 1,
        isTerrain: false,
      };
      const lake = {
        characterType: CharacterType.LAKE,
        rank: 0,
        count: 8,
        isTerrain: true,
      };

      const characters = [
        marshal,
        general,
        colonel,
        major,
        captain,
        lieutenant,
        sergeant,
        miner,
        scout,
        spy,
        bomb,
        flag,
        lake,
      ];

      characters.forEach((c) => {
        this.characterRepository.create(c);
      });
    }

    return;
  }
}
