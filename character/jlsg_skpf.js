import { lib, game, ui, get, ai, _status } from "../../../noname.js";
export default {
	name: "jlsg_skpf",
	connect: true,
	character: {
		jlsgsk_jdjg_sunshangxiang: ["female", "wu", 3, ["jlsg_jieyin", "jlsg_xiaoji"], ["name:孙|null"]],
		jlsgsk_syqj_guanyu: ["male", "shu", 4, ["jlsg_syqj_wusheng"], []],
		jlsgsk_sslh_zhenji: ["female", "wei", 3, ["jlsg_sslh_luoshen", "jlsg_sslh_qingguo"], ["name:甄|null"]],
		jlsgsk_spwq_lvbu: ["male", "qun", 4, ["jlsg_spwq_wushuang"], []],
		jlsgsk_smdq_diaochan: ["female", "qun", 3, ["jlsg_smdq_lijian", "jlsg_smdq_biyue"], ["name:null|null"]],
		jlsgsk_gygs_sunce: ["male", "wu", 4, ["jlsg_gygs_angyang", "jlsg_gygs_weifeng"], []],
		jlsgsk_lffw_huangyueying: ["female", "shu", 3, ["jlsg_lffw_lingxin", "jlsg_lffw_jiqiao"], ["name:黄|null"]],
	},
	characterTitle: {
		jlsgsk_jdjg_sunshangxiang: "绝代巾帼",
		jlsgsk_syqj_guanyu: "水淹七军",
		jlsgsk_sslh_zhenji: "似水莲华",
		jlsgsk_spwq_lvbu: "杀破万千",
		jlsgsk_smdq_diaochan: "水墨丹青",
		jlsgsk_gygs_sunce: "冠勇盖世",
		jlsgsk_lffw_huangyueying: "鸾飞凤舞",
	},
	skill: {
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
			content() {
				"step 0";
				event.targets = [player, target].sortBySeat();
				event.drawn = event.targets.filter(p => p.isHealthy());
				event.drawn.forEach(p => p.draw(2, player));
				("step 1");
				event.targets.filter(p => p.isDamaged()).forEach(p => p.recover(player));
				if (event.drawn.length) {
					event.finish();
				}
				("step 2");
				var stat = player.getStat().skill;
				delete stat.jlsg_jieyin;
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
					.chooseBool(`###get.prompt("jlsg_jdjg_xiaoji")###${str}`)
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
						if (get.type(card) == "equip" && !get.cardtag(card, "gifts")) return [1, 3];
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
							if (card.name == "sha") return num + player.countMark("jlsg_syqj_wusheng_buff");
						},
					},
				},
			},
			ai: {
				respondSha: true,
				skillTagFilter(player) {
					if (!player.countCards("hes", { color: "red" })) return false;
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
							if (evt.cards.some(c => get.number(c) == get.number(card))) return -1.5;
							return 1.5;
						})
						.set("judge2", result => result.bool);
					if (get.mode() != "guozhan" && !player.hasSkillTag("rejudge")) {
						next.set("callback", async (event, trigger, player) => {
							if (get.position(event.card, true) == "o") {
								await player.gain(event.card, "gain2");
							}
						});
					} else {
						next.set("callback", async (event, trigger, player) => {
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
				return event.player != player && event.card && (event.card.name == "sha" || get.type(event.card) == "trick");
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
					.set("card", trigger.card)
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
					if (_status.event.skill == "jlsg_spwq_wushuang") return Infinity;
					if (card && card.storage?.jlsg_spwq_wushuang) return Infinity;
				},
				targetInRange: function () {
					if (_status.event.skill == "jlsg_spwq_wushuang") return true;
				},
			},
			onChooseToUse(event) {
				if (game.online || event.jlsg_spwq_wushuang) return;
				let bool = true,
					num = event.player.getHistory("useCard", evt => {
						if (evt.skill != "jlsg_spwq_wushuang") return false;
						return evt.card.storage?.jlsg_spwq_wushuang_double;
					}).length,
					history = event.player.getHistory("useSkill", evt => {
						if (evt.skill != "jlsg_spwq_wushuang") return false;
						return !evt.targets;
					}).length;
				if (history > num) bool = false;
				event.set("jlsg_spwq_wushuang", bool);
			},
			enable: "chooseToUse",
			filter(event, player) {
				let check = event.jlsg_spwq_wushuang;
				if (!check) return false;
				if (!player.countCards("h")) return false;
				let vcard = get.autoViewAs({ name: "sha", isCard: true, storage: { jlsg_spwq_wushuang: true }, cards: [] }, []);
				return event.filterCard(vcard, player, event);
			},
			hiddenCard(name, player) {
				if (name == "sha") return player.countCards("h");
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
				if (!player.countCards("h")) return false;
				let num = player.getHistory("useCard", evt => {
						if (evt.skill != "jlsg_spwq_wushuang") return false;
						return evt.card.storage.jlsg_spwq_wushuang_double;
					}).length,
					history = player.getHistory("useSkill", evt => {
						if (evt.skill != "jlsg_spwq_wushuang") return false;
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
				if (hs.some(i => get.subtype(i) == "equip1")) event.card.storage.jlsg_spwq_wushuang_double = true;
				if (player.isIn()) player.draw(hs.length);
			},
			group: ["jlsg_spwq_wushuang_useCardTo", "jlsg_spwq_wushuang_damage"],
			subSkill: {
				useCardTo: {
					trigger: { player: "useCardToPlayered" },
					filter(event, player, name) {
						const target = event.target;
						if (!target || !target.isIn() || event.getParent().excluded.includes(target)) return false;
						return event.card.name == "sha" && event.card.storage?.jlsg_spwq_wushuang;
					},
					async cost(event, trigger, player) {
						const target = trigger.target;
						if (!target.isIn()) return;
						event.result = {
							bool: true,
							targets: [target],
						};
						if (trigger.card.storage.jlsg_spwq_wushuang_double) event.result.cost_data = { choice: [0, 1] };
						else {
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
										if (get.effect(target, sha, player, target) > target.countCards("hej")) return button.link == 1;
										else return button.link == 0;
									} else return 1;
								});
							if (result.bool && result.links) event.result.cost_data = { choice: result.links };
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
						if (choice.includes(1)) target.addTempSkill("baiban");
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
							if (player.isUnderControl() || player == game.me) dialog.addAuto(cards);
							else return "共有" + get.cnNumber(cards.length) + "张牌";
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
						if (!target) return;
						var cards = player.getCards("h").slice(0);
						var names = [];
						for (var i of cards) names.add(i.name);
						if (names.length < player.hp) return 0;
						if (player.hasUnknown() && (player.identity != "fan" || !target.isZhu)) return 0;
						if (get.attitude(player, target) >= 0) return -20;
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
						if (game.hasNature(card, "poison")) return;
						return 2;
					},
					natureDamage: function (card) {
						if (game.hasNature(card, "linked")) return 2;
					},
					fireDamage: function (card, nature) {
						if (game.hasNature(card, "fire")) return 2;
					},
					thunderDamage: function (card, nature) {
						if (game.hasNature(card, "thunder")) return 2;
					},
					poisonDamage: function (card, nature) {
						if (game.hasNature(card, "poison")) return 2;
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
					if (player.hasSkill("jlsg_smdq_lijian_used")) return false;
					return game.hasPlayer(cur => cur.hasUseTarget(juedou));
				} else if (event.getParent().name == "juedou") {
					if (
						!player.countCards("h", card => {
							const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
							return mod2 !== false;
						})
					)
						return false;
					return event.filterCard(get.autoViewAs({ name: "sha", isCard: false }, "unsure"), player, event);
				}
				return false;
			},
			complexCard: true,
			selectCard() {
				if (_status.event.type == "phase") return [0, 0];
				return [1, 1];
			},
			filterCard(card, player, event) {
				const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
				return mod2 !== false;
			},
			discard: false,
			targetprompt: ["先决斗", "后决斗"],
			selectTarget() {
				if (_status.event.type == "phase") return [2, 2];
				return [0, 0];
			},
			filterTarget(card, player, target) {
				let juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
				if (!ui.selected.targets.length) return target.hasUseTarget(juedou);
				return target.canUse(juedou, ui.selected.targets[0]);
			},
			multitarget: true,
			check(card) {
				return 10 - get.value(card);
			},
			prompt() {
				const event = _status.event;
				if (event.type == "phase") return "离间：出牌阶段限一次，你可以令两名角色依次对对方使用决斗（不能被【无懈可击】响应），直到其中一名角色进入濒死或以此法没有造成伤害";
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
						if (!source || !player.getStorage("jlsg_smdq_lijian_dying", false)) break;
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
					if (!player.countCards("h")) return false;
					if (arg == "use") return false;
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
				if (Array.from(ui.discardPile.childNodes).length) num += 1;
				if (_status.pileTop) num += 1;
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
							if (i == "h") cardx.hide.add(card);
							else cardx.shown.add(card);
							cards.add(card);
						}
						if (cardx.shown.length) target.$give(cardx.shown, player);
						if (cardx.hide.length) target.$giveAuto(cardx.hide, player);
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
				if (!cards.length) return;
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
				if (!["sha", "juedou"].includes(event.card.name)) return false;
				let giver;
				if (name == "useCardToPlayered") {
					if (event.targets.length != 1) return false;
					giver = event.target;
				} else giver = event.player;
				return giver.countGainableCards(player, "h");
			},
			async cost(event, trigger, player) {
				let giver;
				if (event.triggername == "useCardToPlayered") giver = trigger.target;
				else giver = trigger.player;
				let name = ["sha", "juedou"].filter(i => trigger.card.name != i)[0];
				const card = get.autoViewAs({ name }, []);
				event.result = await player
					.gainPlayerCard("h", giver)
					.set("prompt", get.prompt("jlsg_gygs_angyang", giver))
					.set("prompt2", lib.translate["jlsg_gygs_angyang_info"])
					.set("ai", () => {
						if (get.event("check")) return get.event().getRand();
						return false;
					})
					.set(
						"check",
						(function () {
							const gain = get.effect(giver, { name: "shunshou_copy2" }, player, player),
								use = get.effect(giver, card, player, player);
							if (giver.countGainableCards(player, "h") > 1) return gain + use > 0;
							else return gain > 0;
						})()
					)
					.set("logSkill", ["jlsg_gygs_angyang", giver])
					.set("chooseonly", true)
					.forResult();
				if (event.result) {
					event.result.targets = [giver];
					event.result.skill_popup = false;
					event.result.cost_data = { card };
				}
			},
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
						if (!target.countCards("h")) return;
						if (player.canUse(card, target, false)) await player.useCard(card, target, false);
					});
			},
			ai: {
				effect: {
					target(card, player, target) {
						if (!["sha", "juedou"].includes(card.name)) return;
						if (player.countGainableCards(target, "h")) return [1, 0.5, 1, -0.5];
					},
					player(card, player, target) {
						if (!["sha", "juedou"].includes(card.name)) return;
						if (target.countGainableCards(player, "h")) return [1, 0.5, 1, -0.5];
					},
				},
			},
		},
		jlsg_gygs_weifeng: {
			audio: "ext:极略/audio/skill:2",
			trigger: { global: "phaseZhunbeiBegin" },
			filter(event, player) {
				if (event.player == player) return false;
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
					if (player.canUse(card, target, false)) await player.useCard(card, target, false);
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
						if (target.canUse(card, player, false)) await target.useCard(card, player, false);
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
					if (get.type2(card) == "trick") return true;
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
	},
	translate: {
		jlsg_skpf: "极略皮肤",

		jlsgsk_jdjg_sunshangxiang: "SPF孙尚香",
		jlsgsk_jdjg_sunshangxiang_ab: "孙尚香",
		jlsg_jdjg_jieyin: "结姻",
		jlsg_jdjg_jieyin_info: "出牌阶段限一次，你可以弃置一张牌并选择一名其他角色，你与该角色中未受伤的角色摸两张牌，已受伤的角色回复1点体力，若没有角色以此法摸牌，此技能视为未发动过。",
		jlsg_jdjg_xiaoji: "枭姬",
		jlsg_jdjg_xiaoji_info: "当你失去装备区里的一张牌后，你可以摸一张牌，然后可以根据失去牌的类型执行以下效果：武器牌，对一名其他角色造成1点伤害；防具牌或宝物牌，摸两张牌；坐骑牌，弃置任意名其他角色至多共计两张牌。",
		jlsgsk_syqj_guanyu: "SPF关羽",
		jlsgsk_syqj_guanyu_ab: "关羽",
		jlsg_syqj_wusheng: "武圣",
		jlsg_syqj_wusheng_info: "你可以将红色牌当【杀】使用或打出，以此法使用的【杀】指定目标后，你摸一张牌并弃置至多三张手牌，若如此做，目标角色弃置X张牌，此【杀】的伤害+X，若此时是你的出牌阶段，你于此阶段内使用【杀】的次数上限+X(X为你弃置的牌数)。",
		jlsgsk_sslh_zhenji: "SPF甄姬",
		jlsgsk_sslh_zhenji_ab: "甄姬",
		jlsg_sslh_luoshen: "洛神",
		jlsg_sslh_luoshen_info: "准备阶段，你可以判定并获得生效后的判定牌，重复此流程直到点数重复的判定牌生效后，你于本回合内加此牌点数的手牌上限。",
		jlsg_sslh_qingguo: "倾国",
		jlsg_sslh_qingguo_info: "当其他角色使用【杀】或非延时锦囊牌指定你为目标后，你可以弃置一张黑色手牌并令此牌对你无效，然后若你弃置的牌为黑桃牌，你可以令该角色失去1点体力。",
		jlsgsk_spwq_lvbu: "SPF吕布",
		jlsgsk_spwq_lvbu_ab: "吕布",
		jlsg_spwq_wushuang: "无双",
		jlsg_spwq_wushuang_info: "每回合限一次，当你需要使用【杀】时，你可以弃置所有手牌并摸等量的牌，视为使用之。你以此法使用的【杀】造成的伤害翻倍，无次数和距离限制，并于指定目标后选择一项: 1.将其区域里的所有牌于本回合内移出游戏; 2.令其所有非Charlotte技能于本回合内失效。若你以此法弃置的牌里有武器牌，改为依次执行两项且令此技能于本回合内可再发动一次。",
		jlsgsk_smdq_diaochan: "SPF貂蝉",
		jlsgsk_smdq_diaochan_ab: "貂蝉",
		jlsg_smdq_lijian: "离间",
		jlsg_smdq_lijian_info: "出牌阶段限一次，你可以选择两名角色，从先选择的角色开始，其轮流视为对对方使用【决斗】（不能被【无懈可击】响应），直到其中一名角色进入濒死或以此法没有造成伤害。你可以将任意手牌当【杀】打出响应【决斗】。",
		jlsg_smdq_biyue: "闭月",
		jlsg_smdq_biyue_info: "结束阶段，你可以从每个不属于你的区域里随机获得一张牌。",
		jlsgsk_gygs_sunce: "SPF孙策",
		jlsgsk_gygs_sunce_ab: "孙策",
		jlsg_gygs_angyang: "昂扬",
		jlsg_gygs_angyang_info: "当你使用【杀】或【决斗】仅指定一名其他角色为目标后，或成为其他角色使用这些牌的目标后，你可以获得其一张手牌，若如此做，此牌结算后，若其有手牌，你视为对其使用另一种牌。",
		jlsg_gygs_weifeng: "威风",
		jlsg_gygs_weifeng_info: "其他角色的准备阶段，你可以与该角色拼点：若你赢，你摸两张牌并视为对其使用一张不计入次数的【杀】；否则，你可以令其摸两张牌并视为对你使用一张不计入次数的【杀】。",
		jlsgsk_lffw_huangyueying: "SPF黄月英",
		jlsgsk_lffw_huangyueying_ab: "黄月英",
		jlsg_lffw_lingxin: "灵心",
		jlsg_lffw_lingxin_info: "当你使用锦囊牌时，你可以摸一张牌并从牌堆获得一张基本牌，你以此法获得的基本牌不计入手牌上限，且无使用次数限制。",
		jlsg_lffw_jiqiao: "机巧",
		jlsg_lffw_jiqiao_info: "锁定技，你使用锦囊牌无距离限制，不能被其他角色响应。摸牌阶段，你额外从牌堆获得不同牌名的非延时锦囊牌各一张。",
	},

	dynamicTranslate: {},
};
