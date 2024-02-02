import { getSession } from "@/features/auth/action"
import { redirect } from "next/navigation"

export default async function Page() {
  const {
    data: { session },
  } = await getSession()
  if (session == null || session.user == null) {
    redirect("/auth/login")
  }

  return <>post page</>
}
