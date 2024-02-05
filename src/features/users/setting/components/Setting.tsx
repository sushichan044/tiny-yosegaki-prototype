"use client"

import type { UserSelect } from "@/db/schema/users"

import AvatarManager from "@/features/users/setting/components/AvatarManager"
import { Divider, Space, Title } from "@mantine/core"

type Props = {
  user: UserSelect
}

const Setting: React.FC<Props> = ({ user }) => {
  const userId = user.userId

  return (
    <>
      <Title order={1}>設定</Title>
      <Space h="1.5rem" />
      <div className="flex flex-col md:flex-row">
        <AvatarManager userId={userId} />
        <div className="flex-1">Form</div>
      </div>
      <Divider my="md" />
    </>
  )
}

export default Setting
