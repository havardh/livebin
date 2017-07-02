class Store {

  constructor() {
    this.subscribers = [];
  }

  getText() {
    return this.state;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify(type) {
    for (let subscriber of this.subscribers) {
      subscriber(type);
    }
  }

  update(action) {
    const nextState = this.reduce(this.state, action);
    this.state = nextState;
    this.notify(action.type);
  }

  reduce(state = "", action) {
    switch (action.type) {
      case "RECEIVE_TEXT":
        return action.data;
      default:
        return state;
    }
  }

}

export default new Store();
