import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateVariant from "redux-immutable-state-invariant";
import rootReducer from "./reducers";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateVariant())
  );
}
