function wasd_test:_wasd/mounted
tag @s remove wasd.is_moving
# Ensure there is a vector
scoreboard players set if_result_3554 sandstone_cond 0
scoreboard players set cond_2 sandstone_cond 0
execute if score @s wasd.vec_x matches 0 if score @s wasd.vec_z matches 0 run scoreboard players set cond_2 sandstone_cond 1
execute unless score cond_2 sandstone_cond matches 1 run function wasd_test:main/execute_as/if/if
title @s actionbar "Still"
execute as @s[tag=wasd.is_moving] run function wasd_test:main/execute_as/if/execute_as
scoreboard players set if_result_2724 sandstone_cond 1