import { ReactComponent as IconPlus } from "./assets/images/icon-increment-quantity.svg";
import { ReactComponent as IconMinus } from "./assets/images/icon-decrement-quantity.svg";
import { ReactComponent as IconCart } from "./assets/images/icon-add-to-cart.svg";
export default function Item({
  items,
  selectedItems,
  onSelection,
  onAddQuantity,
  onSubtractQuantity,
  quantity,
}) {
  return (
    <ul className="grid grid-3-cols">
      {items.map((item) => (
        <li className="product-item" key={item.name}>
          <img
            src={require(`./assets/images/${item.image.desktop}`)}
            alt={item.name}
            className={`product-img ${
              selectedItems.includes(item.name) ? "active" : ""
            }`}
          />
          <div className="product-description">
            <p className="product-category">{item.category}</p>
            <p className="product-name">{item.name}</p>
            <p className="product-price">${item.price.toFixed(2)}</p>
          </div>
          <div
            className={`product-button flex flex-jc-c flex-ai-c ${
              selectedItems.includes(item.name) ? "selected" : ""
            }`}
            onClick={() => onSelection(item.name)}
          >
            {!selectedItems.includes(item.name) ? (
              <>
                <IconCart />
                Add to Cart
              </>
            ) : (
              <>
                <span
                  className="product-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubtractQuantity(item.name);
                  }}
                >
                  <IconMinus />
                </span>
                {quantity[item.name]}
                <span
                  className="product-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddQuantity(item.name);
                  }}
                >
                  <IconPlus />
                </span>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
