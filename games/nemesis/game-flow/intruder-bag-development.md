# Intruder Bag Development

Category: Game Flow - Intruder Bag Development
Related Systems: Intruders, Noise, Combat

Intruder Bag Development is a crucial step in the **Event Phase** of each game turn, specifically step 8. It involves drawing a token from the Intruder bag, and the effect depends on the type of token drawn.

After an Intruder token is drawn from the Intruder bag, the effect should be resolved as follows:

- **Larva:**
  - Remove this token from the Intruder bag and add 1 Adult token to the Intruder bag.
- **Creeper:**
  - Remove this token from the Intruder bag and add 1 Breeder token to the Intruder bag.
- **Adult:**
  - All players roll for **Noise** in order.
  - If a player's Character is in Combat with an Intruder, this player **does not perform** a Noise roll.
  - **Return** the Adult Intruder token to the Intruder bag.
- **Breeder:**
  - All players roll for **Noise** in order.
  - If a player’s Character is in Combat with an Intruder, this player **does not perform** a Noise roll.
  - **Return** the Breeder Intruder token to the Intruder bag.
- **Queen:**
  - If there are any Characters in the **Nest Room**, place the Queen miniature in that Room and resolve an Encounter.
  - If there are no Characters in the Nest (or its location has not been discovered yet), add an additional **Intruder Egg** token on the Intruder board.
  - **Return** the Queen Intruder token to the Intruder bag.
- **Blank:**
  - Add 1 Adult Intruder token to the Intruder bag.
  - If there are no Adult Intruder tokens available, nothing happens.
  - **Return** the Blank token to the Intruder bag.
