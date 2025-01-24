import { SuiTxBlock } from '@scallop-io/sui-kit';
import { protocolTxBuilder } from 'contracts/protocol';
import { riskModels } from './risk-models';
import { interestModels } from './interest-models';
import { outflowRateLimiters } from './outflow-rate-limiters';
import { SupplyLimits } from './supply-limits';
import { borrowFees } from './borrow-fee';
import { FlashloanFees } from './flashloan-fees';
import { incentiveRewardFactors } from './incentive-reward-factors';

import { pythRuleTxBuilder } from 'contracts/sui_x_oracle/pyth_rule';
import { oracles } from './asset-oracles';

import { decimalsRegistryTxBuilder } from 'contracts/libs/coin_decimals_registry';

import { coinTypes, coinMetadataIds } from './chain-data';
import { buildMultiSigTx } from './multi-sig';
import { BorrowLimits } from './borrow-limits';

async function addNewPool_Blub() {
  const tx = new SuiTxBlock();
  const coin = 'blub';
  const dustCoinId = '0x307dc3b470b7b4718a59f26efcc9229a4407b15fbbd031eaf1147535a7626c4c'; // This is used to keep a minimum amount of the coin in the pool
  const coinType = coinTypes[coin];
  protocolTxBuilder.addInterestModel(tx, interestModels[coin], coinType);
  protocolTxBuilder.addLimiter(tx, outflowRateLimiters[coin], coinType);
  protocolTxBuilder.setSupplyLimit(tx, SupplyLimits[coin], coinType);
  protocolTxBuilder.setBorrowLimit(tx, BorrowLimits[coin], coinType);
  protocolTxBuilder.updateIsolatedAssetStatus(tx, true, coinType);
  protocolTxBuilder.updateBorrowFee(tx, borrowFees[coin], coinType);
  protocolTxBuilder.setFlashloanFee(tx, FlashloanFees[coin], coinType);
  protocolTxBuilder.setIncentiveRewardFactor(tx, incentiveRewardFactors[coin], coinType);

  pythRuleTxBuilder.registerPythPriceInfoObject(tx, oracles[coin].pythPriceObjectId, coinType);

  decimalsRegistryTxBuilder.registerDecimals(tx, coinMetadataIds[coin], coinType);

  // Burn dust to keep a minimum amount of the coin in the pool
  const dustToBurn = protocolTxBuilder.supplyBaseAsset(tx, dustCoinId, coinType);
  const voidAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';
  tx.transferObjects([dustToBurn], voidAddress);


  return buildMultiSigTx(tx);
}

// addNewPool_Blub().then(console.log);