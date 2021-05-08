import {ActionTypes} from '../types'

const INITIAL_STATE={
    loading :true
}

const loaderReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ActionTypes.LOADER:
            return {...state,loading:action.payload}
        default:
            return state;
    }
}

export default loaderReducer;