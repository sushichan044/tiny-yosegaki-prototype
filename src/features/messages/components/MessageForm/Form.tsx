"use client"

import { Textarea } from "@mantine/core"

const MessageFormInput = () => {
  return (
    <div>
      <Textarea
        autosize
        label="寄せ書き本文(最大2000文字)"
        maxLength={2000}
        minRows={2}
        withAsterisk
      />
    </div>
  )
}

export default MessageFormInput
