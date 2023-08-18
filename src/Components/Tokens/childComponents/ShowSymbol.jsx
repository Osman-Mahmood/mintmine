import React, { useEffect, useState } from 'react'
import All from '../../../assets/All.svg'
import { erc20Instance, getChainDetails, remortFactoryInstnce, walletBalance } from '../../../config';
import { useAccount, useNetwork } from 'wagmi';

import 'react-loading-skeleton/dist/skeleton.css'
import { ethers } from 'ethers';
function ShowSymbol({ token}) {
    const { chain } = useNetwork()
    let [tokenDetail, setTokenDetail] = useState(null)
    const getTokenName = async () => {
        try {
            const contract = await remortFactoryInstnce(chain?.id);
            const symbol = await contract.get_CurrencyOfuToken(token);
            setTokenDetail(symbol)
        } catch (error) {
            console.error("error while get token name", error);
        }
    }
    useEffect(() => {
        getTokenName()
    }, [])
    
    return (
        <>
  

                <div className='d-flex align-items-center'>
                    <img src={All} alt="" />
                    <div className='d-block ms-3'>
                        <p className='mb-0 eth'>{
                            tokenDetail
                        }</p>
                    </div>
                </div>

        </>
    )
}

export default ShowSymbol