import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { useState } from "react";
import NFTMarketABI from "./NFTMarketABI.json"; // 导入NFT市场的ABI

const NFTMarketAddress = "0xYourNFTMarketContractAddress"; // 替换为你的NFT市场合约地址

export default function ListNFT() {
    const { address, isConnected } = useAccount();
    const [price, setPrice] = useState("");
    const [tokenId, setTokenId] = useState("");

    // 准备 approve 合约调用
    const approveConfig = useReadContract({
        address: NFTMarketAddress,
        abi: NFTMarketABI,
        functionName: "approve",
        args: [NFTMarketAddress, tokenId],
    });

    // 准备 listItem 合约调用
    const listConfig = useReadContract({
        address: NFTMarketAddress,
        abi: NFTMarketABI,
        functionName: "listItem",
        args: [tokenId, ethers.parseEther(price)],
    });

    // 执行 approve 合约调用
    const { write: approve } = useWriteContract(approveConfig);
    // 执行 listItem 合约调用
    const { write: listItem } = useWriteContract(listConfig);

    const handleListNFT = async () => {
        try {
            // 先批准市场合约操作NFT
            approve?.();
            // 然后将NFT上架
            listItem?.();
            alert("NFT成功上架！");
        } catch (error) {
            console.error("上架失败:", error);
            alert("上架失败，请重试！");
        }
    };

    return (
        <div>
            {isConnected ? (
                <div>
                    <h2>上架NFT</h2>
                    <input type="text" placeholder="NFT Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                    <input type="text" placeholder="价格 (ETH)" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <button onClick={handleListNFT}>上架</button>
                </div>
            ) : (
                <p>请连接钱包</p>
            )}
        </div>
    );
}
