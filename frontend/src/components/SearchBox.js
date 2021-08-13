import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/search");
        }
    };

    return (
        <Form
            onSubmit={submitHandler}
            inline
            className="search-box"
            style={{ height: "50px" }}
        >
            <Form.Control
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                style={{ height: "100%" }}
            />
            <Button
                type="submit"
                variant="warning"
                style={{
                    height: "100%",
                    fontSize: "1rem",
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <i class="fa fa-search" aria-hidden="true"></i>
            </Button>
        </Form>
    );
};

export default SearchBox;
