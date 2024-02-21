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
import {
  IconBook,
  IconPencil,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  user: UserSelect
}

export const ICON_STROKE_WIDTH = 1

const UserMenu: React.FC<Props> = ({
  user: { twitterId, userId, userName },
}) => {
  const avatarSrc = getUserAvatarUrl(userId, {
    height: 72,
    quality: 80,
    width: 72,
  })

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
          src={avatarSrc}
          title="アカウント"
        >
          <Skeleton />
        </Avatar>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>
          <Text c="#2c2c2c" fw={600}>
            {userName}
          </Text>
          <Text size="sm">@{twitterId}</Text>
          <Text size="xs">X(旧Twitter)でログイン中</Text>
        </MenuLabel>
        <MenuDivider />
        <MenuItem
          component={Link}
          href={`/user/${userId}`}
          leftSection={<IconUserCircle stroke={ICON_STROKE_WIDTH} />}
        >
          プロフィール
        </MenuItem>
        <MenuDivider />
        <MenuItem
          component={Link}
          href="/dashboard/projects/created"
          leftSection={<IconBook stroke={ICON_STROKE_WIDTH} />}
        >
          企画した寄せ書き
        </MenuItem>
        <MenuItem
          component={Link}
          href="/dashboard/projects/joined"
          leftSection={<IconPencil stroke={ICON_STROKE_WIDTH} />}
        >
          参加した寄せ書き
        </MenuItem>
        <MenuDivider />
        <MenuItem
          component={Link}
          href="/settings"
          leftSection={<IconSettings stroke={ICON_STROKE_WIDTH} />}
        >
          アカウント設定
        </MenuItem>
        {/* <MenuItem leftSection={<IconPencil stroke={ICON_STROKE_WIDTH} />}>
          <Link href="/post">寄せ書きを書く</Link>
        </MenuItem> */}
        <MenuDivider />
        <SignOutItem />
      </MenuDropdown>
    </Menu>
  )
}

export default UserMenu
