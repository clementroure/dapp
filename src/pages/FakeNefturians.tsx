import { Link, useNavigate } from "react-router-dom";
import {address as contarctAddress} from "../contracts/fakeNefturians"
import {abi} from "../contracts/fakeNefturians"
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

function FakeNefturians () {

    const navigate = useNavigate()

    const [price, setPrice] = useState(0)

    const [isOnTokenPage, setIsOnTokenPage] = useState(false)
    const [address, setAddress] = useState("");
    const [metadata, setMetadata] = useState<{image: string, animation_url: string, name:string, description: string, attributes: {trait_type: string, value: string}[]}[]>([])

    useEffect(() => {

        const init = async () => {
             // @ts-ignore
             const provider = new ethers.providers.Web3Provider(window.ethereum);
             const signer = provider.getSigner();
             const _address = await signer.getAddress()
             setAddress(_address)
             // @ts-ignore
             const nftContract = new ethers.Contract(address, abi, signer); 
 
             const _price = await nftContract.tokenPrice();
             setPrice(parseInt(_price._hex, 16) / 10**18)
         }
 
        init()
     },[])

    const buyToken = async () => {

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // @ts-ignore
        const nftContract = new ethers.Contract(address, abi, signer); 

        try {
            const _transaction = await nftContract.buyAToken({value: ethers.utils.parseEther("0.11")});
            const transaction = await _transaction.wait(); 
            window.alert("Token received !");
        }
        catch(e){
            console.log(e);
            alert("ERROR: INSUFFICIENT FUNDS !");
        }
    }

    const tokenIdPage = async () => {

       // @ts-ignore
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       // @ts-ignore
       const nftContract = new ethers.Contract(contarctAddress, abi, signer); 

       try{

            var tab = [0,1];
            for (let i=0; i<tab.length;i++){

                const metadata_url = await nftContract.tokenURI(i);
                let response = await fetch(metadata_url);
                let _metadata = await response.json();
                console.log(_metadata)
                setMetadata(prev => [...prev, {image: _metadata.image, animation_url: (_metadata.animation_url != undefined ? _metadata.animation_url : ""), name: _metadata.name, description: _metadata.description, attributes: [{trait_type: (_metadata.attributes[0] != undefined ? _metadata.attributes[0].trait_type : ""), value: (_metadata.attributes[0] != undefined ? _metadata.attributes[0].value : "")}]}]);
            }

            setIsOnTokenPage(true)

            var _event = new CustomEvent("address_Nefturians_Event", {
                "detail": {"address": address}
            });
            window.dispatchEvent(_event);
            navigate("/fakeNefturians");

            navigate(`/fakeNefturians/${address}`)
       }
       catch(e){
           console.log(e)
           alert("ERROR: Address does not own token.")
       }
    }

    return(
    <div className='grid place-items-center m-10'>
        {!isOnTokenPage ?
        <>
            <ConnectButton />
            <p className="mt-4 text-gray-800 font-semibold">Price: {price} ETH</p>
            <button onClick={buyToken} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Buy Token
                </button>
            <div className="flex flex-row space-x-4 mt-6">
                <input value={address} onChange={(e)=>setAddress(e.target.value)} maxLength={42} type="text" className="h-10 w-72 px-1 text-xl font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button onClick={tokenIdPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View NFT Collection
                </button>
            </div>
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
                    Back
            </Link>
        </>
        :
        <>
            <ul className="-mt-4">
                {metadata?.map((metadata, index) => {
                return (
                <li className="mb-10" key={index}>             
                   <p className="m-2 text-gray-800 mt-4 text-center w-full font-semibold text-lg mb-4">{metadata?.name}</p>
                    <div className="flex flex-wrap justify-center">
                        <img
                            src={`${metadata?.image}`}
                            className="rounded-2xl max-w-sm transition-shadow ease-in-out duration-300 shadow-xl -mt-2"
                            alt="NFT image"
                            />
                    </div>
                    <p className="m-2 text-gray-800 mt-4">{metadata?.description}</p>
                    <div className="mt-2">
                        {metadata?.attributes[0].trait_type == "" 
                        ?
                        <p className="m-2 text-gray-800">No attributes.</p>
                        :
                        <p className="m-2 text-gray-800">{metadata?.attributes[0].trait_type} : {metadata?.attributes[0].value}</p>
                        }
                    </div>
                </li>    
                )})}
            </ul>
            <button onClick={() => {
                setMetadata([])
                setIsOnTokenPage(false);
                var _event = new CustomEvent("address_Nefturians_Event", {
                    "detail": {"address": ""}
                });
                window.dispatchEvent(_event);
                navigate("/fakeNefturians");

            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Back
            </button>
        </>
        }
     </div>
    );

}

export default FakeNefturians;