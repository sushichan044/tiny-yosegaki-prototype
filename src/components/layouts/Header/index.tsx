import UserHeader from "@/components/layouts/Header/UserHeader"
import { Container, Skeleton, Text } from "@mantine/core"
import Link from "next/link"
import { Suspense } from "react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    innerWrapper: "flex justify-between items-center",
    wrapper: "border-b bg-white",
  },
})()

const Header = () => {
  return (
    <header className={styles.wrapper()}>
      <Container classNames={{ root: "py-2" }}>
        <div className={styles.innerWrapper()}>
          <div>
            <Text component={Link} href="/">
              YellBox
            </Text>
          </div>
          <Suspense fallback={<Skeleton />}>
            <UserHeader />
          </Suspense>
        </div>
      </Container>
    </header>
  )
}

export default Header
