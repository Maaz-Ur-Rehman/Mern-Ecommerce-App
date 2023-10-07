import Layout from "./components/layout/layout";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
"314005293340-0b7rbnf8644se1dfqk1lsk5rkphfm15t.apps.googleusercontent.com";
function App() {
  return (
    <>
      {/* <Layout /> */}
      <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
