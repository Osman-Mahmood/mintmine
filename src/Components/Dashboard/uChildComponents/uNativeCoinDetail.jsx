import { useEffect, useState } from 'react'
import { erc20Instance, factoryInstance, getChainDetails } from '../../../config';
import { useAccount, useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'react-bootstrap';
import Transfer from '../../Modals/Transfer';
import Claim from '../../Modals/Claim';
import TransferModal from './Modals/TransferModal';
import ClaimModal from './Modals/ClaimModal';
import { useSelector } from 'react-redux';

function UNativeCoinDetail() {
    const { isReferesh } = useSelector((state) => state.refreshFunctions)
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork()
    const [uNativeBal, setUNativeBal] = useState(null);
    const [ethAddress, setEthAddress] = useState("...");
    const nativeUBal = async () => {
        try {

            let contract = await factoryInstance(chain.id)
            let u_eth_address = await contract.deployedAddressOfEth();
            setEthAddress(u_eth_address);
            const new_instance = await erc20Instance(u_eth_address);
            const u_eth_bal = await new_instance.balanceOf(address);
            setUNativeBal(ethers.utils.formatEther(u_eth_bal));
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id))
            nativeUBal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReferesh])
    return (
        <tr>
            <td className="text-light">u{chain?.nativeCurrency.symbol}</td>
            <td className="text-light">{
                uNativeBal !== null ? Number(uNativeBal).toFixed(5) :
                    <Skeleton
                        count={1}
                        inline
                        width={100}
                    />
            }</td>
            <td>
                <Button
                    variant="primary"
                    className="font_size border bg-transparent px-2 p-1 text-clr "
                >
                    Add to Wallet
                </Button>
            </td>
            <td>
                {" "}
                <TransferModal tokenAddress={ethAddress} mintType="native" />
            </td>
            <td>
                {" "}
                <ClaimModal tokenAddress={ethAddress} mintType="native" />
            </td>

        </tr>
    )
}

export default UNativeCoinDetail
