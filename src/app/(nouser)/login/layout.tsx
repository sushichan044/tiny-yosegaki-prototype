export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="flex-1 bg-nakuru-50">{children}</main>
}
