import { lib, game, ui, get, ai, _status } from '../../../../noname.js';
import postProcessPack from './postProcessPack.js';
export default function () {
  var jlsg_sr = {
    name: 'jlsg_sr',
    connect: true,
    character: {
      jlsgsr_zhangliao: ['male', 'wei', 4, ['jlsg_wuwei', 'jlsg_yansha'], []],
      jlsgsr_xiahoudun: ['male', 'wei', 4, ['jlsg_zhonghou', 'jlsg_ganglie'], ['name:夏侯|惇']],
      // jlsgsr_zhenji: ['female', 'wei', 3, ['jlsg_liuyun', 'jlsg_lingbo', 'jlsg_qingcheng_zhu'], []],
      jlsgsr_zhenji: ['female', 'wei', 3, ['jlsg_liuyun', 'jlsg_lingbo', 'jlsg_qingcheng'], []],
      jlsgsr_xuzhu: ['male', 'wei', 4, ['jlsg_aozhan', 'jlsg_huxiao'], []],
      jlsgsr_simayi: ['male', 'wei', 3, ['jlsg_guicai', 'jlsg_langgu', 'jlsg_zhuizun'], []],
      jlsgsr_guojia: ['male', 'wei', 3, ['jlsg_tianshang', 'jlsg_yiji', 'jlsg_huiqu'], []],
      jlsgsr_caocao: ['male', 'wei', 4, ['jlsg_zhaoxiang', 'jlsg_zhishi', 'jlsg_jianxiong'], ['zhu',]],
      jlsgsr_zhaoyun: ['male', 'shu', 4, ['jlsg_jiuzhu', 'jlsg_tuwei'], []],
      jlsgsr_zhangfei: ['male', 'shu', 4, ['jlsg_xujin', 'jlsg_paoxiao'], []],
      jlsgsr_machao: ['male', 'shu', 4, ['jlsg_benxi', 'jlsg_yaozhan'], []],
      jlsgsr_guanyu: ['male', 'shu', 4, ['jlsg_wenjiu', 'jlsg_shuixi'], []],
      jlsgsr_zhugeliang: ['male', 'shu', 3, ['jlsg_sanfen', 'jlsg_guanxing', 'jlsg_weiwo'], ['name:诸葛|亮']],
      jlsgsr_huangyueying: ['female', 'shu', 3, ['jlsg_shouji', 'jlsg_hemou', 'jlsg_qicai'], []],
      jlsgsr_liubei: ['male', 'shu', 4, ['jlsg_rende', 'jlsg_chouxi', 'jlsg_yongbing'], ['zhu',]],
      jlsgsr_sunshangxiang: ['female', 'wu', 3, ['jlsg_yinmeng', 'jlsg_xiwu', 'jlsg_juelie'], []],
      jlsgsr_daqiao: ['female', 'wu', 3, ['jlsg_fangxin', 'jlsg_xiyu', 'jlsg_wanrou'], ['name:桥|null']],
      jlsgsr_huanggai: ['male', 'wu', 4, ['jlsg_zhouyan', 'jlsg_zhaxiang'], []],
      jlsgsr_lvmeng: ['male', 'wu', 4, ['jlsg_shixue', 'jlsg_guoshi'], []],
      jlsgsr_zhouyu: ['male', 'wu', 3, ['jlsg_yingcai', 'jlsg_weibao', 'jlsg_choulve'], []],
      jlsgsr_ganning: ['male', 'wu', 4, ['jlsg_jiexi', 'jlsg_youxia'], []],
      jlsgsr_luxun: ['male', 'wu', 3, ['jlsg_dailao', 'jlsg_youdi', 'jlsg_ruya'], []],
      jlsgsr_sunquan: ['male', 'wu', 4, ['jlsg_quanheng', 'jlsg_xionglve', 'jlsg_fuzheng'], ['zhu',]],
      jlsgsr_lvbu: ['male', 'qun', 4, ['jlsg_jiwu', 'jlsg_sheji'], []],
      jlsgsr_huatuo: ['male', 'qun', 3, ['jlsg_xingyi', 'jlsg_guagu', 'jlsg_wuqin'], []],
      jlsgsr_diaochan: ['female', 'qun', 3, ['jlsg_lijian', 'jlsg_manwu', 'jlsg_baiyue'], ['name:null|null']],
    },
    characterIntro: {},
    skill: {

      _jlsgsr_choice: {
        // mode: ["boss", "brawl", "chess", "connect", "doudizhu", "guozhan", "identity", "realtime", "single", "stone", "tafang", "versus"],
        trigger: {
          global: "gameStart",
          player: "enterGame",
        },
        forced: true,
        popup: false,
        unique: true,
        silent: true,
        filter: function (event, player) {
          // if (player == game.me) return false;
          if (!lib.config.extension_极略_srlose) return false;

          if (get.itemtype(player) != 'player') return false;
          var names = [];
          if (player.name) names.add(player.name);
          if (player.name1) names.add(player.name1);
          if (player.name2) names.add(player.name2);
          for (var i = 0; i < names.length; i++) {
            if (names[i].indexOf('jlsgsr_') == 0) return true;
          }
          return false;
        },
        createList: function (name) {
          var list = [];
          var info = get.character(name);
          if (info) {
            var skills = info[3];
            for (var j = 0; j < skills.length; j++) {
              if (lib.translate[skills[j] + '_info'] && lib.skill[skills[j]] && lib.skill[skills[j]].srlose) {
                list.push(skills[j]);
              }
            }
          }
          return list;
        },
        content: function () {
          'step 0'
          event.names = [];
          if (player.name) event.names.add(player.name);
          if (player.name1) event.names.add(player.name1);
          if (player.name2) event.names.add(player.name2);
          'step 1'
          for (var i = 0; i < event.names.length; i++) {
            if (event.names[i].indexOf('jlsgsr_') == 0) {
              event.deleting = event.names[i];
              event.names.remove(event.deleting);
              var list = lib.skill._jlsgsr_choice.createList(event.deleting);
              var str = '';
              for (i = 0; i < list.length; i++) {
                str += '<div class="text" style="width:90%;display:inline-block"><div class="skill"><font color="#FFFF00"><span style="font-size:20px">【' +
                  get.translation(list[i]) + '】</font></span></div><div><font color="#9AFF02"><span style="font-size:17px">' + lib.translate[list[i] + '_info'] + '</font></span></div></div><br><br><br>';
              }
              player.chooseControl(list, function (event, player) {
                return list.randomGet();
              }).prompt = '选择' + get.translation(event.deleting) + '禁用1个技能<br><br>' + str;
              event.goto(2);
            }
          }
          'step 2'
          player.removeSkill(result.control);
          if (get.mode() == 'guozhan') {
            get.character(event.deleting)[3].remove(result.control);
            player.hiddenSkills.remove(result.control);
            player.removeSkillTrigger(result.control);
          }
          player.checkMarks();
          'step 3'
          for (var i = 0; i < event.names.length; i++) {
            if (event.names[i].indexOf('jlsgsr_') == 0) {
              event.deleting = event.names[i];
              event.names.remove(event.deleting);
              var list = lib.skill._jlsgsr_choice.createList(event.deleting);
              var str = '';
              for (i = 0; i < list.length; i++) {
                str += '<div class="text" style="width:90%;display:inline-block"><div class="skill"><font color="#FFFF00"><span style="font-size:20px">【' +
                  get.translation(list[i]) + '】</font></span></div><div><font color="#9AFF02"><span style="font-size:17px">' + lib.translate[list[i] + '_info'] + '</font></span></div></div><br><br><br>';
              }
              player.chooseControl(list, function (event, player) {
                return list.randomGet();
              }).prompt = '选择' + get.translation(event.deleting) + '禁用1个技能<br><br>' + str;
              event.goto(2);
            }
          }
        },
      },
      jlsg_wuwei: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'phaseDrawBegin' },
        priority: -1,
        check: function (event) {
          return event.num <= 3;
        },
        // prompt: '是否发动技能【无畏】，展示牌中每有一张基本牌便可视为对一名角色使用一张【杀】（每名角色限一次）',
        content: function () {
          'step 0'
          trigger.cancel();
          event.cards = game.cardsGotoOrdering(get.cards(3)).cards;
          player.showCards(event.cards);
          'step 1'
          event.lose = 0;
          for (var i = 0; i < event.cards.length; i++) {
            if (get.type(event.cards[i], 'trick') == 'basic') {
              event.lose++;
            }
          }
          if (event.lose > 0 && game.hasPlayer(function (cur) {
            return lib.filter.targetEnabled({ name: 'sha' }, player, cur);
          })) {
            var next = player.chooseCardButton('请选择无畏视为使用【杀】弃置的牌', event.cards);
            next.ai = function (button) {
              if (jlsg.isWeak(player)) {
                return button.link.name != 'du' || button.link.name != 'tao';
              }
              return 8 - get.value(button.link);
            }
            next.filterButton = function (button) {
              return get.type(button.link) == 'basic';
            }
          } else {
            player.gain(event.cards, 'gain2');
            event.finish();
          }
          'step 2'
          if (result.bool) {
            event.cards1 = result.links[0];
            player.chooseTarget('请选择无畏的目标', function (card, player, target) {
              return lib.filter.targetEnabled({ name: 'sha' }, player, target);
            }).set('ai', function (target) {
              if (jlsg.isEnemy(player, target)) {
                return 10 - jlsg.getDefenseSha(target, player);
              }
              return false;
            });
          } else {
            player.gain(event.cards, 'gain2');
            event.finish();
          }
          'step 3'
          if (result.bool) {
            player.useCard({ name: 'sha', suit: 'none', number: null }, result.targets, [event.cards1], false);
            event.cards.remove(event.cards1);
            event.goto(1);
          } else {
            player.gain(event.cards, 'gain2');
            event.finish();
          }
        },
        ai: {
          threaten: 1.5,
          // expose: 0.2,
        }
      },
      jlsg_yansha: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: { player: 'phaseDrawBefore' },
        check: function (event, player) {
          if (Math.min(3, player.hp) < player.countCards('h') && player.skipList.includes('phaseUse') && !player.skipList.includes('phaseDiscard')) return true;
          return (3 - player.getExpansions('jlsg_yansha2').length) && player.countCards('h') > 1;
        },
        content: function () {
          trigger.num--;
          player.addTempSkill('jlsg_yansha_cards', 'phaseAfter');
        },
        group: ['jlsg_yansha2'],
        subSkill: {
          cards: {
            trigger: { player: 'phaseDiscardBegin' },
            filter: function (event, player) {
              return player.countCards('h') > 0;
            },
            direct: true,
            content: function () {
              'step 0'
              var next = player.chooseCard(`###${get.prompt(event.name)}###将一张手牌牌置于武将牌上作为「掩」`, 'h');
              next.ai = function (card) {
                return 7 - get.value(card);
              };
              'step 1'
              if (result.bool) {
                player.logSkill('jlsg_yansha');
                player.addToExpansion(result.cards, player, 'give').gaintag.add('jlsg_yansha2');
              }
            }
          }
        }
      },
      jlsg_yansha2: {
        audio: "ext:极略/audio/skill:true",
        trigger: { global: 'shaBegin' },
        filter: function (event, player) {
          return event.player != player && player.getExpansions('jlsg_yansha2').length > 0 && event.player.countCards('he') > 0;
        },
        logTarget: 'player',
        check: function (event, player) {
          if (event.player.countCards('he') > 1 && get.attitude(player, event.player) < 0) return 2;
          if (get.attitude(player, event.target) > 0) {
            if (event.target.isDamaged() && event.target.getEquip('baiyin')) return 2;
            if (!event.target.countCards('h') && event.player.countCards('he') > 0) return 1;
          }
          if (get.attitude(player, event.player) < 0) {
            if (!player.get('e', '1') && event.player.get('e', '1')) return 1;
            if (!player.get('e', '2') && event.player.get('e', '2')) return 1;
            if (!player.get('e', '3') && event.player.get('e', '3')) return 1;
            if (!player.get('e', '4') && event.player.get('e', '4')) return 1;
            if (!player.get('e', '5') && event.player.get('e', '5')) return 3;
          }
          return 0;
        },
        content: function () {
          "step 0"
          var att = get.attitude(player, trigger.player);
          player.chooseCardButton('掩杀', player.getExpansions('jlsg_yansha2'), true);
          "step 1"
          if (result.bool) {
            var cards = result.links;
            player.discard(cards);
            if (trigger.player.countCards('he')) {
              player.gainPlayerCard(trigger.player, 2, 'he', true);
            }
          }
        },
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
      },
      jlsg_liuyun: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filterCard: function (card) {
          return get.color(card) == 'black';
        },
        position: 'he',
        filter: function (event, player) {
          return player.num('he', { color: 'black' }) > 0 && !player.isLinked();
        },
        check: function (card) {
          return 8 - ai.get.value(card)
        },
        prompt: '弃置一张黑色牌，令一名角色选择一项：回复一点体力或摸两张牌',
        filterTarget: true,
        content: function () {
          'step 0'
          player.link();
          event.target = target;
          if (target.hp == target.maxHp) {
            target.draw(2);
            event.finish();
          }
          else {
            var controls = ['draw_card'];
            if (target.hp < target.maxHp) {
              controls.push('recover_hp');
            }
            target.chooseControl(controls).ai = function () {
              if (target.hp == 1 && target.maxHp > 2) {
                return 'recover_hp';
              }
              else if (target.hp == 2 && target.maxHp > 2 && target.num('h') > 1) {
                return 'recover_hp';
              }
              else {
                return 'draw_card';
              }
            }
          }
          "step 1"
          event.control = result.control;
          switch (event.control) {
            case 'recover_hp': event.target.recover(); event.finish(); break;
            case 'draw_card': event.target.draw(2); event.finish(); break;
          }
        },
        ai: {
          expose: 0.2,
          order: 9,
          result: {
            player: function (player) {
              if (player.num('h') > player.hp) return 1;
              if (jlsg.hasLoseHandcardEffective(player)) return 2;
              return -1;
            },
            target: function (player, target) {
              if (jlsg.isWeak(target)) return 5;
              return 2;
            }
          },
          threaten: 1.5
        }
      },
      jlsg_lingbo: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'phaseBegin' },
        direct: true,
        filter: function (event, player) {
          if (!player.isLinked()) return false;
          var num = 0;
          for (var i = 0; i < game.players.length; i++) {
            num += game.players[i].num('ej');
          }
          return num > 0;
        },
        content: function () {
          'step 0'
          player.chooseTarget('###是否发动【凌波】？###将场上的一张牌置于牌堆顶', function (card, player, target) {
            return target.num('ej') > 0;
          }).set("ai", function (target) {
            if (ai.get.attitude(player, target) > 0) return target.num('j');
            if (ai.get.attitude(player, target) < 0) return target.num('e');
            return 0;
          })
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_lingbo');
            if (player.isLinked()) player.link();
            event.target = result.targets[0];
          }
          else {
            event.finish();
          }
          'step 2'
          player.choosePlayerCard('将目标的一张牌置于牌堆顶', event.target, 'ej', true);
          'step 3'
          event.card = result.links[0];
          if (!event.card) {
            event.finish(); return;
          }
          event.target.lose(event.card, ui.cardPile, 'insert', 'visible');
          event.target.$throw(1, 1000);
          game.log(player, '将', event.card, '置于牌堆顶');
          'step 4'
          if (event.target == game.me) game.delay(0.5);
          // if (event.card) {
          //   event.card.fix();
          //   ui.cardPile.insertBefore(event.card, ui.cardPile.firstChild);
          // }
        },
        ai: {
          effect: {
            target: function (card) {
              if (card.name == 'tiesuo') return 0.5;
            }
          }
        }
      },
      jlsg_qingcheng: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: ['chooseToUse', 'chooseToRespond'],
        filterCard: function () { return false; },
        selectCard: -1,
        viewAs: { name: 'sha' },
        viewAsFilter: function (player) {
          return !player.isLinked();
        },
        prompt: '横置你的武将牌，视为打出一张杀',
        check: () => 1,
        onuse: function (result, player) {
          player.link();
        },
        onrespond: function (result, player) {
          if (!player.isLinked()) player.link();
        },
        ai: {
          skillTagFilter: function (player) {
            return !player.isLinked();
          },
          respondSha: true,
        },
        group: ['jlsg_qingcheng2']
      },
      jlsg_qingcheng2: {
        audio: "ext:极略/audio/skill:1",
        enable: ['chooseToUse', 'chooseToRespond'],
        filterCard: function () { return false; },
        selectCard: -1,
        viewAs: { name: 'shan' },
        viewAsFilter: function (player) {
          return player.isLinked();
        },
        prompt: '重置你的武将牌，视为打出一张闪',
        check: () => 1,
        onrespond: function (result, player) {
          if (player.isLinked()) player.link(false);
        },
        onuse: function (result, player) {
          return this.onrespond.apply(this, arguments);
        },
        ai: {
          skillTagFilter: function (player) {
            return player.isLinked();
          },
          respondShan: true,
        }
      },
      // jlsg_lingbo: {
      //   audio: "ext:极略/audio/skill:1",
      //   srlose: true,
      //   group: ['jlsg_lingbo1', 'jlsg_lingbo2'],
      // },
      // jlsg_lingbo1: {
      //   trigger: {
      //     global: "phaseEnd",
      //   },
      //   filter: function (event, player) {
      //     return player.countCards('e') > 0 && event.player != player && player.isLinked();
      //   },
      //   check: function (event, player) {
      //     return get.attitude(player, event.player) > 0;
      //   },
      //   content: function () {
      //     'step 0'
      //     player.chooseCard('e', 1, true).set('ai', function (card) {
      //       var sub = get.subtype(card);
      //       if (_status.event.player.isEmpty(sub)) return -10;
      //       return get.unuseful(card);
      //     });
      //     'step 1'
      //     if (result.bool) {
      //       trigger.player.equip(result.cards[0]);
      //       player.$give(result.cards, trigger.player);
      //     }
      //     'step 2'
      //     if (player.isLinked()) player.link();
      //   },
      // },
      // jlsg_lingbo2: {
      //   trigger: {
      //     global: "phaseBegin",
      //   },
      //   filter: function (event, player) {
      //     var card = ui.selected.cards[0];
      //     if (!card) return false;
      //     if (get.position(card) == 'e' && !target.isEmpty(get.subtype(card))) return false;
      //     return event.player != player && event.player.countCards('ej') > 0 && !player.isLinked();
      //   },
      //   check: function (event, player) {
      //     return get.attitude(player, event.player) > 0;
      //   },
      //   content: function () {
      //     "step 0"
      //     var List = [];
      //     List.push(trigger.player.getCards('ej'));
      //     player.chooseButton(List, 1, true).set('ai', function (button) {
      //       //if(get.attitude(player,trigger.player)<=0){
      //       //if(get.type(button.link)=='equip')  return 10;
      //       //return 0;
      //       //}
      //       //else if(get.attitude(player,trigger.player)>=3){
      //       //if(get.type(button.link)=='delay')  return 10;
      //       //return 0;
      //       //}
      //       if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('lebu') && get.type(button.link) == 'equip') return get.suit(card) == 'heart';
      //       if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('bingliang') && get.type(button.link) == 'equip') return get.suit(card) == 'club';
      //       if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('shandian') && get.type(button.link) == 'equip') return (get.suit(card) != 'spade' || (card.number < 2 || card.number > 9));
      //       if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('lebu') && get.type(button.link) == 'equip') return get.suit(card) != 'heart';
      //       if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('bingliang') && get.type(button.link) == 'equip') return get.suit(card) != 'club';
      //       if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('shandian') && get.type(button.link) == 'equip') return (get.suit(card) == 'spade' && card.number >= 2 && card.number <= 9);
      //       return 0;
      //     });
      //     "step 1"
      //     if (result.bool) {
      //       ui.cardPile.insertBefore(result.links[0], ui.cardPile.firstChild);
      //     }
      //     "step 2"
      //     if (!player.isLinked()) player.link();
      //   },
      // },
      // jlsg_liuyun: {
      //   audio: "ext:极略/audio/skill:2",
      //   srlose: true,
      //   enable: 'phaseUse',
      //   usable: 1,
      //   filterCard: function (card) {
      //     return get.color(card) == 'black';
      //   },
      //   position: 'he',
      //   filter: function (event, player) {
      //     return player.countCards('he', { color: 'black' }) > 0 && !player.isLinked();
      //   },
      //   check: function (card) {
      //     return 8 - get.value(card)
      //   },
      //   prompt: '弃置一张黑色牌，令一名角色选择一项：恢复1点体力或摸两张牌',
      //   filterTarget: true,
      //   content: function () {
      //     player.link();
      //     target.chooseDrawRecover(2, true);
      //   },
      //   ai: {
      //     expose: 0.2,
      //     order: 9,
      //     result: {
      //       player: function (player) {
      //         if (player.countCards('h', function (card) {
      //           return get.color(card) == 'black';
      //         }) > player.hp) return 1;
      //         return -1;
      //       },
      //       target: function (player, target) {
      //         var result = 2;
      //         if (target.isTurnedOver()) result += 3;
      //         if (target.hp == 1) result += 3;
      //         return result;
      //       }
      //     },
      //     threaten: 1.5
      //   }
      // },
      // jlsg_qingcheng_zhu: {
      //   srlose: true,
      //   trigger: { global: "gameDrawEnd" },
      //   forced: true,
      //   content: function () {
      //     if (player.hasSkill('jlsg_liuyun')) {
      //       player.addSkill('jlsg_qingcheng_yin');
      //       player.removeSkill('jlsg_qingcheng_zhu');
      //     } else {
      //       player.addSkill('jlsg_qingcheng_yang');
      //       player.removeSkill('jlsg_qingcheng_zhu');
      //     }
      //   },
      // },
      // jlsg_qingcheng_yang: {
      //   audio: "ext:极略/audio/skill:1",
      //   group: ['jlsg_qingcheng_yang1', 'jlsg_qingcheng_yang2'],
      // },
      // jlsg_qingcheng_yang1: {
      //   audio: "ext:极略/audio/skill:true",
      //   enable: ['chooseToUse', 'chooseToRespond'],
      //   filterCard: function () {
      //     return false;
      //   },
      //   selectCard: -1,
      //   viewAs: { name: 'sha' },
      //   viewAsFilter: function (player) {
      //     return !player.isLinked();
      //   },
      //   prompt: '横置你的武将牌，视为打出一张【杀】',
      //   check: function () {
      //     return 1
      //   },
      //   onuse: function (result, player) {
      //     if (!player.isLinked()) player.link();
      //   },
      //   onrespond: function (result, player) {
      //     if (!player.isLinked()) player.link();
      //   },
      //   ai: {
      //     skillTagFilter: function (player) {
      //       return !player.isLinked();
      //     },
      //     respondSha: true,
      //     basic: {
      //       useful: [5, 1],
      //       value: [5, 1],
      //     },
      //     order: function () {
      //       if (_status.event.player.hasSkillTag('presha', true, null, true)) return 10;
      //       return 3;
      //     },


      //     result: {
      //       target: function (player, target) {
      //         if (player.hasSkill('jiu') && !target.getEquip('baiyin')) {
      //           if (get.attitude(player, target) > 0) {
      //             return -6;
      //           } else {
      //             return -3;
      //           }
      //         }
      //         return -1.5;
      //       },
      //     },
      //     tag: {
      //       respond: 1,
      //       respondShan: 1,
      //       damage: function (card) {
      //         if (card.nature == 'poison') return;
      //         return 1;
      //       },
      //       natureDamage: function (card) {
      //         if (card.nature) return 1;
      //       },
      //       fireDamage: function (card, nature) {
      //         if (card.nature == 'fire') return 1;
      //       },
      //       thunderDamage: function (card, nature) {
      //         if (card.nature == 'thunder') return 1;
      //       },
      //       poisonDamage: function (card, nature) {
      //         if (card.nature == 'poison') return 1;
      //       },
      //     },

      //   },

      // },
      // jlsg_qingcheng_yang2: {
      //   audio: "ext:极略/audio/skill:true",
      //   enable: ["chooseToUse", "chooseToRespond"],
      //   filterCard: function () {
      //     return false;
      //   },
      //   selectCard: -1,
      //   viewAs: { name: 'shan' },
      //   viewAsFilter: function (player) {
      //     return player.isLinked();
      //   },
      //   prompt: '重置你的武将牌，视为打出一张【闪】',
      //   check: function () {
      //     return 1
      //   },
      //   onuse: function (result, player) {
      //     if (player.isLinked()) player.link();
      //   },
      //   onrespond: function (result, player) {
      //     if (player.isLinked()) player.link();
      //   },
      //   ai: {
      //     skillTagFilter: function (player) {
      //       return player.isLinked();
      //     },
      //     respondShan: true,
      //     basic: {
      //       useful: [7, 2],
      //       value: [7, 2],
      //     },
      //   }
      // },
      // jlsg_qingcheng_yin: {
      //   audio: "ext:极略/audio/skill:1",
      //   group: ['jlsg_qingcheng_yin1', 'jlsg_qingcheng_yin2'],
      // },
      // jlsg_qingcheng_yin1: {
      //   audio: "ext:极略/audio/skill:true",
      //   enable: ['chooseToUse', 'chooseToRespond'],
      //   filterCard: function () {
      //     return false;
      //   },
      //   selectCard: -1,
      //   viewAs: { name: 'sha' },
      //   viewAsFilter: function (player) {
      //     return player.isLinked();
      //   },
      //   prompt: '重置你的武将牌，视为打出一张【杀】',
      //   check: function () {
      //     return 1
      //   },
      //   onuse: function (result, player) {
      //     if (player.isLinked()) player.link();
      //   },
      //   onrespond: function (result, player) {
      //     if (player.isLinked()) player.link();
      //   },
      //   ai: {
      //     skillTagFilter: function (player) {
      //       return !player.isLinked();
      //     },
      //     respondSha: true,
      //     basic: {
      //       useful: [5, 1],
      //       value: [5, 1],
      //     },
      //     order: function () {
      //       if (_status.event.player.hasSkillTag('presha', true, null, true)) return 10;
      //       return 3;
      //     },


      //     result: {
      //       target: function (player, target) {
      //         if (player.hasSkill('jiu') && !target.getEquip('baiyin')) {
      //           if (get.attitude(player, target) > 0) {
      //             return -6;
      //           } else {
      //             return -3;
      //           }
      //         }
      //         return -1.5;
      //       },
      //     },
      //     tag: {
      //       respond: 1,
      //       respondShan: 1,
      //       damage: function (card) {
      //         if (card.nature == 'poison') return;
      //         return 1;
      //       },
      //       natureDamage: function (card) {
      //         if (card.nature) return 1;
      //       },
      //       fireDamage: function (card, nature) {
      //         if (card.nature == 'fire') return 1;
      //       },
      //       thunderDamage: function (card, nature) {
      //         if (card.nature == 'thunder') return 1;
      //       },
      //       poisonDamage: function (card, nature) {
      //         if (card.nature == 'poison') return 1;
      //       },
      //     },

      //   },

      // },
      // jlsg_qingcheng_yin2: {
      //   audio: "ext:极略/audio/skill:true",
      //   enable: ["chooseToUse", "chooseToRespond"],
      //   filterCard: function () {
      //     return false;
      //   },
      //   selectCard: -1,
      //   viewAs: { name: 'shan' },
      //   viewAsFilter: function (player) {
      //     return !player.isLinked();
      //   },
      //   prompt: '横置你的武将牌，视为打出一张【闪】',
      //   check: function () {
      //     return 1
      //   },
      //   onuse: function (result, player) {
      //     if (!player.isLinked()) player.link();
      //   },
      //   onrespond: function (result, player) {
      //     if (!player.isLinked()) player.link();
      //   },
      //   ai: {
      //     skillTagFilter: function (player) {
      //       return player.isLinked();
      //     },
      //     respondShan: true,
      //     basic: {
      //       useful: [7, 2],
      //       value: [7, 2],
      //     },
      //   }
      // },
      jlsg_aozhan: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        shaRelated: true,
        marktext: '战',
        intro: {
          markcount: 'expansion',
          content: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        frequent: true,
        trigger: { player: 'damageEnd', source: 'damageSource' },
        filter: function (event, player) {
          if (event.num <= 0) return false;
          return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink();
        },
        content: function () {
          var cards = get.cards(trigger.num);
          player.addToExpansion(cards, 'gain2').gaintag.add(event.name);
        },
        group: ['jlsg_aozhan2']
      },
      jlsg_aozhan2: {
        audio: "ext:极略/audio/skill:true",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.getExpansions('jlsg_aozhan').length;
        },
        content: function () {
          'step 0'
          player.chooseControl('收入手牌', '置入弃牌堆')
            .set("dialog", ['战', player.getExpansions('jlsg_aozhan')])
            .set("ai", function (event, player) {
              var value = 0, i;
              var cards = player.getExpansions('jlsg_aozhan');
              for (i = 0; i < cards.length; i++) {
                value += get.value(cards[i]);
                if (jlsg.isWeak(player) && get.tag(cards[i], 'save')) value += get.value(cards[i]);
              }
              value /= player.getExpansions('jlsg_aozhan').length;
              if (value > 4) return '收入手牌';
              return '置入弃牌堆';
            })
          'step 1'
          if (result.control == '置入弃牌堆') {
            var cards = player.getExpansions('jlsg_aozhan');
            player.discard(cards);
            player.draw(cards.length);
          } else {
            player.gain(player.getExpansions('jlsg_aozhan'), 'log', 'gain2');
          }
        },
        ai: {
          order: 1,
          result: {
            player: function (player) {
              if (player.getExpansions('jlsg_aozhan').length >= 2) return 1;
              if (player.hp + player.countCards('h') <= 3) return 0.5;
              return 0;
            }
          }
        }
      },
      jlsg_huxiao: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        shaRelated: true,
        trigger: { source: 'damageBegin1' },
        filter: function (event, player) {
          return !player.isTurnedOver() && player.isPhaseUsing() && event.card && event.card.name == 'sha'; // && event.notLink();
        },
        priority: 10,
        check: function (event, player) {
          if (!event.player) return -1;
          if (get.attitude(player, event.player) > 0) return false;
          if (event.player.hasSkillTag('filterDamage')) return false;
          if (event.player.hasSkillTag('filterDamage', null, {
            player: player,
            card: event.card,
          })) {
            return -10;
          }
          var e2 = event.player.get('e', '2');
          if (e2) {
            if (e2.name == 'tengjia') {
              if (event.nature == 'fire') return 10;
            }
          }
          if (event.player.hasSkill('kuangfeng2') && event.nature == 'fire') return 10;
          //game.log(get.damageEffect(event.player,player,player,event.nature));
          return get.damageEffect(event.player, player, player, event.nature);
        },
        content: function () {
          trigger.num++;
          player.draw();
          player.addTempSkill('jlsg_huxiao2', 'shaAfter');
        }
      },
      jlsg_old_huxiao: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: { source: 'damageBegin1' },
        filter: function (event, player) {
          return !player.isTurnedOver() && player.isPhaseUsing() && event.card && event.card.name == 'sha';
        },
        priority: 10,
        check: function (event, player) {
          if (!event.player) return -1;
          if (get.attitude(player, event.player) > 0) return false;
          if (event.player.hasSkillTag('filterDamage', null, {
            player: player,
            card: event.card,
          })) {
            return -10;
          }
          var e2 = event.player.get('e', '2');
          if (e2) {
            if (e2.name == 'tengjia') {
              if (event.nature == 'fire') return 10;
            }
          }
          if (event.player.hasSkill('kuangfeng2') && event.nature == 'fire') return 10;
          //game.log(get.damageEffect(event.player,player,player,event.nature));
          return get.damageEffect(event.player, player, player, event.nature);
        },
        content: function () {
          trigger.num++;
          player.draw(3);
          player.addTempSkill('jlsg_huxiao2', 'shaAfter');
        }
      },
      jlsg_huxiao2: {
        sourceSkill: "jlsg_huxiao",
        audio: false,
        trigger: { player: 'shaEnd' },
        forced: true,
        popup: false,
        content: function () {
          var evt = _status.event.getParent("phaseUse");
          if (evt && evt.name == "phaseUse") {
            evt.skipped = true;
          }
          var evt = _status.event.getParent("phase");
          if (evt && evt.name == "phase") {
            evt.finish();
          }
          player.turnOver();
        }
      },
      jlsg_guicai: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'judge' },
        check: function (event, player) {
          var judge = event.judge(event.player.judging[0]);
          if (get.attitude(player, event.player) < 0) return judge > 0;
          if (get.attitude(player, event.player) > 0) return judge < 0;
          return 0;
        },
        content: function () {
          "step 0"
          player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
            get.translation(trigger.player.judging[0]) + '，打出一张手牌代替之或亮出牌顶的一张牌代替之').set('ai', function (card) {
              var trigger = _status.event.getParent()._trigger;
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
          "step 1"
          if (result.bool) {
            event.cards = result.cards;
          } else {
            event.cards = get.cards();
            game.log(get.translation(player) + '亮出了牌堆顶的' + get.translation(event.cards));
            player.showCards(event.cards);
            // game.cardsGotoOrdering(event.cards).relatedEvent=trigger;
          }
          trigger.orderingCards.addArray(event.cards);
          player.respond(event.cards, 'highlight', 'noOrdering');
          "step 2"
          if (result.bool) {
            if (trigger.player.judging[0].clone) {
              trigger.player.judging[0].clone.classList.remove('thrownhighlight');
              game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
            }
            // ui.discardPile.appendChild(trigger.player.judging[0]);
            trigger.player.judging[0] = result.cards[0];
            // if (!get.owner(result.cards[0], 'judge')) {
            //   trigger.position.appendChild(result.cards[0]);
            // }
            // game.log(trigger.player, '的判定牌改为', result.cards[0]);
            game.delayx(2);
          } else {
            if (trigger.player.judging[0].clone) {
              trigger.player.judging[0].clone.classList.remove('thrownhighlight');
              game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
            }
            // ui.discardPile.appendChild(trigger.player.judging[0]);
            trigger.player.judging[0] = event.cards[0];
            // if (!get.owner(event.cards[0], 'judge')) {
            //   trigger.position.appendChild(event.cards[0]);
            // }
            // game.log(trigger.player, '的判定牌改为', event.cards[0]);
          }
        },
        ai: {
          tag: {
            rejudge: 1,
          }
        }
      },
      jlsg_langgu: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: { player: 'damageEnd' },
        check: function (event, player) {
          return event.source && get.attitude(player, event.source) <= 0;
        },
        filter: function (event, player) {
          return event.source != undefined && event.source.countCards("he") > 0;
        },
        logTarget: 'source',
        content: function () {
          "step 0"
          player.judge(function (card) {
            if (get.color(card) == 'black') return 2;
            return -2;
          }).judge2 = result => result.bool;
          "step 1"
          if (result.bool && trigger.source.countCards('he')) {
            player.gainPlayerCard(trigger.source, 'he', true);
          }
        },
        ai: {
          expose: 0.2,
          effect: {
            target: function (card, player, target) {
              if (player.hasSkill('jueqing')) return [1, -1.5];
              if (get.tag(card, 'damage') && Math.random() < 0.5) {
                if (get.attitude(target, player) < 0) return [1, 0, 0, -1.5];
              }
            }
          }
        },
        group: ['jlsg_langgu2']
      },
      jlsg_langgu2: {
        audio: "ext:极略/audio/skill:true",
        trigger: { source: 'damageEnd' },
        check: function (event, player) {
          return get.attitude(player, event.player) <= 0;
        },
        filter: function (event, player) {
          return event.player != undefined && event.player.countCards("he") > 0;
        },
        prompt: function (event, player) {
          var str = '';
          str += '是否对' + get.translation(event.player) + '发动【狼顾】？';
          return str;
        },
        content: function () {
          "step 0"
          player.judge(function (card) {
            if (get.color(card) == 'black') return 2;
            return -2;
          }).judge2 = result => result.bool;
          "step 1"
          if (result.bool && trigger.player.countCards('he')) {
            player.gainPlayerCard(trigger.player, 'he', true);
          }
        },
        ai: {
          expose: 0.2,
          effect: {
            target: function (card, player, target) {
              if (player.hasSkill('jueqing')) return [1, -1.5];
              if (get.tag(card, 'damage') && Math.random() < 0.5) {
                if (get.attitude(target, player) < 0) return [1, 0, 0, -1.5];
              }
            }
          }
        },
      },
      jlsg_zhuizun: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        enable: 'chooseToUse',
        mark: true,
        unique: true,
        limited: true,
        skillAnimation: true,
        animationStr: '追尊',
        animationColor: 'water',
        init: function (player) {
          player.storage.jlsg_zhuizun = false;
        },
        filter: function (event, player) {
          if (event.type != 'dying') return false;
          if (player != event.dying) return false;
          if (player.storage.jlsg_zhuizun) return false;
          return true;
        },
        content: function () {
          'step 0'
          player.awakenSkill('jlsg_zhuizun');
          player.storage.jlsg_zhuizun = true;
          player.addSkill('jlsg_zhuizun2');
          if (player.hp < 1) {
            player.recover(1 - player.hp);
          }
          'step 1'
          var targets = game.players.slice(0);
          targets.remove(player);
          targets.sort(lib.sort.seat);
          event.targets = targets;
          'step 2'
          if (event.targets.length) {
            event.target = event.targets.shift();
          } else {
            event.finish();
          }
          'step 3'
          if (event.target.countCards('h')) {
            event.target.chooseCard('选择一张手牌交给' + get.translation(player), true).ai = function (card) {
              return -get.value(card);
            }
          } else {
            event.goto(2);
          }
          'step 4'
          if (result.bool) {
            player.gain(result.cards[0]);
            target.$give(1, player);
          }
          event.goto(2);
        },
        ai: {
          order: 1,
          skillTagFilter: function (player) {
            if (player.storage.jlsg_zhuizun) return false;
            if (player.hp > 0) return false;
          },
          save: true,
          result: {
            player: 10
          },
          threaten: function (player, target) {
            if (!target.storage.jlsg_zhuizun) return 0.6;
          }
        },
        intro: {
          content: 'limited'
        }
      },
      jlsg_zhuizun2: {
        trigger: { global: 'phaseAfter' },
        forced: true,
        audio: false,
        content: function () {
          player.removeSkill('jlsg_zhuizun2');
          player.insertPhase();
        }
      },
      jlsg_tianshang: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        unique: true,
        trigger: { player: 'die' },
        forceDie: true,
        direct: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'thunder',
        content: function () {
          "step 0"
          player.chooseTarget('是否发动【天殇】？', function (card, player, target) {
            return player != target;
          }).ai = function (target) {
            var num = get.attitude(player, target);
            if (num > 0) {
              if (target.isDamaged() && target.hasSkills(jlsg.ai.skill.need_maxhp)) return 5;
              if (jlsg.isWeak(target)) return 3;
              if (target.isDamaged()) return 2;
              return 1;
            }
            return 0;
          };
          "step 1"
          if (!result.bool) {
            event.finish(); return;
          }
          player.line(target, 'green');
          event.target = result.targets[0];
          player.logSkill('jlsg_tianshang', event.target);
          let skills = ['jlsg_huiqu', 'jlsg_old_yiji', 'jlsg_yiji']
            .filter(s => player.hasSkill(s));
          event.target.addSkills(skills);
          "step 2"
          event.target.gainMaxHp();
          event.target.recover();
        },
        ai: {
          expose: 0.5,
        },
      },
      jlsg_yiji: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        inherit: 'yiji'
      },
      jlsg_old_yiji: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: {
          player: "damageEnd",
        },
        filter: function (event) {
          return (event.num > 0);
        },
        content: function () {
          "step 0"
          event.num = trigger.num;
          event.targets = [];
          "step 1"
          if (event.num > 0) {
            event.num--;
            event.cards = get.cards(2);
          } else {
            event.finish();
          }
          "step 2"
          if (event.cards.length > 1) {
            player.chooseCardButton('将［遗计］牌分配给任意角色', true, event.cards, [1, event.cards.length]);
          } else if (event.cards.length == 1) {
            event._result = { links: event.cards.slice(0), bool: true };
          } else {
            event.goto(5);
            return;
          }
          "step 3"
          if (result.bool) {
            for (var i = 0; i < result.links.length; i++) {
              event.cards.remove(result.links[i]);
            }
            event.togive = result.links.slice(0);
            player.chooseTarget('将' + get.translation(result.links) + '交给一名角色', true);
          }
          "step 4"
          if (result.targets.length) {
            if (!event.targets.includes(result.targets[0])) {
              event.targets.add(result.targets[0]);
            }
            result.targets[0].gain(event.togive, 'draw');
            player.line(result.targets[0], 'green');
            game.log(result.targets[0], '获得了' + get.cnNumber(event.togive.length) + '张牌');
            event.goto(2);
          }
          "step 5"
          if (event.targets.length == 1) {
            event.goto(6);
            return;
          } else {
            if (event.num > 0) {
              event.goto(1);
            } else {
              event.finish();
            }
          }
          "step 6"
          player.judge(function (card) {
            if (get.suit(card) == 'heart') return 2;
            return -2;
          }).judge2 = result => result.bool;
          "step 7"
          if (result.bool) {
            player.recover();
          }
        },
        ai: {
          maixie: true,
          "maixie_hp": true,
          effect: {
            target: function (card, player, target) {
              if (get.tag(card, 'damage')) {
                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                if (!target.hasFriend()) return;
                var num = 1;
                if (get.attitude(player, target) > 0) {
                  if (player.needsToDiscard()) {
                    num = 0.7;
                  } else {
                    num = 0.5;
                  }
                }
                if (target.hp >= 4) return [1, num * 2];
                if (target.hp == 3) return [1, num * 1.5];
                if (target.hp == 2) return [1, num * 0.5];
              }
            },
          },
        },
      },
      jlsg_huiqu: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return player.countDiscardableCards(player, 'h');
        },
        direct: true,
        content: function () {
          'step 0'
          var check = player.canMoveCard(true);
          var next = player.chooseToDiscard('是否弃置一张手牌发动【慧觑】？');
          next.set('ai', function (card) {
            if (check) {
              return 8 - get.value(card);
            }
            return 4 - get.value(card);
          });
          next.logSkill = 'jlsg_huiqu';
          'step 1'
          if (result.bool) {
            player.judge(function (card) {
              if (get.color(card) == 'red') return (player.canMoveCard(true)) ? 1.5 : 0;
              return 1;
            });
          } else {
            event.finish();
          }
          'step 2'
          if (result.color) {
            event.result = result.color;
            if (result.color == 'red') {
              player.moveCard();
              event.finish();
            } else {
              player.chooseTarget('选择一名目标对其造成1点伤害，然后摸一张牌。', true).ai = function (target) {
                return get.damageEffect(target, player, player) + 2;
              }
            }
          }
          'step 3'
          if (result.bool) {
            player.line(result.targets[0]);
            result.targets[0].damage(player);
            player.draw();
          }
          // player.line2(result.targets);
          // event.targets = result.targets;
        },
      },
      jlsg_jiwu: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        // filter: function (event, player) {
        //   return player.countCards('h') != 1;
        // },
        filterCard: true,
        selectCard: function () {
          return Math.min(1, _status.event.player.countCards('h') - 1);
        },
        check: function (event) {
          var player = _status.event.player;
          if (player.countCards('h') > player.maxHp) return false;
          if (!player.hasSha()) return false;
          return game.hasPlayer(function (current) {
            return get.attitude(player, current) < 0 && player.canUse('sha', current);
          });
        },
        discard: false,
        lose: false,
        prompt: "选择保留的手牌",
        content: function () {
          'step 0'
          if (cards[0]) {
            player.discard(player.getCards('h').remove(cards[0]));
          } else if (player.countCards('h') == 0) {
            player.draw();
          }
          'step 1'
          player.addSkill('jlsg_jiwu_buff1');
          player.addSkill('jlsg_jiwu_buff2');
          player.addTempSkill('jlsg_jiwu_buff3', 'phaseAfter');

        },
        mod: {
          selectTarget: function (card, player, range) {
            if (card.name != 'sha') return;
            if (range[1] == -1) return;
            if (player.countCards('e') != 0) {
              if (!card.cards || player.countCards('e', eCard => !card.cards.includes(eCard))) {
                return;
              }
            }
            range[1] += 2;
          }
        },
        subSkill: {
          buff1: {
            audio: "ext:极略/audio/skill:true",
            trigger: { source: 'damageBegin' },
            filter: function (event) {
              return event.card && event.card.name == 'sha' && event.notLink();
            },
            forced: true,
            content: function () {
              trigger.num++;
            }
          },
          buff2: {
            //audio:"ext:极略/audio/skill:true",
            trigger: { player: 'useCardAfter', global: 'phaseAfter' },
            priority: 2,
            filter: function (event) {
              if (event.name == 'useCard') return (event.card && (event.card.name == 'sha'));
              return true;
            },
            forced: true,
            popup: false,
            content: function () {
              player.removeSkill('jlsg_jiwu_buff1');
              player.removeSkill('jlsg_jiwu_buff2');
            },
          },
          buff3: {
            mod: {
              attackRangeBase: function (player, num) {
                return Infinity;
              },
            }
          }
        },
        ai: {
          order: function () {
            return lib.card.sha.ai.order + 0.1;
          },
          result: {
            player: function (player, target) {
              if (player.countCards('h') == 0) return 1;
              if (player.hasSkill('jiu') || player.hasSkill('tianxianjiu')) return 3;
              return 4 - player.countCards('h');
            }
          },
          effect: {
            target: function (card, player, target) {
              if (get.subtype(card) == 'equip1') {
                var num = 0;
                for (var i = 0; i < game.players.length; i++) {
                  if (get.attitude(player, game.players[i]) < 0) {
                    num++;
                    if (num > 1) return [0, 0, 0, 0];
                  }
                }
              }
            }
          }
        }
      },
      jlsg_sheji: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: { global: 'damageEnd' },
        filter: function (event, player) {
          return player.countDiscardableCards(player, 'he') &&
            event.source && event.source.get('e', '1') &&
            event.source != player;
        },
        check: function (event, player) {
          return get.attitude(player, event.source) <= 0;
        },
        direct: true,
        content: function () {
          'step 0'
          event.card = trigger.source.get('e', '1');
          if (!event.card) {
            event.finish(); return;
          }
          var prompt = `###是否发动【射戟】？###弃置一张牌获得${get.translation(trigger.source)}的${get.translation(event.card)}`;
          var next = player.chooseToDiscard('he', prompt);
          next.logSkill = ['jlsg_sheji', trigger.source];
          next.set("ai", function (card) {
            if (get.attitude(player, trigger.source) < 0) {
              return 6 - get.value(card);
            }
            return 0;
          });
          'step 1'
          if (result.bool) {
            trigger.source.$give(event.card, player);
            player.gain(event.card);
          }
        },
        group: ['jlsg_sheji2', 'jlsg_sheji_wushuang'],
        subSkill: {
          wushuang: {
            audio: false,
            trigger: { player: 'useCardToPlayered' },
            forced: true,
            filter: function (event, player) {
              return event.card.name == 'sha' && !event.getParent().directHit.includes(event.target) && event.parent.skill == 'jlsg_sheji2';
            },
            logTarget: 'target',
            content: function () {
              var id = trigger.target.playerid;
              var map = trigger.getParent().customArgs;
              if (!map[id]) map[id] = {};
              if (typeof map[id].shanRequired == 'number') {
                map[id].shanRequired++;
              } else {
                map[id].shanRequired = 2;
              }
            }
          }
        }
      },
      jlsg_sheji2: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse', 'chooseToRespond'],
        filterCard: { type: 'equip' },
        viewAs: { name: 'sha' },
        viewAsFilter: function (player) {
          return player.countCards('he', { type: 'equip' }) != 0;
        },
        position: 'he',
        prompt: '将一张装备牌当【杀】使用或打出',
        check: function (card) {
          if (get.subtype(card) == 'equip1') return 10 - get.value(card);
          return 7 - get.equipValue(card);
        },
        mod: {
          targetInRange: function (card) {
            if (_status.event.skill == 'jlsg_sheji2') return true;
          }
        },
        ai: {
          order: function () {
            return lib.card.sha.ai.order + 0.1;
          },
          respondSha: true,
          skillTagFilter: function (player) {
            if (!player.countCards('he')) return false;
          }
        }
      },
      jlsg_xingyi: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        srlose: true,
        filterTarget: function (card, player, target) {
          return target.countCards('h') > 0 && player != target;
        },
        content: function () {
          if (target.countCards('h') > 0) {
            player.gainPlayerCard(target, true, 'h');
          }
          target.recover();
        },
        ai: {
          order: 2,
          result: {
            player: function (card, player, target) {
              if (jlsg.needKongcheng(player, true)) return -1;
              return 1;
            },
            target: function (player, target) {
              if (jlsg.needKongcheng(target) && target.countCards('h') == 1) return 5;
              if (target.countCards('h') > target.hp && target.isDamaged()) return 4;
              if (jlsg.isWeak(target)) return 2;
              if (target.isDamaged()) return 1;
              if (!jlsg.hasLoseHandcardEffective(target) && target.isDamaged()) return 1;
              if (target.hp == jlsg.getBestHp(target)) return -0.1;
              if (!target.isDamaged() && jlsg.hasLoseHandcardEffective(target)) return -1;
              return 0;
            }
          },
          threaten: 2
        }
      },
      jlsg_guagu: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'dying' },
        priority: 6,
        filter: function (event, player) {
          return event.player.hp <= 0 && event.player.countCards('h') != 0;
        },
        logTarget: 'player',
        check: function (event, player) {
          var att = get.attitude(player, event.player);
          var num = event.player.countCards('h');
          if (att > 0 && event.player.hasSkillTag('nosave')) {
            return false;
          }
          if (num < 3) {
            return att > 0;
          }
          if (num > 4) {
            return att < 0;
          }
          return [true, false].randomGet();
        },
        content: function () {
          "step 0"
          var cards = trigger.player.getCards('h');
          event.bool = cards.length >= 2;
          trigger.player.discard(cards);
          trigger.player.recover();
          "step 1"
          if (event.bool) {
            trigger.player.draw();
          }
        },
        ai: {
          expose: 0.2,
          threaten: 1.5,
          // save:true,
          // skillTagFilter:function(player,tag,target){
          //   debugger;
          //   return target.countCards('h');
          // },
        }
      },
      jlsg_wuqin: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'phaseJieshuEnd' },
        filter: function (event, player) {
          return player.countCards('h', { type: 'basic' }) > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseToDiscard('是否发动【五禽】？', function (card) {
            return get.type(card) == 'basic';
          }).ai = function (card) {
            if (jlsg.needKongcheng(player) && player.countCards('h') == 1) return 10 - get.value(card);
            return 5 - get.useful(card);
          }
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill("jlsg_wuqin");
          player.draw(2);
          player.getStat().card = {};
          player.getStat().skill = {};
          player.phaseUse();
        }
      },
      jlsg_lijian: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return game.countPlayer(function (current) {
            return current != player && current.hasSex('male');
          }) > 1;
        },
        check: function (card) {
          return 10 - get.value(card)
        },
        filterCard: true,
        position: 'he',
        filterTarget: function (card, player, target) {
          if (player == target) return false;
          if (!target.hasSex('male')) return false;
          if (ui.selected.targets.length == 1) {
            return target.canUse({ name: 'juedou' }, ui.selected.targets[0]);
          }
          return true;
        },
        targetprompt: ['先出杀', '后出杀'],
        selectTarget: 2,
        multitarget: true,
        content: function () {
          targets[1].useCard({
            name: 'juedou',
            isCard: true
          }, 'nowuxie', targets[0], 'noai').animate = false;
          game.delay(0.5);
        },
        ai: {
          order: 8,
          result: {
            target: function (player, target) {
              if (ui.selected.targets.length == 0) {
                return -3;
              } else {
                return get.effect(target, { name: 'juedou' }, ui.selected.targets[0], target);
              }
            }
          },
          expose: 0.4,
          threaten: 3,
        }
      },
      jlsg_manwu: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          if (!target.hasSex('male')) return false;
          return target.countCards('h') && player != target;
        },
        content: function () {
          event.card = target.get('h').randomGet();
          player.showCards(event.card);
          if (get.suit(event.card) == 'diamond') {
            target.addJudge('lebu', event.card);
            target.$give(event.card, target);
          } else {
            player.gain(event.card, target, 'give').set('visible', true);
            // target.$give(event.card, player);
          }
        },
        ai: {
          order: 9,
          result: {
            // player: function (card, player, target) {
            // },
            target: function (target, player) {
              return get.effect(target, { name: 'lebu' }, player, target);
            },
            player: 1,
          }
        }
      },
      jlsg_baiyue: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        forced: true,
        popup: false,
        silent: true,
        charlotte: true,
        marktext: "拜",
        intro: {
          content: 'cards',
        },
        init: function (player) {
          player.storage.jlsg_baiyue = [];
        },
        trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "equipAfter"] },
        filter: function (event, player) {
          if (_status.currentPhase != player) return false;
          if (event.name == 'cardsDiscard') {
            var evt = event.getParent();
            if (evt.name != 'orderingDiscard') return false;
            var evtx = (evt.relatedEvent || evt.getParent());
            if (evtx.player == player) return false;
            return game.hasGlobalHistory('cardMove', (e) => e.name == 'lose' && (e.relatedEvent || e.getParent()) == evtx && e.cards2.length > 0)

          }
          var cards = event.getd();
          cards.removeArray(event.getd(player));
          return cards.length;
        },
        content: function () {
          var cards = trigger.getd();
          cards.removeArray(trigger.getd(player));
          player.markAuto("jlsg_baiyue", cards.filterInD('d'));
          player.addTempSkill('jlsg_baiyue_phaseEnd');
        },
        subSkill: {
          phaseEnd: {
            audio: 'jlsg_baiyue',
            onremove: function (player) {
              player.storage.jlsg_baiyue = [];
              player.unmarkSkill("jlsg_baiyue");
            },
            trigger: { player: 'phaseJieshuBegin' },
            filter: function (event, player) {
              return player.getStorage('jlsg_baiyue').filterInD('d').length;
            },
            direct: true,
            content: function () {
              'step 0'
              player.chooseCardButton('是否发动【拜月】？', player.getStorage('jlsg_baiyue').filterInD('d')).ai = function (button) {
                return get.value(button.link);
              }
              'step 1'
              if (result.bool) {
                player.logSkill('jlsg_baiyue');
                player.unmarkAuto('jlsg_baiyue', [result.buttons[0].link]);
                player.gain(result.buttons[0].link);
                player.$gain(result.buttons[0].link);
              }
            },
          }
        }
      },
      // jlsg_baiyue: {
      //   audio: "ext:极略/audio/skill:2",
      //   srlose: true,
      //   trigger: { player: 'phaseEnd' },
      //   filter: function (event, player) {
      //     return player.storage.jlsg_baiyue.length;
      //   },
      //   direct: true,
      //   content: function () {
      //     'step 0'
      //     player.chooseCardButton('是否发动【拜月】？', player.storage.jlsg_baiyue, true).ai = function (button) {
      //       return get.value(button.link);
      //     }
      //     'step 1'
      //     if (result.bool) {
      //       player.logSkill('jlsg_baiyue');
      //       player.storage.jlsg_baiyue.remove(result.buttons[0].link);
      //       player.gain(result.buttons[0].link);
      //       player.$gain(result.buttons[0].link);
      //     }
      //     player.storage.jlsg_baiyue = [];
      //   },
      //   group: ['jlsg_baiyue_countGeneral'],
      //   subSkill: {
      //     countGeneral: {
      //       trigger: { global: ['useCardAfter', 'respondAfter', 'discardAfter'] },
      //       forced: true,
      //       popup: false,
      //       filter: function (event, player) {
      //         if (_status.currentPhase != player) return false;
      //         //if(event.player==player) return false;
      //         if (event.cards) {
      //           for (var i = 0; i < event.cards.length; i++) {
      //             if (event.cards[i].position != 'd')
      //               return true;
      //           }
      //         }
      //         return false;
      //       },
      //       content: function () {
      //         for (var i = 0; i < trigger.cards.length; i++) {
      //           if (get.position(trigger.cards[i]) == 'd') {
      //             player.storage.jlsg_baiyue = player.storage.jlsg_baiyue.concat(trigger.cards[i]);
      //           }
      //         }
      //       }
      //     },
      //   },
      //   init: function (player) {
      //     player.storage.jlsg_baiyue = [];
      //   }
      // },
      jlsg_yinmeng: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        group: ['jlsg_yinmeng2'],
        filter: function (event, player) {
          return player.countCards('h') && (player.storage.jlsg_yinmeng < Math.max(1, player.getDamagedHp()));
        },
        filterTarget: function (card, player, target) {
          return target.hasSex('male') && target.countCards('h') && player != target;
        },
        content: function () {
          'step 0'
          player.storage.jlsg_yinmeng++;
          'step 1'
          event.card = target.get('h').randomGet();
          //target.$phaseJudge(event.card);
          target.showCards(event.card);
          player.chooseCard(get.translation(target) + '展示的牌是' + get.translation(event.card) + ',请选择你展示的牌', true).ai = function (card) {
            if (ai.get.attitude(player, target) > 0) return (get.type(event.card, 'trick') == get.type(card, 'trick'));
            return (get.type(event.card, 'trick') != get.type(card, 'trick'));
          }
          'step 2'
          player.showCards(result.cards[0]);
          if (get.type(result.cards[0], 'trick') == get.type(event.card, 'trick')) {
            game.asyncDraw([player, target]);
          }
          else {
            target.discard(event.card);
          }
        },
        ai: {
          order: 4,
          result: {
            player: 0.5,
            target: function (player, target) {
              var suits = player.getCards('h').map(card => get.type(card, 'trick'));
              var num = new Set(suits).size;
              var m = num / 3;
              if (get.attitude(player, target) > 0 && Math.random() < m) return 1;
              if (get.attitude(player, target) < 0 && Math.random() < m) return -1;
              return 0;
            }
          }
        },
      },
      jlsg_yinmeng2: {
        trigger: { player: 'phaseBefore' },
        forced: true,

        silent: true,
        popup: false,
        priority: 10,
        content: function () {
          player.storage.jlsg_yinmeng = 0;
        }
      },
      jlsg_xianger: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: {
          global: "phaseBegin",
        },
        filter: function (event, player) {
          return event.player.sex == 'male' && event.player != player && player.countCards('h', { type: 'basic' }) > 1 && !event.player.hasSkill("jlsg_xianger2");
        },
        check: function (event, player) {
          if (get.attitude(player, event.player) > 0 && event.player.hasJudge('lebu')) return 1;
          if (get.attitude(player, event.player) > 0 && event.player.hasJudge('bingliang')) return 1;
          if (get.attitude(player, event.player) < 0 && event.player.hp == 1) return 1;
          return 0;
        },
        content: function () {
          "step 0"
          player.chooseCard(2, 'h', function (card) {
            return get.type(card) == 'basic';
          }, '交给' + get.translation(trigger.player) + '两张基本牌', true).set('ai', function (card) {
            return 7 - get.value(card);
          });
          "step 1"
          if (result.bool) {
            player.$give(2, trigger.player);
            trigger.player.gain(result.cards, player);
            trigger.player.skip('phaseUse');
            trigger.player.chooseBool('是否视为对' + get.translation(player) + '使用一张【杀】').set('ai', function (event, player) {
              if (get.attitude(player, trigger.player) < 0 || player == 1) return 1;
              if (get.attitude(player, trigger.player) < 0 || trigger.player == 1) return 0;
              if (get.effect(player, { name: 'sha' }, trigger.player, trigger.player) < 0 && get.attitude(player, trigger.player) < 0) return 1;
              if (get.effect(player, { name: 'sha' }, trigger.player, trigger.player) > 0 && get.attitude(player, trigger.player) > 0) return 0;
              return 0;
            });
          } else {
            event.finish();
          }
          "step 2"
          if (result.bool) {
            trigger.player.useCard({ name: 'sha' }, player);
          } else {
            trigger.player.storage.jlsg_xianger2 = player;
            trigger.player.addSkill("jlsg_xianger2");
          }
          "step 3"
          if (!trigger.player.getStat("damage")) {
            trigger.player.skip('phaseDiscard');
            player.draw();
          }
        },
      },
      jlsg_xianger2: {
        trigger: {
          player: "phaseUseBegin",
        },
        unique: true,
        forced: true,
        mark: true,
        marktext: "饵",
        intro: {
          content: function (player) {
            return "回合开始受到1点伤害";
          },
        },
        content: function () {
          player.damage(1, player.storage.jlsg_xianger2);
          player.line(player.storage.jlsg_xianger2, 'red');
          player.removeSkill('jlsg_xianger2');
        },
      },
      jlsg_juelie: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return target.countCards('h') != player.countCards('h');
        },
        content: function () {
          'step 0'
          var prompt = `选择将手牌数调整至${get.cnNumber(player.countCards('h'))}张，或令${get.translation(player)}视为对你使用一张杀`;
          target.chooseControl('调整手牌', '对你出杀').set('ai', function () {
            if (target.countCards('h') > player.countCards('h') && target.countCards('h', 'shan')) return '对你出杀';
            if (target.countCards('h') < player.countCards('h')) return '调整手牌';
            if (target.countCards('h') - player.countCards('h') >= 2) return '对你出杀';
            if (get.effect(target, { name: 'sha' }, player, target) > 0) return '对你出杀';
            return '调整手牌';
          }).set('prompt', prompt);
          'step 1'
          if (result.control == '调整手牌') {
            if (target.countCards('h') > player.countCards('h')) {
              target.chooseToDiscard(target.countCards('h') - player.countCards('h'), true);
            } else {
              target.draw(player.countCards('h') - target.countCards('h'));
            }
          } else {
            player.useCard({ name: 'sha' }, target, false);
          }
        },
        ai: {
          threaten: 2,
          order: 12,
          result: {
            target: function (player, target) {
              return (player.countCards('h') - target.countCards('h'));
            }
          }
        }
      },
      jlsg_xiwu: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: { player: 'shaMiss' },
        priority: -1,
        shaRelated: true,
        check: function (event, player) {
          return get.attitude(player, event.target) < 2;
        },
        content: function () {
          player.draw();
          if (trigger.target.countCards('h')) {
            player.discardPlayerCard(trigger.target, 'h', true);
          }
        }
      },
      jlsg_fangxin: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        enable: 'chooseToUse',
        discard: false,
        prepare: function (cards, player) {
          player.$give(cards, player);
        },
        filter: function (event, player) {
          if (event.type == 'dying') {
            return event.filterCard({ name: 'tao' }, player) && ((!player.hasJudge('lebu') && player.countCards('he', { suit: 'diamond' })) || (!player.hasJudge('bingliang') && player.countCards('he', { suit: 'club' })));
          }
          if (event.parent.name != 'phaseUse') return false;
          if (!lib.filter.filterCard({ name: 'tao' }, player, event)) {
            return false;
          }
          return player.isDamaged() && ((!player.hasJudge('lebu') && player.countCards('he', { suit: 'diamond' })) || (!player.hasJudge('bingliang') && player.countCards('he', { suit: 'club' })));
        },
        position: 'he',
        filterCard: function (card, player, target) {
          return ((get.suit(card) == 'diamond' && !player.hasJudge('lebu')) || (get.suit(card) == 'club' && !player.hasJudge('bingliang')));
        },
        filterTarget: function (card, player, target) {
          if (_status.event.type == 'dying') {
            return target == _status.event.dying;
          }
          return player == target;
        },
        selectTarget: -1,
        check: function (card) {
          return 8 - get.value(card);
        },
        content: function () {
          if (get.suit(cards[0]) == 'diamond') {
            player.addJudge('lebu', cards[0]);
          } else {
            player.addJudge('bingliang', cards[0]);
          }
          player.useCard({ name: 'tao' }, targets).delayx = false;
        },
        ai: {
          threaten: 1.5,
          save: true,
          order: 9,
          result: {
            player: function (player) {
              return get.effect(player, { name: 'lebu' }, player, player);
            },
            target: function (player, target) {
              return get.effect(target, { name: 'tao' }, player, target);
            }
          }
        }
      },
      jlsg_fangxin_old: {
        srlose: true,
        enable: 'chooseToUse',
        check: function (event, player) {
          return get.attitude(player, event.player) > 0;
        },
        audio: "ext:极略/audio/skill:2",
        filter: function (event, player) {
          if (event.type == 'dying') {
            return event.filterCard({ name: 'tao' }, player) && ((!player.hasJudge('lebu') && player.countCards('he', { suit: 'diamond' })) || (!player.hasJudge('bingliang') && player.countCards('he', { suit: 'club' })));
          }
          if (event.parent.name != 'phaseUse') return false;
          if (!lib.filter.filterCard({ name: 'tao' }, player, event)) {
            return false;
          }
          return player.isDamaged() && ((!player.hasJudge('lebu') && player.countCards('he', { suit: 'diamond' })) || (!player.hasJudge('bingliang') && player.countCards('he', { suit: 'club' })));
        },
        chooseButton: {
          dialog: function (event, player) {
            return ui.create.dialog('将一张梅花牌当【兵粮寸断】或将一张方片牌当【乐不思蜀】对自己使用，若如此做，视为你使用一张【桃】。', player.get('he'), 'hidden');
          },
          filter: function (button, player) {
            return ((get.suit(button.link) == 'diamond' && !player.hasJudge('lebu')) || (get.suit(button.link) == 'club' && !player.hasJudge('bingliang')));
          },
          backup: function (links, player) {
            return {
              filterCard: function () {
                return false
              },
              selectCard: -1,
              viewAs: { name: 'tao' },
              cards: links,
              onuse: function (result, player) {
                player.logSkill('jlsg_fangxin');
                if (get.suit(lib.skill.jlsg_fangxin_backup.cards) == 'diamond') {
                  player.addJudge('lebu', lib.skill.jlsg_fangxin_backup.cards);
                } else {
                  player.addJudge('bingliang', lib.skill.jlsg_fangxin_backup.cards);
                }

              }
            }
          }
        },
        ai: {
          order: 10,
          result: {
            target: function (player) {
              if (player.countCards('h') <= player.hp) return 1;
              if (player.hp <= 1) return 10;
              return -2;
            }
          },
          save: true
        }
      },
      jlsg_xiyu: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'phaseBegin' },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget('细语：弃置一名角色的一张牌，然后该角色进行1个额外的出牌阶段', function (card, player, target) {
            return target.countCards('he') > 0;
          }).ai = function (target) {
            if (target.countCards('h') >= 3) return get.attitude(_status.event.player, target);
            if (target.countCards('h') < 2) return -get.attitude(_status.event.player, target);
            return -get.attitude(_status.event.player, target);
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_xiyu', result.targets);
            event.targets = result.targets;
            if (event.targets[0].num('he') > 0) {
              player.discardPlayerCard('he', event.targets[0], true);
            }
            event.targets[0].phaseUse();
            event.targets[0].getStat().card = {};
            event.targets[0].getStat().skill = {};
          }
        }
      },
      jlsg_wanrou: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: {
          player: "loseAfter",
          global: ["cardsDiscardAfter", "loseAsyncAfter", 'equipAfter'],
        },
        direct: true,
        filter: function (event, player) {
          if (event.name == 'cardsDiscard') { // judge
            var evt = event.getParent();
            if (!(evt.name == 'orderingDiscard' && evt.relatedEvent && evt.relatedEvent.player === player)) {
              return false;
            }
            var relatedEvent = evt.relatedEvent;
            var loses = player.getHistory('lose', e => relatedEvent == (e.relatedEvent || e.getParent()));
            loses = loses.map(e => {
              e = e.getl(player);
              if (!e) {
                return [];
              }
              let cards = e.js || [];
              if (e.hs) {
                cards.addArray(e.hs.filter(c => get.suit(c, player) == 'diamond'));
              }
              if (e.es) {
                cards.addArray(e.es.filter(c => get.suit(c, player) == 'diamond'));
              }
              return cards;
            }).flat();
            loses = event.getd().filter(c => loses.includes(c));
            return loses.length;
            // return event.getd().filter(c => c.original === 'j');
          }
          var cards = event.getd(player);
          if (cards.some(c => get.suit(c, player) == 'diamond')) {
            return true;
          }
          var evt = event.getl(player);
          if (!evt || !evt.js) {
            return false;
          }
          return evt.js.some(c => cards.includes(c));
        },
        content: function () {
          'step 0'
          if (trigger.name == 'cardsDiscard') {
            var relatedEvent = trigger.getParent().relatedEvent;
            var loses = player.getHistory('lose', e => relatedEvent == (e.relatedEvent || e.getParent()));
            loses = loses.map(e => {
              e = e.getl(player);
              if (!e) {
                return [];
              }
              let cards = e.js || [];
              if (e.hs) {
                cards.addArray(e.hs.filter(c => get.suit(c, player) == 'diamond'));
              }
              if (e.es) {
                cards.addArray(e.es.filter(c => get.suit(c, player) == 'diamond'));
              }
              return cards;
            }).flat();
            loses = trigger.getd().filter(c => loses.includes(c));
            event.count = loses.length;
          } else {
            var evt = trigger.getl(player);
            if (!evt || !evt.js) {
              event.count = trigger.getd(player).filter(c => get.suit(c, player) == 'diamond').length;
            } else {
              event.count = trigger.getd(player).filter(c => get.suit(c, player) == 'diamond' || evt.js.includes(c)).length;
            }
          }
          'step 1'
          --event.count;
          player.chooseTarget(`###${get.prompt(event.name)}###令一名角色摸一张牌`).ai = function (target) {
            return ai.get.attitude(player, target)
          }
          'step 2'
          if (result.bool) {
            player.logSkill('jlsg_wanrou', result.targets[0]);
            result.targets[0].draw();
            if (event.count) {
              event.goto(1);
            }
          }
        },
        ai: {
          threaten: 0.7
        },
      },
      jlsg_zhouyan: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        usable: 1,
        enable: 'phaseUse',
        filterTarget: function (card, player, target) {
          return player != target;
        },
        direct: true,
        init: function (player) {
          player.storage.isjlsg_zhouyan = false;
          player.storage.jlsg_zhouyanDamage = false;
        },
        content: function () {
          'step 0'
          player.logSkill('jlsg_zhouyan');
          player.storage.isjlsg_zhouyan = true;
          target.draw();
          player.useCard({ name: 'huogong' }, target);
          'step 1'
          if (player.storage.jlsg_zhouyanDamage && target.isAlive()) {
            player.storage.jlsg_zhouyanDamage = false;
            player.chooseBool('是否继续发动【舟焰】？').ai = function () {
              return get.attitude(player, target) < 0;
            }
          } else {
            player.storage.isjlsg_zhouyan = false;
            player.storage.jlsg_zhouyanDamage = false;
            event.finish();
          }
          'step 2'
          if (result.bool) {
            event.goto(0);
          }
          player.storage.isjlsg_zhouyan = false;
          player.storage.jlsg_zhouyanDamage = false;
        },
        group: ['jlsg_zhouyan_damage'],
        subSkill: {
          damage: {
            trigger: { source: 'damageEnd' },
            forced: true,
            popup: false,
            filter: function (event, player) {
              return event.card && event.card.name == 'huogong';
            },
            content: function () {
              player.draw();
              if (player.storage.isjlsg_zhouyan) {
                player.storage.isjlsg_zhouyan = false;
                player.storage.jlsg_zhouyanDamage = true;
              }
            }
          }
        },
        ai: {
          order: 4,
          player: 0,
          fireattack: true,
          target: function (player, target) {
            if (player == target) return 1;
            if (!lib.card.huogong) return 0;
            var result = lib.card.huogong.ai.result.target;

            if ((player.countCards('h') > 2 || target.hp <= 2) && !target.hasSkill('huogong2') && get.damageEffect(target, player, player, 'fire') > 0 && result(player, target) < 0) return -2;
            if (get.attitude(player, target) > 0) return 0.9;
            if (target.countCards('h') == 0) return 1;
            return 0.5;
          }
        }
      },
      jlsg_zhaxiang: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        enable: 'phaseUse',
        filterCard: true,
        discard: false,
        filterTarget: function (card, target, player) {
          return player != target;
        },
        complexCard: true,
        prepare: function (cards, player, targets) {
          player.$give(cards.length, targets[0]);
        },
        check: function (card) {
          var player = _status.event.player;
          if (player.countCards('h', 'sha') > player.getCardUsable('sha') || !game.hasPlayer(function (current) {
            return player.canUse('sha', current) && current.inRangeOf(player) && player.hasCard('sha', 'h') && player.hasCard(function (cardx) {
              return get.effect(current, cardx, player, player) > 0 && cardx.name == 'sha';
            }, 'h');
          })) {
            if (card.name == 'sha') {
              for (var i = 0; i < game.players.length; i++) {
                if (player == game.players[i]) continue;
                var target = game.players[i];
                var effect = get.effect(target, {
                  name: 'sha',
                  nature: 'fire'
                }, player, player);
                if (effect > 0) return 7 - get.value(card);
              }
            }
          } else {
            if (player.needsToDiscard() || player.countCards('h') > 4) return 6 - get.value(card);
          }
          return 0;
        },
        content: function () {
          'step 0'
          event.cards1 = cards[0];
          event.target = target;
          var cardx = ui.create.card();
          cardx.name = '诈降牌';
          cardx.classList.add('infohidden');
          cardx.classList.add('infoflip');
          player.showCards(cardx, '诈降');
          var random = Math.random();
          var att = get.attitude(event.target, player);
          event.target.chooseCard('交给' + get.translation(player) + '一张牌，或展示并获得此牌。').ai = function (card) {
            if (['sha', 'jiu', 'tao'].includes(card.name)) return -1;
            var effect = get.attitude(player, event.target) > 0 ?
              0 : get.damageEffect(event.target, player, event.target, 'fire');
            return -effect - get.value(card, event.target) + (get.attitude(event.target, player) / 5 * get.value(card, player)) - 2;
          }
          'step 1'
          if (result.bool) {
            player.gain(result.cards[0]);
            event.target.$give(result.cards[0], player);
            event.target.discard(event.cards1);
          } else {
            event.target.showCards(event.cards1);
            event.target.gain(event.cards1);
            event.target.$gain2(event.cards1);
            if (event.cards1.name == 'sha') {
              player.useCard({ name: 'sha', nature: 'fire' }, event.target, false);
            }
          }
        },
        ai: {
          order: 6,
          fireattack: true,
          result: {
            target: function (target, player) {
              if (!ui.selected.cards.length) return 0;
              if (ui.selected.cards[0].name == 'sha') {
                var effect = get.effect(target, {
                  name: 'sha',
                  nature: 'fire'
                }, player, player);
                if (target.mayHaveShan()) effect *= 1.2;
                if (effect > 0) {
                  return (get.attitude(player, target) > 0 ? 1 : -1) * effect
                }
                return 0;
              } else {
                return 1;
              }
              return 0;
            }
          }
        },
        group: "jlsg_zhaxiang_directHit",
        subSkill: {
          directHit: {
            shaRelated: true,
            trigger: { player: 'useCard1' },
            firstDo: true,
            silent: true,
            filter: function (event, player) {
              return event.parent.name == 'jlsg_zhaxiang';
            },
            content: function () {
              trigger.directHit.addArray(game.players);
            },
          }
        },
      },
      jlsg_old_zhaxiang: {
        audio: "ext:极略/audio/skill:true",
        enable: "phaseUse",
        usable: 1,
        srlose: true,
        filterTarget: function (card, player, target) {
          return player != target;
        },
        content: function () {
          "step 0"
          target.useCard({ name: 'sha' }, target, player, true);
          "step 1"
          player.draw(2);
          "step 2"
          player.addTempSkill('jlsg_buff_chuantou');
          "step 3"
          player.useCard({ name: 'sha' }, player, target, false);
          game.delay();
          "step 4"
          player.removeSkill('jlsg_buff_chuantou');
        },
        ai: {
          order: 4,
          result: {
            target: function (player, target) {
              if (!player.hasShan() && player.hp <= 1) {
                return 0;
              }
              return -1;
            },
          }
        }
      },
      jlsg_buff_chuantou: {
        ai: {
          unequip: true,
          skillTagFilter: function (player, tag, arg) {
            if (arg && arg.name == 'sha') return true;
            return false;
          },
        },
      },
      jlsg_shixue: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'shaBegin' },
        frequent: true,
        content: function () {
          player.draw(2);
          player.addTempSkill('jlsg_shixue2', 'shaAfter');
        }
      },
      jlsg_shixue2: {
        sourceSkill: "jlsg_shixue",
        trigger: { player: 'shaMiss' },
        forced: true,
        popup: false,
        content: function () {
          player.chooseToDiscard(2, true, "he");
        }
      },
      jlsg_guoshi: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        trigger: { global: 'phaseJieshuBegin' },
        filter: function (event, player) {
          return lib.skill.jlsg_guoshi.getCards().length > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          var att = get.attitude(player, trigger.player);
          player.chooseCardButton(get.prompt('jlsg_guoshi', trigger.player), lib.skill.jlsg_guoshi.getCards()).ai = function (button) {
            if (att > 0) return get.value(button.link, trigger.player);
            return -get.value(button.link, trigger.player);
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_guoshi', trigger.player);
            trigger.player.gain(result.buttons[0].link);
            trigger.player.$gain(result.buttons[0].link);
          }
          if (trigger.player.ai.shown > player.ai.shown) {
            player.addExpose(0.2);
          }
          'step 2'
          trigger.player.storage.jlsg_guoshi = [];
        },
        getCards() {
          let cards = game.getGlobalHistory('cardMove').filter(
            e => {
              if (e.type == 'discard') {
                return true;
              }
              if (e.name != 'cardsDiscard') {
                return false;
              }
              let evt = e.getParent().relatedEvent;
              return evt && evt.name == 'judge';
            }
          ).map(e => e.getd()).flat();
          return [...new Set(cards)].filterInD('d');
        },
        group: ['jlsg_guoshi2'],
        ai: {
          expose: 0.2
        }
      },
      jlsg_guoshi2: {
        audio: "jlsg_guoshi",
        trigger: { global: 'phaseZhunbeiBegin' },
        prompt: '是否发动【国士】观看牌顶的牌？',
        frequent: true,
        content: function () {
          player.chooseToGuanxing(2);
        },
        contentBackup: function () {
          "step 0"
          if (player.isUnderControl()) {
            game.modeSwapPlayer(player);
          }
          var cards = get.cards(2);
          event.cards = cards;
          var switchToAuto = function () {
            _status.imchoosing = false;
            if (event.dialog) event.dialog.close();
            if (event.control) event.control.close();
            var top = [];
            var judges = event.player.node.judges.childNodes;
            var stopped = false;
            if (get.attitude(player, event.player) > 0) {
              for (var i = 0; i < judges.length; i++) {
                var judge = get.judge(judges[i]);
                cards.sort(function (a, b) {
                  return judge(b) - judge(a);
                });
                if (judge(cards[0]) < 0) {
                  stopped = true;
                  break;
                } else {
                  top.unshift(cards.shift());
                }
              }
            }
            var bottom;
            if (!stopped) {
              cards.sort(function (a, b) {
                return get.value(b, player) - get.value(a, player);
              });
              while (cards.length) {
                if (get.value(cards[0], player) <= 5) break;
                top.unshift(cards.shift());
              }
            }
            bottom = cards;
            for (var i = 0; i < top.length; i++) {
              ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
            }
            for (i = 0; i < bottom.length; i++) {
              ui.cardPile.appendChild(bottom[i]);
            }
            player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
            game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
            game.delay(2);
          }
          var chooseButton = function (online, player, cards) {
            var event = _status.event;
            player = player || event.player;
            cards = cards || event.cards;
            event.top = [];
            event.bottom = [];
            event.status = true;
            event.dialog = ui.create.dialog('按顺序选择置于牌堆顶的牌（先选择的在上）', cards);
            event.switchToAuto = function () {
              event._result = 'ai';
              event.dialog.close();
              event.control.close();
              _status.imchoosing = false;
            },
              event.control = ui.create.control('ok', 'pileTop', 'pileBottom', function (link) {
                var event = _status.event;
                if (link == 'ok') {
                  if (online) {
                    event._result = {
                      top: [],
                      bottom: []
                    }
                    for (var i = 0; i < event.top.length; i++) {
                      event._result.top.push(event.top[i].link);
                    }
                    for (var i = 0; i < event.bottom.length; i++) {
                      event._result.bottom.push(event.bottom[i].link);
                    }
                  } else {
                    var i;
                    for (i = 0; i < event.top.length; i++) {
                      ui.cardPile.insertBefore(event.top[i].link, ui.cardPile.firstChild);
                    }
                    for (i = 0; i < event.bottom.length; i++) {
                      ui.cardPile.appendChild(event.bottom[i].link);
                    }
                    for (i = 0; i < event.dialog.buttons.length; i++) {
                      if (event.dialog.buttons[i].classList.contains('glow') == false &&
                        event.dialog.buttons[i].classList.contains('target') == false)
                        ui.cardPile.appendChild(event.dialog.buttons[i].link);
                    }
                    player.popup(get.cnNumber(event.top.length) + '上' + get.cnNumber(event.cards.length - event.top.length) + '下');
                    game.log(player, '将' + get.cnNumber(event.top.length) + '张牌置于牌堆顶');
                  }
                  event.dialog.close();
                  event.control.close();
                  game.resume();
                  _status.imchoosing = false;
                } else if (link == 'pileTop') {
                  event.status = true;
                  event.dialog.content.childNodes[0].innerHTML = '按顺序选择置于牌堆顶的牌';
                } else {
                  event.status = false;
                  event.dialog.content.childNodes[0].innerHTML = '按顺序选择置于牌堆底的牌';
                }
              });
            for (var i = 0; i < event.dialog.buttons.length; i++) {
              event.dialog.buttons[i].classList.add('selectable');
            }
            event.custom.replace.button = function (link) {
              var event = _status.event;
              if (link.classList.contains('target')) {
                link.classList.remove('target');
                event.top.remove(link);
              } else if (link.classList.contains('glow')) {
                link.classList.remove('glow');
                event.bottom.remove(link);
              } else if (event.status) {
                link.classList.add('target');
                event.top.unshift(link);
              } else {
                link.classList.add('glow');
                event.bottom.push(link);
              }
            }
            event.custom.replace.window = function () {
              for (var i = 0; i < _status.event.dialog.buttons.length; i++) {
                _status.event.dialog.buttons[i].classList.remove('target');
                _status.event.dialog.buttons[i].classList.remove('glow');
                _status.event.top.length = 0;
                _status.event.bottom.length = 0;
              }
            }
            game.pause();
            game.countChoose();
          }
          event.switchToAuto = switchToAuto;
          if (event.isMine()) {
            chooseButton();
            event.finish();
          } else if (event.isOnline()) {
            event.player.send(chooseButton, true, event.player, event.cards);
            event.player.wait();
            game.pause();
          } else {
            event.switchToAuto();
            event.finish();
          }
          "step 1"
          if (event.result == 'ai' || !event.result) {
            event.switchToAuto();
          } else {
            var top = event.result.top || [];
            var bottom = event.result.bottom || [];
            for (var i = 0; i < top.length; i++) {
              ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
            }
            for (i = 0; i < bottom.length; i++) {
              ui.cardPile.appendChild(bottom[i]);
            }
            for (i = 0; i < event.cards.length; i++) {
              if (!top.contains(event.cards[i]) && !bottom.contains(event.cards[i])) {
                ui.cardPile.appendChild(event.cards[i]);
              }
            }
            player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(event.cards.length - top.length) + '下');
            game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
            game.delay(2);
          }
        }
      },
      jlsg_yingcai: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        trigger: { player: 'phaseDrawBegin1' },
        check: function () {
          return true;
        },
        filter: function (event, player) {
          return !event.numFixed;
        },
        content: function () {
          'step 0'
          trigger.changeToZero();
          event.suit = [];
          event.cards = [];
          'step 1'
          event.cards2 = get.cards();
          game.cardsGotoOrdering(event.cards2);
          var card = event.cards2[0];
          if (card.clone) {
            card.clone.classList.add('thrownhighlight');
            game.addVideo('highlightnode', player, get.cardInfo(card));
          }
          event.node = trigger.player.$throwordered(card.copy(), true);
          event.node.classList.add('thrownhighlight');
          ui.arena.classList.add('thrownhighlight');
          game.delayx();
          if (!event.suit.includes(get.suit(event.cards2)))
            event.suit.push(get.suit(event.cards2));
          if (event.suit.length <= 2) {
            event.cards = event.cards.concat(event.cards2);
            event.redo();
          } else {
            event.cards1 = event.cards;
            event.cards1 = event.cards1.concat(event.cards2[0]);
            ui.discardPile.appendChild(event.cards2[0]);
            game.delayx(2);
          }
          'step 2'
          ui.arena.classList.remove('thrownhighlight');
          player.gain(event.cards, 'gain2');
          event.cards2[0].clone.hide();
          game.delay();
        }
      },
      jlsg_old_yingcai: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'phaseDrawBegin' },
        check: function () {
          return 1;
        },
        content: function () {
          'step 0'
          trigger.cancel();
          event.suit = [];
          event.cards = [];
          'step 1'
          event.cards2 = get.cards();
          if (!event.suit.includes(get.suit(event.cards2)))
            event.suit.push(get.suit(event.cards2));
          if (event.suit.length <= 2) {
            event.cards = event.cards.concat(event.cards2);
            event.redo();
          } else {
            event.cards1 = event.cards;
            event.cards1 = event.cards1.concat(event.cards2[0]);
            player.showCards(event.cards1);
            ui.discardPile.appendChild(event.cards2[0]);
          }
          'step 2'
          player.gain(event.cards);
          if (event.cards.length) {
            player.$draw(event.cards);
          }
        }
      },
      jlsg_weibao: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        filterTarget: function (card, player, target) {
          return player != target;
        },
        filterCard: true,
        check: function (card) {
          return 8 - get.value(card);
        },
        discard: false,
        content: function () {
          'step 0'
          player.$throw(1, 1000);
          cards[0].fix();
          ui.cardPile.insertBefore(cards[0], ui.cardPile.firstChild);
          target.chooseControl('heart2', 'diamond2', 'club2', 'spade2').set('ai', function (event) {
            switch (Math.floor(Math.random() * 6)) {
              case 0:
                return 'heart2';
              case 1:
              case 4:
              case 5:
                return 'diamond2';
              case 2:
                return 'club2';
              case 3:
                return 'spade2';
            }
          });
          'step 1'
          game.log(target, '选择了' + get.translation(result.control));
          event.choice = result.control;
          target.popup(event.choice);
          event.cards = get.cards();
          target.showCards(event.cards);
          target.gain(event.cards);
          target.$draw();
          'step 2'
          if (get.suit(event.cards) + '2' != event.choice) target.damage();
        },
        ai: {
          order: 1,
          result: {
            target: function (player, target) {
              var eff = get.damageEffect(target, player);
              if (eff >= 0) return 1 + eff;
              var value = 0, i;
              var cards = player.get('h');
              for (i = 0; i < cards.length; i++) {
                value += get.value(cards[i]);
              }
              value /= player.countCards('h');
              if (target.hp == 1) return Math.min(0, value - 7);
              return Math.min(0, value - 5);
            }
          }
        }
      },
      jlsg_choulve: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.countCards('h') > 1 && game.countPlayer(p => p != player) >= 2;
        },
        check: function (card) {
          if (ui.selected.cards.length == 0) return get.value(card);
          return 6 - get.value(card) && card.number < ui.selected.cards[0].number;
        },
        filterCard: true,
        selectCard: 2,
        filterTarget: function (card, player, target) {
          return player != target;
        },
        prepare: function (cards, player, targets) {
          player.$give(1, targets[0]);
          player.$give(1, targets[1]);
        },
        targetprompt: ['先拿牌', '后拿牌'],
        selectTarget: 2,
        discard: false,
        lose: false,
        multitarget: true,
        content: function () {
          targets[0].gain(cards[0]);
          targets[1].gain(cards[1]);
          targets[0].showCards(cards[0]);
          targets[1].showCards(cards[1]);
          if (get.number(cards[0]) != get.number(cards[1])) {
            if (get.number(cards[0]) > get.number(cards[1])) {
              targets[0].storage.jlsg_choulve = player;
              targets[0].addTempSkill('jlsg_choulve_shaHit', 'shaAfter');
              targets[0].useCard({ name: 'sha' }, targets[1], 'noai', false);
            } else {
              targets[1].storage.jlsg_choulve = player;
              targets[1].addTempSkill('jlsg_choulve_shaHit', 'shaAfter');
              targets[1].useCard({ name: 'sha' }, targets[0], 'noai', false);
            }
          }
        },
        subSkill: {
          shaHit: {
            trigger: { source: 'damageAfter' },
            forced: true,
            popup: false,
            filter: function (event, player) {
              return event.card.name == 'sha'
            },
            content: function () {
              player.storage.jlsg_choulve.draw();
            }
          }
        },
        ai: {
          order: 4,
          result: {
            player: function (player) {
              if (player.countCards('h') > player.hp) return 0.5;
              return -5;
            },
            target: function (player, target) {
              var card1 = ui.selected.cards[0];
              var card2 = ui.selected.cards[1];
              if (card1 && card2 && card1.number == card2.number) {
                return 2;
              }
              if (ui.selected.targets.length == 0) {
                return 1;
              } else {
                return get.effect(target, { name: 'sha' }, ui.selected.targets[0], target);
              }
            }
          }
        }
      },
      jlsg_old_jiexi: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        enable: "phaseUse",
        filterTarget: function (card, player, target) {
          return player.canCompare(target) && target.countCards('h') > 0;
        },
        filter: function (event, player) {
          return player.countCards('h') > 0 && !player.isTurnedOver() && !player.hasSkill('jlsg_jilve2');
        },
        content: function () {
          "step 0"
          player.chooseToCompare(target);
          "step 1"
          if (result.bool) {
            player.useCard({ name: 'guohe' }, target, true);
          } else {
            player.addTempSkill('jlsg_jilve2', 'phaseAfter');
          }
          "step 2"
          if (!player.isTurnedOver() && player.countCards('h') < 4) {
            player.turnOver();
            player.draw();
          }
        },
        mod: {
          targetEnabled: function (card, player, target, now) {
            if (target.isTurnedOver()) {
              if (card.name == 'nanman' || card.name == 'shandian') return false;
            }
          }
        },
        ai: {
          order: 5,
          result: {
            target: function (player, target) {
              var att = get.attitude(player, target);
              var nh = target.countCards('h');
              if (att > 0) {
                var js = target.getCards('j');
                if (js.length) {
                  var jj = js[0].viewAs ? { name: js[0].viewAs } : js[0];
                  if (jj.name == 'guohe' || js.length > 1 || get.effect(target, jj, target, player) < 0) {
                    return 3;
                  }
                }
                if (target.getEquip('baiyin') && target.isDamaged() &&
                  get.recoverEffect(target, player, player) > 0) {
                  if (target.hp == 1 && !target.hujia) return 1.6;
                  if (target.hp == 2) return 0.01;
                  return 0;
                }
              }
              var es = target.getCards('e');
              var noe = (es.length == 0 || target.hasSkillTag('noe'));
              var noe2 = (es.length == 1 && es[0].name == 'baiyin' && target.isDamaged());
              var noh = (nh == 0 || target.hasSkillTag('noh'));
              if (noh && (noe || noe2)) return 0;
              if (att <= 0 && !target.countCards('he')) return 1.5;
              return -1.5;
            },
          },
        }
      },
      jlsg_old_youxia: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, target, player) {
          return player != target && target.countCards('hej') > 0;
        },
        selectTarget: [1, 2],
        multitarget: true,
        multiline: true,
        content: function () {
          player.turnOver();
          targets.sortBySeat();
          for (var i = 0; i < targets.length; i++) {
            player.discardPlayerCard('hej', targets[i], true);
          }
        },
        mod: {
          targetEnabled: function (card, player, target, now) {
            if (target.isTurnedOver()) {
              if (card.name == 'sha' || card.name == 'bingliang') return false;
            }
          }
        },
        ai: {
          order: 5,
          result: {
            player: -1,
            target: function (player, target) {
              if (get.attitude(player, target) <= 0) return (target.countCards('he') > 0) ? -1.5 : 1.5;
              return 0;
            },
          }
        }
      },
      jlsg_jiexi: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        usable: 1,
        enable: 'phaseUse',
        filterTarget: function (card, target, player) {
          return player.canCompare(target);
        },
        filterCard: function () {
          return false
        },
        selectCard: -1,
        prompt: '你可以与一名其他角色拼点，若你赢，视为对其使用一张【过河拆桥】。你可重复此流程直到你以此法拼点没赢',
        content() {
          'step 0'
          player.chooseToCompare(target);
          'step 1'
          if (result.tie) {
            return;
          }
          if (!result.bool) {
            event.finish();
            return;
          }
          if (lib.filter.targetEnabled2({ name: 'guohe' }, player, target)) {
            player.useCard({ name: 'guohe' }, target);
          }
          'step 2'
          if (!player.canCompare(target)) {
            event.finish();
            return;
          }
          player.chooseBool(`是否再次${get.translation(target)}对发动〖劫袭〗?`, Math.random() < 0.6 && get.attitude(player, target) < -0.2 && target.countCards('he') >= 2);
          'step 3'
          if (result.bool) {
            event.goto(0);
          }
        },
        ai: {
          basic: {
            order: 9,
            useful: 1,
            value: 5,
          },
          result: {
            target: function (player, target) {
              var att = get.attitude(player, target);
              var nh = target.countCards('h');
              if (att > 0) {
                var js = target.getCards('j');
                if (js.length) {
                  var jj = js[0].viewAs ? { name: js[0].viewAs } : js[0];
                  if (jj.name == 'guohe' || js.length > 1 || get.effect(target, jj, target, player) < 0) {
                    return 3;
                  }
                }
                if (target.getEquip('baiyin') && target.isDamaged() &&
                  get.recoverEffect(target, player, player) > 0) {
                  if (target.hp == 1 && !target.hujia) return 1.6;
                  if (target.hp == 2) return 0.01;
                  return 0;
                }
              }
              var es = target.getCards('e');
              var noe = (es.length == 0 || target.hasSkillTag('noe'));
              var noe2 = (es.length == 1 && es[0].name == 'baiyin' && target.isDamaged());
              var noh = (nh == 0 || target.hasSkillTag('noh'));
              if (noh && (noe || noe2)) return 0;
              if (att <= 0 && !target.countCards('he')) return 1.5;
              return -1.5;
            },
          },
          tag: {
            loseCard: 1,
            discard: 1,
          },
        },
      },
      jlsg_youxia: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        enable: 'phaseUse',
        filterTarget: function (card, target, player) {
          return player != target && target.countCards('hej') > 0;
        },
        filter: function (event, player) {
          return !player.isTurnedOver();
        },
        selectTarget: [1, 2],
        multitarget: true,
        multiline: true,
        content: function () {
          player.turnOver();
          for (var i = 0; i < targets.length; i++) {
            player.gainPlayerCard('hej', targets[i]);
          }
        },
        mod: {
          targetEnabled: function (card, player, target, now) {
            if (target.isTurnedOver()) {
              if (card.name == 'sha' || card.name == 'juedou') return false;
            }
          }
        },
        ai: {
          order: 9,
          result: {
            player: -2,
            target: function (player, target) {
              if (get.attitude(player, target) <= 0) return (target.num('he') > 0) ? -1.5 : 1.5;
              return 0;
            },
          }
        }
      },
      jlsg_huailing: {
        trigger: {
          global: "useCardToPlayered",
        },
        srlose: true,
        audio: "ext:极略/audio/skill:1",
        filter: function (event, player) {
          if (event.player == player) return false;
          if (event.getParent().triggeredTargets3.length > 1) return false;
          if (get.type(event.card) != 'trick') return false;
          if (get.info(event.card).multitarget) return false;
          if (event.targets.length < 2) return false;
          if (!player.isTurnedOver()) return false;
          return true;
        },
        direct: true,
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt('jlsg_huailing'), function (card, player, target) {
            var evt = _status.event.getTrigger().getParent();
            return evt.targets.includes(target) && !evt.excluded.includes(target) && player != target;
          }).ai = function (target) {
            return get.attitude(player, target) > 0;
          };
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_huailing', result.targets);
            player.turnOver();
            trigger.getParent().excluded.addArray(result.targets);
            game.delay();
          }
        },
        mod: {
          targetEnabled: function (card, player, target, now) {
            if (target.isTurnedOver()) {
              if (card.name == 'juedou' || card.name == 'guohe') return false;
            }
          }
        },
        ai: {
          threaten: 1.5,
        },
      },
      jlsg_dailao: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        srlose: true,
        enable: 'phaseUse',
        filterTarget: function (cards, target, player) {
          return player != target;
        },
        content: function () {
          'step 0'
          player.turnOver();
          target.turnOver();
          if (target.ai.shown > player.ai.shown) {
            player.addExpose(0.1);
          }
          'step 1'
          target.chooseToDiscard('he').set('prompt2', `或点「取消」，令你与${get.translation(player)}各摸一张牌`).set('ai',
            function (card) {
              var unusefulness = get.unuseful(card);
              var att = get.attitude(target, player);
              if (-2 < att && att < 2) return -1;
              if (!player.hasSkill('jlsg_ruya')) {
                if (att > 0) return unusefulness;
                return unusefulness + get.effect(player, { name: 'guohe' }, player, target) / 2;
              }
              if (att < 0 || player.countDiscardableCards(player, 'h') != player.countCards('h')) return -1;
              if (player.isTurnedOver() && player.countCards('h') == 1) {
                unusefulness += 8;
              }
              return unusefulness;
            });
          'step 2'
          if (result.bool) {
            target.addExpose(0.1);
            player.chooseToDiscard('he', true);
          } else {
            game.asyncDraw([player, target]);
          }
        },
        ai: {
          order: 9,
          result: {
            player: function (player) {
              return player.isTurnedOver() ? 5 : -3.5;
            },
            target: function (player, target) {
              if (target.hasSkillTag('noturn')) return 0;
              return target.isTurnedOver() ? 5 : -3.5;
            }
          }
        }
      },
      jlsg_old_dailao: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        srlose: true,
        enable: 'phaseUse',
        filterTarget: function (cards, target, player) {
          return player != target;
        },
        filterCard: true,
        position: 'he',
        check: function (card) {
          return 6 - get.value(card);
        },
        selectCard: [0, 1],
        complexCard: true,
        content: function () {
          if (cards.length == 0) {
            game.asyncDraw([player, target]);
          } else {
            target.chooseToDiscard('he', true);
          }
          player.turnOver();
          target.turnOver();
        },
        ai: {
          order: 9,
          result: {
            player: function (player) {
              if (ui.selected.cards.length > 0) {
                if (player.isTurnedOver()) return 3;
                if (!player.isTurnedOver()) return -4
              }
              if (ui.selected.cards.length == 0) {
                if (player.isTurnedOver()) return 4;
                if (!player.isTurnedOver()) return -3;
              }
            },
            target: function (target, player) {
              if (ui.selected.cards.length > 0) {
                if (target.isTurnedOver()) return 3;
                if (!target.isTurnedOver()) return -4
              }
              if (ui.selected.cards.length == 0) {
                if (target.isTurnedOver()) return 4;
                if (!target.isTurnedOver()) return -3;
              }
            }
          }
        }
      },
      jlsg_old_youdi: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        enable: ['chooseToRespond', 'chooseToUse'],
        filterCard: function () {
          return false;
        },
        selectCard: -1,
        viewAs: { name: 'shan' },
        viewAsFilter: function (player) {
          return player.isTurnedOver();
        },
        prompt: '将你的武将牌翻面，视为打出一张闪',
        check: function () {
          return 1
        },
        onrespond: function (result, player) {
          player.turnOver();
        },
        ai: {
          skillTagFilter: function (player) {
            return player.isTurnedOver();
          },
          respondShan: true,
        },
        group: 'jlsg_old_youdi2'
      },
      jlsg_old_youdi2: {
        trigger: { global: 'shaMiss' },
        filter: function (event, player) {
          return event.target == player;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseToDiscard(get.prompt('jlsg_old_youdi', trigger.player), [1, Infinity])
          next.ai = function (card) {
            if (get.attitude(player, trigger.player) <= 0) return 4 - get.value(card);
            return false;
          };
          next.logSkill = ['jlsg_old_youdi', trigger.player];
          'step 1'
          if (result.bool) {
            trigger.player.chooseToDiscard(result.cards.length, 'he', true);
          }
        }
      },
      jlsg_old_ruya: {
        audio: "ext:极略/audio/skill:true",
        srlose: true,
        frequent: true,
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (player.countCards('h')) return false;
          var evt = event.getl(player);
          return evt && evt.hs && evt.hs.length;
        },
        content: function () {
          player.turnOver();
          player.drawTo(player.maxHp);
        },
        ai: {
          threaten: 1.5,
          effect: {
            target: function (card, player, target) {
              if (target.countCards('h') == 1 && (card.name == 'guohe' || card.name == 'liuxinghuoyu')) return 0.5;
              if (target.isTurnedOver() && target.countCards('h') == 1 && (card.name == 'guohe' || card.name == 'shunshou')) return -10;
            }
          },
          noh: true,
          skillTagFilter: function (player, tag) {
            if (tag == 'noh') {
              if (player.countCards('h') != 1) return false;
            }
          }
        }
      },
      jlsg_youdi: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: ['chooseToUse', 'chooseToRespond'],
        filterCard: function () {
          return false;
        },
        selectCard: -1,
        viewAs: { name: 'shan' },
        viewAsFilter: function (player) {
          return player.isTurnedOver();
        },
        prompt: '可以将你的武将牌正面朝上，视为打出一张【闪】',
        check: function () {
          return true;
        },
        onuse: function (result, player) {
          player.turnOver(false);
        },
        onrespond: function (result, player) {
          player.turnOver(false);
        },
        ai: {
          skillTagFilter: function (player) {
            return player.isTurnedOver();
          },
          respondShan: true,
        },
        group: 'jlsg_youdi2'
      },
      jlsg_youdi2: {
        trigger: { global: 'shaMiss' },
        filter: function (event, player) {
          return event.target == player;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseToDiscard('是否发动【诱敌】？', [1, trigger.player.countCards('he')], 'he').ai = function (card) {
            if (get.attitude(player, trigger.player) <= 0) return 4 - get.value(card);
            return false;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_youdi', trigger.player);
            trigger.player.chooseToDiscard(result.cards.length, 'he', true);
          }
        }
      },
      jlsg_ruya: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'loseEnd' },
        frequent: true,
        filter: function (event, player) {
          if (player.countCards('h')) return false;
          for (var i = 0; i < event.cards.length; i++) {
            if (event.cards[i].original == 'h') return true;
          }
          return false;
        },
        content: function () {
          player.turnOver();
          player.draw(player.maxHp - player.countCards('h'));
        },
        ai: {
          threaten: 0.8,
          effect: {
            target: function (card, player, target) {
              if (target.countCards('h') == 1 && card.name == 'guohe') return 0.5;
              if (target.isTurnedOver() && target.countCards('h') == 1 && (card.name == 'guohe' || card.name == 'shunshou')) return -10;
            }
          },
          noh: true,
        }
      },
      jlsg_quanheng: {
        srlose: true,
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        chooseButton: {
          dialog: function () {
            var list = ['wuzhong', 'sha'];
            list[0] = ['trick', '', list[0]];
            list[1] = ['basic', '', list[1]];
            return ui.create.dialog('权衡', [list, 'vcard']);
          },
          filter: function (button, player) {
            return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
          },
          check: function (button) {
            var player = _status.event.player;
            var shaTarget = false;
            for (var i = 0; i < game.players.length; i++) {
              if (player.canUse('sha', game.players[i]) && get.effect(game.players[i], { name: 'sha' }, player) > 0) {
                shaTarget = true;
              }
            }
            if (shaTarget && !player.countCards('h', 'sha')) return (button.link[2] == 'sha') ? 1 : -1;
            var hs = player.get('h');
            for (var i = 0; i < hs.length; i++) {
              if (5 - get.value(hs[i])) {
                return (button.link[2] == 'wuzhong') ? 1 : -1;
              }
            }
            return 0;
          },
          backup: function (links, player) {
            return {
              filterCard: true,
              selectCard: [1, Infinity],
              audio: "ext:极略/audio/skill:1",
              popname: true,
              position: 'hs',
              ai1: function (card) {
                if (ui.selected.cards.length > 0) return -1;
                return 5 - get.value(card);
              },
              viewAs: { name: links[0][2] },
              onuse: function (result, player) {
                player.logSkill('jlsg_quanheng');
                if (this.viewAs.name == 'wuzhong') {
                  player.storage.jlsg_quanheng_wuzhong_takeEffect = false;
                  player.addSkill('jlsg_quanheng_wuxie');
                }
              }
            }
          },
          prompt: function (links, player) {
            return '至少一张手牌当' + get.translation(links[0][2]) + '使用';
          },
        },
        group: ['jlsg_quanheng_shaMiss'],
        subSkill: {
          shaMiss: {
            trigger: { player: 'shaMiss' },
            forced: true,
            nopop: true,
            filter: function (event, player) {
              return event.skill == 'jlsg_quanheng_backup';
            },
            content: function () {
              player.draw(trigger.cards.length);
            }
          }
        },
        init: function (player) {
          player.storage.jlsg_quanheng_wuzhong_takeEffect = false;
        },
        ai: {
          order: 8,
          result: {
            player: 1,
          }
        }
      },
      jlsg_quanheng_wuxie: {
        group: ['jlsg_quanheng_wuxie_switch', 'jlsg_quanheng_wuxie_state'],
        subSkill: {
          switch: {
            trigger: { global: 'wuxieAfter' },
            forced: true,
            popup: false,
            content: function () {
              player.storage.jlsg_quanheng_wuzhong_takeEffect = !player.storage.jlsg_quanheng_wuzhong_takeEffect;
            }
          },
          state: {
            trigger: { player: 'useCardAfter' },
            forced: true,
            popup: false,
            filter: function (event, player) {
              return event.card.name == 'wuzhong';
            },
            content: function () {
              'step 0'
              if (player.storage.jlsg_quanheng_wuzhong_takeEffect) {
                player.draw(trigger.cards.length);
              }
              'step 1'
              player.removeSkill('jlsg_quanheng_wuxie');
              player.storage.jlsg_quanheng_wuzhong_takeEffect = false;
            }
          }
        }
      },
      jlsg_xionglve: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        marktext: '略',
        trigger: { player: 'phaseDrawBegin' },
        check: function (event, player) {
          if (player.skipList.includes('phaseUse')) return 1;
          return player.getExpansions('jlsg_xionglve').length <= 3;
        },
        content: function () {
          'step 0'
          trigger.finish();
          trigger.untrigger();
          event.cards = get.cards(2);
          player.chooseCardButton("选择一张牌置入手牌", event.cards, true);
          'step 1'
          if (result.bool) {
            player.gain(result.links[0]);
            player.$gain2(result.links[0]);
            event.cards.remove(result.links[0]);
            if (event.cards.length) {
              player.addToExpansion(event.cards).gaintag.add(event.name);
            }
          }
        },
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        group: ['jlsg_xionglve2'],
      },
      jlsg_xionglve2: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.getExpansions('jlsg_xionglve').length > 0;
        },
        chooseButton: {
          dialog: function (event, player) {
            return ui.create.dialog('雄略', player.getExpansions('jlsg_xionglve'), 'hidden');
          },
          check: function (button) {
            var player = _status.event.player;
            var type = get.type(button.link, 'trick');
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
            var equipTarget = false;
            var shaTarget = false;
            var shunTarget = false;
            var chaiTarget = false;
            for (var i = 0; i < game.players.length; i++) {
              if (get.attitude(player, game.players[i]) > 0) {
                if (player != game.players[i] && !game.players[i].get('e', { subtype: get.subtype(button.link) })[0] && get.attitude(player, game.players[i]) > 0) {
                  equipTarget = true;
                }
              }
              if (player.canUse('shunshou', game.players[i]) && get.effect(game.players[i], { name: 'shunshou' }, player)) {
                shunTarget = true;
              }
              if (player.canUse('guohe', game.players[i]) && get.effect(game.players[i], { name: 'guohe' }, player) >= 0) {
                chaiTarget = true;
              }
              if (player.canUse('sha', game.players[i]) && get.effect(game.players[i], { name: 'sha' }, player) > 0) {
                shaTarget = true;
              }
            }
            if (player.isDamaged()) return (type == 'basic') ? 2 : -1;
            if (shaTarget && player.countCards('h', 'sha') && !player.countCards('h', 'jiu')) return (type == 'basic') ? 1 : -1;
            if (lose > recover && lose > 0) return (type == 'trick') ? 1 : -1;
            if (lose < recover && recover > 0) return (type == 'trick') ? 1 : -1;
            if (equipTarget) return (type == 'equip') ? 1 : -1;
            if (shunTarget || chaiTarget) return (type == 'trick') ? 1 : -1;
            if (shaTarget && !player.countCards('h', 'sha')) return (type == 'basic') ? 1 : -1;
            return 0;
          },
          backup: function (links, player) {
            if (get.type(links[0], 'trick') == 'trick') {
              return {
                cards: links,
                chooseButton: {
                  dialog: function () {
                    var list = [];
                    for (var i of lib.inpile) {
                      if (!lib.translate[i + '_info']) continue;
                      // if (lib.card[i].mode && lib.card[i].mode.includes(lib.config.mode) == false) continue;
                      if (lib.card[i].type == 'trick') list.push(['锦囊', '', i]);
                    }
                    return ui.create.dialog('雄略:请选择想要使用的锦囊牌', [list, 'vcard']);
                  },
                  filter: function (button, player) {
                    return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
                  },
                  check: function (button) {
                    var player = _status.event.player;
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
                    var shunTarget = false;
                    var chaiTarget = false;
                    for (var i = 0; i < game.players.length; i++) {
                      if (player.canUse('shunshou', game.players[i]) && get.effect(game.players[i], { name: 'shunshou' }, player)) {
                        shunTarget = true;
                      }
                      if (player.canUse('guohe', game.players[i]) && get.effect(game.players[i], { name: 'guohe' }, player) >= 0) {
                        chaiTarget = true;
                      }
                    }
                    if (lose > recover && lose > 0) return (button.link[2] == 'nanman') ? 1 : -1;
                    if (lose < recover && recover > 0) return (button.link[2] == 'taoyuan') ? 1 : -1;
                    if (shunTarget) return (button.link[2] == 'shunshou') ? 1 : -1;
                    if (chaiTarget) return (button.link[2] == 'guohe') ? 1 : -1;
                    return (button.link[2] == 'wuzhong') ? 1 : -1;
                  },
                  backup: function (links, player) {
                    return {
                      filterCard: function () {
                        return false
                      },
                      selectCard: -1,
                      popname: true,
                      viewAs: { name: links[0][2] },
                      onuse: function (result, player) {
                        result.cards = lib.skill.jlsg_xionglve2_backup.cards;
                        var card = result.cards[0];
                        player.logSkill('jlsg_xionglve2', result.targets);
                      }
                    }
                  },
                  prompt: function (links, player) {
                    return '将一张雄略牌当' + get.translation(links[0][2]) + '使用';
                  }
                }
              }
            } else if (get.type(links[0], 'trick') == 'basic') {
              return {
                cards: links,
                chooseButton: {
                  dialog: function () {
                    var list = [];
                    for (var i of lib.inpile) {
                      if (!lib.translate[i + '_info']) continue;
                      // if (lib.card[i].mode && lib.card[i].mode.includes(lib.config.mode) == false) continue;
                      if (lib.card[i].type == 'basic') list.push(['basic', '', i]);
                    }
                    return ui.create.dialog('雄略:请选择想要使用的基本牌', [list, 'vcard']);
                  },
                  filter: function (button, player) {
                    return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
                  },
                  check: function (button) {
                    var player = _status.event.player;
                    var shaTarget = false;
                    for (var i = 0; i < game.players.length; i++) {
                      if (player.canUse('sha', game.players[i]) && get.effect(game.players[i], { name: 'sha' }, player) > 0) {
                        shaTarget = true;
                      }
                    }
                    if (player.isDamaged()) return (button.link[2] == 'tao') ? 1 : -1;
                    if (shaTarget && player.countCards('h', 'sha') && !player.countCards('h', 'jiu')) return (button.link[2] == 'jiu') ? 1 : -1;
                    if (shaTarget && !player.countCards('h', 'sha')) return (button.link[2] == 'sha') ? 1 : -1;
                    return (button.link[2] == 'sha') ? 1 : -1;
                  },
                  backup: function (links, player) {
                    return {
                      filterCard: function () {
                        return false
                      },
                      selectCard: -1,
                      audio: "ext:极略/audio/skill:1",
                      popname: true,
                      viewAs: { name: links[0][2] },
                      onuse: function (result, player) {
                        result.cards = lib.skill.jlsg_xionglve2_backup.cards;
                        var card = result.cards[0];
                        player.logSkill('jlsg_xionglve2', result.targets);
                      }
                    }
                  },
                  prompt: function (links, player) {
                    return '将一张雄略牌当' + get.translation(links[0][2]) + '使用';
                  }
                }
              }
            } else {
              return {
                direct: true,
                cards: links,
                filterTarget: function (card, player, target) {
                  var cards = lib.skill.jlsg_xionglve2_backup.cards;
                  return player != target && !target.get('e', get.subtype(cards[0])[5]);
                },
                filterCard: function () {
                  return false
                },
                selectCard: -1,
                prepare: function (cards, player, targets) {
                  var cards = lib.skill.jlsg_xionglve2_backup.cards;
                  player.$give(cards[0], targets[0], false);
                },
                ai2: function (target) {
                  return get.attitude(_status.event.player, target) + 10;
                },
                content: function () {
                  event.cards = lib.skill.jlsg_xionglve2_backup.cards;
                  var card = event.cards[0];
                  player.logSkill('jlsg_xionglve2', target);
                  if (get.type(card) == 'equip') {
                    target.equip(card);
                  } else {
                    player.discard(card);
                    target.draw();
                  }
                }
              }
            }
          }
        },
        ai: {
          order: 6,
          result: {
            player: function (player) {
              if (player.hp <= 2) return 3;
              return player.getExpansions('jlsg_xionglve').length - 1;
            },
          }
        }
      },
      jlsg_fuzheng: {
        audio: "ext:极略/audio/skill:1",
        unique: true,
        zhuSkill: true,
        group: ['jlsg_fuzheng2'],
      },
      jlsg_fuzheng2: {
        trigger: { player: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          if (!player.hasZhuSkill('jlsg_fuzheng')) return false;
          for (var i = 0; i < game.players.length; i++)
            if (game.players[i] != player && game.players[i].group == 'wu') return true;
          return false;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget('是否发动【辅政】？', [1, 2], function (card, player, target) {
            return player != target && target.group == 'wu';
          }).ai = function (target) {
            var att = get.attitude(player, target);
            if (target.countCards('h')) return att;
            return att / 10;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_fuzheng', result.targets);
            event.targets = result.targets;
            event.targets.sort(lib.sort.seat);
          } else {
            event.finish();
          }
          'step 2'
          if (event.targets.length) {
            var target = event.targets.shift();
            target.draw();
            event.current = target;
          } else {
            event.finish();
          }
          'step 3'
          if (event.current && event.current.num('h')) {
            event.current.chooseCard('选择一张手牌置于牌堆顶', 'h', true);
          } else {
            event.goto(2);
          }
          'step 4'
          if (result && result.cards) {
            event.card = result.cards[0];
            event.current.lose(result.cards, ui.special);
            var cardx = ui.create.card();
            cardx.classList.add('infohidden');
            cardx.classList.add('infoflip');
            event.current.$throw(cardx, 1000);
          } else {
            event.card = null;
          }
          'step 5'
          if (event.current == game.me) game.delay(0.5);
          'step 6'
          if (event.card) {
            event.card.fix();
            ui.cardPile.insertBefore(event.card, ui.cardPile.firstChild);
          }
          event.goto(2);
        }
      },
      jlsg_jiuzhu: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: ['loseAfter', 'loseAsyncAfter', 'cardsDiscardAfter'] },
        filter: function (event, player) {
          var criterion0 = event.getd().some(card => card.name == 'shan' && get.position(card, true) == 'd');

          var criterion1 = player.countCards('he', card => card.name != "shan") != 0;
          // console.log(criterion0, criterion1, event.cards.map(card => card.name));
          return criterion0 && criterion1;
        },
        direct: true,
        content: function () {
          'step 0'
          event.cards = trigger.getd().filter(card => get.position(card) == 'd' && card.name == 'shan');
          // console.log(event.cards);
          // console.log(_status.currentPhase);
          'step 1'
          event.card = event.cards.shift();
          player.chooseToDiscard('是否发动【救主】替换弃牌堆中的' + get.translation(event.card) + '?', 'he',
            card => card.name != 'shan')
            .ai = function (card) {
              if (player.num('h', { name: 'shan' }) >= 2) return false;
              return 6 - ai.get.value(card);
            }
          'step 2'
          if (result.bool) {
            player.logSkill('jlsg_jiuzhu');
            player.gain(event.card, 'gain2');
            if (_status.currentPhase != player) {
              player.chooseBool('是否对' + get.translation(_status.currentPhase) + '使用一张无视防具的杀？').ai = function () {
                return get.attitude(player, _status.currentPhase) < 0;
              }
            } else {
              event.finish();
            }
          } else {
            event.finish();
          }
          'step 3'
          if (result.bool) {
            player.addTempSkill('unequip', 'shaAfter');
            player.useCard({ name: 'sha' }, _status.currentPhase, false);
          }
          "step 4"
          if (event.cards.length) event.goto(1);
        }
      },
      jlsg_tuwei: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'cardsDiscardAfter' },
        filter: function (event, player) {
          var cards = event.getd().filterInD('d').filter(c => c.name == 'sha');
          if (!cards.length) {
            return false;
          }
          var evt = event.getParent();
          if (evt.name != 'orderingDiscard' || !evt.relatedEvent) {
            return false;
          }
          evt = evt.relatedEvent;
          if (evt.name != 'useCard') {
            return false;
          }
          if (evt.player != player && !evt.targets.includes(player)) return false;
          var criterion0 = evt.card.name == "sha" && evt.card.isCard
            && (evt.cards.length == 1 && evt.cards[0].name === 'sha')
            && cards.includes(evt.cards[0]);
          var criterion1 = player.countCards('h', card => get.tag(card, 'damage')) != 0;
          return criterion0 && criterion1;
        },
        direct: true,
        content: function () {
          'step 0'
          let evt = trigger.getParent().relatedEvent;
          let targets = evt.targets.slice().add(evt.player);
          player.chooseCardTarget({
            filterCard: function (card) {
              return get.tag(card, 'damage');
            },
            filterTarget: function (card, player, target) {
              return _status.event.targets.includes(target) && target.countDiscardableCards(player, 'he') != 0;
            },
            selectTarget: [1, 2],
            ai1: function (card) {
              return 6 - get.value(card);
            },
            ai2: function (target) {
              return -get.attitude(_status.event.player, target);
            },
            prompt: get.prompt2('jlsg_tuwei'),
          }).set('targets', targets);
          'step 1'
          if (result.bool) {
            player.discard(result.cards);
            player.logSkill('jlsg_tuwei', result.targets);
            event.targets = result.targets;
            if (result.targets.length == 1) {
              player.discardPlayerCard(event.targets[0], 'he', [1, 2], true);
            } else {
              player.discardPlayerCard(event.targets[0], 'he', true);
            }
          } else {
            event.finish();
          }
          'step 2'
          if (event.targets.length == 2) {
            player.discardPlayerCard(targets[1], 'he', true);
          }
        },
        ai: {
          expose: 0.2
        }
      },
      // jlsg_xujin: {
      //     audio: "ext:极略/audio/skill:1",
      //     srlose: true,
      //     trigger: { player: 'phaseDrawBefore' },
      //     content: function () {
      //       "step 0"
      //       trigger.cancel();
      //       "step 1"
      //       event.cards = get.cards(5);
      //       if (event.isMine() == false) {
      //         event.dialog = ui.create.dialog('蓄劲', event.cards);
      //         game.delay(2);
      //       }
      //       if (event.cards.length > 0) {
      //         var obj = {};
      //         for (var i = 0; i < event.cards.length; i++) {
      //           var suit = get.suit(event.cards[i]);
      //           if (!obj[suit]) {
      //             obj[suit] = 0;
      //           }
      //           obj[suit] = obj[suit] + 1;
      //           if (event.cards[i].name == 'sha') obj[suit] = obj[suit] + 1;
      //         }
      //         var max = get.suit(event.cards.randomGet());
      //         ;
      //         for (var a in obj) {
      //           if (obj[a] > obj[max]) max = a;
      //         }
      //         event.suit = max;
      //       }
      //       "step 2"
      //       if (event.dialog) event.dialog.close();
      //       var dialog = ui.create.dialog('蓄劲', event.cards);
      //       player.chooseButton([1, 5], dialog, true).set("filterButton", function (button) {
      //         if (ui.selected.buttons.length == 0) return true;
      //         for (var i = 0; i < ui.selected.buttons.length; i++) {
      //           if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) return true;
      //         }
      //         return false;
      //       }).set("ai", function (button) {
      //         return get.suit(button.link) == event.suit;
      //       });
      //       "step 3"
      //       player.storage.jlsg_xujin2 = result.buttons.length;
      //       player.addTempSkill('jlsg_xujin2', 'phaseAfter');
      //       event.cards2 = [];
      //       for (var i = 0; i < result.buttons.length; i++) {
      //         event.cards2.push(result.buttons[i].link);
      //         cards.remove(result.buttons[i].link);
      //       }
      //       player.chooseTarget('选择获得卡牌的目标', true).ai = function (target) {
      //         if (player == target) return 10;
      //         return get.attitude(player, target);
      //       }
      //       "step 4"
      //       if (event.cards2.length) {
      //         result.targets[0].gain(event.cards2, 'gain');
      //       }
      //       for (var i = 0; i < cards.length; i++) {
      //         ui.discardPile.appendChild(cards[i]);
      //       }
      //       game.delay(2);
      //     },
      //     ai: {
      //       threaten: 1.2
      //     }
      //   },
      jlsg_xujin: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: "phaseDrawBegin1", },
        forced: true,
        locked: false,
        content: function () {
          "step 0"
          event.cards = get.cards(5);
          game.cardsGotoOrdering(event.cards);
          player.showCards(event.cards, '蓄劲');
          "step 1"
          var split = { spade: [], heart: [], club: [], diamond: [] };
          for (const card of event.cards) { // split the four suits
            let suit = get.suit(card);
            split[suit].push(card);
          }
          var controlList = [];
          for (const suit in split) {
            if (split[suit].length)
              controlList.push(lib.translate[suit]);
          }
          var next = player.chooseControl([...controlList, "取消"])
            .set('dialog', ['是否发动【蓄劲】？选择一种花色的牌交给一名角色。', event.cards])
            .set('split', split)
            .set('ai', function () {
              var splitValue = {};
              for (const suit in _status.event.split) {
                splitValue[suit] = split[suit].reduce((v, b) => v + get.value(b, player), 0);
              }
              if (Object.keys(splitValue).some(suit => splitValue[suit] > 10)) {
                let suit = Object.keys(splitValue).reduce((a, b) => splitValue[a] > splitValue[b] ? a : b);
                return lib.translate[suit];
              } else {
                return "取消";
              }
            });
          event._split = split;
          "step 2"
          if (result.control == "取消") {
            event.finish();
          } else {
            trigger.changeToZero();
            for (const suit in event._split) {
              if (lib.translate[suit] == result.control)
                event.cards = event._split[suit];
            }
            player.storage.jlsg_xujin2 = event.cards.length;
            player.addTempSkill('jlsg_xujin2', 'phaseAfter');
            player.chooseTarget('选择获得卡牌的目标', true).ai = function (target) {
              if (player == target) return 10;
              return get.attitude(player, target);
            }
          }

          "step 3"
          if (event.cards.length) {
            result.targets[0].gain(event.cards, 'gain');
          }
          // for (var i = 0; i < cards.length; i++) {
          //   ui.discardPile.appendChild(cards[i]);
          // }
          game.delay();
        },
        ai: {
          threaten: 1.2
        }
      },
      jlsg_xujin2: {
        mark: true,
        intro: {
          content: function (storage, player) {
            return '出杀次数+' + storage + ',攻击距离为' + storage
          }
        },
        mod: {
          cardUsable: function (card, player, num) {
            if (card.name == 'sha') return num + player.storage.jlsg_xujin2 - 1;
          },
          attackRangeBase: function (player) {
            return player.storage.jlsg_xujin2;
          },
        },
      },
      jlsg_paoxiao: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        shaRelated: true,
        trigger: { source: 'damageAfter' },
        filter: function (event, player) {
          return event.card && event.card.name == 'sha';
        },
        check: function (event, player) {
          return get.attitude(player, event.player) <= 0 && event.notLink();
        },
        priority: 5,
        content: function () {
          'step 0'
          player.draw();
          player.chooseToUse({ name: 'sha' }, function (card, target, player) {
            return player.canUse({ name: 'sha' }, target, false);
          });
          'step 1'
          if (!result.bool) {
            trigger.player.discardPlayerCard(player, 'he', true);
          }
        },
      },
      jlsg_benxi: {
        shaRelated: true,
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'shaBegin' },
        forced: true,
        content: function () {
          "step 0"
          trigger.target.chooseToDiscard('请弃置一张装备牌，否则不能使用闪抵消此杀', 'he', function (card) {
            return get.type(card) == 'equip';
          }).ai = function (card) {
            var num = trigger.target.countCards('h', 'shan');
            if (num == 0) return 0;
            return 8 - get.value(card);
          }
          "step 1"
          if (!result.bool) {
            trigger.directHit = true;
          }
        },
        mod: {
          globalFrom: function (from, to, distance) {
            return distance - 1;
          }
        }
      },
      jlsg_yaozhan: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return player != target && target.countCards('h') > 0;
        },
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        content: function () {
          "step 0"
          player.chooseToCompare(target);
          "step 1"
          if (result.bool) {
            player.draw('nodelay');
            player.useCard({ name: 'sha' }, target, false);
          } else {
            target.chooseToUse({ name: 'sha' }, player);
          }
        },
        ai: {
          order: function (name, player) {
            var cards = player.get('h');
            if (player.countCards('h', 'sha') == 0) {
              return 1;
            }
            for (var i = 0; i < cards.length; i++) {
              if (cards[i].name != 'sha' && cards[i].number > 11 && get.value(cards[i]) < 7) {
                return 9;
              }
            }
            return lib.card.sha.ai.order - 1;
          },
          result: {
            player: function (player) {
              if (player.countCards('h', 'sha') > 0) return 0.6;
              var num = player.countCards('h');
              if (num > player.hp) return 0;
              if (num == 1) return -2;
              if (num == 2) return -1;
              return -0.7;
            },
            target: function (player, target) {
              var num = target.countCards('h');
              if (num == 1) return -1;
              if (num == 2) return -0.7;
              return -0.5
            },
          },
          threaten: 1.3
        }
      },
      jlsg_wenjiu: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        marktext: '酒',
        filterCard: function (card) {
          return get.color(card) == 'black';
        },
        filter: function (event, player) {
          return player.countCards('h', { color: 'black' }) > 0;
        },
        check: function (card) {
          return 6 - get.value(card)
        },
        discard: false,
        prepare: function (cards, player) {
          player.$give(1, player);
        },
        content: function () {
          player.addToExpansion(cards).gaintag.add(event.name);
        },
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        group: 'jlsg_wenjiu2',
        ai: {
          order: 10,
          result: {
            player: function (player) {
              return 2 - player.getExpansions('jlsg_wenjiu').length;
            }
          }
        }
      },
      jlsg_wenjiu2: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'shaBegin' },
        filter: function (event, player) {
          return player.getExpansions('jlsg_wenjiu').length;
        },
        check: function (event, player) {
          return get.attitude(player, event.target) < 0;
        },
        content: function () {
          'step 0'
          player.chooseCardButton('请弃置一张「酒」，该伤害+1点', true, player.getExpansions('jlsg_wenjiu')).ai = function (button) {
            if (get.attitude(player, trigger.target) < 0) return 1;
            return 0;
          }
          'step 1'
          if (result.bool) {
            player.lose(result.links);
            player.$throw(result.links);
            player.addTempSkill('jlsg_wenjiu3', 'shaAfter');
            player.addTempSkill('jlsg_wenjiu4', 'shaAfter');

          }
        }
      },
      jlsg_wenjiu3: {
        trigger: { source: 'damageBegin' },
        filter: function (event) {
          return event.card && event.card.name == 'sha' && event.notLink();
        },
        forced: true,
        popup: false,
        content: function () {
          trigger.num++;
        }
      },
      jlsg_wenjiu4: {
        trigger: { player: 'shaMiss' },
        priority: -1,
        forced: true,
        popup: false,
        content: function () {
          player.draw();
        }
      },
      jlsg_shuixi: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return player.countCards('h') > 0
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseCardTarget({
            filterTarget: function (card, player, target) {
              return target != player;
            },
            filterCard: true,
            ai1: function (card) {
              return get.value(card);
            },
            ai2: function (target) {
              return -get.attitude(player, target);
            },
            prompt: '水袭：展示一张手牌并选择一名其他角色'
          });
          'step 1'
          if (result.bool) {
            event.target = result.targets[0];
            event.card = result.cards[0];
            player.logSkill('jlsg_shuixi', event.target);
            player.showCards(event.card);
            event.target.chooseToDiscard({ suit: get.suit(event.card) }).ai = function (card) {
              if (event.target.hasSkillTag('maihp') && (event.target.hp > 2 || event.target.hasCard('tao', 'h'))) return -1;
              return 7.9 - get.value(card);
            }
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            event.finish()
          } else {
            event.target.loseHp();
            player.addTempSkill('jlsg_shuixi2', 'phaseAfter');
          }
        },
        ai: {
          expose: 0.4
        }
      },
      jlsg_shuixi2: {
        mark: true,
        intro: {
          content: '水袭失败,不能使用【杀】'
        },
        mod: {
          cardEnabled: function (card) {
            if (card.name == 'sha')
              return false
          }
        }
      },
      jlsg_sanfen: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          // var num = 0;
          // for (var i = 0; i < game.players.length; i++) {
          //   if (game.players[i].sex == 'male' && game.players[i] != player) num++
          // }
          // return (num > 1);
          return game.players.length >= 3;
        },
        filterTarget: function (card, player, target) {
          return target != player && target.countCards('he');
        },
        targetprompt: ['先出杀', '对你出杀'],
        selectTarget: 2,
        multitarget: true,
        content: function () {
          'step 0'
          targets[0].chooseToUse({ name: 'sha' }, -1, targets[1]);
          'step 1'
          if (!result.bool) {
            player.discardPlayerCard('he', targets[0]);
          }
          targets[1].chooseToUse({ name: 'sha' }, -1, player);
          'step 2'
          if (!result.bool) {
            player.discardPlayerCard('he', targets[1]);
          }
        },
        ai: {
          order: 8,
          result: {
            target: -3
          },
          expose: 0.4,
          threaten: 3,
        }
      },
      jlsg_guanxing: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'] },
        frequent: true,
        content: function () {
          var num = Math.min(3, game.countPlayer());
          player.chooseToGuanxing(num);
        },
        ai: {
          threaten: 1.2
        }
      },
      jlsg_weiwo: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'damageBegin' },
        filter: function (event, player) {
          if (event.nature && player.countCards('h')) return true;
          if (!event.nature && !player.countCards('h')) return true;
          return false;
        },
        mark: true,
        forced: true,
        content: function () {
          trigger.cancel();

        },
        ai: {
          nofire: function (player) {
            return player.countCards('h') > 0;
          },
          nothunder: function (player) {
            return player.countCards('h') > 0;
          },
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'natureDamage') && target.countCards('h') > 0) return 0;
              if (card.name == 'tiesuo' && target.countCards('h') > 0) return [0, 0];
              if (!get.tag(card, 'natureDamage') && !target.countCards('h')) return [0, 0];
            }
          },
        },
        intro: {
          content: function (storage, player) {
            var str = '';
            if (player.countCards('h')) {
              str += '防止属性伤害';
            } else {
              str += '防止非属性伤害';
            }
            return str;
          }
        }
      },
      jlsg_shouji: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return player.countCards('he');
        },
        check: function (card) {
          return 10 - get.value(card)
        },
        filterCard: true,
        position: 'he',
        getCardName(card) {
          switch (get.suit(card)) {
            case 'heart':
              return 'shunshou';
              break;
            case 'diamond':
              return 'huogong';
              break;
            case 'club':
              return 'jiedao';
              break;
            case 'spade':
              return 'juedou';
              break;
          }
        },
        filterTarget: function (card, player, target) {
          var cardName = lib.skill.jlsg_shouji.getCardName(card);
          if (ui.selected.targets.length == 2) {
            return ui.selected.targets[1].canUse('sha', target, false);
          }
          if (ui.selected.targets.length == 1) {
            // canUse is not compatible with modified select jiedao
            if (cardName === 'jiedao') {
              var targetEnabled = function (player, target) {
                var card = { name: cardName, isCard: true };
                var info = get.info(card);
                var mod = game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player);
                if (mod == false) return false;
                // should not check target enabled mod
                return true;
              }
              if (!targetEnabled(ui.selected.targets[0], target)) return false;
              return target.getEquip(1) &&
                game.hasPlayer(shaTarget => target.canUse('sha', shaTarget, false));
            }
            return ui.selected.targets[0].canUse({ name: cardName }, target);
          }
          // return game.hasPlayer(p => target.canUse({ name: cardName }, p));
          return true;
        },
        targetprompt: ['发起者', '承受者', '出杀目标'],
        selectTarget: function () {
          if (!ui.selected.cards.length) return 2;
          return lib.skill.jlsg_shouji.getCardName(ui.selected.cards[0]) == 'jiedao' ? 3 : 2;
        },
        multitarget: true,
        content: function () {
          var cardName = lib.skill.jlsg_shouji.getCardName(cards[0]);
          if (cardName != 'jiedao') {
            targets[0].useCard({ name: cardName }, targets[1], 'noai');
          } else {
            targets[0].useCard({ name: cardName }, [targets[1], targets[2]], 'noai');
          }
          // var prompt = `###${get.translation(event.name)}###选择${get.name(targets[1])}出杀目标`;
          // player.chooseTarget(prompt,shaTarget => lib.filter.filterTarget({name:'sha'},target,shaTarget));
          // targets[0].useCard({ name: 'jiedao' }, [targets[1], result.targets[0]], 'noai');
        },
        ai: {
          order: 6,
          fireattack: true,
          result: {
            target: function (player, target) {
              if (ui.selected.targets.length == 0) {
                return 3;
              } else {
                var card = ui.selected.cards[0];
                var next = lib.skill.jlsg_shouji.getCardName(card);
                if (next == 'jiedao') return -1.5;
                return get.effect(target, { name: next }, ui.selected.targets[0], target);
              }
            }
          },
        }
      },
      jlsg_hemou: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'phaseUseBegin' },
        filter: function (event, player) {
          return event.player != player && player.countCards('h') > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseCard('是否对' + get.translation(trigger.player) + '发动【合谋】?').ai = function (card) {
            if (get.attitude(player, trigger.player) > 0 && !trigger.player.countCards('j', 'lebu') && trigger.player.countCards('h') > 2) return 4 - get.value(card);
            return false;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_hemou', trigger.player);
            trigger.player.gain(result.cards, player, 'giveAuto');
            switch (get.suit(result.cards[0])) {
              case 'heart':
                trigger.player.addTempSkill('jlsg_hemou_heart', 'phaseAfter');
                break;
              case 'diamond':
                trigger.player.addTempSkill('jlsg_hemou_diamond', 'phaseAfter');
                break;
              case 'club':
                trigger.player.addTempSkill('jlsg_hemou_club', 'phaseAfter');
                break;
              case 'spade':
                trigger.player.addTempSkill('jlsg_hemou_spade', 'phaseAfter');
                break;
            }
          } else {
            event.finish();
          }
        },
        ai: {
          expose: 0.1,
        },
        subSkill: {
          heart: {
            enable: 'phaseUse',
            usable: 1,
            marktext: '♥︎',
            mark: true,
            viewAs: { name: 'shunshou' },
            viewAsFilter: function (player) {
              if (!player.countCards('hs', { suit: 'heart' })) return false;
            },
            prompt: '将一张♥︎手牌当顺手牵羊使用',
            position: 'hs',
            filterCard: function (card, player) {
              return get.suit(card) == 'heart';
            },
            check: function (card) {
              return 6 - get.value(card);
            },
            intro: {
              name: '合谋·顺手',
              content: '本回合内限一次,可将一张♥︎牌当顺手牵羊使用.'
            }
          },
          diamond: {
            enable: 'chooseToUse',
            usable: 1,
            marktext: '♦︎',
            mark: true,
            viewAs: { name: 'huogong', nature: 'fire' },
            position: 'hs',
            filterCard: function (card, player) {
              return get.suit(card) == 'diamond';
            },
            viewAsFilter: function (player) {
              if (!player.countCards('hs', { suit: 'diamond' })) return false;
            },
            prompt: '将一张♦︎手牌当火攻使用',
            check: function (card) {
              var player = _status.currentPhase;
              if (player.countCards('h') > player.hp) {
                return 6 - get.value(card);
              }
              return 4 - get.value(card)
            },
            ai: {
              fireattack: true,
            },
            intro: {
              name: '合谋·火攻',
              content: '本回合内限一次,可将一张♦︎牌当火攻使用.'
            }
          },
          club: {
            enable: 'phaseUse',
            usable: 1,
            marktext: '♣︎',
            mark: true,
            viewAs: { name: 'jiedao' },
            position: 'hs',
            filterCard: function (card, player) {
              return get.suit(card) == 'club';
            },
            viewAsFilter: function (player) {
              if (!player.countCards('hs', { suit: 'club' })) return false;
            },
            prompt: '将一张♣︎手牌当借刀杀人使用',
            check: function (card) {
              return 6 - get.value(card);
            },
            intro: {
              name: '合谋·借刀',
              content: '本回合内限一次,可将一张♣︎牌当借刀杀人使用.'
            }
          },
          spade: {
            enable: 'phaseUse',
            usable: 1,
            marktext: '♠︎',
            mark: true,
            viewAs: { name: 'juedou' },
            position: 'hs',
            prompt: '将一张♠︎手牌当决斗使用',
            filterCard: function (card, player) {
              return get.suit(card) == 'spade';
            },
            viewAsFilter: function (player) {
              if (!player.countCards('hs', { suit: 'spade' })) return false;
            },
            check: function (card) {
              return 6 - get.value(card);
            },
            ai: {
              order: 5
            },
            intro: {
              name: '合谋·决斗',
              content: '回合限一次,可将一张♠︎牌当决斗使用.'
            }
          },
        }
      },
      jlsg_qicai: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { player: 'loseEnd' },
        frequent: true,
        filter: function (event, player) {
          for (var i = 0; i < event.cards.length; i++) {
            if (event.cards[i].original == 'h') return true;
          }
          return false;
        },
        content: function () {
          'step 0'
          player.judge(function (card) {
            if (get.color(card) == 'red') return 2;
            return -2;
          }).judge2 = result => result.bool;
          'step 1'
          if (result.bool) {
            player.draw();
          }
        },
        ai: {
          threaten: 4,
          order: 15,
          result: {
            player: 1
          },
          effect: {
            target: function (card) {
              if (card.name == 'guohe' || card.name == 'liuxinghuoyu') return 0.3;
            }
          }
        }
      },
      jlsg_rende: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'phaseJieshuEnd' },
        filter: function (event, player) {
          return player.countCards('h') != 0 && event.player.isAlive();
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseCard('是否对' + get.translation(trigger.player) + '发动【仁德】?', [1, player.countCards('h')]).ai = function (card) {
            if (player == trigger.player) return 6;
            if (get.attitude(player, trigger.player) > 1) {
              if (trigger.player.countUsed('sha') > 0 && ['sha', 'jiu'].includes(card.name)) {
                return 6.5 - get.value(card);
              }
              var skills = trigger.player.getSkills(false);
              for (var i = 0; i < skills.length; i++) {
                var info = get.info(skills[i]);
                if (info && info.enable == 'phaseUse' && ui.selected.cards.length == 0) return 6.6 - get.value(card);
              }
              return 4 - get.value(card);
            } else {
              return get.value(card) < 0;
            }
            return false;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_rende', trigger.player);
            trigger.player.gain(result.cards);
            player.$give(result.cards.length, trigger.player);
            game.delay();
            // .player.getStat().card={};
          } else {
            event.finish();
          }
          'step 2'
          trigger.player.stat.push({ card: {}, skill: {} });
          trigger.player.phaseUse();
        },
        ai: {
          expose: 0.2
        }
      },
      jlsg_chouxi: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        srlose: true,
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        filterTarget: function (card, player, target) {
          return player != target;
        },
        check: function (card) {
          return 6 - get.value(card);
        },
        filterCard: true,
        content: function () {
          'step 0'
          event.cards1 = get.cards(2);
          player.showCards(event.cards1);
          event.types = [];
          for (var c of event.cards1) {
            event.types.add(get.type(c, 'trick'));
          }
          event.types.sort();
          var prompt = '弃置一张与展示牌类别均不同的牌,然后让' + get.translation(player) + '获得' + get.translation(event.cards1) +
            ',或受到来自' + get.translation(player) + '的1点伤害并获得其中一种类别的牌.';
          player.line(target);
          var cardDiff = 0; // value from card ownership
          for (var type of event.types) {
            var newCardDiff = event.cards1
              .filter(c => get.type(c) == type)
              .reduce((a, b) => a - get.value(b, player) * Math.sign(get.attitude(target, player)) + get.value(b, target), 0);
            if (newCardDiff > cardDiff) {
              cardDiff = newCardDiff;
            }
          }
          target.chooseToDiscard(function (card) {
            let event = _status.event.getParent();
            return !event.types.includes(get.type(card, 'trick'));
          }).set("dialog", [prompt, 'hidden', event.cards1]).set('ai', function (card, cards) {
            if (card.name == 'tao') return -1;
            return _status.event.diff - get.value(card);
          }).set('diff', 2.5 * get.damageEffect(target, player) - cardDiff);
          'step 1'
          if (result.bool) {
            player.gain(event.cards1, 'gain2');
            event.finish();
          } else {
            target.damage();
          }
          'step 2'
          if (!target.isAlive()) {
            event.finish();
            return;
          }
          if (event.types.length == 1) {
            return;
          }
          let values = {};
          for (var c of event.cards1) {
            var type = get.type2(c);
            values[type] = values[type] || 0;
            values[type] += get.value(c, player) + (get.attitude(player, target) < -1 ? get.value(c, target) : 0);
          }
          if (values) {
            event.choice = Object.keys(values)[0];
            for (var type in values) {
              if (values[type] > values[event.choice]) {
                event.choice = type;
              }
            }
          }
          target.chooseControl(event.types)
            .set("ai", function () {
              return _status.event.choice;
            })
            .set("dialog", ['仇袭：选择一种类型的卡牌卡牌获得之', event.cards1])
            .set("choice", event.choice);
          'step 3'
          var cards = [[], []];
          if (event.types.length == 1) {
            event.type = event.types[0];
          } else {
            event.type = result.control;
          }
          target.popup(event.type);
          for (var card of event.cards1) {
            if (get.type(card, 'trick') == event.type) {
              cards[0].push(card);
            } else {
              cards[1].push(card);
            }
          }
          target.gain(cards[0], 'gain2');
          player.gain(cards[1], 'gain2');
        },
        ai: {
          order: 4,
          result: {
            player: 0.5,
            target: -1,
          }
        }
      },
      jlsg_yongbing: {
        unique: true,
        audio: 'ext:极略/audio/skill:true',
        zhuSkill: true,
        global: 'jlsg_yongbing2'
      },
      jlsg_yongbing2: {
        trigger: { source: 'damageEnd' },
        filter: function (event, player) {
          if (player.group != 'shu') return false;
          if (!event.card || event.card.name != 'sha') return false;
          return game.hasPlayer(function (target) {
            return player != target && target.hasZhuSkill('jlsg_yongbing', player);
          });
        },
        direct: true,
        content: function () {
          'step 0'
          var list = [];
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i] != player && game.players[i].hasZhuSkill('jlsg_yongbing', player)) {
              list.push(game.players[i]);
            }
          }
          event.list = list;
          'step 1'
          if (event.list.length) {
            var current = event.list.shift();
            event.current = current;
            player.chooseBool('是否对' + get.translation(current) + '发动【拥兵】？').set('choice', get.attitude(player, current) > 0);
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            player.logSkill('jlsg_yongbing', event.current);
            event.current.draw();
          }
          event.goto(1);
        },
        ai: {
          expose: 0.2,
        }
      },
      jlsg_zhaoxiang: {
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: { global: 'shaBegin' },
        filter: function (event, player) {
          return event.player != player;
        },
        direct: true,
        content: function () {
          'step 0'
          if (trigger.player.inRangeOf(player)) {
            var next = player.chooseBool(get.prompt('jlsg_zhaoxiang', trigger.player));
            next.ai = function () {
              return get.effect(trigger.target, trigger.card, trigger.player, player) < 0;
            };
          } else {
            if (!player.countDiscardableCards(player, 'h')) {
              event.finish();
              return;
            }
            var next = player.chooseToDiscard(get.prompt('jlsg_zhaoxiang', trigger.player));
            next.ai = function (card) {
              const player = get.player(),
                trigger = get.event().getTrigger();
              var income = Math.min(-get.effect(trigger.target, trigger.card, trigger.player, player) * 1.5,
                get.effect(trigger.player, { name: 'shunshou_copy2' }, player, player) / 1.5
              );
              return income - get.value(card);
            };
            next.logSkill = ['jlsg_zhaoxiang', trigger.player];
          }
          'step 1'
          if (result.bool) {
            if (!result.cards) {
              player.logSkill('jlsg_zhaoxiang', trigger.player);
            }
            if (trigger.player.countCards('he')) {
              trigger.player.chooseBool('令' + get.translation(player) + '获得你的一张牌或令打出的杀无效')
                .set('ai', function (event, player) {
                  const trigger = event.getTrigger(),
                    source = get.event("source");
                  let num = trigger.targets.reduce((n, target) => n + get.effect(target, trigger.card, player, player), 0);
                  return get.effect(player, { name: "shunshou_copy2" }, source, player) < num;
                }).set("source", player);
            } else {
              trigger.untrigger();
              trigger.finish();
              event.finish();
            }
          } else {
            event.finish();
          }
          'step 2'
          if (!result.bool) {
            trigger.untrigger();
            trigger.finish();
          } else {
            player.gainPlayerCard(trigger.player, true);
          }
        },
        ai: {
          expose: 0.5,
        }
      },
      jlsg_zhishi: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return player != target;
        },
        content: function () {
          'step 0'
          if (!target.countDiscardableCards(target, 'h')) {
            target.damage(player);
            target.recover();
            event.finish();
            return;
          }
          target.chooseToDiscard('弃置一张基本牌，并回复一点体力。或受到一点伤害并回复一点体力。', { type: 'basic' }).ai = function (card) {
            if (target.hasSkillTag('maixie') && target.hp > 1) return 0;
            if (get.recoverEffect(target, target, target) > 0) return 7.5 - get.value(card);
            return -1;
          }
          'step 1'
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
              if (target.hasSkillTag('maixie_hp') || target.hasSkillTag('maixie')) result += 0.5;
              if (target.hp == 1 && (target.countCards('h') <= 1 || target.maxHp == 1)) result -= 2;
              if (target.hp < target.maxHp) {
                result += Math.min(0.4, target.countCards('h') * 0.1);
              }
              // if (!target.isHealthy() && target.hasCard(function (card) {
              //   return get.type(card) == 'basic';
              // }, 'h')) return 0.6;
              // if (target.hp > 1) return 0.4;

              return result;
            }
          }
        }
      },
      jlsg_jianxiong: {
        unique: true,
        audio: 'ext:极略/audio/skill:true',
        global: 'jlsg_jianxiong2',
        zhuSkill: true,
      },
      jlsg_jianxiong2: {
        trigger: { player: 'damageEnd' },
        filter: function (event, player) {
          if (player.group != 'wei') return false;
          return game.hasPlayer(function (target) {
            return event.source != target && target != player && target.hasZhuSkill('jlsg_jianxiong', player) && event.source != target;
          }) && get.itemtype(event.cards) == 'cards' && get.position(event.cards[0]) == 'd' && player.countCards('h') > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          var list = [];
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i] != player && game.players[i].hasZhuSkill('jlsg_jianxiong', player)) {
              list.push(game.players[i]);
            }
          }
          event.list = list;
          'step 1'
          if (event.list.length) {
            var current = event.list.shift();
            event.current = current;
            player.chooseToDiscard(get.prompt2('jlsg_jianxiong', current)).set('ai', function (card) {
              if (get.attitude(_status.event.player, _status.event.current) > 0) {
                return 6 - get.value(card);
              }
              return 0;
            }).set('logSkill', ['jlsg_jianxiong', event.current]);
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            event.current.gain(trigger.cards, 'gain2');
            game.log(event.current, '获得了', trigger.cards);
          }
          event.goto(1);
        },
        ai: {
          expose: 0.1,
        }
      },

      jlsg_zhonghou: {
        unique: true,
        audio: "ext:极略/audio/skill:1",
        srlose: true,
        trigger: {
          global: ['useCardBefore', 'respondBefore'],
        },
        // silent:true,
        forced: true,
        popup: false,
        firstDo: true,
        filter: function (event, player) {
          return event.skill && event.skill.startsWith('jlsg_zhonghou_');
        },
        content: function () {
          'step 0'
          if (trigger.player == player) {
            if (player.isPhaseUsing()) {
              player.addTempSkill('jlsg_zhonghou_phase');
            }
            event.goto(2);
          } else {
            var prompt = `是否失去1点体力视为${get.translation(trigger.player)}使用一张${get.translation(trigger.card)}？`;
            player.chooseBool(prompt, get.attitude(player, trigger.player) >= 6);
          }
          'step 1'
          if (!result.bool) {
            trigger.player.addTempSkill('jlsg_zhonghou_phase');
            game.log(player, Math.random() < 0.5 ? '丑拒了' : '蠢拒了', trigger.player);
            player.chat('拒绝');
            trigger.cancel();
            trigger.getParent().goto(0);
            event.finish();
            game.delayx();
          }
          'step 2'
          player.loseHp();
        },
        global: ['jlsg_zhonghou_shan', 'jlsg_zhonghou_global'],
      },
      jlsg_zhonghou_phase: {

      },
      jlsg_zhonghou_global: {
        enable: ["chooseToUse", "chooseToRespond"],
        audio: 'jlsg_zhonghou',
        hiddenCard: function (player, name) {
          return get.type(name) == 'basic' && name != 'shan';
        },
        filter: function (event, player) {
          if (player.hasSkill('jlsg_zhonghou_phase')) return false;
          var criterion0 = game.hasPlayer(function (target) {
            return (player == target && (target.hasSkill('jlsg_zhonghou') || target.hiddenSkills.includes('jlsg_zhonghou')) ||
              player.inRangeOf(target) && target.hasSkill('jlsg_zhonghou')) && !target.isDying();
          });
          if (!criterion0) return false;
          for (var i of lib.inpile) {
            if (get.type(i) != 'basic' || i == 'shan') continue;
            if (event.filterCard({ name: i }, player, event)) return true;
            if (i == 'sha' && lib.inpile_nature.some(nat => event.filterCard({ name: i, nature: nat }, player, event))) {
              return true;
            }
          }
          return false;
        },
        chooseButton: {
          dialog: function () {
            var list = [];
            for (var i of lib.inpile) {
              if (i == 'shan') continue;
              var type = get.type(i);
              if (type != 'basic') continue;
              list.push([type, '', i]);
              if (i == 'sha') {
                for (var j of lib.inpile_nature) list.push([type, '', i, j]);
              }
            }
            return ui.create.dialog('忠候', [list, 'vcard']);
          },
          filter: function (button, player) {
            var evt = _status.event.getParent();
            return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
          },
          check: function (button) {
            var player = _status.event.player;
            var card = { name: button.link[2], nature: button.link[3] };
            var val = _status.event.getParent().type == 'phase' ? player.getUseValue(card) : 1;
            if (val <= 0) return 0;
            return val;
          },
          backup: function (links, player) {
            return {
              viewAs: {
                name: links[0][2],
                nature: links[0][3],
              },
              filterCard: function () {
                return false;
              },
              selectCard: -1,
              onuse: function (event, player) {
                player.logSkill('jlsg_zhonghou');
              },
              onrespond: function (event, player) {
                player.logSkill('jlsg_zhonghou');
              },
              // ai1:function(card){
              //   var player=_status.event.player;
              //   var hasEnemy=game.hasPlayer(function(current){
              //     return current!=player&&!current.hasSkill('rechanyuan')&&(get.realAttitude||get.attitude)(current,player)<0;
              //   });
              //   var cardx=lib.skill.reguhuo_backup.viewAs;
              //   if(hasEnemy){
              //     if(card.name==cardx.name&&(card.name!='sha'||card.nature==cardx.nature)) return 10;
              //     return 0;
              //   }
              //   return 6-get.value(card);
              // },
            }
          },
        },
        ai: {
          fireAttack: true,
          respondSha: true,
          skillTagFilter: function (player, tag) {
            if (player.hasSkill('jlsg_zhonghou_phase')) return false;
            return game.hasPlayer(function (target) {
              return (player == target && (target.hasSkill('jlsg_zhonghou') || target.hiddenSkills.includes('jlsg_zhonghou')) ||
                player.inRangeOf(target) && target.hasSkill('jlsg_zhonghou')) && !target.isDying();
            });
          },
        },
      },
      jlsg_zhonghou_shan: {
        audio: 'jlsg_zhonghou',
        enable: ['chooseToUse', 'chooseToRespond'],
        filter: function (event, player) {
          if (player.hasSkill('jlsg_zhonghou_phase')) return false;
          return game.hasPlayer(function (target) {
            return (player == target && (target.hasSkill('jlsg_zhonghou') || target.hiddenSkills.includes('jlsg_zhonghou')) ||
              player.inRangeOf(target) && target.hasSkill('jlsg_zhonghou')) && !target.isDying();
          });
        },
        filterCard: function () {
          return false;
        },
        check: function (event, player) {
          return !player.hasShan();
        },
        selectCard: -1,
        viewAs: {
          name: "shan",
        },
        onuse: function (event, player) {
          player.logSkill('jlsg_zhonghou');
        },
        onrespond: function (event, player) {
          player.logSkill('jlsg_zhonghou');
        },
        ai: {
          respondShan: true,
        }
      },
      jlsg_ganglie: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseUseBegin' },
        srlose: true,
        check: function (event, player) {
          if (player.countCards('h') < 3 && player.hp < 2) return false;
          return game.hasPlayer(function (current) {
            return get.tag(event.card, 'damage') && get.attitude(player, current) < 0;
          });
        },
        content: function () {
          player.loseHp();
          player.addTempSkill('jlsg_ganglie_damage', 'phaseAfter');
          player.addTempSkill('jlsg_ganglie_phaseEnd', 'phaseAfter');
        },
        subSkill: {
          damage: {
            trigger: { source: 'damageBegin' },
            forced: true,
            filter: function (event) {
              return event.num > 0;
            },
            content: function () {
              trigger.num++;
              player.removeSkill('jlsg_ganglie_damage');
            }
          },
          phaseEnd: {
            audio: "ext:极略/audio/skill:2",
            trigger: { player: 'phaseEnd' },
            forced: true,
            filter: function (event, player) {
              return player.getStat('damage') > 0;
            },
            content: function () {
              player.draw(player.getStat('damage'));
            }
          }
        }
      },
    },
    translate: {
      jlsg_sr: "SR武将",
      jlsgsr_choice: '抉择',
      jlsgsr_zhangliao: 'SR张辽',
      jlsgsr_xiahoudun: 'SR夏侯惇',
      jlsgsr_zhenji: 'SR甄姬',
      jlsgsr_xuzhu: 'SR许褚',
      jlsgsr_simayi: 'SR司马懿',
      jlsgsr_guojia: 'SR郭嘉',
      jlsgsr_caocao: 'SR曹操',
      jlsgsr_zhaoyun: 'SR赵云',
      jlsgsr_zhangfei: 'SR张飞',
      jlsgsr_machao: 'SR马超',
      jlsgsr_guanyu: 'SR关羽',
      jlsgsr_zhugeliang: 'SR诸葛亮',
      jlsgsr_huangyueying: 'SR黄月英',
      jlsgsr_liubei: 'SR刘备',
      jlsgsr_sunshangxiang: 'SR孙尚香',
      jlsgsr_daqiao: 'SR大乔',
      jlsgsr_huanggai: 'SR黄盖',
      jlsgsr_lvmeng: 'SR吕蒙',
      jlsgsr_zhouyu: 'SR周瑜',
      jlsgsr_ganning: 'SR甘宁',
      jlsgsr_luxun: 'SR陆逊',
      jlsgsr_sunquan: 'SR孙权',
      jlsgsr_lvbu: 'SR吕布',
      jlsgsr_huatuo: 'SR华佗',
      jlsgsr_diaochan: 'SR貂蝉',
      jlsgsr_shuangxiong: 'SR颜良文丑',
      jlsg_wuwei: '无畏',
      jlsg_yansha: '掩杀',
      jlsg_yansha2: '掩杀',
      jlsg_yansha3: '掩杀',
      zh_mark: '忠候',
      jlsg_zhonghou: '忠侯',
      jlsg_zhonghou_global: '忠侯',
      jlsg_zhonghou_shan: '忠侯',
      jlsg_ganglie: '刚烈',
      jlsg_liuyun: '流云',
      jlsg_lingbo: '凌波',
      jlsg_lingbo1: "凌波·送牌",
      jlsg_lingbo2: "凌波·弃牌",
      jlsg_aozhan: '鏖战',
      jlsg_aozhan2: '鏖战',
      jlsg_huxiao: '虎啸',
      jlsg_huxiao2: '虎啸',
      // jlsg_qingcheng_zhu: '倾城',
      // jlsg_qingcheng_yin: "倾城",
      // jlsg_qingcheng_yang: "倾城",
      // jlsg_qingcheng_yin1: '倾城·杀',
      // jlsg_qingcheng_yin2: "倾城·闪",
      // jlsg_qingcheng_yang1: '倾城·杀',
      // jlsg_qingcheng_yang2: '倾城·闪',
      jlsg_qingcheng: '倾城',
      jlsg_qingcheng2: '倾城',
      jlsg_guicai: '鬼才',
      jlsg_langgu: '狼顾',
      jlsg_langgu2: '狼顾',
      jlsg_zhuizun: '追尊',
      jlsg_zhuizun2: '追尊',
      jlsg_tianshang: '天殇',
      jlsg_yiji: '遗计',
      jlsg_huiqu: '慧觑',
      jlsg_zhaoxiang: '招降',
      jlsg_zhishi: '治世',
      jlsg_jianxiong: '奸雄',
      jlsg_jianxiong2: '奸雄',
      jlsg_jiuzhu: '救主',
      jlsg_jiuzhu2: '救主',
      jlsg_tuwei: '突围',
      jlsg_xujin: '蓄劲',
      jlsg_xujin2: '蓄劲',
      jlsg_paoxiao: '咆哮',
      jlsg_benxi: '奔袭',
      jlsg_yaozhan: '邀战',
      jlsg_wenjiu: '温酒',
      jlsg_wenjiu2: '温酒',
      jlsg_wenjiu3: '温酒',
      jlsg_wenjiu4: '温酒',
      jlsg_shuixi: '水袭',
      jlsg_shuixi2: '水袭',
      jlsg_sanfen: '三分',
      jlsg_guanxing: '观星',
      jlsg_weiwo: '帷幄',
      jlsg_shouji: '授计',
      jlsg_hemou: '合谋',
      jlsg_qicai: '奇才',
      jlsg_rende: '仁德',
      jlsg_chouxi: '仇袭',
      jlsg_yongbing: '拥兵',
      jlsg_yongbing2: '拥兵',
      jlsg_yinmeng: '姻盟',
      jlsg_xianger: '香饵',
      jlsg_xianger2: "香饵·标记",
      jlsg_juelie: '决裂',
      jlsg_fangxin: '芳馨',
      jlsg_xiyu: '细语',
      jlsg_wanrou: '婉柔',
      jlsg_wanrou2: '婉柔',
      jlsg_zhouyan: '舟焰',
      jlsg_zhaxiang: '诈降',
      jlsg_shixue: '誓学',
      jlsg_guoshi: '国士',
      jlsg_guoshi2: '国士',
      jlsg_yingcai: '英才',
      jlsg_weibao: '伪报',
      jlsg_choulve: '筹略',
      jlsg_jiexi: '劫袭',
      jlsg_youxia: '游侠',
      jlsg_huailing: '怀铃',
      jlsg_dailao: '待劳',
      jlsg_youdi: '诱敌',
      jlsg_youdi2: '诱敌',
      jlsg_ruya: '儒雅',
      jlsg_quanheng: '权衡',
      jlsg_xionglve: '雄略',
      jlsg_xionglve2: '雄略',
      jlsg_xionglve2_backup: '雄略',
      jlsg_fuzheng: '辅政',
      jlsg_jiwu: '极武',
      jlsg_jiwu2: '极武',
      jlsg_jiwu3: '极武',
      jlsg_jiwu4: '极武',
      jlsg_sheji: '射戟',
      jlsg_sheji2: '射戟',
      jlsg_xingyi: '行医',
      jlsg_guagu: '刮骨',
      jlsg_wuqin: '五禽',
      jlsg_lijian: '离间',
      jlsg_manwu: '曼舞',
      jlsg_baiyue: '拜月',
      jlsg_old_zhishi: '治世',
      jlsg_old_youxia: '游侠',
      jlsg_old_jiexi: '劫袭',
      jlsg_xiwu: '习武',
      jlsg_old_yingcai: '英才',
      jlsg_old_yiji: '遗计',
      jlsg_old_zhaxiang: '诈降',
      jlsg_old_huxiao: '虎啸',
      jlsg_old_dailao: '待劳',
      jlsg_old_youdi: '诱敌',
      jlsg_old_youdi2: '诱敌',
      jlsg_old_ruya: '儒雅',

      jlsg_old_dailao_info: '出牌阶段限一次，你可以令一名其他角色与你各摸一张牌或各弃置一张牌，然后你与其依次将武将牌翻面。',
      jlsg_old_youdi_info: '若你的武将牌背面朝上，你可以将其翻面来视为你使用一张【闪】。每当你使用【闪】响应一名角色使用的【杀】时，你可以额外弃置任意数量的手牌，然后该角色弃置等量的牌。',
      jlsg_old_ruya_info: '当你失去最后的手牌时，你可以翻面并将手牌补至你体力上限的张数。',
      jlsg_wuwei_info: '摸牌阶段，你可以放弃摸牌，改为亮出牌堆顶的3张牌，其中每有一张基本牌，你便可视为对一名其他角色使用一张【杀】(每阶段对每名角色限一次)。然后将这些基本牌置入弃牌堆，其余收入手牌。',
      jlsg_yansha_info: '摸牌阶段，你可以少摸一张牌。若如此做，本回合弃牌阶段开始时，你可以将一张手牌置于武将牌上，称为「掩」。当一名其他角色使用【杀】选择目标后，你可以将一张「掩」置入弃牌堆，然后获得其两张牌。',
      jlsg_yansha2_info: '一名其他角色使用【杀】选择目标后，你可以将一张「掩」置入弃牌堆，然后获得其两张牌。',
      jlsg_zhonghou_info: '当你攻击范围内的一名角色需要使用或打出一张基本牌时，该角色可以向你请求之，你可以失去1点体力，视为该角色使用此牌；若你拒绝，则取消此次响应。（你的濒死阶段除外）',
      jlsg_zhonghou_append: '<span style="font-family: yuanli">一名其他角色被你拒绝后，其本回合内不能再次发动忠候。你不能拒绝自己请求的忠候。</span>',
      jlsg_liuyun_info: '出牌阶段限一次，你可以横置你的武将牌并弃置一张黑色牌，然后令一名角色选择一项：回复1点体力，或摸两张牌。',
      // jlsg_lingbo_info: '当一名其他角色回合结束时，若你的武将牌横置时，你可以将一张自己装备区的牌移至该角色的合理区域；当一名其他角色回合开始时，若你的武将牌重置时，你可以选择该角色一张除手牌的牌，将此牌置入牌顶。',
      jlsg_lingbo_info: '一名角色的回合开始阶段，你可以重置你的武将牌，然后将场上的一张牌置于牌堆顶。',
      // jlsg_qingcheng_zhu_info: '游戏开始时，若你拥有技能［流云］：你可以重置你的武将牌，视为你使用或打出一张【杀】；你可以横置你的武将牌，视为你使用或打出一张【闪】；否则技能效果反之。',
      // jlsg_qingcheng_yin_info: '你可以重置你的武将牌，视为你使用或打出一张【杀】；你可以横置你的武将牌，视为你使用或打出一张【闪】。',
      // jlsg_qingcheng_yang_info: '你可以横置你的武将牌，视为你使用或打出一张【杀】；你可以重置你的武将牌，视为你使用或打出一张【闪】。',
      jlsg_qingcheng_info: '你可以横置你的武将牌，视为你使用或打出一张【杀】；你可以重置你的武将牌，视为你使用或打出一张【闪】。',
      jlsg_aozhan_info: '每当你因【杀】或【决斗】造成或受到1点伤害后，你可将牌堆顶的一张牌置于你的武将牌上，称为「战」。出牌阶段限一次，你可以选择一项：1、将所有「战」收入手牌。2、弃置所有「战」，然后摸等量的牌。',
      jlsg_huxiao_info: '出牌阶段，当你使用【杀】造成伤害时，若你的武将牌正面向上，你可以令此伤害+1并摸一张牌。若如此做，则此【杀】结算完毕后，将你的武将牌翻面并结束当前回合。',
      jlsg_old_huxiao_info: '出牌阶段，当你使用【杀】造成伤害时，若你的武将牌正面向上，你可以令此伤害+1并摸一张牌。若如此做，则此【杀】结算完毕后，将你的武将牌翻面并结束当前回合。',
      jlsg_guicai_info: '在任意角色的判定牌生效前，你可以选择一项：1、打出一张手牌代替之。2、亮出牌堆顶的一张牌代替之。',
      jlsg_langgu_info: '每当你造成或受到一次伤害后，你可以进行一次判定，若为黑色，你获得对方一张牌。',
      jlsg_zhuizun_info: '限定技，当你进入濒死状态时，你可以恢复体力至1点，令所有其他角色依次交给你一张手牌。然后当前回合结束后，你进行1个额外的回合。',
      jlsg_tianshang_info: '限定技，你死亡时，可令一名其他角色获得你此武将牌上拥有的其他技能，然后其增加1点体力上限并恢复1点体力。',
      jlsg_yiji_info: '每当你受到一点伤害，可以观看牌堆顶的两张牌，并将其交给任意1~2名角色。',
      jlsg_old_yiji_info: '当你受到一次伤害，可以观看牌堆顶的两张牌，并将其交给任意名角色，若你将所有的牌交给了同一名角色，你进行一次判定：判定牌为红桃，恢复1点体力。',
      jlsg_huiqu_info: '回合开始阶段，你可以弃置一张手牌进行一次判定，若结果为红色，你将场上的一张牌移动到一个合理的位置；若结果为黑色，你对一名角色造成1点伤害，然后你摸一张牌。',
      jlsg_zhaoxiang_info: '当一名其他角色使用【杀】指定目标后，你可以令其选择一项：1、交给你一张牌。2、令此【杀】对该目标无效；若其或【杀】的目标在你的攻击范围内，你须先弃置一张手牌。',
      jlsg_zhishi_info: '出牌阶段限一次，你可以令一名其他角色选择一项：1、弃置一张基本牌，然后回复一点。2、受到你造成的一点伤害，然后回复一点体力。',
      jlsg_old_zhishi_info: '出牌阶段限一次，你可以指定一名有手牌的其他角色，你选择其中一项执行：1.你展示一张【杀】令其弃置一张【杀】，若其执行，你与其恢复1点体力，否则你对其造成1点伤害；2.你展示一张【闪】令其弃置一张【闪】，若其执行，你与其恢复1点体力，否则你对其造成1点伤害。',
      jlsg_jianxiong_info: '主公技。每当其他魏势力受到不为你的一次伤害后，该角色可以弃置一张手牌，然后令你获得对其造成伤害的牌。',
      jlsg_jiuzhu_info: '每当一张非转化的【闪】进入弃牌堆时，你可以用一张不为【闪】的牌替换之。若此时不是你的回合，你可以视为对当前回合角色使用一张无视防具的【杀】。',
      jlsg_tuwei_info: '每当一张非转化的【杀】进入弃牌堆时，若你是此【杀】的目标或使用者，你可以弃置一张能造成伤害的牌，然后弃置此牌目标或使用者的共计两张牌。',
      // jlsg_xujin_info: '摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的5张牌，并令一名角色获得其中1种花色的所有牌，再将其余的牌置入弃牌堆。若如此做，你本回合的攻击范围和可以使用的【杀】数量与以此法被获得的牌的数量相同。',
      jlsg_xujin_info: '摸牌阶段开始时，你展示牌堆顶的五张牌，然后，你可以放弃摸牌并将其中一种花色的牌交给一名角色，令你本回合的攻击范围和可以使用的【杀】数量与以此法被获得的牌的数量相同。否则你将展示的牌置入弃牌堆。',
      jlsg_paoxiao_info: '出牌阶段，当你使用【杀】对目标角色造成一次伤害并结算完毕后，你可以摸一张牌，然后选择一项：使用一张无视距离的【杀】，或令该角色弃置你的一张牌。',
      jlsg_benxi_info: '锁定技，你计算与其他角色的距离时始终-1.你使用【杀】指定目标后，目标角色须弃置一张装备牌，否则此【杀】不可被【闪】响应。',
      jlsg_yaozhan_info: '出牌阶段限一次，你可以与一名其他角色拼点：若你赢，你摸一张牌并视为对其使用一张【杀】（此【杀】不计入每回合的使用限制）；若你没赢，该角色可以对你使用一张【杀】。',
      jlsg_wenjiu_info: '出牌阶段限一次，你可以将一张黑色手牌置于你的武将牌上，称为「酒」。当你使用【杀】选择目标后，你可以将一张「酒」置入弃牌堆，然后当此【杀】造成伤害时，该伤害+1；当此【杀】被【闪】响应后，你摸一张牌。',
      jlsg_shuixi_info: '回合开始阶段开始时，你可以展示一张手牌并选择一名其他角色，令其选择一项：弃置一张与之相同花色的手牌，或失去1点体力。若该角色因此法失去体力，则此回合的出牌阶段，你不能使用【杀】。',
      jlsg_sanfen_info: '出牌阶段限一次，你可以选择两名其他角色，其中一名你选择的角色须对另一名角色使用一张【杀】，然后另一名角色须对你使用一张【杀】，你弃置不如此做者一张牌。（有距离限制）',
      jlsg_guanxing_info: '回合开始/结束阶段开始时，你可以观看牌堆顶的X张牌（X为存活角色的数量，且最多为3），将其中任意数量的牌以任意顺序置于牌堆顶，其余以任意顺序置于牌堆底。',
      jlsg_weiwo_info: '锁定技，当你有手牌时，你防止受到的属性伤害；当你没有手牌时，你防止受到的非属性伤害。',
      jlsg_shouji_info: '出牌阶段限一次，你可以弃置一张牌并选择两名角色，然后根据你弃置牌的花色，视为其中一名角色对另一名角色使用一张牌：黑桃【决斗】，梅花【借刀杀人】，红桃【顺手牵羊】，方片【火攻】。',
      jlsg_hemou_info: '其他角色的出牌阶段开始时，你可以将一张手牌正面朝上交给该角色，该角色本阶段限一次，可将一张与之相同花色的手牌按下列规则使用：黑桃【决斗】，梅花【借刀杀人】，红桃【顺手牵羊】，方片【火攻】。',
      jlsg_qicai_info: '每当你失去一次手牌时，你可以进行判定，若结果为红色，你摸一张牌。',
      jlsg_rende_info: '任一角色的回合结束阶段结束时，你可以将任意数量的手牌交给该角色，然后该角色进行1个额外的出牌阶段。',
      jlsg_chouxi_info: '出牌阶段限一次，你可以弃置一张手牌并展示牌堆顶的两张牌，然后令一名其他角色选择一项：1. 弃置一张与展示牌类别均不同的牌，然后令你获得展示的牌；2. 受到你造成的1点伤害并获得其中一种类别的牌，然后你获得其余的牌。',
      jlsg_yongbing_info: '主公技，当一名其他蜀势力角色使用【杀】造成一次伤害后，该角色可令你摸一张牌。',
      jlsg_yinmeng_info: '出牌阶段限X次，若你有手牌，你可以展示一名其他男性角色的一张手牌，然后展示你的一张手牌，若两张牌类型相同，你与其各摸一张牌；若不同，你弃置其展示的牌，X为你所损失的体力且至少为1',
      jlsg_xiwu_info: '当你使用的【杀】被目标角色的【闪】响应后，你可以摸一张牌，然后弃置其一张手牌。',
      jlsg_juelie_info: '出牌阶段限一次，你可以令一名手牌数与你不同的其他角色选择一项：将手牌数调整至与你相等；或视为你对其使用一张【杀】（不计入出牌阶段的使用限制）。',
      jlsg_xianger_info: "一名其他男性角色的回合开始时，你可以交给其两张基本牌。若如此做，该角色跳过出牌阶段，然后可以视为对你使用一张【杀】，否则下回合的出牌阶段受到你的1点伤害；若其在此阶段未造成伤害，则跳过弃牌阶段，且你摸一张牌。",
      jlsg_fangxin_info: '当你需要使用一张【桃】时，你可以将一张梅花牌当【兵粮寸断】或将一张方片牌当【乐不思蜀】对自己使用，若如此做，视为你使用了一张【桃】。',
      jlsg_xiyu_info: '你的回合开始时，你可以弃置一名角色的一张牌，然后该角色进行一个额外的出牌阶段。',
      jlsg_wanrou_info: '你的方片牌或你判定区的牌进入弃牌堆时，你可以令一名角色摸一张牌。',
      jlsg_zhouyan_info: '出牌阶段，你可以令一名角色摸一张牌，若如此做，视为你对其使用一张【火攻】，你可以重复此流程直到你以此法未造成伤害。每当你使用【火攻】造成一次伤害后，你可以摸一张牌。',
      jlsg_zhaxiang_info: '出牌阶段，你可以将一张手牌扣置，然后令一名其它角色选择一项：交给你一张牌并弃置你扣置的牌；或展示你扣置的牌并获得之。若你扣置的牌为【杀】，则视为你对其使用一张火属性的【杀】（不计入出牌阶段的使用限制且不可被响应）。',
      jlsg_old_zhaxiang_info: '出牌阶段限一次，你可以指定一名其它角色，视为该角色对你使用一张【杀】，然后你摸两张牌并视为对其使用一张【杀】（你的此【杀】无视防具）。',
      jlsg_shixue_info: '当你使用【杀】指定目标后，你可以摸两张牌；若如此做，当此【杀】被【闪】响应后，你须弃置两张牌。',
      jlsg_guoshi_info: '任一角色的回合开始阶段开始时，你可以观看牌堆顶的两张牌，然后可将其中任意张牌置于牌堆底。一名角色的回合结束阶段开始时，你可以令其获得本回合因弃置或判定进入弃牌堆的一张牌。',
      jlsg_yingcai_info: '摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的一张牌，你重复此流程直到你展示出第3种花色的牌时，将这张牌置入弃牌堆，然后获得其余的牌。',
      jlsg_old_yingcai_info: '摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的一张牌，你重复此流程直到你展示出第三种花色的牌时，将这张牌置入弃牌堆，然后获得其余的牌。',
      jlsg_weibao_info: '出牌阶段限一次，你可以将一张手牌置于牌堆顶，然后令一名其他角色选择一种花色后摸一张牌并展示之，若此牌与所选花色不同，你对其造成一点伤害。',
      jlsg_choulve_info: '出牌阶段限一次，你可以交给两名其他角色各一张手牌，然后依次展示之，点数较大的一方视为对另一方使用一张【杀】。该【杀】造成伤害后，你摸一张牌。',
      jlsg_jiexi_info: '出牌阶段，你可以与一名其他角色拼点，若你赢，视为对其使用一张【过河拆桥】。你可重复此流程直到你以此法拼点没赢。',
      jlsg_old_jiexi_info: '若你的武将牌正面朝上，你可以指定一名有手牌的角色进行拼点：若你赢，你视为对其使用一张【过河拆桥】，否则本回合不可发动此技能；锁定技，若你的武将牌正面朝上并触发技能〈劫袭〉后，且你的手牌数小于4时，你将武将牌背面朝上并摸一张牌；若你的武将牌背面朝上，你不能成为【南蛮入侵】和【闪电】的目标。',
      jlsg_youxia_info: '出牌阶段，若你的武将牌正面朝上，你可以将你的武将牌翻面，然后从一至两名其他角色处各获得一张牌；锁定技，若你的武将牌背面朝上，你不能成为【杀】和【决斗】的目标。',
      jlsg_old_youxia_info: '出牌阶段限一次，你可以将你的武将牌翻面，然后从1至2名其他角色的区域各弃置一张牌；锁定技，若你的武将牌背面朝上，你不能成为【杀】和【兵粮寸断】的目标。',

      jlsg_huailing_info: '若你的武将牌背面朝上，其他角色使用一张锦囊牌指定大于一个目标时，你可以令一名其他角色不受到该牌的效果，然后你将武将牌正面朝上；锁定技，若你的武将牌背面朝上，你不能成为【决斗】和【过河拆桥】的目标。',
      jlsg_dailao_info: '出牌阶段限一次，你可以令一名其他角色与你将武将牌翻面，然后其选择一项：与你各摸一张牌；或与你各弃置一张牌。',
      jlsg_youdi_info: '若你的武将牌背面朝上，你可以将其翻面来视为你使用一张【闪】。每当你使用【闪】响应一名角色使用的【杀】时，你可以弃置至多X张牌，然后该角色弃置等量的牌（X为该角色的牌数）。',
      jlsg_ruya_info: '当你失去最后的手牌时，你可以翻面并将手牌补至你体力上限的张数。',
      jlsg_quanheng_info: '出牌阶段限一次，你可以将至少一张手牌当【无中生有】或【杀】使用，若你以此法使用的牌被【无懈可击】或【闪】响应时，你摸等量的牌。',
      jlsg_xionglve_info: '摸牌阶段，你可以放弃摸牌，改为展示牌堆顶的两张牌，你获得其中一张牌，然后将另一张牌置于你的武将牌上，称为「略」。出牌阶段，你可以将一张基本牌或锦囊牌的「略」当与之同类别的任意一张牌（延时类锦囊牌除外）使用，将一张装备牌的「略」置于一名其他角色装备区内的相应位置。',
      jlsg_fuzheng_info: '主公技，回合开始阶段开始时，你可以令至多两名其他吴势力角色各摸一张牌，然后这些角色依次将一张手牌置于牌堆顶。',
      jlsg_jiwu_info: '出牌阶段限一次，你可以将你的手牌调整至一张，若如此做，本回合你的攻击范围无限，且你下一次使用的【杀】造成的伤害+1。锁定技，若你的装备区没有牌，你使用【杀】可以额外指定至多两名目标。',
      jlsg_old_jiwu_info: '出牌阶段限一次，若你的手牌数大于一，若如此做，本回合你的攻击范围无限，且你下一次使用的【杀】造成的伤害+1。锁定技，若你的装备区没有牌，你使用【杀】可以至多额外指定任意两名其他角色为目标。',

      jlsg_sheji_info: '当一名装备区有武器牌的其他角色对另一名角色造成伤害后，你可以弃置一张牌，然后获得该角色的武器牌。你可以将装备牌当无距离限制的【杀】使用或打出，你以此法使用的【杀】须连续使用两张【闪】才能抵消。',
      jlsg_xingyi_info: '出牌阶段限一次，你可以获得一名有手牌的其他角色一张手牌，然后令其恢复1点体力。',
      jlsg_guagu_info: '当一名角色进入濒死状态时，你可以弃置其所有手牌（至少一张），然后该角色恢复1点体力。若你以此法弃置其两张或更多的手牌，该角色摸一张牌。',
      jlsg_wuqin_info: '回合结束阶段结束时，你可以弃置一张基本牌，然后摸两张牌并进行一个额外的出牌阶段。',
      jlsg_lijian_info: '出牌阶段限一次，你可以弃一张牌并选择两名其他男性角色。若如此做，视为其中一名男性角色对另一名男性角色使用一张【决斗】(该【决斗】不可被【无懈可击】响应)。',
      jlsg_manwu_info: '出牌阶段限一次，你可以展示一名男性角色的一张手牌，若此牌为方片，将之置于该角色的判定区内，视为【乐不思蜀】；若不为方片，你获得之。',
      jlsg_baiyue_info: '回合结束阶段开始时，你可以获得本回合其他角色进入弃牌堆的一张牌。',
      jlsg_ganglie_info: '出牌阶段开始时，你可以失去1点体力，若如此做，你本回合下一次造成的伤害+1。且本回合你每造成1点伤害，回合结束时你便摸一张牌',
    },
  };
  if (false && lib.config.extension_极略_oldCharacterReplace) {
    for (var i in jlsg_sr.character) {
      if (i == 'jlsgsr_sunshangxiang') {
        jlsg_sr.character[i][3] = ['jlsg_yinmeng', 'jlsg_xianger', 'jlsg_juelie'];
        jlsg_sr.translate[i] = 'SR旧孙尚香';
      } else if (i == 'jlsgsr_guojia') {
        jlsg_sr.character[i][3] = ['jlsg_tianshang', 'jlsg_old_yiji', 'jlsg_huiqu'];
        jlsg_sr.translate[i] = 'SR旧郭嘉';
      } else if (i == 'jlsgsr_luxun') {
        jlsg_sr.character[i][3] = ['jlsg_old_dailao', 'jlsg_old_youdi', 'jlsg_old_ruya'];
        jlsg_sr.translate[i] = 'SR旧陆逊';
      } else if (i == 'jlsgsr_caocao') {
        jlsg_sr.character[i][3] = ['jlsg_zhaoxiang', 'jlsg_old_zhishi', 'jlsg_jianxiong'];
        jlsg_sr.translate[i] = 'SR旧曹操';
      } else if (i == 'jlsgsr_xuzhu') {
        jlsg_sr.character[i][3] = ['jlsg_aozhan', 'jlsg_old_huxiao'];
        jlsg_sr.translate[i] = 'SR旧许褚';
      } else if (i == 'jlsgsr_ganning') {
        jlsg_sr.character[i][3] = ['jlsg_old_jiexi', 'jlsg_old_youxia', 'jlsg_huailing'];
        jlsg_sr.translate[i] = 'SR旧甘宁';
      } else if (i == 'jlsgsr_huanggai') {
        jlsg_sr.character[i][3] = ['jlsg_zhouyan', 'jlsg_old_zhaxiang'];
        jlsg_sr.translate[i] = 'SR旧黄盖';
      } else if (i == 'jlsgsr_zhouyu') {
        jlsg_sr.character[i][3] = ['jlsg_old_yingcai', 'jlsg_weibao', 'jlsg_choulve'];
        jlsg_sr.translate[i] = 'SR旧周瑜';
      }
    }
  }
  postProcessPack(jlsg_sr);
  return jlsg_sr;
}