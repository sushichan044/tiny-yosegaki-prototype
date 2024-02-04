import type { User } from "@supabase/supabase-js"

import { ALL_ACCEPTED_MESSAGES_CACHE_TAG } from "@/cache"
import MessageFormInput from "@/features/messages/components/MessageForm/Form"
import { getMessageByUser } from "@/features/messages/db"
import { unstable_cache } from "next/cache"

const getCachedMessageByUser = (userId: string) => {
  // unstable_cache requires valid json body to cache.
  // so return object such as {data: MessageSelect | null} instead of raw data.
  return unstable_cache(
    async () => await getMessageByUser(userId),
    [`message-${userId}`],
    {
      revalidate: 60,
      tags: [ALL_ACCEPTED_MESSAGES_CACHE_TAG],
    },
  )()
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
