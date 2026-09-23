import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsy_caifuren: {
		xiaoas: {
			skill: {
				jlsgsy_luansi: {
					audio: "ext:极略/audio/skill:2", // audio: ['luansi', 2],
					enable: "phaseUse",
					usable: 1,
					unique: true,
					filterTarget(card, player, target) {
						if (player == target || !target.countCards("h")) {
							return false;
						}
						if (ui.selected.targets.length) {
							return !target.hasSkillTag("noCompareTarget");
						} else {
							return !target.hasSkillTag("noCompareSource");
						}
					},
					filter(event, player) {
						return game.countPlayer(p => p != player && p.countCards("h")) >= 2;
					},
					prompt: "选择两名拼点目标",
					selectTarget: 2,
					targetprompt: ["发起拼点", "被拼点"],
					multitarget: true,
					async content(event, trigger, player) {
						const [target1, target2] = event.targets;
						target1.line(target2, "green");
						const result = await target1.chooseToCompare(target2).forResult();
						const winner = result?.winner;
						const losers = event.targets.filter(target => target !== winner);
						if (winner?.isIn()) {
							const targets = losers.filter(target => winner.canUse("juedou", target));
							if (targets.length) {
								await winner.useCard({
									card: { name: "juedou", isCard: true },
									targets,
								});
							}
						}
						while (losers.length) {
							const target = losers.shift();
							if (target.hasDiscardableCards(player, "he")) {
								await player.discardPlayerCard({
									target,
									position: "he",
									selectButton: 2,
									forced: true,
								});
							}
						}
					},
					ai: {
						order: 8,
						result: {
							target(player, target) {
								if (game.players.length <= 2) {
									return 0;
								} else if (!target.hasDiscardableCards(player, "he")) {
									return 0;
								}
								const att = get.attitude(player, target);
								if (att < 0) {
									return -target.countDiscardableCards(player, "he");
								}
							},
						},
					},
				},
				jlsgsy_huoxin: {
					unique: true,
					audio: "ext:极略/audio/skill:1", // audio: ['huoxin'],
					trigger: {
						source: "damageSource",
						player: "damageEnd",
					},
					filter(event, player, name) {
						if (name == "damageSource") {
							return event.player && event.player != player && event.player.isAlive();
						} else {
							return event.source && event.source != player;
						}
					},
					check(event, player) {
						const target = event.player == player ? event.source : event.player;
						const att = get.attitude(player, target);
						return att < 0 || (att < 1 && target.countGainableCards(player, "e"));
					},
					logTarget(event, player) {
						if (event.player == player) {
							return event.source;
						}
						return event.player;
					},
					async content(event, trigger, player) {
						const [target] = event.targets;
						let result;
						if (!target.hasGainableCards(player, "e")) {
							result = { bool: false };
						} else {
							result = await target
								.chooseToGive({
									target: player,
									position: "e",
									ai(card) {
										const { check, player } = get.event();
										if (check) {
											return 0;
										}
										return get.unuseful2(card);
									},
									check: get.effect(target, { name: "losehp" }, player, player) >= 0,
								})
								.forResult();
						}
						if (!result?.bool) {
							await target.loseHp(1);
						}
					},
					ai: {
						maixie_defend: true,
					},
				},
			},
			translate: {
				jlsgsy_luansi_info: "出牌阶段限一次，你可以令两名其他角色拼点，视为拼点赢的角色对没赢的角色使用一张【决斗】，然后你弃置拼点没赢的角色两张牌",
				jlsgsy_huoxin_info: "你对其他角色造成伤害，或受到其他角色造成的伤害后，你可令该角色交给你一张装备区内的装备牌 ，或者失去一点体力。",
			},
		},
	},
	jlsgsy_weiyan: {
		1: {
			skill: {
				jlsgsy_shiao: {
					audio: ["ext:极略/audio/skill/jlsgsy_shiao2.mp3", "ext:极略/audio/skill:true"],
					trigger: {
						player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
					},
					direct: true,
					filter(event, player) {
						return game.hasPlayer(function (current) {
							if (!player.canUse(get.autoViewAs({ name: "sha" }, []), current, false)) {
								return false;
							}
							if (event.name == "phaseZhunbei") {
								return current.countCards("h") < player.countCards("h");
							}
							return current.countCards("h") > player.countCards("h");
						});
					},
					async content(event, trigger, player) {
						await player
							.chooseUseTarget(
								game.filterPlayer(function (current) {
									if (!player.canUse(get.autoViewAs({ name: "sha" }, []), current, false)) {
										return false;
									}
									if (event.name == "phaseZhunbei") {
										return current.countCards("h") < player.countCards("h");
									}
									return current.countCards("h") > player.countCards("h");
								}),
								`###是否发动【恃傲】？###视为对一名手牌${trigger.name == "phaseZhunbei" ? "小于" : "大于"}你的角色使用一张【杀】`,
								get.autoViewAs({ name: "sha" }, []),
								false,
								"nodistance"
							)
							.set("logSkill", "jlsgsy_shiao");
					},
				},
			},
			translate: {
				jlsgsy_shiao_info: "准备阶段开始时，你可以视为对手牌数少于你的一名其他角色使用一张【杀】；结束阶段开始时你可以视为对手牌数大于你的一名其他角色使用一张【杀】",
			},
		},
	},
};
