"use client"

import type { UserInsert, UserSelect } from "@/db/schema/users"
import type { SubmitHandler } from "react-hook-form"

import RHFSubmitButton from "@/components/ui/form/RHFSubmitButton"
import { updateUserProfile } from "@/features/users/action"
import { useProfileForm } from "@/features/users/setting/useProfileForm"
import { Switch, Text, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconX } from "@tabler/icons-react"
import { Controller } from "react-hook-form"

type ProfileFormProps = {
  user: UserSelect
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { control, handleSubmit } = useProfileForm({ user })

  const onSubmit: SubmitHandler<UserInsert> = async (data) => {
    const { error } = await updateUserProfile({
      showTwitterOnProfile: data.showTwitterOnProfile,
      userId: user.userId,
      userName: data.userName,
    })
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
          render={({ field, fieldState: { error } }) => (
            <TextInput
              data-1p-ignore
              description={
                <Text size="sm" span>
                  この名前は寄せ書きでデフォルトの表示名として使用されます。
                </Text>
              }
              error={error?.message}
              label={
                <Text fw="bold" span>
                  表示名
                </Text>
              }
              required
              size="md"
              type="text"
              {...field}
            />
          )}
          rules={{
            required: true,
          }}
        />
        <Controller
          control={control}
          name="showTwitterOnProfile"
          render={({ field: { value, ...rest } }) => (
            <Switch
              checked={value === null ? undefined : value}
              color="nakuru"
              description={
                <Text size="sm" span>
                  連携されたアカウント: @{user.twitterId}
                </Text>
              }
              label={
                <Text fw="bold" span>
                  X(旧Twitter)アカウントをプロフィールに表示する
                </Text>
              }
              labelPosition="left"
              size="md"
              {...rest}
            />
          )}
        />
        <RHFSubmitButton control={control}>保存する</RHFSubmitButton>
      </div>
    </form>
  )
}

export default ProfileForm
