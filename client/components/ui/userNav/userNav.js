import Cart from "@/components/icons/cart";
import { useUI } from "../context";
import { Button } from "theme-ui";
import { useCart } from "@/lib/hooks/useCart";

const UserNav = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI();
  const cart = useCart();
  const items = cart?.items ?? [];
  const quantity = cart?.item_quantity ?? 0;

  return (
    <Button
      onClick={toggleSidebar}
      aria-label="Cart sideview button"
      style={{
        backgroundColor: "inherit",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
        width: "150px",
      }}
    >
      <span style={{ color: "black" }} aria-label="Cart quantity">
        Cart ({quantity})
      </span>
      <Cart />
    </Button>
  );
};

export default UserNav;
