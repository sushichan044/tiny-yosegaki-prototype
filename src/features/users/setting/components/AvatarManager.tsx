"use client"

import { getUserAvatarUrl } from "@/features/users/avatar/url"
import { Avatar, Container, Text } from "@mantine/core"

type Props = {
  userId: string
}

const AvatarManager = ({ userId }: Props) => {
  const avatarSrc = getUserAvatarUrl(userId, {
    height: 72,
    quality: 80,
    width: 72,
  })

  return (
    <Container
      className="flex flex-col justify-center items-center gap-y-2"
      size={100}
    >
      <Avatar alt="user avatar" size={72} src={avatarSrc} title="アバター" />
      <Text c="gray" size="xs">
        変更する
      </Text>
    </Container>
  )
}

export default AvatarManager
