"use client"

import "@/features/users/dashboard/components/DashBoardTab/tab.scss"
import { normalizePathName, removePathName } from "@/utils/url"
import { Tabs } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconBook, IconPencil } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"

const DashboardTab = () => {
  const router = useRouter()
  const pathName = usePathname()
  const dashboardPath = removePathName(pathName, {
    pathNameToRemove: "/dashboard",
  })
  const isMobile = useMediaQuery("(max-width: 768px)", true, {
    getInitialValueInEffect: true,
  })

  return (
    <Tabs
      color="nakuru"
      onChange={(value) => {
        router.push(`/dashboard${value ? normalizePathName(value) : ""}`)
      }}
      orientation={isMobile ? "horizontal" : "vertical"}
      radius="md"
      value={dashboardPath}
      variant="pills"
    >
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
    </Tabs>
  )
}

export default DashboardTab
