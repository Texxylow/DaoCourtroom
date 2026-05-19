console.log("ethers loaded:", ethers);
const contractAddress = "0x54f6A5C8f6Af58FeB9D4B11CFB00b8e5dc87599A";

const abi = [
  "function createCase(string,string,string) public",
  "function vote(uint,bool) public",
  "function finalizeCase(uint,string) public"
];

let provider;
let signer;
let contract;

async function connectWallet() {

  try {

    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    provider = new ethers.providers.Web3Provider(window.ethereum);

    signer = provider.getSigner();

    contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    const address = await signer.getAddress();

    const btn = document.getElementById("walletBtn");

    btn.innerText =
      "Connected: " +
      address.slice(0, 6) +
      "..." +
      address.slice(-4);

    btn.disabled = true;

    alert("Wallet Connected");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function createCase() {

  try {

    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    const dispute =
      document.getElementById("dispute").value;

    const plaintiff =
      document.getElementById("plaintiff").value;

    const defendant =
      document.getElementById("defendant").value;

    const tx = await contract.createCase(
      dispute,
      plaintiff,
      defendant
    );

    await tx.wait();

    alert("Case Created");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function votePlaintiff() {

  try {

    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    const id =
      document.getElementById("caseId").value;

    const tx = await contract.vote(id, true);

    await tx.wait();

    alert("Voted Plaintiff");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function voteDefendant() {

  try {

    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    const id =
      document.getElementById("caseId").value;

    const tx = await contract.vote(id, false);

    await tx.wait();

    alert("Voted Defendant");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function finalizeCase() {

  try {

    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    const id =
      document.getElementById("verdictCaseId").value;

    const verdict =
      document.getElementById("verdictText").value;

    const tx = await contract.finalizeCase(
      id,
      verdict
    );

    await tx.wait();

    alert("Verdict Finalized");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
