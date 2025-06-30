import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export default {
	jlsgsk_guansuo: {
		1: {
			skill: {
				jlsg_zhengnan: {
					// 征南
					audio: "ext:极略/audio/skill:2",
					enable: "phaseUse",
					usable: 1,
					filter(event, player) {
						return game.hasPlayer(current => current.countDiscardableCards(player, "hej"));
					},
					filterTarget(card, player, target) {
						return target.countDiscardableCards(player, "hej");
					},
					async content(event, trigger, player) {
						const { result } = await player.discardPlayerCard(event.target, "hej", true).set("ai", button => {
							const event = get.event(),
								card = button.link,
								player = get.player();
							const target = event.getParent().target,
								position = get.position(card);
							let eff = get.value(card) * -get.sgnAttitude(player, target);
							if (position != "h") {
								eff += target.getUseValue("nanman");
							}
							return eff;
						});
						if (result?.bool && result?.links?.length) {
							const card = result.links[0];
							if (get.type(card) != "basic") {
								const nanman = get.autoViewAs({ name: "nanman" }, []);
								if (event.target.hasUseTarget(nanman)) {
									await event.target.chooseUseTarget(nanman, true);
								}
							}
						}
					},
					group: ["jlsg_zhengnan_damage"],
					subSkill: {
						audio: "jlsg_zhengnan",
						direct: true,
						popup: true,
						trigger: { global: "damageEnd" },
						filter(event, player) {
							if (event.card?.name == "nanman") {
								return false;
							}
							let evt = event.getParent("useCard", true)?.getParent(2);
							return evt?.name === "jlsg_zhengnan" && evt?.player == player;
						},
						async content(event, trigger, player) {
							await player.draw();
						},
					},
					ai: {
						result: {
							target(player, target) {
								let ratio = target.countDiscardableCards(player, "hej", c => get.type(c) != "basic") / target.countDiscardableCards(player, "hej");
								if (get.attitude(player, target) < 0) {
									return 1 - ratio;
								}
								return ratio;
							},
							player: 1,
						},
						order(item, player) {
							return get.order({ name: "nanman" }, player) + 0.5;
						},
						threaten: 0.5,
					},
				},
			},
			translate: {
				jlsg_zhengnan_info: "出牌阶段限一次，你可以弃置一名角色区域里的一张牌，若以此法弃置的牌为非基本牌，视为其使用一张【南蛮入侵】；以此法使用的【南蛮入侵】造成伤害时，你摸一张牌。",
			},
		},
	},
	jlsgsk_sundeng: {
		xiaoas: {
			skill: {
				jlsg_kuangbi: {
					audio: "ext:极略/audio/skill:2",
					trigger: { global: "useCard2" },
					direct: true,
					filter: function (event, player) {
						var type = get.type(event.card);
						if (type != "basic" && type != "trick") {
							return false;
						}
						if (player.hasSkill("jlsg_kuangbi2")) {
							return false;
						}
						var targets = event.targets || [];
						if (targets.length > 0) return true;
						var info = get.info(event.card);
						if (info.allowMultiple == false) return false;
						return game.filterPlayer(current => !targets.includes(current) && lib.filter.targetEnabled2(event.card, event.player, current) && lib.filter.targetInRange(event.card, event.player, current)).length;
					},
					content: function () {
						"step 0";
						var prompt2 = "为" + get.translation(trigger.card) + "增加或减少一个目标";
						player
							.chooseTarget(get.prompt(event.name), function (card, player, target) {
								var user = _status.event.user;
								if (_status.event.targets.includes(target)) return true;
								return lib.filter.targetEnabled2(_status.event.card, user, target) && lib.filter.targetInRange(_status.event.card, user, target);
							})
							.set("prompt2", prompt2)
							.set("ai", function (target) {
								var trigger = _status.event.getTrigger();
								var user = _status.event.user;
								var player = _status.event.player;
								return get.effect(target, trigger.card, user, player) * (_status.event.targets.includes(target) ? -1 : 1) - 3;
							})
							.set("targets", trigger.targets)
							.set("card", trigger.card)
							.set("user", trigger.player);
						("step 1");
						if (result.bool) {
							if (!event.isMine() && !event.isOnline()) game.delayx();
							event.targets = result.targets;
						} else {
							event.finish();
						}
						("step 2");
						player.logSkill(event.name, event.targets);
						for (let p of event.targets) {
							if (player.ai.shown < p.ai.shown) {
								player.addExpose(0.15);
							}
						}
						player.addTempSkill("jlsg_kuangbi2");
						if (trigger.targets.includes(event.targets[0])) trigger.targets.removeArray(event.targets);
						else trigger.targets.addArray(event.targets);
					},
					ai: {
						threaten: 4,
					},
				},
				jlsg_kuangbi2: {},
			},
			translate: {
				jlsg_kuangbi_info: "当基本牌或非延时锦囊指定目标时，你可以为此牌增加或减少一个目标，每回合限一次。",
			},
		},
	},
	jlsgsk_wanniangongzhu: {
		xiaoas: {
			skill: {
				jlsg_xinghan: {
					audio: "ext:极略/audio/skill:2",
					forbid: ["hearth", "guozhan"],
					changeSeat: true,
					init(player) {
						player.storage.jlsg_xinghan_token = lib.group.filter(g => jlsg.characterList.some(c => get.character(c, 1) == g));
						player.storage.jlsg_xinghan_location = false;
						player.storage.jlsg_xinghan = [];
						player.storage.jlsg_xinghan_removed = [];
						if (_status.jlsg_xinghan_init) {
							return;
						}
						_status.jlsg_xinghan_init = true;
						Object.defineProperty(_status, "jlsg_xinghan_compact", {
							enumerable: true,
							configurable: true,
							get() {
								let result = game.hasPlayer(p => p.getSkills(null, false, false).some(s => s != "jlsg_xinghan" && lib.skill[s].changeSeat));
								delete this.jlsg_xinghan_compact;
								this.jlsg_xinghan_compact = result;
								return result;
							},
						});
						game.broadcastAll(function () {
							// player.isMin
							let isMin = Object.getOwnPropertyDescriptor(lib.element.Player.prototype, "isMin");
							Object.defineProperty(lib.element.Player.prototype, "isMin", {
								...isMin,
								value: function (distance) {
									if (this.hasSkill("jlsg_xinghan_recruit")) {
										return false;
									}
									return isMin.value.apply(this, arguments);
								},
							});
							// player.setIdentity
							let setIdentity = Object.getOwnPropertyDescriptor(lib.element.Player.prototype, "setIdentity");
							Object.defineProperty(lib.element.Player.prototype, "setIdentity", {
								...setIdentity,
								value: function (identity, nature) {
									let result = setIdentity.value.apply(this, arguments);
									if (this.storage.jlsg_xinghan) {
										arguments[0] = lib.skill.jlsg_xinghan.mapIdentity(identity);
										for (let recruit of this.storage.jlsg_xinghan) {
											setIdentity.value.apply(recruit, arguments);
										}
									}
									return result;
								},
							});
							player.isUnderControl;
							let isUnderControl = Object.getOwnPropertyDescriptor(lib.element.Player.prototype, "isUnderControl");
							Object.defineProperty(lib.element.Player.prototype, "isUnderControl", {
								...isUnderControl,
								value: function (self, me) {
									me = me || game.me;
									var that = this._trueMe || this;
									if (that.isMad() || game.notMe) return false;
									if (this === me) {
										if (self) return true;
										return false;
									}
									me = me._trueMe || me;
									if (that === me) {
										return true;
									}
									if (_status.connectMode) return false;
									if (lib.config.mode == "versus") {
										if (_status.mode == "three") return this.side == me.side;
										if (_status.mode == "standard") return lib.storage.single_control && this.side == me.side;
										if (_status.mode == "four") return get.config("four_phaseswap") && this.side == me.side;
										if (_status.mode == "two") return get.config("two_phaseswap") && this.side == me.side;
										return false;
									} else if (lib.config.mode == "boss") {
										if (me.side) return false;
										return this.side == me.side && get.config("single_control");
									} else if (game.chess) {
										if (lib.config.mode == "chess") {
											if (_status.mode == "combat" && !get.config("single_control")) return false;
										}
										return this.side == me.side;
									}
									return false;
								},
							});
							// get.realAttitude
							if (get.realAtitude) {
								get.realAtitude = new Proxy(get.realAtitude, {
									apply(target, thisArg, argumentsList) {
										let [from, to] = argumentsList;
										if (from.storage.jlsg_xinghan_recruit) {
											argumentsList[0] = from.storage.jlsg_xinghan_recruit;
										}
										if (to.storage.jlsg_xinghan_recruit) {
											argumentsList[1] = to.storage.jlsg_xinghan_recruit;
										}
										return Reflect.apply(target, thisArg, argumentsList);
									},
								});
							}
							const style = document.createElement("style");
							style.type = "text/css";
							style.id = "jlsg-xinghan";
							document.head.appendChild(style);
							let scale = 0.8,
								scale2 = 0.9;
							if (ui.arena.dataset.number > 8) {
								scale = 4.8 / ui.arena.dataset.number;
								scale2 = 5.4 / ui.arena.dataset.number;
							}
							let testP = ui.create.player(ui.arena);
							testP.classList.add("fullskin", "minskin");
							if (getComputedStyle(testP).width == "120px") {
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit { width: 110px; height: 110px; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .avatar { left: 2px !important; top: 2px !important; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .identity { left: 92px; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .hp { left: 82px; bottom: 8px; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .count { left: -11px; bottom: 10px; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .equips > *:first-child:last-child { border-radius: 8px; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .equips > *:first-child { border-radius: 8px 8px 0px 0px; }`);
								style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .equips > *:last-child { border-radius: 0px 0px 8px 8px; }`);
							}
							testP.remove();
							style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit { transform: scale(${scale}); }`);
							style.sheet.insertRule(`#arena > .player.minskin.jlsg-xinghan-recruit .equips { left: 2px; bottom: 1px; }`);
							style.sheet.insertRule(`#arena > .player.jlsg-xinghan-recruit:not(.minskin):not([data-position="0"]) { transform: scale(${scale2}); }`);
							style.sheet.insertRule(`#arena > .player.jlsg-xinghan-recruit > .dieidentity { display:none; }`);
						});
					},
					onremove(player) {
						let recruits = player.storage.jlsg_xinghan.slice();
						if (typeof player.seatNum == "number") {
							recruits.sort((a, b) => a.seatNum - b.seatNum);
						}
						for (let recruit of recruits) {
							let next = recruit.die();
							next._triggered = null;
							next.then(() => {
								lib.skill.jlsg_xinghan.removeRecruit(recruit);
							});
						}
					},
					intro: {
						mark: function (dialog, storage, player) {
							dialog.add(storage);
							if (player.storage.jlsg_xinghan_removed.length) {
								let removed = player.storage.jlsg_xinghan_removed;
								dialog.add(removed);
								for (let i = 0; i != removed.length; ++i) {
									dialog.buttons[dialog.buttons.length - i].classList.add("dead");
								}
							}
						},
					},
					trigger: {
						player: ["enterGame", "phaseEnd"],
						global: "phaseBefore",
					},
					filter(event, player, triggerName) {
						if (triggerName == "phaseBefore" && game.phaseNumber != 0) {
							return false;
						}
						if (!player.storage.jlsg_xinghan_token.length) {
							return false;
						}
						return player.storage.jlsg_xinghan.length < 3;
					},
					async cost(event, trigger, player) {
						let result;
						if (player.storage.jlsg_xinghan_token.length == 1) {
							result = {
								control: player.storage.jlsg_xinghan_token[0],
							};
						} else {
							({ result } = await player.chooseControl(player.storage.jlsg_xinghan_token.concat("cancel2")).set("prompt", get.prompt("jlsg_xinghan")).set("prompt2", "选择招募的势力"));
						}
						if (result.control == "cancel2") {
							return;
						}
						let choices = jlsg.characterList.filter(c => get.character(c, 1) == result.control).randomGets(3);
						if (!choices.length) {
							return;
						}
						let { result: result2 } = await player.chooseButton([`招募一名的${get.translation(result.control)}势力武将`, [choices, "character"]]);
						event.result = { bool: result2.bool };
						if (result2.bool) event.result.cost_data = [result.control, result2.links[0]];
					},
					async content(event, trigger, player) {
						let [token, name] = event.cost_data;
						player.storage.jlsg_xinghan_token.remove(token);
						let compact = _status.jlsg_xinghan_compact;
						let recruit;
						if (compact) {
							let before;
							if (player.storage.jlsg_xinghan_location) {
								before = player;
								while (before.previousSeat.storage.jlsg_xinghan_recruit === player) {
									before = before.previous;
								}
							} else {
								before = player.nextSeat;
								while (before.storage.jlsg_xinghan_recruit === player) {
									before = before.next;
								}
							}
							let position = before.dataset.position;
							recruit = game.addPlayer(position, name);
							recruit.getId();
						} else {
							recruit = game.addFellow(player.dataset.position, name, "zoominanim");
							if (player.storage.jlsg_xinghan_location) {
								game.players.remove(recruit);
								game.players.unshift(recruit);
								game.arrangePlayers();
							}
						}
						if (recruit.previousSeat.seatNum) {
							// 在一号位前时作为末置位
							recruit.seatNum = recruit.previousSeat.seatNum + 1;
							for (let p of game.players.concat(game.dead)) {
								if (p != recruit && p.seatNum >= recruit.seatNum) {
									p.seatNum += 1;
								}
							}
						}
						jlsg.characterList.remove(name);
						recruit.storage.jlsg_xinghan_recruit = player;
						recruit.addSkill("jlsg_xinghan_recruit");
						const draw = recruit.draw(2);
						draw._triggered = null;
						await draw;
						game.log(player, "招募了", recruit);
						player.storage.jlsg_xinghan_location = !player.storage.jlsg_xinghan_location;
						recruit._trueMe = player;
						game.addGlobalSkill("autoswap");
						// await game.delayx(0.3);
						if (!compact) {
							// relocate
							jlsg.makeDraggable(recruit);
							let { top: pTop, height: pHeight, left: pLeft, width: pWidth } = getComputedStyle(recruit.previous);
							let { top: nTop, left: nLeft } = getComputedStyle(recruit.next);
							let { height: rHeight, width: rWidth } = getComputedStyle(recruit);
							let pDist = 0.5;
							switch (player) {
								case recruit.previous:
									pDist = 0.625;
									break;
								case recruit.next:
									pDist = 0.375;
									break;
								case recruit.previous.previous:
									pDist = 0.375;
									break;
								case recruit.next.next:
									pDist = 0.625;
									break;
							}
							recruit.style.top = `calc(${pDist} * ${pTop} + ${1 - pDist} * ${nTop} + 0.5 * ${pHeight} - 0.5 * ${rHeight})`;
							recruit.style.left = `calc(${pDist} * ${pLeft} + ${1 - pDist} * ${nLeft} + 0.5 * ${pWidth} - 0.5 * ${rWidth})`;
						}
						// AI expose
						recruit.ai = {
							...player.ai,
							handcards: recruit.ai.handcards,
						};
						game.broadcastAll(
							function (recruit, player) {
								Object.defineProperty(recruit.ai, "shown", {
									enumerable: true,
									get() {
										return player.ai.shown;
									},
									set(value) {
										player.ai.shown = value;
									},
								});
							},
							recruit,
							player
						);
						Object.defineProperty(recruit, "identity", {
							enumerable: true,
							get() {
								if (this.storage.jlsg_xinghan_recruit) {
									return lib.skill.jlsg_xinghan.mapIdentity(this.storage.jlsg_xinghan_recruit.identity);
								}
							},
						});
						Object.defineProperty(recruit, "identityShown", {
							enumerable: true,
							get() {
								let recruiter = this.storage.jlsg_xinghan_recruit;
								if (recruiter) {
									return recruiter.identityShown;
								}
							},
							set(value) {
								let recruiter = this.storage.jlsg_xinghan_recruit;
								if (recruiter) {
									recruiter.identityShown = value;
								}
							},
						});
						if (recruit.showIdentity) {
							game.broadcastAll(
								function (player, recruit) {
									if (player.identity && (!game.getIdentityList || !game.getIdentityList(player))) {
										recruit.setIdentity();
									} else {
										recruit.setIdentity(player.node.identity.firstChild.innerHTML, player.node.identity.dataset.color);
									}
								},
								player,
								recruit
							);
						}
						const players = player.storage.jlsg_xinghan.concat(player);
						for (let p of players) {
							p.storage.zhibi = p.getStorage("zhibi").concat(recruit);
							recruit.storage.zhibi = recruit.getStorage("zhibi").concat(p);
							p.ai.modAttitudeFrom = function (from, to, att) {
								from = from.storage.jlsg_xinghan_recruit || from;
								to = to.storage.jlsg_xinghan_recruit || to;
								const currents = game
									.filterPlayer(null, undefined, true)
									.map(i => i.storage.jlsg_xinghan_recruit || i)
									.unique();
								currents.remove(from);
								if (currents.length == 1 && currents[0] == to) return -2;
								return get.attitude(from, to);
							};
							p.ai.modAttitudeTo = function (from, to, att) {
								from = from.storage.jlsg_xinghan_recruit || from;
								to = to.storage.jlsg_xinghan_recruit || to;
								const currents = game
									.filterPlayer(null, undefined, true)
									.map(i => i.storage.jlsg_xinghan_recruit || i)
									.unique();
								currents.remove(to);
								if (currents.length == 1 && currents[0] == from) return -2;
								return get.attitude(from, to);
							};
						}
						// AI attitude
						player.markAuto("jlsg_xinghan", recruit);
						/*if (get.attitude(player, recruit) <= 0 || get.attitude(recruit, player) <= 0) {
									if (_status.jlsg_xinghan_attitude_patch) {
										console.error("jlsg_xinghan get.attitude not working");
									} else {
										_status.jlsg_xinghan_attitude_patch = true;
										get.attitude = new Proxy(get.attitude, {
											apply(target, thisArg, argumentsList) {
												let [from, to] = argumentsList;
												if (from?.storage.jlsg_xinghan_recruit) {
													argumentsList[0] = from.storage.jlsg_xinghan_recruit;
												}
												if (to?.storage.jlsg_xinghan_recruit) {
													argumentsList[1] = to.storage.jlsg_xinghan_recruit;
												}
												return Reflect.apply(target, thisArg, argumentsList);
											},
										});
									}
								}*/
						//
						game.triggerEnter(recruit);
					},
					mapIdentity(identity) {
						switch (identity) {
							case "rZhu":
								return "rZhong";
							case "bZhu":
								return "bZhong";
							case "zhu":
								return "zhong";
							case "nei":
								return "commoner";
							default:
								return identity;
						}
					},
					removeRecruit(player) {
						let recruiter = player.storage.jlsg_xinghan_recruit;
						recruiter.storage.jlsg_xinghan.remove(player);
						recruiter.storage.jlsg_xinghan_removed.push(player);
						if (!_status.over) {
							if (_status.jlsg_xinghan_compact) {
								game.removePlayer(player);
							} else {
								player.delete();
								game.dead.remove(player);
								player.removed = true;
							}
						}
					},
					ai: {
						threaten(player, target) {
							if (!target.storage.jlsg_xinghan_token.length && !target.storage.jlsg_xinghan.length) return 0;
							return 3;
						},
					},
				},
				jlsg_xinghan_recruit: {
					init(player) {
						player.classList.add("jlsg-xinghan-recruit");
						if (!_status.jlsg_xinghan_compact) {
							player.classList.add("minskin");
						}
					},
					firstDo: true,
					charlotte: true,
					mark: true,
					marktext: "招",
					intro: {
						name: "招募",
						name2: "招募",
						content(storage) {
							return `受${get.translation(storage)}招募`;
						},
					},
					silent: true,
					forceDie: true,
					forced: true,
					trigger: { global: ["phaseBefore", "phaseAfter", "die"] },
					filter(event, player) {
						if (event.name == "die") {
							return event.player == player.storage.jlsg_xinghan_recruit || event.player == player;
						}
						return !player._trueMe;
					},
					async content(event, trigger, player) {
						let recruiter = player.storage.jlsg_xinghan_recruit;
						if (!player._trueMe) {
							player._trueMe = recruiter;
						}
						if (trigger.name == "die") {
							if (trigger.player == recruiter) {
								let next = player.die();
								next._triggered = null;
								await next;
								if (recruiter.isUnderControl(self)) {
									game.swapPlayerAuto(recruiter);
								}
							}
							lib.skill.jlsg_xinghan.removeRecruit(player);
						}
					},
				},
			},
			translate: {
				jlsg_zhenge_buff: "枕戈",
				jlsg_zhenge_derivation: "负面/正面效果",
				jlsg_zhenge_derivation_ab: "负面/正面效果",
				jlsg_zhenge_derivation_info: "正面：随机获得一个技能；手牌上限+1；从牌堆或弃牌堆获得1/2张基本牌/锦囊牌/装备牌；随机加1~3点体力上限；随机回复1~3点体力；摸牌数+1；使用【杀】的次数上限+1；随机摸1~5张牌。<br>负面：横置；随机弃置1~5张牌；随机受到1~3点伤害；随机失去一个技能；翻面；随机受到1~3点火焰伤害；随机减1~2点体力上限；随机失去1~3点体力。",
			},
		},
	},
	jlsgsk_wenyang: {
		1: {
			skill: {
				jlsg_jueyong: {
					audio: "ext:极略/audio/skill:2",
					trigger: { source: "damageBegin1" },
					direct: true,
					filter: function (event, player) {
						return !player.hasSkill("jlsg_jueyong2") && event.player.isIn() && event.notLink() && event.card && event.card.name == "sha" && (player.hp != player.maxHp || player.hp != event.player.countCards("h"));
					},
					content() {
						"step 0";
						var choices = [];
						let choice = -1,
							curEff = -Infinity;
						if (player.hp != trigger.player.countCards("h")) {
							choices.push("体力");
							{
								let diff = Math.min(trigger.player.countCards("h") - player.hp, player.maxHp - player.hp);
								let eff = diff * 2 + Math.abs(diff);
								if (diff < 0) {
									eff -= (2 * trigger.num * get.attitude(player, trigger.player)) / get.attitude(player, player);
								}
								// console.log('体力', eff);
								if (eff > 0) {
									choice = 0;
									curEff = eff;
								}
							}
						}
						if (player.maxHp != trigger.player.countCards("h")) {
							choices.push("体力上限");
							if (player.hp <= trigger.player.countCards("h")) {
								let diff = trigger.player.countCards("h") - player.hp;
								let eff = (diff / 3) * 2 + Math.abs(diff);
								if (diff < 0) {
									eff -= (2 * trigger.num * get.attitude(player, trigger.player)) / get.attitude(player, player);
								}
								// console.log('体力上限', eff);
								if (eff > 0 && eff > curEff) {
									choice = choices.length - 1;
								}
							}
						}
						choices.push("cancel2");

						if (choice == -1) {
							choice = choices.length - 1;
						}
						player.chooseControl(choices).set("prompt", get.prompt2(event.name)).set("choice", choice);
						("step 1");
						if (result.control == "cancel2") {
							event.finish();
							return;
						}
						player.logSkill(event.name, trigger.player);
						player.addTempSkill("jlsg_jueyong2");
						if (result.control == "体力") {
							game.log(player, "将体力调整至", trigger.player.countCards("h"));
							event.diff = trigger.player.countCards("h") - player.hp;
							player.changeHp(event.diff);
						} else {
							event.diff = trigger.player.countCards("h") - player.maxHp;
							if (event.diff > 0) {
								player.gainMaxHp(event.diff);
							} else {
								player.loseMaxHp(-event.diff);
							}
						}
						("step 2");
						if (player.hp <= 0 && player.maxHp > 0) {
							game.delayx();
							event._dyinged = true;
							player.dying(event);
						}
						("step 3");
						player.draw(Math.abs(event.diff));
						if (event.diff < 0) {
							trigger.num *= 2;
						}
					},
				},
				jlsg_jueyong2: {},
				jlsg_choujue: {
					audio: "ext:极略/audio/skill:2",
					usable: 1,
					viewAs: {
						name: "sha",
						isCard: true,
						storage: { jlsg_choujue: true },
					},
					enable: "phaseUse",
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					precontent() {
						"step 0";
						let cnt = Math.max(1, Math.floor(player.maxHp / 2));
						player.loseMaxHp(cnt);
						event.getParent().addCount = false;
					},
					mod: {
						cardUsable: function (card) {
							if (card.storage && card.storage.jlsg_choujue) return Infinity;
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
						for (let s of player.skills) {
							let info = get.skillInfoTranslation(s, player);
							if (!info || !info.includes("出牌阶段限一次")) {
								continue;
							}
							let ss = game.expandSkills([s]);
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
			},
			translate: {
				jlsg_jueyong_info: "当你使用【杀】对目标角色造成伤害时，你可以将体力或体力上限调整至与其手牌数相同，然后摸X张牌（X为你体力或体力上限的变化量），若你以此法减少了体力或体力上限，你令此伤害翻倍，每回合限一次。",
				jlsg_choujue_info: "出牌阶段限一次，你可以减一半（向下取整，至少为1）体力上限并视为使用【杀】（无次数限制），当你以此法造成伤害时，令你所有出牌阶段限一次的技能视为未发动过。",
			},
		},
	},
	jlsgsk_zhaoyan: {
		xiaoas: {
			skill: {
				jlsg_sanjue: {
					audio: "ext:极略/audio/skill:3",
					trigger: { player: "useCard" },
					filter: function (event, player) {
						let s = player.storage.jlsg_sanjue || {};
						return !s[event.card.name] || s[event.card.name] == 2;
					},
					forced: true,
					content: function () {
						player.draw();
						player.storage.jlsg_sanjue = player.storage.jlsg_sanjue || {};
						player.storage.jlsg_sanjue[trigger.card.name] = (player.storage.jlsg_sanjue[trigger.card.name] || 0) + 1;
						var skills = jlsg.characterList
							.filter(c => get.character(c, 1) == "wu")
							.map(c => get.character(c)[3])
							.flat()
							.filter(s => {
								if (lib.filter.skillDisabled(s)) return false;
								return !get.info(s).charlotte;
							});
						skills.removeArray(game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), []));
						skills = skills.filter(skill => {
							const info = lib.skill[skill];
							if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
							return true;
						});
						let skill = [...skills].randomGet();
						if (skill) {
							player.addSkills(skill);
						}
					},
					group: "jlsg_sanjue2",
				},
				jlsg_sanjue2: {
					audio: "jlsg_sanjue",
					trigger: { player: "phaseUseBegin" },
					direct: true,
					content() {
						"step 0";
						player.chooseTarget(get.prompt2(event.name)).set("ai", p => get.attitude(player, p) - Math.random() * 2);
						("step 1");
						if (!result.bool) {
							event.finish();
							return;
						}
						player.logSkill(event.name, result.targets);
						let skills = jlsg.characterList
							.map(c => get.character(c)[3])
							.flat()
							.filter(s => {
								if (lib.filter.skillDisabled(s)) return false;
								return !get.info(s).charlotte;
							});
						skills.removeArray(game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), []));
						skills = skills.filter(skill => {
							const info = lib.skill[skill];
							if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
							return true;
						});
						let skill = [...skills].randomGet();
						if (skill) {
							result.targets[0].addSkills(skill);
						}
					},
				},
			},
			translate: {
				jlsg_sanjue2: "三绝",
				jlsg_sanjue_info: "锁定技，当你第一次或第三次使用同名牌时，你摸一张牌，然后获得一个随机吴势力技能。出牌阶段开始时，你可以令一名角色获得一个随机技能。",
				jlsg_sanjue2_info: "出牌阶段开始时，你可以令一名角色获得一个随机技能。",
			},
		},
	},
	jlsgsk_lvlingqi: {
		xiaoas: {
			info: ["female", "qun", 5, ["jlsg_jiwux", "zhuangrong"], ["name:吕|null"]],
		},
	},
};
