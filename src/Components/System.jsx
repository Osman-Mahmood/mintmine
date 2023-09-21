import React from 'react'

const System = () => {
  return (
    <div className='p-5 mt-3 pt-3'>
      <h2>Reward System</h2>
      <p>Every 369 hours, 30% of all the benefaction fees collected by the smart contract is used to reward a randomly-selected participant.
</p>
<p>Parameters of the reward system (2 examples):</p>
<p>(A) If the 30% of fees inside the prize pool is for example 369 wstETH, and the participant protected 369 wstETH or more, or protected any other supported token with the value equal to 369 wstETH or more >> then the participant, if randomly selected as the winner >> will receive the whole prize pool. The 369 wstETH.
</p>
<p>(B) If the prize pool is 369 wstETH and the participant only protected 1 wstETH, or the equivalent to 1 wstETH in any of the other supported tokens, then the winner gets only up to 1 wstETH from the prize pool and the remaining wstETH stays inside the prize pool to award the next winner/participant every 369 hours.</p>
    </div>
  )
}

export default System
