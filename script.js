let selectedFormat = null;
let questionNumber = 1;
let userPrefs = {};

// Stage 0 Assessment State Capture
let stage0Data = {
  bettingRating: "",
  bettingDirection: "",
  presidencyRating: "",
  presidencyDirection: ""
};

function intro() {
  document.getElementById("content").innerHTML = `
    <div class="centre">
      <img class="logo" src="IQ2GQ%20Logo.png" alt="IQ2GQ Logo">
      <h1>IQ2GQ 2027 Competition Designer</h1>
      <p class="subtitle">Designing the next chapter of the Syndicate. This tool separates four choices: competition format, scoring system, syndicate bet method and governance rules.</p>
      <div class="rule">Where Intellect Meets Style - Est. 2011</div>
      <p class="subtitle">This is not a binding vote. It supports a clearer AGM discussion.</p>
      <button class="goldBtn" onclick="startStage0()">Start assessment</button>
    </div>
  `;
}

/* ================= STAGE 0 ENGINE ================= */

function startStage0() {
  showStage0BettingRating();
}

function showStage0BettingRating() {
  document.getElementById("content").innerHTML = `
    <div class="stage">STAGE 0 - CURRENT SYSTEM REVIEW (1/4)</div>
    <div class="question">The IQ2GQ Betting Model</div>
    <div class="explain">Since IQ2GQ began, we bet by everyone submitting 1 pick per week. We have always used a group of picks (3-6) to make and drop MMs. This betting model has remained largely unchanged.<br><br><strong>Overall, does this betting model still suit our needs?</strong></div>
    <div class="choice-grid">
      <div class="choice-card" onclick="saveStage0BettingRating('1 - Complete redesign')"><div class="choice-title">1</div><div class="choice-text">Complete redesign</div></div>
      <div class="choice-card" onclick="saveStage0BettingRating('2 - Major improvements')"><div class="choice-title">2</div><div class="choice-text">Major improvements</div></div>
      <div class="choice-card" onclick="saveStage0BettingRating('3 - Several improvements')"><div class="choice-title">3</div><div class="choice-text">Several improvements</div></div>
      <div class="choice-card" onclick="saveStage0BettingRating('4 - Adequate')"><div class="choice-title">4</div><div class="choice-text">Adequate</div></div>
      <div class="choice-card" onclick="saveStage0BettingRating('5 - Mostly successful')"><div class="choice-title">5</div><div class="choice-text">Mostly successful</div></div>
      <div class="choice-card" onclick="saveStage0BettingRating('6 - Very successful')"><div class="choice-title">6</div><div class="choice-text">Very successful</div></div>
      <div class="choice-card" onclick="saveStage0BettingRating('7 - Keep the core model')"><div class="choice-title">7</div><div class="choice-text">Keep the core model</div></div>
    </div>
  `;
}

function saveStage0BettingDirection(val) {
  stage0Data.bettingDirection = val;
  showStage0PresidencyRating();
}

function showStage0PresidencyRating() {
  document.getElementById("content").innerHTML = `
    <div class="stage">STAGE 0 - CURRENT SYSTEM REVIEW (3/4)</div>
    <div class="question">The Presidency Model</div>
    <div class="explain">We have had five models to choose our President. The current model uses a weighted points system.<br><br><strong>Overall, does our current Presidency model still suit our needs?</strong></div>
    <div class="choice-grid">
      <div class="choice-card" onclick="saveStage0PresidencyRating('1 - Complete removal (don't need a President)')"><div class="choice-title">1</div><div class="choice-text">Complete redesign</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyRating('2 - Major improvements (e.g. election or roster)')"><div class="choice-title">2</div><div class="choice-text">Major improvements</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyRating('3 - Several improvements (e.g best ROI)')"><div class="choice-title">3</div><div class="choice-text">Several improvements</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyRating('4 - Adequate')"><div class="choice-title">4</div><div class="choice-text">Adequate</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyRating('5 - Mostly suits')"><div class="choice-title">5</div><div class="choice-text">Mostly successful</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyRating('6 - Keep core model as is')"><div class="choice-title">6</div><div class="choice-text">Very successful</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyRating('7 - Keep model and Give more power to President')"><div class="choice-title">7</div><div class="choice-text">Keep the core model</div></div>
    </div>
  `;
}

function saveStage0PresidencyRating(val) {
  stage0Data.presidencyRating = val;
  showStage0PresidencyDirection();
}

