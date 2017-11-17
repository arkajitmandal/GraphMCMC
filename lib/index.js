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
}
module.exports = { Node: Node, Edge: Edge, Graph: Graph };
