import { lib, game, ui, get, ai, _status } from "../../../noname.js";
let old_jlsg_qs = {
	card: {},
	skill: {
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
		jlsgqs_mei_info: "出牌阶段，对一名角色使用。令其摸两张牌；若其体力值为1且已受伤，则改为回复1点体力。一名其他角色濒死时，对其使用，令其回复1点体力；若其因此脱离濒死状态，其摸一张牌。",
		jlsgqs_qingmeizhujiu_info: "出牌阶段对一名有手牌的其他角色使用，该角色展示一张手牌，然后你可以弃置一张点数大于此牌的手牌并回复一点体力，或者弃置一张点数不大于此牌的手牌令其回复一点体力",
		jlsgqs_wangmeizhike_info: "出牌阶段，对所有角色使用。每名目标角色：若体力值为1且已受伤，则回复1点体力；否则其摸两张牌",
	},
};
export default old_jlsg_qs;
