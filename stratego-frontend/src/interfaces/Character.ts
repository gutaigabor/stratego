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

/* Character interface */
export interface Character {
  _id: string;
  characterType: CharacterType;
  rank: number;
  count: number;
  isTerrain: boolean;
}

/* Cell interface */
export interface Cell {
  userId: string;
  character: Character;
}

/* Cell position interface */
export interface CellPosition {
  i: number;
  j: number;
}