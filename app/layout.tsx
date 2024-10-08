// import './globals.css'
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import Header from './layout/Header'
// import Footer from './layout/Footer'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'ByteBlog',
//   description: 'A NextJs Full-Stack Blog Website',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Header />
//         <main>
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   )
// }



import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './layout/Header'
import Footer from './layout/Footer'
import SessionWrapper from '../app/components/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ByteBlog',
  description: 'A NextJs Full-Stack Blog Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body className={inter.className}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />   
      </body>
      </SessionWrapper>
    </html>
  )
}
