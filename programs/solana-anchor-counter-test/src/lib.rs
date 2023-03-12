use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_anchor_counter_test {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }
}


// contexts for the functions
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = Counter::SIZE)]
    // (* vedi sotto) quando si inizializza un nuovo account bisogna specificare la dimenisone,
    // per questo viene preso il valore dalla proprietà che abbiamo creato sotto
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}


// data structure for the state
#[account]
pub struct Counter {
    pub count: u64, // 8 bytes
}

impl Counter {
    pub const SIZE: usize = 8 + 8; // 8 bytes + 8 bytes for the counter
}