function showStage0PresidencyDirection() {
  document.getElementById("content").innerHTML = `
    <div class="stage">STAGE 0 - CURRENT SYSTEM REVIEW (4/4)</div>
    <div class="question">Preferred Presidency Features</div>
    <div class="explain">Which features of a Presidency model would you most like to see retained or incorporated into the future?</div>
    <div class="choice-grid">
      <div class="choice-card" onclick="saveStage0PresidencyDirection('Keep regular season')"><div class="choice-title">Keep current model</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyDirection('Keep Finals Series')"><div class="choice-title">Keep Finals Series but improve scoring</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyDirection('Keep weighted points')"><div class="choice-title">Keep scoring but remove Finals Series</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyDirection('New Model needed')"><div class="choice-title">Time for a completely new Presidency model</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyDirection('Keep/Adapt role of Butlers')"><div class="choice-title">Butlers retained</div></div>
      <div class="choice-card" onclick="saveStage0PresidencyDirection('Remove Butlers')"><div class="choice-title">Butlers adapted</div></div>
    </div>
  `;
}

function saveStage0PresidencyDirection(val) {
  stage0Data.presidencyDirection = val;
  chooseCompetitionFormat(); // Pass systematically straight to original Stage 1
}

/* ================= ORIGINAL SURVEY ENGINE ================= */

function chooseCompetitionFormat() {
  const cards = Object.keys(competitionFormats).map(id => {
    const f = competitionFormats[id];
    return `
      <div class="choice-card" onclick="selectCompetitionFormat('${id}')">
        <div class="choice-icon">${f.icon}</div>
        <div class="choice-title">${f.name}</div>
        <div class="choice-text">${f.detail}</div>
      </div>
    `;
  }).join("");

  document.getElementById("content").innerHTML = `
    <div class="stage">STAGE ONE - COMPETITION FORMAT</div>
    <div class="question">How should IQ2GQ be played?</div>
    <div class="explain">Choose your first instinct. The questions that follow will test whether your answers support that format or point somewhere else.</div>
    <div class="choice-grid">${cards}</div>
  `;
}

function selectCompetitionFormat(id) {
  selectedFormat = id;
  userPrefs = { ...defaultPrefs };
  questionNumber = 1;

  if (id === "team") {
    userPrefs.competition = 85;
    userPrefs.equalInfluence = 80;
  }
  if (id === "individual") {
    userPrefs.money = 85;
    userPrefs.competition = 45;
  }
  if (id === "matchplay") {
    userPrefs.competition = 95;
    userPrefs.accountability = 85;
    userPrefs.simple = 75;
  }
  if (id === "hybrid") {
    userPrefs.money = 80;
    userPrefs.competition = 80;
    userPrefs.data = 85;
    userPrefs.innovation = 85;
  }

  showQuestion("money");
}

function showQuestion(id) {
  const q = questions.find(x => x.id === id);
  const total = 12;
  const progress = Math.round((questionNumber - 1) / total * 100);

  document.getElementById("content").innerHTML = `
    <div class="progress-top">
      <span>Question ${questionNumber} of ${total}</span>
      <span>${progress}% complete</span>
    </div>
    <div class="bar"><div class="fill" style="width:${progress}%"></div></div>
    <div class="stage">STAGE TWO - DESIGN PREFERENCES</div>
    <div class="question">${q.text}</div>
    <div class="explain">${q.explain}</div>
    <div class="buttons">
      <button class="yes" onclick="answer('${q.yes}', '${q.axis}', 100)">${q.yesText}<span class="small">${q.yesSmall}</span></button>
      <button class="no" onclick="answer('${q.no}', '${q.axis}', 0)">${q.noText}<span class="small">${q.noSmall}</span></button>
    </div>
  `;
}

function answer(next, axis, value) {
  userPrefs[axis] = value;
  if (next === "wildcard") {
    showWildcard();
  } else {
    questionNumber++;
    showQuestion(next);
  }
}

function showWildcard() {
  document.getElementById("content").innerHTML = `
    <div class="progress-top">
      <span>Final question</span>
      <span>95% complete</span>
    </div>
    <div class="bar"><div class="fill" style="width:95%"></div></div>
    <div class="stage">FINAL SCENARIO</div>
    <div class="question">Who had the better season?</div>
    <div class="explain">
      Member A wins 80% of bets, average odds $1.35, and makes $220 profit.<br><br>
      Member B wins 55% of bets, average odds $2.70, and makes $950 profit.
    </div>
    <div class="choice-grid">
      <div class="choice-card" onclick="wildcard('a')">
        <div class="choice-icon">📊</div>
        <div class="choice-title">Member A</div>
        <div class="choice-text">Consistency and high strike rate matter most.</div>
      </div>
      <div class="choice-card" onclick="wildcard('b')">
        <div class="choice-icon">💰</div>
        <div class="choice-title">Member B</div>
        <div class="choice-text">Profit matters most, even with more losses.</div>
      </div>
      <div class="choice-card" onclick="wildcard('neither')">
        <div class="choice-icon">⚖️</div>
        <div class="choice-title">Neither</div>
        <div class="choice-text">There should be a more balanced way to judge performance.</div>
      </div>
    </div>
  `;
}

