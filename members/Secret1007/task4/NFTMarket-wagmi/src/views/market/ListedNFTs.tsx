import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

const marketAddress = import.meta.env.VITE_NFT_MARKET_ADDRESS;
const marketAbi = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];

const ListedNFTs = () => {
    const [items, setItems] = useState([]);

    const { data, isError, isLoading } = useReadContract({
        address: marketAddress,
        abi: marketAbi,
        functionName: "fetchMarketItems",
    });

    console.log("isLoading:", isLoading, "isError:", isError, "data:", data);
    useEffect(() => {
        if (!isLoading && !isError && data) {
            setItems(data);
        }
    }, [data, isError, isLoading]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <p>NFT Address: {item.nftContract}</p>
                            <p>Token ID: {item.tokenId.toString()}</p>
                            <p>Price: {ethers.formatEther(item.price.toString())} ETH</p>
                            <p>Seller: {item.seller}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListedNFTs;
