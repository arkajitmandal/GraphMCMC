class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `${x}.${y}`;
  }
}
class Edge {
  constructor(A, B) {
    this.nodes = [A, B];
  }
  // Methods
  distance() {
    var dx = Math.pow(this.nodes[1].x - this.nodes[0].x, 2);
    var dy = Math.pow(this.nodes[0].y - this.nodes[1].y, 2);
    return Math.pow(dx + dy, 0.5);
  }
}

class Graph {
  constructor(Nodes = [], Edges = [], r = 1.0) {
    this.Nodes = Nodes;
    this.Edges = Edges;
    this.r = r;
    this.W = false;
  }
  nodeRemove(i) {
    this.Nodes.splice(i, 1);
  }
  edgeRemove(i) {
    this.Edges.splice(i, 1);
    return true;
  }
  getAdj(j) {
    let Adj = [];
    let Edges = this.Edges;
    let Node = this.Nodes[j];
    for (var i = 0; i < Edges.length; i++) {
      if (Edges[i].nodes[0].id === Node.id) {
        Adj.push(Edges[i].nodes[1]);
      }
      if (Edges[i].nodes[1].id === Node.id) {
        Adj.push(Edges[i].nodes[0]);
      }
    }
    return Adj;
  }
  setr(r) {
    this.r = r;
    return true;
  }
  getEdge(i, j) {
    for (var k = 0; k < this.Edges.length; k++) {
      if (this.Edges[k].nodes[0].id === i.id && this.Edges[k].nodes[1].id === j.id) {
        return this.Edges[k];
      }
      if (this.Edges[k].nodes[1].id === i.id && this.Edges[k].nodes[0].id === j.id) {
        return this.Edges[k];
      }
    }
  }
  getIndex(Nd) {
    for (var i = 0; i < this.Nodes.length; i++) {
      if (this.Nodes[i].id === Nd.id) {
        return i;
      }
    }
  }
  edgeExist(edge, Edges) {
    if (Edges.length !== 0) {
      for (var i = 0; i < Edges.length; i++) {
        if (
          this.nodeExist(edge.nodes[0], Edges[i].nodes) &&
          this.nodeExist(edge.nodes[1], Edges[i].nodes)
        ) {
          return true;
        }
      }
    }
    return false;
  }
  nodeExist(node, Nodes) {
    let id = node.id;
    for (var i = 0; i < Nodes.length; i++) {
      if (id === Nodes[i].id) {
        return true;
      }
    }
    return false;
  }
  addNode(Node) {
    if (!this.nodeExist(Node, this.Nodes)) {
      this.Nodes.push(Node);
    }
  }
  addEdge(Edge) {
    if (!this.edgeExist(Edge, this.Edges)) {
      this.Edges.push(Edge);
    }
  }
  getPath() {
    let distance = Array(this.Nodes.length).fill(Infinity);
    distance[0] = 0;
    distance = djikstra(0, new Graph(this.Nodes, this.Edges), [], distance);
    return distance;
  }
  isConnected() {
    let distance = Array(this.Nodes.length).fill(Infinity);
    distance[0] = 0;
    distance = djikstra(0, new Graph(this.Nodes, this.Edges), [], distance);
    for (var i = 0; i < distance.length; i++) {
      if (distance[i] === Infinity) {
        return false;
      }
    }
    return true;
  }
  getWeight() {
    var w = 0;
    for (var h = 0; h < this.Edges.length; h++) {
      w += this.Edges[h].distance() * this.r;
    }
    let dist = this.getPath();
    for (var i = 0; i < dist.length; i++) {
      w += dist[i];
    }
    return w;
  }
}

function djikstra(index, Graph, visited, distance) {
  visited.push(Graph.Nodes[index]);
  let dist = distance[index];
  let Adj = Graph.getAdj(index);
  for (var j = 0; j < Adj.length; j++) {
    if (!Graph.nodeExist(Adj[j], visited)) {
      let thisEdge = Graph.getEdge(Graph.Nodes[index], Adj[j]);
      distance[Graph.getIndex(Adj[j])] = Math.min(
        thisEdge.distance() + dist,
        distance[Graph.getIndex(Adj[j])]
      );
    }
  }
  // Find which to visit
  let minIndex = false;
  for (var l = 0; l < Adj.length; l++) {
    if (!minIndex && !Graph.nodeExist(Adj[l], visited)) {
      minIndex = Graph.getIndex(Adj[l]);
    }
    if (minIndex !== false) {
      if (
        distance[Adj[l]] < distance[minIndex] &&
        !Graph.nodeExist(Adj[l], Graph.Nodes)
      ) {
        minIndex = l;
      }
    }
  }
  if (minIndex !== false) {
    if (!Graph.nodeExist(Graph.Nodes[minIndex], visited)) {
      djikstra(minIndex, Graph, visited, distance);
    }
  }
  return distance;
}

function getProbability(G1, G2, T) {
  let theta1 = G1.getWeight();
  let theta2 = G2.getWeight();
  return Math.exp((theta1 - theta2) / T);
}

function proposeGraph(G) {
  let badChoice = true;
  var newG;
  while (badChoice) {
    newG = copyGraph(G);
    let randomIndex = Math.floor(Math.random() * newG.Edges.length);
    newG.edgeRemove(randomIndex);
    if (newG.isConnected()) {
      badChoice = false;
      break;
    }
    let randomNode1 = Math.floor(Math.random() * newG.Nodes.length);
    let randomNode2 = Math.floor(Math.random() * newG.Nodes.length);
    while (randomNode1 === randomNode2) {
      randomNode2 = Math.floor(Math.random() * newG.Nodes.length);
    }
    let newEdge = new Edge(newG.Nodes[randomNode1], newG.Nodes[randomNode2]);
    newG.addEdge(newEdge);
    console.log('________________________________________________');
    console.log('This Choice');
    console.log('Edge Broken: ', randomIndex);
    console.log('Edge Added: ', randomNode1, 'and ', randomNode2);
    console.log('Accepted: ', newG.isConnected());
    console.log('________________________________________________');
    if (newG.isConnected()) {
      badChoice = false;
      break;
    }
  }
  return newG;
}

function copyGraph(G) {
  var newG = new Graph();
  for (var n = 0; n < G.Nodes.length; n++) {
    newG.addNode(new Node(G.Nodes[n].x, G.Nodes[n].y));
  }

  for (var i = 0; i < G.Edges.length; i++) {
    let nid1 = G.Edges[i].nodes[0].id;
    let nid2 = G.Edges[i].nodes[1].id;
    let ndx1;
    let ndx2;
    for (var j = 0; j < newG.Nodes.length; j++) {
      if (newG.Nodes[j].id === nid1) {
        ndx1 = j;
      }
      if (newG.Nodes[j].id === nid2) {
        ndx2 = j;
      }
    }
    newG.addEdge(new Edge(newG.Nodes[ndx1], newG.Nodes[ndx2]));
  }
  let newr = G.r;
  newG.setr(newr);
  return newG;
}

module.exports = {
  Node: Node,
  Edge: Edge,
  Graph: Graph,
  djikstra: djikstra,
  getProbability: getProbability,
  copyGraph: copyGraph,
  proposeGraph: proposeGraph
};
