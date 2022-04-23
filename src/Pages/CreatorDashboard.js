import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { Container, CardGroup, Card, Tabs, Tab } from "react-bootstrap";

import NFTMarketplace from "../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json";

import { marketplaceAddress } from "../marketPlace";

export default function CreatorDashboard() {
  const [listedNfts, setListedNfts] = useState([]);
  const [userNfts, setUserNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadListedNFTs();
    loadUserNFTs();
    setLoadingState("loaded");
  }, []);

  const loadListedNFTs = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await contract.fetchItemsListed();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          sold: i.sold,
        };
        return item;
      })
    );

    setListedNfts(items);
  };

  const loadUserNFTs = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await marketplaceContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI,
        };
        return item;
      })
    );

    setUserNfts(items);
  };

  const listedNFTsDisplay = () => {
    if (loadingState === "loaded" && !listedNfts.length)
      return <h1>No NFTs listed</h1>;

    return (
      <div>
        <CardGroup>
          {listedNfts.map((nft, i) => (
            <div key={i}>
              <Card style={{ width: "24rem" }}>
                <Card.Img variant="top" src={nft.image} />
                <Card.Body>
                  <Card.Text>
                    <b>Price : {nft.price} ETH</b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </CardGroup>
      </div>
    );
  };

  const userNftsDisplay = () => {
    if (loadingState === "loaded" && !userNfts.length)
      return <h1>No NFTs owned</h1>;

    return (
      <div>
        <CardGroup>
          {userNfts.map((nft, i) => (
            <div key={i}>
              <Card style={{ width: "24rem" }}>
                <Card.Img variant="top" src={nft.image} />
                <Card.Body>
                  <Card.Text>
                    <b>Price : {nft.price} ETH</b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </CardGroup>
      </div>
    );
  };

  return (
    <Container>
      <div>
        <br />
        {/* <h2>Items You Listed :</h2>
                <div>
                    <CardGroup>
                        {nfts.map((nft, i) => (
                            <div key={i}>
                                <Card style={{ width: "24rem" }}>
                                    <Card.Img variant="top" src={nft.image} />
                                    <Card.Body>
                                        <Card.Text>
                                            <b>Price : {nft.price} ETH</b>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </CardGroup>
                </div> */}

        <Tabs defaultActiveKey="usernfts" className="mb-3">
          <Tab eventKey="usernfts" title="My Assets">
            {userNftsDisplay()}
          </Tab>

          <Tab eventKey="listednfts" title="My Listed NFTs">
            {listedNFTsDisplay()}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}
