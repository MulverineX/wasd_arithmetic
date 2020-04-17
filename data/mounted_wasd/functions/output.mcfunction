## Exclusive Single Inputs
# Forwards
execute if score @s mp_wasd.var matches -225..224 run scoreboard players set @s mp_wasd.exc_in 1
# Strafe Left
execute if score @s mp_wasd.var matches -1125..-676 run scoreboard players set @s mp_wasd.exc_in 2
# Backwards
execute if score @s mp_wasd.var matches 1575..1800 run scoreboard players set @s mp_wasd.exc_in 3
execute if score @s mp_wasd.var matches -1800..-1576 run scoreboard players set @s mp_wasd.exc_in 3
# Strafe Right
execute if score @s mp_wasd.var matches 675..1124 run scoreboard players set @s mp_wasd.exc_in 4

## Exclusive Dual Inputs
# Forwards & Left
execute if score @s mp_wasd.var matches -675..-226 run scoreboard players set @s mp_wasd.exc_in 5
# Forwards & Right
execute if score @s mp_wasd.var matches 225..674 run scoreboard players set @s mp_wasd.exc_in 6
# Backwards & Left
execute if score @s mp_wasd.var matches -1575..-1126 run scoreboard players set @s mp_wasd.exc_in 7
# Backwards & Right
execute if score @s mp_wasd.var matches 1125..1574 run scoreboard players set @s mp_wasd.exc_in 8


## Inclusive Inputs
# Forward
execute if score @s mp_wasd.var matches -675..674 run tag @s[tag=!mp_wasd.backward] add mp_wasd.forward
# Left
execute if score @s mp_wasd.exc_in matches 2 run tag @s add mp_wasd.left
execute if score @s mp_wasd.exc_in matches 5 run tag @s add mp_wasd.left
execute if score @s mp_wasd.exc_in matches 7 run tag @s add mp_wasd.left
# Backwards
execute if score @s mp_wasd.exc_in matches 3 run tag @s[tag=!mp_wasd.forward] add mp_wasd.backward
execute if score @s mp_wasd.exc_in matches 7..8 run tag @s[tag=!mp_wasd.forward] add mp_wasd.backward
# Right
execute if score @s mp_wasd.exc_in matches 4 run tag @s add mp_wasd.right
execute if score @s mp_wasd.exc_in matches 6 run tag @s add mp_wasd.right
execute if score @s mp_wasd.exc_in matches 8 run tag @s add mp_wasd.right