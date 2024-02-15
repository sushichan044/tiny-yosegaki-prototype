import { getUserMessageForPostForm } from "@/features/messages/action"
import MessageFormInput from "@/features/messages/components/MessageForm/MessageFormInput"
import { Skeleton } from "@mantine/core"
import { Suspense } from "react"

type Props = {
  projectId: string
  user: {
    userId: string
    userName: string
  }
}

const MessageForm: React.FC<Props> = async ({ projectId, user }) => {
  const message = getUserMessageForPostForm({ projectId, userId: user.userId })

  return (
    <Suspense fallback={<Skeleton />}>
      <MessageFormInput message={message} projectId={projectId} user={user} />
    </Suspense>
  )
}

export default MessageForm
