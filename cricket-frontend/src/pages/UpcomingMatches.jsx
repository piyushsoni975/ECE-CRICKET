import React from "react";
import { useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import PageWrapper from "../components/PageWrapper";

export default function UpcomingMatches() {
  const nav = useNavigate();
  const upcoming = [
    {
      id: "U1",
      teamA: "EEE Chargers",
      teamB: "ECE Tigers",
      time: "Tomorrow • 9:30 AM",
      venue: "Main Ground",
      tossTime: "9:15 AM",
    },
    {
      id: "U2",
      teamA: "CSE Lions",
      teamB: "Mech Warriors",
      time: "Tomorrow • 12:30 PM",
      venue: "Ground B",
      tossTime: "12:15 PM",
    },
  ];

  return (
    <PageWrapper title="Upcoming Matches" onBack={() => nav("/dashboard")}>
      <div className="space-y-5">
        {upcoming.map(m => <MatchCard key={m.id} type="upcoming" m={m} />)}
      </div>
    </PageWrapper>
  );
}
