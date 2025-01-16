const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying smart contract...");
  
  // Get the contract factory
  const Medical = await ethers.getContractFactory("MedicalRecord");
  
  // Get signers
  const [deployer, account1] = await ethers.getSigners();
  console.log("Deploying with account:", account1.address);
  
  // Deploy the contract
  const medical = await Medical.connect(account1).deploy();
  
  // Wait for deployment to complete
  await medical.waitForDeployment();
  
  // Get the deployed contract address
  const medicalAddress = await medical.getAddress();
  
  console.log(`Medical Record contract deployed to: ${medicalAddress}`);
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });