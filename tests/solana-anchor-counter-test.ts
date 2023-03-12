import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { expect } from "chai";
import { SolanaAnchorCounterTest } from "../target/types/solana_anchor_counter_test";

describe("solana-anchor-counter-test", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaAnchorCounterTest as Program<SolanaAnchorCounterTest>;
  const counterAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().accounts({
      counter: counterAccount.publicKey,
      user: provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers({
      counterAccount
    }).rpc();
    const counter = await program.account.counter.fetch (counterAccount.publicKey);
  });

  it ("Is possible to increment the counter", async() => {
    const counterBefore = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter Before", counterBefore.count.toNumber());

    const tx = await program.methods
    .increment()
    .accounts({
      counter: counterAccount.publicKey,
    })
    .rpc({ commitment: "confirmed" });
    console.log("Your transaction signature", tx);
    
    const counterAfter = await program.account.counter.fetch(
      counterAccount.publicKey
    );
    console.log("Counter After", counterAfter.count.toNumber());

    expect(counterAfter.count.toNumber()).to.be.greaterThan(counterBefore.count.toNumber());
  });

});


