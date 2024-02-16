import type { Metadata } from "next"

import { getJoinedProjectsOfUser } from "@/features/projects/db"
import ProjectItem from "@/features/users/dashboard/components/ProjectItem"
import { getUserFromSession } from "@/features/users/db"
import { Divider, Space, Title } from "@mantine/core"
import { redirect } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
  title: "参加した寄せ書き",
}

export default async function Page() {
  const { data } = await getUserFromSession()
  if (!data) {
    redirect("/login")
  }
  const projects = await getJoinedProjectsOfUser(data.userId)

  return (
    <section>
      <Title order={1}>参加した寄せ書き</Title>
      <Space h="lg" />
      <div>
        {projects.map((project, i) => (
          <React.Fragment key={project.projectId}>
            {i !== 0 && <Divider />}
            <ProjectItem project={project} variant="joined" />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
