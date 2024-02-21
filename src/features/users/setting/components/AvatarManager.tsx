"use client"

import { uploadUserAvatar } from "@/features/users/action"
import UserAvatar from "@/features/users/dashboard/components/UserAvatar"
import { Container, FileButton, Text } from "@mantine/core"
import { notifications } from "@mantine/notifications"

type Props = {
  userId: string
}

const AvatarManager = ({ userId }: Props) => {
  const handleChange = async (payload: File | null) => {
    if (!payload) {
      notifications.show({
        color: "red",
        message: "アバターが選択されていません",
        title: "エラー",
      })
      return
    }
    const formData = new FormData()
    formData.append("avatar", payload)
    const { error } = await uploadUserAvatar({
      formData: formData,
      userId,
    })
    if (error) {
      notifications.show({
        color: "red",
        message: "アバターのアップロードに失敗しました",
        title: "エラー",
      })
    } else {
      notifications.show({
        color: "green",
        message:
          "アイコンを変更しました。反映にはしばらく時間がかかることがあります。",
        title: "成功",
      })
    }
  }

  return (
    <Container size={100}>
      <FileButton accept="image/*" onChange={handleChange}>
        {(props) => (
          <button
            className="bg-transparent flex flex-col justify-center items-center gap-y-2"
            {...props}
          >
            <UserAvatar
              alt="あなたのアバター"
              size={72}
              title="クリックしてアバターを編集"
              userId={userId}
            />
            <Text
              c="gray"
              className="hocus:underline underline-offset-4"
              size="xs"
            >
              変更する
            </Text>
          </button>
        )}
      </FileButton>
    </Container>
  )
}

export default AvatarManager
