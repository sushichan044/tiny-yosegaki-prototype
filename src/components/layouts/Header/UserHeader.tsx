import type { User } from "@supabase/supabase-js"

import LoginButton from "@/components/layouts/Header/LoginButton"
import UserMenu from "@/components/layouts/Header/UserMenu"
import { Button } from "@mantine/core"
import Link from "next/link"

const PostButton = () => {
  return (
    <Button color="nakuru" component={Link} href="/post">
      投稿する
    </Button>
  )
}

type Props = {
  user: User | null
}

const ClientHeader: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex flex-row gap-x-4 h-9 overflow-hidden">
      {user && <UserMenu user={user} />}
      {user ? <PostButton /> : <LoginButton />}
    </div>
  )
}

export default ClientHeader
