"use client"

import UserMenu from "@/components/layouts/Header/UserMenu"
import SignInModal from "@/features/auth/components/SignInModal"
import { useSessionUser } from "@/features/users/hooks/useSessionUser"
import { Button, Transition } from "@mantine/core"
import Link from "next/link"

const PostButton = () => {
  return (
    <Button color="nakuru" component={Link} href="/new" miw="6rem">
      企画を立てる
    </Button>
  )
}

const UserHeader = () => {
  const { isInitial, isPending, user } = useSessionUser()

  return (
    <>
      <Transition
        duration={400}
        mounted={!isInitial && !isPending}
        timingFunction="ease"
        transition="fade"
      >
        {(styles) => (
          <div
            className="flex flex-row gap-x-4 h-9 overflow-hidden"
            style={styles}
          >
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <SignInModal />
                <div className="max-md:hidden">{user && <PostButton />}</div>
              </>
            )}
          </div>
        )}
      </Transition>
    </>
  )
}

export default UserHeader
