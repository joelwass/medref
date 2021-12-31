import { SET_SETTINGS, SETTING_UPDATE_FAIL } from '../../../constants/actiontypes'
import DataUtils from '../../../Components/Helper/DataUtils'

export default (ids) => dispatch => {
  try {
    const arrTemp = DataUtils.computeData(ids)
    if (arrTemp) {
      dispatch({
        type: SET_SETTINGS,
        payload: {
          appSettingsUpdate: true,
          itemArray: arrTemp
        }
      })
    }
  } catch (err) {
    console.error(err)
  }
}
