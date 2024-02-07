"use client"

import type { UserSelect, UserUpdate } from "@/db/schema/users"
import type { SubmitHandler } from "react-hook-form"

import { updateUserProfile } from "@/features/users/action"
import { useProfileForm } from "@/features/users/setting/useProfileForm"
import { Button, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconX } from "@tabler/icons-react"
import { Controller } from "react-hook-form"

type ProfileFormProps = {
  user: UserSelect
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { control, formState, handleSubmit } = useProfileForm({
    user,
  })

  const onSubmit: SubmitHandler<UserUpdate> = async (data) => {
    const { error } = await updateUserProfile(data)
    if (error) {
      notifications.show({
        color: "nayuta",
        icon: <IconX stroke={1} />,
        message: error,
        title: "ユーザー情報の編集に失敗しました。",
      })
    } else {
      notifications.show({
        color: "nakuru",
        message: "ユーザー情報を編集しました。",
        title: "成功",
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4 md:gap-y-6">
        <Controller
          control={control}
          name="userName"
          render={({ field, fieldState }) => (
            <TextInput
              description="寄せ書きに表示されます"
              error={fieldState.error?.message}
              label="表示名"
              required
              {...field}
            />
          )}
        />
        <Button
          className="w-fit self-center"
          color="nakuru"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
          type="submit"
        >
          保存する
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
