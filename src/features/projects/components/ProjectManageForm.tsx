"use client"

import type { ProjectSelect, ProjectUpdate } from "@/db/schema/projects"
import type { Control } from "react-hook-form"

import { updateProject } from "@/features/projects/action"
import { useProjectManageForm } from "@/features/projects/hooks/useProjectManageForm"
import {
  Button,
  Radio,
  Stack,
  TagsInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Controller, type SubmitHandler, useFormState } from "react-hook-form"

const SubmitButton: React.FC<{ control: Control<ProjectUpdate> }> = ({
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
      企画を編集する
    </Button>
  )
}

type Props = {
  project: ProjectSelect
}

const ProjectManageForm: React.FC<Props> = ({ project }) => {
  const { control, handleSubmit } = useProjectManageForm({
    currentProject: project,
  })

  const onSubmit: SubmitHandler<ProjectUpdate> = async (data) => {
    const { error, success } = await updateProject(data)
    if (success) {
      notifications.show({
        color: "nakuru",
        message: "企画を編集しました。",
        title: "成功",
      })
    } else {
      notifications.show({
        color: "nayuta",
        message: error,
        title: "企画の編集に失敗しました。",
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg">
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
              placeholder="Enterキーかカンマで区切って入力できます。"
              size="md"
              splitChars={[","]}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { disabled, value, ...rest } }) => {
            return (
              <Radio.Group
                description={
                  <Text size="sm" span>
                    企画の状態を選択してください。
                  </Text>
                }
                label={
                  <Text fw="bold" span>
                    企画の状態
                  </Text>
                }
                size="md"
                value={value ?? undefined}
                withAsterisk
                {...rest}
              >
                <Stack mt="xs">
                  <Radio
                    color="nakuru"
                    description={
                      <Text size="sm" span>
                        他のユーザーは寄せ書きを投稿できません。
                        <br />
                        企画一覧に表示されます。
                      </Text>
                    }
                    disabled={disabled || value === "closed"}
                    label={
                      <Text fw="bold" span>
                        準備中
                      </Text>
                    }
                    value="prepare"
                  />
                  <Radio
                    color="nakuru"
                    description={
                      <Text size="sm" span>
                        他のユーザーは寄せ書きを投稿できません。
                        <br />
                        企画一覧に表示されません。
                      </Text>
                    }
                    disabled={disabled || value === "closed"}
                    label={
                      <Text fw="bold" span>
                        受付中
                      </Text>
                    }
                    value="open"
                  />
                  <Radio
                    color="nakuru"
                    description={
                      <Text size="sm" span>
                        他のユーザーは寄せ書きを投稿できません。
                        <br />
                        企画一覧に表示されません。
                      </Text>
                    }
                    disabled={disabled || value === "closed"}
                    label={
                      <Text fw="bold" span>
                        終了
                      </Text>
                    }
                    value="close"
                  />
                </Stack>
              </Radio.Group>
            )
          }}
        />
        <SubmitButton control={control} />
      </Stack>
    </form>
  )
}

export default ProjectManageForm
