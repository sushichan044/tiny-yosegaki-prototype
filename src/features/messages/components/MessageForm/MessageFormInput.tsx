"use client"

import type { Control, SubmitHandler } from "react-hook-form"

import { type MessageInsert, MessageInsertSchema } from "@/db/schema/messages"
import { upsertMessage } from "@/features/messages/action"
import { parseTweet } from "@/utils/twitter"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Checkbox,
  RingProgress,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { use } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"

type Props = {
  message: Promise<
    | {
        content: string
        displayName: string
        hasAttachment: boolean
      }
    | undefined
  >
  projectId: string
  user: {
    userId: string
    userName: string
  }
}

const SubmitButton: React.FC<{ control: Control<MessageInsert> }> = ({
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
      メッセージを投稿する
    </Button>
  )
}

const MessageFormInput: React.FC<Props> = ({ message, projectId, user }) => {
  const currentMessage = use(message)

  const { control, handleSubmit } = useForm<MessageInsert>({
    defaultValues: {
      authorId: user.userId,
      content: currentMessage?.content ?? "",
      displayName: currentMessage?.displayName ?? user.userName,
      hasAttachment: currentMessage?.hasAttachment ?? false,
      projectId: projectId,
    },
    mode: "onTouched",
    resolver: zodResolver(MessageInsertSchema),
  })

  const onSubmit: SubmitHandler<MessageInsert> = async (data) => {
    const { error, success } = await upsertMessage(data, {
      isNew: currentMessage === undefined,
    })
    if (success) {
      notifications.show({
        color: "nakuru",
        message: "メッセージを投稿・編集しました。",
        title: "成功",
      })
    } else {
      notifications.show({
        color: "nayuta",
        message: error,
        title: "メッセージの投稿・編集に失敗しました。",
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4 md:gap-y-6">
        <Controller
          control={control}
          name="displayName"
          render={({ field, fieldState: { error } }) => (
            <TextInput
              description={
                <Text c="gray" size="xs" span>
                  この名前が寄せ書きに表示されます。
                </Text>
              }
              error={error?.message}
              label={
                <Text fw="bold" span>
                  表示名
                </Text>
              }
              size="md"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="content"
          render={({ field, fieldState: { error } }) => {
            const { percent, valid } = parseTweet(field.value)
            const color =
              field.value.length > 1 && !valid
                ? "nayuta"
                : percent >= 90
                  ? "itsuki"
                  : "nakuru"
            return (
              <Textarea
                autosize
                error={error?.message}
                label={
                  <Text fw="bold" span>
                    メッセージ本文
                  </Text>
                }
                minRows={2}
                required
                rightSection={
                  <RingProgress
                    roundCaps
                    sections={[
                      {
                        color: color,
                        value: percent,
                      },
                    ]}
                    size={32}
                    thickness={4}
                  />
                }
                size="md"
                {...field}
              />
            )
          }}
        />
        <Controller
          control={control}
          name="hasAttachment"
          render={({ field: { value, ...rest } }) => (
            <Checkbox
              checked={value}
              disabled
              label="画像の添付(準備中)"
              {...rest}
            />
          )}
        />
        <SubmitButton control={control} />
      </div>
    </form>
  )
}

export default MessageFormInput
