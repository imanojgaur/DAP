import { getCheckoutAddresses } from "@/actions/address";
import { AddressClient } from "@/components/checkout/address-client";

export const metadata = {
	title: "Select Address | DAP",
};

export default async function AddressPage() {
	// This will redirect unauthenticated users instantly.
	// For logged-in users, it securely fetches their data.
	const { user, addresses } = await getCheckoutAddresses();

	return (
		// 2. Pass the data directly into your beautifully modular client component
		<AddressClient user={user} initialAddresses={addresses} />
	);
}
