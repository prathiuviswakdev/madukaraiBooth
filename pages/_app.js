import { useState, createContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/Layout";
import "../styles/globals.css";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));
  
  const [INPUT, setINPUT] = useState("");
  
  // Initialize with the default input when component mounts (client-side)
  useEffect(() => {
    setINPUT(process.env.NEXT_PUBLIC_DEFAULT_INPUT || "குருசாமி");
  }, []);

  // Get the page title if it was set
  const getLayout = Component.getLayout || ((page) => page);
  const pageTitle = Component.pageTitle || "Voter Booth Application";

  return (
    <AppContext.Provider value={{ INPUT, setINPUT }}>
      <QueryClientProvider client={queryClient}>
        <Layout title={pageTitle}>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default MyApp; 