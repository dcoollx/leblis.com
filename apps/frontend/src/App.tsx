import { QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { queryClient } from "./util/queryClient";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <head>
        <title>Leblis ~ treat your skin</title>
      </head>
       <Home />
    </QueryClientProvider>
  );
}