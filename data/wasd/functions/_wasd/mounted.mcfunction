tag @s add wasd.is_mounted
# Store motion to scores for access
execute store result score @s wasd.vec_x run data get entity @s Motion[0] 1000
execute store result score @s wasd.vec_z run data get entity @s Motion[2] 1000
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set cond_17 sandstone 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_17 sandstone 1
execute unless score cond_17 sandstone matches 1 run function wasd:_wasd/get_direction