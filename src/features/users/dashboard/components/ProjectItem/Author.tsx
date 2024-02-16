import { getUserAvatarUrl } from "@/features/users/avatar/url"
import { Avatar, Skeleton, Text } from "@mantine/core"

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
      <Text c="gray" lineClamp={1} size="sm">
        主催者: {name}
      </Text>
    </div>
  )
}

export default Author
