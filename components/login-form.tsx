'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import {redirect} from "next/navigation";
import Login from "@/functions/Login";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [error, setError] = useState<string | null>(null)

    async function login(formData: FormData) {
        setError(null)

        try {
            await Login(formData)
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(error.message)
        }
        redirect("/dashboard")
    }


  return (
    <div className={cn("min-h-screen flex items-center justify-center bg-emerald-200", className)} {...props}>
      <Card className="w-full max-w-md bg-white/90 shadow-lg rounded-2xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-green-800">
              Log In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-5">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="username">
                    Username
                </FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="John123"
                  required
                />
              </Field>
              <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
            {error && <div>{error}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
