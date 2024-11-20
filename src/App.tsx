import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/Entrypoint";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex h-screen items-center justify-center py-20 sm:px-4">
        <Entrypoint />
      </main>
    </QueryClientProvider>
  );
}
