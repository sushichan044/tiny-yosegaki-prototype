import { Avatar } from "@mantine/core"

type Props = {
  avatarSrc: string
}

const AvatarManagerImage: React.FC<Props> = ({ avatarSrc }) => {
  return (
    <Avatar
      alt="user avatar"
      size={72}
      src={avatarSrc}
      title="あなたのアバター"
    />
  )
}

export default AvatarManagerImage
