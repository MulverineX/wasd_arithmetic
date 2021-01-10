tag @s remove wasd.is_mounted
# Store position to scores for access
execute store result score @s wasd.cvec_x run data get entity @s Pos[0] 1000
execute store result score @s wasd.cvec_z run data get entity @s Pos[2] 1000
scoreboard players operation @s wasd.vec_x = @s wasd.cvec_x
scoreboard players operation @s wasd.vec_x -= @s wasd.ovec_x
scoreboard players operation @s wasd.vec_z = @s wasd.cvec_z
scoreboard players operation @s wasd.vec_z -= @s wasd.ovec_z
scoreboard players operation @s wasd.ovec_x = @s wasd.cvec_x
scoreboard players operation @s wasd.ovec_z = @s wasd.cvec_z
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set cond_15 sandstone 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_15 sandstone 1
execute unless score cond_15 sandstone matches 1 run function wasd:_wasd/get_direction