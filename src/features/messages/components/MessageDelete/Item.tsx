"use client"

import { deleteMessage } from "@/features/messages/action"
import { useServerAction } from "@/hooks/useServerAction"
import { Button, Group, MenuItem, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconTrash } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

type Props = {
  children: React.ReactNode
  messageAuthorId: string
  messageId: string
  projectId: string
}

const MessageDeleteItem: React.FC<Props> = ({
  children,
  messageAuthorId,
  messageId,
  projectId,
}) => {
  const router = useRouter()
  const [opened, { close, open }] = useDisclosure(false)

  // useCallbackしないと関数が毎回生成されて通知がたくさん出てしまう
  const handleFinished = useCallback(
    (result?: { success: boolean } | undefined) => {
      if (result?.success) {
        notifications.show({
          color: "nakuru",
          message: "投稿を削除しました",
          title: "成功",
        })
      } else {
        notifications.show({
          color: "nayuta",
          message: "投稿の削除に失敗しました",
          title: "エラー",
        })
      }
      router.refresh()
      close()
    },
    [close, router],
  )

  const [runAction, isPending] = useServerAction(deleteMessage, handleFinished)
  const handleCancel = () => {
    close()
  }
  const handleConfirm = () => {
    runAction({ authorId: messageAuthorId, messageId, projectId })
  }

  return (
    <>
      <Modal.Root
        centered
        closeOnClickOutside={false}
        closeOnEscape
        onClose={close}
        opened={opened}
      >
        <Modal.Overlay backgroundOpacity={0.2} blur={3} />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <Text fw="bold" size="sm">
                投稿した寄せ書きを削除しますか？
              </Text>
            </Modal.Title>
            <Modal.CloseButton aria-label="キャンセルして閉じる" />
          </Modal.Header>
          <Modal.Body>
            <>
              <Text c="gray" size="sm" span>
                この操作は取り消せません。
              </Text>
              <Group justify="flex-end">
                <Button
                  disabled={isPending}
                  onClick={handleCancel}
                  variant="default"
                >
                  キャンセル
                </Button>
                <Button color="red" loading={isPending} onClick={handleConfirm}>
                  削除
                </Button>
              </Group>
            </>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <MenuItem
        color="red"
        leftSection={<IconTrash stroke={1} />}
        onClick={open}
        role="button"
      >
        {children}
      </MenuItem>
    </>
  )
}

export default MessageDeleteItem
