// import Image from 'next/image'
import HeroSection from './home/HeroSection'
import Posts from './home/Posts'
import CalloutSection from './home/CalloutSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className='container'>
        <Posts />
      </div>
      <CalloutSection />
    </>
  )
}

// _app.tsx
// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";

// function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// export default MyApp;
