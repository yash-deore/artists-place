import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import NFTMarketplace from "../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json";
import { marketplaceAddress } from "../marketPlace";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateNFT = () => {
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [assetPrice, setAssetPrice] = useState(0);
  const [assetUri, setAssetUri] = useState("");
  const navigate = useNavigate();

  const uploadToIPFS = async () => {
    if (!assetName || !assetDescription || !assetPrice || !assetUri) return;

    const data = JSON.stringify({
      name: assetName,
      description: assetDescription,
      image: assetUri,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const uploadAsset = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setAssetUri(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const NFTDisplayCard = () => {
    if (
      assetName !== "" ||
      assetDescription !== "" ||
      assetPrice !== 0 ||
      assetUri !== ""
    ) {
      return (
        <Card style={{ width: "24rem" }}>
          <Card.Img variant="top" src={assetUri} />
          <Card.Body>
            <Card.Title>{assetName}</Card.Title>
            <Card.Text>{assetDescription}</Card.Text>
            <Card.Text>
              <b>{assetPrice !== 0 ? assetPrice + " ETH" : ""}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  };

  const listNFTForSale = async (e) => {
    e.preventDefault();
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(assetPrice, "ether");
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(url, price, {
      value: listingPrice,
    });
    await transaction.wait();

    navigate("/market-place");
  };

  return (
    <Container>
      <h2>Create NFT</h2>

      <Form onSubmit={listNFTForSale}>
        <Form.Group className="mb-3">
          <Form.Label>Asset Name :</Form.Label>
          <Form.Control
            onChange={(e) => setAssetName(e.target.value)}
            type="text"
            placeholder="Asset Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset Description :</Form.Label>
          <Form.Control
            onChange={(e) => setAssetDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Asset Description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset Price :</Form.Label>
          <Form.Control
            onChange={(e) => setAssetPrice(e.target.value)}
            type="number"
            step="0.000001"
            placeholder="Asset Price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset File :</Form.Label>
          <Form.Control required onChange={uploadAsset} type="file" />
          <Form.Text id="passwordHelpBlock" muted>
            Use images of size: 1280 x 720
          </Form.Text>
        </Form.Group>

        {NFTDisplayCard()}
        <br />

        <Button type="submit">Create NFT</Button>
      </Form>
    </Container>
  );
};

export default CreateNFT;
