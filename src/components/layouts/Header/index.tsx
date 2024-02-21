import UserHeader from "@/components/layouts/Header/UserHeader"
import { SITE_NAME } from "@/consts"
import { Container, Skeleton, Text } from "@mantine/core"
import { IconWriting } from "@tabler/icons-react"
import Link from "next/link"
import { Suspense } from "react"
import { tv } from "tailwind-variants"

type Props = {
  showUserHeader?: boolean | undefined
}

const styles = tv({
  slots: {
    innerWrapper: "flex justify-between items-center h-full",
    titleWrapper: "inline-flex items-center gap-1",
    wrapper: "border-b bg-white h-[60px]",
  },
})()

const Header: React.FC<Props> = ({ showUserHeader }) => {
  showUserHeader ??= true

  return (
    <header className={styles.wrapper()}>
      <Container
        className={styles.innerWrapper()}
        classNames={{ root: "py-2" }}
        size="lg"
      >
        <p className={styles.titleWrapper()}>
          <IconWriting
            size={32}
            stroke={1}
            style={{ color: "var(--mantine-color-nakuru-5)" }}
          />
          <Text component={Link} fw={600} href="/" lh={1}>
            {SITE_NAME}
          </Text>
        </p>
        {showUserHeader && (
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
        )}
      </Container>
    </header>
  )
}

export default Header
