export default {
    subscribers: [],
    errors: [],

    subscribe: function(callback) {
        if(!this.subscribers) {
            this.subscribers = [];
            this.errors = [];
        }
        console.log("subbed");
        this.subscribers.push(callback);
        this.errors.forEach(error => callback(error));
        console.log(this.subscribers);
    },

    sendError: function(error) {
        console.log("msg");
        this.errors.push(error);
        this.subscribers.forEach(subscriber => subscriber(error));
    }
};
