import type { ProjectParams } from "@/app/(layout)/(auth)/project/[id]/manage/_template"

import ManageTab from "@/features/projects/components/ManageTab"

export default function Page({ params }: ProjectParams) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside>
        <ManageTab projectId={params.id} />
      </aside>
      <div className="flex-1">gahaha</div>
    </div>
  )
}
