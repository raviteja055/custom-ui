import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_PRODUCT_DETAILS = gql`

        query getProductById($searchText: String!) {
            getProductById(input: { searchText: $searchText }) {
                _id
                name
                description
                price
                color
                image
                size
                material
                brand
                weight
      reviews{
        title
      }
    }
  }
`;



const ProductDetailsPage = () => {
    const { id } = useParams();

    const [getProducts, { loading, error, data }] = useLazyQuery(GET_PRODUCT_DETAILS);

    useEffect(() => {
        console.log("searchText", id)

        getProducts({ variables: { searchText: id } });

    }, [id])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    console.log("data", data && data.getProductById)

    return (
        <div className="container productDetails">
            <div className='row'>
                <div className='col-sm-6'><img src={data && data.getProductById.image} /> </div>
                <div className='col-sm-6'>content</div>

            </div>

        </div>
    )
}

export default ProductDetailsPage