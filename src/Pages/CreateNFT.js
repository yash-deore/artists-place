import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import NFTMarketplace from "../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json";
import { marketplaceAddress } from "../marketPlace";

const CreateNFT = () => {
  const [assetPrice, setAssetPrice] = useState(0);
  const [assetUri, setAssetUri] = useState("");
  const navigate = useNavigate();

  const renderMetadataDetails = () => {
    return (
      <div>
        Your Metadata format should be in this{" "}
        <a
          href="https://bafybeihifud43qn7waaqyej4lsuxhlwmeltvlpa6cypiivftutfk4xgnpy.ipfs.infura-ipfs.io/format.txt"
          target="_blank"
          rel="noreferrer"
        >
          format
        </a>{" "}
        .
        <br />
        You can use services like{" "}
        <a href="https://web3.storage/" target="_blank" rel="noreferrer">
          web3.storage
        </a>{" "}
        or
        <a href="https://www.pinata.cloud/" target="_blank" rel="noreferrer">
          pinata.cloud
        </a>{" "}
        to upload the metadata and images.
      </div>
    );
  };

  const listNFTForSale = async (e) => {
    e.preventDefault();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // creating the item
    const price = ethers.utils.parseUnits(assetPrice, "ether");
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(assetUri, price, {
      value: listingPrice,
    });
    await transaction.wait();

    navigate("/market-place");
  };

  return (
    <Container>
      <h2>Create NFT</h2>

      {renderMetadataDetails()}

      <Form onSubmit={listNFTForSale}>
        <Form.Group className="mb-3">
          <Form.Label>Asset MetadataURL :</Form.Label>
          <Form.Control
            onChange={(e) => setAssetUri(e.target.value)}
            type="text"
            placeholder="NFT Metadata"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset Price :</Form.Label>
          <Form.Control
            onChange={(e) => setAssetPrice(e.target.value)}
            type="number"
            step="0.000001"
            placeholder="Asset Price in MATIC"
            required
          />
        </Form.Group>

        <Button type="submit">Create NFT</Button>
      </Form>
    </Container>
  );
};

export default CreateNFT;
