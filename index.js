const redux = require("redux");
const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// action type
const CAKE_ORDERED = "CAKE ORDERED";
const RESTOCK_CAKE = "RESTOCK CAKE";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOCKED = "ICE_CREAM_RESTOCKED";

// action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

// action creator
function restockCake(quantity = 1) {
  return {
    type: RESTOCK_CAKE,
    payload: quantity,
  };
}

function orderIceCream(quantity = 1) {
  return {
    type: ICE_CREAM_ORDERED,
    payload: quantity,
  };
}
function restockIceCream(quantity = 1) {
  return {
    type: ICE_CREAM_RESTOCKED,
    payload: quantity,
  };
}

// define your initital states
const inititalIceCreamState = {
  numOfIceCreams: 20,
};
const inititalCakeState = {
  numOfCakes: 10,
};

// create a reducer to define intitial state and how to change state
const iceCreamReducer = (state = inititalIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICE_CREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// create a reducer to define intitial state and how to change state
const cakeReducer = (state = inititalCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// Here's how we combine mulitple reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// create the store with the reducer
// we later added a logger
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());

// this is a listener that logs when we update the store
const unsubscribe = store.subscribe(
  () => {}
  // console.log("Action", store.getState())
);

// dispatch actions
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(5));
store.dispatch(restockCake(3));
store.dispatch(restockCake(1));
store.dispatch(orderIceCream(5));
store.dispatch(restockIceCream(12));

unsubscribe();
