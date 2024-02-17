import type { Metadata } from "next"

import { getCreatedProjectsOfUser } from "@/features/projects/db"
import CreatedItem from "@/features/users/dashboard/components/ProjectItem/CreatedItem"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Divider, Space, Title } from "@mantine/core"
import { redirect } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
  title: "企画した寄せ書き",
}

export default async function Page() {
  const { data } = await getLatestUserFromSupabase()
  if (!data) {
    redirect("/login")
  }
  const projects = await getCreatedProjectsOfUser(data.userId)

  return (
    <section>
      <Title order={1}>企画した寄せ書き</Title>
      <Space h="lg" />
      {projects.map((project, i) => (
        <React.Fragment key={project.projectId}>
          {i !== 0 && <Divider my="lg" />}
          <CreatedItem project={project} />
        </React.Fragment>
      ))}
    </section>
  )
}
