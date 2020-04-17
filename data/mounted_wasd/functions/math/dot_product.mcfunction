#Calculate dot product
scoreboard players operation @s mp_wasd.var *= *dxrot mp_wasd.var
scoreboard players operation *var mp_wasd.var *= *dzrot mp_wasd.var
scoreboard players operation @s mp_wasd.var -= *var mp_wasd.var
