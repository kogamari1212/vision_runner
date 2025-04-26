import React from "react";
import styles from "./style.module.scss";
import { User } from "@/types/user";

type PostProps = {
  id?: number;
  content: string;
  createdAt: string;
  author?: User;
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const Post: React.FC<PostProps> = ({ id, content, createdAt, author, onUpdate, onDelete }) => {
  return (
    <div className={styles.post}>
      <p>{new Date(createdAt).toLocaleString()}</p>
      <p>{content}</p>
      <p>{author?.username ?? "未来の自分"}</p>

      {/* ★編集・削除ボタンを追加 */}
      {id && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => onUpdate?.(id)} style={{ marginRight: "1rem" }}>
            編集
          </button>
          <button onClick={() => onDelete?.(id)}>
            削除
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
