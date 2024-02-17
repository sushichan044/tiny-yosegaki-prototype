import type { CreatedProjectSelect } from "@/features/projects/db"

import { getProjectPageUrl } from "@/features/projects/utils/url"
import CreatedAction from "@/features/users/dashboard/components/ProjectItem/CreatedAction"
import ItemBadge from "@/features/users/dashboard/components/ProjectItem/ItemBadge"
import { Space, Text } from "@mantine/core"
import Link from "next/link"

type Props = {
  project: CreatedProjectSelect
}

const CreatedItem: React.FC<Props> = ({ project }) => {
  return (
    <article className="w-full">
      <div className="flex flex-row flex-nowrap items-start gap-x-3 md:gap-x-6">
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
        <div className="flex flex-row gap-x-2 md:gap-x-4">
          <CreatedAction
            projectId={project.projectId}
            status={project.status}
          />
        </div>
      </div>
      <Space h="xs" />
      <div className="flex flex-row items-center">
        <ItemBadge status={project.status} />
      </div>
    </article>
  )
}

export default CreatedItem
