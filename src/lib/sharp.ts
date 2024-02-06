import sharp from "sharp"

type ConvertToPng = (...args: Parameters<typeof sharp>) => Promise<Buffer>

const convertToPng: ConvertToPng = async (...args) => {
  const pipeline = sharp(...args)
  return pipeline.png().toBuffer()
}

export { convertToPng }
