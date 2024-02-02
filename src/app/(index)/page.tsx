import SignInButton from "@/features/auth/components/SignInButton"

export default function Home() {
  return (
    <main>
      <div>
        <h1>top</h1>
        <SignInButton redirectTo="/post" />
      </div>
    </main>
  )
}
