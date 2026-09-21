import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	jlsgsy_baonu: {
		audio: "ext:极略/audio/skill:1",
		skillAnimation: true,
		trigger: {
			player: ["changeHp", "loseMaxHpBegin"],
		},
		unique: true,
		charlotte: true,
		firstDo: true,
		ruleSkill: true,
		forced: true,
		mode: ["identity", "guozhan", "boss", "stone"],
		init(player, skill) {
			let nameList = get.nameList(player);
			if (nameList.every(i => !i.startsWith("jlsgsy_"))) {
				game.log(player, "非法获得技能，已移除");
				player.removeSkill(skill);
				return;
			}
			player.addSkill(skill + "2");
		},
		filter(event, player) {
			let nameList = get.nameList(player);
			if (nameList.every(i => !i.startsWith("jlsgsy_"))) {
				return false;
			}
			let least = 4;
			return player.hp <= least;
		},
		async content(event, trigger, player) {
			if (get.mode() == "boss") {
				if (player.isLinked()) {
					await player.link();
				}
				if (player.isTurnedOver()) {
					await player.turnOver();
				}
				await player.discard(player.getCards("j"));
			}
			await event.trigger("jlsgsy_baonuBefore");
			let least = 4;
			if (player.hp < least) {
				const num = Math.min(player.maxHp, least);
				player.hp = num;
			}
			let name1 = player.name1,
				name2 = player.name2;
			if (name1.startsWith("jlsgsy_") && !name1.endsWith("baonu")) {
				game.log(player, "将", get.translation(name1), "变更为", get.translation(name1 + "baonu"));
				player.reinit(name1, name1 + "baonu");
			}
			if (name2 && name2.startsWith("jlsgsy_") && !name2.endsWith("baonu")) {
				game.log(player, "将", get.translation(name2), "变更为", get.translation(name2 + "baonu"));
				player.reinit(name2, name2 + "baonu");
			}
			//魔贾诩神秘bug,插眼等流年...
			//if (player.maxHp < 3) {
			//	player.maxHp = 3;
			//	player.hp = 3;
			//}
			player.update();
			await event.trigger("jlsgsy_baonuAfter");
			const cards = Array.from(ui.ordering.childNodes);
			while (cards.length) {
				cards.shift().discard();
			}
			game.resetSkills();
			game.broadcastAll(ui.clear);
			let evt = trigger.getParent(1, true);
			while (evt?.name != "phaseLoop") {
				if (evt) {
					if (evt.name == "phase") {
						evt.pushHandler("onPhase", (evtx, option) => {
							evtx.step = 13;
							evtx.num = evtx.phaseList.length;
							game.broadcastAll(function (player) {
								player.classList.remove("glow_phase");
								if (_status.currentPhase) {
									game.log(_status.currentPhase, "结束了回合");
									delete _status.currentPhase;
								}
							}, evtx.player);
						});
					}
					evt.finish();
					evt._triggered = null;
					if (!evt.result) {
						evt.result = {};
					}
					evt = evt.getParent(1, true);
				} else {
					break;
				}
			}
			_status.paused = false;
			player.insertPhase(event.name);
		},
	},
	jlsgsy_baonu2: {
		trigger: {
			global: "gameDrawBegin",
			player: "phaseDrawBegin2",
		},
		filter(event, player) {
			if (get.mode() != "boss") {
				return false;
			}
			return !event.numFixed;
		},
		forced: true,
		popup: false,
		priority: 100,
		async content(event, trigger, player) {
			if (event.name == "phaseDraw") {
				trigger.num += 2;
			} else {
				let cards = get.cards(2);
				player.directgain(cards, false);
			}
		},
	},
	jlsgsy_baonulvbu: {
		inherit: "jlsgsy_baonu",
		animationStr: "把你们全宰了！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_wushuang: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
			source: "damageBegin1",
		},
		filter(event, player) {
			if (event.name === "damage") {
				if (!event.card || event.player === player) {
					return false;
				}
				const useCard = event.getParent(2);
				if (useCard.name !== "useCard") {
					return false;
				} else if (get.number(event.card) % 2 !== 1) {
					return false;
				} else if (useCard.player !== player) {
					return event.card.name === "juedou";
				}
				return true;
			}
			return ["sha", "juedou"].includes(event.card.name);
		},
		logTarget(event, player) {
			if (event.name !== "damage" && event.card.name === "juedou") {
				return player === event.player ? event.target : event.player;
			}
			return null;
		},
		forced: true,
		async content(event, trigger, player) {
			if (trigger.name === "damage") {
				trigger.num = 3;
			} else if (trigger.card.name === "sha") {
				const id = trigger.target.playerid;
				const map = trigger.getParent()?.customArgs;
				if (id != null) {
					map[id] ??= {};
					if (typeof map[id].shanRequired == "number") {
						map[id].shanRequired++;
					} else {
						map[id].shanRequired = 2;
					}
				}
			} else {
				const id = event.targets?.[0]?.["playerid"];
				const idt = trigger.target.playerid;
				const map = trigger.getParent()?.customArgs;
				if (id != null && idt != null) {
					map[idt] ??= {};
					map[idt].shaReq ??= {};
					if (!map[idt].shaReq[id]) {
						map[idt].shaReq[id] = 1;
					}
					map[idt].shaReq[id]++;
				}
			}
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (arg.card.name !== "sha" || arg.target.countCards("h", "shan") > 1) {
					return false;
				} else if (arg.card.name !== "juedou" || Math.floor(arg.target.countCards("h", "sha") / 2) > player.countCards("h", "sha")) {
					return false;
				}
			},
			effect: {
				player(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) {
						return;
					}
					if (get.is.damageCard(card) && get.number(card) % 2 === 1) {
						return 2.5;
					}
				},
			},
		},
	},
	jlsgsy_xiuluo: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player) {
			if (get.name(event.card) !== "sha" && get.type(event.card) !== "trick") return false;
			if (event.player == player) return true;
			return event.targets && event.targets.length === 1;
		},
		frequent: "check",
		check(event, player) {
			const juedou = get.autoViewAs({ ...event.card, name: "juedou", isCard: false }, event.card.cards || event.cards);
			return get.effect(player, juedou, event.player, player) + 4 > get.effect(player, event.card, event.player, player);
		},
		async content(event, trigger, player) {
			await player.draw({ num: 1 });
			trigger.card.name = "juedou";
			if (trigger.card.isCard && trigger.cards.length) {
				trigger.card.isCard = false;
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsgsy_shenwei: {
		audio: "ext:极略/audio/skill:1",
		global: "jlsgsy_shenwei_g",
		subSkill: {
			g: {
				charlotte: true,
				mod: {
					maxHandcard(player, num) {
						let numx = game.countPlayer(current => {
							if (current === player || !current.hasSkill("jlsgsy_shenwei") || !current.inRange(player)) {
								return 0;
							}
							const historys = current
								.getAllHistory("sourceDamage", evt => evt.player != current)
								.map(evt => evt.getParent("phase"))
								.unique();
							return historys.length + 1;
						});
						return num - numx;
					},
				},
			},
		},
	},
	jlsgsy_shenji: {
		mod: {
			selectTarget(card, player, range) {
				if (card.name != "sha") {
					return;
				}
				if (range[1] <= 0) {
					return;
				}
				range[1] += 2;
			},
		},
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCard1",
		},
		forced: true,
		firstDo: true,
		filter(event, player) {
			if (event.card.name != "sha") {
				return false;
			}
			return event.targets.length > 1;
		},
		async content(event, trigger, player) {},
	},
	jlsgsy_guiming: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "dying",
		},
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		check: () => true,
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const currents = game.filterPlayer().sortBySeat();
			const num = currents.length;
			await player.recover(num);
			currents.remove(player);
			const lose_list = [];
			while (currents.length) {
				const target = currents.randomRemove();
				if (!target?.isIn()) {
					continue;
				}
				const cards = target.getDiscardableCards(target, "he");
				if (!cards.length) {
					continue;
				}
				lose_list.push([target, cards.randomGets(num)]);
			}
			if (lose_list.length) {
				await game.loseAsync({ lose_list, discarder: player }).setContent("discardMultiple");
			}
		},
	},
	jlsgsy_huangyin: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			global: ["loseAfter", "loseAsyncAfter"],
		},
		frequent: true,
		filter(event, player) {
			if (event.type != "discard" || event.getlx === false) {
				return false;
			} else if (
				!game.hasPlayer(current => {
					if (current == player) {
						return false;
					}
					const evt = event.getl(current);
					return evt?.cards2?.length;
				})
			) {
				return false;
			}
			return (event.discarder || event.getParent().player) === player;
		},
		async content(event, trigger, player) {
			let cards = game
				.filterPlayer(p => p != player)
				.flatMap(p => {
					let evt = trigger.getl(p);
					return evt?.cards2 | [];
				});
			if (cards.length) {
				let card = cards.randomGet();
				await player.gain({ cards: [card], animate: "gain2" });
				await game.delayx(0.5);
			}
		},
	},
	jlsgsy_baonusunhao: {
		inherit: "jlsgsy_baonu",
		animationStr: "当个好皇帝有什么意思!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_mingzheng: {
		audio: "ext:极略/audio/skill:1",
		derivation: "jlsgsy_shisha",
		trigger: {
			global: "phaseDrawBegin",
		},
		forced: true,
		async content(event, trigger, player) {
			trigger.num += trigger.player == player ? 2 : 1;
		},
		group: ["jlsgsy_mingzheng_change"],
		subSkill: {
			change: {
				trigger: {
					player: "damageEnd",
					global: ["jlsgsy_baonuBefore", "jlsgsy_baonuAfter"],
				},
				filter(event, player, name) {
					if (name.includes("jlsgsy_baonu")) {
						return event.player == player;
					}
					return true;
				},
				forced: true,
				async content(event, trigger, player) {
					let num = player.phaseNumber;
					if (event.triggername == "jlsgsy_baonuAfter") {
						num++;
					}
					await player.draw(num + 1);
					await player.changeSkills(["jlsgsy_shisha"], ["jlsgsy_mingzheng"]);
				},
			},
		},
		ai: {
			threaten: 0.8,
		},
	},
	jlsgsy_shisha: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCardToPlayered",
		},
		forced: true,
		filter(event, player) {
			return event.card.name == "sha" && event.target.hasDiscardableCards(event.target, "he");
		},
		async content(event, trigger, player) {
			const num = 1 + Math.floor(event.getRand() * 3);
			await trigger.target.randomDiscard({ num, discarder: player });
		},
	},
	jlsgsy_zuijiu: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		filter(event, player) {
			const sha = get.autoViewAs({ name: "sha", isCard: true }, []),
				jiu = get.autoViewAs({ name: "jiu", isCard: true }, []);
			let list = [sha, jiu].filter(card => player.hasUseTarget(card, false, false));
			if (!list.length) {
				return false;
			}
			let used = player.getStat("skill")?.jlsgsy_zuijiu || 0;
			return player.countDiscardableCards(player, "h") >= used;
		},
		delay: 0,
		async content(event, trigger, player) {
			let used = (player.getStat("skill")?.jlsgsy_zuijiu || 1) - 1;
			if (used > 0) {
				await player.randomDiscard(used, "h");
			}
			const sha = get.autoViewAs({ name: "sha", isCard: true }, []),
				jiu = get.autoViewAs({ name: "jiu", isCard: true }, []);
			let list = [sha, jiu].filter(card => player.hasUseTarget(card, false, false));
			if (!list.length) {
				return;
			}
			let card = list.randomGet();
			await player.chooseUseTarget(card.name, true, false, "nodistance");
		},
		ai: {
			order(item, player) {
				return get.order("sha", player) + 1;
			},
			result: {
				player(player) {
					let used = player.getStat("skill")?.jlsgsy_zuijiu || 0;
					if (used <= 2) {
						return 1;
					}
					return 0;
				},
			},
		},
	},
	jlsgsy_bolue: {
		init(player, skill) {
			player.setStorage(
				skill,
				{
					wei: 1,
					shu: 1,
					wu: 1,
				},
				true
			);
		},
		audio: "ext:极略/audio/skill:4",
		trigger: {
			player: "phaseBegin",
		},
		forced: true,
		async content(event, trigger, player) {
			if (!_status.jlsgsy_bolue_list) {
				lib.skill.jlsgsy_bolue.initList();
			}
			let obj = player.getStorage(event.name, {
				wei: 1,
				shu: 1,
				wu: 1,
			});
			let list = [];
			for (let g in obj) {
				if (!_status.jlsgsy_bolue_list[g]) {
					continue;
				}
				list.addArray(_status.jlsgsy_bolue_list[g].randomGets(obj[g]));
			}
			await player.addTempSkills(list, { player: "phaseBeginStart" });
		},
		initList() {
			let result = {};
			for (let c of lib.jlsg.characterList) {
				let info = get.character(c);
				result[info.group] ??= [];
				const skills = info.skills.filter(s => !lib.filter.skillDisabled(s) && (!lib.skill[s]?.ai || !lib.skill[s]?.ai?.neg));
				if (skills.length) {
					result[info.group].addArray(skills);
				}
			}
			_status.jlsgsy_bolue_list = result;
		},
	},
	jlsgsy_baonusimayi: {
		inherit: "jlsgsy_baonu",
		animationStr: "老夫没时间陪你们了!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_biantian: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			global: "phaseJudgeBefore",
		},
		forced: true,
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			return event.player.isAlive();
		},
		async content(event, trigger, player) {
			await trigger.player.executeDelayCardEffect("shandian");
		},
	},
	jlsgsy_tianyou: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "phaseJieshuBegin",
		},
		forced: true,
		filter(event, player) {
			let cnt = game.getAllGlobalHistory("changeHp", evt => {
				const evtx = evt.getParent();
				if (evtx.name != "damage") {
					return false;
				}
				return evtx.getParent() === "shandian" || evtx.card?.name === "shandian";
			}).length;
			return cnt != 0 || player.isDamaged();
		},
		async content(event, trigger, player) {
			let cnt = game.getAllGlobalHistory("changeHp", evt => {
				const evtx = evt.getParent();
				if (evtx.name != "damage") {
					return false;
				}
				return evtx.getParent() === "shandian" || evtx.card?.name === "shandian";
			});
			if (cnt == 0) {
				await player.recover();
			} else {
				await player.draw({ num: cnt });
			}
		},
	},
	jlsgsy_renji: {
		audio: "ext:极略/audio/skill:3",
		trigger: {
			player: "damageEnd",
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw({ num: 1 });
			if (!player.hasSkill("jlsgsy_bolue", null, false, false)) {
				return;
			}
			let storage = player.getStorage("jlsgsy_bolue", {
				wei: 1,
				shu: 1,
				wu: 1,
			});
			if (trigger.source) {
				let group = trigger.source.group || "qun";
				storage[group] ??= 0;
				storage[group]++;
				player.setStorage("jlsgsy_bolue", storage, true);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			combo: "jlsgsy_bolue",
		},
	},
	jlsgsy_zongyu: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCardAfter",
		},
		filter(event, player) {
			return player.isPhaseUsing() && get.type(event.card, "trick") == "trick" && player.hasUseTarget({ name: "jiu", isCard: true }, null, false);
		},
		forced: true,
		direct: true,
		async content(event, trigger, player) {
			await player.chooseUseTarget({ name: "jiu", isCard: true }, true, false, "nopopup", "noanimate").set("logSkill", event.name);
		},
	},
	jlsgsy_lingnue: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			source: "damageSource",
		},
		filter(event) {
			return event.num >= 2;
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw({ num: 2 });
			await player.gainMaxHp(1);
		},
	},
	jlsgsy_baozheng: {
		audio: "ext:极略/audio/skill:1",
		forced: true,
		trigger: {
			global: "phaseDrawAfter",
		},
		filter(event, player) {
			return event.player != player;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const result = await trigger.player
				.chooseToGive({
					target: player,
					prompt: `${get.translation(player)}对你发动了“暴政”`,
					prompt2: `交给${get.translation(player)}一张锦囊牌，否则其对你使用一张【杀】`,
					filterCard(card, player) {
						return get.type(card, "trick") == "trick";
					},
					ai(card) {
						const { source, player } = get.event();
						let val = get.value(card),
							shaEff = get.effect(player, { name: "sha" }, source, player);
						if (shaEff >= 0) {
							return 0;
						}
						return 10 - val;
					},
					source: player,
				})
				.forResult();
			if (result?.bool && result.cards?.length) {
				if (get.attitude(trigger.player, player) > 0 && trigger.player.ai.shown < player.ai.shown) {
					trigger.player.addExpose(0.2);
				}
			} else {
				if (get.attitude(trigger.player, player) < 0 && trigger.player.ai.shown < player.ai.shown && trigger.player.countCards("h") > 0) {
					trigger.player.addExpose(0.05);
				}
				await player.useCard({
					card: { name: "sha", isCard: true },
					targets: [trigger.player],
					addCount: false,
				});
			}
		},
		ai: {
			threaten: 3,
		},
	},
	jlsgsy_nishi: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "damageEnd",
		},
		filter(event, player) {
			return event.source?.isIn() && event.source != player;
		},
		logTarget: "source",
		forced: true,
		async content(event, trigger, player) {
			const [target] = event.targets;
			if (!target.hasDiscardableCards(target, "e")) {
				return;
			}
			const result = await target
				.chooseBool({
					prompt: `###逆施：是否弃置装备区内所有牌？###否则${get.translation(player)}对你使用一张【杀】`,
					ai(event, player) {
						const [target] = event.targets;
						const es = target.getDiscardableCards(target, "e"),
							sha = get.autoViewAs({ name: "sha", isCard: true }, []);
						return get.value(es, target) < get.effect(target, sha, player, target) / 5;
					},
				})
				.forResult();
			if (result?.bool) {
				await target.discard({ cards: target.getDiscardableCards(target, "e") });
			} else {
				await player.useCard({
					card: { name: "sha", isCard: true },
					cards: [],
					targets: event.targets,
					noai: true,
				});
			}
		},
		ai: {
			maixie_defend: true,
		},
	},
	jlsgsy_hengxing: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			source: "damageBegin1",
		},
		filter(event, player) {
			return !player.isPhaseUsing();
		},
		forced: true,
		async content(event, trigger, player) {
			trigger.num++;
		},
		ai: {
			damageBonus: true,
			skillTagFilter(player) {
				return !player.isPhaseUsing();
			},
		},
	},
	jlsgsy_baonudongzhuo: {
		inherit: "jlsgsy_baonu",
		animationStr: "统统杀光",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_bujiao: {
		marktext: "平",
		intro: {
			content: `手牌上限-#`,
		},
		audio: "ext:极略/audio/skill:1",
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		filter(event, player) {
			return event.player != player;
		},
		check: () => Math.random() < 0.8,
		logTarget: "player",
		async content(event, trigger, player) {
			await trigger.player.draw({ num: 1, nodelay: true });
			trigger.player.addMark(event.name, 1);
			await game.delayx();
		},
		global: "jlsgsy_bujiao_debuff",
		subSkill: {
			debuff: {
				charlotte: true,
				mod: {
					maxHandcard(player, num) {
						if (player.hasMark("jlsgsy_bujiao")) {
							return num - player.countMark("jlsgsy_bujiao") * game.filterPlayer(p => p != player && p.hasSkill("jlsgsy_bujiao")).length;
						}
					},
				},
			},
		},
	},
	jlsgsy_taiping: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		filter(event, player) {
			return game.filterPlayer().some(p => p.hasMark("jlsgsy_bujiao"));
		},
		check(event, player) {
			let marks = game.filterPlayer().reduce((a, b) => a + b.countMark("jlsgsy_bujiao"), 0);
			let diff = game.filterPlayer(p => p != player).reduce((a, b) => a + b.countCards("h"), 0) - player.countCards("h");
			if (marks > diff) {
				return true;
			}
			return Math.random > 0.5;
		},
		async content(event, trigger, player) {
			const currents = game.filterPlayer().sortBySeat();
			let marks = currents.reduce((a, b) => a + b.countMark("jlsgsy_bujiao"), 0);
			await player.draw(marks);
			for (let p of currents) {
				p.clearMark(event.name);
			}
			let others = currents.filter(current => current != player).reduce((a, b) => a + b.countCards("h"), 0);
			if (others >= player.countCards("h")) {
				return;
			}
			const result = await player
				.chooseBool({
					prompt: "是否对所有其他角色造成1点伤害？",
					ai(event, player) {
						return true;
					},
				})
				.forResult();
			if (result?.bool) {
				let targets = currents.filter(current => current != player);
				player.line(targets);
				await game.doAsyncInOrder(targets, async target => await target.damage());
			}
		},
		ai: {
			combo: "jlsgsy_bujiao",
		},
	},
	jlsgsy_yaohuo: {
		onremove(player, skill) {
			player.removeStorage(skill);
			const currents = game.filterPlayer();
			for (let current of currents) {
				current.enableSkill(`${skill}_${player.playerid}`);
				current.removeSkill("jlsgsy_yaohuo_enable");
			}
		},
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			if (player === target) {
				return false;
			}
			let quota = player.countDiscardableCards(player, "he"),
				skills = target.getStockSkills(true);
			if (target.countCards("h") > 0 && quota >= target.countCards("h")) {
				return true;
			}
			return !player.getStorage("jlsgsy_yaohuo", new Map()).has(target) && skills.length && quota >= skills.length;
		},
		delay: false,
		async content(event, trigger, player) {
			const target = event.target;
			const quota = player.countDiscardableCards(player, "he"),
				hs = target.getGainableCards(player, "h"),
				skills = target.getStockSkills(true),
				list = [];
			if (hs.length > 0 && quota >= hs.length) {
				list.push(`弃置${get.cnNumber(hs.length)}张牌并获得${get.translation(target)}的所有手牌。`);
			}
			if (skills.length && quota >= skills.length) {
				list.push(`弃置${get.cnNumber(skills.length)}张牌并取走${get.translation(target)}的所有技能。`);
			}
			let result = await player.chooseControlList(list, true).forResult();
			if (typeof result?.index !== "number") {
				return;
			}
			const choseCard = list[result.index].includes("手牌");
			result = await player
				.chooseToDiscard({
					selectCard: choseCard ? hs.length : skills.length,
					position: "he",
					forced: true,
				})
				.forResult();
			if (!result?.bool || !result.cards?.length) {
				return;
			}
			if (choseCard) {
				await player.gain({
					cards: hs,
					source: target,
					animate: "giveAuto",
					log: true,
				});
				return;
			}
			const next = player.addTempSkills(skills, { player: "dieAfter" });
			next.$handleInner = next.$handle;
			next.jlsg_yaohuo_target = target;
			next.jlsg_yaohuo_skills = skills;
			next.$handle = function (player) {
				const event = get.event(),
					storage = player.getStorage("jlsgsy_yaohuo", new Map()),
					currentAdditional = Object.keys(player.additionalSkills);
				event.$handleInner.apply(this, arguments);
				const target = event.jlsg_yaohuo_target,
					skills = event.jlsg_yaohuo_skills,
					addtionalSkill = Object.keys(player.additionalSkills);
				addtionalSkill.removeArray(currentAdditional);
				//console.assert(addtionalSkill.length == 1, "jlsg_yaohuo hook not working properly");
				storage.set(event.jlsg_yaohuo_target, addtionalSkill[0]);
				player.setStorage("jlsgsy_yaohuo", storage, true);
				target.disableSkill(`jlsgsy_yaohuo_${player.playerid}`, skills);
				target.addSkill("jlsgsy_yaohuo_enable");
			};
			await next;
		},
		subSkill: {
			enable: {
				charlotte: true,
				trigger: {
					player: ["phaseBegin", "dieAfter"],
				},
				filter(event, player) {
					if (event.name != "die" && player.isDead()) {
						return false;
					}
					return Object.values(player.disabledSkills)
						.flat()
						.some(key => key.startsWith("jlsgsy_yaohuo_"));
				},
				forceDie: true,
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const currents = game.filterPlayer(current => current != player && current.getStorage("jlsgsy_yaohuo", new Map()).has(player));
					for (const current of currents) {
						let storage = current.getStorage("jlsgsy_yaohuo", new Map());
						let info = storage.get(player);
						if (info) {
							current.removeAdditionalSkills(info);
						}
						storage.delete(player);
						current.setStorage("jlsgsy_yaohuo", storage, true);
					}
					const keys = Object.values(player.disabledSkills)
						.flat()
						.filter(key => key.startsWith("jlsgsy_yaohuo_"));
					for (const key of keys) {
						player.enableSkill(key);
					}
					player.removeSkill(event.name);
				},
			},
		},
		ai: {
			order: 9.5,
			result: {
				target(player, target) {
					if (target.countCards("h") < 3) {
						return 0;
					}
					return -1;
				},
			},
			expose: 0.2,
		},
	},
	jlsgsy_sanzhi: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCardAfter",
		},
		filter(event, player) {
			const historys = player
				.getAllHistory("useCard")
				.map(evt => get.type2(evt.card))
				.unique();
			return historys.length % 3 === 0;
		},
		check: () => true,
		async content(event, trigger, player) {
			game.filterPlayer(p => p != player).forEach(p => p.addMark("jlsgsy_bujiao"));
		},
		ai: {
			combo: "jlsgsy_bujiao",
		},
	},
	jlsgsy_baonuzhangjiao: {
		inherit: "jlsgsy_baonu",
		animationStr: "招神劾鬼, 统摄天地!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_baonucaifuren: {
		inherit: "jlsgsy_baonu",
		animationStr: "别想逃出我的手掌心!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_dihui: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			let players = game.filterPlayer();
			for (let i = 0; i < players.length - 1; ++i) {
				if (players[i].hp != players[i + 1].hp) {
					return true;
				}
			}
			return false;
		},
		prompt2: "请选择造成伤害与受到伤害的角色",
		complexTarget: true,
		selectTarget: 2,
		filterTarget(card, player, target) {
			if (ui.selected.targets.length == 1) {
				return target.hp < ui.selected.targets[0].hp;
			}
			let min = Math.min(...game.filterPlayer().map(c => c.hp));
			return target.hp > min;
		},
		targetprompt: ["造成伤害", "受到伤害"],
		multitarget: true,
		async content(event, trigger, player) {
			const [source, target] = event.targets;
			await target.damage({ num: 1, source });
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			if (player.isDamaged() && source !== player) {
				await player.recover(1);
			}
		},
		ai: {
			order: 9.5,
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					if (att < 0) {
						return att;
					}
				},
			},
			// expose: 0.2
		},
	},
	jlsgsy_luansi: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			if (!target.countCards("h")) {
				return false;
			}
			if (ui.selected.targets.length) {
				return !target.hasSkillTag("noCompareTarget");
			} else {
				return !target.hasSkillTag("noCompareSource");
			}
		},
		filter(event, player) {
			return game.countPlayer(p => p.countCards("h")) >= 2;
		},
		multitarget: true,
		targetprompt: ["发起拼点", "被拼点"],
		selectTarget: 2,
		prompt: "乱嗣：选择两名拼点目标,然后你弃置没赢的角色的两张牌。若拼点赢的角色不是你，你摸两张牌",
		async content(event, trigger, player) {
			const [target1, target2] = event.targets;
			target1.line(target2, "green");
			const result = await target1.chooseToCompare(target2).forResult();
			const lose = [];
			if (result.winner) {
				lose.add(result.winner == target1 ? target2 : target1);
			} else if (result.tie) {
				lose.addArray(event.targets);
			}
			for (const target of lose) {
				if (target.isIn() && target.countDiscardableCards(player, "he")) {
					await player.discardPlayerCard(target, "he", true, 2);
				}
			}
			if (!result.winner || result.winner != player) {
				await player.draw(2);
			}
		},
		ai: {
			order: 8,
			result: {
				target(player, target) {
					if (game.players.length <= 2) {
						return 0;
					}
					if (target.countCards("he") < 1) {
						return 0;
					}
					const att = get.attitude(player, target);
					if (att < 0) {
						return -target.countCards("he");
					}
				},
			},
		},
	},
	jlsgsy_huoxin: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "damageBegin4",
		},
		filter(event, player, name) {
			if (event.num < 1) {
				return false;
			}
			return event.source && event.source.isIn();
		},
		forced: true,
		logTarget: "source",
		async content(event, trigger, player) {
			const result = await trigger.source
				.chooseBool(`###${get.translation(player)}对你发动了祸心###是否令${get.translation(player)}获得你区域里的各一张牌？否则其防止此次伤害且你失去一点体力`)
				.set("ai", (event, source) => {
					const player = event.player;
					const losehp = get.effect(source, { name: "losehp" }, player, source),
						damage = get.damageEffect(player, source, source, event.getTrigger().nature),
						gain = get.effect(source, { name: "shunshou_copy" }, player, source);
					return gain + damage > losehp;
				})
				.forResult();
			if (result.bool) {
				let position = "";
				for (let i of "hej") {
					if (trigger.source.countGainableCards(player, i)) {
						position += i;
					}
				}
				if (position.length > 0) {
					await player
						.gainPlayerCard(trigger.source, position, position.length, "祸心：获得每个区域各一张牌")
						.set("filterButton", button => {
							const player = get.player(),
								target = get.event().target;
							if (!lib.filter.canBeGained(button.link, player, target)) {
								return false;
							}
							if (ui.selected.buttons?.length) {
								const cards = ui.selected.buttons.map(i => i.link);
								for (const card of cards) {
									if (get.position(card) == get.position(button.link)) {
										return false;
									}
								}
							}
							return true;
						})
						.set("target", trigger.source);
					return;
				}
			}
			game.log(player, "防止了伤害");
			trigger.cancel();
			await trigger.source.loseHp(1);
		},
		ai: {
			maixie_defend: true,
		},
	},
	jlsgsy_shiao: {
		audio: "ext:极略/audio/skill:true",
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		filter: (event, player) => player.hasUseTarget("sha", false),
		direct: true,
		async content(event, trigger, player) {
			player.chooseUseTarget("###是否发动【恃傲】？###视为使用一张【杀】", { name: "sha" }, false, "nodistance").set("logSkill", "jlsgsy_shiao");
		},
	},
	jlsgsy_kuangxi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardEnd",
		},
		filter(event, player) {
			let targets = event.targets.slice().remove(player);
			if (!targets || targets.length == 0 || !event.card) {
				return false;
			}
			if (event.card.name == "wuxie") {
				return false;
			}
			if (get.type2(event.card) != "trick") {
				return false;
			}
			return targets.some(target => player.canUse(get.autoViewAs({ name: "sha" }, []), target, false));
		},
		check(event, player) {
			let targets = event.targets
				.slice()
				.remove(player)
				.filter(target => player.canUse(get.autoViewAs({ name: "sha" }, []), target, false));
			let att = 0;
			for (var i = 0; i < targets.length; i++) {
				att += get.effect(targets[i], get.autoViewAs({ name: "sha" }, []), player, player);
			}
			return att > 1;
		},
		async content(event, trigger, player) {
			const targets = trigger.targets
				.slice()
				.remove(player)
				.filter(target => player.canUse(get.autoViewAs({ name: "sha" }, []), target, false));
			await player.useCard(get.autoViewAs({ name: "sha" }, []), targets, false);
			if (!player.hasHistory("sourceDamage", e => e.getParent(3) === event)) {
				if (player.isIn()) {
					await player.loseHp(1);
				}
			}
		},
		ai: {
			effect: {
				player(card, player, target) {
					if (get.type(card) == "trick") {
						return [1, 2];
					}
				},
			},
		},
	},
	jlsgsy_baonuweiyan: {
		inherit: "jlsgsy_baonu",
		animationStr: "老子岂能受你们摆布!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_fangu: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "damageEnd",
		},
		forced: true,
		priority: 100,
		async content(event, trigger, player) {
			game.broadcastAll(ui.clear);
			let evt = trigger.getParent(0, true, true);
			while (evt?.name != "phaseLoop") {
				if (evt) {
					if (evt.name == "phase") {
						evt.pushHandler("onPhase", (evtx, option) => {
							evtx.step = 13;
							evtx.num = evtx.phaseList.length;
							game.broadcastAll(function (player) {
								player.classList.remove("glow_phase");
								if (_status.currentPhase) {
									game.log(_status.currentPhase, "结束了回合");
									delete _status.currentPhase;
								}
							}, evtx.player);
						});
					}
					evt.finish();
					evt._triggered = null;
					if (!evt.result) {
						evt.result = {};
					}
					evt = evt.getParent(1, true);
				} else {
					break;
				}
			}
			//也不知道为啥能触发结束阶段的技能，还原就是了
			//沟槽的，只触发结束阶段，而且能反复触发
			evt = trigger.getParent("phase", true, true);
			if (evt?.phaseList?.some(i => i.startsWith("phaseJieshu"))) {
				await evt.player.phaseJieshu();
			}
			_status.paused = false;
			player.insertPhase(event.name);
		},
	},
	jlsgsy_canlue: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			global: ["gainAfter", "loseAsyncAfter"],
		},
		getIndex(event, player) {
			const losers = game
					.filterPlayer(current => {
						if (current === player) {
							return false;
						}
						return event.getl(current)?.cards2?.length;
					})
					.sortBySeat()
					.map(target => [target, "lose"]),
				gainers = game
					.filterPlayer(current => {
						if (current === player) {
							return false;
						}
						return event.getg(current)?.length;
					})
					.sortBySeat()
					.map(target => [target, "gain"]);
			return losers.concat(gainers);
		},
		filter(event, player, name, [target, type]) {
			let lose, gain;
			if (type === "lose") {
				lose = event.getl(target)?.cards2;
				gain = event.getg(player);
			} else if (type == "gian") {
				lose = event.getl(player)?.cards2;
				gain = event.getg(target);
			}
			return gain?.some(card => lose?.includes(card));
		},
		async cost(event, trigger, player) {
			const [target, type] = event.indexedData;
			let lose, gain;
			if (type === "lose") {
				lose = trigger.getl(target).cards2;
				gain = trigger.getg(player);
			} else {
				lose = trigger.getl(player).cards2;
				gain = trigger.getg(target);
			}
			const num = gain.filter(card => lose.includes(card)).length;
			event.result = await player
				.chooseBool({
					prompt: get.prompt(event.skill, target),
					prompt2: type === "lose" ? `对其造成${num}点伤害` : `令其弃置${num}张牌`,
					ai(event, player) {
						return true;
					},
				})
				.forResult();
		},
		logTarget(event, player, name, [target]) {
			return target;
		},
		async content(event, trigger, player) {
			const [target, type] = event.indexedData;
			let lose, gain;
			if (type === "lose") {
				lose = trigger.getl(target).cards2;
				gain = trigger.getg(player);
			} else {
				lose = trigger.getl(player).cards2;
				gain = trigger.getg(target);
			}
			const num = gain.filter(card => lose.includes(card)).length;
			if (type === "lose") {
				await target.damage({ num });
			} else {
				await target.chooseToDiscard({ selectCard: num, position: "he", forced: true });
			}
		},
	},
	jlsgsy_chanxian: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		selectTarget: 2,
		multitarget: true,
		complexTarget: true,
		filterTarget(card, player, target) {
			if (ui.selected.targets.length) {
				const from = ui.selected.targets[0];
				const js = from.getVCards("j");
				for (let i of js) {
					if (target.canAddJudge(i)) {
						return true;
					}
				}
				if (target.isMin()) {
					return false;
				}
				const es = from.getVCards("e");
				for (let i of es) {
					if (target.isEmpty(get.subtype(i))) {
						return true;
					}
				}
				return from.countCards("h") > 0;
			}
			return target.countVCards("ej") > 0 || target.countCards("h") > 0;
		},
		targetprompt: ["被移走", "移动目标"],
		async content(event, trigger, player) {
			const [from, to] = event.targets;
			const result = await player
				.choosePlayerCard("hej", true, from)
				.set("filterButton", function (button) {
					const to = _status.event.to;
					if (get.position(button.link) == "e") {
						return to.isEmpty(get.subtype(button.link));
					}
					return true;
				})
				.set("ai", function (button) {
					const player = _status.event.player,
						from = _status.event.from,
						to = _status.event.to;
					if (get.attitude(player, from) > 0 && get.attitude(player, to) < 0) {
						if (get.position(button.link) == "j") {
							return 12;
						}
						if (get.value(button.link, from) < 0 && get.effect(to, button.link, player, to) > 0) {
							return 10;
						}
						return 0;
					} else {
						if (get.position(button.link) == "j") {
							return -10;
						}
						return get.value(button.link) * get.effect(to, button.link, player, to);
					}
				})
				.set("from", from)
				.set("to", to)
				.setContent(lib.skill.jlsgsy_chanxian.choosePlayerCard)
				.forResult();
			if (result.bool && result.links.length) {
				const link = result.links[0];
				if (get.position(link) != "h") {
					if (from.getVCards("e").includes(link)) {
						if (!link.cards?.length) {
							from.removeVirtualEquip(link);
						}
						await to.equip(link);
					} else if (from.getVCards("j").includes(link)) {
						if (!link.cards?.length) {
							from.removeVirtualJudge(link);
						}
						await to.addJudge(link, link?.cards);
					}
					if (link.cards?.length) {
						from.$give(link.cards, to, false);
					}
					game.log(from, "的", link, "被移动给了", to);
				} else {
					await to.gain(link, from, "giveAuto");
				}
				await game.delay();
				const juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
				if (from.canUse(juedou, to, false)) {
					await from.useCard(juedou, to, "noai");
					const damaged = game
						.getGlobalHistory("changeHp", evt => {
							if (evt.parent?.name != "damage") {
								return false;
							}
							return evt.parent.card?.name == "juedou" && evt.getParent(4) == event;
						})
						.map(evt => evt.player)
						.flat()
						.sortBySeat(_status.currentPhase);
					for (let current of damaged) {
						if (!current.countGainableCards(player, "he")) {
							continue;
						}
						await player.gainPlayerCard(current, true);
					}
				}
			}
		},
		choosePlayerCard: [
			async (event, trigger, player) => {
				const { target } = event;

				if (!event.dialog) {
					event.dialog = ui.create.dialog("hidden");
				} else if (!event.isMine()) {
					event.dialog.style.display = "none";
				}
				if (event.prompt) {
					event.dialog.add(event.prompt);
				} else {
					event.dialog.add("选择" + get.translation(target) + "的一张牌");
				}
				if (event.prompt2) {
					event.dialog.addText(event.prompt2);
				}
				let expand_length = 0;
				for (let i = 0; i < event.position.length; i++) {
					if (event.position[i] == "h") {
						let hs = target.getCards("h");
						if (hs.length) {
							expand_length += Math.ceil(hs.length / 6);
							let title = event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
							title.style.margin = "0px";
							title.style.padding = "0px";
							hs.randomSort();
							if (event.visible || target.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, target, true)) {
								event.dialog.add(hs);
								directh = false;
							} else {
								let shown = hs.filter(card => get.is.shownCard(card));
								if (shown.length) {
									let hidden = hs.filter(card => !shown.includes(card));
									let buttons = ui.create.div(".buttons", event.dialog.content);
									event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
									event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
									if (event.dialog.forcebutton !== false) {
										event.dialog.forcebutton = true;
									}
									if (event.dialog.buttons.length > 3) {
										event.dialog.classList.remove("forcebutton-auto");
									} else if (!event.dialog.noforcebutton) {
										event.dialog.classList.add("forcebutton-auto");
									}
									directh = false;
								} else {
									event.dialog.add([hs, "blank"]);
								}
							}
						}
					} else if (event.position[i] == "e") {
						let es = target.getVCards("e");
						if (es.length) {
							expand_length += Math.ceil(es.length / 6);
							let title = event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
							title.style.margin = "0px";
							title.style.padding = "0px";
							event.dialog.add([es, "vcard"]);
							directh = false;
						}
					} else if (event.position[i] == "j") {
						let js = target.getVCards("j");
						if (js.length) {
							expand_length += Math.ceil(js.length / 6);
							let title = event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
							title.style.margin = "0px";
							title.style.padding = "0px";
							let shown = js.filter(card => {
								let name = card.viewAs || card.name,
									info = lib.card[name];
								if (!info || !info.blankCard) {
									return true;
								}
								return false;
							});
							if (shown.length < js.length && !target.isUnderControl(true)) {
								let hidden = js.filter(card => !shown.includes(card));
								let buttons = ui.create.div(".buttons", event.dialog.content);
								event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(shown, "card", buttons));
								event.dialog.buttons = event.dialog.buttons.concat(ui.create.buttons(hidden, "blank", buttons));
								if (event.dialog.forcebutton !== false) {
									event.dialog.forcebutton = true;
								}
								if (event.dialog.buttons.length > 3) {
									event.dialog.classList.remove("forcebutton-auto");
								} else if (!event.dialog.noforcebutton) {
									event.dialog.classList.add("forcebutton-auto");
								}
							} else {
								event.dialog.add([js, "vcard"]);
							}
							directh = false;
						}
					}
				}
				if (event.dialog.buttons.length == 0) {
					event.finish();
					return;
				} else {
					if (event.isMine()) {
						if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
							ui.click.cancel();
							return;
						}
						event.dialog.open();
						game.check();
						game.pause();
						if (expand_length > 2) {
							ui.arena.classList.add("choose-player-card");
							event.dialog.classList.add("fullheight");
						}
					} else if (event.isOnline()) {
						event.send();
					} else {
						event.result = "ai";
					}
				}
			},
			async (event, trigger, player) => {
				const { forced } = event;
				if (event.result == "ai") {
					game.check();
					if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
						ui.click.ok();
					} else {
						ui.click.cancel();
					}
				}
				event.dialog.close();
				if (event.result.links) {
					event.result.cards = event.result.links.slice(0);
				}
				event.resume();
				return new Promise(resolve => {
					let timeout = setTimeout(() => {
						clearTimeout(timeout);
						resolve();
					}, 500);
				}).then(() => void ui.arena.classList.remove("choose-player-card"));
			},
		],
		ai: {
			order: 8,
			result: {
				target(player, target) {
					return player == target ? -1 : Math.random();
				},
				player: 1,
			},
		},
	},
	jlsgsy_luanzheng: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "useCardToPlayer",
		},
		usable: 1,
		filter(event, player) {
			return event.targets.length == 1 && event.player != player && ["basic", "trick"].includes(get.type(event.card)) && game.countPlayer(p => !event.targets.includes(p));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("jlsgsy_luanzheng"), `每回合限一，你可以为${get.translation(trigger.card)}额外指定一个目标`)
				.set("filterTarget", (_, player, target) => !get.event().targetsx.includes(target))
				.set("ai", target => get.effect(target, get.event().card, get.event().user, player))
				.set("targetsx", trigger.targets)
				.set("card", trigger.card)
				.set("user", trigger.player)
				.forResult();
		},
		async content(event, trigger, player) {
			game.log(event.targets, "成为了", trigger.card, "额外目标");
			trigger.targets.addArray(event.targets);
		},
		ai: {
			threaten: 3,
		},
	},
	jlsgsy_baonuzhangrang: {
		inherit: "jlsgsy_baonu",
		animationStr: "灵帝, 都得叫我一声爹呢!",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_baonudiaochan: {
		inherit: "jlsgsy_baonu",
		animationStr: "可惜、已经晚了！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_meihuo: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			if (!player.countCards("h")) {
				return false;
			}
			return game.countPlayer(current => current != player && current.hasSex("male"));
		},
		filterTarget(card, player, target) {
			return player != target && target.hasSex("male");
		},
		selectCard: [1, Infinity],
		filterCard: true,
		check(card) {
			if (card.name == "du") {
				return 20;
			}
			const player = get.owner(card);
			if (card.name != "sha" && get.type(card) != "trick") {
				return 0;
			}
			let info = get.info(card);
			if (info.singleCard || info.notarget) {
				return 0;
			}
			const users = game.filterPlayer(current => current != player);
			return users.some(user => {
				const att = get.sgnAttitude(player, user),
					eff = user.getUseValue(card, false, false);
				return att * eff > 0;
			});
		},
		discard: false,
		lose: false,
		delay: false,
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards,
			} = event;
			await player.give(cards, target);
			const useCards = target.getCards("h", c => {
				if (c.name != "sha" && get.type(c) != "trick") {
					return false;
				}
				return target.hasUseTarget(c, false, false);
			});
			const { targets: toTargets } = await player
				.chooseTarget([1, Infinity], `请选择${get.translation(target)}使用牌的目标"`, true)
				.set("filterTarget", (_, player, target) => target != get.event().preTarget)
				.set("ai", target => {
					const player = get.player(),
						preTarget = get.event().preTarget,
						useCards = get.event().useCards;
					return useCards.reduce((sum, card) => {
						if (!preTarget.canUse(card, target, false, false)) {
							return sum;
						}
						return sum + get.effect(target, card, preTarget, player);
					}, 0);
				})
				.set("preTarget", target)
				.set("useCards", useCards)
				.forResult();
			if (!useCards.length || !toTargets?.length) {
				await game.delay();
				return;
			}
			player.line(toTargets);
			useCards.randomSort();
			while (useCards.length) {
				if (!target.isIn()) {
					break;
				}
				let card = useCards.shift();
				if (!target.getCards("h").includes(card)) {
					continue;
				}
				let targets = toTargets.filter(current => target.canUse(card, current, false, false) && current.isIn());
				if (targets.length) {
					await target.useCard(card, targets, "noai");
				}
			}
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					if (ui.selected.cards.some(card => card.name == "du")) {
						return -0.5;
					}
					if (player.storage.jlsgsy_meihuo) {
						return;
					}
					player.setStorage("jlsgsy_meihuo", true);
					const useEff = ui.selected.cards.reduce((sum, card) => target.getUseValue(card, false, false), 0);
					player.setStorage("jlsgsy_meihuo", undefined);
					return Math.log(useEff);
				},
			},
		},
	},
	jlsgsy_yaoyan: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			target: "useCardToTarget",
		},
		filter(event, player) {
			const info = get.info(event.card);
			if (info.multitarget) {
				return false;
			}
			return event.player != player && ["basic", "trick"].includes(get.type(event.card)) && !event.targets.includes(event.player);
		},
		forced: true,
		logTarget: "player",
		async content(event, trigger, player) {
			game.log(trigger.player, "成为", trigger.card, "的额外目标");
			trigger.getParent().targets.push(trigger.player);
			trigger.getParent().triggeredTargets2.push(trigger.player);
			await game.delayx();
		},
		ai: {
			effect: {
				target_use(card, player, target) {
					if (player == target) {
						return;
					}
					const info = get.info(card);
					if (["basic", "trick"].includes(get.type(card)) || info.multitarget) {
						return;
					}
					if (target.storage.jlsgsy_yaoyan) {
						return;
					}
					target.setStorage("jlsgsy_yaoyan", true);
					let result = [1, 0, 1, get.effect(player, card, player, player) / 2];
					target.setStorage("jlsgsy_yaoyan", undefined);
					return result;
				},
			},
		},
	},
	jlsgsy_miluan: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "damageEnd",
		},
		filter(event, player) {
			return game.filterPlayer(current => current != player).some(current => current.countGainableCards(player, "h"));
		},
		check(event, player) {
			let gain = game.filterPlayer(current => current != player).reduce((a, b) => a + b.countGainableCards(player, "h"), 0);
			let lose = Math.floor((gain + player.countCards("h")) / 2);
			return gain * 1.2 > lose;
		},
		logTarget(event, player) {
			return game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
		},
		async content(event, trigger, player) {
			const gainCards = [];
			for (let target of event.targets) {
				let gainableCards = target.getGainableCards(player, "h");
				if (gainableCards.length) {
					target.$give(gainableCards, player);
					gainCards.addArray(gainableCards);
				}
			}
			if (gainCards.length) {
				await game
					.loseAsync({
						gain_list: [[player, gainCards]],
						animate: "gain",
					})
					.setContent("gaincardMultiple");
			} else {
				await game.delay();
			}
			if (!player.hasCards("h")) {
				return;
			}
			let giveNum = Math.floor(player.countCards("h") / 2),
				hs = player.getCards("h").slice(0);
			const gain_list = [],
				list = new Array(event.targets.length).fill(0);
			while (giveNum > 0) {
				let index = Math.floor(Math.random() * event.targets.length);
				list[index]++;
				giveNum--;
			}
			for (let i = 0; i < event.targets.length; i++) {
				let num = list[i];
				if (num > 0) {
					gain_list.push([event.targets[i], hs.randomRemove(list[i])]);
				}
			}
			await game
				.loseAsync({
					gain_list,
					cards: gain_list.map(i => i[1]).flat(),
					player,
					giver: player,
					animate: "giveAuto",
				})
				.setContent("gaincardMultiple");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	jlsgsy_baonuyuanshao: {
		inherit: "jlsgsy_baonu",
		animationStr: "都是蝼蚁！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_mojian: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		filter(event, player) {
			if (event.name == "phaseZhunbei") {
				return true;
			}
			return game.hasPlayer(p =>
				p.getHistory("respond").some(e => {
					if (e.card.name != "shan") {
						return false;
					}
					let wj = e.getParent(2);
					return wj.name == "wanjian" && wj.card.jlsgsy_mojian;
				})
			);
		},
		forced: true,
		async content(event, trigger, player) {
			await player.chooseUseTarget({ name: "wanjian", isCard: true, jlsgsy_mojian: true }, true);
		},
	},
	jlsgsy_zhuzai: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			source: "damageBegin1",
			player: "damageBegin1",
		},
		forced: true,
		filter(event, player) {
			return event.card && get.type2(event.card) == "trick";
		},
		async content(event, trigger, player) {
			if (trigger.player == player) {
				trigger.num -= 1;
			}
			if (trigger.source == player) {
				trigger.num += 1;
			}
		},
		ai: {
			notrick: true,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == "trick" && get.tag(card, "damage")) {
						return "zeroplayertarget";
					}
				},
			},
		},
	},
	jlsgsy_duoji: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			source: "die",
		},
		logTarget: "player",
		forced: true,
		async content(event, trigger, player) {
			await player.gain({ cards: trigger.player.getGainableCards(player, "he"), animate: "give" });
			const skills = trigger.player.getSkills(null, false, false).filter(function (i) {
				const info = get.info(i);
				return info && !info.charlotte;
			});
			if (skills.length) {
				await player.addSkills(skills);
			}
		},
	},
	jlsgsy_baonusunluban: {
		inherit: "jlsgsy_baonu",
		animationStr: "这般无礼！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_quanqing: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		enable: "phaseUse",
		filter(event, player) {
			const storage = player.getStorage("jlsgsy_quanqing", { shown: [] });
			return player.countCards("h", c => !storage.shown.includes(c)) && game.hasPlayer(current => get.info("jlsgsy_quanqing").filterTarget(null, player, current));
		},
		filterCard(card, player) {
			return !player.getStorage("jlsgsy_quanqing", { shown: [] }).shown?.includes(card) || false;
		},
		check(card) {
			const player = get.player();
			let hs = player.getCards("h", c => !player.getStorage("jlsgsy_quanqing", { shown: [] }).shown.includes(c)).sort((a, b) => get.number(a, player) - get.number(b, player));
			return hs.filter((v, i) => i == 0 || i == hs.length - 1).includes(card);
		},
		filterTarget(card, player, target) {
			return player != target && !player.getStorage("jlsgsy_quanqing", { targets: [] }).targets.includes(target);
		},
		discard: false,
		lose: false,
		delay: false,
		async content(event, trigger, player) {
			await player.showCards(event.cards);
			const storage = player.getStorage(event.name, { shown: [], targets: [] }),
				target = event.target;
			storage.shown.add(event.cards[0]);
			storage.targets.add(target);
			player.setStorage(event.name, storage, true);
			let result;
			if (target.countCards("he", c => get.number(c, target) > get.number(cards[0]))) {
				const next = target
					.chooseToDiscard(c => get.number(c) > _status.event.number)
					.set("number", get.number(cards[0]))
					.set("recover", player.isDamaged());
				if (get.attitude(target, player) < 0) {
					next.set("ai", c => {
						let v = 9 - get.value(c);
						if (_status.event.recover) {
							v += 4;
						}
						return v - 2 * Math.random();
					});
				} else {
					next.set("ai", () => 0);
				}
				result = await next.forResult();
			} else {
				result = { bool: false };
			}
			if (result.bool) {
				delete storage.choice;
				player.setStorage(event.name, storage, true);
				return;
			}
			const list = get.inpileVCardList(v => {
				if (!["basic", "trick"].includes(get.type(v[2], null, false))) {
					return false;
				}
				let card = get.autoViewAs({ name: v[2], nature: v[3], isCard: true }, []);
				return target.hasUseTarget(card);
			});
			result = await player
				.chooseButton({
					createDialog: ["", `###权倾###请选择${get.translation(target)}使用的牌`, [list, "vcard"]],
					ai(button) {
						return button.link[2] === _status.event.choice[0] && (button.link[3] || true) === (_status.event.choice?.[1] || true);
					},
				})
				.set("choice", storage.choice || [])
				.forResult();
			delete storage.choice;
			player.setStorage(event.name, storage, true);
			if (!result?.bool || !result.links?.length) {
				return;
			}
			let card = { name: result.links[0][2], nature: result.links[0][3] };
			let info = get.info(card);
			let range;
			if (!info.notarget) {
				let select = get.copy(info.selectTarget);
				if (select == undefined) {
					range = [1, 1];
				} else if (typeof select == "number") {
					range = [select, select];
				} else if (get.itemtype(select) == "select") {
					range = select;
				} else if (typeof select == "function") {
					range = select(card, target);
				}
				game.checkMod(card, target, range, "selectTarget", target);
			}
			if (info.notarget || range[1] == -1) {
				await target.chooseUseTarget(card, true);
			} else {
				const next = player.chooseTarget();
				next.set("_get_card", card);
				next.set("filterTarget", function (card, player, target) {
					return lib.filter.targetInRange(card, _status.event.subject, target) && lib.filter.targetEnabledx(card, _status.event.subject, target);
				});
				next.set("ai", function (target) {
					const { _get_card: card, subject, player } = get.event();
					return get.effect_use(target, card, subject, player);
				});
				next.set("selectTarget", range);
				next.set("forced", true);
				next.set("subject", target);
				next.set("prompt", `选择${get.translation(card)}的目标`);
				next.set("prompt2", `由${get.translation(target)}使用`);
				result = await next.forResult();
				if (!result?.bool || !result.targets?.length) {
					return;
				}
				await target.useCard(card, result.targets, "noai");
			}
			if (player.isDamaged()) {
				await player.recover();
			}
		},
		ai: {
			order(skill, player) {
				if (!lib.skill.jlsgsy_quanqing.filter(null, player)) {
					return 0;
				}
				let hs = player.getCards("h", c => !player.getStorage("jlsgsy_quanqing", { shown: [] }).shown.includes(c));
				let numbers = hs.map(i => get.number(i, player)).filter(i => i != Infinity && typeof i == "number"),
					orders = hs.map(i => get.order(i, player)).filter(i => i != Infinity && typeof i == "number");
				return Math.max.apply(Math, numbers.concat(orders)) + 0.1;
			},
			result: {
				player(player, target) {
					const cards = get.inpileVCardList(v => {
						if (!["basic", "trick"].includes(get.type(v[2], null, false))) {
							return false;
						}
						let card = get.autoViewAs({ name: v[2], nature: v[3], isCard: true }, []);
						return target.hasUseTarget(card);
					});
					if (cards.length) {
						let choice,
							value = 0,
							keys = ["effect", "canUse", "effect_use", "getUseValue"];
						for (let [, , cardName, nature] of cards) {
							//神金传虚拟牌，cardid也不设置一下😅
							let card = get.autoViewAs({ name: cardName, nature: nature }, []);
							let newV = lib.skill.dcpandi.getUseValue(card, target, player);
							if (newV > value) {
								choice = [cardName, nature];
								value = newV;
							}
							//补救措施
							for (let key of keys) {
								let info = _status.event._tempCache[key];
								for (let i in info) {
									if (i.indexOf(player.playerid) > -1 && i.endsWith("-") && i.indexOf("c:") == -1) {
										delete _status.event._tempCache[key][i];
									}
								}
							}
						}
						if (choice) {
							const storage = player.getStorage("jlsgsy_quanqing", { shown: [], targets: [] });
							if (storage.choice?.[0] !== choice?.[0] || storage.choice?.[1] !== choice?.[1]) {
								storage.choice = choice;
								player.setStorage("jlsgsy_quanqing", storage, true);
							}
							return 1;
						}
					}
					return 0;
				},
				target(player, target) {
					if (lib.skill.jlsgsy_quanqing.ai.result.player.apply(this, arguments) > 0) {
						if (Math.floor(Math.random() * 7) + 1 > get.number(ui.selected.cards[0], player)) {
							return 1;
						}
					}
					return -1;
				},
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: ["jlsgsy_quanqing"],
			},
		},
	},
	jlsgsy_raomeng: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "phaseJudgeBegin",
		},
		forced: true,
		filter(event, player) {
			return event.player != player && !event.player.countCards("j");
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0 && !event.player.skipList.includes("phaseUse");
		},
		async content(event, trigger, player) {
			await trigger.player.executeDelayCardEffect("lebu");
		},
	},
	jlsgsy_yongjie: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter(event, player) {
			let dealers = player.getAllHistory("damage").map(e => e.source);
			return game.hasPlayer(p => p != player && dealers.includes(p));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget({
					prompt: get.prompt(event.skill),
					prompt2: `选择至少一名对你造成过伤害的其他角色，除非其弃置X张牌(X为其对你造成过伤害的次数)，否则你令其减1点体力上限`,
					selectTarget: [1, Infinity],
					filterTarget(card, player, target) {
						return target.hasAllHistory("sourceDamage", evt => evt.player == player);
					},
					ai(target) {
						const player = get.player();
						const att = get.attitude(player, target);
						if (att > 0) {
							return 0;
						}
						const damage = target.countAllHistory("sourceDamage", evt => evt.player == player),
							hs = target.countDiscardableCards(target, "he");
						return Math.min(target.isHealthy() ? 2 : 1, damage < hs ? damage : Infinity) - att / 10;
					},
				})
				.forResult();
		},
		async content(event, trigger, player) {
			for (let p of event.targets) {
				if (p.ai.shown > player.ai.shown) {
					player.addExpose(0.2);
				}
			}
			const targets = event.targets.slice(0).sortBySeat();
			while (targets.length) {
				const target = targets.shift();
				if (!target.isIn()) {
					continue;
				}
				const damage = target.countAllHistory("sourceDamage", evt => evt.player == player),
					hs = target.countDiscardableCards(target, "he");
				let result;
				if (damage > hs) {
					result = { bool: false };
				} else {
					result = await target
						.chooseToDiscard({
							prompt2: "否则减一点体力上限",
							position: "he",
							selectCard: [hs, hs],
							ai(card) {
								const player = get.player();
								if (player.maxHp == 1 && !player.storage.nohp) {
									return 20 - get.value(card);
								}
								let v = 7 - _status.event.selectCard[0] - get.value(card);
								if (player.isHealthy()) {
									v += 3;
								}
								return v;
							},
						})
						.forResult();
				}
				if (!result?.bool || !result.cards?.length) {
					await target.loseMaxHp({ num: 1 });
				}
			}
		},
	},
	jlsgsy_baonucaocao: {
		inherit: "jlsgsy_baonu",
		animationStr: "休叫天下人负我！",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_weiwu: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "damageEnd",
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw({ num: 2 });
			if (!trigger.cards.length) {
				return;
			}
			let cards = trigger.cards.slice().filterInD("od");
			const result = await player
				.chooseBool({
					prompt: `是否获得${get.translation(cards)}与弃牌堆的所有${get.translation({ name: trigger.card.name, nature: trigger.card.nature })}？`,
				})
				.set("frequentSkill", "jlsgsy_weiwu")
				.forResult();
			if (!result?.bool) {
				return;
			}
			cards.addArray(Array.from(ui.discardPile.childNodes).filter(c => c.name == trigger.card.name && ((!c.nature && !trigger.card.nature) || c.nature === trigger.card.nature)));
			if (cards.length) {
				await player.gain(cards, "gain2");
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) {
						return [1, -1];
					}
					if (get.tag(card, "damage")) {
						return [1, 2];
					}
				},
			},
		},
	},
	jlsgsy_duzun: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "phaseBegin",
		},
		filter(event, player) {
			let cnt = player.getStorage("jlsgsy_duzun", new Map()).get(event.player);
			return event.player != player && (!cnt || cnt < 2);
		},
		logTarget: "player",
		forced: true,
		async content(event, trigger, player) {
			const storage = player.getStorage(event.name, new Map()),
				target = trigger.player;
			let triggeredCnt = storage.get(target) || 0;
			storage.set(target, triggeredCnt + 1);
			player.setStorage(event.name, storage, true);
			const allChoices = ["使用【杀】的次数上限", "摸牌阶段摸牌基数", "体力上限"],
				choices = [];
			if (target.getCardUsable("sha", true) > 0) {
				choices.push(allChoices[0]);
			}
			if (target.getStorage(event.name + "_effect", [0, 0])[1] > -2) {
				choices.push(allChoices[1]);
			}
			choices.push(allChoices[2]);
			const result = await target
				.chooseControlList(choices, true)
				.set("ai", function () {
					return get.event().choice;
				})
				.set(
					"choice",
					(function () {
						let isFriend = get.attitude(target, player) > 0;
						if (isFriend) {
							if (choices.includes(allChoices[0]) && target.getCardUsable("sha", true) > 1) {
								return 0;
							}
							if (target.getDamagedHp() > 1) {
								return choices.indexOf(allChoices[2]);
							}
							return choices.map((_, i) => i).randomGet();
						}
						if (target.maxHp > 1) {
							return choices.indexOf(allChoices[2]);
						}
						return choices.map((_, i) => i).randomGet();
					})()
				)
				.forResult();
			if (typeof result?.index !== "number") {
				return;
			}
			let index = allChoices.indexOf(choices[result.index]);
			const { addMark } = get.info(event.name + "_effect");
			target.addSkill(event.name + "_effect");
			await addMark(target, index, -1);
			player.addSkill(event.name + "_effect");
			await addMark(player, index, 1);
		},
		subSkill: {
			effect: {
				charlotte: true,
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha" && player.storage.jlsgsy_duzun_buff) {
							return num + player.storage.jlsgsy_duzun_buff[0];
						}
					},
				},
				audio: "jlsgsy_duzun",
				locked: false,
				marktext: "尊",
				intro: {
					markcount(storage, player) {
						return Math.abs(storage.reduce((a, b) => a + b));
					},
					content(storage) {
						let str = [];
						if (storage[0] != 0) {
							str.push("使用【杀】的次数上限" + (storage[0] < 0 ? "" : "+") + storage[0]);
						}
						if (storage[1] != 0) {
							str.push("摸牌阶段摸牌基数" + (storage[1] < 0 ? "" : "+") + storage[1]);
						}
						return str.join("<br>");
					},
				},
				trigger: {
					player: "phaseDrawBegin2",
				},
				filter(event, player) {
					return !event.numFixed && player.getStorage("jlsgsy_duzun_effect", [0, 0])[1];
				},
				forced: true,
				async content(event, trigger, player) {
					trigger.num += player.getStorage("jlsgsy_duzun_effect", [0, 0])[1];
					if (trigger.num < 0) {
						trigger.num = 0;
					}
				},
				async addMark(player, type, cnt) {
					if (type === 2) {
						if (cnt > 0) {
							await player.gainMaxHp(cnt);
						} else {
							await player.loseMaxHp(-cnt);
						}
						return;
					}
					const storage = player.getStorage("jlsgsy_duzun_effect", [0, 0]);
					storage[type] += cnt;
					player.setStorage("jlsgsy_duzun_effect", storage, true);
					if (!storage.some(i => i)) {
						player.unmarkSkill("jlsgsy_duzun_effect");
					}
				},
			},
		},
		ai: {
			threaten: 2.5,
		},
	},
	jlsgsy_longbian: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "phaseBegin",
		},
		direct: true,
		filter(event, player) {
			const { countShaUsable } = get.info("jlsgsy_longbian"),
				draw = player.getStorage("jlsgsy_duzun_effect", [0, 0])[1];
			let cnt = [countShaUsable(player), 2 + draw, player.maxHp];
			return cnt.filter(cnt => cnt > 0).length >= 2;
		},
		async cost(event, trigger, player) {
			const { countShaUsable } = get.info(event.skill),
				draw = player.getStorage("jlsgsy_duzun_effect", [0, 0])[1];
			let cnt = [countShaUsable(player), 2 + draw, player.maxHp];
			const names = ["使用【杀】的次数上限", "摸牌阶段摸牌基数", "体力上限"];
			const list = names.map((value, index, array) => {
				let prompt = `令${value}+1,令`;
				for (let index2 of [0, 1, 2]) {
					if (index2 == index) {
						continue;
					}
					prompt += array[index2] + `(${cnt[index2]})`;
				}
				prompt += "互换";
				return prompt;
			});
			const next = player
				.chooseControlList({
					prompt: get.prompt(event.skill),
					list,
					ai(event, player) {
						const cnt = get.event().cnt;
						return [0, 1, 2]
							.filter(index => {
								if (index == 2) {
									return true;
								}
								return cnt[1 - index] > player.hp - 2;
							})
							.randomGet();
					},
				})
				.set("cnt", cnt);
			const result = await next.forResult();
			event.result = {
				bool: typeof result?.index === "number" && result.control !== "cancel2",
				cost_data: {
					index: result?.index,
					list,
					cnt,
				},
			};
		},
		async content(event, trigger, player) {
			const { index, list, cnt } = event.cost_data;
			game.log(player, list[index]);
			const { addMark } = get.info("jlsgsy_duzun_effect");
			player.addSkill("jlsgsy_duzun_effect");
			const otherTwo = [0, 1, 2].filter(index => index != index);
			const diff = cnt[otherTwo[0]] - cnt[otherTwo[1]];
			await addMark(player, otherTwo[0], -diff);
			await addMark(player, otherTwo[1], diff);
			await addMark(player, index, 1);
		},
		countShaUsable(player) {
			const card = get.autoViewAs({ name: "sha" }),
				name = "cardUsable";
			let num = get.info(card).usable,
				skills = [];
			if (typeof num == "function") {
				num = num(card, player);
			}
			if (typeof player.getModableSkills == "function") {
				skills = player.getModableSkills();
			} else if (typeof player.getSkills == "function") {
				skills = player.getSkills().concat(lib.skill.global);
				game.expandSkills(skills);
				skills = skills.filter(function (skill) {
					let info = get.info(skill);
					return info && info.mod;
				});
				skills.sort((a, b) => get.priority(a) - get.priority(b));
			}
			const arg = [card, player, num];
			skills.forEach(value => {
				let mod = get.info(value).mod[name];
				if (!mod) {
					return;
				}
				const result = mod.call(this, ...arg);
				if (!result || result === Infinity) {
					return;
				}
				if (typeof arg[arg.length - 1] != "object") {
					arg[arg.length - 1] = result;
				}
			});
			return arg[arg.length - 1];
		},
		ai: {
			combo: "jlsgsy_duzun",
		},
	},
	jlsgsy_baonuzoushi: {
		animationStr: "既然如此，接下来的表演，将军可要看好了",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_huoshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "useCardToPlayer",
		},
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			if (event.getParent("jlsgsy_mowu").name == "jlsgsy_mowu") {
				return false;
			}
			if (!event.isFirstTarget) {
				return false;
			}
			if (!["basic", "trick"].includes(get.type(event.card, event.player))) {
				return false;
			}
			let players = game.filterPlayer(cur => !event.targets.includes(cur));
			return players.length;
		},
		forced: true,
		async content(event, trigger, player) {
			let targetx = game.filterPlayer(cur => !trigger.targets.includes(cur)).randomGet();
			trigger.targets.add(targetx);
			trigger.player.line(targetx);
			game.log(targetx, "成为", trigger.card, "的额外目标");
			await game.delayx();
		},
	},
	jlsgsy_yinzi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["gainAfter", "loseAsyncAfter", "recoverAfter"],
		},
		getIndex(event, player) {
			if (event.name == "recover") {
				return [event.player];
			}
			if (!event.getg) {
				return [];
			}
			return game
				.filterPlayer(current => {
					if (current == player) {
						return false;
					}
					return event.getg(current)?.length;
				})
				.sortBySeat();
		},
		filter(event, player, name, target) {
			if (!target?.isIn() || target == player || target == _status.currentPhase) {
				return false;
			}
			if (event.name != "recover" && player.isHealthy()) {
				return false;
			}
			return !player.hasHistory("useSkill", evt => {
				if (evt.skill != "jlsgsy_yinzi") {
					return false;
				}
				if (!evt.targets || !evt.targets.includes(target)) {
					return false;
				}
				if (event.name == "recover") {
					return evt.event.triggername == "recoverAfter";
				}
				return true;
			});
		},
		forced: true,
		logTarget(event, player, name, target) {
			return target;
		},
		async content(event, trigger, player) {
			if (event.triggername != "recoverAfter") {
				await player.recover();
			} else {
				await player.draw(2);
			}
		},
	},
	jlsgsy_mowu: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "useCardAfter",
		},
		filter(event, player) {
			if (event.getParent("jlsgsy_mowu").name == "jlsgsy_mowu") {
				return false;
			}
			let targets = (event._targets || event.targets).slice().filter(i => i.isIn());
			if (!event.player.isIn()) {
				return false;
			}
			if (!["basic", "trick"].includes(get.type(event.card, event.player))) {
				return false;
			}
			if (event.player != player && !targets.includes(player)) {
				return false;
			} else if (event.player == player && !targets.remove(player).length) {
				return false;
			}
			return true;
		},
		check(event, player) {
			let targets = (event._targets || event.targets).slice().filter(i => i.isIn());
			let cardEff = targets.reduce((t, cur) => t + get.effect(cur, event.card, event.player, player), 0);
			let drawer = targets.addArray([player, event.player]).filter(i => i.isIn());
			let drawEff = drawer.reduce((t, cur) => t + get.effect(cur, { name: "draw" }, player, player), 0);
			return drawEff + cardEff > 0;
		},
		prompt(event, player) {
			let targets = (event._targets || event.targets)
				.slice()
				.add(event.player)
				.remove(player)
				.filter(i => i.isIn());
			return `魔舞：是否与${get.translation(targets)}各摸一张牌？<br>然后令${get.translation(event.card)}额外结算一次`;
		},
		async content(event, trigger, player) {
			let targets = (trigger._targets || trigger.targets).slice().filter(i => i.isIn());
			let drawer = targets
				.slice()
				.addArray([player, trigger.player])
				.filter(i => i.isIn());
			await game.asyncDraw(drawer);
			let card = get.autoViewAs(trigger.card, []);
			card.cards = [];
			if (targets.length) {
				await trigger.player.useCard(card, targets, false);
			}
		},
		ai: {
			expose: 0.4,
			threaten: 0.9,
		},
	},
	jlsgsy_baonumenghuo: {
		animationStr: "非要逼我，现出真身！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_qiushou: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (get.type(event.card) != "trick") {
				return false;
			}
			let source = event.player,
				target = event.target;
			if (source == player) {
				return target != player && target.isIn();
			}
			return source.isIn();
		},
		forced: true,
		logTarget(event, player) {
			let source = event.player,
				target = event.target;
			if (source == player) {
				return target;
			}
			return source;
		},
		async content(event, trigger, player) {
			let source = trigger.player,
				target = trigger.target,
				damage;
			if (source == player) {
				damage = target;
			} else {
				damage = source;
			}
			const result = await damage
				.chooseToRespond()
				.set("filterCard", card => get.name(card) == "sha")
				.set("ai", card => {
					const player = _status.event.player,
						source = get.event().source;
					if (get.damageEffect(player, source, player) > 0) {
						return 0;
					}
					return 8 - get.value(card);
				})
				.set("prompt", `${get.translation(player)}对你发动了【酋首】`)
				.set("prompt2", `请打出一张【杀】，或受到${get.translation(player)}造成的一点伤害`)
				.set("source", player)
				.forResult();
			if (!result.bool) {
				await damage.damage(1, player);
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target == player) {
						return;
					}
					if (get.type(card) != "trick") {
						return;
					}
					return [1, 0, 1, -2];
				},
				player(card, player, target) {
					if (target == player) {
						return;
					}
					if (get.type(card) != "trick") {
						return;
					}
					return [1, 0, 1, -2];
				},
			},
		},
	},
	jlsgsy_moshou: {
		audio: "ext:极略/audio/skill:3",
		init(player) {
			player.storage.jlsgsy_moshou = {
				1: 0,
				2: 0,
				3: 0,
			};
		},
		mark: true,
		marktext: "兽",
		intro: {
			markcount(storage, player) {
				return player.storage.jlsgsy_moshou_record;
			},
			mark(dialog, storage, player) {
				const addNewRow = lib.element.dialog.addNewRow.bind(dialog),
					itemContainerCss = { height: "20px" },
					map = ["无", "①", "②", "③"];
				if (get.is.phoneLayout()) {
					dialog.classList.add("fullheight");
				}
				dialog.css({ width: "20%" });
				for (let i = 0; i < 4; i++) {
					let list;
					if (i == 0) {
						list = [
							{ item: `当前效果`, ratio: 0.5, itemContainerCss },
							{
								item: `${map[player.storage.jlsgsy_moshou_record || 0]}`,
								ratio: 0.5,
								itemContainerCss,
							},
						];
					} else {
						list = [
							{ item: `效果${map[i]}`, ratio: 0.5, itemContainerCss },
							{
								item: `${get.cnNumber(storage[i.toString()])}次`,
								ratio: 0.5,
								itemContainerCss,
							},
						];
					}
					addNewRow(...list);
				}
			},
		},
		trigger: {
			player: "phaseBegin",
		},
		locked: true,
		logAudio(event, player, triggername, _, costResult) {
			const num = costResult.cost_data.num;
			return [`ext:极略/audio/skill/jlsgsy_moshou${num}.mp3`];
		},
		async cost(event, trigger, player) {
			let num = [1, 2, 3].remove(player.storage.jlsgsy_moshou_record).randomGet();
			event.result = {
				bool: true,
				cost_data: { num },
			};
		},
		async content(event, trigger, player) {
			const num = event.cost_data.num;
			player.storage.jlsgsy_moshou_record = num;
			player.storage.jlsgsy_moshou[num.toString()]++;
			player.update();
			if (num == 2) {
				let targets = game.filterPlayer().remove(player).sortBySeat(player);
				for (let target of targets) {
					player.line(target);
					game.log(target, "的非锁定技和装备技能失效了");
					target.addTempSkill("jlsgsy_moshou_2", { player: "phaseEnd" });
				}
			}
			await player.draw(player.storage.jlsgsy_moshou[num.toString()]);
		},
		getSkills(player) {
			let equipSkills = player.getCards("e").reduce((list, card) => {
					const info = get.info(card);
					if (info && info.skills) {
						return list.addArray(info.skills);
					}
					return list;
				}, []),
				skills = player.getSkills(null, false, false);
			return equipSkills.concat(skills).filter(skill => {
				let info = get.info(skill);
				return info && !get.is.locked(skill, player) && !info.charlotte && !info.persevereSkill;
			});
		},
		group: ["jlsgsy_moshou_1", "jlsgsy_moshou_3"],
		subSkill: {
			1: {
				trigger: {
					source: "damageSource",
				},
				filter(event, player) {
					if (player.storage.jlsgsy_moshou_record != 1) {
						return false;
					}
					if (event.player == player) {
						return false;
					}
					return event.num > 0;
				},
				forced: true,
				charlotte: true,
				async content(event, trigger, player) {
					if (trigger.player.countDiscardableCards(player, "he")) {
						await trigger.player.randomDiscard("he", 1);
					}
					await trigger.player.turnOver();
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (player.storage.jlsgsy_moshou_record != 1) {
								return;
							}
							if (get.tag(card, "damage")) {
								if (player.hasSkillTag("jueqing", false, target)) {
									return;
								}
								return [1, 0, 1, -1];
							}
						},
					},
				},
			},
			2: {
				init(player) {
					player.disableSkill("jlsgsy_moshou", lib.skill.jlsgsy_moshou.getSkills(player));
				},
				onremove(player) {
					player.enableSkill("jlsgsy_moshou");
				},
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (event.name == "equip" && event.player == player) {
						return true;
					}
					const evt = event.getl(player);
					return evt && evt.player == player && evt.es && evt.es.length;
				},
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				async content(event, trigger, player) {
					player.enableSkill("jlsgsy_moshou");
					player.disableSkill("jlsgsy_moshou", lib.skill.jlsgsy_moshou.getSkills(player));
				},
				ai: {
					neg: true,
					unequip_equip1: true,
				},
			},
			3: {
				get trigger() {
					return lib.jlsg.debuffSkill.trigger;
				},
				filter(event, player) {
					if (player.storage.jlsgsy_moshou_record != 3) {
						return false;
					}
					let key = lib.jlsg.debuffSkill.translate[event.name];
					let bool = lib.jlsg.debuffSkill.getInfo(event, player, key).bool;
					if (!bool) {
						return false;
					}
					if (key == "damage") {
						if (event.hasNature()) {
							return false;
						}
						if (!event.source || event.source == player) {
							return false;
						}
					} else if (["loseHp", "loseMaxHp", "removeSkill", "link", "turnOver", "disableSkill"].includes(key)) {
						if (event.getParent().player && event.getParent().player == player) {
							return false;
						}
						if (!event.getParent().player) {
							return false;
						}
					} else if (key == "discard") {
						let discarder = event.discarder || event.getParent(2).player;
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
				charlotte: true,
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
					} else {
						trigger.cancel();
					}
					game.log(player, "取消了", `#y${str}`);
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (player == target || target.storage.jlsgsy_moshou_record != 3) {
								return;
							}
							if (card.name == "tiesuo") {
								return "zerotarget";
							}
							if (card.name == "guohe") {
								return "zerotarget";
							}
							if (get.tag(card, "damage")) {
								if (get.tag(card, "natureDamage")) {
									return;
								}
								return "zerotarget";
							} else if (get.name(card) == "guohe") {
								return "zerotarget";
							} else if (get.name(card) == "tiesuo" && !target.isLinked()) {
								return "zerotarget";
							}
						},
					},
				},
			},
		},
	},
	jlsgsy_baonuzhangchunhua: {
		animationStr: "冥河不渡，永坠无间",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_diaoling: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: {
			global: "loseBefore",
		},
		filter(event, player) {
			const evt = event.getParent("phaseDiscard");
			if (evt?.player == event.player && evt?.name == "phaseDiscard") {
				return false;
			}
			if (event.player == player || !event.player.isIn() || event.type != "discard") {
				return false;
			}
			return event.cards.some(card => {
				if (get.owner(card) != event.player) {
					return false;
				}
				return ["h", "e"].includes(get.position(card));
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(`###${get.prompt("jlsgsy_diaoling", trigger.player)}###令${get.translation(trigger.player)}将此次弃牌改为失去等量体力`)
				.set("ai", (event, player) => {
					const trigger = event.getTrigger();
					const target = trigger.player,
						cards = trigger.cards.filter(card => {
							if (get.owner(card) != target) {
								return false;
							}
							return ["h", "e"].includes(get.position(card));
						});
					return get.value(cards, target) < (get.effect(target, { name: "losehp" }, player, player) * cards.length) / 2;
				})
				.forResult();
			if (event.result?.bool) {
				event.result.targets = [trigger.player];
			}
		},
		async content(event, trigger, player) {
			const { player: target } = trigger;
			game.log(player, "取消了", target, "的弃牌");
			const cards = trigger.cards.filter(card => {
				if (get.owner(card) != target) {
					return false;
				}
				return ["h", "e"].includes(get.position(card));
			});
			trigger.cards.removeArray(cards);
			if (!trigger.cards.length) {
				trigger.cancel();
			}
			await target.loseHp(cards.length);
		},
	},
	jlsgsy_ejue: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		trigger: {
			player: "damageEnd",
		},
		filter(event, player) {
			if (event.name == "damage") {
				return event.num > 0;
			}
			if (player.isPhaseUsing()) {
				return !player.hasSkill("jlsgsy_ejue_used", null, false, false);
			}
			return false;
		},
		prompt: "是否发动【扼绝】？",
		prompt2: "摸两张牌并弃置其中一张，然后令所有其他角色弃置点数小于此牌的所有相同类型的牌，最后你从弃牌堆里随机获得每名角色以此法弃置的各一张牌。",
		check(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			if (!trigger) {
				player.addTempSkill("jlsgsy_ejue_used", { player: "phaseUseAfter" });
			}
			const { cards: draw } = await player.draw({ num: 2 }).forResult();
			if (!draw?.length) {
				return;
			}
			const discard = await player
				.chooseToDiscard("扼绝：弃置一张牌")
				.set("filterCard", card => get.event().cardx.includes(card))
				.set("ai", card => (8 - get.value(card)) * (14 - get.number(card)))
				.set("cardx", draw)
				.forResult();
			if (!discard?.cards?.length) {
				return;
			}
			const cardx = discard.cards[0];
			const targets = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
			player.line(targets);
			for (const target of targets) {
				const cards = target.getDiscardableCards(target, "he", card => {
					if (get.type2(card, target) != get.type2(cardx, player)) {
						return false;
					}
					return get.number(card, target) < get.number(cardx);
				});
				if (!cards.length) {
					continue;
				}
				await target.discard(cards, "notBySelf");
			}
			const cardsList = targets.reduce((list, target) => {
				const history = target.getHistory("lose", evt => evt.getParent(2) == event),
					sum = list.slice().flat();
				const cardsx = history
					.map(evt => evt.cards.filterInD("d"))
					.flat()
					.unique();
				cardsx.removeArray(sum);
				if (cardsx.length) {
					list.push(cardsx);
				}
				return list;
			}, []);
			if (!cardsList.length) {
				return;
			}
			const cards = cardsList.map(list => list.randomGet());
			await player.gain(cards, "gain2");
		},
		subSkill: {
			used: { charlotte: true },
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
	},
	jlsgsy_jianmie: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			aiOrder(player, card, num) {
				if (get.name(card, player) == "sha") {
					if (typeof card.hasNature === "function" && !card.hasNature()) {
						return num + 2;
					}
				}
			},
		},
		trigger: {
			player: "useCard1",
		},
		filter(event, player) {
			if (event.targets.some(target => target.countCards("h") >= player.countCards("h"))) {
				return false;
			}
			return event.card.name == "sha";
		},
		forced: true,
		async content(event, trigger, player) {
			const original = get.translation(trigger.card);
			game.setNature(trigger.card, "fire");
			game.log(player, "将", `#y${original}`, "改为", trigger.card);
			if (trigger.addCount !== false) {
				trigger.addCount = false;
				trigger.player.getStat().card.sha--;
			}
		},
		group: ["jlsgsy_jianmie_dying"],
		subSkill: {
			dying: {
				sourceSkill: "jlsgsy_jianmie",
				sub: true,
				audio: "jlsgsy_jianmie",
				trigger: {
					global: "dyingBefore",
				},
				filter(event, player) {
					if (event.player == player || event.player.countCards("h") >= player.countCards("h")) {
						return false;
					}
					const phase = event.getParent("phase");
					return phase?.player == player && phase.name == "phase";
				},
				forced: true,
				firstDo: true,
				logTarget: "player",
				async content(event, trigger, player) {
					trigger.player.chat("孩子们，我坠机了");
					await trigger.player.die(trigger.reason);
				},
			},
		},
	},
	jlsgsy_baonuliru: {
		animationStr: "仁义？天道？今日，唯有魔道！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_moce: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			const guohe = get.autoViewAs({ name: "guohe" }, "unsure");
			return event.filterCard(guohe, player, event) && !event.jlsgsy_moce;
		},
		filterTarget(card, player, target) {
			const guohe = get.autoViewAs({ name: "guohe" }, "unsure");
			return player.canUse(guohe, target);
		},
		filterCard: () => false,
		selectCard: -1,
		viewAs: { name: "guohe", isCard: false },
		log: false,
		async precontent(event, trigger, player) {
			player.logSkill("jlsgsy_moce", event.result.targets);
			let evt = event.getParent(),
				maps = game
					.filterPlayer(/*current => current != player*/)
					.map(current => {
						return [
							current,
							current.getCards("he", card => {
								if (get.suit(card) != "spade") {
									return false;
								}
								return evt.filterCard(get.autoViewAs({ ...event.result.card, cards: [card] }, [card]), player, evt);
							}),
						];
					})
					.filter(map => map[1].length);
			evt.set("jlsgsy_moce", true);
			if (!maps.length) {
				player.chat("尽是些酒囊饭袋！");
				evt.goto(0);
				return;
			} else {
				let map = maps.randomGet();
				let card = map[1].randomGet();
				event.result.cards = [card];
				event.result.card = get.autoViewAs({ name: "guohe", storage: { jlsgsy_moce: map[0] } }, [card]);
			}
		},
		group: "jlsgsy_moce_draw",
		subSkill: {
			draw: {
				audio: false,
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player) {
					return event.skill == "jlsgsy_moce" && event.card.name == "guohe";
				},
				forced: true,
				async content(event, trigger, player) {
					const source = trigger.card.storage?.jlsgsy_moce;
					if (source && source != player) {
						await player.draw(1);
					}
				},
			},
		},
		ai: {
			wuxie: (target, card, player, viewer, status) => {
				if (
					!target.countCards("hej") ||
					status * get.attitude(viewer, player._trueMe || player) > 0 ||
					(target.hp > 2 &&
						!target.hasCard(i => {
							let val = get.value(i, target),
								subtypes = get.subtypes(i);
							if (val < 8 && target.hp < 2 && !subtypes.includes("equip2") && !subtypes.includes("equip5")) {
								return false;
							}
							return val > 3 + Math.min(5, target.hp);
						}, "e") &&
						target.countCards("h") * _status.event.getRand("guohe_wuxie") > 1.57)
				) {
					return 0;
				}
			},
			basic: {
				order: 9,
				useful: (card, i) => 10 / (3 + i),
				value: (card, player) => {
					let max = 0;
					game.countPlayer(cur => {
						max = Math.max(max, lib.card.guohe.ai.result.target(player, cur) * get.attitude(player, cur));
					});
					if (max <= 0) {
						return 5;
					}
					return 0.42 * max;
				},
			},
			yingbian(card, player, targets, viewer) {
				if (get.attitude(viewer, player) <= 0) {
					return 0;
				}
				if (
					game.hasPlayer(function (current) {
						return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
					})
				) {
					return 6;
				}
				return 0;
			},
			button: button => {
				let player = _status.event.player,
					target = _status.event.target;
				if (!lib.filter.canBeDiscarded(button.link, player, target)) {
					return 0;
				}
				let att = get.attitude(player, target),
					val = get.buttonValue(button),
					pos = get.position(button.link),
					name = get.name(button.link);
				if (pos === "j") {
					let viewAs = button.link.viewAs;
					if (viewAs === "lebu") {
						let needs = target.needsToDiscard(2);
						val *= 1.08 + 0.2 * needs;
					} else if (viewAs === "shandian" || viewAs === "fulei") {
						val /= 2;
					}
				}
				if (att > 0) {
					val = -val;
				}
				if (pos !== "e") {
					return val;
				}
				let sub = get.subtypes(button.link);
				if (sub.includes("equip1")) {
					return (val * Math.min(3.6, target.hp)) / 3;
				}
				if (sub.includes("equip2")) {
					if (name === "baiyin" && pos === "e" && target.isDamaged()) {
						let by = 3 - 0.6 * Math.min(5, target.hp);
						return get.sgn(get.recoverEffect(target, player, player)) * by;
					}
					return 1.57 * val;
				}
				if (att <= 0 && (sub.includes("equip3") || sub.includes("equip4")) && (player.hasSkill("shouli") || player.hasSkill("psshouli"))) {
					return 0;
				}
				if (sub.includes("equip6")) {
					return val;
				}
				if (sub.includes("equip4")) {
					return val / 2;
				}
				if (
					sub.includes("equip3") &&
					!game.hasPlayer(cur => {
						return !cur.inRange(target) && get.attitude(cur, target) < 0;
					})
				) {
					return 0.4 * val;
				}
				return val;
			},
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					const hs = target.getDiscardableCards(player, "h");
					const es = target.getDiscardableCards(player, "e");
					const js = target.getDiscardableCards(player, "j");
					if (!hs.length && !es.length && !js.length) {
						return 0;
					}
					if (att > 0) {
						if (
							js.some(card => {
								const cardj = card.viewAs ? { name: card.viewAs } : card;
								if (cardj.name === "xumou_jsrg") {
									return false;
								}
								return get.effect(target, cardj, target, player) < 0;
							})
						) {
							return 3;
						}
						if (target.isDamaged() && es.some(card => card.name === "baiyin") && get.recoverEffect(target, player, player) > 0) {
							if (target.hp === 1 && !target.hujia) {
								return 1.6;
							}
						}
						if (
							es.some(card => {
								return get.value(card, target) < 0;
							})
						) {
							return 1;
						}
						return -1.5;
					} else {
						const noh = hs.length === 0 || target.hasSkillTag("noh");
						const noe = es.length === 0 || target.hasSkillTag("noe");
						const noe2 =
							noe ||
							!es.some(card => {
								return get.value(card, target) > 0;
							});
						const noj =
							js.length === 0 ||
							!js.some(card => {
								const cardj = card.viewAs ? { name: card.viewAs } : card;
								if (cardj.name === "xumou_jsrg") {
									return true;
								}
								return get.effect(target, cardj, target, player) < 0;
							});
						if (noh && noe2 && noj) {
							return 1.5;
						}
						return -1.5;
					}
				},
			},
			tag: {
				loseCard: 1,
				discard: 1,
			},
		},
	},
	jlsgsy_fenjie: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		trigger: {
			player: "phaseBegin",
		},
		forced: true,
		async content(event, trigger, player) {
			let num = player.getStorage(event.name, 0),
				targets = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase || player);
			for (const target of targets) {
				if (target.isIn()) {
					player.line(target);
					if (num == 0) {
						await target.gainMaxHp(1);
						await target.draw(2);
					} else if (num == 1) {
						const cards = target.getDiscardableCards(target, "he", card => get.color(card) == "red");
						if (cards.length) {
							await target.discard(cards).set("discarder", target);
						}
					} else {
						await target.damage(player, 2, "fire");
					}
				}
			}
			num++;
			player.setStorage(event.name, num);
		},
	},
	jlsgsy_jinmie: {
		audio: "ext:极略/audio/skill:2",
		//usable: 1,
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		getIndex(event, player) {
			return game
				.filterPlayer(current => {
					if (current == player) {
						return false;
					}
					let evt = event.getl(current);
					return evt?.hs?.length;
				})
				.sortBySeat(_status.currentPhase || player);
		},
		filter(event, player, triggername, target) {
			return !player.hasStorage("jlsgsy_jinmie_used", target) && !target.countCards("h") && target.isDamaged() && target.hp > 0;
		},
		prompt(event, player, triggername, target) {
			return get.prompt("jlsgsy_jinmie", target);
		},
		prompt2(event, player, triggername, target) {
			return `对其造成${target.hp}点火焰伤害`;
		},
		check(event, player, triggername, target) {
			return get.damageEffect(target, player, player, "fire") > 0;
		},
		logTarget(event, player, triggername, target) {
			return target;
		},
		async content(event, trigger, player) {
			player.addTempSkill(`${event.name}_used`);
			player.markAuto(`${event.name}_used`, event.targets);
			const target = event.targets[0];
			await target.damage(player, target.hp, "fire");
		},
		global: ["jlsgsy_jinmie_ai"],
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
				mark: true,
				intro: {
					content: `本回合已对$发动过`,
				},
			},
			ai: {
				sub: true,
				sourceSkill: "jlsgsy_jinmie",
				charlotte: true,
				ai: {
					effect: {
						target_use(card, player, target) {
							let currents = game.filterPlayer(current => {
								if (!current.hasSkill("jlsgsy_jinmie")) {
									return false;
								}
								return !current.hasSkill("counttrigger") || current.storage?.counttrigger?.jlsgsy_jinmie < 1;
							});
							if (!currents.length) {
								return;
							}
							let playerH = player.getCards("h");
							if (playerH.length == 1 && (card == playerH[0] || (Array.isArray(card?.cards) && card?.cards?.includes(player[0])))) {
								if (currents.some(current => get.attitude(player, current) < 0) && !player.hasSkillTag("nofire")) {
									return [1, 0, 1, -player.getHp()];
								}
							}
						},
					},
				},
			},
		},
	},
	jlsgsy_baonuyuanshu: {
		animationStr: "弑君之罪，当诛九族！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_wangzun: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			attackRange(player, num) {
				return num + player.countExpansions("jlsgsy_wangzun");
			},
			cardUsable(card, player, num) {
				if (card.name == "sha") {
					return num + player.countExpansions("jlsgsy_wangzun");
				}
			},
			maxHandcard(player, num) {
				return num - player.countExpansions("jlsgsy_wangzun");
			},
		},
		marktext: "玺",
		intro: {
			markcount: "expansion",
			content: "expansion",
		},
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		forced: true,
		logTarget(event, player) {
			const xi = player.getExpansions("jlsgsy_wangzun");
			if (!xi.length) {
				return game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase);
			}
			return player;
		},
		async content(event, trigger, player) {
			const xi = player.getExpansions(event.name);
			if (!xi.length) {
				for (const target of event.targets) {
					if (!target.isIn() || !target.countCards("he")) {
						continue;
					}
					const result = await player.choosePlayerCard(`###妄尊###请选择${get.translation(target)}的一张牌`, target, "he", true).forResult();
					if (result.bool && result.links.length) {
						const next = player.addToExpansion(target, result.links, "give", "log");
						next.gaintag.add(event.name);
						await next;
					}
				}
				if (!player.hasSkill(`${event.name}_effect`)) {
					player.addSkill(`${event.name}_effect`);
				}
			} else {
				const result = await player.chooseCardButton(true, "妄尊：选择获得一张“玺”", xi).forResult();
				if (result.bool && result.links.length) {
					await player.gain(result.links, player, "giveAuto");
					await player.recover(1);
				}
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: {
					player: "phaseDrawBegin2",
				},
				filter(event, player) {
					if (!player.countExpansions("jlsgsy_wangzun")) {
						return false;
					}
					return event.num > 0 && !event.numFixed;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.num += player.countExpansions("jlsgsy_wangzun");
				},
			},
		},
	},
	jlsgsy_jiantian: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardToTargeted",
		},
		filter(event, player) {
			if (event.card.name != "sha" && get.type(event.card) != "trick") {
				return false;
			} else if (get.tag(event.card, "damage") < 1) {
				return false;
			}
			return event.getParent().triggeredTargets4.length == 1;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(`###${get.prompt(event.skill)}###令${get.translation(trigger.card)}伤害+1且不能被响应`)
				.set("ai", (event, player) => {
					const trigger = event.getTrigger();
					const eff = trigger.targets.reduce((sum, target) => sum + get.effect(target, trigger.card, player, player), 0);
					return eff > 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			trigger.getParent().baseDamage++;
			trigger.getParent().directHit = game.players;
			player.addSkill(`${event.name}_debuff`);
			player.storage[`${event.name}_debuff`]++;
			player.markSkill(`${event.name}_debuff`);
		},
		subSkill: {
			debuff: {
				charlotte: true,
				init(player, skill) {
					player.setStorage(skill, 0, true);
				},
				onremove: true,
				mark: true,
				marktext: "僭",
				intro: {
					content(storage, player) {
						return "下次受到的伤害+" + storage;
					},
				},
				trigger: {
					player: "damageBegin3",
				},
				forced: true,
				pupup: false,
				async content(event, trigger, player) {
					trigger.num += player.getStorage(event.name, 0);
					player.removeSkill(event.name);
				},
			},
		},
	},
	jlsgsy_zhonggu: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: {
			player: ["damageEnd", "loseHpAfter", "loseMaxHpAfter", "loseAfter", "changeSkillsAfter", "linkAfter", "turnOverAfter", "disableSkillEnd"],
		},
		filter(event, player) {
			const key = lib.jlsg.debuffSkill.translate[event.name];
			const bool = lib.jlsg.debuffSkill.getInfo(event, player, key).bool;
			if (["link", "turnOver"].includes(event.name)) {
				return !bool;
			}
			return bool;
		},
		async cost(event, trigger, player) {
			const result = await player
				.chooseBool(`###${get.prompt(event.skill)}###令所有其他角色${lib.jlsg.debuffSkill.getInfo(trigger, player).str}`)
				.set("ai", (event, player) => {
					return true;
				})
				.forResult();
			event.result = {
				bool: result.bool,
				targets: game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase),
			};
		},
		async content(event, trigger, player) {
			let key = lib.jlsg.debuffSkill.translate[trigger.name],
				info = lib.jlsg.debuffSkill.getInfo(trigger, player, key);
			if (key == "removeSkill") {
				key = "removeSkills";
			}
			for (const target of event.targets) {
				if (!target.isIn()) {
					continue;
				}
				if (key == "removeSkills") {
					const skills = target.getSkills(null, false, false);
					if (!skills.length) {
						continue;
					}
					await target.removeSkills(skills.randomGets(info.num));
				} else if (key == "discard") {
					const cards = target.getDiscardableCards(target, "he");
					if (!cards.length) {
						continue;
					}
					await target.discard(cards.randomGets(info.num));
				} else if (key == "disableSkill") {
					if (trigger.type == "addSkillBlocker") {
						await target.addSkillBlocker(trigger.args[0]);
					} else {
						const skills = target.getSkills(null, false, false).randomGets(trigger.num);
						if (!skills.length) {
							return;
						}
						const args = get.copy(trigger.args);
						if (trigger.type == "tempBanSkill") {
							args[0] = skills;
						} else {
							args[1] = skills;
						}
						await target[trigger.type](...args);
					}
				} else {
					await target[key](info.num, info.nature);
				}
			}
		},
	},
	jlsgsy_baonuhetaihou: {
		animationStr: "汉家江山，本就是炼狱！",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_shixin: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		forced: true,
		filter(event, player) {
			return game.hasPlayer(curr => {
				if (curr == player) {
					return false;
				}
				return event.getl(curr).hs.some(card => get.suit(card, curr) == "spade");
			});
		},
		async content(event, trigger, player) {
			let targets = game.filterPlayer(curr => {
				if (curr == player) {
					return false;
				}
				return trigger.getl(curr).hs.some(card => get.suit(card, curr) == "spade");
			});
			await game.doAsyncInOrder(targets, async target => await target.loseHp());
		},
	},
	jlsgsy_xueyan: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["useCard"],
		},
		global: "jlsgsy_xueyan_ai",
		filter(event, player) {
			return event.player != player && event.isPhaseUsing(event.player);
		},
		forced: true,
		async content(event, trigger, player) {
			let next = trigger.player.draw();
			next.gaintag.add("jlsgsy_xueyan");
			let { cards } = await next.forResult();
			if (cards?.length) {
				trigger.player.markAuto("jlsgsy_xueyan", cards);
			}
			if (trigger.cards.some(card => trigger.player.storage.jlsgsy_xueyan?.includes(card))) {
				await trigger.player.loseHp();
			}
			if (get.color(trigger.card, false) == "red") {
				await player.draw();
			}
		},
		group: ["jlsgsy_xueyan_clear"],
		subSkill: {
			clear: {
				trigger: {
					global: ["phaseAfter"],
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					game.players.forEach(curr => {
						curr.setStorage("jlsgsy_xueyan", []);
						curr.removeGaintag("jlsgsy_xueyan");
					});
				},
			},
			ai: {
				ai: {
					effect: {
						player(card, player, target) {
							if (player.storage.jlsgsy_xueyan?.includes(card)) {
								return [1, -2];
							}
						},
					},
				},
			},
		},
	},
	jlsgsy_juesi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["phaseDiscardBegin"],
		},
		filter(event, player) {
			return event.player != player && event.player.countCards("h");
		},
		forced: true,
		async content(event, trigger, player) {
			let cards = trigger.player.getCards("h");
			await player.gain(cards, "give");
			if (cards.some(card => get.suit(card, false) == "heart")) {
				await player.recover();
			}
			let num = Math.min(trigger.player.hp, cards.length);
			let giveCards = cards.randomGets(num);
			await player.give(giveCards, trigger.player);
		},
	},
	jlsgsy_baonujiaxu: {
		animationStr: "死局已至，无力回天，为何还要挣扎？",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_huiying: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			maxHandcard(player, num) {
				return num + game.players.length;
			},
		},
		trigger: {
			global: ["useCard"],
		},
		filter(event, player) {
			if (event.card.hasNature() && event.card.name == "sha") {
				return false;
			}
			if (get.type2(event.card, false) == "equip") {
				return false;
			}
			return event.targets.includes(player) && event.targets.length == 1 && event.player != player;
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			const target = game.filterPlayer(curr => curr.isMaxMaxHp()).randomGet();
			player.logSkill(event.name, target);
			await target.loseMaxHp();
			if (target == player) {
				await player.draw(2);
			}
			trigger.cancel();
			trigger.targets.remove(player);
			trigger.all_excluded = true;
		},
	},
	jlsgsy_lianpo: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			return game.filterPlayer(curr => !player.getStorage("jlsgsy_lianpo_used").includes(curr)).length;
		},
		selectCard: -1,
		filterCard: false,
		selectTarget: 1,
		filterTarget(card, player, target) {
			return !player.getStorage("jlsgsy_lianpo_used").includes(target);
		},
		async content(event, trigger, player) {
			const { links } = await player
				.chooseButton({
					forced: true,
					createDialog: [
						"炼魄",
						[
							[
								["red", "失去1点体力，加1点体力上限，然后你随机获得其一张红色牌"],
								["black", "回复1点体力，减1点体力上限，然后你随机获得其一张黑色牌"],
							],
							"textbutton",
						],
					],
				})
				.forResult();
			const target = event.targets[0];
			if (links[0] == "red") {
				await target.loseHp();
				await target.gainMaxHp();
				const card = target.getCards("he", card => get.color(card) == "red").randomGet();
				if (card) {
					await player.gain(card, "gain2");
				}
			} else {
				await target.recover();
				await target.loseMaxHp();
				const card = target.getCards("he", card => get.color(card) == "black").randomGet();
				if (card) {
					await player.gain(card, "gain2");
				}
			}
			const list = player.getStorage("jlsgsy_lianpo_used");
			list.add(target);
			player.setStorage("jlsgsy_lianpo_used", list);
		},
		group: ["jlsgsy_lianpo_used"],
		subSkill: {
			used: {
				trigger: {
					player: ["phaseAfter"],
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					player.setStorage(event.name, []);
				},
			},
		},
	},
	jlsgsy_zhongzao: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["gainMaxHpAfter", "loseMaxHpAfter"],
		},
		filter(event, player) {
			const targets = game.filterPlayer(curr => curr != player);
			return targets.map(p => p.maxHp).unique().length == 1 && game.filterPlayer(curr => curr != player).length > 0;
		},
		forced: true,
		async content(event, trigger, player) {
			let num = game.players.length - 1;
			while (num > 0) {
				num--;
				const { bool } = await player.chooseBool("是否令随机其他角色对随机其他角色造成1点伤害").forResult();
				if (bool) {
					const targets = game.filterPlayer(curr => curr != player);
					const source = targets.randomGet();
					const target = targets.randomGet();
					source.line(target);
					await target.damage(source);
				}
			}
		},
	},
	jlsgsy_baonuliushan: {
		animationStr: "打打杀杀多无趣，不如陪朕，醉生梦死。",
		inherit: "jlsgsy_baonu",
		mode: ["identity", "guozhan", "boss", "stone"],
	},
	jlsgsy_duoquan: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["phaseBegin", "phaseEnd"],
		},
		filter(event, player) {
			return event.player != player && event.player.hasGainableCards(player, "h");
		},
		logTarget: "player",
		forced: true,
		async content(event, trigger, player) {
			await player.randomGain({ target: trigger.player, position: "h" }).set("animate", "giveAuto");
			if (
				player.hasHistory("gain", evt => {
					if (evt.source != trigger.player) {
						return false;
					}
					return evt.cards.some(card => get.suit(card, false) == "heart");
				})
			) {
				let evt = event.getParent("phase", false, true);
				let next;
				if (evt && evt.parent && evt.parent.next) {
					evt = evt.parent;
				} else if (event.parent && event.parent.next) {
					evt = event.parent;
				} else {
					evt = null;
				}
				if (evt) {
					if (evt.next.some(evtx => evtx.skill == event.name)) {
						return;
					}
					next = game.createEvent("phase", false, evt);
				} else {
					next = game.createEvent("phase", false);
				}
				next.player = player;
				next.forceDie = true;
				next.includeOut = true;
				next.skill = event.name;
				next.setContent("phase");
			}
		},
		ai: {
			threaten: 1.1,
		},
	},
	jlsgsy_lanle: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "useCard",
		},
		filter(event, player) {
			return event.player != player && event.player.hasGainableCards(player, "h");
		},
		logTarget: "player",
		forced: true,
		async content(event, trigger, player) {
			await player.randomGain({ target: trigger.player, position: "h" }).set("animate", "giveAuto");
			if (get.suit(trigger.card) == "heart" && player.hasGainableCards(trigger.player, "h")) {
				await trigger.player.randomGain({ target: player, position: "h" }).set("animate", "giveAuto");
			}
		},
		global: "jlsgsy_lanle_globalAI",
		subSkill: {
			globalAI: {
				charlotte: true,
				ai: {
					player(card, player, target) {
						if (!game.hasPlayer(current => current != player && current.hasSkill("jlsgsy_lanle"))) {
							return;
						}
						let vcard = get.autoViewAs(card);
						if (player.hasCards("h", cardx => !vcard.cards.includes(card))) {
							return [1, -0.3];
						}
					},
				},
			},
		},
		ai: {
			threaten: 1.1,
		},
	},
	jlsgsy_wangduan: {
		mod: {
			ignoredHandcard(card, player) {
				if (card.hasGaintag("jlsgsy_wangduan")) {
					return true;
				}
			},
			cardDiscardable(card, player, name) {
				if (name == "phaseDiscard" && card.hasGaintag("jlsgsy_wangduan")) {
					return false;
				}
			},
			cardUsable(card, player) {
				if (card.hasGaintag?.("jlsgsy_wangduan")) {
					return Infinity;
				}
			},
		},
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		direct: true,
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog(get.prompt2("jlsgsy_wangduan"), "hidden");
			},
			chooseControl(event, player) {
				return ["basic", "trick", "equip", "cancel2"];
			},
			check(event, player) {
				const { controls } = get.event();
				let choice = [];
				for (const type of controls) {
					if (type == "cancel2") {
						continue;
					}
					const hs = player.getDiscardableCards(player, "h", card => get.type2(card) == type);
					if (!hs.length) {
						continue;
					}
					if (!choice[0] || choice[1] < hs.length) {
						choice = [type, hs.length];
					}
				}
				if (!choice) {
					return "equip";
				}
				return choice[0];
			},
			backup(result, player) {
				return {
					audio: "jlsgsy_wangduan",
					control: result.control,
					log: false,
					async content(event, trigger, player) {
						const { control: type } = get.info(event.name),
							skill = "jlsgsy_wangduan";
						event.targets = game.filterPlayer().sortBySeat(_status.currentPhase);
						player.logSkill(skill, event.targets);
						game.log(player, "选择的类别为", type);
						player.chat(get.translation(type));
						const { gainTempCards } = get.info(skill),
							targets = event.targets.slice();
						targets.remove(player);
						let num = 0;
						for (const target of targets) {
							const hs = target.getDiscardableCards(target, "h", card => get.type2(card) != type);
							if (hs.length) {
								await target.discard(hs);
								await gainTempCards(target, hs.length, type);
								num++;
							}
						}
						const hs = player.getDiscardableCards(player, "h", card => get.type2(card) != type);
						if (hs.length) {
							await player.discard(hs);
							const next = gainTempCards(player, hs.length + num, type, skill);
							await next;
						}
					},
				};
			},
			prompt(result, player) {
				let prompt = `令所有角色弃置手牌中的非${get.translation(result.control)}牌，然后获得等量该类别临时牌`,
					prompt2 = `每有一名其他角色以此法弃置牌，你多获得一张临时牌。你以此法获得的临时牌不计入手牌上限且无次数限制`;
				return `###${prompt}###${prompt2}`;
			},
		},
		async gainTempCards(player, num, type, tag) {
			const { createTempCard, typePBTY } = get.info("jlsg_lingze");
			let list = typePBTY[type].slice();
			const cards = [];
			while (num-- > 0) {
				if (!list.length) {
					list = typePBTY[type].slice();
				}
				const [suit, number, name, nature = null] = list.randomRemove();
				const card = createTempCard(name, suit, nature, number);
				if (card) {
					cards.push(card);
				}
			}
			let next;
			if (cards.length) {
				next = player.gain({ cards, animate: "draw", log: true });
				if (tag) {
					next.gaintag.add(tag);
				}
			} else {
				next = game.delayx();
			}
			return next;
		},
		subSkill: {
			backup: {},
		},
		ai: {
			order: 6,
			result: {
				player: 0.5,
				target: -0.5,
			},
		},
	},
};

export default skills;
