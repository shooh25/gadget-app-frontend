import {
  User,
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { app } from "./firebase";

export type UserType = User | null | undefined

export const login = () => {
  const provider = new TwitterAuthProvider();
  const auth = getAuth(app);
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  const auth = getAuth(app);
  return auth.signOut();
}

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user , setUser] = useState<UserType>(null)
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