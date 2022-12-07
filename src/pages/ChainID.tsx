import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { Link } from 'react-router-dom';


function ChainID () {

    const [chainId, setChainId] = useState(0)
    const [lastBlock, setLastBlock] = useState(0)
    const [address, setAddress] = useState("")

    useEffect(() => {

        const init = async () => {

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            const { chainId } = await provider.getNetwork()
            const lastBlock  = await provider.getBlockNumber()

            setLastBlock(lastBlock)
            setChainId(chainId)

            console.log(provider)
            console.log("Chain Id: " + chainId)
            console.log("Last Block: " + lastBlock)
            
            const signer = provider.getSigner();
            const address = await signer.getAddress()
            console.log("Account:", address);
            setAddress(address)
        }

        init()
    })

    // Detect chain changes
    // @ts-ignore
    window.ethereum.on('networkChanged', async function (networkId) {
        console.log("chain ID :" + networkId)

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const { chainId } = await provider.getNetwork()
        const lastBlock  = await provider.getBlockNumber()
        setLastBlock(lastBlock)
        setChainId(chainId)
    })

    return (

        <div className='grid place-items-center m-10'>
           <ConnectButton />
           <p className="mt-4 text-gray-800 font-semibold">Chain Id: {chainId} | Last Block: {lastBlock} | Address: {address}</p>
           <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
             Back
            </Link>
        </div>
    );

}

export default ChainID;