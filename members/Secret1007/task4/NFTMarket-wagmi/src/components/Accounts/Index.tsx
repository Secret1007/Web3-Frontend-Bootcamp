import { Icon } from "@iconify/react";
import { useAccount, useDisconnect } from "wagmi";
import "./index.scss";

interface AccountProps {
    handleGoHome: () => void;
}

const Account: React.FC<AccountProps> = ({ handleGoHome }) => {
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
    const handleDisconnect = () => {
        disconnect();
    };

    return (
        <div className="user-card p-4 rounded-lg shadow-lg bg-black max-w-sm text-sm text-#fff absolute right-0 border-light-100 border-solid mt-4 mr-2">
            <div className="flex items-center">
                <Icon icon={getStatusIcon(account.status)} className="w-6 h-6 mr-3" />
                {account.status === "connected" ? null : <span>{account.status}</span>}
            </div>

            {account.status === "connected" && (
                <div className="info text-light-800">
                    <div className="mb-2">
                        <span className="font-medium">Address:</span> {account.address}
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Chain ID:</span> {account.chain?.id}
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-4">
                {account.status === "connected" && (
                    <div className="flex items-center py-2 px-8 cursor-pointer bg-dark font-bold mr-4" onClick={handleGoHome}>
                        <Icon icon="mdi:account-box-outline" className="w-6 h-6 text-green-400 mr-2" />
                        <span>个人中心</span>
                    </div>
                )}
                {account.status === "connected" && (
                    <div className="disconnect-btn flex items-center justify-center py-2 px-8 cursor-pointer bg-dark font-bold" onClick={handleDisconnect}>
                        Disconnect
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
