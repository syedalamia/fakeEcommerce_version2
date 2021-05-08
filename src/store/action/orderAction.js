import {ActionTypes} from '../types';
import axios from 'axios';
import {Config} from '../../config';

export const getAllorderinfo=(data)=>async(dispatch,getStore)=>{
    const {token}=getStore().sessionStore
    axios.get(Config.BASE_URL+'/order',{
        headers: {
        'authorization': `bearer ${token}` 
        }
    }).then((res)=>{
        dispatch(storeOrderData(res.data))
        
    }).catch((e)=>{
        dispatch(storeNotification({
            message:e.response.data.error,
            type:'FAILED',
            display:true
        }))
    })
}


export const getuserOrder=(data)=>async(dispatch,getStore)=>{
    const {token}=getStore().sessionStore
    axios.get(Config.BASE_URL+'/order/my-order',{
        headers: {
        'authorization': `bearer ${token}` 
        }
    }).then((res)=>{
        dispatch(storeuserOrderData(res.data))
        
    }).catch((e)=>{
        console.log(e)
        dispatch(storeNotification({
            message:e.response.data.error,
            type:'FAILED',
            display:true
        }))
    })
}

const storeOrderData=(data)=>{
    return {
        type:ActionTypes.STORE_ORDER_LIST,
        payload:data
    }
}
const storeuserOrderData=(data)=>{
    return {
        type:ActionTypes.STORE_USER_ORDER_LIST,
        payload:data
    }
}


const storeNotification=(data)=>{
    
    return {
        type:ActionTypes.ADD_NEW_NOTIFICATION,
        payload:data
    }
}
