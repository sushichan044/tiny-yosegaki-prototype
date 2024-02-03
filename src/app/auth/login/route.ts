import { signIn } from "@/features/auth/action"

export async function GET() {
  await signIn()
}
