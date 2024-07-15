import React, { ReactNode, Suspense, createContext, useContext, useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import Account from "./components/Accounts/Index";

// Pages
const Login = React.lazy(() => import("./views/login/Index"));
const Market = React.lazy(() => import("./views/market/Index"));
const Home = React.lazy(() => import("./views/home/Index"));

interface PrivateRouteProps {
    children: ReactNode;
    isGuest: boolean;
}

// 创建 Context
const GuestModeContext = createContext<{
    isGuest: boolean;
    setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    isGuest: false,
    setIsGuest: () => {},
});

// PrivateRoute 组件
const PrivateRoute = ({ children, isGuest }: PrivateRouteProps) => {
    const { status } = useAccount();

    useEffect(() => {}, [status]);

    if (status === "reconnecting" || status === "connecting") {
        return <div>Loading...</div>;
    }

    if (status !== "connected" && !isGuest) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

function App() {
    const { status } = useAccount();
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {}, [status]);

    return (
        <GuestModeContext.Provider value={{ isGuest, setIsGuest }}>
            <div className="h-full">
                <Router>
                    <AppContent />
                </Router>
            </div>
        </GuestModeContext.Provider>
    );
}

function AppContent() {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/home");
    };

    return (
        <>
            <Account handleGoHome={handleGoHome} />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute isGuest={useContext(GuestModeContext).isGuest}>
                                <Market />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Suspense>
        </>
    );
}

export const useGuestMode = () => useContext(GuestModeContext);
export default App;
