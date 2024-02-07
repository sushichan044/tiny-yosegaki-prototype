"use client"

import type { UserSelect, UserUpdate } from "@/db/schema/users"
import type { Control, SubmitHandler } from "react-hook-form"

import { updateUserProfile } from "@/features/users/action"
import { useProfileForm } from "@/features/users/setting/useProfileForm"
import { Button, Switch, Text, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconX } from "@tabler/icons-react"
import { useCallback } from "react"
import { Controller, useFormState } from "react-hook-form"

const SubmitButton: React.FC<{ control: Control<UserUpdate> }> = ({
  control,
}) => {
  const { isSubmitting, isValid } = useFormState({ control })
  return (
    <Button
      className="w-fit self-center"
      color="nakuru"
      disabled={!isValid}
      loading={isSubmitting}
      type="submit"
    >
      保存する
    </Button>
  )
}

type ProfileFormProps = {
  user: UserSelect
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { control, handleSubmit } = useProfileForm({ user })
  const onSubmit: SubmitHandler<UserUpdate> = useCallback(
    async (data) => {
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
    },
    [user.userId],
  )

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
                  この名前は寄せ書きに表示されます。
                </Text>
              }
              error={error?.message}
              label={
                <Text fw="bold" span>
                  表示名
                </Text>
              }
              required
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
                  連携されたTwitterアカウント: @{user.twitterId}
                </Text>
              }
              label={
                <Text fw="bold" span>
                  Twitterアカウントをプロフィールに表示する
                </Text>
              }
              labelPosition="left"
              size="md"
              {...rest}
            />
          )}
        />
        <SubmitButton control={control} />
      </div>
    </form>
  )
}

export default ProfileForm
