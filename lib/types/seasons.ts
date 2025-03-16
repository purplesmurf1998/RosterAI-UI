import { PlayerPosition, PlayerStatus } from "./players";

export interface Season {
  id: string,
  team_id: string,
  name: string,
  players: SeasonPlayer[],
}

export interface SeasonCreation {
  name: string,
}

export interface SeasonPlayer {
  id: string,
  name: string,
  position: PlayerPosition,
  rank: string,
  phone_number?: string | null | undefined,
  email?: string | null | undefined,
  status: PlayerStatus,
  is_admin: boolean,
}