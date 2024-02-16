import { Container } from "@mantine/core"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    wrapper: "w-full bg-white border-t",
  },
})()

const Footer = () => {
  return (
    <footer className={styles.wrapper()}>
      <Container classNames={{ root: "py-4" }} size="md">
        Footer
      </Container>
    </footer>
  )
}

export default Footer
