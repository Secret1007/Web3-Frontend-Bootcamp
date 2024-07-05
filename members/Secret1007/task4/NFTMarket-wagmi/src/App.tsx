import React, { ReactNode, Suspense, createContext, useContext, useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAccount } from "wagmi";
import Account from "./components/Accounts/Index";

// Pages
const Login = React.lazy(() => import("./views/login/Index"));
const Market = React.lazy(() => import("./views/market/Index"));

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
        <>
            <GuestModeContext.Provider value={{ isGuest, setIsGuest }}>
                <div className="h-full">
                    <Account />
                    <Router>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute isGuest={isGuest}>
                                            <Market />
                                        </PrivateRoute>
                                    }
                                />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </Suspense>
                    </Router>
                </div>
            </GuestModeContext.Provider>
        </>
    );
}

export const useGuestMode = () => useContext(GuestModeContext);
export default App;
