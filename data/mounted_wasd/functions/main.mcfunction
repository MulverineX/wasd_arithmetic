# Clear Output & Output Directions
scoreboard players set @s mp_wasd.exc_in 0
tag @s remove mp_wasd.forward
tag @s remove mp_wasd.left
tag @s remove mp_wasd.backward
tag @s remove mp_wasd.right

# Get player scores
execute store result score @s mp_wasd.pos_dx run data get entity @s Motion[0] 1000
execute store result score @s mp_wasd.pos_dz run data get entity @s Motion[2] 1000

# Set Moving Tag
tag @s[tag=mp_wasd.moving] remove mp_wasd.moving
tag @s[scores={mp_wasd.pos_dx=1..}] add mp_wasd.moving
tag @s[scores={mp_wasd.pos_dx=..-1}] add mp_wasd.moving
tag @s[scores={mp_wasd.pos_dz=1..}] add mp_wasd.moving
tag @s[scores={mp_wasd.pos_dz=..-1}] add mp_wasd.moving


# Calculate Direction
execute if entity @s[tag=mp_wasd.moving] run function mounted_wasd:calculate

execute if entity @s[tag=mp_wasd.moving] run function mounted_wasd:output