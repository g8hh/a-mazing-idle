/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Total Mazes Completed": "完成的迷宫总数",
    "Total Points Earned": "获得的总点数",
    "Total Remember Last Pathways": "总计记住最后的途径",
    "Total Spent": "总花费",
    "Total Tiles Revisited": "重新访问的总瓷砖数",
    "Total Time in Current Biome": "当前生物群落的总时间",
    "Total Time Played": "总游戏时长",
    "Unlock All Items": "解锁所有物品",
    "Total Unique Tiles Visited": "访问过的独特瓷砖总数",
    "Unlock All Upgrades": "解锁所有升级",
    "Unlocking new biomes is how you progress through the game to unlock more upgrades, fancier mazes, and higher point rewards. \n          This should generally be your priority, but you do you.": "解锁新的生物群落是您在游戏中取得进展以解锁更多升级、更精美的迷宫和更高点数奖励的方式。 \n 这通常应该是你的首要任务，但是得你自己做。",
    "Unlocks the Toggle Panel which allows you to enable/disable bot functionality.": "解锁允许您启用/禁用机器人功能的切换面板。",
    "Up: 'Up Key' or 'W'": "向上：“向上键”或“W”",
    "UpgradeType": "升级类型",
    "Visited Tiles": "访问的瓷砖",
    "WARNING: This is non-reversible and will delete your current save. Recommend you save again first!": "警告：这是不可逆的，将删除您当前的存档。 建议您先导出存档后，再尝试！",
    "WARNING: Your saved game is from an older version!": "警告：您存档的游戏来自旧版本！",
    "Welcome to A Mazing Idle!": "欢迎来到 神奇放置在哪里！",
    "Welcome Back to A-Mazing-Idle!": "欢迎回来 神奇放置在哪里！",
    "Welcome back!) Game content and save data may not work as expected. Major changes have been made!": "欢迎回来！）游戏内容和存档数据可能无法按预期工作。 发生了重大变化！",
    "When a bot is within X non-walled tiles of the maze exit, it will automatically navigate to the exit.": "当机器人在迷宫出口的 X 无墙瓷砖内时，它会自动导航到出口。",
    "When a bot merge occurs, the resulting direction of the bot will be away from deadends.": "当机器人合并发生时，机器人的最终方向将远离死胡同。",
    "When bot is at a decision point, he will remember what pathway was not visited last time and prioritize it next time at the decision point. Only one decision point can be remembered.This helps avoid getting stuck in back and forth deadend loops.": "当机器人处于决策点时，他会记住上次没有访问过的路径，并在下次决策点优先考虑它。 只能记住一个决策点。这有助于避免陷入来回死胡同。",
    "When bot is faced with a choice of direction, the bot will be lucky in guessing direction by an extra 1% (ie. 51%/49% of choosing correct direction at level 1).": "当 机器人 面临方向选择时，机器人 将幸运地猜测方向 1%（即在第 1 级选择正确方向的 51%/49%）。",
    "When bots step on the same tile, they will merge together and re-split at next unvisited tile split.If bots have not found an unvisited tile within 15 tiles, they will forcefully split.": "当机器人踩到同一个图块时，它们会合并在一起并在下一个未访问的图块拆分时重新拆分。如果机器人在 15 个图块内没有找到未访问的图块，它们将强制拆分。",
    "When none of the active bots find an unvisited tile after X tiles, they will move Y speed faster.": "当没有一个活跃的机器人在 X 块之后找到未访问的块时，它们会以更快的速度移动 Y。",
    "Speed Ups Used": "使用的加速",
    "SQUARE": "正方形",
    "Stats": "统计",
    "STAIRCASE": "楼梯",
    "Total": "总计",
    "Total Bot Merges": "机器人合并总数",
    "Total Bot Splits": "机器人拆分总数",
    "Total Dead Ends Marked": "标记的总死胡同",
    "Total Destructible Walls Destroyed": "被破坏的可破坏的墙壁总数",
    "Total Lucky Guesses": "幸运猜想总计",
    "Tile Multiplier Points": "瓷砖乘数点",
    "Tile Count": "瓷砖数量",
    "That said, you do you friend!  Good luck!": "那就是说，你是你的朋友！ 祝你好运！",
    "Import Save (No Going Back!": "导入存档（没有回头路！",
    "Increase the frequency by which a bot can phase through destructible walls.": "增加机器人穿越可破坏墙壁的频率。",
    "Left: 'Left Key' or 'A'": "往左：“左键头”或“A”",
    "Manual Movement!": "手动移动！",
    "Max Maze Iterations": "最大迷宫迭代",
    "Maze Algorithm": "",
    "Are you sure you want to start a new game?": "您确定要开始新游戏吗？",
    "AUTO_MOVE": "自动_移动",
    "BACK_TRACKER": "返回_跟踪器",
    "BINARY_TREE": "二进制_树",
    "Black Holes": "黑洞",
    "Bot Auto Move": "机器人自动移动",
    "Bot Frustration": "机器人挫折",
    "Bot Merging": "机器人合并",
    "Bot Splitting": "机器人分裂",
    "Bot Stats": "机器人统计",
    "Bot Upgrades!": "机器人升级！",
    "Bot will automatically move on its own!": "机器人会自动移动！",
    "Brains": "大脑",
    "Brain Maze Solves": "大脑迷宫解决了",
    "Change Log": "更新日志",
    "CIRCLE": "圆圈",
    "Clear Table": "清除表",
    "Tile Multipliers": "瓷砖乘数",
    "Toggles": "切换",
    "You were offline for": "你离线了 ",
    "You can click on a maze tile and have your player automatically move up to X non-walled tiles (upgradeable).": "您可以单击迷宫图块并让您的玩家自动移动到 X 个非围墙图块（可升级）。",
    "Item Upgrades!": "物品升级!",
    "Items": "物品",
    "Items will spawn periodically throughout the mazes and give you points early on! Later on, not all items may be friendly...": "物品将在整个迷宫中定期产生，并尽早为您提供点数！ 稍后，并非所有物品都可能是友好的......",
    "Maze Changes": "迷宫变化",
    "Maze Completion Bonus": "迷宫完成奖励",
    "Maze Keys": "迷宫钥匙",
    "Maze Stats": "迷宫统计",
    "Maze Stats!": "迷宫统计!",
    "Maze Upgrades!": "迷宫升级！",
    "NEW GAME!": "新游戏！",
    "New Game": "新游戏",
    "New Upgrades": "新升级",
    "New Maze": "新迷宫",
    "New Items": "新物品",
    "New!": "新!",
    "NOTE: Does not work with wall phasing (for now).": "注意：不适用于墙壁相位调整（目前）。",
    "Points": "点数",
    "Points earned": "获得的点数",
    "Powerups will be unlocked as you progress through biomes. Powersup are manually activated (to start) and will help you earn points faster!": "电源 将随着您在生物群系中的进展而解锁。 电源 是手动激活（启动），将帮助您更快地获得点数！",
    "RECTANGLE": "长方形",
    "Remember Deadends": "记住死胡同",
    "Reset All Stats": "重置所有统计数据",
    "Reset Biome Upgrades": "重置生物群落升级",
    "Reset Tripometer": "重置行程表",
    "Saving": "保存中",
    "Save Game": "保存游戏",
    "seconds": "秒",
    "Sell Mode": "出售模式",
    "Speed Run!": "速跑！",
    "Speed Up Duration": "加速持续时间",
    "pts/second": "点数/秒",
    "This will bring you to a new biome with more difficult mazes, but with better items, upgrades, and increased point rewards!": "这将带你进入一个新的生物群落，它有更困难的迷宫，但有更好的物品、升级和增加的点数奖励！",
    "This will unlock the experiments panel that lets you experiment with various game and maze options.  Have fun!": "这将解锁实验面板，让您可以尝试各种游戏和迷宫选项。 玩得开心！",
    "Biome Maze Configs": "生物群落迷宫配置",
    "Click to move non-walled tile distance increases by X amount.": "单击以移动非墙壁瓷砖距离增加 X 量。",
    "Click to move speed is your bot movement speed multiplied by this upgrade multiplier.": "点击移动速度是你的机器人移动速度乘以这个升级乘数。",
    "Completion Requirements": "完成要求",
    "Controls": "控制",
    "Dead Ends": "死胡同",
    "CSV Maze Tile Counts": "CSV 迷宫瓷砖计数",
    "DIAMOND": "钻石",
    "Display tripomoter (temporary stats": "显示三脚架（临时统计数据",
    "Down: 'Down Key' or 'S'": "向下：“向下键”或“S”",
    "Export Save JSON (Copy": "导出存档 JSON（复制",
    "Fruits": "水果",
    "FRUIT": "水果",
    "Fruit Item Pickups": "水果物品拾取",
    "Fruits pickups are worth more points!": "捡起水果更值钱！",
    "Fruits spawn more frequently.": "水果更频繁地出现。",
    "Game Controls": "游戏控制",
    "Game Saved!": "游戏已保存!",
    "Get more points per tile visit (only the first time)!": "每次访问瓷砖获得更多点数（仅限第一次）！",
    "Player Wall Phasing": "玩家墙相位",
    "Offline points rate": "离线点数率",
    "pts": "点数",
    "Reset Points": "重置点数",
    "Right: 'Right Key' or 'D'": "往右：“右键”或“D”",
    "Show Single Maze Data": "显示单个迷宫数据",
    "Show Upgrade Costs": "显示升级成本",
    "Speed Run Auto Purchase": "速运行自动购买",
    "Speed Run Iterations": "速度运行迭代",
    "Speed Run Points Limit": "速度运行点数限制",
    "Tile multiplier item will increase in strength.": "瓷砖乘数物品将增加强度。",
    "Tile multiplier item will have increased multiplier strength.": "瓷砖乘数物品将增加乘数强度。",
    "Tile multiplier items will additively stack durations beyond its base duration if the item is already active.": "如果该物品已经处于活动状态，则平铺乘数项目将叠加超过其基本持续时间的持续时间。",
    "The tile multiplier item will have increased strength!": "瓷砖乘数物品将增加强度！",
    "The speed up item will stay active for a longer duration!  Even more points!": "加速物品将保持活动更长时间！ 甚至更多点数！",
    "The speed up item will spawn more frequently. Each tile has this % of spawning a speed up item.": "加速物品将更频繁地产生。 每个图块都有生成加速物品的百分比。",
    "The speed up item is more powerful so bots move even faster!  More points!": "加速物品更强大，所以机器人移动得更快！ 更多点数！",
    "Multiplier Duration": "乘数持续时间",
    "Same": "相同",
    "Players can have one bot moving at the same time as they manually move.": "玩家可以在手动移动的同时让一个机器人移动。",
    "Offline earning time": "离线收益时间",
    "Players can teleport their bot back to the themselves by pressing 'q'.": "玩家可以通过按“q”将他们的机器人传送回自己。",
    "Players can teleport their themselves back to the bot by pressing 'e'.": "玩家可以通过按“e”将自己传送回机器人。",
    "Revisited Tiles": "重新审视瓷砖",
    "Speed up items will additively stack durations beyond its base duration if the item is already active.": "如果物品已经处于活动状态，则加速物品将在其基础持续时间之外叠加持续时间。",
    "Player can move through walls with manual movement for X total tiles. This ability is accumulated into storage over time.": "玩家可以通过手动移动穿过墙壁 X 总瓷砖。 随着时间的推移，这种能力会累积到存储中。",
    "Player can phase through walls with manual movement for X total tiles. This ability is accumulated over time.": "玩家可以通过手动移动 X 总砖块穿过墙壁。 这种能力是随着时间积累的。",
    "Maze Grid Type": "迷宫格子类型",
    "SQUARE": "正方形",
    "Maze Grid Size/Tier": "迷宫网格大小/层",
    "Bigger!": "更大！",
    "Dead Ends Marked By Item": "按物品标记的死胡同",
    "Destructible Wall Phasing": "可破坏的墙壁相位",
    "Each maze completion is worth more points! Larger mazes are worth more points based on your current biome level.": "每个迷宫完成都值得更多点数！ 根据您当前的生物群落等级，更大的迷宫价值更高。",
    "except upgrades with pre-requisites": "除了有先决条件的升级",
    "Extra Maze Entrance": "额外的迷宫入口",
    "Experiments": "实验",
    "Free Mode": "自由模式",
    "HELP!": "帮助!",
    "I NEED AN ADULT!": "我需要一个成年人！",
    "I highly recommend you start a new game.": "我强烈建议你开始一个新游戏。",
    "I tried my best not to break things, but this game is still in alpha so I make no promises!": "我尽量不破坏东西，但这款游戏仍处于 alpha 阶段，所以我不做任何承诺！",
    "Increase the frequency by which a player can wall phase.": "增加玩家可以墙相位的频率。",
    "Increases the probability of there being another entrance to the maze.": "增加迷宫有另一个入口的概率。",
    "The fruit item will give you points based on the fruit type, upgrade level AND points per tile visit.": "水果物品将根据水果类型、升级级别和每次访问瓷砖的点数为您提供点数。",
    "Item Pickup Stats": "物品拾取统计",
    "Get more points when you revisit a tile!": "当您重新访问瓷砖时获得更多点数！",
    "equivalent to 28 tiles": "相当于 28 个瓷砖",
    "Dead end items spawn more frequently. This item marks all dead ends on the map up to your \"Remember Dead Ends\" upgrade level. Earn the visit points for all the newly marked dead ends!": "死胡同物品产生的频率更高。 此项标记地图上的所有死胡同，直到您的“记住死胡同”升级级别。 为所有新标记的死胡同赚取访问点数！",
    "Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.": "大脑更频繁地产生。 大脑 会自动将您的机器人引导至出口，最多 X 距离。",
    "Bots with an active brain item will auto path X more tiles.": "具有活动大脑物品的机器人将自动路径 X 个更多的图块。",
    "Bots will split into two different bots when different pathways are available to it up to X total times.": "当不同的路径可用最多 X 次时，机器人将分成两个不同的机器人。",
    "Bots will move ever so slightly faster.": "机器人的移动速度会稍微快一点。",
    "Bots will avoid revisiting the position that they were just at.": "机器人将避免重新访问他们刚刚所在的位置。",
    "Bots will automatically mark deadends up to X tiles as another color and will not revisit them.": "机器人会自动将最多 X 块的死角标记为另一种颜色，并且不会重新访问它们。",
    "Bots will always prioritize an unvisited tile before a previously visited one.": "机器人总是在之前访问过的瓷砖之前优先考虑未访问过的瓷砖。",
    "Bots can move through destructible walls. This ability increases the max storage of wall phasing charges.": "机器人可以穿过可破坏的墙壁。 这种能力增加了壁式定相电荷的最大存储量。",
    "Bots can move through destructible walls. This ability increases the frequency by which you gain wall phasing charges.": "机器人可以穿过可破坏的墙壁。 此能力会增加您获得壁式定相电荷的频率。",
    "Bot Smart Merge": "机器人智能合并",
    "ZIGZAG": "之字形",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "LETTER_H": "字母_H",
    "": "",
    "HONEYCOMB": "蜂窝",
    "PYRAMID": "金字塔",
    "PRIMS ➔ BINARY_TREE": "PRIMS ➔ 二进制_树",
    "PRIMS": "PRIMS",
    "POINTS_PER_VISIT": "点数_每_访问",
    "PLUS_SIGN": "加号",
    "BOT_MOVEMENT_SPEED": "机器人_移动_速度",
    "BACK_TRACKER ➔ PRIMS": "返回跟踪器 ➔ PRIMS",
    "BIOME_DEFAULT": "生物群落_默认",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Unlock Experiments Panel: ": "解锁实验面板：",
    "Unlock Toggle Panel: ": "解锁切换面板：",
    "Wall Phasing Frequency: ": "墙壁移相频率：",
    "Teleport bot to player: Q (must be unlocked": "传送机器人到玩家：Q（必须先解锁",
    "Import Save JSON": "导入存档JSON",
    "Maze Algorithm: ": "迷宫算法：",
    "Teleport player to bot: E (must be unlocked": "将玩家传送到机器人：E（必须先解锁    ",
    "The objective of this game is to earn more points by completing mazes, picking up fruits, and unlocking new biomes!": "该游戏的目标是通过完成迷宫、捡起水果和解锁新的生物群落来获得更多点数！",
    "Points: ": "点数: ",
    "Close menu: 'Escape' or (click anywhere off-menu": "关闭菜单：按键盘“Esc”键 或（单击菜单外的任意位置",
    "Move player in the maze": "在迷宫中移动玩家",
    "Maze Tile Counts": "迷宫瓷砖数量",
    "Maze Size: ": "迷宫尺寸：",
    "Maze Shape: ": "迷宫形状：",
    "Bots will be unlocked after the first biome, but is very dumb to start. \n          Unlocking and purchasing more bot upgrades will speed up your bots and increase their intelligence and allow them to solve mazes faster!": "机器人将在第一个生物群落后解锁，但开始时非常愚蠢。 \n 解锁和购买更多机器人升级将加速您的机器人并提高它们的智力并让它们更快地解决迷宫！",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "maze keys found": "找到迷宫钥匙",
    "pts/s": " 点数/秒",
    "tiles visited": " 访问过的瓷砖",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^([\d\.]+)\% \/ ([\d\.]+)$/,
    /^([\d\.]+) \/ ([\d\.]+)$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+)M$/,
    /^([\d\.,]+)K$/,
    /^([\d\.,]+)B$/,
    /^([\d\.,]+):([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^Bot Movement Speed (.+): (.+) pts$/, '机器人移动速度 $1：$2 点数'],
    [/^Bot Frustration Distance (.+): (.+) pts$/, '机器人挫折距离 $1：$2 点数'],
    [/^Brain Item Spawn Rate (.+): (.+) pts$/, '大脑物品生成率 $1：$2 点数'],
    [/^Brain Tile Distance (.+): (.+) pts$/, '大脑瓷砖距离 $1：$2 点数'],
    [/^Click to Move Speed (.+): (.+) pts$/, '点击移动速度 $1：$2 点数'],
    [/^Click to Move Tile Distance (.+): (.+) pts$/, '单击以移动平铺距离 $1：$2 点数'],
    [/^Destructible Wall Phasing Frequency (.+): (.+) pts$/, '可破坏墙相位频率 $1：$2 点数'],
    [/^Fruit Spawn Rate (.+): (.+) pts$/, '水果生成率 $1：$2 点数'],
    [/^Fruit Pickup Points (.+): (.+) pts$/, '水果拾取点数 $1：$2 点数'],
    [/^Extra Maze Entrance (.+): (.+) pts$/, '额外的迷宫入口 $1：$2 点数'],
    [/^Destructible Wall Phasing Storage (.+): (.+) pts$/, '可破坏的墙相存储 $1：$2 点数'],
    [/^Dead End Marker Spawn Rate (.+): (.+) pts$/, '死胡同标记产生率 $1：$2 点数'],
    [/^Bot Lucky Guess (.+): (.+) pts$/, '机器人幸运猜 $1：$2 点数'],
    [/^Auto Exit Maze Distance (.+): (.+) pts$/, '自动退出迷宫距离 $1：$2 点数'],
    [/^Maze Completion Bonus (.+): (.+) pts$/, '迷宫完成奖励 $1：$2 点数'],
    [/^Wall Phasing Total Storage (.+): (.+) pts$/, '墙壁相位总存储 $1：$2 点数'],
    [/^Speed Up Activate Duration (.+): (.+) pts$/, '加速激活持续时间 $1：$2 点数'],
    [/^Remember Dead Ends (.+): (.+) pts$/, '记住死胡同 $1：$2 点数'],
    [/^Tile Multiplier Spawn Rate (.+): (.+) pts$/, '瓷砖乘数生成率 $1：$2 点数'],
    [/^Tile Multiplier Strength (.+): (.+) pts$/, '瓷砖乘数强度 $1：$2 点数'],
    [/^Speed Up Spawn Rate (.+): (.+) pts$/, '加速生成率 $1：$2 点数'],
    [/^Speed Up Multiplier Strength (.+): (.+) pts$/, '加速乘数强度 $1：$2 点数'],
    [/^Tile Multiplier Activate Duration (.+): (.+) pts$/, '瓷砖乘数激活持续时间 $1：$2 点数'],
    [/^Points Per Visit (.+): (.+) pts$/, '点数每次访问 $1：$2 点数'],
    [/^Points Per Re-Visit (.+): (.+) pts$/, '点数每次再次访问 $1：$2 点数'],
    [/^Bot Split Direction (.+): (.+) pts$/, '机器人拆分方向 $1：$2 点数'],
    [/^Unlock New Biome (.+): (.+) pts$/, '解锁新生物群落 $1：$2 点数'],
    [/^Speed Up Additive Stacking: (.+) pts$/, '加速附加堆叠：：$1 点数'],
    [/^Teleport Bot Back to Player: (.+) pts$/, '将机器人传送回玩家：：$1 点数'],
    [/^Player Click to Move: (.+) pts$/, '玩家点击移动：：$1 点数'],
    [/^Bot Auto Move: (.+) pts$/, '机器人自动移动：：$1 点数'],
    [/^Player Wall Phasing: (.+) pts$/, '玩家墙相位：：$1 点数'],
    [/^Player Can Move Independently: (.+) pts$/, '玩家可以独立移动：：$1 点数'],
    [/^Basic Prioritize Unvisited: (.+) pts$/, '基础优先未访问：：$1 点数'],
    [/^Bot Split Auto Merge: (.+) pts$/, '机器人分裂自动合并：：$1 点数'],
    [/^Destructible Wall Phasing: (.+) pts$/, '可破坏的墙壁相位：：$1 点数'],
    [/^Bot Smart Merge: (.+) pts$/, '机器人智能合并：：$1 点数'],
    [/^Current points: (.+)pts$/, '当前点数：：$1 点数'],
    [/^Tile Visit Requirement: (.+)$/, '瓷砖访问要求：：$1'],
    [/^Portals: (.+)$/, '传送门：：$1'],
    [/^Keys Required: (.+)$/, '需要的钥匙：：$1'],
    [/^Destructible Walls: (.+)$/, '可破坏的墙壁：：$1'],
    [/^Bot Remember Last Pathway: (.+) pts$/, '机器人记住最后的路径：：$1 点数'],
    [/^Basic Avoid Revisit: (.+) pts$/, '基础避免再次访问：：$1 点数'],
    [/^Teleport Player Back to Bot: (.+) pts$/, '将玩家传送回机器人：：$1 点数'],
    [/^Tile Multiplier Additive Stacking: (.+) pts$/, '瓷砖乘数附加堆叠：：$1 点数'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Spawn Rate: (.+) per tile$/, '生成率：$1 每瓷砖'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) pts$/, '$1 点数'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) \/ (.+) elves$/, '成本：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);