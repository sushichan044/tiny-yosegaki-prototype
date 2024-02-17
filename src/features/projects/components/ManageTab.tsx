"use client"

import "@/features/projects/components/ManageTab.scss"
import { removePathName } from "@/utils/url"
import { Tabs } from "@mantine/core"
import { IconMessage, IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
    <Tabs
      color="nakuru"
      defaultValue={normalizedPathName}
      orientation="horizontal"
      radius="md"
      variant="default"
    >
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
    </Tabs>
  )
}

export default ManageTab
