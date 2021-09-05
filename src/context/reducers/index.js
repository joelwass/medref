import { ENABLE_SCREEN_UPDATE, GET_SETTINGS, SET_SETTINGS, SETTING_UPDATE_FAIL } from '../../constants/actiontypes/index'

const settings = (state, { type, payload }) => {
  console.log('do we ever get here')
  switch (type) {
    case SET_SETTINGS:
      console.log('in here')
      const ret = {
        ...state,
        appSettingsUpdate: payload.appSettingsUpdate,
        settingIds: payload.settingIds,
        itemArray: payload.itemArray
      }
      console.log('here2', ret.itemArray)
      return ret
    case SETTING_UPDATE_FAIL:
      return {
        ...state,
        error: payload.error
      }
    default:
      return state
  }
}

export default settings
