export interface PlayerCreation {
  name: string,
  position: PlayerPosition,
  rank?: string | null | undefined,
  phone_number?: string | null | undefined,
  email?: string | null | undefined,
}

export enum PlayerPosition {
  OFFENSE,
  DEFENSE,
  GOALIE,
}

export enum PlayerStatus {
  REGULER,
  SUB
}