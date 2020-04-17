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

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/onnowhere"><img src="https://avatars2.githubusercontent.com/u/17817284?v=4" width="100px;" alt=""/><br /><sub><b>onnowhere</b></sub></a><br /><a href="#developer-onnowhere" title="Original Developer, Made the original pack and the math implementation">💻</a></td>
    <td align="center"><a href="http://mulverinex.github.io/home"><img src="https://avatars2.githubusercontent.com/u/12068027?v=4" width="100px;" alt=""/><br /><sub><b>MulverineX</b></sub></a><br /><a href="https://github.com/MulverineX/mountedwasd/commits?author=MulverineX" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!