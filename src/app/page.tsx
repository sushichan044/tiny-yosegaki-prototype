import type { Metadata } from "next"

import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import LineSeedSubset from "@/components/utils/LineSeedSubset"
import { SITE_NAME } from "@/consts"
import {
  Button,
  Center,
  Container,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { IconBolt, IconLogin2, IconSettings } from "@tabler/icons-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "トップページ | " + SITE_NAME,
}

export default function Home() {
  return (
    <>
      <Header showUserHeader={false} />
      <main className="flex-1">
        <div className="bg-nakuru-50">
          <Container component="section" p="xl" size="lg">
            <Stack
              align="start"
              className="min-h-screen supports-[min-height:100dvh]:min-h-dvh md:min-h-[60vh] py-24"
              gap={0}
            >
              <Title c="nakuru.6" order={1} size="h2">
                <LineSeedSubset>{SITE_NAME}</LineSeedSubset>
              </Title>
              <Space h="1vh" />
              <Text fw="bold" size="md">
                もっと気軽に寄せ書きを
                <br />
                送るためのサービス(仮)
              </Text>
              <Space h="2.5vh" />
              <Text c="gray" size="sm">
                X(旧Twitter)アカウントだけで気軽にWeb完結の寄せ書きを作成できます。
                <br />
                2024年6月頃の正式リリースを予定しています。
              </Text>
              <Space h="2.5vh" />
              <Center>
                <Button
                  color="nakuru"
                  component={Link}
                  href="/project"
                  rightSection={<IconLogin2 />}
                  size="lg"
                >
                  寄せ書き企画を探す
                </Button>
              </Center>
            </Stack>
          </Container>
        </div>
        <div className="bg-white">
          <Container component="section" p="xl" size="lg">
            <Stack gap="lg" justify="center">
              <Title order={2} size="h2">
                特徴
              </Title>
              <div className="flex flex-row gap-4 items-start">
                <ThemeIcon
                  color="nakuru"
                  radius="xl"
                  size="xl"
                  variant="filled"
                >
                  <IconLogin2 />
                </ThemeIcon>
                <Stack>
                  <Title order={3}>気軽</Title>
                  <Text c="gray" size="sm">
                    X(旧Twitter)アカウントさえあれば簡単に寄せ書きを作成できます。
                    <br />
                  </Text>
                </Stack>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <ThemeIcon
                  color="nakuru"
                  radius="xl"
                  size="xl"
                  variant="filled"
                >
                  <IconBolt />
                </ThemeIcon>
                <Stack>
                  <Title order={3}>リアルタイム</Title>
                  <Text c="gray" size="sm">
                    メッセージは何度でも編集可能。
                    <br />
                    反映もリアルタイム。
                  </Text>
                </Stack>
              </div>
              <div className="flex flex-row gap-4 items-start">
                <ThemeIcon
                  color="nakuru"
                  radius="xl"
                  size="xl"
                  variant="filled"
                >
                  <IconSettings />
                </ThemeIcon>
                <Stack>
                  <Title order={3}>カスタマイズ(後日実装)</Title>
                  <Text c="gray" size="sm">
                    参加するユーザーは字体などをカスタマイズできます。
                  </Text>
                </Stack>
              </div>
            </Stack>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}
