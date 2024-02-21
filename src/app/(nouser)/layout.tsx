import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header showUserHeader={false} />
      {children}
      <Footer />
    </>
  )
}
