"use client"

import { uploadUserAvatar } from "@/features/users/action"
import { getUserAvatarUrl } from "@/features/users/avatar/url"
import AvatarManagerImage from "@/features/users/setting/components/AvatarManagerImage"
import { Container, FileButton, Text } from "@mantine/core"
import { notifications } from "@mantine/notifications"

type Props = {
  userId: string
}

const AvatarManager = ({ userId }: Props) => {
  const avatarSrc = getUserAvatarUrl(userId, {
    height: 72,
    quality: 80,
    width: 72,
  })

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
      console.error(error)
      notifications.show({
        color: "red",
        message: "アバターのアップロードに失敗しました",
        title: "エラー",
      })
      return
    }
    notifications.show({
      color: "green",
      message:
        "アイコンを変更しました。反映にはしばらく時間がかかることがあります。",
      title: "成功",
    })
  }

  return (
    <Container size={100}>
      <FileButton accept="image/*" onChange={handleChange}>
        {(props) => (
          <button
            className="bg-white flex flex-col justify-center items-center gap-y-2"
            {...props}
          >
            <AvatarManagerImage avatarSrc={avatarSrc} />
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
