import Product from "./Product";
export default function Items({
  itemData,
  selectedItems,
  onSelection,
  onAddQuantity,
  onSubtractQuantity,
  quantity,
  onAddToCart,
  items,
}) {
  return (
    <div className="product-container">
      <Product
        itemData={itemData}
        selectedItems={selectedItems}
        onSelection={onSelection}
        onAddQuantity={onAddQuantity}
        onSubtractQuantity={onSubtractQuantity}
        quantity={quantity}
        onAddToCart={onAddToCart}
        items={items}
      />
    </div>
  );
}
