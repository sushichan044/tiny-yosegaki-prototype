"use client"

import { Button, Tooltip } from "@mantine/core"
import { IconMail } from "@tabler/icons-react"
import { useState } from "react"

type Props = {
  redirectTo?: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmailButton: React.FC<Props> = ({ redirectTo }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)

  // const handleClick = async () => {
  //   setLoading(true)
  //   // implement email login
  //   console.log("redirect to", redirectTo)
  // }

  return (
    <Tooltip
      label="メールアドレスでのログインは現在準備中です。"
      position="bottom"
    >
      <Button
        color="gray"
        data-disabled
        justify="space-between"
        leftSection={<IconMail />}
        loading={loading}
        onClick={(e) => e.preventDefault()}
        radius="md"
        rightSection={<span></span>}
        size="lg"
      >
        メールアドレスでログイン
      </Button>
    </Tooltip>
  )
}

export default EmailButton
