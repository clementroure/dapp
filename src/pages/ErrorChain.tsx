import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { chain, chainId } from 'wagmi';

function ErrorChain () {

    const [chainId, setChainId] = useState(0)
    const [lastBlock, setLastBlock] = useState(0)

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
            console.log("Account:", await signer.getAddress());
        }

        init()
    })

    return (

        <div className='grid place-items-center m-10'>
           <ConnectButton />
           <p className="mt-4 text-gray-800 font-semibold">Chain Id: {chainId} | Last Block: {lastBlock}</p>
        </div>
    );

}

export default ErrorChain;