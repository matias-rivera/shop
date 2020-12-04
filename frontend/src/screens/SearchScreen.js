import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../actions/categoryActions';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';

const SearchScreen = ({match}) => {

    const [range, setRange] = useState(200)

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    //products list
    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList 
    

    //categories list
    const categoryList = useSelector(state => state.categoryList)
    const {loadingCategories, errorCategories, categories} = categoryList
    

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
        dispatch(listCategories())
    },[dispatch, keyword, pageNumber])

    return ( 
        <Row>
            <Col className='col-12 col-md-4'>
                <h3>Categories</h3>
                <ListGroup>
                    {loadingCategories ? <Loader /> : errorCategories ? <Message variant='danger'>{errorCategories}</Message> :
                        (
                            categories.map(category => (
                                <ListGroup.Item key={category._id}>{category.name}</ListGroup.Item>
                            ))
                        ) 
                    }
                    
                </ListGroup>
                <h3>Filter by price range</h3>
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label className='h4'>Range: ${range}</Form.Label>
                        <Form.Control type="range" min={1} max={1000} value={range} name='range' onChange={(e) => setRange(parseInt(e.target.value))}/>
                    </Form.Group>
                </Form>
            </Col>
            <Col className='col-12 col-md-8'>
                {loading ? (<Loader />) 
                : error 
                    ? (<Message variant='danger'>{error}</Message>) 
                    : (
                    <>    
                    <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                            <Product product={product}/>
                        </Col>
                    )) }
                    </Row>
                    <Paginate 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''} />
                    </>
                    )}
            </Col>
        </Row>
     );
}
 
export default SearchScreen;