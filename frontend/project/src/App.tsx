import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import CallbackPage from "./pages/CallbackPage";
import IssuesPage from "./pages/IssuesPage";
import {RepositoriesPage} from "./pages/AllUsersPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/issues/:id" element={<IssuesPage />} />
        <Route path="/repos" element={<RepositoriesPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
