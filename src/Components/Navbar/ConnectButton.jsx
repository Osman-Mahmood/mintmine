import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IoIosArrowDown } from 'react-icons/io'
export const ConnectBtn = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button onClick={openConnectModal} type="button" className='bg-transparent border border-primary text-white px-4 py-2 rounded-pill'>
                                        Connect
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button" className='bg-transparent border border-primary text-white px-4 py-2 rounded-pill'>
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                        className='bg-transparent rounded border-0 p-2'
                                    >
                                        {chain.hasIcon && (
                                            <div className=''
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    background: chain.iconBackground,
                                                    borderRadius: 999,
                                                    marginRight: 4
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <div style={{ width: '35px', height: '35px', marginRight: 8 }}>
                                                        <img
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            style={{ width: '100%', height: '100%' }}
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <IoIosArrowDown className='text-white' style={{ fontSize: '18px' }} />
                                                </div>
                                            </div>
                                        )}
                                    </button>




                                    <button onClick={openAccountModal} type="button" className='bg-transparent border border-light rounded-pill text-white fw-bold '>

                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                        <IoIosArrowDown className='text-white' style={{ fontSize: '18px' }} />

                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};