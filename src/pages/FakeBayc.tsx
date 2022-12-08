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

    const [tokenId, setTokenId] = useState(0)
    const [isOnTokenPage, setIsOnTokenPage] = useState(false)

    const [metadata, setMetadata] = useState<{media_url: string, attributes: {trait_type: string, value: string}[]}>()

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

                const _supply = await nftContract.totalSupply();
                const supply = parseInt(_supply._hex, 16);
                console.log(supply);
                setTokenNumber(supply)
            }
            else{
            
                console.log("error while loading contract")
            }
        }

       init()
    },[])

    const claimToken = async () => {

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // @ts-ignore
        const nftContract = new ethers.Contract(address, abi, signer); 

        const _transaction = await nftContract.claimAToken();
        const transaction = await _transaction.wait(); 
        setTokenNumber(tokenNumber+1)
        setTokenId(tokenNumber)
        window.alert("Token received !")
    }

    const tokenIdPage = async () => {

        if(tokenId >= 0){

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // @ts-ignore
            const nftContract = new ethers.Contract(address, abi, signer); 

            try{
                const metadata_url = await nftContract.tokenURI(tokenId);
                let response = await fetch(metadata_url);
                let _metadata = await response.json();
                console.log(_metadata)
                setMetadata({media_url: (_metadata.image).substring(6), attributes: [{trait_type: _metadata.attributes[0].trait_type, value: _metadata.attributes[0].value}]});
                
                setIsOnTokenPage(true)

                var _event = new CustomEvent("tokenId_Bayc_Event", {
                    "detail": {"tokenId": tokenId}
                });
                window.dispatchEvent(_event);

                navigate(`/fakeBayc/${tokenId}`)
            }
            catch(e){
                console.log(e)
                alert("ERROR: Token Id does not exist.")
            }

        }
        else{
            alert("Token ID is not valid.")
        }
    }

    return(
     <div className='grid place-items-center m-10'>
        {!isOnTokenPage ?
        <>
            <ConnectButton />
            <p className="mt-4 text-gray-800 font-semibold">Name: {tokenName} | Token number: {tokenNumber}</p>
            <button onClick={claimToken} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
               Claim Token
            </button>
            <div className="flex flex-row space-x-4 mt-6">
                <input value={tokenId} onChange={(e)=>setTokenId(parseInt(e.target.value))} type="number" maxLength={2} min={0} max={99} className="h-10 w-14 px-1 text-xl font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button onClick={tokenIdPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View NFT n° {tokenId}
                </button>
            </div>
           <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
                Back
            </Link>
        </>
        :
        <>
            <div className="flex flex-wrap justify-center">
            <img
                src={`https://ipfs.io/ipfs/${metadata?.media_url}`}
                className="rounded-2xl max-w-sm transition-shadow ease-in-out duration-300 shadow-xl -mt-2"
                alt="NFT image"
                />
            </div>
            <div className="mt-2">
                <p className="m-2 text-gray-800">{metadata?.attributes[0].trait_type} : {metadata?.attributes[0].value}</p>
                <p className="m-2  text-gray-800">{metadata?.attributes[1].trait_type} : {metadata?.attributes[1].value}</p>
                <p className="m-2  text-gray-800">{metadata?.attributes[2].trait_type} : {metadata?.attributes[2].value}</p>
                <p className="m-2 text-gray-800">{metadata?.attributes[3].trait_type} : {metadata?.attributes[3].value}</p>
                <p className="m-2  text-gray-800">{metadata?.attributes[4].trait_type} : {metadata?.attributes[4].value}</p>
                <p className="m-2  text-gray-800">{metadata?.attributes[5].trait_type} : {metadata?.attributes[5].value}</p>
            </div>
            <button onClick={() => {
                setIsOnTokenPage(false);
                var _event = new CustomEvent("tokenId_Bayc_Event", {
                    "detail": {"tokenId": ""}
                });
                window.dispatchEvent(_event);
                navigate("/fakeBayc");

            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Back
            </button>
        </>
        }
     </div>
    );

}

export default FakeBayc;