"use client"

import { Button, Text } from "@mantine/core"
import { IconMail } from "@tabler/icons-react"
import { useState } from "react"

type Props = {
  redirectTo?: string | undefined
}

const EmailButton: React.FC<Props> = ({ redirectTo }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    // implement email login
    console.log("redirect to", redirectTo)
  }

  return (
    <div>
      <Button
        color="gray"
        disabled
        leftSection={<IconMail />}
        loading={loading}
        onClick={handleClick}
        radius="lg"
        size="xl"
      >
        メールアドレスでログイン
      </Button>
      <Text className="text-center pt-1" size="sm">
        メールアドレスでのログインは現在準備中です。
      </Text>
    </div>
  )
}

export default EmailButton
