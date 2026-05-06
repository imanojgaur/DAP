"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { Package, User as UserIcon, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ProfileForm } from "./profile-form";

export function UserDropdown({ user }: { user: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter(); // 2. Initialize the router
    
    // Safely handle if user is null/undefined before checking name
    const fallbackInitial = user?.name ? user.name.charAt(0).toLowerCase() : "u";

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none group">
                    <span className="text-xs font-medium text-gray-600 group-hover:text-black transition-colors">
                        Hi, {user?.name?.split(" ")[0] || "There"}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-indigo-900 text-white text-sm font-medium transition-transform group-hover:scale-105">
                        {user?.image ? (
                            <Image src={user.image} alt="User" width={28} height={28} className="h-full w-full object-cover" />
                        ) : (
                            fallbackInitial
                        )}
                    </div>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-gray-100 shadow-xl">
                    <div className="px-2 py-3 border-b border-gray-50 mb-1">
                        <p className="text-sm font-medium">Hi {user?.name?.split(" ")[0] || "Guest"}</p>
                    </div>
                    
                    {/* 3. Add the onClick handler with routing logic */}
                    <DropdownMenuItem 
                        onClick={() => {
                            if (user) {
                                router.push("/my-orders");
                            } else {
                                router.push("/login");
                            }
                        }}
                        className="py-2.5 cursor-pointer rounded-lg focus:bg-gray-50"
                    >
                        <Package className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700">Orders</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                        onClick={() => setIsModalOpen(true)}
                        className="py-2.5 cursor-pointer rounded-lg focus:bg-gray-50"
                    >
                        <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700">My Profile</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-2 bg-gray-100" />
                    
                    <DropdownMenuItem 
                        onClick={() => signOut()}
                        className="py-2.5 cursor-pointer rounded-full border border-gray-200 mt-2 focus:bg-gray-50 flex justify-center"
                    >
                        <span className="font-medium text-gray-900">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* The Centered Desktop Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-2xl">
                    <DialogHeader className="px-6 pt-6 pb-2">
                        <DialogTitle className="text-xl font-bold text-center">Profile Details</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[70vh] flex flex-col">
                        <ProfileForm user={user} onSubmit={() => setIsModalOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}