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
  const {
    data: { data, isInitial },
    isPending,
  } = useSessionUser()

  if (isInitial || isPending) {
    return <></>
  }

  return (
    <Transition duration={400} mounted timingFunction="ease" transition="fade">
      {(styles) => (
        <div
          className="flex flex-row gap-x-4 h-9 overflow-hidden"
          style={styles}
        >
          {data ? (
            <>
              <UserMenu user={data} />
              <div className="max-md:hidden">
                <PostButton />
              </div>
            </>
          ) : (
            <>
              <SignInModal />
            </>
          )}
        </div>
      )}
    </Transition>
  )
}

export default UserHeader
