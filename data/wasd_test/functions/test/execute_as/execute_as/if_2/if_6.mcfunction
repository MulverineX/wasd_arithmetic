title @s actionbar {"text": "DA", "color": "gold", "bold": true}
execute rotated ~ 0 as @e[type=minecraft:minecart, limit=1, sort=nearest] positioned as @s run teleport @s ^-0.125 ^ ^0.125
scoreboard players set if_result_9428 sandstone_cond 1