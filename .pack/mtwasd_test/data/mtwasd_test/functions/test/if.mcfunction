function mtwasd_test:_wasd/get_input
title @s actionbar ""
execute as @s[tag=mountedwasd.is_moving] run function mtwasd_test:test/if/execute_as
scoreboard players set if_result_9409 sandstone_cond 1