import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsr_zhugeliang: {
		1: {
			skill: {
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
							.set("filterTarget", (card, player, target) => target == get.event().target2);
						if (!result1?.bool) {
							await player.discardPlayerCard("he", target1);
						}
						const { result: result2 } = await target2
							.chooseToUse(`######请对${get.translation(player)}使用一张【杀】，否则其弃置你一张牌`)
							.set("source", player)
							.set("filterCard", (card, player) => get.name(card, player) == "sha")
							.set("filterTarget", (card, player, target) => target == get.event().source);
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
			},
			translate: {
				jlsg_sanfen_info: "出牌阶段限一次，你可以选择两名其他角色，其中一名你选择的角色须对另一名角色使用一张【杀】，然后另一名角色须对你使用一张【杀】，你弃置不如此做者一张牌。（有距离限制）",
				jlsg_guanxing_info: "回合开始/结束阶段开始时，你可以观看牌堆顶的X张牌（X为存活角色的数量，且最多为3），将其中任意数量的牌以任意顺序置于牌堆顶，其余以任意顺序置于牌堆底。",
				jlsg_weiwo_info: "锁定技，当你有手牌时，你防止受到的属性伤害；当你没有手牌时，你防止受到的非属性伤害。",
			},
		},
	},
	jlsgsr_simayi: {
		1: {
			skill: {
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
									if (player.hasSkillTag("jueqing", false, target)) {
										return [1, -1.5];
									}
									if (get.attitude(target, player) < 0) {
										return [1, 1];
									}
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
							if (!target.storage.jlsg_zhuizun) {
								return 0.6;
							}
						},
						save: true,
						skillTagFilter: function (player) {
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
			},
			translate: {
				jlsg_guicai_info: "在任意角色的判定牌生效前，你可以选择一项：1、打出一张手牌代替之。2、亮出牌堆顶的一张牌代替之。",
				jlsg_langgu_info: "每当你造成或受到一次伤害后，你可以进行一次判定，若为黑色，你获得对方一张牌。",
				jlsg_zhuizun_info: "限定技，当你进入濒死状态时，你可以恢复体力至1点，令所有其他角色依次交给你一张手牌。然后当前回合结束后，你进行1个额外的回合。",
			},
		},
	},
	jlsgsr_sunquan: {
		1: {
			skill: {
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
									if (ui.selected.cards.length > 0) {
										return -1;
									}
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
						if (player.skipList.includes("phaseUse")) {
							return 1;
						}
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
							if (player.isDamaged()) {
								return type == "basic" ? 2 : -1;
							}
							if (shaTarget && player.countCards("h", "sha") && !player.countCards("h", "jiu")) {
								return type == "basic" ? 1 : -1;
							}
							if (lose > recover && lose > 0) {
								return type == "trick" ? 1 : -1;
							}
							if (lose < recover && recover > 0) {
								return type == "trick" ? 1 : -1;
							}
							if (equipTarget) {
								return type == "equip" ? 1 : -1;
							}
							if (shunTarget || chaiTarget) {
								return type == "trick" ? 1 : -1;
							}
							if (shaTarget && !player.countCards("h", "sha")) {
								return type == "basic" ? 1 : -1;
							}
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
												if (!lib.translate[i + "_info"]) {
													continue;
												}
												// if (lib.card[i].mode && lib.card[i].mode.includes(lib.config.mode) == false) continue;
												if (lib.card[i].type == "trick") {
													list.push(["锦囊", "", i]);
												}
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
											if (lose > recover && lose > 0) {
												return button.link[2] == "nanman" ? 1 : -1;
											}
											if (lose < recover && recover > 0) {
												return button.link[2] == "taoyuan" ? 1 : -1;
											}
											if (shunTarget) {
												return button.link[2] == "shunshou" ? 1 : -1;
											}
											if (chaiTarget) {
												return button.link[2] == "guohe" ? 1 : -1;
											}
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
												if (!lib.translate[i + "_info"]) {
													continue;
												}
												// if (lib.card[i].mode && lib.card[i].mode.includes(lib.config.mode) == false) continue;
												if (lib.card[i].type == "basic") {
													list.push(["basic", "", i]);
												}
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
											if (player.isDamaged()) {
												return button.link[2] == "tao" ? 1 : -1;
											}
											if (shaTarget && player.countCards("h", "sha") && !player.countCards("h", "jiu")) {
												return button.link[2] == "jiu" ? 1 : -1;
											}
											if (shaTarget && !player.countCards("h", "sha")) {
												return button.link[2] == "sha" ? 1 : -1;
											}
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
								if (player.hp <= 2) {
									return 3;
								}
								return player.getExpansions("jlsg_xionglve").length - 1;
							},
						},
					},
				},
			},
			translate: {
				jlsg_quanheng_info: "出牌阶段限一次，你可以将至少一张手牌当【无中生有】或【杀】使用，若你以此法使用的牌被【无懈可击】或【闪】响应时，你摸等量的牌。",
				jlsg_xionglve_info: "摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的两张牌，你获得其中一张牌，然后将另一张牌置于你的武将牌上，称为「略」。出牌阶段，你可以将一张基本牌或锦囊牌的「略」当与之同类别的任意一张牌（延时类锦囊牌除外）使用，将一张装备牌的「略」置于一名其他角色装备区内的相应位置。",
			},
		},
	},
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
						"step 1";
						if (result.bool) {
							if (!result.cards) {
								player.logSkill("jlsg_zhaoxiang", trigger.player);
							}
							if (trigger.player.countCards("he")) {
								trigger.player
									.chooseBool("令" + get.translation(player) + "获得你的一张牌或令打出的杀无效")
									.set("ai", function (event, player) {
										const trigger = event.getTrigger(),
											source = get.event().source;
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
						"step 2";
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
						if (ai.get.damageEffect(target, player, player)) {
							nono = true;
						}
						if (cards[0].name == "sha") {
							target
								.chooseToDiscard("请弃置一张【杀】，令" + get.translation(target) + "恢复1点体力，否则你受到1点伤害", { name: "sha" })
								.set("ai", function () {
									if (_status.nono == true) {
										return false;
									}
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
									if (_status.nono == true) {
										return false;
									}
									return true;
								})
								.set("nono", nono);
						}
						"step 1";
						if (cards[0].name == "shan" && result.cards) {
							target.showCards(result.cards[0]);
						}
						"step 2";
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
						"step 1";
						if (result.bool) {
							if (!result.cards) {
								player.logSkill("jlsg_zhaoxiang", trigger.player);
							}
							if (trigger.player.countCards("he")) {
								trigger.player
									.chooseBool("令" + get.translation(player) + "获得你的一张牌或令打出的杀无效")
									.set("ai", function (event, player) {
										const trigger = event.getTrigger(),
											source = get.event().source;
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
						"step 2";
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
							if (target.hasSkillTag("maixie") && target.hp > 1) {
								return 0;
							}
							if (get.recoverEffect(target, target, target) > 0) {
								return 7.5 - get.value(card);
							}
							return -1;
						};
						"step 1";
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
								if (target.hasSkillTag("maixie_hp") || target.hasSkillTag("maixie")) {
									result += 0.5;
								}
								if (target.hp == 1 && (target.countCards("h") <= 1 || target.maxHp == 1)) {
									result -= 2;
								}
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
		3: {
			skill: {
				jlsg_zhaoxiang: {
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
								if (get.event().check) {
									return get.event().getRand(button.link.cardid.toString());
								}
								return 0;
							})
							.set(
								"check",
								(function () {
									const gainEff = get.effect(trigger.player, { name: "shunshou_copy2" }, player, player),
										shaEff1 = get.effect(trigger.player, trigger.card, trigger.target, player),
										shaEff2 = get.effect(trigger.player, trigger.card, player, player);
									return gainEff + shaEff1 > 0 || gainEff + shaEff2 > 0;
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
						await player.gain(cards, target, "bySelf").set("ainimate", false);
						const { result } = await player
							.chooseControlList("招降", ["令此【杀】不能被响应", "将此【杀】的目标改为你"], true)
							.set("ai", () => get.event().choice)
							.set(
								"choice",
								(function () {
									const shaEff1 = get.effect(trigger.player, trigger.card, trigger.target, player),
										shaEff2 = get.effect(trigger.player, trigger.card, player, player);
									if (shaEff1 > shaEff2) {
										return 0;
									}
									return 1;
								})()
							);
						if (result?.index == 0) {
							game.log(player, "令", trigger.card, "不能被响应");
							trigger.getParent().directHit.addArray(game.players);
						} else if (result?.index == 1) {
							game.log(player, "将", trigger.card, "的目标", trigger.target, "改为", player);
							trigger.targets.remove(trigger.target);
							trigger.targets.add(player);
							trigger.getParent().triggeredTargets1.remove(trigger.target);
							trigger.getParent().triggeredTargets1.add(player);
							trigger.getParent().targets.remove(trigger.target);
							trigger.getParent().targets.add(player);
						}
					},
					ai: {
						expose: 0.5,
					},
				},
				jlsg_zhishi: {
					audio: "ext:极略/audio/skill:2",
					trigger: { global: "damageEnd" },
					filter(event, player) {
						return event.num > 0 && event.player.isIn();
					},
					prompt(event, player) {
						return get.prompt("jlsg_zhishi", event.player);
					},
					prompt2: "令其从你拥有的随机两个能在此时机发动的技能中选择一个并发动",
					check(event, player) {
						return get.attitude(player, event.player) > 0;
					},
					logTarget: "player",
					async content(event, trigger, player) {
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
						const skills = [];
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
							if (skills.length > 1) {
								break;
							}
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
						maixie: true,
						maixie_hp: true,
					},
				},
			},
			translate: {
				jlsg_zhaoxiang_info: "当其他角色使用【杀】指定目标时，你可以获得其一张手牌，然后选择一项：1．令此【杀】不能被响应；2．将此【杀】的目标改为你。",
				jlsg_zhishi_info: "当任意角色受到伤害后，你可以令其从随机两个能在此时机发动的技能中选择一个并发动。",
			},
		},
	},
	jlsgsr_liubei: {
		1: {
			skill: {
				jlsg_rende: {
					audio: "ext:极略/audio/skill:1",
					srlose: true,
					trigger: { global: "phaseJieshuBegin" },
					filter(event, player) {
						return player.countGainableCards(event.player, "h") && event.player.isAlive();
					},
					async cost(event, trigger, player) {
						const num = player.countGainableCards(trigger.player, "h");
						event.result = await player
							.chooseCard(get.prompt("jlsg_rende", trigger, player), [1, num])
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
							.set("source", trigger.player)
							.forResult();
						if (event.result?.bool) {
							event.result.targets = [trigger.player];
						}
					},
					async content(event, trigger, player) {
						await player.give(event.cards, trigger.player);
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
				},
				jlsg_chouxi: {
					audio: "ext:极略/audio/skill:2",
					usable: 1,
					srlose: true,
					enable: "phaseUse",
					filter(event, player) {
						return player.countDiscardableCards(player, "h");
					},
					filterCard: lib.filter.cardDiscardable,
					check(card) {
						return 6 - get.value(card);
					},
					filterTarget(card, player, target) {
						return player != target;
					},
					async content(event, trigger, player) {
						const cards = get.cards(2),
							target = event.targets[0];
						await game.cardsGotoOrdering(cards);
						await player.showCards(event.cards1);
						const types = cards.map(card => get.type2(card, false)).sort();
						let prompt = "弃置一张与展示牌类别均不同的牌,然后令" + get.translation(player) + "获得" + get.translation(event.cards1) + ",或受到来自" + get.translation(player) + "的1点伤害并获得其中一种类别的牌.";
						// value from card ownership
						let cardDiff = 0;
						for (let type of types) {
							let newCardDiff = cards.filter(c => get.type(c) == type).reduce((a, b) => a - get.value(b, player) * get.sgnAttitude(target, player) + get.value(b, target), 0);
							if (newCardDiff > cardDiff) {
								cardDiff = newCardDiff;
							}
						}
						const { result: discard } = await target
							.chooseToDiscard((card, player) => {
								return !get.event().types.includes(get.type2(card, player));
							})
							.set("dialog", [prompt, "hidden", cards])
							.set("ai", card => {
								if (card.name == "tao") {
									return -1;
								}
								return get.event().diff - get.value(card);
							})
							.set("types", types)
							.set("diff", 2.5 * get.damageEffect(target, player) - cardDiff);
						if (discard.bool) {
							await player.gain(cards, "gain2");
						} else {
							await target.damage(1, player);
							if (!target.isIn()) {
								return;
							}
							if (types.length == 1) {
								await target.gain(cards, "gain2");
							} else {
								let values = {},
									choice = 0;
								for (let card of cards) {
									let type = get.type2(card);
									values[type] = values[type] || 0;
									values[type] += get.value(card, player) + (get.attitude(player, target) < -1 ? get.value(card, target) : 0);
								}
								if (Object.keys(values).length) {
									choice = Object.keys(values).find(type => values[type] == Math.max(...Object.values(types)));
								}
								const {
									result: { control },
								} = await target
									.chooseControl(types)
									.set("dialog", ["仇袭：选择一种类型的卡牌卡牌获得之", cards])
									.set("ai", () => {
										return get.event().choice;
									})
									.set("choice", choice);
								const list = [
									[target, []],
									[player, []],
								];
								target.popup(control);
								for (let card of cards) {
									if (get.type2(card, target) == control) {
										list[0][1].push(card);
									} else {
										list[1][1].push(card);
									}
								}
								await game
									.loseAsync({
										gain_list: list,
										cards,
									})
									.setContent("gaincardMultiple");
							}
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
			},
			translate: {
				jlsg_rende_info: "任一角色的结束阶段结束时，你可以将任意数量的手牌交给该角色，然后该角色进行1个额外的出牌阶段。",
				jlsg_chouxi_info: "出牌阶段限一次，你可以弃置一张手牌并展示牌堆顶的两张牌，然后令一名其他角色选择一项：1. 弃置一张与展示牌类别均不同的牌，然后令你获得展示的牌；2. 受到你造成的1点伤害并获得其中一种类别的牌，然后你获得其余的牌。",
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
									if (player.isTurnedOver()) {
										return 3;
									}
									if (!player.isTurnedOver()) {
										return -4;
									}
								}
								if (ui.selected.cards.length == 0) {
									if (player.isTurnedOver()) {
										return 4;
									}
									if (!player.isTurnedOver()) {
										return -3;
									}
								}
							},
							target(target, player) {
								if (ui.selected.cards.length > 0) {
									if (target.isTurnedOver()) {
										return 3;
									}
									if (!target.isTurnedOver()) {
										return -4;
									}
								}
								if (ui.selected.cards.length == 0) {
									if (target.isTurnedOver()) {
										return 4;
									}
									if (!target.isTurnedOver()) {
										return -3;
									}
								}
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
			},
			translate: {
				jlsg_dailao_info: "出牌阶段限一次，你可以令一名其他角色与你各摸一张牌或各弃置一张牌，然后你与其依次将武将牌翻面。",
				jlsg_youdi_info: "若你的武将牌背面朝上，你可以翻面并视为你使用一张【闪】。你使用【闪】响应一名角色使用的【杀】时，你可以弃置任意数量的手牌，然后该角色弃置等量的牌。",
			},
		},
	},
	jlsgsr_lvbu: {
		1: {
			skill: {
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
						if (player.countCards("h") > player.maxHp) {
							return 0;
						}
						if (get.name(card) != "sha") {
							return 0;
						}
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
							if (card.name != "sha") {
								return;
							}
							if (range[1] == -1) {
								return;
							}
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
						if (cards.length) {
							prompt += "获得" + get.translation(trigger.source) + "装备区中的" + get.translation(cards);
						} else {
							prompt += "无事发生";
						}
						event.result = await player
							.chooseToDiscard("he", get.prompt("jlsg_sheji", trigger.source), prompt)
							.set("ai", function (card) {
								let eff = get.event().eff;
								if (typeof eff === "number") {
									return eff - get.value(card);
								}
								return 0;
							})
							.set(
								"eff",
								(function () {
									let es = trigger.source.getEquips(1).filter(card => {
										return lib.filter.canBeGained(card, player, trigger.source);
									});
									if (!es.length) {
										return false;
									}
									if (get.attitude(player, trigger.source) > 0) {
										return (
											-2 *
											es.reduce((acc, card) => {
												return acc + get.value(card, trigger.source);
											}, 0)
										);
									}
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
								if (get.subtype(card) == "equip1") {
									return 10 - get.value(card);
								}
								return 7 - get.equipValue(card);
							},
							mod: {
								targetInRange: function (card) {
									if (_status.event.skill == "jlsg_sheji_sha") {
										return true;
									}
								},
							},
							ai: {
								order: function () {
									return lib.card.sha.ai.order + 0.1;
								},
								respondSha: true,
								skillTagFilter: function (player) {
									if (!player.countCards("he")) {
										return false;
									}
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
								if (!map[id]) {
									map[id] = {};
								}
								if (typeof map[id].shanRequired == "number") {
									map[id].shanRequired++;
								} else {
									map[id].shanRequired = 2;
								}
							},
						},
					},
				},
			},
			translate: {
				jlsg_jiwu_info: "出牌阶段限一次，你可以将你的手牌调整至一张，若如此做，本回合你的攻击范围无限，且你下一次使用的【杀】造成的伤害+1。锁定技，若你的装备区没有牌，你使用【杀】可以额外指定至多两名目标。",
				jlsg_sheji_info: "当一名装备区有武器牌的其他角色对另一名角色造成伤害后，你可以弃置一张牌，然后获得该角色的武器牌。你可以将装备牌当无距离限制的【杀】使用或打出，你以此法使用的【杀】须连续使用两张【闪】才能抵消。",
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
							if (tag == "unequip" && arg?.card?.name == "sha" && arg?.card?.storage?.jlsg_zhaxiang) {
								return true;
							}
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
								if (card.name == "nanman" || card.name == "shandian") {
									return false;
								}
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
										if (target.hp == 1 && !target.hujia) {
											return 1.6;
										}
										if (target.hp == 2) {
											return 0.01;
										}
										return 0;
									}
								}
								let es = target.getCards("e");
								let noe = es.length == 0 || target.hasSkillTag("noe");
								let noe2 = es.length == 1 && es[0].name == "baiyin" && target.isDamaged();
								let noh = nh == 0 || target.hasSkillTag("noh");
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
					mod: {
						targetEnabled(card, player, target) {
							if (target.isTurnedOver()) {
								if (card.name == "sha" || card.name == "bingliang") {
									return false;
								}
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
};
