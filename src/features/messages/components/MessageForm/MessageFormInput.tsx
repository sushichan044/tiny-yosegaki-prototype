"use client"

import type { SubmitHandler } from "react-hook-form"

import FormStack from "@/components/ui/form/FormStack"
import RHFSubmitButton from "@/components/ui/form/RHFSubmitButton"
import { type MessageInsert, MessageInsertSchema } from "@/db/schema/messages"
import { upsertMessage } from "@/features/messages/action"
import { parseTweet } from "@/utils/twitter"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Checkbox,
  RingProgress,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { use } from "react"
import { Controller, useForm } from "react-hook-form"

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

const MessageFormInput: React.FC<Props> = ({ message, projectId, user }) => {
  const currentMessage = use(message)
  const isNewMessage = currentMessage === undefined

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
      <FormStack>
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
        <Select
          comboboxProps={{ size: "sm" }}
          disabled
          label="使用する字体(準備中)"
        />
        <Space h="md" />
        <RHFSubmitButton control={control}>
          メッセージを{isNewMessage ? "投稿" : "編集"}する
        </RHFSubmitButton>
      </FormStack>
    </form>
  )
}

export default MessageFormInput
