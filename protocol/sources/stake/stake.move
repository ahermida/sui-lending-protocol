module protocol::stake {
  
  use sui::tx_context::TxContext;
  use protocol::stake_reward::STAKE_REWARD;
  
  use stake::stake_sea;
  use stake::stake_sea::StakeSea;
  use stake::admin::StakeAdminCap;
  
  struct ZqStake has drop {}
  
  public(friend) fun new_stake_sea(ctx: &mut TxContext)
  : (StakeSea<ZqStake, STAKE_REWARD>, StakeAdminCap<ZqStake>) {
    stake_sea::new<ZqStake, STAKE_REWARD>(ZqStake{}, ctx)
  }
}
