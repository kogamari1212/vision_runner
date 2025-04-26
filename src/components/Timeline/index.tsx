import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Button from "@mui/material/Button";
import apiClient from "@/lib/apiClient";

type Future = {
  id: number;
  content: string;
  createdAt: string;
};

type Post = {
  id: number;
  content: string;
  createdAt: string;
};

const TimeLine = () => {
  const [content, setContent] = useState("");
  const [mode, setMode] = useState<"task" | "vision">("task");
  const [futures, setFutures] = useState<Future[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchFutures();
    fetchPosts();
  }, []);

  const fetchFutures = async () => {
    try {
      const response = await apiClient.get("/api/futures");
      setFutures(response.data);
    } catch (error) {
      console.error("タスク取得失敗:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("ビジョン取得失敗:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("投稿内容を入力してください");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("ログインが必要です");
        return;
      }

      const endpoint = mode === "task" ? "/api/future" : "/api/post";
      const response = await apiClient.post(
        endpoint,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (mode === "task") {
        setFutures((prev) => [response.data, ...prev]);
      } else {
        setPosts((prev) => [response.data, ...prev]);
      }

      setContent("");
      alert(`${mode === "task" ? "タスク" : "ビジョン"}を投稿しました！`);
    } catch (error) {
      console.error("投稿失敗:", error);
      alert("投稿に失敗しました");
    }
  };

  const handleEditFuture = async (id: number) => {
    const newContent = prompt("新しいタスク内容を入力してください");
    if (!newContent) return;
    await apiClient.put(`/api/future/${id}`, { content: newContent });
    fetchFutures();
  };

  const handleDeleteFuture = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;
    await apiClient.delete(`/api/future/${id}`);
    fetchFutures();
  };

  const handleEditPost = async (id: number) => {
    const newContent = prompt("新しいビジョン内容を入力してください");
    if (!newContent) return;
    await apiClient.put(`/api/post/${id}`, { content: newContent });
    fetchPosts();
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;
    await apiClient.delete(`/api/post/${id}`);
    fetchPosts();
  };

  return (
    <div className={styles.timeline}>
      {/* モード切替 */}
      <div className="mode-switch" style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <Button
          variant={mode === "task" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setMode("task")}
        >
          タスク投稿
        </Button>
        <Button
          variant={mode === "vision" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setMode("vision")}
        >
          ビジョン投稿
        </Button>
      </div>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            mode === "task"
              ? "未来にやりたいタスクを入力してください"
              : "未来の自分のビジョンを入力してください"
          }
        />
        <Button
          size="large"
          variant="contained"
          color="success"
          type="submit"
          style={{ marginTop: "1rem" }}
        >
          {mode === "task" ? "タスク送信" : "ビジョン送信"}
        </Button>
      </form>

      {/* 表示リスト */}
      <h2 style={{ marginTop: "2rem" }}>
        {mode === "task" ? "タスクリスト" : "ビジョンリスト"}
      </h2>
      <ul>
        {(mode === "task" ? futures : posts).map((item) => (
          <li key={item.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <div>
              {item.content}（{new Date(item.createdAt).toLocaleString()}）
            </div>
            <div style={{ marginTop: "5px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  mode === "task"
                    ? handleEditFuture(item.id)
                    : handleEditPost(item.id)
                }
                style={{ marginRight: "0.5rem" }}
              >
                編集
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() =>
                  mode === "task"
                    ? handleDeleteFuture(item.id)
                    : handleDeletePost(item.id)
                }
              >
                削除
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;
