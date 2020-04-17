# Get Rotation
execute store result score @s mp_wasd.rot_x run data get entity @s Rotation[0] 1000
scoreboard players add @s[scores={mp_wasd.rot_x=..0}] mp_wasd.rot_x 360000

# Calculate rotation vector
scoreboard players operation @s mp_wasd.var = @s mp_wasd.rot_x
function mounted_wasd:math/sin
scoreboard players operation *dxrot mp_wasd.var = @s mp_wasd.var2
scoreboard players operation *dxrot mp_wasd.var *= *-1 mp_wasd.const
scoreboard players operation @s mp_wasd.var = @s mp_wasd.rot_x
function mounted_wasd:math/cos
scoreboard players operation *dzrot mp_wasd.var = @s mp_wasd.var2

# Calculate dot product
scoreboard players operation @s mp_wasd.var = @s mp_wasd.pos_dz
scoreboard players operation *var mp_wasd.var = @s mp_wasd.pos_dx
function mounted_wasd:math/dot_product
scoreboard players operation @s mp_wasd.var *= *10 mp_wasd.const
tag @s[scores={mp_wasd.var=..-1}] add mp_wasd.negate

# Calculate determinant
scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.pos_dx
scoreboard players operation *var mp_wasd.var = @s mp_wasd.pos_dz
function mounted_wasd:math/determinant

# Calculate head to motion angle
tag @s[scores={var2=1..}] add mp_wasd.forward
tag @s[scores={var2=..-1}] add mp_wasd.backward
function mounted_wasd:math/atan2