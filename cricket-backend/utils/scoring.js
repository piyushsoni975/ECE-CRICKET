// utils/scoring.js
export function oversToBalls(ovStr="0.0"){
  const [o,d] = String(ovStr).split(".").map(x=>parseInt(x||0,10));
  return o*6 + (isNaN(d)?0:Math.min(d,5));
}
export function ballsToOvers(balls){
  const o = Math.floor(balls/6), d = balls%6;
  return `${o}.${d}`;
}
export function computeTotals(inn){
  const runsBat = (inn.batting||[]).reduce((s,p)=>s + (p.r||0), 0);
  const wkts = (inn.batting||[]).filter(p=>String(p.out||"").toLowerCase()!=="not out").length;
  const balls = (inn.bowling||[]).reduce((s,b)=>s + oversToBalls(b.o||"0.0"), 0);
  const overs = ballsToOvers(balls);
  const total = runsBat + (inn.extras||0);
  return { runs: `${total}/${wkts}`, overs };
}
