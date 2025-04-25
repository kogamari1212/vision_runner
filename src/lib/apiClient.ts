import axios from "axios";

const apiClient = axios.create({
  // ポイント！NEXT_PUBLIC_API_BASEURLは最後にvercel側で設定します🤗
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL || "http://localhost:8888/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;