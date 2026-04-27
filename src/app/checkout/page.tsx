import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserAddresses } from "@/actions/address";
import { CheckoutClient } from "./checkout-client";

export default async function CheckoutPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const response = await getUserAddresses();
    
    // 1. Check if the response is an array. 
    // 2. If it's the { error: ... } object, we default to an empty array.
    const addresses = Array.isArray(response) ? response : []; 
    
    // Now 'addresses' is guaranteed to be an array, and the error will vanish.
    return <CheckoutClient user={session.user} addresses={addresses} />;
}