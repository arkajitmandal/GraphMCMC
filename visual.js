var blue = '#2196F3';
var red = '#ff005b';
var green = '#00E676';

function drawNode(x, y, fill = '#ff005b') {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var centerX = x;
  var centerY = y;
  var radius = 5;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = fill;
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = fill;
  context.shadowColor = fill;
  context.shadowBlur = 5;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.stroke();
}

function drawEdge(x1, y1, x2, y2, fill = '#00E676') {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 2;
  context.strokeStyle = fill;
  context.shadowColor = fill;
  context.shadowBlur = 10;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.stroke();
}

function drawGraph(dG) {
  // Clean
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Disable add
  Lock = true;
  let GNodes = dG.Nodes;
  let GEdges = dG.Edges;
  // DrawEdges
  for (var i = 0; i < GEdges.length; i++) {
    let Node1 = GEdges[i].nodes[0];
    let Node2 = GEdges[i].nodes[1];
    let col = green;
    if (Node1.id === GNodes[0].id || Node2.id === GNodes[0].id) {
      col = red;
    }
    drawEdge(Node1.x, Node1.y, Node2.x, Node2.y, col);
  }
  // DrawNodes
  drawNode(GNodes[0].x, GNodes[0].y);
  for (var i = 1; i < GNodes.length; i++) {
    drawNode(GNodes[i].x, GNodes[i].y, green);
  }
}
