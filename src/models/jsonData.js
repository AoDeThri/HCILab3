import { getJsonFile } from '@/services/json'

const JsonDataModel = {
    namespace: 'json',
    state: {
        data: [],
    },
    effects: {
        *fetchJson(_, { call, put }){
            const res = yield call(getJsonFile);
            yield put({
                type: 'saveJson',
                payload: res,
            })
        }
    },
    reducers: {
        saveJson( state, { payload } ){
            return {
                ...state,
                data: payload
            }
        }
    }
}

export default JsonDataModel