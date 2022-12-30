module protocol::debt_evaluator {
  
  use std::vector;
  use math::fr::{Self, Fr};
  use protocol::position::{Self, Position};
  use protocol::coin_decimals_registry::{Self, CoinDecimalsRegistry};
  use protocol::price::value_usd;
  
  // sum of every debt usd value
  // value = price x amount
  public fun debts_value_usd(
    position: &Position,
    coinDecimalsRegsitry: &CoinDecimalsRegistry,
  ): Fr {
    let debtTypes = position::debt_types(position);
    let totalValudInUsd = fr::fr(0, 1);
    let (i, n) = (0, vector::length(&debtTypes));
    while( i < n ) {
      let debtType = *vector::borrow(&debtTypes, i);
      let decimals = coin_decimals_registry::decimals(coinDecimalsRegsitry, debtType);
      let (debtAmount, _) = position::debt(position, debtType);
      let coinValueInUsd = value_usd(debtType, debtAmount, decimals);
      totalValudInUsd = fr::add(totalValudInUsd, coinValueInUsd);
      i = i + 1;
    };
    totalValudInUsd
  }
}