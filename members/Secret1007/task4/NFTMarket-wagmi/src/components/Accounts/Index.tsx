import { useAccount, useDisconnect } from "wagmi";
import { Icon } from "@iconify/react";
import "./index.scss";

function Account() {
    const { disconnect } = useDisconnect();
    const account = useAccount();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "connected":
                return "mdi:account-check";
            case "disconnected":
                return "mdi:account-off";
            default:
                return "mdi:account";
        }
    };

    return (
        <div className="user-card p-4 rounded-lg shadow-lg bg-#1a1a1a max-w-sm text-sm text-#fff absolute right-0">
            <div className="flex items-center">
                <Icon icon={getStatusIcon(account.status)} className="w-6 h-6 mr-3" />
                {account.status === "connected" ? null : <span>{account.status}</span>}
            </div>

            {account.status === "connected" && (
                <div className="info text-light-800">
                    <div className="mb-2">
                        <span className="font-medium">Address:</span> {account.address}
                    </div>
                    <div className="mb-4">
                        <span className="font-medium">Chain ID:</span> {account.chain?.id}
                    </div>
                </div>
            )}

            {account.status === "connected" && (
                <button type="button" className="disconnect-btn w-full py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={disconnect}>
                    Disconnect
                </button>
            )}
        </div>
    );
}

export default Account;
