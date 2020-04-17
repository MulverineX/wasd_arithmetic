# mountedwasd
A Minecraft Datapack. Detection of local direction input (ie wasd) for when the player is on a mount.

Usage:
Run mounted_wasd:main as the player to get movement information
ie. `execute as @a if predicate mounted_wasd:mounted run function mounted_wasd:main` (Mounted predicate checks if the player is riding anything; nonessential, not supported in 1.14 nor 1.13).

This will give the player an exclusive input score & inclusive input tags all described in mounted_wasd:output
ie. `execute as @a[tag=mp_wasd.forward] run title @s title {"text":"Forward"}` will display a title for mounted players that are inputting forward movement, even if it includes left or right.
