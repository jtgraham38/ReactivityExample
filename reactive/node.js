export default class Node{
    constructor(reactive, element) {
        //save reference to state object and element
        this.reactive = reactive;
        this.element = element;

        //add self to state node list
        reactive.nodes.push(this);

        //initialize all directives
        this.update();
    }

    update() {
        //apply all directives
        this.j_text();
        this.j_on();
        this.j_show();

    }

    //  \\  //  \\  //  \\ DIRECTIVE DEFINITIONS //  \\  //  \\  //  \\
    j_text(){
        if (this.element.hasAttribute('j-text')){
            this.element.innerText = this.reactive.state[this.element.getAttribute('j-text')];
        }
    }

    j_on() {
        if (this.element.hasAttribute('j-on')) {
            const [event, method] = this.element.getAttribute('j-on').split('|');
            //console.log(event, method);

            //ensure duplicate event listeners are not created
            if (this['j-on-' + event]) {
                return;
            } else {
                //define code to run when event is triggered
                const f = function() {
                    eval(method);
                }

                //bind f to the state object
                const fn = f.bind(this.reactive.state);

                //create event listener
                this.element.addEventListener(event, fn);

                //store event listener
                this['j-on-' + event] = fn;
            }
        }
    }

    j_show() {
        if (this.element.hasAttribute('j-show')) {
            //get the expression to determine visibility
            const expr = this.element.getAttribute('j-show');

            //evaluate the expression
            const f = function () {
                return eval(expr);
            }

            //bind f to the state object
            const fn = f.bind(this.reactive.state);

            const display = fn() ? '' : 'none';

            //update the element's visibility when the expression changes
            this.element.style.display = display;
        }
    }
}