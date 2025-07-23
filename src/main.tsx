import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "./components/ui/provider.tsx";
import {RouterProvider} from "react-router-dom";
import router from "./router/routes.tsx";
import queryClient   from "./lib/queryClient.ts";
import {QueryClientProvider} from "@tanstack/react-query";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router = {router} />
        </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
