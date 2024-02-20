"use client"

import { Button } from "@mantine/core"
import { type Control, type FieldValues, useFormState } from "react-hook-form"

type Props<T extends FieldValues> = {
  children: React.ReactNode
  control: Control<T>
}

export default function RHFSubmitButton<T extends FieldValues>({
  children,
  control,
}: Props<T>) {
  const { isSubmitting, isValid } = useFormState({ control })
  return (
    <Button
      className="w-fit self-center"
      color="nakuru"
      disabled={!isValid}
      loading={isSubmitting}
      type="submit"
    >
      {children}
    </Button>
  )
}
