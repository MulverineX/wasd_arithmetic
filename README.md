# mountedwasd
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
A Minecraft Datapack. Detection of local direction input (ie wasd) for when the player is on a mount.

Usage:
Run mounted_wasd:main as the player to get movement information
ie. `execute as @a if predicate mounted_wasd:mounted run function mounted_wasd:main` (Mounted predicate checks if the player is riding anything; nonessential, not supported in 1.14 nor 1.13)

This will give the player an exclusive input score & inclusive input tags all described in mounted_wasd:output
ie. `execute as @a[tag=mp_wasd.forward] run title @s title {"text":"Forward"}` will display a title for mounted players that are inputting forward movement, even if it includes left or right

## Contributors ✨

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/onnowhere"><img src="https://avatars2.githubusercontent.com/u/17817284?v=4" width="100px;" alt=""/><br /><sub><b>onnowhere</b></sub></a><br /><a href="" title="Original Developer, Made the original pack and the math implementation">💻</a></td>
    <td align="center"><a href="http://mulverinex.github.io/home"><img src="https://avatars2.githubusercontent.com/u/12068027?v=4" width="100px;" alt=""/><br /><sub><b>MulverineX</b></sub></a><br /><a href="" title="Cleaned, Namespaced, Documented/Implemented Outputs, & Published">🧹</a></td>
    <td align="center"><img src="https://cdn.discordapp.com/avatars/332682709908455444/31ab2166522fd28e731170d694dddc27.webp" width="100px;" alt=""/><br /><sub><b>TheWii#2934</b></sub><br /><a href="" title="Reported a Bug">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
