import { lib, game, ui, get, ai, _status } from '../../../../noname.js';
import postProcessPack from './postProcessPack.js';
export default function () {
  var jlsg_soul = {
    name: 'jlsg_soul',
    connect: true,
    character: {
      jlsgsoul_caocao: ['male', 'shen', 3, ['jlsg_guixin', 'jlsg_feiying'], ['wei']],
      jlsgsoul_sunquan: ['male', 'shen', 4, ['jlsg_huju'], ['wu']],
      jlsgsoul_jiaxu: ['male', 'shen', 3, ['jlsg_yanmie', 'jlsg_shunshi'], ['wei']],
      jlsgsoul_liubei: ['male', 'shen', 4, ['jlsg_junwang', 'jlsg_jizhao'], ['shu']],
      jlsgsoul_zhugeliang: ['male', 'shen', 3, ['jlsg_qixing', 'jlsg_kuangfeng', 'jlsg_dawu'], ['shu', 'name:诸葛|亮']],
      jlsgsoul_sp_zhugeliang: ['male', 'shen', 7, ['jlsg_yaozhi', 'jlsg_xingyun'], ['shu', 'name:诸葛|亮']],
      jlsgsoul_simayi: ['male', 'shen', 3, ['jlsg_jilve', 'jlsg_tongtian'], ['wei', 'name:司马|懿']],
      jlsgsoul_sp_simayi: ['male', 'shen', 3, ['jlsg_yingshi', 'jlsg_langxi', 'jlsg_shenyin'], ['wei']],
      jlsgsoul_luxun: ['male', 'shen', 3, ['jlsg_jieyan', 'jlsg_fenying'], ['wu']],
      jlsgsoul_lvbu: ['male', 'shen', 5, ['jlsg_kuangbao', 'jlsg_wumou', 'jlsg_wuqian', 'jlsg_shenfen'], ['qun']],
      jlsgsoul_sp_lvbu: ['male', 'shen', 2, ['jlsg_luocha', 'jlsg_shajue', 'jlsg_guiqu'], ['qun', 'fan']],
      jlsgsoul_guanyu: ['male', 'shen', 5, ['jlsg_wushen', 'jlsg_suohun'], ['shu']],
      jlsgsoul_zhaoyun: ['male', 'shen', 4, ['jlsg_juejing', 'jlsg_longhun'], ['shu']],
      jlsgsoul_zhangliao: ['male', 'shen', 4, ['jlsg_nizhan', 'jlsg_cuifeng', 'jlsg_weizhen'], ['wei']],
      jlsgsoul_sp_zhangliao: ['male', 'shen', 4, ['jlsg_fengying', 'jlsg_zhiti'], ['wei']],
      jlsgsoul_huangyueying: ['female', 'shen', 3, ['jlsg_zhiming', 'jlsg_suyin'], ['shu']],
      jlsgsoul_sp_huangyueying: ['female', 'shen', 3, ['jlsg_tiangong', 'jlsg_linglong'], ['shu']],
      jlsgsoul_zhangjiao: ['male', 'shen', 3, ['jlsg_dianjie', 'jlsg_shendao', 'jlsg_leihun'], ['qun', 'fan']],
      jlsgsoul_sp_zhangjiao: ['male', 'shen', 3, ['jlsg_yinyang_s', 'jlsg_dingming'], ['qun', 'fan']],
      jlsgsoul_lvmeng: ['male', 'shen', 3, ['jlsg_shelie', 'jlsg_gongxin'], ['wu']],
      jlsgsoul_guojia: ['male', 'shen', 3, ['jlsg_tianqi', 'jlsg_tianji'], ['wei']],
      jlsgsoul_diaochan: ['female', 'shen', 3, ['jlsg_tianzi', 'jlsg_meixin'], ['qun', 'name:null|null']],
      jlsgsoul_sp_diaochan: ['female', 'shen', 1, ['jlsg_lihun', 'jlsg_jueshi'], ['qun', 'name:null|null']],
      jlsgsoul_zhangfei: ['male', 'shen', 4, ['jlsg_shayi', 'jlsg_zhenhun'], ['shu']],
      jlsgsoul_simahui: ['male', 'shen', 3, ['jlsg_zhitian', 'jlsg_yinshi'], ['qun', 'name:司马|徽']],
      jlsgsoul_sunshangxiang: ['female', 'shen', 3, ['jlsg_xianzhu', 'jlsg_liangyuan'], ['shu']],
      jlsgsoul_ganning: ['male', 'shen', 4, ['jlsg_lvezhen', 'jlsg_youlong'], ['wu']],
      jlsgsoul_sp_ganning: ['male', 'shen', 4, ['jlsg_jieying', 'jlsg_jinlong'], ['wu']],
      jlsgsoul_xiahoudun: ['male', 'shen', 5, ['jlsg_danjing', 'jlsg_zhonghun'], ['wei', 'name:夏侯|惇']],
      jlsgsoul_dianwei: ['male', 'shen', 6, ['jlsg_zhiji'], ['wei']],
      jlsgsoul_huatuo: ['male', 'shen', 3, ['jlsg_yuanhua', 'jlsg_guiyuan', 'jlsg_chongsheng'], ['qun']],
      jlsgsoul_zhouyu: ['male', 'shen', 4, ['jlsg_qinyin', 'jlsg_yeyan'], ['wu']],
      jlsgsoul_machao: ['male', 'shen', 4, ['jlsg_qianqi', 'jlsg_juechen'], ['shu']],
      jlsgsoul_zhenji: ['female', 'shen', 3, ['jlsg_shenfu'], ['wei']],
      jlsgsoul_huanggai: ['male', 'shen', 6, ['jlsg_lianti', 'jlsg_yanlie'], ['wu']],
      jlsgsoul_xuzhu: ['male', 'shen', 5, ['jlsg_huchi', 'jlsg_xiejia'], ['wei']],
      jlsgsoul_daqiao: ['female', 'shen', 3, ['jlsg_wangyue', 'jlsg_luoyan'], ['wu', 'name:桥|null']],
      jlsgsoul_huangzhong: ['male', 'shen', 4, ['jlsg_liegong'], ['shu']],
      jlsgsoul_xiaoqiao: ['female', 'shen', 3, ['jlsg_xingwu', 'jlsg_chenyu'], ['wu', 'name:桥|null']],
      jlsgsoul_caoren: ['male', 'shen', 8, ['jlsg_bamen', 'jlsg_gucheng'], ['wei']],
      jlsgsoul_caopi: ['male', 'shen', 3, ['jlsg_chuyuan', 'jlsg_dengji'], ['wei']],

      jlsgsoul_pangtong: ["male", "shen", 3, ["jlsg_qifeng", "jlsg_lunce"], ["shu", "name:庞|统"]],
      jlsgsoul_sp_zhaoyun: ["male", "shen", 1, ["jlsg_qianyuan", "jlsg_hualong"], ["shu", "name:赵|云"]],
      jlsgsoul_sp_sunshangxiang: ["female", "shen", 3, ["jlsg_zhuxing", "jlsg_lingze"], ["wu", "name:孙|null"]],
      jlsgsoul_caiwenji: ["female", "shen", 3, ["jlsg_hanshuang", "jlsg_liluan"], ["qun", "name:蔡|琰"]],
      jlsgsoul_sp_guanyu: ["male", "shen", 4, ["jlsg_zhanyue", "jlsg_fengtian"], ["shu", "name:关|羽"]],
    },
    characterIntro: {},
    characterTitle: {
      jlsgsoul_pangtong: "凤唳九天",
      jlsgsoul_sp_zhaoyun: "破渊追天",
      jlsgsoul_sp_sunshangxiang: "星流霆击",
      jlsgsoul_caiwenji: "霜弦哀世",
      jlsgsoul_sp_guanyu: "青龙",
    },
    skill: {
      jlsg_guixin: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'damageEnd' },
        check: function (event, player) {
          if (player.isTurnedOver()) return true;
          if (game.dead.length >= 2) return true;
          var num = game.countPlayer(function (current) {
            if (current.countCards('he') && current != player && get.attitude(player, current) <= 0) {
              return true;
            }
            if (current.countCards('j') && current != player && get.attitude(player, current) > 0) {
              return true;
            }
          });
          return num >= 2;
        },
        content: function () {
          "step 0"
          event.num2 = trigger.num;
          "step 1"
          var targets = game.filterPlayer();
          targets.remove(player);
          targets.sort(lib.sort.seat);
          event.targets = targets;
          event.num = 0;
          player.line(targets, 'green');
          "step 2"
          if (num < event.targets.length) {
            var hej = event.targets[num].getCards('hej')
            if (hej.length) {
              //				var card='hej';
              player.gainPlayerCard('hej', event.targets[num], true);
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
          "step 3"
          player.draw(game.dead.length);
          player.turnOver();
          "step 4"
          event.num2--;
          if (event.num2 > 0) {
            player.chooseBool(get.prompt2("jlsg_guixin"));
          }
          else {
            event.finish();
          }
          "step 5"
          if (result.bool) {
            player.logSkill('jlsg_guixin');
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
              if (get.tag(card, 'damage')) {
                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                if (target.hp == 1) return 0.8;
                if (target.isTurnedOver()) return [0, 3];
                var num = game.countPlayer(function (current) {
                  if (current.countCards('he') && current != player && get.attitude(player, current) <= 0) {
                    return true;
                  }
                  if (current.countCards('j') && current != player && get.attitude(player, current) > 0) {
                    return true;
                  }
                });
                if (num > 2) return [0, 1];
                if (num == 2) return [0.5, 1];
              }
            }
          }
        }
      },
      jlsg_feiying: {
        mod: {
          targetInRange: function (card, player, target, now) {
            if (!player.isTurnedOver() && card.name == 'sha')
              return true;
          },
          targetEnabled: function (card, player, target, now) {
            if (target.isTurnedOver() && card.name == 'sha')
              return false;
          },
        },
      },
      jlsg_huju: {
        audio: "ext:极略/audio/skill:true",
        trigger: { global: 'phaseBegin' },
        derivation: ['zhiheng', 'jlsg_hufu'],
        filter: function (event, player) {
          return event.player != player;
        },
        forced: true,
        content: function () {
          player.draw();
        },
        group: ['jlsg_huju2'],
      },
      jlsg_huju2: {
        // audio: "ext:极略/audio/skill:true",
        trigger: { player: 'phaseBegin' },
        filter: function (event, player) {
          var num = player.countCards('h');
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].num('h') > num)
              return false;
          }
          return true;
        },
        forced: true,
        content: function () {
          "step 0"
          player.chooseControl('选项一', '选项二', function () {
            if (player.hp <= 2 && !player.countCards('h', function (card) {
              return get.tag(card, 'recover');
            })) return '选项二';
            return '选项一';
          }).set('prompt', '虎踞<br><br><div class="text">1：失去1点体力</div><br><div class="text">2：减1点体力上限，失去【虎踞】，获得【制衡】和【虎缚】</div></br>');
          "step 1"
          if (result.control == '选项一') {
            game.trySkillAudio('jlsg_hujuStill');
            player.loseHp();
          } else {
            player.logSkill('jlsg_hujuWake');
            player.loseMaxHp();
            player.changeSkills(['zhiheng', 'jlsg_hufu'], ['jlsg_huju']);
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
        inherit: 'jlsg_huju2',
        unique: true,
        charlotte: true,
      },
      jlsg_hufu: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return player != target && target.countCards('e');
        },
        content: function () {
          target.chooseToDiscard(target.countCards('e'), true, 'he');
        },
        ai: {
          expose: 0.3,
          order: 10,
          result: {
            target: function (player, target) {
              return -target.countCards('e');
            }
          }
        }
      },
      jlsg_yanmie: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countCards('he', { suit: 'spade' }) > 0;
        },
        check: function (card) {
          return 7 - get.value(card)
        },
        filterCard: function (card) {
          return get.suit(card) == 'spade';
        },
        position: 'he',
        filterTarget: function (card, player, target) {
          return player != target && target.countCards('h');
        },
        content: function () {
          "step 0"
          var num = target.countCards('h');
          target.discard(target.get('h'));
          target.draw(num);
          target.showHandcards();
          "step 1"
          var cards = target.getCards('h', function (card) {
            return get.type(card) != 'basic';
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
              return -target.countCards('h') - 1;
            }
          }
        }
      },
      jlsg_shunshi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { target: 'useCardToBegin' },
        filter: function (event, player) {
          return event.player != player && get.type(event.card) == 'basic'
            && game.hasPlayer(p => p != player && p != event.player);
        },
        direct: true,
        content: function () {
          "step 0"
          player.chooseTarget('是否发动【顺世】?', [1, 3], function (card, player, target) {
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
          }
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_shunshi', result.targets);
            player.draw();
            game.asyncDraw(result.targets);
            for (var i = 0; i < result.targets.length; i++) {
              trigger.targets.push(result.targets[i]);
              game.log(result.targets[i], '成为了额外目标');
            }
          }
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (player == target) return;
              if (card.name == 'tao') {
                return [1, 2];
              }
              if (card.name == 'sha') {
                return [1, 0.74];
              }
            },
          }
        }
      },
      jlsg_junwang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: ['phaseUseBegin', 'phaseUseEnd'] },
        forced: true,
        filter: function (event, player) {
          return event.player != player && event.player.countCards('h') >= player.countCards('h');
        },
        content: function () {
          "step 0"
          trigger.player.chooseCard('交给' + get.translation(player) + '一张手牌', true).ai = function (card) {
            if (get.attitude(trigger.player, player) > 0) {
              return get.value(card);
            } else {
              return -get.value(card);
            }
          }
          "step 1"
          if (result.bool) {
            player.gain(result.cards[0]);
            trigger.player.$give(1, player);
          }
        }
      },
      jlsg_jizhao: {
        audio: "ext:极略/audio/skill:2",
        enable: "phaseUse",
        filterCard: true,
        selectCard: [1, Infinity],
        filter: function () {
          for (var i = 0; i < game.players.length; i++) {
            if (!game.players[i].storage.jlsg_jizhao1)
              return true;
          }
          return false;
        },
        discard: false,
        // prepare: "give2",
        check: function (card) {
          if (ui.selected.cards.length > 1) return 0;
          if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') return 0;
          if (ui.selected.cards.length && ui.selected.cards[0].name == 'shandian') return 0;
          if (!ui.selected.cards.length && card.name == 'du') return 20;
          if (!ui.selected.cards.length && card.name == 'shandian') return 18;
          if (!ui.selected.cards.length && card.name == 'shan') return 14;
          if (!ui.selected.cards.length && card.name == 'jiedao') return 16;
          return 0;
        },
        filterTarget: function (card, player, target) {
          return !target.storage.jlsg_jizhao1 && player != target;
        },
        content: function () {
          target.gain(cards, player, 'giveAuto');
          // player.$give(cards, target);
          target.addTempSkill('jlsg_jizhao_zhao', { player: 'dieAfter' });
          target.storage.jlsg_jizhao1 = true;
          target.storage.jlsg_jizhao2 = player;
        },
        ai: {
          order: 4,
          result: {
            target: function (card, player, target) {
              if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                return -10;
              }
              if (ui.selected.cards.length && ui.selected.cards[0].name == 'shandian') {
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
      jlsg_jizhao_zhao: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: "phaseEnd",
        },
        mark: true,
        marktext: "<font color=red>诏</font>",
        direct: true,
        content: function () {
          if (!player.getStat('damage')) {
            player.storage.jlsg_jizhao2.logSkill('jlsg_jizhao', player);
            player.storage.jlsg_jizhao1 = false;
            player.damage(player.storage.jlsg_jizhao2);
            player.removeSkill("jlsg_jizhao_zhao");
            delete player.storage.jlsg_jizhao2;
          }
        },
        intro: {
          content: "该角色的回合未造成伤害，回合结束将受到你的1点伤害并弃置该标记",
        },
      },
      jlsg_qixing: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          global: 'phaseBefore',
          player: 'enterGame'
        },
        forced: true,
        marktext: '星',
        filter: function (event, player) {
          return event.name != 'phase' || game.phaseNumber == 0;
        },
        content: function () {
          "step 0"
          player.gain(get.cards(7))._triggered = null;
          "step 1"
          if (player == game.me) {
            game.addVideo('delay', null);
          }
          player.chooseCard('选择七张牌作为「星」', 7, true).ai = function (card) {
            return get.value(card);
          };
          "step 2"
          player.addToExpansion(result.cards, player, 'giveAuto').gaintag.add(event.name);
        },
        mark: true,
        intro: {
          mark: function (dialog, content, player) {
            var content = player.getExpansions('jlsg_qixing');
            if (content && content.length) {
              if (player == game.me || player.isUnderControl()) {
                dialog.add(content);
              } else {
                return '共有' + get.cnNumber(content.length) + '张「星」';
              }
            }
          },
          content: function (content, player) {
            var content = player.getExpansions('jlsg_qixing');
            if (content && content.length) {
              if (player == game.me || player.isUnderControl()) {
                return get.translation(content);
              }
              return '共有' + get.cnNumber(content.length) + '张「星」';
            }
          }
        },
        group: ['jlsg_qixing2'],
      },
      jlsg_qixing2: {
        trigger: { player: 'phaseDrawAfter' },
        audio: "ext:极略/audio/skill:true",
        direct: true,
        filter: function (event, player) {
          return player.getExpansions('jlsg_qixing').length;
        },
        content: function () {
          "step 0"
          player.chooseCard(get.prompt('jlsg_qixing'), [1, 3]).ai = function (card) {
            return 1;
          };
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_qixing');
            player.addToExpansion(result.cards, player, 'giveAuto').gaintag.add('jlsg_qixing');
            event.num = result.cards.length;
          } else {
            event.finish();
          }
          "step 2"
          player.chooseCardButton(player.getExpansions('jlsg_qixing'), '选择1-2张牌作为手牌', [1, 2], true).ai = function (button) {
            if (player.skipList.includes('phaseUse') && button.link != 'du') {
              return -get.value(button.link);
            }
            return get.value(button.link);
          }
          if (player == game.me && _status.auto) {
            game.delay(0.5);
          }
          "step 3"
          //  player.gain(result.links)._triggered=null;
          player.gain(result.links)._triggered = null;
          player.syncStorage('jlsg_qixing');
          if (player == game.me && _status.auto) {
            game.delay(0.5);
          }
        }
      },
      jlsg_kuangfeng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        direct: true,
        filter: function (event, player) {
          return player.getExpansions('jlsg_qixing').length;
        },
        content: function () {
          "step 0"
          var clearKuangfeng = jlsg.findPlayerBySkillName('jlsg_kuangfeng2');
          if (clearKuangfeng) {
            clearKuangfeng.removeSkill('jlsg_kuangfeng2');
            clearKuangfeng.popup('jlsg_kuangfeng2');
          }
          player.chooseTarget('选择一名角色获得狂风标记').ai = function (target) {
            if (player.getExpansions('jlsg_qixing').length > 3) return jlsg.isWeak(target) && jlsg.isEnemy(player, target);
            return -1;
          }
          "step 1"
          if (result.bool) {
            result.targets[0].addSkill('jlsg_kuangfeng2');
            result.targets[0].popup('jlsg_kuangfeng');
            player.logSkill('jlsg_kuangfeng', result.targets, 'fire');
            player.chooseCardButton('弃置1枚「星」', player.getExpansions('jlsg_qixing'), true);
          } else {
            event.finish();
          }
          "step 2"
          player.discard(result.links);
        },
      },
      jlsg_kuangfeng2: {
        unique: true,
        charlotte: true,
        trigger: { player: 'damageBegin1' },
        mark: true,
        marktext: '风',
        intro: {
          content: '已获得「风」标记'
        },
        forced: true,
        content: function () {
          var jlsg_zhugeliang = jlsg.findPlayerBySkillName('jlsg_kuangfeng');
          if (jlsg_zhugeliang) {
            if (trigger.nature) {
              if (trigger.nature == 'fire') {
                jlsg_zhugeliang.line(player, 'fire');
                trigger.num++;
              }
              if (trigger.nature == 'thunder') {
                jlsg_zhugeliang.line(player, 'thunder');
                player.chooseToDiscard(2, true);
              }
            } else {
              if (jlsg_zhugeliang && jlsg_zhugeliang.getExpansions('jlsg_qixing')) {
                jlsg_zhugeliang.line(player, 'water');
                var card = get.cards();
                jlsg_zhugeliang.addToExpansion(card, jlsg_zhugeliang, 'draw').gaintag.add('jlsg_qixing');
                game.log(jlsg_zhugeliang, '将牌堆顶的一张牌置入「星」');
              }
            }
          }
        },
        ai: {
          threaten: 3,
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'fireDamage')) return 1.5;
              if (get.tag(card, 'thunderDamage')) return 1.5;
            }
          }
        }
      },
      jlsg_dawu: {
        trigger: { player: 'phaseJieshuBegin' },
        priority: 1,
        direct: true,
        filter: function (event, player) {
          return player.getExpansions('jlsg_qixing').length;
        },
        audio: "ext:极略/audio/skill:2",
        content: function () {
          "step 0"
          player.chooseTarget('选择角色获得大雾标记',
            [1, Math.min(game.players.length, player.getExpansions('jlsg_qixing').length)]).ai = function (target) {
              if (target.isMin()) return 0;
              if (target.hasSkill('biantian2')) return 0;
              var att = get.attitude(player, target);
              if (att >= 4) {
                if (target.hp == 1 && target.maxHp > 2) return att;
                if (target.hp == 2 && target.maxHp > 3 && target.countCards('he') == 0) return att * 0.7;
                if (jlsg.isWeak(target)) return att * 1.1;
                return 0;
              }
              return -1;
            }
          "step 1"
          if (result.bool) {
            var length = result.targets.length;
            for (var i = 0; i < length; i++) {
              result.targets[i].addSkill('jlsg_dawu2');
              result.targets[i].popup('jlsg_dawu');
            }
            player.logSkill('jlsg_dawu', result.targets, 'thunder');
            player.chooseCardButton('弃置' + get.cnNumber(length) + '枚「星」', length, player.getExpansions('jlsg_qixing'), true);
          } else {
            event.finish();
          }
          "step 2"
          player.discard(result.links);
        },
        group: ['jlsg_dawu_remove'],
        subSkill: {
          remove: {
            trigger: { player: ['phaseBegin', 'dieBegin'] },
            forced: true,
            charlotte: true,
            popup: false,
            silent: true,
            content: function () {
              for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].hasSkill('jlsg_dawu2')) {
                  game.players[i].removeSkill('jlsg_dawu2');
                  game.players[i].popup('jlsg_dawu');
                }
                if (game.players[i].hasSkill('jlsg_kuangfeng2')) {
                  game.players[i].removeSkill('jlsg_kuangfeng2');
                  game.players[i].popup('jlsg_kuangfeng2');
                }
              }
            }
          }
        }
      },
      jlsg_dawu2: {
        trigger: { player: 'damageBefore' },
        filter: function (event) {
          if (event.nature != 'thunder') return true;
          return false;
        },
        marktext: '雾',
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
              if (get.tag(card, 'damage') && !get.tag(card, 'thunderDamage')) return [0, 0];
            }
          },
        },
        intro: {
          content: '已获得大雾标记'
        }
      },
      jlsg_yaozhi: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: ['phaseBegin', 'damageEnd', 'phaseJieshuBegin'],
        },
        frequent: true,
        content: function () {
          'step 0'
          if (!player.storage.jlsg_yaozhi) player.storage.jlsg_yaozhi = [];
          player.draw();
          'step 1'
          if (!_status.characterlist) {
            lib.skill.pingjian.initList();
          }
          var list = [];
          var skills = [];
          _status.characterlist.randomSort();
          var name2 = [];
          if (event.triggername == 'phaseBegin') {
            name2.push('phaseZhunbeiBegin');
            name2.push(event.triggername);
          } else { name2.push(event.triggername); }
          for (var i = 0; i < _status.characterlist.length; i++) {
            var name = _status.characterlist[i];
            if (name.indexOf('zuoci') != -1 || name.indexOf('xushao') != -1 || name == 'jlsgsoul_sp_xushao') continue;
            if (!get.character(name)) continue;
            var skills2 = get.character(name)[3];
            for (var j = 0; j < skills2.length; j++) {
              if (player.hasSkill(skills2[j])) continue;
              if (skills.includes(skills2[j])) continue;
              if (player.storage.jlsg_yaozhi.includes(skills2[j])) continue;
              var list2 = [skills2[j]];
              game.expandSkills(list2);
              for (var k = 0; k < list2.length; k++) {
                var info = lib.skill[list2[k]];
                if (!info || !info.trigger || !info.trigger.player || info.silent || info.limited || info.juexingji || info.zhuanhuanji || info.hiddenSkill || info.dutySkill) continue;
                for (var y = 0; y < name2.length; y++) {
                  if (info.trigger.player == name2[y] || Array.isArray(info.trigger.player) && info.trigger.player.includes(name2[y])) {
                    if (info.init || info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) continue;
                    if (info.filter) {
                      try {
                        var bool = info.filter(trigger, player, name2[y]);
                        if (!bool) continue;
                      }
                      catch (e) {
                        continue;
                      }
                    }
                    list.add(name);
                    skills.add(skills2[j]);
                    break;
                  }
                }
              }
              if (skills.includes(skills2[j])) {
                break;
              }
            }
            if (skills.length > 2) break;
          }
          player.chooseControl(skills).set('dialog', ['请选择要发动的技能', [list, 'character']]).set('ai', function () { return 0 });
          'step 2'
          player.storage.jlsg_yaozhi.add(result.control);
          var removeT = 'damageAfter';
          if (event.triggername == 'phaseJieshuBegin') {
            removeT = 'phaseJieshuEnd';
          }
          else if (event.triggername == 'phaseBegin') {
            removeT = 'phaseZhunbeiEnd';
          }
          player.addTempSkill(result.control, removeT);
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          effect: {
            target(card, player, target) {
              if (get.tag(card, 'damage')) {
                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                if (!target.hasFriend()) return;
                let num = 1;
                if (get.attitude(player, target) > 0) {
                  if (player.needsToDiscard()) num = 0.7;
                  else num = 0.5;
                }
                if (target.hp >= 4) return [1, num * 2];
                if (target.hp == 3) return [1, num * 1.5];
                if (target.hp == 2) return [1, num * 0.5];
              }
            }
          }
        },
        group: 'jlsg_yaozhi_use',
      },
      jlsg_yaozhi_use: {
        sourceSkill: "jlsg_yaozhi",
        audio: 'jlsg_yaozhi',
        enable: 'phaseUse',
        usable: 1,
        content: function () {
          'step 0'
          if (!player.storage.jlsg_yaozhi) player.storage.jlsg_yaozhi = [];
          player.draw();
          'step 1'
          var list = [];
          var skills = [];
          if (!_status.characterlist) {
            lib.skill.pingjian.initList();
          }
          _status.characterlist.randomSort();
          for (var i = 0; i < _status.characterlist.length; i++) {
            var name = _status.characterlist[i];
            if (name.indexOf('zuoci') != -1 || name.indexOf('xushao') != -1 || name == 'jlsgsoul_sp_xushao') continue;
            var skills2 = get.character(name)[3];
            for (var j = 0; j < skills2.length; j++) {
              if (skills.includes(skills2[j])) continue;
              if (player.hasSkill(skills2[j])) continue;
              if (player.storage.jlsg_yaozhi.includes(skills2[j])) continue;
              if (lib.skill.pingjian.phaseUse_special.includes(skills2[j])) {
                list.add(name);
                skills.add(skills2[j]);
                continue;
              }
              var list2 = [skills2[j]];
              game.expandSkills(list2);
              for (var k = 0; k < list2.length; k++) {
                var info = lib.skill[list2[k]];
                if (!info || !info.enable || info.viewAs || info.limited || info.juexingji || info.zhuanhuanji || info.hiddenSkill || info.dutySkill) continue;
                if (info.enable == 'phaseUse' || Array.isArray(info.enable) && info.enable.includes('phaseUse')) {
                  if (info.init || info.onChooseToUse || info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) continue;
                  if (info.filter) {
                    try {
                      var bool = info.filter(event.getParent(2), player);
                      if (!bool) continue;
                    }
                    catch (e) {
                      continue;
                    }
                  }
                  list.add(name);
                  skills.add(skills2[j]);
                  break;
                }
              }
              if (skills.includes(skills2[j])) break;
            }
            if (skills.length > 2) break;
          }
          player.chooseControl(skills).set('dialog', ['请选择要发动的技能', [list, 'character']]).set('ai', function () { return 0 });
          'step 2'
          if (result.control == '摸一张牌') {
            player.draw();
            return;
          }
          player.storage.jlsg_yaozhi.add(result.control);
          player.addTempSkill(result.control, 'phaseUseEnd');
          player.addTempSkill('jlsg_yaozhi_temp', 'phaseUseEnd');
          player.storage.jlsg_yaozhi_temp = result.control;
          //event.getParent(2).goto(0);
        },
        ai: { order: 10, result: { player: 1 } },
      },
      jlsg_yaozhi_temp: {
        onremove: true,
        trigger: { player: ['useSkillBegin', 'useCard1'] },
        silent: true,
        firstDo: true,
        filter: function (event, player) {
          var info = lib.skill[event.skill];
          if (!info) return false;
          if (event.skill == player.storage.jlsg_yaozhi_temp) return true;
          if (info.sourceSkill == player.storage.jlsg_yaozhi_temp || info.group == player.storage.jlsg_yaozhi_temp) return true;
          if (Array.isArray(info.group) && info.group.includes(player.storage.jlsg_yaozhi_temp)) return true;
          return false;
        },
        content: function () {
          player.removeSkill(player.storage.jlsg_yaozhi_temp);
          player.removeSkill('jlsg_yaozhi_temp');
        },
      },
      jlsg_xingyun: {
        audio: "ext:极略/audio/skill:2",
        forced: true,
        trigger: { player: 'phaseEnd' },
        content: function () {
          'step 0'
          player.loseMaxHp();
          'step 1'
          if (!player.storage.jlsg_yaozhi || !player.storage.jlsg_yaozhi.length) {
            event.finish();
            return;
          }
          var characters = [];
          var leftSkills = player.storage.jlsg_yaozhi.randomGets(16);
          var skills = [];
          for (let pack in lib.characterPack) {
            for (let c in lib.characterPack[pack]) {
              var info = lib.characterPack[pack][c]
              if (info[3].some(s => leftSkills.includes(s))) {
                characters.push(c);
                skills.push(...leftSkills.filter(s => info[3].includes(s)));
                leftSkills.remove(info[3]);
                if (!leftSkills.length) break;
              }
            };
          };
          var list = characters;
          if (player.isUnderControl()) {
            game.swapPlayerAuto(player);
          }
          var switchToAuto = function () {
            _status.imchoosing = false;
            event._result = {
              bool: true,
              skills: skills.randomGets(1),
            };
            if (event.dialog) event.dialog.close();
            if (event.control) event.control.close();
          };
          var chooseButton = function (list, skills) {
            var event = _status.event;
            if (!event._result) event._result = {};
            event._result.skills = [];
            var rSkill = event._result.skills;
            var dialog = ui.create.dialog('请选择获得的技能', [list, 'character'], 'hidden');
            event.dialog = dialog;
            var table = document.createElement('div');
            table.classList.add('add-setting');
            table.style.margin = '0';
            table.style.width = '100%';
            table.style.position = 'relative';
            for (var i = 0; i < skills.length; i++) {
              var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
              td.link = skills[i];
              table.appendChild(td);
              td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
              td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                if (_status.dragged) return;
                if (_status.justdragged) return;
                _status.tempNoButton = true;
                setTimeout(function () {
                  _status.tempNoButton = false;
                }, 500);
                var link = this.link;
                if (!this.classList.contains('bluebg')) {
                  if (rSkill.length >= 1) return;
                  rSkill.add(link);
                  this.classList.add('bluebg');
                }
                else {
                  this.classList.remove('bluebg');
                  rSkill.remove(link);
                }
              });
            }
            dialog.content.appendChild(table);
            dialog.add('　　');
            dialog.open();

            event.switchToAuto = function () {
              event.dialog.close();
              event.control.close();
              game.resume();
              _status.imchoosing = false;
            };
            event.control = ui.create.control('ok', function (link) {
              event.dialog.close();
              event.control.close();
              game.resume();
              _status.imchoosing = false;
            });
            for (var i = 0; i < event.dialog.buttons.length; i++) {
              event.dialog.buttons[i].classList.add('selectable');
            }
            game.pause();
            game.countChoose();
          };
          if (event.isMine()) {
            chooseButton(list, skills);
          }
          else if (event.isOnline()) {
            event.player.send(chooseButton, list, skills);
            event.player.wait();
            game.pause();
          }
          else {
            switchToAuto();
          }
          'step 2'
          var map = event.result || result;
          if (map && map.skills && map.skills.length) {
            player.addSkills(map.skills);
            player.storage.jlsg_yaozhi.removeArray(map.skills);
          }
          game.broadcastAll(function (list) {
            game.expandSkills(list);
            for (var i of list) {
              var info = lib.skill[i];
              if (!info) continue;
              if (!info.audioname2) info.audioname2 = {};
              info.audioname2.old_yuanshu = 'weidi';
            }
          }, map.skills);
        },
        ai: {
          halfneg: true,
          combo: 'jlsg_yaozhi',
        }
      },
      jlsg_jilve: {
        audio: "ext:极略/audio/skill:3",
        enable: 'phaseUse',
        filter: function (event, player) {
          return !player.hasSkill('jlsg_jilve2');
        },
        content: function () {
          "step 0"
          player.draw('nodelay');
          player.chooseToUse().filterCard = function (card, player) {
            return (lib.filter.cardEnabled(card, player, event.parent.parent) && lib.filter.cardUsable(card, player, event.parent.parent));
          }
          "step 1"
          if (!result.bool) {
            player.chooseToDiscard('he', true);
            player.addTempSkill('jlsg_jilve2', 'phaseAfter');
          }
        },
        ai: {
          threaten: 4,
          order: 15,
          result: {
            player: 1
          },
          effect: {
            player: function (card, player) {
              if (get.type(card) != 'basic') return [1, 3];
            }
          },
        }
      },
      jlsg_jilve2: {},
      jlsg_tongtian: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        skillAnimation: true,
        limited: true,
        position: 'he',
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
        derivation: ['zhiheng', 'guanxing', 'fankui', 'wansha'],
        content: function () {
          "step 0"
          var suits = cards.map(card => get.suit(card));
          let skills = [];
          if (suits.includes('spade')) {
            skills.push('fankui');
          }
          if (suits.includes('heart')) {
            skills.push('guanxing');
          }
          if (suits.includes('diamond')) {
            skills.push('zhiheng');
          }
          if (suits.includes('club')) {
            skills.push('wansha');
          }
          player.addSkills(skills);
          "step 1"
          player.awakenSkill('jlsg_tongtian');

        },
        ai: {
          order: 6,
          result: {
            player: function (player) {
              var cards = player.get('he');
              var suits = [];
              for (var i = 0; i < cards.length; i++) {
                if (!suits.includes(get.suit(cards[i]))) {
                  suits.push(get.suit(cards[i]));
                }
              }
              if (suits.length < 3) return -1;
              return suits.length;
            }
          }
        },
      },
      jlsg_jieyan: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'useCardToBefore' },
        direct: true,
        filter: function (event, player) {
          return player.countCards('h') > 0 && (get.type(event.card) == 'trick' || event.card.name == 'sha') && get.color(event.card) == 'red' && event.targets.length == 1;
        },
        content: function () {
          "step 0"
          var next = player.chooseToDiscard('是否对' + get.translation(trigger.target) + '发动【劫焰】？', 'h')
          next.ai = function (card) {
            if (get.attitude(player, trigger.target) < 0) {
              if (get.damageEffect(trigger.target, player, player, 'fire') >= 0) {
                return get.value(trigger.card) - get.value(card);
              }
              return 7 - get.value(card);
            }
            //if(trigger.target==player) return 10;
            return 0;
          };
          next.logSkill = ['jlsg_jieyan', trigger.target];
          "step 1"
          if (result.bool) {
            //player.logSkill('jlsg_jieyan',trigger.target);
            trigger.cancel();
            trigger.target.damage('fire', player);
          }
        },
        ai: {
          expose: 0.2,
          fireattack: true,
        }
      },
      jlsg_jieyan_buff: {
        audio: "ext:极略/audio/skill:true",
        trigger: { player: 'damageBegin' },
        forced: true,
        filter: function (event) {
          if (event.nature == 'fire') return true;
        },
        content: function () {
          trigger.cancel();
          player.draw(trigger.num);
        },
        ai: {
          nofire: true,
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'fireDamage')) {
                if (target.hp == target.maxHp) return 0;
                return [0, 2];
              }
            }
          }
        },
      },
      jlsg_fenying: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: "damageAfter" },
        frequent: true,
        filter: function (event, player) {
          return event.nature == 'fire';
        },
        content: function () {
          "step 0"
          player.draw();
          "step 1"
          let cnt = player.getHistory('useSkill', e => e.skill == event.name).length;
          player.chooseCardTarget({
            filterCard: function (card) {
              return true;
            },
            selectCard: cnt,
            filterTarget: function (card, player, target) {
              let dis = get.distance(trigger.player, target);
              return trigger.player == target || game.filterPlayer(p => p != trigger.player).every(p => get.distance(trigger.player, p) >= dis);
            },
            ai1: function (card) {
              return 7 - get.value(card);
            },
            ai2: function (target) {
              return get.damageEffect(target, player, player, 'fire');
            },
            position: 'he',
            prompt: get.prompt(event.name),
            prompt2: `弃置${get.cnNumber(cnt)}张牌并造成${get.cnNumber(trigger.num)}点火焰伤害`,
          });
          "step 2"
          if (result.bool) {
            player.discard(result.cards);
            player.line(result.targets[0], 'red');
            result.targets[0].damage('fire', trigger.num, player);
          }
        }
      },
      jlsg_kuangbao: {
        group: ['jlsg_kuangbao1'],
        audio: "ext:极略/audio/skill:1",
        trigger: {
          global: 'phaseBefore',
          player: 'enterGame',
        },
        forced: true,
        filter: function (event, player) {
          return (event.name != 'phase' || game.phaseNumber == 0);
        },
        content: function () {
          player.addMark(event.name, 2);
        },
        marktext: "暴",
        intro: {
          content: "共有#个标记",
        },
      },
      jlsg_kuangbao1: {
        trigger: { source: 'damageEnd', player: 'damageEnd' },
        forced: true,
        audio: "ext:极略/audio/skill:true",
        filter: function (event) {
          return event.num != 0;
        },
        content: function () {
          player.addMark('jlsg_kuangbao', trigger.num);
          if (trigger.source == this.trigger.player) {
            player.addMark('jlsg_kuangbao', trigger.num);
          }
        },
      },
      jlsg_wumou: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'useCard' },
        forced: true,
        filter: function (event) {
          return get.type(event.card) == 'trick';
        },
        content: function () {
          'step 0'
          if (player.storage.jlsg_kuangbao > 0) {
            player.chooseControl('选项一', '选项二').set('prompt', '无谋<br><br><div class="text">1:弃置1枚「暴」标记</div><br><div class="text">2:受到1点伤害</div></br>').ai = function () {
              if (player.storage.jlsg_kuangbao > 6) return '选项一';
              if (player.hp >= 4 && player.countCards('h', 'tao') >= 1) return '选项二';
              return Math.random() < 0.5 && '选项一';
            };
          } else {
            player.damage('nosource');
            event.finish();
          }
          'step 1'
          if (result.control == '选项一') {
            player.storage.jlsg_kuangbao--;
            player.syncStorage('jlsg_kuangbao');
          } else {
            player.damage('nosource');
          }
        },
        ai: {
          neg: true,
        },
      },
      jlsg_wuqian: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.storage.jlsg_kuangbao > 1;
        },
        content: function () {
          'step 0'
          player.removeMark('jlsg_kuangbao', 2);
          'step 1'
          player.addTempSkill('wushuang', 'phaseAfter');
          player.addTempSkill('jlsg_wuqian_buff', 'phaseAfter');
        },
        subSkill: {
          buff: {
            trigger: { source: 'damageEnd' },
            forced: true,
            popup: false,
            audio: false,
            filter: function (event) {
              return event.num != 0;
            },
            content: function () {
              player.addMark('jlsg_kuangbao');
            }
          }
        },
        ai: {
          order: 10,
          result: {
            player: function (player) {
              if (player.countCards('h', 'juedou') > 0) {
                return 2;
              }
              var ph = player.get('h');
              var num = 0;
              for (var i = 0; i < ph.length; i++) {
                if (get.tag(ph[i], 'damage')) num++;
              }
              if (num > 1) return num;
              return 0;
            }
          }
        }
      },
      jlsg_shenfen: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.storage.jlsg_kuangbao >= 6;
        },
        skillAnimation: true,
        animationColor: 'metal',
        mark: true,
        content: function () {
          "step 0"
          player.storage.jlsg_kuangbao -= 6;
          player.syncStorage('jlsg_kuangbao');
          event.targets = game.players.slice(0);
          event.targets.remove(player);
          event.targets.sort(lib.sort.seat);
          event.targets2 = event.targets.slice(0);
          "step 1"
          if (event.targets.length) {
            event.targets.shift().damage();
            event.redo();
          }
          "step 2"
          if (event.targets2.length) {
            var cur = event.targets2.shift();
            if (cur && cur.num('he')) {
              if (cur.num('e')) {
                cur.discard(cur.get('e'));
              }
              cur.chooseToDiscard('h', true, 4);
            }
            event.redo();
          }
          "step 3"
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
            }
          }
        }
      },
      jlsg_wushen: {
        mod: {
          cardname: function (card, player, name) {
            if (['sha', 'tao'].includes(card.name)) return 'juedou';
          },
        },
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'useCard' },
        forced: true,
        filter: function (event, player) {
          return event.card.name == 'juedou'
            && event.cards && event.cards.length == 1 && ['sha', 'tao'].includes(event.cards[0].name);
        },
        content: function () { },
        group: ['jlsg_wushen2'],
        ai: {
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'respondSha') && current < 0) return 1.5;
            }
          },
          order: 4,
          useful: -1,
          value: -1
        }
      },
      jlsg_wushen2: {
        audio: 'jlsg_wushen',
        forced: true,
        trigger: { source: 'damageBegin1' },
        filter: function (event) {
          return event.player.group === 'shen';
        },
        content: function () {
          trigger.num++;
        },
        ai: {
          effect: {
            player: function (card, player, target, current, isLink) {
              if (get.tag(card, 'damage') && target.group === 'shen') return [1, 0, 1, -3];
            }
          }
        }
      },
      jlsg_suohun: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: 'damageEnd',
          source: 'damageSource',
        },
        filter: function (event, player, name) {
          if (name == "damageEnd") return event.source && event.source != player;
          return event.player != player && event.player?.isIn();
        },
        forced: true,
        init: function (player) {
          for (var i = 0; i < game.players.length; i++) {
            game.players[i].storage.jlsg_suohun_mark = 0;
          }
        },
        content: function () {
          var target = trigger.source, cnt = trigger.num;
          if (trigger.source == player) {
            target = trigger.player;
            cnt = 1;
          }
          if (!target.storage.jlsg_suohun_mark) {
            target.storage.jlsg_suohun_mark = 0;
          }
          target.storage.jlsg_suohun_mark += cnt;
          target.syncStorage('jlsg_suohun_mark');
          target.markSkill('jlsg_suohun_mark');
        },
        global: ['jlsg_suohun_mark'],
        subSkill: {
          mark: {
            forced: true,
            charlotte: true,
            mark: true,
            onremove: true,
            marktext: '魂',
            intro: {
              content: '共有#个标记'
            }
          }
        },
        group: ['jlsg_suohun2'],
        ai: {
          maixie_defend: true,
        }
      },
      jlsg_suohun2: {
        skillAnimation: true,
        audio: "jlsg_suohun",
        trigger: { player: 'dyingBegin' },
        priority: 10,
        forced: true,
        filter: function (event, player) {
          return player.hp <= 0;
        },
        content: function () {
          "step 0"
          if (player.maxHp > 1) {
            player.maxHp = Math.floor(player.maxHp / 2);
            player.recover(player.maxHp - player.hp);
            player.update();
          } else {
            player.loseMaxHp();
            player.update();
          }
          "step 1"
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].storage.jlsg_suohun_mark) {
              player.line(game.players[i], 'fire');
              game.delay(1.5);
              game.players[i].damage(game.players[i].storage.jlsg_suohun_mark, player);
              game.players[i].storage.jlsg_suohun_mark = 0;
              game.players[i].unmarkSkill('jlsg_suohun_mark');
            }
          }
        },
        ai: {
          threaten: 0.9,
          effect: {
            target: function (card, player, target) {
              if (target.maxHp == 1) return;
              var num = 0;
              for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].storage.jlsg_suohun_mark && get.attitude(target, game.players[i]) <= -2) num += game.players[i].storage.jlsg_suohun_mark;
              }
              if (get.tag(card, 'damage')) {
                if (target.hp == 1) return [0, 2 * num];
                return [1, 0.5];
              }
            }
          }
        }
      },
      jlsg_juejing: {
        audio: "ext:极略/audio/skill:1",
        forced: true,
        trigger: { player: 'showCharacterEnd' },
        delay: false,
        init: function (player) {
          if (player.hasSkill('jlsg_juejing') && player.hp > 1) {
            player.useSkill('jlsg_juejing');
          };
        },
        filter: function (event, player) {
          return player.hp > 1;
        },
        check: () => false,
        content: function () {
          if (game.phaseNumber > 0) {
            game.log(player, '的体力置为1');
          }
          player.hp = 1;
          player.update();
        },
        mod: {
          maxHandcardBase: function (player, num) {
            return player.maxHp;
          },
          targetEnabled: function (card, player, target) {
            if (['tao', 'mei'].includes(card.name) && target.hp == 1) {
              return false;
            }
          },
        },
        group: ['jlsg_juejing2', 'jlsg_juejing_guard'],
        subSkill: {
          guard: {
            silent: true,
            charlotte: true,
            trigger: { player: 'changeHp' },
            firstDo: true,
            filter: function (event, player) {
              return player.hp > 1 && player.hasSkill('jlsg_juejing');
            },
            content: function () {
              player.useSkill('jlsg_juejing');
            },
          }
        },
        ai: {
          effect: {
            target: function (card, player, target, effect) {
              if (card.name == 'recover') {
                return 'zeroplayertarget';
              }
            }
          }
        },
      },
      jlsg_juejing2: {
        audio: 'jlsg_juejing',
        trigger: { player: ['dying', 'dyingAfter'] },
        forced: true,
        content() {
          player.draw(2);
        }
      },
      jlsg_longhun: {
        audio: "ext:极略/audio/skill:4",
        group: ["jlsg_longhun1", "jlsg_longhun2", "jlsg_longhun3", "jlsg_longhun4", "jlsg_longhun_sp"],
        subSkill: {
          sp: {
            trigger: { player: 'useCard' },
            forced: true,
            popup: false,
            filter(event) {
              return event.skill && event.skill.startsWith('jlsg_longhun') && event.cards && event.cards.length == 2;
            },
            content() {
              switch (trigger.card.name) {
                case 'tao':
                  trigger.targets.forEach(p => p.gainMaxHp());
                  break;
                case 'sha':
                  trigger.effectCount += 2;
                  break;
                case 'shan':
                  if (trigger.respondTo) {
                    trigger.respondTo[0].randomDiscard(2);
                  }
                  break;
                case 'wuxie':
                  trigger.directHit.addArray(game.players);
                  const cardx = trigger.respondTo;
                  if (cardx && cardx[1] && cardx[1].cards && cardx[1].cards.filterInD('od').length) player.gain(cardx[1].cards.filterInD('od'), 'gain2');
                  break;
              }
            }
          },
        },
        ai: {
          skillTagFilter: function (player, tag) {
            switch (tag) {
              case 'respondSha': {
                if (player.countCards('he', { suit: 'diamond' }) < Math.max(1, player.hp)) return false;
                break;
              }
              case 'respondShan': {
                if (player.countCards('he', { suit: 'club' }) < Math.max(1, player.hp)) return false;
                break;
              }
              case 'save': {
                if (player.countCards('he', { suit: 'heart' }) < Math.max(1, player.hp)) return false;
                break;
              }
            }
          },
          save: true,
          respondSha: true,
          respondShan: true,
          effect: {
            target: function (card, player, target) {
              //if(get.tag(card,'recover')&&target.hp>=2) return [0,0];
              if (!target.hasFriend()) return;
              if ((get.tag(card, 'damage') == 1 || get.tag(card, 'loseHp')) && target.hp > 1) return [0, 1];
            }
          },
          threaten: function (player, target) {
            if (target.hp == 1) return 2;
            return 0.5;
          },
        }
      },
      jlsg_longhun1: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse'],
        prompt: function () {
          return '将' + get.cnNumber(Math.max(1, _status.event.player.hp)) + '张红桃牌当作桃使用';
        },
        position: 'he',
        check: function (card, event) {
          let player = _status.event.player;
          if (ui.selected.cards.length) {
            if (!player.countCards('hes', c => c != card && (get.info(c).savable || get.suit(c) == 'heart'))) {
              return 0;
            }
            let maxHp = (_status.event.dying || player).maxHp;
            return 10 - maxHp - get.value(card);
          }
          return 10 - get.value(card);
        },
        selectCard: [1, 2],
        viewAs: { name: 'tao' },
        viewAsFilter: function (player) {
          return player.countCards('hes', { suit: 'heart' }) != 0;
        },
        filterCard: function (card) {
          return get.suit(card) == 'heart';
        }
      },
      jlsg_longhun2: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse', 'chooseToRespond'],
        prompt: function () {
          return '将' + get.cnNumber(Math.max(1, _status.event.player.hp)) + '张方片当作杀使用或打出';
        },
        position: 'hes',
        check: function (card) {
          let player = _status.event.player;
          if (ui.selected.cards.length) {
            let targets = game.filterPlayer(target => {
              const filter = _status.event?.filterTarget;
              if (typeof filter == "function") return filter({ name: 'sha', nature: 'fire' }, player, target);
              else if (typeof filter == "boolean") return filter;
              return false;
            });
            let effect = targets.map(t => get.effect(t, { name: 'sha', nature: 'fire' }, player, player))
              .reduce((a, b) => Math.max(a, b));
            if (effect > 0) {
              effect *= 6;
            } else {
              effect = 0;
            }
            return effect - get.value(card);
          }
          return 10 - get.value(card);
        },
        selectCard: [1, 2],
        viewAs: { name: 'sha', nature: 'fire' },
        viewAsFilter: function (player) {
          return player.countCards('hes', { suit: 'diamond' }) != 0;
        },
        filterCard: function (card) {
          return get.suit(card) == 'diamond';
        },
      },
      jlsg_longhun3: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse', 'chooseToRespond'],
        prompt: function () {
          return '将' + get.cnNumber(Math.max(1, _status.event.player.hp)) + '张黑桃牌当作无懈可击使用';
        },
        position: 'hes',
        check: function (card, event) {
          if (ui.selected.cards.length) {
            return 0;
          }
          return 7 - get.value(card);
        },
        selectCard: [1, 2],
        viewAs: { name: 'wuxie' },
        viewAsFilter: function (player) {
          return player.countCards('hes', { suit: 'spade' }) != 0;
        },
        filterCard: function (card) {
          return get.suit(card) == 'spade';
        }
      },
      jlsg_longhun4: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse', 'chooseToRespond'],
        prompt: function () {
          return '将' + get.cnNumber(Math.max(1, _status.event.player.hp)) + '张梅花牌当作闪使用或打出';
        },
        position: 'hes',
        check: function (card, event) {
          let player = _status.event.player;
          if (ui.selected.cards.length) {
            if (!_status.event.respondTo) { return 0; }
            let target = _status.event.respondTo[0];
            let effect = get.attitude(player, target) * Math.min(target.countCards('he'), 2);

            return effect - get.value(card);
          }
          return 10 - get.value(card);
        },
        selectCard: [1, 2],
        viewAs: { name: 'shan' },
        viewAsFilter: function (player) {
          return player.countCards('hes', { suit: 'club' }) != 0;
        },
        filterCard: function (card) {
          return get.suit(card) == 'club';
        }
      },
      jlsg_old_nizhan: {
        // audio: "ext:极略/audio/skill:1",
        audio: "jlsg_nizhan",
        trigger: { global: 'damageBegin2' },
        filter: function (event) {
          return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink();
        },
        init: function (player) {
          for (var i = 0; i < game.players.length; i++) {
            game.players[i].storage.jlsg_old_nizhan_mark = 0;
          }
        },
        direct: true,
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt('jlsg_old_nizhan'), function (card, player, target) {
            return (trigger.source == target || trigger.player == target) && player != target;
          }).ai = function (target) {
            return -get.attitude(player, target);
          }
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_old_nizhan', result.targets[0]);
            if (!result.targets[0].storage.jlsg_old_nizhan_mark) {
              result.targets[0].storage.jlsg_old_nizhan_mark = 0;
            }
            result.targets[0].storage.jlsg_old_nizhan_mark += 1;
            result.targets[0].markSkill('jlsg_old_nizhan_mark');
            result.targets[0].syncStorage('jlsg_old_nizhan_mark');
          }
        },
        subSkill: {
          mark: {
            forced: true,
            charlotte: true,
            mark: true,
            marktext: '袭',
            intro: {
              content: '共有#个标记'
            }
          }
        },
        ai: {
          threaten: function (player) {
            if (player.hasSkill('jlsg_old_cuifeng')) return 4.5;
            return 0;
          }
        }
      },
      jlsg_old_cuifeng: {
        // audio: "ext:极略/audio/skill:1",
        audio: "jlsg_cuifeng",
        trigger: { player: 'phaseJieshuBegin' },
        forced: true,
        filter: function (player) {
          var num = 0;
          for (var i = 0; i < game.players.length; i++) {
            if (!game.players[i].storage.jlsg_old_nizhan_mark)
              continue;
            num += game.players[i].storage.jlsg_old_nizhan_mark;
          }
          if (num >= 4) return true;
          return false;
        },
        content: function () {
          'step 0'
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].storage.jlsg_old_nizhan_mark) {
              player.line(game.players[i], 'fire');
              if (game.players[i].num('h') >= game.players[i].storage.jlsg_old_nizhan_mark) {
                player.gainPlayerCard(game.players[i].storage.jlsg_old_nizhan_mark, game.players[i], 'h', true);
              } else {
                player.gain(game.players[i].get('h'));
                game.players[i].$give(game.players[i].num('h'), player);
                game.players[i].damage();
              }
              game.delay(1);
            }
          }
          'step 1'
          for (var i = 0; i < game.players.length; i++) {
            if (!game.players[i].storage.jlsg_old_nizhan_mark)
              continue;
            game.players[i].storage.jlsg_old_nizhan_mark = 0;
            game.players[i].unmarkSkill('jlsg_old_nizhan_mark');
          }
        }
      },
      jlsg_old_weizhen: {
        // audio: "ext:极略/audio/skill:1",
        audio: "jlsg_weizhen",
        trigger: { player: 'phaseBegin' },
        filter: function (event, player) {
          var num = 0;
          for (var i = 0; i < game.players.length; i++) {
            if (!game.players[i].storage.jlsg_old_nizhan_mark) continue;
            num += game.players[i].storage.jlsg_old_nizhan_mark;
          }
          if (num > 0) return true;
          return false;
        },
        prompt: function (event, player) {
          var str = '';
          var num = 0;
          for (var i = 0; i < game.players.length; i++) {
            if (!game.players[i].storage.jlsg_old_nizhan_mark) continue;
            num += game.players[i].storage.jlsg_old_nizhan_mark;
          }
          str += '移除场上全部的【袭】标记，然后摸' + num + '张牌。';
          return str;
        },
        check: function (event, player) {
          if (player.countCards('h') == 0 || player.hp == 1) return 1;
          return 0;
        },
        content: function () {
          var num = 0;
          for (var i = 0; i < game.players.length; i++) {
            if (!game.players[i].storage.jlsg_old_nizhan_mark) continue;
            if (game.players[i].storage.jlsg_old_nizhan_mark) {
              player.line(game.players[i], 'water');
            }
            num += game.players[i].storage.jlsg_old_nizhan_mark;
            game.players[i].storage.jlsg_old_nizhan_mark = 0;
            game.players[i].unmarkSkill('jlsg_old_nizhan_mark');
          }
          game.delay();
          player.draw(num);
        }
      },
      jlsg_nizhan: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'phaseZhunbeiBegin' },
        forced: true,
        filter: function (event, player) {
          return event.player.isDamaged() || event.player.countMark('jlsg_nizhan');
        },
        marktext: '逆',
        intro: {
          content: 'mark',
        },
        content: function () {
          if (trigger.player.isDamaged()) {
            trigger.player.addMark(event.name);
          } else {
            trigger.player.removeMark(event.name);
          }
        },
      },
      jlsg_cuifeng: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        selectTarget: 2,
        filter: function (event, player) {
          return game.countPlayer(p => p.countMark('jlsg_nizhan'));
        },
        filterTarget: function (card, player, target) {
          if (ui.selected.targets.length) {
            return true;
          }
          return target.countMark('jlsg_nizhan');
        },
        targetprompt: ['失去标记', '获得标记'],
        multitarget: true,
        content: function () {
          'step 0'
          targets[0].removeMark('jlsg_nizhan');
          targets[1].addMark('jlsg_nizhan');
          'step 1'
          targets[0].useCard({ name: 'sha', isCard: true }, targets[1], 'noai', false).animate = false;
        },
        ai: {
          order: 8,
          result: {
            target: function (player, target) {
              if (ui.selected.targets.length == 0) {
                return 1;
              }
              else {
                return get.effect(target, { name: 'sha' }, ui.selected.targets[0], target) - 3;
              }
            }
          },
          expose: 0.3,
        }
      },
      jlsg_weizhen: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'phaseDrawBegin2' },
        forced: true,
        filter: function (event, player) {
          if (event.numFixed) return false;
          if (event.player == player) {
            return game.countPlayer(p => p.countMark('jlsg_nizhan'))
          }
          return event.player.countMark('jlsg_nizhan') >= 2;
        },
        content: function () {
          if (player == trigger.player) {
            trigger.num += game.countPlayer(p => p.hasMark('jlsg_nizhan'));
          }
          if (trigger.player.countMark('jlsg_nizhan') >= 2) {
            --trigger.num;
          }
        },
        group: 'jlsg_weizhen2',
        // get global() {
        //   debugger;
        //   return 'jlsg_weizhen3';
        // }
        global: 'jlsg_weizhen3',
        init: function (player, skill) { // global skill will not run init, so we'll move here
          for (var p of game.players) {
            p.addSkillBlocker('jlsg_weizhen3');
          }
        },
        onremove: function (player, skill) {
          for (var p of game.players) {
            p.removeSkillBlocker('jlsg_weizhen3');
          }
        },
      },
      jlsg_weizhen2: {
        audio: 'jlsg_weizhen',
        charlotte: true,
        trigger: { source: 'damageBegin1' },
        filter: function (event, player) {
          return event.player.countMark('jlsg_nizhan') >= 3;
        },
        forced: true,
        content: function () {
          trigger.num++;
        },
      },
      jlsg_weizhen3: {
        audio: 'jlsg_weizhen',
        charlotte: true,
        skillBlocker: function (skill, player) {
          return !lib.skill[skill].charlotte && !get.is.locked(skill, player) && player.countMark('jlsg_nizhan') >= 4;
        },
      },
      jlsg_old_zhiming: {
        audio: "jlsg_zhiming",
        trigger: { global: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return event.player != player && event.player.countCards('h') && player.countCards('h');
        },
        direct: true,
        content: function () {
          "step 0"
          player.chooseToDiscard('h', get.prompt2(event.name, trigger.player)).ai = function (card) {
            if (get.attitude(player, trigger.player) < 0)
              return 10 - get.value(card);
            return 0;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_old_zhiming', trigger.player);
            event.color = get.color(result.cards[0]);
            event.card = trigger.player.get('h').randomGet();
            trigger.player.discard(event.card);
          } else {
            event.finish();
          }
          'step 2'
          if (event.color == get.color(event.card)) {
            player.chooseControl('跳过摸牌', '跳过出牌').ai = function () {
              if (trigger.player.countCards('h') > trigger.player.hp) return '跳过出牌';
              return '跳过摸牌';
            }
          } else {
            event.finish();
          }
          "step 3"
          if (result.control == '跳过摸牌') {
            trigger.player.skip('phaseDraw');
            game.log(trigger.player, '跳过了摸牌阶段');
          }
          if (result.control == '跳过出牌') {
            trigger.player.skip('phaseUse');
            game.log(trigger.player, '跳过了出牌阶段');
          }
        },
        ai: {
          expose: 0.4
        }
      },
      jlsg_old_suyin: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'loseEnd' },
        direct: true,
        filter: function (event, player) {
          if (player.countCards('h')) return false;
          for (var i = 0; i < event.cards.length; i++) {
            if (event.cards[i].original == 'h') return _status.currentPhase != player;
          }
          return false;
        },
        content: function () {
          "step 0"
          player.chooseTarget('【夙隐】：选择一名角色将其翻面', function (card, player, target) {
            return player != target;
          }).ai = function (target) {
            //if(target.isTurnedOver()&&get.attitude(player,target)>0) return 10;
            if (!target.isTurnedOver() && get.attitude(player, target) < 0) return target.countCards('h');
            return 0;
          }
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_old_suyin', result.targets);
            result.targets[0].turnOver();
          }
        },
        ai: {
          expose: 0.3
        }
      },
      jlsg_zhiming: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: lib.filter.notMe,
        selectTarget() {
          return [1, _status.event.player.hp];
        },
        multitarget: true,
        multiline: true,
        content: function () {
          "step 0"
          targets.sortBySeat();
          if (player.storage['jlsg_zhiming1']) {
            player.storage['jlsg_zhiming1'] = false;
            event.goto(2);
          } else {
            player.chooseBool(`###是否失去1点体力？###令${get.translation(targets)}失去1点体力`, true);
          }
          "step 1"
          player.storage['jlsg_zhiming1'] = result.bool;
          if (result.bool) {
            player.loseHp();
            targets.forEach(p => p.loseHp());
          }
          "step 2"
          if (!player.isIn()) {
            event.finish();
            return;
          }
          if (player.storage['jlsg_zhiming2']) {
            player.storage['jlsg_zhiming2'] = false;
            event.goto(4);
          } else {
            player.chooseBool(`###是否翻面？###令${get.translation(targets)}翻面`, true);
          }
          "step 3"
          player.storage['jlsg_zhiming2'] = result.bool;
          if (result.bool) {
            player.turnOver();
            targets.filter(p => p.isIn()).forEach(p => p.turnOver());
          }
          "step 4"
          if (!player.isIn()) {
            event.finish();
            return;
          }
          if (player.storage['jlsg_zhiming3']) {
            player.storage['jlsg_zhiming3'] = false;
            event.finish();
          } else {
            let targetMax = Math.max(...targets.map(p => p.countCards('he')));
            let cards;
            if (targetMax + 3 >= player.countCards('h')) {
              cards = player.getCards('h');
            } else {
              cards = player.getCards('h').sort((a, b) => get.value(b) - get.value(a));
              if (cards.length > targetMax) {
                cards.length = targetMax;
              }
            }
            player.chooseToDiscard([1, Infinity], 'he')
              .set("prompt2", `令${get.translation(targets)}弃置等量的牌`)
              .set("ai", c => _status.event.cards.includes(c))
              .set("cards", cards);
          }
          "step 5"
          player.storage['jlsg_zhiming3'] = result.bool;
          if (result.bool) {
            targets.filter(p => p.isIn()).forEach(p => p.chooseToDiscard(result.cards.length, "he", true));
          }
        },
        ai: {
          expose: 0.4,
          order: 5,
          result: {
            target: -2,
          }
        }
      },
      jlsg_suyin: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        direct: true,
        filter: function (event, player) {
          if (player.countCards('h')) return false;
          var evt = event.getl(player);
          return evt && evt.player == player && evt.hs && evt.hs.length > 0;
        },
        content: function () {
          "step 0"
          player.chooseTarget(`###${get.prompt(event.name)}###令一名角色翻面`).ai = function (target) {
            //if(target.isTurnedOver()&&get.attitude(player,target)>0) return 10;
            if (!target.isTurnedOver() && get.attitude(player, target) < 0) return target.countCards('h');
            return (get.attitude(_status.event.player, target) - 1)
              * (target.isTurnedOver() ? (4 + 2 * (target.maxHp - target.hp)) : (-4));
          }
          "step 1"
          if (!result.bool) {
            event.finish();
            return;
          }
          let target = result.targets[0];
          event.target = target;
          player.logSkill(event.name, target);
          target.turnOver();
          if (!target.isTurnedOver()) {
            event.finish();
          }
          "step 2"
          if (event.target.isDamaged()) {
            event.target.recover(event.target.maxHp - event.target.hp);
          }
        },
        ai: {
          expose: 0.3
        }
      },
      jlsg_dianjie: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['phaseDrawBefore', 'phaseUseBefore'] },
        prompt: function (event, player) {
          if (event.name == 'phaseDraw') {
            return '是否发动【电界】跳过摸牌阶段？';
          }
          return '是否发动【电界】跳过出牌阶段？';
        },
        check: function (event, player) {
          if (event.name == 'phaseDraw') {
            if (player.countCards('h') <= 1 || player.hp == 1) return -1;
          } else {
            if (player.countCards('h', function (card) {
              return get.value(card) > 7;
            })) return -1;
            if (player.countCards('h') - player.hp >= 3) return -1;
          }
          return 1;
        },
        content: function () {
          "step 0"
          trigger.finish();
          trigger.untrigger();
          player.judge(function (card) {
            return get.color(card) == 'black' ? 1.5 : -1;
          })
          "step 1"
          if (result.bool) {
            player.chooseTarget('选择一个目标对其造成2点雷电伤害').ai = function (target) {
              // if (player.hp == 1) return target == player ? 1 : -1;
              return get.damageEffect(target, player, player, 'thunder');
            }
          } else {
            player.chooseTarget('选择一至两个目标将其横置', [1, 2], function (card, player, target) {
              return !target.isLinked();
            }).ai = function (target) {
              return -get.attitude(player, target);
            }
            event.goto(3);
          }
          'step 2'
          if (result.bool) {
            player.line(result.targets[0], 'thunder');
            result.targets[0].damage('thunder', 2);
          }
          event.finish();
          'step 3'
          if (result.bool) {
            player.line(result.targets, 'thunder');
            for (var i = 0; i < result.targets.length; i++) {
              result.targets[i].link();
            }
          }
        }
      },
      jlsg_shendao: {
        audio: "ext:极略/audio/skill:true",
        trigger: { global: 'judge' },
        direct: true,
        content: function () {
          "step 0"
          player.chooseTarget(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
            get.translation(trigger.player.judging[0]) + '，是否发动【神道】？', function (card, player, target) {
              if (target == player) return target.countCards('hej');
              return target.countCards('ej');
            }).ai = function (target) {
              return player == target;
            }
          "step 1"
          if (result.bool) {
            event.target = result.targets[0];
            if (result.targets[0] == player) {
              player.chooseCard('请选择改判牌', 'hej').set('ai', function (card) {
                var trigger = _status.event.getTrigger();
                var player = _status.event.player;
                var judging = _status.event.judging;
                var result = trigger.judge(card) - trigger.judge(judging);
                var attitude = get.attitude(player, trigger.player);
                if (attitude == 0 || result == 0) return 0;
                if (attitude > 0) {
                  return result - get.value(card) / 2;
                } else {
                  return -result - get.value(card) / 2;
                }
              }).set('judging', trigger.player.judging[0]);
            } else {
              player.choosePlayerCard('请选择改判牌', result.targets[0], 'ej').set('ai', function (button) {
                var trigger = _status.event.getTrigger();
                var player = _status.event.player;
                var judging = _status.event.judging;
                var result = trigger.judge(button) - trigger.judge(judging);
                var attitude = get.attitude(player, trigger.player);
                if (attitude == 0 || result == 0) return 0;
                if (attitude > 0) {
                  return result - get.value(button) / 2;
                } else {
                  return -result - get.value(button) / 2;
                }
              }).set('judging', trigger.player.judging[0]);
            }
          }
          "step 2"
          if (result.bool) {
            event.cardx = result.cards[0] || result.links[0];
            if (event.target != player) {
              event.target.$throw(event.cardx);
              event.target.lose(event.cardx, ui.ordering, 'visible').relatedEvent = trigger;
              game.broadcastAll(function (card) {
                if (card.clone) {
                  card.clone.classList.add('thrownhighlight');
                }
              }, event.cardx);
            } else {
              player.respond(event.cardx, 'highlight', 'noOrdering');
            }
          } else {
            event.finish();
          }
          "step 3"
          player.logSkill(event.name, event.target);
          player.gain(trigger.player.judging[0], 'gain2');
          trigger.player.judging[0] = event.cardx;
          trigger.orderingCards.add(event.cardx);
          game.log(trigger.player, '的判定牌改为', event.cardx);
          "step 4"
          game.delayx();
        },
        ai: {
          tag: {
            rejudge: 1,
          }
        }
      },
      jlsg_leihun: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: "damageBegin4",
        },
        forced: true,
        filter: function (event) {
          return event.nature == 'thunder';
        },
        content: function () {
          trigger.cancel();
          player.recover(trigger.num);
        },
        ai: {
          nothunder: true,
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'thunderDamage')) {
                if (target.isHealthy()) return 'zerotarget';
                if (target.hp == 1) return [0, 2];
                return [0, 1];
              }
            },
          },
        },
      },
      jlsg_old_shelie: {
        audio: "jlsg_shelie",
        trigger: { player: 'phaseDrawBegin1' },
        forced: true,
        content: function () {
          'step 0'
          trigger.cancel(null, null, 'notrigger');
          event.cards = [];
          event.num = 1;
          event.getResultString = function (str) {
            switch (str) {
              case '基本牌':
                return 'basic';
              case '锦囊牌':
                return 'trick';
              case '装备牌':
                return 'equip';
            }
            return str;
          };
          'step 1'
          player.chooseControl('基本牌', '锦囊牌', '装备牌', function () {
            var randomResult = Math.random();
            if (randomResult < 0.4) return '锦囊牌';
            if (randomResult < 0.8) return '基本牌';
            return '装备牌';
          }).set('prompt', '请选择想要获得的第' + get.cnNumber(event.num, true) + '张牌的类型');
          'step 2'
          event.control = event.getResultString(result.control);
          var card = get.cardPile2(function (card) {
            return get.type(card, 'trick') == event.control && !event.cards.includes(card);
          });
          if (card) {
            event.cards.push(card);
          } else {
            player.chat('无牌可得了吗');
            game.log(`但是牌堆里面已经没有${result.control}了！`);
          }
          if (event.num < 4) {
            event.num++;
            event.goto(1);
          } else {
            if (event.cards.length) {
              player.gain(event.cards, 'gain2');
            }
          }
        }
      },
      jlsg_old_gongxin: {
        audio: "jlsg_gongxin",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return target != player && target.countCards('h');
        },
        content: function () {
          'step 0'
          player.viewCards('攻心', target.get('h'));
          event.cards = target.get('h', function (card) {
            return get.suit(card) == 'heart';
          });
          if (!event.cards.length) {
            event.finish();
            return;
          }
          "step 1"
          if (event.cards.length > 1) {
            event.videoId = lib.status.videoId++;
            game.broadcastAll(function (player, id, cards) {
              var str;
              if (player == game.me && !_status.auto) {
                str = '攻心：选择获得其中的一张牌';
              } else {
                str = '攻心';
              }
              var dialog = ui.create.dialog(str, cards);
              dialog.videoId = id;
            }, player, event.videoId, event.cards);
            event.time = get.utc();
            game.addVideo('showCards', player, ['攻心', get.cardsInfo(event.cards)]);
            game.addVideo('delay', null, 2);
          } else {
            player.showCards(event.cards, get.translation(target.name) + '的红桃手牌');
          }
          "step 2"
          if (event.cards.length == 1) {
            target.discard(event.cards);
            target.damage();
            event.finish();
            return;
          }
          "step 3"
          var next = player.chooseButton();
          next.set('dialog', event.videoId);
          next.set('filterButton', function (button) {
            return true;
          });
          next.set('ai', function (button) {
            return get.value(button.link, _status.event.player);
          });
          "step 4"
          if (result.bool && result.links) {
            event.cards2 = result.links;
          }
          var time = 1000 - (get.utc() - event.time);
          if (time > 0) {
            game.delay(0, time);
          }
          "step 5"
          game.broadcastAll('closeDialog', event.videoId);
          if (event.cards2) {
            player.gain(event.cards2, 'log', 'gain2');
          }
        },
        ai: {
          threaten: 1.5,
          result: {
            target: function (player, target) {
              return -target.countCards('h');
            }
          },
          order: 10,
          expose: 0.4,
        }
      },
      jlsg_shelie: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: "useCard",
        },
        filter(event, player) {
          return !player.hasHistory("useSkill", evt => {
            return evt.skill == "jlsg_shelie" && evt.event.type0 == get.type2(event.card);
          });
        },
        frequent: true,
        popup: false,
        content() {
          let type0 = get.type2(trigger.card);
          event.type0 = type0;
          const cards = [get.cardPile2(c => get.type2(c) != type0)];
          if (!cards[0]) return;
          let type1 = get.type2(cards[0]);
          let card2 = get.cardPile2(c => get.type2(c) != type0 && get.type2(c) != type1);
          if (card2) cards.push(card2);
          player.logSkill("jlsg_shelie");
          player.gain(cards, 'gain2');
        },
      },
      jlsg_gongxin: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return target != player && target.countCards('h');
        },
        async content(event, trigger, player) {
          const target = event.target;
          game.log(player, '观看了', target, '的手牌');
          const { result: result1 } = await player.gainPlayerCard(target, 'h', 'visible', 'visibleMove');
          if (!result1.bool) return;
          if (!target.countCards("h")) return;
          const card = result1.cards[0];
          let prompt = `###是否弃置${get.translation(target)}一张牌？###令${get.translation(target)}不能使用或打出其余花色的牌`;
          const { result: result2 } = await player.discardPlayerCard(prompt, target, 'h', 'visible')
            .set('target', target)
            .set('suit', get.suit(card, target))
            .set("filterButton", button => get.suit(button.link, get.event("target")) != get.event("suit"))
            .set('ai', button => get.value(button.link, get.event("target")))
          if (!result2.bool) return;
          const suits = [
            get.suit(card, target),
            get.suit(result2.cards[0], target),
          ];
          target.storage.jlsg_gongxin2 = target
            .getStorage('jlsg_gongxin2')
            .addArray(lib.suit.filter(s => !suits.includes(s)));
          target.addTempSkill('jlsg_gongxin2');
        },
        ai: {
          result: {
            target: function (player, target) {
              return -target.countCards('h');
            }
          },
          order: 10,
        }
      },
      jlsg_gongxin2: {
        mark: true,
        marktext: '攻',
        charlotte: true,
        intro: {
          name: '攻心',
          content: '本回合不能使用或打出$',
        },
        mod: {
          cardEnabled: function (card, player) {
            if (player.getStorage('jlsg_gongxin2').includes(get.suit(card))) return false;
          },
          cardRespondable: function (card, player) {
            if (player.getStorage('jlsg_gongxin2').includes(get.suit(card))) return false;
          },
          cardSavable: function (card, player) {
            if (player.getStorage('jlsg_gongxin2').includes(get.suit(card))) return false;
          },
        },
        onremove(player) {
          player.storage.jlsg_gongxin2 = [];
        }
      },
      jlsg_tianqi_phase: {},
      jlsg_tianqi: {
        // TODO: delete excessive audio clips
        // usable: 1,
        audio: "ext:极略/audio/skill:2",
        enable: ['chooseToUse', 'chooseToRespond'],
        hiddenCard: function (player, name) {
          return lib.inpile.includes(name) && !player.isDying() && !player.hasSkill('jlsg_tianqi_phase');
        },
        filter: function (event, player) {
          if (player.isDying() || player.hasSkill('jlsg_tianqi_phase')) return false;
          for (var i of lib.inpile) {
            if (i == 'shan' || i == 'wuxie') continue;
            var type = get.type(i);
            if ((type == 'basic' || type == 'trick') && event.filterCard({ name: i }, player, event)) return true;
            if (i == 'sha') {
              for (var j of lib.inpile_nature) {
                if (event.filterCard({ name: i, nature: j }, player, event)) return true;
              }
            }
          }
          return false;
        },
        chooseButton: {
          dialog: function (event, player) {
            var list1 = [], list1Tag;
            var list2 = [], list2Tag;
            for (var i of lib.inpile) {
              if (!lib.translate[i + '_info']) continue;
              if (i == 'shan' || i == 'wuxie') continue;
              var type = get.type(i);
              if (type == 'basic') {
                list1.push([type, '', i]);
                if (event.filterCard({ name: i }, player, event)) list1Tag = true;
                if (i == 'sha') {
                  for (var j of lib.inpile_nature) list1.push([type, '', i, j]);
                }
              }
              if (type == 'trick') {
                list2.push([type, '', i]);
                if (event.filterCard({ name: i }, player, event)) list2Tag = true;
              }
            }
            var dialog = ui.create.dialog();
            if (list1Tag) {
              dialog.add('基本牌');
              dialog.add([list1, 'vcard']);
            }
            if (list2Tag) {
              dialog.add('锦囊牌');
              dialog.add([list2, 'vcard']);
            }
            return dialog;
          },
          filter: function (button, player) {
            var evt = _status.event.getParent();
            return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
          },
          check: function (button, buttons) {
            // TODO: optimize
            var player = _status.event.player;
            var card = { name: button.link[2], nature: button.link[3] };
            //if(player.storage.jlsg_tianqi!=get.type(ui.cardPile.firstChild)) delete player.storage.jlsg_tianqi;
            // if (player.storage.jlsg_tianji_top != get.type(button.link[2], "trick")) return -1;
            var knowHead = player.getStorage('jlsg_tianji_top')[0] === ui.cardPile.firstChild;
            var event = _status.event.getParent();
            var val = event.type == 'phase' ? player.getUseValue(card) / 10 : 3;
            if (val > 0 && event.type != 'phase' && (get.tag(event.getParent(), 'damage') && event.getParent().name != 'juedou') && !player.countCards('h', { name: button.link[2] })
              && (!knowHead || get.type(ui.cardPile.firstChild, 'trick') == get.type(button.link[2], "trick") || event.getParent().baseDamage > 1)) {
              return val;
            }
            // calculating lose hp effect
            var loseHpEffect = lib.jlsg.getLoseHpEffect(player);
            if (!knowHead) {
              loseHpEffect /= 2;
            } else {
              if (get.type(ui.cardPile.firstChild, 'trick') == get.type(button.link[2], "trick")) {
                loseHpEffect = 0;
              }
            }
            return val + loseHpEffect;
            var recover = 0, lose = 1;
            for (var i = 0; i < game.players.length; i++) {
              if (!game.players[i].isOut()) {
                if (game.players[i].hp < game.players[i].maxHp) {
                  if (get.attitude(player, game.players[i]) > 0) {
                    if (game.players[i].hp < 2) {
                      lose--;
                      recover += 0.5;
                    }
                    lose--;
                    recover++;
                  } else if (get.attitude(player, game.players[i]) < 0) {
                    if (game.players[i].hp < 2) {
                      lose++;
                      recover -= 0.5;
                    }
                    lose++;
                    recover--;
                  }
                } else {
                  if (get.attitude(player, game.players[i]) > 0) {
                    lose--;
                  } else if (get.attitude(player, game.players[i]) < 0) {
                    lose++;
                  }
                }
              }
            }
            if (lose > recover && lose > 0 && player.storage.jlsg_tianji_top == 'trick') return (button.link[2] == 'wanjian') ? 1 : -1;
            if (lose < recover && recover > 0 && player.storage.jlsg_tianji_top == 'trick') return (button.link[2] == 'taoyuan') ? 1 : -1;
            if (player.storage.jlsg_tianji_top == 'basic' && player.isDamaged()) return (button.link[2] == 'tao') ? 1 : -1;
            if (player.storage.jlsg_tianji_top == 'basic' && player.countCards('h', 'sha')) return (button.link[2] == 'jiu') ? 1 : -1;
            if (player.storage.jlsg_tianji_top == 'basic' && !player.countCards('h', 'sha')) return (button.link[2] == 'sha') ? 1 : -1;
            if (player.storage.jlsg_tianji_top == 'trick') return (button.link[2] == 'wuzhong') ? 1 : -1;
            if (game.players.length < 4 && player.storage.jlsg_tianji_top == 'trick') return (button.link[2] == 'shunshou') ? 1 : -1;
            return (button.link[2] == 'guohe') ? 1 : -1;
          },
          backup: function (links, player) {
            var tianqiOnUse = function (result, player) {
              if (player.isPhaseUsing()) {
                player.addTempSkill('jlsg_tianqi_phase', 'phaseUseAfter');
              }
              player.logSkill('jlsg_tianqi');
              game.log(player, '声明了' + get.translation(links[0][0]) + '牌');
              var cards = get.cards();
              player.showCards(cards);
              result.cards = cards;
              if (get.type(cards[0], 'trick') != links[0][0]) {
                player.loseHp();
              }
              delete player.storage.jlsg_tianji_top;
            };
            return {
              filterCard: function () {
                return false
              },
              selectCard: -1,
              popname: true,
              viewAs: {
                name: links[0][2],
                nature: links[0][3],
              },
              onuse: tianqiOnUse,
              onrespond: tianqiOnUse
            }
          },
          prompt: function (links, player) {
            return '亮出牌堆顶的一张牌，并将此牌当' + get.translation(links[0][2]) + '使用或打出。若亮出的牌不为' + get.translation(links[0][0]) + '牌，你须先失去1点体力。(你的出牌阶段限一次。)';
          }
        },
        group: ['jlsg_tianqi_shan', 'jlsg_tianqi_wuxie'],
        ai: {
          order: 10,
          fireAttack: true,
          respondShan: true,
          respondSha: true,
          skillTagFilter: function (player, tag, arg) {
            if (player.isDying() || player.hasSkill('jlsg_tianqi_phase')) return false;
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
        }
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
        viewAs: { name: 'wuxie' },
        viewAsFilter: function (player) {
          return !player.isDying() && !player.hasSkill('jlsg_tianqi_phase');
        },
        onuse: function (result, player) {
          if (player.isPhaseUsing()) {
            player.addTempSkill('jlsg_tianqi_phase', 'phaseUseAfter');
          }
          var cards = get.cards();
          player.showCards(cards);
          result.cards = cards;
          if (get.type(cards[0], 'trick') != 'trick') {
            player.loseHp();
          }
          delete player.storage.jlsg_tianji_top;
        },
        ai: {
          effect: {
            player: function (card, player, target) {
              if (card.name == 'wuxie' && _status.event.skill == 'jlsg_tianqi_wuxie') {
                var knowHead = player.getStorage('jlsg_tianji_top')[0] === ui.cardPile.firstChild;
                // calculating lose hp effect
                var loseHpEffect = lib.jlsg.getLoseHpEffect(player);
                if (!knowHead) {
                  loseHpEffect /= 2;
                } else {
                  if (get.type(ui.cardPile.firstChild, 'trick') == 'trick') {
                    loseHpEffect = 0;
                  }
                }
                return [1, loseHpEffect];
              }
            }
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
        enable: ['chooseToRespond', 'chooseToUse'],
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
          if (player.hp > 2 && get.type(cards[0]) == 'basic') {
            return 1;
          }
          if (player.hp <= 2 && player.countCards('h', 'shan') && player.storage.jlsg_tianji_top != 'basic') return 0;
          return 1;
        },
        viewAs: { name: 'shan' },
        viewAsFilter: function (player) {
          return !player.isDying() && !player.hasSkill('jlsg_tianqi_phase');
        },
        onuse: function (result, player) {
          if (player.isPhaseUsing()) {
            player.addTempSkill('jlsg_tianqi_phase', 'phaseUseAfter');
          }
          var cards = get.cards();
          player.showCards(cards);

          result.cards = cards;
          if (get.type(cards[0], 'basic') != 'basic') {
            player.loseHp();
          }
          delete player.storage.jlsg_tianji_top;
        },
        onrespond: function (result, player) {
          if (player.isPhaseUsing()) {
            player.addTempSkill('jlsg_tianqi_phase', 'phaseUseAfter');
          }
          var cards = get.cards();
          player.showCards(cards);

          result.cards = cards;
          if (get.type(cards[0], 'basic') != 'basic') {
            player.loseHp();
          }
          delete player.storage.jlsg_tianji_top;
        },
        ai: {
          effect: {
            player: function (card, player, target) {
              if (card.name == 'shan' && _status.event.skill == 'jlsg_tianqi_shan') {
                var knowHead = player.getStorage('jlsg_tianji_top')[0] === ui.cardPile.firstChild;
                // calculating lose hp effect
                var loseHpEffect = -1;
                if (!knowHead) {
                  loseHpEffect /= 2;
                } else {
                  if (get.type(ui.cardPile.firstChild, 'trick') == get.type(button.link[2], "trick")) {
                    loseHpEffect = 0;
                  }
                }
                return [1, loseHpEffect];
              }
            }
          },
          // basic: {
          //   useful: [7, 2],
          //   value: [7, 2],
          // },
        },
      },
      jlsg_tianji: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'phaseUseBegin' },
        frequent: true,
        filter: function (event, player) {
          if (ui.cardPile.hasChildNodes() == false) return false;
          return true;
        },
        content: function () {
          'step 0'
          event.top = [ui.cardPile.firstChild];
          player.storage.jlsg_tianji_top = [ui.cardPile.firstChild];
          event.dialog = ui.create.dialog('天机', event.top, true);
          var controls = [];
          if (game.hasPlayer(function (target) {
            return player.countCards('h') <= target.countCards('h') && target != player;
          })) {
            controls.push('获得');
          }
          controls.push('替换');
          player.chooseControl(controls, 'cancel', event.dialog).ai = function () {
            if (event.top[0].name == 'du') return 'cancel';
            return 0;
          };
          'step 1'
          if (result.control == '获得') {
            player.draw();
            event.finish();
          } else if (result.control == '替换') {
            player.chooseCard('选择一张牌置于牌堆顶', 'h', true).ai = function (card) {
              if (_status.currentPhase == player) {
                if (player.hp <= player.maxHp / 2 && player.countCards('h', { type: 'basic' })) {
                  return get.type(card) == 'basic';
                }
                if (player.hp > player.maxHp / 2 && player.countCards('h', { type: 'trick' })) {
                  return get.type(card) == 'trick';
                }
              } else {
                return 15 - get.value(card);
              }
            }
          } else {
            event.finish();
          }
          'step 2'
          event.card = result.cards[0];
          if (!event.card) {
            event.finish();
            return;
          }
          // player.lose(event.card, ui.special);
          player.draw();
          'step 3'
          player.$throw(1, 1000);
          player.storage.jlsg_tianji_top = [event.card];
          player.lose(event.card, ui.cardPile, 'insert');
          game.log(player, '将一张牌置于牌堆顶');
        },
      },
      jlsg_tianji_old: {
        audio: "jlsg_tianji",
        trigger: { global: 'phaseUseBegin' },
        direct: true,
        init: function (player) {
          player.storage.pd = undefined;
        },
        content: function () {
          'step 0'
          var nh = player.countCards('h');
          var num = 0;
          for (var i = 0; i < game.players.length; i++) {
            var np = game.players[i].num('h');
            if (np > nh) num++;
          }
          var cards = [];
          cards.push(ui.cardPile.firstChild);
          event.cards = cards;
          if (num) {
            player.chooseControl('获得', '替换', 'cancel')
              .set("dialog", ['天机', event.cards, 'hidden'])
              .set("ai", function () {
                return '获得';
              })
          } else {
            player.chooseControl('替换', 'cancel')
              .set("dialog", ['天机', event.cards, 'hidden'])
              .set("ai", function () {
                if (_status.currentPhase !== player) {
                  if (get.type(cards[0]) == 'basic' && (player.countCards('h', { type: 'basic' }) < player.countCards('h') / 2)) return '替换';
                  if (get.type(cards[0]) != 'basic') return '替换';
                }
                if (_status.currentPhase == player) {
                  if (get.type(cards[0]) == 'trick' && player.hp <= player.maxHp / 2) return '替换';
                  if (get.type(cards[0]) == 'basic' && player.hp > player.maxHp / 2 && player.countCards('h', { type: 'trick' })) return '替换';
                  if (get.type(cards[0]) == 'equip' && player.countCards('e') < 4) return '替换';
                }
                if (get.type(cards[0]) == 'basic') player.storage.pd = 'basic';
                else player.storage.pd = 'trick';
                return 'cancel';
              })
          }
          "step 1"
          if (result.control == '获得') {
            player.logSkill('jlsg_tianji');
            player.gain(event.cards, 'draw');
            event.finish();
          } else if (result.control == '替换') {
            player.logSkill('jlsg_tianji');
            player.chooseCard('选择一张牌置于牌堆顶', 'h', true).ai = function (card) {
              if (_status.currentPhase == player) {
                if (player.hp <= player.maxHp / 2 && player.countCards('h', { type: 'basic' })) {
                  return get.type(card) == 'basic';
                }
                if (player.hp > player.maxHp / 2 && player.countCards('h', { type: 'trick' })) {
                  return get.type(card) == 'trick';
                }
              } else {
                return 15 - get.value(card);
              }
            }
          } else {
            event.finish();
          }
          'step 2'
          event.card = result.cards[0];
          if (get.type(result.cards[0]) == 'basic') {
            player.storage.pd = 'basic';
          } else {
            player.storage.pd = 'trick';
          }
          player.lose(result.cards, ui.special);
          var cardx = ui.create.card();
          cardx.classList.add('infohidden');
          cardx.classList.add('infoflip');
          player.$throw(cardx, 1000);
          'step 3'
          game.delay(0.5);
          'step 4'
          if (event.card) {
            event.card.fix();
            ui.cardPile.insertBefore(event.card, ui.cardPile.firstChild);
            player.gain(event.cards, 'draw');
          }
        }
      },
      jlsg_xianzhu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'recoverAfter' },
        check: function (event, player) {
          return get.attitude(player, event.player) > 0;
        },
        logTarget: 'player',
        content: function () {
          trigger.player.draw(2);
        },
        group: 'jlsg_xianzhu2'
      },
      jlsg_xianzhu2: {
        audio: "jlsg_xianzhu",
        check: function (event, player) {
          return get.attitude(player, event.player) > 0;
        },
        trigger: {
          global: ['loseAfter', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        direct: true,
        filter: function (event, player) {
          // var evt=event.getl(player);
          // return evt&&evt.es&&evt.es.length>0;
          return game.hasPlayer(p => {
            var evt = event.getl(p);
            return evt && evt.es && evt.es.length > 0;
          }
          );
        },
        content: function () {
          'step 0'
          event.players = game.filterPlayer(p => {
            var evt = trigger.getl(p);
            return evt && evt.es && evt.es.length > 0;
          });
          'step 1'
          event.target = event.players.shift();
          if (!event.target) {
            event.finish();
            return;
          }
          var evt = trigger.getl(event.target);
          event.num = evt && evt.es && evt.es.length;
          'step 2'
          if (!event.num) { // next target
            event.goto(1);
            return;
          }
          --event.num;
          player.chooseBool(get.prompt2('jlsg_xianzhu', (player != event.target) ? event.target : undefined))
            .set('choice', get.attitude(player, event.target) > 0);
          'step 3'
          if (result.bool) {
            player.logSkill('jlsg_xianzhu2', event.target);
            event.target.draw(2);
            event.goto(2);
          } else {
            event.goto(1);
          }
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
      // jlsg_xianzhu2: {
      //   audio: "jlsg_xianzhu",
      //   trigger: { global: 'loseEnd' },
      //   check: function (event, player) {
      //     return get.attitude(player, event.player) > 0;
      //   },
      //   filter: function (event, player) {
      //     for (var i = 0; i < event.cards.length; i++) {
      //       if (event.cards[i].original == 'e') return true;
      //     }
      //     return false;
      //   },
      //   logTarget: 'player',
      //   content: function () {
      //     var num = 0;
      //     for (var i = 0; i < trigger.cards.length; i++) {
      //       if (trigger.cards[i].original == 'e') num += 2;
      //     }
      //     trigger.player.draw(num);
      //   },
      //   ai:{
      //     noe:true,
      //     reverseEquip:true,
      //     effect:{
      //       target:function(card,player,target,current){
      //         if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
      //       }
      //     }
      //   }
      // },
      jlsg_liangyuan: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        skillAnimation: true,
        limited: true,
        animationColor: 'fire',
        init: function (player) {
          player.storage.jlsg_liangyuan = false;
        },
        filter: function (event, player) {
          return !player.storage.jlsg_liangyuan;
        },
        filterTarget: function (card, player, target) {
          return player != target && target.hasSex('male');
        },
        content: function () {
          player.storage.jlsg_liangyuan = true;
          target.addSkill('jlsg_liangyuan2');
        },
        ai: {
          order: 6,
          result: {
            target: 3,
          },
          threaten: function (player, target) {
            if (game.hasPlayer(function (target1) {
              return target.hasSkill('jlsg_liangyuan2');
            })) return 3;
          }
        }
      },
      jlsg_liangyuan2: {
        charlotte: true,
        mark: true,
        intro: {
          content: 'mark'
        },
        marktext: '缘',
        trigger: { global: 'phaseEnd' },
        filter: function (event, player) {
          return event.player.hasSkill('jlsg_liangyuan') && event.getParent().name == "phaseLoop";
        },
        forced: true,
        content: function () {
          player.insertPhase(event.name);
        }
      },
      jlsg_tianzi: {
        srlose: true,
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseDrawBefore' },
        filter: function (event, player) {
          return !event.numFixed;
        },
        check: function (event, player) {
          return game.countPlayer() - event.num > 1;
        },
        content: function () {
          "step 0"
          trigger.changeToZero();
          event.current = player.next;
          "step 1"
          event.current.chooseCard('交给' + get.translation(player) + '一张手牌或令其摸一张牌').ai = function (card) {
            if (ai.get.attitude(event.current, player) > 0) {
              return -1;
            }
            else {
              return 3 - ai.get.value(card);
            }
          }
          "step 2"
          if (result.bool == false) {
            event.current.line(player, 'green');
            game.log(get.translation(event.current) + '让' + get.translation(player) + '摸了一张牌');
            player.draw();
          }
          else {
            player.gain(result.cards[0]);
            event.current.$give(1, player);
          }
          if (event.current.next != player) {
            event.current = event.current.next;
            game.delay(0.5);
            event.goto(1);
          }
        }
      },
      jlsg_meixin: {
        audio: "ext:极略/audio/skill:4",
        enable: 'phaseUse',
        usable: 1,
        filterCard: true,
        position: 'he',
        filterTarget: function (card, player, target) {
          if (player == target) return false;
          return target.hasSex('male');
        },
        check: function (card) {
          return 6 - get.value(card);
        },
        content: function () {
          target.markSkillCharacter('jlsg_meixin', player, '魅心', '本阶段当你使用一张基本牌后，该目标弃置一张牌；当你使用一张锦囊牌后，你获得该目标一张牌；当你使用一张装备牌后，你对该目标造成1点伤害。');
          player.storage.jlsg_meixin = target;
          player.addTempSkill('jlsg_meixin2', 'phaseAfter');
          player.addTempSkill('jlsg_meixin3', 'phaseAfter');
        },
        ai: {
          threaten: 3,
          order: 15,
          expose: 0.3,
          result: {
            target: function (player, target) {
              return -target.countCards('h') - 1;
            }
          }
        }
      },
      jlsg_meixin2: {
        trigger: { player: 'useCardAfter' },
        filter: function (event, player) {
          return player.storage.jlsg_meixin && player.storage.jlsg_meixin.isAlive();
        },
        forced: true,
        content: function () {
          var target = player.storage.jlsg_meixin;

          if (get.type(trigger.card, 'trick') == 'basic' && target.countCards('he') > 0) {
            player.logSkill('jlsg_meixin', target);
            target.chooseToDiscard('he', true);
          }
          if (get.type(trigger.card, 'trick') == 'trick' && target.countCards('he') > 0) {
            player.logSkill('jlsg_meixin', target);
            player.gainPlayerCard('he', target, true);
          }
          if (get.type(trigger.card, 'trick') == 'equip') {
            player.logSkill('jlsg_meixin', target);
            target.damage();
          }
        }
      },
      jlsg_meixin3: {
        trigger: { player: 'phaseEnd' },
        forced: true,
        popup: false,
        filter: function (event, player) {
          return player.storage.jlsg_meixin && player.storage.jlsg_meixin.isAlive();
        },
        content: function () {
          var target = player.storage.jlsg_meixin;
          target.unmarkSkill('jlsg_meixin');
          delete player.storage.jlsg_meixin;
        }
      },
      jlsg_lihun: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseEnd' },
        filter: () => true,
        async cost(event, trigger, player) {
          event.result = await player.chooseTarget(get.prompt2("jlsg_lihun"), lib.filter.notMe)
            .set('ai', target => {
              return get.rank(target) - get.attitude(get.player(), target);
            })
            .forResult()
        },
        async content(event, trigger, player) {
          const target = event.targets[0];
          target.addTempSkill('jlsg_lihun_buff', { player: 'phaseAfter' });
          player.storage.jlsg_lihun = target;
          target.insertPhase("jlsg_lihun");
        },
        group: "jlsg_lihun_swapControl",
        subSkill: {
          swapControl: {
            trigger: {
              global: ["phaseBeginStart", "phaseAfter", "dieEnd"],
            },
            filter(event, player) {
              if (!player.storage.jlsg_lihun) return false;
              return player.storage.jlsg_lihun == event.player;
            },
            charlotte: true,
            forceDie: true,
            forced: true,
            popup: false,
            content() {
              if (
                event.triggername == "phaseBeginStart"
                && (!trigger.player._trueMe || trigger.player._trueMe != player)
              ) {
                trigger.player._trueMe = player;
                game.addGlobalSkill("autoswap");
                if (trigger.player == game.me) {
                  game.notMe = true;
                  if (!_status.auto) ui.click.auto();
                }
              }
              else {
                if (trigger.player == game.me) {
                  if (!game.notMe) game.swapPlayerAuto(trigger.player._trueMe);
                  else delete game.notMe;
                  //if (!_status.auto) ui.click.auto();
                }
                delete player.storage.jlsg_lihun;
                delete trigger.player._trueMe;
              }
            },
          },
          buff: {
            mark: true,
            marktext: '离',
            intro: {
              name: '离魂',
              content: '使用牌无次数距离限制,且可以指定任意角色为目标,且可指定任意名目标',
            },
            mod: {
              cardUsable: () => true,
              targetInRange: () => true,
              playerEnabled: (card, player, target) => {
                let info = get.info(card);
                if (!info) return;
                if (info.modTarget) {
                  if (typeof info.modTarget == 'boolean') return info.modTarget;
                  else if (typeof info.modTarget == 'function') return Boolean(info.modTarget(card, player, target));
                }
                if (info.selectTarget) return true;
              },
              selectTarget(card, player, num) {
                if (get.info(card).allowMultiple === false) {
                  if (num[1] < 0) {
                    if (num[0] === num[1]) num[0] = 1;
                    num[1] = 1;
                  }
                }
                else if (num[1] > 0) {
                  num[1] = Infinity;
                }
                else if (num[0] <= -1 || num[1] <= -1) {
                  num[0] = 1;
                  num[1] = Infinity;
                }
                else if (get.info(card, player)?.filterTarget) {
                  if (typeof num == "number") num = [num, num];
                  num[0] = 1;
                  num[1] = Infinity;
                }
              },
            },
          },
        }
      },
      jlsg_jueshi: {
        audio: "ext:极略/audio/skill:2",
        priority: 114514,
        forced: true,
        trigger: { player: 'showCharacterEnd' },
        delay: false,
        init: function (player) {
          if (player.hasSkill('jlsg_jueshi')) {
            player.useSkill('jlsg_jueshi');
          };
        },
        filter: function (event, player) {
          return player.maxHp != 1;
        },
        content: function () {
          player.maxHp = 1;
          player.update();
        },
        group: ['jlsg_jueshi2', 'jlsg_jueshi_guard'],
        subSkill: {
          guard: {
            audio: 'jlsg_jueshi',
            charlotte: true,
            forced: true,
            trigger: { player: ['gainMaxHpBefore', 'loseMaxHpBefore'] },
            filter: function (event, player) {
              return player.hasSkill('jlsg_jueshi');
            },
            content: function () {
              trigger.cancel();
            },
          }
        },
      },
      jlsg_jueshi2: {
        audio: 'jlsg_jueshi',
        trigger: { player: 'dying' },
        locked: true,
        direct: true,
        async content(event, trigger, player) {
          const cards = Array.from(ui.cardPile.childNodes)
            .filter(c => ['tao', 'jiu', 'jlsgqs_mei'].includes(c.name))
            .concat(game.filterPlayer()
              .map(p => p.getCards('h', c => ['tao', 'jiu', 'jlsgqs_mei'].includes(c.name)))
              .flat())
            .filter(card => {
              if (trigger?.filterCard) {
                let filter = trigger.filterCard;
                if (typeof filter == "function") return filter(card, player, trigger);
                else if (typeof filter == "boolean") return filter;
              }
              return player.canUse(card, player, false, trigger);
            });
          while (player.isDying()) {
            await player.logSkill(event.name);
            const card = cards.randomRemove();
            if (!card) break;
            const next = player.useCard(card, player);
            const owner = get.owner(card);
            if (owner && owner != player) {
              next.throw = false;
              owner.$throw(card);
            }
            await next;
          }
        }
      },
      jlsg_shayi: {
        audio: "ext:极略/audio/skill:4",
        trigger: { player: 'phaseUseBegin' },
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        forced: true,
        content: function () {
          'step 0'
          player.showHandcards();
          'step 1'
          if (!player.countCards('h', 'sha')) {
            player.addTempSkill('jlsg_shayi_buff', 'phaseAfter');
          } else {
            player.draw();
          }
        },
        mod: {
          cardUsable: function (card, player, num) {
            if (card.name == 'sha') return Infinity;
          },
          targetInRange: function (card) {
            if (card.name == 'sha') return true;
          }
        },
        subSkill: {
          buff: {
            audio: 'ext:极略/audio/skill:2',
            enable: ['chooseToRespond', 'chooseToUse'],
            filterCard: function (card) {
              return get.color(card) == 'black';
            },
            position: 'hes',
            viewAs: { name: 'sha' },
            viewAsFilter: function (player) {
              if (!player.countCards('hes', { color: 'black' })) return false;
            },
            prompt: '将一张黑色牌当杀使用或打出',
            check: function (card) {
              return 4 - get.value(card)
            },
            ai: {
              skillTagFilter: function (player) {
                if (!player.countCards('hes', { color: 'black' })) return false;
              },
              respondSha: true,
            },
          }
        }
      },
      jlsg_zhenhun: {
        audio: "ext:极略/audio/skill:true",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return player != target;
        },
        filer: function (event, player) {
          return player.countCards('he') > 0;
        },
        filterCard: true,
        check: function (card) {
          return 4 - get.value(card);
        },
        selectTarget: -1,
        content: function () {
          if (!target.hasSkill('jlsg_zhenhun_debuff')) {
            var list = [];
            for (var i = 0; i < target.skills.length; i++) {
              if (!get.is.locked(target.skills[i])) {
                list.push(target.skills[i]);
              }
            }
            if (list.length > 0) {
              target.disableSkill('jlsg_zhenhun', list);
              target.addSkill('jlsg_zhenhun_debuff');
            }
          }
        },
        ai: {
          order: 10,
          result: {
            player: function (player) {
              if (player.countCards('h') > 2) return 1;
              return -1;
            },
            target: function (target) {
              var num = 0;
              for (var i = 0; i < target.skills.length; i++) {
                if (!get.is.locked(target.skills[i])) {
                  if (target.skills[i].enable && target.skills[i].enable == 'phaseUse') {
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
          threaten: 1.3
        },
        subSkill: {
          debuff: {
            trigger: { global: 'phaseAfter' },
            forced: true,
            popup: false,
            content: function () {
              player.enableSkill('jlsg_zhenhun');
              player.removeSkill('jlsg_zhenhun_debuff');
            },
            mark: true,
            intro: {
              content: function (st, player) {
                var storage = player.disabledSkills.jlsg_zhenhun;
                if (storage && storage.length) {
                  var str = '失效技能：';
                  for (var i = 0; i < storage.length; i++) {
                    if (lib.translate[storage[i] + '_info']) {
                      str += get.translation(storage[i]) + '、';
                    }
                  }
                  return str.slice(0, str.length - 1);
                }
              }
            }
          }
        }
      },
      jlsg_yinshi: {
        forced: true,
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'damageBegin4' },
        filter: function (event) {
          return event.num > 0;
        },
        content: function () {
          player.draw(trigger.num);
          if (trigger.nature !== 'thunder') {
            trigger.cancel();
          }
        },
        ai: {
          nofire: true,
          // nothunder: true,
          nodamage: true,
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'damage')) {
                if (get.tag(card, 'thunderDamage')) {
                  return [1, 0.3];
                }
                return [0, 0.3];
              }
            }
          },
        },
      },

      jlsg_zhitian: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseBegin' },
        forced: true,
        content: function () {
          "step 0"
          if (!_status.characterlist) {
            lib.skill.pingjian.initList();
          }
          _status.characterlist.randomSort();
          var list = [];
          var skills = [];
          var map = [];
          for (var i = 0; i < _status.characterlist.length; i++) {
            var name = _status.characterlist[i];
            if (name.indexOf('zuoci') != -1 || name.indexOf('xushao') != -1) continue;
            if (!get.character(name)) continue;
            var skills2 = (get.character(name)[3] ?? []);
            if (!skills2.length) continue;
            for (var j = 0; j < skills2.length; j++) {
              if (skills.includes(skills2[j])) {
                list.add(name);
                if (!map[name]) map[name] = [];
                map[name].push(skills2[j]);
                skills.add(skills2[j]);
                continue;
              }
              var list2 = [skills2[j]];
              game.expandSkills(list2);
              for (var k = 0; k < list2.length; k++) {
                var info = lib.skill[list2[k]];
                if (!info || info.silent || info.hiddenSkill || info.unique || info.charlotte) continue;
                list.add(name);
                if (!map[name]) map[name] = [];
                map[name].push(skills2[j]);
                skills.add(skills2[j]);
              }
            }
            if (list.length > 2) break;
          };
          if (!skills.length) event.finish();
          else {
            player.chooseControl(skills)
              .set('dialog', ['选择一个技能', [list, 'character']])
              .set('ai', function () { return Math.floor(Math.random() * _status.event.controls.length); });
          }
          "step 1"
          if (!lib.skill[result.control]) return;
          event.skill = result.control;
          player.chooseTarget(true)
            .set('prompt2', '将所有手牌交给一名角色')
            .set('ai', function (target) {
              return get.attitude(player, target);
            });
          "step 2"
          if (!result.bool) return;
          if (result.targets[0] == player) return;
          player.line(result.targets[0], 'green');
          var cards = player.getCards('h');
          result.targets[0].gain(cards, player, 'giveAuto');
          "step 3"
          result.targets[0].addSkills(event.skill);
          result.targets[0].loseHp();
        },
      },
      jlsg_zhiji: {
        audio: "ext:极略/audio/skill:3",
        usable: 1,
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countCards('he', { subtype: 'equip1' });
        },
        filterCard: function (card) {
          return get.subtype(card) == 'equip1';
        },
        position: 'he',
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
        group: ['jlsg_zhiji_damage'],
        subSkill: {
          damage: {
            audio: 'ext:极略/audio/skill:1',
            trigger: { player: 'damageEnd' },
            check: () => true,
            content: function () {
              var field = undefined;
              if (Math.random() > 0.5) {
                field = 'discardPile';
              }
              var card = get.cardPile(function (card) {
                return get.subtype(card) == 'equip1';
              }, field);
              if (!card) {
                if (!field) {
                  card = get.cardPile(function (card) {
                    return get.subtype(card) == 'equip1';
                  }, 'discardPile');
                } else {
                  card = get.cardPile(function (card) {
                    return get.subtype(card) == 'equip1';
                  });
                }
              }
              if (card) {
                player.gain(card, 'gain2');
                game.log(player, '从' + (field == undefined ? '' : '弃') + '牌堆获得了', card);
              }
            }
          }
        },
        ai: {
          order: 10,
          result: {
            target: -1.5
          },
          tag: {
            damage: 1
          },
        }
      },
      jlsg_yuanhua: {
        audio: "ext:极略/audio/skill:2",
        mark: true,
        intro: {
          content: '发动元化移出游戏了#张牌',
        },
        init: function (player) {
          player.storage.jlsg_yuanhua = 0;
        },
        locked: true,
        direct: true,
        trigger: { player: 'gainAfter' },
        filter: function (event, player) {
          return event.cards && event.cards.some(c => c.name == 'tao');
        },
        content: function () {
          "step 0"
          event.cards = trigger.cards.filter(c => c.name == 'tao');
          "step 1"
          event.card = event.cards.pop();
          player.logSkill(event.name);
          if (player.isDamaged()) {
            player.recover();
          }
          "step 2"
          player.draw(2, 'nodelay');
          "step 3"
          game.log(player, '将', event.card, '移出游戏');
          player.lose(event.card, ui.special);
          player.addMark('jlsg_yuanhua', 1, false);
          "step 4"
          if (event.cards.length) {
            event.goto(1);
          }
        },
      },
      jlsg_guiyuan: {
        audio: "ext:极略/audio/skill:1",
        global: 'jlsg_guiyuan_ai',
        enable: 'phaseUse',
        usable: 1,
        content: function () {
          'step 0'
          player.loseHp();
          event.targets = game.filterPlayer(p => p != player);
          event.targets.sortBySeat();
          player.line(event.targets, 'green');
          event.gained = false;
          'step 1'
          event.target = event.targets.shift();
          if (event.target.countCards('h', 'tao')) {
            var card = event.target.getCards('h', 'tao').randomGet();
            player.gain(event.target, card, 'visible', 'give');
            event.gained = true;
          }
          'step 2'
          if (event.targets.length) {
            event.goto(1);
          } else {
            var card = get.cardPile(c => c.name == 'tao');
            if (card) player.gain(card, 'gain2');
          }
        },
        ai: {
          order: 12,
          result: {
            player: function (player) {
              return (player.hp > 1 || player.canSave(player)) ? 1 : 0;
            }
          }
        }
      },
      jlsg_guiyuan_ai: {
        charlotte: true,
        ai: {
          nokeep: true,
          skillTagFilter: function (player) {
            if (!game.hasPlayer(p => p.hasSkill('jlsg_guiyuan') && get.attitude(player, p) < 2)) return false;
          },
        }
      },
      jlsg_chongsheng: {
        audio: "ext:极略/audio/skill:1",
        limited: true,
        trigger: { global: 'dying' },
        check: function (event, player) {
          if (get.attitude(player, event.player) < 4) return false;
          if (player.countCards('h', function (card) {
            var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
            if (mod2 != 'unchanged') return mod2;
            var mod = game.checkMod(card, player, event.player, 'unchanged', 'cardSavable', player);
            if (mod != 'unchanged') return mod;
            var savable = get.info(card).savable;
            if (typeof savable == 'function') savable = savable(card, player, event.player);
            return savable;
          }) >= 1 - event.player.hp) return false;
          if (event.player == player || event.player == get.zhu(player)) return true;
          return !player.hasUnknown();
        },
        filter: function (event, player) {
          return event.player.hp <= 0;
        },
        skillAnimation: true,
        animationColor: 'gray',
        logTarget: 'player',
        content: function () {
          'step 0'
          player.awakenSkill('jlsg_chongsheng');
          'step 1'
          var num = player.storage.jlsg_yuanhua || 1;
          trigger.player.maxHp = num;
          trigger.player.recover(trigger.player.maxHp - trigger.player.hp);

          'step 2'
          if (!trigger.player.isAlive() || !trigger.player.group || trigger.player.group == 'unknown' || trigger.player.isUnseen(0)) {
            event.finish();
            return;
          }
          var group = trigger.player.group;
          var list = jlsg.characterList.filter(c => get.character(c, 1) == group);

          var players = game.players.concat(game.dead);
          for (var i = 0; i < players.length; i++) {
            list.remove(players[i].name);
            list.remove(players[i].name1);
            list.remove(players[i].name2);
          }
          list = list.randomGets(3);
          if (!list.length) {
            event.finish();
            return;
          }
          trigger.player.chooseButton().set('ai', function (button) {
            return get.rank(button.link, true) - get.character(button.link, 2) -
              (get.rank(trigger.player.name1, true) - get.character(trigger.player.name1, 2));
          }).set('createDialog', ['将武将牌替换为一名角色', [list, 'character']]);
          'step 3'
          if (result.bool) {
            trigger.player.reinit(trigger.player.name, result.links[0]);
          }
        },
      },
      jlsg_old_lvezhen: {
        shaRelated: true,
        audio: "jlsg_lvezhen",
        trigger: { player: 'shaBegin' },
        filter: function (event, player) {
          return event.target.countDiscardableCards(player, 'he');
        },
        check: function (event, player) {
          return get.attitude(player, event.target) < 0;
        },
        content: function () {
          'step 0'
          event.cards = get.cards(3);
          game.cardsGotoOrdering(cards);
          player.showCards(event.cards);
          'step 1'
          event.numx = 0;
          for (var i = 0; i < event.cards.length; i++) {
            if (get.type(event.cards[i]) != 'basic') event.numx++;
          }
          // player.$throw(event.cards);
          if (event.numx) {
            player.discardPlayerCard('请选择想要弃置的牌', trigger.target,
              [1, Math.min(event.numx, trigger.target.countDiscardableCards(player, 'he'))], 'he').set(
                'forceAuto', true);
          }
        }
      },
      jlsg_old_youlong: {
        audio: "jlsg_youlong",
        enable: 'phaseUse',
        mark: true,
        marktext: "游",
        intro: {
          content: function () {
            return '牌堆数' + ui.cardPile.childNodes.length + '张' + '||' + '弃牌数' + ui.discardPile.childNodes.length + '张';
          }
        },
        filterCard: function (card) {
          return get.color(card) == 'black';
        },
        filter: function (event, player) {
          return ui.discardPile.childNodes.length > ui.cardPile.childNodes.length;
        },
        position: 'hs',
        viewAs: { name: 'shunshou' },
        viewAsFilter: function (player) {
          if (!player.countCards('hs', { color: 'black' })) return false;
        },
        prompt: '将一张黑色手牌当顺手牵羊使用',
        check: function (card) {
          return 8 - get.value(card);
        },
        ai: {
          order: 9.5,
        }
      },
      jlsg_old_danjing: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        direct: true,
        filterTarget: function (card, player, target) {
          return player != target;
        },
        content: function () {
          'step 0'
          player.chooseControl('令其摸三张牌', '令其弃三张牌').ai = function () {
            if (ai.get.attitude(player, target) > 0) return '令其摸三张牌';
            return '令其弃三张牌';
          };
          'step 1'
          if (result.control == '令其摸三张牌') {
            player.logSkill('jlsg_old_danjing1');
            player.loseHp();
            target.draw(3);
          }
          else {
            player.logSkill('jlsg_old_danjing2');
            player.loseHp();
            target.chooseToDiscard(3, 'he', true);
          }
        },
        ai: {
          order: 5,
          result: {
            player: function (player) {
              return jlsg.getLoseHpEffect(player);
            },
            target: function (player, target) {
              if (get.attitude(player, target) > 0) { return 4; }
              else {
                return Math.min(3, target.countDiscardableCards(player, 'he')) * 1.5;
              }
            }
          }
        }
      },
      jlsg_old_danjing1: {
        charlotte: true,
        audio: "ext:极略/audio/skill:true"
      },
      jlsg_old_danjing2: {
        charlotte: true,
        audio: "ext:极略/audio/skill:true"
      },
      jlsg_old_zhonghun: {
        limited: true,
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'dieBegin' },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(function (card, player, target) {
            return player != target;
          }).ai = function (target) {
            return get.attitude(player, target);
          };
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_old_zhonghun', result.targets);
            var skills = player.getSkills(null, false, false).filter(function (i) {
              var info = get.info(i);
              return info && !info.charlotte;
            });
            result.targets[0].addSkills(skills);
          }
        }
      },

      jlsg_qinyin: {
        audio: "ext:极略/audio/skill:2",
        direct: true,
        trigger: {
          player: "phaseDiscardBefore",
        },
        filter: function (event, player) {
          return true;
        },
        content: function () {
          'step 0'
          var list = ["摸两张牌，然后令所有角色各失去1点体力。"];
          if (player.countCards('he') >= 2) {
            list.push("弃两张牌，然后令所有角色各恢复1点体力。");
          }
          event.list = list;
          player.chooseControlList(event.list)
            .set('prompt', `###${get.prompt(event.name)}###跳过弃牌阶段`)
            .set('ai', function (event, player) {
              var recover = 0, lose = 1, players = game.filterPlayer();
              for (var i = 0; i < players.length; i++) {
                if (players[i].hp < players[i].maxHp) {
                  if (get.attitude(player, players[i]) > 0) {
                    if (players[i].hp < 2) {
                      lose--;
                      recover += 0.5;
                    }
                    lose--;
                    recover++;
                  } else if (get.attitude(player, players[i]) < 0) {
                    if (players[i].hp < 2) {
                      lose++;
                      recover -= 0.5;
                    }
                    lose++;
                    recover--;
                  }
                } else {
                  if (get.attitude(player, players[i]) > 0) {
                    lose--;
                  } else if (get.attitude(player, players[i]) < 0) {
                    lose++;
                  }
                }
              }
              if (player.countCards('h') < player.hp - 1) {
                lose++;
              }
              if (player.needsToDiscard()) {
                recover++;
              }
              if (lose > recover && lose > 0) return event.list.indexOf('摸两张牌，然后令所有角色各失去1点体力。');
              if (lose < recover && recover > 0 && event.list.includes('弃两张牌，然后令所有角色各恢复1点体力。')) return event.list.indexOf('弃两张牌，然后令所有角色各恢复1点体力。');
              return event.list.indexOf('cancel2');
            });
          'step 1'
          event.choice = result.index;
          if (event.list[result.index] == '摸两张牌，然后令所有角色各失去1点体力。') {
            event.recover = false;
            trigger.cancel();
            player.draw(2);
            var players = game.filterPlayer().sortBySeat();
            player.logSkill('jlsg_qinyin2');
            for (var i = 0; i < players.length; i++) {
              players[i].loseHp();
            }
          }
          else if (event.list[result.index] == '弃两张牌，然后令所有角色各恢复1点体力。') {
            event.recover = true;
            trigger.cancel();
            player.chooseToDiscard(2, 'he', true);
            var players = game.filterPlayer().sortBySeat();
            player.logSkill('jlsg_qinyin1');
            for (var i = 0; i < players.length; i++) {
              players[i].recover();
            }
          } else {
            event.finish();
          }
          'step 2'
          if (!player.isIn()) {
            event.finish();
            return;
          }
          let evts = player.getAllHistory('useSkill', e => lib.translate[e.skill] == '业炎');
          if (!evts.length) {
            event.finish();
            return;
          }

          var prompt = `###是否再次触发〖业炎〗?###`;
          var choice;
          if (!event.recover) {
            prompt += '令所有角色各失去1点体力';
            choice = game.filterPlayer()
              .map(p => -get.attitude(player, p) / p.hp)
              .reduce((a, b) => a + b, 0) > Math.random();
          } else {
            prompt += '令所有角色各恢复1点体力';
            choice = game.filterPlayer()
              .map(p => get.recoverEffect(p, player, player))
              .reduce((a, b) => a + b, 0) > Math.random();
          }
          player.chooseBool(prompt, choice);
          'step 3'
          if (!result.bool) {
            event.finish();
            return;
          }
          var players = game.filterPlayer().sortBySeat();
          if (!event.recover) {
            for (var i = 0; i < players.length; i++) {
              players[i].loseHp();
            }
          } else {
            for (var i = 0; i < players.length; i++) {
              players[i].recover();
            }
          }
        },
        group: ['jlsg_qinyin1', 'jlsg_qinyin2'],
      },
      jlsg_qinyin1: {
        audio: "ext:极略/audio/skill:true",
        charlotte: true,
      },
      jlsg_qinyin2: {
        audio: "ext:极略/audio/skill:true",
        charlotte: true,
      },
      jlsg_yeyan: {
        marktext: "炎",
        mark: true,
        forceDie: true,
        enable: "phaseUse",
        audio: "ext:极略/audio/skill:3",
        animationColor: "metal",
        skillAnimation: "legend",
        init: function (player) {
          player.storage.jlsg_yeyan = false;
        },
        filterCard(card) {
          return true;
        },
        limited: true,
        selectCard: [1, 4],
        line: "fire",
        check(card) {
          let result;
          let red = ui.selected.cards.filter(c => get.color(c) == 'red').length;

          let black = ui.selected.cards.filter(c => get.color(c) == 'black').length;
          if (get.color(card) == 'red') {
            result = game.filterPlayer()
              .map(p => get.damageEffect(p, _status.event.player, _status.event.player, 'fire'))
              .sort((a, b) => b - a)
              .slice(0, black)
              .reduce((a, b) => a + Math.max(b, 0), 0)
              - get.value(card);
          }
          else if (get.color(card) == 'black') {
            result = game.filterPlayer()
              .map(p => get.damageEffect(p, _status.event.player, _status.event.player, 'fire') * (red + 1))
              .sort((a, b) => b - a)[black];
            result = result || 0;
            result = Math.max(result, 0);
            result -= get.value(card);
          } else {
            result = -get.value(card) / 3;
          }
          return result;
        },
        filterTarget: true,
        selectTarget() {
          return [1, 1 + ui.selected.cards.filter(c => get.color(c) == 'black').length];
        },
        multitarget: true,
        multiline: true,
        content: function () {
          "step 0"
          player.awakenSkill('jlsg_yeyan');
          "step 1"
          targets.sortBySeat();
          let cnt = cards.filter(c => get.color(c, player) == 'red').length + 1;
          if (cnt * targets.length >= 5) {
            player.loseHp(3);
          }
          for (let p of targets) {
            p.damage('fire', cnt);
          }
        },
        intro: {
          content: 'limited'
        },
        ai: {
          order: 6,
          fireattack: true,
          result: {
            player: function (player, target) {
              return game.filterPlayer(p => get.attitude(player, p) < 0).length > 1 ? 5 : -5;
            },
            target: function (player, target) {
              if (target.hasSkillTag('nofire')) return 0;
              if (lib.config.mode == 'versus') return -1;
              if (player.hasUnknown()) return 0;
              return get.damageEffect(target, player, player) / get.attitude(player, target);
            }
          }
        },
      },
      jlsg_qianqi: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'enterGame',
          global: 'phaseBefore',
        },
        forced: true,
        filter: function (event) {
          return event.name != 'phase' || game.phaseNumber == 0;
        },
        content: function () {
          "step 0"
          var defend = lib.inpile.filter(c => lib.card[c].toself && lib.card[c].subtype == 'equip3');
          defend = defend.randomGet();
          if (defend) {
            var card = game.createCard(defend);
            player.$gain2(card);
            player.equip(card);
          }
          game.delayx();
          "step 1"
          var attack = lib.inpile.filter(c => lib.card[c].toself && lib.card[c].subtype == 'equip4');
          attack = attack.randomGet();
          if (attack) {
            var card = game.createCard(attack);
            player.$gain2(card);
            player.equip(card);
          }
        },
        marktext: '骑',
        intro: {
          content: 'mark',
        },
        group: ["jlsg_qianqi_gain", "jlsg_qianqi2"],
        subSkill: {
          gain: {
            audio: "jlsg_qianqi",
            trigger: {
              global: ['loseAfter', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
            },
            forced: true,
            filter: function (event, player) {
              return game.hasPlayer(p => {
                var evt = event.getl(p);
                return evt && evt.es && evt.es.some(
                  c => ['equip3', 'equip4', 'equip6'].includes(get.subtype(c, p))
                );
              });
            },
            content: function () {
              var cnt = game.countPlayer(p => {
                var evt = trigger.getl(p);
                return evt && evt.es && evt.es.some(
                  c => ['equip3', 'equip4', 'equip6'].includes(get.subtype(c, p))
                );
              });
              player.addMark("jlsg_qianqi", 2 * cnt);
            },
          },
        },
      },
      jlsg_qianqi2: {
        audio: "ext:极略/audio/skill:2",
        prompt: '弃置一枚「千骑」标记，视为使用一张杀',
        enable: 'chooseToUse',
        viewAs: {
          name: 'sha',
          storage: { jlsg_qianqi: true },
        },
        viewAsFilter: function (player) {
          return player.countMark("jlsg_qianqi") != 0;
        },
        filterCard: function () { return false },
        selectCard: -1,
        precontent: function () {
          player.removeMark("jlsg_qianqi", 1);
        },
        mod: {
          targetInRange: function (card) {
            if (card.storage && card.storage.jlsg_qianqi) return true;
          },
          cardUsable: function (card, player) {
            if (card.storage && card.storage.jlsg_qianqi) return Infinity;
          },
        },
        ai: {
          respondSha: true,
          skillTagFilter: function (player) {
            return player.countMark("jlsg_qianqi");
          },
        },
      },
      jlsg_juechen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageBegin2' },
        direct: true,
        shaRelated: true,
        filter: function (event, player) {
          return event.card && event.card.name == "sha"
            && event.player != player;
        },
        content: function () {
          "step 0"
          player.chooseControlList(get.prompt(event.name, trigger.player), [
            `改为其失去${trigger.num}点体力`,
            `改为其失去1点体力上限`,
          ], function () {
            if (get.attitude(_status.event.player, _status.event.target) < 0) {
              return _status.event.target.isDamaged ? 0 : 1;
            }
            return 2;
          }).set("target", trigger.player);
          "step 1"
          if (result.control == "cancel2") {
            event.finish();
            return;
          }
          player.logSkill(event.name, trigger.player);
          trigger.cancel();
          if (result.index == 0) {
            trigger.player.loseHp(trigger.num);
          } else {
            trigger.player.loseMaxHp();
          }
        },
      },
      jlsg_luocha: {
        audio: "ext:极略/audio/skill:2",
        initList: function () {
          if (!_status.characterlist) {
            lib.skill.pingjian.initList();
          }
          _status.jlsg_luocha_list = [];
          _status.jlsg_luocha_list_hidden = [];
          for (var c of _status.characterlist) {
            let list = (get.character(c)[3] ?? []).filter(s => lib.skill[s] && lib.translate[s] && lib.translate[s + '_info']);
            _status.jlsg_luocha_list.addArray(
              list.filter(s => lib.skill[s].shaRelated)
            );
            _status.jlsg_luocha_list_hidden.addArray(
              list.filter(s => get.plainText(get.skillInfoTranslation(s, get.player())).includes('【杀】'))
            );
          };
        },
        trigger: {
          player: "enterGame",
          global: ["phaseBefore", "dying"],
        },
        forced: true,
        filter: function (event, player, name) {
          if (name == "dying") return event.player != player;
          return event.name != 'phase' || game.phaseNumber == 0;
        },
        async content(event, trigger, player) {
          if (!_status.jlsg_luocha_list || !_status.jlsg_luocha_list_hidden) {
            lib.skill.jlsg_luocha.initList();
          }
          let num = event.triggername == "dying" ? 1 : 3;
          if (num == 1) await player.draw(2);
          if (!_status.jlsg_luocha_list.length && !_status.jlsg_luocha_list_hidden.length) {
            game.log("没有可以获得的技能了");
          } else {
            let list1 = _status.jlsg_luocha_list.filter(s => !player.hasSkill(s)).randomSort(),
              list2 = _status.jlsg_luocha_list_hidden.filter(s => !player.hasSkill(s)).randomSort();
            let skills = list1.concat(list2)
              .unique()
              .filter(skill => {
                const info = lib.skill[skill];
                if (info.ai?.combo) return player.hasSkill(info.ai.combo, null, false, false);
                return true;
              });
            if (!skills.length) game.log("没有可以获得的技能了");
            else await player.addSkills(skills.randomGets(num));
          }
          await game.delayx();
        },
      },
      jlsg_shajue: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: lib.filter.notMe,
        precontent: function () {
          player.loseHp();
        },
        content: function () {
          "step 0"
          event.cards = new Set(player.getCards('h'));
          "step 1"
          var card = player.getCards('h', c => event.cards.has(c)).randomGet();
          event.cards.delete(card);
          if (!card || !target.isIn()) {
            event.finish();
            return;
          }
          player.useCard({
            name: 'sha',
            nature: lib.inpile_nature.concat(null).randomGet(),
            storage: {
              jlsg_shajue: true,
            }
          }, [card], target);
          event.redo();
        },
        ai: {
          order: function () {
            return get.order({ name: 'sha' }) - 0.5;
          },
          result: { target: -2 },
          threaten: 2.5,
          unequip: true,
          skillTagFilter: function (player, tag, arg) {
            if (!arg || !arg.card || !arg.card.storage || !arg.card.storage.jlsg_shajue) return false;
          },
        },
      },
      jlsg_guiqu: {
        audio: "ext:极略/audio/skill:2",
        enable: 'chooseToUse',
        getSkills(player) {
          return player.getSkills(null, false, false).filter(
            s => lib.translate[s] && lib.translate[s + '_info']
              && lib.skill[s] && !lib.skill[s].nopopup
              && !lib.skill[s].charlotte
              && !lib.skill[s].equipSkill
          );
        },
        filter: function (event, player) {
          return player.isDying() && event.filterCard({ name: 'tao' }, player, event) && lib.skill.jlsg_guiqu.getSkills(player).length > 1;
        },
        hiddenCard: function (player, name) {
          return player.isDying() && name === 'tao'
            && lib.skill.jlsg_guiqu.getSkills(player).length > 1;
        },
        chooseButton: {
          dialog: function (event, player) {
            var dialog = ui.create.dialog('鬼躯', 'hidden');
            var table = document.createElement('div');
            table.classList.add('add-setting');
            table.style.margin = '0';
            table.style.width = '100%';
            table.style.position = 'relative';
            var skills = lib.skill.jlsg_guiqu.getSkills(player);
            // skills = skills.remove('jlsg_guiqu');
            for (var s of skills) {
              var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
              td.innerHTML = '<span>' + (lib.translate[s]) + '</span>';
              td.link = s;
              td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
              table.appendChild(td);
              dialog.buttons.add(td);
            }
            dialog.content.appendChild(table);
            dialog.add('　');
            return dialog;
          },
          check: function (button) {
            return Math.random();
          },
          prompt: function (links, player) {
            return `失去〖${get.translation(links[0])}〗,视为使用一张【桃】`;
          },
          backup: function (links) {
            return {
              audio: 'jlsg_guiqu',
              viewAs: {
                name: 'tao',
                isCard: true,
              },
              selectCard: -1,
              filterCard: () => false,
              skill: links[0],
              onuse: function (links, player) {
                player.removeSkills(this.skill);
                player.popup(this.skill);
              },
            };
          },
        },
        ai: {
          result: {
            player: function (player) {
              if (_status.event.dying) return get.attitude(player, _status.event.dying);
              return 1;
            },
          },
        },
        mod: {
          maxHandcard: function (player, num) {
            return lib.skill.jlsg_guiqu.getSkills(player).length;
          }
        }
      },
      jlsg_shenfu: {
        audio: "ext:极略/audio/skill:3",
        init: function (player) {
          player.storage.jlsg_shenfu = [];
        },
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (player.countCards('h') >= 4) return false;
          var evt = event.getl(player);
          return evt && evt.hs && evt.hs.length;
        },
        frequent: true,
        content: function () {
          'step 0'
          player.drawTo(4);
          'step 1'
          let cards = trigger.getl(player).hs;
          let suit = get.suit(cards, player);
          if (!suit) {
            event.finish();
            return;
          }
          let storage = player.storage[event.name];
          storage.unshift(suit);
          if (storage.length > 4) {
            storage.length = 4;
          }
          player.markSkill(event.name);

          storage = new Set(storage);
          if (storage.size == 4) {
            player.chooseTarget(`###${get.prompt(event.name)}###对一名角色造成1点雷电伤害`)
              .set('ai', function (target) {
                return get.damageEffect(target, _status.event.player, _status.event.player, 'thunder');
              });
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            result.targets[0].damage('thunder');
          }
        },
        marktext: '赋',
        intro: {
          content: function (storage, player, name) {
            let suits = storage.slice();
            while (suits.length < 4) {
              suits.push(null);
            }
            suits.unshift('_');
            return suits.reverse().map(
              s => {
                if (!s) {
                  return 's';
                }
                if (s == 'none') {
                  return '无';
                }
                return get.translation(s);
              },
            ).join(' ');
          },
        },
        ai: {
          noh: true,
        }
      },
      jlsg_lvezhen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'useCardToPlayered' },
        filter: function (event, player) {
          var phaseUse = _status.event.getParent('phaseUse');
          if (phaseUse.name != 'phaseUse' || phaseUse.player != player) {
            return false;
          }
          return (event.card.name == 'sha' || get.type2(event.card) == 'trick') &&
            event.targets.length == 1 && event.target.countGainableCards(player, 'he') &&
            !player.hasSkill('jlsg_lvezhen2');
        },
        content: function () {
          player.addTempSkill('jlsg_lvezhen2', 'phaseUseAfter');
          var card = trigger.target.getGainableCards(player, 'he').randomGet();
          player.gain(card, trigger.target, 'giveAuto', 'bySelf');
        },
      },
      jlsg_lvezhen2: {},
      jlsg_youlong: {
        audio: "ext:极略/audio/skill:2",
        forced: true,
        charlotte: true,
        trigger: { player: 'showCharacterEnd' },
        delay: false,
        init: function (player) {
          if (player.hasSkill('jlsg_youlong')) {
            player.useSkill('jlsg_youlong');
          };
        },
        filter: function (event, player) {
          return !player.isTurnedOver();
        },
        content: function () {
          player.turnOver(true)._triggered = null;
        },
        group: ['jlsg_youlong2', 'jlsg_youlong_guard'],
        subSkill: {
          guard: {
            silent: true,
            charlotte: true,
            trigger: { player: 'turnOverBefore' },
            filter: function (event, player) {
              return player.isTurnedOver() && player.hasSkill('jlsg_youlong');
            },
            content: function () {
              trigger.cancel();
              game.log(player, '取消了翻面');
            },
          }
        },
        ai: {
          effect: {
            target: function (card, player, target, current) {
              if (get.type(card) == 'delay') {
                return 0;
              }
            }
          }
        },
      },
      jlsg_youlong2: {
        audio: "jlsg_youlong",
        trigger: { global: 'phaseEnd' },
        filter: function (event, player) {
          return player != event.player;
        },
        forced: true,
        content: function () {
          'step 0'
          player.draw();
          'step 1'
          var next = player.phaseUse();
          event.next.remove(next);
          trigger.next.push(next);
        },
      },
      jlsg_danjing: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: [
            "damageEnd",
            "loseHpEnd",
            "loseMaxHpEnd",
            "loseAfter",
          ],
        },
        filter: function (event, player) {
          if (event.name != 'lose') return true;
          return event.type == 'discard';
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2(event.name), lib.filter.notMe).set("ai",
            function (target) {
              return -get.attitude(_status.event.player, target) + Math.random() - 0.5;
            },
          );
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = result.targets[0];
          player.logSkill(event.name, target);
          if (target.ai.shown > player.ai.shown) {
            player.addExpose(0.2);
          }
          switch (trigger.name) {
            case "damage":
              target.damage(trigger.num);
              break;
            case "loseHp":
              target.loseHp(trigger.num);
              break;
            case "loseMaxHp":
              target.loseMaxHp(trigger.num);
              break;
            case "lose":
              target.chooseToDiscard(true, 'he', trigger.cards.length);
              break;
          }
        },
        ai: {
          maixie_defend: true,
        },
      },
      jlsg_zhonghun: {
        audio: "ext:极略/audio/skill:2",
        limited: true,
        enable: "phaseUse",
        skillAnimation: true,
        animationColor: 'thunder',
        filterTarget: lib.filter.notMe,
        content() {
          'step 0'
          player.awakenSkill(event.name);
          'step 1'
          player.loseMaxHp();
          target.gainMaxHp();
          target.recover();
          'step 2'
          player.storage.jlsg_zhonghun2 = target;
          player.markSkill("jlsg_zhonghun2");
          player.addSkill("jlsg_zhonghun2");
        },
        ai: {
          order: 3,
          result: {
            player: function (player, target) {
              if (['nei', 'rYe', 'bYe', 'zhu', 'rZhu', 'bZhu'].includes(player.identity)) {
                return -5;
              }
              return player.isHealthy() ? -1 : 0;
            },
            target: function (player, target) {
              if (target.hp == 1) return 5;
              if (target.hp == 2) return 2;
              return 1;
            }
          },
          threaten: 2
        },
        group: "jlsg_zhonghun3",
      },
      jlsg_zhonghun3: {
        trigger: {
          global: 'phaseBefore',
          player: 'enterGame',
        },
        filter: function (event, player) {
          return (event.name != 'phase' || game.phaseNumber == 0);
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2("jlsg_zhonghun"), lib.filter.notMe).set("ai",
            function (target) {
              return get.attitude(_status.event.player, target) - 10;
            }
          );
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.addExpose(0.4);
          player.useSkill("jlsg_zhonghun", result.targets);
        },
      },
      jlsg_zhonghun2: {
        audio: "jlsg_zhonghun",
        intro: {
          content: "player",
        },
        locked: false,
        forced: true,
        trigger: {
          global: "damageBegin4",
          player: "dieBegin",
        },
        filter: function (event, player) {
          if (event.name == "damage") {
            return player.storage.jlsg_zhonghun2 == event.player;
          } else {
            return player.storage.jlsg_zhonghun2;
          }
        },
        content: function () {
          if (trigger.name == "damage") {
            trigger.player = player;
          } else {
            var skills = player.getSkills(null, false, false).filter(function (i) {
              var info = get.info(i);
              return info && !info.charlotte;
            });
            var target = player.storage.jlsg_zhonghun2;
            target.addSkills(skills);
          }
        },
      },
      jlsg_yinyang_s: {
        audio: "ext:极略/audio/skill:2",
        derivation: ['jlsg_jiyang', 'jlsg_jiyin', 'jlsg_xiangsheng'],
        forced: true,
        trigger: {
          player: ['showCharacterEnd', 'changeHp', 'gainMaxHpAfter', 'loseMaxHpAfter'],
        },
        delay: false,
        init: function (player) {
          if (player.hasSkill('jlsg_yinyang_s')) {
            player.useSkill('jlsg_yinyang_s');
          };
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
            return 'jlsg_jiyang';
          }
          if (diff < 0) {
            return 'jlsg_jiyin';
          }
          return 'jlsg_xiangsheng';
        },
      },
      jlsg_jiyang: {
        audio: "ext:极略/audio/skill:2",
        sub: true,
        unique: true,
        init: function (player) {
          player.addMark('jlsg_jiyang', 3);
        },
        onremove(player, skill) {
          delete player.storage[skill];
          var card = get.cardPile(function (card) {
            return get.color(card, false) == "red";
          });
          if (card) {
            player.gain(card, 'gain2');
          }
        },
        marktext: '阳',
        intro: {
          name: '阳',
          content: 'mark',
        },
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (!player.countMark('jlsg_jiyang')) {
            return false;
          }
          var evt = event.getl(player);
          if (!evt || !evt.cards2 || !evt.cards2.length) return false;
          for (var i of evt.cards2) {
            if (get.color(i, player) == 'red') return true;
          }
          return false;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt(event.name))
            .set('prompt2', '令一名角色回复1点体力，若其未受伤则改为加1点体力上限。')
            .set('ai', function (target, targets) {
              var player = _status.event.player;
              var eff = get.attitude(player, target);
              eff = 2 * Math.atan(eff);
              if (!target.isHealthy()) {
                eff = get.recoverEffect(target, player, player);
              }
              return eff - 0.5 + Math.random();
            });
          'step 1'
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
          player.addMark('jlsg_jiyin', 3);
        },
        onremove(player, skill) {
          delete player.storage[skill];
          var card = get.cardPile(function (card) {
            return get.color(card, false) == "black";
          });
          if (card) {
            player.gain(card, 'gain2');
          }
        },
        marktext: '阴',
        intro: {
          name: '阴',
          content: 'mark',
        },
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (!player.countMark('jlsg_jiyin')) {
            return false;
          }
          var evt = event.getl(player);
          if (!evt || !evt.cards2 || !evt.cards2.length) return false;
          for (var i of evt.cards2) {
            if (get.color(i, player) == 'black') return true;
          }
          return false;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt(event.name))
            .set('prompt2', '对一名角色造成1点雷电伤害，若其已受伤则改为减1点体力上限。')
            .set('ai', function (target, targets) {
              var player = _status.event.player;
              var eff = get.attitude(player, target);
              eff = -2 * Math.atan(eff);
              if (target.isHealthy()) {
                eff = get.damageEffect(target, player, player, 'thunder');
              }
              return eff - 0.5 + Math.random();
            });
          'step 1'
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
            target.damage('thunder');
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
          player.addMark('jlsg_xiangsheng', 6);
        },
        onremove(player, skill) {
          delete player.storage[skill];
          player.draw();
        },
        marktext: '生',
        intro: {
          name: '生',
          content: 'mark',
        },
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (!player.countMark('jlsg_xiangsheng')) {
            return false;
          }
          var evt = event.getl(player);
          if (!evt || !evt.cards2 || !evt.cards2.length) return false;
          for (var i of evt.cards2) {
            if (['black', 'red'].includes(get.color(i, player))) return true;
          }
          return false;
        },
        direct: true,
        frequent: true,
        content: function () {
          'step 0'
          event.colors = [];
          var evt = trigger.getl(player);
          event.cards = evt.cards2;
          for (var i of evt.cards2) {
            let color = get.color(i, player);
            if (color == 'black') event.colors.add('red');
            if (color == 'red') event.colors.add('black');
          }
          if (!event.colors.length) {
            console.warn('jlsg_xiangsheng no color found!');
            event.finish();
            return;
          }
          'step 1'
          event.color = event.colors.shift();
          player.chooseBool(get.prompt(event.name), true)
            .set('prompt2', `你可以摸一张${lib.translate[event.color]}牌`)
            .set('frequentSkill', event.name);
          'step 2'
          if (result.bool) {
            player.logSkill(event.name);
            player.removeMark(event.name);
            var card = get.cardPile2(function (card) {
              return !event.cards.includes(card) && get.color(card, false) == event.color;
            });
            if (card) player.gain(card, 'gain2');
          }

          if (player.countMark(event.name) && event.colors.length) {
            event.goto(1);
          }
        },
      },
      jlsg_dingming: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: ['phaseZhunbeiBegin', 'damageEnd'],
        },
        filter: function (event, player) {
          if (player.hp == player.getDamagedHp()) {
            return false;
          }
          if (event.name == 'damage' && (!event.source || event.source == player)) {
            return false;
          }
          return true;
        },
        check: function (event, player) {
          let markCnt = player.countMark(lib.skill['jlsg_yinyang_s'].getCurrentSkill(player));
          if (player.hp > player.getDamagedHp()) {
            if (!game.hasPlayer(p => get.attitude(player, p) < -5)) {
              return false;
            }
            let targetHp = player.getDamagedHp();
            return targetHp > 0 && player.hp - targetHp <= 3 - markCnt;
          }
          if (player.hp + 1 < player.getDamagedHp()) {
            return true;
          }
          return Math.random() < 1 - 0.2 * markCnt;
        },
        prompt2: '交换体力与已损失体力',
        content: function () {
          'step 0'
          event.diff = player.getDamagedHp() - player.hp;
          player.changeHp(event.diff);
          'step 1'
          if (player.hp <= 0) {
            game.delayx();
            event._dyinged = true;
            player.dying(event);
          }
          'step 2'
          player.draw(Math.abs(event.diff));
          'step 3'
          if (player.hp > player.getDamagedHp()) {
            player.loseMaxHp();
          }
        },
        group: 'jlsg_dingming2',
      },
      jlsg_dingming2: {
        audio: 'jlsg_dingming',
        trigger: { source: 'damageSource' },
        filter: function (event, player) {
          if (event.player == player || !event.player.isIn()) {
            return false;
          }
          return event.player.hp != event.player.getDamagedHp();
        },
        check: function (event, player) {
          let diff = event.player.getDamagedHp() - event.player.hp;
          if (get.attitude(player, event.player) >= 0) {
            return diff > 0;
          }
          if (diff > 0) {
            return false;
          }
          if (['nei', 'rYe', 'bYe'].includes(player.identity) && get.attitude(player, event.player) > -5) {
            return false;
          }
          if (diff == -1) {
            return !player.isHealthy();
          } else {
            return true;
          }
        },
        logTarget: 'player',
        prompt2: function (event, player) {
          return `令${get.translation(event.player)}交换体力与已损失体力`;
        },
        content: function () {
          'step 0'
          event.diff = trigger.player.getDamagedHp() - trigger.player.hp;
          trigger.player.changeHp(event.diff);
          'step 1'
          if (trigger.player.hp <= 0) {
            game.delayx();
            // event._dyinged=true;
            trigger.player.dying(event);
          }
          'step 2'
          player.draw(Math.abs(event.diff));
          'step 3'
          if (trigger.player.hp < trigger.player.getDamagedHp()) {
            player.loseMaxHp();
          }
        }
      },
      jlsg_lianti: {
        audio: "ext:极略/audio/skill:2",
        forced: true,
        charlotte: true,
        delay: false,
        trigger: { player: 'showCharacterEnd' },
        init: function (player) {
          if (player.hasSkill('jlsg_lianti')) {
            player.useSkill('jlsg_lianti');
          };
        },
        intro: {
          content: 'mark',
        },
        filter: function (event, player) {
          return !player.isLinked();
        },
        content: function () {
          player.link(true)._triggered = null;
        },
        group: ['jlsg_lianti_guard', 'jlsg_lianti2', 'jlsg_lianti3', 'jlsg_lianti4'],
        subSkill: {
          guard: {
            silent: true,
            charlotte: true,
            trigger: { player: 'linkBefore' },
            filter: function (event, player) {
              return player.isLinked() && player.hasSkill('jlsg_lianti');
            },
            content: function () {
              trigger.cancel();
              game.log(player, '取消了重置');
            },
          }
        },
      },
      jlsg_lianti2: {
        audio: "jlsg_lianti",
        forced: true,
        trigger: {
          global: "damageEnd",
        },
        filter: function (event, player) {
          return player === _status.currentPhase && player != event.player && event.nature
            && event.player.getHistory('damage', e => e.nature).indexOf(event) == 0;
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
          "step 0"
          player.addMark("jlsg_lianti");
          "step 1"
          player.loseMaxHp();
        },
      },
      jlsg_lianti4: {
        audio: "jlsg_lianti",
        forced: true,
        trigger: { player: 'phaseDrawBegin2' },
        filter: function (event, player) {
          return !event.numFixed && player.storage.jlsg_lianti;
        },
        content: function () {
          trigger.num += player.countMark('jlsg_lianti');
        },
        mod: {
          maxHandcard: function (player, num) {
            return num + player.countMark('jlsg_lianti');
          },
        },
      },
      jlsg_yanlie: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterCard: true,
        selectCard: function () {
          if (ui.selected.targets.length) return [ui.selected.targets.length, Math.min(ui.selected.targets.length + 1, game.players.length - 1)];
          return [1, Infinity];
        },
        check: function (card) {
          var player = _status.event.player;
          let maxTarget = game.countPlayer(
            p => lib.skill.jlsg_yanlie.ai.result.target(player, p) * get.attitude(player, p) > 0
          );
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
          'step 0'
          player.useCard({ name: 'tiesuo', isCard: true }, targets);
          'step 1'
          player.chooseTarget(true, function (_, player, target) { return target.isLinked(); })
            .set("prompt2", "对一名横置角色造成1点火焰伤害")
            .set("ai", function (target, targets) {
              if (target == _status.event.player) {
                return 0;
              }
              return Math.random();
            });
          'step 2'
          if (result.bool) {
            result.targets[0].damage('fire');
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
              if (target.hasSkillTag('nofire')) return 0;
              let eff = get.damageEffect(target, player, player, 'fire') / get.attitude(player, target);
              if (player.hasSkill("jlsg_lianti")) {
                eff *= 2;
              }
              return eff;
            }
          }
        },
      },
      jlsg_fengying: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'drawBegin' },
        getIndex(event) {
          return event.num;
        },
        filter(event, player) {
          return player.getHistory('useSkill', e => e.skill == 'jlsg_fengying').length < 4;
        },
        direct: true,
        async content(event, trigger, player) {
          const sha = get.autoViewAs({ name: 'sha', nature: 'thunder', isCard: true }, []);
          const { result } = await player.chooseUseTarget(
            "nodistance",
            get.prompt2("jlsg_fengying"),
            sha,
            false,
          )
            .set("logSkill", "jlsg_fengying")
          if (result.bool) --trigger.num;
        }
      },
      jlsg_zhiti: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageBegin2' },
        filter(event, player) {
          if (event.player == player) {
            return false;
          }
          return event.player.getStorage('jlsg_zhiti').length < 5;
        },
        direct: true,
        content() {
          'step 0'
          event._options = [
            '取其1点体力和体力上限',
            '取其摸牌阶段的一摸牌数',
            '取其一个技能',
            '令其不能使用装备牌',
            '令其翻面',
          ];
          event.options = event._options.filter(c => !trigger.player.getStorage(event.name).includes(c));
          event.skills = trigger.player.getSkills(null, false, false).filter(i => {
            let info = get.info(i);
            if (!info) return false;
            return !info.persevereSkill && !info.charlotte;
          })
          if (!event.skills.length) {
            event.options.remove(event._options[2]);
          }
          player.chooseControlList(get.prompt(event.name, trigger.player), event.options, function () {
            return Math.floor(Math.random() * _status.event.parent.options.length);
          });
          'step 1'
          if (result.control == 'cancel2') {
            event.finish();
            return;
          }
          player.logSkill(event.name, trigger.player);
          event.choice = event.options[result.index];
          trigger.player.storage[event.name] = trigger.player.getStorage(event.name).concat(event.choice);
          game.log(player, '选择' + event.choice);
          switch (event.choice) {
            case event._options[0]:
              trigger.player.loseHp();
              trigger.player.loseMaxHp();
              break;
            case event._options[1]:
              trigger.player.addSkill('jlsg_zhiti2');
              trigger.player.storage.jlsg_zhiti2 = (trigger.player.storage.jlsg_zhiti2 || 0) - 1;
              break;
            case event._options[2]:
              player.chooseControl(event.skills)
                .set("ai", () => Math.random())
                .set("prompt", `获取${get.translation(trigger.player)}一个技能`);
              break;
            case event._options[3]:
              trigger.player.addSkill('jlsg_zhiti3');
              break;
            case event._options[4]:
              trigger.player.turnOver();
              break;

            default:
              break;
          }
          'step 2'
          switch (event.choice) {
            case event._options[0]:
              player.gainMaxHp();
              player.recover();
              break;
            case event._options[1]:
              player.addSkill('jlsg_zhiti2');
              player.storage.jlsg_zhiti2 = (player.storage.jlsg_zhiti2 || 0) + 1;
              break;
            case event._options[2]:
              trigger.player.removeSkills(result.control);
              player.addSkills(result.control);
              break;

            default:
              break;
          }
          'step 3'
          game.delayx();
        },
      },
      jlsg_zhiti2: {
        charlotte: true,
        mark: true,
        trigger: { player: 'phaseDrawBegin' },
        forced: true,
        filter: function (event, player) {
          return !event.numFixed;
        },
        content: function () {
          trigger.num += player.storage.jlsg_zhiti2;
          if (trigger.num < 0) {
            trigger.num = 0;
          }
        },
        intro: {
          content: function (storage, player) {
            if (player.storage.jlsg_zhiti2 > 0) {
              return '摸牌阶段的额定摸牌数+' + player.storage.jlsg_zhiti2;
            }
            return '摸牌阶段的额定摸牌数-' + (-player.storage.jlsg_zhiti2);
          },
          markcount: function (storage, player) {
            return Math.abs(player.storage.jlsg_zhiti2);
          }
        },
        ai: {
          halfneg: true,
        }
      },
      jlsg_zhiti3: {
        intro: {
          content: '不能使用装备牌',
        },
        mark: true,
        mod: {
          cardEnabled: function (card, player) {
            if (get.type(card) == 'equip') return false;
          },
        },
      },
      jlsg_huchi: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        viewAs: {
          name: 'juedou',
          isCard: true,
          storage: { nowuxie: true },
        },
        viewAsFilter: function (player) {
          return !player.hasSkill('jlsg_huchi_disable');
        },
        filterCard: () => false,
        selectCard: -1,
        group: ['jlsg_huchi2', 'jlsg_huchi3'],
        subSkill: {
          disable: {}
        }
      },
      jlsg_huchi2: {
        charlotte: true,
        silent: true,
        trigger: { global: 'damageEnd' },
        filter(event, player) {
          return event.card
            && event.card.name == 'juedou'
            && event.getParent().skill == 'jlsg_huchi';
        },
        content() {
          trigger.player.draw(3);
        },
      },
      jlsg_huchi3: {
        charlotte: true,
        silent: true,
        trigger: {
          player: 'useCardAfter',
          global: 'dying'
        },
        filter(event, player) {
          if (event.name == 'useCard') {
            return event.card.name === 'juedou' && event.skill == 'jlsg_huchi'
              && game.getGlobalHistory(
                'changeHp',
                e => e.getParent().name === 'damage' && e.getParent().card === event.card
              ).length === 0;
          }
          return event.reason && event.reason.card && event.reason.card.name === 'juedou'
            && event.reason.getParent().skill == 'jlsg_huchi';
        },
        content() {
          player.addTempSkill('jlsg_huchi_disable', 'phaseUseAfter');
        },
      },
      jlsg_xiejia: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageBegin1' },
        filter: function (event, player) {
          if (!player.isEmpty(2)) return false;
          return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink();
        },
        forced: true,
        content: function () {
          trigger.num += 1 + player.countMark('jlsg_xiejia');
        },
        group: 'jlsg_xiejia2',
        ai: {
          damageBonus: true,
          skillTagFilter: function (player) {
            return player.isEmpty(2);
          }
        }
      },
      jlsg_xiejia2: {
        audio: 'jlsg_xiejia',
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        forced: true,
        filter: function (event, player) {
          var evt = event.getl(player);
          return evt && evt.es && evt.es.some(c => get.subtype(c) == 'equip2');
        },
        content() {
          player.addMark('jlsg_xiejia');
        }
      },
      jlsg_wangyue: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: ['loseAfter', 'loseAsyncAfter', 'loseHpAfter', 'loseMaxHpAfter'],
        },
        getIndex(event, player) {
          const name = event.name == "loseAsync" ? "lose" : event.name;
          if (name == "lose") return game.filterPlayer(current => {
            return event.getl(current) && event.getl(current).cards2.length;
          }).sortBySeat(_status.currentPhase);
          return [event.player];
        },
        filter(event, player, triggername, target) {
          const name = event.name == "loseAsync" ? "lose" : event.name;
          const filterx = !player.hasHistory("useSkill", evt => {
            if (evt.skill != "jlsg_wangyue") return false;
            return evt.event._result.cost_data?.name == name;
          });
          if (!filterx) return false;
          if (name == 'lose') return event.type == 'discard';
          else if (name == 'loseHp') return game.hasPlayer(current => current.isDamaged());
          else return game.hasPlayer(current => current != target);
        },
        async cost(event, trigger, player) {
          let prompt = `望月:令一名角色`;
          const name = trigger.name == "loseAsync" ? "lose" : trigger.name;
          if (name == 'lose') prompt += `摸${trigger.getl(event.indexedData).cards2.length}张牌`;
          else if (name == 'loseHp') prompt += `回复${trigger.num}点体力`;
          else prompt += `加${trigger.num}点体力上限`;
          event.result = await player.chooseTarget(prompt)
            .set("filterTarget", (_, player, target) => target != _status.event.source)
            .set("ai", (target) => {
              const player = get.player(),
                name = get.event("key");
              if (name == "lose") return get.effect(target, { name: "draw" }, player, player);
              else if (name == "loseHp") return get.recoverEffect(target, player, player);
              else return get.attitude(player, target);
            })
            .set("key", name)
            .set("source", event.indexedData)
            .forResult();
          event.result.cost_data = { name };
        },
        async content(event, trigger, player) {
          let target = event.targets[0];
          if (target.ai.shown > player.ai.shown) player.addExpose(0.2);
          let name = event.cost_data?.name;
          if (name == 'lose') await target.draw(trigger.num, player);
          else if (name == 'loseHp') await target.recover(trigger.num, player);
          else await target.gainMaxHp(trigger.num);
        },
      },
      jlsg_luoyan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseJieshuBegin' },
        direct: true,
        content() {
          'step 0'
          player.chooseTarget(get.prompt2(event.name), (_, player, target) => !target.hasSkill('jlsg_luoyan2'))
            .set('ai', (target, targets) => -get.attitude(_status.event.player, target) * (target.countCards('he') + 3));
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          let target = result.targets[0];
          player.logSkill(event.name, target);
          if (target.ai.shown > player.ai.shown) {
            player.addExpose(0.3);
          }
          target.addTempSkill('jlsg_luoyan2', { player: 'dieAfter' });
          if (player.storage.jlsg_luoyan && player.storage.jlsg_luoyan.hasSkill('jlsg_luoyan2')) {
            player.storage.jlsg_luoyan.removeSkill('jlsg_luoyan2');
          }
          player.storage.jlsg_luoyan = target;
        },
      },
      jlsg_luoyan2: {
        intro: {
          name: '落雁',
          content: '被选择为了目标'
        },
        mark: true,
        trigger: { player: 'useCardAfter' },
        charlotte: true,
        silent: true,
        filter(event, player) {
          let evt = _status.event.getParent('phaseUse');
          if (evt.name != 'phaseUse' || evt.player != player) {
            return false;
          }
          let evts = player.getHistory('useCard', e => e != event && e.getParent('phaseUse') == evt);
          return evts.length < 3;
        },
        content() {
          player.popup('jlsg_luoyan');
          let evt = _status.event.getParent('phaseUse');
          let cnt = player.getHistory('useCard', e => e.getParent('phaseUse') == evt).length;
          switch (cnt) {
            case 1:
              player.randomDiscard();
              break;
            case 2:
              player.loseHp();
              break;
            case 3:
              player.loseMaxHp();
              break;
          }
        },
        mod: {
          aiOrder: function (player, card, num) {
            let evt = _status.event.getParent('phaseUse');
            if (evt.name == 'phaseUse' && evt.player == player) {
              let cnt = player.getHistory('useCard', e => e.getParent('phaseUse') == evt).length;
              if (cnt == 1 || cnt == 2 && !player.isDamaged()) {
                return num - 10;
              }
            }
          },
        },
        ai: {
          pretao: true,
          nokeep: true,
        }
      },
      jlsg_jieying: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseDrawBegin1' },
        direct: true,
        filter: function (event, player) {
          return !event.numFixed && game.filterPlayer(p => p != player && !p.countMark('jlsg_jieying')).length;
        },
        content() {
          'step 0'
          player.chooseTarget(get.prompt2(event.name), (_, p, target) => target != p && !target.countMark('jlsg_jieying'))
            .set("ai", p => -get.attitude(_status.event.player, p));
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          trigger.changeToZero();

          result.targets[0].addMark(event.name, 3);
          // player.loseHp();
          // player.loseMaxHp();
          player.addExpose(3);
        },
        intro: {
          content: 'mark',
          name: '劫营',
          name2: '劫营',
        },
        marktext: "营",
        group: 'jlsg_jieying2',
        ai: {
          threaten: 6,
        }
      },
      jlsg_jieying2: {
        sourceSkill: "jlsg_jieying",
        audio: "jlsg_jieying",
        forced: true,
        locked: false,
        firstDo: true,
        trigger: { global: ['drawBefore', 'recoverBefore', 'gainMaxHpBefore', 'phaseBefore', 'changeSkillsBefore'] },
        filter(event, player) {
          if (!event.player.countMark('jlsg_jieying')) {
            return false;
          }
          if (event.player == player) {
            return false;
          }
          if (event.name == 'phase') {
            return event.skill;
          }
          if (event.name == 'changeSkills') {
            return event.addSkill.length
              && !(
                player.countMark('jlsg_jieying')
                && game.hasPlayer(p => p != player && p.hasSkill('jlsg_jieying'))
              );
          }
          return true;
        },
        logTarget: 'player',
        content() {
          if (trigger.name != 'changeSkills') {
            trigger.player.removeMark('jlsg_jieying');
            trigger.player = player;
            event.finish();
            return;
          }
          let changed = trigger.addSkill;
          trigger.addSkill = [];
          trigger.player.removeMark('jlsg_jieying');
          player.addSkills(changed);
        },
      },
      jlsg_jinlong: {
        audio: "ext:极略/audio/skill:2",
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        mod: {
          globalFrom: function (from, to, distance) {
            var num = distance + from.getExpansions('jlsg_jinlong')
              .map(c => {
                let d = get.info(c).distance;
                return d && d.globalFrom;
              })
              .reduce((a, b) => a + (b ? b : 0), 0);
            return num;
          },
          globalTo: function (from, to, distance) {
            var num = distance + to.getExpansions('jlsg_jinlong')
              .map(c => {
                let d = get.info(c).distance;
                return d && d.globalTo;
              })
              .reduce((a, b) => a + (b ? b : 0), 0);
            return num;
          },
        },
        trigger: {
          player: 'gainAfter',
          global: ['loseAfter', 'cardsDiscardAfter', 'loseAsyncAfter', 'equipAfter'],
        },
        forced: true,
        filter(event, player) {
          if (event.getg && event.getg(player)) return event.getg(player).some(c => c.name != "muniu" && get.type(c) == 'equip');
          if (event.name == "cardsDiscard") {
            const evt = event.getParent().relatedEvent;
            if (evt && evt.name != "judge") {
              return event.cards.some(i => i.name != "muniu" && get.position(i, true) == "d" && get.type(i) == 'equip');
            }
          } else {
            if (event.getlx !== false) {
              for (const target of game.filterPlayer2()) {
                const evt = event.getl(target);
                if (evt && (evt.cards2 || []).length) {
                  return evt.cards2.some(i => i.name != "muniu" && i.original != "j" && get.position(i, true) == "d" && get.type(i) == 'equip');
                }
              }
            }
          }
          return false;
        },
        content() {
          let cards = [], gain = [];
          if (trigger.getg && trigger.getg(player)) {
            gain = trigger.getg(player).filter(c => c.name != "muniu" && get.type(c) == 'equip');
            player.addToExpansion(gain, "give").gaintag.add("jlsg_jinlong");
          }
          if (trigger.name == "cardsDiscard") {
            const evt = trigger.getParent().relatedEvent;
            if (evt && evt.name != "judge") {
              cards.addArray(trigger.cards.filter(i => i.name != "muniu" && get.position(i, true) == "d" && get.type(i) == 'equip'));
            }
          } else {
            if (trigger.getlx !== false) {
              for (const target of game.filterPlayer2()) {
                const evt = trigger.getl(target);
                if (evt && (evt.cards2 || []).length) {
                  cards.addArray((evt.cards2 || []).filter(i => i.name != "muniu" && i.original != "j" && get.position(i, true) == "d" && get.type(i) == 'equip'));
                }
              }
            }
          }
          player.addToExpansion(cards, "gain2").gaintag.add(event.name);
          player.addAdditionalSkill(event.name, cards.addArray(gain).map(c => get.info(c).skills || []).flat(), true);
          player.draw(cards.concat(gain).unique().length);
        },
      },
      jlsg_liegong: {
        audio: "ext:极略/audio/skill:2",
        enable: 'chooseToUse',
        complexCard: true,
        locked: false,
        filterCard: function (card) {
          var suit = get.suit(card);
          for (var i = 0; i < ui.selected.cards.length; i++) {
            if (get.suit(ui.selected.cards[i]) == suit) return false;
          }
          return true;
        },
        viewAsFilter: function (player) {
          let cnt = player.storage.jlsg_liegong_used ?? 0;
          return player.countCards('h') && cnt < (player.isDamaged() ? 2 : 1);
        },
        selectCard: [1, 4],
        viewAs: {
          name: 'sha',
          nature: 'fire',
          jlsg_liegong: true,
        },
        check: function (card) {
          var val = get.value(card);
          return 10 - val;
        },
        precontent() {
          "step 0"
          player.addTempSkill("jlsg_liegong_used");
          player.storage.jlsg_liegong_used++;
        },
        mod: {
          targetInRange: function (card, player) {
            if (card.jlsg_liegong) return true;
          },
          cardUsable: function (card, player) {
            if (card.jlsg_liegong) return Infinity;
          },
        },
        group: ['jlsg_liegong2', 'jlsg_liegong3'],
        subSkill: {
          used: {
            init(player) {
              player.storage.jlsg_liegong_used = 0;
            },
            onremove: true,
            charlotte: true,
            sub: true,
          },
        },
        ai: {
          fireDamage: true,
          directHit_ai: true,
        },
      },
      jlsg_liegong2: {
        sourceSkill: "jlsg_liegong",
        silent: true,
        charlotte: true,
        trigger: {
          player: 'useCard',
        },
        filter(event, player) {
          return event.card.name == "sha" && event.card.jlsg_liegong && event.cards;
        },
        content() {
          let cnt = trigger.cards.length;
          if (cnt >= 1) {
            trigger.directHit.addArray(game.players);
          }
          if (cnt >= 2) {
            player.when({ player: "useCardToAfter" })
              .filter(evt => evt.parent == trigger)
              .then(() => {
                if (trigger.card.name == "sha" && trigger.card.jlsg_liegong && trigger.cards.length >= 2) {
                  player.draw(3);
                }
              })
          }
          if (cnt >= 3) {
            trigger.baseDamage++;
          }
        }
      },
      jlsg_liegong3: {
        sourceSkill: "jlsg_liegong",
        silent: true,
        charlotte: true,
        trigger: {
          source: 'damageSource',
        },
        filter(event, player) {
          let skills = event.player.getSkills(null, false, false).filter(skill => {
            var info = get.info(skill);
            if (!info || get.is.empty(info) || info.charlotte) return false;
            return true;
          });
          return event.card && event.card.name == "sha" && event.card.jlsg_liegong && event.notLink()
            && event.cards.length >= 4 && skills.length;
        },
        content() {
          let skill = trigger.player.getSkills(null, false, false).filter(skill => {
            var info = get.info(skill);
            if (!info || get.is.empty(info) || info.charlotte) return false;
            return true;
          }).randomGet();
          // TODO: make popup synced
          trigger.player.popup(skill, 'gray');
          trigger.player.removeSkills(skill);
        },
      },
      jlsg_xingwu: {
        marktext: "舞",
        intro: { content: "mark" },
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseBegin" },
        init(player) {
          player.storage.jlsg_xingwu_mark = {};
          for (let i of game.filterPlayer()) {
            player.storage.jlsg_xingwu_mark[i.playerid] = i.countMark("jlsg_xingwu") || 0;
          };
        },
        filter(event, player) {
          return player.hasCard(card => get.suit(card, player) == "heart", "h");
        },
        async cost(event, trigger, player) {
          let str;
          if (!trigger.player.hasMark("jlsg_xingwu")) str = `星舞：是否弃置一张红桃，令${get.translation(trigger.player)}获得一枚“星舞”标记？`;
          else str = `星舞：是否弃置一张红桃，令${get.translation(trigger.player)}的一枚“星舞”标记移动给另一名角色或其再获得一枚“星舞”标记？`
          event.result = await player.chooseCardTarget({
            source: trigger.player,
            filterCard: (card, player) => get.suit(card, player) == "heart",
            filterTarget: function (card, player, target) {
              if (target == get.event("source")) return false;
              return get.event("source").hasMark("jlsg_xingwu");
            },
            selectTarget() {
              if (!get.event("source").hasMark("jlsg_xingwu")) return [0, 0];
              else return [0, 1];
            },
            prompt: str,
            targetprompt: "获得标记",
            ai1(card) {
              const player = get.player(),
                source = get.event("source");
              if (get.attitude(player, source) > 1) return get.value(card) < 9;
              else return get.value(card) < (source.countMark("jlsg_xingwu") + 1) ^ 2;
            },
            ai2(target) {
              const player = get.player(),
                source = get.event("source");
              if (get.attitude(player, source) > 1) return 0;
              else return get.attitude(player, target) > 1;
            }
          }).forResult();
          event.result.skill_popup = false;
        },
        async content(event, trigger, player) {
          event.skillstop = true;
          await player.logSkill("jlsg_xingwu", trigger.player);
          await player.discard(event.cards);
          if (event.targets) {
            trigger.player.line(event.targets[0]);
            trigger.player.removeMark("jlsg_xingwu", 1);
            lib.skill.jlsg_xingwu.loseSkill(trigger.player);
            player.storage.jlsg_xingwu_mark[trigger.player.playerid]--;
            event.targets[0].addMark("jlsg_xingwu", 1);
            await lib.skill.jlsg_xingwu.gainSkill(event.targets[0]);
            player.storage.jlsg_xingwu_mark[event.targets[0].playerid]++;
          }
          else {
            trigger.player.addMark("jlsg_xingwu", 1);
            await lib.skill.jlsg_xingwu.gainSkill(trigger.player);
            player.storage.jlsg_xingwu_mark[trigger.player.playerid]++;
          }
          const { result } = await player.chooseBool(`是否令${get.translation(trigger.player)}重新获得【星舞】的技能？`, () => Math.random() < 0.5);
          if (result.bool) {
            let skills = trigger.player.storage.jlsg_xingwu_skill;
            if (!skills) return;
            await trigger.player.removeSkills(skills);
            trigger.player.storage.jlsg_xingwu_skill = [];
            await lib.skill.jlsg_xingwu.gainSkill(trigger.player, true, skills.length);
          }
        },
        get skills() {
          let skills = {};
          let players = game.players.concat(game.dead);
          for (let c of lib.jlsg.characterList) {
            if (!get.character(c) || !get.character(c)[3]?.length) continue;
            let sex = get.character(c, 0);
            skills[sex] = skills[sex] || [];
            skills[sex].addArray(get.character(c)[3].filter(s => !lib.filter.skillDisabled(s) && !lib.skill[s]?.charlotte));
          }
          delete this.skills;
          this.skills = skills;
          return skills;
        },
        gainSkill(target, norecover, cnt = 1) {
          if (target.isDamaged() && !norecover) target.recover();
          let targetSkills = target.getSkills(null, false, false);
          let skills = [];
          for (let sex in lib.skill.jlsg_xingwu.skills) {
            if (sex === target.sex) continue;
            skills.addArray(lib.skill.jlsg_xingwu.skills[sex].filter(s => !targetSkills.includes(s)));
          }
          skills.removeArray(
            game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
          );
          skills = skills.filter(skill => {
            const info = lib.skill[skill];
            if (info.ai?.combo) return target.hasSkill(info.ai?.combo, null, false, false);
            return true;
          });
          skills = skills.randomGets(cnt);
          if (!skills.length) return;
          target.storage.jlsg_xingwu_skill = target.storage.jlsg_xingwu_skill || [];
          target.storage.jlsg_xingwu_skill.addArray(skills);
          target.addSkills(skills);
        },
        loseSkill(target) {
          target.loseHp();
          let skills = [];
          let targetSkills = target.getSkills(null, false, false);
          for (let pack in lib.characterPack) {
            for (let c in lib.characterPack[pack]) {
              if (get.character(c, 0) != target.sex) continue;
              skills.addArray(get.character(c)[3].filter(s => targetSkills.includes(s)));
            }
          }
          let skill = skills.randomGet();
          if (skill) target.removeSkills(skill);
        },
        group: ["jlsg_xingwu_start", "jlsg_xingwu_effect"],
        subSkill: {
          start: {
            audio: "jlsg_xingwu",
            trigger: {
              global: 'phaseBefore',
              player: 'enterGame',
            },
            getIndex(event, player) {
              const array = new Array(player.maxHp + 1)
                .fill(player.maxHp + 1)
                .map((v, i) => v - i);
              return array;
            },
            prompt(event, player, name, num) {
              let prompt = `是否发动<span class="yellowtext">星舞</span>？`;
              if (num <= player.maxHp) prompt += `（可重复${num}次）`
              return prompt;
            },
            filter: function (event, player) {
              return (event.name != 'phase' || game.phaseNumber == 0);
            },
            check: () => true,
            logTarget(event, player) {
              return game.filterPlayer().sortBySeat(player);
            },
            content() {
              game.filterPlayer().sortBySeat(player).forEach(p => {
                p.addMark("jlsg_xingwu", 1);
              });
            },
            sourceSkill: "jlsg_xingwu",
          },
          effect: {
            trigger: {
              player: ["useSkill", "logSkill"],
            },
            filter(event, player) {
              let skill = event.sourceSkill || event.skill;
              if (skill != "jlsg_xingwu" && !event.targets) return false;
              if (event.skillstop) return false;
              for (let i of event.targets) {
                let num = player.storage.jlsg_xingwu_mark[i.playerid];
                if (num != i.countMark("jlsg_xingwu")) return true;
              };
              return false;
            },
            charlotte: true,
            direct: true,
            async content(event, trigger, player) {
              for (let i = 0; i < trigger.targets.length; i++) {
                const target = trigger.targets[i],
                  num = player.storage.jlsg_xingwu_mark[target.playerid];
                if (num == target.countMark("jlsg_xingwu")) continue;
                else if (target.countMark("jlsg_xingwu") > num) {
                  while (player.storage.jlsg_xingwu_mark[target.playerid] < target.countMark("jlsg_xingwu")) {
                    await lib.skill.jlsg_xingwu.gainSkill(target);
                    player.storage.jlsg_xingwu_mark[target.playerid]++;
                  };
                }
                else {
                  while (player.storage.jlsg_xingwu_mark[target.playerid] > target.countMark("jlsg_xingwu")) {
                    await lib.skill.jlsg_xingwu.loseSkill(target);
                    player.storage.jlsg_xingwu_mark[target.playerid]--;
                  };
                }
              };
            },
            sourceSkill: "jlsg_xingwu",
          },
        },
      },
      jlsg_chenyu: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: ['phaseJieshuBegin', 'damageEnd'],
        },
        forced: true,
        content() {
          'step 0'
          event.targets = game.filterPlayer(p => p != player).sortBySeat();
          'step 1'
          let target = event.targets.shift();
          if (!target) {
            game.delayx();
            event.finish();
            return;
          }
          let cards = target.getCards('h', c => get.suit(c) == 'heart');
          if (cards.length) {
            player.gain(cards, target, 'bySelf');
            target.$giveAuto(cards, player);
          }
          event.redo();
        },
      },
      jlsg_tiangong: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: 'phaseBefore',
          player: ['enterGame', 'phaseBegin', 'phaseEnd'],
        },
        getIndex(event) {
          if (event.name == 'phase' && game.phaseNumber == 0) return 2;
          return 1;
        },
        filter(event, player, triggerName) {
          return (triggerName != 'phaseBefore' || game.phaseNumber == 0)
            && game.hasPlayer(p => p.getSkills(null, false, false).filter(s => s.startsWith('jlsg_tiangong_jiguan_')).length < 7);
        },
        check(event, player) {
          return true;
        },
        async content(event, trigger, player) {
          const skillCnt = _status.jlsg_tiangong_jiguanCount || 0;
          _status.jlsg_tiangong_jiguanCount = skillCnt + 1;
          game.broadcast(function (cnt) {
            _status.jlsg_tiangong_jiguanCount = cnt;
          }, _status.jlsg_tiangong_jiguanCount);
          const skill = {
            audio: 'jlsg_tiangong',
            forced: true,
            name: `jlsg_tiangong_jiguan_${skillCnt}`,
            filter: function (event, player) {
              if (this.extraFilter && !this.extraFilter(event, player)) return false;
              return this.targetFilter(player).length;
            },
            logTarget: function (event, player) {
              return this.targetFilter(player).sortBySeat();
            },
            async content(event, trigger, player) {
              for (let target of event.targets) {
                const next = game.createEvent("jlsg_tiangong_jiguan_event", false)
                  .set("player", target)
                  .setContent(lib.skill[event.name].effect);
                await next;
              };
            },
          };
          const triggersList = [
            '回合开始阶段，',
            '判定阶段开始时，',
            '摸牌阶段开始时，',
            '出牌阶段开始时，',
            '出牌阶段结束时，',
            '弃牌阶段开始时，',
            '弃牌阶段结束时，',
            '回合结束阶段，',
            '每回合限X次(X: 1-3)，当你的判定牌生效后，',
            '每回合限X次(X: 1-3)，当你获得牌后，',
            '每回合限X次(X: 1-3)，当你使用基本牌后，',
            '每回合限X次(X: 1-3)，当你使用锦囊牌后，',
            '每回合限X次(X: 1-3)，当你使用装备牌后，',
            '每回合限X次(X: 1-3)，当你使用红色牌后，',
            '每回合限X次(X: 1-3)，当你使用黑色牌后，',
            '每回合限X次(X: 1-3)，当你成为非延时锦囊牌的目标后，',
            '每回合限X次(X: 1-3)，当你失去装备区里的牌后，',
            '每回合限X次(X: 1-3)，当你成为【杀】的目标时，',
            '每回合限X次(X: 1-3)，当你成为【杀】的目标后，',
            '每回合限X次(X: 1-3)，当你使用或打出【杀】时，',
            '每回合限X次(X: 1-3)，当你使用或打出【闪】时，',
            '每回合限X次(X: 1-3)，当你造成伤害时，',
            '每回合限X次(X: 1-3)，当你造成伤害后，',
            '每回合限X次(X: 1-3)，当你受到伤害时，',
            '每回合限X次(X: 1-3)，当你受到伤害后，',
            '每回合限X次(X: 1-3)，当你回复体力或加体力上限后，',
            '每回合限X次(X: 1-3)，当你失去体力或减体力上限后，',
            '每回合限X次(X: 1-3)，当你进入濒死状态时，',
            '每回合限X次(X: 1-3)，当你脱离濒死状态后，',
            '每回合限X次(X: 1-3)，当你获得技能后，',
            '每回合限X次(X: 1-3)，当你失去技能后，',
            '每回合限X次(X: 1-3)，当你横置/重置/翻面后，',
          ];
          let choices = triggersList.randomGets(3).map(s => s.replace(`每回合限X次(X: 1-3)`, `每回合限${Math.floor(event.getRand() * 3) + 1}次`));
          const { result: chooseTrigger } = await player.chooseControlList('请选择机关技能的发动时机', choices)
            .set('ai', () => Math.floor(get.event().getRand() * _status.event.choiceList.length));
          if (chooseTrigger.control == "cancel2") return;
          let choice = choices[chooseTrigger.index];
          let skillInfo = '锁定技，' + choice;
          const match = choice.match(/每回合限(\d+)次，(.*)/);
          if (match) {
            skill.cnt = parseInt(match[1]);
            choice = match[2];
          }
          switch (choice) {
            case '回合开始阶段，':
              skill.trigger = { player: 'phaseZhunbeiBegin' };
              break;
            case '判定阶段开始时，':
              skill.trigger = { player: 'phaseJudgeBegin' };
              break;
            case '摸牌阶段开始时，':
              skill.trigger = { player: 'phaseDrawBegin' };
              break;
            case '出牌阶段开始时，':
              skill.trigger = { player: 'phaseUseBegin' };
              break;
            case '出牌阶段结束时，':
              skill.trigger = { player: 'phaseUseEnd' };
              break;
            case '弃牌阶段开始时，':
              skill.trigger = { player: 'phaseDiscardBegin' };
              break;
            case '弃牌阶段结束时，':
              skill.trigger = { player: 'phaseDiscardEnd' };
              break;
            case '回合结束阶段，':
              skill.trigger = { player: 'phaseJieshuBegin' };
              break;
            case '当你的判定牌生效后，':
              skill.trigger = { player: 'judgeEnd' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你获得牌后，':
              skill.trigger = {
                player: 'gainAfter',
                global: 'loseAsyncAfter',
              };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.getg && event.getg(player).length > 0;
              };
              break;
            case '当你使用基本牌后，':
              skill.trigger = { player: 'useCardAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && get.type(event.card) == 'basic';
              };
              break;
            case '当你使用锦囊牌后，':
              skill.trigger = { player: 'useCardAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && get.type2(event.card) == 'trick';
              };
              break;
            case '当你使用装备牌后，':
              skill.trigger = { player: 'useCardAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && get.type(event.card) == 'equip';
              };
              break;
            case '当你使用红色牌后，':
              skill.trigger = { player: 'useCardAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && get.color(event.card) == 'red';
              };
              break;
            case '当你使用黑色牌后，':
              skill.trigger = { player: 'useCardAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && get.color(event.card) == 'black';
              };
              break;
            case '当你成为非延时锦囊牌的目标后，':
              skill.trigger = { target: 'useCardToTargeted' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && get.type(event.card) == 'trick';
              };
              break;
            case '当你失去装备区里的牌后，':
              skill.trigger = {
                player: 'loseAfter',
                global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
              };
              skill.extraFilter = function (event, player) {
                if (player.getHistory('useSkill', e => e.skill == this.name).length >= this.cnt) return false;
                const evt = event.getl(player);
                return evt && evt.player == player && evt.es && evt.es.length > 0;
              };
              break;
            case '当你成为【杀】的目标时，':
              skill.trigger = { target: 'useCardToTarget' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.card.name == 'sha';
              };
              break;
            case '当你成为【杀】的目标后，':
              skill.trigger = { target: 'useCardToTargeted' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.card.name == 'sha';
              };
              break;
            case '当你使用或打出【杀】时，':
              skill.trigger = { player: ['useCard', 'respond'] };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.card.name == 'sha';
              };
              break;
            case '当你使用或打出【闪】时，':
              skill.trigger = { player: ['useCard', 'respond'] };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.card.name == 'shan';
              };
              break;
            case '当你造成伤害时，':
              skill.trigger = { source: 'damageBegin2' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你造成伤害后，':
              skill.trigger = { source: 'damageSource' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              }; break;
            case '当你受到伤害时，':
              skill.trigger = { player: 'damageBegin3' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              }; break;
            case '当你受到伤害后，':
              skill.trigger = { player: 'damageEnd' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你回复体力或加体力上限后，':
              skill.trigger = { player: ['recoverEnd', 'gainMaxHpEnd'] };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你失去体力或减体力上限后，':
              skill.trigger = { player: ['loseHpEnd', 'loseMaxHpEnd'] };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你进入濒死状态时，':
              skill.trigger = { player: 'dying' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你脱离濒死状态后，':
              skill.trigger = { player: 'dyingAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            case '当你获得技能后，':
              skill.trigger = { player: 'changeSkillsAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.addSkill.length;
              };
              break;
            case '当你失去技能后，':
              skill.trigger = { player: 'changeSkillsAfter' };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt
                  && event.removeSkill.length;
              };
              break;
            case '当你横置/重置/翻面后，':
              skill.trigger = { player: ['turnOverAfter', 'linkAfter'] };
              skill.extraFilter = function (event, player) {
                return player.getHistory('useSkill', e => e.skill == this.name).length < this.cnt;
              };
              break;
            default:
              console.error('jlsg_tiangong description not found', choice);
              return;
          };
          choices = Object.keys(lib.skill.jlsg_tiangong.targetFilters);
          // safe guard
          if (!game.hasPlayer(p => p.hasSex('male'))) {
            choices.remove('所有男性角色');
          }
          if (!game.hasPlayer(p => p.hasSex('female'))) {
            choices.remove('所有女性角色');
          }
          for (let group of lib.group) {
            if (!game.hasPlayer(p => p.group == group)) {
              choices.remove(`所有${lib.translate[group]}势力角色`);
            }
          };
          const targetFilters = choices.randomGets(3);
          // increae chance
          if (!targetFilters.includes('你') && Math.random() < 0.3) {
            targetFilters[2] = '你';
            targetFilters.randomSort();
          }
          else if (!targetFilters.includes('所有其他角色') && Math.random() < 0.3) {
            targetFilters[2] = '所有其他角色';
            targetFilters.randomSort();
          }
          const { result: chooseTargetFilter } = await player.chooseControlList(`###请选择机关技能的作用目标###${skillInfo}...`, targetFilters, true)
            .set('ai', () => Math.floor(get.event().getRand() * _status.event.choiceList.length));
          if (chooseTargetFilter.control == "cancel2") return;
          choice = targetFilters[chooseTargetFilter.index];
          skillInfo += choice;
          skill.targetFilter = lib.skill.jlsg_tiangong.targetFilters[choice];
          if (!skill.targetFilter) {
            console.error('jlsg_tiangong description not found', choice);
            return;
          }
          choices = Object.keys(lib.skill.jlsg_tiangong.effects);
          if (skillInfo.includes('所有')) {
            choices = choices.filter(c => !lib.skill.jlsg_tiangong.effects[c].multi);
          }
          const effects = choices.randomGets(3);
          const { result: chooseEffect } = await player.chooseControlList(`###请选择机关技能的作用效果###${skillInfo}...`, effects, true)
            .set('ai', () => Math.floor(get.event().getRand() * _status.event.choiceList.length));
          if (chooseEffect.control == "cancel2") return;
          choice = effects[chooseEffect.index];
          skillInfo += choice + '。';
          const { content, positive, groupType = null } = lib.skill.jlsg_tiangong.effects[choice];
          if (!content) {
            console.error('jlsg_tiangong description not found', content);
            return;
          }
          skill.effect = content;
          skill.positive = positive;
          if (groupType) skill.groupType = groupType;
          const list = game.filterPlayer().reduce((arr, current) => {
            arr.addArray(current.getSkills(null, false, false).filter(s => s.startsWith('jlsg_tiangong_jiguan_')).map(s => lib.translate[s]))
            return arr.unique();
          }, []);
          const translate = lib.skill.jlsg_tiangong.skillName.filter(i => !list.includes(i)).randomGet();
          game.broadcastAll(
            function (skill, name, translate, info) {
              lib.skill[name] = skill;
              lib.translate[name] = translate;
              lib.translate[name + "_info"] = info
            },
            skill,
            skill.name,
            translate,
            skillInfo
          );
          const { result: chooseTarget } = await player.chooseTarget(
            `###请选择获得机关${lib.translate[skill.name]}技能的角色###${skillInfo}`,
            (_, player, target) => target.getSkills(null, false, false).filter(s => s.startsWith('jlsg_tiangong_jiguan_')).length < 7,
            true,
          )
            .set('ai', target => {
              const players = get.event("targetFilter")(target),
                player = get.player();
              return get.event("positive")(players, target, player);
            })
            .set('positive', positive)
            .set('targetFilter', skill.targetFilter);
          if (!chooseTarget?.bool || !chooseTarget?.targets?.length) return;
          player.line(chooseTarget.targets[0]);
          await chooseTarget.targets[0].addSkills(skill.name);
        },
        get skillName() {
          let Heaven = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            Earth = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
            result = [];
          for (let i of Heaven) {
            for (let j of Earth) {
              result.add(i + j);
            };
          };
          delete this.skillName;
          this.skillName = result;
          return result;
        },
        get targetFilters() {
          let result = {
            '你': (player) => [player],
            '所有角色': (player) => game.filterPlayer(),
            '所有其他角色': (player) => game.filterPlayer(p => p != player),
            '所有男性角色': (player) => game.filterPlayer(p => p.hasSex('male')),
            '所有女性角色': (player) => game.filterPlayer(p => p.hasSex('female')),
            '随机一名角色': (player) => game.filterPlayer().randomGets(1),
            '随机两名角色': (player) => game.filterPlayer().randomGets(2),
            '随机三名角色': (player) => game.filterPlayer().randomGets(3),
            '体力上限最多的角色': (player) => {
              let v = Math.max(...game.filterPlayer().map(p => p.maxHp));
              return game.filterPlayer(p => p.maxHp == v);
            },
            '体力上限最少的角色': (player) => {
              let v = Math.min(...game.filterPlayer().map(p => p.maxHp));
              return game.filterPlayer(p => p.maxHp == v);
            },
            '体力最多的角色': (player) => {
              let v = Math.max(...game.filterPlayer().map(p => p.hp));
              return game.filterPlayer(p => p.hp == v);
            },
            '体力最少的角色': (player) => {
              let v = Math.min(...game.filterPlayer().map(p => p.hp));
              return game.filterPlayer(p => p.hp == v);
            },
            '随机一名未受伤的角色': (player) => game.filterPlayer(p => p.isHealthy()).randomGets(1),
            '随机两名未受伤的角色': (player) => game.filterPlayer(p => p.isHealthy()).randomGets(2),
            '所有未受伤的角色': (player) => game.filterPlayer(p => p.isHealthy()),
            '随机一名已受伤的角色': (player) => game.filterPlayer(p => p.isDamaged()).randomGets(1),
            '随机两名已受伤的角色': (player) => game.filterPlayer(p => p.isDamaged()).randomGets(2),
            '所有已受伤的角色': (player) => game.filterPlayer(p => p.isDamaged()),
            '手牌最多的角色': (player) => {
              let v = Math.max(...game.filterPlayer().map(p => p.countCards('h')));
              return game.filterPlayer(p => p.countCards('h') == v);
            },
            '手牌最少的角色': (player) => {
              let v = Math.min(...game.filterPlayer().map(p => p.countCards('h')));
              return game.filterPlayer(p => p.countCards('h') == v);
            },
          };
          for (let group of lib.group) {
            result[`所有${lib.translate[group]}势力角色`] = (player) => game.filterPlayer(p => p.group == group);
          }
          delete this.targetFilters;
          this.targetFilters = result;
          return result;
        },
        get effects() {
          let result = {
            '翻面': {
              content: async function (event, trigger, player) { await player.turnOver() },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => {
                  let turnOver = current.isTurnedOver(),
                    att = get.attitude(viewer, current);
                  if (att > 0) {
                    if (turnOver) sum += 2;
                    else sum -= 1;
                  }
                  else {
                    if (turnOver) sum -= 1;
                    else sum += 2;
                  }
                  return sum;
                }, 0);
                return sumEff;
              },
            },
            '进行【闪电】判定': {
              content: async function (event, trigger, player) { await player.executeDelayCardEffect('shandian') },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer, "thunder"), 0);
                return sumEff;
              },
            },
            '手牌上限+1': {
              content: async function (event, trigger, player) { await lib.skill.jlsg_tiangong_handcard.change(player) },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (get.attitude(viewer, current) * att), 0);
                return sumEff;
              },
            },
            '使用【杀】的次数上限+1': {
              content: async function (event, trigger, player) { await lib.skill.jlsg_tiangong_useSha.change(player) },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (get.attitude(viewer, current) * att), 0);
                return sumEff;
              },
            },
            '随机失去一个技能': {
              content: async function (event, trigger, player) {
                let skill = player.getSkills(null, false, false).randomGet();
                if (skill) await player.removeSkills(skill);
              },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (-get.attitude(viewer, current) * att), 0);
                return sumEff;
              },
            },
            '视为使用【南蛮入侵】': {
              content: async function (event, trigger, player) { await player.chooseUseTarget({ name: 'nanman' }, true) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "nanman" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '视为使用【桃园结义】': {
              content: async function (event, trigger, player) { await player.chooseUseTarget({ name: 'taoyuan' }, true) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "taoyuan" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '视为使用【五谷丰登】': {
              content: async function (event, trigger, player) { await player.chooseUseTarget({ name: 'wugu' }, true) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "wugu" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '视为使用【无中生有】': {
              content: async function (event, trigger, player) { await player.chooseUseTarget({ name: 'wuzhong' }, true) },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "wuzhong" }, player, viewer), 0);
                return sumEff;
              },
            },
            '视为使用【万箭齐发】': {
              content: async function (event, trigger, player) { await player.chooseUseTarget({ name: 'wanjian' }, true) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "wanjian" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '视为使用【桃】': {
              content: async function (event, trigger, player) { await player.chooseUseTarget({ name: 'tao' }, true) },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "tao" }, player, viewer), 0);
                return sumEff;
              },
            },
            '对所有其他角色使用【杀】': {
              content: async function (event, trigger, player) { await player.useCard({ name: 'sha' }, game.filterPlayer(p => p != player)) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "sha" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '对所有其他角色使用火【杀】': {
              content: async function (event, trigger, player) { await player.useCard({ name: 'sha', nature: 'fire' }, game.filterPlayer(p => p != player)) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "sha", nature: "fire" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '对所有其他角色使用雷【杀】': {
              content: async function (event, trigger, player) { await player.useCard({ name: 'sha', nature: 'thunder' }, game.filterPlayer(p => p != player)) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "sha", nature: "thunder" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '对所有其他角色使用【决斗】': {
              content: async function (event, trigger, player) { await player.useCard({ name: 'juedou' }, game.filterPlayer(p => p != player)) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "juedou" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '对所有其他角色使用【顺手牵羊】': {
              content: async function (event, trigger, player) { await player.useCard({ name: 'shunshou' }, game.filterPlayer(p => p != player)) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "shunshou" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '从牌堆或弃牌堆随机获得两张红色牌': {
              content: async function (event, trigger, player) {
                let cards = Array.from(ui.cardPile.childNodes)
                  .concat(...ui.discardPile.childNodes)
                  .filter(c => get.color(c) == 'red')
                  .randomGets(2);
                if (cards.length) {
                  await player.gain('gain2', cards);
                }
              },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
                return sumEff;
              },
            },
            '从牌堆或弃牌堆随机获得两张黑色牌': {
              content: async function (event, trigger, player) {
                let cards = Array.from(ui.cardPile.childNodes)
                  .concat(...ui.discardPile.childNodes)
                  .filter(c => get.color(c) == 'black')
                  .randomGets(2);
                if (cards.length) {
                  await player.gain('gain2', cards);
                }
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
                return sumEff;
              },
            },
            '从牌堆或弃牌堆随机获得两张基本牌': {
              content: async function (event, trigger, player) {
                let cards = Array.from(ui.cardPile.childNodes)
                  .concat(...ui.discardPile.childNodes)
                  .filter(c => get.type(c) == 'basic')
                  .randomGets(2);
                if (cards.length) {
                  await player.gain('gain2', cards);
                }
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
                return sumEff;
              },
            },
            '从牌堆或弃牌堆随机获得两张锦囊牌': {
              content: async function (event, trigger, player) {
                let cards = Array.from(ui.cardPile.childNodes)
                  .concat(...ui.discardPile.childNodes)
                  .filter(c => get.type2(c) == 'trick')
                  .randomGets(2);
                if (cards.length) {
                  await player.gain('gain2', cards);
                }
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
                return sumEff;
              },
            },
            '从牌堆或弃牌堆随机获得两张装备牌': {
              content: async function (event, trigger, player) {
                let cards = Array.from(ui.cardPile.childNodes)
                  .concat(...ui.discardPile.childNodes)
                  .filter(c => get.type(c) == 'equip')
                  .randomGets(2);
                if (cards.length) {
                  await player.gain('gain2', cards);
                }
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "draw" }, player, viewer), 0);
                return sumEff;
              },
            },
            '受到1点伤害': {
              content: async function (event, trigger, player) { await player.damage('nosource') },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => get.damageEffect(current, player, viewer), 0);
                return sumEff;
              },
            },
            '受到1点火焰伤害': {
              content: async function (event, trigger, player) { await player.damage('fire', 'nosource') },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer, "fire"), 0);
                return sumEff;
              },
            },
            '受到1点雷电伤害': {
              content: async function (event, trigger, player) { await player.damage('thunder', 'nosource') },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer, "thunder"), 0);
                return sumEff;
              },
            },
            '对其他角色各造成1点伤害': {
              content: async function (event, trigger, player) {
                for (let target of game.filterPlayer(p => p != player).sortBySeat()) {
                  await target.damage(player)
                };
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.damageEffect(current, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            },
            '加1点体力上限': {
              content: async function (event, trigger, player) { await player.gainMaxHp() },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + get.attitude(viewer, current) * att, 0);
                return sumEff;
              },
            },
            '减1点体力上限': {
              content: async function (event, trigger, player) { await player.loseMaxHp() },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum - (get.attitude(viewer, current) * att), 0);
                return sumEff;
              },
            },
            '回复1点体力': {
              content: async function (event, trigger, player) {
                if (player.isDamaged()) await player.recover();
              },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.recoverEffect(current, player, viewer), 0);
                return sumEff;
              },
            },
            '回复2点体力': {
              content: async function (event, trigger, player) {
                if (player.isDamaged()) await player.recover(2);
              },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + (get.recoverEffect(current, player, viewer) * 1.2), 0);
                return sumEff;
              },
            },
            '失去1点体力': {
              content: async function (event, trigger, player) { await player.loseHp() },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "losehp" }, player, viewer), 0);
                return sumEff;
              },
            },
            '失去2点体力': {
              content: async function (event, trigger, player) { await player.loseHp(2) },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + (get.effect(current, { name: "losehp" }, player, viewer) * 1.2), 0);
                return sumEff;
              },
            },
            '失去1点体力然后摸五张牌': {
              content: async function (event, trigger, player) {
                await player.loseHp();
                if (player.isIn()) await player.draw(5);
              },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => {
                  let losehp = get.effect(current, { name: "losehp" }, player, viewer) * 1.2,
                    draw = get.effect(current, { name: "draw" }, player, viewer) * 1.4;
                  return sum + losehp + draw;
                }, 0);
                return sumEff;
              },
            },
            '摸牌阶段摸牌数+1': {
              content: async function (event, trigger, player) { await lib.skill.jlsg_tiangong_draw.change(player) },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (get.attitude(viewer, current) * att), 0);
                return sumEff;
              },
            },
            '摸两张牌': {
              content: async function (event, trigger, player) { await player.draw(2) },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + (get.effect(current, { name: "draw" }, player, viewer) * 1.1), 0);
                return sumEff;
              },
            },
            '摸三张牌': {
              content: async function (event, trigger, player) { await player.draw(3) },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + (get.effect(current, { name: "draw" }, player, viewer) * 1.2), 0);
                return sumEff;
              },
            },
            '摸四张牌': {
              content: async function (event, trigger, player) { await player.draw(4) },
              positive(targets, player, viewer) {
                let sumEff = targets.reduce((sum, current) => sum + (get.effect(current, { name: "draw" }, player, viewer) * 1.3), 0);
                return sumEff;
              },
            },
            '随机弃置两张牌': {
              content: async function (event, trigger, player) {
                let num = player.countDiscardableCards(player, "he");
                if (num > 0) await player.randomDiscard(Math.min(num, 2));
              },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (-get.attitude(viewer, current) * att * 1.1), 0);
                return sumEff;
              },
            },
            '随机弃置三张牌': {
              content: async function (event, trigger, player) {
                let num = player.countDiscardableCards(player, "he");
                if (num > 0) await player.randomDiscard(Math.min(num, 3));
              },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (-get.attitude(viewer, current) * att * 1.2), 0);
                return sumEff;
              },
            },
            '随机弃置四张牌': {
              content: async function (event, trigger, player) {
                let num = player.countDiscardableCards(player, "he");
                if (num > 0) await player.randomDiscard(Math.min(num, 4));
              },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (-get.attitude(viewer, current) * att * 1.3), 0);
                return sumEff;
              },
            },
            '随机获得其他角色各一张牌': {
              content: async function (event, trigger, player) {
                const targets = game.filterPlayer(p => p != player).sortBySeat();
                for (let target of targets) {
                  const cards = target.getGainableCards(player, "he");
                  if (cards.length) await player.gain(cards.randomGets(1), target, "giveAuto")
                };
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(p => p != player && p.countGainableCards(player, "he")).sortBySeat();
                let sumEff = targets.reduce((sum, current) => sum + Math.sign(get.effect(current, { name: "shunshou_copy2" }, player, viewer)), 0);
                return sumEff;
              },
              multi: true,
            },
            '随机将所有手牌分配给其他角色': {
              content: async function (event, trigger, player) {
                let players = game.filterPlayer(p => p != player);
                if (!players.length) return;
                let dis = new Map();
                let cards = player.getCards('h');
                for (let c of cards) {
                  let target = players.randomGet();
                  if (!dis.has(target)) {
                    dis.set(target, []);
                  }
                  dis.get(target).push(c);
                }
                await game.loseAsync({
                  gain_list: Array.from(dis.entries()),
                  player: player,
                  cards: cards,
                  giver: player,
                  animate: 'giveAuto',
                }).setContent('gaincardMultiple');
              },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                let sumEff = targets.reduce((sum, current) => sum + (-get.attitude(viewer, current) * att), 0);
                return sumEff;
              },
              multi: true,
            },
            '与手牌数更少的随机角色交换手牌': {
              content: async function (event, trigger, player) {
                let target = game.filterPlayer(p => p.countCards('h') < player.countCards('h'))
                  .randomGet();
                if (target) await player.swapHandcards(target);
              },
              positive(targets, player, viewer) {
                let att = Math.sign(get.attitude(viewer, player));
                targets = game.filterPlayer(p => p.countCards('h') < player.countCards('h'))
                let sumEff = targets.reduce((sum, current) => sum + (get.attitude(viewer, current) * att * 1.3), 0);
                return sumEff;
              },
            },
            '弃置所有牌并摸等量的牌': {
              content: async function (event, trigger, player) {
                let cards = player.getDiscardableCards(player, 'he');
                await player.discard(cards);
                await player.draw(cards.length);
              },
              positive(targets, player, viewer) {
                return Math.sign(get.attitude(viewer, player));
              },
            },
          };
          lib.skill.jlsgsy_bolue.initList();
          let groups = new Set(jlsg.characterList.map(c => get.character(c, 1)));
          for (let g of groups) {
            result[`随机获得一个${lib.translate[g]}势力技能`] = {
              content: async function (event, trigger, player) {
                let skills = player.getSkills();
                if (!_status.jlsgsy_bolue_list) {
                  lib.skill.jlsgsy_bolue.initList();
                }
                let skill = _status.jlsgsy_bolue_list[lib.skill[event.getParent().name]?.groupType]
                skill.removeArray(
                  game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
                );
                skills = skills.filter(skill => {
                  const info = lib.skill[skill];
                  if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
                  return true;
                });
                await player.addSkills(skill.randomGet());
              },
              positive(targets, player, viewer) {
                return Math.sign(get.attitude(viewer, player));
              },
              groupType: g,
            };
          }
          let jlsg_qs = false;
          if (_status.connectMode) {
            if (lib.configOL.cardPack.includes("jlsg_qs")) jlsg_qs = true;
          }
          else if (lib.config.cards.includes("jlsg_qs")) jlsg_qs = true;
          if (jlsg_qs) {
            result['视为使用【望梅止渴】'] = {
              content: async function (event, trigger, player) {
                await player.chooseUseTarget({ name: 'jlsgqs_wangmeizhike' }, true);
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_wangmeizhike" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            };
            result['视为使用【草船借箭】'] = {
              content: async function (event, trigger, player) {
                await player.chooseUseTarget({ name: 'jlsgqs_caochuanjiejian' }, true)
              },
              positive(targets, player, viewer) {
                targets = game.filterPlayer(current => current != player);
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_caochuanjiejian" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            };
            result['视为对自己使用【梅】'] = {
              content: async function (event, trigger, player) { await player.useCard({ name: 'jlsgqs_mei' }, player) },
              positive(targets, player, viewer) {
                targets = [player];
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_mei" }, player, viewer), 0);
                return sumEff;
              },
            };
            result['视为对所有角色使用【梅】'] = {
              content: async function (event, trigger, player) { await player.useCard({ name: 'jlsgqs_mei' }, game.filterPlayer().sortBySeat(player)) },
              positive(targets, player, viewer) {
                targets = game.filterPlayer();
                let sumEff = targets.reduce((sum, current) => sum + get.effect(current, { name: "jlsgqs_mei" }, player, viewer), 0);
                return sumEff;
              },
              multi: true,
            };
          }
          delete this.effects;
          this.effects = result;
          return result;
        },
        subSkill: {
          handcard: {
            charlotte: true,
            change(player) {
              player.addSkill('jlsg_tiangong_handcard');
              player.addMark('jlsg_tiangong_handcard');
              game.log(player, '的手牌上限', '#y+', '1');
            },
            mod: {
              maxHandcard(player, num) {
                var add = player.storage.jlsg_tiangong_handcard;
                if (typeof add == 'number') return num + add;
              },
            },
            markimage: 'image/card/handcard.png',
            intro: {
              content(num, player) {
                return `手牌上限+${num}`;
              },
            },
          },
          useSha: {
            charlotte: true,
            change(player) {
              player.addSkill('jlsg_tiangong_useSha');
              player.addMark('jlsg_tiangong_useSha');
              game.log(player, '使用【杀】次数上限', '#y+', '1');
            },
            mod: {
              cardUsable(card, player, num) {
                var add = player.storage.jlsg_tiangong_useSha;
                if (card.name == "sha") return num + add;
              },
            },
            marktext: '机',
            intro: {
              content(num, player) {
                return `使用【杀】次数上限+${num}`;
              },
            },
          },
          draw: {
            charlotte: true,
            change(player) {
              player.addSkill('jlsg_tiangong_draw');
              player.addMark('jlsg_tiangong_draw');
              game.log(player, '摸牌阶段摸牌数', '#y+', '1');
            },
            trigger: { player: 'phaseDrawBegin2' },
            forced: true,
            filter(event, player) {
              return !event.numFixed && player.countMark('jlsg_tiangong_draw');
            },
            content() {
              trigger.num += player.countMark('jlsg_tiangong_draw');
            },
            marktext: '机',
            intro: {
              content(num, player) {
                return `摸牌阶段摸牌数+${num}`;
              },
            },
          },
        }
      },
      jlsg_linglong: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['damageBegin3', 'loseHpBefore', 'loseMaxHpBefore', 'changeSkillsBefore'] },
        filter: function (event, player) {
          if (event.name == 'damage') {
            if (!event.source || event.source == player) return false;
          }
          else if (event.name == 'changeSkills') {
            if (!event.removeSkill.length) return false;
            if (event.getParent().name == 'jlsg_linglong') return false;
          }
          else {
            if (event.getParent().player == player) return false;
          }
          return lib.skill.jlsg_linglong.validTargets(player, event.removeSkill).length;
        },
        async cost(event, trigger, player) {
          const targets = lib.skill.jlsg_linglong.validTargets(player, trigger.removeSkill),
            list = {};
          for (let target of targets) {
            if (!list[target.playerid]) list[target.playerid] = {};
            const skills = lib.skill.jlsg_linglong.validSkillsOthers(target);
            for (let skill of skills) {
              const { targetFilter, positive } = lib.skill[skill];
              const targets1 = targetFilter(target);
              let eff = positive(targets1, target, player);
              list[target.playerid][skill] = eff;
            };
          };
          let prompt = `###${get.prompt("jlsg_linglong")}###选择失去技能的角色`;
          if (trigger.name == 'changeSkills') {
            prompt += `来抵消失去${trigger.removeSkill.map(s => `【${get.translation(s)}】`).join("")}`;
          } else {
            let eff = {
              "damage": "受到伤害",
              "loseHp": "失去体力",
              "loseMaxHp": "扣减体力上限",
            }[trigger.name];
            prompt += `来抵消或转移<span style="font-weight: bold;">${eff}</span>效果`;
          }
          event.result = await player.chooseTarget(prompt, (_, player, target) => {
            return _status.event.targets.includes(target);
          })
            .set('ai', target => 20 - Math.min(Object.values(get.event("choice")[target.playerid])))
            .set('targets', targets)
            .set("choice", list)
            .forResult();
          event.result.cost_data = { list };
        },
        async content(event, trigger, player) {
          const { targets: [target], cost_data: { list } } = event;
          let skills,
            removeSkill;
          if (target == player) {
            skills = lib.skill.jlsg_linglong.validSkillsSelf(target, trigger.removeSkill);
          } else {
            skills = lib.skill.jlsg_linglong.validSkillsOthers(target);
          }
          if (skills.length == 1) removeSkill = skills;
          else {
            const next = player.chooseButton([
              `玲珑:请选择${get.translation(target)}失去的技能`,
              [skills.map(s => [s, get.translation(s)]), 'tdnodes'],
            ]).set('forced', true).set("ai", button => {
              return 20 - get.event("choice")[button.link];
            }).set("choice", list[target.playerid]);
            if (trigger.name == 'changeSkills' && trigger.removeSkill.length > 1) {
              next.set('selectButton', [1, trigger.removeSkill.length]);
            }
            const { result: chooseRemove } = await next;
            if (!chooseRemove.bool) return;
            removeSkill = chooseRemove.links;
          }
          await target.removeSkills(removeSkill);
          if (trigger.name != 'changeSkills') {
            if (target == player) await trigger.cancel();
            else trigger.player = target;
            return;
          }
          let retainSkill;
          if (removeSkill.length >= trigger.removeSkill.length) retainSkill = trigger.removeSkill;
          else {
            const next = player.chooseButton([
              `玲珑:请选择${get.translation(removeSkill.length)}个技能不被失去`,
              [trigger.removeSkill.map(s => [s, get.translation(s)]), 'tdnodes'],
            ]);
            next.set('forced', true);
            next.set('selectButton', result.links.length);
            const { result: chooseRetain } = await next;
            if (!chooseRetain.bool) return;
            retainSkill = chooseRetain.links;
          }
          trigger.removeSkill.removeArray(retainSkill);
          game.log(player, '失去', ...retainSkill.map(i => {
            return '#g【' + get.translation(i) + '】';
          }), '技能的效果被抵消了');
          if (!trigger.addSkill.length && !trigger.removeSkill.length) {
            await trigger.cancel();
          }
        },
        validSkillsSelf: function (player, ignoreSkills) {
          let skills = player.getSkills(null, false, false)
            .removeArray(player.getStockSkills())
            .filter(s => lib.translate[s] && lib.translate[s + '_info'] && lib.skill[s] && !lib.skill[s].charlotte);
          if (ignoreSkills) skills.removeArray(ignoreSkills);
          return skills;
        },
        validSkillsOthers: function (player) {
          return player.getSkills(null, false, false).filter(s => s.startsWith('jlsg_tiangong_jiguan_'));
        },
        validTargets: function (player, ignoreSkills) {
          let result = game.filterPlayer(p => p != player
            && lib.skill.jlsg_linglong.validSkillsOthers(p).length
          );
          let skills = lib.skill.jlsg_linglong.validSkillsSelf(player, ignoreSkills);
          if (skills.length) result.push(player);
          return result;
        },
      },
      jlsg_bamen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseUseBegin' },
        forced: true,
        async content(event, trigger, player) {
          await player.chooseToDiscard(true, 'h', player.countCards('h'));
          let list = [];
          for (let i = 0; i < ui.cardPile.childElementCount; i++) {
            const card = ui.cardPile.childNodes[i];
            const name = get.name(card, false);
            if (list.some(c => get.name(c, false) === name)) {
              if (name == "sha") {
                if (list.some(c => c.name == "sha" && get.nature(card) === get.nature(c))) continue;
              }
              else continue;
            }
            list.add(card);
            if (list.length >= 8) break;
          };
          if (list.length) await player.gain(list, "draw2");
          if (list.length < 8) {
            const { result } = await player.chooseTarget(`八门：请选择一名其他角色受到${8 - list.length}点雷电伤害`, lib.filter.notMe)
              .set('ai', target => get.damageEffect(target, _status.event.player, _status.event.player, 'thunder'));
            if (result.bool && result.targets) await result.targets[0].damage("thunder", 8 - list.length);
          }
        },
      },
      jlsg_gucheng: {
        audio: "ext:极略/audio/skill:2",
        init(player) { player.storage.jlsg_gucheng = [] },
        onremove: true,
        mod: {
          aiOrder(player, card, num) {
            if (!['basic', 'trick'].includes(get.type(card))) return;
            let used = player.storage.jlsg_gucheng;
            if (used.some(i => i.name == card.name)) {
              if (card.name == "sha") {
                if (used.some(i => i.name == "sha" && i.nature == get.nature(card))) return;
              }
              else return;
            }
            if (game.hasPlayer(cur => {
              if (cur == player) return false;
              player.storage.jlsg_gucheng_check = true;
              if (-get.effect(player, card, cur, player) > player.getUseValue(card)) {
                delete player.storage.jlsg_gucheng_check;
                return true;
              };
              delete player.storage.jlsg_gucheng_check;
              return false;
            })) return 0;
          },
        },
        mark: true,
        intro: {
          content(_, player, skill) {
            let used = player.storage.jlsg_gucheng;
            if (!used.length) return '';
            return '使用过：' + used.map(n => get.translation(n)).join(' ');
          },
        },
        trigger: {
          player: "useCard",
          global: 'useCardToPlayered',
        },
        firstDo: true,
        forced: true,
        popup: false,
        filter: function (event, player) {
          if (event.name == "useCardToPlayered") {
            if (event.getParent().excluded.includes(player)) return false;
            if (event.player == player) return false;
            if (!(event._targets || event.targets).includes(player)) return false;
          }
          if (!['basic', 'trick'].includes(get.type(event.card))) return false;
          let card = { name: event.card.name, nature: get.nature(event.card) },
            used = player.storage.jlsg_gucheng;
          if (card.name != "sha") return !used.some(i => i.name == card.name);
          return !used.some(i => i.name == "sha" && i.nature == card.nature);
        },
        async content(event, trigger, player) {
          if (trigger.name == "useCardToPlayered") {
            await player.logSkill("jlsg_gucheng");
            trigger.getParent().excluded.add(player);
          }
          else {
            let card = { name: trigger.card.name, nature: get.nature(trigger.card) };
            player.storage.jlsg_gucheng.add(card);
            player.markSkill("jlsg_gucheng");
          }
        },
        ai: {
          effect: {
            target: function (card, player, target, current) {
              if (target.storage.jlsg_gucheng_check) return;
              if (player != target && ['basic', 'trick'].includes(get.type(card))) {
                let used = target.storage.jlsg_gucheng;
                if (
                  card.name != "sha" && !used.some(i => i.name == card.name)
                  || card.name == "sha" && !used.some(i => i.name == "sha" && i.nature == card.nature)
                ) return "zeroplayertarget";
              }
            },
          },
        },
      },
      jlsg_yingshi: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: "gameDrawAfter",
        },
        forced: true,
        init(player) {
          player.storage.jlsg_yingshi = [];
        },
        content: function () {
          'step 0'
          var card = get.cardPile(card => get.type(card) == 'basic');
          if (card) {
            player.gain(card, 'gain2');
          }
          'step 1'
          var cards = player.getCards('h', { type: 'basic' });
          player.addGaintag(cards, 'jlsg_yingshi_tag');
          player.storage.jlsg_yingshi.addArray(cards);
        },
        group: ['jlsg_yingshi2', 'jlsg_yingshi3', 'jlsg_yingshi_mark'],
        mod: {
          cardUsable: function (card, player) {
            if (!card.cards || !card.cards.length) return;
            for (var i of card.cards) {
              if (!player.storage.jlsg_yingshi.includes(i)) return;
            }
            return Infinity;
          },
          targetInRange: function (card, player) {
            if (!card.cards || !card.cards.length) return;
            for (var i of card.cards) {
              if (!player.storage.jlsg_yingshi.includes(i)) return;
            }
            return true;
          }
        },
        subSkill: {
          mark: {
            trigger: {
              global: ['gainEnd', 'loseAsyncEnd']
            },
            firstDo: true,
            silent: true,
            filter(event, player) {
              for (let p of game.filterPlayer()) {
                let cards = event.getg(p)
                  .filter(
                    c => !c.hasGaintag('jlsg_yingshi_tag') && player.storage.jlsg_yingshi.includes(c)
                  );
                if (cards.length) {
                  return true;
                }
              }
              return false;
            },
            content() {
              for (let p of game.filterPlayer()) {
                let cards = trigger.getg(p).filter(
                  c => !c.hasGaintag('jlsg_yingshi_tag') && player.storage.jlsg_yingshi.includes(c)
                );
                if (cards.length) {
                  p.addGaintag(cards, 'jlsg_yingshi_tag');
                }
              }
            },
          }
        },
      },
      jlsg_yingshi2: {
        audio: 'jlsg_yingshi',
        // usable: 1,
        trigger: {
          player: 'gainAfter',
          global: 'loseAsyncAfter',
        },
        forced: true,
        filter(event, player) {
          var cards = event.getg(player);
          var used = player.storage.jlsg_yingshi2_used || new Set();
          var cards2 = game.filterPlayer(p => p != player && !used.has(p)).map(
            p => event.getl(p).cards2
          ).flat();
          cards = cards.filter(c => cards2.includes(c));
          return cards.every(c => get.type(c) == 'basic') && cards.some(c => !player.storage.jlsg_yingshi.includes(c));
        },
        content() {
          game.log(player, "获得的牌被标记为了", `#r"鹰"`);
          var cards = trigger.getg(player);
          player.addTempSkill('jlsg_yingshi2_used');
          var used = player.storage.jlsg_yingshi2_used;
          for (let target of game.filterPlayer(p => p != player && !used.has(p))) {
            var cards2 = trigger.getl(target).cards2;
            var targetCards = cards.filter(c => cards2.includes(c) && !player.storage.jlsg_yingshi.includes(c));
            if (targetCards.length) {
              used.add(target);
              player.addGaintag(targetCards, 'jlsg_yingshi_tag');
              player.storage.jlsg_yingshi.addArray(targetCards);
            }
          }
        },
      },
      jlsg_yingshi2_used: {
        init(player) {
          player.storage.jlsg_yingshi2_used = new Set();
        },
        onremove: true,
      },
      jlsg_yingshi3: {
        audio: 'jlsg_yingshi',
        trigger: {
          global: 'phaseEnd',
        },
        forced: true,
        filter(event, player) {
          var cards = ['cardPile', 'discardPile']
            .map(pos => Array.from(ui[pos].childNodes))
            .flat()
            .filter(c => player.storage.jlsg_yingshi.includes(c));
          if (cards.length) {
            return true;
          }
          for (let p of game.filterPlayer(p => p != player)) {
            let pCards = p.getCards('h', c => player.storage.jlsg_yingshi.includes(c));
            if (pCards.length) {
              return true;
            }
          }
          return false;
        },
        content() {
          var cards = ['cardPile', 'discardPile']
            .map(pos => Array.from(ui[pos].childNodes))
            .flat()
            .filter(c => player.storage.jlsg_yingshi.includes(c));
          if (cards.length) {
            player.$gain2(cards);
          }
          for (let p of game.filterPlayer(p => p != player)) {
            let pCards = p.getCards('h', c => player.storage.jlsg_yingshi.includes(c));
            if (pCards.length) {
              p.$give(pCards, player);
              cards.addArray(pCards);
            }
          }
          game.loseAsync({
            gain_list: [[player, cards]],
            cards: cards,
            visible: true,
            gaintag: ['jlsg_yingshi_tag'],
          }).setContent("gaincardMultiple");
        },
      },
      jlsg_langxi: {
        init(player) {
          player.storage.jlsg_langxi = [];
        },
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: "phaseBefore",
          player: "enterGame",
        },
        filter(event, player) {
          return event.name != "phase" || game.phaseNumber == 0;
        },
        direct: true,
        content() {
          'step 0'
          var cardNames = lib.inpile
            .filter(c => {
              let info = lib.card[c];
              return info.type == 'trick' && !info.notarget && !info.singleCard && info.content;
            });
          if (!cardNames.length) {
            event.finish();
            return;
          }
          var choice;
          var fakeTarget = game.filterPlayer(p => get.attitude(player, p) <= 0).randomGet();
          if (fakeTarget) {
            choice = cardNames.filter(c => get.effect(fakeTarget, { name: c }, player, player) > 0).randomGet();
          }
          if (!choice) {
            choice = cardNames.randomGet();
          }
          player.chooseButton([get.prompt(event.name), [cardNames, "vcard"]])
            .set('ai', (button) => button.link[2] == _status.event.choice ? 1 : 0)
            .set('choice', choice);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name);
          var name = result.links[0][2];
          game.log(player, "将", `#y${lib.translate[name]}`, "标记为", `#r"狼"`);
          player.markAuto("jlsg_langxi", [name]);
        },
        intro: { content: "已记录：$" },
        group: ['jlsg_langxi2', 'jlsg_langxi3'],
      },
      jlsg_langxi2: {
        audio: "jlsg_langxi",
        trigger: { player: "useCard" },
        filter: function (event, player) {
          if (get.type(event.card) != 'trick') {
            return false;
          }
          if (player.getStorage('jlsg_langxi').includes(event.card.name)) {
            return false;
          }
          let info = get.info(event.card);
          if (info.type != 'trick' || info.notarget || info.singleCard || !info.content) {
            return false;
          }
          let cards = player
            .getHistory("lose", evt => evt.getParent() == event)
            .map(e => e.hs)
            .flat();
          if (!event.cards.length || event.cards.some(c => !cards.includes(c))) {
            return false;
          }
          return true;
        },
        check(event, player) {
          var fakeTarget = game.filterPlayer(p => get.attitude(player, p) <= 0).randomGet();
          if (!fakeTarget) {
            return false;
          }
          return get.effect(fakeTarget, { name: event.card.name }, player, player) > 0;
        },
        prompt2(event, player) {
          return `将【${lib.translate[event.card.name]}】标记为"狼"`
        },
        content() {
          game.log(player, "将", `#y${lib.translate[trigger.card.name]}`, "标记为", `#r"狼"`);
          player.markAuto("jlsg_langxi", [trigger.card.name]);
        },
      },
      jlsg_langxi3: {
        audio: "jlsg_langxi",
        trigger: { player: "useCardAfter" },
        filter: function (event, player) {
          if (get.type(event.card) != 'trick') {
            return false;
          }
          if (!player.getStorage('jlsg_langxi').length) {
            return false;
          }
          let info = get.info(event.card);
          if (info.type != 'trick' || info.notarget || info.singleCard || !info.content) {
            return false;
          }
          let cards = player
            .getHistory("lose", evt => evt.getParent() == event)
            .map(e => e.hs)
            .flat();
          if (!event.cards.length || event.cards.some(c => !cards.includes(c))) {
            return false;
          }
          return event.targets.length;
        },
        direct: true,
        content() {
          'step 0'
          player.chooseTarget(
            `###${get.prompt(event.name)}###对任意名目标角色依次使用"狼"`,
            (_, player, target) => _status.event.targets.includes(target),
            [1, trigger.targets.length],
          )
            .set('targets', trigger.targets)
            .set('ai', (target) => {
              let player = _status.event.player;
              return player.getStorage('jlsg_langxi')
                .map(c => get.effect(target, { name: c }, player, player))
                .reduce((a, b) => a + b, 0);
            })
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          event.targets = result.targets;
          event.cards = player.getStorage('jlsg_langxi').slice().randomSort();
          'step 2'
          var card = { name: event.cards.pop() };
          var targets = event.targets.filter(p => p.isIn() && lib.filter.targetEnabled2(card, player, p));
          player.useCard(card, targets);
          'step 3'
          if (player.isIn() && event.cards.length) {
            event.goto(2);
          }
        },
      },
      jlsg_shenyin: {
        audio: "ext:极略/audio/skill:2",
        priority: 1,
        trigger: {
          global: "phaseBefore",
          player: "enterGame",
          source: "dieAfter",
        },
        filter(event, player) {
          if (event.name == 'die') {
            return event.player != player;
          }
          return event.name != "phase" || game.phaseNumber == 0;
        },
        forced: true,
        content() {
          player.addMark('jlsg_shenyin');
        },
        marktext: '隐',
        intro: {
          name: '神隐',
          name2: '隐',
          content: function (storage, player) {
            let result = ``;
            if (storage > 0) {
              result += '共有' + storage + '个标记<br>';
            }
            if (player.storage.jlsg_shenyin2) {
              let { hp, maxHp, skills, jlsg_yingshi, jlsg_langxi } = player.storage.jlsg_shenyin2;
              result += '记录：';
              let div = ui.create.div('.hp');
              div.style.width = 'auto';
              div.style.left = 'auto';
              div.style.top = 'auto';
              div.style.verticalAlign = 'middle';
              let condition;
              if (hp == 0) {
                condition = '';
              } else if (hp > Math.round(maxHp / 2) || hp === maxHp) {
                condition = 'high';
              } else if (hp > Math.floor(maxHp / 3)) {
                condition = 'mid';
              } else {
                condition = 'low';
              }
              div.dataset.condition = condition;
              for (let i = 0; i != hp; ++i) {
                ui.create.div('', div);
              }
              for (let i = hp; i < maxHp; ++i) {
                ui.create.div('.lost', div);
              }
              result += div.outerHTML + '<br>';
              result += `技能：` + skills.map(s => get.translation(s)) + '<br';
              if (jlsg_yingshi) {
                result += `鹰：` + jlsg_yingshi.length;
              }
              if (jlsg_langxi) {
                result += `狼：` + jlsg_langxi.map(c => get.translation(c)).join(' ');
              }
            }
            return result;
          },
        },
        group: ['jlsg_shenyin2', 'jlsg_shenyin3'],
        onremove: function (player, skill) {
          if (lib.skill.jlsg_shenyin3.filter(_status.event, player)) {
            var next = game.createEvent("jlsg_shenyin3");
            // event.next.remove(next);
            // var evt = event.getParent();
            // evt.after.push(next);
            next.player = player;
            next.setContent(lib.skill.jlsg_shenyin3.content);
          }
        },
      },
      jlsg_shenyin2: {
        audio: 'jlsg_shenyin',
        trigger: { player: 'phaseBegin' },
        filter(event, player) {
          return player.countMark('jlsg_shenyin');
        },
        check(event, player) {
          if (!player.storage.jlsg_shenyin2) {
            return true;
          }
          let stored = player.storage.jlsg_shenyin2;
          let value = Math.sign(player.hp - stored.hp)
            + Math.sign(player.maxHp - stored.maxHp)
            + Math.sign(player.getSkills(null, false, false).length - stored.skills.length)
            + Math.sign((player.storage.jlsg_yingshi || []).length - (stored.jlsg_yingshi || []).length)
            + Math.sign((player.storage.jlsg_langxi.length || []) - (stored.jlsg_langxi || []).length);
          return value - 0.5 + Math.random() > 0;
        },
        prompt2: '记录你当前的体力、体力上限、技能、“鹰”和“狼”，然后获得一枚「神隐」标记',
        content() {
          player.storage.jlsg_shenyin2 = {
            hp: player.hp,
            maxHp: player.maxHp,
            skills: player.getSkills(null, false, false),
            jlsg_yingshi: player.storage.jlsg_yingshi,
            jlsg_langxi: player.storage.jlsg_langxi,
          }
          player.addMark('jlsg_shenyin');
        },
      },
      jlsg_shenyin3: {
        audio: 'jlsg_shenyin',
        trigger: { player: 'dyingBegin' },
        filter(event, player) {
          return player.countMark('jlsg_shenyin') && player.storage.jlsg_shenyin2;
        },
        locked: true,
        direct: true,
        content() {
          'step 0'
          player.chooseBool(`###${get.prompt(event.name)}###弃置所有「神隐」标记并恢复至记录的状态`, player.hp <= -1 || player.canSave(player));
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name);
          event.cnt = player.countMark('jlsg_shenyin');
          player.removeMark('jlsg_shenyin', event.cnt, true);
          var stored = player.storage.jlsg_shenyin2;
          if (stored.maxHp > player.maxHp) {
            player.gainMaxHp(stored.maxHp - player.maxHp);
          }
          if (stored.maxHp < player.maxHp) {
            player.loseMaxHp(player.maxHp - stored.maxHp);
          }
          if (stored.hp != player.hp) {
            player.changeHp(stored.hp - player.hp);
          }
          player.changeSkills(stored.skills, player.getSkills(null, false, false));
          'step 2'
          var stored = player.storage.jlsg_shenyin2;
          if (player.hasSkill('jlsg_yingshi') && !game.hasPlayer(p => p != player && p.hasSkill('jlsg_yingshi'))) {
            for (let c of player.storage.jlsg_yingshi || []) {
              if (!stored.jlsg_yingshi || !stored.jlsg_yingshi.includes(c)) {
                let owner = get.owner(c);
                c && c.removeGaintag(c, 'jlsg_yingshi_tag');;
              }
            }
            for (let c of stored.jlsg_yingshi || []) {
              if (!player.storage.jlsg_yingshi || !player.storage.jlsg_yingshi.includes(c)) {
                let owner = get.owner(c);
                c && c.addGaintag(c, 'jlsg_yingshi_tag');;
              }
            }
          }
          player.storage.jlsg_yingshi = stored.jlsg_yingshi;
          player.storage.jlsg_langxi = stored.jlsg_langxi;
          player.markAuto('jlsg_langxi');
          'step 3'
          if (player.isIn()) {
            player.draw(2 * event.cnt);
          }
        },
        ai: {
          save: true,
          skillTagFilter: function (player, tag, target) {
            if (player != target
              || !player.countMark('jlsg_shenyin')
              || !player.storage.jlsg_shenyin2
              || _status.event.name === 'jlsg_shenyin3') return false;
          },
        }
      },
      jlsg_chuyuan: {
        audio: "ext:极略/audio/skill:2",
        marktext: "储",
        intro: {
          markcount: "expansion",
          mark(dialog, content, player) {
            var content = player.getExpansions("jlsg_chuyuan");
            if (content && content.length) {
              if (player == game.me || player.isUnderControl()) {
                dialog.addAuto(lib.skill.jlsg_chuyuan.prompt2(null, player))
                dialog.addAuto(content);
              } else {
                return "共有" + get.cnNumber(content.length) + "张储";
              }
            }
          },
          content(content, player) {
            var content = player.getExpansions("jlsg_chuyuan");
            if (content && content.length) {
              if (player == game.me || player.isUnderControl()) {
                return `${lib.skill.jlsg_chuyuan.prompt2(null, player)}<br>${get.translation(content)}`;
              }
              return "共有" + get.cnNumber(content.length) + "张储";
            }
          },
        },
        trigger: { global: "useCardAfter" },
        filter(event) {
          return ["sha", "shan"].includes(get.name(event.card));
        },
        prompt(event, player) {
          const color = event.card.name == "sha" ? "黑" : "红";
          return `储元：是否摸两张牌，然后可以将一张${color}色牌至于武将牌上称为“储”？`
        },
        prompt2(event, player) {
          const cards = player.getExpansions("jlsg_chuyuan"),
            black = cards.filter(i => get.color(i) == "black").length,
            red = cards.filter(i => get.color(i) == "red").length;
          let str1 = `<span style='color:#000000' data-nature='graymm'>${black}</span>`,
            str2 = `<span style='color:#FF0000' data-nature='watermm'>${red}</span>`;
          return `<div class='center text'>当前“储”：${cards.length}（${str1}|${str2}）</div>`;
        },
        check(event, player) {
          return get.effect(player, { name: "draw" }, player, player) + 1;
        },
        async content(event, trigger, player) {
          await player.draw(2);
          const color = trigger.card.name == "sha" ? ["black", "黑"] : ["red", "红"];
          if (!player.countCards("he", c => get.color(c, player) == color[0])) return;
          else {
            let str = lib.skill.jlsg_chuyuan.prompt2(trigger, player);
            const { result: { bool, cards } } = await player
              .chooseCard("he", `###储元：请选择一张${color[1]}色牌置于武将牌上称为“储”###${str}`)
              .set("color", color)
              .set("filterCard", (card, player, event) => get.color(card, player) == get.event("color")[0])
              .set("ai", card => {
                const player = get.player();
                return 8 - get.value(card, player);
              })
            if (!bool) return;
            await player.addToExpansion(player, cards, "giveAuto").set("gaintag", "jlsg_chuyuan");
            player.markSkill("jlsg_chuyuan");
            player.update();
            game.asyncDelayx();
          }
        },
        group: "jlsg_chuyuan_effect",
        subSkill: {
          effect: {
            mod: {
              maxHandcard(player, num) {
                const cards = player.getExpansions("jlsg_chuyuan"),
                  black = cards.filter(i => get.color(i) == "black").length,
                  red = cards.filter(i => get.color(i) == "red").length;
                let eff = Math.min(black, red);
                return num + eff;
              },
            },
            trigger: { player: "phaseDrawBegin1" },
            filter(event, player) {
              const cards = player.getExpansions("jlsg_chuyuan"),
                black = cards.filter(i => get.color(i) == "black").length,
                red = cards.filter(i => get.color(i) == "red").length;
              let num = Math.min(black, red);
              return !event.fixed && num > 0;
            },
            forced: true,
            popup: false,
            content() {
              const cards = player.getExpansions("jlsg_chuyuan"),
                black = cards.filter(i => get.color(i) == "black").length,
                red = cards.filter(i => get.color(i) == "red").length;
              let num = Math.min(black, red);
              trigger.num += num;
            },
          },
        },
      },
      jlsg_dengji: {
        audio: "ext:极略/audio/skill:2",
        intro: {
          nocount: true,
          content: "limited",
        },
        derivation: ["jlsg_renzheng", "jlsg_jiquan"],
        trigger: { player: "phaseZhunbeiBegin" },
        filter(event, player) {
          let num = player.countExpansions("jlsg_chuyuan");
          return num % 2 != 0 && num >= 5;
        },
        juexingji: true,
        limited: true,
        skillAnimation: true,
        forced: true,
        async content(event, trigger, player) {
          player.awakenSkill("jlsg_dengji");
          const cards = player.getExpansions("jlsg_chuyuan"),
            black = cards.filter(i => get.color(i) == "black").length,
            red = cards.filter(i => get.color(i) == "red").length;
          const num = Math.min(black, red);
          await player.gain(player, cards, "giveAuto", true);
          player.disableSkill("jlsg_dengji_awake", "jlsg_chuyuan");
          if (num == black) await player.addSkills(["jlsg_renzheng"]);
          else await player.addSkills(["jlsg_jiquan"]);
          const characters = lib.skill.jlsg_dengji.getCharacters();
          var skills = [];
          for (const name of characters) {
            if (!get.character(name)) continue;
            const skills2 = get.character(name)[3];
            if (!skills2 || !skills2.length) continue;
            for (let j = 0; j < skills2.length; j++) {
              if (player.hasSkill(skills2[j])) continue;
              else if (skills.includes(skills2[j])) continue;
              if (lib.filter.skillDisabled(skills2[j])) continue;
              const info = lib.skill[skills2[j]];
              if (!info || (!info.trigger && !info.enable && !info.mod) || info.silent || info.hiddenSkill || (info.zhuSkill && !player.isZhu2())) continue;
              if (info.ai && (info.ai.combo && !player.hasSkill(info.ai.combo))) continue;
              skills.add(skills2[j]);
            };
          };
          if (skills.length) {
            if (skills.length >= num) skills = skills.randomGets(num);
            await player.addSkills(skills);
          }
        },
        getCharacters() {
          const name = [
            '曹操', '曹芳', '曹奂', '曹髦', '曹丕',
            '曹睿', '曹叡', '董卓', '公孙度', '公孙恭',
            '公孙康', '公孙渊', '公孙瓒', '郭汜', '韩遂',
            '李傕', '刘备', '刘辩', '刘表', '刘禅',
            '刘琮', '刘宏', '刘琦', '刘协', '刘焉',
            '刘繇', '刘璋', '吕布', '马超', '马腾',
            '孟获', '士燮', '司马炎', '司马昭', '孙策',
            '孙登', '孙皓', '孙坚', '孙亮', '孙权',
            '孙休', '陶谦', '王朗', '袁尚', '袁绍',
            '袁术', '袁谭', '袁熙', '张角', '张鲁',
          ];
          if (!_status.characterlist) {
            let list = [];
            if (_status.connectMode) list = get.charactersOL();
            else {
              for (var i in lib.character) {
                if (!lib.filter.characterDisabled2(i) && !lib.filter.characterDisabled(i)) list.push(i);
              };
            }
            game.countPlayer2(function (current) {
              list.remove(current.name);
              list.remove(current.name1);
              list.remove(current.name2);
            });
            _status.characterlist = list;
          }
          let list = _status.characterlist.filter(i => {
            const str1 = get.translation(i);
            return name.some(i => str1.indexOf(i) > -1 && str1.lastIndexOf(i) > -1);
          });
          return list.randomSort();
        },
        ai: {
          combo: "jlsg_chuyuan",
        },
      },
      jlsg_jiquan: {
        audio: "ext:极略/audio/skill:1",
        enable: "phaseUse",
        usable: 1,
        filterTarget: lib.filter.notMe,
        selectTarget: [1, Infinity],
        multitarget: true,
        multiline: true,
        async content(event, trigger, player) {
          event.targets.sortBySeat();
          for (let target of event.targets) {
            if (player.ai.shown > target.ai.shown && get.attitude(player, target) < -1) {
              player.addExpose(0.1);
            }
          }
          let history = player.getAllHistory('useSkill', e => e.skill == 'jlsg_jiquan');
          for (let target of event.targets) {
            if (!player.isIn()) {
              return;
            }
            if (!target.isIn()) {
              continue;
            }
            let cnt = history.filter(e => e.event.targets.includes(target)).length;
            cnt = Math.min(cnt, 3);
            let index;
            let valid0 = cnt <= target.countGainableCards(player, 'he');
            let valid1 = target.getSkills(null, false, false).length != 0;
            if (!valid0 && !valid1) {
              continue;
            }
            if (!valid0) {
              index = 1;
            }
            else if (!valid1) {
              index = 0;
            }
            else {
              ({ result: { index } } = await target.chooseControlList([
                `交给${get.translation(player)}${get.cnNumber(cnt)}张牌`,
                `交给${get.translation(player)}一个技能`,
              ], true, () => _status.event.choice,
              ).set('choice', cnt != 3 ? 0 : 1));
            }
            switch (index) {
              case 0:
                await target.chooseToGive(player, cnt, 'he', true);
                break;
              case 1:
                let skills = target.getSkills(null, false, false).map(s => [s, get.translation(s)]);
                let { result } = await target.chooseButton([
                  `选择一个技能交给${get.translation(player)}`,
                  [skills, 'tdnodes'],
                ], true);
                if (result.bool) {
                  let skill = result.links[0];
                  target.popup(skill, 'gray');
                  player.popup(skill);
                  await Promise.all([
                    target.removeSkills(skill),
                    player.addSkills(skill),
                  ]);
                }
                break;
            }
          }
          if (player.maxHp <= event.targets.map(p => p.maxHp || 0).reduce((a, b) => a + b, 0)) {
            player.gainMaxHp();
            player.recover();
          }
        },
        ai: {
          threaten: 3,
        }
      },
      jlsg_renzheng: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        chooseButton: {
          dialog(event, player) {
            let skills = player.getSkills(null, false, false);
            let choices = [skills.map(s => [s, get.translation(s)]), "tdnodes"];
            return ui.create.dialog(`###仁政###选择交出的技能, 不选则交手牌`, choices);
          },
          select: [0, Infinity],
          check: button => 0,
          backup: function (links) {
            let next = {
              audio: "jlsg_renzheng",
              discard: false,
              lose: false,
              delay: false,
              links: links,
              filterTarget: function (card, player, target) {
                return player != target;
              },
              ai1: lib.skill.rende.check,
              async content(event, trigger, player) {
                let target = event.target;
                let links = lib.skill.jlsg_renzheng_backup.links;
                if (links && links.length) {
                  for (let link of links) {
                    player.popup(link, 'gray');
                    target.popup(link);
                  }
                  await player.removeSkills(links);
                  await target.addSkills(links);
                  return;
                } else {
                  await player.give(event.cards, target);
                }
                if (player.isIn() && target.isIn() && player.getAllHistory('useSkill',
                  e => e.sourceSkill == 'jlsg_renzheng' && e.event.childEvents[0] != event && e.event.targets[0] == target
                ).length == 0) {
                  let { result } = await player.chooseBool(`是否令你与${get.translation(target)}各增加1点体力上限并回复1点体力？`, get.attitude(player, target) > 0 || player.hp < target.hp);
                  if (result.bool) {
                    player.gainMaxHp();
                    player.recover();
                    target.gainMaxHp();
                    target.recover();
                  }
                }
              },
            };
            if (!links.length) {
              next.filterCard = true;
              next.selectCard = [1, Infinity];
              next.ai = {
                result: {
                  target: function (player, target) {
                    if (target.hasSkillTag("nogain")) return 0;
                    if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
                      if (target.hasSkillTag("nodu")) return 0;
                      return -10;
                    }
                    if (target.hasJudge("lebu")) return 0;
                    var nh = target.countCards("h");
                    var np = player.countCards("h");
                    if (player.hp == player.maxHp || player.storage.rerende < 0 || player.countCards("h") <= 1) {
                      if (nh >= np - 1 && np <= player.hp && !target.hasSkill("haoshi")) return 0;
                    }
                    return Math.max(1, 5 - nh);
                  },
                },
              };
            }
            return next;
          },
          prompt(links, player) {
            let prompt2 = '选择一名角色，令其获得你选择的牌';
            if (links.length) {
              prompt2 = `选择一名角色，令其获得` + links.map(s => `【${get.translation(s)}】`).join(" ");
            }
            return `###${get.prompt('jlsg_renzheng')}###${prompt2}`;
          },
        },
        ai: {
          order: 4,
          result: {
            player: 1,
          },
        },
      },
      jlsg_qifeng: {
        audio: "ext:极略/audio/skill:2",
        onremove: true,
        forced: true,
        trigger: { player: "dying" },
        async content(event, trigger, player) {
          await player.loseMaxHp();
          if (!player.isIn()) return;
          player.storage.jlsg_qifeng ??= [1, 0, 0];
          const [recover, draw, damage] = player.storage.jlsg_qifeng
          await player.recoverTo(recover);
          if (draw > 0) await player.draw(draw);
          if (damage > 0) {
            const { result } = await player.chooseTarget(`栖凤：请选择一名其他角色对其造成${damage}点火焰伤害`, true, lib.filter.notMe)
              .set("ai", target => {
                return get.damageEffect(target, player, player, "fire");
              });
            if (result.bool) await result.targets[0].damage(damage, "fire", player, "noCard");
          }
        },
        ai: {
          threaten: 0.9,
          expose: 0.25,
        },
      },
      jlsg_lunce: {
        audio: "ext:极略/audio/skill:3",
        logAudio(event, player, triggername, _, costResult) {
          let type = costResult.cost_data.typeInfo,
            list = ["下策", "中策", "上策"];
          let index = list.indexOf(type) + 1;
          return [`ext:极略/audio/skill/jlsg_lunce${index}.mp3`];
        },
        trigger: { global: "roundStart" },
        filter(event, player) {
          let check = ["top", "mid", "bottom"];
          game.countPlayer(current => {
            let skills = current.getSkills(null, false, false);
            check.forEach((v, i) => {
              if (skills.includes(`jlsg_lunce_${player.playerid}_${v}`)) check[i] = null;
            });
          });
          check = check.filter(i => i);
          return check.length;
        },
        async cost(event, trigger, player) {
          const { result } = await player.chooseTarget(`###论策：请选择一名角色令其获得计策`)
            .set("ai", target => {
              const player = _status.event.player;
              if (game.phaseNumber <= 1) return target == player || target == _status.currentPhase;
              let num = target.hp * target.countCards("hs") + 0.1;
              if (target.hasJudge("lebu") || target.hasJudge("bingliang")) num = num * 0.3;
              const att = 10 - Math.abs(get.attitude(player, target));
              if (target.isMinHp() && target.hp < 3 || target.isMaxHandcard() && target.countCards("hs", c => target.hasValueTarget(c)) > 3) num = num * 3
              return num / att;
            })
          if (!result.bool) {
            event.result = { bool: false };
            return;
          }
          const target = result.targets[0],
            choices = ["top", "mid", "bottom"],
            choicesInfo = ["上策", "中策", "下策"],
            storage = {
              targetFilters: lib.skill.jlsg_lunce.targetFilters,
              targetEffects: lib.skill.jlsg_lunce.targetEffects,
            },
            storage2 = { easy: {}, };
          game.countPlayer(current => {
            if (!current.isIn()) return false;
            let skills = current.getSkills(null, false, false);
            choices.forEach((v, i) => {
              if (skills.includes(`jlsg_lunce_${player.playerid}_${v}`)) choicesInfo[i] = null;
            });
          });
          for (const name in storage) {//此处做选项固定
            let list = storage[name];
            for (let type of choices) {
              if (!choicesInfo[choices.indexOf(type)]) continue;
              const info = Object.keys(list[type]);
              let num = [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2 + 2), Math.floor(Math.random() * 2 + 4)];
              if (name === "targetEffects") num = [0, 1, 2, 3].randomGets(3);
              for (let t in info) {
                if (num.some(n => n == t)) {
                  let v = info[t];
                  if (!storage2[name]) storage2[name] = {};
                  if (!storage2[name][type]) storage2[name][type] = {};
                  storage2[name][type][v] = list[type][v];
                  if (list[type][v].easy) {
                    if (!storage2.easy[type]) storage2.easy[type] = {};
                    storage2.easy[type][v] = list[type][v].easy(target);
                  }
                }
              };
            };
          };
          let typeChoice, filterChoice, effectChoice, min,
            { targetFilters, targetEffects, easy } = storage2;
          for (let i in easy) {
            let list = Object.entries(easy[i]).sort((a, b) => a[1] - b[1]);
            if (!min || min[1][1] >= list[0][1]) min = [i, list[0]];
          }
          typeChoice = choicesInfo[choices.indexOf(min[0])];
          filterChoice = min[1][0];
          let choiceList = Object.keys(targetEffects[min[0]]),
            arr = {};
          for (let i of choiceList) {
            arr[i] = targetEffects[min[0]][i].positive(target);
          };
          let arrList = Object.entries(arr).sort((a, b) => a[1] - b[1]);
          if (get.attitude(player, target) >= 1) {
            effectChoice = arrList[arrList.length - 1][0];
          }
          else effectChoice = arrList[0][0];
          let typeInfo, filterInfo, effectInfo, str;
          chooseLoop: while (true) {
            choiceList = choicesInfo.filter(i => i);
            let list = ["选项一", "选项二", "选项三"].slice(0, choiceList.length);
            const { result: typex } = await player.chooseControl(list, "cancel2")
              .set("choiceList", choiceList)
              .set("prompt", "论策：选择计策类型")
              .set("ai", () => _status.event.choice)
              .set("choice", (function () {
                let num = choiceList.indexOf(typeChoice);
                return list[num] || "cancel2";
              })());
            typeInfo = choiceList[list.indexOf(typex.control)];
            if (!typeInfo) break;
            while (true) {
              choiceList = Object.keys(targetFilters[choices[choicesInfo.indexOf(typeInfo)]]);
              list = ["选项一", "选项二", "选项三"].slice(0, choiceList.length);
              str = `${typeInfo}：当你`;
              const { result: filterx } = await player.chooseControl(list, "cancel2")
                .set("choiceList", choiceList)
                .set("prompt", `论策：选择计策条件<br><span style=font-size:16px>${str}。。。</span>`)
                .set("ai", () => _status.event.choice)
                .set("choice", (function () {
                  let num = choiceList.indexOf(filterChoice);
                  return list[num] || "cancel2";
                })());
              filterInfo = choiceList[list.indexOf(filterx.control)];
              if (!filterInfo) break;
              while (true) {
                choiceList = Object.keys(targetEffects[choices[choicesInfo.indexOf(typeInfo)]]);
                list = ["选项一", "选项二", "选项三"].slice(0, choiceList.length);
                str = `${typeInfo}：当你${filterInfo}`;
                if (filterInfo.endsWith("状态")) str += "时，你";
                else str += "后，你";
                const { result: effectx } = await player.chooseControl(list, "cancel2")
                  .set("choiceList", choiceList)
                  .set("prompt", `论策：选择计策效果<br><span style=font-size:16px>${str}。。。</span>`)
                  .set("ai", () => _status.event.choice)
                  .set("choice", (function () {
                    let num = choiceList.indexOf(effectChoice);
                    return list[num] || "cancel2";
                  })());
                effectInfo = choiceList[list.indexOf(effectx.control)];
                if (!effectInfo) break;
                else {
                  str += effectInfo;
                  break chooseLoop;
                };
              };
            };
          };
          if (![typeInfo, filterInfo, effectInfo].filter(i => i).length) event.result = { bool: false };
          else {
            const name = `jlsg_lunce_${player.playerid}_${choices[choicesInfo.indexOf(typeInfo)]}`,
              filter = targetFilters[choices[choicesInfo.indexOf(typeInfo)]][filterInfo],
              effect = targetEffects[choices[choicesInfo.indexOf(typeInfo)]][effectInfo];
            let skill = {
              jlsg_lunce_type: typeInfo,
              name: name,
              source: player,
              priority: 1919810 + 3 - choicesInfo.indexOf(typeInfo),
              charlotte: true,
              forced: true,
              popup: false,
              onremove: true,
              mark: true,
              intro: {
                str: str.slice(3),
                name: `${typeInfo}<br>来源：${get.seatTranslation(player)}`,
                markcount: () => "",
                mark: function (dialog, storage, player) {
                  dialog.addText(this.str);
                  if (storage) dialog.addSmall("计数：" + get.translation(storage));
                },
              },
              trigger: filter.trigger,
              filter: filter.filter,
              filterx: filter.filterx,
              async content(event, trigger, player) {
                if (lib.skill[event.name].filterx) {
                  if (!lib.skill[event.name].filterx(event, trigger, player)) return;
                }
                player.removeSkill(event.name);
                const source = lib.skill[event.name].source;
                game.log(player, "完成了", (source == player ? "自己" : source), "给予的", `#g计策(${lib.skill[event.name].jlsg_lunce_type})`);
                await lib.skill[event.name].contentx(event, trigger, player);
                await event.trigger("jlsg_lunce_achieve");
              },
              contentx: effect.content,
              gainSkill: effect.gainSkill,
              loseSkill: effect.loseSkill,
              ai: {
                effect: {
                  name: name,
                  targetEffect: effect.positive,
                  tag: filter.tag,
                  target: function (card, player, target) {
                    if (!this.tag?.self) return;
                    let [checkA1, checkB1] = this.tag.need;
                    let eff = 1;
                    if (this.tag.count) {
                      let storage = target.storage[this.name] ?? 0;
                      eff = (storage + 1) / this.tag.count;
                    }
                    if (checkA1 != "tag") {
                      if (get[checkA1](card) == checkB1) return [1, this.targetEffect(target) * eff];
                    }
                    else if (get.tag(card, checkB1)) return [1, this.targetEffect(target) * eff];
                  },
                  player: function (card, player, target) {
                    if (!this.tag?.target) return;
                    let [checkA, checkB] = this.tag.need,
                      checkA1, checkA2, checkB1, checkB2,
                      double;
                    if (checkA.includes("|")) {
                      double = true;
                      [checkA1, checkA2] = checkA.split("|");
                      [checkB1, checkB2] = checkB.split("|");
                    }
                    else {
                      checkA1 = checkA;
                      checkB1 = checkB;
                    }
                    let eff = 1;
                    if (this.tag.count) {
                      let storage = player.storage[this.name] ?? (checkB1 == "all" ? [] : 0);
                      if (typeof storage == "number") {
                        eff = (storage + 1) / this.tag.count;
                      }
                      else {
                        eff = (storage.length + 1) / this.tag.count;
                        let info = get[checkA1](card);
                        if (!storage.includes(info)) return [1, this.targetEffect(player) * eff];
                        return 1;
                      }
                    }
                    if (double) {
                      if (get[checkA1](card) == checkB1 && get[checkA2](card) == checkB2) return [1, this.targetEffect(player) * eff];
                    }
                    else {
                      if (checkA1 != "tag") {
                        if (get[checkA1](card) == checkB1) return [1, this.targetEffect(player) * eff];
                      }
                      else if (get.tag(card, checkB1)) return [1, this.targetEffect(player) * eff];
                    }
                  },
                },
              },
            };
            game.broadcastAll(function (skillName, skill, typeName) {
              lib.skill[skillName] = skill;
              lib.translate[skillName] = typeName;
            }, name, skill, typeInfo);
            event.result = {
              bool: true,
              targets: [target],
              cost_data: { typeInfo: typeInfo, name: name },
            };
          }
        },
        async content(event, trigger, player) {
          game.log(player, "给予了", event.targets[0], `#g计策(${event.cost_data.typeInfo})`)
          event.targets[0].addSkill(event.cost_data.name);
        },
        get targetFilters() {//条件
          const result = {
            top: {
              "使用不同花色的牌各一张": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  return lib.suit.includes(get.suit(event.card, player));
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= [];
                  let suit = get.suit(trigger.card, player);
                  if (suit != "none") player.markAuto(event.name, [suit]);
                  return player.storage[event.name].length >= 4;
                },
                easy: function (player) {
                  let suit = lib.suit,
                    list = [];
                  for (let i of suit) {
                    let card = get.autoViewAs({ name: "sha", suit: i }, "unsure");
                    list.add(get.suit(card, player));
                  };
                  if (list.length >= 4) return 8 / player.countCards("h") - (player.countCards("h") > 4 ? 2 : 0);
                  return 10 / player.countCards("h") - (player.countCards("h") > 4 ? 2 : 0);
                },
                tag: {
                  target: true,
                  count: 4,
                  need: ["suit", "all"],
                },
              },
              "使用不同类型的牌各一张": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  return get.type2(event.card, player);
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= [];
                  let type = get.type2(trigger.card, player);
                  if (type) player.markAuto(event.name, [type]);
                  return player.storage[event.name].length >= 3;
                },
                easy: function (player) {
                  let types = lib.inpile.slice().map(i => get.type2(i, player)).unique();
                  if (types.length == 3) return 8 / player.countCards("hs") - (player.countCards("h") > 4 ? 2 : 0);
                  return 10 / player.countCards("h") + (player.countCards("h") > 4 ? 2 : 0);
                },
                tag: {
                  target: true,
                  count: 3,
                  need: ["type2", "all"],
                },
              },
              "获得技能": {
                trigger: { player: "changeSkillsAfter" },
                filter: function (event, player) {
                  return event.addSkill?.length;
                },
                easy: function (player) {
                  let skills = player.getSkills(null, false, false)
                  for (let skill of skills) {
                    let info = get.info(skill);
                    if (info) continue;
                    if (info.gainSkill) return 2;
                    if (info.dutySkill || info.juexingji || info.xinadingji) return 8;
                  }
                  return 10;
                },
              },
              "失去技能": {
                trigger: { player: "changeSkillsAfter" },
                filter: function (event, player) {
                  return event.removeSkill?.length;
                },
                easy: function (player) {
                  let skills = player.getSkills(null, false, false)
                  for (let skill of skills) {
                    let info = get.info(skill);
                    if (info) continue;
                    if (info.loseSkill) return 2;
                    if (info.dutySkill || info.limited || info.juexingji || info.xinadingji) return 8;
                  }
                  return 10;
                },
              },
              "令一名角色进入濒死状态": {
                trigger: { source: "dying" },
                filter: function (event, player) {
                  return event.source == player;
                },
                easy: function (player) {
                  let targets = game.filterPlayer(cur => cur != player)
                    .sortBySeat(player)
                    .filter(cur => cur.isMinHp());
                  if (targets.length) {
                    for (let target of targets) {
                      for (let name of lib.inpile) {
                        let card = get.autoViewAs({ name: name }, "unsure");
                        if (
                          get.tag(card, "damage") &&
                          player.canUse(card, target) &&
                          get.effect(target, card, player, player) > 0
                        ) return target.hp * (target.countCards("h") + 0.5);
                      };
                    };
                  }
                  return 5;
                },
                tag: {
                  target: true,
                  need: ["tag", "damage"],
                },
              },
              "进入濒死状态": {
                trigger: { player: "dying" },
                filter: function (event, player) {
                  return true;
                },
                easy: function (player) {
                  return player.hp * (player.countCards("h") + 0.5);
                },
                tag: {
                  self: true,
                  need: ["tag", "damage"],
                },
              },
            },
            mid: {
              "使用两张黑桃牌": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  let suit = get.suit(event.card, player);
                  return suit == "spade";
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= 0;
                  player.storage[event.name]++;
                  return player.storage[event.name] >= 2;
                },
                easy: function (player) {
                  let num = player.countCards("hs", c => player.hasValueTarget(c));
                  if (get.suit({ name: "sha", suit: "spade" }, player) != "spade") return 6 / num;
                  return 5 / num;
                },
                tag: {
                  target: true,
                  count: 2,
                  need: ["suit", "spade"],
                },
              },
              "使用两张红桃牌": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  let suit = get.suit(event.card, player);
                  return suit == "heart";
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= 0;
                  player.storage[event.name]++;
                  return player.storage[event.name] >= 2;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  if (get.suit({ name: "sha", suit: "heart" }, player) != "heart") return 6 / num;
                  return 5 / num;
                },
                tag: {
                  target: true,
                  count: 2,
                  need: ["suit", "heart"],
                },
              },
              "使用杀造成2点伤害": {
                trigger: { source: "damageSource" },
                filter: function (event, player) {
                  return get.name(event.card, player) == "sha" && event.num > 0;
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= 0;
                  player.storage[event.name] += trigger.num;
                  return player.storage[event.name] >= 2;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  if (!player.hasValueTarget("sha")) return 4.8 / num;
                  return 3.8 / num;
                },
                tag: {
                  target: true,
                  count: 2,
                  need: ["name", "sha"],
                },
              },
              "使用锦囊牌造成2点伤害": {
                trigger: { source: "damageSource" },
                filter: function (event, player) {
                  return get.type2(event.card, player) == "trick" && event.num > 0;
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= 0;
                  player.storage[event.name] += trigger.num;
                  return player.storage[event.name] >= 2;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    if (get.type2(name, player) != "trick") continue;
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.tag(card, "damage") &&
                      player.hasValueTarget(card)
                    ) return 3.8 / num;
                  };
                  return 4.8 / num;
                },
                tag: {
                  target: true,
                  count: 2,
                  need: ["type2|tag", "trick|damage"],
                },
              },
              "造成2点属性伤害": {
                trigger: { source: "damageSource" },
                filter: function (event, player) {
                  return game.hasNature(event);

                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= 0;
                  player.storage[event.name] += trigger.num;
                  return player.storage[event.name] >= 2;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.tag(card, "natureDamage") &&
                      player.hasValueTarget(card)
                    ) return 3.5 / num;
                  };
                  return 4.5 / num;
                },
                tag: {
                  target: true,
                  count: 2,
                  need: ["tag", "natureDamage"],
                },
              },
              "回复2点体力": {
                trigger: { player: "recoverAfter" },
                filter: function (event, player) {
                  return event.num > 0;
                },
                filterx: function (event, trigger, player) {
                  player.storage[event.name] ??= 0;
                  player.storage[event.name] += trigger.num;
                  return player.storage[event.name] >= 2;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.tag(card, "recover") &&
                      player.isDamaged()
                    ) return 3 / num;
                  };
                  return 4 / num;
                },
                tag: {
                  slef: true,
                  count: 2,
                  need: ["tag", "recover"],
                },
              }
            },
            bottom: {
              "使用黑色牌": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  return get.color(event.card, player) == "black";
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.color(card, player) == "black" &&
                      player.hasValueTarget(card)
                    ) return 2 / num;
                  };
                  return 3 / num;
                },
                tag: {
                  target: true,
                  need: ["color", "black"],
                },
              },
              "使用红色牌": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  return get.color(event.card, player) == "red";
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.color(card, player) == "red" &&
                      player.hasValueTarget(card)
                    ) return 2 / num;
                  };
                  return 3 / num;
                },
                tag: {
                  target: true,
                  need: ["color", "red"],
                },
              },
              "使用杀": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  return get.name(event.card, player) == "sha";
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  let card = get.autoViewAs({ name: "sha" }, "unsure");
                  if (player.hasValueTarget(card)) return 2 / num;
                  return 3 / num;
                },
                tag: {
                  target: true,
                  need: ["name", "sha"],
                },
              },
              "使用锦囊牌": {
                trigger: { player: "useCardAfter" },
                filter: function (event, player) {
                  return get.type(event.card, null, player) == "trick";
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    if (get.type2(name, player) != "trick") continue;
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (player.hasValueTarget(card)) return 2 / num;
                  };
                  return 3 / num;
                },
                tag: {
                  target: true,
                  need: ["name", "sha"],
                },
              },
              "造成伤害": {
                trigger: { source: "damageSource" },
                filter: function (event, player) {
                  return event.num > 0;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.tag(card, "damage") &&
                      player.hasValueTarget(card)
                    ) return 2.5 / num;
                  };
                  return 3.5 / num;
                },
                tag: {
                  target: true,
                  need: ["tag", "damage"],
                },
              },
              "回复体力": {
                trigger: { player: "recoverAfter" },
                filter: function (event, player) {
                  return event.num > 0;
                },
                easy: function (player) {
                  let num = player.countCards("h", c => player.hasValueTarget(c));
                  for (let name of lib.inpile) {
                    let card = get.autoViewAs({ name: name }, "unsure");
                    if (
                      get.tag(card, "recover") &&
                      player.isDamaged()
                    ) return 2 / num;
                  };
                  return 3 / num;
                },
                tag: {
                  slef: true,
                  need: ["tag", "recover"],
                },
              },
            },
          };
          delete this.targetFilters;
          this.targetFilters = result;
          return result;
        },
        get targetEffects() {//效果
          const result = {
            top: {
              "获得一个同势力武将技能": {
                content: async function (event, trigger, player) {
                  let group = player.group;
                  if (!_status.characterlist) lib.skill.pingjian.initList();
                  let allList = _status.characterlist.slice(0).randomSort();
                  for (let name of allList) {
                    if (!lib.character[name]) continue;
                    if (lib.character[name][1] != group) continue;
                    if (!lib.character[name][3]) continue;
                    let skills = lib.character[name][3].filter(s => {
                      if (player.hasSkill(s)) return false;
                      let info = get.info(s);
                      if (!info || info.unique || info.charlotte) return false;
                      if (info.ai?.combo) return player.hasSkill(info.ai.combo);
                      if (info.zhuSkill) return player.isZhu2();
                      return true;
                    });
                    if (!skills.length) continue;
                    else {
                      await player.addSkills(skills.randomGet());
                      break;
                    }
                  };
                },
                positive: (player) => 2,
                gainSkill: true,
              },
              "获得1点体力上限并回复1点体力": {
                content: async function (event, trigger, player) {
                  await player.gainMaxHp(1);
                  await player.recover(1);
                },
                positive: (player) => 2,
              },
              "随机失去一个技能": {
                content: async function (event, trigger, player) {
                  let skills = player.getSkills(null, false, false).filter(s => {
                    let info = get.info(s);
                    if (!info || info.unique || info.charlotte) return false;
                    return true;
                  });
                  if (skills.length) await player.removeSkills(skills.randomGet());
                  else game.log(player, "没有技能了");
                },
                positive: function (player) {
                  let skills = player.getSkills(null, false, false).filter(s => {
                    let info = get.info(s);
                    if (!info || info.unique || info.charlotte) return false;
                    return true;
                  });
                  return -Math.min(2, skills.length);
                },
                loseSkill: true,
              },
              "弃置所有牌": {
                content: async function (event, trigger, player) {
                  if (player.countCards("he")) await player.chooseToDiscard("he", player.countCards("he"), true);
                },
                positive: function (player) {
                  return -3;
                },
              },
            },
            mid: {
              "摸牌数+1": {
                content: async function (event, trigger, player) {
                  if (!player.hasSkill("jlsg_lunce_effect")) player.addSkill("jlsg_lunce_effect");
                  player.storage.jlsg_lunce_effect.draw++;
                },
                positive: function (player) {
                  return 1;
                },
              },
              "使用杀次数上限+1": {
                content: async function (event, trigger, player) {
                  if (!player.hasSkill("jlsg_lunce_effect")) player.addSkill("jlsg_lunce_effect");
                  player.storage.jlsg_lunce_effect.sha++;
                },
                positive: function (player) {
                  return 1;
                },
              },
              "翻面": {
                content: async function (event, trigger, player) {
                  await player.turnOver()
                },
                positive: function (player) {
                  return -2;
                },
              },
              "减1点体力上限": {
                content: async function (event, trigger, player) {
                  await player.loseMaxHp(1);
                },
                positive: function (player) {
                  return -2;
                },
              },
            },
            bottom: {
              "摸两张牌": {
                content: async function (event, trigger, player) {
                  await player.draw(2);
                },
                positive: function (player) {
                  return 2;
                },
              },
              "回复1点体力": {
                content: async function (event, trigger, player) {
                  await player.recover(1);
                },
                positive: function (player) {
                  return 2;
                },
              },
              "随机弃置两张牌": {
                content: async function (event, trigger, player) {
                  if (player.countCards("he")) await player.discard(player.getCards("he").randomGets(2));
                },
                positive: function (player) {
                  return -2;
                },
              },
              "受到1点无来源火焰伤害": {
                content: async function (event, trigger, player) {
                  await player.damage(1, "fire", "noCard", "noSource");
                },
                positive: function (player) {
                  return -2;
                },
              },
            },
          };
          delete this.targetEffects;
          this.targetEffects = result;
          return result;
        },
        group: ["jlsg_lunce_achieved"],
        subSkill: {
          achieved: {
            sourceSkill: "jlsg_lunce",
            trigger: { global: "jlsg_lunce_achieve" },
            filter(event, player) {
              return event.name.includes(String(player.playerid));
            },
            forced: true,
            popup: false,
            async content(event, trigger, player) {
              await player.gainMaxHp(1);
              if (player.hasSkill("jlsg_qifeng")) {
                player.storage.jlsg_qifeng ??= [1, 0, 0];
                let info = trigger.name.split("_"),
                  list = ["mid", "bottom", "top"];
                let type = info[info.length - 1];
                let index = list.indexOf(type);
                game.log(player, "修改了", "#g【栖凤】")
                player.storage.jlsg_qifeng[index]++;
              }
            },
          },
          effect: {
            sourceSkill: "jlsg_lunce",
            forced: true,
            popup: false,
            charlotte: true,
            init(player) {
              player.storage.jlsg_lunce_effect = {
                draw: 0,
                sha: 0,
              };
            },
            mod: {
              cardUsable(card, player, num) {
                if (get.name(card, player) != "sha") return;
                return num + player.storage.jlsg_lunce_effect.sha;
              },
            },
            mark: true,
            marktext: "策",
            intro: {
              name: "策(效果)",
              content(content, player) {
                const { draw, sha } = player.storage.jlsg_lunce_effect;
                return `摸牌阶段，你多模${draw}张牌<br>你使用杀的次数上限+${sha}`;
              },
            },
            trigger: { player: "phaseDrawBegin2" },
            filter(event, player) {
              if (player.storage?.jlsg_lunce_effect?.draw < 1) return false
              return !event.numFixed;
            },
            async content(event, trigger, player) {
              trigger.num += player.storage?.jlsg_lunce_effect?.draw;
            },
          },
        },
        ai: {
          threaten: 1.1,
          expose: 0.25,
        },
      },
      jlsg_qianyuan: {
        audio: "ext:极略/audio/skill:2",
        init(player) {
          player.storage.jlsg_qianyuan = {
            damage: false,
            loseHp: false,
            loseMaxHp: false,
            discard: false,
            loseSkill: false,
            disableSkill: false,
            link: false,
            turnOver: false,
            record: {},
          };
        },
        mark: true,
        marktext: "渊",
        intro: {
          name: "潜渊",
          markcount(storage, player) {
            let num = Object.keys(storage).filter(i => {
              if (storage.record[i] === false) return false;
              return storage[i] === true;
            }).length;
            return num;
          },
          mark(dialog, storage, player) {
            const addNewRow = lib.element.dialog.addNewRow.bind(dialog);
            if (get.is.phoneLayout()) dialog.classList.add("fullheight");
            dialog.css({ width: "20%" });
            let list = Object.keys(storage),
              map = {
                "damage": "受到伤害",
                "loseHp": "失去体力",
                "loseMaxHp": "减体力上限",
                "discard": "弃置牌",
                "loseSkill": "失去技能",
                "disableSkill": "失效技能",
                "link": "横置",
                "turnOver": "翻面",
              },
              itemContainerCss = { height: "20px" };
            for (let i = 0; i < 8; i++) {
              let info = list[i];
              let list2 = [
                { item: map[info], ratio: .8, itemContainerCss },
                { item: (typeof storage.record[info] == "number" ? storage.record[info].toString() : (storage.record[info] === false ? "空" : "是")), ratio: .5, itemContainerCss },
              ];
              if (!storage[info]) list2[1].item = "未触发";
              addNewRow(...list2);
            };
          },
        },
        locked(skill, player) {
          return lib.config.extension_极略测试_jlsgsoul_sp_zhaoyun;
        },
        trigger: {
          player: [
            "damageBefore", "loseHpBefore", "loseMaxHpBefore", "loseBegin",
            "changeSkillsBefore", "linkBefore", "turnOverBefore",
          ],
        },
        filter(event, player) {
          let storage = player.storage.jlsg_qianyuan,
            key = lib.skill.jlsg_qianyuan.translate[event.name];
          let bool1 = lib.skill.jlsg_qianyuan.getInfo(event, player, key).bool,
            bool2 = true;
          if (storage[key] === true) {
            let used = player.getHistory("useSkill", evt => {
              if (evt.skill != "jlsg_qianyuan") return false;
              return evt.event.jlsg_qianyuan;
            });
            bool2 = used.length < game.countPlayer();
          }
          return storage && (key in storage) && bool1 && bool2;
        },
        prompt(event, player) {
          let str = "潜渊:是否将此次负面效果";
          let key = lib.skill.jlsg_qianyuan.translate[event.name];
          let translation = lib.skill.jlsg_qianyuan.getInfo(event, player, key).str;
          str += `<span class='yellowtext'>${translation}</span>`;
          if (player.storage.jlsg_qianyuan[key] === false) str += "无效？";
          else str += "转换？";
          return str;
        },
        prompt2(event, player) {
          let storage = player.storage.jlsg_qianyuan,
            key = lib.skill.jlsg_qianyuan.translate[event.name],
            num1 = 0, num2 = game.countPlayer();
          if (storage[key] === true) {
            num1 = player.getHistory("useSkill", evt => {
              if (evt.skill != "jlsg_qianyuan") return false;
              return evt.event.jlsg_qianyuan;
            }).length;
            return `<span class='center text'>已转化次数（${num1}/${num2}） </span>`;
          }
        },
        check(event, player) {//@.修改
          var key = lib.skill.jlsg_qianyuan.translate[event.name];
          if (player.storage.jlsg_qianyuan[key] === false) return true;
          var num1 = player.getHistory("useSkill", evt => {
            if (evt.skill != "jlsg_qianyuan") return false;
            return evt.event.jlsg_qianyuan;
          }).length;
          var num2 = game.countPlayer();
          var num3 = 0;
          if (key == "damage") num3 = 3;
          else if (key == "loseHp") num3 = 3;
          else if (key == "loseMaxHp") num3 = 5;
          else if (key == "discard") {
            let least = player.storage.jlsg_hualong_effect,
              card = lib.skill.jlsg_qianyuan.getInfo(event, player).num;
            if (least && least > player.countCards("h") - card) num3 = 2;
            else num3 = card + 1;
          }
          else if (key == "loseSkill") num3 = 6;
          else if (key == "disableSkill") num3 = 2.5;
          else if (key == "link") num3 = 1;
          else if (key == "turnOver") {
            if (player.isTurnedOver()) num3 = 0;
            else num3 = 4;
          }
          if (num2 - num1 > 2) {
            if (num3 >= 2) return true;
            return false;
          } else if (num2 - num1 > 0 && num2 - num1 <= 2) {
            if (num3 >= 3) return true;
            return false;
          }
          return true;
        },
        async content(event, trigger, player) {
          let key = lib.skill.jlsg_qianyuan.translate[trigger.name];
          const { num, nature, str } = lib.skill.jlsg_qianyuan.getInfo(trigger, player, key);
          if (trigger.name == "changeSkills") trigger.removeSkill = [];
          else if (trigger.name == "lose") trigger.cards = trigger.cards.filter(i => get.owner(i) != player);
          else trigger.cancel();
          if (player.storage.jlsg_qianyuan[key] === true) {
            event.getParent().jlsg_qianyuan = true;
            await lib.skill.jlsg_qianyuan.transfer(trigger, player, key, num, nature);
          } else {
            player.storage.jlsg_qianyuan[key] = true;
            game.log(player, "取消了", `#y${str}`);
            player.storage.jlsg_qianyuan.record[key] = num;
          }
          player.markSkill("jlsg_qianyuan");
        },
        get translate() {
          let result = {
            "damage": "damage",
            "loseHp": "loseHp",
            "loseMaxHp": "loseMaxHp",
            "lose": "discard",
            "loseAsync": "discard",
            "changeSkills": "loseSkill",
            "disableSkill": "disableSkill",
            "linkBefore": "link",
            "link": "link",
            "turnOverBefore": "turnOver",
            "turnOver": "turnOver",
          }
          delete this.translation;
          this.translation = result;
          return result;
        },
        transfer(event, player, name, number = 1, nature = null) {
          let next, key = [
            "damage", "loseHp", "loseMaxHp", "discard",
            "loseSkill", "disableSkill", "link", "turnOver"
          ].filter(i => {
            if (i == name) return false;
            if (i == "discard") return player.countDiscardableCards(player, "he");
            else if (i == "loseSkill") return player.getSkills(null, false, false).length;
            return true;
          }).randomGet();
          if (!key) return;
          game.log(
            player,
            "将",
            `#y${lib.skill.jlsg_qianyuan.getInfo(event, player, name, number).str}`,
            "改为",
            `#y${lib.skill.jlsg_qianyuan.getInfo(null, player, key, 1, nature).str}`
          );
          if (key == "damage") next = player.damage(1, nature);
          else if (key == "loseHp") next = player.loseHp(1);
          else if (key == "loseMaxHp") next = player.loseMaxHp(1);
          else if (key == "discard") next = player.discard(player.getDiscardableCards(player, "he").randomGets(1));
          else if (key == "loseSkill") next = player.removeSkills(player.getSkills(null, false, false).randomGets(1));
          else if (key == "disableSkill") next = player.storage.jlsg_qianyuan.disableSkill = true;
          else if (key == "link") next = player.link();
          else if (key == "turnOver") next = player.turnOver();
          return next;
        },
        getInfo(event, player, name, num, nature = null) {
          let key = name || lib.skill.jlsg_qianyuan.translate[event.name],
            bool = true,
            str = "";
          if (key == "discard") {
            if (event) {
              bool = event.type == "discard" && event.cards.some(i => get.owner(i) == player);
              if (!num) num = event.cards.filter(i => get.owner(i) == player).length;
            }
            str = `弃置${num}张牌`;
          } else if (key == "loseSkill") {
            if (event) {
              bool = event.removeSkill.length;
              if (!num) num = event.removeSkill.length;
            }
            str = `失去${num}个技能`;
          } else if (key == "link") {
            if (event) {
              bool = !player.isLinked();
              num = true;
            }
            str = `横置`;
          } else if (key == "turnOver") {
            if (event) {
              bool = !player.isTurnedOver();
              num = true;
            }
            str = `翻面`;
          } else {
            if (event) num = event.num;
            if (key == "damage") {
              if (event) nature = event.nature;
              str = `受到${num}点${nature ? get.translation(nature) : ""}伤害`;
            }
            else if (key == "loseHp") str = `失去${num}点体力`;
            else if (key == "loseMaxHp") str = `减少${num}点体力上限`;
            else if (key == "disableSkill") str = "失效技能"
          }
          return {
            bool: bool,
            num: num,
            nature: nature,
            str: str,
          }
        },
        ai: {//@.修改
          effect: {
            target(card, player, target) {
              if (card.name == "tiesuo" && target.storage.jlsg_qianyuan.link === false) return [0, 1];
              if ((card.name == "shunshou" || card.name == "guohe") && target.storage.jlsg_qianyuan.discard === false) return [0, 1];
              if (get.tag(card, 'damage') && target.storage.jlsg_qianyuan.damage === false && target.hasFriend()) return [0, 1];
            },
          }
        },
      },
      jlsg_hualong: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "phaseZhunbeiBegin" },
        filter(event, player) {
          if (!player.storage.jlsg_qianyuan) return false;
          let num = Object.keys(player.storage.jlsg_qianyuan).filter(i => {
            if (player.storage.jlsg_qianyuan.record[i] === false) return false;
            return player.storage.jlsg_qianyuan[i] === true;
          }).length;
          return num > 0;
        },
        async cost(event, trigger, player) {
          let list = Object.keys(player.storage.jlsg_qianyuan).filter(i => {
            if (player.storage.jlsg_qianyuan.record[i] === false) return false;
            return player.storage.jlsg_qianyuan[i] === true;
          });
          let str = `###化龙:选择一名其他角色，令其受到以下负面效果，然后将你的各项属性和最小手牌数改为${list.length + (player.storage.jlsg_hualong_effect ?? 0)}###`;
          for (let i of list) {
            if (player.storage.jlsg_qianyuan.record[i] !== false) {
              str += `${lib.skill.jlsg_qianyuan.getInfo(null, player, i, list.length).str}<br>`;
            }
          };
          event.result = await player.chooseTarget(str, (card, player, target) => target != player)
            .set("ai", target => -get.attitude(player, target))
            .forResult();
          event.result.cost_data = list;
        },
        async content(event, trigger, player) {
          const target = event.targets[0],
            list = event.cost_data;
          for (let key of list) {
            //全额返还
            //let number = player.storage.jlsg_qianyuan.record[key];
            if (player.storage.jlsg_qianyuan.record[key] === false) continue;
            let number = list.length;
            player.storage.jlsg_qianyuan.record[key] = false;
            player.markSkill("jlsg_qianyuan");
            if (!target.isIn()) continue;
            if (key == "damage") await target.damage(number);
            else if (key == "loseHp") await target.loseHp(number);
            else if (key == "loseMaxHp") await target.loseMaxHp(number);
            else if (key == "discard") await target.discard(target.getDiscardableCards(target, "he").randomGets(number));
            else if (key == "loseSkill") await target.removeSkills(target.getSkills(null, false, false).randomGets(number));
            else if (key == "disableSkill") await target.addTempSkill("baiban")
            else if (key == "link") await target.link();
            else if (key == "turnOver") await target.turnOver();
          };
          target.update();
          if (!player.storage.jlsg_hualong_effect) player.storage.jlsg_hualong_effect = 0;
          player.storage.jlsg_hualong_effect += list.length;
          player.maxHp = player.storage.jlsg_hualong_effect;
          player.hp = player.storage.jlsg_hualong_effect;
          player.update();
          await player.addSkill("jlsg_hualong_effect");
        },
        subSkill: {
          effect: {
            mark: true,
            marktext: "化",
            intro: {
              content(storage, player) {
                if (!storage) return "";
                else return `使用牌次数上限最低为${storage}<br>
                          当手牌数低于${storage}时，将手牌摸至${storage}<br>
                          攻击范围最低为${storage}`;
              },
            },
            mod: {
              cardUsable(card, player, num) {
                if (!player.storage.jlsg_hualong_effect) return;
                let usable = get.info(card).usable;
                if (typeof usable == "function") usable = num(card, player);
                usable = Math.max(num, usable);
                if (usable < player.storage.jlsg_hualong_effect) return player.storage.jlsg_hualong_effect;
              },
              attackRange: function (player, num) {
                if (!player.storage.jlsg_hualong_effect) return;
                if (num < player.storage.jlsg_hualong_effect) return player.storage.jlsg_hualong_effect;
              },
            },
            trigger: {
              player: ["loseAfter", "phaseDrawBegin1"],
              global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
            },
            filter(event, player, name) {
              if (!player.storage.jlsg_hualong_effect) return false;
              if (name == "phaseDrawBegin1") return !event.numFixed;
              let evt = event.getl(player);
              if (!evt || !evt.hs || evt.hs.length == 0 || player.countCards("h") >= player.storage.jlsg_hualong_effect) return false;
              evt = event.getParent("jlsg_hualong_effect");
              if (evt && evt.name == "jlsg_hualong_effect") return false;
              return player.countCards("h") < player.storage.jlsg_hualong_effect;
            },
            logv: false,
            popup: false,
            forced: true,
            charlotte: true,
            async content(event, trigger, player) {
              let num = player.storage.jlsg_hualong_effect - player.countCards("h");
              if (event.triggername == "phaseDrawBegin1") trigger.num = player.storage.jlsg_hualong_effect;
              else await player.draw(num);
            },
            sub: true,
            sourceSkill: "jlsg_hualong",
          },
        },
        ai: {
          combo: "jlsg_qianyuan",
        },
      },
      jlsg_zhuxing: {
        audio: "ext:极略/audio/skill:2",
        intro: {
          content: "expansion",
          markcount: "expansion",
        },
        onremove(player, skill) {
          for (let current of game.players) {
            var cards = current.getExpansions(skill);
            if (cards.length) current.loseToDiscardpile(cards);
          }
        },
        usable: 2,
        trigger: { global: "useCard" },
        filter(event) {
          const card = event.card;
          if (!["basic", "trick"].includes(get.type(card, null, false))) return false;
          if (lib.card[card.name]?.notarget || !lib.card[card.name]?.enable) return false;
          return get.is.ordinaryCard(card);
        },
        async cost(event, trigger, player) {
          event.result = await player.chooseTarget(`###逐星：是否将${get.translation(trigger.card)}置于一名角色的武将牌上称为“逐星”牌###然后你可以令此牌无效`)
            .set("ai", target => {
              return target.playerid == _status.event.choice;
            })
            .set("choice", (function () {
              const targets = game.filterPlayer().reduce((list, current) => {
                let effect = get.effect(current, trigger.card, player, player);
                if (current.countExpansions("jlsg_zhuxing") > 3) effect = -114514;
                if (!list[current.playerid]) list[current.playerid] = effect;
                return list;
              }, {});
              if (targets[player.playerid] <= 0) targets[player.playerid] = -get.effect(player, trigger.card, player, player) - 1;
              const num = Math.max(...Object.values(targets));
              return Object.keys(targets).find(i => targets[i] == num);
            })())
            .forResult();
        },
        async content(event, trigger, player) {
          const target = event.targets[0];
          await target.addToExpansion(trigger.cards, "gain2").set("gaintag", ["jlsg_zhuxing"]);
          const { result } = await player.chooseBool(`###逐星：是否令${get.translation(trigger.card)}无效？###${get.translation(trigger.targets)}`)
            .set("ai", (event, player) => {
              const trigger = event.getTrigger();
              const card = trigger.card,
                targets = trigger.targets;
              let eff = targets.reduce((num, target) => num + get.effect(target, card, trigger.player, player), 0);
              return eff <= 0;
            });
          if (result.bool) {
            game.log(player, "取消了", trigger.card);
            trigger.targets = [];
            trigger.all_excluded = true;
          }
        },
        group: "jlsg_zhuxing_begin",
        subSkill: {
          begin: {
            audio: "ext:极略/audio/skill:2",
            trigger: { global: "phaseBegin" },
            filter(event, player) {
              if (!event.player.countExpansions("jlsg_zhuxing")) return false;
              return event.player.getExpansions("jlsg_zhuxing").some(card => {
                return !lib.card[card.name]?.notarget && lib.card[card.name]?.enable;
              });
            },
            prompt(event, player) {
              return `逐星：是否对${get.translation(event.player)}依次使用“逐星”牌？`;
            },
            prompt2(event, player) {
              const cards = event.player.getExpansions("jlsg_zhuxing")
                .reverse()
                .filter(card => {
                  return !lib.card[card.name]?.notarget && lib.card[card.name]?.enable;
                });
              return `${get.translation(cards)}`;
            },
            check(event, player) {
              const cards = event.player.getExpansions("jlsg_zhuxing")
                .reverse()
                .filter(card => {
                  return !lib.card[card.name]?.notarget && lib.card[card.name]?.enable;
                });
              let eff = cards.reduce((num, card) => num + get.effect(event.player, get.autoViewAs(card, []), player, player), 0);
              return eff > 0;
            },
            logTarget: "player",
            async content(event, trigger, player) {
              const cards = trigger.player.getExpansions("jlsg_zhuxing").reverse();
              for (let card of cards) {
                if (!trigger.player.isIn()) break;
                if (lib.card[card.name]?.notarget || !lib.card[card.name]?.enable) continue;
                const [suit, number, name, nature] = get.cardInfo(card);
                const cardx = get.autoViewAs({ name, number, suit, nature }, []);
                await player.useCard(cardx, trigger.player, false);
              };
            },
          },
        },
      },
      jlsg_lingze: {
        audio: "ext:极略/audio/skill:2",
        init() {
          //来自活动武将
          game.broadcastAll(() => {
            window.get = get;
            if (!get.bolskillTips) {
              lib.init.sheet([
                '.bol-dibeijing {',
                'height: 100%;',
                'width: 100%;',
                'position: absolute;',
                'left: 0;',
                'top: 0;',
                'z-index: 8;',
                '}',
              ].join(''));
              lib.init.sheet([
                '.bol-skilltip {',
                'width: 20%;',
                'min-height: 5%;',
                'left: 50%;',
                ' top: 50%;',
                'font-size: 16px;',
                'color: #ccad76;',
                "font-family: 'shousha';",
                'background-color: rgba(36, 29, 19, 0.85);',
                'border: #523a24 3px solid;',
                'border-radius: 10px;',
                'position: absolute;',
                'display: block;',
                'padding: 8px;',
                'transform: translate(-50%, -50%);',
                'transition: none;',
                '}',
              ].join(''));
              get.bolskillTips = function (tipname, id) {
                var dibeijing = ui.create.div('.bol-dibeijing', document.body);
                dibeijing.style.zIndex = 16;
                var skilltip = ui.create.div('.bol-skilltip', dibeijing);
                skilltip.innerHTML = tipname;
                var herf = document.getElementById(id);
                if (herf) {
                  var left = herf.getBoundingClientRect().left;
                  if (/mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) left += herf.offsetParent.offsetLeft;
                  left += document.body.offsetWidth * 0.15;
                  skilltip.style.left = left + 'px';
                  skilltip.style.top = (herf.getBoundingClientRect().top + 30) + 'px';
                }
                dibeijing.listen(function (e) {
                  e.stopPropagation();
                  this.remove();
                })
              };
            }
            lib.init.sheet([
              '.card.jlsg_xuyuan-glow:before{',
              'opacity:0.2;',
              'box-shadow:rgba(0,0,0,0.2) 0 0 0 1px,rgb(255,109,12) 0 0 5px,rgb(255,0,0) 0 0 10px;',
              'background-color:red;',
              '-webkit-filter:blur(5px);',
              'filter:blur(5px);',
              '}'
            ].join(''));
          });
        },
        trigger: {
          global: ["phaseUseBegin", "damageBegin2"],
        },
        filter(event, player) {
          return event.player.countExpansions("jlsg_zhuxing");
        },
        async cost(event, trigger, player) {
          const { result } = await player.chooseButton([`灵泽：是否将其中一张“逐星”牌置于牌堆顶，令${get.translation(trigger.player)}进行许愿？`, trigger.player.getExpansions("jlsg_zhuxing")])
            .set("ai", button => {
              const card = button.link,
                player = _status.event.player,
                target = _status.event.getTrigger().player;
              if (get.attitude(player, target) < 0) return 0;
              else if (get.effect(target, card, player, player) <= 0) return 114514;
              else return 50 - get.effect(target, card, player, player);
            })
          if (result.bool) event.result = { bool: true, cards: result.links, targets: [trigger.player] };
          else event.result = { bool: false };
        },
        async content(event, trigger, player) {
          game.log(player, "将", event.cards, "置于了牌堆顶");
          trigger.player.$throw(event.cards, 1000);
          await game.cardsGotoPile(event.cards, "insert");
          if (!trigger.player.countExpansions("jlsg_zhuxing")) trigger.player.unmarkSkill("jlsg_zhuxing");
          game.addCardKnower([_status.pileTop], "everyone");
          const list = ["选项一", "选项二", "选项三", "cancel2"],
            typeList = [
              "征伐（额外获得一张随机类型的临时【杀】）",
              "宁息（额外获得一张临时【桃】）",
              "混沌（额外获得一张随机临时牌）",
            ];
          const { result: typeChoose } = await trigger.player.chooseControl(list)
            .set("choiceList", typeList)
            .set("prompt", "灵泽：请选择一个命运")
            .set("ai", () => {
              const player = _status.event.player;
              if (player.isDamaged()) return "选项二";
              return "选项一";
            });
          if (typeChoose.control != "cancel2") {
            let name, type;
            switch (typeChoose.control) {
              case "选项一": name = "sha"; type = "damage"; break;
              case "选项二": name = "tao"; type = "recover"; break;
              case "选项三": name = null; type = "chaos"; break;
            };
            const copy = lib.skill.jlsg_lingze.getEffects[type].randomGets(3),
              card = lib.skill.jlsg_lingze.createTempCard(name);
            if (card) await trigger.player.gain(card, "draw");
            const effectsList = [[null, {}], [null, {}], [null, {}]];
            for (let i = 0; i < copy.length; i++) {
              effectsList[i][0] = copy[i][0];
              effectsList[i][1].content = copy[i][1].content;
              effectsList[i][1].effect = copy[i][1].effect;
            };
            //手动添加“随机技能”选项
            if (!copy.some(i => i[0] == "随机两个技能") && Math.random() < 0.5) {
              const skills = lib.skill.jlsg_lingze.skills(trigger.player)
                .filter(skill => {
                  return lib.skill.jlsg_lingze.typeSkills["chaos"].some(i => i == lib.translate[skill]);
                });
              if (skills.length) {
                effectsList[2] = ["随机两个技能", {
                  content: async function (event, trigger, player) {
                    await player.addSkills(event.gainSkills);
                  },
                  effect() { return 4; },
                }];
              }
            }
            for (let i = 0; i < effectsList.length; i++) {
              const [str, { content }] = effectsList[i];
              const next = game.createEvent("jlsg_xuyuan_effect", false, event)
                .set("player", trigger.player)
                .set("jlsg_xuyuan_type", type);
              event.next.remove(next);
              next.setContent(content);
              if (str.includes("伤害")) {
                let nature = lib.card.sha.nature.concat([null]).randomGet();
                next.set("nature", nature)
                if (nature !== null) {
                  let list = str.split("伤害");
                  effectsList[i][0] = list[0] + get.translation(nature) + "伤害" + list[1];
                }
              }
              else if ((str.startsWith("获得") || str.startsWith("弃置")) && str.includes("|")) {
                let [str1, str3] = str.split("(");
                let [cardList, str2] = str3.split(")");
                let cardName = cardList.split("|").randomGet();
                next.set("cardName", cardName)
                effectsList[i][0] = str1 + get.translation(cardName) + str2;
              }
              else if (str == "随机两个技能") {
                let gains = lib.skill.jlsg_lingze.skills(trigger.player)
                  .filter(skill => lib.skill.jlsg_lingze.typeSkills[type].some(i => i == lib.translate[skill]))
                  .randomGets(2);
                next.set("gainSkills", gains);
                let list = gains.map(i => `【${get.skillTranslation(i, trigger.player)}】`);
                effectsList[i][0] = `获得${list}`;
              }
              effectsList[i][1].content = next;
            };

            const translate = function (str1, str2) {//来自活动武将
              const id = Math.random().toString(36).slice(-8);
              return "<a id='" + id + "' style='color:unset' href=\"javascript:get.bolskillTips('" + str2 + "','" + id + "');\">" + str1 + "※</a>";
            };

            const effectPrompt = effectsList.map((i, v) => {
              let str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项' + get.cnNumber(v + 1, true) + "：" + i[0] + "</div>";
              if (i[1].content?.gainSkills) {
                const gainSkills = i[1].content.gainSkills;
                str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项' +
                  get.cnNumber(v + 1, true) +
                  "：获得" +
                  translate(get.translation(gainSkills[0]), lib.translate[gainSkills[0] + "_info"]) +
                  "和" +
                  translate(get.translation(gainSkills[1]), lib.translate[gainSkills[1] + "_info"]) +
                  "</div>";
                /*for (let skill of gainSkills) {
                  str += '<div class="popup pointerdiv" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【' +
                    get.translation(skill) +
                    "】</div><div>" +
                    lib.translate[skill + "_info"] +
                    "</div></div>";
                };*/
              }
              return str;
            });
            const { result: effectChoose } = await trigger.player.chooseControl(list)
              .set("dialog", ["灵泽：请选择一个效果", [effectPrompt, "textbutton"]])
              .set("ai", () => {
                if (_status.event.choice) return _status.event.choice;
                return ["选项一", "选项二", "选项三"].randomGet();
              })
              .set("choice", (function () {
                let aiList = effectsList.map(i => {
                  let arr = i[1].content.nature || i[1].content.cardName;
                  return i[1].effect(player, arr);
                });
                let max = Math.max(...aiList);
                return list[aiList.indexOf(max)];
              })());
            if (effectChoose.control != "cancel2") {
              game.log(trigger.player, "获得的效果为", `#r${effectsList[list.indexOf(effectChoose.control)][0]}`);
              const next = effectsList[list.indexOf(effectChoose.control)][1].content;
              event.next.add(next);
              await next;
            }
          }
        },
        get getEffects() {
          const result = {
            damage: [
              ["令一名角色交给你四张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色交给你四张牌`, true)
                    .set("filterTarget", (card, player, target) => target.countGainableCards(player, "he"))
                    .set("num", 4)
                    .set("ai", target => {
                      const player = _status.event.player,
                        num = _status.event.num
                      return get.effect(target, { name: "shunshou_copy2" }, player, player) * Math.min(num, target.countGainableCards(player, "he"));
                    });
                  if (result.bool) {
                    await result.targets[0].chooseToGive(player, 4, true, "he");
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0)) return 4;
                  return 0;
                },
              }],
              ["令一名角色弃置六张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色弃置六张牌`, true)
                    .set("filterTarget", (card, player, target) => target.countDiscardableCards(target, "he"))
                    .set("num", 6)
                    .set("ai", target => {
                      const player = _status.event.player,
                        num = _status.event.num
                      return get.effect(target, { name: "guohe_copy2" }, player, player) * Math.min(num, target.countGainableCards(player, "he"));
                    });
                  if (result.bool) {
                    await result.targets[0].chooseToDiscard(6, true, "he");
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.effect(current, { name: "guohe_copy2" }, player, player) > 0)) return 4;
                  return 0;
                },
              }],
              ["令至多两名角色各交给你两张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各交给你两张牌`, true)
                    .set("filterTarget", (card, player, target) => target.countGainableCards(player, "he"))
                    .set("num", 2)
                    .set("ai", target => {
                      const player = _status.event.player,
                        num = _status.event.num
                      return get.effect(target, { name: "shunshou_copy2" }, player, player) * Math.min(num, target.countGainableCards(player, "he"));
                    });
                  if (result.bool) {
                    result.targets.sortBySeat(player);
                    for (const target of result.targets) {
                      await target.chooseToGive(player, 2, true, "he");
                    }
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0)) return 4;
                  return 0;
                },
              }],
              ["令至多两名角色各弃置四张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各弃置四张牌`, true)
                    .set("filterTarget", (card, player, target) => target.countDiscardableCards(player, "he"))
                    .set("num", 4)
                    .set("ai", target => {
                      const player = _status.event.player,
                        num = _status.event.num
                      return get.effect(target, { name: "guohe_copy2" }, player, player) * Math.min(num, target.getDiscardableCards(player, "he"));
                    });
                  if (result.bool) {
                    result.targets.sortBySeat(player);
                    for (const target of result.targets) {
                      const done = await target.chooseToDiscard(4, true, "he");
                    };
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.effect(current, { name: "guohe_copy2" }, player, player) > 0)) return 4;
                  return 0;
                },
              }],
              ["令所有其他角色各交给你一张牌", {
                content: async function (event, trigger, player) {
                  const targets = game.filterPlayer().remove(player).sortBySeat(player);
                  for (const target of targets) {
                    await target.chooseToGive(player, 1, true, "he");
                  };
                },
                effect(player) {
                  return game.countPlayer(current => current != player && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0)
                },
              }],
              ["令所有其他角色各弃置两张牌", {
                content: async function (event, trigger, player) {
                  const targets = game.filterPlayer().remove(player).sortBySeat(player);
                  for (const target of targets) {
                    const done = await target.chooseToDiscard(2, true, "he");
                  }
                },
                effect(player) {
                  const targets = game.filterPlayer().sortBySeat(player);
                  return targets.reduce((eff, target) => eff + get.effect(target, { name: "guohe_copy2" }, player, player), 0) / targets.length;
                },
              }],
              ["令一名角色减少2点体力上限", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色减少2点体力上限`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return 5 - get.attitude(player, target);
                    });
                  if (result.bool) {
                    await result.targets[0].loseMaxHp(2);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0)) return 2;
                  return 0;
                },
              }],
              ["令一名角色失去2点体力", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色失去2点体力`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.effect(target, { name: "losehp" }, player, player);
                    });
                  if (result.bool) {
                    await result.targets[0].loseHp(2);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.effect(current, { name: "losehp" }, player, player) > 0)) return 2;
                  return 0;
                },
              }],
              ["对一名角色造成2点伤害", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`对一名角色造成2点${event.nature ? get.translation(event.nature) : ""}伤害`, true)
                    .set("nature", event.nature)
                    .set("ai", target => {
                      const player = _status.event.player,
                        nature = _status.event.nature;
                      return get.damageEffect(target, player, player, nature);
                    });
                  if (result.bool) {
                    await result.targets[0].damage(2, event.nature, player);
                  }
                },
                effect(player, nature) {
                  if (game.hasPlayer(current => current != player && get.damageEffect(current, player, player, nature) > 0)) return 2;
                  return 0;
                },
              }],
              ["令一名角色随机失去两个技能", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色失去两个技能`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      if (!target.getSkills(null, false, false).length) return 0;
                      return 10 - get.attitude(player, target);
                    });
                  if (result.bool) {
                    const target = result.targets[0];
                    let skills = target.getSkills(null, false, false).filter(i => {
                      if (!lib.translate[i] || !lib.translate[i + "_info"]) return false;
                      let info = get.info(i);
                      return info && !info.charlotte;
                    });
                    if (skills.length) await target.removeSkills(skills.randomGets(2));
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0 && current.getSkills(null, false, false).length)) return 2;
                  return 0;
                },
              }],
              ["令至多两名角色各减少1点体力上限", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各减少1点体力上限`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return 5 - get.attitude(player, target);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) {
                      await target.loseMaxHp();
                    }
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0)) return 2;
                  return 0
                },
              }],
              ["令至多两名角色各失去1点体力", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各失去1点体力`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.effect(target, { name: "losehp" }, player, player);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) {
                      await target.loseHp();
                    }
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.effect(current, { name: "losehp" }, player, player) > 0)) return 2;
                  return 0;
                },
              }],
              ["对至多两名角色各造成1点伤害", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `对至多两名角色各造成1点${event.nature ? get.translation(event.nature) : ""}伤害`, true)
                    .set("nature", event.nature)
                    .set("ai", target => {
                      const player = _status.event.player,
                        nature = _status.event.nature;
                      return get.damageEffect(target, player, player, nature);
                    });
                  if (result.bool) {
                    await result.targets[0].damage(1, event.nature, player);
                  }
                },
                effect(player, nature) {
                  if (game.hasPlayer(current => current != player && get.damageEffect(current, player, player, nature) > 0)) return 2;
                  return 0;
                },
              }],
              ["令至多两名角色各随机失去一个技能", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各随机失去一个技能`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      if (!target.getSkills(null, false, false).length) return 0;
                      return 10 - get.attitude(player, target);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) {
                      let skills = target.getSkills(null, false, false).filter(i => {
                        if (!lib.translate[i] || !lib.translate[i + "_info"]) return false;
                        let info = get.info(i);
                        return info && !info.charlotte;
                      });
                      if (skills.length) await target.removeSkills(skills.randomGet());
                    }
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => current != player && get.attitude(player, current) < 0 && current.getSkills(null, false, false).length)) return 2;
                  return 0;
                },
              }],
              ["令一名角色翻面", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色翻面`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      const att = get.attitude(player, target);
                      if (target.hasSkillTag("noturn")) return 0;
                      if (target.isTurnedOver()) return att;
                      return 5 - att;
                    });
                  if (result.bool) {
                    await result.targets[0].turnOver();
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => {
                    const att = get.attitude(player, current);
                    if (current.hasSkillTag("noturn")) return 0;
                    if (current.isTurnedOver()) return att > 0;
                  })) return 2;
                  return 0;
                },
              }],
              ["令任意名角色横置", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, game.countPlayer()], `令任意名角色横置`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.effect(target, { name: "tiesuo" }, player, player);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) await target.link();
                  };
                },
                effect(player) {
                  if (game.hasPlayer(current => get.effect(current, { name: "shunshou_copy" }, player, player) > 0)) return game.countPlayer();
                },
              }],

              ["获得三张【(nanman|wanjian)】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 3; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
                    if (card) cards.add(card);
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  if (!lib.card[cardName]) return 0;
                  const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
                  return player.getUseValue(card);
                },
              }],
              ["获得六张【过河拆桥】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("guohe");
                    if (card) cards.add(card);
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  if (!lib.card["guohe"]) return 0;
                  const card = get.autoViewAs({ name: "guohe", isCard: true }, "unsure");
                  return player.getUseValue(card);
                },
              }],
              ["获得四张【顺手牵羊】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("shunshou");
                    if (card) cards.add(card);
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  if (!lib.card["shunshou"]) return 0;
                  const card = get.autoViewAs({ name: "shunshou", isCard: true }, "unsure");
                  return player.getUseValue(card);
                },
              }],
              ["获得两张【火攻】、两张【铁索连环】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 2; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("huogong");
                    if (card) cards.add(card);
                  }
                  for (let i = 0; i < 2; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("tiesuo");
                    if (card) cards.add(card);
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "huogong", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "tiesuo", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
              ["获得一张【火攻】、四张花色不同的随机牌", {
                content: async function (event, trigger, player) {
                  const cards = [lib.skill.jlsg_lingze.createTempCard("huogong")];
                  for (let suit of lib.suit) {
                    let card = lib.skill.jlsg_lingze.createTempCard(null, suit);
                    if (card) cards.add(card);
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card = get.autoViewAs({ name: "huogong", isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
              ["获得六张随机属性【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card = get.autoViewAs({ name: "huogong", isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
              ["获得一张【酒】、两张【铁索连环】、一张火【杀】、一张雷【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                    lib.skill.jlsg_lingze.createTempCard("tiesuo"),
                    lib.skill.jlsg_lingze.createTempCard("tiesuo"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, "fire"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, "thunder"),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card = get.autoViewAs({ name: "sha", isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
              ["获得两张【决斗】、两张【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("juedou"),
                    lib.skill.jlsg_lingze.createTempCard("juedou"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, null),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, null),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "juedou", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
              ["获得一张【乐不思蜀】、一张【兵粮寸断】、一张【(shandian|jlsgqs_shuiyanqijun)】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("lebu"),
                    lib.skill.jlsg_lingze.createTempCard("bingliang"),
                    lib.skill.jlsg_lingze.createTempCard(event.cardName),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  if (!lib.card[cardName]) return;
                  const card1 = get.autoViewAs({ name: "lebu", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "bingliang", isCard: true }, "unsure"),
                    card3 = get.autoViewAs({ name: cardName, isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
                },
              }],
              ["获得一张【南蛮入侵】、一张【万箭齐发】、一张【决斗】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("nanman"),
                    lib.skill.jlsg_lingze.createTempCard("wanjian"),
                    lib.skill.jlsg_lingze.createTempCard("juedou"),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "nanman", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "wanjian", isCard: true }, "unsure"),
                    card3 = get.autoViewAs({ name: "juedou", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
                },
              }],
              ["获得两张【酒】、三张【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, null),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, null),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, null),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "jiu", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure")
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
              ["获得一张【过河拆桥】、一张【顺手牵羊】、一张【决斗】、一张【酒】、一张【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("guohe"),
                    lib.skill.jlsg_lingze.createTempCard("shunshou"),
                    lib.skill.jlsg_lingze.createTempCard("juedou"),
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                    lib.skill.jlsg_lingze.createTempCard("sha"),
                  ].flat();
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "nanman", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "wanjian", isCard: true }, "unsure"),
                    card3 = get.autoViewAs({ name: "juedou", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
                },
              }],
              ["获得一张【诸葛连弩】、一张进攻马、三张随机属性【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("zhuge"),
                  ];
                  for (let i = 0; i < 3; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
                    if (card) cards.add(card).flat();
                  };
                  let attack = lib.inpile.filter(name => {
                    if (get.type(name, null, false) != "equip") return false;
                    const card = lib.card[name];
                    return card.distance?.globalFrom;
                  }).randomGet();
                  cards.add(lib.skill.jlsg_lingze.createTempCard(attack)).flat();
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "zhuge", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
              ["获得一张【贯石斧】、一张【酒】、两张随机属性【杀】、两张随机牌", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("guanshi"),
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                  ];
                  for (let i = 0; i < 2; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
                    if (card) cards.add(card).flat();
                  };
                  for (let i = 0; i < 2; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(null);
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "guanshi", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
              ["获得一张【青龙偃月刀】、四张随机属性【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("qinglong"),
                  ];
                  for (let i = 0; i < 4; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "qinglong", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
              ["获得一张【丈八蛇矛】、四张随机牌", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("zhangba"),
                  ];
                  for (let i = 0; i < 4; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(null);
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card = get.autoViewAs({ name: "zhangba", isCard: true }, "unsure");
                  return player.getUseValue(card);
                },
              }],
              ["获得一张【(cixiong|fangtian|qinggang|qilin|zhuque)】、一张【酒】、两张随机属性【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard(event.cardName),
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                  ];
                  for (let i = 0; i < 2; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet());
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  const card1 = get.autoViewAs({ name: cardName, isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "jiu", isCard: true }, "unsure"),
                    card3 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3);
                },
              }],
              ["获得一张【古锭刀】、一张【过河拆桥】、一张【酒】、一张随机属性【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("guding"),
                    lib.skill.jlsg_lingze.createTempCard("guohe"),
                    lib.skill.jlsg_lingze.createTempCard("jiu"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, lib.card.sha.nature.randomGet()),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "guding", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "guohe", isCard: true }, "unsure"),
                    card3 = get.autoViewAs({ name: "jiu", isCard: true }, "unsure"),
                    card4 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2) + player.getUseValue(card3) + player.getUseValue(card4);
                },
              }],
              ["获得一张【寒冰剑】、一张【杀】、一张火【杀】、一张雷【杀】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("hanbing"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, null),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, "fire"),
                    lib.skill.jlsg_lingze.createTempCard("sha", null, "thunder"),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "hanbing", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "sha", isCard: true }, "unsure");
                  return player.getUseValue(card1) + player.getUseValue(card2);
                },
              }],
            ],
            recover: [
              ["令一名角色摸六张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色摸六张牌`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.effect(target, { name: "draw" }, player, player);
                    });
                  if (result.bool) {
                    await result.targets[0].draw(6);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.effect(current, { name: "draw" }, player, player) > 0)) return 4;
                  return 0;
                },
              }],
              ["令至多两名角色各摸四张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各摸四张牌`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.effect(target, { name: "draw" }, player, player);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) await target.draw(4);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.effect(current, { name: "draw" }, player, player) > 0)) return 3;
                  return 0;
                },
              }],
              ["令所有角色各摸两张牌", {
                content: async function (event, trigger, player) {
                  const targets = game.filterPlayer().sortBySeat(player);
                  for (const target of targets) await target.draw(2);
                },
                effect(player) {
                  if (game.hasPlayer(current => get.effect(current, { name: "draw" }, player, player) > 0)) return 2;
                  return 0;
                },
              }],
              ["令一名角色回复3点体力", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一两名角色回复3点体力`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.recoverEffect(target, player, player);
                    });
                  if (result.bool) {
                    await result.targets[0].recover(3);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.recoverEffect(current, player, player) > 0)) return 4;
                  return 0;
                },
              }],
              ["令一名角色增加2点体力上限", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget(`令一名角色增加2点体力上限`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.attitude(player, target);
                    });
                  if (result.bool) {
                    await result.targets[0].gainMaxHp(2);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.attitude(player, current) > 0)) return 2;
                  return 0;
                },
              }],
              ["令至多两名角色各回复2点体力", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各回复2点体力`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.recoverEffect(target, player, player);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) await target.recover(2);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.recoverEffect(current, player, player) > 0)) return 3;
                  return 0;
                },
              }],
              ["令至多两名角色各增加1点体力上限", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, 2], `令至多两名角色各增加1点体力上限`, true)
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.attitude(player, target);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) await target.gainMaxHp(1);
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.attitude(player, current) > 0)) return 3;
                  return 0;
                },
              }],
              ["令所有角色各回复1点体力", {
                content: async function (event, trigger, player) {
                  const targets = game.filterPlayer().sortBySeat(player);
                  for (const target of targets) await target.recover(1);
                },
                effect(player) {
                  if (game.hasPlayer(current => get.recoverEffect(current, player, player) > 0)) return 1;
                  return 0;
                },
              }],
              ["令所有角色各增加1点体力上限", {
                content: async function (event, trigger, player) {
                  const targets = game.filterPlayer().sortBySeat(player);
                  for (const target of targets) await target.gainMaxHp(1);
                },
                effect(player) {
                  if (game.hasPlayer(current => get.attitude(player, current) > 0)) return 1;
                  return 0;
                },
              }],
              ["使用【杀】次数上限+4", {
                content: async function (event, trigger, player) {
                  if (!player.hasSkill("jlsg_lingze_effect")) player.addSkill("jlsg_lingze_effect");
                  await game.delayx();
                  player.storage.jlsg_lingze_effect.sha += 4;
                },
                effect(player) {
                  if (player.getUseValue("sha") > 0) return 2;
                  return 0;
                },
              }],
              ["手牌上限+4", {
                content: async function (event, trigger, player) {
                  if (!player.hasSkill("jlsg_lingze_effect")) player.addSkill("jlsg_lingze_effect");
                  await game.delayx();
                  player.storage.jlsg_lingze_effect.maxHandcard += 4;
                },
                effect() {
                  return 2;
                },
              }],
              ["摸牌阶段额定摸牌数+2", {
                content: async function (event, trigger, player) {
                  if (!player.hasSkill("jlsg_lingze_effect")) player.addSkill("jlsg_lingze_effect");
                  await game.delayx();
                  player.storage.jlsg_lingze_effect.draw += 2;
                },
                effect(player) {
                  if (get.effect(player, { name: "draw" }, player, player) > 0) return 2;
                  return 0;
                },
              }],
              ["获得两张【闪】、两张【桃】", {
                content: async function (event, trigger, player) {
                  const cards = [
                    lib.skill.jlsg_lingze.createTempCard("shan"),
                    lib.skill.jlsg_lingze.createTempCard("shan"),
                    lib.skill.jlsg_lingze.createTempCard("tao"),
                    lib.skill.jlsg_lingze.createTempCard("tao"),
                  ];
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card1 = get.autoViewAs({ name: "shan", isCard: true }, "unsure"),
                    card2 = get.autoViewAs({ name: "tao", isCard: true }, "unsure");
                  return get.value(card1, player) + player.getUseValue(card2);
                },
              }],
              ["获得四张【(tao|taoyuan|wugu|jlsgqs_qingmeizhujiu)】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 4; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
              ["获得六张【(shan|wuxie)】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure")
                  return get.value(card, player);
                },
              }],
              ["获得三张【(wuzhong|jlsgqs_wangmeizhike)】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 3; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(event.cardName);
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  if (!lib.card[cardName]) return;
                  const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
              ["获得三张【白银狮子】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 3; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard("baiyin");
                    if (card) cards.add(card).flat();
                  };
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  const card = get.autoViewAs({ name: "baiyin", isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
              ["获得一张防御马、一张【(bagua|renwang|tengjia|baiyin)】", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let attack = lib.inpile.filter(name => {
                    if (get.type(name, null, false) != "equip") return false;
                    const card = lib.card[name];
                    return card.distance?.globalTo;
                  }).randomGet();
                  cards.add(lib.skill.jlsg_lingze.createTempCard(attack)).flat();
                  cards.add(lib.skill.jlsg_lingze.createTempCard(event.cardName)).flat();
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player, cardName) {
                  const card = get.autoViewAs({ name: cardName, isCard: true }, "unsure")
                  return player.getUseValue(card);
                },
              }],
            ],
            chaos: [
              ["选择任意名角色，令这些角色各进行一次【闪电】判定", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, game.countPlayer()], `令任意名角色各进行一次【闪电】判定`, true)
                    .set("ai", target => {
                      const player = _status.event.player,
                        card = _status.pileTop;
                      let damage = get.damageEffect(target, undefined, player, "thunder"),
                        result = {
                          card: card,
                          name: card.name,
                          number: get.number(card),
                          suit: get.suit(card),
                          color: get.color(card),
                        };
                      if (!ui.selected.targets.length) {
                        if (lib.card.shandian.judge(card) < 0) result.bool = false;
                        else if (lib.card.shandian.judge(card) > 0) result.bool = true;
                        else result.bool = null;
                        _status.event.cardname = "shandian";
                        game.checkMod(target, result, "judge", target);
                        delete _status.event.cardname;
                        if (result.bool) return damage;
                      }
                      return damage;
                    })
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    for (const target of targets) await target.executeDelayCardEffect("shandian");
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.damageEffect(current, player, player, "thunder") > 0)) return 3;
                },
              }],
              ["连续进行六次判定，结果为：红桃，增加1点体力上限并回复1点体力；黑桃，失去1点体力；梅花，随机弃置一点手牌；方片，摸四张牌", {
                content: async function (event, trigger, player) {
                  for (let i = 0; i < 6; i++) {
                    await player.judge(function (result) {
                      if (get.color(result) == "black") return 0;
                      return 1;
                    })
                      .set("judgestr", "许愿")
                      .set("callback", async function (event, trigger, player) {
                        const suit = event.judgeResult.suit;
                        switch (suit) {
                          case "heart":
                            await player.gainMaxHp(1);
                            await player.recover(1);
                            break;
                          case "spade":
                            await player.loseHp(1);
                            break;
                          case "club":
                            if (player.countDiscardableCards(player, "h")) await player.randomDiscard(1, "h");
                            break;
                          case "diamond":
                            await player.draw(4);
                            break;
                        };
                      })
                      .set("judge2", function (result) {
                        return result.bool ? true : false;
                      });
                  }
                },
                effect(player) {
                  return 1;
                },
              }],
              ["连续进行六次判定，结果为：红桃，摸牌数+1；黑桃，失去1点体力；梅花，手牌上限+1；方片，使用【杀】次数上限+1", {
                content: async function (event, trigger, player) {
                  for (let i = 0; i < 6; i++) {
                    await player.judge(function (result) {
                      if (get.suit(result) == "spade") return 0;
                      return 1;
                    })
                      .set("judgestr", "许愿")
                      .set("callback", async function (event, trigger, player) {
                        const suit = event.judgeResult.suit;
                        switch (suit) {
                          case "heart":
                            if (!player.hasSkill("jlsg_lingze_effect")) player.addSkill("jlsg_lingze_effect");
                            player.storage.jlsg_lingze_effect.draw++;
                            break;
                          case "spade":
                            await player.loseHp(1);
                            break;
                          case "club":
                            if (!player.hasSkill("jlsg_lingze_effect")) player.addSkill("jlsg_lingze_effect");
                            player.storage.jlsg_lingze_effect.maxHandcard++;
                            break;
                          case "diamond":
                            if (!player.hasSkill("jlsg_lingze_effect")) player.addSkill("jlsg_lingze_effect");
                            player.storage.jlsg_lingze_effect.sha++;
                            break;
                        };
                      })
                      .set("judge2", function (result) {
                        return result.bool ? true : false;
                      });
                  }
                },
                effect(player) {
                  return 1.5;
                },
              }],
              ["弃置所有手牌，获得两倍的基本牌、锦囊牌或装备", {
                content: async function (event, trigger, player) {
                  const hs = player.getDiscardableCards(player, "h");
                  if (hs.length) {
                    await player.discard(hs);
                    const type = ["basic", "trick", "equip"].randomGet(),
                      cards = [];
                    let cardList = lib.inpile.filter(name => {
                      if (get.type2(name, player) != type) return false;
                      return true;
                    });
                    for (let i = 0; i < hs.length * 2; i++) {
                      let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet())
                      if (card) cards.add(card).flat();
                    };
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  }
                },
                effect(player) {
                  let num = player.countDiscardableCards(player, "h")
                  if (num) return num * 2;
                  return 0;
                },
              }],
              ["选择失去任意个技能，然后获得三倍数量的技能", {
                content: async function (event, trigger, player) {
                  const skills = player.getSkills(null, false, false)
                    .filter(i => {
                      if (!lib.translate[i] || !lib.translate[i + "_info"]) return false;
                      let info = get.info(i);
                      return info && !info.charlotte;
                    })
                  if (skills.length) {
                    const buttons = skills.map(i => [
                      i,
                      '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' +
                      get.translation(i) +
                      "】</div><div>" +
                      lib.translate[i + "_info"] +
                      "</div></div>"
                    ]);
                    const { result } = await player.chooseButton([1, skills.length], true, ["选择要失去的技能（一次性至多获得50个技能）", [buttons, "textbutton"]])
                      .set("ai", button => {
                        if (get.info(button.link).ai?.neg) return 114514;
                        if (ui.selected.buttons?.length >= 16) return 0;
                        return 5 - get.skillRank(button.link);
                      })
                    if (result.bool) {
                      let gains = get.gainableSkills();
                      gains.removeArray(player.getSkills(null, false, false));
                      gains = gains.filter(skill => {
                        const info = lib.skill[skill];
                        if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
                        return true;
                      });
                      let num = Math.min(result.links.length * 3, 50)
                      gains = gains.randomGets(num);
                      player.changeSkills(gains, result.links)
                        .set("$handle", (player, addSkill, removeSkill) => {
                          if (removeSkill.length) {
                            player.removeSkill(removeSkill);
                            game.log(
                              player,
                              "失去了技能",
                              ...removeSkill
                                .filter(i => i in lib.translate)
                                .map(i => {
                                  return "#g【" + get.translation(i) + "】";
                                })
                            );
                          }
                          if (addSkill.length) {
                            player.addSkill(addSkill);
                            game.log(
                              player,
                              "获得了技能",
                              ...addSkill
                                .filter(i => i in lib.translate)
                                .map(i => {
                                  return "#g【" + get.translation(i) + "】";
                                })
                            );
                          }
                        });
                    }
                  }
                },
                effect(player) {
                  return 4;
                },
              }],
              ["选择任意名其他角色，从这些角色的每个区域里各随机获得一张牌", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([1, game.countPlayer()], `选择任意名其他角色，从这些角色的每个区域里各随机获得一张牌`, true)
                    .set("filterTarget", (card, player, target) => target != player && target.countGainableCards(player, "hej"))
                    .set("ai", target => {
                      const player = _status.event.player;
                      return get.effect(target, { name: "shunshou_copy" }, player, player);
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player);
                    const list = [],
                      position = "hej";
                    for (const target of targets) {
                      let cards = [];
                      for (let i of position) {
                        if (target.countGainableCards(player, i)) cards.add(target.getGainableCards(player, i).randomGet());
                      };
                      if (cards.length) {
                        target.$give(cards, player);
                        list.addArray(cards);
                      }
                    };
                    await game.loseAsync({
                      gain_list: [[player, list]],
                      cards: list[1],
                    }).setContent("gaincardMultiple");
                    await game.delayx();
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.effect(current, { name: "shunshou_copy" }, player, player) > 0)) return game.countPlayer();
                },
              }],
              ["选择至少两名角色，令这些角色顺时针各对你此法选择的剩余角色使用一张【杀】", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget([2, game.countPlayer()], `选择至少名角色，令这些角色顺时针各对你未以此法选择的角色使用一张【杀】`, true)
                    .set("ai", target => {
                      const player = _status.event.player,
                        sha = get.autoViewAs({ name: "sha", isCard: true }, []);
                      if (get.attitude(player, target > 0)) return target.getUseValue(sha);
                      else return get.attitude(player, target) < 0;
                    });
                  if (result.bool) {
                    const targets = result.targets.sortBySeat(player).reverse(),
                      sha = get.autoViewAs({ name: "sha", isCard: true }, []);
                    for (const target of targets) {
                      let targetx = targets.filter(i => i != target && target.canUse(sha, i, false)).sortBySeat(target);
                      if (targetx.length) await target.useCard(sha, targetx);
                    };
                  }
                },
                effect(player) {
                  if (game.hasPlayer(current => get.effect(current, { name: "sha" }, player, player) > 0)) return 2;
                },
              }],
              ["获得六张随机基本牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList = lib.inpile.filter(name => get.type(name) == "basic");
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 4;
                },
              }],
              ["获得六张随机(red|black)牌", {
                content: async function (event, trigger, player) {
                  const cards = [],
                    suits = event.cardName == "red" ? ["heart", "diamond"] : ["spade", "club"];
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(null, suits.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 4;
                },
              }],
              ["获得六张随机(heart|spade|diamond|club)牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  for (let i = 0; i < 6; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(null, event.cardName);
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 4;
                },
              }],
              ["获得五张锦囊牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList = lib.inpile.filter(name => get.type2(name) == "trick");
                  for (let i = 0; i < 5; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 3.5;
                },
              }],
              ["获得五张普通锦囊牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList = lib.inpile.filter(name => get.type(name) == "trick");
                  for (let i = 0; i < 5; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 3.5;
                },
              }],
              ["获得五张延时锦囊牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList = lib.inpile.filter(name => get.type(name) == "delay");
                  for (let i = 0; i < 5; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 3.5;
                },
              }],
              ["获得四张装备牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList = lib.inpile.filter(name => get.type2(name) == "equip");
                  for (let i = 0; i < 4; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 3;
                },
              }],
              ["获得三张(equip1|equip2)牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList = lib.inpile.filter(name => {
                    if (get.type2(name) != "equip") return false;
                    return get.subtype(name) == event.cardName;
                  });
                  for (let i = 0; i < 4; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 3;
                },
              }],
              ["获得三张基本牌、三张锦囊牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList1 = lib.inpile.filter(name => get.type2(name) == "basic"),
                    cardList2 = lib.inpile.filter(name => get.type2(name) == "trick");
                  for (let i = 0; i < 3; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList1.randomGet());
                    if (card) cards.add(card).flat();
                    card = lib.skill.jlsg_lingze.createTempCard(cardList2.randomGet());
                    if (card) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 6;
                },
              }],
              ["获得三张锦囊牌、两张装备牌", {
                content: async function (event, trigger, player) {
                  const cards = [];
                  let cardList1 = lib.inpile.filter(name => get.type2(name) == "equip"),
                    cardList2 = lib.inpile.filter(name => get.type2(name) == "trick");
                  for (let i = 0; i < 3; i++) {
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList1.randomGet());
                    if (card) cards.add(card).flat();
                    card = lib.skill.jlsg_lingze.createTempCard(cardList2.randomGet());
                    if (card && cards.length < 4) cards.add(card).flat();
                  }
                  if (cards.length) await player.gain(cards, "draw").set("log", true);
                },
                effect(player) {
                  return 5.5;
                },
              }],
              ["选择一名角色，令其对其余所有角色连续使用六张同名普通锦囊牌", {
                content: async function (event, trigger, player) {
                  const list = lib.inpile.filter(name => {
                    if (get.type(name, null, false) != "trick") return false;
                    let info = lib.card[name];
                    if (!info || info.filterAddedTarget) return false;
                    return true;
                  });
                  const { result } = await player.chooseTarget("选择一名角色，令其对其余所有角色连续使用六张同名普通锦囊牌", true)
                    .set("filterTarget", (_, player, target) => get.event("list").some(name => target.hasUseTarget(name)))
                    .set("ai", target => Math.random())
                    .set("list", list);
                  if (result.bool) {
                    const target = result.targets[0];
                    const cards = list.filter(name => target.hasUseTarget(name));
                    event.card = get.autoViewAs({ name: cards.randomGet(), isCard: true }, []);
                    game.log(target, "使用的牌为", get.translation(event.card.name));
                    const targets = game.filterPlayer(current => current != target && target.canUse(event.card, current, false, event));
                    for (let i = 0; i < 6; i++) {
                      if (!target.isIn()) break;
                      await target.useCard(event.card, targets.filter(i => i.isIn()), false);
                    };
                  }
                },
                effect(player) {
                  return 2;
                },
              }],
              ["选择一名角色，令其对其余所有角色连续使用六张随机普通锦囊牌", {
                content: async function (event, trigger, player) {
                  const list = lib.inpile.filter(name => {
                    if (get.type(name, null, false) != "trick") return false;
                    let info = lib.card[name];
                    if (!info || info.filterAddedTarget) return false;
                    return true;
                  });
                  const { result } = await player.chooseTarget("选择一名角色，令其对其余所有角色连续使用六张随机普通锦囊牌", true)
                    .set("filterTarget", (_, player, target) => get.event("list").some(name => target.hasUseTarget(name)))
                    .set("ai", target => Math.random())
                    .set("list", list);
                  if (result.bool) {
                    const target = result.targets[0];
                    const cards = list.filter(name => target.hasUseTarget(name));
                    event.cards = [];
                    while (event.cards.length < 6 && target.isIn()) {
                      const card = get.autoViewAs({ name: cards.randomGet(), isCard: true }, []);
                      event.cards.push(card.name);
                      const targets = game.filterPlayer(current => {
                        if (current == target) return false;
                        return target.canUse(card, current, false, event);
                      });
                      await target.useCard(card, targets, false);
                    };
                  }
                },
                effect(player) {
                  return 2;
                },
              }],
              ["选择任意名角色，令这些角色各随机失去一个非初始技能，然后随机获得两个技能", {
                content: async function (event, trigger, player) {
                  const { result } = await player.chooseTarget("选择任意名角色，令这些角色各随机失去一个非初始技能，然后随机获得两个技能", true, [1, game.countPlayer()])
                    .set("ai", target => Math.random())
                  if (result.bool) {
                    result.targets.sortBySeat(_status.currentPhase);
                    for (const target of result.targets) {
                      const loseList = target.getSkills(null, false, false).removeArray(target.getStockSkills());
                      if (loseList.length) await target.removeSkills(loseList.randomGet());
                      const addList = lib.skill.jlsg_lingze.skills;
                      const skills = addList.filter(skill => {
                        const info = lib.skill[skill];
                        if (info.ai?.combo) return target.hasSkill(info.ai?.combo, null, false, false);
                        return true;
                      }).randomGets(2);
                      if (skills) await target.addSkills(skills);
                    };
                  }
                },
                effect(player) {
                  return 5.5;
                },
              }],
            ],
          };
          let jlsg_qs = false;
          if (_status.connectMode) {
            if (lib.configOL.cardPack.includes("jlsg_qs")) jlsg_qs = true;
          }
          else if (lib.config.cards.includes("jlsg_qs")) jlsg_qs = true;
          if (jlsg_qs) {
            const list = {
              damage: [
                ["获得一张【(jlsgqs_xiujian|jlsgqs_qixingbaodao)】、一张随机武器牌、一张【酒】，一张普通【杀】", {
                  content: async function (event, trigger, player) {
                    const cards = [
                      lib.skill.jlsg_lingze.createTempCard(event.cardName),
                    ];
                    let cardList = lib.inpile.filter(name => get.subtype(name) == "equip1");
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
                    if (card) cards.add(card);
                    cards.addArray([
                      lib.skill.jlsg_lingze.createTempCard("jiu"),
                      lib.skill.jlsg_lingze.createTempCard("sha", undefined, null),
                    ]);
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  },
                  effect(player) {
                    return 4;
                  },
                }],
              ],
              recover: [
                ["获得一张【(jlsgqs_yuxi|jlsgqs_taipingyaoshu)】、一张随机防具牌、一张【无懈可击】，一张【梅】", {
                  content: async function (event, trigger, player) {
                    const cards = [
                      lib.skill.jlsg_lingze.createTempCard(event.cardName),
                    ];
                    let cardList = lib.inpile.filter(name => get.subtype(name) == "equip2");
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
                    if (card) cards.add(card);
                    cards.addArray([
                      lib.skill.jlsg_lingze.createTempCard("wuxie"),
                      lib.skill.jlsg_lingze.createTempCard("jlsgqs_mei"),
                    ]);
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  },
                  effect(player) {
                    return 4;
                  },
                }],
                ["获得一张【(jlsgqs_jinnangdai|jlsgqs_muniu)】、一张随机防具牌、一张【无中生有】，一张【梅】", {
                  content: async function (event, trigger, player) {
                    const cards = [
                      lib.skill.jlsg_lingze.createTempCard(event.cardName),
                    ];
                    let cardList = lib.inpile.filter(name => get.subtype(name) == "equip2");
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
                    if (card) cards.add(card);
                    cards.addArray([
                      lib.skill.jlsg_lingze.createTempCard("wuzhong"),
                      lib.skill.jlsg_lingze.createTempCard("jlsgqs_mei"),
                    ]);
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  },
                  effect(player) {
                    return 4.5;
                  },
                }],
                ["获得一张【孔明灯】、一张随机防具牌、两张张【无中生有】", {
                  content: async function (event, trigger, player) {
                    const cards = [
                      lib.skill.jlsg_lingze.createTempCard("jlsgqs_kongmingdeng"),
                    ];
                    let cardList = lib.inpile.filter(name => get.subtype(name) == "equip1");
                    let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
                    if (card) cards.add(card);
                    cards.addArray([
                      lib.skill.jlsg_lingze.createTempCard("wuzhong"),
                      lib.skill.jlsg_lingze.createTempCard("wuzhong"),
                    ]);
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  },
                  effect(player) {
                    return 5;
                  },
                }],
                ["获得一张【遁甲天书】、一张进攻马、一张防御马", {
                  content: async function (event, trigger, player) {
                    const cards = [
                      lib.skill.jlsg_lingze.createTempCard("jlsgqs_dunjiatianshu"),
                    ];
                    let attack = lib.inpile.filter(name => {
                      if (get.type(name, null, false) != "equip") return false;
                      const card = lib.card[name];
                      return card.distance?.globalFrom;
                    }).randomGet(),
                      defend = lib.inpile.filter(name => {
                        if (get.type(name, null, false) != "equip") return false;
                        const card = lib.card[name];
                        return card.distance?.globalTo;
                      }).randomGet();
                    cards.addArray([
                      lib.skill.jlsg_lingze.createTempCard(attack),
                      lib.skill.jlsg_lingze.createTempCard(defend),
                    ]);
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  },
                  effect(player) {
                    return 4;
                  },
                }],
              ],
              chaos: [
                ["获得三张随机宝物牌", {
                  content: async function (event, trigger, player) {
                    const cards = [];
                    let cardList = lib.inpile.filter(name => get.subtype(name) == "equip5");
                    if (cardList.length < 4) cardList = [
                      'lingsheji', 'shanrangzhaoshu', 'changandajian_equip5', 'sanlve', 'zhaogujing',
                      'shufazijinguan', 'xuwangzhimian', 'zhuangshu_basic', 'zhuangshu_trick', 'zhuangshu_equip',
                      'dagongche', 'pilitoushiche', 'jlsgqs_kongmingdeng', 'jlsgqs_muniu', 'jlsgqs_yuxi',
                      'jlsgqs_taipingyaoshu', 'jlsgqs_dunjiatianshu', 'jlsgqs_qixingbaodao', 'jlsgqs_xiujian', 'jlsgqs_jinnangdai',
                      'muniu', 'tongque', 'tianjitu', 'taigongyinfu', 'zhaoshu',
                      'dinglanyemingzhu', 'yuxi', 'xinge', 'jinhe'];
                    if (!lib.inpile.some(i => i.startsWith("jlsgqs_"))) cardList = cardList.filter(i => !i.startsWith("jlsgqx_"));
                    for (let i = 0; i < 3; i++) {
                      let card = lib.skill.jlsg_lingze.createTempCard(cardList.randomRemove());
                      if (card) cards.add(card);
                    };
                    if (cards.length) await player.gain(cards, "draw").set("log", true);
                  },
                  effect(player) {
                    return 3;
                  },
                }],
              ],
            };
            for (let type in list) {
              result[type].addArray(list[type]);
            };
          }
          delete this.getEffects;
          this.getEffects = result;
          return result;
        },
        get typeSkills() {
          let list = {
            damage: [
              '长驱', '电界', '横江', '无双', '龙胆', '习武', '酒诗',
              '狂风', '纵欲', '慧觑', '止戈', '断粮', '引兵', '神速',
              '咆哮', '武圣', '权倾', '扫讨', '笔伐', '剑舞', '贿生',
              '悲歌', '缮甲', '献祭', '征南', '整毅', '蒺藜', '义从',
              '扰梦', '虎痴', '啖睛', '诈降', '谱毁', '无畏', '焚营',
              '伏诛', '严教', '授计', '溃诛', '祸世', '鸩毒', '湮灭',
              '母仪', '反间', '千幻', '神戟', '琴音', '顺世', '铁骑',
              '尚义', '猛进', '主宰', '惴恐', '逆施', '奔袭', '夙隐',
              '诋毁', '鱼忧', '索魂', '八门', '三治', '残掠', '仇决',
              '国色', '鬼门', '极弓', '蛮裔', '震魂', '劫焰', '刚烈',
              '卸甲', '调度', '拒战', '观虚', '木牛', '寝情', '暴政',
              '突围', '轻袭', '薮影', '眩惑', '神威', '缔盟', '鸡肋',
              '魔兽', '傲才', '沉鱼', '魔舞', '魅心', '送丧', '落雷',
              '狂傲', '纵情', '解烦', '温酒', '踏破', '凤吟', '虎啸',
              '司敌', '搏战', '忠勇', '求援', '屯田', '逐寇', '曼舞',
              '过论', '忠魂', '蚕食', '勇继', '国士', '画策', '游侠',
              '贺春', '炼体', '狂斧', '戟舞', '献州', '奋威', '伏射',
              '虚猩', '活墨', '天启', '朝臣', '颂词', '驱虎', '狼顾',
              '灭计', '谦冲', '蓄劲', '魔箭', '奇袭', '恃傲', '制敌',
              '死谏', '弓骑', '乱嗣', '强袭', '凌波', '星舞', '专擅',
              '乱武', '旋风', '修罗', '三绝', '绝策', '决裂', '咒缚',
              '激诏', '攻心', '延粮', '谗陷', '集军', '折节', '火计',
              '醉酒', '截军', '妖惑', '待劳', '掠阵', '乱政', '凌怒',
              '祸水', '忧戎', '悍勇', '落雁', '素检', '藏书', '永劫',
              '神愤', '舌剑', '埋伏', '烈弓', '烈医', '逐鹿', '知命',
              '摧锋', '陷嗣', '挑衅', '横行', '射戟', '戚乱', '龙咆',
              '朝凰', '酋首', '龙魂', '迷乱', '极武', '筹略', '米道',
              '罪论', '布教', '独进', '战绝', '飞军'
            ],
            recover: [
              '甘露', '孤城', '芳馨', '礼让', '存嗣', '严整', '天辩',
              '伏枥', '豹变', '法恩', '匡弼', '红颜', '大雾', '遗计',
              '蛮王', '兴学', '秉壹', '品第', '天姿', '姻盟', '绝勇',
              '御策', '诛暴', '羽化', '据守', '纵玄', '义谏', '谦逊',
              '温良', '明政', '矫诏', '威风', '才遇', '倾国', '娇媚',
              '无言', '五禽', '帷幕', '锦织', '鏖战', '放权', '狂暴',
              '闭月', '凤仪', '经纶', '连营', '七星', '乘风', '隐世',
              '天命', '溃围', '全政', '智迟', '极略', '贤士', '招降',
              '闪戏', '强识', '衍息', '仁德', '恭慎', '怀璧', '奇才',
              '勘误', '享乐', '帷幄', '困奋', '空城', '储元', '仁心',
              '权略', '淑贤', '雅士', '直言', '良缘', '游龙', '捧日',
              '归命', '昭心', '资国', '尚俭', '闺秀', '归心', '断念',
              '奋激', '涅槃', '武志', '省身', '武继', '忍忌', '落英',
              '扶汉', '祸心', '涉猎', '好施', '制衡', '父志', '普渡',
              '缓兵', '誓仇', '八阵', '忘隙', '昂扬', '陈情', '密诏',
              '明策', '才捷', '衡势', '掣政', '狡慧', '追尊', '倾城',
              '虎踞', '雅虑', '儒宗', '刚直', '激词', '伏间', '鼓舌',
              '自守', '无前', '迭嶂', '宴诛', '绝境', '淫恣', '英才',
              '举荐', '博略', '行殇', '怀异', '拜月', '重生', '权计',
              '矢北', '仙授', '结姻', '刀侍', '反骨', '渐营', '天香',
              '雄略', '龙变', '元化', '枭姬', '单骑', '同心', '狂言'
            ],
            chaos: [
              '五禽', '烈弓', '冲阵', '凌虐', '募马', '残掠', '咆哮',
              '勘误', '征南', '米道', '智愚', '凌弱', '震魂', '流离',
              '乱武', '刚直', '摧锋', '劝降', '伏诛', '刻死', '享乐',
              '掩杀', '慷忾', '品第', '天策', '搏战', '大雾', '剑舞',
              '缓兵', '太平', '折节', '箜篌', '逆战', '掣政', '温良',
              '当先', '焚城', '帷幕', '天妒', '神戟', '国色', '追击',
              '制合', '八门', '炼体', '雷魂', '七星', '三分', '攻心',
              '蒺藜', '空城', '观虚', '火计', '激词', '变天', '骄矜',
              '恩怨', '雷祭', '洞察', '魔箭', '恃傲', '烈医', '虎缚',
              '严整', '饵敌', '固政', '忧恤', '威震', '闭月', '飞军',
              '蓄劲', '追忆', '龙吟', '隐世', '衡势', '凤吟', '断粮',
              '娇媚', '绝境', '专擅', '承志', '伏枥', '伏间', '酒诗',
              '连环', '才鉴', '乱政', '素检', '流云', '离间', '御象',
              '战绝', '暴政', '狂暴', '勇烈', '蛮王', '落英', '涅槃',
              '雅虑', '狂傲', '司敌', '峻刑', '回春', '挑衅', '惠敛',
              '狂袭', '倾城', '横江', '曼舞', '商道', '神愤', '君望',
              '天辩', '悍勇', '顺世', '鱼忧', '贤士', '滔乱', '雄异',
              '机巧', '弓骑', '刀侍', '怒发', '魅惑', '狂骨', '风雅',
              '魔舞', '截军', '匡弼', '索魂', '千幻', '闪戏', '挥泪',
              '不屈', '无畏', '结姻', '罪论', '怀橘', '巧变', '淑贤',
              '鏖战', '忧戎', '千骑', '湮灭', '狂言', '仙授', '纵玄'
            ],
          };
          list.chaos.addArray(list.recover.concat(list.damage)).unique();
          delete this.typeSkills;
          this.typeSkills = list;
          return list;
        },
        skills(player) {
          const skills = [];
          for (const packname in lib.characterPack) {
            if (![
              "standard", "shenhua", "jlsg_sk", "jlsg_skpf", "jlsg_sr", "jlsg_soul", "jlsg_sy", "jlAddition",
            ].includes(packname)) continue;
            const pack = lib.characterPack[packname];
            if (!Object.keys(pack).length) continue;
            for (const i in pack) {
              if (i.includes("xushao") || i.includes("zuoci")) continue;
              if (lib.filter.characterDisabled(i)) continue;
              if (lib.filter.characterDisabled2(i)) continue;
              if (pack[i].isBoss) continue;
              if (pack[i].isHiddenBoss) continue;
              if (pack[i].isMinskin) continue;
              if (pack[i].isUnseen) continue;
              for (const skill of pack[i].skills) {
                const info = lib.skill[skill];
                if (lib.filter.skillDisabled(skill)) continue;
                if (info?.charlotte) continue;
                if (player && player.hasSkill && info.ai && info.ai.combo && !player.hasSkill(info.ai.combo)) continue;
                skills.add(skill);
              };
            };
          };
          return skills;
        },
        createTempCard(name, suit, nature) {
          if (!name in lib.card && name !== null) return [];
          if (!name) name = lib.inpile.randomGet();
          if (!suit) suit = lib.suit.randomGet();
          if (name == "sha" && !nature && nature !== null && Math.random() > 0.5) nature = lib.card.sha.nature.randomGet();
          let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].randomGet();
          let card = game.createCard(name, suit, number, nature);
          game.broadcastAll(function (card) {
            card.destroyed = "discardPile";
            card.classList.add("jlsg_xuyuan-glow");
          }, card)
          return card;
        },
        subSkill: {
          effect: {
            mod: {
              maxHandcardBase: function (player, num) {
                return num + player.storage.jlsg_lingze_effect.maxHandcard;
              },
              cardUsable(card, player, num) {
                if (card.name == "sha") return num + player.storage.jlsg_lingze_effect.sha;
              },
            },
            init(player) {
              player.storage.jlsg_lingze_effect = {
                sha: 0,
                maxHandcard: 0,
                draw: 0,
              };
            },
            mark: true,
            marktext: "愿",
            intro: {
              mark(dialog, storage) {
                const addNewRow = lib.element.dialog.addNewRow.bind(dialog),
                  itemContainerCss = { height: "20px" },
                  map = {
                    "sha": "使用杀次数",
                    "maxHandcard": "手牌上限",
                    "draw": "额定摸牌数",
                  }
                if (get.is.phoneLayout()) dialog.classList.add("fullheight");
                dialog.css({ width: "20%" });
                for (let i in storage) {
                  let num = storage[i];
                  if (num <= 0) continue;
                  let list = [
                    { item: map[i], ratio: .8, itemContainerCss },
                    { item: "+" + num, ratio: .5, itemContainerCss },
                  ];
                  addNewRow(...list);
                };
              },
            },
            trigger: { player: "phaseDrawBegin1" },
            filter(event, player) {
              return !event.numFixed && player.storage.jlsg_lingze_effect.draw > 0;
            },
            forced: true,
            popup: false,
            async content(event, trigger, player) {
              trigger.num += player.storage.jlsg_lingze_effect.draw;
            },
          },
        },
      },
      jlsg_hanshuang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "damageBegin3" },
        filter: () => true,
        async cost(event, trigger, player) {
          const { player: target, source, card } = trigger,
            [SUB, ADD] = ["减伤", "加伤"],
            list = ["加伤", "减伤", "cancel2"],
            num = player.getRoundHistory("useSkill", evt => evt.skill == "jlsg_hanshuang" && evt.targets?.includes(trigger.player)).length + 1;
          let prompt = `${get.translation(target)}即将受到${source ? "来自" + get.translation(source) : "无来源"}的${trigger.num}点伤害，你可以选择一项：`;
          const choiceTexts = [`1.令其摸${get.cnNumber(num)}张牌并令此次伤害+${num}`, `2.令其弃置${get.cnNumber(num)}张牌并令此次伤害-${num}`];
          if (target.countDiscardableCards(target, "he") < num) {
            list.remove("减伤")
            choiceTexts[1] = `<span style="text-decoration: line-through;">${choiceTexts[1]}</span>`
          }
          choiceTexts.forEach(text => (prompt += "<br>" + text));
          const { result } = await player.chooseControl(list)
            .set("prompt", get.prompt("jlsg_hanshuang", target))
            .set("prompt2", prompt).set("ai", () => get.event("choice"))
            .set(
              "choice",
              (() => {
                const damageEff = get.damageEffect(target, source, player, trigger.nature),
                  guohe = get.effect(target, { name: "guohe_copy2" }, target, player) * num,
                  draw = get.effect(target, { name: "draw" }, target, player) * num;
                const canFilterDamage = target.hasSkillTag("filterDamage", null, {
                  player: source,
                  card,
                });
                if (damageEff > 0) {
                  if (!canFilterDamage &&
                    (target.getHp() <= trigger.num + num ||
                      guohe < draw)
                  ) return ADD;
                  else {
                    if (get.attitude(player, target) > 0 && (damageEff === 0 || canFilterDamage)) return ADD;
                    if (
                      target.getHp() + target.countCards("hs", card => target.canSaveCard(card, target)) > trigger.num + 1 &&
                      !list.includes(SUB)
                    )
                      return ADD;
                  }
                } else {
                  if (get.attitude(player, target) > 0) {
                    if (damageEff === 0 || canFilterDamage) return ADD;
                    if (
                      target.getHp() + target.countCards("hs", card => target.canSaveCard(card, target)) > trigger.num + num &&
                      draw > guohe
                    ) return ADD;
                    else {
                      const discardableCards = target.getDiscardableCards(target, "he");
                      if (
                        (discardableCards.length >= trigger.num ||
                          trigger.num >= target.getHp() ||
                          discardableCards.reduce((sum, card) => sum + target.getUseValue(card), 0) > Math.abs(guohe)
                        ) && list.includes(SUB)
                      ) return SUB;
                    }
                  }
                  else if (
                    target.hasSkillTag("maixie") &&
                    trigger.num === 1 &&
                    damageEff < -20 &&
                    list.includes(SUB)
                  ) return SUB;
                }
                return "cancel2";
              })()
            )
          if (result.control !== "cancel2") {
            event.result = {
              bool: true,
              targets: [target],
              cost_data: {
                control: result.control,
                num,
              },
            };
          }
        },
        async content(event, trigger, player) {
          const { control, num } = event.cost_data,
            { player: target } = trigger;
          if (control === "减伤") {
            await target.chooseToDiscard(num, true, "he");
            game.log(player, "令此伤害", `#y-${num}`);
            trigger.num -= Math.min(num, trigger.num);
          } else {
            await target.draw(num);
            game.log(player, "令此伤害", `#y+${num}`);
            trigger.num += num;
          }
          await game.delayx();
        },
      },
      jlsg_liluan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: ["loseBefore", "drawBefore"] },
        usable: 1,
        filter(event, player) {
          if (event.name == "lose") return event.type == "discard";
          else return event.num > 0;
        },
        async cost(event, trigger, player) {
          const { player: target } = trigger,
            num = trigger.name == "lose" ? trigger.cards.filter(card => get.owner(card) == target).length : trigger.num;
          const prompt = `${get.translation(target)}即将${trigger.name == "lose" ? "弃置" : "摸"}${get.cnNumber(num)}张牌，是否取消此操作改为其以外的角色各${trigger.name == "lose" ? "随机弃置" : "摸"}一张牌？`;
          event.result = await player.chooseBool()
            .set("prompt", get.prompt("jlsg_liluan", target))
            .set("prompt2", prompt)
            .set("ai", (event, player) => {
              const trigger = event.getTrigger(),
                target = event.getTrigger().player;
              const targetEff = get.effect(target, { name: trigger.name == "lose" ? "guohe_copy2" : "draw" }, target, player) * get.event("num"),
                sumEff = game.filterPlayer(current => current != target)
                  .reduce((sum, current) => sum + get.effect(current, { name: trigger.name == "lose" ? "guohe_copy2" : "draw" }, current, player), 0);
              return targetEff < sumEff;
            })
            .set("num", num)
            .forResult();
          event.result.targets = [target];
        },
        async content(event, trigger, player) {
          const { player: target } = trigger,
            targets = game.filterPlayer(current => current != target).sortBySeat(_status.currentPhase);
          if (trigger.name == "lose") {
            trigger.cards = trigger.cards.filter(i => get.owner(i) != target);
            const lose_list = [];
            for (let current of targets) {
              const cards = current.getDiscardableCards(current, "he")
              if (cards.length) lose_list.add([current, cards.randomGets(1)]);
            };
            game.log(player, "取消了", target, "的弃牌");
            await game.loseAsync({ lose_list }).setContent("discardMultiple");
          } else {
            trigger.cancel();
            game.log(player, "取消了", target, "的摸牌");
            await game.asyncDraw(targets);
          }
        }
      },
      jlsg_zhanyue: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "useCardToPlayered" },
        filter(event, player) {
          if (event.targets.length > 1) return false;
          return event.card.name == "sha";
        },
        async cost(event, trigger, player) {
          const [target] = trigger.targets;
          const list = { next: [], previous: [] };
          let next = target,
            previous = target;
          for (let i = 0; i < 2; i++) {
            next = next.getNext();
            previous = previous.getPrevious();
            list.next.add(next);
            list.previous.add(previous);
          };
          if (list.next[0] == player) list.next = [null, null];
          if (list.previous[0] == player) list.previous = [null, null];
          const targetsx = list.next.reverse().concat(list.previous);
          let str = "";
          if (targetsx.filter(i => i && i != player).unique().length) {
            str = `可以指定1-2名与${get.translation(target)}相连且不为你的其他角色也成为此【杀】的目标，然后`;
          }
          str += "令此【杀】无视防具、不计入次数限制，且造成的伤害改为目标角色一半的体力值（向上取整），此【杀】结算后，你摸此【杀】造成伤害总数的牌";
          event.result = await player.chooseTarget([0, 2], `###${get.prompt("jlsg_zhanyue")}###${str}`)
            .set("targetsx", targetsx)
            .set("cardx", (function () {
              if (!trigger.card.storage?.jlsg_zhanyue) {
                if (!trigger.card.storage) trigger.card.storage = {};
                trigger.card.storage.jlsg_zhanyue = true;
              }
              return trigger.card;
            })())
            .set("complexTarget", true)
            .set("filterTarget", (card, player, target) => {
              if (target == player) return false;
              const list = get.event("targetsx")
              if (!list.includes(target)) return false;
              if (ui.selected.targets.length) {
                return ui.selected.targets.some(current => {
                  const curIndex = list.indexOf(current),
                    tarIndex = list.indexOf(target);
                  return Math.abs(curIndex - tarIndex) == 1;
                })
              }
              return list.slice(1, 3).includes(target)
            })
            .set("ai", target => {
              const event = get.event(),
                player = get.player();
              const card = get.event("cardx");
              return get.effect(target, card, player, player);
            })
            .set("filterOk", () => {
              const event = get.event(),
                player = get.player(),
                target = event.getTrigger().targets[0],
                card = event.cardx;
              if (_status.connectMode && !player.isAuto) return true;
              else if (!_status.auto) return true;
              return get.effect(target, card, player, player) > 0;
            })
            .set("custom", {
              add: {},
              replace: {
                target(target) {
                  const event = get.event();
                  if (!event.isMine()) return;
                  if (target.classList.contains("selectable") == false) return;
                  if (target.classList.contains("selected")) {
                    ui.selected.targets.remove(target);
                    target.classList.remove("selected");
                    if (_status.multitarget || event.complexSelect || event.complexTarget) {
                      game.uncheck();
                      game.check();
                    }
                  } else {
                    target.classList.add("selected");
                    ui.selected.targets.add(target);
                  }
                  game.check();
                },
              },
            })
            .forResult();
          if (event.result.bool) {
            event.result.targets.unshift(target);
            event.result.targets.sortBySeat(_status.currentPhase);
          }
          delete trigger.card.storage.jlsg_zhanyue;
        },
        async content(event, trigger, player) {
          const targets = event.targets
            .slice()
            .removeArray(trigger.targets)
            .sortBySeat();
          if (targets.length) {
            game.log(targets, `成为了`, trigger.card, '的额外目标');
            trigger.targets.addArray(targets);
          }
          if (!trigger.card.storage?.jlsg_zhanyue) {
            if (!trigger.card.storage) trigger.card.storage = {};
            trigger.card.storage.jlsg_zhanyue = true;
          }
          if (trigger.addCount !== false) {
            trigger.addCount = false;
            trigger.player.getStat().card.sha--;
          }
          player.when({ player: "useCardAfter" })
            .filter(evt => evt.card == trigger.card)
            .step(async function (event, trigger, player) {
              const num = player.getHistory("sourceDamage", evt => {
                return evt.card == trigger.card;
              }).reduce((sum, evt) => sum + evt.num, 0);
              if (num > 0) await player.draw(num);
            });
        },
        group: "jlsg_zhanyue_damage",
        subSkill: {
          damage: {
            sourceSkill: "jlsg_zhanyue",
            sub: true,
            audio: false,
            trigger: { source: "damageBegin4" },
            filter(event, player) {
              if (!event.card) return false;
              return event.card.name == "sha" && event.card.storage?.jlsg_zhanyue;
            },
            charlotte: true,
            forced: true,
            popup: false,
            async content(event, trigger, player) {
              const num = Math.ceil(trigger.player.getHp() / 2);
              if (num > 0) trigger.num = num;
            },
          },
        },
        ai: {
          unequip: true,
          unequip_ai: true,
          skillTagFilter(player, tag, arg) {
            return arg?.card?.storage?.jlsg_zhanyue;
          },
          effect: {
            player(card, player, target) {
              if (card.storage?.jlsg_zhanyue) return;
              if (!target || target.hasSkillTag("filterDamage", null, {
                player: player,
                card: card,
              })) return;
              const num = Math.ceil(target.getHp() / 2);
              if (num > 0) return [1, Math.log(num) / 2, 1, -Math.log(num) / 2];
            },
          }
        },
      },
      jlsg_fengtian: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseBegin" },
        filter(event, player) {
          return event.player != player && player.countDiscardableCards(player, "he");
        },
        async cost(event, trigger, player) {
          event.result = await player.chooseToDiscard("he")
            .set("prompt", get.prompt2("jlsg_fengtian", trigger.player))
            .set("ai", card => {
              const target = get.event("target"),
                player = get.player(),
                phaseList = get.event("phaseList");
              let value = 3 - get.value(card, player);
              if (!phaseList.length) value -= 3;
              else value += Math.min(3, phaseList.length);
              if (get.effect(target, get.autoViewAs({ name: "sha" }, []), player, player) > 0) value += 2;
              if (card.name == "sha") value += target.getSkills(null, false).length / 2;
              return value;
            })
            .set("target", trigger.player)
            .set("phaseList", trigger.phaseList.filter(i => {
              return ["phaseDraw", "phaseUse", "phaseDiscard"].includes(i)
            }))
            .set("logSkill", ["jlsg_fengtian", trigger.player])
            .set("chooseonly", true)
            .forResult();
          if (event.result?.bool) {
            event.result.targets = [trigger.player];
            event.result.skill_popup = false;
          }
        },
        async content(event, trigger, player) {
          const { targets: [target], cards: [card] } = event;
          await player.discard(card);
          target.addTempSkill("jlsg_fengtian_effect", { global: ["phaseAfter", "phaseBefore"] });
          target.storage.jlsg_fengtian_effect.players.add(player);
          if (get.name(card) == "sha") target.addSkillBlocker("jlsg_fengtian_effect");
          target.markSkill("jlsg_fengtian_effect");
        },
        group: "jlsg_fengtian_sha",
        subSkill: {
          sha: {
            sourceSkill: "jlsg_fengtian",
            sub: true,
            audio: "jlsg_fengtian",
            trigger: { global: ["drawAfter", "useCardAfter", "loseAfter", "loseAsyncAfter"] },
            getIndex(event, player) {
              if (["useCard", "draw"].includes(event.name)) return [event.player];
              if (event.getl && typeof event.getl == "function") {
                return game.filterPlayer(current => event.getl(current).cards2?.length).sortBySeat();
              };
              return [];
            },
            filter(event, player, name, target) {
              if (!target?.storage?.jlsg_fengtian_effect?.players?.includes(player)) return false;
              const record = target.storage.jlsg_fengtian_effect.record;
              if (event.name == "useCard") return !record.useCard.includes(event.card.name);
              else if (event.name == "draw") return !record.draw;
              return event.type == "discard" && !record.discard;
            },
            forced: true,
            logTarget(event, player, name, target) {
              return [target];
            },
            async content(event, trigger, player) {
              const { targets: [target] } = event;
              switch (trigger.name) {
                case "useCard":
                  target.storage.jlsg_fengtian_effect.record.useCard.add(trigger.card.name);
                  break;
                case "draw":
                  target.storage.jlsg_fengtian_effect.record.draw = true;
                  break;
                default:
                  target.storage.jlsg_fengtian_effect.record.discard = true;
                  break;
              };
              target.markSkill("jlsg_fengtian_effect");
              const sha = get.autoViewAs({ name: "sha" }, []);
              if (player.canUse(sha, target, false)) {
                await player.useCard(sha, target);
              }
            },
          },
          effect: {
            sourceSkill: "jlsg_fengtian",
            sub: true,
            audio: false,
            init(player, skill) {
              player.storage[skill] = {
                players: [],
                record: {
                  draw: false,
                  discard: false,
                  useCard: [],
                },
              };
            },
            intro: {
              noucount: true,
              content(storage, player) {
                const { players, record } = storage;
                let str = `已被${get.translation(players)}封印<br>
                  已使用牌：${record.useCard.length ? get.translation(record.useCard) : "无"}<br>
                  摸牌：${record.draw ? "是" : "否"}<br>
                  弃牌：${record.discard ? "是" : "否"}`;
                if (player.storage.skill_blocker?.includes("jlsg_fengtian_effect")) {
                  const list = player.getSkills(null, false, false).filter(function (i) {
                    return lib.skill.jlsg_fengtian_effect.skillBlocker(i, player);
                  });
                  if (list.length) str += `<br>已失效技能：${get.translation(list)}`;
                }
                return str;
              },
            },
            onremove(player, skill) {
              player.clearMark(skill);
              player.removeSkillBlocker(skill);
            },
            skillBlocker(skill) {
              const info = get.info(skill);
              return !info.charlotte && !info.persevereSkill;
            },
            trigger: { source: "damageSource" },
            filter(event, player) {
              return player.storage.jlsg_fengtian_effect.players.includes(event.player);
            },
            charlotte: true,
            forced: true,
            popup: false,
            async content(event, trigger, player) {
              player.storage.jlsg_fengtian_effect.players.remove(trigger.player);
              player.markSkill("jlsg_fengtian_effect");
              if (!player.storage.jlsg_fengtian_effect.players.length) {
                player.removeSkill("jlsg_fengtian_effect");
              }
            },
          },
        },
      },
    },
    translate: {
      jlsg_soul: "魂烈包",
      jlsgsoul_caocao: 'SK神曹操',
      jlsgsoul_sunquan: 'SK神孙权',
      jlsgsoul_jiaxu: 'SK神贾诩',
      jlsgsoul_liubei: 'SK神刘备',
      jlsgsoul_zhugeliang: 'SK神诸葛亮',
      jlsgsoul_sp_zhugeliang: 'SP神诸葛亮',
      jlsgsoul_simayi: 'SK神司马懿',
      jlsgsoul_sp_simayi: 'SP神司马懿',
      jlsgsoul_luxun: 'SK神陆逊',
      jlsgsoul_lvbu: 'SK神吕布',
      jlsgsoul_sp_lvbu: 'SP神吕布',
      jlsgsoul_guanyu: 'SK神关羽',
      jlsgsoul_zhaoyun: 'SK神赵云',
      jlsgsoul_zhangliao: 'SK神张辽',
      jlsgsoul_sp_zhangliao: 'SP神张辽',
      jlsgsoul_huangyueying: 'SK神黄月英',
      jlsgsoul_sp_huangyueying: 'SP神黄月英',
      jlsgsoul_zhangjiao: 'SK神张角',
      jlsgsoul_sp_zhangjiao: 'SP神张角',
      jlsgsoul_lvmeng: 'SK神吕蒙',
      jlsgsoul_guojia: 'SK神郭嘉',
      jlsgsoul_sunshangxiang: 'SK神孙尚香',
      jlsgsoul_diaochan: 'SK神貂蝉',
      jlsgsoul_sp_diaochan: 'SP神貂蝉',
      jlsgsoul_zhangfei: 'SK神张飞',
      jlsgsoul_simahui: 'SK神司马徽',
      jlsgsoul_dianwei: 'SK神典韦',
      jlsgsoul_huatuo: 'SK神华佗',
      jlsgsoul_ganning: 'SK神甘宁',
      jlsgsoul_sp_ganning: 'SP神甘宁',
      jlsgsoul_xiahoudun: 'SK神夏侯惇',
      jlsgsoul_zhouyu: 'SK神周瑜',
      jlsgsoul_machao: 'SK神马超',
      jlsgsoul_zhenji: 'SK神甄姬',
      jlsgsoul_huanggai: 'SK神黄盖',
      jlsgsoul_xuzhu: 'SK神许褚',
      jlsgsoul_daqiao: 'SK神大乔',
      jlsgsoul_huangzhong: 'SK神黄忠',
      jlsgsoul_xiaoqiao: 'SK神小乔',
      jlsgsoul_caoren: 'SK神曹仁',
      jlsgsoul_caopi: 'SK神曹丕',
      jlsgsoul_pangtong: "SK神庞统",
      jlsgsoul_sp_zhaoyun: "SP神赵云",
      jlsgsoul_sp_sunshangxiang: "SP神孙尚香",
      jlsgsoul_caiwenji: "SK神蔡文姬",

      jlsg_yinyang_s: '阴阳',
      jlsg_yinyang_s_info: '锁定技，若你的体力：多于已损失体力，你拥有〖极阳〗；少于已损失体力，你拥有〖极阴〗；等于已损失体力，你拥有〖相生〗。',
      jlsg_jiyang: '极阳',
      jlsg_jiyang_info: '锁定技，获得此技能时，你获得3枚「阳」标记；失去此技能后，你随机获得一张红色牌；当你失去红色牌后，你可以弃置1枚「阳」标记令一名角色回复1点体力，若其未受伤则改为加1点体力上限。',
      jlsg_jiyin: '极阴',
      jlsg_jiyin_info: '锁定技，获得此技能时，你获得3枚「阴」标记；失去此技能后，你随机获得一张黑色牌；当你失去黑色牌后，你可以弃置1枚「阴」标记对一名角色造成1点雷电伤害，若其已受伤则改为减1点体力上限。',
      jlsg_xiangsheng: '相生',
      jlsg_xiangsheng_info: '锁定技，获得此技能时，你获得6枚「生」标记；失去此技能后，你摸一张牌；当你失去黑色/红色牌后，你可以弃置1枚「生」标记并摸一张红色/黑色牌。',
      jlsg_dingming: '定命',
      jlsg_dingming2: '定命',
      jlsg_dingming_info: '准备阶段，或当你受到其他角色造成的伤害后，你可以交换体力与已损失体力并摸X张牌，然后若你的体力多于已损失体力，你减1点体力上限；当你对其他角色造成伤害后，你可以令其交换体力与已损失体力且你摸X张牌，然后若其体力少于已损失体力，你减1点体力上限。（X为此次体力值变化量）',
      jlsg_qianqi: '千骑',
      jlsg_qianqi2: '千骑',
      jlsg_qianqi_info: '游戏开始时，你装备随机+1与-1坐骑牌。当一名角色从装备区里失去坐骑牌后，你获得2枚「千骑」标记。出牌阶段，你可以弃置一枚「千骑」标记，视为使用一张无距离与次数限制的【杀】。',
      jlsg_juechen: '绝尘',
      jlsg_juechen_info: '当你使用【杀】对其他角色造成伤害时，你可以防止此伤害，改为令其失去X点体力（X为伤害值），或减一点体力上限。',
      jlsg_shenfu: '神赋',
      jlsg_shenfu_info: '当你失去手牌后，你可以将手牌补至四张，并记录本次失去的手牌的花色，然后若你最近四次以此法记录的花色各不相同，你可以对一名角色造成1点雷电伤害。',
      jlsg_shenfu_append: '<span style="font-family: yuanli">失去多张手牌则记录无花色。结算不同花色时，无花色视为第五种花色。</span>',
      jlsg_lvezhen: '掠阵',
      jlsg_lvezhen_info: '出牌阶段限一次，你使用【杀】或锦囊指定唯一目标后，可以随机获得其一张牌。',
      jlsg_youlong: '游龙',
      jlsg_youlong2: '游龙',
      jlsg_youlong_info: '锁定技，你始终背面朝上。其他角色的回合结束时，你摸一张牌并执行一个额外的出牌阶段。',
      jlsg_danjing: "啖睛",
      jlsg_danjing_info: "当你受到伤害后/失去体力后/扣减体力上限后/弃置牌后，你可以令一名其他角色也执行等量相同的效果。",
      jlsg_zhonghun: "忠魂",
      jlsg_zhonghun2: "忠魂",
      jlsg_zhonghun3: "忠魂",
      jlsg_zhonghun_info: "限定技，游戏开始时，或出牌阶段，你可以减1点体力上限并选择一名其他角色，令其加1点体力上限并回复1点体力。此后当其受到伤害时，若伤害来源不是你，将此伤害转移给你；你死亡时，其获得你的所有技能。",
      jlsg_lianti: "炼体",
      jlsg_lianti2: "炼体",
      jlsg_lianti3: "炼体",
      jlsg_lianti4: "炼体",
      jlsg_lianti_info: "锁定技，你始终横置，其他角色于你的回合内第一次受到属性伤害后，你令其再受到一次等量同属性伤害。当你受到属性伤害后，你摸牌阶段摸牌数和手牌上限+1，然后减1点体力上限。",
      jlsg_huchi: '虎痴',
      jlsg_huchi_info: '出牌阶段，你可以视为使用【决斗】（不能被【无懈可击】响应），以此法受到伤害的角色摸三张牌。若有角色以此法进入濒死状态，或此【决斗】未造成伤害，此技能失效直到阶段结束。',
      jlsg_xiejia: '卸甲',
      jlsg_xiejia2: '卸甲',
      jlsg_xiejia_info: '锁定技，若你的装备区没有防具牌，你使用【杀】和【决斗】对其他角色造成的伤害+1。每当你从装备区失去防具后，你以此法造成的伤害额外+1。',
      jlsg_yanlie: "炎烈",
      jlsg_yanlie_info: "出牌阶段限一次，你可以弃置至少一张手牌并选择等量的其他角色，视为你对这些角色使用【铁索连环】，然后对一名横置角色造成1点火焰伤害。",
      jlsg_fengying: "锋影",
      jlsg_fengying_info: "当你摸一张牌前，你可以改为使用雷【杀】。每回合限四次。",
      jlsg_zhiti: "止啼",
      jlsg_zhiti2: "止啼",
      jlsg_zhiti3: "止啼",
      jlsg_zhiti_info: "当你对其他角色造成伤害时，你可以选择一项：1. 取其1点体力和体力上限；2. 取其摸牌阶段的一摸牌数。3.取其一个技能；4.令其不能使用装备牌；5.令其翻面。每项对每名其他角色限一次。",
      jlsg_wangyue: "望月",
      jlsg_wangyue_info: "当一名角色弃牌/失去体力/减体力上限后，你可以令另一名角色摸牌/回复体力/加体力上限，每项每回合限一次。",
      jlsg_luoyan: "落雁",
      jlsg_luoyan2: "落雁",
      jlsg_luoyan_info: "回合结束阶段，你可以选择一名角色。当其于出牌阶段内使用第一/二/三张牌后，其随机弃置一张牌/失去1点体力/减1点体力上限，直到你再次发动此技能。",
      jlsg_jieying: "劫营",
      jlsg_jieying2: "劫营",
      jlsg_jieying_info: "摸牌阶段，你可以放弃摸牌，然后令一名未拥有「劫营」标记的其他角色获得3枚「劫营」。拥有「劫营」标记的角色摸牌/回复体力/加体力上限/执行额外回合/获得技能前，你弃置其1枚「劫营」标记并改为由你执行此效果。",
      jlsg_jinlong: "锦龙",
      jlsg_jinlong_info: "锁定技，当装备牌被你获得或不因判定而进入弃牌堆后，将之置于你的武将牌上，然后你摸一张牌。你视为拥有这些装备牌的技能。",
      jlsg_jinlong_append: '<span style="font-family:yuanli">无法获得武器的攻击范围。坐骑的距离结算效果相加后结算。</span>',
      jlsg_liegong: '烈弓',
      jlsg_liegong2: '烈弓',
      jlsg_liegong3: '烈弓',
      jlsg_liegong_info: '你可以将任意花色各不相同的手牌当无距离和次数限制的火【杀】使用，若以此法使用的转化前的牌数不小于：1,此【杀】不能被【闪】响应；2,使用此【杀】后，你摸三张牌;3，此【杀】的伤害+1;4,此【杀】对目标角色造成伤害后，令其随机失去一个技能。每回合限一次，若你已受伤，改为每回合限两次。',
      jlsg_xingwu: '星舞',
      jlsg_xingwu2: '星舞',
      jlsg_xingwu_info: '游戏开始时，你可以令所有角色各获得一枚「星舞」标记，你可以重复此流程至多X次(X为你的体力)。一名角色的回合开始时，你可以弃置一张红桃牌，然后移动该角色的一枚「星舞」标记，或令其获得一枚「星舞」标记，若如此做，你可以令其失去所有因「星舞」获得的技能并重新获得。当角色获得“星舞”标记后，你令其回复1点体力，然后其随机获得一个与其性别不同的武将的技能。当角色失去「星舞」标记后，你令其失去1点体力，然后其随机失去一个与其性别相同的武将的技能。',
      jlsg_chenyu: '沉鱼',
      jlsg_chenyu_info: '锁定技，回合结束阶段，或当你受到伤害后，你获得其他角色手牌里的红桃牌。',
      jlsg_bamen: '八门',
      jlsg_bamen_info: '锁定技，出牌阶段开始时，你弃置所有手牌，然后摸八张牌名各不相同的牌，若你因牌堆缺少牌名而少摸牌，你可以对一名其他角色造成X点雷电伤害(X为以此法少摸的牌数)。',
      jlsg_gucheng: '孤城',
      jlsg_gucheng_info: '锁定技，其他角色使用基本牌或非延时锦囊牌指定你为目标后，若你没有使用过此牌，你令此牌对你无效。',
      jlsg_yingshi: '鹰视',
      jlsg_yingshi2: '鹰视',
      jlsg_yingshi3: '鹰视',
      jlsg_yingshi_tag: '鹰',
      jlsg_yingshi_info: '锁定技，分发起始手牌后，你随机获得一张基本牌，然后将手牌里的所有基本牌标记为“鹰”。每回合每名角色限一次，当你获得其他角色的牌后，若这些牌均为基本牌，你将这些牌标记为“鹰”。任意角色的回合结束时，你从牌堆、弃牌堆或其他角色手牌中获得所有“鹰”。你使用“鹰”无距离和次数限制。',
      jlsg_langxi: '狼袭',
      jlsg_langxi2: '狼袭',
      jlsg_langxi3: '狼袭',
      jlsg_langxi_info: '每种牌名限一次，游戏开始时/当你使用手牌里的非延时锦囊牌时，你可以将任意非延时锦囊牌的牌名/此牌名标记为“狼”。当你使用手牌里的非延时锦囊牌后，你可以视为对其中任意个目标依次使用所有“狼”。',
      jlsg_shenyin: '神隐',
      jlsg_shenyin2: '神隐',
      jlsg_shenyin3: '神隐',
      jlsg_shenyin_info: '锁定技，游戏开始时，你获得1枚「神隐」标记。回合开始时，若你拥有「神隐」标记，你可以记录你当前的体力、体力上限、技能、“鹰”和“狼”，然后获得1枚「神隐」标记。当你进入濒死状态时，或失去此技能后，若有记录的信息，你可以弃置所有「神隐」标记，将你恢复至记录的状态，并摸两倍弃置标记数的牌。当你杀死其他角色后，你获得一枚「神隐」标记。',
      jlsg_chuyuan: '储元',
      jlsg_chuyuan_info: '当任意角色使用【杀】/【闪】后，你可以摸两张牌然后将一张黑色/红色牌置于你的武将牌上，称为「储」。你每有一张黑色「储」和红色「储」，摸牌数和手牌上限+1。',
      jlsg_dengji: '登极',
      jlsg_dengji_info: "觉醒技，回合开始阶段，若你的「储」数为单数且不小于5，你获得所有「储」并失去〖储元〗；若以此法获得的黑色「储」多于红色「储」，你获得〖极权〗；否则你获得〖仁政〗。每以此法获得一张黑色「储」和红色「储」，你随机获得一个君主技。",
      jlsg_jiquan: '极权',
      jlsg_jiquan_info: '出牌阶段限一次，你可以令任意名其他角色各选择一项:1.交给你X张牌，若牌数不足则改为不交(X为你对其发动此技能的次数且至多为3) ; 2.交给你一个技能。然后若你的体力上限不大于目标的体力上限之和，你加1点体力上限并回复1点体力。',
      jlsg_renzheng: '仁政',
      jlsg_renzheng_backup: '仁政',
      jlsg_renzheng_info: '出牌阶段限一次，你可以将任意数量的手牌或技能交给一名其他角色，然后若该角色是第一次成为此技能的目标，你可以令你与其各加1点体力上限并回复1点体力。',

      jlsg_qinyin: '琴音',
      jlsg_qinyin1: '琴音',
      jlsg_qinyin2: '琴音',
      jlsg_yeyan: '业炎',
      jlsg_huju: '虎踞',
      jlsg_huju2: '虎踞',
      jlsg_hufu: '虎缚',
      jlsg_yanmie: '湮灭',
      jlsg_shunshi: '顺世',
      jlsg_junwang: '君望',
      jlsg_jizhao: '激诏',
      jlsg_jizhao_zhao: "<font color=Red>激诏</font>",
      jlsg_qixing: '七星',
      jlsg_kuangfeng: '狂风',
      jlsg_kuangfeng2: '狂风',
      jlsg_dawu: '大雾',
      jlsg_dawu2: '大雾',
      jlsg_yaozhi: '妖智',
      jlsg_yaozhi_use: '妖智',
      jlsg_xingyun: '星陨',
      jlsg_tongtian: '通天',
      jlsg_jilve: '极略',
      jlsg_jieyan: '劫焰',
      jlsg_jieyan_buff: "劫焰·摸牌",
      jlsg_fenying: '焚营',
      jlsg_kuangbao: '狂暴',
      jlsg_kuangbao1: '狂暴',
      jlsg_wumou: '无谋',
      jlsg_wuqian: '无前',
      jlsg_shenfen: '神愤',
      jlsg_wushen: '武神',
      jlsg_suohun: '索魂',
      jlsg_suohun2: '索魂',
      jlsg_juejing: '绝境',
      jlsg_longhun: '龙魂',
      jlsg_longhun1: '龙魂·桃',
      jlsg_longhun2: '龙魂·杀',
      jlsg_longhun3: '龙魂·无懈',
      jlsg_longhun4: '龙魂·闪',
      jlsg_old_nizhan: '逆战',
      jlsg_old_cuifeng: '摧锋',
      jlsg_old_weizhen: '威震',
      jlsg_nizhan: '逆战',
      jlsg_cuifeng: '摧锋',
      jlsg_weizhen: '威震',
      jlsg_weizhen2: '威震',
      jlsg_weizhen3: '威震',
      jlsg_zhiming: '知命',
      jlsg_suyin: '夙隐',
      jlsg_old_zhiming: '知命',
      jlsg_old_suyin: '夙隐',
      jlsg_dianjie: '电界',
      jlsg_dianjie2: '电界',
      jlsg_dianjie_buff: '电界·电击',
      jlsg_shendao: '神道',
      jlsg_leihun: '雷魂',
      jlsg_shelie: '涉猎',
      jlsg_gongxin: '攻心',
      jlsg_tianqi: '天启',
      jlsg_tianqi_shan: '天启',
      jlsg_tianqi_wuxie: '天启',
      jlsg_tianji: '天机',
      jlsg_xianzhu: '贤助',
      jlsg_xianzhu2: '贤助',
      jlsg_liangyuan: '良缘',
      jlsg_liangyuan2: '良缘',
      jlsg_tianzi: '天姿',
      jlsg_meixin: '魅心',
      jlsg_shayi: '杀意',
      jlsg_zhenhun: '震魂',
      jlsg_yinshi: '隐世',
      jlsg_zhitian: '知天',
      jlsg_zhiji: '掷戟',
      jlsg_zhiji_damage: '掷戟',
      jlsg_yuanhua: '元化',
      jlsg_guiyuan: '归元',
      jlsg_chongsheng: '重生',
      jlsg_old_lvezhen: '掠阵',
      jlsg_old_youlong: '游龙',
      jlsg_old_danjing: '啖睛',
      jlsg_old_danjing1: '啖睛',
      jlsg_old_danjing2: '啖睛',
      jlsg_old_zhonghun: '忠魂',
      jlsg_feiying: '飞影',
      jlsg_guixin: '归心',
      jlsg_old_dianjie: '电界',
      jlsg_old_shendao: '神道',

      jlsg_luocha: '罗刹',
      jlsg_luocha_info: '锁定技，游戏开始时，你随机获得三个与【杀】有关的技能；当其他角色进入濒死状态时，你摸两张牌，然后随机获得一个与【杀】有关的技能。',
      jlsg_shajue: '杀绝',
      jlsg_shajue_info: '出牌阶段限一次，你可以失去1点体力并选择一名其他角色，你将随机一张手牌当随机属性且无视防具的【杀】对其使用，重复此流程直到你失去这些手牌。',
      jlsg_guiqu: '鬼躯',
      jlsg_guiqu_backup: '鬼躯',
      jlsg_guiqu_info: '锁定技，你的手牌上限为你的技能数，当你处于濒死状态时，你可以失去一个技能，视为使用【桃】',
      jlsg_lihun: '离魂',
      jlsg_lihun_info: '回合结束时，你可以选择一名其他角色， 该角色进行一个由你操控的额外回合，且于此额外回合内使用牌可以选择任意名角色，可以选择任意角色为目标，无距离和次数限制。', // 可以使用任意装备牌发动赠予
      jlsg_jueshi: '绝世',
      jlsg_jueshi2: '绝世',
      jlsg_jueshi_info: '锁定技，你的体力上限始终为1点。当你进入濒死状态时，你随机使用所有角色手牌和牌堆里的【桃】/【酒】/【梅】，直到你脱离濒死状态。',
      jlsg_tiangong: '天工',
      jlsg_tiangong_info: '游戏开始/回合开始/回合结束时，你可以创造2/1/1个机关技能并令一名角色获得之。一名角色至多拥有七个机关技能。',
      jlsg_linglong: '玲珑',
      jlsg_linglong_info: '当其他角色令你受到伤害时/失去体力时/减体力上限前/失去技能前，你可以令你失去一个非初始技能，然后取消此效果;或令一名其他角色失去一个机关技能，然后将此效果转移给该角色（若效果为失去技能则改为取消效果）。',

      jlsg_feiying_info: '锁定技，若你的武将牌正面朝上，你使用【杀】无距离限制；若你的武将牌正面朝下，你不能成为【杀】的目标。',
      jlsg_guixin_info: '当你受到一次伤害后，你可以获得每名其他角色区域里的一张牌，再摸X张牌（X为阵亡/败退的角色数），然后翻面。',
      jlsg_qinyin_info: '你可以跳过弃牌阶段，然后摸/弃置两张牌，令所有角色各失去/回复1点体力，若你发动过〖业炎〗，可以再执行一次相同的失去/回复体力效果。',
      jlsg_yeyan_info: '限定技，出牌阶段，你可以弃置一至四张手牌，然后对至多X+1名角色各造成Y+1点火焰伤害(X/Y为以此法弃置的黑色/红色牌数)，若你以此法即将造成的总伤害不小于5点，你须先失去3点体力。',
      jlsg_huju_info: '锁定技，其他角色的回合开始时，你摸一张牌。你的回合开始时，若你的手牌数为最多（或之一），你选择一项：1、失去一点体力；2、减一点体力上限，失去〖虎踞〗，并获得技能〖制衡〗和〖虎缚〗。',
      jlsg_hufu_info: '出牌阶段限一次，你可以令一名其他角色弃置X张牌（X为其装备区的牌数）。',
      jlsg_yanmie_info: '出牌阶段，你可以弃置一张黑桃牌，令一名其他角色先弃置所有手牌再摸等量的牌并展示之。你弃置其中所有非基本牌，并对其造成等量的伤害。',
      jlsg_shunshi_info: '当你成为其他角色使用基本牌的目标后，你可以令你与除该角色以外的一至三名其他角色各摸一张牌，然后这些角色也成为此牌的目标。',
      jlsg_junwang_info: '锁定技，其他角色的出牌阶段开始时/出牌阶段结束时，若其手牌数不小于你，其须交给你一张手牌。',
      jlsg_jizhao_info: '出牌阶段对一名无标记的其他角色限一次，你可以交给其至少一张手牌，并令其获得一个「诏」标记；拥有「诏」标记的角色回合结束时，若其本回合内未造成过伤害，其受到你造成的一点伤害并失去「诏」标记。',
      jlsg_qixing_info: '分发起始手牌时，你将获得起始手牌改为观看牌堆顶十一张牌并获得其中4张手牌，然后将其余7张牌扣置于武将牌上，称为「星」；摸牌阶段结束时，你可以用一-三张手牌来替换一-二枚「星」',
      jlsg_kuangfeng_info: '回合开始阶段开始时，你可以将一张「星」置入弃牌堆，然后选择一名角色获得一枚「风」标记，若如此做，当其于你的下回合开始前受到火焰伤害时，该伤害+1；雷电伤害时，你令其弃置两张牌；普通伤害时，你摸一张牌置入「星」。',
      jlsg_dawu_info: '回合结束阶段开始时，你可以弃掉至少一张「星」，然后选择等量的角色获得「雾」标记，若如此做，当其于你的下回合开始前受到非雷电伤害时，你防止之。',
      jlsg_yaozhi_info: '准备阶段开始时/结束阶段开始时/当你受到伤害后/出牌阶段限一次，你可以摸一张牌，系统随机挑选三个能在对应时机发动的技能，然后你可以选择其中一个发动',
      jlsg_xingyun_info: '锁定技，回合结束后，你减1点体力上限，然后获得一个你发动〖妖智〗选择的技能',
      jlsg_tongtian_info: '限定技，出牌阶段你可以弃置任意花色不同的牌，然后根据以下技能获得相应技能：黑桃·反馈；红桃·观星；梅花·完杀；方片·制衡。',
      jlsg_jilve_info: '出牌阶段，你可以摸一张牌，然后选择一项：使用一张牌，或弃置一张牌。若你以此法弃置牌，则本回合此技能失效。',
      jlsg_jieyan_info: '当一张红色【杀】或红色普通锦囊牌仅指定一名角色为目标后，你可以弃置一张手牌令其无效，然后对目标角色造成一点火焰伤害。',
      jlsg_fenying_info: '当一名角色受到火焰伤害后，你可以摸一张牌，然后你可以弃置X张牌(X为你于本回合内发动此技能的次数)，然后对该角色或与其距离最近的一名角色造成等量的火焰伤害。',
      jlsg_kuangbao_info: '锁定技，游戏开始时，你获得2枚「暴」标记。每当你造成或受到伤害时，你获得等量的「暴」标记。',
      jlsg_wumou_info: '锁定技，当你使用非延时锦囊牌时，你须选择一项：1，弃置一枚「暴」标记；2，受到一点伤害。',
      jlsg_wuqian_info: '出牌阶段：你可以弃置2枚「暴」标记，若如此做，本回合内你视为拥有技能【无双】且你造成伤害后额外获得一枚「暴」标记。',
      jlsg_shenfen_info: '出牌阶段，弃6个暴怒标记，你对每名其他角色各造成一点伤害，其他角色先弃掉各自装备区里所有的牌，再各弃4张手牌，然后将你的武将牌翻面，每回合限一次。',
      jlsg_wushen_info: '锁定技，你的【杀】和【桃】均视为【决斗】。你对神势力角色造成的伤害+1。',
      jlsg_suohun_info: '锁定技，当你对其他角色造成伤害后，或当你受到其他角色造成的1点伤害后，其获得一个「魂」标记。当你进入濒死状态时，减一半(向上取整)的体力上限并恢复体力至体力上限，拥有「魂」标记的角色依次弃置所有的「魂」标记，然后受到与弃置的「魂」标记数量相同的伤害。',
      jlsg_juejing_info: '锁定技，你的体力不能大于1点，你的手牌上限为体力上限。当你进入或脱离濒死状态时，你摸两张牌。',
      jlsg_longhun_info: '你可以将一至两张牌按下列规则使用或打出:红桃当【桃】，方块当火【杀】，梅花当【闪】,黑桃当【无懈可击】。若你以此法使用的牌为两张:使用的【桃】令目标角色加1点体力上限，使用的火【杀】额外结算两次，使用的【闪】令此【杀】的使用者随机弃置两张牌，使用的【无懈可击】不能被响应且你获得被响应的牌。',
      jlsg_old_nizhan_info: '每当一名角色受到【杀】或【决斗】造成的一次伤害后，你可以将一枚「袭」标记放置在该角色或伤害来源(不为你)的武将牌上；锁定技，你的身份为“主公”时，不增加体力上限。',
      jlsg_old_cuifeng_info: '锁定技，回合结束阶段，若场上的「袭」标记总数不小于4，你须依次从每名被标记的角色处获得等同于其「袭」标记数量的手牌。若该角色手牌不足，则你获得其全部手牌，然后该角色受到你对其造成的一点伤害。最后移除场上全部的「袭」标记。',
      jlsg_old_weizhen_info: '回合开始阶段，你可以移除场上全部的「袭」标记，然后摸等同于「袭」标记数量的牌。',
      jlsg_nizhan_info: '锁定技，场上每名角色的准备阶段开始时，若其已受伤，其获得一枚「逆」标记，否则其弃置一枚「逆」标记',
      jlsg_cuifeng_info: '出牌阶段限一次，你可以移动场上的一枚「逆」，然后视为失去「逆」的角色对获得「逆」的角色使用一张不计入次数限制的【杀】。',
      jlsg_weizhen_info: '锁定技，若一名角色的「逆」数至少为：1，你摸牌阶段摸牌数+1；2，其摸牌阶段摸牌数-1；3，你对其造成的伤害+1；4，其非锁定技无效。',
      jlsg_old_zhiming_info: '其他角色的回合开始阶段开始时，若其有手牌，你可以弃置一张手牌，然后弃置其一张手牌，若两张牌颜色相同，你令其跳过此回合的摸牌阶段或出牌阶段。',
      jlsg_old_suyin_info: '你的回合外，当你失去最后的手牌时，可令一名其他角色将其武将牌翻面。',
      jlsg_zhiming_info: '出牌阶段限一次， 你可以选择至多X名其他角色(X为你的体力)，然后你依次选择是否失去1点体力、翻面、弃置任意张牌(不能选择上个出牌阶段以此法执行过的效果) ,若如此做，这些角色与你执行相同的效果。',
      jlsg_suyin_info: '当你失去所有手牌后，你可以令一名角色翻面，若有角色以此法翻回正面，你令其回复所有体力。',
      jlsg_mod_dianjie_info: '你的回合外，当你使用或打出一张【闪】后，或你主动跳过出牌阶段后：你可以进行一次判定，若为黑色，你对一名角色造成1点雷电伤害；若为红色，你可以令一至二名未横置的角色横置。',
      jlsg_dianjie_info: '你可以跳过你的摸牌阶段或出牌阶段，然后判定：若结果为黑色，你对一名角色造成2点雷电伤害；若结果为红色，你令至多两名武将牌未横置的角色将其武将牌横置。',
      jlsg_mod_shendao_info: '锁定技，对一名角色的判定牌生效前，你亮出牌堆顶的两张牌，选择其中一张直接代替之，若不是你的回合，你将另一种牌收入手牌。',
      jlsg_shendao_info: '一名角色的判定牌生效前，你可以打出一张手牌或用场上的牌代替之，然后获得原判定牌。',
      jlsg_leihun_info: '锁定技，你受到的雷电伤害均视为体力恢复。',
      jlsg_old_shelie_info: '锁定技，摸牌阶段开始时，你跳过之，改为选择指定获得某种类型的牌（最多四次），然后从牌堆随机摸取之。',
      jlsg_old_gongxin_info: '出牌阶段限一次，你可以观看一次任意一名角色的手牌并展示其中所有的红桃牌，然后若展示的牌数：为一，你弃置之并对其造成一点伤害；大于一，你获得其中一张红桃牌。',
      jlsg_shelie_info: '锁定技，当你使用牌后，你从牌堆随机获得两张与此牌类别不同的牌，每回合每种类别限一次。',
      jlsg_gongxin_info: '出牌阶段限一次，你可以观看一名其他角色的手牌并获得其中一张，然后你可以弃置另一张花色不同的牌，若如此做，该角色于本回合内不能使用或打出剩余两种花色的手牌。',
      jlsg_tianqi_info: '你的濒死状态除外，每当你需要使用或打出一张基本牌或非延时锦囊牌时，你可以声明之，然后亮出牌堆顶的一张牌，并将此牌当你所述之牌使用或打出，若其与你所述之牌不为同一类别，你须先失去一点体力。（但出牌阶段仅限一次。）',
      jlsg_tianji_info: '任一角色的出牌阶段开始时，你可以观看牌堆顶的一张牌，然后你可以选择一项：用一张手牌替换之；若你的手牌数不是全场最多的(或之一)，你可以获得之。',
      jlsg_xianzhu_info: '当一名角色恢复体力后，或失去一张装备区里的牌后，你可以令其摸两张牌。',
      jlsg_liangyuan_info: '限定技，出牌阶段，你可以选择一名其他男性角色，则于本局游戏中，你的自然回合结束时，该角色进行一个额外的回合。',
      jlsg_tianzi_info: '摸牌阶段开始时，你可以放弃摸牌，然后令所有其他角色依次选择一项：1、交给你一张牌；2、令你摸一张牌。',
      jlsg_meixin_info: '出牌阶段限一次，你可以弃置一张牌并选择一名其他男性角色，若如此做，本阶段当你使用一张基本牌后，你令其弃置一张牌；当你使用一张锦囊牌后，你获得其一张牌；当你使用一张装备牌后，你对其造成一点伤害。',
      jlsg_shayi_info: '锁定技，出牌阶段开始时，你展示所有手牌，若有【杀】，你摸一张牌；若没有【杀】，你于本阶段可以将一张黑色牌当【杀】使用。你使用【杀】无距离限制、无次数限制。',
      jlsg_zhenhun_info: '出牌阶段限一次，你可以弃置一张牌令所有其他角色的非锁定技于本阶段内无效。',
      jlsg_zhitian_info: "锁定技,你的回合开始时,系统从剩余武将堆随机挑选三张,你须选择其中一个技能,然后将所有手牌交给一名角色,并令该角色获得此技能,然后该角色失去一点体力.",
      jlsg_yinshi_info: '锁定技，当你受到伤害时，你摸等同于此伤害值数量的牌，然后若此伤害不为雷电伤害，你防止之。',
      jlsg_zhiji_info: '出牌阶段限一次，你可以弃置至少一张武器牌，然后对一名其他角色造成等同于此次弃置武器牌数点伤害。当你受到伤害后，你可以从弃牌堆或牌堆随机获得一张武器牌。',
      jlsg_yuanhua_info: '锁定技，你获得【桃】后，若你已受伤，你回复1点体力并摸两张牌，然后将此【桃】移出游戏。',
      jlsg_guiyuan_info: '出牌阶段限一次，你可以失去一点体力，然后令所有其他角色依次交给你一张【桃】，然后从牌堆或弃牌堆获得一张【桃】。',
      jlsg_chongsheng_info: '限定技，一名角色进入濒死状态时，你可以令其将体力上限调整至X并回复所有体力，然后其可以从随机三张同势力武将牌中选择一张替换之。（X为你发动〖元化〗移除牌的数量且至少为1）',
      jlsg_old_lvezhen_info: '当你使用【杀】指定目标后，你可以将牌堆顶的3张牌置入弃牌堆，其中每有一张非基本牌，你弃置目标角色一张牌。',
      jlsg_old_youlong_info: '出牌阶段，若弃牌堆的牌数多于牌堆，你可以将黑色手牌当【顺手牵羊】使用。',
      jlsg_old_danjing_info: '出牌阶段限一次，你可以失去1点体力，然后令一名其他角色摸三张牌或弃置三张牌。',
      jlsg_old_zhonghun_info: '限定技，当你死亡时，你可以令一名其他角色获得你当前的所有技能。',

      jlsg_qifeng: "栖凤",
      jlsg_qifeng_info: "锁定技，当你进入濒死状态时，你减1点体力上限，回复体力至1点，摸0张牌，然后对一名其他角色造成0点火焰伤害。",
      jlsg_lunce: "论策",
      jlsg_lunce_info: "轮次开始时，你可以令一名角色获得一项计策。当任意角色完成计策后，你加1点体力上限并修改“栖凤”",
      jlsg_lunce_append: '<span style="font-family: yuanli">任意角色完成下策后，修改摸牌数+1<br>任意角色完成中策后，修改回复体力+1<br>任意角色完成上策后，修改造成的火焰伤害+1</span>',
      jlsg_qianyuan: "潜渊",
      jlsg_qianyuan_info: "当你受到未记录的负面效果前，你可以令此效果对你无效，然后获得1枚“潜渊”标记并记录此负面效果。每回合限X次（X为存活角色数），当你受到已记录的负面效果前，你可以将此负面效果随机改为另一种负面效果。",
      jlsg_hualong: "化龙",
      jlsg_hualong_info: "回合开始阶段，你可以选择一名其他角色并弃置所有“潜渊”标记，令其执行这些标记记录的负面效果(负面效果的数值为本次弃置的标记数)，然后将你的各项属性和最小手牌数改为X（X为以此法弃置的标记总数）",
      jlsg_zhuxing: "逐星",
      jlsg_zhuxing_info: "每回合限两次，当任意角色使用出牌阶段可以使用的非转化的实体牌或非延时锦囊牌时，你可以将之置于一名角色的武将牌上，称为“逐星”牌，然后你可以令当前使用的牌无效。一名角色的回合开始时，你可以视为对其依次使用其武将牌上的所有“逐星”牌。",
      jlsg_lingze: "灵泽",
      jlsg_lingze_info: "任意角色的出牌阶段开始时，或受到伤害时，若其有“逐星”牌，你可以将其中一张置于牌堆顶，令其进行一次“许愿”。",
      jlsg_hanshuang: "寒霜",
      jlsg_hanshuang_info: "当任意角色受到伤害时，你可以令其摸X张牌并令此伤害+X，或令其弃置x张牌并令此伤害-X(X为此技能本轮对其发动的次数）。",
      jlsg_liluan: "离乱",
      jlsg_liluan_info: "每回合限一次，你可以将任意角色的弃置牌改为其以外的所有角色各随机弃置一张牌，或将任意角色的摸牌改为其以外的所有角色各摸一张牌。",
      jlsgsoul_sp_guanyu: "SP神关羽",
      jlsg_zhanyue: "斩月",
      jlsg_zhanyue_info: "当你使用【杀】仅指定一名其他角色为目标后，你可以令1-2名与其相连且不为你的其他角色也成为目标，然后令此【杀】无视防具、不计入次数限制且造成的伤害改为目标角色一半的体力值（向上取整），此【杀】结算后，你摸此【杀】造成伤害总数的牌。",
      jlsg_fengtian: "封天",
      jlsg_fengtian_info: "其他角色的回合开始时，你可以弃置一张牌，若如此做，该角色于本回合内首次摸牌、弃牌或使用每种牌名的牌后，你视为对其使用【杀】，若你弃置的牌为【杀】，你令其所有技能失效，上述效果持续至本回合结束或其对你造成伤害。",
    },
    dynamicTranslate: {
      jlsg_xiejia: function (player) {
        let cnt = player.countMark('jlsg_xiejia');
        if (!cnt) {
          return lib.translate.jlsg_xiejia_info;
        }
        return `锁定技，若你的装备区没有防具牌，你使用【杀】和【决斗】对其他角色造成的伤害+<span class="bluetext">+${1 + cnt}</span>。每当你从装备区失去防具后，你以此法造成的伤害额外+1。`;
      },
      jlsg_qianyuan: function (player) {
        let str = "当你受到未记录的负面效果前，你可以令此效果对你无效，然后获得1枚“潜渊”标记并记录此负面效果。每回合限X次（X为存活角色数），当你受到已记录的负面效果前，你可以将此负面效果随机改为另一种负面效果。"
        if (lib.config.extension_极略测试_jlsgsoul_sp_zhaoyun) return "锁定技，" + str;
        return str;
      },
      jlsg_qifeng: function (player) {
        const [recover, draw, damage] = (player?.storage?.jlsg_qifeng ?? [1, 0, 0]);
        return `锁定技，当你进入濒死状态时，你减1点体力上限，回复体力至${recover}点，摸${draw}张牌，然后对一名其他角色造成${damage}点火焰伤害。`
      },
    }
  };
  postProcessPack(jlsg_soul);
  return jlsg_soul;
}