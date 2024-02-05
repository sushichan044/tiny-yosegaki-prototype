import Login from "@/features/auth/components/Login"
import { VisuallyHidden } from "@mantine/core"

export default function Page() {
  return (
    <div>
      <VisuallyHidden>
        <h1>ログイン</h1>
      </VisuallyHidden>
      <div className="min-h-[20vh]" />
      <Login />
    </div>
  )
}
