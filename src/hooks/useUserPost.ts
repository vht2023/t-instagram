import useSWR from "swr";

import fetcher from "@/app/libs/fetcher";

const useUserPost = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `/api/posts/userPost/${id}` : null,
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useUserPost;
