import useSWR from "swr";

import fetcher from "@/app/libs/fetcher";

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR("/api/users/current", fetcher);

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useCurrentUser;
