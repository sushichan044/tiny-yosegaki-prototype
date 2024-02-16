import type { ProjectSelect } from "@/db/schema/projects"

import { Badge, Text } from "@mantine/core"

type Props = {
  status: ProjectSelect["status"]
}

const ItemBadge: React.FC<Props> = ({ status }) => {
  switch (status) {
    case "open":
      return (
        <Badge color="nakuru" variant="dot">
          <Text c="gray" size="xs">
            受付中
          </Text>
        </Badge>
      )
    case "closed":
      return (
        <Badge color="nayuta" variant="dot">
          <Text c="gray" size="xs">
            終了
          </Text>
        </Badge>
      )
    default:
      return (
        <Badge color="gray" variant="dot">
          <Text c="gray" size="xs">
            準備中
          </Text>
        </Badge>
      )
  }
}

export default ItemBadge
