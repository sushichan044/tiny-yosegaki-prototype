import type { ProjectSelectWithAuthorName } from "@/features/projects/db"

import { getProjectPageUrl } from "@/features/projects/utils/url"
import Author from "@/features/users/dashboard/components/ProjectItem/Author"
import CreatedAction from "@/features/users/dashboard/components/ProjectItem/CreatedAction"
import ItemBadge from "@/features/users/dashboard/components/ProjectItem/ItemBadge"
import JoinedAction from "@/features/users/dashboard/components/ProjectItem/JoinedAction"
import { Space, Text } from "@mantine/core"
import Link from "next/link"

type Props = {
  project: ProjectSelectWithAuthorName
  variant: "created" | "joined"
}

const ProjectItem: React.FC<Props> = ({ project, variant }) => {
  const isJoinedVariant = variant === "joined"

  return (
    <article className="w-full">
      {isJoinedVariant && (
        <>
          <Author id={project.authorId} name={project.author.userName} />
          <Space h="xs" />
        </>
      )}
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
          {isJoinedVariant ? (
            <JoinedAction projectId={project.projectId} />
          ) : (
            <CreatedAction
              projectId={project.projectId}
              status={project.status}
            />
          )}
        </div>
      </div>
      <Space h="xs" />
      <div className="flex flex-row items-center">
        <ItemBadge status={project.status} />
      </div>
    </article>
  )
}

export default ProjectItem
