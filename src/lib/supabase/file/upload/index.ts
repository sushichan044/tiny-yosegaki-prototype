"use server"

import type { FileOptions, StorageError } from "@supabase/storage-js"
import type { cookies } from "next/headers"

import { createActionClient } from "@/lib/supabase/client/action"

type FileBody =
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | Buffer
  | File
  | FormData
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | URLSearchParams
  | string

type UploadFile = {
  bucketName: string
  file: FileBody
  filePath: string
  upsert?: boolean
}

type UploadFileFunction = (
  cookie: ReturnType<typeof cookies>,
  file: UploadFile,
  options?: FileOptions | undefined,
) => Promise<
  | {
      data: { path: string }
      error: null
    }
  | {
      data: null
      error: StorageError
    }
>

const uploadFile: UploadFileFunction = async (cookie, file, options) => {
  const supabase = createActionClient(cookie)

  const res = await supabase.storage
    .from(file.bucketName)
    .upload(file.filePath, file.file, options)

  if (res.error) {
    console.error("uploadFile: ", res.error)
  }
  return res
}

export { uploadFile }
