import React from "react";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";
import PropTypes from "prop-types";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  grid-template-colums: auto 1fr auto;
`;

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p>
        {formatMoney(cartItem.item.price * cartItem.quantity)} {" - "}
        <em>
          {cartItem.quantity} &times;{formatMoney(cartItem.item.price)} each
        </em>
      </p>
    </div>
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
};

export default CartItem;
