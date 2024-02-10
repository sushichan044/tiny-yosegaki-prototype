import type { ProjectInsert } from "@/db/schema/projects"

import { ProjectInsertSchema } from "@/db/schema/projects"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type NewProjectFormArgs = {
  authorId: string
}

const useNewProjectForm = ({ authorId }: NewProjectFormArgs) => {
  const returnValue = useForm<ProjectInsert>({
    defaultValues: {
      authorId: authorId,
      projectDescription: "",
      projectName: "",
      status: "prepare",
      tags: [],
    },
    mode: "onTouched",
    resolver: zodResolver(ProjectInsertSchema),
  })

  return returnValue
}

export { useNewProjectForm }
