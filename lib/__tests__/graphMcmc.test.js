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
    assert(testEdge.nodes[0].id === testNode1.id, 'Edge does not conatain proper nodes');
  });
});
