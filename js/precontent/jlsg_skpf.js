import { lib, game, ui, get, ai, _status } from '../../../../noname.js';
import postProcessPack from './postProcessPack.js';
export default function () {
  var jlsg_skpf = {
    name: 'jlsg_skpf',
    connect: true,
    character: {
      jlsgsk_jdjg_sunshangxiang: ["female", 'wu', 3, ["jlsg_jieyin", "jlsg_xiaoji"], []],
      jlsgsk_syqj_guanyu: ["male", 'shu', 4, ["jlsg_syqj_wusheng"], []],
      jlsgsk_sslh_zhenji: ["female", 'wei', 3, ["jlsg_sslh_luoshen", "jlsg_sslh_qingguo"], []],
      jlsgsk_spwq_lvbu: ["male", 'qun', 4, ["jlsg_spwq_wushuang"], []],
      jlsgsk_smdq_diaochan: ["female", "qun", 3, ["jlsg_smdq_lijian", "jlsg_smdq_biyue"], []],
      jlsgsk_gygs_sunce: ["male", "wu", 4, ["jlsg_gygs_angyang", "jlsg_gygs_weifeng"], ["name:孙|策"]],
    },
    characterTitle: {
      jlsgsk_jdjg_sunshangxiang: '绝代巾帼',
      jlsgsk_syqj_guanyu: '水淹七军',
      jlsgsk_sslh_zhenji: '似水莲华',
      jlsgsk_spwq_lvbu: '杀破万千',
      jlsgsk_smdq_diaochan: "水墨丹青",
      jlsgsk_gygs_sunce: "冠勇盖世",
    },
    skill: {
      jlsg_jieyin: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        filterCard: true,
        usable: 1,
        position: 'he',
        filter: function (event, player) {
          return player.countCards('he') > 0;
        },
        check: function (card) {
          var player = _status.event.player;
          if (get.position(card) == 'e') {
            var subtype = get.subtype(card);
            if (player.countCards('h', { subtype: subtype })) return 20 - get.value(card);
            return 10 - get.value(card);
          }
          else {
            if (player.countCards('e')) return 0;
            if (player.countCards('h', { type: 'equip' })) return 0;
            return 8 - get.value(card);
          }
        },
        filterTarget: lib.filter.notMe,
        delay: false,
        content() {
          'step 0'
          event.targets = [player, target].sortBySeat();
          event.drawn = event.targets.filter(p => p.isHealthy());
          event.drawn.forEach(p => p.draw(2, player));
          'step 1'
          event.targets
            .filter(p => p.isDamaged())
            .forEach(p => p.recover(player));
          if (event.drawn.length) {
            event.finish();
          }
          'step 2'
          var stat = player.getStat().skill;
          delete stat.jlsg_jieyin;
        },
        ai: {
          threaten: 1,
        }
      },
      jlsg_xiaoji: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        direct: true,
        filter: function (event, player) {
          var evt = event.getl(player);
          return evt && evt.player == player && evt.es && evt.es.length > 0;
        },
        content: function () {
          "step 0"
          event.cards = trigger.getl(player).es;
          "step 1"
          event.card = event.cards.shift();
          if (!event.card) {
            event.finish();
            return;
          }
          player.chooseBool(get.prompt2(event.name), true).set('frequentSkill', 'jlsg_xiaoji');
          "step 2"
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name);
          player.draw();
          switch (get.subtype(event.card)) {
            case 'equip1':
              player.chooseTarget(function (card, player, target) {
                return target != player;
              }).set('ai', function (target) {
                return get.damageEffect(target, _status.event.player, _status.event.player);
              }).set('source', target)
                .set('prompt2', '对其造成1点伤害');
              break;
            case 'equip2':
            case 'equip5':
              player.chooseBool('是否摸两张牌？', true).set('frequentSkill', 'jlsg_xiaoji');
              break;
            case 'equip3':
            case 'equip4':
              player.chooseTarget(function (card, player, target) {
                if (player == target) return false;
                return target.countDiscardableCards(player, 'he');
              }).set('ai', function (target) {
                return -get.attitude(_status.event.player, target);
              }).set('prompt2', '弃置一名其他角色的一张牌');
              break;
            default:
              break;
          }
          "step 3"
          if (result.bool) {
            switch (get.subtype(event.card)) {
              case 'equip1':
                result.targets[0].damage();
                break;
              case 'equip2':
              case 'equip5':
                player.draw(2);
                break;
              case 'equip3':
              case 'equip4':
                player.discardPlayerCard(result.targets[0], 'he', true);
                player.chooseTarget(function (card, player, target) {
                  if (player == target) return false;
                  return target.countDiscardableCards(player, 'he');
                }).set('ai', function (target) {
                  return -get.attitude(_status.event.player, target);
                }).set('prompt2', '弃置一名其他角色的一张牌');
                return;
                break;
              default:
                break;
            }
          }
          event.goto(1);
          "step 4"
          if (result.bool) {
            player.discardPlayerCard(result.targets[0], 'he', true);
          }
          event.goto(1);
        },
        ai: {
          noe: true,
          reverseEquip: true,
          effect: {
            target: function (card, player, target, current) {
              if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
            }
          }
        }
      },
      jlsg_syqj_wusheng: {
        audio: "ext:极略/audio/skill:2",
        enable: ['chooseToRespond', 'chooseToUse'],
        filterCard: function (card, player) {
          return get.color(card) == 'red';
        },
        position: 'hes',
        viewAs: {
          name: 'sha',
        },
        viewAsFilter: function (player) {
          return player.countCards('hes', { color: 'red' }) != 0;
        },
        prompt: '将一张红色牌当杀使用或打出',
        check: function (card) {
          var val = get.value(card);
          if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
          return 7 - val;
        },
        group: 'jlsg_syqj_wusheng2',
        ai: {
          skillTagFilter: function (player) {
            if (!player.countCards('hes', { color: 'red' })) return false;
          },
          respondSha: true,
        }
      },
      jlsg_syqj_wusheng2: {
        sourceSkill: "jlsg_syqj_wusheng",
        audio: false,
        trigger: { player: 'useCardToPlayered' },
        filter(event, player) {
          return event.card.name == "sha" && event.skill === 'jlsg_syqj_wusheng' && event.isFirstTarget;
        },
        silent: true,
        frequent: true,
        content() {
          'step 0'
          player.draw();
          'step 1'
          player.chooseToDiscard(`###${get.prompt(event.name, trigger.targets)}###弃置一~三张手牌，然后目标弃置等量的牌`, [1, 3])
            .set('ai', card => 9 - get.value(card) - (get.color(card) == 'red' ? 1 : 0) - 2 * ui.selected.cards.length + Math.random());
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.cnt = result.cards.length;
          trigger.targets.slice().sortBySeat().forEach(p => p.chooseToDiscard('he', true, event.cnt));
          trigger.getParent().baseDamage += event.cnt;
          player.addTempSkill('jlsg_syqj_wusheng_buff', ['phaseChange', 'phaseAfter']);
          player.addMark('jlsg_syqj_wusheng_buff', event.cnt);
        },
      },
      jlsg_syqj_wusheng_buff: {
        onremove(player) {
          player.removeMark('jlsg_syqj_wusheng_buff', Infinity);
        },
        mod: {
          cardUsable: function (card, player, num) {
            if (card.name == 'sha') return num + player.countMark('jlsg_syqj_wusheng_buff');
          },
        },
      },
      jlsg_sslh_luoshen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        frequent: true,
        content: function () {
          "step 0"
          event.cards = [];
          "step 1"
          var next = player.judge(function (card) {
            var evt = _status.event.getParent('jlsg_sslh_luoshen');
            if (!evt) {
              return 0;
            }
            if (evt.cards.some(c => get.number(c) == get.number(card))) return -1.5;
            return 1.5;
          });
          next.judge2 = function (result) {
            return result.bool;
          };
          if (get.mode() != 'guozhan' && !player.hasSkillTag('rejudge')) next.set('callback', function () {
            if (get.position(card, true) == 'o') {

              player.gain(card, false);
              player.$gain2(card);
              game.delayx(0.5);
            }
          });
          else next.set('callback', function () {
            event.getParent().orderingCards.remove(card);
          });
          "step 2"
          if (result.bool) {
            event.cards.push(result.card);
            player.chooseBool('是否再次发动【洛神】？').set('frequentSkill', 'jlsg_sslh_luoshen');
          }
          else {
            let number = get.number(event.cards[event.cards.length - 1]);
            if (number) {
              player.addTempSkill('jlsg_sslh_luoshen_hand');
              player.storage.jlsg_sslh_luoshen_hand =
                (player.storage.jlsg_sslh_luoshen_hand || 0) + number;
            }
            event.cards = event.cards.filter(c => get.position(c, true) == 'o');
            if (event.cards.length) {
              player.gain(event.cards, 'gain2');
            }
            event.finish();
          }
          "step 3"
          if (result.bool) {
            event.goto(1);
          }
          else {
            event.cards = event.cards.filter(c => get.position(c, true) == 'o');
            if (event.cards.length) {
              player.gain(event.cards, 'gain2');
            }
          }
        },
        subSkill: {
          hand: {
            onremove: true,
            mod: {
              maxHandcard: function (player, num) {
                return num + player.storage.jlsg_sslh_luoshen_hand;
              }
            },
          },
        },
      },
      jlsg_sslh_qingguo: {
        audio: "ext:极略/audio/skill:2",
        filter: function (event, player) {
          return event.player != player && event.card && (event.card.name == 'sha' || get.type(event.card) == 'trick');
        },
        trigger: { target: 'useCardToTargeted' },
        direct: true,
        locked: false,
        content() {
          'step 0'
          player.chooseToDiscard('h', get.prompt2(event.name, trigger.player), c => get.color(c) == 'black')
            .set('ai', c => {
              let player = _status.event.player;
              let eff = 2.5 * get.effect(player, _status.event.card, _status.event.target, player)
              let eff2 = 0;
              if (get.suit(card) == 'spade') {
                eff2 = jlsg.getLoseHpEffect(_status.event.target) * get.attitude(player, _status.event.target) / 6;
              }
              return eff + eff2 - get.value(c);
            })
            .set('card', trigger.card)
            .set('target', trigger.player);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name);
          trigger.getParent().excluded.add(player);
          if (get.suit(result.cards[0]) != 'spade') {
            event.finish();
            return;
          }
          player.chooseBool(`是否令${get.translation(trigger.player)}失去1点体力？`, get.attitude(player, trigger.player) < 0);
          'step 2'
          if (result.bool) {
            trigger.player.loseHp();
            if (trigger.player.ai.shown > player.ai.shown) {
              player.addExpose(0.3);
            }
          }
        },
        mod: {
          aiValue: function (player, card, num) {
            if (get.name(card) != 'shan' && get.color(card) != 'black') return;
            var cards = player.getCards('hs', function (card) {
              return get.name(card) == 'shan' || get.color(card) == 'black';
            });
            cards.sort(function (a, b) {
              return (get.name(b) == 'shan' ? 1 : 2) - (get.name(a) == 'shan' ? 1 : 2);
            });
            var geti = function () {
              if (cards.includes(card)) {
                return cards.indexOf(card);
              }
              return cards.length;
            };
            if (get.name(card) == 'shan') return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
            return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
          },
          aiUseful: function () {
            return lib.skill.jlsg_sslh_qingguo.mod.aiValue.apply(this, arguments);
          },
        },
      },
      jlsg_spwq_wushuang: {
        audio: "ext:极略/audio/skill:2",
        mod: {
          cardUsable(card, player, num) {
            if (_status.event.skill == "jlsg_spwq_wushuang") return Infinity;
            if (card && card.storage?.jlsg_spwq_wushuang) return Infinity;
          },
          targetInRange: function () {
            if (_status.event.skill == "jlsg_spwq_wushuang") return true;
          },
        },
        onChooseToUse(event) {
          if (game.online || event.jlsg_spwq_wushuang) return;
          let bool = true,
            num = event.player.getHistory("useCard", evt => {
              if (evt.skill != "jlsg_spwq_wushuang") return false;
              return evt.card.storage?.jlsg_spwq_wushuang_double;
            }).length,
            history = event.player.getHistory("useSkill", evt => {
              if (evt.skill != "jlsg_spwq_wushuang") return false;
              return !evt.targets;
            }).length;
          if (history > num) bool = false;
          event.set("jlsg_spwq_wushuang", bool);
        },
        enable: "chooseToUse",
        filter(event, player) {
          let check = event.jlsg_spwq_wushuang;
          if (!check) return false;
          if (!player.countCards("h")) return false;
          let vcard = get.autoViewAs({ name: "sha", isCard: true, storage: { jlsg_spwq_wushuang: true }, cards: [] }, []);
          return event.filterCard(vcard, player, event);
        },
        hiddenCard(name, player) {
          if (name == "sha") return player.countCards("h");
        },
        position: "h",
        filterCard: true,
        selectCard: -1,
        discard: false,
        lose: false,
        log: false,
        locked: false,
        prompt: "无双：是否弃置所有手牌并摸等量张牌，视为使用【杀】？",
        viewAsFilter: function (player) {
          if (!player.countCards('h')) return false;
          let num = player.getHistory("useCard", evt => {
            if (evt.skill != "jlsg_spwq_wushuang") return false;
            return evt.card.storage.jlsg_spwq_wushuang_double;
          }).length,
            history = player.getHistory("useSkill", evt => {
              if (evt.skill != "jlsg_spwq_wushuang") return false;
              return !evt.targets;
            });
          return history.length < num;
        },
        viewAs(cards, player) {
          return {
            name: "sha",
            isCard: true,
            storage: { jlsg_spwq_wushuang: true },
            cards: [],
          }
        },
        onuse(event, player) {
          let hs = player.getCards("h");
          player.logSkill("jlsg_spwq_wushuang");
          player.discard(hs);
          if (hs.some(i => get.subtype(i) == "equip1")) event.card.storage.jlsg_spwq_wushuang_double = true;
          if (player.isIn()) player.draw(hs.length);
        },
        group: ["jlsg_spwq_wushuang_useCardTo", "jlsg_spwq_wushuang_damage"],
        subSkill: {
          useCardTo: {
            trigger: { player: "useCardToPlayered" },
            filter(event, player, name) {
              const target = event.target;
              if (!target || !target.isIn() || event.getParent().excluded.includes(target)) return false;
              return event.card.name == "sha" && event.card.storage?.jlsg_spwq_wushuang;
            },
            async cost(event, trigger, player) {
              const target = trigger.target;
              if (!target.isIn()) return;
              event.result = {
                bool: true,
                targets: [target],
              }
              if (trigger.card.storage.jlsg_spwq_wushuang_double) event.result.cost_data = { choice: [0, 1] };
              else {
                const { result } = await player.chooseButton(true, [
                  get.prompt("jlsg_spwq_wushuang", target),
                  [
                    [
                      [0, `将${get.translation(target)}区域里所有牌于本回合内移出游戏`],
                      [1, `令${get.translation(target)}所有技能本回合无效`],
                    ],
                    "textbutton",
                  ],
                ])
                  .set("target", target)
                  .set("ai", button => {
                    const player = get.player(),
                      target = get.event("target");
                    if (get.attitude(player, target) < 1) {
                      const sha = get.autoViewAs({ name: "sha", isCard: true }, []);
                      if (get.effect(target, sha, player, target) > target.countCards("hej")) return button.link == 1;
                      else return button.link == 0;
                    }
                    else return 1;
                  });
                if (result.bool && result.links) event.result.cost_data = { choice: result.links };
              }
            },
            async content(event, trigger, player) {
              if (!trigger.parent.jlsg_spwq_wushuang_damage) {
                trigger.parent.jlsg_spwq_wushuang_damage = true;
                trigger.parent.baseDamage *= 2;
                trigger.parent.extraDamage *= 2;
              }
              const target = trigger.target,
                { choice } = event.cost_data;
              if (choice.includes(0) && target.countCards("hej")) {
                target.addTempSkill("jlsg_spwq_wushuang_lose");
                await target.addToExpansion("log", "giveAuto", target.getCards("hej"), target)
                  .set("gaintag", ["jlsg_spwq_wushuang"]);
              }
              if (choice.includes(1)) target.addTempSkill("baiban");
            },
          },
          lose: {
            forced: true,
            popup: false,
            charlotte: true,
            onremove: function (player) {
              let cards = player.getExpansions("jlsg_spwq_wushuang");
              if (cards.length) {
                player.gain(cards, "draw");
                game.log(player, "收回了" + get.cnNumber(cards.length) + "张“无双”牌");
              }
            },
            mark: true,
            intro: {
              markcount: "expansion",
              mark: function (dialog, storage, player) {
                var cards = player.getExpansions("jlsg_spwq_wushuang");
                if (player.isUnderControl() || player == game.me) dialog.addAuto(cards);
                else return "共有" + get.cnNumber(cards.length) + "张牌";
              },
            },
          },
        },
        ai: {
          respondSha: true,
          skillTagFilter: function (player) {
            return !!lib.skill.jlsg_spwq_wushuang.viewAsFilter(player);
          },
          order: function (item, player) {
            return get.order({ name: "sha" }, player) - 0.1;
          },
          result: {
            target: function (player, target) {
              if (!target) return;
              var cards = player.getCards("h").slice(0);
              var names = [];
              for (var i of cards) names.add(i.name);
              if (names.length < player.hp) return 0;
              if (player.hasUnknown() && (player.identity != "fan" || !target.isZhu)) return 0;
              if (get.attitude(player, target) >= 0) return -20;
              return lib.card.sha.ai.result.target.apply(this, arguments);
            },
          },
          basic: {
            useful: [5, 3, 1],
            value: [5, 3, 1],
          },
          tag: {
            respond: 1,
            respondShan: 1,
            damage: function (card) {
              if (game.hasNature(card, "poison")) return;
              return 2;
            },
            natureDamage: function (card) {
              if (game.hasNature(card, "linked")) return 2;
            },
            fireDamage: function (card, nature) {
              if (game.hasNature(card, "fire")) return 2;
            },
            thunderDamage: function (card, nature) {
              if (game.hasNature(card, "thunder")) return 2;
            },
            poisonDamage: function (card, nature) {
              if (game.hasNature(card, "poison")) return 2;
            },
          },
        },
      },
      //貂蝉（水墨丹青）
      jlsg_smdq_lijian: {
        audio: "ext:极略/audio/skill:2",
        multitarget: true,
        complexCard: true,
        discard: false,
        enable: ["phaseUse", "chooseToRespond"],
        filter(event, player) {
          let juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
          if (event.type == "phase") {
            if (player.hasSkill("jlsg_smdq_lijian_used")) return false;
            return game.hasPlayer(cur => cur.hasUseTarget(juedou));
          }
          else if (event.getParent().name == "juedou") {
            if (!player.countCards("h", card => {
              const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
              return mod2 !== false;
            })) return false;
            return event.filterCard(get.autoViewAs({ name: "sha", isCard: false }, "unsure"), player, event);
          }
          return false;
        },
        selectTarget() {
          if (_status.event.type == "phase") return [2, 2];
          return [0, 0];
        },
        filterTarget(card, player, target) {
          let juedou = get.autoViewAs({ name: "juedou", isCard: true }, []);
          if (!ui.selected.targets.length) return target.hasUseTarget(juedou);
          return target.canUse(juedou, ui.selected.targets[0]);
        },
        targetprompt: ["先决斗", "后决斗"],
        selectCard() {
          if (_status.event.type == "phase") return [0, 0];
          return [1, 1];
        },
        filterCard(card, player, event) {
          const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
          return mod2 !== false;
        },
        check(card) {
          return 10 - get.value(card);
        },
        prompt() {
          const event = _status.event;
          if (event.type == "phase") return "离间：出牌阶段限一次，你可以令两名角色依次对对方使用决斗（不能被【无懈可击】响应），直到其中一名角色进入濒死或以此法没有造成伤害";
          return "离间：将任意手牌当【杀】打出响应【决斗】";
        },
        async content(event, trigger, player) {
          const evt = event.getParent(2);
          if (evt.type == "phase") {
            player.addTempSkill("jlsg_smdq_lijian_used", "phaseUseAfter");
            let turn = event.targets[0],
              other = event.targets[1];
            const card = get.autoViewAs({ name: "juedou", isCard: true, storage: { jlsg_smdq_lijian: true } }, []);
            player.storage.jlsg_smdq_lijian_dying = true;
            player.when({ global: "dying" })
              .filter(evt => {
                //if(!evt.getParent()?.card?.storage?.jlsg_smdq_lijian)return false;
                return event.targets.includes(evt.player);
              })
              .then(() => delete player.storage.jlsg_smdq_lijian_dying)
            while (turn.isIn() && other.isIn()) {
              const next = turn.useCard(other, card, 'nowuxie');
              await next;
              let source = other.hasHistory("sourceDamage", evt => {
                return evt.getParent("useCard") == next;
              }) || turn.hasHistory("sourceDamage", evt => {
                return evt.getParent("useCard") == next;
              });
              if (!source || !player.storage.jlsg_smdq_lijian_dying) break;
              let storage = turn;
              turn = other;
              other = storage;
            };
            delete player.storage.jlsg_smdq_lijian_dying
          }
          else {
            const card = get.autoViewAs({ name: "sha", isCard: false, }, event.cards);
            delete evt.result.skill;
            delete evt.result.used;
            evt.result.card = card;
            evt.result.cards = event.cards;
            evt.redo();
          }
        },
        subSkill: {
          used: {
            charlotte: true,
            sub: true,
            sourceSkill: "jlsg_smdq_lijian",
          },
        },
        ai: {
          expose: 0.4,
          threaten: 4.8,
          order: 8,
          preSha: true,
          respondSha: true,
          skillTagFilter: function (player, tag, arg) {
            if (!player.countCards("h")) return false;
            if (arg == "use") return false;
            return true;
          },
          result: {
            target: function (player, target) {
              let card = get.autoViewAs({ name: "juedou", isCard: true, storage: { jlsg_smdq_lijian: true } }, []);
              if (!ui.selected.targets.length) {
                return Math.sign(get.attitude(player, target)) * (target.getUseValue(card) > 0 ? target.getUseValue(card) : -1);
              }
              return get.effect(target, card, ui.selected.targets[0], target);
            },
          },
        },
      },
      jlsg_smdq_biyue: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "phaseJieshuBegin" },
        check(event, player) {
          const targets = game.filterPlayer(cur => cur != player);
          let num = targets.reduce((n, t) => n + get.effect(t, { name: "shunshou_copy" }, player, player), 0);
          if (Array.from(ui.discardPile.childNodes).length) num += 1;
          if (_status.pileTop) num += 1;
          return num > 0;
        },
        async content(event, trigger, player) {
          const targets = game.filterPlayer(cur => cur != player),
            cards = [];
          let position = ["h", "e", "j"];
          for (let target of targets) {
            for (let i of position) {
              let cardx = { shown: [], hide: [] };
              if (target.countGainableCards(player, i)) {
                let card = target.getGainableCards(player, i).randomGet();
                if (i == "h") cardx.hide.add(card);
                else cardx.shown.add(card);
                cards.add(card);
              }
              if (cardx.shown.length) target.$give(cardx.shown, player);
              if (cardx.hide.length) target.$giveAuto(cardx.hide, player);
            };
          };
          if (_status.pileTop) {
            let card = Array.from(ui.cardPile.childNodes).randomGet();
            game.log(player, "从牌堆中获得了一张牌");
            player.$drawAuto([card], player);
            cards.add(card);
          }
          if (Array.from(ui.discardPile.childNodes).length) {
            let card = Array.from(ui.discardPile.childNodes).randomGet();
            game.log(player, "从弃牌堆中获得了一张牌");
            player.$drawAuto([card], player);
            cards.add(card);
          }
          if (!cards.length) return;
          await game.loseAsync({
            gain_list: [[player, cards]],
            cards: cards,
          }).setContent("gaincardMultiple");
          await game.delayx();
        },
      },
      jlsg_gygs_angyang: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: "useCardToPlayered",
          target: "useCardToTargeted",
        },
        filter(event, player, name) {
          if (!["sha", "juedou"].includes(event.card.name)) return false;
          let giver;
          if (name == "useCardToPlayered") {
            if (event.targets.length != 1) return false;
            giver = event.target;
          }
          else giver = event.player;
          return giver.countGainableCards(player, "h");
        },
        async cost(event, trigger, player) {
          let giver;
          if (event.triggername == "useCardToPlayered") giver = trigger.target;
          else giver = trigger.player;
          let name = ["sha", "juedou"].filter(i => trigger.card.name != i)[0];
          const card = get.autoViewAs({ name }, []);
          event.result = await player.gainPlayerCard("h", giver)
            .set("prompt", get.prompt("jlsg_gygs_angyang", giver))
            .set("prompt2", lib.translate["jlsg_gygs_angyang_info"])
            .set("ai", () => {
              if (get.event("check")) return get.event().getRand();
              return false;
            })
            .set("check", (function () {
              const gain = get.effect(giver, { name: "shunshou_copy2" }, player, player),
                use = get.effect(giver, card, player, player);
              if (giver.countGainableCards(player, "h") > 1) return gain + use > 0;
              else return gain > 0;
            })())
            .set("logSkill", ["jlsg_gygs_angyang", giver])
            .set("chooseonly", true)
            .forResult();
          if (event.result) {
            event.result.targets = [giver];
            event.result.skill_popup = false;
            event.result.cost_data = { card };
          }
        },
        async content(event, trigger, player) {
          const { targets: [target], cards, cost_data: { card } } = event;
          await player.gain(cards, target, "bySelf");
          player.when({ global: "useCardAfter" })
            .filter(evt => evt.card == trigger.card)
            .step(async (event, trigger, player) => {
              if (!target.countCards("h")) return;
              if (player.canUse(card, target, false)) await player.useCard(card, target, false);
            });
        },
        ai: {
          effect: {
            target(card, player, target) {
              if (!["sha", "juedou"].includes(card.name)) return;
              if (player.countGainableCards(target, "h")) return [1, 0.5, 1, -0.5];
            },
            player(card, player, target) {
              if (!["sha", "juedou"].includes(card.name)) return;
              if (target.countGainableCards(player, "h")) return [1, 0.5, 1, -0.5];
            },
          }
        },
      },
      jlsg_gygs_weifeng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseZhunbeiBegin" },
        filter(event, player) {
          if (event.player == player) return false;
          return player.canCompare(event.player);
        },
        check(event, player) {
          return get.attitude(player, event.player) < 0;
        },
        logTarget: "player",
        async content(event, trigger, player) {
          const card = get.autoViewAs({ name: "sha" }, []),
            { player: target } = trigger;
          const { result } = await player.chooseToCompare(target);
          if (result.winner == player) {
            await player.draw(2);
            if (player.canUse(card, target, false)) await player.useCard(card, target, false);
          }
          else {
            const bool = player.chooseBool(`威风：是否令${get.translation(target)}摸两张牌并视为对你使用一张【杀】？`)
              .set("ai", (event, player) => {
                const trigger = event.getTrigger();
                const target = trigger.player;
                const draw = get.effect(target, { name: "draw" }, player, player),
                  sha = get.effect(player, get.autoViewAs({ name: "sha" }, []), target, player);
                return draw + sha > 0;
              })
              .forResultBool();
            if (bool) {
              await target.draw(2);
              if (target.canUse(card, player, false)) await target.useCard(card, player, false);
            }
          }
        },
      },
    },
    translate: {
      jlsg_skpf: '极略皮肤',

      jlsgsk_jdjg_sunshangxiang: 'SPF孙尚香',
      jlsgsk_jdjg_sunshangxiang_ab: '孙尚香',
      jlsgsk_syqj_guanyu: 'SPF关羽',
      jlsgsk_syqj_guanyu_ab: '关羽',
      jlsgsk_sslh_zhenji: 'SPF甄姬',
      jlsgsk_sslh_zhenji_ab: '甄姬',
      jlsgsk_spwq_lvbu: 'SPF吕布',
      jlsgsk_spwq_lvbu_ab: '吕布',
      jlsgsk_smdq_diaochan: "SPF貂蝉",
      jlsgsk_smdq_diaochan_ab: "貂蝉",
      jlsgsk_gygs_sunce: "SPF孙策",
      jlsgsk_gygs_sunce_ab: "孙策",

      jlsg_jieyin: '结姻',
      jlsg_jieyin_info: '出牌阶段限一次，你可以弃置一张牌并选择一名其他角色，你与该角色中未受伤的角色摸两张牌，已受伤的角色回复1点体力，若没有角色以此法摸牌，此技能视为未发动过。',
      jlsg_xiaoji: '枭姬',
      jlsg_xiaoji_info: '当你失去装备区里的一张牌后，你可以摸一张牌，然后可以根据失去牌的类型执行以下效果：武器牌，对一名其他角色造成1点伤害；防具牌或奇门牌，摸两张牌；坐骑牌，弃置其他角色至多两张牌。',
      jlsg_syqj_wusheng: '武圣',
      jlsg_syqj_wusheng2: '武圣',
      jlsg_syqj_wusheng_info: '你可以将红色牌当【杀】使用或打出，以此法使用的【杀】指定目标后，你摸一张牌并弃置至多三张手牌，若如此做，目标角色弃置X张牌，此【杀】的伤害+X，若此时是你的出牌阶段，你于此阶段内使用【杀】的次数上限+X(X为你弃置的牌数)。',
      jlsg_sslh_luoshen: '洛神',
      jlsg_sslh_luoshen_info: '回合开始阶段，你可以判定并获得生效后的判定牌，重复此流程直到点数重复的判定牌生效后，你于本回合内加此牌点数的手牌上限。',
      jlsg_sslh_qingguo: '倾国',
      jlsg_sslh_qingguo_info: '当其他角色使用【杀】或非延时锦囊牌指定你为目标后，你可以弃置一张黑色手牌并令此牌对你无效，然后若你弃置的牌为黑桃牌，你可以令该角色失去1点体力。',
      jlsg_spwq_wushuang: '无双',
      jlsg_spwq_wushuang_info: '每回合限一次，当你需要使用【杀】时，你可以弃置所有手牌并摸等量的牌，视为使用之。你以此法使用的【杀】造成的伤害翻倍，无次数和距离限制，并于指定目标后选择一项: 1.将其区域里的所有牌于本回合内移出游戏; 2.令其所有非Charlotte技能于本回合内失效。若你以此法弃置的牌里有武器牌，改为依次执行两项且令此技能于本回合内可再发动一次。',
      jlsg_smdq_lijian: "离间",
      jlsg_smdq_lijian_info: "出牌阶段限一次，你可以选择两名角色，从先选择的角色开始，其轮流视为对对方使用【决斗】（不能被【无懈可击】响应），直到其中一名角色进入濒死或以此法没有造成伤害。你可以将任意手牌当【杀】打出响应【决斗】。",
      jlsg_smdq_biyue: "闭月",
      jlsg_smdq_biyue_info: "结束阶段，你可以从每个不属于你的区域里随机获得一张牌。",
      jlsg_gygs_angyang: "昂扬",
      jlsg_gygs_angyang_info: "当你使用【杀】或【决斗】仅指定一名其他角色为目标后，或成为其他角色使用这些牌的目标后，你可以获得其一张手牌，若如此做，此牌结算后，若其有手牌，你视为对其使用另一种牌。",
      jlsg_gygs_weifeng: "威风",
      jlsg_gygs_weifeng_info: "其他角色的准备阶段，你可以与该角色拼点：若你赢，你摸两张牌并视为对其使用一张不计入次数的【杀】；否则，你可以令其摸两张牌并视为对你使用一张不计入次数的【杀】。",
    },

    dynamicTranslate: {},
  };
  postProcessPack(jlsg_skpf);
  return jlsg_skpf;
}