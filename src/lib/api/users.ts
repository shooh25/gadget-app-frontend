import client from "./client";
import { UserType } from '../../types'

// ユーザー一覧取得
export const getUsers = () => {
  return client.get('/users')
}

// ユーザー追加 (ログイン時)
export const addUser = (user: UserType) => {
  return client.post('/users', user)
}

// userNameで個別のユーザー取得
export const getUserByName = (userName: string) => {
  return client.get(`users?user_name=${userName}`)
}

// uidで個別のユーザー取得
export const getUserByUid = (uid: string) => {
  return client.get(`users?uid=${uid}`)
}