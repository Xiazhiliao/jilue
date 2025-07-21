import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	name: "jlsgZhu",
	skill: {
		_jlsg_buff: {
			//极略主公buff
			forced: true,
			charlotte: true,
			trigger: {
				global: "gameStart",
			},
			zhuSkill: true,
			unique: true,
			filter: function (event, player) {
				//本来就是我扩展搬过来的，我推销一下自己的扩展不过分吧（
				//孩子我没意见————流年
				if (!lib.config.extension_钟会包_loseBuffLimit && !(player.name.substring(0, 2) === "jl")) return false;
				return player.isZhu2() && get.nameList(player).some(name => name.startsWith("jlsg"));
			},
			//适应helpStr，方便调用
			list: ["jlsg_zhugong_ruoyu", "jlsg_zhugong_yongbin", "jlsg_zhugong_ruoyu", "jlsg_zhugong_hujia", "jlsg_zhugong_jianxiong", "jlsg_zhugong_songwei", "jlsg_zhugong_jiuyuan", "jlsg_zhugong_fuzheng", "jlsg_zhugong_xieli", "jlsg_zhugong_huangtian", "jlsg_zhugong_mingmen", "jlsg_zhugong_hunlie"],
			async content(event, trigger, player) {
				let list = lib.skill._jlsg_buff.list;
				let skill = [];
				for (let i = 0; i < 3; i++) {
					let r = Math.floor(Math.random() * list.length);
					skill.push(list[r]);
					list = list.filter(item => item !== list[r]);
				}
				let lists = [];
				skill.forEach(i => {
					if (lib.translate[i + "_info"]) {
						var translation = get.translation(i);
						if (translation[0] == "新" && translation.length == 3) {
							translation = translation.slice(1, 3);
						} else {
							translation = translation.slice(0, 2);
						}
						var litm = "【" + translation + "】<div>" + lib.translate[i + "_info"] + "</div>";
						lists.push(litm);
					}
				});
				let next = await player
					.chooseButton([
						"极略主公buff：请选择一项主公技获得",
						[
							lists.map((item, i) => {
								return [i, item];
							}),
							"textbutton",
						],
					])
					.set("ai", () => Math.floor(Math.random() * list.length)) /*.set("forced", true)*/
					.set("selectButton", 1)
					.forResultLinks();
				if (next) {
					player.addSkill(skill[next[0]]);
				}
			},
			_priority: 114514191981,
		},
		//极略buff主公技
		jlsg_zhugong_yuren: {
			//驭人
			audio: "jijiang1",
			audioname: ["ol_liushan", "re_liubei"],
			unique: true,
			group: ["jlsg_zhugong_yuren1"],
			zhuSkill: true,
			filter: function (event, player) {
				if (!game.hasPlayer(target => target != player && target.group == player.group) || !player.hasZhuSkill("jlsg_zhugong_yuren")) return false;
				return !event.jijiang && (event.type != "phase" || !player.hasSkill("jijiang3"));
			},
			enable: ["chooseToUse", "chooseToRespond"],
			viewAs: { name: "sha" },
			filterCard: () => false,
			selectCard: -1,
			ai: {
				order: function () {
					return get.order({ name: "sha" }) + 0.3;
				},
				respondSha: true,
				skillTagFilter: function (player) {
					if (!player.hasZhuSkill("jlsg_zhugong_yuren") || !game.hasPlayer(current => current != player && current.group == player.group)) {
						return false;
					}
				},
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
								return target.mayHaveShan(viewer, "use") && get.attitude(viewer, target) < 0 && get.damageEffect(target, player, viewer, get.natureList(card)) > 0;
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
										!target.mayHaveShan(viewer, "use") ||
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
					let obj = {};
					if (get.attitude(player, target) > 0 && get.attitude(target, player) > 0) {
						if (
							(player.hasSkill("jiu") ||
								player.hasSkillTag("damageBonus", true, {
									target: target,
									card: card,
								})) &&
							!target.hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
								jiu: player.hasSkill("jiu"),
							})
						) {
							obj.num = 2;
						}
						if (target.hp > obj.num) {
							obj.odds = 1;
						}
					}
					if (!obj.odds) {
						obj.odds = 1 - target.mayHaveShan(player, "use", true, "odds");
					}
					return obj;
				},
				basic: {
					useful: [5, 3, 1],
					value: [5, 3, 1],
				},
				result: {
					target: function (player, target, card, isLink) {
						let eff = -1.5,
							odds = 1.35,
							num = 1;
						if (isLink) {
							eff = isLink.eff || -2;
							odds = isLink.odds || 0.65;
							num = isLink.num || 1;
							if (
								num > 1 &&
								target.hasSkillTag("filterDamage", null, {
									player: player,
									card: card,
									jiu: player.hasSkill("jiu"),
								})
							) {
								num = 1;
							}
							return odds * eff * num;
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
									jiu: player.hasSkill("jiu"),
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
							odds -= 0.7 * target.mayHaveShan(player, "use", true, "odds");
						}
						_status.event.putTempCache("sha_result", "eff", {
							bool: target.hp > num && get.attitude(player, target) > 0,
							card: ai.getCacheKey(card, true),
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
		},
		jlsg_zhugong_yuren1: {
			audio: "jijiang1",
			audioname: ["ol_liushan", "re_liubei"],
			trigger: {
				player: ["useCardBegin", "respondBegin"],
			},
			logTarget: "targets",
			filter: function (event, player) {
				return event.skill == "jlsg_zhugong_yuren";
			},
			forced: true,
			async content(event, trigger, player) {
				delete trigger.skill;
				trigger.getParent().set("jijiang", true);
				while (true) {
					if (event.current == undefined) {
						event.current = player.next;
					}
					if (event.current == player) {
						player.addTempSkill("jijiang3");
						trigger.cancel();
						trigger.getParent().goto(0);
						return;
					} else if (event.current.group == "shu") {
						const chooseToRespondEvent = event.current.chooseToRespond("是否替" + get.translation(player) + "打出一张杀？", { name: "sha" });
						chooseToRespondEvent.set("ai", () => {
							const event = _status.event;
							return get.attitude(event.player, event.source) - 2;
						});
						chooseToRespondEvent.set("source", player);
						chooseToRespondEvent.set("jijiang", true);
						chooseToRespondEvent.set("skillwarn", "替" + get.translation(player) + "打出一张杀");
						chooseToRespondEvent.noOrdering = true;
						chooseToRespondEvent.autochoose = lib.filter.autoRespondSha;
						const { bool, card, cards } = await chooseToRespondEvent.forResult();
						if (bool) {
							trigger.card = card;
							trigger.cards = cards;
							trigger.throw = false;
							if (typeof event.current.ai.shown == "number" && event.current.ai.shown < 0.95) {
								event.current.ai.shown += 0.3;
								if (event.current.ai.shown > 0.95) {
									event.current.ai.shown = 0.95;
								}
							}
							return;
						} else {
							event.current = event.current.next;
						}
					} else {
						event.current = event.current.next;
					}
				}
			},
			//优先驭人
			_priority: 114,
		},
		jlsg_zhugong_yongbin: {
			//拥兵
			unique: true,
			zhuSkill: true,
			direct: true,
			trigger: {
				global: "damageEnd",
			},
			filter: function (event, player) {
				if (!event.card || event.card.name != "sha") return false;
				return event.source?.group == player.group && event.source != player;
			},
			async content(event, trigger, player) {
				let result = await trigger.source
					.chooseBool("是否对" + get.translation(player) + "发动【拥兵】<br>令其摸一张牌？")
					.set("choice", get.attitude(trigger.source, player) > 0)
					.forResult();
				if (result.bool) {
					trigger.source.logSkill("jlsg_zhugong_yongbin", player);
					await player.draw();
				}
			},
			_priority: 0,
		},
		jlsg_zhugong_ruoyu: {
			//若愚
			skillAnimation: true,
			animationColor: "fire",
			audio: 2,
			audioname: ["re_liushan"],
			unique: true,
			juexingji: true,
			zhuSkill: true,
			keepSkill: true,
			trigger: {
				player: "phaseZhunbeiBegin",
			},
			forced: true,
			filter: function (event, player) {
				return player.isMinHp();
			},
			content: async function (event, trigger, player) {
				player.awakenSkill("jlsg_zhugong_ruoyu");
				await player.gainMaxHp();
				await player.recover();
				player.addMark("jlsg_zhugong_ruoyu_draw", 1);
				player.addSkill("jlsg_zhugong_ruoyu_draw");
			},
			subSkill: {
				draw: {
					trigger: {
						player: "phaseDrawBegin2",
					},
					async content(event, trigger, player) {
						trigger.num += player.countMark("jlsg_zhugong_ruoyu_draw");
					},
					forced: true,
					charlotte: true,
					popup: false,
					onremove: true,
					marktext: "愚",
					intro: {
						name: "若愚",
						content: "摸牌阶段摸牌数+#",
					},
				},
			},
			_priority: 0,
		},
		jlsg_zhugong_hujia: {
			//护驾
			audio: 2,
			audioname: ["re_caocao"],
			unique: true,
			zhuSkill: true,
			trigger: { player: ["chooseToRespondBefore", "chooseToUseBefore"] },
			filter(event, player) {
				if (event.responded) return false;
				if (player.storage.hujiaing) return false;
				if (!player.hasZhuSkill("jlsg_zhugong_hujia")) return false;
				if (!event.filterCard({ name: "shan", isCard: true }, player, event)) return false;
				return game.hasPlayer(current => current != player && current.group == player.group);
			},
			check(event, player) {
				if (get.damageEffect(player, event.player, player) >= 0) return false;
				return true;
			},
			async content(event, trigger, player) {
				while (true) {
					let bool;
					if (!event.current) event.current = player.next;
					if (event.current == player) return;
					else if (event.current.group == "wei") {
						if ((event.current == game.me && !_status.auto) || get.attitude(event.current, player) > 2 || event.current.isOnline()) {
							player.storage.hujiaing = true;
							const next = event.current.chooseToRespond("是否替" + get.translation(player) + "打出一张闪？", { name: "shan" });
							next.set("ai", () => {
								const event = _status.event;
								return get.attitude(event.player, event.source) - 2;
							});
							next.set("skillwarn", "替" + get.translation(player) + "打出一张闪");
							next.autochoose = lib.filter.autoRespondShan;
							next.set("source", player);
							bool = await next.forResultBool();
						}
					}
					player.storage.hujiaing = false;
					if (bool) {
						player.draw();
						trigger.result = { bool: true, card: { name: "shan", isCard: true } };
						trigger.responded = true;
						trigger.animate = false;
						if (typeof event.current.ai.shown == "number" && event.current.ai.shown < 0.95) {
							event.current.ai.shown += 0.3;
							if (event.current.ai.shown > 0.95) event.current.ai.shown = 0.95;
						}
						return;
					} else {
						event.current = event.current.next;
					}
				}
			},
			ai: {
				respondShan: true,
				skillTagFilter(player) {
					if (player.storage.hujiaing) return false;
					if (!player.hasZhuSkill("jlsg_zhugong_hujia")) return false;
					return game.hasPlayer(current => current != player && current.group == player.group);
				},
			},
		},
		jlsg_zhugong_jianxiong: {
			//奸雄
			unique: true,
			trigger: { global: "damageEnd" },
			direct: true,
			filter: function (event, player) {
				//get.position(event.cards[0]) == "d"既然都有sp神司马懿了，那造成伤害的牌在不在弃牌堆也不重要了
				if (!get.itemtype(event.cards) == "cards") return false;
				return event.source != player && event.player != player && event.player.group == player.group;
			},
			async content(event, trigger, player) {
				let result = await trigger.player
					.chooseBool("是否令" + get.translation(player) + "获得" + trigger.cards)
					.set("logSkill", ["jlsg_zhugong_jianxiong", i])
					.set("choice", get.attitude(trigger.player, player) > 0)
					.forResult();
				if (result.bool) {
					trigger.player.logSkill("jlsg_zhugong_jianxiong", player);
					await player.gain(trigger.cards, "gain2");
					game.log(player, "获得了", trigger.cards);
				}
			},
			zhuSkill: true,
			_priority: 0,
		},
		jlsg_zhugong_songwei: {
			//颂威
			unique: true,
			group: "jlsg_zhugong_songwei2",
			audioname: ["re_caopi"],
			audio: "jlsg_zhugong_songwei2",
			trigger: { global: "judgeEnd" },
			zhuSkill: true,
			direct: true,
			filter(event, player) {
				if (event.player == player || event.player.group != player.group) return false;
				return player.hasZhuSkill("jlsg_zhugong_songwei", event.player);
			},
			async cost(event, trigger, player) {
				event.result = await trigger.player
					.chooseBool("是否发动【颂威】，令" + get.translation(player) + "摸一张牌？")
					.set("choice", get.attitude(trigger.player, player) > 0)
					.forResult();
			},
			async content(event, trigger, player) {
				trigger.player.logSkill("jlsg_zhugong_songwei", player);
				await player.draw();
			},
			_priority: 0,
		},
		jlsg_zhugong_jiuyuan: {
			//救援
			unique: true,
			trigger: {
				target: "taoBegin",
			},
			zhuSkill: true,
			forced: true,
			locked: true,
			filter: function (event, player) {
				if (event.player == player) return false;
				if (!player.hasZhuSkill("jlsg_zhugong_jiuyuan")) return false;
				if (event.player.group != player.group) return false;
				return true;
			},
			async content(event, trigger, player) {
				trigger.baseDamage++;
			},
			_priority: 0,
		},
		jlsg_zhugong_fuzheng: {
			//辅政
			unique: true,
			zhuSkill: true,
			frequent: true,
			trigger: {
				player: "phaseDrawBegin2",
			},
			filter: function (event, player) {
				return game.hasPlayer(target => target != player && target.group == player.group);
			},
			async content(event, trigger, player) {
				let playerList = game.players.filter(target => target != player && target.group == player.group);
				for (let i of playerList) {
					var { result } = await i.chooseBool("是否令" + get.translation(player) + "摸一张牌").set("ai", () => get.attitude(_status.event.player, _status.event.getParent().player) > 0);
					if (result.bool) {
						i.line(player, "green");
						await player.draw();
					}
				}
			},
		},
		jlsg_zhugong_xieli: {
			//协力
			frequent: true,
			unique: true,
			zhuSkill: true,
			trigger: {
				player: ["phaseZhunbeiBegin"],
			},
			filter: function (event, player) {
				return game.hasPlayer(target => target != player && target.group == player.group) && game.hasPlayer(target => target != player && target.group != player.group);
			},
			async content(event, trigger, player) {
				let { result } = await player
					.chooseTarget(1)
					.set("prompt", get.prompt("jlsg_zhugong_xieli"))
					.set("prompt2", get.prompt2("jlsg_zhugong_xieli"))
					.set("filterTarget", (card, player, target) => target != player && target.group != player.group)
					.set("ai", target => -1 * get.attitude(player, target));
				if (result.bool && result.targets) {
					var target = result.targets[0];
					let playerList = game.players.filter(target => target != player && target.group == player.group);
					for (let i of playerList) {
						if (i.hasSha()) {
							await i
								.chooseToUse(function (card, player, event) {
									if (get.name(card) != "sha") return false;
									return lib.filter.filterCard.apply(this, arguments);
								}, "协力：是否对" + get.translation(target) + "使用一张杀？")
								.set("targetRequired", true)
								.set("complexSelect", true)
								.set("filterTarget", function (card, player, target) {
									if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
									return lib.filter.targetEnabled.apply(this, arguments);
								})
								.set("sourcex", target)
								.set("logSkill", "jlsg_zhugong_xieli")
								.set("addCount", false);
						}
					}
				}
			},
		},
		jlsg_zhugong_huangtian: {
			//黄天
			unique: true,
			audio: "xinhuangtian2",
			audioname: ["zhangjiao", "re_zhangjiao"],
			global: "jlsg_zhugong_huangtian2",
			zhuSkill: true,
		},
		jlsg_zhugong_huangtian2: {
			trigger: {
				player: "phaseUseBegin",
			},
			discard: false,
			lose: false,
			delay: false,
			line: true,
			prepare: function (cards, player, targets) {
				targets[0].logSkill("jlsg_zhugong_huangtian");
			},
			prompt: function () {
				var player = _status.event.player;
				var list = game.filterPlayer(function (target) {
					return target != player && target.hasZhuSkill("jlsg_zhugong_huangtian", player);
				});
				var str = "将一张【闪】或黑桃手牌交给" + get.translation(list);
				if (list.length > 1) str += "中的一人";
				return str;
			},
			filter: function (event, player) {
				var list = game.filterPlayer(function (target) {
					return target != player && target.hasZhuSkill("jlsg_zhugong_huangtian", player);
				});
				if (!list) return false;
				for (i of list) {
					if (player.group != i.group) return false;
				}
				return player.hasCard(function (card) {
					return lib.skill.jlsg_zhugong_huangtian2.filterCard(card, player);
				}, "h");
			},
			filterCard: function (card, player) {
				return get.name(card, player) == "shan" || get.suit(card, player) == "spade";
			},
			log: false,
			visible: true,
			filterTarget: function (card, player, target) {
				return target != player && target.hasZhuSkill("jlsg_zhugong_huangtian", player);
			},
			async content(event, trigger, player) {
				await player.give(cards, target);
			},
			ai: {
				expose: 0.3,
				order: 10,
				result: {
					target: 5,
				},
			},
		},
		jlsg_zhugong_mingmen: {
			//名门
			mod: {
				maxHandcard: function (player, num) {
					return num + game.countPlayer(target => target != player && target.group == player.group);
				},
			},
			trigger: {
				global: "phaseBefore",
				player: "enterGame",
			},
			forced: true,
			unique: true,
			zhuSkill: true,
			locked: true,
			filter: function (event, player) {
				if (!game.countPlayer(target => target != player && target.group == player.group)) return false;
				return event.name != "phase" || game.phaseNumber == 0;
			},
			async content(event, trigger, player) {
				await player.draw(game.countPlayer(target => target != player && target.group == player.group));
			},
		},
		jlsg_zhugong_hunlie: {
			//魂烈
			frequent: true,
			unique: true,
			zhuSkill: true,
			trigger: {
				player: ["phaseZhunbeiBegin"],
			},
			onremove: true,
			init: function (player) {
				if (get.mode() == "identity") {
					var num = game.countPlayer(current => current.identity == "zhong" || current.identity == "mingzhong");
					player.storage.jlsg_zhugong_hunlie = num;
				} else player.removeSkill("jlsgsg_zhugong_hunlie");
			},
			filter: function (event, player) {
				if (!game.hasPlayer(target => target != player)) return false;
				if (get.mode() == "identity") {
					event.zhongNum = game.countPlayer(current => current.identity == "zhong" || current.identity == "mingzhong");
				}
				return player.storage.jlsg_zhugong_hunlie - event.zhongNum;
			},
			async content(event, trigger, player) {
				var result = await player
					.chooseTarget(1)
					.set("filterTarget", lib.filter.notMe)
					.set("prompt", get.prompt("jlsg_zhugong_hunlie"))
					.set("prompt2", get.prompt2("jlsg_zhugong_hunlie"))
					.set("ai", (player, target) => -1 * get.attitude(player, target))
					.forResult();
				if (result.bool && result.targets) {
					var target = result.targets[0];
					let num = player.storage.jlsg_zhugong_hunlie - trigger.zhongNum;
					await target.damage(num, player, "nocard");
				}
			},
		},
	},
	translate: {
		//极略主公技
		jlsg_zhugong_yuren: "驭人",
		jlsg_zhugong_yuren_info: "当你需要使用或打出一张【杀】时，你可以令其他同势力角色选择是否打出一张【杀】（视为你使用或打出此【杀】）；若有角色如此做，你摸一张牌。",
		jlsg_zhugong_yongbin: "拥兵",
		jlsg_zhugong_yongbin_info: "当一名其他同势力角色使用【杀】造成伤害后，其可以令你摸一张牌。",
		jlsg_zhugong_ruoyu: "若愚",
		jlsg_zhugong_ruoyu_info: "觉醒技，准备阶段，若你的体力值为场上最少，你加1点体力上限并回复1点体力，然后你本局游戏内摸牌阶段额外摸一张牌。",
		jlsg_zhugong_hujia: "护驾",
		jlsg_zhugong_hujia_info: "当你需要使用或打出一张【闪】时，你可以令其他同势力角色选择是否打出一张【闪】（视为你使用或打出此【闪】）；若有角色如此做，你摸一张牌。",
		jlsg_zhugong_jianxiong: "奸雄",
		jlsg_zhugong_jianxiong_info: "当其他同势力角色受到伤害后，若伤害来源不是你，其可以令你获得造成伤害的牌。",
		jlsg_zhugong_songwei: "颂威",
		jlsg_zhugong_songwei_info: "当一名其他同势力角色的判定牌生效后，其可以令你摸一张牌。",
		jlsg_zhugong_jiuyuan: "救援",
		jlsg_zhugong_jiuyuan_info: "锁定技，其他同势力角色对处于濒死状态的你使用的【桃】回复的体力值+1。",
		jlsg_zhugong_fuzheng: "辅政",
		jlsg_zhugong_fuzheng_info: "摸牌阶段开始时，你可以令所有其他同势力角色依次选择是否令你摸一张牌。",
		jlsg_zhugong_xieli: "协力",
		jlsg_zhugong_xieli_info: "准备阶段，你可以选择一名与你势力不同的其他角色，然后所有其他同势力角色依次选择是否对该角色使用一张无视距离的【杀】。",
		jlsg_zhugong_huangtian: "黄天",
		jlsg_zhugong_huangtian_info: "其他同势力角色的出牌阶段开始时，其可以交给你一张【闪】或花色为黑桃的牌，然后摸一张牌。",
		jlsg_zhugong_mingmen: "名门",
		jlsg_zhugong_mingmen_info: "锁定技，你的初始手牌数与手牌上限+X（X为其他同势力角色）。",
		jlsg_zhugong_hunlie: "魂烈",
		jlsg_zhugong_hunlie_info: "准备阶段，你可以对一名其他角色造成X点伤害（X为已阵亡的忠臣数）。",
	},
};
