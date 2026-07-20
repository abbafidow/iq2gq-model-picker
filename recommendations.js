function matchAgainst(item, axes) {
  let total = 0;
  axes.forEach(axis => total += 100 - Math.abs(userPrefs[axis] - item.scores[axis]));
  return Math.round(total / axes.length);
}

function rankItems(items, axes) {
  return Object.keys(items)
    .map(id => ({ id, ...items[id], match: matchAgainst(items[id], axes) }))
    .sort((a, b) => b.match - a.match);
}

function rankCompetitionFormats() {
  const formatScores = {
    team: { scores: { competition: 90, simple: 75, equalInfluence: 85, consensus: 70, data: 40, accountability: 65 } },
    individual: { scores: { competition: 45, simple: 80, equalInfluence: 60, consensus: 30, data: 65, accountability: 75 } },
    matchplay: { scores: { competition: 98, simple: 75, equalInfluence: 70, consensus: 40, data: 55, accountability: 90 } },
    hybrid: { scores: { competition: 85, simple: 45, equalInfluence: 55, consensus: 65, data: 90, accountability: 80 } }
  };

  return Object.keys(competitionFormats)
    .map(id => ({ id, ...competitionFormats[id], match: matchAgainst(formatScores[id], ["competition", "simple", "equalInfluence", "consensus", "data", "accountability"]) }))
    .sort((a, b) => b.match - a.match);
}