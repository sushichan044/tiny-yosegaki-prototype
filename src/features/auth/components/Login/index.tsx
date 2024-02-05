import EmailButton from "@/features/auth/components/Login/EmailButton"
import TwitterButton from "@/features/auth/components/Login/TwitterButton"
import { Alert } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    wrapper:
      "flex flex-col flex-nowrap gap-y-8 justify-center max-w-80 mx-auto",
  },
})()

export default function Login() {
  return (
    <div className={styles.wrapper()}>
      <TwitterButton redirectTo="/" />
      <EmailButton />
      <Alert
        color="nayuta"
        icon={<IconAlertTriangle />}
        title="Twitterでログインする際の注意"
        variant="light"
      >
        Twitterアカウントでログインするには
        <b>メールアドレスが登録されている</b>必要があります。
        <br />
        ログインに失敗する場合は、Twitterアカウントにメールアドレスが登録されいるか今一度ご確認ください。
      </Alert>
    </div>
  )
}
