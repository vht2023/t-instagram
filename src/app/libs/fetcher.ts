import axios from "axios";

const fetcher = (url: string) =>
    axios
        .get(url, {
            headers: {
                "Cache-Control": "no-cache",
            },
        })
        .then((res) => res.data);

export default fetcher;
