import { lib, game, ui, get, ai, _status } from "../../../noname.js";
let jlsg_qs = {
	name: "jlsg_qs",
	connect: true,
	card: {
		jlsgqs_kongmingdeng: {
			recastable: true,
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			skills: ["jlsgqs_kongmingdeng_skill"],
			onLose: async function (event, trigger, player) {
				player.addTempSkill("jlsgqs_kongmingdeng_skill_lose");
			},
			ai: {
				basic: {
					equipValue: 8,
				},
			},
		},
		jlsgqs_muniu: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			recastable: true,
			skills: ["jlsgqs_muniu_skill"],
			onLose: async function (event, trigger, player) {
				player.addTempSkill("jlsgqs_muniu_skill_lose");
			},
			ai: {
				basic: {
					equipValue(card, player) {
						if (player.countCards("h", { type: "basic" }) < 1) {
							return 5;
						}
						return 3;
					},
				},
			},
		},
		jlsgqs_yuxi: {
			fullskin: true,
			type: "equip",
			recastable: true,
			subtype: "equip5",
			skills: ["jlsgqs_yuxi_skill", "jlsgqs_yuxi_skill_give"],
			ai: {
				basic: {
					equipValue: 9,
				},
			},
		},
		jlsgqs_taipingyaoshu: {
			fullskin: true,
			type: "equip",
			recastable: true,
			subtype: "equip5",
			enable: true,
			skills: ["jlsgqs_taipingyaoshu_skill"],
			onEquip: async function (event, trigger, player) {
				const { result } = await player
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
							return 15 - ai.get.value(card);
						}
						return 8 - ai.get.value(card);
					})
					.set("prompt2", "太平要术：弃置一张红色手牌，否则失去1点体力");
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
		jlsgqs_dunjiatianshu: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			recastable: true,
			skills: ["jlsgqs_dunjiatianshu_skill"],
			ai: {
				basic: { equipValue: 7 },
			},
		},
		jlsgqs_qixingbaodao: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			recastable: true,
			skills: ["jlsgqs_qixingbaodao_skill"],
			ai: {
				basic: { equipValue: 4 },
			},
		},
		jlsgqs_xiujian: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			skills: ["jlsgqs_xiujian_skill"],
			recastable: true,
			loseDelay: false,
			onLose: async function (event, trigger, player) {
				player.addTempSkill("jlsgqs_xiujian_skill_lose");
			},
			ai: {
				order: 9.5,
				basic: {
					equipValue: 6,
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
				const shownCards = await target
					.chooseCard("请展示一张手牌", true, "h")
					.set("ai", card => {
						const evt = _status.event.getParent();
						if (get.recoverEffect(evt.target, evt.player, evt.target) > get.recoverEffect(evt.player, evt.player, evt.target)) {
							return get.number(card);
						} else {
							return 14 - get.number(card);
						}
					})
					.forResultCards();
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
				const discardCards = await player
					.chooseToDiscard()
					.set("ai", card => {
						const evt = _status.event.getParent();
						let value = -get.value(card);
						value += get.number(evt.card2, evt.target) >= get.number(card, evt.player) ? get.recoverEffect(evt.target, evt.player, evt.player) : get.recoverEffect(evt.player, evt.player, evt.player);
						return value;
					})
					.set("prompt", false)
					.forResultCards();
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
							if (hs[i].number >= 9 && ai.get.value(hs[i]) < 7) {
								bool = true;
								break;
							}
						}
						if (!bool) {
							return ai.get.recoverEffect(target);
						}
						return 0;
					},
				},
				tag: {
					recover: 1,
				},
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
			effect() {
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
			range: { attack: 1 },
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
				const control = await target
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
					.forResultControl();
				if (control == "获得你两张牌") {
					await player.gainPlayerCard(target, "h", 2, true);
				} else if (control == "对你造成伤害") {
					await target.damage("fire");
				}
			},
			ai: {
				wuxie(target, card, player, viewer) {
					if (get.attitude(viewer, target) > 0) {
						if (target.hasSkillTag("nofire")) {
							return 0;
						}
						if (target.hasSkillTag("nodamage")) {
							return 0;
						}
						if (target.hasSkillTag("notrick")) {
							return 0;
						}
					}
				},
				basic: {
					order: 3,
					value: 5.5,
					useful: 1,
				},
				result: {
					target: function (player, target) {
						if (target.hasSkillTag("nofire")) {
							return 1;
						}
						if (player == target) {
							return -2;
						}
						var nh = target.countCards("h");
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
					damage: 1,
					fireDamage: 1,
					natureDamage: 1,
				},
			},
		},
		jlsgqs_caochuanjiejian: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			selectTarget: -1,
			filterTarget(card, player, target) {
				return target != player;
			},
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				const { result } = await target
					.chooseToUse(player, "草船借箭：对" + get.translation(player) + "使用一张杀，或令其获得你的一张牌")
					.set("filterCard", (card, player) => {
						if (get.name(card, player) != "sha") {
							return false;
						}
						return lib.filter.filterCard.apply(this, arguments);
					})
					.set("respondTo", [player, event.card])
					.set("targetRequired", true);
				if (!result.bool && target.countGainableCards(player, "he") > 0) {
					await player.gainPlayerCard(target, "he", true);
				}
			},
			ai: {
				basic: {
					order: 6,
					useful: 3,
				},
				wuxie(target, card, player, viewer) {
					if (target.hasSha() && get.attitude(target, player) < -2 && Math.random() < 0.5) {
						return;
					}
					if (get.attitude(viewer, target) > 0 && get.effect(target, { name: "shunshou" }, player, viewer) > 0) {
						return 0;
					}
				},
				result: {
					target(player, target) {
						var num = 0;
						for (var i = 0; i < game.players.length; i++) {
							if (game.players[i].ai.shown == 0) {
								num++;
							}
						}
						if (num > 1) {
							return 0;
						}
						var nh = target.countCards("h");
						if (nh > 2) {
							return -0.5;
						}
						if (nh == 1) {
							return -2;
						}
						return -0.8;
					},
					player(player, target) {
						var num = 0;
						if (ai.get.attitude(target, player) < -1) {
							num--;
						}
						if (ai.get.attitude(target, player) > 1) {
							num++;
						}
						if (target.countCards("h") == 0) {
							return 0;
						}
						if (target.countCards("h") == 1) {
							return -0.5;
						}
						if (player.hp <= 1) {
							return -2;
						}
						if (target.countCards("h", "sha") == 0 && Math.random() < 0.5) {
							return 1;
						}
						return num - 1;
					},
				},
				tag: {
					respond: 1,
					respondSha: 1,
					multitarget: 1,
					multineg: 1,
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
			ignoreTarget(card, player, target) {
				return (target.isHealthy() && target.hp == 1) || target.hp < 1;
			},
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				if (target.hp > 1) {
					await target.draw(2, "nodelay");
				} else {
					await target.recover(1);
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
				if (target.hp > 1) {
					await target.draw(2);
				} else {
					await target.recover();
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
									if (target != game.players[i] && ai.get.attitude(target, game.players[i]) >= 3) {
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
						var att = ai.get.attitude(player, target);
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
	},
	skill: {
		jlsgqs_kongmingdeng_skill: {
			equipSkill: true,
			popname: true,
			enable: ["chooseToUse", "chooseToRespond"],
			viewAs: { name: "tao" },
			viewAsFilter(player) {
				return player.countVCards("e", "jlsgqs_kongmingdeng") != 0 && _status.event.type == "dying";
			},
			selectCard: 1,
			position: "e",
			filterCard(card, player) {
				return card.name == "jlsgqs_kongmingdeng";
			},
			check: () => true,
			prompt: "将孔明灯当【桃】使用",
			ai: {
				threaten: 1.5,
				save: true,
				skillTagFilter(player) {
					return player.countVCards("e", "jlsgqs_kongmingdeng");
				},
			},
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
				const { result } = await player
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
					);
				if (!result.bool) {
					await player.loseHp(1);
				}
			},
			sub: true,
			sourceSkill: "jlsgqs_muniu_skill",
			priority: -25,
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
						var att = get.attitude(player, target);
						if (target.countCards("h") >= 4) {
							return 0;
						}
						if (target.countCards("h") == 0 && att > 0) {
							return 2;
						}
						var num = target.countCards("h");
						if (att > 0) {
							return att - num;
						}
					},
				},
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
		jlsgqs_xiujian_skill_lose: {
			equipSkill: true,
			charlotte: true,
			audio: false,
			trigger: {
				player: "loseAfter",
				global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
			},
			filter(event, player, name, card) {
				return card?.name == "jlsgqs_xiujian";
			},
			getIndex(event, player) {
				const evt = event.getl(player);
				const lostCards = [];
				evt.es.forEach(card => {
					const VEquip = evt.vcard_map.get(card);
					if (VEquip?.name === "jlsgqs_xiujian") {
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
		jlsgqs_jinnangdai_skill: {
			equipSkill: true,
			mod: {
				maxHandcard(player, num) {
					return num + 1;
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
		jlsgqs_shuiyanqijun_skill: {
			cardSkill: true,
			charlotte: true,
			hidden: true,
			audio: "ext:极略/audio/card:1",
			trigger: { player: "phaseUseBegin" },
			forced: true,
			async content(event, trigger, player) {
				let num = Math.ceil(player.countDiscardableCards(player, "h") / 2);
				await player.chooseToDiscard(num, "h", true);
			},
		},
	},
	translate: {
		jlsg_qs: "七杀包",
		jlsgqs_kongmingdeng: "孔明灯",
		jlsgqs_kongmingdeng_info: "任意角色处于濒死状态时，你可以将你装备区的【孔明灯】当【桃】使用；锁定技，当你从装备区中失去【孔明灯】时，回复1点体力",
		jlsgqs_muniu: "木牛流马",
		jlsgqs_muniu_info: "出牌阶段限一次，你可以将一张手牌交给一名其他角色，然后摸一张牌；锁定技，当你从装备区中失去【木牛流马】时，须弃置一张基本牌或者失去1点体力",
		jlsgqs_taipingyaoshu: "太平要术",
		jlsgqs_taipingyaoshu_info: "出牌阶段限一次，你可以令一名角色摸一张牌；锁定技，当【太平要术】置入你的装备区时，你须弃置一张红色手牌或者失去1点体力",
		jlsgqs_dunjiatianshu: "遁甲天书",
		jlsgqs_dunjiatianshu_info: "锁定技，若你的装备区没有坐骑牌，其他角色计算与你的距离时，始终+1，你计算与其他角色的距离时，始终-1；锁定技，若你的装备区有坐骑牌，你的手牌上限+1",
		jlsgqs_qixingbaodao: "七星宝刀",
		jlsgqs_qixingbaodao_info: "当你使用的【杀】被目标角色的【闪】响应后，你可以将装备区的【七星宝刀】交给该名角色，然后获得其装备区的一张牌",
		jlsgqs_xiujian: "袖箭",
		jlsgqs_xiujian_info: "回合开始阶段开始时，你可以弃置你装备区中的【袖箭】，然后对一名其他角色造成一点伤害；锁定技，当你从装备区失去【袖箭】时，你摸一张牌",
		jlsgqs_yuxi: "玉玺",
		jlsgqs_yuxi_info: "锁定技，你的手牌上限+2，回合开始阶段开始时，你摸一张牌；一名角色使用【杀】对你造成伤害时，可获得你装备区中的【玉玺】",
		jlsgqs_jinnangdai: "锦囊袋",
		jlsgqs_jinnangdai_info: "锁定技，你的手牌上限+1；你失去装备区里的【锦囊袋】时，摸一张牌。",
		jlsgqs_qingmeizhujiu: "青梅煮酒",
		jlsgqs_qingmeizhujiu_info: "出牌阶段对一名有手牌的其他角色使用，该角色展示一张手牌，然后你可以弃置一张点数大于此牌的手牌并回复一点体力，或者弃置一张点数不大于此牌的手牌令其回复一点体力",
		jlsgqs_shuiyanqijun: "水淹七军",
		jlsgqs_shuiyanqijun_info: "出牌阶段，对你攻击范围内的一名其他角色使用。若判定结果不为方片，则该角色出牌阶段开始时须弃置一半数量的手牌（向上取整）",
		jlsgqs_yuqingguzong: "欲擒故纵",
		jlsgqs_yuqingguzong_info: "出牌阶段，对你攻击范围内的一名其他角色使用。你令该角色摸一张牌，然后其选择一项：令你获得其两张手牌，或受到1点火焰伤害",
		jlsgqs_caochuanjiejian: "草船借箭",
		jlsgqs_caochuanjiejian_info: "出牌阶段，对除你以外的所有角色使用。每名目标角色须依次选择一项：对你使用一张【杀】；或令你获得其一张牌。",
		jlsgqs_wangmeizhike: "望梅止渴",
		jlsgqs_wangmeizhike_info: "出牌阶段，对所有角色使用。每名目标角色：若体力值为1，则回复1点体力；若体力值大于1，则摸两张牌",
		jlsgqs_mei: "梅",
		jlsgqs_mei_info: "出牌阶段，对一名角色使用，若其体力值大于1，则摸两张牌；否则其回复1点体力。一名其他角色处于濒死状态时，对其使用，其回复1点体力，若因此脱离濒死状态，该角色摸一张牌。",
	},
	list: [
		["spade", 4, "sha"],
		["spade", 5, "sha"],
		["heart", 8, "sha"],
		["diamond", 8, "sha"],
		["diamond", 9, "sha"],
		["club", 6, "sha"],
		["club", 7, "sha"],
		["heart", 9, "sha", "fire"],
		["diamond", 7, "sha", "fire"],
		["spade", 6, "sha", "thunder"],
		["spade", 7, "sha", "thunder"],
		["club", 4, "sha", "thunder"],
		["club", 5, "sha", "thunder"],
		["heart", 10, "shan"],
		["heart", 11, "shan"],
		["diamond", 5, "shan"],
		["diamond", 6, "shan"],
		["diamond", 10, "shan"],
		["diamond", 11, "shan"],
		["spade", 10, "jlsgqs_mei"],
		["heart", 4, "jlsgqs_mei"],
		["heart", 6, "jlsgqs_mei"],
		["club", 9, "jlsgqs_mei"],
		["club", 10, "jlsgqs_mei"],
		["club", 11, "jlsgqs_mei"],
		["spade", 8, "jiu"],
		["diamond", 1, "jlsgqs_shuiyanqijun"],
		["club", 3, "jlsgqs_shuiyanqijun"],
		["heart", 3, "jlsgqs_caochuanjiejian"],
		["diamond", 4, "jlsgqs_caochuanjiejian"],
		["club", 13, "jlsgqs_wangmeizhike"],
		["spade", 11, "jlsgqs_yuqingguzong"],
		["heart", 5, "jlsgqs_yuqingguzong"],
		["diamond", 13, "jlsgqs_yuqingguzong"],
		["club", 12, "jlsgqs_yuqingguzong"],
		["spade", 9, "jlsgqs_qingmeizhujiu"],
		["heart", 7, "jlsgqs_qingmeizhujiu"],
		["club", 8, "jlsgqs_qingmeizhujiu"],
		["spade", 3, "wuxie"],
		["heart", 12, "wuxie"],
		["diamond", 3, "jlsgqs_jinnangdai"],
		["heart", 1, "jlsgqs_taipingyaoshu"],
		["diamond", 12, "jlsgqs_muniu"],
		["heart", 13, "jlsgqs_kongmingdeng"],
		["club", 1, "jlsgqs_dunjiatianshu"],
		["spade", 13, "jlsgqs_yuxi"],
		["spade", 1, "jlsgqs_xiujian"],
		["spade", 12, "jlsgqs_qixingbaodao"],
	],
};
async function prepareEquip(event, trigger, player) {
	const emptySlots = player.countEmptySlot("equip3") + player.countEmptySlot("equip5");
	if (emptySlots) {
		if (player.countEmptySlot("equip3")) {
			event.card.subtypes = ["equip3"];
		} else {
			event.card.subtypes = ["equip5"];
		}
	} else {
		const subtypesList = player
			.getCards("e", card => get.subtypes(card).includes("equip3") || get.subtypes(card).includes("equip5"))
			.flatMap(card => get.subtypes(card))
			.unique();
		let result;
		if (subtypesList.length == 1) {
			result = { control: subtypesList[0] };
		} else {
			result = await player
				.chooseControl(subtypesList)
				.set("prompt", `请选择置入【${get.translation(event.card)}】的装备栏`)
				.forResult();
		}
		if (result?.control) {
			event.card.subtypes = [result.control];
		}
	}
}
for (let cardName in jlsg_qs.card) {
	let card = jlsg_qs.card[cardName];
	if (card.fullskin) {
		if (_status.evaluatingExtension) {
			card.image = `db:extension-极略/image/card/${cardName}.png`;
		} else {
			card.image = `ext:极略/image/card/${cardName}.png`;
		}
	}
	if (card.audio === true) {
		card.audio = `ext:audio/card/极略`;
	}
	// 七杀特殊宝物规则
	if (!lib.config.extension_极略_qsRelic || card.type != "equip") {
		continue;
	}
	if (["equip1", "equip3", "equip4", "equip5", "equip6"].includes(card.subtype)) {
		if (card.subtype != "equip1") {
			if (card.subtype == "equip5") {
				if (!card.recastable) {
					card.recastable = true;
				}
			}
			card.prepareEquip = prepareEquip;
		} else if (get.mode() == "boss") {
			card.recastable = true;
		}
	}
}
for (let skill in jlsg_qs.skill) {
	let info = skill.split("_");
	let translate = info[0] + "_" + info[1];
	if (translate in jlsg_qs.translate) {
		jlsg_qs.translate[skill] = jlsg_qs.translate[translate];
	}
}

export let card = jlsg_qs;
