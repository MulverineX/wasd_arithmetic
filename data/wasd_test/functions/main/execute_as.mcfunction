scoreboard players reset cond_18 sandstone
execute if predicate wasd_test:is_mounted run function wasd_test:main/execute_as/if
execute if score cond_18 sandstone matches 0.. if entity @s[tag=wasd_test.do_unmounted] run function wasd_test:main/execute_as/else_if