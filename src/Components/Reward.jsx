import React, { useEffect, useState } from 'react'
import All from '../assets/All.svg'
import { erc20Instance, factoryInstance, getChainDetails, remortFactoryInstnce } from '../config';
import { useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import Countdown from 'react-countdown';
import ShowSymbol from './Tokens/childComponents/ShowSymbol';
const Tokens = () => {

  const { chain } = useNetwork()

  let [winnerAddress, setWinnerAddress] = useState(null);
  const getWinnerAddress = async () => {
    try {
      const contract = await remortFactoryInstnce(chain?.id)
      let winnerAdd = await contract.get_currentWinner();
      setWinnerAddress(winnerAdd);
    } catch (error) {
      console.error("error while get winner address", error);
    }
  }
  const [winnerHistory, setWinnerHistory] = useState([])
  const getWinnerInvestHistory = async () => {
    try {
      const contract = await remortFactoryInstnce(chain?.id)
      const currentPeriod = await contract.get_PreviousPeriod();
      const winnerAdd = await contract.get_currentWinner();
      const investmentDetails = await contract.getInvestmentDetails_OfUser_ForPeriod(winnerAdd, currentPeriod);
      setWinnerHistory(investmentDetails)
      //amount
      //uTokenAddress
      console.log("currentPeriod", investmentDetails[0]);
    } catch (error) {
      console.error("error while get winner invest history", error);
    }
  }
  let [winnerTime, setWinnerTime] = useState(null);
  const getWinnerTime = async () => {
    try {
      setWinnerTime(null);
      let contract = await remortFactoryInstnce(chain?.id)
      let { startTime, endTime } =
        await contract.get_CurrentPeriod_StartAndEndTime();
      setWinnerTime(endTime.toNumber());
    } catch (error) {
      console.error("error while get winner time", error);
    }
  };
  useEffect(() => {
    getWinnerTime()
    getWinnerAddress()
    getWinnerInvestHistory()
  }, []);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      getWinnerTime();
      getWinnerAddress()
      getWinnerInvestHistory()
    } else {
      return (
        <div className='d-flex justify-content-between mt-3'>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-3'>
              {days}
            </h1>
            <p className='text-white'>Days</p>
          </div>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-3'>
              {hours}
            </h1>
            <p className='text-white'>Hours</p>
          </div>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-3'>
              {minutes}
            </h1>
            <p className='text-white'>Minutes</p>
          </div>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-3'>
              {seconds}
            </h1>
            <p className='text-white'>Seconds</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='container pt-5'>
      <div className='row time_box mt-3'>
        <div className='col-lg-12 d-lg-flex d-block align-items-center gap-3'>
          <div className='col-lg-6 col-12'>
            <h5 className='text-white'>Every 369 hours a participant  is randomly selected.</h5>
            <h5 className='text-white'>Follow u369 on social media to get notified if you win.</h5>

          </div>
          <div className='col-lg-6'>
            {winnerTime == null ? (
              // <Skeleton  />
              <div className='d-flex justify-content-between mt-3'>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-3'>
                    0
                  </h1>
                  <p className='text-white'>Days</p>
                </div>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-3'>
                    0
                  </h1>
                  <p className='text-white'>Hours</p>
                </div>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-3'>
                    0
                  </h1>
                  <p className='text-white'>Minutes</p>
                </div>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-3'>
                    0
                  </h1>
                  <p className='text-white'>Seconds</p>
                </div>
              </div>
            ) : (
              <Countdown
                date={Date.now() + (parseInt(winnerTime) * 1000 - Date.now())}
                renderer={renderer}
              />
            )}
          </div>
        </div>
      </div>
      <div className='row p-0 mt-5'>
        <div className='col-lg-12'>
          <h3 className='text-center text-white'>Winner: {winnerAddress}</h3>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th className='text-white'>#</th>
                <th className='text-white'>Symbol</th>
                <th className='text-white'>Amount</th>
                <th className='text-white'>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                winnerHistory?.map((item, index) => {
                  return <tr>
                    <td className='text-white'>{index+1}</td>
                    <td align='center' className='text-white'> <ShowSymbol token={item.uTokenAddress} /> </td>
                    <td className='text-white'>{ethers.utils.formatEther(item.amount)}</td>
                    <td className='text-white'>{Date.now()}</td>
                  </tr>
                })
              }


            </tbody>
          </Table>

        </div>
      </div>
    </div>
  )
}

export default Tokens
