import AsyncStorage from '@react-native-community/async-storage';

export const storeData=async(value)=>{
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@login_data', jsonValue)
    } catch (e) {
      // saving error
    }
}

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

export const clearData = async () => {
    try {
      const jsonValue = await AsyncStorage.clear()
      return "cleared"
    } catch(e) {
      // error reading value
    }
  }