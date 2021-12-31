import { ENABLE_SCREEN_UPDATE, GET_SETTINGS, SET_SETTINGS, SETTING_UPDATE_FAIL } from '../../constants/actiontypes/index'

const settings = (state, { type, payload }) => {
  switch (type) {
    case SET_SETTINGS:
      const ret = {
        ...state,
        appSettingsUpdate: payload.appSettingsUpdate,
        settingIds: payload.settingIds,
        itemArray: payload.itemArray
      }
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
