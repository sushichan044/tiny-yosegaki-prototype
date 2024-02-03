import type { User } from "@supabase/supabase-js"

import MessageFormInput from "@/features/messages/components/MessageForm/Form"
import { getMessageByUser } from "@/features/messages/db"
import { unstable_cache } from "next/cache"

const getCachedMessageByUser = (userId: string) => {
  return unstable_cache(() => getMessageByUser(userId), [`message-${userId}`], {
    revalidate: 60,
  })()
}

type Props = {
  user: User
}

const MessageForm: React.FC<Props> = async ({ user }) => {
  const userMessage = await getCachedMessageByUser(user.id)
  console.log(userMessage)

  return (
    <div>
      <MessageFormInput />
    </div>
  )
}

export default MessageForm
