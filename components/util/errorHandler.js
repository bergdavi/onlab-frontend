export default {
    subscribers: [],
    errors: [],

    subscribe: function(callback) {
        if(!this.subscribers) {
            this.subscribers = [];
            this.errors = [];
        }
        this.subscribers.push(callback);
        this.errors.forEach(error => callback(error));
    },

    sendError: function(error) {
        this.errors.push(error);
        this.subscribers.forEach(subscriber => subscriber(error));
    }
};
