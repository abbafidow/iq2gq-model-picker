const competitionFormats = {
  team: { icon: "👥", name: "Team Multi Competition", detail: "Teams of 3-4. Every pick must win for the team multi to pay out." },
  individual: { icon: "👤", name: "Individual Competition", detail: "Every member competes on their own performance." },
  matchplay: { icon: "⛳", name: "Match Play Competition", detail: "Members face weekly head-to-head match ups." },
  hybrid: { icon: "⚖️", name: "Hybrid Competition", detail: "One pick contributes to individual, team and syndicate outcomes." }
};

const scoringSystems = {
  weighted: { icon: "🏆", name: "Current Weighted Points", detail: "Keeps win points, loss points, MM points, bonus points and penalties.", scores: { money: 55, consistency: 70, competition: 96, simple: 86, confidence: 45, data: 40, process: 40, accountability: 65 } },
  profit: { icon: "💰", name: "Profit Model", detail: "Ranks members by total money made.", scores: { money: 98, consistency: 40, competition: 45, simple: 85, confidence: 55, data: 50, process: 35, accountability: 70 } },
  roi: { icon: "📈", name: "ROI Model", detail: "Ranks members by return on investment.", scores: { money: 92, consistency: 96, competition: 50, simple: 65, confidence: 45, data: 80, process: 75, accountability: 80 } },
  confidence: { icon: "🔥", name: "Confidence Model", detail: "Members rate confidence. Strong wins help more and strong failures hurt more.", scores: { money: 65, consistency: 60, competition: 82, simple: 55, confidence: 98, data: 55, process: 65, accountability: 85 } },
  elo: { icon: "♟️", name: "Elo Rating Model", detail: "A live rating system based on form, difficulty and results.", scores: { money: 65, consistency: 85, competition: 82, simple: 45, confidence: 60, data: 78, process: 70, accountability: 75 } },
  performanceIndex: { icon: "⭐", name: "Performance Index", detail: "Combines success rate, ROI, profit, MM contribution, form and risk.", scores: { money: 82, consistency: 92, competition: 75, simple: 40, confidence: 60, data: 88, process: 85, accountability: 88 } }
};

const betMethods = {
  equal: { icon: "⚖️", name: "Equal Weighting", detail: "All members submit one pick. Every pick carries the same weight.", scores: { equalInfluence: 100, data: 30, specialist: 20, simple: 95, consensus: 60 } },
  smallGroup: { icon: "👥", name: "Small Group Rotation", detail: "Small groups of 3-4 members build the official syndicate bet each week.", scores: { equalInfluence: 70, data: 35, specialist: 35, simple: 75, consensus: 65 } },
  bestBettor: { icon: "👑", name: "Best Bettor Led", detail: "The strongest current or historical bettor has more influence over the official syndicate bet.", scores: { equalInfluence: 10, data: 75, specialist: 60, simple: 55, consensus: 30 } },
  specialist: { icon: "🎯", name: "Sport Specialist", detail: "Members with the strongest record in a sport or bet type carry more influence for that area.", scores: { equalInfluence: 15, data: 90, specialist: 100, simple: 45, consensus: 45 } },
  consensus: { icon: "🤝", name: "Consensus", detail: "The official bet comes from the strongest area of agreement across members.", scores: { equalInfluence: 75, data: 55, specialist: 50, simple: 70, consensus: 100 } },
  ai: { icon: "🤖", name: "AI Assisted", detail: "AI reviews all member picks, past performance, odds, sport and market type before recommending the strongest syndicate bet.", scores: { equalInfluence: 20, data: 100, specialist: 85, simple: 25, consensus: 65 } }
};

const governanceRules = {
  noConsequence: { icon: "🟢", name: "No Consequence", detail: "Members keep contributing regardless of form.", colour: "green", scores: { accountability: 10, simple: 80, equalInfluence: 90 } },
  strikes: { icon: "🟡", name: "Strike System", detail: "Repeated failed weeks create strikes.", colour: "yellow", scores: { accountability: 75, simple: 85, equalInfluence: 75 } },
  reducedInfluence: { icon: "🟠", name: "Reduced Influence", detail: "Repeated poor performance reduces influence over the syndicate bet.", colour: "orange", scores: { accountability: 90, simple: 45, equalInfluence: 20 } },
  standdown: { icon: "🔴", name: "Stand-down", detail: "Repeated failed weeks trigger a temporary stand-down.", colour: "red", scores: { accountability: 95, simple: 80, equalInfluence: 55 } }
};

