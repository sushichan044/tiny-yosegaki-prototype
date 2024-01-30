"use client"

import { LazyMotion as FramerLazyMotion } from "framer-motion"

const loadAnimationFeatures = () =>
  import("./feature").then((res) => res.domAnimation)
const loadMaxFeatures = () => import("./feature").then((res) => res.domMax)

type Props = {
  children: React.ReactNode
  maxFeatures?: boolean
}

export default function LazyMotion({ children, maxFeatures }: Props) {
  maxFeatures ??= false
  return (
    <FramerLazyMotion
      features={maxFeatures ? loadMaxFeatures : loadAnimationFeatures}
      strict
    >
      {children}
    </FramerLazyMotion>
  )
}
