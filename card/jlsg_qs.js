import { lib, game, ui, get, ai, _status } from "../../../noname.js";
let jlsg_qs = {
	name: "jlsg_qs",
	connect: true,
	card: {
		jlsgqs_kongmingdeng: {
			recastable: true,
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			skills: ["jlsgqs_kongmingdeng_skill"],
			async onEquip(event, trgger, player) {
				await player.recover({ num: 1, nocard: true });
			},
			ai: {
				basic: {
					equipValue: 8,
				},
			},
		},
		jlsgqs_muniu: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			recastable: true,
			skills: ["jlsgqs_muniu_skill"],
			forceDie: true,
			onLose: async function (event, trigger, player) {
				const { card } = event;
				if (!player.countVCards("e", i => i.name === "jlsgqs_muniu")) {
					player.unmarkSkill("jlsgqs_muniu_skill");
				} else {
					player.markSkill("jlsgqs_muniu_skill");
				}
				if (card?.storage?.["jlsgqs_muniu"]?.length) {
					const cards = card?.storage?.["jlsgqs_muniu"].filter(card => get.position(card) == "c");
					if (cards.length) {
						player.logSkill("jlsgqs_muniu_skill");
						game.log(player, `从牌堆底获得了${get.cnNumber(cards.length)}张牌`);
						await player.gain({ cards, animate: "draw" });
					}
					delete card.storage["jlsgqs_muniu"];
					player.markSkill("jlsgqs_muniu_skill");
				}
			},
			clearLose: true,
			equipDelay: false,
			loseDelay: false,
			ai: {
				basic: {
					equipValue(card, player) {
						if (player.countCards("h", { type: "basic" }) < 1) {
							return 5;
						}
						return 3;
					},
				},
			},
		},
		jlsgqs_yuxi: {
			fullskin: true,
			type: "equip",
			recastable: true,
			subtype: "equip5",
			skills: ["jlsgqs_yuxi_skill", "jlsgqs_yuxi_skill_give"],
			ai: {
				basic: {
					equipValue: 9,
				},
			},
		},
		jlsgqs_taipingyaoshu: {
			fullskin: true,
			type: "equip",
			recastable: true,
			subtype: "equip5",
			enable: true,
			skills: ["jlsgqs_taipingyaoshu_skill"],
			ai: {
				basic: {
					equipValue(card, player) {
						if (player.countCards("h", { color: "red" }) < 1) {
							return 1;
						}
						return 6;
					},
				},
			},
		},
		jlsgqs_dunjiatianshu: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			recastable: true,
			skills: ["jlsgqs_dunjiatianshu_skill"],
			ai: {
				basic: { equipValue: 7 },
			},
		},
		jlsgqs_qixingbaodao: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			recastable: true,
			skills: ["jlsgqs_qixingbaodao_skill"],
			ai: {
				basic: { equipValue: 4 },
			},
		},
		jlsgqs_xiujian: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			skills: ["jlsgqs_xiujian_skill"],
			recastable: true,
			loseDelay: false,
			onLose: async function (event, trigger, player) {
				player.addTempSkill("jlsgqs_xiujian_skill_lose");
			},
			ai: {
				order: 9.5,
				basic: {
					equipValue: 6,
				},
			},
		},
		jlsgqs_jinnangdai: {
			fullskin: true,
			type: "equip",
			subtype: "equip5",
			skills: ["jlsgqs_jinnangdai_skill"],
			recastable: true,
			loseDelay: false,
			ai: {
				basic: { equipValue: 4 },
			},
		},
		jlsgqs_qingmeizhujiu: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			selectTarget: 1,
			filterTarget(card, player, target) {
				return player != target;
			},
			async content(event, trigger, player) {
				const target = event.target;
				if (player.hp > target.hp) {
					await player.draw(2);
					if (target.isDamaged()) {
						await target.recover();
					}
				} else if (player.hp < target.hp) {
					await target.draw(2);
					if (player.isDamaged()) {
						await player.recover();
					}
				}
			},
			ai: {
				basic: {
					order: 4,
					useful: [2, 1],
					value: 1,
				},
				wuxie(target, card, player, viewer, state) {
					let eff = get.effect(target, card, player, viewer);
					if (eff * state > 0) {
						return 0;
					}
				},
				result: {
					player(player, target) {
						let num = 0,
							att = get.attitude(player, player);
						if (player.hp > target.hp && !player.hasSkillTag("nogain")) {
							num += get.effect(player, { name: "draw" }, player, player) / att;
						} else if (player.hp < target.hp) {
							num += get.recoverEffect(player, player, player) / att;
						}
						return num;
					},
					target(player, target) {
						let num = 0,
							att = Math.abs(get.attitude(player, target)) || 1;
						if (player.hp > target.hp) {
							num += get.recoverEffect(target, player, target) / att;
						} else if (player.hp < target.hp && !target.hasSkillTag("nogain")) {
							num += get.effect(target, { name: "draw" }, player, target) / att;
						}
						return num;
					},
				},
				tag: {
					draw: 2,
					recover: 1,
				},
			},
		},
		jlsgqs_shuiyanqijun: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "delay",
			range: { attack: 1 },
			filterTarget(card, player, target) {
				return lib.filter.judge(card, player, target) && player != target;
			},
			judge(card) {
				if (get.suit(card) == "diamond") {
					return 2;
				}
				return -3;
			},
			judge2(result) {
				if (result.bool == false) {
					return true;
				}
				return false;
			},
			async effect(event, trigger, player, result) {
				if (!result.bool) {
					await player.modedDiscard({ cards: player.getCards("e") });
				}
			},
			ai: {
				basic: {
					order: 1,
					useful: 1,
					value: 7.5,
				},
				result: {
					target(player, target) {
						let eff = get.value(target.getDiscardableCards(target, "e"));
						return -eff / 10;
					},
				},
				tag: {
					discard: 1,
					loseCard: 1,
					position: "e",
				},
			},
		},
		jlsgqs_yuqingguzong: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			range: { attack: 1 },
			selectTarget: 1,
			filterTarget(card, player, target) {
				return target != player;
			},
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				if (target.hasSkill("jlsgqs_yuqingguzong_temp")) {
					target.removeSkill("jlsgqs_yuqingguzong_temp");
					await target.damage({ num: 2, nature: "fire" });
				} else {
					target.addSkill("jlsgqs_yuqingguzong_temp");
					await target.draw({ num: 1 });
				}
			},
			ai: {
				wuxie(target, card, player, viewer, state) {
					let eff = get.effect(target, card, player, viewer);
					if (eff * state > 0) {
						return 0;
					}
					if (target.hasSkill("jlsgqs_yuqingguzong_temp")) {
						if (target.hasSkillTag("nofire")) {
							return 0;
						} else if (target.hasSkillTag("nodamage")) {
							return 0;
						} else if (target.hasSkillTag("notrick")) {
							return 0;
						}
					}
				},
				basic: {
					order: 3,
					value: 5.5,
					useful: 1,
				},
				result: {
					target(player, target) {
						const att = Math.abs(get.attitude(player, target)) || 1,
							hsnum = player.countCards("hs", card => get.name(card) == "jlsgqs_yuqingguzong"),
							nodamage = target.hasSkillTag("nofire") || target.hasSkillTag("nodamage") || target.hasSkillTag("notrick");
						const draw = get.effect(target, { name: "draw" }, player, target) / att,
							damage = !nodamage ? get.damageEffect(target, player, target, "fire") / att : 0;
						if (!target.hasSkill("jlsgqs_yuqingguzong_temp")) {
							if (hsnum > 1 && (att < 0 || nodamage)) {
								return draw / 2 + damage;
							}
							return draw;
						}
						return damage;
					},
				},
				tag: {
					draw: 1,
					damage: 1,
					fireDamage: 1,
					natureDamage: 1,
				},
			},
		},
		jlsgqs_caochuanjiejian: {
			audio: "ext:极略/audio/card",
			fullskin: true,
			type: "trick",
			enable: true,
			selectTarget: -1,
			filterTarget(card, player, target) {
				return target != player;
			},
			modTarget: true,
			async content(event, trigger, player) {
				const target = event.target;
				const result = await target
					.chooseToUse(player, "草船借箭：对" + get.translation(player) + "使用一张杀，或令其获得你的一张牌")
					.set("filterCard", (card, player) => {
						if (get.name(card, player) != "sha") {
							return false;
						}
						return lib.filter.filterCard.apply(this, arguments);
					})
					.set("respondTo", [player, event.card])
					.set("targetRequired", true)
					.forResult();
				if (!result.bool && target.countGainableCards(player, "he") > 0) {
					await player.gainPlayerCard(target, "he", true);
				}
			},
			ai: {
				basic: {
					order: 6,
					useful: 3,
				},
				wuxie(target, card, player, viewer, state) {
					let eff = get.effect(target, card, player, viewer);
					if (eff * state > 0) {
						return 0;
					}
				},
				result: {
					target(player, target) {
						let att = Math.abs(get.attitude(player, target)) || 1,
							shunshou = get.effect(target, { name: "shunshou_copy2" }, player, target),
							sha = target.mayHaveSha(player, "use", null, "bool") && target.canUse("sha", player, false) ? get.effect(player, { name: "sha" }, target, target) : 0;
						if (sha != 0) {
							return sha / att;
						}
						return shunshou / att;
					},
				},
				tag: {
					respond: 1,
					respondSha: 1,
					multitarget: 1,
					multineg: 1,
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
					await target.recover(2);
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
				wuxie(target, card, player, viewer, state) {
					let eff = get.effect(target, card, player, viewer);
					if (eff * state > 0) {
						return 0;
					}
					return 1;
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
					recover: 2,
					multitarget: 1,
				},
			},
		},
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
				if (target.hasSkill("jlsgqs_mei_temp")) {
					await target.draw("nodelay");
				} else if (target.isDying()) {
					await target.recover(1);
				} else if (target.getHp() == 1 && target.isDamaged()) {
					await target.recover(2);
				} else {
					await target.draw(3, "nodelay");
					target.addTempSkill("jlsgqs_mei_temp");
				}
			},
			ai: {
				basic: {
					order(card, player) {
						return get.order({ name: "tao" }, player) + 0.5;
					},
					useful: [8, 6.5],
					value: [8, 6.5],
				},
				result: {
					target(player, target) {
						if (target.hp == target.maxHp && target.hp == 1) {
							return 0;
						}
						let nh = target.countCards("h");
						let keep = false;
						if (nh <= target.hp) {
							keep = true;
						} else if (nh == target.hp + 1 && target.hp >= 2 && target.countCards("h", "tao") <= 1) {
							keep = true;
						}
						let mode = get.mode();
						if (target.hp >= 2 && keep && target.hasFriend()) {
							if (target.hp > 2) {
								return 0;
							}
							if (target.hp == 2) {
								for (let i = 0; i < game.players.length; i++) {
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
						let att = get.attitude(player, target);
						if (att < 3 && att >= 0 && player != target) {
							return 0;
						}
						let tri = _status.event.getTrigger();
						if (tri?.name == "dying") {
							if (target.hasSkill("jlsgqs_mei_temp")) {
								return att / 10;
							}
						}
						if (mode == "identity" && player.identity == "fan" && target.identity == "fan") {
							if (tri && tri.name == "dying" && tri.source && tri.source.identity == "fan" && tri.source != target) {
								let num = 0;
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
					recover: 2,
					save: 1,
				},
			},
		},
	},
	skill: {
		jlsgqs_yuqingguzong_temp: {
			charlotte: true,
			mark: "true",
			markimage2: true,
			intro: {
				nocount: true,
				mark(dialog, storage, player) {
					dialog.addText("下次受到【欲擒故纵】的效果改为受到两点火焰伤害");
				},
			},
		},
		jlsgqs_mei_temp: {
			charlotte: true,
			mark: "true",
			markimage2: true,
			intro: {
				nocount: true,
				mark(dialog, storage, player) {
					dialog.addText("本回合受到【梅】的效果改为摸一张牌");
				},
			},
		},
		jlsgqs_kongmingdeng_skill: {
			equipSkill: true,
			popname: true,
			enable: ["chooseToUse", "chooseToRespond"],
			viewAs: { name: "tao" },
			viewAsFilter(player) {
				return player.countVCards("e", "jlsgqs_kongmingdeng") != 0 && _status.event.type == "dying";
			},
			selectCard: 1,
			position: "e",
			filterCard(card, player) {
				return card.name == "jlsgqs_kongmingdeng";
			},
			check: () => true,
			prompt: "将孔明灯当【桃】使用",
			ai: {
				threaten: 1.5,
				save: true,
				skillTagFilter(player) {
					return player.countVCards("e", "jlsgqs_kongmingdeng");
				},
			},
		},
		jlsgqs_muniu_skill: {
			equipSkill: true,
			mark: true,
			markimage2: true,
			intro: {
				content(storage, player) {
					const munius = player.getVCards("e", card => card.name === "jlsgqs_muniu");
					let cards = [];
					for (const muniu of munius) {
						if (muniu?.storage?.["jlsgqs_muniu"]?.length) {
							cards.addArray(muniu.storage?.["jlsgqs_muniu"]);
						}
					}
					if (!cards.length) {
						return "共有零张牌";
					}
					if (player.isUnderControl(true)) {
						return get.translation(cards);
					}
					return `共有${get.cnNumber(cards.length)}张牌`;
				},
				mark(dialog, storage, player) {
					const munius = player.getVCards("e", card => card.name === "jlsgqs_muniu");
					let cards = [];
					for (const muniu of munius) {
						if (muniu?.storage?.["jlsgqs_muniu"]?.length) {
							cards.addArray(muniu.storage?.["jlsgqs_muniu"]);
						}
					}
					if (!cards.length) {
						return "共有零张牌";
					}
					if (player.isUnderControl(true)) {
						dialog.addAuto(cards);
						return;
					}
					return `共有${get.cnNumber(cards.length)}张牌`;
				},
				markcount(storage, player) {
					const munius = player.getVCards("e", card => card.name === "jlsgqs_muniu");
					let cards = [];
					for (const muniu of munius) {
						if (muniu?.storage?.["jlsgqs_muniu"]?.length) {
							cards.addArray(muniu.storage?.["jlsgqs_muniu"]);
						}
					}
					return cards.length;
				},
			},
			trigger: {
				player: "drawAfter",
			},
			filter(event, player) {
				const vcards = player.getVCards("e", vcard => vcard.name == "jlsgqs_muniu");
				if (!vcards.some(vcard => !player.hasStorage("jlsgqs_muniu_skill_use", vcard))) {
					return false;
				}
				return event.result.cards?.length && player.hasCards("he", card => event.result.cards.includes(card));
			},
			async cost(event, trigger, player) {
				let result = await player
					.chooseCardTarget({
						prompt: `木牛流马：是否将一张摸到的牌交给其他角色，或选择自己将之置于牌堆底？`,
						prompt2: "当你失去装备区的【木牛流马】后，你从牌堆底获得以此法置于牌堆底的牌",
						selectCard: [1, 1],
						filterCard(card, player) {
							return get.event().draw?.includes(card);
						},
						selectTarget: [1, 1],
						ai1(card) {
							return 8 - get.value(card);
						},
						ai2(target) {
							const att = Math.max(-5, Math.min(5, get.attitude(get.player(), target)));
							return (target.getUseValue(card) + 0.1) * att;
						},
						draw: trigger.result.cards,
					})
					.forResult();
				if (!result?.bool || !result.cards?.length || !result.targets?.length) {
					return;
				}
				event.result = result;
				const vcards = player
					.getVCards("e", vcard => {
						return vcard.name == "jlsgqs_muniu" && !player.hasStorage(`${event.skill}_use`, vcard);
					})
					.map(vcard => {
						return [vcard.number || 0, get.translation(vcard.suit), vcard.name, null, undefined, vcard];
					});
				if (vcards.length == 1) {
					result = { bool: true, links: [vcards[0][5]] };
				} else {
					result = await player
						.chooseButton({
							createDialog: ["请选择你要触发的【木牛流马】", [vcards, get.info(event.skill).$createButton]],
							selectButton: [1, 1],
							forced: true,
						})
						.forResult();
				}
				if (!result?.bool || !result.links?.length) {
					return;
				}
				event.result.cost_data = { vcard: result.links[0] };
			},
			async content(event, trigger, player) {
				const {
					targets: [target],
					cost_data: { vcard },
				} = event;
				player.addTempSkill(`${event.name}_use`);
				player.markAuto(`${event.name}_use`, [vcard]);
				if (target == player) {
					game.log(player, "将", event.cards, "置于牌堆底");
					await player.lose({
						source: player,
						cards: event.cards,
						position: ui.cardPile,
					});
					if (!vcard || !event.cards.length) {
						game.broadcastAll(cards => {
							for (const card of cards) {
								card.discard();
							}
						}, event.cards);
						event.finish();
						return;
					}
					game.broadcastAll(
						(vcard, cards) => {
							vcard.storage ??= {};
							vcard.storage["jlsgqs_muniu"] ??= [];
							vcard.storage["jlsgqs_muniu"].addArray(cards);
						},
						vcard,
						event.cards
					);
					player.markSkill(event.name);
					console.log(vcard);
					await game.delayx();
				} else {
					await player.give(cards, target);
				}
			},
			$createButton(item, type, position, noclick, node) {
				const vcard = item[5];
				node = ui.create.buttonPresets["vcard"](...arguments);
				const num = vcard?.storage?.["jlsgqs_muniu"]?.length || 0;
				node.node.gaintag.innerHTML = `${get.cnNumber(num)}牌`;
				node._number = num;
				node.link = vcard;
				node._customintro = (uiintro, evt) => {
					uiintro.add("木牛流马");
					let str = "此牌下没有扣置牌";
					if (node.link?.storage?.["jlsgqs_muniu"]?.length) {
						str = "此牌下扣置了";
					}
					uiintro.add(`<div class="text" style="display:inline">${str}</div>`);
					if (node.link?.storage?.["jlsgqs_muniu"]?.length) {
						uiintro.addSmall(node.link?.storage?.["jlsgqs_muniu"]);
					}
					return node;
				};
				return node;
			},
			subSkill: {
				use: { onremove: true },
			},
		},
		jlsgqs_yuxi_skill: {
			equipSkill: true,
			mod: {
				maxHandcard(player, num) {
					return num + 2;
				},
			},
			trigger: { player: "phaseBegin" },
			forced: true,
			async content(event, trigger, player) {
				await player.draw(1);
			},
		},
		jlsgqs_yuxi_skill_give: {
			equipSkill: true,
			trigger: { target: "shaHit" },
			getIndex(event, player) {
				return player.getVEquips("jlsgqs_yuxi");
			},
			filter(event, player, name, card) {
				if (player == event.player) {
					return false;
				}
				if (!event.player.isIn()) {
					return false;
				}
				return card?.name == "jlsgqs_yuxi";
			},
			async cost(event, trigger, player) {
				const vcard = event.indexedData;
				event.result = await trigger.player
					.chooseBool()
					.set("createDialog", ["是否获得【玉玺】", vcard.cards.length ? vcard.cards : "虚拟牌"])
					.set("ai", (event, player) => get.attitude(player, event.player) < 0)
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { vcard };
				}
			},
			popup: false,
			async content(event, trigger, player) {
				const vcard = event.cost_data.vcard;
				if (vcard.cards?.length) {
					await trigger.player.gain(player, vcard.cards, "giveAuto", "log");
				}
				game.broadcastAll(
					function (player, vcard) {
						const cards = player.vcardsMap?.equips;
						if (cards && cards.includes(vcard)) {
							cards.remove(vcard);
						}
					},
					player,
					vcard
				);
				const cards = player.vcardsMap?.equips;
				if (!cards?.filter(card => card.name == "jlsgqs_yuxi")?.length) {
					player.removeEquipTrigger(vcard, true);
				}
				player.$handleEquipChange();
			},
		},
		jlsgqs_taipingyaoshu_skill: {
			equipSkill: true,
			trigger: {
				player: "damageBegin4",
			},
			getIndex(event, player) {
				return player.getVCards("e", card => card.name == "jlsgqs_taipingyaoshu");
			},
			filter(event, player, name, vcard) {
				return game.hasNature(event) && !player.hasStorage("jlsgqs_taipingyaoshu_skill_use", vcard);
			},
			forced: true,
			async content(event, trigger, player) {
				trigger.cancel();
				player.addTempSkill(`${event.name}_use`);
				player.markAuto(`${event.name}_use`, [event.indexedData]);
			},
			subSkill: {
				use: { onremove: true },
			},
			ai: {
				nofire: true,
				nothunder: true,
				skillTagFilter(player, tag, arg) {
					return !player.getState()?.["triggrSkill"]?.["jlsgqs_taipingyaoshu_skill"];
				},
				effect: {
					target(card, player, target) {
						if (!target.getState()?.["triggrSkill"]?.["jlsgqs_taipingyaoshu_skill"]) {
							if (get.tag(card, "natureDamage")) {
								return "zeroplayertarget";
							}
						}
					},
				},
			},
		},
		jlsgqs_dunjiatianshu_skill: {
			equipSkill: true,
			mod: {
				globalTo(from, to, distance) {
					const e1 = to.getVEquips(3),
						e2 = to.getVEquips(4);
					if (!e1.length && !e2.length) {
						return distance + 1;
					}
				},
				globalFrom(from, to, distance) {
					const e1 = from.getVEquips(3),
						e2 = from.getVEquips(4);
					if (!e1.length && !e2.length) {
						return distance - 1;
					}
				},
				maxHandcard(player, num) {
					const e1 = player.getVEquips(3),
						e2 = player.getVEquips(4);
					if (e1.length || e2.length) {
						return num + 1;
					}
				},
			},
		},
		jlsgqs_qixingbaodao_skill: {
			equipSkill: true,
			trigger: { player: "shaMiss" },
			getIndex(event, player) {
				return player.getVEquips("jlsgqs_qixingbaodao");
			},
			filter(event, player, name, card) {
				if (card?.name != "jlsgqs_qixingbaodao") {
					return false;
				}
				return event.target?.countGainableCards(player, "e");
			},
			async cost(event, trigger, player) {
				const vcard = event.indexedData;
				event.result = await player
					.chooseBool()
					.set("createDialog", ["是否发动【七星宝刀】", vcard.cards.length ? vcard.cards : "虚拟牌"])
					.set("ai", (event, player) => {
						const { target } = get.event(),
							{ indexedData: vcard } = event;
						const es = target.getGainableCards(player, "e");
						return es.some(card => {
							if (vcard.cards?.length) {
								return get.value(vcard.cards, player) <= get.value(card, player);
							}
							return true;
						});
					})
					.set("target", trigger.target)
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { vcard };
				}
			},
			async content(event, trigger, player) {
				const vcard = event.cost_data.vcard;
				if (vcard.cards?.length) {
					await player.give(vcard.cards, trigger.target, true);
				}
				game.broadcastAll(
					function (player, vcard) {
						const cards = player.vcardsMap?.equips;
						if (cards && cards.includes(vcard)) {
							cards.remove(vcard);
						}
					},
					player,
					vcard
				);
				const cards = player.vcardsMap?.equips;
				if (!cards?.filter(card => card.name == "jlsgqs_qixingbaodao")?.length) {
					player.removeEquipTrigger(vcard, true);
				}
				player.$handleEquipChange();
				if (trigger.target.countGainableCards(player, "e")) {
					await player.gainPlayerCard("e", trigger.target, true);
				}
			},
		},
		jlsgqs_xiujian_skill: {
			equipSkill: true,
			trigger: { player: "phaseBegin" },
			getIndex(event, player) {
				return player.getVEquips("jlsgqs_xiujian");
			},
			filter(event, player, triggername, card) {
				return card?.name == "jlsgqs_xiujian";
			},
			async cost(event, trigger, player) {
				const vcard = event.indexedData;
				event.result = await player
					.chooseTarget((card, player, target) => player != target)
					.set("createDialog", ["是否发动【袖箭】", vcard.cards.length ? vcard.cards : "虚拟牌"])
					.set("ai", function (target) {
						return get.damageEffect(target, get.player(), get.player());
					})
					.forResult();
				if (event.result?.bool) {
					event.result.cost_data = { vcard };
				}
			},
			async content(event, trigger, player) {
				const target = event.targets[0],
					vcard = event.cost_data.vcard;
				if (vcard.cards?.length) {
					await player.discard(vcard.cards);
				}
				game.broadcastAll(
					function (player, vcard) {
						const cards = player.vcardsMap?.equips;
						if (cards && cards.includes(vcard)) {
							cards.remove(vcard);
						}
					},
					player,
					vcard
				);
				const cards = player.vcardsMap?.equips;
				if (!cards?.filter(card => card.name == "jlsgqs_xiujian")?.length) {
					player.removeEquipTrigger(vcard, true);
				}
				player.$handleEquipChange();
				await target.damage(1, player);
			},
		},
		jlsgqs_xiujian_skill_lose: {
			equipSkill: true,
			charlotte: true,
			audio: false,
			trigger: {
				player: "loseAfter",
				global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
			},
			filter(event, player, name, card) {
				return card?.name == "jlsgqs_xiujian";
			},
			getIndex(event, player) {
				const evt = event.getl(player);
				const lostCards = [];
				evt.es.forEach(card => {
					const VEquip = evt.vcard_map.get(card);
					if (VEquip?.name === "jlsgqs_xiujian") {
						lostCards.add(VEquip);
					}
				});
				return lostCards;
			},
			forced: true,
			async content(event, trigger, player) {
				await player.draw(1);
			},
			sub: true,
			sourceSkill: "jlsgqs_xiujian_skill",
			priority: -25,
		},
		jlsgqs_jinnangdai_skill: {
			equipSkill: true,
			trigger: {
				global: "phaseEnd",
			},
			getIndex(event, player) {
				return player.getVCards("e", card => card.name == "jlsgqs_jinnangdai");
			},
			filter(event, player, name, vcard) {
				return !player.hasCards("h", card => get.type2(card) == "trick") && !player.hasStorage("jlsgqs_jinnangdai_skill_use", vcard);
			},
			forced: true,
			async content(event, trigger, player) {
				await player.draw({ num: 1, nodelay: true });
				player.addTempSkill(`${event.name}_use`);
				player.markAuto(`${event.name}_use`, [event.indexedData]);
			},
			subSkill: {
				use: { onremove: true },
			},
		},
		jlsgqs_shuiyanqijun_skill: {
			cardSkill: true,
			charlotte: true,
			hidden: true,
			audio: "ext:极略/audio/card:1",
			trigger: { player: "phaseUseBegin" },
			forced: true,
			async content(event, trigger, player) {
				let num = Math.ceil(player.countDiscardableCards(player, "h") / 2);
				await player.chooseToDiscard(num, "h", true);
			},
		},
	},
	translate: {
		jlsg_qs: "七杀包",
		jlsgqs_kongmingdeng: "孔明灯",
		jlsgqs_kongmingdeng_info: "锁定技，当此牌置入你的装备区后，你回复1点体力。任意角色处于濒死状态时，你可以将你装备区的【孔明灯】当【桃】使用。",
		jlsgqs_muniu: "木牛流马",
		jlsgqs_muniu_info: "每回合限一次，当你摸牌后，你可以将一张牌交给其他角色或置于牌堆底，然后摸一张牌。锁定技，当你从装备区里失去此牌后，你获得所有以此法置于牌堆底的牌。",
		jlsgqs_taipingyaoshu: "太平要术",
		jlsgqs_taipingyaoshu_info: "锁定技，每回合限一次，防止你受到的属性伤害。",
		jlsgqs_dunjiatianshu: "遁甲天书",
		jlsgqs_dunjiatianshu_info: "锁定技，若你的装备区没有坐骑牌，其他角色计算与你的距离时，始终+1，你计算与其他角色的距离时，始终-1；锁定技，若你的装备区有坐骑牌，你的手牌上限+1。",
		jlsgqs_qixingbaodao: "七星宝刀",
		jlsgqs_qixingbaodao_info: "当你使用的【杀】被目标角色的【闪】响应后，你可以将装备区的【七星宝刀】交给该名角色，然后获得其装备区的一张牌。",
		jlsgqs_xiujian: "袖箭",
		jlsgqs_xiujian_info: "准备阶段开始时，你可以弃置你装备区中的【袖箭】，然后对一名其他角色造成一点伤害；锁定技，当你从装备区失去【袖箭】时，你摸一张牌。",
		jlsgqs_yuxi: "玉玺",
		jlsgqs_yuxi_info: "锁定技，你的手牌上限+2，准备阶段开始时，你摸一张牌；一名角色使用【杀】对你造成伤害时，可获得你装备区中的【玉玺】。",
		jlsgqs_jinnangdai: "锦囊袋",
		jlsgqs_jinnangdai_info: "锁定技，任意角色的回合结束时，若你没有锦囊牌，你从牌堆获得一张锦囊牌。",
		jlsgqs_qingmeizhujiu: "青梅煮酒",
		jlsgqs_qingmeizhujiu_info: "出牌阶段对一名其他角色使用，你与目标角色中手牌数较少的角色摸两张牌，体力较少的角色回复1点体力。",
		jlsgqs_shuiyanqijun: "水淹七军",
		jlsgqs_shuiyanqijun_info: "出牌阶段，对你攻击范围内的一名其他角色使用。若判定结果不为方片，则该角色若结果不为方片，其弃置装备区里的所有牌。",
		jlsgqs_yuqingguzong: "欲擒故纵",
		jlsgqs_yuqingguzong_info: "出牌阶段，对一名其他角色使用。你令目标角色摸一张牌，然后令其下一次受到【欲擒故纵】的效果改为受到2点火焰伤害。",
		jlsgqs_caochuanjiejian: "草船借箭",
		jlsgqs_caochuanjiejian_info: "出牌阶段，对除你以外的所有角色使用。每名目标角色须依次选择一项：对你使用一张【杀】；或令你获得其一张牌。",
		jlsgqs_wangmeizhike: "望梅止渴",
		jlsgqs_wangmeizhike_info: "出牌阶段，对所有角色使用。每名目标角色：若体力值为1且已受伤，则回复2点体力；否则其摸两张牌。",
		jlsgqs_mei: "梅",
		jlsgqs_mei_info: "出牌阶段，对一名角色使用。若目标角色的体力为1点，回复2点体力，否则摸三张牌，然后你令目标角色本回合再次受到的【梅】的效果时改为摸一张牌。一名其他角色濒死时，对其使用，令其回复1点体力。",
	},
	list: [
		["spade", 4, "sha"],
		["spade", 5, "sha"],
		["heart", 8, "sha"],
		["diamond", 8, "sha"],
		["diamond", 9, "sha"],
		["club", 6, "sha"],
		["club", 7, "sha"],
		["heart", 9, "sha", "fire"],
		["diamond", 7, "sha", "fire"],
		["spade", 6, "sha", "thunder"],
		["spade", 7, "sha", "thunder"],
		["club", 4, "sha", "thunder"],
		["club", 5, "sha", "thunder"],
		["heart", 10, "shan"],
		["heart", 11, "shan"],
		["diamond", 5, "shan"],
		["diamond", 6, "shan"],
		["diamond", 10, "shan"],
		["diamond", 11, "shan"],
		["spade", 10, "jlsgqs_mei"],
		["heart", 4, "jlsgqs_mei"],
		["heart", 6, "jlsgqs_mei"],
		["club", 9, "jlsgqs_mei"],
		["club", 10, "jlsgqs_mei"],
		["club", 11, "jlsgqs_mei"],
		["spade", 8, "jiu"],
		["diamond", 1, "jlsgqs_shuiyanqijun"],
		["club", 3, "jlsgqs_shuiyanqijun"],
		["heart", 3, "jlsgqs_caochuanjiejian"],
		["diamond", 4, "jlsgqs_caochuanjiejian"],
		["club", 13, "jlsgqs_wangmeizhike"],
		["spade", 11, "jlsgqs_yuqingguzong"],
		["heart", 5, "jlsgqs_yuqingguzong"],
		["diamond", 13, "jlsgqs_yuqingguzong"],
		["club", 12, "jlsgqs_yuqingguzong"],
		["spade", 9, "jlsgqs_qingmeizhujiu"],
		["heart", 7, "jlsgqs_qingmeizhujiu"],
		["club", 8, "jlsgqs_qingmeizhujiu"],
		["spade", 3, "wuxie"],
		["heart", 12, "wuxie"],
		["diamond", 3, "jlsgqs_jinnangdai"],
		["heart", 1, "jlsgqs_taipingyaoshu"],
		["diamond", 12, "jlsgqs_muniu"],
		["heart", 13, "jlsgqs_kongmingdeng"],
		["club", 1, "jlsgqs_dunjiatianshu"],
		["spade", 13, "jlsgqs_yuxi"],
		["spade", 1, "jlsgqs_xiujian"],
		["spade", 12, "jlsgqs_qixingbaodao"],
	],
};
export default jlsg_qs;
