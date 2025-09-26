import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	jlsg_guixin: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		filter(event) {
			return event.num > 0;
		},
		getIndex(event, player) {
			return event.num;
		},
		check(event, player) {
			if (
				player.isTurnedOver() ||
				event.num > 1 ||
				(game.countPlayer() - 1 < 5 &&
					game.countPlayer(function (current) {
						return get.attitude(player, current) <= 0 && current.countGainableCards(player, "hej") > 0;
					}) >=
						game.countPlayer(function (currentx) {
							return get.attitude(player, currentx) > 0 && currentx.countGainableCards(player, "hej") > 0;
						}))
			) {
				return true;
			}
			let num = game.countPlayer(function (current) {
				if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
					return true;
				}
				if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
					return true;
				}
			});
			return num >= 2;
		},
		logTarget(event, player) {
			return game.filterPlayer(current => current != player).sortBySeat(player);
		},
		async content(event, trigger, player) {
			const targets = event.targets;
			let num = 0;
			while (num < 4) {
				for (let i = 0; i < targets.length; i++) {
					const target = targets[i];
					let gainableCards = target.getGainableCards(player, "hej");
					if (gainableCards) {
						await player.gain(gainableCards.randomGet(), target, "giveAuto", "bySelf");
					}
				}
				let history = player.getHistory("gain", evt => evt.getParent() == event);
				num = history.reduce((t, evt) => t + evt.cards.length, 0);
				if (targets.every(i => !i.countGainableCards(player, "hej"))) {
					break;
				}
			}
			await player.turnOver();
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			threaten: function (player, target) {
				if (target.hp == 1) {
					return 2.5;
				}
				return 1;
			},
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -2];
						}
						if (target.hp == 1) {
							return 0.8;
						}
						if (target.isTurnedOver()) {
							return [0, 3];
						}
						var num = game.countPlayer(function (current) {
							if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
								return true;
							}
							if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
								return true;
							}
						});
						if (num > 2) {
							return [0, 1];
						}
						if (num == 2) {
							return [0.5, 1];
						}
					}
				},
			},
		},
	},
	jlsg_feiying: {
		mod: {
			cardUsable(card, player) {
				if (player.isDamaged()) {
					return;
				}
				const color = ["unsure", "black"].includes(get.color(card, player));
				if (color && card.name == "sha") {
					return Infinity;
				}
			},
			targetInRange(card, player) {
				if (player.isDamaged()) {
					return;
				}
				const color = ["unsure", "black"].includes(get.color(card, player));
				if (color && card.name == "sha") {
					return true;
				}
			},
			cardname(card, player) {
				if (player.isHealthy()) {
					return;
				}
				const color = get.color(card, player);
				if (["unsure", "red"].includes(color) && get.type(card, null, false) == "equip") {
					return "tao";
				}
			},
			aiOrder(player, card, num) {
				if (
					player.isDamaged() ||
					!player.hasCard(card => {
						const color1 = get.color(card, player);
						return color1 == "red" && card.name == "sha";
					}, "hs")
				) {
					return;
				}
				const color2 = get.color(card, player);
				if (color2 == "black" && card.name == "sha") {
					return num - 2;
				}
			},
		},
		locked: true,
	},
	jlsg_huju: {
		audio: "ext:极略/audio/skill:true",
		trigger: { global: "phaseBegin" },
		derivation: ["zhiheng", "jlsg_hufu", "jlsg_xionglve"],
		forced: true,
		async content(event, trigger, player) {
			await player.draw(4);
			if (trigger.player == player) {
				await player.loseMaxHp(1);
				await player.removeSkills("jlsg_huju");
				await player.addSkills(lib.skill[event.name].derivation);
			}
		},
	},
	jlsg_hufu: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter: (event, player) => game.hasPlayer(current => current != player && current.countCards("e")),
		filterTarget: (card, player, target) => target != player && target.countCards("e"),
		async content(event, trigger, player) {
			var num = event.target.countCards("e");
			await event.target.chooseToDiscard(`${get.translation(player)}对你发动“虎缚”，请弃置${num}张牌`, true, [num, num], "he");
		},
		ai: {
			expose: 0.2,
			order: 9,
			result: {
				target: function (player, target) {
					return -target.countCards("e");
				},
			},
		},
	},
	/*jlsg_xionglve: {
			audio: "ext:极略/audio/skill/jlsg_xionglve1.mp3",
			marktext: `略`,
			intro: {
				markcount: "expansion",
				mark(dialog, content, player) {
					var content = player.getExpansions("jlsg_xionglve");
					if (content && content.length) {
						if (player == game.me || player.isUnderControl()) {
							dialog.addAuto(content);
						} else return "共有" + get.cnNumber(content.length) + "张略";
					}
				},
				content(content, player) {
					var content = player.getExpansions("jlsg_xionglve");
					if (content && content.length) {
						if (player == game.me || player.isUnderControl()) return get.translation(content);
						return "共有" + get.cnNumber(content.length) + "张略";
					}
				},
			},
			enable: "phaseUse",
			filter: (event, player) => player.hasCard(card => card.hasGaintag("jlsg_xionglve"), "x"),
			direct: true,
			hiddenCard: function (player, name) {
				if (!lib.inpile.includes(name) || !player.isPhaseUsing()) return false;
				var type = get.type2(name);
				return (
					(type == "basic" || type == "trick") &&
					player.hasCard(card => {
						return card.hasGaintag("jlsg_xionglve") && get.type2(card) == type;
					}, "x")
				);
			},
			chooseButton: {
				dialog(event, player) {
					var list = [];
					for (var i = 0; i < lib.inpile.length; i++) {
						var name = lib.inpile[i];
						if (!player.getExpansions("jlsg_xionglve").some(j => get.type2(j) == get.type2(name)) || get.type2(name) == "equip") continue;
						if (name == "sha") {
							if (event.filterCard({ name: name }, player, event)) list.push(["基本", "", "sha"]);
							for (var j of lib.inpile_nature) {
								if (event.filterCard({ name: name, nature: j }, player, event)) list.push(["基本", "", "sha", j]);
							}
						} else if (event.filterCard({ name: name }, player, event)) list.push([`${get.translation(get.type2(name))}`, "", name]);
					}
					var dialog = ui.create.dialog("<font size=6>雄略", "<font size=3>", "hidden");
					dialog.add("选择一张牌使用");
					dialog.add([list, "vcard"]);
					dialog.add("选择一张“略”");
					dialog.add(player.getExpansions("jlsg_xionglve"));
					return dialog;
				},
				select() {
					if (ui.selected.buttons.length && get.itemtype(ui.selected.buttons[0].link) == "card") {
						if (get.type2(ui.selected.buttons[0].link) == "equip") return 1;
					}
					return 2;
				},
				filter(button) {
					if (ui.selected.buttons.length) {
						var card = ui.selected.buttons[0].link;
						if (get.itemtype(card) == get.itemtype(button.link)) return false;
						if (get.itemtype(card) != "card") return get.type2(card[2]) == get.type2(button.link);
						else return get.type2(card) == get.type2(button.link[2]);
					} else {
						if (get.itemtype(button.link) == "card") return true;
						else return get.player().hasUseTarget(button.link[2]) > 0;
					}
				},
				check(button) {
					var player = get.player();
					if (!ui.selected.buttons.length) {
						if (player.getExpansions("jlsg_xionglve").some(i => get.type2(i) == "equip")) {
							if (get.itemtype(button.link) == "card" && get.type2(button.link) == "equip") return 1;
							else return 0;
						}
						return (
							player.getUseValue({
								name: button.link[2],
								nature: button.link[3],
							}) > 0
						);
					}
					return 1;
				},
				backup(links, player) {
					if (get.itemtype(links[1]) == "card") links.reverse();
					return {
						audio: "jlsg_xionglve",
						viewAs: function () {
							if (get.type2(links[0]) == "equip") return links[0];
							else return { name: links[1][2], nature: links[1][3] };
						},
						position: "x",
						filterCard: card => card == lib.skill.jlsg_xionglve_backup.card,
						selectCard: -1,
						filterTarget: function (card, player, target) {
							if (get.type2(links[0]) == "equip") return target != player;
							else return player.canUse({ name: links[1][2], nature: links[1][3] }, target);
						},
						selectTarget: function () {
							if (get.type2(links[0]) == "equip") return 1;
							else return lib.filter.selectTarget({ name: links[1][2], nature: links[1][3] }, get.player());
						},
						card: links[0],
						popname: true,
						precontent: function () {
							player.logSkill("jlsg_xionglve");
						},
					};
				},
				prompt: function (links, player) {
					if (get.type2(links[0]) == "equip") return "请选择" + get.translation(links[0]) + "的目标";
					else return "请选择" + get.translation(links[1][2]) + "的目标";
				},
			},
			ai: {
				fireAttack: true,
				save: true,
				respondSha: true,
				respondShan: true,
				skillTagFilter: function (player) {
					if (!player.isPhaseUsing()) return false;
					return player.hasCard(card => {
						return card.hasGaintag("jlsg_xionglve") && get.type2(card) == "basic";
					}, "x");
				},
				order: 6,
				result: {
					player: function (player) {
						if (player.hp <= 2) return 3;
						return player.getExpansions("jlsg_xionglve").length - 1;
					},
				},
			},
			group: "jlsg_xionglve_draw",
			subSkill: {
				draw: {
					audio: "ext:极略/audio/skill/jlsg_xionglve21.mp3",
					trigger: { player: "phaseDrawBegin1" },
					filter: event => !event.numFixed,
					prompt: `雄略：是否放弃摸牌，改为亮出牌堆顶的两张牌`,
					prompt2: `获得其中一张并将另一张牌置于武将牌上称为“略”`,
					check: function (event, player) {
						var num = player.getCards("h").reduce((p, c) => p + get.useful(c), 0);
						return event.num < 2 || player.hp < 3 || num < 30 || player.phaseNumber <= 1;
					},
					content: function () {
						"step 0"
						trigger.changeToZero();
						event.cards = get.cards(2);
						game.cardsGotoOrdering(event.cards);
						event.videoId = lib.status.videoId++;
						game.broadcastAll(
							function (player, id, cards) {
								var str;
								if (player == game.me && !_status.auto) str = "雄略：选择获得其中一张牌";
								else str = "雄略";
								var dialog = ui.create.dialog(str, cards);
								dialog.videoId = id;
							},
							player,
							event.videoId,
							event.cards
						);
						event.time = get.utc();
						game.addVideo("showCards", player, ["雄略", get.cardsInfo(event.cards)]);
						game.addVideo("delay", null, 2);
						"step 1"
						var next = player.chooseButton(1, true);
						next.set("dialog", event.videoId);
						next.set("ai", function (button) {
							var player = get.player();
							var card1 = button.link;
							var card2 = event.cards.slice().filter(i => i != card1)[0];
							var num1 = [],
								num2 = [],
								list1 = [],
								list2 = [];
							game.countPlayer(current => {
								if (current == player) return false;
								if (get.type2(card1) == "equip") num1.add(get.effect_use(current, card1, player, player)).sort((a, b) => b - a);
								if (get.type2(card2) == "equip") num2.add(get.effect_use(current, card2, player, player)).sort((a, b) => b - a);
							});
							for (var i of lib.inpile) {
								if (get.type2(card1) != "equip" && get.type2(i) == get.type2(card1)) list1.add(player.getUseValue(i)).sort((a, b) => b - a);
								if (get.type2(card1) != "equip" && get.type2(i) == get.type2(card2)) list2.add(player.getUseValue(i)).sort((a, b) => b - a);
							}
							if (num1.length && num2.length) return num1[0] <= get.effect_use(player, card1, player, player);
							else if (num1.length && !num2.length) return list2[0] <= get.effect_use(player, card1, player, player);
							else if (!num1.length && num2.length) return list1[0] <= get.effect_use(player, card2, player, player);
							else {
								if (list2[0] >= player.getUseValue(card1)) return 1;
								else if (player.getUseValue(card2) >= player.getUseValue(card1)) return 1;
								else if (list1[0] <= player.getUseValue(card2)) return 1;
							}
							return Math.random();
						});
						"step 2"
						if (result.bool && result.links) {
							event.cards2 = result.links;
							event.cards.removeArray(event.cards2);
						} else event.finish();
						var time = 1000 - (get.utc() - event.time);
						if (time > 0) game.delay(0, time);
						"step 3"
						game.broadcastAll("closeDialog", event.videoId);
						player.gain(event.cards2, "log", "gain2");
						player.addToExpansion(event.cards, player, "giveAuto").gaintag.add("jlsg_xionglve");
					},
				},
				backup: {
					sub: true,
					sourceSkill: "jlsg_xionglve",
				},
			},
		},*/
	jlsg_yanmie: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			return player.countDiscardableCards(player, "he", { suit: "spade" });
		},
		check(card) {
			return 7 - get.value(card);
		},
		position: "he",
		filterCard(card, player) {
			if (get.suit(card) != "spade") {
				return false;
			}
			return lib.filter.cardDiscardable(card, player, "jlsg_yanmie");
		},
		filterTarget(card, player, target) {
			return player != target && target.countDiscardableCards(target, "he");
		},
		async content(event, trigger, player) {
			const { target } = event,
				num = target.countDiscardableCards(target, "he");
			await target.chooseToDiscard(num, true);
			await target.draw(num);
			await target.showHandcards();
			const cards = target.getDiscardableCards(target, "h", card => get.type(card) != "basic");
			if (cards.length) {
				const { result } = await player
					.chooseBool()
					.set("createDialog", [`###湮灭###是否令${get.translation(target)}弃置非基本牌并受到${cards.length}点伤害？`, cards])
					.set("ai", (event, player) => get.damageEffect(event.target, player, player) > 0);
				if (result.bool) {
					await target.discard(cards);
					await target.damage(cards.length);
				}
			}
		},
		ai: {
			order: 8,
			expose: 0.3,
			threaten: 1.8,
			result: {
				target: function (player, target) {
					return -target.countCards("h") - 1;
				},
			},
		},
	},
	jlsg_shunshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			target: "useCardToTarget",
		},
		filter(event, player) {
			return event.player != player && ["basic", "trick"].includes(get.type(event.card)) && event.targets.length == 1 && game.hasPlayer(p => p != player);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`###${get.prompt(event.skill)}###令至多三名其他角色也成为此牌${get.translation(trigger.card)}的目标`, [1, 3])
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
					return get.effect(target, trigger.card, trigger.player, player);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			event.targets.sortBySeat();
			game.log(event.targets, "成为了", trigger.card, "的额外目标");
			trigger.getParent().targets.addArray(event.targets);
			await player.draw(event.targets.length);
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
	jlsg_jizhao: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			content: "mark",
		},
		trigger: { player: "phaseUseBegin" },
		filter: (event, player) => player.countCards("h"),
		async cost(event, trigger, player) {
			const hs = player.getCards("h").slice();
			const given = [],
				given_map = {};
			let node = get.is.singleHandcard() ? player.node.handcards1 : player.node.handcards2;
			while (hs.length) {
				const {
					result: { targets, cards },
				} = await player.chooseCardTarget({
					selectCard: [1, hs.length],
					filterCard(card) {
						return get.event("hs").includes(card);
					},
					filterTarget: lib.filter.notMe,
					prompt: "激诏：是否将手牌牌分配给其他角色？",
					prompt2: "获得牌的角色获得一枚“激诏”标记",
					ai1(card) {
						const player = get.owner(card),
							hs = get.event("hs"),
							given = get.event("given");
						if (!ui.selected.cards.length && get.name(card) == "du") {
							return 20;
						}
						if (ui.selected.cards.length) {
							return 0;
						}
						if (given.length && get.value(hs) < get.value(given)) {
							return 0;
						}
						const plaUseValue = player.getUseValue(card);
						if (player.hasUseTarget(card) && get.type(card) != "equip") {
							return game.hasPlayer(current => {
								if (current == player || get.attitude(player, current) < 0) {
									return false;
								}
								if (current.getUseValue(card) > plaUseValue) {
									return 10 > get.value(card);
								}
								return false;
							});
						} else if (!player.hasUseTarget(card)) {
							if (get.useful(card) < 5) {
								return game.hasPlayer(current => {
									return get.attitude(player, current) < 0 && get.value(card) < 5;
								});
							}
						}
						return 0;
					},
					ai2(target) {
						const card = ui.selected.cards[0];
						const player = get.owner(card),
							att = get.attitude(player, target);
						if (!card) {
							return 0;
						}
						if (get.name(card, player) == "du") {
							if (target.hasSkillTag("nodu")) {
								return att < 0;
							} else if (target.hasSkillTag("usedu")) {
								return att > 0;
							}
							return att < 0;
						}
						if (att > 0) {
							let add;
							if (given_map[target.playerid]?.length) {
								add = given_map[target.playerid];
							}
							if (target.hasJudge("lebu")) {
								return target.needsToDiscard(add) < 3;
							} else if (target.isTurnedOver()) {
								return get.value(card, target) >= get.value(card, player) || target.getUseValue(card) > 0;
							}
							if (target.getUseValue(card) > 0 && target.getUseValue(card) > player.getUseValue(card)) {
								if (!target.isTurnedOver() && !target.hasJudge("lebu")) {
									if (get.attitude(target, player) >= 3 && get.attitude(player, target) >= 3) {
										return 11 > get.value(card);
									}
								}
								return target.needsToDiscard(add) < 1;
							}
							return target.needsToDiscard() < 3 && 8 > get.value(card);
						} else {
							if (given_map[target.playerid]?.length) {
								return 0;
							} else if (target.hasJudge("lebu")) {
								return get.value(card, player) <= 5 && card.name != "wuxie";
							} else if (target.hasSkillTag("nogain")) {
								return get.value(card, player) <= 5;
							}
							return !get.tag(card, "damage") && !get.tag(card, "save") && !get.tag(card, "recover") && get.value(card, player) <= 5;
						}
					},
					hs: hs,
					given: given,
				});
				if (!targets?.length || !cards?.length) {
					break;
				}
				player.addGaintag(hs, "jlsg_jizhao");
				const target = targets[0].playerid;
				hs.removeArray(cards);
				given.addArray(cards);
				if (!given_map[target]) {
					given_map[target] = [];
				}
				given_map[target].addArray(cards);
			}
			const gain_list = Object.entries(given_map)
				.map(i => [(_status.connectMode ? lib.playerOL : game.playerMap)[i[0]], i[1]])
				.sort(([a], [b]) => {
					return lib.sort.seat.apply(this, [a, b]);
				});
			event.result = {
				bool: !!gain_list.length,
				targets: gain_list.map(i => i[0]),
				cost_data: gain_list,
			};
		},
		async content(event, trigger, player) {
			const { cost_data: gain_list } = event;
			const cards = gain_list.map(i => i[1]).flat();
			player.addExpose(0.3);
			await game
				.loseAsync({
					gain_list,
					player,
					cards,
					giver: player,
					animate: "giveAuto",
				})
				.setContent(async function (event, trigger, player) {
					event.type = "gain";
					await player.lose(cards, ui.special).set("type", "gain").set("forceDie", true).set("getlx", false);
					let evt = event.getl(player);
					await game.delay(0, get.delayx(500, 500));
					for (let i = 0; i < event.gain_list.length; i++) {
						const info = event.gain_list[i];
						info[1] = info[1].filter(card => {
							return !cards.includes(card) || !player.getCards("hejsx").includes(card);
						});
						let shown = info[1].slice(0),
							hidden = [];
						for (let card of info[1]) {
							if (evt.hs.includes(card)) {
								shown.remove(card);
								hidden.push(card);
							}
						}
						if (shown.length > 0) {
							player.$give(shown, info[0]);
						}
						if (hidden.length > 0) {
							player.$giveAuto(hidden, info[0]);
						}
						info[0].addMark("jlsg_jizhao", 1);
					}
					for (let i = 0; i < event.gain_list.length; i++) {
						const info = event.gain_list[i];
						if (info[1].length > 0) {
							const next = info[0].gain(info[1]);
							next.getlx = false;
							next.giver = event.giver;
							await next;
						}
					}
				});
		},
		group: ["jlsg_jizhao_damage", "jlsg_jizhao_remove"],
		subSkill: {
			damage: {
				audio: "jlsg_jizhao",
				trigger: { global: "damageBegin1" },
				filter: event => event.source && event.source.hasMark("jlsg_jizhao"),
				prompt: event => get.prompt("jlsg_jizhao", event.source),
				prompt2: event => `移去${get.translation(event.source)}的一个“激诏”标记，并令此次伤害+1`,
				check(event, player) {
					const att = get.attitude(event.player, player);
					if (att > 0) {
						if (get.attitude(event.source, player) < 0) {
							return false;
						} else if (event.player.hasSkillTag("filterDamage", null, { player: event.source })) {
							return event.player.hp > 1;
						} else if (event.player.hasSkillTag("maixie", null, { player: event.source })) {
							return event.num + 1 < event.player.hp;
						}
					}
					return !event.player.hasSkillTag("filterDamage", null, { player: event.source }) && att < 0;
				},
				logTarget: "source",
				async content(event, trigger, player) {
					trigger.source.removeMark("jlsg_jizhao", 1);
					trigger.num++;
				},
			},
			remove: {
				audio: "jlsg_jizhao",
				trigger: { player: "phaseBegin" },
				filter: () => game.hasPlayer(current => current.hasMark("jlsg_jizhao")),
				prompt: `激诏：你可以移去场上所有角色的“激诏”标记`,
				prompt2: `这些角色失去等量体力`,
				check(event, player) {
					const targets = game.filterPlayer(current => current.hasMark("jlsg_jizhao"));
					let eff = 0;
					for (let target of targets) {
						if (get.attitude(target, player) > 0) {
							if (get.effect(target, { name: "losehp" }, player, target) > 0 && target.hp > target.countMark("jlsg_jizhao")) {
								eff += 2;
							} else {
								eff--;
							}
						} else {
							if (get.effect(target, { name: "losehp" }, player, target) > 0 && target.hp > target.countMark("jlsg_jizhao")) {
								eff--;
							} else {
								eff += 2;
							}
						}
					}
					return eff > 0;
				},
				logTarget: () => game.filterPlayer(current => current.hasMark("jlsg_jizhao")).sortBySeat(),
				async content(event, trigger, player) {
					for (let target of event.targets) {
						const num = target.countMark("jlsg_jizhao");
						target.removeMark("jlsg_jizhao", num);
						await target.loseHp(num);
					}
				},
			},
		},
	},
	jlsg_junwang: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["phaseUseBegin", "phaseUseEnd"],
		},
		filter(event, player) {
			return event.player != player && event.player.countCards("h") >= player.countCards("h");
		},
		logTarget: "player",
		forced: true,
		async content(event, trigger, player) {
			await trigger.player.chooseToGive(true, player, `###${get.translation(player)}对你发动了【君望】###交给其一张手牌`);
		},
	},
	jlsg_qixing: {
		audio: "ext:极略/audio/skill:1",
		mark: true,
		marktext: "星",
		intro: {
			mark: function (dialog, content, player) {
				var content = player.getExpansions("jlsg_qixing");
				if (content && content.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.add(content);
					} else {
						return "共有" + get.cnNumber(content.length) + "张「星」";
					}
				}
			},
		},
		mod: {
			maxHandcard: function (player, num) {
				return num + player.getExpansions("jlsg_qixing").length;
			},
		},
		trigger: {
			global: "gameDrawAfter",
		},
		forced: true,
		filter() {
			return true;
		},
		async content(event, trigger, player) {
			player.directgain(get.cards(7));
			if (player == game.me) {
				game.addVideo("delay", null);
			}
			let num = Math.min(player.countCards("h"), 7);
			if (num == 0) {
				return;
			}
			const { result } = await player.chooseCard(`七星：选择至少${get.cnNumber(num)}张牌作为「星」`, [num, player.countCards("h")], true).set("ai", function (card) {
				return _status.event.player.hasValueTarget(card) && get.value(card) > 8;
			});
			if (result.bool) {
				await player.addToExpansion(result.cards, player, "giveAuto").set("gaintag", ["jlsg_qixing"]);
			}
		},
		group: ["jlsg_qixing2"],
	},
	jlsg_qixing2: {
		trigger: {
			player: "phaseDrawAfter",
		},
		direct: true,
		sourceSkill: "jlsg_qixing",
		filter(event, player) {
			return player.getExpansions("jlsg_qixing").length > 0 && player.countCards("h") > 0;
		},
		content() {
			"step 0"
			var cards = player.getExpansions("jlsg_qixing");
			if (!cards.length || !player.countCards("h")) {
				event.finish();
				return;
			}
			var next = player.chooseToMove("七星：是否交换“星”和手牌？");
			next.set("list", [
				[get.translation(player) + "（你）的星", cards],
				["手牌区", player.getCards("h")],
			]);
			next.set("filterMove", function (from, to) {
				return typeof to != "number";
			});
			next.set("processAI", function (list) {
				var player = _status.event.player,
					cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
						return get.value(a) - get.value(b);
					}),
					cards2 = cards.splice(0, player.getExpansions("jlsg_qixing").length);
				return [cards2, cards];
			});
			"step 1"
			if (result.bool) {
				var pushs = result.moved[0],
					gains = result.moved[1];
				pushs.removeArray(player.getExpansions("jlsg_qixing"));
				gains.removeArray(player.getCards("h"));
				if (!pushs.length || pushs.length != gains.length) {
					return;
				}
				player.logSkill("jlsg_qixing", null, null, null, ["ext:极略/jlsg_qixing2.mp3"]);
				player.addToExpansion(pushs, player, "giveAuto").gaintag.add("jlsg_qixing");
				player.gain(gains, "draw");
			}
		},
	},
	jlsg_kuangfeng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		filter: function (event, player) {
			return player.getExpansions("jlsg_qixing").length;
		},
		async content(event, trigger, player) {
			const { result: chooseTarget } = await player.chooseTarget("狂风：是否选择一名角色获得狂风标记").set("ai", function (target) {
				if (player.getExpansions("jlsg_qixing").length > 3) {
					return lib.jlsg.isWeak(target) && lib.jlsg.isEnemy(player, target);
				}
				return -1;
			});
			if (chooseTarget.bool) {
				const target = chooseTarget.targets[0];
				const { result: discard } = await player.chooseCardButton("弃置1枚「星」", player.getExpansions("jlsg_qixing"), true);
				player.loseToDiscardpile(discard.links);
				await player.logSkill("jlsg_kuangfeng", target, "fire");
				if (!target.hasSkill("jlsg_kuangfeng2")) {
					target.addSkill("jlsg_kuangfeng2");
				}
				target.addMark("jlsg_kuangfeng2", 1);
			}
		},
		group: ["jlsg_kuangfeng2"],
	},
	jlsg_kuangfeng2: {
		charlotte: true,
		forced: true,
		popup: false,
		mark: true,
		marktext: "风",
		intro: {
			content: "已有#个「风」标记",
		},
		trigger: { player: "damageBegin1" },
		filter(event, player) {
			if (!player.hasMark("jlsg_kuangfeng2")) {
				return false;
			}
			return !event.jlsg_kuangfeng;
		},
		async content(event, trigger, player) {
			trigger.jlsg_kuangfeng = true;
			let gainer = game.filterPlayer(cur => cur.hasSkill("jlsg_kuangfeng")).sortBySeat(player);
			if (game.hasNature(trigger)) {
				if (trigger.nature == "fire") {
					await player.logSkill("jlsg_kuangfeng2", null, "fire");
					trigger.num += player.countMark("jlsg_kuangfeng2");
				}
				if (game.hasNature(trigger, "thunder")) {
					await player.popup("jlsg_kuangfeng2", null, "thunder");
					if (gainer.length) {
						for (let current of gainer) {
							if (!current.hasSkill("jlsg_qixing")) {
								continue;
							}
							let card = get.cards(1);
							if (card) {
								await current.addToExpansion(card, current, "draw").set("gaintag", ["jlsg_qixing"]);
								game.log(current, "将牌堆顶的一张牌置入「星」");
							}
						}
					}
				}
			} else {
				if (gainer.length) {
					await player.logSkill("jlsg_kuangfeng2");
					for (let current of gainer) {
						await current.draw(player.countMark("jlsg_kuangfeng2"));
					}
				}
			}
		},
		ai: {
			threaten: 3,
			effect: {
				target: function (card, player, target, current) {
					let mark = target.countMark("jlsg_kuangfeng2");
					if (get.tag(card, "damage")) {
						if (get.tag(card, "fireDamage")) {
							return 1 + mark / 10;
						}
						if (get.tag(card, "thunder") && player.hasSkill("jlsg_kuangfeng") && player.hasSkill("jlsg_qixing")) {
							return [1, 0, 1, 1];
						}
						if (!get.tag(card, "natureDamage")) {
							return [1, 0, 1, mark / 5];
						}
					}
				},
			},
		},
	},
	jlsg_dawu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		priority: 1,
		direct: true,
		filter: function (event, player) {
			return player.getExpansions("jlsg_qixing").length;
		},
		content: function () {
			"step 0"
			player.chooseTarget("大雾：选择角色获得大雾标记", [1, Math.min(game.players.length, player.getExpansions("jlsg_qixing").length)]).ai = function (target) {
				if (target.isMin()) {
					return 0;
				}
				if (target.hasSkill("biantian2")) {
					return 0;
				}
				var att = get.attitude(player, target);
				if (att >= 4) {
					if (target.hp == 1 && target.maxHp > 2) {
						return att;
					}
					if (target.hp == 2 && target.maxHp > 3 && target.countCards("he") == 0) {
						return att * 0.7;
					}
					if (jlsg.isWeak(target)) {
						return att * 1.1;
					}
					return 0;
				}
				return -1;
			};
			"step 1"
			if (result.bool) {
				var length = result.targets.length;
				for (var i = 0; i < length; i++) {
					result.targets[i].addSkill("jlsg_dawu2");
					result.targets[i].popup("jlsg_dawu");
				}
				player.logSkill("jlsg_dawu", result.targets, "thunder");
				player.chooseCardButton("弃置" + get.cnNumber(length) + "枚「星」", length, player.getExpansions("jlsg_qixing"), true);
			} else {
				event.finish();
			}
			"step 2"
			player.loseToDiscardpile(result.links);
		},
		group: ["jlsg_dawu_remove"],
		subSkill: {
			remove: {
				trigger: { player: ["phaseBegin", "dieBegin"] },
				forced: true,
				unique: true,
				popup: false,
				silent: true,
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].hasSkill("jlsg_dawu2")) {
							game.players[i].removeSkill("jlsg_dawu2");
							game.players[i].popup("jlsg_dawu");
						}
					}
				},
			},
		},
	},
	jlsg_dawu2: {
		charlotte: true,
		forced: true,
		mark: true,
		marktext: "雾",
		intro: {
			content: "已获得大雾标记",
		},
		trigger: { player: "damageBegin2" },
		filter: function (event, player) {
			return !game.hasNature(event, "thunder");
		},
		content: function () {
			trigger.cancel();
			player.draw();
		},
		ai: {
			nofire: true,
			nodamage: true,
			maixue_hp: true,
			effect: {
				target: function (card, player, target, current) {
					if (player.hasSkillTag("jueqing")) {
						return;
					}
					if (get.tag(card, "damage") && !get.tag(card, "thunderDamage")) {
						return [0, 1];
					}
				},
			},
		},
	},
	jlsg_yaozhi: {
		audio: "ext:极略/audio/skill:2",
		init(player, skill) {
			player.setStorage(skill, {}, true);
		},
		trigger: { player: ["phaseBegin", "phaseZhunbeiBegin", "damageEnd", "phaseJieshuBegin"] },
		filter(event, player, name) {
			if (name == "phaseBegin") {
				return event.getRand("jlsg_yaozhi") >= 0.5;
			} else if (name == "phaseZhunbeiBegin") {
				const map = event.getParent("phase")?._rand_map || {};
				if (!("jlsg_yaozhi" in map)) {
					return true;
				}
				return event.getParent("phase").getRand("jlsg_yaozhi") < 0.5;
			}
			return true;
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw();
			let characterList;
			if (lib.config.extension_极略_jlsgsoul_sp_zhugeliang == "false") {
				if (!_status.characterlist) {
					game.initCharacterList();
				}
				characterList = _status.characterlist.slice().randomSort();
			} else {
				characterList = Object.keys(lib.character).randomSort();
			}
			const storage = player.getStorage(event.name, {}),
				list = {};
			let packList = ["jlsg_sr", "jlsg_sk", "jlsg_soul"];
			for (let name of characterList) {
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1 || name.startsWith("jlsgsoul_sp_")) {
					continue;
				} else if (lib.config.extension_极略_jlsgsoul_sp_zhugeliang == "false" && packList.every(pack => !(name in lib.characterPack[pack]))) {
					continue;
				} else if (Object.keys(list).some(i => get.translation(i) == get.translation(name))) {
					//防重名
					continue;
				}
				let skills = get.character(name).skills,
					record = Object.values(list).flat();
				for (let skill of skills) {
					if (player.hasSkill(skill, null, false, false) || Object.values(storage).flat().includes(skill) || record.includes(skill)) {
						continue;
					}
					if (["jlsg_xianshou"].includes(skill)) {
						continue;
					}
					//防技能重名
					if (record.some(i => get.translation(i) == get.translation(skill))) {
						continue;
					}
					const skills2 = game.expandSkills([skill]);
					for (let skill2 of skills2) {
						const info = lib.skill[skill2];
						if (!info || !info.trigger || !info.trigger.player || info.silent || info.juexingji || info.zhuanhuanji || info.hiddenSkill || info.dutySkill) {
							continue;
						}
						if (info.trigger.player == event.triggername || (Array.isArray(info.trigger.player) && info.trigger.player.includes(event.triggername))) {
							if (info.ai && ((info.ai.combo && !trigger.player.hasSkill(info.ai.combo)) || info.ai.notemp || info.ai.neg)) {
								continue;
							}
							if (info.init) {
								continue;
							}
							if (info.filter) {
								let indexedData;
								if (typeof info.getIndex === "function") {
									indexedData = info.getIndex(trigger, trigger.player, event.triggername);
									if (Array.isArray(indexedData)) {
										if (
											!indexedData.some(target => {
												try {
													const bool = info.filter(trigger, trigger.player, event.triggername, target);
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
											const bool = info.filter(trigger, trigger.player, event.triggername, true);
											if (!bool) {
												continue;
											}
										} catch (e) {
											continue;
										}
									}
								} else {
									try {
										const bool = info.filter(trigger, trigger.player, event.triggername, true);
										if (!bool) {
											continue;
										}
									} catch (e) {
										continue;
									}
								}
							}
							if (!list[name]) {
								list[name] = [];
							}
							list[name].add(skill);
							break;
						}
					}
				}
				if (Object.keys(list).length > 2) {
					break;
				}
			}
			if (!Object.keys(list).length) {
				return;
			}
			const control = await player
				.chooseControl(Object.values(list).flat())
				.set("dialog", ["妖智", "请选择要发动的技能", [Object.keys(list), "character"]])
				.set("ai", function () {
					return 0;
				})
				.forResultControl();
			const flashName = Object.entries(list).find(i => i[1].includes(control))[0];
			player.flashAvatar(null, flashName);
			if (!storage[flashName]) {
				storage[flashName] = [];
			}
			storage[flashName].add(control);
			player.setStorage(event.name, storage);
			let expire = "damageAfter";
			if (event.triggername == "phaseJieshuBegin") {
				expire = "phaseJieshuEnd";
			} else if (["phaseBegin", "phaseZhunbeiBegin"].includes(event.triggername)) {
				expire = "phaseZhunbeiEnd";
			}
			player.addTempSkill(control, expire);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -2];
						}
						if (!target.hasFriend()) {
							return;
						}
						let num = 1;
						if (get.attitude(player, target) > 0) {
							if (player.needsToDiscard()) {
								num = 0.7;
							} else {
								num = 0.5;
							}
						}
						if (target.hp >= 4) {
							return [1, num * 2];
						}
						if (target.hp == 3) {
							return [1, num * 1.5];
						}
						if (target.hp == 2) {
							return [1, num * 0.5];
						}
					}
				},
			},
		},
		group: "jlsg_yaozhi_use",
	},
	jlsg_yaozhi_use: {
		sourceSkill: "jlsg_yaozhi",
		audio: "jlsg_yaozhi",
		enable: "phaseUse",
		usable: 1,
		async content(event, trigger, player) {
			await player.draw(1);
			let evt = event.getParent(2);
			let characterList;
			if (lib.config.extension_极略_jlsgsoul_sp_zhugeliang == "false") {
				if (!_status.characterlist) {
					game.initCharacterList();
				}
				characterList = _status.characterlist.slice().randomSort();
			} else {
				characterList = Object.keys(lib.character).randomSort();
			}
			const storage = player.getStorage("jlsg_yaozhi", {}),
				list = {};
			let packList = ["jlsg_sr", "jlsg_sk", "jlsg_soul"];
			for (let name of characterList) {
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1 || name.startsWith("jlsgsoul_sp_")) {
					continue;
				} else if (lib.config.extension_极略_jlsgsoul_sp_zhugeliang == "false" && packList.every(pack => !(name in lib.characterPack[pack]))) {
					continue;
				} else if (Object.keys(list).some(i => get.translation(i) == get.translation(name))) {
					//防重名
					continue;
				}
				let skills = get.character(name).skills,
					record = Object.values(list).flat();
				for (let skill of skills) {
					if (["jlsg_xianshou"].includes(skill)) {
						continue;
					}
					if (player.hasSkill(skill, null, false, false) || Object.values(storage).flat().includes(skill) || record.includes(skill)) {
						continue;
					}
					if (get.is.locked(skill, player)) {
						continue;
					}
					let translation = lib.translate[skill + "_info"];
					if (translation && translation.indexOf("当你于出牌阶段") != -1 && translation.indexOf("当你于出牌阶段外") == -1) {
						if (!list[name]) {
							list[name] = [];
						}
						list[name].add(skill);
						continue;
					}
					const skills2 = game.expandSkills([skill]);
					for (let skill2 of skills2) {
						let info = lib.skill[skill2];
						if (get.is.zhuanhuanji(skill2, player)) {
							continue;
						}
						if (!info || !info.enable || info.charlotte || info.juexingji || info.hiddenSkill || info.dutySkill || (info.zhuSkill && !player.isZhu2())) {
							continue;
						}
						if (info.enable == "phaseUse" || (Array.isArray(info.enable) && info.enable.includes("phaseUse")) || info.enable == "chooseToUse" || (Array.isArray(info.enable) && info.enable.includes("chooseToUse"))) {
							if (info.ai && ((info.ai.combo && !player.hasSkill(info.ai.combo)) || info.ai.notemp || info.ai.neg)) {
								continue;
							}
							if (info.init || info.onChooseToUse) {
								continue;
							}
							if (info.filter) {
								try {
									var bool = info.filter(evt, player);
									if (!bool) {
										continue;
									}
								} catch (e) {
									continue;
								}
							} else if (info.viewAs && typeof info.viewAs != "function") {
								try {
									if (evt.filterCard && !evt.filterCard(info.viewAs, player, evt)) {
										continue;
									}
									if (info.viewAsFilter && info.viewAsFilter(player) == false) {
										continue;
									}
								} catch (e) {
									continue;
								}
							}
							if (!list[name]) {
								list[name] = [];
							}
							list[name].add(skill);
							break;
						}
					}
				}
				if (Object.keys(list).length > 2) {
					break;
				}
			}
			if (!Object.keys(list).length) {
				return;
			}
			const control = await player
				.chooseControl(Object.values(list).flat())
				.set("dialog", ["请选择要发动的技能", [Object.keys(list), "character"]])
				.set("ai", function () {
					return 0;
				})
				.forResultControl();
			const flashName = Object.entries(list).find(i => i[1].includes(control))[0];
			player.flashAvatar(null, flashName);
			if (!storage[flashName]) {
				storage[flashName] = [];
			}
			storage[flashName].add(control);
			player.setStorage(event.name, storage);
			player.addTempSkill(control, "phaseUseEnd");
			player.addTempSkill("jlsg_yaozhi_temp", "phaseUseEnd");
			player.markAuto("jlsg_yaozhi_temp", [control]);
		},
		ai: { order: 10, result: { player: 1 } },
	},
	jlsg_yaozhi_temp: {
		sourceSkill: "jlsg_yaozhi",
		charlotte: true,
		direct: true,
		firstDo: true,
		priority: Infinity,
		trigger: { player: ["useSkill", "logSkillBegin"] },
		filter(event, player) {
			var info = get.info(event.skill);
			if (info && info.charlotte) {
				return false;
			}
			var skill = get.sourceSkillFor(event);
			return player.hasStorage("jlsg_yaozhi_temp", skill);
		},
		async content(event, trigger, player) {
			let skill = get.sourceSkillFor(trigger);
			player.removeSkill(skill);
			player.unmarkAuto("jlsg_yaozhi_temp", [skill]);
		},
	},
	jlsg_xingyun: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseEnd" },
		forced: true,
		async content(event, trigger, player) {
			await player.loseMaxHp();
			const storage = player.getStorage("jlsg_yaozhi", {});
			if (!Object.keys(storage).length) {
				return;
			}
			_status.noclearcountdown = true;
			const id = lib.status.videoId++,
				prompt = `星陨：请选择获得一个技能`;
			if (player.isOnline2()) {
				player.send(
					(cards, prompt, id) => {
						const dialog = ui.create.dialog(prompt, [cards, lib.skill.jlsg_xingyun.$createButton]);
						dialog.videoId = id;
					},
					Object.entries(storage),
					prompt,
					id
				);
			}
			const dialog = ui.create.dialog(prompt, [Object.entries(storage), lib.skill.jlsg_xingyun.$createButton]);
			dialog.videoId = id;
			if (!event.isMine()) {
				dialog.style.display = "none";
			}
			const buttons = dialog.content.querySelector(".buttons");
			const array = dialog.buttons.filter(item => !item.classList.contains("nodisplay") && item.style.display !== "none");
			const groups = array
				.map(i => get.character(i.link).group)
				.unique()
				.sort((a, b) => {
					const getNum = g => (lib.group.includes(g) ? lib.group.indexOf(g) : lib.group.length);
					return getNum(a) - getNum(b);
				});
			if (groups.length > 1) {
				dialog.style.bottom = (parseInt(dialog.style.top || "0", 10) + get.is.phoneLayout() ? 230 : 220) + "px";
				dialog.addPagination({
					data: array,
					totalPageCount: groups.length,
					container: dialog.content,
					insertAfter: buttons,
					onPageChange(state) {
						const { pageNumber, data, pageElement } = state;
						const { groups } = pageElement;
						data.forEach(item => {
							item.classList[
								(() => {
									const group = get.character(item.link).group;
									return groups.indexOf(group) + 1 === pageNumber;
								})()
									? "remove"
									: "add"
							]("nodisplay");
						});
						ui.update();
					},
					pageLimitForCN: ["←", "→"],
					pageNumberForCN: groups.map(i => {
						const isChineseChar = char => {
							const regex = /[\u4e00-\u9fff\u3400-\u4dbf\ud840-\ud86f\udc00-\udfff\ud870-\ud87f\udc00-\udfff\ud880-\ud88f\udc00-\udfff\ud890-\ud8af\udc00-\udfff\ud8b0-\ud8bf\udc00-\udfff\ud8c0-\ud8df\udc00-\udfff\ud8e0-\ud8ff\udc00-\udfff\ud900-\ud91f\udc00-\udfff\ud920-\ud93f\udc00-\udfff\ud940-\ud97f\udc00-\udfff\ud980-\ud9bf\udc00-\udfff\ud9c0-\ud9ff\udc00-\udfff]/u;
							return regex.test(char);
						}; //友情提醒：regex为基本汉字区间到扩展G区的Unicode范围的正则表达式，非加密/混淆
						const str = get.plainText(lib.translate[i + "2"] || lib.translate[i] || "无");
						return isChineseChar(str.slice(0, 1)) ? str.slice(0, 1) : str;
					}),
					changePageEvent: "click",
					pageElement: { groups: groups },
				});
			}
			const finish = () => {
				if (player.isOnline2()) {
					player.send("closeDialog", id);
				}
				dialog.close();
				delete _status.noclearcountdown;
				if (!_status.noclearcountdown) {
					game.stopCountChoose();
				}
			};
			while (true) {
				const next = player.chooseButton(true).set("dialog", id);
				next.set("ai", ({ link }) => {
					const { player, cond } = get.event();
					const storage = player.getStorage("jlsg_yaozhi", {});
					let skills = Object.values(storage).flat();
					skills.sort((a, b) => get.skillRank(b, cond) - get.skillRank(a, cond));
					let name = Object.keys(storage).find(i => storage[i].includes(skills[0]));
					return name == link;
				});
				next.set("cond", event.triggername);

				const result = await next.forResult();
				const name = result.links[0],
					func = function (card, id) {
						const dialog = get.idDialog(id);
						if (dialog) {
							//禁止翻页
							const paginationInstance = dialog.paginationMap?.get(dialog.content.querySelector(".buttons"));
							if (paginationInstance?.state) {
								paginationInstance.state.pageRefuseChanged = true;
							}
							for (let i = 0; i < dialog.buttons.length; i++) {
								if (dialog.buttons[i].link == card) {
									dialog.buttons[i].classList.add("selectedx");
								} else {
									dialog.buttons[i].classList.add("unselectable");
								}
							}
						}
					};
				if (player.isOnline2()) {
					player.send(func, name, id);
				} else if (event.isMine()) {
					func(name, id);
				}
				const result2 = await player
					.chooseControl(storage[name], "返回")
					.set("ai", () => {
						const { cond, controls } = get.event();
						controls.slice().sort((a, b) => get.skillRank(b, cond) - get.skillRank(a, cond));
						return controls[0];
					})
					.set("cond", event.triggername)
					.forResult();
				const control = result2.control;
				if (control === "返回") {
					const func2 = function (card, id) {
						const dialog = get.idDialog(id);
						if (dialog) {
							//允许翻页
							const paginationInstance = dialog.paginationMap?.get(dialog.content.querySelector(".buttons"));
							if (paginationInstance?.state) {
								paginationInstance.state.pageRefuseChanged = false;
							}
							for (let i = 0; i < dialog.buttons.length; i++) {
								dialog.buttons[i].classList.remove("selectedx");
								dialog.buttons[i].classList.remove("unselectable");
							}
						}
					};
					if (player.isOnline2()) {
						player.send(func2, name, id);
					} else if (event.isMine()) {
						func2(name, id);
					}
				} else {
					finish();
					storage[name].remove(control);
					if (!storage[name].length) {
						delete storage[name];
					}
					player.setStorage("jlsg_yaozhi", storage);
					await player.addSkills([control]);
					return;
				}
			}
		},
		$createButton(item, type, position, noclick, node) {
			const [name, skills] = item;
			node = ui.create.buttonPresets.character(name, "character", position, noclick);
			const info = lib.character[name];
			if (skills.length) {
				const skillstr = skills.map(i => `[${get.translation(i)}]`).join("<br>");
				const skillnode = ui.create.caption(`<div class="text" data-nature=${get.groupnature(info[1], "raw")}m style="font-family: ${lib.config.name_font || "xinwei"},xinwei">${skillstr}</div>`, node);
				skillnode.style.left = "2px";
				skillnode.style.bottom = "2px";
			}
			node.link = name;
			node._customintro = function (uiintro, evt) {
				const character = node.link,
					characterInfo = get.character(node.link);
				let capt = get.translation(character);
				if (characterInfo) {
					capt += `&nbsp;&nbsp;${get.translation(characterInfo.sex)}`;
					let charactergroup;
					const charactergroups = get.is.double(character, true);
					if (charactergroups) {
						charactergroup = charactergroups.map(i => get.translation(i)).join("/");
					} else {
						charactergroup = get.translation(characterInfo.group);
					}
					capt += `&nbsp;&nbsp;${charactergroup}`;
				}
				uiintro.add(capt);

				if (lib.characterTitle[node.link]) {
					uiintro.addText(get.colorspan(lib.characterTitle[node.link]));
				}
				for (let i = 0; i < skills.length; i++) {
					if (lib.translate[skills[i] + "_info"]) {
						let translation = lib.translate[skills[i] + "_ab"] || get.translation(skills[i]).slice(0, 2);
						if (lib.skill[skills[i]] && lib.skill[skills[i]].nobracket) {
							uiintro.add('<div><div class="skilln">' + get.translation(skills[i]) + "</div><div>" + get.skillInfoTranslation(skills[i]) + "</div></div>");
						} else {
							uiintro.add('<div><div class="skill">【' + translation + "】</div><div>" + get.skillInfoTranslation(skills[i]) + "</div></div>");
						}
						if (lib.translate[skills[i] + "_append"]) {
							uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skills[i] + "_append"] + "</div>");
						}
					}
				}
			};
			return node;
		},
		ai: {
			halfneg: true,
			combo: "jlsg_yaozhi",
		},
	},
	jlsg_jilve: {
		audio: "ext:极略/audio/skill:3",
		trigger: { player: "useCardAfter" },
		forced: true,
		content() {
			player.draw();
		},
	},
	jlsg_tongtian: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		unique: true,
		skillAnimation: true,
		limited: true,
		mark: true,
		marktext: "通",
		intro: { content: true },
		prompt: "通天：摸四张牌并弃置任意张花色各不相同的牌，获得各花色的技能。",
		derivation: ["fankui", "guanxing", "wansha", "zhiheng"],
		async contentBefore(event, trigger, player) {
			player.awakenSkill("jlsg_tongtian");
			await player.draw(4);
		},
		async content(event, trigger, player) {
			const { result } = await player
				.chooseToDiscard("弃置任意张花色各不相同的牌，获得各花色的技能。", true, [1, 4], "he")
				.set("filterCard", (card, player) => {
					let suit = get.suit(card, player);
					return !ui.selected.cards.map(card => get.suit(card, player)).includes(suit);
				})
				.set("complexCard", true)
				.set("ai", card => {
					if (get.suit(card, get.player()) == "none") {
						return -114514;
					}
					return 8 - get.value(card);
				});
			if (!result.bool || !result.cards || !result.cards.length) {
				return;
			}
			const storage = result.cards.map(card => get.suit(card, player)),
				skillList = lib.skill.jlsg_tongtian.derivation,
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
				player: function (player) {
					if (player.hp < 3 && player.countCards("he") < 4) {
						return 1;
					}
					var cards = player.getCards("he");
					var suits = [];
					for (var i = 0; i < cards.length; i++) {
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
	jlsg_jieyan: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "useCardToBefore" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("h") > 0 && (get.type(event.card) == "trick" || event.card.name == "sha") && get.color(event.card) == "red" && event.targets.length == 1;
		},
		content: function () {
			"step 0"
			var next = player.chooseToDiscard("是否对" + get.translation(trigger.target) + "发动【劫焰】？", "h");
			next.ai = function (card) {
				if (get.attitude(player, trigger.target) < 0) {
					if (get.damageEffect(trigger.target, player, player, "fire") >= 0) {
						return get.value(trigger.card) - get.value(card);
					}
					return 7 - get.value(card);
				}
				//if(trigger.target==player) return 10;
				return 0;
			};
			next.logSkill = ["jlsg_jieyan", trigger.target];
			"step 1"
			if (result.bool) {
				//player.logSkill('jlsg_jieyan',trigger.target);
				trigger.cancel();
				trigger.target.damage("fire", player);
			}
		},
		ai: {
			expose: 0.2,
			fireattack: true,
		},
	},
	jlsg_jieyan_buff: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: "damageBegin" },
		forced: true,
		filter: function (event) {
			if (event.nature == "fire") {
				return true;
			}
		},
		content: function () {
			trigger.cancel();
			player.draw(trigger.num);
		},
		ai: {
			nofire: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "fireDamage")) {
						if (target.hp == target.maxHp) {
							return 0;
						}
						return [0, 2];
					}
				},
			},
		},
	},
	jlsg_fenying: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "damageAfter" },
		frequent: true,
		filter: function (event, player) {
			return event.nature == "fire";
		},
		content: function () {
			"step 0"
			player.draw();
			"step 1"
			let cnt = player.getHistory("useSkill", e => e.skill == event.name).length;
			player.chooseCardTarget({
				filterCard: function (card) {
					return true;
				},
				selectCard: cnt,
				filterTarget: function (card, player, target) {
					let dis = get.distance(trigger.player, target);
					return trigger.player == target || game.filterPlayer(p => p != trigger.player).every(p => get.distance(trigger.player, p) >= dis);
				},
				ai1: function (card) {
					return 7 - get.value(card);
				},
				ai2: function (target) {
					return get.damageEffect(target, player, player, "fire");
				},
				position: "he",
				prompt: get.prompt(event.name),
				prompt2: `弃置${get.cnNumber(cnt)}张牌并造成${get.cnNumber(trigger.num)}点火焰伤害`,
			});
			"step 2"
			if (result.bool) {
				player.discard(result.cards);
				player.line(result.targets[0], "red");
				result.targets[0].damage("fire", trigger.num, player);
			}
		},
	},
	jlsg_kuangbao: {
		group: ["jlsg_kuangbao1"],
		audio: "ext:极略/audio/skill:1",
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content: function () {
			player.addMark(event.name, 2);
		},
		marktext: "暴",
		intro: {
			content: "共有#个标记",
		},
	},
	jlsg_kuangbao1: {
		trigger: {
			source: "damageEnd",
			player: "damageEnd",
		},
		forced: true,
		audio: "ext:极略/audio/skill:true",
		filter: function (event) {
			return event.num != 0;
		},
		content: function () {
			let num = trigger.num;
			if (player.hasSkill("jlsg_wuqian") && player.countMark("jlsg_kuangbao") > 3) {
				num++;
			}
			player.addMark("jlsg_kuangbao", num);
			if (trigger.player == player) {
				player.draw(2);
			}
		},
	},
	jlsg_wumou: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCard",
		},
		forced: true,
		filter: function (event) {
			return get.type(event.card) == "trick";
		},
		content: function () {
			"step 0"
			if (player.getStorage("jlsg_kuangbao", 0) > 0) {
				player.chooseControl("选项一", "选项二").set("prompt", '无谋<br><br><div class="text">1:弃置1枚「暴」标记</div><br><div class="text">2:受到1点伤害</div></br>').ai = function () {
					if (player.getStorage("jlsg_kuangbao", 0) > 6) {
						return "选项一";
					}
					if (player.hp >= 4 && player.countCards("h", "tao") >= 1) {
						return "选项二";
					}
					return Math.random() < 0.5 && "选项一";
				};
			} else {
				player.damage("nosource");
				event.finish();
			}
			"step 1"
			if (result.control == "选项一") {
				player.storage.jlsg_kuangbao--;
				player.markSkill("jlsg_kuangbao");
			} else {
				player.damage("nosource");
			}
			trigger.nowuxie = true;
		},
		ai: {
			halfneg: true,
		},
	},
	jlsg_wuqian: {
		audio: "ext:极略/audio/skill:1",
		derivation: ["wushuang", "jlsgsy_shenji"],
		trigger: {
			player: ["jlsg_kuangbao1After", "jlsg_kuangbaoAfter", "jlsg_wumouAfter", "jlsg_shenfenAfter"],
		},
		forced: true,
		filter(event, player) {
			if (player.countMark("jlsg_kuangbao") > 3) {
				return !player.hasSkill("wushuang") || !player.hasSkill("jlsgsy_shenji");
			} else if (player.countMark("jlsg_kuangbao") < 4) {
				player.additionalSkills["jlsg_wuqian"] && player.additionalSkills["jlsg_wuqian"].length;
			}
			return false;
		},
		content: function () {
			if (player.countMark("jlsg_kuangbao") > 3) {
				player.addAdditionalSkills("jlsg_wuqian", ["wushuang", "jlsgsy_shenji"]);
				player.update();
			} else {
				player.removeAdditionalSkills("jlsg_wuqian");
			}
		},
		ai: {
			result: {
				player: function (player) {
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
		usable: 1,
		filter: function (event, player) {
			return player.getStorage("jlsg_kuangbao", 0) >= 6;
		},
		skillAnimation: true,
		animationColor: "metal",
		mark: true,
		content: function () {
			"step 0"
			player.removeMark("jlsg_kuangbao", 6);
			event.targets = game.players.slice(0);
			event.targets.remove(player);
			event.targets.sort(lib.sort.seat);
			event.targets2 = event.targets.slice(0);
			"step 1"
			if (event.targets.length) {
				event.targets.shift().damage();
				event.redo();
			}
			"step 2"
			if (event.targets2.length) {
				var cur = event.targets2.shift();
				if (cur && cur.countCards("he")) {
					cur.discard(cur.getCards("he"));
				}
				event.redo();
			}
			"step 3"
			player.turnOver();
		},
		ai: {
			order: 9,
			result: {
				player: function (player) {
					var num = 0;
					for (var i = 0; i < game.players.length; i++) {
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
	jlsg_wushen: {
		mod: {
			cardname: function (card, player, name) {
				if (["sha", "tao"].includes(card.name)) {
					return "juedou";
				}
			},
		},
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "useCard" },
		forced: true,
		filter: function (event, player) {
			return event.card.name == "juedou" && event.cards && event.cards.length == 1 && ["sha", "tao"].includes(event.cards[0].name);
		},
		content: function () {},
		group: ["jlsg_wushen2"],
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "respondSha") && current < 0) {
						return 1.5;
					}
				},
			},
			order: 4,
			useful: -1,
			value: -1,
		},
	},
	jlsg_wushen2: {
		audio: "jlsg_wushen",
		forced: true,
		trigger: { source: "damageBegin1" },
		filter: function (event) {
			return event.player.group === "shen";
		},
		content: function () {
			trigger.num++;
		},
		ai: {
			effect: {
				player: function (card, player, target, current, isLink) {
					if (get.tag(card, "damage") && target.group === "shen") {
						return [1, 0, 1, -3];
					}
				},
			},
		},
	},
	jlsg_suohun: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		filter: function (event, player, name) {
			if (name == "damageEnd") {
				return event.source && event.source != player;
			}
			return event.player != player && event.player?.isIn();
		},
		forced: true,
		content: function () {
			var target = trigger.source,
				cnt = trigger.num;
			if (trigger.source == player) {
				target = trigger.player;
				cnt = 1;
			}
			if (!target.getStorage("jlsg_suohun_mark", 0)) {
				target.setStorage("jlsg_suohun_mark", 0, true);
			}
			target.storage.jlsg_suohun_mark += cnt;
			target.markSkill("jlsg_suohun_mark");
		},
		global: ["jlsg_suohun_mark"],
		subSkill: {
			mark: {
				forced: true,
				charlotte: true,
				mark: true,
				onremove: true,
				marktext: "魂",
				intro: {
					content: "共有#个标记",
				},
			},
		},
		group: ["jlsg_suohun2"],
		ai: {
			maixie_defend: true,
		},
	},
	jlsg_suohun2: {
		skillAnimation: true,
		audio: "jlsg_suohun",
		trigger: { player: "dyingBegin" },
		priority: 10,
		forced: true,
		filter: function (event, player) {
			return player.hp <= 0;
		},
		content: function () {
			"step 0"
			if (player.maxHp > 1) {
				player.maxHp = Math.floor(player.maxHp / 2);
				player.recover(player.maxHp - player.hp);
				player.update();
			} else {
				player.loseMaxHp();
				player.update();
			}
			"step 1"
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].getStorage("jlsg_suohun_mark", 0)) {
					player.line(game.players[i], "fire");
					game.delay(1.5);
					game.players[i].damage(game.players[i].getStorage("jlsg_suohun_mark", 0), player);
					game.players[i].setStorage("jlsg_suohun_mark", 0, true);
				}
			}
		},
		ai: {
			threaten: 0.9,
			effect: {
				target: function (card, player, target) {
					if (target.maxHp == 1) {
						return;
					}
					var num = 0;
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].getStorage("jlsg_suohun_mark", 0) && get.attitude(target, game.players[i]) <= -2) {
							num += game.players[i].getStorage("jlsg_suohun_mark", 0);
						}
					}
					if (get.tag(card, "damage")) {
						if (target.hp == 1) {
							return [0, 2 * num];
						}
						return [1, 0.5];
					}
				},
			},
		},
	},
	jlsg_juejing: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			maxHandcardBase: player => player.maxHp,
		},
		init(player) {
			if (player.hp > 1 && (game.phaseNumber == 0 || player.phaseNumber == 0)) {
				player.hp = 1;
				player.update();
			}
		},
		trigger: {
			global: "phaseBefore",
			player: ["changeHpAfter", "enterGame"],
		},
		filter: (event, player) => (event.name != "phase" || game.phaseNumber == 0) && player.hp > 1,
		forced: true,
		popup: false,
		content: () => {
			if (player.hp > 1) {
				player.logSkill("jlsg_juejing");
				player.hp = 1;
				player.update();
			}
		},
		ai: {
			maixie: true,
			maixue_hp: true,
			skillTagFilter(player) {
				if (player.hasSkill("jlsg_longhun")) {
					return player.hasCard(card => {
						return get.suit(card, player) == "heart" || get.tag(card, "save");
					}, "hes");
				}
				return player.hasCard(card => get.tag(card, "save"), "hes");
			},
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (target.getHp() > 1) {
							return;
						}
						if (get.tag(card, "damage") || get.tag(card, "losehp")) {
							return [1, 2];
						}
					} else if (get.tag(card, "recover")) {
						if (target.getHp() > 0) {
							if (player.hasSkill("jlsg_longhun") && card.cards.length > 1) {
								return [1, 2];
							}
							return 0;
						}
					}
				},
			},
		},
		group: "jlsg_juejing_draw",
		subSkill: {
			draw: {
				audio: "jlsg_juejing",
				trigger: {
					player: ["dying", "dyingAfter"],
				},
				forced: true,
				async content(event, trigger, player) {
					await player.draw(2);
				},
			},
		},
	},
	jlsg_longhun: {
		audio: "ext:极略/audio/skill:4",
		logAudio(event, player) {
			return "ext:极略/audio/skill/jlsg_longhun" + (4 - lib.suit.indexOf(get.suit(event.cards[0], player))) + ".mp3";
		},
		mod: {
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || player.needsToDiscard() < 2) {
					return num;
				}
				let suit = get.suit(card, player);
				if (suit === "heart") {
					return num - 3.6;
				}
			},
			aiValue(player, card, num) {
				if (num <= 0) {
					return num;
				}
				let suit = get.suit(card, player);
				if (suit === "heart") {
					return num + 3.6;
				} else if (suit === "club") {
					return num + 1;
				} else if (suit === "spade") {
					return num + 1.8;
				}
			},
			aiUseful(player, card, num) {
				if (num <= 0) {
					return num;
				}
				let suit = get.suit(card, player);
				if (suit === "heart") {
					return num + 3;
				} else if (suit === "club") {
					return num + 1;
				} else if (suit === "spade") {
					return num + 1;
				}
			},
		},
		locked: false,
		enable: ["chooseToUse", "chooseToRespond"],
		prompt: "将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出",
		viewAs(cards, player) {
			if (cards.length) {
				const suit = get.suit(cards[0], player);
				let name = { diamond: "sha", club: "shan", heart: "tao", spade: "wuxie" }[suit];
				if (name) {
					return { name, nature: name == "sha" ? "fire" : null };
				}
			}
			return null;
		},
		filter(event, player) {
			const filter = event.filterCard;
			const map = { sha: "diamond", shan: "club", tao: "heart", wuxie: "spade" };
			for (let name of Object.keys(map)) {
				if (filter(get.autoViewAs({ name, nature: name == "sha" ? "fire" : null }, "unsure"), player, event)) {
					return player.countCards("hes", { suit: map[name] });
				}
			}
			return false;
		},
		selectCard: [1, 2],
		position: "hes",
		complexCard: true,
		filterCard(card, player, event) {
			if (ui.selected.cards.length) {
				return get.suit(card, player) == get.suit(ui.selected.cards[0], player);
			}
			event = event || get.event();
			const filter = event._backup.filterCard,
				suit = get.suit(card, player);
			const name = { diamond: "sha", club: "shan", heart: "tao", spade: "wuxie" }[suit];
			if (name) {
				return filter(get.autoViewAs({ name }, "unsure"), player, event);
			}
			return false;
		},
		getValueList(event) {
			const player = event.player;
			const list = {};
			for (let card of player.getCards("hes")) {
				const suit = get.suit(card, player);
				if (!list[suit]?.length) {
					list[suit] = [];
				}
				list[suit].add(card);
			}
			for (let i in list) {
				list[i].sort((a, b) => get.value(b) - get.value(a));
			}
			return list;
		},
		getCheck(event) {
			const player = event.player,
				map = { sha: "diamond", shan: "club", tao: "heart", wuxie: "spade" };
			event.valueList ??= lib.skill.jlsg_longhun.getValueList(event);
			let suit = null,
				double = true,
				max = 0;
			for (let name in map) {
				if (!event._backup.filterCard(get.autoViewAs({ name, nature: name == "sha" ? "fire" : null }, "unsure"), player, event)) {
					continue;
				} else if (!event.valueList[map[name]]?.length) {
					continue;
				}
				let temp = name == "wuxie" ? 2 : name == "shan" ? 3 : get.order({ name, nature: name == "sha" ? "fire" : null }, player);
				if (temp <= max) {
					continue;
				}
				suit = map[name];
				max = temp;
			}
			if (suit) {
				if (event.name != "chooseToUse") {
					double = false;
				} else if (suit == "club") {
					const evt = event.getParent();
					if (evt?.player && evt?.player?.isIn()) {
						double = get.effect(evt.player, { name: "guohe_copy2" }, evt.player, player) > 0;
					}
				} else if (suit == "heart") {
					if (event.type == "dying" && event.dying.hp < 0) {
						double = false;
					}
					if (player.countCards("hse", i => get.tag(i, "save") || get.suit(i, player) == "heart") < 3) {
						double = false;
					} else {
						double = player.isPhaseUsing() ? player.needsToDiscard() > 0 : player.hp > -1;
					}
				} else if (suit == "spade") {
					if (event.getParent(4).name == "phaseJudge") {
						double = false;
					}
				} else if (suit == "diamond") {
					const card = get.autoViewAs({ name: "sha", nature: "fire" }, "unsure");
					const filterTarget = event._backup.filterTarget,
						range = get.select(event._backup.selectTarget);
					game.checkMod(card, player, range, "selectTarget", player);
					const targets = game.filterPlayer(current => {
						if (typeof filterTarget == "function") {
							return filterTarget(card, player, current);
						} else if (typeof filterTarget == "boolean") {
							return filterTarget;
						}
						return false;
					});
					if (range[1] < 0 || range[0] == targets.length) {
						double = targets.reduce((eff, target) => eff + get.effect(target, card, player, player), 0) > 0;
					}
					double = targets.some(target => get.effect(target, card, player, player) > 0);
				}
			}
			return [suit, double];
		},
		check(card) {
			const event = get.event(),
				player = get.player(),
				cards = ui.selected.cards?.slice();
			event.getCheck ??= lib.skill.jlsg_longhun.getCheck(event);
			const [suit, double] = event.getCheck;
			if (!suit) {
				return 0;
			} else if (cards?.length) {
				if (!double) {
					return 0;
				} else if (suit == "heart") {
					if (event.getTrigger()?.player && event.getTrigger()?.player != player) {
						if (get.attitude(player, event.getTrigger().player) < 0) {
							return 0;
						} else if (
							(function () {
								return get.value({ name: "tao" }, player) > get.value(cards.concat([card]), player);
							})()
						) {
							return 0;
						}
					}
				} else if (suit == "spade") {
					if (event.getTrigger()?.card?.cards?.length) {
						const gainCardsValue = get.value(event.getTrigger().card.cards, player),
							useCardValue = get.value(cards.concat([card]), player);
						if (gainCardsValue < useCardValue) {
							return 0;
						}
					}
				}
			}
			return event.valueList[suit].indexOf(card) + 1;
		},
		hiddenCard(player, name) {
			if (_status.connectMode && name == "wuxie" && player.countCards("hes") > 0) {
				return true;
			}
			let suit = { sha: "diamond", shan: "club", tao: "heart", wuxie: "spade" }[name];
			return name && player.countCards("hes", { suit: suit }) > 0;
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				var name;
				switch (tag) {
					case "respondSha":
						name = "diamond";
						break;
					case "respondShan":
						name = "club";
						break;
					case "save":
						name = "heart";
						break;
				}
				if (!player.countCards("hes", { suit: name })) {
					return false;
				}
			},
			order(item, player) {
				const event = get.event();
				if (player && event.name == "chooseToUse") {
					let max = 0;
					const map = { sha: "diamond", shan: "club", tao: "heart" };
					for (let name in map) {
						if (!event.filterCard(get.autoViewAs({ name: name, nature: name == "sha" ? "fire" : null }, "unsure"), player, event)) {
							continue;
						} else if (!player.countCards("hes", i => get.suit(i, player) == map[name])) {
							continue;
						}
						let temp = get.order({ name: name, nature: name == "sha" ? "fire" : null });
						if (temp > max) {
							max = temp;
						}
					}
					if (max > 0) {
						return max * 1.2;
					}
				}
				return 1;
			},
		},
		group: ["jlsg_longhun_effect"],
		subSkill: {
			effect: {
				trigger: { player: "useCard" },
				forced: true,
				popup: false,
				filter(event) {
					return event.skill == "jlsg_longhun" && event.cards && event.cards.length == 2;
				},
				content() {
					switch (trigger.card.name) {
						case "tao":
							trigger.targets.forEach(p => p.gainMaxHp());
							break;
						case "sha":
							trigger.effectCount += 2;
							break;
						case "shan":
							if (trigger.respondTo && trigger.respondTo[0]?.isIn()) {
								trigger.respondTo[0].randomDiscard(2, "he");
							}
							break;
						case "wuxie":
							if (!trigger.card.storage) {
								trigger.card.storage = {};
							}
							trigger.card.storage.nowuxie = true;
							trigger.directHit.addArray(game.players);
							player
								.when({ global: "eventNeutralized" })
								.filter(evt => {
									if (evt.type != "card" && evt.name != "_wuxie") {
										return false;
									}
									return evt._neutralize_event.card == trigger.card;
								})
								.then(() => {
									let cards = trigger.cards.filterInD("od");
									if (cards.length) {
										player.gain(cards, "gain2");
									}
								});
							break;
					}
				},
			},
		},
	},
	jlsg_nizhan: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseZhunbeiBegin" },
		forced: true,
		filter: function (event, player) {
			return event.player.isDamaged() || event.player.countMark("jlsg_nizhan");
		},
		marktext: "逆",
		intro: {
			content: "mark",
		},
		content: function () {
			if (trigger.player.isDamaged()) {
				trigger.player.addMark(event.name);
			} else {
				trigger.player.removeMark(event.name);
			}
		},
	},
	jlsg_cuifeng: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		selectTarget: 2,
		filter: function (event, player) {
			return game.countPlayer(p => p.countMark("jlsg_nizhan"));
		},
		filterTarget: function (card, player, target) {
			if (ui.selected.targets.length) {
				return true;
			}
			return target.countMark("jlsg_nizhan");
		},
		targetprompt: ["失去标记", "获得标记"],
		multitarget: true,
		content: function () {
			"step 0"
			targets[0].removeMark("jlsg_nizhan");
			targets[1].addMark("jlsg_nizhan");
			"step 1"
			targets[0].useCard({ name: "sha", isCard: true }, targets[1], "noai", false).animate = false;
		},
		ai: {
			order: 8,
			result: {
				target: function (player, target) {
					if (ui.selected.targets.length == 0) {
						return 1;
					} else {
						return get.effect(target, { name: "sha" }, ui.selected.targets[0], target) - 3;
					}
				},
			},
			expose: 0.3,
		},
	},
	jlsg_weizhen: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseDrawBegin2" },
		forced: true,
		filter: function (event, player) {
			if (event.numFixed) {
				return false;
			}
			if (event.player == player) {
				return game.countPlayer(p => p.countMark("jlsg_nizhan"));
			}
			return event.player.countMark("jlsg_nizhan") >= 2;
		},
		content: function () {
			if (player == trigger.player) {
				trigger.num += game.countPlayer(p => p.hasMark("jlsg_nizhan"));
			}
			if (trigger.player.countMark("jlsg_nizhan") >= 2) {
				--trigger.num;
			}
		},
		group: "jlsg_weizhen2",
		// get global() {
		//   debugger;
		//   return 'jlsg_weizhen3';
		// }
		global: "jlsg_weizhen3",
		init: function (player, skill) {
			// global skill will not run init, so we'll move here
			for (var p of game.players) {
				p.addSkillBlocker("jlsg_weizhen3");
			}
		},
		onremove: function (player, skill) {
			for (var p of game.players) {
				p.removeSkillBlocker("jlsg_weizhen3");
			}
		},
	},
	jlsg_weizhen2: {
		audio: "jlsg_weizhen",
		charlotte: true,
		trigger: { source: "damageBegin1" },
		filter: function (event, player) {
			return event.player.countMark("jlsg_nizhan") >= 3;
		},
		forced: true,
		content: function () {
			trigger.num++;
		},
	},
	jlsg_weizhen3: {
		audio: "jlsg_weizhen",
		charlotte: true,
		skillBlocker: function (skill, player) {
			return !lib.skill[skill].charlotte && !get.is.locked(skill, player) && player.countMark("jlsg_nizhan") >= 4;
		},
	},
	jlsg_zhiming: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		onChooseToUse(event) {
			if (game.online) {
				return;
			}
			const phaseUse = event.getParent(evt => evt.name == "phaseUse" && evt.player == event.player);
			const lastPhaseUse = game
				.getAllGlobalHistory("everything", evt => {
					if (evt.name != "phaseUse" || evt.player != event.player) {
						return false;
					}
					return evt != phaseUse;
				})
				.at(-1);
			const previous_jlsg_zhiming = lastPhaseUse?.jlsg_zhiming?.slice() || [false, false, false];
			event.set("previous_jlsg_zhiming", previous_jlsg_zhiming);
		},
		filter(event) {
			return event.previous_jlsg_zhiming?.some(i => i === false);
		},
		filterTarget: lib.filter.notMe,
		selectTarget() {
			return [1, _status.event.player.hp];
		},
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			const targets = event.targets.sortBySeat(),
				phaseUse = event.getParent(evtx => evtx.name == "phaseUse" && evtx.player == player);
			let info = phaseUse.previous_jlsg_zhiming || [false, false, false];
			if (info[0]) {
				info[0] = false;
			} else {
				const { result } = await player.chooseBool(`###是否失去1点体力？###令${get.translation(targets)}失去1点体力`, true);
				if (result.bool) {
					info[0] = true;
					await player.loseHp(1);
					for (let target of targets) {
						if (target.isIn()) {
							await target.loseHp(1);
						}
					}
				}
			}
			if (!player.isIn()) {
				return;
			}
			if (info[1]) {
				info[1] = false;
			} else {
				const { result } = await player.chooseBool(`###是否翻面？###令${get.translation(targets)}翻面`, true);
				if (result.bool) {
					info[1] = true;
					await player.turnOver();
					for (let target of targets) {
						if (target.isIn()) {
							await target.turnOver();
						}
					}
				}
			}
			if (!player.isIn()) {
				return;
			}
			if (info[2]) {
				info[2] = false;
			} else {
				let targetMax = Math.max(...targets.map(p => p.countDiscardableCards(p, "he")));
				let cards = [];
				if (targetMax + 3 >= player.countDiscardableCards(player, "h")) {
					cards = player.getDiscardableCards(player, "h");
				} else {
					cards = player.getDiscardableCards(player, "h").sort((a, b) => get.value(b) - get.value(a));
					if (cards.length > targetMax) {
						cards = cards.slice(0, targetMax);
					}
				}
				const { result } = await player
					.chooseToDiscard([1, Infinity], "he")
					.set("prompt2", `令${get.translation(targets)}弃置等量的牌`)
					.set("ai", c => _status.event.cardsx?.includes(c))
					.set("cardsx", cards);
				if (result.bool) {
					info[2] = true;
					const num = result.cards.length;
					for (let target of targets) {
						if (target.isIn()) {
							let cards = target.getDiscardableCards(target, "he");
							if (cards.length) {
								await target.chooseToDiscard(num, "he", true);
							}
						}
					}
				}
			}
			phaseUse.jlsg_zhiming = info;
		},
		ai: {
			expose: 0.4,
			order: 5,
			result: {
				target: -2,
			},
		},
	},
	jlsg_suyin: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter(event, player) {
			if (player.countCards("h")) {
				return false;
			}
			var evt = event.getl(player);
			return evt && evt.player == player && evt.hs && evt.hs.length > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`###${get.prompt(event.skill)}###令一名角色翻面`)
				.set("ai", target => {
					if (target.hasSkillTag("noTurnover")) {
						return 0;
					}
					const player = get.player();
					const att = get.attitude(player, target);
					if (target.isTurnedOver()) {
						if (target.isDamaged()) {
							return get.recoverEffect(target, player, player) + att;
						}
						return att;
					}
					return -att;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			let target = event.targets[0];
			await target.turnOver();
			if (!target.isTurnedOver() && target.isDamaged()) {
				await target.recoverTo(target.maxHp);
			}
		},
		ai: {
			expose: 0.3,
		},
	},
	jlsg_dianjie: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseDrawBefore", "phaseUseBefore"] },
		prompt: function (event, player) {
			if (event.name == "phaseDraw") {
				return "是否发动【电界】跳过摸牌阶段？";
			}
			return "是否发动【电界】跳过出牌阶段？";
		},
		check: function (event, player) {
			if (event.name == "phaseDraw") {
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
		content: function () {
			"step 0"
			trigger.finish();
			trigger.untrigger();
			player.judge(function (card) {
				const suit = get.suit(card);
				if (suit == "spade") {
					return 4;
				}
				if (suit == "club") {
					return 2;
				}
				return 0;
			}).judge2 = function (result) {
				return result.bool == false;
			};
			"step 1"
			if (result.suit == "spade") {
				player.chooseTarget("选择一个目标对其造成2点雷电伤害").ai = function (target) {
					return get.damageEffect(target, player, player, "thunder");
				};
			} else if (result.suit == "club") {
				player.chooseTarget("选择任意个目标将其横置", [1, game.countPlayer()], function (card, player, target) {
					return !target.isLinked();
				}).ai = function (target) {
					return -get.attitude(player, target);
				};
				event.goto(3);
			} else {
				event.finish();
			}
			"step 2"
			if (result.bool) {
				player.line(result.targets[0], "thunder");
				result.targets[0].damage("thunder", 2);
			}
			event.finish();
			"step 3"
			if (result.bool) {
				player.line(result.targets, "thunder");
				for (var i = 0; i < result.targets.length; i++) {
					result.targets[i].link();
				}
			}
		},
	},
	jlsg_shendao: {
		audio: "ext:极略/audio/skill:true",
		trigger: { global: "judge" },
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，是否发动【神道】？", function (card, player, target) {
				if (target == player) {
					return target.countCards("hej");
				}
				return target.countCards("ej");
			}).ai = function (target) {
				return player == target;
			};
			"step 1"
			if (result.bool) {
				event.target = result.targets[0];
				if (result.targets[0] == player) {
					player
						.chooseCard("请选择改判牌", "hej")
						.set("ai", function (card) {
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							var judging = _status.event.judging;
							var result = trigger.judge(card) - trigger.judge(judging);
							var attitude = get.attitude(player, trigger.player);
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
				} else {
					player
						.choosePlayerCard("请选择改判牌", result.targets[0], "ej")
						.set("ai", function (button) {
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							var judging = _status.event.judging;
							var result = trigger.judge(button) - trigger.judge(judging);
							var attitude = get.attitude(player, trigger.player);
							if (attitude == 0 || result == 0) {
								return 0;
							}
							if (attitude > 0) {
								return result - get.value(button) / 2;
							} else {
								return -result - get.value(button) / 2;
							}
						})
						.set("judging", trigger.player.judging[0]);
				}
			}
			"step 2"
			if (result.bool) {
				event.cardx = result.cards[0] || result.links[0];
				if (event.target != player) {
					event.target.$throw(event.cardx);
					event.target.lose(event.cardx, ui.ordering, "visible").relatedEvent = trigger;
					game.broadcastAll(function (card) {
						if (card.clone) {
							card.clone.classList.add("thrownhighlight");
						}
					}, event.cardx);
				} else {
					player.respond(event.cardx, "highlight", "noOrdering");
				}
			} else {
				event.finish();
			}
			"step 3"
			player.logSkill(event.name, event.target);
			player.gain(trigger.player.judging[0], "gain2");
			trigger.player.judging[0] = event.cardx;
			trigger.orderingCards.add(event.cardx);
			game.log(trigger.player, "的判定牌改为", event.cardx);
			"step 4"
			game.delayx();
		},
		ai: {
			tag: {
				rejudge: 1,
			},
		},
	},
	jlsg_leihun: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "damageBegin4",
		},
		forced: true,
		filter: function (event) {
			return event.nature == "thunder";
		},
		content: function () {
			trigger.cancel();
			player.recover(trigger.num);
		},
		ai: {
			nothunder: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "thunderDamage")) {
						if (target.isHealthy()) {
							return "zerotarget";
						}
						if (target.hp == 1) {
							return [0, 2];
						}
						return [0, 1];
					}
				},
			},
		},
	},
	jlsg_shelie: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			return !player.hasHistory("useSkill", evt => {
				return evt.skill == "jlsg_shelie" && evt.event.type0 == get.type2(event.card);
			});
		},
		frequent: true,
		popup: false,
		content() {
			let type0 = get.type2(trigger.card);
			event.type0 = type0;
			const cards = [get.cardPile2(c => get.type2(c) != type0)];
			if (!cards[0]) {
				return;
			}
			let type1 = get.type2(cards[0]);
			let card2 = get.cardPile2(c => get.type2(c) != type0 && get.type2(c) != type1);
			if (card2) {
				cards.push(card2);
			}
			player.logSkill("jlsg_shelie");
			player.gain(cards, "gain2");
		},
	},
	jlsg_gongxin: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("h");
		},
		async content(event, trigger, player) {
			const target = event.target;
			game.log(player, "观看了", target, "的手牌");
			const { result: result1 } = await player.gainPlayerCard(target, "h", "visible", "visibleMove");
			if (!result1.bool) {
				return;
			}
			if (!target.countCards("h")) {
				return;
			}
			const card = result1.cards[0];
			let prompt = `###是否弃置${get.translation(target)}一张牌？###令${get.translation(target)}不能使用或打出其余花色的牌`;
			const { result: result2 } = await player
				.discardPlayerCard(prompt, target, "h", "visible")
				.set("target", target)
				.set("suit", get.suit(card, target))
				.set("filterButton", button => get.suit(button.link, get.event("target")) != get.event("suit"))
				.set("ai", button => get.value(button.link, get.event("target")));
			if (!result2.bool) {
				return;
			}
			const suits = [get.suit(card, target), get.suit(result2.cards[0], target)];
			target.addTempSkill("jlsg_gongxin2");
			target.setStorage(
				"jlsg_gongxin2",
				lib.suit.filter(s => !suits.includes(s)),
				true
			);
		},
		ai: {
			result: {
				target: function (player, target) {
					return -target.countCards("h");
				},
			},
			order: 10,
		},
	},
	jlsg_gongxin2: {
		mark: true,
		marktext: "攻",
		charlotte: true,
		intro: {
			name: "攻心",
			content: "本回合不能使用或打出$",
		},
		mod: {
			cardEnabled: function (card, player) {
				if (player.getStorage("jlsg_gongxin2").includes(get.suit(card))) {
					return false;
				}
			},
			cardRespondable: function (card, player) {
				if (player.getStorage("jlsg_gongxin2").includes(get.suit(card))) {
					return false;
				}
			},
			cardSavable: function (card, player) {
				if (player.getStorage("jlsg_gongxin2").includes(get.suit(card))) {
					return false;
				}
			},
		},
		onremove: true,
	},
	jlsg_tianqi: {
		audio: "ext:极略/audio/skill:2",
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard: function (player, name) {
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
			if (player.isPhaseUsing() && get.event().type == "phase") {
				let basic = player.getStorage("jlsg_tianqi_used", {}).basic,
					trick = player.getStorage("jlsg_tianqi_used", {}).trick;
				return (type == "basic" && !basic) || (type == "trick" && !trick);
			}
			return true;
		},
		filter: function (event, player) {
			if (player.isDying()) {
				return false;
			}
			let basic = player.getStorage("jlsg_tianqi_used", {}).basic,
				trick = player.getStorage("jlsg_tianqi_used", {}).trick;
			if (player.isPhaseUsing() && get.event().type == "phase" && basic && trick) {
				return false;
			}
			for (let i of lib.inpile) {
				let type = get.type(i);
				if (!["basic", "trick"].includes(type)) {
					continue;
				}
				if (get.event().type == "phase") {
					if (type == "basic" && basic) {
						continue;
					} else if (type == "trick" && trick) {
						continue;
					}
				}
				if (i == "sha") {
					for (let j of lib.inpile_nature) {
						if (event.filterCard({ name: i, nature: j }, player, event)) {
							return true;
						}
					}
				} else if ((type == "basic" || type == "trick") && event.filterCard({ name: i }, player, event)) {
					return true;
				}
			}
			return false;
		},
		direct: true,
		chooseButton: {
			dialog: function (event, player) {
				let list1 = [],
					list2 = [],
					basic = player.getStorage("jlsg_tianqi_used", {}).basic,
					trick = player.getStorage("jlsg_tianqi_used", {}).trick;
				for (let i of lib.inpile) {
					let type = get.type(i);
					if (!["basic", "trick"].includes(type)) {
						continue;
					}
					if (player.isPhaseUsing() && get.event().type == "phase") {
						if (type == "basic" && basic) {
							continue;
						} else if (type == "trick" && trick) {
							continue;
						}
					}
					if (type == "basic") {
						if (i == "sha") {
							let natures = lib.inpile_nature.concat([null]);
							for (let j of natures) {
								if (event.filterCard({ name: i, nature: j }, player, event)) {
									list1.push([type, "", i, j]);
								}
							}
						} else if (event.filterCard({ name: i }, player, event)) {
							list1.push([type, "", i]);
						}
					}
					if (type == "trick") {
						if (event.filterCard({ name: i }, player, event)) {
							list2.push([type, "", i]);
						}
					}
				}
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
			filter: function (button, player) {
				var evt = get.event().getParent();
				return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
			},
			check: function (button, buttons) {
				var player = get.player();
				var card = { name: button.link[2], nature: button.link[3] };
				var knowHead = _status.pileTop?.isKnownBy(player);
				var event = get.event().getParent();
				var val = get.event().type == "phase" ? player.getUseValue(card) / 10 : 3;
				if (val > 0 && !get.event().type == "phase" && get.tag(event.getParent(), "damage") && event.getParent().name != "juedou" && !player.countCards("h", { name: button.link[2] }) && (!knowHead || get.type(ui.cardPile.firstChild, "trick") == get.type(button.link[2], "trick") || event.getParent().baseDamage > 1)) {
					return val;
				}
				var loseHpEffect = lib.jlsg.getLoseHpEffect(player);
				if (!knowHead) {
					loseHpEffect /= 2;
				} else {
					if (get.type(_status.pileTop, "trick") == get.type(button.link[2], "trick")) {
						loseHpEffect = 0;
					}
				}
				return val + loseHpEffect;
			},
			backup: function (links, player) {
				var tianqiOnUse = function (result, player) {
					if (player.isPhaseUsing() && get.event().type == "phase") {
						player.addTempSkill("jlsg_tianqi_used", "phaseUseAfter");
						player.storage.jlsg_tianqi_used[get.type2(result.card, false)] = true;
						player.markAuto("jlsg_tianqi_used");
					}
					player.logSkill("jlsg_tianqi");
					game.log(player, "声明了" + get.translation(links[0][0]) + "牌");
					var cards = get.cards(1);
					player.showCards(cards);
					result.cards = cards;
					result.card.cards = cards;
					if (get.type(cards[0], "trick") != links[0][0]) {
						player.loseHp();
						result.card.isCard = false;
					}
				};
				return {
					filterCard: () => false,
					selectCard: -1,
					popname: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						isCard: false,
					},
					onuse: tianqiOnUse,
					onrespond: tianqiOnUse,
				};
			},
			prompt: function (links, player) {
				return "亮出牌堆顶的一张牌,并将此牌当" + get.translation(links[0][2]) + "使用或打出.若亮出的牌不为" + get.translation(links[0][0]) + "牌,你须先失去1点体力.(你的出牌阶段每个类别限一次.)";
			},
		},
		ai: {
			order: 10,
			fireAttack: true,
			respondShan: true,
			respondSha: true,
			skillTagFilter: function (player, tag, arg) {
				if (player.isDying()) {
					return false;
				}
				let basic = player.getStorage("jlsg_tianqi_used", {}).basic,
					trick = player.getStorage("jlsg_tianqi_used", {}).trick;
				if (player.isPhaseUsing()) {
					return !basic || !trick;
				}
			},
			result: {
				player: function (player) {
					if (get.event().dying) {
						return get.attitude(player, get.event().dying);
					}
					var knowHead = _status.pileTop?.isKnownBy(player);
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
			threaten: 4,
		},
		subSkill: {
			used: {
				temp: true,
				charlotte: true,
				init(player) {
					player.setStorage("jlsg_tianqi_used", {}, true);
				},
				onremove: true,
			},
		},
	},
	jlsg_tianji: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseUseBegin" },
		frequent: true,
		filter: function (event, player) {
			if (!_status.pileTop) {
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			const cards = get.cards(3);
			if (!cards.length) {
				return;
			}
			await game.cardsGotoOrdering(cards);
			const { result } = await player
				.chooseToMove_new()
				.set("list", [["牌堆顶", cards], ["获得的牌"]])
				.set("prompt", "天机：请选择获得至多一张牌，并可以改变其余牌的顺序")
				.set("filterMove", function (from, to, moved) {
					if (to == 1) {
						return moved[1].length < 1;
					}
					return true;
				})
				.set("processAI", function (list) {
					let top = list[0][1],
						player = _status.event.player,
						target = _status.currentPhase || player,
						gain = [];
					top.sort((a, b) => {
						if (get.attitude(player, target) > 1) {
							return get.value(b, target) - get.value(a, target);
						}
						return get.value(a, target) - get.value(b, target);
					});
					if (get.attitude(player, target) > 1) {
						if (player.getUseValue(top[0]) >= target.getUseValue(top[0])) {
							gain.push(top.shift());
						}
					} else if (get.value(top[top.length - 1], target) > 6) {
						gain.push(top.pop());
					}
					return [top, gain];
				});
			let top = cards,
				gain;
			if (result.bool) {
				(top = result.moved[0]), (gain = result.moved[1]);
			}
			top.reverse();
			for (let i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			game.addCardKnower(top, player);
			if (gain?.length) {
				await player.gain(gain, "draw");
			}
			game.updateRoundNumber();
			await game.delayx();
		},
	},
	jlsg_xianzhu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "recoverAfter" },
		check: function (event, player) {
			return get.attitude(player, event.player) > 0;
		},
		logTarget: "player",
		content: function () {
			trigger.player.draw(2);
		},
		group: "jlsg_xianzhu2",
	},
	jlsg_xianzhu2: {
		audio: "jlsg_xianzhu",
		check: function (event, player) {
			return get.attitude(player, event.player) > 0;
		},
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		filter: function (event, player) {
			// var evt=event.getl(player);
			// return evt&&evt.es&&evt.es.length>0;
			return game.hasPlayer(p => {
				var evt = event.getl(p);
				return evt && evt.es && evt.es.length > 0;
			});
		},
		content: function () {
			"step 0"
			event.players = game.filterPlayer(p => {
				var evt = trigger.getl(p);
				return evt && evt.es && evt.es.length > 0;
			});
			"step 1"
			event.target = event.players.shift();
			if (!event.target) {
				event.finish();
				return;
			}
			var evt = trigger.getl(event.target);
			event.num = evt && evt.es && evt.es.length;
			"step 2"
			if (!event.num) {
				// next target
				event.goto(1);
				return;
			}
			--event.num;
			player.chooseBool(get.prompt2("jlsg_xianzhu", player != event.target ? event.target : undefined)).set("choice", get.attitude(player, event.target) > 0);
			"step 3"
			if (result.bool) {
				player.logSkill("jlsg_xianzhu2", event.target);
				event.target.draw(2);
				event.goto(2);
			} else {
				event.goto(1);
			}
		},
		ai: {
			noe: true,
			reverseEquip: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.type(card) == "equip" && !get.cardtag(card, "gifts")) {
						return [1, 3];
					}
				},
			},
		},
	},
	// jlsg_xianzhu2: {
	//   audio: "jlsg_xianzhu",
	//   trigger: { global: 'loseEnd' },
	//   check: function (event, player) {
	//     return get.attitude(player, event.player) > 0;
	//   },
	//   filter: function (event, player) {
	//     for (var i = 0; i < event.cards.length; i++) {
	//       if (event.cards[i].original == 'e') return true;
	//     }
	//     return false;
	//   },
	//   logTarget: 'player',
	//   content: function () {
	//     var num = 0;
	//     for (var i = 0; i < trigger.cards.length; i++) {
	//       if (trigger.cards[i].original == 'e') num += 2;
	//     }
	//     trigger.player.draw(num);
	//   },
	//   ai:{
	//     noe:true,
	//     reverseEquip:true,
	//     effect:{
	//       target:function(card,player,target,current){
	//         if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
	//       }
	//     }
	//   }
	// },
	jlsg_liangyuan: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		skillAnimation: true,
		limited: true,
		animationColor: "fire",
		init: function (player) {
			player.setStorage("jlsg_liangyuan", false, true);
		},
		filter: function (event, player) {
			return !player.storage.jlsg_liangyuan;
		},
		filterTarget: function (card, player, target) {
			return player != target && target.hasSex("male");
		},
		content: function () {
			player.setStorage("jlsg_liangyuan", true, true);
			target.addSkill("jlsg_liangyuan2");
		},
		ai: {
			order: 6,
			result: {
				target: 3,
			},
			threaten: function (player, target) {
				if (
					game.hasPlayer(function (target1) {
						return target.hasSkill("jlsg_liangyuan2");
					})
				) {
					return 3;
				}
			},
		},
	},
	jlsg_liangyuan2: {
		charlotte: true,
		mark: true,
		intro: {
			content: "mark",
		},
		marktext: "缘",
		trigger: { global: "phaseEnd" },
		filter: function (event, player) {
			return event.player.hasSkill("jlsg_liangyuan") && event.getParent().name == "phaseLoop";
		},
		forced: true,
		content: function () {
			player.insertPhase(event.name);
		},
	},
	jlsg_tianzi: {
		mod: {
			maxHandcard(player, num) {
				return num + game.countPlayer(cur => cur != player);
			},
		},
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			return !event.numFixed && game.countPlayer(cur => cur != player);
		},
		forced: true,
		async content(event, trigger, player) {
			trigger.num += game.countPlayer(cur => cur != player);
		},
	},
	jlsg_meixin: {
		onremove: true,
		enable: "phaseUse",
		marktext: "魅",
		intro: {
			content: "正在遭受女性毒打",
		},
		audio: "ext:极略/audio/skill:4",
		filter(event, player) {
			const num =
				game.countPlayer(current => {
					return current.hasMark("jlsg_meixin");
				}) + 1;
			if (player.countDiscardableCards(player, "he") <= num) {
				return false;
			}
			return game.hasPlayer(current => {
				if (current == player) {
					return false;
				}
				if (!current.hasSex("male")) {
					return false;
				}
				return !current.hasMark("jlsg_meixin");
			});
		},
		selectCard() {
			const num =
				game.countPlayer(current => {
					return current.hasMark("jlsg_meixin");
				}) + 1;
			return [num, num];
		},
		filterCard: lib.filter.cardDiscardable,
		check(card) {
			return 8 > get.value(card);
		},
		filterTarget(card, player, target) {
			if (target == player) {
				return false;
			}
			if (!target.hasSex("male")) {
				return false;
			}
			return !target.hasMark("jlsg_meixin");
		},
		filterOk() {
			const player = get.player(),
				target = ui.selected.targets[0];
			if (_status.connectMode && !player.isAuto) {
				return true;
			} else if (!_status.auto) {
				return true;
			}
			if (get.attitude(player, target) > 1) {
				return false;
			} else {
				return true;
			}
		},
		prompt() {
			const num =
				game.countPlayer(current => {
					return current.hasMark("jlsg_meixin");
				}) + 1;
			return `魅心：弃置${num}张牌并选择一名其他男性角色，令其直到其回合开始前遭受女性毒打`;
		},
		async content(event, trigger, player) {
			event.target.addMark("jlsg_meixin", 1);
		},
		ai: {
			order: 20,
			result: {
				player(player, target) {
					if (
						!game.hasPlayer(current => {
							if (current == player) {
								return false;
							}
							if (get.attitude(player, target) < 1) {
								return false;
							}
							return current.hasSex("male");
						})
					) {
						return 0;
					}
					return 0.1;
				},
				target: -1,
			},
		},
		group: "jlsg_meixin_effect",
		subSkill: {
			effect: {
				trigger: { global: ["phaseBegin", "useCardAfter"] },
				filter(event, player, name) {
					if (name == "phaseBegin") {
						return event.player.hasMark("jlsg_meixin");
					} else {
						if (!event.player.hasSex("female") && event.player != player) {
							return false;
						}
						return game.hasPlayer(current => {
							return current.hasMark("jlsg_meixin");
						});
					}
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					if (event.triggername == "phaseBegin") {
						trigger.player.removeMark("jlsg_meixin", trigger.player.countMark("jlsg_meixin"), false);
					} else {
						const type = get.type2(trigger.card, trigger.player);
						let targets = game.filterPlayer(cur => cur.hasMark("jlsg_meixin")).sortBySeat(player);
						await player.logSkill("jlsg_meixin", targets);
						for (const target of targets) {
							if (!target.isIn()) {
								continue;
							}
							if (type == "basic") {
								await target.discard(target.getCards("he").randomGet());
							} else if (type == "trick" && target.countGainableCards(player, "he")) {
								let card = target.getGainableCards(player, "he").randomGet();
								await player.gain(card, target, "giveAuto", "bySelf");
							} else {
								await target.damage(player);
							}
							await game.delayx();
						}
					}
				},
			},
		},
	},
	jlsg_lihun: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseEnd" },
		filter: () => true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("jlsg_lihun"), lib.filter.notMe)
				.set("ai", target => {
					return get.rank(target) - get.attitude(get.player(), target);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.setStorage("jlsg_lihun", target, true);
			target.insertPhase("jlsg_lihun");
		},
		group: ["jlsg_lihun_swapControl"],
		subSkill: {
			swapControl: {
				audio: false,
				trigger: { global: "phaseBeginStart" },
				filter(event, player) {
					if (player.storage?.jlsg_lihun != event.player) {
						return false;
					}
					return player != event.player && !event.player._trueMe;
				},
				charlotte: true,
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					delete player.storage.jlsg_lihun;
					player.markAuto("jlsg_lihun");
					trigger.player._trueMe = player;
					game.addGlobalSkill("autoswap");
					if (trigger.player == game.me) {
						game.notMe = true;
						if (!_status.auto) {
							ui.click.auto();
						}
					}
					trigger.player.addTempSkill("jlsg_lihun_buff", { player: "phaseAfter" });
				},
			},
			buff: {
				sourceSkill: "jlsg_lihun",
				trigger: {
					player: ["phaseAfter"],
					global: ["phaseBeforeStart", "dieAfter"],
				},
				lastDo: true,
				charlotte: true,
				forceDie: true,
				forced: true,
				popup: false,
				filter(event, player) {
					if (event.name == "die") {
						if (event.player != player && event.player != player._trueMe) {
							return false;
						}
					}
					return true;
				},
				async content(event, trigger, player) {
					player.removeSkill(event.name);
				},
				onremove(player) {
					if (player == game.me) {
						if (!game.notMe) {
							game.swapPlayerAuto(player._trueMe);
						} else {
							delete game.notMe;
						}
						if (_status.auto) {
							ui.click.auto();
						}
					}
					delete player._trueMe;
				},
				mark: true,
				marktext: "离",
				intro: {
					name: "离魂",
					content: "使用牌无次数距离限制,且可以指定任意角色为目标,且可指定任意名目标",
				},
				mod: {
					cardUsable: () => Infinity,
					targetInRange: () => true,
					playerEnabled(card, player, target) {
						let info = get.info(card);
						if (!info) {
							return;
						}
						if (info.modTarget) {
							if (typeof info.modTarget == "boolean") {
								return info.modTarget;
							} else if (typeof info.modTarget == "function") {
								return Boolean(info.modTarget(card, player, target));
							}
						}
						if (info.selectTarget) {
							return true;
						}
						return true;
					},
					selectTarget(card, player, num) {
						num = get.select(num);
						if (get.info(card).allowMultiple === false) {
							if (num[1] < 0) {
								if (num[0] === num[1]) {
									num[0] = 1;
								}
								num[1] = 1;
							}
						} else if (num[1] > 0) {
							num[1] = Infinity;
						} else if (num[0] <= -1 || num[1] <= -1) {
							num[0] = 1;
							num[1] = Infinity;
						} else if (get.info(card, player)?.filterTarget) {
							num[0] = 1;
							num[1] = Infinity;
						}
					},
				},
			},
		},
	},
	jlsg_jueshi: {
		audio: "ext:极略/audio/skill:2",
		priority: 114514,
		forced: true,
		trigger: { player: "showCharacterEnd" },
		delay: false,
		init: function (player) {
			if (player.hasSkill("jlsg_jueshi")) {
				player.useSkill("jlsg_jueshi");
			}
		},
		filter: function (event, player) {
			return player.maxHp != 1;
		},
		content: function () {
			player.maxHp = 1;
			player.update();
		},
		group: ["jlsg_jueshi2", "jlsg_jueshi_guard"],
		subSkill: {
			guard: {
				audio: "jlsg_jueshi",
				charlotte: true,
				forced: true,
				trigger: { player: ["gainMaxHpBefore", "loseMaxHpBefore"] },
				filter: function (event, player) {
					return player.hasSkill("jlsg_jueshi");
				},
				content: function () {
					trigger.cancel();
				},
			},
		},
	},
	jlsg_jueshi2: {
		audio: "jlsg_jueshi",
		trigger: { player: "dying" },
		locked: true,
		direct: true,
		async content(event, trigger, player) {
			while (player.isDying()) {
				const cards = Array.from(ui.cardPile.childNodes)
					.filter(c => player.canSaveCard(c, player))
					.concat(
						game
							.filterPlayer()
							.map(p => p.getCards("h", c => player.canSaveCard(c, player)))
							.flat()
					)
					.filter(card => {
						if (trigger?.filterCard) {
							let filter = trigger.filterCard;
							if (typeof filter == "function") {
								return filter(card, player, trigger);
							} else if (typeof filter == "boolean") {
								return filter;
							}
						}
						return player.canUse(card, player, false, trigger);
					});
				await player.logSkill(event.name);
				const card = cards.randomRemove();
				if (!card) {
					break;
				}
				await player.useCard(card, player);
			}
		},
	},
	jlsg_shayi: {
		audio: "ext:极略/audio/skill:4",
		mod: {
			targetInRange(card) {
				if (card.name === "sha") {
					return true;
				}
			},
			cardUsable(card) {
				if (card.name === "sha") {
					return Infinity;
				}
			},
		},
		enable: "chooseToUse",
		filter(event, player) {
			return player.isPhaseUsing() && player.hasCard(card => card.hasGaintag("jlsg_shayi"));
		},
		filterCard(card, player) {
			return card.hasGaintag("jlsg_shayi");
		},
		position: "hs",
		log: false,
		viewAs: { name: "sha" },
		viewAsFilter(player) {
			if (
				!player.countCards("hs", card => {
					return card.hasGaintag("jlsg_shayi");
				})
			) {
				return false;
			}
		},
		prompt: "将一张“杀意”牌当【杀】使用",
		check: card => get.value(card) < 7.5,
		precontent: function () {
			player.logSkill("jlsg_shayi");
			player.draw();
		},
		ai: {
			skillTagFilter(player) {
				if (
					!player.countCards("hes", card => {
						return card.hasGaintag("jlsg_shayi");
					})
				) {
					return false;
				}
			},
			respondSha: true,
			yingbian: function (card, player, targets, viewer) {
				if (get.attitude(viewer, player) <= 0) {
					return 0;
				}
				var base = 0,
					hit = false;
				if (get.cardtag(card, "yingbian_hit")) {
					hit = true;
					if (
						targets.some(target => {
							return (
								target.mayHaveShan(
									viewer,
									"use",
									target.getCards("h", i => {
										return i.hasGaintag("sha_notshan");
									})
								) &&
								get.attitude(viewer, target) < 0 &&
								get.damageEffect(target, player, viewer, get.natureList(card)) > 0
							);
						})
					) {
						base += 5;
					}
				}
				if (get.cardtag(card, "yingbian_add")) {
					if (
						game.hasPlayer(function (current) {
							return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
						})
					) {
						base += 5;
					}
				}
				if (get.cardtag(card, "yingbian_damage")) {
					if (
						targets.some(target => {
							return (
								get.attitude(player, target) < 0 &&
								(hit ||
									!target.mayHaveShan(
										viewer,
										"use",
										target.getCards("h", i => {
											return i.hasGaintag("sha_notshan");
										})
									) ||
									player.hasSkillTag(
										"directHit_ai",
										true,
										{
											target: target,
											card: card,
										},
										true
									)) &&
								!target.hasSkillTag("filterDamage", null, {
									player: player,
									card: card,
									jiu: true,
								})
							);
						})
					) {
						base += 5;
					}
				}
				return base;
			},
			canLink: function (player, target, card) {
				if (!target.isLinked() && !player.hasSkill("wutiesuolian_skill")) {
					return false;
				}
				if (player.hasSkill("jueqing") || player.hasSkill("gangzhi") || target.hasSkill("gangzhi")) {
					return false;
				}
				return true;
			},
			basic: {
				useful: [5, 3, 1],
				value: [5, 3, 1],
			},
			order(item, player) {
				let res = 3.2;
				if (player.hasSkillTag("presha", true, null, true)) {
					res = 10;
				}
				if (typeof item !== "object" || !game.hasNature(item, "linked") || game.countPlayer(cur => cur.isLinked()) < 2) {
					return res;
				}
				let uv = player.getUseValue(item, true);
				if (uv <= 0) {
					return res;
				}
				let temp = player.getUseValue("sha", true) - uv;
				if (temp < 0) {
					return res + 0.15;
				}
				if (temp > 0) {
					return res - 0.15;
				}
				return res;
			},
			result: {
				player: function (player) {
					var cards = player.getCards("hs", card => {
						return get.value(card) < 7.5 && card.hasGaintag("jlsg_shayi");
					});
					if (cards) {
						return 1;
					} else {
						return 0;
					}
				},
				target: function (player, target, card, isLink) {
					let eff = -1.5,
						odds = 1.35,
						num = 1;
					if (isLink) {
						let cache = _status.event.getTempCache("sha_result", "eff");
						if (typeof cache !== "object" || cache.card !== get.translation(card)) {
							return eff;
						}
						if (cache.odds < 1.35 && cache.bool) {
							return 1.35 * cache.eff;
						}
						return cache.odds * cache.eff;
					}
					if (
						player.hasSkill("jiu") ||
						player.hasSkillTag("damageBonus", true, {
							target: target,
							card: card,
						})
					) {
						if (
							target.hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
								jiu: true,
							})
						) {
							eff = -0.5;
						} else {
							num = 2;
							if (get.attitude(player, target) > 0) {
								eff = -7;
							} else {
								eff = -4;
							}
						}
					}
					if (
						!player.hasSkillTag(
							"directHit_ai",
							true,
							{
								target: target,
								card: card,
							},
							true
						)
					) {
						odds -=
							0.7 *
							target.mayHaveShan(
								player,
								"use",
								target.getCards("h", i => {
									return i.hasGaintag("sha_notshan");
								}),
								"odds"
							);
					}
					_status.event.putTempCache("sha_result", "eff", {
						bool: target.hp > num && get.attitude(player, target) > 0,
						card: get.translation(card),
						eff: eff,
						odds: odds,
					});
					return odds * eff;
				},
			},
			tag: {
				respond: 1,
				respondShan: 1,
				damage: function (card) {
					if (game.hasNature(card, "poison")) {
						return;
					}
					return 1;
				},
				natureDamage: function (card) {
					if (game.hasNature(card, "linked")) {
						return 1;
					}
				},
				fireDamage: function (card, nature) {
					if (game.hasNature(card, "fire")) {
						return 1;
					}
				},
				thunderDamage: function (card, nature) {
					if (game.hasNature(card, "thunder")) {
						return 1;
					}
				},
				poisonDamage: function (card, nature) {
					if (game.hasNature(card, "poison")) {
						return 1;
					}
				},
			},
		},
		group: "jlsg_shayi_mark",
		subSkill: {
			mark: {
				audio: "jlsg_shayi",
				trigger: {
					player: ["phaseUseBegin", "phaseUseAfter"],
				},
				filter: () => true,
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					if (event.triggername == "phaseUseBegin") {
						await player.logSkill("jlsg_shayi");
						await player.draw();
						let cards = player.getCards("h", { color: "black" });
						if (cards.length) {
							player.addGaintag(cards, "jlsg_shayi");
						}
					} else {
						let cards = player.getCards("hs", card => {
							return card.hasGaintag("jlsg_shayi");
						});
						if (cards) {
							await player.removeGaintag("jlsg_shayi", cards);
						}
					}
				},
			},
		},
	},
	jlsg_zhenhun: {
		audio: "ext:极略/audio/skill:true",
		enable: "phaseUse",
		usable: 1,
		selectTarget: -1,
		content: function () {
			var targets = game.filterPlayer(i => i != player);
			for (var i of targets) {
				i.addTempSkill("jlsg_zhenhun_debuff", "phaseUseAfter");
			}
		},
		ai: {
			order: 10,
			result: {
				player: function (player) {
					let eff,
						num = 0,
						targets = game.filterPlayer(i => i != player);
					for (let i of targets) {
						let skills = i.getSkills(null, false, false).filter(i => get.is.locked(i) && !i.charlotte && !i.persevereSkill).length;
						if (get.attitude(i, player) > 0) {
							eff = 1;
						} else {
							eff = -1;
						}
						num += (skills ? skills : 1) * eff;
					}
					if (num > 0) {
						return 1;
					} else {
						return 0;
					}
				},
				target: -1,
			},
			threaten: 1.3,
		},
		subSkill: {
			debuff: {
				mod: {
					cardEnabled: function (card, player) {
						if (player != _status.event.dying && card.name == "tao") {
							return false;
						}
					},
					cardSavable: function (card, player) {
						if (player != _status.event.dying && card.name == "tao") {
							return false;
						}
					},
				},
				init: function (player, skill) {
					player.addSkillBlocker(skill);
				},
				onremove: function (player, skill) {
					player.removeSkillBlocker(skill);
				},
				charlotte: true,
				skillBlocker: function (skill, player) {
					if (!lib.skill[skill]) {
						return false;
					}
					return !lib.skill[skill].charlotte && !lib.skill[skill].persevereSkill && !get.is.locked(skill, player);
				},
				mark: true,
				intro: {
					content: function (storage, player, skill) {
						var list = player.getSkills(null, false, false).filter(function (i) {
							return lib.skill.jlsg_zhenhun_debuff.skillBlocker(i, player);
						});
						if (list.length) {
							return "你不处于濒死时不能使用【桃】<br>失效技能：" + get.translation(list);
						}
						return "你不处于濒死时不能使用【桃】";
					},
				},
				sub: true,
				sourceSkill: "jlsg_zhenhun",
			},
		},
	},
	jlsg_yinshi: {
		forced: true,
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "damageBegin4" },
		filter: function (event) {
			return event.num > 0;
		},
		content: function () {
			player.draw(trigger.num);
			if (trigger.nature !== "thunder") {
				trigger.cancel();
			}
		},
		ai: {
			nofire: true,
			// nothunder: true,
			nodamage: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "damage")) {
						if (get.tag(card, "thunderDamage")) {
							return [1, 0.3];
						}
						return [0, 0.3];
					}
				},
			},
		},
	},

	jlsg_zhitian: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseBegin" },
		forced: true,
		content: function () {
			"step 0"
			if (!_status.characterlist) {
				game.initCharacterList();
			}
			_status.characterlist.randomSort();
			var list = [];
			var skills = [];
			var map = [];
			for (var i = 0; i < _status.characterlist.length; i++) {
				var name = _status.characterlist[i];
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1 || name.startsWith("jlsgsoul_sp_") || name.startsWith("jlsgsy_")) {
					continue;
				}
				if (!get.character(name)) {
					continue;
				}
				var skills2 = get.character(name)[3] ?? [];
				if (!skills2.length) {
					continue;
				}
				for (var j = 0; j < skills2.length; j++) {
					if (["jlsg_sanjue", "jlsg_xianshou"].includes(skills[k])) {
						continue;
					}
					if (skills.includes(skills2[j])) {
						list.add(name);
						if (!map[name]) {
							map[name] = [];
						}
						map[name].push(skills2[j]);
						skills.add(skills2[j]);
						continue;
					}
					var list2 = [skills2[j]];
					game.expandSkills(list2);
					for (var k = 0; k < list2.length; k++) {
						var info = lib.skill[list2[k]];
						if (!info || info.silent || info.hiddenSkill || info.unique || info.charlotte) {
							continue;
						}
						list.add(name);
						if (!map[name]) {
							map[name] = [];
						}
						map[name].push(skills2[j]);
						skills.add(skills2[j]);
					}
				}
				if (list.length > 2) {
					break;
				}
			}
			if (!skills.length) {
				event.finish();
			} else {
				player
					.chooseControl(skills)
					.set("dialog", ["选择一个技能", [list, "character"]])
					.set("ai", function () {
						return Math.floor(Math.random() * _status.event.controls.length);
					});
			}
			"step 1"
			if (!lib.skill[result.control]) {
				return;
			}
			event.skill = result.control;
			player
				.chooseTarget(true)
				.set("prompt2", "将所有手牌交给一名角色")
				.set("ai", function (target) {
					return get.attitude(player, target);
				});
			"step 2"
			if (!result.bool) {
				return;
			}
			if (result.targets[0] == player) {
				return;
			}
			player.line(result.targets[0], "green");
			var cards = player.getCards("h");
			result.targets[0].gain(cards, player, "giveAuto");
			"step 3"
			result.targets[0].addSkills(event.skill);
			result.targets[0].loseHp();
		},
	},
	jlsg_zhiji: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		enable: "phaseUse",
		filter(event, player) {
			return player.countDiscardableCards(player, "he", { subtype: "equip1" });
		},
		selectCard: [1, Infinity],
		position: "he",
		filterCard(card) {
			return get.subtype(card) == "equip1";
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		selectTarget() {
			let player = get.player();
			return [1, player.countDiscardableCards(player, "he", { subtype: "equip1" })];
		},
		filterOk() {
			return ui.selected.targets.length <= ui.selected.cards.length;
		},
		prompt: `出牌阶段限一次，你可以弃置任意张武器牌，然后你对至多X名其他角色各造成X点伤害（X为你弃置的牌数）`,
		check(card) {
			return 9 - get.value(card);
		},
		multiline: true,
		async content(event, trigger, player) {
			await event.target.damage(event.cards.length, player);
		},
		group: ["jlsg_zhiji_damage"],
		subSkill: {
			damage: {
				audio: "ext:极略/audio/skill:true",
				trigger: {
					player: ["damageEnd", "phaseZhunbeiBegin"],
				},
				filter: function (event, player) {
					if (event.name == "damege") {
						return true;
					} else {
						return player.isDamaged();
					}
				},
				check: function (event, player) {
					return !player.hasSkillTag("nogain");
				},
				prompt: `掷戟：是否从从牌堆或弃牌堆中、场上的随机获得一张武器牌，然后你弃置一张非装备牌。`,
				async content(event, trigger, player) {
					let bool,
						position = ["pile", "target"];
					while (position.length) {
						let card,
							o = position.randomGet();
						if (o == "pile") {
							card = get.cardPile(i => get.subtype(i) == "equip1");
							if (card) {
								await player.gain(card, "gain2");
								bool = true;
								break;
							}
						} else {
							var targets = game.filterPlayer(function (current) {
								return current != player && current.getEquips(1).length > 0;
							});
							if (targets.length) {
								var target = targets.randomGet();
								await player.gain(target.getEquips(1)[0], target, "give", "bySelf");
								bool = true;
								break;
							}
						}
						position.remove(o);
					}
					if (bool) {
						if (player.countDiscardableCards(player, "h", i => get.type(i) != "equip")) {
							await player.chooseToDiscard(true, "h", function (card, player) {
								return get.type(card) != "equip";
							});
						}
					} else {
						player.chat(`你们把武器藏哪了！`);
					}
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					effect: {
						target(card, player, target) {
							var card1 = get.cardPile(i => get.subtype(i) == "equip1");
							var card2 = game.filterPlayer(function (current) {
								return current != target && current.getEquips(1).length > 0;
							});
							if (!card1 && !card2.length) {
								return;
							}
							if (get.tag(card, "damage")) {
								if (player.hasSkillTag("jueqing", false, target)) {
									return [1, -1];
								}
								if (!target.hasFriend()) {
									return;
								}
								let num = 0.5;
								if (get.attitude(player, target) > 0) {
									if (player.needsToDiscard()) {
										num = 0.35;
									} else {
										num = 0.25;
									}
								}
								if (target.hp >= 4) {
									return [1, num * 2];
								}
								if (target.hp == 3) {
									return [1, num * 1.5];
								}
								if (target.hp == 2) {
									return [1, num * 0.5];
								}
							}
						},
					},
				},
				sub: true,
				sourceSkill: "jlsg_zhiji",
			},
		},
		ai: {
			order: function (item, player) {
				if (
					game.hasPlayer(i => i != player && get.damageEffect(i, player, player) > 0) &&
					player.hasCard(i => {
						return get.subtype(i) == "equip1" && (get.value(i, player) < 9 || get.useful(i, player) < 8);
					}, "he")
				) {
					return 10;
				} else {
					return 0;
				}
			},
			result: {
				target: -1.5,
			},
			tag: {
				damage: 1,
			},
		},
	},
	jlsg_yuanhua: {
		audio: "ext:极略/audio/skill:2",
		mark: true,
		intro: {
			content: "已移出游戏#张【桃】",
		},
		init(player) {
			player.setStorage("jlsg_yuanhua", 0, true);
		},
		trigger: {
			player: "gainAfter",
			global: "loseAsyncAfter",
		},
		getIndex(event, player) {
			if (event.getg && typeof event.getg === "function") {
				return event.getg(player);
			}
			return event.cards;
		},
		filter(event, player, triggername, card) {
			return card.name == "tao";
		},
		forced: true,
		async content(event, trigger, player) {
			const card = event.indexedData;
			if (player.isDamaged()) {
				await player.recover();
			}
			await player.draw(2, "nodelay");
			game.log(player, "将", card, "移出游戏");
			await player.lose(card, ui.special);
			player.addMark("jlsg_yuanhua", 1, false);
		},
	},
	jlsg_guiyuan: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		selectTarget: -1,
		filterTarget(card, player, target) {
			return target != player;
		},
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			await player.loseHp(1);
			event.targets.sortBySeat();
			for (const target of event.targets) {
				const cards = target.getGainableCards(player, "he", card => card.name == "tao");
				if (cards.length) {
					await target
						.chooseToGive(player, `请交给${get.translation(player)}一张【桃】`, true)
						.set("filterCard", card => get.event("tao").includes(card))
						.set("tao", cards);
				}
			}
			let card = get.cardPile("tao");
			if (card) {
				await player.gain(card, "gain2", "log");
			}
		},
		global: "jlsg_guiyuan_ai",
		ai: {
			order: 12,
			result: {
				player(player) {
					const cardPile = [...ui.cardPile.childNodes, ...ui.discardPile.childNodes].filter(card => card.name == "tao");
					if (!cardPile.length) {
						return 0;
					}
					return player.hp > 1 || player.canSave(player) ? 1 : 0;
				},
			},
		},
	},
	jlsg_guiyuan_ai: {
		charlotte: true,
		ai: {
			nokeep: true,
			skillTagFilter(player) {
				if (!game.hasPlayer(p => p.hasSkill("jlsg_guiyuan") && get.attitude(player, p) < 2)) {
					return false;
				}
			},
		},
	},
	jlsg_chongsheng: {
		skillAnimation: true,
		animationColor: "gray",
		limited: true,
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "dying" },
		check(event, player) {
			if (get.attitude(player, event.player) < 1) {
				return false;
			}
			if (
				player.countCards("hs", function (card) {
					let mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") {
						return mod2;
					}
					let mod = game.checkMod(card, player, event.player, "unchanged", "cardSavable", player);
					if (mod != "unchanged") {
						return mod;
					}
					let savable = get.info(card).savable;
					if (typeof savable == "function") {
						savable = savable(card, player, event.player);
					}
					return savable;
				}) >=
				1 - event.player.hp
			) {
				return false;
			}
			if (event.player == player || event.player == get.zhu(player)) {
				return true;
			}
			return !player.hasUnknown();
		},
		filter(event, player) {
			return event.player.hp <= 0;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			let num = player.getStorage("jlsg_yuanhua", 1);
			let gainMaxHp = num - trigger.player.maxHp;
			if (num > 0) {
				await trigger.player.gainMaxHp(gainMaxHp);
			} else if (num < 0) {
				await trigger.player.loseMaxHp(-gainMaxHp);
			}
			await trigger.player.recoverTo(trigger.player.maxHp);
			if (!trigger.player.isAlive() || !trigger.player.group || trigger.player.group == "unknown" || trigger.player.isUnseen(0)) {
				return;
			}
			const group = trigger.player.group;
			let list = jlsg.characterList.filter(c => get.character(c, 1) == group),
				players = game.players
					.concat(game.dead)
					.map(current => get.nameList(current))
					.unique()
					.flat();
			list.removeArray(players);
			list = list.randomGets(3);
			if (!list.length) {
				return;
			}
			const { result } = await trigger.player
				.chooseButton()
				.set("ai", function (button) {
					return get.rank(button.link, true) - get.character(button.link, 2) - (get.rank(trigger.player.name1, true) - get.character(trigger.player.name1, 2));
				})
				.set("createDialog", ["将武将牌替换为一名角色", [list, "character"]]);
			if (result.bool) {
				await trigger.player.reinitCharacter(trigger.player.name, result.links[0], false);
			}
		},
	},

	jlsg_qinyin: {
		audio: "ext:极略/audio/skill:2",
		direct: true,
		trigger: {
			player: "phaseDiscardBefore",
		},
		filter: function (event, player) {
			return true;
		},
		content: function () {
			"step 0"
			var list = ["摸两张牌，然后令所有角色各失去1点体力。"];
			if (player.countCards("he") >= 2) {
				list.push("弃两张牌，然后令所有角色各恢复1点体力。");
			}
			event.list = list;
			player
				.chooseControlList(event.list)
				.set("prompt", `###${get.prompt(event.name)}###跳过弃牌阶段`)
				.set("ai", function (event, player) {
					var recover = 0,
						lose = 1,
						players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (players[i].hp < players[i].maxHp) {
							if (get.attitude(player, players[i]) > 0) {
								if (players[i].hp < 2) {
									lose--;
									recover += 0.5;
								}
								lose--;
								recover++;
							} else if (get.attitude(player, players[i]) < 0) {
								if (players[i].hp < 2) {
									lose++;
									recover -= 0.5;
								}
								lose++;
								recover--;
							}
						} else {
							if (get.attitude(player, players[i]) > 0) {
								lose--;
							} else if (get.attitude(player, players[i]) < 0) {
								lose++;
							}
						}
					}
					if (player.countCards("h") < player.hp - 1) {
						lose++;
					}
					if (player.needsToDiscard()) {
						recover++;
					}
					if (lose > recover && lose > 0) {
						return event.list.indexOf("摸两张牌，然后令所有角色各失去1点体力。");
					}
					if (lose < recover && recover > 0 && event.list.includes("弃两张牌，然后令所有角色各恢复1点体力。")) {
						return event.list.indexOf("弃两张牌，然后令所有角色各恢复1点体力。");
					}
					return event.list.indexOf("cancel2");
				});
			"step 1"
			event.choice = result.index;
			if (event.list[result.index] == "摸两张牌，然后令所有角色各失去1点体力。") {
				event.recover = false;
				trigger.cancel();
				player.draw(2);
				var players = game.filterPlayer().sortBySeat();
				player.logSkill("jlsg_qinyin2");
				for (var i = 0; i < players.length; i++) {
					players[i].loseHp();
				}
			} else if (event.list[result.index] == "弃两张牌，然后令所有角色各恢复1点体力。") {
				event.recover = true;
				trigger.cancel();
				player.chooseToDiscard(2, "he", true);
				var players = game.filterPlayer().sortBySeat();
				player.logSkill("jlsg_qinyin1");
				for (var i = 0; i < players.length; i++) {
					players[i].recover();
				}
			} else {
				event.finish();
			}
			"step 2"
			if (!player.isIn()) {
				event.finish();
				return;
			}
			let evts = player.getAllHistory("useSkill", e => lib.translate[e.skill] == "业炎");
			if (!evts.length) {
				event.finish();
				return;
			}

			var prompt = `###是否再次触发〖业炎〗?###`;
			var choice;
			if (!event.recover) {
				prompt += "令所有角色各失去1点体力";
				choice =
					game
						.filterPlayer()
						.map(p => -get.attitude(player, p) / p.hp)
						.reduce((a, b) => a + b, 0) > Math.random();
			} else {
				prompt += "令所有角色各恢复1点体力";
				choice =
					game
						.filterPlayer()
						.map(p => get.recoverEffect(p, player, player))
						.reduce((a, b) => a + b, 0) > Math.random();
			}
			player.chooseBool(prompt, choice);
			"step 3"
			if (!result.bool) {
				event.finish();
				return;
			}
			var players = game.filterPlayer().sortBySeat();
			if (!event.recover) {
				for (var i = 0; i < players.length; i++) {
					players[i].loseHp();
				}
			} else {
				for (var i = 0; i < players.length; i++) {
					players[i].recover();
				}
			}
		},
		group: ["jlsg_qinyin1", "jlsg_qinyin2"],
	},
	jlsg_qinyin1: {
		audio: "ext:极略/audio/skill:true",
		charlotte: true,
	},
	jlsg_qinyin2: {
		audio: "ext:极略/audio/skill:true",
		charlotte: true,
	},
	jlsg_yeyan: {
		marktext: "炎",
		mark: true,
		forceDie: true,
		enable: "phaseUse",
		audio: "ext:极略/audio/skill:3",
		animationColor: "metal",
		skillAnimation: "legend",
		init: function (player) {
			player.storage.jlsg_yeyan = false;
		},
		filterCard(card) {
			return true;
		},
		limited: true,
		selectCard: [1, 4],
		line: "fire",
		check(card) {
			let result;
			let red = ui.selected.cards.filter(c => get.color(c) == "red").length;

			let black = ui.selected.cards.filter(c => get.color(c) == "black").length;
			if (get.color(card) == "red") {
				result =
					game
						.filterPlayer()
						.map(p => get.damageEffect(p, _status.event.player, _status.event.player, "fire"))
						.sort((a, b) => b - a)
						.slice(0, black)
						.reduce((a, b) => a + Math.max(b, 0), 0) - get.value(card);
			} else if (get.color(card) == "black") {
				result = game
					.filterPlayer()
					.map(p => get.damageEffect(p, _status.event.player, _status.event.player, "fire") * (red + 1))
					.sort((a, b) => b - a)[black];
				result = result || 0;
				result = Math.max(result, 0);
				result -= get.value(card);
			} else {
				result = -get.value(card) / 3;
			}
			return result;
		},
		filterTarget: true,
		selectTarget() {
			return [1, 1 + ui.selected.cards.filter(c => get.color(c) == "black").length];
		},
		multitarget: true,
		multiline: true,
		content: function () {
			"step 0"
			player.awakenSkill("jlsg_yeyan");
			"step 1"
			targets.sortBySeat();
			let cnt = cards.filter(c => get.color(c, player) == "red").length + 1;
			if (cnt * targets.length >= 5) {
				player.loseHp(3);
			}
			for (let p of targets) {
				p.damage("fire", cnt);
			}
		},
		intro: {
			content: "limited",
		},
		ai: {
			order: 6,
			fireattack: true,
			result: {
				player: function (player, target) {
					return game.filterPlayer(p => get.attitude(player, p) < 0).length > 1 ? 5 : -5;
				},
				target: function (player, target) {
					if (target.hasSkillTag("nofire")) {
						return 0;
					}
					if (lib.config.mode == "versus") {
						return -1;
					}
					if (player.hasUnknown()) {
						return 0;
					}
					return get.damageEffect(target, player, player) / get.attitude(player, target);
				},
			},
		},
	},
	jlsg_qianqi: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			targetInRange(card) {
				if (card?.storage?.jlsg_qianqi) {
					return true;
				}
			},
			cardUsable(card, player) {
				if (card?.storage?.jlsg_qianqi) {
					return Infinity;
				}
			},
		},
		marktext: "骑",
		intro: {
			content: "mark",
		},
		enable: "chooseToUse",
		viewAsFilter(player) {
			return player.countMark("jlsg_qianqi") > 0;
		},
		viewAs: {
			name: "sha",
			storage: { jlsg_qianqi: true },
		},
		selectCard: -1,
		filterCard() {
			return false;
		},
		prompt: "弃置一枚「千骑」标记，视为使用一张无距离次数限制且不计入次数的【杀】",
		async precontent(event, trigger, player) {
			if (event.getParent().addCount != false) {
				event.getParent().addCount = false;
			}
			player.removeMark("jlsg_qianqi", 1);
		},
		group: ["jlsg_qianqi_start", "jlsg_qianqi_lose"],
		subSkill: {
			start: {
				audio: "ext:极略/audio/skill:2",
				trigger: {
					player: "enterGame",
					global: "phaseBefore",
				},
				forced: true,
				filter(event) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				async content(event, trigger, player) {
					let defend = get.cardPile(card => get.subtype(card, player) == "equip3"),
						attack = get.cardPile(card => get.subtype(card, player) == "equip4");
					if (defend || attack) {
						const { cards } = await player.gain([defend, attack], "gain2");
						for (let card of cards) {
							player.$give(card, player, false);
							await player.equip(card);
						}
					}
				},
			},
			lose: {
				audio: "jlsg_qianqi_start",
				trigger: {
					global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				getIndex(event, player) {
					return game
						.filterPlayer(current => {
							let evt = event.getl?.(current);
							return evt?.es?.some(card => ["equip3", "equip4", "equip6"].includes(get.subtype(card, current)));
						})
						.sortBySeat();
				},
				filter(event, player, triggername, target) {
					return target;
				},
				forced: true,
				async content(event, trigger, player) {
					player.addMark("jlsg_qianqi", 2);
				},
			},
		},
		ai: {
			respondSha: true,
			skillTagFilter(player) {
				return player.countMark("jlsg_qianqi");
			},
		},
	},
	jlsg_juechen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageBegin2" },
		filter(event, player) {
			return event.card?.name == "sha" && event.player != player;
		},
		async cost(event, trigger, player) {
			const { result } = await player
				.chooseControlList([`改为其失去${trigger.num}点体力`, `改为其失去1点体力上限`])
				.set("prompt", get.prompt(event.skill, trigger.player))
				.set("ai", (event, player) => {
					const trigger = event.getTrigger(),
						target = trigger.player;
					const loseHpEffect = get.effect(target, { name: "losehp" }, player, player),
						damageEffect = get.damageEffect(target, player, player, trigger.nature);
					if (loseHpEffect > 0 || damageEffect > 0) {
						return loseHpEffect > damageEffect ? 0 : 2;
					}
					if (get.attitude(player, target) < 0) {
						return 1;
					}
					return 2;
				});
			event.result = {
				bool: result && result.control != "cancel2",
				cost_data: result?.index,
			};
		},
		async content(event, trigger, player) {
			trigger.cancel();
			const { cost_data: index } = event;
			if (index == 0) {
				await trigger.player.loseHp(trigger.num);
			} else {
				await trigger.player.loseMaxHp();
			}
		},
		ai: {
			ignoreSkill: true,
			skillTagFilter(player, tag, arg) {
				if (!arg || arg.isLink || !arg.card || arg.card.name != "sha") {
					return false;
				}
				if (!arg.target || get.attitude(player, arg.target) >= 0) {
					return false;
				}
			},
		},
	},
	jlsg_luocha: {
		audio: "ext:极略/audio/skill:2",
		initList: function () {
			if (!_status.characterlist) {
				game.initCharacterList();
			}
			_status.jlsg_luocha_list = [];
			_status.jlsg_luocha_list_hidden = [];
			for (var c of _status.characterlist) {
				let list = (get.character(c)[3] ?? []).filter(s => lib.skill[s] && lib.translate[s] && lib.translate[s + "_info"]);
				_status.jlsg_luocha_list.addArray(list.filter(s => lib.skill[s].shaRelated));
				_status.jlsg_luocha_list_hidden.addArray(list.filter(s => get.plainText(get.skillInfoTranslation(s, get.player())).includes("【杀】")));
			}
		},
		trigger: {
			player: "enterGame",
			global: ["phaseBefore", "dying"],
		},
		forced: true,
		filter: function (event, player, name) {
			if (name == "dying") {
				return event.player != player;
			}
			return event.name != "phase" || game.phaseNumber == 0;
		},
		async content(event, trigger, player) {
			if (!_status.jlsg_luocha_list || !_status.jlsg_luocha_list_hidden) {
				lib.skill.jlsg_luocha.initList();
			}
			let num = event.triggername == "dying" ? 1 : 3;
			if (num == 1) {
				await player.draw(2);
			}
			if (!_status.jlsg_luocha_list.length && !_status.jlsg_luocha_list_hidden.length) {
				game.log("没有可以获得的技能了");
			} else {
				let list1 = _status.jlsg_luocha_list.filter(s => !player.hasSkill(s)).randomSort(),
					list2 = _status.jlsg_luocha_list_hidden.filter(s => !player.hasSkill(s)).randomSort();
				let skills = list1
					.concat(list2)
					.unique()
					.filter(skill => {
						const info = lib.skill[skill];
						if (info.ai?.combo) {
							return player.hasSkill(info.ai.combo, null, false, false);
						}
						return true;
					});
				if (!skills.length) {
					game.log("没有可以获得的技能了");
				} else {
					await player.addSkills(skills.randomGets(num));
				}
			}
			await game.delayx();
		},
	},
	jlsg_shajue: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget: lib.filter.notMe,
		precontent: function () {
			player.loseHp();
		},
		content: function () {
			"step 0"
			event.cards = new Set(player.getCards("h"));
			"step 1"
			var card = player.getCards("h", c => event.cards.has(c)).randomGet();
			event.cards.delete(card);
			if (!card || !target.isIn()) {
				event.finish();
				return;
			}
			player.useCard(
				{
					name: "sha",
					nature: lib.inpile_nature.concat(null).randomGet(),
					storage: {
						jlsg_shajue: true,
					},
				},
				[card],
				target
			);
			event.redo();
		},
		ai: {
			order: function () {
				return get.order({ name: "sha" }) - 0.5;
			},
			result: { target: -2 },
			threaten: 2.5,
			unequip: true,
			skillTagFilter: function (player, tag, arg) {
				if (!arg || !arg.card || !arg.card.storage || !arg.card.storage.jlsg_shajue) {
					return false;
				}
			},
		},
	},
	jlsg_guiqu: {
		audio: "ext:极略/audio/skill:2",
		enable: "chooseToUse",
		getSkills(player) {
			return player.getSkills(null, false, false).filter(s => lib.translate[s] && lib.translate[s + "_info"] && lib.skill[s] && !lib.skill[s].nopopup && !lib.skill[s].charlotte && !lib.skill[s].equipSkill);
		},
		filter: function (event, player) {
			return player.isDying() && event.filterCard({ name: "tao" }, player, event) && lib.skill.jlsg_guiqu.getSkills(player).length > 1;
		},
		hiddenCard: function (player, name) {
			return player.isDying() && name === "tao" && lib.skill.jlsg_guiqu.getSkills(player).length > 1;
		},
		chooseButton: {
			dialog: function (event, player) {
				var dialog = ui.create.dialog("鬼躯", "hidden");
				var table = document.createElement("div");
				table.classList.add("add-setting");
				table.style.margin = "0";
				table.style.width = "100%";
				table.style.position = "relative";
				var skills = lib.skill.jlsg_guiqu.getSkills(player);
				// skills = skills.remove('jlsg_guiqu');
				for (var s of skills) {
					var td = ui.create.div(".shadowed.reduce_radius.pointerdiv.tdnode");
					td.innerHTML = "<span>" + lib.translate[s] + "</span>";
					td.link = s;
					td.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.button);
					table.appendChild(td);
					dialog.buttons.add(td);
				}
				dialog.content.appendChild(table);
				dialog.add("　");
				return dialog;
			},
			check: function (button) {
				return Math.random();
			},
			prompt: function (links, player) {
				return `失去〖${get.translation(links[0])}〗,视为使用一张【桃】`;
			},
			backup: function (links) {
				return {
					audio: "jlsg_guiqu",
					viewAs: {
						name: "tao",
						isCard: true,
					},
					selectCard: -1,
					filterCard: () => false,
					skill: links[0],
					onuse: function (links, player) {
						player.removeSkills(this.skill);
						player.popup(this.skill);
					},
				};
			},
		},
		ai: {
			result: {
				player: function (player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		mod: {
			maxHandcard: function (player, num) {
				return lib.skill.jlsg_guiqu.getSkills(player).length;
			},
		},
	},
	jlsg_shenfu: {
		audio: "ext:极略/audio/skill:3",
		init: function (player) {
			player.storage.jlsg_shenfu = [];
		},
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter: function (event, player) {
			if (player.countCards("h") >= 4) {
				return false;
			}
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length;
		},
		frequent: true,
		content: function () {
			"step 0"
			player.drawTo(4);
			"step 1"
			let cards = trigger.getl(player).hs;
			let suit = get.suit(cards, player);
			if (!suit) {
				event.finish();
				return;
			}
			let storage = player.storage[event.name];
			storage.unshift(suit);
			if (storage.length > 4) {
				storage.length = 4;
			}
			player.markSkill(event.name);

			storage = new Set(storage);
			if (storage.size == 4) {
				player.chooseTarget(`###${get.prompt(event.name)}###对一名角色造成1点雷电伤害`).set("ai", function (target) {
					return get.damageEffect(target, _status.event.player, _status.event.player, "thunder");
				});
			} else {
				event.finish();
			}
			"step 2"
			if (result.bool) {
				result.targets[0].damage("thunder");
			}
		},
		marktext: "赋",
		intro: {
			content: function (storage, player, name) {
				let suits = storage.slice();
				while (suits.length < 4) {
					suits.push(null);
				}
				suits.unshift("_");
				return suits
					.reverse()
					.map(s => {
						if (!s) {
							return "s";
						}
						if (s == "none") {
							return "无";
						}
						return get.translation(s);
					})
					.join(" ");
			},
		},
		ai: {
			noh: true,
		},
	},
	jlsg_lvezhen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageSource" },
		filter: function (event, player) {
			if (event.player == player) {
				return false;
			}
			const phaseUse = event.getParent("phaseUse");
			if (!phaseUse || phaseUse.name != "phaseUse" || phaseUse.player != player) {
				return false;
			}
			return event.player.isIn() && event.player.countCards("he") > 0;
		},
		async cost(event, trigger, player) {
			const next = await player
				.gainPlayerCard(trigger.player, "he")
				.set("prompt", "掠阵：是否获得" + get.translation(trigger.player) + "的一张牌并翻面？")
				.set("prompt2", "然后若你背面朝上，你可以结束当前回合")
				.set("chooseonly", true);
			event.result = {
				bool: next.result?.bool,
				targets: [trigger.player],
				cost_data: { next },
			};
		},
		async content(event, trigger, player) {
			const {
				cost_data: { next },
			} = event;
			await player.gain(next.result.cards, next.target, "bySelf");
			await player.turnOver();
			const phase = trigger.getParent("phase", true);
			const target = _status.currentPhase || phase.player;
			if (player.isTurnedOver() && phase && !phase.finished) {
				const { result } = await player
					.chooseBool("掠阵：是否结束" + get.translation(target) + "的回合")
					.set("ai", (event, player) => get.attitude(player, get.event("target")) > 0)
					.set("target", target);
				if (result.bool) {
					await player.logSkill("jlsg_lvezhen", target);
					phase.num = phase.phaseList.length;
					phase.step = 13;
					game.log(target, "的回合结束了");
				}
			}
		},
	},
	jlsg_youlong: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseBegin" },
		filter(event, player) {
			return event.player != player;
		},
		forced: true,
		async content(event, trigger, player) {
			await player.draw();
			const next = game.createEvent("phaseUse", false, event);
			next.player = player;
			event.next.remove(next);
			event.next.unshift(next);
			next.setContent("phaseUse");
			await next;
		},
	},
	jlsg_danjing: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: ["damageEnd", "loseHpEnd", "loseMaxHpEnd", "loseAfter"],
		},
		filter: function (event, player) {
			if (event.name != "lose") {
				return true;
			}
			return event.type == "discard";
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2(event.name), lib.filter.notMe).set("ai", function (target) {
				return -get.attitude(_status.event.player, target) + Math.random() - 0.5;
			});
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = result.targets[0];
			player.logSkill(event.name, target);
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			switch (trigger.name) {
				case "damage":
					target.damage(trigger.num);
					break;
				case "loseHp":
					target.loseHp(trigger.num);
					break;
				case "loseMaxHp":
					target.loseMaxHp(trigger.num);
					break;
				case "lose":
					target.chooseToDiscard(true, "he", trigger.cards.length);
					break;
			}
		},
		ai: {
			maixie_defend: true,
		},
	},
	jlsg_zhonghun: {
		audio: "ext:极略/audio/skill:2",
		limited: true,
		enable: "phaseUse",
		skillAnimation: true,
		animationColor: "thunder",
		filterTarget: lib.filter.notMe,
		content() {
			"step 0"
			player.awakenSkill(event.name);
			"step 1"
			player.loseMaxHp();
			target.gainMaxHp();
			target.recover();
			"step 2"
			player.storage.jlsg_zhonghun2 = target;
			player.markSkill("jlsg_zhonghun2");
			player.addSkill("jlsg_zhonghun2");
		},
		ai: {
			order: 3,
			result: {
				player: function (player, target) {
					if (["nei", "rYe", "bYe", "zhu", "rZhu", "bZhu"].includes(player.identity)) {
						return -5;
					}
					return player.isHealthy() ? -1 : 0;
				},
				target: function (player, target) {
					if (target.hp == 1) {
						return 5;
					}
					if (target.hp == 2) {
						return 2;
					}
					return 1;
				},
			},
			threaten: 2,
		},
		group: ["jlsg_zhonghun3"],
	},
	jlsg_zhonghun3: {
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2("jlsg_zhonghun"), lib.filter.notMe).set("ai", function (target) {
				return get.attitude(_status.event.player, target) - 10;
			});
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.addExpose(0.4);
			player.useSkill("jlsg_zhonghun", result.targets);
		},
	},
	jlsg_zhonghun2: {
		audio: "jlsg_zhonghun",
		intro: {
			content: "player",
		},
		locked: false,
		forced: true,
		trigger: {
			global: "damageBegin4",
			player: "dieBegin",
		},
		filter: function (event, player) {
			if (event.name == "damage") {
				return player.storage.jlsg_zhonghun2 == event.player;
			} else {
				return player.storage.jlsg_zhonghun2;
			}
		},
		content: function () {
			if (trigger.name == "damage") {
				trigger.player = player;
			} else {
				var skills = player.getSkills(null, false, false).filter(function (i) {
					var info = get.info(i);
					return info && !info.charlotte;
				});
				var target = player.storage.jlsg_zhonghun2;
				target.addSkills(skills);
			}
		},
	},
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
			player.addMark("jlsg_jiyang", 3);
		},
		onremove(player, skill) {
			let cards = [],
				num = player.storage[skill];
			player.clearMark(skill);
			while (num > 0) {
				let card = get.cardPile2(function (card) {
					if (cards.includes(card)) {
						return false;
					}
					return get.color(card, false) == "red";
				}, "random");
				num--;
				if (card) {
					cards.add(card);
				} else {
					break;
				}
			}
			if (cards.length) {
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
		filter: function (event, player) {
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
		init(player) {
			player.addMark("jlsg_jiyin", 3);
		},
		onremove(player, skill) {
			let cards = [],
				num = player.storage[skill];
			player.clearMark(skill);
			while (num > 0) {
				let card = get.cardPile2(function (card) {
					if (cards.includes(card)) {
						return false;
					}
					return get.color(card, false) == "black";
				}, "random");
				num--;
				if (card) {
					cards.add(card);
				} else {
					break;
				}
			}
			if (cards.length) {
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
		filter: function (event, player) {
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
		init(player) {
			player.addMark("jlsg_xiangsheng", 6);
		},
		onremove(player, skill) {
			let num = player.storage[skill];
			player.clearMark(skill);
			if (num > 0) {
				player.draw(num);
			}
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
		filter: function (event, player, triggername, color) {
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
	jlsg_dingming: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: ["phaseZhunbeiBegin", "damageEnd"],
		},
		filter: function (event, player) {
			if (player.hp == player.getDamagedHp()) {
				return false;
			}
			if (event.name == "damage" && (!event.source || event.source == player)) {
				return false;
			}
			return true;
		},
		check: function (event, player) {
			let markCnt = player.countMark(lib.skill["jlsg_yinyang_s"].getCurrentSkill(player));
			if (player.hp > player.getDamagedHp()) {
				if (!game.hasPlayer(p => get.attitude(player, p) < -5)) {
					return false;
				}
				let targetHp = player.getDamagedHp();
				return targetHp > 0 && player.hp - targetHp <= 3 - markCnt;
			}
			if (player.hp + 1 < player.getDamagedHp()) {
				return true;
			}
			return Math.random() < 1 - 0.2 * markCnt;
		},
		prompt2: "交换体力与已损失体力",
		content: function () {
			"step 0"
			event.diff = player.getDamagedHp() - player.hp;
			player.changeHp(event.diff);
			"step 1"
			if (player.hp <= 0) {
				game.delayx();
				event._dyinged = true;
				player.dying(event);
			}
			"step 2"
			player.draw(Math.abs(event.diff));
			"step 3"
			if (player.hp > player.getDamagedHp()) {
				player.loseMaxHp();
			}
		},
		group: "jlsg_dingming2",
	},
	jlsg_dingming2: {
		audio: "jlsg_dingming",
		trigger: { source: "damageSource" },
		filter: function (event, player) {
			if (event.player == player || !event.player.isIn()) {
				return false;
			}
			return event.player.hp != event.player.getDamagedHp();
		},
		check: function (event, player) {
			let diff = event.player.getDamagedHp() - event.player.hp;
			if (get.attitude(player, event.player) >= 0) {
				return diff > 0;
			}
			if (diff > 0) {
				return false;
			}
			if (["nei", "rYe", "bYe"].includes(player.identity) && get.attitude(player, event.player) > -5) {
				return false;
			}
			if (diff == -1) {
				return !player.isHealthy();
			} else {
				return true;
			}
		},
		logTarget: "player",
		prompt2: function (event, player) {
			return `令${get.translation(event.player)}交换体力与已损失体力`;
		},
		content: function () {
			"step 0"
			event.diff = trigger.player.getDamagedHp() - trigger.player.hp;
			trigger.player.changeHp(event.diff);
			"step 1"
			if (trigger.player.hp <= 0) {
				game.delayx();
				// event._dyinged=true;
				trigger.player.dying(event);
			}
			"step 2"
			player.draw(Math.abs(event.diff));
			"step 3"
			if (trigger.player.hp < trigger.player.getDamagedHp()) {
				player.loseMaxHp();
			}
		},
	},
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
				trigger: { global: "damageEnd" },
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
						if (player.getRoundHistory("damage", evt => evt.hasNature()).indexOf(trigger) == 0) {
							await player.loseMaxHp(1);
						}
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
	jlsg_yanlie: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterCard: true,
		selectCard: function () {
			if (ui.selected.targets.length) {
				return [ui.selected.targets.length, Math.min(ui.selected.targets.length + 1, game.players.length - 1)];
			}
			return [1, Infinity];
		},
		check: function (card) {
			var player = _status.event.player;
			let maxTarget = game.countPlayer(p => lib.skill.jlsg_yanlie.ai.result.target(player, p) * get.attitude(player, p) > 0);
			if (maxTarget <= ui.selected.cards.length) {
				return 0;
			}
			return 6 - get.value(card);
		},
		selectTarget: function () {
			return ui.selected.cards.length;
		},
		filterTarget() {
			return lib.filter.notMe;
		},
		line: false,
		delay: false,
		multitarget: true,
		multiline: true,
		content: function () {
			"step 0"
			player.useCard(
				{
					name: "tiesuo",
					isCard: true,
					storage: {
						nowuxie: true,
					},
				},
				targets
			);
			"step 1"
			player
				.chooseTarget(true, function (_, player, target) {
					return target.isLinked();
				})
				.set("prompt2", "对一名横置角色造成1点火焰伤害")
				.set("ai", function (target, targets) {
					if (target == _status.event.player) {
						return 0;
					}
					return Math.random();
				});
			"step 2"
			if (result.bool) {
				result.targets[0].damage("fire");
			}
		},
		ai: {
			order: 7,
			fireDamage: true,
			result: {
				target: function (player, target) {
					if (target.isLinked() && !target.hasSkill("jlsg_lianti")) {
						return 0.5;
					}
					if (target.hasSkillTag("nofire")) {
						return 0;
					}
					let eff = get.damageEffect(target, player, player, "fire") / get.attitude(player, target);
					if (player.hasSkill("jlsg_lianti")) {
						eff *= 2;
					}
					return eff;
				},
			},
		},
	},
	jlsg_fengying: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "drawBegin" },
		getIndex(event) {
			return event.num;
		},
		filter(event, player) {
			return player.getHistory("useSkill", e => e.skill == "jlsg_fengying").length < 4;
		},
		direct: true,
		async content(event, trigger, player) {
			const sha = get.autoViewAs({ name: "sha", nature: "thunder", isCard: true }, []);
			const { result } = await player.chooseUseTarget("nodistance", get.prompt2("jlsg_fengying"), sha, false).set("logSkill", "jlsg_fengying");
			if (result.bool) {
				--trigger.num;
			}
		},
	},
	jlsg_zhiti: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageBegin2" },
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			return event.player.getStorage("jlsg_zhiti").length < 5;
		},
		direct: true,
		content() {
			"step 0"
			event._options = ["取其1点体力和体力上限", "取其摸牌阶段的一摸牌数", "取其一个技能", "令其不能使用装备牌", "令其翻面"];
			event.options = event._options.filter(c => !trigger.player.getStorage(event.name).includes(c));
			event.skills = trigger.player.getSkills(null, false, false).filter(i => {
				let info = get.info(i);
				if (!info) {
					return false;
				}
				return !info.persevereSkill && !info.charlotte;
			});
			if (!event.skills.length) {
				event.options.remove(event._options[2]);
			}
			player.chooseControlList(get.prompt(event.name, trigger.player), event.options, function () {
				return Math.floor(Math.random() * _status.event.parent.options.length);
			});
			"step 1"
			if (result.control == "cancel2") {
				event.finish();
				return;
			}
			player.logSkill(event.name, trigger.player);
			event.choice = event.options[result.index];
			trigger.player.storage[event.name] = trigger.player.getStorage(event.name).concat(event.choice);
			game.log(player, "选择" + event.choice);
			switch (event.choice) {
				case event._options[0]:
					trigger.player.loseHp();
					trigger.player.loseMaxHp();
					break;
				case event._options[1]:
					trigger.player.addSkill("jlsg_zhiti2");
					trigger.player.storage.jlsg_zhiti2 = (trigger.player.storage.jlsg_zhiti2 || 0) - 1;
					break;
				case event._options[2]:
					player
						.chooseControl(event.skills)
						.set("ai", () => Math.random())
						.set("prompt", `获取${get.translation(trigger.player)}一个技能`);
					break;
				case event._options[3]:
					trigger.player.addSkill("jlsg_zhiti3");
					break;
				case event._options[4]:
					trigger.player.turnOver();
					break;

				default:
					break;
			}
			"step 2"
			switch (event.choice) {
				case event._options[0]:
					player.gainMaxHp();
					player.recover();
					break;
				case event._options[1]:
					player.addSkill("jlsg_zhiti2");
					player.storage.jlsg_zhiti2 = (player.storage.jlsg_zhiti2 || 0) + 1;
					break;
				case event._options[2]:
					trigger.player.removeSkills(result.control);
					player.addSkills(result.control);
					break;

				default:
					break;
			}
			"step 3"
			game.delayx();
		},
	},
	jlsg_zhiti2: {
		charlotte: true,
		mark: true,
		trigger: { player: "phaseDrawBegin" },
		forced: true,
		filter: function (event, player) {
			return !event.numFixed;
		},
		content: function () {
			trigger.num += player.storage.jlsg_zhiti2;
			if (trigger.num < 0) {
				trigger.num = 0;
			}
		},
		intro: {
			content: function (storage, player) {
				if (player.storage.jlsg_zhiti2 > 0) {
					return "摸牌阶段的额定摸牌数+" + player.storage.jlsg_zhiti2;
				}
				return "摸牌阶段的额定摸牌数-" + -player.storage.jlsg_zhiti2;
			},
			markcount: function (storage, player) {
				return Math.abs(player.storage.jlsg_zhiti2);
			},
		},
		ai: {
			halfneg: true,
		},
	},
	jlsg_zhiti3: {
		intro: {
			content: "不能使用装备牌",
		},
		mark: true,
		mod: {
			cardEnabled: function (card, player) {
				if (get.type(card) == "equip") {
					return false;
				}
			},
		},
	},
	jlsg_huchi: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		viewAs: {
			name: "juedou",
			isCard: true,
			storage: { nowuxie: true },
		},
		viewAsFilter: function (player) {
			return !player.hasSkill("jlsg_huchi_disable");
		},
		filterCard: () => false,
		selectCard: -1,
		group: ["jlsg_huchi2", "jlsg_huchi3"],
		subSkill: {
			disable: {},
		},
	},
	jlsg_huchi2: {
		charlotte: true,
		silent: true,
		trigger: { global: "damageEnd" },
		filter(event, player) {
			return event.card && event.card.name == "juedou" && event.getParent().skill == "jlsg_huchi";
		},
		content() {
			trigger.player.draw(3);
		},
	},
	jlsg_huchi3: {
		charlotte: true,
		silent: true,
		trigger: {
			player: "useCardAfter",
			global: "dying",
		},
		filter(event, player) {
			if (event.name == "useCard") {
				return event.card.name === "juedou" && event.skill == "jlsg_huchi" && game.getGlobalHistory("changeHp", e => e.getParent().name === "damage" && e.getParent().card === event.card).length === 0;
			}
			return event.reason && event.reason.card && event.reason.card.name === "juedou" && event.reason.getParent().skill == "jlsg_huchi";
		},
		content() {
			player.addTempSkill("jlsg_huchi_disable", "phaseUseAfter");
		},
	},
	jlsg_xiejia: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageBegin1" },
		filter: function (event, player) {
			if (!player.isEmpty(2)) {
				return false;
			}
			return event.card && (event.card.name == "sha" || event.card.name == "juedou") && event.notLink();
		},
		forced: true,
		content: function () {
			trigger.num += 1 + player.countMark("jlsg_xiejia");
		},
		group: "jlsg_xiejia2",
		ai: {
			damageBonus: true,
			skillTagFilter: function (player) {
				return player.isEmpty(2);
			},
		},
	},
	jlsg_xiejia2: {
		audio: "jlsg_xiejia",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		forced: true,
		filter: function (event, player) {
			var evt = event.getl(player);
			return evt && evt.es && evt.es.some(c => get.subtype(c) == "equip2");
		},
		content() {
			player.addMark("jlsg_xiejia");
		},
	},
	jlsg_wangyue: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["loseAfter", "loseAsyncAfter", "loseHpAfter", "loseMaxHpAfter"],
		},
		getIndex(event, player) {
			const name = event.name == "loseAsync" ? "lose" : event.name;
			if (name == "lose") {
				return game
					.filterPlayer(current => {
						return event.getl(current) && event.getl(current).cards2.length;
					})
					.sortBySeat(_status.currentPhase);
			}
			return [event.player];
		},
		filter(event, player, triggername, target) {
			if (!get.info("jlsg_wangyue")?.trigger.global?.includes(triggername)) {
				return false;
			}
			const name = event.name == "loseAsync" ? "lose" : event.name;
			if (player.hasStorage("jlsg_wangyue_used", name)) {
				return false;
			} else if (!game.hasPlayer(current => current != target)) {
				return false;
			}
			if (name == "lose") {
				return event.type == "discard";
			} else if (name == "loseHp") {
				return game.hasPlayer(current => current.isDamaged());
			}
			return true;
		},
		async cost(event, trigger, player) {
			let prompt = `望月:令一名角色`,
				num = trigger.num;
			const name = trigger.name == "loseAsync" ? "lose" : trigger.name;
			if (name == "lose") {
				num = trigger.getl(event.indexedData).cards2.length;
				prompt += `摸${num}张牌`;
			} else if (name == "loseHp") {
				prompt += `回复${trigger.num}点体力`;
			} else {
				prompt += `加${trigger.num}点体力上限`;
			}
			event.result = await player
				.chooseTarget(prompt)
				.set("filterTarget", (_, player, target) => target != get.event("source"))
				.set("ai", target => {
					const player = get.player(),
						name = get.event("key");
					if (name == "lose") {
						return get.effect(target, { name: "draw" }, player, player);
					} else if (name == "loseHp") {
						return get.recoverEffect(target, player, player);
					}
					return get.attitude(player, target);
				})
				.set("key", name)
				.set("source", event.indexedData)
				.forResult();
			if (event.result?.bool) {
				event.result.cost_data = { name, num };
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: { name, num },
			} = event;
			player.addTempSkill("jlsg_wangyue_used");
			player.storage.jlsg_wangyue_used.add(name);
			player.markSkill("jlsg_wangyue_used");
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			if (name == "lose") {
				await target.draw(num, player);
			} else if (name == "loseHp") {
				await target.recover(num, player);
			} else {
				await target.gainMaxHp(num);
			}
		},
		subSkill: {
			used: {
				charlotte: true,
				init(player, skill) {
					player.storage[skill] = [];
				},
				onremove: true,
				mark: true,
				intro: {
					content(storage, player) {
						let str = "本回合已因：",
							reasons = [];
						for (let name of storage) {
							if (name == "lose") {
								reasons.add("弃牌");
							} else if (name == "loseHp") {
								reasons.add("失去体力");
							} else {
								reasons.add("失去体力上限");
							}
						}
						str += reasons.join("、") + "发动";
						return str;
					},
				},
			},
		},
	},
	jlsg_luoyan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		content() {
			"step 0"
			player.chooseTarget(get.prompt2(event.name), (_, player, target) => !target.hasSkill("jlsg_luoyan2")).set("ai", (target, targets) => -get.attitude(_status.event.player, target) * (target.countCards("he") + 3));
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			let target = result.targets[0];
			player.logSkill(event.name, target);
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.3);
			}
			target.addTempSkill("jlsg_luoyan2", { player: "dieAfter" });
			if (player.storage.jlsg_luoyan && player.storage.jlsg_luoyan.hasSkill("jlsg_luoyan2")) {
				player.storage.jlsg_luoyan.removeSkill("jlsg_luoyan2");
			}
			player.storage.jlsg_luoyan = target;
		},
	},
	jlsg_luoyan2: {
		intro: {
			name: "落雁",
			content: "被选择为了目标",
		},
		mark: true,
		trigger: { player: "useCardAfter" },
		charlotte: true,
		silent: true,
		filter(event, player) {
			let evt = _status.event.getParent("phaseUse");
			if (evt.name != "phaseUse" || evt.player != player) {
				return false;
			}
			let evts = player.getHistory("useCard", e => e != event && e.getParent("phaseUse") == evt);
			return evts.length < 3;
		},
		content() {
			player.popup("jlsg_luoyan");
			let evt = _status.event.getParent("phaseUse");
			let cnt = player.getHistory("useCard", e => e.getParent("phaseUse") == evt).length;
			switch (cnt) {
				case 1:
					player.randomDiscard();
					break;
				case 2:
					player.loseHp();
					break;
				case 3:
					player.loseMaxHp();
					break;
			}
		},
		mod: {
			aiOrder: function (player, card, num) {
				let evt = _status.event.getParent("phaseUse");
				if (evt.name == "phaseUse" && evt.player == player) {
					let cnt = player.getHistory("useCard", e => e.getParent("phaseUse") == evt).length;
					if (cnt == 1 || (cnt == 2 && !player.isDamaged())) {
						return num - 10;
					}
				}
			},
		},
		ai: {
			pretao: true,
			nokeep: true,
		},
	},
	jlsg_jieying: {
		audio: "ext:极略/audio/skill:2",
		marktext: "营",
		intro: {
			name: "劫营",
			name2: "劫营",
			content: "mark",
		},
		trigger: { player: "phaseDrawBegin1" },
		filter(event, player) {
			return !event.numFixed && game.filterPlayer(p => p != player && !p.countMark("jlsg_jieying")).length;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2("jlsg_jieying"))
				.set("filterTarget", (_, player, target) => target != player && !target.hasMark("jlsg_jieying"))
				.set("ai", target => 10 - get.attitude(get.player(), target))
				.forResult();
		},
		async content(event, trigger, player) {
			trigger.changeToZero();
			event.targets[0].addMark(event.name, 3);
			player.addExpose(3);
		},
		group: "jlsg_jieying_effect",
		subSkill: {
			effect: {
				sourceSkill: "jlsg_jieying",
				audio: "jlsg_jieying",
				locked: false,
				firstDo: true,
				trigger: { global: ["drawBefore", "recoverBefore", "gainMaxHpBefore", "phaseBefore", "changeSkillsBefore"] },
				filter(event, player) {
					if (!event.player.countMark("jlsg_jieying")) {
						return false;
					}
					if (event.player == player) {
						return false;
					}
					if (event.name == "phase") {
						return event.skill;
					}
					if (event.name == "changeSkills") {
						return event.addSkill.length && !(player.countMark("jlsg_jieying") && game.hasPlayer(p => p != player && p.hasSkill("jlsg_jieying")));
					}
					return true;
				},
				forced: true,
				logTarget: "player",
				async content(event, trigger, player) {
					if (trigger.name != "changeSkills") {
						trigger.player.removeMark("jlsg_jieying");
						trigger.player = player;
						return;
					}
					let changed = trigger.addSkill;
					trigger.addSkill = [];
					trigger.player.removeMark("jlsg_jieying");
					await player.addSkills(changed);
				},
			},
		},
		ai: {
			threaten: 6,
		},
	},
	jlsg_jinlong: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		mod: {
			globalFrom(from, to, distance) {
				var num =
					distance +
					from
						.getExpansions("jlsg_jinlong")
						.map(c => {
							let d = get.info(c).distance;
							return d && d.globalFrom;
						})
						.reduce((a, b) => a + (b ? b : 0), 0);
				return num;
			},
			globalTo(from, to, distance) {
				var num =
					distance +
					to
						.getExpansions("jlsg_jinlong")
						.map(c => {
							let d = get.info(c).distance;
							return d && d.globalTo;
						})
						.reduce((a, b) => a + (b ? b : 0), 0);
				return num;
			},
		},
		trigger: {
			player: "gainAfter",
			global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter", "equipAfter"],
		},
		filter(event, player) {
			if (event.getg && event.getg?.(player)) {
				if (event.getg(player).some(c => c.name != "muniu" && get.type(c) == "equip")) {
					return true;
				}
			}
			if (event.name == "cardsDiscard") {
				let evt = event.getParent();
				if (evt.name == "orderingDiscard") {
					evt = evt.relatedEvent || evt.getParent();
				}
				if (evt && evt.name != "judge") {
					return event.cards.some(card => card.name != "muniu" && get.position(card, true) == "d" && get.type(card) == "equip");
				}
			} else {
				return event.getd().some(card => card.name != "muniu" && get.position(card, true) == "d" && get.type(card) == "equip");
			}
			return false;
		},
		forced: true,
		async content(event, trigger, player) {
			const cards = [],
				gain = [];
			if (trigger.getg && trigger.getg(player)) {
				gain.addArray(trigger.getg(player).filter(c => c.name != "muniu" && get.type(c) == "equip"));
				if (gain.length) {
					const next = player.addToExpansion(gain, "give");
					next.gaintag.add(event.name);
					await next;
				}
			}
			if (trigger.name == "cardsDiscard") {
				let evt = trigger.getParent();
				if (evt.name == "orderingDiscard") {
					evt = evt.relatedEvent || evt.getParent();
				}
				if (evt && evt.name != "judge") {
					cards.addArray(trigger.cards.filter(card => card.name != "muniu" && get.position(card, true) == "d" && get.type(card) == "equip"));
				}
			} else {
				cards.addArray(trigger.getd().filter(card => card.name != "muniu" && get.position(card, true) == "d" && get.type(card) == "equip"));
			}
			if (cards.length) {
				game.log(player, "将", cards, "置于了武将牌上");
				const next = player.addToExpansion(cards, "gain2", "log");
				next.gaintag.add(event.name);
				await next;
			}
			const cards2 = cards.addArray(gain).unique();
			player.addAdditionalSkill(
				event.name,
				get.skillsFromEquips(cards2).filter(i => lib.translate[i]),
				true
			);
			player.draw(cards2.length);
		},
	},
	jlsg_liegong: {
		audio: "ext:极略/audio/skill:2",
		locked: false,
		enable: "chooseToUse",
		viewAsFilter(player) {
			let cnt = player.storage.jlsg_liegong_used ?? 0;
			return player.countCards("h") && cnt < (player.isDamaged() ? 2 : 1);
		},
		viewAs: {
			name: "sha",
			nature: "fire",
			jlsg_liegong: true,
		},
		selectCard: [1, 4],
		complexCard: true,
		filterCard(card, player) {
			let suit = get.suit(card);
			for (var i = 0; i < ui.selected.cards.length; i++) {
				if (get.suit(ui.selected.cards[i], player) == suit) {
					return false;
				}
			}
			return true;
		},
		check(card) {
			let val = get.value(card);
			return 10 - val;
		},
		async precontent(event, trigger, player) {
			if (event.getParent().addCount !== false) {
				event.getParent().addCount = false;
			}
			player.addTempSkill("jlsg_liegong_used");
			player.storage.jlsg_liegong_used++;
			player.markSkill("jlsg_liegong_used");
		},
		mod: {
			targetInRange(card, player) {
				if (card.jlsg_liegong) {
					return true;
				}
			},
			cardUsable(card, player) {
				if (card.jlsg_liegong) {
					return Infinity;
				}
			},
		},
		group: ["jlsg_liegong_effect"],
		subSkill: {
			used: {
				init(player, skill) {
					player.setStorage(skill, 0);
				},
				onremove: true,
				charlotte: true,
				sub: true,
			},
			effect: {
				sub: true,
				sourceSkill: "jlsg_liegong",
				silent: true,
				charlotte: true,
				trigger: {
					player: ["useCard", "useCardToAfter"],
					source: "damageSource",
				},
				filter(event, player, name) {
					if (event.card?.name != "sha" || !event.card?.jlsg_liegong || !event.card?.cards) {
						return false;
					}
					const cnt = event.card.cards.length;
					if (name == "useCard") {
						return cnt >= 1;
					} else if (name == "useCardToAfter") {
						return cnt >= 2 && !event.card.jlsg_liegong_effect;
					}
					let skills = event.player.getSkills(null, false, false).filter(skill => {
						let info = get.info(skill);
						return info && !get.is.empty(info) && !info.charlotte;
					});
					return cnt >= 4 && skills.length;
				},
				async content(event, trigger, player) {
					if (event.triggername == "useCard") {
						trigger.directHit.addArray(game.players);
						if (trigger.card.cards.length >= 3) {
							trigger.baseDamage++;
						}
					} else if (event.triggername == "useCardToAfter") {
						trigger.card.jlsg_liegong_effect = true;
						await player.draw(3);
					} else {
						let skill = trigger.player
							.getSkills(null, false, false)
							.filter(skill => {
								let info = get.info(skill);
								return info && !get.is.empty(info) && !info.charlotte;
							})
							.randomGet();
						await trigger.player.removeSkills(skill);
					}
				},
			},
		},
		ai: {
			fireDamage: true,
			directHit_ai: true,
		},
	},
	jlsg_xingwu: {
		marktext: "舞",
		intro: { content: "mark" },
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseBegin" },
		init(player) {
			player.storage.jlsg_xingwu_mark = {};
			for (let i of game.filterPlayer()) {
				player.storage.jlsg_xingwu_mark[i.playerid] = i.countMark("jlsg_xingwu") || 0;
			}
		},
		filter(event, player) {
			return player.hasCard(card => get.suit(card, player) == "heart", "h");
		},
		async cost(event, trigger, player) {
			let str;
			if (!trigger.player.hasMark("jlsg_xingwu")) {
				str = `星舞：是否弃置一张红桃，令${get.translation(trigger.player)}获得一枚“星舞”标记？`;
			} else {
				str = `星舞：是否弃置一张红桃，令${get.translation(trigger.player)}的一枚“星舞”标记移动给另一名角色或其再获得一枚“星舞”标记？`;
			}
			event.result = await player
				.chooseCardTarget({
					source: trigger.player,
					filterCard: (card, player) => get.suit(card, player) == "heart",
					filterTarget: function (card, player, target) {
						if (target == get.event("source")) {
							return false;
						}
						return get.event("source").hasMark("jlsg_xingwu");
					},
					selectTarget() {
						if (!get.event("source").hasMark("jlsg_xingwu")) {
							return [0, 0];
						} else {
							return [0, 1];
						}
					},
					prompt: str,
					targetprompt: "获得标记",
					ai1(card) {
						const player = get.player(),
							source = get.event("source");
						if (get.attitude(player, source) > 1) {
							return get.value(card) < 9;
						} else {
							return (get.value(card) < source.countMark("jlsg_xingwu") + 1) ^ 2;
						}
					},
					ai2(target) {
						const player = get.player(),
							source = get.event("source");
						if (get.attitude(player, source) > 1) {
							return 0;
						} else {
							return get.attitude(player, target) > 1;
						}
					},
				})
				.forResult();
		},
		popup: false,
		async content(event, trigger, player) {
			event.skillstop = true;
			await player.logSkill("jlsg_xingwu", trigger.player);
			await player.discard(event.cards);
			if (event.targets) {
				trigger.player.line(event.targets[0]);
				trigger.player.removeMark("jlsg_xingwu", 1);
				lib.skill.jlsg_xingwu.removeSkill(trigger.player);
				player.storage.jlsg_xingwu_mark[trigger.player.playerid]--;
				event.targets[0].addMark("jlsg_xingwu", 1);
				await lib.skill.jlsg_xingwu.gainSkill(event.targets[0]);
				player.storage.jlsg_xingwu_mark[event.targets[0].playerid]++;
			} else {
				trigger.player.addMark("jlsg_xingwu", 1);
				await lib.skill.jlsg_xingwu.gainSkill(trigger.player);
				player.storage.jlsg_xingwu_mark[trigger.player.playerid]++;
			}
			const { result } = await player.chooseBool(`是否令${get.translation(trigger.player)}重新获得【星舞】的技能？`, () => Math.random() < 0.5);
			if (result?.bool) {
				let skills = trigger.player.storage.jlsg_xingwu_skill;
				if (!skills) {
					return;
				}
				await trigger.player.removeSkills(skills);
				trigger.player.storage.jlsg_xingwu_skill = [];
				await lib.skill.jlsg_xingwu.gainSkill(trigger.player, true, skills.length);
			}
		},
		get skills() {
			let skills = {};
			for (let c of lib.jlsg.characterList) {
				if (c.indexOf("zuoci") != -1 || c.indexOf("xushao") != -1 || c.startsWith("jlsgsoul_sp_") || c.startsWith("jlsgsy_")) {
					continue;
				}
				if (!get.character(c) || !get.character(c)[3]?.length) {
					continue;
				}
				let sex = get.character(c, 0);
				skills[sex] = skills[sex] || [];
				let skills2 = get.character(c).skills.filter(s => {
					return !["jlsg_xianshou", "jlsg_sanjue"].includes(s) && !lib.filter.skillDisabled(s) && !lib.skill[s]?.charlotte;
				});
				skills[sex].addArray(skills2);
			}
			delete this.skills;
			this.skills = skills;
			return skills;
		},
		gainSkill(target, norecover, cnt = 1) {
			if (target.isDamaged() && !norecover) {
				target.recover();
			}
			let targetSkills = target.getSkills(null, false, false);
			let skills = [];
			for (let sex in lib.skill.jlsg_xingwu.skills) {
				if (sex === target.sex) {
					continue;
				}
				skills.addArray(lib.skill.jlsg_xingwu.skills[sex].filter(s => !targetSkills.includes(s)));
			}
			skills.removeArray(game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), []));
			skills = skills.filter(skill => {
				const info = lib.skill[skill];
				if (info.ai?.combo) {
					return target.hasSkill(info.ai?.combo, null, false, false);
				}
				return true;
			});
			skills = skills.randomGets(cnt);
			if (!skills.length) {
				return;
			}
			target.storage.jlsg_xingwu_skill = target.storage.jlsg_xingwu_skill || [];
			target.storage.jlsg_xingwu_skill.addArray(skills);
			target.addSkills(skills);
		},
		removeSkill(target) {
			target.loseHp();
			let skills = [];
			let targetSkills = target.getSkills(null, false, false);
			for (let pack in lib.characterPack) {
				for (let c in lib.characterPack[pack]) {
					if (get.character(c, 0) != target.sex) {
						continue;
					}
					skills.addArray(get.character(c)[3].filter(s => targetSkills.includes(s)));
				}
			}
			let skill = skills.randomGet();
			if (skill) {
				target.removeSkills(skill);
			}
		},
		group: ["jlsg_xingwu_start", "jlsg_xingwu_effect"],
		subSkill: {
			start: {
				audio: "jlsg_xingwu",
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				getIndex(event, player) {
					const array = new Array(player.maxHp + 1).fill(player.maxHp + 1).map((v, i) => v - i);
					return array;
				},
				prompt(event, player, name, num) {
					let prompt = `是否发动<span class="yellowtext">星舞</span>？`;
					if (num <= player.maxHp) {
						prompt += `（可重复${num}次）`;
					}
					return prompt;
				},
				filter: function (event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				check: () => true,
				logTarget(event, player) {
					return game.filterPlayer().sortBySeat(player);
				},
				content() {
					game.filterPlayer()
						.sortBySeat(player)
						.forEach(p => {
							p.addMark("jlsg_xingwu", 1);
						});
				},
				sourceSkill: "jlsg_xingwu",
			},
			effect: {
				trigger: {
					player: ["useSkill", "logSkillBegin"],
				},
				filter(event, player) {
					let skill = event.sourceSkill || event.skill;
					if (skill != "jlsg_xingwu" || !event.targets?.length) {
						return false;
					}
					if (event.skillstop) {
						return false;
					}
					for (let i of event.targets) {
						let num = player.storage.jlsg_xingwu_mark[i.playerid];
						if (num != i.countMark("jlsg_xingwu")) {
							return true;
						}
					}
					return false;
				},
				charlotte: true,
				direct: true,
				async content(event, trigger, player) {
					for (let i = 0; i < trigger.targets.length; i++) {
						const target = trigger.targets[i],
							num = player.storage.jlsg_xingwu_mark[target.playerid];
						if (num == target.countMark("jlsg_xingwu")) {
							continue;
						} else if (target.countMark("jlsg_xingwu") > num) {
							while (player.storage.jlsg_xingwu_mark[target.playerid] < target.countMark("jlsg_xingwu")) {
								await lib.skill.jlsg_xingwu.gainSkill(target);
								player.storage.jlsg_xingwu_mark[target.playerid]++;
							}
						} else {
							while (player.storage.jlsg_xingwu_mark[target.playerid] > target.countMark("jlsg_xingwu")) {
								await lib.skill.jlsg_xingwu.removeSkill(target);
								player.storage.jlsg_xingwu_mark[target.playerid]--;
							}
						}
					}
				},
				sourceSkill: "jlsg_xingwu",
			},
		},
	},
	jlsg_chenyu: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: ["phaseJieshuBegin", "damageEnd"],
		},
		forced: true,
		logTarget(event, player) {
			return game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
		},
		async content(event, trigger, player) {
			const cards = [];
			for (let target of event.targets) {
				let gainableCards = target.getGainableCards(player, "h", card => get.suit(card) == "heart");
				if (gainableCards.length) {
					target.$give(gainableCards, player);
					cards.addArray(gainableCards);
				}
			}
			if (cards.length) {
				await game
					.loseAsync({
						gain_list: [[player, cards]],
						cards,
						visible: true,
					})
					.setContent("gaincardMultiple");
			} else {
				await game.delay();
			}
		},
	},
	jlsg_tiangong: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "phaseBegin", "phaseEnd"],
		},
		getIndex(event) {
			if (event.name == "phase" && game.phaseNumber == 0) {
				return 2;
			}
			return 1;
		},
		filter(event, player, triggerName) {
			return (triggerName != "phaseBefore" || game.phaseNumber == 0) && game.hasPlayer(p => p.getSkills(null, false, false).filter(s => s.startsWith("jlsg_tiangong_jiguan_")).length < 7);
		},
		check(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			const skillCnt = _status.jlsg_tiangong_jiguanCount || 0;
			_status.jlsg_tiangong_jiguanCount = skillCnt + 1;
			game.broadcast(function (cnt) {
				_status.jlsg_tiangong_jiguanCount = cnt;
			}, _status.jlsg_tiangong_jiguanCount);
			const skill = {
				audio: "jlsg_tiangong",
				forced: true,
				name: `jlsg_tiangong_jiguan_${skillCnt}`,
				filter: function (event, player) {
					if (this.extraFilter && !this.extraFilter(event, player)) {
						return false;
					}
					return this.targetFilter(player).length;
				},
				logTarget: function (event, player) {
					return this.targetFilter(player).sortBySeat();
				},
				async content(event, trigger, player) {
					for (let target of event.targets) {
						const next = game.createEvent("jlsg_tiangong_jiguan_event", false).set("player", player).set("target", target).setContent(lib.skill[event.name].effect);
						await next;
					}
				},
			};
			const triggersList = [
				"回合开始阶段，",
				"判定阶段开始时，",
				"摸牌阶段开始时，",
				"出牌阶段开始时，",
				"出牌阶段结束时，",
				"弃牌阶段开始时，",
				"弃牌阶段结束时，",
				"回合结束阶段，",
				"每回合限X次(X: 1-3)，当你的判定牌生效后，",
				"每回合限X次(X: 1-3)，当你获得牌后，",
				"每回合限X次(X: 1-3)，当你使用基本牌后，",
				"每回合限X次(X: 1-3)，当你使用锦囊牌后，",
				"每回合限X次(X: 1-3)，当你使用装备牌后，",
				"每回合限X次(X: 1-3)，当你使用红色牌后，",
				"每回合限X次(X: 1-3)，当你使用黑色牌后，",
				"每回合限X次(X: 1-3)，当你成为非延时锦囊牌的目标后，",
				"每回合限X次(X: 1-3)，当你失去装备区里的牌后，",
				"每回合限X次(X: 1-3)，当你成为【杀】的目标时，",
				"每回合限X次(X: 1-3)，当你成为【杀】的目标后，",
				"每回合限X次(X: 1-3)，当你使用或打出【杀】时，",
				"每回合限X次(X: 1-3)，当你使用或打出【闪】时，",
				"每回合限X次(X: 1-3)，当你造成伤害时，",
				"每回合限X次(X: 1-3)，当你造成伤害后，",
				"每回合限X次(X: 1-3)，当你受到伤害时，",
				"每回合限X次(X: 1-3)，当你受到伤害后，",
				"每回合限X次(X: 1-3)，当你回复体力或加体力上限后，",
				"每回合限X次(X: 1-3)，当你失去体力或减体力上限后，",
				"每回合限X次(X: 1-3)，当你进入濒死状态时，",
				"每回合限X次(X: 1-3)，当你脱离濒死状态后，",
				"每回合限X次(X: 1-3)，当你获得技能后，",
				"每回合限X次(X: 1-3)，当你失去技能后，",
				"每回合限X次(X: 1-3)，当你横置/重置/翻面后，",
			];
			let choices = triggersList.randomGets(3).map(s => s.replace(`每回合限X次(X: 1-3)`, `每回合限${Math.floor(event.getRand() * 3) + 1}次`));
			const { result: chooseTrigger } = await player.chooseControlList("请选择机关技能的发动时机", choices).set("ai", () => Math.floor(get.event().getRand() * _status.event.choiceList.length));
			if (chooseTrigger.control == "cancel2") {
				return;
			}
			let choice = choices[chooseTrigger.index];
			let skillInfo = "锁定技，" + choice;
			const match = choice.match(/每回合限(\d+)次，(.*)/);
			if (match) {
				skill.cnt = parseInt(match[1]);
				choice = match[2];
			}
			switch (choice) {
				case "回合开始阶段，":
					skill.trigger = { player: "phaseZhunbeiBegin" };
					break;
				case "判定阶段开始时，":
					skill.trigger = { player: "phaseJudgeBegin" };
					break;
				case "摸牌阶段开始时，":
					skill.trigger = { player: "phaseDrawBegin" };
					break;
				case "出牌阶段开始时，":
					skill.trigger = { player: "phaseUseBegin" };
					break;
				case "出牌阶段结束时，":
					skill.trigger = { player: "phaseUseEnd" };
					break;
				case "弃牌阶段开始时，":
					skill.trigger = { player: "phaseDiscardBegin" };
					break;
				case "弃牌阶段结束时，":
					skill.trigger = { player: "phaseDiscardEnd" };
					break;
				case "回合结束阶段，":
					skill.trigger = { player: "phaseJieshuBegin" };
					break;
				case "当你的判定牌生效后，":
					skill.trigger = { player: "judgeEnd" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你获得牌后，":
					skill.trigger = {
						player: "gainAfter",
						global: "loseAsyncAfter",
					};
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.getg && event.getg(player).length > 0;
					};
					break;
				case "当你使用基本牌后，":
					skill.trigger = { player: "useCardAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && get.type(event.card) == "basic";
					};
					break;
				case "当你使用锦囊牌后，":
					skill.trigger = { player: "useCardAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && get.type2(event.card) == "trick";
					};
					break;
				case "当你使用装备牌后，":
					skill.trigger = { player: "useCardAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && get.type(event.card) == "equip";
					};
					break;
				case "当你使用红色牌后，":
					skill.trigger = { player: "useCardAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && get.color(event.card) == "red";
					};
					break;
				case "当你使用黑色牌后，":
					skill.trigger = { player: "useCardAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && get.color(event.card) == "black";
					};
					break;
				case "当你成为非延时锦囊牌的目标后，":
					skill.trigger = { target: "useCardToTargeted" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && get.type(event.card) == "trick";
					};
					break;
				case "当你失去装备区里的牌后，":
					skill.trigger = {
						player: "loseAfter",
						global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
					};
					skill.extraFilter = function (event, player) {
						if (player.getHistory("useSkill", e => e.skill == this.name).length >= this.cnt) {
							return false;
						}
						const evt = event.getl(player);
						return evt && evt.player == player && evt.es && evt.es.length > 0;
					};
					break;
				case "当你成为【杀】的目标时，":
					skill.trigger = { target: "useCardToTarget" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.card.name == "sha";
					};
					break;
				case "当你成为【杀】的目标后，":
					skill.trigger = { target: "useCardToTargeted" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.card.name == "sha";
					};
					break;
				case "当你使用或打出【杀】时，":
					skill.trigger = { player: ["useCard", "respond"] };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.card.name == "sha";
					};
					break;
				case "当你使用或打出【闪】时，":
					skill.trigger = { player: ["useCard", "respond"] };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.card.name == "shan";
					};
					break;
				case "当你造成伤害时，":
					skill.trigger = { source: "damageBegin2" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你造成伤害后，":
					skill.trigger = { source: "damageSource" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你受到伤害时，":
					skill.trigger = { player: "damageBegin3" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你受到伤害后，":
					skill.trigger = { player: "damageEnd" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你回复体力或加体力上限后，":
					skill.trigger = { player: ["recoverEnd", "gainMaxHpEnd"] };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你失去体力或减体力上限后，":
					skill.trigger = { player: ["loseHpEnd", "loseMaxHpEnd"] };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你进入濒死状态时，":
					skill.trigger = { player: "dying" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你脱离濒死状态后，":
					skill.trigger = { player: "dyingAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				case "当你获得技能后，":
					skill.trigger = { player: "changeSkillsAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.addSkill.length;
					};
					break;
				case "当你失去技能后，":
					skill.trigger = { player: "changeSkillsAfter" };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt && event.removeSkill.length;
					};
					break;
				case "当你横置/重置/翻面后，":
					skill.trigger = { player: ["turnOverAfter", "linkAfter"] };
					skill.extraFilter = function (event, player) {
						return player.getHistory("useSkill", e => e.skill == this.name).length < this.cnt;
					};
					break;
				default:
					console.error("jlsg_tiangong description not found", choice);
					return;
			}
			choices = Object.keys(lib.skill.jlsg_tiangong.targetFilters);
			// safe guard
			if (!game.hasPlayer(p => p.hasSex("male"))) {
				choices.remove("所有男性角色");
			}
			if (!game.hasPlayer(p => p.hasSex("female"))) {
				choices.remove("所有女性角色");
			}
			for (let group of lib.group) {
				if (!game.hasPlayer(p => p.group == group)) {
					choices.remove(`所有${lib.translate[group]}势力角色`);
				}
			}
			const targetFilters = choices.randomGets(3);
			// increae chance
			if (!targetFilters.includes("你") && Math.random() < 0.3) {
				targetFilters[2] = "你";
				targetFilters.randomSort();
			} else if (!targetFilters.includes("所有其他角色") && Math.random() < 0.3) {
				targetFilters[2] = "所有其他角色";
				targetFilters.randomSort();
			}
			const { result: chooseTargetFilter } = await player.chooseControlList(`###请选择机关技能的作用目标###${skillInfo}...`, targetFilters, true).set("ai", () => Math.floor(get.event().getRand() * _status.event.choiceList.length));
			if (chooseTargetFilter.control == "cancel2") {
				return;
			}
			choice = targetFilters[chooseTargetFilter.index];
			skillInfo += choice;
			skill.targetFilter = lib.skill.jlsg_tiangong.targetFilters[choice];
			if (!skill.targetFilter) {
				console.error("jlsg_tiangong description not found", choice);
				return;
			}
			choices = Object.keys(lib.skill.jlsg_tiangong.effects);
			if (skillInfo.includes("所有")) {
				choices = choices.filter(c => !lib.skill.jlsg_tiangong.effects[c].multi);
			}
			const effects = choices.randomGets(3);
			const { result: chooseEffect } = await player.chooseControlList(`###请选择机关技能的作用效果###${skillInfo}...`, effects, true).set("ai", () => Math.floor(get.event().getRand() * _status.event.choiceList.length));
			if (chooseEffect.control == "cancel2") {
				return;
			}
			choice = effects[chooseEffect.index];
			skillInfo += choice + "。";
			const { content, positive, groupType = null } = lib.skill.jlsg_tiangong.effects[choice];
			if (!content) {
				console.error("jlsg_tiangong description not found", content);
				return;
			}
			skill.effect = content;
			skill.positive = positive;
			if (groupType) {
				skill.groupType = groupType;
			}
			const list = game.filterPlayer().reduce((arr, current) => {
				arr.addArray(
					current
						.getSkills(null, false, false)
						.filter(s => s.startsWith("jlsg_tiangong_jiguan_"))
						.map(s => lib.translate[s])
				);
				return arr.unique();
			}, []);
			const translate = lib.skill.jlsg_tiangong.skillName.filter(i => !list.includes(i)).randomGet();
			game.broadcastAll(
				function (skill, name, translate, info) {
					lib.skill[name] = skill;
					lib.translate[name] = translate;
					lib.translate[name + "_info"] = info;
				},
				skill,
				skill.name,
				translate,
				skillInfo
			);
			const { result: chooseTarget } = await player
				.chooseTarget(`###请选择获得机关${lib.translate[skill.name]}技能的角色###${skillInfo}`, (_, player, target) => target.getSkills(null, false, false).filter(s => s.startsWith("jlsg_tiangong_jiguan_")).length < 7, true)
				.set("ai", target => {
					const players = get.event("targetFilter")(target),
						player = get.player();
					return get.event("positive")(players, target, player);
				})
				.set("positive", positive)
				.set("targetFilter", skill.targetFilter);
			if (!chooseTarget?.bool || !chooseTarget?.targets?.length) {
				return;
			}
			player.line(chooseTarget.targets[0]);
			await chooseTarget.targets[0].addSkills(skill.name);
		},
		get skillName() {
			let Heaven = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
				Earth = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
				result = [];
			for (let i of Heaven) {
				for (let j of Earth) {
					result.add(i + j);
				}
			}
			delete this.skillName;
			this.skillName = result;
			return result;
		},
		get targetFilters() {
			let result = {
				你: player => [player],
				所有角色: player => game.filterPlayer(),
				所有其他角色: player => game.filterPlayer(p => p != player),
				所有男性角色: player => game.filterPlayer(p => p.hasSex("male")),
				所有女性角色: player => game.filterPlayer(p => p.hasSex("female")),
				随机一名角色: player => game.filterPlayer().randomGets(1),
				随机两名角色: player => game.filterPlayer().randomGets(2),
				随机三名角色: player => game.filterPlayer().randomGets(3),
				体力上限最多的角色: player => {
					let v = Math.max(...game.filterPlayer().map(p => p.maxHp));
					return game.filterPlayer(p => p.maxHp == v);
				},
				体力上限最少的角色: player => {
					let v = Math.min(...game.filterPlayer().map(p => p.maxHp));
					return game.filterPlayer(p => p.maxHp == v);
				},
				体力最多的角色: player => {
					let v = Math.max(...game.filterPlayer().map(p => p.hp));
					return game.filterPlayer(p => p.hp == v);
				},
				体力最少的角色: player => {
					let v = Math.min(...game.filterPlayer().map(p => p.hp));
					return game.filterPlayer(p => p.hp == v);
				},
				随机一名未受伤的角色: player => game.filterPlayer(p => p.isHealthy()).randomGets(1),
				随机两名未受伤的角色: player => game.filterPlayer(p => p.isHealthy()).randomGets(2),
				所有未受伤的角色: player => game.filterPlayer(p => p.isHealthy()),
				随机一名已受伤的角色: player => game.filterPlayer(p => p.isDamaged()).randomGets(1),
				随机两名已受伤的角色: player => game.filterPlayer(p => p.isDamaged()).randomGets(2),
				所有已受伤的角色: player => game.filterPlayer(p => p.isDamaged()),
				手牌最多的角色: player => {
					let v = Math.max(...game.filterPlayer().map(p => p.countCards("h")));
					return game.filterPlayer(p => p.countCards("h") == v);
				},
				手牌最少的角色: player => {
					let v = Math.min(...game.filterPlayer().map(p => p.countCards("h")));
					return game.filterPlayer(p => p.countCards("h") == v);
				},
			};
			for (let group of lib.group) {
				result[`所有${lib.translate[group]}势力角色`] = player => game.filterPlayer(p => p.group == group);
			}
			delete this.targetFilters;
			this.targetFilters = result;
			return result;
		},
		get effects() {
			let result = {
				翻面: {
					content: async function (event, trigger, player) {
						await event.target.turnOver();
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => {
							let turnOver = current.isTurnedOver(),
								att = get.attitude(viewer, current);
							if (att > 0) {
								if (turnOver) {
									sum += 2;
								} else {
									sum -= 1;
								}
							} else {
								if (turnOver) {
									sum -= 1;
								} else {
									sum += 2;
								}
							}
							return sum;
						}, 0);
						return sumEff;
					},
				},
				"进行【闪电】判定": {
					content: async function (event, trigger, player) {
						await event.target.executeDelayCardEffect("shandian");
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer, "thunder"), 0);
						return sumEff;
					},
				},
				"手牌上限+1": {
					content: async function (event, trigger, player) {
						await lib.skill.jlsg_tiangong_handcard.change(event.target);
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
				},
				"使用【杀】的次数上限+1": {
					content: async function (event, trigger, player) {
						await lib.skill.jlsg_tiangong_useSha.change(event.target);
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
				},
				随机失去一个技能: {
					content: async function (event, trigger, player) {
						let skill = event.target.getSkills(null, false, false).randomGet();
						if (skill) {
							await event.target.removeSkills(skill);
						}
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + -get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
				},
				"视为使用【南蛮入侵】": {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "nanman" }, true);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "nanman" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"视为使用【桃园结义】": {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "taoyuan" }, true);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "taoyuan" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"视为使用【五谷丰登】": {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "wugu" }, true);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "wugu" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"视为使用【无中生有】": {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "wuzhong" }, true);
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "wuzhong" }, player, viewer), 0);
						return sumEff;
					},
				},
				"视为使用【万箭齐发】": {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "wanjian" }, true);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "wanjian" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"视为使用【桃】": {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "tao" }, true);
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "tao" }, player, viewer), 0);
						return sumEff;
					},
				},
				"对所有其他角色使用【杀】": {
					content: async function (event, trigger, player) {
						await event.target.useCard(
							{ name: "sha" },
							game.filterPlayer(p => p != event.target)
						);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "sha" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"对所有其他角色使用火【杀】": {
					content: async function (event, trigger, player) {
						await event.target.useCard(
							{ name: "sha", nature: "fire" },
							game.filterPlayer(p => p != event.target)
						);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "sha", nature: "fire" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"对所有其他角色使用雷【杀】": {
					content: async function (event, trigger, player) {
						await event.target.useCard(
							{ name: "sha", nature: "thunder" },
							game.filterPlayer(p => p != event.target)
						);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "sha", nature: "thunder" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"对所有其他角色使用【决斗】": {
					content: async function (event, trigger, player) {
						await event.target.useCard(
							{ name: "juedou" },
							game.filterPlayer(p => p != event.target)
						);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "juedou" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				"对所有其他角色使用【顺手牵羊】": {
					content: async function (event, trigger, player) {
						await event.target.useCard(
							{ name: "shunshou" },
							game.filterPlayer(p => p != event.target)
						);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "shunshou" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				从牌堆或弃牌堆随机获得两张红色牌: {
					content: async function (event, trigger, player) {
						let cards = Array.from(ui.cardPile.childNodes)
							.concat(...ui.discardPile.childNodes)
							.filter(c => get.color(c) == "red")
							.randomGets(2);
						if (cards.length) {
							await event.target.gain("gain2", cards);
						}
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
						return sumEff;
					},
				},
				从牌堆或弃牌堆随机获得两张黑色牌: {
					content: async function (event, trigger, player) {
						let cards = Array.from(ui.cardPile.childNodes)
							.concat(...ui.discardPile.childNodes)
							.filter(c => get.color(c) == "black")
							.randomGets(2);
						if (cards.length) {
							await event.target.gain("gain2", cards);
						}
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
						return sumEff;
					},
				},
				从牌堆或弃牌堆随机获得两张基本牌: {
					content: async function (event, trigger, player) {
						let cards = Array.from(ui.cardPile.childNodes)
							.concat(...ui.discardPile.childNodes)
							.filter(c => get.type(c) == "basic")
							.randomGets(2);
						if (cards.length) {
							await event.target.gain("gain2", cards);
						}
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
						return sumEff;
					},
				},
				从牌堆或弃牌堆随机获得两张锦囊牌: {
					content: async function (event, trigger, player) {
						let cards = Array.from(ui.cardPile.childNodes)
							.concat(...ui.discardPile.childNodes)
							.filter(c => get.type2(c) == "trick")
							.randomGets(2);
						if (cards.length) {
							await event.target.gain("gain2", cards);
						}
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
						return sumEff;
					},
				},
				从牌堆或弃牌堆随机获得两张装备牌: {
					content: async function (event, trigger, player) {
						let cards = Array.from(ui.cardPile.childNodes)
							.concat(...ui.discardPile.childNodes)
							.filter(c => get.type(c) == "equip")
							.randomGets(2);
						if (cards.length) {
							await event.target.gain("gain2", cards);
						}
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
						return sumEff;
					},
				},
				受到1点伤害: {
					content: async function (event, trigger, player) {
						await event.target.damage("nosource");
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => get.damageEffect(current, player, viewer), 0);
						return sumEff;
					},
				},
				受到1点火焰伤害: {
					content: async function (event, trigger, player) {
						await event.target.damage("fire", "nosource");
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer, "fire"), 0);
						return sumEff;
					},
				},
				受到1点雷电伤害: {
					content: async function (event, trigger, player) {
						await event.target.damage("thunder", "nosource");
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer, "thunder"), 0);
						return sumEff;
					},
				},
				对其他角色各造成1点伤害: {
					content: async function (event, trigger, player) {
						for (let target of game.filterPlayer(p => p != event.target).sortBySeat()) {
							await target.damage(event.target);
						}
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				},
				加1点体力上限: {
					content: async function (event, trigger, player) {
						await event.target.gainMaxHp();
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
				},
				减1点体力上限: {
					content: async function (event, trigger, player) {
						await event.target.loseMaxHp();
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum - get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
				},
				回复1点体力: {
					content: async function (event, trigger, player) {
						if (event.target.isDamaged()) {
							await event.target.recover();
						}
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.recoverEffect(current, player, viewer), 0);
						return sumEff;
					},
				},
				回复2点体力: {
					content: async function (event, trigger, player) {
						if (event.target.isDamaged()) {
							await event.target.recover(2);
						}
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.recoverEffect(current, player, viewer) * 1.2, 0);
						return sumEff;
					},
				},
				失去1点体力: {
					content: async function (event, trigger, player) {
						await event.target.loseHp();
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "losehp" }, player, viewer), 0);
						return sumEff;
					},
				},
				失去2点体力: {
					content: async function (event, trigger, player) {
						await event.target.loseHp(2);
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "losehp" }, player, viewer) * 1.2, 0);
						return sumEff;
					},
				},
				失去1点体力然后摸五张牌: {
					content: async function (event, trigger, player) {
						await event.target.loseHp();
						if (event.target.isIn()) {
							await event.target.draw(5);
						}
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => {
							let losehp = get.effect(current, { name: "losehp" }, player, viewer) * 1.2,
								draw = get.effect(current, { name: "draw" }, player, viewer) * 1.4;
							return sum + losehp + draw;
						}, 0);
						return sumEff;
					},
				},
				"摸牌阶段摸牌数+1": {
					content: async function (event, trigger, player) {
						await lib.skill.jlsg_tiangong_draw.change(event.target);
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
				},
				摸两张牌: {
					content: async function (event, trigger, player) {
						await event.target.draw(2);
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer) * 1.1, 0);
						return sumEff;
					},
				},
				摸三张牌: {
					content: async function (event, trigger, player) {
						await event.target.draw(3);
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer) * 1.2, 0);
						return sumEff;
					},
				},
				摸四张牌: {
					content: async function (event, trigger, player) {
						await event.target.draw(4);
					},
					positive(targets, player, viewer) {
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer) * 1.3, 0);
						return sumEff;
					},
				},
				随机弃置两张牌: {
					content: async function (event, trigger, player) {
						let num = event.target.countDiscardableCards(event.target, "he");
						if (num > 0) {
							await event.target.randomDiscard(Math.min(num, 2));
						}
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + -get.attitude(viewer, current) * att * 1.1, 0);
						return sumEff;
					},
				},
				随机弃置三张牌: {
					content: async function (event, trigger, player) {
						let num = event.target.countDiscardableCards(event.target, "he");
						if (num > 0) {
							await event.target.randomDiscard(Math.min(num, 3));
						}
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + -get.attitude(viewer, current) * att * 1.2, 0);
						return sumEff;
					},
				},
				随机弃置四张牌: {
					content: async function (event, trigger, player) {
						let num = playevent.targeter.countDiscardableCards(event.target, "he");
						if (num > 0) {
							await event.target.randomDiscard(Math.min(num, 4));
						}
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + -get.attitude(viewer, current) * att * 1.3, 0);
						return sumEff;
					},
				},
				随机获得其他角色各一张牌: {
					content: async function (event, trigger, player) {
						const targets = game.filterPlayer(p => p != event.target).sortBySeat();
						for (let target of targets) {
							const cards = target.getGainableCards(event.target, "he");
							if (cards.length) {
								await event.target.gain(cards.randomGets(1), target, "giveAuto");
							}
						}
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(p => p != player && p.countGainableCards(player, "he")).sortBySeat();
						let sumEff = targets.reduce((sum, current) => sum + Math.sign(get.effect(current, { name: "shunshou_copy2" }, player, viewer)), 0);
						return sumEff;
					},
					multi: true,
				},
				随机将所有手牌分配给其他角色: {
					content: async function (event, trigger, player) {
						let players = game.filterPlayer(p => p != event.target);
						if (!players.length) {
							return;
						}
						let dis = new Map();
						let cards = event.target.getCards("h");
						for (let c of cards) {
							let target = players.randomGet();
							if (!dis.has(target)) {
								dis.set(target, []);
							}
							dis.get(target).push(c);
						}
						await game
							.loseAsync({
								gain_list: Array.from(dis.entries()),
								player: event.target,
								cards: cards,
								giver: event.target,
								animate: "giveAuto",
							})
							.setContent("gaincardMultiple");
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						let sumEff = targets.reduce((sum, current) => sum + -get.attitude(viewer, current) * att, 0);
						return sumEff;
					},
					multi: true,
				},
				与手牌数更少的随机角色交换手牌: {
					content: async function (event, trigger, player) {
						let target = game.filterPlayer(p => p.countCards("h") < event.target.countCards("h")).randomGet();
						if (target) {
							await event.target.swapHandcards(target);
						}
					},
					positive(targets, player, viewer) {
						let att = Math.sign(get.attitude(viewer, player));
						targets = game.filterPlayer(p => p.countCards("h") < player.countCards("h"));
						let sumEff = targets.reduce((sum, current) => sum + get.attitude(viewer, current) * att * 1.3, 0);
						return sumEff;
					},
				},
				弃置所有牌并摸等量的牌: {
					content: async function (event, trigger, player) {
						let cards = event.target.getDiscardableCards(event.target, "he");
						await event.target.discard(cards);
						await event.target.draw(cards.length);
					},
					positive(targets, player, viewer) {
						return Math.sign(get.attitude(viewer, player));
					},
				},
			};
			lib.skill.jlsgsy_bolue.initList();
			let groups = new Set(jlsg.characterList.map(c => get.character(c, 1)));
			for (let g of groups) {
				result[`随机获得一个${lib.translate[g]}势力技能`] = {
					content: async function (event, trigger, player) {
						let skills = event.target.getSkills(null, false, false);
						if (!_status.jlsgsy_bolue_list) {
							lib.skill.jlsgsy_bolue.initList();
						}
						let skillsList = _status.jlsgsy_bolue_list[lib.skill[event.getParent().name]?.groupType];
						skillsList.removeArray(game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), []));
						skillsList = skillsList.filter(skill => {
							const info = lib.skill[skill];
							if (lib.filter.skillDisabled(skill)) {
								return false;
							}
							if (info.ai?.combo) {
								return event.target.hasSkill(info.ai?.combo, null, false, false);
							}
							return true;
						});
						if (skillsList.length) {
							await event.target.addSkills(skillsList.randomGet());
						}
					},
					positive(targets, player, viewer) {
						return Math.sign(get.attitude(viewer, player));
					},
					groupType: g,
				};
			}
			let jlsg_qs = false;
			if (_status.connectMode) {
				if (lib.configOL.cardPack.includes("jlsg_qs")) {
					jlsg_qs = true;
				}
			} else if (lib.config.cards.includes("jlsg_qs")) {
				jlsg_qs = true;
			}
			if (jlsg_qs) {
				result["视为使用【望梅止渴】"] = {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "jlsgqs_wangmeizhike" }, true);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_wangmeizhike" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				};
				result["视为使用【草船借箭】"] = {
					content: async function (event, trigger, player) {
						await event.target.chooseUseTarget({ name: "jlsgqs_caochuanjiejian" }, true);
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer(current => current != player);
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_caochuanjiejian" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				};
				result["视为对自己使用【梅】"] = {
					content: async function (event, trigger, player) {
						await event.target.useCard({ name: "jlsgqs_mei" }, event.target);
					},
					positive(targets, player, viewer) {
						targets = [player];
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_mei" }, player, viewer), 0);
						return sumEff;
					},
				};
				result["视为对所有角色使用【梅】"] = {
					content: async function (event, trigger, player) {
						await event.target.useCard({ name: "jlsgqs_mei" }, game.filterPlayer().sortBySeat(event.target));
					},
					positive(targets, player, viewer) {
						targets = game.filterPlayer();
						let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_mei" }, player, viewer), 0);
						return sumEff;
					},
					multi: true,
				};
			}
			delete this.effects;
			this.effects = result;
			return result;
		},
		subSkill: {
			handcard: {
				charlotte: true,
				change(player) {
					player.addSkill("jlsg_tiangong_handcard");
					player.addMark("jlsg_tiangong_handcard");
					game.log(player, "的手牌上限", "#y+", "1");
				},
				mod: {
					maxHandcard(player, num) {
						var add = player.storage.jlsg_tiangong_handcard;
						if (typeof add == "number") {
							return num + add;
						}
					},
				},
				markimage: "image/card/handcard.png",
				intro: {
					content(num, player) {
						return `手牌上限+${num}`;
					},
				},
			},
			useSha: {
				charlotte: true,
				change(player) {
					player.addSkill("jlsg_tiangong_useSha");
					player.addMark("jlsg_tiangong_useSha");
					game.log(player, "使用【杀】次数上限", "#y+", "1");
				},
				mod: {
					cardUsable(card, player, num) {
						var add = player.storage.jlsg_tiangong_useSha;
						if (card.name == "sha") {
							return num + add;
						}
					},
				},
				marktext: "机",
				intro: {
					content(num, player) {
						return `使用【杀】次数上限+${num}`;
					},
				},
			},
			draw: {
				charlotte: true,
				change(player) {
					player.addSkill("jlsg_tiangong_draw");
					player.addMark("jlsg_tiangong_draw");
					game.log(player, "摸牌阶段摸牌数", "#y+", "1");
				},
				trigger: { player: "phaseDrawBegin2" },
				forced: true,
				filter(event, player) {
					return !event.numFixed && player.countMark("jlsg_tiangong_draw");
				},
				content() {
					trigger.num += player.countMark("jlsg_tiangong_draw");
				},
				marktext: "机",
				intro: {
					content(num, player) {
						return `摸牌阶段摸牌数+${num}`;
					},
				},
			},
		},
	},
	jlsg_linglong: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["damageBegin3", "loseHpBefore", "loseMaxHpBefore", "changeSkillsBefore"] },
		filter: function (event, player) {
			if (event.name == "damage") {
				if (!event.source || event.source == player) {
					return false;
				}
			} else if (event.name == "changeSkills") {
				if (event.getParent().name == "jlsg_linglong") {
					return false;
				}
				if (!event.removeSkill.length) {
					return false;
				}
			} else {
				if (event.getParent().player == player) {
					return false;
				}
			}
			return lib.skill.jlsg_linglong.validTargets(player, event.removeSkill).length;
		},
		async cost(event, trigger, player) {
			const targets = lib.skill.jlsg_linglong.validTargets(player, trigger.removeSkill),
				list = {};
			for (let target of targets) {
				if (!list[target.playerid]) {
					list[target.playerid] = {};
				}
				const skills = lib.skill.jlsg_linglong.validSkillsOthers(target);
				for (let skill of skills) {
					const { targetFilter, positive } = lib.skill[skill];
					const targets1 = targetFilter(target);
					let eff = positive(targets1, target, player);
					list[target.playerid][skill] = eff;
				}
			}
			let prompt = `###${get.prompt("jlsg_linglong")}###选择失去技能的角色`;
			if (trigger.name == "changeSkills") {
				prompt += `来抵消失去${trigger.removeSkill.map(s => `【${get.translation(s)}】`).join("")}`;
			} else {
				let eff = {
					damage: "受到伤害",
					loseHp: "失去体力",
					loseMaxHp: "扣减体力上限",
				}[trigger.name];
				prompt += `来抵消或转移<span style="font-weight: bold;">${eff}</span>效果`;
			}
			event.result = await player
				.chooseTarget(prompt, (_, player, target) => {
					return _status.event.targets.includes(target);
				})
				.set("ai", target => 20 - Math.min(Object.values(get.event("choice")[target.playerid])))
				.set("targets", targets)
				.set("choice", list)
				.forResult();
			event.result.cost_data = { list };
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: { list },
			} = event;
			let skills, removeSkill;
			if (target == player) {
				skills = lib.skill.jlsg_linglong.validSkillsSelf(target, trigger.removeSkill);
			} else {
				skills = lib.skill.jlsg_linglong.validSkillsOthers(target);
			}
			if (skills.length == 1) {
				removeSkill = skills;
			} else {
				const next = player
					.chooseButton([`玲珑:请选择${get.translation(target)}失去的技能`, [skills.map(s => [s, get.translation(s)]), "tdnodes"]])
					.set("forced", true)
					.set("ai", button => {
						return 20 - get.event("choice")[button.link];
					})
					.set("choice", list[target.playerid]);
				if (trigger.name == "changeSkills" && trigger.removeSkill.length > 1) {
					next.set("selectButton", [1, trigger.removeSkill.length]);
				}
				const { result: chooseRemove } = await next;
				if (!chooseRemove?.bool) {
					return;
				}
				removeSkill = chooseRemove.links;
			}
			await target.removeSkills(removeSkill);
			if (trigger.name != "changeSkills") {
				if (target == player) {
					trigger.cancel();
				} else {
					trigger.player = target;
				}
				return;
			}
			let retainSkill;
			if (removeSkill.length >= trigger.removeSkill.length) {
				retainSkill = trigger.removeSkill;
			} else {
				const next = player.chooseButton([`玲珑:请选择${get.translation(removeSkill.length)}个技能不被失去`, [trigger.removeSkill.map(s => [s, get.translation(s)]), "tdnodes"]]);
				next.set("forced", true);
				next.set("selectButton", removeSkill.length);
				const { result: chooseRetain } = await next;
				if (!chooseRetain.bool) {
					return;
				}
				retainSkill = chooseRetain.links;
			}
			trigger.removeSkill.removeArray(retainSkill);
			game.log(
				player,
				"失去",
				...retainSkill.map(i => {
					return "#g【" + get.translation(i) + "】";
				}),
				"技能的效果被抵消了"
			);
			if (!trigger.addSkill.length && !trigger.removeSkill.length) {
				await trigger.cancel();
			}
		},
		validSkillsSelf: function (player, ignoreSkills) {
			let skills = player
				.getSkills(null, false, false)
				.removeArray(player.getStockSkills())
				.filter(s => lib.translate[s] && lib.translate[s + "_info"] && lib.skill[s] && !lib.skill[s].charlotte);
			if (ignoreSkills) {
				skills.removeArray(ignoreSkills);
			}
			return skills;
		},
		validSkillsOthers: function (player) {
			return player.getSkills(null, false, false).filter(s => s.startsWith("jlsg_tiangong_jiguan_"));
		},
		validTargets: function (player, ignoreSkills) {
			let result = game.filterPlayer(p => p != player && lib.skill.jlsg_linglong.validSkillsOthers(p).length);
			let skills = lib.skill.jlsg_linglong.validSkillsSelf(player, ignoreSkills);
			if (skills.length) {
				result.push(player);
			}
			return result;
		},
	},
	jlsg_bamen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseUseBegin" },
		forced: true,
		async content(event, trigger, player) {
			await player.chooseToDiscard(true, "h", player.countCards("h"));
			let list = [];
			for (let i = 0; i < ui.cardPile.childElementCount; i++) {
				const card = ui.cardPile.childNodes[i];
				const name = get.name(card, false);
				if (list.some(c => get.name(c, false) === name)) {
					if (name == "sha") {
						if (list.some(c => c.name == "sha" && get.nature(card) === get.nature(c))) {
							continue;
						}
					} else {
						continue;
					}
				}
				list.add(card);
				if (list.length >= 8) {
					break;
				}
			}
			if (list.length) {
				await player.gain(list, "draw2");
			}
			if (list.length < 8) {
				const { result } = await player.chooseTarget(`八门：请选择一名其他角色受到${8 - list.length}点雷电伤害`, lib.filter.notMe).set("ai", target => get.damageEffect(target, _status.event.player, _status.event.player, "thunder"));
				if (result.bool && result.targets) {
					await result.targets[0].damage("thunder", 8 - list.length);
				}
			}
		},
	},
	jlsg_gucheng: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.storage.jlsg_gucheng = [];
		},
		onremove: true,
		mod: {
			aiOrder(player, card, num) {
				if (!["basic", "trick"].includes(get.type(card))) {
					return;
				}
				let used = player.storage.jlsg_gucheng;
				if (used.some(i => i.name == card.name)) {
					if (card.name == "sha") {
						if (used.some(i => i.name == "sha" && i.nature == get.nature(card))) {
							return;
						}
					} else {
						return;
					}
				}
				if (
					game.hasPlayer(cur => {
						if (cur == player) {
							return false;
						}
						player.storage.jlsg_gucheng_check = true;
						if (-get.effect(player, card, cur, player) > player.getUseValue(card)) {
							delete player.storage.jlsg_gucheng_check;
							return true;
						}
						delete player.storage.jlsg_gucheng_check;
						return false;
					})
				) {
					return 0;
				}
			},
		},
		mark: true,
		intro: {
			content(_, player, skill) {
				let used = player.storage.jlsg_gucheng;
				if (!used.length) {
					return "";
				}
				return "使用过：" + used.map(n => get.translation(n)).join(" ");
			},
		},
		trigger: {
			player: "useCard",
			global: "useCardToPlayered",
		},
		firstDo: true,
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (event.name == "useCardToPlayered") {
				if (event.getParent().excluded.includes(player)) {
					return false;
				}
				if (event.player == player) {
					return false;
				}
				if (!(event._targets || event.targets).includes(player)) {
					return false;
				}
			}
			if (!["basic", "trick"].includes(get.type(event.card))) {
				return false;
			}
			let card = { name: event.card.name, nature: get.nature(event.card) },
				used = player.storage.jlsg_gucheng;
			if (card.name != "sha") {
				return !used.some(i => i.name == card.name);
			}
			return !used.some(i => i.name == "sha" && i.nature == card.nature);
		},
		async content(event, trigger, player) {
			if (trigger.name == "useCardToPlayered") {
				await player.logSkill("jlsg_gucheng");
				trigger.getParent().excluded.add(player);
			} else {
				let card = { name: trigger.card.name, nature: get.nature(trigger.card) };
				player.storage.jlsg_gucheng.add(card);
				player.markSkill("jlsg_gucheng");
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (target.storage.jlsg_gucheng_check) {
						return;
					}
					if (player != target && ["basic", "trick"].includes(get.type(card))) {
						let used = target.storage.jlsg_gucheng;
						if ((card.name != "sha" && !used.some(i => i.name == card.name)) || (card.name == "sha" && !used.some(i => i.name == "sha" && i.nature == card.nature))) {
							return "zeroplayertarget";
						}
					}
				},
			},
		},
	},
	jlsg_yingshi: {
		mod: {
			targetInRange(card, player) {
				let cards = player.getCards("h", card => card.hasGaintag("jlsg_yingshi"));
				if (cards.includes(card) || (Array.isArray(card.cards) && card.cards.some(c => cards.includes(c)))) {
					return true;
				}
			},
			cardUsable(card, player) {
				let cards = player.getCards("h", card => card.hasGaintag("jlsg_yingshi"));
				if (cards.includes(card) || (Array.isArray(card.cards) && card.cards.some(c => cards.includes(c)))) {
					return Infinity;
				}
			},
			aiOrder(player, card, num) {
				let cards = player.getCards("h", card => card.hasGaintag("jlsg_yingshi"));
				if (_status.currentPhase != player) {
					if (cards.includes(card) || (Array.isArray(card.cards) && card.cards.some(c => cards.includes(c)))) {
						return num + 2;
					}
				} else {
					if (cards.includes(card) || (Array.isArray(card.cards) && card.cards.some(c => cards.includes(c)))) {
						return num - 2;
					}
				}
			},
			aiUseful(player, card, num) {
				let cards = player.getCards("h", card => card.hasGaintag("jlsg_yingshi"));
				if (cards.includes(card) || (Array.isArray(card.cards) && card.cards.some(c => cards.includes(c)))) {
					return 0;
				}
			},
		},
		init(player) {
			player.storage.jlsg_yingshi = player.storage.jlsg_yingshi || [];
		},
		mark: true,
		marktext: "鹰",
		intro: {
			mark(dialog, storage, player) {
				if (storage.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.add([storage, "vcard"]);
					} else {
						return "已有" + storage.length + "张牌";
					}
				}
			},
		},
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["gameDrawEnd", "phaseEnd"],
		},
		forced: true,
		filter(event, player) {
			if (event.name == "phase") {
				const cards = player.storage.jlsg_yingshi.filter(card => ["e", "h", "j", "c", "d", "o"].includes(get.position(card))),
					hs = player.getCards("h", card => get.type(card) == "basic" && card.hasGaintag("jlsg_yingshi"));
				return cards.concat(hs).some((card, index, arr) => arr.indexOf(card) == arr.lastIndexOf(card));
			}
			return true;
		},
		async content(event, trigger, player) {
			if (event.triggername == "gameDrawEnd") {
				const vcards = [];
				for (let name of lib.inpile) {
					if (get.type(name) == "basic") {
						vcards.push(["基本", "", name]);
					}
					if (name == "sha") {
						for (let nature of lib.inpile_nature) {
							vcards.push(["基本", "", "sha", nature]);
						}
					}
				}
				if (vcards.length) {
					const [bool, links] = await player
						.chooseButton([`鹰视：请选择要获得的一张基本牌`, [vcards, "vcard"]], true)
						.set("ai", button => {
							let name = button.link[2];
							if (name == "hufu") {
								return 1;
							} else if (name == "tao") {
								return 0.8;
							} else if (name == "jiu") {
								return 0.6;
							} else {
								return 0.1;
							}
						})
						.forResult("bool", "links");
					if (bool) {
						let card = get.cardPile(card => {
							if (links[0][2] != card.name) {
								return false;
							}
							return get.nature(card) == links[0][3];
						});
						if (card) {
							await player.gain(card, "draw2");
						}
					}
				}
				const cards = player.getCards("h", card => get.type(card) == "basic");
				if (cards.length) {
					player.addGaintag(cards, "jlsg_yingshi");
					player.markAuto("jlsg_yingshi", cards);
				}
			} else {
				const cards = ["cardPile", "discardPile"]
					.map(pos => Array.from(ui[pos].childNodes))
					.flat()
					.filter(c => player.hasStorage("jlsg_yingshi", c));
				if (cards.length) {
					await player.$gain2(cards);
				}
				for (let p of game.filterPlayer(p => p != player)) {
					let pCards = p.getCards("hej", c => player.hasStorage("jlsg_yingshi", c));
					if (pCards.length) {
						p.$give(pCards, player);
						cards.addArray(pCards);
					}
				}
				await game
					.loseAsync({
						gain_list: [[player, cards]],
						cards: cards,
						visible: true,
						gaintag: ["jlsg_yingshi"],
					})
					.setContent("gaincardMultiple");
				await game.delayx();
			}
		},
		group: ["jlsg_yingshi_gain", "jlsg_yingshi_draw"],
		subSkill: {
			gain: {
				sourceSkill: "jlsg_yingshi",
				trigger: {
					global: ["gainAfter", "loseAsyncAfter"],
				},
				getIndex(event, player) {
					return game
						.filterPlayer(current => {
							return event.getg && event.getg(current).length;
						})
						.sortBySeat(_status.currentPhase);
				},
				filter(event, player, name, target) {
					if (!target) {
						return false;
					}
					const gain = event.getg(target),
						storage = player.storage.jlsg_yingshi;
					let cards = gain.filter(c => storage.includes(c));
					if (target != player) {
						return cards.length;
					} else {
						let targets = game.filterPlayer2(current => {
							if (!event.getl || !event.getl(current)) {
								return false;
							}
							let lose = event.getl(current);
							let cards2 = gain.filter(c => lose.cards2.includes(c));
							if (!cards2.length) {
								return false;
							}
							if (cards2.some(c => get.type(c, null, false) != "basic")) {
								return false;
							}
							return true;
						});
						player.getHistory("useSkill", evt => {
							if (evt.skill != "jlsg_yingshi_gain") {
								return false;
							}
							if (!evt.targets?.length) {
								return false;
							}
							targets.removeArray(evt.targets);
						});
						return targets.length ? true : cards.length;
					}
				},
				async cost(event, trigger, player) {
					const target = event.indexedData;
					event.result = {
						bool: true,
						cost_data: target,
					};
					const gain = trigger.getg(target),
						storage = player.storage.jlsg_yingshi;
					let cards = [];
					if (target != player) {
						cards = gain.filter(c => storage.includes(c));
						if (cards.length) {
							event.result.cards = cards;
							event.result.skill_popup = false;
						}
					} else {
						let targets = game.filterPlayer2(current => {
							if (!trigger.getl(current)) {
								return false;
							}
							let lose = trigger.getl(current);
							let cards2 = gain.filter(c => lose.cards2.includes(c));
							if (!cards2.length) {
								return false;
							}
							if (cards2.some(c => get.type(c, null, false) != "basic")) {
								return false;
							}
							cards.addArray(cards2);
							return true;
						});
						player.getHistory("useSkill", evt => {
							if (evt.skill != "jlsg_yingshi_gain") {
								return false;
							}
							if (!evt.targets?.length) {
								return false;
							}
							targets.removeArray(evt.targets);
						});
						event.result.cards = cards;
						if (!targets.length) {
							event.result.cards = gain.filter(c => storage.includes(c));
							event.result.skill_popup = false;
						} else {
							event.result.targets = targets;
						}
					}
				},
				async content(event, trigger, player) {
					const cards = event.cards;
					if (event.cost_data.isIn()) {
						event.cost_data.addGaintag(cards, "jlsg_yingshi");
					}
					if (event.targets) {
						player.storage.jlsg_yingshi.addArray(cards);
					}
				},
			},
			draw: {
				sourceSkill: "jlsg_yingshi",
				trigger: { player: "useCardAfter" },
				forced: true,
				filter(event, player) {
					return player.hasHistory("lose", evt => {
						if (evt.getParent() != event) {
							return false;
						}
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("jlsg_yingshi")) {
								return true;
							}
						}
						return false;
					});
				},
				content() {
					player.draw();
				},
			},
		},
	},
	jlsg_langxi: {
		mark: true,
		marktext: "狼",
		intro: { content: "已记录:$" },
		init(player) {
			player.storage.jlsg_langxi ??= [];
		},
		priority: 2,
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "useCard"],
		},
		filter: function (event, player) {
			if (event.name == "useCard") {
				if (get.type(event.card) != "trick" || event.card.name == "wuxie") {
					return false;
				}
				return player.hasHistory("lose", evt => {
					if (evt.getParent() != event || !evt || !evt.hs) {
						return false;
					}
					return event.cards.every(card => evt.hs.includes(card)) && !player.storage.jlsg_langxi.includes(event.card.name);
				});
			} else {
				return event.name != "phase" || game.phaseNumber == 0;
			}
		},
		async cost(event, trigger, player) {
			if (event.triggername != "useCard") {
				const vcards = [];
				for (var name of lib.inpile) {
					if (name == "wuxie") {
						continue;
					}
					if (player.storage.jlsg_langxi.includes(name)) {
						continue;
					}
					if (get.type(name) == "trick") {
						vcards.push(["锦囊", "", name]);
					}
				}
				if (!vcards.length) {
					return;
				}
				const [bool, links] = await player
					.chooseButton([`狼袭：请选择要标记的一张普通锦囊牌`, [vcards, "vcard"]], true)
					.set("ai", button => {
						var name = button.link[2];
						if (get.tag(name, "damage")) {
							return 1;
						} else {
							var cards = get.selectableButtons();
							if (!cards.some(button => get.tag(button.link[2], "damage"))) {
								return Math.random();
							} else {
								return 0;
							}
						}
					})
					.forResult("bool", "links");
				event.result = { bool: bool, cost_data: links[0][2] };
			} else {
				event.result = await player
					.chooseBool(`###狼袭：是否将${get.translation(trigger.card.name)}标记为“狼”？###狼（${get.translation(player.storage.jlsg_langxi)}）`)
					.set("ai", (event, player) => {
						if (!lib.inpile.some(card => get.tag(card, "damage"))) {
							return 1;
						} else {
							return get.tag(trigger.card, "damage");
						}
					})
					.forResult();
			}
		},
		async content(event, trigger, player) {
			const name = event.cost_data || trigger.card.name;
			player.markAuto("jlsg_langxi", [name]);
		},
		group: "jlsg_langxi_use",
		subSkill: {
			use: {
				audio: "jlsg_langxi",
				trigger: { player: "useCardAfter" },
				filter(event, player) {
					if (get.type(event.card) != "trick") {
						return false;
					}
					if (!player.storage.jlsg_langxi) {
						return false;
					}
					if (!event.cards) {
						return false;
					}
					if (event.targets.every(target => !target.isIn())) {
						return false;
					}
					return player.hasHistory("lose", evt => {
						if (!evt || evt.getParent() != event || !evt.hs) {
							return false;
						}
						return event.cards.every(card => evt.hs.includes(card));
					});
				},
				async cost(event, trigger, player) {
					event.result = await player
						.chooseTarget(`###狼袭：请选择“狼袭”牌的目标###（${get.translation(player.storage.jlsg_langxi)}）`)
						.set("filterTarget", (card, player, target) => trigger.targets.filter(i => i.isIn()).includes(target))
						.set("selectTarget", () => [1, trigger.targets.filter(target => target.isIn()).length])
						.set("ai", target => {
							let eff = 0,
								player = get.player();
							for (let name of player.storage.jlsg_langxi) {
								eff += get.effect(target, { name: name }, player, player);
							}
							return eff;
						})
						.forResult();
				},
				async content(event, trigger, player) {
					const cards = player.storage.jlsg_langxi;
					event.targets.sortBySeat();
					for (let i = 0; i < cards.length; i++) {
						let targetx = event.targets.filter(i => i.isIn());
						await player.useCard({ name: cards[i], isCard: true }, targetx);
						await game.delayx();
					}
				},
			},
		},
	},
	jlsg_shenyin: {
		audio: "ext:极略/audio/skill:2",
		marktext: "隐",
		intro: {
			content(storage, player) {
				var str = `共有${player.countMark("jlsg_shenyin")}个标记`;
				if (player == game.me || player.isUnderControl()) {
					str += `<br>${lib.skill.jlsg_shenyin.getInfo(player)}`;
				}
				return str;
			},
		},
		onremove(player) {
			if (player.hasMark("jlsg_shenyin")) {
				player.useSkill("jlsg_shenyin_dying", false);
			} else {
				delete player.setStorage("jlsg_shenyin_record", undefined);
			}
		},
		priority: 1,
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "phaseBegin"],
			source: "die",
		},
		filter(event, player, name) {
			if (name == "die") {
				return event.player != player;
			}
			if (name == "phaseBegin") {
				return player.hasMark("jlsg_shenyin");
			} else {
				return name != "phaseBefore" || game.phaseNumber == 0;
			}
		},
		locked: true,
		async cost(event, trigger, player) {
			if (event.triggername != "phaseBegin") {
				event.result = { bool: true };
			} else {
				event.result = await player
					.chooseBool(() => true)
					.set("prompt2", lib.skill.jlsg_shenyin.getInfo(player))
					.set("prompt", "神隐：是否记录当前信息并获得一枚“神隐”标记？")
					.forResult();
			}
		},
		content() {
			if (event.triggername != "die") {
				lib.skill.jlsg_shenyin.record(player);
			}
			player.addMark("jlsg_shenyin", 1);
			player.markSkill("jlsg_shenyin");
		},
		record: function (player, norecord = false) {
			let hp = player.getHp(),
				maxhp = player.maxHp,
				skills = player.getSkills(null, false, false).filter(i => lib.translate[i] != undefined),
				ying = player.storage.jlsg_yingshi || [],
				lang = player.storage.jlsg_langxi || [];
			const list = {
				体力: Number(hp.toString().slice()),
				体力上限: Number(maxhp.toString().slice()),
				技能: skills.slice(),
				鹰标记牌: ying.slice(),
				狼标记牌: lang.slice(),
			};
			if (!norecord) {
				player.setStorage("jlsg_shenyin_record", list);
			}
			return list;
		},
		getInfo: function (player, num) {
			const translate = function (arr, player) {
				let list = {};
				for (let i = 0; i < lib.inpile.length; i++) {
					const card = lib.inpile[i];
					if (get.type(card, null, player) != "basic") {
						continue;
					}
					let name;
					name = get.translation(card);
					list[name] = 0;
					if (name == "杀") {
						for (let nature of lib.inpile_nature) {
							name = lib.translate["nature_" + nature] || lib.translate[nature] || "";
							name += "杀";
							list[name] = 0;
						}
					}
				}
				for (const str of arr) {
					let str2 = get.translation(str.name);
					if (str2 == "杀") {
						str2 = "";
						if (typeof str.nature == "string") {
							let natures = str.nature.split(lib.natureSeparator).sort(lib.sort.nature);
							for (let nature of natures) {
								str2 += lib.translate["nature_" + nature] || lib.translate[nature] || "";
							}
						}
						str2 += "杀";
					}
					if (list[str2] && typeof list[str2] == "number") {
						list[str2]++;
					} else {
						list[str2] = 1;
					}
				}
				const cardsInfo = Object.entries(list).filter(i => i[1] != 0);
				let resultStr = [];
				for (let i = 0; i < cardsInfo.length; i++) {
					let info = cardsInfo[i];
					resultStr.push(`${info[1]}张<span class="yellowtext">${info[0]}</span>`);
				}
				if (resultStr.length) {
					resultStr = resultStr.join(",");
				}
				return resultStr;
			};
			const list1 = Object.entries(player.storage.jlsg_shenyin_record),
				list2 = Object.entries(lib.skill.jlsg_shenyin.record(player, true));
			let str1 = `神隐记录:`,
				str2 = `<br>当前信息:`;
			for (let i = 0; i < list1.length; i++) {
				let key1 = list1[i][0],
					value1 = list1[i][1] || "无";
				let key2 = list2[i][0],
					value2 = list2[i][1] || "无";
				if (typeof value1 != "number" && value1 != "无") {
					if (key1 == "鹰标记牌") {
						value1 = translate(value1, player);
					} else {
						value1 = `<span class="yellowtext">${get.translation(value1)}</span>`;
					}
				} else {
					value1 = `<span class="yellowtext">${value1}</span>`;
				}
				if (typeof value2 != "number" && value2 != "无") {
					if (key2 == "鹰标记牌") {
						value2 = translate(value2, player);
					} else {
						value2 = `<span class="yellowtext">${get.translation(value2)}</span>`;
					}
				} else {
					value2 = `<span class="yellowtext">${value2}</span>`;
				}
				str1 += `${key1}为${value1}；`;
				str2 += `${key2}为${value2}；`;
			}
			if (num == 1) {
				return str1.slice(0, -1) + "。";
			} else if (num == 2) {
				return str2.slice(0, -1) + "。";
			} else {
				return str1 + str2.slice(0, -1) + "。";
			}
		},
		group: ["jlsg_shenyin_dying"],
		subSkill: {
			dying: {
				trigger: { player: "dying" },
				locked: true,
				direct: true,
				async content(event, trigger, player) {
					const num = player.countMark("jlsg_shenyin");
					if (num == 0) {
						return;
					}
					const bool = await player
						.chooseBool(() => true)
						.set("prompt", `神隐：是否弃置所有“神隐”标标记并恢复至记录状态，然后摸${get.translation(2 * num)}`)
						.set("prompt2", lib.skill.jlsg_shenyin.getInfo(player, 1))
						.forResultBool();
					if (!bool) {
						return;
					}
					await player.logSkill("jlsg_shenyin");
					await player.removeMark("jlsg_shenyin", num);
					await game.delayx();
					const info = player.storage.jlsg_shenyin_record;
					if (player.maxHp != info["体力上限"]) {
						const maxhp = info["体力上限"] - player.maxHp;
						if (maxhp > 0) {
							await player.gainMaxHp(maxhp);
						} else {
							await player.loseMaxHp(-maxhp);
						}
					}
					await player.recoverTo(info["体力"]);
					await player.addSkills(info["技能"].filter(i => !player.hasSkill(i)));
					await player.removeGaintag("jlsg_yingshi", player.getCards("h"));
					player.setStorage("jlsg_yingshi", info["鹰标记牌"]);
					await player.useSkill("jlsg_yingshi");
					player.addGaintag(info["鹰标记牌"], "jlsg_yingshi");
					player.setStorage("jlsg_langxi", info["狼标记牌"]);
					await player.draw(2 * num);
				},
			},
		},
	},
	jlsg_chuyuan: {
		audio: "ext:极略/audio/skill:2",
		marktext: "储",
		intro: {
			markcount: "expansion",
			mark(dialog, content, player) {
				var content = player.getExpansions("jlsg_chuyuan");
				if (content && content.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addAuto(lib.skill.jlsg_chuyuan.prompt2(null, player));
						dialog.addAuto(content);
					} else {
						return "共有" + get.cnNumber(content.length) + "张储";
					}
				}
			},
			content(content, player) {
				var content = player.getExpansions("jlsg_chuyuan");
				if (content && content.length) {
					if (player == game.me || player.isUnderControl()) {
						return `${lib.skill.jlsg_chuyuan.prompt2(null, player)}<br>${get.translation(content)}`;
					}
					return "共有" + get.cnNumber(content.length) + "张储";
				}
			},
		},
		trigger: { global: "useCardAfter" },
		filter(event) {
			return ["sha", "shan"].includes(get.name(event.card));
		},
		prompt(event, player) {
			const color = event.card.name == "sha" ? "黑" : "红";
			return `储元：是否摸两张牌，然后可以将一张${color}色牌至于武将牌上称为“储”？`;
		},
		prompt2(event, player) {
			const cards = player.getExpansions("jlsg_chuyuan"),
				black = cards.filter(i => get.color(i) == "black").length,
				red = cards.filter(i => get.color(i) == "red").length;
			let str1 = `<span style='color:#000000' data-nature='graymm'>${black}</span>`,
				str2 = `<span style='color:#FF0000' data-nature='watermm'>${red}</span>`;
			return `<div class='center text'>当前“储”：${cards.length}（${str1}|${str2}）</div>`;
		},
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) + 1;
		},
		async content(event, trigger, player) {
			await player.draw(2);
			const color = trigger.card.name == "sha" ? ["black", "黑"] : ["red", "红"];
			if (!player.countCards("he", c => get.color(c, player) == color[0])) {
				return;
			} else {
				let str = lib.skill.jlsg_chuyuan.prompt2(trigger, player);
				const {
					result: { bool, cards },
				} = await player
					.chooseCard("he", `###储元：请选择一张${color[1]}色牌置于武将牌上称为“储”###${str}`)
					.set("color", color)
					.set("filterCard", (card, player, event) => get.color(card, player) == get.event("color")[0])
					.set("ai", card => {
						const player = get.player();
						return 8 - get.value(card, player);
					});
				if (!bool) {
					return;
				}
				await player.addToExpansion(player, cards, "giveAuto").set("gaintag", ["jlsg_chuyuan"]);
				player.markSkill("jlsg_chuyuan");
				player.update();
				game.asyncDelayx();
			}
		},
		group: ["jlsg_chuyuan_effect"],
		subSkill: {
			effect: {
				mod: {
					maxHandcard(player, num) {
						const cards = player.getExpansions("jlsg_chuyuan"),
							black = cards.filter(i => get.color(i) == "black").length,
							red = cards.filter(i => get.color(i) == "red").length;
						let eff = Math.min(black, red);
						return num + eff;
					},
				},
				trigger: { player: "phaseDrawBegin1" },
				filter(event, player) {
					const cards = player.getExpansions("jlsg_chuyuan"),
						black = cards.filter(i => get.color(i) == "black").length,
						red = cards.filter(i => get.color(i) == "red").length;
					let num = Math.min(black, red);
					return !event.fixed && num > 0;
				},
				forced: true,
				popup: false,
				content() {
					const cards = player.getExpansions("jlsg_chuyuan"),
						black = cards.filter(i => get.color(i) == "black").length,
						red = cards.filter(i => get.color(i) == "red").length;
					let num = Math.min(black, red);
					trigger.num += num;
				},
			},
		},
	},
	jlsg_dengji: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			nocount: true,
			content: "limited",
		},
		derivation: ["jlsg_renzheng", "jlsg_jiquan"],
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			let num = player.countExpansions("jlsg_chuyuan");
			return num % 2 != 0 && num >= 5;
		},
		juexingji: true,
		limited: true,
		skillAnimation: true,
		forced: true,
		async content(event, trigger, player) {
			player.awakenSkill("jlsg_dengji");
			const cards = player.getExpansions("jlsg_chuyuan"),
				black = cards.filter(i => get.color(i) == "black").length,
				red = cards.filter(i => get.color(i) == "red").length;
			const num = Math.min(black, red);
			await player.gain(player, cards, "giveAuto", true);
			player.disableSkill("jlsg_dengji_awake", "jlsg_chuyuan");
			if (num == black) {
				await player.addSkills(["jlsg_renzheng"]);
			} else {
				await player.addSkills(["jlsg_jiquan"]);
			}
			const characters = lib.skill.jlsg_dengji.getCharacters();
			var skills = [];
			for (const name of characters) {
				if (!get.character(name)) {
					continue;
				}
				const skills2 = get.character(name)[3];
				if (!skills2 || !skills2.length) {
					continue;
				}
				for (let j = 0; j < skills2.length; j++) {
					if (player.hasSkill(skills2[j])) {
						continue;
					} else if (skills.includes(skills2[j])) {
						continue;
					}
					if (lib.filter.skillDisabled(skills2[j])) {
						continue;
					}
					const info = lib.skill[skills2[j]];
					if (!info || (!info.trigger && !info.enable && !info.mod) || info.silent || info.hiddenSkill || (info.zhuSkill && !player.isZhu2())) {
						continue;
					}
					if (info.ai && info.ai.combo && !player.hasSkill(info.ai.combo)) {
						continue;
					}
					skills.add(skills2[j]);
				}
			}
			if (skills.length) {
				if (skills.length >= num) {
					skills = skills.randomGets(num);
				}
				await player.addSkills(skills);
			}
		},
		getCharacters() {
			const name = ["曹操", "曹芳", "曹奂", "曹髦", "曹丕", "曹睿", "曹叡", "董卓", "公孙度", "公孙恭", "公孙康", "公孙渊", "公孙瓒", "郭汜", "韩遂", "李傕", "刘备", "刘辩", "刘表", "刘禅", "刘琮", "刘宏", "刘琦", "刘协", "刘焉", "刘繇", "刘璋", "吕布", "马超", "马腾", "孟获", "士燮", "司马炎", "司马昭", "孙策", "孙登", "孙皓", "孙坚", "孙亮", "孙权", "孙休", "陶谦", "王朗", "袁尚", "袁绍", "袁术", "袁谭", "袁熙", "张角", "张鲁"];
			if (!_status.characterlist) {
				let list = [];
				if (_status.connectMode) {
					list = get.charactersOL();
				} else {
					for (var i in lib.character) {
						if (!lib.filter.characterDisabled2(i) && !lib.filter.characterDisabled(i)) {
							list.push(i);
						}
					}
				}
				game.countPlayer2(function (current) {
					list.remove(current.name);
					list.remove(current.name1);
					list.remove(current.name2);
				});
				_status.characterlist = list;
			}
			let list = _status.characterlist.filter(i => {
				const str1 = get.translation(i);
				return name.some(i => str1.indexOf(i) > -1 && str1.lastIndexOf(i) > -1);
			});
			return list.randomSort();
		},
		ai: {
			combo: "jlsg_chuyuan",
		},
	},
	jlsg_jiquan: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		filterTarget: lib.filter.notMe,
		selectTarget: [1, Infinity],
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			event.targets.sortBySeat();
			for (let target of event.targets) {
				if (player.ai.shown > target.ai.shown && get.attitude(player, target) < -1) {
					player.addExpose(0.1);
				}
			}
			let history = player.getAllHistory("useSkill", e => e.skill == "jlsg_jiquan");
			for (let target of event.targets) {
				if (!player.isIn()) {
					return;
				}
				if (!target.isIn()) {
					continue;
				}
				let cnt = history.filter(e => e.event.targets.includes(target)).length;
				cnt = Math.min(cnt, 3);
				let index;
				let valid0 = cnt <= target.countGainableCards(player, "he");
				let valid1 = target.getSkills(null, false, false).length != 0;
				if (!valid0 && !valid1) {
					continue;
				}
				if (!valid0) {
					index = 1;
				} else if (!valid1) {
					index = 0;
				} else {
					({
						result: { index },
					} = await target.chooseControlList([`交给${get.translation(player)}${get.cnNumber(cnt)}张牌`, `交给${get.translation(player)}一个技能`], true, () => _status.event.choice).set("choice", cnt != 3 ? 0 : 1));
				}
				switch (index) {
					case 0:
						await target.chooseToGive(player, cnt, "he", true);
						break;
					case 1: {
						let skills = target.getSkills(null, false, false).map(s => [s, get.translation(s)]);
						let { result } = await target.chooseButton([`选择一个技能交给${get.translation(player)}`, [skills, "tdnodes"]], true);
						if (result.bool) {
							let skill = result.links[0];
							target.popup(skill, "gray");
							player.popup(skill);
							await Promise.all([target.removeSkills(skill), player.addSkills(skill)]);
						}
						break;
					}
				}
			}
			if (player.maxHp <= event.targets.map(p => p.maxHp || 0).reduce((a, b) => a + b, 0)) {
				player.gainMaxHp();
				player.recover();
			}
		},
		ai: {
			threaten: 3,
		},
	},
	jlsg_renzheng: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				let skills = player.getSkills(null, false, false);
				let choices = [skills.map(s => [s, get.translation(s)]), "tdnodes"];
				return ui.create.dialog(`###仁政###选择交出的技能, 不选则交手牌`, choices);
			},
			select: [0, Infinity],
			check: button => 0,
			backup: function (links) {
				let next = {
					audio: "jlsg_renzheng",
					discard: false,
					lose: false,
					delay: false,
					links: links,
					filterTarget: function (card, player, target) {
						return player != target;
					},
					ai1: lib.skill.rende.check,
					async content(event, trigger, player) {
						let target = event.target;
						let links = lib.skill.jlsg_renzheng_backup.links;
						if (links && links.length) {
							for (let link of links) {
								player.popup(link, "gray");
								target.popup(link);
							}
							await player.removeSkills(links);
							await target.addSkills(links);
							return;
						} else {
							await player.give(event.cards, target);
						}
						if (player.isIn() && target.isIn() && player.getAllHistory("useSkill", e => e.sourceSkill == "jlsg_renzheng" && e.event.childEvents[0] != event && e.event.targets[0] == target).length == 0) {
							let { result } = await player.chooseBool(`是否令你与${get.translation(target)}各增加1点体力上限并回复1点体力？`, get.attitude(player, target) > 0 || player.hp < target.hp);
							if (result.bool) {
								player.gainMaxHp();
								player.recover();
								target.gainMaxHp();
								target.recover();
							}
						}
					},
				};
				if (!links.length) {
					next.filterCard = true;
					next.selectCard = [1, Infinity];
					next.ai = {
						result: {
							target: function (player, target) {
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
								var nh = target.countCards("h");
								var np = player.countCards("h");
								if (player.hp == player.maxHp || player.storage.rerende < 0 || player.countCards("h") <= 1) {
									if (nh >= np - 1 && np <= player.hp && !target.hasSkill("haoshi")) {
										return 0;
									}
								}
								return Math.max(1, 5 - nh);
							},
						},
					};
				}
				return next;
			},
			prompt(links, player) {
				let prompt2 = "选择一名角色，令其获得你选择的牌";
				if (links.length) {
					prompt2 = `选择一名角色，令其获得` + links.map(s => `【${get.translation(s)}】`).join(" ");
				}
				return `###${get.prompt("jlsg_renzheng")}###${prompt2}`;
			},
		},
		ai: {
			order: 4,
			result: {
				player: 1,
			},
		},
	},
	jlsg_qifeng: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		forced: true,
		trigger: { player: "dying" },
		async content(event, trigger, player) {
			await player.loseMaxHp();
			if (!player.isIn()) {
				return;
			}
			player.storage.jlsg_qifeng ??= [1, 0, 0];
			const [recover, draw, damage] = player.storage.jlsg_qifeng;
			await player.recoverTo(recover);
			if (draw > 0) {
				await player.draw(draw);
			}
			if (damage > 0) {
				const { result } = await player.chooseTarget(`栖凤：请选择一名其他角色对其造成${damage}点火焰伤害`, true, lib.filter.notMe).set("ai", target => {
					return get.damageEffect(target, player, player, "fire");
				});
				if (result.bool) {
					await result.targets[0].damage(damage, "fire", player, "noCard");
				}
			}
		},
		ai: {
			threaten: 0.9,
			expose: 0.25,
		},
	},
	jlsg_lunce: {
		audio: "ext:极略/audio/skill:3",
		logAudio(event, player, triggername, _, costResult) {
			let type = costResult.cost_data.typeInfo,
				list = ["下策", "中策", "上策"];
			let index = list.indexOf(type) + 1;
			return [`ext:极略/audio/skill/jlsg_lunce${index}.mp3`];
		},
		trigger: { global: "roundStart" },
		filter(event, player) {
			let check = ["top", "mid", "bottom"];
			game.countPlayer(current => {
				let skills = current.getSkills(null, false, false);
				check.forEach((v, i) => {
					if (skills.includes(`jlsg_lunce_${player.playerid}_${v}`)) {
						check[i] = null;
					}
				});
			});
			check = check.filter(i => i);
			return check.length;
		},
		async cost(event, trigger, player) {
			const { result } = await player.chooseTarget(`###论策：请选择一名角色令其获得计策`).set("ai", target => {
				const player = _status.event.player;
				if (game.phaseNumber <= 1) {
					return target == player || target == _status.currentPhase;
				}
				let num = target.hp * target.countCards("hs") + 0.1;
				if (target.hasJudge("lebu") || target.hasJudge("bingliang")) {
					num = num * 0.3;
				}
				const att = 10 - Math.abs(get.attitude(player, target));
				if ((target.isMinHp() && target.hp < 3) || (target.isMaxHandcard() && target.countCards("hs", c => target.hasValueTarget(c)) > 3)) {
					num = num * 3;
				}
				return num / att;
			});
			if (!result.bool) {
				event.result = { bool: false };
				return;
			}
			const target = result.targets[0],
				choices = ["top", "mid", "bottom"],
				choicesInfo = ["上策", "中策", "下策"],
				storage = {
					targetFilters: lib.skill.jlsg_lunce.targetFilters,
					targetEffects: lib.skill.jlsg_lunce.targetEffects,
				},
				storage2 = { easy: {} };
			game.countPlayer(current => {
				if (!current.isIn()) {
					return false;
				}
				let skills = current.getSkills(null, false, false);
				choices.forEach((v, i) => {
					if (skills.includes(`jlsg_lunce_${player.playerid}_${v}`)) {
						choicesInfo[i] = null;
					}
				});
			});
			for (const name in storage) {
				//此处做选项固定
				let list = storage[name];
				for (let type of choices) {
					if (!choicesInfo[choices.indexOf(type)]) {
						continue;
					}
					const info = Object.keys(list[type]);
					let num = [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2 + 2), Math.floor(Math.random() * 2 + 4)];
					if (name === "targetEffects") {
						num = [0, 1, 2, 3].randomGets(3);
					}
					for (let t in info) {
						if (num.some(n => n == t)) {
							let v = info[t];
							if (!storage2[name]) {
								storage2[name] = {};
							}
							if (!storage2[name][type]) {
								storage2[name][type] = {};
							}
							storage2[name][type][v] = list[type][v];
							if (list[type][v].easy) {
								if (!storage2.easy[type]) {
									storage2.easy[type] = {};
								}
								storage2.easy[type][v] = list[type][v].easy(target);
							}
						}
					}
				}
			}
			let typeChoice,
				filterChoice,
				effectChoice,
				min,
				{ targetFilters, targetEffects, easy } = storage2;
			for (let i in easy) {
				let list = Object.entries(easy[i]).sort((a, b) => a[1] - b[1]);
				if (!min || min[1][1] >= list[0][1]) {
					min = [i, list[0]];
				}
			}
			typeChoice = choicesInfo[choices.indexOf(min[0])];
			filterChoice = min[1][0];
			let choiceList = Object.keys(targetEffects[min[0]]),
				arr = {};
			for (let i of choiceList) {
				arr[i] = targetEffects[min[0]][i].positive(target);
			}
			let arrList = Object.entries(arr).sort((a, b) => a[1] - b[1]);
			if (get.attitude(player, target) >= 1) {
				effectChoice = arrList[arrList.length - 1][0];
			} else {
				effectChoice = arrList[0][0];
			}
			let typeInfo, filterInfo, effectInfo, str;
			chooseLoop: while (true) {
				choiceList = choicesInfo.filter(i => i);
				let list = ["选项一", "选项二", "选项三"].slice(0, choiceList.length);
				const { result: typex } = await player
					.chooseControl(list, "cancel2")
					.set("choiceList", choiceList)
					.set("prompt", "论策：选择计策类型")
					.set("ai", () => _status.event.choice)
					.set(
						"choice",
						(function () {
							let num = choiceList.indexOf(typeChoice);
							return list[num] || "cancel2";
						})()
					);
				typeInfo = choiceList[list.indexOf(typex.control)];
				if (!typeInfo) {
					break;
				}
				while (true) {
					choiceList = Object.keys(targetFilters[choices[choicesInfo.indexOf(typeInfo)]]);
					list = ["选项一", "选项二", "选项三"].slice(0, choiceList.length);
					str = `${typeInfo}：当你`;
					const { result: filterx } = await player
						.chooseControl(list, "cancel2")
						.set("choiceList", choiceList)
						.set("prompt", `论策：选择计策条件<br><span style=font-size:16px>${str}。。。</span>`)
						.set("ai", () => _status.event.choice)
						.set(
							"choice",
							(function () {
								let num = choiceList.indexOf(filterChoice);
								return list[num] || "cancel2";
							})()
						);
					filterInfo = choiceList[list.indexOf(filterx.control)];
					if (!filterInfo) {
						break;
					}
					while (true) {
						choiceList = Object.keys(targetEffects[choices[choicesInfo.indexOf(typeInfo)]]);
						list = ["选项一", "选项二", "选项三"].slice(0, choiceList.length);
						str = `${typeInfo}：当你${filterInfo}`;
						if (filterInfo.endsWith("状态")) {
							str += "时，你";
						} else {
							str += "后，你";
						}
						const { result: effectx } = await player
							.chooseControl(list, "cancel2")
							.set("choiceList", choiceList)
							.set("prompt", `论策：选择计策效果<br><span style=font-size:16px>${str}。。。</span>`)
							.set("ai", () => _status.event.choice)
							.set(
								"choice",
								(function () {
									let num = choiceList.indexOf(effectChoice);
									return list[num] || "cancel2";
								})()
							);
						effectInfo = choiceList[list.indexOf(effectx.control)];
						if (!effectInfo) {
							break;
						} else {
							str += effectInfo;
							break chooseLoop;
						}
					}
				}
			}
			if (![typeInfo, filterInfo, effectInfo].filter(i => i).length) {
				event.result = { bool: false };
			} else {
				const name = `jlsg_lunce_${player.playerid}_${choices[choicesInfo.indexOf(typeInfo)]}`,
					filter = targetFilters[choices[choicesInfo.indexOf(typeInfo)]][filterInfo],
					effect = targetEffects[choices[choicesInfo.indexOf(typeInfo)]][effectInfo];
				let skill = {
					jlsg_lunce_type: typeInfo,
					name: name,
					source: player,
					priority: 1919810 + 3 - choicesInfo.indexOf(typeInfo),
					charlotte: true,
					forced: true,
					popup: false,
					onremove: true,
					mark: true,
					intro: {
						str: str.slice(3),
						name: `${typeInfo}<br>来源：${get.seatTranslation(player)}`,
						markcount: () => "",
						mark: function (dialog, storage, player) {
							dialog.addText(this.str);
							if (storage) {
								dialog.addSmall("计数：" + get.translation(storage));
							}
						},
					},
					trigger: filter.trigger,
					filter: filter.filter,
					filterx: filter.filterx,
					async content(event, trigger, player) {
						if (lib.skill[event.name].filterx) {
							let bool = lib.skill[event.name].filterx(event, trigger, player);
							player.markSkill(event.name);
							if (!bool) {
								return;
							}
						}
						player.removeSkill(event.name);
						const source = lib.skill[event.name].source;
						game.log(player, "完成了", source == player ? "自己" : source, "给予的", `#g计策(${lib.skill[event.name].jlsg_lunce_type})`);
						await lib.skill[event.name].contentx(event, trigger, player);
						await event.trigger("jlsg_lunce_achieve");
					},
					contentx: effect.content,
					gainSkill: effect.gainSkill,
					removeSkill: effect.removeSkill,
					ai: {
						effect: {
							name: name,
							targetEffect: effect.positive,
							tag: filter.tag,
							target: function (card, player, target) {
								if (!this.tag?.self) {
									return;
								}
								let [checkA1, checkB1] = this.tag.need;
								let eff = 1;
								if (this.tag.count) {
									let storage = target.storage[this.name] ?? 0;
									eff = (storage + 1) / this.tag.count;
								}
								if (checkA1 != "tag") {
									if (get[checkA1](card) == checkB1) {
										return [1, this.targetEffect(target) * eff];
									}
								} else if (get.tag(card, checkB1)) {
									return [1, this.targetEffect(target) * eff];
								}
							},
							player: function (card, player, target) {
								if (!this.tag?.target) {
									return;
								}
								let [checkA, checkB] = this.tag.need,
									checkA1,
									checkA2,
									checkB1,
									checkB2,
									double;
								if (checkA.includes("|")) {
									double = true;
									[checkA1, checkA2] = checkA.split("|");
									[checkB1, checkB2] = checkB.split("|");
								} else {
									checkA1 = checkA;
									checkB1 = checkB;
								}
								let eff = 1;
								if (this.tag.count) {
									let storage = player.storage[this.name] ?? (checkB1 == "all" ? [] : 0);
									if (typeof storage == "number") {
										eff = (storage + 1) / this.tag.count;
									} else {
										eff = (storage.length + 1) / this.tag.count;
										let info = get[checkA1](card);
										if (!storage.includes(info)) {
											return [1, this.targetEffect(player) * eff];
										}
										return 1;
									}
								}
								if (double) {
									if (get[checkA1](card) == checkB1 && get[checkA2](card) == checkB2) {
										return [1, this.targetEffect(player) * eff];
									}
								} else {
									if (checkA1 != "tag") {
										if (get[checkA1](card) == checkB1) {
											return [1, this.targetEffect(player) * eff];
										}
									} else if (get.tag(card, checkB1)) {
										return [1, this.targetEffect(player) * eff];
									}
								}
							},
						},
					},
				};
				game.broadcastAll(
					function (skillName, skill, typeName) {
						lib.skill[skillName] = skill;
						lib.translate[skillName] = typeName;
					},
					name,
					skill,
					typeInfo
				);
				event.result = {
					bool: true,
					targets: [target],
					cost_data: { typeInfo: typeInfo, name: name },
				};
			}
		},
		async content(event, trigger, player) {
			game.log(player, "给予了", event.targets[0], `#g计策(${event.cost_data.typeInfo})`);
			event.targets[0].addSkill(event.cost_data.name);
		},
		get targetFilters() {
			//条件
			const result = {
				top: {
					使用不同花色的牌各一张: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							return lib.suit.includes(get.suit(event.card, player));
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= [];
							let suit = get.suit(trigger.card, player);
							if (suit != "none") {
								player.markAuto(event.name, [suit]);
							}
							return player.storage[event.name].length >= 4;
						},
						easy: function (player) {
							let suit = lib.suit,
								list = [];
							for (let i of suit) {
								let card = get.autoViewAs({ name: "sha", suit: i }, "unsure");
								list.add(get.suit(card, player));
							}
							if (list.length >= 4) {
								return 8 / player.countCards("h") - (player.countCards("h") > 4 ? 2 : 0);
							}
							return 10 / player.countCards("h") - (player.countCards("h") > 4 ? 2 : 0);
						},
						tag: {
							target: true,
							count: 4,
							need: ["suit", "all"],
						},
					},
					使用不同类型的牌各一张: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							return get.type2(event.card, player);
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= [];
							let type = get.type2(trigger.card, player);
							if (type) {
								player.markAuto(event.name, [type]);
							}
							return player.storage[event.name].length >= 3;
						},
						easy: function (player) {
							let types = lib.inpile
								.slice()
								.map(i => get.type2(i, player))
								.unique();
							if (types.length == 3) {
								return 8 / player.countCards("hs") - (player.countCards("h") > 4 ? 2 : 0);
							}
							return 10 / player.countCards("h") + (player.countCards("h") > 4 ? 2 : 0);
						},
						tag: {
							target: true,
							count: 3,
							need: ["type2", "all"],
						},
					},
					获得技能: {
						trigger: { player: "changeSkillsAfter" },
						filter: function (event, player) {
							return event.addSkill?.length;
						},
						easy: function (player) {
							let skills = player.getSkills(null, false, false);
							for (let skill of skills) {
								let info = get.info(skill);
								if (info) {
									continue;
								}
								if (info.gainSkill) {
									return 2;
								}
								if (info.dutySkill || info.juexingji || info.xinadingji) {
									return 8;
								}
							}
							return 10;
						},
					},
					失去技能: {
						trigger: { player: "changeSkillsAfter" },
						filter: function (event, player) {
							return event.removeSkill?.length;
						},
						easy: function (player) {
							let skills = player.getSkills(null, false, false);
							for (let skill of skills) {
								let info = get.info(skill);
								if (info) {
									continue;
								}
								if (info.removeSkill) {
									return 2;
								}
								if (info.dutySkill || info.limited || info.juexingji || info.xinadingji) {
									return 8;
								}
							}
							return 10;
						},
					},
					令一名角色进入濒死状态: {
						trigger: { source: "dying" },
						filter: function (event, player) {
							return event.source == player;
						},
						easy: function (player) {
							let targets = game
								.filterPlayer(cur => cur != player)
								.sortBySeat(player)
								.filter(cur => cur.isMinHp());
							if (targets.length) {
								for (let target of targets) {
									for (let name of lib.inpile) {
										let card = get.autoViewAs({ name: name }, "unsure");
										if (get.tag(card, "damage") && player.canUse(card, target) && get.effect(target, card, player, player) > 0) {
											return target.hp * (target.countCards("h") + 0.5);
										}
									}
								}
							}
							return 5;
						},
						tag: {
							target: true,
							need: ["tag", "damage"],
						},
					},
					进入濒死状态: {
						trigger: { player: "dying" },
						filter: function (event, player) {
							return true;
						},
						easy: function (player) {
							return player.hp * (player.countCards("h") + 0.5);
						},
						tag: {
							self: true,
							need: ["tag", "damage"],
						},
					},
				},
				mid: {
					使用两张黑桃牌: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							let suit = get.suit(event.card, player);
							return suit == "spade";
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= 0;
							player.storage[event.name]++;
							return player.storage[event.name] >= 2;
						},
						easy: function (player) {
							let num = player.countCards("hs", c => player.hasValueTarget(c));
							if (get.suit({ name: "sha", suit: "spade" }, player) != "spade") {
								return 6 / num;
							}
							return 5 / num;
						},
						tag: {
							target: true,
							count: 2,
							need: ["suit", "spade"],
						},
					},
					使用两张红桃牌: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							let suit = get.suit(event.card, player);
							return suit == "heart";
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= 0;
							player.storage[event.name]++;
							return player.storage[event.name] >= 2;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							if (get.suit({ name: "sha", suit: "heart" }, player) != "heart") {
								return 6 / num;
							}
							return 5 / num;
						},
						tag: {
							target: true,
							count: 2,
							need: ["suit", "heart"],
						},
					},
					使用杀造成2点伤害: {
						trigger: { source: "damageSource" },
						filter: function (event, player) {
							return get.name(event.card, player) == "sha" && event.num > 0;
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= 0;
							player.storage[event.name] += trigger.num;
							return player.storage[event.name] >= 2;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							if (!player.hasValueTarget("sha")) {
								return 4.8 / num;
							}
							return 3.8 / num;
						},
						tag: {
							target: true,
							count: 2,
							need: ["name", "sha"],
						},
					},
					使用锦囊牌造成2点伤害: {
						trigger: { source: "damageSource" },
						filter: function (event, player) {
							return get.type2(event.card, player) == "trick" && event.num > 0;
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= 0;
							player.storage[event.name] += trigger.num;
							return player.storage[event.name] >= 2;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								if (get.type2(name, player) != "trick") {
									continue;
								}
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.tag(card, "damage") && player.hasValueTarget(card)) {
									return 3.8 / num;
								}
							}
							return 4.8 / num;
						},
						tag: {
							target: true,
							count: 2,
							need: ["type2|tag", "trick|damage"],
						},
					},
					造成2点属性伤害: {
						trigger: { source: "damageSource" },
						filter: function (event, player) {
							return game.hasNature(event);
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= 0;
							player.storage[event.name] += trigger.num;
							return player.storage[event.name] >= 2;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.tag(card, "natureDamage") && player.hasValueTarget(card)) {
									return 3.5 / num;
								}
							}
							return 4.5 / num;
						},
						tag: {
							target: true,
							count: 2,
							need: ["tag", "natureDamage"],
						},
					},
					回复2点体力: {
						trigger: { player: "recoverAfter" },
						filter: function (event, player) {
							return event.num > 0;
						},
						filterx: function (event, trigger, player) {
							player.storage[event.name] ??= 0;
							player.storage[event.name] += trigger.num;
							return player.storage[event.name] >= 2;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.tag(card, "recover") && player.isDamaged()) {
									return 3 / num;
								}
							}
							return 4 / num;
						},
						tag: {
							slef: true,
							count: 2,
							need: ["tag", "recover"],
						},
					},
				},
				bottom: {
					使用黑色牌: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							return get.color(event.card, player) == "black";
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.color(card, player) == "black" && player.hasValueTarget(card)) {
									return 2 / num;
								}
							}
							return 3 / num;
						},
						tag: {
							target: true,
							need: ["color", "black"],
						},
					},
					使用红色牌: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							return get.color(event.card, player) == "red";
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.color(card, player) == "red" && player.hasValueTarget(card)) {
									return 2 / num;
								}
							}
							return 3 / num;
						},
						tag: {
							target: true,
							need: ["color", "red"],
						},
					},
					使用杀: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							return get.name(event.card, player) == "sha";
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							let card = get.autoViewAs({ name: "sha" }, "unsure");
							if (player.hasValueTarget(card)) {
								return 2 / num;
							}
							return 3 / num;
						},
						tag: {
							target: true,
							need: ["name", "sha"],
						},
					},
					使用锦囊牌: {
						trigger: { player: "useCardAfter" },
						filter: function (event, player) {
							return get.type(event.card, null, player) == "trick";
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								if (get.type2(name, player) != "trick") {
									continue;
								}
								let card = get.autoViewAs({ name: name }, "unsure");
								if (player.hasValueTarget(card)) {
									return 2 / num;
								}
							}
							return 3 / num;
						},
						tag: {
							target: true,
							need: ["name", "sha"],
						},
					},
					造成伤害: {
						trigger: { source: "damageSource" },
						filter: function (event, player) {
							return event.num > 0;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.tag(card, "damage") && player.hasValueTarget(card)) {
									return 2.5 / num;
								}
							}
							return 3.5 / num;
						},
						tag: {
							target: true,
							need: ["tag", "damage"],
						},
					},
					回复体力: {
						trigger: { player: "recoverAfter" },
						filter: function (event, player) {
							return event.num > 0;
						},
						easy: function (player) {
							let num = player.countCards("h", c => player.hasValueTarget(c));
							for (let name of lib.inpile) {
								let card = get.autoViewAs({ name: name }, "unsure");
								if (get.tag(card, "recover") && player.isDamaged()) {
									return 2 / num;
								}
							}
							return 3 / num;
						},
						tag: {
							slef: true,
							need: ["tag", "recover"],
						},
					},
				},
			};
			delete this.targetFilters;
			this.targetFilters = result;
			return result;
		},
		get targetEffects() {
			//效果
			const result = {
				top: {
					获得一个同势力武将技能: {
						content: async function (event, trigger, player) {
							let group = player.group;
							if (!_status.characterlist) {
								game.initCharacterList();
							}
							let allList = _status.characterlist.slice(0).randomSort();
							for (let name of allList) {
								if (!lib.character[name]) {
									continue;
								}
								if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1 || name.startsWith("jlsgsoul_sp_") || name.startsWith("jlsgsy_")) {
									continue;
								}
								if (lib.character[name][1] != group) {
									continue;
								}
								if (!lib.character[name][3]) {
									continue;
								}
								let skills = get.character(name).skills.filter(s => {
									if (["jlsg_sanjue", "jlsg_xianshou"].includes(s)) {
										return false;
									}
									if (player.hasSkill(s)) {
										return false;
									}
									let info = get.info(s);
									if (!info || info.unique || info.charlotte) {
										return false;
									}
									if (info.ai?.combo) {
										return player.hasSkill(info.ai.combo);
									}
									if (info.zhuSkill) {
										return player.isZhu2();
									}
									return true;
								});
								if (!skills.length) {
									continue;
								} else {
									await player.addSkills(skills.randomGet());
									break;
								}
							}
						},
						positive: player => 2,
						gainSkill: true,
					},
					获得1点体力上限并回复1点体力: {
						content: async function (event, trigger, player) {
							await player.gainMaxHp(1);
							await player.recover(1);
						},
						positive: player => 2,
					},
					随机失去一个技能: {
						content: async function (event, trigger, player) {
							let skills = player.getSkills(null, false, false).filter(s => {
								let info = get.info(s);
								if (!info || info.unique || info.charlotte) {
									return false;
								}
								return true;
							});
							if (skills.length) {
								await player.removeSkills(skills.randomGet());
							} else {
								game.log(player, "没有技能了");
							}
						},
						positive: function (player) {
							let skills = player.getSkills(null, false, false).filter(s => {
								let info = get.info(s);
								if (!info || info.unique || info.charlotte) {
									return false;
								}
								return true;
							});
							return -Math.min(2, skills.length);
						},
						removeSkill: true,
					},
					弃置所有牌: {
						content: async function (event, trigger, player) {
							if (player.countCards("he")) {
								await player.chooseToDiscard("he", player.countCards("he"), true);
							}
						},
						positive: function (player) {
							return -3;
						},
					},
				},
				mid: {
					"摸牌数+1": {
						content: async function (event, trigger, player) {
							if (!player.hasSkill("jlsg_lunce_effect")) {
								player.addSkill("jlsg_lunce_effect");
							}
							player.storage.jlsg_lunce_effect.draw++;
						},
						positive: function (player) {
							return 1;
						},
					},
					"使用杀次数上限+1": {
						content: async function (event, trigger, player) {
							if (!player.hasSkill("jlsg_lunce_effect")) {
								player.addSkill("jlsg_lunce_effect");
							}
							player.storage.jlsg_lunce_effect.sha++;
						},
						positive: function (player) {
							return 1;
						},
					},
					翻面: {
						content: async function (event, trigger, player) {
							await player.turnOver();
						},
						positive: function (player) {
							return -2;
						},
					},
					减1点体力上限: {
						content: async function (event, trigger, player) {
							await player.loseMaxHp(1);
						},
						positive: function (player) {
							return -2;
						},
					},
				},
				bottom: {
					摸两张牌: {
						content: async function (event, trigger, player) {
							await player.draw(2);
						},
						positive: function (player) {
							return 2;
						},
					},
					回复1点体力: {
						content: async function (event, trigger, player) {
							await player.recover(1);
						},
						positive: function (player) {
							return 2;
						},
					},
					随机弃置两张牌: {
						content: async function (event, trigger, player) {
							if (player.countCards("he")) {
								await player.discard(player.getCards("he").randomGets(2));
							}
						},
						positive: function (player) {
							return -2;
						},
					},
					受到1点无来源火焰伤害: {
						content: async function (event, trigger, player) {
							await player.damage(1, "fire", "noCard", "noSource");
						},
						positive: function (player) {
							return -2;
						},
					},
				},
			};
			delete this.targetEffects;
			this.targetEffects = result;
			return result;
		},
		group: ["jlsg_lunce_achieved"],
		subSkill: {
			achieved: {
				sourceSkill: "jlsg_lunce",
				trigger: { global: "jlsg_lunce_achieve" },
				filter(event, player) {
					return event.name.includes(String(player.playerid));
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					await player.gainMaxHp(1);
					if (player.hasSkill("jlsg_qifeng")) {
						player.storage.jlsg_qifeng ??= [1, 0, 0];
						let info = trigger.name.split("_"),
							list = ["mid", "bottom", "top"];
						let type = info[info.length - 1];
						let index = list.indexOf(type);
						game.log(player, "修改了", "#g【栖凤】");
						player.storage.jlsg_qifeng[index]++;
					}
				},
			},
			effect: {
				sourceSkill: "jlsg_lunce",
				forced: true,
				popup: false,
				charlotte: true,
				init(player) {
					player.storage.jlsg_lunce_effect = {
						draw: 0,
						sha: 0,
					};
				},
				mod: {
					cardUsable(card, player, num) {
						if (get.name(card, player) != "sha") {
							return;
						}
						return num + player.storage.jlsg_lunce_effect.sha;
					},
				},
				mark: true,
				marktext: "策",
				intro: {
					name: "策(效果)",
					content(content, player) {
						const { draw, sha } = player.storage.jlsg_lunce_effect;
						return `摸牌阶段，你多模${draw}张牌<br>你使用杀的次数上限+${sha}`;
					},
				},
				trigger: { player: "phaseDrawBegin2" },
				filter(event, player) {
					if (player.storage?.jlsg_lunce_effect?.draw < 1) {
						return false;
					}
					return !event.numFixed;
				},
				async content(event, trigger, player) {
					trigger.num += player.storage?.jlsg_lunce_effect?.draw;
				},
			},
		},
		ai: {
			threaten: 1.1,
			expose: 0.25,
		},
	},
	jlsg_qianyuan: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.storage.jlsg_qianyuan = {
				damage: false,
				loseHp: false,
				loseMaxHp: false,
				discard: false,
				removeSkill: false,
				disableSkill: false,
				link: false,
				turnOver: false,
				record: {},
			};
		},
		mark: true,
		marktext: "渊",
		intro: {
			name: "潜渊",
			markcount(storage, player) {
				let num = Object.keys(storage).filter(i => {
					if (storage.record[i] === false) {
						return false;
					}
					return storage[i] === true;
				}).length;
				return num;
			},
			mark(dialog, storage, player) {
				const addNewRow = lib.element.dialog.addNewRow.bind(dialog);
				if (get.is.phoneLayout()) {
					dialog.classList.add("fullheight");
				}
				dialog.css({ width: "20%" });
				let list = Object.keys(storage),
					map = {
						damage: "受到伤害",
						loseHp: "失去体力",
						loseMaxHp: "减体力上限",
						discard: "弃置牌",
						removeSkill: "失去技能",
						disableSkill: "失效技能",
						link: "横置",
						turnOver: "翻面",
					},
					itemContainerCss = { height: "20px" };
				for (let i = 0; i < 8; i++) {
					let info = list[i];
					let list2 = [
						{ item: map[info], ratio: 0.8, itemContainerCss },
						{ item: typeof storage.record[info] == "number" ? storage.record[info].toString() : storage.record[info] === false ? "空" : "是", ratio: 0.5, itemContainerCss },
					];
					if (!storage[info]) {
						list2[1].item = "未触发";
					}
					addNewRow(...list2);
				}
			},
		},
		trigger: {
			player: ["damageBefore", "loseHpBefore", "loseMaxHpBefore", "loseBegin", "changeSkillsBefore", "linkBefore", "turnOverBefore", "disableSkill"],
		},
		filter(event, player) {
			let storage = player.storage.jlsg_qianyuan,
				key = lib.jlsg.debuffSkill.translate[event.name];
			let bool1 = lib.jlsg.debuffSkill.getInfo(event, player, key).bool,
				bool2 = true;
			if (storage[key] === true) {
				let used = player.getHistory("useSkill", evt => {
					if (evt.skill != "jlsg_qianyuan") {
						return false;
					}
					return evt.event.jlsg_qianyuan;
				});
				bool2 = used.length < game.countPlayer();
			}
			return storage && key in storage && bool1 && bool2;
		},
		prompt(event, player) {
			let str = "潜渊:是否将此次负面效果";
			let key = lib.jlsg.debuffSkill.translate[event.name];
			let translation = lib.jlsg.debuffSkill.getInfo(event, player, key).str;
			str += `<span class='yellowtext'>${translation}</span>`;
			if (player.storage.jlsg_qianyuan[key] === false) {
				str += "无效？";
			} else {
				str += "转换？";
			}
			return str;
		},
		prompt2(event, player) {
			let storage = player.storage.jlsg_qianyuan,
				key = lib.jlsg.debuffSkill.translate[event.name],
				num1 = 0,
				num2 = game.countPlayer();
			if (storage[key] === true) {
				num1 = player.getHistory("useSkill", evt => {
					if (evt.skill != "jlsg_qianyuan") {
						return false;
					}
					return evt.event.jlsg_qianyuan;
				}).length;
				return `<span class='center text'>已转化次数（${num1}/${num2}） </span>`;
			}
		},
		check(event, player) {
			//@.修改
			var key = lib.jlsg.debuffSkill.translate[event.name];
			if (player.storage.jlsg_qianyuan[key] === false) {
				return true;
			}
			var num1 = player.getHistory("useSkill", evt => {
				if (evt.skill != "jlsg_qianyuan") {
					return false;
				}
				return evt.event.jlsg_qianyuan;
			}).length;
			var num2 = game.countPlayer();
			var num3 = 0;
			if (key == "damage") {
				num3 = 3;
			} else if (key == "loseHp") {
				num3 = 3;
			} else if (key == "loseMaxHp") {
				num3 = 5;
			} else if (key == "discard") {
				let least = player.storage.jlsg_hualong_effect,
					card = lib.jlsg.debuffSkill.getInfo(event, player).num;
				if (least && least > player.countCards("h") - card) {
					num3 = 2;
				} else {
					num3 = card + 1;
				}
			} else if (key == "removeSkill") {
				num3 = 6;
			} else if (key == "disableSkill") {
				num3 = 2.5;
			} else if (key == "link") {
				num3 = 1;
			} else if (key == "turnOver") {
				if (player.isTurnedOver()) {
					num3 = 0;
				} else {
					num3 = 4;
				}
			}
			if (num2 - num1 > 2) {
				if (num3 >= 2) {
					return true;
				}
				return false;
			} else if (num2 - num1 > 0 && num2 - num1 <= 2) {
				if (num3 >= 3) {
					return true;
				}
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			let key = lib.jlsg.debuffSkill.translate[trigger.name];
			const { num, nature, str } = lib.jlsg.debuffSkill.getInfo(trigger, player, key);
			if (trigger.name == "changeSkills") {
				trigger.removeSkill = [];
			} else if (trigger.name == "lose") {
				trigger.cards = trigger.cards.filter(card => {
					if (get.owner(card) == player) {
						return false;
					}
					return !["h", "e"].includes(get.position(card));
				});
				if (!trigger.cards.length) {
					trigger.cancel();
				}
			} else if (key == "disableSkill") {
				trigger.cancel = true;
			} else {
				trigger.cancel();
			}
			if (player.storage.jlsg_qianyuan[key] === true) {
				event.getParent().jlsg_qianyuan = true;
				await lib.jlsg.debuffSkill.transfer(trigger, player, key, num, nature);
			} else {
				player.storage.jlsg_qianyuan[key] = true;
				game.log(player, "取消了", `#y${str}`);
				player.storage.jlsg_qianyuan.record[key] = num;
			}
			player.markSkill("jlsg_qianyuan");
		},
		ai: {
			//@.修改
			effect: {
				target(card, player, target) {
					if (card.name == "tiesuo" && target.storage.jlsg_qianyuan.link === false) {
						return [0, 1];
					}
					if ((card.name == "shunshou" || card.name == "guohe") && target.storage.jlsg_qianyuan.discard === false) {
						return [0, 1];
					}
					if (get.tag(card, "damage") && target.storage.jlsg_qianyuan.damage === false && target.hasFriend()) {
						return [0, 1];
					}
				},
			},
		},
	},
	jlsg_hualong: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			if (!player.storage.jlsg_qianyuan) {
				return false;
			}
			let num = Object.keys(player.storage.jlsg_qianyuan).filter(i => {
				if (player.storage.jlsg_qianyuan.record[i] === false) {
					return false;
				}
				return player.storage.jlsg_qianyuan[i] === true;
			}).length;
			return num > 0;
		},
		async cost(event, trigger, player) {
			let list = Object.keys(player.storage.jlsg_qianyuan).filter(i => {
				if (player.storage.jlsg_qianyuan.record[i] === false) {
					return false;
				}
				return player.storage.jlsg_qianyuan[i] === true;
			});
			let str = `###化龙:选择一名其他角色，令其受到以下负面效果，然后将你的各项属性和最小手牌数改为${list.length + (player.storage.jlsg_hualong_effect ?? 0)}###`;
			for (let i of list) {
				if (player.storage.jlsg_qianyuan.record[i] !== false) {
					str += `${lib.jlsg.debuffSkill.getInfo(null, player, i, list.length).str}<br>`;
				}
			}
			event.result = await player
				.chooseTarget(str, (card, player, target) => target != player)
				.set("ai", target => -get.attitude(player, target))
				.forResult();
			event.result.cost_data = list;
		},
		async content(event, trigger, player) {
			const target = event.targets[0],
				list = event.cost_data;
			for (let key of list) {
				//全额返还
				//let number = player.storage.jlsg_qianyuan.record[key];
				if (player.storage.jlsg_qianyuan.record[key] === false) {
					continue;
				}
				let number = list.length;
				player.storage.jlsg_qianyuan.record[key] = false;
				player.markSkill("jlsg_qianyuan");
				if (!target.isIn()) {
					continue;
				}
				if (key == "damage") {
					await target.damage(number);
				} else if (key == "loseHp") {
					await target.loseHp(number);
				} else if (key == "loseMaxHp") {
					await target.loseMaxHp(number);
				} else if (key == "discard") {
					await target.discard(target.getDiscardableCards(target, "he").randomGets(number));
				} else if (key == "removeSkill") {
					await target.removeSkills(target.getSkills(null, false, false).randomGets(number));
				} else if (key == "disableSkill") {
					await target.awakenSkill(
						target
							.getSkills(null, false, false)
							?.filter(sk => !lib.skill[sk]?.charlotte && !lib.skill[sk]?.persevereSkill)
							?.randomGets(number)
					);
				} else if (key == "link") {
					await target.link();
				} else if (key == "turnOver") {
					await target.turnOver();
				}
			}
			target.update();
			if (!player.storage.jlsg_hualong_effect) {
				player.storage.jlsg_hualong_effect = 0;
			}
			player.storage.jlsg_hualong_effect += list.length;
			player.maxHp = player.storage.jlsg_hualong_effect;
			player.hp = player.storage.jlsg_hualong_effect;
			player.update();
			await player.addSkill("jlsg_hualong_effect");
		},
		subSkill: {
			effect: {
				mark: true,
				marktext: "化",
				intro: {
					content(storage, player) {
						if (!storage) {
							return "";
						} else {
							return `使用牌次数上限最低为${storage}<br>
													当手牌数低于${storage}时，将手牌摸至${storage}<br>
													攻击范围最低为${storage}`;
						}
					},
				},
				mod: {
					cardUsable(card, player, num) {
						if (!player.storage.jlsg_hualong_effect) {
							return;
						}
						let usable = get.info(card).usable;
						if (typeof usable == "function") {
							usable = num(card, player);
						}
						usable = Math.max(num, usable);
						if (usable < player.storage.jlsg_hualong_effect) {
							return player.storage.jlsg_hualong_effect;
						}
					},
					attackRange: function (player, num) {
						if (!player.storage.jlsg_hualong_effect) {
							return;
						}
						if (num < player.storage.jlsg_hualong_effect) {
							return player.storage.jlsg_hualong_effect;
						}
					},
				},
				trigger: {
					player: ["loseAfter", "phaseDrawBegin1"],
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player, name) {
					if (!player.storage.jlsg_hualong_effect) {
						return false;
					}
					if (name == "phaseDrawBegin1") {
						return !event.numFixed;
					}
					let evt = event.getl(player);
					if (!evt || !evt.hs || evt.hs.length == 0 || player.countCards("h") >= player.storage.jlsg_hualong_effect) {
						return false;
					}
					evt = event.getParent("jlsg_hualong_effect");
					if (evt && evt.name == "jlsg_hualong_effect") {
						return false;
					}
					return player.countCards("h") < player.storage.jlsg_hualong_effect;
				},
				logv: false,
				popup: false,
				forced: true,
				charlotte: true,
				async content(event, trigger, player) {
					let num = player.storage.jlsg_hualong_effect - player.countCards("h");
					if (event.triggername == "phaseDrawBegin1") {
						trigger.num = player.storage.jlsg_hualong_effect;
					} else {
						await player.draw(num);
					}
				},
				sub: true,
				sourceSkill: "jlsg_hualong",
			},
		},
		ai: {
			combo: "jlsg_qianyuan",
		},
	},
	jlsg_zhuxing: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			for (let current of game.players) {
				var cards = current.getExpansions(skill);
				if (cards.length) {
					current.loseToDiscardpile(cards);
				}
			}
		},
		usable: 2,
		trigger: { global: "useCard" },
		filter(event) {
			const card = event.card;
			if (!["basic", "trick"].includes(get.type(card, null, false))) {
				return false;
			}
			if (lib.card[card.name]?.notarget || !lib.card[card.name]?.enable) {
				return false;
			}
			return get.is.ordinaryCard(card);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`###逐星：是否将${get.translation(trigger.card)}置于一名角色的武将牌上称为“逐星”牌###然后你可以令此牌无效`)
				.set("ai", target => {
					return target.playerid == _status.event.choice;
				})
				.set(
					"choice",
					(function () {
						const targets = game.filterPlayer().reduce((list, current) => {
							let effect = get.effect(current, trigger.card, player, player);
							if (current.countExpansions("jlsg_zhuxing") > 3) {
								effect = -114514;
							}
							if (!list[current.playerid]) {
								list[current.playerid] = effect;
							}
							return list;
						}, {});
						if (targets[player.playerid] <= 0) {
							targets[player.playerid] = -get.effect(player, trigger.card, player, player) - 1;
						}
						const num = Math.max(...Object.values(targets));
						return Object.keys(targets).find(i => targets[i] == num);
					})()
				)
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			await target.addToExpansion(trigger.cards, "gain2").set("gaintag", ["jlsg_zhuxing"]);
			const { result } = await player.chooseBool(`###逐星：是否令${get.translation(trigger.card)}无效？###${get.translation(trigger.targets)}`).set("ai", (event, player) => {
				const trigger = event.getTrigger();
				const card = trigger.card,
					targets = trigger.targets;
				let eff = targets.reduce((num, target) => num + get.effect(target, card, trigger.player, player), 0);
				return eff <= 0;
			});
			if (result.bool) {
				game.log(player, "取消了", trigger.card);
				trigger.targets = [];
				trigger.all_excluded = true;
			}
		},
		group: ["jlsg_zhuxing_begin"],
		subSkill: {
			begin: {
				audio: "ext:极略/audio/skill:2",
				trigger: { global: "phaseBegin" },
				filter(event, player) {
					if (!event.player.countExpansions("jlsg_zhuxing")) {
						return false;
					}
					return event.player.getExpansions("jlsg_zhuxing").some(card => {
						return !lib.card[card.name]?.notarget && lib.card[card.name]?.enable;
					});
				},
				prompt(event, player) {
					return `逐星：是否对${get.translation(event.player)}依次使用“逐星”牌？`;
				},
				prompt2(event, player) {
					const cards = event.player
						.getExpansions("jlsg_zhuxing")
						.reverse()
						.filter(card => {
							return !lib.card[card.name]?.notarget && lib.card[card.name]?.enable;
						});
					return `${get.translation(cards)}`;
				},
				check(event, player) {
					const cards = event.player
						.getExpansions("jlsg_zhuxing")
						.reverse()
						.filter(card => {
							return !lib.card[card.name]?.notarget && lib.card[card.name]?.enable;
						});
					let eff = cards.reduce((num, card) => num + get.effect(event.player, get.autoViewAs(card, []), player, player), 0);
					return eff > 0;
				},
				logTarget: "player",
				async content(event, trigger, player) {
					const cards = trigger.player.getExpansions("jlsg_zhuxing").reverse();
					for (let card of cards) {
						if (!trigger.player.isIn()) {
							break;
						}
						if (lib.card[card.name]?.notarget || !lib.card[card.name]?.enable) {
							continue;
						}
						const [suit, number, name, nature] = get.cardInfo(card);
						const cardx = get.autoViewAs({ name, number, suit, nature }, []);
						await player.useCard(cardx, trigger.player, false);
					}
				},
			},
		},
	},
	jlsg_lingze: {
		audio: "ext:极略/audio/skill:2",
		init() {
			//来自活动武将
			game.broadcastAll(() => {
				window.get = get;
				if (!get.bolskillTips) {
					lib.init.sheet([".bol-dibeijing {", "height: 100%;", "width: 100%;", "position: absolute;", "left: 0;", "top: 0;", "z-index: 8;", "}"].join(""));
					lib.init.sheet([".bol-skilltip {", "width: 20%;", "min-height: 5%;", "left: 50%;", " top: 50%;", "font-size: 16px;", "color: #ccad76;", "font-family: 'shousha';", "background-color: rgba(36, 29, 19, 0.85);", "border: #523a24 3px solid;", "border-radius: 10px;", "position: absolute;", "display: block;", "padding: 8px;", "transform: translate(-50%, -50%);", "transition: none;", "}"].join(""));
					get.bolskillTips = function (tipname, id) {
						var dibeijing = ui.create.div(".bol-dibeijing", document.body);
						dibeijing.style.zIndex = 16;
						var skilltip = ui.create.div(".bol-skilltip", dibeijing);
						skilltip.innerHTML = tipname;
						var herf = document.getElementById(id);
						if (herf) {
							var left = herf.getBoundingClientRect().left;
							if (/mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
								left += herf.offsetParent.offsetLeft;
							}
							left += document.body.offsetWidth * 0.15;
							skilltip.style.left = left + "px";
							skilltip.style.top = herf.getBoundingClientRect().top + 30 + "px";
						}
						dibeijing.listen(function (e) {
							e.stopPropagation();
							this.remove();
						});
					};
				}
			});
		},
		trigger: {
			global: ["phaseUseBegin", "damageBegin2"],
		},
		filter(event, player) {
			return event.player.countExpansions("jlsg_zhuxing");
		},
		async cost(event, trigger, player) {
			const { result } = await player.chooseButton([`灵泽：是否将其中一张“逐星”牌置于牌堆顶，令${get.translation(trigger.player)}进行许愿？`, trigger.player.getExpansions("jlsg_zhuxing")]).set("ai", button => {
				const card = button.link,
					player = _status.event.player,
					target = _status.event.getTrigger().player;
				if (get.attitude(player, target) < 0) {
					return 0;
				} else if (get.effect(target, card, player, player) <= 0) {
					return 114514;
				} else {
					return 50 - get.effect(target, card, player, player);
				}
			});
			if (result.bool) {
				event.result = { bool: true, cards: result.links, targets: [trigger.player] };
			} else {
				event.result = { bool: false };
			}
		},
		async content(event, trigger, player) {
			game.log(player, "将", event.cards, "置于了牌堆顶");
			trigger.player.$throw(event.cards, 1000);
			await game.cardsGotoPile(event.cards, "insert");
			if (!trigger.player.countExpansions("jlsg_zhuxing")) {
				trigger.player.unmarkSkill("jlsg_zhuxing");
			}
			game.addCardKnower([_status.pileTop], "everyone");
			const list = ["选项一", "选项二", "选项三", "cancel2"],
				typeList = ["征伐（额外获得一张随机类型的临时【杀】）", "宁息（额外获得一张临时【桃】）", "混沌（额外获得一张随机临时牌）"];
			const { result: typeChoose } = await trigger.player
				.chooseControl(list)
				.set("choiceList", typeList)
				.set("prompt", "灵泽：请选择一个命运")
				.set("ai", () => {
					const player = _status.event.player;
					if (player.isDamaged()) {
						return "选项二";
					}
					return "选项一";
				});
			if (typeChoose.control != "cancel2") {
				let name, type;
				switch (typeChoose.control) {
					case "选项一":
						name = "sha";
						type = "damage";
						break;
					case "选项二":
						name = "tao";
						type = "recover";
						break;
					case "选项三":
						name = null;
						type = "chaos";
						break;
				}
				const copy = lib.skill.jlsg_lingze.getEffects[type].randomGets(3),
					card = lib.skill.jlsg_lingze.createTempCard(name);
				if (card) {
					await trigger.player.gain(card, "draw");
				}
				const effectsList = [
					[null, {}],
					[null, {}],
					[null, {}],
				];
				for (let i = 0; i < copy.length; i++) {
					effectsList[i][0] = copy[i][0];
					effectsList[i][1].content = copy[i][1].content;
					effectsList[i][1].effect = copy[i][1].effect;
				}
				//手动添加“随机技能”选项
				if (!copy.some(i => i[0] == "随机两个技能") && Math.random() < 0.5) {
					const skills = lib.skill.jlsg_lingze.skills(trigger.player).filter(skill => {
						return lib.skill.jlsg_lingze.typeSkills["chaos"].some(i => i == lib.translate[skill]);
					});
					if (skills.length) {
						effectsList[2] = [
							"随机两个技能",
							{
								content: async function (event, trigger, player) {
									await player.addSkills(event.gainSkills);
								},
								effect() {
									return 4;
								},
							},
						];
					}
				}
				for (let i = 0; i < effectsList.length; i++) {
					const [str, { content }] = effectsList[i];
					const next = game.createEvent("jlsg_xuyuan_effect", false, event).set("player", trigger.player).set("jlsg_xuyuan_type", type);
					event.next.remove(next);
					next.setContent(content);
					if (str.includes("伤害")) {
						let nature = lib.card.sha.nature.concat([null]).randomGet();
						next.set("nature", nature);
						if (nature !== null) {
							let list = str.split("伤害");
							effectsList[i][0] = list[0] + get.translation(nature) + "伤害" + list[1];
						}
					} else if ((str.startsWith("获得") || str.startsWith("弃置")) && str.includes("|")) {
						let [str1, str3] = str.split("(");
						let [cardList, str2] = str3.split(")");
						let cardName = cardList.split("|").randomGet();
						next.set("cardName", cardName);
						effectsList[i][0] = str1 + get.translation(cardName) + str2;
					} else if (str == "随机两个技能") {
						let gains = lib.skill.jlsg_lingze
							.skills(trigger.player)
							.filter(skill => lib.skill.jlsg_lingze.typeSkills[type].some(i => i == lib.translate[skill]))
							.randomGets(2);
						next.set("gainSkills", gains);
						let list = gains.map(i => `【${get.skillTranslation(i, trigger.player)}】`);
						effectsList[i][0] = `获得${list}`;
					}
					effectsList[i][1].content = next;
				}

				const translate = function (str1, str2) {
					//来自活动武将
					const id = Math.random().toString(36).slice(-8);
					return "<a id='" + id + "' style='color:unset' href=\"javascript:get.bolskillTips('" + str2 + "','" + id + "');\">" + str1 + "※</a>";
				};

				const effectPrompt = effectsList.map((i, v) => {
					let str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项' + get.cnNumber(v + 1, true) + "：" + i[0] + "</div>";
					if (i[1].content?.gainSkills) {
						const gainSkills = i[1].content.gainSkills;
						str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项' + get.cnNumber(v + 1, true) + "：获得" + translate(get.translation(gainSkills[0]), lib.translate[gainSkills[0] + "_info"]) + "和" + translate(get.translation(gainSkills[1]), lib.translate[gainSkills[1] + "_info"]) + "</div>";
						/*for (let skill of gainSkills) {
									str += '<div class="popup pointerdiv" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【' +
										get.translation(skill) +
										"】</div><div>" +
										lib.translate[skill + "_info"] +
										"</div></div>";
								};*/
					}
					return str;
				});
				const { result: effectChoose } = await trigger.player
					.chooseControl(list)
					.set("dialog", ["灵泽：请选择一个效果", [effectPrompt, "textbutton"]])
					.set("ai", () => {
						if (_status.event.choice) {
							return _status.event.choice;
						}
						return ["选项一", "选项二", "选项三"].randomGet();
					})
					.set(
						"choice",
						(function () {
							let aiList = effectsList.map(i => {
								let arr = i[1].content.nature || i[1].content.cardName;
								return i[1].effect(player, arr);
							});
							let max = Math.max(...aiList);
							return list[aiList.indexOf(max)];
						})()
					);
				if (effectChoose.control != "cancel2") {
					game.log(trigger.player, "获得的效果为", `#r${effectsList[list.indexOf(effectChoose.control)][0]}`);
					const next = effectsList[list.indexOf(effectChoose.control)][1].content;
					event.next.add(next);
					await next;
				}
			}
		},
		get getEffects() {
			const result = {
				damage: [
					[
						"令一名角色交给你四张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget(`令一名角色交给你四张牌`, true)
									.set("filterTarget", (card, player, target) => target.countGainableCards(player, "he"))
									.set("num", 4)
									.set("ai", target => {
										const player = _status.event.player,
											num = _status.event.num;
										return get.effect(target, { name: "shunshou_copy2" }, player, player) * Math.min(num, target.countGainableCards(player, "he"));
									});
								if (result.bool) {
									await result.targets[0].chooseToGive(player, 4, true, "he");
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0)) {
									return 4;
								}
								return 0;
							},
						},
					],
					[
						"令一名角色弃置六张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget(`令一名角色弃置六张牌`, true)
									.set("filterTarget", (card, player, target) => target.countDiscardableCards(target, "he"))
									.set("num", 6)
									.set("ai", target => {
										const player = _status.event.player,
											num = _status.event.num;
										return get.effect(target, { name: "guohe_copy2" }, player, player) * Math.min(num, target.countGainableCards(player, "he"));
									});
								if (result.bool) {
									await result.targets[0].chooseToDiscard(6, true, "he");
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.effect(current, { name: "guohe_copy2" }, player, player) > 0)) {
									return 4;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各交给你两张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget([1, 2], `令至多两名角色各交给你两张牌`, true)
									.set("filterTarget", (card, player, target) => target.countGainableCards(player, "he"))
									.set("num", 2)
									.set("ai", target => {
										const player = _status.event.player,
											num = _status.event.num;
										return get.effect(target, { name: "shunshou_copy2" }, player, player) * Math.min(num, target.countGainableCards(player, "he"));
									});
								if (result.bool) {
									result.targets.sortBySeat(player);
									for (const target of result.targets) {
										await target.chooseToGive(player, 2, true, "he");
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0)) {
									return 4;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各弃置四张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget([1, 2], `令至多两名角色各弃置四张牌`, true)
									.set("filterTarget", (card, player, target) => target.countDiscardableCards(player, "he"))
									.set("num", 4)
									.set("ai", target => {
										const player = _status.event.player,
											num = _status.event.num;
										return get.effect(target, { name: "guohe_copy2" }, player, player) * Math.min(num, target.getDiscardableCards(player, "he"));
									});
								if (result.bool) {
									result.targets.sortBySeat(player);
									for (const target of result.targets) {
										const done = await target.chooseToDiscard(4, true, "he");
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.effect(current, { name: "guohe_copy2" }, player, player) > 0)) {
									return 4;
								}
								return 0;
							},
						},
					],
					[
						"令所有其他角色各交给你一张牌",
						{
							content: async function (event, trigger, player) {
								const targets = game.filterPlayer().remove(player).sortBySeat(player);
								for (const target of targets) {
									await target.chooseToGive(player, 1, true, "he");
								}
							},
							effect(player) {
								return game.countPlayer(current => current != player && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0);
							},
						},
					],
					[
						"令所有其他角色各弃置两张牌",
						{
							content: async function (event, trigger, player) {
								const targets = game.filterPlayer().remove(player).sortBySeat(player);
								for (const target of targets) {
									const done = await target.chooseToDiscard(2, true, "he");
								}
							},
							effect(player) {
								const targets = game.filterPlayer().sortBySeat(player);
								return targets.reduce((eff, target) => eff + get.effect(target, { name: "guohe_copy2" }, player, player), 0) / targets.length;
							},
						},
					],
					[
						"令一名角色减少2点体力上限",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一名角色减少2点体力上限`, true).set("ai", target => {
									const player = _status.event.player;
									return 5 - get.attitude(player, target);
								});
								if (result.bool) {
									await result.targets[0].loseMaxHp(2);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令一名角色失去2点体力",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一名角色失去2点体力`, true).set("ai", target => {
									const player = _status.event.player;
									return get.effect(target, { name: "losehp" }, player, player);
								});
								if (result.bool) {
									await result.targets[0].loseHp(2);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.effect(current, { name: "losehp" }, player, player) > 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"对一名角色造成2点伤害",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget(`对一名角色造成2点${event.nature ? get.translation(event.nature) : ""}伤害`, true)
									.set("nature", event.nature)
									.set("ai", target => {
										const player = _status.event.player,
											nature = _status.event.nature;
										return get.damageEffect(target, player, player, nature);
									});
								if (result.bool) {
									await result.targets[0].damage(2, event.nature, player);
								}
							},
							effect(player, nature) {
								if (game.hasPlayer(current => current != player && get.damageEffect(current, player, player, nature) > 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令一名角色随机失去两个技能",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一名角色失去两个技能`, true).set("ai", target => {
									const player = _status.event.player;
									if (!target.getSkills(null, false, false).length) {
										return 0;
									}
									return 10 - get.attitude(player, target);
								});
								if (result.bool) {
									const target = result.targets[0];
									let skills = target.getSkills(null, false, false).filter(i => {
										if (!lib.translate[i] || !lib.translate[i + "_info"]) {
											return false;
										}
										let info = get.info(i);
										return info && !info.charlotte;
									});
									if (skills.length) {
										await target.removeSkills(skills.randomGets(2));
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0 && current.getSkills(null, false, false).length)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各减少1点体力上限",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, 2], `令至多两名角色各减少1点体力上限`, true).set("ai", target => {
									const player = _status.event.player;
									return 5 - get.attitude(player, target);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.loseMaxHp();
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各失去1点体力",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, 2], `令至多两名角色各失去1点体力`, true).set("ai", target => {
									const player = _status.event.player;
									return get.effect(target, { name: "losehp" }, player, player);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.loseHp();
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.effect(current, { name: "losehp" }, player, player) > 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"对至多两名角色各造成1点伤害",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget([1, 2], `对至多两名角色各造成1点${event.nature ? get.translation(event.nature) : ""}伤害`, true)
									.set("nature", event.nature)
									.set("ai", target => {
										const player = _status.event.player,
											nature = _status.event.nature;
										return get.damageEffect(target, player, player, nature);
									});
								if (result.bool) {
									await result.targets[0].damage(1, event.nature, player);
								}
							},
							effect(player, nature) {
								if (game.hasPlayer(current => current != player && get.damageEffect(current, player, player, nature) > 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各随机失去一个技能",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, 2], `令至多两名角色各随机失去一个技能`, true).set("ai", target => {
									const player = _status.event.player;
									if (!target.getSkills(null, false, false).length) {
										return 0;
									}
									return 10 - get.attitude(player, target);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										let skills = target.getSkills(null, false, false).filter(i => {
											if (!lib.translate[i] || !lib.translate[i + "_info"]) {
												return false;
											}
											let info = get.info(i);
											return info && !info.charlotte;
										});
										if (skills.length) {
											await target.removeSkills(skills.randomGet());
										}
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0 && current.getSkills(null, false, false).length)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令一名角色翻面",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一名角色翻面`, true).set("ai", target => {
									const player = _status.event.player;
									const att = get.attitude(player, target);
									if (target.hasSkillTag("noturn")) {
										return 0;
									}
									if (target.isTurnedOver()) {
										return att;
									}
									return 5 - att;
								});
								if (result.bool) {
									await result.targets[0].turnOver();
								}
							},
							effect(player) {
								if (
									game.hasPlayer(current => {
										const att = get.attitude(player, current);
										if (current.hasSkillTag("noturn")) {
											return 0;
										}
										if (current.isTurnedOver()) {
											return att > 0;
										}
									})
								) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令任意名角色横置",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, game.countPlayer()], `令任意名角色横置`, true).set("ai", target => {
									const player = _status.event.player;
									return get.effect(target, { name: "tiesuo" }, player, player);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.link();
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.effect(current, { name: "shunshou_copy" }, player, player) > 0)) {
									return game.countPlayer();
								}
							},
						},
					],

					[
						"获得三张【(nanman|wanjian)】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 3; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								if (!lib.card[cardName]) {
									return 0;
								}
								const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得六张【过河拆桥】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("guohe");
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								if (!lib.card["guohe"]) {
									return 0;
								}
								const card = get.autoViewAs({ name: "guohe", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得四张【顺手牵羊】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("shunshou");
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								if (!lib.card["shunshou"]) {
									return 0;
								}
								const card = get.autoViewAs({ name: "shunshou", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得两张【火攻】、两张【铁索连环】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 2; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("huogong");
									if (card) {
										cards.add(card);
									}
								}
								for (let i = 0; i < 2; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("tiesuo");
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "huogong", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "tiesuo", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得一张【火攻】、四张花色不同的随机牌",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("huogong")];
								for (let suit of lib.suit) {
									let card = lib.skill.jlsg_lingze.createTempCard(null, suit);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card = get.autoViewAs({ name: "huogong", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得六张随机属性【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card = get.autoViewAs({ name: "huogong", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得一张【酒】、两张【铁索连环】、一张火【杀】、一张雷【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("jiu"), lib.skill.jlsg_lingze.createTempCard("tiesuo"), lib.skill.jlsg_lingze.createTempCard("tiesuo"), lib.skill.jlsg_lingze.createTempCard("sha", null, "fire"), lib.skill.jlsg_lingze.createTempCard("sha", null, "thunder")];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得两张【决斗】、两张【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("juedou"), lib.skill.jlsg_lingze.createTempCard("juedou"), lib.skill.jlsg_lingze.createTempCard("sha", null, null), lib.skill.jlsg_lingze.createTempCard("sha", null, null)];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "juedou", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得一张【乐不思蜀】、一张【兵粮寸断】、一张【(shandian|jlsgqs_shuiyanqijun)】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("lebu"), lib.skill.jlsg_lingze.createTempCard("bingliang"), lib.skill.jlsg_lingze.createTempCard(event.cardName)];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								if (!lib.card[cardName]) {
									return;
								}
								const card1 = get.autoViewAs({ name: "lebu", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "bingliang", isCard: true }, "unsure"),
									card3 = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
							},
						},
					],
					[
						"获得一张【南蛮入侵】、一张【万箭齐发】、一张【决斗】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("nanman"), lib.skill.jlsg_lingze.createTempCard("wanjian"), lib.skill.jlsg_lingze.createTempCard("juedou")];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "nanman", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "wanjian", isCard: true }, "unsure"),
									card3 = get.autoViewAs({ name: "juedou", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
							},
						},
					],
					[
						"获得两张【酒】、三张【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("jiu"), lib.skill.jlsg_lingze.createTempCard("jiu"), lib.skill.jlsg_lingze.createTempCard("sha", null, null), lib.skill.jlsg_lingze.createTempCard("sha", null, null), lib.skill.jlsg_lingze.createTempCard("sha", null, null)];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "jiu", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得一张【过河拆桥】、一张【顺手牵羊】、一张【决斗】、一张【酒】、一张【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("guohe"), lib.skill.jlsg_lingze.createTempCard("shunshou"), lib.skill.jlsg_lingze.createTempCard("juedou"), lib.skill.jlsg_lingze.createTempCard("jiu"), lib.skill.jlsg_lingze.createTempCard("sha")];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "nanman", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "wanjian", isCard: true }, "unsure"),
									card3 = get.autoViewAs({ name: "juedou", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
							},
						},
					],
					[
						"获得一张【诸葛连弩】、一张进攻马、三张随机属性【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("zhuge")];
								for (let i = 0; i < 3; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								let attack = lib.inpile
									.filter(name => {
										if (get.type(name, null, false) != "equip") {
											return false;
										}
										const card = lib.card[name];
										return card.distance?.globalFrom;
									})
									.randomGet();
								cards.add(lib.skill.jlsg_lingze.createTempCard(attack));
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "zhuge", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得一张【贯石斧】、一张【酒】、两张随机属性【杀】、两张随机牌",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("guanshi"), lib.skill.jlsg_lingze.createTempCard("jiu")];
								for (let i = 0; i < 2; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								for (let i = 0; i < 2; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(null);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "guanshi", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得一张【青龙偃月刀】、四张随机属性【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("qinglong")];
								for (let i = 0; i < 4; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "qinglong", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得一张【丈八蛇矛】、四张随机牌",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("zhangba")];
								for (let i = 0; i < 4; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(null);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card = get.autoViewAs({ name: "zhangba", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得一张【(cixiong|fangtian|qinggang|qilin|zhuque)】、一张【酒】、两张随机属性【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard(event.cardName), lib.skill.jlsg_lingze.createTempCard("jiu")];
								for (let i = 0; i < 2; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								const card1 = get.autoViewAs({ name: cardName, isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "jiu", isCard: true }, "unsure"),
									card3 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
							},
						},
					],
					[
						"获得一张【古锭刀】、一张【过河拆桥】、一张【酒】、一张随机属性【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("guding"), lib.skill.jlsg_lingze.createTempCard("guohe"), lib.skill.jlsg_lingze.createTempCard("jiu"), lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet())];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "guding", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "guohe", isCard: true }, "unsure"),
									card3 = get.autoViewAs({ name: "jiu", isCard: true }, "unsure"),
									card4 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3) + player.getUseValue(card4);
							},
						},
					],
					[
						"获得一张【寒冰剑】、一张【杀】、一张火【杀】、一张雷【杀】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("hanbing"), lib.skill.jlsg_lingze.createTempCard("sha", null, null), lib.skill.jlsg_lingze.createTempCard("sha", null, "fire"), lib.skill.jlsg_lingze.createTempCard("sha", null, "thunder")];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "hanbing", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
								return player.getUseValue(card1) + player.getUseValue(card2);
							},
						},
					],
				],
				recover: [
					[
						"令一名角色摸六张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一名角色摸六张牌`, true).set("ai", target => {
									const player = _status.event.player;
									return get.effect(target, { name: "draw" }, player, player);
								});
								if (result.bool) {
									await result.targets[0].draw(6);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.effect(current, { name: "draw" }, player, player) > 0)) {
									return 4;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各摸四张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, 2], `令至多两名角色各摸四张牌`, true).set("ai", target => {
									const player = _status.event.player;
									return get.effect(target, { name: "draw" }, player, player);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.draw(4);
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.effect(current, { name: "draw" }, player, player) > 0)) {
									return 3;
								}
								return 0;
							},
						},
					],
					[
						"令所有角色各摸两张牌",
						{
							content: async function (event, trigger, player) {
								const targets = game.filterPlayer().sortBySeat(player);
								for (const target of targets) {
									await target.draw(2);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.effect(current, { name: "draw" }, player, player) > 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令一名角色回复3点体力",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一两名角色回复3点体力`, true).set("ai", target => {
									const player = _status.event.player;
									return get.recoverEffect(target, player, player);
								});
								if (result.bool) {
									await result.targets[0].recover(3);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.recoverEffect(current, player, player) > 0)) {
									return 4;
								}
								return 0;
							},
						},
					],
					[
						"令一名角色增加2点体力上限",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget(`令一名角色增加2点体力上限`, true).set("ai", target => {
									const player = _status.event.player;
									return get.attitude(player, target);
								});
								if (result.bool) {
									await result.targets[0].gainMaxHp(2);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.attitude(player, current) > 0)) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各回复2点体力",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, 2], `令至多两名角色各回复2点体力`, true).set("ai", target => {
									const player = _status.event.player;
									return get.recoverEffect(target, player, player);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.recover(2);
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.recoverEffect(current, player, player) > 0)) {
									return 3;
								}
								return 0;
							},
						},
					],
					[
						"令至多两名角色各增加1点体力上限",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, 2], `令至多两名角色各增加1点体力上限`, true).set("ai", target => {
									const player = _status.event.player;
									return get.attitude(player, target);
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.gainMaxHp(1);
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.attitude(player, current) > 0)) {
									return 3;
								}
								return 0;
							},
						},
					],
					[
						"令所有角色各回复1点体力",
						{
							content: async function (event, trigger, player) {
								const targets = game.filterPlayer().sortBySeat(player);
								for (const target of targets) {
									await target.recover(1);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.recoverEffect(current, player, player) > 0)) {
									return 1;
								}
								return 0;
							},
						},
					],
					[
						"令所有角色各增加1点体力上限",
						{
							content: async function (event, trigger, player) {
								const targets = game.filterPlayer().sortBySeat(player);
								for (const target of targets) {
									await target.gainMaxHp(1);
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.attitude(player, current) > 0)) {
									return 1;
								}
								return 0;
							},
						},
					],
					[
						"使用【杀】次数上限+4",
						{
							content: async function (event, trigger, player) {
								if (!player.hasSkill("jlsg_lingze_effect")) {
									player.addSkill("jlsg_lingze_effect");
								}
								await game.delayx();
								player.storage.jlsg_lingze_effect.sha += 4;
							},
							effect(player) {
								if (player.getUseValue("sha") > 0) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"手牌上限+4",
						{
							content: async function (event, trigger, player) {
								if (!player.hasSkill("jlsg_lingze_effect")) {
									player.addSkill("jlsg_lingze_effect");
								}
								await game.delayx();
								player.storage.jlsg_lingze_effect.maxHandcard += 4;
							},
							effect() {
								return 2;
							},
						},
					],
					[
						"摸牌阶段额定摸牌数+2",
						{
							content: async function (event, trigger, player) {
								if (!player.hasSkill("jlsg_lingze_effect")) {
									player.addSkill("jlsg_lingze_effect");
								}
								await game.delayx();
								player.storage.jlsg_lingze_effect.draw += 2;
							},
							effect(player) {
								if (get.effect(player, { name: "draw" }, player, player) > 0) {
									return 2;
								}
								return 0;
							},
						},
					],
					[
						"获得两张【闪】、两张【桃】",
						{
							content: async function (event, trigger, player) {
								const cards = [lib.skill.jlsg_lingze.createTempCard("shan"), lib.skill.jlsg_lingze.createTempCard("shan"), lib.skill.jlsg_lingze.createTempCard("tao"), lib.skill.jlsg_lingze.createTempCard("tao")];
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card1 = get.autoViewAs({ name: "shan", isCard: true }, "unsure"),
									card2 = get.autoViewAs({ name: "tao", isCard: true }, "unsure");
								return get.value(card1, player) + player.getUseValue(card2);
							},
						},
					],
					[
						"获得四张【(tao|taoyuan|wugu|jlsgqs_qingmeizhujiu)】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 4; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得六张【(shan|wuxie)】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
								return get.value(card, player);
							},
						},
					],
					[
						"获得三张【(wuzhong|jlsgqs_wangmeizhike)】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 3; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								if (!lib.card[cardName]) {
									return;
								}
								const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得三张【白银狮子】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 3; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard("baiyin");
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								const card = get.autoViewAs({ name: "baiyin", isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
					[
						"获得一张防御马、一张【(bagua|renwang|tengjia|baiyin)】",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let attack = lib.inpile
									.filter(name => {
										if (get.type(name, null, false) != "equip") {
											return false;
										}
										const card = lib.card[name];
										return card.distance?.globalTo;
									})
									.randomGet();
								cards.add(lib.skill.jlsg_lingze.createTempCard(attack));
								cards.add(lib.skill.jlsg_lingze.createTempCard(event.cardName));
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player, cardName) {
								const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
								return player.getUseValue(card);
							},
						},
					],
				],
				chaos: [
					[
						"选择任意名角色，令这些角色各进行一次【闪电】判定",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([1, game.countPlayer()], `令任意名角色各进行一次【闪电】判定`, true).set("ai", target => {
									const player = _status.event.player,
										card = _status.pileTop;
									let damage = get.damageEffect(target, undefined, player, "thunder"),
										result = {
											card: card,
											name: card.name,
											number: get.number(card),
											suit: get.suit(card),
											color: get.color(card),
										};
									if (!ui.selected.targets.length) {
										if (lib.card.shandian.judge(card) < 0) {
											result.bool = false;
										} else if (lib.card.shandian.judge(card) > 0) {
											result.bool = true;
										} else {
											result.bool = null;
										}
										_status.event.cardname = "shandian";
										game.checkMod(target, result, "judge", target);
										delete _status.event.cardname;
										if (result.bool) {
											return damage;
										}
									}
									return damage;
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									for (const target of targets) {
										await target.executeDelayCardEffect("shandian");
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.damageEffect(current, player, player, "thunder") > 0)) {
									return 3;
								}
							},
						},
					],
					[
						"连续进行六次判定，结果为：红桃，增加1点体力上限并回复1点体力；黑桃，失去1点体力；梅花，随机弃置一点手牌；方片，摸四张牌",
						{
							content: async function (event, trigger, player) {
								for (let i = 0; i < 6; i++) {
									await player
										.judge(function (result) {
											if (get.color(result) == "black") {
												return 0;
											}
											return 1;
										})
										.set("judgestr", "许愿")
										.set("callback", async function (event, trigger, player) {
											const suit = event.judgeResult.suit;
											switch (suit) {
												case "heart":
													await player.gainMaxHp(1);
													await player.recover(1);
													break;
												case "spade":
													await player.loseHp(1);
													break;
												case "club":
													if (player.countDiscardableCards(player, "h")) {
														await player.randomDiscard(1, "h");
													}
													break;
												case "diamond":
													await player.draw(4);
													break;
											}
										})
										.set("judge2", function (result) {
											return result.bool ? true : false;
										});
								}
							},
							effect(player) {
								return 1;
							},
						},
					],
					[
						"连续进行六次判定，结果为：红桃，摸牌数+1；黑桃，失去1点体力；梅花，手牌上限+1；方片，使用【杀】次数上限+1",
						{
							content: async function (event, trigger, player) {
								for (let i = 0; i < 6; i++) {
									await player
										.judge(function (result) {
											if (get.suit(result) == "spade") {
												return 0;
											}
											return 1;
										})
										.set("judgestr", "许愿")
										.set("callback", async function (event, trigger, player) {
											const suit = event.judgeResult.suit;
											switch (suit) {
												case "heart":
													if (!player.hasSkill("jlsg_lingze_effect")) {
														player.addSkill("jlsg_lingze_effect");
													}
													player.storage.jlsg_lingze_effect.draw++;
													break;
												case "spade":
													await player.loseHp(1);
													break;
												case "club":
													if (!player.hasSkill("jlsg_lingze_effect")) {
														player.addSkill("jlsg_lingze_effect");
													}
													player.storage.jlsg_lingze_effect.maxHandcard++;
													break;
												case "diamond":
													if (!player.hasSkill("jlsg_lingze_effect")) {
														player.addSkill("jlsg_lingze_effect");
													}
													player.storage.jlsg_lingze_effect.sha++;
													break;
											}
										})
										.set("judge2", function (result) {
											return result.bool ? true : false;
										});
								}
							},
							effect(player) {
								return 1.5;
							},
						},
					],
					[
						"弃置所有手牌，获得两倍的基本牌、锦囊牌或装备",
						{
							content: async function (event, trigger, player) {
								const hs = player.getDiscardableCards(player, "h");
								if (hs.length) {
									await player.discard(hs);
									const type = ["basic", "trick", "equip"].randomGet(),
										cards = [];
									let cardList = lib.inpile.filter(name => {
										if (get.type2(name, player) != type) {
											return false;
										}
										return true;
									});
									for (let i = 0; i < hs.length * 2; i++) {
										let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
										if (card) {
											cards.add(card);
										}
									}
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								}
							},
							effect(player) {
								let num = player.countDiscardableCards(player, "h");
								if (num) {
									return num * 2;
								}
								return 0;
							},
						},
					],
					[
						"选择失去任意个技能，然后获得三倍数量的技能",
						{
							content: async function (event, trigger, player) {
								const skills = player.getSkills(null, false, false).filter(i => {
									if (!lib.translate[i] || !lib.translate[i + "_info"]) {
										return false;
									}
									let info = get.info(i);
									return info && !info.charlotte;
								});
								if (skills.length) {
									const buttons = skills.map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(i) + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
									const { result } = await player.chooseButton([1, skills.length], true, ["选择要失去的技能（一次性至多获得50个技能）", [buttons, "textbutton"]]).set("ai", button => {
										if (get.info(button.link).ai?.neg) {
											return 114514;
										}
										if (ui.selected.buttons?.length >= 16) {
											return 0;
										}
										return 5 - get.skillRank(button.link);
									});
									if (result.bool) {
										let gains = get.gainableSkills();
										gains.removeArray(player.getSkills(null, false, false));
										gains = gains.filter(skill => {
											const info = lib.skill[skill];
											if (info.ai?.combo) {
												return player.hasSkill(info.ai?.combo, null, false, false);
											}
											return true;
										});
										let num = Math.min(result.links.length * 3, 50);
										gains = gains.randomGets(num);
										player.changeSkills(gains, result.links).set("$handle", (player, addSkill, removeSkill) => {
											if (removeSkill.length) {
												player.removeSkill(removeSkill);
												game.log(
													player,
													"失去了技能",
													...removeSkill
														.filter(i => i in lib.translate)
														.map(i => {
															return "#g【" + get.translation(i) + "】";
														})
												);
											}
											if (addSkill.length) {
												player.addSkill(addSkill);
												game.log(
													player,
													"获得了技能",
													...addSkill
														.filter(i => i in lib.translate)
														.map(i => {
															return "#g【" + get.translation(i) + "】";
														})
												);
											}
										});
									}
								}
							},
							effect(player) {
								return 4;
							},
						},
					],
					[
						"选择任意名其他角色，从这些角色的每个区域里各随机获得一张牌",
						{
							content: async function (event, trigger, player) {
								const { result } = await player
									.chooseTarget([1, game.countPlayer()], `选择任意名其他角色，从这些角色的每个区域里各随机获得一张牌`, true)
									.set("filterTarget", (card, player, target) => target != player && target.countGainableCards(player, "hej"))
									.set("ai", target => {
										const player = _status.event.player;
										return get.effect(target, { name: "shunshou_copy" }, player, player);
									});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player);
									const list = [],
										position = "hej";
									for (const target of targets) {
										let cards = [];
										for (let i of position) {
											if (target.countGainableCards(player, i)) {
												cards.add(target.getGainableCards(player, i).randomGet());
											}
										}
										if (cards.length) {
											target.$give(cards, player);
											list.addArray(cards);
										}
									}
									await game
										.loseAsync({
											gain_list: [[player, list]],
											cards: list[1],
										})
										.setContent("gaincardMultiple");
									await game.delayx();
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.effect(current, { name: "shunshou_copy" }, player, player) > 0)) {
									return game.countPlayer();
								}
							},
						},
					],
					[
						"选择至少两名角色，令这些角色顺时针各对你此法选择的剩余角色使用一张【杀】",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget([2, game.countPlayer()], `选择至少名角色，令这些角色顺时针各对你未以此法选择的角色使用一张【杀】`, true).set("ai", target => {
									const player = _status.event.player,
										sha = get.autoViewAs({ name: "sha", isCard: true }, []);
									if (get.attitude(player, target > 0)) {
										return target.getUseValue(sha);
									} else {
										return get.attitude(player, target) < 0;
									}
								});
								if (result.bool) {
									const targets = result.targets.sortBySeat(player).reverse(),
										sha = get.autoViewAs({ name: "sha", isCard: true }, []);
									for (const target of targets) {
										let targetx = targets.filter(i => i != target && target.canUse(sha, i, false)).sortBySeat(target);
										if (targetx.length) {
											await target.useCard(sha, targetx);
										}
									}
								}
							},
							effect(player) {
								if (game.hasPlayer(current => get.effect(current, { name: "sha" }, player, player) > 0)) {
									return 2;
								}
							},
						},
					],
					[
						"获得六张随机基本牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList = lib.inpile.filter(name => get.type(name) == "basic");
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 4;
							},
						},
					],
					[
						"获得六张随机(red|black)牌",
						{
							content: async function (event, trigger, player) {
								const cards = [],
									suits = event.cardName == "red" ? ["heart", "diamond"] : ["spade", "club"];
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(null, suits.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 4;
							},
						},
					],
					[
						"获得六张随机(heart|spade|diamond|club)牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								for (let i = 0; i < 6; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(null, event.cardName);
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 4;
							},
						},
					],
					[
						"获得五张锦囊牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList = lib.inpile.filter(name => get.type2(name) == "trick");
								for (let i = 0; i < 5; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 3.5;
							},
						},
					],
					[
						"获得五张普通锦囊牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList = lib.inpile.filter(name => get.type(name) == "trick");
								for (let i = 0; i < 5; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 3.5;
							},
						},
					],
					[
						"获得五张延时锦囊牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList = lib.inpile.filter(name => get.type(name) == "delay");
								for (let i = 0; i < 5; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 3.5;
							},
						},
					],
					[
						"获得四张装备牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList = lib.inpile.filter(name => get.type2(name) == "equip");
								for (let i = 0; i < 4; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 3;
							},
						},
					],
					[
						"获得三张(equip1|equip2)牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList = lib.inpile.filter(name => {
									if (get.type2(name) != "equip") {
										return false;
									}
									return get.subtype(name) == event.cardName;
								});
								for (let i = 0; i < 4; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 3;
							},
						},
					],
					[
						"获得三张基本牌、三张锦囊牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList1 = lib.inpile.filter(name => get.type2(name) == "basic"),
									cardList2 = lib.inpile.filter(name => get.type2(name) == "trick");
								for (let i = 0; i < 3; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList1.randomGet());
									if (card) {
										cards.add(card);
									}
									card = lib.skill.jlsg_lingze.createTempCard(cardList2.randomGet());
									if (card) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 6;
							},
						},
					],
					[
						"获得三张锦囊牌、两张装备牌",
						{
							content: async function (event, trigger, player) {
								const cards = [];
								let cardList1 = lib.inpile.filter(name => get.type2(name) == "equip"),
									cardList2 = lib.inpile.filter(name => get.type2(name) == "trick");
								for (let i = 0; i < 3; i++) {
									let card = lib.skill.jlsg_lingze.createTempCard(cardList1.randomGet());
									if (card) {
										cards.add(card);
									}
									card = lib.skill.jlsg_lingze.createTempCard(cardList2.randomGet());
									if (card && cards.length < 4) {
										cards.add(card);
									}
								}
								if (cards.length) {
									await player.gain(cards, "draw").set("log", true);
								}
							},
							effect(player) {
								return 5.5;
							},
						},
					],
					[
						"选择一名角色，令其对其余所有角色连续使用六张同名普通锦囊牌",
						{
							content: async function (event, trigger, player) {
								const list = lib.inpile.filter(name => {
									if (get.type(name, null, false) != "trick") {
										return false;
									}
									let info = lib.card[name];
									if (!info || info.filterAddedTarget) {
										return false;
									}
									return true;
								});
								const { result } = await player
									.chooseTarget("选择一名角色，令其对其余所有角色连续使用六张同名普通锦囊牌", true)
									.set("filterTarget", (_, player, target) => get.event("list").some(name => target.hasUseTarget(name)))
									.set("ai", target => Math.random())
									.set("list", list);
								if (result.bool) {
									const target = result.targets[0];
									const cards = list.filter(name => target.hasUseTarget(name));
									event.card = get.autoViewAs({ name: cards.randomGet(), isCard: true }, []);
									game.log(target, "使用的牌为", get.translation(event.card.name));
									const targets = game.filterPlayer(current => current != target && target.canUse(event.card, current, false, event));
									for (let i = 0; i < 6; i++) {
										if (!target.isIn()) {
											break;
										}
										await target.useCard(
											event.card,
											targets.filter(i => i.isIn()),
											false
										);
									}
								}
							},
							effect(player) {
								return 2;
							},
						},
					],
					[
						"选择一名角色，令其对其余所有角色连续使用六张随机普通锦囊牌",
						{
							content: async function (event, trigger, player) {
								const list = lib.inpile.filter(name => {
									if (get.type(name, null, false) != "trick") {
										return false;
									}
									let info = lib.card[name];
									if (!info || info.filterAddedTarget) {
										return false;
									}
									return true;
								});
								const { result } = await player
									.chooseTarget("选择一名角色，令其对其余所有角色连续使用六张随机普通锦囊牌", true)
									.set("filterTarget", (_, player, target) => get.event("list").some(name => target.hasUseTarget(name)))
									.set("ai", target => Math.random())
									.set("list", list);
								if (result.bool) {
									const target = result.targets[0];
									const cards = list.filter(name => target.hasUseTarget(name));
									event.cards = [];
									while (event.cards.length < 6 && target.isIn()) {
										const card = get.autoViewAs({ name: cards.randomGet(), isCard: true }, []);
										event.cards.push(card.name);
										const targets = game.filterPlayer(current => {
											if (current == target) {
												return false;
											}
											return target.canUse(card, current, false, event);
										});
										await target.useCard(card, targets, false);
									}
								}
							},
							effect(player) {
								return 2;
							},
						},
					],
					[
						"选择任意名角色，令这些角色各随机失去一个非初始技能，然后随机获得两个技能",
						{
							content: async function (event, trigger, player) {
								const { result } = await player.chooseTarget("选择任意名角色，令这些角色各随机失去一个非初始技能，然后随机获得两个技能", true, [1, game.countPlayer()]).set("ai", target => Math.random());
								if (result.bool) {
									result.targets.sortBySeat(_status.currentPhase);
									for (const target of result.targets) {
										const loseList = target.getSkills(null, false, false).removeArray(target.getStockSkills());
										if (loseList.length) {
											await target.removeSkills(loseList.randomGet());
										}
										const addList = lib.skill.jlsg_lingze.skills(target);
										const skills = addList
											.filter(skill => {
												if (loseList.includes(skill)) {
													return false;
												}
												const info = lib.skill[skill];
												if (info.ai?.combo) {
													return target.hasSkill(info.ai?.combo, null, false, false);
												}
												return true;
											})
											.randomGets(2);
										if (skills) {
											await target.addSkills(skills);
										}
									}
								}
							},
							effect(player) {
								return 5.5;
							},
						},
					],
				],
			};
			let jlsg_qs = false;
			if (_status.connectMode) {
				if (lib.configOL.cardPack.includes("jlsg_qs")) {
					jlsg_qs = true;
				}
			} else if (lib.config.cards.includes("jlsg_qs")) {
				jlsg_qs = true;
			}
			if (jlsg_qs) {
				const list = {
					damage: [
						[
							"获得一张【(jlsgqs_xiujian|jlsgqs_qixingbaodao)】、一张随机武器牌、一张【酒】，一张普通【杀】",
							{
								content: async function (event, trigger, player) {
									const cards = [lib.skill.jlsg_lingze.createTempCard(event.cardName)];
									let cardList = lib.inpile.filter(name => get.subtype(name) == "equip1");
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
									if (card) {
										cards.add(card);
									}
									cards.addArray([lib.skill.jlsg_lingze.createTempCard("jiu"), lib.skill.jlsg_lingze.createTempCard("sha", undefined, null)]);
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								},
								effect(player) {
									return 4;
								},
							},
						],
					],
					recover: [
						[
							"获得一张【(jlsgqs_yuxi|jlsgqs_taipingyaoshu)】、一张随机防具牌、一张【无懈可击】，一张【梅】",
							{
								content: async function (event, trigger, player) {
									const cards = [lib.skill.jlsg_lingze.createTempCard(event.cardName)];
									let cardList = lib.inpile.filter(name => get.subtype(name) == "equip2");
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
									if (card) {
										cards.add(card);
									}
									cards.addArray([lib.skill.jlsg_lingze.createTempCard("wuxie"), lib.skill.jlsg_lingze.createTempCard("jlsgqs_mei")]);
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								},
								effect(player) {
									return 4;
								},
							},
						],
						[
							"获得一张【(jlsgqs_jinnangdai|jlsgqs_muniu)】、一张随机防具牌、一张【无中生有】，一张【梅】",
							{
								content: async function (event, trigger, player) {
									const cards = [lib.skill.jlsg_lingze.createTempCard(event.cardName)];
									let cardList = lib.inpile.filter(name => get.subtype(name) == "equip2");
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
									if (card) {
										cards.add(card);
									}
									cards.addArray([lib.skill.jlsg_lingze.createTempCard("wuzhong"), lib.skill.jlsg_lingze.createTempCard("jlsgqs_mei")]);
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								},
								effect(player) {
									return 4.5;
								},
							},
						],
						[
							"获得一张【孔明灯】、一张随机防具牌、两张张【无中生有】",
							{
								content: async function (event, trigger, player) {
									const cards = [lib.skill.jlsg_lingze.createTempCard("jlsgqs_kongmingdeng")];
									let cardList = lib.inpile.filter(name => get.subtype(name) == "equip1");
									let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
									if (card) {
										cards.add(card);
									}
									cards.addArray([lib.skill.jlsg_lingze.createTempCard("wuzhong"), lib.skill.jlsg_lingze.createTempCard("wuzhong")]);
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								},
								effect(player) {
									return 5;
								},
							},
						],
						[
							"获得一张【遁甲天书】、一张进攻马、一张防御马",
							{
								content: async function (event, trigger, player) {
									const cards = [lib.skill.jlsg_lingze.createTempCard("jlsgqs_dunjiatianshu")];
									let attack = lib.inpile
											.filter(name => {
												if (get.type(name, null, false) != "equip") {
													return false;
												}
												const card = lib.card[name];
												return card.distance?.globalFrom;
											})
											.randomGet(),
										defend = lib.inpile
											.filter(name => {
												if (get.type(name, null, false) != "equip") {
													return false;
												}
												const card = lib.card[name];
												return card.distance?.globalTo;
											})
											.randomGet();
									cards.addArray([lib.skill.jlsg_lingze.createTempCard(attack), lib.skill.jlsg_lingze.createTempCard(defend)]);
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								},
								effect(player) {
									return 4;
								},
							},
						],
					],
					chaos: [
						[
							"获得三张随机宝物牌",
							{
								content: async function (event, trigger, player) {
									const cards = [];
									let cardList = lib.inpile.filter(name => get.subtype(name) == "equip5");
									if (cardList.length < 4) {
										cardList = ["lingsheji", "shanrangzhaoshu", "changandajian_equip5", "sanlve", "zhaogujing", "shufazijinguan", "xuwangzhimian", "zhuangshu_basic", "zhuangshu_trick", "zhuangshu_equip", "dagongche", "pilitoushiche", "jlsgqs_kongmingdeng", "jlsgqs_muniu", "jlsgqs_yuxi", "jlsgqs_taipingyaoshu", "jlsgqs_dunjiatianshu", "jlsgqs_qixingbaodao", "jlsgqs_xiujian", "jlsgqs_jinnangdai", "muniu", "tongque", "tianjitu", "taigongyinfu", "zhaoshu", "dinglanyemingzhu", "yuxi", "xinge", "jinhe"];
									}
									if (!lib.inpile.some(i => i.startsWith("jlsgqs_"))) {
										cardList = cardList.filter(i => !i.startsWith("jlsgqx_"));
									}
									for (let i = 0; i < 3; i++) {
										let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
										if (card) {
											cards.add(card);
										}
									}
									if (cards.length) {
										await player.gain(cards, "draw").set("log", true);
									}
								},
								effect(player) {
									return 3;
								},
							},
						],
					],
				};
				for (let type in list) {
					result[type].addArray(list[type]);
				}
			}
			delete this.getEffects;
			this.getEffects = result;
			return result;
		},
		get typeSkills() {
			let list = {
				damage: [
					"长驱",
					"电界",
					"横江",
					"无双",
					"龙胆",
					"习武",
					"酒诗",
					"狂风",
					"纵欲",
					"慧觑",
					"止戈",
					"断粮",
					"引兵",
					"神速",
					"咆哮",
					"武圣",
					"权倾",
					"扫讨",
					"笔伐",
					"剑舞",
					"贿生",
					"悲歌",
					"缮甲",
					"献祭",
					"征南",
					"整毅",
					"蒺藜",
					"义从",
					"扰梦",
					"虎痴",
					"啖睛",
					"诈降",
					"谱毁",
					"无畏",
					"焚营",
					"伏诛",
					"严教",
					"授计",
					"溃诛",
					"祸世",
					"鸩毒",
					"湮灭",
					"母仪",
					"反间",
					"千幻",
					"神戟",
					"琴音",
					"顺世",
					"铁骑",
					"尚义",
					"猛进",
					"主宰",
					"惴恐",
					"逆施",
					"奔袭",
					"夙隐",
					"诋毁",
					"鱼忧",
					"索魂",
					"八门",
					"三治",
					"残掠",
					"仇决",
					"国色",
					"鬼门",
					"极弓",
					"蛮裔",
					"震魂",
					"劫焰",
					"刚烈",
					"卸甲",
					"调度",
					"拒战",
					"观虚",
					"木牛",
					"寝情",
					"暴政",
					"突围",
					"轻袭",
					"薮影",
					"眩惑",
					"神威",
					"缔盟",
					"鸡肋",
					"魔兽",
					"傲才",
					"沉鱼",
					"魔舞",
					"魅心",
					"送丧",
					"落雷",
					"狂傲",
					"纵情",
					"解烦",
					"温酒",
					"踏破",
					"凤吟",
					"虎啸",
					"司敌",
					"搏战",
					"忠勇",
					"求援",
					"屯田",
					"逐寇",
					"曼舞",
					"过论",
					"忠魂",
					"蚕食",
					"勇继",
					"国士",
					"画策",
					"游侠",
					"贺春",
					"炼体",
					"狂斧",
					"戟舞",
					"献州",
					"奋威",
					"伏射",
					"虚猩",
					"活墨",
					"天启",
					"朝臣",
					"颂词",
					"驱虎",
					"狼顾",
					"灭计",
					"谦冲",
					"蓄劲",
					"魔箭",
					"奇袭",
					"恃傲",
					"制敌",
					"死谏",
					"弓骑",
					"乱嗣",
					"强袭",
					"凌波",
					"星舞",
					"专擅",
					"乱武",
					"旋风",
					"修罗",
					"三绝",
					"绝策",
					"决裂",
					"咒缚",
					"激诏",
					"攻心",
					"延粮",
					"谗陷",
					"集军",
					"折节",
					"火计",
					"醉酒",
					"截军",
					"妖惑",
					"待劳",
					"掠阵",
					"乱政",
					"凌怒",
					"祸水",
					"忧戎",
					"悍勇",
					"落雁",
					"素检",
					"藏书",
					"永劫",
					"神愤",
					"舌剑",
					"埋伏",
					"烈弓",
					"烈医",
					"逐鹿",
					"知命",
					"摧锋",
					"陷嗣",
					"挑衅",
					"横行",
					"射戟",
					"戚乱",
					"龙咆",
					"朝凰",
					"酋首",
					"龙魂",
					"迷乱",
					"极武",
					"筹略",
					"米道",
					"罪论",
					"布教",
					"独进",
					"战绝",
					"飞军",
				],
				recover: [
					"甘露",
					"孤城",
					"芳馨",
					"礼让",
					"存嗣",
					"严整",
					"天辩",
					"伏枥",
					"豹变",
					"法恩",
					"匡弼",
					"红颜",
					"大雾",
					"遗计",
					"蛮王",
					"兴学",
					"秉壹",
					"品第",
					"天姿",
					"姻盟",
					"绝勇",
					"御策",
					"诛暴",
					"羽化",
					"据守",
					"纵玄",
					"义谏",
					"谦逊",
					"温良",
					"明政",
					"矫诏",
					"威风",
					"才遇",
					"倾国",
					"娇媚",
					"无言",
					"五禽",
					"帷幕",
					"锦织",
					"鏖战",
					"放权",
					"狂暴",
					"闭月",
					"凤仪",
					"经纶",
					"连营",
					"七星",
					"乘风",
					"隐世",
					"天命",
					"溃围",
					"全政",
					"智迟",
					"极略",
					"贤士",
					"招降",
					"闪戏",
					"强识",
					"衍息",
					"仁德",
					"恭慎",
					"怀璧",
					"奇才",
					"勘误",
					"享乐",
					"帷幄",
					"困奋",
					"空城",
					"储元",
					"仁心",
					"权略",
					"淑贤",
					"雅士",
					"直言",
					"良缘",
					"游龙",
					"捧日",
					"归命",
					"昭心",
					"资国",
					"尚俭",
					"闺秀",
					"归心",
					"断念",
					"奋激",
					"涅槃",
					"武志",
					"省身",
					"武继",
					"忍忌",
					"落英",
					"扶汉",
					"祸心",
					"涉猎",
					"好施",
					"制衡",
					"父志",
					"普渡",
					"缓兵",
					"誓仇",
					"八阵",
					"忘隙",
					"昂扬",
					"陈情",
					"密诏",
					"明策",
					"才捷",
					"衡势",
					"掣政",
					"狡慧",
					"追尊",
					"倾城",
					"虎踞",
					"雅虑",
					"儒宗",
					"刚直",
					"激词",
					"伏间",
					"鼓舌",
					"自守",
					"无前",
					"迭嶂",
					"宴诛",
					"绝境",
					"淫恣",
					"英才",
					"举荐",
					"博略",
					"行殇",
					"怀异",
					"拜月",
					"重生",
					"权计",
					"矢北",
					"仙授",
					"结姻",
					"刀侍",
					"反骨",
					"渐营",
					"天香",
					"雄略",
					"龙变",
					"元化",
					"枭姬",
					"单骑",
					"同心",
					"狂言",
				],
				chaos: [
					"五禽",
					"烈弓",
					"冲阵",
					"凌虐",
					"募马",
					"残掠",
					"咆哮",
					"勘误",
					"征南",
					"米道",
					"智愚",
					"凌弱",
					"震魂",
					"流离",
					"乱武",
					"刚直",
					"摧锋",
					"劝降",
					"伏诛",
					"刻死",
					"享乐",
					"掩杀",
					"慷忾",
					"品第",
					"天策",
					"搏战",
					"大雾",
					"剑舞",
					"缓兵",
					"太平",
					"折节",
					"箜篌",
					"逆战",
					"掣政",
					"温良",
					"当先",
					"焚城",
					"帷幕",
					"天妒",
					"神戟",
					"国色",
					"追击",
					"制合",
					"八门",
					"炼体",
					"雷魂",
					"七星",
					"三分",
					"攻心",
					"蒺藜",
					"空城",
					"观虚",
					"火计",
					"激词",
					"变天",
					"骄矜",
					"恩怨",
					"雷祭",
					"洞察",
					"魔箭",
					"恃傲",
					"烈医",
					"虎缚",
					"严整",
					"饵敌",
					"固政",
					"忧恤",
					"威震",
					"闭月",
					"飞军",
					"蓄劲",
					"追忆",
					"龙吟",
					"隐世",
					"衡势",
					"凤吟",
					"断粮",
					"娇媚",
					"绝境",
					"专擅",
					"承志",
					"伏枥",
					"伏间",
					"酒诗",
					"连环",
					"才鉴",
					"乱政",
					"素检",
					"流云",
					"离间",
					"御象",
					"战绝",
					"暴政",
					"狂暴",
					"勇烈",
					"蛮王",
					"落英",
					"涅槃",
					"雅虑",
					"狂傲",
					"司敌",
					"峻刑",
					"回春",
					"挑衅",
					"惠敛",
					"狂袭",
					"倾城",
					"横江",
					"曼舞",
					"商道",
					"神愤",
					"君望",
					"天辩",
					"悍勇",
					"顺世",
					"鱼忧",
					"贤士",
					"滔乱",
					"雄异",
					"机巧",
					"弓骑",
					"刀侍",
					"怒发",
					"魅惑",
					"狂骨",
					"风雅",
					"魔舞",
					"截军",
					"匡弼",
					"索魂",
					"千幻",
					"闪戏",
					"挥泪",
					"不屈",
					"无畏",
					"结姻",
					"罪论",
					"怀橘",
					"巧变",
					"淑贤",
					"鏖战",
					"忧戎",
					"千骑",
					"湮灭",
					"狂言",
					"仙授",
					"纵玄",
				],
			};
			list.chaos.addArray(list.recover.concat(list.damage)).unique();
			delete this.typeSkills;
			this.typeSkills = list;
			return list;
		},
		skills(player) {
			const skills = [];
			for (const packname in lib.characterPack) {
				if (!["standard", "shenhua", "jlsg_sk", "jlsg_skpf", "jlsg_sr", "jlsg_soul", "jlsg_sy", "jlAddition"].includes(packname)) {
					continue;
				}
				const pack = lib.characterPack[packname];
				if (!Object.keys(pack).length) {
					continue;
				}
				for (const i in pack) {
					if (i.indexOf("zuoci") != -1 || i.indexOf("xushao") != -1 || i.startsWith("jlsgsoul_sp_") || i.startsWith("jlsgsy_")) {
						continue;
					}
					if (lib.filter.characterDisabled(i)) {
						continue;
					}
					if (lib.filter.characterDisabled2(i)) {
						continue;
					}
					if (pack[i].isBoss) {
						continue;
					}
					if (pack[i].isHiddenBoss) {
						continue;
					}
					if (pack[i].isMinskin) {
						continue;
					}
					if (pack[i].isUnseen) {
						continue;
					}
					for (const skill of pack[i].skills) {
						if (["jlsg_sanjue", "jlsg_xianshou"].includes(skill)) {
							continue;
						}
						const info = lib.skill[skill];
						if (lib.filter.skillDisabled(skill)) {
							continue;
						}
						if (info?.charlotte) {
							continue;
						}
						if (player && player.hasSkill && info.ai && info.ai.combo && !player.hasSkill(info.ai.combo)) {
							continue;
						}
						skills.add(skill);
					}
				}
			}
			return skills;
		},
		/**
		 * 创造一张临时牌（进入弃牌堆后销毁）
		 * @param { string | null } [name] 要创造的牌名，若为null则随机
		 * @param { string | undefind } [suit] 此牌的花色
		 * @param { string | null | undefind } [nature] 此牌为杀的情况下的元素，为null则无元素
		 * @param { number | null } [number] 此牌的点数
		 * @param { Boolean | undefined } [isInPile] 该牌是否是牌堆内已有的牌，会覆盖除name以外的参数
		 * @returns { Card | undefind } 若牌名存在，则返回Card，否则为undefind
		 */
		createTempCard(name, suit, nature, number, isInPile) {
			if (!(name in lib.card) && name !== null) {
				return;
			}
			const list = lib.skill.jlsg_lingze.typePBTY;
			if (!name) {
				const { PBTY } = list;
				const numx = Math.random();
				for (let type in PBTY) {
					const [min, max] = PBTY[type];
					if (numx >= min && numx < max) {
						name = list[type].randomGet()[2];
						break;
					}
				}
				if (!name) {
					name = lib.inpile.randomGet();
				}
			}
			if (!isInPile) {
				suit ??= lib.suit.randomGet();
				if (name == "sha" && !nature && nature !== null && Math.random() < 0.5) {
					nature = lib.card.sha.nature.randomGet();
				}
				number ??= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].randomGet();
			} else {
				const type = get.type2(name, false);
				const cardInfo = list[type].filter(i => i[2] == name).randomGet();
				suit = cardInfo[0];
				nature = cardInfo[3];
				number = cardInfo[1];
			}
			let card = game.createCard(name, suit, number, nature);
			if (card) {
				game.broadcastAll(function (card) {
					card.destroyed = "discardPile";
					card.classList.add("jlsg_tempCard-glow");
				}, card);
				return card;
			}
			return;
		},
		get typePBTY() {
			let sum = 0;
			const cardList = {},
				PBTY = {};
			const list = Array.from(lib.card.list);
			for (const info of list) {
				const name = info[2];
				const type = get.type2(name, false);
				if (!cardList[type]) {
					cardList[type] = [];
				}
				cardList[type].push(info);
				if (!PBTY[type]) {
					PBTY[type] = 0;
				}
				PBTY[type]++;
				sum++;
			}
			let num = 0;
			for (let type in PBTY) {
				PBTY[type] = [num, (num += PBTY[type] / sum)];
			}
			cardList.PBTY = PBTY;
			delete this.typePBTY;
			this.typePBTY = cardList;
			return cardList;
		},
		subSkill: {
			effect: {
				mod: {
					maxHandcardBase: function (player, num) {
						return num + player.storage.jlsg_lingze_effect.maxHandcard;
					},
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.storage.jlsg_lingze_effect.sha;
						}
					},
				},
				init(player) {
					player.storage.jlsg_lingze_effect = {
						sha: 0,
						maxHandcard: 0,
						draw: 0,
					};
				},
				mark: true,
				marktext: "愿",
				intro: {
					mark(dialog, storage) {
						const addNewRow = lib.element.dialog.addNewRow.bind(dialog),
							itemContainerCss = { height: "20px" },
							map = {
								sha: "使用杀次数",
								maxHandcard: "手牌上限",
								draw: "额定摸牌数",
							};
						if (get.is.phoneLayout()) {
							dialog.classList.add("fullheight");
						}
						dialog.css({ width: "20%" });
						for (let i in storage) {
							let num = storage[i];
							if (num <= 0) {
								continue;
							}
							let list = [
								{ item: map[i], ratio: 0.8, itemContainerCss },
								{ item: "+" + num, ratio: 0.5, itemContainerCss },
							];
							addNewRow(...list);
						}
					},
				},
				trigger: { player: "phaseDrawBegin1" },
				filter(event, player) {
					return !event.numFixed && player.storage.jlsg_lingze_effect.draw > 0;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.num += player.storage.jlsg_lingze_effect.draw;
				},
			},
		},
	},
	jlsg_hanshuang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "damageBegin3" },
		filter: () => true,
		async cost(event, trigger, player) {
			const { player: target, source, card } = trigger,
				[SUB, ADD] = ["减伤", "加伤"],
				list = ["加伤", "减伤", "cancel2"],
				num = player.getRoundHistory("useSkill", evt => evt.skill == "jlsg_hanshuang" && evt.targets?.includes(trigger.player)).length + 1;
			let prompt = `${get.translation(target)}即将受到${source ? "来自" + get.translation(source) : "无来源"}的${trigger.num}点伤害，你可以选择一项：`;
			const choiceTexts = [`1.令其摸${get.cnNumber(num)}张牌并令此次伤害+${num}`, `2.令其弃置${get.cnNumber(num)}张牌并令此次伤害-${num}`];
			if (target.countDiscardableCards(target, "he") < num) {
				list.remove("减伤");
				choiceTexts[1] = `<span style="text-decoration: line-through;">${choiceTexts[1]}</span>`;
			}
			choiceTexts.forEach(text => (prompt += "<br>" + text));
			const { result } = await player
				.chooseControl(list)
				.set("prompt", get.prompt("jlsg_hanshuang", target))
				.set("prompt2", prompt)
				.set("ai", () => get.event("choice"))
				.set(
					"choice",
					(() => {
						const damageEff = get.damageEffect(target, source, player, trigger.nature),
							guohe = get.effect(target, { name: "guohe_copy2" }, target, player) * num,
							draw = get.effect(target, { name: "draw" }, target, player) * num;
						const canFilterDamage = target.hasSkillTag("filterDamage", null, {
							player: source,
							card,
						});
						if (damageEff > 0) {
							if (!canFilterDamage && (target.getHp() <= trigger.num + num || guohe < draw)) {
								return ADD;
							} else {
								if (get.attitude(player, target) > 0 && (damageEff === 0 || canFilterDamage)) {
									return ADD;
								}
								if (target.getHp() + target.countCards("hs", card => target.canSaveCard(card, target)) > trigger.num + 1 && !list.includes(SUB)) {
									return ADD;
								}
							}
						} else {
							if (get.attitude(player, target) > 0) {
								if (damageEff === 0 || canFilterDamage) {
									return ADD;
								}
								if (target.getHp() + target.countCards("hs", card => target.canSaveCard(card, target)) > trigger.num + num && draw > guohe) {
									return ADD;
								} else {
									const discardableCards = target.getDiscardableCards(target, "he");
									if ((discardableCards.length >= trigger.num || trigger.num >= target.getHp() || discardableCards.reduce((sum, card) => sum + target.getUseValue(card), 0) > Math.abs(guohe)) && list.includes(SUB)) {
										return SUB;
									}
								}
							} else if (target.hasSkillTag("maixie") && trigger.num === 1 && damageEff < -20 && list.includes(SUB)) {
								return SUB;
							}
						}
						return "cancel2";
					})()
				);
			if (result.control !== "cancel2") {
				event.result = {
					bool: true,
					targets: [target],
					cost_data: {
						control: result.control,
						num,
					},
				};
			}
		},
		async content(event, trigger, player) {
			const { control, num } = event.cost_data,
				{ player: target } = trigger;
			if (control === "减伤") {
				await target.chooseToDiscard(num, true, "he");
				game.log(player, "令此伤害", `#y-${num}`);
				trigger.num -= Math.min(num, trigger.num);
			} else {
				await target.draw(num);
				game.log(player, "令此伤害", `#y+${num}`);
				trigger.num += num;
			}
			await game.delayx();
		},
	},
	jlsg_liluan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: ["loseBefore", "drawBefore"] },
		usable: 1,
		filter(event, player) {
			if (!event.player.isIn()) {
				return false;
			}
			if (event.name == "lose") {
				if (event.type != "discard") {
					return false;
				}
				return event.cards.some(card => {
					if (get.owner(card) != event.player) {
						return false;
					}
					return ["h", "e"].includes(get.position(card));
				});
			} else {
				return event.num > 0;
			}
		},
		async cost(event, trigger, player) {
			const { player: target } = trigger,
				num =
					trigger.name == "lose"
						? trigger.cards.filter(card => {
								if (get.owner(card) == target) {
									return false;
								}
								return !["h", "e"].includes(get.position(card));
						  }).length
						: trigger.num;
			const prompt = `${get.translation(target)}即将${trigger.name == "lose" ? "弃置" : "摸"}${get.cnNumber(num)}张牌，是否取消此操作改为其以外的角色各${trigger.name == "lose" ? "随机弃置" : "摸"}一张牌？`;
			event.result = await player
				.chooseBool()
				.set("prompt", get.prompt("jlsg_liluan", target))
				.set("prompt2", prompt)
				.set("ai", (event, player) => {
					const trigger = event.getTrigger(),
						target = event.getTrigger().player;
					const targetEff = get.effect(target, { name: trigger.name == "lose" ? "guohe_copy2" : "draw" }, target, player) * get.event("num"),
						sumEff = game.filterPlayer(current => current != target).reduce((sum, current) => sum + get.effect(current, { name: trigger.name == "lose" ? "guohe_copy2" : "draw" }, current, player), 0);
					return targetEff < sumEff;
				})
				.set("num", num)
				.forResult();
			event.result.targets = [target];
		},
		async content(event, trigger, player) {
			const { player: target } = trigger,
				targets = game.filterPlayer(current => current != target).sortBySeat(_status.currentPhase);
			if (trigger.name == "lose") {
				game.log(player, "取消了", target, "的弃牌");
				trigger.cards = trigger.cards.filter(card => {
					if (get.owner(card) == target) {
						return false;
					}
					return !["h", "e"].includes(get.position(card));
				});
				if (!trigger.cards.length) {
					trigger.cancel();
				}
				const lose_list = [];
				for (let current of targets) {
					const cards = current.getDiscardableCards(current, "he");
					if (cards.length) {
						lose_list.add([current, cards.randomGets(1)]);
					}
				}
				await game.loseAsync({ lose_list }).setContent("discardMultiple");
			} else {
				trigger.cancel();
				game.log(player, "取消了", target, "的摸牌");
				await game.asyncDraw(targets);
			}
		},
	},
	jlsg_zhanyue: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			if (event.targets.length > 1) {
				return false;
			}
			return event.card.name == "sha";
		},
		async cost(event, trigger, player) {
			const [target] = trigger.targets;
			const list = { next: [], previous: [] };
			let next = target,
				previous = target;
			for (let i = 0; i < 2; i++) {
				next = next.getNext();
				previous = previous.getPrevious();
				list.next.add(next);
				list.previous.add(previous);
			}
			if (list.next[0] == player) {
				list.next = [null, null];
			}
			if (list.previous[0] == player) {
				list.previous = [null, null];
			}
			const targetsx = list.next.reverse().concat(list.previous);
			let str = "";
			if (targetsx.filter(i => i && i != player).unique().length) {
				str = `可以指定1-2名与${get.translation(target)}相连且不为你的其他角色也成为此【杀】的目标，然后`;
			}
			str += "令此【杀】无视防具、不计入次数限制，且造成的伤害改为目标角色一半的体力值（向上取整），此【杀】结算后，你摸此【杀】造成伤害总数的牌";
			event.result = await player
				.chooseTarget([0, 2], `###${get.prompt("jlsg_zhanyue")}###${str}`)
				.set("targetsx", targetsx)
				.set(
					"cardx",
					(function () {
						if (!trigger.card.storage?.jlsg_zhanyue) {
							if (!trigger.card.storage) {
								trigger.card.storage = {};
							}
							trigger.card.storage.jlsg_zhanyue = true;
						}
						return trigger.card;
					})()
				)
				.set("complexTarget", true)
				.set("filterTarget", (card, player, target) => {
					if (target == player) {
						return false;
					}
					const list = get.event("targetsx");
					if (!list.includes(target)) {
						return false;
					}
					if (ui.selected.targets.length) {
						return ui.selected.targets.some(current => {
							const curIndex = list.indexOf(current),
								tarIndex = list.indexOf(target);
							return Math.abs(curIndex - tarIndex) == 1;
						});
					}
					return list.slice(1, 3).includes(target);
				})
				.set("ai", target => {
					const event = get.event(),
						player = get.player();
					const card = get.event("cardx");
					return get.effect(target, card, player, player);
				})
				.set("filterOk", () => {
					const event = get.event(),
						player = get.player(),
						target = event.getTrigger().targets[0],
						card = event.cardx;
					if (_status.connectMode && !player.isAuto) {
						return true;
					} else if (!_status.auto) {
						return true;
					}
					return get.effect(target, card, player, player) > 0;
				})
				.set("custom", {
					add: {},
					replace: {
						target(target) {
							const event = get.event();
							if (!event.isMine()) {
								return;
							}
							if (target.classList.contains("selectable") == false) {
								return;
							}
							if (target.classList.contains("selected")) {
								ui.selected.targets.remove(target);
								target.classList.remove("selected");
								if (_status.multitarget || event.complexSelect || event.complexTarget) {
									game.uncheck();
									game.check();
								}
							} else {
								target.classList.add("selected");
								ui.selected.targets.add(target);
							}
							game.check();
						},
					},
				})
				.forResult();
			if (event.result.bool) {
				event.result.targets.unshift(target);
				event.result.targets.sortBySeat(_status.currentPhase);
			}
			delete trigger.card.storage.jlsg_zhanyue;
		},
		async content(event, trigger, player) {
			const targets = event.targets.slice().removeArray(trigger.targets).sortBySeat();
			if (targets.length) {
				game.log(targets, `成为了`, trigger.card, "的额外目标");
				trigger.targets.addArray(targets);
			}
			if (!trigger.card.storage?.jlsg_zhanyue) {
				if (!trigger.card.storage) {
					trigger.card.storage = {};
				}
				trigger.card.storage.jlsg_zhanyue = true;
			}
			if (trigger.addCount !== false) {
				trigger.addCount = false;
				trigger.player.getStat().card.sha--;
			}
			player
				.when({ player: "useCardAfter" })
				.filter(evt => evt.card == trigger.card)
				.step(async function (event, trigger, player) {
					const num = player
						.getHistory("sourceDamage", evt => {
							return evt.card == trigger.card;
						})
						.reduce((sum, evt) => sum + evt.num, 0);
					if (num > 0) {
						await player.draw(num);
					}
				});
		},
		group: ["jlsg_zhanyue_damage"],
		subSkill: {
			damage: {
				sourceSkill: "jlsg_zhanyue",
				sub: true,
				audio: false,
				trigger: { source: "damageBegin4" },
				filter(event, player) {
					if (!event.card) {
						return false;
					}
					return event.card.name == "sha" && event.card.storage?.jlsg_zhanyue;
				},
				charlotte: true,
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const num = Math.ceil(trigger.player.getHp() / 2);
					if (num > 0) {
						trigger.num = num;
					}
				},
			},
		},
		ai: {
			unequip: true,
			unequip_ai: true,
			skillTagFilter(player, tag, arg) {
				return arg?.card?.storage?.jlsg_zhanyue;
			},
			effect: {
				player(card, player, target) {
					if (card.storage?.jlsg_zhanyue) {
						return;
					}
					if (
						!target ||
						target.hasSkillTag("filterDamage", null, {
							player: player,
							card: card,
						})
					) {
						return;
					}
					const num = Math.ceil(target.getHp() / 2);
					if (num > 0) {
						return [1, Math.log(num) / 2, 1, -Math.log(num) / 2];
					}
				},
			},
		},
	},
	jlsg_fengtian: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseBegin" },
		filter(event, player) {
			return event.player != player && player.countDiscardableCards(player, "he");
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard("he")
				.set("prompt", get.prompt2("jlsg_fengtian", trigger.player))
				.set("ai", card => {
					const target = get.event("target"),
						player = get.player(),
						phaseList = get.event("phaseList");
					if (get.attitude(player, target) > 0) {
						return 0;
					}
					let value = 3 - get.value(card, player);
					if (!phaseList.length) {
						value -= 3;
					} else {
						value += Math.min(3, phaseList.length);
					}
					if (get.effect(target, get.autoViewAs({ name: "sha" }, []), player, player) > 0) {
						value += 2;
					}
					if (card.name == "sha") {
						value += target.getSkills(null, false).length / 2;
					}
					return value;
				})
				.set("target", trigger.player)
				.set(
					"phaseList",
					trigger.phaseList.filter(i => {
						return ["phaseDraw", "phaseUse", "phaseDiscard"].includes(i);
					})
				)
				.set("chooseonly", true)
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [trigger.player];
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards: [card],
			} = event;
			await player.discard(card);
			target.addTempSkill("jlsg_fengtian_effect", { global: ["phaseAfter", "phaseBefore"] });
			target.storage.jlsg_fengtian_effect.players.add(player);
			if (get.name(card) == "sha") {
				target.addSkillBlocker("jlsg_fengtian_effect");
			}
			target.markSkill("jlsg_fengtian_effect");
		},
		group: ["jlsg_fengtian_sha"],
		subSkill: {
			sha: {
				sourceSkill: "jlsg_fengtian",
				sub: true,
				audio: "jlsg_fengtian",
				trigger: { global: ["drawAfter", "useCardAfter", "loseAfter", "loseAsyncAfter"] },
				getIndex(event, player) {
					if (["useCard", "draw"].includes(event.name)) {
						return [event.player];
					}
					if (event.getl && typeof event.getl == "function") {
						return game.filterPlayer(current => event.getl(current).cards2?.length).sortBySeat();
					}
					return [];
				},
				filter(event, player, name, target) {
					if (!target?.storage?.jlsg_fengtian_effect?.players?.includes(player)) {
						return false;
					}
					const record = target.storage.jlsg_fengtian_effect.record;
					if (event.name == "useCard") {
						return !record.useCard.includes(event.card.name);
					} else if (event.name == "draw") {
						return !record.draw;
					}
					return event.type == "discard" && !record.discard;
				},
				forced: true,
				logTarget(event, player, name, target) {
					return [target];
				},
				async content(event, trigger, player) {
					const {
						targets: [target],
					} = event;
					switch (trigger.name) {
						case "useCard":
							target.storage.jlsg_fengtian_effect.record.useCard.add(trigger.card.name);
							break;
						case "draw":
							target.storage.jlsg_fengtian_effect.record.draw = true;
							break;
						default:
							target.storage.jlsg_fengtian_effect.record.discard = true;
							break;
					}
					target.markSkill("jlsg_fengtian_effect");
					const sha = get.autoViewAs({ name: "sha" }, []);
					if (player.canUse(sha, target, false)) {
						await player.useCard(sha, target);
					}
				},
			},
			effect: {
				sourceSkill: "jlsg_fengtian",
				sub: true,
				audio: false,
				init(player, skill) {
					player.storage[skill] = {
						players: [],
						record: {
							draw: false,
							discard: false,
							useCard: [],
						},
					};
				},
				intro: {
					noucount: true,
					content(storage, player) {
						const { players, record } = storage;
						let str = `已被${get.translation(players)}封印<br>
									已使用牌：${record.useCard.length ? get.translation(record.useCard) : "无"}<br>
									摸牌：${record.draw ? "是" : "否"}<br>
									弃牌：${record.discard ? "是" : "否"}`;
						if (player.storage.skill_blocker?.includes("jlsg_fengtian_effect")) {
							const list = player.getSkills(null, false, false).filter(function (i) {
								return lib.skill.jlsg_fengtian_effect.skillBlocker(i, player);
							});
							if (list.length) {
								str += `<br>已失效技能：${get.translation(list)}`;
							}
						}
						return str;
					},
				},
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeSkillBlocker(skill);
				},
				skillBlocker(skill) {
					const info = get.info(skill);
					return !info.charlotte && !info.persevereSkill;
				},
				trigger: { source: "damageSource" },
				filter(event, player) {
					return player.storage.jlsg_fengtian_effect.players.includes(event.player);
				},
				charlotte: true,
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					player.storage.jlsg_fengtian_effect.players.remove(trigger.player);
					player.markSkill("jlsg_fengtian_effect");
					if (!player.storage.jlsg_fengtian_effect.players.length) {
						player.removeSkill("jlsg_fengtian_effect");
					}
				},
			},
		},
	},
	jlsg_zhanhun: {
		audio: "ext:极略/audio/skill:2",
		get trigger() {
			return lib.jlsg.debuffSkill.trigger;
		},
		filter(event, player) {
			let key = lib.jlsg.debuffSkill.translate[event.name];
			let bool = lib.jlsg.debuffSkill.getInfo(event, player, key).bool;
			if (!bool) {
				return false;
			}
			if (key == "damage") {
				if (!event.source || event.source == player) {
					return false;
				}
			} else if (["loseHp", "loseMaxHp", "removeSkill", "link", "turnOver"].includes(key)) {
				if (event.getParent().player && event.getParent().player == player) {
					return false;
				}
				if (!event.getParent().player) {
					return false;
				}
			} else if (key == "discard") {
				let discarder = event.discarder || event.getParent().player;
				if (discarder && discarder == player) {
					return false;
				}
				if (!discarder) {
					return false;
				}
			}
			return true;
		},
		forced: true,
		async content(event, trigger, player) {
			let key = lib.jlsg.debuffSkill.translate[trigger.name];
			const { str } = lib.jlsg.debuffSkill.getInfo(trigger, player, key);
			if (trigger.name == "changeSkills") {
				trigger.removeSkill = [];
			} else if (trigger.name == "lose") {
				trigger.cards = trigger.cards.filter(card => {
					if (get.owner(card) == player) {
						return false;
					}
					return !["h", "e"].includes(get.position(card));
				});
				if (!trigger.cards.length) {
					trigger.cancel();
				}
			} else if (key == "disableSkill") {
				trigger.cancel = true;
			} else {
				trigger.cancel();
			}
			game.log(player, "取消了", `#y${str}`);
			player.addTempSkill("jlsg_zhanhun_used");
			player.storage.jlsg_zhanhun_used ??= 0;
			player.storage.jlsg_zhanhun_used++;
			player.markSkill("player.storage.jlsg_zhanhun_used");
			const num = (player.storage.jlsg_zhanhun_used || 1) - 1;
			if (num > 0) {
				await player.loseHp(num);
			}
			const { result } = await player.draw(2);
			if (!result?.some(card => ["black", "red"].includes(get.color(card)))) {
				return;
			} else if (result?.length != 2) {
				return;
			}
			let suits = result.map(card => get.color(card)).sort(),
				nature = null;
			if (suits[0] == "black") {
				if (suits[1] == "black") {
					nature = "thunder";
				}
			} else {
				nature = "fire";
			}
			const sha = get.autoViewAs({ name: "sha", nature }, []);
			if (player.hasUseTarget(sha, false)) {
				await player.chooseUseTarget(sha, "nodistance");
			}
		},
		group: "jlsg_zhanhun_sha",
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
				mark: "战",
				intro: {
					name: "战魂",
					content: "本回合已发动#次",
				},
			},
			sha: {
				audio: "ext:极略/audio/skill:2",
				trigger: {
					player: "damageBegin2",
				},
				filter(event, player) {
					if (event.player == player) {
						return false;
					}
					return event.card?.name == "sha" && event.player.hp >= player.hp;
				},
				forced: true,
				async content(event, trigger, player) {
					await player.recover(1);
				},
				ai: {
					player(card, player, target) {
						if (player == target) {
							return;
						} else if (card?.name != "sha") {
							return;
						} else if (player.isHealthy()) {
							return;
						}
						return [1, 2];
					},
				},
			},
		},
		ai: {
			maixie: true,
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player == target) {
						return;
					}
					let num = -(player.storage.jlsg_zhanhun_used || 1) + 1;
					num += target.hasUseTarget("sha") ? 3 : 1;
					if (card.name == "tiesuo") {
						return [1, 0, 0, num];
					}
					if (card.name == "guohe") {
						return [1, 0, 0, num];
					}
					if (get.tag(card, "damage")) {
						return [1, 0, 0, num];
					}
					if (get.name(card) == "guohe") {
						return [1, 0, 0, num];
					}
					if (get.name(card) == "tiesuo" && !target.isLinked()) {
						return [1, 0, 0, num];
					}
				},
			},
		},
	},
	jlsg_qixian: {
		audio: "ext:极略/audio/skill:7",
		init(player, skill) {
			get.info(skill).getSkills["recover"];
			if (!_status.gameStarted) {
				return;
			}
			const next = game.createEvent("jlsg_qixian_start", false, get.event());
			next.player = player;
			next.skill = "jlsg_qixian_start";
			next.setContent(get.info("jlsg_qixian_start").content);
		},
		usable: 1,
		enable: "phaseUse",
		filter(event, player) {
			return player.getStorage("jlsg_qixian")?.list?.length;
		},
		direct: true,
		chooseButton: {
			dialog(event, player) {
				const storage = player.getStorage("jlsg_qixian", { count: 0, list: Array.from({ length: 7 }, (v, i) => Object.keys(get.info("jlsg_qixian").effects)[i]) }),
					dialog = ui.create.dialog("七弦：请选择要调换位置的两个音");
				dialog.addText("1—————————————————7", true);
				dialog.add([
					storage.list.map((v, i) => [Number(i) + 1, "", v]),
					(item, type, position, noclick, node) => {
						let showCard = [item[0], item[1], `${item[2]}`];
						node = ui.create.buttonPresets.vcard(showCard, type, position, noclick);
						node.node.info.innerHTML = `<span style = "color:#ffffff">${item[0]}</span>`;
						node.node.info.style["font-size"] = "20px";
						node._link = node.link = item;
						node._customintro = uiintro => {
							uiintro.add(get.translation(node._link[2]));
							uiintro.addText(`此为第${get.cnNumber(node._link[0], true)}点体力上限`);
							return uiintro;
						};
						return node;
					},
				]);
				return dialog;
			},
			select: [2, 2],
			backup(links, player) {
				return {
					links,
					prompt: "是否调换选中弦音位置",
					async content(event, trigger, player) {
						const storage = player.getStorage("jlsg_qixian", { count: 0, list: Array.from({ length: 7 }, (v, i) => Object.keys(get.info("jlsg_qixian").effects)[i]) }),
							[first, second] = links
								.map(i => i[2])
								.sort((a, b) => {
									const list = storage.list;
									return list.indexOf(a) - list.indexOf(b);
								});
						game.log(player, "调换了", `#y${first}`, "和", `#y${second}`, "的位置");
						let firstIndex = storage.list.indexOf(first),
							secondIndex = storage.list.indexOf(second);
						storage.list[firstIndex] = second;
						storage.list[secondIndex] = first;
						player.setStorage("jlsg_qixian", storage, true);
					},
				};
			},
			prompt: () => "是否调换选中弦音位置",
		},
		get effects() {
			const result = {
				宫: {
					red: {
						piano: {
							str: "随机属性+1",
							key() {
								return ["maxHandcard", "draw", "shaUsable", "maxHp", "attack"].randomGet();
							},
							prompt(key) {
								const translate = { maxHandcard: "手牌上限", draw: "额定摸牌数", shaUsable: "使用【杀】的次数上限", maxHp: "血量上限", attack: "攻击范围" }[key];
								return `${translate}+1`;
							},
						},
						forte: {
							str: "随机属性+1，获得一个与此属性有关的技能",
							key(player) {
								let key = ["maxHandcard", "draw", "shaUsable", "maxHp", "attack"].randomGet();
								let skill = get
									.info("jlsg_qixian")
									.getSkills[key].filter(skill => !player.hasSkill(skill, null, false, false))
									.randomGet();
								return { key, skill: skill };
							},
							prompt(key) {
								const translate = { maxHandcard: "手牌上限", draw: "额定摸牌数", shaUsable: "使用【杀】的次数上限", maxHp: "血量上限", attack: "攻击范围" }[key["key"]];
								return `${translate}+1，获得${get.poptip(key["skill"])}`;
							},
						},
						content: async function (event, trigger, player) {
							let key, skill;
							if (typeof event.key == "string") {
								key = event.key;
							} else if (typeof event.key == "object") {
								key = event.key.key;
								skill = event.key.skill;
							}
							if (key == "maxHp") {
								await event.target.gainMaxHp(1);
							} else {
								event.target.addSkill("jlsg_qixian_buff");
								event.target.storage.jlsg_qixian_buff[key]++;
								event.target.markSkill("jlsg_qixian_buff");
							}
							if (skill) {
								await event.target.addSkills(skill);
							}
						},
						ai(volume, key, player, target) {
							return get.attitude(player, target);
						},
					},
					black: {
						piano: {
							str: "下次造成的伤害-1",
							key: "filterDamage",
						},
						forte: {
							str: "将武将牌翻至背面",
							key: "turnOver",
						},
						content: async function (event, trigger, player) {
							if (event.key == "filterDamage") {
								await event.target.addSkill("jlsg_qixian_debuff");
								event.target.storage.jlsg_qixian_debuff[event.key]++;
								event.target.markSkill("jlsg_qixian_debuff");
							} else {
								await event.target.turnOver(true);
							}
						},
						ai(volume, key, player, target) {
							if (key == "turnOver") {
								if (target.isTurnedOver()) {
									if (target.hasSkillTag("noturn")) {
										return 0;
									}
									return get.attitude(player, target);
								}
							}
							return 10 - get.attitude(player, target);
						},
					},
				},
				商: {
					red: {
						piano: {
							str: "获得两张临时牌",
							key: 2,
						},
						forte: {
							str: "获得六张临时牌",
							key: 6,
						},
						content: async function (event, trigger, player) {
							let num = event.key,
								cards = [];
							while (num > 0) {
								const card = lib.skill.jlsg_lingze.createTempCard(null, null, null, null, true);
								if (card) {
									cards.add(card);
								}
								num--;
							}
							if (cards.length) {
								await event.target.gain(cards, "draw2");
							}
						},
						ai(volume, key, player, target) {
							return get.attitude(player, target);
						},
					},
					black: {
						piano: {
							str: "随机获得其一张牌",
							key: 1,
						},
						forte: {
							str: "随机获得其三张牌",
							key: 3,
						},
						content: async function (event, trigger, player) {
							if (!event.target.countGainableCards(player, "he")) {
								return;
							}
							await player.gainPlayerCard(event.target, true, "he", event.key);
						},
						ai(volume, key, player, target) {
							return get.effect(target, { name: "shunshou_copy2" }, player, player);
						},
					},
				},
				角: {
					red: {
						piano: {
							str: "回复1点体力",
						},
						forte: {
							str: "回复1点体力，获得一个与回复有关的技能",
							key: function (player) {
								let skill = get
									.info("jlsg_qixian")
									.getSkills["recover"].filter(skill => !player.hasSkill(skill, null, false, false))
									.randomGet();
								return skill;
							},
							prompt(key) {
								return `回复1点体力，获得${get.poptip(key)}`;
							},
						},
						content: async function (event, trigger, player) {
							await event.target.recover(1);
							if (typeof event.key == "string" && event.key in lib.skill) {
								await event.target.addSkills(event.key);
							}
						},
						ai(volume, key, player, target) {
							return get.recoverEffect(target, player, player);
						},
					},
					black: {
						piano: {
							str: "失去1点体力",
							key: 1,
						},
						forte: {
							str: "失去3点体力",
							key: 3,
						},
						content: async function (event, trigger, player) {
							await event.target.loseHp(event.key);
						},
						ai(volume, key, player, target) {
							return get.effect(target, { name: "losehp" }, player, player);
						},
					},
				},
				徵: {
					red: {
						piano: {
							str: "获得两张随机属性的临时【杀】",
						},
						forte: {
							str: "获得两张随机属性的临时【杀】，令手牌里所有【杀】不计入次数限制",
							key: "ignoreSha",
						},
						content: async function (event, trigger, player) {
							let num = 2,
								cards = [];
							while (num > 0) {
								num--;
								let card = lib.skill.jlsg_lingze.createTempCard("sha", null, undefined, null, true);
								if (card) {
									cards.add(card);
								}
							}
							if (cards.length) {
								await event.target.gain(cards, "draw2");
							}
							if (event.key == "ignoreSha") {
								let sha = event.target.getCards("h", { name: "sha" });
								if (sha.length) {
									event.target.addSkill("jlsg_qixian_buff");
									event.target.addGaintag(sha, "jlsg_qixian");
								}
							}
						},
						ai(volume, key, player, target) {
							return target.getUseValue({ name: "sha" }) * get.sgnAttitude(player, target);
						},
					},
					black: {
						piano: {
							str: "随机造成1点火焰或雷电伤害",
							key() {
								let nature = ["fire", "thunder"].randomGet();
								return { num: 1, nature };
							},
							prompt(key) {
								return `随机造成1点${get.translation(key.nature)}属性伤害`;
							},
						},
						forte: {
							str: "随机造成3点火焰或雷电伤害",
							key() {
								let nature = ["fire", "thunder"].randomGet();
								return { num: 3, nature };
							},
							prompt(key) {
								return `随机造成3点${get.translation(key.nature)}属性伤害`;
							},
						},
						content: async function (event, trigger, player) {
							const { num, nature } = event.key;
							await event.target.damage(num, nature);
						},
						ai(volume, key, player, target) {
							return get.damageEffect(target, player, player, key.nature);
						},
					},
				},
				羽: {
					red: {
						piano: {
							str: "随机触发其他正弦弱音效果，触发两次",
							key: function () {
								let type = Object.keys(get.info("jlsg_qixian").effects).remove("羽").randomGet();
								return { type, direction: "red", volume: "piano" };
							},
						},
						forte: {
							str: "随机触发其他正弦强音效果，触发两次",
							key: function () {
								let type = Object.keys(get.info("jlsg_qixian").effects).remove("羽").randomGet();
								return { type, direction: "red", volume: "forte" };
							},
						},
						ai(volume, key, player, target) {
							return get.attitude(player, target);
						},
					},
					black: {
						piano: {
							str: "随机触发其他逆弦弱音效果，触发两次",
							key: function () {
								let type = Object.keys(get.info("jlsg_qixian").effects).remove("羽").randomGet();
								return { type, direction: "black", volume: "piano" };
							},
						},
						forte: {
							str: "随机触发其他逆弦强音效果，触发两次",
							key: function () {
								let type = Object.keys(get.info("jlsg_qixian").effects).remove("羽").randomGet();
								return { type, direction: "black", volume: "forte" };
							},
						},
						ai(volume, key, player, target) {
							return 0;
						},
					},
				},
				文: {
					red: {
						piano: {
							str: "获得两张不能造成伤害的临时基本牌或锦囊牌",
							key() {
								return { type: ["basic", "trick"].randomGet() };
							},
							prompt(key) {
								return `获得两张不能造成伤害的临时${get.translation(key.type)}牌`;
							},
						},
						forte: {
							str: "获得两张不能造成伤害的临时基本牌或锦囊牌，获得一个与伤害无关的技能",
							key: function (player) {
								let skill = get
									.info("jlsg_qixian")
									.getSkills["nodamage"].filter(skill => !player.hasSkill(skill, null, false, false))
									.randomGet();
								return { type: ["basic", "trick"].randomGet(), skill };
							},
							prompt(key) {
								return `获得两张不能造成伤害的临时${get.translation(key.type)}牌，获得${get.poptip(key.skill)}`;
							},
						},
						content: async function (event, trigger, player) {
							let cards = [],
								type = event.key.type;
							const list = get
								.info("jlsg_lingze")
								.typePBTY[type].filter(info => !get.tag({ name: info[2] }, "damage"))
								.randomGets(2);
							for (let info of list) {
								const [suit, number, name, nature = null] = info;
								let card = get.info("jlsg_lingze").createTempCard(name, suit, nature, number);
								if (card) {
									cards.push(card);
								}
							}
							if (cards.length) {
								await event.target.gain(cards, "draw2");
							}
							if (typeof event.key.skill == "string" && event.key.skill in lib.skill) {
								await event.target.addSkills(event.key.skill);
							}
						},
						ai(volume, key, player, target) {
							return get.attitude(player, target);
						},
					},
					black: {
						piano: {
							str: "随机弃置两张不能造成伤害的基本牌或锦囊牌",
							key() {
								return { num: 2, type: ["basic", "trick"].randomGet() };
							},
							prompt(key) {
								return `随机弃置两张不能造成伤害的${get.translation(key.type)}牌`;
							},
						},
						forte: {
							str: "弃置所有不能造成伤害的基本牌或锦囊牌",
							key: function () {
								return { num: "all", type: ["basic", "trick"].randomGet() };
							},
							prompt(key) {
								return `弃置所有不能造成伤害的${get.translation(key.type)}牌`;
							},
						},
						content: async function (event, trigger, player) {
							let cards = event.target.getDiscardableCards(event.target, "he", card => {
								if (get.type2(card, event.target) != event.key.type) {
									return false;
								}
								return !get.tag(card, "damage");
							});
							if (!cards.length) {
								return;
							}
							cards = event.key.num === 2 ? cards.randomGets(2) : cards;
							await event.target.discard(cards);
						},
						ai(volume, key, player, target) {
							return get.effect(target, { name: "guohe_copy2" }, player, player) * target.countDiscardableCards(target, "he");
						},
					},
				},
				武: {
					red: {
						piano: {
							str: "获得两张能造成伤害的临时基本牌或锦囊牌",
							key(player) {
								return { type: ["basic", "trick"].randomGet() };
							},
							prompt(key) {
								return `获得两张能造成伤害的临时${get.translation(key.type)}牌`;
							},
						},
						forte: {
							str: "获得两张能造成伤害的临时基本牌或锦囊牌，获得一个与伤害有关的技能",
							key(player) {
								let skill = get
									.info("jlsg_qixian")
									.getSkills["damage"].filter(skill => !player.hasSkill(skill, null, false, false))
									.randomGet();
								return { type: ["basic", "trick"].randomGet(), skill };
							},
							prompt(key) {
								return `获得两张能造成伤害的临时${get.translation(key.type)}牌，获得${get.poptip(key.skill)}`;
							},
						},
						content: async function (event, trigger, player) {
							let cards = [],
								type = event.key.type;
							const list = get
								.info("jlsg_lingze")
								.typePBTY[type].filter(info => get.tag({ name: info[2] }, "damage"))
								.randomGets(2);
							for (let info of list) {
								const [suit, number, name, nature = null] = info;
								let card = get.info("jlsg_lingze").createTempCard(name, suit, nature, number);
								if (card) {
									cards.push(card);
								}
							}
							if (cards.length) {
								await event.target.gain(cards, "draw2");
							}
							if (typeof event.key.skill == "string" && event.key.skill in lib.skill) {
								await event.target.addSkills(event.key.skill);
							}
						},
						ai(volume, key, player, target) {
							return get.attitude(player, target);
						},
					},
					black: {
						piano: {
							str: "随机弃置两张能造成伤害的基本牌或锦囊牌",
							key() {
								return { num: 2, type: ["basic", "trick"].randomGet() };
							},
							prompt(key) {
								return `随机弃置两张能造成伤害的${get.translation(key.type)}牌`;
							},
						},
						forte: {
							str: "弃置所有能造成伤害的基本牌或锦囊牌",
							key() {
								return { num: "all", type: ["basic", "trick"].randomGet() };
							},
							prompt(key) {
								return `弃置所有能造成伤害的${get.translation(key.type)}牌`;
							},
						},
						content: async function (event, trigger, player) {
							let cards = event.target.getDiscardableCards(event.target, "he", card => {
								if (get.type2(card, event.target) != event.key.type) {
									return false;
								}
								return get.tag(card, "damage");
							});
							if (!cards.length) {
								return;
							}
							cards = event.key.num === 2 ? cards.randomGets(2) : cards;
							await event.target.discard(cards);
						},
						ai(volume, key, player, target) {
							return get.effect(target, { name: "guohe_copy2" }, player, player) * target.countDiscardableCards(target, "he");
						},
					},
				},
			};
			let yu = result["羽"];
			for (let direction in yu) {
				for (let volume in yu[direction]) {
					yu[direction][volume].prompt = function (key, player) {
						const { type, direction, volume } = key;
						const info = { ...get.info("jlsg_qixian").effects[type][direction][volume] };
						let { str, key: key2, prompt } = info;
						if (typeof key2 == "function") {
							key2 = key2(player);
						}
						if (!("prompt" in info)) {
							prompt = str;
						} else if (typeof prompt == "function") {
							prompt = prompt(key2, player);
						}
						return `${prompt}（触发两次）`;
					};
				}
				yu[direction].content = async function (event, trigger, player) {
					const { type, direction, volume } = event.key;
					const { content } = get.info("jlsg_qixian").effects[type][direction],
						info = { ...get.info("jlsg_qixian").effects[type][direction][volume] };
					let num = 2,
						translate = {
							direction: {
								red: "正弦",
								black: "逆弦",
							},
							volume: {
								piano: "弱音",
								forte: "强音",
							},
						};
					while (num > 0) {
						num--;
						let { str, key, prompt } = info;
						if (typeof key == "function") {
							key = key(player);
						}
						if (!prompt) {
							prompt = str;
						} else if (typeof prompt == "function") {
							prompt = prompt(key, player);
						}
						if (!event.target.isIn() || !player.isIn()) {
							break;
						}
						game.log(player, "对", event.target, "执行", `#y${type}`, "的", `#y${translate.direction[direction]}${translate.volume[volume]}`, "效果：", `#y${get.plainText(prompt)}`);
						if (volume == "piano") {
							player.storage.jlsg_qixian.count++;
							player.markSkill("jlsg_qixian_effect");
						}
						const next = game.createEvent("jlsg_qixian_effect2", false);
						next.player = player;
						next.target = event.target;
						next.jlsg_qixian_type = type;
						next.jlsg_qixian_direction = direction;
						next.jlsg_qixian_volume = volume;
						next.key = key;
						next.setContent(content);
						await next;
					}
				};
			}
			result["羽"] = yu;
			delete this.effects;
			this.effects = result;
			return result;
		},
		get getSkills() {
			let keyList = ["maxHandcard", "draw", "shaUsable", "maxHp", "attack", "recover", "damage", "nodamage"],
				check = function (key, info, translation) {
					if (key == "maxHandcard") {
						return translation.indexOf("手牌上限") > -1;
					} else if (key == "draw") {
						if (info.trigger) {
							for (let role in info.trigger) {
								if (info.trigger[role] == "phaseDrawBegin2" || (Array.isArray(info.trigger[role]) && info.trigger[role].includes("phaseDrawBegin2"))) {
									return true;
								}
							}
						}
						if (translation.indexOf("额定摸牌数") > -1) {
							return true;
						} else if (translation.indexOf("摸牌阶段") > -1) {
							if (translation.indexOf("放弃摸牌") > -1) {
								return false;
							}
							return true;
						}
					} else if (key == "shaUsable") {
						if (translation.indexOf("杀") == -1) {
							return false;
						}
						{
							if (translation.indexOf("的次数上限") > -1) {
								return true;
							} else if (translation.indexOf("的使用次数上限") > -1) {
								return true;
							} else if (translation.indexOf("且次数上限") > -1) {
								return true;
							}
						}
					} else if (key == "maxHp") {
						return translation.indexOf("体力上限") > -1;
					} else if (key == "attack") {
						return translation.indexOf("攻击范围") > -1;
					} else if (key == "recover") {
						if (get.info("jlsg_qixian").getInclusion(translation, "recover")) {
							return true;
						}
						return translation.indexOf("回复") > -1;
					} else if (key == "damage") {
						if (get.info("jlsg_qixian").getInclusion(translation, "damage")) {
							return true;
						}
						return translation.indexOf("伤害") > -1;
					} else if (key == "nodamage") {
						if (get.info("jlsg_qixian").getInclusion(translation, "nodamage")) {
							return true;
						}
						return translation.indexOf("伤害") == -1;
					}
					return false;
				};
			const list = get
				.gainableSkills((info, skill) => !info.charlotte && skill in lib.translate)
				.reduce((list, skill) => {
					const info = get.info(skill),
						translation = get.skillInfoTranslation(skill);
					for (let key of keyList) {
						if (check(key, info, translation)) {
							list[key] ??= [];
							list[key].add(skill);
						}
					}
					return list;
				}, {});
			delete this.getSkills;
			this.getSkills = list;
			return list;
		},
		getInclusion(str, tag) {
			const names = Object.keys(lib.card);
			for (const name of names) {
				let type = get.type2(name);
				if (!["basic", "trick"].includes(type)) {
					continue;
				}
				if (tag == "damage") {
					if (!get.tag({ name }, "damage")) {
						continue;
					}
				} else if (tag == "nodamage") {
					if (get.tag({ name }, "damage")) {
						continue;
					}
				} else if (tag == "recover") {
					if (!get.tag({ name }, "recover") && !get.tag({ name }, "save")) {
						continue;
					}
				}
				const reg = `【${get.translation(name)}】`;
				if (name == "sha") {
					if (str.includes(reg)) {
						return true;
					}
					for (let nature of lib.inpile_nature) {
						const reg1 = `【${get.translation(nature) + get.translation(name)}】`,
							reg2 = `${get.translation(nature)}【${get.translation(name)}】`;
						if (str.includes(reg1) || str.includes(reg2)) {
							return true;
						}
					}
				} else {
					if (!str.includes(reg)) {
						continue;
					}
					return true;
				}
			}
			return false;
		},
		group: "jlsg_qixian_start",
		subSkill: {
			backup: {},
			start: {
				audio: "jlsg_qixian",
				trigger: {
					player: "enterGame",
					global: "phaseBefore",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				async content(event, trigger, player) {
					let num = player.maxHp - 7;
					if (num > 0) {
						await player.loseMaxHp(num);
					} else if (num < 0) {
						await player.gainMaxHp(-num);
					}
					if (Object.keys(player.getStorage("jlsg_qixian", {})).length) {
						return;
					}
					const list = Array.from({ length: 7 }, (v, i) => Object.keys(get.info("jlsg_qixian").effects)[i]).randomSort();
					player.setStorage("jlsg_qixian", { count: 0, list }, true);
					player.addSkill("jlsg_qixian_effect");
				},
			},
			effect: {
				charlotte: true,
				onremove(player) {
					delete player.storage.jlsg_qixian;
				},
				mark: true,
				marktext: "弦",
				intro: {
					markcount(storage, player) {
						return player.getStorage("jlsg_qixian")?.count;
					},
					mark(dialog, content, player) {
						const storage = player.getStorage("jlsg_qixian");
						const { count, list } = storage;
						dialog.addText(`已发动弱音次数：${count} / 2`);
						let num = player.hp;
						while (num > 7) {
							num -= 7;
						}
						while (num < 1) {
							num += 7;
						}
						let str = list.join("");
						str = `${str.slice(0, num - 1)}<span class="yellowtext">${str.slice(num - 1, num)}</span>${str.slice(num)}`;
						dialog.addText(str);
					},
				},
				audio: "jlsg_qixian",
				trigger: { player: ["useCardAfter", "changeHp"] },
				filter(event, player) {
					if (!player.getStorage("jlsg_qixian", {})?.list?.length) {
						return false;
					}
					if (event.name == "useCard") {
						if (player.isDying()) {
							return false;
						} else if (typeof event.card.number != "number" || event.card.number < 1) {
							return false;
						} else if (!["red", "black"].includes(get.color(event.card, false))) {
							return false;
						} else if (
							!player.hasHistory("lose", function (evt) {
								const evtx = evt.relatedEvent || evt.getParent();
								return evt.hs.length > 0 && evtx == event;
							})
						) {
							return false;
						}
					}
					return true;
				},
				async cost(event, trigger, player) {
					const storage = player.getStorage("jlsg_qixian");
					let num = player.hp,
						direction = "red",
						volume = storage.count >= 2 ? "forte" : "piano",
						result;
					if (trigger.name == "useCard") {
						num = player.hp + (get.color(trigger.card) == "red" ? trigger.card.number : -trigger.card.number);
						direction = get.color(trigger.card, false);
					} else {
						if (trigger.jlsg_qixian_direction) {
							direction = trigger.jlsg_qixian_direction;
						} else {
							direction = trigger.num > 0 ? "red" : "black";
						}
					}
					while (num < 1) {
						num += 7;
					}
					while (num > 7) {
						num -= 7;
					}
					let type = storage.list[num - 1],
						translate = {
							direction: {
								red: "正弦",
								black: "逆弦",
							},
							volume: {
								piano: "弱音",
								forte: "强音",
							},
						};
					const info = { ...get.info("jlsg_qixian").effects[type][direction][volume] };
					let { str, key, prompt } = info;
					if (typeof key == "function") {
						key = key(player);
					}
					if (!prompt) {
						prompt = str;
					} else if (typeof prompt == "function") {
						prompt = prompt(key, player);
					}
					let str2 = `<span class="yellowtext">${type}</span>的<span class="yellowtext">${translate.direction[direction]}${translate.volume[volume]}</span>效果：`;
					if (trigger.name == "useCard") {
						result = await player
							.chooseBool(`###${get.prompt("jlsg_qixian")}###将你的体力值从${player.hp}变为${num}<br>（触发${str2}<span class="yellowtext">${trigger.name == "useCard" ? str : get.plainText(prompt)}</span>）`)
							.set("ai", (event, player) => {
								const { type, volume } = get.event();
								if (type == "羽" && volume == "piano") {
									return false;
								}
								return true;
							})
							.set("type", type)
							.set("volume", volume)
							.forResult();
					} else {
						result = await player
							.chooseTarget(`###${get.prompt("jlsg_qixian")}###选择一名角色执行${str2}<span class="yellowtext">${type == "羽" ? str : get.plainText(prompt)}</span>`)
							.set("ai", target => {
								const { volume, key, extraAi, player } = get.event();
								return extraAi(volume, key, player, target);
							})
							.set("volume", volume)
							.set("key", key)
							.set("extraAi", get.info("jlsg_qixian").effects[type][direction].ai)
							.forResult();
					}
					event.result = {
						bool: result.bool,
						targets: result.targets,
						cost_data: {
							num,
							type,
							direction,
							volume,
							str,
							prompt,
							key,
						},
					};
				},
				async content(event, trigger, player) {
					const { num, type, direction, volume, str, prompt, key } = event.cost_data;
					if (trigger.name == "useCard") {
						game.log(player, `体力值从${player.hp}调整为${Math.min(num, player.maxHp)}`);
						await player.changeHp(num - player.hp).set("jlsg_qixian_direction", direction);
					} else {
						const storage = player.getStorage("jlsg_qixian");
						if (storage.count >= 2) {
							storage.count -= 2;
						} else {
							storage.count++;
						}
						player.setStorage("jlsg_qixian", storage, true);
						const { content } = get.info("jlsg_qixian").effects[type][direction],
							translate = {
								direction: {
									red: "正弦",
									black: "逆弦",
								},
								volume: {
									piano: "弱音",
									forte: "强音",
								},
							};
						game.log(player, "对", event.targets[0], "执行", `#y${type}`, "的", `#y${translate.direction[direction]}${translate.volume[volume]}`, "效果：", `#y${type == "羽" ? str : get.plainText(prompt)}`);
						const next = game.createEvent("jlsg_qixian_effect2", false);
						next.player = player;
						next.target = event.targets[0];
						next.jlsg_qixian_type = type;
						next.jlsg_qixian_direction = direction;
						next.jlsg_qixian_volume = volume;
						next.key = key;
						next.setContent(content);
						await next;
					}
				},
			},
			buff: {
				charlotte: true,
				init(player, skill) {
					player.setStorage(skill, { maxHandcard: 0, draw: 0, shaUsable: 0, attack: 0 }, true);
				},
				onremove: true,
				mark: true,
				marktext: "↑",
				intro: {
					name: "七弦",
					noucount: true,
					mark(dialog, storage, player) {
						const translate = {
							maxHandcard: "手牌上限",
							draw: "额定摸牌数",
							shaUsable: "使用【杀】的次数上限",
							attack: "攻击范围",
						};
						for (let i in translate) {
							if (storage[i] > 0) {
								dialog.addText(`${translate[i]}：+${storage[i]}`);
							}
						}
					},
				},
				mod: {
					maxHandcard(player, num) {
						return num + player.getStorage("jlsg_qixian_buff", {}).maxHandcard;
					},
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.getStorage("jlsg_qixian_buff", {}).shaUsable;
						}
					},
					attackRange(player, num) {
						return num + player.getStorage("jlsg_qixian_buff", {}).attack;
					},
				},
				trigger: {
					player: ["phaseDrawBegin2", "useCard1"],
				},
				filter(event, player) {
					if (event.name == "phaseDraw") {
						return !event.numFixed;
					}
					if (event.addCount === false) {
						return false;
					}
					return player.hasHistory("lose", evt => {
						const evtx = evt.relatedEvent || evt.getParent();
						return evtx == event && Object.values(evt.gaintag_map).flat().includes("jlsg_qixian");
					});
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					if (trigger.name == "phaseDraw") {
						trigger.num += player.getStorage(event.name, {}).draw;
					} else {
						trigger.addCount = false;
						const stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] === "number") {
							stat[name]--;
						}
					}
				},
			},
			debuff: {
				charlotte: true,
				init(player, skill) {
					player.setStorage(skill, { filterDamage: 0 }, true);
				},
				onremove: true,
				mark: true,
				marktext: "↓",
				intro: {
					name: "七弦",
					noucount: true,
					mark(dialog, storage, player) {
						const translate = {
							filterDamage: "下次造成伤害",
						};
						for (let i in translate) {
							if (storage[i] > 0) {
								dialog.addText(`${translate[i]}：-${storage[i]}`);
							}
						}
					},
				},
				trigger: {
					source: "damageBegin1",
				},
				filter(event, player) {
					return player.getStorage("jlsg_qixian_debuff", {}).filterDamage > 0;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.num -= player.getStorage("jlsg_qixian_debuff", {}).filterDamage;
					player.removeSkill(event.name);
				},
			},
		},
	},
};

export default skills;
