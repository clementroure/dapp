export const address = "0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55";
export const abi = [{"inputs":[{"internalType":"uint256","name":"_maxTokenId","type":"uint256"},{"internalType":"address","name":"_ERC721address","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"bool","name":"_value","type":"bool"}],"name":"UpdateWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenNumber","type":"uint256"},{"indexed":false,"internalType":"address","name":"_tokenClaimer","type":"address"}],"name":"aTokenWasClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_withdrawer","type":"address"},{"indexed":false,"internalType":"uint256","name":"_funds","type":"uint256"}],"name":"withdrawFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_tipper","type":"address"}],"name":"yeeeeeeaaaaaahThxCoeurCoeurCoeur","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"_tokenToClaim","type":"uint256"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"claimAToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokensThatWereClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"updateWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawTips","outputs":[],"stateMutability":"nonpayable","type":"function"}]