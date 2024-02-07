"use client"

import type { UserSelect } from "@/db/schema/users"

import AvatarManager from "@/features/users/setting/components/AvatarManager"
import ProfileForm from "@/features/users/setting/components/ProfileForm"
import { Divider, Space, Title } from "@mantine/core"

type Props = {
  user: UserSelect
}

const Setting: React.FC<Props> = ({ user }) => {
  const userId = user.userId

  return (
    <div>
      <Title order={1}>設定</Title>
      <Space h="2rem" />
      <Title order={2}>プロフィールの編集</Title>
      <Space h="2rem" />
      <div className="flex flex-col md:flex-row gap-4">
        <AvatarManager userId={userId} />
        <div className="flex-1">
          <ProfileForm user={user} />
        </div>
      </div>
      <Divider my="2rem" />
      {/* <Title order={2}>アカウントの削除</Title> */}
    </div>
  )
}

export default Setting
