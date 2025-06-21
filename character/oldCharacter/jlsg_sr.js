import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsr_caocao: {
		1: {
			skill: {
				jlsg_zhaoxiang: {
					audio: "ext:极略/audio/skill:1",
					srlose: true,
					trigger: { global: "shaBegin" },
					filter: function (event, player) {
						return event.player != player;
					},
					direct: true,
					content: function () {
						"step 0";
						if (trigger.player.inRangeOf(player)) {
							var next = player.chooseBool(get.prompt("jlsg_zhaoxiang", trigger.player));
							next.ai = function () {
								return get.effect(trigger.target, trigger.card, trigger.player, player) < 0;
							};
						} else {
							if (!player.countDiscardableCards(player, "h")) {
								event.finish();
								return;
							}
							var next = player.chooseToDiscard(get.prompt("jlsg_zhaoxiang", trigger.player));
							next.ai = function (card) {
								const player = get.player(),
									trigger = get.event().getTrigger();
								var income = Math.min(-get.effect(trigger.target, trigger.card, trigger.player, player) * 1.5, get.effect(trigger.player, { name: "shunshou_copy2" }, player, player) / 1.5);
								return income - get.value(card);
							};
							next.logSkill = ["jlsg_zhaoxiang", trigger.player];
						}
						("step 1");
						if (result.bool) {
							if (!result.cards) {
								player.logSkill("jlsg_zhaoxiang", trigger.player);
							}
							if (trigger.player.countCards("he")) {
								trigger.player
									.chooseBool("令" + get.translation(player) + "获得你的一张牌或令打出的杀无效")
									.set("ai", function (event, player) {
										const trigger = event.getTrigger(),
											source = get.event("source");
										let num = trigger.targets.reduce((n, target) => n + get.effect(target, trigger.card, player, player), 0);
										return get.effect(player, { name: "shunshou_copy2" }, source, player) < num;
									})
									.set("source", player);
							} else {
								trigger.untrigger();
								trigger.finish();
								event.finish();
							}
						} else {
							event.finish();
						}
						("step 2");
						if (!result.bool) {
							trigger.untrigger();
							trigger.finish();
						} else {
							player.gainPlayerCard(trigger.player, true);
						}
					},
					ai: {
						expose: 0.5,
					},
				},
				jlsg_zhishi: {
					audio: "ext:极略/audio/skill:2",
					srlose: true,
					enable: "phaseUse",
					usable: 1,
					filterTarget: function (card, player, target) {
						return player != target;
					},
					content: function () {
						"step 0";
						if (!target.countDiscardableCards(target, "h")) {
							target.damage(player);
							target.recover();
							event.finish();
							return;
						}
						target.chooseToDiscard("弃置一张基本牌，并回复一点体力。或受到一点伤害并回复一点体力。", { type: "basic" }).ai = function (card) {
							if (target.hasSkillTag("maixie") && target.hp > 1) return 0;
							if (get.recoverEffect(target, target, target) > 0) return 7.5 - get.value(card);
							return -1;
						};
						("step 1");
						if (result.bool) {
							target.recover();
						} else {
							target.damage(player);
							target.recover();
						}
					},
					ai: {
						order: 8,
						result: {
							target: function (player, target) {
								var result = 0;
								if (target.hasSkillTag("maixie_hp") || target.hasSkillTag("maixie")) result += 0.5;
								if (target.hp == 1 && (target.countCards("h") <= 1 || target.maxHp == 1)) result -= 2;
								if (target.hp < target.maxHp) {
									result += Math.min(0.4, target.countCards("h") * 0.1);
								}
								// if (!target.isHealthy() && target.hasCard(function (card) {
								//   return get.type(card) == 'basic';
								// }, 'h')) return 0.6;
								// if (target.hp > 1) return 0.4;

								return result;
							},
						},
					},
				},
			},
			translate: {
				jlsg_zhaoxiang_info: "当一名其他角色使用【杀】指定目标后，你可以令其选择一项：1、交给你一张牌。2、令此【杀】对该目标无效；若其或【杀】的目标在你的攻击范围内，你须先弃置一张手牌。",
				jlsg_zhishi_info: "出牌阶段限一次，你可以令一名其他角色选择一项：1、弃置一张基本牌，然后回复一点。2、受到你造成的一点伤害，然后回复一点体力。",
			},
		},
	},
};
