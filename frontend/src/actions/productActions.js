import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST
} from '../constants/productConstants'

//get products list
export const listProducts = () =>  async (dispatch) => { 
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        
        //api call to get all products
        const {data} = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }) 
    } catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

//get product details
export const listProductDetails = (id) =>  async (dispatch) => { 
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        
        //api call to get product 
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        }) 
    } catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


//get all orders from user
export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //get orders
        await axios.delete(
            `/api/products/${id}`,
            config
            )
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}




