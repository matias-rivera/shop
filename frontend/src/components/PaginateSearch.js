import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginateSearch = ({ pages, page, setPage }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <button key={x + 1} onClick={() => setPage(x + 1)}>
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </button>
                ))}
            </Pagination>
        )
    );
};

export default PaginateSearch;
