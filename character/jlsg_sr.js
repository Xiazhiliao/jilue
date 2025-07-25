import { lib, game, ui, get, ai, _status } from "../../../noname.js";
export default {
	name: "jlsg_sr",
	connect: true,
	character: {
		jlsgsr_zhangliao: ["male", "wei", 4, ["jlsg_wuwei", "jlsg_yansha"], []],
		jlsgsr_xiahoudun: ["male", "wei", 4, ["jlsg_zhonghou", "jlsg_ganglie"], ["name:夏侯|惇"]],
		jlsgsr_zhenji: ["female", "wei", 3, ["jlsg_liuyun", "jlsg_lingbo", "jlsg_qingcheng"], ["name:甄|null"]],
		jlsgsr_xuzhu: ["male", "wei", 4, ["jlsg_aozhan", "jlsg_huxiao"], []],
		jlsgsr_simayi: ["male", "wei", 3, ["jlsg_guicai", "jlsg_langgu", "jlsg_zhuizun"], ["name:司马|懿"]],
		jlsgsr_guojia: ["male", "wei", 3, ["jlsg_tianshang", "jlsg_yiji", "jlsg_huiqu"], []],
		jlsgsr_caocao: ["male", "wei", 4, ["jlsg_zhaoxiang", "jlsg_zhishi", "jlsg_jianxiong"], ["zhu"]],
		jlsgsr_zhaoyun: ["male", "shu", 4, ["jlsg_jiuzhu", "jlsg_tuwei"], []],
		jlsgsr_zhangfei: ["male", "shu", 4, ["jlsg_xujin", "jlsg_paoxiao"], []],
		jlsgsr_machao: ["male", "shu", 4, ["jlsg_benxi", "jlsg_yaozhan"], []],
		jlsgsr_guanyu: ["male", "shu", 4, ["jlsg_wenjiu", "jlsg_shuixi"], []],
		jlsgsr_zhugeliang: ["male", "shu", 3, ["jlsg_sanfen", "jlsg_guanxing", "jlsg_weiwo"], ["name:诸葛|亮"]],
		jlsgsr_huangyueying: ["female", "shu", 3, ["jlsg_shouji", "jlsg_hemou", "jlsg_qicai"], ["name:黄|null"]],
		jlsgsr_liubei: ["male", "shu", 4, ["jlsg_rende", "jlsg_chouxi"], ["zhu"]],
		jlsgsr_sunshangxiang: ["female", "wu", 3, ["jlsg_yinmeng", "jlsg_xiwu", "jlsg_juelie"], ["name:孙|null"]],
		jlsgsr_daqiao: ["female", "wu", 3, ["jlsg_fangxin", "jlsg_xiyu", "jlsg_wanrou"], ["name:桥|null"]],
		jlsgsr_huanggai: ["male", "wu", 4, ["jlsg_zhouyan", "jlsg_zhaxiang"], []],
		jlsgsr_lvmeng: ["male", "wu", 4, ["jlsg_shixue", "jlsg_guoshi"], []],
		jlsgsr_zhouyu: ["male", "wu", 3, ["jlsg_yingcai", "jlsg_weibao", "jlsg_choulve"], []],
		jlsgsr_ganning: ["male", "wu", 4, ["jlsg_jiexi", "jlsg_youxia"], []],
		jlsgsr_luxun: ["male", "wu", 3, ["jlsg_dailao", "jlsg_youdi", "jlsg_ruya"], []],
		jlsgsr_sunquan: ["male", "wu", 4, ["jlsg_quanheng", "jlsg_xionglve", "jlsg_fuzheng"], ["zhu"]],
		jlsgsr_lvbu: ["male", "qun", 4, ["jlsg_jiwu", "jlsg_sheji"], []],
		jlsgsr_huatuo: ["male", "qun", 3, ["jlsg_xingyi", "jlsg_guagu", "jlsg_wuqin"], []],
		jlsgsr_diaochan: ["female", "qun", 3, ["jlsg_lijian", "jlsg_manwu", "jlsg_baiyue"], ["name:null|null"]],
	},
	characterIntro: {},
	skill: {
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
				for (const name of names) {
					if (name.indexOf("jlsgsr_") == 0) {
						return true;
					}
				}
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
							info = info.slice(1, -1);
							choiceList = choiceList.slice(0, -1);
						}
						//非强制突破，非顺次选择
						const { result: upgrade } = await player
							.chooseButton([1, 4], [`请选择${get.translation(name)}的突破`, [choiceList.map((item, i) => [i, item]), "textbutton"]])
							.set("ai", button => true)
							.set("info", info);
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
									默认全关
								},
							}*/
							game.broadcastAll(
								function (player, name, info) {
									if (!_status._jlsgsr_upgrade) {
										_status._jlsgsr_upgrade = {};
									}
									if (!_status._jlsgsr_upgrade[player.playerid]) {
										_status._jlsgsr_upgrade[player.playerid] = {};
									}
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
					if (skills.length < 2) continue;
					let str = "";
					for (const skill of skills) {
						str += '<div class="text" style="width:90%;display:inline-block">' + '<div class="skill"><font color="#FFFF00"><span style="font-size:18px">' + lib.translate[skill] + "</font></span></div>" + '<div><font color="#9AFF02"><span style="font-size:16px">' + lib.translate[skill + "_info"] + "</font></span></div>" + "</div><br><br><br>";
					}
					const { result } = await player
						.chooseControl(skills)
						.set("prompt", "选择" + get.translation(name) + "禁用1个技能<br><br>" + str)
						.set("ai", () => get.event("choice"))
						.set(
							"choice",
							(function () {
								return skills.randomGet();
							})()
						);
					if (result.control == "cancel2") {
						continue;
					}
					player.removeSkill(result.control);
					player.update();
					game.broadcastAll(
						function (name, skill) {
							if (lib.characterPack.jlsg_sr[name]) {
								lib.characterPack.jlsg_sr[name].skills.remove(skill);
								if (!_status.connectMode) {
									if (lib.character[name]) {
										lib.character[name].skills.remove(skill);
									}
								}
							}
						},
						name,
						result.control
					);
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
						const { result: chooseCard } = await player
							.chooseCardButton("无畏：请选择视为使用【杀】弃置的牌", cards)
							.set("filterButton", function (button) {
								return get.type(button.link) == "basic";
							})
							.set("ai", function (button) {
								if (jlsg.isWeak(get.player())) {
									return button.link.name != "du" || button.link.name != "tao";
								}
								return 8 - get.value(button.link);
							});
						if (!chooseCard.bool || !chooseCard.links?.length) {
							break;
						}
						const { result } = await player
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
									sha = get.event("card");
								return get.effect(target, sha, player, player);
							});
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
				if (cards.length) player.loseToDiscardpile(cards);
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
					if (phase != trigger.getParent("phase")) return;
					const { result } = await player.chooseCard(`###${get.prompt("jlsg_yansha")}###将一张手牌牌置于武将牌上作为「掩」`, "h").set("ai", card => {
						return 7 - get.value(card);
					});
					if (result.bool && result.cards.length) {
						await player.logSkill("jlsg_yansha");
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
						if (event.player.countCards("he") > 1 && get.attitude(player, event.player) < 0) return 2;
						if (get.attitude(player, event.target) > 0) {
							if (event.target.isDamaged() && event.target.getEquip("baiyin")) return 2;
							if (!event.target.countCards("h") && event.player.countCards("he") > 0) return 1;
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
						const { result } = await player.chooseCardButton("掩杀", player.getExpansions("jlsg_yansha"), true);
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
					const { result } = await target.chooseControl("draw_card", "recover_hp").set("ai", function () {
						const player = get.player();
						if (player.hp == 1 && player.maxHp > 2) {
							return "recover_hp";
						} else if (player.hp == 2 && player.maxHp > 2 && player.countCards("h") > 1) {
							return "recover_hp";
						} else {
							return "draw_card";
						}
					});
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
						if (player.num("h") > player.hp) return 1;
						if (jlsg.hasLoseHandcardEffective(player)) return 2;
						return -1;
					},
					target: function (player, target) {
						if (jlsg.isWeak(target)) return 5;
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
				if (!player.isLinked()) return false;
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
				const { result } = await player.choosePlayerCard("将目标的一张牌置于牌堆顶", target, "ej", true);
				if (!result.bool || !result.links?.length) return;
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
						if (card.name == "tiesuo") return 0.5;
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
						const { result } = await player
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
							});
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
				if (!event.player) return -1;
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
				if (event.player.hasSkill("kuangfeng2") && game.hasNature(event, "fire")) return 10;
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
			trigger: { global: "judge" },
			check: function (event, player) {
				const judge = event.judge(event.player.judging[0]);
				if (get.attitude(player, event.player) < 0) {
					return judge > 0;
				}
				if (get.attitude(player, event.player) > 0) {
					return judge < 0;
				}
				return 0;
			},
			async content(event, trigger, player) {
				let str = `${get.translation(trigger.player)}的${trigger.judgestr || ""}判定为
						${get.translation(trigger.player.judging[0])}，打出一张手牌代替之或亮出牌顶的一张牌代替之`;
				const { result } = await player
					.chooseCard(str, "h")
					.set("filterCard", (card, player, event) => {
						const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
						if (mod2 != "unchanged") return mod2;
						const mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
						if (mod != "unchanged") return mod;
						return true;
					})
					.set("ai", function (card) {
						const trigger = get.event().getParent().getTrigger();
						const player = get.player(),
							judging = _status.event.judging,
							result = trigger.judge(card) - trigger.judge(judging);
						const attitude = get.attitude(player, trigger.player);
						if (attitude == 0 || result == 0) {
							return 0;
						}
						if (attitude > 0) {
							return result - get.value(card) / 2;
						} else {
							return -result - get.value(card) / 2;
						}
					})
					.set("judging", trigger.player.judging[0]);
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
			trigger: {
				player: "damageEnd",
				source: "damageSource",
			},
			filter: function (event, player) {
				const target = lib.skill.jlsg_langgu.logTarget(event, player);
				if (!target?.isIn()) {
					return false;
				}
				return target.countGainableCards(player, "he");
			},
			check: function (event, player) {
				const target = lib.skill.jlsg_langgu.logTarget(event, player);
				if (target == player && !player.getVEquips("baiyin").length) {
					return false;
				}
				return get.effect(target, { name: "shunshou_copy2" }, player, player) > 0;
			},
			logTarget(event, player) {
				if (event.source == event.player) {
					return player;
				} else if (event.source == player) {
					return event.player;
				}
				return event.source;
			},
			async content(event, trigger, player) {
				const target = lib.skill.jlsg_langgu.logTarget(trigger, player);
				const { result } = await player
					.judge(function (card) {
						if (get.color(card, get.player()) == "black") {
							return 2;
						}
						return -2;
					})
					.set("judge2", result => result.bool);
				if (result.bool && target.countGainableCards(player, "he")) {
					await player.gainPlayerCard(target, "he", true);
				}
			},
			ai: {
				expose: 0.2,
				maixie_defend: true,
				effect: {
					target(card, player, target) {
						if (player.countCards("he") > 1 && get.tag(card, "damage")) {
							if (player.hasSkillTag("jueqing", false, target)) return [1, -1.5];
							if (get.attitude(target, player) < 0) return [1, 1];
						}
					},
				},
			},
		},
		jlsg_zhuizun: {
			audio: "ext:极略/audio/skill:true",
			srlose: true,
			enable: "chooseToUse",
			mark: true,
			intro: {
				content: "limited",
			},
			limited: true,
			skillAnimation: true,
			animationStr: "追尊",
			animationColor: "water",
			filter: function (event, player) {
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
				player.awakenSkill("jlsg_zhuizun");
				await player.recoverTo(1);
				const targets = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
				player.line(targets);
				for (const target of targets) {
					if (!target?.isIn()) {
						continue;
					}
					await target.chooseToGive("选择一张手牌交给" + get.translation(player), player, true, "h");
				}
				player.insertPhase("jlsg_zhuizun");
			},
			ai: {
				order: 1,
				threaten: function (player, target) {
					if (!target.storage.jlsg_zhuizun) return 0.6;
				},
				save: true,
				skillTagFilter: function (player) {
					if (player.storage.jlsg_zhuizun) return false;
					if (player.hp > 0) return false;
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
						if (get.event("check")) {
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
				const { result: judge } = await player.judge(card => {
					if (get.color(card) == "red") {
						if (get.player().canMoveCard(true)) {
							return 2;
						}
						return 0;
					}
					return 2;
				});
				if (judge.bool) {
					if (judge.color == "red") {
						await player.moveCard();
					} else {
						const { result } = await player.chooseTarget("选择一名目标对其造成1点伤害，然后摸一张牌。", true).set("ai", function (target) {
							const player = get.player();
							return get.damageEffect(target, player, player) + 1;
						});
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
			audio: "ext:极略/audio/skill:true",
			srlose: true,
			enable: "phaseUse",
			usable: 1,
			filterCard() {
				return true;
			},
			selectCard() {
				return get.select(Math.max(0, Math.min(1, _status.event.player.countCards("h") - 1)));
			},
			check(card) {
				const player = get.player();
				if (player.countCards("h") > player.maxHp) return 0;
				if (get.name(card) != "sha") return 0;
				return player.getUseValue(card, false);
			},
			discard: false,
			lose: false,
			prompt: "选择保留的手牌",
			async content(event, _, player) {
				if (event.cards?.length) {
					await player.discard(player.getCards("h").removeArray(event.cards));
				} else if (!player.countCards("h")) {
					await player.draw(1);
				}
				player.addTempSkill("jlsg_jiwu_damage");
				player.addTempSkill("jlsg_jiwu_buff");
			},
			mod: {
				selectTarget: function (card, player, range) {
					if (card.name != "sha") return;
					if (range[1] == -1) return;
					if (player.countCards("e")) {
						if (!card.cards || player.countCards("e", eCard => !card.cards.includes(eCard))) {
							return;
						}
					}
					range[1] += 2;
				},
			},
			subSkill: {
				damage: {
					audio: "ext:极略/audio/skill:true",
					trigger: { source: "damageBegin1" },
					filter: function (event) {
						return event.card?.name == "sha";
					},
					forced: true,
					charlotte: true,
					async content(event, trigger, player) {
						trigger.num++;
						player.removeSkill(event.name);
					},
				},
				buff: {
					charlotte: true,
					mod: {
						attackRangeBase: function (player, num) {
							return Infinity;
						},
					},
				},
			},
			ai: {
				order: function () {
					return lib.card.sha.ai.order + 0.1;
				},
				result: {
					player: function (player, target) {
						if (player.countCards("h") == 0) {
							return 1;
						}
						if (player.hasSkill("jiu") || player.hasSkill("tianxianjiu")) {
							return 3;
						}
						return 4 - player.countCards("h");
					},
				},
				effect: {
					target: function (card, player, target) {
						if (get.subtype(card) == "equip1") {
							let num = 0;
							for (let i = 0; i < game.players.length; i++) {
								if (get.attitude(player, game.players[i]) < 0) {
									num++;
									if (num > 1) {
										return [0, 0, 0, 0];
									}
								}
							}
						}
					},
				},
			},
		},
		jlsg_sheji: {
			audio: "ext:极略/audio/skill:true",
			srlose: true,
			trigger: { global: "damageSource" },
			filter: function (event, player) {
				return player.countDiscardableCards(player, "he") && event.source && event.source.getEquips(1).length && event.source != player;
			},
			async cost(event, trigger, player) {
				let prompt = "弃置一张牌，然后",
					cards = trigger.source.getEquips(1).filter(card => {
						return lib.filter.canBeGained(card, player, trigger.source);
					});
				if (cards.length) prompt += "获得" + get.translation(trigger.source) + "装备区中的" + get.translation(cards);
				else prompt += "无事发生";
				event.result = await player
					.chooseToDiscard("he", get.prompt("jlsg_sheji", trigger.source), prompt)
					.set("ai", function (card) {
						let eff = get.event("eff");
						if (typeof eff === "number") return eff - get.value(card);
						return 0;
					})
					.set(
						"eff",
						(function () {
							let es = trigger.source.getEquips(1).filter(card => {
								return lib.filter.canBeGained(card, player, trigger.source);
							});
							if (!es.length) return false;
							if (get.attitude(player, trigger.source) > 0)
								return (
									-2 *
									es.reduce((acc, card) => {
										return acc + get.value(card, trigger.source);
									}, 0)
								);
							return es.reduce((acc, card) => {
								return acc + get.value(card, player);
							}, 0);
						})()
					)
					.forResult();
			},
			logTarget: "source",
			async content(event, trigger, player) {
				const cards = trigger.source.getEquips(1).filter(card => {
					return lib.filter.canBeGained(card, player, trigger.source);
				});
				if (cards.length) {
					await player.gain(cards, trigger.source, "give", "bySelf");
				}
			},
			group: ["jlsg_sheji_sha", "jlsg_sheji_wushuang"],
			subSkill: {
				sha: {
					sub: true,
					sourceSkill: "jlsg_sheji",
					audio: "ext:极略/audio/skill/jlsg_sheji2.mp3",
					enable: ["chooseToUse", "chooseToRespond"],
					filterCard(card, player, event) {
						return get.type(card) == "equip";
					},
					viewAs: { name: "sha" },
					viewAsFilter: function (player) {
						return player.countCards("he", card => get.type(card) == "equip") != 0;
					},
					position: "he",
					prompt: "将一张装备牌当【杀】使用或打出",
					check: function (card) {
						if (get.subtype(card) == "equip1") return 10 - get.value(card);
						return 7 - get.equipValue(card);
					},
					mod: {
						targetInRange: function (card) {
							if (_status.event.skill == "jlsg_sheji_sha") return true;
						},
					},
					ai: {
						order: function () {
							return lib.card.sha.ai.order + 0.1;
						},
						respondSha: true,
						skillTagFilter: function (player) {
							if (!player.countCards("he")) return false;
						},
					},
				},
				wushuang: {
					sub: true,
					sourceSkill: "jlsg_sheji",
					audio: false,
					trigger: { player: "useCardToPlayered" },
					forced: true,
					filter: function (event, player) {
						let skill = get.sourceSkillFor(event);
						return event.card.name == "sha" && !event.getParent().directHit.includes(event.target) && skill == "jlsg_sheji";
					},
					logTarget: "target",
					async content(event, trigger, player) {
						let id = trigger.target.playerid;
						let map = trigger.getParent().customArgs;
						if (!map[id]) map[id] = {};
						if (typeof map[id].shanRequired == "number") {
							map[id].shanRequired++;
						} else {
							map[id].shanRequired = 2;
						}
					},
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
						if (jlsg.needKongcheng(player, true)) return -1;
						return 1;
					},
					target: function (player, target) {
						if (jlsg.needKongcheng(target) && target.countCards("h") == 1) return 5;
						if (target.countCards("h") > target.hp && target.isDamaged()) return 4;
						if (jlsg.isWeak(target)) return 2;
						if (target.isDamaged()) return 1;
						if (!jlsg.hasLoseHandcardEffective(target) && target.isDamaged()) return 1;
						if (target.hp == jlsg.getBestHp(target)) return -0.1;
						if (!target.isDamaged() && jlsg.hasLoseHandcardEffective(target)) return -1;
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
				const { result } = await player.discardPlayerCard(trigger.player, true, "h", trigger.player.countCards("h"));
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
				const { result } = await player
					.choosePlayerCard(target, "h", true, "曼舞")
					.set("prompt2", `请选择${get.translation(target)}要展示的一张手牌`)
					.set("ai", button => {
						const player = get.player(),
							target = get.event("target");
						if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
							const card = button.link;
							if (get.suit(card, target) == "diamond") {
								return get.effect(target, get.autoViewAs({ name: "lebu" }, [card]), target, player);
							}
							return get.value(card, player);
						}
						return get.event().getRand();
					});
				if (!result?.bool || !result?.links?.length) {
					return;
				}
				const card = result.links[0];
				await player.showCards(card);
				if (get.suit(card, target) == "diamond") {
					await target.addJudge("lebu", [card]);
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
				const { result } = await player.chooseCardButton("是否发动【拜月】？", cards).set("ai", button => {
					return get.value(button.link);
				});
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
				const { result: result1 } = await player
					.choosePlayerCard(target, "h", true, "姻盟")
					.set("prompt2", `请选择${get.translation(target)}要展示的一张手牌`)
					.set("ai", button => {
						const player = get.player(),
							target = get.event("target");
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
					});
				if (!result1?.bool || !result1?.links?.length) {
					return;
				}
				const card1 = result1.links[0];
				await player.showCards(card1);
				const { result: result2 } = await player
					.chooseCard(get.translation(target) + "展示的牌是" + get.translation(card1) + ",请选择你展示的牌", true)
					.set("card1", card1)
					.set("ai", function (card) {
						const player = get.player(),
							target = get.event().parent.targets[0],
							card1 = get.event("card1");
						if (get.attitude(player, target) > 0) {
							return get.type2(card1, target) == get.type2(card, player);
						}
						return get.type2(card1, target) != get.type2(card, player);
					});
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
				if (event.player.hasStorage("jlsg_xianger2", player)) return false;
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
						if (!get.event("check")) {
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
				const { result } = await trigger.player
					.chooseBool("是否视为对" + get.translation(player) + "使用一张【杀】")
					.set("source", player)
					.set("ai", function (event, player) {
						const source = get.event("source"),
							sha = get.autoViewAs({ name: "sha" }, []);
						if (get.effect(source, sha, player, player) < 0 && get.attitude(source, player) < 0) {
							return 1;
						}
						if (get.effect(source, sha, player, player) > 0 && get.attitude(source, player) > 0) {
							return 0;
						}
						return 0;
					});
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
				const { result } = await target
					.chooseControl("调整手牌", "对你出杀")
					.set("prompt", prompt)
					.set("source", player)
					.set("ai", function () {
						const player = get.player(),
							source = get.event("source");
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
					});
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
				await player.logSkill("jlsg_fangxin");
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
						if (target.countCards("h") >= 3) {
							return get.attitude(player, target);
						} else if (target.countCards("h") < 2) {
							return -get.attitude(player, target);
						}
						return -get.attitude(player, target);
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
					// judge
					const evt = event.getParent();
					if (!(evt.name == "orderingDiscard" && evt.relatedEvent?.player === player)) {
						return [];
					}
					const relatedEvent = evt.relatedEvent;
					let loses = player
						.getHistory("lose", evt => relatedEvent == (evt.relatedEvent || evt.getParent()))
						.map(evt => {
							const getl = evt.getl(player);
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
					const { result } = await player.chooseBool(`是否继续对${get.translation(target)}发动【舟焰】？`).set("ai", (event, player) => {
						const {
							targets: [target],
						} = event;
						let att = Math.sign(get.attitude(player, target));
						return att * lib.skill.jlsg_zhouyan.ai.result.target(player, target) > 0;
					});
					if (!result.bool) {
						break;
					} else {
						await player.logSkill(event.name, [target]);
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
						if (player == target) return 1;
						if (!lib.card.huogong) return 0;
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
				const { result } = await target.chooseToGive(player, "交给" + get.translation(player) + "一张牌，或展示并获得诈降牌。").set("ai", card => {
					const player = get.player(),
						target = get.event("target");
					const att = get.attitude(player, target);
					if (["sha", "jiu", "tao"].includes(card.name)) {
						return -1;
					}
					let effect = att > 0 ? 0 : get.damageEffect(player, target, player, "fire");
					return -effect - get.value(card, player) + (att / 5) * get.value(card, player) - 2;
				});
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
						if (!ui.selected.cards.length) return 0;
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
				player.addTempSkill("jlsg_shixue_miss", "shaAfter");
			},
			subSkill: {
				miss: {
					sourceSkill: "jlsg_shixue",
					trigger: { player: "shaMiss" },
					charlotte: true,
					forced: true,
					popup: false,
					async content(event, trigger, player) {
						await player.chooseToDiscard(2, true, "he");
						player.removeSkill(event.name);
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
				const { result } = await player
					.chooseCardButton(get.prompt("jlsg_guoshi", trigger.player), cards)
					.set("prompt2", "令其获得一张牌")
					.set("target", trigger.player)
					.set("ai", function (button) {
						const player = get.player(),
							target = get.event("target");
						if (get.attitude(player, target) > 0) {
							return get.value(button.link, target);
						}
						return -get.value(button.link, target);
					});
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
				const { result } = await target.chooseControl("heart2", "diamond2", "club2", "spade2").set("ai", function (event) {
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
				});
				game.log(target, "选择了" + get.translation(result.control));
				const choice = result.control;
				target.popup(choice);
				const { result: draw } = await target.draw(1);
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
					const { result: compare } = await player.chooseToCompare(target);
					if (compare?.bool) {
						if (player.canUse(guohe, target)) {
							await player.useCard(guohe, target);
						}
						const { result } = await player.chooseBool(`是否再次${get.translation(target)}对发动〖劫袭〗?`).set("ai", (event, player) => {
							const {
								targets: [target],
							} = event;
							let att = Math.sign(get.attitude(player, target));
							return att * lib.skill.jlsg_jiexi.ai.result.target(player, target) > 0;
						});
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
								if (target.hp == 1 && !target.hujia) return 1.6;
								if (target.hp == 2) return 0.01;
								return 0;
							}
						}
						const es = target.getCards("e");
						const noe = es.length == 0 || target.hasSkillTag("noe");
						const noe2 = es.length == 1 && es[0].name == "baiyin" && target.isDamaged();
						const noh = nh == 0 || target.hasSkillTag("noh");
						if (noh && (noe || noe2)) return 0;
						if (att <= 0 && !target.countCards("he")) return 1.5;
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
				if (event.player == player) return false;
				if (event.getParent().triggeredTargets3.length > 1) return false;
				if (get.type(event.card) != "trick") return false;
				if (get.info(event.card).multitarget) return false;
				if (event.targets.length < 2) return false;
				if (!player.isTurnedOver()) return false;
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
				const { result } = await player
					.chooseToDiscard("he")
					.set("prompt2", `或点「取消」，令你与${get.translation(target)}各摸一张牌`)
					.set("ai", card => {
						const player = get.player(),
							target = get.event("target");
						let unusefulness = get.unuseful(card);
						const att = get.attitude(player, target);
						if (-2 < att && att < 2) return -1;
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
					.set("target", target);
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
				await player.logSkill("jlsg_youdi");
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
						if (!event.respondTo) {
							return false;
						}
						return get.name(event.respondTo[1], false) == "sha";
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseToDiscard(get.prompt("jlsg_youdi", trigger.player), [1, Infinity])
							.set("chooseonly", true)
							.set("ai", card => (get.event("check") ? 4 - get.value(card) : 0))
							.set(
								"check",
								(function () {
									return get.attitude(player, trigger.player) <= 0;
								})()
							)
							.forResult();
						if (event.result?.bool) {
							event.result.targets = [trigger.player];
						}
					},
					async content(event, trigger, player) {
						await player.discard(event.cards);
						await trigger.player.chooseToDiscard(event.cards.length, "he", true);
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
						if (player.countCards("h") != 1) return false;
					}
				},
				effect: {
					player_use(card, player, target) {
						if (player.countCards("h") === 1) return [1, 0.8];
					},
					target(card, player, target) {
						if (get.tag(card, "loseCard") && target.countCards("h") === 1) return 0.5;
					},
				},
			},
		},
		jlsg_quanheng: {
			srlose: true,
			audio: "ext:极略/audio/skill:1",
			enable: "phaseUse",
			usable: 1,
			filter: function (event, player) {
				return player.countCards("h") > 0;
			},
			chooseButton: {
				dialog: function () {
					let list = [
						["trick", "", "wuzhong"],
						["basic", "", "sha"],
					];
					return ui.create.dialog("权衡", [list, "vcard"]);
				},
				filter(button, player) {
					return lib.filter.filterCard({ name: button.link[2] }, player, get.event().getParent());
				},
				check(button) {
					const player = get.player();
					let shaTarget = false;
					const sha = get.autoViewAs({ name: "sha" }, "unsure");
					for (let i = 0; i < game.players.length; i++) {
						if (player.getUseValue(sha)) {
							shaTarget = true;
						}
					}
					if (shaTarget && !player.countCards("h", "sha")) {
						return button.link[2] == "sha" ? 1 : -1;
					}
					const hs = player.getCards("h");
					for (var i = 0; i < hs.length; i++) {
						if (5 - get.value(hs[i])) {
							return button.link[2] == "wuzhong" ? 1 : -1;
						}
					}
					return 0;
				},
				backup(links, player) {
					return {
						filterCard: true,
						selectCard: [1, Infinity],
						audio: "jlsg_quanheng",
						popname: true,
						position: "hs",
						ai1(card) {
							if (ui.selected.cards.length > 0) return -1;
							return 5 - get.value(card);
						},
						viewAs: { name: links[0][2] },
						onuse(result, player) {
							const id = get.id();
							result.card.cardid = id;
							player.logSkill("jlsg_quanheng");
							player
								.when({
									player: ["shaMiss", "useCardAfter"],
									global: "eventNeutralized",
								})
								.filter((evt, player, name) => {
									if (name == "eventNeutralized") {
										if (evt.type != "card" && evt.name != "_wuxie") {
											return false;
										}
									}
									return evt.card.cardid == id;
								})
								.step(async function (event, trigger, player) {
									if (event.triggername != "useCardAfter") {
										let num = trigger.cards?.length;
										if (!num) {
											num = trigger.card.cards.length;
										}
										await player.draw(num);
									}
								});
						},
					};
				},
				prompt: function (links, player) {
					return "至少一张手牌当" + get.translation(links[0][2]) + "使用";
				},
			},
			subSkill: {
				backup: {},
			},
			ai: {
				order: 8,
				result: {
					player: 1,
				},
			},
		},
		jlsg_xionglve: {
			audio: "ext:极略/audio/skill:1",
			srlose: true,
			marktext: "略",
			trigger: { player: "phaseDrawBegin1" },
			filter(event, player) {
				return !event.numFixed && event.num > 0;
			},
			check: function (event, player) {
				if (player.skipList.includes("phaseUse")) return 1;
				return player.getExpansions("jlsg_xionglve").length <= 3;
			},
			async content(event, trigger, player) {
				trigger.changeToZero();
				const cards = get.cards(2);
				await game.cardsGotoOrdering(cards);
				await player.showCards(cards);
				const { result } = await player.chooseCardButton("雄略：选择一张牌置入手牌", cards, true);
				if (result.bool) {
					const card = result.links[0];
					await player.gain(card, "gain2");
					cards.remove(card);
					if (cards.length) {
						const next = player.addToExpansion(cards);
						next.gaintag.add(event.name);
						await next;
					}
				}
			},
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
			group: ["jlsg_xionglve2"],
		},
		jlsg_xionglve2: {
			audio: "ext:极略/audio/skill:1",
			enable: "phaseUse",
			filter: function (event, player) {
				return player.getExpansions("jlsg_xionglve").length > 0;
			},
			chooseButton: {
				dialog: function (event, player) {
					return ui.create.dialog("雄略", player.getExpansions("jlsg_xionglve"), "hidden");
				},
				check: function (button) {
					var player = _status.event.player;
					var type = get.type(button.link, "trick");
					var recover = 0,
						lose = 1;
					for (var i = 0; i < game.players.length; i++) {
						if (!game.players[i].isOut()) {
							if (game.players[i].hp < game.players[i].maxHp) {
								if (get.attitude(player, game.players[i]) > 0) {
									if (game.players[i].hp < 2) {
										lose--;
										recover += 0.5;
									}
									lose--;
									recover++;
								} else if (get.attitude(player, game.players[i]) < 0) {
									if (game.players[i].hp < 2) {
										lose++;
										recover -= 0.5;
									}
									lose++;
									recover--;
								}
							} else {
								if (get.attitude(player, game.players[i]) > 0) {
									lose--;
								} else if (get.attitude(player, game.players[i]) < 0) {
									lose++;
								}
							}
						}
					}
					var equipTarget = false;
					var shaTarget = false;
					var shunTarget = false;
					var chaiTarget = false;
					for (var i = 0; i < game.players.length; i++) {
						if (get.attitude(player, game.players[i]) > 0) {
							if (player != game.players[i] && !game.players[i].get("e", { subtype: get.subtype(button.link) })[0] && get.attitude(player, game.players[i]) > 0) {
								equipTarget = true;
							}
						}
						if (player.canUse("shunshou", game.players[i]) && get.effect(game.players[i], { name: "shunshou" }, player)) {
							shunTarget = true;
						}
						if (player.canUse("guohe", game.players[i]) && get.effect(game.players[i], { name: "guohe" }, player) >= 0) {
							chaiTarget = true;
						}
						if (player.canUse("sha", game.players[i]) && get.effect(game.players[i], { name: "sha" }, player) > 0) {
							shaTarget = true;
						}
					}
					if (player.isDamaged()) return type == "basic" ? 2 : -1;
					if (shaTarget && player.countCards("h", "sha") && !player.countCards("h", "jiu")) return type == "basic" ? 1 : -1;
					if (lose > recover && lose > 0) return type == "trick" ? 1 : -1;
					if (lose < recover && recover > 0) return type == "trick" ? 1 : -1;
					if (equipTarget) return type == "equip" ? 1 : -1;
					if (shunTarget || chaiTarget) return type == "trick" ? 1 : -1;
					if (shaTarget && !player.countCards("h", "sha")) return type == "basic" ? 1 : -1;
					return 0;
				},
				backup: function (links, player) {
					if (get.type(links[0], "trick") == "trick") {
						return {
							cards: links,
							chooseButton: {
								dialog: function () {
									var list = [];
									for (var i of lib.inpile) {
										if (!lib.translate[i + "_info"]) continue;
										// if (lib.card[i].mode && lib.card[i].mode.includes(lib.config.mode) == false) continue;
										if (lib.card[i].type == "trick") list.push(["锦囊", "", i]);
									}
									return ui.create.dialog("雄略:请选择想要使用的锦囊牌", [list, "vcard"]);
								},
								filter: function (button, player) {
									return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
								},
								check: function (button) {
									var player = _status.event.player;
									var recover = 0,
										lose = 1;
									for (var i = 0; i < game.players.length; i++) {
										if (!game.players[i].isOut()) {
											if (game.players[i].hp < game.players[i].maxHp) {
												if (get.attitude(player, game.players[i]) > 0) {
													if (game.players[i].hp < 2) {
														lose--;
														recover += 0.5;
													}
													lose--;
													recover++;
												} else if (get.attitude(player, game.players[i]) < 0) {
													if (game.players[i].hp < 2) {
														lose++;
														recover -= 0.5;
													}
													lose++;
													recover--;
												}
											} else {
												if (get.attitude(player, game.players[i]) > 0) {
													lose--;
												} else if (get.attitude(player, game.players[i]) < 0) {
													lose++;
												}
											}
										}
									}
									var shunTarget = false;
									var chaiTarget = false;
									for (var i = 0; i < game.players.length; i++) {
										if (player.canUse("shunshou", game.players[i]) && get.effect(game.players[i], { name: "shunshou" }, player)) {
											shunTarget = true;
										}
										if (player.canUse("guohe", game.players[i]) && get.effect(game.players[i], { name: "guohe" }, player) >= 0) {
											chaiTarget = true;
										}
									}
									if (lose > recover && lose > 0) return button.link[2] == "nanman" ? 1 : -1;
									if (lose < recover && recover > 0) return button.link[2] == "taoyuan" ? 1 : -1;
									if (shunTarget) return button.link[2] == "shunshou" ? 1 : -1;
									if (chaiTarget) return button.link[2] == "guohe" ? 1 : -1;
									return button.link[2] == "wuzhong" ? 1 : -1;
								},
								backup: function (links, player) {
									return {
										filterCard: function () {
											return false;
										},
										selectCard: -1,
										popname: true,
										viewAs: { name: links[0][2] },
										onuse: function (result, player) {
											result.cards = lib.skill.jlsg_xionglve2_backup.cards;
											var card = result.cards[0];
											player.logSkill("jlsg_xionglve2", result.targets);
										},
									};
								},
								prompt: function (links, player) {
									return "将一张雄略牌当" + get.translation(links[0][2]) + "使用";
								},
							},
						};
					} else if (get.type(links[0], "trick") == "basic") {
						return {
							cards: links,
							chooseButton: {
								dialog: function () {
									var list = [];
									for (var i of lib.inpile) {
										if (!lib.translate[i + "_info"]) continue;
										// if (lib.card[i].mode && lib.card[i].mode.includes(lib.config.mode) == false) continue;
										if (lib.card[i].type == "basic") list.push(["basic", "", i]);
									}
									return ui.create.dialog("雄略:请选择想要使用的基本牌", [list, "vcard"]);
								},
								filter: function (button, player) {
									return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
								},
								check: function (button) {
									var player = _status.event.player;
									var shaTarget = false;
									for (var i = 0; i < game.players.length; i++) {
										if (player.canUse("sha", game.players[i]) && get.effect(game.players[i], { name: "sha" }, player) > 0) {
											shaTarget = true;
										}
									}
									if (player.isDamaged()) return button.link[2] == "tao" ? 1 : -1;
									if (shaTarget && player.countCards("h", "sha") && !player.countCards("h", "jiu")) return button.link[2] == "jiu" ? 1 : -1;
									if (shaTarget && !player.countCards("h", "sha")) return button.link[2] == "sha" ? 1 : -1;
									return button.link[2] == "sha" ? 1 : -1;
								},
								backup: function (links, player) {
									return {
										filterCard: function () {
											return false;
										},
										selectCard: -1,
										audio: "ext:极略/audio/skill:1",
										popname: true,
										viewAs: { name: links[0][2] },
										onuse: function (result, player) {
											result.cards = lib.skill.jlsg_xionglve2_backup.cards;
											var card = result.cards[0];
											player.logSkill("jlsg_xionglve2", result.targets);
										},
									};
								},
								prompt: function (links, player) {
									return "将一张雄略牌当" + get.translation(links[0][2]) + "使用";
								},
							},
						};
					} else {
						return {
							direct: true,
							cards: links,
							filterTarget: function (card, player, target) {
								var cards = lib.skill.jlsg_xionglve2_backup.cards;
								return player != target && !target.get("e", get.subtype(cards[0])[5]);
							},
							filterCard: function () {
								return false;
							},
							selectCard: -1,
							prepare: function (cards, player, targets) {
								var cards = lib.skill.jlsg_xionglve2_backup.cards;
								player.$give(cards[0], targets[0], false);
							},
							ai2: function (target) {
								return get.attitude(_status.event.player, target) + 10;
							},
							content: function () {
								event.cards = lib.skill.jlsg_xionglve2_backup.cards;
								var card = event.cards[0];
								player.logSkill("jlsg_xionglve2", target);
								if (get.type(card) == "equip") {
									target.equip(card);
								} else {
									player.discard(card);
									target.draw();
								}
							},
						};
					}
				},
			},
			ai: {
				order: 6,
				result: {
					player: function (player) {
						if (player.hp <= 2) return 3;
						return player.getExpansions("jlsg_xionglve").length - 1;
					},
				},
			},
		},
		jlsg_fuzheng: {
			audio: "ext:极略/audio/skill:1",
			zhuSkill: true,
			trigger: { player: "phaseZhunbeiBegin" },
			filter(event, player) {
				if (!player.hasZhuSkill("jlsg_fuzheng")) return false;
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
						if (target.countCards("h")) return att;
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
					const { result } = await target.chooseCard("h", true, "选择一张手牌置于牌堆顶");
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
					const { result } = await player
						.chooseBool(`是否对${get.translation(_status.currentPhase)}使用一张无视防具的杀？`)
						.set("card", sha)
						.set("ai", (event, player) => {
							const card = get.event("card");
							return get.effect(_status.currentPhase, card, player, player) > 0;
						});
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
				if (evt.player != player && !evt.targets.includes(player)) return false;
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
							return get.event("targets").includes(target) && target.countDiscardableCards(player, "he");
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
					if (!split[suit]) split[suit] = [];
					split[suit].push(card);
				}
				const controlList = [];
				for (const suit in split) {
					if (split[suit].length) controlList.push(lib.translate[suit]);
				}
				const {
					result: { control: suit },
				} = await player
					.chooseControl(controlList, "cancel2")
					.set("dialog", ["是否发动【蓄劲】？选择一种花色的牌交给一名角色。", cards])
					.set("split", split)
					.set("ai", function () {
						const splitValue = {};
						for (const suit in get.event("split")) {
							splitValue[suit] = split[suit].reduce((v, b) => v + get.value(b, player), 0);
						}
						if (Object.keys(splitValue).some(suit => splitValue[suit] > 10)) {
							let suit = Object.keys(splitValue).reduce((a, b) => (splitValue[a] > splitValue[b] ? a : b));
							return lib.translate[suit];
						} else {
							return "cancel2";
						}
					});
				if (!suit || suit == "cancel2") {
					return;
				}
				trigger.changeToZero();
				let gain = [];
				for (const suitx in split) {
					if (lib.translate[suitx] == suit) gain = split[suitx];
				}
				const { result } = await player
					.chooseTarget("选择获得卡牌的目标", true)
					.set("ai,", target => {
						const player = get.player();
						return get.attitude(player, target) * get.value(get.event("cards"));
					})
					.set("cards", gain);
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
							if (card.name == "sha") return num + player.storage.jlsg_xujin_effect - 1;
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
				const { result } = await player.chooseToUse("蓄劲：请使用一张【杀】").set("filterCard", (card, player, event) => {
					return get.name(card, player) == "sha";
				});
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
				const { result } = await trigger.target
					.chooseToDiscard("请弃置一张装备牌，否则不能使用闪抵消此杀", "he")
					.set("filterCard", (card, player) => get.type(card) == "equip")
					.set("ai", card => {
						const player = get.player();
						const num = player.countCards("h", card => {
							return player.canRespond(get.event().getParent("useCard"), card);
						});
						if (num == 0) return 0;
						return 8 - get.value(card);
					});
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
				const { result } = await player.chooseToCompare(target);
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
						if (player.countCards("h", "sha") > 0) return 0.6;
						const num = player.countCards("h");
						if (num > player.hp) return 0;
						if (num == 1) return -2;
						if (num == 2) return -1;
						return -0.7;
					},
					target(player, target) {
						const num = target.countCards("h");
						if (num == 1) return -1;
						if (num == 2) return -0.7;
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
						const { result } = await player.chooseCardButton("请弃置一张「酒」，该伤害+1点", true, player.getExpansions("jlsg_wenjiu")).set("ai", function (button) {
							if (get.attitude(player, trigger.target) < 0) return 1;
							return 0;
						});
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
				const { result } = await target
					.chooseToDiscard(`请弃置一张${get.translation(suit + "2")}牌，否则失去1点体力`)
					.set("suit", suit)
					.set("filterCard", (card, player) => get.suit(card, player) == get.event("suit"))
					.set("ai", card => {
						const player = get.player();
						if (player.hasSkillTag("maihp") && (player.hp > 2 || player.hasCard("tao", "h"))) {
							return -1;
						}
						return 7.9 - get.value(card);
					});
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
			enable: "phaseUse",
			usable: 1,
			filter(event, player) {
				return game.players.length >= 3;
			},
			filterTarget(card, player, target) {
				return target != player && target.countDiscardableCards(player, "he");
			},
			targetprompt: ["先出杀", "对你出杀"],
			selectTarget: 2,
			multitarget: true,
			async content(event, trigger, player) {
				const {
					targets: [target1, target2],
				} = event;
				const { result: result1 } = await target1
					.chooseToUse(`######请对${get.translation(target2)}使用一张【杀】，否则${get.translation(player)}弃置你一张牌`)
					.set("target2", target2)
					.set("filterCard", (card, player) => get.name(card, player) == "sha")
					.set("filterTarget", (card, player, target) => target == get.event("target2"));
				if (!result1?.bool) {
					await player.discardPlayerCard("he", target1);
				}
				const { result: result2 } = await target2
					.chooseToUse(`######请对${get.translation(player)}使用一张【杀】，否则其弃置你一张牌`)
					.set("source", player)
					.set("filterCard", (card, player) => get.name(card, player) == "sha")
					.set("filterTarget", (card, player, target) => target == get.event("source"));
				if (!result2?.bool) {
					await player.discardPlayerCard("he", target2);
				}
			},
			ai: {
				order: 8,
				result: {
					target: -3,
				},
				expose: 0.4,
				threaten: 3,
			},
		},
		jlsg_guanxing: {
			audio: "ext:极略/audio/skill:1",
			srlose: true,
			trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
			frequent: true,
			async content(event, trigger, player) {
				let num = Math.min(3, game.countPlayer());
				await player.chooseToGuanxing(num);
			},
			ai: {
				threaten: 1.2,
			},
		},
		jlsg_weiwo: {
			audio: "ext:极略/audio/skill:1",
			srlose: true,
			mark: true,
			intro: {
				content: function (storage, player) {
					var str = "";
					if (player.countCards("h")) {
						str += "防止属性伤害";
					} else {
						str += "防止非属性伤害";
					}
					return str;
				},
			},
			trigger: { player: "damageBegin4" },
			filter(event, player) {
				if (event.hasNature() && player.countCards("h")) {
					return true;
				}
				if (!event.hasNature() && !player.countCards("h")) {
					return true;
				}
				return false;
			},
			forced: true,
			async content(event, trigger, player) {
				trigger.cancel();
			},
			ai: {
				nofire: true,
				nothunder: true,
				skillTagFilter(player, tag, arg) {
					if (tag == "nofire") {
						return player.countCards("h");
					} else if (tag == "nothunder") {
						return player.countCards("h");
					}
				},
				effect: {
					target(card, player, target, current) {
						if (get.tag(card, "natureDamage") && target.countCards("h") > 0) {
							return 0;
						} else if (card.name == "tiesuo" && target.countCards("h") > 0) {
							return [0, 0];
						} else if (!get.tag(card, "natureDamage") && !target.countCards("h")) {
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
							target = get.event("targetx");
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
						if (!player.countCards("hs", { suit: "heart" })) return false;
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
						if (!player.countCards("hs", { suit: "diamond" })) return false;
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
						if (!player.countCards("hs", { suit: "club" })) return false;
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
						if (!player.countCards("hs", { suit: "spade" })) return false;
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
			trigger: { player: "loseAfter", global: "loseAsyncAfter" },
			filter(event, player) {
				let evt = event.getl?.(player);
				return evt?.hs?.length;
			},
			frequent: true,
			async content(event, trigger, player) {
				const { result } = await player
					.judge(function (card) {
						if (get.color(card) == "red") return 2;
						return -2;
					})
					.set("judge2", result => result.bool);
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
						if (card.name == "guohe" || card.name == "liuxinghuoyu") return 0.3;
					},
				},
			},
		},
		jlsg_rende: {
			audio: "ext:极略/audio/skill:1",
			srlose: true,
			trigger: { global: "phaseJieshuBegin" },
			filter(event, player) {
				return event.player.isAlive();
			},
			async content(event, trigger, player) {
				const upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {};
				let name = "jlsgsr_liubei";
				let improve = name in upgrade && upgrade[name][2];
				let num = improve ? 3 : 2;
				await player.draw(num);
				let result = await player
					.chooseCard("交给" + get.translation(trigger.player) + get.cnNumber(num) + "张牌", [num, num])
					.set("filterCard", (card, player, event) => lib.filter.canBeGained(card, get.event("source"), player, event))
					.set("ai", card => {
						const player = get.player(),
							source = get.event("source");
						if (player == source) {
							return 6;
						}
						if (get.attitude(player, source) > 1) {
							if (source.countUsed("sha") > 0 && ["sha", "jiu"].includes(card.name)) {
								return 6.5 - get.value(card);
							}
							let skills = source.getSkills(false);
							for (let i = 0; i < skills.length; i++) {
								let info = get.info(skills[i]);
								if (info && info.enable == "phaseUse" && ui.selected.cards.length == 0) {
									return 6.6 - get.value(card);
								}
							}
							return 4 - get.value(card);
						}
						return get.value(card) < 0;
					})
					.set("forced", true)
					.set("source", trigger.player)
					.forResult();
				if (!result.bool) {
					return;
				}
				if (trigger.player != player) await player.give(result.cards, trigger.player);
				trigger.player.addGaintag(result.cards, "jlsg_rende");
				await game.delay();
				const phase = trigger.getParent("phase", true);
				if (improve) {
					trigger.player.addTempSkill("jlsg_rende_effect", { player: "phaseUseEnd" });
					trigger.player.when({ player: "phaseUseEnd" }).then(() => player.removeGaintag("jlsg_rende"));
				}
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
					mod: {
						cardUsable: function (card, player, num) {
							if (card?.cards?.some(i => i.hasGaintag("jlsg_rende"))) return Infinity;
						},
						targetInRange: function (card, player, target, now) {
							if (card?.cards?.some(i => i.hasGaintag("jlsg_rende"))) return true;
						},
					},
				},
			},
		},
		jlsg_chouxi: {
			audio: "ext:极略/audio/skill:2",
			srlose: true,
			enable: "phaseUse",
			filter(event, player) {
				return game.hasPlayer(current => current != player && !player.storage.jlsg_chouxi?.includes(current));
			},
			filterTarget(card, player, target) {
				return player != target && !player.storage.jlsg_chouxi?.includes(target) && target.countCards("h");
			},
			async content(event, trigger, player) {
				const target = event.targets[0];
				const upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {};
				let name = "jlsgsr_liubei";
				let improve = name in upgrade && upgrade[name][2];
				let num = improve ? 3 : 2;
				let result = await player.gainPlayerCard(target, [1, num], false).forResult();
				if (!result.bool || !result?.cards?.length) {
					return;
				}
				num = result.cards.length;
				let type = [];
				result.cards.forEach(card => {
					if (!type.includes(get.type(card, "trick"))) type.push(get.type(card, "trick"));
				});
				player.markAuto("jlsg_chouxi", [target]);
				player.when({ player: "phaseUseEnd" }).then(() => delete player.storage.jlsg_chouxi);
				let next = await player
					.chooseCard("交给" + get.translation(target) + get.cnNumber(num) + "张牌", [num, num])
					.set("filterCard", (card, player, event) => lib.filter.canBeGained(card, get.event("source"), player, event))
					.set("ai", card => {
						const player = get.player(),
							source = get.event("source");
						if (player == source) {
							return 6;
						}
						if (get.attitude(player, source) > 1) {
							if (source.countUsed("sha") > 0 && ["sha", "jiu"].includes(card.name)) {
								return 6.5 - get.value(card);
							}
							let skills = source.getSkills(false);
							for (let i = 0; i < skills.length; i++) {
								let info = get.info(skills[i]);
								if (info && info.enable == "phaseUse" && ui.selected.cards.length == 0) {
									return 6.6 - get.value(card);
								}
							}
							return 4 - get.value(card);
						}
						return get.value(card) < 0;
					})
					.set("forced", true)
					.set("source", target)
					.forResult();
				if (!next.bool) {
					return;
				}
				await player.give(next.cards, target);
				let type2 = [];
				next.cards.forEach(card => {
					if (!type2.includes(get.type(card, "trick"))) type2.push(get.type(card, "trick"));
				});
				if (type.length == type2.length) return;
				num = Math.abs(type.length - type2.length);
				let next2 = await player
					.chooseBool("是否对" + get.translation(target) + "造成" + get.cnNumber(num) + "点伤害？")
					.set("ai", () => -1 * get.attitude(player, target))
					.forResult();
				if (next2.bool) await target.damage(num, player);
			},
			ai: {
				order: 4,
				result: {
					player: 0.5,
					target: -1,
				},
			},
		},
		jlsg_zhaoxiang: {
			srlose: true,
			audio: "ext:极略/audio/skill:1",
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
				event.result = await player
					.gainPlayerCard(get.prompt2("jlsg_zhaoxiang", trigger.player), trigger.player, "h")
					.set("ai", button => {
						if (get.event("check")) return get.event().getRand(button.link.cardid.toString());
						return 0;
					})
					.set(
						"check",
						(function () {
							const gainEff = get.effect(trigger.player, { name: "shunshou_copy2" }, player, player),
								resultList = lib.skill.jlsg_zhaoxiang.getCheck(trigger, player, _status._jlsgsr_upgrade?.[player.playerid]?.["jlsgsr_caocao"]?.[2]);
							return resultList.some(i => i + gainEff > 0);
						})()
					)
					.set("logSkill", ["jlsg_zhaoxiang", trigger.player])
					.set("chooseonly", true)
					.forResult();
				if (event.result?.bool) {
					event.result.skill_popup = false;
					event.result.targets = [trigger.player];
				}
			},
			async content(event, trigger, player) {
				const {
					cards,
					targets: [target],
				} = event;
				await player.gain(cards, target).set("ainimate", false);
				const choiceList = ["令此【杀】不能被响应", "令此【杀】无效", "将此【杀】的目标改为你"],
					choiced = player.getStorage(event.name, [true, true, true]),
					list = [];
				if (_status._jlsgsr_upgrade?.[player.playerid]?.["jlsgsr_caocao"]?.[2] && choiced.length < 4) {
					choiceList.add("令目标角色于此【杀】结算后回复1点体力");
					choiced.push(true);
				}
				for (let i in choiced) {
					if (!choiced[i]) {
						choiceList[i] = '<span style="opacity:0.5">' + choiceList[i] + "</span>";
					} else {
						list.add(`选项${get.cnNumber(Number(i) + 1, true)}`);
					}
				}
				const { result } = await player
					.chooseControl(list)
					.set("prompt", "招降")
					.set("choiceList", choiceList)
					.set("ai", () => get.event("choice"))
					.set(
						"choice",
						(function () {
							const resultList = lib.skill.jlsg_zhaoxiang.getCheck(trigger, player, _status._jlsgsr_upgrade?.[player.playerid]?.["jlsgsr_caocao"]?.[2]);
							let max = 0,
								choice = 0;
							for (let i in choiced) {
								if (choiced[i]) {
									if (resultList[i] > max) {
										max = resultList[i];
										choice = i;
									}
								}
							}
							return `选项${get.cnNumber(choice + 1, true)}`;
						})()
					);
				if (result) {
					game.log(player, "选择了", result.control);
					let map = Array.from({ length: 4 }, (v, i) => `选项${get.cnNumber(Number(i) + 1, true)}`);
					let num = map.indexOf(result.control);
					console.log(choiced.slice());
					choiced[num] = false;
					console.log(choiced.slice());
					if (!choiced.filter(i => i).length) {
						for (let i in choiced) {
							choiced[i] = true;
						}
					}
					player.setStorage(event.name, choiced);
				}
				if (result?.control == "选项一") {
					game.log(player, "令", trigger.card, "不能被响应");
					trigger.getParent().directHit.addArray(game.players);
				} else if (result?.control == "选项二") {
					game.log(player, "令", trigger.player, "使用的", trigger.card, "无效");
					trigger.getParent().all_excluded = true;
				} else if (result?.control == "选项三") {
					game.log(player, "将", trigger.card, "的目标", trigger.target, "改为", player);
					trigger.targets.remove(trigger.target);
					trigger.targets.add(player);
					trigger.getParent().triggeredTargets1.remove(trigger.target);
					trigger.getParent().triggeredTargets1.add(player);
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
				return result.slice(1, -1);
			},
			ai: {
				expose: 0.5,
			},
		},
		jlsg_zhishi: {
			srlose: true,
			audio: "ext:极略/audio/skill:2",
			trigger: { global: "damageEnd" },
			filter(event, player) {
				return event.num > 0 && event.player.isIn();
			},
			prompt(event, player) {
				return get.prompt("jlsg_zhishi", event.player);
			},
			prompt2(event, player) {
				let num = _status._jlsgsr_upgrade?.[player.playerid]?.["jlsgsr_caocao"]?.[2] ? "三" : "两";
				return `令其从随机${num}个能在此时机发动的技能中选择一个并发动`;
			},
			check(event, player) {
				return get.attitude(player, event.player) > 0;
			},
			logTarget: "player",
			async content(event, trigger, player) {
				if (!_status.characterlist) {
					game.initCharactertList();
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
					max = _status._jlsgsr_upgrade?.[player.playerid]?.["jlsgsr_caocao"]?.[2] ? 2 : 1;
				allList.randomSort();
				for (const name of allList) {
					if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1) continue;
					const skills2 = get.character(name).skills || [];
					for (const skill of skills2) {
						if (skills.includes(skill)) {
							continue;
						}
						const list = [skill];
						game.expandSkills(list);
						for (const skill2 of list) {
							const info = lib.skill[skill2];
							if (get.is.zhuanhuanji(skill2, trigger.player)) continue;
							if (!info || !info.trigger || !info.trigger.player || info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || (info.zhuSkill && !trigger.player.isZhu2())) {
								continue;
							}
							if (info.trigger.player == "damageEnd" || (Array.isArray(info.trigger.player) && info.trigger.player.includes("damageEnd"))) {
								if (info.ai && ((info.ai.combo && !trigger.player.hasSkill(info.ai.combo)) || info.ai.notemp || info.ai.neg)) continue;
								if (info.init) continue;
								if (info.filter) {
									let indexedData;
									if (typeof info.getIndex === "function") {
										indexedData = info.getIndex(trigger, trigger.player, "damageEnd");
										if (Array.isArray(indexedData)) {
											if (
												!indexedData.some(target => {
													try {
														const bool = info.filter(trigger, trigger.player, "damageEnd", target);
														if (bool) return true;
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
												if (!bool) continue;
											} catch (e) {
												continue;
											}
										}
									} else {
										try {
											const bool = info.filter(trigger, trigger.player, "damageEnd", true);
											if (!bool) continue;
										} catch (e) {
											continue;
										}
									}
								}
								skills.add(skill);
								if (skills.length > 1) break;
							}
						}
					}
					if (skills.length > max) break;
				}
				if (!skills.length) {
					return;
				}
				const buttons = skills.map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(i) + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
				const { result } = await trigger.player.chooseButton(true, ["选择要发动的技能", [buttons, "textbutton"]]).set("ai", button => get.skillRank(button.link, "out"));
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
					const {
						result: { bool },
					} = await player.chooseBool(prompt, get.attitude(player, trigger.player) >= 6);
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
						if (type != "basic") continue;
						list.push([type, "", i]);
						if (i == "sha") {
							for (var j of lib.inpile_nature) list.push([type, "", i, j]);
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
							await player.logSkill("jlsg_zhonghou");
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
	},
	translate: {
		jlsg_sr: "SR武将",
		jlsgsr_choice: "抉择",
		jlsgsr_zhangliao: "SR张辽",
		jlsgsr_xiahoudun: "SR夏侯惇",
		jlsgsr_zhenji: "SR甄姬",
		jlsgsr_xuzhu: "SR许褚",
		jlsgsr_simayi: "SR司马懿",
		jlsgsr_guojia: "SR郭嘉",
		jlsgsr_caocao: "SR曹操",
		jlsgsr_zhaoyun: "SR赵云",
		jlsgsr_zhangfei: "SR张飞",
		jlsgsr_machao: "SR马超",
		jlsgsr_guanyu: "SR关羽",
		jlsgsr_zhugeliang: "SR诸葛亮",
		jlsgsr_huangyueying: "SR黄月英",
		jlsgsr_liubei: "SR刘备",
		jlsgsr_sunshangxiang: "SR孙尚香",
		jlsgsr_daqiao: "SR大乔",
		jlsgsr_huanggai: "SR黄盖",
		jlsgsr_lvmeng: "SR吕蒙",
		jlsgsr_zhouyu: "SR周瑜",
		jlsgsr_ganning: "SR甘宁",
		jlsgsr_luxun: "SR陆逊",
		jlsgsr_sunquan: "SR孙权",
		jlsgsr_lvbu: "SR吕布",
		jlsgsr_huatuo: "SR华佗",
		jlsgsr_diaochan: "SR貂蝉",
		jlsgsr_shuangxiong: "SR颜良文丑",

		jlsg_wuwei: "无畏",
		jlsg_yansha: "掩杀",
		zh_mark: "忠候",
		jlsg_zhonghou: "忠侯",
		jlsg_zhonghou_global: "忠侯",
		jlsg_ganglie: "刚烈",
		jlsg_liuyun: "流云",
		jlsg_lingbo: "凌波",
		jlsg_aozhan: "鏖战",
		jlsg_huxiao: "虎啸",
		jlsg_qingcheng: "倾城",
		jlsg_guicai: "鬼才",
		jlsg_langgu: "狼顾",
		jlsg_zhuizun: "追尊",
		jlsg_tianshang: "天殇",
		jlsg_yiji: "遗计",
		jlsg_huiqu: "慧觑",
		jlsg_zhaoxiang: "招降",
		jlsg_zhishi: "治世",
		jlsg_jianxiong: "奸雄",
		jlsg_jianxiong2: "奸雄",
		jlsg_jiuzhu: "救主",
		jlsg_tuwei: "突围",
		jlsg_xujin: "蓄劲",
		jlsg_paoxiao: "咆哮",
		jlsg_benxi: "奔袭",
		jlsg_yaozhan: "邀战",
		jlsg_wenjiu: "温酒",
		jlsg_shuixi: "水袭",
		jlsg_sanfen: "三分",
		jlsg_guanxing: "观星",
		jlsg_weiwo: "帷幄",
		jlsg_shouji: "授计",
		jlsg_hemou: "合谋",
		jlsg_qicai: "奇才",
		jlsg_rende: "仁德",
		jlsg_chouxi: "仇袭",
		jlsg_yongbing: "拥兵",
		jlsg_yongbing2: "拥兵",
		jlsg_yinmeng: "姻盟",
		jlsg_xianger: "香饵",
		jlsg_xianger2: "香饵·标记",
		jlsg_juelie: "决裂",
		jlsg_fangxin: "芳馨",
		jlsg_xiyu: "细语",
		jlsg_wanrou: "婉柔",
		jlsg_zhouyan: "舟焰",
		jlsg_zhaxiang: "诈降",
		jlsg_shixue: "誓学",
		jlsg_guoshi: "国士",
		jlsg_yingcai: "英才",
		jlsg_weibao: "伪报",
		jlsg_choulve: "筹略",
		jlsg_jiexi: "劫袭",
		jlsg_youxia: "游侠",
		jlsg_huailing: "怀铃",
		jlsg_dailao: "待劳",
		jlsg_youdi: "诱敌",
		jlsg_ruya: "儒雅",
		jlsg_quanheng: "权衡",
		jlsg_xionglve: "雄略",
		jlsg_xionglve2: "雄略",
		jlsg_xionglve2_backup: "雄略",
		jlsg_fuzheng: "辅政",
		jlsg_jiwu: "极武",
		jlsg_jiwu2: "极武",
		jlsg_jiwu3: "极武",
		jlsg_jiwu4: "极武",
		jlsg_sheji: "射戟",
		jlsg_sheji2: "射戟",
		jlsg_xingyi: "行医",
		jlsg_guagu: "刮骨",
		jlsg_wuqin: "五禽",
		jlsg_lijian: "离间",
		jlsg_manwu: "曼舞",
		jlsg_baiyue: "拜月",
		jlsg_xiwu: "习武",
		jlsg_wuwei_info: "摸牌阶段，你可以放弃摸牌，改为亮出牌堆顶的3张牌，其中每有一张基本牌，你便可弃置之视为对一名其他角色使用一张【杀】(每阶段对每名角色限一次)。然后获得剩余牌。",
		jlsg_yansha_info: "摸牌阶段，你可以少摸一张牌。若如此做，本回合弃牌阶段开始时，你可以将一张手牌置于武将牌上，称为「掩」。当一名其他角色使用【杀】选择目标后，你可以将一张「掩」置入弃牌堆，然后获得其两张牌。",
		jlsg_zhonghou_info: "当你攻击范围内的一名角色需要使用或打出一张基本牌时，该角色可以向你请求之，你可以失去1点体力，视为该角色使用此牌；若你拒绝，则取消此次响应。（你的濒死阶段除外）",
		jlsg_zhonghou_append: '<span style="font-family: yuanli">一名其他角色被你拒绝后，其本回合内不能再次发动忠候。你不能拒绝自己请求的忠候。</span>',
		jlsg_liuyun_info: "出牌阶段限一次，你可以横置你的武将牌并弃置一张黑色牌，然后令一名角色选择一项：回复1点体力，或摸两张牌。",
		jlsg_lingbo_info: "一名角色的准备阶段，你可以重置你的武将牌，然后将场上的一张牌置于牌堆顶。",
		jlsg_qingcheng_info: "你可以横置你的武将牌，视为你使用或打出一张【杀】；你可以重置你的武将牌，视为你使用或打出一张【闪】。",
		jlsg_aozhan_info: "每当你因【杀】或【决斗】造成或受到1点伤害后，你可将牌堆顶的一张牌置于你的武将牌上，称为「战」。出牌阶段限一次，你可以选择一项：1、将所有「战」收入手牌。2、弃置所有「战」，然后摸等量的牌。",
		jlsg_huxiao_info: "出牌阶段，当你使用【杀】造成伤害时，若你的武将牌正面向上，你可以令此伤害+1并摸一张牌。若如此做，则此【杀】结算完毕后，将你的武将牌翻面并结束当前回合。",
		jlsg_guicai_info: "在任意角色的判定牌生效前，你可以选择一项：1、打出一张手牌代替之。2、亮出牌堆顶的一张牌代替之。",
		jlsg_langgu_info: "每当你造成或受到一次伤害后，你可以进行一次判定，若为黑色，你获得对方一张牌。",
		jlsg_zhuizun_info: "限定技，当你进入濒死状态时，你可以恢复体力至1点，令所有其他角色依次交给你一张手牌。然后当前回合结束后，你进行1个额外的回合。",
		jlsg_tianshang_info: "限定技，你死亡时，可令一名其他角色获得你此武将牌上拥有的其他技能，然后其增加1点体力上限并恢复1点体力。",
		jlsg_yiji_info: "每当你受到一点伤害，可以观看牌堆顶的两张牌，并将其交给任意1~2名角色。",
		jlsg_huiqu_info: "准备阶段，你可以弃置一张手牌进行一次判定，若结果为红色，你将场上的一张牌移动到一个合理的位置；若结果为黑色，你对一名角色造成1点伤害，然后你摸一张牌。",
		jlsg_zhaoxiang_info: "当其他角色使用【杀】指定目标时，你可以获得其一张手牌，然后选择未执行过的一项：1．令此【杀】不能被响应；2．令此【杀】无效；2．将此【杀】的目标改为你。当所有选项执行后，重置此技能",
		jlsg_zhishi_info: "当任意角色受到伤害后，你可以令其从随机两个能在此时机发动的技能中选择一个并发动。",
		jlsg_jianxiong_info: "主公技。每当其他魏势力受到不为你的一次伤害后，该角色可以弃置一张手牌，然后令你获得对其造成伤害的牌。",
		jlsg_jiuzhu_info: "每当一张非转化的【闪】进入弃牌堆时，你可以用一张不为【闪】的牌替换之。若此时不是你的回合，你可以视为对当前回合角色使用一张无视防具的【杀】。",
		jlsg_tuwei_info: "每当一张非转化的【杀】进入弃牌堆时，若你是此【杀】的目标或使用者，你可以弃置一张伤害牌，然后弃置此牌目标或使用者的共计两张牌。",
		jlsg_xujin_info: "摸牌阶段开始时，你展示牌堆顶的五张牌，然后，你可以放弃摸牌并将其中一种花色的牌交给一名角色，令你本回合的攻击范围和可以使用的【杀】数量与以此法被获得的牌的数量相同。否则你将展示的牌置入弃牌堆。",
		jlsg_paoxiao_info: "出牌阶段，当你使用【杀】对目标角色造成一次伤害并结算完毕后，你可以摸一张牌，然后选择一项：使用一张无视距离的【杀】，或令该角色弃置你的一张牌。",
		jlsg_benxi_info: "锁定技，你计算与其他角色的距离时始终-1.你使用【杀】指定目标后，目标角色须弃置一张装备牌，否则此【杀】不可被【闪】响应。",
		jlsg_yaozhan_info: "出牌阶段限一次，你可以与一名其他角色拼点：若你赢，你摸一张牌并视为对其使用一张【杀】（此【杀】不计入每回合的使用限制）；若你没赢，该角色可以对你使用一张【杀】。",
		jlsg_wenjiu_info: "出牌阶段限一次，你可以将一张黑色手牌置于你的武将牌上，称为「酒」。当你使用【杀】选择目标后，你可以将一张「酒」置入弃牌堆，然后当此【杀】造成伤害时，该伤害+1；当此【杀】被【闪】响应后，你摸一张牌。",
		jlsg_shuixi_info: "准备阶段开始时，你可以展示一张手牌并选择一名其他角色，令其选择一项：弃置一张与之相同花色的手牌，或失去1点体力。若该角色因此法失去体力，则此回合的出牌阶段，你不能使用【杀】。",
		jlsg_sanfen_info: "出牌阶段限一次，你可以选择两名其他角色，其中一名你选择的角色须对另一名角色使用一张【杀】，然后另一名角色须对你使用一张【杀】，你弃置不如此做者一张牌。（有距离限制）",
		jlsg_guanxing_info: "回合开始/结束阶段开始时，你可以观看牌堆顶的X张牌（X为存活角色的数量，且最多为3），将其中任意数量的牌以任意顺序置于牌堆顶，其余以任意顺序置于牌堆底。",
		jlsg_weiwo_info: "锁定技，当你有手牌时，你防止受到的属性伤害；当你没有手牌时，你防止受到的非属性伤害。",
		jlsg_shouji_info: "出牌阶段限一次，你可以弃置一张牌并选择两名角色，然后根据你弃置牌的花色，视为其中一名角色对另一名角色使用一张牌：黑桃【决斗】，梅花【借刀杀人】，红桃【顺手牵羊】，方片【火攻】。",
		jlsg_hemou_info: "其他角色的出牌阶段开始时，你可以将一张手牌正面朝上交给该角色，该角色本阶段限一次，可将一张与之相同花色的手牌按下列规则使用：黑桃【决斗】，梅花【借刀杀人】，红桃【顺手牵羊】，方片【火攻】。",
		jlsg_qicai_info: "每当你失去手牌时，你可以进行判定，若结果为红色，你摸一张牌。",
		jlsg_rende_info: "任意角色的回合结束阶段，你可以摸两张牌，然后将等量的牌交给该角色，若如此做，该角色于本阶段结束后执行一个额外出牌阶段。",
		jlsg_chouxi_info: "出牌阶段对每名角色限一次，你可以获得一名其他角色至多两张牌，然后交给其等量的牌，若如此做，你可以对其造成X点伤害（X为你以此法获得的牌与给出的牌的类别数之差）。",
		jlsg_yinmeng_info: "出牌阶段限X次，若你有手牌，你可以展示一名其他男性角色的一张手牌，然后展示你的一张手牌，若两张牌类型相同，你与其各摸一张牌；若不同，你弃置其展示的牌，X为你所损失的体力且至少为1",
		jlsg_xiwu_info: "当你使用的【杀】被目标角色的【闪】响应后，你可以摸一张牌，然后弃置其一张手牌。",
		jlsg_juelie_info: "出牌阶段限一次，你可以令一名手牌数与你不同的其他角色选择一项：将手牌数调整至与你相等；或视为你对其使用一张【杀】（不计入出牌阶段的使用限制）。",
		jlsg_xianger_info: "一名其他男性角色的回合开始时，你可以交给其两张基本牌。若如此做，该角色跳过出牌阶段，然后可以视为对你使用一张【杀】，否则下回合的出牌阶段受到你的1点伤害；若其在此阶段未造成伤害，则跳过弃牌阶段，且你摸一张牌。",
		jlsg_fangxin_info: "当你需要使用一张【桃】时，你可以将一张梅花牌当【兵粮寸断】或将一张方片牌当【乐不思蜀】对自己使用，若如此做，视为你使用了一张【桃】。",
		jlsg_xiyu_info: "你的回合开始时，你可以弃置一名角色的一张牌，然后该角色进行一个额外的出牌阶段。",
		jlsg_wanrou_info: "你的方片牌或你判定区的牌进入弃牌堆时，你可以令一名角色摸一张牌。",
		jlsg_zhouyan_info: "出牌阶段，你可以令一名角色摸一张牌，若如此做，视为你对其使用一张【火攻】，你可以重复此流程直到你以此法未造成伤害。每当你使用【火攻】造成一次伤害后，你可以摸一张牌。",
		jlsg_zhaxiang_info: "出牌阶段，你可以将一张手牌扣置，然后令一名其它角色选择一项：交给你一张牌并弃置你扣置的牌；或展示你扣置的牌并获得之。若你扣置的牌为【杀】，则视为你对其使用一张火属性的【杀】（不计入出牌阶段的使用限制且不可被响应）。",
		jlsg_shixue_info: "当你使用【杀】指定目标后，你可以摸两张牌；若如此做，当此【杀】被【闪】响应后，你须弃置两张牌。",
		jlsg_guoshi_info: "任一角色的准备阶段开始时，你可以观看牌堆顶的两张牌，然后可将其中任意张牌置于牌堆底。一名角色的准备阶段开始时，你可以令其获得本回合因弃置或判定进入弃牌堆的一张牌。",
		jlsg_yingcai_info: "摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的一张牌，你重复此流程直到你展示出第3种花色的牌时，将这张牌置入弃牌堆，然后获得其余的牌。",
		jlsg_weibao_info: "出牌阶段限一次，你可以将一张手牌置于牌堆顶，然后令一名其他角色选择一种花色后摸一张牌并展示之，若此牌与所选花色不同，你对其造成一点伤害。",
		jlsg_choulve_info: "出牌阶段限一次，你可以交给两名其他角色各一张手牌，然后依次展示之，点数较大的一方视为对另一方使用一张【杀】。该【杀】造成伤害后，你摸一张牌。",
		jlsg_jiexi_info: "出牌阶段，你可以与一名其他角色拼点，若你赢，视为对其使用一张【过河拆桥】。你可重复此流程直到你以此法拼点没赢。",
		jlsg_youxia_info: "出牌阶段，若你的武将牌正面朝上，你可以将你的武将牌翻面，然后从一至两名其他角色处各获得一张牌；锁定技，若你的武将牌背面朝上，你不能成为【杀】和【决斗】的目标。",
		jlsg_huailing_info: "若你的武将牌背面朝上，其他角色使用一张锦囊牌指定大于一个目标时，你可以令一名其他角色不受到该牌的效果，然后你将武将牌正面朝上；锁定技，若你的武将牌背面朝上，你不能成为【决斗】和【过河拆桥】的目标。",
		jlsg_dailao_info: "出牌阶段限一次，你可以令一名其他角色与你将武将牌翻面，然后你选择与其各摸一张牌或各弃置一张牌。",
		jlsg_youdi_info: "若你的武将牌背面朝上，你可以将其翻面来视为你使用一张【闪】。每当你使用【闪】响应一名角色使用的【杀】时，你可以弃置至多X张牌，然后该角色弃置等量的牌（X为该角色的牌数）。",
		jlsg_ruya_info: "当你失去最后的手牌时，你可以翻面并将手牌补至你体力上限的张数。",
		jlsg_quanheng_info: "出牌阶段限一次，你可以将至少一张手牌当【无中生有】或【杀】使用，若你以此法使用的牌被【无懈可击】或【闪】响应时，你摸等量的牌。",
		jlsg_xionglve_info: "摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的两张牌，你获得其中一张牌，然后将另一张牌置于你的武将牌上，称为「略」。出牌阶段，你可以将一张基本牌或锦囊牌的「略」当与之同类别的任意一张牌（延时类锦囊牌除外）使用，将一张装备牌的「略」置于一名其他角色装备区内的相应位置。",
		jlsg_fuzheng_info: "主公技，准备阶段开始时，你可以令至多两名其他吴势力角色各摸一张牌，然后这些角色依次将一张手牌置于牌堆顶。",
		jlsg_jiwu_info: "出牌阶段限一次，你可以将你的手牌调整至一张，若如此做，本回合你的攻击范围无限，且你下一次使用的【杀】造成的伤害+1。锁定技，若你的装备区没有牌，你使用【杀】可以额外指定至多两名目标。",
		jlsg_sheji_info: "当一名装备区有武器牌的其他角色对另一名角色造成伤害后，你可以弃置一张牌，然后获得该角色的武器牌。你可以将装备牌当无距离限制的【杀】使用或打出，你以此法使用的【杀】须连续使用两张【闪】才能抵消。",
		jlsg_xingyi_info: "出牌阶段限一次，你可以获得一名有手牌的其他角色一张手牌，然后令其恢复1点体力。",
		jlsg_guagu_info: "当一名角色进入濒死状态时，你可以弃置其所有手牌（至少一张），然后该角色恢复1点体力。若你以此法弃置其两张或更多的手牌，该角色摸一张牌。",
		jlsg_wuqin_info: "结束阶段，你可以弃置一张基本牌，然后摸两张牌并进行一个额外的出牌阶段。",
		jlsg_lijian_info: "出牌阶段限一次，你可以弃一张牌并选择两名其他男性角色。若如此做，视为其中一名男性角色对另一名男性角色使用一张【决斗】(该【决斗】不可被【无懈可击】响应)。",
		jlsg_manwu_info: "出牌阶段限一次，你可以展示一名男性角色的一张手牌，若此牌为方片，将之置于该角色的判定区内，视为【乐不思蜀】；若不为方片，你获得之。",
		jlsg_baiyue_info: "准备阶段开始时，你可以获得本回合其他角色进入弃牌堆的一张牌。",
		jlsg_ganglie_info: "出牌阶段开始时，你可以失去1点体力，若如此做，你本回合下一次造成的伤害+1。且本回合你每造成1点伤害，回合结束时你便摸一张牌",
	},
	dynamicTranslate: {
		jlsg_rende(player) {
			const upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {};
			let name = "jlsgsr_liubei";
			let improve = name in upgrade && upgrade[name][2];
			if (improve) return "任意角色的回合结束阶段，你可以摸三张牌，然后将等量的牌交给该角色，若如此做，该角色于本阶段结束后执行一个额外出牌阶段，该角色于此额外出牌阶段使用以此法获得的牌无距离和次数限制。";
			else return get.translation("jlsg_rende_info");
		},
		jlsg_chouxi(player) {
			const upgrade = _status._jlsgsr_upgrade?.[player.playerid] || {};
			let name = "jlsgsr_liubei";
			let improve = name in upgrade && upgrade[name][2];
			if (improve) return "出牌阶段每名角色限一次，你可以获得一名其他角色至多三张牌，然后交给其等量的牌，若如此做，你可以对其造成X点伤害（X为你以此法获得的牌与给出的牌的类别数之差）。";
			else return get.translation("jlsg_chouxi_info");
		},
	},
	dynamicTranslate: {
		jlsg_zhaoxiang(player) {
			const upgrade = _status._jlsgsr_upgrade?.[player?.playerid] || {};
			if (upgrade["jlsgsr_caocao"]?.[2]) {
				return "当其他角色使用【杀】指定目标时，你可以获得其一张手牌，然后选择未执行过的一项：1．令此【杀】不能被响应；2．令此【杀】无效；3．将此【杀】的目标改为你；4．令目标角色于此【杀】结算后回复1点体力。当所有选项执行后，重置此技能";
			}
			return lib.translate.jlsg_zhaoxiang_info;
		},
		jlsg_zhishi(player) {
			const upgrade = _status._jlsgsr_upgrade?.[player?.playerid] || {};
			if (upgrade["jlsgsr_caocao"]?.[2]) {
				return "当任意角色受到伤害后，你可以令其从随机三个能在此时机发动的技能中选择一个并发动。";
			}
			return lib.translate.jlsg_zhishi_info;
		},
	},
};
