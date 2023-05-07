import client from "./client";
import { UserType } from '../../types'

// ユーザー一覧取得
export const getUsers = () => {
  return client.get('/users')
}

// ユーザー追加
export const addUser = (user: UserType) => {
  return client.post('/users', user)
}