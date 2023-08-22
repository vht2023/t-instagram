import useSWR from "swr";

import fetcher from "@/app/libs/fetcher";

const useUser = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `/api/users/${id}` : null,
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        mutate
    };
};

export default useUser;
