scoreboard players set if_result_2724 sandstone_cond 0
execute if predicate wasd_test:is_mounted run function wasd_test:main/execute_as/if
execute if score if_result_2724 sandstone_cond matches 0 run function wasd_test:main/execute_as/else