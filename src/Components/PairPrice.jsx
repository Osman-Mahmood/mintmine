import React, { useEffect, useState } from 'react'
import { defaultrId, erc20Instance, getChainDetails, pairInstance, swapFactoryInstance } from '../config';
import { useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { customFormat } from '../utils';

function PairPrice({ address }) {
    const { chain } = useNetwork()
    const [price, setPrice] = useState(null)
    const getSortedTokens = async (pairInstance) => {
        try {
            const tokenA = await pairInstance.token0();
            const tokenB = await pairInstance.token1();
            return { tokenA, tokenB }
        } catch (error) {
            console.error("error while get sorted tokens", error);
        }
    }
    const getPrice = (tokenA, tokenB, _reserve0, _reserve1, wEthAddress) => {
        let rate = tokenA === wEthAddress ? (_reserve0 / _reserve1) : (_reserve1 / _reserve0)
        setPrice(customFormat(rate))
    }
    const getPairPrice = async () => {
        try {
            // let chainId = chain ? chain.id : defaultrId;
            let chainId = defaultrId
            const instance = await swapFactoryInstance(chainId);
            const { wEthAddress } = getChainDetails(chainId)
            const pairAddress = await instance.getPair(wEthAddress, address);
            const pairInst = await pairInstance(pairAddress, chainId);
            const { _reserve0, _reserve1 } = await pairInst.getReserves()
            const { tokenA, tokenB } = getSortedTokens(pairInst)
            getPrice(tokenA, tokenB, _reserve0, _reserve1, wEthAddress)
        } catch (error) {
            console.error("error while get Pair price", error);
        }
    }
    useEffect(() => {
        getPairPrice()
    }, [])
    return (
        <div>
            {
                price ? `${price} WETH`: "..."
            }
        </div>
    )
}

export default PairPrice
