import { getCheckoutAddresses } from "@/actions";
import { AddressClient } from "@/components/checkout/address/address-client";

export const metadata = {
	title: "Select Address | DAP",
};

export default async function AddressPage() {
	const { user, addresses } = await getCheckoutAddresses();

	return <AddressClient user={user} initialAddresses={addresses} />;
}
