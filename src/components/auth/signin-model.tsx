import { cn } from "cn";
import type React from "react"
import { useActionState, useState } from "react";
import type { Country } from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";

export function SignupForm({
  className, 
  defaultCountryCode
}:{
  className?: React.ComponentProps<"form">,
  defaultCountryCode: Country | undefined, 
}) {

  const [userName, setUserName] = useState<string>("")

  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [isPossiblePhone, setIsPossiblePhone] = useState<boolean>(false)
  const [isValidPhone, setValidPhone] = useState<boolean>(false)
  const [isBlurr, setIsBlurr] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [isEnableButton, setEnableButton] = useState<boolean>(true)

  //step 1: 
  // user typing phone number: "verify button" is dissabled 
  // user finished typing valid  phone number: verify button is enabled, 
  function handlePhoneChange(enteredPhoneNumber: string){
    // let the user type first, handle if cleared with back ""
    //standard lib: onChange passes undefined at empty input, but component handle it internally 
    //case: "undefined" => clear input 
    setPhoneNumber(enteredPhoneNumber)

    // case: user type valid phone, parse set it true, user realized typo and deleted the number, or deleted a char
    // Otp button remain on and backend crash at 9 digit or ""
    // prove validity at every keystroke 
    setValidPhone(false)
    setIsPossiblePhone(false)

    if(!enteredPhoneNumber) return; // if they clears everything return early 

    try{
      //library crashes if: to sort(+), a letter(+91 9876A), or empty string(""|undefined)
      //if parsed cleanly, Actually a mobile number AND valid phone Num(strict rejx)
      const parsedPhone = parsePhoneNumber(enteredPhoneNumber, defaultCountryCode)
      setIsPossiblePhone(parsedPhone?.isPossible() || false)
      if (parsedPhone?.getType() === "MOBILE" && parsedPhone.isValid()) {
        setValidPhone(true)
      }
      
    } catch (e){
      // let the user type, an crash silently 
    }
  }
  // Invalid if: has clicked somewhere else AND Has typed something AND not a valid number  
  const isEnteredPhoneInvalid = ((isBlurr && phoneNumber) || isPossiblePhone) && !isValidPhone
  
  // step 2
  function handlePhoneOtp (prevState: any, formData: FormData) {
    setEnableButton(false)
    async function getOtp(formData: FormData){
      "use server"

      const submitPhoneNumber = formData.get("phone")
      try {
        sendOpt(submitPhoneNumber)
        return "Verified" // message will set return value 
      } catch (e) {
        if (typeof e === "string") {
          return e
        } else {
          return "Something Went wrong. Try Again"
        }
      }
      
    }
    getOtp(formData)
  }

  //initial message is null 
  const [message, otpAction] = useActionState(handlePhoneOtp, null)

  return (
    <form className={cn("grid items-start gap-6", className)}>
      <FieldGroup>

        {/* username field */}
        <Field>
          <FieldLabel htmlFor="form-name">Username</FieldLabel>
          <Input
            id="form-name"
            type="text"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
            placeholder="Evil Rabbit"
            required
          />
        </Field>

        {/* Phone Input */}
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <PhoneInput
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry={defaultCountryCode}
            onBlur={()=>setIsBlurr(true)}
            international //force output to always include countary code (+91)
            required
          />

          {isEnteredPhoneInvalid && 
            <FieldDescription className="text-emerald-500">
              please Enter a valid phone number 
            </FieldDescription>
          }

          {!!message && 
            <FieldDescription className="text-emerald-500">
              {message}
            </FieldDescription>
          }

          <Button type="button"
            formAction={otpAction}
            disabled={isValidPhone && isEnableButton}
            className={isValidPhone? "bg-full-shacn-black": "bg-muted-lower-black" }
          >
            {"Verify Phone Number"}
          </Button>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input 
          id="form-email" 
          name="email"
          type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="john@example.com" 
          />
          <Button type="button" className="text-emerald-500 underline"
            formAction={handleEmailOtp}
          >
          <FieldDescription>
             <span className="text-red-500">*</span> 
             Verify your email. 
          </FieldDescription>
          </Button>
        </Field>

        <Field>
          <FieldLabel htmlFor="password"> Password (Min 8 Characters) </FieldLabel>
          <Input
          id="password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="password"
          minLength={8}
          required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password"> Confirm Password </FieldLabel>
          <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          placeholder="password"
          minLength={8}
          required
          />
        </Field>

        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}


// otp verification state for phone
// step1: done 
// user typing phone number: "verify button" is dissabled", no error message 
// user finish typing invalid number: verify button is dissabled, show an error message 
// user finished typing valid: verify button is enabled,

// user clicked verify button: "a space popus up to enter otp", a resend otp counter starts, verify button diabled  
// user filled otp: verfiy button enabled, resend otp counter continew 
// user got verified and botton disappear 
// user didn't pasted otp within time: resend top button is enabled to request new otp, verify button is continew disabled 
// repeat for when user filled otp 
// user pasted wrong otp: an error message displayed for "Wrong top"
// user clicked verify otp but his internet switched off and couldn't make a server request: "Something went Wrong: retry"
// user clicked verify button for any case and culdn't get the response: " user have to refresh page:"  => His otp state must disappear