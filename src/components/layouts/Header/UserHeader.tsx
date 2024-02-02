import LoginButton from "@/components/layouts/Header/LoginButton"
import UserMenu from "@/components/layouts/Header/UserMenu"
import { getUser } from "@/features/auth/action"
import { Button } from "@mantine/core"
import Link from "next/link"

const PostButton = () => {
  return (
    <Button color="nakuru" component={Link} href="/post">
      寄せ書きを書く
    </Button>
  )
}

const UserHeader = async () => {
  const {
    data: { user },
  } = await getUser()

  return (
    <div className="flex flex-row gap-x-4 h-9 overflow-hidden">
      {user && <UserMenu user={user} />}
      <div className="max-md:hidden">
        {user ? <PostButton /> : <LoginButton />}
      </div>
    </div>
  )
}

export default UserHeader
