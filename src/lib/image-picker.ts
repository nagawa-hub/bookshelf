import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const getCameraRollPermission = async() => {
  // iosの時だけ実行 
  if(Constants.platform.ios){
    // cameraロールのpermissionの確認ダイアログが出現
    const { status } = await ImagePicker.getCameraRollPermissionsAsync();
    // permissionが許可されていない時
    if( status !== "granted"){
      alert("画像を選択するにはカメラロールの許可が必要です")
    }
  }
}

export const pickImage = async() => {
  // パーミッションを取得 
  await getCameraRollPermission();
  // ImagePickerを起動 
  const result = await ImagePicker.launchImageLibraryAsync({
    // オプションを指定 イメージのみ
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // 編集を許可しない 
    allowsEditing: false
  })
  // キャンセルされなかった場合 画像のuriを返す
  if(!result.cancelled){
    return result.uri
  }
}