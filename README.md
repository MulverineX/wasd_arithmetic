# mountedwasd
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
A Minecraft Datapack. Detection of local direction input (eg wasd) from a player.

Usage:
`execute as @a if predicate wasd:predicates/is_mounted run function wasd:_wasd/mounted`

This will give the player an exclusive input score & inclusive input tags all described in wasd:\_wasd/get_direction
eg. `execute as @a[tag=wasd.forward] run title @s title {"text":"Forward"}` will display a title for mounted players that are inputting forward movement, even if it includes left or right

## Contributors ✨

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/onnowhere"><img src="https://avatars2.githubusercontent.com/u/17817284?v=4" width="100px;" alt=""/><br /><sub><b>onnowhere</b></sub></a><br /><a href="#" title="Original Developer, Made the original pack and the math implementation">💻</a></td>
    <td align="center"><a href="https://github.com/MulverineX"><img src="https://avatars2.githubusercontent.com/u/12068027?v=4" width="100px;" alt=""/><br /><sub><b>MulverineX</b></sub></a><br /><a href="#" title="Cleaned, Namespaced, Documented/Implemented Outputs, & Published">🧹</a></td>
    <td align="center"><img src="https://cdn.discordapp.com/avatars/332682709908455444/31ab2166522fd28e731170d694dddc27.webp" width="100px;" alt=""/><br /><sub><b>TheWii#2934</b></sub><br /><a href="#" title="Reported a Bug">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
