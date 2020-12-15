# # Get Rotation
execute store result score @s mtwasd.abs_rot run data get entity @s Motion[0] 1000
scoreboard players set if_result_2812 sandstone_cond 0
execute if score @s mtwasd.abs_rot matches ..-1 run function mountedwasd:_wasd/math/if
# # Calculate rotation vector
scoreboard players operation @s mtwasd._calc0 = @s mtwasd.abs_rot
# Calculate sine using Bhaskara I's approx.
scoreboard players operation @s mtwasd._calc0 %= 360000 mtwasd._calc0
scoreboard players set if_result_4413 sandstone_cond 0
execute if score @s mtwasd._calc0 matches 180000.. run function mountedwasd:_wasd/math/if_2
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/math/execute_as
scoreboard players set @s mtwasd._calc1 180000
scoreboard players operation @s mtwasd._calc1 -= @s mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 /= 1000 mtwasd._calc1
scoreboard players operation @s mtwasd._calc1 *= @s mtwasd._calc0
scoreboard players set @s mtwasd._calc0 40500000
scoreboard players operation @s mtwasd._calc0 -= @s mtwasd._calc1
scoreboard players operation @s mtwasd._calc1 *= 4 mtwasd._calc1
scoreboard players operation @s mtwasd._calc0 /= 1000 mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 /= @s mtwasd._calc0
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/math/execute_as_2
tag @s remove mountedwasd._negate
# 
scoreboard players operation dxrot mtwasd._calc0 = @s mtwasd._calc1
scoreboard players operation dxrot mtwasd._calc0 *= -1 mtwasd._calc0
scoreboard players operation @s mtwasd._calc0 = @s mtwasd.abs_rot
# Calculate cosine ~ `cos(x)=sin(x+90)`
scoreboard players add @s mtwasd._calc0 90000
# Calculate sine using Bhaskara I's approx.
scoreboard players operation @s mtwasd._calc0 %= 360000 mtwasd._calc0
scoreboard players set if_result_4754 sandstone_cond 0
execute if score @s mtwasd._calc0 matches 180000.. run function mountedwasd:_wasd/math/if_3
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/math/execute_as_3
scoreboard players set @s mtwasd._calc1 180000
scoreboard players operation @s mtwasd._calc1 -= @s mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 /= 1000 mtwasd._calc1
scoreboard players operation @s mtwasd._calc1 *= @s mtwasd._calc0
scoreboard players set @s mtwasd._calc0 40500000
scoreboard players operation @s mtwasd._calc0 -= @s mtwasd._calc1
scoreboard players operation @s mtwasd._calc1 *= 4 mtwasd._calc1
scoreboard players operation @s mtwasd._calc0 /= 1000 mtwasd._calc0
scoreboard players operation @s mtwasd._calc1 /= @s mtwasd._calc0
execute as @s[tag=mountedwasd._negate] run function mountedwasd:_wasd/math/execute_as_4
tag @s remove mountedwasd._negate
# 
# # Calculate dot product