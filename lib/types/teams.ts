import { Season } from "./seasons";

export interface Team {
  id: string,
  name: string,
  seasons: Season[],
}

export interface TeamCreation {
  id: string,
  name: string
}