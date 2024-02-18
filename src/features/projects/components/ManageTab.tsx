"use client"

import "@/features/projects/components/ManageTab.scss"
import { removePathName } from "@/utils/url"
import { Tabs } from "@mantine/core"
import { IconMessage, IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TabRoot = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode
  defaultValue: string
}) => {
  return (
    <>
      <Tabs
        className="max-md:hidden"
        color="nakuru"
        defaultValue={defaultValue}
        orientation="vertical"
        radius="md"
        variant="default"
      >
        {children}
      </Tabs>
      <Tabs
        className="md:hidden"
        color="nakuru"
        defaultValue={defaultValue}
        orientation="horizontal"
        radius="md"
        variant="default"
      >
        {children}
      </Tabs>
    </>
  )
}

type Props = {
  projectId: string
}

const ManageTab: React.FC<Props> = ({ projectId }) => {
  const pathName = usePathname()
  const basePath = `/project/${projectId}/manage` as const
  const normalizedPathName = removePathName(pathName, {
    pathNameToRemove: basePath,
  })

  return (
    <TabRoot defaultValue={normalizedPathName}>
      <Tabs.List>
        <Tabs.Tab
          component={Link}
          // @ts-expect-error this works!
          href={`${basePath}/setting`}
          leftSection={<IconSettings stroke={1.5} />}
          value="/setting"
        >
          企画の設定
        </Tabs.Tab>
        <Tabs.Tab
          component={Link}
          // @ts-expect-error this works!
          href={`${basePath}/message`}
          leftSection={<IconMessage stroke={1.5} />}
          value="/message"
        >
          投稿された寄せ書き
        </Tabs.Tab>
      </Tabs.List>
    </TabRoot>
  )
}

export default ManageTab
