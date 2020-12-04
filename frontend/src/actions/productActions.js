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
    PRODUCT_DELETE_REQUEST,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from '../constants/productConstants'

//get products list
export const listProducts = (keyword = '', pageNumber = '', category = '', range = null) =>  async (dispatch) => { 
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        
        //api call to get all products
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}&range=${range ? range : ''}`)
        console.log(data)
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

//get products list
export const getRelatedProducts = (category) =>  async () => { 
    try{
        //api call to get related products
        return await axios.get(`/api/products/related?category=${category}`)
        
    } catch(error){
        return error
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


//delete a product
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

        //delete
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


//create a single product
export const createProduct = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //create product
        const {data} = await axios.post(
            `/api/products`,
            {},
            config
            )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


//update a single product
export const updateProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
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

        //update product
        const {data} = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
            )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

//crate product review
export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
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

        //create review
        await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            config
            )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

//get products list
export const listTopProducts = () =>  async (dispatch) => { 
    try{
        dispatch({type: PRODUCT_TOP_REQUEST})
        
        //api call to get all products
        const {data} = await axios.get(`/api/products/top`)
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        }) 
    } catch(error){
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}






