import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  githubProvider
} from "../firebase";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getIdTokenResult
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const [role, setRole] = useState('user')

  const [loading, setLoading] = useState(true)




  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        await currentUser.reload();

        const providerId = currentUser.providerData[0]?.providerId

        
        if (
          currentUser.emailVerified ||
          providerId === "google.com" ||
          providerId === "github.com"
        ) {
          try {
           
            const tokenResult = await getIdTokenResult(currentUser);
            const userRole = tokenResult?.claims?.role || "user"

            console.log(userRole,'this is the user role form authcontext')

            console.log(" condition passed, user role:", userRole)

            setUser(currentUser);
            setRole(userRole);
          } catch (error) {
            console.error("Error fetching role:", error)
            setUser(currentUser);
            setRole("user");
          }
        } else {
          
          console.warn("Email not verified. Access denied.");
          setUser(null)

          setRole("user")

        }
      } else {
       
        setUser(null)

        setRole("user")

      }

      setLoading(false)

    });

    return unsub
    
  }, []);



  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Google & GitHub
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginWithGithub = () => signInWithPopup(auth, githubProvider);

  const logout = () => signOut(auth);


  return (
    <AuthContext.Provider
      value={{ user, role, signup, login, logout, loginWithGoogle, loginWithGithub, setUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};