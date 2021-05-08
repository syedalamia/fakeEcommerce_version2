import {ActionTypes} from '../types'
const INITIAL_STATE={
    token:'',
    role:'',
    expire_at:''
}

const sessionReducer=(state=INITIAL_STATE,action)=>{
 
    switch(action.type){
        case ActionTypes.STORE_SESSION:
            return {...state,token:action.payload.token,role:action.payload.role,expire_at:action.payload.expire_at}
        default:
            return  state
    }
}

export default sessionReducer;