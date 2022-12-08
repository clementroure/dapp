import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import {address} from "../contracts/fakeMeebits"
import {abi} from "../contracts/fakeMeebits"
import {address as minter_address} from "../contracts/fakeMeebitsClaimer"
import {abi as minter_abi} from "../contracts/fakeMeebitsClaimer"
import {signatures} from "../signatures/signatures"

function FakeMeebits () {

    const [tokenId, setTokenId] = useState(0);

    const mintToken = async () => {

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // @ts-ignore
        const nftContract = new ethers.Contract(address, abi, signer); 
        // @ts-ignore
        const minterContract = new ethers.Contract(minter_address, minter_abi, signer); 

        try{
            const sig = signatures[tokenId].signature;
            console.log("sig: " + sig)

            const _transaction = await nftContract.claimAToken({value: ethers.utils.parseEther("0.01"), tokenId, sig});
            const transaction = await _transaction.wait(); 
            alert("NFT Minted !")
        }
        catch(e){
            console.log(e)
            alert("ERROR: This Token can't be minted.")
        }
    }
    
    return(
        <div className='grid place-items-center m-10'>
    
            <ConnectButton />
            <div className="flex flex-row space-x-4 mt-6">
                <input value={tokenId} onChange={(e)=>setTokenId(parseInt(e.target.value))} type="number" maxLength={2} min={0} max={99} className="h-10 w-14 px-1 text-xl font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button onClick={mintToken} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Mint Token n° {tokenId}
                </button>
            </div>
           <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
                Back
            </Link>
         </div>
        );

}

export default FakeMeebits;