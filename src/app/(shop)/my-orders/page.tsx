import { getCustomerOrders } from "@/actions/view-orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus } from "../../../../generated/prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Define the exact flow of a successful order
const STATUS_STEPS = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

export default async function MyOrdersPage() {
  const session = await auth();

  if(!session?.user?.id){
    redirect("/login");
  }

  const userId = session.user.id;
  const { data: orders } = await getCustomerOrders(userId);

  if (!orders || orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.map((order) => {
        const currentStepIndex = STATUS_STEPS.indexOf(order.status);

        return (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id.slice(-6).toUpperCase()}</CardTitle>
              <p className="text-sm text-gray-500">Total: ₹ {order.totalPrice / 100}</p>
            </CardHeader>
            <CardContent>
              
              {/* --- THE VISUAL STEPPER --- */}
              <div className="flex items-center justify-between mb-8">
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  return (
                    <div key={step} className="flex flex-col items-center w-full">
                      <div className="flex items-center w-full">
                        {/* The Circle */}
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}>
                          {index + 1}
                        </div>
                        {/* The Line connecting them (don't draw line after the last step) */}
                        {index < STATUS_STEPS.length - 1 && (
                          <div className={`h-1 flex-1 ${index < currentStepIndex ? "bg-green-600" : "bg-gray-300"}`} />
                        )}
                      </div>
                      <span className={`text-xs mt-2 ${isCompleted ? "text-green-700 font-semibold" : "text-gray-400"}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Customer Message */}
              <div className="bg-blue-50 p-4 rounded-md">
                {order.status === "PENDING" && <p>We have received your order!</p>}
                {order.status === "PROCESSING" && <p>We are carefully packing your plants.</p>}
                {order.status === "SHIPPED" && <p>Good news! Your plant is on the way.</p>}
                {order.status === "DELIVERED" && <p>Delivered! Enjoy your new plant.</p>}
              </div>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}