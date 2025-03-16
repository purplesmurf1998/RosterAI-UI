import { Team, TeamCreation } from "@/lib/types/teams"
import { query } from "../db";
import { QueryResult, QueryResultRow } from "pg";
import { Season } from "@/lib/types/seasons";

export const selectTeamsForUser = async (userId: string): Promise<Team[]> => {
  const sql = `
    SELECT
      t.id as team_id,
      t.name as team_name,
      s.id as season_id,
      s.name as season_name
    FROM teams t
    JOIN team_season_player_associations tspa ON t.id = tspa.team_id
    JOIN seasons s ON s.id = tspa.season_id
    WHERE
      tspa.player_id = $1 AND
      t.deletion_time IS NULL AND
      s.deletion_time IS NULL
  `;
  const params = [userId];
  const results = await query(sql, params);
  const teamRows = results.rows.map(toTeamRow);
  return toTeams(teamRows);
}

export const insertTeam = async (creation: TeamCreation) => {
  const sql = `INSERT INTO teams (id, name) VALUES ($1, $2)`;
  const params = [creation.id, creation.name];
  await query(sql, params);
}

function toTeamRow(rs: QueryResultRow): TeamRow {
  return {
    team_id: rs['team_id'],
    team_name: rs['team_name'],
    season_id: rs['season_id'],
    season_name: rs['season_name'],
  }
}

function toTeams(teamRows: TeamRow[]): Team[] {
  const teamRowsGroupedByTeam = Object.groupBy(teamRows, ({ team_id }) => team_id);
  return Object.entries(teamRowsGroupedByTeam).map(([key, value]): Team | null => {
    if (!value || value.length === 0) return null;
    return {
      id: key,
      name: value[0].team_name,
      seasons: value.map((s) => toSeason(key, s))
    }
  }).filter((v) => !!v);
}

function toSeason(teamId: string, row: TeamRow): Season {
  return {
    id: row.season_id,
    team_id: teamId,
    name: row.season_name,
    players: [],
  }
}

interface TeamRow {
  team_id: string,
  team_name: string,
  season_id: string,
  season_name: string,
}

