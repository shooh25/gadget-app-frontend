// DBに登録するユーザー
export type UserType = {
  uid: string;
  display_name: string | null;
  user_name: string | null | undefined;
  photo_url: string | null;

  computer: object;
};

// デバイス
export type DeviceType = {
  cpu_name: string;
  created_at: string;
  gpu_name: string;
  id: string;
  updated_at: string;
  user_id: string;
};

// export type DeviceType = {
//   computer: {
//     cpu_name: string;
//     created_at: string;
//     gpu_name: string;
//     id: string;
//     updated_at: string;
//     user_id: string;
//   }
// };
