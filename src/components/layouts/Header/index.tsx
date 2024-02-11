import UserHeader from "@/components/layouts/Header/UserHeader"
import { Container, Text } from "@mantine/core"
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
        size="sm"
      >
        <div>
          <Text component={Link} href="/">
            YellBox
          </Text>
        </div>
        <Suspense>
          <UserHeader />
        </Suspense>
      </Container>
    </header>
  )
}

export default Header
