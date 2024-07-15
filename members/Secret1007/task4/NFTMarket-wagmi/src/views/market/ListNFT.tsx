import { ethers } from "ethers";
import { useState } from "react";
import { useWriteContract } from "wagmi";

// NFT合约
const nftAddress = import.meta.env.VITE_NFT_ADDRESS;
const nftAbi = ["function approve(address to, uint256 tokenId) external"];

// 市场合约
const marketAddress = import.meta.env.VITE_NFT_MARKET_ADDRESS;
const marketAbi = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];

const ListNFT = () => {
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");

    const { writeContract } = useWriteContract();

    const handleListNFT = async () => {
        const formattedPrice = ethers.parseUnits(price, "ether");
        try {
            // 授权
            writeContract({
                address: nftAddress,
                abi: nftAbi,
                functionName: "approve",
                args: [marketAddress, tokenId],
            });

            // 交易
            writeContract({
                address: marketAddress,
                abi: marketAbi,
                functionName: "listNFT",
                args: [nftAddress, tokenId, formattedPrice],
            });
        } catch (error) {
            console.log("NFT listed successfully!");
        }
    };

    return (
        <div className="mb-4">
            <input type="text" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="mr-1" />
            <input type="text" placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(e.target.value)} className="mr-1" />
            <button onClick={handleListNFT}>List NFT</button>
        </div>
    );
};

export default ListNFT;
