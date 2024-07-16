import { Button, Card, CardActions, CardContent, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getContract } from "viem";
import { useAccount } from "wagmi";
import MyNFTAbi from "./MyNFTAbi.json";

const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_ADDRESS as `0x${string}`;

function MintNFT() {
    const { address, isConnected } = useAccount();
    const [contract, setContract] = useState(null);
    const [tokenURI, setTokenURI] = useState("");
    const [nftList, setNftList] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [price, setPrice] = useState("");

    const contractInstance = getContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: MyNFTAbi,
        client: contract,
    });

    setContract(contractInstance);

    const mintNFT = async () => {
        try {
            const tx = await contract.write.mintNFT([tokenURI], { from: address });
            await tx.wait();
            alert("NFT Minted Successfully");
            loadNFTs();
        } catch (err) {
            console.error(err);
            alert("Minting failed");
        }
    };

    const loadNFTs = async () => {
        try {
            const tokenId = await contract.read.getCurrentTokenId();
            const nfts = [];
            for (let i = 1; i <= tokenId; i++) {
                const uri = await contract.read.tokenURI([i]);
                nfts.push({ id: i, uri });
            }
            setNftList(nfts);
        } catch (err) {
            console.error(err);
        }
    };

    const sendNFT = async (tokenId) => {
        try {
            const tx = await contract.write.sendNFT([recipient, tokenId], { from: address });
            await tx.wait();
            alert("NFT Transferred Successfully");
            loadNFTs();
        } catch (err) {
            console.error(err);
            alert("Transfer failed");
        }
    };

    const withdraw = async () => {
        try {
            const tx = await contract.write.withdraw({ from: address });
            await tx.wait();
            alert("Withdraw Successful");
        } catch (err) {
            console.error(err);
            alert("Withdraw failed");
        }
    };

    useEffect(() => {
        if (isConnected && contract) {
            loadNFTs();
        }
    }, [isConnected, contract]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Mint Your NFT
            </Typography>
            <TextField label="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={mintNFT}>
                Mint NFT
            </Button>

            <Typography variant="h4" gutterBottom>
                My NFTs
            </Typography>
            {nftList.map((nft) => (
                <Card key={nft.id} style={{ marginBottom: "20px" }}>
                    <CardContent>
                        <Typography>ID: {nft.id}</Typography>
                        <Typography>URI: {nft.uri}</Typography>
                    </CardContent>
                    <CardActions>
                        <TextField label="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} fullWidth margin="normal" />
                        <Button variant="contained" color="secondary" onClick={() => sendNFT(nft.id)}>
                            Send NFT
                        </Button>
                    </CardActions>
                </Card>
            ))}

            <Typography variant="h4" gutterBottom>
                Admin
            </Typography>
            <TextField label="New Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={withdraw}>
                Withdraw
            </Button>
        </Container>
    );
}

export default MintNFT;
