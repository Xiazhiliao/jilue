import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsr_caocao: {
		1: {
			skill: {
				jlsg_zhaoxiang: {
					audio: "ext:极略/audio/skill:1",
					srlose: true,
					trigger: { global: "shaBegin" },
					filter: function (event, player) {
						return event.player != player;
					},
					direct: true,
					content: function () {
						"step 0";
						if (trigger.player.inRangeOf(player)) {
							var next = player.chooseBool(get.prompt("jlsg_zhaoxiang", trigger.player));
							next.ai = function () {
								return get.effect(trigger.target, trigger.card, trigger.player, player) < 0;
							};
						} else {
							if (!player.countDiscardableCards(player, "h")) {
								event.finish();
								return;
							}
							var next = player.chooseToDiscard(get.prompt("jlsg_zhaoxiang", trigger.player));
							next.ai = function (card) {
								const player = get.player(),
									trigger = get.event().getTrigger();
								var income = Math.min(-get.effect(trigger.target, trigger.card, trigger.player, player) * 1.5, get.effect(trigger.player, { name: "shunshou_copy2" }, player, player) / 1.5);
								return income - get.value(card);
							};
							next.logSkill = ["jlsg_zhaoxiang", trigger.player];
						}
						"step 1"
						if (result.bool) {
							if (!result.cards) {
								player.logSkill("jlsg_zhaoxiang", trigger.player);
							}
							if (trigger.player.countCards("he")) {
								trigger.player
									.chooseBool("令" + get.translation(player) + "获得你的一张牌或令打出的杀无效")
									.set("ai", function (event, player) {
										const trigger = event.getTrigger(),
											source = get.event("source");
										let num = trigger.targets.reduce((n, target) => n + get.effect(target, trigger.card, player, player), 0);
										return get.effect(player, { name: "shunshou_copy2" }, source, player) < num;
									})
									.set("source", player);
							} else {
								trigger.untrigger();
								trigger.finish();
								event.finish();
							}
						} else {
							event.finish();
						}
						"step 2"
						if (!result.bool) {
							trigger.untrigger();
							trigger.finish();
						} else {
							player.gainPlayerCard(trigger.player, true);
						}
					},
					ai: {
						expose: 0.5,
					},
				},
				jlsg_zhishi: {
					audio: "ext:极略/audio/skill:2",
					srlose: true,
					enable: "phaseUse",
					usable: 1,
					filter: function (event, player) {
						return player.countCards("h", "sha") || player.countCards("h", "shan");
					},
					filterCard: function (card) {
						return card.name == "sha" || card.name == "shan";
					},
					prompt: "选择一张【杀】或【闪】，并且选择一名有手牌的其他角色，发动【治世】。",
					filterTarget: function (card, player, target) {
						return target != player && target.countCards("h");
					},
					discard: false,
					lose: false,
					content: function () {
						"step 0";
						player.showCards(cards[0]);
						var nono = false;
						if (ai.get.damageEffect(target, player, player)) nono = true;
						if (cards[0].name == "sha") {
							target
								.chooseToDiscard("请弃置一张【杀】，令" + get.translation(target) + "恢复1点体力，否则你受到1点伤害", { name: "sha" })
								.set("ai", function () {
									if (_status.nono == true) return false;
									return true;
								})
								.set("nono", nono);
						}
						if (cards[0].name == "shan") {
							target
								.chooseCard("请展示一张【闪】，令" + get.translation(target) + "恢复1点体力，否则你受到1点伤害", "h", function (card, player, target) {
									return get.name(card) == "shan";
								})
								.set("ai", function () {
									if (_status.nono == true) return false;
									return true;
								})
								.set("nono", nono);
						}
						"step 1"
						if (cards[0].name == "shan" && result.cards) {
							target.showCards(result.cards[0]);
						}
						"step 2"
						if (result.bool) {
							player.recover();
							target.recover();
						} else {
							target.damage(player);
						}
					},
					ai: {
						basic: {
							order: 7,
						},
						result: {
							player: function (player) {
								return 1;
							},
							target: function (player, target) {
								return get.damageEffect(target, player, player);
							},
						},
					},
				},
			},
			translate: {
				jlsg_zhaoxiang_info: "当一名其他角色使用【杀】指定目标后，你可以令其选择一项：1、交给你一张牌。2、令此【杀】对该目标无效；若其或【杀】的目标在你的攻击范围内，你须先弃置一张手牌。",

				jlsg_zhishi_info: "出牌阶段限一次，你可以指定一名有手牌的其他角色，你选择其中一项执行：1.你展示一张【杀】令其弃置一张【杀】，若其执行，你与其恢复1点体力，否则你对其造成1点伤害；2.你展示一张【闪】令其弃置一张【闪】，若其执行，你与其恢复1点体力，否则你对其造成1点伤害。",
			},
		},
		2: {
			skill: {
				jlsg_zhaoxiang: {
					audio: "ext:极略/audio/skill:1",
					srlose: true,
					trigger: { global: "shaBegin" },
					filter: function (event, player) {
						return event.player != player;
					},
					direct: true,
					content: function () {
						"step 0";
						if (trigger.player.inRangeOf(player)) {
							var next = player.chooseBool(get.prompt("jlsg_zhaoxiang", trigger.player));
							next.ai = function () {
								return get.effect(trigger.target, trigger.card, trigger.player, player) < 0;
							};
						} else {
							if (!player.countDiscardableCards(player, "h")) {
								event.finish();
								return;
							}
							var next = player.chooseToDiscard(get.prompt("jlsg_zhaoxiang", trigger.player));
							next.ai = function (card) {
								const player = get.player(),
									trigger = get.event().getTrigger();
								var income = Math.min(-get.effect(trigger.target, trigger.card, trigger.player, player) * 1.5, get.effect(trigger.player, { name: "shunshou_copy2" }, player, player) / 1.5);
								return income - get.value(card);
							};
							next.logSkill = ["jlsg_zhaoxiang", trigger.player];
						}
						"step 1"
						if (result.bool) {
							if (!result.cards) {
								player.logSkill("jlsg_zhaoxiang", trigger.player);
							}
							if (trigger.player.countCards("he")) {
								trigger.player
									.chooseBool("令" + get.translation(player) + "获得你的一张牌或令打出的杀无效")
									.set("ai", function (event, player) {
										const trigger = event.getTrigger(),
											source = get.event("source");
										let num = trigger.targets.reduce((n, target) => n + get.effect(target, trigger.card, player, player), 0);
										return get.effect(player, { name: "shunshou_copy2" }, source, player) < num;
									})
									.set("source", player);
							} else {
								trigger.untrigger();
								trigger.finish();
								event.finish();
							}
						} else {
							event.finish();
						}
						"step 2"
						if (!result.bool) {
							trigger.untrigger();
							trigger.finish();
						} else {
							player.gainPlayerCard(trigger.player, true);
						}
					},
					ai: {
						expose: 0.5,
					},
				},
				jlsg_zhishi: {
					audio: "ext:极略/audio/skill:2",
					srlose: true,
					enable: "phaseUse",
					usable: 1,
					filterTarget: function (card, player, target) {
						return player != target;
					},
					content: function () {
						"step 0";
						if (!target.countDiscardableCards(target, "h")) {
							target.damage(player);
							target.recover();
							event.finish();
							return;
						}
						target.chooseToDiscard("弃置一张基本牌，并回复一点体力。或受到一点伤害并回复一点体力。", { type: "basic" }).ai = function (card) {
							if (target.hasSkillTag("maixie") && target.hp > 1) return 0;
							if (get.recoverEffect(target, target, target) > 0) return 7.5 - get.value(card);
							return -1;
						};
						"step 1"
						if (result.bool) {
							target.recover();
						} else {
							target.damage(player);
							target.recover();
						}
					},
					ai: {
						order: 8,
						result: {
							target: function (player, target) {
								var result = 0;
								if (target.hasSkillTag("maixie_hp") || target.hasSkillTag("maixie")) result += 0.5;
								if (target.hp == 1 && (target.countCards("h") <= 1 || target.maxHp == 1)) result -= 2;
								if (target.hp < target.maxHp) {
									result += Math.min(0.4, target.countCards("h") * 0.1);
								}
								return result;
							},
						},
					},
				},
			},
			translate: {
				jlsg_zhaoxiang_info: "当一名其他角色使用【杀】指定目标后，你可以令其选择一项：1、交给你一张牌。2、令此【杀】对该目标无效；若其或【杀】的目标在你的攻击范围内，你须先弃置一张手牌。",
				jlsg_zhishi_info: "出牌阶段限一次，你可以令一名其他角色选择一项：1、弃置一张基本牌，然后回复一点体力。2、受到你造成的一点伤害，然后回复一点体力。",
			},
		},
	},
	jlsgsr_guojia: {
		1: {
			skill: {
				jlsg_yiji: {
					audio: "ext:极略/audio/skill:true",
					srlose: true,
					inherit: "yiji",
					getIndex: () => 1,
					async content(event, trigger, player) {
						const { cards } = await game.cardsGotoOrdering(get.cards(2));
						if (_status.connectMode) {
							game.broadcastAll(function () {
								_status.noclearcountdown = true;
							});
						}
						event.given_map = {};
						if (!cards.length) {
							return;
						}
						while (cards.length > 0) {
							const {
								result: { bool, links },
							} =
								cards.length == 1
									? { result: { links: cards.slice(0), bool: true } }
									: await player.chooseCardButton("遗计：请选择要分配的牌", true, cards, [1, cards.length]).set("ai", () => {
											if (ui.selected.buttons.length == 0) {
												return 1;
											}
											return 0;
									  });
							if (!bool) {
								return;
							}
							cards.removeArray(links);
							event.togive = links.slice(0);
							const {
								result: { targets },
							} = await player
								.chooseTarget("选择一名角色获得" + get.translation(links), true)
								.set("ai", target => {
									const att = get.attitude(_status.event.player, target);
									if (_status.event.enemy) {
										return -att;
									} else if (att > 0) {
										return att / (1 + target.countCards("h"));
									} else {
										return att / 100;
									}
								})
								.set("enemy", get.value(event.togive[0], player, "raw") < 0);
							if (targets.length) {
								const id = targets[0].playerid,
									map = event.given_map;
								if (!map[id]) {
									map[id] = [];
								}
								map[id].addArray(event.togive);
							}
						}
						if (_status.connectMode) {
							game.broadcastAll(function () {
								delete _status.noclearcountdown;
								game.stopCountChoose();
							});
						}
						const list = [];
						for (const i in event.given_map) {
							const source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
							player.line(source, "green");
							if (player !== source && (get.mode() !== "identity" || player.identity !== "nei")) {
								player.addExpose(0.2);
							}
							list.push([source, event.given_map[i]]);
						}
						await game
							.loseAsync({
								gain_list: list,
								giver: player,
								animate: "draw",
							})
							.setContent("gaincardMultiple");
						await game.delay();
						if (list.length == 1) {
							const { result } = await player
								.judge("jlsg_yiji", result => {
									if (result.suit == "heart") {
										return 2;
									}
									return -2;
								})
								.set("judge2", result => result.bool);
							if (result.bool) {
								await player.recover(1);
							}
						}
					},
				},
			},
			translate: {
				jlsg_yiji_info: "当你受到伤害后，可以观看牌堆顶的两张牌，并将其交给任意名角色，若你将所有的牌交给了同一名角色，你进行一次判定：判定牌为红桃，恢复1点体力。",
			},
		},
	},
	jlsgsr_huanggai: {
		1: {
			skill: {
				jlsg_zhaxiang: {
					audio: "ext:极略/audio/skill:true",
					srlose: true,
					enable: "phaseUse",
					usable: 1,
					filter(event, player) {
						let sha = get.autoViewAs({ name: "sha" }, []);
						return game.hasPlayer(current => {
							return current.canUse(sha, player, false, false);
						});
					},
					filterTarget(card, player, target) {
						let sha = get.autoViewAs({ name: "sha" }, []);
						return player != target && target.canUse(sha, player, false, false);
					},
					async content(event, trigger, player) {
						const {
								targets: [target],
							} = event,
							sha = get.autoViewAs({ name: "sha" }, []);
						await target.useCard(sha, player, false, "noai");
						if (!player.isIn()) {
							return;
						}
						await player.draw(2);
						sha.storage = { jlsg_zhaxiang: true };
						if (player.canUse(sha, target, false, false)) {
							await player.useCard(sha, target, false);
						}
					},
					ai: {
						order: 4,
						unequip: true,
						unequip_ai: true,
						skillTagFilter(player, tag, arg) {
							if (tag == "unequip" && arg?.card?.name == "sha" && arg?.card?.storage?.jlsg_zhaxiang) return true;
							return false;
						},
						result: {
							player(player) {
								const sha = get.autoViewAs({ name: "sha" }, []);
								return player.getUseValue(sha, false, false);
							},
							target(player, target) {
								if (!player.hasShan() && player.hp <= 1) {
									return 0;
								}
								return -1;
							},
						},
					},
				},
			},
			translate: {
				jlsg_zhaxiang_info: "出牌阶段限一次，你可以指定一名其它角色，视为该角色对你使用一张【杀】，然后你摸两张牌并视为对其使用一张【杀】（你的此【杀】无视防具）。",
			},
		},
	},
	jlsgsr_ganning: {
		1: {
			skill: {
				jlsg_jiexi: {
					audio: "ext:极略/audio/skill:true",
					srlose: true,
					mod: {
						targetEnabled(card, player, target) {
							if (target.isTurnedOver()) {
								if (card.name == "nanman" || card.name == "shandian") return false;
							}
						},
					},
					enable: "phaseUse",
					filter(event, player) {
						if (!game.hasPlayer(current => player.canCompare(current))) {
							return false;
						}
						return !player.isTurnedOver() && !player.hasSkill("jlsg_jilve_ban");
					},
					filterTarget(card, player, target) {
						return player.canCompare(target);
					},
					async content(event, trigger, player) {
						const target = event.targets[0];
						const { result } = await player.chooseToCompare(target);
						if (result.bool) {
							const guohe = get.autoViewAs({ name: "guohe" }, []);
							if (player.canUse(guohe, target)) {
								await player.useCard(guohe, target);
							}
						} else {
							game.log(player, "#y", "【劫袭】", "本回合失效了");
							player.addTempSkill("jlsg_jilve_ban");
						}
						if (!player.isTurnedOver() && player.countCards("h") < 4) {
							await player.turnOver(true);
							await player.draw();
						}
					},
					subSkill: {
						ban: {
							charlotte: true,
						},
					},
					ai: {
						order: 5,
						result: {
							target(player, target) {
								let att = get.attitude(player, target);
								let nh = target.countCards("h");
								if (att > 0) {
									let js = target.getCards("j");
									if (js.length) {
										let jj = js[0].viewAs ? { name: js[0].viewAs } : js[0];
										if (jj.name == "guohe" || js.length > 1 || get.effect(target, jj, target, player) < 0) {
											return 3;
										}
									}
									if (target.getVEquip("baiyin") && target.isDamaged() && get.recoverEffect(target, player, player) > 0) {
										if (target.hp == 1 && !target.hujia) return 1.6;
										if (target.hp == 2) return 0.01;
										return 0;
									}
								}
								let es = target.getCards("e");
								let noe = es.length == 0 || target.hasSkillTag("noe");
								let noe2 = es.length == 1 && es[0].name == "baiyin" && target.isDamaged();
								let noh = nh == 0 || target.hasSkillTag("noh");
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
					mod: {
						targetEnabled(card, player, target) {
							if (target.isTurnedOver()) {
								if (card.name == "sha" || card.name == "bingliang") return false;
							}
						},
					},
					enable: "phaseUse",
					usable: 1,
					filter(event, player) {
						return game.hasPlayer(current => {
							if (current == player) {
								return false;
							}
							return current.countDiscardableCards(player, "hej");
						});
					},
					selectTarget: [1, 2],
					filterTarget(card, target, player) {
						return player != target && target.countDiscardableCards(player, "hej");
					},
					multitarget: true,
					multiline: true,
					async content(event, trigger, player) {
						await player.turnOver();
						event.targets.sortBySeat();
						for (let target of event.targets) {
							await player.discardPlayerCard("hej", target, true);
						}
					},
					ai: {
						order: 5,
						result: {
							player: -1,
							target(player, target) {
								return get.effect(target, { name: "guohe_copy" }, player, target);
							},
						},
					},
				},
			},
			translate: {
				jlsg_jiexi_info: "若你的武将牌正面朝上，你可以指定一名有手牌的角色进行拼点：若你赢，你视为对其使用一张【过河拆桥】，否则本回合不可发动此技能；锁定技，若你的武将牌正面朝上并触发技能〈劫袭〉后，且你的手牌数小于4时，你将武将牌背面朝上并摸一张牌；若你的武将牌背面朝上，你不能成为【南蛮入侵】和【闪电】的目标。",
				jlsg_youxia_info: "出牌阶段限一次，你可以将你的武将牌翻面，然后从1至2名其他角色的区域各弃置一张牌；锁定技，若你的武将牌背面朝上，你不能成为【杀】和【兵粮寸断】的目标。",
			},
		},
	},
	jlsgsr_luxun: {
		1: {
			skill: {
				jlsg_dailao: {
					audio: "ext:极略/audio/skill:2",
					usable: 1,
					srlose: true,
					enable: "phaseUse",
					filterTarget(cards, target, player) {
						return player != target;
					},
					complexCard: true,
					selectCard: [0, 1],
					filterCard: lib.filter.cardDiscardable,
					position: "he",
					check(card) {
						return 6 - get.value(card);
					},
					async content(event, trigger, player) {
						const {
							cards: [card],
							targets: [target],
						} = event;
						if (!card) {
							await game.asyncDraw([player, target]);
						} else {
							await target.chooseToDiscard("he", true);
						}
						await player.turnOver();
						await target.turnOver();
					},
					ai: {
						order: 9,
						result: {
							player(player) {
								if (ui.selected.cards.length > 0) {
									if (player.isTurnedOver()) return 3;
									if (!player.isTurnedOver()) return -4;
								}
								if (ui.selected.cards.length == 0) {
									if (player.isTurnedOver()) return 4;
									if (!player.isTurnedOver()) return -3;
								}
							},
							target(target, player) {
								if (ui.selected.cards.length > 0) {
									if (target.isTurnedOver()) return 3;
									if (!target.isTurnedOver()) return -4;
								}
								if (ui.selected.cards.length == 0) {
									if (target.isTurnedOver()) return 4;
									if (!target.isTurnedOver()) return -3;
								}
							},
						},
					},
				},
				jlsg_youdi: {
					audio: "ext:极略/audio/skill:true",
					srlose: true,
					enable: ["chooseToRespond", "chooseToUse"],
					viewAs: { name: "shan" },
					viewAsFilter(player) {
						return player.isTurnedOver();
					},
					filterCard() {
						return false;
					},
					selectCard: -1,
					prompt: "将你的武将牌翻面，视为打出一张闪",
					check() {
						return 1;
					},
					onuse(result, player) {
						player.turnOver();
					},
					onrespond(result, player) {
						player.turnOver();
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
								if (event.result.bool) {
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
			},
			translate: {
				jlsg_dailao_info: "出牌阶段限一次，你可以令一名其他角色与你各摸一张牌或各弃置一张牌，然后你与其依次将武将牌翻面。",
				jlsg_youdi_info: "若你的武将牌背面朝上，你可以翻面并视为你使用一张【闪】。你使用【闪】响应一名角色使用的【杀】时，你可以弃置任意数量的手牌，然后该角色弃置等量的牌。",
			},
		},
	},
};
