'use client'

import { Season } from "@/lib/types/seasons";
import { Team } from "@/lib/types/teams";
import { useEffect, useState } from "react";
import TeamSelector from "./TeamSelector";
import SeasonSelector from "./SeasonSelector";

function getTeamSeason(team: Team): Season | null {
  if (team.seasons.length === 0) return null;
  return team.seasons[0];
}

export default function Selectors({ teams }: { teams: Team[] }) {
  const [selectedTeam, setSelectedTeam] = useState(teams.length > 0 ? teams[0] : null);
  const [availabledSeasons, setAvailableSeasons] = useState(selectedTeam ? selectedTeam.seasons : [] );
  const [selectedSeason, setSelectedSeason] = useState(availabledSeasons && availabledSeasons.length > 0 ? availabledSeasons[0] : null);

  function onTeamChange(teamId: string) {
    const newTeam = teams.find((t) => t.id === teamId);
    if (!newTeam) return;
    setSelectedTeam(newTeam);
  }

  function onSeasonChange(seasonId: string) {
    const newSeason = availabledSeasons.find((s) => s.id === seasonId);
    if (!newSeason) return;
    setSelectedSeason(newSeason);
  }

  useEffect(() => {
    // when selectedTeam changes, set the available seasons
    if (!selectedTeam) return;

    setSelectedSeason(getTeamSeason(selectedTeam));
    setAvailableSeasons(selectedTeam.seasons)
  }, [selectedTeam]);

  return (
    <>
      <TeamSelector teams={teams} selectedTeam={selectedTeam} onTeamChange={onTeamChange} />
      <SeasonSelector selectedSeason={selectedSeason} seasons={availabledSeasons} onChange={onSeasonChange} />
    </>
  )
}