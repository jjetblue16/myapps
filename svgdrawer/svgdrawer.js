document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(text, 'image/svg+xml');
    const svgRoot = svgDoc.documentElement;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optional: scale SVG to fit canvas (very basic)
    // You can enhance this later!
    const viewBox = svgRoot.getAttribute('viewBox');
    let scaleX = 1, scaleY = 1;
    if (viewBox) {
      const vbValues = viewBox.split(/\s+|,/).map(Number);
      const vbWidth = vbValues[2];
      const vbHeight = vbValues[3];
      scaleX = canvas.width / vbWidth;
      scaleY = canvas.height / vbHeight;
    }
    ctx.save();
    ctx.scale(scaleX, scaleY);

    function renderNode(node) {
      if (node.nodeType !== 1) return; // Element nodes only
      const tag = node.tagName.toLowerCase();

      if (tag === 'rect') drawRect(ctx, node);
      else if (tag === 'circle') drawCircle(ctx, node);
      else if (tag === 'path') drawPath(ctx, node);

      node.childNodes.forEach(child => {
        renderNode(child);
      });
    }

    renderNode(svgRoot);
    ctx.restore();
  });

  function drawRect(ctx, node) {
    const x = parseFloat(node.getAttribute('x')) || 0;
    const y = parseFloat(node.getAttribute('y')) || 0;
    const width = parseFloat(node.getAttribute('width')) || 0;
    const height = parseFloat(node.getAttribute('height')) || 0;
    let fill = node.getAttribute('fill');

    if (!fill || fill === 'none') fill = '#000'; // fallback black fill

    ctx.fillStyle = fill;
    ctx.fillRect(x, y, width, height);
  }

  function drawCircle(ctx, node) {
    const cx = parseFloat(node.getAttribute('cx')) || 0;
    const cy = parseFloat(node.getAttribute('cy')) || 0;
    const r = parseFloat(node.getAttribute('r')) || 0;
    let fill = node.getAttribute('fill');

    if (!fill || fill === 'none') fill = '#000';

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function drawPath(ctx, node) {
    const d = node.getAttribute('d');
    if (!d) return;

    const commands = d.match(/[ML][^ML]*/g);
    if (!commands) return;

    ctx.beginPath();

    commands.forEach(cmd => {
      const type = cmd[0];
      const coords = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

      if (type === 'M') ctx.moveTo(coords[0], coords[1]);
      else if (type === 'L') ctx.lineTo(coords[0], coords[1]);
    });

    let stroke = node.getAttribute('stroke');
    if (!stroke || stroke === 'none') stroke = '#000';

    ctx.strokeStyle = stroke;
    ctx.lineWidth = parseFloat(node.getAttribute('stroke-width')) || 1;
    ctx.stroke();
  }
});