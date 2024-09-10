import Node from './node.js';
import Reactive from './reactive.js';

// create reactive objects for any entity with the j-state attribute
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[j-state]');
    elements.forEach(element => {
        //create a state object for each element
        const state = JSON.parse(element.getAttribute('j-state'));
        const reactive = new Reactive(state);
        //console.log(reactive.state);

        //supply all child elements with a node with access to the state object
        giveReactiveRef(element, reactive);

    });
})

//recursive function that traverses the DOM tree, supplying each element with a reference to the state object
function giveReactiveRef(element, state) {
    //create a node for the element with access to the state object
    element._j_node = new Node(state, element);

    //traverse the child elements
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        giveReactiveRef(children[i], state);
    }
}
