function wasd_test:_wasd/walking
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set if_result_3538 sandstone_cond 0
scoreboard players set cond_3 sandstone_cond 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_3 sandstone_cond 1
execute unless score cond_3 sandstone_cond matches 1 run function wasd_test:main/execute_as/else/execute_as/if
title @s actionbar "Still"
execute as @s[tag=wasd.is_moving] run function wasd_test:main/execute_as/else/execute_as/execute_as