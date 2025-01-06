const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {
  constructor(){
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add( data ) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
      return;
    };

    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data){
      if(!node) return new Node(data);

      if(node.data === data) return node;

      if(data < node.data){
        node.left = addNode(node.left, data);
        return node;
      }else{
        node.right = addNode(node.right, data);
        return node;
      }
    }
  }

  has( data ) {
    return !!this.find(data)
  }

  find( data ) {
    if(!this.rootNode) return null;
    return searchNode(this.rootNode, data);

    function searchNode(node, data){
      if(!node) return null;
      if(node.data === data) return node;

      if(data < node.data){
        return searchNode(node.left, data);
      }else{
        return searchNode(node.right, data);
      }
    }
  }

  remove( data ) {
   this.rootNode = removeNode(this.rootNode, data);

   function removeNode(node, data){
    if(!node) return null;

      if(node.data > data){
        node.left = removeNode(node.left, data);
        return node;
      }else if(node.data < data){
        node.right = removeNode(node.right, data)
        return node;
      }else{
        if(!node.left && !node.right) return null;
        if(!node.left) return node.right;
        if(!node.right) return node.left;

        let maxValueFromMin = node.left;

        while(maxValueFromMin.right){
          maxValueFromMin = maxValueFromMin.right;
        }

        node.data = maxValueFromMin.data;
        node.left = removeNode(node.left, maxValueFromMin.data);
        return node;
      }
    }
  }

  min() {
   let node = this.rootNode;
   if(!node) return null;

   while(node.left){
    node = node.left;
   }

   return node.data;
  }

  max() {
    let node = this.rootNode;
    if(!node) return null;

    while(node.right){
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};