import {SET_SETTINGS,SETTING_UPDATE_FAIL} from '../../../constants/actiontypes';
import DataUtils from "../../../Components/Helper/DataUtils";

export default () =>dispatch=> {

    //dispatch({
    //    type:ITEMS_LOADING,
    //});
    
    DataUtils.getItemArray()
             .then( (res) => {
                dispatch({
                    type:SET_SETTINGS,
                    payload : {
                        appSettingsUpdate : false,
                        itemArray  : res,
                    }
                });
             })
             .catch( (err) =>{
                dispatch({
                    type:SETTING_UPDATE_FAIL,
                    payload: 
                        err.response 
                        ?  err.response.data 
                        : {error : "Something went wrong"}
                 });
             })
}    

