import { InterestModel } from '../contracts/protocol';
import {
  SupportedBaseAssets,
  coinDecimals,
} from './chain-data';

const scale = 10 ** 12;
const interestRateScale = 10 ** 7;
const midKink = 60 * (scale / 100); // 60%
const highKink = 90 * (scale / 100); // 90%
const revenueFactor = 5 * (scale / 100); // 5%
const borrowWeight = scale; // 1

const getRatePerSec = (ratePerYear: number) => {
  const secsPerYear = 365 * 24 * 60 * 60;
  return Math.floor(ratePerYear * (scale / 100) * interestRateScale / secsPerYear);
}
export const suiInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(10), // 10%
  borrowRateOnHighKink: getRatePerSec(100), // 100%
  maxBorrowRate: getRatePerSec(300), // 300%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.sui - 2), // 0.01 SUI
};

export const cetusInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(10), // 10%
  borrowRateOnHighKink: getRatePerSec(100), // 100%
  maxBorrowRate: getRatePerSec(300), // 300%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.cetus), // 1 CETUS
}

export const wormholeEthInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(10), // 10%
  borrowRateOnHighKink: getRatePerSec(100), // 100%
  maxBorrowRate: getRatePerSec(300), // 300%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.wormholeEth - 3), // 0.001 ETH
};

export const wormholeBtcInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(10), // 10%
  borrowRateOnHighKink: getRatePerSec(100), // 100%
  maxBorrowRate: getRatePerSec(300), // 300%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.wormholeBtc - 4), // 0.0001 BTC
}

export const wormholeSolInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(10), // 10%
  borrowRateOnHighKink: getRatePerSec(100), // 100%
  maxBorrowRate: getRatePerSec(300), // 300%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.wormholeSol - 2), // 0.01 SOL
}

export const wormholeAptInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(10), // 10%
  borrowRateOnHighKink: getRatePerSec(100), // 100%
  maxBorrowRate: getRatePerSec(300), // 300%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.wormholeApt - 2), // 0.01 APT
}

export const wormholeUsdcInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(8), // 8%
  borrowRateOnHighKink: getRatePerSec(50), // 50%
  maxBorrowRate: getRatePerSec(150), // 150%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.wormholeUsdc - 2), // 0.01 USDC
}

export const wormholeUsdtInterestModel: InterestModel = {
  baseBorrowRatePerSec: 0,
  interestRateScale,

  borrowRateOnMidKink: getRatePerSec(8), // 8%
  borrowRateOnHighKink: getRatePerSec(50), // 50%
  maxBorrowRate: getRatePerSec(150), // 150%

  midKink, // 60%
  highKink, // 90%

  revenueFactor, // 5%
  borrowWeight, // 1
  scale,
  minBorrowAmount: 10 ** (coinDecimals.wormholeUsdt - 2), // 0.01 USDT
}

export const interestModels: Record<SupportedBaseAssets, InterestModel> = {
  sui: suiInterestModel,
  cetus: cetusInterestModel,
  wormholeEth: wormholeEthInterestModel,
  wormholeUsdc: wormholeUsdcInterestModel,
  wormholeUsdt: wormholeUsdtInterestModel,
  wormholeBtc: wormholeBtcInterestModel,
  wormholeSol: wormholeSolInterestModel,
  wormholeApt: wormholeAptInterestModel,
}