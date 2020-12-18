# # Get Rotation
execute store result score @s mtwasd.abs_rot run data get entity @s Rotation[0] 1000
scoreboard players add @s[scores={mtwasd.abs_rot=..0}] mtwasd.abs_rot 360000
# # Calculate rotation vector
scoreboard players operation @s mtwasd._calc0 = @s mtwasd.abs_rot
# Calculate sine using Bhaskara I's approx.
scoreboard players set if_result_2482 sandstone_cond 0
execute if score @s mtwasd._calc0 matches 180000.. run function mountedwasd:_wasd/calculate/if
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/calculate/execute_as
scoreboard players set @s mtwasd._calc1 180000
scoreboard players operation @s mtwasd._calc1 -= @s mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 /= 1000 sandstone_const
scoreboard players operation @s mtwasd._calc1 *= @s mtwasd._calc0
scoreboard players set @s mtwasd._calc0 40500000
scoreboard players operation @s mtwasd._calc0 -= @s mtwasd._calc1
scoreboard players operation @s mtwasd._calc1 *= 4 sandstone_const
scoreboard players operation @s mtwasd._calc0 /= 1000 sandstone_const
scoreboard players operation @s mtwasd._calc1 /= @s mtwasd._calc0
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/calculate/execute_as_2
tag @s remove mountedwasd._negate
# 
scoreboard players operation dxrot mtwasd._calc0 = @s mtwasd._calc1
scoreboard players operation dxrot mtwasd._calc0 *= -1 sandstone_const
scoreboard players operation @s mtwasd._calc0 = @s mtwasd.abs_rot
# 
# Calculate cosine ~ `cos(x)=sin(x+90)`
scoreboard players add @s mtwasd._calc0 90000
# Calculate sine using Bhaskara I's approx.
scoreboard players set if_result_1715 sandstone_cond 0
execute if score @s mtwasd._calc0 matches 180000.. run function mountedwasd:_wasd/calculate/if_2
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/calculate/execute_as_3
scoreboard players set @s mtwasd._calc1 180000
scoreboard players operation @s mtwasd._calc1 -= @s mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 /= 1000 sandstone_const
scoreboard players operation @s mtwasd._calc1 *= @s mtwasd._calc0
scoreboard players set @s mtwasd._calc0 40500000
scoreboard players operation @s mtwasd._calc0 -= @s mtwasd._calc1
scoreboard players operation @s mtwasd._calc1 *= 4 sandstone_const
scoreboard players operation @s mtwasd._calc0 /= 1000 sandstone_const
scoreboard players operation @s mtwasd._calc1 /= @s mtwasd._calc0
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/calculate/execute_as_4
tag @s remove mountedwasd._negate
# 
scoreboard players operation dzrot mtwasd._calc0 = @s mtwasd._calc1
# # Calculate dot product
scoreboard players operation @s mtwasd._calc0 = @s mtwasd.vec_z
scoreboard players operation temp0 mtwasd._calc0 = @s mtwasd.vec_x
scoreboard players operation @s mtwasd._calc0 *= dxrot mtwasd._calc0
scoreboard players operation temp0 mtwasd._calc0 *= dzrot mtwasd._calc0
scoreboard players operation @s mtwasd._calc0 -= temp0 mtwasd._calc0
scoreboard players operation @s mtwasd._calc0 *= 10 sandstone_const
scoreboard players set if_result_3843 sandstone_cond 0
execute if score @s mtwasd._calc0 matches ..-1 run function mountedwasd:_wasd/calculate/if_3
# # Calculate determinant
scoreboard players operation @s mtwasd._calc1 = @s mtwasd.vec_x
scoreboard players operation temp0 mtwasd._calc0 = @s mtwasd.vec_z
scoreboard players operation @s mtwasd._calc1 *= dxrot mtwasd._calc0
scoreboard players operation temp0 mtwasd._calc0 *= dzrot mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 += temp0 mtwasd._calc0
# 
scoreboard players set if_result_5835 sandstone_cond 0
execute if score @s mtwasd._calc1 matches 1.. run function mountedwasd:_wasd/calculate/if_4
execute if score if_result_5835 sandstone_cond matches 0 if score @s mtwasd._calc1 matches ..-1 run function mountedwasd:_wasd/calculate/else_if
# # Calculate Local Rotation
# Calculate arc tangent (atan2)
scoreboard players operation @s mtwasd._calc0 /= @s mtwasd._calc1
scoreboard players set if_result_3197 sandstone_cond 0
execute if score @s mtwasd._calc0 matches ..-1 run function mountedwasd:_wasd/calculate/if_5
execute as @s[tag=mountedwasd._flip] run function mountedwasd:_wasd/calculate/execute_as_5
scoreboard players set if_result_206 sandstone_cond 0
execute if score @s mtwasd._calc0 matches 11.. run function mountedwasd:_wasd/calculate/if_6
execute as @s[tag=mountedwasd._invert] run function mountedwasd:_wasd/calculate/execute_as_6
scoreboard players operation temp0 mtwasd._calc0 = @s mtwasd._calc0
scoreboard players remove temp0 mtwasd._calc0 10
scoreboard players operation temp1 mtwasd._calc0 = @s mtwasd._calc0
scoreboard players operation temp1 mtwasd._calc0 /= 100 sandstone_const
scoreboard players operation temp1 mtwasd._calc0 *= 383 sandstone_const
scoreboard players add temp1 mtwasd._calc0 140
scoreboard players operation temp1 mtwasd._calc0 /= 100 sandstone_const
scoreboard players operation temp0 mtwasd._calc0 *= temp1 mtwasd._calc0
scoreboard players set temp1 mtwasd._calc0 450
scoreboard players operation temp1 mtwasd._calc0 -= temp0 mtwasd._calc0
scoreboard players operation temp1 mtwasd._calc0 /= 10 sandstone_const
scoreboard players operation @s mtwasd._calc0 *= temp1 mtwasd._calc0
execute as @s[tag=mountedwasd._invert] run function mountedwasd:_wasd/calculate/execute_as_7
execute as @s[tag=mountedwasd._flip] run function mountedwasd:_wasd/calculate/execute_as_8
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/calculate/execute_as_9
scoreboard players set @s[scores={mtwasd._calc0=-1800}, tag=mountedwasd.forward] mtwasd._calc0 0
scoreboard players set @s[scores={mtwasd._calc0=0}, tag=mountedwasd.backward] mtwasd._calc0 1800
tag @s remove mountedwasd._flip
tag @s remove mountedwasd._invert
tag @s remove mountedwasd._negate
tag @s remove mountedwasd.forward
tag @s remove mountedwasd.backward
# 
# atan2 approximation
# atan2(x) = x(45-(x-1)(14+3.83x))
# atan2(1000x) = (1000x(45000-((1000x-1000)(14000+3.83*1000x))/1000))/1000/1000
# atan2(-x) = -atan2(x)
# x>1 atan2(x) = 90-atan2(1/x)
# atan2(det/dot)