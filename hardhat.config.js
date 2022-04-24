require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/_ZX6y7tqU8T5cuLhx3yjPA81SryETLcb",
      accounts: [
        `da29c9bddb77d87c3bd783daa2a6ad73d53bb30be3ed0461e9992768fb0943ae`,
      ],
    },
  },
  solidity: {
    version: "0.8.4",
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
