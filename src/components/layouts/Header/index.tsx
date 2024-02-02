import UserHeader from "@/components/layouts/Header/UserHeader"
import { getUser } from "@/features/auth/action"
import { Text } from "@mantine/core"
import Link from "next/link"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    innerWrapper: "p-2 px-4 md:px-8 flex justify-between items-center",
    wrapper: "border-b-2 bg-white",
  },
})()

const Header = async () => {
  const {
    data: { user },
  } = await getUser()

  return (
    <header className={styles.wrapper()}>
      <div className={styles.innerWrapper()}>
        <div>
          <Text component={Link} href="/">
            よせがき
          </Text>
        </div>
        <UserHeader user={user} />
      </div>
    </header>
  )
}

export default Header
