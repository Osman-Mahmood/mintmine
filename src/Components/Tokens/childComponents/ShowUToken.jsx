import React, { useEffect, useState } from 'react'
import All from '../../../assets/All.svg'
import { erc20Instance, getChainDetails, remortFactoryInstnce, walletBalance } from '../../../config';
import { useAccount, useNetwork } from 'wagmi';

import 'react-loading-skeleton/dist/skeleton.css'
import { ethers } from 'ethers';
function ShowUToken({ token, setSelectedToken, handleClose }) {
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount();
    let [tokenDetail, setTokenDetail] = useState(null)
    let [tokenBalance ,  setTokenBalance ] = useState(null)
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

    const getBal = async () => {
        try {
          
            const tokenInstance = await erc20Instance(token);
            let bal = await tokenInstance.balanceOf(address);
            setTokenBalance(ethers.utils.formatEther(bal))
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id) )
            getBal()
    }, [chain?.id])
    return (
        <>
            <div className={
                tokenBalance > 0 ? "d-flex mt-3 justify-content-between align-items-center enabledDiv" : "d-flex mt-3 justify-content-between align-items-center disabledDiv"
            }
            onClick={()=>{setSelectedToken({
                name:tokenDetail,
                address:token,
                type:"token"
            })
            handleClose()
        }}
            >
                
                {tokenDetail ? <div className='d-flex align-items-center'>
                    <img src={All} alt="" />
                    <div className='d-block ms-3'>
                        <p className='mb-0 eth'>u-{
                            tokenDetail
                        }</p>
                    </div>
                </div>
                    :
                    "Loading..."}
                <div className=''>
                {tokenBalance}
                    {/* {
                        tokenDetail.balance !== null ? tokenDetail.balance : "..."
                    } */}
                </div>
            </div>
        </>
    )
}

export default ShowUToken