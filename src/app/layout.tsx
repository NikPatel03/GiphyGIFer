import './globals.css'
import SessionProvider from './SessionProvider';
// copywrite
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>GiphyGIFer</title>
      </head>
      <body className="h-full bg-no-repeat bg-cover bg-slate-950">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}