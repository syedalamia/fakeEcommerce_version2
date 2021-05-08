import {ActionTypes} from '../types'
const initial={
    userList:[]
}

const userReducer=(state=initial,action)=>{
    switch(action.type){
        case ActionTypes.STORE_ALL_USER_LIST:
            return {...state,userList:action.payload}  
        default:
            return state
    }

}

export default userReducer;