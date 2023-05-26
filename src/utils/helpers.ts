// labelsに基づいて表示するデータを作成
export const createDisplayData = (labels: any, data: any, filter: boolean) => {
  delete data["id"];
  delete data["created_at"];
  delete data["updated_at"];
  delete data["user_id"];

  let checkNull = false;

  for (let key in data) {
    const text = data[key];
    if (text && text !== "") {
      checkNull = true;
      data[key] = { label: labels[key], text: text };
    } else {
      if (!filter) {
        checkNull = true;
        data[key] = { label: labels[key], text: "" };
      } else {
        data[key] = null;
      }
    }
  }

  return checkNull ? data : null;
};
