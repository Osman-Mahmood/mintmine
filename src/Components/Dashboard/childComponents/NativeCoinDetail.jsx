/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Protect from '../../Modals/Protect'
import { Button } from 'react-bootstrap'
import { useAccount, useNetwork } from 'wagmi'
import { factoryInstance, getChainDetails, walletBalance } from '../../../config';
import Skeleton from 'react-loading-skeleton';
import MintModal from './Modals/MintModal';
import { useSelector } from 'react-redux';
import DetailModal from './Modals/DetailModal';

function NativeCoinDetail() {
    const { isReferesh } = useSelector((state) => state.refreshFunctions)
    const { chain } = useNetwork();
    const { address, isConnected } = useAccount();
    let [walletBal, setWalletBal] = useState(null)
    const [ethAddress, setEthAddress] = useState(null);
    const getBal = async () => {
        try {
            let contract = await factoryInstance(chain.id)
            let u_eth_address = await contract.deployedAddressOfEth();
            setEthAddress(u_eth_address);
            let ethBal = await walletBalance(address);
            setWalletBal(ethBal)
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id))
            getBal()
    }, [address, isReferesh])
    return (
        <tr>
            <td className="text-light"><img src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`} alt="" width={20} className="" /> {chain?.nativeCurrency.symbol}</td>
            <td className="text-light">{
                walletBal !== null ? Number(walletBal).toFixed(5) :
                    <Skeleton
                        count={1}
                        inline
                        width={100}
                    />
            }</td>
            <td>
                <MintModal tokenAddress={ethAddress} mintType="native" />
            </td>
            <td>
                {" "}
                <DetailModal tokenAddress={ethAddress} mintType="native" />
            </td>
        </tr>
    )
}

export default NativeCoinDetail
