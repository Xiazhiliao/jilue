import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsoul_caocao: {
		1: {
			skill: {
				jlsg_guixin: {
					audio: "ext:极略/audio/skill:1",
					trigger: { player: "damageEnd" },
					check: function (event, player) {
						if (player.isTurnedOver()) return true;
						if (game.dead.length >= 2) return true;
						var num = game.countPlayer(function (current) {
							if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
								return true;
							}
							if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
								return true;
							}
						});
						return num >= 2;
					},
					content: function () {
						"step 0";
						event.num2 = trigger.num;
						("step 1");
						var targets = game.filterPlayer();
						targets.remove(player);
						targets.sort(lib.sort.seat);
						event.targets = targets;
						event.num = 0;
						player.line(targets, "green");
						("step 2");
						if (num < event.targets.length) {
							var hej = event.targets[num].getCards("hej");
							if (hej.length) {
								//				var card='hej';
								player.gainPlayerCard("hej", event.targets[num], true);
								//					if(get.position(card)=='h'){
								//event.targets[num].$giveAuto(card,player);
								//				}
								//				else{
								//				event.targets[num].$give(card,player);
								//						}
							}
							event.num++;
							event.redo();
						}
						("step 3");
						player.draw(game.dead.length);
						player.turnOver();
						("step 4");
						event.num2--;
						if (event.num2 > 0) {
							player.chooseBool(get.prompt2("jlsg_guixin"));
						} else {
							event.finish();
						}
						("step 5");
						if (result.bool) {
							player.logSkill("jlsg_guixin");
							event.goto(1);
						}
					},
					ai: {
						maixie: true,
						maixie_hp: true,
						threaten: function (player, target) {
							if (target.hp == 1) return 3;
							return 1;
						},
						effect: {
							target: function (card, player, target) {
								if (get.tag(card, "damage")) {
									if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
									if (target.hp == 1) return 0.8;
									if (target.isTurnedOver()) return [0, 3];
									var num = game.countPlayer(function (current) {
										if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
											return true;
										}
										if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
											return true;
										}
									});
									if (num > 2) return [0, 1];
									if (num == 2) return [0.5, 1];
								}
							},
						},
					},
				},
				jlsg_feiying: {
					mod: {
						targetInRange: function (card, player, target, now) {
							if (!player.isTurnedOver() && card.name == "sha") return true;
						},
						targetEnabled: function (card, player, target, now) {
							if (target.isTurnedOver() && card.name == "sha") return false;
						},
					},
				},
			},
			translate: {
				jlsg_feiying_info: "锁定技，若你的武将牌正面朝上，你使用【杀】无距离限制；若你的武将牌正面朝下，你不能成为【杀】的目标。",
				jlsg_guixin_info: "当你受到一次伤害后，你可以获得每名其他角色区域里的一张牌，再摸X张牌（X为阵亡/败退的角色数），然后翻面。",
			},
		},
	},
	jlsgsoul_dianwei: {
		1: {
			skill: {
				jlsg_zhiji: {
					audio: "ext:极略/audio/skill:2",
					usable: 1,
					enable: "phaseUse",
					filter: function (event, player) {
						return player.countCards("he", { subtype: "equip1" });
					},
					filterCard: function (card) {
						return get.subtype(card) == "equip1";
					},
					position: "he",
					selectCard: [1, Infinity],
					filterTarget: function (card, player, target) {
						return player != target;
					},
					check: function (card) {
						return 9 - get.value(card);
					},
					content: function () {
						target.damage(cards.length);
					},
					group: ["jlsg_zhiji_damage"],
					subSkill: {
						damage: {
							audio: "ext:极略/audio/skill:true",
							trigger: { player: "damageEnd" },
							check: () => true,
							content: function () {
								var field = undefined;
								if (Math.random() > 0.5) {
									field = "discardPile";
								}
								var card = get.cardPile(function (card) {
									return get.subtype(card) == "equip1";
								}, field);
								if (!card) {
									if (!field) {
										card = get.cardPile(function (card) {
											return get.subtype(card) == "equip1";
										}, "discardPile");
									} else {
										card = get.cardPile(function (card) {
											return get.subtype(card) == "equip1";
										});
									}
								}
								if (card) {
									player.gain(card, "gain2");
									game.log(player, "从" + (field == undefined ? "" : "弃") + "牌堆获得了", card);
								}
							},
						},
					},
					ai: {
						order: 10,
						result: {
							target: -1.5,
						},
						tag: {
							damage: 1,
						},
					},
				},
			},
			translate: {
				jlsg_zhiji_info: "出牌阶段限一次，你可以弃置至少一张武器牌，然后对一名其他角色造成等同于此次弃置武器牌数点伤害。当你受到伤害后，你可以从弃牌堆或牌堆随机获得一张武器牌。",
			},
		},
	},
	jlsgsoul_diaochan: {
		1: {
			skill: {
				jlsg_tianzi: {
					srlose: true,
					audio: "ext:极略/audio/skill:1",
					trigger: { player: "phaseDrawBefore" },
					filter: function (event, player) {
						return !event.numFixed;
					},
					check: function (event, player) {
						return game.countPlayer() - event.num > 1;
					},
					content: function () {
						"step 0";
						trigger.changeToZero();
						event.current = player.next;
						("step 1");
						event.current.chooseCard("交给" + get.translation(player) + "一张手牌或令其摸一张牌").ai = function (card) {
							if (ai.get.attitude(event.current, player) > 0) {
								return -1;
							} else {
								return 3 - ai.get.value(card);
							}
						};
						("step 2");
						if (result.bool == false) {
							event.current.line(player, "green");
							game.log(get.translation(event.current) + "让" + get.translation(player) + "摸了一张牌");
							player.draw();
						} else {
							player.gain(result.cards[0]);
							event.current.$give(1, player);
						}
						if (event.current.next != player) {
							event.current = event.current.next;
							game.delay(0.5);
							event.goto(1);
						}
					},
				},
				jlsg_meixin: {
					audio: "ext:极略/audio/skill:4",
					enable: "phaseUse",
					usable: 1,
					filterCard: true,
					position: "he",
					filterTarget: function (card, player, target) {
						if (player == target) return false;
						return target.hasSex("male");
					},
					check: function (card) {
						return 6 - get.value(card);
					},
					content: function () {
						target.markSkillCharacter("jlsg_meixin", player, "魅心", "本阶段当你使用一张基本牌后，该目标弃置一张牌；当你使用一张锦囊牌后，你获得该目标一张牌；当你使用一张装备牌后，你对该目标造成1点伤害。");
						player.storage.jlsg_meixin = target;
						player.addTempSkill("jlsg_meixin2", "phaseAfter");
						player.addTempSkill("jlsg_meixin3", "phaseAfter");
					},
					ai: {
						threaten: 3,
						order: 15,
						expose: 0.3,
						result: {
							target: function (player, target) {
								return -target.countCards("h") - 1;
							},
						},
					},
				},
				jlsg_meixin2: {
					trigger: { player: "useCardAfter" },
					filter: function (event, player) {
						return player.storage.jlsg_meixin && player.storage.jlsg_meixin.isAlive();
					},
					forced: true,
					content: function () {
						var target = player.storage.jlsg_meixin;

						if (get.type(trigger.card, "trick") == "basic" && target.countCards("he") > 0) {
							player.logSkill("jlsg_meixin", target);
							target.chooseToDiscard("he", true);
						}
						if (get.type(trigger.card, "trick") == "trick" && target.countCards("he") > 0) {
							player.logSkill("jlsg_meixin", target);
							player.gainPlayerCard("he", target, true);
						}
						if (get.type(trigger.card, "trick") == "equip") {
							player.logSkill("jlsg_meixin", target);
							target.damage();
						}
					},
				},
				jlsg_meixin3: {
					trigger: { player: "phaseEnd" },
					forced: true,
					popup: false,
					filter: function (event, player) {
						return player.storage.jlsg_meixin && player.storage.jlsg_meixin.isAlive();
					},
					content: function () {
						var target = player.storage.jlsg_meixin;
						target.unmarkSkill("jlsg_meixin");
						delete player.storage.jlsg_meixin;
					},
				},
			},
			translate: {
				jlsg_tianzi_info: "摸牌阶段开始时，你可以放弃摸牌，然后令所有其他角色依次选择一项：1、交给你一张牌；2、令你摸一张牌。",
				jlsg_meixin_info: "出牌阶段限一次，你可以弃置一张牌并选择一名其他男性角色，若如此做，本阶段当你使用一张基本牌后，你令其弃置一张牌；当你使用一张锦囊牌后，你获得其一张牌；当你使用一张装备牌后，你对其造成一点伤害。",
			},
		},
	},
	jlsgsoul_huanggai: {
		1: {
			skill: {
				jlsg_lianti: {
					audio: "ext:极略/audio/skill:2",
					forced: true,
					charlotte: true,
					delay: false,
					trigger: { player: "showCharacterEnd" },
					init: function (player) {
						if (player.hasSkill("jlsg_lianti")) {
							player.useSkill("jlsg_lianti");
						}
					},
					intro: {
						content: "mark",
					},
					filter: function (event, player) {
						return !player.isLinked();
					},
					content: function () {
						player.link(true)._triggered = null;
					},
					group: ["jlsg_lianti_guard", "jlsg_lianti2", "jlsg_lianti3", "jlsg_lianti4"],
					subSkill: {
						guard: {
							silent: true,
							charlotte: true,
							trigger: { player: "linkBefore" },
							filter: function (event, player) {
								return player.isLinked() && player.hasSkill("jlsg_lianti");
							},
							content: function () {
								trigger.cancel();
								game.log(player, "取消了重置");
							},
						},
					},
				},
				jlsg_lianti2: {
					audio: "jlsg_lianti",
					forced: true,
					trigger: {
						global: "damageEnd",
					},
					filter: function (event, player) {
						return player === _status.currentPhase && player != event.player && event.nature && event.player.getHistory("damage", e => e.nature).indexOf(event) == 0;
					},
					content: function () {
						trigger.player.damage(trigger.num, trigger.source);
					},
				},
				jlsg_lianti3: {
					audio: "jlsg_lianti",
					forced: true,
					trigger: {
						player: "damageEnd",
					},
					filter: function (event, player) {
						return event.nature;
					},
					content: function () {
						"step 0";
						player.addMark("jlsg_lianti");
						("step 1");
						player.loseMaxHp();
					},
				},
				jlsg_lianti4: {
					audio: "jlsg_lianti",
					forced: true,
					trigger: { player: "phaseDrawBegin2" },
					filter: function (event, player) {
						return !event.numFixed && player.storage.jlsg_lianti;
					},
					content: function () {
						trigger.num += player.countMark("jlsg_lianti");
					},
					mod: {
						maxHandcard: function (player, num) {
							return num + player.countMark("jlsg_lianti");
						},
					},
				},
				jlsg_yanlie: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					usable: 1,
					filterCard: true,
					selectCard: function () {
						if (ui.selected.targets.length) return [ui.selected.targets.length, Math.min(ui.selected.targets.length + 1, game.players.length - 1)];
						return [1, Infinity];
					},
					check: function (card) {
						var player = _status.event.player;
						let maxTarget = game.countPlayer(p => lib.skill.jlsg_yanlie.ai.result.target(player, p) * get.attitude(player, p) > 0);
						if (maxTarget <= ui.selected.cards.length) return 0;
						return 6 - get.value(card);
					},
					selectTarget: function () {
						return ui.selected.cards.length;
					},
					filterTarget: lib.filter.notMe,
					line: false,
					delay: false,
					multitarget: true,
					multiline: true,

					content: function () {
						"step 0";
						player.useCard({ name: "tiesuo", isCard: true }, targets);
						("step 1");
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
						("step 2");
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
								if (target.hasSkillTag("nofire")) return 0;
								let eff = get.damageEffect(target, player, player, "fire") / get.attitude(player, target);
								if (player.hasSkill("jlsg_lianti")) {
									eff *= 2;
								}
								return eff;
							},
						},
					},
				},
			},
			translate: {
				jlsg_lianti_info: "锁定技，你始终横置，其他角色于你的回合内第一次受到属性伤害后，你令其再受到一次等量同属性伤害。当你受到属性伤害后，你摸牌阶段摸牌数和手牌上限+1，然后减1点体力上限。",
				jlsg_yanlie_info: "出牌阶段限一次，你可以弃置至少一张手牌并选择等量的其他角色，视为你对这些角色使用【铁索连环】，然后对一名横置角色造成1点火焰伤害。",
			},
		},
	},
	jlsgsoul_jiaxu: {
		1: {
			skill: {
				jlsg_yanmie: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					filter: function (event, player) {
						return player.countCards("he", { suit: "spade" }) > 0;
					},
					check: function (card) {
						return 7 - get.value(card);
					},
					filterCard: function (card) {
						return get.suit(card) == "spade";
					},
					position: "he",
					filterTarget: function (card, player, target) {
						return player != target && target.countCards("h");
					},
					content: function () {
						"step 0";
						var num = target.countCards("h");
						target.discard(target.get("h"));
						target.draw(num);
						target.showHandcards();
						("step 1");
						var cards = target.getCards("h", function (card) {
							return get.type(card) != "basic";
						});
						// var num = target.countCards('h', function (card) {
						//   return get.type(card) != 'basic';
						// });
						// target.discard(target.get('h', function (card) {
						//   return get.type(card) != 'basic';
						// }));
						if (cards.length) {
							target.discard(cards, player);
							target.damage(cards.length);
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
					trigger: { target: "useCardToBegin" },
					filter: function (event, player) {
						return event.player != player && get.type(event.card) == "basic" && game.hasPlayer(p => p != player && p != event.player);
					},
					direct: true,
					content: function () {
						"step 0";
						player.chooseTarget("是否发动【顺世】?", [1, 3], function (card, player, target) {
							return player != target && trigger.player != target;
						}).ai = function (target) {
							// if (trigger.card.name == 'sha') {
							//   if (target.countCards('e', '2') && target.get('e') != 'baiyin') return 0;
							//   return -get.attitude(player, target);
							// }
							// if (trigger.card.name == 'tao') {
							//   if (!target.isDamaged()) return 0;
							//   return get.attitude(player, target);
							// }
							return get.effect(target, { name: trigger.card.name }, player);
						};
						("step 1");
						if (result.bool) {
							player.logSkill("jlsg_shunshi", result.targets);
							player.draw();
							game.asyncDraw(result.targets);
							for (var i = 0; i < result.targets.length; i++) {
								trigger.targets.push(result.targets[i]);
								game.log(result.targets[i], "成为了额外目标");
							}
						}
					},
					ai: {
						effect: {
							target: function (card, player, target) {
								if (player == target) return;
								if (card.name == "tao") {
									return [1, 2];
								}
								if (card.name == "sha") {
									return [1, 0.74];
								}
							},
						},
					},
				},
			},
			translate: {
				jlsg_yanmie_info: "出牌阶段，你可以弃置一张黑桃牌，令一名其他角色先弃置所有手牌再摸等量的牌并展示之。你弃置其中所有非基本牌，并对其造成等量的伤害。",
				jlsg_shunshi_info: "当你成为其他角色使用基本牌的目标后，你可以令你与除该角色以外的一至三名其他角色各摸一张牌，然后这些角色也成为此牌的目标。",
			},
		},
	},
	jlsgsoul_lvbu: {
		1: {
			skill: {
				jlsg_kuangbao1: {
					trigger: { source: "damageEnd", player: "damageEnd" },
					forced: true,
					audio: "ext:极略/audio/skill:true",
					filter: function (event) {
						return event.num != 0;
					},
					content: function () {
						player.addMark("jlsg_kuangbao", trigger.num);
						if (trigger.source == this.trigger.player) {
							player.addMark("jlsg_kuangbao", trigger.num);
						}
					},
				},
				jlsg_wumou: {
					audio: "ext:极略/audio/skill:1",
					trigger: { player: "useCard" },
					forced: true,
					filter: function (event) {
						return get.type(event.card) == "trick";
					},
					content: function () {
						"step 0";
						if (player.storage.jlsg_kuangbao > 0) {
							player.chooseControl("选项一", "选项二").set("prompt", '无谋<br><br><div class="text">1:弃置1枚「暴」标记</div><br><div class="text">2:受到1点伤害</div></br>').ai = function () {
								if (player.storage.jlsg_kuangbao > 6) return "选项一";
								if (player.hp >= 4 && player.countCards("h", "tao") >= 1) return "选项二";
								return Math.random() < 0.5 && "选项一";
							};
						} else {
							player.damage("nosource");
							event.finish();
						}
						("step 1");
						if (result.control == "选项一") {
							player.storage.jlsg_kuangbao--;
							player.syncStorage("jlsg_kuangbao");
						} else {
							player.damage("nosource");
						}
					},
					ai: {
						neg: true,
					},
				},
				jlsg_wuqian: {
					audio: "ext:极略/audio/skill:1",
					enable: "phaseUse",
					usable: 1,
					filter: function (event, player) {
						return player.storage.jlsg_kuangbao > 1;
					},
					content: function () {
						"step 0";
						player.removeMark("jlsg_kuangbao", 2);
						("step 1");
						player.addTempSkill("wushuang", "phaseAfter");
						player.addTempSkill("jlsg_wuqian_buff", "phaseAfter");
					},
					subSkill: {
						buff: {
							trigger: { source: "damageEnd" },
							forced: true,
							popup: false,
							audio: false,
							filter: function (event) {
								return event.num != 0;
							},
							content: function () {
								player.addMark("jlsg_kuangbao");
							},
						},
					},
					ai: {
						order: 10,
						result: {
							player: function (player) {
								if (player.countCards("h", "juedou") > 0) {
									return 2;
								}
								var ph = player.get("h");
								var num = 0;
								for (var i = 0; i < ph.length; i++) {
									if (get.tag(ph[i], "damage")) num++;
								}
								if (num > 1) return num;
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
						return player.storage.jlsg_kuangbao >= 6;
					},
					skillAnimation: true,
					animationColor: "metal",
					mark: true,
					content: function () {
						"step 0";
						player.storage.jlsg_kuangbao -= 6;
						player.syncStorage("jlsg_kuangbao");
						event.targets = game.players.slice(0);
						event.targets.remove(player);
						event.targets.sort(lib.sort.seat);
						event.targets2 = event.targets.slice(0);
						("step 1");
						if (event.targets.length) {
							event.targets.shift().damage();
							event.redo();
						}
						("step 2");
						if (event.targets2.length) {
							var cur = event.targets2.shift();
							if (cur && cur.num("he")) {
								if (cur.num("e")) {
									cur.discard(cur.get("e"));
								}
								cur.chooseToDiscard("h", true, 4);
							}
							event.redo();
						}
						("step 3");
						player.turnOver();
					},
					ai: {
						order: 9,
						result: {
							player: function (player) {
								var num = 0;
								for (var i = 0; i < game.players.length; i++) {
									if (game.players[i] != player) {
										if (game.players[i].ai.shown == 0) return 0;
										num += get.damageEffect(game.players[i], player, player) > 0 ? 1 : -1;
									}
								}
								return num;
							},
						},
					},
				},
			},
			translate: {
				jlsg_kuangbao_info: "锁定技，游戏开始时，你获得2枚「暴」标记。每当你造成或受到伤害时，你获得等量的「暴」标记。",
				jlsg_wumou_info: "锁定技，当你使用非延时锦囊牌时，你须选择一项：1，弃置一枚「暴」标记；2，受到一点伤害。",
				jlsg_wuqian_info: "出牌阶段：你可以弃置2枚「暴」标记，若如此做，本回合内你视为拥有技能【无双】且你造成伤害后额外获得一枚「暴」标记。",
				jlsg_shenfen_info: "出牌阶段，弃6个暴怒标记，你对每名其他角色各造成一点伤害，其他角色先弃掉各自装备区里所有的牌，再各弃4张手牌，然后将你的武将牌翻面，每回合限一次。",
			},
		},
	},
	jlsgsoul_liubei: {
		1: {
			skill: {
				jlsg_jizhao: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					filterCard: true,
					selectCard: [1, Infinity],
					filter: function () {
						for (var i = 0; i < game.players.length; i++) {
							if (!game.players[i].storage.jlsg_jizhao1) return true;
						}
						return false;
					},
					discard: false,
					// prepare: "give2",
					check: function (card) {
						if (ui.selected.cards.length > 1) return 0;
						if (ui.selected.cards.length && ui.selected.cards[0].name == "du") return 0;
						if (ui.selected.cards.length && ui.selected.cards[0].name == "shandian") return 0;
						if (!ui.selected.cards.length && card.name == "du") return 20;
						if (!ui.selected.cards.length && card.name == "shandian") return 18;
						if (!ui.selected.cards.length && card.name == "shan") return 14;
						if (!ui.selected.cards.length && card.name == "jiedao") return 16;
						return 0;
					},
					filterTarget: function (card, player, target) {
						return !target.storage.jlsg_jizhao1 && player != target;
					},
					content: function () {
						target.gain(cards, player, "giveAuto");
						// player.$give(cards, target);
						target.addTempSkill("jlsg_jizhao_zhao", { player: "dieAfter" });
						target.storage.jlsg_jizhao1 = true;
						target.storage.jlsg_jizhao2 = player;
					},
					ai: {
						order: 4,
						result: {
							target: function (card, player, target) {
								if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
									return -10;
								}
								if (ui.selected.cards.length && ui.selected.cards[0].name == "shandian") {
									return -10;
								}
								return -1;
							},
							result: {
								target: -1,
							},
						},
					},
				},
			},
			translate: {
				jlsg_jizhao_info: "出牌阶段对一名无标记的其他角色限一次，你可以交给其至少一张手牌，并令其获得一个「诏」标记；拥有「诏」标记的角色回合结束时，若其本回合内未造成过伤害，其受到你造成的一点伤害并失去「诏」标记。",
			},
		},
	},
	jlsgsoul_sunquan: {
		1: {
			skill: {
				jlsg_huju: {
					audio: "ext:极略/audio/skill:true",
					trigger: { global: "phaseBegin" },
					derivation: ["zhiheng", "jlsg_hufu"],
					filter: function (event, player) {
						return event.player != player;
					},
					forced: true,
					content: function () {
						player.draw();
					},
					group: ["jlsg_huju2"],
				},
				jlsg_huju2: {
					// audio: "ext:极略/audio/skill:true",
					trigger: { player: "phaseBegin" },
					filter: function (event, player) {
						var num = player.countCards("h");
						for (var i = 0; i < game.players.length; i++) {
							if (game.players[i].num("h") > num) return false;
						}
						return true;
					},
					forced: true,
					content: function () {
						"step 0";
						player
							.chooseControl("选项一", "选项二", function () {
								if (
									player.hp <= 2 &&
									!player.countCards("h", function (card) {
										return get.tag(card, "recover");
									})
								)
									return "选项二";
								return "选项一";
							})
							.set("prompt", '虎踞<br><br><div class="text">1：失去1点体力</div><br><div class="text">2：减1点体力上限，失去【虎踞】，获得【制衡】和【虎缚】</div></br>');
						("step 1");
						if (result.control == "选项一") {
							game.trySkillAudio("jlsg_hujuStill");
							player.loseHp();
						} else {
							player.logSkill("jlsg_hujuWake");
							player.loseMaxHp();
							player.changeSkills(["zhiheng", "jlsg_hufu"], ["jlsg_huju"]);
						}
					},
				},
				jlsg_hujuStill: {
					audio: "ext:极略/audio/skill:true",
					charlotte: true,
				},
				jlsg_hujuWake: {
					skillAnimation: true,
					audio: "ext:极略/audio/skill:true",
					inherit: "jlsg_huju2",
					unique: true,
					charlotte: true,
				},
				jlsg_hufu: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					usable: 1,
					filterTarget: function (card, player, target) {
						return player != target && target.countCards("e");
					},
					content: function () {
						target.chooseToDiscard(target.countCards("e"), true, "he");
					},
					ai: {
						expose: 0.3,
						order: 10,
						result: {
							target: function (player, target) {
								return -target.countCards("e");
							},
						},
					},
				},
			},
			translate: {
				jlsg_huju2: "虎踞",
				jlsg_huju_info: "锁定技，其他角色的回合开始时，你摸一张牌。你的回合开始时，若你的手牌数为最多（或之一），你选择一项：1、失去一点体力；2、减一点体力上限，失去〖虎踞〗，并获得技能〖制衡〗和〖虎缚〗。",
			},
			info: ["male", "shen", 4, ["jlsg_huju"], ["wu"]],
		},
	},
	jlsgsoul_simayi: {
		1: {
			skill: {
				jlsg_jilve: {
					audio: "ext:极略/audio/skill:3",
					enable: "phaseUse",
					filter: function (event, player) {
						return !player.hasSkill("jlsg_jilve2");
					},
					content: function () {
						"step 0";
						player.draw("nodelay");
						player.chooseToUse().filterCard = function (card, player) {
							return lib.filter.cardEnabled(card, player, event.parent.parent) && lib.filter.cardUsable(card, player, event.parent.parent);
						};
						("step 1");
						if (!result.bool) {
							player.chooseToDiscard("he", true);
							player.addTempSkill("jlsg_jilve2", "phaseAfter");
						}
					},
					ai: {
						threaten: 4,
						order: 15,
						result: {
							player: 1,
						},
						effect: {
							player: function (card, player) {
								if (get.type(card) != "basic") return [1, 3];
							},
						},
					},
				},
				jlsg_jilve2: {},
				jlsg_tongtian: {
					audio: "ext:极略/audio/skill:1",
					enable: "phaseUse",
					skillAnimation: true,
					limited: true,
					position: "he",
					mark: true,
					marktext: "通",
					//filter:function(event,player){
					//    return !player.storage.jlsg_tongtian;
					//  },
					intro: {
						content: true,
					},
					filterCard: function (card) {
						var suit = get.suit(card);
						return !ui.selected.cards.map(card => get.suit(card)).includes(suit);
					},
					complexCard: true,
					selectCard: [1, 4],
					prompt: "选择不同花色的牌，获得各花色的技能。",
					check: function (card) {
						return 8 - get.value(card);
					},
					derivation: ["zhiheng", "guanxing", "fankui", "wansha"],
					content: function () {
						"step 0";
						var suits = cards.map(card => get.suit(card));
						let skills = [];
						if (suits.includes("spade")) {
							skills.push("fankui");
						}
						if (suits.includes("heart")) {
							skills.push("guanxing");
						}
						if (suits.includes("diamond")) {
							skills.push("zhiheng");
						}
						if (suits.includes("club")) {
							skills.push("wansha");
						}
						player.addSkills(skills);
						("step 1");
						player.awakenSkill("jlsg_tongtian");
					},
					ai: {
						order: 6,
						result: {
							player: function (player) {
								var cards = player.get("he");
								var suits = [];
								for (var i = 0; i < cards.length; i++) {
									if (!suits.includes(get.suit(cards[i]))) {
										suits.push(get.suit(cards[i]));
									}
								}
								if (suits.length < 3) return -1;
								return suits.length;
							},
						},
					},
				},
			},
			translate: {
				jlsg_tongtian_info: "限定技，出牌阶段你可以弃置任意花色不同的牌，然后根据以下技能获得相应技能：黑桃·反馈；红桃·观星；梅花·完杀；方片·制衡。",
				jlsg_jilve_info: "出牌阶段，你可以摸一张牌，然后选择一项：使用一张牌，或弃置一张牌。若你以此法弃置牌，则本回合此技能失效。",
			},
		},
	},
	jlsgsoul_sp_simayi: {},
	jlsgsoul_zhangjiao: {
		1: {
			skill: {
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
							if (player.countCards("h") <= 1 || player.hp == 1) return -1;
						} else {
							if (
								player.countCards("h", function (card) {
									return get.value(card) > 7;
								})
							)
								return -1;
							if (player.countCards("h") - player.hp >= 3) return -1;
						}
						return 1;
					},
					content: function () {
						"step 0";
						trigger.cancel();
						player.judge(function (card) {
							return get.color(card) == "black" ? 1.5 : -1;
						});
						("step 1");
						if (result.bool) {
							player.chooseTarget("选择一个目标对其造成2点雷电伤害").ai = function (target) {
								// if (player.hp == 1) return target == player ? 1 : -1;
								return get.damageEffect(target, player, player, "thunder");
							};
						} else {
							player.chooseTarget("选择一至两个目标将其横置", [1, 2], function (card, player, target) {
								return !target.isLinked();
							}).ai = function (target) {
								return -get.attitude(player, target);
							};
							event.goto(3);
						}
						("step 2");
						if (result.bool) {
							player.line(result.targets[0], "thunder");
							result.targets[0].damage("thunder", 2);
						}
						event.finish();
						("step 3");
						if (result.bool) {
							player.line(result.targets, "thunder");
							for (var i = 0; i < result.targets.length; i++) {
								result.targets[i].link();
							}
						}
					},
				},
			},
			translate: {
				jlsg_dianjie_info: "你可以跳过你的摸牌阶段或出牌阶段，然后判定：若结果为黑色，你对一名角色造成2点雷电伤害；若结果为红色，你令至多两名武将牌未横置的角色将其武将牌横置。",
			},
		},
	},
	jlsgsoul_sp_zhangjiao: {
		1: {
			skill: {
				jlsg_yinyang_s: {
					audio: "ext:极略/audio/skill:2",
					derivation: ["jlsg_jiyang", "jlsg_jiyin", "jlsg_xiangsheng"],
					forced: true,
					trigger: {
						player: ["showCharacterEnd", "changeHp", "gainMaxHpAfter", "loseMaxHpAfter"],
					},
					delay: false,
					init: function (player) {
						if (player.hasSkill("jlsg_yinyang_s")) {
							player.useSkill("jlsg_yinyang_s");
						}
					},
					filter: function (event, player) {
						let skill = lib.skill.jlsg_yinyang_s.getCurrentSkill(player);
						return !player.hasSkill(skill);
					},
					content: function () {
						let skill = lib.skill.jlsg_yinyang_s.getCurrentSkill(player);
						player.addAdditionalSkill(event.name, skill); // keep = false
						// ['jlsg_jiyang', 'jlsg_jiyin', 'jlsg_xiangsheng']
						//   .filter(s => s != skill)
						//   .forEach(s => player.removeAdditionalSkill(event.name, s));
					},
					getCurrentSkill(player) {
						let diff = player.hp - player.getDamagedHp();
						if (diff > 0) {
							return "jlsg_jiyang";
						}
						if (diff < 0) {
							return "jlsg_jiyin";
						}
						return "jlsg_xiangsheng";
					},
				},
				jlsg_jiyang: {
					audio: "ext:极略/audio/skill:2",
					sub: true,
					unique: true,
					init: function (player) {
						player.addMark("jlsg_jiyang", 3);
					},
					onremove(player, skill) {
						delete player.storage[skill];
						var card = get.cardPile(function (card) {
							return get.color(card, false) == "red";
						});
						if (card) {
							player.gain(card, "gain2");
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
						if (!evt || !evt.cards2 || !evt.cards2.length) return false;
						for (var i of evt.cards2) {
							if (get.color(i, player) == "red") return true;
						}
						return false;
					},
					direct: true,
					content: function () {
						"step 0";
						player
							.chooseTarget(get.prompt(event.name))
							.set("prompt2", "令一名角色回复1点体力，若其未受伤则改为加1点体力上限。")
							.set("ai", function (target, targets) {
								var player = _status.event.player;
								var eff = get.attitude(player, target);
								eff = 2 * Math.atan(eff);
								if (!target.isHealthy()) {
									eff = get.recoverEffect(target, player, player);
								}
								return eff - 0.5 + Math.random();
							});
						("step 1");
						if (!result.bool) {
							event.finish();
							return;
						}
						player.logSkill(event.name, result.targets);
						player.removeMark(event.name);
						var target = result.targets[0];
						if (player.ai.shown < target.ai.shown) {
							player.addExpose(0.2);
						}
						if (target.isHealthy()) {
							target.gainMaxHp();
						} else {
							target.recover(player);
						}
					},
				},
				jlsg_jiyin: {
					audio: "ext:极略/audio/skill:2",
					sub: true,
					unique: true,
					init: function (player) {
						player.addMark("jlsg_jiyin", 3);
					},
					onremove(player, skill) {
						delete player.storage[skill];
						var card = get.cardPile(function (card) {
							return get.color(card, false) == "black";
						});
						if (card) {
							player.gain(card, "gain2");
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
						if (!evt || !evt.cards2 || !evt.cards2.length) return false;
						for (var i of evt.cards2) {
							if (get.color(i, player) == "black") return true;
						}
						return false;
					},
					direct: true,
					content: function () {
						"step 0";
						player
							.chooseTarget(get.prompt(event.name))
							.set("prompt2", "对一名角色造成1点雷电伤害，若其已受伤则改为减1点体力上限。")
							.set("ai", function (target, targets) {
								var player = _status.event.player;
								var eff = get.attitude(player, target);
								eff = -2 * Math.atan(eff);
								if (target.isHealthy()) {
									eff = get.damageEffect(target, player, player, "thunder");
								}
								return eff - 0.5 + Math.random();
							});
						("step 1");
						if (!result.bool) {
							event.finish();
							return;
						}
						player.logSkill(event.name, result.targets);
						player.removeMark(event.name);
						var target = result.targets[0];
						if (player.ai.shown < target.ai.shown) {
							player.addExpose(0.2);
						}
						if (target.isHealthy()) {
							target.damage("thunder");
						} else {
							target.loseMaxHp();
						}
					},
				},
				jlsg_xiangsheng: {
					audio: "ext:极略/audio/skill:2",
					sub: true,
					unique: true,
					init: function (player) {
						player.addMark("jlsg_xiangsheng", 6);
					},
					onremove(player, skill) {
						delete player.storage[skill];
						player.draw();
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
					filter: function (event, player) {
						if (!player.countMark("jlsg_xiangsheng")) {
							return false;
						}
						var evt = event.getl(player);
						if (!evt || !evt.cards2 || !evt.cards2.length) return false;
						for (var i of evt.cards2) {
							if (["black", "red"].includes(get.color(i, player))) return true;
						}
						return false;
					},
					direct: true,
					frequent: true,
					content: function () {
						"step 0";
						event.colors = [];
						var evt = trigger.getl(player);
						event.cards = evt.cards2;
						for (var i of evt.cards2) {
							let color = get.color(i, player);
							if (color == "black") event.colors.add("red");
							if (color == "red") event.colors.add("black");
						}
						if (!event.colors.length) {
							console.warn("jlsg_xiangsheng no color found!");
							event.finish();
							return;
						}
						("step 1");
						event.color = event.colors.shift();
						player.chooseBool(get.prompt(event.name), true).set("prompt2", `你可以摸一张${lib.translate[event.color]}牌`).set("frequentSkill", event.name);
						("step 2");
						if (result.bool) {
							player.logSkill(event.name);
							player.removeMark(event.name);
							var card = get.cardPile2(function (card) {
								return !event.cards.includes(card) && get.color(card, false) == event.color;
							});
							if (card) player.gain(card, "gain2");
						}

						if (player.countMark(event.name) && event.colors.length) {
							event.goto(1);
						}
					},
				},
			},
			translate: {
				jlsg_xiangsheng_info: "锁定技，获得此技能时，你获得6枚「生」标记；失去此技能后，你摸一张牌；当你失去黑色/红色牌后，你可以弃置1枚「生」标记并摸一张红色/黑色牌。",
				jlsg_jiyang_info: "锁定技，获得此技能时，你获得3枚「阳」标记；失去此技能后，你随机获得一张红色牌；当你失去红色牌后，你可以弃置1枚「阳」标记令一名角色回复1点体力，若其未受伤则改为加1点体力上限。",
				jlsg_jiyin_info: "锁定技，获得此技能时，你获得3枚「阴」标记；失去此技能后，你随机获得一张黑色牌；当你失去黑色牌后，你可以弃置1枚「阴」标记对一名角色造成1点雷电伤害，若其已受伤则改为减1点体力上限。",
			},
		},
	},
	jlsgsoul_zhangfei: {
		1: {
			skill: {
				jlsg_shayi: {
					audio: "ext:极略/audio/skill:4",
					trigger: { player: "phaseUseBegin" },
					filter: function (event, player) {
						return player.countCards("h") > 0;
					},
					forced: true,
					content: function () {
						"step 0";
						player.showHandcards();
						("step 1");
						if (!player.countCards("h", "sha")) {
							player.addTempSkill("jlsg_shayi_buff", "phaseAfter");
						} else {
							player.draw();
						}
					},
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name == "sha") return Infinity;
						},
						targetInRange: function (card) {
							if (card.name == "sha") return true;
						},
					},
					subSkill: {
						buff: {
							audio: "ext:极略/audio/skill:2",
							enable: ["chooseToRespond", "chooseToUse"],
							filterCard: function (card) {
								return get.color(card) == "black";
							},
							position: "hes",
							viewAs: { name: "sha" },
							viewAsFilter: function (player) {
								if (!player.countCards("hes", { color: "black" })) return false;
							},
							prompt: "将一张黑色牌当杀使用或打出",
							check: function (card) {
								return 4 - get.value(card);
							},
							ai: {
								skillTagFilter: function (player) {
									if (!player.countCards("hes", { color: "black" })) return false;
								},
								respondSha: true,
							},
						},
					},
				},
				jlsg_zhenhun: {
					audio: "ext:极略/audio/skill:true",
					enable: "phaseUse",
					usable: 1,
					filterTarget: function (card, player, target) {
						return player != target;
					},
					filer: function (event, player) {
						return player.countCards("he") > 0;
					},
					filterCard: true,
					check: function (card) {
						return 4 - get.value(card);
					},
					selectTarget: -1,
					content: function () {
						if (!target.hasSkill("jlsg_zhenhun_debuff")) {
							var list = [];
							for (var i = 0; i < target.skills.length; i++) {
								if (!get.is.locked(target.skills[i])) {
									list.push(target.skills[i]);
								}
							}
							if (list.length > 0) {
								target.disableSkill("jlsg_zhenhun", list);
								target.addSkill("jlsg_zhenhun_debuff");
							}
						}
					},
					ai: {
						order: 10,
						result: {
							player: function (player) {
								if (player.countCards("h") > 2) return 1;
								return -1;
							},
							target: function (target) {
								var num = 0;
								for (var i = 0; i < target.skills.length; i++) {
									if (!get.is.locked(target.skills[i])) {
										if (target.skills[i].enable && target.skills[i].enable == "phaseUse") {
											continue;
										} else {
											num++;
										}
									}
								}
								if (num > 0) return -num;
								return 0;
							},
						},
						threaten: 1.3,
					},
					subSkill: {
						debuff: {
							trigger: { global: "phaseAfter" },
							forced: true,
							popup: false,
							content: function () {
								player.enableSkill("jlsg_zhenhun");
								player.removeSkill("jlsg_zhenhun_debuff");
							},
							mark: true,
							intro: {
								content: function (st, player) {
									var storage = player.disabledSkills.jlsg_zhenhun;
									if (storage && storage.length) {
										var str = "失效技能：";
										for (var i = 0; i < storage.length; i++) {
											if (lib.translate[storage[i] + "_info"]) {
												str += get.translation(storage[i]) + "、";
											}
										}
										return str.slice(0, str.length - 1);
									}
								},
							},
						},
					},
				},
			},
			translate: {
				jlsg_shayi_info: "锁定技，出牌阶段开始时，你展示所有手牌，若有【杀】，你摸一张牌；若没有【杀】，你于本阶段可以将一张黑色牌当【杀】使用。你使用【杀】无距离限制、无次数限制。",
				jlsg_zhenhun_info: "出牌阶段限一次，你可以弃置一张牌令所有其他角色的非锁定技于本阶段内无效。",
			},
		},
	},
	jlsgsoul_zhaoyun: {},
	jlsgsoul_guojia: {
		1: {
			skill: {
				jlsg_tianqi_phase: {},
				jlsg_tianqi: {
					audio: "ext:极略/audio/skill:2",
					enable: ["chooseToUse", "chooseToRespond"],
					hiddenCard: function (player, name) {
						return lib.inpile.includes(name) && !player.isDying() && !player.hasSkill("jlsg_tianqi_phase");
					},
					filter: function (event, player) {
						if (player.isDying() || player.hasSkill("jlsg_tianqi_phase")) return false;
						for (var i of lib.inpile) {
							if (i == "shan" || i == "wuxie") continue;
							var type = get.type(i);
							if ((type == "basic" || type == "trick") && event.filterCard({ name: i }, player, event)) return true;
							if (i == "sha") {
								for (var j of lib.inpile_nature) {
									if (event.filterCard({ name: i, nature: j }, player, event)) return true;
								}
							}
						}
						return false;
					},
					chooseButton: {
						dialog: function (event, player) {
							var list1 = [],
								list1Tag;
							var list2 = [],
								list2Tag;
							for (var i of lib.inpile) {
								if (!lib.translate[i + "_info"]) continue;
								if (i == "shan" || i == "wuxie") continue;
								var type = get.type(i);
								if (type == "basic") {
									list1.push([type, "", i]);
									if (event.filterCard({ name: i }, player, event)) list1Tag = true;
									if (i == "sha") {
										for (var j of lib.inpile_nature) list1.push([type, "", i, j]);
									}
								}
								if (type == "trick") {
									list2.push([type, "", i]);
									if (event.filterCard({ name: i }, player, event)) list2Tag = true;
								}
							}
							var dialog = ui.create.dialog();
							if (list1Tag) {
								dialog.add("基本牌");
								dialog.add([list1, "vcard"]);
							}
							if (list2Tag) {
								dialog.add("锦囊牌");
								dialog.add([list2, "vcard"]);
							}
							return dialog;
						},
						filter: function (button, player) {
							var evt = _status.event.getParent();
							return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
						},
						check: function (button, buttons) {
							var player = _status.event.player;
							var card = { name: button.link[2], nature: button.link[3] };
							var knowHead = player.getStorage("jlsg_tianji_top")[0] === ui.cardPile.firstChild;
							var event = _status.event.getParent();
							var val = event.type == "phase" ? player.getUseValue(card) / 10 : 3;
							if (val > 0 && event.type != "phase" && get.tag(event.getParent(), "damage") && event.getParent().name != "juedou" && !player.countCards("h", { name: button.link[2] }) && (!knowHead || get.type(ui.cardPile.firstChild, "trick") == get.type(button.link[2], "trick") || event.getParent().baseDamage > 1)) {
								return val;
							}
							var loseHpEffect = lib.jlsg.getLoseHpEffect(player);
							if (!knowHead) {
								loseHpEffect /= 2;
							} else {
								if (get.type(ui.cardPile.firstChild, "trick") == get.type(button.link[2], "trick")) {
									loseHpEffect = 0;
								}
							}
							return val + loseHpEffect;
						},
						backup: function (links, player) {
							var tianqiOnUse = function (result, player) {
								if (player.isPhaseUsing()) {
									player.addTempSkill("jlsg_tianqi_phase", "phaseUseAfter");
								}
								player.logSkill("jlsg_tianqi");
								game.log(player, "声明了" + get.translation(links[0][0]) + "牌");
								var cards = get.cards();
								player.showCards(cards);
								result.cards = cards;
								if (get.type(cards[0], "trick") != links[0][0]) {
									player.loseHp();
								}
								delete player.storage.jlsg_tianji_top;
							};
							return {
								filterCard: function () {
									return false;
								},
								selectCard: -1,
								popname: true,
								viewAs: {
									name: links[0][2],
									nature: links[0][3],
								},
								onuse: tianqiOnUse,
								onrespond: tianqiOnUse,
							};
						},
						prompt: function (links, player) {
							return "亮出牌堆顶的一张牌，并将此牌当" + get.translation(links[0][2]) + "使用或打出。若亮出的牌不为" + get.translation(links[0][0]) + "牌，你须先失去1点体力。(你的出牌阶段限一次。)";
						},
					},
					group: ["jlsg_tianqi_shan", "jlsg_tianqi_wuxie"],
					ai: {
						order: 10,
						fireAttack: true,
						respondShan: true,
						respondSha: true,
						skillTagFilter: function (player, tag, arg) {
							if (player.isDying() || player.hasSkill("jlsg_tianqi_phase")) return false;
						},
						result: {
							player: function (player) {
								if (_status.event.dying) return get.attitude(player, _status.event.dying);
								if (player.storage.jlsg_tianji_top != undefined) return 1;
								if (player.hp <= 1 && player.storage.jlsg_tianji_top == undefined) return -10;
								if (Math.random() < 0.67) return 0.5;
								return -1;
							},
						},
						threaten: 4,
					},
				},
				jlsg_tianqi_wuxie: {
					enable: ["chooseToUse"],
					audio: "jlsg_tianqi",
					// filter: function (event, player) {
					//   return !player.isDying() && lib.inpile.includes('wuxie');
					// },
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					viewAs: { name: "wuxie" },
					viewAsFilter: function (player) {
						return !player.isDying() && !player.hasSkill("jlsg_tianqi_phase");
					},
					onuse: function (result, player) {
						if (player.isPhaseUsing()) {
							player.addTempSkill("jlsg_tianqi_phase", "phaseUseAfter");
						}
						var cards = get.cards();
						player.showCards(cards);
						result.cards = cards;
						if (get.type(cards[0], "trick") != "trick") {
							player.loseHp();
						}
						delete player.storage.jlsg_tianji_top;
					},
					ai: {
						effect: {
							player: function (card, player, target) {
								if (card.name == "wuxie" && _status.event.skill == "jlsg_tianqi_wuxie") {
									var knowHead = player.getStorage("jlsg_tianji_top")[0] === ui.cardPile.firstChild;
									// calculating lose hp effect
									var loseHpEffect = lib.jlsg.getLoseHpEffect(player);
									if (!knowHead) {
										loseHpEffect /= 2;
									} else {
										if (get.type(ui.cardPile.firstChild, "trick") == "trick") {
											loseHpEffect = 0;
										}
									}
									return [1, loseHpEffect];
								}
							},
						},
						// skillTagFilter: function (player) {
						//   return !player.isDying();
						// },
						// basic: {
						//   useful: [6, 4],
						//   value: [6, 4],
						// },
					},
				},
				jlsg_tianqi_shan: {
					enable: ["chooseToRespond", "chooseToUse"],
					audio: "jlsg_tianqi",
					// filter: function (event, player) {
					//   return !player.isDying() && event.parent.name != 'phaseUse';
					// },
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					order: function (card, event, player) {
						var player = _status.event.player;
						var cards = get.cards();
						if (player.hp > 2 && get.type(cards[0]) == "basic") {
							return 1;
						}
						if (player.hp <= 2 && player.countCards("h", "shan") && player.storage.jlsg_tianji_top != "basic") return 0;
						return 1;
					},
					viewAs: { name: "shan" },
					viewAsFilter: function (player) {
						return !player.isDying() && !player.hasSkill("jlsg_tianqi_phase");
					},
					onuse: function (result, player) {
						if (player.isPhaseUsing()) {
							player.addTempSkill("jlsg_tianqi_phase", "phaseUseAfter");
						}
						var cards = get.cards();
						player.showCards(cards);

						result.cards = cards;
						if (get.type(cards[0], "basic") != "basic") {
							player.loseHp();
						}
						delete player.storage.jlsg_tianji_top;
					},
					onrespond: function (result, player) {
						if (player.isPhaseUsing()) {
							player.addTempSkill("jlsg_tianqi_phase", "phaseUseAfter");
						}
						var cards = get.cards();
						player.showCards(cards);

						result.cards = cards;
						if (get.type(cards[0], "basic") != "basic") {
							player.loseHp();
						}
						delete player.storage.jlsg_tianji_top;
					},
					ai: {
						effect: {
							player: function (card, player, target) {
								if (card.name == "shan" && _status.event.skill == "jlsg_tianqi_shan") {
									var knowHead = player.getStorage("jlsg_tianji_top")[0] === ui.cardPile.firstChild;
									var loseHpEffect = -1;
									if (!knowHead) {
										loseHpEffect /= 2;
									} else {
										if (get.type(ui.cardPile.firstChild, "trick") == get.type(button.link[2], "trick")) {
											loseHpEffect = 0;
										}
									}
									return [1, loseHpEffect];
								}
							},
						},
					},
				},
				jlsg_tianji: {
					audio: "ext:极略/audio/skill:1",
					trigger: { global: "phaseUseBegin" },
					frequent: true,
					filter: function (event, player) {
						if (ui.cardPile.hasChildNodes() == false) return false;
						return true;
					},
					content: function () {
						"step 0";
						event.top = [ui.cardPile.firstChild];
						player.storage.jlsg_tianji_top = [ui.cardPile.firstChild];
						event.dialog = ui.create.dialog("天机", event.top, true);
						var controls = [];
						if (
							game.hasPlayer(function (target) {
								return player.countCards("h") <= target.countCards("h") && target != player;
							})
						) {
							controls.push("获得");
						}
						controls.push("替换");
						player.chooseControl(controls, "cancel", event.dialog).ai = function () {
							if (event.top[0].name == "du") return "cancel";
							return 0;
						};
						("step 1");
						if (result.control == "获得") {
							player.draw();
							event.finish();
						} else if (result.control == "替换") {
							player.chooseCard("选择一张牌置于牌堆顶", "h", true).ai = function (card) {
								if (_status.currentPhase == player) {
									if (player.hp <= player.maxHp / 2 && player.countCards("h", { type: "basic" })) {
										return get.type(card) == "basic";
									}
									if (player.hp > player.maxHp / 2 && player.countCards("h", { type: "trick" })) {
										return get.type(card) == "trick";
									}
								} else {
									return 15 - get.value(card);
								}
							};
						} else {
							event.finish();
						}
						("step 2");
						event.card = result.cards[0];
						if (!event.card) {
							event.finish();
							return;
						}
						// player.lose(event.card, ui.special);
						player.draw();
						("step 3");
						player.$throw(1, 1000);
						player.storage.jlsg_tianji_top = [event.card];
						player.lose(event.card, ui.cardPile, "insert");
						game.log(player, "将一张牌置于牌堆顶");
					},
				},
			},
			translate: {
				jlsg_tianqi_shan: "天启",
				jlsg_tianqi_wuxie: "天启",
				jlsg_tianqi_info: "你的濒死状态除外，每当你需要使用或打出一张基本牌或非延时锦囊牌时，你可以声明之，然后亮出牌堆顶的一张牌，并将此牌当你所述之牌使用或打出，若其与你所述之牌不为同一类别，你须先失去一点体力。（但出牌阶段仅限一次。）",
				jlsg_tianji_info: "任一角色的出牌阶段开始时，你可以观看牌堆顶的一张牌，然后你可以选择一项：用一张手牌替换之；若你的手牌数不是全场最多的(或之一)，你可以获得之。",
			},
		},
	},
	jlsgsoul_zhugeliang: {
		1: {
			skill: {
				jlsg_qixing: {
					audio: "ext:极略/audio/skill:1",
					trigger: {
						global: "phaseBefore",
						player: "enterGame",
					},
					forced: true,
					marktext: "星",
					filter: function (event, player) {
						return event.name != "phase" || game.phaseNumber == 0;
					},
					content: function () {
						"step 0";
						player.gain(get.cards(7))._triggered = null;
						("step 1");
						if (player == game.me) {
							game.addVideo("delay", null);
						}
						player.chooseCard("选择七张牌作为「星」", 7, true).ai = function (card) {
							return get.value(card);
						};
						("step 2");
						player.addToExpansion(result.cards, player, "giveAuto").gaintag.add(event.name);
					},
					mark: true,
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
						content: function (content, player) {
							var content = player.getExpansions("jlsg_qixing");
							if (content && content.length) {
								if (player == game.me || player.isUnderControl()) {
									return get.translation(content);
								}
								return "共有" + get.cnNumber(content.length) + "张「星」";
							}
						},
					},
					group: ["jlsg_qixing2"],
				},
				jlsg_qixing2: {
					trigger: { player: "phaseDrawAfter" },
					audio: "ext:极略/audio/skill:true",
					direct: true,
					filter: function (event, player) {
						return player.getExpansions("jlsg_qixing").length;
					},
					content: function () {
						"step 0";
						player.chooseCard(get.prompt("jlsg_qixing"), [1, 3]).ai = function (card) {
							return 1;
						};
						("step 1");
						if (result.bool) {
							player.logSkill("jlsg_qixing");
							player.addToExpansion(result.cards, player, "giveAuto").gaintag.add("jlsg_qixing");
							event.num = result.cards.length;
						} else {
							event.finish();
						}
						("step 2");
						player.chooseCardButton(player.getExpansions("jlsg_qixing"), "选择1-2张牌作为手牌", [1, 2], true).ai = function (button) {
							if (player.skipList.includes("phaseUse") && button.link != "du") {
								return -get.value(button.link);
							}
							return get.value(button.link);
						};
						if (player == game.me && _status.auto) {
							game.delay(0.5);
						}
						("step 3");
						//  player.gain(result.links)._triggered=null;
						player.gain(result.links)._triggered = null;
						player.syncStorage("jlsg_qixing");
						if (player == game.me && _status.auto) {
							game.delay(0.5);
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
					content: function () {
						"step 0";
						var clearKuangfeng = jlsg.findPlayerBySkillName("jlsg_kuangfeng2");
						if (clearKuangfeng) {
							clearKuangfeng.removeSkill("jlsg_kuangfeng2");
							clearKuangfeng.popup("jlsg_kuangfeng2");
						}
						player.chooseTarget("选择一名角色获得狂风标记").ai = function (target) {
							if (player.getExpansions("jlsg_qixing").length > 3) return jlsg.isWeak(target) && jlsg.isEnemy(player, target);
							return -1;
						};
						("step 1");
						if (result.bool) {
							result.targets[0].addSkill("jlsg_kuangfeng2");
							result.targets[0].popup("jlsg_kuangfeng");
							player.logSkill("jlsg_kuangfeng", result.targets, "fire");
							player.chooseCardButton("弃置1枚「星」", player.getExpansions("jlsg_qixing"), true);
						} else {
							event.finish();
						}
						("step 2");
						player.discard(result.links);
					},
				},
				jlsg_kuangfeng2: {
					unique: true,
					charlotte: true,
					trigger: { player: "damageBegin1" },
					mark: true,
					marktext: "风",
					intro: {
						content: "已获得「风」标记",
					},
					forced: true,
					content: function () {
						var jlsg_zhugeliang = jlsg.findPlayerBySkillName("jlsg_kuangfeng");
						if (jlsg_zhugeliang) {
							if (trigger.nature) {
								if (trigger.nature == "fire") {
									jlsg_zhugeliang.line(player, "fire");
									trigger.num++;
								}
								if (trigger.nature == "thunder") {
									jlsg_zhugeliang.line(player, "thunder");
									player.chooseToDiscard(2, true);
								}
							} else {
								if (jlsg_zhugeliang && jlsg_zhugeliang.getExpansions("jlsg_qixing")) {
									jlsg_zhugeliang.line(player, "water");
									var card = get.cards();
									jlsg_zhugeliang.addToExpansion(card, jlsg_zhugeliang, "draw").gaintag.add("jlsg_qixing");
									game.log(jlsg_zhugeliang, "将牌堆顶的一张牌置入「星」");
								}
							}
						}
					},
					ai: {
						threaten: 3,
						effect: {
							target: function (card, player, target, current) {
								if (get.tag(card, "fireDamage")) return 1.5;
								if (get.tag(card, "thunderDamage")) return 1.5;
							},
						},
					},
				},
				jlsg_dawu: {
					trigger: { player: "phaseJieshuBegin" },
					priority: 1,
					direct: true,
					filter: function (event, player) {
						return player.getExpansions("jlsg_qixing").length;
					},
					audio: "ext:极略/audio/skill:2",
					content: function () {
						"step 0";
						player.chooseTarget("选择角色获得大雾标记", [1, Math.min(game.players.length, player.getExpansions("jlsg_qixing").length)]).ai = function (target) {
							if (target.isMin()) return 0;
							if (target.hasSkill("biantian2")) return 0;
							var att = get.attitude(player, target);
							if (att >= 4) {
								if (target.hp == 1 && target.maxHp > 2) return att;
								if (target.hp == 2 && target.maxHp > 3 && target.countCards("he") == 0) return att * 0.7;
								if (jlsg.isWeak(target)) return att * 1.1;
								return 0;
							}
							return -1;
						};
						("step 1");
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
						("step 2");
						player.discard(result.links);
					},
					group: ["jlsg_dawu_remove"],
					subSkill: {
						remove: {
							trigger: { player: ["phaseBegin", "dieBegin"] },
							forced: true,
							charlotte: true,
							popup: false,
							silent: true,
							content: function () {
								for (var i = 0; i < game.players.length; i++) {
									if (game.players[i].hasSkill("jlsg_dawu2")) {
										game.players[i].removeSkill("jlsg_dawu2");
										game.players[i].popup("jlsg_dawu");
									}
									if (game.players[i].hasSkill("jlsg_kuangfeng2")) {
										game.players[i].removeSkill("jlsg_kuangfeng2");
										game.players[i].popup("jlsg_kuangfeng2");
									}
								}
							},
						},
					},
				},
				jlsg_dawu2: {
					trigger: { player: "damageBefore" },
					filter: function (event) {
						if (event.nature != "thunder") return true;
						return false;
					},
					marktext: "雾",
					mark: true,
					charlotte: true,
					forced: true,
					content: function () {
						trigger.cancel();
					},
					ai: {
						nofire: true,
						nodamage: true,
						effect: {
							target: function (card, player, target, current) {
								if (get.tag(card, "damage") && !get.tag(card, "thunderDamage")) return [0, 0];
							},
						},
					},
					intro: {
						content: "已获得大雾标记",
					},
				},
			},
			translate: {
				jlsg_qixing_info: "分发起始手牌时，你将获得起始手牌改为观看牌堆顶十一张牌并获得其中4张手牌，然后将其余7张牌扣置于武将牌上，称为「星」；摸牌阶段结束时，你可以用一-三张手牌来替换一-二枚「星」",
				jlsg_kuangfeng_info: "回合开始阶段开始时，你可以将一张「星」置入弃牌堆，然后选择一名角色获得一枚「风」标记，若如此做，当其于你的下回合开始前受到火焰伤害时，该伤害+1；雷电伤害时，你令其弃置两张牌；普通伤害时，你摸一张牌置入「星」。",
				jlsg_dawu_info: "回合结束阶段开始时，你可以弃掉至少一张「星」，然后选择等量的角色获得「雾」标记，若如此做，当其于你的下回合开始前受到非雷电伤害时，你防止之。",
			},
		},
	},
	jlsgsoul_ganning: {
		1: {
			skill: {
				jlsg_lvezhen: {
					shaRelated: true,
					audio: "ext:极略/audio/skill:2",
					trigger: { player: "shaBegin" },
					filter: function (event, player) {
						return event.target.countDiscardableCards(player, "he");
					},
					check: function (event, player) {
						return get.attitude(player, event.target) < 0;
					},
					content: function () {
						"step 0";
						event.cards = get.cards(3);
						game.cardsGotoOrdering(cards);
						player.showCards(event.cards);
						("step 1");
						event.numx = 0;
						for (var i = 0; i < event.cards.length; i++) {
							if (get.type(event.cards[i]) != "basic") event.numx++;
						}
						// player.$throw(event.cards);
						if (event.numx) {
							player.discardPlayerCard("请选择想要弃置的牌", trigger.target, [1, Math.min(event.numx, trigger.target.countDiscardableCards(player, "he"))], "he").set("forceAuto", true);
						}
					},
				},
				jlsg_youlong: {
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					mark: true,
					marktext: "游",
					intro: {
						content: function () {
							return "牌堆数" + ui.cardPile.childNodes.length + "张" + "||" + "弃牌数" + ui.discardPile.childNodes.length + "张";
						},
					},
					filterCard: function (card) {
						return get.color(card) == "black";
					},
					filter: function (event, player) {
						return ui.discardPile.childNodes.length > ui.cardPile.childNodes.length;
					},
					position: "hs",
					viewAs: { name: "shunshou" },
					viewAsFilter: function (player) {
						if (!player.countCards("hs", { color: "black" })) return false;
					},
					prompt: "将一张黑色手牌当顺手牵羊使用",
					check: function (card) {
						return 8 - get.value(card);
					},
					ai: {
						order: 9.5,
					},
				},
			},
			translate: {
				jlsg_lvezhen_info: "当你使用【杀】指定目标后，你可以将牌堆顶的3张牌置入弃牌堆，其中每有一张非基本牌，你弃置目标角色一张牌。",
				jlsg_youlong_info: "出牌阶段，若弃牌堆的牌数多于牌堆，你可以将黑色手牌当【顺手牵羊】使用。",
			},
		},
		2: {
			skill: {
				jlsg_lvezhen: {
					audio: "ext:极略/audio/skill:2",
					trigger: { player: "useCardToPlayered" },
					filter: function (event, player) {
						var phaseUse = _status.event.getParent("phaseUse");
						if (phaseUse.name != "phaseUse" || phaseUse.player != player) {
							return false;
						}
						return (event.card.name == "sha" || get.type2(event.card) == "trick") && event.targets.length == 1 && event.target.countGainableCards(player, "he") && !player.hasSkill("jlsg_lvezhen2");
					},
					content: function () {
						player.addTempSkill("jlsg_lvezhen2", "phaseUseAfter");
						var card = trigger.target.getGainableCards(player, "he").randomGet();
						player.gain(card, trigger.target, "giveAuto", "bySelf");
					},
				},
				jlsg_lvezhen2: {},
				jlsg_youlong: {
					audio: "ext:极略/audio/skill:2",
					forced: true,
					charlotte: true,
					trigger: { player: "showCharacterEnd" },
					delay: false,
					init: function (player) {
						if (player.hasSkill("jlsg_youlong")) {
							player.useSkill("jlsg_youlong");
						}
					},
					filter: function (event, player) {
						return !player.isTurnedOver();
					},
					content: function () {
						player.turnOver(true)._triggered = null;
					},
					group: ["jlsg_youlong2", "jlsg_youlong_guard"],
					subSkill: {
						guard: {
							silent: true,
							charlotte: true,
							trigger: { player: "turnOverBefore" },
							filter: function (event, player) {
								return player.isTurnedOver() && player.hasSkill("jlsg_youlong");
							},
							content: function () {
								trigger.cancel();
								game.log(player, "取消了翻面");
							},
						},
					},
					ai: {
						effect: {
							target: function (card, player, target, current) {
								if (get.type(card) == "delay") {
									return 0;
								}
							},
						},
					},
				},
				jlsg_youlong2: {
					audio: "jlsg_youlong",
					trigger: { global: "phaseEnd" },
					filter: function (event, player) {
						return player != event.player;
					},
					forced: true,
					content: function () {
						"step 0";
						player.draw();
						("step 1");
						var next = player.phaseUse();
						event.next.remove(next);
						trigger.next.push(next);
					},
				},
			},
			translate: {
				jlsg_lvezhen_info: "出牌阶段限一次，你使用【杀】或锦囊指定唯一目标后，可以随机获得其一张牌。",
				jlsg_youlong_info: "锁定技，你始终背面朝上。其他角色的回合结束时，你摸一张牌并执行一个额外的出牌阶段。",
			},
		},
	},
};
