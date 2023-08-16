import React, { useEffect, useState } from 'react'
import All from '../../../assets/All.svg'
import { erc20Instance, getChainDetails, remortFactoryInstnce, walletBalance } from '../../../config';
import { useAccount, useNetwork } from 'wagmi';

import 'react-loading-skeleton/dist/skeleton.css'
import { ethers } from 'ethers';
function ShowToken({ token, setSelectedToken, handleClose }) {
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount();
    let [tokenDetail, setTokenDetail] = useState(null)
    const [tokenAddress, setTokenAddress] = useState(null);
    const getTokenName = async () => {
        try {
            const contract = await remortFactoryInstnce(chain?.id);
            const symbol = await contract.get_CurrencyOfuToken(token);
            console.log("symbol", symbol);
            const alternateAddress = await contract.get_TokenAddressOfuToken(token);
            setTokenDetail(symbol)
            setTokenAddress(alternateAddress)
            console.log("alternateAddress", alternateAddress);
        } catch (error) {
            console.error("error while get token name", error);
        }
    }
    useEffect(() => {
        getTokenName()
    }, [])
    const [tokenBal, setTokenBal] = useState(null);
    const getBal = async () => {
        try {
            const token = await erc20Instance(tokenAddress);
            let bal = await token.balanceOf(address);
            console.log("bal", ethers.utils.formatEther(bal));
            setTokenBal( ethers.utils.formatEther(bal))
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id))
            getBal()
    }, [chain?.id, tokenAddress])
    return (
        <>
            <div className={
                tokenBal > 0 ? "d-flex mt-3 justify-content-between align-items-center enabledDiv" : "d-flex mt-3 justify-content-between align-items-center disabledDiv"
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
                        <p className='mb-0 eth'>{
                            tokenDetail
                        }</p>
                    </div>
                </div>
                    :
                    "Loading..."}
                <div className=''>
                    {
                        tokenBal ? tokenBal : "..."
                    }
                </div>
            </div>
        </>
    )
}

export default ShowToken