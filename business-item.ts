import { Web3 } from "web3";
import fs from "fs";

const bnbRpcProvider =
  "https://alpha-weathered-card.bsc.quiknode.pro/5ee1c5dc4700fd50e42762ca281bf35b7dc36b88";
const inventoryAbi = JSON.parse(
  fs.readFileSync("./business-item/business-abi.json", "utf-8")
);

const web3 = new Web3(bnbRpcProvider);
const inventoryAddress = "0x2CB8352Be090846d4878Faa92825188D7bf50654";
const inventoryContract = new web3.eth.Contract(inventoryAbi, inventoryAddress);
const values = [
  "Car crusher",
  "Shop owner",
  "Bank",
  "Hospital",
  "Detective Agency",
  "Booze warehouse",
  "Narcotics warehouse",
  "Slotmachine",
  "Roulette",
  "Bullet factory",
];

const main = async () => {
  for (let i = 0; i < 7000; i++) {
    const info: any = await inventoryContract.methods.items(i).call();
    if (parseInt(info.categoryId) === 4) {
      console.log(`id: ${i}: ${values[info.typeId]}, owner: ${info.owner}`);
    }
  }
};

main();
