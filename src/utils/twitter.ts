const TWITTER_PROFILE_IMAGE_URL_REGEX =
  /^https:\/\/pbs\.twimg\.com\/profile_images\/(?<id>\d+)\/(?<prefix>\w+)_(?<variant>normal|bigger|mini)\.jpg$/

//https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/user-profile-images-and-banners
type TwitterProfileImageVariant = "bigger" | "mini" | "normal" | "original"

type GetProfileImageUrl = (
  url: string,
  options?: {
    variant?: TwitterProfileImageVariant
  },
) => string

const getProfileImageUrl: GetProfileImageUrl = (url: string, options) => {
  if (!TWITTER_PROFILE_IMAGE_URL_REGEX.test(url)) {
    throw new Error("Invalid Twitter profile image URL: " + url)
  }

  const variant: TwitterProfileImageVariant = options?.variant ?? "normal"

  if (variant === "original") {
    return url.replace(
      TWITTER_PROFILE_IMAGE_URL_REGEX,
      `https://pbs.twimg.com/profile_images/$1/$2.jpg`,
    )
  }
  return url.replace(
    TWITTER_PROFILE_IMAGE_URL_REGEX,
    `https://pbs.twimg.com/profile_images/$1/$2_${variant}.jpg`,
  )
}

export { getProfileImageUrl }
