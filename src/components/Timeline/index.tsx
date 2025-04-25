import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./style.module.scss";
import Button from "@mui/material/Button";
import apiClient from "@/lib/apiClient";
import { Post } from "@/pages";

type Props = {
  setPosts: Dispatch<SetStateAction<Post[]>>;
};

const TimeLine = ({ setPosts }: Props) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(1111);

    if (!content.trim()) {
      alert("投稿内容を入力してください");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // tokenをチェックし、ない人は投稿できないようにしているのでここで確認する🤗
      if (!token) {
        alert("ログインが必要です");
        return;
      }
      const response = await apiClient.post(
        "/api/post",
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setContent(""); // ✅ 投稿後にフォームをリセット
      alert("投稿が完了しました！");

      // ✅ 投稿後に `posts` の状態を更新
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    }
  };
  return (
    <div className={styles.timeline}>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ここにタスクを入力してください"
        ></textarea>
        <Button
          size="large"
          variant="outlined"
          color="success"
          onClick={handleSubmit}
        >
        送信
      </Button>
      </form>
    </div>
  );
};

export default TimeLine;
