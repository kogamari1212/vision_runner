import React from "react";
import styles from "./style.module.scss";
import { User } from "@/pages";

type PostProps = {
  content: string;
  createdAt: string;
  author: User;
};

const Post: React.FC<PostProps> = ({ content, createdAt, author }) => {
  return (
    <div className={styles.post}>
      <p>{new Date(createdAt).toLocaleString()}</p>
      <p>{content}</p>
      <p>{author.username}</p>
    </div>
  );
};

export default Post;