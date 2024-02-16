const getPostPageUrl = (projectId: string) =>
  `/project/${projectId}/post` as const
const getManagePageUrl = (projectId: string) =>
  `/project/${projectId}/manage` as const
const getProjectPageUrl = (projectId: string) =>
  `/project/${projectId}` as const

export { getManagePageUrl, getPostPageUrl, getProjectPageUrl }
