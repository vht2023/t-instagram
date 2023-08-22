import useSWR from "swr";

import fetcher from "@/app/libs/fetcher";

const useFeedPosts = () => {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/posts",
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useFeedPosts;
