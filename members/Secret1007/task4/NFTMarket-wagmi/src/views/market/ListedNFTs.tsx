import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

const marketAddress = import.meta.env.VITE_NFT_MARKET_ADDRESS;
const marketAbi = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];

const ListedNFTs = () => {
    const [nfts, setNfts] = useState([]);

    const { data } = useReadContract({
        address: marketAddress,
        abi: marketAbi,
        functionName: "getListedItems",
    });

    useEffect(() => {
        if (data) {
            setNfts(data);
        }
    }, [data]);

    return (
        <div>
            {nfts.map((nft, index) => (
                <div key={index}>
                    <p>Contract: {nft.contractAddress}</p>
                    <p>Token ID: {nft.tokenId}</p>
                    <p>Price: {ethers.formatUnits(nft.price, "ether")} ETH</p>
                    <p>Seller: {nft.seller}</p>
                </div>
            ))}
        </div>
    );
};

export default ListedNFTs;
