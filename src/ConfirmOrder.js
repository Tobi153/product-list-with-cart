import { isVisible } from "@testing-library/user-event/dist/utils";
import SideBar from "./SideBar";
export default function ConfirmOrder({
  itemData,
  selectedItems,
  quantity,
  onDeleteItems,
  customClass = "custom-class",
  onHandleClick,
  onVisibility,
}) {
  return (
    <>
      <div
        className={`overlay ${isVisible ? "show" : ""}`}
        onClick={onVisibility}
      ></div>
      <div className="confirm-order">
        <SideBar
          itemData={itemData}
          selectedItems={selectedItems}
          quantity={quantity}
          onDeleteItems={onDeleteItems}
          customClass={customClass}
          onHandleClick={onHandleClick}
          onVisibility={onVisibility}
        />
      </div>
    </>
  );
}
