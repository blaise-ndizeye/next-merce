import { createContext, useReducer } from "react"
import Cookies from "js-cookie"

export const Store = createContext()

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE_ON":
      return {
        ...state,
        darkMode: true,
      }
    case "DARK_MODE_OFF":
      return {
        ...state,
        darkMode: false,
      }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
