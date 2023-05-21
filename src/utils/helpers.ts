// labelsに基づいて表示するデータを作成
export const createDisplayData = (labels: any, data: any) => {
  delete data["id"];
  delete data["created_at"];
  delete data["updated_at"];
  delete data["user_id"];

  for (let key in data) {
    const text = data[key]
    if (text) {
      data[key] = { label: labels[key], text: text }
    } else {
      data[key] = { label: labels[key], text: '' }
    }
  }

  return data;
};
