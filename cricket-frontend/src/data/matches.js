// ---- LIVE ----
export const LIVE_MATCHES = [
  {
    id: "L1",
    teamA: "ECE Tigers",
    teamB: "CSE Lions",
    time: "Today • 10:30 AM",
    venue: "Ground A",
    scoreA: "128/4", oversA: "15.2",
    scoreB: "—",     oversB: "—",
    status: "Tigers need 42 from 28",
    umpires: "A. Singh, R. Kumar",
    // 👇 NEW: Live scorecard (Team A batting vs Team B bowling)
    liveScorecard: {
      battingTeam: "ECE Tigers",
      bowlingTeam: "CSE Lions",
      batting: [
        { name: "A. Sharma", out: "not out", r: 54, b: 32, _4: 6, _6: 2, sr: 168.7 },
        { name: "V. Patel",  out: "c mid-off b M. Khan", r: 21, b: 17, _4: 2, _6: 1, sr: 123.5 },
        { name: "R. Verma",  out: "b S. Iyer", r: 13, b: 10, _4: 2, _6: 0, sr: 130.0 },
        { name: "P. Singh",  out: "run out", r: 6, b: 7, _4: 1, _6: 0, sr: 85.7 },
        { name: "S. Kumar",  out: "not out", r: 22, b: 12, _4: 2, _6: 1, sr: 183.3 },
      ],
      yetToBat: ["K. Yadav", "N. Rao", "H. Das"],
      extras: "w 3, lb 1 (4)",
      bowling: [
        { name: "M. Khan",  o: "3.2", r: 24, w: 1, eco: 7.20 },
        { name: "S. Iyer",  o: "3",   r: 22, w: 1, eco: 7.33 },
        { name: "T. Paul",  o: "4",   r: 34, w: 1, eco: 8.50 },
        { name: "J. Roy",   o: "3",   r: 24, w: 0, eco: 8.00 },
        { name: "A. Mehta", o: "2",   r: 20, w: 0, eco: 10.0 },
      ],
    },
  },
  {
    id: "L2",
    teamA: "Mech Warriors",
    teamB: "Civil Spartans",
    time: "Today • 01:30 PM",
    venue: "Ground B",
    scoreA: "92/7",  oversA: "14.0",
    scoreB: "90/8",  oversB: "15.0",
    status: "Warriors lead by 2 (6 overs left)",
    umpires: "S. Iyer, P. Meena",
    liveScorecard: {
      battingTeam: "Mech Warriors",
      bowlingTeam: "Civil Spartans",
      batting: [
        { name: "K. Bose",  out: "not out", r: 31, b: 23, _4: 3, _6: 1, sr: 134.7 },
        { name: "Y. Jain",  out: "b R. Lal", r: 12, b: 11, _4: 2, _6: 0, sr: 109.1 },
        { name: "M. Roy",   out: "c † b R. Lal", r: 8, b: 10, _4: 1, _6: 0, sr: 80.0 },
        { name: "A. Shek",  out: "run out", r: 5, b: 7, _4: 0, _6: 0, sr: 71.4 },
        { name: "P. Rana",  out: "not out", r: 18, b: 9, _4: 2, _6: 1, sr: 200.0 },
      ],
      yetToBat: ["S. Tyagi", "R. Nair"],
      extras: "w 2, nb 1 (3)",
      bowling: [
        { name: "R. Lal",   o: "3",  r: 18, w: 2, eco: 6.00 },
        { name: "N. Gill",  o: "3",  r: 20, w: 1, eco: 6.66 },
        { name: "H. Sahu",  o: "4",  r: 30, w: 0, eco: 7.50 },
        { name: "K. Muni",  o: "2",  r: 12, w: 0, eco: 6.00 },
        { name: "T. Jain",  o: "2",  r: 12, w: 0, eco: 6.00 },
      ],
    },
  },
];

// ---- PAST (optional: with full scorecards for detail) ----
export const PAST_MATCHES = [
  {
    id: "P1",
    teamA: "ECE Tigers",
    teamB: "IT Hawks",
    time: "Yesterday • 4:00 PM",
    venue: "Ground A",
    result: "ECE Tigers won by 34 runs",
    umpires: "A. Singh, K. Rao",
    innings1: { // Tigers
      team: "ECE Tigers",
      total: "176/6", overs: "20",
      batting: [
        { name: "R. Verma",  out: "c&b A. Ali", r: 68, b: 39, _4: 8, _6: 2, sr: 174.4 },
        { name: "V. Patel",  out: "b M. Ali",  r: 22, b: 18, _4: 3, _6: 0, sr: 122.2 },
        { name: "A. Sharma", out: "run out",   r: 31, b: 20, _4: 4, _6: 1, sr: 155.0 },
      ],
      extras: "w 7, lb 3 (10)",
      bowling: [
        { name: "M. Ali", o: "4", r: 33, w: 2, eco: 8.25 },
        { name: "A. Ali", o: "4", r: 36, w: 1, eco: 9.00 },
      ],
    },
    innings2: { // Hawks
      team: "IT Hawks",
      total: "142/9", overs: "20",
      batting: [
        { name: "S. Roy", out: "b R. Verma", r: 29, b: 24, _4: 4, _6: 0, sr: 120.8 },
        { name: "M. Khan", out: "c mid-wk b P. Singh", r: 35, b: 28, _4: 3, _6: 1, sr: 125.0 },
      ],
      extras: "w 5, nb 1 (6)",
      bowling: [
        { name: "R. Verma", o: "4", r: 20, w: 3, eco: 5.00 },
        { name: "P. Singh", o: "4", r: 25, w: 2, eco: 6.25 },
      ],
    },
  },
  // ...another past match (P2) can stay as before or add scorecards similarly
];

export const getLiveById = (id) => LIVE_MATCHES.find(m => m.id === id);
export const getPastById = (id) => PAST_MATCHES.find(m => m.id === id);
