import { useGuestMode } from "@/App";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

function Login() {
    const { connectors, connect } = useConnect();
    const { status } = useAccount();
    const { setIsGuest } = useGuestMode();

    useEffect(() => {
        if (status === "connected") {
            window.location.href = "/";
        }
    }, [status]);
    return (
        <>
            <div className=" rounded-lg shadow-lg w-full h-full flex items-center justify-center">
                {connectors.map((connector) => (
                    <button
                        key={connector.id}
                        onClick={() => connect({ connector })}
                        type="button"
                        className="connector-btn flex items-center mb-2  w-40 py-2 px-4 bg-dark-500 text-white rounded hover:bg-dark-700 cursor-pointer"
                    >
                        <Icon icon="mdi:link" className="w-5 h-5 mr-2" />
                        {connector.name}
                    </button>
                ))}

                <button
                    onClick={() => setIsGuest(true)}
                    type="button"
                    className="connector-btn flex items-center mb-2  w-40 py-2 px-4 bg-dark-500 text-white rounded hover:bg-dark-700 cursor-pointer ml-4"
                >
                    <Icon icon="mdi:account-badge" className="w-5 h-5 mr-2" />
                    visitor
                </button>
            </div>
        </>
    );
}

export default Login;
