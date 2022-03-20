import data from '../../data/data.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

const pointArr = [
  { id: 1, q: 1.2, r: -1, s: 1 },
  { id: 2, q: 1.2, r: 0, s: 0 },
  { id: 3, q: 2.2, r: -1, s: -1 },
  { id: 4, q: 2.8, r: 1, s: 1 },
  { id: 5, q: 2.8, r: 0, s: 0 },
  { id: 6, q: 1.8, r: 1, s: -1 },
  { id: 7, q: 1.2, r: 3.5, s: 1 },
  { id: 8, q: 1.2, r: 2.5, s: 0 },
  { id: 9, q: 2.2, r: 2.5, s: 1 }
]

class DataUtils {
  static items () {
    const array = []
    data.map((obj) => {
      const ob = {}
      ob.id = obj.id,
      ob.name = obj.name
      if (obj.multiple_lines) { ob.name = `${obj.name}  ${obj.name1}  ${obj.name2}` }
      array.push(ob)
    })
    return array
  }

  static defaultItems () {
    const array = []
    data.map((obj) => {
      if (obj.selected) {
        const ob = {}
        ob.id = obj.id,
        ob.name = obj.name
        array.push(ob)
      }
    })
    return array
  }

  static getDefaultItems () {
    const arr = []
    data.map((obj) => {
      if (obj.selected) { arr.push(obj.id) }
    })

    return arr
  }

  static async getUserSelectedItems () {
    try {
      const jsonValue = await AsyncStorage.getItem('@bama_storage_Key')
      const temp = jsonValue != null ? JSON.parse(jsonValue) : null
      if (temp != null) {
        console.log() // check if the data is corrupted that is pinned since we have diff ids now?
      }
      return temp
    } catch (e) {
      console.error(e)
    }
  }

  static async setUserSelectedItems (values) {
    try {
      await AsyncStorage.setItem('@bama_storage_Key', JSON.stringify(values))
      return values
    } catch (e) {
      console.error(e)
    }
  }

  static async getItemArray () {
    let resultArray = []

    let tempArr = []

    const result = await this.getUserSelectedItems()
    if (result) {
      resultArray = this.computeData(result)
    } else {
      tempArr = this.getDefaultItems()
      resultArray = this.computeData(tempArr)
    }

    return resultArray
  }

  static computeData (SettingIds) {
    try {
      const itemArrTemp = []
      const ptArr = []
      let count = 1
      data.map((obj) => {
        if (SettingIds != null && SettingIds.includes(obj.id) === true && count <= 9) {
          let ptObj = {}
          ptObj = pointArr.find(pos => pos.id === count)
          if (count <= 9) {
            const ob = {}
            ob.id = obj.id,
            ob.pointId = count,
            ob.name = obj.name,
            ob.name1 = obj.name1,
            ob.name2 = obj.name2,
            ob.multiple_lines = obj.multiple_lines,
            ob.hexvalue = obj.hexvalue,
            ob.selected = obj.selected,
            ob.q = ptObj.q,
            ob.r = ptObj.r,
            ob.s = ptObj.s
            itemArrTemp.push(
              ob
            )
          }
          count++
        }
      })
      if (count === 9) {
        // Enter the last element "More"
        const lastObj = data.find(item => item.default === true)
        let ptObj = {}
        ptObj = pointArr.find(pos => pos.id === count)
        const ob = {}
        ob.id = lastObj.id,
        ob.pointId = count,
        ob.name = lastObj.name,
        ob.name1 = lastObj.name1,
        ob.name2 = lastObj.name2,
        ob.multiple_lines = lastObj.multiple_lines,
        ob.hexvalue = lastObj.hexvalue,
        ob.selected = lastObj.selected,
        ob.q = ptObj.q,
        ob.r = ptObj.r,
        ob.s = ptObj.s
        itemArrTemp.push(
          ob
        )
      }
      return itemArrTemp
    } catch (e) {
      console.error(e)
    }
  }
}
export default DataUtils
