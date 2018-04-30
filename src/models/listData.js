import * as listService from '../services/listService'
import _ from 'lodash'

export default {

    namespace: 'listData',

    state: {
        list: []
    },

    subscriptions: {
        setup({dispatch, history}) {
            dispatch({type: 'fetch'})
        },
    },

    effects: {
        * fetch({payload}, {call, put}) {  // eslint-disable-line
            const data = yield call(listService.fetchList);
            yield put({type: 'save', payload: data});
        },
        * fetchRemoveItem({payload}, {call, put}) {
            console.log(_);
            const result = yield call(listService.removeListItem, payload)
            if (result) {
                yield put({type: 'removeItem', payload: payload})
            }
        }
    },

    reducers: {
        save(state, {payload: {data}}) {
            state.list = data.subjects;

            return {...state}
        },

        removeItem(state, {payload: data}) {
            console.log(data);
            console.log(state);
            state.list.splice(data, 1);
            return {...state}
        }
    },

};
