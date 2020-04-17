## Create scoreboards and constants
# Main Input
scoreboard objectives add mp_wasd.pos_dx dummy
scoreboard objectives add mp_wasd.pos_dz dummy
scoreboard objectives add mp_wasd.rot_x dummy

# Maths
scoreboard objectives add mp_wasd.var dummy
scoreboard objectives add mp_wasd.var2 dummy

# Exclusive WASD Input
scoreboard objectives add mp_wasd.exc_in dummy

# Constants
scoreboard objectives add mp_wasd.const dummy

scoreboard players set *-4 mp_wasd.const -4
scoreboard players set *-2 mp_wasd.const -2
scoreboard players set *-1 mp_wasd.const -1
scoreboard players set *2 mp_wasd.const 2
scoreboard players set *4 mp_wasd.const 4
scoreboard players set *5 mp_wasd.const 5
scoreboard players set *10 mp_wasd.const 10
scoreboard players set *12 mp_wasd.const 12
scoreboard players set *14 mp_wasd.const 14
scoreboard players set *57 mp_wasd.const 57
scoreboard players set *67 mp_wasd.const 67
scoreboard players set *75 mp_wasd.const 75
scoreboard players set *90 mp_wasd.const 90
scoreboard players set *100 mp_wasd.const 100
scoreboard players set *314 mp_wasd.const 314
scoreboard players set *383 mp_wasd.const 383
scoreboard players set *666 mp_wasd.const 666
scoreboard players set *1000 mp_wasd.const 1000
scoreboard players set *10000 mp_wasd.const 10000
scoreboard players set *360000 mp_wasd.const 360000


tellraw @a {"text":"[Mounted WASD] Loaded", "color":"gold"}

data merge storage mounted_wasd:main {Main:{Initialized:1b}}