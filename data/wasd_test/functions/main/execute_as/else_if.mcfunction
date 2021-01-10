function wasd_test:_wasd/walking
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set cond_59 sandstone 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_59 sandstone 1
execute unless score cond_59 sandstone matches 1 run function wasd_test:_wasd/get_direction
title @s actionbar "Still"
execute if entity @s[tag=wasd.is_moving] run function wasd_test:main/execute_as/else_if/if
scoreboard players set cond_18 sandstone 1