import { revalidatePath } from "next/cache"

export const USER_PROFILE_CACHE_TAG = "user-profile"
export const USER_CREATED_PROJECTS_CACHE_TAG = "user-created-projects"
export const USER_JOINED_PROJECTS_CACHE_TAG = "user-joined-projects"

export const ALL_ACCEPTED_MESSAGES_CACHE_TAG = "accepted_messages"
export const ALL_OPENED_PROJECTS_CACHE_TAG = "all-opened-projects"

export const revalidateProjectWithId = (projectId: string) => {
  revalidatePath(`/project/${projectId}`)
  revalidatePath(`/project/${projectId}/post`)
  revalidatePath(`/project/${projectId}/edit`)
}

export const revalidateAll = () => revalidatePath("/", "layout")
