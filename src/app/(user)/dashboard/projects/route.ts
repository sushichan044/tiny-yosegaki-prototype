import { redirect } from "next/navigation"

export const GET = () => {
  redirect("/dashboard/projects/created")
}
