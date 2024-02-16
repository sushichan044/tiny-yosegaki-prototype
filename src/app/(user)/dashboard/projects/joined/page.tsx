import { getCachedJoinedProjectsOfUser } from "@/features/projects/next"
import { getUserFromSession } from "@/features/users/db"
import { Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getUserFromSession()
  if (!data) {
    redirect("/login")
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projects = await getCachedJoinedProjectsOfUser(data.userId)

  return (
    <section>
      <Title order={1}>参加した寄せ書き</Title>
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        projects.map((project) => {
          return <div key={project.projectId}>{project.projectName}</div>
        })
      }
    </section>
  )
}
