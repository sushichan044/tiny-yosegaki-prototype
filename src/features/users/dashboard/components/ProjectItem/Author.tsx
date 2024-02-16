import { getUserAvatarUrl } from "@/features/users/avatar/url"
import { Avatar, Skeleton } from "@mantine/core"

type Props = {
  id: string
  name: string
}

const Author: React.FC<Props> = ({ id, name }) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Avatar size="sm" src={getUserAvatarUrl(id)}>
        <Skeleton circle />
      </Avatar>
      <p className="line-clamp-1">{name}</p>
    </div>
  )
}

export default Author
