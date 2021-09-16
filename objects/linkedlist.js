//Linked list class
class LinkedList {
    constructor(head = null) {
        this.head = head
    }
}

//List node class
class ListNode {
    constructor(data) {
        this.data = data
        this.next = null
    }
}


function createLinkedList(arr) {
    nodes = [];
    //Go through our input array and create a node for each data point
    for (let i = 0; i < arr.length; i++) {
        let node = new ListNode(arr[i]);
        nodes.push(node);
    }
    //Go through our nodes and give them a "next" value
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].next = nodes[i + 1];
    }
    
    //Create a linked list with the head being the first node
    return new LinkedList(nodes[0]);
}

let before = createLinkedList([17, 4, 8, 49, 12, 109, 53]);

//Parition list given "x", numbers less than x go to the start, numbers equal to, or more than x go to the end.
function partitionList(linkedList, x) {
    //Create a list for more and less than x
    let lessThan = [];
    let moreThan = [];
    //Set currentNode to the head node
    let currentNode = linkedList.head;
    while (currentNode) {
        if (currentNode.data >= x) {
            moreThan.push(currentNode.data);
        } else {
            lessThan.push(currentNode.data);
        }
        currentNode = currentNode.next;
    }
    
    nodes = lessThan.concat(moreThan)
    return createLinkedList(nodes);
} 

let after = partitionList(before, 6);

console.log(JSON.stringify(before));
console.log(JSON.stringify(after));
