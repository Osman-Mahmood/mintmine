import React, { useEffect, useState } from 'react'
import All from '../assets/All.svg'
import { erc20Instance, factoryInstance, getChainDetails, remortFactoryInstnce } from '../config';
import { useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
const Tokens = () => {

  const { chain } = useNetwork()
  const [rewarArray, setRewardArray] = useState([]);
  let [winnerTime, setWinnerTime] = useState(null);
  let [winnerAddress, setWinnerAddress] = useState(null);
  let [winnerLimitTime, setWinnerLimitTime] = useState(null);
  const [isClaimEnabled, setIsClaimEnables] = useState(true);
  const withDrawReward = async () => {
    try {
      let contract = await factoryInstance(chain.id)
      const tx = await contract.withdrawReward();
      await tx.wait();
      getWinnerTime();
      setIsClaimEnables(false);
      rewardHistory();
      toast.success("Bouns cashed successfully");
    } catch (error) {
      console.error("error while withdraw reward",error );
    }
  };
  const claimButtonStatus = async () => {
    try {
      let contract = await remortFactoryInstnce(chain?.id)
      const previousPeriod = await contract.get_PreviousPeriod();
      const isDepositedInPeriod = await contract.IsDepositedInPeriod(
        previousPeriod
      );
      if (isDepositedInPeriod) {
        const rewardLimit = await contract.get_TimeLimitForWinnerForCurrentPeriod();
        const currentTime = Date.now() / 1000;
        if (currentTime > rewardLimit.toNumber()) {
          setIsClaimEnables(false);
        } else {
          const isRewardCollected = await contract.IsRewardCollectedOfPeriod(previousPeriod);
          isRewardCollected ? setIsClaimEnables(false) : setIsClaimEnables(true);
        }
      } else {
        setIsClaimEnables(false);
      }
    } catch (error) {
      console.error("error while claim button status", error);
    }
  };
  const rewardHistory = async () => {
    try {
      let contract = await remortFactoryInstnce(chain?.id)
      const pendingPeriodsForReward = await contract.pendingPeriodsForReward();
      console.log("rewardEth", pendingPeriodsForReward);
      if (pendingPeriodsForReward.length == 0) {
        setRewardArray([]);
        return;
      } else {
        let previousArr = [];
        const rewardEth = await contract.rewardHistoryForEth();
        if (ethers.utils.formatEther(rewardEth) > 0) {
          let chainDetail = getChainDetails(chain?.id)
          let obj = {};
          obj.symbol = chainDetail == null ? "MATIC" : chainDetail.networkId;
          obj.token = "";
          obj.amount = ethers.utils.formatEther(rewardEth);
          previousArr.push(obj);
        }
        for (let index = 0; index < pendingPeriodsForReward.length; index++) {
          let pending = await contract.rewardHistoryForTokensForPeriod(
            pendingPeriodsForReward[index].toNumber()
          );
          for (let i = 0; i < pending.length; i++) {
            let { token, amount } = pending[i];
            let tokenContract = await erc20Instance(token);
            let obj = {};
            if (previousArr.length == 0) {
              obj.symbol = await tokenContract.symbol();
              obj.token = token;
              obj.amount = Number(ethers.utils.formatEther(amount));
              previousArr.push(obj);
            } else {
              const found = previousArr.find(
                (item, index) => item.token == token
              );
              if (found == undefined) {
                obj.symbol = await tokenContract.symbol();
                obj.token = token;
                obj.amount = Number(ethers.utils.formatEther(amount));
                previousArr.push(obj);
              } else {
                let foundIndex = previousArr.indexOf(found);
                previousArr[foundIndex].amount =
                  Number(ethers.utils.formatEther(amount)) +
                  previousArr[foundIndex].amount;
              }
            }
          }
        }
        console.log("previousArr", previousArr);
        setRewardArray(previousArr);
      }
    } catch (error) {
      setRewardArray([]);
      console.error("error while withdraw reward", error);
    }
  };

  const getWinnerTime = async () => {
    try {
      setWinnerTime(null);
      setWinnerLimitTime(null);
      let contract = await remortFactoryInstnce(chain?.id)
      let { startTime, endTime } =
        await contract.get_CurrentPeriod_StartAndEndTime();
      setWinnerTime(endTime.toNumber());

      let winnerAdd = await contract.get_currentWinner();
      setWinnerAddress(winnerAdd);
      let time = await contract.get_TimeLimitForWinnerForCurrentPeriod();
      setWinnerLimitTime(time.toNumber());
      console.log("time, ", time.toNumber());
    } catch (error) {
      console.error("error while get winner time", error);
    }
  };
  useEffect(() => {
    getWinnerTime()
    rewardHistory();
  }, []);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      getWinnerTime();
      rewardHistory();
      claimButtonStatus()
      // isRewardClaimed();
    } else {
      return (
        <div className="new_box p-3 d-flex rounded justify-content-around">
          <span className="text-dark ms-2 ">
            <h4>Every 369 hours a winner is randomly selected.</h4>
          </span>
          <div className="d-block text-center ">
            <h5>{days}</h5>
            <div className="text-primary mt-1 ">Days</div>
          </div>
          <div className="d-block  text-center">
            <h5>{hours}</h5>
            <div className="text-primary mt-1 ">Hours</div>
          </div>
          <div className="d-block  text-center">
            <h5>{minutes}</h5>
            <div className="text-primary mt-1 ">Minutes</div>
          </div>
          {minutes <= 0 && (
            <div className="d-block text-center">
              <h5>{seconds}</h5>
              <div className="text-primary mt-1 ">Seconds</div>
            </div>
          )}
        </div>
      );
    }
  };
  const withDrawLimitRender = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      setIsClaimEnables(false);
      // isRewardClaimed();
      return (
        <div className="timer text-danger d-flex">Claim Time Finished</div>
      );
    } else {
      setIsClaimEnables(isClaimEnabled);
      return (
        <div className="timer text-dark d-flex">
          <li>{days}</li>
          <li>{hours}</li>
          <li>{minutes}</li>
          <li>{seconds}</li>
        </div>
      );
    }
  };
  return (
    <div className='container pt-5'>
      <div className='row'>
        <div className='col-lg-12 d-lg-flex d-bloc gap-3 px-0'>
          <div className='col-lg-6 col-12 time_box justify-content-center'>
            <h5 className='text-white text-center mt-3 mb-2'>Participant gets this reward</h5>
            <div className='justify-content-center text-center mt-3' >

              <button className='w-75 matic p-2 border-0'><img src={All} alt="" /> 10 MATIC</button>
              <button className='protect w-75 mt-3 mb-4' onClick={withDrawReward}>Claim</button>
            </div>
          </div>
          <div className='col-lg-6 col-12 time_box'>
            <h5 className='text-white text-center mt-3 mb-2'>Time to claim</h5>
            <div className='d-flex justify-content-between mt-3'>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row time_box mt-3'>
        <div className='col-lg-12 d-lg-flex d-block align-items-center gap-3'>
          <div className='col-lg-6 col-12'>
            <h5 className='text-white'>Every 369 hours a participant  is randomly selected.</h5>
          </div>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-between mt-3'>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                <p className='text-white'>Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tokens
