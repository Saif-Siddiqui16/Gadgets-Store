import { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner"

import Category from "./Category/Category";
import Products from "../Products/Products";
import axios from "axios";
import { fetchDataFromApi } from "../../utils/api";
;
import { Context } from "../../utils/context";

const Home = () => {
    const { products, setProducts, categories, setCategories } =
        useContext(Context);
    /*  useEffect(() => {
         const fetchData = async () => {
             try {
                 const data = await axios.get(process.env.REACT_APP_API_URL + "/products", {
                     headers: {
                         Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
                     },
                 })
                 console.log(data)
             } catch (err) {
                 console.log(err)
             }
         }
         fetchData();
 
     }, []) */

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const getProducts = () => {
        fetchDataFromApi("/products?populate=*").then((res) => {
            setProducts(res);
        });
    };
    const getCategories = () => {
        fetchDataFromApi("/categories?populate=*").then((res) => {
            setCategories(res);
        });
    };

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
                    <Products
                        headingText="Popular Products"
                        products={products}
                    />
                </div>
            </div>
        </div>
    )

};


export default Home;
