const assert = require('assert');
var graphMcmc = require('../index.js');

describe('Graph Testing', () => {
  it('Nodes Creation Test', () => {
    var x = 1.0;
    var y = 2.0;
    const testNode = new graphMcmc.Node(x, y);
    assert(parseFloat(testNode.x) === parseFloat(x), 'Node x, is not created properly');
    assert(parseFloat(testNode.y) === parseFloat(y), 'Node y, is not created properly');
    assert(testNode.id === `${x}.${y}`, 'Node id, is not created properly');
  });
  it('Edges Creation Test', () => {
    const testNode1 = new graphMcmc.Node(1, 2);
    const testNode2 = new graphMcmc.Node(2, 2);
    const testEdge = new graphMcmc.Edge(testNode1, testNode2);
    assert(testEdge.nodes[0].id === testNode1.id, 'Edge does not contain proper nodes');
    assert(testEdge.nodes[1].id === testNode2.id, 'Edge does not contain proper nodes');
    assert(testEdge.distance() === 1.0);
  });
  it('Removal Tests', () => {
    const testNode1 = new graphMcmc.Node(1, 2);
    const testNode2 = new graphMcmc.Node(2, 2);
    const testEdge = new graphMcmc.Edge(testNode1, testNode2);
    const testGraph = new graphMcmc.Graph([testNode1, testNode2], [testEdge]);
    testGraph.nodeRemove(1);
    testGraph.edgeRemove(0);
    assert(testGraph.Nodes.length === 1, 'Node not removed');
    assert(testGraph.Nodes[0].id === testNode1.id, 'Wrong Node removed');
    assert(testGraph.Edges.length === 0, 'Edges not Removed');
  });
  it('Graph Creation Test', () => {
    const testNode1 = new graphMcmc.Node(1, 2);
    const testNode2 = new graphMcmc.Node(2, 2);
    const testEdge = new graphMcmc.Edge(testNode1, testNode2);
    const testGraph = new graphMcmc.Graph([testNode1, testNode2], [testEdge]);
    assert(testGraph.Edges.length === 1, 'Graph does not add edges');
    assert(testGraph.Nodes[0].id === testNode1.id, 'Graph does not contain proper nodes');
    testGraph.nodeRemove(0);
    assert(testGraph.Nodes[0].id === testNode2.id, 'Graph does not delete proper nodes');
    testGraph.edgeRemove(0);
    assert(testGraph.Edges.length === 0, 'Graph does not delete edges');
    testGraph.addEdge(testEdge);
    assert(testGraph.Edges.length === 1, 'Graph does not add edges');
    testGraph.addEdge(testEdge);
    assert(testGraph.Edges.length === 1, 'same edge was added');
    const testGraph2 = new graphMcmc.Graph([testNode1, testNode2], [testEdge]);
    assert(testGraph2.getAdj(0)[0].id === testNode2.id, 'Adjacents not returned');
    testGraph2.setr(2);
    assert(testGraph2.r === 2, 'r value not set in graph');
    assert(
      testGraph2.getEdge(testNode1, testNode2).nodes[0].id === testNode1.id,
      'Geting Edge info is not working'
    );
    assert(
      testGraph2.getEdge(testNode1, testNode2).nodes[1].id === testNode2.id,
      'Geting Edge info is not working'
    );
    assert(testGraph2.getIndex(testNode2) === 1, 'Index of nodes not returned properly');
    const testNode3 = new graphMcmc.Node(5, 2);
    let prevNodes = testGraph.Nodes.length;
    testGraph.addNode(testNode3);
    let nowNodes = testGraph.Nodes.length;
    assert(prevNodes === nowNodes - 1, 'node add method does not work');
  });
  it('Graph Functionality Test', () => {
    let Node1 = new graphMcmc.Node(1, 1);
    let Node2 = new graphMcmc.Node(2, 2);
    let Node3 = new graphMcmc.Node(4, 2);
    let Edge1 = new graphMcmc.Edge(Node1, Node2);
    let Edge2 = new graphMcmc.Edge(Node3, Node2);
    let G = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1]);
    assert(!G.isConnected(), 'Graph Should be Disconnected');
    assert(G.getWeight() === Infinity, 'Disconnected graph has Inf Weight');
    let l1 = G.Edges.length;
    G.addEdge(Edge2);
    assert(G.Edges.length === l1 + 1, 'Addition of edges not working');
    assert(G.isConnected(), 'Graph Should be Connected');
  });
});
describe('Dikstra Testing', () => {
  it('function check', () => {
    let Node1 = new graphMcmc.Node(1, 1);
    let Node2 = new graphMcmc.Node(2, 2);
    let Node3 = new graphMcmc.Node(4, 2);
    let Edge1 = new graphMcmc.Edge(Node1, Node2);
    let Edge2 = new graphMcmc.Edge(Node3, Node2);
    let G = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1, Edge2]);
    let distance = Array(G.Nodes.length).fill(Infinity);
    distance[0] = 0;
    distance = graphMcmc.djikstra(0, G, [], distance);
    assert(distance.length === G.Nodes.length, 'Distances not returned Properly');
    assert(distance[0] === 0, 'Origin Node is not at 0');
    assert(distance[1] !== Infinity, 'Another node should be connected');
  });
});
describe('Probability', () => {
  it('function check', () => {
    let Node1 = new graphMcmc.Node(1, 1);
    let Node2 = new graphMcmc.Node(2, 2);
    let Node3 = new graphMcmc.Node(4, 2);
    let Edge1 = new graphMcmc.Edge(Node1, Node2);
    let Edge2 = new graphMcmc.Edge(Node3, Node2);
    let Edge3 = new graphMcmc.Edge(Node3, Node1);
    let G1 = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1, Edge2]);
    let G2 = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1]);
    assert(graphMcmc.getProbability(G1, G2, 1.0) === 0.0, 'Wrong transition probability');
    let G3 = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1, Edge3]);
    assert(graphMcmc.getProbability(G1, G3, 1.0) <= 1.0, 'Probability exceeds 1.0');
    assert(graphMcmc.getProbability(G1, G3, 1.0) > 0.0, 'Probability is negative');
  });
});
describe('Clone Testing', () => {
  it('Copy check', () => {
    let Node1 = new graphMcmc.Node(1, 1);
    let Node2 = new graphMcmc.Node(2, 2);
    let Node3 = new graphMcmc.Node(4, 2);
    let Edge1 = new graphMcmc.Edge(Node1, Node2);
    let Edge2 = new graphMcmc.Edge(Node3, Node2);
    let G1 = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1, Edge2]);
    let G2 = graphMcmc.copyGraph(G1);
    assert(G1.Nodes.length === G2.Nodes.length, 'Nodes not copied properly');
    assert(G1.Edges.length === G2.Edges.length, 'Edges not copied properly');
    assert(G1.getWeight() === G2.getWeight(), 'weight should be equal');
  });
  it('Cloning check', () => {
    let Node1 = new graphMcmc.Node(1, 1);
    let Node2 = new graphMcmc.Node(2, 2);
    let Node3 = new graphMcmc.Node(4, 2);
    let Edge1 = new graphMcmc.Edge(Node1, Node2);
    let Edge2 = new graphMcmc.Edge(Node3, Node2);
    let G1 = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1, Edge2]);
    let G2 = graphMcmc.copyGraph(G1);
    G2.edgeRemove(0);
    assert(G1.Edges.length !== G2.Edges.length, 'Class is a mirror object');
  });
});
describe('Graph Proposal', () => {
  it('function check', () => {
    let Node1 = new graphMcmc.Node(1, 1);
    let Node2 = new graphMcmc.Node(2, 2);
    let Node3 = new graphMcmc.Node(4, 2);
    let Edge1 = new graphMcmc.Edge(Node1, Node2);
    let Edge2 = new graphMcmc.Edge(Node3, Node2);
    let G1 = new graphMcmc.Graph([Node1, Node2, Node3], [Edge1, Edge2]);
    let G2 = graphMcmc.proposeGraph(G1);
    assert(G2.isConnected(), 'Invalid proposal');
  });
});