const questions = [
  { id: "money", text: "Should Rule #1 be the main priority?", explain: "Choose YES if the system should mainly reward profit. Choose NO if the Presidency race, banter and competition matter just as much.", yes: "consistency", no: "competition", axis: "money", yesText: "YES", yesSmall: "Money first", noText: "NO", noSmall: "Competition matters too" },
  { id: "consistency", text: "Should steady return matter more than one big win?", explain: "Choose YES if consistent returns should be rewarded. Choose NO if total dollars should rank highest.", yes: "process", no: "wildcard", axis: "consistency", yesText: "YES", yesSmall: "Reward consistency", noText: "NO", noSmall: "Total dollars wins" },
  { id: "competition", text: "Should the Presidency race stay central?", explain: "Choose YES if the model should still feel like a season-long competition. Choose NO if the model should mainly help choose better bets.", yes: "simplicity", no: "data", axis: "competition", yesText: "YES", yesSmall: "Keep the race alive", noText: "NO", noSmall: "Focus on better bets" },
  { id: "simplicity", text: "Should the system stay easy to understand?", explain: "Choose YES if members should understand the rules quickly. Choose NO if you are open to a smarter system.", yes: "equalInfluence", no: "confidence", axis: "simple", yesText: "YES", yesSmall: "Keep it simple", noText: "NO", noSmall: "Smarter is fine" },
  { id: "confidence", text: "Should confidence affect the score?", explain: "Choose YES if strong picks should earn more and failed confident picks should hurt more.", yes: "equalInfluence", no: "data", axis: "confidence", yesText: "YES", yesSmall: "Conviction should count", noText: "NO", noSmall: "Keep scoring cleaner" },
  { id: "data", text: "Should past data guide weekly bets?", explain: "Choose YES if member history by sport, betting type, odds and form should influence the official syndicate bet.", yes: "specialist", no: "accountability", axis: "data", yesText: "YES", yesSmall: "Use the data", noText: "NO", noSmall: "Keep it simple" },
  { id: "process", text: "Should good betting decisions be recognised even when they lose?", explain: "Choose YES if process matters. Choose NO if only winning bets should count.", yes: "equalInfluence", no: "wildcard", axis: "process", yesText: "YES", yesSmall: "Reward process", noText: "NO", noSmall: "Only wins count" },
  { id: "equalInfluence", text: "Should every member have equal influence over the syndicate bet?", explain: "Choose YES if every member should carry the same weight. Choose NO if better performers should carry more influence.", yes: "consensus", no: "specialist", axis: "equalInfluence", yesText: "YES", yesSmall: "Equal weight", noText: "NO", noSmall: "Performance should matter" },
  { id: "specialist", text: "Should sport specialists carry more influence?", explain: "Choose YES if members with strong records in certain sports should carry more weight for those bets.", yes: "innovation", no: "consensus", axis: "specialist", yesText: "YES", yesSmall: "Use experts", noText: "NO", noSmall: "Avoid specialists" },
  { id: "consensus", text: "Should the official bet come from group agreement?", explain: "Choose YES if consensus should matter. Choose NO if individual or specialist performance should matter more.", yes: "accountability", no: "innovation", axis: "consensus", yesText: "YES", yesSmall: "Consensus matters", noText: "NO", noSmall: "Performance matters" },
  { id: "innovation", text: "Should the system improve as more data becomes available?", explain: "Choose YES if AI and updated performance data should improve the system over time.", yes: "accountability", no: "wildcard", axis: "innovation", yesText: "YES", yesSmall: "Let it evolve", noText: "NO", noSmall: "Keep rules fixed" },
  { id: "accountability", text: "Should repeated failed weeks reduce a member's role?", explain: "Choose YES if repeated crashes should trigger consequences. Choose NO if everyone should keep contributing regardless of form.", yes: "wildcard", no: "wildcard", axis: "accountability", yesText: "YES", yesSmall: "Consequences matter", noText: "NO", noSmall: "Keep everyone involved" }
];

const defaultPrefs = {
  money: 50, consistency: 50, competition: 50, simple: 50,
  confidence: 50, data: 50, process: 50, equalInfluence: 50,
  specialist: 50, consensus: 50, innovation: 50, accountability: 50
};