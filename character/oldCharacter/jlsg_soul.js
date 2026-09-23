import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsoul_caocao: {
		1: {
			skill: {
				jlsg_guixin: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "damageEnd",
					},
					check(event, player) {
						if (player.isTurnedOver()) {
							return true;
						} else if (game.dead.length >= 2) {
							return true;
						}
						const num = game.countPlayer(function (current) {
							if (current === player) {
								return false;
							}
							const att = get.attitude(player, current);
							if (current.hasGainableCards(player, "he") && att <= 0) {
								return true;
							} else if (current.hasGainableCards(player, "j") && att > 0) {
								return true;
							}
							return false;
						});
						return num >= 2;
					},
					async content(event, trigger, player) {
						let num = trigger.num;
						while (num-- > 0) {
							const targets = game.filterPlayer(current => current != player).sortBySeat();
							player.line(targets, "green");
							while (targets.length) {
								const target = targets.shift();
								if (target.hasGainableCards(player, "hej")) {
									await player.gainPlayerCard({
										target,
										position: "hej",
										forced: true,
									});
								}
							}
							if (game.dead.length) {
								await player.draw({ num: game.dead.length });
							}
							await player.turnOver();
							const result = await player
								.chooseBool({
									prompt: get.prompt2(event.name),
									ai(event, player) {
										return get.info(event.name).check(event.getTrigger(), player);
									},
								})
								.forResult();
							if (!result?.bool) {
								break;
							}
							player.logSkill(event.name);
						}
					},
					ai: {
						maixie: true,
						maixie_hp: true,
						threaten(player, target) {
							if (target.hp == 1) {
								return 3;
							}
							return 1;
						},
						effect: {
							target(card, player, target) {
								if (get.tag(card, "damage")) {
									if (player.hasSkillTag("jueqing", false, target)) {
										return [1, -2];
									} else if (target.hp == 1) {
										return 0.8;
									} else if (target.isTurnedOver()) {
										return [0, 3];
									}
									const num = game.countPlayer(function (current) {
										if (current === player) {
											return false;
										}
										const att = get.attitude(player, current);
										if (current.hasGainableCards(player, "he") && att <= 0) {
											return true;
										} else if (current.hasGainableCards(player, "j") && att > 0) {
											return true;
										}
										return false;
									});
									if (num > 2) {
										return [0, 1];
									} else if (num == 2) {
										return [0.5, 1];
									}
								}
							},
						},
					},
				},
				jlsg_feiying: {
					mod: {
						targetInRange(card, player, target, now) {
							if (!player.isTurnedOver() && card.name == "sha") {
								return true;
							}
						},
						targetEnabled(card, player, target, now) {
							if (target.isTurnedOver() && card.name == "sha") {
								return false;
							}
						},
					},
				},
			},
			translate: {
				jlsg_feiying_info: "锁定技，若你的武将牌正面朝上，你使用【杀】无距离限制；若你的武将牌正面朝下，你不能成为【杀】的目标。",
				jlsg_guixin_info: "当你受到一次伤害后，你可以获得每名其他角色区域里的一张牌，再摸X张牌（X为阵亡/败退的角色数），然后翻面。",
			},
		},
	},
	jlsgsoul_dianwei: {
		1: {
			skill: {
				jlsg_zhiji: {
					audio: "ext:极略/audio/skill:2",
					usable: 1,
					enable: "phaseUse",
					filter(event, player) {
						return player.countCards("he", { subtype: "equip1" });
					},
					filterCard(card) {
						return get.subtype(card) == "equip1";
					},
					position: "he",
					selectCard: [1, Infinity],
					filterTarget(card, player, target) {
						return player != target;
					},
					check(card) {
						return 9 - get.value(card);
					},
					async content(event, trigger, player) {
						await event.target.damage({ num: event.cards.length });
					},
					group: ["jlsg_zhiji_damage"],
					subSkill: {
						damage: {
							audio: "ext:极略/audio/skill:true",
							trigger: {
								player: "damageEnd",
							},
							check: () => true,
							async content(event, trigger, player) {
								const fields = ["cardPile", "discardPile"];
								if (event.getRand() > 0.5) {
									fields.reverse();
								}
								while (fields.length) {
									const field = fields.shift();
									const card = get.cardPile(function (card) {
										return get.subtype(card) == "equip1";
									}, field);
									if (card) {
										await player.gain({ cards: [card], animate: "draw2" });
										game.log(player, "从" + (field == "cardPile" ? "" : "弃") + "牌堆获得了", card);
										break;
									}
								}
							},
						},
					},
					ai: {
						order: 10,
						result: {
							target: -1.5,
						},
					},
				},
			},
			translate: {
				jlsg_zhiji_info: "出牌阶段限一次，你可以弃置至少一张武器牌，然后对一名其他角色造成等同于此次弃置武器牌数点伤害。当你受到伤害后，你可以从弃牌堆或牌堆随机获得一张武器牌。",
			},
			info: ["male", "shen", 6, ["jlsg_zhiji"], ["wei"]],
		},
	},
	jlsgsoul_diaochan: {
		1: {
			skill: {
				jlsg_tianzi: {
					srlose: true,
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "phaseDrawBefore",
					},
					filter(event, player) {
						return !event.numFixed;
					},
					check(event, player) {
						return game.countPlayer() - event.num > 1;
					},
					async content(event, trigger, player) {
						trigger.changeToZero();
						const targets = game.filterPlayer(current => current != player).sortBySeat();
						while (targets.length) {
							const target = targets.shift();
							if (!target?.isIn()) {
								continue;
							}
							const result = await target
								.chooseToGive({
									prompt: `交给${get.translation(player)}一张手牌或令其摸一张牌`,
									target: player,
									position: "h",
									ai(card) {
										if (get.event().att > 0) {
											return 0;
										}
										return 3 - get.value(card);
									},
									att: get.attitude(target, player),
								})
								.forResult();
							if (!result?.bool || !result.cards?.length) {
								target.line(player, "green");
								game.log(target, "令", player, "摸了一张牌");
								await player.draw({ source: target });
							}
							await game.delay(0.5);
						}
					},
				},
				jlsg_meixin: {
					audio: "ext:极略/audio/skill:4",
					enable: "phaseUse",
					usable: 1,
					position: "he",
					filterCard: lib.filter.cardDiscardable,
					check(card) {
						return 6 - get.value(card);
					},
					filterTarget(card, player, target) {
						return target !== player && target.hasSex("male");
					},
					async content(event, trigger, player) {
						event.target.markSkillCharacter("jlsg_meixin", player, "魅心", `本阶段当${get.translation(player)}使用一张基本牌后，该你弃置一张牌；当${get.translation(player)}使用一张锦囊牌后，其获得你一张牌；当${get.translation(player)}使用一张装备牌后，其对你造成1点伤害。`);
						player.addTempSkill("jlsg_meixin_effect", ["phaseBeginStart", "phaseAfter", "phaseUseAfter"]);
						player.markAuto(event.name, [event.target]);
					},
					subSkill: {
						effect: {
							onremove(player) {
								const targets = player.getStorage("jlsg_meixin", []);
								player.removeStorage("jlsg_meixin");
								targets.forEach(target => {
									target.unmarkSkill("jlsg_meixin");
								});
							},
							trigger: {
								player: "useCardAfter",
							},
							filter(event, player) {
								const targets = player.getStorage("jlsg_meixin", []).some(target => target.isIn()),
									type = get.type2(event.card);
								if (type === "basic") {
									return targets.some(target => target.hasDiscardableCards(target, "he"));
								} else if (type === "trick") {
									return targets.some(target => target.hasGainableCards(player, "he"));
								}
								return true;
							},
							forced: true,
							async content(event, trigger, player) {
								const targets = player.getStorage("jlsg_meixin", []),
									type = get.type2(trigger.card);
								while (targets.length) {
									const target = targets.shift();
									if (!target?.isIn()) {
										continue;
									}
									if (type === "basic" && target.hasDiscardableCards(target, "he")) {
										await target.chooseToDiscard({ position: "he", forced: true });
									} else if (type === "trick" && target.hasGainableCards(player, "he")) {
										await player.gainPlayerCard({
											target,
											position: "he",
											forced: true,
										});
									} else if (type === "equip") {
										await target.damage();
									}
								}
							},
						},
					},
					ai: {
						threaten: 3,
						order: 15,
						expose: 0.3,
						result: {
							target(player, target) {
								return -target.countCards("h") - 1;
							},
						},
					},
				},
			},
			translate: {
				jlsg_tianzi_info: "摸牌阶段开始时，你可以放弃摸牌，然后令所有其他角色依次选择一项：1、交给你一张牌；2、令你摸一张牌。",
				jlsg_meixin_info: "出牌阶段限一次，你可以弃置一张牌并选择一名其他男性角色，若如此做，本阶段当你使用一张基本牌后，你令其弃置一张牌；当你使用一张锦囊牌后，你获得其一张牌；当你使用一张装备牌后，你对其造成一点伤害。",
			},
		},
	},
	jlsgsoul_huanggai: {
		1: {
			skill: {
				jlsg_lianti: {
					audio: "ext:极略/audio/skill:2",
					trigger: {
						player: ["linkBefore", "enterGame"],
						global: "phaseBefore",
					},
					forced: true,
					delay: false,
					filter(event, player) {
						if (event.name == "link") {
							return player.isLinked();
						}
						return (event.name != "phase" || game.phaseNumber == 0) && !player.isLinked();
					},
					async content(event, trigger, player) {
						if (trigger.name != "link") {
							await player.link(true);
						} else {
							trigger.cancel();
						}
					},
					ai: {
						noLink: true,
						effect: {
							target(card) {
								if (card.name == "tiesuo") {
									return "zeroplayertarget";
								}
							},
						},
					},
					group: ["jlsg_lianti_damage"],
					subSkill: {
						damage: {
							sub: true,
							sourceSkill: "jlsg_lianti",
							audio: "jlsg_lianti",
							trigger: {
								global: "damageEnd",
							},
							filter(event, player) {
								if (!event.hasNature()) {
									return false;
								}
								if (event.player == player) {
									return true;
								}
								return player === _status.currentPhase && event.player.getHistory("damage", evt => evt.hasNature()).indexOf(event) == 0;
							},
							forced: true,
							async content(event, trigger, player) {
								if (trigger.player == player) {
									player.addMark("jlsg_lianti");
									if (!player.hasSkill("jlsg_lianti_effect")) {
										player.addSkill("jlsg_lianti_effect");
									}
									await player.loseMaxHp(1);
								} else {
									await trigger.player.damage(trigger.num, trigger.source, trigger.nature);
								}
							},
						},
						effect: {
							sub: true,
							sourceSkill: "jlsg_lianti",
							charlotte: true,
							forced: true,
							mark: true,
							intro: {
								markcount(storage, player) {
									return player.countMark("jlsg_lianti");
								},
								content(storage, player) {
									let num = player.countMark("jlsg_lianti");
									return "摸牌阶段摸牌数和手牌上限+" + num;
								},
							},
							mod: {
								maxHandcard(player, num) {
									return num + player.countMark("jlsg_lianti");
								},
							},
							trigger: {
								player: "phaseDrawBegin2",
							},
							filter(event, player) {
								return !event.numFixed && player.countMark("jlsg_lianti");
							},
							async content(event, trigger, player) {
								trigger.num += player.countMark("jlsg_lianti");
							},
						},
					},
				},
			},
			translate: {
				jlsg_lianti_info: "锁定技，你始终横置，其他角色于你的回合内第一次受到属性伤害后，你令其再受到一次等量同属性伤害。当你受到属性伤害后，你摸牌阶段摸牌数和手牌上限+1，然后减1点体力上限。",
			},
		},
	},
	jlsgsoul_huangyueying: {
		1: {
			skill: {
				jlsg_zhiming: {
					audio: "jlsg_zhiming",
					trigger: {
						global: "phaseZhunbeiBegin",
					},
					filter(event, player) {
						if (event.player == player) {
							return false;
						}
						return event.player.countDiscardableCards(player, "h") && player.countDiscardableCards(player, "h");
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseToDiscard("h", get.prompt2("jlsg_zhiming", trigger.player))
							.set("ai", card => {
								if (get.attitude(get.player(), get.event().target) < 0) {
									return 10 - get.value(card);
								}
								return 0;
							})
							.set("chooseonly", true)
							.set("target", trigger.player)
							.forResult();
						if (event.result?.bool) {
							event.result.targets = [trigger.player];
						}
					},
					async content(event, trigger, player) {
						await player.discard(event.cards);
						const {
							result: {
								links: [cardx],
							},
						} = await player
							.discardPlayerCard(trigger.player, "知命", "h", true)
							.set("ai", button => {
								const event = get.event();
								const isVisible = get.event().isVisible || event.visible;
								if (isVisible) {
									const color1 = event.color1;
									if (get.color(button.link) == color1) {
										return get.value(button.link);
									}
								}
								return event.getRand();
							})
							.set(
								"isVisible",
								(function () {
									return trigger.player.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, trigger.player, true);
								})()
							)
							.set("color1", get.color(event.cards[0]));
						if (cardx) {
							const color1 = get.color(event.cards[0]),
								color2 = get.color(cardx);
							if (color1 == color2) {
								const { control } = await player
									.chooseControl("跳过摸牌", "跳过出牌")
									.set("ai", (event, player) => {
										const phase = event.getParent("phase");
										const num = phase.num;
										let phaseList = phase.phaseList;
										let num1 = phaseList.findIndex(name => name.startsWith("phaseZhunbei"));
										phaseList = phaseList.slice(num > num1 ? num : num1);
										const phaseDraw = phaseList.find(name => name.startsWith("phaseDraw"));
										if (phaseDraw) {
											return "跳过摸牌";
										}
										return "跳过出牌";
									})
									.forResult();
								if (control == "跳过摸牌") {
									trigger.player.skip("phaseDraw");
									game.log(trigger.player, "跳过了摸牌阶段");
								} else {
									trigger.player.skip("phaseUse");
									game.log(trigger.player, "跳过了出牌阶段");
								}
							}
						}
					},
					ai: {
						expose: 0.4,
					},
				},
				jlsg_suyin: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "loseAfter",
						global: "loseAsyncAfter",
					},
					filter(event, player) {
						if (player.countCards("h") || _status.currentPhase == player) {
							return false;
						}
						const evt = event.getl(player);
						if (evt?.player != player || !evt?.hs?.length) {
							return false;
						}
						return true;
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseTarget(get.prompt("jlsg_suyin"), "令一名角色翻面")
							.set("ai", target => {
								const player = get.player();
								if (target.hasSkillTag("noturn")) {
									return -1;
								}
								const isTurnedOver = target.isTurnedOver() ? 1 : -1,
									att = get.attitude(player, target);
								return isTurnedOver * att;
							})
							.forResult();
					},
					async content(event, trigger, player) {
						await event.targets[0].turnOver();
					},
					ai: {
						expose: 0.3,
					},
				},
			},
			translate: {
				jlsg_zhiming_info: "其他角色的准备阶段开始时，若其有手牌，你可以弃置一张手牌，然后弃置其一张手牌，若两张牌颜色相同，你令其跳过此回合的摸牌阶段或出牌阶段。",
				jlsg_suyin_info: "你的回合外，当你失去最后的手牌时，可令一名其他角色将其武将牌翻面。",
			},
		},
	},
	jlsgsoul_jiaxu: {
		1: {
			skill: {
				jlsg_yanmie: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					filter(event, player) {
						return player.hasCards("he", { suit: "spade" });
					},
					position: "he",
					filterCard(card) {
						return get.suit(card) == "spade";
					},
					check(card) {
						return 7 - get.value(card);
					},
					filterTarget(card, player, target) {
						return player != target && target.hasCards("h");
					},
					async content(event, trigger, player) {
						const target = event.target;
						const hs = target.getDiscardableCards(target, "h");
						await target.discard(hs);
						await target.draw({ num: hs.length });
						await target.showHandcards();
						const cards = target.getDiscardableCards(target, "h", card => get.type(card) !== "trick");
						if (cards.length) {
							await target.discard({ cards, discarder: player });
							await target.damage({ num: cards.length });
						}
					},
					ai: {
						order: 8,
						expose: 0.3,
						threaten: 1.8,
						result: {
							target(player, target) {
								return -target.countCards("h") - 1;
							},
						},
					},
				},
				jlsg_shunshi: {
					audio: "ext:极略/audio/skill:2",
					trigger: {
						target: "useCardToTargeted",
					},
					filter(event, player) {
						return event.player != player && get.type(event.card) == "basic" && game.hasPlayer(p => p != player && p != event.player);
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseTarget(`###${get.prompt(event.skill)}###令至多三名其他角色各摸一张牌，然后也成为此牌${get.translation(trigger.card)}的目标`, [1, 3])
							.set("filterTarget", (card, player, target) => {
								if (player == target) {
									return false;
								}
								const trigger = get.event().getParent().getTrigger();
								if (game.checkMod(trigger.card, trigger.player, target, "unchanged", "playerEnabled", trigger.player) == false) {
									return false;
								}
								if (game.checkMod(trigger.card, trigger.player, target, "unchanged", "targetEnabled", target) == false) {
									return false;
								}
								return true;
							})
							.set("ai", target => {
								const trigger = get.event().getParent().getTrigger();
								return get.effect(target, trigger.card, trigger.player, player) + get.effect(target, { name: "draw" }, player, player);
							})
							.forResult();
					},
					async content(event, trigger, player) {
						event.targets.sortBySeat();
						await game.asyncDraw([player, ...event.targets]);
						game.log(event.targets, "成为了", trigger.card, "的额外目标");
						trigger.getParent().targets.addArray(event.targets);
					},
					ai: {
						effect: {
							target(card, player, target) {
								if (player == target) {
									return;
								}
								if (card.name == "tao") {
									return [1, 2];
								} else if (card.name == "sha") {
									return [1, 0.74];
								} else if (get.type(card) == "trick") {
									return [1, 0.5];
								}
							},
						},
					},
				},
			},
			translate: {
				jlsg_yanmie_info: "出牌阶段，你可以弃置一张黑桃牌，令一名其他角色先弃置所有手牌再摸等量的牌并展示之。你弃置其中所有非基本牌，并对其造成等量的伤害。",
				jlsg_shunshi_info: "当你成为其他角色使用基本牌的目标后，你可以令你与除该角色以外的一至三名其他角色各摸一张牌，然后这些角色也成为此牌的目标。",
			},
		},
	},
	jlsgsoul_lvbu: {
		1: {
			skill: {
				jlsg_kuangbao: {
					marktext: "暴",
					intro: {
						content: "共有#个标记",
					},
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: ["enterGame", "damageEnd"],
						source: "damageSource",
						global: "phaseBefore",
					},
					filter(event, player) {
						if (event.name === "damage") {
							return event.num > 0;
						}
						return event.name != "phase" || game.phaseNumber == 0;
					},
					forced: true,
					async content(event, trigger, player) {
						player.addMark("jlsg_kuangbao", trigger.name !== "damage" ? 2 : trigger.num);
					},
					ai: {
						maixie: true,
						maixie_hp: true,
					},
				},
				jlsg_wumou: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "useCard",
					},
					forced: true,
					filter(event) {
						return get.type(event.card) == "trick";
					},
					async cost(event, trigger, player) {
						let result;
						if (player.hasMark("jlsg_kuangbao")) {
							result = await player
								.chooseControlList({
									prompt: `${get.translation(event.skill)}：选择一项`,
									list: ["弃置一枚「暴」标记", "受到一点无来源伤害"],
									forced: true,
									ai(event, player) {
										if (player.countMark("jlsg_kuangbao") > 6) {
											return 0;
										} else if (player.hp >= 4 && player.countCards("h", "tao") >= 1) {
											return 2;
										}
										return event.getRand(event.name) < 0.5 ? 0 : 1;
									},
								})
								.forResult();
							if (typeof result?.index === "number") {
								result.bool = true;
								result.cost_data = result.index;
							}
						} else {
							result = { bool: true, cost_data: 1 };
						}
						event.result = result;
					},
					async content(event, trigger, player) {
						const choice = event.cost_data;
						if (choice == 0) {
							player.removeMark("jlsg_kuangbao", 1);
						} else {
							await player.damage("nosource");
						}
					},
					ai: {
						neg: true,
					},
				},
				jlsg_wuqian: {
					audio: "ext:极略/audio/skill:1",
					enable: "phaseUse",
					usable: 1,
					filter(event, player) {
						return player.storage.jlsg_kuangbao > 1;
					},
					async content(event, trigger, player) {
						player.removeMark("jlsg_kuangbao", 2);
						player.addTempSkill("wushuang", "phaseAfter");
						player.addTempSkill("jlsg_wuqian_buff", "phaseAfter");
					},
					subSkill: {
						buff: {
							trigger: {
								source: "damageEnd",
							},
							forced: true,
							popup: false,
							audio: false,
							filter(event) {
								return event.num != 0;
							},
							async content(event, trigger, player) {
								player.addMark("jlsg_kuangbao");
							},
						},
					},
					ai: {
						order: 10,
						result: {
							player(player) {
								if (player.countCards("h", "juedou") > 0) {
									return 2;
								}
								var ph = player.getCards("h");
								var num = 0;
								for (var i = 0; i < ph.length; i++) {
									if (get.tag(ph[i], "damage")) {
										num++;
									}
								}
								if (num > 1) {
									return num;
								}
								return 0;
							},
						},
					},
				},
				jlsg_shenfen: {
					audio: "ext:极略/audio/skill:1",
					enable: "phaseUse",
					filter(event, player) {
						return player.countMark("jlsg_kuangbao") >= 6 && !player.hasSkill("jlsg_shenfen_ban");
					},
					selectTarget: -1,
					filterTarget: lib.filter.notMe,
					skillAnimation: true,
					animationColor: "metal",
					multitarget: true,
					multiline: true,
					async content(event, trigger, player) {
						player.removeMark("jlsg_kuangbao", 6);
						player.addTempSkill("jlsg_shenfen_ban");
						let targets = event.targets.slice();
						while (targets.length) {
							const target = targets.shift();
							if (target?.isIn()) {
								await target.damage();
							}
						}
						targets = event.targets.slice();
						while (targets.length) {
							const target = targets.shift();
							if (target?.isIn() && target.hasDiscardableCards(target, "he")) {
								await target.chooseToDiscard({ position: "he", selectCard: 4, forced: true });
							}
						}
						await player.turnOver();
					},
					subSkill: {
						ban: {
							charlotte: true,
						},
					},
					ai: {
						order: 9,
						result: {
							player(player) {
								let num = 0;
								for (let i = 0; i < game.players.length; i++) {
									if (game.players[i] != player) {
										if (game.players[i].ai.shown == 0) {
											return 0;
										}
										num += get.damageEffect(game.players[i], player, player) > 0 ? 1 : -1;
									}
								}
								return num;
							},
						},
					},
				},
			},
			translate: {
				jlsg_kuangbao_info: "锁定技，游戏开始时，你获得2枚「暴」标记。每当你造成或受到伤害时，你获得等量的「暴」标记。",
				jlsg_wumou_info: "锁定技，当你使用非延时锦囊牌时，你须选择一项：1，弃置一枚「暴」标记；2，受到一点伤害。",
				jlsg_wuqian_info: "出牌阶段：你可以弃置2枚「暴」标记，若如此做，本回合内你视为拥有技能【无双】且你造成伤害后额外获得一枚「暴」标记。",
				jlsg_shenfen_info: "每回合限一次，出牌阶段，弃6个暴怒标记，你对每名其他角色各造成一点伤害，其他角色先弃掉各自装备区里所有的牌，再各弃4张手牌，然后将你的武将牌翻面。",
			},
		},
	},
	jlsgsoul_lvmeng: {
		1: {
			skill: {
				jlsg_shelie: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "phaseDrawBegin1",
					},
					filter(event, player) {
						return !event.numFixed;
					},
					forced: true,
					async content(event, trigger, player) {
						trigger.cancel(null, null, "notrigger");
						event.cards = [];
						let num = 0;
						event.getResultString = function (str) {
							switch (str) {
								case "基本牌":
									return "basic";
								case "锦囊牌":
									return "trick";
								case "装备牌":
									return "equip";
							}
							return str;
						};
						while (num < 4) {
							num++;
							const result = await player
								.chooseControl(["basic", "trick", "equip"], (event, player) => {
									return ["basic", "trick", "equip"].randomGet();
								})
								.set("prompt", "涉猎")
								.set("prompt2", "请选择想要获得的第" + get.cnNumber(num, true) + "张牌的类型")
								.forResult();
							const control = result?.control;
							const card = get.cardPile2(card => get.type(card) == control && !event.cards.includes(card));
							if (card) {
								event.cards.add(card);
							} else {
								player.chat("无牌可得了吗");
								game.log(`但是牌堆里面已经没有${get.translation(control)}了！`);
							}
						}
						if (event.cards.length) {
							await player.gain(event.cards, "gain2");
						}
					},
				},
				jlsg_gongxin: {
					audio: "ext:极略/audio/skill:1",
					enable: "phaseUse",
					usable: 1,
					filterTarget(_, player, target) {
						return target != player && target.countCards("h");
					},
					async content(event, trigger, player) {
						const target = event.targets[0];
						await player.viewCards("攻心", target.getCards("h"));
						event.cards = target.getCards("h", card => {
							return get.suit(card) == "heart";
						});
						if (!event.cards.length) {
							return;
						}
						await player.showCards(event.cards, get.translation(target) + "的红桃手牌");
						if (event.cards.length == 1) {
							await target.discard(event.cards);
							await target.damage(1, player);
						} else {
							const result = await player
								.chooseButton(["攻心", "请选择获得一张牌", "hidden", event.cards], true)
								.set("ai", button => {
									return get.value(button.link);
								})
								.forResult();
							if (result.bool) {
								await player.gain(result.links, target, "give", "log");
							}
						}
					},
					ai: {
						threaten: 1.5,
						result: {
							target(player, target) {
								return -target.countCards("h");
							},
						},
						order: 10,
						expose: 0.4,
					},
				},
			},
			translate: {
				jlsg_shelie_info: "锁定技，摸牌阶段开始时，你改为选择指定获得某种类型的牌（最多四次），然后从牌堆随机摸取之。",
				jlsg_gongxin_info: "出牌阶段限一次，你可以观看一名其他角色的手牌并展示其中所有的红桃牌，然后若展示的牌数：为一，你弃置之并对其造成一点伤害；大于一，你获得其中一张红桃牌。",
			},
		},
	},
	jlsgsoul_liubei: {
		1: {
			skill: {
				jlsg_jizhao: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					filter(event, player) {
						return game.hasPlayer(current => current != player && !current.hasMark("jlsg_jizhao"));
					},
					selectCard: [1, Infinity],
					filterCard: lib.filter.all,
					check(card) {
						if (ui.selected.cards.length > 1) {
							return 0;
						} else if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
							return 0;
						} else if (ui.selected.cards.length && ui.selected.cards[0].name == "shandian") {
							return 0;
						} else if (!ui.selected.cards.length && card.name == "du") {
							return 20;
						} else if (!ui.selected.cards.length && card.name == "shandian") {
							return 18;
						} else if (!ui.selected.cards.length && card.name == "shan") {
							return 14;
						} else if (!ui.selected.cards.length && card.name == "jiedao") {
							return 16;
						}
						return 0;
					},
					filterTarget(card, player, target) {
						return !target.hasMark("jlsg_jizhao") && player != target;
					},
					discard: false,
					async content(event, trigger, player) {
						await player.give(event.cards, event.target);
						event.target.addMark("jlsg_jizhao");
						event.target.addSkill("jlsg_jizhao_effect");
					},
					subSkill: {
						effect: {
							charlotte: true,
							trigger: {
								player: "phaseEnd",
							},
							filter(event, player) {
								return !player.hasHistory("sourceDamage") && game.hasPlayer(current => current != player && current.hasSkill("jlsg_jizhao"));
							},
							forced: true,
							popup: false,
							async content(event, trigger, player) {
								const source = game.findPlayer(current => current != player && current.hasSkill("jlsg_jizhao"));
								if (source) {
									source.logSkill("jlsg_jizhao", [player]);
									await player.damage({ source });
									player.clearMark("jlsg_jizhao");
								}
							},
						},
					},
					ai: {
						order: 4,
						result: {
							target(card, player, target) {
								if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
									return -10;
								} else if (ui.selected.cards.length && ui.selected.cards[0].name == "shandian") {
									return -10;
								}
								return -1;
							},
						},
					},
				},
			},
			translate: {
				jlsg_jizhao_info: "出牌阶段对一名无标记的其他角色限一次，你可以交给其至少一张手牌，并令其获得一个「诏」标记；拥有「诏」标记的角色回合结束时，若其本回合内未造成过伤害，其受到你造成的一点伤害并失去「诏」标记。",
			},
		},
	},
	jlsgsoul_sunquan: {
		1: {
			skill: {
				jlsg_huju: {
					locked: true,
					audio: "ext:极略/audio/skill:3",
					logAudio: index => (typeof index === "number" ? `ext:极略/audio/skill/jlsg_huju${index}.mp3` : "ext:极略/audio/skill:3"),
					trigger: {
						global: "phaseBegin",
					},
					derivation: ["zhiheng", "jlsg_hufu"],
					async cost(event, trigger, player) {
						if (trigger.player !== player) {
							event.result = {
								bool: true,
								cost_data: 1,
							};
						} else if (player.isMaxHandcard()) {
							const result = await player.chooseControlList({
								prompt: `${get.translation(event.skill)}：选择一项`,
								list: ["失去1点体力", "减1点体力上限，失去【虎踞】，获得【制衡】和【虎缚】"],
								ai(event, player) {
									if (
										player.hp <= 2 &&
										!player.countCards("h", function (card) {
											return get.tag(card, "recover");
										})
									) {
										return 1;
									}
									return 0;
								},
							});
							if (typeof result?.index === "number") {
								event.result = {
									bool: bool,
									cost_data: result.index + 2,
								};
							}
						}
					},
					popup: false,
					async content(event, trigger, player) {
						const index = Number(event.cost_data);
						player.logSkill(event.name, null, null, null, [index]);
						if (index === 1) {
							await player.draw({ num: 1 });
						} else if (index === 2) {
							await player.loseHp(1);
						} else {
							await player.loseMaxHp(1);
							await player.changeSkills(get.info(event.name).derivation, [event.name]).set("$handle", lib.jlsg.changeSkillsHandle);
						}
					},
				},
			},
			translate: {
				jlsg_huju_info: "锁定技，其他角色的回合开始时，你摸一张牌。你的回合开始时，若你的手牌数为最多（或之一），你选择一项：1、失去一点体力；2、减一点体力上限，失去〖虎踞〗，并获得技能〖制衡〗和〖虎缚〗。",
			},
			info: ["male", "shen", 4, ["jlsg_huju"], ["wu"]],
		},
	},
	jlsgsoul_simayi: {
		1: {
			skill: {
				jlsg_jilve: {
					audio: "ext:极略/audio/skill:3",
					enable: "phaseUse",
					async content(event, trigger, player) {
						await player.draw({ nodelay: true });
						const result = await player
							.chooseToUse({
								prompt: `${get.translation(event.name)}：使用一张牌，否则弃置一张牌且本回合此技能失效`,
								filterCard(card, player) {
									return lib.filter.cardEnabled(card, player, event.parent.parent) && lib.filter.cardUsable(card, player, event.parent.parent);
								},
							})
							.forResult();
						if (!result?.bool && player.hasDiscardableCards(player, "he")) {
							await player.chooseToDiscard({ position: "he", forced: true });
							player.tempBanSkill(event.name);
						}
					},
					ai: {
						threaten: 4,
						order: 15,
						result: {
							player: 1,
						},
						effect: {
							player(card, player) {
								if (get.type(card) != "basic") {
									return [1, 3];
								}
							},
						},
					},
				},
				jlsg_tongtian: {
					limited: true,
					mark: true,
					marktext: "通",
					intro: {
						content: true,
					},
					derivation: ["jlsg_tongtian_fankui", "jlsg_tongtian_guanxing", "jlsg_tongtian_wansha", "jlsg_tongtian_zhiheng"],
					audio: "ext:极略/audio/skill:1",
					enable: "phaseUse",
					position: "he",
					filterCard(card) {
						var suit = get.suit(card);
						return !ui.selected.cards.map(card => get.suit(card)).includes(suit);
					},
					complexCard: true,
					selectCard: [1, 4],
					prompt: "选择不同花色的牌，获得各花色的技能。",
					check(card) {
						return 8 - get.value(card);
					},
					skillAnimation: true,
					async content(event, trigger, player) {
						player.awakenSkill(event.name);
						const storage = event.cards.map(card => get.suit(card, player)),
							skillList = get.info(event.name).derivation,
							suits = ["spade", "heart", "club", "diamond"];
						let skills = [];
						for (let i in suits) {
							if (storage.includes(suits[i])) {
								skills.add(skillList[i]);
							}
						}
						if (skills.length) {
							await player.addSkills(skills);
						}
					},
					ai: {
						order: 6,
						result: {
							player(player) {
								const cards = player.getCards("he"),
									suits = [];
								for (let i = 0; i < cards.length; i++) {
									if (!suits.includes(get.suit(cards[i]))) {
										suits.push(get.suit(cards[i]));
									}
								}
								if (suits.length < 3) {
									return -1;
								}
								return suits.length;
							},
						},
					},
				},
			},
			translate: {
				jlsg_tongtian_info: "限定技，出牌阶段你可以弃置任意花色不同的牌，然后根据以下技能获得相应技能：黑桃·反馈；红桃·观星；梅花·完杀；方片·制衡。",
				jlsg_jilve_info: "出牌阶段，你可以摸一张牌，然后选择一项：使用一张牌，或弃置一张牌。若你以此法弃置牌，则本回合此技能失效。",
			},
		},
	},
	jlsgsoul_zhangjiao: {
		1: {
			skill: {
				jlsg_dianjie: {
					audio: "ext:极略/audio/skill:2",
					trigger: {
						player: ["phaseDrawBegin1", "phaseUseBefore"],
					},
					prompt(event, player) {
						if (event.name != "phaseUseBefore") {
							return "是否发动【电界】跳过摸牌阶段？";
						}
						return "是否发动【电界】跳过出牌阶段？";
					},
					check(event, player) {
						if (event.name != "phaseUse") {
							if (player.countCards("h") <= 1 || player.hp == 1) {
								return -1;
							}
						} else {
							if (
								player.countCards("h", function (card) {
									return get.value(card) > 7;
								})
							) {
								return -1;
							}
							if (player.countCards("h") - player.hp >= 3) {
								return -1;
							}
						}
						return 1;
					},
					async content(event, trigger, player) {
						trigger.finish();
						trigger.untrigger();
						const result1 = await player
							.judge({
								judge(card) {
									const color = get.color(card);
									if (color == "black") {
										return 4;
									} else if (color == "red") {
										return 2;
									}
									return 0;
								},
								judge2(result) {
									return result.bool == false;
								},
							})
							.forResult();
						let result2;
						if (result1?.color == "black") {
							result2 = await player
								.chooseTarget({
									prompt: "选择一个目标对其造成2点雷电伤害",
									ai(target) {
										return get.damageEffect(target, player, player, "thunder");
									},
								})
								.forResult();
						} else if (result1?.color == "red") {
							result2 = await player
								.chooseTarget({
									prompt: "选择任意个目标将其横置",
									selectTarget: [1, game.countPlayer()],
									filterTarget(card, player, target) {
										return !target.isLinked();
									},
									ai(target) {
										return -get.attitude(player, target);
									},
								})
								.forResult();
						}
						if (result2?.bool && result2.targets?.length) {
							player.line(result2.targets, "thunder");
							if (result1.color == "black") {
								await result2.targets[0].damage("thunder", 2);
							} else if (result1.color == "red") {
								await game.doAsyncInOrder(result2.targets, async target => await target.link());
							}
						}
					},
				},
			},
			translate: {
				jlsg_dianjie_info: "你可以跳过你的摸牌阶段或出牌阶段，然后判定：若结果为黑色，你对一名角色造成2点雷电伤害；若结果为红色，你令至多两名武将牌未横置的角色将其武将牌横置。",
			},
		},
	},
	jlsgsoul_sp_zhangjiao: {
		1: {
			skill: {
				jlsg_yinyang_s: {
					audio: "ext:极略/audio/skill:2",
					derivation: ["jlsg_jiyang", "jlsg_jiyin", "jlsg_xiangsheng"],
					charlotte: true,
					unique: true,
					init(player) {
						if (player.hasSkill("jlsg_yinyang_s")) {
							player.useSkill("jlsg_yinyang_s");
						}
					},
					onremove: true,
					trigger: {
						player: ["showCharacterEnd", "changeHpAfter", "gainMaxHpAfter", "loseMaxHpAfter"],
					},
					filter(event, player) {
						let skill = lib.skill.jlsg_yinyang_s.getCurrentSkill(player);
						return !player.hasStorage("jlsg_yinyang_s", skill);
					},
					forced: true,
					delay: false,
					async content(event, trigger, player) {
						const skill = lib.skill.jlsg_yinyang_s.getCurrentSkill(player);
						await player.changeSkills(
							[skill],
							[player.storage.jlsg_yinyang_s].filter(i => i)
						);
						player.setStorage("jlsg_yinyang_s", skill);
					},
					getCurrentSkill(player) {
						let diff = player.hp - player.getDamagedHp();
						if (diff > 0) {
							return "jlsg_jiyang";
						} else if (diff < 0) {
							return "jlsg_jiyin";
						} else {
							return "jlsg_xiangsheng";
						}
					},
				},
				jlsg_jiyang: {
					audio: "ext:极略/audio/skill:2",
					sub: true,
					unique: true,
					thundertext: true,
					init(player) {
						player.addMark(skill, 3);
					},
					onremove(player, skill) {
						player.clearMark(skill);
						let card = get.cardPile2(function (card) {
							return get.color(card, false) == "red";
						}, "random");
						if (card) {
							player.gain(cards, "gain2");
						}
					},
					marktext: "阳",
					intro: {
						name: "阳",
						content: "mark",
					},
					trigger: {
						player: "loseAfter",
						global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
					},
					filter(event, player) {
						if (!player.countMark("jlsg_jiyang")) {
							return false;
						}
						var evt = event.getl(player);
						if (!evt || !evt.cards2 || !evt.cards2.length) {
							return false;
						}
						for (var i of evt.cards2) {
							if (get.color(i, player) == "red") {
								return true;
							}
						}
						return false;
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseTarget(get.prompt("jlsg_jiyang"))
							.set("prompt2", "令一名角色回复1点体力,若其未受伤则改为加1点体力上限.")
							.set("ai", target => {
								var player = get.player();
								var eff = get.attitude(player, target);
								eff = 2 * Math.atan(eff);
								if (!target.isHealthy()) {
									eff = get.recoverEffect(target, player, player);
								}
								return eff - 0.5 + Math.random();
							})
							.forResult();
					},
					async content(event, trigger, player) {
						player.removeMark(event.name);
						const target = event.targets[0];
						if (player.ai.shown < target.ai.shown) {
							player.addExpose(0.2);
						}
						if (target.isHealthy()) {
							await target.gainMaxHp();
						} else {
							await target.recover(player);
						}
					},
				},
				jlsg_jiyin: {
					audio: "ext:极略/audio/skill:2",
					sub: true,
					unique: true,
					thundertext: true,
					init(player, skill) {
						player.addMark(skill, 3);
					},
					onremove(player, skill) {
						player.clearMark(skill);
						let card = get.cardPile2(function (card) {
							return get.color(card, false) == "black";
						}, "random");
						if (card) {
							player.gain(cards, "gain2");
						}
					},
					marktext: "阴",
					intro: {
						name: "阴",
						content: "mark",
					},
					trigger: {
						player: "loseAfter",
						global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
					},
					filter(event, player) {
						if (!player.countMark("jlsg_jiyin")) {
							return false;
						}
						var evt = event.getl(player);
						if (!evt || !evt.cards2 || !evt.cards2.length) {
							return false;
						}
						for (var i of evt.cards2) {
							if (get.color(i, player) == "black") {
								return true;
							}
						}
						return false;
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseTarget(get.prompt("jlsg_jiyin"))
							.set("prompt2", "对一名角色造成1点雷电伤害,若其已受伤则改为减1点体力上限.")
							.set("ai", target => {
								var player = get.player();
								var eff = get.attitude(player, target);
								eff = -2 * Math.atan(eff);
								if (target.isHealthy()) {
									eff = get.damageEffect(target, player, player, "thunder");
								}
								return eff - 0.5 + Math.random();
							})
							.forResult();
					},
					async content(event, trigger, player) {
						player.removeMark(event.name);
						const target = event.targets[0];
						if (player.ai.shown < target.ai.shown) {
							player.addExpose(0.2);
						}
						if (target.isHealthy()) {
							await target.damage("thunder", player);
						} else {
							await target.loseMaxHp();
						}
					},
				},
				jlsg_xiangsheng: {
					audio: "ext:极略/audio/skill:2",
					sub: true,
					unique: true,
					thundertext: true,
					init(player, skill) {
						player.addMark(skill, 6);
					},
					onremove(player, skill) {
						player.clearMark(skill);
						player.draw(1);
					},
					marktext: "生",
					intro: {
						name: "生",
						content: "mark",
					},
					trigger: {
						player: "loseAfter",
						global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
					},
					getIndex(event, player) {
						const colors = [],
							evt = event.getl(player);
						for (let i of evt.cards2) {
							let color = get.color(i, player);
							if (color == "black") {
								colors.add("red");
							}
							if (color == "red") {
								colors.add("black");
							}
						}
						return colors;
					},
					filter(event, player, triggername, color) {
						if (!player.countMark("jlsg_xiangsheng") || !color) {
							return false;
						}
						return true;
					},
					frequent: true,
					async cost(event, trigger, player) {
						const { indexedData: color } = event;
						event.result = player.chooseBool(get.prompt("jlsg_xiangsheng")).set("prompt2", `你可以摸一张${lib.translate[color]}牌`).set("frequentSkill", "jlsg_xiangsheng").forResult();
					},
					async content(event, trigger, player) {
						const { indexedData: color } = event;
						player.removeMark(event.name);
						const card = get.cardPile2(function (card) {
							return get.color(card, false) == color;
						}, "random");
						if (card) {
							await player.gain(card, "gain2");
						}
					},
				},
			},
			translate: {
				jlsg_xiangsheng_info: "锁定技，获得此技能时，你获得6枚「生」标记；失去此技能后，你摸一张牌；当你失去黑色/红色牌后，你可以弃置1枚「生」标记并摸一张红色/黑色牌。",
				jlsg_jiyang_info: "锁定技，获得此技能时，你获得3枚「阳」标记；失去此技能后，你随机获得一张红色牌；当你失去红色牌后，你可以弃置1枚「阳」标记令一名角色回复1点体力，若其未受伤则改为加1点体力上限。",
				jlsg_jiyin_info: "锁定技，获得此技能时，你获得3枚「阴」标记；失去此技能后，你随机获得一张黑色牌；当你失去黑色牌后，你可以弃置1枚「阴」标记对一名角色造成1点雷电伤害，若其已受伤则改为减1点体力上限。",
			},
		},
	},
	jlsgsoul_zhangfei: {
		1: {
			skill: {
				jlsg_shayi: {
					mod: {
						cardUsable(card, player, num) {
							if (card.name == "sha") {
								return Infinity;
							}
						},
						targetInRange(card) {
							if (card.name == "sha") {
								return true;
							}
						},
					},
					audio: "ext:极略/audio/skill:4",
					trigger: {
						player: "phaseUseBegin",
					},
					filter(event, player) {
						return player.countCards("h") > 0;
					},
					forced: true,
					async content(event, trigger, player) {
						await player.showHandcards();
						if (!player.hasCards("h", "sha")) {
							player.addTempSkill("jlsg_shayi_buff", "phaseAfter");
						} else {
							await player.draw({ num: 1 });
						}
					},
					subSkill: {
						buff: {
							audio: "ext:极略/audio/skill:2",
							enable: ["chooseToRespond", "chooseToUse"],
							filterCard(card) {
								return get.color(card) == "black";
							},
							position: "hes",
							viewAs: { name: "sha" },
							viewAsFilter(player) {
								if (!player.hasCards("hes", { color: "black" })) {
									return false;
								}
							},
							prompt: "将一张黑色牌当杀使用或打出",
							check(card) {
								return 4 - get.value(card);
							},
							ai: {
								respondSha: true,
								skillTagFilter(player) {
									if (!player.countCards("hes", { color: "black" })) {
										return false;
									}
								},
							},
						},
					},
				},
				jlsg_zhenhun: {
					audio: "ext:极略/audio/skill:true",
					enable: "phaseUse",
					usable: 1,
					filter(event, player) {
						return player.hasDiscardableCards(player, "he");
					},
					filterCard: lib.filter.cardDiscardable,
					check(card) {
						return 4 - get.value(card);
					},
					selectTarget: -1,
					filterTarget(card, player, target) {
						return player != target;
					},
					async content(event, trigger, player) {
						event.target.addTempSkill("fengyin", { global: "phaseUseAfter" });
					},
					ai: {
						order: 10,
						result: {
							player(player) {
								if (player.countCards("h") > 2) {
									return 1;
								}
								return -1;
							},
							target(target) {
								let num = 0;
								for (let i = 0; i < target.skills.length; i++) {
									if (!get.is.locked(target.skills[i])) {
										if (target.skills[i].enable && target.skills[i].enable == "phaseUse") {
											continue;
										} else {
											num++;
										}
									}
								}
								if (num > 0) {
									return -num;
								}
								return 0;
							},
						},
						threaten: 1.3,
					},
				},
			},
			translate: {
				jlsg_shayi_info: "锁定技，出牌阶段开始时，你展示所有手牌，若有【杀】，你摸一张牌；若没有【杀】，你于本阶段可以将一张黑色牌当【杀】使用。你使用【杀】无距离限制、无次数限制。",
				jlsg_zhenhun_info: "出牌阶段限一次，你可以弃置一张牌令所有其他角色的非锁定技于本阶段内无效。",
			},
		},
	},
	jlsgsoul_zhaoyun: {},
	jlsgsoul_guojia: {
		1: {
			skill: {
				jlsg_tianqi: {
					hiddenCard(player, name) {
						if (!lib.inpile.includes(name)) {
							return false;
						}
						if (player.isDying()) {
							return false;
						}
						let type = get.type(name);
						if (!["basic", "trick"].includes(type)) {
							return false;
						}
						if (player.isPhaseUsing(true) && get.event().type == "phase") {
							let basic = player.hasStorage("jlsg_tianqi_used", "basic"),
								trick = player.hasStorage("jlsg_tianqi_used", "trick");
							return (type == "basic" && !basic) || (type == "trick" && !trick);
						}
						return true;
					},
					audio: "ext:极略/audio/skill:2",
					usable(skill, player) {
						if (player.isPhaseUsing(true)) {
							return 1;
						}
						return Infinity;
					},
					enable: ["chooseToUse", "chooseToRespond"],
					filter(event, player) {
						if (player.isDying()) {
							return false;
						}
						for (let i of lib.inpile) {
							let type = get.type(i);
							if (!["basic", "trick"].includes(type)) {
								continue;
							}
							if (i == "sha") {
								for (let j of lib.inpile_nature) {
									if (event.filterCard(get.autoViewAs({ name: i, nature: j }, "unsure"), player, event)) {
										return true;
									}
								}
							} else if ((type == "basic" || type == "trick") && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) {
								return true;
							}
						}
						return false;
					},
					direct: true,
					chooseButton: {
						dialog(event, player) {
							let list1 = get.inpileVCardList(([type]) => type === "basic"),
								list2 = get.inpileVCardList(([type]) => type === "trick");
							let dialog = ui.create.dialog();
							if (list1.length) {
								dialog.add("基本牌");
								dialog.add([list1, "vcard"]);
							}
							if (list2.length) {
								dialog.add("锦囊牌");
								dialog.add([list2, "vcard"]);
							}
							return dialog;
						},
						filter(button, player) {
							let evt = get.event().getParent();
							return evt.filterCard(get.autoViewAs({ name: button.link[2], nature: button.link[3] }, "unsure"), player, evt);
						},
						check(button) {
							const player = get.player(),
								event = get.event().getParent(),
								card = get.autoViewAs({ name: button.link[2], nature: button.link[3] }, "unsure"),
								knowHead = _status.pileTop?.isKnownBy(player);
							let val = event.type == "phase" ? player.getUseValue(card) / 10 : 3;
							if (val > 0 && !event.type == "phase" && get.tag(event.getParent(), "damage") && event.getParent().name != "juedou" && !player.countCards("h", { name: button.link[2] }) && (!knowHead || get.type(ui.cardPile.firstChild, "trick") == get.type(button.link[2], "trick") || event.getParent().baseDamage > 1)) {
								return val;
							}
							let loseHpEffect = get.effect(player, { name: "losehp" }, player, player);
							if (!knowHead) {
								loseHpEffect /= 2;
							} else {
								if (get.type(_status.pileTop, "trick") == get.type(button.link[2], "trick")) {
									loseHpEffect = 0;
								}
							}
							return val + loseHpEffect;
						},
						backup(links, player) {
							const backup = get.copy(get.info("jlsg_tianqi_backup"));
							backup.links = links[0];
							backup.viewAs = {
								name: links[0][2],
								nature: links[0][3],
								isCard: false,
							};
							return backup;
						},
						prompt(links, player) {
							return "亮出牌堆顶的一张牌,并将此牌当" + get.translation(links[0][2]) + "使用或打出.若亮出的牌不为" + get.translation(links[0][0]) + "牌,你须先失去1点体力";
						},
					},
					ai: {
						order: 10,
						threaten: 4,
						fireAttack: true,
						respondShan: true,
						respondSha: true,
						skillTagFilter(player, tag, arg) {
							if (player.isDying()) {
								return false;
							}
							if (player.isPhaseUsing(true)) {
								return true;
							}
						},
						result: {
							player(player) {
								if (get.event().dying) {
									return get.attitude(player, get.event().dying);
								}
								let knowHead = _status.pileTop?.isKnownBy(player);
								if (knowHead) {
									return 1;
								}
								if (!knowHead) {
									if (Math.random() < 0.67) {
										return 0.5;
									}
									return get.effect(player, { name: "losehp" }, player, player) * Math.random();
								}
							},
						},
					},
					subSkill: {
						backup: {
							audio: "jlsg_tianqi",
							filterCard: () => false,
							selectCard: -1,
							popname: true,
							log: false,
							async precontent(event, trigger, player) {
								player.logSkill("jlsg_tianqi");
								const type = get.info("jlsg_tianqi_backup").links[0];
								game.log(player, "声明了" + get.translation(type) + "牌");
								const cards = get.cards(1);
								await player.showCards(cards);
								event.result.cards = cards;
								event.result.card.cards = cards;
								if (get.type(cards[0], "trick") != type) {
									await player.loseHp();
								}
							},
						},
					},
				},
				jlsg_tianji: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						global: "phaseUseBegin",
					},
					filter(event, player) {
						if (ui.cardPile.hasChildNodes() == false) {
							return false;
						}
						return true;
					},
					frequent: true,
					async content(event, trigger, player) {
						event.top = [ui.cardPile.firstChild];
						event.dialog = ui.create.dialog("天机", event.top, true);
						let controls = ["替换"];
						if (!player.isMaxHandcard(true)) {
							controls.unshift("获得");
						}
						controls.push("cancel2");
						let result = await player
							.chooseControl({
								controls,
								dialog: event.dialog,
								ai(event, player) {
									if (event.top[0].name == "du") {
										return "cancel2";
									}
									return 0;
								},
							})
							.forResult();
						if (result?.control && result.control !== "cancel2") {
							await player.draw({ num: 1 });
						}
						if (result?.control == "替换") {
							result = await player
								.chooseCard({
									prompt: "选择一张牌置于牌堆顶",
									position: "h",
									forced: true,
									ai(card) {
										return 15 - get.value(card);
									},
								})
								.forResult();
							if (result?.bool && result.cards?.length) {
								player.$throw(1, 1000);
								await player.lose(result.cards, ui.cardPile, "insert");
								game.log(player, "将一张牌置于牌堆顶");
							}
						}
					},
				},
			},
			translate: {
				jlsg_tianqi_info: "你的濒死状态除外，每当你需要使用或打出一张基本牌或非延时锦囊牌时，你可以声明之，然后亮出牌堆顶的一张牌，并将此牌当你所述之牌使用或打出，若其与你所述之牌不为同一类别，你须先失去一点体力。（但出牌阶段仅限一次。）",
				jlsg_tianji_info: "任一角色的出牌阶段开始时，你可以观看牌堆顶的一张牌，然后你可以选择一项：用一张手牌替换之；若你的手牌数不是全场最多的(或之一)，你可以获得之。",
			},
		},
	},
	jlsgsoul_ganning: {
		1: {
			skill: {
				jlsg_lvezhen: {
					shaRelated: true,
					audio: "ext:极略/audio/skill:2",
					trigger: {
						player: "useCardToPlayered",
					},
					filter(event, player) {
						return event.card.name === "sha" && event.target.countDiscardableCards(player, "he");
					},
					check(event, player) {
						return get.effect(event.target, { name: "guohe_copy2" }, player, player) > 0;
					},
					async content(event, trigger, player) {
						const cards = get.cards(3, true);
						await game.cardsDiscard(cards);
						player.$throw(cards, 1000);
						await game.delayx();
						const num = cards.filter(card => !get.type2(card, false) === "basic").length;
						if (num > 0) {
							await player.discardPlayerCard({
								target: trigger.target,
								selectButton: Math.min(num, trigger.target.countDiscardableCards(player, "he")),
								forced: true,
							});
						}
					},
				},
				jlsg_youlong: {
					mark: true,
					marktext: "游",
					intro: {
						content(storage) {
							return "牌堆数" + ui.cardPile.childNodes.length + "张" + "||" + "弃牌数" + ui.discardPile.childNodes.length + "张";
						},
					},
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					viewAs: { name: "shunshou" },
					viewAsFilter(player) {
						if (!player.countCards("hs", { color: "black" })) {
							return false;
						}
					},
					filter(event, player) {
						return ui.discardPile.childNodes.length > ui.cardPile.childNodes.length;
					},
					prompt: "将一张黑色手牌当顺手牵羊使用",
					position: "hs",
					filterCard(card) {
						return get.color(card) == "black";
					},
					check(card) {
						return 8 - get.value(card);
					},
					ai: {
						order: 9.5,
					},
				},
			},
			translate: {
				jlsg_lvezhen_info: "当你使用【杀】指定目标后，你可以将牌堆顶的3张牌置入弃牌堆，其中每有一张非基本牌，你弃置目标角色一张牌。",
				jlsg_youlong_info: "出牌阶段，若弃牌堆的牌数多于牌堆，你可以将黑色手牌当【顺手牵羊】使用。",
			},
		},
		2: {
			skill: {
				jlsg_lvezhen: {
					audio: "ext:极略/audio/skill:2",
					trigger: {
						player: "useCardToPlayered",
					},
					filter(event, player) {
						const phaseUse = _status.event.getParent("phaseUse");
						if (phaseUse.name != "phaseUse" || phaseUse.player != player || player.hasSkill("jlsg_lvezhen_ban")) {
							return false;
						}
						return (event.card.name == "sha" || get.type2(event.card) == "trick") && event.targets.length == 1 && event.target.countGainableCards(player, "he");
					},
					async content(event, trigger, player) {
						player.addTempSkill("jlsg_lvezhen_ban", "phaseUseAfter");
						await player.randomGain({
							target: trigger.target,
							num: 1,
						});
					},
					subSkill: {
						ban: { charlotte: true },
					},
				},
				jlsg_youlong: {
					audio: "ext:极略/audio/skill:2",
					trigger: {
						player: ["turnOverBefore", "enterGame"],
						global: "phaseBefore",
					},
					forced: true,
					filter(event, player) {
						if (event.name === "link") {
							return player.isTurnedOver();
						}
						return (event.name != "phase" || game.phaseNumber === 0) && !player.isTurnedOver();
					},
					async content(event, trigger, player) {
						if (trigger.name != "turnOver") {
							await player.turnOver(true);
						} else {
							trigger.cancel();
						}
					},
					group: ["jlsg_youlong_phaseUse"],
					subSkill: {
						phaseUse: {
							audio: "jlsg_youlong",
							trigger: {
								global: "phaseEnd",
							},
							filter(event, player) {
								return player != event.player;
							},
							forced: true,
							async content(event, trigger, player) {
								await player.draw({ num: 1 });
								const next = player.phaseUse();
								event.next.remove(next);
								trigger.next.push(next);
							},
						},
					},
					ai: {
						effect: {
							target(card, player, target, current) {
								if (get.type(card) == "delay") {
									return 0;
								}
							},
						},
					},
				},
			},
			translate: {
				jlsg_lvezhen_info: "出牌阶段限一次，你使用【杀】或锦囊指定唯一目标后，可以随机获得其一张牌。",
				jlsg_youlong_info: "锁定技，你始终背面朝上。其他角色的回合结束时，你摸一张牌并执行一个额外的出牌阶段。",
			},
		},
	},
	jlsgsoul_xiahoudun: {
		1: {
			skill: {
				jlsg_danjing: {
					audio: "ext:极略/audio/skill:2",
					logAudio: index => (typeof index === "number" ? "jlsg_danjing" + index + ".mp3" : 2),
					enable: "phaseUse",
					usable: 1,
					log: false,
					filterTarget(card, player, target) {
						return player != target;
					},
					async content(event, trigger, player) {
						const target = event.targets[0];
						const { index } = await player
							.chooseControl("令其摸三张牌", "令其弃三张牌")
							.set("ai", () => get.event().choice)
							.set(
								"choice",
								(function () {
									const drawEff = get.effect(target, { name: "draw" }, player, player),
										discardEff = get.effect(target, { name: "guohe_copy2" }, player, player);
									return drawEff > discardEff ? 0 : 1;
								})()
							)
							.forResult();
						player.logSkill("jlsg_danjing", event.targets, null, null, [index + 1]);
						if (index == 0) {
							await player.loseHp();
							await target.draw(3);
						} else {
							await player.loseHp();
							await target.chooseToDiscard(3, "he", true);
						}
					},
					ai: {
						order: 5,
						result: {
							player(player) {
								return get.effect(player, { name: "losehp" }, player, player);
							},
							target(player, target) {
								if (get.attitude(player, target) > 0) {
									return 4;
								} else {
									return Math.min(3, target.countDiscardableCards(player, "he")) * 1.5;
								}
							},
						},
					},
				},
				jlsg_zhonghun: {
					limited: true,
					audio: "ext:极略/audio/skill:2",
					trigger: {
						player: "die",
					},
					direct: true,
					forceDie: true,
					async cost(event, trigger, player) {
						event.result = await player
							.chooseTarget(get.prompt2("jlsg_zhonghun"), (_, player, target) => {
								return player != target;
							})
							.set("forceDie", true)
							.set("ai", target => {
								return get.attitude(get.player(), target);
							})
							.forResult();
					},
					async content(event, trigger, player) {
						const target = event.targets[0],
							skills = player.getSkills(null, false, false).filter(skill => {
								if (!lib.translate[skill] || !lib.translate[skill + "_info"]) {
									return false;
								}
								const info = lib.skill[skill];
								return info && !info.vanish && !info.temp && !info.charlotte;
							});
						await target.addSkills(skills);
					},
				},
			},
			translate: {
				jlsg_danjing_info: "出牌阶段限一次，你可以失去1点体力，然后令一名其他角色摸三张牌或弃置三张牌。",
				jlsg_zhonghun_info: "限定技，当你死亡时，你可以令一名其他角色获得你当前的所有技能。",
			},
			info: ["male", "shen", 5, ["jlsg_danjing", "jlsg_zhonghun"], ["wei", "name:夏侯|惇", "noZhuHp"]],
		},
	},
	jlsgsoul_zhangliao: {
		1: {
			skill: {
				jlsg_nizhan: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						global: "damageEnd",
					},
					filter(event, player) {
						if (event.source == player && event.player == player) {
							return false;
						}
						return ["sha", "juedou"].includes(event.card?.name) && event.notLink();
					},
					async cost(event, trigger, player) {
						event.result = await player
							.chooseTarget(get.prompt("jlsg_nizhan"), "令一名角色获得一枚「袭」标记")
							.set("filterTarget", (_, player, target) => {
								const targetx = get.event().targetsx;
								return targetx.includes(target) && target != player;
							})
							.set("ai", target => -get.attitude(get.player(), target))
							.set("targetsx", [trigger.source, trigger.player].unique())
							.forResult();
					},
					async content(event, trigger, player) {
						event.targets[0].addMark("jlsg_nizhan_mark", 1);
					},
					subSkill: {
						mark: {
							charlotte: true,
							onremove: true,
							marktext: "袭",
							intro: {
								content: "共有#个标记",
							},
						},
					},
					ai: {
						threaten(player) {
							if (player.hasSkill("jlsg_cuifeng")) {
								return 4.5;
							}
							return 0;
						},
					},
				},
				jlsg_cuifeng: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "phaseJieshuBegin",
					},
					filter(player) {
						return game.countPlayer(current => current.countMark("jlsg_nizhan_mark")) >= 4;
					},
					forced: true,
					async content(event, trigger, player) {
						const targets = game.filterPlayer().sortBySeat();
						for (const target of targets) {
							if (!target.hasMark("jlsg_nizhan_mark")) {
								continue;
							}
							const hs = target.gettGainableCards(player, "h"),
								marks = target.countMark("jlsg_nizhan_mark");
							if (hs.length >= marks) {
								await player.gainPlayerCard("摧锋", target, "h", get.select(marks));
							} else {
								await player.gain(target, hs, "give");
								await target.damage(1, player);
							}
						}
						for (const target of targets) {
							if (target.hasMark("jlsg_nizhan_mark")) {
								target.removeMark("jlsg_nizhan_mark", target.countMark("jlsg_nizhan_mark"));
							}
						}
					},
				},
				jlsg_weizhen: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						player: "phaseZhunbeiBegin",
					},
					filter(event, player) {
						return game.hasPlayer(current => current.hasMark("jlsg_nizhan_mark"));
					},
					prompt2(event, player) {
						let num = game.countPlayer(current => current.countMark("jlsg_nizhan_mark"));
						return "移除场上全部的【袭】标记，然后摸" + num + "张牌";
					},
					check(event, player) {
						if (player.countCards("h") == 0 || player.hp == 1) {
							return 1;
						}
						return 0;
					},
					async content(event, trigger, player) {
						let num = 0;
						for (let target of game.filterPlayer().sortBySeat()) {
							if (!target.hasMark("jlsg_nizhan_mark")) {
								continue;
							}
							num += target.countMark("jlsg_nizhan_mark");
							target.removeMark("jlsg_nizhan_mark", target.countMark("jlsg_nizhan_mark"));
						}
						await game.delay();
						await player.draw(num);
					},
				},
			},
			translate: {
				jlsg_nizhan_info: "每当一名角色受到【杀】或【决斗】造成的一次伤害后，你可以令该角色或伤害来源(不为你)获得一枚「袭」标记。",
				jlsg_cuifeng_info: "锁定技，结束阶段，若场上的「袭」标记总数不小于4，你依次从每名被标记的角色处获得等同于其「袭」标记数量的手牌。若该角色手牌不足，则你获得其全部手牌，然后你对其造成的一点伤害。最后移除场上全部的「袭」标记。",
				jlsg_weizhen_info: "准备阶段，你可以移除场上全部的「袭」标记，然后摸等同于「袭」标记数量的牌。",
			},
		},
	},
};
