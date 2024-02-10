import type { UserInsert } from "@/db/schema/users"

import { UserInsertSchema } from "@/db/schema/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type UserProfileFormArgs = {
  user: UserInsert
}

const useProfileForm = ({ user }: UserProfileFormArgs) => {
  const returnValue = useForm<UserInsert>({
    defaultValues: user,
    mode: "onTouched",
    resolver: zodResolver(UserInsertSchema),
  })

  return returnValue
}

export { useProfileForm }
