const { ethers } = require("hardhat");
const config = require("../src/config.json");

async function main() {
    const { chainId } = await ethers.provider.getNetwork();
    console.log(`Using chainId ${chainId}`);
    console.log("Contract address from config:", config[chainId].MedicalRecord.address);

    const accounts = await ethers.getSigners();
    
    const medical = await ethers.getContractAt(
        "MedicalRecord",
        config[chainId].MedicalRecord.address
    );

    const contractAddress = await medical.getAddress();
    console.log(`MedicalRecord smart contract is fetched at address ${contractAddress}`);

    // Log deployer address as well
    console.log("Deployer address:", accounts[1].address);
    let transactionResponse;
    // Changed from account[0] to accounts[0]
    const user1 = accounts[0];
    
    transactionResponse = await medical
        .connect(user1)
        .addRecord(
            "Aman Gupta",
            44,
            "Male",
            "B positive",
            "Allergic rhinitis",
            "Hypertension ",
            "Medications"
        );
    await transactionResponse.wait();
    console.log(`Record added with id ${await medical.getRecordId()}`);

    transactionResponse = await medical
        .connect(user1)
        .addRecord(
            "Michael Miller",
            34,
            "Male",
            "A negative",
            "Pollen allergy ",
            "Type 2 diabetes ",
            "Psychotherapy"
        );
    await transactionResponse.wait();
    console.log(`Record added with id ${await medical.getRecordId()}`);

    transactionResponse = await medical
        .connect(user1)
        .addRecord(
            "David Wright",
            45,
            "Male",
            "B positive",
            "Insect sting allergy ",
            "Asthma ",
            "Surgery"
        );
    await transactionResponse.wait();
    console.log(`Record added with id ${await medical.getRecordId()}`);

    transactionResponse = await medical
        .connect(user1)
        .addRecord(
            "Ethan Clark",
            23,
            "Male",
            "O negative",
            "Drug allergy",
            "Bronchitis ",
            "Radiation therapy"
        );
    await transactionResponse.wait();
    console.log(`Record added with id ${await medical.getRecordId()}`);

    transactionResponse = await medical
        .connect(user1)
        .addRecord(
            "Ryan GupMillerta",
            34,
            "Male",
            "AB positive",
            "Latex allergy",
            "Pneumonia ",
            "Physical therapy"
        );
    await transactionResponse.wait();
    console.log(`Record added with id ${await medical.getRecordId()}`);

    transactionResponse = await medical
        .connect(user1)
        .addRecord(
            "Olivia Robinson",
            77,
            "Female",
            "A negative",
            "Animal dander allergy ",
            "Acute appendicitis ",
            "Occupational therapy"
        );
    await transactionResponse.wait();
    console.log(`Record added with id ${await medical.getRecordId()}`);

    // Remove duplicate wait
    // await transactionResponse.wait();
    // console.log(`Record added with id ${await medical.getRecordId()}`);

    try {
        transactionResponse = await medical.connect(user1).deleteRecord(10);
        await transactionResponse.wait();
        console.log(`Record 10 deleted`);
    } catch (error) {
        console.log("Error deleting record 10:", error.message);
    }

    try {
        transactionResponse = await medical.connect(user1).deleteRecord(15);
        await transactionResponse.wait();
        console.log(`Record 15 deleted`);
    } catch (error) {
        console.log("Error deleting record 15:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });