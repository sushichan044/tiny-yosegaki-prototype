"use client"

import type { LinkProps } from "next/link"
import type { PropsWithChildren } from "react"

import { Button } from "@mantine/core"
import Link from "next/link"

type Props = PropsWithChildren<LinkProps> & {
  disabled?: boolean
}

const LinkButton: React.FC<Props> = ({ children, disabled, ...props }) => {
  disabled ??= false

  return (
    <Button
      color="nakuru"
      component={Link}
      data-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      size="md"
      {...props}
    >
      {children}
    </Button>
  )
}

export default LinkButton
