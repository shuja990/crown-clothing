import { takeLatest,call,all, put } from "redux-saga/effects";
import ShopActionTypes from './shop.types';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions'
export function* fetchCollectionsStart(){
    yield takeLatest
        (
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}
export function* fetchCollectionsAsync(){
    yield console.log('hellp from async')
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap));
} catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}
export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
  }