import {LoginForm} from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-emerald-200 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col">
        <LoginForm />
      </div>
    </div>
  )
}
