import type { JoinedProjectSelect } from "@/features/projects/db"

import { getProjectPageUrl } from "@/features/projects/utils/url"
import Author from "@/features/users/dashboard/components/ProjectItem/Author"
import ItemBadge from "@/features/users/dashboard/components/ProjectItem/ItemBadge"
import JoinedAction from "@/features/users/dashboard/components/ProjectItem/JoinedAction"
import { Space, Text } from "@mantine/core"
import Link from "next/link"

type Props = {
  project: JoinedProjectSelect
}

const JoinedItem: React.FC<Props> = ({ project }) => {
  return (
    <article className="w-full">
      <Author id={project.authorId} name={project.author.userName} />
      <Space h="xs" />
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
          <JoinedAction project={project} />
        </div>
      </div>
      <Space h="xs" />
      <div className="flex flex-row items-center">
        <ItemBadge status={project.status} />
      </div>
    </article>
  )
}

export default JoinedItem