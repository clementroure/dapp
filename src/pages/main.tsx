import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { chain, chainId } from 'wagmi';
import { Link } from 'react-router-dom';

function Main(){

    return (

        <div className='grid place-items-center m-10'>
           <p className='text-gray-800 font-bold text-lg mb-6'>MENU</p>
           <Link to="chain-info" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-40 text-center drop-shadow-2xl">
             Chain Info
            </Link>
            <Link to="fakeBayc" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-40 text-center drop-shadow-2xl">
             Fake Bayc
            </Link>
            <Link to="fakeNefturians" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-40 text-center drop-shadow-2xl">
             Fake Nefturians
            </Link>
            <Link to="fakeMeebits" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-40 text-center drop-shadow-2xl">
             Fake Meebits
            </Link>
        </div>
    );
}

export default Main;