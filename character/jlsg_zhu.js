import { lib, game, ui, get, ai, _status } from "../../../noname.js";
export default {
	name: "jlsgZhu",
	skill: {
		//极略主公buff
		_jlsg_buff: {
			zhuSkill: true,
			unique: true,
			ruleSkill: true,
			charlotte: true,
			trigger: {
				global: "gameStart",
			},
			filter(event, player) {
				//本来就是我扩展搬过来的，我推销一下自己的扩展不过分吧（
				//孩子我没意见————流年
				if (!lib.config.extension_钟会包_loseBuffLimit && !(player.name.substring(0, 2) === "jl")) {
					return false;
				}
				return player.isZhu2() && get.nameList(player).some(name => name.startsWith("jlsg"));
			},
			forced: true,
			//适应helpStr，方便调用
			list: ["jlsg_zhugong_yuren", "jlsg_zhugong_yongbin", "jlsg_zhugong_ruoyu", "jlsg_zhugong_hujia", "jlsg_zhugong_jianxiong", "jlsg_zhugong_songwei", "jlsg_zhugong_jiuyuan", "jlsg_zhugong_fuzheng", "jlsg_zhugong_xieli", "jlsg_zhugong_huangtian", "jlsg_zhugong_mingmen", "jlsg_zhugong_hunlie"],
			async content(event, trigger, player) {
				let list = lib.skill._jlsg_buff.list.filter(skill => !player.hasSkill(skill, null, false, false));
				event.num = 0;
				while (list.length) {
					let skills = list.filter(skill => !player.hasSkill(skill, null, false, false)).randomGets(3);
					const buttons = skills.map(i => [i, '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(i) + "】</div><div>" + lib.translate[i + "_info"] + "</div></div>"]);
					let links = await player
						.chooseButton(["极略主公buff：请选择一项主公技获得", [buttons, "textbutton"]])
						.set("selectButton", [1, 1])
						.set("forced", true)
						.set("ai", () => get.event().getRand())
						.forResultLinks();
					event.num++;
					if (links?.length) {
						player.addSkill(links);
					}
					//双将适配
					if (get.config("double_character") != true || event.num > 1) {
						break;
					}
				}
			},
			//势力统一判断
			groupCheck(player, target) {
				if (player.group == "shen" || target.group == "shen") {
					return true;
				}
				return player.group == target.group;
			},
			priority: 114514191981,
		},
		//极略buff主公技
		//驭人
		jlsg_zhugong_yuren: {
			audio: "jijiang1",
			audioname: ["ol_liushan", "re_liubei"],
			unique: true,
			zhuSkill: true,
			enable: ["chooseToUse", "chooseToRespond"],
			filter(event, player) {
				if (!game.hasPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target))) return false;
				return !event.jlsg_zhugong_yuren && (event.type != "phase" || !player.hasSkill("jlsg_zhugong_yuren_ban"));
			},
			viewAs: { name: "sha" },
			filterCard: () => false,
			selectCard: -1,
			log: false,
			async precontent(event, trigger, player) {
				await player.logSkill("jlsg_zhugong_yuren", event.result.targets);
				let evt = event.getParent();
				evt.set("jlsg_zhugong_yuren", true);
				while (true) {
					if (event.current == undefined) {
						event.current = player.next;
					}
					if (event.current == player) {
						player.addTempSkill("jlsg_zhugong_yuren_ban");
						evt.goto(0);
						return;
					} else if (lib.skill._jlsg_buff.groupCheck(player, event.current)) {
						const chooseToRespondEvent = event.current.chooseToRespond("是否替" + get.translation(player) + "打出一张杀？", { name: "sha" });
						chooseToRespondEvent.set("ai", () => {
							const event = _status.event;
							return get.attitude(event.player, event.source) - 2;
						});
						chooseToRespondEvent.set("source", player);
						chooseToRespondEvent.set("jlsg_zhugong_yuren", true);
						chooseToRespondEvent.set("skillwarn", "替" + get.translation(player) + "打出一张杀");
						chooseToRespondEvent.noOrdering = true;
						chooseToRespondEvent.autochoose = lib.filter.autoRespondSha;
						const { bool, card, cards } = await chooseToRespondEvent.forResult();
						if (bool) {
							event.result.card = card;
							event.result.cards = cards;
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
			ai: {
				order() {
					return get.order({ name: "sha" }) + 0.3;
				},
				respondSha: true,
				skillTagFilter(player) {
					if (!player.hasZhuSkill("jlsg_zhugong_yuren") || !game.hasPlayer(current => current != player && current.group == player.group)) {
						return false;
					}
				},
				yingbian(card, player, targets, viewer) {
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
				canLink(player, target, card) {
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
					target(player, target, card, isLink) {
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
			subSkill: {
				ban: {
					trigger: { global: ["useCardAfter", "useSkillAfter", "phaseAfter"] },
					silent: true,
					charlotte: true,
					sourceSkill: "jlsg_zhugong_yuren",
					filter(event) {
						return event.skill != "jlsg_zhugong_yuren" && event.skill != "qinwang" && !event.skill.includes("jijiang");
					},
					async content(event, trigger, player) {
						player.removeSkill("jlsg_zhugong_yuren_ban");
					},
				},
			},
		},
		//拥兵
		jlsg_zhugong_yongbin: {
			audio: false,
			unique: true,
			zhuSkill: true,
			trigger: { global: "damageEnd" },
			filter(event, player) {
				if (!event.card || event.card.name != "sha") {
					return false;
				}
				if (!event.source || event.source == player) {
					return false;
				}
				return lib.skill._jlsg_buff.groupCheck(player, event.source);
			},
			async cost(event, trigger, player) {
				event.result = await trigger.source
					.chooseBool("是否对" + get.translation(player) + "发动【拥兵】<br>令其摸一张牌？")
					.set("choice", get.effect(player, { name: "draw" }, trigger.source, trigger, source) > 0)
					.forResult();
				if (event.result?.bool) {
					event.result.skill_popup = false;
					event.result.targets = [player];
				}
			},
			async content(event, trigger, player) {
				await trigger.source.logSkill(event.name, event.targets);
				await player.draw();
			},
			priority: 0,
		},
		//若愚
		jlsg_zhugong_ruoyu: {
			audio: "ruoyu",
			audioname: ["re_liushan"],
			skillAnimation: true,
			animationColor: "fire",
			unique: true,
			juexingji: true,
			zhuSkill: true,
			keepSkill: true,
			trigger: {
				player: "phaseZhunbeiBegin",
			},
			filter(event, player) {
				return player.isMinHp();
			},
			forced: true,
			async content(event, trigger, player) {
				player.awakenSkill(event.name);
				await player.gainMaxHp();
				await player.recover();
				player.addMark("jlsg_zhugong_ruoyu_draw", 1);
				player.addSkill("jlsg_zhugong_ruoyu_draw");
			},
			subSkill: {
				draw: {
					charlotte: true,
					onremove: true,
					marktext: "愚",
					intro: {
						name: "若愚",
						content: "摸牌阶段摸牌数+#",
					},
					trigger: {
						player: "phaseDrawBegin2",
					},
					forced: true,
					popup: false,
					async content(event, trigger, player) {
						trigger.num += player.countMark("jlsg_zhugong_ruoyu_draw");
					},
				},
			},
			priority: 0,
		},
		//护驾
		jlsg_zhugong_hujia: {
			audio: "hujia",
			audioname: ["re_caocao"],
			unique: true,
			zhuSkill: true,
			trigger: { player: ["chooseToRespondBefore", "chooseToUseBefore"] },
			filter(event, player) {
				if (event.responded || player.storage.jlsg_zhugong_hujia) {
					return false;
				}
				if (!event.filterCard({ name: "shan", isCard: true }, player, event)) {
					return false;
				}
				return game.hasPlayer(current => current != player && lib.skill._jlsg_buff.groupCheck(player, current));
			},
			check(event, player) {
				return get.damageEffect(player, event.player, player) < 0;
			},
			async content(event, trigger, player) {
				while (true) {
					let result;
					if (!event.current) {
						event.current = player.next;
					}
					if (event.current == player) {
						return;
					} else if (lib.skill._jlsg_buff.groupCheck(player, event.current)) {
						if ((event.current == game.me && !_status.auto) || get.attitude(event.current, player) > 2 || event.current.isOnline()) {
							player.setStorage("jlsg_zhugong_hujia", true);
							const next = event.current.chooseToRespond("是否替" + get.translation(player) + "打出一张闪？", { name: "shan" });
							next.set("ai", () => {
								const event = _status.event;
								return get.attitude(event.player, event.source) - 2;
							});
							next.set("skillwarn", "替" + get.translation(player) + "打出一张闪");
							next.autochoose = lib.filter.autoRespondShan;
							next.set("source", player);
							result = await next.forResult();
						}
					}
					player.setStorage("jlsg_zhugong_hujia", false);
					if (result?.bool) {
						await player.draw();
						trigger.result = { bool: true, card: result.card, cards: result.cards };
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
		//奸雄
		jlsg_zhugong_jianxiong: {
			audio: "ext:极略/audio/skill/jlsg_jianxiong.mp3",
			unique: true,
			zhuSkill: true,
			trigger: { global: "damageEnd" },
			filter(event, player) {
				if (!get.itemtype(event.cards) == "cards") return false;
				if (!event.cards.somInD("od")) {
					return false;
				}
				if (!event.source || event.source == player || event.player?.isIn() || event.player == player) {
					return false;
				}
				return lib.skill._jlsg_buff.groupCheck(player, event.player);
			},
			async cost(event, trigger, player) {
				event.result = await trigger.player
					.chooseBool(get.prompt("jlsg_zhugong_jianxiong", player), "令" + get.translation(player) + "获得" + get.translation(trigger.cards.filterInD("od")))
					.set("choice", get.attitude(trigger.player, player) > 0)
					.forResult();
				if (event.result?.bool) {
					event.result.targets = [player];
					event.result.skill_popup = false;
				}
			},
			async content(event, trigger, player) {
				await trigger.player.logSkill("jlsg_zhugong_jianxiong", player);
				await player.gain(trigger.cards.filterInD("od"), "gain2", "log");
			},
			priority: 0,
		},
		//颂威
		jlsg_zhugong_songwei: {
			audio: "songwei",
			audioname: ["re_caopi"],
			unique: true,
			zhuSkill: true,
			trigger: { global: "judgeEnd" },
			filter(event, player) {
				if (event.player == player) {
					return false;
				}
				return lib.skill._jlsg_buff.groupCheck(player, event.player);
			},
			async cost(event, trigger, player) {
				event.result = await trigger.player
					.chooseBool("是否发动【颂威】，令" + get.translation(player) + "摸一张牌？")
					.set("choice", get.effect(player, { name: "draw" }, trigger.player, trigger.player) > 0)
					.forResult();
				if (event.result?.bool) {
					event.result.targets = [player];
					event.result.skill_popup = false;
				}
			},
			async content(event, trigger, player) {
				await trigger.player.logSkill("jlsg_zhugong_songwei", player);
				await player.draw();
			},
			priority: 0,
		},
		//救援
		jlsg_zhugong_jiuyuan: {
			audio: "jiuyuan",
			unique: true,
			zhuSkill: true,
			trigger: {
				target: "taoBegin",
			},
			forced: true,
			filter(event, player) {
				if (event.player == player) return false;
				return lib.skill._jlsg_buff.groupCheck(player, event.player);
			},
			async content(event, trigger, player) {
				trigger.baseDamage++;
			},
			priority: 0,
		},
		//辅政
		jlsg_zhugong_fuzheng: {
			unique: true,
			zhuSkill: true,
			trigger: {
				player: "phaseDrawBegin2",
			},
			filter(event, player) {
				return game.hasPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target));
			},
			frequent: true,
			async content(event, trigger, player) {
				let playerList = game.filterPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target));
				for (let target of playerList) {
					const { result } = await target.chooseBool("是否令" + get.translation(player) + "摸一张牌").set("ai", (event, player) => {
						const source = event.player;
						return get.effect(source, { name: "draw" }, player, player) > 0;
					});
					if (result.bool) {
						game.log(target, "响应了", player);
						target.chat("我来助你！");
						target.line(player, "green");
						await player.draw();
					}
				}
			},
		},
		//协力
		jlsg_zhugong_xieli: {
			frequent: true,
			unique: true,
			zhuSkill: true,
			trigger: {
				player: ["phaseZhunbeiBegin"],
			},
			filter(event, player) {
				if (player.group == "shen") {
					return false;
				}
				if (!game.hasPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target))) {
					return false;
				}
				return game.hasPlayer(target => target != player && (!lib.skill._jlsg_buff.groupCheck(player, target) || target.group == "shen"));
			},
			async cost(event, trigger, player) {
				event.result = await player
					.chooseTarget([1, 1], get.prompt2("jlsg_zhugong_xieli"))
					.set("filterTarget", (card, player, target) => target != player && (target.group == "shen" || !lib.skill._jlsg_buff.groupCheck(player, target)))
					.set("ai", target => -1 * get.attitude(player, target))
					.forResult();
			},
			async content(event, trigger, player) {
				const targetx = event.targets[0];
				let playerList = game.filterPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target));
				for (let target of playerList) {
					if (target.hasSha()) {
						await target
							.chooseToUse(function (card, player, event) {
								if (get.name(card) != "sha") return false;
								return lib.filter.filterCard.apply(this, arguments);
							}, "协力：是否对" + get.translation(targetx) + "使用一张杀？")
							.set("targetRequired", true)
							.set("complexSelect", true)
							.set("filterTarget", function (card, player, target) {
								if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
								return lib.filter.targetEnabled.apply(this, arguments);
							})
							.set("sourcex", targetx)
							.set("logSkill", ["jlsg_zhugong_xieli", targetx])
							.set("addCount", false);
					}
				}
			},
		},
		//黄天
		jlsg_zhugong_huangtian: {
			audio: "xinhuangtian2",
			audioname: ["zhangjiao", "re_zhangjiao"],
			unique: true,
			zhuSkill: true,
			global: "jlsg_zhugong_huangtian2",
		},
		jlsg_zhugong_huangtian2: {
			trigger: { player: "phaseUseBegin" },
			filter(event, player) {
				let list = game.filterPlayer(function (target) {
					return target != player && target.hasZhuSkill("jlsg_zhugong_huangtian", player);
				});
				if (!list.length) return false;
				return list.some(target => {
					if (!lib.skill._jlsg_buff.groupCheck(target, player)) {
						return false;
					}
					return player.countGainableCards(target, "h", function (card) {
						return get.name(card, player) == "shan" || get.suit(card, player) == "spade";
					});
				});
			},
			async cost(event, trigger, player) {
				const list = game.filterPlayer(function (target) {
					if (!lib.skill._jlsg_buff.groupCheck(target, player)) {
						return false;
					}
					return target != player && target.hasZhuSkill("jlsg_zhugong_huangtian", player);
				});
				let str = "将一张【闪】或黑桃手牌交给" + get.translation(list);
				if (list.length > 1) str += "中的一人";
				event.result = await player
					.chooseCardTarget({
						prompt: "是否发动】【黄天】",
						prompt2: str,
						filterCard(card, player) {
							return get.name(card, player) == "shan" || get.suit(card, player) == "spade";
						},
						filterTarget(card, player, target) {
							if (!lib.skill._jlsg_buff.groupCheck(target, player)) {
								return false;
							}
							return lib.filter.canBeGained(card, player, target) && get.event("list").includes(target);
						},
						list,
						ai1(card) {
							return 8 - get.value(card);
						},
						ai2(target) {
							return 1;
						},
					})
					.forResult();
			},
			async content(event, trigger, player) {
				await player.give(event.cards, event.targets[0], true);
			},
			ai: {
				expose: 0.3,
				order: 10,
				result: {
					target: 5,
				},
			},
		},
		//名门
		jlsg_zhugong_mingmen: {
			unique: true,
			zhuSkill: true,
			mod: {
				maxHandcard(player, num) {
					return num + game.countPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target));
				},
			},
			trigger: {
				global: "phaseBefore",
				player: "enterGame",
			},
			forced: true,
			filter(event, player) {
				if (!game.countPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target))) {
					return false;
				}
				return event.name != "phase" || game.phaseNumber == 0;
			},
			async content(event, trigger, player) {
				await player.draw(game.countPlayer(target => target != player && lib.skill._jlsg_buff.groupCheck(player, target))).set("_triggered", null);
			},
		},
		//魂烈
		jlsg_zhugong_hunlie: {
			unique: true,
			zhuSkill: true,
			mode: ["identity"],
			trigger: { player: "phaseZhunbeiBegin" },
			frequent: true,
			filter(event, player) {
				if (!game.hasPlayer(target => target != player)) {
					return false;
				}
				if (get.mode() == "identity") {
					return game.dead.some(current => current.identity == "zhong" || current.identity == "mingzhong");
				}
				return false;
			},
			async cost(event, trigger, player) {
				const num = game.dead.filter(current => current.identity == "zhong" || current.identity == "mingzhong").length;
				event.result = await player
					.chooseTarget(get.prompt("jlsg_zhugong_hunlie"), `对一名其他角色造成${num}点伤害`)
					.set("filterTarget", lib.filter.notMe)
					.set("ai", target => get.damageEffect(target, get.player(), get.player()))
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { num };
				}
			},
			async content(event, trigger, player) {
				const {
					cost_data: { num },
					targets: [target],
				} = event;
				await target.damage(num, player, "nocard");
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
