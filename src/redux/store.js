import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist'
import rootReducer from './root-reducer'
import createSagaMiddleWare from 'redux-saga'
import rootSaga from './root-saga'
const sagaMiddleWare = createSagaMiddleWare();
const middlewares = [sagaMiddleWare];
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares))
sagaMiddleWare.run(rootSaga)
export const persistor = persistStore(store);
export default {store,persistor};