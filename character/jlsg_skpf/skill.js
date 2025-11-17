import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	jlsg_jdjg_jieyin: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countDiscardableCards(player, "he");
		},
		position: "he",
		filterCard: lib.filter.cardDiscardable,
		check(card) {
			const player = get.player();
			if (get.position(card) == "e") {
				let subtype = get.subtype(card);
				if (player.countDiscardableCards(player, "h", { subtype: subtype })) {
					return 20 - get.value(card);
				}
				return 10 - get.value(card);
			} else {
				if (player.countDiscardableCards(player, "e") || player.countDiscardableCards(player, "h", { type: "equip" })) {
					return 0;
				}
			}
			return 8 - get.value(card);
		},
		filterTarget: lib.filter.notMe,
		delay: false,
		async content(event, trigger, player) {
			const targets = event.targets.concat([player]).sortBySeat();
			const draw = targets.filter(target => target.isHealthy()),
				recover = targets.filter(target => target.isDamaged());
			if (draw.length) {
				for (let target of draw) {
					await target.draw(2);
				}
			}
			if (recover.length) {
				for (let target of recover) {
					await target.recover(1);
				}
			}
			if (!draw.length) {
				delete player.getStat("skill").jlsg_jdjg_jieyin;
			}
		},
		ai: {
			order: 3,
			threaten: 1,
			ai: {
				player: 1,
				target: 1,
			},
		},
	},
	jlsg_jdjg_xiaoji: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		getIndex(event, player) {
			return event?.getl(player)?.es || [];
		},
		filter(event, player, triggername, card) {
			return card;
		},
		async cost(event, trigger, player) {
			let str = ["摸一张牌"];
			switch (get.subtype(event.indexedData)) {
				case "equip1":
					str.push("然后可以对一名其他角色造成1点伤害");
					break;
				case "equip2":
				case "equip5":
					str.push("然后摸两张牌");
					break;
				case "equip3":
				case "equip4":
					str.push("然后弃置任意名其他角色至多共计两张牌");
					break;
				default:
					break;
			}
			str = str.length == 1 ? str[0] : str.join("，");
			event.result = await player
				.chooseBool(`###${get.prompt("jlsg_jdjg_xiaoji")}###${str}`)
				.set("ai", (event, player) => get.effect(player, { name: "draw" }, player, player) > 0)
				.forResult();
			if (event.result?.bool) {
				event.result.cost_data = { subtype: get.subtype(event.indexedData) };
			}
		},
		async content(event, trigger, player) {
			const {
				cost_data: { subtype },
			} = event;
			await player.draw(1);
			switch (subtype) {
				case "equip1": {
					const { result } = await player
						.chooseTarget("是否对一名其他角色造成1点伤害")
						.set("filterTarget", lib.filter.notMe)
						.set("ai", target => get.damageEffect(target, get.player(), get.player()));
					if (result?.bool) {
						await result.targets[0].damage(1, player);
					}
					break;
				}
				case "equip2":
				case "equip5": {
					const { result } = await player.chooseBool("是否摸两张牌").set("ai", (event, player) => get.effect(player, { name: "draw" }, player, player) > 0);
					if (result?.bool) {
						await player.draw(2);
					}
					break;
				}
				case "equip3":
				case "equip4": {
					const { result: chooseTarget1 } = await player
						.chooseTarget("是否弃置一名其他角色一张牌")
						.set("filterTarget", (_, player, target) => {
							return target != player && target.countDiscardableCards(player, "he");
						})
						.set("ai", target => get.effect(target, { name: "guohe_copy2" }, get.player(), get.player()));
					if (chooseTarget1?.bool) {
						const { result: discardPlayerCard1 } = await player.discardPlayerCard(chooseTarget1.targets[0], "he", 1);
						if (discardPlayerCard1.bool) {
							const { result: chooseTarget2 } = await player
								.chooseTarget("是否弃置一名其他角色一张牌")
								.set("filterTarget", (_, player, target) => {
									return target != player && target.countDiscardableCards(player, "he");
								})
								.set("ai", target => get.effect(target, { name: "guohe_copy2" }, get.player(), get.player()));
							if (chooseTarget2?.bool) {
								await player.discardPlayerCard(chooseTarget2.targets[0], "he", 1);
							}
						}
					}
					break;
				}
				default:
					break;
			}
		},
		ai: {
			noe: true,
			reverseEquip: true,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == "equip" && !get.cardtag(card, "gifts")) {
						return [1, 3];
					}
				},
			},
		},
	},
	jlsg_syqj_wusheng: {
		audio: "ext:极略/audio/skill:2",
		enable: ["chooseToRespond", "chooseToUse"],
		viewAs: { name: "sha" },
		viewAsFilter(player) {
			return player.countCards("hes", { color: "red" }) != 0;
		},
		position: "hes",
		filterCard(card, player) {
			return get.color(card) == "red";
		},
		prompt: "将一张红色牌当杀使用或打出",
		check(card) {
			let val = get.value(card);
			if (get.event("name") == "chooseToRespond") {
				return 1 / Math.max(0.1, val);
			}
			return 7 - val;
		},
		group: "jlsg_syqj_wusheng_useCard",
		subSkill: {
			useCard: {
				sourceSkill: "jlsg_syqj_wusheng",
				audio: "jlsg_syqj_wusheng",
				trigger: { player: "useCardToPlayered" },
				filter(event, player) {
					return event.card?.name == "sha" && event.skill === "jlsg_syqj_wusheng" && event.isFirstTarget;
				},
				direct: true,
				async content(event, trigger, player) {
					await player.draw(1);
					const { result } = await player
						.chooseToDiscard(`###${get.prompt(event.name, trigger.targets)}###弃置一~三张手牌，然后目标弃置等量的牌`, [1, 3])
						.set("complexCard", true)
						.set("ai", card => 9 - get.value(card) - (get.color(card) == "red" ? 1 : 0) - 2 * ui.selected.cards.length + Math.random());
					if (!result?.bool) {
						return;
					}
					const num = result.cards.length;
					for (let target of trigger.targets.sortBySeat()) {
						if (target.countDiscardableCards(target, "he")) {
							await target.chooseToDiscard("he", true, num);
						}
					}
					trigger.getParent().baseDamage += num;
					if (player.isPhaseUsing(true)) {
						player.addTempSkill("jlsg_syqj_wusheng_buff", ["phaseChange", "phaseUseAfter"]);
						player.addMark("jlsg_syqj_wusheng_buff", num, false);
					}
				},
			},
			buff: {
				onremove(player) {
					player.clearMark("jlsg_syqj_wusheng_buff", false);
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.countMark("jlsg_syqj_wusheng_buff");
						}
					},
				},
			},
		},
		ai: {
			respondSha: true,
			skillTagFilter(player) {
				if (!player.countCards("hes", { color: "red" })) {
					return false;
				}
			},
		},
	},
	jlsg_sslh_luoshen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		frequent: true,
		async content(event, trigger, player) {
			event.cards ??= [];
			while (true) {
				const judgeEvent = player
					.judge(card => {
						var evt = get.event().getParent("jlsg_sslh_luoshen");
						if (!evt) {
							return 0;
						}
						if (evt.cards.some(c => get.number(c) == get.number(card))) {
							return -1.5;
						}
						return 1.5;
					})
					.set("judge2", result => result.bool);
				if (get.mode() != "guozhan" && !player.hasSkillTag("rejudge")) {
					judgeEvent.set("callback", async (event, trigger, player) => {
						if (get.position(event.card, true) == "o") {
							await player.gain(event.card, "gain2");
						}
					});
				} else {
					judgeEvent.set("callback", async (event, trigger, player) => {
						event.getParent().orderingCards.remove(card);
					});
				}
				let { result } = await judgeEvent;
				event.cards.push(result.card);
				if (result?.bool && result?.card) {
					let { result } = await player.chooseBool("是否再次发动【洛神】？").set("frequentSkill", "jlsg_sslh_luoshen");
					if (!result?.bool) {
						break;
					}
				} else {
					let number = get.number(event.cards[event.cards.length - 1]);
					if (number) {
						player.addTempSkill("jlsg_sslh_luoshen_hand");
						player.setStorage("jlsg_sslh_luoshen_hand", number);
					}
					break;
				}
				if (event.cards.someInD("od")) {
					await player.gain(event.cards.filterInD("od"), "gain2");
				}
			}
		},
		subSkill: {
			hand: {
				charlotte: true,
				onremove: true,
				mod: {
					maxHandcard(player, num) {
						return num + player.storage.jlsg_sslh_luoshen_hand;
					},
				},
			},
		},
	},
	jlsg_sslh_qingguo: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) != "shan" && get.color(card) != "black") {
					return;
				}
				let cards = player.getCards("hs", function (card) {
					return get.name(card) == "shan" || get.color(card) == "black";
				});
				cards.sort(function (a, b) {
					return (get.name(b) == "shan" ? 1 : 2) - (get.name(a) == "shan" ? 1 : 2);
				});
				let geti = function () {
					if (cards.includes(card)) {
						return cards.indexOf(card);
					}
					return cards.length;
				};
				if (get.name(card) == "shan") {
					return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
				}
				return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
			},
			aiUseful(player, card, num) {
				return lib.skill.jlsg_sslh_qingguo.mod.aiValue.apply(this, arguments);
			},
		},
		locked: false,
		trigger: { target: "useCardToTargeted" },
		filter(event, player) {
			return event.player != player && event.card && (event.card.name == "sha" || get.type(event.card) == "trick") && player.getCards("h").some(card => get.color(card) == "black");
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard(get.prompt2("jlsg_sslh_qingguo"))
				.set("ai", card => {
					const player = get.player(),
						target = get.event("target"),
						cardx = get.event("cardx");
					let eff = 2.5 * get.effect(player, cardx, target, player);
					let eff2 = 0;
					if (get.suit(card) == "spade") {
						eff2 = (jlsg.getLoseHpEffect(target) * get.attitude(player, target)) / 6;
					}
					return eff + eff2 - get.value(card);
				})
				.set("filterCard", card => get.color(card) == "black")
				.set("position", "h")
				.set("cardx", trigger.card)
				.set("target", trigger.player)
				.set("chooseonly", true)
				.forResult();
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			trigger.getParent().excluded.add(player);
			if (get.suit(event.cards[0]) != "spade") {
				return;
			}
			const { result } = await player.chooseBool(`是否令${get.translation(trigger.player)}失去1点体力？`).set("ai", (event, player) => {
				const trigger = event.getTrigger();
				return get.effect(trigger.player, { name: "losehp" }, player, player) > 0;
			});
			if (result.bool) {
				trigger.player.loseHp();
				if (trigger.player.ai.shown > player.ai.shown) {
					player.addExpose(0.3);
				}
			}
		},
	},
	jlsg_spwq_wushuang: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			cardUsable(card, player, num) {
				if (_status.event.skill == "jlsg_spwq_wushuang") {
					return Infinity;
				}
				if (card && card.storage?.jlsg_spwq_wushuang) {
					return Infinity;
				}
			},
			targetInRange: function () {
				if (_status.event.skill == "jlsg_spwq_wushuang") {
					return true;
				}
			},
		},
		onChooseToUse(event) {
			if (game.online) {
				return;
			}
			let bool = true,
				num = event.player.getHistory("useCard", evt => {
					if (evt.skill != "jlsg_spwq_wushuang") {
						return false;
					}
					return evt.card.storage?.jlsg_spwq_wushuang_double;
				}).length,
				history = event.player.getHistory("useSkill", evt => {
					if (evt.skill != "jlsg_spwq_wushuang") {
						return false;
					}
					return !evt.targets;
				}).length;
			if (history > num) {
				bool = false;
			}
			event.set("jlsg_spwq_wushuang", bool);
		},
		enable: "chooseToUse",
		filter(event, player) {
			let check = event.jlsg_spwq_wushuang;
			if (!check) {
				return false;
			}
			if (!player.countCards("h")) {
				return false;
			}
			let vcard = get.autoViewAs({ name: "sha", isCard: true, storage: { jlsg_spwq_wushuang: true }, cards: [] }, []);
			return event.filterCard(vcard, player, event);
		},
		hiddenCard(name, player) {
			if (name == "sha") {
				return player.countCards("h");
			}
		},
		position: "h",
		filterCard: true,
		selectCard: -1,
		discard: false,
		lose: false,
		log: false,
		locked: false,
		prompt: "无双：是否弃置所有手牌并摸等量张牌，视为使用【杀】？",
		viewAsFilter: function (player) {
			if (!player.countCards("h")) {
				return false;
			}
			let num = player.getHistory("useCard", evt => {
					if (evt.skill != "jlsg_spwq_wushuang") {
						return false;
					}
					return evt.card.storage.jlsg_spwq_wushuang_double;
				}).length,
				history = player.getHistory("useSkill", evt => {
					if (evt.skill != "jlsg_spwq_wushuang") {
						return false;
					}
					return !evt.targets;
				});
			return history.length < num;
		},
		viewAs(cards, player) {
			return {
				name: "sha",
				isCard: true,
				storage: { jlsg_spwq_wushuang: true },
				cards: [],
			};
		},
		onuse(event, player) {
			let hs = player.getCards("h");
			player.logSkill("jlsg_spwq_wushuang");
			player.discard(hs);
			if (hs.some(i => get.subtype(i) == "equip1")) {
				event.card.storage.jlsg_spwq_wushuang_double = true;
			}
			if (player.isIn()) {
				player.draw(hs.length);
			}
		},
		group: ["jlsg_spwq_wushuang_useCardTo", "jlsg_spwq_wushuang_damage"],
		subSkill: {
			useCardTo: {
				trigger: { player: "useCardToPlayered" },
				filter(event, player, name) {
					const target = event.target;
					if (!target || !target.isIn() || event.getParent().excluded.includes(target)) {
						return false;
					}
					return event.card.name == "sha" && event.card.storage?.jlsg_spwq_wushuang;
				},
				async cost(event, trigger, player) {
					const target = trigger.target;
					if (!target.isIn()) {
						return;
					}
					event.result = {
						bool: true,
						targets: [target],
					};
					if (trigger.card.storage.jlsg_spwq_wushuang_double) {
						event.result.cost_data = { choice: [0, 1] };
					} else {
						const { result } = await player
							.chooseButton(true, [
								get.prompt("jlsg_spwq_wushuang", target),
								[
									[
										[0, `将${get.translation(target)}区域里所有牌于本回合内移出游戏`],
										[1, `令${get.translation(target)}所有技能本回合无效`],
									],
									"textbutton",
								],
							])
							.set("target", target)
							.set("ai", button => {
								const player = get.player(),
									target = get.event("target");
								if (get.attitude(player, target) < 1) {
									const sha = get.autoViewAs({ name: "sha", isCard: true }, []);
									if (get.effect(target, sha, player, target) > target.countCards("hej")) {
										return button.link == 1;
									} else {
										return button.link == 0;
									}
								} else {
									return 1;
								}
							});
						if (result.bool && result.links) {
							event.result.cost_data = { choice: result.links };
						}
					}
				},
				async content(event, trigger, player) {
					if (!trigger.parent.jlsg_spwq_wushuang_damage) {
						trigger.parent.jlsg_spwq_wushuang_damage = true;
						trigger.parent.baseDamage *= 2;
						trigger.parent.extraDamage *= 2;
					}
					const target = trigger.target,
						{ choice } = event.cost_data;
					if (choice.includes(0) && target.countCards("hej")) {
						target.addTempSkill("jlsg_spwq_wushuang_lose");
						await target.addToExpansion("log", "giveAuto", target.getCards("hej"), target).set("gaintag", ["jlsg_spwq_wushuang"]);
					}
					if (choice.includes(1)) {
						target.addTempSkill("baiban");
					}
				},
			},
			lose: {
				forced: true,
				popup: false,
				charlotte: true,
				onremove: function (player) {
					let cards = player.getExpansions("jlsg_spwq_wushuang");
					if (cards.length) {
						player.gain(cards, "draw");
						game.log(player, "收回了" + get.cnNumber(cards.length) + "张“无双”牌");
					}
				},
				mark: true,
				intro: {
					markcount: "expansion",
					mark: function (dialog, storage, player) {
						var cards = player.getExpansions("jlsg_spwq_wushuang");
						if (player.isUnderControl() || player == game.me) {
							dialog.addAuto(cards);
						} else {
							return "共有" + get.cnNumber(cards.length) + "张牌";
						}
					},
				},
			},
		},
		ai: {
			respondSha: true,
			skillTagFilter: function (player) {
				return !!lib.skill.jlsg_spwq_wushuang.viewAsFilter(player);
			},
			order: function (item, player) {
				return get.order({ name: "sha" }, player) - 0.1;
			},
			result: {
				target: function (player, target) {
					if (!target) {
						return;
					}
					var cards = player.getCards("h").slice(0);
					var names = [];
					for (var i of cards) {
						names.add(i.name);
					}
					if (names.length < player.hp) {
						return 0;
					}
					if (player.hasUnknown() && (player.identity != "fan" || !target.isZhu)) {
						return 0;
					}
					if (get.attitude(player, target) >= 0) {
						return -20;
					}
					return lib.card.sha.ai.result.target.apply(this, arguments);
				},
			},
			basic: {
				useful: [5, 3, 1],
				value: [5, 3, 1],
			},
			tag: {
				respond: 1,
				respondShan: 1,
				damage: function (card) {
					if (game.hasNature(card, "poison")) {
						return;
					}
					return 2;
				},
				natureDamage: function (card) {
					if (game.hasNature(card, "linked")) {
						return 2;
					}
				},
				fireDamage: function (card, nature) {
					if (game.hasNature(card, "fire")) {
						return 2;
					}
				},
				thunderDamage: function (card, nature) {
					if (game.hasNature(card, "thunder")) {
						return 2;
					}
				},
				poisonDamage: function (card, nature) {
					if (game.hasNature(card, "poison")) {
						return 2;
					}
				},
			},
		},
	},
	jlsg_smdq_lijian: {
		audio: "ext:极略/audio/skill:2",
		enable: ["phaseUse", "chooseToRespond"],
		filter(event, player) {
			let juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
			if (event.type == "phase") {
				if (player.hasSkill("jlsg_smdq_lijian_used")) {
					return false;
				}
				return game.hasPlayer(cur => cur.hasUseTarget(juedou));
			} else if (event.getParent().name == "juedou") {
				if (
					!player.countCards("h", card => {
						const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
						return mod2 !== false;
					})
				) {
					return false;
				}
				return event.filterCard(get.autoViewAs({ name: "sha", isCard: false }, "unsure"), player, event);
			}
			return false;
		},
		complexCard: true,
		selectCard() {
			if (_status.event.type == "phase") {
				return [0, 0];
			}
			return [1, 1];
		},
		filterCard(card, player, event) {
			const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
			return mod2 !== false;
		},
		discard: false,
		targetprompt: ["先决斗", "后决斗"],
		selectTarget() {
			if (_status.event.type == "phase") {
				return [2, 2];
			}
			return [0, 0];
		},
		filterTarget(card, player, target) {
			let juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
			if (!ui.selected.targets.length) {
				return target.hasUseTarget(juedou);
			}
			return target.canUse(juedou, ui.selected.targets[0]);
		},
		multitarget: true,
		check(card) {
			return 10 - get.value(card);
		},
		prompt() {
			const event = _status.event;
			if (event.type == "phase") {
				return "离间：出牌阶段限一次，你可以令两名角色依次对对方使用决斗（不能被【无懈可击】响应），直到其中一名角色进入濒死或以此法没有造成伤害";
			}
			return "离间：将任意手牌当【杀】打出响应【决斗】";
		},
		async content(event, trigger, player) {
			const evt = event.getParent(2);
			if (evt.type == "phase") {
				player.addTempSkill("jlsg_smdq_lijian_used", "phaseUseAfter");
				let turn = event.targets[0],
					other = event.targets[1];
				const card = get.autoViewAs({ name: "juedou", isCard: true, storage: { jlsg_smdq_lijian: true } }, []);
				player.setStorage("jlsg_smdq_lijian_dying", true);
				player
					.when({ global: "dying" })
					.filter(evt => event.targets.includes(evt.player))
					.then(() => player.setStorage("jlsg_smdq_lijian_dying", undefined));
				while (turn.isIn() && other.isIn()) {
					const next = turn.useCard(other, card, "nowuxie");
					await next;
					let source =
						other.hasHistory("sourceDamage", evt => {
							return evt.getParent("useCard") == next;
						}) ||
						turn.hasHistory("sourceDamage", evt => {
							return evt.getParent("useCard") == next;
						});
					if (!source || !player.getStorage("jlsg_smdq_lijian_dying", false)) {
						break;
					}
					let storage = turn;
					turn = other;
					other = storage;
				}
				player.setStorage("jlsg_smdq_lijian_dying", undefined);
			} else {
				const card = get.autoViewAs({ name: "sha", isCard: false }, event.cards);
				delete evt.result.skill;
				delete evt.result.used;
				evt.result.card = card;
				evt.result.cards = event.cards;
				evt.redo();
			}
		},
		subSkill: {
			used: {
				charlotte: true,
				sub: true,
				sourceSkill: "jlsg_smdq_lijian",
			},
		},
		ai: {
			expose: 0.4,
			threaten: 4.8,
			order: 8,
			preSha: true,
			respondSha: true,
			skillTagFilter: function (player, tag, arg) {
				if (!player.countCards("h")) {
					return false;
				}
				if (arg == "use") {
					return false;
				}
				return true;
			},
			result: {
				target: function (player, target) {
					let card = get.autoViewAs({ name: "juedou", isCard: true, storage: { jlsg_smdq_lijian: true } }, []);
					if (!ui.selected.targets.length) {
						return Math.sign(get.attitude(player, target)) * (target.getUseValue(card) > 0 ? target.getUseValue(card) : -1);
					}
					return get.effect(target, card, ui.selected.targets[0], target);
				},
			},
		},
	},
	jlsg_smdq_biyue: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		check(event, player) {
			const targets = game.filterPlayer(cur => cur != player);
			let num = targets.reduce((n, t) => n + get.effect(t, { name: "shunshou_copy" }, player, player), 0);
			if (Array.from(ui.discardPile.childNodes).length) {
				num += 1;
			}
			if (_status.pileTop) {
				num += 1;
			}
			return num > 0;
		},
		async content(event, trigger, player) {
			const targets = game.filterPlayer(cur => cur != player),
				cards = [];
			let position = ["h", "e", "j"];
			for (let target of targets) {
				for (let i of position) {
					let cardx = { shown: [], hide: [] };
					if (target.countGainableCards(player, i)) {
						let card = target.getGainableCards(player, i).randomGet();
						if (i == "h") {
							cardx.hide.add(card);
						} else {
							cardx.shown.add(card);
						}
						cards.add(card);
					}
					if (cardx.shown.length) {
						target.$give(cardx.shown, player);
					}
					if (cardx.hide.length) {
						target.$giveAuto(cardx.hide, player);
					}
				}
			}
			if (_status.pileTop) {
				let card = Array.from(ui.cardPile.childNodes).randomGet();
				game.log(player, "从牌堆中获得了一张牌");
				player.$drawAuto([card], player);
				cards.add(card);
			}
			if (Array.from(ui.discardPile.childNodes).length) {
				let card = Array.from(ui.discardPile.childNodes).randomGet();
				game.log(player, "从弃牌堆中获得了一张牌");
				player.$drawAuto([card], player);
				cards.add(card);
			}
			if (!cards.length) {
				return;
			}
			await game
				.loseAsync({
					gain_list: [[player, cards]],
					cards: cards,
				})
				.setContent("gaincardMultiple");
			await game.delayx();
		},
	},
	jlsg_gygs_angyang: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (!["sha", "juedou"].includes(event.card.name)) {
				return false;
			}
			let giver;
			if (name == "useCardToPlayered") {
				if (event.targets.length != 1) {
					return false;
				}
				giver = event.target;
			} else {
				giver = event.player;
			}
			return giver.countGainableCards(player, "h");
		},
		async cost(event, trigger, player) {
			let giver;
			if (event.triggername == "useCardToPlayered") {
				giver = trigger.target;
			} else {
				giver = trigger.player;
			}
			let name = ["sha", "juedou"].filter(i => trigger.card.name != i)[0];
			const card = get.autoViewAs({ name }, []);
			event.result = await player
				.gainPlayerCard("h", giver)
				.set("prompt", get.prompt("jlsg_gygs_angyang", giver))
				.set("prompt2", lib.translate["jlsg_gygs_angyang_info"])
				.set("ai", () => {
					if (get.event("check")) {
						return get.event().getRand();
					}
					return false;
				})
				.set(
					"check",
					(function () {
						const gain = get.effect(giver, { name: "shunshou_copy2" }, player, player),
							use = get.effect(giver, card, player, player);
						if (giver.countGainableCards(player, "h") > 1) {
							return gain + use > 0;
						} else {
							return gain > 0;
						}
					})()
				)
				.set("logSkill", ["jlsg_gygs_angyang", giver])
				.set("chooseonly", true)
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [giver];
				event.result.cost_data = { card };
			}
		},
		popup: false,
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards,
				cost_data: { card },
			} = event;
			await player.gain(cards, target, "bySelf");
			player
				.when({ global: "useCardAfter" })
				.filter(evt => evt.card == trigger.card)
				.step(async (event, trigger, player) => {
					if (!target.countCards("h")) {
						return;
					}
					if (player.canUse(card, target, false)) {
						await player.useCard(card, target, false);
					}
				});
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (!["sha", "juedou"].includes(card.name)) {
						return;
					}
					if (player.countGainableCards(target, "h")) {
						return [1, 0.5, 1, -0.5];
					}
				},
				player(card, player, target) {
					if (!["sha", "juedou"].includes(card.name)) {
						return;
					}
					if (target.countGainableCards(player, "h")) {
						return [1, 0.5, 1, -0.5];
					}
				},
			},
		},
	},
	jlsg_gygs_weifeng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseZhunbeiBegin" },
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			return player.canCompare(event.player);
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const card = get.autoViewAs({ name: "sha" }, []),
				{ player: target } = trigger;
			const { result } = await player.chooseToCompare(target);
			if (result.winner == player) {
				await player.draw(2);
				if (player.canUse(card, target, false)) {
					await player.useCard(card, target, false);
				}
			} else {
				const bool = player
					.chooseBool(`威风：是否令${get.translation(target)}摸两张牌并视为对你使用一张【杀】？`)
					.set("ai", (event, player) => {
						const trigger = event.getTrigger();
						const target = trigger.player;
						const draw = get.effect(target, { name: "draw" }, player, player),
							sha = get.effect(player, get.autoViewAs({ name: "sha" }, []), target, player);
						return draw + sha > 0;
					})
					.forResultBool();
				if (bool) {
					await target.draw(2);
					if (target.canUse(card, player, false)) {
						await target.useCard(card, player, false);
					}
				}
			}
		},
	},
	jlsg_lffw_lingxin: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			ignoredHandcard(card, player) {
				if (card.hasGaintag("jlsg_lffw_lingxin")) {
					return true;
				}
			},
			cardDiscardable(card, player, name) {
				if (name == "phaseDiscard" && card.hasGaintag("jlsg_lffw_lingxin")) {
					return false;
				}
			},
			cardUsable(card, player, num) {
				if (card?.cards?.some(cardx => cardx.hasGaintag("jlsg_lffw_lingxin"))) {
					return Infinity;
				}
			},
		},
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			return get.type2(event.card) == "trick";
		},
		locked: false,
		frequent: true,
		prompt: "是否发动【灵心】？",
		prompt2: "摸一张牌并从牌堆中获得一张基本牌，以此法获得的基本牌不计入手牌上限，且无次使用数限制",
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) > 0;
		},
		async content(event, trigger, player) {
			await player.draw(1);
			const card = get.cardPile2(card => get.type(card) == "basic");
			if (card) {
				const next = player.gain(card, "draw");
				next.gaintag.add("jlsg_lffw_lingxin");
				await next;
			}
		},
		ai: {
			threaten: 1.4,
			noautowuxie: true,
		},
	},
	jlsg_lffw_jiqiao: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			targetInRange(card, player, target, now) {
				if (get.type2(card) == "trick") {
					return true;
				}
			},
		},
		trigger: {
			player: ["useCard2", "phaseDrawBegin2"],
		},
		filter(event, player) {
			if (event.name != "useCard") {
				return !event.numFixed;
			}
			return get.type2(event.card) == "trick";
		},
		forced: true,
		async content(event, trigger, player) {
			if (trigger.name == "useCard") {
				trigger.directHit.addArray(game.filterPlayer(current => current != player));
			} else {
				const cards = Array.from(ui.cardPile.childNodes)
					.filter(card => get.type(card) == "trick")
					.reduce((cards, card) => {
						if (!cards.some(i => i.name == card.name)) {
							cards.add(card);
						}
						return cards;
					}, []);
				if (cards.length) {
					await player.gain(cards, "draw2", "log");
				}
			}
		},
	},
	jlsg_shhs_tiandu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseZhunbeiBegin", "judgeEnd"] },
		filter(event, player) {
			if (event.name == "judge") {
				return get.position(event.result.card, true) == "o";
			}
			return true;
		},
		prompt: () => get.prompt("jlsg_shhs_tiandu"),
		prompt2: "你可以随机摸一至三张牌",
		frequent: "check",
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) > 0;
		},
		async content(event, trigger, player) {
			event.num = Math.floor(Math.random() * 3 + 1);
			await player.draw(event.num);
		},
		group: "jlsg_shhs_tiandu_shandian",
		subSkill: {
			shandian: {
				audio: "jlsg_shhs_tiandu",
				trigger: { global: ["gainAfter", "loseAsyncAfter"] },
				getIndex(event, player) {
					if (typeof event.getg != "function") {
						return [];
					}
					return game.filterPlayer(current => event.getg(current)?.length).sortBySeat();
				},
				filter(event, player, triggername, target) {
					return event.getg(target).length >= 3;
				},
				prompt: (event, player, triggername, target) => get.prompt("jlsg_shhs_tiandu", target),
				prompt2: "令其进行【闪电】判定",
				check(event, player, triggername, target) {
					let damageEffect = get.damageEffect(target, undefined, player, "thunder"),
						att = get.attitude(player, target);
					if (_status.pileTop?.isKnownBy(player)) {
						let result = {
							card: _status.pileTop,
							name: _status.pileTop.name,
							number: get.number(_status.pileTop),
							suit: get.suit(_status.pileTop),
							color: get.color(_status.pileTop),
						};
						if (lib.card.shandian.judge(_status.pileTop) < 0) {
							result.bool = false;
						} else if (lib.card.shandian.judge(_status.pileTop) > 0) {
							result.bool = true;
						} else {
							result.bool = null;
						}
						_status.event.cardname = "shandian";
						game.checkMod(target, result, "judge", target);
						delete _status.event.cardname;
						if (result.bool && damageEffect >= 0) {
							if (att > 0) {
								return true;
							}
							return damageEffect >= 0;
						}
						if (att < 0) {
							return true;
						}
					}
					if (att < 0) {
						if (
							player.getHistory("useSkill", evt => {
								if (!evt.skill.startsWith("jlsg_shhs_tiandu_shandian")) {
									return false;
								}
								return evt.targets?.includes(target);
							}).length > 3
						) {
							return false;
						}
						return true;
					}
					return false;
				},
				logTarget: (event, player, triggername, target) => target,
				async content(event, trigger, player) {
					await event.targets[0].executeDelayCardEffect("shandian");
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.type(card) == "delay") {
								return [1, 1];
							}
						},
					},
				},
			},
		},
	},
	jlsg_shhs_yiji: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseJieshuBegin", "damageEnd"] },
		getIndex(event, player) {
			if (event.name == "phaseJieshu") {
				return 1;
			}
			return event.num;
		},
		filter(event, player, triggername, num) {
			return num;
		},
		async cost(event, trigger, player) {
			const cardPileLength = ui.cardPile.childElementCount,
				targets = game.filterPlayer(current => current.countCards("h") && current.isMaxHandcard());
			const list = ["牌堆", "角色"];
			if (!cardPileLength) {
				list.remove("牌堆");
			}
			if (!targets.length) {
				list.remove("角色");
			}
			if (!list.length) {
				return;
			}
			const control = await player
				.chooseControl(list, "cancel2")
				.set("prompt", get.prompt("jlsg_shhs_yiji"))
				.set("prompt2", "你可以观看牌堆顶的四张牌或手牌最多角色的手牌，然后可以将其中至多三张牌交给一名角色。")
				.set("ai", () => get.event("choice"))
				.set(
					"choice",
					(function () {
						let roleEff = targets.map(target => target.countCards("h"))[0] || 0,
							cardPileEff = 0;
						if (list.includes("角色")) {
							if (targets.every(target => get.attitude(player, target) > 1)) {
								roleEff = 0;
							}
						}
						if (list.includes("牌堆")) {
							cardPileEff = Math.min(4, cardPileLength);
						}
						return cardPileEff > roleEff ? "牌堆" : "角色";
					})()
				)
				.forResultControl();
			event.result = {
				bool: control != "cancel2",
				cost_data: { control },
			};
			if (control == "角色") {
				const targets = await player
					.chooseTarget("遗计：请选择要观看手牌的角色", true)
					.set("filterTarget", (_, player, target) => target.countCards("h") && target.isMaxHandcard())
					.set("ai", target => -get.attitude(get.player(), target))
					.forResultTargets();
				if (!targets?.length) {
					return;
				}
				event.result.targets = targets;
			}
		},
		async content(event, trigger, player) {
			const { control } = event.cost_data;
			const preTarget = event.targets?.[0];
			if (control == "牌堆") {
				const cards = get.cards(4, true);
				if (!cards?.length) {
					return;
				}
				await player.viewCards("牌堆顶的牌", cards);
				event.cards = await player
					.chooseButton(["遗计", "请选择要分配的牌", cards], [1, 3])
					.set("ai", ({ link }) => get.value(link, get.player()))
					.forResultLinks();
			} else {
				if (preTarget != player) {
					await player.viewHandcards(preTarget);
					event.cards = await player
						.choosePlayerCard(preTarget, "h", [1, 3], "visible")
						.set("ai", ({ link }) => {
							const { player, target } = get.event();
							if (get.attitude(player, target) > 0) {
								return 8 - get.value(link, target);
							}
							return get.value(link, target);
						})
						.forResultLinks();
				} else {
					event.cards = await player
						.chooseCard("h", [1, 3])
						.set(
							"hasFriend",
							game.hasPlayer(current => current != player && get.attitude(player, current) > 1)
						)
						.set("ai", card => {
							const { player, hasFriend } = get.event();
							if (hasFriend) {
								return 8 - get.value(card, player);
							}
							return 5 - get.value(card, player);
						})
						.forResultCards();
				}
			}
			if (!event.cards?.length) {
				return;
			}
			const target = (
				await player
					.chooseTarget()
					.set("createDialog", ["###遗计###请选择要获得牌的角色", event.cards])
					.set("filterTarget", (_, player, target) => target != get.event().preTarget)
					.set("ai", target => {
						const { cards, player } = get.event();
						return get.value(cards, target) * get.sgnAttitude(player, target) * (10 - target.countCards("h"));
					})
					.set("cards", event.cards)
					.set("preTarget", preTarget)
					.forResultTargets()
			)?.[0];
			if (target) {
				if (preTarget) {
					await target.gain(preTarget, event.cards, "giveAuto", "log");
				} else {
					await game.cardsGotoOrdering(event.cards);
					await target.gain(event.cards, "draw2", "log");
					game.updateRoundNumber();
				}
			}
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
	},
	jlsg_lhsh_dade: {
		audio: "ext:极略/audio/skill:3",
		enable: "phaseUse",
		filter(event, player) {
			if (player.getStorage("jlsg_lhsh_dade_mark", false)) {
				return player.countCards("he");
			}
			return true;
		},
		selectCard() {
			const player = get.player();
			return player.getStorage("jlsg_lhsh_dade_mark", false) ? [1, 1] : [0, 0];
		},
		filterCard(card, player) {
			return player.getStorage("jlsg_lhsh_dade_mark", false) ? true : false;
		},
		check(card) {
			const player = get.owner(card);
			let useValue = player.getUseValue(card, false, false);
			if (player.hp == player.maxHp || player.countCards("h") <= 1) {
				const players = game.filterPlayer();
				for (let i = 0; i < players.length; i++) {
					if (players[i].hasSkill("haoshi") && !players[i].isTurnedOver() && !players[i].hasJudge("lebu") && get.attitude(player, players[i]) >= 3 && get.attitude(players[i], player) >= 3) {
						return 11 - get.value(card) + useValue;
					}
				}
				if (player.countCards("h") > player.hp) {
					return 10 - get.value(card) + useValue;
				}
				if (player.countCards("h") > 2) {
					return 6 - get.value(card) + useValue;
				}
				return -1;
			}
			return 10 - get.value(card) + useValue;
		},
		selectTarget: [1, 1],
		filterTarget(card, player, target) {
			if (player.getStorage("jlsg_lhsh_dade_mark", false)) {
				return target != player;
			}
			return true;
		},
		prompt(event) {
			event = event || get.event();
			const player = event.player;
			if (player.countSkill("jlsg_lhsh_dade") < 2) {
				return "你可以令一名角色从你拥有的蜀势力武将中发现一个技能，然后你回复1点体力";
			} else if (!player.getStorage("jlsg_lhsh_dade_mark", false)) {
				return "你可以令一名角色展示并获得牌堆顶牌，然后你可以视为使用此牌（无距离和次数限制）";
			}
			return "你可以将一张手牌交给其他角色，然后你可以视为使用此牌（无距离和次数限制）";
		},
		lose: false,
		discard: false,
		async content(event, _, player) {
			const func = get.info(event.name).func;
			if (player.getStorage("jlsg_lhsh_dade_mark", false)) {
				await func[2](event, null, player);
			} else {
				const num = player.countSkill("jlsg_lhsh_dade");
				if (num <= 2) {
					await func[0](event, null, player);
				} else if (!player.getStorage("jlsg_lhsh_dade_mark", false)) {
					await func[1](event, null, player);
				}
			}
		},
		get characterInfo() {
			const result = game
				.initCharacterList(true)
				.filter(name => get.character(name, 1) == "shu")
				.reduce((list, name) => {
					const skills = get.character(name).skills;
					if (!skills.length) {
						return list;
					}
					list[name] = skills;
					return list;
				}, {});
			delete this.characterInfo;
			this.characterInfo = result;
			return result;
		},
		func: [
			async function (event, _, player) {
				const {
						targets: [target],
					} = event,
					map = {},
					characterInfo = get.info(event.name).characterInfo;
				const characterList = Object.keys(characterInfo).randomSort();
				for (let name of characterList) {
					const skills = characterInfo[name].filter(skill => {
						if (lib.filter.skillDisabled(skill)) {
							return false;
						}
						if (target.hasSkill(skill, null, false, false)) {
							return false;
						}
						const info = get.info(skill);
						if (info?.groupSkill && target.group != info.groupSkill) {
							return false;
						} else if (info?.ai?.combo && !target.hasSkill(info?.ai?.combo, null, false, false)) {
							return false;
						}
						return !info.zhuSkill || target.isZhu2();
					});
					if (skills.length) {
						map[name] = skills.randomGet();
					}
					if (Object.values(map).length >= 3) {
						break;
					}
				}
				const info = Object.entries(map).map(i => i.reverse());
				if (info.length) {
					const { result } = await target.chooseButton(["请选择获得一个技能", [info, "skill"]]).set("ai", ({ link }) => {
						return get.skillRank(link);
					});
					if (result?.bool && result?.links?.length) {
						await target.addSkills(result.links);
						await player.recover(1);
					}
				}
			},
			async function (event, _, player) {
				const {
						targets: [target],
					} = event,
					phaseUse = event.getParent("phaseUse");
				let [card] = get.cards(1, true);
				const next = target.showCards([card], `${get.translation(target)}【大德】展示的牌`).set("clearArena", false);
				await next;
				await target.gain(card, "gain2");
				game.broadcastAll(ui.clear);
				const vcard = get.autoViewAs(card, []);
				if (["basic", "trick"].includes(get.type(vcard)) && player.hasUseTarget(vcard, false, false)) {
					await player.chooseUseTarget(vcard, false, "nodistance");
				}
				function getStr(card) {
					let name = card.name,
						nature = get.nature(card);
					if (nature) {
						return `${nature}_${name}`;
					}
					return name;
				}
				let cardname = getStr(card);
				const check = game.hasGlobalHistory("everything", evt => {
					if (evt.name != "showCards" || evt == next) {
						return false;
					} else if (evt.getParent().name != "jlsg_lhsh_dade" || evt.getParent("phaseUse") != phaseUse) {
						return false;
					}
					let str = getStr(evt.cards[0]);
					return str == cardname;
				});
				if (check) {
					player.addTempSkill(`${event.name}_mark`, { player: "phaseUseEnd" });
				}
			},
			async function (event, _, player) {
				const {
					targets: [target],
					cards: [card],
				} = event;
				await player.give(card, target);
				const vcard = get.autoViewAs(card, []);
				if (["basic", "trick"].includes(get.type(vcard)) && player.hasUseTarget(vcard, false, false)) {
					await player.chooseUseTarget(vcard, false, "nodistance");
				}
			},
		],
		subSkill: {
			mark: {
				charlotte: true,
				init: (player, skill) => player.setStorage(skill, true, true),
				onremove: true,
			},
		},
		ai: {
			order(item, player) {
				if (!player.getStorage("jlsg_lhsh_dade_mark", false)) {
					if (player.hp < player.maxHp && player.storage.rende < 2 && player.countCards("h") > 1) {
						return 10;
					}
					return 1;
				}
				return 20;
			},
			result: {
				player(player, target) {
					if (!player.getStorage("jlsg_lhsh_dade_mark", false)) {
						return 1;
					}
					return -0.5;
				},
				target(player, target) {
					if (!player.getStorage("jlsg_lhsh_dade_mark", false)) {
						return get.sgnAttitude(player, target);
					}
					if (target.hasSkillTag("nogain")) {
						return 0;
					}
					if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
						return target.hasSkillTag("nodu") ? 0 : -10;
					}
					if (target.hasJudge("lebu")) {
						return 0;
					}
					const nh = target.countCards("h");
					const np = player.countCards("h");
					if (player.hp == player.maxHp || player.countCards("h") <= 1) {
						if (nh >= np - 1 && np <= player.hp && !target.hasSkill("haoshi")) {
							return 0;
						}
					}
					return Math.max(1, 5 - nh);
				},
			},
		},
	},
};

export default skills;
