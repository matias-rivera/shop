import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_USER_LIST_REQUEST,
    ORDER_USER_LIST_SUCCESS,
    ORDER_USER_LIST_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from '../constants/orderConstants'


//create order 
export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //create order request
        const {data} = await axios.post(
            `/api/orders`,
            order,
            config
            )
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


//get order details 
export const getOrderDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //create order request
        const {data} = await axios.get(
            `/api/orders/${id}`,
            config
            )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


//pay order
export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //update order request
        const {data} = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
            )
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}



//deliver order
export const deliverOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        //update order status to delivered
        const {data} = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            config
            )
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}



//get all orders from user
export const listUserOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_USER_LIST_REQUEST
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
        const {data} = await axios.get(
            `/api/orders/myorders`,
            config
            )
        dispatch({
            type: ORDER_USER_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_USER_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


//get all orders from user
export const listOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_LIST_REQUEST
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
        const {data} = await axios.get(
            `/api/orders`,
            config
            )
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}









