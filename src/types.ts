// DBに登録するユーザー
export type UserType = {
  uid: string;
  display_name: string | null;
  user_name: string | null | undefined;
  photo_url: string | null;

  computer: any;
};

// ガジェット
export type gadgetType = {
  [key: string]: any
}