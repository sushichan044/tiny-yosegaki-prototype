import type { getProjectsForCard } from "@/features/projects/action"

import { getUserAvatarUrl } from "@/features/users/avatar/url"
import {
  Avatar,
  AvatarGroup,
  Group,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core"
import Link from "next/link"

type ProjectCardProps = {
  project: Awaited<ReturnType<typeof getProjectsForCard>>[number]
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const shownAvatars = project.joinedUsers
    .slice(0, 3)
    .map(({ userId }) => getUserAvatarUrl(userId))

  return (
    <Paper
      className="shadow-md hocus:shadow-lg transition-shadow duration-500"
      component={Link}
      href={`/project/${project.projectId}`}
      p="lg"
    >
      <article>
        <Title order={2} size="h3">
          {project.projectName}
        </Title>
        <Space h="sm" />
        <Text c="gray" size="sm">
          {project.projectDescription}
        </Text>
        <Space h="lg" />
        <Group gap={4}>
          <Text c="gray" size="xs">
            参加している人
          </Text>
          <AvatarGroup>
            {shownAvatars.map((avatarUrl, index) => {
              return <Avatar key={index} size={24} src={avatarUrl} />
            })}
            {project.joinedUsers.length > 3 && (
              <Avatar size={24}>
                <Text size="sm">+{project.joinedUsers.length - 3}</Text>
              </Avatar>
            )}
          </AvatarGroup>
        </Group>
      </article>
    </Paper>
  )
}

export default ProjectCard
