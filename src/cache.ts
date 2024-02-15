import { revalidatePath, revalidateTag } from "next/cache"

export const USER_PROFILE_CACHE_TAG = "user-profile"
export const USER_CREATED_PROJECTS_CACHE_TAG = "user-created-projects"
export const USER_JOINED_PROJECTS_CACHE_TAG = "user-joined-projects"

export const ALL_ACCEPTED_MESSAGES_CACHE_TAG = "accepted_messages"
export const ALL_OPENED_PROJECTS_CACHE_TAG = "all-opened-projects"

export const revalidateProject = (projectId: string) => {
  revalidateTag(ALL_OPENED_PROJECTS_CACHE_TAG)
  revalidatePath(`/project/${projectId}`)
  revalidatePath(`/project/${projectId}/post`)
}
