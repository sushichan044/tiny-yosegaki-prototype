import { getUserMessageForPostForm } from "@/features/messages/action"
import MessageFormInput from "@/features/messages/components/MessageForm/MessageFormInput"

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
    <MessageFormInput message={message} projectId={projectId} user={user} />
  )
}

export default MessageForm
