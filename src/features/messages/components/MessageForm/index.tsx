import { getUser } from "@/features/auth/action"
import MessageFormInput from "@/features/messages/components/MessageForm/Form"
import { getMessageByUser } from "@/features/messages/db"
import { unstable_cache } from "next/cache"

const getCachedMessageByUser = (userId: string) => {
  return unstable_cache(() => getMessageByUser(userId), [`message-${userId}`], {
    revalidate: 60,
  })()
}

const MessageForm = async () => {
  const {
    data: { user },
  } = await getUser()

  if (user == null) {
    // use mantine alert
    return <div>ログインしてください</div>
  }

  const userMessage = await getCachedMessageByUser(user.id)
  console.log(userMessage)

  return (
    <div>
      <MessageFormInput />
    </div>
  )
}

export default MessageForm
