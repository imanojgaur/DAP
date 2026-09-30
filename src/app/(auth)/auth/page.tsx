import { headers } from "next/headers"
import { isSupportedCountry } from "react-phone-number-input"
import { SignupForm } from "@/components/auth/signin-model"

export async function AuthenticationPage() {
    const headerList = await headers() 

    // Invoke header sent by vercel edge function 
    const rawCountaryCode = headerList.get("x-vercel-ip-country") 
    // Handle Case:if Ip geolocation database can't resolve origin "XX" 
    // or Non-countary Terotory Codes "EU" or "AP" or empty header behind CDN 
    const countryCode = rawCountaryCode && isSupportedCountry(rawCountaryCode)
        ? rawCountaryCode: "IN"; 
                
    return (
        <div className="relative w-full">
            <SignupForm defaultCountryCode={countryCode} />
        </div>
    )
}