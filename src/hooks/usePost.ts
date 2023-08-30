import useSWR from "swr";

import fetcher from "@/app/libs/fetcher";

const usePost = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `/api/posts/${id}` : null,
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default usePost;
