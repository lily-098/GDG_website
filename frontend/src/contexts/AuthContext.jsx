import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const Authcontext = createContext();

const getToken = () => localStorage.getItem("token");
const getFileUrl = () => JSON.parse(localStorage.getItem("fileUrl")) || [];

const initialState = {
  user: null,
  isAuthenticated: !!getToken(),
  loading: true,
  error: null,
  value: "",
  fileUrl: getFileUrl(),
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "loading":
      return { ...state, loading: action.payload ?? true, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "setUser":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "search":
      return { ...state, value: action.payload };
    case "fileUrlvalue":
      return { ...state, fileUrl: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export default function AuthProvider({ children }) {
  const API_BASE_URL = "https://gdg-website-2025-oghz.vercel.app/";

  const [{ user, isAuthenticated, loading, error, value, fileUrl }, dispatch] =
    useReducer(reducer, initialState);

  const fetchUserProfile = async () => {
    try {
      dispatch({ type: "loading" });
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`${API_BASE_URL}api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: "setUser", payload: response.data });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      dispatch({
        type: "error",
        payload: err.response?.data?.error || "Failed to fetch user profile",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      dispatch({ type: "loading", payload: false });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("fileUrl", JSON.stringify(fileUrl));
  }, [fileUrl]);

  const login = () => dispatch({ type: "login" });
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  };
  const search = (value) => dispatch({ type: "search", payload: value });

  // FIXED: Append the new URL string correctly to the array
  const url = (newUrl) => {
    dispatch({ type: "fileUrlvalue", payload: [...fileUrl, newUrl] });
  };

  return (
    <Authcontext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        value,
        login,
        logout,
        search,
        url,
        fileUrl,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export { Authcontext };
