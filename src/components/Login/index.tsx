import React, { useState } from "react";
import styles from "./style.module.scss";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });
      // JWT トークンを localStorage に保存
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token, "response.data.token");
      // ログイン成功後、/ページに移動させる🤗
      router.push("/");
    } catch (err) {
      console.log(err);
      alert("入力内容が正しくないため、ログインできません");
    }
  };

  return (
    <div className={styles.form}>
      <h3 className={styles.form__title}>ログイン</h3>

      <div className={styles.form__item}>
        <label htmlFor="">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
      </div>

      <div className={styles.form__item}>
        <label htmlFor="">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
      </div>

      <button onClick={handleLogin} className={styles.form__btn}>
        ログイン
      </button>
    </div>
  );
};

export default Login;