import { getMessagesForProject } from "@/features/messages/action"
import React from "react"

type Props = {
  projectId: string
}

const ManyMessages: React.FC<Props> = async ({ projectId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const messages = await getMessagesForProject(projectId)

  return (
    <div>
      <div className="h-[40vh]">a</div>
      <div className="h-[40vh]">b</div>
      <div className="h-[40vh]">c</div>
    </div>
  )
}

export default ManyMessages
