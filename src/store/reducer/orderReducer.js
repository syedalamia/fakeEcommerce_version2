import {ActionTypes} from '../types'
const initial={
    orderList:[],
    userorderList:[]
}

const orderReducer=(state=initial,action)=>{
    switch(action.type){
        case ActionTypes.STORE_ORDER_LIST:
            return {...state,orderList:action.payload}  
        case ActionTypes.STORE_USER_ORDER_LIST:
            return {...state,userorderList:action.payload} 
        default:
            return state
    }

}

export default orderReducer;