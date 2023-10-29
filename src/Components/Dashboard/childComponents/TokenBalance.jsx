import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useAccount, useNetwork } from 'wagmi';
import { erc20Instance, remortFactoryInstnce } from '../../../config';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

function TokenBalance({ tokenAddress }) {
    const { isReferesh } = useSelector((state) => state.refreshFunctions)
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount();
    const [tokenBal, setTokenBal] = useState(null)
    const getTokenBal = async () => {
        try {
            let contract = await remortFactoryInstnce(chain?.id);
            const alternateAddress = await contract.get_TokenAddressOfuToken(tokenAddress);
            const tokenInstance = await erc20Instance(alternateAddress);
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
                tokenBal !== null ? Number(tokenBal).toFixed(4) :
                    <Skeleton
                        count={1}
                        inline
                        width={100}
                    />
            }
        </>
    )
}

export default TokenBalance
