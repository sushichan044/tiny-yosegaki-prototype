import UserAvatar from "@/features/users/dashboard/components/UserAvatar"
import { Text } from "@mantine/core"

type Props = {
  id: string
  name: string
}

const Author: React.FC<Props> = ({ id, name }) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <UserAvatar size="sm" userId={id} userName={name} />
      <Text c="gray" lineClamp={1} size="sm">
        企画者: {name}
      </Text>
    </div>
  )
}

export default Author
