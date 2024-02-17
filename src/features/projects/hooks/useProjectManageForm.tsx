import type { ProjectSelect, ProjectUpdate } from "@/db/schema/projects"

import { ProjectInsertSchema } from "@/db/schema/projects"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type ProjectManageFormArgs = {
  currentProject: ProjectSelect
}

const useProjectManageForm = ({ currentProject }: ProjectManageFormArgs) => {
  const returnValue = useForm<ProjectUpdate>({
    defaultValues: currentProject,
    mode: "onTouched",
    resolver: zodResolver(ProjectInsertSchema),
  })

  return returnValue
}

export { useProjectManageForm }
