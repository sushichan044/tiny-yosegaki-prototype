import { getUserTwitterId } from "@/features/users/action"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconBrandX } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  userId: string
  userName: string
}

const UserTwitterLink: React.FC<Props> = async ({ userId, userName }) => {
  const twitterId = await getUserTwitterId(userId)
  if (!twitterId) {
    return null
  }

  return (
    <Tooltip label={`@${twitterId}`} position="top" withArrow>
      <ActionIcon
        aria-label={`${userName}のXアカウント`}
        color="black"
        component={Link}
        href={`https://x.com/${twitterId}`}
        target="_blank"
        variant="white"
      >
        <IconBrandX stroke={1} />
      </ActionIcon>
    </Tooltip>
  )
}

export default UserTwitterLink
