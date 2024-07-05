import { ethers } from "ethers";
import { useState } from "react";
import { useWriteContract } from "wagmi";

const marketAddress = import.meta.env.VITE_NFT_MARKET_ADDRESS;
const marketAbi = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];

const ListNFT = () => {
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");

    const { writeContract } = useWriteContract();

    const handleListNFT = async () => {
        const formattedPrice = ethers.parseUnits(price, "ether");
        writeContract({
            address: marketAddress,
            abi: marketAbi,
            functionName: "listItem",
            args: [tokenId, formattedPrice],
        });
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
