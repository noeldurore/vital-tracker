/*** 
 *  File: sophisticated_code.js
 *  Description: This code demonstrates a complex and sophisticated JavaScript implementation.
 *  It includes a custom data structure, algorithms, event handling, and DOM manipulation.
 ***/

// Custom data structure for a binary tree node
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Function to insert a node into a binary tree
const insertNode = (root, value) => {
  // If root is null, create a new node with the given value
  if (!root) {
    root = new Node(value);
    return root;
  }

  // Recursively insert the node
  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }
  return root;
};

// Function to traverse a binary tree in-order and store values in an array
const inOrderTraversal = (root, result) => {
  if (!root) return;
  inOrderTraversal(root.left, result);
  result.push(root.value);
  inOrderTraversal(root.right, result);
};

// Generate a random binary tree with 10 nodes
const generateBinaryTree = () => {
  const root = new Node(50);
  insertNode(root, 30);
  insertNode(root, 70);
  insertNode(root, 20);
  insertNode(root, 40);
  insertNode(root, 60);
  insertNode(root, 80);
  insertNode(root, 10);
  insertNode(root, 90);
  insertNode(root, 75);
  return root;
};

// Event handler for button click
const handleClick = () => {
  const root = generateBinaryTree();
  const result = [];
  inOrderTraversal(root, result);
  console.log("In-order traversal of the binary tree:", result);
  document.getElementById("output").textContent = result.join(" -> ");
};

// Add a button and output div to the document body
const initializeDOM = () => {
  const button = document.createElement("button");
  button.textContent = "Traverse Binary Tree";
  button.addEventListener("click", handleClick);
  document.body.appendChild(button);

  const outputDiv = document.createElement("div");
  outputDiv.id = "output";
  document.body.appendChild(outputDiv);
};

// Initialize the DOM when the script loads
window.addEventListener("DOMContentLoaded", initializeDOM);