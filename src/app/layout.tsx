import './globals.css'
import SessionProvider from './SessionProvider';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Explore the world of GIFs with GiphyGIFer! Effortlessly search and find the perfect GIF to express yourself in every conversation. Join us in the joy of discovery!" />
        <meta name="keywords" content="GiphyGIFer, GIF, GIF search, animated GIFs, discover GIFs" />
        <meta name="author" content="Mire Patel" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
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