import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	jlsg_zhengyi: {
		audio: "ext:极略/audio/skill:2",
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard: function (player, name) {
			if (get.type(name) != "basic" || name == "shan") {
				return false;
			}
			return _status.currentPhase == player ? player.countCards("h") - player.hp == 1 : player.hp - player.countCards("h") == 1;
		},
		filter: function (event, player) {
			if (_status.currentPhase == player && player.countCards("h") - player.hp != 1) {
				return false;
			}
			if (_status.currentPhase != player && player.hp - player.countCards("h") != 1) {
				return false;
			}
			for (var i of lib.inpile) {
				if (get.type(i) != "basic" || i == "shan") {
					continue;
				}
				if (event.filterCard({ name: i }, player, event)) {
					return true;
				}
				if (i == "sha" && lib.inpile_nature.some(nat => event.filterCard({ name: i, nature: nat }, player, event))) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) != "basic" || i == "shan") {
						continue;
					}
					list.push(["basic", "", i]);
					if (i == "sha") {
						for (var j of lib.inpile_nature) {
							list.push(["basic", "", i, j]);
						}
					}
				}
				return ui.create.dialog("整毅", [list, "vcard"]);
			},
			filter: function (button, player) {
				var evt = _status.event.getParent();
				return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
			},
			check: function (button) {
				var player = _status.event.player;
				var shaTarget = false;
				for (var i = 0; i < game.players.length; i++) {
					if (player.canUse("sha", game.players[i]) && ai.get.effect(game.players[i], { name: "sha" }, player) > 0) {
						shaTarget = true;
					}
				}
				if (player.isDamaged()) {
					return button.link[2] == "tao" ? 1 : -1;
				}
				if (shaTarget && player.num("h", "sha") && !player.num("h", "jiu")) {
					return button.link[2] == "jiu" ? 1 : -1;
				}
				if (shaTarget && !player.num("h", "sha")) {
					return button.link[2] == "sha" ? 1 : -1;
				}
				return button.link[2] == "sha" ? 1 : -1;
			},
			backup: function (links, player) {
				var A = {
					audio: false,
					popname: true,
					// ignoreMod:true,
					filterCard: function (card, player) {
						return _status.currentPhase == player ? true : false;
					},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: "none",
						number: null,
						isCard: true,
					},
				};
				if (player.countCards("h") > player.hp) {
					A.precontent = function () {
						player.logSkill("jlsg_zhengyi");
						var card = event.result.cards[0];
						event.card = card;
						player.discard(card);
						// player.$throw(card,1000);
						event.result.card = {
							name: event.result.card.name,
							nature: event.result.card.nature,
							// cards: [],
						};
						event.result.cards = [];
					};
				} else {
					A.precontent = function () {
						player.logSkill("jlsg_zhengyi");
						player.draw("nodelay");
					};
					A.selectCard = -1;
					A.filterCard = () => false;
					// A.onuse = A.onrespond = function (result, player) { player.draw('nodelay');};
				}
				return A;
			},
			prompt: function (links, player) {
				var str = "视为使用或打出" + get.translation({ name: links[0][2], nature: links[0][3] });
				if (player.hp <= player.countCards("h")) {
					str = "弃置一张手牌，" + str;
				}
				return str;
			},
		},
		ai: {
			order: 6,
			result: {
				player: 1,
			},
			threaten: 1.3,
			respondSha: true,
			// respondShan: true,
			fireattack: true,
			skillTagFilter: function (player) {
				return _status.currentPhase == player ? player.countCards("h") - player.hp == 1 : player.hp - player.countCards("h") == 1;
			},
		},
		group: ["jlsg_zhengyi_shan"],
		subSkill: {
			shan: {
				audio: "jlsg_zhengyi", // audio: ["jieyue1", 2],
				enable: ["chooseToUse", "chooseToRespond"],
				filter: function (event, player) {
					return _status.currentPhase == player ? player.countCards("h") - player.hp == 1 : player.hp - player.countCards("h") == 1;
				},
				filterCard: function (card, player) {
					return _status.currentPhase == player ? true : false;
				},
				selectCard: function () {
					return _status.currentPhase == _status.event.player ? 1 : -1;
				},
				// check: () => true,
				// ignoreMod:true,
				viewAs: {
					name: "shan",
					suit: "none",
					number: null,
				},
				onrespond: function (result, player) {
					if (_status.currentPhase == player) {
						player.discard(result.cards);
						result.card = {
							name: result.card.name,
						};
						result.cards = [];
					} else {
						player.draw("nodelay");
					}
				},
				onuse: function (result, player) {
					if (_status.currentPhase == player) {
						player.discard(result.cards);
						result.card = {
							name: result.card.name,
						};
						result.cards = [];
					} else {
						player.draw("nodelay");
					}
				},
				ai: {
					skillTagFilter: function (player) {
						return _status.currentPhase == player ? player.countCards("h") - player.hp == 1 : player.hp - player.countCards("h") == 1;
					},
					respondShan: true,
				},
			},
		},
	},
	jlsg_wusheng: {
		audio: "ext:极略/audio/skill:true",
		inherit: "wusheng",
	},
	jlsg_quanlue: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "phaseUseBegin",
		},
		filter: function (event, player) {
			return player.countCards("h");
		},
		check: function (event, player) {
			return game.hasPlayer(function (cur) {
				return get.attitude(player, cur) != 0;
			});
		},
		content: function () {
			"step 0"
			event.list = [];
			for (var i = 0; i < player.getCards("h").length; i++) {
				var suit = get.suit(player.getCards("h")[i]);
				if (event.list.includes(suit)) {
					continue;
				}
				event.list.push(suit);
			}
			player.showHandcards();
			"step 1"
			player.chooseControl(event.list, function (event, player) {
				var max = event.list.randomGet();
				var max2 = player.countCards("h", { suit: max });
				for (var i = 0; i < event.list.length; i++) {
					var len = event.list[i];
					var len2 = player.countCards("h", { suit: len });
					if (len2 == max2) {
						if (["spade", "club"].includes(len)) {
							max = len;
						}
					}
					if (len2 > max2) {
						max = len;
					}
					max2 = player.countCards("h", { suit: max });
				}
				return max;
			}).prompt = "权略：请选择1种花色";
			"step 2"
			player.popup("权略" + get.translation(result.control + "2") + get.translation(result.control));
			player.draw(player.countCards("h", { suit: result.control }));
			player.storage.jlsg_quanlue = result.control;
			player.addSkill("jlsg_quanlue_effect");
		},
		ai: {
			effect: {
				player: function (card, player) {
					if (!player.storage.jlsg_quanlue) {
						return;
					}
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					if (get.suit(card) == player.storage.jlsg_quanlue && get.type(card) != "equip") {
						if (get.type(card) == "basic") {
							return [0, 1];
						}
						if (card.name == "wugu") {
							return;
						}
						return [1, 0.5];
					}
				},
			},
		},
		subSkill: {
			effect: {
				trigger: {
					player: "phaseUseAfter",
				},
				forced: true,
				content: function () {
					"step 0"
					player.showHandcards();
					"step 1"
					player.discard(
						player.getCards("h", function (card) {
							return get.suit(card) == player.storage.jlsg_quanlue;
						})
					);
					"step 2"
					player.removeSkill("jlsg_quanlue_effect");
				},
			},
		},
	},
	jlsg_huaiju: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			get player() {
				return lib.phaseName.map(i => i + "End");
			},
		},
		filter(event, player) {
			return player.countCards("h") == 3;
		},
		async cost(event, trigger, player) {
			const control = await player
				.chooseControl("摸牌", "弃牌", "cancel2")
				.set("prompt", get.prompt(event.skill))
				.set("prompt2", "你可以摸一张牌或弃置两张牌")
				.set("ai", (event, player) => {
					const drawEff = get.effect(player, { name: "draw" }, player, player),
						discardEff = get.effect(player, { name: "guohe_copy2" }, player, player);
					if (drawEff >= discardEff) {
						return "摸牌";
					}
					return "弃牌";
				})
				.forResultControl();
			event.result = {
				bool: control != "cancel2",
				cost_data: { control },
			};
		},
		async content(event, trigger, player) {
			const control = event.cost_data.control;
			if (control == "摸牌") {
				await player.draw(1);
			} else {
				await player.chooseToDiscard("he", 2, true);
			}
		},
	},
	jlsg_huntian: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "loseAfter",
			global: "loseAsyncAfter",
		},
		filter(event, player) {
			if (event.type != "discard" || event.getlx === false) {
				return false;
			}
			const evt = event.getl?.(player);
			if (evt?.cards2?.length) {
				return evt.cards2.someInD("d");
			}
			return false;
		},
		async cost(event, trigger, player) {
			const cards = trigger.getl(player).cards2.filterInD("d");
			const { result } = await player
				.chooseToMove("浑天：将任意张牌置于牌堆顶，然后从牌堆中获得与这些牌类别各不同的一张牌")
				.set("list", [["本次弃置的牌", cards], ["牌堆顶"]])
				.set("filterOk", moved => moved[1].length > 0)
				.set("processAI", function (list) {
					let cards = list[0][1].slice(0),
						cards2 = [];
					for (let card of cards) {
						if (cards2.some(cardx => get.type(cardx) == get.type(card))) {
							continue;
						}
						cards2.add(card);
						if (cards2.length > 1) {
							break;
						}
					}
					return [[], cards2];
				});
			event.result = {
				bool: result?.bool,
				cards: result?.moved?.[1] || [],
			};
		},
		async content(event, trigger, player) {
			game.log(player, "将", event.cards, "置于了牌堆顶");
			while (event.cards.length) {
				ui.cardPile.insertBefore(event.cards.pop().fix(), ui.cardPile.firstChild);
			}
			let types = ["basic", "trick", "equip"].filter(type => !event.cards.some(card => get.type(card) == type));
			if (!types.length) {
				return;
			}
			let card = get.cardPile2(card => {
				let type = get.type(card);
				return types.includes(type);
			}, "random");
			if (card) {
				await player.gain(card, "gain2");
			}
		},
	},
	jlsg_cangshu: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: { global: "useCard" },
		filter(event, player) {
			if (event.player == player || get.type(event.card) != "trick") {
				return false;
			}
			return player.countCards("h", { type: "basic" });
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCard(`###${get.prompt(event.skill)}###交给其一张基本牌，获得${get.translation(trigger.card)}并令此牌无效`)
				.set("filterCard", (card, player, event) => {
					if (get.type(card) != "basic") {
						return false;
					}
					return lib.filter.canBeGained(card, get.event("target"), player, event);
				})
				.set("ai", card => {
					if (get.event("att") < 0) {
						return 10 - get.value(card);
					}
					return 0;
				})
				.set("target", trigger.player)
				.set("att", get.attitude(player, trigger.player))
				.forResult();
		},
		async content(event, trigger, player) {
			await trigger.player.gain(event.cards, player, "giveAuto");
			if (trigger.cards) {
				player.gain(trigger.cards, "gain2");
			}
			game.log(player, "取消了", trigger.card, "的结算");
			trigger.all_excluded = true;
		},
	},
	jlsg_kanwu: {
		audio: "ext:极略/audio/skill:1",
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard(player, name) {
			if (get.type(name) != "basic") {
				return false;
			}
			return _status.currentPhase != player && player.countCards("h", card => get.type2(card) == "trick");
		},
		filter(event, player) {
			if (_status.currentPhase == player || !player.countCards("h", card => get.type2(card) == "trick")) {
				return false;
			}
			for (let i of lib.inpile) {
				if (get.type(i) != "basic") {
					continue;
				}
				if (event.filterCard(get.autoViewAs({ name: i }, []), player, event)) {
					return true;
				}
				if (i == "sha" && lib.inpile_nature.some(nat => event.filterCard(get.autoViewAs({ name: i, nature: nat }, []), player, event))) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				const list = get.inpileVCardList(([type]) => type == "basic");
				return ui.create.dialog("勘误", [list, "vcard"]);
			},
			filter(button, player) {
				const evt = _status.event.getParent();
				return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
			},
			check({ link: [_, __, name, nature] }) {
				if (get.info({ name })?.notarget) {
					return get.order({ name });
				}
				return get.player().getUseValue({ name, nature });
			},
			backup(links, player) {
				return {
					audio: false,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: "none",
						number: "none",
						isCard: true,
					},
					filterCard(card) {
						return get.type2(card) == "trick";
					},
					ai1(card) {
						return 6 - get.value(card);
					},
					log: false,
					popname: true,
					async precontent(event, _, player) {
						await player.logSkill("jlsg_kanwu");
						let card = event.result.cards[0];
						event.card = card;
						await player.discard(card);
						event.result.card = get.autoViewAs({ ...event.result.card }, []);
						event.result.cards = [];
					},
				};
			},
			prompt(links, player) {
				return "弃置一张锦囊牌，视为使用或打出" + get.translation({ name: links[0][2], nature: links[0][3] });
			},
		},
		ai: {
			respondSha: true,
			fireattack: true,
			skillTagFilter: function (player) {
				return _status.currentPhase != player && player.countCards("he", card => get.type2(card) == "trick");
			},
			order: 6,
			result: {
				player: 1,
			},
		},
		subSkill: {
			backup: {},
		},
	},
	jlsg_huage: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return target.countCards("he") > 0;
		},
		ignoreTarget: function (card, player, target) {
			return !target.countCards("he");
		},
		content: function () {
			"step 0"
			if (target.countCards("he")) {
				target
					.chooseToDiscard("化戈：请弃置至少一张牌，弃置的牌中每有【杀】，你便摸一张牌", "he", [1, Infinity], true)
					.set("ai", function (card) {
						if (card.name == "sha") {
							return 6 - get.value(card);
						}
						return -get.useful(card);
					})
					.set("delay", false);
			} else {
				event.finish();
			}
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			let num = 0;
			for (var i = 0; i < result.cards.length; i++) {
				if (result.cards[i].name == "sha") {
					num++;
				}
			}
			if (num) {
				target.draw(num);
			} else {
				game.delayx(0.5);
			}
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},
	jlsg_muyi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseBegin" },
		filter: function (event, player) {
			return event.player != player && event.player.countCards("he") && player.hasSkill("jlsg_muyi");
		},
		direct: true,
		content: function () {
			"step 0"
			trigger.player.chooseCard("是否发动【" + get.translation(player) + "】的技能【母仪】？<p>你可以交给【" + get.translation(player) + "】1至两张牌，回合结束时，其交还你等量的牌。</p>", "he", [1, 2]).ai = function (card) {
				if (get.position(card) == "e" && get.attitude(player, target) > 0) {
					return 7 - get.value(card);
				}
				if (get.attitude(_status.event.player, player) > 2) {
					return 2 - get.useful(card);
				}
				return -1;
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_muyi");
				player.gain(result.cards, trigger.player, "giveAuto");
				player.storage.jlsg_muyi = trigger.player;
				player.storage.jlsg_muyi_effect = result.cards.length;
				player.addSkill("jlsg_muyi_effect");
			}
		},
		subSkill: {
			effect: {
				mark: true,
				marktext: "仪",
				intro: {
					name: "母仪",
					content: function (storage, player) {
						return "当前回合结束时，你需交给" + get.translation(player.storage.jlsg_muyi) + get.cnNumber(storage) + "张牌";
					},
				},
				trigger: { global: "phaseEnd" },
				forced: true,
				filter: function (event, player) {
					return event.player == player.storage.jlsg_muyi;
				},
				logTarget: "player",
				content: function () {
					"step 0"
					player.chooseCard("母仪：交给" + get.translation(player.storage.jlsg_muyi) + get.cnNumber(player.storage.jlsg_muyi_effect) + "张牌", "he", player.storage.jlsg_muyi_effect, true).ai = function (card) {
						return 10 - get.value(card);
					};
					"step 1"
					if (result.bool) {
						trigger.player.gain(result.cards, player, "giveAuto");
					} else {
						event.finish();
					}
					delete player.storage.jlsg_muyi;
					delete player.storage.jlsg_muyi_effect;
					player.removeSkill("jlsg_muyi_effect");
				},
			},
		},
	},
	jlsg_diezhang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCard" },
		frequent: true,
		filter: function (event, player) {
			if (!player.isPhaseUsing()) {
				return false;
			}
			var evt = player.getHistory("useCard", evt => evt != event);
			if (!evt.length) {
				return false;
			}
			evt = evt[evt.length - 1];
			return get.number(evt.card) < get.number(event.card);
		},
		content: function () {
			player.draw();
		},
		ai: {
			aiOrder: function (player, card, num) {
				if (typeof card == "object" && player.isPhaseUsing()) {
					var evt = player.getLastUsed();
					if (evt && evt.card && evt.card.number && evt.card.number === card.number) {
						return num + 10;
					}
				}
			},
			// effect: {
			//   player: function (card, player, target) {
			//     if (!player.storage.jlsg_diezhang) return;
			//     var number = get.number(player.storage.jlsg_diezhang);
			//     if (number < get.number(card)) {
			//       return [1, 0.6];
			//     }
			//   },
			// }
		},
	},
	jlsg_xiongyi: {
		audio: "ext:极略/audio/skill:2",
		forced: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.hp == 1 || player.countCards("h") == 0;
		},
		content: function () {
			if (player.hp == 1) {
				player.recover();
			}
			if (player.countCards("h") == 0) {
				player.draw(2);
			}
		},
	},
	jlsg_sijian: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		filter: function (event, player) {
			if (player.countCards("h")) {
				return false;
			}
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length;
		},
		content: function () {
			"step 0"
			player
				.chooseTarget(get.prompt2(event.name), function (card, player, target) {
					return player != target && target.countDiscardableCards(player, "he") > 0;
				})
				.set("ai", function (target) {
					return -get.attitude(_status.event.player, target);
				});
			"step 1"
			if (result.bool) {
				player.logSkill(event.name, result.targets);
				event.target = result.targets[0];
				player.discardPlayerCard(player.hp, event.target, true);
			} else {
				event.finish();
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_gangzhi: {
		audio: "ext:极略/audio/skill:2",
		logAudio(event, player) {
			if (player.countDiscardableCards(player, "h")) {
				return ["ext:极略/audio/skill/jlsg_gangzhi1.mp3"];
			}
			return ["ext:极略/audio/skill/jlsg_gangzhi2.mp3"];
		},
		trigger: { player: "damageBegin4" },
		filter(event, player) {
			if (event.num < 1) {
				return false;
			}
			if (!player.countCards("h")) {
				return true;
			}
			if (player.countDiscardableCards(player, "h")) {
				return true;
			}
			return false;
		},
		check(event, player) {
			if (player.hp <= 1) {
				return true;
			}
			let eff = lib.skill.jlsg_gangzhi.ai.effect.target(event.card, event.source, player);
			if (!eff) {
				if (!player.countCards("h")) {
					if (!player.hasFriend() && (!player.isTurnedOver() || player.hp == 1)) {
						eff = 1;
					}
					eff = player.isTurnedOver() ? [0, 4] : 0.5;
				} else {
					if (!player.hasFriend()) {
						eff = [1, 0];
					} else {
						eff = [0.6, -0.4 * (player.countCards("h") - (player.hasSkill("jlsg_sijian") ? player.hp : 0))];
					}
				}
			}
			let num = player.getCards("h").reduce((n, c) => n + player.getUseValue(c), 0) / player.countCards("h");
			if (Array.isArray(eff)) {
				return event.num + Math.abs(eff[1]) > num;
			}
			return event.num > num;
		},
		prompt(event, player) {
			let str = "刚直：是否";
			if (!player.countCards("h")) {
				str += "将武将牌翻面，然后将手牌数补至体力上限";
			} else {
				str += "弃置所有手牌，然后防止此伤害";
			}
			return str;
		},
		async content(event, trigger, player) {
			if (!player.countCards("h")) {
				await player.turnOver();
				await player.drawTo(player.maxHp);
			} else {
				await player.discard(player.getDiscardableCards(player, "h"));
				trigger.cancel();
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			maixie_defend: true,
			effect: {
				target: function (card, player, target) {
					if (player && player.hasSkillTag("jueqing", false, target)) {
						return;
					}
					if (!get.tag(card, "damage")) {
						return;
					}
					if (target.countCards("h") != 0) {
						if (!target.hasFriend()) {
							return;
						}
						return [0.6, -0.4 * (target.countCards("h") - (target.hasSkill("jlsg_sijian") ? target.hp : 0))];
					} else {
						if (!target.hasFriend() && (!target.isTurnedOver() || target.hp == 1)) {
							return;
						}
						return target.isTurnedOver() ? [0, 4] : 0.5;
					}
				},
			},
		},
	},
	jlsg_yanxi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		filter(event, player) {
			return !player.countCards("e");
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw();
		},
	},
	jlsg_zhige: {
		audio: "ext:极略/audio/skill:1",
		hiddenCard(player, name) {
			if (["sha", "shan"].includes(name)) {
				return player.countCards("e");
			}
		},
		enable: "chooseToUse",
		filter(event, player) {
			const es = player.getCards("e");
			if (!es.length) {
				return false;
			}
			for (let name of ["sha", "shan"]) {
				const card = get.autoViewAs({ name }, es);
				_status.event._get_card = card;
				if (
					es.some(card => {
						let mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
						return mod2 === false;
					})
				) {
					continue;
				}
				delete _status.event._get_card;
				if (event.filterCard(card, player, event)) {
					return true;
				}
			}
			delete _status.event._get_card;
			return false;
		},
		direct: true,
		chooseButton: {
			dialog(event, player) {
				const es = player.getCards("e");
				let list = [];
				for (let name of ["sha", "shan"]) {
					const card = get.autoViewAs({ name }, es);
					_status.event._get_card = card;
					if (
						es.some(card => {
							let mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
							return mod2 === false;
						})
					) {
						continue;
					}
					delete _status.event._get_card;
					if (event.filterCard(card, player, event)) {
						list.add(["basic", "", name]);
					}
				}
				delete _status.event._get_card;
				let dialog = ui.create.dialog("止戈", [list, "vcard"], "hidden");
				if (list.length == 1) {
					dialog.direct = true;
				}
				return dialog;
			},
			check(button) {
				return get.order({ name: button.link[2] }, get.player());
			},
			backup(links, player) {
				const backup = get.copy(get.info("jlsg_zhige_backup"));
				backup.viewAs = { name: links[0][2], isCard: false, cards: player.getCards("e") };
				return backup;
			},
			prompt(links, player) {
				return `将装备区内所有牌当做${get.translation(links[0][2])}使用`;
			},
		},
		subSkill: {
			backup: {
				audio: "jlsg_zhige",
				position: "e",
				selectCard: -1,
				filterCard: () => true,
				popname: true,
			},
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player) {
				if (player.countCards("e") <= 0) {
					return false;
				}
			},
			order: 1,
			result: {
				player: 1,
			},
		},
	},
	jlsg_wangsi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source && event.source != player && event.source.countCards("h") != 0;
		},
		check: function (event, player) {
			return 1;
		},
		frequent: true,
		content: function () {
			player.discardPlayerCard(trigger.source, "h", "visible").set("filterButton", function (button, player) {
				return get.color(button.link) == "red";
			}); // .set('logSkill', [event.name, trigger.source]);
		},
		ai: {
			maixie_defend: true,
		},
	},
	jlsg_shangyi: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return player != target && target.countCards("h");
		},
		content: function () {
			"step 0"
			game.log(target, "观看了", player, "的手牌");
			target.viewHandcards(player);
			"step 1"
			if (get.mode() == "identity") {
				player.chooseControl(["观看其身份牌", "观看其手牌", "cancel2"], 1).set("prompt", "选择一项");
			}
			"step 2"
			if (!result || !result.control || result.control === "观看其手牌") {
				player.discardPlayerCard(target, "h", "visible").set("filterButton", function (button, player) {
					return get.color(button.link) == "black";
				});
			} else if (result && result.control === "观看其身份牌" && target.identity) {
				game.log(player, "观看了", target, "的身份");
				var idt = target.identity;
				var styleStr = {
					zhu: `data-nature="fire"`,
					zhong: `data-nature="metal"`,
					fan: `data-nature="wood"`,
					nei: 'data-nature="thunder"',
				}[idt];
				var tr =
					{
						zhu: "主公",
						zhong: "忠臣",
						fan: "反贼",
						nei: "内奸",
					}[idt] || get.translation(idt);
				player.chooseControl("ok").set("dialog", [get.translation(target) + "的身份", `<span ${styleStr} style="font-family: huangcao, xinwei;font-size:larger;color: white;">${tr}</span>`]);
			}
		},
		ai: {
			order: 4,
			result: {
				target: -1,
			},
			// result: {
			//   target: function (player, target) {
			//     var result = 0;
			//     if (target.hasSkillTag('noe')) result += 4 + target.countCards('e');
			//     if (target.hasSkillTag('nolose') || target.hasSkillTag('nodiscard')) result += 5 + target.countCards('he') / 2;
			//     if (target.hasCard(function (card) {
			//       return ['baiyin', 'rewrite_baiyin'].includes(card.name);
			//     }, 'e') && target.isDamaged()) return 10 + result;
			//     if (target.hasCard(function (card) {
			//       var baiyin = ['baiyin', 'rewrite_baiyin'].includes(card.name);
			//       var bol = true;
			//       return get.color(card) == 'black' && (baiyin && (target.isDamaged() ? !bol : bol));
			//     }, 'e')) return -6 + result;
			//     return -5 + result;
			//   },
			// }
		},
	},
	jlsg_kuangzheng: {
		audio: "ext:极略/audio/skill:2",
		direct: true,
		trigger: { player: "phaseEnd" },
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current.isLinked() || current.isTurnedOver();
			});
		},
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt(event.name)).set("ai", function (target) {
				return get.attitude(_status.event.player, target);
			});
			"step 1"
			if (result.bool) {
				event.target = result.targets[0];
				player.logSkill(event.name, result.targets);
			} else {
				event.finish();
			}
			"step 2"
			if (event.target.isLinked()) {
				event.target.link();
			}
			"step 3"
			if (event.target.isTurnedOver()) {
				event.target.turnOver();
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_bibu: {
		audio: "ext:极略/audio/skill:2",
		group: ["jlsg_bibu1"],
		trigger: { global: "phaseJieshuBegin" },
		frequent: true,
		filter: function (event, player) {
			if (player.hasSkill("jlsg_bibu2")) {
				return false;
			}
			return event.player != player && player.countCards("h") <= player.hp;
		},
		content: function () {
			player.draw();
			player.addTempSkill("jlsg_bibu2");
		},
	},
	jlsg_bibu1: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			if (player.hasSkill("jlsg_bibu2")) {
				return false;
			}
			return event.player != player && player.countCards("h") > player.hp;
		},
		content: function () {
			"step 0"
			player.chooseCardTarget({
				filterCard: true,
				selectCard: 1,
				filterTarget: function (card, player, target) {
					return player != target;
				},
				ai1: function (card) {
					if (ui.selected.cards.length > 0) {
						return -1;
					}
					if (card.name == "du") {
						return 20;
					}
					return _status.event.player.countCards("h") - _status.event.player.hp;
				},
				ai2: function (target) {
					var att = get.attitude(_status.event.player, target);
					if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
						if (target.hasSkillTag("nodu")) {
							return 0;
						}
						return 1 - att;
					}
					if (target.countCards("h") > _status.event.player.countCards("h")) {
						return 0;
					}
					return att - 4;
				},
				prompt: "###是否发动【裨补】？###你可以将一张手牌交给其他角色",
			});
			"step 1"
			if (result.bool) {
				player.addTempSkill("jlsg_bibu2");
				player.logSkill("jlsg_bibu", result.targets);
				if (result.targets[0].ai.shown > player.ai.shown) {
					player.addExpose(0.1);
				}
				result.targets[0].gain(result.cards, player, "give");
			}
		},
		ai: {
			threaten: 1.2,
			order: 2,
			result: {
				target: 1,
			},
		},
	},
	jlsg_bibu2: {},
	jlsg_duanlan: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current != player && current.countCards("hej");
			});
		},
		content: function () {
			"step 0"
			var friends = game.filterPlayer(function (current) {
				return get.attitude(player, current) >= 4;
			});
			var targets = game
				.filterPlayer(function (current) {
					return current != player;
				})
				.sort(lib.sort.seat);
			var info = ['断缆</br></br><div class="center text">选择并弃置1至3张牌</div>'];
			for (var i = 0; i < targets.length; i++) {
				if (targets[i].countCards("hej")) {
					info.push('<div class="center text">' + get.translation(targets[i]) + "</div>");
				}
				var hs = targets[i].getCards("h");
				if (hs.length) {
					info.push('<div class="center text">手牌区</div>');
					if (targets[i].isUnderControl()) {
						info.push(hs);
					} else {
						info.push([hs, "blank"]);
					}
				}
				var es = targets[i].getCards("e");
				if (es.length) {
					info.push('<div class="center text">装备区</div>');
					info.push(es);
				}
				var js = targets[i].getCards("j");
				if (js.length) {
					info.push('<div class="center text">判定区</div>');
					info.push(js);
				}
			}
			player
				.chooseButton(true, [1, 3])
				.set("createDialog", info)
				.set("filterButton", function (button) {
					return lib.filter.canBeDiscarded(button.link, _status.event.player, get.owner(button.link));
				})
				.set("ai", function (button) {
					var player = _status.event.player;
					var maxNumCards = player.getCards("he", function (card) {
						return (
							get.value(card) < 9 &&
							!player.hasCard(function (card2) {
								return card2.number > card.number;
							})
						);
					});
					var maxNum = maxNumCards.length ? maxNumCards[0].number : 0;
					var dngr =
						player.hp == 1 &&
						!player.hasCard(function (card) {
							return card.name == "tao" || card.name == "jiu";
						});
					var owner = get.owner(button.link);
					var position = get.position(button.link);
					var num = 0;
					for (var i = 0; i < ui.selected.buttons.length; i++) {
						if (["e", "j"].includes(get.position(ui.selected.buttons[i].link))) {
							num += ui.selected.buttons[i].link.number;
						} else {
							num += 7;
						}
					}
					var att = get.attitude(player, owner);
					if (att > 0) {
						if (position == "j") {
							if (button.link.number < maxNum - num) {
								return 100 - button.link.number;
							}
							if (!dngr) {
								return 80 - button.link.number;
							}
						}
						return 0;
					}
					if (att < 0) {
						if (position == "j") {
							return 0;
						}
						if (position == "e") {
							if (button.link.number < maxNum - num) {
								return 60 - button.link.number;
							}
							if (!dngr) {
								return 40 - button.link.number;
							}
						}
						if (7 < maxNum - num) {
							if (!dngr) {
								return 1;
							}
						}
					}
					return 0;
				});
			"step 1"
			event.num = 0;
			var owners = [];
			var cards = result.links.slice(0);
			for (var i = 0; i < cards.length; i++) {
				event.num += cards[i].number;
				var owner = get.owner(cards[i]);
				if (!owners.includes(owner)) {
					owners.push(owner);
				}
			}
			owners.sort(lib.sort.seat);
			var todo = [];
			for (var i = 0; i < owners.length; i++) {
				player.line(owners[i], "green");
				owners[i].discard(
					owners[i].getCards("hej", function (card) {
						return cards.includes(card);
					})
				);
			}
			"step 2"
			player
				.chooseToDiscard(
					'断缆</br></br><div class="center text">弃置一张点数大于' + num + "的牌，或失去1点体力</div>",
					function (card) {
						return card.number > num;
					},
					"he"
				)
				.set("ai", function (card) {
					if (card.name == "tao") {
						return 0;
					}
					return 9 - get.value(card);
				});
			"step 3"
			if (!result.bool) {
				player.loseHp();
			}
		},
		ai: {
			order: 7,
			result: {
				player: function (player) {
					//if(player.hasSkillTag('maiHp')&&player.hp>1) return 1;
					if (
						player.hp > 2 ||
						player.hasCard(function (card) {
							return card.number > 10;
						}, "h")
					) {
						return game.hasPlayer(function (current) {
							if (get.attitude(player, current) > 0) {
								return current.countCards("j");
							} else if (get.attitude(player, current) < 0) {
								return current.countCards("he");
							}
						})
							? 1
							: 0;
					}
					var dngr =
						player.hp == 1 &&
						!player.hasCard(function (card) {
							return card.name == "tao" || card.name == "jiu";
						});
					var js = [],
						es = [];
					var minNum1 = 0,
						minNum2 = 0;
					game.countPlayer(function (current) {
						if (get.attitude(player, current) > 0) {
							js = js.concat(current.getCards("j"));
						} else if (get.attitude(player, current) < 0) {
							es = es.concat(current.getCards("e"));
						}
					});
					for (var i = 0; i < js.length; i++) {
						minNum1 = Math.min(minNum1, js[i].number);
					}
					if (js.length) {
						if (
							player.hasCard(function (card) {
								return card.number > minNum1 && get.value(card) < 9;
							}, "he")
						) {
							return 1;
						}
						if (!dngr) {
							if (js.length > 1) {
								return 1;
							}
							return game.hasPlayer(function (current) {
								return current.countCards("he");
							})
								? 1
								: 0;
						}
						return 0;
					}
					for (var i = 0; i < es.length; i++) {
						minNum2 = Math.min(minNum2, es[i].number);
					}
					if (es.length) {
						if (
							player.hasCard(function (card) {
								return card.number > minNum2 && get.value(card) < 9;
							}, "he")
						) {
							return 1;
						}
						if (!dngr) {
							if (es.length > 1) {
								return 1;
							}
						}
						return 0;
					}
					return 0;
				},
			},
		},
	},
	jlsg_yaoming: {
		audio: "jlsg_yaoming_",
		locked: false,
		init: function (player) {
			player.storage.jlsg_yaoming = {
				suits: [],
				types: [],
			};
		},
		group: ["jlsg_yaoming_strg", "jlsg_yaoming_1", "jlsg_yaoming_2", "jlsg_yaoming_3", "jlsg_yaoming_4"],
		subfrequent: ["1"],
		subSkill: {
			strg: {
				trigger: { player: ["useCard", "respond"] },
				filter: function (event, player) {
					if (!player.isPhaseUsing()) {
						return false;
					}
					var phaseUse = _status.event.getParent("phaseUse");
					var hists = player.getHistory("useCard", function (evt) {
						return evt.getParent("phaseUse") == phaseUse && evt.card && get.suit(evt.card);
					});
					var curSuit = get.suit(event.card);
					return hists.includes(event) && hists.every(e => e === event || get.suit(e.card) != curSuit);
				},
				silent: true,
				content: function () {
					var phaseUse = _status.event.getParent("phaseUse");
					var hists = player.getHistory("useCard", function (evt) {
						return evt.getParent("phaseUse") == phaseUse && evt.card && get.suit(evt.card);
					});
					var suits = new Set(hists.map(e => get.suit(e.card)));
					player.storage.jlsg_yaoming = [trigger, suits];
					player.addTempSkill("jlsg_yaoming_mark", "phaseUseAfter");
					if (player.hasSkill(event.name)) {
						player.markSkill("jlsg_yaoming_mark");
					}

					// var suit = get.suit(trigger.card), type = get.type(trigger.card, 'trick');
					// if (['heart', 'diamond', 'spade', 'club'].includes(suit) &&
					//   !player.storage.jlsg_yaoming.suits.includes(suit)) {
					//   player.storage.jlsg_yaoming.suits.push(suit);
					//   player.addTempSkill('jlsg_yaoming_mark', 'phaseUseAfter');
					//   player.markSkill('jlsg_yaoming_mark');
					// }
					// if (!player.storage.jlsg_yaoming.types.includes(type)) {
					//   player.storage.jlsg_yaoming.types.push(type);
					// }
				},
			},
			mark: {
				onremove: function (player) {
					delete player.storage.jlsg_yaoming;
				},
				intro: {
					content: function (storage, player) {
						var str = "使用过的花色：";
						var suits = [...player.storage.jlsg_yaoming[1]].sort();
						str += suits.reduce((a, b) => a + get.translation(b), "");
						return str;
					},
					markcount: function (storage, player) {
						return player.storage.jlsg_yaoming[1].size;
					},
				},
			},
			// clear: {
			//   trigger: { player: 'phaseAfter' },
			//   silent: true,
			//   content: function () {
			//     player.storage.jlsg_yaoming = { suits: [], types: [] }
			//   }
			// }
		},
	},
	jlsg_yaoming_: {
		audio: "ext:极略/audio/skill:4",
	},
	jlsg_yaoming_1: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: ["useCard", "respond"] },
		filter: function (event, player) {
			return player.storage.jlsg_yaoming && player.storage.jlsg_yaoming[0] == event && player.storage.jlsg_yaoming[1].size == 1;
		},
		// usable: 1,
		frequent: true,
		content: function () {
			player.draw();
		},
	},
	jlsg_yaoming_2: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: ["useCard", "respond"] },
		filter: function (event, player) {
			return player.storage.jlsg_yaoming && player.storage.jlsg_yaoming[0] == event && player.storage.jlsg_yaoming[1].size == 2;
		},
		// usable: 1,
		direct: true,
		content: function () {
			"step 0"
			player
				.chooseTarget(get.prompt("jlsg_yaoming"), function (card, player, target) {
					return player != target && target.countCards("he") > 0;
				})
				.set("ai", function (target) {
					return -get.attitude(_status.event.player, target);
				})
				.set("prompt2", "你可以弃置一名其他角色的一张牌");
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_yaoming_2", result.targets);
				event.target = result.targets[0];
				player.discardPlayerCard(event.target, true);
			} else {
				event.finish();
			}
		},
	},
	jlsg_yaoming_3: {
		sub: true,
		audio: "ext:极略/audio/skill:true",
		trigger: { player: ["useCard", "respond"] },
		filter: function (event, player) {
			return player.storage.jlsg_yaoming && player.storage.jlsg_yaoming[0] == event && player.storage.jlsg_yaoming[1].size == 3 && player.canMoveCard();
		},
		// usable: 1,
		prompt2: "你可以移动场上的一张牌",
		// frequent: true,
		check: function (event, player) {
			return player.canMoveCard(true);
		},
		content: function () {
			"step 0"
			// player.logSkill('jlsg_yaoming_3');
			player.moveCard();
			// player.moveCard(get.prompt2('jlsg_yaoming_3'));
		},
	},
	jlsg_yaoming_4: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: ["useCard", "respond"] },
		filter: function (event, player) {
			return player.storage.jlsg_yaoming && player.storage.jlsg_yaoming[0] == event && player.storage.jlsg_yaoming[1].size == 4;
		},
		// usable: 1,
		direct: true,
		content: function () {
			"step 0"
			player
				.chooseTarget(get.prompt("jlsg_yaoming"), function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					return -get.attitude(_status.event.player, target);
				})
				.set("prompt2", "你可以对一名其他角色造成一点伤害");
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_yaoming_4", result.targets);
				event.target = result.targets[0];
				event.target.damage();
			} else {
				event.finish();
			}
		},
	},
	jlsg_kuangfu: {
		trigger: { source: "damageEnd" },
		direct: true,
		audio: "ext:极略/audio/skill:2",
		filter: function (event) {
			if (event._notrigger.includes(event.player)) {
				return false;
			}
			return event.card && event.card.name == "sha" && event.player.countCards("e");
		},
		content: function () {
			player.gainPlayerCard("e", trigger.player, get.prompt(event.name, trigger.player)).logSkill = [event.name, trigger.player];
		},
	},
	jlsg_zhoufu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseBegin" },
		filter: function (event, player) {
			return player.countCards("h") != 0 && event.player != player;
		},
		direct: true,
		content: function () {
			"step 0"
			player
				.chooseToDiscard("h", get.prompt2(event.name, trigger.player))
				.set("ai", function (card) {
					return get.attitude(player, trigger.player) > -1 ? 0 : 6 - get.useful(card);
				})
				.set("logSkill", event.name);
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			trigger.player
				.judge(function (card) {
					if (get.color(card) == "black") {
						return -1;
					}
					return 1;
				})
				.set("judge2", result => !result.bool)
				.set("callback", function () {
					if (event.judgeResult.suit === "spade") {
						player.addTempSkill("baiban");
					} else if (event.judgeResult.suit === "club") {
						player.chooseToDiscard(2, true);
					}
				});
		},
		ai: {
			threaten: function (player, target) {
				if (player.getStat().skill.jlsg_zhoufu > 0 && target == _status.currentPhase) {
					return 2;
				}
				return 1.2;
			},
			expose: 0.2,
		},
	},
	// jlsg_zhoufu2: {
	//   init: function (player, skill) {
	//     var skills = player.getSkills(true, false);
	//     for (var i = 0; i < skills.length; i++) {
	//       if (get.skills[i]) {
	//         skills.splice(i--, 1);
	//       }
	//     }
	//     player.disableSkill(skill, skills);
	//   },
	//   onremove: function (player, skill) {
	//     player.enableSkill(skill);
	//   },
	//   mark: true,
	//   locked: true,
	//   intro: {
	//     content: function (storage, player, skill) {
	//       var list = [];
	//       for (var i in player.disabledSkills) {
	//         if (player.disabledSkills[i].includes(skill)) {
	//           list.push(i)
	//         }
	//       }
	//       if (list.length) {
	//         var str = '失效技能：';
	//         for (var i = 0; i < list.length; i++) {
	//           if (lib.translate[list[i] + '_info']) {
	//             str += get.translation(list[i]) + '、';
	//           }
	//         }
	//         return str.slice(0, str.length - 1);
	//       }
	//     },
	//   },
	// },
	jlsg_yingbing: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: { global: "judgeEnd" },
		filter: function (event, player) {
			if (!event.result) {
				return false;
			}
			if (!event.result.card) {
				return false;
			}
			if (event.nogain && event.nogain(event.result.card)) {
				return false;
			}
			return get.color(event.result.card) == "black" && event.player != player;
		},
		check: function (event, player) {
			return get.attitude(player, event.player) < 0;
		},
		content: function () {
			player.useCard({ name: "sha" }, trigger.player, false);
		},
	},
	jlsg_danqi: {
		audio: "danji",
		skillAnimation: true,
		unique: true,
		juexingji: true,
		derivation: ["jlsg_tuodao"],
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter: function (event, player) {
			return !player.storage.jlsg_danqi && player.countCards("h") > player.hp;
		},
		init: function (player) {
			player.storage.jlsg_danqi = false;
		},
		content: function () {
			player.awakenSkill("jlsg_danqi");
			player.storage.jlsg_danqi = true;
			player.loseMaxHp();
			player.recover(2);
			player.addSkills("jlsg_tuodao");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage") && target.countCards("h") >= target.hp && target.hp > 1 && target.getDamagedHp() < 3) {
						return [1, 1];
					}
				},
			},
		},
	},
	jlsg_tuodao: {
		audio: "ext:极略/audio/skill:1",
		trigger: { target: "shaMiss" },
		filter: function (event, player) {
			return event.player.inRangeOf(player);
		},
		direct: true,
		content: function () {
			"step 0"
			player.addSkill("jlsg_tuodao_buff");
			"step 1"
			player.chooseToUse({ name: "sha" }, "拖刀：是否对" + get.translation(trigger.player) + "使用一张【杀】？", trigger.player, -1).set("logSkill", "jlsg_tuodao");
			// .set('oncard', function(card, player) {
			//   _status.event.directHit.addArray(game.players);
			// });
			"step 2"
			player.removeSkill("jlsg_tuodao_buff");
		},
		subSkill: {
			buff: {
				audio: false,
				trigger: { player: "shaBegin" },
				forced: true,
				popup: false,
				content: function () {
					trigger.directHit = true;
				},
				ai: {
					unequip: true,
				},
			},
		},
	},
	jlsg_zhuiji: {
		audio: "ext:极略/audio/skill:2",
		forced: true,
		trigger: {
			source: "damageEnd",
		},
		filter: function (event, player) {
			return event.player != player;
		},
		content: function () {
			var target = trigger.player;
			if (!target.storage.jlsg_zhuiji_effect) {
				target.storage.jlsg_zhuiji_effect = [];
			}
			for (let info of target.storage.jlsg_zhuiji_effect) {
				if (info.player == player) {
					++info.count;
					target.markSkill("jlsg_zhuiji_effect");
					return;
				}
			}
			target.storage.jlsg_zhuiji_effect.push({
				player: player,
				count: 1,
			});
			target.addSkill("jlsg_zhuiji_effect");
			target.markSkill("jlsg_zhuiji_effect");
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					globalTo: function (from, to, distance) {
						for (let info of to.storage.jlsg_zhuiji_effect) {
							if (info.player == from) {
								return distance - info.count;
							}
						}
					},
				},
				intro: {
					markcount(content, player) {
						return content.reduce((a, b) => a + b.count, 0);
					},
					content(content, player, skill) {
						return content.map(info => `${get.translation(info.player)}计算与你的距离-${info.count}`).join("<br>");
					},
				},
			},
		},
	},
	jlsg_xionglie: {
		audio: "ext:极略/audio/skill:2",
		direct: true,
		shaRelated: true,
		trigger: { player: "useCardToPlayered" },
		filter: function (event, target) {
			return event.isFirstTarget && event.card.name == "sha";
		},
		content: function () {
			"step 0"
			var special = !game.hasPlayer(p => p != player && get.distance(player, p) > 1);
			event.special = special;
			var effect = 0;
			for (var p of trigger.targets) {
				if (trigger.excluded.includes(p)) {
					continue;
				}
				effect += get.effect(p, trigger.card, player, player);
			}
			var choice = effect >= 1;
			if (special) {
				var prompt = `###${get.prompt(event.name)}###此【杀】不可被【闪】响应且伤害+1`;
				player.chooseBool(prompt, choice);
			} else {
				player
					.chooseControlList(["此【杀】不可被【闪】响应", "此【杀】伤害+1"], get.prompt(event.name), function (event, player) {
						if (_status.event.choice) {
							return [0, 1].randomGet();
						}
						return 2;
					})
					.set("choice", choice);
			}
			"step 1"
			var crit = [false, false];
			if (event.special) {
				if (result.bool) {
					crit = [true, true];
				}
			} else {
				if (result.index < 2) {
					crit[result.index] = true;
				}
			}
			if (crit[0] || crit[1]) {
				player.logSkill(event.name);
			}
			if (crit[0]) {
				game.log(trigger.card, "不可被【闪】响应");
				trigger.directHit.length = 0;
				trigger.directHit.push(...game.players);
			}
			if (crit[1]) {
				game.log(trigger.card, "伤害+1");
				++trigger.getParent().baseDamage;
			}
		},
		ai: {
			directHit_ai: true,
		},
	},
	jlsg_chenqing: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "dying" },
		usable: 1,
		filter: function (event, player) {
			return event.player.hp <= 0;
		},
		direct: true,
		init: function (player) {
			player.storage.jlsg_chenqing = 0;
		},
		content: function () {
			"step 0"
			player
				.chooseTarget(get.prompt2("jlsg_chenqing"), function (card, player, target) {
					return target != player && target != _status.event.getTrigger().player;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var trigger = _status.event.getTrigger();
					var att1 = get.attitude(player, trigger.player); // 菜 -> 濒死角色
					var att2 = get.attitude(target, trigger.player); // 目标 -> 濒死角色
					var att3 = get.attitude(player, target); // 菜 -> 目标
					switch (_status.event.discardNum) {
						case 0:
						case 1:
							att1 *= 2.5;
							att2 = 0;
							break;
						case 2:
						case 3:
							att2 *= get.sgn(att2) == get.sgn(att1) ? 0.5 : -0.5;
							att3 *= 1.2;
							break;
						case 4:
							att2 *= get.sgn(att2) == get.sgn(att1) ? 0.5 : -0.5;
							att3 *= 1.5;
							buff = Math.min(0.5, target.countCards("he") * 0.1);
							if (att2 > 0) {
								buff *= 1.2;
							}
							att3 *= 1 + buff;
							break;
						case 5:
							att1 = att2 = 0;
							if (target.countCards("he") == 0) {
								att3 = 0;
							}
							if (target.countCards("he") <= 1) {
								att3 = -att3;
								break;
							}
							att3 += 0.5 * Math.random();
							if (target.countCards("he") == 2) {
								att3 = -0.4 * att3;
							}
							att3 *= Math.min(1, 0.1 * target.countCards("he"));
							break;
						default:
							att1 = att2 = 0;
							att3 = -att3;
							if (target.countCards("he") + 4 < _status.event.discardNum) {
								att3 *= target.countCards("he") / (_status.event.discardNum - 4);
							}
							break;
					}
					// if (att3 < 0) return 0;
					return att1 + att2 + att3;
				})
				.set("discardNum", player.storage.jlsg_chenqing);
			"step 1"
			if (result.bool) {
				// player.addTempSkill('chenqing2', 'roundStart');
				event.target = result.targets[0];
				event.target.draw(4);
				player.logSkill("chenqing", event.target);
			} else {
				event.finish();
			}
			"step 2"
			var num = player.storage.jlsg_chenqing;
			var target = event.target;
			var tosave = trigger.player;
			var att = get.attitude(target, tosave);
			var hastao = target.countCards("h", "tao");
			if (num == 0) {
				return;
			}
			target
				.chooseToDiscard(num, true, "he")
				.set("ai", function (card) {
					var num = _status.event.selectCard[0];
					var hastao = _status.event.hastao;
					var att = _status.event.att;
					if (!hastao && att > 0) {
						var suit = get.suit(card);
						for (var i = 0; i < ui.selected.cards.length; i++) {
							if (get.suit(ui.selected.cards[i]) == suit) {
								return -4 - get.value(card);
							}
						}
					}
					if (att < 0 && ui.selected.cards.length + 1 == num) {
						var suit = get.suit(card);
						for (var i = 0; i < ui.selected.cards.length; i++) {
							if (get.suit(ui.selected.cards[i]) == suit) {
								return -get.value(card);
							}
						}
						return -10 - get.value(card);
					}
					return -get.value(card);
				})
				.set("hastao", hastao)
				.set("att", att);
			"step 3"
			++player.storage.jlsg_chenqing;
			player.markSkill("jlsg_chenqing");
			if (result.cards) {
				var suits = [];
				for (var i = 0; i < result.cards.length; i++) {
					suits.add(get.suit(result.cards[i]));
				}
				if (suits.length != result.cards.length) {
					return;
				}
			}
			if (game.checkMod({ name: "tao", isCard: true }, player, trigger.player, "unchanged", "cardSavable", player)) {
				event.target.useCard({ name: "tao", isCard: true }, trigger.player);
			}
		},
		intro: {
			content: "已经发动了&次技能",
		},
		ai: {
			expose: 0.2,
			threaten: 1,
		},
	},
	jlsg_mozhi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseJieshuBegin" },
		direct: true,
		filter: function (event, player) {
			return (
				event.player.getHistory("useCard", function (evt) {
					return ["basic", "trick"].includes(get.type(evt.card));
				}).length > 0 && player.countCards("hs") > 0
			);
		},
		content: function () {
			var card = trigger.player
				.getHistory("useCard", function (evt) {
					return ["basic", "trick"].includes(get.type(evt.card));
				})
				.pop().card;
			event._result = {};
			card = { name: card.name, nature: card.nature };
			if (card.name != "jiu" && lib.filter.cardEnabled(card)) {
				if (
					game.hasPlayer(function (current) {
						return player.canUse(card, current);
					})
				) {
					lib.skill.jlsg_mozhix.viewAs = card;
					var next = player.chooseToUse();
					if (next.isOnline()) {
						player.send(function (card) {
							lib.skill.jlsg_mozhix.viewAs = card;
						}, card);
					}
					next.logSkill = "jlsg_mozhi";
					next.set("openskilldialog", `###${get.prompt(event.name)}###将一张手牌当${get.translation(card)}使用`);
					next.set("norestore", true);
					next.set("_backupevent", "jlsg_mozhix");
					next.set("custom", {
						add: {},
						replace: { window: function () {} },
					});
					next.backup("jlsg_mozhix");
				}
			}
		},
	},
	jlsg_mozhix: {
		filterCard: function (card) {
			return get.itemtype(card) == "card";
		},
		selectCard: 1,
		position: "hs",
		popname: true,
	},
	jlsg_hemeng: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("h") && player.storage.jlsg_hemeng_usable;
		},
		filterTarget: function (card, player, target) {
			return player != target;
		},
		content: function () {
			"step 0"
			player.storage.jlsg_hemeng_usable--;
			// target.viewCards('和盟', player.getCards('h'));
			target.gainPlayerCard(player, "h", "visible", true);
			"step 1"
			// player.viewCards('和盟', target.get('he'));
			// target.isUnderControl();
			player.gainPlayerCard(target, "visible", true, "he").set("ai", function (button) {
				var card = button.link;
				return get.value(card);
			});
		},
		init: function (player) {
			player.storage.jlsg_hemeng_usable = 0;
		},
		group: ["jlsg_hemeng_usable"],
		subSkill: {
			usable: {
				trigger: { player: "phaseUseBegin" },
				popup: false,
				forced: true,
				content: function () {
					player.storage.jlsg_hemeng_usable = player.getDamagedHp() + 1;
				},
			},
		},
		ai: {
			order: 6,
			result: {
				player: 1,
				target: -0.5,
			},
		},
	},
	jlsg_sujian: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "gainEnd" },
		filter: function (event, player) {
			// return (event.cards[0].original == 'h' || event.cards[0].original == 'e' || event.cards[0].original == 'j');
			if (!event.source || event.source == player || !event.source.isIn()) {
				return false;
			}
			var evt = event.getl(event.source);
			return evt && evt.cards2 && evt.cards2.length != 0;
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2("jlsg_sujian"), function (card, player, target) {
				return player != target && target.countDiscardableCards(player, "he") > 0;
			}).ai = function (target) {
				// if (!player.countCards('he')) return -get.attitude(player, target) && target.countCards('he');
				// if (player.countCards('he') > 4) return get.attitude(player, target) && target.countCards('he');
				// return 0;
				return get.effect(target, { name: "guohe" }, player, player) + get.effect(player, { name: "guohe" }, target, player) - 1;
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_sujian", result.targets);
				result.targets[0].discardPlayerCard(player, "he", true);
				player.discardPlayerCard(result.targets[0], "he", true);
			}
		},
	},
	jlsg_yexi: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseJieshuBegin" },
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		direct: true,
		content: function () {
			"step 0"
			var check,
				i,
				num = 0;
			for (i = 0; i < game.players.length; i++) {
				if (player != game.players[i] && game.players[i].num("h") > 1) {
					var att = get.attitude(player, game.players[i]);
					if (att > 3) {
						num++;
					}
				}
			}
			check = num > 0 && (player.countCards("h") > 1 || player.hp > 2);
			player.chooseCardTarget({
				ai1: function (card) {
					var evt = _status.event;
					if (!evt.check) {
						return 0;
					}
					return 6 - get.useful(card);
				},
				ai2: function (target) {
					var evt = _status.event;
					if (!evt.check) {
						return 0;
					}
					return get.attitude(evt.player, target);
				},
				filterTarget: function (card, player, target) {
					return target != player;
				},
				filterCard: true,
				prompt: "是否发动【夜袭】？",
				check: check,
				target: target,
			});
			"step 1"
			if (result.bool) {
				event.target = result.targets[0];
				player.logSkill("jlsg_yexi", event.target);
				player.discard(result.cards);
				event.target
					.chooseControl("选项一", "选项二", function () {
						return Math.random() < 0.5 ? "选项一" : "选项二";
					})
					.set("prompt", '夜袭<br><br><div class="text">1:使用黑色【杀】时无视防具.</div><br><div class="text">2:使用红色【杀】时无视距离.</div></br>');
			} else {
				event.finish();
			}
			"step 2"
			if (result.control == "选项一") {
				event.target.addSkill("jlsg_yexi_getBlack");
			} else {
				event.target.addSkill("jlsg_yexi_getRed");
			}
		},
		subSkill: {
			getBlack: {
				unique: true,
				trigger: { player: "phaseUseBegin" },
				forced: true,
				popup: false,
				mark: true,
				marktext: "夜",
				intro: {
					name: "夜袭",
					content: "使用黑色【杀】时无视防具",
				},
				content: function () {
					player.addTempSkill("jlsg_yexi_black", "phaseAfter");
					player.removeSkill("jlsg_yexi_getBlack");
				},
			},
			getRed: {
				trigger: { player: "phaseUseBegin" },
				forced: true,
				unique: true,
				popup: false,
				mark: true,
				marktext: "夜",
				intro: {
					name: "夜袭",
					content: "使用红色【杀】时无视距离",
				},
				content: function () {
					player.addTempSkill("jlsg_yexi_red", "phaseAfter");
					player.removeSkill("jlsg_yexi_getRed");
				},
			},
			black: {
				mark: true,
				unique: true,
				marktext: "夜",
				intro: {
					name: "夜袭",
					content: "使用黑色【杀】时无视防具",
				},
				trigger: { player: "shaBefore" },
				forced: true,
				popup: false,
				filter: function (event, player) {
					return event.card && get.color(event.card) == "black";
				},
				content: function () {
					player.addTempSkill("unequip", "shaAfter");
				},
			},
			red: {
				mark: true,
				unique: true,
				marktext: "夜",
				intro: {
					name: "夜袭",
					content: "使用红色【杀】时无视距离",
				},
				mod: {
					targetInRange: function (card, player) {
						if (card.name == "sha" && get.color(card) == "red") {
							return true;
						}
					},
				},
			},
		},
	},
	jlsg_kuangyan: {
		audio: "ext:极略/audio/skill:2",
		group: ["jlsg_kuangyan1", "jlsg_kuangyan2"],
	},
	jlsg_kuangyan1: {
		audio: "ext:极略/audio/skill:true",
		priority: -1,
		trigger: { player: "damageBegin3" },
		filter: function (event, player) {
			return !event.nature && event.num == 1;
		},
		forced: true,
		content: function () {
			trigger.cancel();
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (!get.nature(card)) {
							if (card.name == "sha" && (!player.hasSkill("jiu") || !player.hasSkill("reluoyi") || !player.hasSkill("luoyi"))) {
								return 0.1;
							}
							return 0.2;
						}
					}
				},
			},
		},
		group: null,
	},
	jlsg_kuangyan2: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: "damageBegin3" },
		filter: function (event, player) {
			return event.num >= 2;
		},
		priority: -1,
		forced: true,
		content: function () {
			trigger.num++;
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (card.name == "sha" && (player.hasSkill("jiu") || player.hasSkill("reluoyi") || player.hasSkill("luoyi"))) {
							return [1, -2];
						}
					}
				},
			},
		},
		group: null,
	},
	jlsg_chaochen: {
		audio: "ext:极略/audio/skill:1",
		usable: 1,
		enable: "phaseUse",
		filterCard: true,
		selectCard: [1, Infinity],
		discard: false,
		lose: false,
		// prepare: function (cards, player, targets) {
		//   player.$give(cards.length, targets[0]);
		// },
		filterTarget: function (card, player, target) {
			return player != target;
		},
		check: function (card) {
			if (ui.selected.cards.length == 0) {
				return 4 - get.value(card);
			}
			return 0;
		},
		content: function () {
			player.give(cards, target);
			target.addTempSkill("jlsg_chaochen2", { player: "phaseAfter" });
			target.markAuto("jlsg_chaochen2", [player]);
		},
		ai: {
			order: 0.5,
			result: {
				player: -1,
				target: function (player, target) {
					var th = target.countCards("h");
					if (th + 1 > target.hp) {
						return -1;
					}
					return 0;
				},
			},
		},
	},
	jlsg_chaochen2: {
		audio: "jlsg_chaochen",
		mark: true,
		marktext: "朝",
		intro: {
			content: "回合开始时，若手牌数大于体力值，受到$造成的1点伤害",
		},
		trigger: { player: "phaseBegin" },
		filter: function (event, player) {
			return player.storage.jlsg_chaochen2 && player.countCards("h") > player.hp;
		},
		direct: true,
		onremove: function (player) {
			delete player.storage.jlsg_chaochen2;
		},
		content: function () {
			"step 0"
			var target = player.storage.jlsg_chaochen2.shift();
			target.logSkill("jlsg_chaochen2", player);
			player.damage(target);
			if (player.storage.jlsg_chaochen2.length) {
				event.redo();
			}
			// player.storage.jlsg_chaochen2.logSkill('jlsg_chaochen2', player);
			// player.damage(player.storage.jlsg_chaochen2);
			// delete player.storage.jlsg_chaochen2;
		},
	},
	jlsg_quanzheng: {
		audio: "ext:极略/audio/skill:1",
		trigger: { target: "useCardToBefore" },
		filter: function (event, player) {
			if (event.player == player) {
				return false;
			}
			if (event.player.countCards("h") > player.countCards("h") || event.player.countCards("e") > player.countCards("e")) {
				return get.type(event.card) == "trick" || event.card.name == "sha";
			}
			return false;
		},
		frequent: true,
		content: function () {
			player.draw();
		},
	},
	jlsg_shejian: {
		audio: "ext:极略/audio/skill:1",
		enable: "phaseUse",
		filter: function (event, player) {
			return !player.get("e", "2") && game.countPlayer(p => p.countCards("he") && player != p && !p.hasSkill("jlsg_shejian2"));
		},
		filterTarget: function (card, player, target) {
			return target.countCards("he") && player != target && !target.hasSkill("jlsg_shejian2");
		},
		content: function () {
			"step 0"
			target.addTempSkill("jlsg_shejian2");
			player.discardPlayerCard("he", target, true);
			"step 1"
			target.chooseBool("是否对" + get.translation(player) + "使用一张【杀】？").ai = function (event, player) {
				return get.effect(player, { name: "sha" }, target, target) + 3;
			};
			"step 2"
			if (result.bool) {
				target.useCard({ name: "sha" }, player, false);
			}
		},
		ai: {
			order: 9,
			result: {
				player: function (player, target) {
					if (player.hp <= 2) {
						return -2;
					}
					if (!player.countCards("h", "shan")) {
						return -1;
					}
					return -0.5;
				},
				target: -1,
			},
		},
	},
	jlsg_shejian2: {},
	jlsg_kuangao: {
		audio: "ext:极略/audio/skill:2",
		trigger: { target: "shaAfter" },
		filter: function (event, player) {
			if (!event.player) {
				return false;
			}
			return (
				player.countCards("he") || // && event.player.countCards('he')
				event.player.countCards("h") < Math.min(5, event.player.maxHp)
			);
		},
		check: function (event, player) {
			var phe = player.countCards("he");
			var the = event.player.countCards("he");
			if (the > phe && get.attitude(player, event.player) < 0) {
				return 1;
			}
			if (event.player.countCards("h") < event.player.maxHp && get.attitude(player, event.player) > 0) {
				return 1;
			}
			return 0;
		},
		direct: true,
		content: function () {
			"step 0"
			event.target = trigger.player;
			var prompts = [`弃置所有牌，然后${get.translation(event.target)}弃置所有牌`, `令${get.translation(event.target)}摸牌至体力上限（至多摸至五张）`];
			event.prompts = [];
			if (player.countCards("he")) {
				event.prompts.push(0);
			}
			if (event.target.countCards("h") < Math.min(5, event.target.maxHp)) {
				event.prompts.push(1);
			}
			var coeff = 0.5 * Math.random() + 0.75; // target card guess coeff
			var ai = function (event, player) {
				if (get.attitude(player, event.target) > 0) {
					if (!event.prompts.includes(1)) {
						return "cancel2";
					}
					return prompts[1];
				} else {
					if (!event.prompts.includes(0)) {
						return "cancel2";
					}
					var targetHEValue = coeff * event.target.getCards("h").reduce((a, b) => a + get.value(b, event.target), 0) + event.target.getCards("e").reduce((a, b) => a + get.value(b, event.target), 0);
					var playerHEValue = player.getCards("he").reduce((a, b) => a + get.value(b, player), 0);
					return -coeff * targetHEValue * get.attitude(player, event.target) - playerHEValue * get.attitude(player, player) > 0 ? event.prompts.indexOf(0) : "cancel2";
				}
			};
			player.chooseControlList(
				event.prompts.map(n => prompts[n]),
				ai,
				get.prompt(event.name, event.target)
			);
			"step 1"
			if (result.control == "cancel2") {
				event.finish();
				return;
			}
			player.logSkill(event.name, event.target);
			if (event.prompts[result.index] == 0) {
				player.discard(player.getCards("he"));
				event.target.discard(event.target.getCards("he"));
			} else {
				event.target.drawTo(event.target.maxHp);
			}
		},
		// contentx: function () {
		//   'step 0'
		//   player.chooseControl('选项一', '选项二', function () {
		//     var phe = player.countCards('he');
		//     var the = trigger.player.countCards('he');
		//     if (the > phe && get.attitude(player, trigger.player) < 0) return '选项一';
		//     if (get.attitude(player, trigger.player) > 0) return '选项二';
		//     return '选项二';
		//   }).set('prompt', '狂傲<br><br><div class="text">1:弃置所有牌(至少一张),然后' + get.translation(trigger.player) + '弃置所有牌.</div><br><div class="text">2:令' + get.translation(trigger.player) + '将手牌补至其体力上限的张数(至多5张).</div></br>');
		//   'step 1'
		//   if (result.control == '选项一') {
		//     player.discard(player.get('he'));
		//     trigger.player.discard(trigger.player.get('he'));
		//   } else {
		//     if (Math.min(5, trigger.player.maxHp) - trigger.player.countCards('h')) {
		//       trigger.player.drawTo(trigger.player.maxHp);
		//     }
		//   }
		// },
		// ai: {
		//   effect: {
		//     target: function (card, player, target, current) {
		//       if (card.name != 'sha') return;
		//       if (get.attitude(player, target) < 0) return [1, -target.countCards('he'), 1, -player.countCards('he')];
		//       if (get.attitude(player, target) > 3 && player.countCards('h') < player.maxHp - 2 && target.hp > 2) return [1, 0.5, 1, Math.min(5, player.maxHp) - player.countCards('h')];
		//       return [1, -target.countCards('he'), 1, -player.countCards('he')];
		//     }
		//   }
		// }
	},
	jlsg_yinbing: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "shaBegin" },
		filter: function (event, player) {
			if (event.player == player || event.target == player) {
				return false;
			}
			return event.target.inRangeOf(player) && event.target.countCards("e");
		},
		logTarget: "target",
		check: function (event, player) {
			if (player.countCards("h", "shan") && get.effect(event.target, { name: "sha" }, event.player, player) < 0) {
				return 1;
			}
			if (player.hp == 1 && event.player.countCards("e", "guanshi")) {
				return 0;
			}
			if (get.attitude(player, event.target) > 0 && player.hp >= 2 && get.effect(event.target, { name: "sha" }, event.player, player) < 0) {
				return 1;
			}
			return 0;
		},
		content: function () {
			player.gainPlayerCard(trigger.target, "e", true);
			trigger.target = player;
			trigger.untrigger();
			trigger.trigger("useCardToBefore");
			trigger.trigger("shaBefore");
		},
		group: ["jlsg_yinbing2"],
	},
	jlsg_yinbing2: {
		audio: "ext:极略/audio/skill:true",
		trigger: { target: "shaBefore" },
		filter: function (event, player) {
			return player.countCards("he") > 0 && player.isDamaged();
		},
		direct: true,
		content: function () {
			"step 0"
			var next = player.chooseToDiscard(get.prompt("jlsg_yinbing2"), "he");
			next.ai = function (card) {
				if (player.getDamagedHp() > 1) {
					return 6 - get.value(card);
				}
				if (player.getDamagedHp() > 2) {
					return 10 - get.value(card);
				}
				return 4 - get.value(card);
			};
			next.logSkill = "jlsg_yinbing2";
			"step 1"
			if (result.bool) {
				player.draw(player.getDamagedHp());
			}
		},
	},
	jlsg_fenwei: {
		audio: "ext:极略/audio/skill:1",
		trigger: { source: "damageBegin1" },
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && event.notLink() && event.player.countCards("h");
		},
		direct: true,
		content: function () {
			"step 0"
			player.choosePlayerCard("h", trigger.player);
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.showCards(result.cards);
			player.logSkill(event.name, trigger.player);
			var card = result.cards[0];
			if (card.name == "tao" || card.name == "jiu") {
				player.gain(card, trigger.player, "give", "bySelf");
			}
			if (get.type(card) != "basic") {
				trigger.player.discard(card, "notBySelf");
				trigger.num++;
			}
		},
	},
	jlsg_shiyong: {
		trigger: { player: "damageEnd" },
		audio: "ext:极略/audio/skill:1",
		filter(event) {
			if (event.card?.name == "sha") {
				if (get.color(event.card) == "red") {
					return true;
				}
				if (event.getParent(2).jiu == true) {
					return true;
				}
			}
			return false;
		},
		forced: true,
		async content(event, trigger, player) {
			await player.loseMaxHp();
		},
		ai: {
			neg: true,
			effect: {
				target: function (card, player, target, current) {
					if (card.name == "sha") {
						if (get.color(card) == "red") {
							return [1, -2];
						}
						if (player.hasSkill("jiu")) {
							return [1, -1.5];
						}
					}
				},
			},
		},
	},
	jlsg_angyang: {
		shaRelated: true,
		audio: "ext:极略/audio/skill:1",
		trigger: { player: ["shaBefore", "juedouBefore"] },
		filter: function (event, player) {
			if (event.card.name == "juedou") {
				return true;
			}
			return get.color(event.card) == "red";
		},
		frequent: true,
		content: function () {
			if (trigger.target.countCards("j")) {
				player.draw(2);
			} else {
				player.draw();
			}
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (card.name == "sha" && get.color(card) == "red") {
						return [1, 0.6];
					}
				},
				player: function (card, player, target) {
					if (card.name == "sha" && get.color(card) == "red") {
						return [1, 1];
					}
				},
			},
		},
		group: "jlsg_angyang2",
	},
	jlsg_angyang2: {
		audio: "jlsg_angyang",
		trigger: { target: ["shaBefore", "juedouBefore"] },
		filter: function (event, player) {
			if (event.card.name == "juedou") {
				return true;
			}
			return get.color(event.card) == "red";
		},
		frequent: true,
		content: function () {
			if (trigger.player.countCards("j")) {
				player.draw(2);
			} else {
				player.draw();
			}
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (card.name == "juedou") {
						return [1, 0.6];
					}
				},
				player: function (card, player, target) {
					if (card.name == "juedou") {
						return [1, 1];
					}
				},
			},
		},
	},
	jlsg_weifeng: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.countCards("h") < player.hp && game.countPlayer(p => player.canCompare(p));
		},
		direct: true,
		content: function () {
			"step 0"
			var num = game.me.getCards("h").reduce((a, b) => (a < get.number(b) ? get.number(b) : a), 0);
			player
				.chooseTarget("是否发动【威风】？", function (card, player, target) {
					return player.canCompare(target);
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var eff = -get.attitude(player, target) - get.attitude(player, player);
					var playerExpect = ((_status.event.num - 1) / 13) ** target.countCards("h");
					eff += 2 * playerExpect * get.attitude(player, player) + 2 * (1 - playerExpect) * get.attitude(player, target) + 1;
					return eff;
				})
				.set("num", num);
			"step 1"
			if (result.bool) {
				event.target = result.targets[0];
				player.logSkill("jlsg_weifeng", event.target);
				player.chooseToCompare(event.target);
			} else {
				event.finish();
			}
			"step 2"
			if (result.bool) {
				player.draw(2);
			} else {
				event.target.draw(2);
			}
		},
	},
	jlsg_xieli: {
		audio: "ext:极略/audio/skill:1",
		zhuSkill: true,
		trigger: { player: "chooseToCompareBegin" },
		filter: function (event, player) {
			return player.hasZhuSkill("jlsg_xieli") && game.hasPlayer(p => p != player && p.group == "wu");
		},
		check: function (event, player) {
			return game.hasPlayer(p => p != player && p.group == "wu" && get.attitude(player, p) > 1);
		},
		content: function () {
			"step 0"
			event.targets = game.filterPlayer(p => p != player && p.group == "wu");
			event.cards = [];
			"step 1"
			var current = event.targets.shift();
			event.current = current;
			if (!current) {
				event.goto(3);
			} else if (!current.countCards("h")) {
				event.redo();
			} else {
				current.chooseCard("是否帮" + get.translation(player) + "打出一张拼点牌？").ai = function (card) {
					if (get.attitude(current, player) > 2) {
						return get.number(card, player) > 8 && 7 - get.value(card);
					} else if (get.attitude(current, player) < -2 && event.cards.length == 0 && !event.targets.some(p => p.countCards("h") && get.attitude(p, player) > 2)) {
						// 使坏
						return get.number(card, player) < 5 && 7 - get.value(card);
					}
					return 0;
				};
			}
			"step 2"
			if (result.bool) {
				event.cards = event.cards.concat(result.cards[0]);
				event.current.lose(result.cards[0], ui.ordering).set("getlx", false);
				// event.current.$give(1, player);
				event.current.$throw(1, 1000);
			}
			event.goto(1);
			"step 3"
			if (event.cards.length) {
				player.chooseButton(["协力", event.cards], true).set("ai", function (button) {
					return get.number(button.link, player);
				});
			} else {
				event.finish();
			}
			"step 4"
			if (!trigger.fixedResult) {
				trigger.fixedResult = {};
			}
			trigger.fixedResult[player.playerid] = result.buttons[0].link;
			// player.gain(result.buttons[0].link);
			// player.discard(event.cards);
		},
	},
	jlsg_jushou: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseJieshuBegin" },
		check: function (event, player) {
			var num = game.filterPlayer(p => p != player && player.inRangeOf(p)).length;
			if (player.isTurnedOver()) {
				return true;
			}
			if (num > 2) {
				return 1;
			}
			return 0;
		},
		content: function () {
			"step 0"
			var num = game.filterPlayer(p => p != player && player.inRangeOf(p)).length;
			player.draw(Math.min(5, num + 1));
			player.turnOver();
		},
	},
	jlsg_yicong: {
		audio: "yicong",
		inherit: "yicong",
	},
	jlsg_muma: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "loseAfter" },
		forced: true,
		filter: function (event, player) {
			if (event.player == player) {
				return false;
			}
			if (_status.currentPhase == player) {
				return false;
			}
			for (var i = 0; i < event.cards.length; i++) {
				if (event.cards[i].original == "e" && get.position(event.cards[i]) == "d") {
					return !player.get("e", get.subtype(event.cards[i])[5]) && (get.subtype(event.cards[i]) == "equip3" || get.subtype(event.cards[i]) == "equip4");
				}
			}
			return false;
		},
		content: function () {
			for (var i = 0; i < trigger.cards.length; i++) {
				if (trigger.cards[i].original == "e" && !player.get("e", get.subtype(trigger.cards[i])[5]) && (get.subtype(trigger.cards[i]) == "equip3" || get.subtype(trigger.cards[i]) == "equip4")) {
					player.gain(trigger.cards[i], "gain");
				}
			}
		},
	},
	jlsg_suiji: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseDiscardBegin" },
		filter: function (event, player) {
			return event.player != player && player.countCards("h");
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseCard("是否对" + get.translation(trigger.player) + "发动【随骥】？", [1, Infinity]).set("ai", function (card) {
				var cha = trigger.player.countCards("h") - trigger.player.hp;
				var att = get.attitude(player, trigger.player);
				if (cha == 0 && ui.selected.cards.length == 0) {
					return att > 3 ? 2 : -1;
				}
				if (cha >= 1) {
					if (ui.selected.cards.length == 0) {
						if (att > 0) {
							return get.value(card);
						}
						return 7.5 - get.value(card);
					}
					if (ui.selected.cards.length >= 1) {
						return -1;
					}
				}
				if (trigger.player.countCards("h") <= 2 && get.attitude(player, trigger.player) > 3 && player.countCards("h") > 3) {
					return 6 - get.value(card);
				}
				return 0;
			});
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_suiji", trigger.player);
				trigger.player.gain(result.cards, player, "giveAuto");
			} else {
				event.finish();
			}
			"step 2"
			var num = trigger.player.countCards("h") - trigger.player.hp;
			if (num > 0) {
				var next = trigger.player.chooseCard("交给" + get.translation(player) + get.translation(num) + "张手牌", num, true);
				next.ai = function (card) {
					var att = get.attitude(trigger.player, player);
					if (att > 3) {
						if (ui.selected.cards.length == 0 && trigger.hp > player.hp) {
							return get.value(card);
						}
					}
					return 20 - get.value(card);
				};
			} else {
				event.finish();
			}
			"step 3"
			if (result.bool) {
				player.gain(result.cards, trigger.player, "giveAuto");
			}
		},
	},
	jlsg_fengyi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { target: "useCardToBefore" },
		filter: function (event, player) {
			return get.type(event.card) == "trick" && event.targets.length == 1;
		},
		frequent: true,
		content: function () {
			player.draw();
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (get.type(card) == "trick") {
						if (card.name == "jiedao") {
							return;
						}
						if (get.tag(card, "multitarget")) {
							return;
						}
						return [0.5, 0.6];
					}
				},
			},
		},
	},
	jlsg_yalv: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["damageEnd", "phaseUseBegin"] },
		frequent: true,
		content: function () {
			"step 0"
			event.cards = get.cards(2);
			game.cardsGotoOrdering(event.cards);
			player.chooseBool(get.value(event.cards[0]) < get.value(event.cards[1])).set("createDialog", ["雅虑：是否调换牌堆顶两张牌的顺序？", event.cards, "hidden"]);
			// player.chooseCardButton('雅虑:请选择牌堆顶的牌,先选择的在上', 2, event.cards, true);
			"step 1"
			if (!result.bool) {
				event.cards.reverse();
			}
			for (var card of event.cards) {
				ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
			}
			player.chooseBool("是否摸一张牌？", () => true).set("frequentSkill", event.name);
			"step 2"
			if (result.bool) {
				player.draw();
			}
		},
	},
	jlsg_xiemu: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseZhunbeiBegin" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("he");
		},
		content: function () {
			"step 0"
			player.chooseCard(get.prompt(event.name, trigger.player), "he").ai = function (card) {
				if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge("lebu")) {
					return get.suit(card) == "heart";
				}
				if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge("bingliang")) {
					return get.suit(card) == "club";
				}
				if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge("shandian")) {
					return get.suit(card) != "spade" || card.number < 2 || card.number > 9;
				}
				if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge("lebu")) {
					return get.suit(card) != "heart";
				}
				if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge("bingliang")) {
					return get.suit(card) != "club";
				}
				if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge("shandian")) {
					return get.suit(card) == "spade" && card.number >= 2 && card.number <= 9;
				}
				if (trigger.player == player) {
					return 10;
				}
				return 0;
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_xiemu", trigger.player);
				trigger.player.addTempSkill("jlsg_xiemu3");
				player.lose(result.cards, ui.cardPile, "insert");
				game.log(player, "将一张牌置于牌堆顶");
				player.$throw(1, 1000);
			}
		},
		group: "jlsg_xiemu2",
	},
	jlsg_xiemu2: {
		trigger: { global: "phaseJieshuBegin" },
		audio: "ext:极略/audio/skill:1",
		logTarget: "player",
		prompt2: function (event, player) {
			if (player == event.player) {
				return "摸一张牌";
			} else {
				return `令${get.translation(event.player)}摸一张牌`;
			}
		},
		frequent: function (event, player) {
			return event.player == player;
		},
		filter: function (event, player) {
			return event.player.hasSkill("jlsg_xiemu3");
		},
		check: function (event, player) {
			if (get.attitude(player, event.player) > 0) {
				return 1;
			}
			return 0;
		},
		content: function () {
			// player.logSkill('jlsg_xiemu', trigger.player);
			trigger.player.draw();
		},
	},
	jlsg_xiemu3: {},
	jlsg_zhejie: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseDiscardEnd" },
		filter(event, player) {
			return event.player != player && player.countDiscardableCards(player, "h") > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard(`###${get.prompt(event.skill, trigger.player)}###你弃置一张手牌并令其弃置一张牌，若其弃置牌为装备牌，你可以将之交给另一名角色`)
				.set("ai", card => {
					const target = get.event().getParent().getTrigger().player;
					if (get.attitude(player, target) < 0 && target.countDiscardableCards(target, "he")) {
						return 5.5 - get.value(card);
					}
					return 0;
				})
				.set("logSkill", ["jlsg_zhejie", trigger.player])
				.set("chooseonly", true)
				.forResult();
		},
		popup: false,
		async content(event, trigger, player) {
			await player.discard(event.cards);
			if (!trigger.player.isIn() || !trigger.player.countDiscardableCards(trigger.player, "he")) {
				return;
			}
			const cards = await trigger.player
				.chooseToDiscard("he", true)
				.set("ai", function (card) {
					let att = get.attitude(get.player(), get.event().target) / 10,
						eff = -get.value(card);
					if (get.type(card) == "equip") {
						eff *= 1 - att;
					}
					return eff;
				})
				.set("target", player)
				.forResultCards();
			if (get.type(cards[0]) == "equip") {
				if (trigger.player.countDiscardableCards(trigger.player, "he", c => get.type(c) != "equip") && trigger.player.ai.shown < player.ai.shown) {
					let attSum = get.sgnAttitude(trigger.player, player) + get.sgnAttitude(player, trigger.player);
					if (attSum > 0) {
						trigger.player.addExpose(0.1);
					}
					if (attSum < 0) {
						trigger.player.addExpose(-0.1);
					}
				}
				const targets = await player
					.chooseTarget("是否令一名角色获得" + get.translation(cards[0]))
					.set("filterTarget", (card, player, target) => target != get.event().preTarget)
					.set("ai", target => {
						return get.sgnAttitude(get.player(), target) * target.getUseValue(get.event("card"));
					})
					.set("preTarget", trigger.player)
					.set("card", cards[0])
					.forResultTargets();
				if (targets?.length) {
					player.line(targets[0]);
					await targets[0].gain(cards, "gain2");
				}
			}
		},
		ai: {
			expose: 0.3,
		},
	},
	jlsg_fengya: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "damageBegin3" },
		frequent: "check",
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) > 0;
		},
		async content(event, trigger, player) {
			await player.draw();
			if (!trigger.source || !trigger.source.isIn()) {
				return;
			}
			const result = await trigger.source
				.chooseBool(`###${get.prompt(event.name, player)}###是否令其摸一张牌并令此伤害-1？(当前伤害：${trigger.num})`)
				.set("ai", (event, player) => {
					const target = event.player,
						nature = get.event().nature;
					return get.effect(player, { name: "draw" }, target, player) - 0.5 > get.damageEffect(target, player, player, nature);
				})
				.set("nature", trigger.nature)
				.forResult();
			if (result.bool) {
				await trigger.source.draw();
				trigger.num--;
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.attitude(target, player) < 0) {
						return;
					}
					if (get.tag(card, "damage")) {
						return [1, 0.3, 1, 0.9];
					}
				},
			},
		},
	},
	jlsg_yijian: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseUseBefore" },
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget("是否发动【义谏】？", function (card, player, target) {
				return player != target;
			}).ai = function (target) {
				var hasTrick = player.hasCard(function (card) {
					return ["trick"].includes(get.type(card));
				}, "h");
				if (get.attitude(player, target) <= 0) {
					return 0;
				}
				var result = Math.max(1, 5 - target.countCards("h"));
				if (player.isHealthy()) {
					if (!hasTrick) {
						if (player.hp >= player.countCards("h")) {
							return player.hasCard(function (card) {
								return get.tag(card, "damage");
							})
								? 0
								: result;
						} else {
							return player.hasCard(function (card) {
								return get.tag(card, "damage") && card.name != "sha";
							})
								? 0
								: result;
						}
					}
				} else {
					var compare = target.countCards("h") + 1 >= player.countCards("h");
					if (!hasTrick && player.countCards("h") < player.hp) {
						return compare ? 10 : result;
					}
					if (player.hp <= 2 && compare && ((player.countCards("h") >= 2 && player.countCards("h", "sha") <= 1) || player.countCards("h") < 2)) {
						return 10;
					}
					return 0;
				}
			};
			"step 1"
			if (result.bool) {
				event.target = result.targets[0];
				trigger.cancel();
				player.logSkill("jlsg_yijian", result.targets[0]);
				result.targets[0].draw();
			} else {
				event.finish();
			}
			"step 2"
			if (event.target && event.target.num("h") >= player.countCards("h")) {
				player.recover();
			}
		},
	},
	jlsg_feijun: {
		audio: "ext:极略/audio/skill:2",
		popup: false,
		trigger: { player: "phaseUseBegin" },
		forced: true,
		content: function () {
			if (player.countCards("h") >= player.hp) {
				player.logSkill("jlsg_feijun1");
				player.storage.jlsg_feijun = player.hp;
				player.addTempSkill("jlsg_feijun_more");
			} else {
				player.logSkill("jlsg_feijun2");
				player.addTempSkill("jlsg_feijun_less");
			}
		},
		subSkill: {
			more: {
				mod: {
					attackRange: function (player, num) {
						return num + player.storage.jlsg_feijun;
					},
					cardUsable: function (card, player, num) {
						if (card.name == "sha") {
							return num + 1;
						}
					},
				},
			},
			less: {
				mod: {
					cardEnabled: function (card) {
						if (card.name == "sha") {
							return false;
						}
					},
				},
			},
		},
	},
	jlsg_feijun1: {
		inherit: "jlsg_feijun",
		sub: true,
		audio: "ext:极略/audio/skill:true",
	},
	jlsg_feijun2: {
		inherit: "jlsg_feijun",
		sub: true,
		audio: "ext:极略/audio/skill:true",
	},
	jlsg_muniu: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["equipAfter", "addJudgeAfter", "loseAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter: function (event, player) {
			if (_status.currentPhase != player) {
				return false;
			}
			return game.hasPlayer(p => {
				var evt = event.getl(p);
				return evt && evt.es && evt.es.length;
			});
		},
		direct: true,
		content: function () {
			"step 0"
			event.num = game.filterPlayer(p => {
				var evt = trigger.getl(p);
				return evt && evt.es && evt.es.length;
			}).length;
			"step 1"
			if (!event.num) {
				event.finish();
				return;
			}
			--event.num;
			player.chooseTarget(get.prompt2("jlsg_muniu")).ai = function (target) {
				var att = get.attitude(player, target);
				if (target.countCards("h")) {
					att = Math.max(att, -0.8 * get.attitude(player, target));
				}
				return att;
			};
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.target = result.targets[0];
			player.logSkill("jlsg_muniu", event.target);
			if (!event.target.countDiscardableCards(player, "h")) {
				event.target.draw();
				event.finish();
			} else {
				player.discardPlayerCard(event.target, "h").ai = function (button) {
					if (get.attitude(player, event.target) > 0) {
						return false;
					}
					return get.value(button.link);
				};
			}
			"step 3"
			if (!result.bool) {
				event.target.draw();
			}
			event.goto(1);
		},
		group: ["jlsg_muniu2"],
	},
	jlsg_muniu2: {
		trigger: { global: "equipEnd" },
		filter: function (event, player) {
			if (_status.currentPhase != player) {
				return false;
			}
			return true;
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2("jlsg_muniu")).ai = function (target) {
				var att = get.attitude(player, target);
				if (target.countCards("h")) {
					att = Math.max(att, -0.8 * get.attitude(player, target));
				}
				return att;
			};
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.target = result.targets[0];
			player.logSkill("jlsg_muniu", event.target);
			if (!event.target.countDiscardableCards(player, "h")) {
				event.target.draw();
				event.finish();
			} else {
				player.discardPlayerCard(event.target, "h").ai = function (button) {
					if (get.attitude(player, event.target) > 0) {
						return false;
					}
					return get.value(button.link);
				};
			}
			"step 2"
			if (!result.bool) {
				event.target.draw();
			}
		},
	},
	jlsg_liuma: {
		audio: "ext:极略/audio/skill:1",
		usable: 1,
		enable: "phaseUse",
		filterCard: function (card) {
			return get.type(card) == "basic";
		},
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("e");
		},
		selectTarget: [1, 2],
		content: function () {
			"step 0"
			if (targets.length) {
				event.target = targets.shift();
			} else {
				event.finish();
			}
			"step 1"
			event.target.chooseCardTarget({
				prompt: "选择一名角色将你的一张装备牌交给该角色,或令" + get.translation(player) + "获得你一张手牌",
				filterCard: true,
				position: "e",
				filterTarget: function (card, player, target) {
					return player != target;
				},
				ai1: function (card) {
					return 1;
				},
				ai2: function (target) {
					return get.attitude(event.target, target) > 0;
				},
			});
			"step 2"
			if (result.bool) {
				event.target.line(result.targets, "green");
				result.targets[0].gain(result.cards, event.target, "giveAuto");
				event.goto(0);
			} else {
				player.gainPlayerCard("h", event.target);
			}
		},
		ai: {
			order: 6,
			result: {
				player: 1,
				target: -1,
			},
		},
	},
	jlsg_baozheng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		priority: 10,
		filterTarget: function (card, player, target) {
			return target.countCards("he") > 0;
		},
		content: function () {
			"step 0"
			event.targets = game.filterPlayer(p => p != player && p.countCards("he"));
			event.targets.sortBySeat();
			"step 1"
			if (!event.targets.length) {
				event.finish();
				return;
			}
			event.target = event.targets.shift();
			if (event.target.countCards("he") == 1) {
				event.target.give(event.target.getCards("he"), player);
				event.redo();
				return;
			}
			var canDiscard = event.target.countDiscardableCards(event.target, "he") >= 2;
			if (!canDiscard) {
				event.target.chooseCard("he", true, "暴征：将一张牌交给" + get.translation(player));
			} else {
				event.target
					.chooseCard(
						"he",
						[1, 2],
						true,
						`暴征：将一张牌交给${get.translation(player)}<br>或者选择两张弃置，然后对其造成一点伤害`,
						function (card, player) {
							return ui.selected.cards.length ? [card, ...ui.selected.cards].every(c => lib.filter.cardDiscardable(c, player)) : true;
						},
						function (card, cards) {
							var evt = _status.event.getParent();
							if (!ui.selected.cards.length) {
								return -get.value(card);
							}
							if (get.attitude(evt.target, evt.player) < 0) {
								return 7 - get.value(card) + get.value(ui.selected.cards[0]);
							} else {
								return -1;
							}
						}
					)
					.set("complexCard", true);
			}
			"step 2"
			if (result.bool) {
				if (result.cards.length == 1) {
					event.target.give(result.cards, player);
				} else {
					event.target.discard(result.cards);
					if (target.ai.shown < player.ai.shown) {
						target.addExpose(0.1);
					}
					player.damage(event.target);
				}
			}
			event.goto(1);
		},
		contentBackup: function () {
			"step 0"
			var targets = game.players.slice(0);
			targets.remove(player);
			targets.sort(lib.sort.seat);
			event.targets = targets;
			event.num = 0;
			"step 1"
			if (event.num < event.targets.length) {
				event.target = event.targets[event.num];
				if (event.target.countDiscardableCards(event.target, "he") >= 2) {
					event.target.chooseCard("交给" + get.translation(player) + "一张牌，或弃置两张牌对其造成1点伤害", "he").ai = function (card) {
						if (get.attitude(event.target, player) > 0) {
							return 10 - get.value(card);
						}
						return 0;
					};
				} else if (event.target.countCards("h") == 1) {
					event.target.chooseCard("交给" + get.translation(player) + "一张牌", "he", true);
				} else {
					event.num++;
					event.redo();
				}
			} else {
				event.finish();
			}
			"step 2"
			if (result.bool) {
				player.gain(result.cards[0]);
				event.target.$give(1, player);
				event.num++;
				event.goto(1);
			} else if (event.target.countDiscardableCards(event.target, "he") >= 2) {
				event.target.chooseToDiscard("弃置两张牌对" + get.translation(player) + "造成1点伤害", 2, "he", true);
				event.target.line(player, "fire");
				player.damage(event.target);
				event.num++;
				event.goto(1);
			}
		},
	},
	jlsg_lingnu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseEnd" },
		forced: true,
		priority: 9,
		filter: function (event, player) {
			return player.storage.jlsg_lingnu >= 2;
		},
		content: function () {
			"step 0"
			player.loseMaxHp();
			var targets = game.players.slice(0);
			targets.remove(player);
			targets.sort(lib.sort.seat);
			event.targets = targets;
			event.num = 0;
			"step 1"
			if (num < event.targets.length) {
				if (event.targets[num].num("hej")) {
					player.gainPlayerCard(event.targets[num], "hej", true);
				}
				event.num++;
				event.redo();
			}
		},
		group: ["jlsg_lingnu_getStat", "jlsg_lingnu_init"],
		subSkill: {
			getStat: {
				trigger: { player: "damageEnd" },
				forced: true,
				popup: false,
				silent: true,
				content: function () {
					player.storage.jlsg_lingnu += trigger.num;
				},
			},
			init: {
				trigger: { player: "phaseBegin" },
				forced: true,
				popup: false,
				silent: true,
				content: function () {
					player.storage.jlsg_lingnu = 0;
				},
			},
		},
	},
	jlsg_zhongyong: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		check: function (event, player) {
			return (
				(!player.hasJudge("lebu") || !player.hasJudge("bingliang")) &&
				(player.hp >= 2 || player.hasCard("tao", "h")) &&
				game.hasPlayer(function (cur) {
					return get.attitude(player, cur) != 0;
				})
			);
		},
		content: function () {
			player.loseHp();
			player.addTempSkill("jlsg_zhongyong_phaseDrawBegin", "phaseAfter");
			player.addTempSkill("jlsg_zhongyong_distance", "phaseAfter");
			player.addTempSkill("jlsg_zhongyong_giveCard", "phaseAfter");
		},
		init: function (player) {
			player.storage.jlsg_zhongyong_discard = [];
		},
		subSkill: {
			phaseDrawBegin: {
				trigger: { player: "phaseDrawBegin2" },
				forced: true,
				popup: false,
				filter: function (event, player) {
					return !event.numFixed;
				},
				content: function () {
					trigger.num += player.getDamagedHp();
				},
			},
			distance: {
				mod: {
					globalFrom: function (from, to, distance) {
						return -Infinity;
					},
				},
			},
			giveCard: {
				trigger: { player: "phaseDiscardAfter" },
				filter: function (event, player) {
					return (
						player.getHistory("lose", function (evt) {
							return evt.type == "discard" && evt.getParent("phaseDiscard") == event && evt.cards.filterInD("d").length > 0;
						}).length != 0
					);
				},
				direct: true,
				content: function () {
					"step 0"
					event.cards = [];
					event.events = player.getHistory("lose", function (evt) {
						return evt.type == "discard" && evt.getParent("phaseDiscard") == trigger && evt.cards.filterInD("d").length > 0;
					});
					event.events.forEach(evt => event.cards.addArray(evt.cards.filterInD("d")));
					player.chooseTarget("是否发动【忠勇】让一名角色获得你本阶段内的弃牌？", function (card, player, target) {
						return player != target;
					}).ai = function (target) {
						return get.attitude(player, target) > 0;
					};
					"step 1"
					if (result.bool) {
						player.logSkill("jlsg_zhongyong", result.targets[0]);
						result.targets[0].gain(event.cards, "gain2");
					}
				},
			},
		},
	},
	jlsg_bozhan: {
		audio: "ext:极略/audio/skill:true",
		trigger: { player: "shaMiss", target: "shaMiss" },
		direct: true,
		content: function () {
			trigger.target.chooseToUse("是否对" + get.translation(trigger.player) + "使用一张【杀】？", { name: "sha" }, -1, trigger.player);
		},
	},
	jlsg_qingxi: {
		shaRelated: true,
		audio: "ext:极略/audio/skill:true",
		trigger: { player: "shaBegin" },
		forced: true,
		filter: function (event, player) {
			return player.countCards("e") < event.target.countCards("e");
		},
		content: function () {
			trigger.directHit = true;
		},
	},
	jlsg_danshou: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			target: "useCardToTargeted",
		},
		filter: function (event, player) {
			return event.card.name == "sha" && player.canCompare(event.player);
		},
		forced: true,
		content: function () {
			"step 0"
			player.chooseToCompare(trigger.player);
			"step 1"
			if (result.bool) {
				player.draw(2);
				player.discardPlayerCard(trigger.player, true);
			} else {
				// trigger.directHit = true;
				trigger.getParent().directHit.add(player);
				// player.draw();
			}
		},
	},
	jlsg_yonglie: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "damageEnd" },
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && event.notLink() && event.player.inRangeOf(player) && event.source && event.source.isAlive();
		},
		check: function (event, player) {
			if (player.hp > 2) {
				return get.attitude(player, event.source) < 0;
			}
			return 0;
		},
		prompt: function (event, player) {
			var str = "";
			str += "是否对" + get.translation(event.source) + "发动【勇烈】";
			return str;
		},
		content: function () {
			player.loseHp();
			player.line(trigger.source);
			trigger.source.damage();
		},
	},
	jlsg_hengshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseDiscardBegin" },
		frequent: true,
		filter(event, player) {
			return player.countCards("h");
		},
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) > 0;
		},
		async content(event, trigger, player) {
			await player.draw(player.countCards("h"));
		},
		ai: {
			effect: {
				player(card, player, target) {
					let hs = player.countCards("h");
					if (player.hasSkill("jlsg_zhijiao")) {
						if (
							game.hasPlayer(function (cur) {
								return get.attitude(player, cur) > 3 && !cur.hasJudge("lebu") && cur != player;
							})
						) {
							if (hs >= 5 && !["wuzhong", "shunshou", "wugu"].includes(card.name)) {
								return "zeroplayertarget";
							}
						}
					}
				},
			},
		},
	},
	jlsg_zhijiao: {
		limited: true,
		mark: true,
		intro: {
			content: "limited",
		},
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return game
				.getGlobalHistory("cardMove", function (evt) {
					if (evt.name != "lose" || evt.type != "discard" || evt.player != player) {
						return false;
					}
					return evt.cards2.someInD("d");
				})
				.flatMap(evt => evt.cards2.filterInD("d"))
				.unique().length;
		},
		async cost(event, trigger, player) {
			const cards = game
				.getGlobalHistory("cardMove", function (evt) {
					if (evt.name != "lose" || evt.type != "discard" || evt.player != player) {
						return false;
					}
					return evt.cards2.someInD("d");
				})
				.flatMap(evt => evt.cards2.filterInD("d"))
				.unique();

			event.result = await player
				.chooseTarget(get.prompt2(event.skill), function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					const { player, cards } = get.event();
					let cardnum = cards.length,
						att = get.attitude(player, target);
					if (att <= 0) {
						return 0;
					}
					var result = Math.max(9 - target.countCards("he"), 1);
					if (target.hasJudge("lebu")) {
						result -= 2;
					}
					result = Math.max(1, result);
					result += att;
					if (cardnum >= 5) {
						return result;
					}
					if (player.hp == 2 && cardnum >= 4) {
						return result;
					}
					if (player.hp == 1) {
						return result;
					}
					return 0;
				})
				.set("cards", cards)
				.forResult();
			if (event.result?.bool) {
				event.result.cards = cards;
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards,
			} = event;
			player.awakenSkill("jlsg_zhijiao");
			await target.gain(cards, "gain2");
		},
		ai: {
			threaten: 0.8,
			order(skill, player) {
				if (!player.hasSkill("jlsg_zhijiao")) {
					return;
				}
				if (player.hp < player.maxHp && player.countCards("h") > 1) {
					return 10;
				}
				return 4;
			},
			result: {
				target(player, target) {
					if (!player.hasSkill("jlsg_zhijiao")) {
						return;
					}
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
			effect: {
				target(card, player, target) {
					if (!player.hasSkill("jlsg_zhijiao")) {
						return;
					}
					if (player == target && get.type(card) == "equip") {
						if (target.countCards("e", { subtype: get.subtype(card) }) > 0) {
							if (
								game.hasPlayer(function (current) {
									return current != target && get.attitude(target, current) > 3;
								})
							) {
								return 0;
							}
						}
					}
				},
			},
		},
	},
	jlsg_jiwux: {
		audio: "ext:极略/audio/skill:3",
		trigger: { player: "phaseUseBegin" },
		shaRelated: true,
		filter: function (event, player) {
			return player.countCards("h", "sha") > 0;
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseCard(get.prompt("jlsg_jiwux"), function (card, player, target) {
				return card.name == "sha" && !(card.isJiwu && card.isJiwu[1] && card.isJiwu[2] && card.isJiwu[3]);
			}).ai = function (card) {
				var value = 0;
				if (card.nature) {
					if (card.nature == "fire") {
						value += 0.004;
					}
					if (card.nature == "thunder") {
						value += 0.003;
					}
				}
				switch (get.suit(card)) {
					case "heart":
						value += 0.004;
						break;
					case "diamond":
						value += 0.003;
						break;
					case "spade":
						value += 0.002;
						break;
					case "club":
						value += 0.001;
						break;
					default:
						break;
				}
				value = value + card.number / 1000;
				return value;
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_jiwux");
				event.card = result.cards[0];
				player.showCards(event.card);
				let paint = function (card, paintType, toggle = true) {
					if (!document.body.contains(card.parentElement)) {
						return;
					}
					var target = card.querySelector(`#Jiwu${paintType}`);
					if (target) {
						if (!toggle) {
							card.removeChild(target);
						}
						return;
					}
					let div = document.createElement("div");
					card.appendChild(div);
					div.style.minWidth = "33%";
					div.style.top = "4px";
					div.style.height = "4px";
					// div.style.opacity = "0.5";
					switch (paintType) {
						case 1:
							div.setAttribute("id", "Jiwu1");
							div.style.left = "0%";
							div.style.backgroundColor = "rgba(255,0,0,0.6)";
							break;
						case 2:
							div.setAttribute("id", "Jiwu2");
							div.style.left = "33%";
							div.style.backgroundColor = "rgba(0,255,0,0.6)";
							break;
						case 3:
							div.setAttribute("id", "Jiwu3");
							div.style.left = "67%";
							div.style.backgroundColor = "rgba(0,0,255,0.6)";
							break;
						default:
							break;
					}
				};
				if (!event.card.isJiwu) {
					event.card.isJiwu = {
						// _paint(paintType, toggle) {
						//   paint(event.card, paintType, toggle);
						// },
						_card: event.card,
						get 1() {
							return this._1;
						},
						get 2() {
							return this._2;
						},
						get 3() {
							return this._3;
						},
						set 1(value) {
							if (value == this._1) {
								return;
							}
							this._1 = !!value;
							game.broadcastAll(paint, this._card, 1, !!value);
						},
						set 2(value) {
							if (value == this._2) {
								return;
							}
							this._2 = !!value;
							game.broadcastAll(paint, this._card, 2, !!value);
						},
						set 3(value) {
							if (value == this._3) {
								return;
							}
							this._3 = !!value;
							game.broadcastAll(paint, this._card, 3, !!value);
						},
						_1: false,
						_2: false,
						_3: false,
					};
				}
				event._options = ["此【杀】不计入次数限制", "此【杀】无距离限制,且可以额外指定1个目标", "此【杀】的伤害值+1"];
				const options = [1, 2, 3].filter(key => !event.card.isJiwu[key]).map(key => event._options[key - 1]);
				player.chooseControl(options, "dialogcontrol", function () {
					return Math.floor(Math.random() * options.length);
				}); //.set('prompt', prompt);
			} else {
				event.finish();
			}
			"step 2"

			if (result.control == event._options[0]) {
				event.card.isJiwu[1] = true;
				game.log(player, "所展示的", event.card, "不计入次数限制");
				// game.broadcastAll(paint, event.card, 0, true);
			} else if (result.control == event._options[1]) {
				event.card.isJiwu[2] = true;
				game.log(player, "所展示的", event.card, "无距离限制，且可以额外指定1个目标");
				// game.broadcastAll(paint, event.card, 1, true);
			} else if (result.control == event._options[2]) {
				event.card.isJiwu[3] = true;
				game.log(player, "所展示的", event.card, "伤害值+1");
				// game.broadcastAll(paint, event.card, 2, true);
			}
		},
		group: ["jlsg_jiwux_one", "jlsg_jiwux_two", "jlsg_jiwux_three", "jlsg_jiwux_clear"],
		subSkill: {
			one: {
				mod: {
					cardUsable: function (card, player) {
						var criterion = card.name == "sha" && ((card.isJiwu && card.isJiwu[1]) || (card.cards && card.cards.length == 2 && card.cards[0].isJiwu && card.cards[0].isJiwu[1]));
						if (criterion) {
							return Infinity;
						}
					},
				},
				trigger: { player: "useCard" },
				filter: function (event, player) {
					// return event.card && event.card.isJiwu && event.card.isJiwu[1];
					if (!event.card) {
						return false;
					}
					return event.card.name == "sha" && ((event.card.isJiwu && event.card.isJiwu[1]) || (event.card.cards && event.card.cards.length == 1 && event.card.cards[0].isJiwu && event.card.cards[0].isJiwu[1]));
				},
				forced: true,
				content: function () {
					if (player.stat[player.stat.length - 1].card.sha > 0) {
						player.stat[player.stat.length - 1].card.sha--;
					}
				},
			},
			two: {
				mod: {
					targetInRange: function (card, player) {
						var criterion = card.name == "sha" && ((card.isJiwu && card.isJiwu[2]) || (card.cards && card.cards.length == 1 && card.cards[0].isJiwu && card.cards[0].isJiwu[2]));
						if (criterion) {
							return true;
						}
					},
					selectTarget: function (card, player, range) {
						var criterion = card.name == "sha" && ((card.isJiwu && card.isJiwu[2]) || (card.cards && card.cards.length == 1 && card.cards[0].isJiwu && card.cards[0].isJiwu[2]));
						if (criterion && range[1] != -1) {
							range[1]++;
						}
					},
				},
			},
			three: {
				trigger: { source: "damageBegin" },
				forced: true,
				filter: function (event, player) {
					if (!event.card) {
						return false;
					}
					var criterion = event.card.name == "sha" && ((event.card.isJiwu && event.card.isJiwu[3]) || (event.card.cards && event.card.cards.length == 1 && event.card.cards[0].isJiwu && event.card.cards[0].isJiwu[3]));
					return criterion && event.notLink();
				},
				content: function () {
					trigger.num++;
				},
			},
			clear: {
				// FIXME: missing clear logic
				trigger: { player: ["useCardAfter", "discardAfter"] },
				silent: true,
				filter: function (event, player) {
					var cards = event.cards;
					if (!cards) {
						cards = event.card && event.card.cards;
					}
					return cards; // && cards.length == 1 && cards[0].isJiwu;
				},
				forced: true,
				popup: false,
				content: function () {
					if (trigger.card) {
						if (trigger.card.isJiwu) {
							trigger.card.isJiwu._card = trigger.card;
							trigger.card.isJiwu[1] = false;
							trigger.card.isJiwu[2] = false;
							trigger.card.isJiwu[3] = false;
							delete trigger.card.isJiwu;
						}
						if (trigger.card.cards) {
							for (var card of trigger.card.cards) {
								if (card.isJiwu) {
									card.isJiwu._card = card;
									card.isJiwu[1] = false;
									card.isJiwu[2] = false;
									card.isJiwu[3] = false;
									delete card.isJiwu;
								}
							}
						}
					} else if (trigger.cards) {
						for (var card of trigger.cards) {
							if (card.isJiwu) {
								card.isJiwu._card = card;
								card.isJiwu[1] = false;
								card.isJiwu[2] = false;
								card.isJiwu[3] = false;
								delete card.isJiwu;
							}
						}
					}
				},
			},
		},
		// ai:{
		// effect:{
		// player:function(card,player,target){

		// }
		// }
		// }
	},
	jlsg_daoshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			return event.player.countCards("e") > 0 && (player == event.player || player.hasSkill("jlsg_daoshi"));
		},
		direct: true,
		content: function () {
			"step 0"
			var prompt = trigger.player == player ? "是否发动【刀侍】摸一张牌?" : `###是否对${get.translation(event.target)}发动【刀侍】？###摸一张牌并将装备区的一张牌交给${get.translation(player)}`;
			trigger.player.chooseBool(prompt).ai = function () {
				if (trigger.player == player) {
					return true;
				}
				if (get.attitude(trigger.player, player) > 0 && player.countCards("e") < 2) {
					return 1;
				}
				return 0;
			};
			"step 1"
			if (result.bool) {
				trigger.player.logSkill("jlsg_daoshi", player);
				trigger.player.draw();
				if (trigger.player != player) {
					trigger.player.chooseCardButton("选择一张牌交给" + get.translation(player), trigger.player.get("e"), true);
				} else {
					event.finish();
				}
			} else {
				event.finish();
			}
			"step 2"
			if (result.bool) {
				player.gain(result.links[0], trigger.player, "giveAuto");
			}
		},
	},
	jlsg_lirang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseZhunbeiEnd" },
		filter: function (event, player) {
			if (event.player != player && !player.hasSkill("jlsg_lirang")) {
				return false;
			}
			if (game.online) {
				return player.getExpansions("jlsg_lirang").length < 4 && event.player.countCards("h");
			}
			var liSuits = player.getExpansions("jlsg_lirang").map(c => get.suit(c));
			return event.player.countCards("h", c => !liSuits.includes(get.suit(c)));
		},
		direct: true,
		content: function () {
			"step 0"
			var liSuits = player.getExpansions("jlsg_lirang").map(c => get.suit(c));
			var next = trigger.player.chooseCard(get.prompt("jlsg_lirang", player, trigger.player));
			next.filterCard = function (card) {
				return !liSuits.includes(get.suit(card));
			};
			next.ai = function (card) {
				if (get.attitude(trigger.player, player) > 0) {
					if (jlsg.needKongcheng(trigger.player)) {
						return 20 - get.value(card);
					}
					return 7 - get.value(card);
				}
				if (get.attitude(trigger.player, player) <= 0) {
					return card.name == "du";
				}
				return false;
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_lirang", trigger.player);
				player.addToExpansion(result.cards, trigger.player, "give").gaintag.add(event.name);
				trigger.player.draw();
			}
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		group: ["jlsg_lirang2"],
		ai: {
			threaten: 3,
		},
	},
	jlsg_lirang2: {
		enable: "chooseToUse",
		filter: function (event, player) {
			return player.getExpansions("jlsg_lirang").length >= 2 && event.filterCard({ name: "tao" }, player, event);
		},
		chooseButton: {
			dialog: function (event, player) {
				return ui.create.dialog("礼让", player.getExpansions("jlsg_lirang"), "hidden");
			},
			select: 2,
			backup: function (links, player) {
				return {
					audio: "jlsg_lirang",
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					viewAs: { name: "tao", cards: links },
					cards: links,
					onuse: function (result, player) {
						result.cards = lib.skill[result.skill].cards;
						// player.getExpansions('jlsg_lirang').remove(result.cards);
						// player.syncStorage('jlsg_lirang');
						// player.markAuto('jlsg_lirang2')
						// player.logSkill('jlsg_lirang2',result.targets);
					},
				};
			},
		},
		ai: {
			// order:10,
			order: function () {
				var od = get.order({ name: "tao" }) + 0.2;
				// if (event.filterCard({name:'jiu'},_status.event.player,_status.event)) {
				//   od =Math.max(od, get.order({name:'jiu'})+0.2);
				// }
				return od;
			},
			save: true,
			result: {
				player: function (player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 0;
				},
			},
		},
	},
	jlsg_xianshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageBegin3" },
		filter: function (event, player) {
			return event.source != undefined;
		},
		frequent: true,
		content: function () {
			"step 0"
			trigger.source.chooseToDiscard("弃置一张牌并展示所有手牌，或令此伤害-1").ai = function (card) {
				if (get.attitude(trigger.source, player) < 0) {
					if (trigger.source.needsToDiscard()) {
						return 7 - get.value(card);
					}
					return 6 - get.value(card);
				}
				return false;
			};
			"step 1"
			if (result.bool) {
				trigger.source.showHandcards();
			} else {
				trigger.num--;
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "damage")) {
						var bs = player.get("h");
						if (bs.length == 0) {
							return 0;
						}
						if ((player.hasSkill("jiu") || player.hasSkill("tianxianjiu")) && card.name == "sha") {
							return;
						}
						if (player.countCards("h") <= 1) {
							return 0;
						}
						var n = 0.5;
						if (
							player.getCards("h", function (cardx) {
								var value = 0;
								var aii = get.info(cardx).ai;
								if (aii && aii.value) {
									value = aii.value;
								} else if (aii && aii.basic) {
									value = aii.basic.value;
								}
								return value < 6;
							}) ||
							player.needsToDiscard()
						) {
							n = 0;
						}
						return [1, n];
					}
				},
			},
		},
	},
	jlsg_chengxiang: {
		audio: "ext:极略/audio/skill:2",
		inherit: "chengxiang",
		content: function () {
			"step 0"
			event.cards = get.cards(4);
			game.cardsGotoOrdering(event.cards);
			event.videoId = lib.status.videoId++;
			game.broadcastAll(
				function (player, id, cards, num) {
					var str;
					if (player == game.me && !_status.auto) {
						str = "称象：选择任意张点数不大于13的牌";
					} else {
						str = "称象";
					}
					var dialog = ui.create.dialog(str, cards);
					dialog.videoId = id;
				},
				player,
				event.videoId,
				event.cards,
				13
			);
			event.time = get.utc();
			game.addVideo("showCards", player, ["称象", get.cardsInfo(event.cards)]);
			game.addVideo("delay", null, 2);
			"step 1"
			var next = player.chooseButton([0, 4]);
			next.set("dialog", event.videoId);
			next.set("filterButton", function (button) {
				var num = 0;
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					num += get.number(ui.selected.buttons[i].link);
				}
				return num + get.number(button.link) <= _status.event.maxNum;
			});
			next.set("maxNum", 13);
			next.set("ai", function (button) {
				return get.value(button.link, _status.event.player);
			});
			"step 2"
			if (result.bool && result.links) {
				//player.logSkill('chengxiang');
				var cards2 = [];
				for (var i = 0; i < result.links.length; i++) {
					cards2.push(result.links[i]);
					cards.remove(result.links[i]);
				}
				event.cards2 = cards2;
			} else {
				event.finish();
			}
			var time = 1000 - (get.utc() - event.time);
			if (time > 0) {
				game.delay(0, time);
			}
			"step 3"
			game.broadcastAll("closeDialog", event.videoId);
			var cards2 = event.cards2;
			player.gain(cards2, "log", "gain2");
		},
	},
	jlsg_renxin: {
		audio: "ext:极略/audio/skill:2",
		inherit: "oldrenxin",
		// ai: {
		//   expose: 0.5
		// }
	},
	jlsg_midao: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return target.countCards("h") > player.countCards("h") && player != target;
		},
		filter: function (event, player) {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].num("h") > player.countCards("h")) {
					return true;
				}
			}
			return false;
		},
		selectTarget: -1,
		multitarget: true,
		multiline: true,
		content: function () {
			"step 0"
			if (targets.length) {
				event.target = targets.shift();
			} else {
				var maxh = true;
				for (var i = 0; i < game.players.length; i++) {
					if (game.players[i].num("h") > player.countCards("h")) {
						maxh = false;
					}
				}
				if (maxh) {
					player.loseHp();
				}
				event.finish();
			}
			"step 1"
			if (event.target.countCards("h")) {
				event.target.chooseCard("选择一张手牌交给" + get.translation(player), true).ai = function (card) {
					return -get.value(card);
				};
			} else {
				event.goto(0);
			}
			"step 2"
			if (result.bool) {
				player.gain(result.cards[0]);
				target.$give(1, player);
			}
			event.goto(0);
		},
		ai: {
			order: 2,
			result: {
				player: function (player) {
					var cangain = 0;
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].num("h") > player.countCards("h")) {
							cangain++;
						}
					}
					var maxh = true;
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].num("h") - 1 > player.countCards("h") + cangain) {
							maxh = false;
						}
					}
					if (maxh && cangain > 1 && player.hp > 2) {
						return 1;
					}
					if (maxh && player.hp == 2) {
						return -2;
					}
					if (maxh && player.hp == 1 && !player.countCards("h", "tao")) {
						return -10;
					}
					if (maxh && cangain <= 1) {
						return -1;
					}
					if (!maxh) {
						return cangain;
					}
					return 0;
				},
				target: -1,
			},
		},
	},
	jlsg_yishe: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			return target.countCards("h") <= player.countCards("h") && player != target;
		},
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		content: function () {
			player.swapHandcards(target);
		},
		ai: {
			order: 1,
			result: {
				player: function (player, target) {
					return target.countCards("h") - player.countCards("h");
				},
				target: function (player, target) {
					return player.countCards("h") - target.countCards("h");
				},
			},
		},
	},
	jlsg_pudu: {
		audio: "ext:极略/audio/skill:1",
		unique: true,
		limited: true,
		enable: "phaseUse",
		skillAnimation: true,
		animationStr: "普渡",
		animationColor: "water",
		filterTarget: function (card, player, target) {
			return player != target;
		},
		multitarget: true,
		multiline: true,
		selectTarget: -1,
		content: function () {
			"step 0"
			player.awakenSkill(event.name);
			event.current = player.next;
			event.targets = targets.slice();
			"step 1"
			var target = event.targets.shift();
			if (!target.countCards("h")) {
				event.redo();
				return;
			}
			player.gain(target, target.getCards("h"), "bySelf");
			target.$give(target.num("h"), player);
			game.delayx(0.3);
			if (event.targets.length) {
				event.redo();
			}
			"step 2"
			var maxh = true;
			if (!player.countCards("h") || !player.isMaxHandcard()) {
				event.finish();
				return;
			}
			player.chooseCard("选择一张手牌交给" + get.translation(event.current), true).ai = function (card) {
				if (get.attitude(player, event.current) > 0) {
					return get.value(card);
				}
				return -get.value(card);
			};
			"step 3"
			if (result.bool) {
				// event.current.gain(result.cards[0]);
				player.$give(1, event.current);
				event.current.gain(player, result.cards[0], "bySelf", false);
				game.delayx(0.3);
				for (var next = event.current.next; next != event.current; next = next.next) {
					if (next == player || next.isOut()) {
						continue;
					}
					event.current = next;
					break;
				}
				event.goto(2);
			}
		},
		ai: {
			order: 4.5,
			result: {
				player: function (player, target) {
					var num = 0;
					var list = [];
					var listnum = 0;
					for (var i = 0; i < game.players.length - 1; i++) {
						list.push("0");
					}
					for (var i = 0; i < game.players.length; i++) {
						num += game.players[i].num("h");
					}
					var max = function () {
						for (var i = 0; i < list.length; i++) {
							if (list[i] > num) {
								return true;
							}
						}
						return false;
					};
					while (!max()) {
						num--;
						list[listnum % (game.players.length - 1)]++;
						listnum++;
					}
					return num - player.countCards("h");
				},
				target: function (player, target) {
					var num = 0;
					var list = [];
					var listnum = 0;
					for (var i = 0; i < game.players.length - 1; i++) {
						list.push("0");
					}
					for (var i = 0; i < game.players.length; i++) {
						num += game.players[i].num("h");
					}
					var max = function () {
						for (var i = 0; i < list.length; i++) {
							if (list[i] > num) {
								return true;
							}
						}
						return false;
					};
					while (!max()) {
						num--;
						list[listnum % (game.players.length - 1)]++;
						listnum++;
					}
					for (var i = 0; i < game.players.length; i++) {
						if (target == game.players[i]) {
							var nu = i;
						}
					}
					return list[nu - 1] - target.countCards("h");
				},
			},
		},
	},
	jlsg_zongqing: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseDrawBegin" },
		check: function (event, player) {
			if (player.isDamaged() && player.countCards("h", { color: "red" })) {
				return 2;
			}
			if (player.countCards("h", "sha") && !player.countCards("h", "jiu")) {
				return 1;
			}
			return 0;
		},
		content: function () {
			"step 0"
			player.judge(function (card) {
				if (get.color(card) == "red" && player.isDamaged()) {
					return 2;
				}
				if (get.color(card) == "red") {
					return 1;
				}
				if (get.color(card) == "black" && player.countCards("h", "sha")) {
					return 1;
				}
				return 0;
			});
			"step 1"
			player.storage.jlsg_zongqing = result.card;
			player.addSkill("jlsg_zongqing_show");
		},
		subSkill: {
			show: {
				audio: false,
				trigger: { player: "phaseDrawEnd" },
				forced: true,
				popup: false,
				filter: function (event) {
					// return event.parent.parent.name == 'phaseDraw';
					return event.cards && event.cards.length;
				},
				content: function () {
					"step 0"
					event.card = player.storage.jlsg_zongqing;
					// player.showCards(event.card);
					player.showCards(trigger.cards);
					"step 1"
					var cards = [];
					if (get.color(event.card) == "red") {
						for (var i = 0; i < trigger.cards.length; i++) {
							if (get.color(trigger.cards[i]) == "black") {
								cards.push(trigger.cards[i]);
							}
						}
						if (cards.length) {
							if (cards.length == 2) {
								event.cards = cards;
								player.chooseToDiscard(
									"纵情:选择一张牌弃置",
									function (card) {
										return _status.event.getParent().cards.includes(card);
									},
									true
								).ai = get.disvalue;
							} else {
								player.discard(cards);
							}
							player.useCard({ name: "jiu" }, player);
						}
					} else {
						// card color == black
						for (var i = 0; i < trigger.cards.length; i++) {
							if (get.color(trigger.cards[i]) == "red") {
								cards.push(trigger.cards[i]);
							}
						}
						if (cards.length) {
							if (cards.length == 2) {
								event.cards = cards;
								player.chooseToDiscard(
									"纵情:选择一张牌弃置",
									function (card) {
										return _status.event.getParent().cards.includes(card);
									},
									true
								).ai = get.disvalue;
							} else {
								player.discard(cards);
							}
							if (player.isDamaged()) {
								player.useCard({ name: "tao" }, player);
							}
						}
					}
					"step 2"
					player.removeSkill("jlsg_zongqing_show");
				},
			},
		},
	},
	jlsg_bugua: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "judgeBefore" },
		content: function () {
			"step 0"
			player.showCards(ui.cardPile.firstChild, "牌堆顶的牌");
			event.chosed = false;
			"step 1"
			player.chooseCard("是否将一张手牌置于牌堆顶？").set("ai", function (card) {
				var trigger = _status.event.getTrigger();
				var player = _status.event.player;
				var judging = ui.cardPile.firstChild;
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
			});
			event.current = player;
			"step 2"
			if (result && result.cards) {
				event.card = result.cards[0];
				event.card = result.cards[0];
				event.current.showCards(event.card, "置于牌堆顶");
				event.current.lose(event.card, ui.cardPile, "insert", "visible");
				event.current.$throw(1, 1000);
				game.log(event.current, "将", event.card, "置于牌堆顶");
			} else {
				if (trigger.player == player) {
					event.finish();
				} else if (event.chosed) {
					event.finish();
				} else {
					trigger.player.chooseCard("将一张手牌置于牌堆顶？").set("ai", function (card) {
						var trigger = _status.event.getTrigger();
						var player = trigger.player;
						var judging = ui.cardPile.firstChild;
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
					});
					event.chosed = true;
					event.current = trigger.player;
					event.goto(2);
				}
			}
		},
		ai: {
			tag: {
				rejudge: 1,
			},
		},
		group: ["jlsg_bugua2", "jlsg_bugua3"],
	},
	jlsg_bugua2: {
		audio: "ext:极略/audio/skill:true",
		trigger: { global: "judgeAfter" },
		filter: function (event, player) {
			return get.color(event.result.card) == "red";
		},
		check: function (event, player) {
			return get.attitude(player, event.player) > 0;
		},
		prompt: function (event, player) {
			var str = "";
			str += "是否对" + get.translation(event.player) + "发动【卜卦】令其摸一张牌";
			return str;
		},
		content: function () {
			trigger.player.draw(true);
		},
	},
	jlsg_bugua3: {
		audio: "ext:极略/audio/skill:true",
		trigger: { global: "judgeAfter" },
		filter: function (event, player) {
			return get.color(event.result.card) == "black" && event.player.countCards("he");
		},
		check: function (event, player) {
			return get.attitude(player, event.player) < 0;
		},
		prompt: function (event, player) {
			var str = "";
			str += "是否对" + get.translation(event.player) + "发动【卜卦】令其弃一张牌";
			return str;
		},
		content: function () {
			trigger.player.chooseToDiscard("he", 1, true);
		},
	},
	jlsg_zhaoxin: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			if (game.online) {
				return true;
			}
			var suits = ["heart", "club", "spade", "diamond"];
			var cards = player.get("h");
			for (var i = 0; i < cards.length; i++) {
				if (suits.includes(get.suit(cards[i]))) {
					suits.remove(get.suit(cards[i]));
				}
			}
			return suits.length > 0;
		},
		check: function (event, player) {
			return true;
		},
		// frequent: true,
		content: function () {
			player.showHandcards();
			var suits = ["heart", "club", "spade", "diamond"];
			event.cards = player.get("h");
			for (var i = 0; i < event.cards.length; i++) {
				if (suits.includes(get.suit(event.cards[i]))) {
					suits.remove(get.suit(event.cards[i]));
				}
			}
			if (suits.length) {
				player.draw(suits.length);
			}
		},
	},
	jlsg_zhihe: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("h") > 0;
		},
		filterCard: function (card, target, player) {
			for (var i = 0; i < ui.selected.cards.length; i++) {
				if (get.suit(card) == get.suit(ui.selected.cards[i])) {
					return false;
				}
			}
			return true;
		},
		check: function (card) {
			return 10 - get.value(card);
		},
		discard: false,
		lose: false,
		prompt: "请选择你想要保留的卡牌",
		selectCard: function () {
			var cards = _status.event.player.get("h");
			var suits = [];
			for (var i = 0; i < cards.length; i++) {
				if (!suits.includes(get.suit(cards[i]))) {
					suits.push(get.suit(cards[i]));
				}
			}
			return suits.length;
		},
		content: function () {
			"step 0"
			player.showHandcards();
			var he = [];
			var hs = player.get("h");
			he = he.concat(hs);
			for (var i = 0; i < cards.length; i++) {
				he.remove(cards[i]);
			}
			player.discard(he);
			"step 1"
			player.draw(player.countCards("h"));
		},
		ai: {
			order: 2,
			result: {
				player: function (player) {
					var cards = player.get("h");
					var suits = [];
					for (var i = 0; i < cards.length; i++) {
						if (!suits.includes(get.suit(cards[i]))) {
							suits.push(get.suit(cards[i]));
						}
					}
					var canget = suits.length * 2 - player.countCards("h");
					return canget + 0.1;
				},
			},
		},
	},
	jlsg_caijie: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "phaseZhunbeiBegin" },
		check: function (event, player) {
			var cards = player.get("h");
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].number > 11 && get.value(cards[i]) < 7) {
					return get.attitude(player, event.player) < 0;
				}
			}
			if (player.countCards("h", "shan") && get.attitude(player, event.player) < 0 && player.countCards("h") > 2) {
				return 1;
			}
			return 0;
		},
		filter: function (event, player) {
			return event.player != player && event.player.countCards("h") >= player.countCards("h") && player.countCards("h") > 0;
		},
		prompt: function (event, player) {
			var str = "";
			str += "是否对" + get.translation(event.player) + "发动【才捷】？";
			return str;
		},
		content: function () {
			"step 0"
			player.chooseToCompare(trigger.player);
			"step 1"
			if (result.bool) {
				player.draw(2);
			} else {
				trigger.player.useCard({ name: "sha" }, player, false);
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_jilei: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "damageEnd" },
		check: function (event, player) {
			return get.attitude(player, event.source) < 0;
		},
		filter: function (event, player) {
			return event.source && event.source.countCards("h") > 0;
		},
		content: function () {
			"step 0"
			trigger.source.showHandcards();
			var cards = [trigger.source.getCards("h", { type: "basic" }), trigger.source.getCards("h", { type: ["trick", "delay"] }), trigger.source.getCards("h", { type: "equip" })];
			var maxNum = cards.reduce((a, b) => (a.length > b.length ? a : b)).length;
			if (cards.filter(cs => cs.length == maxNum).length == 1) {
				trigger.source.discard(cards.filter(cs => cs.length == maxNum)[0]);
				event.finish();
				return;
			}
			var choices = [],
				choice,
				v = Infinity,
				tempv;
			if (cards[0].length == maxNum) {
				choices.push("基本牌");
				choice = "基本牌";
				v = cards[0].reduce((a, b) => a + get.value(b, trigger.source), 0);
			}
			if (cards[1].length == maxNum) {
				choices.push("锦囊牌");
				tempv = cards[1].reduce((a, b) => a + get.value(b, trigger.source), 0);
				if (tempv < v) {
					choice = "锦囊牌";
					v = tempv;
				}
			}
			if (cards[2].length == maxNum) {
				choices.push("装备牌");
				tempv = cards[2].reduce((a, b) => a + get.value(b, trigger.source), 0);
				if (tempv < v) {
					choice = "装备牌";
					v = tempv;
				}
			}
			player
				.chooseControl(choices)
				.set("prompt", "弃置一种类型的手牌")
				.set("choice", choice)
				.set("ai", function () {
					return _status.event.choice;
				});
			"step 1"
			switch (result.control) {
				case "基本牌":
					trigger.source.discard(trigger.source.getCards("h", { type: "basic" }));
					break;
				case "锦囊牌":
					trigger.source.discard(trigger.source.getCards("h", { type: ["trick", "delay"] }));

					break;
				case "装备牌":
					trigger.source.discard(trigger.source.getCards("h", { type: "equip" }));
					break;
			}
		},
	},
	jlsg_yanliang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.countDiscardableCards(player, "he");
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseToDiscard("是否对" + get.translation(trigger.player) + "发动【延粮】?", "he").ai = function (card) {
				if (get.attitude(player, trigger.player) > 0 && trigger.player.countCards("j", "lebu")) {
					return 8 - get.value(card) && get.color(card) == "black";
				}
				if (get.attitude(player, trigger.player) < 0) {
					return 4 - get.value(card);
				}
				return 0;
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_yanliang", trigger.player);
				if (get.color(result.cards[0]) == "red") {
					trigger.player.addTempSkill("jlsg_yanliang_adjust");
					trigger.player.addTempSkill("jlsg_yanliang_red");
				} else {
					trigger.player.addTempSkill("jlsg_yanliang_adjust");
					trigger.player.addTempSkill("jlsg_yanliang_black");
				}
			}
		},
		subSkill: {
			adjust: {
				trigger: { player: "phaseDrawBefore" },
				priority: 100,
				forced: true,
				popup: false,
				content: function () {
					trigger.cancel();
					player.removeSkill("jlsg_yanliang_adjust");
				},
			},
			red: {
				trigger: { player: "phaseUseAfter" },
				forced: true,
				popup: false,
				mark: true,
				intro: {
					marktext: "延",
					content: "摸牌阶段在出牌阶段后进行",
				},
				content: function () {
					player.phaseDraw();
					player.removeSkill("jlsg_yanliang_red");
				},
			},
			black: {
				trigger: { player: "phaseDiscardAfter" },
				forced: true,
				popup: false,
				mark: true,
				intro: {
					marktext: "延",
					content: "摸牌阶段在弃牌阶段后进行",
				},
				content: function () {
					player.phaseDraw();
					player.removeSkill("jlsg_yanliang_black");
				},
			},
		},
	},
	jlsg_duzhi: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "recoverEnd" },
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget("是否发动【毒治】？", function (card, target, player) {
				return player != target;
			}).ai = function (target) {
				return -get.attitude(player, target);
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_duzhi", result.targets);
				for (var i = 0; i < result.targets.length; i++) {
					result.targets[i].loseHp(trigger.num);
					result.targets[i].chooseToUse({ name: "sha" }, player);
				}
			}
		},
		ai: {
			expose: 0.2,
		},
		group: "jlsg_duzhi2",
	},
	jlsg_duzhi2: {
		direct: true,
		trigger: { source: "damageEnd" },
		filter: function (event, player) {
			return event.card && event.card.name == "sha" && get.color(event.card) == "red" && event.num > 0 && event.notLink();
		},
		content: function () {
			"step 0"
			player.chooseTarget("是否发动【毒治】？", [1, trigger.num], function (card, target, player) {
				return player != target;
			}).ai = function (target) {
				return -get.attitude(player, target);
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_duzhi", result.targets);
				for (var i = 0; i < result.targets.length; i++) {
					result.targets[i].loseHp();
					result.targets[i].chooseToUse({ name: "sha" }, player);
				}
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_lieyi: {
		mod: {
			cardname: function (card, player, name) {
				if (card.name == "tao") {
					return "sha";
				}
				if (card.name == "shan") {
					return "jiu";
				}
			},
		},
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "useCard",
		},
		forced: true,
		filter: function (event, player) {
			return (event.card.name == "sha" && event.cards && event.cards.length == 1 && event.cards[0].name == "tao") || (event.card.name == "jiu" && event.cards && event.cards.length == 1 && event.cards[0].name == "shan");
		},
		content: function () {},
	},
	jlsg_baoli: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			if (player == target) {
				return false;
			}
			return !target.countCards("e") || target.countCards("j");
		},
		content: function () {
			target.damage(player);
		},
		ai: {
			order: 4,
			result: {
				target: -1,
			},
		},
	},
	jlsg_huanbing: {
		audio: "ext:极略/audio/skill:2",
		trigger: { target: "shaBefore" },
		// filter: function (event, player) {
		//   if (get.itemtype(event.card) != 'card') return false;
		//   return event.card && event.card.name == 'sha';
		// },
		forced: true,
		content: function () {
			"step 0"
			trigger.cancel();
			player.addToExpansion(trigger.cards, "gain2").gaintag.add(event.name);
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (card.name == "sha") {
						return 0.6;
					}
				},
			},
		},
		group: "jlsg_huanbing2",
	},
	jlsg_huanbing2: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return player.getExpansions("jlsg_huanbing").length;
		},
		forced: true,
		content: function () {
			"step 0"
			if (player.getExpansions("jlsg_huanbing").length) {
				event.card = player.getExpansions("jlsg_huanbing")[0];
				player.$phaseJudge(event.card);
				player.lose(event.card, ui.ordering).relatedEvent = event;
				player.judge(function (card) {
					if (get.color(card) == "red") {
						return 1;
					}
					return -0.5;
				});
			} else {
				event.finish();
			}
			"step 1"
			if (result.bool) {
				player.draw();
			} else {
				player.loseHp();
				player.gain(event.card, "gain2");
			}
			event.goto(0);
		},
	},
	jlsg_hongyuan: {
		audio: "ext:极略/audio/skill:1",
		usable: 1,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countDiscardableCards(player, "h") && player.isDamaged() && player.canMoveCard();
		},
		filterCard: true,
		selectCard: function () {
			return [1, _status.event.player.getDamagedHp()];
		},
		check: function (card) {
			return 6 - ai.get.value(card);
		},
		filterTarget: function (card, player, target) {
			return target.canMoveCard();
		},
		content: function () {
			"step 0"
			event.count = cards.length;
			"step 1"
			target
				.chooseTarget("请选择目标", function (card, player, target2) {
					return target2.countCards("ej");
				})
				.set("ai", function (target2) {
					var target = _status.event.player;
					if (ai.get.attitude(target, target2) > 0 && target2.num("j")) {
						return 1;
					}
					return -ai.get.attitude(target, target2);
				});
			"step 2"
			if (result.bool) {
				target.gainPlayerCard("请选择想要获得的牌", [1, event.count], "ej", result.targets[0], true);
			} else {
				event.finish();
			}
			"step 3"
			if (result.bool) {
				event.count -= result.links.length;
				if (event.count) {
					event.goto(1);
				}
			}
		},
	},
	jlsg_huaqiang: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		enable: "phaseUse",
		filter: function (event, player) {
			return player.countCards("h") >= player.hp;
		},
		filterCard: function (card) {
			for (var i = 0; i < ui.selected.cards.length; i++) {
				if (get.suit(card) == get.suit(ui.selected.cards[i])) {
					return false;
				}
			}
			return true;
		},
		selectCard: function () {
			return Math.min(4, _status.event.player.hp);
		},
		filterTarget: function (card, player, target) {
			return player != target;
		},
		check: function (card) {
			return 6 - get.value(card);
		},
		content: function () {
			target.damage();
		},
		ai: {
			order: 8,
			expose: 0.2,
			result: {
				player: function (player) {
					var eff = player.hp / 2;
					return -eff;
				},
				target: function (player, target) {
					return get.damageEffect(target, player);
				},
			},
		},
	},
	jlsg_chaohuang: {
		audio: "ext:极略/audio/skill:1",
		usable: 1,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return target.inRangeOf(player) && player.canUse({ name: "sha" }, target, false);
		},
		delay: false,
		line: false,
		selectTarget: [1, Infinity],
		multitarget: true,
		content: function () {
			player.loseHp();
			player.useCard({ name: "sha" }, targets, false);
		},
		ai: {
			order: 5,
			result: {
				target: function (player, target) {
					var ts = game.filterPlayer(function (cur) {
						return cur.inRangeOf(player) && player.canUse({ name: "sha" }, cur, false) && get.effect(cur, { name: "sha" }, player, player) > 0;
					});
					if (ts.length <= 1 || player.hp <= 1) {
						return 0;
					}
					return get.effect(target, { name: "sha" }, player, target);
				},
			},
		},
	},
	jlsg_huilian: {
		audio: "ext:极略/audio/skill:1",
		usable: 1,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return player != target;
		},
		content: function () {
			"step 0"
			target.judge(function (card) {
				if (target.hp == target.maxHp) {
					if (get.suit(card) == "heart") {
						return 1;
					}
				}
				if (get.suit(card) == "heart") {
					return 2;
				}
				return 1;
			});
			"step 1"
			target.gain(result.card, "gain2");
			if (result.suit == "heart") {
				target.recover();
			}
		},
		ai: {
			order: 9,
			expose: 0.2,
			result: {
				target: function (target) {
					if (target.isDamaged()) {
						return 2;
					}
					return 1;
				},
			},
		},
	},
	jlsg_wenliang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "judgeAfter" },
		frequent: true,
		filter: function (event, player) {
			return get.color(event.result.card) == "red";
		},
		content: function () {
			player.draw();
		},
	},
	jlsg_qianhuan: {
		unique: true,
		init(player, skill) {
			player.setStorage(skill, { list: [], num: 2 });
			if (get.config("double_character") === true) {
				player.changeCharacter(["jlsgsk_zuoci"]);
				let map = player.getStorage(skill);
				map.num = 4;
				player.setStorage(skill, map);
			}
		},
		onremove: true,
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: ["enterGame", "phaseBegin"],
			global: "phaseBefore",
		},
		filter(event, player, name) {
			if (event.name == "phase") {
				return name == "phaseBegin" || game.phaseNumber == 0;
			}
			return true;
		},
		forced: true,
		async content(event, trigger, player) {
			let storage = player.getStorage(event.name, { list: [], num: 2 });
			event.num = storage.num;
			const characterlist = lib.jlsg.characterList.slice().randomSort(),
				map = {};
			for (const current of game.filterPlayer2(() => true, undefined, true)) {
				characterlist.removeArray(get.nameList(current));
			}
			for (let name of characterlist) {
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1 || name.startsWith("jlsgsoul_sp_")) {
					continue;
				}
				let skills = (get.character(name)[3] || []).filter(skill => {
					if (player.hasSkill(skill, null, false, false) || storage.list.includes(skill)) {
						return false;
					}
					let info = get.info(skill);
					if (lib.filter.skillDisabled(skill)) {
						return false;
					}
					return info && !info.zhuSkill && !info.hiddenSkill && !info.charlotte && !info.hiddenSkill && !info.dutySkill;
				});
				if (skills.length) {
					map[name] = skills;
				}
				if (Object.keys(map).length > 2) {
					break;
				}
			}
			if (!Object.keys(map).length) {
				return;
			}
			if (storage.list.length) {
				map[player.name] = storage.list;
			}
			if (player.isUnderControl()) {
				game.swapPlayerAuto(player);
			}
			const switchToAuto = function () {
				_status.imchoosing = false;
				let skills = Object.values(map)
					.flat()
					.sort(function (a, b) {
						return get.skillRank(b) - get.skillRank(a);
					});
				if (event.dialog) {
					event.dialog.close();
				}
				if (event.control) {
					event.control.close();
				}
				return Promise.resolve({
					bool: true,
					skills: skills.slice(0, event.num),
				});
			};
			const chooseButton = function (map, num) {
				const { promise, resolve } = Promise.withResolvers();
				const event = _status.event;
				event.num ??= num;
				const player = event.player;
				if (!event._result) {
					event._result = {};
				}
				event._result.skills = [];
				let rSkill = event._result.skills;
				event.dialog = ui.create.dialog(`千幻：请选择获得至多${get.cnNumber(event.num)}个技能`, "hidden");
				for (const name of Object.keys(map)) {
					const table = document.createElement("div");
					table.classList.add("add-setting");
					table.style.margin = "0";
					table.style.width = "100%";
					table.style.position = "relative";
					table.style.display = "flex";
					table.style.justifyContent = "flex-start";
					table.style.alignItems = "center";
					const tdc = ui.create.buttonPresets.character(name, "character");
					for (const item in tdc.node) {
						if (item == "name") {
							tdc.node.name.style.writingMode = "horizontal-tb";
						} else {
							tdc.node[item].hide();
						}
					}
					tdc.style.height = "40px";
					table.appendChild(tdc);
					const skills = map[name];
					for (let i = 0; i < skills.length; i++) {
						const td = ui.create.div(".shadowed.reduce_radius.pointerdiv.tdnode");
						td.link = skills[i];
						td.innerHTML = "<span>" + get.translation(skills[i]) + "</span>";
						td.setNodeIntro(get.translation(skills[i]), get.skillInfoTranslation(skills[i], player));
						td.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
							if (_status.dragged) {
								return;
							}
							if (_status.justdragged) {
								return;
							}
							_status.tempNoButton = true;
							setTimeout(function () {
								_status.tempNoButton = false;
							}, 500);
							let link = this.link;
							if (!this.classList.contains("bluebg")) {
								if (rSkill.length >= event.num) {
									return;
								}
								rSkill.add(link);
								this.classList.add("bluebg");
							} else {
								this.classList.remove("bluebg");
								rSkill.remove(link);
							}
						});
						table.appendChild(td);
					}
					event.dialog.content.appendChild(table);
				}
				event.dialog.add("　　");
				if (!map[player.name]) {
					event.dialog.add("　　");
				}
				event.dialog.open();
				event.switchToAuto = function () {
					_status.imchoosing = false;
					event._result = "ai";
					resolve(event._result);
					if (event.dialog) {
						event.dialog.close();
					}
					if (event.control) {
						event.control.close();
					}
				};
				event.control = ui.create.control("ok", function (link) {
					event._result.bool = true;
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
					resolve(event._result);
				});
				for (var i = 0; i < event.dialog.buttons.length; i++) {
					event.dialog.buttons[i].classList.add("selectable");
				}
				game.pause();
				game.countChoose();
				return promise;
			};
			let next;
			if (event.isMine()) {
				next = chooseButton(map, event.num);
			} else if (event.isOnline()) {
				const { promise, resolve } = Promise.withResolvers();
				event.player.send(chooseButton, map, event.num);
				event.player.wait(async result => {
					if (result == "ai") {
						result = await switchToAuto();
					}
					resolve(result);
				});
				game.pause();
				next = promise;
			} else {
				next = switchToAuto();
			}
			const result = await next;
			game.resume();
			const info = result.skills;
			let remove = storage.list.filter(skill => player.hasSkill(skill, null, false, false) && !info.includes(skill)),
				add = info.filter(skill => !player.hasSkill(skill, null, false, false));
			await player.changeSkills(add, remove);
			storage.list = info;
			player.setStorage(event.name, storage);
		},
		ai: {
			threaten: 2.5,
		},
	},
	jlsg_jinglun: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: { global: ["respond", "useCard"] },
		filter: function (event, player) {
			if (!event.respondTo) {
				return false;
			}
			if (event.player == player && player != event.respondTo[0]) {
				var cards = [];
				if (get.itemtype(event.respondTo[1]) == "card") {
					cards.push(event.respondTo[1]);
				} else if (event.respondTo[1].cards) {
					cards.addArray(event.respondTo[1].cards);
				}
				return cards.filterInD("od").length != 0;
			}
			if (event.player != player && player == event.respondTo[0]) {
				return event.cards.filterInD("od").length > 0;
			}
			return false;
		},
		check: function (event, player) {
			return true;
			// return get.value(event.cards.filterInD('od'), player) > 0;
		},
		logTarget: "player",
		content: function () {
			var cards = [];
			if (trigger.player == player && player != trigger.respondTo[0]) {
				if (get.itemtype(trigger.respondTo[1]) == "card") {
					cards.push(trigger.respondTo[1]);
				} else if (trigger.respondTo[1].cards) {
					cards.addArray(trigger.respondTo[1].cards);
				}
			} else {
				cards = trigger.cards;
			}
			cards = cards.filterInD("od");
			player.gain(cards, "log", "gain2");
		},
	},
	jlsg_ruzong: {
		audio: "ext:极略/audio/skill:1",
		group: ["jlsg_ruzong_wuxie", "jlsg_ruzong_shan"],
		subSkill: {
			wuxie: {
				// 闪当无懈
				audio: "jlsg_ruzong",
				position: "hs",
				enable: ["chooseToUse", "chooseToRespond"],
				filterCard: { name: "shan" },
				viewAsFilter: function (player) {
					return player.countCards("hs", "shan") != 0;
				},
				viewAs: {
					name: "wuxie",
				},
				prompt: "将一张闪当无懈可击使用",
				check: function (card) {
					return 8 - get.value(card);
				},
			},
			shan: {
				audio: "jlsg_ruzong",
				position: "hs",
				enable: ["chooseToUse", "chooseToRespond"],
				filterCard: { name: "wuxie" },
				viewAsFilter: function (player) {
					return player.countCards("hs", "wuxie") != 0;
				},
				viewAs: {
					name: "shan",
				},
				prompt: "将一张无懈可击当闪使用或打出",
				check: function (card) {
					return 1;
				},
				ai: {
					respondShan: true,
					skillTagFilter: function (player) {
						if (!player.countCards("hs", "wuxie")) {
							return false;
						}
					},
				},
			},
		},
	},
	jlsg_leiji: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "useCard" },
		mark: true,
		marktext: "祭",
		// intro: {
		//   mark: function (dialog, content, player) {
		//     var num = Array.from(ui.cardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
		//     num += Array.from(ui.discardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
		//     return `剩余${get.cnNumber(num)}张闪电`;
		//   },
		//   markcount: function (storage, player) {
		//     var num = Array.from(ui.cardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
		//     return num + Array.from(ui.discardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
		//   },
		// },
		filter: function (event, player) {
			return event.card.name == "shan" && event.player != player;
		},
		direct: true,
		content: function () {
			"step 0"
			var card = get.cardPile(function (card) {
				return card.name == "shandian";
			});
			if (card) {
				// game.cardsGotoOrdering(card);
				event.card = card;
				player
					.chooseTarget(get.prompt("jlsg_leiji"), function (card, player, target) {
						return target.canAddJudge(_status.event.card);
					})
					.set("card", card)
					.set("ai", function (target) {
						var now = (_status.currentPhase || get.event().getParent("phase", true).player).next;
						for (var i = 0; i < 10; i++) {
							if (get.attitude(player, now) < 0) {
								return target == now;
							} else {
								now = now.next;
							}
						}
						return false;
					});
			} else {
				event.finish();
			}
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_leiji", result.targets[0]);
				result.targets[0].$gain(event.card);
				player.line(result.targets[0], "thunder");
				result.targets[0].addJudge(event.card);
			}
		},
	},
	jlsg_shanxi: {
		audio: "ext:极略/audio/skill:1",
		trigger: { global: "judgeEnd" },
		forced: true,
		filter: function (event, player) {
			return get.position(event.result.card, true) == "o" && event.card && event.card.name == "shandian" && event.player != player;
		},
		content: function () {
			player.gain(trigger.result.card, "gain2");
		},
		mod: {
			targetEnabled: function (card) {
				if (card.name == "shandian") {
					return false;
				}
			},
		},
	},
	jlsg_guhuo: {
		audio: "ext:极略/audio/skill:3",
		trigger: { global: "phaseBegin" },
		filter: function (event, player) {
			return player.canCompare(event.player); // && !event.player.hasSkill("jlsg_chanyuan");
		},
		check: function (event, player) {
			var cards = player.get("h");
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].number > 11 && get.value(cards[i]) < 7) {
					return get.attitude(player, event.player) < 0;
				}
			}
			if (get.attitude(player, event.player) < 0 && player.countCards("h") > 2) {
				return 1;
			}
			return 0;
		},
		logTarget: "player",
		content: function () {
			"step 0"
			player.chooseToCompare(trigger.player);
			"step 1"
			var target = trigger.player;
			if (result.bool) {
				var list = [];
				for (var name of lib.inpile) {
					var type = get.type(name);
					if (!["basic", "trick"].includes(type)) {
						continue;
					}
					if (lib.filter.cardEnabled({ name: name }, player)) {
						list.push([type, "", name]);
					}
					if (name == "sha") {
						for (var j of lib.inpile_nature) {
							if (lib.filter.cardEnabled({ name: name, nature: j }, player)) {
								list.push([type, "", name, j]);
							}
						}
					}
				}
				var next = player.chooseButton(["蛊惑", [list, "vcard"]]);
				var choice,
					value = 0;
				for (let [_, __, cardName, nature] of list) {
					// choose button ai
					let card = { name: cardName, nature: nature };
					let newV = player.getUseValue(card);
					if (newV > value) {
						choice = [cardName, nature];
						value = newV;
					}
				}
				next.filterButton = function (button, player) {
					return true;
				};
				next.ai = function (button) {
					return button.link[2] === _status.event.choice[0] && (button.link[3] || true) === (_status.event.choice[1] || true);
				};
				next.choice = choice;
			} else {
				player.damage(target);
				event.finish();
			}
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = trigger.player;
			event.card = { name: result.links[0][2], nature: result.links[0][3] };
			player.chooseUseTarget(event.card, true);
		},
		ai: {
			expose: 0.1,
			order: 8,
			result: {
				player: function (player) {
					if (player.storage.jlsg_tianqi != undefined) {
						return 1;
					}
					if (player.hp > 2 && player.storage.jlsg_tianqi == undefined) {
						return -10;
					}
					if (Math.random() < 0.67) {
						return 0.5;
					}
					return -1;
				},
			},
			threaten: 4,
		},
	},
	jlsg_fulu: {
		audio: "ext:极略/audio/skill:3",
		trigger: { player: "damageEnd" },
		getIndex(event) {
			return event.num;
		},
		getTargets(player) {
			let damage = player
					.getAllHistory("damage", evt => {
						return evt.source && evt.source.isIn();
					})
					.map(evt => evt.source)
					.reverse()
					.slice(0, 3),
				recover = game
					.getAllGlobalHistory("changeHp", evt => {
						if (evt.player != player || !evt.parent) {
							return false;
						}
						if (evt.parent.name != "recover") {
							return false;
						}
						if (evt.parent.source && evt.parent.source.isIn()) {
							return true;
						}
						return evt.getParent(2)?.player?.isIn();
					})
					.map(evt => evt.parent.source || evt.getParent(2).player)
					.reverse()
					.slice(0, 3);
			return [damage, recover];
		},
		filter(event, player) {
			const [damage, recover] = lib.skill.jlsg_fulu.getTargets(player);
			return event.num > 0 && (damage.length || recover.length);
		},
		async cost(event, trigger, player) {
			const [damage, recover] = lib.skill.jlsg_fulu.getTargets(player);
			let str = "###符箓：是否令最近三名对你造成伤害的角色依次随机弃置一张牌，最近三次令你回复体力的角色各摸一张牌？###";
			str += `<div class='center text'>打你的人：${damage.length ? get.translation(damage) : "无"}</div><br>`;
			str += `<div class='center text'>帮你的人：${recover.length ? get.translation(recover) : "无"}</div>`;
			const { result } = await player
				.chooseBool(str)
				.set("info", [damage, recover])
				.set("ai", (event, player) => {
					let v = 0,
						[damage, recover] = get.event("info");
					for (let p of damage) {
						v += get.attitude(player, p) > 0 ? -1 : 1;
					}
					for (let p of recover) {
						v += get.attitude(player, p) > 0 ? 1 : -1;
					}
					return v >= 0;
				});
			let targets = [...damage, ...recover].unique().sortBySeat();
			event.result = {
				bool: result.bool,
				targets: targets,
				cost_data: {
					damage: damage.sortBySeat(),
					recover: recover,
				},
			};
		},
		async content(event, trigger, player) {
			const { damage, recover } = event.cost_data;
			for (let target of damage) {
				if (target.isIn()) {
					let hs = target.getDiscardableCards(player, "he");
					if (hs.length > 0) {
						await target.discard(hs.randomGet());
					}
				}
			}
			if (recover.length) {
				await game.asyncDraw(recover);
			}
		},
	},
	jlsg_guixiu: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "phaseDiscardBefore" },
		frequent: true,
		filter: function (event, player) {
			return !player.getStat("damage");
		},
		content: function () {
			trigger.cancel();
			player.draw();
		},
	},
	jlsg_cunsi: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "die" },
		skillAnimation: true,
		animationColor: "orange",
		direct: true,
		forceDie: true,
		content: function () {
			"step 0"
			let prompt = `###${get.prompt(event.name)}###将区域中所有牌移出游戏，然后令一名角色获得〖勇决〗`;
			player.chooseTarget(prompt, lib.filter.notMe).set("ai", function (target) {
				return get.attitude(_status.event.player, target);
			});
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.target = result.targets[0];
			var target = result.targets[0];
			player.logSkill(event.name, target);
			target.addSkills("jlsg_yongjue");
			"step 2"
			var target = result.targets[0];
			if (player.countCards("hej")) {
				let cards = player.getCards("hej");
				target.addToExpansion(cards, player, "give").gaintag.add("jlsg_yongjue2");
			}
		},
		derivation: "jlsg_yongjue",
	},
	jlsg_yongjue: {
		trigger: { source: "damageBegin1" },
		filter: function (event) {
			return event.card && event.card.name == "sha" && event.notLink();
		},
		forced: true,
		direct: true,
		content: function () {
			{
				let gender = player.sex;
				if (!["male", "female"].includes(gender)) {
					let gender = ["male", "female"].randomGet();
				}
				if (gender === "male") {
					player.logSkill("jlsg_yongjue11");
				} else {
					player.logSkill("jlsg_yongjue12");
				}
			}
			trigger.num++;
		},
		ai: {
			damageBonus: true,
		},
		group: "jlsg_yongjue2",
	},
	jlsg_yongjue2: {
		audio: "ext:极略/audio/skill:2",
		marktext: "嗣",
		intro: {
			name: "存嗣",
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		trigger: {
			source: "dieAfter",
		},
		filter: function (event, player, name) {
			return player.getExpansions("jlsg_yongjue2").length;
		},
		skillAnimation: true,
		animationColor: "orange",
		locked: true,
		direct: true,
		content: function () {
			"step 0"
			{
				let gender = player.sex;
				if (!["male", "female"].includes(gender)) {
					let gender = ["male", "female"].randomGet();
				}
				if (gender === "male") {
					player.logSkill("jlsg_yongjue21");
				} else {
					player.logSkill("jlsg_yongjue22");
				}
			}
			"step 1"
			player.$draw(player.storage.jlsg_yongjue2);
			player.gain(player.getExpansions("jlsg_yongjue2"), "draw", "log");
			player.unmarkSkill("jlsg_yongjue2");
			delete player.storage.jlsg_yongjue2;
		},
	},
	jlsg_yongjue11: {
		inherit: "jlsg_yongjue",
		audio: "ext:极略/audio/skill:true",
	},
	jlsg_yongjue12: {
		inherit: "jlsg_yongjue",
		audio: "ext:极略/audio/skill:true",
	},
	jlsg_yongjue21: {
		inherit: "jlsg_yongjue2",
		audio: "ext:极略/audio/skill:true",
	},
	jlsg_yongjue22: {
		inherit: "jlsg_yongjue2",
		audio: "ext:极略/audio/skill:true",
	},
	jlsg_gongshen: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filterCard: true,
		selectCard: 3,
		position: "he",
		filter: function (event, player) {
			return player.countCards("he") > 2;
		},
		check: function (card, event) {
			if (jlsg.needKongcheng(_status.event.player)) {
				return 10 - get.value(card);
			}
			return 6 - get.value(card);
		},
		content: function () {
			"step 0"
			player.draw();
			"step 1"
			if (player.isDamaged()) {
				if (
					!game.hasPlayer(function (target) {
						return player.countCards("h") > target.countCards("h");
					})
				) {
					player.recover();
				}
			}
		},
		ai: {
			order: 1,
			result: {
				player: function (player) {
					if (!player.isDamaged()) {
						return -2;
					}
					var less = !game.hasPlayer(function (target) {
						return player.countCards("h") - 2 > target.countCards("h");
					});
					if (less) {
						return 1;
					}
					return 0;
				},
			},
		},
	},
	jlsg_jianyue: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseJieshuBegin" },
		filter: function (event, player) {
			if (ui.discardPile.hasChildNodes() == false) {
				return false;
			}
			return !game.hasPlayer(function (target) {
				return event.player.countCards("h") > target.countCards("h");
			});
		},
		logTarget: "player",
		frequent: function (event, player) {
			return event.player == player;
		},
		check: function (event, player) {
			if (jlsg.isFriend(player, event.player)) {
				return !jlsg.needKongcheng(event.player, true);
			}
			return get.attitude(player, event.player) > 0;
		},
		content: function () {
			"step 0"
			if (trigger.player.ai.shown > player.ai.shown) {
				player.addExpose(0.3);
			}
			"step 1"
			var isLess =
				!(ui.discardPile.hasChildNodes() == false) &&
				!game.hasPlayer(function (target) {
					return trigger.player.countCards("h") > target.countCards("h");
				});
			if (isLess) {
				var card = jlsg.findCardInDiscardPile();
				if (card) {
					trigger.player.gain(card, "gain2");
					event.redo();
				}
			}
		},
		ai: {
			threaten: 1.1,
		},
	},
	jlsg_pengri: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		selectTarget: -1,
		usable: 1,
		line: "fire",
		// filter: function (event, player) {
		//   return game.hasPlayer(function (target) {
		//     return player.inRangeOf(target) && player != target;
		//   });
		// },
		filterTarget: function (card, player, target) {
			return target && player != target && player.inRangeOf(target);
		},
		multitarget: true,
		multiline: true,
		precontent: function () {
			player.draw(2, "nodelay");
		},
		content: function () {
			"step 0"
			event.target = event.targets.shift();
			if (!event.target) {
				event.finish();
				return;
			}
			event.target.chooseToUse("是否对" + get.translation(player) + "使用一张【杀】？", { name: "sha" }, player, -1);
			"step 1"
			event.goto(0);
		},
		ai: {
			order: 9,
			result: {
				player: function (player) {
					var shotter = game.filterPlayer(p => p != player);
					var sha = 0;
					for (var shot of shotter) {
						if (player.inRangeOf(shot) && !jlsg.isKongcheng(shot) && !jlsg.isFriend(shot, player)) {
							sha++;
						}
					}
					var shan = jlsg.getCardsNum("shan", player, player);
					if (sha > 3 && player.hp <= 2) {
						return -1;
					}
					if (shan >= sha) {
						return 1;
					}
					if (sha == 0) {
						return 2;
					}
					return 0;
				},
			},
		},
	},
	jlsg_danmou: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source && event.source.isAlive() && event.source != player && (event.source.countCards("h") || player.countCards("h"));
		},
		check: function (event, player) {
			if (get.attitude(player, event.source) <= 0) {
				var cardlength = player.countCards("h");
				for (var i = 0; i < player.getCards("h").length; i++) {
					if (get.value(player.getCards("h")[i]) > 7) {
						cardlength--;
					}
				}
				if (Math.random < 0.5 && cardlength == event.source.countCards("h")) {
					cardlength--;
				}
				return cardlength < event.source.countCards("h");
			} else {
				if (_status.currentPhase == event.source) {
					if (event.source.countUsed("sha") <= 0) {
						return false;
					}
					return event.source.needsToDiscard();
				} else {
					if (event.source.hp < player.hp) {
						return player.countCards("h") - event.source.countCards("h");
					}
				}
			}
		},
		content: function () {
			player.swapHandcards(trigger.source);
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (player.countCards("h") <= target.countCards("h")) {
						return;
					}
					if (get.tag(card, "damage") && get.attitude(player, target) < 0) {
						return [1, player.countCards("h") - target.countCards("h") - 1];
					}
				},
			},
		},
	},
	jlsg_fushe: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter: function (event, player) {
			return event.player.inRangeOf(player) && event.player != player;
		},
		logTarget: "player",
		check: function (event, player) {
			return get.attitude(event.player, player) < 0;
		},
		content: function () {
			"step 0"
			player.chooseControl("heart2", "diamond2", "club2", "spade2").set("ai", function (event) {
				var rand = Math.ceil(Math.random() * 6);
				var suit = "heart2";
				if ([1, 4].includes(rand)) {
					suit = "diamond2";
				} else if ([2, 5].includes(rand)) {
					suit = "club2";
				} else if (rand == 3) {
					suit = "spade2";
				} else {
					suit = "heart2";
				}
				return suit;
			});
			"step 1"
			var message = `<span style="color: ${["heart2", "diamond2"].includes(result.control) ? "#631515" : "rgba(0,0,0,0.8)"}; font-size: 200%;">${get.translation(result.control.slice(0, -1))}</span>`;
			// can't really chat this due to ban words restrictions
			player.say(message);
			game.log(player, "选择了", result.control);
			trigger.player.storage.jlsg_fushe = result.control;
			trigger.player.storage.jlsg_fushe_source = player;
			trigger.player.addTempSkill("jlsg_fushe_scanning", "phaseUseAfter");
		},
		subSkill: {
			scanning: {
				mark: true,
				intro: {
					content: function (storage, player) {
						if (!player.storage.jlsg_fushe) {
							return null;
						}
						if (player.hasSkill("jlsg_fushe_debuff")) {
							return `阶段结束时受到来自${get.translation(player.storage.jlsg_fushe_source)}的一点伤害`;
						}
						return `出牌阶段${get.translation(player.storage.jlsg_fushe)}牌进入弃牌堆时，\
此阶段结束时受到来自${get.translation(player.storage.jlsg_fushe_source)}的1点伤害'`;
					},
				},
				audio: false,
				popup: false,
				forced: true,
				silent: true,
				trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "equipAfter"] },
				filter: function (event, player) {
					/* actually, all cards that entered discard counts */
					// var p;
					// if (event.player) {
					//   if (event.player != player) return false;
					// } else {
					//   var evt =event.getParent();
					//   if(!(evt.name == 'orderingDiscard' && evt.relatedEvent && evt.relatedEvent.player === player)) { // && ['useCard','respond'].includes(evt.relatedEvent.name)
					//     return false;
					//   }
					// }
					return !player.hasSkill("jlsg_fushe_debuff") && event.getd().some(c => get.suit(c) + "2" === player.storage.jlsg_fushe);
				},
				content: function () {
					"step 0"
					player.unmarkSkill("jlsg_fushe_scanning");
					player.addTempSkill("jlsg_fushe_debuff", "phaseUseAfter");
					"step 1"
					// animate appear again
					player.markSkill("jlsg_fushe_scanning");
				},
				ai: {
					effect: {
						player: function (card, player, target) {
							var zhangren = player.storage.jlsg_fushe_source;
							if (get.damageEffect(player, zhangren, player) > 0) {
								return;
							}
							if (!player.storage.jlsg_fushe) {
								return;
							}
							if (get.suit(card) + "2" != player.storage.jlsg_fushe) {
								return;
							}
							if (!player.needsToDiscard() && !player.hasSkill("jlsg_fushe_debuff")) {
								var type = get.type(card);
								if (type == "basic") {
									return [1, -1.5];
								} else if (type == "trick" && !get.tag(card, "damage")) {
									return [1, -1.5];
								}
							}
						},
					},
				},
			},
			debuff: {
				trigger: { player: "phaseUseEnd" },
				forced: true,
				popup: false,
				filter: function (event, player) {
					return player.storage.jlsg_fushe_source && player.storage.jlsg_fushe_source.isAlive();
				},
				content: function () {
					"step 0"
					var zhangren = lib.jlsg.findPlayerBySkillName("jlsg_fushe");
					if (zhangren) {
						zhangren.logSkill("jlsg_fushe", player);
						player.damage(zhangren);
						zhangren.draw();
					}
					"step 1"
					player.removeSkill("jlsg_fushe_buff");
				},
			},
		},
		ai: {
			threaten: function (player, target) {
				if (target.inRangeOf(player)) {
					return 2.5;
				}
				return 1.3;
			},
		},
	},
	jlsg_ziguo: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			return game.hasPlayer(function (cur) {
				return cur.isDamaged() && cur != player;
			});
		},
		filterTarget: function (card, player, target) {
			return target.isDamaged();
		},
		content: function () {
			target.draw(2);
			player.addTempSkill("jlsg_ziguo_debuff");
		},
		subSkill: {
			debuff: {
				mod: {
					maxHandcard: function (player, num) {
						return num - 2;
					},
				},
			},
		},
		ai: {
			order: 4,
			result: {
				target: function (player, target) {
					if (player.getHandcardLimit() <= 2) {
						if (!player.hasSkill("jlsg_shangdao")) {
							return 0;
						}
					}
					var lastedCard = Math.min(player.getHandcardLimit() - 2, 0);
					var currentLastCard = lastedCard;
					if (
						lastedCard +
							game.countPlayer(function (cur) {
								if (cur != player && cur.countCards("h") > currentLastCard && !cur.isTurnedOver()) {
									currentLastCard++;
									return true;
								}
								return false;
							}) <=
						player.maxHp - 2
					) {
						return 0;
					}
					if (get.attitude(player, target) <= 0) {
						return 0;
					}
					var result = Math.max(5 - target.countCards("h"), 1.1);
					if (player == target) {
						return Math.max(result - 1, 1);
					}
					return result;
				},
			},
		},
	},
	jlsg_shangdao: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return event.player.countCards("h") > player.countCards("h");
		},
		forced: true,
		content: function () {
			var card = get.cards();
			player.showCards("商道", card);
			player.gain(card, "gain2");
		},
	},
	jlsg_hengjiang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseDiscardBegin" },
		filter: function (event, player) {
			return [-1, 0, 1].includes(player.countCards("h") - player.getHandcardLimit());
		},
		check: function (event, player) {
			if (player.getHandcardLimit() - 1 >= player.countCards("h")) {
				return false;
			}
			return true;
		},
		content: function () {
			"step 0"
			player.chooseControl("手牌上限+1", "手牌上限-1").set("ai", function (event, player) {
				if (jlsg.isWeak(player) && player.getHandcardLimit() < player.countCards("h")) {
					return "手牌上限+1";
				}
				var friends = jlsg.getFriends(player);
				var needToThrowJudge = false;
				for (var i = 0; i < friends.length; i++) {
					if (friends[i].num("j") && !friends[i].num("j", "shandian")) {
						needToThrowJudge = true;
						break;
					} else if (friends[i].num("j", "shandian")) {
						var rejudge = game.hasPlayer(function (target) {
							return target.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target);
						});
						if (rejudge) {
							needToThrowJudge = true;
							break;
						}
					}
				}
				if (needToThrowJudge && !jlsg.isWeak(player)) {
					return "手牌上限-1";
				}
				var diren = jlsg.getEnemies(player);
				var needToThrowEquip = false;
				for (var i = 0; i < diren.length; i++) {
					if (diren[i].num("e")) {
						needToThrowEquip = true;
						break;
					} else if (diren[i].num("j", "shandian")) {
						var rejudge = game.hasPlayer(function (target) {
							return target.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target);
						});
						if (rejudge) {
							needToThrowEquip = true;
							break;
						}
					}
				}
				if (needToThrowEquip && !jlsg.isWeak(player)) {
					return "手牌上限-1";
				}
				return "手牌上限+1";
			});
			"step 1"
			if (result.control == "手牌上限+1") {
				player.addTempSkill("jlsg_hengjiang_buff", "phaseAfter");
			} else {
				player.addTempSkill("jlsg_hengjiang_debuff", "phaseAfter");
			}
			player.addTempSkill("jlsg_hengjiang_effect", "phaseAfter");
		},
		subSkill: {
			effect: {
				audio: false,
				trigger: { player: "phaseDiscardEnd" },
				forced: true,
				popup: false,
				filter: function (event) {
					return event.cards && event.cards.length > 0;
				},
				content: function () {
					"step 0"
					event.count = trigger.cards.length;
					"step 1"
					if (event.count > 0) {
						player
							.chooseTarget(get.prompt("jlsg_hengjiang"), function (card, player, target) {
								return target.countCards("ej");
							})
							.set("ai", function (target) {
								if (jlsg.isFriend(player, target)) {
									if (target.countCards("j") && !target.countCards("j", "shandian")) {
										return 8;
									}
									var rejudge = game.hasPlayer(function (target1) {
										return target1.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target1);
									});
									if (target.countCards("j", "shandian") && rejudge) {
										return 10;
									}
									return 0;
								}
								if (jlsg.isEnemy(player, target)) {
									var rejudge = game.hasPlayer(function (target1) {
										return target1.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target1);
									});
									if (rejudge && target.countCards("j", "shandian")) {
										return 7;
									}
									if (target.countCards("e") && !target.hasSkills(jlsg.ai.skill.lose_equip)) {
										return 6;
									}
									return 0;
								}
								return 0;
							});
					} else {
						event.finish();
					}
					"step 2"
					if (result.targets) {
						var att = get.attitude(player, result.targets[0]);
						player.line(result.targets[0], "water");
						player.discardPlayerCard(result.targets[0], "ej", [1, event.count], function (button) {
							if (att > 0) {
								return get.type(button.link) == "delay";
							}
							return get.buttonValue(button);
						});
					} else {
						event.finish();
					}
					"step 3"
					if (result.bool) {
						event.count -= result.links.length;
					}
					if (event.count > 0) {
						event.goto(1);
					}
				},
			},
			buff: {
				mod: {
					maxHandcard: function (player, num) {
						return num + 1;
					},
				},
			},
			debuff: {
				mod: {
					maxHandcard: function (player, num) {
						return num - 1;
					},
				},
			},
		},
	},
	jlsg_zhuanshan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuEnd"] },
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt("jlsg_zhuanshan")).ai = function (target) {
				if (target == player) {
					if (target.countCards("j")) {
						if (target.countCards("j", "shandian") == 0) {
							if (event.triggername == "phaseZhunbeiBegin") {
								return 5;
							} else {
								if (jlsg.isFriend(target, target.next)) {
									return 5;
								}
								return -5;
							}
						} else {
							var bool = game.hasPlayer(function (target) {
								return target.hasSkills(jlsg.ai.skill.rejudge);
							});
							if (bool) {
								return 5;
							}
							return 0;
						}
					} else if (target.hasSkills(jlsg.ai.skill.lose_equip) && target.countCards("e")) {
						return 5;
					} else {
						return -1;
					}
				} else {
					var att = get.attitude(player, target);
					if (att > 0 && target.countCards("j")) {
						if (event.triggername == "phaseZhunbeiBegin") {
							return 6;
						} else {
							if (jlsg.isFriend(player, player.next)) {
								return 6;
							}
							return -1;
						}
					} else {
						if (target.countCards("e")) {
							return 4;
						}
						return -1;
					}
				}
			};
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_zhuanshan", event.target);
				event.target = result.targets[0];
				event.target.draw();
				player.choosePlayerCard(event.target, "hej", true);
			} else {
				event.finish();
			}
			"step 2"
			event.card = result.links[0];

			event.target.lose(result.cards, ui.cardPile, "insert");
			game.log(player, "将", get.position(event.card) == "h" ? "一张牌" : event.card, "置于牌堆顶");
			event.target.$throw(1, 1000);
		},
	},
	jlsg_zhenlie: {
		audio: "ext:极略/audio/skill:1",
		trigger: { target: "useCardToTargeted" },
		filter: function (event, player) {
			return event.player != player && event.card && (event.card.name == "sha" || get.type(event.card) == "trick");
		},
		check: function (event, player) {
			if (event.getParent().excluded.includes(player)) {
				return false;
			}
			if (get.attitude(player, event.player) > 0) {
				return false;
			}
			if (get.tag(event.card, "respondSha")) {
				if (player.countCards("h", { name: "sha" }) == 0) {
					return true;
				}
			} else if (get.tag(event.card, "respondShan")) {
				if (player.countCards("h", { name: "shan" }) == 0) {
					return true;
				}
			} else if (get.tag(event.card, "damage")) {
				if (player.countCards("h") < 2) {
					return true;
				}
			} else if (event.card.name == "shunshou" && player.hp > 2) {
				return true;
			}
			return false;
		},
		priority: 10,
		content: function () {
			"step 0"
			player.loseHp();
			"step 1"
			trigger.getParent().excluded.add(player);
			"step 2"
			if (player.countCards("he")) {
				player.chooseToDiscard("你可以弃置一张牌，令" + get.translation(trigger.player) + "展示所有手牌并弃置与之花色相同的牌", "he").set("ai", function (card) {
					if (jlsg.isFriend(player, trigger.player)) {
						return false;
					}
					if (jlsg.isWeak(player)) {
						return false;
					}
					if (jlsg.isWeak(trigger.player)) {
						return 10 - get.value(card);
					}
					return 6 - get.value(card);
				});
			} else {
				trigger.player.loseHp();
				event.finish();
			}
			"step 3"
			if (!result.bool) {
				trigger.player.loseHp();
				event.finish();
				return;
			}
			var cards = trigger.player.getCards("h", { suit: get.suit(result.cards[0]) });
			trigger.player.showHandcards();
			if (!cards.length) {
				trigger.player.loseHp();
			} else {
				trigger.player.discard(cards);
			}
		},
		ai: {
			expose: 0.3,
		},
	},
	jlsg_miji: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		filter: function (event, player, name) {
			if (name == "phaseZhunbeiBegin") {
				return player.isDamaged();
			}
			if (name == "phaseJieshuBegin") {
				return !game.hasPlayer(function (target) {
					return target.hp < player.hp;
				});
			}
		},
		frequent: true,
		content: function () {
			"step 0"
			player.chooseControl("basic", "equip", "trick").set("ai", function () {
				var basic = player.countCards("he", "basic");
				var equip = player.countCards("he", "equip");
				var trick = player.countCards("he", "trick");
				var theLess = Math.min(basic, equip, trick);
				switch (theLess) {
					case basic:
						return "basic";
					case equip:
						return "equip";
					case trick:
						return "trick";
					default: {
						if (Math.random() < 0.5) {
							return "basic";
						}
						if (Math.random() < 0.5) {
							return "equip";
						}
						if (Math.random() < 2 / 3) {
							return "trick";
						}
						return "basic";
					}
				}
			});
			"step 1"
			var card = jlsg.findCardInCardPile(function (card) {
				return get.type(card) == result.control;
			});
			if (card) {
				event.card1 = card;
				player.showCards("秘计", event.card1);
				player
					.chooseTarget("将" + get.translation(card) + "交给一名角色")
					.set(
						"ai",
						function (target) {
							var att = get.attitude(_status.event.player, target);
							if (_status.event.du) {
								return -att;
							}
							return att;
						},
						true
					)
					.set("du", card.name == "du");
			} else {
				game.log("没有找到该类型卡牌，请重新选择");
				event.cantSelect = result.control;
				event.goto(0);
			}
			"step 2"
			if (result.bool) {
				if (result.targets[0].ai.shown > player.ai.shown) {
					player.addExpose(0.2);
				}
				result.targets[0].gain(event.card1, "gain");
			}
		},
	},
	jlsg_yongji: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageSource" },
		forced: true,
		filter: function (event, player) {
			var phase = event.getParent("phaseUse");
			return event.card && event.card.name == "sha" && phase && phase.player == player;
		},
		content: function () {
			var num = Math.min(3, player.getDamagedHp());
			if (num > 0) {
				player.draw(num);
			}
			// player.getStat().card.sha--;
			if (!player.hasSkill("jlsg_yongjiBuff")) {
				player.storage.jlsg_yongjiBuff = 1;
				player.addTempSkill("jlsg_yongjiBuff"); // 'phaseUseAfter'
			} else {
				++player.storage.jlsg_yongjiBuff;
			}
		},
	},
	jlsg_yongjiBuff: {
		// audio: "ext:极略/audio/skill:1",
		// trigger:{player:'useCard1'},
		// forced:true,
		// filter:function(event,player){
		//   return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&player.storage.jlsg_yongjiBuff;
		// },
		// content:function(){
		//   trigger.audioed=true;
		// },
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha" && player.storage.jlsg_yongjiBuff) {
					return num + player.storage.jlsg_yongjiBuff;
				}
			},
		},
		charlotte: true,
		sourceSkill: "jlsg_yongji",
		onremove: true,
	},
	jlsg_wuzhi: {
		audio: "ext:极略/audio/skill:1",
		forced: true,
		priority: 2,
		trigger: { player: "phaseJieshuBegin" },
		filter: function (event, player) {
			let shaFulfilled = () => {
				var shaTemplate = { name: "sha", isCard: true };
				var num = lib.card["sha"].usable;
				if (!num) {
					return true;
				}
				num = game.checkMod(shaTemplate, player, num, "cardUsable", player);
				var numUsed = player.getHistory("useCard", event => get.name(event.card) == "sha").length;
				return !num || num <= numUsed;
			};
			return !shaFulfilled();
		},
		content: function () {
			"step 0"
			player.damage("nosource");
			"step 1"
			var card = get.cardPile2("sha");
			if (card) {
				player.gain(card, "gain2", "log");
			}
		},
	},
	// 真有你的啊 用别人的字做技能名
	jlsg_yidu: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		usable: 1,
		// frequent: true,
		filter: function (event, player) {
			var currPlayer = _status.currentPhase;
			if (!currPlayer || currPlayer == player || !currPlayer.countCards("h")) {
				return false;
			}
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length > 0;
		},
		check(event, player) {
			return true;
		},
		content: function () {
			var suits = trigger.getl(player).hs.map(card => get.suit(card));
			var num = _status.currentPhase?.countCards("h", card => suits.includes(get.suit(card)));
			player.draw(num);
		},
		ai: {
			threaten: 0.5,
			effect: {
				target: function (card, player, target, result2, islink) {
					if (_status.currentPhase == target) {
						return;
					}
					if (card.name == "guohe" || card.name == "liuxinghuoyu") {
						return 1 - 0.1 * _status.currentPhase?.countCards("h");
					}
				},
			},
			noh: true,
			skillTagFilter: function (player, tag) {
				if (tag == "noh") {
					if (_status.currentPhase == player) {
						return false;
					}
					return _status.currentPhase?.countCards("h") > 4;
				}
			},
		},
	},
	jlsg_zhubao: {
		group: "jlsg_zhubao_phase",
		audio: "ext:极略/audio/skill:1",
		direct: true,
		trigger: {
			global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter: function (event, player) {
			if (_status.currentPhase != player || !player.countCards("h")) {
				return false;
			}
			if (!player.storage.jlsg_zhubao) {
				player.storage.jlsg_zhubao = [];
			}
			return game.hasPlayer(p => {
				if (p == player) {
					return false;
				}
				if (player.storage.jlsg_zhubao.includes(p)) {
					return false;
				}
				var evt = event.getl(p);
				return evt && evt.hs && evt.hs.length > 0;
			});
		},
		content: function () {
			"step 0"
			if (!player.storage.jlsg_zhubao) {
				player.storage.jlsg_zhubao = [];
			}
			event.suitMap = [];
			game.filterPlayer(p => p != player && !player.storage.jlsg_zhubao.includes(p)).forEach(p => {
				var evt = trigger.getl(p);
				if (evt && evt.hs) {
					var suits = [...new Set(evt.hs.map(card => get.suit(card)))];
					event.suitMap.push([p, suits]);
				}
			});
			"step 1"
			if (!event.suitMap.length) {
				event.finish();
				return;
			}
			[event.target, event.suits] = event.suitMap.shift();
			event.num = player.countCards("h", card => event.suits.includes(get.suit(card)));
			if (event.num == 0) {
				event.redo();
				return;
			}
			var prompt = `###${get.prompt(event.name, event.target)}###你可以摸${get.cnNumber(event.num)}张牌`;
			player.chooseBool(prompt);
			"step 2"
			if (result.bool) {
				player.storage.jlsg_zhubao.push(event.target);
				player.logSkill(event.name, event.target);
				var num = player.countCards("h", card => event.suits.includes(get.suit(card)));
				player.draw(event.num);
			}
			event.goto(1);
		},
		contentx: function () {
			if (!player.storage.jlsg_zhubao) {
				player.storage.jlsg_zhubao = [];
			}
			var suits = [];
			game.filterPlayer(p => p != player).forEach(p => {
				var evt = trigger.getl(p);
				if (evt && evt.hs) {
					suits.addArray(evt.hs.map(card => get.suit(card)));
				}
			});
			var num = player.countCards("h", card => suits.includes(get.suit(card)));
			if (num > 10) {
				num = 10;
			}
			player.draw(num);
		},
		subSkill: {
			phase: {
				silent: true,
				forced: true,
				trigger: { player: "phaseBegin" },
				content: function () {
					player.storage.jlsg_zhubao = [];
				},
			},
		},
	},
	jlsg_buqu: {
		audio: "ext:极略/audio/skill:2",
		inherit: "buqu",
	},
	jlsg_fenji: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			global: "shaBegin",
		},
		filter: function (event, player) {
			return event.card.name == "sha";
		},
		logTarget: "target",
		check: function (event, player) {
			return get.attitude(player, event.target) > 2;
		},
		content: function () {
			"step 0"
			if (trigger.target.ai.shown > player.ai.shown) {
				player.addExpose(0.3);
			}
			player.loseHp();
			"step 1"
			trigger.target.draw(2);
		},
	},
	jlsg_jiaomei: {
		audio: "ext:极略/audio/skill:1",
		usable: 1,
		trigger: {
			player: "useCardToPlayered",
		},
		logTarget: "target",
		filter: function (event, player) {
			// if (event.target == player) return false;
			if (!player.isPhaseUsing()) {
				return false;
			}
			return get.type(event.card) == "trick" || event.card.name == "sha";
		},
		check: function (event, player) {
			if (event.card.name == "tiesuo") {
				return false;
			}
			var target = event.target;
			var effect = 0.5 * get.effect(target, { name: "tiesuo" }, player, player);
			if (player.hasSkill("jlsg_huoshui")) {
				effect += (target.isLinked() ? -0.8 : 0.8) * get.effect(target, { name: "shunshou" }, player, player);
				effect += (target.isLinked() ? 1 : 0.2) * get.damageEffect(target, player, player);
			}
			if (target.isLinked() && !target.hasSkillTag("noturn")) {
				effect += get.attitude(player, target) * (target.isTurnedOver() ? 8 : -8);
			}
			return effect > 0;
		},
		prompt2: function (event, player) {
			return `令${get.translation(event.target)}${event.target.isLinked() ? "重置并翻面" : "横置"}`;
		},
		content: function () {
			if (trigger.target.isLinked()) {
				trigger.target.link();
				trigger.target.turnOver();
			} else {
				trigger.target.link();
			}
		},
	},
	jlsg_huoshui: {
		audio: "ext:极略/audio/skill:1",
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter: function (event, player) {
			return game.hasPlayer(p => p != player && (p.isTurnedOver() || p.isLinked()));
		},
		check: function (event, player) {
			var effect = 0;
			for (var p of game.filterPlayer(p => p != player)) {
				if (p.isLinked()) {
					effect += get.effect(p, { name: "shunshou" }, player, player);
				}
				if (p.isTurnedOver()) {
					effect += get.damageEffect(p, player, player);
				}
			}
			return effect > 0;
		},
		content: function () {
			"step 0"
			event.targets = game.filterPlayer(p => p.isLinked());
			player.line(event.targets, "green");
			"step 1"
			if (event.targets.length == 0) {
				event.goto(2);
				return;
			}
			event.target = event.targets.shift();
			if (event.target.countGainableCards(player, "he") != 0) {
				player.gainPlayerCard(event.target, true);
			}
			event.redo();
			"step 2"
			event.targets = game.filterPlayer(p => p.isTurnedOver());
			player.line(event.targets, "green");
			"step 3"
			if (event.targets.length == 0) {
				event.finish();
				return;
			}
			event.target = event.targets.shift();
			event.target.damage(player);
			event.redo();
		},
	},
	jlsg_hubu: {
		audio: "ext:极略/audio/skill:1",
		trigger: { player: "damageEnd", source: "damageEnd" },
		filter: function (event) {
			return event.card && event.card.name == "sha"; // && event.notLink();
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt(event.name), function (card, player, target) {
				return player != target && player.canUse("juedou", target);
			}).ai = function (target) {
				return get.effect(target, { name: "juedou" }, player, target);
			};
			"step 1"
			if (result.bool) {
				event.target = result.targets[0];
				player.logSkill(event.name, event.target);
				event.target.judge(function (card) {
					if (get.suit(card) == "spade") {
						return 1;
					}
					return -0.5;
				}).judge2 = result => !result.bool;
			} else {
				event.finish();
			}
			"step 2"
			if (!result.bool) {
				player.useCard({ name: "juedou" }, event.target, "nowuxie");
			} else {
				event.finish();
			}
		},
	},
	jlsg_yuhua: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			maxHandcard: function (player, num) {
				if (player.storage.jlsg_yuhua) {
					return num - player.storage.jlsg_yuhua;
				}
			},
		},
		intro: {
			content: "已发动过#次",
		},
		trigger: { source: "damageBegin2", player: "damageBegin4" },
		filter: function (event, player) {
			return event.card && get.type(event.card, "trick") == "trick";
		},
		locked: false,
		check: function (event, player) {
			_status.jlsg_yuhua_judging = true;
			if (player == event.player) {
				return true;
			}
			if (get.attitude(player, event.player) > 0) {
				return true;
			}
			if (get.damageEffect(event.player, player, player, event.nature) <= 0) {
				return true;
			}
			delete _status.jlsg_yuhua_judging;
			return false;
		},
		content: function () {
			"step 0"
			trigger.cancel();
			player.draw();
			"step 1"
			player.storage.jlsg_yuhua = player.storage.jlsg_yuhua || 0;
			++player.storage.jlsg_yuhua;
			player.markSkill("jlsg_yuhua");
		},
		ai: {
			notrick: true,
			notricksource: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "notrick") {
					return true;
				}
				return !!((get.attitude(player, _status.event.player) >= 0) ^ (Math.random() > 0.8));
			},
		},
	},
	jlsg_dengxian: {
		audio: "ext:极略/audio/skill:2",
		skillAnimation: true,
		animationColor: "orange",
		unique: true,
		juexingji: true,
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter: function (event, player) {
			return player.getHandcardLimit() == 0;
		},
		content: function () {
			"step 0"
			player.awakenSkill("jlsg_dengxian");
			// player.storage.jlsg_dengxian = true;
			"step 1"
			player.addSkill("jlsg_dengxian2");
			player.markSkill("jlsg_dengxian");
			player.chooseControl("额外摸牌阶段", "额外出牌阶段", [0, 1].randomGet()).set("prompt", `###请选择一项###${lib.translate.jlsg_dengxian_info}`);
			"step 2"
			if (result.index === 0) {
				game.log(player, "选择替换为摸牌阶段");
			} else {
				game.log(player, "选择替换为出牌阶段");
			}
			player.storage.jlsg_dengxian = result.index;
		},
		intro: {
			nocount: true,
			content(content, player, skill) {
				var str = "跳过弃牌阶段";
				if (content === 0) {
					str += ",并替换为摸牌阶段";
				} else if (content === 1) {
					str += ",并替换为出牌阶段";
				}
				return str;
			},
		},
	},
	jlsg_dengxian2: {
		audio: "jlsg_dengxian",
		unique: true,
		forced: true,
		trigger: { player: "phaseDiscardBefore" },
		content: function () {
			trigger.cancel();
			var phase = ["phaseDraw", "phaseUse"][player.storage.jlsg_dengxian];
			if (!phase) {
				return;
			}
			var next = player[phase]();
			event.next.remove(next);
			trigger.getParent().next.push(next);
		},
	},
	jlsg_tiance: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content: function () {
			"step 0"
			if (event.target) {
				return;
			}
			player.chooseTarget(get.prompt2("jlsg_tiance"));
			"step 1"
			if (!event.target) {
				if (!result.bool) {
					event.finish();
					return;
				}
				event.target = result.targets[0];
				player.logSkill("jlsg_tiance", result.targets[0]);
			}
			event.target.judge();
			"step 2"
			event.result = result;
			if (!result.suit) {
				return;
			}
			player
				.chooseControl("牌堆", "弃牌堆", "角色")
				.set("ai", function () {
					return Math.floor(Math.random() * 3);
				})
				.set("prompt", `请选择${get.translation(event.target)}获得牌的区域`);
			"step 3"
			game.log(player, "选择了", result.control);
			if (result.control == "弃牌堆") {
				var validCards = Array.from(ui.discardPile.childNodes).filter(c => c.suit === event.result.suit);
				if (validCards.length) {
					var cards = validCards.randomGets(2);
					event.target.gain(cards, "gain2");
				}
			} else if (result.control == "角色") {
				var target = game.filterPlayer(p => p != event.target && p.countCards("he", c => get.suit(c) == event.result.suit)).randomGet();
				if (target) {
					var cards = target.getCards("he", c => get.suit(c) == event.result.suit).randomGets(2);
					event.target.gain(target, cards, "give");
				}
			} else {
				var validCards = Array.from(ui.cardPile.childNodes).filter(c => c.suit === event.result.suit);
				if (validCards.length) {
					var cards = validCards.randomGets(2);
					event.target.gain(cards, "gain2");
				}
			}
		},
	},
	jlsg_jiexin: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2(event.name));
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = result.targets[0];
			player.logSkill(event.name, target);
			var next = game.createEvent("jlsg_jiexin_tiance");
			next.player = player;
			next.target = target;
			next.setContent(lib.skill.jlsg_tiance.content);
			"step 2"
			if (result.color && trigger.card && result.color === get.color(trigger.card)) {
				player.chooseTarget("是否再次发动【天策】？");
			} else {
				event.finish();
			}
			"step 3"
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = result.targets[0];
			// player.logSkill(event.name, target);
			var next = game.createEvent("jlsg_jiexin_tiance");
			next.player = player;
			next.target = target;
			next.setContent(lib.skill.jlsg_tiance.content);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -2];
						}
						if (!target.hasFriend()) {
							return;
						}
						if (target.hp >= 4) {
							return [1, get.tag(card, "damage") * 1.5];
						}
						if (target.hp == 3) {
							return [1, get.tag(card, "damage") * 1];
						}
						if (target.hp == 2) {
							return [1, get.tag(card, "damage") * 0.5];
						}
					}
				},
			},
		},
	},
	jlsg_zhengnan: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget: function (card, player, target) {
			let vcard = get.autoViewAs({ name: "nanman", isCard: true, storage: { jlsg_zhengnan: true } }, []);
			return target.hasUseTarget(vcard);
		},
		async content(event, trigger, player) {
			const target = event.targets[0],
				card = get.autoViewAs({ name: "nanman", isCard: true, storage: { jlsg_zhengnan: true } }, []);
			await target.chooseUseTarget(card, true);
		},
		ai: {
			order: function (item, player) {
				return get.order({ name: "nanman" }, player) + 0.5;
			},
			result: {
				target: function (player, target) {
					return Math.sign(get.effect(target, { name: "draw" }, player, player));
				},
				player: 1,
			},
			threaten: 0.5,
		},
		group: ["jlsg_zhengnan_damage"],
		subSkill: {
			damage: {
				audio: "jlsg_zhengnan",
				forced: true,
				trigger: { global: "damageEnd" },
				filter: function (event, player) {
					return event.card && event.card.name == "nanman" && event.card.storage?.jlsg_zhengnan;
				},
				async content(event, trigger, player) {
					let drawer = [player, trigger.source].filter(p => p.isIn());
					await game.asyncDraw(drawer);
				},
			},
		},
	},
	jlsg_tongxin: {
		audio: false,
		unique: true,
		limited: true,
		enable: "chooseToUse",
		filter: function (event, player) {
			return event.type == "dying" && event.dying === player;
		},
		precontent: function () {
			var audioS = "jlsg_tongxin_";
			if ([player.name, player.name1, player.name2].includes("jlsgsk_baosanniang")) {
				audioS += "f";
			} else if ([player.name, player.name1, player.name2].includes("jlsgsk_guansuo")) {
				audioS += "m";
			} else if ("mf".includes(player.sex[0])) {
				audioS += player.sex[0];
			} else {
				audioS += ["m", "f"].randomGet();
			}
			game.trySkillAudio(audioS, player);
		},
		content: function () {
			"step 0"
			player.awakenSkill(event.name);
			"step 1"
			var num = 2 - player.hp;
			if (num > 0) {
				player.recover(num);
			}
			"step 2"
			var list = ["jlsgsk_guansuo", "jlsgsk_baosanniang"];
			var players = game.players.concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				[players[i].name, players[i].name1, players[i].name2].forEach(n => {
					if (n && n.endsWith("guansuo")) {
						list.remove("jlsgsk_guansuo");
					}
					if (n && n.endsWith("baosanniang")) {
						list.remove("jlsgsk_baosanniang");
					}
				});
			}
			if (!list.length) {
				event.finish();
				return;
			}
			player
				.chooseButton()
				.set("ai", function (button) {
					return Math.random();
				})
				.set("createDialog", ["是否替换武将牌？", [list, "character"]]);
			"step 3"
			if (result.bool) {
				var name = player.name;
				if (player.name2) {
					if (!get.character(player.name)[3].includes(event.name)) {
						if (get.character(player.name2)[3].includes(event.name)) {
							name = player.name2;
						}
					}
				}
				player.reinitCharacter(name, result.links[0]);
			}
		},
		ai: {
			skillTagFilter: function (player) {
				if (!_status.event.dying || _status.event.dying != player || player.storage.jlsg_tongxin) {
					return false;
				}
			},
			save: true,
			order: 6,
			result: {
				player: 1,
			},
		},
	},
	jlsg_tongxin_f: {
		audio: "ext:极略/audio/skill:2",
	},
	jlsg_tongxin_m: {
		audio: "ext:极略/audio/skill:2",
	},
	jlsg_jianwu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCard" },
		forced: true,
		silent: true,
		filter: function (event, player) {
			return get.type(event.card) == "basic";
		},
		content: function () {
			player.addSkill("jlsg_jianwu2");
		},
	},
	jlsg_jianwu2: {
		trigger: { player: "useCard1" },
		// audio: "jlsg_jianwu",
		direct: true,
		firstDo: true,
		charlotte: true,
		content: function () {
			player.removeSkill("jlsg_jianwu2");
			if (trigger.card.name == "sha") {
				player.logSkill("jlsg_jianwu");
			}
			if (get.type(trigger.card) != "basic") {
				player.removeSkill("jlsg_jianwu2");
			}
		},
		mod: {
			cardUsable: function (card) {
				if (card.name == "sha") {
					return Infinity;
				}
			},
			targetInRange: function (card) {
				if (card.name == "sha") {
					return true;
				}
			},
			selectTarget: function (card, player, range) {
				if (card.name != "sha") {
					return;
				}
				if (range[1] == -1) {
					return;
				}
				range[1] += 1;
			},
		},
		mark: true,
		intro: {
			content: "使用【杀】无距离和次数限制且目标上限+1",
		},
	},
	jlsg_zhennan: {
		// 镇南
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: { global: "useCardToTargeted" },
		filter: function (event, player) {
			return event.isFirstTarget && (event.card.name == "sha" || get.type(event.card) == "trick") && event.targets.length > 1;
		},
		direct: true,
		content: function () {
			"step 0"
			var targets = trigger.targets;
			var choice,
				effect = 0;
			for (target of targets) {
				var thisEffect = get.damageEffect(target, player, player);
				if (thisEffect > effect) {
					choice = target;
					effect = thisEffect;
				}
			}
			player
				.chooseTarget(get.prompt2(event.name))
				.set("filterTarget", function (card, player, target) {
					return _status.event.targets.includes(target);
				})
				.set("ai", function (target) {
					return target == _status.event.choice ? 1 : -1;
				})
				.set("targets", targets)
				.set("choice", choice);
			"step 1"
			if (result.bool) {
				player.logSkill(event.name, result.targets[0]);
				result.targets[0].damage();
			}
		},
	},
	jlsg_shemi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "chooseToDiscardBegin" },
		direct: true,
		intro: {
			content: function (content, player, skill) {
				var str = "弃牌阶段记录弃牌数：" + content;
				if (player.storage.jlsg_shemi_draw) {
					str = `摸牌阶段额外摸${get.cnNumber(player.storage.jlsg_shemi_draw)}张牌 <br>` + str;
				}
				return str;
			},
			markcount: function (storage, player) {
				return player.storage.jlsg_shemi_draw || 0;
			},
		},
		filter: function (event, player) {
			return event.getParent().name == "phaseDiscard" && event.selectCard;
		},
		content: function () {
			trigger.selectCard[1] = Infinity;
			if (player.countMark("jlsg_shemi") == trigger.selectCard[0]) {
				// buff ai
				var cards = player.getDiscardableCards(player, "h");
				if (cards.length > trigger.selectCard[0]) {
					var card = cards.map((c, i) => [trigger.ai(c), i]).sort((pair1, pair2) => pair1[0] - pair2[0])[1];
					trigger.set("card", cards[card]).set("ai", function (card) {
						return (card === _status.event.card ? 5 : 0) - get.useful(card);
					});
				}
			}
		},
		subSkill: {
			draw: {
				audio: "jlsg_shemi",
				trigger: { player: "phaseDrawBegin2" },
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return !event.numFixed && player.countMark("jlsg_shemi_draw");
				},
				content: function () {
					trigger.num += player.countMark("jlsg_shemi_draw");
				},
			},
			record: {
				// to avoid disable
				trigger: {
					player: "phaseDiscardAfter",
				},
				charlotte: true,
				silent: true,
				init: function (player) {
					player.storage["jlsg_shemi"] = 0;
				},
				content: function () {
					var cntC = 0;
					player.getHistory("lose", function (evt) {
						if (evt && evt.type == "discard" && evt.getParent("phaseDiscard") == trigger && evt.hs) {
							cntC += evt.hs.length;
						}
					});
					player.storage["jlsg_shemi"] = cntC;
					player.markSkill("jlsg_shemi");
				},
			},
			force: {
				trigger: {
					player: "phaseDiscardEnd",
				},
				firstDo: true,
				direct: true,
				filter: function (event, player) {
					return !event.cards;
				},
				content: function () {
					"step 0"
					var evt = player.chooseToDiscard([1, Infinity], `###${get.prompt(event.name)}###你可以多弃置任意张牌`);
					if (player.countMark("jlsg_shemi") == 0) {
						var cards = player.getDiscardableCards(player, "h");
						if (cards.length) {
							var card = cards.map((c, i) => [get.useful(c), i]).reduce((pair1, pair2) => (pair1[0] < pair2[0] ? pair1 : pair2))[1];
							evt.set("card", cards[card]).set("ai", function (card) {
								return (card === _status.event.card ? 5 : 0) - get.useful(card);
							});
						}
					}
					"step 1"
					if (result.bool) {
						trigger.cards = result.cards;
					}
				},
			},
		},
		group: ["jlsg_shemi2", "jlsg_shemi_draw", "jlsg_shemi_record", "jlsg_shemi_force"],
	},
	jlsg_shemi2: {
		audio: "jlsg_shemi",
		trigger: {
			player: "phaseDiscardEnd",
		},
		forced: true,
		filter: function (event, player) {
			var cntC = 0;
			player.getHistory("lose", function (evt) {
				if (evt && evt.type == "discard" && evt.getParent("phaseDiscard") == event && evt.hs) {
					cntC += evt.hs.length;
				}
			});
			return cntC > player.countMark("jlsg_shemi");
		},
		content: function () {
			player.storage.jlsg_shemi_draw = player.storage.jlsg_shemi_draw || 0;
			player.storage.jlsg_shemi_draw += 1;
			if (player.isHealthy()) {
				player.gainMaxHp();
			}
		},
		ai: {
			threaten: 1,
		},
	},
	jlsg_jiaohui: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageBegin2" },
		frequent: true,
		direct: true,
		content: function () {
			"step 0"
			if (player.countDiscardableCards(player, "he")) {
				var next = player.chooseToDiscard(`###${get.prompt(event.name)}###弃置一张牌`).set("logSkill", event.name);
				if (player.countCards("h") - 1 === player.hp) {
					next.set("ai", function (card) {
						return _status.event.gain - get.value(card);
					}).set("gain", -get.damageEffect(player, trigger.source, player, trigger.nature) / 1.5);
				}
			}
			"step 1"
			if (result.bool) {
				event.goto(3);
			} else {
				player.chooseBool("###是否摸一张牌?###" + get.skillInfoTranslation(event.name)).set("frequentSkill", event.name);
			}
			"step 2"
			if (result.bool) {
				player.logSkill(event.name);
				player.draw();
			} else {
				event.finish();
			}
			"step 3"
			if (player.countCards("h") === player.hp) {
				--trigger.num;
			}
		},
		ai: {
			maixie: true,
			maixie_defend: true,
		},
	},
	jlsg_wengua: {
		global: "jlsg_wengua2",
		audio: "ext:极略/audio/skill:2",
	},
	jlsg_wengua2: {
		sub: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter: function (event, player) {
			return game.hasPlayer(c => c.hasSkill("jlsg_wengua"));
		},
		unique: true,
		direct: true,
		content: function () {
			"step 0"
			var list = game.filterPlayer(function (current) {
				return current.hasSkill("jlsg_wengua");
			});
			if (list.length == 1 && list[0] == player) {
				event.target = player;
				event.goto(2);
				return;
			}
			player.chooseCardTarget({
				prompt2: "交给" + get.translation(list) + "一张牌",
				prompt: get.prompt(event.name),
				filterCard: true,
				position: "he",
				filterTarget: function (card, player, target) {
					return _status.event.list.includes(target);
				},
				list: list,
				selectTarget: list.length > 1 ? 1 : -1,
				goon: (function () {
					for (var i of list) {
						if (get.attitude(player, i) > 0) {
							return 1;
						}
						return -1;
					}
				})(),
				ai1: function (card) {
					if (_status.event.goon > 0) {
						return 7 - get.value(card);
					}
					return 0.01 - get.value(card);
				},
				ai2: function (target) {
					var card = ui.selected.cards[0];
					var black = get.color(card) == "black" ? 3 : 0;
					if (!target.hasSkill("jlsg_fuzhu")) {
						black = 0;
					}
					return (black + get.value(card, target)) * get.attitude(_status.event.player, target);
				},
			});
			"step 1"
			if (result.bool && result.cards.length && result.targets.length) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill("jlsg_wengua", target);
				player.line(target, "green");
				target.gain(result.cards, player, "giveAuto");
			} else {
				event.finish();
			}
			"step 2"
			var prompt2 = `将一张牌置于牌堆底，然后${event.target == player ? "" : `和${get.translation(player)}`}摸一张牌`;
			event.target
				.chooseCard(`###${get.prompt("jlsg_wengua")}###${prompt2}`, "he")
				.set("ai", function (card) {
					var value = -get.value(card);
					if (get.attitude(_status.event.player, _status.event.target) > 0) {
						value += 8;
					}
					if (_status.event.player.hasSkill("jlsg_fuzhu")) {
						value += get.color(card) == "black" ? 3 : -1;
					}
				})
				.set("target", player);
			"step 3"
			if (result.bool) {
				if (player == event.target) {
					player.logSkill("jlsg_wengua");
				}
				var next = event.target.lose(result.cards, ui.cardPile);
				game.log(event.target, "将一张牌置于牌堆底");
				game.broadcastAll(function (player) {
					var cardx = ui.create.card();
					cardx.classList.add("infohidden");
					cardx.classList.add("infoflip");
					player.$throw(cardx, 1000, "nobroadcast");
				}, event.target);
			} else {
				event.finish();
			}
			"step 4"
			game.delayx();
			"step 5"
			if (player == event.target) {
				player.draw();
			} else {
				game.asyncDraw([player, target], null, null);
			}
		},
	},
	jlsg_fuzhu: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "wood",
		filterTarget: function (card, player, target) {
			return player != target;
		},
		content: function () {
			"step 0"
			player.awakenSkill(event.name);
			"step 1"
			if (!ui.cardPile.lastChild || !target.isIn()) {
				event.finish();
				return;
			}
			player.showCards(ui.cardPile.lastChild);
			"step 2"
			var card = ui.cardPile.lastChild;
			if (get.color(card) == "black") {
				card.remove();
				game.updateRoundNumber();
				player.useCard(
					{
						name: "sha",
						cards: [card],
					},
					target,
					false
				);
				event.goto(1);
			}
		},
		result: {
			target: function (player, target) {
				return -game.roundNumber;
			},
		},
	},
	jlsg_yinyuan: {
		audio: "ext:极略/audio/skill:2",
		init: function (player) {
			player.storage.jlsg_yinyuan = [];
		},
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		intro: {
			content: "已对$发动过【姻缘】",
		},
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2(event.name)).set("ai", function (player) {
				var eff = get.attitude(_status.event.player, player);
				if (_status.event.player.storage.jlsg_yinyuan && _status.event.player.storage.jlsg_yinyuan.includes(player)) {
					return eff;
				}
				return eff + get.attitude(_status.event.player, _status.event.player);
			});
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill(event.name, result.targets);
			event.target = result.targets[0];
			var card = get.cardPile2(c => c.suit == "heart");
			if (card) {
				event.target.gain(card, "gain2");
			}
			if (player.storage[event.name].includes(event.target)) {
				event.finish();
			} else {
				player.markAuto(event.name, [event.target]);
			}
			"step 2"
			var card = get.cardPile2(c => c.suit == "heart");
			if (card) {
				player.gain(card, "gain2");
			}
		},
	},
	jlsg_konghou: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCard" },
		direct: true,
		preHidden: true,
		filter: function (event, player) {
			if (event.all_excluded || event.player == player || !event.player.isPhaseUsing() || !player.countCards("he")) {
				return false;
			}
			var evt = event.getParent("phaseUse");
			if (evt.name != "phaseUse") {
				return false;
			}
			var uses = event.player.getHistory("useCard", e => e.getParent("phaseUse") == evt);
			return (uses[0] == event && get.type(event.card) == "trick") || (uses[1] == event && get.type(event.card) == "basic");
		},
		content: function () {
			"step 0"
			var prompt = `###${get.prompt(event.name, trigger.player)}###弃置一张牌，令${get.translation(trigger.card)}无效`;
			player
				.chooseToDiscard(prompt, "he")
				.set("ai", function (card) {
					return _status.event.goon / 1.4 - get.value(card);
				})
				.set(
					"goon",
					(function () {
						if (!trigger.targets.length) {
							return -get.attitude(player, trigger.player);
						}
						var num = 0;
						for (var i of trigger.targets) {
							num -= get.effect(i, trigger.card, trigger.player, player);
						}
						return num;
					})()
				)
				.setHiddenSkill(event.name).logSkill = [event.name, trigger.player];
			"step 1"
			if (result.bool) {
				trigger.cancel();
			}
		},
	},
	jlsg_zhidi: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			content(storage, player, skill) {
				return (
					"已经获得效果: " +
					storage
						.sort()
						.map(i => get.cnNumber(i, true))
						.join("、")
				);
			},
			markcount(storage, player, skill) {
				return storage.length;
			},
		},
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return ["1", "2", "3", "4"].some(i => !player.hasStorage("jlsg_zhidi", i));
		},
		forced: true,
		async content(event, trigger, player) {
			const storage = player.getStorage(event.name),
				candidates = ["1", "2", "3", "4"].filter(i => !storage.includes(i));
			const candidate = candidates.randomGet();
			storage.add(candidate);
			player.setStorage(event.name, storage, true);
			game.log(player, `获得了〖制敌〗效果${get.cnNumber(candidate, true)}`);
			player.addSkill(`${event.name}_buff`);
		},
		subSkill: {
			buff: {
				sub: true,
				sourceSkill: "jlsg_zhidi",
				audio: "jlsg_zhidi",
				mod: {
					targetInRange(card, player) {
						if (card.name == "sha" && player.hasStorage("jlsg_zhidi", "3")) {
							return true;
						}
					},
					cardUsable(card, player, num) {
						if (card.name == "sha" && player.hasStorage("jlsg_zhidi", "3")) {
							return num + player.getStorage("jlsg_zhidi").length;
						}
					},
					selectTarget(card, player, range) {
						if (!player.hasStorage("jlsg_zhidi", "4")) {
							return;
						}
						if (card?.name != "sha" || range[1] == -1) {
							return;
						}
						range[1] += player.getStorage("jlsg_zhidi").length;
					},
				},
				trigger: {
					player: "useCard",
					source: "damageSource",
				},
				filter(event, player) {
					if (event.card?.name != "sha") {
						return false;
					}
					if (event.name == "damage") {
						return player.hasStorage("jlsg_zhidi", "1");
					}
					return player.hasStorage("jlsg_zhidi", "2");
				},
				forced: true,
				async content(event, trigger, player) {
					if (trigger.name == "damage") {
						await player.draw();
					} else {
						trigger.directHit.addArray(game.players);
					}
				},
				ai: {
					unequip: true,
					unequip_ai: true,
					directHit_ai: true,
					skillTagFilter: function (player, tag, arg) {
						if (!player.hasStorage("jlsg_zhidi", "2")) {
							return false;
						}
						return arg?.card?.name == "sha";
					},
				},
			},
		},
	},
	jlsg_jijun: {
		audio: "ext:极略/audio/skill:2",
		onremove(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		marktext: "军",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		enable: "phaseUse",
		usable: 1,
		selectCard: [1, 4],
		complexCard: true,
		filterCard(card, player) {
			let suit = get.suit(card);
			for (var i = 0; i < ui.selected.cards.length; i++) {
				if (get.suit(ui.selected.cards[i]) == suit) {
					return false;
				}
			}
			return true;
		},
		check(card) {
			const player = get.player();
			const cards = player.getExpansions("jlsg_jijun").filter(c => c.suit == get.suit(card, player));
			if (cards.length != 0 && cards[0].number > get.number(card, player)) {
				return -1;
			}
			return get.number(card, player) - get.value(card) + 1;
		},
		discard: false,
		lose: false,
		async content(event, trigger, player) {
			const { cards } = event,
				suits = cards.map(card => get.suit(card)).unique(),
				gainCards = player.getExpansions(event.name).filter(c => suits.includes(c.suit));
			const next = player.addToExpansion(player, cards, "give");
			next.gaintag.add(event.name);
			await next;
			if (gainCards.length) {
				await player.gain(gainCards, "gain2");
			}
			const vcards = get.inpileVCardList(info => info[0] == "basic");
			if (vcards?.length) {
				const { result } = await player
					.chooseButton(["集军", [vcards, "vcard"]])
					.set("filterButton", ({ link: [_, __, name, nature] }, player) => {
						const card = get.autoViewAs({ name, nature }, []);
						return player.hasUseTarget(card, false, false);
					})
					.set("ai", ({ link: [_, __, name, nature] }) => {
						const card = get.autoViewAs({ name, nature }, []);
						return get.player().getUseValue(card, false, false);
					});
				if (result?.bool) {
					const card = { name: result.links[0][2], nature: result.links[0][3], isCard: true };
					await player.chooseUseTarget(card, true, false, "nodistance");
				}
			}
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},
	jlsg_fangtong: {
		audio: "ext:极略/audio/skill:2",
		derivation: ["leiji", "jlsg_zhoufu", "jlsg_shendao", "jlsgsy_biantian"],
		trigger: {
			player: ["addToExpansionAfter", "gainAfter", "phaseJieshuBegin"],
		},
		filter(event, player) {
			let list = lib.skill.jlsg_fangtong.getValid(player);
			if (event.name == "phaseJieshu") {
				return player.countCards("h") < list.length;
			} else if (event.name == "addToExpansion") {
				if (!event.gaintag.includes("jlsg_jijun")) {
					return false;
				}
			} else {
				let evt = event.getl(player);
				if (!evt?.xs?.length) {
					return false;
				}
			}
			let currentList = player.additionalSkills.jlsg_fangtong || [];
			return currentList.length != list.length;
		},
		forced: true,
		async content(event, trigger, player) {
			let list = lib.skill.jlsg_fangtong.getValid(player);
			if (trigger.name == "phaseJieshu") {
				await player.drawTo(list.length);
			} else {
				player.removeAdditionalSkill(event.name);
				if (list.length) {
					player.addAdditionalSkill(event.name, list);
				}
			}
		},
		getValid(player) {
			let cnt = player.getExpansions("jlsg_jijun").reduce((a, b) => a + b.number, 0),
				list = this.derivation;
			return list.slice(0, Math.min(4, Math.floor(cnt / 9)));
		},
		ai: {
			result: {
				player: 1,
			},
			combo: "jlsg_jijun",
		},
	},
	jlsg_jinzhi: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			content: function (storage, player, skill) {
				if (!storage?.length) {
					return "";
				}
				return "本轮使用了" + storage.reduce((a, b) => a + " " + get.translation(b), "");
			},
		},
		enable: "chooseToUse",
		hiddenCard: function (player, name) {
			if (["basic", "trick"].includes(get.type(name)) && lib.inpile.includes(name) && player.countCards("h") && !player.getStorage("jlsg_jinzhi").includes(name) && player.getStorage("jlsg_jinzhi").length < 4) {
				return true;
			}
		},
		filter: function (event, player) {
			let hs = player.getCards("h"),
				storage = player.getStorage("jlsg_jinzhi");
			if (!hs.length || storage.length >= 4) {
				return false;
			}
			for (let i of lib.inpile) {
				if (storage.includes(i)) {
					continue;
				}
				let type = get.type2(i);
				if (type != "basic" && type != "trick") {
					continue;
				}
				let cardx = get.autoViewAs({ name: i }, hs);
				if (event.filterCard && typeof event.filterCard == "function") {
					if (event.filterCard(cardx, player, event)) {
						return true;
					}
				}
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				let hs = player.getCards("h"),
					list = [];
				for (let i = 0; i < lib.inpile.length; i++) {
					let name = lib.inpile[i];
					if (player.getStorage("jlsg_jinzhi").includes(name)) {
						continue;
					}
					let cardx = get.autoViewAs({ name: name }, hs);
					if (name == "sha") {
						if (event.filterCard(cardx, player, event)) {
							list.push(["基本", "", "sha"]);
						}
						for (var j of lib.inpile_nature) {
							cardx = get.autoViewAs({ name: "sha", nature: j }, hs);
							if (event.filterCard(cardx, player, event)) {
								list.push(["基本", "", "sha", j]);
							}
						}
					} else if (get.type(name) == "trick" && event.filterCard(cardx, player, event)) {
						list.push(["锦囊", "", name]);
					} else if (get.type(name) == "basic" && event.filterCard(cardx, player, event)) {
						list.push(["基本", "", name]);
					}
				}
				return ui.create.dialog("锦织", [list, "vcard"]);
			},
			filter: function (button, player) {
				return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
			},
			check: function (button) {
				var player = _status.event.player;
				var storage = player.getStorage("jlsg_jinzhi");
				if (player.countCards("h", button.link[2]) > 0 && storage.length < player.countCards("h")) {
					return 0;
				}
				if (["wugu", "zhulu_card"].includes(button.link[2])) {
					return 0;
				}
				var effect = player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
				if (get.tag({ name: button.link[2] }, "draw")) {
					effect += 2;
				}
				return effect;
			},
			backup: function (links, player) {
				return {
					filterCard: true,
					audio: "jlsg_jinzhi",
					popname: true,
					check: () => 1,
					selectCard: -1,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						cards: player.getCards("h"),
					},
					onuse: function (result, player) {
						result.cards = player.getCards("h");
						result.card.cards = player.getCards("h");
						player.addTempSkill("jlsg_jinzhi2", "roundStart");
						player.markAuto("jlsg_jinzhi", [result.card.name]);
					},
				};
			},
			prompt: function (links, player) {
				var card = get.translation({ name: links[0][2], nature: links[0][3] });
				var str = "将所有手牌当做" + card + "使用";
				if (player.getStorage("jlsg_jinzhi").length) {
					str += `,然后摸${get.cnNumber(player.getStorage("jlsg_jinzhi").length)}张牌`;
				}
			},
		},
		ai: {
			order: 0.5,
			respondShan: true,
			respondSha: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.name && player.getStorage("jlsg_jinzhi").includes(arg.name)) {
					return false;
				}
				return player.countCards("h") && player.getStorage("jlsg_jinzhi").length < 4;
			},
			result: {
				player: function (player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
	},
	jlsg_jinzhi2: {
		sourceSkill: "jlsg_jinzhi",
		onremove: ["jlsg_jinzhi"],
		trigger: { player: ["useCardAfter", "respondAfter"] },
		forced: true,
		charlotte: true,
		popup: false,
		filter: function (event, player) {
			return event.skill == "jlsg_jinzhi_backup";
		},
		content: function () {
			var index = player.storage.jlsg_jinzhi?.length || 0;
			if (index > 0) {
				player.draw(index);
			}
		},
	},
	jlsg_yuyou: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "gainAfter",
			global: "loseAsyncAfter",
		},
		forced: true,
		filter(event, player) {
			if (!event.getg?.(player)) {
				return false;
			}
			const cards = event.getg(player);
			return get.itemtype(cards) == "cards" && cards.length > 1;
		},
		async content(event, trigger, player) {
			const cards = trigger.getg(player).slice();
			const { result: chooseCard } = await player
				.chooseCard("鱼忧：选择一张牌保留", true)
				.set("filterCard", (card, player) => get.event("cardx")?.includes(card))
				.set("ai", card => get.useful(card, get.player()))
				.set("cardx", cards);
			if (chooseCard.bool) {
				cards.remove(chooseCard.cards[0]);
				await player.discard(cards);
			}
			if (!cards.length || !game.hasPlayer(p => p.hasSex("male"))) {
				return;
			}
			const { result: chooseTarget } = await player
				.chooseTarget(`###${get.prompt(event.name)}###令一名男性角色弃置牌或失去体力`)
				.set("filterTarget", (_, player, target) => target.hasSex("male"))
				.set("ai", target => {
					const player = get.player();
					return get.effect(target, { name: "losehp" }, player, player) + get.effect(target, { name: "guohe_copy2" }, player, player);
				});
			if (!chooseTarget.bool || !chooseTarget.targets) {
				return;
			}
			const {
				targets: [target],
			} = chooseTarget;
			player.line(target);
			if (!["nei", "rYe", "bYe"].includes(player.identity) && target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			const { result } = await target
				.chooseToDiscard("he", `弃置${get.cnNumber(cards.length)}张牌，或者失去1点体力`, [cards.length, cards.length])
				.set("eff", (lib.jlsg.getLoseHpEffect(target) * 3) / cards.length)
				.set("ai", c => get.unuseful(c) - _status.event.eff);
			if (!result.bool) {
				await target.loseHp(1);
			}
		},
	},
	jlsg_huituo: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseZhunbeiBegin"] },
		init: function (player) {
			player.storage.jlsg_huituo = Array.from({ length: 4 }, () => true);
		},
		filter: function (event, player) {
			return player.storage.jlsg_huituo?.some(i => i === true);
		},
		async cost(event, trigger, player) {
			let choiceList = [`令一名角色回复体力至全场唯一最多`, `令一名角色摸牌至全场唯一最多`, `选择一名角色，系统为该角色的每个空装备栏选择一张装备牌，然后该角色使用之`, `令其他一名角色获得技能〖恢拓〗`];
			if (game.filterPlayer().every(current => current.hasSkill("jlsg_huituo", null, false, false))) {
				choiceList = choiceList.slice(0, -1);
			}
			let list = choiceList.filter((v, i) => player.storage.jlsg_huituo[i]);
			if (!list.length) {
				return;
			}
			let choiseTarget,
				target1,
				eff = [null, 0];
			for (let i of list) {
				switch (choiceList.indexOf(i)) {
					case 0:
						target1 = game.findPlayer(current => current.isMaxHp());
						for (let current of game.filterPlayer()) {
							if (current.hp == target1.hp) {
								continue;
							}
							let currentEff = get.recoverEffect(current, player, player);
							if (currentEff > eff[1]) {
								choiseTarget = current;
								eff = [0, currentEff];
							}
						}
						break;
					case 1:
						target1 = game.findPlayer(current => current.isMaxHandcard());
						for (let current of game.filterPlayer()) {
							if (current.countCards("h") == target1.countCards("h")) {
								continue;
							}
							let currentEff = get.effect(current, { name: "draw" }, player, player);
							if (currentEff > eff[1]) {
								choiseTarget = current;
								eff = [1, currentEff];
							}
						}
						break;
					case 2:
						for (let current of game.filterPlayer()) {
							const emptySlots = Array.from({ length: 5 }, (v, i) => i + 1).reduce((sum, type) => sum + current.countEmptySlot(type), 0);
							if (emptySlots == 0) {
								continue;
							}
							let currentEff = get.attitude(player, current) * emptySlots;
							if (currentEff > eff[1]) {
								choiseTarget = current;
								eff = [2, currentEff];
							}
						}
						break;
					case 3:
						for (let current of game.filterPlayer()) {
							if (current.hasSkill("jlsg_huituo", null, false, false)) {
								continue;
							}
							let currentEff = get.attitude(player, current) > 1 ? get.attitude(player, current) * 3 : 0;
							if (currentEff > eff[1]) {
								choiseTarget = current;
								eff = [3, currentEff];
							}
						}
						break;
				}
			}
			const { result: result1 } = await player
				.chooseTarget(get.prompt("jlsg_huituo"))
				.set("prompt2", list.map((v, i) => `${i + 1}.${v}`).join("<br>"))
				.set("filterTarget", (_, player, target) => {
					const choice = get.event("choice");
					if (choice.length == 1 && choice[0].includes("恢拓")) {
						return !target.hasSkill("jlsg_huituo", null, false, false);
					}
					return true;
				})
				.set("ai", target => target == get.event("choiseTarget"))
				.set("choice", list)
				.set("choiseTarget", choiseTarget);
			if (!result1?.bool || !result1?.targets?.length) {
				return;
			}
			const {
					targets: [target],
				} = result1,
				[choice] = eff;
			choiceList = [`令${get.translation(target)}回复体力至全场唯一最多`, `令${get.translation(target)}摸牌至全场唯一最多`, `系统为${get.translation(target)}的每个空装备栏选择一张装备牌，然后其使用之`, `令${get.translation(target)}获得技能〖恢拓〗`];
			if (target.hasSkill("jlsg_huituo", null, false, false)) {
				choiceList = choiceList.slice(0, -1);
			}
			list = choiceList.filter((v, i) => player.storage.jlsg_huituo[i]);
			const { result: result2 } = await player
				.chooseControlList(list, true)
				.set("ai", () => get.event("choice") || Math.floor(get.event().getRand() * get.event().controls.length + 1))
				.set(
					"choice",
					(function () {
						const num = list.indexOf(choiceList[choice]);
						return num > -1 ? num : undefined;
					})()
				);
			const num = choiceList.indexOf(list[result2?.index]);
			event.result = {
				bool: num > -1,
				targets: result1.targets,
				cost_data: { choice: num },
			};
		},
		async content(event, trigger, player) {
			const {
				cost_data: { choice },
				targets: [target],
			} = event;
			player.storage.jlsg_huituo[choice] = false;
			switch (choice) {
				case 0:
					await target.recoverTo(game.findPlayer(current => current.isMaxHp())?.hp + 1);
					break;
				case 1:
					await target.drawTo(game.findPlayer(current => current.isMaxHandcard())?.countCards("h") + 1);
					break;
				case 2: {
					let num = 0;
					while (num < 5) {
						num++;
						if (!target.hasEmptySlot(num)) {
							continue;
						}
						const card = get.cardPile(function (card) {
							return get.subtype(card) == "equip" + num && target.canUse(card, target);
						});
						if (card) {
							await target.chooseUseTarget(card, true, "nopopup");
						}
					}
					break;
				}
				case 3:
					await target.addSkills("jlsg_huituo");
					break;
			}
		},
	},
	jlsg_xingshuai: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2(event.name), lib.filter.notMe).set("ai", function (target) {
				var player = _status.event.player;
				if (get.attitude(player, target) > 0) {
					return 5 + (target.isTurnedOver() ? 1 : 0);
				} else {
					return 3 + (target.isTurnedOver() ? -4 : 0);
				}
			});
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill(event.name, result.targets);
			var target = result.targets[0];
			event.target = target;
			var choice;
			if (get.attitude(target, player) >= 0) {
				choice = target.isTurnedOver() && _status.currentPhase != target;
			} else {
				choice = target.isTurnedOver() || _status.currentPhase == target || Math.random() < 0.3;
			}
			target.chooseBool(`###是否翻面？###否则${get.translation(player)}在此回合结束后进行一个额外的回合`, choice);
			"step 2"
			if (result.bool) {
				if (!target.isTurnedOver() && target.ai.shown > player.ai.shown) {
					target.addExpose(0.3);
				}
				target.turnOver();
			} else {
				player.insertPhase();
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	jlsg_zhanjue: {
		audio: "ext:极略/audio/skill:2",
		group: ["zhanjue", "zhanjue4"],
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		direct: true,
		filter: function (event, player) {
			var evt = event.getl(player);
			if (!evt || evt.player != player) {
				return false;
			}
			if (evt.hs && evt.hs.length > 0 && !player.countCards("h")) {
				return true;
			}
			if (evt.es && evt.es.length > 0) {
				return !player.countCards("e") || (event.name == "equip" && !player.countCards("e", c => c != event.card));
			}
			if (evt.js && evt.js.length > 0 && !player.countCards("j")) {
				return true;
			}
			return false;
		},
		content: function () {
			"step 0"
			player.chooseTarget(`###${get.prompt(event.name)}###对一名角色造成1点伤害`).set("ai", function (target) {
				return get.damageEffect(target, _status.event.player, _status.event.player);
			});
			"step 1"
			if (result.bool) {
				player.logSkill(event.name, result.targets);
				result.targets[0].damage();
			}
		},
	},
	jlsg_yanzhu: {
		audio: "ext:极略/audio/skill:2",
		usable: 3,
		enable: "phaseUse",
		filterTarget: true,
		intro: {
			content: "mark",
			name2: "宴诛",
		},
		content: function () {
			"step 0"
			target.addMark(event.name);
			var cnt1 = target.countMark(event.name);
			var cnt2 = game.countPlayer(p => p.countMark(event.name) == cnt1);
			switch (cnt1) {
				case 1:
					target.draw(player, cnt2);
					break;
				case 2:
					target.chooseToDiscard(cnt2, "he", true);
					break;
				case 3:
					target.damage(cnt2);
					break;
			}
		},
		ai: {
			order: 4,
			result: {
				target: function (player, target) {
					var cnt = target.countMark("jlsg_yanzhu");
					switch (cnt) {
						case 0:
							return 0.8 + 0.4 * Math.random();
						case 1:
							return -1.2 + 0.4 * Math.random();
						case 2:
							return -2.2 + 0.4 * Math.random();
					}
				},
				player: function (player, target) {
					return 2.5;
				},
			},
		},
	},
	jlsg_xingxue: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "phaseJieshuBegin",
		},
		direct: true,
		content: function () {
			"step 0"
			player.chooseTarget(get.prompt2(event.name)).set("ai", function (target) {
				var player = _status.event.player;
				return get.attitude(player, target) * (Math.min(target.maxHp, target.countCards("h") + target.countMark("jlsg_yanzhu")) - target.countCards("h")) + get.attitude(player, player) * Math.max(0, target.countCards("h") + target.countMark("jlsg_yanzhu") - target.maxHp);
			});
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill(event.name, result.targets);
			var target = result.targets[0];
			event.target = target;
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.1);
			}
			target.draw(player, target.countMark("jlsg_yanzhu"));
			"step 2"
			if (target.countCards("h") > target.maxHp) {
				if (target == player) {
					event.goto(4);
					return;
				}
				target
					.chooseCard(`请选择手牌交给${get.translation(player)}`, target.countCards("h") - target.maxHp, true)
					.set("ai", function (card) {
						var player = _status.event.player,
							target = _status.event.target;
						return -get.value(card, player) * get.attitude(player, player) + get.value(card, target) * get.attitude(player, target);
					})
					.set("target", player);
			} else {
				target.removeMark("jlsg_yanzhu", Infinity);
				event.finish();
			}
			"step 3"
			if (result.bool) {
				player.gain(target, result.cards, "giveAuto");
			}
			"step 4"
			target.removeMark("jlsg_yanzhu", Infinity);
		},
	},
	jlsg_taoluan: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "useCardToPlayered",
		},
		init: function (player) {
			player.storage.jlsg_taoluan2 = [];
		},
		filter: function (event, player) {
			if (!event.isFirstTarget) {
				return false;
			}
			if (game.countPlayer(p => p.isDying())) {
				return false;
			}
			var type = get.type(event.card);
			if (!["basic", "trick"].includes(type)) {
				return false;
			}
			if (lib.card[event.card.name].notarget) {
				return false;
			}
			if (!player.countDiscardableCards(player, "he")) {
				return false;
			}
			return lib.skill.jlsg_taoluan.getPile(player, type).filter(c => c != event.card.name).length != 0;
		},
		direct: true,
		content: function () {
			"step 0"
			var maxEffect = -Infinity,
				maxCardName = null;
			{
				var type = get.type(trigger.card);
				for (let cardName of lib.skill.jlsg_taoluan.getPile(player, type)) {
					let card = { ...trigger.card, name: cardName };
					let effect = 0;
					for (let t of trigger.targets) {
						// ai is so stupid
						if (t == trigger.player && cardName == "shunshou") {
							continue;
						}
						if (t.isHealthy() && cardName == "tao") {
							continue;
						}
						effect += get.effect(t, card, trigger.player, player);
					}
					if (effect > maxEffect) {
						maxEffect = effect;
						maxCardName = cardName;
					}
				}
				for (let t of trigger.targets) {
					maxEffect -= get.effect(t, trigger.card, trigger.player, player);
				}
				if (maxCardName === trigger.card.name) {
					maxCardName = null;
					maxEffect = -Infinity;
				}
			}
			var prompt = `###${get.prompt(event.name, trigger.player)}###${get.translation(trigger.player)}对${trigger.targets.map(p => get.translation(p)).join("、")}使用了${lib.translate[trigger.card.name]}`;
			player
				.chooseToDiscard("he", get.prompt2(event.name, trigger.player))
				.set("ai", function (card) {
					return _status.event.effect - get.value(card) * 2 - 2;
				})
				.set("effect", maxEffect)
				.set("logSkill", [event.name, trigger.player]);
			event.maxCardName = maxCardName;
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			for (let p of trigger.targets) {
				if (p.ai.shown > player.ai.shown) {
					player.addExpose(0.15);
				}
			}
			var type = get.type2(trigger.card);
			var dialog = lib.skill.jlsg_taoluan.getPile(player, type).filter(c => c != trigger.card.name);
			dialog = dialog.map(i => [type, "", i]);
			player
				.chooseButton(["滔乱", [dialog, "vcard"]], true)
				.set("ai", function (button) {
					return button.link[2] == _status.event.choice;
				})
				.set("choice", event.maxCardName);
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			var name = result.links[0][2];
			player.popup(name);
			game.log(player, "将", trigger.card, "改为", { ...trigger.card, name });
			trigger.card.name = name;
			trigger.effectCount = get.info(trigger.card, false).effectCount || 1;
			trigger.excluded = [];
			trigger.directHit = [];
			trigger.card.storage = {};
			trigger.baseDamage = 1;
			trigger.extraDamage = 0;
			player.addTempSkill("jlsg_taoluan2", "roundStart");
			player.markAuto("jlsg_taoluan2", [name]);
		},
		getPile(player, type) {
			return lib.inpile.filter(c => type == get.type(c) && !lib.card[c].complexSelect && !lib.card[c].notarget && lib.card[c].content && !player.getStorage("jlsg_taoluan2").includes(c));
		},
	},
	jlsg_taoluan2: {
		onremove: true,
		intro: {
			content: function (storage, player, skill) {
				return "本轮声明了" + storage.reduce((a, b) => a + " " + get.translation(b), "");
			},
		},
	},
	jlsg_shiqiao: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseEnd" },
		filter(event, player) {
			if (!ui.discardPile.childNodes.length) {
				return false;
			}
			return event.player.hasHistory("useCard", evt => evt.card.name == "sha");
		},
		frequent: true,
		async content(event, trigger, player) {
			let cnt = trigger.player.getHistory("useCard", e => e.card.name == "sha").length;
			let cards = Array.from(ui.discardPile.childNodes).randomGets(cnt);
			await player.gain(cards, "gain2");
		},
		ai: {
			threaten: 0.2,
		},
	},
	jlsg_yingge: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			return player.countCards("h");
		},
		async cost(event, trigger, player) {
			const target = trigger.player;
			const num = target.getCardUsable("sha"),
				hs = player.getDiscardableCards(player, "h"),
				att = get.attitude(player, target) / get.attitude(player, player);
			const valueMap = hs.reduce((list, card) => {
				const number = get.number(card);
				let shaCount = (target.countCards("h") * (14 - number)) / 13;
				if (target == player || player.hasSkillTag("viewHandcard", null, target, true)) {
					shaCount = target.countCards("h", c => get.number(c) >= number);
				}
				if (shaCount > number + num) {
					shaCount = number + num;
				}
				let disCount = target.countCards("h") - shaCount;
				let disValue = ((-disCount * att) / 3) * 2;
				if (disCount > target.getHandcardLimit()) {
					disValue += ((-(disCount - target.getHandcardLimit()) * att) / 3) * 2;
				}
				let shaValue = (1 / 3 + att) * shaCount;
				list[number] = disValue + shaValue;
				return list;
			}, {});
			event.result = await player
				.chooseToDiscard(get.prompt2("jlsg_yingge", target))
				.set("ai", function (card) {
					const { player, target, valueMap } = get.event();
					let att = get.attitude(player, target);
					//防止忠臣开局丢主公但主公不知道打谁浪费一张牌，不过这样好像算透（
					if (!game.players.some(current => get.attitude(target, current) < 0) && att > 0) {
						return 0;
					}
					if (att < 0) {
						if (card.number == 13) {
							return 114514;
						}
						if (target.countCards("h") >= card.number * 10) {
							return 13 - card.number;
						}
					}
					return -get.value(card) / 2 + valueMap[card.number];
				})
				.set("chooseonly", true)
				.set("logSkill", ["jlsg_yingge", target])
				.set("target", target)
				.set("valueMap", valueMap)
				.forResult();
		},
		popup: false,
		async content(event, trigger, player) {
			await player.discard(event.cards);
			trigger.player.storage.jlsg_yingge_buff = event.cards[0].number;
			trigger.player.addTempSkill("jlsg_yingge_buff", "phaseUseAfter");
		},
		subSkill: {
			buff: {
				sub: true,
				sourceSkill: "jlsg_yingge",
				charlotte: true,
				onremove: true,
				mark: true,
				intro: {
					name: "莺歌",
					content(event, player) {
						return `圣数：<b>${Number(player.storage.jlsg_yingge_buff)}`;
					},
				},
				mod: {
					cardEnabled(card, player) {
						let number = get.number(card, player);
						if (!number || typeof number != "number") {
							return;
						}
						if (get.is.virtualCard(card) || get.is.convertedCard(card)) {
							return;
						}
						if (number < Number(player.storage.jlsg_yingge_buff)) {
							return false;
						}
					},
					cardSavable() {
						return lib.skill.jlsg_yingge_buff.mod.cardEnabled.apply(this, arguments);
					},
					cardname(card, player, name) {
						if (name == "sha") {
							return;
						}
						let number = get.number(card, player);
						if (!number || typeof number != "number") {
							return;
						}
						if (number >= Number(player.storage.jlsg_yingge_buff)) {
							return "sha";
						}
					},
					cardUsable(card, player, num) {
						if (get.name(card, player) == "sha") {
							return num + Number(player.storage.jlsg_yingge_buff);
						}
					},
					attackRange(player, num) {
						return num + Number(player.storage.jlsg_yingge_buff);
					},
				},
			},
		},
		ai: {
			expose: 0.1,
			threaten: 0.4,
		},
	},
	jlsg_kuangbi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCard2" },
		filter: function (event, player) {
			if (player.hasSkill("jlsg_kuangbi_used")) {
				return false;
			}
			var type = get.type(event.card);
			if (!["basic", "trick"].includes(type)) {
				return false;
			}
			var info = get.info(event.card);
			if (info.allowMultiple == false || info.notarget) {
				return false;
			}
			if (info.filterAddedTarget) {
				return false;
			}
			return true;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(`匡弼：是否取消${get.translation(trigger.card)}的所有目标并重新指定任意目标？`)
				.set("ai", () => true)
				.forResult();
		},
		async content(event, trigger, player) {
			player.addTempSkill("jlsg_kuangbi_used");
			trigger.targets = [];
			game.log(player, `取消了${get.translation(trigger.card)}的所有目标`);
			const { result } = await player
				.chooseTarget(true, `请选择${get.translation(trigger.card)}的目标`)
				.set("selectTarget", [0, game.countPlayer()])
				.set("ai", target => {
					const player = get.player();
					return get.effect(target, trigger.card, trigger.player, player) > 0;
				});
			if (!result?.bool || !result?.targets?.length) {
				return;
			} else {
				result.targets.sortBySeat(trigger.player);
				player.line(result.targets);
				trigger.targets = result.targets;
				game.log(result.targets, "成为了", trigger.card, "的新目标");
			}
		},
		subSkill: {
			used: {
				charlotte: true,
				sub: true,
			},
		},
		ai: {
			threaten: 4,
		},
	},
	jlsg_taoxi: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		enable: "phaseUse",
		content: function () {
			"step 0"
			player.addTempSkill("jlsg_taoxi2", "phaseUseAfter");
			event.targets = game.filterPlayer(p => p != event.player);
			event.targets.sortBySeat();
			"step 1"
			event.target = event.targets.shift();
			player.gainPlayerCard(event.target, "h", true).set("delay", false);
			"step 2"
			if (result.bool) {
				var arr = player.storage.jlsg_taoxi2.get(event.target) || [];
				arr.addArray(result.cards);
				if (!game.online) {
					player.addGaintag(arr, "jlsg_taoxi");
				}
				player.storage.jlsg_taoxi2.set(event.target, arr);
				game.delayx(0.3);
			}
			if (event.targets.length) {
				event.goto(1);
			}
			"step 3"
			var cards = Array.from(player.storage.jlsg_taoxi2.values()).flat();
			if (game.online) {
				player.addGaintag(cards, "jlsg_taoxi");
			}
		},
		ai: {
			order: 10,
			result: { player: 1 },
		},
	},
	jlsg_taoxi2: {
		init: function (player) {
			player.storage.jlsg_taoxi2 = new Map();
		},
		onremove: function (player) {
			player.storage.jlsg_taoxi2 = null;
		},
		forced: true,
		trigger: { player: "phaseUseEnd" },
		filter: function (event, player) {
			return player.storage.jlsg_taoxi2.size;
		},
		content: function () {
			"step 0"
			let { value, done } = player.storage.jlsg_taoxi2.entries().next();
			if (done) {
				return;
			}
			event.redo();
			let [p, cards] = value;
			player.storage.jlsg_taoxi2.delete(p);
			let hs = player.getCards("h");
			cards = cards.filter(c => hs.includes(c));
			if (!cards.length || !p.isIn()) {
				return;
			}
			p.gain(cards, player, false);
			player.$giveAuto(cards, p);
			game.delayx(0.3);
			"step 1"
			player.removeGaintag(event.name);
			player.removeSkill(event.name);
		},
	},
	jlsg_huaibi: {
		audio: "ext:极略/audio/skill:2",
		marktext: "玺",
		intro: {
			content: "expansion",
			markcount: function (storage, player) {
				return;
			},
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		trigger: {
			player: ["enterGame", "phaseJieshuBegin"],
			global: "phaseBefore",
		},
		forced: true,
		filter: function (event, player) {
			if (event.name == false && game.phaseNumber != 0) {
				return false;
			}
			return !player.getExpansions("jlsg_huaibi").length;
		},
		content: function () {
			"step 0"
			player.draw(2);
			"step 1"
			if (!player.countCards("h")) {
				event.finish();
				return;
			}
			player.chooseCard(true).set("prompt2", "置于武将牌上作为「玺」");
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.addToExpansion(result.cards, "give").gaintag.add(event.name);
		},
		group: "jlsg_huaibi2",
	},
	jlsg_huaibi2: {
		audio: "jlsg_huaibi",
		trigger: { target: "useCardToBefore" },
		forced: true,
		filter: function (event, player) {
			if (event.player == player) {
				return false;
			}
			if (event.card.name != "sha" && get.type(event.card) != "trick") {
				return false;
			}
			let expansion = player.getExpansions("jlsg_huaibi");
			let suit = get.suit(event.card);
			return suit && expansion.some(c => c.suit == suit);
		},
		content: function () {
			trigger.cancel();
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (!card) {
						return;
					}
					if (player == target) {
						return;
					}
					if (card.name != "sha" && get.type(card) != "trick") {
						return;
					}
					let suit = get.suit(card);
					let expansion = target.getExpansions("jlsg_huaibi");
					if (suit && expansion.some(c => c.suit == suit)) {
						return "zerotarget";
					}
				},
			},
		},
	},
	jlsg_zhixi: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		enable: "phaseUse",
		init(player) {
			player.storage.jlsg_zhixi = [];
		},
		filter: function (event, player) {
			return player.getExpansions("jlsg_huaibi").length;
		},
		filterTarget: function (card, player, target) {
			return target != player;
		},
		content: function () {
			"step 0"
			target.gain("give", player, player.getExpansions("jlsg_huaibi"));
			"step 1"
			if (player.getStorage(event.name).includes(target)) {
				target.loseHp();
			} else {
				target.loseHp(3);
				player.storage[event.name].push(target);
			}
		},
		ai: {
			order: 2,
			result: {
				player: function (player, target) {
					if (player.hasSkill("jlsg_huaibi")) {
						return 1;
					}
				},
				target: function (player, target) {
					let result = get.effect(target, { name: "losehp" }, player, target) / get.attitude(target, target);
					if (player.getStorage("jlsg_zhixi").includes(target)) {
						return result * 2;
					}
					return result;
				},
			},
		},
	},
	jlsg_caijian: {
		audio: "ext:极略/audio/skill:2",
		marktext: "鉴",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		usable: 1,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return target.countCards("he");
		},
		delay: false,
		content: function () {
			"step 0"
			player.gainPlayerCard(target, "visibleMove", true).set("chooseonly", true);
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			let card = result.cards[0];
			if (
				get.color(card, false) == "black" &&
				!player
					.getExpansions(event.name)
					.map(c => c.suit)
					.includes(card.suit)
			) {
				target.turnOver();
			}
			player.addToExpansion(result.cards, target).gaintag.add(event.name);
		},
		ai: {
			order: 6,
			maixie: true,
			maixie_hp: true,
			result: {
				player: function (player, target) {
					if (player.hasSkill("jlsg_zhishix")) {
						return 1;
					}
				},
				target: -1,
			},
		},
		group: "jlsg_caijian2",
	},
	jlsg_caijian2: {
		audio: "jlsg_caijian",
		trigger: {
			player: "damageEnd",
		},
		direct: true,
		content: function () {
			"step 0"
			event.num = trigger.num;
			"step 1"
			if (!event.num) {
				event.finish();
				return;
			}
			--event.num;
			player
				.chooseTarget(get.prompt2("jlsg_caijian"), (_, player, target) => target.countCards("he"))
				.set("ai", function (target) {
					return 1 - get.attitude(_status.event.player, target);
				});
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.useSkill("jlsg_caijian", false).set("target", result.targets[0]).set("targets", result.targets);
			event.goto(1);
		},
	},
	jlsg_zhishix: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter: function (event, player) {
			let suits = new Set(
				player
					.getExpansions("jlsg_caijian")
					.map(c => c.suit)
					.filter(c => c)
			);
			return suits.size >= 3;
		},
		chooseButton: {
			dialog: function (event, player) {
				return ui.create.dialog("智识", player.getExpansions("jlsg_caijian"), "hidden");
			},
			select: 3,
			filter: function (button, player) {
				return !ui.selected.buttons.map(c => c.suit).includes(button.suit);
			},
			backup: function (links, player) {
				return {
					audio: "jlsg_zhishix",
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					delay: false,
					cards: links,
					content: function () {
						"step 0"
						let cards = lib.skill["jlsg_zhishix_backup"].cards;
						player.discard(cards);
						"step 1"
						player.draw(3);
						var list;
						if (_status.characterlist) {
							list = [];
							for (var i = 0; i < _status.characterlist.length; i++) {
								var name = _status.characterlist[i];
								if (get.character(name, 1) == "wei") {
									list.push(name);
								}
							}
						} else if (_status.connectMode) {
							list = get.charactersOL(function (i) {
								return get.character(i, 1) != "wei";
							});
						} else {
							list = get.gainableCharacters(function (info) {
								return info[1] == "wei";
							});
						}
						var players = game.players.concat(game.dead);
						for (var i = 0; i < players.length; i++) {
							list.remove(players[i].name);
							list.remove(players[i].name1);
							list.remove(players[i].name2);
						}
						let character = list.randomGet();
						player.flashAvatar("jlsg_zhishix", character);
						event.character = character;
						"step 2"
						player.addSkills(get.character(event.character)[3]);
					},
					ai: {
						order: 10,
					},
				};
			},
		},
		ai: {
			order: 8,
			result: { player: 1 },
		},
	},
	jlsg_anguo: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseDrawBegin2" },
		filter: function (event, player) {
			return !event.numFixed && event.num > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`###安国：是否少摸一张牌并选择一名角色吗，令其随机使用一张装备牌？###此牌为:武器牌,其摸X张牌（X为此武器牌的攻击范围）;防具或宝物牌,其回复1点体力;坐骑牌,重复此流程.`)
				.set("ai", target => {
					if (get.cardPile(card => get.type(card) == "equip")) {
						return get.attitude(_status.event.player, target);
					} else {
						return 0;
					}
				})
				.forResult();
		},
		async content(event, trigger, player) {
			--trigger.num;
			let target = event.targets[0],
				subtypes = {},
				noStop = true,
				cards = Array.from(ui.cardPile.childNodes)
					.concat(Array.from(ui.discardPile.childNodes))
					.filter(i => get.type(i, null, false) == "equip")
					.filter(i => ["c", "d"].includes(get.position(i)));
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			for (const i of cards) {
				let subtype = get.subtype(i);
				subtypes[subtype] = subtypes[subtype] || [];
				subtypes[subtype].add(i);
			}
			while (noStop) {
				noStop = false;
				if (!Object.keys(subtypes).length) {
					await game.delayx();
					break;
				}
				let subtype = Object.keys(subtypes)
					.randomSort()
					.find(i => target.isEmpty(i));
				if (!subtype) {
					subtype = Object.keys(subtypes).randomGet();
				}
				let card = subtypes[subtype].randomRemove();
				if (!card) {
					if (!subtypes[subtype].length) {
						delete subtypes[subtype];
					}
					noStop = true;
					continue;
				}
				await target.gain(card, "gain2");
				if (!target.canUse(card, target)) {
					break;
				}
				await target.chooseUseTarget(card, true).set("nopopup", true);
				if (subtype == "equip1") {
					if (lib.card[card.name].distance) {
						let range = 1 - lib.card[card.name].distance.attackFrom;
						if (range > 0) {
							await target.draw(player, range);
						}
					}
				} else if (["equip2", "equip5"].includes(subtype)) {
					await target.recover(player);
				} else {
					noStop = true;
				}
			}
		},
	},
	jlsg_quanxiang: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter: function (event, player) {
			return !player.hasSkillTag("noCompareSource") && !player.hasSkill("jlsg_quanxiang3");
		},
		filterTarget: function (card, player, target) {
			return player.canCompare(target);
		},
		content: function () {
			"step 0"
			player.chooseToCompare(target);
			"step 1"
			if (result.bool) {
				if (!target.storage.nohp && target.hp) {
					player.addTempSkill("jlsg_quanxiang3", "phaseUseEnd");
					player.addSkill("jlsg_quanxiang2");
					let evt = target.loseHp(target.hp);
					player.storage.jlsg_quanxiang2 = [target, evt];
				}
			} else {
				player.addMark("jlsg_raoshe", 2);
				if (player.countMark("jlsg_raoshe") >= 7) {
					player.die();
				}
			}
		},
		ai: {
			order: 8,
			result: {
				target: -1,
			},
		},
	},
	jlsg_quanxiang2: {
		sourceSkill: "jlsg_quanxiang",
		trigger: { global: "dyingAfter" },
		forced: true,
		charlotte: true,
		filter: function (event, player) {
			if (!player.storage.jlsg_quanxiang2) {
				return false;
			}
			return event.player === player.storage.jlsg_quanxiang2[0];
		},
		direct: true,
		content: function () {
			"step 0"
			if (trigger.reason !== player.storage.jlsg_quanxiang2[1]) {
				event.goto(2);
				return;
			}
			trigger.player.recover(trigger.reason.num, player);
			"step 1"
			player.addMark("jlsg_raoshe", 1);
			if (player.countMark("jlsg_raoshe") >= 7) {
				player.die();
			}
			"step 2"
			player.removeSkill(event.name);
		},
	},
	jlsg_quanxiang3: {},
	jlsg_raoshe: {
		intro: {
			name: "饶舌",
			content: "mark",
		},
	},
	jlsg_gushe: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "compare", target: "compare" },
		filter: function (event, player) {
			return !event.iwhile && player.countMark("jlsg_raoshe");
		},
		forced: true,
		content: function () {
			let cnt = player.countMark("jlsg_raoshe");
			game.log(player, `的拼点牌点数+${cnt}`);
			if (player == trigger.player) {
				trigger.num1 += cnt;
				if (trigger.num1 > 13) {
					trigger.num1 = 13;
				}
			} else {
				trigger.num2 += cnt;
				if (trigger.num2 > 13) {
					trigger.num2 = 13;
				}
			}
		},
		group: "jlsg_gushe2",
	},
	jlsg_gushe2: {
		audio: "jlsg_gushe",
		inherit: "jyzongshi",
		frequent: function (event, player) {
			return this.check(event, player);
		},
	},
	jlsg_jici: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageBegin2" },
		filter: function (event, player) {
			return event.source && event.source != player && player.countCards("h") && !player.hasSkillTag("noCompareSource") && !event.source.hasSkillTag("noCompareTarget");
		},
		check: function (event, player) {
			return player.countMark("jlsg_raoshe") < 7 || event.num > 1 || Math.random() < 0.5;
		},
		content: function () {
			"step 0"
			trigger.source.draw(player);
			"step 1"
			if (player.canCompare(trigger.source)) {
				player.chooseToCompare(trigger.source);
			} else {
				event.finish();
			}
			"step 2"
			if (result.bool) {
				trigger.cancel();
			} else {
				trigger.num = 1;
				player.addMark("jlsg_raoshe");
				if (player.countMark("jlsg_raoshe") >= 7) {
					player.die();
				}
			}
		},
	},
	jlsg_hechun: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		selectTarget: -1,
		filterTarget(card, player, target) {
			return target != player;
		},
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			event.targets.sortBySeat();
			const pairs = [];
			for (const target of event.targets) {
				if (!target.countGainableCards(player, "he")) {
					continue;
				}
				const { result } = await target
					.chooseToGive(true, player, "he", `交给${get.translation(player)}一张牌`)
					.set("target", player)
					.set("filterCard", (card, player) => lib.filter.canBeGained(card, get.event("target"), player))
					.set("ai", function (card, cards) {
						let player = get.player();
						let target = get.event("target");
						let num = -get.attitude(player, player) * get.value(card, player) + get.attitude(player, target) * get.value(card, target);
						if (get.color(card, player) == "black") {
							num -= 15;
						}
						if (get.color(card, player) == "red" && player.isDamaged()) {
							num += 15;
						}
						return num;
					});
				pairs.add([target, get.color(result.cards[0], target)]);
			}
			for (const pair of pairs) {
				const [target, color] = pair;
				if (!color) {
					continue;
				}
				const bool = await player
					.chooseBool(`是否令${get.translation(target)}${color == "red" ? "回复" : "失去"}1点体力？`)
					.set("ai", (event, player) => {
						if (get.event("color") == "red") {
							return get.recoverEffect(target, player, player) > 0;
						} else {
							return get.effect(target, { name: "losehp" }, player, player) > 0;
						}
					})
					.set("color", color)
					.forResultBool();
				if (bool) {
					player.line(target, "green");
					await target[color == "red" ? "recover" : "loseHp"]();
				}
				if (!event.isMine() && !event.isOnline()) {
					await game.delayx();
				}
			}
		},
		ai: {
			order: 9,
			threaten: 2,
			result: {
				player: 1,
			},
		},
	},
	jlsg_daiyan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseAfter" },
		direct: true,
		init: function (player) {
			if (!player.storage.jlsg_daiyan) {
				player.storage.jlsg_daiyan = new Map();
			}
		},
		content: function () {
			"step 0"
			let choice = game.filterPlayer().filter(p => get.attitude(player, p) > 0 && p.hp > (player.storage.jlsg_daiyan.get(p) || 0));
			choice = choice.randomGet();
			player
				.chooseTarget(get.prompt2(event.name))
				.set("choice", choice)
				.set("ai", p => p == _status.event.choice);
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.target = result.targets[0];
			player.logSkill(event.name, event.target);
			if (event.target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			let cnt = player.storage.jlsg_daiyan.get(event.target) || 0;
			if (cnt) {
				event.target.loseHp(cnt);
			}
			player.storage.jlsg_daiyan.set(event.target, cnt + 1);
			"step 2"
			event.target.insertPhase();
		},
		ai: {
			threaten: 2,
		},
	},
	jlsg_jianying: {
		audio: "ext:极略/audio/skill:2",
		inherit: "dcjianying",
	},
	jlsg_shibei: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "damageEnd",
		},
		usable: 1,
		content: function () {
			"step 0"
			player.recover();
			player.addTempSkill("jlsg_shibei2");
			player.storage.jlsg_shibei2 = trigger;
			if (!trigger.card || !player.countCards("hs")) {
				return;
			}
			let card = trigger.card;
			if (card.name != "jiu" && lib.filter.cardEnabled(card)) {
				if (
					game.hasPlayer(function (current) {
						return player.canUse(card, current);
					})
				) {
					game.broadcastAll(card => (lib.skill.jlsg_mozhix.viewAs = card), card);
					var next = player.chooseToUse();
					next.logSkill = "jlsg_shibei";
					next.set("openskilldialog", "矢北：将一张手牌当" + get.translation(card) + "使用");
					next.set("norestore", true);
					next.set("_backupevent", "jlsg_mozhix");
					next.set("custom", {
						add: {},
						replace: { window: function () {} },
					});
					next.backup("jlsg_mozhix");
				}
			}
		},
	},
	jlsg_shibei2: {
		audio: "jlsg_shibei",
		trigger: {
			player: "damageEnd",
		},
		filter(event, player) {
			return event != player.storage.jlsg_shibei2;
		},
		forced: true,
		// locked: false,
		content: function () {
			"step 0"
			player.loseHp();
		},
	},
	jlsg_kuizhu: {
		audio: "ext:极略/audio/skill:2",
		forced: true,
		trigger: { player: "phaseJieshuBegin" },
		content: function () {
			"step 0"
			let cntAll = game.getGlobalHistory("cardMove", e => e.type === "discard").reduce((a, b) => a + (b.hs ? b.hs.length : 0) + (b.es ? b.es.length : 0) + (b.js ? b.js.length : 0), 0);
			let cntSelf = player.getHistory("lose", e => e.type === "discard").reduce((a, b) => a + (b.hs ? b.hs.length : 0) + (b.es ? b.es.length : 0) + (b.js ? b.js.length : 0), 0);
			if (cntAll - cntSelf <= cntSelf) {
				player.loseHp();
				player.draw(game.filterPlayer().length);
				event.finish();
			}
			"step 1"
			player
				.chooseTarget(true)
				.set("prompt2", "对其造成2点伤害")
				.set("ai", function (target) {
					let player = _status.event.player;
					return get.damageEffect(target, player, player);
				});
			"step 2"
			if (result.bool) {
				let target = result.targets[0];
				if (target.ai.shown > player.ai.shown) {
					player.addExpose(0.2);
				}
				target.damage(2);
			}
		},
	},
	jlsg_chezheng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseUseAfter"] },
		filter: function (event, player) {
			if (event.skill) {
				return false;
			}
			let evt = event.getParent();
			return evt.name == "phase" && evt.player == player && evt.phaseList[evt.num] == "phaseUse";
		},
		direct: true,
		content() {
			"step 0"
			event.choices = ["令至多X名角色各弃置一张牌，并各进行一个额外出牌阶段", "令至多X名角色各摸一张牌，并各进行一个额外弃牌阶段"];
			player.chooseControlList(get.prompt(event.name), event.choices).set("ai", () => (Math.random < 0.5 ? 0 : 1));
			"step 1"
			if (result.control == "cancel2") {
				event.finish();
				return;
			}
			event.choice = result.index;
			let prompt = `###${get.prompt(event.name)}###${event.choices[result.index]}`;
			let next = player.chooseTarget(prompt, [1, player.hp]);
			if (event.choice == 0) {
				next.filterTarget = function (card, player, target) {
					return target.countCards("he") > 0;
				};
				next.ai = function (target, targets) {
					return get.attitude(_status.event.player, target) * (target.countCards("h") - 3);
				};
			} else {
				next.ai = function (target, targets) {
					return get.attitude(_status.event.player, target) * (target.getHandcardLimit() - target.countCards("h") + Math.random());
				};
			}
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill(event.name, result.targets);
			event.targets = result.targets;
			event.targets.sortBySeat();
			if (event.choice == 0) {
				event.targets.forEach(p => p.chooseToDiscard("he", true).set("delay", false));
			} else {
				game.asyncDraw(event.targets);
			}
			"step 3"
			if (event.choice == 0) {
				event.targets.forEach(p => p.phaseUse());
			} else {
				event.targets.forEach(p => p.phaseDiscard());
			}
		},
	},
	jlsg_jueyong: {
		intro: {
			nocount: true,
			content: "limited",
		},
		audio: "ext:极略/audio/skill:2",
		skillAnimation: true,
		limited: true,
		trigger: { source: "damageSource" },
		filter(event, player) {
			if (!event.card || event.card.name != "sha") {
				return false;
			}
			return player.countCards("h") > player.maxHp;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(`###绝勇：是否将体力上限调整至${player.countCards("h")}？###然后将体力回复至体力上限。`)
				.set("ai", (event, player) => {
					return player.countCards("h") - player.maxHp > 1;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			player.awakenSkill("jlsg_jueyong");
			player.maxHp = player.countCards("h");
			player.update();
			await player.recoverTo(player.maxHp);
			await game.delayx();
		},
	},
	jlsg_choujue: {
		audio: "ext:极略/audio/skill:2",
		locked: false,
		usable: 1,
		viewAs: {
			name: "sha",
			isCard: true,
			storage: {
				jlsg_choujue: true,
			},
		},
		enable: "phaseUse",
		filterCard: function () {
			return false;
		},
		selectCard: -1,
		precontent() {
			player.loseMaxHp(1);
			player.draw();
			event.getParent().addCount = false;
		},
		mod: {
			cardUsable: function (card) {
				if (_status.event.skill == "jlsg_choujue") {
					return Infinity;
				}
				if (card.storage && card.storage.jlsg_choujue) {
					return Infinity;
				}
			},
		},
		group: "jlsg_choujue2",
		ai: {
			order: 2.9,
			result: {
				player: -1,
			},
		},
	},
	jlsg_choujue2: {
		silent: true,
		locked: false,
		forced: true,
		trigger: { source: "damageBegin2" },
		filter(event, player) {
			return event.card && event.card.storage && event.card.storage.jlsg_choujue;
		},
		content() {
			for (let skill of player.skills) {
				let translation = get.skillInfoTranslation(skill, event.player);
				if (!translation) {
					continue;
				}
				let match = translation.match(/“?出牌阶段限一次/g);
				if (!match || match.every(value => value != "出牌阶段限一次")) {
					continue;
				}
				let ss = game.expandSkills([skill]);
				for (let s of ss) {
					let uses = player.getStat("skill");
					if (uses[s]) {
						uses[s] = 0;
					}
					if (player.storage.counttrigger && player.storage.counttrigger[s]) {
						player.storage.counttrigger[s] = 0;
					}
				}
			}
		},
	},
	jlsg_juzhan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			return event.player != player;
		},
		check(event, player) {
			player.isDamaged() && get.attitude(player, event.player) < 0 && Math.random() < 0.6;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			//🔥佬提供
			if (player.getDamagedHp() > 0) {
				await player.draw(player.getDamagedHp());
			}
			const card = get.autoViewAs({ name: "sha", isCard: true }, []);
			await trigger.player.useCard(card, player, "noai", false);
			if (player.hasHistory("damage", evt => evt.getParent(3) == event) && player.getDamagedHp()) {
				const { result } = await trigger.player
					.chooseToDiscard(Math.min(5, player.getDamagedHp()), "he")
					.set("prompt", `${get.translation(player)}对你发动了【拒战】，请弃置${player.getDamagedHp()}张牌`)
					.set("prompt2", "否则跳过出牌阶段")
					.set("ai", card => get.value(card) < 6);
				if (!result.cards || !result.cards[0]) {
					trigger.cancel();
					game.log(trigger.player, "跳过了出牌阶段");
				}
			}
		},
		ai: {
			maixie_hp: true,
		},
	},
	jlsg_zuilun: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		content() {
			"step 0"
			var evts = player.getHistory("lose", e => e.type == "discard");
			if (!evts.length) {
				player.draw(4);
				event.goto(2);
			} else {
				player
					.chooseTarget(lib.filter.notMe, true)
					.set("prompt2", "令其摸四张牌")
					.set("ai", p => get.attitude(_status.event.player, p) + Math.random());
			}
			"step 1"
			if (result.bool) {
				player.line(result.targets[0]);
				result.targets[0].draw(4, player);
			}
			"step 2"
			var evts = game.getGlobalHistory("changeHp", e => e.player == player && e.getParent().name == "recover");
			if (!evts.length) {
				player.loseHp();
				event.goto(4);
			} else {
				player
					.chooseTarget(lib.filter.notMe, true)
					.set("prompt2", "令其失去1点体力")
					.set("ai", p => get.attitude(_status.event.player, p) * jlsg.getLoseHpEffect(p));
			}
			"step 3"
			if (result.bool) {
				player.line(result.targets[0]);
				result.targets[0].loseHp();
			}
			"step 4"
			if (!player.isIn()) {
				event.finish();
				return;
			}
			var evts = player.getHistory("sourceDamage");
			if (!evts.length) {
				player.loseMaxHp();
				event.finish();
			} else {
				player
					.chooseTarget(lib.filter.notMe, true)
					.set("prompt2", "令其减1点体力上限")
					.set("ai", p => get.attitude(_status.event.player, p) * (p.isHealthy() ? -1 : -0.4) + Math.random() * 2);
			}
			"step 5"
			if (result.bool) {
				player.line(result.targets[0]);
				result.targets[0].loseMaxHp();
			}
		},
	},
	jlsg_fuzhi: {
		audio: "ext:极略/audio/skill:2",
		animationColor: "thunder",
		skillAnimation: true,
		juexingji: true,
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter(event, player) {
			return player.hp == 1;
		},
		derivation: ["jlsg_yaozhi", "jlsg_xingyun"],
		content() {
			"step 0"
			player.awakenSkill("jlsg_fuzhi");
			player.gainMaxHp();
			player.recover();
			"step 1"
			player.changeSkills(["jlsg_yaozhi", "jlsg_xingyun"], ["jlsg_zuilun"]);
		},
	},
	jlsg_jiejun: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardAfter" },
		filter(event, player) {
			if (!player.hasUsableCard("sha")) {
				return false;
			}
			return event.player != player && _status.currentPhase != player && get.color(event.card, event.player) == "red";
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToUse({
					prompt: `截军：是否对${get.translation(trigger.player)}使用一张【杀】？`,
					prompt2: `若此【杀】造成伤害，你获得其所有牌`,
					filterCard(card, player) {
						return get.name(card) == "sha" && lib.filter.filterCard.apply(this, arguments);
					},
					complexTarget: true,
					filterTarget(card, player, target) {
						if (!lib.filter.targetEnabled.apply(this, arguments)) {
							return false;
						}
						if (ui.selected.targets.length) {
							return ui.selected.targets.includes(get.event().preTarget);
						}
						return target == get.event().preTarget;
					},
					ai2(target) {
						if (!ui.selected.cards?.length) {
							return 0;
						}
						const player = get.owner(ui.selected.cards[0]);
						const shaEff = get.effect(target, get.autoViewAs({ name: "sha", isCard: false }, ui.selected.cards), player, player),
							shunshouEff = get.effect(target, { name: "shunshou_copy2" }, player, player);
						return shaEff + shunshouEff;
					},
					filterOk: () => ui.selected.targets.includes(get.event().preTarget),
					logSkill: ["jlsg_jiejun", trigger.player],
					addCount: false,
					chooseonly: true,
					preTarget: trigger.player,
				})
				.forResult();
		},
		async content(event, trigger, player) {
			//旧版本兼容 —— 流年（2025.11.13）
			const { ResultEvent, result } = event.cost_data;
			let next;
			if (ResultEvent) {
				event.next.push(ResultEvent);
				next = ResultEvent;
			} else {
				next = player.useResult(result, event);
			}
			await next;
			let damage = player.hasHistory("sourceDamage", evt => evt.getParent("useCard") == next);
			if (damage && trigger.player.isIn()) {
				const cards = trigger.player.getGainableCards(player, "he");
				if (cards.length) {
					player.gain(trigger.player, cards, "giveAuto");
				}
			}
		},
	},
	jlsg_xiecui: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "damageBegin2" },
		filter(event, player) {
			if (!event.source || event.source !== _status.currentPhase) {
				return false;
			} else if (
				player
					.getDiscardableCards(player, "he")
					.map(c => get.suit(c))
					.unique().length < 2
			) {
				return false;
			}
			return game.getGlobalHistory("everything", evt => evt.name == "damage" && evt.source == event.source).indexOf(event) == 0;
		},
		async cost(event, trigger, player) {
			let cnt = 0;
			if (get.attitude(player, trigger.player) * get.attitude(player, trigger.source) < -4) {
				cnt = trigger.source.getHistory("useCard").length;
			}
			let prompt = `###${get.prompt(event.skill, trigger.source)}###${get.translation(trigger.source)}将对${get.translation(trigger.player)}造成伤害`;
			event.result = await player
				.chooseToDiscard(prompt, "he", 2, card => ui.selected.cards.every(cardx => get.suit(cardx) != get.suit(card)))
				.set("complexCard", true)
				.set("ai", c => 4 * _status.event.cnt - get.value(c) - 2 * Math.random())
				.set("logSkill", [event.name, trigger.source])
				.set("chooseonly", true)
				.set("cnt", cnt)
				.forResult();
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			const { result } = await player
				.chooseControl("伤害+1", "伤害-1")
				.set("ai", () => _status.event.choice)
				.set("choice", get.attitude(player, trigger.player) > get.attitude(player, trigger.source) ? 1 : 0)
				.set("prompt", "撷翠")
				.set("prompt2", "请选择一项");
			if (!result?.control || result.control == "cancel2") {
				return;
			}
			let cnt = trigger.source.getHistory("useCard").length;
			if (trigger.source.ai.shown > player.ai.shown || trigger.player.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			if (result.control == "伤害+1") {
				game.log(player, "令", trigger.source, "对", trigger.player, "造成的伤害+1");
				trigger.num += 1;
				if (cnt) {
					await trigger.source.draw(cnt, player);
				}
			} else {
				game.log(player, "令", trigger.source, "对", trigger.player, "造成的伤害-1");
				trigger.num -= 1;
				if (cnt) {
					await trigger.source.chooseToDiscard(cnt, "he", true);
				}
			}
		},
	},
	jlsg_youxu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			const num = event.player.getDamagedHp();
			const wugu = get.autoViewAs({ name: "wugu", isCard: num == 0 }, "unsure"),
				tao = get.autoViewAs({ name: "tao", isCard: num == 0 }, "unsure");
			if (!event.player.hasUseTarget(tao) && !event.player.hasUseTarget(wugu)) {
				return false;
			}
			return event.player.countCards("he") >= num;
		},
		async cost(event, trigger, player) {
			const num = trigger.player.getDamagedHp();
			const wugu = get.autoViewAs({ name: "wugu", isCard: num == 0 }, "unsure"),
				tao = get.autoViewAs({ name: "tao", isCard: num == 0 }, "unsure");
			const cards = [wugu, tao].filter(card => trigger.player.hasUseTarget(card));
			let str = `${num == 0 ? `令${get.translation(trigger.player)}视为使用` : `选择${get.translation(trigger.player)}的${get.cnNumber(num)}张牌当作`}一张`,
				str2 = cards.map(card => card.name);
			str += str2.map(card => lib.translate[card]).join("或") + (num == 0 ? "" : "使用");
			let keys = ["effect", "canUse", "effect_use", "getUseValue"],
				value = 0,
				choice,
				next;
			for (const card of cards) {
				let newV = lib.skill.dcpandi.getUseValue(card, trigger.player, player);
				if (newV > value) {
					value = newV;
					choice = card.name;
				}
				for (let key of keys) {
					let info = _status.event._tempCache[key];
					for (let i in info) {
						if (i.indexOf(player.playerid) > -1 && i.endsWith("-") && i.indexOf("c:") == -1) {
							delete _status.event._tempCache[key][i];
						}
					}
				}
			}
			if (num == 0) {
				next = player.chooseBool(str).set("ai", (event, player) => get.event("choice"));
			} else {
				next = player
					.choosePlayerCard("he", trigger.player, get.prompt("jlsg_youxu", trigger.player))
					.set("prompt2", str)
					.set("selectButton", [num, num])
					.set("target", trigger.player)
					.set("ai", button => {
						const player = get.player(),
							target = get.event("target"),
							val = get.buttonValue(button);
						if (get.attitude(player, target) > 0) {
							return 1.6 / _status.event.selectButton[0] - val - Math.random() / 2;
						}
						return val;
					})
					.set("filterOk", function () {
						const player = get.player();
						if (_status.connectMode && !player.isAuto) {
							return true;
						} else if (!_status.auto) {
							return true;
						}
						return get.event("choice");
					});
			}
			const { result } = await next.set("choice", choice);
			event.result = {
				bool: result.bool,
				targets: [trigger.player],
				cards: result.links ?? [],
				cost_data: {
					choice: choice,
					choiceList: str2,
				},
			};
		},
		async content(event, trigger, player) {
			const {
				cost_data: { choiceList },
			} = event;
			if (choiceList.length == 0) {
				return;
			} else if (choiceList.length == 1) {
				event.cardName = choiceList[0];
			} else {
				event.cardName = await player
					.chooseControl(choiceList)
					.set("prompt", `###请选择一项###${get.translation(trigger.player)}要使用的牌`)
					.set("ai", (event, player) => event.cost_data?.choice ?? 0)
					.forResultControl();
			}
			if (trigger.player.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			const card = get.autoViewAs({ name: event.cardName, isCard: trigger.player.isHealthy() }, event.cards);
			const next = trigger.player
				.chooseUseTarget(true, "noTargetDelay", "nodelayx")
				.set("card", card)
				.set("cards", event.cards)
				.set("oncard", function (c, p) {
					this.noai = true;
				});
			await next;
		},
	},
	jlsg_zhulu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageSource" },
		filter(event, player) {
			return event.player.countCards("he");
		},
		check(event, player) {
			return get.attitude(player, event.player) <= 0;
		},
		logTarget: "player",
		content() {
			"step 0"
			if (trigger.player.ai.shown > player.ai.shown) {
				player.addExpose(0.3);
			}
			event.players = game.filterPlayer(p => p != trigger.player).sortBySeat();
			"step 1"
			var p = event.players.shift();
			if (!p || !trigger.player.countCards("he")) {
				event.finish();
				return;
			}
			p.gainPlayerCard(trigger.player, "he", true).delay = false;
			game.delayex(0.5);
			event.redo();
		},
	},
	jlsg_limu: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			cardUsableTarget: function (card, player, target) {
				if (player.countCards("j")) {
					return true;
				}
			},
		},
		enable: "phaseUse",
		discard: false,
		filter: function (event, player) {
			if (player.hasJudge("lebu")) {
				return false;
			}
			return player.countCards("hes", { suit: "diamond" }) > 0;
		},
		viewAs: { name: "lebu" },
		//prepare:"throw",
		position: "hes",
		filterCard: function (card, player, event) {
			return get.suit(card) == "diamond" && player.canAddJudge({ name: "lebu", cards: [card] });
		},
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player == target;
		},
		check: function (card) {
			return get.number(card) - 3 - Math.random();
		},
		onuse: function (links, player) {
			var next = game.createEvent("limu_recover", false, _status.event.getParent());
			next.player = player;
			next.setContent(function () {
				player.draw(event.num);
				player.recover();
			});
			next.num = get.number(links.card);
		},
		ai: {
			result: {
				target: 1,
			},
			order: 12,
		},
	},
	jlsg_huaiyi: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		delay: false,
		filterTarget: function (card, player, target) {
			return player != target && target.countCards("he");
		},
		content() {
			"step 0"
			player.choosePlayerCard(`选择${get.translation(target)}一张牌置于武将牌上`, target, "he", true);
			if (target.ai.shown > player.ai.shown) {
				player.addExpose(0.2);
			}
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.addToExpansion(result.cards, target, "giveAuto").gaintag.add(event.name);
		},
		marktext: "异",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		group: ["jlsg_huaiyi2", "jlsg_huaiyi3"],
		ai: {
			order: 8,
			result: {
				target: -2,
			},
		},
	},
	jlsg_huaiyi2: {
		audio: "jlsg_huaiyi",
		trigger: { player: "phaseDrawBegin2" },
		forced: true,
		locked: false,
		filter: function (event, player) {
			return !event.numFixed && player.getExpansions("jlsg_huaiyi").length;
		},
		content() {
			trigger.num += player.getExpansions("jlsg_huaiyi").length;
		},
	},
	jlsg_huaiyi3: {
		audio: "jlsg_huaiyi",
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		locked: false,
		filter: function (event, player) {
			return player.getExpansions("jlsg_huaiyi").length > player.hp;
		},
		content() {
			"step 0"
			event.targets = game.filterPlayer(p => p != player).sortBySeat();
			"step 1"
			if (!player.isIn()) {
				event.finish();
				return;
			}
			if (!event.targets.length) {
				return;
			}
			var target = event.targets.shift();
			target.damage();
			event.redo();
			"step 2"
			player.gain("gain2", player.getExpansions("jlsg_huaiyi"));
		},
	},
	jlsg_jiaozhao: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filter: function (event, player) {
			if (!player.countCards("h")) {
				return false;
			}
			for (var i of lib.inpile) {
				var type = get.type(i);
				var card = { name: i };
				if (["basic", "trick"].includes(type) && game.hasPlayer(p => p != player && lib.filter.targetEnabled2(card, player, p))) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == "sha") {
						if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) {
							list.push(["基本", "", "sha"]);
						}
						for (var j of lib.inpile_nature) {
							if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name, nature: j }, player, p))) {
								list.push(["基本", "", "sha", j]);
							}
						}
					} else if (get.type(name) == "trick" && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) {
						list.push(["锦囊", "", name]);
					} else if (get.type(name) == "basic" && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) {
						list.push(["基本", "", name]);
					}
				}
				return ui.create.dialog("矫诏", [list, "vcard"]);
			},
			check: function (button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				var player = _status.event.player;
				var card = {
					name: button.link[2],
					nature: button.link[3],
				};
				var eff = game
					.filterPlayer(p => p != player && lib.filter.targetEnabled2(card, player, p))
					.map(p => get.effect(p, card, player, player))
					.filter(v => v > 0)
					.reduce((a, b) => a + b, 0);
				return eff;
			},
			backup: function (links, player) {
				return {
					filterCard: true,
					audio: "jlsg_jiaozhao",
					popname: true,
					check: function (card) {
						return 12 - get.value(card);
					},
					selectTarget: [1, Infinity],
					filterTarget(card, player, target) {
						return player != target && lib.filter.targetEnabled2(card, player, target);
					},
					position: "h",
					viewAs: { name: links[0][2], nature: links[0][3] },
				};
			},
			prompt: function (links, player) {
				return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
			},
		},
		hiddenCard: function (player, name) {
			if (!lib.inpile.includes(name)) {
				return false;
			}
			if (!player.isPhaseUsing()) {
				return false;
			}
			var type = get.type(name);
			return (type == "basic" || type == "trick") && player.countCards("h") > 0;
		},
		ai: {
			fireAttack: true,
			skillTagFilter: function (player) {
				if (!player.countCards("h")) {
					return false;
				}
			},
			order: 1,
			result: {
				player: function (player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
	},
	jlsg_danxin: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		frequent: true,
		derivation: "jlsg_jiaozhao",
		content() {
			"step 0"
			player.draw(2);
			var list = [];
			for (var i = 0; i < lib.inpile.length; i++) {
				var name = lib.inpile[i];
				if (name == "sha") {
					if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) {
						list.push(["基本", "", "sha"]);
					}
					for (var j of lib.inpile_nature) {
						if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name, nature: j }, player, p))) {
							list.push(["基本", "", "sha", j]);
						}
					}
				} else if (get.type(name) == "trick" && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) {
					list.push(["锦囊", "", name]);
				} else if (get.type(name) == "basic" && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) {
					list.push(["基本", "", name]);
				}
			}
			var next = player.chooseButton(["矫诏", [list, "vcard"]]);
			var choice,
				value = 0;
			for (let link of list) {
				let card = { name: link[2], nature: link[3] };
				let newV = game
					.filterPlayer(p => p != player && lib.filter.targetEnabled2(card, player, p))
					.map(p => get.effect(p, card, player, player))
					.filter(v => v > 0)
					.reduce((a, b) => a + b, 0);
				if (newV > value) {
					choice = [link[2], link[3]];
					value = newV;
				}
			}
			next.ai = function (button) {
				return button.link[2] === _status.event.choice[0] && (button.link[3] || true) === (_status.event.choice[1] || true);
			};
			next.choice = choice;
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.card = { name: result.links[0][2], nature: result.links[0][3] };

			player
				.chooseCardTarget({
					filterCard: true,
					filterTarget: function (card, player, target) {
						return player != target && lib.filter.targetEnabled2(_status.event.card, player, target);
					},
					ai1: function (card) {
						return 12 - get.value(card);
					},
					selectTarget: [1, Infinity],
					ai2: function (target) {
						var player = _status.event.player;
						return get.effect(target, _status.event.card, player, player);
					},
					prompt: `###${get.prompt("jlsg_jiaozhao")}###将一张牌当作${get.translation(event.card)}使用`,
				})
				.set("card", event.card);
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill("jlsg_jiaozhao");
			player.useCard(event.card, result.cards, result.targets, false);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	jlsg_fanghun: {
		audio: "ext:极略/audio/skill:2",
		enable: ["chooseToUse", "chooseToRespond"],
		position: "hs",
		locked: false,
		prompt: "将【杀】/【闪】当作【闪】/【杀】使用或打出，然后获得对方的一张手牌",
		viewAs(cards, player) {
			if (cards.length) {
				var name = false;
				switch (get.name(cards[0], player)) {
					case "sha":
						name = "shan";
						break;
					case "shan":
						name = "sha";
						break;
				}
				if (name) {
					return { name: name };
				}
			}
			return null;
		},
		check: card => 1,
		filterCard(card, player, event) {
			event = event || _status.event;
			var filter = event._backup.filterCard;
			var name = get.name(card, player);
			if (name == "sha" && filter({ name: "shan", cards: [card] }, player, event)) {
				return true;
			}
			if (name == "shan" && filter({ name: "sha", cards: [card] }, player, event)) {
				return true;
			}
			return false;
		},
		filter(event, player) {
			if (event.filterCard(get.autoViewAs({ name: "sha" }, "unsure"), player, event) && player.countCards("hs", "shan")) {
				return true;
			}
			if (event.filterCard(get.autoViewAs({ name: "shan" }, "unsure"), player, event) && player.countCards("hs", "sha")) {
				return true;
			}
			return false;
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				var name;
				switch (tag) {
					case "respondSha":
						name = "shan";
						break;
					case "respondShan":
						name = "sha";
						break;
				}
				if (!player.countCards("hs", name)) {
					return false;
				}
			},
			order(item, player) {
				if (player && _status.event.type == "phase") {
					return get.order({ name: "sha" }) + 0.3;
				}
				return 10;
			},
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, "respondShan") || get.tag(card, "respondSha")) {
						if (get.attitude(target, player) <= 0) {
							if (current > 0) {
								return;
							}
							if (target.countCards("h") == 0) {
								return 1.6;
							}
							if (target.countCards("h") == 1) {
								return 1.2;
							}
							if (target.countCards("h") == 2) {
								return [0.8, 0.2, 0, -0.2];
							}
							return [0.4, 0.7, 0, -0.7];
						}
					}
				},
			},
		},
		group: ["jlsg_fanghun_cz"],
		subSkill: {
			cz: {
				trigger: {
					player: ["useCard", "respond"],
				},
				filter: function (event, player) {
					if (event.card.name != "sha" && event.card.name != "shan") {
						return false;
					}
					if (!event.skill || event.skill != "jlsg_fanghun") {
						return false;
					}
					var target = lib.skill.chongzhen.logTarget(event, player);
					return target && target.countGainableCards(player, "h") > 0;
				},
				logTarget: function (event, player) {
					return lib.skill.chongzhen.logTarget.apply(this, arguments);
				},
				prompt2: function (event, player) {
					var target = lib.skill.chongzhen.logTarget(event, player);
					return "获得" + get.translation(target) + "的一张手牌";
				},
				content: function () {
					var target = lib.skill.chongzhen.logTarget(trigger, player);
					player.gainPlayerCard(target, "h", true);
				},
			},
		},
	},
	jlsg_fuhan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCardAfter" },
		frequent: true,
		get list() {
			var list = [];
			for (let c of lib.jlsg.characterList.filter(c => get.character(c, 1) == "shu")) {
				get.character(c)[3].forEach(s => list.add(s));
			}
			delete this.list;
			this.list = list;
			return this.list;
		},
		usable: 1,
		filter: function (event) {
			if (!("cards" in event.card) || !event.card.cards.length) {
				return false;
			}
			return !event.card.isCard;
		},
		async content(event, trigger, player) {
			let skills = lib.skill.jlsg_fuhan.list;
			skills.removeArray(game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), []));
			skills = skills.filter(skill => {
				if (lib.filter.skillDisabled(skill)) {
					return false;
				}
				const info = lib.skill[skill];
				if (info.ai?.combo) {
					return player.hasSkill(info.ai?.combo, null, false, false);
				}
				return true;
			});
			if (!skills.length) {
				game.log("没有技能了");
				return;
			}
			await player.addSkills(skills.randomGet());
		},
	},
	jlsg_pindi: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			return player.countDiscardableCards(player, "h") && game.hasPlayer(p => p != player && !player.getStorage("jlsg_pindi_target").includes(p));
		},
		filterTarget: function (card, player, target) {
			return player != target && !player.getStorage("jlsg_pindi_target").includes(target);
		},
		filterCard: true,
		check: function (card) {
			var num = _status.event.player.isTurnedOver() ? 3 : 0;
			return 6 + num - get.value(card);
		},
		content: function () {
			"step 0"
			player.addTempSkill("jlsg_pindi_clear", ["phaseUseAfter", "phaseAfter"]);
			player.markAuto("jlsg_pindi_target", [target]);
			player.syncStorage();
			target.judge(function (card) {
				var evt = _status.event.getParent("jlsg_pindi"),
					suit = get.suit(card);
				if (get.color(card) == "black") {
					return get.sgn(get.attitude(evt.target, evt.player)) * 3;
				}
				switch (suit) {
					case "heart":
						return get.sgn(get.attitude(evt.target, evt.player)) * -3;
					default:
						return 0;
				}
			}).judge2 = function (result) {
				if (result.color == "black") {
					return true;
				}
				return false;
			};
			"step 1"
			if (result.color == "black") {
				player
					.chooseControlList(["令" + get.translation(target) + "摸三张牌", "令" + get.translation(target) + "弃置三张牌"], function () {
						return _status.event.choice;
					})
					.set("choice", get.attitude(player, target) > 0 ? 0 : 1);
			} else {
				switch (result.suit) {
					case "heart":
						player.turnOver();
						break;
					case "diamond":
						player.draw();
						break;
				}
				event.finish();
			}
			"step 2"
			if (result.index == 0) {
				target.draw(3, player);
			} else {
				target.chooseToDiscard(3, "he", true);
			}
		},
		subSkill: {
			clear: {
				trigger: { player: "phaseAfter" },
				charlotte: true,
				silent: true,
				onremove: function (player) {
					delete player.storage.jlsg_pindi_target;
					delete player.storage.jlsg_pindi_type;
				},
			},
		},
		ai: {
			order: 8,
			result: {
				target: function (player, target) {
					var att = get.attitude(player, target);
					if (att <= 0 && target.countCards("he") < 3) {
						return 0;
					}
					return get.sgn(att);
				},
			},
		},
	},
	jlsg_faen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "turnOverEnd" },
		frequent(event, player) {
			return event.player == player;
		},
		check(event, player) {
			return get.attitude(player, event.player) > 0;
		},
		content() {
			trigger.player.draw(3, player);
		},
	},
	jlsg_diaodu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content() {
			"step 0"
			var hMax = game
				.filterPlayer(p => get.attitude(player, p) < 0)
				.map(p => p.countCards("h"))
				.reduce((a, b) => (a > b ? a : b), -Infinity);
			var hMin = game
				.filterPlayer(p => get.attitude(player, p) > 0)
				.map(p => p.countCards("h"))
				.reduce((a, b) => (a < b ? a : b), Infinity);
			var eMax = game
				.filterPlayer(p => get.attitude(player, p) < 0)
				.map(p => p.countCards("e"))
				.reduce((a, b) => (a > b ? a : b), -Infinity);
			var eMin = game
				.filterPlayer(p => get.attitude(player, p) > 0)
				.map(p => p.countCards("e"))
				.reduce((a, b) => (a < b ? a : b), Infinity);
			if (isFinite(hMax - hMin) || isFinite(eMax - eMin)) {
				event.aiTargets = [];
				if (!isFinite(hMax - hMin) || (isFinite(eMax - eMin) && hMax - hMin < (eMax - eMin) * 1.2)) {
					event.aiRegion = "e";
					event.aiTargets.push(game.filterPlayer(p => get.attitude(player, p) < 0 && p.countCards("e") == eMax).randomGet());
					event.aiTargets.push(game.filterPlayer(p => get.attitude(player, p) > 0 && p.countCards("e") == eMin).randomGet());
				} else {
					event.aiRegion = "h";
					event.aiTargets.push(game.filterPlayer(p => get.attitude(player, p) < 0 && p.countCards("h") == hMax).randomGet());
					event.aiTargets.push(game.filterPlayer(p => get.attitude(player, p) > 0 && p.countCards("h") == hMin).randomGet());
				}
			}
			player
				.chooseTarget(2, get.prompt2(event.name))
				.set("ai", function (target, targets) {
					return _status.event.targets && _status.event.targets.includes(target) ? 1 : 0;
				})
				.set("targets", event.aiTargets);
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.targets = result.targets;
			if (event.targets.every(p => p.countCards("he") == 0)) {
				event.finish();
				return;
			}
			player.logSkill(event.name, result.targets);
			if (event.targets.every(p => p.countCards("e") == 0)) {
				event._result = {
					index: 0,
					control: "手牌区",
				};
				return;
			}
			if (event.targets.every(p => p.countCards("h") == 0)) {
				event._result = {
					index: 1,
					control: "装备区",
				};
				return;
			}
			let choice;
			if (Math.sign(get.attitude(player, event.targets[0])) == Math.sign(get.attitude(player, event.targets[1]))) {
				choice = Math.abs(event.targets[0].countCards("h") - event.targets[1].countCards("h")) < Math.abs(event.targets[0].countCards("e") - event.targets[1].countCards("e")) ? 0 : 1;
			} else {
				let diff = event.targets[0].countCards("h") - event.targets[1].countCards("h") + 1.2 * (event.targets[1].countCards("e") - event.targets[0].countCards("e"));
				choice = (diff > 0) ^ (get.attitude(player, event.targets[0]) > get.attitude(player, event.targets[1])) ? 0 : 1;
			}
			player
				.chooseControl(["手牌区", "装备区"], true)
				.set("prompt2", `令${get.translation(event.targets[0])}与${get.translation(event.targets[1])}交换一个区域内的所有牌`)
				.set("ai", () => _status.event.choice)
				.set("choice", choice);
			"step 2"
			switch (result.index) {
				case 0:
					event.targets[0].swapHandcards(event.targets[1]);
					event.diff = Math.abs(event.targets[0].countCards("h") - event.targets[1].countCards("h"));
					break;
				case 1:
					event.targets[0].swapEquip(event.targets[1]);
					event.diff = Math.abs(event.targets[0].countCards("e") - event.targets[1].countCards("e"));
					break;
			}
			if (Math.sign(get.attitude(player, event.targets[0])) != Math.sign(get.attitude(player, event.targets[0])) && event.targets.some(p => p.ai.shown > player.ai.shown)) {
				player.addExpose(0.2);
			}
			"step 3"
			if (event.diff != 0 && player.countDiscardableCards(player, "he") != 0) {
				player.chooseToDiscard(event.diff, "he", true);
			}
		},
	},
	jlsg_diancai: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return (
				game.countPlayer(current => {
					return current.hasHistory("lose", evt => evt.cards2?.length);
				}) >= 2
			);
		},
		async cost(event, trigger, player) {
			const list = {};
			for (let current of game.players) {
				const cnt = current
					.getHistory("lose", evt => evt.cards2.length)
					.map(evt => evt.cards2.length)
					.reduce((sum, num) => sum + num, 0);
				if (cnt > 0) {
					list[current.playerid] = cnt;
				}
			}
			const next = player
				.chooseTarget(2, get.prompt2("jlsg_diancai"))
				.set("filterTarget", (_, player, target) => get.event("list")[target.playerid] > 0)
				.set("ai")
				.set("ai", target => get.event("choice").includes(target))
				.set(
					"choice",
					(function () {
						let vMax = -Infinity,
							aiTargets = [null, null];
						for (let current1 of game.players) {
							if (get.effect(current1, { name: "draw" }, player, player) <= 0) {
								continue;
							}
							for (let current2 of game.players) {
								if (get.effect(current2, { name: "draw" }, player, player) <= 0) {
									continue;
								}
								let v = list[current1.playerid] + list[current2.playerid];
								if (v > vMax) {
									vMax = v;
									aiTargets = [current1, current2];
								}
							}
						}
						return aiTargets;
					})()
				)
				.set("list", list);
			next.targetprompt2.add(target => {
				const list = get.event("list");
				if (list[target.playerid] < 0) {
					return false;
				}
				return get.cnNumber(list[target.playerid], true);
			});
			event.result = await next.forResult();
			if (event.result?.bool) {
				event.result.targets.sortBySeat();
				let [target1, target2] = event.result.targets;
				event.result.cost_data = { info: {} };
				event.result.cost_data.info[target1.playerid] = list[target2.playerid];
				event.result.cost_data.info[target2.playerid] = list[target1.playerid];
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target1, target2],
				cost_data: { info },
			} = event;
			await game.asyncDraw([target1, target2], [info[target1.playerid], info[target2.playerid]]);
			if (event.targets.some(target => target.ai.shown > player.ai.shown)) {
				player.addExpose(0.1);
			}
		},
	},
	jlsg_zhendu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		check(event, player) {
			if (event.player == player) {
				return true;
			}
			let chance = 0.5;
			chance += Math.sign(get.attitude(player, event.player)) * -0.25;
			if (get.attitude(player, event.player) > 0 == event.player.hp > 1) {
				chance += 0.2;
			}
			return Math.random() < chance;
		},
		content() {
			"step 0"
			var target = trigger.player;
			target.addTempSkill("jlsg_zhendu2", "phaseAfter");
			target.markAuto("jlsg_zhendu2", [player]);

			if (target != player) {
				target.loseHp();
			}
		},
		logTarget: "player",
		ai: {
			expose: 0.2,
		},
	},
	jlsg_zhendu2: {
		forced: true,
		trigger: { source: "damageBegin1" },
		filter(event, player) {
			return player.getStorage("jlsg_zhendu2").some(p => p != event.player);
		},
		content() {
			trigger.num += player.getStorage("jlsg_zhendu2").filter(p => p != trigger.player).length;
		},
		mark: true,
		intro: {
			content(storage, player, skill) {
				return `本回合造成伤害+${storage.length}`;
			},
		},
	},
	jlsg_qiluan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseEnd" },
		filter(event, player) {
			return event.player.isIn();
		},
		direct: true,
		content() {
			"step 0"
			var prompt = `###${get.prompt(event.name, trigger.player)}###其视为对你选择的角色使用一张【杀】`;
			player
				.chooseTarget(prompt, (_, player, target) => _status.event.target.canUse({ name: "sha" }, target, false))
				.set("target", trigger.player)
				.set("ai", (target, targets) => get.effect(target, { name: "sha" }, _status.event.player) + 3);
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.logSkill(event.name);
			trigger.player.useCard({ name: "sha" }, result.targets, "noai");
			"step 2"
			player.draw(game.getGlobalHistory("changeHp").length);
		},
	},
	jlsg_wurong: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return player != target && target.countCards("h");
		},
		frequent: true,
		content() {
			"step 0"
			player.choosePlayerCard(target, true, "h");
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			target.showCards(result.cards);
			event.card = result.cards[0];
			let type = get.type2(result.cards[0]);
			let prompt2 = `弃置非${get.translation(type)}牌对其造成一点伤害，或弃置${get.translation(type)}并获得${get.translation(result.cards[0])}`;
			player
				.chooseToDiscard()
				.set("ai", card => {
					if (get.attitude(_status.event.player, _status.event.target) > 0) {
						return -1;
					}
					let value = get.value(card);
					if (get.type2(card) == get.type2(_status.event.card)) {
						value += _status.event.target.countCards("h") > 1 ? 2 : -2;
						value += Math.random() * 2;
					}
					return value;
				})
				.set("card", result.cards[0])
				.set("target", target)
				.set("prompt2", prompt2);
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			event.same = get.type2(event.card) == get.type2(result.cards[0]);
			if (!event.same) {
				let skills = target.getSkills(null, false, false).filter(function (i) {
					var info = get.info(i);
					return info && !info.charlotte && !get.is.locked(i);
				});
				if (!skills.length) {
					target.damage();
					return;
				}
				if (skills.length == 1) {
					event._result = { index: 0, control: skills[0] };
				}
				player
					.chooseControl(skills)
					.set("prompt", "请选择要禁用的技能")
					.set("aiSkill", skills.randomGet())
					.set("ai", () => _status.event.aiSkill);
			} else {
				player.gain(target, event.card, "giveAuto");
			}
			"step 3"
			if (event.same) {
				if (!target.countCards("h")) {
					event.finish();
					return;
				}
				player.chooseBool(`是否重复此流程？`).frequentSkill = event.name;
			} else {
				target.addTempSkill("jlsg_wurong2");
				target.popup(result.control, "gray");
				target.storage.jlsg_wurong2 = target.storage.jlsg_wurong2 || [];
				target.storage.jlsg_wurong2.add(result.control);
				target.disableSkill("jlsg_wurong2", result.control);
				game.log(target, "的技能", "#g【" + get.translation(result.control) + "】", "回合内失效了");
				target.damage();
				event.finish();
			}
			"step 4"
			if (result.bool) {
				event.goto(0);
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
				target: -1,
			},
		},
	},
	jlsg_wurong2: {
		onremove: function (player, skill) {
			player.enableSkill(skill);
		},
		locked: true,
		mark: true,
		charlotte: true,
		intro: {
			content: function (storage, player, skill) {
				var list = [];
				for (var i in player.disabledSkills) {
					if (player.disabledSkills[i].includes(skill)) {
						list.push(i);
					}
				}
				if (list.length) {
					var str = "失效技能：";
					for (var i = 0; i < list.length; i++) {
						if (lib.translate[list[i] + "_info"]) {
							str += get.translation(list[i]) + "、";
						}
					}
					return str.slice(0, str.length - 1);
				}
			},
		},
	},
	jlsg_shanjia: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			globalFrom(from, to, distance) {
				if (from.hasEmptySlot(4)) {
					return distance - 2;
				}
			},
			globalTo(from, to, distance) {
				if (to.hasEmptySlot(3)) {
					return distance + 2;
				}
			},
		},
		forced: true,
		trigger: { player: "useCard" },
		filter(event, player) {
			if (event.card.name == "sha") {
				if (!player.hasEmptySlot(4)) {
					return false;
				}
			} else if (get.type(event.card) != "trick" || ["wuxie", "tiesuo"].includes(event.card.name) || !player.hasEmptySlot(3)) {
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			trigger.effectCount += 1;
		},
		ai: {
			effect: {
				target(card, player, target) {
					let subtype = get.subtype(card);
					if (player == target) {
						if ((["equip3", "equip6"].includes(subtype) && target.hasEmptySlot(3)) || (["equip4", "equip6"].includes(subtype) && target.hasEmptySlot(4))) {
							return 0;
						}
					}
				},
			},
		},
	},
	jlsg_jili: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCardAfter" },
		filter(event, player) {
			if (get.type2(event.card) == "trick") {
				return false;
			}
			return game.hasPlayer(p => p != player && p.inRangeOf(player) && p.countCards("he"));
		},
		check(event, player) {
			if (player.getHistory("useCard").length <= player.getAttackRange()) {
				return true;
			}
			return (
				game
					.filterPlayer(p => p != player && p.inRangeOf(player) && p.countCards("he"))
					.map(p => Math.sign(get.attitude(player, p)))
					.reduce((a, b) => a + b, 0) < 0
			);
		},
		locked: false,
		content() {
			"step 0"
			event.targets = game.filterPlayer(p => p != player && p.inRangeOf(player) && p.countCards("he")).sortBySeat();
			event.discardEvents = [];
			for (let p of event.targets) {
				let card = p.getCards("he").randomGet();
				if (!card) {
					continue;
				}
				let next = p.discard(card, "notBySelf");
				next.delay = false;
				event.discardEvents.push(next);
				game.delayex(0.5);
			}
			"step 1"
			if (player.getHistory("useCard").length <= player.getAttackRange()) {
				// TODO: better handling of discard failure
				player.draw(event.discardEvents.length);
			}
		},
		mod: {
			aiOrder: function (player, card, num) {
				if (get.subtype(card) == "equip4" && !get.cardtag(card, "gifts")) {
					return num + 8;
				}
				if (get.type2(card) == "trick") {
					return num / 2;
				}
				if (get.subtype(card) == "equip1" && !get.cardtag(card, "gifts")) {
					var range0 = player.getAttackRange();
					var range = 0;
					var info = get.info(card);
					if (info && info.distance && info.distance.attackFrom) {
						range -= info.distance.attackFrom;
					}
					if (range > range0) {
						return num + 10 + range;
					}
				}
			},
		},
	},
	jlsg_dujin: {
		audio: "ext:极略/audio/skill:2",
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == "sha") {
					return Infinity;
				}
			},
			aiOrder: function (player, card, num) {
				if (!card || card.name !== "sha") {
					return;
				}
				let evt = _status.event.getParent("phaseUse");
				if (evt.name == "phaseUse" && !player.hasHistory("useCard", e => e.card.name == "sha" && e.getParent("phaseUse") === evt)) {
					return;
				}
				return num - 10;
			},
		},
		forced: true,
		trigger: {
			player: "useCard",
		},
		filter: function (event, player) {
			return player.isPhaseUsing() && event.card.name == "sha";
		},
		content() {
			let evt = trigger.getParent("phaseUse");
			if (player.hasHistory("useCard", e => e != trigger && e.card.name == "sha" && e.getParent("phaseUse") === evt)) {
				return;
			}
			trigger.directHit.addArray(game.players);
			trigger.baseDamage += 1;
		},
		group: "jlsg_dujin2",
		ai: {
			directHit_ai: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && arg.card && arg.card.name == "sha") {
					let evt = _status.event.getParent("phaseUse");
					return evt.name == "phaseUse" && !player.hasHistory("useCard", e => e.card.name == "sha" && e.getParent("phaseUse") === evt);
				}
			},
		},
	},
	jlsg_dujin2: {
		audio: false,
		trigger: {
			player: ["shaMiss", "eventNeutralized"],
		},
		forced: true,
		check: false,
		filter: function (event, player) {
			if (event.type != "card" || event.card.name != "sha" || !event.target.isIn()) {
				return false;
			}
			return true;
		},
		content() {
			player.damage(trigger.target);
		},
		ai: {
			neg: true,
		},
	},
	jlsg_sanjue: {
		init(player, skill) {
			player.setStorage(
				skill,
				{
					card: {},
					map: {},
					given: [],
				},
				true
			);
		},
		onremove: true,
		intro: {
			nocount: true,
			mark(dialog, content, player) {
				const recordSkills = Object.entries(player.getStorage("jlsg_sanjue", {}).map || {});
				if (recordSkills && recordSkills.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addText(`储备技能数：${recordSkills.map(i => i[1]).flat().length}`);
						dialog.add([recordSkills, lib.skill.jlsg_sanjue.$createButton]);
					} else {
						return "共有" + get.cnNumber(recordSkills.length) + "个储备技能";
					}
				}
			},
		},
		audio: "ext:极略/audio/skill:3",
		onChooseToUse(event) {
			if (game.online) {
				return;
			}
			let buttons = [],
				storage = Object.entries(event.player.getStorage("jlsg_sanjue", {}).map || {});
			if (!storage || !storage.length) {
				return;
			}
			for (let info of storage) {
				if (!info[1].length) {
					continue;
				}
				for (let skill of info[1]) {
					buttons.push([info[0], [skill]]);
				}
			}
			event.set("jlsg_sanjue", buttons);
		},
		enable: "phaseUse",
		direct: true,
		filter(event, player) {
			return event.jlsg_sanjue?.length;
		},
		chooseButton: {
			dialog(event, player) {
				let dialog = ui.create.dialog("三绝：请选择要给予的技能");
				dialog.add([event.jlsg_sanjue, lib.skill.jlsg_sanjue.$createButton]);
				return dialog;
			},
			check() {
				return true;
			},
			backup(links, player) {
				const [character, [skill]] = links[0];
				return {
					audio: "jlsg_sanjue",
					info: [character, skill],
					filterTarget: () => true,
					selectCard: -1,
					filterCard: () => false,
					async content(event, trigger, player) {
						const target = event.targets[0],
							[character, skill] = get.info(event.name).info,
							storage = player.getStorage("jlsg_sanjue", { card: {}, map: {}, given: [] });
						for (const name in storage.map) {
							if (name == character) {
								storage.map[name].remove(skill);
							}
							if (!storage.map[name].length) {
								delete storage.map[name];
							}
						}
						storage.given.add(skill);
						await target.addSkills(skill);
						target.flashAvatar("jlsg_sanjue", character);
						player.setStorage("jlsg_sanjue", storage, true);
					},
					ai2(target) {
						const event = get.event(),
							player = get.player(),
							skill = get.info("jlsg_sanjue_backup").info[1];
						const info = get.info(skill);
						const negative = info?.ai?.neg,
							att = Math.min(2, Math.max(-2, get.attitude(player, target)));
						if (event.getStepCache("cntSkillsList") === undefined) {
							const targets = get.selectableTargets().concat([target]),
								cntSkillsList = [],
								hsList = [],
								hpList = [];
							for (let targetx of targets) {
								if (get.attitude(player, targetx) <= 0) {
									continue;
								}
								const cntSkills = targetx.getSkills(null, false).length,
									hs = targetx.countCards("h"),
									hp = target.getHp();
								cntSkillsList.add(cntSkills);
								hsList.add(hs);
								hpList.add(hp);
							}
							event.putStepCache(
								"cntSkillsList",
								cntSkillsList.sort((a, b) => b - a)
							);
							event.putStepCache(
								"hsList",
								hsList.sort((a, b) => a - b)
							);
							event.putStepCache(
								"hpList",
								hpList.sort((a, b) => a - b)
							);
						}
						const cntSkills = event.getStepCache("cntSkillsList").indexOf(target.getSkills(null, false)) + 1,
							hs = event.getStepCache("hsList").indexOf(target.countCards("h")) + 1,
							hp = event.getStepCache("hpList").indexOf(target.getHp()) + 1;
						if (att < 0 && negative) {
							return att;
						} else if (att > 0 && !negative) {
							if (info.ai?.combo ?? false) {
								if (target.hasSkill(info.ai.combo)) {
									return 2 + att * (cntSkills + hs + hp);
								}
							}
							return att * (cntSkills + hs + hp);
						}
						return 0;
					},
				};
			},
			prompt(links, player) {
				const [name, [skill]] = links[0];
				return `令一名角色获得【${get.translation(name)}】
					<br><div class="text">${get.skillInfoTranslation(skill, player)}</div>`;
			},
		},
		$createButton(item, type, position, noclick, node) {
			const [name, skills] = item;
			node = ui.create.buttonPresets.character(name, "character", position, noclick);
			const info = get.character(name);
			if (skills.length) {
				const skillstr = skills.map(i => `[${get.translation(i)}]`).join("<br>");
				const skillnode = ui.create.caption(`<div class="text" data-nature=${get.groupnature(info.group, "raw")}m style="font-family: ${lib.config.name_font || "xinwei"},xinwei">${skillstr}</div>`, node);
				skillnode.style.left = "2px";
				skillnode.style.bottom = "2px";
			}
			node.link = item;
			node._customintro = function (uiintro, evt) {
				const [character, skills] = node.link;
				const characterInfo = get.character(character);
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

				if (lib.characterTitle[character]) {
					uiintro.addText(get.colorspan(lib.characterTitle[character]));
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
		get getCharacters() {
			let result = game.initCharacterList(false).filter(name => get.character(name, 1) == "wu");
			delete this.getCharacters;
			this.getCharacters = result;
			return result;
		},
		group: "jlsg_sanjue_use",
		subSkill: {
			backup: { sourceSkill: "jlsg_sanjue" },
			use: {
				audio: "jlsg_sanjue",
				trigger: { player: "useCard" },
				direct: true,
				async content(event, trigger, player) {
					const storage = player.getStorage("jlsg_sanjue", { card: {}, map: {}, given: [] });
					let cardName = trigger.card.name;
					if (cardName == "sha") {
						let nature = get.nature(trigger.card);
						if (nature) {
							cardName = `${nature}_sha`;
						}
					}
					storage.card[cardName] ??= 0;
					storage.card[cardName]++;
					let cnt = storage.card[cardName];
					player.setStorage("jlsg_sanjue", storage, true);
					if (cnt != 1 && cnt != 3) {
						return;
					}
					await player.logSkill(event.name);
					await player.draw();
					let characterList = get.info("jlsg_sanjue").getCharacters.randomSort();
					const { map, given } = storage;
					const recordSkills = Object.values(map).flat();
					for (let name of characterList) {
						let skills = get.character(name)[3];
						if (!skills || !skills.length) {
							continue;
						}
						skills = skills.filter(skill => {
							if (given.includes(skill) || recordSkills.includes(skill)) {
								return false;
							}
							return !lib.filter.skillDisabled(skill) && !get.info(skill)?.charlotte;
						});
						skills.removeArray(
							game.filterPlayer().reduce((list, current) => {
								list.addArray(current.getSkills(null, false, false));
								return list;
							}, [])
						);
						if (!skills.length) {
							continue;
						}
						storage.map[name] ??= [];
						storage.map[name].add(skills.randomGet());
						player.setStorage("jlsg_sanjue", storage, true);
						break;
					}
				},
			},
		},
		ai: {
			order(skill, player) {
				const recordSkills = Object.entries(player.getStorage("jlsg_sanjue", {}).map || {});
				if (!recordSkills.length) {
					return 0;
				} else {
					for (let skill of recordSkills) {
						const info = get.info(skill);
						if (!info || (info && info.ai && info.ai.neg)) {
							if (game.hasPlayer(c => get.attitude(player, c) < 0)) {
								return 12;
							}
						} else {
							return 12;
						}
					}
				}
				return 8;
			},
			result: {
				player: 1,
			},
			effect: {
				player(card, player) {
					const record = player.getStorage("jlsg_sanjue", { card: {}, map: {}, given: [] }).card;
					let cardName = card.name;
					if (cardName == "sha") {
						let nature = get.nature(card);
						if (nature) {
							cardName = `${nature}_sha`;
						}
					}
					if (!record[cardName] || record[cardName] == 2) {
						return [1, 1];
					}
				},
			},
		},
	},
	jlsg_canshi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["recoverAfter", "gainMaxHpAfter"],
			player: "damageEnd",
		},
		filter(event, player) {
			if (event.name == "damage") {
				return event.source && event.source != player;
			}
			return event.player != player;
		},
		check: () => true,
		marktext: "蚕",
		intro: {
			name: "蚕食",
			name2: "蚕",
			content: "mark",
		},
		content() {
			"step 0"
			var target = trigger.player;
			if (trigger.name == "damage") {
				target = trigger.source;
			}
			target.addMark("jlsg_canshi");
			"step 1"
			player.draw(2);
		},
		global: "jlsg_canshi_debuff",
		subSkill: {
			debuff: {
				mod: {
					maxHandcard: function (player, num) {
						return num - player.countMark("jlsg_canshi");
					},
				},
			},
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			maixie_defend: true,
		},
	},
	jlsg_xianji: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		filter(event, player) {
			return game.hasPlayer(p => p != player && p.countMark("jlsg_canshi") > p.maxHp && !p.storage.jlsg_xianji);
		},
		direct: true,
		skillAnimation: true,
		animationColor: "metal",
		intro: {
			content: "无法作为〖献祭〗的目标",
		},
		content() {
			"step 0"
			player.chooseTarget(get.prompt2(event.name), (_, player, target) => target != player && target.countMark("jlsg_canshi") > target.maxHp && !target.storage.jlsg_xianji).set("ai", () => Math.random());
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			player.storage.jlsg_xianji = true;
			player.markSkill("jlsg_xianji");
			var target = result.targets[0];
			event.target = target;
			player.logSkill(event.name, target);
			target.removeMark("jlsg_canshi");

			var targetSkills = target.getSkills(null, false, false).filter(function (i) {
				var info = get.info(i);
				return info && !info.charlotte;
			});
			if (targetSkills.length) {
				player.gainMaxHp(targetSkills.length);
				player.recover(targetSkills.length);
			}
			"step 2"
			var target = event.target;
			var skills = player.getSkills(null, false, false).filter(function (i) {
				var info = get.info(i);
				return info && !info.charlotte;
			});
			var targetSkills = target.getSkills(null, false, false).filter(function (i) {
				var info = get.info(i);
				return info && !info.charlotte;
			});
			player.changeSkills(targetSkills, skills);
			target.changeSkills(skills, targetSkills);
		},
	},
	jlsg_hanyong: {
		audio: "ext:极略/audio/skill:2",
		group: ["jlsg_hanyong_guanshi", "jlsg_hanyong_tengjia1", "jlsg_hanyong_tengjia2", "jlsg_hanyong_tengjia3"],
		subSkill: {
			guanshi: {
				audio: "jlsg_hanyong",
				audioname: false,
				inherit: "guanshi_skill",
				locked: false,
				mod: {
					attackRange: function (player, num) {
						if (lib.card.guanshi && player.hasEmptySlot(1)) {
							return num - lib.card.guanshi.distance.attackFrom;
						}
					},
				},

				filter: function (event, player) {
					if (!lib.skill.guanshi_skill.filter(event, player)) {
						return false;
					}
					if (!player.hasEmptySlot(1)) {
						return false;
					}
					return true;
				},
				get content() {
					let content = lib.skill.guanshi_skill.content.toString();
					content = get.pureFunctionStr(content).replaceAll("guanshi_skill", "jlsg_hanyong_guanshi");
					content = new Function("return " + content)();
					delete this.content;
					this.content = content;
					return content;
				},
				ai: {
					directHit_ai: true,
					skillTagFilter: function (player, tag, arg) {
						if (!player.hasEmptySlot(2)) {
							return;
						}
						return lib.skill.guanshi_skill.ai.skillTagFilter.apply(this, arguments);
					},
					effect: {
						target: function (card, player, target) {
							if (player == target && get.subtype(card) == "equip2") {
								if (!target.hasEmptySlot(2) && get.equipValue(card) <= 7.5) {
									return 0;
								}
							}
						},
					},
				},
			},
			tengjia1: {
				audio: "jlsg_hanyong",
				audioname: false,
				inherit: "tengjia1",
				equipSkill: true,
				filter: function (event, player) {
					if (!lib.skill.tengjia1.filter(event, player)) {
						return false;
					}
					if (!player.hasEmptySlot(2)) {
						return false;
					}
					return true;
				},
				ai: {
					effect: {
						target: function (card, player, target) {
							if (player == target && get.subtype(card) == "equip2") {
								if (get.equipValue(card) <= 5) {
									return 0;
								}
							}
							if (!target.hasEmptySlot(2)) {
								return;
							}
							return lib.skill.tengjia1.ai.effect.target.apply(this, arguments);
						},
					},
				},
			},
			tengjia2: {
				// use stock audio
				inherit: "tengjia2",
				equipSkill: true,
				filter: function (event, player) {
					if (!lib.skill.tengjia2.filter(event, player)) {
						return false;
					}
					if (!player.hasEmptySlot(2)) {
						return false;
					}
					return true;
				},
				ai: {
					fireAttack: true,
					skillTagFilter: function (player, tag, arg) {
						if (!player.hasEmptySlot(2)) {
							return;
						}
						return true;
					},
					effect: {
						target: function (card, player, target, current) {
							if (!target.hasEmptySlot(2)) {
								return;
							}
							return lib.skill.tengjia2.ai.effect.target.apply(this, arguments);
						},
					},
				},
			},
			tengjia3: {
				audio: "jlsg_hanyong",
				audioname: false,
				inherit: "tengjia3",
				equipSkill: true,
				filter: function (event, player) {
					if (!lib.skill.tengjia3.filter(event, player)) {
						return false;
					}
					if (!player.hasEmptySlot(2)) {
						return false;
					}
					return true;
				},
			},
		},
	},
	jlsg_lingruo: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player) {
			if (event.player == event.target) {
				return false;
			}
			return event.card.name == "sha" || get.type(event.card) == "trick";
		},
		check(event, player) {
			let target = event.target;
			if (event.target == player) {
				target = event.player;
			}
			if (target.countCards("he") == 0) {
				return true;
			}
			return get.attitude(player, target) <= 1;
		},
		logTarget(event, player) {
			if (event.name == "useCardToPlayered") {
				return event.target;
			}
			return event.player;
		},
		content() {
			"step 0"
			event.target = trigger.target;
			if (event.target == player) {
				event.target = trigger.player;
			}
			if (event.target.countCards("he") > 0 && event.target.ai.shown > player.ai.shown) {
				player.addExpose(0.1);
			}
			event.cnt = ["basic", "trick", "equip"].filter(t => player.countCards("he", { type: t }) > event.target.countCards("he", { type: t })).length;
			"step 1"
			if (event.cnt > 0) {
				--event.cnt;
			} else {
				event.finish();
				return;
			}
			let choice;
			if (event.target.countCards("he") == 0) {
				choice = 0;
			} else {
				let dist = [1, 1, 1];
				// option 1 & 2 are less likely to happen consecutively
				if (event.choice) {
					dist[event.choice] -= 0.5;
				}
				choice = jlsg.distributionGet(dist);
			}
			event.choice = choice;
			switch (choice) {
				case 0:
					player.draw();
					break;
				case 1:
					var card = target.getCards("he").randomGet();
					if (card) {
						player.gain(card, target, "giveAuto");
					}
					break;
				case 2:
					var card = target.getCards("he").randomGet();
					if (card) {
						target.discard(card, "notBySelf").discarder = player;
					}
					break;
			}
			event.redo();
		},
	},
	jlsg_fujian: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content() {
			"step 0"
			player.chooseTarget(get.prompt2(event.name), (_, player, target) => player != target && target.countCards("h")).set("ai", target => (get.attitude(_status.event.player, target) > 0 ? 0 : target.countCards("h") + 2 * Math.random()));
			"step 1"
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = result.targets[0];
			event.target = target;
			player.logSkill(event.name, result.targets);
			player.choosePlayerCard(target, "h", true, "visible", () => Math.random());
			"step 2"
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = event.target;
			if (!target.storage.jlsg_fujian) {
				target.storage.jlsg_fujian = new Map();
			}
			var cards = target.storage.jlsg_fujian.get(player) || [];
			cards.push([result.cards[0], 0]);
			target.storage.jlsg_fujian.set(player, cards);

			target.addSkill("jlsg_fujian2");
		},
	},
	jlsg_fujian2: {
		charlotte: true,
		silent: true,
		trigger: { player: "useCard" },
		content() {
			let added = false;
			for (let v of player.storage.jlsg_fujian.values()) {
				for (let a of v) {
					added = true;
					a[1] += 1;
				}
			}
			if (!added) {
				player.removeSkill(event.name);
			}
		},
		group: "jlsg_fujian3",
	},
	jlsg_fujian3: {
		audio: "jlsg_fujian",
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		charlotte: true,
		silent: true,
		content() {
			"step 0"
			var evt = trigger.getl(player);
			var cards = (evt.hs || []).concat(evt.es || []);
			if (!cards.length) {
				event.finish();
				return;
			}
			var result = [];
			event.result = result;
			var sources = [...player.storage.jlsg_fujian.keys()].sortBySeat();
			for (let lostCard of cards) {
				for (let source of sources) {
					let cards = player.storage.jlsg_fujian.get(source);
					cards = cards.filter(([card, cnt]) => {
						if (lostCard == card) {
							result.push([source, cnt]);
						}
						return lostCard != card;
					});
					player.storage.jlsg_fujian.set(source, cards);
				}
			}
			"step 1"
			if (!event.result.length) {
				event.finish();
				return;
			}
			let [source, cnt] = event.result.shift();
			if (source.isIn() && source.hasSkill("jlsg_fujian")) {
				source.logSkill("jlsg_fujian", player);
				player.loseHp();
				source.draw(cnt);
			}
			event.redo();
		},
	},
	jlsg_fengyin: {
		audio: "ext:极略/audio/skill:2",
		trigger: { source: "damageBegin1" },
		logTarget: "player",
		filter(event, player) {
			if (!event.card || event.player == player) {
				return false;
			}
			if (event.card.name == "sha" && !player.hasSkill("jlsg_fengyin_sha")) {
				return true;
			}
			if (event.card.name == "juedou" && !player.hasSkill("jlsg_fengyin_juedou")) {
				return true;
			}
			return false;
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0;
		},
		content() {
			"step 0"
			player.addTempSkill("jlsg_fengyin_" + trigger.card.name);
			var criteria = { suit: "diamond" };
			if (lib.skill.jlsg_rongzhuang.escalate(player)) {
				criteria = { color: "red" };
			}
			player.draw(player.countCards("h", criteria));
			trigger.num += trigger.player.countCards("h", criteria);
		},
		combo: "jlsg_rongzhuang",
		subSkill: {
			sha: {},
			juedou: {},
		},
	},
	jlsg_rongzhuang: {
		audio: "ext:极略/audio/skill:2",
		escalate(player) {
			return player.getEquips(1).length && player.getEquips(2).length;
		},
		trigger: { player: "useCard1" },
		forced: true,
		filter(event, player) {
			return event.card.name == "sha" && ((player.getEquips(1).length && player.countUsed("sha", true) > 1 && event.getParent().type == "phase") || player.getEquips(2).length);
		},
		content() {
			trigger.audioed = true;
			if (player.getEquips(2).length) {
				trigger.directHit.addArray(
					game.filterPlayer(function (current) {
						return current != player;
					})
				);
			}
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "sha") {
					return Infinity;
				}
			},
		},
		ai: {
			directHit_ai: true,
		},
	},
	jlsg_huomo: {
		audio: "ext:极略/audio/skill:2",
		enable: "chooseToUse",
		hiddenCard: function (player, name) {
			if (get.type(name) != "basic") {
				return false;
			}
			const list = player.getStorage("jlsg_huomo");
			if (list.includes(name)) {
				return false;
			}
			return player.countCards("he", { color: "black" });
		},
		filter: function (event, player) {
			if (event.type == "wuxie" || !player.countCards("he", { color: "black" })) {
				return false;
			}
			const list = player.getStorage("jlsg_huomo");
			for (var name of lib.inpile) {
				if (get.type(name) != "basic" || list.includes(name)) {
					continue;
				}
				var card = { name: name, isCard: true };
				if (event.filterCard(card, player, event)) {
					return true;
				}
				if (name == "sha") {
					for (var nature of lib.inpile_nature) {
						card.nature = nature;
						if (event.filterCard(card, player, event)) {
							return true;
						}
					}
				}
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				const vcards = [];
				const list = player.getStorage("jlsg_huomo");
				for (let name of lib.inpile) {
					if (get.type(name) != "basic" || list.includes(name)) {
						continue;
					}
					let card = { name: name, isCard: true };
					if (event.filterCard(card, player, event)) {
						vcards.push(["基本", "", name]);
					}
					if (name == "sha") {
						for (let nature of lib.inpile_nature) {
							card.nature = nature;
							if (event.filterCard(card, player, event)) {
								vcards.push(["基本", "", name, nature]);
							}
						}
					}
				}
				return ui.create.dialog("活墨", [vcards, "vcard"], "hidden");
			},
			check: function (button) {
				const player = _status.event.player;
				const card = { name: button.link[2], nature: button.link[3] };
				if (
					game.hasPlayer(function (current) {
						return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
					})
				) {
					switch (button.link[2]) {
						case "tao":
							return 5;
						case "jiu":
							return 3.01;
						case "sha":
							if (button.link[3] == "fire") {
								return 2.95;
							} else if (button.link[3] == "thunder") {
								return 2.92;
							} else {
								return 2.9;
							}
						case "shan":
							return 1;
					}
				}
				return 0;
			},
			backup: function (links, player) {
				return {
					check: function (card) {
						return 1 / Math.max(0.1, get.value(card));
					},
					filterCard: function (card) {
						return get.color(card) == "black";
					},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					position: "he",
					popname: true,
					ignoreMod: true,
					precontent: function () {
						if (!player.storage.jlsg_huomo) {
							player.when({ global: ["phaseAfter", "phaseBefore"] }).then(() => {
								player.unmarkSkill("jlsg_huomo");
							});
						}
						player.markAuto("jlsg_huomo", event.result.card.name);
					},
				};
			},
			prompt: function (links, player) {
				return "将一张黑色牌当作" + get.translation(links[0][3] || "") + get.translation(links[0][2]);
			},
		},
		marktext: "墨",
		intro: {
			content: "本回合已因〖活墨〗使用过$",
			onunmark: true,
		},
		ai: {
			order: function () {
				var player = _status.event.player;
				var event = _status.event;
				var list = player.getStorage("jlsg_huomo");
				if (!list.includes("jiu") && event.filterCard({ name: "jiu" }, player, event) && get.effect(player, { name: "jiu" }) > 0) {
					return 3.1;
				}
				return 2.9;
			},
			respondSha: true,
			fireAttack: true,
			respondShan: true,
			skillTagFilter: function (player, tag, arg) {
				if (tag == "fireAttack") {
					return true;
				}
				if (
					player.hasCard(function (card) {
						return get.color(card) == "black";
					}, "he")
				) {
					var list = player.getStorage("jlsg_huomo");
					if (tag == "respondSha") {
						if (arg != "use") {
							return false;
						}
						if (list.includes("sha")) {
							return false;
						}
					} else if (tag == "respondShan") {
						if (list.includes("shan")) {
							return false;
						}
					}
				} else {
					return false;
				}
			},
			result: {
				player: 1,
			},
		},
	},
	jlsg_dingguan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardToPlayered" },
		filter(event, player) {
			if (!event.isFirstTarget) {
				return false;
			}
			return (
				get.color(event.card) == "black" &&
				event.player.isPhaseUsing() &&
				event.targets &&
				event.targets.length &&
				!game.hasPlayer2(function (current) {
					return current.getHistory("damage").length > 0;
				})
			);
		},
		direct: true,
		content() {
			"step 0"
			player
				.chooseTarget(
					get.prompt("jlsg_dingguan"),
					"令目标角色摸一张牌",
					function (card, player, target) {
						return _status.event.targets.includes(target);
					},
					[1, trigger.targets.length]
				)
				.set("ai", function (target) {
					return get.attitude(_status.event.player, target);
				})
				.set("targets", trigger.targets);
			"step 1"
			if (result.bool) {
				player.logSkill("jlsg_dingguan", result.targets);
				game.asyncDraw(result.targets.sortBySeat());
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_xianshou: {
		audio: "ext:极略/audio/skill:2",
		derivation: "jlsg_tiandao",
		trigger: { player: "phaseBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`仙授：选择一名角色，令其获得天道，若已拥有，则改为判定`)
				.set("ai", (target, targets) => {
					const player = get.player();
					const bool = player.hasSkill("spshicai") || player.hasSkill("yjshicai") || _status.pileTop?.isKnownBy(player);
					const bool2 = bool ? get.suit(_status.pileTop, player) != "spade" : Math.random() > 0.3;
					const bool3 = bool ? get.suit(_status.pileTop, player) == "spade" : Math.random() > 0.7;
					if (get.attitude(player, target) > 0) {
						if (!target.hasSkill("jlsg_tiandao")) {
							return 1.5;
						}
						if (targets) {
							for (let i of targets) {
								if (get.attitude(player, i) > 0 && !i.hasSkill("jlsg_tiandao")) {
									return 0;
								}
							}
						}
						return target.hasSkill("jlsg_tiandao") && bool2;
					}
					return target.hasSkill("jlsg_tiandao") && bool3;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			if (!target.hasSkill("jlsg_tiandao")) {
				await target.addSkills(["jlsg_tiandao"]);
			} else {
				const suit = await player.judge("jlsg_xianshou").forResult("suit");
				const num = [0, 1, 2, 3].randomGet();
				if (suit != "spade") {
					target.storage.jlsg_tiandao[num]++;
				} else {
					target.storage.jlsg_tiandao[num]--;
				}
			}
			target.markSkill("jlsg_tiandao");
		},
	},
	jlsg_tiandao: {
		audio: "ext:极略/audio/skill:2",
		marktext: "道",
		mark: true,
		intro: {
			markcount: storage => storage,
			content(storage) {
				return `回合开始阶段，你摸${storage[0]}张牌，随机获得不在场上且你拥有的群势力武将的${storage[1]}个技能，然后可与选择一名角色，令其随机弃置${storage[2]}张牌，对其造成${storage[3]}点雷电伤害。`;
			},
		},
		init(player, skill) {
			player.storage[skill] = [1, 1, 1, 1];
			lib.dynamicTranslate[skill] = function (player) {
				const storage = player.storage.jlsg_tiandao;
				return `锁定技回合开始阶段，你摸${storage[0]}张牌，随机获得不在场上且你拥有的群势力武将的${storage[1]}个技能，然后可与选择一名角色，令其随机弃置${storage[2]}张牌，对其造成${storage[3]}点雷电伤害。`;
			};
		},
		onremove: true,
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		filter: (event, player) => player.storage.jlsg_tiandao.some(i => i > 0),
		async content(event, trigger, player) {
			const info = player.storage.jlsg_tiandao;
			if (info[0] > 0) {
				await player.draw(info[0]);
			}
			if (info[1] > 0) {
				const skills = lib.skill.jlsg_tiandao.getSkill(player, info[1]);
				if (skills.length) {
					await player.addSkills(skills);
				} else {
					player.chat(`没有技能了`);
				}
			}
			if (info[2] < 1 && info[3] < 1) {
				return;
			} else {
				const prompt2 = [];
				if (info[2] > 0) {
					prompt2.push(`令其随机弃置${info[2]}张牌`);
				}
				if (info[3] > 0) {
					prompt2.push(`对其造成${info[3]}点雷电伤害`);
				}
				const targets = await player
					.chooseTarget()
					.set("prompt", "天道：是否选择一名角色")
					.set("prompt2", prompt2.join("，"))
					.set("ai", target => {
						if (info[2] < 1 && info[3] < 1) {
							return 0;
						}
						let damage = get.damageEffect(target, get.player(), get.player(), "thunder"),
							discard = get.effect(target, { name: "guohe_copy2" }, get.player(), get.player());
						return damage + discard > 0;
					})
					.forResultTargets();
				if (!targets) {
					return;
				}
				await player.logSkill("jlsg_tiandao", targets[0]);
				if (info[2] > 0) {
					await targets[0].randomDiscard(info[2]);
				}
				if (info[3] > 0) {
					await targets[0].damage(player, info[3], "thunder");
				}
				await game.delayx();
			}
		},
		getSkill: function (player, num) {
			const list = [];
			if (_status.connectMode) {
				let characters = get.charactersOL();
				for (var i of characters) {
					const info = get.character(i);
					if (!info) {
						continue;
					}
					if (info[1] != "qun") {
						continue;
					}
					let list2 = info[3] ?? [];
					list.addArray(list2);
				}
			} else {
				for (var i in lib.character) {
					if (lib.filter.characterDisabled2(i) || lib.filter.characterDisabled(i)) {
						continue;
					}
					const info = lib.character[i];
					if (!info) {
						continue;
					}
					if (info[1] != "qun") {
						continue;
					}
					let list2 = get.gainableSkillsName(i, (skills, skill) => !player.hasSkill(skill));
					list.addArray(list2);
				}
			}
			const skillList = list.filter(i => {
				const skill = get.info(i);
				if (!skill || !lib.translate[i] || !lib.translate[i + "_info"]) {
					return false;
				}
				let filter = true;
				if (skill.groupSkill && skill.groupSkill != "qun") {
					return false;
				}
				if (skill.ai && skill.ai.combo) {
					filter = player.hasSkill(skill.ai.combo);
				}
				return filter && !skill.zhuSkill && !skill.limited && !skill.juexingji && !skill.hiddenSkill && !skill.charlotte && !skill.dutySkill;
			});
			if (skillList.length > num) {
				return skillList.randomGets(num);
			}
			return skillList;
		},
	},
	jlsg_chengfeng: {
		audio: "ext:极略/audio/skill:2",
		intro: {
			content: "mark",
		},
		trigger: {
			player: "damageBegin3",
			global: "phaseAfter",
		},
		filter(event, player, name) {
			if (name != "phaseAfter") {
				return event.num > 0;
			}
			return player.countMark("jlsg_chengfeng") > 1;
		},
		forced: true,
		async content(event, trigger, player) {
			if (event.triggername != "phaseAfter") {
				const suit = await player.judge("jlsg_chengfeng").forResult("suit");
				if (suit != "spade") {
					trigger.num--;
				} else {
					player.addMark("jlsg_chengfeng", 1);
				}
			} else {
				player.removeMark("jlsg_chengfeng", 2);
				player.insertPhase("jlsg_chengfeng");
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
	jlsg_kunfen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["damageEnd", "loseHpEnd", "loseMaxHpAfter"] },
		forced: true,
		content() {
			player.draw(3);
			if (player.getHistory("useSkill", evt => evt.skill == "jlsg_kunfen").length < 2) {
				player.recover();
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, "fireDamage") && target.hasSkillTag("nofire", null, { player: target, card: card })) {
						return 0;
					} else if (get.tag(card, "thunderDamage") && target.hasSkillTag("nothunder", null, { player: target, card: card })) {
						return 0;
					} else if (get.tag(card, "damage")) {
						if (!target.hasFriend()) {
							return;
						}
						if (target.hasSkillTag("nodamage", null, { player: target, card: card })) {
							return 0;
						}
						let num = 1;
						if (get.attitude(player, target) > 0) {
							if (player.needsToDiscard()) {
								num = 0.5;
							} else {
								num = 0.3;
							}
						}
						if (target.hp >= 4) {
							num = num * 2;
						}
						if (target.hp == 3) {
							num = num * 1.5;
						}
						if (target.hp == 2) {
							num = num * 0.5;
						}
						if (!target.hasHistory("useSkill", evt => evt.skill == "jlsg_kunfen")) {
							return [1, num * 1.1];
						}
						return [1, num];
					}
				},
			},
		},
	},
	jlsg_caiyu: {
		audio: "ext:极略/audio/skill:2",
		init: player => {
			player.addInvisibleSkill("jlsg_caiyu_flash");
			player.storage.jlsg_caiyu = {};
		},
		onremove: true,
		trigger: { player: "phaseZhunbeiBegin" },
		getList(player) {
			const configx = lib.config.extension_极略_jlsgsk_jiangwei;
			let list = {};
			if (!_status.characterlist) {
				game.initCharacterList();
			}
			let character = _status.characterlist.filter(name => {
				if (["character", "all"].includes(configx)) {
					if (!lib.translate[name]) {
						return false;
					}
					return lib.translate[name].includes("诸葛亮") || name.includes("zhugeliang");
				} else {
					return ["jlsgsr_zhugeliang", "sp_zhugeliang", "jlsgsoul_zhugeliang", "jlsgsoul_sp_zhugeliang"].includes(name);
				}
			});
			for (const name of character) {
				if (!get.character(name)) {
					continue;
				}
				list[name] = (get.character(name)[3] ?? []).filter(skill => {
					if (player.hasSkill(skill)) {
						return false;
					}
					const info = get.info(skill);
					if (!info) {
						return false;
					}
					let filter = true;
					if (!["skills", "all"].includes(configx)) {
						if (info.ai && info.ai.combo) {
							filter = player.hasSkill(info.ai.combo);
						}
					}
					return filter && !info.charlotte && ((info.zhuSkill && player.isZhu2()) || !info.zhuSkill);
				});
				if (!list[name] || !list[name].length) {
					delete list[name];
				}
			}
			return list;
		},
		async cost(event, trigger, player) {
			let configx = lib.config.extension_极略_jlsgsk_jiangwei,
				list = lib.skill.jlsg_caiyu.getList(player);
			let str = "###才遇：是否减1点体力上限，随机获得一个诸葛亮";
			if (["skills", "all"].includes(configx)) {
				str += "的全部技能";
			} else {
				str += "的一个技能";
			}
			if (!Object.keys(list).length) {
				str += "###<div class='center text'>（已经获得全部技能了）</div>";
			}
			const { result } = await player
				.chooseBool(str)
				.set("list", list)
				.set("ai", (event, player) => {
					const list = Object.entries(get.event("list"));
					if (player.hasSkill("jlsg_xingyun") && !player.hasSkill("shuishi")) {
						return false;
					}
					return list.length && player.maxHp > 2;
				});
			event.result = {
				bool: result.bool,
				cost_data: list,
			};
		},
		async content(event, trigger, player) {
			await player.loseMaxHp();
			const configx = lib.config.extension_极略_jlsgsk_jiangwei,
				info = event.cost_data;
			const name = Object.keys(info).randomGet();
			const skills = ["skills", "all"].includes(configx) ? info[name] : info[name]?.randomGets(1);
			if (!skills?.length) {
				return;
			}
			if (!player.storage.jlsg_caiyu[name]) {
				player.storage.jlsg_caiyu[name] = [];
			}
			if (skills.some(i => !player.storage.jlsg_caiyu[name].includes(i))) {
				player.storage.jlsg_caiyu[name].push(...skills);
			}
			player.flashAvatar(event.name, name);
			await player.addSkills(skills);
		},
		subSkill: {
			flash: {
				trigger: { player: ["logSkillBegin", "useSkillBegin", "changeSkillsAfter"] },
				filter(event, player, name) {
					if (name != "changeSkillsAfter") {
						const skill = event.sourceSkill || event.skill;
						for (let i in player.storage.jlsg_caiyu) {
							if (player.storage.jlsg_caiyu[i].includes(skill)) {
								return true;
							}
						}
						return false;
					} else {
						if (!event.getParent("jlsg_caiyu") && !event.addSkill.length) {
							return false;
						}
						let ss = game.expandSkills(event.addSkill);
						for (let s of ss) {
							if (!lib.skill[s] || !lib.skill[s].trigger) {
								continue;
							}
							let tri = lib.skill[s].trigger;
							if (tri.player) {
								if (typeof tri.player == "string") {
									tri.player = [tri.player];
								}
								if (Array.isArray(tri.player)) {
									if (tri.player.includes("enterGame")) {
										return true;
									}
								}
							}
						}
						return false;
					}
				},
				forced: true,
				popup: false,
				charlotte: true,
				async content(event, trigger, player) {
					if (event.triggername != "changeSkillsAfter") {
						const skill = trigger.sourceSkill || trigger.skill;
						for (let name in player.storage.jlsg_caiyu) {
							if (player.storage.jlsg_caiyu[name].includes(skill)) {
								player.flashAvatar("jlsg_caiyu", name);
								break;
							}
						}
					} else {
						let skills = trigger.addSkill.filter(i => {
							let ss = game.expandSkills([i]);
							for (let s of ss) {
								if (!lib.skill[s] || !lib.skill[s].trigger) {
									continue;
								}
								let tri = lib.skill[s].trigger;
								if (tri.player) {
									if (typeof tri.player == "string") {
										tri.player = [tri.player];
									}
									if (Array.isArray(tri.player)) {
										if (tri.player.includes("enterGame")) {
											return true;
										}
									}
								}
							}
							return false;
						});
						if (skills.length) {
							const next = game.createEvent("enterGame", false, { next: [] });
							for (let i of skills) {
								await game.createTrigger("enterGame", i, player, next);
							}
						}
					}
				},
			},
		},
	},
	jlsg_qinqing: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseJieshuBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(`###${get.prompt(event.skill)}###令攻击范围含有其的角色交给其一张牌`)
				.set("ai", target => {
					const player = get.event("player");
					const targets = game.filterPlayer(p => p != player && p != target).filter(p => p.countCards("he") && p.inRange(target));
					let eff = targets.map(p => -get.attitude(player, p)).reduce((a, b) => a + b, 0) + targets.length * get.attitude(player, target);
					if (target.isDamaged() && target.countCards("h") + targets.length <= player.countCards("h")) {
						eff += get.recoverEffect(target, player, player);
					}
					return eff;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			const givers = game.filterPlayer(p => p != player && p != target).filter(p => p.countCards("he") && p.inRange(target));
			for (let giver of givers) {
				if (!target.isIn()) {
					return;
				}
				if (!giver.isIn()) {
					continue;
				}
				await giver.chooseToGive(target, true, "he");
			}
			if (!target.isDamaged() || target.countCards("h") > player.countCards("h")) {
				return;
			}
			let { result } = await player.chooseBool(`是否令${get.translation(target)}回复1点体力？`, get.recoverEffect(target, player, player) > 0);
			if (result.bool) {
				await target.recover(player);
			}
		},
	},
	jlsg_huisheng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageBegin4" },
		filter(event, player) {
			if (!player.countCards("h")) {
				return false;
			}
			if (!event.source || event.source == player || !event.source.isIn()) {
				return false;
			}
			return true;
		},
		async cost(event, trigger, player) {
			let max = Math.min(3, player.countCards("h"));
			let prompt = `###${get.prompt(event.skill)}###令${get.translation(trigger.source)}观看你至多${max}张手牌`;
			event.result = await player
				.chooseCard(prompt, [1, max])
				.set("ai", card => {
					let value = get.value(card) / _status.event.dmgCnt;
					if (!ui.selected.cards.length) {
						return 7 - get.value(card);
					}
					return 4 - value;
				})
				.set("dmgCnt", trigger.num)
				.forResult();
		},
		async content(event, trigger, player) {
			const target = trigger.source;
			await target.viewCards("贿生", event.cards);
			if (target.countDiscardableCards(target, "he") >= event.cards.length) {
				let { result } = await target
					.chooseToDiscard(event.cards.length, "he")
					.set("dialog", [`###贿生###选择${get.cnNumber(event.cards.length)}张牌弃置，否则获得${get.translation(player)}的一张手牌并防止此伤害`, event.cards])
					.set("ai", card => {
						let target = _status.event.target;
						if (get.attitude(_status.event.player, target) >= 0) {
							return 0;
						}
						let cnt = _status.event.selectCard[0];
						let value = 8 - cnt * 1.5 - get.value(card) + 2 * Math.random();
						if (cnt > 1 && cnt == target.countCards("h")) {
							value -= cnt / 2;
						}
						return value;
					})
					.set("target", player);
				if (result.bool) {
					if (player.ai.shown > target.ai.shown && get.attitude(target, player) < 0) {
						target.addExpose(0.3);
					}
					return;
				}
			}
			let { result } = await target.chooseCardButton(event.cards, true, `获得的${get.translation(player)}一张牌`).set("ai", card => get.value(card));
			if (result.links) {
				await target.gain(player, result.links, "giveAuto");
				trigger.cancel();
			}
		},
	},
	jlsg_manyi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (event.card.name == "nanman") {
				return false;
			}
			if (name == "useCardToTargeted" && event.player == player) {
				return false;
			} else if (name == "useCardToPlayered" && !event.isFirstTarget) {
				return false;
			}
			return event.card.name == "sha" || get.type(event.card) == "trick";
		},
		prompt(event, player) {
			return `蛮裔：是否将${get.translation(event.card)}的效果改为【南蛮入侵】？`;
		},
		prompt2(event, player) {
			return `然后你可以摸一张牌`;
		},
		check(event, player, name) {
			let eff1 = 0,
				eff2 = 0,
				source = event.player,
				card = get.autoViewAs({ name: "nanman", ...event.card }, event.cards);
			if (name == "useCardToPlayered") {
				source = player;
			}
			for (let target of event.targets) {
				eff1 += get.effect(target, card, source, player);
				eff2 += get.effect(target, event.card, source, player);
			}
			return eff1 + get.effect(player, { name: "draw" }, player, player) > eff2;
		},
		async content(event, trigger, player) {
			game.log(player, "将", trigger.card, "的效果改为了【南蛮入侵】");
			trigger.card.name = "nanman";
			if (trigger.card.isCard) {
				trigger.card.isCard = false;
			}
			trigger.getParent().effectCount = get.info(trigger.card, false).effectCount || 1;
			trigger.getParent().excluded = [];
			trigger.getParent().directHit = [];
			trigger.getParent().card.storage = {};
			trigger.getParent().baseDamage = 1;
			trigger.getParent().extraDamage = 0;
			await player.draw();
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_souying: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "respondAfter" },
		filter(event, player) {
			const record = player.getStorage("jlsg_souying_record", { sha: [], shan: [] });
			switch (event.card.name) {
				case "sha":
					return game.hasPlayer(p => !record.sha.includes(p));
				case "shan":
					return game.hasPlayer(p => !record.shan.includes(p) && p.isDamaged());
				default:
					return false;
			}
		},
		async cost(event, trigger, player) {
			const cardname = trigger.card.name,
				record = player.getStorage("jlsg_souying_record", { sha: [], shan: [] });
			event.result = await player
				.chooseTarget((_, player, target) => {
					if (get.event("record")[get.event("cardname")].includes(target)) {
						return false;
					}
					return get.event("cardname") != "shan" || target.isDamaged();
				})
				.set("prompt", get.prompt(event.name.slice(0, -5)))
				.set("prompt2", cardname == "sha" ? "对一名角色造成1点伤害" : "令一名角色回复1点体力")
				.set("ai", target => get[get.event("cardname") == "sha" ? "damageEffect" : "recoverEffect"](target, get.player(), get.player()))
				.set("record", record)
				.set("cardname", cardname)
				.forResult();
		},
		async content(event, trigger, player) {
			const {
					targets: [target],
				} = event,
				{ card } = trigger;
			player.addTempSkill("jlsg_souying_record");
			const record = player.getStorage("jlsg_souying_record", { sha: [], shan: [] });
			record[card.name].add(target);
			player.setStorage("jlsg_souying_record", record, true);
			if (card.name == "sha") {
				await target.damage();
			} else {
				await target.recover();
			}
		},
		subSkill: {
			record: {
				onremove: true,
				mark: true,
				marktext: "薮",
				intro: {
					content(storage, player) {
						let str = ["sha", "shan"]
							.map(i => {
								if (storage?.[i]?.length) {
									return `${get.translation(i)}：${get.translation(storage[i])}`;
								}
								return "";
							})
							.join("<br>");
						if (str.length) {
							return "本回合已触发<br>" + str;
						}
						return "";
					},
				},
			},
		},
	},
	jlsg_guolun: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.storage.jlsg_guolun = 0;
		},
		trigger: { global: ["drawAfter", "discardAfter", "recoverAfter", "damageAfter"] },
		priority: 1,
		filter: function (event, player) {
			return game.hasPlayer(p => this.filterTargetDefault(event, player, p, false));
		},
		usable: 1,
		filterTargetDefault(trigger, player, target, isReverse) {
			switch (player.storage.jlsg_guolun) {
				case 0:
					if (!isReverse) {
						return false;
					}
				// fall through
				case 1:
					if (trigger.player != player) {
						return false;
					}
				// fall through
				case 2:
					if (!["draw", "discard"].includes(trigger.name)) {
						return false;
					}
			}
			let action = trigger.name;
			if (isReverse) {
				action = {
					draw: "discard",
					discard: "draw",
					recover: "damage",
					damage: "recover",
				}[trigger.name];
			}
			let source = trigger.player;
			if (trigger.name == "damage") {
				if (!trigger.source) {
					return false;
				}
				source = trigger.source;
			}
			if (source == target) {
				return false;
			}
			if (action == "discard") {
				return target.countDiscardableCards(target, "he");
			}
			if (action == "recover") {
				return target.isDamaged();
			}
			return true;
		},
		getAITarget(trigger, player, isReverse) {
			let targets = game.filterPlayer(p => lib.skill.jlsg_guolun.filterTargetDefault(trigger, player, p, isReverse));
			let action = trigger.name;
			if (isReverse) {
				action = {
					draw: "discard",
					discard: "draw",
					recover: "damage",
					damage: "recover",
				}[trigger.name];
			}
			let aiTarget,
				maxEff = 0;
			switch (action) {
				case "draw":
					return targets.filter(p => get.attitude(player, p) > 0).randomGet();
				case "discard":
					for (let target of targets) {
						let eff = -Math.min(trigger.num, target.countDiscardableCards(target, "he"));
						eff *= get.attitude(player, target);
						if (eff > maxEff) {
							maxEff = eff;
							aiTarget = target;
						}
					}
					return aiTarget;
				case "recover":
					for (let target of targets) {
						let eff = get.recoverEffect(target, trigger.source || player, player);
						if (eff > maxEff) {
							maxEff = eff;
							aiTarget = target;
						}
					}
					return aiTarget;
				case "damage":
					for (let target of targets) {
						let eff = get.damageEffect(target, trigger.source || player, player, trigger.nature);
						if (eff > maxEff) {
							maxEff = eff;
							aiTarget = target;
						}
					}
					return aiTarget;
			}
		},
		async cost(event, trigger, player) {
			let prompt2 = "选择一名角色";
			let aiTarget = lib.skill.jlsg_guolun.getAITarget(trigger, player, false);
			switch (trigger.name) {
				case "draw":
					prompt2 += `摸${get.cnNumber(trigger.num)}张牌`;
					break;
				case "discard":
					prompt2 += `弃${get.cnNumber(trigger.cards.length)}张牌`;
					break;
				case "recover":
					prompt2 += `回复${trigger.num}点体力`;
					break;
				case "damage": {
					let nature = "";
					if (trigger.nature) {
						nature = get.translation(trigger.nature) + "属性";
					}
					prompt2 += `受到来自${get.translation(trigger.source)}的${trigger.num}点${nature}伤害`;
					break;
				}
			}
			event.result = await player
				.chooseTarget(`###${get.prompt("jlsg_guolun")}###${prompt2}`, (_, player, target) => {
					return lib.skill.jlsg_guolun.filterTargetDefault(_status.event.getTrigger(), player, target, false);
				})
				.set("ai", target => {
					return target == _status.event.aiTarget;
				})
				.set("aiTarget", aiTarget)
				.forResult();
			if (event.result.bool) {
				let target = event.result.targets[0];
				if (trigger.source) {
					player.line2([trigger.source, target], "green");
				} else {
					player.line(target, "green");
				}
			}
		},
		line: false,
		async content(event, trigger, player) {
			let target = event.targets[0];
			switch (trigger.name) {
				case "draw":
					await target.draw(trigger.num);
					break;
				case "discard":
					await target.chooseToDiscard(true, "he", trigger.cards.length);
					break;
				case "recover":
					await target.recover(trigger.num, trigger.source || player);
					break;
				case "damage":
					await target.damage(trigger.num, trigger.source);
					break;
			}
		},
		group: "jlsg_guolun_reverse",
		derivation: ["jlsg_guolun2", "jlsg_guolun3", "jlsg_guolun4"],
		subSkill: {
			reverse: {
				audio: "jlsg_guolun",
				trigger: { global: ["drawAfter", "discardAfter", "recoverAfter", "damageAfter"] },
				filter(event, player) {
					return game.hasPlayer(p => lib.skill.jlsg_guolun.filterTargetDefault(event, player, p, true));
				},
				usable: 1,
				async cost(event, trigger, player) {
					let prompt2 = "选择一名角色";
					let aiTarget = lib.skill.jlsg_guolun.getAITarget(trigger, player, true);
					switch (trigger.name) {
						case "draw":
							prompt2 += `弃${get.cnNumber(trigger.num)}张牌`;
							break;
						case "discard":
							prompt2 += `摸${get.cnNumber(trigger.cards.length)}张牌`;
							break;
						case "recover": {
							let source = "";
							if (trigger.source) {
								source = `来自${get.translation(trigger.source)}的`;
							}
							prompt2 += `受到${source}${trigger.num}点伤害`;
							break;
						}
						case "damage":
							prompt2 += `回复${trigger.num}点体力`;
							break;
					}
					event.result = await player
						.chooseTarget(`###${get.prompt("jlsg_guolun")}###${prompt2}`, (_, player, target) => {
							return lib.skill.jlsg_guolun.filterTargetDefault(_status.event.getTrigger(), player, target, true);
						})
						.set("ai", target => {
							return target == _status.event.aiTarget;
						})
						.set("aiTarget", aiTarget)
						.forResult();
					if (event.result.bool) {
						let target = event.result.targets[0];
						if (trigger.source) {
							player.line2([trigger.source, target], "green");
						} else {
							player.line(target, "green");
						}
					}
				},
				line: false,
				async content(event, trigger, player) {
					let target = event.targets[0];
					switch (trigger.name) {
						case "draw":
							await target.chooseToDiscard(true, "he", trigger.num);
							break;
						case "discard":
							await target.draw(trigger.cards.length);
							break;
						case "recover":
							await target.damage(trigger.num, trigger.source || player);
							break;
						case "damage":
							await target.recover(trigger.num, trigger.source);
							break;
					}
				},
			},
		},
	},
	jlsg_songsang: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "die" },
		filter(event, player) {
			return event.player != player;
		},
		forced: true,
		async content(event, trigger, player) {
			if (player.hasSkill("jlsg_guolun")) {
				player.setStorage("jlsg_guolun", Math.min(3, player.storage.jlsg_guolun + 1));
			}
			await player.draw(game.countPlayer());
		},
	},
	jlsg_qinguo: {
		audio: "ext:极略/audio/skill:2",
		locked: false,
		mod: {
			playerEnabled(card, player, target) {
				let info = get.info(card);
				if (info.type != "equip") {
					return;
				}
				if (!player.isPhaseUsing()) {
					return;
				}
				if (info.selectTarget && info.selectTarget !== -1) {
					return true;
				}
				if (info.modTarget) {
					if (typeof info.modTarget == "boolean") {
						return info.modTarget;
					}
					if (typeof info.modTarget == "function") {
						return Boolean(info.modTarget(card, player, target));
					}
				}
			},
			selectTarget(card, player, num) {
				let info = get.info(card);
				if (info.type != "equip") {
					return;
				}
				if (!player.isPhaseUsing()) {
					return;
				}
				num = get.select(num);
				if (num[1] < 0) {
					if (num[0] === num[1]) {
						num[0] = 1;
					}
					num[1] = 1;
				}
			},
		},
		trigger: { player: "useCardAfter" },
		filter(event, player) {
			if (get.type(event.card) != "equip") {
				return false;
			}
			const vcards = get.inpileVCardList(([type, _, name, nature]) => {
				if (type != "basic") {
					return false;
				}
				const vcard = get.autoViewAs({ name, nature, isCard: true }, []);
				return player.hasUseTarget(vcard, false, false);
			});
			return vcards.length;
		},
		direct: true,
		async content(event, trigger, player) {
			const vcards = get.inpileVCardList(([type, _, name, nature]) => {
				if (type != "basic") {
					return false;
				}
				const vcard = get.autoViewAs({ name, nature, isCard: true }, []);
				return player.hasUseTarget(vcard, false, false);
			});
			let { result } = await player.chooseButton([get.prompt("jlsg_qinguo"), [vcards, "vcard"]]).set("ai", ({ link: [_, __, name, nature] }) => {
				const vcard = get.autoViewAs({ name, nature, isCard: true }, []);
				return player.getUseValue(vcard, false, false);
			});
			if (!result.bool) {
				return;
			}
			let card = { name: result.links[0][2], nature: result.links[0][3], isCard: true };
			await player.chooseUseTarget(card, false).set("logSkill", event.name);
		},
		group: ["jlsg_qinguo_gain"],
		subSkill: {
			gain: {
				audio: "jlsg_qinguo",
				trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "equipAfter"] },
				filter(event, player) {
					let cards = this.getCards(event, player);
					return cards.length;
				},
				usable: 1,
				async cost(event, trigger, player) {
					let cards = lib.skill.jlsg_qinguo_gain.getCards(trigger, player);
					if (cards.length == 1) {
						let prompt = `###${get.prompt("jlsg_qinguo")}###获得弃牌堆中的${get.translation(cards)}`;
						event.result = await player.chooseBool(prompt, true).forResult();
						if (event.result.bool) {
							event.result.cards = cards;
						}
					} else {
						let prompt = `###${get.prompt("jlsg_qinguo")}###获得弃牌堆中的一张牌`;
						event.result = await player
							.chooseCardButton(prompt, cards)
							.set("ai", button => {
								let player = _status.event.player;
								let card = button.link;
								let value = get.value(card);
								let cnt = player.countCards("hx", { type: "equip", subtype: get.subtype(card) });
								if (cnt) {
									value /= 1 + 2 * cnt;
								}
								if (player.countCards("hx", { name: card.name })) {
									value /= 2;
								}
								return value;
							})
							.forResult();
						if (event.result.bool) {
							event.result.cards = event.result.links.slice();
						}
					}
				},
				async content(event, trigger, player) {
					await player.gain(event.cards[0], "gain2");
				},
				getCards(event, player) {
					if (!event.getd || !event.getl) {
						return false;
					}
					let cards = event.getd();
					return cards.filter(card => {
						if (get.position(card) != "d") {
							return false;
						}
						return game.hasPlayer(current => {
							let evt = event.getl(current);
							if (!evt?.es?.includes(card)) {
								return false;
							}
							if (card.willBeDestroyed("discardPile", current, event)) {
								return false;
							}
							return true;
						});
					});
				},
			},
		},
	},
	jlsg_zhenge: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.addInvisibleSkill("jlsg_zhenge_use");
			game.addGlobalSkill("jlsg_zhenge_mod", player);
		},
		trigger: { player: "useCardAfter" },
		filter(event, player) {
			const bool = player.hasHistory("lose", evt => {
				if (evt.getParent() != event) {
					return false;
				}
				for (let i in evt.gaintag_map) {
					if (evt.gaintag_map[i].includes("jlsg_zhenge")) {
						return true;
					}
				}
				return false;
			});
			return !bool;
		},
		unique: true,
		forced: true,
		async content(event, trigger, player) {
			const cards = get.bottomCards(1);
			await player.gain(cards, "draw").set("gaintag", ["jlsg_zhenge"]);
			game.log(player, "获得了牌堆底的一张牌");
		},
		get effect() {
			const negative = {
				横置: async function (event, trigger, player) {
					await player.link();
				},
				翻面: async function (event, trigger, player) {
					await player.turnOver();
				},
				"随机弃置1-5张牌": async function (event, trigger, player) {
					let num = Math.min(event.num, player.countDiscardableCards(player, "he"));
					await player.discard(player.getDiscardableCards(player, "he").randomGets(num));
				},
				"随机受到1-3点伤害": async function (event, trigger, player) {
					await player.damage(event.num, event.source);
				},
				"随机受到1-3点雷电伤害": async function (event, trigger, player) {
					await player.damage(event.num, "thunder", event.source);
				},
				"随机受到1-3点火焰伤害": async function (event, trigger, player) {
					await player.damage(event.num, "fire", event.source);
				},
				"随机失去1-3点体力": async function (event, trigger, player) {
					await player.loseHp(event.num);
				},
				"随机减1-3点体力上限": async function (event, trigger, player) {
					await player.loseMaxHp(event.num);
				},
				随机失去1个技能: async function (event, trigger, player) {
					let skills = player.getSkills(null, false, false);
					if (skills.length) {
						let skill = skills.randomGet();
						await player.removeSkills(skill);
					}
				},
			};
			const positive = {
				"随机摸1-5张牌": async function (event, trigger, player) {
					await player.draw(event.num);
				},
				"从牌堆或弃牌堆随机获得1-2张装备牌，1-2张基本牌，1-2张锦囊牌": async function (event, trigger, player) {
					let type = ["basic", "trick", "equip"],
						num = Math.floor(Math.random() * 2 + 1),
						cardPile = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes)),
						cards = [];
					while (type.length) {
						let type2 = type.randomRemove();
						cards = cardPile.filter(c => get.type2(c) == type2).randomGets(num);
						if (cards.length) {
							break;
						} else {
							cards = [];
						}
					}
					if (cards.length) {
						type = get.translation(get.type2(cards[0]));
					} else {
						type = get.translation(type[0]);
					}
					game.log(player, `随机到的正面效果为<span style='color:#e83535'>从牌堆或弃牌堆获得${get.cnNumber(num)}张${type}牌</span>`);
					if (cards.length) {
						await player.gain(cards, "draw");
					} else {
						game.log("但是牌堆中没有这种牌");
					}
				},
				"随机回复1-3点体力": async function (event, trigger, player) {
					await player.recover(event.num, event.source);
				},
				"随机加1-3点体力上限": async function (event, trigger, player) {
					await player.gainMaxHp(event.num);
				},
				"使用杀的次数上限+1": async function (event, trigger, player) {
					if (!player.hasSkill("jlsg_zhenge_effect")) {
						await player.addSkill("jlsg_zhenge_effect");
					}
					player.storage.jlsg_zhenge_effect.sha++;
					player.markSkill("jlsg_zhenge_effect");
				},
				"摸牌数+1": async function (event, trigger, player) {
					if (!player.hasSkill("jlsg_zhenge_effect")) {
						await player.addSkill("jlsg_zhenge_effect");
					}
					player.storage.jlsg_zhenge_effect.draw++;
					player.markSkill("jlsg_zhenge_effect");
				},
				"手牌上限+1": async function (event, trigger, player) {
					if (!player.hasSkill("jlsg_zhenge_effect")) {
						await player.addSkill("jlsg_zhenge_effect");
					}
					player.storage.jlsg_zhenge_effect.maxHandCards++;
					player.markSkill("jlsg_zhenge_effect");
				},
				随机获得1个技能: async function (event, trigger, player) {
					let skill = lib.skill.jlsg_zhenge.skillsList.filter(i => !player.hasSkill(i)).randomGet();
					await player.addSkills([skill]);
				},
			};
			delete this.effect;
			this.effect = { positive, negative };
			return { positive, negative };
		},
		get skillsList() {
			let characters = Object.entries(lib.skill.jlsg_xinghan.getCharacters)
				.map(i => i[1])
				.flat();
			let list = [];
			for (let name of characters) {
				list.addArray(get.gainableSkillsName(name));
			}
			delete this.skillsList;
			this.skillsList = list;
			return list;
		},
		subSkill: {
			mod: {
				charlotte: true,
				mod: {
					aiOrder(player, card, num) {
						let cards = player.getCards("h", card => card.hasGaintag("jlsg_zhenge"));
						if (cards.includes(card)) {
							return num - 5;
						}
					},
					aiValue(player, card, num) {
						let cards = player.getCards("h", card => card.hasGaintag("jlsg_zhenge"));
						if (cards.includes(card)) {
							return num + 5;
						}
					},
					aiUseful(player, card, num) {
						let cards = player.getCards("h", card => card.hasGaintag("jlsg_zhenge"));
						if (cards.includes(card)) {
							return num + 1;
						}
					},
					ignoredHandcard(card, player) {
						if (card.hasGaintag("jlsg_zhenge")) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == "phaseDiscard" && card.hasGaintag("jlsg_zhenge")) {
							return false;
						}
					},
					cardUsable(card, player, num) {
						if (!card.cards) {
							return;
						}
						if (card.cards.some(i => i.hasGaintag("jlsg_zhenge"))) {
							return Infinity;
						}
					},
				},
			},
			use: {
				audio: "ext:极略/audio/skill:2",
				trigger: { player: "useCardToTargeted" },
				filter(event, player, name, target) {
					if (!event.target) {
						return false;
					}
					if (!["red", "black"].includes(get.color(event.card, player))) {
						return false;
					}
					return player.hasHistory("lose", evt => {
						if (evt.getParent() != event.getParent()) {
							return false;
						}
						for (let i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("jlsg_zhenge")) {
								return true;
							}
						}
						return false;
					});
				},
				async cost(event, trigger, player) {
					const target = trigger.target,
						color = get.color(trigger.card, player);
					let str = `枕戈：是否令${get.translation(target)}随机受到一种`;
					if (color == "red") {
						str += "正";
					} else {
						str += "负";
					}
					str += "面效果？";
					const { result } = await player
						.chooseBool(str)
						.set("color", get.color(trigger.card, player))
						.set("target", target)
						.set("ai", (event, player) => {
							const target = get.event("target"),
								color = get.event("color", player);
							if (get.attitude(player, target) > 1) {
								return color == "red";
							} else {
								return color == "black";
							}
						});
					event.result = {
						bool: result.bool,
						targets: [target],
						cost_data: { color },
					};
				},
				async content(event, trigger, player) {
					const { color } = event.cost_data,
						target = event.targets[0];
					const next = game.createEvent("jlsg_zhenge_effect", false);
					next.player = target;
					next.source = player;
					let effect = Object.keys(lib.skill.jlsg_zhenge.effect[color == "red" ? "positive" : "negative"])
						.filter(i => {
							if (i == "随机回复1-3点体力") {
								return get.recoverEffect(target, player, target) > 0;
							} else if (i == "随机失去1个技能") {
								return target.getSkills(null, false, false).length;
							}
							return true;
						})
						.randomGet();
					if (effect != "从牌堆或弃牌堆随机获得1-2张装备牌，1-2张基本牌，1-2张锦囊牌") {
						let str = effect.slice();
						if (str.indexOf("1-") > -1) {
							let num1 = str.indexOf("1-");
							let str2 = str[num1 + 2];
							let num = Math.floor(Math.random() * Number(str2) + 1);
							next.num = num;
							str = str.slice(2).replace(`1-${str2}`, get.cnNumber(num));
						} else if (str.indexOf("1") > -1 && str.indexOf("+1") == -1) {
							str = str.replace(`1`, "一");
						}
						game.log(target, `随机到的${color == "red" ? "正" : "负"}面效果为<span style='color:#e83535'>${str}</span>`);
					}
					next.setContent(lib.skill.jlsg_zhenge.effect[color == "red" ? "positive" : "negative"][effect]);
					await next;
				},
			},
			effect: {
				init(player) {
					if (!player.storage.jlsg_zhenge_effect) {
						player.storage.jlsg_zhenge_effect = {
							draw: 0,
							maxHandCards: 0,
							sha: 0,
						};
					}
				},
				mod: {
					cardUsable(card, player, num) {
						if (!player.storage.jlsg_zhenge_effect) {
							return;
						}
						var add = player.storage.jlsg_zhenge_effect.sha;
						if (card.name == "sha") {
							return num + add;
						}
					},
					maxHandcard: function (player, num) {
						if (!player.storage.jlsg_zhenge_effect) {
							return;
						}
						var add = player.storage.jlsg_zhenge_effect.maxHandCards;
						return num + add;
					},
				},
				onremove: true,
				mark: true,
				marktext: "戈",
				intro: {
					mark(dialog, num, player) {
						let list = Object.entries(player.storage.jlsg_zhenge_effect).filter(i => i[1] > 0);
						if (list.length) {
							for (let i of list) {
								if (i[0] == "draw") {
									dialog.addText(`摸牌阶段摸牌数+${i[1]}`);
								} else if (i[0] == "maxHandCards") {
									dialog.addText(`手牌上限+${i[1]}`);
								} else if (i[0] == "sha") {
									dialog.addText(`出杀次数+${i[1]}`);
								}
							}
						} else {
							return ``;
						}
					},
				},
				charlotte: true,
				forced: true,
				popup: false,
				trigger: { player: "phaseDrawBegin1" },
				filter(event, player) {
					if (event.fixed) {
						return false;
					}
					return player.storage && player.storage.jlsg_zhenge_effect.draw;
				},
				content() {
					trigger.num += player.storage.jlsg_zhenge_effect.draw;
				},
			},
		},
		ai: {
			//@.修改
			effect: {
				player_use: function (card, player, target) {
					let cards = player.getCards("h", card => card.hasGaintag("jlsg_zhenge"));
					if (!cards.includes(card)) {
						return [1, 1];
					}
					if (get.color(card) == "black" && cards.includes(card)) {
						return [1, 0, 1, -1];
					}
					if (get.color(card) == "red" && cards.includes(card)) {
						return [1, 0, 1, 1];
					}
				},
			},
		},
	},
	jlsg_xinghan: {
		marktext: "汉",
		intro: {
			nocount: true,
			mark(dialog, content, player) {
				let storage = Array.from(player.getStorage("jlsg_xinghan", new Map()).values()).slice(1);
				if (storage?.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addText("已招募武将：");
						dialog.add([storage.map(i => [i[0], i.slice(1)]), lib.skill.jlsg_xinghan.characterInfo]);
					} else {
						return "共有" + get.cnNumber(storage.length) + "名招募武将";
					}
				}
			},
		},
		audio: "ext:极略/audio/skill:2",
		unique: true,
		priority: 1,
		get getCharacters() {
			//角色列表
			if (!_status.characterlist) {
				game.initCharacterList();
			}
			let list = {};
			for (const pack in lib.characterPack) {
				if (
					![
						//"standard", "refresh", "shiji", "shenhua", "mobile",
						"jlsg_sr",
						"jlsg_sk",
						"jlsg_skpf",
						"jlsg_soul",
						"jlsg_sy",
					].includes(pack)
				) {
					continue;
				}
				for (const name in lib.characterPack[pack]) {
					if (name.startsWith("jlsgsy_") && !name.endsWith("baonu")) {
						continue;
					}
					if (_status.characterlist.includes(name) || name.startsWith("jlsgsy_")) {
						if (lib.translate[name] && get.character(name)) {
							if (get.character(name, 1)) {
								const group = get.character(name, 1);
								if (!list[group]) {
									list[group] = [];
								}
								list[group].add(name);
							}
						}
					}
				}
			}
			delete this.getCharacters;
			this.getCharacters = list;
			return list;
		},
		init(player, skill) {
			if (!player.invisibleSkills.includes("jlsg_xinghan_turn")) {
				let nameIndex = null,
					nameList = ["name1", "name2"].filter(prop => player[prop]).map(prop => player[prop]);
				for (let name in nameList) {
					const skills = get.character(nameList[name])?.skills || [];
					if (skills.includes(skill)) {
						nameIndex = `name${Number(name) + 1}`;
					}
				}
				player.setStorage("jlsg_xinghan_turn", {
					nameIndex, //主副将位置
					dead: [], //阵亡招募武将的势力
				});
				if (!nameIndex) {
					return;
				}
				player.addInvisibleSkill("jlsg_xinghan_turn");
				const name = player[nameIndex];
				const info = get.character(name);
				let { hp = 1, maxHp = 1, hujia = 0 } = info;
				//主公/地主加成
				if (player.isZhu2()) {
					if (!info.initFilters?.includes("noZhuHp")) {
						hp++;
						maxHp++;
					}
				}
				player.setStorage(skill, new Map([[0, [name, info.group, [hp, maxHp, hujia], info.skills]]]), true);
			}
		},
		onremove(player, skill) {
			player.setStorage(skill, undefined);
			player.unmarkSkill(skill);
			if (player.invisibleSkills.includes("jlsg_xinghan_turn")) {
				player.removeInvisibleSkill("jlsg_xinghan_turn");
			}
		},
		trigger: {
			global: "gameDrawBegin",
			player: "phaseEnd",
		},
		filter(event, player, name) {
			if (!player.getStorage("jlsg_xinghan_turn")?.nameIndex) {
				return false;
			}
			if (name == "phaseEnd") {
				return !event.skill || event.skill != "jlsg_xinghan_turn";
			}
			return true;
		},
		async cost(event, trigger, player) {
			const dead = player.getStorage("jlsg_xinghan_turn").dead,
				storage = Array.from(player.getStorage("jlsg_xinghan", new Map([])).values()).slice(1);
			let group = ["wei", "shu", "wu", "qun", "shen", "jlsgsy"]
				.filter(group => {
					return lib.skill.jlsg_xinghan.getCharacters[group]?.filter(name => {
						return !storage.some(info => info[0].includes(name));
					}).length;
				})
				.filter(group => !dead.includes(group));
			if (!group.length) {
				return;
			}
			let storageGroups = storage.map(info => info[1]);
			if (storage.length == 3) {
				group = group.filter(i => storageGroups.includes(i));
			}
			const { result } = await player
				.chooseControl(group, "cancel2")
				.set("prompt", "兴汉：请选择一个势力")
				.set("ai", () => get.event("choice"))
				.set(
					"choice",
					(function () {
						if (!storageGroups.includes("shen") && group.includes("shen")) {
							return "shen";
						}
						return group.randomGet();
					})()
				);
			event.result = {
				bool: result.control != "cancel2",
				cost_data: { control: result.control },
			};
		},
		async content(event, trigger, player) {
			const control = event.cost_data.control,
				storage = player.getStorage(event.name, new Map([]));
			const storagex = Array.from(storage.entries()),
				characterList = lib.skill.jlsg_xinghan.getCharacters[control].filter(i => !storagex.map(i => i[1][0]).includes(i)).randomGets(3);
			if (!characterList.length) {
				return;
			}
			let str = "";
			if (storagex.length > 1) {
				str = "<br>已招募武将：";
				for (let info of storagex) {
					if (info[0] == 0) {
						continue;
					}
					let hpInfo = info[1][2];
					let str2 = `(${hpInfo[0]}/${hpInfo[1]}${hpInfo[3] ? `/${hpInfo[3]}` : ""})`;
					str += get.translation(info[0]) + str2 + "<br>";
				}
			}
			let { result } = await player.chooseButton(true, [`###兴汉：请选择一名武将加入我方阵营###${str}`, [characterList, "character"]]).set("ai", function (button) {
				return get.rank(button.link, true) - get.character(button.link).hp;
			});
			if (result.bool) {
				const name = result.links[0];
				const info = get.character(name);
				let { hp = 1, maxHp = 1, hujia = 0, group, skills = [] } = info;
				//主公/地主加成
				if (player.isZhu2()) {
					if (!info.initFilters?.includes("noZhuHp")) {
						hp++;
						maxHp++;
					}
				}
				let hpInfo = [hp, maxHp, hujia];
				skills = skills.filter(skill => {
					const skillInfo = get.info(skill);
					if (!skillInfo) {
						return false;
					}
					return !skillInfo.zhuSkill || (skillInfo.zhuSkill && player.isZhu2());
				});
				const same = storagex.find(i => i[0] != 0 && i[1][1] == group);
				//替换部分
				if (same) {
					let { result } = await player
						.chooseBool(`兴汉：是否将招募武将${get.translation(same[1][0])}替换为${get.translation(name)}？`)
						.set("ai", () => get.event("check"))
						.set(
							"check",
							(function () {
								//@.修改
								return get.rank(name, true) - get.character(name).hp - get.rank(same[1][0], true) + get.character(same[1][0]).hp > 0;
							})()
						);
					if (!result.bool) {
						return;
					}
					if (lib.config.extension_极略_jlsgsk_wanniangongzhu === "false") {
						hpInfo = same[1][2];
					}
					let removeSkills = storage.get(same[0])[3];
					for (let i of removeSkills) {
						player.removeSkill(i);
					}
					storage.set(same[0], [name, control, hpInfo, skills]);
				} else {
					storage.set(storage.size, [name, control, hpInfo, skills]);
				}
				player.setStorage(event.name, storage, true);
				game.broadcastAll(
					function (name, info) {
						if (_status.characterlist) {
							_status.characterlist.remove(name);
							if (info) {
								_status.characterlist.add(info);
							}
						}
					},
					name,
					same?.[1]?.[0]
				);
				if (event.triggername != "phaseEnd") {
					await lib.skill.jlsg_xinghan.chooseCharacter(player);
				}
			}
		},
		reinitCharacters(player, to, insert = false) {
			//切换角色的content
			const rawPairs = [player.name1],
				nameIndex = player.getStorage("jlsg_xinghan_turn").nameIndex,
				storage = Array.from(player.getStorage("jlsg_xinghan", new Map()).entries());
			const master = storage[0][1][0];
			if (player.name2 && get.character(player.name2)) {
				rawPairs.push(player.name2);
			}
			const newPairs = rawPairs.reduce((list, name) => {
				if (name == player[nameIndex]) {
					list.push(to);
				} else {
					list.push(name);
				}
				return list;
			}, []);
			const fromInfo = storage.find(info => info[1][0] == player[nameIndex]),
				toInfo = storage.find(info => info[1][0] == to);
			if (fromInfo[1][0] == toInfo[1][0]) {
				return;
			}
			let next,
				evt = _status.event.getParent("phase");
			if (insert && evt && evt.parent && evt.parent.next) {
				next = game.createEvent("jlsg_xinghan_change", false, evt.parent);
			} else {
				next = game.createEvent("jlsg_xinghan_change", false);
			}
			next.player = player;
			next.newPairs = newPairs;
			next.info = { fromInfo, toInfo };
			next.setContent(async function (event, trigger, player) {
				const rawPairs = [player.name1];
				if (player.name2 && get.character(player.name2)) {
					rawPairs.push(player.name2);
				}
				event.rawPairs = rawPairs;
				const newPairs = event.newPairs;
				const removeSkills = event.info.fromInfo[1][3].slice(0),
					addSkills = event.info.toInfo[1][3].slice(0);
				for (let i = 0; i < Math.min(2, rawPairs.length); i++) {
					let rawName = rawPairs[i],
						newName = newPairs[i];
					if (rawName != newName) {
						game.log(player, `将${i == 0 ? "主" : "副"}将从`, `#b${get.translation(rawName)}`, "变更为了", `#b${get.translation(newName)}`);
					}
				}
				player.reinit2(newPairs);
				event.addSkill = addSkills.unique();
				event.removeSkill = removeSkills.unique().removeArray(event.addSkill);

				//手动失去技能
				if (event.removeSkill.length) {
					for (let skill of event.removeSkill) {
						_status.event.clearStepCache();
						let info = lib.skill[skill];
						game.broadcastAll(
							function (player, skill) {
								player.skills.remove(skill);
								player.hiddenSkills.remove(skill);
								player.invisibleSkills.remove(skill);
								delete player.tempSkills[skill];
								for (let i in player.additionalSkills) {
									player.additionalSkills[i].remove(skill);
								}
							},
							player,
							skill
						);
						player.checkConflict(skill);
						if (info) {
							player.removeSkillTrigger(skill);
							if (!info.keepSkill) {
								player.removeAdditionalSkills(skill);
							}
						}
						player.enableSkill(skill + "_awake");
						game.callHook("removeSkillCheck", [skill, player]);
					}
				}
				//获得技能
				if (event.addSkill.length) {
					player.addSkill(event.addSkill);
				}
				const storage = player.getStorage("jlsg_xinghan", new Map());
				let fromInto2 = storage.get(event.info.fromInfo[0]);
				fromInto2[2] = [player.hp, player.maxHp, player.hujia];
				storage.set(event.info.fromInfo[0], fromInto2);
				player.setStorage("jlsg_xinghan", storage, true);
				game.broadcastAll(
					function (player, event) {
						player.hp = event.info.toInfo[1][2][0];
						player.maxHp = event.info.toInfo[1][2][1];
						player.hujia = event.info.toInfo[1][2][2];
					},
					player,
					event
				);
				if (to == master) {
					player.unmarkSkill("jlsg_xinghan_turn");
				} else {
					player.markSkill("jlsg_xinghan_turn");
				}
				player.update();
			});
			return next;
		},
		chooseCharacter(player, insert = false) {
			//选择登场角色
			const character = Array.from(player.getStorage("jlsg_xinghan", new Map()).values()),
				master = character[0][0];
			const next = game.createEvent("jlsg_xinghan_choose", false);
			next.player = player;
			next.master = master;
			next.insert = insert;
			next.setContent(async function (event, trigger, player) {
				const { result } = await player.chooseButton(true, ["兴汉：请选择要上场的武将", [character.map(i => [i[0], i.slice(1)]), lib.skill.jlsg_xinghan.characterInfo]]).set("ai", function (button) {
					const event = get.event();
					if (event.getParent("phase") && button.link[0] == event.getParent().master) {
						return -114514;
					}
					return get.rank(button.link[0], true);
				});
				if (result.bool) {
					const name = result.links[0][0];
					lib.skill.jlsg_xinghan.reinitCharacters(player, name, event.insert);
				}
			});
			return next;
		},
		characterInfo: function (item, type, position, noclick, node) {
			//此处为信息显示部分，待优化
			const _item = item;
			item = _item[0];
			if (node) {
				node.classList.add("button");
				node.classList.add("character");
				node.style.display = "";
			} else {
				node = ui.create.div(".button.character", position);
			}
			node._link = item;
			node.link = item;
			let double = get.is.double(node._link, true);
			if (double) {
				node._changeGroup = true;
			}
			let func = function (node, item) {
				node.setBackground(item, "character");
				if (node.node) {
					node.node.name.remove();
					node.node.hp.remove();
					node.node.group.remove();
					node.node.intro.remove();
					if (node.node.replaceButton) {
						node.node.replaceButton.remove();
					}
				}
				node.node = {
					name: ui.create.div(".name", node),
					hp: ui.create.div(".hp", node),
					group: ui.create.div(".identity", node),
					intro: ui.create.div(".intro", node),
				};
				let infoitem = get.character(item),
					info = _item[1][1];
				node.node.name.innerHTML = get.slimName(item);
				let hp = info[0],
					maxHp = info[1],
					hujia = info[2];
				if (lib.config.buttoncharacter_style == "default" || lib.config.buttoncharacter_style == "simple") {
					if (lib.config.buttoncharacter_style == "simple") {
						node.node.group.style.display = "none";
					}
					node.classList.add("newstyle");
					node.node.name.dataset.nature = get.groupnature(get.bordergroup(infoitem));
					node.node.group.dataset.nature = get.groupnature(get.bordergroup(infoitem), "raw");
					ui.create.div(node.node.hp);
					let str = get.numStr(hp);
					if (hp !== maxHp) {
						str += "/";
						str += get.numStr(maxHp);
					}
					let textnode = ui.create.div(".text", str, node.node.hp);
					if (info[0] == 0) {
						node.node.hp.hide();
					} else if (get.infoHp(info[0]) <= 3) {
						node.node.hp.dataset.condition = "mid";
					} else {
						node.node.hp.dataset.condition = "high";
					}
					if (hujia > 0) {
						ui.create.div(node.node.hp, ".shield");
						ui.create.div(".text", get.numStr(hujia), node.node.hp);
					}
				} else {
					if (maxHp > 14) {
						if (hp !== maxHp || shield > 0) {
							node.node.hp.innerHTML = info[0];
						} else {
							node.node.hp.innerHTML = get.numStr(info[0]);
						}
						node.node.hp.classList.add("text");
					} else {
						for (let i = 0; i < maxHp; i++) {
							let next = ui.create.div("", node.node.hp);
							if (i >= hp) {
								next.classList.add("exclude");
							}
						}
						for (let i = 0; i < shield; i++) {
							ui.create.div(node.node.hp, ".shield");
						}
					}
				}
				if (node.node.hp.childNodes.length == 0) {
					node.node.name.style.top = "8px";
				}
				if (node.node.name.querySelectorAll("br").length >= 4) {
					node.node.name.classList.add("long");
					if (lib.config.buttoncharacter_style == "old") {
						node.addEventListener("mouseenter", ui.click.buttonnameenter);
						node.addEventListener("mouseleave", ui.click.buttonnameleave);
					}
				}
				node.node.intro.innerHTML = lib.config.intro;
				if (!noclick) {
					lib.setIntro(node);
				}
				if (infoitem[1]) {
					if (double) {
						node.node.group.innerHTML = double.reduce((previousValue, currentValue) => `${previousValue}<div data-nature="${get.groupnature(currentValue)}">${get.translation(currentValue)}</div>`, "");
						if (double.length > 4) {
							if (new Set([5, 6, 9]).has(double.length)) {
								node.node.group.style.height = "48px";
							} else {
								node.node.group.style.height = "64px";
							}
						}
					} else {
						node.node.group.innerHTML = `<div>${get.translation(infoitem[1])}</div>`;
					}
					node.node.group.style.backgroundColor = get.translation(`${get.bordergroup(infoitem)}Color`);
				} else {
					node.node.group.style.display = "none";
				}
			};
			node.refresh = func;
			node.refresh(node, item);
			node.link = _item;
			node._customintro = uiintro => {
				let skills = _item[1][2];
				for (let skill of skills) {
					uiintro.add('<div style="width:calc(100% - 10px);display:inline-block"><div class="skill">【' + get.skillTranslation(skill, get.player()) + "】</div><div>" + get.skillInfoTranslation(skill, get.player()) + "</div></div>");
				}
			};
			return node;
		},
	},
	//切换角色
	jlsg_xinghan_turn: {
		unique: true,
		locked: true,
		charlotte: true,
		lastDo: true,
		priority: -114514,
		trigger: { player: ["phaseBefore", "phaseAfter", "dieBefore", "changeSkillsEnd", "changeCharacterAfter"] },
		marktext: "募",
		intro: {
			name: "兴汉",
			content(storage, player) {
				const master = Array.from(player.getStorage("jlsg_xinghan", new Map()).values())[0][0];
				return `此为${get.translation(master)}招募的武将`;
			},
		},
		filter(event, player, name) {
			if (player.getStorage("jlsg_xinghan", new Map()).size < 2) {
				return false;
			}
			const storage = player.getStorage("jlsg_xinghan", new Map());
			const nameIndex = player.getStorage("jlsg_xinghan_turn", { nameIndex: "name1" }).nameIndex;
			const originName = player[nameIndex],
				master = storage.get(0)?.[0] || originName;
			const num = Array.from(storage.values()).findIndex(info => info[0] == originName),
				max = storage.size - 1;
			if (["phaseBefore", "dieBefore"].includes(name)) {
				if (originName == master) {
					return false;
				}
				if (name == "phaseBefore") {
					if (player.isTurnedOver() && !event._noTurnOver) {
						return false;
					}
					return !event.skill;
				}
			} else if (name == "phaseAfter") {
				return max >= num && (event.skill == "jlsg_xinghan_turn" || (num == 0 && !event.skill));
			} else if (name == "changeSkillsEnd") {
				if (lib.config.extension_极略_jlsgsk_wanniangongzhu === "false" && event.addSkill?.length) {
					return true;
				}
				return event.removeSkill?.some(i => {
					let skills = storage.get(num)?.[3] || [];
					return skills.includes(i);
				});
			}
			return true;
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			const storage = player.getStorage("jlsg_xinghan", new Map());
			const nameIndex = player.getStorage("jlsg_xinghan_turn", { nameIndex: "name1" }).nameIndex;
			const originName = player[nameIndex],
				master = storage.get(0)?.[0] || originName;
			const num = Array.from(storage.values()).findIndex(info => info[0] == originName),
				max = storage.size - 1;
			if (["phaseBefore", "dieBefore"].includes(event.triggername)) {
				if (originName != master) {
					await lib.skill.jlsg_xinghan.reinitCharacters(player, master);
					if (event.triggername == "dieBefore") {
						if (storage.get(num)?.length) {
							let phase = trigger.getParent(event => {
								if (event.name != "phase" || event.player != player) {
									return false;
								}
								return event.skill == "jlsg_xinghan_turn";
							}, true);
							if (phase) {
								phase.jlsg_xinghan_turn = num;
							}
							trigger.cancel();
							let info = storage.get(num).slice();
							storage.delete(num);
							for (let i of info[3]) {
								player.removeSkill(i);
							}
							let turnStorage = player.getStorage("jlsg_xinghan_turn");
							turnStorage.dead.add(info[1]);
							player.setStorage("jlsg_xinghan_turn", turnStorage);
							game.broadcastAll(function (name) {
								if (_status.characterlist) {
									_status.characterlist.add(name);
								}
							}, info[0]);
							info = Array.from(storage.entries());
							info.forEach((v, i) => {
								if (i >= num) {
									v[0]--;
								}
							});
							player.setStorage("jlsg_xinghan", new Map(info), true);
						}
					}
				}
			} else if (event.triggername == "changeSkillsEnd") {
				let info = storage.get(num);
				if (trigger.removeSkill?.length) {
					for (let i of trigger.removeSkill) {
						if (info[3].includes(i)) {
							info[3].remove(i);
						}
					}
				}
				if ((lib.config.extension_极略_jlsgsk_wanniangongzhu === "false" || trigger.getParent().name == "changeCharacter") && trigger.addSkill?.length) {
					let addSkill = trigger.addSkill;
					if (trigger.getParent().name == "changeCharacter") {
						const evt = trigger.getParent();
						let skills = get.character(evt.newPairs[nameIndex == "name2" ? 1 : 0]).skills.filter(skill => {
							return evt.addSkill.includes(skill);
						});
					}
					for (let i of addSkill) {
						if (!info[3].includes(i)) {
							info[3].add(i);
						}
					}
				}
				storage.set(num, info);
				player.setStorage("jlsg_xinghan", storage, true);
			} else if (event.triggername == "changeCharacterAfter") {
				let info = storage.get(num);
				info[0] = trigger.newPairs[nameIndex == "name2" ? 1 : 0];
				storage.set(num, info);
				player.setStorage("jlsg_xinghan", storage, true);
			} else {
				if (trigger.jlsg_xinghan_turn >= max || num >= max) {
					await lib.skill.jlsg_xinghan.chooseCharacter(player, true);
				} else {
					let numx = trigger.jlsg_xinghan_turn || num + 1;
					const name = storage.get(numx)[0];
					lib.skill.jlsg_xinghan.reinitCharacters(player, name, true);
					player.insertPhase("jlsg_xinghan_turn").set("_noTurnOver", true);
					player.phaseNumber--;
				}
			}
		},
	},
	jlsg_qianchong: {
		audio: "ext:极略/audio/skill:2",
		group: ["jlsg_qianchong_red", "jlsg_qianchong_black", "jlsg_qianchong_extra"],
		subSkill: {
			red: {
				audio: "jlsg_qianchong",
				trigger: { global: "phaseEnd" },
				priority: 1,
				filter(event, player) {
					let evts = player.getHistory("useCard", e => get.color(e.card) == "red");
					return evts.length == 1;
				},
				async cost(event, trigger, player) {
					let { result } = await player.chooseTarget(`###${get.prompt("jlsg_qianchong")}###令一名角色回复2点体力或摸其体力上限张牌`).set("ai", target => {
						let player = _status.event.player;
						let eff = get.recoverEffect(target, player, player);
						if (target.getDamagedHp() >= 2) {
							eff += 0.58 * eff;
						}
						let eff2 = get.attitude(player, target) * target.maxHp;
						return Math.max(eff, eff2);
					});
					if (!result.bool) {
						return;
					}
					let target = result.targets[0];
					let result2;
					if (target.isHealthy()) {
						result2 = {
							index: 1,
						};
					} else {
						let eff = get.recoverEffect(target, player, player);
						if (target.getDamagedHp() >= 2) {
							eff += 0.58 * eff;
						}
						let eff2 = get.attitude(player, target) * target.maxHp;
						let choice = eff > eff2 ? 0 : 1;
						result2 = await player
							.chooseControlList([`令${get.translation(target)}回复2点体力`, `令${get.translation(target)}摸${get.cnNumber(target.maxHp)}张牌`])
							.set("ai", () => _status.event.choice)
							.set("choice", choice)
							.forResult();
						if (result2.control == "cancel2") {
							return;
						}
					}
					event.result = {
						bool: true,
						targets: [target],
						cost_data: result2.index,
					};
				},
				async content(event, trigger, player) {
					let target = event.targets[0];
					if (get.attitude(player, target) > 0 && target.ai.shown > player.ai.shown) {
						player.addExpose(0.2);
					}
					if (event.cost_data == 0) {
						target.recover(2, player);
					} else {
						target.draw(target.maxHp, player);
					}
				},
			},
			black: {
				audio: "jlsg_qianchong",
				trigger: { global: "phaseEnd" },
				priority: 0.9,
				filter(event, player) {
					let evts = player.getHistory("useCard", e => get.color(e.card) == "black");
					return evts.length == 1;
				},
				async cost(event, trigger, player) {
					let { result } = await player.chooseTarget(`###${get.prompt("jlsg_qianchong")}###令一名角色失去2点体力或弃置其体力上限张牌`).set("ai", target => {
						let player = _status.event.player;
						let eff = 1.4 * jlsg.getLoseHpEffect(target) * (get.attitude(player, target) - 1);
						let eff2 = (get.attitude(player, target) - 1) * -Math.min(target.countCards("he"), target.maxHp);
						return Math.max(eff, eff2);
					});
					if (!result.bool) {
						return;
					}
					let target = result.targets[0];
					let result2;
					if (target.countCards("he") == 0) {
						result2 = {
							index: 0,
						};
					} else {
						let eff = 1.4 * jlsg.getLoseHpEffect(target) * (get.attitude(player, target) - 1);
						let eff2 = (get.attitude(player, target) - 1) * -Math.min(target.countCards("he"), target.maxHp);
						let choice = eff > eff2 ? 0 : 1;
						result2 = await player
							.chooseControlList([`令${get.translation(target)}失去2点体力`, `令${get.translation(target)}弃置${get.cnNumber(target.maxHp)}张牌`])
							.set("ai", () => _status.event.choice)
							.set("choice", choice)
							.forResult();
						if (result2.control == "cancel2") {
							return;
						}
					}
					event.result = {
						bool: true,
						targets: [target],
						cost_data: result2.index,
					};
				},
				async content(event, trigger, player) {
					let target = event.targets[0];
					if (get.attitude(player, target) < 0 && target.ai.shown > player.ai.shown) {
						player.addExpose(0.3);
					}
					if (event.cost_data == 0) {
						target.loseHp(2);
					} else {
						target.chooseToDiscard(target.maxHp, "he", true);
					}
				},
			},
			extra: {
				forced: true,
				locked: false,
				trigger: { player: "phaseEnd" },
				filter(event, player) {
					let evts = player.getHistory("useSkill");
					return !event.skill && evts.some(e => e.skill == "jlsg_qianchong_red") && evts.some(e => e.skill == "jlsg_qianchong_black");
				},
				popup: false,
				async content(event, trigger, player) {
					game.log(player, "获得了一个额外回合");
					player.insertPhase(event.name);
				},
			},
		},
		ai: {
			effect: {
				player_use: function (card, player, target) {
					if (_status.currentPhase != player) {
						return;
					}
					let color = get.color(card);
					if (!color) {
						return;
					}
					let cnt = player.getHistory("useCard", e => get.color(e) == color).length;
					if (cnt == 0) {
						return [1, 8];
					} else if (cnt == 1) {
						let color2 = color == "red" ? "black" : "red";
						let cnt2 = player.getHistory("useCard", e => get.color(e) == color2).length;
						if (_status.event.getParent("phase").skill || cnt2 > 1) {
							return;
						}
						return [1, -8];
					}
				},
			},
			pretao: true,
		},
	},
	jlsg_shangjian: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseDiscardBegin" },
		filter(event, player) {
			return player.countCards("h") > player.getHandcardLimit();
		},
		forced: true,
		async content(event, trigger, player) {
			let num = player.countCards("h") - player.getHandcardLimit();
			let num0 = num;
			let list = [];
			while (num > 0) {
				let select = [1, num];
				if (game.filterPlayer(p => p != player && !list.map(i => i[0]).includes(p)).length == 1) {
					select = num;
				}
				let { result } = await player
					.chooseCardTarget({
						forced: true,
						selectCard: [1, num],
						filterCard(card, player) {
							return !_status.event.list
								.map(i => i[1])
								.flat()
								.includes(card);
						},
						filterTarget(card, player, target) {
							return player != target && !_status.event.list.map(i => i[0]).includes(target);
						},
						ai1(card) {
							if (card.name == "du") {
								return 20;
							}
							if (ui.selected.cards.some(c => c.name == "du")) {
								return -Math.random();
							}
							return Math.random();
						},
						ai2: function (target) {
							const player = get.event("player"),
								att = get.attitude(player, target);
							if (ui.selected.cards.some(c => c.name == "du") && !target.hasSkillTag("nodu")) {
								return -20 * att;
							}
							return att + 2 * Math.random();
						},
						prompt: `尚俭：将${get.cnNumber(num0)}张手牌分配给其他角色`,
						prompt2: num == num0 ? null : `剩余${get.cnNumber(num)}张`,
					})
					.set("list", list);
				if (!result.bool) {
					return;
				}
				list.push([result.targets[0], result.cards]);
				player.addGaintag(result.cards, "olsujian_given");
				num -= result.cards.length;
			}
			let cards = list.map(i => i[1]).flat();
			await game
				.loseAsync({
					gain_list: list,
					player: player,
					cards: cards,
					giver: player,
					animate: "giveAuto",
				})
				.setContent("gaincardMultiple");
			player
				.when({ player: "phaseDiscardEnd" })
				.filter(evt => evt == trigger)
				.vars({ cnt: cards.length })
				.then(() => {
					player.draw(cnt);
				});
		},
	},
	jlsg_yanjiao: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.storage.jlsg_yanjiao = [null, false, false, false, false];
		},
		enable: "phaseUse",
		filter(event, player) {
			let invalid = [];
			let hand = player.getCards("h");
			invalid.push(player.storage.jlsg_yanjiao[1] || hand.length < 1);
			let nums = new Set(hand.map(c => get.number(c, player)));
			invalid.push(player.storage.jlsg_yanjiao[2] || hand.length < 2 || hand.length == nums.size);
			let suits = hand.map(c => get.suit(c, player));
			invalid.push(player.storage.jlsg_yanjiao[3] || hand.length < 3 || lib.suits.every(s => suits.filter(cs => cs == s).length < 3));
			let continuous = Array.from(new Array(14).keys()).some(n => nums.has(n) && nums.has(n + 1) && nums.has(n + 2) && nums.has(n + 3));
			invalid.push(player.storage.jlsg_yanjiao[4] || hand.length < 4 || !continuous);
			let valid5 = !player.storage.jlsg_yanjiao[5] && hand.length >= 5;
			if (valid5) {
				valid5 = lib.suits.some(s => {
					let nums = new Set(hand.filter(c => get.suit(c, player) == s).map(c => get.number(c, player)));
					return Array.from(new Array(14).keys()).some(n => nums.has(n) && nums.has(n + 1) && nums.has(n + 2) && nums.has(n + 3) && nums.has(n + 4));
				});
			}
			invalid.push(!valid5);
			return invalid.some(invalid => !invalid);
		},
		filterCard(card, player) {
			return lib.skill.jlsg_yanjiao.mayValid(ui.selected.cards.concat(card));
		},
		check(card) {
			return Math.random();
		},
		selectCard: [1, 5],
		complexCard: true,
		discard: false,
		lose: false,
		delay: false,
		filterTarget(_, player, target) {
			if (!lib.skill.jlsg_yanjiao.isValid(ui.selected.cards)) {
				return false;
			}
			return player != target;
		},
		filterOk() {
			return lib.skill.jlsg_yanjiao.isValid(ui.selected.cards);
		},
		isValid(cards) {
			let player = _status.event.player;
			let hand = player.getCards("h");
			if (player.storage.jlsg_yanjiao[cards.length]) {
				return false;
			}
			let nums;
			switch (cards.length) {
				case 1:
					return hand.every(c => get.number(c, player) <= get.number(cards[0], player));
				case 2:
					return get.number(cards[0], player) === get.number(cards[1], player);
				case 3: {
					let suit0 = get.suit(cards[0], player);
					return suit0 == get.suit(cards[1], player) && suit0 == get.suit(cards[2], player);
				}
				case 4:
					nums = cards.map(c => get.number(c, player)).sort((a, b) => a - b);
					return nums.every((n, i) => n - nums[0] == i);
				case 5: {
					let suit = get.suit(cards[0], player);
					if (cards.some(c => get.suit(c, player) != suit)) {
						return false;
					}
					nums = cards.map(c => get.number(c, player)).sort((a, b) => a - b);
					return nums.every((n, i) => n - nums[0] == i);
				}
				default:
					return false;
			}
		},
		mayValid(cards) {
			let player = _status.event.player;
			if (cards.length == 0) {
				return this.filter(null, player);
			}
			if (this.isValid(cards)) {
				return true;
			}
			let hand = player.getCards("h");
			hand.removeArray(cards);
			let nums = cards.map(c => get.number(c, player));
			let suits = cards.map(c => get.suit(c, player));
			let suit;
			if (suits.every(s => s == suits[0])) {
				suit = suits[0];
			}
			switch (cards.length) {
				case 1:
					if (!player.storage.jlsg_yanjiao[2] && hand.some(c => get.number(c, player) == nums[0])) {
						return true;
					}
					break;
				// fall through
				case 2:
					if (!player.storage.jlsg_yanjiao[3] && suit && hand.filter(c => get.suit(c, player) == suit).length + cards.length >= 3) {
						return true;
					}
					break;
				case 3:
				case 4: {
					nums.sort((a, b) => a - b);
					let num0 = nums[0],
						num1 = nums[nums.length - 1];
					if (player.storage.jlsg_yanjiao[4] && (player.storage.jlsg_yanjiao[5] || !suit)) {
						return false;
					}
					if (nums.some((n, i) => i != 0 && n == nums[i - 1])) {
						return false;
					}
					if (num1 - num0 + 1 > (player.storage.jlsg_yanjiao[4] ? 5 : 4)) {
						return false;
					}
					let allNums = hand.map(c => get.number(c, player));
					for (let i = num0; i <= num1; ++i) {
						if (!nums.includes(i) && !allNums.includes(i)) {
							return false;
						}
					}
					while (allNums.includes(num1 + 1)) {
						num1 += 1;
						if (num1 - num0 + 1 >= (player.storage.jlsg_yanjiao[4] ? 5 : 4)) {
							return true;
						}
					}
					while (allNums.includes(num0 - 1)) {
						num0 -= 1;
						if (num1 - num0 + 1 >= (player.storage.jlsg_yanjiao[4] ? 5 : 4)) {
							return true;
						}
					}
					return false;
				}
				default:
					return false;
			}
		},
		async content(event, trigger, player) {
			let num = event.cards.length;
			let target = event.target;
			player.storage.jlsg_yanjiao[num] = true;
			player.when({ player: "phaseUseAfter", global: "phaseAfter" }).then(() => {
				player.storage.jlsg_yanjiao = [null, false, false, false, false];
			});
			await player.give(event.cards, target);
			await player.draw(num);
			if (player.hasMark("jlsg_xingshen")) {
				let { result } = await player.chooseBool(`是否对${get.translation(target)}造成${num}点伤害？`, get.damageEffect(target, player, player) > 0);
				if (result.bool) {
					target.damage(num);
				}
			}
		},
		combo: "jlsg_xingshen",
		ai: {
			order: 7,
			result: {
				target(player, target) {
					if (!player.hasMark("jlsg_xingshen")) {
						return 2;
					}
					return get.attitude(player, target) >= 0 ? 2 : -1;
				},
			},
		},
	},
	jlsg_xingshen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		filter(event, player) {
			return event.num > 0;
		},
		getIndex(event, player) {
			return event.num;
		},
		forced: true,
		async content(event, trigger, player) {
			await player.draw(2);
			if (!player.hasMark("jlsg_xingshen")) {
				await player.recover();
				player.addMark("jlsg_xingshen");
				player.when({ player: ["phaseEnd", "phaseAfter"] }).then(() => {
					player.removeMark("jlsg_xingshen");
				});
			}
		},
		intro: {
			content: "mark",
		},
	},

	jlsg_jianzheng: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardToPlayer" },
		filter: function (event, player) {
			if (player.hasSkill("jlsg_jianzheng_used") || !event.isFirstTarget) {
				return false;
			}
			let history = player.hasHistory("useSkill", evt => {
				if (evt.skill != "jlsg_jianzheng") {
					return false;
				}
				return evt.event.getParent("useCard") == event.getParent("useCard");
			});
			if (history) {
				return false;
			}
			if (!player.canCompare(event.player)) {
				return false;
			}
			let info = get.info(event.card);
			if (info.multitarget) {
				return false;
			}
			if (info.filterAddedTarget) {
				return false;
			}
			return event.player != player && ["basic", "trick"].includes(get.type(event.card));
		},
		check(event, player) {
			let effect = event.targets.reduce((effect, target) => effect + get.effect(target, event.card, event.player, player), 0),
				effect2 = game.filterPlayer().reduce((effect, current) => {
					let eff = get.effect(current, event.card, event.player, player);
					return eff > 0 ? effect + eff : effect;
				}, 0);
			if (!event.targets.includes(player)) {
				effect2 += get.effect(player, event.card, event.player, player) * Math.random() * 2;
			}
			effect2 += get.effect(event.player, { name: "guohe_copy2" }, player, player);
			effect2 += get.effect(player, { name: "guohe_copy2" }, event.player, player);
			if (player.countCards("h") == 1) {
				effect2 = effect2 * 0.5;
			}
			return effect2 > effect;
		},
		prompt(event, player) {
			return `是否对${get.translation(event.player)}发动【谏征】与其拼点？)`;
		},
		prompt2(event, player) {
			return `若你赢，你可以修改${get.translation(event.card)}的结算目标,否则你也成为此牌的目标，且此技能本回合失效`;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const { result: result1 } = await player.chooseToCompare(trigger.player).set("small", get.effect(player, trigger.card, trigger.player, player) > 0);
			if (result1.bool) {
				const { result: result2 } = await player
					.chooseTarget(`谏征：请选择${get.translation(trigger.card)}的结算目标`)
					.set("selectTarget", [0, game.countPlayer()])
					.set("filterTarget", () => true)
					.set("ai", target => {
						const source = get.event("source"),
							player = get.player(),
							card = get.event("card");
						return get.effect(target, card, source, player);
					})
					.set("source", trigger.player)
					.set("card", trigger.card);
				if (result2.bool) {
					result2.targets.sortBySeat(_status.currentPhase);
					trigger.getParent().targets.addArray(result2.targets);
					trigger.getParent().excluded.addArray(game.filterPlayer(i => !result2.targets.includes(i)));
					if (result2.targets.length) {
						trigger.player.line(result2.targets);
						game.log(player, "将", trigger.card, "的结算目标改为", result2.targets);
					} else {
						player.line(trigger.targets);
						game.log(player, "取消了", trigger.card, "的所有结算目标");
					}
				}
			} else {
				if (!trigger.getParent().targets.includes(player)) {
					trigger.getParent().targets.add(player);
					trigger.player.line(player);
					game.log(player, "成为", trigger.card, "的额外目标");
				}
				player.addTempSkill("jlsg_jianzheng_used");
			}
		},
		ai: {
			threaten: 0.9,
			expose: 0.25,
		},
		subSkill: {
			used: {
				sub: true,
				temp: true,
				charlotte: true,
				mark: true,
				marktext: "谏",
				intro: {
					content: "本回合“谏征”失效",
				},
			},
		},
	},
	jlsg_tianbian: {
		audio: "ext:极略/audio/skill:2",
		enable: ["chooseToUse", "chooseToRespond"],
		trigger: { global: ["chooseToCompareBegin"] },
		hiddenCard(player, name) {
			if (player != _status.currentPhase && get.type(name) == "basic" && lib.inpile.includes(name)) {
				return true;
			}
		},
		filter(event, player) {
			if (event.name == "chooseToCompare") {
				if (!player.countCards("h")) {
					return false;
				}
				if (player == event.player) {
					return true;
				}
				if (event.targets) {
					return event.targets.includes(player);
				}
				return player == event.target;
			}
			if (event.responded || player == _status.currentPhase || event.jlsg_tianbian) {
				return false;
			}
			return lib.inpile.some(i => get.type(i) == "basic" && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event));
		},
		delay: false,
		async content(event, trigger, player) {
			const evt = trigger?.name == "chooseToCompare" ? trigger : event.getParent(2);
			evt.set("jlsg_tianbian", true);
			const cards = get.cards(3, true);
			const cardsx = cards.slice().map(card => {
				const cardx = ui.create.card();
				cardx.init(get.cardInfo(card));
				cardx._cardid = card.cardid;
				return cardx;
			});
			player.directgains(cardsx, null, "jlsg_tianbian_hs");
			let str = "天辩：选择要",
				next;
			if (evt.name == "chooseToCompare") {
				str += "拼点的牌";
			} else {
				str += `${evt.name == "chooseToUse" ? "使用" : "打出"}的牌`;
			}
			if (evt.name != "chooseToCompare") {
				//使用|打出
				if (!_status.emptyEvent) {
					_status.emptyEvent = await game.createEvent("empty", false).setContent(function () {});
					game.broadcastAll(function (info) {
						_status.emptyEvent = info;
					}, _status.emptyEvent);
				}
				const args = { ...evt };
				args.originName = args.name;
				for (let i in { ..._status.emptyEvent }) {
					delete args[i];
				}
				for (let i in args) {
					if (args[i] === undefined) {
						delete args[i];
					}
				}
				args.selectTarget ??= [0, 0];
				args.filterTarget ??= false;
				//重新game.check()
				delete args.fakeforce;
				delete args._checked;
				next = player
					.chooseCardTarget(args)
					.set("ai1", card => {
						if (get.type(card) == "equip") {
							return 0;
						}
						const evt = get.event().getParent(3),
							player = get.event().player;
						if (evt.type == "phase" && !player.hasValueTarget(card, null, true)) {
							return 0;
						}
						if (evt && (evt.ai || evt.ai1)) {
							const tmp = _status.event;
							_status.event = evt;
							const result = (evt.ai || evt.ai1)(card, player, evt);
							_status.event = tmp;
							return result;
						}
						return 1;
					})
					.set("ai2", target => {
						if (get.event().originName == "chooseToRespond") {
							return 1;
						}
						const player = get.player(),
							card = ui.selected.cards[0];
						return get.effect(target, card, player, player);
					});
			} else {
				//拼点
				const hs = player.getCards("h");
				next = player
					.chooseCard()
					.set("ai", (card, cards) => {
						const samll = get.event().getParent().getTrigger().samll,
							total = get.event("hs").concat(cards || []);
						if (samll) {
							return Math.min(...total.map(c => get.number(c))) == get.number(card);
						}
						return Math.max(...total.map(c => get.number(c))) == get.number(card);
					})
					.set("hs", hs.length <= 1 ? [] : hs);
			}
			//公共部分
			next.set("prompt", str);
			next.set("position", "s");
			next.set("filterCard", (card, player, event) => get.event("cards")?.includes(card));
			next.set(
				"cards",
				cardsx.filter(card => {
					if (evt.name != "chooseToCompare") {
						if (get.type(card) != "basic") {
							return false;
						}
						if (player.hasSkill("aozhan") && card.name == "tao") {
							return evt.filterCard({ name: "sha", isCard: true, cards: [card] }, evt.player, evt) || evt.filterCard({ name: "shan", isCard: true, cards: [card] }, evt.player, evt);
						}
						return evt.filterCard(card, evt.player, evt);
					}
					return true;
				})
			);
			const result = await next.forResult();
			let card;
			if (result.bool) {
				card = cards.find(card => card.cardid === result.cards[0]._cardid);
			}
			const cards2 = player.getCards("s", card => card.hasGaintag("jlsg_tianbian_hs"));
			if (player.isOnline2()) {
				player.send(
					(cards, player) => {
						cards.forEach(i => i.delete());
						if (player == game.me) {
							ui.updatehl();
						}
					},
					cards2,
					player
				);
			}
			cards2.forEach(i => i.delete());
			if (player == game.me) {
				ui.updatehl();
			}
			if (evt.name != "chooseToCompare") {
				if (card) {
					let cardx = get.autoViewAs(card, card),
						name = card.name,
						aozhan = player.hasSkill("aozhan") && name == "tao";
					if (aozhan) {
						name = evt.filterCard(
							{
								name: "sha",
								isCard: true,
								cards: [card],
							},
							evt.player,
							evt
						)
							? "sha"
							: "shan";
					}
					if (evt.name == "chooseToUse") {
						evt.result = { bool: true, card: cardx, cards: card, targets: result.targets };
					} else {
						delete evt.result.skill;
						delete evt.result.used;
						evt.result.card = cardx;
						if (aozhan) {
							evt.result.card.name = name;
						}
						evt.result.cards = [card];
					}
					evt.redo();
					return;
				}
				evt.goto(0);
			} else {
				if (!card) {
					return;
				}
				trigger.fixedResult ??= {};
				trigger.fixedResult[player.playerid] = card;
				await game.cardsGotoOrdering(card);
			}
		},
		ai: {
			effect: {
				target(card, player, target, effect) {
					if (get.tag(card, "respondShan")) {
						return 0.7;
					}
					if (get.tag(card, "respondSha")) {
						return 0.7;
					}
				},
			},
			order: 11,
			respondShan: true,
			respondSha: true,
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
	},
	jlsg_xuhe: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCard2" },
		filter(event, player) {
			if (!["basic", "trick"].includes(get.type(event.card))) {
				return false;
			}
			let targets = (event._targets || event.targets).slice();
			if (!targets.length) {
				return false;
			}
			if (event.player == player) {
				return player.isHealthy();
			} else {
				return player.isDamaged() && targets.includes(player);
			}
		},
		forced: true,
		async content(event, trigger, player) {
			let targets = (trigger._targets || trigger.targets).slice(),
				targetx = [player];
			if (trigger.player == player) {
				targetx = game.filterPlayer(cur => cur != player);
			}
			trigger.directHit.addArray(targetx);
			game.log(targetx, "无法响应", trigger.card);
			let drawCheck = player.hasHistory("gain", evt => {
				if (!evt.getParent() || evt.getParent().name != "draw") {
					return false;
				}
				return evt.getParent().skill == "jlsg_xuhe";
			});
			if (!drawCheck) {
				player
					.when({ global: "useCardAfter" })
					.filter(evt => evt == trigger)
					.then(() => {
						if (
							!player.hasHistory("gain", evt => {
								if (!evt.getParent() || evt.getParent().name != "draw") {
									return false;
								}
								return evt.getParent().skill == "jlsg_xuhe";
							})
						) {
							player
								.chooseBool(`虚猲：是否摸${drawNum}张牌？`)
								.set("ai", (event, player) => {
									return get.effect(player, { name: "draw" }, player, player) * get.event("drawNum");
								})
								.set("drawNum", drawNum);
						}
					})
					.then(() => {
						if (result.bool) {
							player.logSkill("jlsg_xuhe");
							player.draw(drawNum).set("skill", "jlsg_xuhe");
						}
					})
					.vars({ drawNum: targets.length });
			}
		},
		ai: {
			halfneg: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "directHit_ai") {
					if (!arg || !arg.card || !arg.target) {
						return false;
					}
					return player.isHealthy();
				} else if (tag == "halfneg") {
					return player.isDamaged();
				}
			},
		},
		global: ["jlsg_xuhe_globalAi"],
		subSkill: {
			globalAi: {
				sourceSkill: "jlsg_xuhe",
				sub: true,
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (!game.hasPlayer(cur => cur.hasSkill("jlsg_xuhe"))) {
							return false;
						}
						if (!arg || !arg.card || !arg.target || arg.target == player) {
							return false;
						}
						return arg.target.hasSkill("jlsg_xuhe") && arg.target.isDamaged();
					},
				},
			},
		},
	},
	jlsg_zhukou: {
		audio: "ext:极略/audio/skill:2",
		direct: true,
		trigger: { global: "phaseUseEnd" },
		filter(event, player) {
			return player.hasHistory("useCard", evt => evt.getParent("phaseUse") == event);
		},
		async content(event, trigger, player) {
			const func = () => {
				const event = get.event();
				const controls = [
					link => {
						const targets = game.filterPlayer();
						if (targets.length) {
							for (let i = 0; i < targets.length; i++) {
								const target = targets[i];
								target.classList.remove("selectable");
								target.classList.remove("selected");
								const counterNode = target.querySelector(".caption");
								if (counterNode) {
									counterNode.childNodes[0].innerHTML = ``;
								}
							}
							ui.selected.targets.length = 0;
							game.check();
						}
						return;
					},
				];
				event.controls = [ui.create.control(controls.concat(["清除选择", "stayleft"]))];
			};
			if (event.isMine()) {
				func();
			} else if (event.isOnline()) {
				event.player.send(func);
			}
			const sum = player
				.getHistory("useCard", evt => evt.getParent("phaseUse") == trigger)
				.map(evt => get.type2(evt.card))
				.unique().length;
			const { result } = await player
				.chooseTarget(`逐寇：是否分配至多${sum}点伤害？`, [1, sum], false)
				.set("filterTarget", (card, player, target) => target != player)
				.set("ai", function (target) {
					return get.damageEffect(target, player, player);
				})
				.set("custom", {
					add: {
						confirm: function (bool) {
							if (bool != true) {
								return;
							}
							const event = get.event().parent;
							if (event.controls) {
								event.controls.forEach(i => {
									if (i.innerText == "清除选择") {
										i.custom();
									}
									i.close();
								});
							}
							if (ui.confirm) {
								ui.confirm.close();
							}
							game.uncheck();
						},
						target: function () {
							if (ui.selected.targets.length) {
								return;
							}
							const targets = game.filterPlayer();
							if (targets.length) {
								for (let i = 0; i < targets.length; i++) {
									const target = targets[i];
									const counterNode = target.querySelector(".caption");
									if (counterNode) {
										counterNode.childNodes[0].innerHTML = ``;
									}
								}
							}
							if (!ui.selected.targets.length) {
								const evt = event.parent;
								if (evt.controls) {
									evt.controls[0].classList.add("disabled");
								}
							}
						},
					},
					replace: {
						target: function (target) {
							const event = get.event(),
								sum = get.event("sum");
							if (!event.isMine()) {
								return;
							}
							if (target.classList.contains("selectable") == false) {
								return;
							}
							if (ui.selected.targets.length >= sum) {
								return false;
							}
							target.classList.add("selected");
							ui.selected.targets.push(target);
							let counterNode = target.querySelector(".caption");
							const count = ui.selected.targets.filter(i => i == target).length;
							if (counterNode) {
								counterNode = counterNode.childNodes[0];
								counterNode.innerHTML = `×${count}`;
							} else {
								counterNode = ui.create.caption(`<span style="font-size:24px; font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`, target);
								counterNode.style.right = "30px";
								counterNode.style.bottom = "15px";
							}
							const evt = event.parent;
							if (evt.controls) {
								evt.controls[0].classList.remove("disabled");
							}
							game.check();
						},
					},
				})
				.set("sum", sum);
			if (result.bool) {
				if (!event.isMine()) {
					await game.delay();
				}
				const targets = result.targets;
				await player.logSkill("jlsg_zhukou", targets);
				for (let i = 0; i < targets.length; i++) {
					await targets[i].damage("nocard");
					await game.delayx();
				}
			}
		},
		ai: {
			expose: 0.25,
		},
	},
	jlsg_duannian: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			return player.countDiscardableCards(player, "h");
		},
		check(event, player) {
			if (player.isDamaged()) {
				return get.recoverEffect(player, player, player);
			}
			if (event.player == player) {
				return player.countCards("h", card => player.hasValueTarget(card)) < 3;
			}
			return player.getCards("h").reduce((v, c) => v + get.value(c, player), 0) / player.countCards("h") < 8;
		},
		prompt: "断念：是否弃置所有手牌并摸等量张牌？",
		async content(event, trigger, player) {
			const cards = player.getDiscardableCards(player, "h");
			await player.discard(cards);
			await player.draw(cards.length);
			let list = ["选项一", "选项二"],
				choiceList = ["使用一张牌", "回复1点体力"];
			const { result } = await player
				.chooseControl(list)
				.set("prompt", "断念：请选择一项")
				.set("choiceList", choiceList)
				.set("ai", () => _status.event.choice)
				.set(
					"choice",
					(function () {
						let num = player
							.getCards("h")
							.map(c => player.getUseValue(c))
							.sort((a, b) => b - a)[0];
						let recover = get.recoverEffect(player, player, player);
						if (recover > num) {
							return "选项二";
						}
						return "选项一";
					})()
				);
			if (result.control == "选项一") {
				await player.chooseToUse();
			} else {
				await player.recover(1);
			}
		},
	},
	jlsg_jingce: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		locked: false,
		mod: {
			cardUsable(card, player, num) {
				if (get.name(card, player) == "sha") {
					return num + (player.storage?.jlsg_jingce?.sha || 0);
				}
			},
		},
		mark: true,
		intro: {
			mark(dialog, storage, player) {
				let list2 = [lib.skill.jlsg_jingce.countShaUsable(player), 2 + (player.storage?.jlsg_jingce?.draw || 0)];
				let drawCheck = player.getAllHistory("gain", evt => {
					return evt.getParent(2).name == "phaseDraw";
				});
				if (drawCheck.length) {
					drawCheck = drawCheck[drawCheck.length - 1].cards.length;
				}
				if (list2[1] < drawCheck) {
					list2[1] = drawCheck;
				}
				dialog.addText(`出杀次数(${list2[0]})`);
				dialog.addText(`摸牌阶段摸牌数(${list2[1]})`);
			},
		},
		usable: 1,
		trigger: { player: "useCardAfter" },
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
				var mod = get.info(value).mod[name];
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
		checkList(event) {
			const list = [0, 0, 0],
				player = event.player;
			player.storage.jlsg_jingce ??= { draw: 0, sha: 0 };
			const num = player.getHistory("useCard", evt => {
					return evt.getParent("phaseUse") == event.getParent("phaseUse");
				}).length,
				list2 = [lib.skill.jlsg_jingce.countShaUsable(player), 2 + (player.storage?.jlsg_jingce?.draw || 0), player.maxHp];
			let drawCheck = player.getAllHistory("gain", evt => {
				return evt.getParent(2).name == "phaseDraw";
			});
			if (drawCheck.length) {
				drawCheck = drawCheck[drawCheck.length - 1].cards.length;
			}
			if (list2[1] < drawCheck) {
				list2[1] = drawCheck;
			}
			for (let i = 0; i < 3; i++) {
				if (list2[i] == num) {
					list[i] = list2[i];
				}
			}
			return [list2, list];
		},
		filter(event, player) {
			if (!player.isPhaseUsing(true)) {
				return false;
			}
			let checkList = lib.skill.jlsg_jingce.checkList(event)[1];
			return (checkList ?? []).filter(i => i).length;
		},
		async cost(event, trigger, player) {
			const [numList, checkList] = lib.skill.jlsg_jingce.checkList(trigger);
			const choiceList = [`使用【杀】次数(${numList[0]})`, `摸牌阶段摸牌数(${numList[1]})`, `体力上限(${numList[2]})`],
				dialog = ui.create.dialog("是否发动【精策】", "hidden");
			dialog.forcebutton = true;
			for (let i = 0; i < checkList.length; i++) {
				let str = choiceList[i];
				if (checkList[i]) {
					choiceList[i] = str.slice(0, -1) + `<span class='yellowtext'>+1</span>` + str.slice(-1);
				} else {
					choiceList[i] = '<span style="opacity:0.5">' + str + "</span>";
				}
				dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">' + choiceList[i] + "</div>");
			}
			event.result = await player
				.chooseBool()
				.set("dialog", dialog)
				.set("ai", () => true)
				.forResult();
		},
		async content(event, trigger, player) {
			const checkList = lib.skill.jlsg_jingce.checkList(trigger)[1];
			player.storage.jlsg_jingce ??= { draw: 0, sha: 0 };
			if (checkList[0]) {
				player.storage.jlsg_jingce.sha++;
			}
			if (checkList[1]) {
				player.storage.jlsg_jingce.draw++;
			}
			if (checkList[2]) {
				player.gainMaxHp(1);
			}
			player.markSkill("jlsg_jingce");
			await player.draw(2);
		},
		group: ["jlsg_jingce_effect"],
		subSkill: {
			effect: {
				sub: true,
				charlotte: true,
				forced: true,
				popup: false,
				trigger: { player: "phaseDrawBegin2" },
				filter(event) {
					return !event.numFixed;
				},
				content() {
					trigger.num += player.storage?.jlsg_jingce?.draw || 0;
				},
			},
		},
	},
	jlsg_guanxu: {
		audio: "ext:极略/audio/skill:2",
		init(player) {
			player.storage.jlsg_guanxu = Array.from({ length: 8 }, (v, i) => i).randomGet();
			player.markSkill("jlsg_guanxu");
		},
		onremove: true,
		intro: {
			nocount: true,
			content(storage, player) {
				return get.skillInfoTranslation("jlsg_guanxu", player);
			},
		},
		trigger: { global: "phaseBegin" },
		filter(event, player) {
			return event.player.countCards("h");
		},
		prompt(event, player) {
			return "观虚：是否观看" + get.translation(event.player) + "的手牌？";
		},
		prompt2(event, player) {
			let str = get.skillInfoTranslation("jlsg_guanxu", player).slice(22, -1);
			if (str.includes("X")) {
				str = str.slice(0, -7).replace("X", event.player.getHp().toString());
			}
			return str;
		},
		logTarget(event) {
			return event.player;
		},
		check(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			const storage = player.storage.jlsg_guanxu,
				cards = trigger.player.getCards("h");
			let str = get.skillInfoTranslation("jlsg_guanxu", player).slice(25, -1);
			if (storage == 0) {
				str = str.slice(0, -7).replace("X", trigger.player.getHp().toString());
			}
			for (let i of cards) {
				i.addKnower(player);
			}
			const cards2Info = new Map([
				[0, trigger.player.getGainableCards(player, "h")],
				[1, trigger.player.getDiscardableCards(player, "h")],
				[
					2,
					(function () {
						let cards2 = trigger.player.getDiscardableCards(player, "h");
						let max = Math.max(...cards2.map(i => get.number(i)));
						return cards2.filter(i => get.number(i) == max);
					})(),
				],
				[
					3,
					(function () {
						let cards2 = trigger.player.getDiscardableCards(player, "h");
						let min = Math.min(...cards2.map(i => get.number(i)));
						return cards2.filter(i => get.number(i) == min);
					})(),
				],
				[
					4,
					(function () {
						let cards2 = trigger.player.getDiscardableCards(player, "h");
						let map = cards2.reduce((list, card) => {
							let suit = get.suit(card);
							if (!list[suit]) {
								list[suit] = 0;
							}
							list[suit]++;
							return list;
						}, {});
						let min = Math.min(...Object.values(map));
						return cards2.filter(i => map[get.suit(i)] == min);
					})(),
				],
				[
					5,
					(function () {
						let cards2 = trigger.player.getDiscardableCards(player, "h");
						let map = cards2.reduce((list, card) => {
							let suit = get.suit(card);
							if (!list[suit]) {
								list[suit] = 0;
							}
							list[suit]++;
							return list;
						}, {});
						let max = Math.max(...Object.values(map));
						return cards2.filter(i => map[get.suit(i)] == max);
					})(),
				],
				[6, cards],
				[7, cards],
			]);
			const numInfo = new Map([
				[0, trigger.player.getHp()],
				[1, 1],
				[2, cards2Info.get(2).length],
				[3, cards2Info.get(3).length],
				[4, cards2Info.get(4).length],
				[5, cards2Info.get(5).length],
				[6, 1],
				[7, 1],
			]);
			const func = () => {
				const event = get.event();
				event.controls = [
					ui.create.control([
						link => {
							ui.click.cancel();
						},
						"取消",
					]),
				];
			};
			if (storage > 1 && storage < 6) {
				if (event.isMine()) {
					func();
				} else if (event.isOnline()) {
					event.player.send(func);
				}
			}
			const { result } = await player
				.chooseButton(["观虚", get.translation(trigger.player) + "的手牌", cards, str])
				.set("forced", false)
				.set("complexSelect", true)
				.set("cards2", cards2Info.get(storage))
				.set("num", numInfo.get(storage))
				.set("storage", storage)
				.set("source", trigger.player)
				.set("selectButton", () => {
					if (get.event("storage") > 1 && get.event("storage") < 6) {
						return [0, get.event("num")];
					}
					return [1, get.event("num")];
				})
				.set("filterButton", button => {
					if (!get.event("cards2").includes(button.link)) {
						return false;
					}
					if (get.event("storage") > 1 && get.event("storage") < 6) {
						if (get.event("cards2").includes(button.link) && !ui.selected.buttons.includes(button)) {
							button.classList.add("selected");
							ui.selected.buttons.add(button);
						}
						return false;
					}
					return true;
				})
				.set("ai", button => {
					const storage = get.event("storage"),
						player = _status.event.player,
						target = get.event("source");
					const att = get.attitude(player, target),
						value = get.value(button.link, target);
					switch (storage) {
						case 0:
							if (att < 0) {
								return value;
							}
							break;
						case 1:
							if (att > 0) {
								return 8 - value;
							}
							break;
						case 6: {
							let sha = get.autoViewAs({ name: "sha", isCard: true }, []);
							return game.hasPlayer(current => current != target && get.effect(target, sha, current, player) > 0);
						}
						case 7: {
							let damage = get.damageEffect(target, undefined, player, "thunder"),
								result = {
									card: button.link,
									name: button.link.name,
									number: get.number(button.link),
									suit: get.suit(button.link),
									color: get.color(button.link),
								};
							if (lib.card.shandian.judge(button.link) < 0) {
								result.bool = false;
							} else if (lib.card.shandian.judge(button.link) > 0) {
								result.bool = true;
							} else {
								result.bool = null;
							}
							_status.event.cardname = "shandian";
							game.checkMod(target, result, "judge", target);
							delete _status.event.cardname;
							if (result.bool && damage >= 0) {
								if (att > 0) {
									return 8 - value;
								} else {
									return value + damage;
								}
							}
							if (att < 0) {
								return value;
							}
							break;
						}
						default:
							return 0;
					}
				})
				.set("filterOk", () => {
					const player = _status.event.player,
						target = get.event("source");
					if (_status.connectMode && !player.isAuto) {
						return true;
					} else if (!_status.auto) {
						return true;
					}
					const storage = get.event("storage"),
						att = get.attitude(player, target);
					switch (storage) {
						case 2: {
							let skills = target.getSkills(null, false, false).filter(i => {
								let info = get.info(i);
								return info && !info.charlotte && !info.persevereSkill;
							});
							if (skills.length) {
								if (att > 0 && skills.some(i => get.info(i).ai?.nag)) {
									return true;
								}
							}
							if (att < 0) {
								return true;
							}
							return false;
						}
						case 3:
							return att > 0;
						case 4:
							return att < 0;
						case 5:
							return att > 0;
						default:
							return true;
					}
				})
				.set("custom", {
					add: {
						confirm: function (bool) {
							if (bool != true) {
								return;
							}
							const event = get.event().parent;
							if (event.controls) {
								event.controls.forEach(i => i.close());
							}
							if (ui.confirm) {
								ui.confirm.close();
							}
							game.uncheck();
						},
					},
					replace: {},
				});
			if (result.bool) {
				game.log("本次效果为：", str);
				const cardx = result.links;
				if (storage > 0 && storage < 6) {
					await trigger.player.discard(cardx);
				}
				switch (storage) {
					case 0:
						await player.gain(trigger.player, cardx, "giveAuto");
						break;
					case 1:
						await trigger.player.gainMaxHp(1);
						await trigger.player.recover(1);
						break;
					case 2:
						var skills = trigger.player.getSkills(null, false, false).filter(i => {
							if (!lib.translate[i] || !lib.translate[i + "_info"]) {
								return false;
							}
							let info = get.info(i);
							return info && !info.charlotte && !info.persevereSkill;
						});
						if (skills.length) {
							var buttons = skills.map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(i) + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
							var { result: result2 } = await player
								.chooseButton(true, [get.translation(trigger.player) + "的技能", [buttons, "textbutton"]])
								.set("ai", button => {
									if (get.attitude(get.player(), get.event("source")) < 0) {
										return get.skillRank(button.link);
									}
									return get.info(button.link).ai?.neg;
								})
								.set("source", trigger.player);
							if (result2.bool) {
								trigger.player.popup(result2.links[0]);
								trigger.player.tempBanSkill(result2.links[0]);
							}
						}
						break;
					case 3:
						var skills = get.gainableSkills();
						skills.removeArray(player.getSkills(null, false, false));
						skills = skills.filter(skill => {
							const info = lib.skill[skill];
							if (info.ai?.combo) {
								return player.hasSkill(info.ai?.combo, null, false, false);
							}
							return true;
						});
						skills = skills.randomGets(3);
						var buttons = skills.map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(i) + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
						var { result: result2 } = await trigger.player
							.chooseButton(true, ["选择要获得的技能", [buttons, "textbutton"]])
							.set("ai", button => get.skillRank(button.link))
							.set("source", trigger.player);
						if (result2.bool) {
							await trigger.player.addSkills(result2.links);
						}
						break;
					case 4:
						if (cardx.every(i => get.color(i) == "black")) {
							await trigger.player.loseMaxHp(1);
						}
						break;
					case 5:
						await trigger.player.draw(cardx.length * 2);
						break;
					case 6:
						var { result: result2 } = await player
							.chooseTarget("###选择一名角色令其获得" + get.translation(cardx) + "###且可以对" + get.translation(trigger.player) + "使用一张“杀”")
							.set("source", trigger.player)
							.set("cardx", cardx[0])
							.set("filterTarget", (card, player, target) => target != get.event("source"))
							.set("ai", target => {
								const sha = get.autoViewAs({ name: "sha", isCard: true }, []);
								return target.getUseValue(get.event("cardx")) + get.effect(get.event("source"), sha, target, player);
							});
						if (result2.bool) {
							const target = result2.targets[0];
							await trigger.player.give(cardx, target);
							const sha = get.autoViewAs({ name: "sha", isCard: true }, []);
							if (target.canUse(sha, trigger.player, false)) {
								await target.useCard(sha, trigger.player);
							}
						}
						break;
					case 7:
						await trigger.player.lose(cardx[0], ui.cardPile, "insert");
						game.log(player, "将", trigger.player, "的一张手牌置于牌堆顶");
						await trigger.player.executeDelayCardEffect("shandian");
						break;
				}
			} else {
				await game.delayx();
			}
			let num2 = player.storage.jlsg_guanxu;
			player.storage.jlsg_guanxu = Array.from({ length: 8 }, (v, i) => i)
				.remove(num2)
				.randomGet();
			player.update();
		},
		ai: {
			expose: 0.25,
		},
	},
	jlsg_yashi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "damageEnd" },
		getIndex(event, player) {
			return event.num;
		},
		filter(event, player) {
			return event.num > 0;
		},
		check(event, player) {
			return true;
		},
		prompt(event, player) {
			return "雅士：是否摸两张牌？";
		},
		prompt2(event, player) {
			let str = "然后可以";
			if (player.hasSkill("jlsg_guanxu", null, false, false)) {
				str += "重置“观虚”";
			} else {
				str += "获得“观虚”";
			}
			return str;
		},
		async content(event, trigger, player) {
			await player.draw(2);
			let result;
			if (!player.hasSkill("jlsg_guanxu")) {
				result = await player
					.chooseBool("是否获得技能“观虚”？")
					.set(ai, () => true)
					.forResult();
			} else {
				result = await player
					.chooseBool(`###是否重置“观虚”？###${get.skillInfoTranslation("jlsg_guanxu", player)}`)
					.set("ai", () => true)
					.forResult();
			}
			if (!result.bool) {
				return;
			}
			if (!player.hasSkill("jlsg_guanxu")) {
				await player.addSkills("jlsg_guanxu");
			} else {
				let num2 = player.storage.jlsg_guanxu;
				player.storage.jlsg_guanxu = Array.from({ length: 8 }, (v, i) => i)
					.remove(num2)
					.randomGet();
				player.update();
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
			threaten: 0.6,
		},
	},
	jlsg_tunan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			const target = event.player,
				next = event.player.getNext(),
				sha = get.autoViewAs({ name: "sha" }, []),
				shunshou = get.autoViewAs({ name: "shunshou" }, []);
			if (!target.canUse(sha, next, false) && !target.canUse(shunshou, next, false)) {
				return false;
			}
			return target.isIn() && target != next;
		},
		check(event, player) {
			const target = event.player,
				next = event.player.getNext(),
				sha = get.autoViewAs({ name: "sha" }, []),
				shunshou = get.autoViewAs({ name: "shunshou" }, []);
			return get.effect(next, sha, target, player) > 0 || get.effect(next, shunshou, target, player) > 0;
		},
		prompt(event, player) {
			const target = event.player,
				next = event.player.getNext();
			return `图南：是否令${get.translation(target)}对${get.translation(next)}使用一张无距离限制和不计入次数的【杀】或【顺手牵羊】？`;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const target = trigger.player,
				next = trigger.player.getNext(),
				list = ["sha", "shunshou"].filter(name => {
					const card = get.autoViewAs({ name }, []);
					return trigger.player.canUse(card, next, false);
				});
			if (!next.countGainableCards(trigger.player, "hej")) {
				list.remove("shunshou");
			}
			const { result } = await player
				.chooseControl(list)
				.set("prompt", `请选择${get.translation(target)}对${get.translation(next)}使用的牌`)
				.set("ai", () => get.event("choice"))
				.set(
					"choice",
					(function () {
						const cards = list.map(name => {
							const card = get.autoViewAs({ name: name }, []);
							return get.effect(next, card, target, player);
						});
						let num = Math.max(...cards);
						return list[cards.indexOf(num)];
					})()
				);
			if (result.control != "cancel2") {
				const card = get.autoViewAs({ name: result.control }, []);
				await target.useCard(card, next, false);
			}
		},
	},
	jlsg_bijing: {
		audio: "ext:极略/audio/skill:2",
		trigger: { target: "useCardToTargeted" },
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			if (get.name(event.card) != "sha" && get.type(event.card, null, false) != "trick") {
				return false;
			}
			return event.player.countDiscardableCards(player, "he") > 1 && player.countDiscardableCards(player, "he") > 0;
		},
		check(event, player) {
			let effect = get.effect(player, event.card, event.player, player),
				att = get.attitude(player, event.player);
			if (effect / att > 0) {
				return false;
			}
			return get.effect(player, { name: "guohe_copy2" }, player, player) + 2 * get.effect(event.player, { name: "guohe_copy2" }, player, player);
		},
		prompt(event, player) {
			return `闭境：是否弃置${get.translation(event.player)}的两张牌，然后弃置自己一张牌`;
		},
		prompt2(event, player) {
			return `若弃置的牌颜色均相同，你令${get.translation(event.card)}对你无效`;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const { result: result1 } = await player
				.discardPlayerCard(true, "he", [2, 2], trigger.player)
				.set("ai", button => {
					if (get.event("check") > 0) {
						return false;
					}
					return get.event("choice").includes(button.link);
				})
				.set(
					"check",
					(function () {
						let effect = trigger.player.getUseValue(trigger.card),
							att = get.attitude(player, trigger.player);
						return effect / att;
					})()
				)
				.set(
					"choice",
					(function () {
						let cards = trigger.player.getDiscardableCards(player, "e");
						if (trigger.player.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, trigger.player, true)) {
							cards = trigger.player.getDiscardableCards(player, "he");
						}
						const black = cards.filter(i => get.color(i, null, false) == "black").sort((a, b) => get.value(a) - get.value(b)),
							red = cards.filter(i => get.color(i, null, false) == "red").sort((a, b) => get.value(a) - get.value(b));
						if (black.length == 1 && red.length == 1) {
							return cards;
						} else if (black.length == 1 && red.length) {
							return red.slice(0, 2);
						} else if (red.length == 1 && black.length) {
							return black.slice(0, 2);
						} else {
							if (cards.length == 0 || black.length == 1 || red.length == 1) {
								return cards.concat(trigger.player.getDiscardableCards(player, "h")).unique().slice(0, 2);
							}
							const blacksum = black.reduce((num, card) => num + get.value(card), 0),
								redsum = black.reduce((num, card) => num + get.value(card), 0);
							if (blacksum > redsum) {
								return black.slice(0, 2);
							}
							return red.slice(0, 2);
						}
					})()
				);
			if (result1.bool) {
				const colors = result1.links.map(i => get.color(i, false));
				const { result: result2 } = await player
					.chooseToDiscard(true, 1, "he")
					.set("prompt", `闭境：请弃置一张牌（已弃置${get.translation(colors)}）`)
					.set("ai", card => {
						const colors = get.event("colors");
						if (colors.length == 2) {
							return 6 - get.value(card);
						} else {
							if (get.color(card) == colors[0]) {
								return 8 - get.value(card);
							}
							return 6 - get.value(card);
						}
					})
					.set("colors", colors.unique());
				if (result2.bool) {
					colors.add(get.color(result2.cards[0])).unique();
					if (colors.length == 1) {
						trigger.getParent().excluded.add(player);
						game.log(player, "取消了", trigger.card, "对自己的目标");
					}
				}
			}
		},
	},
	jlsg_gongao: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "dying" },
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			return !player.hasHistory("useSkill", evt => evt.skill == "jlsg_gongao" && evt.targets?.includes(event.player));
		},
		forced: true,
		logTarget: "player",
		async content(event, trigger, player) {
			await player.gainMaxHp(1);
			await player.recover(1);
		},
		ai: {
			threaten: 1.5,
		},
	},
	jlsg_juyi: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "phaseZhunbeiBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool("###功獒：是否减1点体力上限并获得以下效果？###摸牌数、手牌上限、攻击范围、使用【杀】的次数上限+1")
				.set("ai", (event, player) => {
					if (player.maxHp > game.countPlayer(true, undefined, true)) {
						return player.isDamaged();
					}
					return player.isDamaged() && player.maxHp > 3;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			await player.loseMaxHp(1);
			player.addMark(event.name, 1, false);
			if (!player.hasSkill(`${event.name}_buff`)) {
				player.addSkill(`${event.name}_buff`);
			}
		},
		subSkill: {
			buff: {
				sub: true,
				sourceSkill: "jlsg_juyi",
				charlotte: true,
				mod: {
					maxHandcard: function (player, num) {
						return num + player.countMark("jlsg_juyi");
					},
					attackRange(player, num) {
						return num + player.countMark("jlsg_juyi");
					},
					cardUsable: function (card, player, num) {
						if (get.name(card, player) == "sha") {
							return num + player.countMark("jlsg_juyi");
						}
					},
				},
				marktext: "举",
				intro: {
					content(storage, player) {
						return "摸牌数、手牌上限、攻击范围、使用【杀】的次数上限+" + storage;
					},
				},
				trigger: { player: "phaseDrawBegin1" },
				filter(event, player) {
					return event.num > 0 && !event.numFixed && player.countMark("jlsg_juyi");
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.num += player.countMark("jlsg_juyi");
				},
			},
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.tag(card, "recover")) {
						let num = get.tag(card, "recover");
						if (target.isDamaged() && target.maxHp < 5) {
							return;
						}
						if (target.hp <= target.maxHp - num && target.hp > 4) {
							return [1, -1];
						}
					}
				},
			},
		},
	},
	jlsg_weizhong: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		trigger: { player: ["gainMaxHpEnd", "loseMaxHpEnd", "dying"] },
		filter(event, player) {
			if (event.name != "dying") {
				return event.num > 0;
			}
			if (player.storage.jlsg_weizhong) {
				return false;
			}
			const first = game.getAllGlobalHistory("everything", evt => evt.name == "dying")[0];
			return first == event && first.player == player;
		},
		forced: true,
		async content(event, trigger, player) {
			if (trigger.name != "dying") {
				await player.draw(2);
			} else {
				player.storage.jlsg_weizhong = true;
				await player.recoverTo(player.maxHp);
			}
		},
	},
	jlsg_youyan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: "useCardAfter" },
		filter(event, player) {
			if (event.card.storage?.jlsg_youyan) {
				return false;
			}
			if (!player.isPhaseUsing()) {
				return false;
			}
			if (!["basic", "trick"].includes(get.type(event.card))) {
				return false;
			}
			if (lib.card[event.card.name]?.notarget) {
				return false;
			}
			return game.hasPlayer(current => !player.hasStorage("jlsg_youyan_used", current));
		},
		async cost(event, trigger, player) {
			const card = get.autoViewAs({ name: trigger.card.name, storage: { jlsg_youyan: true } }, []);
			const select = get.select(lib.card[trigger.card.name]?.selectTarget);
			let toSelf = false;
			if (select[1] >= 1) {
				toSelf = true;
			}
			event.result = await player
				.chooseTarget(`###是否发动诱言？###选择一名角色令其${toSelf ? "对你" : ""}使用【${get.translation(card.name)}】，然后你恢复1点体力并摸三张牌`)
				.set("filterTarget", (card, player, target) => !player.hasStorage("jlsg_youyan_used", target))
				.set("ai", target => {
					const player = get.player(),
						card = get.event().card,
						toSelf = get.event().toSelf,
						extraEff = get.event().extraEff;
					const att = Math.sign(get.attitude(player, target));
					if (toSelf) {
						return get.effect(player, card, target, player) + extraEff;
					}
					return att * target.getUseValue(card) + extraEff;
				})
				.set("extraEff", get.recoverEffect(player, player, player) + get.effect(player, { name: "draw" }, player, player) * 1.5)
				.set("card", card)
				.set("toSelf", toSelf)
				.forResult();
			if (event.result) {
				event.result.cost_data = { card, toSelf };
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: { card, toSelf },
			} = event;
			player.addTempSkill("jlsg_youyan_used", { player: "phaseUseEnd" });
			player.markAuto("jlsg_youyan_used", [target]);
			let next;
			if (target == player && toSelf) {
				next = player.useCard(card, player);
			} else {
				next = target.chooseUseTarget(card, true);
				if (toSelf) {
					next.set("source", player).set("filterTarget", (card, player, target) => target == get.event("source"));
				}
			}
			await next;
			await player.recover(1);
			await player.draw(3);
		},
		subSkill: {
			used: {
				sourceSkill: "jlsg_youyan",
				sub: true,
				charlotte: true,
				onremove: true,
				intro: {
					content: "本阶段已对$发动过技能",
				},
			},
		},
	},
	jlsg_zhuihuan: {
		audio: "ext:极略/audio/skill:2",
		onremove: true,
		intro: {
			nocount: true,
			content(storage, player) {
				const targets1 = storage[0],
					targets2 = storage[1];
				let str = "";
				if (targets1.length) {
					str += `昨日之仇，如芒在背：${get.translation(targets1)}`;
				}
				if (targets1.length && targets2.length) {
					str += "<br>";
				}
				if (targets2.length) {
					str += `今日之举，不过权计：${get.translation(targets2)}`;
				}
				if (!str.length) {
					return `暂时没有仇家`;
				}
				return str;
			},
		},
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.hasStorage("jlsg_zhuihuan");
		},
		direct: true,
		async content(event, trigger, player) {
			const targets = player.getStorage("jlsg_zhuihuan")[0].filter(target => target.isIn());
			if (targets.length) {
				const { result } = await player.chooseBool(get.prompt2(event.name, player.getStorage("jlsg_zhuihuan")[0], player)).set("ai", (event, player) => {
					return player.getStorage("jlsg_zhuihuan")[0].reduce((sum, current) => sum + get.damageEffect(current, player, player), 0) > 0;
				});
				if (result.bool) {
					await player.logSkill(event.name, targets);
					for (let target of targets) {
						if (!target.isIn()) {
							continue;
						}
						await target.damage(2, player, "nocard");
					}
				}
			}
			player.storage.jlsg_zhuihuan[0] = [];
			player.markSkill("jlsg_zhuihuan");
		},
		group: ["jlsg_zhuihuan_record"],
		subSkill: {
			record: {
				sourceSkill: "jlsg_youyan",
				sub: true,
				forced: true,
				popup: false,
				charlotte: true,
				trigger: { player: ["phaseBegin", "damageEnd"] },
				filter(event, player) {
					if (event.name == "damage") {
						return event.source?.isIn() && event.source != player;
					}
					return true;
				},
				async content(event, trigger, player) {
					if (trigger.name == "damage") {
						if (!player.hasStorage("jlsg_zhuihuan")) {
							return;
						}
						if (player.storage.jlsg_zhuihuan[1]) {
							player.storage.jlsg_zhuihuan[1].add(trigger.source);
							player.storage.jlsg_zhuihuan[1].sortBySeat();
						}
					} else {
						if (!player.storage.jlsg_zhuihuan) {
							player.storage.jlsg_zhuihuan = [[], []];
						} else {
							player.storage.jlsg_zhuihuan[0] = player.storage.jlsg_zhuihuan[1].slice();
							player.storage.jlsg_zhuihuan[1] = [];
						}
					}
					player.markSkill("jlsg_zhuihuan");
				},
			},
		},
	},
	jlsg_jishe: {
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			for (const name of lib.inpile) {
				if (get.type(name, null, false) != "trick") {
					continue;
				}
				const card = get.autoViewAs({ name, isCard: true }, []);
				if (!get.tag(card, "natureDamage") && get.tag(card, "damage")) {
					continue;
				}
				if (event.filterCard?.(card, event.player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				const list = [];
				for (const name of lib.inpile) {
					if (get.type(name, null, false) != "trick") {
						continue;
					}
					const card = get.autoViewAs({ name, isCard: true }, []);
					if (!get.tag(card, "natureDamage") && get.tag(card, "damage")) {
						continue;
					}
					if (event.filterCard?.(card, event.player, event)) {
						list.push(["trick", "", name]);
					}
				}
				return ui.create.dialog("极奢", [list, "vcard"]);
			},
			check(button) {
				const player = get.player(),
					card = get.autoViewAs({ name: button.link[2], isCard: true }, []);
				if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(card.name)) {
					return 0;
				}
				return player.getUseValue(card);
			},
			backup(links, player) {
				return {
					filterCard: false,
					selectCard: 0,
					audio: "jlsg_jishe",
					popname: true,
					viewAs: get.autoViewAs({ name: links[0][2], isCard: true }, []),
					async precontent(event, trigger, player) {
						player.addTempSkill("jlsg_jishe_used", { player: "phaseUseAfter" });
						player.addMark("jlsg_jishe_used", 1, false);
						player
							.when({ player: "useCardAfter" })
							.filter(evt => evt.skill == "jlsg_jishe_backup")
							.step(async function (event, trigger, player) {
								if (player.countMark("jlsg_jishe_used") > player.maxHp) {
									await player.loseMaxHp(1);
								}
							});
					},
				};
			},
			prompt(links, player) {
				const card = get.autoViewAs({ name: links[0][2] }, []);
				return "极奢：视为使用一张" + get.translation(card);
			},
		},
		subSkill: {
			backup: {},
			used: {
				sub: true,
				sourceSkill: "jlsg_jishe",
				onremove: true,
				charlotte: true,
				mark: true,
				marktext: "奢",
				intro: {
					markcount: "mark",
					content(storage) {
						return `本阶段已发动${storage}次`;
					},
				},
			},
		},
		ai: {
			fireAttack: true,
			order(item, player) {
				return 2 * player.maxHp - player.countMark("jlsg_jishe_used");
			},
			result: {
				player(player) {
					const event = get.event();
					if (event.jlsg_jishe?.length) {
						const cards = event.jlsg_jishe.map(name => get.autoViewAs({ name }, []));
						return Number(cards.some(card => get.value(card) + player.maxHp * 3 - 16 - player.countMark("jlsg_jishe_used") > 0));
					}
					return 0;
				},
			},
		},
	},
	jlsg_lianhuo: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			target: "useCardToTargeted",
			player: "damageBegin3",
		},
		filter(event, player) {
			if (event.name == "damage") {
				return event.hasNature("fire") && player.isLinked() && event.num > 0;
			}
			return ["basic", "trick"].includes(get.type2(event.card));
		},
		forced: true,
		logAudio(event, player) {
			if (event.name == "damage") {
				return ["ext:极略/audio/skill/jlsg_lianhuo2.mp3"];
			}
			return ["ext:极略/audio/skill/jlsg_lianhuo1.mp3"];
		},
		async content(event, trigger, player) {
			if (trigger.name == "damage") {
				trigger.num += 2;
			} else {
				await player.link();
			}
		},
		ai: {
			neg: true,
			effect: {
				target(card, player, target) {
					if (target.isLinked()) {
						return;
					}
					if (get.tag(card, "fireDamage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return;
						}
						return [1, -3];
					}
				},
			},
		},
	},
	jlsg_lianhua: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "phaseUseBegin" },
		filter(event, player) {
			return event.player.countDiscardableCards(player, "h");
		},
		logTarget: "player",
		prompt(event, player) {
			return get.prompt("jlsg_lianhua", event.player);
		},
		check(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			if (trigger.player != player) {
				await player.viewHandcards(trigger.player);
			}
			const { result } = await player.discardPlayerCard(trigger.player, "h", [1, Infinity], "visible").set("ai", button => {
				const card = button.link,
					player = get.player(),
					target = get.event("target");
				if (get.attitude(player, target) > 0) {
					if (target.hasUseTarget(card)) {
						return 8 - get.value(card, target);
					}
					return 6 - get.value(card, target);
				}
				return target.getUseValue(card);
			});
			if (!result?.bool || !result?.links?.length) {
				return;
			}
			let num = result.links.length + 1;
			const cards = [];
			while (num > 0) {
				const card = lib.skill.jlsg_lingze.createTempCard(null, null, null, null, true);
				if (card) {
					cards.add(card);
				}
				num--;
			}
			if (cards.length) {
				await trigger.player.gain(cards, "draw");
			}
		},
	},
	jlsg_zhafu: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "replaceEquipAfter"],
		},
		filter(event, player) {
			let cards;
			if (event.name == "replaceEquip") {
				cards = event.result?.cards || [];
			} else {
				cards = event.getd();
			}
			return cards.some(i => i.classList.contains("jlsg_tempCard-glow") || i.hasGaintag("eternal_zuoyou_manjuan"));
		},
		check(event, player) {
			return get.effect(player, { name: "draw" }, player, player) > 0;
		},
		frequent: true,
		async content(event, trigger, player) {
			await player.draw(1);
		},
	},
	jlsg_ciwei: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "useCardToTargeted",
		},
		filter(event, player) {
			if ((player.hasStorage("jlsg_ciwei_used", "change") && player.hasStorage("jlsg_ciwei_used", "unchange")) || !["basic", "trick"].includes(get.type(event.card)) || event.parent.targets.length > event.parent.triggeredTargets4.length) {
				return false;
			}
			let change = false;
			const history = (player.storage.jlsg_ciwei_record || []).filter(evt => evt.card == event.card);
			let targetsList;
			for (let evt of history) {
				const { targets = [], excluded = [] } = evt;
				const targetsx = targets.slice().removeArray(excluded);
				if (!targetsList) {
					targetsList = targetsx;
					continue;
				}
				if (!targetsList.every(target => targetsx.includes(target)) || !targetsx.every(target => targetsList.includes(target))) {
					change = true;
					break;
				} else {
					targetsList = targetsx;
				}
			}
			if (change && event.player != player && !player.hasStorage("jlsg_ciwei_used", "change")) {
				return "change";
			} else if (!change && !player.hasStorage("jlsg_ciwei_used", "unchange")) {
				return "unchange";
			}
			return false;
		},
		async cost(event, trigger, player) {
			const key = lib.skill.jlsg_ciwei.filter(trigger, player),
				{ targets = [], excluded = [] } = trigger.parent;
			const targetsx = targets.slice().removeArray(excluded);
			let str = `###${get.prompt("jlsg_ciwei", trigger.player)}###`,
				choice = (function () {
					return (
						targetsx.reduce((eff, target) => {
							return eff + get.effect(target, trigger.card, trigger.player, player);
						}, 0) / targetsx.length
					);
				})();
			if (key == "change") {
				str += `令${get.translation(trigger.card)}无效并令${get.translation(trigger.player)}失去1点体力`;
				let losehp = get.effect(trigger.player, { name: "losehp" }, player, player);
				choice = -choice + losehp > 0;
			} else {
				str += `令${get.translation(trigger.card)}无法被响应，然后令${get.translation(trigger.player)}获得此牌并恢复1点体力`;
				let eff = trigger.player.isDamaged() ? get.recoverEffect(trigger.player, player, player) : -2;
				choice = choice + eff > 0;
			}
			const { result } = await player.chooseBool(str).set("choice", choice);
			event.result = result;
			if (result?.bool) {
				event.result.cost_data = { key };
				event.result.targets = [trigger.player];
			}
		},
		async content(event, trigger, player) {
			const key = event.cost_data.key;
			player.addTempSkill("jlsg_ciwei_used");
			player.storage.jlsg_ciwei_used.add(key);
			player.markSkill("jlsg_ciwei_used");
			if (key == "change") {
				game.log(player, "令", trigger.card, "无效");
				trigger.parent.targets = [];
				trigger.parent.all_excluded = true;
				await trigger.player.loseHp(1);
			} else {
				game.log(player, "令", trigger.card, "无法响应");
				trigger.parent.directHit = game.players;
				const cards = (trigger.card?.cards || []).filterInD("od");
				if (cards.length) {
					await trigger.player.gain(cards, "gain2");
				}
				await trigger.player.recover(1);
			}
		},
		group: ["jlsg_ciwei_record"],
		subSkill: {
			record: {
				audio: false,
				init(player, skill) {
					player.storage[skill] = [];
				},
				onremove: true,
				trigger: {
					global: ["useCardBefore", "useCardBegin", "useCard0", "useCard1", "yingbian", "useCard2", "useCard", "useCardToPlayer", "useCardToTarget", "useCardToPlayered", "useCardToTargeted", "useCardAfter"],
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				filter(event, player, name) {
					if ((player.hasStorage("jlsg_ciwei_used", "change") && player.hasStorage("jlsg_ciwei_used", "unchange")) || !["basic", "trick"].includes(get.type(event.card))) {
						return false;
					}
					if (name == "useCardAfter") {
						if (player.storage.jlsg_ciwei_record?.some(evt => evt.card == event.card)) {
							return true;
						}
					}
					return true;
				},
				async content(event, trigger, player) {
					if (event.triggername != "useCardAfter") {
						const evt = event.triggername.startsWith("useCardTo") ? trigger.parent : trigger;
						const { targets = [], excluded = [] } = evt;
						player.storage[event.name].push({
							name: event.triggername,
							card: trigger.card,
							targets: targets.slice(),
							excluded: excluded.slice(),
						});
					} else {
						player.storage[event.name] = player.storage[event.name].filter(evt => evt.card != trigger.card);
					}
					player.markSkill(event.name);
				},
			},
			used: {
				init(player, skill) {
					player.storage[skill] = [];
				},
				onremove: true,
				mark: true,
				intro: {
					content(storage) {
						let str = "本回合已因";
						let list = [];
						if (storage.includes("change")) {
							list.add("变化");
						}
						if (storage.includes("unchange")) {
							list.add("不变");
						}
						return `本回合已触发：${list.join("、")}`;
					},
				},
			},
		},
		ai: {
			expose: 0.2,
		},
	},
	jlsg_caiyuan: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			target: "useCardToTarget",
		},
		filter(event, player) {
			if (!["basic", "trick"].includes(get.type(event.card)) || get.color(event.card, event.player) == "black") {
				return false;
			}
			return event.getParent().targets.length == 1;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("jlsg_caiyuan"))
				.set("prompt2", `摸两张牌，然后将${get.translation(trigger.card)}的目标转移给一名其他角色`)
				.set("filterTarget", (_, player, target) => target != player)
				.set("otherEff", get.effect(player, { name: "draw" }, player, player) - get.effect(player, trigger.card, trigger.player, player))
				.set("ai", target => {
					const trigger = get.event().getParent().getTrigger(),
						player = get.player(),
						otherEff = get.event("otherEff"),
						eff = get.effect(target, trigger.card, trigger.player, player);
					return eff + otherEff;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const { targets } = event;
			await player.draw(2);
			trigger.getParent().targets = targets;
		},
		ai: {
			expose: 0.2,
			effect: {
				target(card, player, target) {
					if (!["basic", "trick"].includes(get.type(card)) || get.color(card, player) == "black") {
						return;
					}
					return [0.5, 2, 0.5, 0];
				},
			},
		},
	},
	jlsg_luanzhan: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "useCardAfter" },
		usable: 1,
		filter(event, player) {
			if (event.card.name !== "sha" && get.type(event.card) != "trick") {
				return false;
			}
			const [suit, number, name, nature] = get.cardInfo(event.card);
			const card = get.autoViewAs({ suit, number, name, nature }, []),
				targets = [player, event.player].unique().filter(p => p.isIn());
			if (name != "sha") {
				return targets.some(current => player.canUse(card, current, false));
			}
			return targets.some(current => lib.skill.jlsg_luanzhan.canUse(card, player, current));
		},
		async cost(event, trigger, player) {
			const [suit, number, name, nature] = get.cardInfo(trigger.card);
			const card = get.autoViewAs({ suit, number, name, nature }, []),
				targets = [player, trigger.player]
					.unique()
					.filter(p => p.isIn())
					.sortBySeat(_status.currentPhase);
			event.result = await player
				.chooseBool()
				.set("prompt", get.prompt("jlsg_luanzhan"))
				.set("prompt2", `对${get.translation(targets)}使用一张${get.translation(card)}然后摸两张牌`)
				.set("ai", (event, player) => {
					const card = get.event("card"),
						targets = get.event("targets");
					const useEff = targets.reduce((sum, current) => sum + get.effect(current, card, player, player), 0),
						drawEff = get.effect(player, { name: "draw" }, player, player) * 1.5;
					return useEff + drawEff > 0;
				})
				.set("card", card)
				.set("targets", targets)
				.forResult();
			if (event.result?.bool) {
				event.result.cost_data = {
					targets,
					card,
				};
			}
		},
		async content(event, trigger, player) {
			let {
				cost_data: { targets, card },
			} = event;
			targets = targets.filter(current => {
				if (!current.isIn()) {
					return false;
				}
				if (card.name != "sha") {
					return player.canUse(card, current, false);
				}
				return lib.skill.jlsg_luanzhan.canUse(card, player, current);
			});
			if (targets.length) {
				await player.useCard(card, targets);
			}
			await player.draw(2);
		},
		canUse(card, player, target) {
			const info = get.info(card);
			if (info.multicheck && !info.multicheck(card, this)) {
				return false;
			}
			if (!lib.filter.cardEnabled(card, player)) {
				return false;
			}
			if (!info.singleCard || ui.selected.targets.length == 0) {
				var mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
				if (mod != "unchanged") {
					return mod;
				}
				var mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
				if (mod != "unchanged") {
					return mod;
				}
			}
			return true;
		},
	},
	jlsg_yuqi: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin", "damageEnd"],
		},
		filter(event, player) {
			if (event.name == "damage") {
				return game.countPlayer();
			}
			return game.hasPlayer(current => current.hasSex("male"));
		},
		async cost(event, trigger, player) {
			let str = "令",
				sexFilter = trigger.name != "damage";
			if (trigger.name == "damage") {
				str += "一名角色";
			} else {
				str += "你和一名其他男性角色各";
			}
			str += "失去一点体力";
			event.result = await player
				.chooseTarget(get.prompt("jlsg_yuqi"))
				.set("prompt2", str)
				.set("filterTarget", (_, player, target) => {
					if (get.event("sexFilter")) {
						return player != target && target.hasSex("male");
					}
					return true;
				})
				.set("ai", target => {
					const player = get.player();
					const targetEff = get.effect(target, { name: "losehp" }, player, player);
					if (!get.event("sexFilter")) {
						return targetEff;
					}
					return targetEff + get.event("playerEff");
				})
				.set("sexFilter", sexFilter)
				.set("playerEff", get.effect(player, { name: "losehp" }, player, player))
				.forResult();
			if (sexFilter && event.result?.bool) {
				event.result.targets.add(player);
				event.result.targets.sortBySeat();
			}
		},
		async content(event, trigger, player) {
			for (let target of event.targets) {
				await target.loseHp(1);
			}
		},
	},
	jlsg_shanshen: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: "loseHpEnd" },
		check(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			const list = lib.skill.jlsg_lingze.typePBTY.basic.randomGets(2),
				cards = [];
			for (let info of list) {
				const [suit, number, name, nature = null] = info;
				let card = lib.skill.jlsg_lingze.createTempCard(name, suit, nature, number);
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.addSkill("jlsg_shanshen_mark");
				const next = player.gain(cards, "draw", "log");
				next.gaintag.add("jlsg_shanshen");
				await next;
			}
		},
		subSkill: {
			mark: {
				sourceSkill: "jlsg_shanshen",
				sub: true,
				charlotte: true,
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag("jlsg_shanshen")) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == "phaseDiscard" && card.hasGaintag("jlsg_shanshen")) {
							return false;
						}
					},
				},
				onremove(player) {
					player.removeGaintag("jlsg_shanshen");
				},
			},
		},
		ai: {
			maihp: true,
			effect: {
				player(card, player, target) {
					if (player == target) {
						return;
					}
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, 2];
						}
					} else if (get.tag(card, "loseHp")) {
						return [1, 2];
					}
				},
				target(card, player, target) {
					if (target.hp <= 1) {
						return;
					}
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, 2];
						}
					}
					if (get.tag(card, "loseHp")) {
						return [1, 2];
					}
				},
			},
		},
	},
	jlsg_zhengu: {
		audio: "ext:极略/audio/skill:2",
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		async cost(event, trigger, player) {
			let num = player.isDamaged() ? 2 : 1;
			let min = Math.max(0, player.countCards("h") - num),
				max = player.countCards("h") + num;
			event.result = await player
				.chooseTarget(`###${get.prompt(event.skill)}###你可以令一名角色将手牌数调整至${min}或${max}`)
				.set("ai", target => {
					const player = get.player(),
						min = get.event("numberList")[0],
						max = get.event("numberList")[1];
					let hs = target.countDiscardableCards(target, "h"),
						att = get.attitude(player, target);
					return Math.max(att * Math.max(0, min - hs), att * (max - hs));
				})
				.set("numberList", [min, max])
				.forResult();
			if (event.result?.bool) {
				event.result.cost_data = [min, max];
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: [min, max],
			} = event;
			const hs = target.countDiscardableCards(target, "h"),
				choiceList = [`由${hs}调整为${min}`, `由${hs}调整为${max}`];
			const { result } = await player
				.chooseControlList(choiceList)
				.set("prompt", `###镇骨###将${get.translation(target)}手牌数`)
				.set("ai", (event, player) => {
					const {
						targets: [target],
						cost_data: [min, max],
					} = event;
					let att = get.attitude(player, target);
					let num1 = att * Math.max(0, min - hs),
						num2 = att * (max - hs);
					return num1 > num2 ? 0 : 1;
				});
			if (result && result.control != "cancel2") {
				let num = [min, max][result.index];
				if (hs == num) {
					return;
				}
				if (hs > num) {
					await target.chooseToDiscard(true, hs - num, "h");
				} else {
					await target.drawTo(num);
				}
			}
		},
	},
	jlsg_tianjiang: {
		audio: "ext:极略/audio/skill:2",
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "phaseBegin"],
		},
		filter(event, player, name) {
			if (name == "phaseBegin") {
				return true;
			}
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			const list = lib.skill.jlsg_lingze.typePBTY.equip
					.filter(([suit, number, name]) => {
						const subtype = get.subtype(name);
						if (player.countEmptySlot(subtype) > 0) {
							return player.canEquip(name);
						}
						return false;
					})
					.randomSort(),
				cards = [];
			for (let info of list) {
				const [suit, number, name, nature = null] = info;
				if (cards.some(card => get.subtype(card) == get.subtype(name))) {
					continue;
				}
				let card = lib.skill.jlsg_lingze.createTempCard(name, suit, nature, number);
				if (card) {
					cards.push(card);
				}
				if (cards.length > 4) {
					break;
				}
			}
			if (cards.length) {
				for (let card of cards) {
					if (player.canEquip(card)) {
						await player.chooseUseTarget(card, true, "nopopup");
					}
				}
			}
		},
		group: "jlsg_tianjiang_move",
		subSkill: {
			move: {
				sourceSkill: "jlsg_tianjiang",
				audio: "jlsg_tianjiang",
				enable: "phaseUse",
				position: "he",
				filter(event, player) {
					return player.countCards("he", card => get.type(card) == "equip");
				},
				filterCard: card => get.type(card) == "equip",
				check() {
					return 1;
				},
				filterTarget(event, player, target) {
					return target != player && target.canEquip(ui.selected.cards[0], true);
				},
				prepare: "give",
				discard: false,
				lose: false,
				async content(event, trigger, player) {
					await event.target.equip(event.cards[0]);
					await player.draw(2);
				},
				ai: {
					expose: 0.2,
					order(item, player) {
						if (player.hasCard(i => get.subtype(i) === "equip1", "h")) {
							return 11;
						}
						return 1;
					},
					result: {
						target(player, target) {
							if (ui.selected.cards.length) {
								let card = ui.selected.cards[0],
									tv = get.value(card, target),
									sub = get.subtype(card);
								if (sub === "equip1") {
									let ev = Infinity,
										te = target.getEquips(1);
									if (!te.length) {
										return tv;
									}
									te.forEach(i => {
										ev = Math.min(ev, get.value(i));
									});
									return 2 + tv - ev;
								}
								if (target.hasCard(i => get.subtype(i) === sub, "he")) {
									return 0;
								}
								let pv = get.value(card, player);
								if (pv > 0 && Math.abs(tv) <= pv) {
									return 0;
								}
								return tv;
							}
							return 0;
						},
					},
				},
			},
		},
	},
	jlsg_zhuren: {
		intro: {
			markcount: "mark",
			content: "mark",
		},
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			return player.hasMark("jlsg_zhuren");
		},
		filterTarget(card, player, target) {
			return target.countVCards("e", card => get.subtype(card, false) == "equip1");
		},
		async precontent(event, trigger, player) {
			const {
				targets: [target],
			} = event.result;
			const swords = target.getVCards("e", card => get.subtype(card, false) == "equip1");
			const phaseUse = event.getParent("phaseUse");
			if (swords.length > 1) {
				const vcards = await player.chooseButton(true, [`###铸刃###请选择${get.translation(target)}的一张武器牌进行附魔`, [swords, "vcard"]], () => true).forResultLinks();
				event.result.cards = vcards[0].cards || [];
				phaseUse.jlsg_zhuren_vcard = vcards[0];
			} else {
				event.result.cards = swords[0].cards || [];
				phaseUse.jlsg_zhuren_vcard = swords[0];
			}
			const vcard = phaseUse.jlsg_zhuren_vcard;
			if (!phaseUse.jlsg_zhuren_record) {
				let { duanyu, fuling, shizhu } = lib.skill.jlsg_zhuren.effects;
				duanyu = lib.skill.jlsg_zhuren.checkEffect(vcard, "duanyu").randomGets(2);
				fuling = lib.skill.jlsg_zhuren.checkEffect(vcard, "fuling").randomGets(2);
				shizhu = lib.skill.jlsg_zhuren.checkEffect(vcard, "shizhu").randomGets(2);
				phaseUse.jlsg_zhuren_record = { duanyu, fuling, shizhu };
			}
			const record = phaseUse.jlsg_zhuren_record,
				effectsList = lib.skill.jlsg_zhuren.effects;
			let map = {
					选项一: "duanyu",
					选项二: "fuling",
					选项三: "shizhu",
				},
				choice = [],
				choiceList,
				prompt;
			while (true) {
				choiceList = ["断玉", "附灵", "噬主"];
				prompt = "铸刃：请选择强化分支";
				const control = await player
					.chooseControlList(choiceList, prompt, (event, player) => {
						const {
							targets: [target],
						} = event.result;
						if (get.attitude(player, target) < 0) {
							return 2;
						} else {
							if (target.hp < 3) {
								return 1;
							}
							return 0;
						}
					})
					.forResultControl();
				if (control == "cancel2") {
					break;
				}
				choice[0] = map[control];
				choiceList = record[choice[0]].slice().map(i => effectsList[choice[0]][i].str);
				prompt = "铸刃：请选择强化效果";
				const result = await player.chooseControlList(choiceList, prompt, () => 0).forResult();
				if (result.control != "cancel2") {
					choice[1] = record[choice[0]][result.index];
					break;
				}
			}
			if (choice.length != 2) {
				delete event.getParent().result;
				event.getParent().goto(0);
			} else {
				phaseUse.jlsg_zhuren_choice = choice;
				delete phaseUse.jlsg_zhuren_record;
			}
		},
		lose: false,
		discard: false,
		async content(event, trigger, player) {
			player.removeMark(event.name);
			for (let current of game.players) {
				if (!lib.skill.globalmap["jlsg_zhuren_extraSkill"]?.includes(current)) {
					game.addGlobalSkill("jlsg_zhuren_extraSkill", current);
				}
			}
			const {
				jlsg_zhuren_vcard: vcard,
				jlsg_zhuren_choice: [type, choice],
			} = event.getParent("phaseUse");
			let map = { duanyu: "断玉", fuling: "附灵", shizhu: "噬主" };
			game.log(player, "对", vcard, "选择", `#y${map[type]}`, "效果为：", `#y${lib.skill.jlsg_zhuren.effects[type][choice].str}`);
			lib.skill.jlsg_zhuren.syncRecord(vcard, choice);
			await game.delay();
			if (!_status.jlsg_zhuren) {
				game.broadcastAll(function () {
					_status.jlsg_zhuren = true;
					for (let i in lib.card) {
						const info = lib.card[i];
						if (info?.subtype != "equip1") {
							continue;
						}
						if (info.jlsg_zhuren_cardPrompt) {
							continue;
						}
						if (info.cardPrompt) {
							const { cardPrompt } = info;
							info.jlsg_zhuren_cardPrompt = cardPrompt;
						}
						info.cardPrompt = function (card, player) {
							let str = "",
								info;
							if (!card?.name) {
								info = this;
							} else {
								info = get.info(card, false);
							}
							if (info.jlsg_zhuren_cardPrompt) {
								str += info.jlsg_zhuren_cardPrompt(card, player);
							} else if (lib.translate[card.name + "_info"]) {
								str += lib.translate[card.name + "_info"];
							}
							if (card) {
								let cardx = card;
								const cardSymbol = card[card["cardSymbol"]];
								if (cardSymbol) {
									cardx = cardSymbol;
								}
								if (Object.keys(cardx.storage?.jlsg_zhuren || {}).length) {
									str += `<br><span style="color: #8b2caeff" data-nature="graymm">附魔效果</span>：<br>`;
									const list = cardx.storage.jlsg_zhuren,
										effects = Object.fromEntries(Object.values(lib.skill.jlsg_zhuren.effects).flatMap(i => Object.entries(i))),
										str2 = [];
									for (let i in effects) {
										if (!list[i]) {
											continue;
										}
										str2.push(effects[i].str.replaceAll(/\d+/g, list[i]));
									}
									str += str2.join("<br>");
								}
							}
							return str;
						};
					}
				});
			}
		},
		effects: {
			duanyu: {
				11: {
					str: "锁定技，你使用【杀】造成伤害+1",
					content: async function (event, trigger, player) {
						trigger.baseDamage += event.num;
					},
					positive(player, viewer, num = 1) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
					},
				},
				12: {
					str: "锁定技，你使用的【杀】的目标上限+1",
					positive(player, viewer, num = 1) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
					},
				},
				13: {
					str: "锁定技，当你使用【杀】时，你摸1张牌",
					content: async function (event, trigger, player) {
						await player.draw(event.num);
					},
					positive(player, viewer, num = 1) {
						return Math.sign(player.hasUseTarget("sha") ? get.effect(player, { name: "draw" }, player, viewer) : 0) * num;
					},
				},
				14: {
					str: "锁定技，攻击范围+1，使用【杀】的次数上限+1",
					positive(player, viewer, num = 1) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
					},
				},
				15: {
					str: "锁定技，你使用的【杀】不能被【闪】响应",
					content: async function (event, trigger, player) {
						trigger.directHit.addArray(game.players);
					},
					positive(player, viewer) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player);
					},
				},
				16: {
					str: "锁定技，你使用的【杀】无视防具",
					positive(player, viewer) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player);
					},
				},
			},
			fuling: {
				21: {
					str: "锁定技，结束阶段，你视为使用1张【杀】",
					content: async function (event, trigger, player) {
						for (let i = 0; i < event.num; i++) {
							if (player.hasUseTarget("sha", true, false)) {
								await player.chooseUseTarget("sha", true, false);
							}
						}
					},
					positive(player, viewer, num = 1) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
					},
				},
				22: {
					str: "锁定技，出牌阶段开始时，你获得1张随机属性的临时【杀】",
					content: async function (event, trigger, player) {
						const cards = [];
						for (let i = 0; i < event.num; i++) {
							let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.concat([null]).randomGet());
							if (card) {
								cards.add(card);
							}
						}
						if (cards.length) {
							await player.gain(cards, "draw2");
						}
					},
					positive(player, viewer, num = 1) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
					},
				},
				23: {
					str: "锁定技，当装备或从装备区失去此牌后，你加1点体力上限并回复1点体力",
					content: async function (event, trigger, player) {
						await player.gainMaxHp(event.num);
						await player.recover(event.num);
					},
					positive(player, viewer, num = 1) {
						return Math.sign(get.effect(player, { name: "recover" }, player, viewer)) * num;
					},
				},
				24: {
					str: "锁定技，当你受到其他角色造成的伤害后，你视为对其使用1张【杀】",
					content: async function (event, trigger, player) {
						for (let i = 0; i < event.num; i++) {
							if (trigger.source.isIn() && player.canUse("sha", trigger.source, false, false)) {
								await player.useCard({ name: "sha", isCard: true }, trigger.source, false);
							}
						}
					},
					positive(player, viewer, num = 1) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
					},
				},
				25: {
					str: "锁定技，准备阶段或结束阶段，随机获得一项“断玉”强化",
					content: async function (event, trigger, player) {
						let effectsList = lib.skill.jlsg_zhuren.checkEffect(event.card, "duanyu", "断玉");
						if (effectsList.length) {
							event.effect = effectsList.randomGet();
							game.log(player, "的", event.card, "获得", `#y断玉`, "效果为：", `#y${lib.skill.jlsg_zhuren.effects["duanyu"][event.effect].str}`);
							lib.skill.jlsg_zhuren.syncRecord(event.card, event.effect);
						}
					},
					positive(player, viewer) {
						return get.sgnAttitude(viewer, player);
					},
				},
				26: {
					str: "锁定技，准备阶段或结束阶段，随机获得一项“附灵”强化",
					content: async function (event, trigger, player) {
						let effectsList = lib.skill.jlsg_zhuren.checkEffect(event.card, "fuling", "附灵");
						if (effectsList.length) {
							event.effect = effectsList.randomGet();
							game.log(player, "的", event.card, "获得", `#y附灵`, "效果为：", `#y${lib.skill.jlsg_zhuren.effects["fuling"][event.effect].str}`);
							lib.skill.jlsg_zhuren.syncRecord(event.card, event.effect);
						}
					},
					positive(player, viewer) {
						return get.sgnAttitude(viewer, player);
					},
				},
			},
			shizhu: {
				31: {
					str: "锁定技，当你装备或从装备区失去此牌后，你失去1点体力并减1点体力上限",
					content: async function (event, trigger, player) {
						await player.loseHp(event.num);
						await player.loseMaxHp(event.num);
					},
					positive(player, viewer, num = 1) {
						return Math.sign(get.effect(player, { name: "losehp" }, player, viewer)) * num;
					},
				},
				32: {
					str: "锁定技，出牌阶段开始时，你视为对自己使用1张【杀】",
					content: async function (event, trigger, player) {
						for (let i = 0; i < event.num; i++) {
							if (player.isIn()) {
								await player.useCard({ name: "sha", isCard: true }, player, false);
							}
						}
					},
					positive(player, viewer, num = 1) {
						return Math.sign(get.effect(player, { name: "sha" }, player, viewer)) * num;
					},
				},
				33: {
					str: "锁定技，当你使用【杀】时，你随机弃置1张除此牌外的牌",
					content: async function (event, trigger, player) {
						let ignore = [];
						if (event.card) {
							if (get.itemtype(event.card) == "vcard") {
								ignore = event.card.cards;
							} else {
								ignore = [event.card];
							}
						}
						const cards = player.getDiscardableCards(player, "he", card => !ignore.includes(card));
						if (cards.length) {
							await player.discard(cards.randomGets(event.num));
						}
					},
					positive(player, viewer, num = 1) {
						return Math.sign(get.effect(player, { name: "guohe_copy2" }, player, viewer)) * num;
					},
				},
				34: {
					str: "锁定技，攻击范围+1，手牌上限-1",
					positive(player, viewer, num = 1) {
						return get.sgnAttitude(viewer, player) * num;
					},
				},
				35: {
					str: "锁定技，准备阶段，你随机将一个与【杀】无关的技能替换为与【杀】有关的技能",
					content: async function (event, trigger, player) {
						const skills = player.getSkills(null, false, false).filter(skill => {
							let info = get.info(skill);
							if (!info || info.charlotte) {
								return false;
							}
							return lib.translate[skill] && !get.plainText(get.skillInfoTranslation(skill, player)).includes("【杀】");
						});
						if (!skills.length) {
							return;
						}
						if (!_status.jlsg_luocha_list_hidden?.length) {
							lib.skill.jlsg_luocha.initList();
						}
						let shaRelatedList = _status.jlsg_luocha_list_hidden.filter(skill => !player.hasSkill(skill, null, false, false));
						if (!shaRelatedList.length) {
							game.log("没有与“杀”有关的技能了");
							return;
						}
						await player.changeSkills(shaRelatedList.randomGets(1), skills.randomGets(1));
					},
					positive(player, viewer) {
						return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player);
					},
				},
				36: {
					str: "锁定技，准备阶段或结束阶段。随机获得一项“噬主”强化",
					content: async function (event, trigger, player) {
						let effectsList = lib.skill.jlsg_zhuren.checkEffect(event.card, "shizhu", "噬主");
						if (effectsList.length) {
							event.effect = effectsList.randomGet();
							game.log(player, "的", event.card, "获得", `#y噬主`, "效果为：", `#y${lib.skill.jlsg_zhuren.effects["shizhu"][event.effect].str}`);
							lib.skill.jlsg_zhuren.syncRecord(event.card, event.effect);
						}
					},
					positive(player, viewer) {
						return get.sgnAttitude(viewer, player);
					},
				},
			},
		},
		checkEffect(card, type, ignore = null) {
			const effectsList = lib.skill.jlsg_zhuren.effects[type];
			const record = card.storage?.jlsg_zhuren;
			if (!Object.keys(record || {}).length) {
				return Object.keys(effectsList);
			}
			let list = [];
			for (let i in effectsList) {
				let str = effectsList[i].str;
				if (str.match(/\d+/g)) {
					list.push(i);
				} else if (str.includes("强化")) {
					if (ignore && str.includes(ignore)) {
						continue;
					}
					list.push(i);
				} else if (!record[i]) {
					list.push(i);
				}
			}
			return list;
		},
		syncRecord(vcard, effect) {
			game.broadcastAll(
				function (vcard, effect) {
					if (!vcard.storage) {
						vcard.storage = {};
					} else if (!vcard.storage.jlsg_zhuren) {
						vcard.storage.jlsg_zhuren = {};
					}
					if (!vcard.storage.jlsg_zhuren[effect]) {
						vcard.storage.jlsg_zhuren[effect] = 0;
					}
					vcard.storage.jlsg_zhuren[effect]++;
					if (get.is.ordinaryCard(vcard)) {
						const card = vcard.cards[0];
						if (!card.storage) {
							card.storage = {};
						} else if (!card.storage.jlsg_zhuren) {
							card.storage.jlsg_zhuren = {};
						}
						if (!card.storage.jlsg_zhuren[effect]) {
							card.storage.jlsg_zhuren[effect] = 0;
						}
						card.storage.jlsg_zhuren[effect]++;
					}
				},
				vcard,
				effect
			);
		},
		group: "jlsg_zhuren_addMark",
		subSkill: {
			addMark: {
				trigger: {
					player: "phaseZhunbeiBegin",
					global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				getIndex(event, player) {
					if (event.name == "phaseZhunbei") {
						return 1;
					}
					return game.filterPlayer2(current => {
						const evt = event.getl(current);
						const lostCards = [];
						evt.es.forEach(card => {
							const vcard = evt.vcard_map.get(card);
							if (vcard?.name && get.subtype(vcard) == "equip1") {
								lostCards.add(vcard);
							}
						});
						return lostCards.length;
					});
				},
				filter(event, player, name, target) {
					return true;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					await player.addMark("jlsg_zhuren", 1);
				},
			},
			extraSkill: {
				charlotte: true,
				equipSkill: true,
				lastDo: true,
				audio: false,
				mod: {
					selectTarget(card, player, range) {
						range = get.select(range);
						if (card.name == "sha" && range[1] > 0) {
							const es = player.getVCards("e").concat(player.getExpansions("jlsg_jinlong"));
							const add = es.reduce((sum, vcard) => sum + (vcard.storage?.jlsg_zhuren?.["12"] || 0), 0);
							range[1] += add;
						}
					},
					attackRange(player, num) {
						const es = player.getVCards("e").concat(player.getExpansions("jlsg_jinlong"));
						const add = es.reduce((sum, vcard) => {
							let checkList = ["14", "34"];
							for (let i of checkList) {
								if (vcard.storage?.jlsg_zhuren?.[i] > 0) {
									sum += vcard.storage.jlsg_zhuren[i];
								}
							}
							return sum;
						}, 0);
						return num + add;
					},
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							const es = player.getVCards("e").concat(player.getExpansions("jlsg_jinlong"));
							const add = es.reduce((sum, vcard) => sum + (vcard.storage?.jlsg_zhuren?.["14"] || 0), 0);
							return num + add;
						}
					},
					maxHandcard(player, num) {
						const es = player.getVCards("e").concat(player.getExpansions("jlsg_jinlong"));
						const reduce = es.reduce((sum, vcard) => sum + (vcard.storage?.jlsg_zhuren?.["34"] || 0), 0);
						return num - reduce;
					},
					aiValue(player, card, num) {
						const storage = card?.storage?.jlsg_zhuren || {};
						let list = { 1: 0, 2: 0, 3: 0 };
						for (let i in list) {
							for (let j in storage) {
								if (j.startsWith(i)) {
									list[i] += storage[j];
								}
							}
						}
						let numx = list["1"] + list["2"] - list["3"];
						return num + numx;
					},
					aiUseful(player, card, num) {
						return lib.skill.jlsg_zhuren_extraSkill.mod.aiValue.apply(this, arguments);
					},
				},
				trigger: {
					player: ["useCard", "damageEnd", "phaseUseBegin", "phaseZhunbeiBegin", "phaseJieshuBegin"],
					global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				getIndex(event, player) {
					if (!["useCard", "damage", "phaseUse", "phaseZhunbei", "phaseJieshu"].includes(event.name)) {
						return 1;
					}
					let extraCards = player.getExpansions("jlsg_jinlong");
					return player
						.getVCards("e")
						.concat(extraCards)
						.filter(card => Object.keys(card.storage?.jlsg_zhuren || {}).length);
				},
				filter(event, player, name, vcard) {
					const storage = Object.keys(vcard?.storage?.jlsg_zhuren || {});
					if (event.name == "useCard") {
						if (event.card.name != "sha") {
							return false;
						}
						return storage.some(i => ["11", "13", "15", "33"].includes(i));
					} else if (event.name == "damage") {
						if (event.source == player || !event.source?.isIn()) {
							return false;
						} else if (!player.canUse("sha", event.source, false, false)) {
							return false;
						}
						return storage.includes("24");
					} else if (event.name == "phaseUse") {
						return storage.some(i => ["22", "32"].includes(i));
					} else if (["phaseZhunbei", "phaseJieshu"].includes(event.name)) {
						if (storage.some(i => ["25", "26", "36"].includes(i))) {
							return true;
						} else if (event.name == "phaseZhunbei") {
							return storage.includes("35");
						} else if (event.name == "phaseJieshu") {
							return storage.includes("21");
						}
					} else {
						if (event.name == "equip" && event.player == player) {
							let cardx = event.card;
							if (get.itemtype(event.card) == "vcard") {
								if (get.is.ordinaryCard(event.card)) {
									cardx = event.card.cards[0];
								}
							}
							if (Object.keys(cardx.storage?.jlsg_zhuren || {}).some(i => ["23", "31"].includes(i))) {
								return true;
							}
							let cardSymbol = cardx[cardx["cardSymbol"]];
							if (cardSymbol) {
								return get.is.ordinaryCard(cardSymbol) && !Object.keys(cardSymbol.storage?.jlsg_zhuren || {}).length;
							}
						}
						const getl = event.getl(player),
							lostCards = [];
						getl.es.forEach(card => {
							const lostVcard = getl.vcard_map.get(card);
							if (lostVcard?.name && Object.keys(lostVcard.storage?.jlsg_zhuren || {}).some(i => ["23", "31"].includes(i))) {
								lostCards.add(card);
							}
						});
						return lostCards.length;
					}
					return false;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const card = event.indexedData;
					let list = card?.storage?.jlsg_zhuren || {},
						effects = Object.fromEntries(Object.values(lib.skill.jlsg_zhuren.effects).flatMap(i => Object.entries(i)));
					if (["vcard", "card"].includes(get.itemtype(card))) {
						game.log(player, "的", card, "的附魔效果触发了");
					}
					if (trigger.name == "useCard") {
						let checkList = ["11", "13", "15", "33"];
						for (let check of checkList) {
							if (list[check] > 0) {
								const next = game.createEvent("jlsg_zhuren_effect", false, event);
								next._trigger = trigger;
								next.player = player;
								next.num = list[check];
								next.card = card;
								next.setContent(effects[check].content);
								await next;
							}
						}
					} else if (trigger.name == "damage") {
						const next = game.createEvent("jlsg_zhuren_effect", false, event);
						next._trigger = trigger;
						next.player = player;
						next.num = list["24"];
						next.setContent(effects["24"].content);
						await next;
					} else if (trigger.name == "phaseUse") {
						let checkList = ["22", "32"];
						for (let check of checkList) {
							if (list[check] > 0) {
								const next = game.createEvent("jlsg_zhuren_effect", false, event);
								next._trigger = trigger;
								next.player = player;
								next.num = list[check];
								next.setContent(effects[check].content);
								await next;
							}
						}
					} else if (["phaseZhunbei", "phaseJieshu"].includes(trigger.name)) {
						let checkList = ["25", "26", "36"];
						for (let check of checkList) {
							if (list[check] > 0) {
								const next = game.createEvent("jlsg_zhuren_effect", false, event);
								next._trigger = trigger;
								next.player = player;
								next.num = list[check];
								next.card = card;
								next.setContent(effects[check].content);
								await next;
							}
						}
						if (trigger.name == "phaseZhunbei" && list["35"] > 0) {
							const next = game.createEvent("jlsg_zhuren_effect", false, event);
							next._trigger = trigger;
							next.player = player;
							next.num = list["35"];
							next.setContent(effects["35"].content);
							await next;
						} else if (trigger.name == "phaseJieshu" && list["21"] > 0) {
							const next = game.createEvent("jlsg_zhuren_effect", false, event);
							next._trigger = trigger;
							next.player = player;
							next.num = list["21"];
							next.setContent(effects["21"].content);
							await next;
						}
					} else {
						let checkList = ["23", "31"];
						if (trigger.name == "equip" && trigger.player == player) {
							let cardx = trigger.card;
							if (get.itemtype(cardx) == "vcard") {
								if (get.is.ordinaryCard(cardx)) {
									cardx = trigger.card.cards[0];
								}
							}
							if (Object.keys(cardx.storage?.jlsg_zhuren || {}).length) {
								const cardSymbol = cardx[cardx["cardSymbol"]];
								if (cardSymbol && get.is.ordinaryCard(cardSymbol) && !Object.keys(cardSymbol.storage?.jlsg_zhuren || {}).length) {
									game.broadcastAll(function (card) {
										const cardSymbol = card[card["cardSymbol"]];
										if (cardSymbol) {
											let record = card.storage.jlsg_zhuren;
											if (!cardSymbol.storage) {
												cardSymbol.storage = {};
											}
											cardSymbol.storage.jlsg_zhuren = record;
										}
									}, cardx);
								}
								list = cardx.storage.jlsg_zhuren || {};
								for (let check of checkList) {
									if (list[check] > 0) {
										game.log(trigger.card, "的附魔效果触发了");
										const next = game.createEvent("jlsg_zhuren_effect", false, event);
										next._trigger = trigger;
										next.player = player;
										next.num = list[check];
										next.card = cardx;
										next.setContent(effects[check].content);
										await next;
									}
								}
							}
						}
						const getl = trigger.getl(player),
							lostCards = [];
						getl.es.forEach(card => {
							const lostVcard = getl.vcard_map.get(card);
							if (lostVcard?.name && Object.keys(lostVcard.storage?.jlsg_zhuren || {}).some(i => checkList.includes(i))) {
								lostCards.add(card);
							}
						});
						if (!lostCards.length) {
							return;
						}
						for (let card of lostCards) {
							list = card.storage?.jlsg_zhuren || {};
							for (let check of checkList) {
								if (list[check] > 0) {
									game.log(card, "的附魔效果触发了");
									const next = game.createEvent("jlsg_zhuren_effect", false, event);
									next._trigger = trigger;
									next.player = player;
									next.num = list[check];
									next.setContent(effects[check].content);
									await next;
								}
							}
						}
					}
				},
				ai: {
					unequip: true,
					unequip_ai: true,
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (arg?.card?.name != "sha") {
							return false;
						}
						const esRecord = player
							.getVCards("e")
							.concat(player.getExpansions("jlsg_jinlong"))
							.flatMap(vcard => Object.keys(vcard.storage?.jlsg_zhuren || {}) || []);
						if (tag === "directHit_ai") {
							return esRecord.includes("15");
						}
						return esRecord.includes("16");
					},
					effect: {
						player_use(card, player, target) {
							if (card.name != "sha") {
								return;
							}
							_status.jlsg_zhuren_getEffect = true;
							const esStorage = player
									.getVCards("e")
									.concat(player.getExpansions("jlsg_jinlong"))
									.map(card => card.storage?.jlsg_zhuren || {})
									.reduce((list, info) => {
										list ??= {};
										for (let i in info) {
											if (!list[i]) {
												list[i] = 0;
											}
											list[i] += info[i];
											return list;
										}
									}, {}),
								effects = Object.fromEntries(Object.values(lib.skill.jlsg_zhuren.effects).flatMap(i => Object.entries(i)));
							let list = { 1: 0, 2: 0, 3: 0 };
							for (let i in list) {
								for (let j in esStorage) {
									if (j.startsWith(i)) {
										list[i] += effects[j].positive(player, player, esStorage[j]);
									}
								}
							}
							let num = list["1"] + list["2"] - list["3"];
							delete _status.jlsg_zhuren_getEffect;
							return [1, num];
						},
						target_use(card, player, target, current) {
							_status.jlsg_zhuren_getEffect = true;
							const storage = card?.storage?.jlsg_zhuren || {};
							let list = { 1: 0, 2: 0, 3: 0 };
							for (let i in list) {
								for (let j in storage) {
									if (j.startsWith(i)) {
										list[i] += storage[j];
									}
								}
							}
							let num = list["1"] + list["2"] - list["3"];
							delete _status.jlsg_zhuren_getEffect;
							return [1, num];
						},
					},
				},
			},
		},
		ai: {
			order: 11,
			result: {
				player: 1,
				target(player, target) {
					return get.attitude(player, target);
				},
			},
		},
	},
	/*jlsg_zhuren: {
		intro: {
			markcount: "mark",
			content: "mark",
		},
		audio: "ext:极略/audio/skill:2",
		enable: "phaseUse",
		filter(event, player) {
			return player.hasMark("jlsg_zhuren");
		},
		filterTarget(card, player, target) {
			return target.countVCards("e", card => get.subtype(card, false) == "equip1");
		},
		async precontent(event, trigger, player) {
			const [target] = event.result.targets;
			const es1 = target.getVCards("e", card => get.subtype(card, false) == "equip1"),
				phaseUse = event.getParent("phaseUse"),
				{ checkEffect } = get.info("jlsg_zhuren");
			let vcard = es1[0];
			if (es1.length > 1) {
				[vcard] = await player.chooseButton(true, [`###铸刃###请选择${get.translation(target)}的一张武器牌进行附魔`, [es1, "vcard"]], () => true).forResultLinks();
				event.result.cards = vcard.cards || [];
				phaseUse.jlsg_zhuren_vcard = vcard;
			} else {
				event.result.cards = vcard.cards || [];
				phaseUse.jlsg_zhuren_vcard = vcard;
			}
			if (!phaseUse.jlsg_zhuren_record?.length) {
				phaseUse.jlsg_zhuren_record = [];
				for (let i of ["1", "2", "3"]) {
					phaseUse.jlsg_zhuren_record.addArray(checkEffect(vcard, i).randomGets(2));
				}
			}
			let choice, choiceList, prompt, result;
			while (true) {
				choiceList = ["断玉", "附灵", "噬主"];
				prompt = "铸刃：请选择强化分支";
				result = await player
					.chooseControlList(choiceList, prompt, (event, player) => {
						const [target] = event.result.targets;
						if (get.attitude(player, target) < 0) {
							return 2;
						} else {
							if (target.hp < 3) {
								return 1;
							}
							return 0;
						}
					})
					.forResult();
				if (!result?.control || result?.control == "cancel2") {
					break;
				}
				choice = String(result.index + 1);
				choiceList = phaseUse.jlsg_zhuren_record.filter(i => i.jlsg_zhuren_type == choice).map(i => i.jlsg_zhuren_name);
				prompt = "铸刃：请选择强化效果";
				result = await player.chooseControlList(choiceList, prompt, () => 0).forResult();
				if (result.control != "cancel2") {
					choice = phaseUse.jlsg_zhuren_record.filter(i => i.jlsg_zhuren_type == choice)[result.index];
					break;
				} else {
					choice = undefined;
				}
			}
			if (!choice) {
				delete event.getParent().result;
				event.getParent().goto(0);
			} else {
				phaseUse.jlsg_zhuren_choice = choice;
				delete phaseUse.jlsg_zhuren_record;
			}
		},
		lose: false,
		discard: false,
		async content(event, trigger, player) {
			player.removeMark(event.name);
			const { jlsg_zhuren_vcard: vcard, jlsg_zhuren_choice: info } = event.getParent("phaseUse");
			game.log(player, "对", vcard, "选择", `#y${{ 1: "断玉", 2: "附灵", 3: "噬主" }[info.jlsg_zhuren_type]}`, "效果为：", `#r${info.jlsg_zhuren_name}`);
			lib.skill.jlsg_zhuren.syncRecord(vcard, info);
			event.targets[0].addEquipTrigger(vcard);
			await game.delay();
			if (!_status.jlsg_zhuren) {
				game.broadcastAll(function () {
					_status.jlsg_zhuren = true;
					const effectsList = get.info("jlsg_zhuren").jlsg_zhuren_contents;
					for (let i in lib.card) {
						const info = lib.card[i];
						if (info?.subtype != "equip1") {
							continue;
						}
						if (info.jlsg_zhuren_cardPrompt) {
							continue;
						}
						if (info.cardPrompt) {
							const { cardPrompt } = info;
							info.jlsg_zhuren_cardPrompt = cardPrompt;
						}
						info.cardPrompt = function (card, player) {
							let str = "",
								info;
							if (!card?.name) {
								info = this;
							} else {
								info = get.info(card, false);
							}
							if (info.jlsg_zhuren_cardPrompt) {
								str += info.jlsg_zhuren_cardPrompt(card, player);
							} else if (lib.translate[card.name + "_info"]) {
								str += lib.translate[card.name + "_info"];
							}
							if (card) {
								let cardx = card;
								const cardSymbol = card[card.cardSymbol];
								if (cardSymbol) {
									cardx = cardSymbol;
								}
								if (Object.keys(cardx.storage?.jlsg_zhuren || {}).length) {
									const str2 = [`<br><span style="color: #8b2caeff" data-nature="graymm">附魔效果</span>：`];
									for (let info of effectsList) {
										const { jlsg_zhuren_type, jlsg_zhuren_subtype } = info;
										let skillName = `jlsg_zhuren_${jlsg_zhuren_type}|${jlsg_zhuren_subtype}`,
											num = cardx.storage.jlsg_zhuren?.[jlsg_zhuren_type]?.[jlsg_zhuren_subtype];
										if (!cardx.skills?.includes(skillName) || !num) {
											continue;
										}
										str2.push(info.jlsg_zhuren_name.replaceAll(/\d+/g, num));
									}
									str += str2.join("<br><li>");
								}
							}
							return str;
						};
					}
				});
			}
		},
		checkEffect(card, type, ignore = null) {
			const effectsList = lib.skill.jlsg_zhuren.jlsg_zhuren_contents.filter(i => i.jlsg_zhuren_type == type),
				record = card.storage?.jlsg_zhuren || {};
			if (!Object.keys(record).length) {
				return effectsList;
			}
			return effectsList.reduce((list, info) => {
				let str = info.jlsg_zhuren_name;
				if (str.match(/\d+/g)) {
					list.push(info);
				} else if (str.includes("强化")) {
					if (ignore && str.includes(ignore)) {
						return list;
					}
					list.push(info);
				} else if (!record[info.jlsg_zhuren_subtype]) {
					list.push(info);
				}
				return list;
			}, []);
		},
		syncRecord(vcard, info) {
			game.broadcastAll(
				function (vcard, info) {
					const { jlsg_zhuren_name, jlsg_zhuren_type, jlsg_zhuren_subtype, skill } = info;
					const skillName = `jlsg_zhuren_${jlsg_zhuren_type}|${jlsg_zhuren_subtype}`,
						{ filter: extraFilter, content: extraContent, ...other } = skill;
					if (!(skillName in lib.skill)) {
						lib.skill[skillName] = {
							priority: -Number(jlsg_zhuren_type + jlsg_zhuren_subtype) / 1000,
							sub: true,
							sourceSkill: "jlsg_zhuren",
							equipSkill: true,
							charlotte: true,
							forced: true,
							popup: false,
							jlsg_zhuren_name,
							jlsg_zhuren_type,
							jlsg_zhuren_subtype,
							...other,
							extraFilter,
							extraContent,
							filter(...args) {
								const card = args[3];
								if (!card.storage?.jlsg_zhuren?.[jlsg_zhuren_type]?.[jlsg_zhuren_subtype]) {
									return false;
								}
								return extraFilter ? extraFilter(...args) : true;
							},
							async content(event, trigger, player) {
								game.log(event.indexedData, "的附魔效果触发了");
								let extraContent = get.info(event.name).extraContent;
								if (extraContent) {
									await extraContent(event, trigger, player);
								}
							},
						};
						lib.translate[skillName] = "铸刃附魔";
						lib.translate[skillName + "_info"] = jlsg_zhuren_name;
						game.finishSkill(skillName);
					}
					const addSkill = function (card) {
						card.skills ??= get.skillsFromEquips([card]);
						card.skills.add(skillName);
						card.storage ??= {};
						card.storage.jlsg_zhuren ??= {};
						card.storage.jlsg_zhuren[jlsg_zhuren_type] ??= {};
						card.storage.jlsg_zhuren[jlsg_zhuren_type][jlsg_zhuren_subtype] ??= 0;
						card.storage.jlsg_zhuren[jlsg_zhuren_type][jlsg_zhuren_subtype]++;
					};
					addSkill(vcard);
					if (get.itemtype(vcard) == "vcard" && get.is.ordinaryCard(vcard)) {
						addSkill(vcard.cards[0]);
					}
				},
				vcard,
				info
			);
		},
		getInfo(player, isCards) {
			let es = player.getVCards("e"),
				//判定区仍然生效的装备牌
				equipEnabled = player
					.getVCards("j", vcard => {
						if (get.type(vcard) != "equip" || !vcard.storage?.equipEnable) {
							return false;
						}
						return vcard.cards.some(card => get.type(card) == "equip");
					})
					.flatMap(vcard => vcard.cards.filter(card => get.type(card) == "equip")),
				//额外生效卡牌（【锦龙】）
				extraCards = [player.getExpansions("jlsg_jinlong")].flat().unique();
			const cards = es.concat(equipEnabled).concat(extraCards);
			if (isCards) {
				return cards;
			}
			let result = cards.reduce((list, card) => {
				const storage = card.storage?.jlsg_zhuren || {};
				for (let type in storage) {
					list[type] ??= {};
					for (let subtype in storage[type]) {
						list[type][subtype] ??= 0;
						list[type][subtype] += storage[type][subtype];
					}
				}
				return list;
			}, {});
			return result;
		},
		jlsg_zhuren_contents: [
			//断玉
			{
				jlsg_zhuren_type: "1",
				jlsg_zhuren_subtype: "1",
				jlsg_zhuren_name: "锁定技，你使用【杀】造成伤害+1",
				skill: {
					trigger: { player: "useCard" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					filter(event) {
						return event.card.name == "sha";
					},
					async content(event, trigger, player) {
						const storage = event.indexedData.storage?.jlsg_zhuren?.["1"]?.["1"];
						trigger.baseDamage += storage;
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "1",
				jlsg_zhuren_subtype: "2",
				jlsg_zhuren_name: "锁定技，你使用的【杀】的目标上限+1",
				skill: {
					mod: {
						selectTarget(card, player, range) {
							range = get.select(range);
							if (card.name == "sha" && range[1] > 0) {
								const storage = get.info("jlsg_zhuren").getInfo(player);
								range[1] += storage["1"]?.["2"];
							}
						},
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "1",
				jlsg_zhuren_subtype: "3",
				jlsg_zhuren_name: "锁定技，当你使用【杀】时，你摸1张牌",
				skill: {
					trigger: { player: "useCard" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					filter(event) {
						return event.card.name == "sha";
					},
					async content(event, trigger, player) {
						const storage = event.indexedData.storage?.jlsg_zhuren?.["1"]?.["3"];
						await player.draw(storage);
					},
					ai: {
						effect: {
							player_use(card, player) {
								if (card.name != "sha") {
									return;
								}
								const storage = get.info("jlsg_zhuren").getInfo(player);
								return [1, storage["1"]?.["3"] || 0];
							},
						},
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.hasUseTarget("sha") ? get.effect(player, { jlsg_zhuren_name: "draw" }, player, viewer) : 0) * num;
				},
			},
			{
				jlsg_zhuren_type: "1",
				jlsg_zhuren_subtype: "4",
				jlsg_zhuren_name: "锁定技，攻击范围+1，使用【杀】的次数上限+1",
				skill: {
					mod: {
						attackRange(player, num) {
							const storage = get.info("jlsg_zhuren").getInfo(player);
							return num + storage["1"]?.["4"];
						},
						cardUsable(card, player, num) {
							if (card.name == "sha") {
								const storage = get.info("jlsg_zhuren").getInfo(player);
								return num + storage["1"]?.["4"];
							}
						},
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "1",
				jlsg_zhuren_subtype: "5",
				jlsg_zhuren_name: "锁定技，你使用的【杀】不能被【闪】响应",
				skill: {
					trigger: { player: "useCard" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					filter(event, player) {
						if (!game.players.some(current => !event.directHit.includes(current))) {
							return false;
						}
						return event.card.name == "sha";
					},
					async content(event, trigger, player) {
						trigger.directHit.addArray(game.players);
					},
					ai: {
						directHit_ai: true,
						skillTagFilter(player, tag, arg) {
							if (arg?.card?.name != "sha") {
								return false;
							}
							const storage = get.info("jlsg_zhuren").getInfo(player);
							return storage["1"]?.["5"];
						},
					},
				},
				ai_effect(player, viewer) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player);
				},
			},
			{
				jlsg_zhuren_type: "1",
				jlsg_zhuren_subtype: "6",
				jlsg_zhuren_name: "锁定技，你使用的【杀】无视防具",
				skill: {
					ai: {
						unequip: true,
						unequip_ai: true,
						skillTagFilter(player, tag, arg) {
							if (arg?.card?.name != "sha") {
								return false;
							}
							if (arg?.card?.name != "sha") {
								return false;
							}
							const storage = get.info("jlsg_zhuren").getInfo(player);
							return storage["1"]?.["6"];
						},
					},
				},
				ai_effect(player, viewer) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player);
				},
			},
			//附灵
			{
				jlsg_zhuren_type: "2",
				jlsg_zhuren_subtype: "1",
				jlsg_zhuren_name: "锁定技，结束阶段，你视为使用1张【杀】",
				skill: {
					trigger: { player: "phaseJieshuBegin" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					async content(event, trigger, player) {
						let num = event.indexedData.storage.jlsg_zhuren["2"]["1"];
						while (num-- > 0) {
							if (player.hasUseTarget("sha", true, false)) {
								await player.chooseUseTarget("sha", true, false);
							}
						}
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "2",
				jlsg_zhuren_subtype: "2",
				jlsg_zhuren_name: "锁定技，出牌阶段开始时，你获得1张随机属性的临时【杀】",
				skill: {
					trigger: { player: "phaseUseBegin" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					async content(event, trigger, player) {
						let num = event.indexedData.storage.jlsg_zhuren["2"]?.["2"],
							cards = [];
						while (num-- > 0) {
							let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
							if (card) {
								cards.add(card);
							}
						}
						if (cards.length) {
							await player.gain(cards, "draw2");
						}
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "2",
				jlsg_zhuren_subtype: "3",
				jlsg_zhuren_name: "锁定技，当装备或从装备区失去此牌后，你加1点体力上限并回复1点体力",
				skill: {
					trigger: { player: ["equipAfter", "loseBegin"] },
					getIndex(event, player) {
						if (event.name == "equip") {
							return [event.card];
						}
						const es = player.getCards("e"),
							cards = event.cards.slice();
						let result = [];
						for (const card of cards) {
							if (!es.includes(card)) {
								continue;
							} else if (card.parentNode) {
								if (card.parentNode.classList.contains("equips")) {
									const VEquip = card[card.cardSymbol];
									if (VEquip) {
										result.add(VEquip);
									}
								}
							}
						}
						return result;
					},
					async content(event, trigger, player) {
						const vcard = event.indexedData;
						if (trigger.name == "equip") {
							const num = vcard.storage.jlsg_zhuren["2"]["3"];
							await player.gainMaxHp(num);
							await player.recover(num);
						} else {
							if (vcard.cards?.length) {
								player
									.when({
										player: "loseAfter",
										global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
									})
									.filter((evt, player) => {
										const getl = evt.getl(player);
										for (const card of getl.es) {
											const Vcard = getl.vcard_map.get(card);
											if (Vcard?.name && Vcard.vcardID == vcard.vcardID) {
												return Vcard.storage.jlsg_zhuren["2"]["3"] > 0;
											}
										}
										return false;
									})
									.step(async function (event, trigger, player) {
										let getl = trigger.getl(player),
											num = 0;
										for (const card of getl.es) {
											const Vcard = getl.vcard_map.get(card);
											if (Vcard?.name && Vcard.vcardID == vcard.vcardID) {
												num = Vcard.storage.jlsg_zhuren["2"]["3"];
											}
										}
										await player.gainMaxHp(num);
										await player.recover(num);
									});
							}
						}
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(get.effect(player, { name: "recover" }, player, viewer)) * num;
				},
			},
			{
				jlsg_zhuren_type: "2",
				jlsg_zhuren_subtype: "4",
				jlsg_zhuren_name: "锁定技，当你受到其他角色造成的伤害后，你视为对其使用1张【杀】",
				skill: {
					trigger: { player: "damageEnd" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					filter(event, player, triggername, card) {
						return event.source?.isIn() && event.source != player;
					},
					async content(event, trigger, player) {
						let num = event.indexedData.storage.jlsg_zhuren["2"]?.["4"];
						while (num-- > 0) {
							if (trigger.source.isIn() && player.canUse("sha", trigger.source, false, false)) {
								await player.useCard({ name: "sha", isCard: true }, trigger.source, false);
							}
						}
					},
					ai: {
						maixie_defend: true,
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "2",
				jlsg_zhuren_subtype: "5",
				jlsg_zhuren_name: "锁定技，准备阶段或结束阶段，随机获得一项“断玉”强化",
				skill: {
					trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					async content(event, trigger, player) {
						let effectsList = lib.skill.jlsg_zhuren.checkEffect(event.indexedData, "2", "断玉");
						if (effectsList.length) {
							const info = effectsList.randomGet();
							game.log(player, "的", event.indexedData, "获得", `#y断玉`, "效果为：", `#r${info.jlsg_zhuren_name}`);
							lib.skill.jlsg_zhuren.syncRecord(event.indexedData, info);
						}
					},
				},
				ai_effect(player, viewer) {
					return get.sgnAttitude(viewer, player);
				},
			},
			{
				jlsg_zhuren_type: "2",
				jlsg_zhuren_subtype: "6",
				jlsg_zhuren_name: "锁定技，准备阶段或结束阶段，随机获得一项“附灵”强化",
				skill: {
					trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					async content(event, trigger, player) {
						let effectsList = lib.skill.jlsg_zhuren.checkEffect(event.indexedData, "2", "附灵");
						if (effectsList.length) {
							const info = effectsList.randomGet();
							game.log(player, "的", event.indexedData, "获得", `#y附灵`, "效果为：", `#r${info.jlsg_zhuren_name}`);
							lib.skill.jlsg_zhuren.syncRecord(event.indexedData, info);
						}
					},
				},
				ai_effect(player, viewer) {
					return get.sgnAttitude(viewer, player);
				},
			},
			//噬主
			{
				jlsg_zhuren_type: "3",
				jlsg_zhuren_subtype: "1",
				jlsg_zhuren_name: "锁定技，当你装备或从装备区失去此牌后，你失去1点体力并减1点体力上限",
				skill: {
					trigger: { player: ["equipAfter", "loseBegin"] },
					getIndex(event, player) {
						if (event.name == "equip") {
							return [event.card];
						}
						const es = player.getCards("e"),
							cards = event.cards.slice();
						let result = [];
						for (const card of cards) {
							if (!es.includes(card)) {
								continue;
							} else if (card.parentNode) {
								if (card.parentNode.classList.contains("equips")) {
									const VEquip = card[card.cardSymbol];
									if (VEquip) {
										result.add(VEquip);
									}
								}
							}
						}
						return result;
					},
					async content(event, trigger, player) {
						const vcard = event.indexedData;
						if (trigger.name == "equip") {
							const num = vcard.storage.jlsg_zhuren["3"]["1"];
							await player.loseHp(num);
							await player.loseMaxHp(num);
						} else {
							if (vcard.cards?.length) {
								player
									.when({
										player: "loseAfter",
										global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
									})
									.filter((evt, player) => {
										const getl = evt.getl(player);
										for (const card of getl.es) {
											const loseVcard = getl.vcard_map.get(card);
											if (loseVcard?.name && loseVcard.vcardID == vcard.vcardID) {
												return true;
											}
										}
										return false;
									})
									.step(async function (event, trigger, player) {
										const num = vcard.storage.jlsg_zhuren["3"]["1"];
										await player.loseHp(num);
										await player.loseMaxHp(num);
									});
							}
						}
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(get.effect(player, { name: "losehp" }, player, viewer)) * num;
				},
			},
			{
				jlsg_zhuren_type: "3",
				jlsg_zhuren_subtype: "2",
				jlsg_zhuren_name: "锁定技，出牌阶段开始时，你视为对自己使用1张【杀】",
				skill: {
					trigger: { player: "phaseUseBegin" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					async content(event, trigger, player) {
						let num = event.indexedData.storage.jlsg_zhuren["3"]["2"];
						while (num-- > 0) {
							if (player.isIn()) {
								await player.useCard({ name: "sha", isCard: true }, player, false);
							}
						}
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(get.effect(player, { name: "sha" }, player, viewer)) * num;
				},
			},
			{
				jlsg_zhuren_type: "3",
				jlsg_zhuren_subtype: "3",
				jlsg_zhuren_name: "锁定技，当你使用【杀】时，你随机弃置1张除此牌外的牌",
				skill: {
					trigger: { player: "useCard" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					filter(event) {
						return event.card.name == "sha";
					},
					async content(event, trigger, player) {
						const ignore = event.indexedData;
						const num = ignore.storage.jlsg_zhuren["3"]["3"];
						const cards = player.getDiscardableCards(player, "he", card => {
							if (get.position(card) == "e") {
								return card[card.cardSymbol] != ignore;
							}
							return true;
						});
						if (cards.length) {
							await player.discard(cards.randomGets(num));
						}
					},
					ai: {
						effect: {
							player_use(card, player) {
								if (card.name != "sha") {
									return false;
								}
								const storage = get.info("jlsg_zhuren").getInfo(player);
								return [1, -storage["3"]?.["3"] || 0];
							},
						},
					},
				},
				ai_effect(player, viewer, num = 1) {
					return Math.sign(get.effect(player, { name: "guohe_copy2" }, player, viewer)) * num;
				},
			},
			{
				jlsg_zhuren_type: "3",
				jlsg_zhuren_subtype: "4",
				jlsg_zhuren_name: "锁定技，攻击范围+1，手牌上限-1",
				skill: {
					mod: {
						attackRange(player, num) {
							const storage = get.info("jlsg_zhuren").getInfo(player);
							return num + storage["3"]?.["4"];
						},
						maxHandcard(player, num) {
							const storage = get.info("jlsg_zhuren").getInfo(player);
							return num - storage["3"]?.["4"];
						},
					},
				},
				ai_effect(player, viewer, num = 1) {
					return get.sgnAttitude(viewer, player) * num;
				},
			},
			{
				jlsg_zhuren_type: "3",
				jlsg_zhuren_subtype: "5",
				jlsg_zhuren_name: "锁定技，准备阶段，你随机将一个与【杀】无关的技能替换为与【杀】有关的技能",
				skill: {
					trigger: { player: "phaseZhunbeiBegin" },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					filter(event, player, triggername, card) {
						const skills = player.getSkills(null, false, false).filter(skill => {
							let info = get.info(skill);
							if (!info || info.charlotte) {
								return false;
							}
							return lib.translate[skill] && !get.plainText(get.skillInfoTranslation(skill, player)).includes("【杀】");
						});
						return skills.length;
					},
					async content(event, trigger, player) {
						const skills = player.getSkills(null, false, false).filter(skill => {
							let info = get.info(skill);
							if (!info || info.charlotte) {
								return false;
							}
							return lib.translate[skill] && !get.plainText(get.skillInfoTranslation(skill, player)).includes("【杀】");
						});
						if (!skills.length) {
							return;
						}
						if (!_status.jlsg_luocha_list_hidden?.length) {
							lib.skill.jlsg_luocha.initList();
						}
						let shaRelatedList = _status.jlsg_luocha_list_hidden.filter(skill => !player.hasSkill(skill, null, false, false));
						if (!shaRelatedList.length) {
							game.log("没有与“杀”有关的技能了");
							return;
						}
						await player.changeSkills(shaRelatedList.randomGets(1), skills.randomGets(1));
					},
				},
				ai_effect(player, viewer) {
					return Math.sign(player.getUseValue("sha")) * get.sgnAttitude(viewer, player);
				},
			},
			{
				jlsg_zhuren_type: "3",
				jlsg_zhuren_subtype: "6",
				jlsg_zhuren_name: "锁定技，准备阶段或结束阶段。随机获得一项“噬主”强化",
				skill: {
					trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
					getIndex(event, player) {
						return get.info("jlsg_zhuren").getInfo(player, true);
					},
					async content(event, trigger, player) {
						let effectsList = lib.skill.jlsg_zhuren.checkEffect(event.indexedData, "3", "噬主");
						if (effectsList.length) {
							const info = effectsList.randomGet();
							game.log(event.indexedData, "获得", `#y噬主`, "效果为：", `#r${info.jlsg_zhuren_name}`);
							lib.skill.jlsg_zhuren.syncRecord(event.indexedData, info);
						}
					},
				},
				ai_effect(player, viewer) {
					return get.sgnAttitude(viewer, player);
				},
			},
		],
		group: "jlsg_zhuren_addMark",
		global: "jlsg_zhuren_extraAi",
		subSkill: {
			addMark: {
				trigger: {
					player: "phaseZhunbeiBegin",
					global: ["loseAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				getIndex(event, player) {
					if (event.name == "phaseZhunbei") {
						return 1;
					}
					return game.filterPlayer2(current => {
						const evt = event.getl(current);
						const lostCards = [];
						evt.es.forEach(card => {
							const vcard = evt.vcard_map.get(card);
							if (vcard?.name && get.subtype(vcard) == "equip1") {
								lostCards.add(vcard);
							}
						});
						return lostCards.length;
					});
				},
				filter(event, player, name, target) {
					return true;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					await player.addMark("jlsg_zhuren", 1);
				},
			},
			extraAi: {
				charlotte: true,
				mod: {
					aiValue(player, card, num) {
						const storage = card?.storage?.jlsg_zhuren || {};
						let list = { 1: 0, 2: 0, 3: 0 };
						for (let i in list) {
							for (let j in storage) {
								if (j == i) {
									list[i] += storage[j];
								}
							}
						}
						let numx = list["1"] + list["2"] - list["3"];
						return num + numx;
					},
					aiUseful(player, card, num) {
						return lib.skill.jlsg_zhuren_extraAi.mod.aiValue.apply(this, arguments);
					},
				},
			},
		},
		ai: {
			order: 20,
			result: {
				player: 1,
				target(player, target) {
					return get.attitude(player, target);
				},
			},
		},
	},*/
	jlsg_qingbei: {
		audio: "ext:极略/audio/skill:2",
		trigger: { global: ["roundStart"] },
		async cost(event, trigger, player) {
			const control = await player
				.chooseControl(lib.suit, "cancel2")
				.set("prompt", get.prompt2(event.skill))
				.set("ai", (event, player) => {
					return get.event("check");
				})
				.set(
					"check",
					(function () {
						const storage = player.getStorage("jlsg_qingbei_effect");
						for (let suit of ["diamond", "heart"]) {
							if (!(suit in storage)) {
								return lib.suit.indexOf(suit);
							}
						}
						return 0;
					})()
				)
				.forResultControl();
			event.result = {
				bool: control != "cancel2",
				cost_data: control,
			};
		},
		async content(event, trigger, player) {
			player.popup(event.cost_data);
			game.log(player, "选择了", event.cost_data);
			player.addSkill("jlsg_qingbei_effect");
			const storage = player.getStorage("jlsg_qingbei_effect", {});
			storage[event.cost_data] = 2;
			player.setStorage("jlsg_qingbei_effect", storage, true);
		},
		getNum(event, player) {
			const target = event.player,
				card = event.card,
				storage = player.getStorage("jlsg_qingbei_effect", {});
			const suit = get.suit(card);
			if (!(suit in storage)) {
				return -1;
			}
			const historys = target.getHistory("useCard", evt => get.suit(evt.card) == suit);
			return historys.indexOf(event);
		},
		subSkill: {
			effect: {
				audio: "jlsg_qingbei",
				onremove: true,
				mark: true,
				marktext: "擎",
				intro: {
					nocount: true,
					name: "剩余轮数",
					content(storage, player) {
						let str = [];
						for (let suit in storage) {
							str.push(`<li>${get.translation(suit)}：${storage[suit]}`);
						}
						return str.join("<br>");
					},
				},
				trigger: { global: ["useCardAfter", "roundEnd"] },
				filter(event, player) {
					if (event.name == "useCard") {
						let num = get.info("jlsg_qingbei").getNum(event, player);
						return num > -1;
					}
					return true;
				},
				forced: true,
				logTarget(event, player) {
					if (event.name == "useCard") {
						return event.player;
					}
					return null;
				},
				async content(event, trigger, player) {
					if (trigger.name == "useCard") {
						let num = get.info("jlsg_qingbei").getNum(trigger, player);
						await player.draw(2 - Math.min(1, num));
					} else {
						const storage = player.getStorage(event.name, {});
						for (let suit in storage) {
							storage[suit]--;
							if (storage[suit] < 1) {
								delete storage[suit];
							}
						}
						player.setStorage(event.name, storage);
						if (!Object.keys(storage).length) {
							player.removeSkill(event.name);
						} else {
							player.markSkill(event.name);
						}
					}
				},
			},
		},
	},
	jlsg_chongxing: {
		audio: "ext:极略/audio/skill:2",
		usable: 1,
		trigger: {
			player: "gainAfter",
			global: ["gameDrawAfter", "loseAsyncAfter"],
		},
		filter(event, player) {
			if (event.name == "gameDraw") {
				return player.countCards("h");
			}
			return event.getg?.(player)?.length;
		},
		async cost(event, trigger, player) {
			if (trigger.name == "gameDraw") {
				event.result = { bool: true };
			} else {
				event.result = await player
					.chooseBool(`###${get.prompt(event.skill)}###获得${get.cnNumber(trigger.getg(player).length)}张临时牌`)
					.set("ai", () => true)
					.forResult();
			}
		},
		async content(event, trigger, player) {
			let num = 0,
				cards = [];
			if (trigger.name == "gameDraw") {
				num = player.countCards();
			} else {
				num = trigger.getg(player).length;
			}
			while (num-- > 0) {
				let card = lib.skill.jlsg_lingze.createTempCard(null, undefined, undefined, undefined, true);
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				await player.gain(cards, "draw2");
			}
		},
	},
	jlsg_liunian: {
		audio: "ext:极略/audio/skill:2",
		mark: true,
		intro: {
			markcount(storage, player) {
				return typeof storage == "number" ? storage : 0;
			},
			mark(dialog, storage, player, event, skill) {
				dialog.addText(`已累计销毁：${typeof storage == "number" ? storage : 0}/3`, false);
				const effect = player.getStorage(`${skill}_effect`, []);
				if (effect?.length) {
					effect.sortBySeat(player);
					dialog.addText(`已偷取${get.translation(effect)}的额定摸牌数`, false);
				}
			},
		},
		onremove: true,
		trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "replaceEquipAfter"] },
		filter(event, player) {
			let cards;
			if (event.name == "replaceEquip") {
				cards = event.result?.cards || [];
			} else {
				cards = event.getd();
			}
			return cards.some(i => i.classList.contains("jlsg_tempCard-glow") || i.hasGaintag("eternal_zuoyou_manjuan"));
		},
		forced: true,
		popup: false,
		async content(event, trigger, player) {
			let cards;
			if (trigger.name == "replaceEquip") {
				cards = trigger.result?.cards || [];
			} else {
				cards = trigger.getd();
			}
			cards = cards.filter(i => i.classList.contains("jlsg_tempCard-glow") || i.hasGaintag("eternal_zuoyou_manjuan"));
			let num = player.getStorage(event.name, 0);
			num += cards.length;
			player.setStorage(event.name, num, true);
			while (num > 2) {
				num -= 3;
				player.setStorage(event.name, num, true);
				player.markSkill(event.name);
				const loseHp = game.filterPlayer(current => player.hasAllHistory("useSkill", evt => evt.skill == event.name && evt.targets?.includes?.(current)));
				const next = player
					.chooseTarget(`###是否发动【${get.translation(event.name)}】选择一名其他角色？###偷取其一点额定摸牌数，或令其失去一点体力`)
					.set("filterTarget", (_, player, target) => target != player)
					.set("ai", target => {
						const { loseHp, player } = get.event();
						if (loseHp.includes(target)) {
							return get.effect(target, { name: "losehp" }, player, player);
						}
						return -get.attitude(player, target);
					})
					.set("loseHp", loseHp);
				next.set(
					"targetprompt2",
					next.targetprompt2.concat([
						target => {
							const { loseHp, player } = get.event();
							if (target == player) {
								return;
							}
							return loseHp?.includes(target) ? "失去体力" : "偷摸牌数";
						},
					])
				);
				const result = await next.forResult();
				if (result?.bool && result.targets?.length) {
					await player.logSkill(event.name, result.targets);
					if (loseHp.includes(result.targets[0])) {
						await result.targets[0].loseHp(1);
					} else {
						game.log(player, "偷取了", result.targets[0], "的1点额定摸牌数");
						player.markAuto(`${event.name}_effect`, result.targets);
						if (!player.hasSkill(`${event.name}_effect`)) {
							player.addSkill(`${event.name}_effect`);
						}
					}
				}
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				trigger: { global: "phaseDrawBegin2" },
				filter(event, player) {
					if (event.numFixed || !player.getStorage("jlsg_liunian_effect").length) {
						return false;
					}
					return event.player == player || player.getStorage("jlsg_liunian_effect").includes(event.player);
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const storage = player.getStorage(event.name, []);
					if (trigger.player == player) {
						trigger.num += storage.length;
					} else {
						trigger.num--;
					}
				},
			},
		},
	},
	jlsg_jixu: {
		audio: "ext:极略/audio/skill:2",
		usable: 2,
		trigger: { global: "damageBegin2" },
		filter(event, player) {
			return event.source == player || event.player == player;
		},
		check() {
			return true;
		},
		async content(event, trigger, player) {
			await player.draw(2);
			const sha = { name: "sha", isCard: true, storage: { jlsg_jixu: true } };
			if (!player.hasUseTarget(sha, null, false)) {
				return;
			}
			const next = player.chooseUseTarget(`###${get.translation(event.name)}：是否视为使用一张【杀】？###此【杀】结算后可将此伤害转移给所有受到此【杀】伤害的角色`, sha, [1, 2], false);
			let { result } = await next;
			if (!result?.bool) {
				return;
			}
			const targets = game
				.filterPlayer(current => {
					return current.hasHistory("damage", evt => {
						if (evt.source != player || !evt.card?.storage?.jlsg_jixu) {
							return false;
						} else if (evt.getParent(2).name != "useCard" || evt.getParent(3).name != "chooseUseTarget") {
							return false;
						}
						return evt.getParent(3) == next;
					});
				})
				.sortBySeat();
			if (!targets.length) {
				return;
			}
			result = await player
				.chooseBool(`###${get.translation(event.name)}：是否将${trigger.num}点${game.hasNature(trigger) ? get.translation(trigger.nature) : ""}伤害转移给这些角色？###${get.translation(targets)}`)
				.set("ai", (event, player) => {
					const { targets } = get.event(),
						trigger = event.getTrigger();
					return targets.reduce((sum, target) => sum + get.damageEffect(target, trigger.source, trigger.source, trigger.nature), 0) > 0;
				})
				.set("targets", targets)
				.forResult();
			if (result?.bool) {
				game.log(player, "将伤害转移给了", targets);
				const { ...arg } = trigger;
				delete arg.player;
				arg._triggered = 0;
				trigger.cancel();
				if (!_status.emptyEvent) {
					_status.emptyEvent = await game.createEvent("empty", false).setContent(function () {});
					game.broadcastAll(function (info) {
						_status.emptyEvent = info;
					}, _status.emptyEvent);
				}
				let empty = { ..._status.emptyEvent };
				for (let i in empty) {
					if (empty[i]) {
						delete arg[i];
					}
				}
				for (const target of targets) {
					const damage = target.damage();
					for (let i in arg) {
						damage[i] = arg[i];
					}
					await damage;
				}
			}
		},
	},
};

export default skills;
