title @s actionbar {"text": "↘", "color": "gold", "bold": true}
execute rotated ~ 0 as @e[type=minecraft:minecart, limit=1, sort=nearest] positioned as @s run teleport @s ^-0.125 ^ ^-0.125
scoreboard players set if_result_7329 sandstone_cond 1