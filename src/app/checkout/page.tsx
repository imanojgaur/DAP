import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserAddresses } from "@/actions/address";
import { CheckoutClient } from "./checkout-client";

export default async function CheckoutPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const addresses = await getUserAddresses();
    const defaultAddress = addresses.length > 0 ? addresses[0] : null;

    // We pass the fetched data to a Client Component to manage the "Proceed to Pay" button state
    return <CheckoutClient user={session.user} defaultAddress={defaultAddress} />;
}