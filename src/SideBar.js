import { ReactComponent as IconEmpty } from "./assets/images/illustration-empty-cart.svg";
import { ReactComponent as IconDelete } from "./assets/images/icon-remove-item.svg";
import { ReactComponent as IconCarbonNeutral } from "./assets/images/icon-carbon-neutral.svg";
import { ReactComponent as IconOrderConfirmed } from "./assets/images/icon-order-confirmed.svg";

import React from "react";

export default function SideBar({
  itemData,
  selectedItems,
  quantity,
  onDeleteItems,
  customClass = "",
  onHandleClick,
  onVisibility,
}) {
  const totalQuantity = Object.values(quantity).reduce(
    (acc, qty) => acc + qty,
    0
  );
  const cartItems = selectedItems.map((name) =>
    itemData.find((item) => item.name === name)
  );
  const totalPrice = cartItems.reduce((total, item) => {
    const itemQuantity = quantity[item.name] || 1;
    const itemTotalPrice = item.price * itemQuantity;
    return (Number(total) + Number(itemTotalPrice)).toFixed(2);
  }, 0);

  return (
    <ul className={`cart ${customClass}`} onClick={() => onVisibility}>
      {!customClass ? (
        <h2 className="cart-title">Your Cart ({totalQuantity})</h2>
      ) : (
        <div className="order-confirmed">
          <IconOrderConfirmed />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>
      )}
      {selectedItems.length === 0 ? (
        <>
          <IconEmpty className="cart-empty-icon" />
          <p className="cart-empty-text">Your added items will appear here</p>
        </>
      ) : (
        <div className={`${customClass ? "cart-wrapper" : ""}`}>
          {cartItems.map((item) => (
            <React.Fragment key={item.name}>
              <li
                className={`cart-item ${customClass ? "cart-custom" : ""}`}
                key={item.name}
              >
                {customClass && (
                  <img
                    src={require(`./assets/images/${item.image.desktop}`)}
                    alt={item.name}
                    className="order-img"
                  />
                )}
                <div className="cart-content">
                  <span className="cart-item-name">{item.name}</span>
                  <div className="cart-price-list">
                    <span className="cart-item-quantity">
                      {quantity[item.name] || 1}x
                    </span>
                    <span className="cart-item-price">
                      @${item.price.toFixed(2)}
                    </span>
                    {!customClass && (
                      <span className="cart-item-curprice">
                        $
                        {(
                          Number(item.price.toFixed(2)) *
                          Number(quantity[item.name] || 1)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                {!customClass ? (
                  <div
                    className="product-icon cart-delete"
                    onClick={() => onDeleteItems(item.name)}
                  >
                    <IconDelete />
                  </div>
                ) : (
                  <span
                    className={`cart-item-curprice ${
                      customClass ? "curprice" : ""
                    }`}
                  >
                    $
                    {(
                      Number(item.price.toFixed(2)) *
                      Number(quantity[item.name] || 1)
                    ).toFixed(2)}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
          {selectedItems.length !== 0 ? (
            <>
              <div
                className={`cart-total ${
                  customClass ? "cart-total-custom" : ""
                }`}
              >
                <p className="cart-order-total">Order Total</p>
                <h3>${totalPrice}</h3>
              </div>
              {!customClass && (
                <div className="cart-carbon-neutral">
                  <IconCarbonNeutral />
                  <p>
                    This is a <span className="strong">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>
              )}
            </>
          ) : null}
        </div>
      )}
      {selectedItems.length !== 0 ? (
        <div
          className="cart-btn-confirm-order"
          onClick={() => onHandleClick(customClass)}
        >
          {!customClass ? "Confirm Order" : "Start New Order"}
        </div>
      ) : (
        ""
      )}
    </ul>
  );
}
