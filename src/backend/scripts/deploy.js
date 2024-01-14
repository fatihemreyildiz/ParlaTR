const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const NFT = await hre.ethers.getContractFactory("NFT");
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  
  const nft = await NFT.deploy();
  const marketplace = await Marketplace.deploy(1);
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("MarketPlace contract is on the: ", (marketplace.address));
  console.log("NFT Contract Address is on the: ", (nft.address));

  // console.log("Account balance after the deployment:", (await deployer.provider.getBalance(deployer.address)).toString());
  // console.log("Account balance after the deployment of marketplace:", (await marketplace.provider.getBalance(marketplace.address)).toString());
  // console.log("Account balance after the deployment of nft:", (await nft.provider.getBalance(nft.address)).toString());

  saveFrontendFiles(nft , "NFT");
  saveFrontendFiles(marketplace , "Marketplace");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../PTR_NFT_Front/src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
