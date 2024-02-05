const AVATAR_BUCKET_NAME = "user-avatar" as const
const getAvatarFileName = (userId: string) => `${userId}/avatar.png`

export { AVATAR_BUCKET_NAME, getAvatarFileName }
