"use client"

import "@/features/users/dashboard/components/DashBoardTab/tab.scss"
import { normalizePathName, removePathName } from "@/utils/url"
import { Tabs } from "@mantine/core"
import { IconBook, IconPencil } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const TabRoot = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  // const dashboardPath = removePathName(pathName, {
  //   pathNameToRemove: "/dashboard",
  // })

  return (
    <>
      <Tabs
        className="max-md:hidden"
        color="nakuru"
        defaultValue={pathName}
        orientation="vertical"
        radius="md"
        variant="default"
      >
        {children}
      </Tabs>
      <Tabs
        className="md:hidden"
        color="nakuru"
        defaultValue={pathName}
        orientation="horizontal"
        radius="md"
        variant="default"
      >
        {children}
      </Tabs>
    </>
  )
}

const DashboardTab = () => {
  return (
    <TabRoot>
      <Tabs.List>
        <Link href="/dashboard/projects/created">
          <Tabs.Tab
            leftSection={<IconBook stroke={1.5} />}
            value="/dashboard/projects/created"
          >
            企画した寄せ書き
          </Tabs.Tab>
        </Link>
        <Link href="/dashboard/projects/joined">
          <Tabs.Tab
            leftSection={<IconPencil stroke={1.5} />}
            value="/dashboard/projects/joined"
          >
            参加した寄せ書き
          </Tabs.Tab>
        </Link>
      </Tabs.List>
    </TabRoot>
  )
}

export default DashboardTab
