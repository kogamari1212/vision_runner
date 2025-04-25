import React, { useState } from "react";
import styles from "./style.module.scss";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await apiClient.post("/api/auth/register", {
        username,
        email,
        password,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
      // 2秒後にログインページへ遷移
    } catch (err) {
      console.error("新規登録エラー:", err);
    }
  };

  return (
    <div className={styles.form}>
      <h3 className={styles.form__title}>アカウントを作成</h3>

      <div className={styles.form__item}>
        <label htmlFor="">お名前</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="お名前を入力してください"
        />
      </div>

      <div className={styles.form__item}>
        <label htmlFor="">メールアドレス</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="メールアドレスを入力してください"
        />
      </div>

      <div className={styles.form__item}>
        <label htmlFor="">パスワード</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="パスワードを入力してください"
        />
      </div>

      <button onClick={handleSignUp} className={styles.form__btn}>
        新規登録
      </button>
    </div>
  );
};

export default SignUp;
