import React, { memo } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase/firebase";
import { Inputs, IAuth } from "../types";

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(true);
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (input: Inputs) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userDetails) => {
        setUser(userDetails.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (input: Inputs) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userDetails) => {
        setUser(userDetails.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const logOut = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logOut }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
