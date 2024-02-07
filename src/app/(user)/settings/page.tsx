import { getCachedUser } from "@/features/users/next"
import Setting from "@/features/users/setting/components/Setting"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getCachedUser()
  if (!data) {
    redirect("/login")
  }

  return (
    <div>
      <Setting user={data} />
    </div>
  )
}
