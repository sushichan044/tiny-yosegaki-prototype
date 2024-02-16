import UserHeader from "@/components/layouts/Header/UserHeader"
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
        size="md"
      >
        <div>
          <Text component={Link} href="/">
            YellBox
          </Text>
        </div>
        <Suspense fallback={<Skeleton />}>
          <UserHeader />
        </Suspense>
      </Container>
    </header>
  )
}

export default Header
