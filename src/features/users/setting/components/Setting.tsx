import type { UserSelect } from "@/db/schema/users"

import AvatarManager from "@/features/users/setting/components/AvatarManager"
import ProfileForm from "@/features/users/setting/components/ProfileForm"
import "@/features/users/setting/components/ProfileFormSwitch.scss"
import { Button, Divider, Space, Title } from "@mantine/core"

type Props = {
  user: UserSelect
}

const Setting: React.FC<Props> = ({ user }) => {
  return (
    <article className="flex flex-col gap-y-4">
      <Title order={1}>設定</Title>
      <section>
        <Title order={2}>プロフィールの編集</Title>
        <Space h="1.5rem" />
        <div className="flex flex-col md:flex-row gap-x-4">
          <AvatarManager userId={user.userId} />
          <div className="flex-1">
            <ProfileForm user={user} />
          </div>
        </div>
      </section>
      <Divider />
      <section>
        <Title order={2}>アカウントの削除</Title>
        <Space h="1.5rem" />
        <Button color="red" disabled>
          アカウントを削除する
        </Button>
      </section>
    </article>
  )
}

export default Setting
