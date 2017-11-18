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
    this.Edges.push(Edge);
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

// Make a graph
let Node1 = new Node(1, 1);
let Node2 = new Node(2, 2);
let Node3 = new Node(4, 2);
let Edge1 = new Edge(Node1, Node2);
let Edge2 = new Edge(Node3, Node2);
let G = new Graph([Node1, Node2, Node3], [Edge1, Edge2]);
console.log(G.getPath());
module.exports = { Node: Node, Edge: Edge, Graph: Graph, djikstra: djikstra };
