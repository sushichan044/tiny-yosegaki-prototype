import type { LinkProps } from "next/link"
import type { PropsWithChildren } from "react"

import { Button } from "@mantine/core"
import Link from "next/link"

const LinkButton: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  ...props
}) => {
  return (
    <Button color="nakuru" component={Link} size="md" {...props}>
      {children}
    </Button>
  )
}

export default LinkButton
