//wrapper for the state object that grants reactivity
export default class Reactive {
    constructor(data) {

        //store all nodes that reference this state object
        this.nodes = [];

        //capture the this context
        const self = this;

        //build state object
        this.state = new Proxy(data, {
            get(target, key) {
                //extra logic
                //console.log('get', key);

                //default behavior
                return Reflect.get(target, key);
            },
            set(target, key, value) {
                //extra logic
                //console.log('set', key, value);

                //default behavior
                Reflect.set(target, key, value);

                //update all nodes that reference this state object
                self.nodes.map(node => node.update());
                return true;
            }
        });
    }
}