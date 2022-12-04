import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../gqlClient'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Provider } from '../context'

import Nav from '../components/Nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
    <UserProvider>
    <ApolloProvider client={client}>
    <Nav />
    <Component {...pageProps} />
    </ApolloProvider>
    </UserProvider>
    </Provider>
  )
}

export default MyApp
