import '@/styles/globals.css'
import {ChainId,ThirdwebProvider} from '@thirdweb-dev/react';
import {Toaster} from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <Component {...pageProps} />
      <Toaster/>
    </ThirdwebProvider>
  )}
