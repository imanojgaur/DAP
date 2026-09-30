import { cn } from "cn";
import type React from "react"
import { useState } from "react";
import type { Country } from "react-phone-number-input";
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
  defaultCountryCode: Country, 
}) {

  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  return (
    <form className={cn("grid items-start gap-6", className)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Username</FieldLabel>
          <Input
            id="form-name"
            type="text"
            value={userName}
            onChange={setUserName}
            placeholder="Evil Rabbit"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <PhoneInput
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry={defaultCountryCode}
            international //force output to always include countary code (+91)
            required
          />
          <Button type="button"
            onClick={handlePhoneOtp}
          >
            <FieldDescription className="text-emerald-500 hover:underline"> 
              <span className="text-red-500">*</span>
              Verify your phone Number
            </FieldDescription>
          </Button>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input 
          id="form-email" 
          name="email"
          type="email" 
          value={email}
          onChange={setEmail}
          placeholder="john@example.com" 
          />
          <Button type="button" className="hover:underline"
            onClick={handleEmailOtp}
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
          onChange={setPassword}
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
          onChange={setConfirmPassword}
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
