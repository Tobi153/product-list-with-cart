import "./App.css";
import itemData from "./data.json";
import Header from "./Header";
import Items from "./Items";
import SideBar from "./SideBar";
import { useState } from "react";
import ConfirmOrder from "./ConfirmOrder";
function App() {
  const [items, setItems] = useState(
    itemData.map((item) => ({ ...item, quantity: 0 }))
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(
    itemData.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );
  const [isVisible, setIsVisible] = useState(false);

  function handleVisibility() {
    setIsVisible(!isVisible);
  }

  function handleDeletedItems(name) {
    setSelectedItems((items) => items.filter((itemName) => itemName !== name));
    setQuantity((prevItems) => ({
      ...prevItems,
      [name]: 0,
    }));
  }

  function handleSelection(name) {
    setSelectedItems((items) => {
      if (items.includes(name)) {
        return [...items];
      } else {
        return [...items, name];
      }
    });
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [name]: prevQuantity[name] || 1,
    }));
  }

  function handleAddQuantity(itemName) {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemName]: prevQuantity[itemName] + 1,
    }));
  }

  function handleSubtractQuantity(itemName) {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemName]: Math.max(prevQuantity[itemName] - 1, 1),
    }));
  }

  function handleClick(custom) {
    setIsVisible(!isVisible);
    if (!custom) return;
    setSelectedItems([]);
    setQuantity(
      itemData.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
    );
    setItems(itemData.map((item) => ({ ...item, quantity: 0 })));
    setIsVisible(false);
  }

  return (
    <div className="App">
      <div className="container grid grid-2-cols">
        <div className="left-col">
          <Header />
          <Items
            itemData={itemData}
            quantity={quantity}
            selectedItems={selectedItems}
            onSelection={handleSelection}
            onAddQuantity={handleAddQuantity}
            onSubtractQuantity={handleSubtractQuantity}
            items={items}
          />
        </div>
        <div className="right-col">
          <SideBar
            itemData={itemData}
            selectedItems={selectedItems}
            quantity={quantity}
            onDeleteItems={handleDeletedItems}
            onVisibility={handleVisibility}
            onHandleClick={handleClick}
          />
        </div>
      </div>
      {isVisible && (
        <ConfirmOrder
          itemData={itemData}
          selectedItems={selectedItems}
          quantity={quantity}
          onDeleteItems={handleDeletedItems}
          onHandleClick={handleClick}
          onVisibility={handleVisibility}
        />
      )}
    </div>
  );
}

export default App;
