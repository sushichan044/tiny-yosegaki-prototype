"use client"

import type { MotionConfigProps } from "framer-motion"

import { MotionConfig as FramerMotionConfig } from "framer-motion"
type Props = MotionConfigProps & {
  children: React.ReactNode
}

const MotionConfig = ({ children, reducedMotion, ...props }: Props) => {
  // prefer user preference
  reducedMotion ??= "user"
  return (
    <FramerMotionConfig reducedMotion={reducedMotion} {...props}>
      {children}
    </FramerMotionConfig>
  )
}

export default MotionConfig
