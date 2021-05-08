import {ActionTypes} from '../types';

export const addSessionData=(data)=>async(dispatch,getStore)=>{
    dispatch(storeSession(data)) 
}


const storeSession=(data)=>{
    return {
        type:ActionTypes.STORE_SESSION,
        payload:data
    }
}