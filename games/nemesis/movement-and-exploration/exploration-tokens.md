# Exploration Tokens

Category: Movement and Exploration - Exploration Tokens
Related Systems: Movement, Fire, Slime, Rooms, Noise

Exploration tokens are a key element of revealing the ship's layout and immediate hazards in Nemesis. They are placed **face-down** on each Room tile during game setup.

## When They Are Revealed

When a Character performs a Movement Action and enters an unexplored Room (face-down Room tile and Exploration token), the Room tile is turned face-up first.
**Immediately after**, the Exploration Token lying on that Room tile is revealed (turned **face-up**).

**Important**: Exploration tokens are only resolved once, when the unexplored Room is entered for the first time.

## Resolution Steps

1. **Set Up the Amount of Items in a Room**: The front side of each Exploration token displays a number. After revealing the token, the Room tile is rotated so that this number faces the Item Counter symbol on the board. This number indicates the exact amount of Items that can be obtained from this Room through a Search Action. This step does not apply to the Nest or Rooms Covered in Slime.
2. **Resolve Special Effect**: The Exploration token also displays a special effect symbol. This effect is resolved immediately.
   **Note**: After an Exploration token is fully resolved, it is removed from the game.

## Types of Special Effects

- **Silence**:
  - Nothing happens.
  - No Noise roll is performed for this movement.
  - However, if the Character has a Slime marker on their board, this effect is instead treated as "Danger".
- **Danger**:
  - No Noise roll is performed for this movement.
  - If there **is an Intruder in a neighboring Room** (and not in Combat with any Character), that Intruder (or all eligible Intruders) moves to the Character's Room.
  - If there are **no Intruders in neighboring Rooms** (or they are in Combat), a Noise marker is placed in every connected Corridor (including Technical Corridors if applicable) that does not already have one.
- **Slime**:
  - A Slime marker is placed on the Character's board.
- **Fire**:
  - A Fire marker is placed in the Room.
- **Malfunction**:
  - A Malfunction marker is placed in the Room.
- **Doors**:
  - A Door token is placed in the Corridor by which the Character **entered** that Room.
  - **Important**: If this effect occurs when moving through Technical Corridors (via certain action or item cards), you ignore the token's effect because the direction cannot be determined.

## Important Interactions

- If a Character uses **Careful Movement** or the **Reconnaissance** Action card and reveals an Exploration token with a Danger / Silence result, the careful movement/reconnaissance rule takes precedence and **cancels out** the Noise roll and Danger / Silence effects.
- When Intruders move into unexplored Rooms (e.g., due to an Event card), the Room tile and its Exploration token are **not revealed**.
- Special Rooms (Hibernatorium, Cockpit, and Engines) are treated as **already explored** at the start of the game, so they **do not** have Exploration tokens.
