import type { UserSelect, UserUpdate } from "@/db/schema/users"

import { UserUpdateSchema } from "@/db/schema/users"
import { zodResolver } from "@hookform/resolvers/zod"
import "client-only"
import { useForm } from "react-hook-form"

type UserProfileFormArgs = {
  user: UserSelect
}

const useProfileForm = (args: UserProfileFormArgs) => {
  const returnValue = useForm<UserUpdate>({
    defaultValues: args.user,
    mode: "onTouched",
    resolver: zodResolver(UserUpdateSchema),
  })

  return returnValue
}

export { useProfileForm }
