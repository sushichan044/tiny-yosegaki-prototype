import type { UserSelect } from "@/db/schema/users"

import SignOutItem from "@/components/layouts/Header/UserMenu/SignOutItem"
import { getUserAvatarUrl } from "@/features/users/avatar/url"
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
import { IconBook, IconPencil, IconSettings } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  user: UserSelect
}

const UserMenu: React.FC<Props> = ({
  user: { twitterId, userId, userName },
}) => {
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
          src={getUserAvatarUrl(userId)}
          title="アカウント"
        >
          <Skeleton />
        </Avatar>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>
          <Text c="black" fw={600}>
            {userName}
          </Text>
          <Text size="sm">@{twitterId}</Text>
          <Text size="sm">Twitterでログイン中</Text>
        </MenuLabel>
        <MenuDivider />
        <MenuItem leftSection={<IconPencil stroke={1} />}>
          <Link href="/account/joined">参加した寄せ書き</Link>
        </MenuItem>
        <MenuItem leftSection={<IconBook stroke={1} />}>
          <Link href="/account/created">企画した寄せ書き</Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem leftSection={<IconSettings stroke={1} />}>
          <Link href="/settings">アカウント設定</Link>
        </MenuItem>
        {/* <MenuItem leftSection={<IconPencil stroke={1} />}>
          <Link href="/post">寄せ書きを書く</Link>
        </MenuItem> */}
        <MenuDivider />
        <SignOutItem />
      </MenuDropdown>
    </Menu>
  )
}

export default UserMenu
