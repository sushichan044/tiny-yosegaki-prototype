import { Stack } from "@mantine/core"

type Props = {
  children: React.ReactNode
}

const FormStack: React.FC<Props> = ({ children }) => {
  return <Stack gap="md">{children}</Stack>
}

export default FormStack
