import type { UserSelect } from "@/db/schema/users"

import AvatarManager from "@/features/users/setting/components/AvatarManager"
import ProfileForm from "@/features/users/setting/components/ProfileForm"
import "@/features/users/setting/components/ProfileFormSwitch.scss"
import { Button, Center, Divider, Space, Stack, Title } from "@mantine/core"

type Props = {
  user: UserSelect
}

const Setting: React.FC<Props> = ({ user }) => {
  return (
    <Stack component="article" gap="lg">
      <Title order={1}>設定</Title>
      <Divider />
      <Stack component="section">
        <Title order={2}>プロフィールの編集</Title>
        <AvatarManager userId={user.userId} />
        <ProfileForm user={user} />
      </Stack>
      <Divider />
      <Stack component="section">
        <Title order={2}>アカウントの削除</Title>
        <Space h="md" />
        <Center>
          <Button color="red" disabled>
            アカウントを削除する
          </Button>
        </Center>
      </Stack>
    </Stack>
  )
}

export default Setting
