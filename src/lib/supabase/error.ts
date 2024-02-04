class SessionNotFoundError extends Error {
  constructor() {
    super("No session found")
  }
  static {
    this.prototype.name = "SessionNotFoundError"
  }
}

type ServerError = {
  description?: string | undefined
  status?: number | undefined
}

const EMAIL_NOT_FOUND_ERROR = {
  description: "Error getting user email from external provider",
  status: 500,
} as const satisfies ServerError

const isEmailNotFoundError = (error: ServerError) => {
  return (
    error.status === EMAIL_NOT_FOUND_ERROR.status &&
    error.description === EMAIL_NOT_FOUND_ERROR.description
  )
}

export { SessionNotFoundError, isEmailNotFoundError }
export type { ServerError }
