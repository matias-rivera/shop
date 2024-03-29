import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "./../components/Loader";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Paginate from "./../components/Paginate";
import ProductCarousel from "./../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            <ProductCarousel />
            <Link to="/search" classname="h1">
                <h1 className="text-center">Latest Products</h1>
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product, i) =>
                            i < 8 ? (
                                <Col
                                    key={product._id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <Product product={product} />
                                </Col>
                            ) : null
                        )}
                    </Row>
                    {/* <Paginate 
                    pages={pages} 
                    page={page} 
                    keyword={keyword ? keyword : ''} /> */}
                </>
            )}
        </>
    );
};

export default HomeScreen;
