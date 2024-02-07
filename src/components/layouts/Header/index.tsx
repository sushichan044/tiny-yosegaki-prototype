import UserHeader from "@/components/layouts/Header/UserHeader"
import { Container, Text } from "@mantine/core"
import Link from "next/link"
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
          <UserHeader />
        </div>
      </Container>
    </header>
  )
}

export default Header
