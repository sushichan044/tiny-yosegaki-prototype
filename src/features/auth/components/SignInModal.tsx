"use client"

import SignIn from "@/features/auth/components/SignIn"
import { Button, Modal, Text } from "@mantine/core"
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
        overlayProps={{ backgroundOpacity: 0.2, blur: 3 }}
        size="md"
        title={
          <Text fw="bold" size="lg">
            ログイン
          </Text>
        }
      >
        <SignIn redirectTo={pathName} />
      </Modal>
    </>
  )
}

export default SignInModal
