import { lib, game, ui, get, ai, _status } from "../../../noname.js";
let block = {
		srlose: {
			name: "srlose",
			intro: "是否要求SR武将弃置技能",
			init: true,
		},
		qsRelic: {
			name: "七杀宝物特殊规则",
			intro: "锁定技，当你同时装备了七杀宝物、进攻马与防御马时，你选择将你装备区中的一张坐骑或七杀宝物置入弃牌堆。",
			init: false,
		},
		syRefactor: {
			name: "魔势力重构",
			intro: "将非挑战模式下的三英武将势力变更为魔势力，名字还原，将非暴怒武将设置为AI禁选",
			init: false,
		},
		jlsg_identity_music_image: {
			name: "身份模式背景＆音乐",
			init: false,
		},
		jlsg_boss_music_image: {
			name: "挑战模式背景＆音乐",
			init: false,
		},
		jlsg_zhugong_buff: {
			name: "极略主公buff",
			intro: "极略武将做主公时从三个随机极略主公技中选择并获得一个",
			init: false,
		},
		jlsg_disableSkill: {
			name: "失效技能时机",
			intro: "开启后SP神赵云，神周泰，魔孟获的负面效果中将包含失效技能",
			init: false,
			onclick: function (item) {
				alert("该功能并未测试联机或AI是否适用\n出bug概不由@虫豸负责\n出事请找@时机已到，今日起兵");
				game.saveExtensionConfig("极略", "jlsg_disableSkill", item);
			},
		},
		oldCharacterReplace: {
			clear: true,
			name: "<li>技能替换（点击后折叠）▽",
			onclick: function () {
				if (lib.config.oldCharacterReplace == undefined) {
					lib.config.oldCharacterReplace = [];
					let nextSibling = this.nextSibling;
					while (!get.plainText(nextSibling.innerHTML).includes("debug")) {
						lib.config.oldCharacterReplace.push(nextSibling);
						nextSibling = nextSibling.nextSibling;
					}
					this.innerHTML = "<li>技能替换（点击后展开）▷";
					lib.config.oldCharacterReplace.forEach(function (element) {
						element.hide();
					});
				} else {
					this.innerHTML = "<li>技能替换（点击后折叠）▽";
					lib.config.oldCharacterReplace.forEach(function (element) {
						element.show();
					});
					delete lib.config.oldCharacterReplace;
				}
			},
		},
	},
	oldCharacterReplace = {
		sr: {
			jlsgsr_caocao: {
				jlsg_upgrade: true,
				name: "SR曹操",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
					2: "二代",
					3: "三代",
				},
				onclick(item) {
					game.saveExtensionConfig("极略", "jlsgsr_caocao", item);
					if (item == "false" || Boolean(item) > 3) {
						let upgradeList = lib.config.extension_极略_upgradeList || [];
						upgradeList.add("jlsgsr_caocao");
						game.saveExtensionConfig("极略", "upgradeList", upgradeList);
					} else {
						if (lib.config.extension_极略_upgradeList?.includes("jlsgsr_caocao")) {
							let upgradeList = lib.config.extension_极略_upgradeList || [];
							upgradeList.remove("jlsgsr_caocao");
							game.saveExtensionConfig("极略", "upgradeList", upgradeList);
						}
					}
				},
			},
			jlsgsr_guojia: {
				name: "SR郭嘉",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsr_huanggai: {
				name: "SR黄盖",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsr_ganning: {
				name: "SR甘宁",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsr_luxun: {
				name: "SR陆逊",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsr_liubei: {
				jlsg_upgrade: true,
				name: "SR刘备",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
				onclick(item) {
					game.saveExtensionConfig("极略", "jlsgsr_liubei", item);
					if (item == "false" || Boolean(item) > 1) {
						let upgradeList = lib.config.extension_极略_upgradeList || [];
						upgradeList.add("jlsgsr_liubei");
						game.saveExtensionConfig("极略", "upgradeList", upgradeList);
					} else {
						if (lib.config.extension_极略_upgradeList?.includes("jlsgsr_liubei")) {
							let upgradeList = lib.config.extension_极略_upgradeList || [];
							upgradeList.remove("jlsgsr_liubei");
							game.saveExtensionConfig("极略", "upgradeList", upgradeList);
						}
					}
				},
			},
			jlsgsr_sunquan: {
				jlsg_upgrade: true,
				name: "SR孙权",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
				onclick(item) {
					game.saveExtensionConfig("极略", "jlsgsr_sunquan", item);
					if (item == "false" || Boolean(item) > 1) {
						let upgradeList = lib.config.extension_极略_upgradeList || [];
						upgradeList.add("jlsgsr_sunquan");
						game.saveExtensionConfig("极略", "upgradeList", upgradeList);
					} else {
						if (lib.config.extension_极略_upgradeList?.includes("jlsgsr_sunquan")) {
							let upgradeList = lib.config.extension_极略_upgradeList || [];
							upgradeList.remove("jlsgsr_sunquan");
							game.saveExtensionConfig("极略", "upgradeList", upgradeList);
						}
					}
				},
			},
		},
		sk: {
			jlsgsk_guansuo: {
				name: "SK关索",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsk_jiangwei: {
				name: "SP姜维",
				intro: "修改[才遇]",
				init: "false",
				item: {
					false: "关闭",
					character: "全扩",
					skills: "全部技能",
					all: "全都要",
				},
			},
			jlsgsk_sundeng: {
				name: "SK孙登",
				init: "false",
				item: {
					false: "最新",
					xiaoas: "谷歌",
				},
			},
			jlsgsk_wanniangongzhu: {
				name: "SK万年公主",
				intro: "“极略”为极略官方版本[兴汉]<br>“无名杀”为加强版本[兴汉]<br>“谷歌”为[兴汉]魔改版本",
				init: "false",
				item: {
					false: "极略",
					xiaoas: "谷歌",
					noname: "无名杀",
				},
			},
			jlsgsk_wenyang: {
				name: "SK文鸯",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsk_zhaoyan: {
				name: "SK赵嫣",
				init: "false",
				item: {
					false: "最新",
					xiaoas: "谷歌",
				},
			},
			jlsgsk_lvlingqi: {
				name: "SK吕玲绮",
				init: "false",
				item: {
					false: "最新",
					xiaoas: "谷歌",
				},
			},
		},
		soul: {
			jlsgsoul_caocao: {
				name: "SK神曹操",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_dianwei: {
				name: "SK神典韦",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_diaochan: {
				name: "SK神貂蝉",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_huangyueying: {
				name: "SK神黄月英",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_huanggai: {
				name: "SK神黄盖",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_jiaxu: {
				name: "SK神贾诩",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_liubei: {
				name: "SK神刘备",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_lvmeng: {
				name: "SK神吕蒙",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_lvbu: {
				name: "SK神吕布",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_sunquan: {
				name: "SK神孙权",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_simayi: {
				name: "SK神司马懿",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_zhangjiao: {
				name: "SK神张角",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_sp_zhangjiao: {
				name: "SP神张角",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_zhangfei: {
				name: "SK神张飞",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_guojia: {
				name: "SK神郭嘉",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_zhugeliang: {
				name: "SK神诸葛亮",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_ganning: {
				name: "SK神甘宁",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
					2: "二代",
				},
			},
			jlsgsoul_xiahoudun: {
				name: "SK神夏侯惇",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_zhangliao: {
				name: "SK神张辽",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsoul_sp_zhugeliang: {
				name: "SP神诸葛亮",
				init: "false",
				intro: "“极略”为极略官方版本[妖智]<br>“无名杀”为全扩版本[妖智]",
				item: {
					false: "极略",
					noname: "无名杀",
				},
			},
		},
		sy: {
			jlsgsy_weiyan: {
				name: "嗜血狂狼[魏延]",
				init: "false",
				item: {
					false: "最新",
					1: "一代",
				},
			},
			jlsgsy_caifuren: {
				name: "蛇蝎美人[蔡夫人]",
				init: "false",
				item: {
					false: "最新",
					xiaoas: "谷歌",
				},
			},
		},
	};
for (let packName in oldCharacterReplace) {
	const info = oldCharacterReplace[packName];
	const nameList = Object.keys(info).sort((a, b) => {
		let nameA = info[a].name,
			nameB = info[b].name;
		return nameA.localeCompare(nameB);
	});
	for (let name of nameList) block[name] = info[name];
}
block = {
	...block,
	debug: {
		name: "<span style='color:#808080'>debug</span>",
		intro: "禁用所有其他武将包 <span style='color:#FF0000'>测试用！</span>",
		init: false,
	},
};
export let config = block;
