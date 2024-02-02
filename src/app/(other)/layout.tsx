import Header from "@/components/layouts/Header"

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-gray-200 min-h-screen">
      <Header />
      {children}
      <footer>footer</footer>
    </main>
  )
}
