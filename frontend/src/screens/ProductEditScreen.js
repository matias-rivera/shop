import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from './../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listCategories } from '../actions/categoryActions'

const ProductEditScreen = ({match, history}) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    //product data
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    //categories list
    const categoryList = useSelector(state => state.categoryList)
    const {loadingCategories, errorCategories, categories} = categoryList

    //product update state
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate


    useEffect( () => {
        //after update redirect to productList
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch({type: PRODUCT_DETAILS_RESET})
            history.push('/admin/productlist')
        } 
        else{
            //load product data
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
                dispatch(listCategories())
            } else{
                //set states
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setCategory(product.category._id)
            }

        }
        

        
    },[dispatch, history, productId, product, successUpdate])

    //handle form
    const submitHandler = (e) => {
        e.preventDefault()
        //update product
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))

    }


    // upload file
    const uploadingFileHandler = async(e) => {
        //get first element from files which one is the image
        const file = e.target.files[0]
        //form instance
        const formData = new FormData()
        //add file
        formData.append('image', file)
        //start loader
        setUploading(true)
        try {
            //form config
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            //api call to upload image
            const {data} = await axios.post('/api/upload',formData, config)
            //set image path
            setImage(data)
            //stop loader
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return ( 
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Form onSubmit={submitHandler} className='pb-2'>
                
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                
                <Form.Group controlId='price'>
                    <Form.Label>
                        Price
                    </Form.Label>
                    <Form.Control
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>
                         Image
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control>
                    <Form.File
                        id='image-file'
                        label='Choose file'
                        custom
                        onChange={uploadingFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>
                         Brand
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>
                        Count in Stock
                    </Form.Label>
                    <Form.Control
                        type='number'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        as="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                     {loadingCategories ? <Loader /> : errorCategories ? <Message variant='danger'>{errorCategories}</Message> :
                    (
                        categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                    ) 
                    }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>
                         Description
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>





                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>

            )}
         
            </FormContainer>
     
        </>
        )
}
 
export default ProductEditScreen;