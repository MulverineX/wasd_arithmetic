# # Get Rotation
execute store result score @s wasd.abs_rot run data get entity @s Rotation[0] 1000
execute if score @s wasd.abs_rot matches ..0 run scoreboard players add @s wasd.abs_rot 360000
# # Calculate rotation vector
scoreboard players operation @s wasd._calc0 = @s wasd.abs_rot
# Calculate sine using Bhaskara I's approx.
execute if score @s wasd._calc0 matches 180000.. run tag @s add wasd._negate
execute if entity @s[tag=wasd._negate] run scoreboard players remove @s wasd._calc0 180000
scoreboard players set @s wasd._calc1 180000
scoreboard players operation @s wasd._calc1 -= @s wasd._calc0
scoreboard players operation @s wasd._calc1 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 *= @s wasd._calc0
scoreboard players set @s wasd._calc0 40500000
scoreboard players operation @s wasd._calc0 -= @s wasd._calc1
scoreboard players operation @s wasd._calc1 *= 4 sandstone_const
scoreboard players operation @s wasd._calc0 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 /= @s wasd._calc0
execute if entity @s[tag=wasd._negate] run scoreboard players operation @s wasd._calc1 *= -1 sandstone_const
tag @s remove wasd._negate
# 
scoreboard players operation dxrot wasd._calc0 = @s wasd._calc1
scoreboard players operation dxrot wasd._calc0 *= -1 sandstone_const
scoreboard players operation @s wasd._calc0 = @s wasd.abs_rot
# 
# Calculate cosine ~ `cos(x)=sin(x+90)`
scoreboard players add @s wasd._calc0 90000
# Calculate sine using Bhaskara I's approx.
execute if score @s wasd._calc0 matches 180000.. run tag @s add wasd._negate
execute if entity @s[tag=wasd._negate] run scoreboard players remove @s wasd._calc0 180000
scoreboard players set @s wasd._calc1 180000
scoreboard players operation @s wasd._calc1 -= @s wasd._calc0
scoreboard players operation @s wasd._calc1 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 *= @s wasd._calc0
scoreboard players set @s wasd._calc0 40500000
scoreboard players operation @s wasd._calc0 -= @s wasd._calc1
scoreboard players operation @s wasd._calc1 *= 4 sandstone_const
scoreboard players operation @s wasd._calc0 /= 1000 sandstone_const
scoreboard players operation @s wasd._calc1 /= @s wasd._calc0
execute if entity @s[tag=wasd._negate] run scoreboard players operation @s wasd._calc1 *= -1 sandstone_const
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
execute if score @s wasd._calc0 matches ..-1 run tag @s add wasd._negate
# # Calculate determinant
scoreboard players operation @s wasd._calc1 = @s wasd.vec_x
scoreboard players operation temp0 wasd._calc0 = @s wasd.vec_z
scoreboard players operation @s wasd._calc1 *= dxrot wasd._calc0
scoreboard players operation temp0 wasd._calc0 *= dzrot wasd._calc0
scoreboard players operation @s wasd._calc1 += temp0 wasd._calc0
# 
scoreboard players reset cond_26 sandstone
execute store success score cond_26 sandstone if score @s wasd._calc1 matches 1.. run tag @s add wasd.forward
execute if score cond_26 sandstone matches 0.. if score @s wasd._calc1 matches ..-1 store success score cond_26 sandstone run tag @s add wasd.backward
# # Calculate Local Rotation
# Calculate arc tangent (atan2)
scoreboard players operation @s wasd._calc0 /= @s wasd._calc1
execute if score @s wasd._calc0 matches ..-1 run tag @s add wasd._flip
execute if entity @s[tag=wasd._flip] run scoreboard players operation @s wasd._calc0 *= -1 sandstone_const
execute if score @s wasd._calc0 matches 11.. run tag @s add wasd._invert
execute if entity @s[tag=wasd._invert] run function wasd:_wasd/math/if
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
execute if entity @s[tag=wasd._invert] run function wasd:_wasd/math/if_2
execute if entity @s[tag=wasd._flip] run function wasd:_wasd/math/if_3
execute if entity @s[tag=wasd._negate] run function wasd:_wasd/math/if_4
execute if score @s wasd._calc0 matches -1800 if entity @s[tag=wasd.forward] run scoreboard players set @s wasd._calc0 0
execute if score @s wasd._calc0 matches 0 if entity @s[tag=wasd.backward] run scoreboard players set @s wasd._calc0 1800
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