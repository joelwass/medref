import {SET_SETTINGS,SETTING_UPDATE_FAIL} from '../../../constants/actiontypes';
import DataUtils from "../../../Components/Helper/DataUtils";

export default (ids) =>dispatch=> {

    //dispatch({
    //    type:ITEMS_LOADING,
    //});
    //console.log(ids);
    try{
        const arrTemp = DataUtils.computeData(ids);
        if(arrTemp)
        {
            dispatch({
                type:SET_SETTINGS,
                payload : {
                    appSettingsUpdate : true,
                    itemArray  : arrTemp,
                }
            });
        }
    }
    catch(err){
        console.log(err);
        /*dispatch({
            type:SETTING_UPDATE_FAIL,
            payload: 
                err.response 
                ?  err.response.data 
                : {error : "Something went wrong"}
         });*/
    }
} 