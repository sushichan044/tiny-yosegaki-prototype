import DashboardNavigation from "@/features/users/dashboard/components/DashboardNavigation"

export default async function Page({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside>
        <DashboardNavigation />
      </aside>
      {children}
    </div>
  )
}
