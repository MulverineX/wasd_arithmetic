#Calculate sin(x)
scoreboard players operation @s mp_wasd.var %= *360000 mp_wasd.const
tag @s[scores={mp_wasd.var=180000..}] add mp_wasd.negate
scoreboard players remove @s[tag=mp_wasd.negate] mp_wasd.var 180000
scoreboard players set @s mp_wasd.var2 180000
scoreboard players operation @s mp_wasd.var2 -= @s mp_wasd.var
scoreboard players operation @s mp_wasd.var2 /= *1000 mp_wasd.const
scoreboard players operation @s mp_wasd.var2 *= @s mp_wasd.var
scoreboard players set @s mp_wasd.var 40500000
scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
scoreboard players operation @s mp_wasd.var2 *= *4 mp_wasd.const
scoreboard players operation @s mp_wasd.var /= *1000 mp_wasd.const
scoreboard players operation @s mp_wasd.var2 /= @s mp_wasd.var
scoreboard players operation @s[tag=mp_wasd.negate] mp_wasd.var2 *= *-1 mp_wasd.const
tag @s[tag=mp_wasd.negate] remove mp_wasd.negate

#~Uses Bhaskara I's sine approximation
