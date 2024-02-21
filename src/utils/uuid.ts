import { z } from "zod"

const uuidSchema = z.string().uuid()

const isValidUUID = (uuid: string) => {
  const res = uuidSchema.safeParse(uuid)
  return res
}

export { isValidUUID }
