/* eslint-disable react/jsx-filename-extension */
import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import DataService from '../service/services';

export const SoftUI = createContext(null);

// Setting custom name for the context which is visible on react dev tools
SoftUI.displayName = "MainContext";

// Soft UI Dashboard React reducer
function reducer(state, action) {
  // console.log("reducer", action);
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "LIST_BILLING_SUCCESS": {
      // console.log("action.value", action.value);
      return {
        ...state, listBilling: {
          loading: false,
          data: action.value,
          error: null,
        }
      };
    }
    case "LIST_BILLING_LOAD": {
      return {
        ...state, listBilling: {
          loading: true,
          data: [],
          error: null
        }
      };
    }
    case "LIST_BILLING_FAIL": {
      return {
        ...state, listBilling: {
          loading: true,
          data: action.value,
          error: action.value
        }
      };
    }
    case "LOAD_CM": {
      return { ...state, listCM: action.value };
    }
    case "LOAD_ACTCLIENT": {
      return { ...state, listActClient: action.value };
    }
    case "CURRENT_CL_NOTE": {
      return { ...state, currentClToNote: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Soft UI Dashboard React context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    listBilling: [],
    listCM: [],
    listActClient: [],
    currentClToNote: {},
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <SoftUI.Provider value={value}>{children}</SoftUI.Provider>;
}

// Soft UI Dashboard React custom hook for using context
function useSoftUIController() {
  const context = useContext(SoftUI);

  if (!context) {
    throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
  }

  return context;
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setLoadListCm = (dispatch, value) => dispatch({ type: "LOAD_CM", value });
const setLoadActiClient = (dispatch, value) => dispatch({ type: "LOAD_ACTCLIENT", value });
const setCurrentClToNote = (dispatch, value) => dispatch({ type: "CURRENT_CL_NOTE", value });

const setListBilling = (dispatch, value) => dispatch({ type: "LIST_BILLING_SUCCESS", value });

export {
  SoftUIControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setListBilling,
  setLoadListCm,
  setLoadActiClient,
  setCurrentClToNote
};


