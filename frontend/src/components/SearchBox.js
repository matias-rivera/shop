import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/search')
        }
    }

    return ( 
        <Form
            onSubmit={submitHandler}
           inline
        >
            <Form.Row className='d-flex align-items-center' >
                        <Col xs={8}>
                        
                        <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search Products...'
                        className='mr-sm-2 nl-sn-5'
                        
                        >
                        </Form.Control>
                        </Col>
                        <Col xs={4}>
                        <Button
                            type='submit'
                            variant='warning'
                            
                            
                            >
                            Search
                        </Button>
                        
                        </Col>
         
          
               
                 
            </Form.Row>
        </Form>
     );
}
 
export default SearchBox;