import {ActionTypes} from '../types'

export const setNotificationDisplay=()=>async(dispatch,getStore)=>{
    dispatch(storeNotification());
}

const storeNotification=()=>{
    return {
        type:ActionTypes.ADD_NEW_NOTIFICATION,
        payload:{
            message:'',
            type:'',
            display:false
        }
    }
}