function wildcard(choice) {
  if (choice === "a") {
    userPrefs.consistency = 100;
    userPrefs.money = Math.max(userPrefs.money, 65);
  }
  if (choice === "b") {
    userPrefs.money = 100;
    userPrefs.consistency = Math.min(userPrefs.consistency, 45);
  }
  if (choice === "neither") {
    userPrefs.data = 90;
    userPrefs.process = 90;
    userPrefs.innovation = 85;
  }
  showResult();
}

/* ================= RESULTS GENERATION & DISPLAY ================= */

function showResult() {
  const formatRank = rankCompetitionFormats();
  const scoringRank = rankItems(scoringSystems, ["money", "consistency", "competition", "simple", "confidence", "data", "process", "accountability"]);
  const betRank = rankItems(betMethods, ["equalInfluence", "data", "specialist", "simple", "consensus"]);
  const governanceRank = rankItems(governanceRules, ["accountability", "simple", "equalInfluence"]);

  const topFormat = formatRank[0];
  const topScoring = scoringRank[0];
  const topBet = betRank[0];
  const topGovernance = governanceRank[0];

  const profile = {
    "Profit orientation": Math.round((userPrefs.money + userPrefs.consistency) / 2),
    "Competition focus": userPrefs.competition,
    "Data and innovation": Math.round((userPrefs.data + userPrefs.innovation) / 2),
    "Simplicity": userPrefs.simple,
    "Equal influence": userPrefs.equalInfluence,
    "Specialist weighting": userPrefs.specialist,
    "Consensus": userPrefs.consensus,
    "Accountability": userPrefs.accountability
  };

  const profileHtml = Object.keys(profile).map(key => `
    <div class="profile-row">
      <div class="profile-head"><span>${key}</span><span>${profile[key]}%</span></div>
      <div class="profile-track"><div class="profile-fill" style="width:${profile[key]}%"></div></div>
    </div>
  `).join("");

  // Re-engineered parsing structure targeting WhatsApp / Excel clean clipboard allocation
  const summary = `IQ2GQ 2027 Competition Builder

CURRENT SYSTEM REVIEW
Betting Model
Rating: ${stage0Data.bettingRating}
Direction: ${stage0Data.bettingDirection}

Presidency Model
Rating: ${stage0Data.presidencyRating}
Direction: ${stage0Data.presidencyDirection}

FUTURE DESIGN
Competition Format: ${topFormat.name} (${topFormat.match}%)
Scoring System: ${topScoring.name} (${topScoring.match}%)
Bet Method: ${topBet.name} (${topBet.match}%)
Governance: ${topGovernance.name} (${topGovernance.match}%)

Overall Recommendation:
${topFormat.name} with ${topScoring.name}, using ${topBet.name}, supported by ${topGovernance.name}.

AGM Notes:
Decide the format first, then the scoring system, then how the official syndicate bet should be built.`;

  document.getElementById("content").innerHTML = `
    <div class="progress-top">
      <span>Result</span>
      <span>100% complete</span>
    </div>
    <div class="bar"><div class="fill" style="width:100%"></div></div>

    <div class="centre">
      <h1>Your IQ2GQ Design</h1>
      <p class="subtitle">A suggested design based on your answers. Use this to guide discussion, not as a binding vote.</p>
    </div>

    <!-- New Current System Review Section (Stage 0 Analytics) -->
    <div class="result-box">
      <h2>Current System Review</h2>
      <div class="tile-grid">
        <div class="tile">
          <div class="tile-title">Betting Model Status</div>
          <div class="tile-text">
            <strong>Rating:</strong> ${stage0Data.bettingRating}<br>
            <strong>Direction Selected:</strong> ${stage0Data.bettingDirection}
          </div>
        </div>
        <div class="tile">
          <div class="tile-title">Presidency Model Status</div>
          <div class="tile-text">
            <strong>Rating:</strong> ${stage0Data.presidencyRating}<br>
            <strong>Direction Selected:</strong> ${stage0Data.presidencyDirection}
          </div>
        </div>
      </div>
    </div>

    <div class="result-box">
      <h2>Blueprint Summary</h2>
      <div class="blueprint-grid">
        <div class="blueprint-card">
          <div class="label">Competition</div>
          <div class="value">${topFormat.icon}<br>${topFormat.name}</div>
        </div>
        <div class="blueprint-card">
          <div class="label">Scoring</div>
          <div class="value">${topScoring.icon}<br>${topScoring.name}</div>
        </div>
        <div class="blueprint-card">
          <div class="label">Bet Method</div>
          <div class="value">${topBet.icon}<br>${topBet.name}</div>
        </div>
        <div class="blueprint-card">
          <div class="label">Governance</div>
          <div class="value">${topGovernance.icon}<br>${topGovernance.name}</div>
        </div>
      </div>
    </div>

    <div class="result-box">
      <h2>Overall Fit</h2>
      <div class="gauge-wrap">
        <div class="gauge" style="--score:${topScoring.match}%">
          <div class="gauge-inner">
            <div><strong>${topScoring.match}%</strong><br>Scoring fit</div>
          </div>
        </div>
      </div>
      <p class="centre subtitle">Your strongest scoring system match is ${topScoring.name}.</p>
    </div>

    <div class="result-box">
      <h2>Top Recommendations</h2>
      <div class="podium">
        <div class="podium-card"><div class="medal">1</div><strong>Format</strong><br>${topFormat.name}<br>${topFormat.match}%</div>
        <div class="podium-card"><div class="medal">2</div><strong>Scoring</strong><br>${topScoring.name}<br>${topScoring.match}%</div>
        <div class="podium-card"><div class="medal">3</div><strong>Bet Method</strong><br>${topBet.name}<br>${topBet.match}%</div>
        <div class="podium-card"><div class="medal">4</div><strong>Governance</strong><br>${topGovernance.name}<br>${topGovernance.match}%</div>
      </div>
    </div>

    <div class="result-box">
      <h2>Betting Philosophy Radar</h2>
      <canvas id="radar" width="520" height="420"></canvas>
    </div>

    <div class="result-box">
      <h2>Betting Philosophy Profile</h2>
      ${profileHtml}
    </div>

    <div class="result-box">
      <h2>Competition Format Tiles</h2>
      <div class="tile-grid">${makeTiles(formatRank)}</div>
    </div>

    <div class="result-box">
      <h2>Scoring System Tiles</h2>
      <div class="tile-grid">${makeTiles(scoringRank)}</div>
    </div>

    <div class="result-box">
      <h2>Syndicate Bet Method Matrix</h2>
      <div class="tile-grid">${makeTiles(betRank)}</div>
    </div>

    <div class="result-box">
      <h2>Governance Traffic Lights</h2>
      <div class="traffic">${makeTraffic(governanceRank)}</div>
    </div>

    <div class="result-box">
      <h2>AGM-style recommendation</h2>
      <p>Discuss these choices separately. The syndicate can choose one Competition Format, one Scoring System, one Syndicate Bet Method and one Governance Rule.</p>
      <p>Based on your answers, your strongest design is: <strong>${topFormat.name}</strong> with <strong>${topScoring.name}</strong>, using <strong>${topBet.name}</strong>, supported by <strong>${topGovernance.name}</strong>.</p>
    </div>

    <div class="result-box">
      <h2>Copy this result</h2>
      <div class="summary" id="summary">${summary}</div>
    </div>

    <div class="buttons">
      <button class="plain" onclick="intro()">Start again</button>
      <button class="goldBtn" onclick="copyResult()">Copy result</button>
    </div>
  `;

  drawRadar();
}

