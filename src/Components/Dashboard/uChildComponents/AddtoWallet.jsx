import { Button } from 'react-bootstrap'
import React from 'react'
import { erc20Instance } from '../../../config';
import toast from 'react-hot-toast';
import {IoWalletOutline} from 'react-icons/io5'

function AddtoWallet({ tokenAddress }) {
    const addToken = async () => {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const contract = await erc20Instance(tokenAddress);
            const symbol = await contract.symbol()
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: 18,
                    },
                },
            });

            if (wasAdded) {
                toast.success('Added successfully');
            } else {
                toast.error('Your loss!');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button
            variant="primary"
            className="font_size border_detail  bg-transparent px-2 p-1 text-clr "
            onClick={addToken}
        >
            Add to Wallet
        </Button>
        //    <IoWalletOutline />
    )
}

export default AddtoWallet
