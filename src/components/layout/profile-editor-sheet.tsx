"use client";

import { Edit2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from "./profile-form";

export function ProfileEditorSheet({ user }: { user: any }) {
    const fallbackInitial = user.name ? user.name.charAt(0).toLowerCase() : "u";

    return (
        <Sheet>
            <SheetTrigger asChild>
                {/* Nike Style: Avatar with overlapping edit pencil */}
                <button type="button" className="relative flex items-center justify-center shrink-0 group">
                    <div className="h-14 w-14 overflow-hidden rounded-full border border-gray-200 bg-slate-800 flex items-center justify-center text-white text-xl font-medium">
                        {user.image ? (
                            <Image src={user.image} alt="User" width={56} height={56} className="h-full w-full object-cover" />
                        ) : (
                            fallbackInitial
                        )}
                    </div>
                    {/* The floating pencil */}
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black border-2 border-white text-white shadow-sm transition-transform group-hover:scale-110">
                        <Edit2 className="h-3 w-3" />
                    </div>
                </button>
            </SheetTrigger>
            
            <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 flex flex-col bg-white">
                <SheetHeader className="px-6 py-5 border-b border-gray-100 flex items-center justify-center">
                    {/* Optional: Add Nike/Your Logo here */}
                    <SheetTitle className="text-lg font-bold text-center w-full">Profile Details</SheetTitle>
                </SheetHeader>
                
                {/* Render the shared form */}
                <ProfileForm user={user} />
            </SheetContent>
        </Sheet>
    );
}