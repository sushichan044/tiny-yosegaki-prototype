import { getCachedJoinedProjectsOfUser } from "@/features/projects/next"
import { getUserFromSession } from "@/features/users/db"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getUserFromSession()
  if (!data) {
    redirect("/login")
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projects = await getCachedJoinedProjectsOfUser(data.userId)

  return <></>
}
