import type { User } from "@supabase/supabase-js"

import SignOutItem from "@/components/layouts/Header/UserMenu/SignOutItem"
import { Avatar, Menu, MenuDropdown, MenuTarget, Skeleton } from "@mantine/core"

type Props = {
  user: User
}

const UserMenu: React.FC<Props> = ({ user }) => {
  return (
    <Menu
      shadow="md"
      transitionProps={{ duration: 200, transition: "fade" }}
      width={150}
    >
      <MenuTarget>
        <Avatar
          alt="user avatar"
          className="cursor-pointer"
          size={36}
          src={user?.user_metadata?.avatar_url}
          title="アカウント"
        >
          <Skeleton />
        </Avatar>
      </MenuTarget>
      <MenuDropdown>
        <SignOutItem />
      </MenuDropdown>
    </Menu>
  )
}

export default UserMenu
