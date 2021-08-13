import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Form, Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import PaginateSearch from "../components/PaginateSearch";
import Product from "../components/Product";

const SearchScreen = ({ history, match }) => {
    const category = match.params.category || "";
    const keyword = match.params.keyword || "";
    /* let pageNumber = match.params.pageNumber || 1 */

    const [range, setRange] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(
        category ? category : ""
    );

    const dispatch = useDispatch();

    //products list
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    //categories list
    const categoryList = useSelector((state) => state.categoryList);
    const { loadingCategories, errorCategories, categories } = categoryList;

    /* useEffect(() => {
        if(category){
            setSelectedCategory(category)
        }
    },[category]) */

    useEffect(() => {
        setPageNumber(1);
        dispatch(listProducts(keyword, 1, selectedCategory, range));
    }, [selectedCategory]);

    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(listCategories());
        }
        dispatch(listProducts(keyword, pageNumber, selectedCategory, range));
    }, [dispatch, keyword, pageNumber, range]);

    const handleCategories = (e, categoryName) => {
        e.preventDefault();
        setSelectedCategory(categoryName);
    };

    const handleRange = (e, rangeSelected) => {
        e.preventDefault();
        setRange(rangeSelected);
    };

    return (
        <Row>
            <Col className="col-12 col-md-4">
                {keyword && (
                    <>
                        <h3 className="d-none d-sm-block">Searched</h3>
                        <Button
                            className="mb-2"
                            variant="warning"
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}
                            onClick={() => {
                                history.push("/search");
                            }}
                        >
                            {keyword}
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </>
                )}
                <Row noGutters={true}>
                    <Col className="col-6 col-md-12">
                        <h3 className="d-none d-sm-block">Categories</h3>
                        <ListGroup>
                            {loadingCategories ? (
                                <Loader />
                            ) : errorCategories ? (
                                <Message variant="danger">
                                    {errorCategories}
                                </Message>
                            ) : (
                                <>
                                    <ListGroup.Item
                                        active={selectedCategory === ""}
                                        onClick={(e) => handleCategories(e, "")}
                                    >
                                        All
                                    </ListGroup.Item>
                                    {categories.map((cat) => (
                                        <ListGroup.Item
                                            key={cat._id}
                                            active={
                                                selectedCategory === cat.name
                                            }
                                            onClick={(e) =>
                                                handleCategories(e, cat.name)
                                            }
                                        >
                                            {cat.name}
                                        </ListGroup.Item>
                                    ))}
                                </>
                            )}
                        </ListGroup>
                    </Col>
                    <Col className="col-6 col-md-12">
                        <h3 className="d-none d-sm-block">Price</h3>
                        <ListGroup>
                            <ListGroup.Item
                                active={!range}
                                onClick={(e) => handleRange(e, null)}
                            >
                                All
                            </ListGroup.Item>
                            <ListGroup.Item
                                active={range === 1000}
                                onClick={(e) => handleRange(e, 1000)}
                            >
                                $1000
                            </ListGroup.Item>
                            <ListGroup.Item
                                active={range === 500}
                                onClick={(e) => handleRange(e, 500)}
                            >
                                $500
                            </ListGroup.Item>
                            <ListGroup.Item
                                active={range === 200}
                                onClick={(e) => handleRange(e, 200)}
                            >
                                $200
                            </ListGroup.Item>
                            <ListGroup.Item
                                active={range === 100}
                                onClick={(e) => handleRange(e, 100)}
                            >
                                $100
                            </ListGroup.Item>
                            <ListGroup.Item
                                active={range === 50}
                                onClick={(e) => handleRange(e, 50)}
                            >
                                $50
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Col>
            <Col className="col-12 col-md-8">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <Row>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Col
                                        key={product._id}
                                        sm={12}
                                        md={6}
                                        lg={4}
                                        xl={4}
                                    >
                                        <Product product={product} />
                                    </Col>
                                ))
                            ) : (
                                <Message variant="danger" className="center">
                                    No products found.
                                </Message>
                            )}
                        </Row>
                        <PaginateSearch
                            pages={pages}
                            page={page}
                            setPage={setPageNumber}
                        />
                    </>
                )}
            </Col>
        </Row>
    );
};

export default SearchScreen;
