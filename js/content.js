import { lib, game, ui, get, ai, _status } from '../../../noname.js';
export function content(config, pack) {
  console.time(_status.extension);
  if (pack.changelog) {
    var testCode = `\
let a = 1;
const b = 1;
(() => a + b)();`;
    try {
      eval(testCode);
    } catch (error) {
      if (!lib.config["extension_极略_compatibilityAlert"]) {
        game.saveConfig("extension_极略_compatibilityAlert", true);
        alert("极略与你的设备或是无名杀版本不兼容", "极略");
      }
      pack.changelog = `<span style="font-weight:bold;">极略与你的设备不兼容，因此导入被终止了。</span><br>` + pack.changelog;
      return;
    }
    game.showExtensionChangeLog(pack.changelog);
  }
  if (config.debug) {
    lib.arenaReady.push(() => {
      lib.config.characters = window.__configCharactersBackup.slice();
    });
  }
  if (!_status.evaluatingExtension) {
    var callback = () => {
      if (!lib.config["extension_极略_wrongExtensionNameAlert"]) {
        game.saveConfig("extension_极略_wrongExtensionNameAlert", true);
        alert('万能导入/玄武版导入时需将拓展名设置为极略！你是不是设置错了？');
      }
    };
    if (lib.device) {
      window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
        entry.getDirectory('extension/极略/', {}, function (dirEntry) { }, callback);
      });
    } else {
      fetch(lib.assetURL + "extension/极略/extension.js").catch(e => {
        setTimeout(callback, 500);
      });
    }
  } else {
    game.saveConfig("extension_极略_wrongExtensionNameAlert", false);
  }
  lib.config.all.cards.push('jlsg_qs');
  lib.config.all.characters.push('jlsg_sk', 'jlsg_skpf', 'jlsg_sr', 'jlsg_soul', 'jlsg_sy');
  // lib.skill._jlsg_die_audio = { // 死亡语音
  //   trigger: { player: 'dieBegin' },
  //   //direct:true,
  //   priority: 2,
  //   forced: true,
  //   unique: true,
  //   popup: false,
  //   filter: function (event, player) {
  //     return player.name.includes('jlsg');
  //   },
  //   content: function () {
  //     game.playAudio('..', 'extension', '极略', 'die', trigger.player.name);
  //     // trigger.audioed = true;
  //   },
  // };
  var characterReplaceExclude = {
    jlsgsk_luzhi: 'yl_luzhi',
    jlsgsk_huangyueying: 'jsp_huangyueying',
    jlsgsk_simashi: 'jin_simashi',
    jlsgsk_simazhao: 'jin_simazhao',
    jlsgsk_jiangqin: 'jiangqing',
    jlsgsk_guanyu: 'jsp_guanyu',
    jlsgsk_jiping: 'sp_jiben',
    jlsgsk_mifuren: 'sp_mifuren',
    jlsgsk_hejin: 're_hejin',
    jlsgsk_zoushi: 're_zoushi',
    jlsgsk_kongrong: 'sp_kongrong',
    jlsgsk_machao: 'sp_machao',
    jlsgsk_caiwenji: 'sp_caiwenji',
    jlsgsk_jdjg_sunshangxiang: 'sunshangxiang',
    jlsgsk_syqj_guanyu: 'guanyu',
    jlsgsk_sslh_zhenji: 'zhenji',
    jlsgsk_pangtong: 'sp_pangtong',
    jlsgsk_spwq_lvbu: 'lvbu',
  };
  var trivialSolveCharacterReplace = function (name, prefix = '') {
    var originalName = prefix + name.substring(name.lastIndexOf('_') + 1);
    if (name in characterReplaceExclude) {
      if (characterReplaceExclude[name]) {
        originalName = characterReplaceExclude[name];
      } else {
        return;
      }
    }
    if (originalName && lib.character[originalName]) {
      if (!lib.characterReplace[originalName]) {
        lib.characterReplace[originalName] = [originalName, name];
      } else {
        lib.characterReplace[originalName].push(name);
      }
    }
  };
  for (var i of Object.keys(lib.characterPack['jlsg_sr'])) {
    trivialSolveCharacterReplace(i);
  }
  for (var i of Object.keys(lib.characterPack['jlsg_sk'])) {
    trivialSolveCharacterReplace(i);
  }
  for (var i of Object.keys(lib.characterPack['jlsg_soul'])) {
    trivialSolveCharacterReplace(i, 'shen_');
  }
  for (var i of Object.keys(lib.characterPack['jlsg_sy'])) {
    if (!lib.config.forbidai_user.includes(i))
      lib.config.forbidai.remove(i);
  }
  if (config.jlsg_identity_music_image && get.mode() != 'boss') {
    lib.arenaReady.push(function () {
      ui.backgroundMusic.volume = lib.config.volumn_background / 8;
      setTimeout(function () {
        ui.backgroundMusic.src = lib.assetURL + "extension/极略/audio/other/jlsg_identity_music_image.mp3";
      }, 100);
      setInterval(function () {
        ui.backgroundMusic.src = lib.assetURL + "extension/极略/audio/other/jlsg_identity_music_image.mp3";
      }, 137000);
    });
    lib.arenaReady.push(function () {
      ui.background.setBackgroundImage("extension/极略/image/other/jlsg_identity_music_image.jpg");
    });
  }
  if (config.jlsg_boss_music_image && get.mode() == 'boss') {
    lib.arenaReady.push(function () {
      ui.backgroundMusic.volume = lib.config.volumn_background / 8;
      setTimeout(function () {
        ui.backgroundMusic.src = lib.assetURL + "extension/极略/audio/other/jlsg_boss_music_image.mp3";
      }, 100);
      setInterval(function () {
        ui.backgroundMusic.src = lib.assetURL + "extension/极略/audio/other/jlsg_boss_music_image.mp3";
      }, 168000);
    });
    lib.arenaReady.push(function () {
      ui.background.setBackgroundImage("extension/极略/image/other/jlsg_boss_music_image.jpg");
    });
  }
  // prepare rank & rarity data
  // if (false) {
  if (lib.rank) { // 评级
    var retrieveFromTierMaker = function () {
      var result = $(".tier.sort").map(function () {
        var res = $(this).children().map(function () { return $(this).css("background-image").match(/jlsg\w+(?=jpg)/); });
        return res;
      });
      result = result.toArray().map(ss => ss.toArray());
      var ranks = ['s', 'ap', 'a', 'am', 'bp', 'b', 'bm', 'c', 'd'];
      var A = {};
      for (var i = 0; i != result.length; ++i) {
        A[ranks[i]] = result[i];
      }
      return JSON.stringify(A);
    };
    var rank = {
      s: [
        'jlsgsoul_diaochan',
        'jlsgsoul_guojia',
        'jlsgsoul_simahui',
        'jlsgsoul_simayi',
        'jlsgsoul_zhaoyun',
        'jlsgsoul_sunquan',
        'jlsgsr_huangyueying',
        'jlsgsoul_huangyueying',
        'jlsgsoul_sp_zhugeliang',
        'jlsgsk_caiwenji',
        'jlsgsoul_ganning',
        'jlsgsoul_sp_lvbu',
        'jlsgsoul_xiahoudun',
        'jlsgsk_xiahoushi',
        'jlsgsk_sundeng',
        'jlsgsk_wuxian',
        'jlsgsoul_xuzhu',
        'jlsgsoul_sp_ganning',
        'jlsgsk_hetaihou',
        'jlsgsoul_sp_diaochan',
        'jlsgsk_shamoke',
        'jlsgsk_zhaoyan',
        'jlsgsoul_sp_huangyueying',
        'jlsgsk_caoying',
        'jlsgsoul_caoren',
        'jlsgsoul_sp_simayi',
        'jlsgsk_nanhualaoxian',
        'jlsgsoul_caopi',
        'jlsgsk_wanniangongzhu',
      ],
      ap: [
        'jlsgsr_lvbu',
        'jlsgsoul_caocao',
        'jlsgsoul_dianwei',
        'jlsgsoul_jiaxu',
        'jlsgsoul_guanyu',
        'jlsgsoul_liubei',
        'jlsgsoul_zhugeliang',
        'jlsgsoul_lvmeng',
        'jlsgsoul_luxun',
        'jlsgsoul_sunshangxiang',
        'jlsgsoul_zhenji',
        'jlsgsoul_huanggai',
        'jlsgsr_zhenji',
        'jlsgsr_sunshangxiang',
        'jlsgsr_lvmeng',
        'jlsgsr_luxun',
        'jlsgsr_daqiao',
        'jlsgsk_dongzhuo',
        'jlsgsk_guonvwang',
        'jlsgsoul_zhangliao',
        'jlsgsk_xizhicai',
        'jlsgsk_xushi',
        'jlsgsk_caorui',
        'jlsgsk_sunxiu',
        'jlsgsk_zhangrang',
        'jlsgsk_xinxianying',
        'jlsgsoul_sp_zhangliao',
        'jlsgsk_liuyan',
        'jlsgsk_lvfan',
        'jlsgsoul_xiaoqiao',
        'jlsgsk_sslh_zhenji',
        'jlsgsk_zhongyao',
        'jlsgsk_huanghao',
        'jlsgsk_huaman',
        'jlsgsk_wangyuanji',
        'jlsgsk_zhangchangpu',
      ],
      a: [
        'jlsgsoul_zhouyu',
        'jlsgsoul_zuoci',
        'jlsgsr_simayi',
        'jlsgsr_guojia',
        'jlsgsr_diaochan',
        'jlsgsk_chengyu',
        'jlsgsk_yujin',
        'jlsgsk_simazhao',
        'jlsgsk_kuaiyue',
        'jlsgsk_zhangning',
        'jlsgsk_zhoutai',
        'jlsgsk_dongbai',
        'jlsgsk_liuchen',
        'jlsgsk_caoxiu',
        'jlsgsk_caojie',
        'jlsgsk_sunliang',
        'jlsgsk_yuji',
        'jlsgsk_sunru',
        'jlsgsoul_huangzhong',
        'jlsgsk_guohuanghou',
        'jlsgsk_chenqun',
        'jlsgsk_jiangwei',
        'jlsgsk_spwq_lvbu',
      ],
      am: [
        'jlsgsoul_zhangjiao',
        'jlsgsk_zuoci',
        'jlsgsoul_lvbu',
        'jlsgsr_zhugeliang',
        'jlsgsr_zhangliao',
        'jlsgsr_liubei',
        'jlsgsk_dongyun',
        'jlsgsk_sunqian',
        'jlsgsoul_huatuo',
        'jlsgsr_huatuo',
        'jlsgsk_kongrong',
        'jlsgsk_lukang',
        'jlsgsk_xianglang',
        'jlsgsk_guanlu',
        'jlsgsk_zhanglu',
        'jlsgsk_yangxiu',
        'jlsgsk_zoushi',
        'jlsgsk_guansuo',
        'jlsgsk_baosanniang',
        'jlsgsk_zhoufei',
        'jlsgsk_zhangliang',
        'jlsgsk_panshu',
        'jlsgsoul_sp_zhangjiao',
        'jlsgsk_jushou',
        'jlsgsk_yanyan',
        'jlsgsoul_daqiao',
        'jlsgsk_zhugezhan',
        'jlsgsk_gongsunyuan',
        'jlsgsk_jdjg_sunshangxiang',
        'jlsgsk_zhangyi',
        'jlsgsk_caochun',
        'jlsgsk_syqj_guanyu',
        'jlsgsk_beimihu',
        'jlsgsk_pangtong',
      ],
      bp: [
        'jlsgsr_zhouyu',
        'jlsgsr_sunquan',
        'jlsgsr_machao',
        'jlsgsr_ganning',
        'jlsgsr_caocao',
        'jlsgsr_zhaoyun',
        'jlsgsk_chendao',
        'jlsgsk_guanxing',
        'jlsgsk_huangyueying',
        'jlsgsk_zumao',
        'jlsgsk_zhugejin',
        'jlsgsk_maliang',
        'jlsgsk_sunluyu',
        'jlsgsk_mizhu',
        'jlsgsr_xiahoudun',
        'jlsgsk_zhangren',
        'jlsgsk_zhangbu',
        'jlsgsk_heqi',
        'jlsgsk_zhuzhi',
        'jlsgsk_wanglang',
        'jlsgsk_zhaoxiang',
        'jlsgsk_lingcao',
      ],
      b: [
        'jlsgsoul_zhangfei',
        'jlsgsr_zhangfei',
        'jlsgsr_guanyu',
        'jlsgsk_buzhi',
        'jlsgsk_caochong',
        'jlsgsk_dengzhi',
        'jlsgsk_dongxi',
        'jlsgsk_guanyu',
        'jlsgsk_feiyi',
        'jlsgsk_hejin',
        'jlsgsk_jiping',
        'jlsgsk_jiangqin',
        'jlsgsk_luji',
        'jlsgsk_miheng',
        'jlsgsk_zhuran',
        'jlsgsk_wangyi',
        'jlsgsk_luzhi',
        'jlsgsk_sunhao',
        'jlsgsk_zhoucang',
        'jlsgsk_zhangxiu',
        'jlsgsk_quancong',
        'jlsgsk_simashi',
        'jlsgsk_tianfeng',
        'jlsgsk_wenchou',
        'jlsgsk_xuyou',
        'jlsgsk_yanliang',
        'jlsgsk_wangping',
        'jlsgsk_zhangbao',
        'jlsgsr_xuzhu',
        'jlsgsk_zhugeguo',
        'jlsgsoul_machao',
        'jlsgsk_wuyi',
        'jlsgsk_wenyang',
        'jlsgsk_wutugu',
        'jlsgsk_mayunlu',
      ],
      bm: [
        'jlsgsr_huanggai',
        'jlsgsk_caoren',
        'jlsgsk_bianfuren',
        'jlsgsk_huaxiong',
        'jlsgsk_liyan',
        'jlsgsk_lvlingqi',
        'jlsgsk_sunce',
        'jlsgsk_yuji',
        'jlsgsk_dingfeng',
        'jlsgsk_zangba',
        'jlsgsk_mifuren',
        'jlsgsk_machao',
        'jlsgsk_panzhang',
        'jlsgsk_lvdai',
      ],
      c: [
        'jlsgsk_gongsunzan',
        'jlsgsk_panfeng',
        'jlsgsk_mateng',
      ],
      d: [],
      rarity: {
        legend: [ // 传说
          'jlsgsk_yuji',
          'jlsgsk_jdjg_sunshangxiang',
          'jlsgsk_syqj_guanyu',
          'jlsgsk_sslh_zhenji',
          'jlsgsk_spwq_lvbu',
          'jlsgsk_wanniangongzhu',
        ],
        epic: [ // 史诗
          "jlsgsk_zhangning",
          "jlsgsk_dongyun",
          "jlsgsk_tianfeng",
          "jlsgsk_jiangqin",
          "jlsgsk_zuoci",
          "jlsgsk_heqi",
          "jlsgsk_guanxing",
          "jlsgsk_sunqian",
          "jlsgsk_zhangbao",
          "jlsgsk_dongzhuo",
          "jlsgsk_zhanglu",
          "jlsgsk_quancong",
          "jlsgsk_chengyu",
          "jlsgsk_kuaiyue",
          "jlsgsk_luzhi",
          "jlsgsk_zoushi",
          "jlsgsk_wuyi",
          "jlsgsk_zhangliang",
          "jlsgsk_panshu",
          "jlsgsk_caorui",
          "jlsgsk_mifuren",
          "jlsgsk_caiwenji",
          'jlsgsk_guansuo',
          'jlsgsk_baosanniang',
          'jlsgsk_dongbai',
          'jlsgsk_sunxiu',
          'jlsgsk_zhangrang',
          'jlsgsk_xiahoushi',
          'jlsgsk_sundeng',
          'jlsgsk_xinxianying',
          'jlsgsk_wuxian',
          'jlsgsk_wanglang',
          'jlsgsk_zhugezhan',
          'jlsgsk_guohuanghou',
          'jlsgsk_zhaoxiang',
          'jlsgsk_lvfan',
          'jlsgsk_hetaihou',
          'jlsgsk_zhaoyan',
          'jlsgsk_beimihu',
          'jlsgsk_caoying',
          'jlsgsk_mayunlu',
          'jlsgsk_nanhualaoxian',
          'jlsgsk_jiangwei',
          'jlsgsk_huaman',
          'jlsgsk_pangtong',
          'jlsgsk_wangyuanji',
          'jlsgsk_zhangchangpu',
        ],
        rare: [ // 稀有
          "jlsgsk_simashi",
          "jlsgsk_xianglang",
          "jlsgsk_luji",
          "jlsgsk_bianfuren",
          "jlsgsk_mateng",
          "jlsgsk_feiyi",
          "jlsgsk_dongxi",
          "jlsgsk_yujin",
          "jlsgsk_panfeng",
          "jlsgsk_zhangbu",
          "jlsgsk_maliang",
          "jlsgsk_chendao",
          "jlsgsk_zhuran",
          "jlsgsk_lukang",
          "jlsgsk_zhoutai",
          "jlsgsk_kongrong",
          "jlsgsk_caochong",
          "jlsgsk_simazhao",
          "jlsgsk_yangxiu",
          "jlsgsk_sunhao",
          "jlsgsk_zhugejin",
          "jlsgsk_zhangxiu",
          "jlsgsk_sunluyu",
          "jlsgsk_yuji",
          "jlsgsk_guonvwang",
          "jlsgsk_zhangren",
          "jlsgsk_mizhu",
          "jlsgsk_zangba",
          "jlsgsk_hejin",
          "jlsgsk_wangyi",
          "jlsgsk_guanyu",
          "jlsgsk_yanliang",
          "jlsgsk_machao",
          "jlsgsk_xushi",
          "jlsgsk_zhoufei",
          "jlsgsk_liuchen",
          "jlsgsk_caoxiu",
          "jlsgsk_caojie",
          "jlsgsk_zhuzhi",
          "jlsgsk_jushou",
          "jlsgsk_sunliang",
          "jlsgsk_wenyang",
          "jlsgsk_yanyan",
          "jlsgsk_sunru",
          "jlsgsk_liuyan",
          "jlsgsk_gongsunyuan",
          "jlsgsk_chenqun",
          "jlsgsk_zhangyi",
          "jlsgsk_caochun",
          "jlsgsk_shamoke",
          "jlsgsk_lingcao",
          "jlsgsk_wutugu",
          "jlsgsk_zhongyao",
          "jlsgsk_huanghao",
          "jlsgsk_lvdai",
        ],
        junk: [ // 平凡
          'jlsgsk_xuyou',
          'jlsgsk_wangping',
          "jlsgsk_caoren",
          "jlsgsk_huaxiong",
          "jlsgsk_sunce",
          "jlsgsk_dengzhi",
          "jlsgsk_zumao",
          "jlsgsk_gongsunzan",
          "jlsgsk_buzhi",
          "jlsgsk_jiping",
          "jlsgsk_miheng",
          "jlsgsk_liyan",
          "jlsgsk_huangyueying",
          "jlsgsk_zhoucang",
          "jlsgsk_dingfeng",
          "jlsgsk_lvlingqi",
          "jlsgsk_guanlu",
          'jlsgsr_machao',
          'jlsgsk_panzhang',
        ],
      },
    };
    // soul characters reside in the highest rarity rank
    for (var name of Object.keys(lib.characterPack['jlsg_soul'])) {
      if (!Object.keys(rank.rarity).some(rarity => rank.rarity[rarity].includes(name))) {
        rank.rarity.legend.push(name);
      }
    }
    // sr characters drop a rank if srlose is enabled
    for (var name of Object.keys(lib.characterPack['jlsg_sr'])) {
      if (!Object.keys(rank.rarity).some(rarity => rank.rarity[rarity].includes(name))) {
        rank.rarity.rare.push(name);
      }
      if (config.srlose) {
        var ranks = Object.keys(rank);
        ranks.pop();
        for (var i = 0; i != ranks.length; ++i) {
          var theRank = ranks[i];
          var nameIdx = rank[theRank].indexOf(name);
          if (nameIdx != -1 && theRank != 'd') {
            rank[theRank].splice(nameIdx, 1);
            if (name == 'jlsgsr_lvbu') {
              rank.b.push(name);
            } else {
              rank[ranks[i + 1]].push(name);
            }
            break;
          }
        }
      } // config.srlose
    } // jlsg_sr
    var addRank = function (rank) {
      if (!lib.rank) return;
      for (var i in rank) {
        if (i == 'rarity') continue;
        lib.rank[i].addArray(rank[i]);
      }
      if (rank.rarity && lib.rank.rarity) {
        for (var i in rank.rarity) {
          if (lib.rank.rarity[i] === undefined) {
            lib.rank.rarity[i] = [];
          }
          lib.rank.rarity[i].addArray(rank.rarity[i]);
        }
      }
    };
    addRank(rank);
  } // lib.rank
  // 千幻聆音 (换肤)
  // temporarily disabled
  if (false && lib.qhlypkg) {
    lib.qhlypkg.push({
      isExt: true,//是否是扩展，一般填true
      filterCharacter: function (name) {
        return name.startsWith('jlsg');//判断此ID的武将是否属于此皮肤包
      },
      // isLutou: lib.config.xwLutou,//判断是否当前启用露头，没有露头皮肤可不需要此项。
      // lutouPrefix:'extension/极略/lutou/',//露头原皮皮肤前缀，标识露头原皮皮肤的位置。
      prefix: 'extension/极略/', //原皮前缀，标识原皮肤的位置。
      skin: {
        standard: 'extension/极略/skin/standard/',//可切换普通皮肤的前缀
        // lutou:'extension/极略/skin/lutou/',//可切换露头皮肤的前缀
      },
      audioOrigin: 'extension/极略/',//原技能配音位置
      // audio:'extension/极略/skin/audio/',//切换皮肤后的技能配音位置
      skininfo: {
        wushaungluanji: {
          title: '稀有',
          translation: '无双乱戟',
          info: '',
        },
        juemingyoulan: {
          title: '限定',
          translation: '绝命幽兰',
          info: '据说在某个神秘游戏里可以提升一点武将的体力上限。',
        },
        nagenanren: {
          title: '传说',
          translation: '那个男人',
          info: '',
        },
        huoshaowuchao: {
          title: '稀有',
          translation: '火烧乌巢',
          info: '',
        },
        zhengtaifenbu: {
          title: '史诗',
          translation: '正态分布',
          info: '据说在某个神秘游戏里可以使开局手牌数+2。',
        },
      }
    });
  }
  if (config.oldCharacterReplace) {
    lib.jlsgsoul_zhangliao[3] = ['jlsg_old_nizhan', 'jlsg_old_cuifeng', 'jlsg_old_weizhen'];
    lib.jlsgsoul_ganning[3] = ['jlsg_old_lvezhen', 'jlsg_old_youlong'];
    lib.jlsgsoul_xiahoudun[3] = ['jlsg_old_danjing', 'jlsg_old_zhonghun'];
    lib.jlsgsoul_huangyueying[3] = ['jlsg_old_zhiming', 'jlsg_old_suyin'];
    lib.jlsgsoul_lvmeng[3] = ['jlsg_old_shelie', 'jlsg_old_gongxin'];
  }
  console.timeEnd(_status.extension);
};