const hre = require("hardhat");

async function main() {
  console.log("Deploying Journal contract to Base network...");

  const Journal = await hre.ethers.getContractFactory("Journal");
  const journal = await Journal.deploy();

  await journal.waitForDeployment();

  const address = await journal.getAddress();
  console.log("Journal contract deployed to:", address);
  console.log("Entry fee:", await journal.entryFee());

  console.log("\nVerify with:");
  console.log(`npx hardhat verify --network base ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
