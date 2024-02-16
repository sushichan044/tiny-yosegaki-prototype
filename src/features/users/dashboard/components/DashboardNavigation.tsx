"use client"

import { ICON_STROKE_WIDTH } from "@/components/layouts/Header/UserMenu"
import "@/features/users/dashboard/components/tab.scss"
import { normalizePathName, removePathName } from "@/utils/url"
import { Tabs } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconBook, IconPencil } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"

const DashboardNavigation = () => {
  const router = useRouter()
  const pathName = usePathname()
  const dashPath = removePathName(pathName, {
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
      value={dashPath}
    >
      <Tabs.List>
        <Tabs.Tab
          leftSection={<IconBook stroke={ICON_STROKE_WIDTH} />}
          value="/projects/created"
        >
          企画した寄せ書き
        </Tabs.Tab>
        <Tabs.Tab
          leftSection={<IconPencil stroke={ICON_STROKE_WIDTH} />}
          value="/projects/joined"
        >
          参加した寄せ書き
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export default DashboardNavigation
