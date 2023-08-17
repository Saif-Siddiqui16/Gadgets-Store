
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import prod1 from "../../assets/products/headphone-prod-1.webp";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState, useContext } from "react";
import { Context } from "../../utils/context";

const SingleProduct = () => {
    const { id } = useParams();
    const { data } = useFetch(`/products?populate=*&[filters][id]=${id}`);
    const [quantity, setQuantity] = useState(1);
    const { handleAddToCart } = useContext(Context);

    const decrement = () => {
        setQuantity((value) => {
            if (value === 1) {
                return 1;
            }
            else {
                return value - 1;
            }
        }
        )
    }
    const increment = () => {
        setQuantity((value) => value + 1);
    }



    if (!data) return;
    const product = data?.data?.[0]?.attributes;
    console.log(product)



    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img
                            src={"http://localhost:1337" + product.img.data[0].attributes.url}
                        />
                    </div>
                    <div className="right">
                        <span className="name">{product.title}</span>
                        <span className="price">&#8377;{product.price}</span>
                        <span className="desc">{product.description}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement} >-</span>
                                <span>{quantity}</span>
                                <span onClick={increment} >+</span>
                            </div>
                            <button
                                className="add-to-cart-button" onClick={() => {
                                    handleAddToCart(data?.data?.[0], quantity);
                                    setQuantity(1);
                                }}

                            >
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Category:{" "}
                                <span>
                                    {
                                        product.categories.data[0].attributes
                                            .title
                                    }
                                </span>
                            </span>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts productId={id} categoryId={product.categories.data[0].id} />
            </div>
        </div>
    );
};

export default SingleProduct;