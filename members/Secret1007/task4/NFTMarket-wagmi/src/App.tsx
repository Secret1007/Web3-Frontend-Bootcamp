import React, { ReactNode, Suspense, useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAccount } from "wagmi";
import Account from "./components/Accounts/Index";

// Pages
const Login = React.lazy(() => import("./views/login/Index"));
const Market = React.lazy(() => import("./views/market/Index"));

interface PrivateRouteProps {
    children: ReactNode;
}

// PrivateRoute 组件
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { status } = useAccount();

    useEffect(() => {}, [status]);

    if (status === "reconnecting" || status === "connecting") {
        return <div>Loading...</div>;
    }

    if (status !== "connected") {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

function App() {
    const { status } = useAccount();

    useEffect(() => {}, [status]);

    return (
        <>
            <div className="h-full">
                <Account />
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Market />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Suspense>
                </Router>
            </div>
        </>
    );
}

export default App;
