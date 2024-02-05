import { getUser } from "@/features/users/db"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getUser()

  if (!data) {
    redirect("/login")
  }

  return (
    <>
      <h1>ユーザー情報ページ</h1>
      <p>ユーザー情報を表示します</p>
      <p>Name: {data.userName}</p>
    </>
  )
}
