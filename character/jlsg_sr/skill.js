import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	//SR武将规则
	_jlsgsr_choice: {
		charlotte: true,
		unique: true,
		trigger: {
			global: "gameStart",
			player: ["enterGame", "changeCharacterAfter"],
		},
		filter(event, player) {
			if (get.itemtype(player) != "player") {
				return false;
			}
			const nameList = get.nameList(player);
			return nameList.some(name => name.startsWith("jlsgsr_"));
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			const nameList = get.nameList(player),
				upgradeList = lib.config.extension_极略_upgradeList || [];
			for (const name of nameList) {
				if (!name.startsWith("jlsgsr_")) {
					continue;
				}
				if (upgradeList.includes(name)) {
					if (_status._jlsgsr_upgrade?.[player.playerid]?.[name]) {
						continue;
					}
					let info = [false, false, false, false],
						choiceList = [...Object.keys(lib.skill[event.name].upgradeContent[name]), "技能突破", "携带所有技能"];
					if (!lib.config.extension_极略_srlose) {
						info = info.slice(0, -1);
						choiceList = choiceList.slice(0, -1);
					}
					//非强制突破，非顺次选择
					const upgrade = await player
						.chooseButton([1, 4], [`请选择${get.translation(name)}的突破`, [choiceList.map((item, i) => [i, item]), "textbutton"]])
						.set("ai", button => true)
						.forResult();
					if (upgrade?.bool) {
						const choice = upgrade.links;
						event.info = info;
						if (choice.includes(0)) {
							await lib.skill[event.name].upgradeContent[name][choiceList[0]](event, trigger, player);
						}
						if (choice.includes(1)) {
							await lib.skill[event.name].upgradeContent[name][choiceList[1]](event, trigger, player);
						}
						if (choice.includes(2)) {
							info[2] = true;
							const skills = lib.skill._jlsgsr_choice.createList(name);
							game.broadcastAll(
								function (player, skills) {
									_status._jlsgsr_upgrade ??= {};
									_status._jlsgsr_upgrade[player.playerid] ??= {};
									_status._jlsgsr_upgrade[player.playerid].other ??= {};
									for (let i of skills) {
										_status._jlsgsr_upgrade[player.playerid].other[i] = true;
									}
								},
								player,
								skills
							);
						}
						if (choice.includes(3)) {
							info[3] = true;
						}
						//将结果广播
						/*_status_jlsgsr_upgrade = {
								//角色id
								"player.playerid": {
									//武将名：[第一次突破, 第二次突破, 第三次突破(技能突破), 第四次突破(携带所有技能)]
									characterName: [false, false, false, false],
									
									//突破技能单独存储
									other:{
										skill:Boolean,
									},
								},
							}*/
						game.broadcastAll(
							function (player, name, info) {
								_status._jlsgsr_upgrade ??= {};
								_status._jlsgsr_upgrade[player.playerid] ??= {};
								_status._jlsgsr_upgrade[player.playerid][name] = info;
							},
							player,
							name,
							info
						);
					}
				}
				//原srlose部分
				if (!lib.config.extension_极略_srlose || _status._jlsgsr_upgrade?.[player.playerid]?.[name]?.[3]) {
					continue;
				}
				const skills = lib.skill._jlsgsr_choice.createList(name);
				if (skills.length < 2) {
					continue;
				}
				let str = "";
				for (const skill of skills) {
					str += '<div class="text" style="width:90%;display:inline-block">' + '<div class="skill"><font color="#FFFF00"><span style="font-size:18px">' + lib.translate[skill] + "</font></span></div>" + '<div><font color="#9AFF02"><span style="font-size:16px">' + lib.translate[skill + "_info"] + "</font></span></div>" + "</div><br><br><br>";
				}
				const result = await player
					.chooseControl(skills)
					.set("prompt", "选择" + get.translation(name) + "禁用1个技能<br><br>" + str)
					.set("ai", () => get.event().choice)
					.set(
						"choice",
						(function () {
							return skills.randomGet();
						})()
					)
					.forResult();
				if (result.control == "cancel2") {
					continue;
				}
				player.removeSkill(result.control);
				player.update();
			}
		},
		createList(name) {
			const list = [];
			const info = get.character(name);
			if (info) {
				const skills = info.skills;
				for (const skill of skills) {
					let infox = get.info(skill);
					if (lib.translate[skill + "_info"] && infox.srlose) {
						list.add(skill);
					}
				}
			}
			return list;
		},
		//属性突破列表
		upgradeContent: {
			jlsgsr_simayi: {
				"初始手牌数+3": async function (event, trigger, player) {
					player.when({ global: "gameDrawBegin" }).step(async function (event, trigger, player) {
						const me = player,
							numx = trigger.num;
						trigger.num =
							typeof numx == "function"
								? function (player) {
										if (player == me) {
											return numx(player) + 3;
										}
										return numx(player);
									}
								: function (player) {
										if (player == me) {
											return numx + 3;
										}
										return numx;
									};
					});
					event.info[0] = true;
				},
				"体力上限+1": async function (event, trigger, player) {
					game.broadcastAll(function (player) {
						player.maxHp++;
						player.hp++;
						player.update();
					}, player);
					event.info[1] = true;
				},
			},
			jlsgsr_zhugeliang: {
				"手牌上限+3": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[0] = "maxHandcard|3";
				},
				"体力上限+1": async function (event, trigger, player) {
					game.broadcastAll(function (player) {
						player.maxHp++;
						player.hp++;
						player.update();
					}, player);
					event.info[1] = true;
				},
			},
			jlsgsr_caocao: {
				"手牌上限+3": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[0] = "maxHandcard|3";
				},
				"体力上限+1": async function (event, trigger, player) {
					game.broadcastAll(function (player) {
						player.maxHp++;
						player.hp++;
						player.update();
					}, player);
					event.info[1] = true;
				},
			},
			jlsgsr_liubei: {
				"起始手牌数+3": async function (event, trigger, player) {
					player.directgain(get.cards(3));
					event.info[0] = true;
				},
				"摸牌数+1": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[1] = "draw|1";
				},
			},
			jlsgsr_sunquan: {
				"出【杀】次数+2": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[0] = "sha|2";
				},
				"摸牌数+1": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[1] = "draw|1";
				},
			},
			jlsgsr_lvbu: {
				"出【杀】次数+2": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[0] = "sha|2";
				},
				"摸牌数+1": async function (event, trigger, player) {
					game.addGlobalSkill("_jlsgsr_upgrade_effect", player);
					event.info[1] = "draw|1";
				},
			},
		},
		async extraUpgrade(event, trigger, player) {
			const { skill } = event,
				upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage.other) {
				upgradeStorage.other = {};
			} else if (upgradeStorage.other[skill]) {
				return;
			}
			let name = Object.keys(upgradeStorage).find(name => {
				const createList = lib.skill._jlsgsr_choice.createList;
				return createList(name).includes(skill);
			});
			if (name) {
				if (upgradeStorage?.[name]?.[2]) {
					event.check = true;
				}
			}
			if (!event.check) {
				const buttons = [skill, skill + "_upgrade"].map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + (i.endsWith("_upgrade") ? "突破" : "原始") + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
				let result = await player
					.chooseBool()
					.set("createDialog", [`是否突破【${get.translation(skill)}】`, [buttons, "textbutton"]])
					.set("ai", () => true)
					.forResult();
				event.check = result?.bool;
			}
			if (event.check) {
				upgradeStorage.other[skill] = true;
			} else {
				upgradeStorage.other[skill] = false;
			}
			game.broadcastAll(
				function (player, info) {
					_status._jlsgsr_upgrade ??= {};
					_status._jlsgsr_upgrade[player.playerid] = info;
				},
				player,
				upgradeStorage
			);
		},
	},
	_jlsgsr_upgrade_effect: {
		charlotte: true,
		unique: true,
		mod: {
			maxHandcard(player, num) {
				let nameList = get.nameList(player),
					upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {},
					numx = 0;
				for (let name in upgrade) {
					if (!nameList.includes(name)) {
						continue;
					}
					let infoList = upgrade[name].filter(info => typeof info === "string" && info.startsWith("maxHandcard")).map(info => Number(info.split("|")[1]));
					numx += infoList.reduce((sum, info) => sum + info, 0);
				}
				return num + numx;
			},
			cardUsable(card, player, num) {
				let nameList = get.nameList(player),
					upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {},
					numx = 0;
				for (let name in upgrade) {
					if (!nameList.includes(name)) {
						continue;
					}
					let infoList = upgrade[name].filter(info => typeof info === "string" && info.startsWith("sha")).map(info => Number(info.split("|")[1]));
					numx += infoList.reduce((sum, info) => sum + info, 0);
				}
				if (card.name == "sha") {
					return num + numx;
				}
			},
		},
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			if (event.numFixed) {
				return false;
			}
			let nameList = get.nameList(player),
				upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {};
			return nameList.some(name => {
				if (!(name in upgrade)) {
					return false;
				}
				return upgrade[name].some(info => typeof info === "string" && info.startsWith("draw"));
			});
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			let nameList = get.nameList(player),
				upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {},
				num = 0;
			for (let name in upgrade) {
				if (!nameList.includes(name)) {
					continue;
				}
				let infoList = upgrade[name].filter(info => typeof info === "string" && info.startsWith("draw")).map(info => Number(info.split("|")[1]));
				num += infoList.reduce((sum, info) => sum + info, 0);
			}
			trigger.num += num;
		},
	},

	jlsg_wuwei: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseDrawBegin1" },
		filter(event, player) {
			return event.num > 0 && !event.numFixed;
		},
		check: function (event) {
			return event.num <= 3;
		},
		async content(event, trigger, player) {
			trigger.changeToZero();
			const cards = get.cards(3);
			await game.cardsGotoOrdering(cards);
			await player.showCards(cards);
			if (cards.every(card => get.type(card) == "basic")) {
				await player.gain(cards, "gain2");
				return;
			}
			const sha = get.autoViewAs({ name: "sha" }, []);
			if (player.hasUseTarget(sha, false)) {
				while (cards.some(card => get.type(card) == "basic")) {
					const chooseCard = await player
						.chooseCardButton("无畏：请选择视为使用【杀】弃置的牌", cards)
						.set("filterButton", function (button) {
							return get.type(button.link) == "basic";
						})
						.set("ai", function (button) {
							if (jlsg.isWeak(get.player())) {
								return button.link.name != "du" || button.link.name != "tao";
							}
							return 8 - get.value(button.link);
						})
						.forResult();
					if (!chooseCard.bool || !chooseCard.links?.length) {
						break;
					}
					const result = await player
						.chooseUseTarget("请选择无畏的目标", sha, "nodistance")
						.set("filterTarget", (card, player, target) => {
							if (!player.canUse(card, target, false)) {
								return false;
							}
							const targets = player
								.getHistory("useCard", evt => {
									const evtx = evt.getParent("jlsg_wuwei", true);
									if (evtx?.getParent("phaseDraw", true) != trigger) {
										return false;
									}
									return evt.targets?.length;
								})
								.reduce((list, evt) => list.addArray(evt.targets), []);
							return !targets.includes(target);
						})
						.set("ai", target => {
							const player = get.player(),
								sha = get.event().card;
							return get.effect(target, sha, player, player);
						})
						.forResult();
					if (!result?.bool) {
						break;
					} else {
						await game.cardsDiscard(chooseCard.links);
						cards.removeArray(chooseCard.links);
					}
				}
				if (cards.length) {
					await player.gain(cards, "gain2");
				}
			}
		},
		ai: {
			threaten: 1.5,
		},
	},
	jlsg_yansha: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			const cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		trigger: { player: "phaseDrawBegin2" },
		filter(event) {
			return event.num > 0 && !event.numFixed;
		},
		check: function (event, player) {
			if (Math.min(3, player.hp) < player.countCards("h") && player.skipList.includes("phaseUse") && !player.skipList.includes("phaseDiscard")) {
				return true;
			}
			return 3 - player.getExpansions("jlsg_yansha").length && player.countCards("h") > 1;
		},
		async content(event, trigger, player) {
			trigger.num--;
			const phase = trigger.getParent("phase");
			player.when({ player: "phaseDiscardBegin" }).step(async function (event, trigger, player) {
				if (phase != trigger.getParent("phase")) {
					return;
				}
				const result = await player
					.chooseCard(`###${get.prompt("jlsg_yansha")}###将一张手牌牌置于武将牌上作为「掩」`, "h")
					.set("ai", card => {
						return 7 - get.value(card);
					})
					.forResult();
				if (result.bool && result.cards.length) {
					player.logSkill("jlsg_yansha");
					const next = player.addToExpansion(result.cards, player, "give");
					next.gaintag.add("jlsg_yansha");
					await next;
				}
			});
		},
		group: ["jlsg_yansha_sha"],
		subSkill: {
			sha: {
				sub: true,
				sourceSkill: "jlsg_yansha",
				audio: "ext:极略/audio/skill/jlsg_yansha2.mp3",
				trigger: { global: "shaBegin" },
				filter: function (event, player) {
					return event.player != player && player.countExpansions("jlsg_yansha") > 0 && event.player.countCards("he") > 0;
				},
				logTarget: "player",
				prompt(event, player) {
					return get.prompt("jlsg_yansha", event.player);
				},
				prompt2: "一名其他角色使用【杀】选择目标后，你可以将一张「掩」置入弃牌堆，然后获得其两张牌。",
				check: function (event, player) {
					if (event.player.countCards("he") > 1 && get.attitude(player, event.player) < 0) {
						return 2;
					}
					if (get.attitude(player, event.target) > 0) {
						if (event.target.isDamaged() && event.target.getEquip("baiyin")) {
							return 2;
						}
						if (!event.target.countCards("h") && event.player.countCards("he") > 0) {
							return 1;
						}
					}
					if (get.attitude(player, event.player) < 0) {
						const subtypes = Array.from({ length: 5 }, (v, i) => "equip" + (i + 1).toString());
						for (let subtype of subtypes) {
							if (!player.getEquips(subtype).length && event.player.getEquips(subtype).length) {
								return 2;
							}
						}
					}
					return 0;
				},
				async content(event, trigger, player) {
					const result = await player.chooseCardButton("掩杀", player.getExpansions("jlsg_yansha"), true).forResult();
					if (result.bool && result.links?.length) {
						await player.loseToDiscardpile(result.links);
						if (trigger.player.countCards("he")) {
							await player.gainPlayerCard(trigger.player, 2, "he", true);
						}
					}
				},
			},
		},
	},
	jlsg_liuyun: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filterCard: function (card) {
			return get.color(card) == "black";
		},
		position: "he",
		filter: function (event, player) {
			return player.countDiscardableCards(player, "he", card => get.color(card) == "black") > 0 && !player.isLinked();
		},
		check: function (card) {
			return 8 - get.value(card);
		},
		prompt: "横置并弃置一张黑色牌，令一名角色选择一项：回复一点体力或摸两张牌",
		filterTarget: true,
		async content(event, trigger, player) {
			await player.link();
			const target = event.targets[0];
			if (target.isHealthy()) {
				await target.draw(2);
			} else {
				const result = await target
					.chooseControl("draw_card", "recover_hp")
					.set("ai", function () {
						const player = get.player();
						if (player.hp == 1 && player.maxHp > 2) {
							return "recover_hp";
						} else if (player.hp == 2 && player.maxHp > 2 && player.countCards("h") > 1) {
							return "recover_hp";
						} else {
							return "draw_card";
						}
					})
					.forResult();
				switch (result.control) {
					case "recover_hp":
						await target.recover(1);
						break;
					case "draw_card":
						await target.draw(2);
						break;
				}
			}
		},
		ai: {
			threaten: 1.5,
			expose: 0.2,
			order: 9,
			result: {
				player: function (player) {
					if (player.num("h") > player.hp) {
						return 1;
					}
					if (jlsg.hasLoseHandcardEffective(player)) {
						return 2;
					}
					return -1;
				},
				target: function (player, target) {
					if (jlsg.isWeak(target)) {
						return 5;
					}
					return 2;
				},
			},
		},
	},
	jlsg_lingbo: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { global: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			if (!player.isLinked()) {
				return false;
			}
			return game.hasPlayer(current => {
				return current.countCards("je");
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget("###是否发动【凌波】？###将场上的一张牌置于牌堆顶", function (card, player, target) {
					return target.countCards("ej") > 0;
				})
				.set("ai", function (target) {
					const player = get.player();
					if (get.attitude(player, target) > 0) {
						return target.countCards("j");
					} else if (get.attitude(player, target) < 0) {
						return target.countCards("e");
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			await player.link();
			const {
				targets: [target],
			} = event;
			const result = await player.choosePlayerCard("将目标的一张牌置于牌堆顶", target, "ej", true).forResult();
			if (!result.bool || !result.links?.length) {
				return;
			}
			const {
				links: [card],
			} = result;
			await target.lose(card, ui.cardPile, "insert", "visible");
			target.$throw(card, 1000);
			game.log(player, "将", card, "置于牌堆顶");
			if (target == game.me) {
				await game.delay(0.5);
			}
		},
		ai: {
			effect: {
				target: function (card) {
					if (card.name == "tiesuo") {
						return 0.5;
					}
				},
			},
		},
	},
	jlsg_qingcheng: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: ["chooseToUse", "chooseToRespond"],
		filter(event, player) {
			if (player.isLinked()) {
				return event.filterCard(get.autoViewAs({ name: "shan" }, []), player, event);
			}
			return event.filterCard(get.autoViewAs({ name: "sha" }, []), player, event);
		},
		filterCard() {
			return false;
		},
		selectCard: -1,
		viewAs(cards, player) {
			if (player.isLinked()) {
				return { name: "shan" };
			}
			return { name: "sha" };
		},
		prompt: "横置武将牌，视为使用/打出一张杀<br>重置武将牌，视为使用/打出一张闪",
		check: () => 1,
		async precontent(event, trigger, player) {
			await player.link();
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				let filter;
				switch (tag) {
					case "respondSha":
						filter = !player.isLinked();
						break;
					case "respondShan":
						filter = player.isLinked();
						break;
				}
				return filter;
			},
		},
	},
	//旧版技能
	// jlsg_lingbo: {
	//   audio: "ext:极略/audio/skill:1",
	//   srlose: true,
	//   group: ['jlsg_lingbo1', 'jlsg_lingbo2'],
	// },
	// jlsg_lingbo1: {
	//   trigger: {
	//     global: "phaseEnd",
	//   },
	//   filter: function (event, player) {
	//     return player.countCards('e') > 0 && event.player != player && player.isLinked();
	//   },
	//   check: function (event, player) {
	//     return get.attitude(player, event.player) > 0;
	//   },
	//   content: function () {
	//     'step 0'
	//     player.chooseCard('e', 1, true).set('ai', function (card) {
	//       var sub = get.subtype(card);
	//       if (_status.event.player.isEmpty(sub)) return -10;
	//       return get.unuseful(card);
	//     });
	//     'step 1'
	//     if (result.bool) {
	//       trigger.player.equip(result.cards[0]);
	//       player.$give(result.cards, trigger.player);
	//     }
	//     'step 2'
	//     if (player.isLinked()) player.link();
	//   },
	// },
	// jlsg_lingbo2: {
	//   trigger: {
	//     global: "phaseBegin",
	//   },
	//   filter: function (event, player) {
	//     var card = ui.selected.cards[0];
	//     if (!card) return false;
	//     if (get.position(card) == 'e' && !target.isEmpty(get.subtype(card))) return false;
	//     return event.player != player && event.player.countCards('ej') > 0 && !player.isLinked();
	//   },
	//   check: function (event, player) {
	//     return get.attitude(player, event.player) > 0;
	//   },
	//   content: function () {
	//     "step 0"
	//     var List = [];
	//     List.push(trigger.player.getCards('ej'));
	//     player.chooseButton(List, 1, true).set('ai', function (button) {
	//       //if(get.attitude(player,trigger.player)<=0){
	//       //if(get.type(button.link)=='equip')  return 10;
	//       //return 0;
	//       //}
	//       //else if(get.attitude(player,trigger.player)>=3){
	//       //if(get.type(button.link)=='delay')  return 10;
	//       //return 0;
	//       //}
	//       if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('lebu') && get.type(button.link) == 'equip') return get.suit(card) == 'heart';
	//       if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('bingliang') && get.type(button.link) == 'equip') return get.suit(card) == 'club';
	//       if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('shandian') && get.type(button.link) == 'equip') return (get.suit(card) != 'spade' || (card.number < 2 || card.number > 9));
	//       if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('lebu') && get.type(button.link) == 'equip') return get.suit(card) != 'heart';
	//       if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('bingliang') && get.type(button.link) == 'equip') return get.suit(card) != 'club';
	//       if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('shandian') && get.type(button.link) == 'equip') return (get.suit(card) == 'spade' && card.number >= 2 && card.number <= 9);
	//       return 0;
	//     });
	//     "step 1"
	//     if (result.bool) {
	//       ui.cardPile.insertBefore(result.links[0], ui.cardPile.firstChild);
	//     }
	//     "step 2"
	//     if (!player.isLinked()) player.link();
	//   },
	// },
	// jlsg_liuyun: {
	//   audio: "ext:极略/audio/skill:2",
	//   srlose: true,
	//   enable: 'phaseUse',
	//   usable: 1,
	//   filterCard: function (card) {
	//     return get.color(card) == 'black';
	//   },
	//   position: 'he',
	//   filter: function (event, player) {
	//     return player.countCards('he', { color: 'black' }) > 0 && !player.isLinked();
	//   },
	//   check: function (card) {
	//     return 8 - get.value(card)
	//   },
	//   prompt: '弃置一张黑色牌，令一名角色选择一项：恢复1点体力或摸两张牌',
	//   filterTarget: true,
	//   content: function () {
	//     player.link();
	//     target.chooseDrawRecover(2, true);
	//   },
	//   ai: {
	//     expose: 0.2,
	//     order: 9,
	//     result: {
	//       player: function (player) {
	//         if (player.countCards('h', function (card) {
	//           return get.color(card) == 'black';
	//         }) > player.hp) return 1;
	//         return -1;
	//       },
	//       target: function (player, target) {
	//         var result = 2;
	//         if (target.isTurnedOver()) result += 3;
	//         if (target.hp == 1) result += 3;
	//         return result;
	//       }
	//     },
	//     threaten: 1.5
	//   }
	// },
	// jlsg_qingcheng_zhu: {
	//   srlose: true,
	//   trigger: { global: "gameDrawEnd" },
	//   forced: true,
	//   content: function () {
	//     if (player.hasSkill('jlsg_liuyun')) {
	//       player.addSkill('jlsg_qingcheng_yin');
	//       player.removeSkill('jlsg_qingcheng_zhu');
	//     } else {
	//       player.addSkill('jlsg_qingcheng_yang');
	//       player.removeSkill('jlsg_qingcheng_zhu');
	//     }
	//   },
	// },
	// jlsg_qingcheng_yang: {
	//   audio: "ext:极略/audio/skill:1",
	//   group: ['jlsg_qingcheng_yang1', 'jlsg_qingcheng_yang2'],
	// },
	// jlsg_qingcheng_yang1: {
	//   audio: "ext:极略/audio/skill:true",
	//   enable: ['chooseToUse', 'chooseToRespond'],
	//   filterCard: function () {
	//     return false;
	//   },
	//   selectCard: -1,
	//   viewAs: { name: 'sha' },
	//   viewAsFilter: function (player) {
	//     return !player.isLinked();
	//   },
	//   prompt: '横置你的武将牌，视为打出一张【杀】',
	//   check: function () {
	//     return 1
	//   },
	//   onuse: function (result, player) {
	//     if (!player.isLinked()) player.link();
	//   },
	//   onrespond: function (result, player) {
	//     if (!player.isLinked()) player.link();
	//   },
	//   ai: {
	//     skillTagFilter: function (player) {
	//       return !player.isLinked();
	//     },
	//     respondSha: true,
	//     basic: {
	//       useful: [5, 1],
	//       value: [5, 1],
	//     },
	//     order: function () {
	//       if (_status.event.player.hasSkillTag('presha', true, null, true)) return 10;
	//       return 3;
	//     },

	//     result: {
	//       target: function (player, target) {
	//         if (player.hasSkill('jiu') && !target.getEquip('baiyin')) {
	//           if (get.attitude(player, target) > 0) {
	//             return -6;
	//           } else {
	//             return -3;
	//           }
	//         }
	//         return -1.5;
	//       },
	//     },
	//     tag: {
	//       respond: 1,
	//       respondShan: 1,
	//       damage: function (card) {
	//         if (card.nature == 'poison') return;
	//         return 1;
	//       },
	//       natureDamage: function (card) {
	//         if (card.nature) return 1;
	//       },
	//       fireDamage: function (card, nature) {
	//         if (card.nature == 'fire') return 1;
	//       },
	//       thunderDamage: function (card, nature) {
	//         if (card.nature == 'thunder') return 1;
	//       },
	//       poisonDamage: function (card, nature) {
	//         if (card.nature == 'poison') return 1;
	//       },
	//     },

	//   },

	// },
	// jlsg_qingcheng_yang2: {
	//   audio: "ext:极略/audio/skill:true",
	//   enable: ["chooseToUse", "chooseToRespond"],
	//   filterCard: function () {
	//     return false;
	//   },
	//   selectCard: -1,
	//   viewAs: { name: 'shan' },
	//   viewAsFilter: function (player) {
	//     return player.isLinked();
	//   },
	//   prompt: '重置你的武将牌，视为打出一张【闪】',
	//   check: function () {
	//     return 1
	//   },
	//   onuse: function (result, player) {
	//     if (player.isLinked()) player.link();
	//   },
	//   onrespond: function (result, player) {
	//     if (player.isLinked()) player.link();
	//   },
	//   ai: {
	//     skillTagFilter: function (player) {
	//       return player.isLinked();
	//     },
	//     respondShan: true,
	//     basic: {
	//       useful: [7, 2],
	//       value: [7, 2],
	//     },
	//   }
	// },
	// jlsg_qingcheng_yin: {
	//   audio: "ext:极略/audio/skill:1",
	//   group: ['jlsg_qingcheng_yin1', 'jlsg_qingcheng_yin2'],
	// },
	// jlsg_qingcheng_yin1: {
	//   audio: "ext:极略/audio/skill:true",
	//   enable: ['chooseToUse', 'chooseToRespond'],
	//   filterCard: function () {
	//     return false;
	//   },
	//   selectCard: -1,
	//   viewAs: { name: 'sha' },
	//   viewAsFilter: function (player) {
	//     return player.isLinked();
	//   },
	//   prompt: '重置你的武将牌，视为打出一张【杀】',
	//   check: function () {
	//     return 1
	//   },
	//   onuse: function (result, player) {
	//     if (player.isLinked()) player.link();
	//   },
	//   onrespond: function (result, player) {
	//     if (player.isLinked()) player.link();
	//   },
	//   ai: {
	//     skillTagFilter: function (player) {
	//       return !player.isLinked();
	//     },
	//     respondSha: true,
	//     basic: {
	//       useful: [5, 1],
	//       value: [5, 1],
	//     },
	//     order: function () {
	//       if (_status.event.player.hasSkillTag('presha', true, null, true)) return 10;
	//       return 3;
	//     },

	//     result: {
	//       target: function (player, target) {
	//         if (player.hasSkill('jiu') && !target.getEquip('baiyin')) {
	//           if (get.attitude(player, target) > 0) {
	//             return -6;
	//           } else {
	//             return -3;
	//           }
	//         }
	//         return -1.5;
	//       },
	//     },
	//     tag: {
	//       respond: 1,
	//       respondShan: 1,
	//       damage: function (card) {
	//         if (card.nature == 'poison') return;
	//         return 1;
	//       },
	//       natureDamage: function (card) {
	//         if (card.nature) return 1;
	//       },
	//       fireDamage: function (card, nature) {
	//         if (card.nature == 'fire') return 1;
	//       },
	//       thunderDamage: function (card, nature) {
	//         if (card.nature == 'thunder') return 1;
	//       },
	//       poisonDamage: function (card, nature) {
	//         if (card.nature == 'poison') return 1;
	//       },
	//     },

	//   },

	// },
	// jlsg_qingcheng_yin2: {
	//   audio: "ext:极略/audio/skill:true",
	//   enable: ["chooseToUse", "chooseToRespond"],
	//   filterCard: function () {
	//     return false;
	//   },
	//   selectCard: -1,
	//   viewAs: { name: 'shan' },
	//   viewAsFilter: function (player) {
	//     return !player.isLinked();
	//   },
	//   prompt: '横置你的武将牌，视为打出一张【闪】',
	//   check: function () {
	//     return 1
	//   },
	//   onuse: function (result, player) {
	//     if (!player.isLinked()) player.link();
	//   },
	//   onrespond: function (result, player) {
	//     if (!player.isLinked()) player.link();
	//   },
	//   ai: {
	//     skillTagFilter: function (player) {
	//       return player.isLinked();
	//     },
	//     respondShan: true,
	//     basic: {
	//       useful: [7, 2],
	//       value: [7, 2],
	//     },
	//   }
	// },
	jlsg_aozhan: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		shaRelated: true,
		marktext: "战",
		intro: {
			markcount: "expansion",
			content: "expansion",
		},
		onremove(player, skill) {
			const cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		filter(event, player) {
			if (event.num <= 0) {
				return false;
			}
			return event.card?.name == "sha" || event.card?.name == "juedou";
		},
		frequent: true,
		check() {
			return true;
		},
		async content(event, trigger, player) {
			const cards = get.cards(trigger.num);
			const next = player.addToExpansion(cards, "gain2");
			next.gaintag.add("jlsg_aozhan");
			await next;
		},
		group: ["jlsg_aozhan_use"],
		subSkill: {
			use: {
				audio: "jlsg_aozhan",
				enable: "phaseUse",
				usable: 1,
				filter: function (event, player) {
					return player.getExpansions("jlsg_aozhan").length;
				},
				async content(event, trigger, player) {
					const result = await player
						.chooseControl("收入手牌", "置入弃牌堆")
						.set("dialog", ["战", player.getExpansions("jlsg_aozhan")])
						.set("ai", function (event, player) {
							let value = 0,
								i;
							const cards = player.getExpansions("jlsg_aozhan");
							for (i = 0; i < cards.length; i++) {
								value += get.value(cards[i]);
								if (jlsg.isWeak(player) && get.tag(cards[i], "save")) {
									value += get.value(cards[i]);
								}
							}
							value /= player.getExpansions("jlsg_aozhan").length;
							if (value > 4) {
								return "收入手牌";
							}
							return "置入弃牌堆";
						})
						.forResult();
					const cards = player.getExpansions("jlsg_aozhan");
					if (result.control == "置入弃牌堆") {
						await player.loseToDiscardpile(cards);
						await player.draw(cards.length);
					} else {
						await player.gain(cards, "log", "gain2");
					}
				},
				ai: {
					order: 1,
					result: {
						player: function (player) {
							if (player.getExpansions("jlsg_aozhan").length >= 2) {
								return 1;
							}
							if (player.hp + player.countCards("h") <= 3) {
								return 0.5;
							}
							return 0;
						},
					},
				},
			},
		},
	},
	jlsg_huxiao: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		shaRelated: true,
		trigger: { source: "damageBegin1" },
		filter: function (event, player) {
			return !player.isTurnedOver() && player.isPhaseUsing(true) && event.card?.name == "sha";
		},
		check: function (event, player) {
			if (!event.player) {
				return -1;
			}
			if (get.attitude(player, event.player) > 0) {
				return false;
			}
			if (event.player.hasSkillTag("filterDamage")) {
				return false;
			}
			if (
				event.player.hasSkillTag("filterDamage", null, {
					player: player,
					card: event.card,
				})
			) {
				return -10;
			}
			const e2 = event.player.getVEquips("equip2");
			if (e2) {
				if (e2.some(card => card.name == "tengjia")) {
					if (game.hasNature(event, "fire")) {
						return 10;
					}
				}
			}
			if (event.player.hasSkill("kuangfeng2") && game.hasNature(event, "fire")) {
				return 10;
			}
			return get.damageEffect(event.player, player, player, get.nature(event));
		},
		async content(event, trigger, player) {
			trigger.num++;
			await player.draw();
			player
				.when({ player: "useCardAfter" })
				.filter(evt => evt.card == trigger.card)
				.step(async function (event, trigger, player) {
					const evt = trigger.getParent("phaseUse", true);
					if (evt?.name == "phaseUse") {
						evt.skipped = true;
					}
					const evtx = trigger.getParent("phase", true);
					if (evtx?.name == "phase") {
						evtx.finish();
					}
					await player.turnOver();
				});
		},
	},
	jlsg_guicai: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_simayi"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		trigger: { global: "judge" },
		check(event, player) {
			const judge = event.judge(event.player.judging[0]);
			if (get.attitude(player, event.player) <= 0) {
				return judge >= 0;
			}
			if (get.attitude(player, event.player) >= 0) {
				return judge <= 0;
			}
			return 2;
		},
		async content(event, trigger, player) {
			let str = `${get.translation(trigger.player)}的${trigger.judgestr || ""}判定为
						${get.translation(trigger.player.judging[0])}，打出一张牌代替之或亮出牌顶的一张牌代替之`;
			const result = await player
				.chooseCard(str, "he")
				.set("filterCard", (card, player, event) => {
					const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") {
						return mod2;
					}
					const mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") {
						return mod;
					}
					return true;
				})
				.set("ai", function (card) {
					const trigger = get.event().getTrigger();
					const { player, judging } = get.event();
					const result = trigger.judge(card) - trigger.judge(judging);
					const attitude = get.attitude(player, trigger.player);
					let val = get.value(card);
					if (attitude == 0) {
						return 0;
					}
					if (attitude > 0) {
						return result - val / 5;
					} else {
						return -result - val / 5;
					}
				})
				.set("judging", trigger.player.judging[0])
				.forResult();
			if (result.bool && result.cards?.length) {
				event.cards = result.cards;
			} else {
				event.cards = get.cards(1);
				game.log(player, "亮出了牌堆顶的", event.cards);
				await game.cardsGotoOrdering(event.cards);
				player.showCards(event.cards);
			}
			await player.respond(event.cards, "highlight", "noOrdering");
			if (trigger.player.judging[0].clone) {
				trigger.player.judging[0].clone.classList.remove("thrownhighlight");
				game.broadcast(function (card) {
					if (card.clone) {
						card.clone.classList.remove("thrownhighlight");
					}
				}, trigger.player.judging[0]);
				game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
			}
			await game.cardsDiscard(trigger.player.judging[0]);
			trigger.player.judging[0] = event.cards[0];
			trigger.orderingCards.addArray(event.cards);
			game.log(trigger.player, "的判定牌改为", event.cards[0]);
			await game.delay(2);
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.[event.name];
			await player.draw(improve ? 2 : 1);
		},
		ai: {
			tag: {
				rejudge: 1,
			},
		},
	},
	jlsg_langgu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_simayi"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		trigger: { global: "damageBegin1" },
		filter(event, player) {
			const target = lib.skill.jlsg_langgu.logTarget(event, player);
			return target?.isIn() && target != player;
		},
		check(event, player) {
			return true;
		},
		logTarget(event, player) {
			if (event.player == player) {
				return event.source;
			} else if (event.source == player) {
				return event.player;
			}
			return null;
		},
		async content(event, trigger, player) {
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.[event.name];
			if (improve) {
				await player.draw();
			}
			await player
				.judge(event.name, card => {
					const event = get.event().getParent("jlsg_langgu"),
						suit = get.suit(card);
					const trigger = event.getTrigger(),
						player = event.player;
					const { source, player: target } = trigger;
					if (suit == "heart") {
						return -get.damageEffect(target, source, player, trigger.nature);
					} else if (suit == "diamond") {
						return get.effect(player, { name: "draw" }, player, player);
					} else if (suit == "spade") {
						return get.damageEffect(target, source, player, trigger.nature);
					} else if (suit == "club") {
						if (source.countDiscardableCards(player, "he")) {
							return get.effect(source, { name: "guohe_copy2" }, player, player);
						}
					}
					return 0;
				})
				.set("judge2", () => true)
				.set("source", trigger.source)
				.set("target", trigger.player)
				.set("callback", async function (event, _, player) {
					const { judgeResult: result } = event,
						trigger = event.getParent(2).getTrigger();
					const target = lib.skill.jlsg_langgu.logTarget(trigger, player);
					switch (result?.suit) {
						case "spade":
							trigger.num++;
							break;
						case "heart":
							trigger.num--;
							break;
						case "club":
							if (target.countDiscardableCards(player, "he")) {
								await player.discardPlayerCard(target, true, "he");
							}
							break;
						case "diamond":
							await player.draw(1);
							break;
					}
				});
		},
		ai: {
			expose: 0.2,
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (!get.tag(card, "damage") || player.hasSkillTag("jueqing", false, target)) {
						return;
					} else if (!target.hasFriend()) {
						return;
					}
					return [0.8, 0.5, 0.8, -0.5];
				},
				player(card, player, target) {
					if (!get.tag(card, "damage") || player.hasSkillTag("jueqing", false, target)) {
						return;
					} else if (!player.hasFriend()) {
						return;
					}
					return [0.8, 0.5, 0.8, -0.5];
				},
			},
		},
	},
	jlsg_zhuizun: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		limited: true,
		xiandingji: true,
		skillAnimation: true,
		animationStr: "追尊",
		animationColor: "water",
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_simayi"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		mark: true,
		intro: {
			content: "limited",
		},
		enable: "chooseToUse",
		filter(event, player) {
			if (event.type != "dying") {
				return false;
			} else if (player != event.dying) {
				return false;
			} else if (player.storage.jlsg_zhuizun) {
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.[event.name];
			await player.recoverTo(improve ? player.maxHp : 1);
			const result = await player.judge(event.name).forResult();
			if (!result || !result?.suit) {
				return;
			}
			const suit = result.suit,
				targets = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase),
				cards = [];
			player.line(targets);
			for (let target of targets) {
				let hs = target.getGainableCards(player, "h", card => get.suit(card) == suit);
				if (hs.length) {
					target.$giveAuto(hs, player, true);
					cards.addArray(hs);
				}
			}
			if (improve) {
				let discardPile = _status.discarded.filter(card => get.suit(card) == suit && get.position(card) == "d");
				if (discardPile.length) {
					player.$gain2(discardPile, false);
					game.log(player, "从弃牌堆中获得了", discardPile);
					cards.addArray(discardPile);
				}
			}
			if (cards.length) {
				await game
					.loseAsync({
						gain_list: [[player, cards]],
						cards,
						animate: false,
					})
					.setContent("gaincardMultiple");
			}
			player.insertPhase("jlsg_zhuizun");
		},
		ai: {
			order: 1,
			threaten(player, target) {
				if (!target.storage.jlsg_zhuizun) {
					return 0.6;
				}
			},
			save: true,
			skillTagFilter(player) {
				if (player.storage.jlsg_zhuizun) {
					return false;
				}
				if (player.hp > 0) {
					return false;
				}
			},
			result: {
				player: 10,
			},
		},
	},
	jlsg_tianshang: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		trigger: { player: "die" },
		forceDie: true,
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget("是否发动【天殇】？", function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					const player = get.player();
					let num = get.attitude(player, target);
					if (num > 0) {
						if (target.isDamaged() && target.hasSkills(jlsg.ai.skill.need_maxhp)) {
							return 5;
						}
						if (jlsg.isWeak(target)) {
							return 3;
						}
						if (target.isDamaged()) {
							return 2;
						}
						return 1;
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const {
					targets: [target],
				} = event,
				skills = ["jlsg_huiqu", "jlsg_yiji"].filter(s => player.hasSkill(s));
			await target.addSkills(skills);
			await target.gainMaxHp(1);
			await target.recover(1);
		},
		ai: {
			expose: 0.5,
		},
	},
	jlsg_yiji: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		inherit: "yiji",
	},
	jlsg_huiqu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.countDiscardableCards(player, "h");
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard("是否弃置一张手牌发动【慧觑】？")
				.set("ai", function (card) {
					if (get.event().check) {
						return 8 - get.value(card);
					}
					return 4 - get.value(card);
				})
				.set("check", player.canMoveCard(true))
				.set("chooseonly", true)
				.forResult();
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			const judge = await player
				.judge(card => {
					if (get.color(card) == "red") {
						if (get.player().canMoveCard(true)) {
							return 2;
						}
						return 0;
					}
					return 2;
				})
				.forResult();
			if (judge.bool) {
				if (judge.color == "red") {
					await player.moveCard();
				} else {
					const result = await player
						.chooseTarget("选择一名目标对其造成1点伤害，然后摸一张牌。", true)
						.set("ai", function (target) {
							const player = get.player();
							return get.damageEffect(target, player, player) + 1;
						})
						.forResult();
					if (result.bool && result.targets?.length) {
						const {
							targets: [target],
						} = result;
						player.line(target);
						await target.damage(1, player);
						await player.draw(1);
					}
				}
			}
		},
	},
	jlsg_jiwu: {
		audio: ["ext:极略/audio/skill:true", "ext:极略/audio/skill/jlsg_jiwu_damage.mp3"],
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_lvbu"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		mod: {
			attackRangeBase(player) {
				let num = lib.card?.fangtian?.distance?.attackFrom;
				if (typeof num != "number" || !player.hasEmptySlot(1)) {
					return;
				}
				return Math.max(player.getEquipRange(player.getCards("e")), 1 - num);
			},
			selectTarget(card, player, range) {
				if (!player.hasEmptySlot(1) || !lib.card.fangtian || player.hasSkillTag("unequip_equip1")) {
					return;
				}
				get.info("fangtian_skill").mod.selectTarget.apply(this, arguments);
			},
		},
		trigger: {
			player: ["useCard1", "loseAfter"],
			global: "loseAsyncAfter",
		},
		filter(event, player) {
			if (event.name == "useCard") {
				return event.card.name == "sha";
			}
			if (player.countCards("h")) {
				return false;
			}
			if (event.type != "use" && event.getParent().name != "useCard") {
				return false;
			}
			return event.getParent("useCard")?.player == player && event.getl(player)?.hs?.length > 0;
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			if (trigger.name == "useCard") {
				player.logSkill(event.name);
				const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
				const improve = upgradeStorage?.other?.[event.name];
				if (trigger.jlsg_jiwu || (improve && player.getHistory("useCard").indexOf(trigger) == 0)) {
					game.log(trigger.card, "不可响应");
					trigger.directHit.addArray(game.players);
					if (improve) {
						trigger.baseDamage++;
					}
				}
				if (player.hasEmptySlot(1) && lib.card.fangtian && !player.hasSkillTag("unequip_equip1")) {
					trigger.baseDamage++;
				}
			} else {
				let evt = trigger.getParent("useCard");
				if (evt.player == player) {
					evt.jlsg_jiwu = true;
				}
			}
		},
	},
	jlsg_sheji: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_lvbu"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		enable: "chooseToUse",
		filter(event, player) {
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.["jlsg_sheji"],
				hs = player.getCards("h"),
				equip1 = player.getCards("e", card => get.subtype(card) == "equip1");
			if (improve && hs.length) {
				for (let card of hs) {
					if (game.checkMod(card, player, "unchanged", "cardEnabled2", player) === false) {
						return false;
					}
				}
				if (event.filterCard(get.autoViewAs({ name: "sha", cards: hs, isCard: false }, hs), player, event)) {
					return true;
				}
			}
			if (!equip1.length) {
				return false;
			}
			return equip1.some(card => event.filterCard(get.autoViewAs({ name: "sha", cards: [card], isCard: false }, [card]), player, event));
		},
		viewAs: {
			name: "sha",
		},
		prompt(event) {
			const player = event.player;
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.["jlsg_sheji"];
			return `将一张装备区内的武器牌${improve ? "或所有手牌" : ""}当作【杀】使用`;
		},
		position: "he",
		selectCard() {
			const player = get.player();
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.["jlsg_sheji"];
			if (improve) {
				return [1, player.countCards("h")];
			}
			return [1, 1];
		},
		filterCard(card, player) {
			if (get.position(card) == "e") {
				return get.subtype(card) == "equip1";
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.["jlsg_sheji"];
			return improve && get.position(card) == "h";
		},
		check(card) {
			if (get.position(card) == "e") {
				return 114514;
			}
			return 10 - get.value(card);
		},
		allowChooseAll: true,
		filterOk() {
			if (ui.selected.cards.length == 1 && get.position(ui.selected.cards[0]) == "e") {
				return true;
			}
			const player = get.player();
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const improve = upgradeStorage?.other?.["jlsg_sheji"];
			return improve && ui.selected.cards.every(card => get.position(card) == "h") && ui.selected.cards.length == player.countCards("h");
		},
		group: "jlsg_sheji_buff",
		subSkill: {
			buff: {
				audio: "jlsg_sheji",
				trigger: { global: "damageSource" },
				filter(event, player) {
					if (!event.source?.isIn()) {
						return false;
					}
					return event.source.countEnabledSlot("equip1") > 0;
				},
				async cost(event, trigger, player) {
					const str = trigger.source.getEquips("equip1").length ? "获得其区域内的武器牌" : "将一张临时武器牌置入其装备区",
						equip1 = trigger.source.getGainableCards(player, "e", card => get.subtype(card) == "equip1");
					const result = await player
						.chooseBool(`###${get.prompt(event.skill, trigger.source)}###${str}`)
						.set("ai", (event, player) => {
							const equip1 = get.event().equip1,
								target = event.getTrigger().source;
							if (equip1.length) {
								return get.attitude(player, target) < 0;
							}
							return get.attitude(player, target) > 0;
						})
						.set("equip1", equip1)
						.forResult();
					event.result = {
						bool: result?.bool,
						targets: [trigger.source],
					};
				},
				async content(event, trigger, player) {
					const [target] = event.targets;
					if (target.getEquips("equip1").length) {
						const equip1 = target.getGainableCards(player, "e", card => get.subtype(card) == "equip1");
						if (equip1.length) {
							await player.gain(equip1, target, "giveAuto");
						}
					} else {
						const { createTempCard, typePBTY } = get.info("jlsg_lingze");
						const name = typePBTY["equip"].filter(i => get.subtype(i[2]) == "equip1").randomGet()?.[2];
						const card = createTempCard(name, null, null, null, true);
						if (card && target.canEquip(card)) {
							await target.equip(card, true);
						}
					}
				},
			},
		},
		ai: {
			order(item, player) {
				return get.order({ name: "sha" }, player || get.player()) + 1;
			},
		},
	},
	jlsg_xingyi: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		srlose: true,
		filter(event, player) {
			return game.hasPlayer(current => {
				return current != player && current.countGainableCards(player, "h");
			});
		},
		filterTarget: function (card, player, target) {
			return target.countGainableCards(player, "h") && player != target;
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			await player.gainPlayerCard(target, "h", true);
			await target.recover(1);
		},
		ai: {
			order: 2,
			threaten: 2,
			result: {
				player: function (card, player, target) {
					if (jlsg.needKongcheng(player, true)) {
						return -1;
					}
					return 1;
				},
				target: function (player, target) {
					if (jlsg.needKongcheng(target) && target.countCards("h") == 1) {
						return 5;
					}
					if (target.countCards("h") > target.hp && target.isDamaged()) {
						return 4;
					}
					if (jlsg.isWeak(target)) {
						return 2;
					}
					if (target.isDamaged()) {
						return 1;
					}
					if (!jlsg.hasLoseHandcardEffective(target) && target.isDamaged()) {
						return 1;
					}
					if (target.hp == jlsg.getBestHp(target)) {
						return -0.1;
					}
					if (!target.isDamaged() && jlsg.hasLoseHandcardEffective(target)) {
						return -1;
					}
					return 0;
				},
			},
		},
	},
	jlsg_guagu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { global: "dying" },
		filter: function (event, player) {
			return event.player.hp <= 0 && event.player.countDiscardableCards(player, "h");
		},
		logTarget: "player",
		check: function (event, player) {
			let att = get.attitude(player, event.player);
			let num = event.player.countDiscardableCards(player, "h");
			if (att > 0 && event.player.hasSkillTag("nosave")) {
				return false;
			}
			if (num < 3) {
				return att > 0;
			}
			if (num > 4) {
				return att < 0;
			}
			return [true, false].randomGet();
		},
		async content(event, trigger, player) {
			const result = await player.discardPlayerCard(trigger.player, true, "h", trigger.player.countCards("h")).forResult();
			await trigger.player.recover(1);
			if (result.links?.length > 1) {
				await trigger.player.draw(1);
			}
		},
		ai: {
			expose: 0.2,
			threaten: 1.5,
		},
	},
	jlsg_wuqin: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return player.countDiscardableCards(player, "h", card => get.type(card) == "basic");
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard(get.prompt("jlsg_wuqin"), card => get.type(card) == "basic")
				.set("ai", card => {
					const player = get.player();
					if (jlsg.needKongcheng(player) && player.countCards("h") == 1) {
						return 10 - get.value(card);
					}
					return 5 - get.useful(card);
				})
				.set("chooseonly", true)
				.forResult();
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			await player.draw(2);
			const phase = trigger.getParent("phase", true);
			if (phase) {
				phase.phaseList.splice(phase.num + 1, 0, `phaseUse|${event.name}`);
			} else {
				await player.phaseUse();
			}
		},
	},
	jlsg_lijian: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		inherit: "lijian",
	},
	jlsg_manwu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => {
				if (!current.hasSex("male") || current == player) {
					return false;
				}
				return current.countCards("h");
			});
		},
		filterTarget: function (card, player, target) {
			if (!target.hasSex("male") || target == player) {
				return false;
			}
			return target.countCards("h");
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			const result = await player
				.choosePlayerCard(target, "h", true, "曼舞")
				.set("prompt2", `请选择${get.translation(target)}要展示的一张手牌`)
				.set("ai", button => {
					const player = get.player(),
						target = get.event().target;
					if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
						const card = button.link;
						if (get.suit(card, target) == "diamond") {
							return get.effect(target, get.autoViewAs({ name: "lebu" }, [card]), target, player);
						}
						return get.value(card, player);
					}
					return get.event().getRand();
				})
				.forResult();
			if (!result?.bool || !result?.links?.length) {
				return;
			}
			const card = result.links[0];
			await player.showCards(card);
			if (get.suit(card, target) == "diamond") {
				if (target.canAddJudge({ name: "lebu", cards: [card] })) {
					await target.addJudge("lebu", [card]);
				}
			} else {
				if (lib.filter.canBeGained(card, player, target)) {
					await player.gain(card, target, "give").set("visible", true);
				}
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
				target: function (target, player) {
					return get.effect(target, get.autoViewAs({ name: "lebu" }, "unsure"), target, target);
				},
			},
		},
	},
	jlsg_baiyue: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return game.hasPlayer2(current => {
				if (current == player) {
					return false;
				}
				return current
					.getHistory("lose")
					.map(evt => evt.cards.filterInD("d"))
					.flat()
					.unique().length;
			});
		},
		async cost(event, trigger, player) {
			const cards = [];
			game.countPlayer2(current => {
				if (current == player) {
					return false;
				}
				let cardsx = current
					.getHistory("lose")
					.map(evt => evt.cards.filterInD("d"))
					.flat()
					.unique();
				cards.addArray(cardsx);
			});
			const result = await player
				.chooseCardButton("是否发动【拜月】？", cards)
				.set("ai", button => {
					return get.value(button.link);
				})
				.forResult();
			event.result = {
				bool: result?.bool,
				cards: result?.links || [],
			};
		},
		async content(event, trigger, player) {
			await player.gain(event.cards, "gain2");
		},
	},
	jlsg_yinmeng: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("h") && player.getStorage("jlsg_yinmeng_used", 0) < Math.max(1, player.getDamagedHp());
		},
		filterTarget: function (card, player, target) {
			return target.hasSex("male") && target.countCards("h") && player != target;
		},
		async content(event, trigger, player) {
			player.addTempSkill("jlsg_yinmeng_used", { player: "phaseUseAfter" });
			player.storage.jlsg_yinmeng_used++;
			player.markSkill("jlsg_yinmeng_used");
			const {
				targets: [target],
			} = event;
			const result1 = await player
				.choosePlayerCard(target, "h", true, "姻盟")
				.set("prompt2", `请选择${get.translation(target)}要展示的一张手牌`)
				.set("ai", button => {
					const player = get.player(),
						target = get.event().target;
					const card = button.link;
					if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
						const type = get.type2(card, target);
						if (get.attitude(player, target) > 0) {
							if (player.countCards("h", card => get.type2(card) == type)) {
								return 15;
							}
							return get.value(card);
						} else {
							if (!player.countCards("h", card => get.type2(card) == type)) {
								return get.value(card);
							}
						}
					}
					return get.event().getRand(card.cardid);
				})
				.forResult();
			if (!result1?.bool || !result1?.links?.length) {
				return;
			}
			const card1 = result1.links[0];
			await player.showCards(card1);
			const result2 = await player
				.chooseCard(get.translation(target) + "展示的牌是" + get.translation(card1) + ",请选择你展示的牌", true)
				.set("card1", card1)
				.set("ai", function (card) {
					const player = get.player(),
						target = get.event().parent.targets[0],
						card1 = get.event().card1;
					if (get.attitude(player, target) > 0) {
						return get.type2(card1, target) == get.type2(card, player);
					}
					return get.type2(card1, target) != get.type2(card, player);
				})
				.forResult();
			if (!result2?.bool || !result2?.cards?.length) {
				return;
			}
			const card2 = result2.cards[0];
			await player.showCards(card2);
			if (get.type2(card1, target) == get.type2(card2, player)) {
				await game.asyncDraw([player, target]);
			} else {
				if (lib.filter.canBeDiscarded(card1, player, target)) {
					await target.discard(card1).set("discarder", player);
				}
			}
		},
		subSkill: {
			used: {
				init(player, skill) {
					player.setStorage(skill, 0, true);
				},
				onremove: true,
				mark: true,
				intro: {
					content(storage, player) {
						return `本回合已发动${get.cnNumber(storage)}次`;
					},
				},
			},
		},
		ai: {
			order: 4,
			result: {
				player: 0.5,
				target: function (player, target) {
					let suits = player.getCards("h").map(card => get.type2(card));
					let num = new Set(suits).size;
					let m = num / 3;
					if (get.attitude(player, target) > 0 && Math.random() < m) {
						return 1;
					} else if (get.attitude(player, target) < 0 && Math.random() < m) {
						return -1;
					}
					return 0;
				},
			},
		},
	},
	jlsg_xianger: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { global: "phaseBegin" },
		filter: function (event, player) {
			if (!event.player.hasSex("male") || event.player == player) {
				return false;
			}
			if (event.player.hasStorage("jlsg_xianger2", player)) {
				return false;
			}
			return player.countGainableCards(event.player, "h", card => get.type(card) == "basic") > 1;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCard(
					2,
					"h",
					function (card) {
						return get.type(card) == "basic";
					},
					"交给" + get.translation(trigger.player) + "两张基本牌"
				)
				.set("ai", function (card) {
					if (!get.event().check) {
						return 0;
					}
					return 7 - get.value(card);
				})
				.set(
					"check",
					(function () {
						if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge("lebu")) {
							return 1;
						} else if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge("bingliang")) {
							return 1;
						} else if (get.attitude(player, trigger.player) < 0 && trigger.player.hp == 1) {
							return 1;
						}
						return 0;
					})()
				)
				.forResult();
		},
		async content(event, trigger, player) {
			await player.give(event.cards, trigger.player);
			trigger.player.skip("phaseUse");
			const result = await trigger.player
				.chooseBool("是否视为对" + get.translation(player) + "使用一张【杀】")
				.set("source", player)
				.set("ai", function (event, player) {
					const source = get.event().source,
						sha = get.autoViewAs({ name: "sha" }, []);
					if (get.effect(source, sha, player, player) < 0 && get.attitude(source, player) < 0) {
						return 1;
					}
					if (get.effect(source, sha, player, player) > 0 && get.attitude(source, player) > 0) {
						return 0;
					}
					return 0;
				})
				.forResult();
			if (result.bool) {
				const sha = get.autoViewAs({ name: "sha" }, []);
				await trigger.player.useCard(sha, player);
			} else {
				const source = player;
				trigger.player.when({ player: "phaseAfter" }).step(async (event, trigger, player) => {
					player.addTempSkill("jlsg_xianger2", "phaseAfter");
					player.storage.jlsg_xianger2.add(source).sortBySeat();
					player.markSkill("jlsg_xianger2");
				});
			}
			if (
				trigger.player.getHistory("sourceDamage", evt => {
					return evt.getParent(trigger.name) == trigger;
				})
			) {
				trigger.player.skip("phaseDiscard");
				await player.draw(1);
			}
		},
	},
	jlsg_xianger2: {
		sub: true,
		sourceSkill: "jlsg_xianger",
		audio: false,
		init(player, skill) {
			player.setStorage(skill, [], true);
		},
		onremove: true,
		mark: true,
		marktext: "饵",
		intro: {
			content: function (storage, player) {
				if (!storage?.length) {
					return "";
				}
				const players = storage.filter(current => current?.isIn());
				return `出牌阶段开始时，${get.translation(players)}各对你造成一点伤害。`;
			},
		},
		trigger: { player: "phaseUseBegin" },
		forced: true,
		charlotte: true,
		async content(event, trigger, player) {
			const players = player
				.getStorage(event.name)
				.filter(current => current?.isIn())
				.sortBySeat(_status.currentPhase);
			for (const current of players) {
				await player.damage(1, current);
			}
			player.removeSkill(event.name);
		},
	},
	jlsg_juelie: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => {
				return current.countCards("h") != player.countCards("h");
			});
		},
		filterTarget: function (card, player, target) {
			return target.countCards("h") != player.countCards("h");
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			const prompt = `选择将手牌数调整至${get.cnNumber(player.countCards("h"))}张，或令${get.translation(player)}视为对你使用一张杀`;
			const result = await target
				.chooseControl("调整手牌", "对你出杀")
				.set("prompt", prompt)
				.set("source", player)
				.set("ai", function () {
					const player = get.player(),
						source = get.event().source;
					if (player.countCards("h") > source.countCards("h") && player.hasShan()) {
						return "对你出杀";
					} else if (player.countCards("h") < source.countCards("h")) {
						return "调整手牌";
					} else if (get.effect(player, { name: "sha" }, source, player) > 0) {
						return "对你出杀";
					} else if (player.countCards("h") - source.countCards("h") >= 2) {
						return "对你出杀";
					}
					return "调整手牌";
				})
				.forResult();
			if (result.control == "调整手牌") {
				if (target.countCards("h") > player.countCards("h")) {
					await target.chooseToDiscard(target.countCards("h") - player.countCards("h"), true);
				} else {
					await target.drawTo(player.countCards("h"));
				}
			} else {
				await player.useCard(get.autoViewAs({ name: "sha" }, []), target, false);
			}
		},
		ai: {
			threaten: 2,
			order: 12,
			result: {
				target: function (player, target) {
					return player.countCards("h") - target.countCards("h");
				},
			},
		},
	},
	jlsg_xiwu: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		trigger: { player: "shaMiss" },
		shaRelated: true,
		check: function (event, player) {
			return get.effect(player, { name: "draw" }, player, player) + get.effect(event.target, { name: "guohe_copy2" }, player, player) > 0;
		},
		async content(event, trigger, player) {
			await player.draw(1);
			if (trigger.target.countDiscardableCards(player, "h")) {
				await player.discardPlayerCard(trigger.target, "h", true);
			}
		},
	},
	jlsg_fangxin: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		enable: "chooseToUse",
		filter(event, player) {
			const tao = get.autoViewAs({ name: "tao" }, []);
			if (!event.filterCard(tao, player, event)) {
				return false;
			}
			return (player.canAddJudge("bingliang") && player.countCards("h", card => get.suit(card) == "club")) || (player.canAddJudge("lebu") && player.countCards("h", card => get.suit(card) == "diamond"));
		},
		viewAs: "tao",
		position: "he",
		filterCard(card, player, target) {
			if (get.suit(card, player) == "club") {
				return player.canAddJudge("bingliang");
			} else if (get.suit(card, player) == "diamond") {
				return player.canAddJudge("lebu");
			}
			return false;
		},
		filterTarget(card, player, target) {
			if (_status.event.type == "dying") {
				return target == _status.event.dying;
			}
			return player == target;
		},
		selectTarget: -1,
		check(card) {
			return 8 - get.value(card);
		},
		discard: false,
		lose: false,
		log: false,
		async precontent(event, trigger, player) {
			const card = event.result.cards[0];
			event.result.cards = [];
			player.logSkill("jlsg_fangxin");
			let name;
			if (get.suit(card) == "diamond") {
				name = "lebu";
			} else {
				name = "bingliang";
			}
			await player.addJudge(name, [card]);
		},
		ai: {
			threaten: 1.5,
			save: true,
			order: 9,
			result: {
				player(player) {
					let lebu = get.autoViewAs({ name: "lebu" }, "unsure"),
						bingliang = get.autoViewAs({ name: "bingliang" }, "unsure");
					return Math.max(get.effect(player, lebu, player, player), get.effect(player, bingliang, player, player));
				},
				target(player, target) {
					return get.effect(target, get.autoViewAs({ name: "tao" }, []), player, player);
				},
			},
		},
	},
	jlsg_xiyu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget("细语：弃置一名角色的一张牌，然后该角色进行1个额外的出牌阶段", (card, player, target) => {
					return target.countDiscardableCards(player, "he");
				})
				.set("ai", target => {
					const player = get.player();
					return get.attitude(player, target) * target.countDiscardableCards(player, "he");
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			await player.discardPlayerCard("he", target, true);
			await target.phaseUse();
		},
	},
	jlsg_wanrou: {
		audio: "ext:极略/audio/skill:1",
		mod: {
			aiUseful(player, card, num) {
				if (get.suit(card) == "diamond") {
					if (get.type(card) == "delay") {
						return 1;
					}
					return 0;
				}
			},
		},
		srlose: true,
		trigger: {
			player: "loseAfter",
			global: ["loseAsyncAfter", "cardsDiscardAfter", "equipAfter", "addJudgeAfter", "addToExpansionAfter"],
		},
		getCheck(event, player) {
			if (event.name == "cardsDiscard") {
				//useCard,judge
				const evt = event.getParent();
				if (evt.name != "orderingDiscard" || evt.relatedEvent?.player != player) {
					return [];
				}
				const relatedEvent = evt.relatedEvent;
				let loses = player
					.getHistory("lose", evtx => relatedEvent == (evtx.relatedEvent || evtx.getParent()))
					.map(evtx => {
						const getl = evtx.getl(player);
						if (!getl) {
							return [];
						}
						let cards = getl.js || [];
						if (getl.cards2?.length) {
							cards.addArray(getl.cards2.filter(card => get.suit(card, player) == "diamond"));
						}
						return cards;
					})
					.flat();
				loses = event.getd(player).filter(card => loses.includes(card));
				return loses;
			}
			const cards = event.getd(player, "js").concat(event.getd(player, "cards2").filter(card => get.suit(card, player) == "diamond"));
			const getl = event.getl(player);
			const loses = (getl?.js || []).concat((getl?.cards2 || []).filter(card => get.suit(card, player) == "diamond"));
			return cards.filter(card => loses.includes(card));
		},
		getIndex(event, player) {
			const cards = lib.skill.jlsg_wanrou.getCheck(event, player);
			return cards;
		},
		filter: function (event, player, name, card) {
			return card;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`###${get.prompt("jlsg_wanrou")}###令一名角色摸一张牌`)
				.set("ai", target => {
					const player = get.player();
					return get.effect(target, { name: "draw" }, player, player);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			await event.targets[0].draw(1);
		},
		ai: {
			threaten: 0.7,
			effect: {
				player(card, player, target) {
					if (get.suit(card) == "diamod" && get.type(card) != "delay") {
						return [1, 1];
					}
				},
				target(card, player, target) {
					if (get.type(card) == "delay") {
						return [1, 1];
					}
				},
			},
		},
	},
	jlsg_zhouyan: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		usable: 1,
		enable: "phaseUse",
		filterTarget(card, player, target) {
			return true;
		},
		prompt: "舟焰：令一名角色摸一张牌，然后你视为对其使用一张【火攻】",
		async content(event, trigger, player) {
			const {
					targets: [target],
				} = event,
				huogong = get.autoViewAs({ name: "huogong" }, []);
			let next;
			while (true) {
				await target.draw(1);
				if (player.canUse(huogong, target)) {
					next = player.useCard(huogong, target);
					await next;
				}
				let check = player.hasHistory("sourceDamage", evt => {
					if (evt.card?.name != "huogong") {
						return false;
					}
					return evt.getParent("useCard") == next;
				});
				if (!check || !target.isIn()) {
					break;
				}
				const result = await player
					.chooseBool(`是否继续对${get.translation(target)}发动【舟焰】？`)
					.set("ai", (event, player) => {
						const {
							targets: [target],
						} = event;
						let att = Math.sign(get.attitude(player, target));
						return att * lib.skill.jlsg_zhouyan.ai.result.target(player, target) > 0;
					})
					.forResult();
				if (!result.bool) {
					break;
				} else {
					player.logSkill(event.name, [target]);
				}
			}
		},
		group: ["jlsg_zhouyan_damage"],
		subSkill: {
			damage: {
				audio: "jlsg_zhouyan",
				trigger: { source: "damageSource" },
				filter: function (event, player) {
					return event.card?.name == "huogong";
				},
				prompt(event, player) {
					return get.prompt("jlsg_zhouyan");
				},
				prompt2: "你可以摸一张牌",
				check(event, player) {
					return get.effect(player, { name: "draw" }, player, player) > 0;
				},
				async content(event, trigger, player) {
					await player.draw(1);
				},
			},
		},
		ai: {
			order: 4,
			fireattack: true,
			result: {
				player: 0,
				target: function (player, target) {
					if (player == target) {
						return 1;
					}
					if (!lib.card.huogong) {
						return 0;
					}
					let result = lib.card.huogong.ai.result.target;
					if ((player.countCards("h") > 2 || target.hp <= 2) && !target.hasSkill("huogong2") && get.damageEffect(target, player, player, "fire") > 0 && result(player, target) < 0) {
						return -2;
					}
					if (get.attitude(player, target) > 0) {
						return 0.9;
					}
					if (target.countCards("h") == 0) {
						return 1;
					}
					return 0.5;
				},
			},
		},
	},
	jlsg_zhaxiang: {
		audio: "ext:极略/audio/skill:true",
		srlose: true,
		enable: "phaseUse",
		filterCard(card, player, event) {
			return true;
		},
		filterTarget: function (card, target, player) {
			return player != target;
		},
		check: function (card) {
			const player = get.player();
			if (player.countCards("h", "sha") > player.getCardUsable("sha", true) || (player.countCards("h", "sha") && !player.getUseValue("sha"))) {
				if (card.name == "sha") {
					const sha = get.autoViewAs({ name: "sha", nature: "fire" }, []);
					for (let i = 0; i < game.players.length; i++) {
						if (player == game.players[i]) {
							continue;
						}
						const target = game.players[i];
						let effect = get.effect(target, sha, player, player);
						if (effect > 0) {
							return 7 - get.value(card);
						}
					}
				}
			} else {
				if (player.needsToDiscard() || player.countCards("h") > 4) {
					return 6 - get.value(card);
				}
			}
			return 0;
		},
		lose: true,
		discard: false,
		async content(event, trigger, player) {
			const {
				cards,
				targets: [target],
			} = event;
			await game.cardsGotoOrdering(cards);
			game.broadcastAll(function (player) {
				const cardx = ui.create.card();
				cardx.name = "诈降牌";
				cardx.classList.add("infohidden");
				cardx.classList.add("infoflip");
				player.showCards(cardx, "诈降");
			}, player);
			const result = await target
				.chooseToGive(player, "交给" + get.translation(player) + "一张牌，或展示并获得诈降牌。")
				.set("ai", card => {
					const player = get.player(),
						target = get.event().target;
					const att = get.attitude(player, target);
					if (["sha", "jiu", "tao"].includes(card.name)) {
						return -1;
					}
					let effect = att > 0 ? 0 : get.damageEffect(player, target, player, "fire");
					return -effect - get.value(card, player) + (att / 5) * get.value(card, player) - 2;
				})
				.forResult();
			if (!result?.bool || !result?.cards?.length) {
				await target.showCards(cards);
				await target.gain(cards, "gain2");
				if (cards[0].name == "sha") {
					const sha = get.autoViewAs({ name: "sha", nature: "fire" }, []);
					if (player.canUse(sha, target, false)) {
						await player.useCard(sha, target, false).set("directHit", [target]);
					}
				}
			} else {
				await target.discard(cards);
				target.$throw(cards, 1000);
			}
		},
		ai: {
			order: 6,
			fireattack: true,
			result: {
				player: 0.5,
				target: function (target, player) {
					if (!ui.selected.cards.length) {
						return 0;
					}
					if (ui.selected.cards[0].name == "sha") {
						let effect = get.effect(
							target,
							{
								name: "sha",
								nature: "fire",
							},
							player,
							player
						);
						if (target.mayHaveShan()) {
							effect *= 1.2;
						}
						if (effect > 0) {
							return (get.attitude(player, target) > 0 ? 1 : -1) * effect;
						}
						return 0;
					} else {
						return 1;
					}
				},
			},
		},
	},

	jlsg_shixue: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "shaBegin" },
		frequent: true,
		async content(event, trigger, player) {
			await player.draw(2);
			trigger.card.jlsg_shixue = true;
		},
		group: "jlsg_shixue_miss",
		subSkill: {
			miss: {
				sourceSkill: "jlsg_shixue",
				trigger: { player: "shaMiss" },
				filter(event) {
					return event.card.jlsg_shixue;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					await player.chooseToDiscard(2, true, "he");
				},
			},
		},
	},
	jlsg_guoshi: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		trigger: { global: "phaseJieshuBegin" },
		filter() {
			return lib.skill.jlsg_guoshi.getCards().length > 0;
		},
		async cost(event, trigger, player) {
			const cards = lib.skill.jlsg_guoshi.getCards();
			const result = await player
				.chooseCardButton(get.prompt("jlsg_guoshi", trigger.player), cards)
				.set("prompt2", "令其获得一张牌")
				.set("target", trigger.player)
				.set("ai", function (button) {
					const player = get.player(),
						target = get.event().target;
					if (get.attitude(player, target) > 0) {
						return get.value(button.link, target);
					}
					return -get.value(button.link, target);
				})
				.forResult();
			event.result = {
				bool: result?.bool,
				targets: [trigger.player],
				cards: result?.links || [],
			};
		},
		async content(event, trigger, player) {
			await trigger.player.gain(event.cards, "gain2");
			if (trigger.player.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
		},
		getCards() {
			let cards = game
				.getGlobalHistory("cardMove", evt => {
					if (evt.type == "discard") {
						return true;
					} else if (evt.name != "cardsDiscard") {
						return false;
					}
					let evtx = evt.getParent()?.relatedEvent;
					return evtx?.name == "judge";
				})
				.map(evt => evt.getd())
				.flat();
			return [...new Set(cards)].filterInD("d");
		},
		group: ["jlsg_guoshi_guanxing"],
		subSkill: {
			guanxing: {
				audio: "jlsg_guoshi",
				trigger: { global: "phaseZhunbeiBegin" },
				prompt: "是否发动【国士】观看牌顶的牌？",
				frequent: true,
				check() {
					return true;
				},
				async content(event, trigger, player) {
					await player.chooseToGuanxing(2).set("prompt", "国士：点击或拖动将牌移动到牌堆顶或牌堆底");
				},
			},
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_yingcai: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseDrawBegin1" },
		check(event) {
			return event.num < 3;
		},
		filter(event, player) {
			return !event.numFixed && event.num > 0;
		},
		async content(event, trigger, player) {
			trigger.changeToZero();
			const suits = [],
				cards = [];
			while (suits.length < 3) {
				const {
					cards: [card],
				} = await game.cardsGotoOrdering(get.cards(1));
				/*game.broadcastAll(function (card) {
							if (card.clone) {
								card.clone.classList.add('thrownhighlight');
								game.addVideo('highlightnode', player, get.cardInfo(card));
							}
							let node = trigger.player.$throwordered(card.copy(), true);
							node.classList.add('thrownhighlight');
							ui.arena.classList.add('thrownhighlight');
						}, card);
						await game.delayx();*/
				await player.showCards(card);
				let suit = get.suit(card, false);
				if (!suits.includes(suit)) {
					suits.add(suit);
				}
				if (suits.length <= 2) {
					cards.add(card);
				} else {
					await game.cardsDiscard(card);
					await game.delayx(2);
				}
			}
			if (cards.length) {
				await player.gain(cards, "gain2");
			}
			/*game.broadcastAll(function (card) {
						ui.arena.classList.remove('thrownhighlight');
						if (card?.clone) {
							card.clone.hide();
						}
						ui.clear();
					}, card);*/
		},
	},
	jlsg_weibao: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		filterTarget(card, player, target) {
			return player != target;
		},
		filterCard: true,
		check(card) {
			return 8 - get.value(card);
		},
		discard: false,
		delay: false,
		loseTo: "cardPile",
		insert: true,
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards,
			} = event;
			game.addCardKnower(cards, player);
			player.$throw(1, 1000);
			game.log(player, "将一张牌置于了牌堆顶");
			await game.delayx();
			const result = await target
				.chooseControl("heart2", "diamond2", "club2", "spade2")
				.set("ai", function (event) {
					switch (Math.floor(event.getRand() * 6)) {
						case 0:
							return "heart2";
						case 1:
						case 4:
						case 5:
							return "diamond2";
						case 2:
							return "club2";
						case 3:
							return "spade2";
					}
				})
				.forResult();
			game.log(target, "选择了" + get.translation(result.control));
			const choice = result.control;
			target.popup(choice);
			const draw = await target.draw(1).forResult();
			if (!draw?.length) {
				return;
			}
			await target.showCards(draw);
			if (get.suit(draw[0]) + "2" != choice) {
				await target.damage(1, player);
			}
		},
		ai: {
			order: 1,
			result: {
				player: 0,
				target: function (player, target) {
					let eff = get.damageEffect(target, player);
					if (eff >= 0) {
						return 1 + eff;
					}
					let value = 0,
						i;
					let cards = player.get("h");
					for (i = 0; i < cards.length; i++) {
						value += get.value(cards[i]);
					}
					value /= player.countCards("h");
					if (target.hp == 1) {
						return Math.min(0, value - 7);
					}
					return Math.min(0, value - 5);
				},
			},
		},
	},
	jlsg_choulve: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("h") > 1 && game.countPlayer(p => p != player) >= 2;
		},
		filterCard: true,
		selectCard: 2,
		check(card) {
			if (ui.selected.cards.length == 0) {
				return get.value(card);
			}
			if (card.number < ui.selected.cards[0].number) {
				return 6 - get.value(card);
			}
			return 0;
		},
		filterTarget(card, player, target) {
			return player != target;
		},
		selectTarget: 2,
		targetprompt: ["先拿牌", "后拿牌"],
		discard: false,
		lose: false,
		prepare(cards, player, targets) {
			player.$give(1, targets[0]);
			player.$give(1, targets[1]);
		},
		multitarget: true,
		async content(event, trigger, player) {
			const {
				targets: [target1, target2],
				cards: [card1, card2],
			} = event;
			await target1.gain(card1);
			await target2.gain(card2);
			await target1.showCards(card1);
			await target2.showCards(card2);
			const number1 = get.number(card1, false),
				number2 = get.number(card2, false);
			if (number1 == number2) {
				return;
			}
			let user, target;
			if (number1 > number2) {
				user = target1;
				target = target2;
			} else {
				user = target2;
				target = target1;
			}
			const next = user.useCard(get.autoViewAs({ name: "sha" }, []), target, false, "noai");
			player
				.when({ global: "useCardAfter" })
				.filter(evt => evt == next)
				.step(async function (event, trigger, player) {
					if (
						game.hasPlayer2(current => {
							return current.hasHistory("sourceDamage", evt => {
								if (evt.card?.name != "sha") {
									return false;
								}
								return evt.getParent("useCard") == trigger;
							});
						})
					) {
						await player.draw(1);
					}
				});
			await next;
		},
		ai: {
			order: 4,
			result: {
				player(player) {
					if (player.countCards("h") > player.hp) {
						return 0.5;
					}
					return -5;
				},
				target(player, target) {
					let card1 = ui.selected.cards[0],
						card2 = ui.selected.cards[1];
					if (card1 && card2 && card1.number == card2.number) {
						return 2;
					}
					if (ui.selected.targets.length == 0) {
						return 1;
					} else {
						let eff = get.effect(target, { name: "sha" }, ui.selected.targets[0], target);
						return eff;
					}
				},
			},
		},
	},
	jlsg_jiexi: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		usable: 1,
		enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer(current => player.canCompare(current));
		},
		filterTarget: function (card, target, player) {
			return player.canCompare(target);
		},
		prompt: "你可以与一名其他角色拼点，若你赢，视为对其使用一张【过河拆桥】。你可重复此流程直到你以此法拼点没赢",
		async content(event, trigger, player) {
			const {
					targets: [target],
				} = event,
				guohe = get.autoViewAs({ name: "guohe" }, []);
			while (player.canCompare(target)) {
				const compare = await player.chooseToCompare(target).forResult();
				if (compare?.bool) {
					if (player.canUse(guohe, target)) {
						await player.useCard(guohe, target);
					}
					const result = await player
						.chooseBool(`是否再次${get.translation(target)}对发动〖劫袭〗?`)
						.set("ai", (event, player) => {
							const {
								targets: [target],
							} = event;
							let att = Math.sign(get.attitude(player, target));
							return att * lib.skill.jlsg_jiexi.ai.result.target(player, target) > 0;
						})
						.forResult();
					if (!result?.bool) {
						break;
					}
				} else {
					break;
				}
			}
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					const nh = target.countCards("h");
					if (att > 0) {
						const js = target.getCards("j");
						if (js.length) {
							const jj = js[0].viewAs ? { name: js[0].viewAs } : js[0];
							if (jj.name == "guohe" || js.length > 1 || get.effect(target, jj, target, player) < 0) {
								return 3;
							}
						}
						if (target.getEquip("baiyin") && target.isDamaged() && get.recoverEffect(target, player, player) > 0) {
							if (target.hp == 1 && !target.hujia) {
								return 1.6;
							}
							if (target.hp == 2) {
								return 0.01;
							}
							return 0;
						}
					}
					const es = target.getCards("e");
					const noe = es.length == 0 || target.hasSkillTag("noe");
					const noe2 = es.length == 1 && es[0].name == "baiyin" && target.isDamaged();
					const noh = nh == 0 || target.hasSkillTag("noh");
					if (noh && (noe || noe2)) {
						return 0;
					}
					if (att <= 0 && !target.countCards("he")) {
						return 1.5;
					}
					return -1.5;
				},
			},
		},
	},
	jlsg_youxia: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		enable: "phaseUse",
		filter(event, player) {
			return !player.isTurnedOver();
		},
		filterTarget: function (card, target, player) {
			return player != target && target.countGainableCards(player, "he") > 0;
		},
		selectTarget: [1, 2],
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			await player.turnOver();
			for (let target of event.targets.sortBySeat()) {
				await player.gainPlayerCard(target, "he");
			}
		},
		mod: {
			targetEnabled: function (card, player, target, now) {
				if (target.isTurnedOver()) {
					if (card.name == "sha" || card.name == "juedou") {
						return false;
					}
				}
			},
		},
		ai: {
			order: 9,
			result: {
				player: -2,
				target: function (player, target) {
					if (get.attitude(player, target) <= 0) {
						return target.countCards("he") > 0 ? -1.5 : 1.5;
					}
					return 0;
				},
			},
		},
	},
	jlsg_huailing: {
		trigger: {
			global: "useCardToPlayered",
		},
		srlose: true,
		audio: "ext:极略/audio/skill:1",
		filter: function (event, player) {
			if (event.player == player) {
				return false;
			}
			if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			if (get.type(event.card) != "trick") {
				return false;
			}
			if (get.info(event.card).multitarget) {
				return false;
			}
			if (event.targets.length < 2) {
				return false;
			}
			if (!player.isTurnedOver()) {
				return false;
			}
			return true;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("jlsg_huailing"), `翻面并令${get.translation(trigger.card)}对一名角色无效`, function (card, player, target) {
					const evt = _status.event.getTrigger().getParent();
					return evt.targets.includes(target) && !evt.excluded.includes(target) && player != target;
				})
				.set("ai", target => {
					const player = get.player(),
						card = get.event().getTrigger().card;
					return get.effect(target, card, player, player) < 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			await player.turnOver();
			trigger.getParent().excluded.addArray(event.targets);
			await game.delayx();
		},
		mod: {
			targetEnabled: function (card, player, target, now) {
				if (target.isTurnedOver()) {
					if (card.name == "juedou" || card.name == "guohe") {
						return false;
					}
				}
			},
		},
		ai: {
			threaten: 1.5,
		},
	},
	jlsg_dailao: {
		audio: "ext:极略/audio/skill:2",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => current != player);
		},
		filterTarget(cards, target, player) {
			return player != target;
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			await player.turnOver();
			await target.turnOver();
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.1);
			}
			const result = await player
				.chooseToDiscard("he")
				.set("prompt2", `或点「取消」，令你与${get.translation(target)}各摸一张牌`)
				.set("ai", card => {
					const player = get.player(),
						target = get.event().target;
					let unusefulness = get.unuseful(card);
					const att = get.attitude(player, target);
					if (-2 < att && att < 2) {
						return -1;
					}
					if (!player.hasSkill("jlsg_ruya")) {
						if (att > 0) {
							return unusefulness;
						}
						return unusefulness + get.effect(target, { name: "guohe_copy2" }, player, player) / 2;
					}
					if (att < 0 || target.countDiscardableCards(player, "h") != target.countCards("h")) {
						return -1;
					}
					if (target.isTurnedOver() && target.countCards("h") == 1) {
						unusefulness += 8;
					}
					return unusefulness;
				})
				.set("target", target)
				.forResult();
			if (result.bool) {
				target.addExpose(0.1);
				await target.chooseToDiscard("he", true);
			} else {
				await game.asyncDraw([player, target]);
			}
		},
		ai: {
			order: 9,
			result: {
				player(player) {
					return player.isTurnedOver() ? 5 : -3.5;
				},
				target(player, target) {
					if (target.hasSkillTag("noturn")) {
						return 0;
					}
					return target.isTurnedOver() ? 5 : -3.5;
				},
			},
		},
	},
	jlsg_youdi: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: ["chooseToUse", "chooseToRespond"],
		filterCard(card, player, event) {
			return false;
		},
		selectCard: -1,
		viewAs: { name: "shan" },
		viewAsFilter(player) {
			return player.isTurnedOver();
		},
		prompt: "你可以将武将牌翻至正面朝上，视为使用或打出一张【闪】",
		check() {
			return true;
		},
		log: false,
		async precontent(event, trigger, player) {
			player.logSkill("jlsg_youdi");
			await player.turnOver();
		},
		ai: {
			respondShan: true,
			skillTagFilter(player) {
				return player.isTurnedOver();
			},
		},
		group: "jlsg_youdi_shaMiss",
		subSkill: {
			shaMiss: {
				audio: "jlsg_youdi",
				trigger: { player: "useCard" },
				filter(event, player) {
					if (event.card.name != "shan") {
						return false;
					}
					if (!Array.isArray(event.respondTo) || event.respondTo[0] == player) {
						return false;
					}
					return get.name(event.respondTo[1], player) == "sha";
				},
				async cost(event, trigger, player) {
					event.result = await player
						.chooseToDiscard(get.prompt("jlsg_youdi", trigger.respondTo[0]), [1, Infinity])
						.set("chooseonly", true)
						.set("ai", card => (get.event().check ? 4 - get.value(card) : 0))
						.set(
							"check",
							(function () {
								return get.attitude(player, trigger.respondTo[0]) <= 0;
							})()
						)
						.forResult();
					if (event.result?.bool) {
						event.result.targets = [trigger.respondTo[0]];
					}
				},
				async content(event, trigger, player) {
					await player.discard(event.cards);
					await trigger.respondTo[0].chooseToDiscard(event.cards.length, "he", true);
				},
			},
		},
	},
	jlsg_ruya: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter(event, player) {
			if (player.countCards("h")) {
				return false;
			}
			const evt = event.getl(player);
			return evt?.player == player && evt?.hs?.length > 0;
		},
		frequent: true,
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) * player.maxHp - 2 > 0;
		},
		async content(event, trigger, player) {
			await player.turnOver();
			await player.drawTo(player.maxHp);
		},
		ai: {
			threaten: 0.8,
			noh: true,
			skillTagFilter(player, tag) {
				if (tag == "noh") {
					if (player.countCards("h") != 1) {
						return false;
					}
				}
			},
			effect: {
				player_use(card, player, target) {
					if (player.countCards("h") === 1) {
						return [1, 0.8];
					}
				},
				target(card, player, target) {
					if (get.tag(card, "loseCard") && target.countCards("h") === 1) {
						return 0.5;
					}
				},
			},
		},
	},
	jlsg_quanheng: {
		srlose: true,
		audio: "ext:极略/audio/skill:1",
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_sunquan"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		enable: "phaseUse",
		hiddenCard(player, name) {
			const hs = player.getCards("h", card => {
					const mod2 = game.checkMod(card, player, event, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") {
						return mod2;
					}
					return true;
				}),
				used = player.getHistory("useSkill", evt => evt.skill == "jlsg_quanheng_backup").length;
			if (hs.length) {
				hs.sort((a, b) => get.value(a, player) - get.value(b, player));
			}
			if (hs.length < used || !["sha", "wuzhong"].includes(name)) {
				return false;
			}
		},
		onChooseToUse(event) {
			if (game.online) {
				return;
			}
			const player = event.player;
			const hs = player.getCards("h", card => {
					const mod2 = game.checkMod(card, player, event, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") {
						return mod2;
					}
					return true;
				}),
				used = player.getHistory("useSkill", evt => evt.skill == "jlsg_quanheng_backup").length;
			if (hs.length) {
				hs.sort((a, b) => get.value(a, player) - get.value(b, player));
			}
			if (hs.length < used || ["sha", "wuzhong"].every(name => !lib.inpile.includes(name))) {
				return;
			}
			const list = get.inpileVCardList(info => {
				if (!["sha", "wuzhong"].includes(info[2])) {
					return false;
				}
				const card = get.autoViewAs({ name: info[2], nature: info[3], isCard: false }, "unsure");
				return event.filterCard(card, player, event);
			});
			event.set("jlsg_quanheng", { vcard: list, hs, used });
		},
		filter: event => event.jlsg_quanheng?.vcard?.length,
		chooseButton: {
			dialog(event) {
				let list = event.jlsg_quanheng.vcard;
				return ui.create.dialog("权衡", [list, "vcard"]);
			},
			filter({ link }, player) {
				const event = get.event().parent,
					card = get.autoViewAs({ name: link[2], nature: link[3], isCard: false }, "unsure");
				return event.filterCard(card, player, event);
			},
			check({ link }) {
				//待修改
				const {
					player,
					parent: {
						jlsg_quanheng: { hs, used },
					},
				} = get.event();
				const card = get.autoViewAs({ name: link[2], nature: link[3], isCard: false }, "unsure");
				if (used == 0) {
					return player.getUseValue(card);
				} else {
					const cardsValue = get.value(hs.slice(0, used));
					if (cardsValue <= get.value(card)) {
						return player.getUseValue(card);
					}
				}
				return 0;
			},
			backup(links, player) {
				let num = player.getHistory("useSkill", evt => evt.skill == "jlsg_quanheng_backup").length;
				return {
					audio: "jlsg_quanheng",
					viewAs: { name: links[0][2], nature: links[0][3], isCard: false },
					position: "hs",
					selectCard: num == 0 ? -1 : [num, num],
					filterCard: num == 0 ? () => false : true,
					ai1: card => 7 - get.value(card),
					popname: true,
				};
			},
			prompt(links, player) {
				const num = player.getHistory("useSkill", evt => evt.skill == "jlsg_quanheng_backup").length;
				const card = `${get.translation(links[0][3]) || ""}${get.translation(links[0][2])}`;
				if (num == 0) {
					return `视为使用一张${card}`;
				}
				return `将${get.cnNumber(num)}张手牌当作${card}使用`;
			},
		},
		group: "jlsg_quanheng_effect",
		subSkill: {
			effect: {
				sub: true,
				sourceSkill: "jlsg_quanheng",
				charlotte: true,
				onremove: true,
				marktext: "权",
				intro: {
					name: "权衡",
					content(storage, player) {
						let obj = {
								wuzhong: "摸牌数",
								sha: "伤害",
							},
							str = [];
						for (let item of ["sha", "wuzhong"]) {
							if (storage[item] > 0) {
								str.push(`你本回合使用的下一张【${get.translation(item)}】的${obj[item]}+${String(storage[item])}`);
							}
						}
						if (!str.length) {
							return;
						}
						return str.join("<br>");
					},
				},
				trigger: {
					player: ["useCardAfter", "useCard", "drawBegin"],
					global: "phaseAfter",
				},
				filter(event, player, name) {
					const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
					const upgrade = upgradeStorage?.["jlsgsr_sunquan"]?.[2] || upgradeStorage?.other?.["jlsg_quanheng"];
					if (!upgrade) {
						return false;
					}
					const storage = player.getStorage("jlsg_quanheng_effect", { sha: 0, wuzhong: 0 });
					if (name == "phaseAfter") {
						return Object.values(storage).some(i => i > 0);
					} else if (name == "drawBegin") {
						const evt = event.getParent();
						if (evt?.card?.name != "wuzhong" || evt.player != player) {
							return false;
						}
						return storage.wuzhong > 0;
					} else if (name == "useCard") {
						return event.card.name == "sha" && storage.sha > 0;
					}
					return ["sha", "wuzhong"].includes(event.card.name);
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const map1 = {
							useCard: "sha",
							drawBegin: "wuzhong",
						},
						map2 = {
							sha: "baseDamage",
							wuzhong: "num",
						},
						cardname = map1[event.triggername];
					let storage = player.getStorage(event.name, { sha: 0, wuzhong: 0 });
					if (cardname) {
						trigger[map2[cardname]] += storage[cardname];
						storage[cardname] = 0;
					} else if (trigger.name == "useCard") {
						let another = ["sha", "wuzhong"].remove(trigger.card.name)[0];
						storage[another]++;
					} else {
						storage = { sha: 0, wuzhong: 0 };
					}
					player.setStorage(event.name, storage, true);
					if (Object.values(storage).every(i => i == 0)) {
						player.unmarkSkill(event.name);
					}
				},
			},
		},
		ai: {
			order(item, player) {
				let order = Math.max(...["sha", "wuzhong"].map(i => get.order({ name: i }, player)));
				return order - 1;
			},
			result: {
				player: 1,
			},
		},
	},
	jlsg_xionglve: {
		srlose: true,
		audio: "ext:极略/audio/skill:1",
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_sunquan"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (_status.current != player) {
					return;
				}
				const check = get.info("jlsg_xionglve_effect").filter(null, player);
				if (check) {
					return 0;
				}
			},
		},
		marktext: "略",
		intro: {
			markcount: "expansion",
			mark(dialog, content, player) {
				const cards = player.getExpansions("jlsg_xionglve"),
					getNumber = get.info("jlsg_xionglve").getNumber;
				const gain = getNumber(player, "gain"),
					sourceDamage = getNumber(player, "sourceDamage");
				if (gain > 0 || sourceDamage > 0) {
					dialog.addText("本回合记录", true);
					if (gain > 0) {
						dialog.addText(`获得牌数：${gain}`);
					}
					if (sourceDamage > 0) {
						dialog.addText(`造成伤害：${sourceDamage}`);
					}
				}
				if (cards?.length) {
					dialog.addAuto(cards);
				} else {
					dialog.addText("没有卡牌");
				}
			},
		},
		usable: 1,
		trigger: {
			player: "gainAfter",
			global: "loseAsyncAfter",
		},
		filter(event, player) {
			const cards = event.getg?.(player) || [];
			if (player.countCards("h", card => cards.includes(card))) {
				return true;
			}
			return false;
		},
		getNumber(player, name) {
			return player.getHistory(name).reduce((sum, evt) => {
				if (name == "gain") {
					return sum + evt.getg?.(player)?.length;
				}
				return sum + evt.num;
			}, 0);
		},
		async cost(event, trigger, player) {
			const skill = event.name.slice(0, -5),
				cards = player.getCards("h", card => trigger.getg(player).includes(card));
			let str = get.skillInfoTranslation(skill, player);
			str = str.slice(0, str.indexOf("每轮限一次"));
			event.result = await player
				.chooseCard(`###${get.prompt(event.name.slice(0, -5))}###${str}`, [1, Infinity])
				.set("complexCard", true)
				.set("filterCard", card => get.event().cards?.includes(card))
				.set("ai", card => {
					const { player, cards, check } = get.event(),
						selectedLength = ui.selected.cards.length;
					if (!check || selectedLength >= player.hp || selectedLength >= cards.length / 2) {
						return 0;
					}
					if (!["basic", "trick"].includes(get.type(card, null, player))) {
						return 0;
					}
					return player.getUseValue(card, true, false);
				})
				.set(
					"check",
					(function () {
						const getNumber = get.info(skill).getNumber,
							num = player.countExpansions("jlsg_xionglve");
						return [(getNumber(player, "gain") + trigger.getg(player).length) / 2, getNumber(player, "sourceDamage")].some(i => num >= i);
					})()
				)
				.set("cards", cards)
				.forResult();
		},
		async content(event, trigger, player) {
			const next = player.addToExpansion(event.cards, "gain2", "log");
			next.gaintag.add("jlsg_xionglve");
			await next;
			player.markSkill(event.name);
			const improve = _status._jlsgsr_upgrade?.[player.playerid]?.other?.[event.name];
			if (!improve) {
				return;
			}
			let useCards = event.cards
				.filter(card => {
					let name = card.name;
					if (!["basic", "trick"].includes(get.type(name))) {
						return false;
					}
					return player.hasUseTarget(card, true, false);
				})
				.reverse();
			console.log(useCards);
			if (!useCards.length) {
				return;
			}
			while (useCards.length) {
				const result = await player
					.chooseCardButton("雄略：请选择要使用的牌", useCards)
					.set("ai", ({ link: card }) => {
						return get.player().getUseValue(card, true, false) * get.order(card, get.player());
					})
					.forResult();
				if (result.bool) {
					const card = result.links[0];
					useCards.remove(card);
					await player.chooseUseTarget(true, false, `雄略：视为使用${get.translation(card)}`).set("card", {
						suit: card.suit,
						name: card.name,
						number: card.number,
						nature: card.nature,
						isCard: true,
					});
				} else {
					break;
				}
			}
		},
		group: ["jlsg_xionglve_effect"],
		subSkill: {
			used: {},
			effect: {
				sub: true,
				sourceSkill: "jlsg_xionglve",
				trigger: { player: "phaseEnd" },
				filter(event, player) {
					if (player.hasSkill("jlsg_xionglve_used")) {
						return false;
					}
					const num = player.countExpansions("jlsg_xionglve"),
						getNumber = get.info("jlsg_xionglve").getNumber;
					if (num == 0) {
						return false;
					}
					const list = [getNumber(player, "gain") / 2, getNumber(player, "sourceDamage")];
					return list.some(i => num == i);
				},
				prompt2: "获得所有“略”并于执行一个额外回合",
				check(event, player) {
					return true;
				},
				async content(event, trigger, player) {
					player.addTempSkill("jlsg_xionglve_used", "roundEnd");
					await player.gain(player.getExpansions("jlsg_xionglve"), "gain2", "fromStorage");
					player.markSkill("jlsg_xionglve");
					player.insertPhase();
				},
			},
		},
		ai: {
			effect: {
				player(card, player, target) {
					if (_status.current != player) {
						return;
					}
					const check = get.info("jlsg_xionglve_effect").filter(null, player);
					if (check) {
						return [-2, -10];
					}
				},
			},
		},
	},
	jlsg_fuzheng: {
		audio: "ext:极略/audio/skill:1",
		zhuSkill: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			if (!player.hasZhuSkill("jlsg_fuzheng")) {
				return false;
			}
			return game.hasPlayer(current => {
				return current != player && current.group == "wu";
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("jlsg_fuzheng"), [1, 2], function (card, player, target) {
					return player != target && target.group == "wu";
				})
				.set("ai", target => {
					const player = get.player();
					const att = get.attitude(player, target);
					if (target.countCards("h")) {
						return att;
					}
					return att / 10;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			event.targets.sortBySeat(_status.currentPhase);
			for (const target of event.targets) {
				await target.draw(1);
				if (!target.countCards("h")) {
					continue;
				}
				const result = await target.chooseCard("h", true, "选择一张手牌置于牌堆顶").forResult();
				if (result.bool && result.cards?.length) {
					game.log(target, "将一张手牌置于牌堆顶");
					target.$throw(1, 1000);
					await target.lose(result.cards, ui.cardPile, "insert");
				}
			}
		},
	},
	jlsg_jiuzhu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter"] },
		getIndex(event, player) {
			if (event.name == "cardsDiscard") {
				let evt = event.getParent();
				if (evt.name == "orderingDiscard" && evt.relatedEvent) {
					evt = evt.relatedEvent;
					if (!["useCard", "respond"].includes(evt.name) || get.is.convertedCard(evt.card)) {
						return [];
					}
				}
			}
			return event.getd().filterInD("d");
		},
		filter: function (event, player, name, card) {
			if (!player.countCards("he", card => card.name != "shan")) {
				return false;
			}
			return get.position(card) == "d" && card?.name == "shan";
		},
		async cost(event, trigger, player) {
			const card = event.indexedData;
			event.result = await player
				.chooseToDiscard(`是否发动【救主】替换弃牌堆中的${get.translation(card)}?`, "he", card => card.name != "shan")
				.set("ai", card => {
					if (player.countCards("h", "shan") >= 2) {
						return false;
					}
					return 6 - ai.get.value(card);
				})
				.set("chooseonly", true)
				.forResult();
		},
		async content(event, trigger, player) {
			const {
				indexedData: card1,
				cards: [card2],
			} = event;
			await player.discard(card2);
			await player.gain(card1, "gain2");
			if (_status.currentPhase && _status.currentPhase != player) {
				const sha = get.autoViewAs({ name: "sha", storage: { jlsg_jiuzhu: true } }, []);
				const result = await player
					.chooseBool(`是否对${get.translation(_status.currentPhase)}使用一张无视防具的杀？`)
					.set("card", sha)
					.set("ai", (event, player) => {
						const card = get.event().card;
						return get.effect(_status.currentPhase, card, player, player) > 0;
					})
					.forResult();
				if (result.bool) {
					await player.useCard(sha, _status.currentPhase, false);
				}
			}
		},
		ai: {
			unequip: true,
			unequip_ai: true,
			skillTagFilter(player, tag, arg) {
				return arg?.card?.storage?.jlsg_jiuzhu == true && arg?.card?.name == "sha";
			},
		},
	},
	jlsg_tuwei: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { global: "cardsDiscardAfter" },
		filter(event, player) {
			let evt = event.getParent();
			if (evt.name != "orderingDiscard" || !evt.relatedEvent) {
				return false;
			}
			evt = evt.relatedEvent;
			if (evt.name != "useCard") {
				return false;
			}
			if (evt.player != player && !evt.targets.includes(player)) {
				return false;
			}
			const criterion0 = evt.card.name == "sha" && !get.is.convertedCard(evt.card),
				criterion1 = player.countDiscardableCards(player, "he", card => get.tag(card, "damage")) > 0;
			return criterion0 && criterion1;
		},
		async cost(event, trigger, player) {
			const evt = trigger.getParent().relatedEvent;
			const targets = evt.targets.slice().concat([evt.player]).unique();
			event.result = await player
				.chooseCardTarget({
					filterCard(card) {
						return get.tag(card, "damage");
					},
					filterTarget(card, player, target) {
						return get.event().targets.includes(target) && target.countDiscardableCards(player, "he");
					},
					selectTarget: [1, 2],
					ai1(card) {
						return 6 - get.value(card);
					},
					ai2(target) {
						const player = get.player();
						return get.effect(target, { name: "guohe_copy2" }, player, player);
					},
					prompt: get.prompt2("jlsg_tuwei"),
				})
				.set("targets", targets)
				.forResult();
		},
		async content(event, trigger, player) {
			const { targets, cards } = event;
			await player.discard(cards);
			if (targets.length == 1) {
				await player.discardPlayerCard(targets[0], true, [1, 2], "he");
			} else {
				for (const target of targets) {
					await player.discardPlayerCard(target, true, "he");
				}
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	// jlsg_xujin: {
	//     audio: "ext:极略/audio/skill:1",
	//     srlose: true,
	//     trigger: { player: 'phaseDrawBefore' },
	//     content: function () {
	//       "step 0"
	//       trigger.cancel();
	//       "step 1"
	//       event.cards = get.cards(5);
	//       if (event.isMine() == false) {
	//         event.dialog = ui.create.dialog('蓄劲', event.cards);
	//         game.delay(2);
	//       }
	//       if (event.cards.length > 0) {
	//         var obj = {};
	//         for (var i = 0; i < event.cards.length; i++) {
	//           var suit = get.suit(event.cards[i]);
	//           if (!obj[suit]) {
	//             obj[suit] = 0;
	//           }
	//           obj[suit] = obj[suit] + 1;
	//           if (event.cards[i].name == 'sha') obj[suit] = obj[suit] + 1;
	//         }
	//         var max = get.suit(event.cards.randomGet());
	//         ;
	//         for (var a in obj) {
	//           if (obj[a] > obj[max]) max = a;
	//         }
	//         event.suit = max;
	//       }
	//       "step 2"
	//       if (event.dialog) event.dialog.close();
	//       var dialog = ui.create.dialog('蓄劲', event.cards);
	//       player.chooseButton([1, 5], dialog, true).set("filterButton", function (button) {
	//         if (ui.selected.buttons.length == 0) return true;
	//         for (var i = 0; i < ui.selected.buttons.length; i++) {
	//           if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) return true;
	//         }
	//         return false;
	//       }).set("ai", function (button) {
	//         return get.suit(button.link) == event.suit;
	//       });
	//       "step 3"
	//       player.storage.jlsg_xujin2 = result.buttons.length;
	//       player.addTempSkill('jlsg_xujin2', 'phaseAfter');
	//       event.cards2 = [];
	//       for (var i = 0; i < result.buttons.length; i++) {
	//         event.cards2.push(result.buttons[i].link);
	//         cards.remove(result.buttons[i].link);
	//       }
	//       player.chooseTarget('选择获得卡牌的目标', true).ai = function (target) {
	//         if (player == target) return 10;
	//         return get.attitude(player, target);
	//       }
	//       "step 4"
	//       if (event.cards2.length) {
	//         result.targets[0].gain(event.cards2, 'gain');
	//       }
	//       for (var i = 0; i < cards.length; i++) {
	//         ui.discardPile.appendChild(cards[i]);
	//       }
	//       game.delay(2);
	//     },
	//     ai: {
	//       threaten: 1.2
	//     }
	//   },
	jlsg_xujin: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseDrawBegin1" },
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			const cards = get.cards(5);
			await game.cardsGotoOrdering(cards);
			await player.showCards(cards, "蓄劲");
			const split = {};
			for (const card of cards) {
				let suit = get.suit(card, false);
				if (!split[suit]) {
					split[suit] = [];
				}
				split[suit].push(card);
			}
			const controlList = [];
			for (const suit in split) {
				if (split[suit].length) {
					controlList.push(lib.translate[suit]);
				}
			}
			const { control: suit } = await player
				.chooseControl(controlList, "cancel2")
				.set("dialog", ["是否发动【蓄劲】？选择一种花色的牌交给一名角色。", cards])
				.set("split", split)
				.set("ai", function () {
					const splitValue = {};
					for (const suit in get.event().split) {
						splitValue[suit] = split[suit].reduce((v, b) => v + get.value(b, player), 0);
					}
					if (Object.keys(splitValue).some(suit => splitValue[suit] > 10)) {
						let suit = Object.keys(splitValue).reduce((a, b) => (splitValue[a] > splitValue[b] ? a : b));
						return lib.translate[suit];
					} else {
						return "cancel2";
					}
				})
				.forResult();
			if (!suit || suit == "cancel2") {
				return;
			}
			trigger.changeToZero();
			let gain = [];
			for (const suitx in split) {
				if (lib.translate[suitx] == suit) {
					gain = split[suitx];
				}
			}
			const result = await player
				.chooseTarget("选择获得卡牌的目标", true)
				.set("ai,", target => {
					const player = get.player();
					return get.attitude(player, target) * get.value(get.event().cards);
				})
				.set("cards", gain)
				.forResult();
			if (!result?.bool || !result?.targets?.length) {
				return;
			}
			const {
				targets: [target],
			} = result;
			const { cards: gainCards } = await target.gain(gain, "gain2");
			let num = gainCards.length;
			if (num > 0) {
				player.addTempSkill("jlsg_xujin_effect");
				player.setStorage("jlsg_xujin_effect", num, true);
			}
			await game.delay();
		},
		subSkill: {
			effect: {
				onremove: true,
				mark: true,
				intro: {
					content: function (storage, player) {
						return "出杀次数+" + storage + ",攻击距离为" + storage;
					},
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.storage.jlsg_xujin_effect - 1;
						}
					},
					attackRangeBase(player) {
						return player.storage.jlsg_xujin_effect;
					},
				},
			},
		},
		ai: {
			threaten: 1.2,
		},
	},
	jlsg_paoxiao: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		shaRelated: true,
		trigger: { source: "damageSource" },
		filter(event, player) {
			return event.card?.name == "sha";
		},
		check(event, player) {
			return get.attitude(player, event.player) <= 0 && event.notLink();
		},
		async content(event, trigger, player) {
			await player.draw(1);
			const result = await player
				.chooseToUse("蓄劲：请使用一张【杀】")
				.set("filterCard", (card, player, event) => {
					return get.name(card, player) == "sha";
				})
				.forResult();
			if (!result?.bool) {
				await trigger.player.discardPlayerCard(player, "he", true);
			}
		},
	},
	jlsg_benxi: {
		audio: "ext:极略/audio/skill:1",
		shaRelated: true,
		srlose: true,
		trigger: { player: "shaBegin" },
		forced: true,
		logTarget: "target",
		async content(event, trigger, player) {
			const result = await trigger.target
				.chooseToDiscard("请弃置一张装备牌，否则不能使用闪抵消此杀", "he")
				.set("filterCard", (card, player) => get.type(card) == "equip")
				.set("ai", card => {
					const player = get.player();
					const num = player.countCards("h", card => {
						return player.canRespond(get.event().getParent("useCard"), card);
					});
					if (num == 0) {
						return 0;
					}
					return 8 - get.value(card);
				})
				.forResult();
			if (!result?.bool) {
				trigger.directHit = true;
			}
		},
		mod: {
			globalFrom(from, to, distance) {
				return distance - 1;
			},
		},
	},
	jlsg_yaozhan: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => player.canCompare(current));
		},
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			const result = await player.chooseToCompare(target).forResult();
			if (result.bool) {
				await player.draw("nodelay");
				const sha = get.autoViewAs({ name: "sha" }, []);
				if (player.canUse(sha, target, false)) {
					await player.useCard(sha, target, false);
				}
			} else {
				await target.chooseToUse((card, player) => get.name(card, player) == "sha", player);
			}
		},
		ai: {
			threaten: 1.3,
			order(name, player) {
				const cards = player.getCards("h");
				if (player.countCards("h", "sha") == 0) {
					return 1;
				}
				for (const card of cards) {
					if (card.name != "sha" && card.number > 11 && get.value(card) < 7) {
						return 9;
					}
				}
				return lib.card.sha.ai.order - 1;
			},
			result: {
				player(player) {
					if (player.countCards("h", "sha") > 0) {
						return 0.6;
					}
					const num = player.countCards("h");
					if (num > player.hp) {
						return 0;
					}
					if (num == 1) {
						return -2;
					}
					if (num == 2) {
						return -1;
					}
					return -0.7;
				},
				target(player, target) {
					const num = target.countCards("h");
					if (num == 1) {
						return -1;
					}
					if (num == 2) {
						return -0.7;
					}
					return -0.5;
				},
			},
		},
	},
	jlsg_wenjiu: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		marktext: "酒",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			const cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("h", { color: "black" }) > 0;
		},
		filterCard(card) {
			return get.color(card) == "black";
		},
		check(card) {
			return 6 - get.value(card);
		},
		discard: false,
		prepare(cards, player) {
			player.$give(1, player);
		},
		async content(event, trigger, player) {
			const next = player.addToExpansion(event.cards);
			next.gaintag.add(event.name);
			await next;
		},
		group: "jlsg_wenjiu_sha",
		subSkill: {
			sha: {
				audio: "ext:极略/audio/skill/jlsg_wenjiu21.mp3",
				trigger: { player: "shaBegin" },
				filter(event, player) {
					return player.countExpansions("jlsg_wenjiu");
				},
				check(event, player) {
					return get.attitude(player, event.target) < 0;
				},
				async content(event, trigger, player) {
					const result = await player
						.chooseCardButton("请弃置一张「酒」，该伤害+1点", true, player.getExpansions("jlsg_wenjiu"))
						.set("ai", function (button) {
							if (get.attitude(player, trigger.target) < 0) {
								return 1;
							}
							return 0;
						})
						.forResult();
					if (result.bool) {
						await player.loseToDiscardpile(result.links);
						trigger.baseDamage++;
						player
							.when({ player: ["shaMiss", "useCardAfter"] })
							.filter(evt => evt.card == trigger.card)
							.step(async (event, trigger, player) => {
								if (trigger.name != "useCard") {
									await player.draw(1);
								}
							});
					}
				},
			},
		},
		ai: {
			order: 10,
			result: {
				player: function (player) {
					return 2 - player.getExpansions("jlsg_wenjiu").length;
				},
			},
		},
	},
	jlsg_shuixi: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCardTarget({
					filterCard: true,
					filterTarget(card, player, target) {
						return target != player;
					},
					ai1(card) {
						return get.value(card);
					},
					ai2(target) {
						return -get.attitude(player, target);
					},
					prompt: "水袭：展示一张手牌并选择一名其他角色",
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards: [card],
			} = event;
			player.showCards(card, "水袭");
			const suit = get.suit(card, player);
			const result = await target
				.chooseToDiscard(`请弃置一张${get.translation(suit + "2")}牌，否则失去1点体力`)
				.set("suit", suit)
				.set("filterCard", (card, player) => get.suit(card, player) == get.event().suit)
				.set("ai", card => {
					const player = get.player();
					if (player.hasSkillTag("maihp") && (player.hp > 2 || player.hasCard("tao", "h"))) {
						return -1;
					}
					return 7.9 - get.value(card);
				})
				.forResult();
			if (!result?.bool) {
				await target.loseHp();
				player.addTempSkill("jlsg_shuixi_ban", "phaseAfter");
			}
		},
		subSkill: {
			ban: {
				charlotte: true,
				mark: true,
				intro: {
					content: "水袭失败,不能使用【杀】",
				},
				mod: {
					cardEnabled(card, player) {
						if (get.name(card, player) == "sha") {
							return false;
						}
					},
				},
			},
		},
		ai: {
			expose: 0.4,
		},
	},
	jlsg_sanfen: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_zhugeliang"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return ui.cardPile.childNodes.length > 1;
		},
		direct: true,
		chooseButton: {
			dialog(event, player) {
				let dialog = ui.create.dialog("牌堆顶两张牌为", "hidden"),
					cards = Array.from(ui.cardPile.childNodes).slice(0, 2);
				dialog.add(cards);
				return dialog;
			},
			check(button) {
				return 2;
			},
			backup(links) {
				return {
					audio: "jlsg_guanxing",
					filterCard: () => false,
					filterTarget: () => false,
					selectCard: -1,
					selectTarget: -1,
					cards: links,
					async content(event, trigger, player) {
						const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
						const upgrade = upgradeStorage?.other?.["jlsg_sanfen"];
						while (true) {
							let bool,
								cards = Array.from(ui.cardPile.childNodes).slice(0, 2);
							if (cards.length < 2) {
								await game.washCard();
								continue;
							}
							await player.showCards(cards);
							if (cards.length < 2) {
								continue;
							}
							if (game.countPlayer(curr => curr.isIn()) >= 2) {
								let num1 = get.number(cards[0], false),
									num2 = get.number(cards[1], false);
								let boolx = num1 > num2;
								if (num1 == num2) {
									boolx = "nowin";
								}
								let targetprompt = cards.map(card => get.translation(card));
								let result = await player
									.chooseTarget()
									.set("targetprompt", targetprompt)
									.set("selectTarget", 2)
									.set("multitarget", true)
									.set("sanfenCompare", boolx)
									.set("ai", target => {
										let player = get.player(),
											event = get.event();
										let bool = event.sanfenCompare;
										if (bool == "nowin") {
											return get.attitude(player, target);
										}
										if (ui.selected.targets.length > 0) {
											if (bool) {
												return -get.attitude(player, target);
											} else {
												return get.attitude(player, target);
											}
										} else {
											if (bool) {
												return get.attitude(player, target);
											} else {
												return -get.attitude(player, target);
											}
										}
									})
									.forResult();
								bool = result.bool;
								if (result.bool) {
									let targets = result.targets;
									await game.doAsyncInOrder(
										targets,
										async (target, i) => {
											await target.gain(cards[i], "gain2");
										},
										() => 0
									);
									let card = get.autoViewAs({
										name: "sha",
										isCard: true,
										storage: {
											jlsg_sanfen: true,
										},
									});
									if (boolx != "nowin" && boolx && targets[0].canUse(card, targets[1], false, false)) {
										await targets[0].useCard(card, targets[1], false);
									} else if (boolx != "nowin" && targets[1].canUse(card, targets[0], false, false)) {
										await targets[1].useCard(card, targets[0], false);
									}
									let cardx = get.autoViewAs({
										name: "sha",
										isCard: true,
										storage: {
											jlsg_sanfen: true,
										},
									});
									let resultx = await player
										.chooseTarget()
										.set("filterTarget", (card, player, target) => {
											player = get.player();
											let event = get.event();
											return player.canUse(event.sanfenCard, target, false, false) && event.sanfenTargets.includes(target);
										})
										.set("selectTarget", [1, 2])
										.set("sanfenCard", cardx)
										.set("sanfenTargets", targets)
										.set("ai", target => {
											let player = get.player(),
												event = get.event();
											return get.effect(target, event.sanfenCard, player, player);
										})
										.forResult();
									if (resultx.bool) {
										await player.useCard(cardx, resultx.targets, false);
									}
								}
							}
							if (!bool || !cards.some(card => card.name == "sha") || !upgrade) {
								break;
							}
						}
					},
				};
			},
			prompt(links) {
				return get.prompt2("jlsg_sanfen");
			},
		},
		group: ["jlsg_sanfen_effect"],
		subSkill: {
			backup: {},
			effect: {
				audio: "jlsg_sanfen",
				trigger: {
					global: ["damageAfter"],
				},
				forced: true,
				filter(event, player) {
					return event.getParent()?.card?.storage?.jlsg_sanfen && event.player.countCards("hej");
				},
				async content(event, trigger, player) {
					await player.gainPlayerCard(trigger.player, "hej");
				},
			},
		},
		ai: {
			order: 8,
			result: {
				player: 10,
			},
			expose: 0.4,
			threaten: 3,
		},
	},
	jlsg_guanxing: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: ["phaseUse"],
		usable: 1,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_zhugeliang"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		marktext: "星",
		intro: {
			name: "星",
			content: "expansion",
		},
		filter(event, player) {
			return player.countExpansions("jlsg_qixing");
		},
		chooseButton: {
			dialog(event, player) {
				let dialog = ui.create.dialog("选择一张星获得", "hidden");
				let cards = player.getExpansions("jlsg_qixing");
				dialog.add(cards);
				return dialog;
			},
			check(button) {
				let player = get.player();
				if (player.countCards("h") < 2) {
					return 5;
				}
				if (player.hasUseTarget(button.link)) {
					return 5;
				}
			},
			select: [0, Infinity],
			backup(links) {
				return {
					audio: "jlsg_guanxing",
					filterCard: () => false,
					filterTarget: () => false,
					selectCard: -1,
					selectTarget: -1,
					cards: links,
					async content(event, trigger, player) {
						const { cards } = get.info(event.name);
						const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
						const upgrade = upgradeStorage?.other?.["jlsg_guanxing"];
						let next1 = player.gain(cards, "gain2"),
							next2 = player.draw(cards.length);
						if (upgrade) {
							next1.gaintag.add("jlsg_guanxing_use");
							next2.gaintag.add("jlsg_guanxing_use");
						}
						await next1;
						await next2;
					},
				};
			},
			prompt(links) {
				return get.prompt2("jlsg_guanxing");
			},
		},
		group: ["jlsg_guanxing_effect", "jlsg_guanxing_use"],
		subSkill: {
			backup: {},
			effect: {
				audio: "jlsg_guanxing",
				trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
				frequent: true,
				async content(event, trigger, player) {
					await player.chooseToGuanxing(5);
					let card = get.cardPile2(true, "bottom");
					let result = await player.chooseBool("是否将牌堆底牌置于武将牌上称为“星”").forResult();
					if (result.bool) {
						let next = player.addToExpansion(card, "gain2");
						next.gaintag.add("jlsg_qixing");
						await next;
					}
				},
			},
			use: {
				mod: {
					cardUsable(card, player) {
						if (card.cards.some(card => card.hasGaintag("jlsg_guanxing_use"))) {
							return Infinity;
						}
					},
				},
			},
		},
		ai: {
			order: 8,
			result: {
				player(player, target) {
					let cards = player.getCards("jlsg_guanxing");
					if (player.countCards("h") < 2) {
						return 5;
					}
					if (cards.some(card => player.hasUseTarget(card))) {
						return 5;
					}
				},
			},
			expose: 0.4,
			threaten: 3,
		},
	},
	jlsg_weiwo: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_zhugeliang"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		mark: true,
		intro: {
			content: function (storage, player) {
				let bool = player.getStorage("jlsg_weiwo", false) ? player.countCards("h") : !player.countCards("h");
				var str = "";
				if (!bool) {
					str += "防止属性伤害";
				} else {
					str += "防止非属性伤害";
				}
				return str;
			},
		},
		forced: true,
		trigger: { player: ["damageBegin4"] },
		filter(event, player) {
			let bool = player.getStorage("jlsg_weiwo", false) ? player.countCards("h") : !player.countCards("h");
			if (event.hasNature() && !bool) {
				return true;
			}
			if (!event.hasNature() && bool) {
				return true;
			}
			return false;
		},

		async content(event, trigger, player) {
			trigger.cancel();
		},
		group: ["jlsg_weiwo_change"],
		subSkill: {
			change: {
				audio: "jlsg_weiwo",
				trigger: { global: ["phaseJieshuBegin"] },
				filter(event, player) {
					const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
					const upgrade = upgradeStorage?.other?.["jlsg_weiwo"];
					return upgrade && !player.hasHistory("damage");
				},
				prompt: "是否交换【帷幄】中的“若你有手牌”和“若你没有手牌”",
				async content(event, trigger, player) {
					await player.draw();
					player.setStorage("jlsg_weiwo", !player.getStorage("jlsg_weiwo", false), true);
				},
			},
		},
		ai: {
			nofire: true,
			nothunder: true,
			skillTagFilter(player, tag, arg) {
				let bool = player.storage.jlsg_weiwo ? player.countCards("h") : !player.countCards("h");
				if (tag == "nofire") {
					return bool;
				} else if (tag == "nothunder") {
					return bool;
				}
			},
			effect: {
				target(card, player, target, current) {
					let bool = player.getStorage("jlsg_weiwo", false) ? player.countCards("h") : !player.countCards("h");
					if (get.tag(card, "natureDamage") && !bool) {
						return 0;
					} else if (card.name == "tiesuo" && !bool) {
						return [0, 0];
					} else if (!get.tag(card, "natureDamage") && bool && get.type2(card, player) != "equip") {
						return [0, 0];
					}
				},
			},
		},
	},
	jlsg_shouji: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countDiscardableCards(player, "he");
		},
		complexSelect: true,
		position: "he",
		filterCard: lib.filter.cardDiscardable,
		check(card) {
			return 10 - get.value(card);
		},
		getCardName(card) {
			switch (get.suit(card)) {
				case "heart":
					return "shunshou";
				case "diamond":
					return "huogong";
				case "club":
					return "jiedao";
				case "spade":
					return "juedou";
				default:
					return null;
			}
		},
		targetprompt: ["发起者", "承受者", "出杀目标"],
		selectTarget() {
			let num = lib.skill.jlsg_shouji.getCardName(ui.selected.cards[0]) == "jiedao" ? 3 : 2;
			return get.select(num);
		},
		filterTarget(card, player, target) {
			let cardName = lib.skill.jlsg_shouji.getCardName(card);
			if (!ui.selected.targets.length) {
				return target.hasUseTarget(cardName, false);
			} else if (ui.selected.targets.length == 1) {
				const user = ui.selected.targets[0];
				if (!user.canUse(cardName, target, false)) {
					return false;
				}
				if (cardName == "jiedao") {
					return target.getVEquips(1).length && target.hasUseTarget("sha", false);
				}
			} else if (ui.selected.targets.length == 2) {
				const user = ui.selected.targets[1];
				return user.canUse("sha", target, false);
			}
			return true;
		},
		multitarget: true,
		async content(event, trigger, player) {
			const {
				targets: [target1, target2, target3],
				cards: [card],
			} = event;
			const name = lib.skill.jlsg_shouji.getCardName(card);
			const cardx = get.autoViewAs({ name }, []);
			if (name != "jiedao") {
				await target1.useCard(cardx, [target2], "noai");
			} else {
				await target1.useCard(cardx, [target2], "noai").set("addedTargets", [target3]);
			}
		},
		ai: {
			order: 6,
			fireattack: true,
			result: {
				target: function (player, target) {
					if (ui.selected.targets.length == 0) {
						return 3;
					} else {
						let card = ui.selected.cards[0];
						let name = lib.skill.jlsg_shouji.getCardName(card);
						if (name == "jiedao") {
							return -1.5;
						}
						return get.effect(target, get.autoViewAs({ name }, []), ui.selected.targets[0], target);
					}
				},
			},
		},
	},
	jlsg_hemou: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			return event.player != player && player.countCards("h") > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCard(`###${get.prompt("jlsg_hemou", trigger.player)}###令其本回合可以将一张手牌牌按如下规则使用(限一次)<br>黑桃：决斗<br>梅花：借刀杀人<br>红桃：顺手牵羊<br>方片：火攻`)
				.set("filterCard", (card, player, event) => lib.filter.canBeGained(card, get.event().getTrigger().player, player, event))
				.set("ai", card => {
					const player = get.player(),
						target = get.event().targetx;
					if (get.attitude(player, target) > 0 && !target.hasJudge("lebu") && trigger.player.countCards("h") > 2) {
						return 4 - get.value(card);
					}
					return 0;
				})
				.set("targetx", trigger.player)
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [trigger.player];
			}
		},
		async content(event, trigger, player) {
			await trigger.player.gain(event.cards, player, "giveAuto");
			const suit = get.suit(event.cards[0]);
			if (!lib.suit.includes(suit)) {
				return;
			}
			trigger.player.addTempSkill(`jlsg_hemou_${suit}`, { player: "phaseUseAfter" });
		},
		ai: {
			expose: 0.1,
		},
		subSkill: {
			heart: {
				mark: true,
				marktext: "♥︎",
				intro: {
					name: "合谋·顺手",
					content: "本回合内限一次,可将一张♥︎牌当顺手牵羊使用.",
				},
				enable: "phaseUse",
				usable: 1,
				viewAs: { name: "shunshou" },
				viewAsFilter(player) {
					if (!player.countCards("hs", { suit: "heart" })) {
						return false;
					}
				},
				prompt: "将一张♥︎手牌当顺手牵羊使用",
				position: "hs",
				filterCard(card, player) {
					return get.suit(card) == "heart";
				},
				check(card) {
					return 6 - get.value(card);
				},
			},
			diamond: {
				mark: true,
				marktext: "♦︎",
				intro: {
					name: "合谋·火攻",
					content: "本回合内限一次,可将一张♦︎牌当火攻使用.",
				},
				enable: "chooseToUse",
				usable: 1,
				viewAs: { name: "huogong", nature: "fire" },
				viewAsFilter(player) {
					if (!player.countCards("hs", { suit: "diamond" })) {
						return false;
					}
				},
				prompt: "将一张♦︎手牌当火攻使用",
				position: "hs",
				filterCard(card, player) {
					return get.suit(card) == "diamond";
				},
				check(card) {
					var player = _status.currentPhase;
					if (player.countCards("h") > player.hp) {
						return 6 - get.value(card);
					}
					return 4 - get.value(card);
				},
				ai: {
					fireattack: true,
				},
			},
			club: {
				mark: true,
				marktext: "♣︎",
				intro: {
					name: "合谋·借刀",
					content: "本回合内限一次,可将一张♣︎牌当借刀杀人使用.",
				},
				enable: "phaseUse",
				usable: 1,
				viewAs: { name: "jiedao" },
				viewAsFilter: function (player) {
					if (!player.countCards("hs", { suit: "club" })) {
						return false;
					}
				},
				prompt: "将一张♣︎手牌当借刀杀人使用",
				position: "hs",
				filterCard: function (card, player) {
					return get.suit(card) == "club";
				},
				check: function (card) {
					return 6 - get.value(card);
				},
			},
			spade: {
				mark: true,
				marktext: "♠︎",
				intro: {
					name: "合谋·决斗",
					content: "回合限一次,可将一张♠︎牌当决斗使用.",
				},
				enable: "phaseUse",
				usable: 1,
				viewAs: { name: "juedou" },
				viewAsFilter: function (player) {
					if (!player.countCards("hs", { suit: "spade" })) {
						return false;
					}
				},
				prompt: "将一张♠︎手牌当决斗使用",
				position: "hs",
				filterCard: function (card, player) {
					return get.suit(card) == "spade";
				},
				check: function (card) {
					return 6 - get.value(card);
				},
				ai: {
					order: 5,
				},
			},
		},
	},
	jlsg_qicai: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter(event, player) {
			let evt = event.getl?.(player);
			return evt?.hs?.length;
		},
		frequent: true,
		async content(event, trigger, player) {
			const result = await player
				.judge(function (card) {
					if (get.color(card) == "red") {
						return 2;
					}
					return -2;
				})
				.set("judge2", result => result.bool)
				.forResult();
			if (result?.bool) {
				await player.draw();
			}
		},
		ai: {
			threaten: 4,
			order: 15,
			result: {
				player: 1,
			},
			effect: {
				target(card) {
					if (card.name == "guohe" || card.name == "liuxinghuoyu") {
						return 0.3;
					}
				},
			},
		},
	},
	jlsg_rende: {
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_liubei"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseJieshuBegin" },
		filter(event, player) {
			return event.player.isAlive();
		},
		check(event, player) {
			return get.attitude(player, event.player) > 0;
		},
		async content(event, trigger, player) {
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const upgrade = upgradeStorage?.other?.[event.name];
			let num = upgrade ? 3 : 2;
			await player.draw(num);
			let result = await player
				.chooseCard("交给" + get.translation(trigger.player) + get.cnNumber(num) + "张牌", "he", [num, num], true)
				.set("filterCard", (card, player, event) => lib.filter.canBeGained(card, get.event().source, player, event))
				.set("ai", card => {
					const player = get.player(),
						source = get.event().source;
					if (source.hasSkillTag("nogain")) {
						return source.getUseValue(card, false, false) - get.value(card) - 1;
					}
					if (get.attitude(player, source) > 1) {
						return source.getUseValue(card, false, false);
					}
					return source.getUseValue(card, false, false) - get.value(card);
				})
				.set("source", trigger.player)
				.forResult();
			if (!result?.bool || !result.cards?.length) {
				return;
			}
			if (trigger.player != player) {
				await player.give(result.cards, trigger.player);
			}
			if (upgrade) {
				trigger.player.addGaintag(result.cards, "jlsg_rende");
				trigger.player.addTempSkill("jlsg_rende_effect", { player: "phaseUseEnd" });
			}
			await game.delay();
			const phase = trigger.getParent("phase", true);
			if (phase) {
				phase.phaseList.splice(phase.num + 1, 0, `phaseUse|${event.name}`);
			} else {
				await trigger.player.phaseUse();
			}
		},
		ai: {
			expose: 0.2,
		},
		subSkill: {
			effect: {
				sub: true,
				sourceSkill: "jlsg_rende",
				charlotte: true,
				onremove(player) {
					player.removeGaintag("jlsg_rende");
				},
				mod: {
					cardUsable: function (card, player, num) {
						if (card?.cards?.some(i => i.hasGaintag("jlsg_rende"))) {
							return Infinity;
						}
					},
					targetInRange: function (card, player, target, now) {
						if (card?.cards?.some(i => i.hasGaintag("jlsg_rende"))) {
							return true;
						}
					},
				},
			},
		},
	},
	jlsg_chouxi: {
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_liubei"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer(current => current != player && !player.hasStorage("jlsg_chouxi", current));
		},
		filterTarget(card, player, target) {
			return player != target && !player.hasStorage("jlsg_chouxi", target) && target.countCards("h");
		},
		async content(event, trigger, player) {
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const upgrade = upgradeStorage?.other?.[event.name];
			const target = event.targets[0];
			if (!player.getStorage("jlsg_chouxi")?.length) {
				player.when({ player: "phaseUseEnd" }).then(() => player.setStorage("jlsg_chouxi", []));
			}
			player.markAuto("jlsg_chouxi", [target]);
			let num = upgrade ? 3 : 2;
			let result = await player.gainPlayerCard(target, [1, num], false).forResult();
			if (!result?.bool || !result?.cards?.length) {
				return;
			}
			num = result.cards.length;
			let type = result.cards.map(card => get.type2(card)).unique();
			let next = await player
				.chooseCard("交给" + get.translation(target) + get.cnNumber(num) + "张牌", "he", [num, num], true)
				.set("filterCard", (card, player, event) => lib.filter.canBeGained(card, get.event().source, player, event))
				.set("ai", card => {
					const player = get.player(),
						source = get.event().source;
					if (player == source) {
						return 6;
					}
					if (get.attitude(player, source) > 1) {
						if (source.countUsed("sha") > 0 && ["sha", "jiu"].includes(card.name)) {
							return 6.5 - get.value(card);
						}
						return source.getUseValue(card);
					}
					return get.value(card) < 2 || !source.getUseValue(card) == 0;
				})
				.set("source", target)
				.forResult();
			if (!next?.bool || !next.cards?.length) {
				return;
			}
			if (player != target) {
				await player.give(next.cards, target);
			} else {
				await game.delay();
			}
			let type2 = next.cards.map(card => get.type2(card)).unique();
			if (type.length == type2.length) {
				return;
			}
			num = Math.abs(type.length - type2.length);
			let next2 = await player
				.chooseBool("是否对" + get.translation(target) + "造成" + get.cnNumber(num) + "点伤害？")
				.set("ai", (event, player) => get.damageEffect(event.targets[0], player, player) > 0)
				.forResult();
			if (next2?.bool) {
				await target.damage(num, player);
			}
		},
		ai: {
			order: 4,
			result: {
				player: 0.5,
				target: -1,
			},
		},
	},
	jlsg_yongbing: {
		unique: true,
		audio: "ext:极略/audio/skill:true",
		zhuSkill: true,
		global: "jlsg_yongbing2",
	},
	jlsg_yongbing2: {
		sourceSkill: "jlsg_yongbing",
		trigger: { source: "damageEnd" },
		getIndex(event, player) {
			return game.filterPlayer(current => {
				return current.hasZhuSkill("jlsg_yongbing", player);
			});
		},
		filter(event, player, triggername, target) {
			if (player.group != "shu") {
				return false;
			} else if (event.card?.name != "sha") {
				return false;
			} else if (!event.source?.isIn() || event.source == target) {
				return false;
			}
			return target?.isIn();
		},
		check(event, player, triggername, target) {
			return get.effect(target, { name: "draw" }, player, player);
		},
		prompt(event, player, triggername, target) {
			return get.prompt("jlsg_yongbing", target);
		},
		logTarget(event, player, triggername, target) {
			return target;
		},
		async content(event, trigger, player) {
			await event.targets[0].draw(1);
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_zhaoxiang: {
		srlose: true,
		audio: "ext:极略/audio/skill:1",
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_caocao"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		trigger: { global: "useCardToPlayer" },
		filter(event, player) {
			if (event.card.name != "sha") {
				return false;
			} else if (event.player == player) {
				return false;
			}
			return event.player.countGainableCards(player, "h");
		},
		async cost(event, trigger, player) {
			const skill = event.name.slice(0, -5);
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const upgrade = upgradeStorage?.other?.[skill];
			const storage = player.getStorage(
				event.skill,
				Array.from({ length: upgrade ? 4 : 3 }, () => true)
			);
			event.result = await player
				.gainPlayerCard(`###${get.prompt("jlsg_zhaoxiang", trigger.player)}###${get.skillInfoTranslation("jlsg_zhaoxiang", player)}`, trigger.player, "h")
				.set("ai", button => {
					if (get.event().check) {
						return get.event().getRand(button.link.cardid.toString());
					}
					return 0;
				})
				.set(
					"check",
					(function () {
						const gainEff = get.effect(trigger.player, { name: "shunshou_copy2" }, player, player),
							resultList = lib.skill.jlsg_zhaoxiang.getCheck(trigger, player, upgrade);
						return resultList.some((v, i) => storage[i] && v + gainEff > 0);
					})()
				)
				.set("logSkill", ["jlsg_zhaoxiang", trigger.player])
				.set("chooseonly", true)
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [trigger.player];
				event.result.cost_data = { storage, upgrade };
			}
		},
		popup: false,
		async content(event, trigger, player) {
			const {
				cards,
				targets: [target],
				cost_data: { storage, upgrade },
			} = event;
			await player.gain(cards, target).set("ainimate", false);
			const choiceList = ["令此【杀】不能被响应", "令此【杀】无效", "将此【杀】的目标改为你"],
				list = [];
			if (upgrade) {
				choiceList.push("令目标角色于此【杀】结算后回复1点体力");
			}
			for (let i in storage) {
				if (!storage[i]) {
					choiceList[i] = '<span style="opacity:0.5">' + choiceList[i] + "</span>";
				} else {
					list.add(`选项${get.cnNumber(Number(i) + 1, true)}`);
				}
			}
			const result = await player
				.chooseControl(list)
				.set("prompt", "招降")
				.set("choiceList", choiceList)
				.set("ai", () => get.event().choice)
				.set(
					"choice",
					(function () {
						const resultList = lib.skill.jlsg_zhaoxiang
								.getCheck(trigger, player, storage.length == 4)
								.map((v, i) => (storage[i] ? v : null))
								.filter(i => i !== null),
							choiceList = storage.filter(i => i);
						let max = 0,
							choice = 0;
						for (let i in choiceList) {
							if (resultList[i] > max) {
								max = resultList[i];
								choice = i;
							}
						}
						return Number(choice);
					})()
				)
				.forResult();
			if (result) {
				game.log(player, "选择了", result.control);
				let map = ["选项一", "选项二", "选项三", "选项四"];
				let num = map.indexOf(result.control);
				storage[num] = false;
				if (storage.every(i => i === false)) {
					for (let i in storage) {
						storage[i] = true;
					}
				}
				player.setStorage(event.name, storage);
			}
			await game.delay();
			if (result?.control == "选项一") {
				game.log(player, "令", trigger.card, "不能被响应");
				trigger.getParent().directHit.addArray(game.players);
			} else if (result?.control == "选项二") {
				game.log(player, "令", trigger.player, "使用的", trigger.card, "无效");
				trigger.getParent().all_excluded = true;
			} else if (result?.control == "选项三") {
				game.log(player, "将", trigger.card, "的目标", trigger.target, "改为", player);
				trigger.getParent().targets.remove(trigger.target);
				trigger.getParent().targets.add(player);
			} else if (result?.control == "选项四") {
				trigger.target
					.when({ global: "useCardAfter" })
					.filter(evt => evt.card == trigger.card)
					.step(async (event, trigger, player) => {
						await player.recover(1);
					});
			}
		},
		getCheck(trigger, player, upgrade = false) {
			const { card, player: source, targets, target } = trigger;
			let useCardToTargets = targets.reduce((sum, targetx) => sum + get.effect(targetx, card, source, player), 0),
				useCardToTarget = get.effect(target, card, source, player),
				useCardToPlayer = get.effect(player, card, source, player);
			let result = [useCardToTargets, -useCardToTargets, useCardToPlayer - useCardToTarget, useCardToTarget + get.recoverEffect(target, player, player)];
			if (upgrade) {
				return result;
			}
			return result.slice(0, -1);
		},
		ai: {
			expose: 0.5,
		},
	},
	jlsg_zhishi: {
		srlose: true,
		init(player, skill) {
			if (!_status.gameStarted) {
				return;
			}
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			if (!upgradeStorage?.["jlsgsr_caocao"]?.[2] && (!upgradeStorage?.other || !(skill in upgradeStorage.other))) {
				const next = game.createEvent("_jlsgsr_choice_extraUpgrade", false, get.event());
				next.set("player", player);
				next.set("skill", skill);
				next.setContent(lib.skill._jlsgsr_choice.extraUpgrade);
			}
		},
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "damageEnd" },
		filter(event, player) {
			return event.num > 0 && event.player.isIn();
		},
		prompt(event, player) {
			return get.prompt("jlsg_zhishi", event.player);
		},
		prompt2(event, player) {
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const upgrade = upgradeStorage?.other?.["jlsg_zhishi"];
			let num = upgrade ? "三" : "两";
			return `令其从随机${num}个能在此时机发动的技能中选择一个并发动`;
		},
		check(event, player) {
			return get.attitude(player, event.player) > 0;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const upgradeStorage = _status._jlsgsr_upgrade?.[player.playerid] || {};
			const upgrade = upgradeStorage?.other?.[event.name];
			if (!_status.characterlist) {
				game.initCharacterList();
			}
			const allList = _status.characterlist.slice(0);
			game.countPlayer(function (current) {
				const nameList = get.nameList(current);
				nameList.forEach(name => {
					if (lib.character[name] && name.indexOf("gz_shibing") != 0 && name.indexOf("gz_jun_") != 0) {
						allList.add(name);
					}
				});
			});
			const skills = [],
				max = upgrade ? 2 : 1;
			allList.randomSort();
			for (const name of allList) {
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1) {
					continue;
				}
				const skills2 = get.character(name).skills || [];
				for (const skill of skills2) {
					if (skills.includes(skill)) {
						continue;
					}
					const list = [skill];
					game.expandSkills(list);
					for (const skill2 of list) {
						const info = lib.skill[skill2];
						if (get.is.zhuanhuanji(skill2, trigger.player)) {
							continue;
						}
						if (!info || !info.trigger || !info.trigger.player || info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || (info.zhuSkill && !trigger.player.isZhu2())) {
							continue;
						}
						if (info.trigger.player == "damageEnd" || (Array.isArray(info.trigger.player) && info.trigger.player.includes("damageEnd"))) {
							if (info.ai && ((info.ai.combo && !trigger.player.hasSkill(info.ai.combo)) || info.ai.notemp || info.ai.neg)) {
								continue;
							}
							if (info.init) {
								continue;
							}
							if (info.filter) {
								let indexedData;
								if (typeof info.getIndex === "function") {
									indexedData = info.getIndex(trigger, trigger.player, "damageEnd");
									if (Array.isArray(indexedData)) {
										if (
											!indexedData.some(target => {
												try {
													const bool = info.filter(trigger, trigger.player, "damageEnd", target);
													if (bool) {
														return true;
													}
													return false;
												} catch (e) {
													return false;
												}
											})
										) {
											continue;
										}
									} else if (typeof indexedData === "number" && indexedData > 0) {
										try {
											const bool = info.filter(trigger, trigger.player, "damageEnd", true);
											if (!bool) {
												continue;
											}
										} catch (e) {
											continue;
										}
									}
								} else {
									try {
										const bool = info.filter(trigger, trigger.player, "damageEnd", true);
										if (!bool) {
											continue;
										}
									} catch (e) {
										continue;
									}
								}
							}
							skills.add(skill);
							if (skills.length > 1) {
								break;
							}
						}
					}
				}
				if (skills.length > max) {
					break;
				}
			}
			if (!skills.length) {
				return;
			}
			const buttons = skills.map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(i) + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
			const result = await trigger.player
				.chooseButton(true, ["选择要发动的技能", [buttons, "textbutton"]])
				.set("ai", button => get.skillRank(button.link, "out"))
				.forResult();
			if (!result?.bool) {
				return;
			}
			const skill = result.links[0];
			game.log(trigger.player, `选择了【${get.translation(skill)}】`);
			trigger.player.addTempSkill(skill, { player: "damageAfter" });
			const arrange = event.getParent("arrangeTrigger", true);
			if (arrange) {
				const { doingList, doing } = arrange;
				const num1 = doingList.indexOf(doing),
					num2 = doingList.findIndex(i => i.player == trigger.player);
				//若目标角色在arrangeTrigger中顺序已过，则手动createTrigger
				if (num1 > num2) {
					const skills2 = game.expandSkills([skill]),
						toadds = [];
					for (let skill2 of skills2) {
						const info = lib.skill[skill2];
						if (typeof info.getIndex === "function") {
							const indexedResult = info.getIndex(trigger, trigger.player, "damageEnd");
							if (Array.isArray(indexedResult)) {
								indexedResult.forEach(indexedData => {
									toadds.push({ indexedData, skill2 });
								});
							} else if (typeof indexedResult === "number" && indexedResult > 0) {
								for (let i = 0; i < indexedResult; i++) {
									toadds.push({ indexedData: true, skill2 });
								}
							}
						} else {
							toadds.push({ indexedData: true, skill2 });
						}
					}
					for (let i of toadds) {
						const { indexedData, skill2 } = i;
						if (lib.filter.filterTrigger(trigger, trigger.player, "damageEnd", skill2, indexedData)) {
							await game.createTrigger("damageEnd", skill2, trigger.player, trigger, indexedData);
						}
					}
				}
			}
		},
		ai: {
			maixue: true,
			maixie_hp: true,
		},
	},
	jlsg_jianxiong: {
		unique: true,
		audio: "ext:极略/audio/skill:true",
		global: "jlsg_jianxiong2",
		zhuSkill: true,
	},
	jlsg_jianxiong2: {
		trigger: { player: "damageEnd" },
		getIndex(event, player) {
			return game.filterPlayer(current => {
				return current.hasZhuSkill("jlsg_jianxiong", player);
			});
		},
		filter(event, player, triggername, target) {
			if (player.group != "wei") {
				return false;
			} else if (event.source == target || player == target || !target?.isIn()) {
				return false;
			} else if (!event.cards?.filterInD("od")?.length) {
				return false;
			}
			return player.countDiscardableCards(player, "h");
		},
		async cost(event, trigger, player) {
			const target = event.indexedData;
			event.result = await player
				.chooseToDiscard(`###${get.prompt("jlsg_jianxiong", target)}###弃置一张手牌，然后令${get.translation(target)}获得${get.translation(trigger.card)}`)
				.set("ai", card => {
					const player = get.player(),
						target = get.event().getParent().indexedData;
					if (get.attitude(player, target) > 0) {
						return 6 - get.value(card);
					}
					return 0;
				})
				.set("chooseonly", true)
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [target];
			}
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			await event.targets[0].gain(trigger.cards.filterInD("od"), "gain2");
		},
		ai: {
			expose: 0.1,
		},
	},
	jlsg_zhonghou: {
		audio: "ext:极略/audio/skill:1",
		srlose: true,
		firstDo: true,
		trigger: {
			global: ["useCardBefore", "respondBefore"],
		},
		filter(event, player) {
			if (player.hasStorage("jlsg_zhonghou_use", event.player)) {
				return false;
			}
			return event.skill?.startsWith("jlsg_zhonghou");
		},
		direct: true,
		async content(event, trigger, player) {
			if (trigger.player == player) {
				if (player.isPhaseUsing()) {
					player.addTempSkill("jlsg_zhonghou_use");
					player.markAuto("jlsg_zhonghou_use", [player]);
				}
				await player.loseHp(1);
				return;
			} else {
				let prompt = `是否失去1点体力视为${get.translation(trigger.player)}使用一张${get.translation(trigger.card)}？`;
				const { bool } = await player.chooseBool(prompt, get.attitude(player, trigger.player) >= 6).forResult();
				if (!bool) {
					player.addTempSkill("jlsg_zhonghou_use");
					player.markAuto("jlsg_zhonghou_use", [trigger.player]);
					game.log(player, Math.random() < 0.5 ? "丑拒了" : "蠢拒了", trigger.player);
					player.chat("拒绝");
					trigger.cancel();
					trigger.getParent().goto(0);
					await game.delayx();
				} else {
					await player.loseHp(1);
				}
			}
		},
		global: ["jlsg_zhonghou_global"],
		subSkill: {
			use: {
				onremove: true,
			},
			backup: {},
		},
	},
	jlsg_zhonghou_global: {
		sourceSkill: "jlsg_zhonghou",
		enable: ["chooseToUse", "chooseToRespond"],
		audio: "jlsg_zhonghou",
		hiddenCard(player, name) {
			return get.type(name) == "basic";
		},
		filter(event, player) {
			if (
				!game.hasPlayer(current => {
					if (!current.hasSkill("jlsg_zhonghou") || current.hasStorage("jlsg_zhonghou_use", player)) {
						return false;
					} else if (current.isDying()) {
						return false;
					}
					return current == player || player.inRangeOf(current);
				})
			) {
				return false;
			}
			for (let i of lib.inpile) {
				if (get.type(i) != "basic") {
					continue;
				}
				if (i == "sha" && lib.inpile_nature.some(nat => event.filterCard(get.autoViewAs({ name: i, nature: nat }), player, event))) {
					return true;
				}
				if (event.filterCard(get.autoViewAs({ name: i }), player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog() {
				var list = [];
				for (var i of lib.inpile) {
					var type = get.type(i);
					if (type != "basic") {
						continue;
					}
					list.push([type, "", i]);
					if (i == "sha") {
						for (var j of lib.inpile_nature) {
							list.push([type, "", i, j]);
						}
					}
				}
				return ui.create.dialog("忠候", [list, "vcard"]);
			},
			filter(button, player) {
				var evt = _status.event.getParent();
				return evt.filterCard(get.autoViewAs({ name: button.link[2], nature: button.link[3] }, []), player, evt);
			},
			check(button) {
				let player = _status.event.player;
				let card = get.autoViewAs({ name: button.link[2], nature: button.link[3] }, []);
				let val = _status.event.getParent().type == "phase" ? player.getUseValue(card) : 1;
				if (val <= 0) {
					return 0;
				}
				return val;
			},
			backup(links, player) {
				return {
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					filterCard() {
						return false;
					},
					selectCard: -1,
					popupname: true,
					log: false,
					async precontent(event, trigger, player) {
						player.logSkill("jlsg_zhonghou");
					},
				};
			},
		},
		ai: {
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				return game.hasPlayer(current => {
					if (!current.hasSkill("jlsg_zhonghou") || current.hasStorage("jlsg_zhonghou_use", player)) {
						return false;
					} else if (current.isDying()) {
						return false;
					}
					return current == player || player.inRangeOf(current);
				});
			},
		},
	},
	jlsg_ganglie: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseUseBegin" },
		srlose: true,
		check(event, player) {
			if (player.countCards("h") < 3 && player.hp < 2) {
				return false;
			}
			return player.countCards("hs", card => get.tag(card, "damage") && player.getUseValue(card));
		},
		async content(event, trigger, player) {
			await player.loseHp(1);
			player.addTempSkill("jlsg_ganglie_damage", "phaseAfter");
			player.addTempSkill("jlsg_ganglie_phaseEnd", "phaseAfter");
		},
		subSkill: {
			damage: {
				trigger: { source: "damageBegin" },
				filter: function (event) {
					return event.num > 0;
				},
				forced: true,
				async content(event, trigger, player) {
					trigger.num++;
					player.removeSkill(event.name);
				},
			},
			phaseEnd: {
				audio: "ext:极略/audio/skill:2",
				trigger: { player: "phaseEnd" },
				filter(event, player) {
					return player.getStat("damage") > 0;
				},
				forced: true,
				async content(event, trigger, player) {
					await player.draw(player.getStat("damage"));
				},
			},
		},
	},
};

export default skills;
