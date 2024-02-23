import { Anchor, Container } from "@mantine/core"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    wrapper: "w-full bg-white border-t",
  },
})()

const Footer = () => {
  return (
    <footer className={styles.wrapper()}>
      <Container classNames={{ root: "py-4" }} size="lg">
        <Anchor c="gray" href="/contact">
          お問い合わせ
        </Anchor>
      </Container>
    </footer>
  )
}

export default Footer
