"use client"

import type { AnimatePresenceProps } from "framer-motion"

import { AnimatePresence as MantineAnimatePresence } from "framer-motion"

type Props = {
  children: React.ReactNode
} & AnimatePresenceProps

const AnimatePresence = ({ children, ...props }: Props) => (
  <MantineAnimatePresence {...props}>{children}</MantineAnimatePresence>
)
export default AnimatePresence
