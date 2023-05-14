import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_DATA = gql`
query productDetailsData {
  productDetailsData {
    _id
    name
    description
    price
    color
    size
    material
    brand
    weight
    dimensions {
      length
      width
      height
    }
    availability
    image
    launchDate
  }
}

`;
const SEARCH_PRODUCTS = gql`
  query SearchProducts($searchText: String!) {
    searchProducts(input: { searchText: $searchText }) {
      _id
      name
      description
      price
      color
      size
      material
      brand
      weight
    }
  }
`;




const ProductListing = () => {
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_DATA);
    const [searchText, setsearchText] = useState()
    const [getProducts, { loading: searchLoading, error: searchError, data: searchData }] = useLazyQuery(SEARCH_PRODUCTS);

    const handleSearch = () => {
        getProducts({ variables: { searchText } });
    };
    const [productData, setproductData] = useState([])


    useEffect(() => {
        console.log("datadata", data)
        if (data) {
            setproductData(data.productDetailsData)
        }
    }, [data])
    useEffect(() => {
        console.log("datadata", searchData)
        if (searchData) {
            setproductData(searchData.searchProducts)
        }
    }, [searchLoading])
    if (loading || searchLoading) {
        return <p>Loading...</p>;
    }

    if (error || searchError) {
        return <p>Error: {error ? error.message : searchError.message}</p>;
    }

    const handleProductClick = (productId) => {
        // Redirect to the product details page with the given productId
        navigate(`/product/${productId}`);
    };
    return (
        <>
            <div class="container">

                <input onChange={(e) => setsearchText(e.target.value)} />
                <button onClick={handleSearch} >Search</button>
                {/* <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Material</th>
                        <th>Brand</th>
                        <th>Weight</th>
                    </tr>
                </thead> */}
                {/* <tbody>
                    {productData.map((item) => (
                        <tr key={item._id} onClick={() => handleProductClick(item._id)}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.price}</td>
                            <td>{item.color}</td>
                            <td>{item.size}</td>
                            <td>{item.material}</td>
                            <td>{item.brand}</td>
                            <td>{item.weight}</td>
                        </tr>
                    ))}
                </tbody> */}
                {/* </table> */}
                {productData.map((item) => (
                    <div className="card productList" onClick={() => handleProductClick(item._id)}>
                        <div className='row no-gutters'>
                            <div className='col-sm-2'>
                                <img src={item.image} />
                            </div>
                            <div className='col-sm-7'>
                                <div>{item.name} </div>
                                <p>{item.description}</p>
                                <div className='productData'>
                                    <span>Size {item.size}</span>
                                    <span>Material {item.material}</span>
                                    <span>brand {item.brand}</span>

                                </div>
                            </div>
                            <div className='col-sm-3 checkoutContainer'>
                                <p>{item.price}</p>
                                <div>  <button type="button" class="btn btn-primary">Add to Cart</button>
                                    <button type="button" class="btn btn-danger"> Buy Now</button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>

    )
}

export default ProductListing