import type { AvatarProps } from "@mantine/core"

import { getUserAvatarUrl } from "@/features/users/avatar/url"
import { Avatar, Skeleton } from "@mantine/core"
import React from "react"

type Props = {
  children?: React.ReactNode
  size?: AvatarProps["size"]
  title?: string | undefined
  userId: string
} & (
  | {
      alt: string
      userName?: string | undefined
    }
  | {
      alt?: string | undefined
      userName: string
    }
)

const UserAvatar: React.FC<Props> = ({
  alt,
  children,
  size,
  title,
  userId,
  userName,
}) => {
  alt ??= `${userName}のアバター`
  children ??= <Skeleton circle />
  const src = getUserAvatarUrl(userId)

  return (
    <Avatar alt={alt} size={size} src={src} title={title}>
      {children}
    </Avatar>
  )
}

export default UserAvatar
