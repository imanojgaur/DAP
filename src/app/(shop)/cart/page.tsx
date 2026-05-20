import { CartItemList } from "@/components/cart/cart-item-list";
import { CartPageLayout } from "@/components/cart/cart-page-layout";
import { OrderSummary } from "@/components/cart/order-summary";

export default function CartPage() {
	return (
		<CartPageLayout itemList={<CartItemList />} summary={<OrderSummary />} />
	);
}
