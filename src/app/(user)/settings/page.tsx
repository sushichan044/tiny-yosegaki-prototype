import { getUser } from "@/features/users/db"
import Setting from "@/features/users/setting/components/Setting"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getUser()
  if (!data) {
    redirect("/login")
  }

  return (
    <>
      <Setting user={data} />
    </>
  )
}
