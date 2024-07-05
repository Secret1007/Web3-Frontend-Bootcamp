import { useState } from "react";
import { useWriteContract } from "wagmi";

const marketAddress = import.meta.env.VITE_NFT_MARKET_ADDRESS;
const marketAbi = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];

const BuyNFT = () => {
    const [tokenId, setTokenId] = useState("");

    const { writeContract } = useWriteContract();

    const handleBuyNFT = async () => {
        const nftPrice = await getNFTPrice(tokenId); // 假设有一个函数可以获取NFT价格
        writeContract({ address: marketAddress, abi: marketAbi, functionName: "buyItem", args: [tokenId], overrides: { value: nftPrice } });
    };

    return (
        <div className="flex justify-start">
            <input type="text" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="mr-2" />
            <button onClick={handleBuyNFT}>Buy NFT</button>
        </div>
    );
};

export default BuyNFT;
