# # Get Rotation
execute store result score @s wasd.abs_rot run data get entity @s Rotation[0] 1000
scoreboard players add @s[scores={wasd.abs_rot=..0}] wasd.abs_rot 360000
# # Calculate rotation vector
scoreboard players operation @s wasd._calc0 = @s wasd.abs_rot
# Calculate sine using Bhaskara I's approx.
scoreboard players set if_result_9977 sandstone_cond 0
execute if score @s wasd._calc0 matches 180000.. run function wasd_test:_wasd/math/if
execute as @s[tag=wasd._negate] run function wasd_test:_wasd/math/execute_as
scoreboard players set @s wasd._calc1 180000
scoreboard players operation @s wasd._calc1 -= @s wasd._calc0
scoreboard players operation @s wasd._calc1 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 *= @s wasd._calc0
scoreboard players set @s wasd._calc0 40500000
scoreboard players operation @s wasd._calc0 -= @s wasd._calc1
scoreboard players operation @s wasd._calc1 *= 4 sandstone_const
scoreboard players operation @s wasd._calc0 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 /= @s wasd._calc0
execute as @s[tag=wasd._negate] run function wasd_test:_wasd/math/execute_as_2
tag @s remove wasd._negate
# 
scoreboard players operation dxrot wasd._calc0 = @s wasd._calc1
scoreboard players operation dxrot wasd._calc0 *= -1 sandstone_const
scoreboard players operation @s wasd._calc0 = @s wasd.abs_rot
# 
# Calculate cosine ~ `cos(x)=sin(x+90)`
scoreboard players add @s wasd._calc0 90000
# Calculate sine using Bhaskara I's approx.
scoreboard players set if_result_9132 sandstone_cond 0
execute if score @s wasd._calc0 matches 180000.. run function wasd_test:_wasd/math/if_2
execute as @s[tag=wasd._negate] run function wasd_test:_wasd/math/execute_as_3
scoreboard players set @s wasd._calc1 180000
scoreboard players operation @s wasd._calc1 -= @s wasd._calc0
scoreboard players operation @s wasd._calc1 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 *= @s wasd._calc0
scoreboard players set @s wasd._calc0 40500000
scoreboard players operation @s wasd._calc0 -= @s wasd._calc1
scoreboard players operation @s wasd._calc1 *= 4 sandstone_const
scoreboard players operation @s wasd._calc0 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 /= @s wasd._calc0
execute as @s[tag=wasd._negate] run function wasd_test:_wasd/math/execute_as_4
tag @s remove wasd._negate
# 
scoreboard players operation dzrot wasd._calc0 = @s wasd._calc1
# # Calculate dot product
scoreboard players operation @s wasd._calc0 = @s wasd.vec_z
scoreboard players operation temp0 wasd._calc0 = @s wasd.vec_x
scoreboard players operation @s wasd._calc0 *= dxrot wasd._calc0
scoreboard players operation temp0 wasd._calc0 *= dzrot wasd._calc0
scoreboard players operation @s wasd._calc0 -= temp0 wasd._calc0
scoreboard players operation @s wasd._calc0 *= 10 sandstone_const
scoreboard players set if_result_1204 sandstone_cond 0
execute if score @s wasd._calc0 matches ..-1 run function wasd_test:_wasd/math/if_3
# # Calculate determinant
scoreboard players operation @s wasd._calc1 = @s wasd.vec_x
scoreboard players operation temp0 wasd._calc0 = @s wasd.vec_z
scoreboard players operation @s wasd._calc1 *= dxrot wasd._calc0
scoreboard players operation temp0 wasd._calc0 *= dzrot wasd._calc0
scoreboard players operation @s wasd._calc1 += temp0 wasd._calc0
# 
scoreboard players set if_result_5336 sandstone_cond 0
execute if score @s wasd._calc1 matches 1.. run function wasd_test:_wasd/math/if_4
execute if score if_result_5336 sandstone_cond matches 0 if score @s wasd._calc1 matches ..-1 run function wasd_test:_wasd/math/else_if
# # Calculate Local Rotation
# Calculate arc tangent (atan2)
scoreboard players operation @s wasd._calc0 /= @s wasd._calc1
scoreboard players set if_result_7357 sandstone_cond 0
execute if score @s wasd._calc0 matches ..-1 run function wasd_test:_wasd/math/if_5
execute as @s[tag=wasd._flip] run function wasd_test:_wasd/math/execute_as_5
scoreboard players set if_result_9675 sandstone_cond 0
execute if score @s wasd._calc0 matches 11.. run function wasd_test:_wasd/math/if_6
execute as @s[tag=wasd._invert] run function wasd_test:_wasd/math/execute_as_6
scoreboard players operation temp0 wasd._calc0 = @s wasd._calc0
scoreboard players remove temp0 wasd._calc0 10
scoreboard players operation temp1 wasd._calc0 = @s wasd._calc0
scoreboard players operation temp1 wasd._calc0 /= 100 sandstone_const
scoreboard players operation temp1 wasd._calc0 *= 383 sandstone_const
scoreboard players add temp1 wasd._calc0 140
scoreboard players operation temp1 wasd._calc0 /= 100 sandstone_const
scoreboard players operation temp0 wasd._calc0 *= temp1 wasd._calc0
scoreboard players set temp1 wasd._calc0 450
scoreboard players operation temp1 wasd._calc0 -= temp0 wasd._calc0
scoreboard players operation temp1 wasd._calc0 /= 10 sandstone_const
scoreboard players operation @s wasd._calc0 *= temp1 wasd._calc0
execute as @s[tag=wasd._invert] run function wasd_test:_wasd/math/execute_as_7
execute as @s[tag=wasd._flip] run function wasd_test:_wasd/math/execute_as_8
execute as @s[tag=wasd._negate] run function wasd_test:_wasd/math/execute_as_9
scoreboard players set @s[scores={wasd._calc0=-1800}, tag=wasd.forward] wasd._calc0 0
scoreboard players set @s[scores={wasd._calc0=0}, tag=wasd.backward] wasd._calc0 1800
tag @s remove wasd._flip
tag @s remove wasd._invert
tag @s remove wasd._negate
tag @s remove wasd.forward
tag @s remove wasd.backward
# 
# atan2 approximation
# atan2(x) = x(45-(x-1)(14+3.83x))
# atan2(1000x) = (1000x(45000-((1000x-1000)(14000+3.83*1000x))/1000))/1000/1000
# atan2(-x) = -atan2(x)
# x>1 atan2(x) = 90-atan2(1/x)
# atan2(det/dot)