import {
  User,
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { app } from "./firebase";
import { addUser, getUser } from "./api/users";

export type AuthUserType = User | null | undefined;

// ログイン処理
export const login = () => {
  const provider = new TwitterAuthProvider();
  const auth = getAuth(app);

  return signInWithPopup(auth, provider).then((cred) => {
    const uid = cred.user.uid;
    const userName = getAdditionalUserInfo(cred)?.username?.toLowerCase();
    const displayName = cred.user.displayName;

    // プロフィール画像のサイズ変更
    const photoURL = cred.user.photoURL
      ? cred.user.photoURL.replace("normal", "200x200")
      : null;

    // 新規ユーザーの場合はDBに登録
    if (getAdditionalUserInfo(cred)?.isNewUser) {
      addUser({
        uid: uid,
        display_name: displayName,
        user_name: userName,
        photo_url: photoURL,
      });
    }
  });
};

// ログアウト処理
export const logout = () => {
  const auth = getAuth(app);
  return auth.signOut();
};

// ログイン状態を監視
export const AuthProvider = () => {
  const auth = getAuth(app);
  const [currentUser, setUser] = useState<AuthUserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setUser(user);
    setIsLoading(loading);
  });
  return [currentUser, isLoading];
};