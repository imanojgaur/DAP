import type { Metadata } from "next";
import { getAllAdminOrders } from "@/actions/view-orders";
import { StatusDropdown } from "@/components/orders/admin/status-dropdown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// 1. The "Bouncer" for search engines
export const metadata: Metadata = {
  title: "Admin Order Management",
  robots: {
    index: false,   // Tells Google NOT to put this page in search results
    follow: false,  // Tells Google NOT to follow the links on this page
    nocache: true,  // Tells Google NOT to save a cached version of this page
  },
};

export default async function AdminOrdersPage() {
  const { data: orders } = await getAllAdminOrders();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Order Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id.slice(-6).toUpperCase()}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <StatusDropdown orderId={order.id} currentStatus={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}