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
import { addUser } from "./api/users";
import { UserType } from "../types";

export type AuthUserType = User | null | undefined

export const login = () => {
  const provider = new TwitterAuthProvider();
  const auth = getAuth(app);
  
  return signInWithPopup(auth, provider).then((cred) => {
    const uid = cred.user.uid
    const name = cred.user.displayName
    console.log(cred)

    if (getAdditionalUserInfo(cred)?.isNewUser) {
      addUser({uid: uid, displayName: name});
    }
  });
};

// テスト
export const test = () => {
  // addUser()
}

export const logout = () => {
  const auth = getAuth(app);
  return auth.signOut();
}

// ログイン状態を監視
export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user , setUser] = useState<AuthUserType>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, loading] = useAuthState(auth)
  useEffect(() => {
    setUser(currentUser)
    setIsLoading(loading)
  })
  return [user, isLoading]
}

// export const AuthProvider = () => {
//   const auth = getAuth(app);
//   const [user, setUser] = useState<UserType>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//   }, []);
//   return user;
// };