import UserHeader from "@/components/layouts/Header/UserHeader"
import { Text } from "@mantine/core"
import Link from "next/link"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    innerWrapper: "p-2 px-4 md:px-8 flex justify-between items-center",
    wrapper: "border-b-2 bg-white",
  },
})()

const Header = () => {
  return (
    <header className={styles.wrapper()}>
      <div className={styles.innerWrapper()}>
        <div>
          <Text component={Link} href="/">
            よせがき
          </Text>
        </div>
        <UserHeader />
      </div>
    </header>
  )
}

export default Header