function makeTiles(items) {
  return items.map((m, i) => `
    <div class="tile" onclick="toggleDetails('tile-${m.id}-${i}')">
      <div class="tile-icon">${m.icon}</div>
      <div class="tile-title">${i + 1}. ${m.name}</div>
      <div class="tile-text">${m.match}% match<br><br>${m.detail}</div>
      <div class="details" id="tile-${m.id}-${i}">
        <strong>Why this appears here:</strong> This option aligns with your answers across the relevant design questions.
      </div>
    </div>
  `).join("");
}

function makeTraffic(items) {
  return items.map((m, i) => `
    <div class="traffic-item" onclick="toggleDetails('traffic-${m.id}-${i}')">
      <div class="traffic-dot ${m.colour || 'yellow'}"></div>
      <div><strong>${m.name}</strong><br><span class="tile-text">${m.detail}</span>
        <div class="details" id="traffic-${m.id}-${i}">Match: ${m.match}%. This reflects your appetite for accountability, simplicity and equal influence.</div>
      </div>
      <div class="score-small">${m.match}%</div>
    </div>
  `).join("");
}

function toggleDetails(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function copyResult() {
  const text = document.getElementById("summary").innerText;
  navigator.clipboard.writeText(text);
  alert("Result copied.");
}

// Initial Kick-off
intro();
