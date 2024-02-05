import type { cookies } from "next/headers"

import { AVATAR_BUCKET_NAME } from "@/features/users/avatar/consts"
import { convertToPng } from "@/lib/sharp"
import { uploadFile } from "@/lib/supabase/file/upload"
import { getProfileImageUrl } from "@/utils/twitter"

type UploadTwitterIcon = (
  cookie: ReturnType<typeof cookies>,
  {
    iconSrc,
    userId,
  }: {
    iconSrc: string
    userId: string
  },
) => Promise<void>

const uploadTwitterIcon: UploadTwitterIcon = async (
  cookie,
  { iconSrc, userId },
) => {
  const icon = await fetch(
    getProfileImageUrl(iconSrc, {
      variant: "original",
    }),
  )
  const arrayBuffer = await icon.arrayBuffer()

  const iconPng = await convertToPng(arrayBuffer)
  await uploadFile(
    cookie,
    {
      bucketName: AVATAR_BUCKET_NAME,
      file: iconPng,
      filePath: `${userId}/avatar.png`,
    },
    {
      contentType: "image/png",
      upsert: true,
    },
  )
}

export { uploadTwitterIcon }
