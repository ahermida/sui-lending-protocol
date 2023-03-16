module protocol::mint {
  use std::type_name::{Self, TypeName};
  use sui::coin::{Self, Coin};
  use sui::tx_context::{Self ,TxContext};
  use sui::clock::{Self, Clock};
  use sui::event::emit;
  use sui::transfer;
  use sui::balance;
  use protocol::reserve::{Self, Reserve};
  use protocol::reserve_vault::ReserveCoin;
  use sui::balance::Balance;
  
  struct MintEvent has copy, drop {
    minter: address,
    depositAsset: TypeName,
    depositAmount: u64,
    mintAsset: TypeName,
    mintAmount: u64,
    time: u64,
  }
  
  public entry fun mint<T>(
    reserve: &mut Reserve,
    clock: &Clock,
    coin: Coin<T>,
    ctx: &mut TxContext,
  ) {
    let now = clock::timestamp_ms(clock);
    let mintBalance = mint_(reserve, now, coin, ctx);
    transfer::transfer(coin::from_balance(mintBalance, ctx), tx_context::sender(ctx));
  }
  
  #[test_only]
  public fun mint_t<T>(
    reserve: &mut Reserve,
    now: u64,
    coin: Coin<T>,
    ctx: &mut TxContext,
  ): Balance<ReserveCoin<T>> {
    mint_(reserve, now, coin, ctx)
  }
  
  fun mint_<T>(
    reserve: &mut Reserve,
    now: u64,
    coin: Coin<T>,
    ctx: &mut TxContext,
  ): Balance<ReserveCoin<T>> {
    let depositAmount = coin::value(&coin);
    let mintBalance = reserve::handle_mint(reserve, coin::into_balance(coin), now);
    
    let sender = tx_context::sender(ctx);
    
    emit(MintEvent{
      minter: sender,
      depositAsset: type_name::get<T>(),
      depositAmount,
      mintAsset: type_name::get<ReserveCoin<T>>(),
      mintAmount: balance::value(&mintBalance),
      time: now,
    });
    
    mintBalance
  }
}
