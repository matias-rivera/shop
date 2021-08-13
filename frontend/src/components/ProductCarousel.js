import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "./../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import "./carousel.css";
import sliderGeforce from "../assets/slider-geforce.jpg";
import sliderIphone from "../assets/slider-iphone.jpg";
import sliderXbox from "../assets/slider-xbox.jpg";

const ProductCarousel = () => {
    const dispatch = useDispatch();

    /* const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated; */

    /* useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]); */

    return (
        <Carousel className="h-60">
            <Carousel.Item interval={1000}>
                <Link to={`/product/5fcf2e210c022e21084676fc`}>
                    <img
                        className="d-block w-100"
                        src={sliderXbox}
                        alt="Xbox Series X"
                    />
                </Link>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <Link to={`/product/5fcf2e210c022e21084676f3`}>
                    <img
                        className="d-block w-100"
                        src={sliderIphone}
                        alt="iPhone 11 Pro"
                    />
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to={`/product/5fcf2e210c022e21084676ff`}>
                    <img
                        className="d-block w-100"
                        src={sliderGeforce}
                        alt="Geforce RTX 3070"
                    />
                </Link>
            </Carousel.Item>
        </Carousel>
    );
};

export default ProductCarousel;

{
    /* <div className="carousel-background">
            <Carousel pause="hover" styles={{ background: "transparent" }}>
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link
                            to={`/product/${product._id}`}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                style={{ maxWidth: "300px" }}
                            />
                            <Carousel.Caption className="carousel-caption">
                                <h2 className="d-none d-sm-none d-md-block">
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div> */
}
