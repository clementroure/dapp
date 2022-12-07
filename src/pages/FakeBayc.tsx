import { initializeAppCheck } from "@firebase/app-check";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {address} from "../contracts/fakeBayc"
import {abi} from "../contracts/fakeBayc"
import { Link, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function FakeBayc () {

    const navigate = useNavigate()

    const [tokenName, setTokenname] = useState("")
    const [tokenNumber, setTokenNumber] = useState(0)

    const [tokenId, setTokenId] = useState("")

    useEffect(() => {

       const init = async () => {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // @ts-ignore
            const nftContract = new ethers.Contract(address, abi, signer); 

            if (nftContract !== null) {   

                console.log(nftContract)
                
                const name = await nftContract.name();
                // const name = await _name.wait(); 
                if (name.status !== 1) {
                    console.log(name)
                    setTokenname(name)
                }

                const supply = parseInt(await nftContract.totalSupply(), 16);
                console.log(supply);
                setTokenNumber(supply)
            }
            else{
            
                console.log("error while loading contract")
            }
        }

       init()
    })

    const claimToken = async () => {

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // @ts-ignore
        const nftContract = new ethers.Contract(address, abi, signer); 

        const _transaction = await nftContract.claimAToken();
        const transaction = await _transaction.wait(); 
        setTokenNumber(tokenNumber+1)
        window.alert("Token received !")
    }

    const tokenIdPage = () => {

        var _event = new CustomEvent("tokenId_Bayc_Event", {
            "detail": {"tokenId": tokenId}
        });
        window.dispatchEvent(_event);

        navigate(`/fakeBayc/${tokenId}`)
    }

    return(
     <div className='grid place-items-center m-10'>
       <ConnectButton />
       <p className="mt-4 text-gray-800 font-semibold">Name: {tokenName} | Token number: {tokenNumber}</p>
        <button onClick={claimToken} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
         Claim Token
        </button>
        <button onClick={tokenIdPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
            Token Id
        </button>
       <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
            Back
        </Link>
     </div>
    );

}

export default FakeBayc;