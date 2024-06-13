import AuthAdminProvider from "./context/AdminContext"
import Router from "./routes"


function App() {

  return (
    <>
      <AuthAdminProvider>
        <Router />
      </AuthAdminProvider>
    </>
  )
}

export default App
