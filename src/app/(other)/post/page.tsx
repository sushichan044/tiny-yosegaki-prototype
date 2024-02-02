import { getSession } from "@/features/auth/action"
import MessageForm from "@/features/messages/components/MessageForm"
import { Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function Page() {
  const {
    data: { session },
  } = await getSession()
  if (session == null || session.user == null) {
    redirect("/auth/login")
  }

  return (
    <div>
      <Title order={1}>寄せ書き投稿ページ</Title>
      <MessageForm />
    </div>
  )
}
