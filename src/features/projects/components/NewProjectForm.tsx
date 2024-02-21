"use client"

import type { ProjectInsert } from "@/db/schema/projects"
import type { UserSelect } from "@/db/schema/users"

import FormStack from "@/components/ui/form/FormStack"
import RHFSubmitButton from "@/components/ui/form/RHFSubmitButton"
import { createNewProject } from "@/features/projects/action"
import { useNewProjectForm } from "@/features/projects/hooks/useNewProjectForm"
import { Checkbox, TagsInput, Text, TextInput, Textarea } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Controller, type SubmitHandler } from "react-hook-form"

type NewProjectFormProps = {
  isDisabledFeature?: boolean
  user: UserSelect
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
  isDisabledFeature,
  user,
}) => {
  const { control, handleSubmit } = useNewProjectForm({ authorId: user.userId })
  const onSubmit: SubmitHandler<ProjectInsert> = async (data) => {
    const { error, success } = await createNewProject(data)
    if (success) {
      notifications.show({
        color: "nakuru",
        message: "企画を作成しました。",
        title: "成功",
      })
    } else {
      notifications.show({
        color: "nayuta",
        message: error,
        title: "企画の作成に失敗しました。",
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormStack>
        <Controller
          control={control}
          disabled={isDisabledFeature}
          name="projectName"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              error={error?.message}
              label={
                <Text fw="bold" span>
                  企画の名前
                </Text>
              }
              required
              size="md"
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          disabled={isDisabledFeature}
          name="projectDescription"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              autosize
              error={error?.message}
              label={
                <Text fw="bold" span>
                  企画の説明
                </Text>
              }
              minRows={2}
              required
              size="md"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          disabled={isDisabledFeature}
          name="tags"
          render={({ field, fieldState: { error } }) => (
            <TagsInput
              description={
                <Text size="sm" span>
                  タグを追加することで他のユーザーが企画を見つけやすくなります。
                </Text>
              }
              error={error?.message}
              label={
                <Text fw="bold" span>
                  タグ
                </Text>
              }
              placeholder="カンマで区切って入力できます。"
              size="md"
              splitChars={[","]}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          disabled={isDisabledFeature}
          name="status"
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Checkbox
              checked={value === "open"}
              color="nakuru"
              description={
                <Text size="sm" span>
                  すぐに他のユーザーが寄せ書きを送れるようになります。
                </Text>
              }
              error={error?.message}
              label={<Text span>企画をすぐに受付中にする</Text>}
              onChange={(event) => {
                onChange(event.target.checked ? "open" : "prepare")
              }}
              size="md"
              {...rest}
            />
          )}
        />
        <RHFSubmitButton control={control}>企画を立てる</RHFSubmitButton>
      </FormStack>
    </form>
  )
}

export default NewProjectForm
