import React , {createContext, useEffect, useReducer} from 'react';
import appSettingsInitialState from './initialStates/appSettingsInitialState';
import settings from '../context/reducers/index';
import setInitialContext from './actions/Settings/initialize';
import update from './actions/Settings/update';
import DataUtils from '../Components/Helper/DataUtils';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  
    const[settingsState, settingDispatch] = useReducer( settings, appSettingsInitialState);

    useEffect( () =>{
       setInitialContext()(settingDispatch);
    },[])

    return (
    
        <GlobalContext.Provider
         value={{settingsState,settingDispatch}}
        >{children}
        </GlobalContext.Provider>
    
    );
};
export default GlobalProvider;
