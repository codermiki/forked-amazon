import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFortmat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  // Handle undefined rating and count gracefully
  const ratingValue = rating?.rate || 0; // Default to 0 if undefined
  const ratingCount = rating?.count || 0; // Default to 0 if undefined

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={ratingValue} precision={0.1} readOnly />
        </div>
        <small>{ratingCount} reviews</small>
      </div>
      <div>
        <CurrencyFormat amount={price} />
      </div>
      {renderAdd && (
        <button className={classes.button} onClick={addToCart}>
          Add to cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
