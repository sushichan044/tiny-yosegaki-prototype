import ManageTab from "@/features/projects/components/ManageTab"

export type ProjectParams = { params: { id: string } }

// SEE: https://github.com/vercel/next.js/issues/48149
// TODO: use this template when template.tsx accepts params
export default function Template({
  children,
  params,
}: ProjectParams & {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside>
        <ManageTab projectId={params.id} />
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  )
}
