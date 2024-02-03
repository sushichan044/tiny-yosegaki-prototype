import { Foras, Memory, deflate, inflate } from "@hazae41/foras"
// or { Foras, gzip, gunzip }
// or { Foras, zlib, unzlib }

const compress = async (str: string): Promise<string> => {
  // Wait for WASM to load
  await Foras.initBundledOnce()
  const bytes = new TextEncoder().encode(str)
  const arr = deflate(new Memory(bytes)).copyAndDispose()
  return new TextDecoder().decode(arr)
}

const decompress = async (str: string): Promise<string> => {
  // Wait for WASM to load
  await Foras.initBundledOnce()
  const bytes = new TextEncoder().encode(str)
  const arr = inflate(new Memory(bytes)).copyAndDispose()
  return new TextDecoder().decode(arr)
}

export { compress, decompress }
