class SessionNotFoundError extends Error {
  constructor() {
    super("No session found")
  }
  static {
    this.prototype.name = "SessionNotFoundError"
  }
}

export { SessionNotFoundError }
