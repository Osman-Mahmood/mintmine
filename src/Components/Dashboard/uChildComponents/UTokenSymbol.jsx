import React, { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi';
import { remortFactoryInstnce } from '../../../config';
import Skeleton from "react-loading-skeleton";

function UTokenSymbol({ tokenAddress }) {
    const { chain } = useNetwork()
    const [tokenSymbol, setTokenSymbol] = useState(null)
    const getTokenSymbol = async () => {
        try {
            let contract = await remortFactoryInstnce(chain?.id);
            const u_token_symbol = await contract.get_CurrencyOfuToken(tokenAddress);
            setTokenSymbol(u_token_symbol)
        } catch (error) {
            console.error("error while get token symbol", error);
        }
    }
    useEffect(() => {
        getTokenSymbol()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {
                tokenSymbol ?<> <img  src={`./tokenlist/${tokenSymbol.toLowerCase()}.png`} alt="" width={20} className="" /> u{tokenSymbol}</> :
                    <Skeleton
                        count={1}
                        inline
                        width={100}
                    />
            }
        </>
    )
}

export default UTokenSymbol
