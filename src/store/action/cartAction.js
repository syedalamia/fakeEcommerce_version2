import axios from 'axios'
import {ActionTypes} from '../types'
import {Config} from '../../config';



export const addToCart=(product)=>async(dispatch,getStore)=>{
    const {token}=getStore().sessionStore
    axios.post(Config.BASE_URL+'/cart',{
    product:{
        id: product._id,
        quantity : 1
    },
    },{
        headers: {
        'authorization': `bearer ${token}` 
        }
    }).then((res)=>{
        dispatch(storeNotification({
            message:'Added new product',
            type:'SUCCESS',
            display:true
        }))
        dispatch(getCartInfo())
        
    }).catch((e)=>{
        dispatch(storeNotification({
            message:e.response.data.error,
            type:'FAILED',
            display:true
        }))
    })
  
}

export const getCartInfo=()=>async(dispatch,getStore)=>{
    const {token}=getStore().sessionStore

    let {data}=await axios.get(Config.BASE_URL+'/cart',{
        headers: {
            'authorization': `bearer ${token}` 
          }
    })
    dispatch(getCart(data))
}

export const checkoutOrder=()=>async(dispatch,getStore)=>{
    const {token}=getStore().sessionStore

    let {data}=await axios.get(Config.BASE_URL+'/order/checkout',{
        headers: {
            'authorization': `bearer ${token}` 
          }
    })
    dispatch(getCartInfo())
}


const getCart=(data)=>{
    if(data.products){
        return {
            type:ActionTypes.GET_CART_INFO,
            payload:data
        } 
    }else{
        return {
            type:ActionTypes.GET_CART_INFO,
            payload:{
                products:[]
            }
        } 
    }
    
}

const storeNotification=(data)=>{
    
    return {
        type:ActionTypes.ADD_NEW_NOTIFICATION,
        payload:data
    }
}

