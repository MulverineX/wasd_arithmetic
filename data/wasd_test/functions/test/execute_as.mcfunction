function wasd_test:_wasd/mounted
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set if_result_6697 sandstone_cond 0
scoreboard players set cond_2 sandstone_cond 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_2 sandstone_cond 1
execute unless score cond_2 sandstone_cond matches 1 run function wasd_test:test/execute_as/if
title @s actionbar "Still"
execute as @s[tag=wasd.is_moving] run function wasd_test:test/execute_as/execute_as