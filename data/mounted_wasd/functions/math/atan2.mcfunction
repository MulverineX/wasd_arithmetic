#Calculate atan2(x)
scoreboard players operation @s mp_wasd.var /= @s mp_wasd.var2
tag @s[scores={mp_wasd.var=..-1}] add mp_wasd.flip
scoreboard players operation @s[tag=mp_wasd.flip] mp_wasd.var *= *-1 mp_wasd.const
tag @s[scores={mp_wasd.var=11..}] add mp_wasd.invert
scoreboard players operation @s[tag=mp_wasd.invert] mp_wasd.var2 = @s[tag=mp_wasd.invert] mp_wasd.var
scoreboard players set @s[tag=mp_wasd.invert] mp_wasd.var 100
scoreboard players operation @s[tag=mp_wasd.invert] mp_wasd.var /= @s mp_wasd.var2
scoreboard players operation *var mp_wasd.var = @s mp_wasd.var
scoreboard players remove *var mp_wasd.var 10
scoreboard players operation *var2 mp_wasd.var = @s mp_wasd.var
scoreboard players operation *var2 mp_wasd.var /= *100 mp_wasd.const
scoreboard players operation *var2 mp_wasd.var *= *383 mp_wasd.const
scoreboard players add *var2 mp_wasd.var 140
scoreboard players operation *var2 mp_wasd.var /= *100 mp_wasd.const
scoreboard players operation *var mp_wasd.var *= *var2 mp_wasd.var
scoreboard players set *var2 mp_wasd.var 450
scoreboard players operation *var2 mp_wasd.var -= *var mp_wasd.var
scoreboard players operation *var2 mp_wasd.var /= *10 mp_wasd.const
scoreboard players operation @s mp_wasd.var *= *var2 mp_wasd.var
execute if entity @s[tag=mp_wasd.invert] run scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.var
scoreboard players set @s[tag=mp_wasd.invert] mp_wasd.var 900
execute if entity @s[tag=mp_wasd.invert] run scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
tag @s[tag=mp_wasd.invert] remove mp_wasd.invert
execute if entity @s[tag=mp_wasd.flip] run scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.var
scoreboard players set @s[tag=mp_wasd.flip] mp_wasd.var 1800
execute if entity @s[tag=mp_wasd.flip] run scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
tag @s[tag=mp_wasd.flip] remove mp_wasd.flip
execute if entity @s[tag=mp_wasd.negate] run scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.var
scoreboard players set @s[tag=mp_wasd.negate] mp_wasd.var 1800
execute if entity @s[tag=mp_wasd.negate] run scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
scoreboard players operation @s[tag=mp_wasd.negate] mp_wasd.var *= *-1 mp_wasd.const
tag @s[tag=mp_wasd.negate] remove mp_wasd.negate
scoreboard players set @s[tag=mp_wasd.forward,scores={mp_wasd.var=-1800}] mp_wasd.var 0
scoreboard players set @s[tag=mp_wasd.backward,scores={mp_wasd.var=0}] mp_wasd.var 1800
tag @s remove mp_wasd.forward
tag @s remove mp_wasd.backward

#~arctan2 approximation
#~arctan2(x) = x(45-(x-1)(14+3.83x))
#~arctan2(1000x) = (1000x(45000-((1000x-1000)(14000+3.83*1000x))/1000))/1000/1000
#~arctan2(-x) = -arctan2(x)
#~x>1 arctan2(x) = 90-arctan2(1/x)
#~arctan2(det/dot)
