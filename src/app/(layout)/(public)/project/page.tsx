import type { Metadata } from "next"

import ProjectsGrid from "@/features/projects/components/ProjectsGrid"
import { Center, Container, Skeleton, Space, Title } from "@mantine/core"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "寄せ書き企画一覧",
}

export default function Page() {
  return (
    <Container className="my-6 md:my-12" size="lg">
      <Center>
        <Title order={1} size="h2">
          寄せ書き企画を探す
        </Title>
      </Center>
      <Space h="lg" />
      <Suspense fallback={<Skeleton />}>
        <ProjectsGrid />
      </Suspense>
    </Container>
  )
}
