"use client"

import "@/features/users/dashboard/components/DashBoardTab/tab.scss"
import { normalizePathName, removePathName } from "@/utils/url"
import { Tabs } from "@mantine/core"
import { IconBook, IconPencil } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"

const TabRoot = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathName = usePathname()
  const dashboardPath = removePathName(pathName, {
    pathNameToRemove: "/dashboard",
  })

  return (
    <>
      <Tabs
        className="max-md:hidden"
        color="nakuru"
        onChange={(value) => {
          router.push(`/dashboard${value ? normalizePathName(value) : ""}`)
        }}
        orientation="vertical"
        radius="md"
        value={dashboardPath}
        variant="default"
      >
        {children}
      </Tabs>
      <Tabs
        className="md:hidden"
        color="nakuru"
        onChange={(value) => {
          router.push(`/dashboard${value ? normalizePathName(value) : ""}`)
        }}
        orientation="horizontal"
        radius="md"
        value={dashboardPath}
        variant="default"
      >
        {children}
      </Tabs>
    </>
  )
}

const DashboardTab = () => {
  // const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <TabRoot>
      <Tabs.List>
        <Tabs.Tab
          leftSection={<IconBook stroke={1.5} />}
          value="/projects/created"
        >
          企画した寄せ書き
        </Tabs.Tab>
        <Tabs.Tab
          leftSection={<IconPencil stroke={1.5} />}
          value="/projects/joined"
        >
          参加した寄せ書き
        </Tabs.Tab>
      </Tabs.List>
    </TabRoot>
  )
}

export default DashboardTab
