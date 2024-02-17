import type { ProjectParams } from "@/app/(project)/project/[id]/manage/_template"

import { redirect } from "next/navigation"

export const GET = (req: Request, { params }: ProjectParams) => {
  redirect(`/project/${params.id}/manage/setting`)
}
