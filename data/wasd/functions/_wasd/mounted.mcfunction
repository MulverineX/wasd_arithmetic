# Store motion to scores for access
execute store result score @s wasd.vec_x run data get entity @s Motion[0] 1000
execute store result score @s wasd.vec_z run data get entity @s Motion[2] 1000
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set if_result_4757 sandstone_cond 0
scoreboard players set cond_1 sandstone_cond 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_1 sandstone_cond 1
execute unless score cond_1 sandstone_cond matches 1 run function wasd:_wasd/mounted/if