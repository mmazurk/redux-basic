const redux = require("redux");
const createStore = redux.legacy_createStore;

const CAKE_ORDERED = "CAKE ORDERED";
const RESTOCK_CAKE = "RESTOCK CAKE";

// define your action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function restockCake() {
  return {
    type: RESTOCK_CAKE,
    quantity: 5,
  };
}

// define your initital state
const inititalState = {
  numOfCakes: 10,
  anotherProperty: 0,
};

// create your reducer to define intitial state and how to change state
const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.quantity,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.quantity,
      };
    default:
      return state;
  }
};

// create the store with the reducer
const store = createStore(reducer);
console.log("Initial state", store.getState());

// this is a listener that logs when we update the store
const unsubscribe = store.subscribe(() =>
  console.log("Action", store.getState())
);

// dispatch actions
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake());
store.dispatch(restockCake());
store.dispatch(restockCake());

unsubscribe();
