export const metadata = {
  title: 'Halve',
  description: 'Split and track expenses among friends & family',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
