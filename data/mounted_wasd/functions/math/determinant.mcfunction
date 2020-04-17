#Calculate determinant
scoreboard players operation @s mp_wasd.var2 *= *dxrot mp_wasd.var
scoreboard players operation *var mp_wasd.var *= *dzrot mp_wasd.var
scoreboard players operation @s mp_wasd.var2 += *var mp_wasd.var
