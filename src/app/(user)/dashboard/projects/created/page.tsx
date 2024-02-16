import { getCachedCreatedProjectsOfUser } from "@/features/projects/next"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getLatestUserFromSupabase()
  if (!data) {
    redirect("/login")
  }
  const projects = await getCachedCreatedProjectsOfUser(data.userId)

  return (
    <section>
      <Title order={1}>企画した寄せ書き</Title>
      {projects.map((project) => (
        <div key={project.projectId}>
          <h2>{project.projectName}</h2>
          <p>{project.projectDescription}</p>
        </div>
      ))}
    </section>
  )
}
