import type { CreatedProjectSelect } from "@/features/projects/db"

import { getProjectPageUrl } from "@/features/projects/utils/url"
import CreatedAction from "@/features/users/dashboard/components/ProjectItem/CreatedAction"
import ItemBadge from "@/features/users/dashboard/components/ProjectItem/ItemBadge"
import { Stack, Text } from "@mantine/core"
import Link from "next/link"

type Props = {
  project: CreatedProjectSelect
}

const CreatedItem: React.FC<Props> = ({ project }) => {
  return (
    <Stack component="article" gap="xs">
      <div className="flex flex-row flex-nowrap items-start gap-x-1 md:gap-x-2">
        <div className="flex-1">
          <Text
            component={Link}
            fw="bold"
            href={getProjectPageUrl(project.projectId)}
            lineClamp={2}
          >
            {project.projectName}
          </Text>
        </div>
        <div className="flex flex-row md:gap-x-2">
          <CreatedAction
            projectId={project.projectId}
            status={project.status}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <ItemBadge status={project.status} />
      </div>
    </Stack>
  )
}

export default CreatedItem
