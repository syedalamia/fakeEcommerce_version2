import {ActionTypes} from '../types';
import axios from 'axios';
import {Config} from '../../config';
import {addSessionData} from '../action/sessionAction'
import {getCartInfo} from '../action/cartAction'



export const userLogin=(data)=>async(dispatch,getStore)=>{
   
    axios.post('http://127.0.0.1:8080/signin',{
      email: data.email,
      password: data.password,
      
    }).then((res)=>{
        if(res.data.message==="Wrong Password"){
            dispatch(storeNotification({
                message:'Wrong Password',
                type:'FAILER',
                display:true
            }))
        }else if(res.data.userInfo){
          sessionStorage.setItem('jwtToken',JSON.stringify(res.data.userInfo));
          dispatch(addSessionData(res.data.userInfo))
          dispatch(getCartInfo())
         
        }else{
            dispatch(storeNotification({
                message:'User not found',
                type:'FAILER',
                display:true
            }))
        }
        
    }).catch((e)=>{

      dispatch(storeNotification({
        message:'Server error...',
        type:'FAILER',
        display:true
    }))
    })
}



export const getUserList=(data)=>async(dispatch,getStore)=>{
    const {token}=getStore().sessionStore
    axios.get(Config.BASE_URL+'/user',{
        headers: {
        'authorization': `bearer ${token}` 
        }
    }).then((res)=>{
        dispatch(storeUserData(res.data))
        
    }).catch((e)=>{
        dispatch(storeNotification({
            message:e.response.data.error,
            type:'FAILED',
            display:true
        }))
    })
}


const storeUserData=(data)=>{
    return {
        type:ActionTypes.STORE_ALL_USER_LIST,
        payload:data
    }
}
const storeNotification=(data)=>{
    
    return {
        type:ActionTypes.ADD_NEW_NOTIFICATION,
        payload:data
    }
}
