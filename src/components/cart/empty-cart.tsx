import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyCart() {
  return (
    <Card className="border-dashed border-2 shadow-none bg-gray-50/50">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center h-[60vh]">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-8">
          Looks like you haven't added any plants to your cart yet. Let's find something green for your space.
        </p>
        <Link href="/collections">
          <Button size="lg" className="h-14 px-8 text-lg bg-green-700 hover:bg-green-800 text-white rounded-full">
            Continue Shopping
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}