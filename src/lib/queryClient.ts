import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => {
                console.error("Mutation error: ", error.message);
            }
        },
    },
});
export default queryClient;