"use client"

import type { ProjectInsert } from "@/db/schema/projects"
import type { UserSelect } from "@/db/schema/users"
import type { Control } from "react-hook-form"

import { createNewProject } from "@/features/projects/action"
import { useNewProjectForm } from "@/features/projects/hooks/useNewProjectForm"
import {
  Button,
  Checkbox,
  TagsInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Controller, type SubmitHandler, useFormState } from "react-hook-form"

type NewProjectFormProps = {
  user: UserSelect
}

const SubmitButton: React.FC<{ control: Control<ProjectInsert> }> = ({
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
      企画を立てる
    </Button>
  )
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ user }) => {
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
      <div className="flex flex-col gap-y-4 md:gap-y-6">
        <Controller
          control={control}
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
        <SubmitButton control={control} />
      </div>
    </form>
  )
}

export default NewProjectForm
