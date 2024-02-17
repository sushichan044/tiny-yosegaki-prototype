import EmailButton from "@/features/auth/components/SignIn/EmailButton"
import TwitterButton from "@/features/auth/components/SignIn/TwitterButton"
import { Alert } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    wrapper:
      "flex flex-col flex-nowrap gap-y-6 justify-center max-w-80 mx-auto",
  },
})()

type Props = {
  redirectTo?: string | undefined
}

export default function SignIn({ redirectTo }: Props) {
  redirectTo ??= "/"

  return (
    <div className={styles.wrapper()}>
      <TwitterButton redirectTo={redirectTo} />
      <EmailButton />
      <Alert
        color="nayuta"
        icon={<IconAlertTriangle />}
        title="X(旧Twitter)でログインする際の注意"
        variant="light"
      >
        Xアカウントでログインするには
        <b>メールアドレスが登録されている</b>必要があります。
        <br />
        ログインに失敗する場合は、Xアカウントにメールアドレスが登録されいるか今一度ご確認ください。
      </Alert>
    </div>
  )
}
