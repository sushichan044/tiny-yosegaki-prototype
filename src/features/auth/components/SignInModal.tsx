"use client"

import SignIn from "@/features/auth/components/SignIn"
import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { usePathname } from "next/navigation"

const SignInModal = () => {
  const pathName = usePathname()
  const [opened, { close, open }] = useDisclosure()

  return (
    <>
      <Button color="nakuru" onClick={open}>
        ログイン
      </Button>
      <Modal
        centered
        closeButtonProps={{ "aria-label": "閉じる" }}
        onClose={close}
        opened={opened}
        size="md"
        title="ログイン"
      >
        <SignIn redirectTo={pathName} />
      </Modal>
    </>
  )
}

export default SignInModal
