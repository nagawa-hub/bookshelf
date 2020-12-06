// 拡張子を取得するメソッド .で区切って一番最後を返す
export const getExtension = (path: string) => {
  return path.split(".").pop();
}