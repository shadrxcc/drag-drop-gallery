import { createContext, useEffect, useState } from "react";
import { supabase } from "../../client";
import PropTypes from "prop-types";

export const AuthContext = createContext({});

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
        sessionStorage.setItem("user_data", JSON.stringify(session.user));
        
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
