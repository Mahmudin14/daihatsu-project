// import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return(
    <>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    </>
  )
  
}

export default MyApp;