import UserMenu from "@/components/layouts/Header/UserMenu"
import { getUser } from "@/features/users/db"
import { Button } from "@mantine/core"
import Link from "next/link"

const PostButton = () => {
  return (
    <Button color="nakuru" component={Link} href="/post" miw="6rem">
      企画を立てる
    </Button>
  )
}

const SignInButton = () => {
  return (
    <Button color="nakuru" component={Link} href="/login" miw="6rem">
      ログイン
    </Button>
  )
}

const UserHeader = async () => {
  const { data: user } = await getUser()

  return (
    <div className="flex flex-row gap-x-4 h-9 overflow-hidden">
      {user && <UserMenu user={user} />}
      <div className="max-md:hidden">
        {user ? <PostButton /> : <SignInButton />}
      </div>
    </div>
  )
}

export default UserHeader
