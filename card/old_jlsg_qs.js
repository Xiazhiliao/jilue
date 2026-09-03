import { lib, game, ui, get, ai, _status } from "../../../noname.js";
let old_jlsg_qs = {
	card: {
		jlsgqs_taipingyaoshu: {
			fullskin: true,
			type: "equip",
			recastable: true,
			subtype: "equip5",
			enable: true,
			skills: ["jlsgqs_taipingyaoshu_skill"],
			onEquip: async function (event, trigger, player) {
				const result = await player
					.chooseToDiscard("h", function (card) {
						if (get.color(card) != "red") {
							return false;
						}
						return lib.filter.cardDiscardable.apply(this, arguments);
					})
					.set("ai", function (card) {
						const player = get.player();
						if (card.name == "tao") {
							return -10;
						}
						if (card.name == "jiu" && player.hp == 1) {
							return -10;
						}
						if (player.hp == 1) {
							return 15 - get.value(card);
						}
						return 8 - get.value(card);
					})
					.set("prompt2", "太平要术：弃置一张红色手牌，否则失去1点体力")
					.forResult();
				if (!result?.bool) {
					await player.loseHp();
				}
			},
			ai: {
				basic: {
					equipValue(card, player) {
						if (player.countCards("h", { color: "red" }) < 1) {
							return 1;
						}
						return 6;
					},
				},
			},
		},
		jlsgqs_jinnangdai: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			skills: ["jlsgqs_jinnangdai_skill"],
			recastable: true,
			loseDelay: false,
			onLose: async function (event, trigger, player) {
				player.addTempSkill("jlsgqs_jinnangdai_skill_lose");
			},
			ai: {
				basic: { equipValue: 4 },
			},
		},
		jlsgqs_shuiyanqijun: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "delay",
			range: { attack: 1 },
			filterTarget(card, player, target) {
				return lib.filter.judge(card, player, target) && player != target;
			},
			judge(card) {
				if (get.suit(card) == "diamond") {
					return 2;
				}
				return -3;
			},
			judge2(result) {
				if (result.bool == false) {
					return true;
				}
				return false;
			},
			async effect(event, trigger, player, result) {
				if (result.bool == false) {
					player.addTempSkill("jlsgqs_shuiyanqijun_skill");
				}
			},
			ai: {
				basic: {
					order: 1,
					useful: 1,
					value: 7.5,
				},
				result: {
					target(player, target) {
						let eff = target.countCards("h") + 1;
						if (target.hasJudge("bingliang") || target.hasJudge("caomu")) {
							eff = Math.max(0, eff - 1.5);
						}
						if (target.hasJudge("lebu")) {
							eff /= 4;
						}
						return -eff;
					},
				},
				tag: {
					discard: 1,
					loseCard: 1,
					position: "h",
				},
			},
		},
		jlsgqs_yuqingguzong: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			selectTarget: 1,
			filterTarget(card, player, target) {
				return target != player;
			},
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				await target.draw();
				if (target.countGainableCards(player, "h") < 2) {
					await target.damage("fire");
					return;
				}
				const { control } = await target
					.chooseControl("获得你两张牌", "对你造成伤害")
					.set("prompt", `请选择一项`)
					.set("prompt2", `${get.translation(player)}对你使用【欲擒故纵】`)
					.set("ai", function () {
						const { player, target } = get.event().getParent();
						if (get.attitude(target, player) > 5) {
							return "获得你两张牌";
						}
						if (get.damageEffect(target, player, target, "fire") > 0) {
							return "对你造成伤害";
						}
						if (target.countCards("h", "tao")) {
							return "对你造成伤害";
						}
						if (target.countCards("h", "jiu") && target.hp == 1) {
							return "对你造成伤害";
						}
						if (target.hp == 1) {
							return "获得你两张牌";
						}
						return "对你造成伤害";
					})
					.forResult();
				if (control == "获得你两张牌") {
					await player.gainPlayerCard(target, "h", 2, true);
				} else if (control == "对你造成伤害") {
					await target.damage("fire");
				}
			},
			ai: {
				wuxie(target, card, player, viewer, state) {
					let eff = get.effect(target, card, player, viewer);
					if (eff * state > 0) {
						return 0;
					}
					if (target.hasSkillTag("nofire")) {
						return 0;
					} else if (target.hasSkillTag("nodamage")) {
						return 0;
					} else if (target.hasSkillTag("notrick")) {
						return 0;
					}
				},
				basic: {
					order: 3,
					value: 5.5,
					useful: 1,
				},
				result: {
					target(player, target) {
						if (target.hasSkillTag("nofire")) {
							return 0;
						} else if (target.hasSkillTag("nodamage")) {
							return 0;
						} else if (target.hasSkillTag("notrick")) {
							return 0;
						}
						if (player == target) {
							return -2;
						}
						let nh = target.countCards("h");
						if (nh > 2) {
							return -0.5;
						}
						if (nh == 1) {
							return -1;
						}
						if (nh == 1 && target.hp == 1) {
							return -2;
						}
						return -0.8;
					},
				},
				tag: {
					draw: 1,
					damage: 1,
					fireDamage: 1,
					natureDamage: 1,
				},
			},
		},
	},
	skill: {
		jlsgqs_qixingbaodao_skill: {
			equipSkill: true,
			trigger: { player: "shaMiss" },
			getIndex(event, player) {
				return player.getVEquips("jlsgqs_qixingbaodao");
			},
			filter(event, player, name, card) {
				if (card?.name != "jlsgqs_qixingbaodao") {
					return false;
				}
				return event.target?.countGainableCards(player, "e");
			},
			async cost(event, trigger, player) {
				const vcard = event.indexedData;
				event.result = await player
					.chooseBool()
					.set("createDialog", ["是否发动【七星宝刀】", vcard.cards.length ? vcard.cards : "虚拟牌"])
					.set("ai", (event, player) => {
						const { target } = get.event(),
							{ indexedData: vcard } = event;
						const es = target.getGainableCards(player, "e");
						return es.some(card => {
							if (vcard.cards?.length) {
								return get.value(vcard.cards, player) <= get.value(card, player);
							}
							return true;
						});
					})
					.set("target", trigger.target)
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { vcard };
				}
			},
			async content(event, trigger, player) {
				const vcard = event.cost_data.vcard;
				if (vcard.cards?.length) {
					await player.give(vcard.cards, trigger.target, true);
				}
				game.broadcastAll(
					function (player, vcard) {
						const cards = player.vcardsMap?.equips;
						if (cards && cards.includes(vcard)) {
							cards.remove(vcard);
						}
					},
					player,
					vcard
				);
				const cards = player.vcardsMap?.equips;
				if (!cards?.filter(card => card.name == "jlsgqs_qixingbaodao")?.length) {
					player.removeEquipTrigger(vcard, true);
				}
				player.$handleEquipChange();
				if (trigger.target.countGainableCards(player, "e")) {
					await player.gainPlayerCard("e", trigger.target, true);
				}
			},
		},
		jlsgqs_xiujian_skill: {
			equipSkill: true,
			trigger: { player: "phaseBegin" },
			getIndex(event, player) {
				return player.getVEquips("jlsgqs_xiujian");
			},
			filter(event, player, triggername, card) {
				return card?.name == "jlsgqs_xiujian";
			},
			async cost(event, trigger, player) {
				const vcard = event.indexedData;
				event.result = await player
					.chooseTarget((card, player, target) => player != target)
					.set("createDialog", ["是否发动【袖箭】", vcard.cards.length ? vcard.cards : "虚拟牌"])
					.set("ai", function (target) {
						return get.damageEffect(target, get.player(), get.player());
					})
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { vcard };
				}
			},
			async content(event, trigger, player) {
				const target = event.targets[0],
					vcard = event.cost_data.vcard;
				if (vcard.cards?.length) {
					await player.discard(vcard.cards);
				}
				game.broadcastAll(
					function (player, vcard) {
						const cards = player.vcardsMap?.equips;
						if (cards && cards.includes(vcard)) {
							cards.remove(vcard);
						}
					},
					player,
					vcard
				);
				const cards = player.vcardsMap?.equips;
				if (!cards?.filter(card => card.name == "jlsgqs_xiujian")?.length) {
					player.removeEquipTrigger(vcard, true);
				}
				player.$handleEquipChange();
				await target.damage(1, player);
			},
		},
		jlsgqs_yuxi_skill: {
			equipSkill: true,
			mod: {
				maxHandcard(player, num) {
					return num + 2;
				},
			},
			trigger: { player: "phaseBegin" },
			forced: true,
			async content(event, trigger, player) {
				await player.draw(1);
			},
		},
		jlsgqs_yuxi_skill_give: {
			equipSkill: true,
			trigger: { target: "shaHit" },
			getIndex(event, player) {
				return player.getVEquips("jlsgqs_yuxi");
			},
			filter(event, player, name, card) {
				if (player == event.player) {
					return false;
				}
				if (!event.player.isIn()) {
					return false;
				}
				return card?.name == "jlsgqs_yuxi";
			},
			async cost(event, trigger, player) {
				const vcard = event.indexedData;
				event.result = await trigger.player
					.chooseBool()
					.set("createDialog", ["是否获得【玉玺】", vcard.cards.length ? vcard.cards : "虚拟牌"])
					.set("ai", (event, player) => get.attitude(player, event.player) < 0)
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { vcard };
				}
			},
			popup: false,
			async content(event, trigger, player) {
				const vcard = event.cost_data.vcard;
				if (vcard.cards?.length) {
					await trigger.player.gain(player, vcard.cards, "giveAuto", "log");
				}
				game.broadcastAll(
					function (player, vcard) {
						const cards = player.vcardsMap?.equips;
						if (cards && cards.includes(vcard)) {
							cards.remove(vcard);
						}
					},
					player,
					vcard
				);
				const cards = player.vcardsMap?.equips;
				if (!cards?.filter(card => card.name == "jlsgqs_yuxi")?.length) {
					player.removeEquipTrigger(vcard, true);
				}
				player.$handleEquipChange();
			},
		},
		jlsgqs_dunjiatianshu_skill: {
			equipSkill: true,
			mod: {
				globalTo(from, to, distance) {
					const e1 = to.getVEquips(3),
						e2 = to.getVEquips(4);
					if (!e1.length && !e2.length) {
						return distance + 1;
					}
				},
				globalFrom(from, to, distance) {
					const e1 = from.getVEquips(3),
						e2 = from.getVEquips(4);
					if (!e1.length && !e2.length) {
						return distance - 1;
					}
				},
				maxHandcard(player, num) {
					const e1 = player.getVEquips(3),
						e2 = player.getVEquips(4);
					if (e1.length || e2.length) {
						return num + 1;
					}
				},
			},
		},
		jlsgqs_muniu_skill: {
			equipSkill: true,
			enable: "phaseUse",
			usable: 1,
			filter(event, player) {
				return player.countCards("h") != 0;
			},
			filterCard: true,
			filterTarget(card, player, target) {
				return player != target;
			},
			prompt: "请选择一名角色交给其一张牌然后你摸一张牌",
			check(card) {
				const player = get.owner(card);
				if (!ui.selected.cards.length && card.name == "du" && game.hasPlayer(p => get.attitude(player, p) < 0 && !p.hasSkillTag("nodu"))) {
					return 20;
				}
				return 8 - get.value(card);
			},
			discard: false,
			lose: false,
			delay: false,
			async content(event, trigger, player) {
				await player.give(event.cards, event.target);
				await player.draw(1);
			},
			ai: {
				expose: 0.1,
				order: 8,
				result: {
					target(player, target) {
						if (target.hasSkillTag("nogain")) {
							return 0;
						}
						if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
							if (target.hasSkillTag("nodu")) {
								return 0;
							}
							return -10;
						}
						if (target.hasJudge("lebu")) {
							return 0;
						}
						let nh = target.countCards("h");
						return Math.max(1, 5 - nh);
					},
				},
			},
		},
		jlsgqs_muniu_skill_lose: {
			equipSkill: true,
			charlotte: true,
			audio: false,
			trigger: {
				player: "loseAfter",
				global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
			},
			getIndex(event, player) {
				const evt = event.getl(player);
				const lostCards = [];
				evt.es.forEach(card => {
					const VEquip = evt.vcard_map.get(card);
					if (VEquip?.name === "jlsgqs_muniu") {
						lostCards.add(VEquip);
					}
				});
				return lostCards;
			},
			filter: (event, player, name, card) => {
				if (!card || card.name != "jlsgqs_muniu") {
					return false;
				}
				return true;
			},
			forced: true,
			async content(event, trigger, player) {
				const result = await player
					.chooseToDiscard("h", "木牛流马：请弃置一张基本牌，否则失去1点体力", function (card) {
						if (get.type(card) != "basic") {
							return false;
						}
						return lib.filter.cardDiscardable.apply(this, arguments);
					})
					.set("ai", card => {
						const { check, player } = get.event();
						if (check) {
							return 0;
						} else if (card.name == "tao") {
							return -10;
						} else if (player.hp == 1) {
							if (card.name == "jiu") {
								return -10;
							}
							return 15 - get.value(card);
						}
						return 8 - get.value(card);
					})
					.set(
						"check",
						(function () {
							const loseEff = get.effect(player, { name: "losehp" }, player, player);
							if (loseEff > 0) {
								return true;
							}
							return false;
						})()
					)
					.forResult();
				if (!result.bool) {
					await player.loseHp(1);
				}
			},
			sub: true,
			sourceSkill: "jlsgqs_muniu_skill",
			priority: -25,
		},
		jlsgqs_kongmingdeng_skill_lose: {
			equipSkill: true,
			charlotte: true,
			audio: false,
			trigger: {
				player: "loseAfter",
				global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
			},
			filter: (event, player, name, card) => {
				if (!card || card.name != "jlsgqs_kongmingdeng") {
					return false;
				}
				return player.isDamaged();
			},
			getIndex(event, player) {
				const evt = event.getl(player);
				const lostCards = [];
				evt.es.forEach(card => {
					const VEquip = evt.vcard_map.get(card);
					if (VEquip?.name === "jlsgqs_kongmingdeng") {
						lostCards.add(VEquip);
					}
				});
				return lostCards;
			},
			forced: true,
			async content(event, trigger, player) {
				await player.recover(1);
			},
			sub: true,
			sourceSkill: "jlsgqs_kongmingdeng_skill",
			priority: -25,
		},
		jlsgqs_taipingyaoshu_skill: {
			equipSkill: true,
			enable: "phaseUse",
			usable: 1,
			filterTarget: true,
			prompt: "请选择一名角色令其摸一张牌",
			async content(event, trigger, player) {
				await event.target.draw(1);
			},
			ai: {
				expose: 0.1,
				order: 9,
				result: {
					target(player, target) {
						let att = get.attitude(player, target);
						if (target.countCards("h") >= 4) {
							return 0;
						}
						if (target.countCards("h") == 0 && att > 0) {
							return 2;
						}
						let num = target.countCards("h");
						if (att > 0) {
							return att - num;
						}
					},
				},
			},
		},
		jlsgqs_jinnangdai_skill: {
			equipSkill: true,
			mod: {
				maxHandcard(player, num) {
					return num + player.countVCards("e", card => card.name == "jlsgqs_jinnangdai");
				},
			},
		},
		jlsgqs_jinnangdai_skill_lose: {
			equipSkill: true,
			charlotte: true,
			audio: false,
			trigger: {
				player: "loseAfter",
				global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
			},
			filter(event, player, name, card) {
				return card?.name == "jlsgqs_jinnangdai";
			},
			getIndex(event, player) {
				const evt = event.getl(player);
				const lostCards = [];
				evt.es.forEach(card => {
					const VEquip = evt.vcard_map.get(card);
					if (VEquip?.name === "jlsgqs_jinnangdai") {
						lostCards.add(VEquip);
					}
				});
				return lostCards;
			},
			forced: true,
			async content(event, trigger, player) {
				await player.draw(1);
			},
			sub: true,
			sourceSkill: "jlsgqs_muniu_skill",
			priority: -25,
		},
		jlsgqs_mei: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "basic",
			enable: true,
			savable(event, player) {
				return _status.event.dying != player;
			},
			selectTarget() {
				if (_status.event.type == "dying") {
					return -1;
				}
				return 1;
			},
			filterTarget: true,
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				if (target.getHp() <= 1 && target.isDamaged()) {
					await target.recover(1);
				} else {
					await target.draw(2, "nodelay");
				}
				if (target.hp > 0 && event.getParent(2).type == "dying") {
					await target.draw(1);
				}
			},
			ai: {
				basic: {
					order(card, player) {
						return get.order({ name: "tao" }, player) - 0.5;
					},
					useful: [8, 6.5],
					value: [8, 6.5],
				},
				result: {
					target: function (player, target) {
						if (target.hp == target.maxHp && target.hp == 1) {
							return 0;
						}
						var nh = target.countCards("h");
						var keep = false;
						if (nh <= target.hp) {
							keep = true;
						} else if (nh == target.hp + 1 && target.hp >= 2 && target.countCards("h", "tao") <= 1) {
							keep = true;
						}
						var mode = get.mode();
						if (target.hp >= 2 && keep && target.hasFriend()) {
							if (target.hp > 2) {
								return 0;
							}
							if (target.hp == 2) {
								for (var i = 0; i < game.players.length; i++) {
									if (target != game.players[i] && get.attitude(target, game.players[i]) >= 3) {
										if (game.players[i].hp <= 1) {
											return 0;
										}
										if (mode == "identity" && game.players[i].isZhu && game.players[i].hp <= 2) {
											return 0;
										}
									}
								}
							}
						}
						if (target.hp < 0 && target != player && target.identity != "zhu") {
							return 0;
						}
						var att = get.attitude(player, target);
						if (att < 3 && att >= 0 && player != target) {
							return 0;
						}
						var tri = _status.event.getTrigger();
						if (mode == "identity" && player.identity == "fan" && target.identity == "fan") {
							if (tri && tri.name == "dying" && tri.source && tri.source.identity == "fan" && tri.source != target) {
								var num = 0;
								for (let aplayer of game.players) {
									if (aplayer.identity == "fan") {
										num += aplayer.countCards("h", "tao");
										if (num > 2) {
											return 2;
										}
									}
								}
								if (num > 1 && player == target) {
									return 2;
								}
								return 0;
							}
						}
						if (mode == "identity" && player.identity == "zhu" && target.identity == "nei") {
							if (tri && tri.name == "dying" && tri.source && tri.source.identity == "zhong") {
								return 0;
							}
						}
						if (mode == "stone" && target.isMin() && player != target && tri && tri.name == "dying" && player.side == target.side && tri.source != target.getEnemy()) {
							return 0;
						}
						return 2;
					},
				},
				tag: {
					recover: 1,
					save: 1,
				},
			},
		},
		jlsgqs_qingmeizhujiu: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			selectTarget: 1,
			filterTarget(card, player, target) {
				return target.countCards("h") != 0 && player != target;
			},
			async content(event, trigger, player) {
				const target = event.target;
				if (!target.countCards("h")) {
					return;
				}
				const { cards: shownCards } = await target
					.chooseCard("请展示一张手牌", true, "h")
					.set("ai", card => {
						const evt = _status.event.getParent();
						if (get.recoverEffect(evt.target, evt.player, evt.target) > get.recoverEffect(evt.player, evt.player, evt.target)) {
							return get.number(card);
						} else {
							return 14 - get.number(card);
						}
					})
					.forResult();
				if (!shownCards?.length) {
					return;
				}
				await target.showCards(shownCards).setContent(function () {});
				event.dialog = ui.create.dialog(get.translation(target) + "展示的手牌", shownCards);
				event.videoId = lib.status.videoId++;
				game.broadcast("createDialog", event.videoId, get.translation(target) + "展示的手牌", shownCards);
				game.addVideo("cardDialog", null, [get.translation(target) + "展示的手牌", get.cardsInfo(shownCards), event.videoId]);
				event.card2 = shownCards[0];
				game.log(target, "展示了", event.card2);
				game.addCardKnower(shownCards, "everyone");
				const { cards: discardCards } = await player
					.chooseToDiscard()
					.set("ai", card => {
						const evt = _status.event.getParent();
						let value = -get.value(card);
						value += get.number(evt.card2, evt.target) >= get.number(card, evt.player) ? get.recoverEffect(evt.target, evt.player, evt.player) : get.recoverEffect(evt.player, evt.player, evt.player);
						return value;
					})
					.set("prompt", false)
					.forResult();
				await game.delayx(2);
				if (discardCards?.length) {
					if (get.number(discardCards[0]) <= get.number(event.card2, target)) {
						await target.recover(1);
					} else {
						await player.recover(1);
					}
				}
				event.dialog.close();
				game.addVideo("cardDialog", null, event.videoId);
				game.broadcast("closeDialog", event.videoId);
			},
			ai: {
				basic: {
					order: 4,
					useful: [2, 1],
					value: 1,
				},
				wuxie(target, card, player, current, state) {
					if (get.attitude(current, player) >= 0 && state > 0) {
						return false;
					}
				},
				result: {
					target(player, target) {
						if (target.hp == target.maxHp) {
							return 0;
						}
						if (player.hp == player.maxHp) {
							return 0;
						}
						if (target.hp == 1) {
							return 2;
						}
						let hs = player.countCards("h"),
							bool = false;
						for (let i = 0; i < hs.length; i++) {
							if (hs[i].number >= 9 && get.value(hs[i]) < 7) {
								bool = true;
								break;
							}
						}
						if (!bool) {
							return get.recoverEffect(target);
						}
						return 0;
					},
				},
				tag: {
					recover: 1,
				},
			},
		},
		jlsgqs_wangmeizhike: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			selectTarget: -1,
			filterTarget: true,
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				if (target.getHp() <= 1 && target.isDamaged()) {
					await target.recover(1);
				} else {
					await target.draw(2, "nodelay");
				}
			},
			ai: {
				basic: {
					order: 6.5,
					useful: 4,
					value: 10,
				},
				wuxie(target, card, player, viewer) {
					if (get.attitude(viewer, target) < 0 && target.hp == 1) {
						if (Math.random() < 0.7) {
							return 1;
						}
						return 0;
					}
				},
				result: {
					target(player, target) {
						if (target.hp == 1) {
							return 2;
						}
						if (get.mode() == "identity") {
							if (target.isZhu && target.hp <= 1) {
								return 10;
							}
						}
						if (target.countCards("h") < 1) {
							return 1.5;
						}
						return 1;
					},
				},
				tag: {
					draw: 2,
					recover: 1,
					multitarget: 1,
				},
			},
		},
	},
	translate: {
		jlsgqs_qixingbaodao_info: "当你使用的【杀】被目标角色的【闪】响应后，你可以将装备区的【七星宝刀】交给该名角色，然后获得其装备区的一张牌。",
		jlsgqs_xiujian_info: "准备阶段开始时，你可以弃置你装备区中的【袖箭】，然后对一名其他角色造成一点伤害；锁定技，当你从装备区失去【袖箭】时，你摸一张牌。",
		jlsgqs_yuxi_info: "锁定技，你的手牌上限+2，准备阶段开始时，你摸一张牌；一名角色使用【杀】对你造成伤害时，可获得你装备区中的【玉玺】。",
		jlsgqs_dunjiatianshu_info: "锁定技，若你的装备区没有坐骑牌，其他角色计算与你的距离时，始终+1，你计算与其他角色的距离时，始终-1；锁定技，若你的装备区有坐骑牌，你的手牌上限+1。",
		jlsgqs_taipingyaoshu_info: "出牌阶段限一次，你可以令一名角色摸一张牌；锁定技，当【太平要术】置入你的装备区时，你须弃置一张红色手牌或者失去1点体力。",
		jlsgqs_jinnangdai_info: "锁定技，你的手牌上限+1；你失去装备区里的【锦囊袋】时，摸一张牌。",
		jlsgqs_mei_info: "出牌阶段，对一名角色使用。令其摸两张牌；若其体力值为1且已受伤，则改为回复1点体力。一名其他角色濒死时，对其使用，令其回复1点体力；若其因此脱离濒死状态，其摸一张牌。",
		jlsgqs_qingmeizhujiu_info: "出牌阶段对一名有手牌的其他角色使用，该角色展示一张手牌，然后你可以弃置一张点数大于此牌的手牌并回复一点体力，或者弃置一张点数不大于此牌的手牌令其回复一点体力",
		jlsgqs_wangmeizhike_info: "出牌阶段，对所有角色使用。每名目标角色：若体力值为1且已受伤，则回复1点体力；否则其摸两张牌",
		jlsgqs_yuqingguzong_info: "出牌阶段，对你攻击范围内的一名其他角色使用。你令该角色摸一张牌，然后其选择一项：令你获得其两张手牌，或受到1点火焰伤害",
		jlsgqs_shuiyanqijun_info: "出牌阶段，对你攻击范围内的一名其他角色使用。若判定结果不为方片，则该角色本回合下个出牌阶段开始时须弃置一半数量的手牌（向上取整）。",
	},
};
export default old_jlsg_qs;
