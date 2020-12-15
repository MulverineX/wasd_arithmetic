scoreboard players set @s mtwasd.input 0
tag @s remove mountedwasd.forward
tag @s remove mountedwasd.backward
tag @s remove mountedwasd.left
tag @s remove mountedwasd.right
tag @s remove mountedwasd.is_moving
execute store result score @s mtwasd.vec_x run data get entity @s Motion[0] 1000
execute store result score @s mtwasd.vec_z run data get entity @s Motion[1] 1000
scoreboard players set if_result_2920 sandstone_cond 0
execute unless score @s mtwasd.vec_x matches 0 run function mountedwasd:get_input/if
scoreboard players set if_result_6300 sandstone_cond 0
execute unless score @s mtwasd.vec_z matches 0 run function mountedwasd:get_input/if_2
execute as @s[tag=mountedwasd.is_moving] run function mountedwasd:get_input/execute_as