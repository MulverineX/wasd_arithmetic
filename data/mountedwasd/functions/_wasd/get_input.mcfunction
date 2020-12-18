# Clear flags
scoreboard players set @s mtwasd.loc_dir 0
tag @s remove mountedwasd.forward
tag @s remove mountedwasd.backward
tag @s remove mountedwasd.left
tag @s remove mountedwasd.right
tag @s remove mountedwasd.is_moving
# Store motion to scores for access
execute store result score @s mtwasd.vec_x run data get entity @s Motion[0] 1000
execute store result score @s mtwasd.vec_z run data get entity @s Motion[2] 1000
# Ensure there is motion
execute unless score @s mtwasd.vec_x matches 0 run tag @s add mountedwasd.is_moving
execute unless score @s mtwasd.vec_z matches 0 run tag @s add mountedwasd.is_moving
# Run calculations & output
execute as @s[tag=mountedwasd.is_moving] run function mountedwasd:_wasd/get_input/execute_as