import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useAccount, useNetwork } from 'wagmi';
import { erc20Instance, remortFactoryInstnce } from '../../../config';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

function UTokenBalance({tokenAddress}) {
    const { isReferesh } = useSelector((state) => state.refreshFunctions)
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount();
    const [tokenBal, setTokenBal] = useState(null)
    const getTokenBal = async () => {
        try {
            const tokenInstance = await erc20Instance(tokenAddress);
            const bal = await tokenInstance.balanceOf(address);
            setTokenBal(ethers.utils.formatEther(bal))
        } catch (error) {
            console.error("error while get token balance", error);
        }
    }
    useEffect(() => {
        if (isConnected)
            getTokenBal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, address, isReferesh])
  return (
    <>
      {
                tokenBal !== null ? tokenBal :
                    <Skeleton
                        count={1}
                        inline
                        width={100}
                    />
            }
    </>
  )
}

export default UTokenBalance
