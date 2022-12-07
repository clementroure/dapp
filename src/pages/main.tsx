import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { ethers } from "ethers";

function Main(){

    useEffect(() => {

        const init = async () => {

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []);

            console.log(provider)
            console.log(accounts)
        }

        init()
    })

    return (

        <div className='grid place-items-center m-10'>
           <ConnectButton />
        </div>
    );
}

export default Main;