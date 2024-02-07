import type { TransformOptions } from "@supabase/storage-js"

import { env } from "@/env.mjs"
import {
  AVATAR_BUCKET_NAME,
  getAvatarFileName,
} from "@/features/users/avatar/consts"
// import { createNormalClient } from "@/lib/supabase/client/normal"

type GetUserAvatarUrl = (
  userId: string,
  options?: TransformOptions | undefined,
) => string
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserAvatarUrl: GetUserAvatarUrl = (userId: string, options) => {
  //   const supabase = createNormalClient()
  //   const url = supabase.storage
  //     .from(AVATAR_BUCKET_NAME)
  //     .getPublicUrl(getAvatarFileName(userId), {
  //       transform: options,
  //     })
  //   return url.data.publicUrl
  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${AVATAR_BUCKET_NAME}/${getAvatarFileName(userId)}`
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserAvatarUrlByPath: GetUserAvatarUrl = (path: string, options) => {
  //   const supabase = createNormalClient()
  //   const url = supabase.storage
  //     .from(AVATAR_BUCKET_NAME)
  //     .getPublicUrl(getAvatarFileName(userId), {
  //       transform: options,
  //     })
  //   return url.data.publicUrl
  return new URL(
    path,
    `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${AVATAR_BUCKET_NAME}/`,
  ).toString()
}

export { getUserAvatarUrl, getUserAvatarUrlByPath }
