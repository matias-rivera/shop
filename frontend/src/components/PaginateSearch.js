import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



const PaginateSearch = ({ pages, page, keyword = '',category='' }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer 
                key={x + 1} 
                to={keyword ? `/search/${keyword}/page/${x+1}` : `/search/${category}/category/page/${x+1}`}>
                    <Pagination.Item active={x + 1 === page}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}
 
export default PaginateSearch;