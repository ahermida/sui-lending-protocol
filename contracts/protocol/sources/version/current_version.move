module protocol::current_version {

  // Increment this each time the protocol upgrades.
  const CURRENT_VERSION: u64 = 6;

  public fun current_version(): u64 {
    CURRENT_VERSION
  }
}
