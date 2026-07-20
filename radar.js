function drawRadar() {
  const canvas = document.getElementById("radar");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const axes = ["money", "competition", "data", "simple", "accountability"];
  const labels = ["Profit", "Competition", "Data", "Simplicity", "Accountability"];
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 10;
  const radius = 145;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#334155";
  ctx.fillStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.font = "14px Arial";

  for (let ring = 1; ring <= 5; ring++) {
    ctx.beginPath();
    axes.forEach((axis, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI / axes.length);
      const r = radius * ring / 5;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  axes.forEach((axis, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / axes.length);
    const x = cx + Math.cos(angle) * (radius + 45);
    const y = cy + Math.sin(angle) * (radius + 45);
    ctx.fillText(labels[i], x - 38, y);
  });

  drawShape(axes.map(a => userPrefs[a]), "rgba(251,191,36,0.35)", "#fbbf24");
}

function drawShape(values, fill, stroke) {
  const canvas = document.getElementById("radar");
  const ctx = canvas.getContext("2d");
  const axes = values.length;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 10;
  const radius = 145;

  ctx.beginPath();
  values.forEach((value, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / axes);
    const r = radius * value / 100;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 3;
  ctx.stroke();
}