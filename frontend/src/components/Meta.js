import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({title, description, keywords}) => {
    return ( 
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} /> 
        </Helmet>
     );
}

Meta.defaultProps = {
    title: 'Electro Shop',
    description: "Best products in the market",
    keywords: "electronics, buy electronics"
}
 
export default Meta;