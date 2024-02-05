import type { User } from "@supabase/supabase-js"

import SignOutItem from "@/components/layouts/Header/UserMenu/SignOutItem"
import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Skeleton,
  Text,
} from "@mantine/core"
import { IconPencil, IconUser } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  user: User
}

const UserMenu: React.FC<Props> = ({ user: { user_metadata } }) => {
  return (
    <Menu
      position="bottom-end"
      shadow="md"
      transitionProps={{ duration: 200, transition: "fade" }}
      width={200}
    >
      <MenuTarget>
        <Avatar
          alt="user avatar"
          className="cursor-pointer"
          size={36}
          src={user_metadata.avatar_url}
          title="アカウント"
        >
          <Skeleton />
        </Avatar>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>
          <Text c="black" fw={600}>
            {user_metadata?.name}
          </Text>
          <Text size="sm">@{user_metadata?.user_name}</Text>
          <Text size="sm">Twitterでログイン中</Text>
        </MenuLabel>
        <MenuDivider />
        <MenuItem leftSection={<IconUser stroke={1} />}>
          <Link href="/account">アカウント情報</Link>
        </MenuItem>
        <MenuItem leftSection={<IconPencil stroke={1} />}>
          <Link href="/post">寄せ書きを書く</Link>
        </MenuItem>
        <MenuDivider />
        <SignOutItem />
      </MenuDropdown>
    </Menu>
  )
}

export default UserMenu
