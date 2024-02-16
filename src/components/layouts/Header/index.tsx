import UserHeader from "@/components/layouts/Header/UserHeader"
import { SITE_NAME } from "@/consts"
import { Container, Skeleton, Text } from "@mantine/core"
import Link from "next/link"
import { Suspense } from "react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    innerWrapper: "flex justify-between items-center h-full",
    wrapper: "border-b bg-white h-[60px]",
  },
})()

const Header = () => {
  return (
    <header className={styles.wrapper()}>
      <Container
        className={styles.innerWrapper()}
        classNames={{ root: "py-2" }}
        size="lg"
      >
        <div>
          <Text component={Link} href="/">
            {SITE_NAME}
          </Text>
        </div>
        <Suspense
          fallback={
            <div className="flex gap-x-4 flex-row">
              <Skeleton circle h={36} w={36} />
              <div className="max-md:hidden">
                <Skeleton h={36} w={128} />
              </div>
            </div>
          }
        >
          <UserHeader />
        </Suspense>
      </Container>
    </header>
  )
}

export default Header
