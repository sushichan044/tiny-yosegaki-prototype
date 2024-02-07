import SignIn from "@/features/auth/components/SignIn"
import { Space, VisuallyHidden } from "@mantine/core"

export default function Page() {
  return (
    <div>
      <VisuallyHidden>
        <h1>ログイン</h1>
      </VisuallyHidden>
      <Space h="2.5rem" />
      <SignIn />
    </div>
  )
}
