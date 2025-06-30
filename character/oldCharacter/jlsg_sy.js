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
					filterTarget: function (card, player, target) {
						if (player == target || !target.countCards("h")) return false;
						if (ui.selected.targets.length) {
							return !target.hasSkillTag("noCompareTarget");
						} else {
							return !target.hasSkillTag("noCompareSource");
						}
					},
					filter: function (event, player) {
						return game.countPlayer(p => p != player && p.countCards("h")) >= 2;
					},
					multitarget: true,
					targetprompt: ["发起拼点", "被拼点"],
					selectTarget: 2,
					prompt: "选择两名拼点目标",
					content: function () {
						"step 0";
						targets[0].line(targets[1], "green");
						targets[0].chooseToCompare(targets[1]);
						("step 1");
						if (result.bool) {
							targets[0].useCard({ name: "juedou" }, targets[1]);
							if (targets[1].isAlive()) player.discardPlayerCard(targets[1], "he", 2, true);
						} else {
							targets[1].useCard({ name: "juedou" }, targets[0]);
							if (targets[0].isAlive()) player.discardPlayerCard(targets[0], "he", 2, true);
						}
					},
					ai: {
						order: 8,
						result: {
							target: function (player, target) {
								if (game.players.length <= 2) return 0;
								if (target.num("he") < 1) return 0;
								var att = ai.get.attitude(player, target);
								if (att < 0) return -target.num("he");
							},
						},
					},
				},
				jlsgsy_huoxin: {
					audio: "ext:极略/audio/skill:1", // audio: ['huoxin'],
					trigger: { source: "damageSource", player: "damageEnd" },
					unique: true,
					filter: function (event, player, name) {
						if (name == "damageSource") {
							return event.player && event.player != player && event.player.isAlive();
						} else {
							return event.source && event.source != player;
						}
					},
					check: function (event, player) {
						var target = event.player == player ? event.source : event.player;
						var att = get.attitude(player, target);
						return att < 0 || (att < 1 && target.countGainableCards(player, "e"));
					},
					logTarget: function (event, player) {
						if (event.player == player) return event.source;
						return event.player;
					},
					content: function () {
						"step 0";
						event.target = trigger.player == player ? trigger.source : trigger.player;
						if (!event.target.countCards("e")) {
							event.target.loseHp();
							event.finish();
							return;
						}
						event.target.chooseCard(`交给${get.translation(player)}一张装备区内的牌或者失去一点体力`, "e", function (card) {
							return get.type(card) == "equip";
						}).ai = function (card, cards2) {
							if (event.target.hp == event.target.maxHp) {
								return 6 - get.value(card);
							} else if (event.target.hp == 1) {
								return 12 - get.value(card);
							} else {
								return 7 - get.value(card);
							}
						};
						("step 1");
						if (result.bool) {
							player.gain(result.cards[0], event.target);
							event.target.$give(result.cards[0], player);
						} else {
							event.target.loseHp();
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
					trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
					direct: true,
					filter: function (event, player) {
						return game.hasPlayer(function (current) {
							if (!player.canUse(get.autoViewAs({ name: "sha" }, []), current, false)) return false;
							if (event.name == "phaseZhunbei") return current.countCards("h") < player.countCards("h");
							return current.countCards("h") > player.countCards("h");
						});
					},
					async content(event, trigger, player) {
						await player
							.chooseUseTarget(
								game.filterPlayer(function (current) {
									if (!player.canUse(get.autoViewAs({ name: "sha" }, []), current, false)) return false;
									if (event.name == "phaseZhunbei") return current.countCards("h") < player.countCards("h");
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
				jlsgsy_shiao_info: "回合开始阶段开始时，你可以视为对手牌数少于你的一名其他角色使用一张【杀】；回合结束阶段开始时你可以视为对手牌数大于你的一名其他角色使用一张【杀】",
			},
		},
	},
};
