import type { User } from "@supabase/supabase-js"

import MessageFormInput from "@/features/messages/components/MessageForm/Form"
import { getMessageByUser } from "@/features/messages/db"
import { unstable_cache } from "next/cache"

const getCachedMessageByUser = (userId: string) => {
  // unstable_cache requires valid json body to cache.
  // so return object such as {data: MessageSelect | null} instead of raw data.
  return unstable_cache(() => getMessageByUser(userId), [`message-${userId}`], {
    revalidate: 60,
  })()
}

type Props = {
  user: User
}

const MessageForm: React.FC<Props> = async ({ user }) => {
  const { data } = await getCachedMessageByUser(user.id)
  console.debug("userMessage", data)

  return (
    <div>
      <MessageFormInput />
    </div>
  )
}

export default MessageForm
