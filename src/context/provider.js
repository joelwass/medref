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


/*const CountContext = createContext();

function countReducer(state, action) {
    switch (action.type) {
      case 'INCREMENT': {
        return {count: state.count + 1}
      }
      default: {
        throw new Error(`Unsupported action type: ${action.type}`)
      }
    }
}

const useCount = () => {
      const context = useContext(CountContext);
      if (!context) {
          throw new Error(`useCount must be used within a CountProvider`)
      }

      const [state, dispatch] = context;

      const increment = () => dispatch({type: 'INCREMENT'})
      return {
        state,
        dispatch,
        increment,
      } 
}

const CountProvider = (props) => {
    const [state, dispatch] = React.useReducer(countReducer, {count: 0})

    //const [count, setCount] = React.useState(0);
    //const value = React.useMemo(() => [count, setCount], [count]);
    const value = React.useMemo(() => [state, dispatch], [state]);
    return (<CountContext.Provider value={value} {...props} ></CountContext.Provider>)
}

export {CountProvider, useCount}; */


  