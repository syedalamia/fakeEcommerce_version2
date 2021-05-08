import {ActionTypes} from '../types'
const INITIAL_STATE={
    category_list:[]
}

const categoryReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ActionTypes.STORE_ALL_CATEGORY:
            return {...state,category_list:action.payload}
        default:
            return state;
    }
}

export default categoryReducer;