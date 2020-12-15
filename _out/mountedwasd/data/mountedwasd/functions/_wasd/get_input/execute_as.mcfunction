# # Exclusive Inputs
# Backward
execute if score @s mtwasd.loc_rot matches 1574..1800 run scoreboard players set @s mtwasd.loc_dir 1
execute if score @s mtwasd.loc_rot matches -1800..-1574 run scoreboard players set @s mtwasd.loc_dir 1
# Backward Left
execute if score @s mtwasd.loc_rot matches -1576..-1126 run scoreboard players set @s mtwasd.loc_dir 2
# Left
execute if score @s mtwasd.loc_rot matches -1124..-674 run scoreboard players set @s mtwasd.loc_dir 3
# Forward Left
execute if score @s mtwasd.loc_rot matches -676..-226 run scoreboard players set @s mtwasd.loc_dir 4
# Forward
execute if score @s mtwasd.loc_rot matches -224..226 run scoreboard players set @s mtwasd.loc_dir 5
# Forward Right
execute if score @s mtwasd.loc_rot matches 224..674 run scoreboard players set @s mtwasd.loc_dir 6
# Right
execute if score @s mtwasd.loc_rot matches 676..1126 run scoreboard players set @s mtwasd.loc_dir 7
# Backward Right
execute if score @s mtwasd.loc_rot matches 1124..1576 run scoreboard players set @s mtwasd.loc_dir 8
# 
# # Inclusive Inputs
# Backward
execute if score @s mtwasd.loc_dir matches 8 run tag @s add mountedwasd.backward
execute if score @s mtwasd.loc_dir matches 1..2 run tag @s add mountedwasd.backward
# Left
execute if score @s mtwasd.loc_dir matches 2..4 run tag @s add mountedwasd.left
# Forward
execute if score @s mtwasd.loc_dir matches 4..6 run tag @s add mountedwasd.forward
# Right
execute if score @s mtwasd.loc_dir matches 6..8 run tag @s add mountedwasd.right