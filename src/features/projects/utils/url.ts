const getPostPageUrl = (projectId: string) =>
  `/project/${projectId}/post` as const
const getEditPageUrl = (projectId: string) =>
  `/project/${projectId}/edit` as const
const getProjectPageUrl = (projectId: string) =>
  `/project/${projectId}` as const

export { getEditPageUrl, getPostPageUrl, getProjectPageUrl }
