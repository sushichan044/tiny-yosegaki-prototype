import type { ImageProps } from "next/image"

import { getImageProps } from "next/image"

type GetBackgroundImageType = (
  srcSet: string | undefined,
) => `image-set(${string})`

// https://nextjs.org/docs/app/api-reference/components/image#background-css
const getBackgroundImage: GetBackgroundImageType = (srcSet = "") => {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ")
      return `url("${url}") ${dpi}`
    })
    .join(", ")
  return `image-set(${imageSet})`
}

// fill and sizes are not work properly
type GetBackgroundNextImageType = (
  props: Omit<ImageProps, "fill" | "sizes">,
) => ReturnType<GetBackgroundImageType>

const getBackgroundNextImage: GetBackgroundNextImageType = (props) => {
  const {
    props: { srcSet },
  } = getImageProps(props)
  return getBackgroundImage(srcSet)
}

export { getBackgroundImage, getBackgroundNextImage }
