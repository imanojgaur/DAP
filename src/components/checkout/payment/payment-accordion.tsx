// "use client";

// import { Banknote, CreditCard, QrCode } from "lucide-react";
// import { useCheckout } from "@/components/checkout/payment/use-razorpay-checkout";
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import { OrderSuccessPopup } from "../order-success-popup";

// export function PaymentAccordion({ addressId }: { addressId: string }) {
// 	const {
// 		totalAmoutnt,
// 		isLoading,
// 		isPlaced,
// 		handleOrderPlacement,
// 		handleOnlinePayment,
// 	} = useCheckout(addressId);

// 	// const payTotal = totalAmoutnt / 100;

// 	const paymentMethods = [
// 		{
// 			id: "upi",
// 			title: "UPI",
// 			subtitle: "Google Pay, PhonePe, Paytm & more",
// 			icon: QrCode,
// 			iconColor: "text-gray-700",
// 			theme: "bg-gray-50/50",
// 			description:
// 				"You will be redirected to Razorpay to securely scan a QR code or enter your UPI ID.",
// 			buttonText: `Pay ₹${(payTotal).toLocaleString()}`,
// 			buttonClass: "bg-[#111] hover:bg-black text-white",
// 			action: handleOnlinePayment,
// 		},
// 		{
// 			id: "card",
// 			title: "Credit/Debit Card",
// 			subtitle: "Visa, Mastercard, Rupay & more",
// 			icon: CreditCard,
// 			iconColor: "text-gray-700",
// 			theme: "bg-gray-50/50",
// 			description:
// 				"You will be redirected to Razorpay's secure gateway to enter your card details and OTP.",
// 			buttonText: `Pay ₹${(payTotal).toLocaleString()}`,
// 			buttonClass: "bg-[#111] hover:bg-black text-white",
// 			action: handleOnlinePayment,
// 		},
// 		{
// 			id: "cod",
// 			title: "Cash on Delivery",
// 			subtitle: "Pay with cash or UPI at your doorstep",
// 			icon: Banknote,
// 			iconColor: "text-green-700",
// 			theme: "bg-green-50/30",
// 			description:
// 				"Order now and pay when your plants arrive. Our delivery partner will accept Cash or UPI scanning.",
// 			buttonText: `Confirm Order (₹${(payTotal).toLocaleString()})`,
// 			buttonClass: "bg-green-700 hover:bg-green-800 text-white",
// 			action: handleOrderPlacement,
// 		},
// 	];

// 	if (isPlaced) return <OrderSuccessPopup />;

// 	return (
// 		<Accordion type="single" collapsible className="w-full space-y-4">
// 			{paymentMethods.map((method) => {
// 				const Icon = method.icon;

// 				return (
// 					<AccordionItem
// 						key={method.id}
// 						value={method.id}
// 						className={`border border-gray-200 rounded-xl px-2 transition-colors data-[state=open]:${method.theme}`}
// 					>
// 						<AccordionTrigger className="hover:no-underline px-4 py-5">
// 							<div className="flex items-start gap-4 text-left">
// 								<Icon className={`h-6 w-6 mt-0.5 ${method.iconColor}`} />
// 								<div>
// 									<p className="font-bold text-gray-900">{method.title}</p>
// 									<p className="text-xs text-gray-500 font-normal">
// 										{method.subtitle}
// 									</p>
// 								</div>
// 							</div>
// 						</AccordionTrigger>
// 						<AccordionContent className="px-4 pb-6 pt-2">
// 							<div className="p-4 bg-white border border-gray-100 rounded-xl mb-4 text-sm text-gray-600 text-center">
// 								{method.description}
// 							</div>
// 							<Button
// 								disabled={isLoading}
// 								onClick={method.action}
// 								className={`w-full h-14 rounded-full text-lg font-medium ${method.buttonClass}`}
// 							>
// 								{isLoading ? "Processing..." : method.buttonText}
// 							</Button>
// 						</AccordionContent>
// 					</AccordionItem>
// 				);
// 			})}
// 		</Accordion>
// 	);
// }
