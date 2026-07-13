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
	},
	translate: {
		jlsgqs_mei_info: "出牌阶段，对一名角色使用。令其摸两张牌；若其体力值为1且已受伤，则改为回复1点体力。一名其他角色濒死时，对其使用，令其回复1点体力；若其因此脱离濒死状态，其摸一张牌。",
	},
};
export default old_jlsg_qs;
