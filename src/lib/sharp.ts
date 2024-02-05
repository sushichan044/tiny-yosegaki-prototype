import type { ArgumentsType } from "vitest"

import sharp from "sharp"

type ConvertToPng = (...args: ArgumentsType<typeof sharp>) => Promise<Buffer>

const convertToPng: ConvertToPng = async (...args) => {
  const pipeline = sharp(...args)
  return pipeline.png().toBuffer()
}

export { convertToPng }
