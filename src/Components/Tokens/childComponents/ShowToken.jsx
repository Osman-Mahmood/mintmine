import React, { useEffect, useState } from 'react'
import All from '../../../assets/All.svg'
import { erc20Instance, getChainDetails, remortFactoryInstnce, walletBalance } from '../../../config';
import { useAccount, useNetwork } from 'wagmi';

import 'react-loading-skeleton/dist/skeleton.css'
import { ethers } from 'ethers';
function ShowToken({ token, setSelectedToken, handleClose }) {
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount();
    let [tokenDetail, setTokenDetail] = useState({
        symbol: "",
        address: "",
        balance: ""
    })
    const getTokenName = async () => {
        try {
            const contract = await remortFactoryInstnce(chain?.id);
            const symbol = await contract.get_CurrencyOfuToken(token);
            console.log("symbol", symbol);
            const alternateAddress = await contract.get_TokenAddressOfuToken(token);
            setTokenDetail({
                symbol: symbol,
                address: alternateAddress
            })
            console.log("alternateAddress", alternateAddress);
        } catch (error) {
            console.error("error while get token name", error);
        }
    }
    useEffect(() => {
        getTokenName()
    }, [])
    const [uNativeBal, setUNativeBal] = useState(null);
    const [ethAddress, setEthAddress] = useState(null);
    const getBal = async () => {
        try {
          
            const token = await erc20Instance(tokenDetail.address);
            let bal = await token.balanceOf(address);
            setTokenDetail({
                ...tokenDetail, balance: ethers.utils.formatEther(bal)
            })
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id) && tokenDetail.address)
            getBal()
    }, [chain?.id, tokenDetail.address])
    return (
        <>
            <div className={
                tokenDetail.balance > 0 ? "d-flex mt-3 justify-content-between align-items-center enabledDiv" : "d-flex mt-3 justify-content-between align-items-center disabledDiv"
            }
            onClick={()=>{setSelectedToken({
                name:tokenDetail.symbol,
                address:tokenDetail.address,
                type:"token"
            })
            handleClose()
        }}
            >
                
                {tokenDetail.symbol ? <div className='d-flex align-items-center'>
                    <img src={All} alt="" />
                    <div className='d-block ms-3'>
                        <p className='mb-0 eth'>{
                            tokenDetail.symbol
                        }</p>
                    </div>
                </div>
                    :
                    "Loading..."}
                <div className=''>
                    {
                        tokenDetail.balance ? tokenDetail.balance : "..."
                    }
                </div>
            </div>
        </>
    )
}

export default ShowToken