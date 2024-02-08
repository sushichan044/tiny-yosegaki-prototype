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
) => ReturnType<typeof uploadFile>
type UploadArrayBufferIcon = (
  cookie: ReturnType<typeof cookies>,
  {
    file,
    userId,
  }: {
    file: ArrayBuffer
    userId: string
  },
) => ReturnType<typeof uploadFile>

const uploadNewUserIconFromTwitter = async (
  cookie: ReturnType<typeof cookies>,
  { iconSrc, userId }: { iconSrc: string; userId: string },
): Promise<
  | {
      data: { path: string }
      error: null
    }
  | {
      data: null
      error: string
    }
> => {
  const icon = await fetch(
    getProfileImageUrl(iconSrc, {
      variant: "original",
    }),
  )
  const arrayBuffer = await icon.arrayBuffer()

  const iconPng = await convertToPng(arrayBuffer)
  try {
    const res = await uploadFile(
      cookie,
      {
        bucketName: AVATAR_BUCKET_NAME,
        file: iconPng,
        filePath: `${userId}/avatar.png`,
      },
      {
        contentType: "image/png",
        upsert: false,
      },
    )
    if (res.data) {
      return {
        data: res.data,
        error: null,
      }
    }
    return {
      data: null,
      error: "Failed to upload icon: " + res.error.message,
    }
  } catch (e) {
    console.error(e)
    return {
      data: null,
      error: "Object already exists in bucket",
    }
  }
}

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
  return await uploadArrayBufferIcon(cookie, {
    file: iconPng,
    userId,
  })
}

const uploadArrayBufferIcon: UploadArrayBufferIcon = async (
  cookie,
  { file, userId },
) => {
  const res = await uploadFile(
    cookie,
    {
      bucketName: AVATAR_BUCKET_NAME,
      file,
      filePath: `${userId}/avatar.png`,
    },
    {
      contentType: "image/png",
      upsert: true,
    },
  )
  return res
}

export {
  uploadArrayBufferIcon,
  uploadNewUserIconFromTwitter,
  uploadTwitterIcon,
}
