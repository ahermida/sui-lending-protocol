import {
  SupportedBaseAssets,
  coinDecimals,
} from './chain-data';


export const SupplyLimits: Record<SupportedBaseAssets, number> = {
  sui: 1e8 * Math.pow(10, coinDecimals.sui),
  wormholeUsdc: 1e8 * Math.pow(10, coinDecimals.wormholeUsdc),
  wormholeUsdt: 1e8 * Math.pow(10, coinDecimals.wormholeUsdt),
  sca: 1e7 * Math.pow(10, coinDecimals.sca),
  afSui: 1e7 * Math.pow(10, coinDecimals.afSui),
  haSui: 1e7 * Math.pow(10, coinDecimals.haSui),
  vSui: 1e7 * Math.pow(10, coinDecimals.vSui),
  cetus: 2e6 * Math.pow(10, coinDecimals.cetus),
  wormholeEth: 1e4 * Math.pow(10, coinDecimals.wormholeEth),
  wormholeBtc: 2e1 * Math.pow(10, coinDecimals.wormholeBtc),
  wormholeSol: 2e4 * Math.pow(10, coinDecimals.wormholeSol),
  nativeUsdc: 5e7 * Math.pow(10, coinDecimals.nativeUsdc),
  sbEth: 5e3 * Math.pow(10, coinDecimals.sbEth),
  deep: 25e6 * Math.pow(10, coinDecimals.deep), // 25M
  fud: 1e12 * Math.pow(10, coinDecimals.fud),
}
