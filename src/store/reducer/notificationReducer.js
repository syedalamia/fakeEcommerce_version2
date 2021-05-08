import {ActionTypes} from '../types'
const initial={
    message:'',
    type:'',
    display:false
}

const notificationReducer=(state=initial,action)=>{
    switch(action.type){
        case ActionTypes.ADD_NEW_NOTIFICATION:
            return {...state,message:action.payload.message,type:action.payload.type,display:action.payload.display}
        default:
            return state
    }

}

export default notificationReducer;