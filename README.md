# graph-mcmc [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> This is a Initial version of Graph

## Create a Graph

```js
//creating Nodes
let Node1 = new graphMcmc.Node(1, 1);
let Node2 = new graphMcmc.Node(2, 2);
let Node3 = new graphMcmc.Node(4, 2);
//creating Edges
let Edge1 = new graphMcmc.Edge(Node1, Node2);
let Edge2 = new graphMcmc.Edge(Node3, Node2);
//Listing Nodes
let Nodes = [Node1,Node2,Node3]
let Edges = [Edge1,Edge2]
//Create Your Graph
let myGraph = new graphMcmc.Graph(Nodes, Edges);
```
# Check Properties
```js
//Check if Connected
myGraph.isConnected()
//Check Weight
myGraph.getWeight()
```

That's all folks!
## License

Apache-2.0 © [Arkajit Mandal](MCMC,Graph,Connectivity)


[npm-image]: https://badge.fury.io/js/graph-mcmc.svg
[npm-url]: https://npmjs.org/package/graph-mcmc
[travis-image]: https://travis-ci.org/arkajitmandal/graph-mcmc.svg?branch=master
[travis-url]: https://travis-ci.org/arkajitmandal/graph-mcmc
[daviddm-image]: https://david-dm.org/arkajitmandal/graph-mcmc.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arkajitmandal/graph-mcmc
