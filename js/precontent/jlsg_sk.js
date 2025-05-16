import { lib, game, ui, get, ai, _status } from '../../../../noname.js';
import postProcessPack from './postProcessPack.js';
export default function () {
  var jlsg_sk = {
    name: 'jlsg_sk',
    connect: true,
    characterSort: {
      jlsg_sk: {
        jlsg_tiangang: ['jlsgsk_xuyou', 'jlsgsk_dengzhi', 'jlsgsk_dongyun', 'jlsgsk_kuaiyue', 'jlsgsk_yuji',
          'jlsgsk_panshu', 'jlsgsk_zhangrang', 'jlsgsk_xinxianying', 'jlsgsk_wuxian', 'jlsgsk_jushou',
          'jlsgsk_wenyang', 'jlsgsk_zhugezhan', 'jlsgsk_sunru', 'jlsgsk_liuyan', 'jlsgsk_guohuanghou',
          'jlsgsk_zhaoxiang', 'jlsgsk_lvfan', 'jlsgsk_hetaihou', 'jlsgsk_zhangyi', 'jlsgsk_caochun',
          'jlsgsk_shamoke', 'jlsgsk_lingcao', 'jlsgsk_zhaoyan', 'jlsgsk_beimihu', 'jlsgsk_wutugu',
          'jlsgsk_caoying'],
        jlsg_disha: ['jlsgsk_sunce', 'jlsgsk_caoren', 'jlsgsk_gongsunzan', 'jlsgsk_huaxiong', 'jlsgsk_zumao',
          'jlsgsk_miheng', 'jlsgsk_zhangbu', 'jlsgsk_guonvwang', 'jlsgsk_quancong', 'jlsgsk_mateng',
          'jlsgsk_zhoufei', 'jlsgsk_liuchen', 'jlsgsk_xiahoushi', 'jlsgsk_yanyan', 'jlsgsk_panzhang',
          'jlsgsk_gongsunyuan', 'jlsgsk_chenqun'],
        jlsg_renjie: ['jlsgsk_wangping', 'jlsgsk_buzhi', 'jlsgsk_maliang', 'jlsgsk_sunqian', 'jlsgsk_dongxi',
          'jlsgsk_luzhi', 'jlsgsk_mifuren', 'jlsgsk_xizhicai', 'jlsgsk_zhangliang', 'jlsgsk_caorui',
          'jlsgsk_sunxiu', 'jlsgsk_sundeng', 'jlsgsk_zhuzhi', 'jlsgsk_wanglang', 'jlsgsk_sunliang',
          'jlsgsk_mayunlu', 'jlsgsk_zhongyao', 'jlsgsk_nanhualaoxian', 'jlsgsk_jiangwei', 'jlsgsk_huanghao',
          'jlsgsk_huaman', 'jlsgsk_pangtong', 'jlsgsk_lvdai', 'jlsgsk_wangyuanji', 'jlsgsk_zhangchangpu',
          "jlsgsk_guohuai", "jlsgsk_qinmi", "jlsgsk_zhouyi", "jlsgsk_xingdaorong", "jlsgsk_huangchengyan",
          "jlsgsk_lvkai", "jlsgsk_zhugedan", "jlsgsk_yangwan", "jlsgsk_cenhun", "jlsgsk_gexuan"],
        jlsg_pojun: ['jlsgsk_zhuran', 'jlsgsk_yanliang', 'jlsgsk_chendao', 'jlsgsk_dingfeng', 'jlsgsk_dongzhuo',
          'jlsgsk_yujin', 'jlsgsk_panfeng', 'jlsgsk_jiangqin', 'jlsgsk_guanxing', 'jlsgsk_guansuo',
          'jlsgsk_baosanniang', 'jlsgsk_dongbai', 'jlsgsk_xushi', 'jlsgsk_caoxiu', 'jlsgsk_caojie'],
        jlsg_yinyang: ['jlsgsk_zuoci', 'jlsgsk_guanlu', 'jlsgsk_wangyi', 'jlsgsk_zhanglu', 'jlsgsk_kongrong',
          'jlsgsk_zhoucang', 'jlsgsk_zhoutai', 'jlsgsk_lvlingqi', 'jlsgsk_lukang', 'jlsgsk_luji',
          'jlsgsk_xianglang', 'jlsgsk_zoushi', 'jlsgsk_zhugeguo'],
        jlsg_tanlang: ['jlsgsk_zhangxiu', 'jlsgsk_zhugejin', 'jlsgsk_liyan', 'jlsgsk_jiping', 'jlsgsk_sunhao',
          'jlsgsk_yangxiu', 'jlsgsk_simazhao', 'jlsgsk_simashi', 'jlsgsk_zhangning', 'jlsgsk_feiyi',
          'jlsgsk_wuyi',],
        jlsg_jiangxing: ['jlsgsk_sunluyu', 'jlsgsk_chengyu', 'jlsgsk_mizhu', 'jlsgsk_zhangren', 'jlsgsk_zangba',
          'jlsgsk_hejin', 'jlsgsk_zhangbao', 'jlsgsk_bianfuren', 'jlsgsk_heqi', 'jlsgsk_tianfeng'],
        jlsg_sp: ['jlsgsk_guanyu', 'jlsgsk_huangyueying', 'jlsgsk_machao', 'jlsgsk_caiwenji', 'jlsgsk_wanniangongzhu'],
      },
    },
    character: {
      jlsgsk_simashi: ["male", 'wei', 4, ["jlsg_quanlue"], ["name:司马|师"]],
      jlsgsk_xianglang: ["male", 'shu', 3, ["jlsg_cangshu", "jlsg_kanwu"], []],
      jlsgsk_luji: ["male", 'wu', 3, ["jlsg_huaiju", "jlsg_huntian"], []],
      jlsgsk_bianfuren: ["female", 'wei', 3, ["jlsg_huage", "jlsg_muyi"], ['name:卞|null']],
      jlsgsk_heqi: ["male", 'wu', 4, ["jlsg_diezhang"], []],
      jlsgsk_mateng: ["male", 'qun', 4, ["mashu", "jlsg_xiongyi"], []],
      jlsgsk_tianfeng: ["male", 'qun', 3, ["jlsg_sijian", "jlsg_gangzhi"], []],
      jlsgsk_feiyi: ["male", 'shu', 3, ["jlsg_yanxi", "jlsg_zhige"], []],
      jlsgsk_jiangqin: ["male", 'wu', 4, ["jlsg_shangyi", "jlsg_wangsi"], []],
      jlsgsk_dongyun: ["male", 'shu', 3, ["jlsg_bibu", "jlsg_kuangzheng"], []],
      jlsgsk_dongxi: ["male", 'wu', 4, ["jlsg_duanlan"], []],
      jlsgsk_quancong: ["male", 'wu', 4, ["jlsg_yaoming"], []],
      jlsgsk_yujin: ["male", 'wei', 4, ["jlsg_zhengyi"], []],
      jlsgsk_panfeng: ["male", 'qun', 4, ["jlsg_kuangfu"], []],
      jlsgsk_dengzhi: ['male', 'shu', 3, ['jlsg_hemeng', 'jlsg_sujian'], []],
      jlsgsk_xuyou: ['male', 'wei', 3, ['jlsg_yexi', 'jlsg_kuangyan'], []],
      jlsgsk_zhangbu: ['male', 'wu', 3, ['jlsg_chaochen', 'jlsg_quanzheng'], []],
      jlsgsk_miheng: ['male', 'qun', 3, ['jlsg_shejian', 'jlsg_kuangao'], []],
      jlsgsk_zumao: ['male', 'wu', 4, ['jlsg_yinbing'], []],
      jlsgsk_huaxiong: ['male', 'qun', 5, ['jlsg_fenwei', 'jlsg_shiyong'], []],
      jlsgsk_sunce: ['male', 'wu', 4, ['jlsg_angyang', 'jlsg_weifeng', 'jlsg_xieli'], []],
      jlsgsk_caoren: ['male', 'wei', 4, ['jlsg_jushou'], []],
      jlsgsk_gongsunzan: ['male', 'qun', 4, ['jlsg_yicong', 'jlsg_muma'], ['name:公孙|瓒']],
      jlsgsk_sunqian: ['male', 'shu', 3, ['jlsg_suiji', 'jlsg_fengyi'], []],
      jlsgsk_maliang: ['male', 'shu', 3, ['jlsg_yalv', 'jlsg_xiemu'], []],
      jlsgsk_buzhi: ['male', 'wu', 3, ['jlsg_zhejie', 'jlsg_fengya'], []],
      jlsgsk_wangping: ['male', 'shu', 4, ['jlsg_yijian', 'jlsg_feijun'], []],
      jlsgsk_huangyueying: ['female', 'shu', 3, ['jlsg_muniu', 'jlsg_liuma'], []],
      jlsgsk_dongzhuo: ['male', 'qun', 6, ['jlsg_baozheng', 'jlsg_lingnu'], []],
      jlsgsk_chendao: ['male', 'shu', 4, ['jlsg_zhongyong'], []],
      jlsgsk_dingfeng: ['male', 'wu', 4, ['jlsg_bozhan', 'jlsg_qingxi'], []],

      jlsgsk_zhuran: ['male', 'wu', 4, ['jlsg_danshou', 'jlsg_yonglie'], []],
      jlsgsk_lukang: ['male', 'wu', 4, ['jlsg_hengshi', 'jlsg_zhijiao'], []],
      jlsgsk_lvlingqi: ['female', 'qun', 5, ['jlsg_jiwux', 'zhuangrong'], []],
      jlsgsk_zhoucang: ['male', 'shu', 4, ['jlsg_daoshi'], []],
      jlsgsk_kongrong: ['male', 'qun', 3, ['jlsg_lirang', 'jlsg_xianshi'], []],
      jlsgsk_caochong: ['male', 'wei', 3, ['jlsg_chengxiang', 'jlsg_renxin'], ['unseen']],
      jlsgsk_zhanglu: ['male', 'qun', 3, ['jlsg_midao', 'jlsg_yishe', 'jlsg_pudu'], []],
      jlsgsk_guanlu: ['male', 'wei', 3, ['jlsg_zongqing', 'jlsg_bugua'], []],
      jlsgsk_simazhao: ['male', 'wei', 3, ['jlsg_zhaoxin', 'jlsg_zhihe'], ['name:司马|昭']],
      jlsgsk_yangxiu: ['male', 'wei', 3, ['jlsg_caijie', 'jlsg_jilei'], []],
      jlsgsk_liyan: ['male', 'shu', 4, ['jlsg_yanliang'], []],
      jlsgsk_jiping: ['male', 'qun', 3, ['jlsg_duzhi', 'jlsg_lieyi'], []],
      jlsgsk_sunhao: ['male', 'wu', 4, ['jlsg_baoli'], []],
      jlsgsk_zhugejin: ['male', 'wu', 3, ['jlsg_huanbing', 'jlsg_hongyuan'], ['name:诸葛|瑾']],
      jlsgsk_zhangxiu: ['male', 'qun', 4, ['jlsg_huaqiang', 'jlsg_chaohuang'], []],
      jlsgsk_sunluyu: ['female', 'wu', 3, ['jlsg_huilian', 'jlsg_wenliang'], []],
      jlsgsk_luzhi: ['male', 'qun', 3, ['jlsg_jinglun', 'jlsg_ruzong'], []],
      jlsgsk_yuji: ['male', 'qun', 3, ['jlsg_guhuo', 'jlsg_fulu'], []],
      jlsgsk_mifuren: ['female', 'shu', 3, ['jlsg_guixiu', 'jlsg_cunsi'], ['name:糜|null']],
      jlsgsk_zhangning: ['female', 'qun', 3, ['jlsg_leiji', 'jlsg_shanxi'], []],
      jlsgsk_guonvwang: ['female', 'wei', 3, ['jlsg_gongshen', 'jlsg_jianyue'], []],
      jlsgsk_chengyu: ['male', 'wei', 3, ['jlsg_pengri', 'jlsg_danmou'], []],
      jlsgsk_zhangren: ['male', 'qun', 4, ['jlsg_fushe'], []],
      jlsgsk_mizhu: ['male', 'shu', 3, ['jlsg_ziguo', 'jlsg_shangdao'], []],
      jlsgsk_zangba: ['male', 'wei', 4, ['jlsg_hengjiang'], []],
      jlsgsk_hejin: ['male', 'qun', 4, ['jlsg_zhuanshan'], []],
      jlsgsk_wangyi: ['female', 'wei', 3, ['jlsg_zhenlie', 'jlsg_miji'], []],
      jlsgsk_zuoci: ['male', 'qun', 3, ['jlsg_qianhuan'], []],

      jlsgsk_guanyu: ['male', 'wei', 4, ['jlsg_wusheng', 'jlsg_danqi'], []],
      jlsgsk_machao: ['male', 'qun', 4, ['jlsg_zhuiji', 'jlsg_xionglie'], []],
      jlsgsk_caiwenji: ['female', 'wei', 3, ['jlsg_chenqing', 'jlsg_mozhi'], ['name:蔡|琰']],
      jlsgsk_zhangbao: ['male', 'qun', 3, ['jlsg_zhoufu', 'jlsg_yingbing'], []],
      jlsgsk_guanxing: ['male', 'shu', 4, ['jlsg_yongji', 'jlsg_wuzhi'], []],
      jlsgsk_kuaiyue: ['male', 'qun', 3, ['jlsg_yidu', 'jlsg_zhubao'], []],
      jlsgsk_zhoutai: ['male', 'wu', 4, ['jlsg_buqu', 'jlsg_fenji'], []],
      jlsgsk_zoushi: ['female', 'qun', 3, ['jlsg_jiaomei', 'jlsg_huoshui'], ['name:邹|null']],
      jlsgsk_yanliang: ['male', 'qun', 4, ['jlsg_hubu'], []],
      jlsgsk_zhugeguo: ['female', 'shu', 3, ['jlsg_yuhua', 'jlsg_dengxian'], ['name:诸葛|果']],
      jlsgsk_xizhicai: ['male', 'wei', 3, ['jlsg_tiance', 'jlsg_jiexin'], []],
      jlsgsk_guansuo: ['male', 'shu', 4, ['jlsg_zhengnan', 'jlsg_tongxin'], []],
      jlsgsk_baosanniang: ['female', 'shu', 3, ['jlsg_jianwu', 'jlsg_zhennan', 'jlsg_tongxin'], []],
      jlsgsk_dongbai: ['female', 'qun', 3, ['jlsg_shemi', 'jlsg_jiaohui'], []],
      jlsgsk_xushi: ['female', 'wu', 3, ['jlsg_wengua', 'jlsg_fuzhu'], ['name:徐|null']],
      jlsgsk_zhoufei: ['female', 'wu', 3, ['jlsg_yinyuan', 'jlsg_konghou'], ['name:周|null']],
      jlsgsk_wuyi: ['male', 'shu', 4, ['jlsg_zhidi'], []],
      jlsgsk_zhangliang: ['male', 'qun', 4, ['jlsg_jijun', 'jlsg_fangtong'], []],
      jlsgsk_panshu: ['female', 'wu', 3, ['jlsg_jinzhi', 'jlsg_yuyou'], []],
      jlsgsk_caorui: ['male', 'wei', 3, ['jlsg_huituo', 'jlsg_xingshuai'], []],
      jlsgsk_liuchen: ['male', 'shu', 4, ['jlsg_zhanjue'], []],
      jlsgsk_sunxiu: ['male', 'wu', 3, ['jlsg_yanzhu', 'jlsg_xingxue'], []],
      jlsgsk_zhangrang: ['male', 'qun', 3, ['jlsg_taoluan'], []],
      jlsgsk_xiahoushi: ['female', 'shu', 3, ['jlsg_shiqiao', 'jlsg_yingge'], ['name:夏侯|null']],
      jlsgsk_sundeng: ['male', 'wu', 3, ['jlsg_kuangbi'], []],
      jlsgsk_caoxiu: ['male', 'wei', 4, ['jlsg_taoxi'], []],
      jlsgsk_caojie: ['female', 'qun', 3, ['jlsg_huaibi', 'jlsg_zhixi'], []],
      jlsgsk_xinxianying: ['female', 'wei', 3, ['jlsg_caijian', 'jlsg_zhishix'], []],
      jlsgsk_zhuzhi: ['male', 'wu', 4, ['jlsg_anguo'], []],
      jlsgsk_wanglang: ['male', 'wei', 3, ['jlsg_quanxiang', 'jlsg_gushe', 'jlsg_jici'], []],
      jlsgsk_wuxian: ['female', 'shu', 3, ['jlsg_hechun', 'jlsg_daiyan'], []],
      jlsgsk_jushou: ['male', 'qun', 3, ['jlsg_jianying', 'jlsg_shibei'], []],
      jlsgsk_sunliang: ['male', 'wu', 3, ['jlsg_kuizhu', 'jlsg_chezheng'], []],
      jlsgsk_wenyang: ['male', 'wei', 7, ['jlsg_jueyong', 'jlsg_choujue'], []],
      jlsgsk_yanyan: ['male', 'shu', 4, ['jlsg_juzhan'], []],
      jlsgsk_zhugezhan: ['male', 'shu', 4, ['jlsg_zuilun', 'jlsg_fuzhi'], ['name:诸葛|瞻']],
      jlsgsk_panzhang: ['male', 'wu', 4, ['jlsg_jiejun'], []],
      jlsgsk_sunru: ['female', 'wu', 3, ['jlsg_xiecui', 'jlsg_youxu'], []],
      jlsgsk_liuyan: ['male', 'qun', 3, ['jlsg_zhulu', 'jlsg_limu'], []],
      jlsgsk_gongsunyuan: ['male', 'qun', 4, ['jlsg_huaiyi'], ['name:公孙|渊']],
      jlsgsk_guohuanghou: ['female', 'wei', 3, ['jlsg_jiaozhao', 'jlsg_danxin'], ['name:郭|null']],
      jlsgsk_zhaoxiang: ['female', 'shu', 4, ['jlsg_fanghun', 'jlsg_fuhan'], []],
      jlsgsk_chenqun: ['male', 'wei', 3, ['jlsg_pindi', 'jlsg_faen'], []],
      jlsgsk_lvfan: ['male', 'wu', 3, ['jlsg_diaodu', 'jlsg_diancai'], []],
      jlsgsk_hetaihou: ['female', 'qun', 3, ['jlsg_zhendu', 'jlsg_qiluan'], ['name:何|null']],
      jlsgsk_zhangyi: ['male', 'shu', 4, ['jlsg_wurong'], []],
      jlsgsk_caochun: ['male', 'wei', 4, ['jlsg_shanjia'], []],
      jlsgsk_shamoke: ['male', 'shu', 4, ['jlsg_jili'], []],
      jlsgsk_lingcao: ['male', 'wu', 4, ['jlsg_dujin'], []],
      jlsgsk_zhaoyan: ['female', 'wu', 3, ['jlsg_sanjue'], []],
      jlsgsk_beimihu: ['female', 'qun', 3, ['jlsg_canshi', 'jlsg_xianji'], ['name:卑弥|呼']],
      jlsgsk_wutugu: ['male', 'qun', 6, ['jlsg_hanyong'], []],
      jlsgsk_caoying: ['female', 'wei', 4, ['jlsg_lingruo', 'jlsg_fujian'], []],
      jlsgsk_mayunlu: ['female', 'shu', 4, ['mashu', 'jlsg_fengyin', 'jlsg_rongzhuang'], []],
      jlsgsk_zhongyao: ['male', 'wei', 3, ['jlsg_huomo', 'jlsg_dingguan'], []],
      jlsgsk_nanhualaoxian: ['male', 'qun', 3, ['jlsg_xianshou', 'jlsg_chengfeng'], ['name:庄|周']],
      jlsgsk_jiangwei: ['male', 'wei', 5, ['jlsg_kunfen', 'jlsg_caiyu'], []],
      jlsgsk_huanghao: ['male', 'shu', 3, ['jlsg_qinqing', 'jlsg_huisheng'], []],
      jlsgsk_huaman: ['female', 'shu', 3, ['jlsg_manyi', 'jlsg_souying'], []],
      jlsgsk_pangtong: ['male', 'wu', 3, ['jlsg_guolun', 'jlsg_songsang'], []],
      jlsgsk_lvdai: ['male', 'wu', 4, ['jlsg_qinguo'], []],
      jlsgsk_wanniangongzhu: ['female', 'qun', 3, ['jlsg_zhenge', 'jlsg_xinghan'], ['name:刘|null']],
      jlsgsk_wangyuanji: ['female', 'qun', 3, ['jlsg_qianchong', 'jlsg_shangjian'], []],
      jlsgsk_zhangchangpu: ['female', 'wei', 3, ['jlsg_yanjiao', 'jlsg_xingshen'], []],
      jlsgsk_qinmi: ["male", "shu", 3, ["jlsg_jianzheng", "jlsg_tianbian"], ["name:秦|宓"]],
      jlsgsk_xingdaorong: ["male", "qun", 5, ["jlsg_xuhe"], ["name:邢|道荣"]],
      jlsgsk_zhouyi: ["female", "wu", 4, ["jlsg_zhukou", "jlsg_duannian"], ["name:周|夷"]],
      jlsgsk_guohuai: ["male", "wei", 4, ["jlsg_jingce"], ["name:郭|淮"]],
      jlsgsk_huangchengyan: ["male", "qun", 3, ["jlsg_guanxu", "jlsg_yashi"], ["name:黄|承彦"]],
      jlsgsk_lvkai: ["male", "shu", 3, ["jlsg_tunan", "jlsg_bijing"], ["name:吕|凯"]],
      jlsgsk_zhugedan: ["male", "wei", 5, ["jlsg_gongao", "jlsg_juyi", "jlsg_weizhong"], ["name:诸葛|诞"]],
      jlsgsk_yangwan: ["female", "shu", 3, ["jlsg_youyan", "jlsg_zhuihuan"], ["name:杨|null"]],
      jlsgsk_cenhun: ["male", "wu", 3, ["jlsg_jishe", "jlsg_lianhuo"], ["name:岑|昏"]],
      jlsgsk_gexuan: ["male", "qun", 3, ["jlsg_lianhua", "jlsg_zhafu"], ["name:葛|玄"]],
    },
    characterIntro: {
      jlsgsk_kuaiyue: "蒯越（？－214年），字异度，襄阳中庐（今湖北襄阳西南）人。东汉末期人物，演义中为蒯良之弟。原本是荆州牧刘表的部下，曾经在刘表初上任时帮助刘表铲除荆州一带的宗贼（以宗族、乡里关系组成的武装集团）。刘表病逝后与刘琮一同投降曹操，后来官至光禄勋。",
      jlsgsk_dongxi: "董袭（195年前－213或217年），字元世或玄岱，扬州会稽余姚（今浙江余姚）人，东汉末年群雄孙策麾下将领；是江东十二虎臣之一。历任别部司马、扬武都尉、威越校尉，最后官至偏将军。",
    },
    skill: {
      jlsg_zhengyi: {
        audio: "ext:极略/audio/skill:2",
        enable: ['chooseToUse', 'chooseToRespond'],
        hiddenCard: function (player, name) {
          if (get.type(name) != 'basic' || name == 'shan') return false;
          return _status.currentPhase == player ? player.countCards('h') - player.hp == 1 : player.hp - player.countCards('h') == 1;
        },
        filter: function (event, player) {
          if (_status.currentPhase == player && player.countCards('h') - player.hp != 1) return false;
          if (_status.currentPhase != player && player.hp - player.countCards('h') != 1) return false;
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
          dialog: function (event, player) {
            var list = [];
            for (var i of lib.inpile) {
              if (get.type(i) != 'basic' || i == 'shan') continue;
              list.push(['basic', '', i]);
              if (i == 'sha') {
                for (var j of lib.inpile_nature) list.push(['basic', '', i, j]);
              }
            }
            return ui.create.dialog('整毅', [list, 'vcard']);
          },
          filter: function (button, player) {
            var evt = _status.event.getParent();
            return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
          },
          check: function (button) {
            var player = _status.event.player;
            var shaTarget = false;
            for (var i = 0; i < game.players.length; i++) {
              if (player.canUse('sha', game.players[i]) && ai.get.effect(game.players[i], { name: 'sha' }, player) > 0) {
                shaTarget = true;
              }
            }
            if (player.isDamaged()) return (button.link[2] == 'tao') ? 1 : -1;
            if (shaTarget && player.num('h', 'sha') && !player.num('h', 'jiu')) return (button.link[2] == 'jiu') ? 1 : -1;
            if (shaTarget && !player.num('h', 'sha')) return (button.link[2] == 'sha') ? 1 : -1;
            return (button.link[2] == 'sha') ? 1 : -1;
          },
          backup: function (links, player) {
            var A = {
              audio: false,
              popname: true,
              // ignoreMod:true,
              filterCard: function (card, player) {
                return _status.currentPhase == player
                  ? true : false;
              },
              viewAs: {
                name: links[0][2],
                nature: links[0][3],
                suit: 'none',
                number: null,
                isCard: true,
              },
            };
            if (player.countCards('h') > player.hp) {
              A.precontent = function () {
                player.logSkill('jlsg_zhengyi');
                var card = event.result.cards[0];
                event.card = card;
                player.discard(card);
                // player.$throw(card,1000);
                event.result.card = {
                  name: event.result.card.name,
                  nature: event.result.card.nature,
                  // cards: [],
                };
                event.result.cards = [];
              };
            } else {
              A.precontent = function () {
                player.logSkill('jlsg_zhengyi');
                player.draw('nodelay');
              };
              A.selectCard = -1;
              A.filterCard = () => false;
              // A.onuse = A.onrespond = function (result, player) { player.draw('nodelay');};
            }
            return A;
          },
          prompt: function (links, player) {
            var str = '视为使用或打出' + get.translation({ name: links[0][2], nature: links[0][3] });
            if (player.hp <= player.countCards('h')) str = '弃置一张手牌，' + str;
            return str;
          }
        },
        ai: {
          order: 6,
          result: {
            player: 1,
          },
          threaten: 1.3,
          respondSha: true,
          // respondShan: true,
          fireattack: true,
          skillTagFilter: function (player) {
            return _status.currentPhase == player ? player.countCards('h') - player.hp == 1 : player.hp - player.countCards('h') == 1;
          },
        },
        group: ['jlsg_zhengyi_shan'],
        subSkill: {
          shan: {
            audio: "jlsg_zhengyi", // audio: ["jieyue1", 2],
            enable: ['chooseToUse', 'chooseToRespond'],
            filter: function (event, player) {
              return _status.currentPhase == player
                ? player.countCards('h') - player.hp == 1
                : player.hp - player.countCards('h') == 1;
            },
            filterCard: function (card, player) {
              return _status.currentPhase == player
                ? true : false;
            },
            selectCard: function () {
              return _status.currentPhase == _status.event.player
                ? 1 : -1;
            },
            // check: () => true,
            // ignoreMod:true,
            viewAs: {
              name: 'shan',
              suit: 'none',
              number: null,
            },
            onrespond: function (result, player) {
              if (_status.currentPhase == player) {
                player.discard(result.cards);
                result.card = {
                  name: result.card.name,
                };
                result.cards = [];
              } else {
                player.draw("nodelay");
              }
            },
            onuse: function (result, player) {
              if (_status.currentPhase == player) {
                player.discard(result.cards);
                result.card = {
                  name: result.card.name,
                };
                result.cards = [];
              } else {
                player.draw("nodelay");
              }
            },
            ai: {
              skillTagFilter: function (player) {
                return _status.currentPhase == player
                  ? player.countCards('h') - player.hp == 1
                  : player.hp - player.countCards('h') == 1;
              },
              respondShan: true
            }
          },
        }
      },
      jlsg_wusheng: {
        audio: 'ext:极略/audio/skill:true',
        inherit: 'wusheng',
      },
      jlsg_quanlue: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: "phaseUseBegin",
        },
        filter: function (event, player) {
          return player.countCards("h");
        },
        check: function (event, player) {
          return game.hasPlayer(function (cur) {
            return get.attitude(player, cur) != 0;
          });

        },
        content: function () {
          "step 0"
          event.list = [];
          for (var i = 0; i < player.getCards('h').length; i++) {
            var suit = get.suit(player.getCards('h')[i]);
            if (event.list.includes(suit)) continue;
            event.list.push(suit);
          }
          player.showHandcards();
          "step 1"
          player.chooseControl(event.list, function (event, player) {
            var max = event.list.randomGet();
            var max2 = player.countCards('h', { suit: max });
            for (var i = 0; i < event.list.length; i++) {
              var len = event.list[i];
              var len2 = player.countCards('h', { suit: len });
              if (len2 == max2) {
                if (['spade', 'club'].includes(len)) max = len;
              }
              if (len2 > max2) max = len;
              max2 = player.countCards('h', { suit: max });
            }
            return max;
          }).prompt = "权略：请选择1种花色";
          "step 2"
          player.popup('权略' + get.translation(result.control + '2') + get.translation(result.control));
          player.draw(player.countCards("h", { suit: result.control }));
          player.storage.jlsg_quanlue = result.control;
          player.addSkill("jlsg_quanlue_effect");
        },
        ai: {
          effect: {
            player: function (card, player) {
              if (!player.storage.jlsg_quanlue) return;
              if (_status.event.dying) return get.attitude(player, _status.event.dying);
              if (get.suit(card) == player.storage.jlsg_quanlue && get.type(card) != 'equip') {
                if (get.type(card) == 'basic') return [0, 1];
                if (card.name == 'wugu') return;
                return [1, 0.5];
              }
            }
          }
        },
        subSkill: {
          effect: {
            trigger: {
              player: "phaseUseAfter",
            },
            forced: true,
            content: function () {
              "step 0"
              player.showHandcards();
              "step 1"
              player.discard(player.getCards("h", function (card) {
                return get.suit(card) == player.storage.jlsg_quanlue;
              }));
              "step 2"
              player.removeSkill("jlsg_quanlue_effect");
            },
          },
        },
      },
      jlsg_huaiju: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: [
            "phaseJudgeEnd",
            "phaseDrawEnd",
            "phaseUseEnd",
            "phaseDiscardEnd",
            "phaseJieshuEnd",
          ],
        },
        filter: function (event, player) {
          return player.countCards('h') == 3;
        },
        content: function () {
          "step 0"
          player.chooseControl("摸牌", "弃牌", function (event, player) {
            return "摸牌";
          }).prompt = "怀橘：你可以摸一张牌或弃置两张牌";
          "step 1"
          if (result.control == "摸牌") {
            player.draw();
          } else {
            player.chooseToDiscard('he', 2, true);
          }
        },
      },
      jlsg_huntian: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "discardEnd" },
        filter: function (event, player) {
          for (var i = 0; i < event.cards.length; i++) {
            if (get.position(event.cards[i]) == "d") return true;
          }
          return false;
        },
        content: function () {
          "step 0"
          event.list = [];
          for (var i = 0; i < trigger.cards.length; i++) {
            if (get.position(trigger.cards[i]) == "d") {
              event.list.push(trigger.cards[i]);
            }
          }
          "step 1"
          player.chooseCardButton("将任意张牌置于牌堆顶(后选在上)", event.list, [1, Infinity], true).ai = function (button) {
            if (ui.selected.buttons.length) {
              return 0;
            }
            return 2 + Math.random();
          };
          "step 2"
          event.cards = result.links;
          player.lose(event.cards, ui.cardPile, 'insert');
          player.$throw(event.cards.length, 1000);
          game.log(player, "将", event.cards, "置于牌堆顶");
          "step 3"
          for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
            var card = ui.cardPile.childNodes[i];
            if (event.cards.every(c => get.type(card) != get.type(c))) {
              player.gain(card, 'gain2');
              break;
            }
          }
        }
      },
      jlsg_cangshu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "useCard" },
        // usable: 1,
        direct: true,
        filter: function (event, player) {
          if (event.player == player || get.type(event.card) != "trick" || player.hasSkill('jlsg_cangshu2')) return false;
          return game.online ? player.countCards("h") : player.countCards("h", { type: "basic" });
        },
        content: function () {
          "step 0"
          player.chooseCard("是否对" + get.translation(trigger.player) + "发动藏书？<p>交给" + get.translation(trigger.player) + "一张基本牌，令" + get.translation(trigger.card) + "无效并获得之</p>", { type: "basic" }).ai = function (card) {
            if (get.attitude(player, trigger.player) < 0)
              return 10 - get.value(card);
            return 0;
          }
          "step 1"
          if (result.bool) {
            player.logSkill("jlsg_cangshu", trigger.player);
            player.addTempSkill('jlsg_cangshu2');
            trigger.player.gain(result.cards, player, 'giveAuto');
          } else {
            event.finish();
          }
          "step 2"
          if (trigger.cards) {
            player.gain(trigger.cards, 'gain2');
          }
          trigger.cancel();
        },
      },
      jlsg_cangshu2: {

      },
      jlsg_kanwu: {
        audio: "ext:极略/audio/skill:1",
        enable: ['chooseToUse', 'chooseToRespond'],
        hiddenCard: function (player, name) {
          if (get.type(name) != 'basic' || name == 'shan') return false;
          return _status.currentPhase != player && player.countCards('h') &&
            (game.online ? player.countCards("h") : player.countCards("h", { type: ['delay', 'trick'] }));
        },
        filter: function (event, player) {
          if (_status.currentPhase == player || !player.countCards('h', { type: ['delay', 'trick'] })) return false;
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
          dialog: function (event, player) {
            var list = [];
            for (var i of lib.inpile) {
              if (get.type(i) != 'basic' || i == 'shan') continue;
              list.push(['basic', '', i]);
              if (i == 'sha') {
                for (var j of lib.inpile_nature) list.push(['basic', '', i, j]);
              }
            }
            return ui.create.dialog('勘误', [list, 'vcard']);
          },
          filter: function (button, player) {
            var evt = _status.event.getParent();
            return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
          },
          check: function (button) {
            var player = _status.event.player;
            var shaTarget = false;
            for (var i = 0; i < game.players.length; i++) {
              if (player.canUse('sha', game.players[i]) && ai.get.effect(game.players[i], { name: 'sha' }, player) > 0) {
                shaTarget = true;
              }
            }
            if (player.isDamaged()) return (button.link[2] == 'tao') ? 1 : -1;
            if (shaTarget && player.num('h', 'sha') && !player.num('h', 'jiu')) return (button.link[2] == 'jiu') ? 1 : -1;
            if (shaTarget && !player.num('h', 'sha')) return (button.link[2] == 'sha') ? 1 : -1;
            return (button.link[2] == 'sha') ? 1 : -1;
          },
          backup: function (links, player) {
            return {
              filterCard: function (card) {
                return get.type(card, 'trick') == 'trick';
              },
              audio: false,
              popname: true,
              // ignoreMod:true,
              viewAs: {
                name: links[0][2],
                nature: links[0][3],
                suit: 'none',
                number: null,
                isCard: true,
              },
              ai1: function (card) {
                return 6 - get.value(card);
              },
              precontent: function () {
                'step 0'
                player.logSkill('jlsg_kanwu');
                var card = event.result.cards[0];
                event.card = card;
                player.discard(card);
                event.result.card = {
                  name: event.result.card.name,
                  nature: event.result.card.nature,
                  // cards: [],
                };
                event.result.cards = [];
              },
            };
          },
          // prompt: function (links, player) {
          //   return '弃置一张锦囊牌，视为使用或打出' + get.translation({ name: links[0][2], nature: links[0][3] });
          // }
        },
        ai: {
          order: 6,
          result: {
            player: 1,
          },
          // threaten: 1.3,
          respondSha: true,
          fireattack: true,
          skillTagFilter: function (player) {
            return _status.currentPhase != player && (game.online ?
              player.countCards('h')
              : player.countCards('h', c => get.type2(c) == 'trick'));
          },
        },
        group: ['jlsg_kanwu_shan'],
        subSkill: {
          shan: {
            audio: "jlsg_kanwu", // audio: ["jieyue1", 2],
            enable: ['chooseToUse', 'chooseToRespond'],
            filter: function (event, player) {
              return _status.currentPhase != player &&
                (game.online ? player.countCards("h") : player.countCards("h", { type: ['delay', 'trick'] }));
            },
            filterCard: function (card, player) {
              return get.type(card, 'trick') == 'trick';
            },
            // check: () => true,
            viewAs: {
              name: 'shan',
              suit: 'none',
              number: null,
            },
            onrespond: function (result, player) {
              player.discard(result.cards);
              result.card = {
                name: result.card.name,
              };
              result.cards = [];
            },
            onuse: function (result, player) {
              player.discard(result.cards);
              result.card = {
                name: result.card.name,
              };
              result.cards = [];
            },
            ai: {
              skillTagFilter: function (player) {
                return _status.currentPhase != player && (game.online ?
                  player.countCards('h')
                  : player.countCards('h', c => get.type2(c) == 'trick'));
              },
              respondShan: true
            }
          },
        }
      },
      jlsg_huage: {
        audio: "ext:极略/audio/skill:2",
        enable: "phaseUse",
        usable: 1,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
          return target.countCards('he') > 0;
        },
        ignoreTarget: function (card, player, target) {
          return !target.countCards('he');
        },
        content: function () {
          "step 0"
          if (target.countCards('he')) {
            target.chooseToDiscard("化戈：请弃置至少一张牌，弃置的牌中每有【杀】，你便摸一张牌", 'he', [1, Infinity], true)
              .set('ai', function (card) {
                if (card.name == 'sha') return 6 - get.value(card);
                return -get.useful(card);
              })
              .set("delay", false);

          } else {
            event.finish();
          }
          "step 1"
          if (!result.bool) {
            event.finish();
            return;
          }
          let num = 0;
          for (var i = 0; i < result.cards.length; i++) {
            if (result.cards[i].name == "sha") {
              num++;
            }
          }
          if (num) {
            target.draw(num);
          } else {
            game.delayx(0.5);
          }
        },
        ai: {
          order: 8,
          result: {
            player: 1,
          },
        },
      },
      jlsg_muyi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseBegin" },
        filter: function (event, player) {
          return event.player != player && event.player.countCards('he') && player.hasSkill('jlsg_muyi');
        },
        direct: true,
        content: function () {
          "step 0"
          trigger.player.chooseCard("是否发动【" + get.translation(player) + "】的技能【母仪】？<p>你可以交给【" + get.translation(player) + "】1至两张牌，回合结束时，其交还你等量的牌。</p>", 'he', [1, 2]).ai = function (card) {
            if (get.position(card) == 'e' && get.attitude(player, target) > 0) return 7 - get.value(card);
            if (get.attitude(_status.event.player, player) > 2) return 2 - get.useful(card);
            return -1;
          };
          "step 1"
          if (result.bool) {
            player.logSkill("jlsg_muyi");
            player.gain(result.cards, trigger.player, 'giveAuto');
            player.storage.jlsg_muyi = trigger.player;
            player.storage.jlsg_muyi_effect = result.cards.length;
            player.addSkill("jlsg_muyi_effect");
          }
        },
        subSkill: {
          effect: {
            mark: true,
            marktext: "仪",
            intro: {
              name: "母仪",
              content: function (storage, player) {
                return "当前回合结束时，你需交给" + get.translation(player.storage.jlsg_muyi) + get.cnNumber(storage) + "张牌";
              },
            },
            trigger: { global: "phaseEnd" },
            forced: true,
            filter: function (event, player) {
              return event.player == player.storage.jlsg_muyi;
            },
            logTarget: "player",
            content: function () {
              "step 0"
              player.chooseCard("母仪：交给" + get.translation(player.storage.jlsg_muyi) + get.cnNumber(player.storage.jlsg_muyi_effect) + "张牌", 'he', player.storage.jlsg_muyi_effect, true).ai = function (card) {
                return 10 - get.value(card);
              };
              "step 1"
              if (result.bool) {
                trigger.player.gain(result.cards, player, 'giveAuto');
              } else {
                event.finish();
              }
              delete player.storage.jlsg_muyi;
              delete player.storage.jlsg_muyi_effect;
              player.removeSkill("jlsg_muyi_effect");
            },
          },
        },
      },
      jlsg_diezhang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'useCard' },
        frequent: true,
        filter: function (event, player) {
          if (!player.isPhaseUsing()) {
            return false;
          }
          var evt = player.getHistory('useCard', (evt) => evt != event);
          if (!evt.length) return false;
          evt = evt[evt.length - 1];
          return get.number(evt.card) < get.number(event.card);
        },
        content: function () {
          player.draw();
        },
        ai: {
          aiOrder: function (player, card, num) {
            if (typeof card == 'object' && player.isPhaseUsing()) {
              var evt = player.getLastUsed();
              if (evt && evt.card && evt.card.number && evt.card.number === card.number) {
                return num + 10;
              }
            }
          },
          // effect: {
          //   player: function (card, player, target) {
          //     if (!player.storage.jlsg_diezhang) return;
          //     var number = get.number(player.storage.jlsg_diezhang);
          //     if (number < get.number(card)) {
          //       return [1, 0.6];
          //     }
          //   },
          // }
        },
      },
      jlsg_xiongyi: {
        audio: "ext:极略/audio/skill:2",
        forced: true,
        trigger: { player: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return player.hp == 1 || player.countCards('h') == 0;
        },
        content: function () {
          if (player.hp == 1) {
            player.recover();
          }
          if (player.countCards('h') == 0) {
            player.draw(2);
          }
        }
      },
      jlsg_sijian: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        direct: true,
        filter: function (event, player) {
          if (player.countCards('h')) return false;
          var evt = event.getl(player);
          return evt && evt.hs && evt.hs.length;
        },
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt2(event.name), function (card, player, target) {
            return player != target && target.countDiscardableCards(player, 'he') > 0;
          }).set('ai', function (target) {
            return -get.attitude(_status.event.player, target);
          });
          "step 1"
          if (result.bool) {
            player.logSkill(event.name, result.targets);
            event.target = result.targets[0];
            player.discardPlayerCard(player.hp, event.target, true);
          }
          else {
            event.finish();
          }
        },
        ai: {
          expose: 0.2,
        }
      },
      jlsg_gangzhi: {
        audio: "ext:极略/audio/skill:2",
        logAudio(event, player) {
          if (player.countDiscardableCards(player, "h")) return ["ext:极略/audio/skill/jlsg_gangzhi1.mp3"];
          return ["ext:极略/audio/skill/jlsg_gangzhi2.mp3"];
        },
        trigger: { player: 'damageBegin4' },
        filter(event, player) {
          if (event.num < 1) return false;
          if (!player.countCards("h")) return true;
          if (player.countDiscardableCards(player, "h")) return true;
          return false;
        },
        check(event, player) {
          if (player.hp <= 1) return true;
          let eff = lib.skill.jlsg_gangzhi.ai.effect.target(event.card, event.source, player);
          if (!eff) {
            if (!player.countCards("h")) {
              if (!player.hasFriend() && (!player.isTurnedOver() || player.hp == 1)) eff = 1;
              eff = player.isTurnedOver() ? [0, 4] : 0.5;
            }
            else {
              if (!player.hasFriend()) eff = [1, 0];
              else eff = [0.6, -0.4 * (player.countCards('h') - (player.hasSkill('jlsg_sijian') ? player.hp : 0))];
            }
          }
          let num = player.getCards("h").reduce((n, c) => n + player.getUseValue(c), 0) / player.countCards("h");
          if (Array.isArray(eff)) return event.num + Math.abs(eff[1]) > num;
          return event.num > num;
        },
        prompt(event, player) {
          let str = "刚直：是否"
          if (!player.countCards("h")) str += '将武将牌翻面，然后将手牌数补至体力上限';
          else str += '弃置所有手牌，然后防止此伤害';
          return str;
        },
        async content(event, trigger, player) {
          if (!player.countCards("h")) {
            await player.turnOver();
            await player.drawTo(player.maxHp);
          }
          else {
            await player.discard(player.getDiscardableCards(player, "h"));
            trigger.cancel();
          }
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          maixie_defend: true,
          effect: {
            target: function (card, player, target) {
              if (player && player.hasSkillTag('jueqing', false, target)) return;
              if (!get.tag(card, 'damage')) return;
              if (target.countCards('h') != 0) {
                if (!target.hasFriend()) return;
                return [0.6, -0.4 * (target.countCards('h') - (target.hasSkill('jlsg_sijian') ? target.hp : 0))];
              }
              else {
                if (!target.hasFriend() && (!target.isTurnedOver() || target.hp == 1)) return;
                return target.isTurnedOver() ? [0, 4] : 0.5;
              }
            }
          },
        },
      },
      jlsg_yanxi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'] },
        frequent: true,
        filter: function (event, player) {
          return player.countCards('e') <= 0;
        },
        content: function () {
          player.draw();
        },
      },
      jlsg_zhige: {
        audio: "ext:极略/audio/skill:1",
        group: ["jlsg_zhige_3", "jlsg_zhige_4"],
      },
      jlsg_zhige_3: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse', 'chooseToRespond'],
        filterCard: function () {
          return false;
        },
        selectCard: -1,
        viewAs: { name: 'shan' },
        viewAsFilter: function (player) {
          return player.getCards("e").length > 0;
        },
        prompt: '弃置装备区的牌，视为打出一张【闪】',
        check: function (event, player) {
          if (player.hp == 1 && player.countCards('h', 'shan') == 0) {
            return 1;
          }
          var num = 1;
          if (player.hasSkill('jlsg_yanxi')) num++;
          if (player.countCards('e', 'bagua')) num--;
          return player.countCards('e', function (cardx) {
            return get.value(cardx) > 5;
          }) <= num;
        },
        onuse: function (result, player) {
          game.broadcastAll(function (player) {
            var sex = player.sex;
            if (lib.config.background_audio) {
              game.playAudio('card', sex, 'shan');
            }
          }, player);
          player.discard(player.getCards("e"));
        },
        onrespond: function (result, player) {
          game.broadcastAll(function (player) {
            var sex = player.sex;
            if (lib.config.background_audio) {
              game.playAudio('card', sex, 'shan');
            }
          }, player);
          player.discard(player.getCards("e"));
        },
        ai: {
          respondShan: true,
          skillTagFilter: function (player) {
            if (player.countCards('e') <= 0) return false;
          },
        },
      },
      jlsg_zhige_4: {
        audio: "ext:极略/audio/skill:true",
        enable: ['chooseToUse', 'chooseToRespond'],
        filterCard: function () {
          return false;
        },
        selectCard: -1,
        viewAs: { name: 'sha' },
        viewAsFilter: function (player) {
          return player.getCards("e").length > 0;
        },
        prompt: '弃置装备区的牌，视为打出一张【杀】',
        check: function (event, player) {
          if (player.hp == 1 && player.countCards('h', 'sha') == 0) {
            return 1;
          }
          var num = 0;
          if (player.hasSkill('jlsg_yanxi')) num++;
          if (player.countCards('e') >= 2) return -1;
          return player.countCards('e', function (cardx) {
            return get.value(cardx) > 5;
          }) <= num;
        },
        onuse: function (result, player) {
          game.broadcastAll(function (player) {
            var sex = player.sex;
            if (lib.config.background_audio) {
              game.playAudio('card', sex, 'sha');
            }
          }, player);
          player.discard(player.getCards("e"));
        },
        onrespond: function (result, player) {
          game.broadcastAll(function (player) {
            var sex = player.sex;
            if (lib.config.background_audio) {
              game.playAudio('card', sex, 'sha');
            }
          }, player);
          player.discard(player.getCards("e"));
        },
        ai: {
          respondSha: true,
          skillTagFilter: function (player) {
            if (player.countCards('e') <= 0) return false;
          },
        },
      },
      jlsg_wangsi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageEnd' },
        filter: function (event, player) {
          return event.source && event.source != player && event.source.countCards('h') != 0;
        },
        check: function (event, player) {
          return 1;
        },
        frequent: true,
        content: function () {
          player.discardPlayerCard(trigger.source, 'h', 'visible').set('filterButton', function (button, player) {
            return get.color(button.link) == 'red';
          }) // .set('logSkill', [event.name, trigger.source]);
        },
        ai: {
          maixie_defend: true,
        }
      },
      jlsg_shangyi: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return player != target && target.countCards('h');
        },
        content: function () {
          'step 0'
          game.log(target, '观看了', player, '的手牌');
          target.viewHandcards(player);
          'step 1'
          if (get.mode() == 'identity') {
            player.chooseControl(['观看其身份牌', '观看其手牌', 'cancel2'], 1).set('prompt', '选择一项');
          }
          'step 2'
          if (!result || !result.control || result.control === '观看其手牌') {
            player.discardPlayerCard(target, 'h', 'visible').set('filterButton', function (button, player) {
              return get.color(button.link) == 'black';
            });
          }
          else if (result && result.control === '观看其身份牌' && target.identity) {
            game.log(player, '观看了', target, '的身份');
            var idt = target.identity;
            var styleStr = {
              zhu: `data-nature="fire"`,
              zhong: `data-nature="metal"`,
              fan: `data-nature="wood"`,
              nei: 'data-nature="thunder"',
            }[idt];
            var tr = {
              zhu: '主公',
              zhong: '忠臣',
              fan: '反贼',
              nei: '内奸',
            }[idt] || get.translation(idt);
            player.chooseControl('ok').set('dialog', [get.translation(target) + '的身份', `<span ${styleStr} style="font-family: huangcao, xinwei;font-size:larger;color: white;">${tr}</span>`]);
          }
        },
        ai: {
          order: 4,
          result: {
            target: -1,
          },
          // result: {
          //   target: function (player, target) {
          //     var result = 0;
          //     if (target.hasSkillTag('noe')) result += 4 + target.countCards('e');
          //     if (target.hasSkillTag('nolose') || target.hasSkillTag('nodiscard')) result += 5 + target.countCards('he') / 2;
          //     if (target.hasCard(function (card) {
          //       return ['baiyin', 'rewrite_baiyin'].includes(card.name);
          //     }, 'e') && target.isDamaged()) return 10 + result;
          //     if (target.hasCard(function (card) {
          //       var baiyin = ['baiyin', 'rewrite_baiyin'].includes(card.name);
          //       var bol = true;
          //       return get.color(card) == 'black' && (baiyin && (target.isDamaged() ? !bol : bol));
          //     }, 'e')) return -6 + result;
          //     return -5 + result;
          //   },
          // }
        }
      },
      jlsg_kuangzheng: {
        audio: "ext:极略/audio/skill:2",
        direct: true,
        trigger: { player: 'phaseEnd' },
        filter: function (event, player) {
          return game.hasPlayer(function (current) {
            return current.isLinked() || current.isTurnedOver();
          });
        },
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt(event.name)).set('ai', function (target) {
            return get.attitude(_status.event.player, target);
          });
          "step 1"
          if (result.bool) {
            event.target = result.targets[0];
            player.logSkill(event.name, result.targets);
          } else {
            event.finish();
          }
          "step 2"
          if (event.target.isLinked()) {
            event.target.link();
          }
          "step 3"
          if (event.target.isTurnedOver()) {
            event.target.turnOver();
          }
        },
        ai: {
          expose: 0.2,
        }
      },
      jlsg_bibu: {
        audio: "ext:极略/audio/skill:2",
        group: ['jlsg_bibu1'],
        trigger: { global: 'phaseJieshuBegin' },
        frequent: true,
        filter: function (event, player) {
          if (player.hasSkill('jlsg_bibu2')) return false;
          return event.player != player && player.countCards('h') <= player.hp;
        },
        content: function () {
          player.draw();
          player.addTempSkill('jlsg_bibu2');
        }
      },
      jlsg_bibu1: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseJieshuBegin' },
        direct: true,
        filter: function (event, player) {
          if (player.hasSkill('jlsg_bibu2')) return false;
          return event.player != player && player.countCards('h') > player.hp;
        },
        content: function () {
          "step 0"
          player.chooseCardTarget({
            filterCard: true,
            selectCard: 1,
            filterTarget: function (card, player, target) {
              return player != target;
            },
            ai1: function (card) {
              if (ui.selected.cards.length > 0) return -1;
              if (card.name == 'du') return 20;
              return (_status.event.player.countCards('h') - _status.event.player.hp);
            },
            ai2: function (target) {
              var att = get.attitude(_status.event.player, target);
              if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                if (target.hasSkillTag('nodu')) return 0;
                return 1 - att;
              }
              if (target.countCards('h') > _status.event.player.countCards('h')) return 0;
              return att - 4;
            },
            prompt: "###是否发动【裨补】？###你可以将一张手牌交给其他角色"
          });
          "step 1"
          if (result.bool) {
            player.addTempSkill('jlsg_bibu2');
            player.logSkill('jlsg_bibu', result.targets);
            if (result.targets[0].ai.shown > player.ai.shown) {
              player.addExpose(0.1);
            }
            result.targets[0].gain(result.cards, player, 'give');
          }
        },
        ai: {
          threaten: 1.2,
          order: 2,
          result: {
            target: 1,
          },
        },
      },
      jlsg_bibu2: {},
      jlsg_duanlan: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return game.hasPlayer(function (current) {
            return current != player && current.countCards('hej');
          });
        },
        content: function () {
          'step 0'
          var friends = game.filterPlayer(function (current) {
            return get.attitude(player, current) >= 4;
          });
          var targets = game.filterPlayer(function (current) {
            return current != player
          }).sort(lib.sort.seat);
          var info = ['断缆</br></br><div class="center text">选择并弃置1至3张牌</div>'];
          for (var i = 0; i < targets.length; i++) {
            if (targets[i].countCards('hej')) info.push('<div class="center text">' + get.translation(targets[i]) + '</div>');
            var hs = targets[i].getCards('h');
            if (hs.length) {
              info.push('<div class="center text">手牌区</div>');
              if (targets[i].isUnderControl()) info.push(hs);
              else info.push([hs, 'blank']);
            }
            var es = targets[i].getCards('e');
            if (es.length) {
              info.push('<div class="center text">装备区</div>');
              info.push(es);
            }
            var js = targets[i].getCards('j');
            if (js.length) {
              info.push('<div class="center text">判定区</div>');
              info.push(js);
            }
          }
          player.chooseButton(true, [1, 3]).set('createDialog', info).set('filterButton', function (button) {
            return lib.filter.canBeDiscarded(button.link, _status.event.player, get.owner(button.link));
          }).set('ai', function (button) {
            var player = _status.event.player;
            var maxNumCards = player.getCards('he', function (card) {
              return get.value(card) < 9 && !player.hasCard(function (card2) {
                return card2.number > card.number
              })
            });
            var maxNum = maxNumCards.length ? maxNumCards[0].number : 0;
            var dngr = player.hp == 1 && !player.hasCard(function (card) {
              return card.name == 'tao' || card.name == 'jiu'
            });
            var owner = get.owner(button.link);
            var position = get.position(button.link);
            var num = 0;
            for (var i = 0; i < ui.selected.buttons.length; i++) {
              if (['e', 'j'].includes(get.position(ui.selected.buttons[i].link))) {
                num += ui.selected.buttons[i].link.number;
              } else num += 7;
            }
            var att = get.attitude(player, owner);
            if (att > 0) {
              if (position == 'j') {
                if (button.link.number < maxNum - num) return 100 - button.link.number;
                if (!dngr) return 80 - button.link.number;
              }
              return 0;
            }
            if (att < 0) {
              if (position == 'j') return 0;
              if (position == 'e') {
                if (button.link.number < maxNum - num) return 60 - button.link.number;
                if (!dngr) return 40 - button.link.number;
              }
              if (7 < maxNum - num) {
                if (!dngr) return 1;
              }
            }
            return 0;

          });
          'step 1'
          event.num = 0;
          var owners = [];
          var cards = result.links.slice(0);
          for (var i = 0; i < cards.length; i++) {
            event.num += cards[i].number;
            var owner = get.owner(cards[i]);
            if (!owners.includes(owner)) owners.push(owner);
          }
          owners.sort(lib.sort.seat);
          var todo = [];
          for (var i = 0; i < owners.length; i++) {
            player.line(owners[i], 'green');
            owners[i].discard(owners[i].getCards('hej', function (card) {
              return cards.includes(card);
            }));
          }
          'step 2'
          player.chooseToDiscard('断缆</br></br><div class="center text">弃置一张点数大于' + num + '的牌，或失去1点体力</div>', function (card) {
            return card.number > num;
          }, 'he').set('ai', function (card) {
            if (card.name == 'tao') return 0;
            return 9 - get.value(card);
          });
          'step 3'
          if (!result.bool) player.loseHp();
        },
        ai: {
          order: 7,
          result: {
            player: function (player) {
              //if(player.hasSkillTag('maiHp')&&player.hp>1) return 1;
              if (player.hp > 2 || player.hasCard(function (card) {
                return card.number > 10
              }, 'h')) return game.hasPlayer(function (current) {
                if (get.attitude(player, current) > 0) return current.countCards('j');
                else if (get.attitude(player, current) < 0) return current.countCards('he');
              }) ? 1 : 0;
              var dngr = player.hp == 1 && !player.hasCard(function (card) {
                return card.name == 'tao' || card.name == 'jiu'
              });
              var js = [], es = [];
              var minNum1 = 0, minNum2 = 0;
              game.countPlayer(function (current) {
                if (get.attitude(player, current) > 0) js = js.concat(current.getCards('j'));
                else if (get.attitude(player, current) < 0) es = es.concat(current.getCards('e'));
              });
              for (var i = 0; i < js.length; i++) minNum1 = Math.min(minNum1, js[i].number);
              if (js.length) {
                if (player.hasCard(function (card) {
                  return card.number > minNum1 && get.value(card) < 9
                }, 'he')) return 1;
                if (!dngr) {
                  if (js.length > 1) return 1;
                  return game.hasPlayer(function (current) {
                    return current.countCards('he')
                  }) ? 1 : 0;
                }
                return 0;
              }
              for (var i = 0; i < es.length; i++) minNum2 = Math.min(minNum2, es[i].number);
              if (es.length) {
                if (player.hasCard(function (card) {
                  return card.number > minNum2 && get.value(card) < 9
                }, 'he')) return 1;
                if (!dngr) {
                  if (es.length > 1) return 1;
                }
                return 0;
              }
              return 0;
            }
          }
        }
      },
      jlsg_yaoming: {
        audio: "jlsg_yaoming_",
        locked: false,
        init: function (player) {
          player.storage.jlsg_yaoming = {
            suits: [],
            types: [],
          };
        },
        group: ['jlsg_yaoming_strg', 'jlsg_yaoming_1', 'jlsg_yaoming_2', 'jlsg_yaoming_3', 'jlsg_yaoming_4'],
        subfrequent: ['1'],
        subSkill: {
          strg: {
            trigger: { player: ["useCard", "respond"] },
            filter: function (event, player) {
              if (!player.isPhaseUsing()) return false;
              var phaseUse = _status.event.getParent('phaseUse');
              var hists = player.getHistory('useCard', function (evt) {
                return evt.getParent('phaseUse') == phaseUse && evt.card && get.suit(evt.card)
              })
              var curSuit = get.suit(event.card);
              return hists.includes(event) && hists.every(e => e === event || get.suit(e.card) != curSuit);
            },
            silent: true,
            content: function () {
              var phaseUse = _status.event.getParent('phaseUse');
              var hists = player.getHistory('useCard', function (evt) {
                return evt.getParent('phaseUse') == phaseUse && evt.card && get.suit(evt.card)
              })
              var suits = new Set(hists.map(e => get.suit(e.card)))
              player.storage.jlsg_yaoming = [trigger, suits]
              player.addTempSkill('jlsg_yaoming_mark', 'phaseUseAfter');
              if (player.hasSkill(event.name)) {
                player.markSkill('jlsg_yaoming_mark');
              }

              // var suit = get.suit(trigger.card), type = get.type(trigger.card, 'trick');
              // if (['heart', 'diamond', 'spade', 'club'].includes(suit) &&
              //   !player.storage.jlsg_yaoming.suits.includes(suit)) {
              //   player.storage.jlsg_yaoming.suits.push(suit);
              //   player.addTempSkill('jlsg_yaoming_mark', 'phaseUseAfter');
              //   player.markSkill('jlsg_yaoming_mark');
              // }
              // if (!player.storage.jlsg_yaoming.types.includes(type)) {
              //   player.storage.jlsg_yaoming.types.push(type);
              // }
            }
          },
          mark: {
            onremove: function (player) {
              delete player.storage.jlsg_yaoming;
            },
            intro: {
              content: function (storage, player) {
                var str = '使用过的花色：';
                var suits = [...player.storage.jlsg_yaoming[1]].sort()
                str += suits.reduce((a, b) => a + get.translation(b), '');
                return str;
              },
              markcount: function (storage, player) {
                return player.storage.jlsg_yaoming[1].size;
              },
            },
          },
          // clear: {
          //   trigger: { player: 'phaseAfter' },
          //   silent: true,
          //   content: function () {
          //     player.storage.jlsg_yaoming = { suits: [], types: [] }
          //   }
          // }
        },
      },
      jlsg_yaoming_: {
        audio: "ext:极略/audio/skill:4",
      },
      jlsg_yaoming_1: {
        audio: "ext:极略/audio/skill:true",
        trigger: { player: ["useCard", "respond"] },
        filter: function (event, player) {
          return player.storage.jlsg_yaoming &&
            player.storage.jlsg_yaoming[0] == event &&
            player.storage.jlsg_yaoming[1].size == 1;
        },
        // usable: 1,
        frequent: true,
        content: function () {
          player.draw();
        },
      },
      jlsg_yaoming_2: {
        audio: "ext:极略/audio/skill:true",
        trigger: { player: ["useCard", "respond"] },
        filter: function (event, player) {
          return player.storage.jlsg_yaoming &&
            player.storage.jlsg_yaoming[0] == event &&
            player.storage.jlsg_yaoming[1].size == 2;
        },
        // usable: 1,
        direct: true,
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt('jlsg_yaoming'), function (card, player, target) {
            return player != target && target.countCards('he') > 0;
          }).set('ai', function (target) {
            return -get.attitude(_status.event.player, target);
          }).set('prompt2', "你可以弃置一名其他角色的一张牌");
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_yaoming_2', result.targets);
            event.target = result.targets[0];
            player.discardPlayerCard(event.target, true);
          } else {
            event.finish();
          }
        }
      },
      jlsg_yaoming_3: {
        sub: true,
        audio: "ext:极略/audio/skill:true",
        trigger: { player: ["useCard", "respond"] },
        filter: function (event, player) {
          return player.storage.jlsg_yaoming &&
            player.storage.jlsg_yaoming[0] == event &&
            player.storage.jlsg_yaoming[1].size == 3 &&
            player.canMoveCard();
        },
        // usable: 1,
        prompt2: '你可以移动场上的一张牌',
        // frequent: true,
        check: function (event, player) {
          return player.canMoveCard(true);
        },
        content: function () {
          "step 0"
          // player.logSkill('jlsg_yaoming_3');
          player.moveCard();
          // player.moveCard(get.prompt2('jlsg_yaoming_3'));
        }
      },
      jlsg_yaoming_4: {
        audio: "ext:极略/audio/skill:true",
        trigger: { player: ["useCard", "respond"] },
        filter: function (event, player) {
          return player.storage.jlsg_yaoming &&
            player.storage.jlsg_yaoming[0] == event &&
            player.storage.jlsg_yaoming[1].size == 4;
        },
        // usable: 1,
        direct: true,
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt('jlsg_yaoming'), function (card, player, target) {
            return player != target;
          }).set('ai', function (target) {
            return -get.attitude(_status.event.player, target);
          }).set('prompt2', "你可以对一名其他角色造成一点伤害");
          "step 1"
          if (result.bool) {
            player.logSkill('jlsg_yaoming_4', result.targets);
            event.target = result.targets[0];
            event.target.damage();
          } else {
            event.finish();
          }
        }
      },
      jlsg_kuangfu: {
        trigger: { source: 'damageEnd' },
        direct: true,
        audio: "ext:极略/audio/skill:2",
        filter: function (event) {
          if (event._notrigger.includes(event.player)) return false;
          return event.card && event.card.name == 'sha' && event.player.countCards('e');
        },
        content: function () {
          player.gainPlayerCard('e', trigger.player, get.prompt(event.name, trigger.player)).logSkill = [event.name, trigger.player];
        }
      },
      jlsg_zhoufu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseBegin' },
        filter: function (event, player) {
          return player.countCards('h') != 0 && event.player != player;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseToDiscard('h', get.prompt2(event.name, trigger.player)).set("ai", function (card) {
            return get.attitude(player, trigger.player) > -1 ? 0 : 6 - get.useful(card);
          }).set('logSkill', event.name);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          trigger.player.judge(function (card) {
            if (get.color(card) == 'black') return -1;
            return 1;
          }).set('judge2', result => !result.bool)
            .set("callback", function () {
              if (event.judgeResult.suit === "spade") player.addTempSkill('baiban');
              else if (event.judgeResult.suit === 'club') player.chooseToDiscard(2, true);
            });
        },
        ai: {
          threaten: function (player, target) {
            if (player.getStat().skill.jlsg_zhoufu > 0 && target == _status.currentPhase) {
              return 2;
            }
            return 1.2;
          },
          expose: 0.2,
        }
      },
      // jlsg_zhoufu2: {
      //   init: function (player, skill) {
      //     var skills = player.getSkills(true, false);
      //     for (var i = 0; i < skills.length; i++) {
      //       if (get.skills[i]) {
      //         skills.splice(i--, 1);
      //       }
      //     }
      //     player.disableSkill(skill, skills);
      //   },
      //   onremove: function (player, skill) {
      //     player.enableSkill(skill);
      //   },
      //   mark: true,
      //   locked: true,
      //   intro: {
      //     content: function (storage, player, skill) {
      //       var list = [];
      //       for (var i in player.disabledSkills) {
      //         if (player.disabledSkills[i].includes(skill)) {
      //           list.push(i)
      //         }
      //       }
      //       if (list.length) {
      //         var str = '失效技能：';
      //         for (var i = 0; i < list.length; i++) {
      //           if (lib.translate[list[i] + '_info']) {
      //             str += get.translation(list[i]) + '、';
      //           }
      //         }
      //         return str.slice(0, str.length - 1);
      //       }
      //     },
      //   },
      // },
      jlsg_yingbing: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        trigger: { global: 'judgeEnd' },
        filter: function (event, player) {
          if (!event.result) return false;
          if (!event.result.card) return false;
          if (event.nogain && event.nogain(event.result.card)) {
            return false;
          }
          return get.color(event.result.card) == 'black' && event.player != player;
        },
        check: function (event, player) {
          return get.attitude(player, event.player) < 0;
        },
        content: function () {
          player.useCard({ name: 'sha' }, trigger.player, false);
        },
      },
      jlsg_danqi: {
        audio: 'danji',
        skillAnimation: true,
        unique: true,
        juexingji: true,
        derivation: ['jlsg_tuodao'],
        trigger: { player: 'phaseZhunbeiBegin' },
        forced: true,
        filter: function (event, player) {
          return !player.storage.jlsg_danqi && player.countCards('h') > player.hp;
        },
        init: function (player) {
          player.storage.jlsg_danqi = false;
        },
        content: function () {
          player.awakenSkill('jlsg_danqi');
          player.storage.jlsg_danqi = true;
          player.loseMaxHp();
          player.recover(2);
          player.addSkills('jlsg_tuodao');
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          effect: {
            target: function (card, player, target) {
              if (get.tag(card, 'damage') && target.countCards('h') >= target.hp && target.hp > 1 && target.getDamagedHp() < 3) {
                return [1, 1];
              }
            },
          }
        }
      },
      jlsg_tuodao: {
        audio: "ext:极略/audio/skill:1",
        trigger: { target: 'shaMiss' },
        filter: function (event, player) {
          return event.player.inRangeOf(player);
        },
        direct: true,
        content: function () {
          'step 0'
          player.addSkill('jlsg_tuodao_buff');
          'step 1'
          player.chooseToUse({ name: 'sha' }, '拖刀：是否对' + get.translation(trigger.player) + '使用一张【杀】？', trigger.player, -1)
            .set('logSkill', 'jlsg_tuodao')
          // .set('oncard', function(card, player) {
          //   _status.event.directHit.addArray(game.players);
          // });
          'step 2'
          player.removeSkill('jlsg_tuodao_buff');

        },
        subSkill: {
          buff: {
            audio: false,
            trigger: { player: 'shaBegin' },
            forced: true,
            popup: false,
            content: function () {
              trigger.directHit = true;
            },
            ai: {
              unequip: true,
            }
          }
        }
      },
      jlsg_zhuiji: {
        audio: "ext:极略/audio/skill:2",
        forced: true,
        trigger: {
          source: 'damageEnd',
        },
        filter: function (event, player) {
          return event.player != player;
        },
        content: function () {
          var target = trigger.player;
          if (!target.storage.jlsg_zhuiji_effect) {
            target.storage.jlsg_zhuiji_effect = [];
          }
          for (let info of target.storage.jlsg_zhuiji_effect) {
            if (info.player == player) {
              ++info.count;
              target.markSkill('jlsg_zhuiji_effect');
              return;
            }
          }
          target.storage.jlsg_zhuiji_effect.push({
            player: player,
            count: 1,
          });
          target.addSkill('jlsg_zhuiji_effect');
          target.markSkill('jlsg_zhuiji_effect');
        },
        subSkill: {
          effect: {
            charlotte: true,
            onremove: true,
            mod: {
              globalTo: function (from, to, distance) {
                for (let info of to.storage.jlsg_zhuiji_effect) {
                  if (info.player == from) {
                    return distance - info.count;
                  }
                }
              },
            },
            intro: {
              markcount(content, player) {
                return content.reduce((a, b) => a + b.count, 0);
              },
              content(content, player, skill) {
                return content.map(info => `${get.translation(info.player)}计算与你的距离-${info.count}`)
                  .join('<br>');
              },
            },
          },
        },
      },
      jlsg_xionglie: {
        audio: "ext:极略/audio/skill:2",
        direct: true,
        shaRelated: true,
        trigger: { player: 'useCardToPlayered' },
        filter: function (event, target) {
          return event.isFirstTarget && event.card.name == 'sha';
        },
        content: function () {
          'step 0'
          var special = !game.hasPlayer(p => p != player && get.distance(player, p) > 1);
          event.special = special;
          var effect = 0;
          for (var p of trigger.targets) {
            if (trigger.excluded.includes(p)) continue;
            effect += get.effect(p, trigger.card, player, player)
          }
          var choice = effect >= 1;
          if (special) {
            var prompt = `###${get.prompt(event.name)}###此【杀】不可被【闪】响应且伤害+1`;
            player.chooseBool(prompt, choice);
          } else {
            player.chooseControlList([
              '此【杀】不可被【闪】响应',
              '此【杀】伤害+1',
            ],
              get.prompt(event.name),
              function (event, player) {
                if (_status.event.choice) {
                  return [0, 1].randomGet();
                }
                return 2;
              }
            ).set('choice', choice);
          }
          'step 1'
          var crit = [false, false];
          if (event.special) {
            if (result.bool) {
              crit = [true, true];
            }
          } else {
            if (result.index < 2) {
              crit[result.index] = true;
            }
          }
          if (crit[0] || crit[1]) {
            player.logSkill(event.name);
          }
          if (crit[0]) {
            game.log(trigger.card, '不可被【闪】响应');
            trigger.directHit.length = 0;
            trigger.directHit.push(...game.players);
          }
          if (crit[1]) {
            game.log(trigger.card, '伤害+1');
            ++trigger.getParent().baseDamage;
          }
        },
        ai: {
          directHit_ai: true,
        },
      },
      jlsg_chenqing: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'dying' },
        usable: 1,
        filter: function (event, player) {
          return event.player.hp <= 0;
        },
        direct: true,
        init: function (player) {
          player.storage.jlsg_chenqing = 0;
        },
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2('jlsg_chenqing'), function (card, player, target) {
            return target != player && target != _status.event.getTrigger().player;
          }).set('ai', function (target) {
            var player = _status.event.player;
            var trigger = _status.event.getTrigger();
            var att1 = get.attitude(player, trigger.player); // 菜 -> 濒死角色
            var att2 = get.attitude(target, trigger.player); // 目标 -> 濒死角色
            var att3 = get.attitude(player, target); // 菜 -> 目标
            switch (_status.event.discardNum) {
              case 0:
              case 1:
                att1 *= 2.5;
                att2 = 0;
                break;
              case 2:
              case 3:
                att2 *= (get.sgn(att2) == get.sgn(att1) ? 0.5 : -0.5);
                att3 *= 1.2;
                break;
              case 4:
                att2 *= (get.sgn(att2) == get.sgn(att1) ? 0.5 : -0.5);
                att3 *= 1.5;
                buff = Math.min(0.5, target.countCards('he') * 0.1);
                if (att2 > 0) buff *= 1.2;
                att3 *= 1 + buff;
                break;
              case 5:
                att1 = att2 = 0;
                if (target.countCards('he') == 0) att3 = 0;
                if (target.countCards('he') <= 1) {
                  att3 = -att3;
                  break;
                }
                att3 += 0.5 * Math.random();
                if (target.countCards('he') == 2) att3 = -0.4 * att3;
                att3 *= Math.min(1, 0.1 * target.countCards('he'))
                break;
              default:
                att1 = att2 = 0;
                att3 = -att3;
                if (target.countCards('he') + 4 < _status.event.discardNum) {
                  att3 *= target.countCards('he') / (_status.event.discardNum - 4);
                }
                break;
            }
            // if (att3 < 0) return 0;
            return att1 + att2 + att3;
          }).set('discardNum', player.storage.jlsg_chenqing);
          'step 1'
          if (result.bool) {
            // player.addTempSkill('chenqing2', 'roundStart');
            event.target = result.targets[0];
            event.target.draw(4);
            player.logSkill('chenqing', event.target);
          }
          else {
            event.finish();
          }
          'step 2'
          var num = player.storage.jlsg_chenqing;
          var target = event.target;
          var tosave = trigger.player;
          var att = get.attitude(target, tosave);
          var hastao = target.countCards('h', 'tao');
          if (num == 0) {
            return;
          }
          target.chooseToDiscard(num, true, 'he').set('ai', function (card) {
            var num = _status.event.selectCard[0];
            var hastao = _status.event.hastao;
            var att = _status.event.att;
            if (!hastao && att > 0) {
              var suit = get.suit(card);
              for (var i = 0; i < ui.selected.cards.length; i++) {
                if (get.suit(ui.selected.cards[i]) == suit) {
                  return -4 - get.value(card);
                }
              }
            }
            if (att < 0 && ui.selected.cards.length + 1 == num) {
              var suit = get.suit(card);
              for (var i = 0; i < ui.selected.cards.length; i++) {
                if (get.suit(ui.selected.cards[i]) == suit) {
                  return -get.value(card);
                }
              }
              return -10 - get.value(card);
            }
            return -get.value(card);
          }).set('hastao', hastao).set('att', att);
          'step 3'
          ++player.storage.jlsg_chenqing;
          player.markSkill('jlsg_chenqing');
          if (result.cards) {
            var suits = [];
            for (var i = 0; i < result.cards.length; i++) {
              suits.add(get.suit(result.cards[i]));
            }
            if (suits.length != result.cards.length) {
              return;
            }
          }
          if (game.checkMod({ name: 'tao', isCard: true }, player, trigger.player, 'unchanged', 'cardSavable', player)) {
            event.target.useCard({ name: 'tao', isCard: true }, trigger.player);
          }
        },
        intro: {
          content: '已经发动了&次技能',
        },
        ai: {
          expose: 0.2,
          threaten: 1,
        }
      },
      jlsg_mozhi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseJieshuBegin' },
        direct: true,
        filter: function (event, player) {
          return event.player.getHistory('useCard', function (evt) {
            return ['basic', 'trick'].includes(get.type(evt.card));
          }).length > 0 && player.countCards('hs') > 0;
        },
        content: function () {
          var card = trigger.player.getHistory('useCard', function (evt) {
            return ['basic', 'trick'].includes(get.type(evt.card));
          }).pop().card
          event._result = {};
          card = { name: card.name, nature: card.nature };
          if (card.name != 'jiu' && lib.filter.cardEnabled(card)) {
            if (game.hasPlayer(function (current) {
              return player.canUse(card, current);
            })) {
              lib.skill.jlsg_mozhix.viewAs = card;
              var next = player.chooseToUse();
              if (next.isOnline()) {
                player.send(function (card) {
                  lib.skill.jlsg_mozhix.viewAs = card;
                }, card)
              }
              next.logSkill = 'jlsg_mozhi';
              next.set('openskilldialog', `###${get.prompt(event.name)}###将一张手牌当${get.translation(card)}使用`);
              next.set('norestore', true);
              next.set('_backupevent', 'jlsg_mozhix');
              next.set('custom', {
                add: {},
                replace: { window: function () { } }
              });
              next.backup('jlsg_mozhix');
            }
          }
        },
      },
      jlsg_mozhix: {
        filterCard: function (card) {
          return get.itemtype(card) == 'card';
        },
        selectCard: 1,
        position: 'hs',
        popname: true,
      },
      jlsg_hemeng: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countCards('h') && player.storage.jlsg_hemeng_usable;
        },
        filterTarget: function (card, player, target) {
          return player != target;
        },
        content: function () {
          'step 0'
          player.storage.jlsg_hemeng_usable--;
          // target.viewCards('和盟', player.getCards('h'));
          target.gainPlayerCard(player, 'h', 'visible', true);
          'step 1'
          // player.viewCards('和盟', target.get('he'));
          // target.isUnderControl();
          player.gainPlayerCard(target, 'visible', true, 'he').set('ai', function (button) {
            var card = button.link;
            return get.value(card);
          });
        },
        init: function (player) {
          player.storage.jlsg_hemeng_usable = 0;
        },
        group: ['jlsg_hemeng_usable'],
        subSkill: {
          usable: {
            trigger: { player: 'phaseUseBegin' },
            popup: false,
            forced: true,
            content: function () {
              player.storage.jlsg_hemeng_usable = player.getDamagedHp() + 1;
            }
          }
        },
        ai: {
          order: 6,
          result: {
            player: 1,
            target: -0.5,
          }
        }
      },
      jlsg_sujian: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'gainEnd' },
        filter: function (event, player) {
          // return (event.cards[0].original == 'h' || event.cards[0].original == 'e' || event.cards[0].original == 'j');
          if (!event.source || event.source == player || !event.source.isIn()) return false;
          var evt = event.getl(event.source);
          return evt && evt.cards2 && evt.cards2.length != 0;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2('jlsg_sujian'), function (card, player, target) {
            return player != target && target.countDiscardableCards(player, 'he') > 0;
          }).ai = function (target) {
            // if (!player.countCards('he')) return -get.attitude(player, target) && target.countCards('he');
            // if (player.countCards('he') > 4) return get.attitude(player, target) && target.countCards('he');
            // return 0;
            return get.effect(target, { name: 'guohe' }, player, player) + get.effect(player, { name: 'guohe' }, target, player) - 1;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_sujian', result.targets);
            result.targets[0].discardPlayerCard(player, 'he', true);
            player.discardPlayerCard(result.targets[0], 'he', true);
          }
        }
      },
      jlsg_yexi: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseJieshuBegin' },
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          var check, i, num = 0;
          for (i = 0; i < game.players.length; i++) {
            if (player != game.players[i] && game.players[i].num('h') > 1) {
              var att = get.attitude(player, game.players[i]);
              if (att > 3) {
                num++;
              }
            }
          }
          check = (num > 0 && (player.countCards('h') > 1 || player.hp > 2));
          player.chooseCardTarget({
            ai1: function (card) {
              var evt = _status.event;
              if (!evt.check) return 0;
              return 6 - get.useful(card);
            },
            ai2: function (target) {
              var evt = _status.event;
              if (!evt.check) return 0;
              return get.attitude(evt.player, target);
            },
            filterTarget: function (card, player, target) {
              return target != player;
            },
            filterCard: true,
            prompt: '是否发动【夜袭】？',
            check: check,
            target: target
          });
          'step 1'
          if (result.bool) {
            event.target = result.targets[0];
            player.logSkill('jlsg_yexi', event.target);
            player.discard(result.cards);
            event.target.chooseControl('选项一', '选项二', function () {
              return Math.random() < 0.5 ? '选项一' : '选项二';
            }).set('prompt', '夜袭<br><br><div class="text">1:使用黑色【杀】时无视防具.</div><br><div class="text">2:使用红色【杀】时无视距离.</div></br>');
          } else {
            event.finish();
          }
          'step 2'
          if (result.control == '选项一') {
            event.target.addSkill('jlsg_yexi_getBlack');
          } else {
            event.target.addSkill('jlsg_yexi_getRed');
          }
        },
        subSkill: {
          getBlack: {
            unique: true,
            trigger: { player: 'phaseUseBegin' },
            forced: true,
            popup: false,
            mark: true,
            marktext: '夜',
            intro: {
              name: '夜袭',
              content: '使用黑色【杀】时无视防具'
            },
            content: function () {
              player.addTempSkill('jlsg_yexi_black', 'phaseAfter');
              player.removeSkill('jlsg_yexi_getBlack');
            }
          },
          getRed: {
            trigger: { player: 'phaseUseBegin' },
            forced: true,
            unique: true,
            popup: false,
            mark: true,
            marktext: '夜',
            intro: {
              name: '夜袭',
              content: '使用红色【杀】时无视距离'
            },
            content: function () {
              player.addTempSkill('jlsg_yexi_red', 'phaseAfter');
              player.removeSkill('jlsg_yexi_getRed');
            }
          },
          black: {
            mark: true,
            unique: true,
            marktext: '夜',
            intro: {
              name: '夜袭',
              content: '使用黑色【杀】时无视防具'
            },
            trigger: { player: 'shaBefore' },
            forced: true,
            popup: false,
            filter: function (event, player) {
              return event.card && get.color(event.card) == 'black';
            },
            content: function () {
              player.addTempSkill('unequip', 'shaAfter');
            }
          },
          red: {
            mark: true,
            unique: true,
            marktext: '夜',
            intro: {
              name: '夜袭',
              content: '使用红色【杀】时无视距离'
            },
            mod: {
              targetInRange: function (card, player) {
                if (card.name == 'sha' && get.color(card) == 'red') return true;
              }
            }
          }
        }
      },
      jlsg_kuangyan: {
        audio: "ext:极略/audio/skill:2",
        group: ['jlsg_kuangyan1', 'jlsg_kuangyan2']
      },
      jlsg_kuangyan1: {
        audio: "ext:极略/audio/skill:true",
        priority: -1,
        trigger: { player: 'damageBegin3' },
        filter: function (event, player) {
          return !event.nature && event.num == 1;
        },
        forced: true,
        content: function () {
          trigger.cancel();
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (get.tag(card, 'damage')) {
                if (!get.nature(card)) {
                  if (card.name == 'sha' && (!player.hasSkill('jiu') || !player.hasSkill('reluoyi') || !player.hasSkill('luoyi'))) return 0.1;
                  return 0.2;
                }
              }
            },
          }
        },
        group: null,
      },
      jlsg_kuangyan2: {
        audio: "ext:极略/audio/skill:true",
        trigger: { player: 'damageBegin3' },
        filter: function (event, player) {
          return event.num >= 2;
        },
        priority: -1,
        forced: true,
        content: function () {
          trigger.num++;
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (get.tag(card, 'damage')) {
                if (card.name == 'sha' && (player.hasSkill('jiu') || player.hasSkill('reluoyi') || player.hasSkill('luoyi'))) return [1, -2];
              }
            },
          }
        },
        group: null,
      },
      jlsg_chaochen: {
        audio: "ext:极略/audio/skill:1",
        usable: 1,
        enable: 'phaseUse',
        filterCard: true,
        selectCard: [1, Infinity],
        discard: false,
        lose: false,
        // prepare: function (cards, player, targets) {
        //   player.$give(cards.length, targets[0]);
        // },
        filterTarget: function (card, player, target) {
          return player != target;
        },
        check: function (card) {
          if (ui.selected.cards.length == 0) return 4 - get.value(card);
          return 0;
        },
        content: function () {
          player.give(cards, target);
          target.addTempSkill('jlsg_chaochen2', { player: 'phaseAfter' });
          target.markAuto('jlsg_chaochen2', [player]);
        },
        ai: {
          order: 0.5,
          result: {
            player: -1,
            target: function (player, target) {
              var th = target.countCards('h');
              if (th + 1 > target.hp) return -1;
              return 0;
            }
          }
        }
      },
      jlsg_chaochen2: {
        audio: "jlsg_chaochen",
        mark: true,
        marktext: '朝',
        intro: {
          content: "回合开始时，若手牌数大于体力值，受到$造成的1点伤害",
        },
        trigger: { player: 'phaseBegin' },
        filter: function (event, player) {
          return player.storage.jlsg_chaochen2 && player.countCards('h') > player.hp;
        },
        direct: true,
        onremove: function (player) {
          delete player.storage.jlsg_chaochen2;
        },
        content: function () {
          'step 0'
          var target = player.storage.jlsg_chaochen2.shift();
          target.logSkill('jlsg_chaochen2', player);
          player.damage(target);
          if (player.storage.jlsg_chaochen2.length) {
            event.redo();
          }
          // player.storage.jlsg_chaochen2.logSkill('jlsg_chaochen2', player);
          // player.damage(player.storage.jlsg_chaochen2);
          // delete player.storage.jlsg_chaochen2;
        }
      },
      jlsg_quanzheng: {
        audio: "ext:极略/audio/skill:1",
        trigger: { target: 'useCardToBefore' },
        filter: function (event, player) {
          if (event.player == player) return false;
          if (event.player.countCards('h') > player.countCards('h') || event.player.countCards('e') > player.countCards('e'))
            return get.type(event.card) == 'trick' || event.card.name == 'sha';
          return false;
        },
        frequent: true,
        content: function () {
          player.draw();
        }
      },
      jlsg_shejian: {
        audio: "ext:极略/audio/skill:1",
        enable: 'phaseUse',
        filter: function (event, player) {
          return !player.get('e', '2') &&
            game.countPlayer(p => p.countCards('he') && player != p && !p.hasSkill('jlsg_shejian2'));
        },
        filterTarget: function (card, player, target) {
          return target.countCards('he') && player != target && !target.hasSkill('jlsg_shejian2');
        },
        content: function () {
          'step 0'
          target.addTempSkill('jlsg_shejian2');
          player.discardPlayerCard('he', target, true);
          'step 1'
          target.chooseBool('是否对' + get.translation(player) + '使用一张【杀】？').ai = function (event, player) {
            return get.effect(player, { name: 'sha' }, target, target) + 3;
          }
          'step 2'
          if (result.bool) {
            target.useCard({ name: 'sha' }, player, false);
          }
        },
        ai: {
          order: 9,
          result: {
            player: function (player, target) {
              if (player.hp <= 2) return -2;
              if (!player.countCards('h', 'shan')) return -1;
              return -0.5;
            },
            target: -1,
          }
        }
      },
      jlsg_shejian2: {},
      jlsg_kuangao: {
        audio: "ext:极略/audio/skill:2",
        trigger: { target: 'shaAfter' },
        filter: function (event, player) {
          if (!event.player) return false;
          return player.countCards('he') // && event.player.countCards('he')
            || event.player.countCards('h') < Math.min(5, event.player.maxHp);
        },
        check: function (event, player) {
          var phe = player.countCards('he');
          var the = event.player.countCards('he');
          if (the > phe && get.attitude(player, event.player) < 0) return 1;
          if (event.player.countCards('h') < event.player.maxHp && get.attitude(player, event.player) > 0) return 1;
          return 0;
        },
        direct: true,
        content: function () {
          'step 0'
          event.target = trigger.player;
          var prompts = [
            `弃置所有牌，然后${get.translation(event.target)}弃置所有牌`,
            `令${get.translation(event.target)}摸牌至体力上限（至多摸至五张）`
          ];
          event.prompts = [];
          if (player.countCards('he')) {
            event.prompts.push(0);
          }
          if (event.target.countCards('h') < Math.min(5, event.target.maxHp)) {
            event.prompts.push(1);
          }
          var coeff = 0.5 * Math.random() + 0.75; // target card guess coeff
          var ai = function (event, player) {
            if (get.attitude(player, event.target) > 0) {
              if (!event.prompts.includes(1)) return 'cancel2';
              return prompts[1];
            } else {
              if (!event.prompts.includes(0)) return 'cancel2';
              var targetHEValue = coeff * event.target.getCards('h').reduce((a, b) => a + get.value(b, event.target), 0)
                + event.target.getCards('e').reduce((a, b) => a + get.value(b, event.target), 0);
              var playerHEValue = player.getCards('he').reduce((a, b) => a + get.value(b, player), 0);
              return (- coeff * targetHEValue * get.attitude(player, event.target)
                - playerHEValue * get.attitude(player, player) > 0)
                ? event.prompts.indexOf(0) : 'cancel2';
            }
          };
          player.chooseControlList(event.prompts.map(n => prompts[n]), ai, get.prompt(event.name, event.target));
          'step 1'
          if (result.control == 'cancel2') {
            event.finish();
            return;
          }
          player.logSkill(event.name, event.target);
          if (event.prompts[result.index] == 0) {
            player.discard(player.getCards('he'));
            event.target.discard(event.target.getCards('he'));
          } else {
            event.target.drawTo(event.target.maxHp);
          }
        },
        // contentx: function () {
        //   'step 0'
        //   player.chooseControl('选项一', '选项二', function () {
        //     var phe = player.countCards('he');
        //     var the = trigger.player.countCards('he');
        //     if (the > phe && get.attitude(player, trigger.player) < 0) return '选项一';
        //     if (get.attitude(player, trigger.player) > 0) return '选项二';
        //     return '选项二';
        //   }).set('prompt', '狂傲<br><br><div class="text">1:弃置所有牌(至少一张),然后' + get.translation(trigger.player) + '弃置所有牌.</div><br><div class="text">2:令' + get.translation(trigger.player) + '将手牌补至其体力上限的张数(至多5张).</div></br>');
        //   'step 1'
        //   if (result.control == '选项一') {
        //     player.discard(player.get('he'));
        //     trigger.player.discard(trigger.player.get('he'));
        //   } else {
        //     if (Math.min(5, trigger.player.maxHp) - trigger.player.countCards('h')) {
        //       trigger.player.drawTo(trigger.player.maxHp);
        //     }
        //   }
        // },
        // ai: {
        //   effect: {
        //     target: function (card, player, target, current) {
        //       if (card.name != 'sha') return;
        //       if (get.attitude(player, target) < 0) return [1, -target.countCards('he'), 1, -player.countCards('he')];
        //       if (get.attitude(player, target) > 3 && player.countCards('h') < player.maxHp - 2 && target.hp > 2) return [1, 0.5, 1, Math.min(5, player.maxHp) - player.countCards('h')];
        //       return [1, -target.countCards('he'), 1, -player.countCards('he')];
        //     }
        //   }
        // }
      },
      jlsg_yinbing: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'shaBegin' },
        filter: function (event, player) {
          if (event.player == player || event.target == player) return false;
          return event.target.inRangeOf(player) && event.target.countCards('e');
        },
        logTarget: 'target',
        check: function (event, player) {
          if (player.countCards('h', 'shan') && get.effect(event.target, { name: 'sha' }, event.player, player) < 0) {
            return 1;
          }
          if (player.hp == 1 && event.player.countCards('e', 'guanshi')) return 0;
          if (get.attitude(player, event.target) > 0 && player.hp >= 2 && get.effect(event.target, { name: 'sha' }, event.player, player) < 0) return 1;
          return 0;
        },
        content: function () {
          player.gainPlayerCard(trigger.target, 'e', true);
          trigger.target = player;
          trigger.untrigger();
          trigger.trigger('useCardToBefore');
          trigger.trigger('shaBefore');
        },
        group: ['jlsg_yinbing2'],
      },
      jlsg_yinbing2: {
        audio: "ext:极略/audio/skill:true",
        trigger: { target: 'shaBefore' },
        filter: function (event, player) {
          return player.countCards('he') > 0 && player.isDamaged();
        },
        direct: true,
        content: function () {
          'step 0'
          var next = player.chooseToDiscard(get.prompt('jlsg_yinbing2'), 'he')
          next.ai = function (card) {
            if (player.getDamagedHp() > 1) return 6 - get.value(card);
            if (player.getDamagedHp() > 2) return 10 - get.value(card);
            return 4 - get.value(card);
          };
          next.logSkill = 'jlsg_yinbing2';
          'step 1'
          if (result.bool) {
            player.draw(player.getDamagedHp());
          }
        },
      },
      jlsg_fenwei: {
        audio: "ext:极略/audio/skill:1",
        trigger: { source: 'damageBegin1' },
        filter: function (event, player) {
          return event.card && event.card.name == 'sha' && event.notLink() && event.player.countCards('h');
        },
        direct: true,
        content: function () {
          'step 0'
          player.choosePlayerCard('h', trigger.player);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.showCards(result.cards);
          player.logSkill(event.name, trigger.player)
          var card = result.cards[0];
          if (card.name == 'tao' || card.name == 'jiu') {
            player.gain(card, trigger.player, 'give', 'bySelf');
          }
          if (get.type(card) != 'basic') {
            trigger.player.discard(card, 'notBySelf');
            trigger.num++;
          }
        },
      },
      jlsg_shiyong: {
        trigger: { player: 'damageEnd' },
        audio: "ext:极略/audio/skill:1",
        filter: function (event) {
          if (event.card && (event.card.name == 'sha')) {
            if (get.color(event.card) == 'red') return true;
            if (event.source && event.source.hasSkill('jiu')) return true;
          }
          return false;
        },
        forced: true,
        content: function () {
          'step 0'
          player.loseMaxHp();
          'step 1'
          if (player.maxHp <= 1) {
            player.storage.shiyongEndLife = trigger.source;
          }
        },
        ai: {
          effect: {
            target: function (card, player, target, current) {
              if (card.name == 'sha') {
                if (get.color(card) == 'red') return [1, -2];
                if (player.hasSkill('jiu')) return [1, -1.5];
              }
              if (get.tag(card, 'save') && target.isDying() && target.storage.shiyongEndLife) {
                var source = target.storage.shiyongEndLife;
                if (get.attitude(source, target) < 0 && target.identity == 'fan') return;
                return 'zeroplayertarget';
              }
            }
          },
          neg: true,
        }
      },
      jlsg_angyang: {
        shaRelated: true,
        audio: "ext:极略/audio/skill:1",
        trigger: { player: ['shaBefore', 'juedouBefore'] },
        filter: function (event, player) {
          if (event.card.name == 'juedou') return true;
          return get.color(event.card) == 'red';
        },
        frequent: true,
        content: function () {
          if (trigger.target.countCards('j')) {
            player.draw(2);
          } else {
            player.draw();
          }
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (card.name == 'sha' && get.color(card) == 'red') return [1, 0.6];
            },
            player: function (card, player, target) {
              if (card.name == 'sha' && get.color(card) == 'red') return [1, 1];
            }
          }
        },
        group: 'jlsg_angyang2'
      },
      jlsg_angyang2: {
        audio: "jlsg_angyang",
        trigger: { target: ['shaBefore', 'juedouBefore'] },
        filter: function (event, player) {
          if (event.card.name == 'juedou') return true;
          return get.color(event.card) == 'red';
        },
        frequent: true,
        content: function () {
          if (trigger.player.countCards('j')) {
            player.draw(2);
          } else {
            player.draw();
          }
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (card.name == 'juedou') return [1, 0.6];
            },
            player: function (card, player, target) {
              if (card.name == 'juedou') return [1, 1];
            }
          }
        },
      },
      jlsg_weifeng: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return player.countCards('h') < player.hp && game.countPlayer(p => player.canCompare(p));
        },
        direct: true,
        content: function () {
          'step 0'
          var num = game.me.getCards('h').reduce((a, b) => a < get.number(b) ? get.number(b) : a, 0);
          player.chooseTarget('是否发动【威风】？', function (card, player, target) {
            return player.canCompare(target);
          }).set("ai", function (target) {
            var player = _status.event.player;
            var eff = -get.attitude(player, target) - get.attitude(player, player);
            var playerExpect = ((_status.event.num - 1) / 13) ** target.countCards('h');
            eff += 2 * playerExpect * (get.attitude(player, player)) + 2 * (1 - playerExpect) * (get.attitude(player, target)) + 1;
            return eff;

          }).set("num", num);
          'step 1'
          if (result.bool) {
            event.target = result.targets[0];
            player.logSkill('jlsg_weifeng', event.target);
            player.chooseToCompare(event.target);
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            player.draw(2);
          } else {
            event.target.draw(2);
          }
        }
      },
      jlsg_xieli: {
        audio: "ext:极略/audio/skill:1",
        zhuSkill: true,
        trigger: { player: 'chooseToCompareBegin' },
        filter: function (event, player) {
          return player.hasZhuSkill('jlsg_xieli') && game.hasPlayer(p => p != player && p.group == 'wu');
        },
        check: function (event, player) {
          return game.hasPlayer(p => p != player && p.group == 'wu' && get.attitude(player, p) > 1);
        },
        content: function () {
          'step 0'
          event.targets = game.filterPlayer(p => p != player && p.group == 'wu');
          event.cards = [];
          'step 1'
          var current = event.targets.shift();
          event.current = current;
          if (!current) {
            event.goto(3);
          } else if (!current.countCards('h')) {
            event.redo();
          } else {
            current.chooseCard('是否帮' + get.translation(player) + '打出一张拼点牌？').ai = function (card) {
              if (get.attitude(current, player) > 2) {
                return get.number(card, player) > 8 && 7 - get.value(card);
              } else if (get.attitude(current, player) < -2 && event.cards.length == 0 &&
                !event.targets.some(p => p.countCards('h') && get.attitude(p, player) > 2)) {
                // 使坏
                return get.number(card, player) < 5 && 7 - get.value(card);
              }
              return 0;
            }
          }
          'step 2'
          if (result.bool) {
            event.cards = event.cards.concat(result.cards[0]);
            event.current.lose(result.cards[0], ui.ordering).set('getlx', false);
            // event.current.$give(1, player);
            event.current.$throw(1, 1000);
          }
          event.goto(1);
          'step 3'
          if (event.cards.length) {
            player.chooseButton(['协力', event.cards], true).set('ai', function (button) {
              return get.number(button.link, player);
            });
          } else {
            event.finish();
          }
          'step 4'
          if (!trigger.fixedResult) trigger.fixedResult = {};
          trigger.fixedResult[player.playerid] = result.buttons[0].link;
          // player.gain(result.buttons[0].link);
          // player.discard(event.cards);
        },
      },
      jlsg_jushou: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseJieshuBegin' },
        check: function (event, player) {
          var num = game.filterPlayer(p => p != player && player.inRangeOf(p)).length;
          if (player.isTurnedOver()) return true;
          if (num > 2) return 1;
          return 0;
        },
        content: function () {
          'step 0'
          var num = game.filterPlayer(p => p != player && player.inRangeOf(p)).length;
          player.draw(Math.min(5, num + 1));
          player.turnOver();
        }
      },
      jlsg_yicong: {
        audio: 'yicong',
        inherit: 'yicong'
      },
      jlsg_muma: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'loseAfter' },
        forced: true,
        filter: function (event, player) {
          if (event.player == player) return false;
          if (_status.currentPhase == player) return false;
          for (var i = 0; i < event.cards.length; i++) {
            if (event.cards[i].original == 'e' && get.position(event.cards[i]) == 'd')
              return !player.get('e', get.subtype(event.cards[i])[5]) && (get.subtype(event.cards[i]) == 'equip3' || get.subtype(event.cards[i]) == 'equip4');
          }
          return false;
        },
        content: function () {
          for (var i = 0; i < trigger.cards.length; i++) {
            if (trigger.cards[i].original == 'e' && !player.get('e', get.subtype(trigger.cards[i])[5]) && (get.subtype(trigger.cards[i]) == 'equip3' || get.subtype(trigger.cards[i]) == 'equip4'))
              player.gain(trigger.cards[i], 'gain');
          }

        },
      },
      jlsg_suiji: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseDiscardBegin' },
        filter: function (event, player) {
          return event.player != player && player.countCards('h');
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseCard('是否对' + get.translation(trigger.player) + '发动【随骥】？', [1, Infinity])
            .set('ai', function (card) {
              var cha = trigger.player.countCards('h') - trigger.player.hp;
              var att = get.attitude(player, trigger.player);
              if (cha == 0 && ui.selected.cards.length == 0) return att > 3 ? 2 : -1;
              if (cha >= 1) {
                if (ui.selected.cards.length == 0) {
                  if (att > 0) return get.value(card);
                  return 7.5 - get.value(card);
                }
                if (ui.selected.cards.length >= 1) return -1;
              }
              if (trigger.player.countCards('h') <= 2 && get.attitude(player, trigger.player) > 3 && player.countCards('h') > 3) return 6 - get.value(card);
              return 0;
            });
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_suiji', trigger.player);
            trigger.player.gain(result.cards, player, 'giveAuto');
          } else {
            event.finish();
          }
          'step 2'
          var num = trigger.player.countCards('h') - trigger.player.hp;
          if (num > 0) {
            var next = trigger.player.chooseCard('交给' + get.translation(player) + get.translation(num) + '张手牌', num, true)
            next.ai = function (card) {
              var att = get.attitude(trigger.player, player);
              if (att > 3) {
                if (ui.selected.cards.length == 0 && trigger.hp > player.hp) {
                  return get.value(card);
                }
              }
              return 20 - get.value(card);
            };
          } else {
            event.finish();
          }
          'step 3'
          if (result.bool) {
            player.gain(result.cards, trigger.player, 'giveAuto');
          }
        }
      },
      jlsg_fengyi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { target: 'useCardToBefore' },
        filter: function (event, player) {
          return get.type(event.card) == 'trick' && event.targets.length == 1;
        },
        frequent: true,
        content: function () {
          player.draw();
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (get.type(card) == 'trick') {
                if (card.name == 'jiedao') return;
                if (get.tag(card, 'multitarget')) return;
                return [0.5, 0.6];
              }
            },
          }
        }
      },
      jlsg_yalv: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['damageEnd', 'phaseUseBegin'] },
        frequent: true,
        content: function () {
          'step 0'
          event.cards = get.cards(2);
          game.cardsGotoOrdering(event.cards);
          player.chooseBool(get.value(event.cards[0]) < get.value(event.cards[1]))
            .set("createDialog", ["雅虑：是否调换牌堆顶两张牌的顺序？", event.cards, 'hidden']);
          // player.chooseCardButton('雅虑:请选择牌堆顶的牌,先选择的在上', 2, event.cards, true);
          'step 1'
          if (!result.bool) {
            event.cards.reverse();
          }
          for (var card of event.cards) {
            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
          }
          player.chooseBool('是否摸一张牌？', () => true).set('frequentSkill', event.name);
          'step 2'
          if (result.bool) {
            player.draw();
          }
        }
      },
      jlsg_xiemu: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'phaseZhunbeiBegin' },
        direct: true,
        filter: function (event, player) {
          return player.countCards('he');
        },
        content: function () {
          'step 0'
          player.chooseCard(get.prompt(event.name, trigger.player), 'he').ai = function (card) {
            if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('lebu')) return get.suit(card) == 'heart';
            if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('bingliang')) return get.suit(card) == 'club';
            if (get.attitude(player, trigger.player) > 0 && trigger.player.hasJudge('shandian')) return (get.suit(card) != 'spade' || (card.number < 2 || card.number > 9));
            if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('lebu')) return get.suit(card) != 'heart';
            if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('bingliang')) return get.suit(card) != 'club';
            if (get.attitude(player, trigger.player) < 0 && trigger.player.hasJudge('shandian')) return (get.suit(card) == 'spade' && card.number >= 2 && card.number <= 9);
            if (trigger.player == player) return 10;
            return 0;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_xiemu', trigger.player);
            trigger.player.addTempSkill('jlsg_xiemu3');
            player.lose(result.cards, ui.cardPile, 'insert');
            game.log(player, '将一张牌置于牌堆顶');
            player.$throw(1, 1000);
          }
        },
        group: 'jlsg_xiemu2',
      },
      jlsg_xiemu2: {
        trigger: { global: 'phaseJieshuBegin' },
        audio: "ext:极略/audio/skill:1",
        logTarget: 'player',
        prompt2: function (event, player) {
          if (player == event.player) {
            return "摸一张牌";
          } else {
            return `令${get.translation(event.player)}摸一张牌`;
          }
        },
        frequent: function (event, player) {
          return event.player == player;
        },
        filter: function (event, player) {
          return event.player.hasSkill('jlsg_xiemu3');
        },
        check: function (event, player) {
          if (get.attitude(player, event.player) > 0) return 1;
          return 0;
        },
        content: function () {
          // player.logSkill('jlsg_xiemu', trigger.player);
          trigger.player.draw();
        },
      },
      jlsg_xiemu3: {},
      jlsg_zhejie: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'phaseDiscardEnd' },
        filter: function (event, player) {
          return event.player != player && player.countCards('h') > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          var next = player.chooseToDiscard('是否发动对' + get.translation(trigger.player) + '【折节】？');
          next.ai = function (card) {
            if (get.attitude(player, trigger.player) < 0 && trigger.player.countCards('he')) return 5.5 - get.value(card);
            return 0;
          };
          next.logSkill = ['jlsg_zhejie', trigger.player];
          'step 1'
          if (result.bool && trigger.player.countCards('he') > 0) {
            trigger.player.chooseToDiscard('he', true).set('ai', function (card) {
              var att = get.attitude(_status.event.player, _status.event.target)
                / get.attitude(_status.event.player, _status.event.player);
              var eff = -get.value(card);
              if (get.type(card) == 'equip') {
                eff *= (1 - att);
              }
              return eff;
            }).set('target', player);
          } else {
            event.finish();
          }
          'step 2'
          if (get.type(result.cards[0]) == 'equip') {
            if (trigger.player.countDiscardableCards(trigger.player, 'he', c => get.type(c) != 'equip') &&
              trigger.player.ai.shown < player.ai.shown) {
              var attSum = Math.sign(get.attitude(trigger.player, player)) + Math.sign(get.attitude(player, trigger.player));
              if (attSum > 0) {
                trigger.player.addExpose(0.1);
              }
              if (attSum < 0) {
                trigger.player.addExpose(-0.1);
              }
            }
            event.card = result.cards[0];
            player.chooseTarget('选择一名目标获得' + get.translation(event.card), function (card, player, target) {
              return trigger.player != target;
            }).ai = function (target) {
              if (get.attitude(player, target) <= 0) return -5;
              return 6 - target.countCards('e');
            }
          } else {
            event.finish();
          }
          'step 3'
          if (result.bool) {
            result.targets[0].gain(event.card, 'gain2');
          }
        },
        ai: {
          expose: 0.3,
        }
      },
      jlsg_fengya: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'damageBegin3' },
        frequent: true,
        filter: function (event) {
          return event.source != undefined;
        },
        check: function () {
          return 1;
        },
        content: function () {
          "step 0"
          player.draw();
          trigger.source.chooseBool('是否摸一张牌并令此伤害-1?').ai = function () {
            if (get.attitude(trigger.source, player) == 0 && trigger.num <= 1) return 2;
            return get.attitude(trigger.source, player) > 0;
          }
          "step 1"
          if (result.bool) {
            trigger.source.draw();
            trigger.num--;
          }
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          effect: {
            target: function (card, player, target) {
              if (get.attitude(target, player) < 0) return;
              if (get.tag(card, 'damage')) {
                return [1, 0.3, 1, 0.9];
              }
            },
          }
        }
      },
      jlsg_yijian: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseUseBefore' },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget('是否发动【义谏】？', function (card, player, target) {
            return player != target;
          }).ai = function (target) {
            var hasTrick = player.hasCard(function (card) {
              return ['trick'].includes(get.type(card));
            }, 'h');
            if (get.attitude(player, target) <= 0) return 0;
            var result = Math.max(1, 5 - target.countCards('h'));
            if (player.isHealthy()) {
              if (!hasTrick) {
                if (player.hp >= player.countCards('h')) {
                  return player.hasCard(function (card) {
                    return get.tag(card, 'damage')
                  }) ? 0 : result;
                } else {
                  return player.hasCard(function (card) {
                    return get.tag(card, 'damage') && card.name != 'sha';
                  }) ? 0 : result;
                }
              }
            } else {
              var compare = target.countCards('h') + 1 >= player.countCards('h');
              if (!hasTrick && player.countCards('h') < player.hp) return compare ? 10 : result;
              if (player.hp <= 2 && compare && ((player.countCards('h') >= 2 && player.countCards('h', 'sha') <= 1) || player.countCards('h') < 2)) return 10;
              return 0;
            }
          }
          'step 1'
          if (result.bool) {
            event.target = result.targets[0];
            trigger.cancel();
            player.logSkill('jlsg_yijian', result.targets[0]);
            result.targets[0].draw();
          } else {
            event.finish();
          }
          'step 2'
          if (event.target && event.target.num('h') >= player.countCards('h')) {
            player.recover();
          }
        }
      },
      jlsg_feijun: {
        audio: "ext:极略/audio/skill:2",
        popup: false,
        trigger: { player: 'phaseUseBegin' },
        forced: true,
        content: function () {
          if (player.countCards('h') >= player.hp) {
            player.logSkill('jlsg_feijun1');
            player.storage.jlsg_feijun = player.hp;
            player.addTempSkill('jlsg_feijun_more');
          } else {
            player.logSkill('jlsg_feijun2');
            player.addTempSkill('jlsg_feijun_less');
          }
        },
        subSkill: {
          more: {
            mod: {
              attackRange: function (player, num) {
                return num + player.storage.jlsg_feijun;
              },
              cardUsable: function (card, player, num) {
                if (card.name == 'sha') return num + 1;
              }
            }
          },
          less: {
            mod: {
              cardEnabled: function (card) {
                if (card.name == 'sha') return false
              }
            }
          }
        }
      },
      jlsg_feijun1: {
        inherit: 'jlsg_feijun',
        sub: true,
        audio: 'ext:极略/audio/skill:true',
      },
      jlsg_feijun2: {
        inherit: 'jlsg_feijun',
        sub: true,
        audio: 'ext:极略/audio/skill:true',
      },
      jlsg_muniu: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: ['equipAfter', 'addJudgeAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (_status.currentPhase != player) return false;
          return game.hasPlayer(p => {
            var evt = event.getl(p);
            return evt && evt.es && evt.es.length;
          });
        },
        direct: true,
        content: function () {
          'step 0'
          event.num = game.filterPlayer(p => {
            var evt = trigger.getl(p);
            return evt && evt.es && evt.es.length;
          }).length;
          'step 1'
          if (!event.num) {
            event.finish();
            return;
          }
          --event.num;
          player.chooseTarget(get.prompt2('jlsg_muniu')).ai = function (target) {
            var att = get.attitude(player, target);
            if (target.countCards('h')) {
              att = Math.max(att, -0.8 * get.attitude(player, target));
            }
            return att;
          }
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.target = result.targets[0];
          player.logSkill('jlsg_muniu', event.target);
          if (!event.target.countDiscardableCards(player, 'h')) {
            event.target.draw();
            event.finish();
          } else {
            player.discardPlayerCard(event.target, 'h').ai = function (button) {
              if (get.attitude(player, event.target) > 0) return false;
              return get.value(button.link);
            }
          }
          'step 3'
          if (!result.bool) {
            event.target.draw();
          }
          event.goto(1);
        },
        group: ['jlsg_muniu2']
      },
      jlsg_muniu2: {
        trigger: { global: 'equipEnd' },
        filter: function (event, player) {
          if (_status.currentPhase != player) return false;
          return true;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2('jlsg_muniu')).ai = function (target) {
            var att = get.attitude(player, target);
            if (target.countCards('h')) {
              att = Math.max(att, -0.8 * get.attitude(player, target));
            }
            return att;
          }
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.target = result.targets[0];
          player.logSkill('jlsg_muniu', event.target);
          if (!event.target.countDiscardableCards(player, 'h')) {
            event.target.draw();
            event.finish();
          } else {
            player.discardPlayerCard(event.target, 'h').ai = function (button) {
              if (get.attitude(player, event.target) > 0) return false;
              return get.value(button.link);
            }
          }
          'step 2'
          if (!result.bool) {
            event.target.draw();
          }
        },
      },
      jlsg_liuma: {
        audio: "ext:极略/audio/skill:1",
        usable: 1,
        enable: 'phaseUse',
        filterCard: function (card) {
          return get.type(card) == 'basic';
        },
        filterTarget: function (card, player, target) {
          return target != player && target.countCards('e');
        },
        selectTarget: [1, 2],
        content: function () {
          'step 0'
          if (targets.length) {
            event.target = targets.shift();
          } else {
            event.finish();
          }
          'step 1'
          event.target.chooseCardTarget({
            prompt: '选择一名角色将你的一张装备牌交给该角色,或令' + get.translation(player) + '获得你一张手牌',
            filterCard: true,
            position: 'e',
            filterTarget: function (card, player, target) {
              return player != target;
            },
            ai1: function (card) {
              return 1;
            },
            ai2: function (target) {
              return get.attitude(event.target, target) > 0;
            },
          });
          'step 2'
          if (result.bool) {
            event.target.line(result.targets, 'green');
            result.targets[0].gain(result.cards, event.target, 'giveAuto');
            event.goto(0);
          } else {
            player.gainPlayerCard('h', event.target);
          }
        },
        ai: {
          order: 6,
          result: {
            player: 1,
            target: -1,
          }
        }
      },
      jlsg_baozheng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseJieshuBegin' },
        forced: true,
        priority: 10,
        filterTarget: function (card, player, target) {
          return target.countCards('he') > 0;
        },
        content: function () {
          'step 0'
          event.targets = game.filterPlayer(p => p != player && p.countCards('he'));
          event.targets.sortBySeat();
          'step 1'
          if (!event.targets.length) {
            event.finish();
            return;
          }
          event.target = event.targets.shift();
          if (event.target.countCards('he') == 1) {
            event.target.give(event.target.getCards('he'), player);
            event.redo();
            return;
          }
          var canDiscard = event.target.countDiscardableCards(event.target, 'he') >= 2;
          if (!canDiscard) {
            event.target.chooseCard('he', true, '暴征：将一张牌交给' + get.translation(player));
          } else {
            event.target.chooseCard('he', [1, 2], true, `暴征：将一张牌交给${get.translation(player)}<br>或者选择两张弃置，然后对其造成一点伤害`,
              function (card, player) {
                return ui.selected.cards.length
                  ? [card, ...ui.selected.cards].every(c => lib.filter.cardDiscardable(c, player))
                  : true
              },
              function (card, cards) {
                var evt = _status.event.getParent();
                if (!ui.selected.cards.length) return -get.value(card);
                if (get.attitude(evt.target, evt.player) < 0) return 7 - get.value(card) + get.value(ui.selected.cards[0]);
                else return -1;
              })
              .set('complexCard', true);
          }
          'step 2'
          if (result.bool) {
            if (result.cards.length == 1) {
              event.target.give(result.cards, player);
            } else {
              event.target.discard(result.cards);
              if (target.ai.shown < player.ai.shown) {
                target.addExpose(0.1);
              }
              player.damage(event.target);
            }
          }
          event.goto(1);
        },
        contentBackup: function () {
          "step 0"
          var targets = game.players.slice(0);
          targets.remove(player);
          targets.sort(lib.sort.seat);
          event.targets = targets;
          event.num = 0;
          "step 1"
          if (event.num < event.targets.length) {
            event.target = event.targets[event.num];
            if (event.target.countDiscardableCards(event.target, 'he') >= 2) {
              event.target.chooseCard('交给' + get.translation(player) + '一张牌，或弃置两张牌对其造成1点伤害', 'he').ai = function (card) {
                if (get.attitude(event.target, player) > 0) return 10 - get.value(card);
                return 0;
              }
            } else if (event.target.countCards('h') == 1) {
              event.target.chooseCard('交给' + get.translation(player) + '一张牌', 'he', true);
            } else {
              event.num++;
              event.redo();
            }

          } else {
            event.finish();
          }
          "step 2"
          if (result.bool) {
            player.gain(result.cards[0]);
            event.target.$give(1, player);
            event.num++;
            event.goto(1);
          } else if (event.target.countDiscardableCards(event.target, 'he') >= 2) {
            event.target.chooseToDiscard('弃置两张牌对' + get.translation(player) + '造成1点伤害', 2, 'he', true);
            event.target.line(player, 'fire');
            player.damage(event.target);
            event.num++;
            event.goto(1);
          }
        }
      },
      jlsg_lingnu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseEnd' },
        forced: true,
        priority: 9,
        filter: function (event, player) {
          return player.storage.jlsg_lingnu >= 2;
        },
        content: function () {
          "step 0"
          player.loseMaxHp();
          var targets = game.players.slice(0);
          targets.remove(player);
          targets.sort(lib.sort.seat);
          event.targets = targets;
          event.num = 0;
          "step 1"
          if (num < event.targets.length) {
            if (event.targets[num].num('hej')) {
              player.gainPlayerCard(event.targets[num], 'hej', true);
            }
            event.num++;
            event.redo();
          }
        },
        group: ['jlsg_lingnu_getStat', 'jlsg_lingnu_init'],
        subSkill: {
          getStat: {
            trigger: { player: 'damageEnd' },
            forced: true,
            popup: false,
            silent: true,
            content: function () {
              player.storage.jlsg_lingnu += trigger.num;
            }
          },
          init: {
            trigger: { player: 'phaseBegin' },
            forced: true,
            popup: false,
            silent: true,
            content: function () {
              player.storage.jlsg_lingnu = 0;
            }
          }
        }
      },
      jlsg_zhongyong: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        check: function (event, player) {
          return (!player.hasJudge('lebu') || !player.hasJudge('bingliang')) && (player.hp >= 2 || player.hasCard('tao', 'h')) &&
            game.hasPlayer(function (cur) {
              return get.attitude(player, cur) != 0;
            });
        },
        content: function () {
          player.loseHp();
          player.addTempSkill('jlsg_zhongyong_phaseDrawBegin', 'phaseAfter');
          player.addTempSkill('jlsg_zhongyong_distance', 'phaseAfter');
          player.addTempSkill('jlsg_zhongyong_giveCard', 'phaseAfter');
        },
        init: function (player) {
          player.storage.jlsg_zhongyong_discard = [];
        },
        subSkill: {
          phaseDrawBegin: {
            trigger: { player: 'phaseDrawBegin2' },
            forced: true,
            popup: false,
            filter: function (event, player) {
              return !event.numFixed;
            },
            content: function () {
              trigger.num += player.getDamagedHp();
            }
          },
          distance: {
            mod: {
              globalFrom: function (from, to, distance) {
                return -Infinity;
              }
            }
          },
          giveCard: {
            trigger: { player: 'phaseDiscardAfter' },
            filter: function (event, player) {
              return player.getHistory('lose', function (evt) {
                return evt.type == 'discard' && evt.getParent('phaseDiscard') == event && evt.cards.filterInD('d').length > 0;
              }).length != 0;
            },
            direct: true,
            content: function () {
              'step 0'
              event.cards = [];
              event.events = player.getHistory('lose', function (evt) {
                return evt.type == 'discard' && evt.getParent('phaseDiscard') == trigger && evt.cards.filterInD('d').length > 0;
              });
              event.events.forEach(evt => event.cards.addArray(evt.cards.filterInD('d')));
              player.chooseTarget('是否发动【忠勇】让一名角色获得你本阶段内的弃牌？', function (card, player, target) {
                return player != target;
              }).ai = function (target) {
                return get.attitude(player, target) > 0;
              }
              'step 1'
              if (result.bool) {
                player.logSkill('jlsg_zhongyong', result.targets[0]);
                result.targets[0].gain(event.cards, 'gain2');
              }
            }
          }
        }
      },
      jlsg_bozhan: {
        audio: "ext:极略/audio/skill:true",
        trigger: { player: 'shaMiss', target: 'shaMiss' },
        forced: true,
        content: function () {
          trigger.target.chooseToUse('是否对' + get.translation(trigger.player) + '使用一张【杀】？', { name: 'sha' }, -1, trigger.player);
        }
      },
      jlsg_qingxi: {
        shaRelated: true,
        audio: "ext:极略/audio/skill:true",
        trigger: { player: 'shaBegin' },
        forced: true,
        filter: function (event, player) {
          return player.countCards('e') < event.target.countCards('e');
        },
        content: function () {
          trigger.directHit = true;
        }
      },
      jlsg_danshou: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          target: "useCardToTargeted",
        },
        filter: function (event, player) {
          return event.card.name == 'sha' && player.canCompare(event.player);
        },
        forced: true,
        content: function () {
          'step 0'
          player.chooseToCompare(trigger.player);
          'step 1'
          if (result.bool) {
            player.draw(2);
            player.discardPlayerCard(trigger.player, true);
          } else {
            // trigger.directHit = true;
            trigger.getParent().directHit.add(player);
            // player.draw();
          }
        },
      },
      jlsg_yonglie: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'damageEnd' },
        filter: function (event, player) {
          return event.card && event.card.name == 'sha' && event.notLink() && event.player.inRangeOf(player) && event.source && event.source.isAlive();
        },
        check: function (event, player) {
          if (player.hp > 2) return get.attitude(player, event.source) < 0;
          return 0;
        },
        prompt: function (event, player) {
          var str = '';
          str += '是否对' + get.translation(event.source) + '发动【勇烈】'
          return str;
        },
        content: function () {
          player.loseHp();
          player.line(trigger.source);
          trigger.source.damage();
        },
      },
      jlsg_hengshi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseDiscardBegin' },
        frequent: true,
        filter: function (event, player) {
          return player.countCards('h');
        },
        check: () => true,
        content: function () {
          player.draw(player.countCards('h'));
        },
        ai: {
          effect: {
            player: function (card, player, target) {
              var hs = player.countCards('h');
              if (player.hasSkill('jlsg_zhijiao')) {
                if (game.hasPlayer(function (cur) {
                  return get.attitude(player, cur) > 3 && !cur.hasJudge('lebu') && cur != player;
                })) {
                  if (hs >= 5 && !['wuzhong', 'shunshou', 'wugu'].includes(card.name)) return 'zeroplayertarget';
                }
              }
            },
          }
        }
      },
      jlsg_zhijiao: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseJieshuBegin' },
        unique: true,
        limited: true,
        direct: true,
        init: function (player) {
          player.storage.jlsg_zhijiao = false;
          player.storage.jlsg_zhijiao2 = [];
        },
        filter: function (event, player) {
          return !player.storage.jlsg_zhijiao && player.storage.jlsg_zhijiao2.length;
        },
        mark: true,
        intro: {
          content: 'limited'
        },
        content: function () {
          'step 0'
          player.chooseTarget('是否发动【至交】？', function (card, player, target) {
            return player != target;
          }).ai = function (target) {
            var cardnum = player.storage.jlsg_zhijiao2.length;
            var att = get.attitude(player, target);
            if (att <= 0) return 0;
            var result = Math.max(9 - target.countCards('he'), 1);
            if (target.hasJudge('lebu')) result -= 2;
            result = Math.max(1, result);
            result += att;
            if (cardnum >= 5) return result;
            if (player.hp == 2 && cardnum >= 4) return result;
            if (player.hp == 1) return result;
            return 0;
          }
          'step 1'
          if (result.bool) {
            player.storage.jlsg_zhijiao = true;
            player.logSkill('jlsg_zhijiao', result.targets[0]);
            result.targets[0].gain(player.storage.jlsg_zhijiao2, 'gain2');
            player.awakenSkill('jlsg_zhijiao');
          }
          player.storage.jlsg_zhijiao2 = [];
        },
        group: ['jlsg_zhijiao2'],
        ai: {
          order: function (skill, player) {
            if (!player.hasSkill('jlsg_zhijiao')) {
              return;
            }
            if (player.hp < player.maxHp && player.countCards('h') > 1) {
              return 10;
            }
            return 4;
          },
          result: {
            target: function (player, target) {
              if (!player.hasSkill('jlsg_zhijiao')) {
                return;
              }
              if (target.hasSkillTag('nogain')) return 0;
              if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                if (target.hasSkillTag('nodu')) return 0;
                return -10;
              }
              if (target.hasJudge('lebu')) return 0;
              var nh = target.countCards('h');
              var np = player.countCards('h');
              if (player.hp == player.maxHp || player.storage.rerende < 0 || player.countCards('h') <= 1) {
                if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
              }
              return Math.max(1, 5 - nh);
            },
          },
          effect: {
            target: function (card, player, target) {
              if (!player.hasSkill('jlsg_zhijiao')) {
                return;
              }
              if (player == target && get.type(card) == 'equip') {
                if (target.countCards('e', { subtype: get.subtype(card) }) > 0) {
                  if (game.hasPlayer(function (current) {
                    return current != target && get.attitude(target, current) > 3;
                  })) {
                    return 0;
                  }
                }
              }
            },
          },
          threaten: 0.8,
        },
      },
      jlsg_zhijiao2: {
        trigger: { player: 'discardAfter' },
        forced: true,
        popup: false,
        priority: -1,
        filter: function (event, player) {
          if (player.storage.jlsg_zhijiao) return false;
          if (_status.currentPhase != player) return false;
          for (var i = 0; i < event.cards.length; i++) {
            if (get.position(event.cards[i]) == 'd') {
              return true;
            }
          }
          return false;
        },
        content: function () {
          for (var i = 0; i < trigger.cards.length; i++) {
            if (get.position(trigger.cards[i]) == 'd') {
              player.storage.jlsg_zhijiao2 = player.storage.jlsg_zhijiao2.concat(trigger.cards[i]);
            }
          }
          player.syncStorage('jlsg_zhijiao2');
          player.markSkill('jlsg_zhijiao2');
        },
        intro: {
          content: 'cards'
        }
      },
      jlsg_jiwux: {
        audio: "ext:极略/audio/skill:3",
        trigger: { player: 'phaseUseBegin' },
        shaRelated: true,
        filter: function (event, player) {
          return player.countCards('h', 'sha') > 0;
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseCard(get.prompt('jlsg_jiwux'), function (card, player, target) {
            return card.name == 'sha' && !(card.isJiwu && card.isJiwu[1] && card.isJiwu[2] && card.isJiwu[3]);
          }).ai = function (card) {
            var value = 0;
            if (card.nature) {
              if (card.nature == 'fire') value += 0.004;
              if (card.nature == 'thunder') value += 0.003;
            }
            switch (get.suit(card)) {
              case 'heart':
                value += 0.004;
                break;
              case 'diamond':
                value += 0.003;
                break;
              case 'spade':
                value += 0.002;
                break;
              case 'club':
                value += 0.001;
                break;
              default:
                break;
            }
            value = value + card.number / 1000;
            return value;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_jiwux');
            event.card = result.cards[0];
            player.showCards(event.card);
            let paint = function (card, paintType, toggle = true) {
              if (!document.body.contains(card.parentElement)) {
                return;
              }
              var target = card.querySelector(`#Jiwu${paintType}`);
              if (target) {
                if (!toggle) {
                  card.removeChild(target);
                }
                return;
              }
              let div = document.createElement("div");
              card.appendChild(div);
              div.style.minWidth = "33%";
              div.style.top = "4px";
              div.style.height = "4px";
              // div.style.opacity = "0.5";
              switch (paintType) {
                case 1:
                  div.setAttribute("id", "Jiwu1");
                  div.style.left = "0%";
                  div.style.backgroundColor = "rgba(255,0,0,0.6)";
                  break;
                case 2:
                  div.setAttribute("id", "Jiwu2");
                  div.style.left = "33%";
                  div.style.backgroundColor = "rgba(0,255,0,0.6)";
                  break;
                case 3:
                  div.setAttribute("id", "Jiwu3");
                  div.style.left = "67%";
                  div.style.backgroundColor = "rgba(0,0,255,0.6)";
                  break;
                default:
                  break;
              }
            };
            if (!event.card.isJiwu) event.card.isJiwu = {
              // _paint(paintType, toggle) {
              //   paint(event.card, paintType, toggle);
              // },
              _card: event.card,
              get 1() { return this._1; },
              get 2() { return this._2; },
              get 3() { return this._3; },
              set 1(value) {
                if (value == this._1) return;
                this._1 = !!value;
                game.broadcastAll(paint, this._card, 1, !!value);
              },
              set 2(value) {
                if (value == this._2) return;
                this._2 = !!value;
                game.broadcastAll(paint, this._card, 2, !!value);
              },
              set 3(value) {
                if (value == this._3) return;
                this._3 = !!value;
                game.broadcastAll(paint, this._card, 3, !!value);
              },
              _1: false,
              _2: false,
              _3: false,
            };
            event._options = ['此【杀】不计入次数限制',
              '此【杀】无距离限制,且可以额外指定1个目标',
              '此【杀】的伤害值+1'
            ];
            const options = [1, 2, 3].filter(key => !event.card.isJiwu[key])
              .map(key => event._options[key - 1]);
            player.chooseControl(options, 'dialogcontrol', function () {
              return Math.floor(Math.random() * options.length);
            })//.set('prompt', prompt);
          } else {
            event.finish();
          }
          'step 2'

          if (result.control == event._options[0]) {
            event.card.isJiwu[1] = true;
            game.log(player, '所展示的', event.card, '不计入次数限制');
            // game.broadcastAll(paint, event.card, 0, true);
          } else if (result.control == event._options[1]) {
            event.card.isJiwu[2] = true;
            game.log(player, '所展示的', event.card, '无距离限制，且可以额外指定1个目标');
            // game.broadcastAll(paint, event.card, 1, true);
          } else if (result.control == event._options[2]) {
            event.card.isJiwu[3] = true;
            game.log(player, '所展示的', event.card, '伤害值+1');
            // game.broadcastAll(paint, event.card, 2, true);
          }
        },
        group: ['jlsg_jiwux_one', 'jlsg_jiwux_two', 'jlsg_jiwux_three', 'jlsg_jiwux_clear'],
        subSkill: {
          one: {
            mod: {
              cardUsable: function (card, player) {
                var criterion = card.name == "sha" && (card.isJiwu && card.isJiwu[1] ||
                  card.cards && card.cards.length == 2 && card.cards[0].isJiwu && card.cards[0].isJiwu[1]);
                if (criterion) {
                  return Infinity;
                }
              }
            },
            trigger: { player: 'useCard' },
            filter: function (event, player) {
              // return event.card && event.card.isJiwu && event.card.isJiwu[1];
              if (!event.card) return false;
              return event.card.name == "sha" && (event.card.isJiwu && event.card.isJiwu[1] ||
                event.card.cards && event.card.cards.length == 1 && event.card.cards[0].isJiwu && event.card.cards[0].isJiwu[1]);
            },
            forced: true,
            content: function () {
              if (player.stat[player.stat.length - 1].card.sha > 0) {
                player.stat[player.stat.length - 1].card.sha--;
              }
            }
          },
          two: {
            mod: {
              targetInRange: function (card, player) {
                var criterion = card.name == "sha" && (card.isJiwu && card.isJiwu[2] ||
                  card.cards && card.cards.length == 1 && card.cards[0].isJiwu && card.cards[0].isJiwu[2]);
                if (criterion) return true;
              },
              selectTarget: function (card, player, range) {
                var criterion = card.name == "sha" && (card.isJiwu && card.isJiwu[2] ||
                  card.cards && card.cards.length == 1 && card.cards[0].isJiwu && card.cards[0].isJiwu[2]);
                if (criterion && range[1] != -1) range[1]++;
              }
            }
          },
          three: {
            trigger: { source: 'damageBegin' },
            forced: true,
            filter: function (event, player) {
              if (!event.card) return false;
              var criterion = event.card.name == "sha" && (event.card.isJiwu && event.card.isJiwu[3] ||
                event.card.cards && event.card.cards.length == 1 && event.card.cards[0].isJiwu && event.card.cards[0].isJiwu[3]);
              return criterion && event.notLink();
            },
            content: function () {
              trigger.num++;
            }
          },
          clear: {
            // FIXME: missing clear logic
            trigger: { player: ['useCardAfter', 'discardAfter'] },
            silent: true,
            filter: function (event, player) {
              var cards = event.cards;
              if (!cards) cards = event.card && event.card.cards;
              return cards;// && cards.length == 1 && cards[0].isJiwu;
            },
            forced: true,
            popup: false,
            content: function () {
              if (trigger.card) {
                if (trigger.card.isJiwu) {
                  trigger.card.isJiwu._card = trigger.card;
                  trigger.card.isJiwu[1] = false;
                  trigger.card.isJiwu[2] = false;
                  trigger.card.isJiwu[3] = false;
                  delete trigger.card.isJiwu;
                }
                if (trigger.card.cards) {
                  for (var card of trigger.card.cards) {
                    if (card.isJiwu) {
                      card.isJiwu._card = card;
                      card.isJiwu[1] = false;
                      card.isJiwu[2] = false;
                      card.isJiwu[3] = false;
                      delete card.isJiwu;
                    }
                  }
                }
              } else if (trigger.cards) {
                for (var card of trigger.cards) {
                  if (card.isJiwu) {
                    card.isJiwu._card = card;
                    card.isJiwu[1] = false;
                    card.isJiwu[2] = false;
                    card.isJiwu[3] = false;
                    delete card.isJiwu;
                  }
                }
              }
            }
          }
        },
        // ai:{
        // effect:{
        // player:function(card,player,target){

        // }
        // }
        // }
      },
      jlsg_daoshi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseJieshuBegin' },
        filter: function (event, player) {
          return event.player.countCards('e') > 0 && (player == event.player || player.hasSkill("jlsg_daoshi"));
        },
        direct: true,
        content: function () {
          'step 0'
          var prompt = (trigger.player == player) ? "是否发动【刀侍】摸一张牌?" :
            `###是否对${get.translation(event.target)}发动【刀侍】？###摸一张牌并将装备区的一张牌交给${get.translation(player)}`;
          trigger.player.chooseBool(prompt).ai = function () {
            if (trigger.player == player) return true;
            if (get.attitude(trigger.player, player) > 0 && player.countCards('e') < 2)
              return 1;
            return 0;
          }
          'step 1'
          if (result.bool) {
            trigger.player.logSkill('jlsg_daoshi', player);
            trigger.player.draw();
            if (trigger.player != player) {
              trigger.player.chooseCardButton('选择一张牌交给' + get.translation(player), trigger.player.get('e'), true);
            } else {
              event.finish();
            }
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            player.gain(result.links[0], trigger.player, 'giveAuto');
          }
        }
      },
      jlsg_lirang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseZhunbeiEnd' },
        filter: function (event, player) {
          if (event.player != player && !player.hasSkill('jlsg_lirang')) return false;
          if (game.online) {
            return player.getExpansions('jlsg_lirang').length < 4 && event.player.countCards('h');
          }
          var liSuits = player.getExpansions('jlsg_lirang').map(c => get.suit(c));
          return event.player.countCards('h', c => !liSuits.includes(get.suit(c)));
        },
        direct: true,
        content: function () {
          'step 0'
          var liSuits = player.getExpansions('jlsg_lirang').map(c => get.suit(c));
          var next = trigger.player.chooseCard(get.prompt('jlsg_lirang', player, trigger.player));
          next.filterCard = function (card) {
            return !liSuits.includes(get.suit(card));
          }
          next.ai = function (card) {
            if (get.attitude(trigger.player, player) > 0) {
              if (jlsg.needKongcheng(trigger.player)) return 20 - get.value(card);
              return 7 - get.value(card);
            }
            if (get.attitude(trigger.player, player) <= 0) {
              return card.name == 'du';
            }
            return false;
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_lirang', trigger.player);
            player.addToExpansion(result.cards, trigger.player, 'give').gaintag.add(event.name);
            trigger.player.draw();
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
        group: ['jlsg_lirang2'],
        ai: {
          threaten: 3,
        }
      },
      jlsg_lirang2: {
        enable: 'chooseToUse',
        filter: function (event, player) {
          return player.getExpansions('jlsg_lirang').length >= 2 && event.filterCard({ name: 'tao' }, player, event);
        },
        chooseButton: {
          dialog: function (event, player) {
            return ui.create.dialog('礼让', player.getExpansions('jlsg_lirang'), 'hidden');
          },
          select: 2,
          backup: function (links, player) {
            return {
              audio: "jlsg_lirang",
              filterCard: function () { return false },
              selectCard: -1,
              viewAs: { name: 'tao', cards: links },
              cards: links,
              onuse: function (result, player) {
                result.cards = lib.skill[result.skill].cards;
                // player.getExpansions('jlsg_lirang').remove(result.cards);
                // player.syncStorage('jlsg_lirang');
                // player.markAuto('jlsg_lirang2')
                // player.logSkill('jlsg_lirang2',result.targets);
              }
            }
          },
        },
        ai: {
          // order:10,
          order: function () {
            var od = get.order({ name: 'tao' }) + 0.2;
            // if (event.filterCard({name:'jiu'},_status.event.player,_status.event)) {
            //   od =Math.max(od, get.order({name:'jiu'})+0.2);
            // }
            return od;
          },
          save: true,
          result: {
            player: function (player) {
              if (_status.event.dying) return get.attitude(player, _status.event.dying);
              return 0;
            },
          }
        }
      },
      jlsg_xianshi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageBegin3' },
        filter: function (event, player) {
          return (event.source != undefined);
        },
        frequent: true,
        content: function () {
          'step 0'
          trigger.source.chooseToDiscard('弃置一张牌并展示所有手牌，或令此伤害-1').ai = function (card) {
            if (get.attitude(trigger.source, player) < 0) {
              if (trigger.source.needsToDiscard()) return 7 - get.value(card);
              return 6 - get.value(card);
            }
            return false;
          }
          'step 1'
          if (result.bool) {
            trigger.source.showHandcards();
          } else {
            trigger.num--;
          }
        },
        ai: {
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'damage')) {
                var bs = player.get('h');
                if (bs.length == 0) return 0;
                if ((player.hasSkill('jiu') || player.hasSkill('tianxianjiu')) && card.name == 'sha') return;
                if (player.countCards('h') <= 1) return 0;
                var n = 0.5;
                if (player.getCards('h', function (cardx) {
                  var value = 0;
                  var aii = get.info(cardx).ai;
                  if (aii && aii.value) value = aii.value;
                  else if (aii && aii.basic) value = aii.basic.value;
                  return value < 6;
                }) || player.needsToDiscard()) n = 0;
                return [1, n];
              }
            }
          }
        }
      },
      jlsg_chengxiang: {
        audio: "ext:极略/audio/skill:2",
        inherit: 'chengxiang',
        content: function () {
          "step 0"
          event.cards = get.cards(4);
          game.cardsGotoOrdering(event.cards);
          event.videoId = lib.status.videoId++;
          game.broadcastAll(function (player, id, cards, num) {
            var str;
            if (player == game.me && !_status.auto) {
              str = '称象：选择任意张点数不大于13的牌';
            }
            else {
              str = '称象';
            }
            var dialog = ui.create.dialog(str, cards);
            dialog.videoId = id;
          }, player, event.videoId, event.cards, 13);
          event.time = get.utc();
          game.addVideo('showCards', player, ['称象', get.cardsInfo(event.cards)]);
          game.addVideo('delay', null, 2);
          "step 1"
          var next = player.chooseButton([0, 4]);
          next.set('dialog', event.videoId);
          next.set('filterButton', function (button) {
            var num = 0
            for (var i = 0; i < ui.selected.buttons.length; i++) {
              num += get.number(ui.selected.buttons[i].link);
            }
            return (num + get.number(button.link) <= _status.event.maxNum);
          });
          next.set('maxNum', 13);
          next.set('ai', function (button) {
            return get.value(button.link, _status.event.player);
          });
          "step 2"
          if (result.bool && result.links) {
            //player.logSkill('chengxiang');
            var cards2 = [];
            for (var i = 0; i < result.links.length; i++) {
              cards2.push(result.links[i]);
              cards.remove(result.links[i]);
            }
            event.cards2 = cards2;
          }
          else {
            event.finish();
          }
          var time = 1000 - (get.utc() - event.time);
          if (time > 0) {
            game.delay(0, time);
          }
          "step 3"
          game.broadcastAll('closeDialog', event.videoId);
          var cards2 = event.cards2;
          player.gain(cards2, 'log', 'gain2');
        },
      },
      jlsg_renxin: {
        audio: "ext:极略/audio/skill:2",
        inherit: 'oldrenxin',
        // ai: {
        //   expose: 0.5
        // }
      },
      jlsg_midao: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return target.countCards('h') > player.countCards('h') && player != target;
        },
        filter: function (event, player) {
          for (var i = 0; i < game.players.length; i++)
            if (game.players[i].num('h') > player.countCards('h')) return true;
          return false;
        },
        selectTarget: -1,
        multitarget: true,
        multiline: true,
        content: function () {
          'step 0'
          if (targets.length) {
            event.target = targets.shift();
          } else {
            var maxh = true;
            for (var i = 0; i < game.players.length; i++) {
              if (game.players[i].num('h') > player.countCards('h')) {
                maxh = false;
              }
            }
            if (maxh) {
              player.loseHp();
            }
            event.finish();
          }
          'step 1'
          if (event.target.countCards('h')) {
            event.target.chooseCard('选择一张手牌交给' + get.translation(player), true).ai = function (card) {
              return -get.value(card);
            }
          } else {
            event.goto(0);
          }
          'step 2'
          if (result.bool) {
            player.gain(result.cards[0]);
            target.$give(1, player);
          }
          event.goto(0);
        },
        ai: {
          order: 2,
          result: {
            player: function (player) {
              var cangain = 0;
              for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].num('h') > player.countCards('h')) cangain++;
              }
              var maxh = true;
              for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].num('h') - 1 > player.countCards('h') + cangain) {
                  maxh = false;
                }
              }
              if (maxh && cangain > 1 && player.hp > 2) return 1;
              if (maxh && player.hp == 2) return -2;
              if (maxh && player.hp == 1 && !player.countCards('h', 'tao')) return -10;
              if (maxh && cangain <= 1) return -1;
              if (!maxh) return cangain;
              return 0;
            },
            target: -1,
          }
        }
      },
      jlsg_yishe: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
          return target.countCards('h') <= player.countCards('h') && player != target;
        },
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        content: function () {
          player.swapHandcards(target);
        },
        ai: {
          order: 1,
          result: {
            player: function (player, target) {
              return target.countCards('h') - player.countCards('h');
            },
            target: function (player, target) {
              return player.countCards('h') - target.countCards('h');
            },
          }
        }
      },
      jlsg_pudu: {
        audio: "ext:极略/audio/skill:1",
        unique: true,
        limited: true,
        enable: 'phaseUse',
        skillAnimation: true,
        animationStr: '普渡',
        animationColor: 'water',
        filterTarget: function (card, player, target) {
          return player != target;
        },
        multitarget: true,
        multiline: true,
        selectTarget: -1,
        content: function () {
          'step 0'
          player.awakenSkill(event.name);
          event.current = player.next;
          event.targets = targets.slice();
          'step 1'
          var target = event.targets.shift();
          if (!target.countCards('h')) {
            event.redo();
            return;
          }
          player.gain(target, target.getCards('h'), 'bySelf');
          target.$give(target.num('h'), player);
          game.delayx(0.3);
          if (event.targets.length) {
            event.redo();
          }
          'step 2'
          var maxh = true;
          if (!player.countCards('h') || !player.isMaxHandcard()) {
            event.finish();
            return;
          }
          player.chooseCard('选择一张手牌交给' + get.translation(event.current), true).ai = function (card) {
            if (get.attitude(player, event.current) > 0)
              return get.value(card);
            return -get.value(card);
          }
          'step 3'
          if (result.bool) {
            // event.current.gain(result.cards[0]);
            player.$give(1, event.current);
            event.current.gain(player, result.cards[0], 'bySelf', false);
            game.delayx(0.3);
            for (var next = event.current.next; next != event.current; next = next.next) {
              if (next == player || next.isOut()) {
                continue;
              }
              event.current = next;
              break;
            }
            event.goto(2);
          }

        },
        ai: {
          order: 4.5,
          result: {
            player: function (player, target) {
              var num = 0;
              var list = [];
              var listnum = 0;
              for (var i = 0; i < game.players.length - 1; i++) {
                list.push('0');
              }
              for (var i = 0; i < game.players.length; i++) {
                num += game.players[i].num('h');
              }
              var max = function () {
                for (var i = 0; i < list.length; i++) {
                  if (list[i] > num) return true;
                }
                return false;
              }
              while (!max()) {
                num--;
                list[listnum % (game.players.length - 1)]++;
                listnum++;
              }
              return num - player.countCards('h');
            },
            target: function (player, target) {
              var num = 0;
              var list = [];
              var listnum = 0;
              for (var i = 0; i < game.players.length - 1; i++) {
                list.push('0');
              }
              for (var i = 0; i < game.players.length; i++) {
                num += game.players[i].num('h');
              }
              var max = function () {
                for (var i = 0; i < list.length; i++) {
                  if (list[i] > num) return true;
                }
                return false;
              }
              while (!max()) {
                num--;
                list[listnum % (game.players.length - 1)]++;
                listnum++;
              }
              for (var i = 0; i < game.players.length; i++) {
                if (target == game.players[i]) var nu = i;
              }
              return list[nu - 1] - target.countCards('h');
            }
          }
        }
      },
      jlsg_zongqing: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseDrawBegin' },
        check: function (event, player) {
          if (player.isDamaged() && player.countCards('h', { color: 'red' })) return 2;
          if (player.countCards('h', 'sha') && !player.countCards('h', 'jiu')) return 1;
          return 0;
        },
        content: function () {
          'step 0'
          player.judge(function (card) {
            if (get.color(card) == 'red' && player.isDamaged()) return 2;
            if (get.color(card) == 'red') return 1;
            if (get.color(card) == 'black' && player.countCards('h', 'sha')) return 1;
            return 0;
          });
          'step 1'
          player.storage.jlsg_zongqing = result.card;
          player.addSkill('jlsg_zongqing_show');
        },
        subSkill: {
          show: {
            audio: false,
            trigger: { player: 'phaseDrawEnd' },
            forced: true,
            popup: false,
            filter: function (event) {
              // return event.parent.parent.name == 'phaseDraw';
              return event.cards && event.cards.length;
            },
            content: function () {
              'step 0'
              event.card = player.storage.jlsg_zongqing;
              // player.showCards(event.card);
              player.showCards(trigger.cards);
              'step 1'
              var cards = [];
              if (get.color(event.card) == 'red') {
                for (var i = 0; i < trigger.cards.length; i++) {
                  if (get.color(trigger.cards[i]) == 'black') {
                    cards.push(trigger.cards[i]);
                  }
                }
                if (cards.length) {
                  if (cards.length == 2) {
                    event.cards = cards;
                    player.chooseToDiscard('纵情:选择一张牌弃置', function (card) {
                      return _status.event.getParent().cards.includes(card);
                    }, true).ai = get.disvalue;
                  } else {
                    player.discard(cards);
                  }
                  player.useCard({ name: 'jiu' }, player);
                }
              } else { // card color == black
                for (var i = 0; i < trigger.cards.length; i++) {
                  if (get.color(trigger.cards[i]) == 'red') {
                    cards.push(trigger.cards[i]);
                  }
                }
                if (cards.length) {
                  if (cards.length == 2) {
                    event.cards = cards;
                    player.chooseToDiscard('纵情:选择一张牌弃置', function (card) {
                      return _status.event.getParent().cards.includes(card);
                    }, true).ai = get.disvalue;
                  } else {
                    player.discard(cards);
                  }
                  if (player.isDamaged()) {
                    player.useCard({ name: 'tao' }, player);
                  }
                }
              }
              'step 2'
              player.removeSkill('jlsg_zongqing_show');
            }
          }
        }
      },
      jlsg_bugua: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'judgeBefore' },
        content: function () {
          'step 0'
          player.showCards(ui.cardPile.firstChild, '牌堆顶的牌');
          event.chosed = false;
          'step 1'
          player.chooseCard('是否将一张手牌置于牌堆顶？').set('ai', function (card) {
            var trigger = _status.event.getTrigger();
            var player = _status.event.player;
            var judging = ui.cardPile.firstChild;
            var result = trigger.judge(card) - trigger.judge(judging);
            var attitude = get.attitude(player, trigger.player);
            if (attitude == 0 || result == 0) return 0;
            if (attitude > 0) {
              return result - get.value(card) / 2;
            } else {
              return -result - get.value(card) / 2;
            }
          });
          event.current = player;
          'step 2'
          if (result && result.cards) {
            event.card = result.cards[0];
            event.card = result.cards[0];
            event.current.showCards(event.card, '置于牌堆顶');
            event.current.lose(event.card, ui.cardPile, 'insert', 'visible');
            event.current.$throw(1, 1000);
            game.log(event.current, '将', event.card, '置于牌堆顶');
          } else {
            if (trigger.player == player) {
              event.finish();
            } else if (event.chosed) {
              event.finish();
            } else {
              trigger.player.chooseCard('将一张手牌置于牌堆顶？').set('ai', function (card) {
                var trigger = _status.event.getTrigger();
                var player = trigger.player;
                var judging = ui.cardPile.firstChild;
                var result = trigger.judge(card) - trigger.judge(judging);
                var attitude = get.attitude(player, trigger.player);
                if (attitude == 0 || result == 0) return 0;
                if (attitude > 0) {
                  return result - get.value(card) / 2;
                } else {
                  return -result - get.value(card) / 2;
                }
                return -get.value(card);
              });
              event.chosed = true;
              event.current = trigger.player;
              event.goto(2);
            }
          }
        },
        ai: {
          tag: {
            rejudge: 1,
          },
        },
        group: ['jlsg_bugua2', 'jlsg_bugua3'],
      },
      jlsg_bugua2: {
        audio: "ext:极略/audio/skill:true",
        trigger: { global: 'judgeAfter' },
        filter: function (event, player) {
          return (get.color(event.result.card) == 'red');
        },
        check: function (event, player) {
          return get.attitude(player, event.player) > 0;
        },
        prompt: function (event, player) {
          var str = '';
          str += '是否对' + get.translation(event.player) + '发动【卜卦】令其摸一张牌';
          return str;
        },
        content: function () {
          trigger.player.draw(true);
        }
      },
      jlsg_bugua3: {
        audio: "ext:极略/audio/skill:true",
        trigger: { global: 'judgeAfter' },
        filter: function (event, player) {
          return (get.color(event.result.card) == 'black') && event.player.countCards('he');
        },
        check: function (event, player) {
          return get.attitude(player, event.player) < 0;
        },
        prompt: function (event, player) {
          var str = '';
          str += '是否对' + get.translation(event.player) + '发动【卜卦】令其弃一张牌';
          return str;
        },
        content: function () {
          trigger.player.chooseToDiscard('he', 1, true);
        }
      },
      jlsg_zhaoxin: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageEnd' },
        filter: function (event, player) {
          if (game.online) {
            return true;
          }
          var suits = ['heart', 'club', 'spade', 'diamond'];
          var cards = player.get('h');
          for (var i = 0; i < cards.length; i++) {
            if (suits.includes(get.suit(cards[i])))
              suits.remove(get.suit(cards[i]));
          }
          return suits.length > 0;
        },
        check: function (event, player) {
          return true;
        },
        // frequent: true,
        content: function () {
          player.showHandcards();
          var suits = ['heart', 'club', 'spade', 'diamond'];
          event.cards = player.get('h');
          for (var i = 0; i < event.cards.length; i++) {
            if (suits.includes(get.suit(event.cards[i])))
              suits.remove(get.suit(event.cards[i]));
          }
          if (suits.length)
            player.draw(suits.length);
        }
      },
      jlsg_zhihe: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countCards('h') > 0;
        },
        filterCard: function (card, target, player) {
          for (var i = 0; i < ui.selected.cards.length; i++) {
            if (get.suit(card) == get.suit(ui.selected.cards[i])) return false;
          }
          return true;
        },
        check: function (card) {
          return 10 - get.value(card);
        },
        discard: false,
        lose: false,
        prompt: '请选择你想要保留的卡牌',
        selectCard: function () {
          var cards = _status.event.player.get('h');
          var suits = [];
          for (var i = 0; i < cards.length; i++) {
            if (!suits.includes(get.suit(cards[i])))
              suits.push(get.suit(cards[i]));
          }
          return suits.length;
        },
        content: function () {
          'step 0'
          player.showHandcards();
          var he = [];
          var hs = player.get('h');
          he = he.concat(hs);
          for (var i = 0; i < cards.length; i++) {
            he.remove(cards[i]);
          }
          player.discard(he);
          'step 1'
          player.draw(player.countCards('h'));

        },
        ai: {
          order: 2,
          result: {
            player: function (player) {
              var cards = player.get('h');
              var suits = [];
              for (var i = 0; i < cards.length; i++) {
                if (!suits.includes(get.suit(cards[i])))
                  suits.push(get.suit(cards[i]));
              }
              var canget = (suits.length * 2 - player.countCards('h'));
              return canget + 0.1;
            }
          }
        }
      },
      jlsg_caijie: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'phaseZhunbeiBegin' },
        check: function (event, player) {
          var cards = player.get('h');
          for (var i = 0; i < cards.length; i++) {
            if (cards[i].number > 11 && get.value(cards[i]) < 7) {
              return get.attitude(player, event.player) < 0;
            }
          }
          if (player.countCards('h', 'shan') && get.attitude(player, event.player) < 0 && player.countCards('h') > 2) return 1;
          return 0;
        },
        filter: function (event, player) {
          return event.player != player && event.player.countCards('h') >= player.countCards('h') && player.countCards('h') > 0;
        },
        prompt: function (event, player) {
          var str = '';
          str += '是否对' + get.translation(event.player) + '发动【才捷】？';
          return str;
        },
        content: function () {
          'step 0'
          player.chooseToCompare(trigger.player);
          'step 1'
          if (result.bool) {
            player.draw(2);
          } else {
            trigger.player.useCard({ name: 'sha' }, player, false);
          }
        },
        ai: {
          expose: 0.2
        }
      },
      jlsg_jilei: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'damageEnd' },
        check: function (event, player) {
          return get.attitude(player, event.source) < 0;
        },
        filter: function (event, player) {
          return event.source && event.source.countCards('h') > 0;
        },
        content: function () {
          'step 0'
          trigger.source.showHandcards();
          var cards = [
            trigger.source.getCards('h', { type: 'basic' }),
            trigger.source.getCards('h', { type: ['trick', 'delay'] }),
            trigger.source.getCards('h', { type: 'equip' }),
          ];
          var maxNum = cards.reduce((a, b) => a.length > b.length ? a : b).length;
          if (cards.filter(cs => cs.length == maxNum).length == 1) {
            trigger.source.discard(cards.filter(cs => cs.length == maxNum)[0]);
            event.finish();
            return;
          }
          var choices = [], choice, v = Infinity, tempv;
          if (cards[0].length == maxNum) {
            choices.push('基本牌');
            choice = '基本牌';
            v = cards[0].reduce((a, b) => a + get.value(b, trigger.source), 0);
          }
          if (cards[1].length == maxNum) {
            choices.push('锦囊牌');
            tempv = cards[1].reduce((a, b) => a + get.value(b, trigger.source), 0);
            if (tempv < v) {
              choice = '锦囊牌';
              v = tempv;
            }
          }
          if (cards[2].length == maxNum) {
            choices.push('装备牌');
            tempv = cards[2].reduce((a, b) => a + get.value(b, trigger.source), 0);
            if (tempv < v) {
              choice = '装备牌';
              v = tempv;
            }
          }
          player.chooseControl(choices).set('prompt', '弃置一种类型的手牌').set('choice', choice).set('ai', function () {
            return _status.event.choice;
          });
          'step 1'
          switch (result.control) {
            case '基本牌':
              trigger.source.discard(trigger.source.getCards('h', { type: 'basic' }));
              break;
            case '锦囊牌':
              trigger.source.discard(trigger.source.getCards('h', { type: ['trick', 'delay'] }));

              break;
            case '装备牌':
              trigger.source.discard(trigger.source.getCards('h', { type: 'equip' }));
              break;
          }
        },
      },
      jlsg_yanliang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return player.countDiscardableCards(player, 'he');
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseToDiscard('是否对' + get.translation(trigger.player) + '发动【延粮】?', 'he').ai = function (card) {
            if (get.attitude(player, trigger.player) > 0 && trigger.player.countCards('j', 'lebu')) return 8 - get.value(card) && get.color(card) == 'black';
            if (get.attitude(player, trigger.player) < 0) return 4 - get.value(card);
            return 0;
          };
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_yanliang', trigger.player);
            if (get.color(result.cards[0]) == 'red') {
              trigger.player.addTempSkill('jlsg_yanliang_adjust');
              trigger.player.addTempSkill('jlsg_yanliang_red');
            } else {
              trigger.player.addTempSkill('jlsg_yanliang_adjust');
              trigger.player.addTempSkill('jlsg_yanliang_black');
            }
          }
        },
        subSkill: {
          adjust: {
            trigger: { player: 'phaseDrawBefore' },
            priority: 100,
            forced: true,
            popup: false,
            content: function () {
              trigger.cancel();
              player.removeSkill('jlsg_yanliang_adjust');
            }
          },
          red: {
            trigger: { player: 'phaseUseAfter' },
            forced: true,
            popup: false,
            mark: true,
            intro: {
              marktext: '延',
              content: '摸牌阶段在出牌阶段后进行'
            },
            content: function () {
              player.phaseDraw();
              player.removeSkill('jlsg_yanliang_red');
            }
          },
          black: {
            trigger: { player: 'phaseDiscardAfter' },
            forced: true,
            popup: false,
            mark: true,
            intro: {
              marktext: '延',
              content: '摸牌阶段在弃牌阶段后进行'
            },
            content: function () {
              player.phaseDraw();
              player.removeSkill('jlsg_yanliang_black');
            }
          }
        }
      },
      jlsg_duzhi: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'recoverEnd' },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget('是否发动【毒治】？', function (card, target, player) {
            return player != target;
          }).ai = function (target) {
            return -get.attitude(player, target);
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_duzhi', result.targets);
            for (var i = 0; i < result.targets.length; i++) {
              result.targets[i].loseHp(trigger.num);
              result.targets[i].chooseToUse({ name: 'sha' }, player);
            }
          }
        },
        ai: {
          expose: 0.2
        },
        group: 'jlsg_duzhi2'
      },
      jlsg_duzhi2: {
        direct: true,
        trigger: { source: 'damageEnd' },
        filter: function (event, player) {
          return event.card && event.card.name == 'sha' && get.color(event.card) == 'red' && event.num > 0 && event.notLink();
        },
        content: function () {
          'step 0'
          player.chooseTarget('是否发动【毒治】？', [1, trigger.num], function (card, target, player) {
            return player != target;
          }).ai = function (target) {
            return -get.attitude(player, target);
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_duzhi', result.targets);
            for (var i = 0; i < result.targets.length; i++) {
              result.targets[i].loseHp();
              result.targets[i].chooseToUse({ name: 'sha' }, player);
            }
          }
        },
        ai: {
          expose: 0.2
        },
      },
      jlsg_lieyi: {
        mod: {
          cardname: function (card, player, name) {
            if (card.name == 'tao') return 'sha';
            if (card.name == 'shan') return 'jiu';
          },
        },
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: "useCard",
        },
        forced: true,
        filter: function (event, player) {
          return event.card.name == 'sha' && event.cards && event.cards.length == 1 && event.cards[0].name == 'tao'
            || event.card.name == 'jiu' && event.cards && event.cards.length == 1 && event.cards[0].name == 'shan';
        },
        content: function () {
        },
      },
      jlsg_baoli: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        enable: 'phaseUse',
        filterTarget: function (card, player, target) {
          if (player == target) return false;
          return !target.countCards('e') || target.countCards('j');
        },
        content: function () {
          target.damage(player);
        },
        ai: {
          order: 4,
          result: {
            target: -1,
          }
        }
      },
      jlsg_huanbing: {
        audio: "ext:极略/audio/skill:2",
        trigger: { target: 'shaBefore' },
        // filter: function (event, player) {
        //   if (get.itemtype(event.card) != 'card') return false;
        //   return event.card && event.card.name == 'sha';
        // },
        forced: true,
        content: function () {
          'step 0'
          trigger.cancel();
          player.addToExpansion(trigger.cards, 'gain2').gaintag.add(event.name);
        },
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (card.name == 'sha') return 0.6;
            }
          }
        },
        group: 'jlsg_huanbing2'
      },
      jlsg_huanbing2: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return player.getExpansions('jlsg_huanbing').length;
        },
        forced: true,
        content: function () {
          'step 0'
          if (player.getExpansions('jlsg_huanbing').length) {
            event.card = player.getExpansions('jlsg_huanbing')[0];
            player.$phaseJudge(event.card);
            player.lose(event.card, ui.ordering).relatedEvent = event;
            player.judge(function (card) {
              if (get.color(card) == 'red') return 1;
              return -0.5;
            });
          }
          else {
            event.finish();
          }
          'step 1'
          if (result.bool) {
            player.draw();
          }
          else {
            player.loseHp();
            player.gain(event.card, 'gain2');
          }
          event.goto(0);
        }
      },
      jlsg_hongyuan: {
        audio: "ext:极略/audio/skill:1",
        usable: 1,
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countDiscardableCards(player, 'h') && player.isDamaged() && player.canMoveCard();
        },
        filterCard: true,
        selectCard: function () {
          return [1, _status.event.player.getDamagedHp()];
        },
        check: function (card) {
          return 6 - ai.get.value(card);
        },
        filterTarget: function (card, player, target) {
          return target.canMoveCard();
        },
        content: function () {
          'step 0'
          event.count = cards.length;
          'step 1'
          target.chooseTarget('请选择目标', function (card, player, target2) {
            return target2.countCards('ej');
          }).set('ai', function (target2) {
            var target = _status.event.player;
            if (ai.get.attitude(target, target2) > 0 && target2.num('j')) return 1;
            return -ai.get.attitude(target, target2);
          });
          'step 2'
          if (result.bool) {
            target.gainPlayerCard('请选择想要获得的牌', [1, event.count], 'ej', result.targets[0], true);
          }
          else {
            event.finish();
          }
          'step 3'
          if (result.bool) {
            event.count -= result.links.length;
            if (event.count) event.goto(1);
          }
        },
      },
      jlsg_huaqiang: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        enable: 'phaseUse',
        filter: function (event, player) {
          return player.countCards('h') >= player.hp;
        },
        filterCard: function (card) {
          for (var i = 0; i < ui.selected.cards.length; i++) {
            if (get.suit(card) == get.suit(ui.selected.cards[i])) return false;
          }
          return true;
        },
        selectCard: function () {
          return Math.min(4, _status.event.player.hp);
        },
        filterTarget: function (card, player, target) {
          return player != target;
        },
        check: function (card) {
          return 6 - get.value(card);
        },
        content: function () {
          target.damage();
        },
        ai: {
          order: 8,
          expose: 0.2,
          result: {
            player: function (player) {
              var eff = player.hp / 2;
              return -eff;
            },
            target: function (player, target) {
              return get.damageEffect(target, player);
            }
          }
        }
      },
      jlsg_chaohuang: {
        audio: "ext:极略/audio/skill:1",
        usable: 1,
        enable: 'phaseUse',
        filterTarget: function (card, player, target) {
          return target.inRangeOf(player) && player.canUse({ name: 'sha' }, target, false);
        },
        delay: false,
        line: false,
        selectTarget: [1, Infinity],
        multitarget: true,
        content: function () {
          player.loseHp();
          player.useCard({ name: 'sha' }, targets, false);
        },
        ai: {
          order: 5,
          result: {
            target: function (player, target) {
              var ts = game.filterPlayer(function (cur) {
                return cur.inRangeOf(player) && player.canUse({ name: 'sha' }, cur, false) && get.effect(cur, { name: 'sha' }, player, player) > 0;
              });
              if (ts.length <= 1 || player.hp <= 1) return 0;
              return get.effect(target, { name: 'sha' }, player, target);
            }
          }
        }
      },
      jlsg_old_zhishi: {
        audio: "ext:极略/audio/skill:2",
        srlose: true,
        enable: "phaseUse",
        usable: 1,
        filter: function (event, player) {
          return player.countCards("h", "sha") || player.countCards("h", "shan");
        },
        filterCard: function (card) {
          return card.name == 'sha' || card.name == 'shan';
        },
        prompt: "选择一张【杀】或【闪】，并且选择一名有手牌的其他角色，发动【治世】。",
        filterTarget: function (card, player, target) {
          return target != player && target.countCards('h');
        },
        discard: false,
        lose: false,
        content: function () {
          "step 0"
          player.showCards(cards[0]);
          var nono = false;
          if (ai.get.damageEffect(target, player, player)) nono = true;
          if (cards[0].name == 'sha') {
            target.chooseToDiscard("请弃置一张【杀】，令" + get.translation(target) + "恢复1点体力，否则你受到1点伤害", { name: "sha" }).set("ai", function () {
              if (_status.nono == true) return false;
              return true;
            }).set('nono', nono);
          }
          if (cards[0].name == 'shan') {
            target.chooseCard("请展示一张【闪】，令" + get.translation(target) + "恢复1点体力，否则你受到1点伤害", 'h', function (card, player, target) {
              return get.name(card) == "shan";
            }).set("ai", function () {
              if (_status.nono == true) return false;
              return true;
            }).set('nono', nono);
          }
          "step 1"
          if (cards[0].name == 'shan' && result.cards) {
            target.showCards(result.cards[0]);
          }
          "step 2"
          if (result.bool) {
            player.recover();
            target.recover();
          } else {
            target.damage(player);
          }
        },
        ai: {
          basic: {
            order: 7,
          },
          result: {
            player: function (player) {
              return 1;
            },
            target: function (player, target) {
              return get.damageEffect(target, player, player);
            },
          },
        },
      },
      jlsg_huilian: {
        audio: "ext:极略/audio/skill:1",
        usable: 1,
        enable: 'phaseUse',
        filterTarget: function (card, player, target) {
          return player != target;
        },
        content: function () {
          'step 0'
          target.judge(function (card) {
            if (target.hp == target.maxHp) {
              if (get.suit(card) == 'heart') return 1;
            }
            if (get.suit(card) == 'heart') return 2;
            return 1;
          });
          'step 1'
          target.gain(result.card, 'gain2');
          if (result.suit == 'heart') {
            target.recover();
          }
        },
        ai: {
          order: 9,
          expose: 0.2,
          result: {
            target: function (target) {
              if (target.isDamaged()) return 2;
              return 1;
            }
          }
        }
      },
      jlsg_wenliang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'judgeAfter' },
        frequent: true,
        filter: function (event, player) {
          return (get.color(event.result.card) == 'red');
        },
        content: function () {
          player.draw();
        }
      },
      jlsg_qianhuan: {
        audio: "ext:极略/audio/skill:2",
        // forbid:['guozhan'],
        trigger: {
          player: 'enterGame',
          global: 'phaseBefore',
        },
        forced: true,
        unique: true,
        priority: -555,
        init: function (player) {
          player.storage.jlsg_qianhuan_fenpei = [];
        },
        filter: function (event, player) {
          if (event.name == 'phase') {
            return event.player == player || game.phaseNumber == 0;
          } else {
            return true;
          }
        },
        content: function () {
          "step 0"
          if (get.config('double_character') === true) {
            event.set('num', 4);
          } else {
            event.set('num', 2);
          }
          var list = lib.jlsg.characterList;
          var stagePlayers = game.players.concat(game.dead);
          for (const player of stagePlayers) {
            list.remove(player.name);
            list.remove(player.name1);
            list.remove(player.name2);
          }
          list = list.randomGets(3);
          event.list = list;
          var skills = [];
          for (var i of list) {
            skills.addArray((get.character(i)[3] || []).filter(function (skill) {
              var info = get.info(skill);
              if (lib.filter.skillDisabled(skill)) return false;
              return info && !info.zhuSkill && !info.hiddenSkill && !info.charlotte && !info.hiddenSkill && !info.dutySkill;
            }));
          }
          skills.addArray(player.storage.jlsg_qianhuan_fenpei);
          if (!list.length || !skills.length) { event.finish(); return; }
          if (player.isUnderControl()) {
            game.swapPlayerAuto(player);
          }
          var switchToAuto = function () {
            _status.imchoosing = false;
            event._result = {
              bool: true,
              skills: skills.randomGets(event.num),
            };
            if (event.dialog) event.dialog.close();
            if (event.control) event.control.close();
          };
          var chooseButton = function (list, skills) {
            var event = _status.event;
            if (!event._result) event._result = {};
            event._result.skills = [];
            var rSkill = event._result.skills;
            var dialog = null;
            if (player.storage.jlsg_qianhuan_fenpei.length) {
              get.character(player.name)[3] = player.storage.jlsg_qianhuan_fenpei;
              dialog = ui.create.dialog(`请选择获得至多${event.num == 2 ? '两' : '四'}个技能`, [list.concat(player.name), 'character'], 'hidden');
            } else {
              dialog = ui.create.dialog(`请选择获得至多${event.num == 2 ? '两' : '四'}个技能`, [list, 'character'], 'hidden');
            }
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
                  if (rSkill.length >= event.num) return;
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
          'step 1'
          var map = event.result || result;
          if (map && map.skills && map.skills.length) {
            let remove = player.storage.jlsg_qianhuan_fenpei
              .filter(s => player.hasSkill(s) && !map.skills.includes(s));
            let add = map.skills.filter(s => !player.hasSkill(s));
            player.changeSkills(add, remove);
            //if(add.length){
            //  for(let skill of add){
            //    if(player.awakenedSkills.includes(skill)) player.restoreSkill(skill)
            //  }
            //}
            player.storage.jlsg_qianhuan_fenpei = map.skills;
          }
        },
        ai: {
          threaten: 2.5,
        },
        group: ['jlsg_qianhuan_2'],
        subSkill: {
          "2": {
            sourceSkill: "jlsg_yingge",
            trigger: { global: 'phaseBefore' },
            forced: true,
            priority: 100,
            unique: true,
            popup: false,
            silent: true,
            filter: function (event, player) {
              return game.phaseNumber == 0 && get.config('double_character') === true;
            },
            content: function () {
              "step 0"
              if (lib.config.mode == 'guozhan' && get.config('guozhan_mode') != 'mingjiang') player.showCharacter(2);
              player.uninit();
              player.style.transform = '';
              player.node.avatar.style.transform = '';
              player.node.avatar2.style.transform = '';
              player.classList.remove('fullskin2');
              player.node.avatar2.setBackground = '';
              player.node.avatar2.hide();
              player.node.name2.style.display = 'none';
              "step 1"
              player.init('jlsgsk_zuoci');
              if (!player.ai.shown) {
                player.ai.shown = 0;
              }
            },
          },
        },
      },
      jlsg_jinglun: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        trigger: { global: ['respond', 'useCard'] },
        filter: function (event, player) {
          if (!event.respondTo) return false;
          if (event.player == player && player != event.respondTo[0]) {
            var cards = [];
            if (get.itemtype(event.respondTo[1]) == 'card') cards.push(event.respondTo[1]);
            else if (event.respondTo[1].cards) cards.addArray(event.respondTo[1].cards);
            return cards.filterInD('od').length != 0;
          }
          if (event.player != player && player == event.respondTo[0]) {
            return event.cards.filterInD('od').length > 0;
          }
          return false;
        },
        check: function (event, player) {
          return true;
          // return get.value(event.cards.filterInD('od'), player) > 0;
        },
        logTarget: 'player',
        content: function () {
          var cards = [];
          if (trigger.player == player && player != trigger.respondTo[0]) {
            if (get.itemtype(trigger.respondTo[1]) == 'card') cards.push(trigger.respondTo[1]);
            else if (trigger.respondTo[1].cards) cards.addArray(trigger.respondTo[1].cards);
          } else {
            cards = trigger.cards;
          }
          cards = cards.filterInD('od');
          player.gain(cards, 'log', 'gain2');
        },
      },
      jlsg_ruzong: {
        audio: "ext:极略/audio/skill:1",
        group: ['jlsg_ruzong_wuxie', 'jlsg_ruzong_shan'],
        subSkill: {
          wuxie: { // 闪当无懈
            audio: 'jlsg_ruzong',
            position: "hs",
            enable: ['chooseToUse', 'chooseToRespond'],
            filterCard: { name: 'shan' },
            viewAsFilter: function (player) {
              return player.countCards('hs', 'shan') != 0;
            },
            viewAs: {
              name: "wuxie",
            },
            prompt: "将一张闪当无懈可击使用",
            check: function (card) { return 8 - get.value(card); },
          },
          shan: {
            audio: 'jlsg_ruzong',
            position: "hs",
            enable: ['chooseToUse', 'chooseToRespond'],
            filterCard: { name: 'wuxie' },
            viewAsFilter: function (player) {
              return player.countCards('hs', 'wuxie') != 0;
            },
            viewAs: {
              name: "shan",
            },
            prompt: "将一张无懈可击当闪使用或打出",
            check: function (card) { return 1; },
            ai: {
              respondShan: true,
              skillTagFilter: function (player) {
                if (!player.countCards('hs', 'wuxie')) return false;
              },
            },
          },
        },
      },
      jlsg_leiji: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: "useCard", },
        mark: true,
        marktext: "祭",
        // intro: {
        //   mark: function (dialog, content, player) {
        //     var num = Array.from(ui.cardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
        //     num += Array.from(ui.discardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
        //     return `剩余${get.cnNumber(num)}张闪电`;
        //   },
        //   markcount: function (storage, player) {
        //     var num = Array.from(ui.cardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
        //     return num + Array.from(ui.discardPile.childNodes).filter(card => get.name(card) == 'shandian').length;
        //   },
        // },
        filter: function (event, player) {
          return event.card.name == 'shan' && event.player != player;
        },
        direct: true,
        content: function () {
          'step 0'
          var card = get.cardPile(function (card) {
            return card.name == 'shandian';
          });
          if (card) {
            // game.cardsGotoOrdering(card);
            event.card = card;
            player.chooseTarget(get.prompt('jlsg_leiji'), function (card, player, target) {
              return target.canAddJudge(_status.event.card);
            })
              .set('card', card)
              .set('ai', function (target) {
                var now = _status.currentPhase?.next;
                for (var i = 0; i < 10; i++) {
                  if (get.attitude(player, now) < 0) return target == now;
                  else {
                    now = now.next;
                  }
                }
                return false;
              });
          } else {
            event.finish();
          }
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_leiji', result.targets[0]);
            result.targets[0].$gain(event.card);
            player.line(result.targets[0], 'thunder');
            result.targets[0].addJudge(event.card);
          }
        }
      },
      jlsg_shanxi: {
        audio: "ext:极略/audio/skill:1",
        trigger: { global: 'judgeEnd' },
        forced: true,
        filter: function (event, player) {
          return get.position(event.result.card, true) == 'o' &&
            event.card && event.card.name == 'shandian' && event.player != player;
        },
        content: function () {
          player.gain(trigger.result.card, 'gain2');
        },
        mod: {
          targetEnabled: function (card) {
            if (card.name == 'shandian') return false;
          }
        }
      },
      jlsg_guhuo: {
        audio: "ext:极略/audio/skill:3",
        trigger: { global: 'phaseBegin' },
        filter: function (event, player) {
          return player.canCompare(event.player); // && !event.player.hasSkill("jlsg_chanyuan");
        },
        check: function (event, player) {
          var cards = player.get('h');
          for (var i = 0; i < cards.length; i++) {
            if (cards[i].number > 11 && get.value(cards[i]) < 7) {
              return get.attitude(player, event.player) < 0;
            }
          }
          if (get.attitude(player, event.player) < 0 && player.countCards('h') > 2) return 1;
          return 0;
        },
        logTarget: 'player',
        content: function () {
          'step 0'
          player.chooseToCompare(trigger.player);
          'step 1'
          var target = trigger.player;
          if (result.bool) {
            var list = [];
            for (var name of lib.inpile) {
              var type = get.type(name);
              if (!['basic', 'trick'].includes(type)) {
                continue;
              }
              if (lib.filter.cardEnabled({ name: name }, player)) {
                list.push([type, '', name]);
              }
              if (name == 'sha') {
                for (var j of lib.inpile_nature) {
                  if (lib.filter.cardEnabled({ name: name, nature: j }, player))
                    list.push([type, '', name, j]);
                }
              }
            }
            var next = player.chooseButton(['蛊惑', [list, 'vcard']]);
            var choice, value = 0;
            for (let [_, __, cardName, nature] of list) { // choose button ai
              let card = { name: cardName, nature: nature }
              let newV = player.getUseValue(card);
              if (newV > value) {
                choice = [cardName, nature];
                value = newV;
              }
            }
            next.filterButton = function (button, player) {
              return true;
            }
            next.ai = function (button) {
              return button.link[2] === _status.event.choice[0] &&
                (button.link[3] || true) === (_status.event.choice[1] || true);
            }
            next.choice = choice;
          } else {
            player.damage(target);
            event.finish();
          }
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = trigger.player;
          event.card = { name: result.links[0][2], nature: result.links[0][3] };
          player.chooseUseTarget(event.card, true);
        },
        ai: {
          expose: 0.1,
          order: 8,
          result: {
            player: function (player) {
              if (player.storage.jlsg_tianqi != undefined) return 1;
              if (player.hp > 2 && player.storage.jlsg_tianqi == undefined) return -10;
              if (Math.random() < 0.67) return 0.5;
              return -1;
            },
          },
          threaten: 4,
        }
      },
      jlsg_fulu: {
        audio: "ext:极略/audio/skill:3",
        trigger: { player: "damageEnd" },
        getIndex(event) {
          return event.num;
        },
        getTargets(player) {
          let damage = player.getAllHistory("damage", evt => {
            return evt.source && evt.source.isIn();
          }).map(evt => evt.source).reverse().slice(0, 3),
            recover = game.getAllGlobalHistory("changeHp", evt => {
              if (evt.player != player || !evt.parent) return false;
              if (evt.parent.name != "recover") return false;
              if (evt.parent.source && evt.parent.source.isIn()) return true;
              return evt.getParent(2)?.player?.isIn();
            }).map(evt => evt.parent.source || evt.getParent(2).player).reverse().slice(0, 3);
          return [damage, recover];
        },
        filter(event, player) {
          const [damage, recover] = lib.skill.jlsg_fulu.getTargets(player);
          return event.num > 0 && (damage.length || recover.length);
        },
        async cost(event, trigger, player) {
          const [damage, recover] = lib.skill.jlsg_fulu.getTargets(player);
          let str = "###符箓：是否令最近三名对你造成伤害的角色依次随机弃置一张牌，最近三次令你回复体力的角色各摸一张牌？###";
          str += `<div class='center text'>打你的人：${damage.length ? get.translation(damage) : "无"}</div><br>`;
          str += `<div class='center text'>帮你的人：${recover.length ? get.translation(recover) : "无"}</div>`;
          const { result } = await player.chooseBool(str)
            .set("info", [damage, recover])
            .set("ai", (event, player) => {
              let v = 0,
                [damage, recover] = get.event("info");
              for (let p of damage) v += get.attitude(player, p) > 0 ? -1 : 1;
              for (let p of recover) v += get.attitude(player, p) > 0 ? 1 : -1;
              return v >= 0;
            })
          let targets = [...damage, ...recover].unique().sortBySeat();
          event.result = {
            bool: result.bool,
            targets: targets,
            cost_data: {
              damage: damage.sortBySeat(),
              recover: recover,
            },
          };
        },
        async content(event, trigger, player) {
          const { damage, recover } = event.cost_data;
          for (let target of damage) {
            if (target.isIn()) {
              let hs = target.getDiscardableCards(player, "he");
              if (hs.length > 0) await target.discard(hs.randomGet());
            }
          };
          if (recover.length) await game.asyncDraw(recover);
        },
      },
      jlsg_guixiu: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'phaseDiscardBefore' },
        frequent: true,
        filter: function (event, player) {
          return !player.getStat('damage');
        },
        content: function () {
          trigger.cancel();
          player.draw();
        },
      },
      jlsg_cunsi: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'die' },
        skillAnimation: true,
        animationColor: 'orange',
        direct: true,
        forceDie: true,
        content: function () {
          'step 0'
          let prompt = `###${get.prompt(event.name)}###将区域中所有牌移出游戏，然后令一名角色获得〖勇决〗`;
          player.chooseTarget(prompt, lib.filter.notMe).set('ai', function (target) {
            return get.attitude(_status.event.player, target);
          });
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.target = result.targets[0];
          var target = result.targets[0];
          player.logSkill(event.name, target);
          target.addSkills('jlsg_yongjue');
          'step 2'
          var target = result.targets[0];
          if (player.countCards('hej')) {
            let cards = player.getCards('hej');
            target.addToExpansion(cards, player, 'give').gaintag.add('jlsg_yongjue2');
          }
        },
        derivation: 'jlsg_yongjue',
      },
      jlsg_yongjue: {
        trigger: { source: 'damageBegin1' },
        filter: function (event) {
          return event.card && event.card.name == 'sha' && event.notLink();
        },
        forced: true,
        direct: true,
        content: function () {
          {
            let gender = player.sex;
            if (!['male', 'female'].includes(gender)) {
              let gender = ['male', 'female'].randomGet();
            }
            if (gender === 'male') player.logSkill('jlsg_yongjue11');
            else player.logSkill('jlsg_yongjue12');
          }
          trigger.num++;
        },
        ai: {
          damageBonus: true,
        },
        group: 'jlsg_yongjue2',
      },
      jlsg_yongjue2: {
        audio: "ext:极略/audio/skill:2",
        marktext: "嗣",
        intro: {
          name: "存嗣",
          content: 'expansion',
          markcount: 'expansion'
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        trigger: {
          source: 'dieAfter',
        },
        filter: function (event, player, name) {
          return player.getExpansions('jlsg_yongjue2').length;
        },
        skillAnimation: true,
        animationColor: 'orange',
        locked: true,
        direct: true,
        content: function () {
          'step 0'
          {
            let gender = player.sex;
            if (!['male', 'female'].includes(gender)) {
              let gender = ['male', 'female'].randomGet();
            }
            if (gender === 'male') player.logSkill('jlsg_yongjue21');
            else player.logSkill('jlsg_yongjue22');
          }
          'step 1'
          player.$draw(player.storage.jlsg_yongjue2);
          player.gain(player.getExpansions('jlsg_yongjue2'), 'draw', 'log');
          player.unmarkSkill('jlsg_yongjue2');
          delete player.storage.jlsg_yongjue2;
        },
      },
      jlsg_yongjue11: {
        inherit: 'jlsg_yongjue',
        audio: "ext:极略/audio/skill:true",
      },
      jlsg_yongjue12: {
        inherit: 'jlsg_yongjue',
        audio: "ext:极略/audio/skill:true",
      },
      jlsg_yongjue21: {
        inherit: 'jlsg_yongjue2',
        audio: "ext:极略/audio/skill:true",
      },
      jlsg_yongjue22: {
        inherit: 'jlsg_yongjue2',
        audio: "ext:极略/audio/skill:true",
      },
      jlsg_gongshen: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        filterCard: true,
        selectCard: 3,
        position: 'he',
        filter: function (event, player) {
          return player.countCards('he') > 2;
        },
        check: function (card, event) {
          if (jlsg.needKongcheng(_status.event.player)) return 10 - get.value(card)
          return 6 - get.value(card);
        },
        content: function () {
          'step 0'
          player.draw();
          'step 1'
          if (player.isDamaged()) {
            if (!game.hasPlayer(function (target) {
              return player.countCards('h') > target.countCards('h');
            })) {
              player.recover();
            }
          }

        },
        ai: {
          order: 1,
          result: {
            player: function (player) {
              if (!player.isDamaged()) return -2;
              var less = !game.hasPlayer(function (target) {
                return player.countCards('h') - 2 > target.countCards('h');
              });
              if (less) return 1;
              return 0;
            }
          }
        }
      },
      jlsg_jianyue: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseJieshuBegin' },
        filter: function (event, player) {
          if (ui.discardPile.hasChildNodes() == false) return false;
          return !game.hasPlayer(function (target) {
            return event.player.countCards('h') > target.countCards('h');
          });
        },
        logTarget: 'player',
        frequent: function (event, player) {
          return event.player == player;
        },
        check: function (event, player) {
          if (jlsg.isFriend(player, event.player)) return !jlsg.needKongcheng(event.player, true);
          return get.attitude(player, event.player) > 0;
        },
        content: function () {
          'step 0'
          if (trigger.player.ai.shown > player.ai.shown) {
            player.addExpose(0.3);
          }
          'step 1'
          var isLess = !(ui.discardPile.hasChildNodes() == false) && !game.hasPlayer(function (target) {
            return trigger.player.countCards('h') > target.countCards('h');
          });
          if (isLess) {
            var card = jlsg.findCardInDiscardPile();
            if (card) {
              trigger.player.gain(card, 'gain2');
              event.redo();
            }
          }
        },
        ai: {
          threaten: 1.1
        }
      },
      jlsg_pengri: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        selectTarget: -1,
        usable: 1,
        line: 'fire',
        // filter: function (event, player) {
        //   return game.hasPlayer(function (target) {
        //     return player.inRangeOf(target) && player != target;
        //   });
        // },
        filterTarget: function (card, player, target) {
          return target && player != target && player.inRangeOf(target);
        },
        multitarget: true,
        multiline: true,
        precontent: function () {
          player.draw(2, 'nodelay');
        },
        content: function () {
          'step 0'
          event.target = event.targets.shift();
          if (!event.target) {
            event.finish();
            return;
          }
          event.target.chooseToUse('是否对' + get.translation(player) + '使用一张【杀】？', { name: 'sha' }, player, -1);
          'step 1'
          event.goto(0);
        },
        ai: {
          order: 9,
          result: {
            player: function (player) {
              var shotter = game.filterPlayer(p => p != player);
              var sha = 0;
              for (var shot of shotter) {
                if (player.inRangeOf(shot) && !jlsg.isKongcheng(shot) && !jlsg.isFriend(shot, player)) {
                  sha++;
                }
              }
              var shan = jlsg.getCardsNum('shan', player, player);
              if (sha > 3 && player.hp <= 2) return -1;
              if (shan >= sha) return 1;
              if (sha == 0) return 2;
              return 0;
            }
          }
        }
      },
      jlsg_danmou: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageEnd' },
        filter: function (event, player) {
          return event.source && event.source.isAlive() && event.source != player
            && (event.source.countCards('h') || player.countCards('h'));
        },
        check: function (event, player) {
          if (get.attitude(player, event.source) <= 0) {
            var cardlength = player.countCards('h');
            for (var i = 0; i < player.getCards('h').length; i++) {
              if (get.value(player.getCards('h')[i]) > 7) {
                cardlength--;
              }
            }
            if (Math.random < 0.5 && cardlength == event.source.countCards('h')) cardlength--;
            return cardlength < event.source.countCards('h');
          } else {
            if (_status.currentPhase == event.source) {
              if (event.source.countUsed('sha') <= 0) return false;
              return event.source.needsToDiscard();
            } else {
              if (event.source.hp < player.hp) {
                return player.countCards('h') - event.source.countCards('h');
              }
            }
          }
        },
        content: function () {
          player.swapHandcards(trigger.source);
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (player.countCards('h') <= target.countCards('h')) return;
              if (get.tag(card, 'damage') && get.attitude(player, target) < 0) return [1, player.countCards('h') - target.countCards('h') - 1];
            },
          }
        }
      },
      jlsg_fushe: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseUseBegin' },
        filter: function (event, player) {
          return event.player.inRangeOf(player) && event.player != player;
        },
        logTarget: 'player',
        check: function (event, player) {
          return get.attitude(event.player, player) < 0;
        },
        content: function () {
          'step 0'
          player.chooseControl('heart2', 'diamond2', 'club2', 'spade2').set('ai', function (event) {
            var rand = Math.ceil(Math.random() * 6);
            var suit = 'heart2';
            if ([1, 4].includes(rand)) {
              suit = 'diamond2';
            } else if ([2, 5].includes(rand)) {
              suit = 'club2';
            } else if (rand == 3) {
              suit = 'spade2';
            } else {
              suit = 'heart2';
            }
            return suit;
          });
          'step 1'
          var message = `<span style="color: ${['heart2', 'diamond2'].includes(result.control) ? "#631515" : "rgba(0,0,0,0.8)"}; font-size: 200%;">${get.translation(result.control.slice(0, -1))}</span>`;
          // can't really chat this due to ban words restrictions
          player.say(message);
          game.log(player, "选择了", result.control);
          trigger.player.storage.jlsg_fushe = result.control;
          trigger.player.storage.jlsg_fushe_source = player;
          trigger.player.addTempSkill('jlsg_fushe_scanning', 'phaseUseAfter');
        },
        subSkill: {
          scanning: {
            mark: true,
            intro: {
              content: function (storage, player) {
                if (!player.storage.jlsg_fushe) return null;
                if (player.hasSkill("jlsg_fushe_debuff")) {
                  return `阶段结束时受到来自${get.translation(player.storage.jlsg_fushe_source)}的一点伤害`;
                }
                return `出牌阶段${get.translation(player.storage.jlsg_fushe)}牌进入弃牌堆时，\
此阶段结束时受到来自${get.translation(player.storage.jlsg_fushe_source)}的1点伤害'`;
              }
            },
            audio: false,
            popup: false,
            forced: true,
            silent: true,
            trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "equipAfter"] },
            filter: function (event, player) {
              /* actually, all cards that entered discard counts */
              // var p;
              // if (event.player) {
              //   if (event.player != player) return false;
              // } else {
              //   var evt =event.getParent();
              //   if(!(evt.name == 'orderingDiscard' && evt.relatedEvent && evt.relatedEvent.player === player)) { // && ['useCard','respond'].includes(evt.relatedEvent.name)
              //     return false;
              //   }
              // }
              return !player.hasSkill('jlsg_fushe_debuff') && event.getd().some(c => get.suit(c) + '2' === player.storage.jlsg_fushe);
            },
            content: function () {
              'step 0'
              player.unmarkSkill("jlsg_fushe_scanning");
              player.addTempSkill('jlsg_fushe_debuff', 'phaseUseAfter');
              'step 1'
              // animate appear again
              player.markSkill("jlsg_fushe_scanning");
            },
            ai: {
              effect: {
                player: function (card, player, target) {
                  var zhangren = player.storage.jlsg_fushe_source;
                  if (get.damageEffect(player, zhangren, player) > 0) return;
                  if (!player.storage.jlsg_fushe) return;
                  if ((get.suit(card) + '2') != player.storage.jlsg_fushe) return;
                  if (!player.needsToDiscard() && !player.hasSkill('jlsg_fushe_debuff')) {
                    var type = get.type(card);
                    if (type == 'basic') {
                      return [1, -1.5];
                    } else if (type == 'trick' && !get.tag(card, 'damage')) {
                      return [1, -1.5];
                    }
                  }
                },
              }
            },
          },
          debuff: {
            trigger: { player: 'phaseUseEnd' },
            forced: true,
            popup: false,
            filter: function (event, player) {
              return player.storage.jlsg_fushe_source && player.storage.jlsg_fushe_source.isAlive();
            },
            content: function () {
              "step 0"
              var zhangren = lib.jlsg.findPlayerBySkillName('jlsg_fushe');
              if (zhangren) {
                zhangren.logSkill('jlsg_fushe', player);
                player.damage(zhangren);
                zhangren.draw();
              }
              "step 1"
              player.removeSkill("jlsg_fushe_buff");
            }
          }
        },
        ai: {
          threaten: function (player, target) {
            if (target.inRangeOf(player)) {
              return 2.5;
            }
            return 1.3;
          },
        }
      },
      jlsg_ziguo: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          return game.hasPlayer(function (cur) {
            return cur.isDamaged() && cur != player;
          });
        },
        filterTarget: function (card, player, target) {
          return target.isDamaged();
        },
        content: function () {
          target.draw(2);
          player.addTempSkill('jlsg_ziguo_debuff');
        },
        subSkill: {
          debuff: {
            mod: {
              maxHandcard: function (player, num) {
                return num - 2;
              }
            }
          }
        },
        ai: {
          order: 4,
          result: {
            target: function (player, target) {
              if (player.getHandcardLimit() <= 2) {
                if (!player.hasSkill('jlsg_shangdao')) return 0;
              }
              var lastedCard = Math.min(player.getHandcardLimit() - 2, 0);
              var currentLastCard = lastedCard;
              if (lastedCard + game.countPlayer(function (cur) {
                if (cur != player && cur.countCards('h') > currentLastCard && !cur.isTurnedOver()) {
                  currentLastCard++;
                  return true;
                }
                return false;
              }) <= (player.maxHp - 2)) return 0;
              if (get.attitude(player, target) <= 0) return 0;
              var result = Math.max(5 - target.countCards('h'), 1.1)
              if (player == target) return Math.max(result - 1, 1);
              return result;
            },
          }
        }
      },
      jlsg_shangdao: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseZhunbeiBegin' },
        filter: function (event, player) {
          return event.player.countCards('h') > player.countCards('h');
        },
        forced: true,
        content: function () {
          var card = get.cards();
          player.showCards('商道', card);
          player.gain(card, 'gain2');
        }
      },
      jlsg_hengjiang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseDiscardBegin' },
        filter: function (event, player) {
          return [-1, 0, 1].includes(player.countCards('h') - player.getHandcardLimit());
        },
        check: function (event, player) {
          if (player.getHandcardLimit() - 1 >= player.countCards('h')) return false;
          return true;
        },
        content: function () {
          'step 0'
          player.chooseControl('手牌上限+1', '手牌上限-1').set('ai', function (event, player) {
            if (jlsg.isWeak(player) && player.getHandcardLimit() < player.countCards('h')) return '手牌上限+1';
            var friends = jlsg.getFriends(player);
            var needToThrowJudge = false;
            for (var i = 0; i < friends.length; i++) {
              if (friends[i].num('j') && !friends[i].num('j', 'shandian')) {
                needToThrowJudge = true;
                break;
              } else if (friends[i].num('j', 'shandian')) {
                var rejudge = game.hasPlayer(function (target) {
                  return target.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target);
                });
                if (rejudge) {
                  needToThrowJudge = true;
                  break;
                }
              }
            }
            if (needToThrowJudge && !jlsg.isWeak(player)) return '手牌上限-1';
            var diren = jlsg.getEnemies(player);
            var needToThrowEquip = false;
            for (var i = 0; i < diren.length; i++) {
              if (diren[i].num('e')) {
                needToThrowEquip = true;
                break;
              } else if (diren[i].num('j', 'shandian')) {
                var rejudge = game.hasPlayer(function (target) {
                  return target.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target);
                });
                if (rejudge) {
                  needToThrowEquip = true;
                  break;
                }
              }
            }
            if (needToThrowEquip && !jlsg.isWeak(player)) return '手牌上限-1';
            return '手牌上限+1';
          });
          'step 1'
          if (result.control == '手牌上限+1') {
            player.addTempSkill('jlsg_hengjiang_buff', 'phaseAfter');
          } else {
            player.addTempSkill('jlsg_hengjiang_debuff', 'phaseAfter');
          }
          player.addTempSkill('jlsg_hengjiang_effect', 'phaseAfter');
        },
        subSkill: {
          effect: {
            audio: false,
            trigger: { player: 'phaseDiscardEnd' },
            forced: true,
            popup: false,
            filter: function (event) {
              return event.cards && event.cards.length > 0;
            },
            content: function () {
              'step 0'
              event.count = trigger.cards.length;
              'step 1'
              if (event.count > 0) {
                player.chooseTarget(get.prompt('jlsg_hengjiang'), function (card, player, target) {
                  return target.countCards('ej');
                }).set('ai', function (target) {
                  if (jlsg.isFriend(player, target)) {
                    if (target.countCards('j') && !target.countCards('j', 'shandian')) return 8;
                    var rejudge = game.hasPlayer(function (target1) {
                      return target1.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target1);
                    });
                    if (target.countCards('j', 'shandian') && rejudge) return 10;
                    return 0;
                  }
                  if (jlsg.isEnemy(player, target)) {
                    var rejudge = game.hasPlayer(function (target1) {
                      return target1.hasSkills(jlsg.ai.skill.rejudge) && jlsg.isEnemy(player, target1);
                    });
                    if (rejudge && target.countCards('j', 'shandian')) return 7;
                    if (target.countCards('e') && !target.hasSkills(jlsg.ai.skill.lose_equip)) return 6;
                    return 0;
                  }
                  return 0;
                });
              } else {
                event.finish();
              }
              'step 2'
              if (result.targets) {
                var att = get.attitude(player, result.targets[0]);
                player.line(result.targets[0], 'water');
                player.discardPlayerCard(result.targets[0], 'ej', [1, event.count], function (button) {
                  if (att > 0) return get.type(button.link) == 'delay';
                  return get.buttonValue(button);
                });
              } else {
                event.finish();
              }
              'step 3'
              if (result.bool) {
                event.count -= result.links.length;
              }
              if (event.count > 0) event.goto(1);

            }
          },
          buff: {
            mod: {
              maxHandcard: function (player, num) {
                return num + 1;
              }
            }
          },
          debuff: {
            mod: {
              maxHandcard: function (player, num) {
                return num - 1;
              }
            }
          },
        },
      },
      jlsg_zhuanshan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['phaseZhunbeiBegin', 'phaseJieshuEnd'] },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt('jlsg_zhuanshan')).ai = function (target) {
            if (target == player) {
              if (target.countCards('j')) {
                if (target.countCards('j', 'shandian') == 0) {
                  if (event.triggername == 'phaseZhunbeiBegin') {
                    return 5;
                  } else {
                    if (jlsg.isFriend(target, target.next)) {
                      return 5;
                    }
                    return -5;
                  }
                } else {
                  var bool = game.hasPlayer(function (target) {
                    return target.hasSkills(jlsg.ai.skill.rejudge);
                  });
                  if (bool) {
                    return 5;
                  }
                  return 0;
                }
              } else if (target.hasSkills(jlsg.ai.skill.lose_equip) && target.countCards('e')) {
                return 5;
              } else {
                return -1;
              }
            } else {
              var att = get.attitude(player, target);
              if (att > 0 && target.countCards('j')) {
                if (event.triggername == 'phaseZhunbeiBegin') {
                  return 6;
                } else {
                  if (jlsg.isFriend(player, player.next)) {
                    return 6;
                  }
                  return -1;
                }
              } else {
                if (target.countCards('e')) {
                  return 4;
                }
                return -1;
              }
              return -1;
            }
          };
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_zhuanshan', event.target);
            event.target = result.targets[0];
            event.target.draw();
            player.choosePlayerCard(event.target, 'hej', true);
          } else {
            event.finish();
          }
          'step 2'
          event.card = result.links[0];

          event.target.lose(result.cards, ui.cardPile, 'insert');
          game.log(player, '将', (get.position(event.card) == 'h' ? '一张牌' : event.card), '置于牌堆顶');
          event.target.$throw(1, 1000);
        }
      },
      jlsg_zhenlie: {
        audio: "ext:极略/audio/skill:1",
        trigger: { target: 'useCardToTargeted' },
        filter: function (event, player) {
          return event.player != player && event.card && (event.card.name == 'sha' || get.type(event.card) == 'trick');
        },
        check: function (event, player) {
          if (event.getParent().excluded.includes(player)) return false;
          if (get.attitude(player, event.player) > 0) {
            return false;
          }
          if (get.tag(event.card, 'respondSha')) {
            if (player.countCards('h', { name: 'sha' }) == 0) {
              return true;
            }
          } else if (get.tag(event.card, 'respondShan')) {
            if (player.countCards('h', { name: 'shan' }) == 0) {
              return true;
            }
          } else if (get.tag(event.card, 'damage')) {
            if (player.countCards('h') < 2) return true;
          } else if (event.card.name == 'shunshou' && player.hp > 2) {
            return true;
          }
          return false;
        },
        priority: 10,
        content: function () {
          "step 0"
          player.loseHp();
          "step 1"
          trigger.getParent().excluded.add(player);
          "step 2"
          if (player.countCards('he')) {
            player.chooseToDiscard('你可以弃置一张牌，令' + get.translation(trigger.player) + '展示所有手牌并弃置与之花色相同的牌', 'he').set('ai', function (card) {
              if (jlsg.isFriend(player, trigger.player)) return false;
              if (jlsg.isWeak(player)) return false;
              if (jlsg.isWeak(trigger.player)) return 10 - get.value(card);
              return 6 - get.value(card);
            });
          } else {
            trigger.player.loseHp();
            event.finish();
          }
          "step 3"
          if (!result.bool) {
            trigger.player.loseHp();
            event.finish();
            return;
          }
          var cards = trigger.player.getCards('h', { suit: get.suit(result.cards[0]) })
          trigger.player.showHandcards();
          if (!cards.length) {
            trigger.player.loseHp();
          } else {
            trigger.player.discard(cards);
          }
        },
        ai: {
          expose: 0.3,
        }
      },
      jlsg_miji: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'] },
        filter: function (event, player, name) {
          if (name == 'phaseZhunbeiBegin') {
            return player.isDamaged();
          }
          if (name == 'phaseJieshuBegin') {
            return !game.hasPlayer(function (target) {
              return target.hp < player.hp;
            });
          }
        },
        frequent: true,
        content: function () {
          'step 0'
          player.chooseControl('basic', 'equip', 'trick').set('ai', function () {
            var basic = player.countCards('he', 'basic');
            var equip = player.countCards('he', 'equip');
            var trick = player.countCards('he', 'trick');
            var theLess = Math.min(basic, equip, trick);
            switch (theLess) {
              case basic:
                return 'basic';
              case equip:
                return 'equip';
              case trick:
                return 'trick';
              default: {
                if (Math.random() < 0.5) return 'basic';
                if (Math.random() < 0.5) return 'equip';
                if (Math.random() < 2 / 3) return 'trick';
                return 'basic';
              }
                ;
            }
          });
          'step 1'
          var card = jlsg.findCardInCardPile(function (card) {
            return get.type(card) == result.control;
          });
          if (card) {
            event.card1 = card;
            player.showCards('秘计', event.card1);
            player.chooseTarget('将' + get.translation(card) + '交给一名角色').set('ai', function (target) {
              var att = get.attitude(_status.event.player, target);
              if (_status.event.du) return -att;
              return att;
            }, true).set('du', card.name == 'du');
          } else {
            game.log('没有找到该类型卡牌，请重新选择');
            event.cantSelect = result.control;
            event.goto(0);
          }
          'step 2'
          if (result.bool) {
            if (result.targets[0].ai.shown > player.ai.shown) {
              player.addExpose(0.2);
            }
            result.targets[0].gain(event.card1, 'gain');
          }
        }
      },
      jlsg_yongji: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageSource' },
        forced: true,
        filter: function (event, player) {
          var phase = event.getParent('phaseUse');
          return event.card && event.card.name == 'sha' && phase && phase.player == player;
        },
        content: function () {
          var num = Math.min(3, player.getDamagedHp());
          if (num > 0) player.draw(num);
          // player.getStat().card.sha--;
          if (!player.hasSkill('jlsg_yongjiBuff')) {
            player.storage.jlsg_yongjiBuff = 1;
            player.addTempSkill('jlsg_yongjiBuff'); // 'phaseUseAfter'
          } else {
            ++player.storage.jlsg_yongjiBuff;
          }
        }
      },
      jlsg_yongjiBuff: {
        // audio: "ext:极略/audio/skill:1",
        // trigger:{player:'useCard1'},
        // forced:true,
        // filter:function(event,player){
        //   return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&player.storage.jlsg_yongjiBuff;
        // },
        // content:function(){
        //   trigger.audioed=true;
        // },
        mod: {
          cardUsable: function (card, player, num) {
            if (card.name == 'sha' && player.storage.jlsg_yongjiBuff) {
              return num + player.storage.jlsg_yongjiBuff;
            }
          }
        },
        charlotte: true,
        sourceSkill: "jlsg_yongji",
        onremove: true,
      },
      jlsg_wuzhi: {
        audio: "ext:极略/audio/skill:1",
        forced: true,
        priority: 2,
        trigger: { player: 'phaseJieshuBegin' },
        filter: function (event, player) {
          let shaFulfilled = () => {
            var shaTemplate = { name: 'sha', isCard: true };
            var num = lib.card['sha'].usable;
            if (!num) return true;
            num = game.checkMod(shaTemplate, player, num, 'cardUsable', player);
            var numUsed = player.getHistory('useCard', event => get.name(event.card) == 'sha'
            ).length;
            return !num || num <= numUsed;
          };
          return !shaFulfilled();
        },
        content: function () {
          'step 0'
          player.damage("nosource");
          'step 1'
          var card = get.cardPile2('sha');
          if (card) player.gain(card, 'gain2', 'log');
        }
      },
      // 真有你的啊 用别人的字做技能名
      jlsg_yidu: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        usable: 1,
        // frequent: true,
        filter: function (event, player) {
          var currPlayer = _status.currentPhase;
          if (!currPlayer || currPlayer == player || !currPlayer.countCards('h')) return false;
          var evt = event.getl(player);
          return evt && evt.hs && evt.hs.length > 0;
        },
        check(event, player) {
          return true;
        },
        content: function () {
          var suits = trigger.getl(player).hs.map(card => get.suit(card));
          var num = _status.currentPhase?.countCards('h',
            (card) => suits.includes(get.suit(card))
          );
          player.draw(num);
        },
        ai: {
          threaten: 0.5,
          effect: {
            target: function (card, player, target, result2, islink) {
              if (_status.currentPhase == target) return;
              if (card.name == 'guohe' || card.name == 'liuxinghuoyu') return 1 - 0.1 * _status.currentPhase?.countCards('h');
            }
          },
          noh: true,
          skillTagFilter: function (player, tag) {
            if (tag == 'noh') {
              if (_status.currentPhase == player) return false;
              return _status.currentPhase?.countCards('h') > 4;
            }
          }
        }
      },
      jlsg_zhubao: {
        group: 'jlsg_zhubao_phase',
        audio: "ext:极略/audio/skill:1",
        direct: true,
        trigger: {
          global: ['loseAfter', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter: function (event, player) {
          if (_status.currentPhase != player || !player.countCards('h')) return false;
          if (!player.storage.jlsg_zhubao) {
            player.storage.jlsg_zhubao = [];
          }
          return game.hasPlayer(p => {
            if (p == player) return false;
            if (player.storage.jlsg_zhubao.includes(p)) return false;
            var evt = event.getl(p);
            return evt && evt.hs && evt.hs.length > 0;
          });
        },
        direct: true,
        content: function () {
          'step 0'
          if (!player.storage.jlsg_zhubao) {
            player.storage.jlsg_zhubao = [];
          }
          event.suitMap = [];
          game.filterPlayer(p => p != player && !player.storage.jlsg_zhubao.includes(p)).forEach(p => {
            var evt = trigger.getl(p);
            if (evt && evt.hs) {
              var suits = [...new Set(evt.hs.map(card => get.suit(card)))];
              event.suitMap.push([p, suits]);
            }
          });
          'step 1'
          if (!event.suitMap.length) {
            event.finish();
            return;
          }
          [event.target, event.suits] = event.suitMap.shift();
          event.num = player.countCards('h',
            (card) => event.suits.includes(get.suit(card))
          );
          if (event.num == 0) {
            event.redo();
            return;
          }
          var prompt = `###${get.prompt(event.name, event.target)}###你可以摸${get.cnNumber(event.num)}张牌`;
          player.chooseBool(prompt);
          'step 2'
          if (result.bool) {
            player.storage.jlsg_zhubao.push(event.target);
            player.logSkill(event.name, event.target);
            var num = player.countCards('h',
              (card) => event.suits.includes(get.suit(card))
            );
            player.draw(event.num);
          }
          event.goto(1);
        },
        contentx: function () {
          if (!player.storage.jlsg_zhubao) {
            player.storage.jlsg_zhubao = [];
          }
          var suits = [];
          game.filterPlayer(p => p != player).forEach(p => {
            var evt = trigger.getl(p);
            if (evt && evt.hs) {
              suits.addArray(evt.hs.map(card => get.suit(card)));
            }
          });
          var num = player.countCards('h',
            (card) => suits.includes(get.suit(card))
          );
          if (num > 10) num = 10;
          player.draw(num);
        },
        subSkill: {
          phase: {
            silent: true,
            forced: true,
            trigger: { player: 'phaseBegin' },
            content: function () {
              player.storage.jlsg_zhubao = [];
            },
          },
        },
      },
      jlsg_buqu: {
        audio: "ext:极略/audio/skill:2",
        inherit: 'buqu',
      },
      jlsg_fenji: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          global: 'shaBegin',
        },
        filter: function (event, player) {
          return event.card.name == 'sha';
        },
        logTarget: 'target',
        check: function (event, player) {
          return get.attitude(player, event.target) > 2;
        },
        content: function () {
          'step 0'
          if (trigger.target.ai.shown > player.ai.shown) {
            player.addExpose(0.3);
          }
          player.loseHp();
          'step 1'
          trigger.target.draw(2);
        }
      },
      jlsg_jiaomei: {
        audio: "ext:极略/audio/skill:1",
        usable: 1,
        trigger: {
          player: 'useCardToPlayered',
        },
        logTarget: 'target',
        filter: function (event, player) {
          // if (event.target == player) return false;
          if (!player.isPhaseUsing()) return false;
          return get.type(event.card) == 'trick' || event.card.name == 'sha';
        },
        check: function (event, player) {
          if (event.card.name == 'tiesuo') return false;
          var target = event.target;
          var effect = 0.5 * get.effect(target, { name: 'tiesuo' }, player, player);
          if (player.hasSkill('jlsg_huoshui')) {
            effect += (target.isLinked() ? -0.8 : 0.8) *
              get.effect(target, { name: 'shunshou' }, player, player);
            effect += (target.isLinked() ? 1 : 0.2) *
              get.damageEffect(target, player, player);
          }
          if (target.isLinked() && !target.hasSkillTag('noturn')) {
            effect += get.attitude(player, target) * (
              target.isTurnedOver() ? 8 : -8
            );
          }
          return effect > 0;
        },
        prompt2: function (event, player) {
          return `令${get.translation(event.target)}${event.target.isLinked() ? '重置并翻面' : '横置'}`;
        },
        content: function () {
          if (trigger.target.isLinked()) {
            trigger.target.link();
            trigger.target.turnOver();
          } else {
            trigger.target.link();
          }
        },
      },
      jlsg_huoshui: {
        audio: "ext:极略/audio/skill:1",
        trigger: {
          player: 'phaseJieshuBegin',
        },
        filter: function (event, player) {
          return game.hasPlayer(p => p != player && (p.isTurnedOver() || p.isLinked()));
        },
        check: function (event, player) {
          var effect = 0;
          for (var p of game.filterPlayer(p => p != player)) {
            if (p.isLinked()) {
              effect += get.effect(p, { name: 'shunshou' }, player, player);
            }
            if (p.isTurnedOver()) {
              effect += get.damageEffect(p, player, player);
            }
          }
          return effect > 0;
        },
        content: function () {
          'step 0'
          event.targets = game.filterPlayer(p => p.isLinked());
          player.line(event.targets, 'green');
          'step 1'
          if (event.targets.length == 0) {
            event.goto(2);
            return;
          }
          event.target = event.targets.shift();
          if (event.target.countGainableCards(player, 'he') != 0) {
            player.gainPlayerCard(event.target, true);
          }
          event.redo();
          'step 2'
          event.targets = game.filterPlayer(p => p.isTurnedOver());
          player.line(event.targets, 'green');
          'step 3'
          if (event.targets.length == 0) {
            event.finish();
            return;
          }
          event.target = event.targets.shift();
          event.target.damage(player);
          event.redo();
        },
      },
      jlsg_hubu: {
        audio: "ext:极略/audio/skill:1",
        trigger: { player: 'damageEnd', source: 'damageEnd' },
        filter: function (event) {
          return event.card && event.card.name == 'sha'; // && event.notLink();
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt(event.name), function (card, player, target) {
            return player != target && player.canUse('juedou', target);
          }).ai = function (target) {
            return get.effect(target, { name: 'juedou' }, player, target);
          }
          'step 1'
          if (result.bool) {
            event.target = result.targets[0];
            player.logSkill(event.name, event.target);
            event.target.judge(function (card) {
              if (get.suit(card) == 'spade') return 1;
              return -0.5;
            }).judge2 = result => !result.bool;
          }
          else {
            event.finish();
          }
          'step 2'
          if (!result.bool) {
            player.useCard({ name: 'juedou' }, event.target, 'nowuxie');
          }
          else {
            event.finish();
          }
        }
      },
      jlsg_yuhua: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageBegin2', player: 'damageBegin4' },
        intro: {
          content: '已发动过#次',
        },
        filter: function (event, player) {
          return event.card && get.type(event.card, 'trick') == 'trick';
        },
        check: function (event, player) {
          _status.jlsg_yuhua_judging = true;
          if (player == event.player) {
            return true;
          }
          if (get.attitude(player, event.player) > 0) return true;
          if (get.damageEffect(event.player, player, player, event.nature) <= 0) return true;
          delete _status.jlsg_yuhua_judging;
          return false;
        },
        content: function () {
          'step 0'
          trigger.cancel();
          player.draw();
          'step 1'
          player.storage.jlsg_yuhua = player.storage.jlsg_yuhua || 0;
          ++player.storage.jlsg_yuhua;
          player.markSkill('jlsg_yuhua');
        },
        mod: {
          maxHandcard: function (player, num) {
            if (player.storage.jlsg_yuhua) {
              return num - player.storage.jlsg_yuhua;
            }
          }
        },
        ai: {
          notrick: true,
          notricksource: true,
          skillTagFilter(player, tag, arg) {
            if (tag == 'notrick') return true;
            return !!((get.attitude(player, _status.event.player) >= 0) ^ (Math.random() > 0.8));
          },
        },
      },
      jlsg_dengxian: {
        audio: "ext:极略/audio/skill:2",
        skillAnimation: true,
        animationColor: 'orange',
        unique: true,
        juexingji: true,
        trigger: { player: 'phaseZhunbeiBegin' },
        forced: true,
        filter: function (event, player) {
          return player.getHandcardLimit() == 0;
        },
        content: function () {
          'step 0'
          player.awakenSkill('jlsg_dengxian');
          // player.storage.jlsg_dengxian = true;
          'step 1'
          player.addSkill('jlsg_dengxian2');
          player.markSkill('jlsg_dengxian');
          player.chooseControl('额外摸牌阶段', '额外出牌阶段', [0, 1].randomGet())
            .set('prompt', `###请选择一项###${lib.translate.jlsg_dengxian_info}`)
          'step 2'
          if (result.index === 0) {
            game.log(player, '选择替换为摸牌阶段');
          } else {
            game.log(player, '选择替换为出牌阶段');
          }
          player.storage.jlsg_dengxian = result.index;
        },
        intro: {
          nocount: true,
          content(content, player, skill) {
            var str = '跳过弃牌阶段';
            if (content === 0) {
              str += ',并替换为摸牌阶段';
            }
            else if (content === 1) {
              str += ',并替换为出牌阶段';
            }
            return str;
          },
        },
      },
      jlsg_dengxian2: {
        audio: 'jlsg_dengxian',
        unique: true,
        forced: true,
        trigger: { player: 'phaseDiscardBefore' },
        content: function () {
          trigger.cancel();
          var phase = ['phaseDraw', 'phaseUse'][player.storage.jlsg_dengxian];
          if (!phase) return;
          var next = player[phase]();
          event.next.remove(next);
          trigger.getParent().next.push(next);
        },
      },
      jlsg_tiance: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        direct: true,
        content: function () {
          'step 0'
          if (event.target) return;
          player.chooseTarget(get.prompt2('jlsg_tiance'));
          'step 1'
          if (!event.target) {
            if (!result.bool) {
              event.finish();
              return;
            }
            event.target = result.targets[0];
            player.logSkill('jlsg_tiance', result.targets[0]);
          }
          event.target.judge();
          'step 2'
          event.result = result;
          if (!result.suit) return;
          player.chooseControl('牌堆', '弃牌堆', '角色').set('ai', function () {
            return Math.floor(Math.random() * 3);
          }).set('prompt', `请选择${get.translation(event.target)}获得牌的区域`);
          'step 3'
          game.log(player, '选择了', result.control);
          if (result.control == '弃牌堆') {
            var validCards = Array.from(ui.discardPile.childNodes).filter(c => c.suit === event.result.suit);
            if (validCards.length) {
              var cards = validCards.randomGets(2);
              event.target.gain(cards, 'gain2');
            }
          }
          else if (result.control == '角色') {
            var target = game.filterPlayer(
              p => p != event.target && p.countCards('he', c => get.suit(c) == event.result.suit)
            ).randomGet();
            if (target) {
              var cards = target.getCards('he', c => get.suit(c) == event.result.suit).randomGets(2);
              event.target.gain(target, cards, 'give');
            }
          } else {
            var validCards = Array.from(ui.cardPile.childNodes).filter(c => c.suit === event.result.suit);
            if (validCards.length) {
              var cards = validCards.randomGets(2);
              event.target.gain(cards, 'gain2');
            }
          }
        }
      },
      jlsg_jiexin: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageEnd' },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2(event.name));
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = result.targets[0];
          player.logSkill(event.name, target);
          var next = game.createEvent('jlsg_jiexin_tiance');
          next.player = player;
          next.target = target;
          next.setContent(lib.skill.jlsg_tiance.content);
          'step 2'
          if (result.color && trigger.card && result.color === get.color(trigger.card)) {
            player.chooseTarget('是否再次发动【天策】？');
          } else {
            event.finish();
          }
          'step 3'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = result.targets[0];
          // player.logSkill(event.name, target);
          var next = game.createEvent('jlsg_jiexin_tiance');
          next.player = player;
          next.target = target;
          next.setContent(lib.skill.jlsg_tiance.content);
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          effect: {
            target: function (card, player, target) {
              if (get.tag(card, 'damage')) {
                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                if (!target.hasFriend()) return;
                if (target.hp >= 4) return [1, get.tag(card, 'damage') * 1.5];
                if (target.hp == 3) return [1, get.tag(card, 'damage') * 1];
                if (target.hp == 2) return [1, get.tag(card, 'damage') * 0.5];
              }
            }
          }
        }
      },
      jlsg_zhengnan: { // 征南
        audio: "ext:极略/audio/skill:2",
        enable: "phaseUse",
        usable: 1,
        filterTarget: function (card, player, target) {
          return target.countCards('hej');
        },
        content: function () {
          'step 0'
          player.discardPlayerCard(target, 'hej', forced).set('ai', (button, buttons) => {
            var target = _status.event.getParent().target;
            var val = get.buttonValue(button); // get.effect(target, {name: 'nanman'}, get.owner(buttons.randomGet().link), _status.event.player) 
            if (get.attitude(_status.event.player, get.owner(button.link)) > 0) val = -val;
            if (button.name && get.type(button.link) != 'basic') val += 6;
            return val;
          })
          'step 1'
          if (!result.bool || get.type(result.links[0]) == 'basic') {
            event.finish();
            return;
          }
          target.chooseUseTarget({ name: 'nanman' }, true).set('oncard', (card, player) => {
            _status.event.skill = 'jlsg_zhengnan';
          });
        },
        group: "jlsg_zhengnan2",
        ai: {
          result: {
            target: function (player, target) {
              var ratio = target.countCards('hej', c => get.type(c) != 'basic') / target.countCards('hej');
              if (get.attitude(player, target) < 0) return 1 - ratio;
              return ratio;
            },
            player: 1,
          },
          order: function (item, player) {
            return get.order({ name: 'nanman' }, player) + 0.5;
          },
          threaten: 0.5,
        },
      },
      jlsg_zhengnan2: {
        audio: "jlsg_zhengnan",
        frequent: true,
        trigger: { global: 'damageEnd' },
        filter: function (event, player) {
          var evt = event.getParent('useCard');
          return event.card && event.card.name == 'nanman' && evt && evt.skill === 'jlsg_zhengnan';
        },
        content: function () {
          player.draw();
        },
      },
      jlsg_tongxin: {
        audio: false,
        unique: true,
        limited: true,
        enable: 'chooseToUse',
        filter: function (event, player) {
          return event.type == 'dying' && event.dying === player;
        },
        precontent: function () {
          var audioS = 'jlsg_tongxin_';
          if ([player.name, player.name1, player.name2].includes("jlsgsk_baosanniang")) {
            audioS += 'f';
          }
          else if ([player.name, player.name1, player.name2].includes("jlsgsk_guansuo")) {
            audioS += 'm';
          }
          else if ('mf'.includes(player.sex[0])) {
            audioS += player.sex[0];
          } else {
            audioS += ['m', 'f'].randomGet();
          }
          game.trySkillAudio(audioS, player);
        },
        content: function () {
          'step 0'
          player.awakenSkill(event.name);
          'step 1'
          var num = 2 - player.hp;
          if (num > 0) player.recover(num);
          'step 2'
          var list = [
            'jlsgsk_guansuo',
            'jlsgsk_baosanniang',
          ]
          var players = game.players.concat(game.dead);
          for (var i = 0; i < players.length; i++) {
            [
              players[i].name,
              players[i].name1,
              players[i].name2,
            ].forEach(n => {
              if (n && n.endsWith('guansuo')) list.remove('jlsgsk_guansuo');
              if (n && n.endsWith('baosanniang')) list.remove('jlsgsk_baosanniang');
            })
          }
          if (!list.length) {
            event.finish();
            return;
          }
          player.chooseButton().set('ai', function (button) {
            return Math.random();
          }).set('createDialog', ['是否替换武将牌？', [list, 'character']]);
          'step 3'
          if (result.bool) {
            var name = player.name;
            if (player.name2) {
              if (!get.character(player.name)[3].includes(event.name)) {
                if (get.character(player.name2)[3].includes(event.name)) {
                  name = player.name2;
                }
              }
            }
            player.reinit(name, result.links[0]);
          }
        },
        ai: {
          skillTagFilter: function (player) {
            if (!_status.event.dying || _status.event.dying != player || player.storage.jlsg_tongxin) return false;
          },
          save: true,
          order: 6,
          result: {
            player: 1
          },
        },
      },
      jlsg_tongxin_f: {
        audio: "ext:极略/audio/skill:2",
      },
      jlsg_tongxin_m: {
        audio: "ext:极略/audio/skill:2",
      },
      jlsg_jianwu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'useCard' },
        forced: true,
        silent: true,
        filter: function (event, player) {
          return get.type(event.card) == 'basic';
        },
        content: function () {
          player.addSkill('jlsg_jianwu2');
        },
      },
      jlsg_jianwu2: {
        trigger: { player: 'useCard1' },
        // audio: "jlsg_jianwu",
        direct: true,
        firstDo: true,
        charlotte: true,
        content: function () {
          player.removeSkill('jlsg_jianwu2');
          if (trigger.card.name == 'sha') {
            player.logSkill('jlsg_jianwu');
          }
          if (get.type(trigger.card) != 'basic') {
            player.removeSkill('jlsg_jianwu2');
          }
        },
        mod: {
          cardUsable: function (card) {
            if (card.name == 'sha') return Infinity;
          },
          targetInRange: function (card) {
            if (card.name == 'sha') return true;
          },
          selectTarget: function (card, player, range) {
            if (card.name != 'sha') return;
            if (range[1] == -1) return;
            range[1] += 1;
          }
        },
        mark: true,
        intro: {
          content: '使用【杀】无距离和次数限制且目标上限+1',
        },
      },
      jlsg_zhennan: { // 镇南
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        trigger: { global: 'useCardToTargeted' },
        filter: function (event, player) {
          return event.isFirstTarget && (event.card.name == 'sha' || get.type(event.card) == 'trick') &&
            event.targets.length > 1;
        },
        direct: true,
        content: function () {
          'step 0'
          var targets = trigger.targets;
          var choice, effect = 0;
          for (target of targets) {
            var thisEffect = get.damageEffect(target, player, player);
            if (thisEffect > effect) {
              choice = target;
              effect = thisEffect;
            }
          }
          player.chooseTarget(get.prompt2(event.name)).set('filterTarget', function (card, player, target) {
            return _status.event.targets.includes(target);
          }).set('ai', function (target) {
            return target == _status.event.choice ? 1 : -1;
          }).set('targets', targets).set('choice', choice);
          'step 1'
          if (result.bool) {
            player.logSkill(event.name, result.targets[0]);
            result.targets[0].damage();
          }
        }
      },
      jlsg_shemi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'chooseToDiscardBegin' },
        direct: true,
        intro: {
          content: function (content, player, skill) {
            var str = "弃牌阶段记录弃牌数：" + content;
            if (player.storage.jlsg_shemi_draw) {
              str = `摸牌阶段额外摸${get.cnNumber(player.storage.jlsg_shemi_draw)}张牌 <br>` + str;
            }
            return str;
          },
          markcount: function (storage, player) {
            return player.storage.jlsg_shemi_draw || 0;
          }
        },
        filter: function (event, player) {
          return event.getParent().name == 'phaseDiscard' && event.selectCard;
        },
        content: function () {
          trigger.selectCard[1] = Infinity;
          if (player.countMark("jlsg_shemi") == trigger.selectCard[0]) { // buff ai
            var cards = player.getDiscardableCards(player, 'h');
            if (cards.length > trigger.selectCard[0]) {
              var card = cards.map((c, i) => [trigger.ai(c), i])
                .sort((pair1, pair2) => pair1[0] - pair2[0])[1];
              trigger.set('card', cards[card])
                .set('ai', function (card) {
                  return (card === _status.event.card ? 5 : 0) - get.useful(card);
                });
            }
          }
        },
        subSkill: {
          draw: {
            audio: "jlsg_shemi",
            trigger: { player: 'phaseDrawBegin2' },
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              return !event.numFixed && player.countMark('jlsg_shemi_draw');
            },
            content: function () {
              trigger.num += player.countMark('jlsg_shemi_draw');
            },
          },
          record: { // to avoid disable
            trigger: {
              player: 'phaseDiscardAfter',
            },
            charlotte: true,
            silent: true,
            init: function (player) {
              player.storage["jlsg_shemi"] = 0;
            },
            content: function () {
              var cntC = 0;
              player.getHistory('lose', function (evt) {
                if (evt && evt.type == 'discard' && evt.getParent('phaseDiscard') == trigger && evt.hs) {
                  cntC += evt.hs.length;
                }
              });
              player.storage["jlsg_shemi"] = cntC;
              player.markSkill("jlsg_shemi");
            },
          },
          force: {
            trigger: {
              player: 'phaseDiscardEnd',
            },
            firstDo: true,
            direct: true,
            filter: function (event, player) {
              return !event.cards;
            },
            content: function () {
              'step 0'
              var evt = player.chooseToDiscard([1, Infinity], `###${get.prompt(event.name)}###你可以多弃置任意张牌`);
              if (player.countMark("jlsg_shemi") == 0) {
                var cards = player.getDiscardableCards(player, 'h');
                if (cards.length) {
                  var card = cards.map((c, i) => [get.useful(c), i])
                    .reduce((pair1, pair2) => pair1[0] < pair2[0] ? pair1 : pair2)[1];
                  evt.set('card', cards[card])
                    .set('ai', function (card) {
                      return (card === _status.event.card ? 5 : 0) - get.useful(card);
                    });
                }
              }
              'step 1'
              if (result.bool) {
                trigger.cards = result.cards;
              }
            },
          }
        },
        group: ["jlsg_shemi2", "jlsg_shemi_draw", "jlsg_shemi_record", "jlsg_shemi_force"],
      },
      jlsg_shemi2: {
        audio: "jlsg_shemi",
        trigger: {
          player: 'phaseDiscardEnd',
        },
        forced: true,
        filter: function (event, player) {
          var cntC = 0;
          player.getHistory('lose', function (evt) {
            if (evt && evt.type == 'discard' && evt.getParent('phaseDiscard') == event && evt.hs) {
              cntC += evt.hs.length;
            }
          });
          return cntC > player.countMark("jlsg_shemi");
        },
        content: function () {
          player.storage.jlsg_shemi_draw = player.storage.jlsg_shemi_draw || 0;
          player.storage.jlsg_shemi_draw += 1;
          if (player.isHealthy()) {
            player.gainMaxHp();
          }
        },
        ai: {
          threaten: 1,
        },
      },
      jlsg_jiaohui: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageBegin2' },
        frequent: true,
        direct: true,
        content: function () {
          'step 0'
          if (player.countDiscardableCards(player, 'he')) {
            var next = player.chooseToDiscard(`###${get.prompt(event.name)}###弃置一张牌`).set('logSkill', event.name);
            if (player.countCards('h') - 1 === player.hp) {
              next.set('ai', function (card) {
                return _status.event.gain - get.value(card);
              }).set('gain', -get.damageEffect(player, trigger.source, player, trigger.nature) / 1.5);
            }
          }
          'step 1'
          if (result.bool) {
            event.goto(3);
          } else {
            player.chooseBool("###是否摸一张牌?###" + get.skillInfoTranslation(event.name)).set('frequentSkill', event.name);
          }
          'step 2'
          if (result.bool) {
            player.logSkill(event.name);
            player.draw();
          } else {
            event.finish();
          }
          'step 3'
          if (player.countCards('h') === player.hp) {
            --trigger.num;
          }
        },
        ai: {
          maixie: true,
          maixie_defend: true,
        },
      },
      jlsg_wengua: {
        global: 'jlsg_wengua2',
        audio: "ext:极略/audio/skill:2",
      },
      jlsg_wengua2: {
        sub: true,
        trigger: { player: "phaseZhunbeiBegin" },
        filter: function (event, player) {
          return game.hasPlayer(c => c.hasSkill('jlsg_wengua'));
        },
        unique: true,
        direct: true,
        content: function () {
          'step 0'
          var list = game.filterPlayer(function (current) {
            return current.hasSkill('jlsg_wengua');
          });
          if (list.length == 1 && list[0] == player) {
            event.target = player;
            event.goto(2);
            return;
          }
          player.chooseCardTarget({
            prompt2: '交给' + get.translation(list) + '一张牌',
            prompt: get.prompt(event.name),
            filterCard: true,
            position: 'he',
            filterTarget: function (card, player, target) {
              return _status.event.list.includes(target);
            },
            list: list,
            selectTarget: list.length > 1 ? 1 : -1,
            goon: function () {
              for (var i of list) {
                if (get.attitude(player, i) > 0) return 1;
                return -1;
              }
            }(),
            ai1: function (card) {
              if (_status.event.goon > 0) return 7 - get.value(card);
              return 0.01 - get.value(card);
            },
            ai2: function (target) {
              var card = ui.selected.cards[0];
              var black = get.color(card) == 'black' ? 3 : 0;
              if (!target.hasSkill('jlsg_fuzhu')) black = 0;
              return (black + get.value(card, target)) * get.attitude(_status.event.player, target);
            },
          });
          'step 1'
          if (result.bool && result.cards.length && result.targets.length) {
            var target = result.targets[0];
            event.target = target;
            player.logSkill('jlsg_wengua', target);
            player.line(target, 'green');
            target.gain(result.cards, player, 'giveAuto');
          } else {
            event.finish();
          }
          'step 2'
          var prompt2 = `将一张牌置于牌堆底，然后${event.target == player ? '' : `和${get.translation(player)}`}摸一张牌`;
          event.target.chooseCard(`###${get.prompt('jlsg_wengua')}###${prompt2}`, 'he').set('ai', function (card) {
            var value = -get.value(card);
            if (get.attitude(_status.event.player, _status.event.target) > 0) {
              value += 8;
            }
            if (_status.event.player.hasSkill('jlsg_fuzhu')) {
              value += get.color(card) == 'black' ? 3 : -1;
            }
          }).set('target', player);
          'step 3'
          if (result.bool) {
            if (player == event.target) {
              player.logSkill('jlsg_wengua');
            }
            var next = event.target.lose(result.cards, ui.cardPile);
            game.log(event.target, '将一张牌置于牌堆底');
            game.broadcastAll(function (player) {
              var cardx = ui.create.card();
              cardx.classList.add('infohidden');
              cardx.classList.add('infoflip');
              player.$throw(cardx, 1000, 'nobroadcast');
            }, event.target);
          } else {
            event.finish();
          }
          'step 4'
          game.delayx();
          'step 5'
          if (player == event.target) {
            player.draw();
          }
          else {
            game.asyncDraw([player, target], null, null);
          }
        },
      },
      jlsg_fuzhu: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        limited: true,
        skillAnimation: true,
        animationColor: 'wood',
        filterTarget: function (card, player, target) {
          return player != target;
        },
        content: function () {
          'step 0'
          player.awakenSkill(event.name);
          'step 1'
          if (!ui.cardPile.lastChild || !target.isIn()) {
            event.finish();
            return;
          }
          player.showCards(ui.cardPile.lastChild);
          'step 2'
          var card = ui.cardPile.lastChild;
          if (get.color(card) == 'black') {
            card.remove();
            game.updateRoundNumber();
            player.useCard({
              name: 'sha',
              cards: [card],
            }, target, false);
            event.goto(1);
          }
        },
        result: {
          target: function (player, target) {
            return -game.roundNumber;
          }
        },
      },
      jlsg_yinyuan: {
        audio: "ext:极略/audio/skill:2",
        init: function (player) {
          player.storage.jlsg_yinyuan = [];
        },
        trigger: { player: "phaseJieshuBegin" },
        direct: true,
        intro: {
          content: '已对$发动过【姻缘】'
        },
        content: function () {
          "step 0"
          player.chooseTarget(get.prompt2(event.name))
            .set("ai", function (player) {
              var eff = get.attitude(_status.event.player, player);
              if (_status.event.player.storage.jlsg_yinyuan && _status.event.player.storage.jlsg_yinyuan.includes(player)) {
                return eff;
              }
              return eff + get.attitude(_status.event.player, _status.event.player);
            });
          "step 1"
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          event.target = result.targets[0];
          var card = get.cardPile2(c => c.suit == 'heart');
          if (card) {
            event.target.gain(card, 'gain2');
          }
          if (player.storage[event.name].includes(event.target)) {
            event.finish();
          } else {
            player.markAuto(event.name, [event.target]);
          }
          "step 2"
          var card = get.cardPile2(c => c.suit == 'heart');
          if (card) {
            player.gain(card, 'gain2');
          }
        }
      },
      jlsg_konghou: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'useCard' },
        direct: true,
        preHidden: true,
        filter: function (event, player) {
          if (event.all_excluded || event.player == player || !event.player.isPhaseUsing() || !player.countCards('he')) return false;
          var evt = event.getParent('phaseUse');
          if (evt.name != 'phaseUse') {
            return false;
          }
          var uses = event.player.getHistory('useCard', e => e.getParent('phaseUse') == evt);
          return uses[0] == event && get.type(event.card) == 'trick'
            || uses[1] == event && get.type(event.card) == 'basic';
        },
        content: function () {
          "step 0"
          var prompt = `###${get.prompt(event.name, trigger.player)}###弃置一张牌，令${get.translation(trigger.card)}无效`;
          player.chooseToDiscard(prompt, "he")
            .set('ai', function (card) {
              return (_status.event.goon / 1.4) - get.value(card);
            })
            .set('goon', function () {
              if (!trigger.targets.length) return -get.attitude(player, trigger.player);
              var num = 0;
              for (var i of trigger.targets) {
                num -= get.effect(i, trigger.card, trigger.player, player)
              }
              return num;
            }())
            .setHiddenSkill(event.name)
            .logSkill = [event.name, trigger.player];
          "step 1"
          if (result.bool) {
            trigger.cancel();
          }
        },
      },
      jlsg_zhidi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        shaRelated: true,
        init: function (player) {
          player.storage.jlsg_zhidi = [false, false, false, false];
        },
        forced: true,
        filter: function (event, player) {
          return player.storage.jlsg_zhidi.reduce((a, b) => a + b) < 4;
        },
        content: function () {
          var candidates = Array.from(Array(4).keys());
          candidates = candidates.filter(c => !player.storage.jlsg_zhidi[c]);
          var candidate = candidates.randomGet();
          player.storage[event.name][candidate] = true;
          game.log(player, `获得了〖制敌〗效果${get.cnNumber(candidate + 1)}`);
          player.addSkill(event.name + (candidate + 1));
          player.markSkill(event.name);
        },
        intro: {
          content: function (storage, player, skill) {
            return '已经获得效果: ' + storage.map((f, i) => f ? i + 1 : null).filter(i => i).reduce((a, b) => a + ' ' + b, '');
          },
          markcount: function (storage, player, skill) {
            return storage.reduce((a, b) => a + b);
          },
        },
      },
      jlsg_zhidi1: {
        sub: true,
        forced: true,
        trigger: {
          source: "damageSource",
        },
        filter: function (event, player) {
          return event.card && event.card.name == 'sha';
        },
        content: function () {
          player.draw();
        }
      },
      jlsg_zhidi2: {
        sub: true,
        trigger: { player: 'useCard' },
        forced: true,
        filter: function (event, player) {
          return event.card.name == 'sha';
        },
        content: function () {
          trigger.directHit.addArray(game.players);
        },
        ai: {
          unequip: true,
          unequip_ai: true,
          directHit_ai: true,
          skillTagFilter: function (player, tag, arg) {
            if (tag === 'directHit_ai') {
              return arg.card.name == 'sha';
            }
            // console.log(tag, arg);
            return arg && arg.card.name == 'sha';
          }
        }
      },
      jlsg_zhidi3: {
        mod: {
          targetInRange: function (card, player) {
            if (card.name == 'sha') return true;
          },
          cardUsable: function (card, player, num) {
            if (card.name == 'sha') return num + player.storage.jlsg_zhidi.reduce((a, b) => a + b);
          },
        }
      },
      jlsg_zhidi4: {
        mod: {
          selectTarget: function (card, player, range) {
            if (card.name != 'sha') return;
            if (range[1] == -1) return;
            range[1] += player.storage.jlsg_zhidi.reduce((a, b) => a + b);
          }
        }
      },
      jlsg_jijun: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        enable: 'phaseUse',
        complexCard: true,
        selectCard: [1, 4],
        check: function (card) {
          var player = _status.event.player;
          var cards = _status.event.player.getExpansions('jlsg_jijun').filter(c => c.suit == get.suit(card, player));
          if (cards.length != 0 && cards[0].number > get.number(card, player)) return -1;
          return get.number(card, player) - get.value(card) + 1;
        },
        filterCard: function (card) {
          var suit = get.suit(card);
          for (var i = 0; i < ui.selected.cards.length; i++) {
            if (get.suit(ui.selected.cards[i]) == suit) return false;
          }
          return true;
        },
        discard: false,
        lose: false,
        // delay: false,
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        marktext: "军",
        intro: {
          content: "expansion",
          markcount: 'expansion',
        },
        content: function () {
          'step 0'
          var suits = cards.map(c => get.suit(c, player));
          event.cards = player.getExpansions(event.name).filter(c => suits.includes(c.suit));
          player.addToExpansion(player, cards, 'give').gaintag.add(event.name);
          'step 1'
          player.gain(event.cards, 'gain2');
          'step 2'
          var list = [];
          for (var name of lib.inpile) {
            var type = get.type(name);
            if (type != 'basic') {
              continue;
            }
            if (lib.filter.cardEnabled({ name: name }, player)) {
              list.push([type, '', name]);
            }
            if (name == 'sha') {
              for (var j of lib.inpile_nature) {
                if (lib.filter.cardEnabled({ name: name, nature: j }, player))
                  list.push([type, '', name, j]);
              }
            }
          }
          var next = player.chooseButton(['集军', [list, 'vcard']]);
          var choice, value = 0;
          for (let [_, __, cardName, nature] of list) { // choose button ai
            let card = { name: cardName, nature: nature }
            let newV = player.getUseValue(card);
            if (newV > value) {
              choice = [cardName, nature];
              value = newV;
            }
          }
          next.filterButton = function (button, player) {
            return true;
          }
          next.ai = function (button) {
            if (!_status.event.choice) {
              return -1;
            }
            return (button.link[2] === _status.event.choice[0] &&
              (button.link[3] || true) === (_status.event.choice[1] || true)) ? 1 : 0;
          }
          next.choice = choice;
          'step 3'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.card = { name: result.links[0][2], nature: result.links[0][3] };
          player.chooseUseTarget(event.card, true, 'nodistance');
        },
        ai: {
          order: 8,
          result: {
            player: 1,
          },
        }
      },
      jlsg_fangtong: {
        audio: "ext:极略/audio/skill:2",
        derivation: ['leiji', 'jlsg_zhoufu', 'jlsg_shendao', 'jlsgsy_biantian'],
        trigger: {
          player: ["addToExpansionAfter", "gainAfter"],
        },
        forced: true,
        filter: function (event, player) {
          if (event.name == 'addToExpansion') {
            if (!event.gaintag.includes('jlsg_jijun')) {
              return false;
            }
          } else {
            var evt = event.getl(player);
            if (!(evt && evt.xs && evt.xs.length > 0)) {
              return false;
            }
          }
          var list = lib.skill.jlsg_fangtong.getValid(player);
          var current = player.additionalSkills.jlsg_fangtong || [];
          return current.length != list.length;
        },
        content: function () {
          var list = lib.skill.jlsg_fangtong.getValid(player);
          player.removeAdditionalSkill(event.name);
          if (list.length) {
            player.addAdditionalSkill(event.name, list);
          }
        },
        getValid(player) {
          var cnt = player.getExpansions('jlsg_jijun').reduce((a, b) => a + b.number, 0);
          var list = [];
          if (cnt >= 9) {
            list.push('leiji');
          }
          if (cnt >= 18) {
            list.push('jlsg_zhoufu');
          }
          if (cnt >= 27) {
            list.push('jlsg_shendao');
          }
          if (cnt >= 36) {
            list.push('jlsgsy_biantian');
          }
          return list;
        },
        group: 'jlsg_fangtong2',
        ai: {
          result: {
            player: 1,
          },
          combo: 'jlsg_jijun',
        }
      },
      jlsg_fangtong2: {
        audio: 'jlsg_fangtong',
        trigger: { player: 'phaseJieshuBegin' },
        forced: true,
        filter: function (event, player) {
          return player.additionalSkills.jlsg_fangtong
            && player.additionalSkills.jlsg_fangtong.length > player.countCards('h');
        },
        content: function () {
          player.drawTo(player.additionalSkills.jlsg_fangtong.length);
        },
      },
      jlsg_jinzhi: {
        audio: "ext:极略/audio/skill:2",
        intro: {
          content: function (storage, player, skill) {
            if (!storage?.length) return "";
            return '本轮使用了' + storage.reduce((a, b) => a + ' ' + get.translation(b), '');
          },
        },
        enable: 'chooseToUse',
        hiddenCard: function (player, name) {
          if (['basic', 'trick'].includes(get.type(name)) && lib.inpile.includes(name)
            && player.countCards('h') && !player.getStorage('jlsg_jinzhi').includes(name) && player.getStorage('jlsg_jinzhi').length < 4) return true;
        },
        filter: function (event, player) {
          let hs = player.getCards("h"),
            storage = player.getStorage('jlsg_jinzhi');
          if (!hs.length || storage.length >= 4) return false;
          for (let i of lib.inpile) {
            if (storage.includes(i)) continue;
            let type = get.type2(i);
            if (type != 'basic' && type != 'trick') continue;
            let cardx = get.autoViewAs({ name: i }, hs)
            if (event.filterCard && typeof event.filterCard == "function") {
              if (event.filterCard(cardx, player, event)) return true;
            }
          };
          return false;
        },
        chooseButton: {
          dialog: function (event, player) {
            let hs = player.getCards("h"),
              list = [];
            for (let i = 0; i < lib.inpile.length; i++) {
              let name = lib.inpile[i];
              if (player.getStorage('jlsg_jinzhi').includes(name)) continue;
              let cardx = get.autoViewAs({ name: name }, hs);
              if (name == 'sha') {
                if (event.filterCard(cardx, player, event)) list.push(['基本', '', 'sha']);
                for (var j of lib.inpile_nature) {
                  cardx = get.autoViewAs({ name: "sha", nature: j }, hs);
                  if (event.filterCard(cardx, player, event)) list.push(['基本', '', 'sha', j]);
                }
              }
              else if (get.type(name) == 'trick' && event.filterCard(cardx, player, event)) list.push(['锦囊', '', name]);
              else if (get.type(name) == 'basic' && event.filterCard(cardx, player, event)) list.push(['基本', '', name]);
            }
            return ui.create.dialog('锦织', [list, 'vcard']);
          },
          filter: function (button, player) {
            return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
          },
          check: function (button) {
            var player = _status.event.player;
            var storage = player.getStorage('jlsg_jinzhi');
            if (player.countCards('h', button.link[2]) > 0 && storage.length < player.countCards('h')) return 0;
            if (['wugu', 'zhulu_card'].includes(button.link[2])) return 0;
            var effect = player.getUseValue({
              name: button.link[2],
              nature: button.link[3],
            });
            if (get.tag({ name: button.link[2] }, 'draw')) effect += 2;
            return effect;
          },
          backup: function (links, player) {
            return {
              filterCard: true,
              audio: 'jlsg_jinzhi',
              popname: true,
              check: () => 1,
              selectCard: -1,
              viewAs: {
                name: links[0][2],
                nature: links[0][3],
                cards: player.getCards("h"),
              },
              onuse: function (result, player) {
                result.cards = player.getCards("h");
                result.card.cards = player.getCards("h");
                player.addTempSkill('jlsg_jinzhi2', 'roundStart');
                player.markAuto('jlsg_jinzhi', [result.card.name]);
              },
            }
          },
          prompt: function (links, player) {
            var card = get.translation({ name: links[0][2], nature: links[0][3] });
            var str = '将所有手牌当做' + card + '使用';
            if (player.getStorage('jlsg_jinzhi').length) {
              str += `,然后摸${get.cnNumber(player.getStorage('jlsg_jinzhi').length)}张牌`;
            }
          }
        },
        ai: {
          order: 1,
          respondShan: true,
          respondSha: true,
          skillTagFilter: function (player, tag, arg) {
            if (arg && arg.name && player.getStorage('jlsg_jinzhi').includes(arg.name)) return false;
            return player.countCards('h') && player.getStorage('jlsg_jinzhi').length < 4;
          },
          result: {
            player: function (player) {
              if (_status.event.dying) return get.attitude(player, _status.event.dying);
              return 1;
            }
          }
        }
      },
      jlsg_jinzhi2: {
        sourceSkill: "jlsg_jinzhi",
        onremove: ["jlsg_jinzhi"],
        trigger: { player: ['useCardAfter', 'respondAfter'] },
        forced: true,
        charlotte: true,
        popup: false,
        filter: function (event, player) {
          return event.skill == 'jlsg_jinzhi_backup';
        },
        content: function () {
          var index = player.storage.jlsg_jinzhi?.length || 0;
          if (index > 0) player.draw(index);
        },
      },
      jlsg_yuyou: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'gainAfter',
          global: 'loseAsyncAfter',
        },
        forced: true,
        filter: function (event, player) {
          if (!event.getg || !event.getg(player)) return false;
          return event.getg(player).length > 1;
        },
        async content(event, trigger, player) {
          const cards = trigger.getg(player);
          const { result: chooseCard } = await player.chooseCard('鱼忧：选择一张牌保留', true)
            .set("filterCard", (card, player) => get.event("cardx").includes(card))
            .set("ai", card => get.useful(card, get.player()))
            .set("cardx", cards);
          let cards2 = cards.slice()
          if (chooseCard.bool) {
            cards.remove(chooseCard.cards[0]);
            await player.discard(cards);
          }
          if (!cards.length || !game.hasPlayer(p => p.hasSex('male'))) return;
          const { result: chooseTarget } = await player.chooseTarget(`###${get.prompt(event.name)}###令一名男性角色弃置牌或失去体力`)
            .set("filterTarget", (_, player, target) => target.hasSex("male"))
            .set("ai", target => {
              const player = get.player();
              return get.effect(target, { name: "losehp" }, player, player) + get.effect(target, { name: "guohe_copy2" }, player, player);
            })
          if (!chooseTarget.bool || !chooseTarget.targets) return;
          const { targets: [target] } = chooseTarget;
          player.line(target);
          if (!['nei', 'rYe', 'bYe'].includes(player.identity) && target.ai.shown > player.ai.shown) {
            player.addExpose(0.2);
          }
          const { result } = await target.chooseToDiscard('he', `弃置${get.cnNumber(cards.length)}张牌，或者失去1点体力`, [cards.length, cards.length])
            .set('eff', lib.jlsg.getLoseHpEffect(target) * 3 / cards.length)
            .set('ai', c => get.unuseful(c) - _status.event.eff);
          if (!result.bool) await target.loseHp(1);
        },
      },
      jlsg_huituo: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['phaseZhunbeiBegin'] },
        init: function (player) {
          player.storage.jlsg_huituo = Array.from({ length: 4 }, () => true);
        },
        filter: function (event, player) {
          return player.storage.jlsg_huituo?.some(i => i === true);
        },
        async cost(event, trigger, player) {
          let choiceList = [
            `令一名角色回复体力至全场唯一最多`,
            `令一名角色摸牌至全场唯一最多`,
            `选择一名角色，系统为该角色的每个空装备栏选择一张装备牌，然后该角色使用之`,
            `令其他一名角色获得技能〖恢拓〗`,
          ];
          if (game.filterPlayer().every(current => current.hasSkill("jlsg_huituo", null, false, false))) choiceList = choiceList.slice(0, -1);
          let list = choiceList.filter((v, i) => player.storage.jlsg_huituo[i]);
          if (!list.length) return;
          let choiseTarget, target1, eff = [null, 0];
          for (let i of list) {
            switch (choiceList.indexOf(i)) {
              case 0:
                target1 = game.findPlayer(current => current.isMaxHp());
                for (let current of game.filterPlayer()) {
                  if (current.hp == target1.hp) continue;
                  let currentEff = get.recoverEffect(current, player, player);
                  if (currentEff > eff[1]) {
                    choiseTarget = current;
                    eff = [0, currentEff];
                  }
                };
                break;
              case 1:
                target1 = game.findPlayer(current => current.isMaxHandcard());
                for (let current of game.filterPlayer()) {
                  if (current.countCards("h") == target1.countCards("h")) continue;
                  let currentEff = get.effect(current, { name: "draw" }, player, player);
                  if (currentEff > eff[1]) {
                    choiseTarget = current;
                    eff = [1, currentEff];
                  }
                };
                break;
              case 2:
                for (let current of game.filterPlayer()) {
                  const emptySlots = (Array.from({ length: 5 }, (v, i) => i + 1).reduce((sum, type) => sum + current.countEmptySlot(type), 0));
                  if (emptySlots == 0) continue;
                  let currentEff = get.attitude(player, current) * emptySlots;
                  if (currentEff > eff[1]) {
                    choiseTarget = current;
                    eff = [2, currentEff];
                  }
                };
                break;
              case 3:
                for (let current of game.filterPlayer()) {
                  if (current.hasSkill("jlsg_huituo", null, false, false)) continue;
                  let currentEff = get.attitude(player, current) > 1 ? get.attitude(player, current) * 3 : 0;
                  if (currentEff > eff[1]) {
                    choiseTarget = current;
                    eff = [3, currentEff];
                  }
                };
                break;
            };
          };
          const { result: result1 } = await player.chooseTarget(get.prompt("jlsg_huituo"))
            .set("prompt2", list.map((v, i) => `${i + 1}.${v}`).join("<br>"))
            .set("filterTarget", (_, player, target) => {
              const choice = get.event("choice");
              if (choice.length == 1 && choice[0].includes("恢拓")) return !target.hasSkill("jlsg_huituo", null, false, false);
              return true;
            })
            .set("ai", target => target == get.event("choiseTarget"))
            .set("choice", list)
            .set("choiseTarget", choiseTarget)
          if (!result1?.bool || !result1?.targets?.length) return;
          const { targets: [target] } = result1,
            [choice] = eff;
          choiceList = [
            `令${get.translation(target)}回复体力至全场唯一最多`,
            `令${get.translation(target)}摸牌至全场唯一最多`,
            `系统为${get.translation(target)}的每个空装备栏选择一张装备牌，然后其使用之`,
            `令${get.translation(target)}获得技能〖恢拓〗`,
          ];
          if (target.hasSkill("jlsg_huituo", null, false, false)) choiceList = choiceList.slice(0, -1);
          list = choiceList.filter((v, i) => player.storage.jlsg_huituo[i]);
          const { result: result2 } = await player.chooseControlList(list, true)
            .set("ai", () => get.event("choice") || Math.floor(get.event().getRand() * get.event().controls.length + 1))
            .set("choice", (function () {
              const num = list.indexOf(choiceList[choice])
              return num > -1 ? num : undefined;
            })());
          const num = choiceList.indexOf(list[result2?.index]);
          event.result = {
            bool: num > -1,
            targets: result1.targets,
            cost_data: { choice: num },
          };
        },
        async content(event, trigger, player) {
          const { cost_data: { choice }, targets: [target] } = event;
          player.storage.jlsg_huituo[choice] = false;
          switch (choice) {
            case 0:
              await target.recoverTo(game.findPlayer(current => current.isMaxHp())?.hp + 1);
              break;
            case 1:
              await target.drawTo(game.findPlayer(current => current.isMaxHandcard())?.countCards("h") + 1);
              break;
            case 2:
              let num = 0;
              while (num < 5) {
                num++
                if (!target.hasEmptySlot(num)) continue;
                const card = get.cardPile(function (card) {
                  return get.subtype(card) == "equip" + num && target.canUse(card, target);
                });
                if (card) await target.chooseUseTarget(card, true, "nopopup");
              };
              break;
            case 3:
              await target.addSkills("jlsg_huituo");
              break;
          };
        },
      },
      jlsg_xingshuai: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageEnd' },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2(event.name), lib.filter.notMe).set('ai', function (target) {
            var player = _status.event.player;
            if (get.attitude(player, target) > 0) {
              return 5 + (target.isTurnedOver() ? 1 : 0);
            } else {
              return 3 + (target.isTurnedOver() ? -4 : 0);
            }
          });
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          var target = result.targets[0];
          event.target = target;
          var choice;
          if (get.attitude(target, player) >= 0) {
            choice = target.isTurnedOver() && _status.currentPhase != target;
          } else {
            choice = target.isTurnedOver() || _status.currentPhase == target || Math.random() < 0.3;
          }
          target.chooseBool(`###是否翻面？###否则${get.translation(player)}在此回合结束后进行一个额外的回合`, choice);
          'step 2'
          if (result.bool) {
            if (!target.isTurnedOver() && target.ai.shown > player.ai.shown) {
              target.addExpose(0.3);
            }
            target.turnOver();
          } else {
            player.insertPhase();
          }
        },
        ai: {
          maixie: true,
          maixie_hp: true
        }
      },
      jlsg_zhanjue: {
        audio: "ext:极略/audio/skill:2",
        group: ["zhanjue", "zhanjue4"],
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        direct: true,
        filter: function (event, player) {
          var evt = event.getl(player);
          if (!evt || evt.player != player) return false;
          if (evt.hs && evt.hs.length > 0 && !player.countCards('h')) return true;
          if (evt.es && evt.es.length > 0) {
            return !player.countCards('e') || event.name == 'equip' && !player.countCards('e', c => c != event.card);
          }
          if (evt.js && evt.js.length > 0 && !player.countCards('j')) return true;
          return false;
        },
        content: function () {
          'step 0'
          player.chooseTarget(`###${get.prompt(event.name)}###对一名角色造成1点伤害`)
            .set('ai', function (target) {
              return get.damageEffect(target, _status.event.player, _status.event.player);
            });
          'step 1'
          if (result.bool) {
            player.logSkill(event.name, result.targets);
            result.targets[0].damage();
          }
        },
      },
      jlsg_yanzhu: {
        audio: "ext:极略/audio/skill:2",
        usable: 3,
        enable: 'phaseUse',
        filterTarget: true,
        intro: {
          content: 'mark',
          name2: '宴诛',
        },
        content: function () {
          'step 0'
          target.addMark(event.name);
          var cnt1 = target.countMark(event.name);
          var cnt2 = game.countPlayer(p => p.countMark(event.name) == cnt1);
          switch (cnt1) {
            case 1:
              target.draw(player, cnt2);
              break;
            case 2:
              target.chooseToDiscard(cnt2, 'he', true);
              break;
            case 3:
              target.damage(cnt2);
              break;
          }
        },
        ai: {
          order: 4,
          result: {
            target: function (player, target) {
              var cnt = target.countMark('jlsg_yanzhu');
              switch (cnt) {
                case 0:
                  return 0.8 + 0.4 * Math.random();
                  break;
                case 1:
                  return -1.2 + 0.4 * Math.random();
                  break;
                case 2:
                  return -2.2 + 0.4 * Math.random();
                  break;
              }
            },
            player: function (player, target) {
              return 2.5;
            }
          },
        }
      },
      jlsg_xingxue: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'phaseJieshuBegin'
        },
        direct: true,
        content: function () {
          'step 0'
          player.chooseTarget(get.prompt2(event.name))
            .set('ai', function (target) {
              var player = _status.event.player;
              return get.attitude(player, target) * (Math.min(target.maxHp, target.countCards('h') + target.countMark('jlsg_yanzhu')) - target.countCards('h'))
                + get.attitude(player, player) * Math.max(0, target.countCards('h') + target.countMark('jlsg_yanzhu') - target.maxHp);
            });
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          var target = result.targets[0];
          event.target = target;
          if (target.ai.shown > player.ai.shown) {
            player.addExpose(0.1);
          }
          target.draw(player, target.countMark('jlsg_yanzhu'));
          'step 2'
          if (target.countCards('h') > target.maxHp) {
            if (target == player) {
              event.goto(4);
              return;
            }
            target.chooseCard(`请选择手牌交给${get.translation(player)}`, target.countCards('h') - target.maxHp, true)
              .set('ai', function (card) {
                var player = _status.event.player, target = _status.event.target;
                return -get.value(card, player) * get.attitude(player, player)
                  + get.value(card, target) * get.attitude(player, target);
              }).set('target', player)
          } else {
            target.removeMark('jlsg_yanzhu', Infinity)
            event.finish();
          }
          'step 3'
          if (result.bool) {
            player.gain(target, result.cards, 'giveAuto');
          }
          'step 4'
          target.removeMark('jlsg_yanzhu', Infinity)

        },
      },
      jlsg_taoluan: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: 'useCardToPlayered',
        },
        init: function (player) {
          player.storage.jlsg_taoluan2 = [];
        },
        filter: function (event, player) {
          if (!event.isFirstTarget) {
            return false;
          }
          if (game.countPlayer(p => p.isDying())) {
            return false;
          }
          var type = get.type(event.card);
          if (!['basic', 'trick'].includes(type)) {
            return false;
          }
          if (lib.card[event.card.name].notarget) {
            return false;
          }
          if (!player.countDiscardableCards(player, 'he')) {
            return false;
          }
          return lib.skill.jlsg_taoluan.getPile(player, type).filter(c => c != event.card.name).length != 0;
        },
        direct: true,
        content: function () {
          'step 0'
          var maxEffect = -Infinity, maxCardName = null;
          {
            var type = get.type(trigger.card);
            for (let cardName of lib.skill.jlsg_taoluan.getPile(player, type)) {
              let card = { ...trigger.card, name: cardName };
              let effect = 0;
              for (let t of trigger.targets) {
                // ai is so stupid
                if (t == trigger.player && cardName == 'shunshou') {
                  continue;
                }
                if (t.isHealthy() && cardName == 'tao') {
                  continue;
                }
                effect += get.effect(t, card, trigger.player, player);
              }
              if (effect > maxEffect) {
                maxEffect = effect;
                maxCardName = cardName;
              }
            }
            for (let t of trigger.targets) {
              maxEffect -= get.effect(t, trigger.card, trigger.player, player);
            }
            if (maxCardName === trigger.card.name) {
              maxCardName = null;
              maxEffect = -Infinity
            }
          }
          var prompt = `###${get.prompt(event.name, trigger.player)}###${get.translation(trigger.player)}对${trigger.targets.map(p => get.translation(p)).join('、')}使用了${lib.translate[trigger.card.name]}`;
          player.chooseToDiscard('he', get.prompt2(event.name, trigger.player))
            .set("ai", function (card) {
              return _status.event.effect - get.value(card) * 2 - 2;
            })
            .set('effect', maxEffect)
            .set('logSkill', [event.name, trigger.player]);
          event.maxCardName = maxCardName;
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          for (let p of trigger.targets) {
            if (p.ai.shown > player.ai.shown) {
              player.addExpose(0.15);
            }
          }
          var type = get.type2(trigger.card);
          var dialog = lib.skill.jlsg_taoluan.getPile(player, type).filter(c => c != trigger.card.name);
          dialog = dialog.map(i => [type, '', i]);
          player.chooseButton(['滔乱', [dialog, 'vcard']], true).set("ai", function (button) {
            return button.link[2] == _status.event.choice;
          }).set('choice', event.maxCardName);
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          var name = result.links[0][2];
          player.popup(name);
          game.log(player, "将", trigger.card, "改为", { ...trigger.card, name });
          trigger.card.name = name;
          trigger.effectCount = get.info(trigger.card, false).effectCount || 1;
          trigger.excluded = [];
          trigger.directHit = [];
          trigger.card.storage = {};
          trigger.baseDamage = 1;
          trigger.extraDamage = 0;
          player.addTempSkill('jlsg_taoluan2', 'roundStart');
          player.markAuto('jlsg_taoluan2', [name]);
        },
        getPile(player, type) {
          return lib.inpile
            .filter(c => type == get.type(c) &&
              !lib.card[c].complexSelect &&
              !lib.card[c].notarget &&
              lib.card[c].content &&
              !player.getStorage('jlsg_taoluan2').includes(c)
            );
        },
      },
      jlsg_taoluan2: {
        onremove: true,
        intro: {
          content: function (storage, player, skill) {
            return '本轮声明了' + storage.reduce((a, b) => a + ' ' + get.translation(b), '');
          },
        },
      },
      jlsg_shiqiao: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: "phaseEnd",
        },
        filter: function (event, player) {
          if (!ui.cardPile.childNodes.length) {
            return false;
          }
          return event.player.getHistory('useCard', e => e.card.name == 'sha').length != 0;
        },
        frequent: true,
        content: function () {
          var cnt = trigger.player.getHistory('useCard', e => e.card.name == 'sha').length;
          var cards = Array.from(ui.cardPile.childNodes).randomGets(cnt);
          player.gain(cards, 'gain2');
        },
        ai: {
          threaten: 0.2,
        }
      },
      jlsg_yingge: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: "phaseUseBegin",
        },
        filter: function (event, player) {
          return player.countCards('h');
        },
        direct: true,
        content: function () {
          "step 0"
          let target = trigger.player;
          let num1 = target.getCardUsable('sha');
          let validCardsNumber = new Set(player.getDiscardableCards(player, 'h').map(c => c.number));
          let hasEnemy = game.hasPlayer(p => get.attitude(target, p) < 0);
          let att = get.attitude(player, target) / get.attitude(player, player);
          let valueMap = {};
          for (let num of validCardsNumber) {
            // console.log(`${get.translation(target.name)} @ ${num}`);
            let shaCount = target.countCards('h') * (14 - num) / 13;
            if (target == player || player.hasSkillTag('viewHandcard', null, target, true)) {
              shaCount = target.countCards('h', c => get.number(c) >= num);
            }
            if (shaCount > num + num1) {
              shaCount = num + num1;
            }
            let disCount = target.countCards('h') - shaCount;
            let disValue = -disCount * att / 3 * 2;
            if (disCount > target.getHandcardLimit()) {
              disValue += -(disCount - target.getHandcardLimit()) * att / 3 * 2;
            }
            // console.log("disable value:", disValue);
            let shaValue = (1 / 3 + att) * shaCount;
            // console.log("sha value:", shaValue);
            valueMap[num] = disValue + shaValue;
          }
          player.chooseToDiscard(get.prompt2(event.name, target))
            .set("logSkill", [event.name, target])
            .set("ai", function (card) { return -get.value(card) / 2 + _status.event.valueMap[card.number]; })
            .set("valueMap", valueMap);
          "step 1"
          if (!result.bool) {
            event.finish();
            return;
          }
          trigger.player.storage.jlsg_yingge2 = result.cards[0].number;
          trigger.player.addTempSkill("jlsg_yingge2", "phaseUseAfter");
        },
        ai: {
          expose: 0.1,
          threaten: 0.4,
        },
      },
      jlsg_yingge2: {
        sourceSkill: "jlsg_yingge",
        mark: true,
        intro: {
          name: "莺歌",
          content: function (event, player) {
            return `圣数：<b>${Number(player.storage.jlsg_yingge2)}`;
          },
        },
        mod: {
          cardEnabled: function (card, player) {
            let number = get.number(card, player);
            if (!number || typeof number != "number") return;
            if (get.is.virtualCard(card) || get.is.convertedCard(card)) return;
            if (number < Number(player.storage.jlsg_yingge2)) return false;
          },
          cardSavable: function (card, player) {
            let number = get.number(card, player);
            if (!number || typeof number != "number") return;
            if (get.is.virtualCard(card) || get.is.convertedCard(card)) return;
            if (number < Number(player.storage.jlsg_yingge2)) return false;
          },
          cardname: function (card, player, name) {
            let number = get.number(card, player);
            if (!number || typeof number != "number") return;
            if (number >= Number(player.storage.jlsg_yingge2)) return 'sha';
          },
          cardUsable: function (card, player, num) {
            if (get.name(card, player) == 'sha') return num + Number(player.storage.jlsg_yingge2);
          },
          attackRange: function (player, num) {
            return num + Number(player.storage.jlsg_yingge2);
          },
        },
      },
      jlsg_kuangbi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'useCard2' },
        direct: true,
        filter: function (event, player) {
          var type = get.type(event.card);
          if (type != 'basic' && type != 'trick') {
            return false;
          };
          if (player.hasSkill('jlsg_kuangbi2')) {
            return false;
          }
          var targets = event.targets || [];
          if (targets.length > 0) return true;
          var info = get.info(event.card);
          if (info.allowMultiple == false) return false;
          return game.filterPlayer(
            current => !targets.includes(current) &&
              lib.filter.targetEnabled2(event.card, event.player, current) &&
              lib.filter.targetInRange(event.card, event.player, current)
          ).length;
        },
        content: function () {
          'step 0'
          var prompt2 = '为' + get.translation(trigger.card) + '增加或减少一个目标'
          player.chooseTarget(get.prompt(event.name), function (card, player, target) {
            var user = _status.event.user;
            if (_status.event.targets.includes(target)) return true;
            return lib.filter.targetEnabled2(_status.event.card, user, target) && lib.filter.targetInRange(_status.event.card, user, target);
          }).set('prompt2', prompt2).set('ai', function (target) {
            var trigger = _status.event.getTrigger();
            var user = _status.event.user;
            var player = _status.event.player;
            return get.effect(target, trigger.card, user, player) * (_status.event.targets.includes(target) ? -1 : 1) - 3;
          }).set('targets', trigger.targets).set('card', trigger.card).set('user', trigger.player);
          'step 1'
          if (result.bool) {
            if (!event.isMine() && !event.isOnline()) game.delayx();
            event.targets = result.targets;
          }
          else {
            event.finish();
          }
          'step 2'
          player.logSkill(event.name, event.targets);
          for (let p of event.targets) {
            if (player.ai.shown < p.ai.shown) {
              player.addExpose(0.15);
            }
          }
          player.addTempSkill('jlsg_kuangbi2');
          if (trigger.targets.includes(event.targets[0])) trigger.targets.removeArray(event.targets);
          else trigger.targets.addArray(event.targets);
        },
        ai: {
          threaten: 4,
        },
      },
      jlsg_kuangbi2: {},
      jlsg_taoxi: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        enable: 'phaseUse',
        content: function () {
          'step 0'
          player.addTempSkill('jlsg_taoxi2', 'phaseUseAfter');
          event.targets = game.filterPlayer(p => p != event.player);
          event.targets.sortBySeat();
          'step 1'
          event.target = event.targets.shift();
          player.gainPlayerCard(event.target, 'h', true).set('delay', false);
          'step 2'
          if (result.bool) {
            var arr = player.storage.jlsg_taoxi2.get(event.target) || [];
            arr.addArray(result.cards);
            if (!game.online) {
              player.addGaintag(arr, 'jlsg_taoxi');
            }
            player.storage.jlsg_taoxi2.set(event.target, arr);
            game.delayx(0.3);
          }
          if (event.targets.length) {
            event.goto(1);
          }
          'step 3'
          var cards = Array.from(player.storage.jlsg_taoxi2.values()).flat();
          if (game.online) {
            player.addGaintag(cards, 'jlsg_taoxi');
          }
        },
        ai: {
          order: 10,
          result: { player: 1 },
        }
      },
      jlsg_taoxi2: {
        init: function (player) {
          player.storage.jlsg_taoxi2 = new Map();
        },
        onremove: function (player) {
          player.storage.jlsg_taoxi2 = null;
        },
        forced: true,
        trigger: { player: 'phaseUseEnd' },
        filter: function (event, player) {
          return player.storage.jlsg_taoxi2.size;
        },
        content: function () {
          'step 0'
          let { value, done } = player.storage.jlsg_taoxi2.entries().next();
          if (done) {
            return;
          }
          event.redo();
          let [p, cards] = value;
          player.storage.jlsg_taoxi2.delete(p);
          let hs = player.getCards('h');
          cards = cards.filter(c => hs.includes(c));
          if (!cards.length || !p.isIn()) {
            return;
          }
          p.gain(cards, player, false);
          player.$giveAuto(cards, p);
          game.delayx(0.3);
          'step 1'
          player.removeGaintag(event.name);
          player.removeSkill(event.name);
        },
      },
      jlsg_huaibi: {
        audio: "ext:极略/audio/skill:2",
        marktext: '玺',
        intro: {
          content: 'expansion',
          markcount: function (storage, player) {
            return;
            let cards = player.getExpansions('jlsg_huaibi');
            if (cards.length == 1) {
              let suit = get.translation(cards[0].suit);
              return `<span style="font-size: 1.4em;">${suit}</span>`;
            }
          }
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        trigger: {
          player: ['enterGame', 'phaseJieshuBegin'],
          global: 'phaseBefore',
        },
        forced: true,
        filter: function (event, player) {
          if (event.name == false && game.phaseNumber != 0) {
            return false;
          }
          return !player.getExpansions('jlsg_huaibi').length;
        },
        content: function () {
          'step 0'
          player.draw(2);
          'step 1'
          if (!player.countCards('h')) {
            event.finish();
            return;
          }
          player.chooseCard(true).set('prompt2', '置于武将牌上作为「玺」');
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.addToExpansion(result.cards, 'give').gaintag.add(event.name);
        },
        group: 'jlsg_huaibi2',
      },
      jlsg_huaibi2: {
        audio: 'jlsg_huaibi',
        trigger: { target: 'useCardToBefore' },
        forced: true,
        filter: function (event, player) {
          if (event.player == player) {
            return false;
          }
          if (event.card.name != 'sha' && get.type(event.card) != 'trick') {
            return false;
          }
          let expansion = player.getExpansions('jlsg_huaibi');
          let suit = get.suit(event.card);
          return suit && expansion.some(c => c.suit == suit);
        },
        content: function () {
          trigger.cancel();
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              if (!card) return;
              if (player == target) {
                return;
              }
              if (card.name != 'sha' && get.type(card) != 'trick') {
                return;
              }
              let suit = get.suit(card);
              let expansion = target.getExpansions('jlsg_huaibi');
              if (suit && expansion.some(c => c.suit == suit)) {
                return 'zerotarget';
              }
            },
          },
        },

      },
      jlsg_zhixi: {
        audio: "ext:极略/audio/skill:2",
        usable: 1,
        enable: 'phaseUse',
        init(player) {
          player.storage.jlsg_zhixi = [];
        },
        filter: function (event, player) {
          return player.getExpansions('jlsg_huaibi').length;
        },
        filterTarget: function (card, player, target) {
          return target != player;
        },
        content: function () {
          'step 0'
          target.gain('give', player, player.getExpansions('jlsg_huaibi'));
          'step 1'
          if (player.getStorage(event.name).includes(target)) {
            target.loseHp();
          } else {
            target.loseHp(3);
            player.storage[event.name].push(target);
          }
        },
        ai: {
          order: 2,
          result: {
            player: function (player, target) {
              if (player.hasSkill('jlsg_huaibi')) {
                return 1;
              }
            },
            target: function (player, target) {
              let result = get.effect(target, { name: 'losehp' }, player, target)
                / get.attitude(target, target);
              if (player.getStorage('jlsg_zhixi').includes(target)) {
                return result * 2;
              }
              return result;
            },
          }
        },
      },
      jlsg_caijian: {
        audio: "ext:极略/audio/skill:2",
        marktext: '鉴',
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        usable: 1,
        enable: 'phaseUse',
        filterTarget: function (card, player, target) {
          return target.countCards('he');
        },
        delay: false,
        content: function () {
          'step 0'
          player.gainPlayerCard(target, 'visibleMove', true).set('chooseonly', true);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          let card = result.cards[0];
          if (get.color(card, false) == 'black' && !player.getExpansions(event.name).map(c => c.suit).includes(card.suit)) {
            target.turnOver();
          }
          player.addToExpansion(result.cards, target).gaintag.add(event.name);
        },
        ai: {
          order: 6,
          maixie: true,
          maixie_hp: true,
          result: {
            player: function (player, target) {
              if (player.hasSkill('jlsg_zhishix')) {
                return 1;
              }
            },
            target: -1,
          }
        },
        group: 'jlsg_caijian2',
      },
      jlsg_caijian2: {
        audio: 'jlsg_caijian',
        trigger: {
          player: 'damageEnd',
        },
        direct: true,
        content: function () {
          'step 0'
          event.num = trigger.num;
          'step 1'
          if (!event.num) {
            event.finish();
            return;
          }
          --event.num;
          player.chooseTarget(get.prompt2('jlsg_caijian'), (_, player, target) => target.countCards('he')).set("ai", function (target) {
            return 1 - get.attitude(_status.event.player, target);
          });
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.useSkill('jlsg_caijian', false)
            .set('target', result.targets[0])
            .set('targets', result.targets);
          event.goto(1);
        },
      },
      jlsg_zhishix: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        filter: function (event, player) {
          let suits = new Set(
            player.getExpansions('jlsg_caijian')
              .map(c => c.suit)
              .filter(c => c)
          );
          return suits.size >= 3;
        },
        chooseButton: {
          dialog: function (event, player) {
            return ui.create.dialog('智识', player.getExpansions('jlsg_caijian'), 'hidden');
          },
          select: 3,
          filter: function (button, player) {
            return !ui.selected.buttons.map(c => c.suit).includes(button.suit);
          },
          backup: function (links, player) {
            return {
              audio: 'jlsg_zhishix',
              filterCard: function () { return false },
              selectCard: -1,
              delay: false,
              cards: links,
              content: function () {
                'step 0'
                let cards = lib.skill['jlsg_zhishix_backup'].cards;
                player.discard(cards);
                'step 1'
                player.draw(3);
                var list;
                if (_status.characterlist) {
                  list = [];
                  for (var i = 0; i < _status.characterlist.length; i++) {
                    var name = _status.characterlist[i];
                    if (get.character(name, 1) == 'wei') list.push(name);
                  }
                }
                else if (_status.connectMode) {
                  list = get.charactersOL(function (i) {
                    return get.character(i, 1) != 'wei';
                  });
                }
                else {
                  list = get.gainableCharacters(function (info) {
                    return info[1] == 'wei';
                  });
                }
                var players = game.players.concat(game.dead);
                for (var i = 0; i < players.length; i++) {
                  list.remove(players[i].name);
                  list.remove(players[i].name1);
                  list.remove(players[i].name2);
                }
                let character = list.randomGet();
                player.flashAvatar("jlsg_zhishix", character);
                event.character = character;
                'step 2'
                player.addSkills(get.character(event.character)[3]);
              },
              ai: {
                order: 10,
              },
            }
          },
        },
        ai: {
          order: 8,
          result: { player: 1 },
        },
      },
      jlsg_anguo: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseDrawBegin2' },
        filter: function (event, player) {
          return !event.numFixed && event.num > 0;
        },
        async cost(event, trigger, player) {
          event.result = await player.chooseTarget(`###安国：是否少摸一张牌并选择一名角色吗，令其随机使用一张装备牌？###此牌为:武器牌,其摸X张牌（X为此武器牌的攻击范围）;防具或宝物牌,其回复1点体力;坐骑牌,重复此流程.`)
            .set('ai', target => {
              if (get.cardPile(card => get.type(card) == "equip")) return get.attitude(_status.event.player, target);
              else return 0;
            })
            .forResult();
        },
        async content(event, trigger, player) {
          --trigger.num;
          let target = event.targets[0],
            subtypes = {},
            noStop = true,
            cards = Array.from(ui.cardPile.childNodes)
              .concat(Array.from(ui.discardPile.childNodes))
              .filter(i => get.type(i, null, false) == "equip")
              .filter(i => ["c", "d"].includes(get.position(i)));
          if (target.ai.shown > player.ai.shown) player.addExpose(0.2);
          for (const i of cards) {
            let subtype = get.subtype(i);
            subtypes[subtype] = subtypes[subtype] || [];
            subtypes[subtype].add(i);
          };
          while (noStop) {
            noStop = false;
            if (!Object.keys(subtypes).length) {
              await game.delayx();
              break;
            }
            let subtype = Object.keys(subtypes).randomSort().find(i => target.isEmpty(i));
            if (!subtype) subtype = Object.keys(subtypes).randomGet();
            let card = subtypes[subtype].randomRemove();
            if (!card) {
              if (!subtypes[subtype].length) delete subtypes[subtype];
              noStop = true;
              continue;
            }
            await target.gain(card, "gain2");
            if (!target.canUse(card, target)) break;
            await target.chooseUseTarget(card, true).set("nopopup", true);
            if (subtype == "equip1") {
              if (lib.card[card.name].distance) {
                let range = 1 - lib.card[card.name].distance.attackFrom;
                if (range > 0) await target.draw(player, range);
              }
            }
            else if (["equip2", "equip5"].includes(subtype)) await target.recover(player);
            else noStop = true;
          };
        },
      },
      jlsg_quanxiang: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        filter: function (event, player) {
          return !player.hasSkillTag('noCompareSource') && !player.hasSkill('jlsg_quanxiang3');
        },
        filterTarget: function (card, player, target) {
          return player.canCompare(target);
        },
        content: function () {
          'step 0'
          player.chooseToCompare(target);
          'step 1'
          if (result.bool) {
            if (!target.storage.nohp && target.hp) {
              player.addTempSkill('jlsg_quanxiang3', 'phaseUseEnd');
              player.addSkill('jlsg_quanxiang2');
              let evt = target.loseHp(target.hp);
              player.storage.jlsg_quanxiang2 = [target, evt];
            }
          } else {
            player.addMark('jlsg_raoshe', 2);
            if (player.countMark('jlsg_raoshe') >= 7) {
              player.die();
            }
          }
        },
        ai: {
          order: 8,
          result: {
            target: -1,
          },
        },
      },
      jlsg_quanxiang2: {
        sourceSkill: "jlsg_quanxiang",
        trigger: { global: 'dyingAfter' },
        forced: true,
        charlotte: true,
        filter: function (event, player) {
          if (!player.storage.jlsg_quanxiang2) {
            return false;
          }
          return event.player === player.storage.jlsg_quanxiang2[0];
        },
        direct: true,
        content: function () {
          'step 0'
          if (trigger.reason !== player.storage.jlsg_quanxiang2[1]) {
            event.goto(2);
            return;
          }
          trigger.player.recover(trigger.reason.num, player);
          'step 1'
          player.addMark('jlsg_raoshe', 1);
          if (player.countMark('jlsg_raoshe') >= 7) {
            player.die();
          }
          'step 2'
          player.removeSkill(event.name);
        },
      },
      jlsg_quanxiang3: {},
      jlsg_raoshe: {
        intro: {
          name: "饶舌",
          content: "mark",
        },
      },
      jlsg_gushe: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'compare', target: 'compare' },
        filter: function (event, player) {
          return !event.iwhile && player.countMark('jlsg_raoshe');
        },
        forced: true,
        content: function () {
          let cnt = player.countMark('jlsg_raoshe');
          game.log(player, `的拼点牌点数+${cnt}`)
          if (player == trigger.player) {
            trigger.num1 += cnt;
            if (trigger.num1 > 13) trigger.num1 = 13;
          }
          else {
            trigger.num2 += cnt;
            if (trigger.num2 > 13) trigger.num2 = 13;
          }
        },
        group: 'jlsg_gushe2'
      },
      jlsg_gushe2: {
        audio: "jlsg_gushe",
        inherit: "jyzongshi",
        frequent: function (event, player) {
          return this.check(event, player);
        },
      },
      jlsg_jici: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageBegin2' },
        filter: function (event, player) {
          return event.source && event.source != player
            && player.countCards('h') && !player.hasSkillTag('noCompareSource') && !event.source.hasSkillTag('noCompareTarget');
        },
        check: function (event, player) {
          return player.countMark('jlsg_raoshe') < 7 || event.num > 1 || Math.random() < 0.5;
        },
        content: function () {
          'step 0'
          trigger.source.draw(player);
          'step 1'
          if (player.canCompare(trigger.source)) {
            player.chooseToCompare(trigger.source);
          } else {
            event.finish();
          }
          'step 2'
          if (result.bool) {
            trigger.cancel();
          } else {
            trigger.num = 1;
            player.addMark('jlsg_raoshe');
            if (player.countMark('jlsg_raoshe') >= 7) {
              player.die();
            }
          }
        },
      },
      jlsg_hechun: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        selectTarget: -1,
        filterTarget(card, player, target) {
          return target != player;
        },
        multitarget: true,
        multiline: true,
        async content(event, trigger, player) {
          event.targets.sortBySeat();
          const pairs = [];
          for (const target of event.targets) {
            if (!target.countGainableCards(player, 'he')) continue;
            const { result } = await target.chooseToGive(true, player, 'he', `交给${get.translation(player)}一张牌`)
              .set("target", player)
              .set("filterCard", (card, player) => lib.filter.canBeGained(card, get.event("target"), player))
              .set('ai', function (card, cards) {
                let player = get.player();
                let target = get.event("target");
                let num = -get.attitude(player, player) * get.value(card, player) + get.attitude(player, target) * get.value(card, target);
                if (get.color(card, player) == 'black') num -= 15
                if (get.color(card, player) == 'red' && player.isDamaged()) num += 15;
                return num;
              });
            pairs.add([target, get.color(result.cards[0], target)]);
          };
          for (const pair of pairs) {
            const [target, color] = pair;
            if (!color) continue;
            const bool = await player
              .chooseBool(`是否令${get.translation(target)}${color == "red" ? "回复" : "失去"}1点体力？`)
              .set("ai", (event, player) => {
                if (get.event("color") == "red") return get.recoverEffect(target, player, player) > 0;
                else return get.effect(target, { name: "losehp" }, player, player) > 0;
              })
              .set("color", color)
              .forResultBool();
            if (bool) {
              player.line(target, "green");
              await target[color == "red" ? "recover" : "loseHp"]();
            }
            if (!event.isMine() && !event.isOnline()) await game.delayx();
          }
        },
        ai: {
          order: 9,
          threaten: 2,
          result: {
            player: 1,
          },
        },
      },
      jlsg_daiyan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseAfter' },
        direct: true,
        init: function (player) {
          if (!player.storage.jlsg_daiyan) {
            player.storage.jlsg_daiyan = new Map();
          }
        },
        content: function () {
          'step 0'
          let choice = game.filterPlayer().filter(p => get.attitude(player, p) > 0 && p.hp > (player.storage.jlsg_daiyan.get(p) || 0));
          choice = choice.randomGet();
          player.chooseTarget(get.prompt2(event.name))
            .set('choice', choice)
            .set('ai', p => p == _status.event.choice);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.target = result.targets[0];
          player.logSkill(event.name, event.target);
          if (event.target.ai.shown > player.ai.shown) {
            player.addExpose(0.2);
          }
          let cnt = player.storage.jlsg_daiyan.get(event.target) || 0;
          if (cnt) {
            event.target.loseHp(cnt);
          }
          player.storage.jlsg_daiyan.set(event.target, cnt + 1);
          'step 2'
          event.target.insertPhase();
        },
        ai: {
          threaten: 2,
        },
      },
      jlsg_jianying: {
        audio: "ext:极略/audio/skill:2",
        inherit: 'dcjianying',
      },
      jlsg_shibei: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: "damageEnd",
        },
        usable: 1,
        content: function () {
          'step 0'
          player.recover();
          player.addTempSkill('jlsg_shibei2');
          player.storage.jlsg_shibei2 = trigger;
          if (!trigger.card || !player.countCards('hs')) {
            return;
          }
          let card = trigger.card;
          if (card.name != 'jiu' && lib.filter.cardEnabled(card)) {
            if (game.hasPlayer(function (current) {
              return player.canUse(card, current);
            })) {
              game.broadcastAll(card => (lib.skill.jlsg_mozhix.viewAs = card), card);
              var next = player.chooseToUse();
              next.logSkill = 'jlsg_shibei';
              next.set('openskilldialog', '矢北：将一张手牌当' + get.translation(card) + '使用');
              next.set('norestore', true);
              next.set('_backupevent', 'jlsg_mozhix');
              next.set('custom', {
                add: {},
                replace: { window: function () { } }
              });
              next.backup('jlsg_mozhix');
            }
          }
        },
      },
      jlsg_shibei2: {
        audio: 'jlsg_shibei',
        trigger: {
          player: "damageEnd",
        },
        filter(event, player) {
          return event != player.storage.jlsg_shibei2;
        },
        forced: true,
        // locked: false,
        content: function () {
          'step 0'
          player.loseHp();
        },
      },
      jlsg_kuizhu: {
        audio: "ext:极略/audio/skill:2",
        forced: true,
        trigger: { player: 'phaseJieshuBegin' },
        content: function () {
          'step 0'
          let cntAll = game.getGlobalHistory('cardMove', e => e.type === 'discard')
            .reduce((a, b) => a + (b.hs ? b.hs.length : 0) + (b.es ? b.es.length : 0) + (b.js ? b.js.length : 0), 0);
          let cntSelf = player.getHistory('lose', e => e.type === 'discard')
            .reduce((a, b) => a + (b.hs ? b.hs.length : 0) + (b.es ? b.es.length : 0) + (b.js ? b.js.length : 0), 0);
          if (cntAll - cntSelf <= cntSelf) {
            player.loseHp();
            player.draw(game.filterPlayer().length);
            event.finish();
          }
          'step 1'
          player.chooseTarget(true)
            .set('prompt2', '对其造成2点伤害')
            .set('ai', function (target) {
              let player = _status.event.player;
              return get.damageEffect(target, player, player)
            });
          'step 2'
          if (result.bool) {
            let target = result.targets[0]
            if (target.ai.shown > player.ai.shown) {
              player.addExpose(0.2);
            }
            target.damage(2);
          }
        },
      },
      jlsg_chezheng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ['phaseUseAfter'] },
        filter: function (event, player) {
          if (event.skill) {
            return false;
          }
          let evt = event.getParent();
          return evt.name == 'phase' && evt.player == player && evt.phaseList[evt.num] == 'phaseUse';
        },
        direct: true,
        content() {
          'step 0'
          event.choices = [
            '令至多X名角色各弃置一张牌，并各进行一个额外出牌阶段',
            '令至多X名角色各摸一张牌，并各进行一个额外弃牌阶段',
          ];
          player.chooseControlList(get.prompt(event.name), event.choices)
            .set('ai', () => Math.random < 0.5 ? 0 : 1);
          'step 1'
          if (result.control == 'cancel2') {
            event.finish();
            return;
          }
          event.choice = result.index;
          let prompt = `###${get.prompt(event.name)}###${event.choices[result.index]}`;
          let next = player.chooseTarget(prompt, [1, player.hp]);
          if (event.choice == 0) {
            next.filterTarget = function (card, player, target) {
              return target.countCards('he') > 0;
            }
            next.ai = function (target, targets) {
              return get.attitude(_status.event.player, target)
                * (target.countCards('h') - 3);
            }
          } else {
            next.ai = function (target, targets) {
              return get.attitude(_status.event.player, target)
                * (target.getHandcardLimit() - target.countCards('h') + Math.random());
            }
          }
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          event.targets = result.targets;
          event.targets.sortBySeat();
          if (event.choice == 0) {
            event.targets.forEach(
              p => p.chooseToDiscard('he', true).set('delay', false)
            );
          } else {
            game.asyncDraw(event.targets);
          }
          'step 3'
          if (event.choice == 0) {
            event.targets.forEach(
              p => p.phaseUse()
            );
          } else {
            event.targets.forEach(
              p => p.phaseDiscard()
            );
          }
        }
      },
      jlsg_jueyong: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageBegin1' },
        direct: true,
        filter: function (event, player) {
          return !player.hasSkill('jlsg_jueyong2') && event.player.isIn() && event.notLink() && event.card && event.card.name == 'sha'
            && (player.hp != player.maxHp || player.hp != event.player.countCards('h'));
        },
        content() {
          'step 0'
          var choices = [];
          let choice = -1, curEff = -Infinity;
          if (player.hp != trigger.player.countCards('h')) {
            choices.push('体力');
            {
              let diff = Math.min(trigger.player.countCards('h') - player.hp, player.maxHp - player.hp);
              let eff = diff * 2 + Math.abs(diff);
              if (diff < 0) {
                eff -= 2 * trigger.num * get.attitude(player, trigger.player) / get.attitude(player, player);
              }
              // console.log('体力', eff);
              if (eff > 0) {
                choice = 0;
                curEff = eff;
              }
            }
          }
          if (player.maxHp != trigger.player.countCards('h')) {
            choices.push('体力上限');
            if (player.hp <= trigger.player.countCards('h')) {
              let diff = trigger.player.countCards('h') - player.hp;
              let eff = diff / 3 * 2 + Math.abs(diff);
              if (diff < 0) {
                eff -= 2 * trigger.num * get.attitude(player, trigger.player) / get.attitude(player, player);
              }
              // console.log('体力上限', eff);
              if (eff > 0 && eff > curEff) {
                choice = choices.length - 1;
              }
            }
          }
          choices.push('cancel2');

          if (choice == -1) {
            choice = choices.length - 1;
          }
          player.chooseControl(choices)
            .set('prompt', get.prompt2(event.name))
            .set('choice', choice);
          'step 1'
          if (result.control == 'cancel2') {
            event.finish();
            return;
          }
          player.logSkill(event.name, trigger.player);
          player.addTempSkill('jlsg_jueyong2');
          if (result.control == '体力') {
            game.log(player, '将体力调整至', trigger.player.countCards('h'));
            event.diff = trigger.player.countCards('h') - player.hp;
            player.changeHp(event.diff);
          } else {
            event.diff = trigger.player.countCards('h') - player.maxHp;
            if (event.diff > 0) {
              player.gainMaxHp(event.diff);
            } else {
              player.loseMaxHp(-event.diff);
            }
          }
          'step 2'
          if (player.hp <= 0 && player.maxHp > 0) {
            game.delayx();
            event._dyinged = true;
            player.dying(event);
          }
          'step 3'
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
          name: 'sha',
          isCard: true,
          storage: { jlsg_choujue: true }
        },
        enable: 'phaseUse',
        filterCard: function () { return false },
        selectCard: -1,
        precontent() {
          'step 0'
          let cnt = Math.max(1, Math.floor(player.maxHp / 2));
          player.loseMaxHp(cnt);
          event.getParent().addCount = false;
        },
        mod: {
          cardUsable: function (card) {
            if (card.storage && card.storage.jlsg_choujue) return Infinity;
          },
        },
        group: 'jlsg_choujue2',
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
        trigger: { source: 'damageBegin2' },
        filter(event, player) {
          return event.card && event.card.storage && event.card.storage.jlsg_choujue;
        },
        content() {
          for (let s of player.skills) {
            let info = get.skillInfoTranslation(s, player);
            if (!info || !info.includes('出牌阶段限一次')) {
              continue;
            }
            let ss = game.expandSkills([s]);
            for (let s of ss) {
              let uses = player.getStat('skill');
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
      jlsg_juzhan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseUseBegin" },
        filter(event, player) {
          return event.player != player;
        },
        check(event, player) {
          player.isDamaged() && get.attitude(player, event.player) < 0 && Math.random() < 0.6;
        },
        logTarget: "player",
        async content(event, trigger, player) {//🔥佬提供
          if (player.getDamagedHp() > 0) await player.draw(player.getDamagedHp());
          const card = get.autoViewAs({ name: "sha", isCard: true }, []);
          await trigger.player.useCard(card, player, "noai", false);
          if (player.hasHistory("damage", evt => evt.getParent(3) == event) && player.getDamagedHp()) {
            const { result } = await trigger.player.chooseToDiscard(Math.min(5, player.getDamagedHp()), "he")
              .set("prompt", `${get.translation(player)}对你发动了【拒战】，请弃置${player.getDamagedHp()}张牌`)
              .set("prompt2", "否则跳过出牌阶段")
              .set("ai", card => get.value(card) < 6);
            if (!result.cards || !result.cards[0]) {
              trigger.cancel();
              game.log(trigger.player, "跳过了出牌阶段");
            }
          }
        },
        ai: {
          "maixue_hp": true,
        }
      },
      jlsg_zuilun: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseJieshuBegin' },
        forced: true,
        content() {
          'step 0'
          var evts = player.getHistory('lose', e => e.type == 'discard');
          if (!evts.length) {
            player.draw(4);
            event.goto(2);
          } else {
            player.chooseTarget(lib.filter.notMe, true)
              .set('prompt2', '令其摸四张牌')
              .set('ai', p => get.attitude(_status.event.player, p) + Math.random());
          }
          'step 1'
          if (result.bool) {
            player.line(result.targets[0]);
            result.targets[0].draw(4, player);
          }
          'step 2'
          var evts = game.getGlobalHistory('changeHp', e => e.player == player && e.getParent().name == 'recover');
          if (!evts.length) {
            player.loseHp();
            event.goto(4);
          } else {
            player.chooseTarget(lib.filter.notMe, true)
              .set('prompt2', '令其失去1点体力')
              .set('ai', p => get.attitude(_status.event.player, p) * jlsg.getLoseHpEffect(p));
          }
          'step 3'
          if (result.bool) {
            player.line(result.targets[0]);
            result.targets[0].loseHp();
          }
          'step 4'
          if (!player.isIn()) {
            event.finish();
            return;
          }
          var evts = player.getHistory('sourceDamage');
          if (!evts.length) {
            player.loseMaxHp();
            event.finish();
          } else {
            player.chooseTarget(lib.filter.notMe, true)
              .set('prompt2', '令其减1点体力上限')
              .set('ai', p => get.attitude(_status.event.player, p) * (p.isHealthy() ? -1 : -0.4) + Math.random() * 2);
          }
          'step 5'
          if (result.bool) {
            player.line(result.targets[0]);
            result.targets[0].loseMaxHp();
          }
        }
      },
      jlsg_fuzhi: {
        audio: "ext:极略/audio/skill:2",
        animationColor: 'thunder',
        skillAnimation: true,
        juexingji: true,
        trigger: { player: 'phaseZhunbeiBegin' },
        forced: true,
        filter(event, player) {
          return player.hp == 1;
        },
        derivation: ['jlsg_yaozhi', 'jlsg_xingyun'],
        content() {
          'step 0'
          player.awakenSkill('jlsg_fuzhi');
          player.gainMaxHp();
          player.recover();
          'step 1'
          player.changeSkills(['jlsg_yaozhi', 'jlsg_xingyun'], ['jlsg_zuilun']);
        }
      },
      jlsg_jiejun: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "useCardAfter" },
        filter(event, player) {
          return event.player != player
            && _status.currentPhase != player
            && get.color(event.card, event.player) == 'red';
        },
        direct: true,
        content() {
          "step 0"
          player.chooseToUse({
            logSkill: "jlsg_jiejun",
            preTarget: trigger.player,
            prompt: `截军：是否对${get.translation(trigger.player)}使用一张【杀】？`,
            prompt2: `若此【杀】造成伤害，你获得其所有牌`,
            filterCard: function (card, player) {
              return get.name(card) == 'sha' && lib.filter.filterCard.apply(this, arguments);
            },
            filterTarget: function (card, player, target) {
              return target == _status.event.preTarget && lib.filter.targetEnabled.apply(this, arguments);
            },
            addCount: false,
          });
          "step 1"
          if (!result.bool) {
            event.finish();
            return;
          }
          let evts = player.getHistory('sourceDamage', function (evt) {
            return evt.getParent(4) == event;
          })

          if (evts.length) {
            player.gain(trigger.player, trigger.player.getGainableCards(player, 'he'), 'giveAuto');
          }
        }
      },
      jlsg_xiecui: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'damageBegin2' },
        filter(event, player) {
          if (!event.source || event.source !== _status.currentPhase) {
            return false;
          }
          return !event.source.getHistory('sourceDamage').length
            && player.getDiscardableCards(player, 'he')
              .map(c => get.suit(c))
              .some((s, i, arr) => arr[i + 1] && arr[i + 1] != s);
        },
        direct: true,
        content() {
          'step 0'
          var cnt = 0;
          if (get.attitude(player, trigger.player) * get.attitude(player, trigger.source) < -4) {
            cnt = trigger.source.getHistory('useCard').length;
          }
          let prompt = `###${get.prompt(event.name, trigger.source)}###${get.translation(trigger.source)}将对${get.translation(trigger.player)}造成伤害`;
          player.chooseToDiscard(prompt, 'he', 2,
            c => ui.selected.cards.every(c0 => get.suit(c0) != get.suit(c))
          )
            .set('logSkill', [event.name, trigger.source])
            .set('complexCard', true)
            .set('ai', c => (4 * _status.event.cnt - get.value(c) - 2 * Math.random()))
            .set('cnt', cnt);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.chooseControl('伤害+1', '伤害-1')
            .set('ai', () => _status.event.choice)
            .set('choice', get.attitude(player, trigger.player) > get.attitude(player, trigger.source) ? 1 : 0)
            .set('prompt', '撷翠')
            .set('prompt2', '请选择一项');
          'step 2'
          var cnt = trigger.source.getHistory('useCard').length;
          if (trigger.source.ai.shown > player.ai.shown || trigger.player.ai.shown > player.ai.shown) {
            player.addExpose(0.2);
          }
          if (result.control == '伤害+1') {
            game.log(player, '令', trigger.source, '对', trigger.player, '造成的伤害+1');
            trigger.num += 1;
            if (cnt) {
              trigger.source.draw(cnt, player);
            }
          } else {
            game.log(player, '令', trigger.source, '对', trigger.player, '造成的伤害-1');
            trigger.num -= 1;
            if (cnt) {
              trigger.source.chooseToDiscard(cnt, 'he', true);
            }
          }
        },

      },
      jlsg_youxu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseUseBegin' },
        filter(event, player) {
          const num = event.player.getDamagedHp();
          const wugu = get.autoViewAs({ name: "wugu", isCard: num == 0 }, "unsure"),
            tao = get.autoViewAs({ name: "tao", isCard: num == 0 }, "unsure");
          if (!event.player.hasUseTarget(tao) && !event.player.hasUseTarget(wugu)) return false;
          return event.player.countCards('he') >= num;
        },
        async cost(event, trigger, player) {
          const num = trigger.player.getDamagedHp();
          const wugu = get.autoViewAs({ name: "wugu", isCard: num == 0 }, "unsure"),
            tao = get.autoViewAs({ name: "tao", isCard: num == 0 }, "unsure");
          const cards = [wugu, tao].filter(card => trigger.player.hasUseTarget(card));
          let str = `${num == 0 ? `令${get.translation(trigger.player)}视为使用` : `选择${get.translation(trigger.player)}的${get.cnNumber(num)}张牌当作`}一张`,
            str2 = cards.map(card => card.name);
          if (str.length == 1) str += lib.translate[str2[0]] + "使用";
          else str += str2.map(card => lib.translate[card]).join("或") + "使用";
          let keys = ["effect", "canUse", "effect_use", "getUseValue"],
            value = 0,
            choice,
            next;
          for (const card of cards) {
            let newV = lib.skill.dcpandi.getUseValue(card, trigger.player, player);
            if (newV > value) {
              value = newV;
              choice = card.name;
            }
            for (let key of keys) {
              let info = _status.event._tempCache[key];
              for (let i in info) {
                if (i.indexOf(player.playerid) > -1 && i.endsWith("-") && i.indexOf("c:") == -1) delete _status.event._tempCache[key][i];
              };
            };
          };
          if (num == 0) {
            next = player.chooseBool(str)
              .set("ai", (event, player) => get.event("choice"))
          }
          else {
            next = player.choosePlayerCard('he', trigger.player, get.prompt("jlsg_youxu", trigger.player))
              .set("prompt2", str)
              .set("selectButton", [num, num])
              .set("target", trigger.player)
              .set('ai', button => {
                const player = get.player(),
                  target = get.event("target"),
                  val = get.buttonValue(button);
                if (get.attitude(player, target) > 0) {
                  return 1.6 / _status.event.selectButton[0] - val - Math.random() / 2;
                }
                return val;
              })
              .set("filterOk", function () {
                const player = get.player();
                if (_status.connectMode && !player.isAuto) return true;
                else if (!_status.auto) return true;
                return get.event("choice");
              })
          }
          const { result } = await next.set("choice", choice)
          event.result = {
            bool: result.bool,
            targets: [trigger.player],
            cards: result.links ?? [],
            cost_data: {
              choice: choice,
              choiceList: str2,
            },
          };
        },
        async content(event, trigger, player) {
          const { cost_data: { choiceList } } = event;
          if (choiceList.length == 0) return;
          else if (choiceList.length == 1) event.cardName = choiceList[0];
          else {
            event.cardName = await player.chooseControl(choiceList)
              .set('prompt', `###请选择一项###${get.translation(trigger.player)}要使用的牌`)
              .set('ai', (event, player) => event.cost_data?.choice ?? 0)
              .forResultControl();
          }
          if (trigger.player.ai.shown > player.ai.shown) player.addExpose(0.2);
          const card = get.autoViewAs({ name: event.cardName, isCard: trigger.player.isHealthy() }, event.cards)
          const next = trigger.player.chooseUseTarget(card, true, 'noTargetDelay', 'nodelayx')
            .set('oncard', function (c, p) { this.noai = true; });
          await next;
        },
      },
      jlsg_zhulu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageSource' },
        filter(event, player) {
          return event.player.countCards('he');
        },
        check(event, player) {
          return get.attitude(player, event.player) <= 0;
        },
        logTarget: 'player',
        content() {
          'step 0'
          if (trigger.player.ai.shown > player.ai.shown) {
            player.addExpose(0.3);
          }
          event.players = game.filterPlayer(p => p != trigger.player).sortBySeat();
          'step 1'
          var p = event.players.shift();
          if (!p || !trigger.player.countCards('he')) {
            event.finish();
            return;
          }
          p.gainPlayerCard(trigger.player, 'he', true)
            .delay = false;
          game.delayex(0.5);
          event.redo();
        },

      },
      jlsg_limu: {
        audio: "ext:极略/audio/skill:2",
        mod: {
          cardUsableTarget: function (card, player, target) {
            if (player.countCards('j')) return true;
          },
        },
        enable: "phaseUse",
        discard: false,
        filter: function (event, player) {
          if (player.hasJudge('lebu')) return false;
          return player.countCards('hes', { suit: 'diamond' }) > 0;
        },
        viewAs: { name: 'lebu' },
        //prepare:"throw",
        position: "hes",
        filterCard: function (card, player, event) {
          return get.suit(card) == 'diamond' && player.canAddJudge({ name: 'lebu', cards: [card] });
        },
        selectTarget: -1,
        filterTarget: function (card, player, target) {
          return player == target;
        },
        check: function (card) {
          return get.number(card) - 3 - Math.random();
        },
        onuse: function (links, player) {
          var next = game.createEvent('limu_recover', false, _status.event.getParent());
          next.player = player;
          next.setContent(function () {
            player.draw(event.num);
            player.recover();
          });
          next.num = get.number(links.card);
        },
        ai: {
          result: {
            target: 1,
          },
          order: 12,
        },
      },
      jlsg_huaiyi: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        delay: false,
        filterTarget: function (card, player, target) {
          return player != target && target.countCards('he');
        },
        content() {
          'step 0'
          player.choosePlayerCard(`选择${get.translation(target)}一张牌置于武将牌上`, target, 'he', true);
          if (target.ai.shown > player.ai.shown) {
            player.addExpose(0.2);
          }
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.addToExpansion(result.cards, target, 'giveAuto').gaintag.add(event.name);
        },
        marktext: '异',
        intro: {
          content: 'expansion',
          markcount: 'expansion',
        },
        onremove: function (player, skill) {
          var cards = player.getExpansions(skill);
          if (cards.length) player.loseToDiscardpile(cards);
        },
        group: ['jlsg_huaiyi2', 'jlsg_huaiyi3'],
        ai: {
          order: 8,
          result: {
            target: -2,
          },
        }
      },
      jlsg_huaiyi2: {
        audio: 'jlsg_huaiyi',
        trigger: { player: 'phaseDrawBegin2' },
        forced: true,
        locked: false,
        filter: function (event, player) {
          return !event.numFixed && player.getExpansions('jlsg_huaiyi').length;
        },
        content() {
          trigger.num += player.getExpansions('jlsg_huaiyi').length;
        }
      },
      jlsg_huaiyi3: {
        audio: 'jlsg_huaiyi',
        trigger: { player: 'phaseJieshuBegin' },
        forced: true,
        locked: false,
        filter: function (event, player) {
          return player.getExpansions('jlsg_huaiyi').length > player.hp;
        },
        content() {
          'step 0'
          event.targets = game.filterPlayer(p => p != player).sortBySeat();
          'step 1'
          if (!player.isIn()) {
            event.finish();
            return;
          }
          if (!event.targets.length) {
            return;
          }
          var target = event.targets.shift();
          target.damage();
          event.redo();
          'step 2'
          player.gain('gain2', player.getExpansions('jlsg_huaiyi'));
        }
      },
      jlsg_jiaozhao: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
          if (!player.countCards('h')) return false;
          for (var i of lib.inpile) {
            var type = get.type(i);
            var card = { name: i };
            if (['basic', 'trick'].includes(type)
              && game.hasPlayer(p => p != player && lib.filter.targetEnabled2(card, player, p))) return true;
          }
          return false;
        },
        chooseButton: {
          dialog: function (event, player) {
            var list = [];
            for (var i = 0; i < lib.inpile.length; i++) {
              var name = lib.inpile[i];
              if (name == 'sha') {
                if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) list.push(['基本', '', 'sha']);
                for (var j of lib.inpile_nature) {
                  if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name, nature: j }, player, p))) list.push(['基本', '', 'sha', j]);
                }
              }
              else if (get.type(name) == 'trick' && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) list.push(['锦囊', '', name]);
              else if (get.type(name) == 'basic' && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) list.push(['基本', '', name]);
            }
            return ui.create.dialog('矫诏', [list, 'vcard']);
          },
          check: function (button) {
            if (_status.event.getParent().type != 'phase') return 1;
            var player = _status.event.player;
            var card = {
              name: button.link[2],
              nature: button.link[3],
            };
            var eff = game
              .filterPlayer(p => p != player && lib.filter.targetEnabled2(card, player, p))
              .map(p => get.effect(p, card, player, player))
              .filter(v => v > 0)
              .reduce((a, b) => a + b, 0);
            return eff;
          },
          backup: function (links, player) {
            return {
              filterCard: true,
              audio: 'jlsg_jiaozhao',
              popname: true,
              check: function (card) {
                return 12 - get.value(card);
              },
              selectTarget: [1, Infinity],
              filterTarget(card, player, target) {
                return player != target && lib.filter.targetEnabled2(card, player, target);
              },
              position: 'h',
              viewAs: { name: links[0][2], nature: links[0][3] },
            }
          },
          prompt: function (links, player) {
            return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
          }
        },
        hiddenCard: function (player, name) {
          if (!lib.inpile.includes(name)) return false;
          if (!player.isPhaseUsing()) return false;
          var type = get.type(name);
          return (type == 'basic' || type == 'trick') && player.countCards('h') > 0;
        },
        ai: {
          fireAttack: true,
          skillTagFilter: function (player) {
            if (!player.countCards('h')) return false;
          },
          order: 1,
          result: {
            player: function (player) {
              if (_status.event.dying) return get.attitude(player, _status.event.dying);
              return 1;
            },
          },
        },
      },
      jlsg_danxin: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'damageEnd' },
        frequent: true,
        derivation: 'jlsg_jiaozhao',
        content() {
          'step 0'
          player.draw(2);
          var list = [];
          for (var i = 0; i < lib.inpile.length; i++) {
            var name = lib.inpile[i];
            if (name == 'sha') {
              if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) list.push(['基本', '', 'sha']);
              for (var j of lib.inpile_nature) {
                if (game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name, nature: j }, player, p))) list.push(['基本', '', 'sha', j]);
              }
            }
            else if (get.type(name) == 'trick' && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) list.push(['锦囊', '', name]);
            else if (get.type(name) == 'basic' && game.hasPlayer(p => p != player && lib.filter.targetEnabled2({ name: name }, player, p))) list.push(['基本', '', name]);
          }
          var next = player.chooseButton(['矫诏', [list, 'vcard']]);
          var choice, value = 0;
          for (let link of list) {
            let card = { name: link[2], nature: link[3] }
            let newV = game
              .filterPlayer(p => p != player && lib.filter.targetEnabled2(card, player, p))
              .map(p => get.effect(p, card, player, player))
              .filter(v => v > 0)
              .reduce((a, b) => a + b, 0);
            if (newV > value) {
              choice = [link[2], link[3]];
              value = newV;
            }
          }
          next.ai = function (button) {
            return button.link[2] === _status.event.choice[0] &&
              (button.link[3] || true) === (_status.event.choice[1] || true);
          }
          next.choice = choice;
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.card = { name: result.links[0][2], nature: result.links[0][3] };

          player.chooseCardTarget({
            filterCard: true,
            filterTarget: function (card, player, target) {
              return player != target && lib.filter.targetEnabled2(_status.event.card, player, target);
            },
            ai1: function (card) {
              return 12 - get.value(card);
            },
            selectTarget: [1, Infinity],
            ai2: function (target) {
              var player = _status.event.player;
              return get.effect(target, _status.event.card, player, player);
            },
            prompt: `###${get.prompt('jlsg_jiaozhao')}###将一张牌当作${get.translation(event.card)}使用`,
          }).set('card', event.card);
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill('jlsg_jiaozhao');
          player.useCard(event.card, result.cards, result.targets, false);
        },
        ai: {
          maixie: true,
          maixie_hp: true,
        }
      },
      jlsg_fanghun: {
        audio: "ext:极略/audio/skill:2",
        enable: ["chooseToUse", "chooseToRespond"],
        position: "hs",
        locked: false,
        prompt: "将【杀】/【闪】当作【闪】/【杀】使用或打出，然后获得对方的一张手牌",
        viewAs(cards, player) {
          if (cards.length) {
            var name = false;
            switch (get.name(cards[0], player)) {
              case 'sha': name = 'shan'; break;
              case 'shan': name = 'sha'; break;
            }
            if (name) return { name: name };
          }
          return null;
        },
        check: (card) => 1,
        filterCard(card, player, event) {
          event = event || _status.event;
          var filter = event._backup.filterCard;
          var name = get.name(card, player);
          if (name == 'sha' && filter({ name: 'shan', cards: [card] }, player, event)) return true;
          if (name == 'shan' && filter({ name: 'sha', cards: [card] }, player, event)) return true;
          return false;
        },
        filter(event, player) {
          if (event.filterCard(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event) && player.countCards('hs', 'shan')) return true;
          if (event.filterCard(get.autoViewAs({ name: 'shan' }, 'unsure'), player, event) && player.countCards('hs', 'sha')) return true;
          return false;
        },
        ai: {
          respondSha: true,
          respondShan: true,
          skillTagFilter(player, tag) {
            var name;
            switch (tag) {
              case 'respondSha': name = 'shan'; break;
              case 'respondShan': name = 'sha'; break;
            }
            if (!player.countCards('hs', name)) return false;
          },
          order(item, player) {
            if (player && _status.event.type == 'phase') return get.order({ name: 'sha' }) + 0.3;
            return 10;
          },
          effect: {
            target: function (card, player, target, current) {
              if (get.tag(card, 'respondShan') || get.tag(card, 'respondSha')) {
                if (get.attitude(target, player) <= 0) {
                  if (current > 0) return;
                  if (target.countCards('h') == 0) return 1.6;
                  if (target.countCards('h') == 1) return 1.2;
                  if (target.countCards('h') == 2) return [0.8, 0.2, 0, -0.2];
                  return [0.4, 0.7, 0, -0.7];
                }
              }
            },
          }
        },
        group: ["jlsg_fanghun_cz"],
        subSkill: {
          cz: {
            trigger: {
              player: ["useCard", "respond"],
            },
            filter: function (event, player) {
              if (event.card.name != "sha" && event.card.name != "shan") return false;
              if (!event.skill || event.skill != "jlsg_fanghun") return false;
              var target = lib.skill.chongzhen.logTarget(event, player);
              return target && target.countGainableCards(player, "h") > 0;
            },
            logTarget: function (event, player) {
              return lib.skill.chongzhen.logTarget.apply(this, arguments);
            },
            "prompt2": function (event, player) {
              var target = lib.skill.chongzhen.logTarget(event, player);
              return "获得" + get.translation(target) + "的一张手牌";
            },
            content: function () {
              var target = lib.skill.chongzhen.logTarget(trigger, player);
              player.gainPlayerCard(target, "h", true);
            },
          },
        },
      },
      jlsg_fuhan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'useCardAfter' },
        frequent: true,
        get list() {
          var list = new Set();
          for (let c of lib.jlsg.characterList.filter(c => get.character(c, 1) == 'shu')) {
            get.character(c)[3].forEach(s => list.add(s));
          }
          delete this.list;
          this.list = [...list];
          return this.list;
        },
        usable: 1,
        filter: function (event) {
          if (!"cards" in event.card || !event.card.cards.length) return false;
          return !event.card.isCard;
        },
        async content(event, trigger, player) {
          let skills = lib.skill.jlsg_fuhan.list;
          skills.removeArray(
            game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
          );
          skills = skills.filter(skill => {
            if (lib.filter.skillDisabled(skill)) return false;
            const info = lib.skill[skill];
            if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
            return true;
          });
          if (!skills.length) {
            game.log("没有技能了");
            return;
          }
          await player.addSkills(skills.randomGet());
        },
      },
      jlsg_pindi: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        filter(event, player) {
          return player.countDiscardableCards(player, 'h') && game.hasPlayer(p => p != player && !player.getStorage('jlsg_pindi_target').includes(p));
        },
        filterTarget: function (card, player, target) {
          return player != target && !player.getStorage('jlsg_pindi_target').includes(target);
        },
        filterCard: true,
        check: function (card) {
          var num = _status.event.player.isTurnedOver() ? 3 : 0;
          return 6 + num - get.value(card);
        },
        content: function () {
          'step 0'
          player.addTempSkill('jlsg_pindi_clear', ['phaseUseAfter', 'phaseAfter']);
          player.markAuto('jlsg_pindi_target', [target]);
          player.syncStorage();
          target.judge(function (card) {
            var evt = _status.event.getParent('jlsg_pindi'), suit = get.suit(card);
            if (get.color(card) == 'black') {
              return get.sgn(get.attitude(evt.target, evt.player)) * 3;
            }
            switch (suit) {
              case 'heart': return get.sgn(get.attitude(evt.target, evt.player)) * -3;
              default: return 0;
            }
            return 0;
          }).judge2 = function (result) {
            if (result.color == 'black') return true;
            return false;
          };
          'step 1'
          if (result.color == 'black') {
            player.chooseControlList([
              '令' + get.translation(target) + '摸三张牌',
              '令' + get.translation(target) + '弃置三张牌'
            ], function () {
              return _status.event.choice;
            }).set('choice', get.attitude(player, target) > 0 ? 0 : 1);
          } else {
            switch (result.suit) {
              case 'heart':
                player.turnOver();
                break;
              case 'diamond':
                player.draw();
                break;
            }
            event.finish();
          }
          'step 2'
          if (result.index == 0) {
            target.draw(3, player);
          }
          else {
            target.chooseToDiscard(3, 'he', true);
          }
        },
        subSkill: {
          clear: {
            trigger: { player: 'phaseAfter' },
            charlotte: true,
            silent: true,
            onremove: function (player) {
              delete player.storage.jlsg_pindi_target;
              delete player.storage.jlsg_pindi_type;
            }
          }
        },
        ai: {
          order: 8,
          result: {
            target: function (player, target) {
              var att = get.attitude(player, target);
              if (att <= 0 && target.countCards('he') < 3) return 0;
              return get.sgn(att);
            }
          }
        }
      },
      jlsg_faen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'turnOverEnd' },
        frequent(event, player) {
          return event.player == player;
        },
        check(event, player) {
          return get.attitude(player, event.player) > 0;
        },
        content() {
          trigger.player.draw(3, player);
        }
      },
      jlsg_diaodu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "phaseZhunbeiBegin" },
        direct: true,
        content() {
          'step 0'
          var hMax = game
            .filterPlayer(p => get.attitude(player, p) < 0)
            .map(p => p.countCards('h'))
            .reduce((a, b) => a > b ? a : b, -Infinity);
          var hMin = game
            .filterPlayer(p => get.attitude(player, p) > 0)
            .map(p => p.countCards('h'))
            .reduce((a, b) => a < b ? a : b, Infinity);
          var eMax = game
            .filterPlayer(p => get.attitude(player, p) < 0)
            .map(p => p.countCards('e'))
            .reduce((a, b) => a > b ? a : b, -Infinity);
          var eMin = game
            .filterPlayer(p => get.attitude(player, p) > 0)
            .map(p => p.countCards('e'))
            .reduce((a, b) => a < b ? a : b, Infinity);
          if (isFinite(hMax - hMin) || isFinite(eMax - eMin)) {
            event.aiTargets = [];
            if (!isFinite(hMax - hMin) || isFinite(eMax - eMin) && (hMax - hMin) < (eMax - eMin) * 1.2) {
              event.aiRegion = 'e';
              event.aiTargets.push(game
                .filterPlayer(p => get.attitude(player, p) < 0 && p.countCards('e') == eMax)
                .randomGet()
              );
              event.aiTargets.push(game
                .filterPlayer(p => get.attitude(player, p) > 0 && p.countCards('e') == eMin)
                .randomGet()
              );
            } else {
              event.aiRegion = 'h';
              event.aiTargets.push(game
                .filterPlayer(p => get.attitude(player, p) < 0 && p.countCards('h') == hMax)
                .randomGet()
              );
              event.aiTargets.push(game
                .filterPlayer(p => get.attitude(player, p) > 0 && p.countCards('h') == hMin)
                .randomGet()
              );
            }
          }
          player.chooseTarget(2, get.prompt2(event.name))
            .set('ai', function (target, targets) { return _status.event.targets && _status.event.targets.includes(target) ? 1 : 0; })
            .set('targets', event.aiTargets);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.targets = result.targets;
          if (event.targets.every(p => p.countCards('he') == 0)) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          if (event.targets.every(p => p.countCards('e') == 0)) {
            event._result = {
              index: 0,
              control: '手牌区',
            };
            return;
          }
          if (event.targets.every(p => p.countCards('h') == 0)) {
            event._result = {
              index: 1,
              control: '装备区',
            };
            return;
          }
          let choice;
          if (Math.sign(get.attitude(player, event.targets[0])) == Math.sign(get.attitude(player, event.targets[1]))) {
            choice = Math.abs(event.targets[0].countCards('h') - event.targets[1].countCards('h')) < Math.abs(event.targets[0].countCards('e') - event.targets[1].countCards('e'))
              ? 0 : 1;
          } else {
            let diff = event.targets[0].countCards('h') - event.targets[1].countCards('h') + 1.2 * (event.targets[1].countCards('e') - event.targets[0].countCards('e'));
            choice = ((diff > 0) ^ (get.attitude(player, event.targets[0]) > get.attitude(player, event.targets[1]))) ? 0 : 1;
          }
          player.chooseControl(['手牌区', '装备区'], true)
            .set('prompt2', `令${get.translation(event.targets[0])}与${get.translation(event.targets[1])}交换一个区域内的所有牌`)
            .set('ai', () => _status.event.choice)
            .set('choice', choice);
          'step 2'
          switch (result.index) {
            case 0:
              event.targets[0].swapHandcards(event.targets[1]);
              event.diff = Math.abs(event.targets[0].countCards('h') - event.targets[1].countCards('h'));
              break;
            case 1:
              event.targets[0].swapEquip(event.targets[1]);
              event.diff = Math.abs(event.targets[0].countCards('e') - event.targets[1].countCards('e'));
              break;
          }
          if (Math.sign(get.attitude(player, event.targets[0])) != Math.sign(get.attitude(player, event.targets[0]))
            && event.targets.some(p => p.ai.shown > player.ai.shown)) {
            player.addExpose(0.2);
          }
          'step 3'
          if (event.diff != 0 && player.countDiscardableCards(player, 'he') != 0) {
            player.chooseToDiscard(event.diff, 'he', true);
          }
        }
      },
      jlsg_diancai: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseJieshuBegin' },
        direct: true,
        content() {
          'step 0'
          var players = game.filterPlayer();
          var attMap = new Map();
          for (let p of players) {
            attMap.set(p, get.attitude(player, p));
          }
          var cntMap = new Map();
          for (let p of players) {
            let cnt = p.getHistory('lose', e => e.cards2)
              .map(e => e.cards2.length)
              .reduce((a, b) => a + b, 0);
            cntMap.set(p, cnt);
          }
          event.cntMap = cntMap;
          var vMax = -Infinity, aiTargets = null;
          for (let p of players) {
            for (let p2 of players) {
              let v = attMap.get(p) * cntMap.get(p2) + attMap.get(p2) * cntMap.get(p);
              if (v > vMax) {
                vMax = v;
                aiTargets = [p, p2];
              }
            }
          }

          var custom = {
            add: {
              _target: [() => {
                for (let [p, cnt] of cntMap.entries()) {
                  p.prompt(cnt.toString());
                }
              }],
            },
            replace: {}
          };
          Object.defineProperty(custom.add, 'target', {
            enumerable: true,
            configurable: true,
            get() {
              return function () {
                // console.log(this);
                for (let f of this._target) {
                  f.call(this);
                }
              }
            },
            set(newValue) {
              this._target.add(newValue);
            }
          })
          var next = player.chooseTarget(2, get.prompt2(event.name))
            .set('custom', custom)
            .set('cntMap', cntMap)
            .set('ai', function (target) {
              return (_status.event.targets && _status.event.targets.includes(target)) ? 1 : 0;
            })
            .set('targetprompt', p => _status.event.cntMap.get(p).toString());
          if (vMax > 0) {
            next.set('targets', aiTargets)
          }
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name, result.targets);
          if (result.targets.some(p => p.ai.shown > player.ai.shown)) {
            player.addExpose(0.1);
          }
          var [p, p2] = result.targets.sortBySeat();
          p.draw(event.cntMap.get(p2));
          p2.draw(event.cntMap.get(p));
        }
      },
      jlsg_zhendu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseUseBegin' },
        check(event, player) {
          if (event.player == player) {
            return true;
          }
          let chance = 0.5;
          chance += Math.sign(get.attitude(player, event.player)) * -0.25;
          if ((get.attitude(player, event.player) > 0) == (event.player.hp > 1)) {
            chance += 0.2;
          }
          return Math.random() < chance;
        },
        content() {
          'step 0'
          var target = trigger.player;
          target.addTempSkill('jlsg_zhendu2', 'phaseAfter');
          target.markAuto('jlsg_zhendu2', [player]);

          if (target != player) {
            target.loseHp();
          }
        },
        logTarget: 'player',
        ai: {
          expose: 0.2,
        }
      },
      jlsg_zhendu2: {
        forced: true,
        trigger: { source: 'damageBegin1' },
        filter(event, player) {
          return player.getStorage('jlsg_zhendu2').some(p => p != event.player);
        },
        content() {
          trigger.num += player.getStorage('jlsg_zhendu2').filter(p => p != trigger.player).length;
        },
        mark: true,
        intro: {
          content(storage, player, skill) {
            return `本回合造成伤害+${storage.length}`;
          },
        },
      },
      jlsg_qiluan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'phaseEnd' },
        filter(event, player) {
          return event.player.isIn();
        },
        direct: true,
        content() {
          'step 0'
          var prompt = `###${get.prompt(event.name, trigger.player)}###其视为对你选择的角色使用一张【杀】`;
          player.chooseTarget(prompt, (_, player, target) => _status.event.target.canUse({ name: 'sha' }, target, false))
            .set('target', trigger.player)
            .set('ai', (target, targets) => get.effect(target, { name: 'sha' }, _status.event.player) + 3);
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.logSkill(event.name);
          trigger.player.useCard({ name: 'sha' }, result.targets, 'noai');
          'step 2'
          player.draw(game.getGlobalHistory('changeHp').length);
        },
      },
      jlsg_wurong: {
        audio: "ext:极略/audio/skill:2",
        enable: 'phaseUse',
        usable: 1,
        filterTarget(card, player, target) {
          return player != target && target.countCards('h');
        },
        frequent: true,
        content() {
          'step 0'
          player.choosePlayerCard(target, true, "h");
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          target.showCards(result.cards);
          event.card = result.cards[0];
          let type = get.type2(result.cards[0]);
          let prompt2 = `弃置非${get.translation(type)}牌对其造成一点伤害，或弃置${get.translation(type)}并获得${get.translation(result.cards[0])}`;
          player.chooseToDiscard()
            .set('ai', (card) => {
              if (get.attitude(_status.event.player, _status.event.target) > 0) {
                return -1;
              }
              let value = get.value(card);
              if (get.type2(card) == get.type2(_status.event.card)) {
                value += _status.event.target.countCards('h') > 1 ? 2 : -2;
                value += Math.random() * 2;
              }
              return value;
            })
            .set('card', result.cards[0])
            .set('target', target)
            .set('prompt2', prompt2);
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          event.same = get.type2(event.card) == get.type2(result.cards[0])
          if (!event.same) {
            let skills = target.getSkills(null, false, false).filter(function (i) {
              var info = get.info(i);
              return info && !info.charlotte && !get.is.locked(i);
            });
            if (!skills.length) {
              target.damage();
              return;
            }
            if (skills.length == 1) {
              event._result = { index: 0, control: skills[0] };
            }
            player.chooseControl(skills).set('prompt', '请选择要禁用的技能')
              .set('aiSkill', skills.randomGet())
              .set('ai', () => _status.event.aiSkill);
          } else {
            player.gain(target, event.card, 'giveAuto');
          }
          'step 3'
          if (event.same) {
            if (!target.countCards('h')) {
              event.finish();
              return;
            }
            player.chooseBool(`是否重复此流程？`).frequentSkill = event.name;
          } else {
            target.addTempSkill('jlsg_wurong2');
            target.popup(result.control, 'gray');
            target.storage.jlsg_wurong2 = target.storage.jlsg_wurong2 || [];
            target.storage.jlsg_wurong2.add(result.control);
            target.disableSkill('jlsg_wurong2', result.control);
            game.log(target, '的技能', '#g【' + get.translation(result.control) + '】', '回合内失效了');
            target.damage();
            event.finish();
          }
          'step 4'
          if (result.bool) {
            event.goto(0);
          }
        },
        ai: {
          order: 9,
          result: {
            player: 1,
            target: -1,
          }
        }
      },
      jlsg_wurong2: {
        onremove: function (player, skill) {
          player.enableSkill(skill);
        },
        locked: true,
        mark: true,
        charlotte: true,
        intro: {
          content: function (storage, player, skill) {
            var list = [];
            for (var i in player.disabledSkills) {
              if (player.disabledSkills[i].includes(skill)) list.push(i);
            };
            if (list.length) {
              var str = '失效技能：';
              for (var i = 0; i < list.length; i++) {
                if (lib.translate[list[i] + '_info']) str += get.translation(list[i]) + '、';
              };
              return str.slice(0, str.length - 1);
            };
          },
        },
      },
      jlsg_shanjia: {
        audio: "ext:极略/audio/skill:2",
        mod: {
          globalFrom: function (from, to, distance) {
            if (!from.hasEmptySlot(4)) return false;
            return distance - 2;
          },
          globalTo: function (from, to, distance) {
            if (!to.hasEmptySlot(3)) return false;
            return distance + 2;
          }
        },
        forced: true,
        trigger: { player: 'useCard' },
        filter(event, player) {
          if (event.card.name == 'sha') {
            if (!player.hasEmptySlot(4)) return false;
          }
          else if (get.type(event.card) != 'trick' || ['wuxie', 'tiesuo'].includes(event.card.name) || !player.hasEmptySlot(3)) {
            return false;
          }
          return true;
        },
        content() {
          trigger.effectCount = 2;
        },
        ai: {
          effect: {
            target: function (card, player, target) {
              let subtype = get.subtype(card);
              if (player == target) {
                if (
                  ['equip3', 'equip6'].includes(subtype) && target.hasEmptySlot(3) ||
                  ['equip4', 'equip6'].includes(subtype) && target.hasEmptySlot(4)
                ) {
                  return 0;
                }
              }
            }
          }
        }
      },
      jlsg_jili: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'useCardAfter' },
        filter(event, player) {
          if (get.type2(event.card) == 'trick') {
            return false;
          }
          return game.hasPlayer(p => p != player && p.inRangeOf(player) && p.countCards('he'));
        },
        check(event, player) {
          if (player.getHistory('useCard').length <= player.getAttackRange()) {
            return true;
          }
          return game
            .filterPlayer(p => p != player && p.inRangeOf(player) && p.countCards('he'))
            .map(p => Math.sign(get.attitude(player, p)))
            .reduce((a, b) => a + b, 0)
            < 0;
        },
        locked: false,
        content() {
          'step 0'
          event.targets = game.filterPlayer(p => p != player && p.inRangeOf(player) && p.countCards('he')).sortBySeat();
          event.discardEvents = [];
          for (let p of event.targets) {
            let card = p.getCards('he').randomGet();
            if (!card) {
              continue;
            }
            let next = p.discard(card, 'notBySelf');
            next.delay = false;
            event.discardEvents.push(next);
            game.delayex(0.5);
          }
          'step 1'
          if (player.getHistory('useCard').length <= player.getAttackRange()) {
            // TODO: better handling of discard failure
            player.draw(event.discardEvents.length);
          }
        },
        mod: {
          aiOrder: function (player, card, num) {
            if (get.subtype(card) == 'equip4' && !get.cardtag(card, 'gifts')) {
              return num + 8;
            }
            if (get.type2(card) == 'trick') {
              return num / 2;
            }
            if (get.subtype(card) == 'equip1' && !get.cardtag(card, 'gifts')) {
              var range0 = player.getAttackRange();
              var range = 0;
              var info = get.info(card);
              if (info && info.distance && info.distance.attackFrom) {
                range -= info.distance.attackFrom;
              }
              if (range > range0) {
                return num + 10 + range;
              }
            }
          },
        },
      },
      jlsg_dujin: {
        audio: "ext:极略/audio/skill:2",
        mod: {
          cardUsable: function (card, player, num) {
            if (card.name == 'sha') return Infinity;
          },
          aiOrder: function (player, card, num) {
            if (!card || card.name !== 'sha') {
              return;
            }
            let evt = _status.event.getParent('phaseUse');
            if (evt.name == 'phaseUse' && !player.hasHistory('useCard', e => e.card.name == 'sha' && e.getParent('phaseUse') === evt)) {
              return;
            }
            return num - 10;
          },
        },
        forced: true,
        trigger: {
          player: "useCard",
        },
        filter: function (event, player) {
          return player.isPhaseUsing() && event.card.name == 'sha';
        },
        content() {
          let evt = trigger.getParent('phaseUse');
          if (player.hasHistory('useCard', e => e != trigger && e.card.name == 'sha' && e.getParent('phaseUse') === evt)) {
            return;
          }
          trigger.directHit.addArray(game.players);
          trigger.baseDamage += 1;
        },
        group: 'jlsg_dujin2',
        ai: {
          directHit_ai: true,
          skillTagFilter: function (player, tag, arg) {
            if (arg && arg.card && arg.card.name == 'sha') {
              let evt = _status.event.getParent('phaseUse');
              return evt.name == 'phaseUse' && !player.hasHistory('useCard', e => e.card.name == 'sha' && e.getParent('phaseUse') === evt);
            }
          },
        },
      },
      jlsg_dujin2: {
        audio: false,
        trigger: {
          player: ['shaMiss', 'eventNeutralized'],
        },
        forced: true,
        check: false,
        filter: function (event, player) {
          if (event.type != 'card' || event.card.name != 'sha' || !event.target.isIn()) return false;
          return true;
        },
        content() {
          player.damage(trigger.target);
        },
        ai: {
          neg: true,
        }
      },
      jlsg_sanjue: {
        audio: "ext:极略/audio/skill:3",
        trigger: { player: 'useCard' },
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
            .filter(c => get.character(c, 1) == 'wu')
            .map(c => get.character(c)[3])
            .flat()
            .filter(s => {
              if (lib.filter.skillDisabled(s)) return false;
              return !get.info(s).charlotte;
            })
          skills.removeArray((
            game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
          ));
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
        group: 'jlsg_sanjue2',
      },
      jlsg_sanjue2: {
        audio: 'jlsg_sanjue',
        trigger: { player: 'phaseUseBegin' },
        direct: true,
        content() {
          'step 0'
          player.chooseTarget(get.prompt2(event.name))
            .set('ai', p => get.attitude(player, p) - Math.random() * 2)
          'step 1'
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
              return !get.info(s).charlotte
            })
          skills.removeArray(
            game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
          );
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
      jlsg_canshi: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: ["recoverAfter", "gainMaxHpAfter"],
          player: "damageEnd",
        },
        filter(event, player) {
          if (event.name == "damage") {
            return event.source && event.source != player;
          }
          return event.player != player;
        },
        check: () => true,
        marktext: '蚕',
        intro: {
          name: '蚕食',
          name2: '蚕',
          content: 'mark',
        },
        content() {
          'step 0'
          var target = trigger.player;
          if (trigger.name == "damage") {
            target = trigger.source;
          }
          target.addMark('jlsg_canshi');
          'step 1'
          player.draw(2);
        },
        global: "jlsg_canshi_debuff",
        subSkill: {
          debuff: {
            mod: {
              maxHandcard: function (player, num) {
                return num - player.countMark('jlsg_canshi');
              }
            }
          }
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          maixie_defend: true,
        }
      },
      jlsg_xianji: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'phaseZhunbeiBegin',
        },
        filter(event, player) {
          return game.hasPlayer(p => p != player
            && p.countMark('jlsg_canshi') > p.maxHp
            && !p.storage.jlsg_xianji
          )
        },
        direct: true,
        skillAnimation: true,
        animationColor: 'metal',
        intro: {
          content: "无法作为〖献祭〗的目标",
        },
        content() {
          'step 0'
          player.chooseTarget(get.prompt2(event.name), (_, player, target) => target != player
            && target.countMark('jlsg_canshi') > target.maxHp
            && !target.storage.jlsg_xianji).set('ai', () => Math.random());
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          player.storage.jlsg_xianji = true;
          player.markSkill('jlsg_xianji');
          var target = result.targets[0];
          event.target = target;
          player.logSkill(event.name, target);
          target.removeMark('jlsg_canshi');

          var targetSkills = target.getSkills(null, false, false).filter(function (i) {
            var info = get.info(i);
            return info && !info.charlotte;
          });
          if (targetSkills.length) {
            player.gainMaxHp(targetSkills.length);
            player.recover(targetSkills.length);
          }
          'step 2'
          var target = event.target;
          var skills = player.getSkills(null, false, false).filter(function (i) {
            var info = get.info(i);
            return info && !info.charlotte;
          });
          var targetSkills = target.getSkills(null, false, false).filter(function (i) {
            var info = get.info(i);
            return info && !info.charlotte;
          });
          player.changeSkills(targetSkills, skills);
          target.changeSkills(skills, targetSkills);
        }
      },
      jlsg_hanyong: {
        audio: "ext:极略/audio/skill:2",
        group: ['jlsg_hanyong_guanshi', 'jlsg_hanyong_tengjia1', 'jlsg_hanyong_tengjia2', 'jlsg_hanyong_tengjia3'],
        subSkill: {
          guanshi: {
            audio: 'jlsg_hanyong',
            audioname: false,
            inherit: 'guanshi_skill',
            locked: false,
            mod: {
              attackRange: function (player, num) {
                if (lib.card.guanshi && player.hasEmptySlot(1)) return num - lib.card.guanshi.distance.attackFrom;
              },
            },

            filter: function (event, player) {
              if (!lib.skill.guanshi_skill.filter(event, player)) return false;
              if (!player.hasEmptySlot(1)) return false;
              return true;
            },
            get content() {
              let content = lib.skill.guanshi_skill.content.toString();
              content = get.pureFunctionStr(content).replaceAll('guanshi_skill', 'jlsg_hanyong_guanshi');
              content = new Function("return " + content)();
              delete this.content;
              this.content = content;
              return content;
            },
            ai: {
              directHit_ai: true,
              skillTagFilter: function (player, tag, arg) {
                if (!player.hasEmptySlot(2)) return;
                return lib.skill.guanshi_skill.ai.skillTagFilter.apply(this, arguments);
              },
              effect: {
                target: function (card, player, target) {
                  if (player == target && get.subtype(card) == 'equip2') {
                    if (!target.hasEmptySlot(2) && get.equipValue(card) <= 7.5) return 0;
                  }
                },
              },
            },
          },
          tengjia1: {
            audio: 'jlsg_hanyong',
            audioname: false,
            inherit: 'tengjia1',
            equipSkill: true,
            filter: function (event, player) {
              if (!lib.skill.tengjia1.filter(event, player)) return false;
              if (!player.hasEmptySlot(2)) return false;
              return true;
            },
            ai: {
              effect: {
                target: function (card, player, target) {
                  if (player == target && get.subtype(card) == 'equip2') {
                    if (get.equipValue(card) <= 5) return 0;
                  }
                  if (!target.hasEmptySlot(2)) return;
                  return lib.skill.tengjia1.ai.effect.target.apply(this, arguments);
                }
              }
            }
          },
          tengjia2: {
            // use stock audio
            inherit: 'tengjia2',
            equipSkill: true,
            filter: function (event, player) {
              if (!lib.skill.tengjia2.filter(event, player)) return false;
              if (!player.hasEmptySlot(2)) return false;
              return true;
            },
            ai: {
              fireAttack: true,
              skillTagFilter: function (player, tag, arg) {
                if (!player.hasEmptySlot(2)) return;
                return true;
              },
              effect: {
                target: function (card, player, target, current) {
                  if (!target.hasEmptySlot(2)) return;
                  return lib.skill.tengjia2.ai.effect.target.apply(this, arguments);
                }
              }
            }
          },
          tengjia3: {
            audio: 'jlsg_hanyong',
            audioname: false,
            inherit: 'tengjia3',
            equipSkill: true,
            filter: function (event, player) {
              if (!lib.skill.tengjia3.filter(event, player)) return false;
              if (!player.hasEmptySlot(2)) return false;
              return true;
            },
          },
        }
      },
      jlsg_lingruo: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: 'useCardToPlayered',
          target: 'useCardToTargeted',
        },
        filter(event, player) {
          if (event.player == event.target) {
            return false;
          }
          return event.card.name == 'sha' || get.type(event.card) == 'trick';
        },
        check(event, player) {
          let target = event.target;
          if (event.target == player) {
            target = event.player;
          }
          if (target.countCards('he') == 0) {
            return true;
          }
          return get.attitude(player, target) <= 1;
        },
        logTarget(event, player) {
          if (event.name == 'useCardToPlayered') {
            return event.target;
          }
          return event.player;
        },
        content() {
          'step 0'
          event.target = trigger.target;
          if (event.target == player) {
            event.target = trigger.player;
          }
          if (event.target.countCards('he') > 0 && event.target.ai.shown > player.ai.shown) {
            player.addExpose(0.1);
          }
          event.cnt = ['basic', 'trick', 'equip'].filter(
            t => player.countCards('he', { type: t }) > event.target.countCards('he', { type: t })
          ).length;
          'step 1'
          if (event.cnt > 0) {
            --event.cnt;
          } else {
            event.finish();
            return;
          }
          let choice;
          if (event.target.countCards('he') == 0) {
            choice = 0;
          } else {
            let dist = [1, 1, 1];
            // option 1 & 2 are less likely to happen consecutively 
            if (event.choice) {
              dist[event.choice] -= 0.5
            }
            choice = jlsg.distributionGet(dist);
          }
          event.choice = choice;
          switch (choice) {
            case 0:
              player.draw();
              break;
            case 1:
              var card = target.getCards('he').randomGet();
              if (card) {
                player.gain(card, target, 'giveAuto');
              }
              break;
            case 2:
              var card = target.getCards('he').randomGet();
              if (card) {
                target.discard(card, 'notBySelf').discarder = player;
              }
              break;
          }
          event.redo();
        },
      },
      jlsg_fujian: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseZhunbeiBegin' },
        direct: true,
        content() {
          'step 0'
          player.chooseTarget(get.prompt2(event.name),
            (_, player, target) => player != target && target.countCards('h'))
            .set('ai', target => get.attitude(_status.event.player, target) > 0 ? 0 : target.countCards('h') + 2 * Math.random());
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = result.targets[0];
          event.target = target;
          player.logSkill(event.name, result.targets);
          player.choosePlayerCard(target, 'h', true, 'visible', () => Math.random());
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = event.target;
          if (!target.storage.jlsg_fujian) {
            target.storage.jlsg_fujian = new Map();
          }
          var cards = target.storage.jlsg_fujian.get(player) || [];
          cards.push([result.cards[0], 0]);
          target.storage.jlsg_fujian.set(player, cards);

          target.addSkill('jlsg_fujian2');
        },
      },
      jlsg_fujian2: {
        charlotte: true,
        silent: true,
        trigger: { player: 'useCard' },
        content() {
          let added = false;
          for (let v of player.storage.jlsg_fujian.values()) {
            for (let a of v) {
              added = true;
              a[1] += 1;
            }
          }
          if (!added) {
            player.removeSkill(event.name);
          }
        },
        group: 'jlsg_fujian3',
      },
      jlsg_fujian3: {
        audio: 'jlsg_fujian',
        trigger: {
          player: 'loseAfter',
          global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        charlotte: true,
        silent: true,
        content() {
          'step 0'
          var evt = trigger.getl(player);
          var cards = (evt.hs || []).concat(evt.es || []);
          if (!cards.length) {
            event.finish();
            return;
          }
          var result = [];
          event.result = result;
          var sources = [...player.storage.jlsg_fujian.keys()].sortBySeat();
          for (let lostCard of cards) {
            for (let source of sources) {
              let cards = player.storage.jlsg_fujian.get(source);
              cards = cards.filter(([card, cnt]) => {
                if (lostCard == card) {
                  result.push([source, cnt]);
                }
                return lostCard != card;
              });
              player.storage.jlsg_fujian.set(source, cards);
            }
          }
          'step 1'
          if (!event.result.length) {
            event.finish();
            return;
          }
          let [source, cnt] = event.result.shift();
          if (source.isIn() && source.hasSkill('jlsg_fujian')) {
            source.logSkill('jlsg_fujian', player);
            player.loseHp();
            source.draw(cnt);
          }
          event.redo();
        }
      },
      jlsg_fengyin: {
        audio: "ext:极略/audio/skill:2",
        trigger: { source: 'damageBegin1' },
        logTarget: 'player',
        filter(event, player) {
          if (!event.card || event.player == player) {
            return false;
          }
          if (event.card.name == 'sha' && !player.hasSkill('jlsg_fengyin_sha')) {
            return true;
          }
          if (event.card.name == 'juedou' && !player.hasSkill('jlsg_fengyin_juedou')) {
            return true;
          }
          return false;
        },
        check(event, player) {
          return get.attitude(player, event.player) < 0;
        },
        content() {
          'step 0'
          player.addTempSkill('jlsg_fengyin_' + trigger.card.name);
          var criteria = { suit: 'diamond' };
          if (lib.skill.jlsg_rongzhuang.escalate(player)) {
            criteria = { color: 'red' };
          }
          player.draw(player.countCards('h', criteria));
          trigger.num += trigger.player.countCards('h', criteria);
        },
        combo: 'jlsg_rongzhuang',
        subSkill: {
          sha: {},
          juedou: {},
        }
      },
      jlsg_rongzhuang: {
        audio: "ext:极略/audio/skill:2",
        escalate(player) {
          return player.getEquips(1).length && player.getEquips(2).length;
        },
        trigger: { player: 'useCard1' },
        forced: true,
        filter(event, player) {
          return event.card.name == 'sha' && (
            player.getEquips(1).length && player.countUsed('sha', true) > 1 && event.getParent().type == 'phase'
            || player.getEquips(2).length
          );
        },
        content() {
          trigger.audioed = true;
          if (player.getEquips(2).length) {
            trigger.directHit.addArray(game.filterPlayer(function (current) {
              return current != player;
            }));
          }
        },
        mod: {
          cardUsable(card, player, num) {
            if (card.name == 'sha') return Infinity;
          }
        },
        ai: {
          directHit_ai: true,
        }
      },
      jlsg_huomo: {
        audio: "ext:极略/audio/skill:2",
        enable: 'chooseToUse',
        hiddenCard: function (player, name) {
          if (get.type(name) != 'basic') return false;
          const list = player.getStorage('jlsg_huomo');
          if (list.includes(name)) return false;
          return player.countCards('he', { color: 'black' });
        },
        filter: function (event, player) {
          if (event.type == 'wuxie' || !player.countCards('he', { color: 'black' })) return false;
          const list = player.getStorage('jlsg_huomo');
          for (var name of lib.inpile) {
            if (get.type(name) != 'basic' || list.includes(name)) continue;
            var card = { name: name, isCard: true };
            if (event.filterCard(card, player, event)) return true;
            if (name == 'sha') {
              for (var nature of lib.inpile_nature) {
                card.nature = nature;
                if (event.filterCard(card, player, event)) return true;
              }
            }
          }
          return false;
        },
        chooseButton: {
          dialog: function (event, player) {
            const vcards = [];
            const list = player.getStorage('jlsg_huomo');
            for (let name of lib.inpile) {
              if (get.type(name) != 'basic' || list.includes(name)) continue;
              let card = { name: name, isCard: true };
              if (event.filterCard(card, player, event)) vcards.push(['基本', '', name]);
              if (name == 'sha') {
                for (let nature of lib.inpile_nature) {
                  card.nature = nature;
                  if (event.filterCard(card, player, event)) vcards.push(['基本', '', name, nature]);
                }
              }
            }
            return ui.create.dialog('活墨', [vcards, 'vcard'], 'hidden');
          },
          check: function (button) {
            const player = _status.event.player;
            const card = { name: button.link[2], nature: button.link[3] };
            if (game.hasPlayer(function (current) {
              return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
            })) {
              switch (button.link[2]) {
                case 'tao': return 5;
                case 'jiu': return 3.01;
                case 'sha':
                  if (button.link[3] == 'fire') return 2.95;
                  else if (button.link[3] == 'thunder') return 2.92;
                  else return 2.9;
                case 'shan': return 1;
              }
            }
            return 0;
          },
          backup: function (links, player) {
            return {
              check: function (card) {
                return 1 / Math.max(0.1, get.value(card));
              },
              filterCard: function (card) {
                return get.color(card) == 'black';
              },
              viewAs: {
                name: links[0][2],
                nature: links[0][3],
              },
              position: 'he',
              popname: true,
              ignoreMod: true,
              precontent: function () {
                if (!player.storage.jlsg_huomo) {
                  player.when({ global: ["phaseAfter", "phaseBefore"] }).then(() => {
                    player.unmarkSkill("jlsg_huomo");
                  });
                }
                player.markAuto("jlsg_huomo", event.result.card.name);
              },
            }
          },
          prompt: function (links, player) {
            return '将一张黑色牌当作' + get.translation(links[0][3] || '') + get.translation(links[0][2]);
          }
        },
        marktext: '墨',
        intro: {
          content: '本回合已因〖活墨〗使用过$',
          onunmark: true,
        },
        ai: {
          order: function () {
            var player = _status.event.player;
            var event = _status.event;
            var list = player.getStorage('jlsg_huomo');
            if (!list.includes('jiu') && event.filterCard({ name: 'jiu' }, player, event) && get.effect(player, { name: 'jiu' }) > 0) {
              return 3.1;
            }
            return 2.9;
          },
          respondSha: true,
          fireAttack: true,
          respondShan: true,
          skillTagFilter: function (player, tag, arg) {
            if (tag == 'fireAttack') return true;
            if (player.hasCard(function (card) {
              return get.color(card) == 'black';
            }, 'he')) {
              var list = player.getStorage('jlsg_huomo');
              if (tag == 'respondSha') {
                if (arg != 'use') return false;
                if (list.includes('sha')) return false;
              }
              else if (tag == 'respondShan') {
                if (list.includes('shan')) return false;
              }
            }
            else {
              return false;
            }
          },
          result: {
            player: 1,
          }
        }
      },
      jlsg_dingguan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'useCardToPlayered' },
        filter(event, player) {
          if (!event.isFirstTarget) return false;
          return get.color(event.card) == 'black' &&
            event.player.isPhaseUsing() && event.targets && event.targets.length && !game.hasPlayer2(function (current) {
              return current.getHistory('damage').length > 0;
            });
        },
        direct: true,
        content() {
          'step 0'
          player.chooseTarget(get.prompt('jlsg_dingguan'), '令目标角色摸一张牌', function (card, player, target) {
            return _status.event.targets.includes(target);
          }, [1, trigger.targets.length]).set('ai', function (target) {
            return get.attitude(_status.event.player, target);
          }).set('targets', trigger.targets);
          'step 1'
          if (result.bool) {
            player.logSkill('jlsg_dingguan', result.targets);
            game.asyncDraw(result.targets.sortBySeat());
          }
        },
        ai: {
          expose: 0.2
        },
      },
      jlsg_xianshou: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseBegin' },
        direct: true,
        content() {
          'step 0'
          player.chooseTarget(get.prompt2(event.name))
            .set('ai', function (target) {
              let v = get.attitude(_status.event.player, target) - 2 + Math.random();
              if (target.hasSkill('jlsg_tiandao')) {
                v = v / 3;
              }
              return v;
            });
          'step 1'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = result.targets[0];
          event.target = target;
          player.logSkill(event.name, target);
          if (target.ai.shown > player.ai.shown && get.attitude(player, target) > 2) {
            player.addExpose(0.2);
          }
          if (!target.hasSkill('jlsg_tiandao')) {
            target.addSkills('jlsg_tiandao');
            event.finish();
            return;
          }
          player.judge(function (card) {
            if (get.suit(card) == "spade") return -3;
            return 2;
          })
            .set('judge2', result => result.bool);
          'step 2'
          var diff = result.bool ? 1 : -1;
          let index = [0, 1, 2, 3];
          if (diff < 0) {
            index = index.filter(i => target.storage.jlsg_tiandao[i] > 0);
          };
          if (index.length) {
            index = index.randomGet();
            event.target.storage.jlsg_tiandao[index] += diff;
          }
        },
        derivation: 'jlsg_tiandao',
      },
      jlsg_tiandao: {
        audio: "ext:极略/audio/skill:2",
        init(player) {
          player.storage.jlsg_tiandao = [1, 1, 1, 1];
        },
        trigger: { player: 'phaseZhunbeiBegin' },
        forced: true,
        content() {
          'step 0'
          var [cnt1, cnt2] = player.storage.jlsg_tiandao;
          if (cnt1 > 0) {
            player.draw(player.storage.jlsg_tiandao[0])
          }
          if (cnt2 > 0) {
            let skills = jlsg.characterList
              .filter(c => get.character(c, 1) == 'qun')
              .map(c => get.character(c)[3])
              .flat()
              .filter(s => {
                if (lib.filter.skillDisabled(s)) return false;
                let skill = lib.skill[s];
                return skill &&
                  !skill.zhuSkill &&
                  !skill.limited &&
                  !skill.juexingji &&
                  !skill.hiddenSkill &&
                  !skill.charlotte &&
                  !skill.dutySkill;
              });
            skills = [... new Set(skills)];
            skills.removeArray(
              game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
            );
            skills = skills.filter(skill => {
              const info = lib.skill[skill];
              if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
              return true;
            });
            skills = skills.randomGets(cnt2);
            if (skills.length) player.addSkills(skills);
          }
          'step 1'
          if (!player.isIn()) {
            return;
          }
          var [_, _, cnt1, cnt2] = player.storage.jlsg_tiandao;
          if (cnt1 <= 0 && cnt2 <= 0) {
            event.finish();
            return;
          }
          var target, maxValue = -Infinity;
          for (let t of game.filterPlayer()) {
            let value = -Math.min(t.countCards('he'), cnt1) * get.attitude(player, t)
              + get.damageEffect(t, player, player, 'thunder') * cnt2;
            if (value > maxValue) {
              maxValue = value;
              target = t;
            }
          }
          var prompt2 = [];
          if (cnt1 > 0) {
            prompt2.push(`令其随机弃置${cnt1}张牌`);
          }
          if (cnt2 > 0) {
            prompt2.push(`对其造成${cnt2}点雷电伤害`);
          }
          player.chooseTarget()
            .set('prompt2', prompt2.join(','))
            .set('ai', function (target) {
              return target == _status.event.target;
            })
            .set('target', target);
          'step 2'
          if (!result.bool) {
            event.finish();
            return;
          }
          var target = result.targets[0];
          var [_, _, cnt1, cnt2] = player.storage.jlsg_tiandao;
          if (cnt1 > 0) {
            target.randomDiscard(cnt1);
          }
          if (cnt2 > 0) {
            target.damage(cnt2, 'thunder');
          }
        },
      },
      jlsg_chengfeng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "damageBegin2" },
        forced: true,
        content() {
          'step 0'
          player.judge();
          'step 1'
          if (result.suit == 'spade') {
            player.addMark('jlsg_chengfeng');
          } else {
            trigger.num -= 1;
          }
        },
        intro: {
          name: "乘风",
          content: "mark",
        },
        group: 'jlsg_chengfeng_extra',
        subSkill: {
          extra: {
            audio: 'jlsg_chengfeng',
            trigger: { global: 'phaseAfter' },
            filter(event, player) {
              return player.countMark('jlsg_chengfeng') >= 2;
            },
            forced: true,
            content() {
              player.removeMark('jlsg_chengfeng', 2);
              player.insertPhase(event.name);
            }
          },
        },
        ai: {
          maixie: true,
          maixie_hp: true,
        },
      },
      jlsg_kunfen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: ["damageEnd", "loseHpEnd", "loseMaxHpAfter"] },
        forced: true,
        async content(event, trigger, player) {
          await player.draw(3);
          let evts = player.getHistory("useSkill", e => e.skill == 'jlsg_kunfen');
          if (evts.length == 1 && player.isDamaged()) {
            player.recover();
          }
        },
        ai: {
          maixie: true,
          maixie_hp: true,
          result: {
            effect: function (card, player, target) {
              if (get.tag(card, "damage")) {
                if (!target.hasFriend()) return;
                var num = 1;
                if (get.attitude(player, target) > 0) {
                  if (player.needsToDiscard()) num = 0.7;
                  else num = 0.5;
                }
                if (player.hp >= 4) return [1, num * 2];
                if (target.hp == 3) return [1, num * 1.5];
                if (target.hp == 2) return [1, num * 0.5];
              }
            },
          },
        },
      },
      jlsg_caiyu: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "phaseZhunbeiBegin" },
        check(event, player) {
          if (player.maxHp <= 1 || player.isHealthy()) {
            return false;
          }
          if (player.hasSkill('jlsg_kunfen') && player.getDamagedHp() > 1) {
            return true;
          }
          return Math.random() < 0.5;
        },
        async content(event, trigger, player) {
          await player.loseMaxHp();
          let names = jlsg.characterList.filter(n => n.includes('zhugeliang') || lib.translate[n] && lib.translate[n].includes('诸葛亮'));
          names.addArray([
            'jlsgsr_zhugeliang',
            'sp_zhugeliang',
            'jlsgsoul_zhugeliang',
            'jlsgsoul_sp_zhugeliang',
          ]);
          let skills = [];
          for (let name of names) {
            skills.addArray(get.character(name)?.[3] ?? []);
          }
          // TODO
          skills.removeArray(player.getSkills(null, false, false));
          skills = skills.filter(skill => {
            if (lib.filter.skillDisabled(skill)) return false;
            const info = lib.skill[skill];
            if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
            return true
          });
          if (skills.length) {
            player.addSkills(skills.randomGet());
          }
        },
      },
      jlsg_qinqing: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "phaseJieshuBegin" },
        async cost(event, trigger, player) {
          event.result = await player
            .chooseTarget(`###${get.prompt(event.skill)}###令攻击范围含有其的角色交给其一张牌`)
            .set("ai", target => {
              const player = get.event("player");
              const targets = game.filterPlayer(p => p != player && p != target)
                .filter(p => p.countCards('he') && p.inRange(target));
              let eff = targets.map(p => -get.attitude(player, p)).reduce((a, b) => a + b, 0)
                + targets.length * get.attitude(player, target);
              if (target.isDamaged() && target.countCards('h') + targets.length <= player.countCards('h')) {
                eff += get.recoverEffect(target, player, player);
              }
              return eff;
            })
            .forResult();
        },
        async content(event, trigger, player) {
          const target = event.targets[0];
          const givers = game.filterPlayer(p => p != player && p != target)
            .filter(p => p.countCards('he') && p.inRange(target));
          for (let giver of givers) {
            if (!target.isIn()) {
              return;
            }
            if (!giver.isIn()) {
              continue;
            }
            await giver.chooseToGive(target, true, 'he');
          }
          if (!target.isDamaged() || target.countCards('h') > player.countCards('h')) {
            return;
          }
          let { result } = await player.chooseBool(`是否令${get.translation(target)}回复1点体力？`, get.recoverEffect(target, player, player) > 0);
          if (result.bool) {
            target.recover(player);
          }
        },
      },
      jlsg_huisheng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "damageBegin4" },
        filter: function (event, player) {
          if (!player.countCards("h")) return false;
          if (!event.source || event.source == player || !event.source.isIn()) return false;
          return true;
        },
        async cost(event, trigger, player) {
          let max = Math.min(3, player.countCards('h'));
          let prompt = `###${get.prompt(event.skill)}###令${get.translation(trigger.source)}观看你至多${max}张手牌`;
          event.result = await player
            .chooseCard(prompt, [1, max])
            .set("ai", card => {
              let value = get.value(card) / _status.event.dmgCnt;
              if (!ui.selected.cards.length) {
                return 7 - get.value(card);
              }
              return 4 - value;
            })
            .set('dmgCnt', trigger.num)
            .forResult();
        },
        async content(event, trigger, player) {
          const target = trigger.source;
          // target.viewCards(event.name, event.cards);
          if (target.countDiscardableCards(target, "he") >= event.cards.length) {
            let { result } = await target.chooseToDiscard(event.cards.length, 'he')
              .set('dialog', [`###贿生###选择${get.cnNumber(event.cards.length)}张牌弃置，否则获得${get.translation(player)}的一张手牌并防止此伤害`, event.cards])
              .set('ai', card => {
                let target = _status.event.target;
                if (get.attitude(_status.event.player, target) >= 0) {
                  return 0;
                }
                let cnt = _status.event.selectCard[0];
                let value = 8 - cnt * 1.5 - get.value(card) + 2 * Math.random();
                if (cnt > 1 && cnt == target.countCards('h')) {
                  value -= cnt / 2;
                }
                return value;
              })
              .set('target', player);
            if (result.bool) {
              if (player.ai.shown > target.ai.shown && get.attitude(target, player) < 0) {
                target.addExpose(0.3);
              }
              return;
            }
          }
          let { result } = await target.chooseCardButton(event.cards, true, `获得的${get.translation(player)}一张牌`)
            .set('ai', card => get.value(card));
          if (result.cards) {
            await target.gain(player, result.cards, 'giveAuto');
            trigger.cancel();
          }
        },
      },
      jlsg_manyi: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          player: "useCardToPlayered",
          target: "useCardToTargeted",
        },
        filter(event, player, name) {
          if (event.card.name == "nanman") return false;
          if (name == "useCardToTargeted" && event.player == player) return false;
          return event.card.name == "sha" || get.type(event.card) == "trick"
        },
        prompt(event, player) {
          return `蛮裔：是否将${get.translation(event.card)}的效果改为【南蛮入侵】？`;
        },
        prompt2(event, player) {
          return `然后你可以摸一张牌`;
        },
        check(event, player, name) {
          let eff1 = 0, eff2 = 0, source = event.player,
            card = get.autoViewAs({ name: "nanman", ...event.card }, event.cards);
          if (name == "useCardToPlayered") source = player;
          for (let target of event.targets) {
            eff1 += get.effect(target, card, source, player);
            eff2 += get.effect(target, event.card, source, player);
          };
          return eff1 >= eff2;
        },
        async content(event, trigger, player) {
          game.log(player, "将", trigger.card, "的效果改为了【南蛮入侵】");
          trigger.card.name = 'nanman';
          if (trigger.card.isCard) trigger.card.isCard = false;
          trigger.getParent().effectCount = get.info(trigger.card, false).effectCount || 1;
          trigger.getParent().excluded = [];
          trigger.getParent().directHit = [];
          trigger.getParent().card.storage = {};
          trigger.getParent().baseDamage = 1;
          trigger.getParent().extraDamage = 0;
          await player.draw();
        },
        ai: {
          expose: 0.2,
        },
      },
      jlsg_souying: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'respondAfter' },
        filter(event, player) {
          switch (event.card.name) {
            case 'sha':
              return game.hasPlayer(p => !player.getStorage('jlsg_souying_temp').includes(p));
              break;
            case 'sha':
              return game.hasPlayer(p => !player.getStorage('jlsg_souying_temp').includes(p) && p.isDamaged());
              break;
            default:
              return false;
          }
        },
        async cost(event, trigger, player) {
          event.result = await player.chooseTarget((_, player, target) => {
            if (player.getStorage('jlsg_souying_temp').includes(target)) { return false; }
            return _status.event.cardName != 'shan' || target.isDamaged();
          })
            .set('prompt', get.prompt(event.skill))
            .set('prompt2', trigger.card.name == 'sha' ? '对一名角色造成1点伤害' : '令一名角色回复1点体力')
            .set('cardName', trigger.card.name)
            .set('ai', target => get[_status.event.cardName == 'sha' ? 'damageEffect' : 'recoverEffect'](target, _status.event.player, _status.event.player))
            .forResult();
        },
        async content(event, trigger, player) {
          if (trigger.card.name == 'sha') {
            event.targets[0].damage();
          } else {
            event.targets[0].recover();
          }
          player.addTempSkill('jlsg_souying_temp');
          player.storage.jlsg_souying_temp = player.getStorage('jlsg_souying_temp').concat(event.targets[0]);
        }
      },
      jlsg_souying_temp: {
        onremove: true,
      },
      jlsg_guolun: {
        audio: "ext:极略/audio/skill:2",
        init(player) {
          player.storage.jlsg_guolun = 0;
        },
        trigger: { global: ['drawAfter', 'discardAfter', 'recoverAfter', 'damageAfter'] },
        priority: 1,
        filter(event, player) {
          return game.hasPlayer(p => this.filterTargetDefault(event, player, p, false));
        },
        usable: 1,
        filterTargetDefault(trigger, player, target, isReverse) {
          switch (player.storage.jlsg_guolun) {
            case 0:
              if (!isReverse) {
                return false;
              }
            // fall through
            case 1:
              if (trigger.player != player) {
                return false;
              }
            // fall through
            case 2:
              if (!['draw', 'discard'].includes(trigger.name)) {
                return false;
              }
          }
          let action = trigger.name;
          if (isReverse) {
            action = {
              'draw': 'discard',
              'discard': 'draw',
              'recover': 'damage',
              'damage': 'recover',
            }[trigger.name];
          }
          let source = trigger.player;
          if (trigger.name == 'damage') {
            if (!trigger.source) {
              return false;
            }
            source = trigger.source;
          }
          if (source == target) {
            return false;
          }
          if (action == 'discard') {
            return target.countDiscardableCards(target, 'he');
          }
          if (action == 'recover') {
            return target.isDamaged();
          }
          return true;
        },
        getAITarget(trigger, player, isReverse) {
          let targets = game.filterPlayer(p => lib.skill.jlsg_guolun.filterTargetDefault(trigger, player, p, isReverse));
          let action = trigger.name;
          if (isReverse) {
            action = {
              'draw': 'discard',
              'discard': 'draw',
              'recover': 'damage',
              'damage': 'recover',
            }[trigger.name];
          }
          let aiTarget, maxEff = 0;
          switch (action) {
            case 'draw':
              return targets.filter(p => get.attitude(player, p) > 0).randomGet();
            case 'discard':
              for (let target of targets) {
                let eff = -Math.min(trigger.num, target.countDiscardableCards(target, 'he'));
                eff *= get.attitude(player, target);
                if (eff > maxEff) {
                  maxEff = eff;
                  aiTarget = target;
                }
              }
              return aiTarget;
            case 'recover':
              for (let target of targets) {
                let eff = get.recoverEffect(target, trigger.source || player, player);
                if (eff > maxEff) {
                  maxEff = eff;
                  aiTarget = target;
                }
              }
              return aiTarget;
            case 'damage':
              for (let target of targets) {
                let eff = get.damageEffect(target, trigger.source || player, player, trigger.nature);
                if (eff > maxEff) {
                  maxEff = eff;
                  aiTarget = target;
                }
              }
              return aiTarget;
              break;
          }
        },
        async cost(event, trigger, player) {
          let prompt2 = '选择一名角色';
          let aiTarget = lib.skill.jlsg_guolun.getAITarget(trigger, player, false);
          switch (trigger.name) {
            case 'draw':
              prompt2 += `摸${get.cnNumber(trigger.num)}张牌`;
              break;
            case 'discard':
              prompt2 += `弃${get.cnNumber(trigger.cards.length)}张牌`;
              break;
            case 'recover':
              prompt2 += `回复${trigger.num}点体力`;
              break;
            case 'damage':
              let nature = '';
              if (trigger.nature) {
                nature = get.translation(trigger.nature) + '属性';
              }
              prompt2 += `受到来自${get.translation(trigger.source)}的${trigger.num}点${nature}伤害`;
              break;
          }
          event.result = await player
            .chooseTarget(`###${get.prompt('jlsg_guolun')}###${prompt2}`, (_, player, target) => {
              return lib.skill.jlsg_guolun.filterTargetDefault(_status.event.getTrigger(), player, target, false);
            })
            .set("ai", target => {
              return target == _status.event.aiTarget;
            })
            .set('aiTarget', aiTarget)
            .forResult();
          if (event.result.bool) {
            let target = event.result.targets[0];
            if (trigger.source) {
              player.line2([trigger.source, target], 'green');
            } else {
              player.line(target, 'green');
            }
          }
        },
        line: false,
        async content(event, trigger, player) {
          let target = event.targets[0];
          switch (trigger.name) {
            case 'draw':
              target.draw(trigger.num);
              break;
            case 'discard':
              target.chooseToDiscard(true, 'he', trigger.cards.length);
              break;
            case 'recover':
              target.recover(trigger.num, trigger.source || player);
              break;
            case 'damage':
              target.damage(trigger.num, trigger.source);
              break;
          }
        },
        group: 'jlsg_guolun_reverse',
        derivation: ['jlsg_guolun2', 'jlsg_guolun3', 'jlsg_guolun4'],
        subSkill: {
          reverse: {
            audio: 'jlsg_guolun',
            trigger: { global: ['drawAfter', 'discardAfter', 'recoverAfter', 'damageAfter'] },
            filter(event, player) {
              return game.hasPlayer(p => lib.skill.jlsg_guolun.filterTargetDefault(event, player, p, true));
            },
            usable: 1,
            async cost(event, trigger, player) {
              let prompt2 = '选择一名角色';
              let aiTarget = lib.skill.jlsg_guolun.getAITarget(trigger, player, true);
              switch (trigger.name) {
                case 'draw':
                  prompt2 += `弃${get.cnNumber(trigger.num)}张牌`;
                  break;
                case 'discard':
                  prompt2 += `摸${get.cnNumber(trigger.cards.length)}张牌`;
                  break;
                case 'recover':
                  let source = '';
                  if (trigger.source) {
                    source = `来自${get.translation(trigger.source)}的`;
                  }
                  prompt2 += `受到${source}${trigger.num}点伤害`;
                  break;
                case 'damage':
                  prompt2 += `回复${trigger.num}点体力`;
                  break;
              }
              event.result = await player
                .chooseTarget(`###${get.prompt('jlsg_guolun')}###${prompt2}`, (_, player, target) => {
                  return lib.skill.jlsg_guolun.filterTargetDefault(_status.event.getTrigger(), player, target, true);
                })
                .set("ai", target => {
                  return target == _status.event.aiTarget;
                })
                .set('aiTarget', aiTarget)
                .forResult();
              if (event.result.bool) {
                let target = event.result.targets[0];
                if (trigger.source) {
                  player.line2([trigger.source, target], 'green');
                } else {
                  player.line(target, 'green');
                }
              }
            },
            line: false,
            async content(event, trigger, player) {
              let target = event.targets[0];
              switch (trigger.name) {
                case 'draw':
                  target.chooseToDiscard(true, 'he', trigger.num);
                  break;
                case 'discard':
                  target.draw(trigger.cards.length);
                  break;
                case 'recover':
                  target.damage(trigger.num, trigger.source || player);
                  break;
                case 'damage':
                  target.recover(trigger.num, trigger.source);
                  break;
              }
            },
          },
        }
      },
      jlsg_songsang: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: 'die' },
        filter(event, player) {
          return event.player != player;
        },
        forced: true,
        async content(event, trigger, player) {
          if (player.hasSkill('jlsg_guolun')) {
            player.storage.jlsg_guolun = Math.min(3, player.storage.jlsg_guolun + 1);
            player.syncStorage("jlsg_guolun");
          }
          player.draw(game.countPlayer());
        },
      },
      jlsg_qinguo: {
        audio: "ext:极略/audio/skill:2",
        locked: false,
        mod: {
          playerEnabled: (card, player, target) => {
            let info = get.info(card);
            if (info.type != 'equip') {
              return;
            }
            if (!player.isPhaseUsing()) {
              return;
            }
            if (info.selectTarget && info.selectTarget !== -1) {
              return true;
            }
            if (info.modTarget) {
              if (typeof info.modTarget == 'boolean') return info.modTarget;
              if (typeof info.modTarget == 'function') return Boolean(info.modTarget(card, player, target));
            }
          },
          selectTarget(card, player, num) {
            let info = get.info(card);
            if (info.type != 'equip') {
              return;
            }
            if (!player.isPhaseUsing()) {
              return;
            }
            if (num[1] < 0) {
              if (num[0] === num[1]) {
                num[0] = 1;
              }
              num[1] = 1;
            }
          }
        },
        trigger: { player: 'useCardAfter' },
        filter(event, player) {
          if (get.type(event.card) != 'equip') {
            return false;
          }
          let cards = lib.inpile
            .filter(c => lib.card[c].type === 'basic')
            .map(c => {
              let cards = [{ name: c, isCard: true }];
              if (c == 'sha') {
                for (let nature of lib.inpile_nature) {
                  cards.push({ name: c, nature, isCard: true });
                }
              }
              return cards;
            })
            .flat()
            .filter(c => player.hasUseTarget(c, undefined, false));
          return cards.length;
        },
        direct: true,
        async content(event, trigger, player) {
          let cards = lib.inpile
            .filter(c => lib.card[c].type === 'basic')
            .map(c => {
              let cards = [{ name: c, isCard: true }];
              if (c == 'sha') {
                for (let nature of lib.inpile_nature) {
                  cards.push({ name: c, nature, isCard: true });
                }
              }
              return cards;
            })
            .flat()
            .filter(c => player.hasUseTarget(c, undefined, false));

          let { result } = await player.chooseButton([
            get.prompt('jlsg_qinguo'),
            [
              cards.map(c => ["基本", "", c.name, c.nature]),
              'vcard',
            ],
          ]);
          if (!result.bool) {
            event.finish();
            return;
          }
          let card = { name: result.links[0][2], nature: result.links[0][3], isCard: true };
          await player.chooseUseTarget(card, false)
            .set('logSkill', event.name);
        },
        group: ['jlsg_qinguo_gain'],
        subSkill: {
          gain: {
            audio: 'jlsg_qinguo',
            trigger: {
              global: ["equipAfter", "loseAfter", "loseAsyncAfter", "cardsDiscardAfter"],
            },
            filter(event, player) {
              let cards = this.getCards(event, player);
              return cards.length;
            },
            getCards(event, player) {
              if (event.name == 'cardsDiscard') {
                // 装备牌转化出牌
                let parent = event.getParent();
                if (parent.name !== 'orderingDiscard') {
                  return false;
                }
                let source = parent.relatedEvent || parent.getParent();
                let dcards = event.getd().filter(c => get.type(c) == 'equip');
                let lcards = new Set();
                for (let p of game.filterPlayer(p => p != player)) {
                  let events = p.getHistory('lose', e => source == (e.relatedEvent || e.getParent()));
                  for (let plose of events) {
                    for (let v of plose.getl(p).es) {
                      lcards.add(v);
                    }
                  }
                }
                return dcards.filter(c => lcards.has(c)).filterInD('d');
              }
              let lcards = game.filterPlayer(p => p != player)
                .map(p => event.getl(p).es)
                .flat();
              let dcards = game.filterPlayer(p => p != player)
                .map(p => event.getd(p))
                .flat();
              return lcards.filter(c => get.type(c) == 'equip' && dcards.includes(c)).filterInD('d');
            },
            usable: 1,
            async cost(event, trigger, player) {
              let cards = lib.skill.jlsg_qinguo_gain.getCards(trigger, player);
              if (cards.length == 1) {
                let prompt = `###${get.prompt('jlsg_qinguo')}###获得弃牌堆中的${get.translation(cards[0])}`;
                event.result = await player.chooseBool(prompt, true)
                  .forResult();
                if (event.result.bool) {
                  event.result.cards = cards;
                }
              } else {
                let prompt = `###${get.prompt('jlsg_qinguo')}###获得弃牌堆中的一张装备`;
                event.result = await player.chooseCardButton(prompt, cards)
                  .set('ai', button => {
                    let player = _status.event.player;
                    let card = button.link;
                    let value = get.value(card);
                    let cnt = player.countCards('hx', { type: 'equip', subtype: get.subtype(card) });
                    if (cnt) {
                      value /= (1 + 2 * cnt);
                    }
                    if (player.countCards('hx', { name: card.name })) {
                      value /= 2;
                    }
                    return value;
                  })
                  .forResult();
                event.result.cards = event.result.links.slice();
              }
            },
            async content(event, trigger, player) {
              player.gain(event.cards[0], 'gain2');
            },
          },
        }
      },
      jlsg_zhenge: {
        audio: "ext:极略/audio/skill:2",
        derivation: 'jlsg_zhenge_derivation',
        trigger: { player: 'useCardBegin' },
        silent: true,
        forced: true,
        lastDo: true,
        filter(event, player) {
          return Array.isArray(event.cards);
        },
        async content(event, trigger, player) {
          if (trigger.cards.some(c => !c.hasGaintag('jlsg_zhenge'))) {
            trigger.set('jlsg_zhenge_gain_valid', true);
          }
          if (trigger.cards.length && trigger.cards.every(c => c.hasGaintag('jlsg_zhenge'))) {
            trigger.set('jlsg_zhenge_target_valid', true);
            trigger.set('addCount', false);
          }
        },
        subfrequent: 'gain',
        group: ['jlsg_zhenge_gain', 'jlsg_zhenge_target'],
        subSkill: {
          gain: {
            audio: 'jlsg_zhenge',
            trigger: { player: 'useCardAfter' },
            frequent: true,
            filter(event, player) {
              return event.jlsg_zhenge_gain_valid;
            },
            async content(event, trigger, player) {
              let card = ui.cardPile.lastChild;
              if (card) {
                player.gain(card).set("gaintag", ['jlsg_zhenge']);
                player.$drawAuto([card]);
                await game.delayx(0.5);
              }
            },
          },
          target: {
            audio: 'jlsg_zhenge',
            trigger: { player: 'useCardToPlayered' },
            filter(event, player) {
              return event.getParent().jlsg_zhenge_target_valid && ['red', 'black'].includes(get.color(event.card));
            },
            logTarget: 'target',
            check(event, player) {
              if (get.color(event.card) == 'red') {
                return get.attitude(player, event.target) > 0.5 + Math.random();
              } else {
                return get.attitude(player, event.target) < 0.5 - Math.random();
              }
            },
            locked: false,
            prompt2(event, player) {
              let eff = get.color(event.card) == 'red' ? '正面效果' : '负面效果';
              return '使其获得随机一个' + eff;
            },
            async content(event, trigger, player) {
              let target = trigger.target;
              if (get.color(trigger.card) == 'red') {
                if (get.attitude(player, target) > 1 && target.ai.shown > player.ai.shown) {
                  player.addExpose(0.2);
                }
                let index = Math.floor(8 * Math.random());
                let cnt;
                switch (index) {
                  case 0:
                    let skills = [];
                    for (let name of jlsg.characterList) {
                      skills.addArray(get.character(name)?.[3] ?? []);
                    }
                    skills.removeArray(
                      game.filterPlayer(null, undefined, true).reduce((list, current) => list.addArray(current.getSkills(null, false, false)), [])
                    );
                    skills = skills.filter(skill => {
                      if (lib.filter.skillDisabled(skill)) return false;
                      const info = lib.skill[skill];
                      if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
                      return true;
                    });
                    let skill = skills.randomGet();
                    if (!skill) {
                      break;
                    }
                    target.popup(skill);
                    target.flashAvatar(player == target ? event.name : null, skill);
                    await target.addSkills(skill);
                    break;
                  case 1:
                    target.addSkill('jlsg_zhenge_buff');
                    target.storage.jlsg_zhenge_buff.hand += 1;
                    break;
                  case 2:
                    cnt = [1, 2].randomGet();
                    let type = ['basic', 'trick', 'equip'].randomGet();
                    let cards = Array.from(ui.cardPile.childNodes).filter(c => get.type(c) == type);
                    if (cards.length < cnt) {
                      cards.push(...Array.from(ui.discardPile.childNodes).filter(c => get.type(c) == type));
                    }
                    cards = cards.randomGets(cnt);
                    if (!cards.length) {
                      game.log(target, '没能获得', get.translation(type), '牌');
                      await game.delayx(0.5);
                    } else {
                      await target.gain(cards, 'gain2');
                    }
                    break;
                  case 3:
                    cnt = jlsg.distributionGet([0, 1, 0.2, 0.1]);
                    await target.gainMaxHp(cnt);
                    break;
                  case 4:
                    cnt = jlsg.distributionGet([0, 1, 0.2, 0.1]);
                    if (target.isHealthy()) {
                      game.log(target, "回复了体力");
                      await game.delayx(0.5);
                    } else {
                      await target.recover(cnt, player);
                    }
                    break;
                  case 5:
                    target.addSkill('jlsg_zhenge_buff');
                    target.storage.jlsg_zhenge_buff.draw += 1;
                    break;
                  case 6:
                    target.addSkill('jlsg_zhenge_buff');
                    target.storage.jlsg_zhenge_buff.sha += 1;
                    break;
                  case 7:
                    cnt = jlsg.distributionGet([0, 1, 1, 0.4, 0.2, 0.1]);
                    target.draw(cnt, player);
                    break;
                }
              } else {
                if (get.attitude(player, target) < -1 && target.ai.shown > player.ai.shown) {
                  player.addExpose(0.2);
                }
                let index = Math.floor(8 * Math.random());
                let cnt;
                switch (index) {
                  case 0:
                    await target.link();
                    break;
                  case 1:
                    cnt = jlsg.distributionGet([0, 1, 1, 0.4, 0.2, 0.1]);
                    target.randomDiscard(cnt);
                    break;
                  case 2:
                    cnt = jlsg.distributionGet([0, 1, 0.2, 0.1]);
                    target.damage(cnt);
                    break;
                  case 3:
                    let skill = target.getSkills(null, false, false);
                    if (!skill) {
                      game.log(target, '没有可以失去的技能');
                    } else {
                      target.popup(skill, 'gray');
                      await target.removeSkills(skill);
                    }
                    break;
                  case 4:
                    await target.turnOver();
                    break;
                  case 5:
                    cnt = jlsg.distributionGet([0, 1, 0.2, 0.1]);
                    target.damage(cnt, 'fire');
                    break;
                  case 6:
                    cnt = jlsg.distributionGet([0, 1, 0.1]);
                    target.loseMaxHp(cnt);
                    break;
                  case 7:
                    cnt = jlsg.distributionGet([0, 1, 0.2, 0.1]);
                    target.loseHp(cnt);
                    break;
                }
              }
            },
            mod: {
              ignoredHandcard(card, player) {
                if (card.hasGaintag("jlsg_zhenge")) {
                  return true;
                }
              },
              cardDiscardable(card, player, name) {
                if (name == "phaseDiscard" && card.hasGaintag("jlsg_zhenge")) {
                  return false;
                }
              },
              cardUsable(card, player, num) {
                if (card.cards && card.cards.every(i => i.hasGaintag("jlsg_zhenge"))) {
                  return Infinity;
                }
              },
            },
          },
          buff: {
            init(player) {
              player.storage.jlsg_zhenge_buff = {
                hand: 0,
                draw: 0,
                sha: 0,
              };
            },
            locked: false,
            popup: false,
            forced: true,
            trigger: { player: "phaseDrawBegin2" },
            filter: function (event, player) {
              return !event.numFixed && player.storage.jlsg_zhenge_buff.draw;
            },
            content: function () {
              trigger.num += player.storage.jlsg_zhenge_buff.draw;
            },
            mark: true,
            marktext: '枕',
            intro: {
              markcount(storage) {
                return storage.hand + storage.draw + storage.sha;
              },
              content(storage) {
                let result = [];
                if (storage.hand) {
                  result.push(`手牌上限+${storage.hand}`);
                }
                if (storage.draw) {
                  result.push(`摸牌阶段摸牌数+${get.cnNumber(storage.draw)}`);
                }

                if (storage.sha) {
                  result.push(`使用杀次数上限+${get.cnNumber(storage.sha)}`);
                }

                return result.join('<br>');
              },
            },
            mod: {
              cardUsable(card, player, num) {
                if (card.name == "sha") {
                  return num + player.storage.jlsg_zhenge_buff.sha;
                }
              },
              maxHandcard: function (player, num) {
                return num + player.storage.jlsg_zhenge_buff.hand;
              },
            },
          },
        }
      },
      jlsg_zhenge_derivation: { sub: true },
      jlsg_xinghan: {
        audio: "ext:极略/audio/skill:2",
        forbid: ['hearth', 'guozhan'],
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
          Object.defineProperty(_status, 'jlsg_xinghan_compact', {
            enumerable: true,
            configurable: true,
            get() {
              let result = game.hasPlayer(p => p.getSkills(null, false, false).some(s => s != 'jlsg_xinghan' && lib.skill[s].changeSeat));
              delete this.jlsg_xinghan_compact;
              this.jlsg_xinghan_compact = result;
              return result;
            },
          });
          game.broadcastAll(function () {
            // player.isMin
            let isMin = Object.getOwnPropertyDescriptor(lib.element.Player.prototype, 'isMin');
            Object.defineProperty(lib.element.Player.prototype, 'isMin', {
              ...isMin,
              value: function (distance) {
                if (this.hasSkill('jlsg_xinghan_recruit')) {
                  return false;
                }
                return isMin.value.apply(this, arguments);
              }
            });
            // player.setIdentity
            let setIdentity = Object.getOwnPropertyDescriptor(lib.element.Player.prototype, 'setIdentity');
            Object.defineProperty(lib.element.Player.prototype, 'setIdentity', {
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
              }
            });
            player.isUnderControl
            let isUnderControl = Object.getOwnPropertyDescriptor(lib.element.Player.prototype, 'isUnderControl');
            Object.defineProperty(lib.element.Player.prototype, 'isUnderControl', {
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
              }
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
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = "jlsg-xinghan";
            document.head.appendChild(style);
            let scale = 0.8, scale2 = 0.9;
            if (ui.arena.dataset.number > 8) {
              scale = 4.8 / ui.arena.dataset.number;
              scale2 = 5.4 / ui.arena.dataset.number;
            }
            let testP = ui.create.player(ui.arena);
            testP.classList.add('fullskin', 'minskin');
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
            })
          }
        },
        intro: {
          mark: function (dialog, storage, player) {
            dialog.add(storage);
            if (player.storage.jlsg_xinghan_removed.length) {
              let removed = player.storage.jlsg_xinghan_removed;
              dialog.add(removed);
              for (let i = 0; i != removed.length; ++i) {
                dialog.buttons[dialog.buttons.length - i].classList.add('dead');
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
            ({ result } = await player.chooseControl(player.storage.jlsg_xinghan_token.concat('cancel2'))
              .set('prompt', get.prompt('jlsg_xinghan'))
              .set('prompt2', '选择招募的势力'));
          }
          if (result.control == 'cancel2') {
            return;
          }
          let choices = jlsg.characterList.filter(c => get.character(c, 1) == result.control).randomGets(3);
          if (!choices.length) {
            return;
          }
          let { result: result2 } = await player.chooseButton([
            `招募一名的${get.translation(result.control)}势力武将`,
            [choices, 'character'],
          ]);
          event.result = { bool: result2.bool, };
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
            recruit = game.addFellow(player.dataset.position, name, 'zoominanim');
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
          recruit.addSkill('jlsg_xinghan_recruit');
          recruit.draw(2)._triggered = null;
          game.log(player, '招募了', recruit);
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
          }
          game.broadcastAll(function (recruit, player) {
            Object.defineProperty(recruit.ai, 'shown', {
              enumerable: true,
              get() {
                return player.ai.shown;
              },
              set(value) {
                player.ai.shown = value;
              },
            })
          }, recruit, player);
          Object.defineProperty(recruit, 'identity', {
            enumerable: true,
            get() {
              if (this.storage.jlsg_xinghan_recruit) {
                return lib.skill.jlsg_xinghan.mapIdentity(this.storage.jlsg_xinghan_recruit.identity);
              }
            },
          });
          Object.defineProperty(recruit, 'identityShown', {
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
            game.broadcastAll(function (player, recruit) {
              if (player.identity && (!game.getIdentityList || !game.getIdentityList(player))) {
                recruit.setIdentity();
              } else {
                recruit.setIdentity(player.node.identity.firstChild.innerHTML, player.node.identity.dataset.color);
              }
            }, player, recruit);
          }
          const players = player.storage.jlsg_xinghan.concat(player);
          for (let p of players) {
            p.storage.zhibi = p.getStorage('zhibi').concat(recruit);
            recruit.storage.zhibi = recruit.getStorage('zhibi').concat(p);
            p.ai.modAttitudeFrom = function (from, to, att) {
              from = from.storage.jlsg_xinghan_recruit || from;
              to = to.storage.jlsg_xinghan_recruit || to;
              const currents = game.filterPlayer(null, undefined, true)
                .map(i => i.storage.jlsg_xinghan_recruit || i)
                .unique();
              currents.remove(from);
              if (currents.length == 1 && currents[0] == to) return -2;
              return get.attitude(from, to);
            }
            p.ai.modAttitudeTo = function (from, to, att) {
              from = from.storage.jlsg_xinghan_recruit || from;
              to = to.storage.jlsg_xinghan_recruit || to;
              const currents = game.filterPlayer(null, undefined, true)
                .map(i => i.storage.jlsg_xinghan_recruit || i)
                .unique();
              currents.remove(to);
              if (currents.length == 1 && currents[0] == from) return -2;
              return get.attitude(from, to);
            }
          };
          // AI attitude
          player.markAuto('jlsg_xinghan', recruit);
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
            case 'rZhu':
              return 'rZhong';
            case 'bZhu':
              return 'bZhong';
            case 'zhu':
              return 'zhong';
            case 'nei':
              return 'commoner';
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
        }
      },
      jlsg_xinghan_recruit: {
        init(player) {
          player.classList.add('jlsg-xinghan-recruit');
          if (!_status.jlsg_xinghan_compact) {
            player.classList.add('minskin');
          }
        },
        firstDo: true,
        charlotte: true,
        mark: true,
        marktext: '招',
        intro: {
          name: '招募',
          name2: '招募',
          content(storage) {
            return `受${get.translation(storage)}招募`;
          },
        },
        silent: true,
        forceDie: true,
        forced: true,
        trigger: { global: ['phaseBefore', 'phaseAfter', 'die'] },
        filter(event, player) {
          if (event.name == 'die') {
            return event.player == player.storage.jlsg_xinghan_recruit || event.player == player;
          }
          return !player._trueMe;
        },
        async content(event, trigger, player) {
          let recruiter = player.storage.jlsg_xinghan_recruit;
          if (!player._trueMe) {
            player._trueMe = recruiter;
          }
          if (trigger.name == 'die') {
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
      jlsg_qianchong: {
        audio: "ext:极略/audio/skill:2",
        group: ['jlsg_qianchong_red', 'jlsg_qianchong_black', 'jlsg_qianchong_extra'],
        subSkill: {
          red: {
            audio: 'jlsg_qianchong',
            trigger: { global: 'phaseEnd' },
            priority: 1,
            filter(event, player) {
              let evts = player.getHistory('useCard', e => get.color(e.card) == 'red');
              return evts.length == 1;
            },
            async cost(event, trigger, player) {
              let { result } = await player.chooseTarget(`###${get.prompt('jlsg_qianchong')}###令一名角色回复2点体力或摸其体力上限张牌`)
                .set('ai', target => {
                  let player = _status.event.player;
                  let eff = get.recoverEffect(target, player, player);
                  if (target.getDamagedHp() >= 2) {
                    eff += 0.58 * eff;
                  }
                  let eff2 = get.attitude(player, target) * target.maxHp;
                  return Math.max(eff, eff2);
                });
              if (!result.bool) {
                return;
              }
              let target = result.targets[0];
              let result2;
              if (target.isHealthy()) {
                result2 = {
                  index: 1,
                };
              } else {
                let eff = get.recoverEffect(target, player, player);
                if (target.getDamagedHp() >= 2) {
                  eff += 0.58 * eff;
                }
                let eff2 = get.attitude(player, target) * target.maxHp;
                let choice = eff > eff2 ? 0 : 1;
                result2 = await player.chooseControlList([
                  `令${get.translation(target)}回复2点体力`,
                  `令${get.translation(target)}摸${get.cnNumber(target.maxHp)}张牌`,
                ])
                  .set('ai', () => _status.event.choice)
                  .set('choice', choice)
                  .forResult();
                if (result2.control == 'cancel2') {
                  return;
                }
              }
              event.result = {
                bool: true,
                targets: [target],
                cost_data: result2.index,
              }
            },
            async content(event, trigger, player) {
              let target = event.targets[0];
              if (get.attitude(player, target) > 0 && target.ai.shown > player.ai.shown) {
                player.addExpose(0.2);
              }
              if (event.cost_data == 0) {
                target.recover(2, player);
              } else {
                target.draw(target.maxHp, player);
              }
            },
          },
          black: {
            audio: 'jlsg_qianchong',
            trigger: { global: 'phaseEnd' },
            priority: 0.9,
            filter(event, player) {
              let evts = player.getHistory('useCard', e => get.color(e.card) == 'black');
              return evts.length == 1;
            },
            async cost(event, trigger, player) {
              let { result } = await player.chooseTarget(`###${get.prompt('jlsg_qianchong')}###令一名角色失去2点体力或弃置其体力上限张牌`)
                .set('ai', target => {
                  let player = _status.event.player;
                  let eff = 1.4 * jlsg.getLoseHpEffect(target) * (get.attitude(player, target) - 1);
                  let eff2 = (get.attitude(player, target) - 1) * -Math.min(target.countCards('he'), target.maxHp);
                  return Math.max(eff, eff2);
                });
              if (!result.bool) {
                return;
              }
              let target = result.targets[0];
              let result2;
              if (target.countCards('he') == 0) {
                result2 = {
                  index: 0,
                };
              } else {
                let eff = 1.4 * jlsg.getLoseHpEffect(target) * (get.attitude(player, target) - 1);
                let eff2 = (get.attitude(player, target) - 1) * -Math.min(target.countCards('he'), target.maxHp);
                let choice = eff > eff2 ? 0 : 1;
                result2 = await player.chooseControlList([
                  `令${get.translation(target)}失去2点体力`,
                  `令${get.translation(target)}弃置${get.cnNumber(target.maxHp)}张牌`,
                ])
                  .set('ai', () => _status.event.choice)
                  .set('choice', choice)
                  .forResult();
                if (result2.control == 'cancel2') {
                  return;
                }
              }
              event.result = {
                bool: true,
                targets: [target],
                cost_data: result2.index,
              }
            },
            async content(event, trigger, player) {
              let target = event.targets[0];
              if (get.attitude(player, target) < 0 && target.ai.shown > player.ai.shown) {
                player.addExpose(0.3);
              }
              if (event.cost_data == 0) {
                target.loseHp(2);
              } else {
                target.chooseToDiscard(target.maxHp, 'he', true);
              }
            },
          },
          extra: {
            forced: true,
            locked: false,
            trigger: { player: 'phaseEnd' },
            filter(event, player) {
              let evts = player.getHistory('useSkill');
              return !event.skill && evts.some(e => e.skill == 'jlsg_qianchong_red') &&
                evts.some(e => e.skill == 'jlsg_qianchong_black');
            },
            popup: false,
            async content(event, trigger, player) {
              game.log(player, '获得了一个额外回合');
              player.insertPhase(event.name)
            }
          },
        },
        ai: {
          effect: {
            player_use: function (card, player, target) {
              if (_status.currentPhase != player) {
                return;
              }
              let color = get.color(card);
              if (!color) {
                return;
              }
              let cnt = player.getHistory('useCard', e => get.color(e) == color).length;
              if (cnt == 0) {
                return [1, 8];
              }
              else if (cnt == 1) {
                let color2 = color == 'red' ? 'black' : 'red';
                let cnt2 = player.getHistory('useCard', e => get.color(e) == color2).length;
                if (_status.event.getParent('phase').skill || cnt2 > 1) {
                  return;
                }
                return [1, -8];
              }
            },
          },
          pretao: true,
        },
      },
      jlsg_shangjian: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: 'phaseDiscardBegin' },
        filter(event, player) {
          return player.countCards('h') > player.getHandcardLimit();
        },
        forced: true,
        async content(event, trigger, player) {
          let num = player.countCards('h') - player.getHandcardLimit();
          let num0 = num;
          let list = [];
          while (num > 0) {
            let select = [1, num];
            if (game.filterPlayer(p => p != player && !list.map(i => i[0]).includes(p)).length == 1) {
              select = num;
            }
            let { result } = await player.chooseCardTarget({
              forced: true,
              selectCard: [1, num],
              filterCard(card, player) {
                return !_status.event.list.map(i => i[1]).flat().includes(card);
              },
              filterTarget(card, player, target) {
                return player != target && !_status.event.list.map(i => i[0]).includes(target);
              },
              ai1(card) {
                if (card.name == "du") return 20;
                if (ui.selected.cards.some(c => c.name == 'du')) {
                  return -Math.random();
                }
                return Math.random();
              },
              ai2: function (target) {
                const player = get.event("player"),
                  att = get.attitude(player, target);
                if (ui.selected.cards.some(c => c.name == 'du') && !target.hasSkillTag("nodu"))
                  return -20 * att;
                return att + 2 * Math.random();
              },
              prompt: `尚俭：将${get.cnNumber(num0)}张手牌分配给其他角色`,
              prompt2: num == num0 ? null : `剩余${get.cnNumber(num)}张`,
            }).set('list', list);
            if (!result.bool) {
              return;
            }
            list.push([result.targets[0], result.cards]);
            player.addGaintag(result.cards, "olsujian_given");
            num -= result.cards.length;
          }
          let cards = list.map(i => i[1]).flat();
          await game.loseAsync({
            gain_list: list,
            player: player,
            cards: cards,
            giver: player,
            animate: "giveAuto",
          })
            .setContent("gaincardMultiple");
          player.when({ player: "phaseDiscardEnd" })
            .filter(evt => evt == trigger)
            .vars({ cnt: cards.length })
            .then(() => {
              player.draw(cnt);
            });
        }
      },
      jlsg_yanjiao: {
        audio: "ext:极略/audio/skill:2",
        init(player) {
          player.storage.jlsg_yanjiao = [null, false, false, false, false];
        },
        enable: "phaseUse",
        filter(event, player) {
          let invalid = [];
          let hand = player.getCards('h');
          invalid.push(
            player.storage.jlsg_yanjiao[1] || hand.length < 1,
          );
          let nums = new Set(hand.map(c => get.number(c, player)));
          invalid.push(
            player.storage.jlsg_yanjiao[2] || hand.length < 2 || hand.length == nums.size,
          );
          let suits = hand.map(c => get.suit(c, player));
          invalid.push(
            player.storage.jlsg_yanjiao[3] || hand.length < 3 || lib.suits.every(s => suits.filter(cs => cs == s).length < 3),
          );
          let continuous = Array.from(new Array(14).keys())
            .some(n => nums.has(n) && nums.has(n + 1) && nums.has(n + 2) && nums.has(n + 3));
          invalid.push(
            player.storage.jlsg_yanjiao[4] || hand.length < 4 || !continuous,
          );
          let valid5 = !player.storage.jlsg_yanjiao[5] && hand.length >= 5;
          if (valid5) {
            valid5 = lib.suits.some(s => {
              let nums = new Set(hand
                .filter(c => get.suit(c, player) == s)
                .map(c => get.number(c, player)));
              return Array.from(new Array(14).keys())
                .some(n => nums.has(n) && nums.has(n + 1) && nums.has(n + 2) && nums.has(n + 3) && nums.has(n + 4));
            });
          }
          invalid.push(!valid5);
          return invalid.some(invalid => !invalid);
        },
        filterCard(card, player) {
          return lib.skill.jlsg_yanjiao.mayValid(ui.selected.cards.concat(card));
        },
        check(card) {
          return Math.random();
        },
        selectCard: [1, 5],
        complexCard: true,
        discard: false,
        lose: false,
        delay: false,
        filterTarget(_, player, target) {
          if (!lib.skill.jlsg_yanjiao.isValid(ui.selected.cards)) {
            return false;
          }
          return player != target;
        },
        filterOk() {
          return lib.skill.jlsg_yanjiao.isValid(ui.selected.cards);
        },
        isValid(cards) {
          let player = _status.event.player;
          let hand = player.getCards('h');
          if (player.storage.jlsg_yanjiao[cards.length]) {
            return false;
          }
          let nums;
          switch (cards.length) {
            case 1:
              return hand.every(c => get.number(c, player) <= get.number(cards[0], player));
            case 2:
              return get.number(cards[0], player) === get.number(cards[1], player);
            case 3:
              let suit0 = get.suit(cards[0], player);
              return suit0 == get.suit(cards[1], player) && suit0 == get.suit(cards[2], player);
            case 4:
              nums = cards.map(c => get.number(c, player)).sort((a, b) => a - b);
              return nums.every((n, i) => n - nums[0] == i);
            case 5:
              let suit = get.suit(cards[0], player);
              if (cards.some(c => get.suit(c, player) != suit)) {
                return false;
              }
              nums = cards.map(c => get.number(c, player)).sort((a, b) => a - b);
              return nums.every((n, i) => n - nums[0] == i);
            default:
              return false;
          }
        },
        mayValid(cards) {
          let player = _status.event.player;
          if (cards.length == 0) {
            return this.filter(null, player);
          }
          if (this.isValid(cards)) {
            return true;
          }
          let hand = player.getCards('h');
          hand.removeArray(cards);
          let nums = cards.map(c => get.number(c, player));
          let suits = cards.map(c => get.suit(c, player));
          let suit;
          if (suits.every(s => s == suits[0])) {
            suit = suits[0];
          }
          switch (cards.length) {
            case 1:
              if (!player.storage.jlsg_yanjiao[2] && hand.some(c => get.number(c, player) == nums[0])) {
                return true;
              }
            // fall through
            case 2:
              if (!player.storage.jlsg_yanjiao[3]
                && suit
                && hand.filter(c => get.suit(c, player) == suit).length + cards.length >= 3
              ) {
                return true;
              };
            case 3:
            case 4:
              nums.sort((a, b) => a - b);
              let num0 = nums[0], num1 = nums[nums.length - 1];
              if (player.storage.jlsg_yanjiao[4] && (player.storage.jlsg_yanjiao[5] || !suit)) {
                return false;
              }
              if (nums.some((n, i) => i != 0 && n == nums[i - 1])) {
                return false;
              }
              if (num1 - num0 + 1 > (player.storage.jlsg_yanjiao[4] ? 5 : 4)) {
                return false;
              }
              let allNums = hand.map(c => get.number(c, player));
              for (let i = num0; i <= num1; ++i) {
                if (!nums.includes(i) && !allNums.includes(i)) {
                  return false;
                }
              }
              while (allNums.includes(num1 + 1)) {
                num1 += 1;
                if (num1 - num0 + 1 >= (player.storage.jlsg_yanjiao[4] ? 5 : 4)) {
                  return true;
                }
              }
              while (allNums.includes(num0 - 1)) {
                num0 -= 1;
                if (num1 - num0 + 1 >= (player.storage.jlsg_yanjiao[4] ? 5 : 4)) {
                  return true;
                }
              }
              return false;
            default:
              return false;
          }
        },
        async content(event, trigger, player) {
          let num = event.cards.length;
          let target = event.target;
          player.storage.jlsg_yanjiao[num] = true;
          player.when({ player: "phaseUseAfter", global: "phaseAfter", })
            .then(() => {
              player.storage.jlsg_yanjiao = [null, false, false, false, false];
            });
          await player.give(event.cards, target);
          await player.draw(num);
          if (player.hasMark('jlsg_xingshen')) {
            let { result } = await player.chooseBool(
              `是否对${get.translation(target)}造成${num}点伤害？`,
              get.damageEffect(target, player, player) > 0,
            );
            if (result.bool) {
              target.damage(num);
            }
          }
        },
        combo: 'jlsg_xingshen',
        ai: {
          order: 7,
          result: {
            target(player, target) {
              if (!player.hasMark('jlsg_xingshen')) {
                return 2;
              }
              return get.attitude(player, target) >= 0 ? 2 : -1;
            },
          },
        }
      },
      jlsg_xingshen: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "damageEnd" },
        filter(event, player) {
          return event.num > 0;
        },
        getIndex(event, player) {
          return event.num;
        },
        forced: true,
        async content(event, trigger, player) {
          await player.draw(2);
          if (!player.hasMark('jlsg_xingshen')) {
            await player.recover();
            player.addMark('jlsg_xingshen');
            player.when({ player: ['phaseEnd', 'phaseAfter'] })
              .then(() => {
                player.removeMark('jlsg_xingshen');
              });
          }
        },
        intro: {
          content: 'mark',
        }
      },

      jlsg_jianzheng: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "useCardToPlayer" },
        filter: function (event, player) {
          if (player.hasSkill("jlsg_jianzheng_used") || !event.isFirstTarget) return false;
          let history = player.hasHistory("useSkill", evt => {
            if (evt.skill != "jlsg_jianzheng") return false;
            return evt.event.getParent("useCard") == event.getParent("useCard");
          })
          if (history) return false;
          if (!player.canCompare(event.player)) return false;
          let info = get.info(event.card);
          if (info.multitarget) return false;
          if (info.filterAddedTarget) return false;
          return event.player != player && ["basic", "trick"].includes(get.type(event.card));
        },
        check(event, player) {
          let effect = event.targets.reduce((effect, target) => effect + get.effect(target, event.card, event.player, player), 0),
            effect2 = game.filterPlayer()
              .reduce((effect, current) => {
                let eff = get.effect(current, event.card, event.player, player);
                return eff > 0 ? (effect + eff) : effect;
              }, 0);
          if (!event.targets.includes(player)) effect2 += get.effect(player, event.card, event.player, player) * Math.random() * 2;
          effect2 += get.effect(event.player, { name: "guohe_copy2" }, player, player);
          effect2 += get.effect(player, { name: "guohe_copy2" }, event.player, player);
          if (player.countCards("h") == 1) effect2 = effect2 * 0.5;
          return effect2 > effect;
        },
        prompt(event, player) {
          return `是否对${get.translation(event.player)}发动【谏征】与其拼点？)`
        },
        prompt2(event, player) {
          return `若你赢，你可以修改${get.translation(event.card)}的结算目标,否则你也成为此牌的目标，且此技能本回合失效`
        },
        logTarget: "player",
        async content(event, trigger, player) {
          const { result: result1 } = await player.chooseToCompare(trigger.player)
            .set("small", get.effect(player, trigger.card, trigger.player, player) > 0);
          if (result1.bool) {
            const { result: result2 } = await player.chooseTarget(`谏征：请选择${get.translation(trigger.card)}的结算目标`)
              .set("selectTarget", [0, game.countPlayer()])
              .set("filterTarget", () => true)
              .set("ai", (target) => {
                const source = get.event("source"),
                  player = get.player(),
                  card = get.event("card");
                return get.effect(target, card, source, player);
              })
              .set("source", trigger.player)
              .set("card", trigger.card);
            if (result2.bool) {
              result2.targets.sortBySeat(_status.currentPhase);
              trigger.getParent().targets.addArray(result2.targets);
              trigger.getParent().excluded.addArray(game.filterPlayer(i => !result2.targets.includes(i)))
              if (result2.targets.length) {
                trigger.player.line(result2.targets);
                game.log(player, "将", trigger.card, "的结算目标改为", result2.targets);
              }
              else {
                player.line(trigger.targets);
                game.log(player, "取消了", trigger.card, "的所有结算目标");
              }
            }
          }
          else {
            if (!trigger.getParent().targets.includes(player)) {
              trigger.getParent().targets.add(player);
              trigger.player.line(player);
              game.log(player, "成为", trigger.card, "的额外目标");
            }
            player.addTempSkill("jlsg_jianzheng_used");
          }
        },
        ai: {
          threaten: 0.9,
          expose: 0.25,
        },
        subSkill: {
          used: {
            sub: true,
            temp: true,
            charlotte: true,
            mark: true,
            marktext: "谏",
            intro: {
              content: "本回合“谏征”失效",
            },
          },
        },
      },
      jlsg_tianbian: {
        audio: "ext:极略/audio/skill:2",
        enable: ["chooseToUse", "chooseToRespond"],
        trigger: { global: ["chooseToCompareBegin"] },
        hiddenCard(player, name) {
          if (player != _status.currentPhase && get.type(name) == "basic" && lib.inpile.includes(name)) return true;
        },
        filter(event, player) {
          if (event.name == "chooseToCompare") {
            if (!player.countCards("h")) return false;
            if (player == event.player) return true;
            if (event.targets) return event.targets.includes(player);
            return player == event.target;
          }
          if (event.responded || player == _status.currentPhase || event.jlsg_tianbian) return false;
          return lib.inpile.some(i => get.type(i) == "basic" && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event));
        },
        delay: false,
        async content(event, trigger, player) {
          const evt = (trigger?.name == "chooseToCompare") ? trigger : event.getParent(2);
          evt.set("jlsg_tianbian", true);
          const cards = get.cards(3, true);
          const cardsx = cards.slice().map(card => {
            const cardx = ui.create.card();
            cardx.init(get.cardInfo(card));
            cardx._cardid = card.cardid;
            return cardx;
          });
          player.directgains(cardsx, null, "jlsg_tianbian_hs");
          let str = "天辩：选择要",
            next;
          if (evt.name == "chooseToCompare") str += "拼点的牌";
          else str += `${(evt.name == "chooseToUse" ? "使用" : "打出")}的牌`
          if (evt.name != "chooseToCompare") {//使用|打出
            player.storage.jlsg_tianbian ??= Object.entries(await game.createEvent("empty").setContent(function () { }));
            let args = Object.entries(evt),
              obj = {
                prompt: str,
                position: "s",
                forced: false,
                filterCard(card, player, event) {
                  return get.event("cards").includes(card);
                },
                filterTarget: () => false,
                selectTarget: -1,
                ai1(card) {
                  if (get.type(card) == "equip") return 0;
                  const evt = get.event().getParent(3),
                    player = get.event().player;
                  if (evt.type == "phase" && !player.hasValueTarget(card, null, true)) return 0;
                  if (evt && evt.ai) {
                    const tmp = _status.event;
                    _status.event = evt;
                    const result = (evt.ai || event.ai1)(card, player, evt);
                    _status.event = tmp;
                    return result;
                  }
                  return 1;
                },
                ai2(target) {
                  const player = get.player(),
                    card = ui.selected.cards[0];
                  return get.effect(target, card, player, player);
                },
              };
            for (let arg of args) {
              if (!obj[arg[0]] && arg[1] !== undefined && !player.storage.jlsg_tianbian.some(i => i[0] == arg[0])) {
                obj[arg[0]] = arg[1];
              }
            }
            //重新game.check()
            delete obj.fakeforce;
            delete obj._checked;
            next = player.chooseCardTarget(obj);
          }
          else {//拼点
            const hs = player.getCards("h");
            next = player.chooseCard(str, (card, player) => get.event("cards").includes(card), "s")
              .set("ai", (card, cards) => {
                const samll = get.event().getParent().samll,
                  total = get.event("hs").concat((cards || []));
                if (samll) return Math.min.apply(Math, total.map(c => get.number(c))) == get.number(card);
                return Math.max.apply(Math, total.map(c => get.number(c))) == get.number(card);
              })
              .set("hs", hs.length == 1 ? [] : hs);
          }
          next.set("cards", cardsx.filter(card => {//公共部分
            if (evt.name != "chooseToCompare") {
              if (get.type(card) != "basic") return false;
              if (player.hasSkill("aozhan") && card.name == "tao") {
                return (
                  evt.filterCard(
                    { name: "sha", isCard: true, cards: [card] },
                    evt.player,
                    evt
                  ) ||
                  evt.filterCard(
                    { name: "shan", isCard: true, cards: [card] },
                    evt.player,
                    evt
                  )
                );
              }
              return evt.filterCard(card, evt.player, evt);
            }
            return true;
          }))
          const result = await next.forResult();
          let card;
          if (result.bool) card = cards.find(card => card.cardid === result.cards[0]._cardid);
          const cards2 = player.getCards("s", card => card.hasGaintag("jlsg_tianbian_hs"));
          if (player.isOnline2()) {
            player.send(
              (cards, player) => {
                cards.forEach(i => i.delete());
                if (player == game.me) ui.updatehl();
              },
              cards2,
              player
            );
          }
          cards2.forEach(i => i.delete());
          if (player == game.me) ui.updatehl();
          if (evt.name != "chooseToCompare") {
            if (card) {
              let cardx = get.autoViewAs(card, card),
                name = card.name,
                aozhan = player.hasSkill("aozhan") && name == "tao";
              if (aozhan) {
                name = evt.filterCard(
                  {
                    name: "sha",
                    isCard: true,
                    cards: [card],
                  },
                  evt.player,
                  evt
                )
                  ? "sha"
                  : "shan";
              }
              if (evt.name == "chooseToUse") {
                evt.result = { bool: true, card: cardx, cards: card, targets: result.targets };
              }
              else {
                delete evt.result.skill;
                delete evt.result.used;
                evt.result.card = cardx;
                if (aozhan) evt.result.card.name = name;
                evt.result.cards = [card];
              }
              evt.redo();
              return;
            }
            evt.goto(0);
          }
          else {
            if (!card) return;
            if (!trigger.fixedResult) trigger.fixedResult = {};
            trigger.fixedResult[player.playerid] = card;
            await game.cardsGotoOrdering(card);
          }
        },
        ai: {
          effect: {
            target(card, player, target, effect) {
              if (get.tag(card, "respondShan")) return 0.7;
              if (get.tag(card, "respondSha")) return 0.7;
            },
          },
          order: 11,
          respondShan: true,
          respondSha: true,
          result: {
            player(player) {
              if (_status.event.dying) return get.attitude(player, _status.event.dying);
              return 1;
            },
          },
        },
      },
      jlsg_xuhe: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "useCard2" },
        filter(event, player) {
          if (!["basic", "trick"].includes(get.type(event.card))) return false;
          let targets = (event._targets || event.targets).slice();
          if (!targets.length) return false;
          if (event.player == player) return player.isHealthy();
          else return player.isDamaged() && targets.includes(player);
        },
        forced: true,
        async content(event, trigger, player) {
          let targets = (trigger._targets || trigger.targets).slice(),
            targetx = [player];
          if (trigger.player == player) targetx = game.filterPlayer(cur => cur != player);
          trigger.directHit.addArray(targetx);
          game.log(targetx, "无法响应", trigger.card);
          let drawCheck = player.hasHistory("gain", evt => {
            if (!evt.getParent() || evt.getParent().name != "draw") return false;
            return evt.getParent().skill == "jlsg_xuhe";
          });
          if (!drawCheck) {
            player.when({ global: "useCardAfter" })
              .filter(evt => evt == trigger)
              .then(() => {
                if (!player.hasHistory("gain", evt => {
                  if (!evt.getParent() || evt.getParent().name != "draw") return false;
                  return evt.getParent().skill == "jlsg_xuhe";
                })) {
                  player.chooseBool(`虚猲：是否摸${drawNum}张牌？`)
                    .set("ai", (event, player) => {
                      return get.effect(player, { name: "draw" }, player, player) * get.event("drawNum");
                    })
                    .set("drawNum", drawNum);
                }
              })
              .then(() => {
                if (result.bool) {
                  player.logSkill("jlsg_xuhe");
                  player.draw(drawNum).set("skill", "jlsg_xuhe");
                }
              })
              .vars({ drawNum: targets.length })
          };
        },
        ai: {
          halfneg: true,
          directHit_ai: true,
          skillTagFilter(player, tag, arg) {
            if (tag == "directHit_ai") {
              if (!arg || !arg.card || !arg.target) return false;
              return player.isHealthy();
            }
            else if (tag == "halfneg") return player.isDamaged();
          }
        },
        global: ["jlsg_xuhe_globalAi"],
        subSkill: {
          globalAi: {
            sourceSkill: "jlsg_xuhe",
            sub: true,
            ai: {
              directHit_ai: true,
              skillTagFilter(player, tag, arg) {
                if (!game.hasPlayer(cur => cur.hasSkill("jlsg_xuhe"))) return false;
                if (!arg || !arg.card || !arg.target || arg.target == player) return false;
                return arg.target.hasSkill("jlsg_xuhe") && arg.target.isDamaged();
              },
            },
          },
        },
      },
      jlsg_zhukou: {
        audio: "ext:极略/audio/skill:2",
        direct: true,
        trigger: { global: "phaseUseEnd" },
        filter(event, player) {
          return player.hasHistory("useCard", evt => evt.getParent("phaseUse") == event);
        },
        async content(event, trigger, player) {
          const func = () => {
            const event = get.event();
            const controls = [
              link => {
                const targets = game.filterPlayer();
                if (targets.length) {
                  for (let i = 0; i < targets.length; i++) {
                    const target = targets[i];
                    target.classList.remove("selectable");
                    target.classList.remove("selected");
                    const counterNode = target.querySelector(".caption");
                    if (counterNode) {
                      counterNode.childNodes[0].innerHTML = ``;
                    }
                  }
                  ui.selected.targets.length = 0;
                  game.check();
                }
                return;
              },
            ];
            event.controls = [ui.create.control(controls.concat(["清除选择", "stayleft"]))];
          };
          if (event.isMine()) func();
          else if (event.isOnline()) event.player.send(func);
          const sum = player.getHistory("useCard", evt => evt.getParent("phaseUse") == trigger)
            .map(evt => get.type2(evt.card))
            .unique()
            .length;
          const { result } = await player.chooseTarget(`逐寇：是否分配至多${sum}点伤害？`, [1, sum], false)
            .set("filterTarget", (card, player, target) => target != player)
            .set("ai", function (target) {
              return get.damageEffect(target, player, player);
            })
            .set("custom", {
              add: {
                confirm: function (bool) {
                  if (bool != true) return;
                  const event = get.event().parent;
                  if (event.controls) {
                    event.controls.forEach(i => {
                      if (i.innerText == "清除选择") i.custom();
                      i.close();
                    });
                  }
                  if (ui.confirm) ui.confirm.close();
                  game.uncheck();
                },
                target: function () {
                  if (ui.selected.targets.length) return;
                  const targets = game.filterPlayer();
                  if (targets.length) {
                    for (let i = 0; i < targets.length; i++) {
                      const target = targets[i];
                      const counterNode = target.querySelector(".caption");
                      if (counterNode) {
                        counterNode.childNodes[0].innerHTML = ``;
                      }
                    }
                  }
                  if (!ui.selected.targets.length) {
                    const evt = event.parent;
                    if (evt.controls) evt.controls[0].classList.add("disabled");
                  }
                },
              },
              replace: {
                target: function (target) {
                  const event = get.event(),
                    sum = get.event("sum");
                  if (!event.isMine()) return;
                  if (target.classList.contains("selectable") == false) return;
                  if (ui.selected.targets.length >= sum) return false;
                  target.classList.add("selected");
                  ui.selected.targets.push(target);
                  let counterNode = target.querySelector(".caption");
                  const count = ui.selected.targets.filter(i => i == target).length;
                  if (counterNode) {
                    counterNode = counterNode.childNodes[0];
                    counterNode.innerHTML = `×${count}`;
                  } else {
                    counterNode = ui.create.caption(`<span style="font-size:24px; font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`, target);
                    counterNode.style.right = "30px";
                    counterNode.style.bottom = "15px";
                  }
                  const evt = event.parent;
                  if (evt.controls) evt.controls[0].classList.remove("disabled");
                  game.check();
                },
              },
            })
            .set("sum", sum);
          if (result.bool) {
            if (!event.isMine()) await game.delay();
            const targets = result.targets;
            await player.logSkill("jlsg_zhukou", targets);
            for (let i = 0; i < targets.length; i++) {
              await targets[i].damage("nocard");
              await game.delayx();
            }
          }
        },
        ai: {
          expose: 0.25,
        },
      },
      jlsg_duannian: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseUseBegin" },
        filter(event, player) {
          return player.countDiscardableCards(player, "h");
        },
        check(event, player) {
          if (player.isDamaged()) return get.recoverEffect(player, player, player);
          if (event.player == player) return player.countCards("h", card => player.hasValueTarget(card)) < 3;
          return (player.getCards("h").reduce((v, c) => v + get.value(c, player), 0)) / player.countCards("h") < 8;
        },
        prompt: "断念：是否弃置所有手牌并摸等量张牌？",
        async content(event, trigger, player) {
          const cards = player.getDiscardableCards(player, "h")
          await player.discard(cards);
          await player.draw(cards.length);
          let list = ["选项一", "选项二"],
            choiceList = ["使用一张牌", "回复1点体力"];
          const { result } = await player.chooseControl(list)
            .set("prompt", "断念：请选择一项")
            .set("choiceList", choiceList)
            .set("ai", () => _status.event.choice)
            .set(
              "choice",
              (function () {
                let num = player.getCards("h")
                  .map(c => player.getUseValue(c))
                  .sort((a, b) => b - a)[0];
                let recover = get.recoverEffect(player, player, player);
                if (recover > num) return "选项二";
                return "选项一";
              })()
            );
          if (result.control == "选项一") await player.chooseToUse();
          else await player.recover(1);
        }
      },
      jlsg_jingce: {
        audio: "ext:极略/audio/skill:2",
        onremove: true,
        locked: false,
        mod: {
          cardUsable(card, player, num) {
            if (get.name(card, player) == "sha") return num + (player.storage?.jlsg_jingce?.sha || 0);
          },
        },
        mark: true,
        intro: {
          mark(dialog, storage, player) {
            let list2 = [
              lib.skill.jlsg_jingce.countShaUsable(player),
              2 + (player.storage?.jlsg_jingce?.draw || 0),
            ];
            let drawCheck = player.getAllHistory("gain", evt => {
              return evt.getParent(2).name == "phaseDraw";
            });
            if (drawCheck.length) drawCheck = drawCheck[drawCheck.length - 1].cards.length;
            if (list2[1] < drawCheck) list2[1] = drawCheck;
            dialog.addText(`出杀次数(${list2[0]})`);
            dialog.addText(`摸牌阶段摸牌数(${list2[1]})`);
          },
        },
        usable: 1,
        trigger: { player: "useCardAfter" },
        countShaUsable(player) {
          const card = get.autoViewAs({ name: "sha" }),
            name = "cardUsable";
          let num = get.info(card).usable,
            skills = [];
          if (typeof num == "function") num = num(card, player);
          if (typeof player.getModableSkills == "function") {
            skills = player.getModableSkills();
          } else if (typeof player.getSkills == "function") {
            skills = player.getSkills().concat(lib.skill.global);
            game.expandSkills(skills);
            skills = skills.filter(function (skill) {
              let info = get.info(skill);
              return info && info.mod;
            });
            skills.sort((a, b) => get.priority(a) - get.priority(b));
          }
          const arg = [card, player, num];
          skills.forEach(value => {
            var mod = get.info(value).mod[name];
            if (!mod) return;
            const result = mod.call(this, ...arg);
            if (!result || result === Infinity) return;
            if (typeof arg[arg.length - 1] != "object") arg[arg.length - 1] = result;
          });
          return arg[arg.length - 1];
        },
        checkList(event) {
          const list = [null, null, null],
            player = event.player;
          player.storage.jlsg_jingce ??= { draw: 0, sha: 0 };
          const num = player.getHistory("useCard", evt => {
            return evt.getParent("phaseUse") == event.getParent("phaseUse");
          }).length,
            list2 = [
              lib.skill.jlsg_jingce.countShaUsable(player),
              2 + (player.storage?.jlsg_jingce?.draw || 0),
              player.maxHp,
            ];
          let drawCheck = player.getAllHistory("gain", evt => {
            return evt.getParent(2).name == "phaseDraw";
          });
          if (drawCheck.length) drawCheck = drawCheck[drawCheck.length - 1].cards.length;
          if (list2[1] < drawCheck) list2[1] = drawCheck;
          for (let i = 0; i < 3; i++) {
            if (list2[i] == num) list[i] = list2[i];
          };
          return [list2, list];
        },
        filter(event, player) {
          if (!player.isPhaseUsing(true)) return false;
          let checkList = lib.skill.jlsg_jingce.checkList(event)[1];
          return (checkList ?? []).filter(i => i).length;
        },
        async cost(event, trigger, player) {
          const [numList, checkList] = lib.skill.jlsg_jingce.checkList(trigger);
          const choiceList = [`使用【杀】次数(${numList[0]})`, `摸牌阶段摸牌数(${numList[1]})`, `体力上限(${numList[2]})`],
            dialog = ui.create.dialog("是否发动【精策】", "hidden")
          dialog.forcebutton = true;
          for (let i = 0; i < checkList.length; i++) {
            let str = choiceList[i];
            if (checkList[i]) choiceList[i] = str.slice(0, -1) + `<span class='yellowtext'>+1</span>` + str.slice(-1);
            else choiceList[i] = '<span style="opacity:0.5">' + str + "</span>";
            dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">' + choiceList[i] + "</div>");
          };
          event.result = await player.chooseBool()
            .set("dialog", dialog)
            .set("ai", () => true)
            .forResult();
        },
        async content(event, trigger, player) {
          const checkList = lib.skill.jlsg_jingce.checkList(trigger)[1];
          player.storage.jlsg_jingce ??= { draw: 0, sha: 0 };
          if (checkList[0]) player.storage.jlsg_jingce.sha++;
          if (checkList[1]) player.storage.jlsg_jingce.draw++;
          if (checkList[2]) player.gainMaxHp(1);
          player.markSkill("jlsg_jingce");
          await player.draw(2);
        },
        group: ["jlsg_jingce_effect"],
        subSkill: {
          effect: {
            sub: true,
            charlotte: true,
            forced: true,
            popup: false,
            trigger: { player: "phaseDrawBegin2" },
            filter(event) {
              return !event.numFixed;
            },
            content() {
              trigger.num += (player.storage?.jlsg_jingce?.draw || 0);
            },
          },
        },
      },
      jlsg_guanxu: {
        audio: "ext:极略/audio/skill:2",
        init(player) {
          player.storage.jlsg_guanxu = Array
            .from({ length: 8 }, (v, i) => i)
            .randomGet();
          player.markSkill("jlsg_guanxu");
        },
        onremove: true,
        intro: {
          nocount: true,
          content(storage, player) {
            return get.skillInfoTranslation("jlsg_guanxu", player);
          },
        },
        trigger: { global: "phaseBegin" },
        filter(event, player) {
          return event.player.countCards("h");
        },
        prompt(event, player) {
          return "观虚：是否观看" + get.translation(event.player) + "的手牌？";
        },
        prompt2(event, player) {
          let str = get.skillInfoTranslation("jlsg_guanxu", player).slice(22, -1);
          if (str.includes("X")) str = str.slice(0, -7).replace("X", event.player.getHp().toString())
          return str;
        },
        logTarget(event) {
          return event.player;
        },
        check(event, player) {
          return true;
        },
        async content(event, trigger, player) {
          const storage = player.storage.jlsg_guanxu,
            cards = trigger.player.getCards("h");
          let str = get.skillInfoTranslation("jlsg_guanxu", player).slice(25, -1);
          if (storage == 0) str = str.slice(0, -7).replace("X", trigger.player.getHp().toString())
          for (let i of cards) i.addKnower(player);
          const cards2Info = new Map([
            [0, trigger.player.getGainableCards(player, "h")],
            [1, trigger.player.getDiscardableCards(player, "h")],
            [2, (function () {
              let cards2 = trigger.player.getDiscardableCards(player, "h");
              let max = Math.max(...cards2.map(i => get.number(i)));
              return cards2.filter(i => get.number(i) == max);
            })()],
            [3, (function () {
              let cards2 = trigger.player.getDiscardableCards(player, "h");
              let min = Math.min(...cards2.map(i => get.number(i)));
              return cards2.filter(i => get.number(i) == min);
            })()],
            [4, (function () {
              let cards2 = trigger.player.getDiscardableCards(player, "h");
              let map = cards2.reduce((list, card) => {
                let suit = get.suit(card);
                if (!list[suit]) list[suit] = 0;
                list[suit]++;
                return list;
              }, {});
              let min = Math.min(...Object.values(map));
              return cards2.filter(i => map[get.suit(i)] == min);
            })()],
            [5, (function () {
              let cards2 = trigger.player.getDiscardableCards(player, "h");
              let map = cards2.reduce((list, card) => {
                let suit = get.suit(card);
                if (!list[suit]) list[suit] = 0;
                list[suit]++;
                return list;
              }, {});
              let max = Math.max(...Object.values(map));
              return cards2.filter(i => map[get.suit(i)] == max);
            })()],
            [6, cards],
            [7, cards],
          ]);
          const numInfo = new Map([
            [0, trigger.player.getHp()],
            [1, 1],
            [2, cards2Info.get(2).length],
            [3, cards2Info.get(3).length],
            [4, cards2Info.get(4).length],
            [5, cards2Info.get(5).length],
            [6, 1],
            [7, 1],
          ]);
          const func = () => {
            const event = get.event();
            event.controls = [ui.create.control([link => { ui.click.cancel() }, "取消"])];
          };
          if (storage > 1 && storage < 6) {
            if (event.isMine()) func();
            else if (event.isOnline()) event.player.send(func);
          }
          const { result } = await player.chooseButton(["观虚", get.translation(trigger.player) + "的手牌", cards, str])
            .set("forced", false)
            .set("complexSelect", true)
            .set("cards2", cards2Info.get(storage))
            .set("num", numInfo.get(storage))
            .set("storage", storage)
            .set("source", trigger.player)
            .set("selectButton", () => {
              if (get.event("storage") > 1 && get.event("storage") < 6) return [0, get.event("num")];
              return [1, get.event("num")];
            })
            .set("filterButton", button => {
              if (!get.event("cards2").includes(button.link)) return false;
              if (get.event("storage") > 1 && get.event("storage") < 6) {
                if (get.event("cards2").includes(button.link) && !ui.selected.buttons.includes(button)) {
                  button.classList.add("selected");
                  ui.selected.buttons.add(button);
                }
                return false;
              }
              return true;
            })
            .set("ai", button => {
              const storage = get.event("storage"),
                player = _status.event.player,
                target = get.event("source");
              const att = get.attitude(player, target),
                value = get.value(button.link, target);
              switch (storage) {
                case 0:
                  if (att < 0) return value;
                case 1:
                  if (att > 0) return 8 - value;
                case 6:
                  let sha = get.autoViewAs({ name: "sha", isCard: true }, []);
                  return game.hasPlayer(current => current != target && get.effect(target, sha, current, player) > 0);
                case 7:
                  let damage = get.damageEffect(target, undefined, player, "thunder"),
                    result = {
                      card: button.link,
                      name: button.link.name,
                      number: get.number(button.link),
                      suit: get.suit(button.link),
                      color: get.color(button.link),
                    };
                  if (lib.card.shandian.judge(button.link) < 0) result.bool = false;
                  else if (lib.card.shandian.judge(button.link) > 0) result.bool = true;
                  else result.bool = null;
                  _status.event.cardname = "shandian";
                  game.checkMod(target, result, "judge", target);
                  delete _status.event.cardname;
                  if (result.bool && damage >= 0) {
                    if (att > 0) return 8 - value;
                    else return value + damage;
                  }
                  if (att < 0) return value;
                default: return 0;
              };
            })
            .set("filterOk", () => {
              const player = _status.event.player,
                target = get.event("source");
              if (_status.connectMode && !player.isAuto) return true;
              else if (!_status.auto) return true;
              const storage = get.event("storage"),
                att = get.attitude(player, target);
              switch (storage) {
                case 2:
                  let skills = target.getSkills(null, false, false)
                    .filter(i => {
                      let info = get.info(i);
                      return info && !info.charlotte && !info.persevereSkill
                    })
                  if (skills.length) {
                    if (att > 0 && skills.some(i => get.info(i).ai?.nag)) return true;
                  }
                  if (att < 0) return true;
                  return false;
                case 3: return att > 0;
                case 4: return att < 0;
                case 5: return att > 0;
                default: return true;
              };
            })
            .set("custom", {
              add: {
                confirm: function (bool) {
                  if (bool != true) return;
                  const event = get.event().parent;
                  if (event.controls) event.controls.forEach(i => i.close());
                  if (ui.confirm) ui.confirm.close();
                  game.uncheck();
                },
              },
              replace: {},
            });
          if (result.bool) {
            game.log("本次效果为：", str);
            const cardx = result.links;
            if (storage > 0 && storage < 6) await trigger.player.discard(cardx);
            switch (storage) {
              case 0:
                await player.gain(trigger.player, cardx, "giveAuto");
                break;
              case 1:
                await trigger.player.gainMaxHp(1);
                await trigger.player.recover(1);
                break;
              case 2:
                var skills = trigger.player.getSkills(null, false, false)
                  .filter(i => {
                    if (!lib.translate[i] || !lib.translate[i + "_info"]) return false;
                    let info = get.info(i);
                    return info && !info.charlotte && !info.persevereSkill
                  })
                if (skills.length) {
                  var buttons = skills.map(i => [
                    i,
                    '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' +
                    get.translation(i) +
                    "】</div><div>" +
                    lib.translate[i + "_info"] +
                    "</div></div>"
                  ]);
                  var { result: result2 } = await player.chooseButton(true, [get.translation(trigger.player) + "的技能", [buttons, "textbutton"]])
                    .set("ai", button => {
                      if (get.attitude(get.player(), get.event("source")) < 0) return get.skillRank(button.link);
                      return get.info(button.link).ai?.neg;
                    })
                    .set("source", trigger.player);
                  if (result2.bool) {
                    trigger.player.popup(result2.links[0]);
                    trigger.player.tempBanSkill(result2.links[0]);
                  }
                }
                break;
              case 3:
                var skills = get.gainableSkills();
                skills.removeArray(player.getSkills(null, false, false));
                skills = skills.filter(skill => {
                  const info = lib.skill[skill];
                  if (info.ai?.combo) return player.hasSkill(info.ai?.combo, null, false, false);
                  return true;
                });
                skills = skills.randomGets(3);
                var buttons = skills.map(i => [
                  i,
                  '<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' +
                  get.translation(i) +
                  "】</div><div>" +
                  lib.translate[i + "_info"] +
                  "</div></div>"
                ]);
                var { result: result2 } = await trigger.player.chooseButton(true, ["选择要获得的技能", [buttons, "textbutton"]])
                  .set("ai", button => get.skillRank(button.link))
                  .set("source", trigger.player);
                if (result2.bool) {
                  await trigger.player.addSkills(result2.links);
                }
                break;
              case 4:
                if (cardx.every(i => get.color(i) == "black")) await trigger.player.loseMaxHp(1);
                break;
              case 5:
                await trigger.player.draw(cardx.length * 2);
                break;
              case 6:
                var { result: result2 } = await player.chooseTarget("###选择一名角色令其获得" + get.translation(cardx) + "###且可以对" + get.translation(trigger.player) + "使用一张“杀”")
                  .set("source", trigger.player)
                  .set("cardx", cardx[0])
                  .set("filterTarget", (card, player, target) => target != get.event("source"))
                  .set("ai", target => {
                    const sha = get.autoViewAs({ name: "sha", isCard: true }, []);
                    return target.getUseValue(get.event("cardx")) + get.effect(get.event("source"), sha, target, player);
                  })
                if (result2.bool) {
                  const target = result2.targets[0];
                  await trigger.player.give(cardx, target);
                  const sha = get.autoViewAs({ name: "sha", isCard: true }, []);
                  if (target.canUse(sha, trigger.player, false)) await target.useCard(sha, trigger.player);
                }
                break;
              case 7:
                await trigger.player.lose(cardx[0], ui.cardPile, 'insert');
                game.log(player, '将', trigger.player, '的一张手牌置于牌堆顶');
                await trigger.player.executeDelayCardEffect("shandian");
                break;
            };
          }
          else await game.delayx();
          let num2 = player.storage.jlsg_guanxu;
          player.storage.jlsg_guanxu = Array
            .from({ length: 8 }, (v, i) => i)
            .remove(num2)
            .randomGet();
          player.update();
        },
        ai: {
          expose: 0.25,
        },
      },
      jlsg_yashi: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "damageEnd" },
        getIndex(event, player) {
          return event.num;
        },
        filter(event, player) {
          return event.num > 0;
        },
        check(event, player) {
          return true;
        },
        prompt(event, player) {
          return "雅士：是否摸两张牌？"
        },
        prompt2(event, player) {
          let str = "然后可以";
          if (player.hasSkill("jlsg_guanxu", null, false, false)) str += "重置“观虚”";
          else str += "获得“观虚”";
          return str;
        },
        async content(event, trigger, player) {
          await player.draw(2);
          let result
          if (!player.hasSkill("jlsg_guanxu")) {
            result = await player.chooseBool("是否获得技能“观虚”？")
              .set(ai, () => true)
              .forResult();
          }
          else {
            result = await player.chooseBool(`###是否重置“观虚”？###${get.skillInfoTranslation("jlsg_guanxu", player)}`)
              .set("ai", () => true)
              .forResult();
          }
          if (!result.bool) return;
          if (!player.hasSkill("jlsg_guanxu")) await player.addSkills("jlsg_guanxu");
          else {
            let num2 = player.storage.jlsg_guanxu
            player.storage.jlsg_guanxu = Array
              .from({ length: 8 }, (v, i) => i)
              .remove(num2)
              .randomGet();
            player.update();
          }
        },
        ai: {
          maixie: true,
          "maixie_hp": true,
          effect: {
            target(card, player, target) {
              if (get.tag(card, "damage")) {
                if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
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
            },
          },
          threaten: 0.6,
        },
      },
      jlsg_tunan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseUseBegin" },
        filter(event, player) {
          const target = event.player,
            next = event.player.getNext(),
            sha = get.autoViewAs({ name: "sha" }, []),
            shunshou = get.autoViewAs({ name: "shunshou" }, []);
          if (!target.canUse(sha, next, false) && !target.canUse(shunshou, next, false)) return false;
          return target.isIn() && target != next;
        },
        check(event, player) {
          const target = event.player,
            next = event.player.getNext(),
            sha = get.autoViewAs({ name: "sha" }, []),
            shunshou = get.autoViewAs({ name: "shunshou" }, []);
          return get.effect(next, sha, target, player) > 0 || get.effect(next, shunshou, target, player) > 0;
        },
        prompt(event, player) {
          const target = event.player,
            next = event.player.getNext();
          return `图南：是否令${get.translation(target)}对${get.translation(next)}使用一张无距离限制和不计入次数的【杀】或【顺手牵羊】？`;
        },
        logTarget: "player",
        async content(event, trigger, player) {
          const target = trigger.player,
            next = trigger.player.getNext(),
            list = ["sha", "shunshou"].filter(name => {
              const card = get.autoViewAs({ name }, []);
              return trigger.player.canUse(card, next, false);
            });
          if (!next.countGainableCards(trigger.player, "hej")) list.remove("shunshou");
          const { result } = await player.chooseControl(list)
            .set("prompt", `请选择${get.translation(target)}对${get.translation(next)}使用的牌`)
            .set("ai", () => get.event("choice"))
            .set("choice", (function () {
              const cards = list.map(name => {
                const card = get.autoViewAs({ name: name }, []);
                return get.effect(next, card, target, player);
              });
              let num = Math.max(...cards);
              return list[cards.indexOf(num)];
            })());
          if (result.control != "cancel2") {
            const card = get.autoViewAs({ name: result.control }, []);
            await target.useCard(card, next, false);
          }
        },
      },
      jlsg_bijing: {
        audio: "ext:极略/audio/skill:2",
        trigger: { target: "useCardToTargeted" },
        filter(event, player) {
          if (event.player == player) return false;
          if (get.name(event.card) != "sha" && get.type(event.card, null, false) != "trick") return false;
          return event.player.countDiscardableCards(player, "he") > 1 && player.countDiscardableCards(player, "he") > 0;
        },
        check(event, player) {
          let effect = get.effect(player, event.card, event.player, player),
            att = get.attitude(player, event.player);
          if (effect / att > 0) return false;
          return get.effect(player, { name: "guohe_copy2" }, player, player) + 2 * get.effect(event.player, { name: "guohe_copy2" }, player, player);
        },
        prompt(event, player) {
          return `闭境：是否弃置${get.translation(event.player)}的两张牌，然后弃置自己一张牌`;
        },
        prompt2(event, player) {
          return `若弃置的牌颜色均相同，你令${get.translation(event.card)}对你无效`
        },
        logTarget: "player",
        async content(event, trigger, player) {
          const { result: result1 } = await player.discardPlayerCard(true, "he", [2, 2], trigger.player)
            .set("ai", (button) => {
              if (get.event("check") > 0) return false;
              return get.event("choice").includes(button.link);
            })
            .set("check", (function () {
              let effect = trigger.player.getUseValue(trigger.card),
                att = get.attitude(player, trigger.player);
              return effect / att;
            })())
            .set("choice", (function () {
              let cards = trigger.player.getDiscardableCards(player, "he");
              if (trigger.player.isUnderControl(true) || player.hasSkillTag("viewHandcard", null, trigger.player, true)) {
                cards = trigger.player.getDiscardableCards(player, "e");
              }
              const black = cards.filter(i => get.color(i, null, false) == "black")
                .sort((a, b) => get.value(a) - get.value(b)),
                red = cards.filter(i => get.color(i, null, false) == "red")
                  .sort((a, b) => get.value(a) - get.value(b));
              if (black.length == 1 && red.length == 1) return cards;
              else if (black.length == 1 && red.length) return red.slice(0, 2);
              else if (red.length == 1 && black.length) return black.slice(0, 2);
              else {
                if (cards.length == 0 || black.length == 1 || red.length == 1) {
                  return cards.concat(trigger.player.getDiscardableCards(player, "h")).unique().slice(0, 2);
                }
                const blacksum = black.reduce((num, card) => num + get.value(card), 0),
                  redsum = black.reduce((num, card) => num + get.value(card), 0);
                if (blacksum > redsum) return black.slice(0, 2);
                return red.slice(0, 2);
              }
            })());
          if (result1.bool) {
            const colors = result1.links.map(i => get.color(i, false));
            const { result: result2 } = await player.chooseToDiscard(true, 1, "he")
              .set("prompt", `闭境：请弃置一张牌（已弃置${get.translation(colors)}）`)
              .set("ai", (card) => {
                const colors = get.event("colors");
                if (colors.length == 2) return 6 - get.value(card);
                else {
                  if (get.color(card) == colors[0]) return 8 - get.value(card);
                  return 6 - get.value(card);
                }
              })
              .set("colors", colors.unique());
            if (result2.bool) {
              colors.add(get.color(result2.cards[0])).unique();
              if (colors.length == 1) {
                trigger.getParent().excluded.add(player);
                game.log(player, "取消了", trigger.card, "对自己的目标");
              }
            }
          }
        },
      },
      jlsg_gongao: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "dying" },
        filter(event, player) {
          if (event.player == player) return false;
          return !player.hasHistory("useSkill", evt => evt.skill == "jlsg_gongao" && evt.targets?.includes(event.player));
        },
        forced: true,
        logTarget: "player",
        async content(event, trigger, player) {
          await player.gainMaxHp(1);
          await player.recover(1);
        },
        ai: {
          threaten: 1.5,
        },
      },
      jlsg_juyi: {
        audio: "ext:极略/audio/skill:2",
        onremove: true,
        mod: {
          maxHandcard: function (player, num) {
            return num + player.storage?.jlsg_juyi;
          },
          attackRange(player, num) {
            return num + player.storage?.jlsg_juyi;
          },
          cardUsable: function (card, player, num) {
            if (get.name(card, player) == 'sha') return num + player.storage?.jlsg_juyi;
          },
        },
        marktext: "举",
        intro: {
          content(storage, player) {
            return "摸牌数、手牌上限、攻击范围、使用【杀】的次数上限+" + storage;
          },
        },
        trigger: { player: ["phaseZhunbeiBegin", "phaseDrawBegin1"] },
        filter(event, player) {
          if (event.name == "phaseZhunbei") return true;
          return !event.numFixed && player.storage?.jlsg_juyi > 0;
        },
        locked: false,
        async cost(event, trigger, player) {
          if (trigger.name == "phaseZhunbei") {
            event.result = await player.chooseBool("###功獒：是否减1点体力上限并获得以下效果？###摸牌数、手牌上限、攻击范围、使用【杀】的次数上限+1")
              .set("ai", (event, player) => {
                if (player.maxHp > game.countPlayer(true, undefined, true)) return player.isDamaged();
                return player.isDamaged() && player.maxHp > 3;
              }).forResult();
          }
          else event.result = {
            bool: true,
            skill_popup: false,
          }
        },
        async content(event, trigger, player) {
          if (trigger.name == "phaseZhunbei") {
            await player.loseMaxHp(1);
            player.storage.jlsg_juyi ??= 0;
            player.storage.jlsg_juyi++;
            player.markSkill("jlsg_juyi");
          }
          else trigger.num += player.storage.jlsg_juyi;
        },
        ai: {
          effect: {
            target(card, player, target) {
              if (get.tag(card, "recover")) {
                let num = get.tag(card, "recover");
                if (target.isDamaged() && target.maxHp < 5) return;
                if (target.hp <= target.maxHp - num && target.hp > 4) return [1, -1];
              }
            },
          }
        },
      },
      jlsg_weizhong: {
        audio: "ext:极略/audio/skill:2",
        onremove: true,
        trigger: { player: ["gainMaxHpEnd", "loseMaxHpEnd", "dying"] },
        filter(event, player) {
          if (event.name != "dying") return event.num > 0;
          if (player.storage.jlsg_weizhong) return false;
          const first = game.getAllGlobalHistory("everything", evt => evt.name == "dying")[0];
          return first == event && first.player == player;
        },
        forced: true,
        async content(event, trigger, player) {
          if (trigger.name != "dying") await player.draw(2);
          else {
            player.storage.jlsg_weizhong = true;
            await player.recoverTo(player.maxHp);
          }
        },
      },
      //SK杨婉
      jlsg_youyan: {
        audio: "ext:极略/audio/skill:2",
        trigger: { player: "useCardAfter" },
        filter(event, player) {
          if (event.card.storage?.jlsg_youyan) return false;
          if (!player.isPhaseUsing()) return false;
          if (!["basic", "trick"].includes(get.type(event.card))) return false;
          if (lib.card[event.card.name]?.notarget) return false;
          return game.hasPlayer(current => !player.hasStorage("jlsg_youyan_used", current));
        },
        async cost(event, trigger, player) {
          const card = get.autoViewAs({ name: trigger.card.name, storage: { "jlsg_youyan": true } }, []);
          const select = get.select(lib.card[trigger.card.name]?.selectTarget);
          let toSelf = false;
          if (select[1] >= 1) toSelf = true;
          event.result = await player.chooseTarget(`###是否发动诱言？###选择一名角色令其${toSelf ? "对你" : ""}使用【${get.translation(card.name)}】，然后你恢复1点体力并摸三张牌`)
            .set("filterTarget", (card, player, target) => !player.hasStorage("jlsg_youyan_used", target))
            .set("ai", target => {
              const player = get.player(),
                card = get.event().card,
                toSelf = get.event().toSelf,
                extraEff = get.event().extraEff;
              const att = Math.sign(get.attitude(player, target));
              if (toSelf) return get.effect(player, card, target, player) + extraEff;
              return att * target.getUseValue(card) + extraEff;
            })
            .set("extraEff", get.recoverEffect(player, player, player) + get.effect(player, { name: "draw" }, player, player) * 1.5)
            .set("card", card)
            .set("toSelf", toSelf)
            .forResult();
          if (event.result) {
            event.result.cost_data = { card, toSelf };
          }
        },
        async content(event, trigger, player) {
          const { targets: [target], cost_data: { card, toSelf } } = event;
          player.addTempSkill("jlsg_youyan_used", { player: "phaseUseEnd" });
          player.markAuto("jlsg_youyan_used", [target]);
          let next;
          if (target == player && toSelf) next = player.useCard(card, player);
          else {
            next = target.chooseUseTarget(card, true);
            if (toSelf) {
              next.set("source", player)
                .set("filterTarget", (card, player, target) => target == get.event("source"));
            }
          }
          await next;
          await player.recover(1);
          await player.draw(3);
        },
        subSkill: {
          used: {
            sourceSkill: "jlsg_youyan",
            sub: true,
            charlotte: true,
            onremove: true,
            intro: {
              content: "本阶段已对$发动过技能",
            },
          },
        },
      },
      jlsg_zhuihuan: {
        audio: "ext:极略/audio/skill:2",
        onremove: true,
        intro: {
          nocount: true,
          content(storage, player) {
            const targets1 = storage[0],
              targets2 = storage[1];
            let str = "";
            if (targets1.length) str += `昨日之仇，如芒在背：${get.translation(targets1)}`;
            if (targets1.length && targets2.length) str += "<br>";
            if (targets2.length) str += `今日之举，不过权计：${get.translation(targets2)}`;
            if (!str.length) return `暂时没有仇家`;
            return str;
          },
        },
        trigger: { player: "phaseZhunbeiBegin" },
        filter(event, player) {
          return player.hasStorage("jlsg_zhuihuan");
        },
        direct: true,
        async content(event, trigger, player) {
          const targets = player.getStorage("jlsg_zhuihuan")[0].filter(target => target.isIn());
          if (targets.length) {
            const { result } = await player.chooseBool(get.prompt2(event.name, player.getStorage("jlsg_zhuihuan")[0], player))
              .set("ai", (event, player) => {
                return (player.getStorage("jlsg_zhuihuan")[0]
                  .reduce((sum, current) => sum + get.damageEffect(current, player, player), 0)
                  > 0);
              })
            if (result.bool) {
              await player.logSkill(event.name, targets)
              for (let target of targets) {
                if (!target.isIn()) continue;
                await target.damage(2, player, "nocard");
              };
            }
          }
          player.storage.jlsg_zhuihuan[0] = [];
          player.markSkill("jlsg_zhuihuan");
        },
        group: "jlsg_zhuihuan_record",
        subSkill: {
          record: {
            sourceSkill: "jlsg_youyan",
            sub: true,
            forced: true,
            popup: false,
            charlotte: true,
            trigger: { player: ["phaseBegin", "damageEnd"] },
            filter(event, player) {
              if (event.name == "damage") return event.source?.isIn() && event.source != player;
              return true;
            },
            async content(event, trigger, player) {
              if (trigger.name == "damage") {
                if (!player.hasStorage("jlsg_zhuihuan")) return;
                if (player.storage.jlsg_zhuihuan[1]) {
                  player.storage.jlsg_zhuihuan[1].add(trigger.source);
                  player.storage.jlsg_zhuihuan[1].sortBySeat();
                }
              }
              else {
                if (!player.storage.jlsg_zhuihuan) {
                  player.storage.jlsg_zhuihuan = [[], []];
                }
                else {
                  player.storage.jlsg_zhuihuan[0] = player.storage.jlsg_zhuihuan[1].slice();
                  player.storage.jlsg_zhuihuan[1] = [];
                }
              }
              player.markSkill("jlsg_zhuihuan");
            }
          },
        },
      },
      jlsg_jishe: {
        audio: "ext:极略/audio/skill:2",
        enable: "phaseUse",
        onChooseToUse(event) {
          if (!event.jlsg_jishe && !game.online) {
            const cards = [];
            for (let name of lib.inpile) {
              if (get.type(name, null, false) != "trick") continue;
              const card = get.autoViewAs({ name, isCard: true }, []);
              if (!get.tag(card, "natureDamage") && get.tag(card, "damage")) continue;
              if (event.filterCard(card, event.player, event)) cards.add(name);
            };
            event.set("jlsg_jishe", cards);
          }
        },
        filter(event, player) {
          return event.jlsg_jishe?.length;
        },
        chooseButton: {
          dialog(event, player) {
            const list = event.jlsg_jishe.map(name => ["锦囊", "", name]);
            return ui.create.dialog("极奢", [event.jlsg_jishe, "vcard"]);
          },
          check(button) {
            const player = get.player(),
              card = get.autoViewAs({ name: button.link[2], isCard: true }, []);
            if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(card.name)) return 0;
            return player.getUseValue(card);
          },
          backup(links, player) {
            return {
              filterCard: false,
              selectCard: 0,
              audio: "jlsg_jishe",
              popname: true,
              viewAs: get.autoViewAs({ name: links[0][2], isCard: true }, []),
              async precontent(event, trigger, player) {
                player.addTempSkill("jlsg_jishe_used", { player: "phaseUseAfter" });
                player.storage.jlsg_jishe_used++;
                player.markSkill("jlsg_jishe_used");
                player.when({ player: "useCardAfter" })
                  .filter(evt => evt.skill == "jlsg_jishe_backup")
                  .step(async function (event, trigger, player) {
                    if (player.storage.jlsg_jishe_used > player.maxHp) await player.loseMaxHp(1);
                  });
              },
            };
          },
          prompt(links, player) {
            const card = get.autoViewAs({ name: links[0][2] }, []);
            return "极奢：视为使用一张" + get.translation(card);
          },
        },
        subSkill: {
          backup: {},
          used: {
            sub: true,
            sourceSkill: "jlsg_jishe",
            init(player, skill) {
              player.storage[skill] = 0;
            },
            onremove: true,
            charlotte: true,
            mark: true,
            marktext: "奢",
            intro: {
              markcount(storage) {
                return storage;
              },
              content(storage) {
                return `本阶段已发动${storage}次`;
              }
            }
          },
        },
        ai: {
          fireAttack: true,
          order(item, player) {
            return 2 * player.maxHp - (player.storage.jlsg_jishe_used || 0);
          },
          result: {
            player(player) {
              const event = get.event();
              if (event.jlsg_jishe?.length) {
                const cards = event.jlsg_jishe.map(name => get.autoViewAs({ name }, []));
                return Number(cards.some(card => (get.value(card) + player.maxHp * 3 - 16 - (player.storage.jlsg_jishe_used || 0) > 0)));
              }
              return 0;
            },
          },
        },
      },
      jlsg_lianhuo: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          target: "useCardToTargeted",
          player: "damageBegin3",
        },
        filter(event, player) {
          if (event.name == "damage") {
            return event.hasNature("fire") && player.isLinked() && event.num > 0;
          }
          return ["basic", "trick"].includes(get.type2(event.card));
        },
        forced: true,
        logAudio(event, player) {
          if (event.name == "damage") return ["ext:极略/audio/skill/jlsg_lianhuo2.mp3"];
          return ["ext:极略/audio/skill/jlsg_lianhuo1.mp3"];
        },
        async content(event, trigger, player) {
          if (trigger.name == "damage") trigger.num += 2;
          else await player.link();
        },
        ai: {
          neg: true,
          effect: {
            target(card, player, target) {
              if (target.isLinked()) return;
              if (get.tag(card, "fireDamage")) {
                if (player.hasSkillTag("jueqing", false, target)) return;
                return [1, -3];
              }
            }
          },
        },
      },
      jlsg_lianhua: {
        audio: "ext:极略/audio/skill:2",
        trigger: { global: "phaseUseBegin" },
        filter(event, player) {
          return event.player.countDiscardableCards(player, "h");
        },
        prompt(event, player) {
          return get.prompt("jlsg_lianhua", event.player);
        },
        check(event, player) {
          return true;
        },
        async content(event, trigger, player) {
          if (trigger.player != player) await player.viewHandcards(trigger.player);
          const { result } = await player.discardPlayerCard(trigger.player, "h", [1, Infinity], "visible")
            .set("ai", button => {
              const card = button.link,
                player = get.player(),
                target = get.event("target");
              if (get.attitude(player, target) > 0) {
                if (target.hasUseTarget(card)) return 8 - get.value(card, target);
                return 6 - get.value(card, target);
              }
              return target.getUseValue(card);
            });
          if (!result?.bool || !result?.links?.length) return;
          let num = result.links.length + 1;
          const cards = [];
          while (num > 0) {
            const card = lib.skill.jlsg_lingze.createTempCard(null);
            if (card) cards.add(card);
            num--;
          };
          if (cards.length) await trigger.player.gain(cards, "draw");
        },
      },
      jlsg_zhafu: {
        audio: "ext:极略/audio/skill:2",
        trigger: {
          global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "replaceEquipAfter"],
        },
        filter(event, player) {
          if (event.name == "replaceEquip") return event.result?.cards?.some(i => i.classList.contains("jlsg_tempCard-glow"));
          return event.getd().some(i => i.classList.contains("jlsg_tempCard-glow"));
        },
        check(event, player) {
          return get.effect(player, { name: "draw" }, player, player) > 0;
        },
        frequent: true,
        async content(event, trigger, player) {
          await player.draw(1);
        },
      },
    },
    translate: {
      jlsg_sk: "SK武将",
      jlsg_tiangang: "天罡包",
      jlsg_disha: "地煞包",
      jlsg_renjie: "人杰包",
      jlsg_pojun: "破军包",
      jlsg_yinyang: "阴阳包",
      jlsg_tanlang: "贪狼包",
      jlsg_jiangxing: "将星包",
      jlsg_sp: "特别包",
      jlsgsk_dengzhi: 'SK邓芝',
      jlsgsk_xuyou: 'SK许攸',
      jlsgsk_zhangbu: 'SK张布',
      jlsgsk_miheng: 'SK祢衡',
      jlsgsk_zumao: 'SK祖茂',
      jlsgsk_huaxiong: 'SK华雄',
      jlsgsk_sunce: 'SK孙策',
      jlsgsk_caoren: 'SK曹仁',
      jlsgsk_gongsunzan: 'SK公孙瓒',
      jlsgsk_sunqian: 'SK孙乾',
      jlsgsk_maliang: 'SK马良',
      jlsgsk_buzhi: 'SK步骘',
      jlsgsk_wangping: 'SK王平',
      jlsgsk_huangyueying: 'SK黄月英',
      jlsgsk_dongzhuo: 'SK董卓',
      jlsgsk_chendao: 'SK陈到',
      jlsgsk_dingfeng: 'SK丁奉',
      jlsgsk_wenchou: 'SK文丑',
      jlsgsk_yanliang: 'SK颜良',
      jlsgsk_zhuran: 'SK朱然',
      jlsgsk_lukang: 'SK陆抗',
      jlsgsk_lvlingqi: 'SK吕玲绮',
      jlsgsk_zhoucang: 'SK周仓',
      jlsgsk_kongrong: 'SK孔融',
      jlsgsk_caochong: 'SK曹冲',
      jlsgsk_zhanglu: 'SK张鲁',
      jlsgsk_guanlu: 'SK管辂',
      jlsgsk_simazhao: 'SK司马昭',
      jlsgsk_yangxiu: 'SK杨修',
      jlsgsk_liyan: 'SK李严',
      jlsgsk_jiping: 'SK吉平',
      jlsgsk_sunhao: 'SK孙皓',
      jlsgsk_zhugejin: 'SK诸葛瑾',
      jlsgsk_zhangxiu: 'SK张绣',
      jlsgsk_sunluyu: 'SK孙鲁育',
      jlsgsk_zuoci: 'SK左慈',
      jlsgsk_luzhi: 'SK卢植',
      jlsgsk_zhangning: 'SK张宁',
      jlsgsk_yuji: 'SK于吉',
      jlsgsk_mifuren: 'SK糜夫人',
      jlsgsk_guonvwang: 'SK郭女王',
      jlsgsk_chengyu: 'SK程昱',
      jlsgsk_zhangren: 'SK张任',
      jlsgsk_mizhu: 'SK糜竺',
      jlsgsk_zangba: 'SK臧霸',
      jlsgsk_hejin: 'SK何进',
      jlsgsk_wangyi: 'SK王异',
      jlsgsk_guanyu: '★SK关羽',
      jlsgsk_guanyu_ab: '极略★SK关羽',
      jlsgsk_guanyu_prefix: '极略★SK',
      jlsgsk_machao: 'SP马超',
      jlsgsk_caiwenji: 'SP蔡文姬',
      jlsgsk_zhangbao: 'SK张宝',
      jlsgsk_guanxing: 'SK关兴',
      jlsgsk_kuaiyue: 'SK蒯越',
      jlsgsk_zhoutai: 'SK周泰',
      jlsgsk_zoushi: 'SK邹氏',
      jlsgsk_zhugeguo: 'SK诸葛果',
      jlsgsk_xizhicai: 'SK戏志才',
      jlsgsk_guansuo: 'SK关索',
      jlsgsk_baosanniang: 'SK鲍三娘',
      jlsgsk_dongbai: 'SK董白',
      jlsgsk_xushi: 'SK徐氏',
      jlsgsk_zhoufei: 'SK周妃',
      jlsgsk_wuyi: 'SK吴懿',
      jlsgsk_zhangliang: 'SK张梁',
      jlsgsk_panshu: 'SK潘淑',
      jlsgsk_caorui: 'SK曹叡',
      jlsgsk_liuchen: 'SK刘谌',
      jlsgsk_sunxiu: 'SK孙休',
      jlsgsk_zhangrang: 'SK张让',
      jlsgsk_xiahoushi: 'SK夏侯氏',
      jlsgsk_sundeng: 'SK孙登',
      jlsgsk_caoxiu: 'SK曹休',
      jlsgsk_caojie: 'SK曹节',
      jlsgsk_xinxianying: 'SK辛宪英',
      jlsgsk_zhuzhi: 'SK朱治',
      jlsgsk_wanglang: 'SK王朗',
      jlsgsk_wuxian: 'SK吴苋',
      jlsgsk_jushou: 'SK沮授',
      jlsgsk_sunliang: 'SK孙亮',
      jlsgsk_wenyang: 'SK文鸯',
      jlsgsk_yanyan: 'SK严颜',
      jlsgsk_zhugezhan: 'SK诸葛瞻',
      jlsgsk_panzhang: 'SK潘璋',
      jlsgsk_sunru: 'SK孙茹',
      jlsgsk_liuyan: 'SK刘焉',
      jlsgsk_gongsunyuan: 'SK公孙渊',
      jlsgsk_guohuanghou: 'SK郭皇后',
      jlsgsk_zhaoxiang: 'SK赵襄',
      jlsgsk_chenqun: 'SK陈群',
      jlsgsk_lvfan: 'SK吕范',
      jlsgsk_hetaihou: 'SK何太后',
      jlsgsk_zhangyi: 'SK张嶷',
      jlsgsk_caochun: 'SK曹纯',
      jlsgsk_shamoke: 'SK沙摩柯',
      jlsgsk_lingcao: 'SK凌操',
      jlsgsk_zhaoyan: 'SK赵嫣',
      jlsgsk_beimihu: 'SK卑弥呼',
      jlsgsk_wutugu: 'SK兀突骨',
      jlsgsk_caoying: 'SK曹婴',
      jlsgsk_mayunlu: 'SK马云禄',
      jlsgsk_zhongyao: 'SK钟繇',
      jlsgsk_nanhualaoxian: 'SK南华老仙',
      jlsgsk_jiangwei: 'SP姜维',
      jlsgsk_huanghao: 'SK黄皓',
      jlsgsk_huaman: 'SK花鬘',
      jlsgsk_pangtong: 'SP庞统',
      jlsgsk_lvdai: 'SK吕岱',
      jlsgsk_wanniangongzhu: 'SK万年公主',
      jlsgsk_wangyuanji: 'SK王元姬',
      jlsgsk_zhangchangpu: 'SK张昌蒲',
      jlsgsk_qinmi: "SK秦宓",
      jlsgsk_xingdaorong: "SK邢道荣",
      jlsgsk_zhouyi: "SK周夷",
      jlsgsk_guohuai: "SK郭淮",
      jlsgsk_huangchengyan: "SK黄承彦",
      jlsgsk_lvkai: "SK吕凯",
      jlsgsk_zhugedan: "SK诸葛诞",
      jlsgsk_yangwan: "SK杨婉",
      jlsgsk_cenhun: "SK岑昏",
      jlsgsk_gexuan: "SK葛玄",

      jlsg_hemeng: '和盟',
      jlsg_sujian: '素检',
      jlsg_yexi: '夜袭',
      jlsg_kuangyan: '狂言',
      jlsg_kuangyan1: '狂言',
      jlsg_kuangyan2: '狂言',
      jlsg_chaochen: '朝臣',
      jlsg_chaochen2: '朝臣',
      jlsg_quanzheng: '全政',
      jlsg_shejian: '舌剑',
      jlsg_kuangao: '狂傲',
      jlsg_yinbing: '引兵',
      jlsg_yinbing2: '引兵',
      jlsg_fenwei: '奋威',
      jlsg_shiyong: '恃勇',
      jlsg_angyang: '昂扬',
      jlsg_angyang2: '昂扬',
      jlsg_weifeng: '威风',
      jlsg_xieli: '协力',
      jlsg_jushou: '据守',
      jlsg_yicong: '义从',
      jlsg_muma: '募马',
      jlsg_suiji: '随骥',
      jlsg_fengyi: '凤仪',
      jlsg_yalv: '雅虑',
      jlsg_xiemu: '协穆',
      jlsg_xiemu2: '协穆',
      jlsg_zhejie: '折节',
      jlsg_fengya: '风雅',
      jlsg_yijian: '义谏',
      jlsg_feijun: '飞军',
      jlsg_muniu: '木牛',
      jlsg_muniu2: '木牛',
      jlsg_liuma: '流马',
      jlsg_baozheng: '暴征',
      jlsg_lingnu: '凌怒',
      jlsg_zhongyong: '忠勇',
      jlsg_bozhan: '搏战',
      jlsg_qingxi: '轻袭',


      jlsg_danshou: '胆守',
      jlsg_yonglie: '勇烈',
      jlsg_hengshi: '衡势',
      jlsg_zhijiao: '至交',
      jlsg_zhijiao2: '至交',
      jlsg_jiwux: '戟舞',
      jlsg_daoshi: '刀侍',
      jlsg_lirang: '礼让',
      jlsg_lirang2: '礼让',
      jlsg_lirang2_backup: '礼让',
      jlsg_xianshi: '贤士',
      jlsg_chengxiang: '称象',
      jlsg_renxin: '仁心',
      jlsg_midao: '米道',
      jlsg_yishe: '义舍',
      jlsg_pudu: '普渡',
      jlsg_zongqing: '纵情',
      jlsg_bugua: '卜卦',
      jlsg_zhaoxin: '昭心',
      jlsg_zhihe: '制合',
      jlsg_caijie: '才捷',
      jlsg_jilei: '鸡肋',
      jlsg_yanliang: '延粮',
      jlsg_duzhi: '毒治',
      jlsg_duzhi2: '毒治',
      jlsg_lieyi: '烈医',
      jlsg_lieyi1: '烈医',
      jlsg_baoli: '暴戾',
      jlsg_huanbing: '缓兵',
      jlsg_huanbing2: '缓兵',
      jlsg_hongyuan: '弘援',
      jlsg_huaqiang: '花枪',
      jlsg_chaohuang: '朝凰',
      jlsg_huilian: '慧敛',
      jlsg_wenliang: '温良',
      jlsg_qianhuan: '千幻',
      jlsg_jinglun: '经纶',
      jlsg_ruzong: '儒宗',
      jlsg_ruzong_wuxie: '儒宗',
      jlsg_ruzong_shan: '儒宗',
      jlsg_leiji: '雷祭',
      jlsg_shanxi: '闪戏',
      jlsg_guhuo: '蛊惑',
      jlsg_fulu: '符箓',
      jlsg_guixiu: '闺秀',
      jlsg_cunsi: '存嗣',
      jlsg_yongjue: '勇决',
      jlsg_yongjue2: '勇决',
      jlsg_gongshen: '恭慎',
      jlsg_jianyue: '俭约',
      jlsg_pengri: '捧日',
      jlsg_danmou: '胆谋',
      jlsg_fushe: '伏射',
      jlsg_ziguo: '资国',
      jlsg_shangdao: '商道',
      jlsg_hengjiang: '横江',
      jlsg_zhuanshan: '专擅',
      jlsg_zhenlie: '贞烈',
      jlsg_miji: '秘计',
      jlsg_danqi: '单骑',
      jlsg_tuodao: '拖刀',
      jlsg_wusheng: '武圣',
      jlsg_zhuiji: '追击',
      jlsg_xionglie: '雄烈',
      jlsg_chenqing: '陈情',
      jlsg_mozhi: '默识',
      jlsg_zhoufu: '咒缚',
      jlsg_zhoufu2: '咒缚',
      jlsg_yingbing: '影兵',
      jlsg_yongji: '勇继',
      jlsg_yongjiBuff: '勇继',
      jlsg_wuzhi: '武志',
      jlsg_yidu: '异度',
      jlsg_zhubao: '诛暴',
      jlsg_fenji: '奋激',
      jlsg_jiaomei: '娇媚',
      jlsg_huoshui: '祸水',

      jlsg_yuhua: '羽化',
      jlsg_yuhua_info: '当你使用锦囊牌造成伤害时，或当你受到锦囊牌造成的伤害时，你可以摸一张牌并防止之。若如此做，你的手牌上限-1',
      jlsg_dengxian: '登仙',
      jlsg_dengxian2: '登仙',
      jlsg_dengxian_info: '觉醒技，回合开始阶段，若你的手牌上限为0，你移除弃牌阶段并选择一项：1.替换为摸牌阶段；2.替换为出牌阶段。',
      jlsg_tiance: '天策',
      jlsg_tiance_info: '回合开始阶段，你可以令一名角色进行判定，然后你选择并令其从牌堆或弃牌堆或除其以外的随机一名角色处获得两张与判定结果花色相同的牌',
      jlsg_jiexin: '竭心',
      jlsg_jiexin_info: '当你受到伤害后，你可以发动一次〖天策〗，然后若判定结果与对你造成伤害牌的颜色相同，你额外再发动一次〖天策〗。',
      jlsg_jiexin_tiance: '竭心',
      jlsg_tongxin: '同心',
      jlsg_tongxin_info: '限定技，当你处于濒死状态时，你可以回复体力至2点，然后若关索或鲍三娘不在场，你可以将武将牌替换为其中之一。',
      jlsg_zhengnan: '征南',
      jlsg_zhengnan2: '征南',
      jlsg_zhengnan_info: '出牌阶段限一次，你可以弃置一名角色区域里的一张牌，若以此法弃置的牌为非基本牌，视为其使用一张【南蛮入侵】；以此法使用的【南蛮入侵】造成伤害时，你摸一张牌。',
      jlsg_jianwu: '剑舞',
      jlsg_jianwu2: '剑舞',
      jlsg_jianwu_info: '锁定技，若你使用的上一张牌为基本牌，你使用【杀】时无距离和次数限制，且目标上限+1',
      jlsg_zhennan: '镇南',
      jlsg_zhennan_info: '每回合限一次，当一张【杀】或普通锦囊指定目标后，若目标数大于一，你可以对其中一个目标造成一点伤害。',
      jlsg_shemi: '奢靡',
      jlsg_shemi2: '奢靡',
      jlsg_shemi_draw: '奢靡',
      jlsg_shemi_info: '锁定技，弃牌阶段，你可以多弃置任意张牌，若你于此阶段内弃置牌的数量大于你的上一个弃牌阶段，你的摸牌阶段摸牌数+1，若你未受伤，你加一点体力上限。',
      jlsg_jiaohui: '狡慧',
      jlsg_jiaohui_info: '当你受到伤害时，你可以摸一张牌或弃置一张牌，然后若你的手牌数等于体力值，你令此伤害-1。',
      jlsg_wengua: '问卦',
      jlsg_wengua2: '问卦',
      jlsg_wengua_info: '一名角色的回合开始阶段，其可以交给你一张牌，然后你可以将一张牌置于牌堆底，再与其各摸一张牌。',
      jlsg_fuzhu: '伏诛',
      jlsg_fuzhu_info: '限定技，出牌阶段，你可以选择一名其他角色，然后展示牌堆底牌，若此牌为黑色，你将此牌当【杀】对其使用，然后重复此流程。',
      jlsg_yinyuan: '姻缘',
      jlsg_yinyuan_info: '结束阶段，你可以令一名角色从牌堆获得一张红桃牌，然后若该角色是第一次成为此技能的目标，你从牌堆获得一张红桃牌。',
      jlsg_konghou: '箜篌',
      jlsg_konghou_info: '当其他角色于其出牌阶段使用第一/二张牌时，若此牌为非延时锦囊/基本牌，你可以弃置一张牌，令此牌无效',
      jlsg_zhidi: '制敌',
      jlsg_zhidi_info: '锁定技，准备阶段，你随机获得以下一项你还未获得的效果：1.你使用【杀】造成伤害后，你摸一张牌；2.你使用【杀】无视防具且不能被【闪】相应；3.你使用【杀】无距离限制且次数上限+X；4.你使用【杀】可以额外指定X个目标（X为你以此法获得的效果数）',
      jlsg_jijun: '集军',
      jlsg_jijun_info: '出牌阶段限一次，你可以将任意张不同花色的手牌置于武将牌上，称为「兵」,然后获得其中其余与你本次放入的牌同花色的牌，并可视为使用一张基本牌（无距离和次数限制）。',
      jlsg_fangtong: '方统',
      jlsg_fangtong2: '方统',
      jlsg_fangtong_info: '锁定技，若你的「兵」的点数之和不小于：9，你拥有技能〖雷击〗；18，你拥有技能〖咒缚〗；27，你拥有技能〖神道〗；36，你拥有技能〖变天〗。结束阶段，你将手牌数补至X张（X为你因〖方统〗激活的技能数）',
      jlsg_jinzhi: '锦织',
      jlsg_jinzhi2: '锦织',
      jlsg_jinzhi_info: '你可以将所有手牌当任意基本牌或非延时锦囊使用（同名牌每轮限一次），然后摸X张牌（X为本轮此技能已发动的次数），每轮限四次。',
      jlsg_yuyou: '鱼忧',
      jlsg_yuyou_info: '锁定技，你一次获得至少两张牌后，你须选择保留其中一张并弃置其余的牌，然后你可以令一名男性角色选择一项：1.弃置等量的牌；2.失去一点体力。',
      jlsg_huituo: '恢拓',
      jlsg_huituo_info: '准备阶段，你可以选择一名角色并选择一项：1.令其回复体力至唯一最多；2.令其摸牌至唯一最多；3.选择一名角色，系统为该角色的每个空装备栏选择一张装备牌，然后该角色使用之；4.令其获得〖恢拓〗。每项限一次。',
      jlsg_xingshuai: '兴衰',
      jlsg_xingshuai_info: '你受到其他角色造成的伤害后，可以令一名其他角色选择一项：1.翻面；2.令你与此回合结束后执行一个额外的回合。',
      jlsg_zhanjue: '战绝',
      jlsg_zhanjue_info: '出牌阶段，你可以将所有手牌当作【决斗】使用。此【决斗】结算后，你与以此法受到伤害的角色各摸一张牌。若你在同一阶段内以此法摸了两张或更多的牌，则此技能失效直到回合结束。当你失去一个区域内所有牌后，可以对一名角色造成1点伤害。',
      jlsg_yanzhu: '宴诛',
      jlsg_yanzhu_info: '出牌阶段限三次，你可以令一名角色获得一枚“宴诛”标记，然后若其拥有的标记数为：1，你令其摸X张牌；2，你令其弃置X张牌；3，你对其造成X点伤害。（X为与其拥有标记数相同的角色数量）',
      jlsg_xingxue: '兴学',
      jlsg_xingxue_info: '回合结束阶段，你可以令一名角色摸等同于其拥有“宴诛”标记数的牌，然后其将超出体力上限的牌交给你，并弃置其所有“宴诛”标记。',
      jlsg_taoluan: '滔乱',
      jlsg_taoluan2: '滔乱',
      jlsg_taoluan_info: '一名角色使用基本牌或非延时锦囊牌指定目标后（濒死状态除外），你可以弃置一张牌，令其使用的牌名改为由你指定的另一张同类型的牌，每轮每种牌名限一次。',
      jlsg_shiqiao: "拾樵",
      jlsg_shiqiao_info: "一名角色的回合结束时，你可以从弃牌堆随机获得X张牌（X为该角色于此回合内使用杀的次数）",
      jlsg_yingge: "莺歌",
      jlsg_yingge2: "莺歌",
      jlsg_yingge_info: "一名角色的出牌阶段开始时，你可以弃置一张手牌，令其不能使用点数小于X的非转化非虚拟牌、点数不小于X的手牌均视为【杀】、攻击范围和【杀】的使用次数上限+X，直到该阶段结束。（X为你弃置牌的点数）",
      jlsg_kuangbi: "匡弼",
      jlsg_kuangbi_info: "当基本牌或非延时锦囊指定目标时，你可以为此牌增加或减少一个目标，每回合限一次。",
      jlsg_taoxi: "讨袭",
      jlsg_taoxi2: "讨袭",
      jlsg_taoxi_info: "出牌阶段限一次，你可以获得其他角色各一张手牌，此阶段结束时，你交还剩余的牌。",
      jlsg_huaibi: "怀璧",
      jlsg_huaibi_info: "锁定技，游戏开始时，回合结束阶段，若你没有「玺」，你摸两张牌，然后将一张手牌置于武将牌上，称为「玺」。其他角色使用与「玺」花色相同的【杀】和非延时锦囊对你无效。",
      jlsg_zhixi: "掷玺",
      jlsg_zhixi_info: "出牌阶段限一次，你可以将「玺」交给一名其他角色，令其失去3点体力。若你已对其发动过此技能则改为失去1点体力。",
      jlsg_caijian: "才鉴",
      jlsg_caijian_info: "出牌阶段限一次，当你受到1点伤害后，你可以将一名角色的一张牌置于武将牌上，称为「鉴」，若此牌为黑色且与其他「鉴」的花色均不同，你令该角色翻面。",
      jlsg_zhishix: "智识",
      jlsg_zhishix_backup: "智识",
      jlsg_zhishix_info: "出牌阶段，你可以将三张花色各不相同的「鉴」置入弃牌堆，摸三张牌，并获得随机一名魏势力武将的技能。",
      jlsg_anguo: "安国",
      jlsg_anguo_info: "摸牌阶段，你可以少摸一张牌，然后令一名角色随机使用一张装备牌，若此牌为：武器牌，其摸X张牌（X为此武器牌的攻击范围）；防具或宝物牌，其回复1点体力；坐骑牌，重复此流程。",
      jlsg_quanxiang: "劝降",
      jlsg_quanxiang2: "劝降",
      jlsg_quanxiang_info: "出牌阶段，你可以与一名角色拼点。若你赢，你令其失去所有体力且你此阶段不能再发动此技能，若其以此法进入濒死状态后脱离濒死状态，你令其回复等量的体力，然后你获得1枚「饶舌」标记。若你没赢，你获得2枚「饶舌」标记。若你拥有7枚「饶舌」标记，你死亡。",
      jlsg_raoshe: "饶舌",
      jlsg_gushe: "鼓舌",
      jlsg_gushe2: "鼓舌",
      jlsg_gushe_info: "锁定技，你的拼点牌点数+X (X为「饶舌」标记数)，当你拼点赢/没赢后，你获得对方/你的拼点牌。",
      jlsg_jici: "激词",
      jlsg_jici_info: "当你受到其他角色对你造成的伤害时，你可以令其摸一张牌，然后与其拼点。若你赢，你防止此伤害。若你没赢，你将此伤害改为1点，然后获得1枚「饶舌」标记。若你拥有7枚「饶舌」标记，你死亡。",
      jlsg_hechun: "贺春",
      jlsg_hechun_info: "出牌阶段限一次，你可以令所有其他角色展示并交给你一张牌， 然后你可以令以此法交给你黑色/红色牌的角色失去/回复1点体力。",
      jlsg_daiyan: "怠宴",
      jlsg_daiyan_info: "回合结束时，你可以令一名角色获得一个额外的回合，若你已对其发动过此技能，你令其先失去X点体力(X为你对其再次发动此技能的次数)",
      // jlsg_jianying: "渐营",
      jlsg_shibei: "矢北",
      jlsg_shibei2: "矢北",
      jlsg_shibei_info: "每回合限一次，当你受到伤害后，你可以回复1点体力，然后你可以将一张牌当对你造成此伤害的牌使用。若如此做，当你于此回合内再次受到伤害后，你失去1点体力。",
      jlsg_kuizhu: '溃诛',
      jlsg_kuizhu_info: '锁定技，回合结束阶段，若其他角色于本回合内弃置的牌数多于你，你对一名角色造成2点伤害，否则你失去1点体力并摸X张牌(X为角色数)。',
      jlsg_chezheng: '掣政',
      jlsg_chezheng_info: '非额外出牌阶段结束后，你可以选择一项: 1. 令至多X名角色各弃置一张牌，若如此做，这些角色各进行一个额外出牌阶段; 2.令至多X名角色各摸一张牌，若如此做，这些角色各进行一个额外弃牌阶段(X为你的体力) 。',
      jlsg_jueyong: '绝勇',
      jlsg_jueyong_info: '当你使用【杀】对目标角色造成伤害时，你可以将体力或体力上限调整至与其手牌数相同，然后摸X张牌（X为你体力或体力上限的变化量），若你以此法减少了体力或体力上限，你令此伤害翻倍，每回合限一次。',
      jlsg_choujue: '仇决',
      jlsg_choujue_info: '出牌阶段限一次，你可以减一半（向下取整，至少为1）体力上限并视为使用【杀】（无次数限制），当你以此法造成伤害时，令你所有出牌阶段限一次的技能视为未发动过。',
      jlsg_juzhan: '拒战',
      jlsg_juzhan_info: '其他角色的出牌阶段开始时，你可以摸X张牌，然后令其视为对你使用【杀】，若此【杀】对你造成了伤害，除非其弃置X张牌(X为你已损失体力且至多为5)，否则结束此出牌阶段。 ',
      jlsg_zuilun: "罪论",
      jlsg_zuilun_info: "锁定技，回合结束阶段，若你本回合内没有弃置牌/回复体力/造成伤害，你摸四张牌/失去1点体力/减一点体力上限，否则将此效果改为令另一名角色执行。",
      jlsg_fuzhi: "父志",
      jlsg_fuzhi_info: "觉醒技，回合开始阶段，若你的体力为1，你加1点体力上限并回复1点体力，失去〖罪论〗并获得〖妖智〗和〖星陨〗。",
      jlsg_jiejun: "截军",
      jlsg_jiejun_info: "你的回合外，当其他角色使用红色牌后，你可以对其使用一张【杀】，当此【杀】造成伤害后，你获得其所有牌。",
      jlsg_xiecui: "撷翠",
      jlsg_xiecui_info: "当一名角色于回合内首次造成伤害时，你可以弃置两张花色不同的牌，令此伤害+1/-1，然后其摸/弃置X张牌(X为其于本回合内已使用的牌数)",
      jlsg_youxu: "忧恤",
      jlsg_youxu_info: "一名角色的出牌阶段开始时，你可以选择其X张牌，令其将这些牌当【桃】或【五谷丰登】使用(X为其已损失的体力值)",
      jlsg_zhulu: "逐鹿",
      jlsg_zhulu_info: "当你对一名角色造成伤害后，你可以令除该角色以外的角色各获得其一张牌。",
      jlsg_huaiyi: "怀异",
      jlsg_huaiyi2: "怀异",
      jlsg_huaiyi3: "怀异",
      jlsg_huaiyi_info: "出牌阶段限一次，你可以将其他角色的一张牌置于你的武将牌上，称为「异」，你摸牌阶段的摸牌数+X;回合结束阶段，若X大于你的体力(X为「异」数)，你对其他角色各造成1点伤害，然后获得所有「异」。",
      jlsg_jiaozhao: "矫诏",
      jlsg_jiaozhao_info: "出牌阶段限一次，你可以将一张手牌当任意基本牌或非延时锦囊牌使用，你可以选择任意其他角色为此牌的目标且你不能成为目标，以此法使用的牌无距离和次数限制。",
      jlsg_danxin: "殚心",
      jlsg_danxin_info: "当你受到伤害后，你可以摸两张牌，然后你可以发动〖矫诏〗。",
      jlsg_fanghun: "芳魂",
      jlsg_fanghun_sha: "芳魂",
      jlsg_fanghun_shan: "芳魂",
      jlsg_fanghun_cz1: "芳魂",
      jlsg_fanghun_cz2: "芳魂",
      jlsg_fanghun_info: "你可以将【杀】/【闪】当【闪】/【杀】使用或打出，然后你可以获得对方的一张牌。",
      jlsg_fuhan: "扶汉",
      jlsg_fuhan_info: "当你使用转化的牌后，你可以随机获得蜀势力武将的一个技能，每回合限一次。",
      jlsg_pindi: "品第",
      jlsg_pindi_info: "出牌阶段对每名其他角色限一次，你可以弃置一张手牌令一名其他角色判定，若结果为:黑色，你令其摸或弃置三张牌;方片，你摸一张牌;红桃，你翻面。",
      jlsg_faen: "法恩",
      jlsg_faen_info: "当一名角色翻面后，你可以令其摸三张牌。",
      jlsg_diaodu: "调度",
      jlsg_diaodu_info: "准备阶段，你可以令两名角色交换手牌或装备区里的牌，然后你弃置X张牌(X为交换的牌数差)。",
      jlsg_diancai: "典财",
      jlsg_diancai_info: "结束阶段，你可以令两名角色摸等同于对方于本回合内失去牌数的牌。",
      jlsg_zhendu: "鸩毒",
      jlsg_zhendu2: "鸩毒",
      jlsg_zhendu_info: "一名角色的出牌阶段开始时，你可以令其于本回合内对除你以外的角色造成的伤害+1；若该角色不是你，你令其失去1点体力。",
      jlsg_qiluan: "戚乱",
      jlsg_qiluan_info: "一名角色的回合结束时，你可以令其视为对你指定的另一名角色使用【杀】，然后你摸X张牌(X为所有角色于本回合内体力改变的次数)。",
      jlsg_wurong: "怃戎",
      jlsg_wurong2: "怃戎",
      jlsg_wurong_info: "出牌阶段限一次，你可以展示其他角色的一张手牌，然后你可以弃置一张手牌。若这两张牌的类别:不同，你令其一个非锁定技于本回合内无效，并对其造成1点伤害;相同，你获得其展示的牌，并可以对其重复此流程。",
      jlsg_shanjia: "缮甲",
      jlsg_shanjia_info: "锁定技，若你的-1坐骑栏内没牌且未被废除，你与其他角色的距离-2，你使用的【杀】结算两次;若你+1坐骑栏内没牌且未被废除，其他角色与你的距离+2,你使用的非延时锦囊牌结算两次(【铁索连环】、【无懈可击】除外)",
      jlsg_jili: "蒺藜",
      jlsg_jili_info: "当你使用或打出非锦囊牌后，你可以令攻击范围内的其他角色各随机弃置一张牌，然后若你于本回合内使用的牌数不多于你的攻击范围，你摸X张牌(X为弃牌的角色数)",
      jlsg_dujin: "独进",
      jlsg_dujin2: "独进",
      jlsg_dujin_info: "锁定技，你使用【杀】无次数限制。你于出牌阶段内使用的第一张【杀】的伤害+1且不能被【闪】响应，其余的【杀】被其他角色的【闪】响应后，其对你造成1点伤害。",
      jlsg_sanjue: "三绝",
      jlsg_sanjue2: "三绝",
      jlsg_sanjue_info: "锁定技，当你第一次或第三次使用同名牌时，你摸一张牌，然后获得一个随机吴势力技能。出牌阶段开始时，你可以令一名角色获得一个随机技能。",
      jlsg_sanjue2_info: "出牌阶段开始时，你可以令一名角色获得一个随机技能。",
      jlsg_canshi: "蚕食",
      jlsg_canshi_info: "当其他角色回复体力/加体力上限/对你造成伤害后，你可以令其获得1枚「蚕食」标记，然后你摸两张牌。拥有此标记的角色手牌上限-X(X为标记数)。",
      jlsg_xianji: "献祭",
      jlsg_xianji_info: "回合开始阶段，你可以选择一名拥有「蚕食」标记数大于其体力上限的其他角色并移除其所有「蚕食」标记。若如此做，你加X点体力上限并回复X点体力(X为目标角色拥有的技能数)，然后与其交换所有技能且你于本局游戏中不能成为〖献祭〗的目标。",
      jlsg_hanyong: "悍勇",
      jlsg_hanyong_info: "锁定技，若你的装备区里没有武器牌/防具牌，你视为装备着【贯石斧】/【藤甲】。",
      jlsg_lingruo: "凌弱",
      jlsg_lingruo_info: "当你使用【杀】或非延时锦囊牌指定一名其他角色为目标后，或成为其他角色对你使用这些牌的目标后，你可以随机执行以下效果之一:摸一张牌;随机获得其一张牌;令其随机弃置一张牌。共执行X次(X为你的基本牌/锦囊牌/装备牌中数量多于该角色的类别数)。",
      jlsg_fujian: "伏间",
      jlsg_fujian2: "伏间",
      jlsg_fujian3: "伏间",
      jlsg_fujian_info: "回合开始阶段，你可以观看一名其他角色的手牌并标记其中一张，若如此做，当该角色失去此牌后，你令其失去1点体力，然后你摸X张牌(X为其拥有此标记牌时使用的牌数)。",
      jlsg_fengyin: "凤吟",
      jlsg_fengyin_info: "每回合各牌名限一次，当你使用【杀】或【决斗】对其他角色造成伤害时，你可以摸X张牌并令此伤害+Y(X为你手牌里的方片牌数，Y为目标角色手牌里的方片牌数)。",
      jlsg_rongzhuang: "戎妆",
      jlsg_rongzhuang_info: "锁定技，若你的装备区里有:武器牌，你使用【杀】无次数限制;防具牌，你使用的【杀】不能被其他角色响应;武器牌和防具牌，将你〖凤吟〗中的“方片牌”改为“红色牌”。",
      jlsg_huomo: "活墨",
      jlsg_huomo_info: "每回合每种牌名限一次，你可以将黑色牌当任意基本牌使用。",
      jlsg_dingguan: "定关",
      jlsg_dingguan_info: "当任意角色于其出牌阶段内使用黑色牌指定目标后，若本阶段内没有角色受到伤害，你可以令其中任意个目标各摸一张牌。",
      jlsg_xianshou: "仙授",
      jlsg_xianshou_info: "回合开始时，你可以选择一名角色，令其获得〖天道〗，若其已拥有〖天道〗，改为判定：若结果不为黑桃，你令其〖天道〗中的随机一项数字+1;若结果为黑桃，改为-1。",
      jlsg_tiandao: "天道",
      jlsg_tiandao_info: "锁定技，回合开始阶段，你摸1张牌，随机获得1个群势力技能，然后可以选择一名角色，令其随机弃置1张牌，对其造成1点雷电伤害。",
      jlsg_chengfeng: "乘风",
      jlsg_chengfeng_info: "锁定技，当你受到伤害时，你判定：若结果不为黑桃，你令此伤害-1；若结果为黑桃，你获得1枚「乘风」标记。一名角色的回合结束后，你弃置2枚「乘风」标记并执行一个额外回合。",
      jlsg_kunfen: "困奋",
      jlsg_kunfen_info: "锁定技，当你受到伤害后、失去体力后、减体力上限后，你摸三张牌，若本次是你于本回合内第一次发动此技能，你回复1点体力。",
      jlsg_caiyu: "才遇",
      jlsg_caiyu_info: "回合开始阶段，你可以减1点体力上限，随机获得一个诸葛亮的技能。",
      jlsg_qinqing: "寝情",
      jlsg_qinqing_info: "回合结束阶段，你可以选择一名角色，若如此做，你令攻击范围内含有该角色的其他角色各交给其一张牌，然后若该角色的手牌不多于你，你可以令其回复1点体力。",
      jlsg_huisheng: "贿生",
      jlsg_huisheng_info: "当你受到其他角色造成的伤害时，你可以令其观看你至多三张手牌并选择一项: 1.获得其中一张并防止此伤害; 2.弃置等量的牌。",
      jlsg_manyi: "蛮裔",
      jlsg_manyi_info: "当你使用的【杀】或非延时锦囊牌指定目标后，或当你成为其他角色使用这些牌的目标后，你可以将此牌的效果改为【南蛮入侵】，然后摸一张牌。",
      jlsg_souying: "薮影",
      jlsg_souying_info: "每回合对每名角色限一次，当任意角色打出【杀】后，你可以对一名角色造成1点伤害;每回合对每名角色限一次，当任意角色打出【闪】后，你可以令一名角色回复1点体力。",
      jlsg_guolun: "过论",
      jlsg_guolun_info: "每回合限一次，当你摸牌或弃牌后，你可以令一名其他角色执行相反的效果。",
      jlsg_guolun2: "过论2",
      jlsg_guolun2_info: "每回合限一次， 当你摸牌或弃牌后， 你可以令一名其他角色执行相反的效果;每回合限一次，当你摸牌或弃牌后，你可以令一名其他角色执行相同的效果。",
      jlsg_guolun3: "过论3",
      jlsg_guolun3_info: "每回合限一次，当任意角色摸牌或弃牌后，你可以令另一名角色执行相反的效果;每回合限一次，当任意角色摸牌或弃牌后，你可以令另一名角色执行相同的效果。",
      jlsg_guolun4: "过论4",
      jlsg_guolun4_info: "每回合限一次，当任意角色摸牌、弃牌、回复体力或受到伤害后， 你可以令另一名角色执行相反的效果;每回合限一次，当任意角色摸牌、弃牌、回复体力或造成伤害后，你可以令另一名角色执行相同的效果。",
      jlsg_songsang: "送丧",
      jlsg_songsang_info: "锁定技，当其他角色死亡时，你修改“过论”(至多三次)并摸X张牌(X为存活角色数)。",
      jlsg_qinguo: "勤国",
      jlsg_qinguo_info: "出牌阶段，你可以对任意角色使用装备牌。当你使用装备牌后，你可以视为使用任意一张无次数限制的基本牌。每回合限一次，当任意角色装备区里的牌进入弃牌堆后，你可以获得之。",
      jlsg_zhenge: "枕戈",
      jlsg_zhenge_buff: "枕戈",
      jlsg_zhenge_info: "锁定技，当你使用非「枕戈」牌后，你获得牌堆底牌并标记为「枕戈」牌，你的「枕戈」牌不计入手牌上限且无次数限制。当你使用黑色/红色「枕戈」牌指定一名角色为目标后，你可以令其受到随机负面/正面效果。",
      jlsg_zhenge_derivation: "负面/正面效果",
      jlsg_zhenge_derivation_ab: "负面/正面效果",
      jlsg_zhenge_derivation_info: "正面：随机获得一个技能；手牌上限+1；从牌堆或弃牌堆获得1/2张基本牌/锦囊牌/装备牌；随机加1~3点体力上限；随机回复1~3点体力；摸牌数+1；使用【杀】的次数上限+1；随机摸1~5张牌。<br>负面：横置；随机弃置1~5张牌；随机受到1~3点伤害；随机失去一个技能；翻面；随机受到1~3点火焰伤害；随机减1~2点体力上限；随机失去1~3点体力。",
      jlsg_xinghan: "兴汉",
      jlsg_xinghan_info: "游戏开始时，或回合结束时，你可以从任意势力中招募一名未上场过的武将。你至多拥有三名势力各不相同的招募武将，若任意势力的招募武将阵亡，则不可再从该势力中招募其他武将。",
      jlsg_qianchong: "谦冲",
      jlsg_qianchong_info: "任意角色的回合结束时，若你于本回合内使用的红色牌数为1，你可以令一名角色回复2点体力或摸X张牌;若你于本回合内使用的黑色牌数为1，你可以令一名角色失去2点体力或弃置X张牌(X为其体力上限)。若你执行了以上两项，且本回合不为额外回合，你于本回合结束后执行一个额外回合。",
      jlsg_shangjian: "尚俭",
      jlsg_shangjian_info: "锁定技，弃牌阶段开始时，你将超出手牌上限数量的手牌交给任意名其他角色，然后于此阶段结束时摸等量的牌。",
      jlsg_yanjiao: "严教",
      jlsg_yanjiao_info: "出牌阶段不同的X各限一次，你可以将满足条件的X张手牌交给一名角色，然后摸X张牌。X为1的条件是点数最大的牌; X为2的条件是点数相同的牌; X为3的条件是花色相同的牌; X为4的条件是点数连续的牌; X为5的条件是花色相同且点数连续的牌。当其他角色以此法获得牌后，若你拥有「省身」标记，你可以对其造成X点伤害。",
      jlsg_xingshen: "省身",
      jlsg_xingshen_info: "锁定技，当你受到1点伤害后，你摸两张牌，然后若你没有「省身」标记，你回复1点体力，并获得1枚「省身」标记直到你的下个回合结束。",

      jlsg_limu: "立牧",
      jlsg_limu_info: "出牌阶段限一次，你可以将方片牌当【乐不思蜀】对自己使用，然后回复1点体力并摸X张牌(X为 此牌的点数)；若你的判定区里有牌，你使用牌无次数限制。",
      jlsg_jiaomei_info: '出牌阶段限一次，当你使用【杀】或非延时锦囊牌指定目标后，你可以令其横置。若其已横置，改为令其重置并翻面。',
      jlsg_huoshui_info: '回合结束阶段，你可以依次获得已横置角色的一张牌，然后对所有武将牌背面向上的角色造成1点伤害。',
      jlsg_fenji_info: '当一名角色成为【杀】的目标后，你可以失去1点体力，然后令该角色摸两张牌。',
      jlsg_yidu_info: '你的回合外，当你失去手牌后，你可以摸X张牌（X为当前回合角色手牌中花色与这些牌相同的数量）。每回合限一次。',
      jlsg_zhubao_info: '你的回合内，当其他角色失去手牌后，你可以摸X张牌（X为你手牌中花色与这些牌相同的数量）。每回合对每名其他角色限触发一次。',
      // jlsg_zhubao_append: '<span style="font-family: yuanli">每次至多摸十张。</span>',
      jlsg_yongji_info: '锁定技，当你于出牌阶段使用【杀】造成伤害后，你摸X张牌（X为你已损失的体力值且至多为3），且本回合可额外使用一张【杀】。',
      jlsg_wuzhi_info: '锁定技，结束阶段，若你本回合内【杀】的使用次数未达到上限，你受到一点无来源伤害并从牌堆中获得一张【杀】',
      jlsg_wusheng_info: '你可以将一张红色牌当【杀】使用或打出。',
      jlsg_zhoufu_info: '其他角色的回合开始时，你可以弃置一张手牌，令其判定，若结果为黑桃，你令其所有非Charlotte技失效直到回合结束；若结果为梅花，其弃置两张牌。',
      jlsg_yingbing_info: '每回合限一次，当一名其他角色的黑色判定牌生效后，你可以视为对其使用一张【杀】。',
      jlsg_tuodao_info: '每当你用【闪】抵消了一次【杀】的效果时，若使用者在你的攻击范围内，你可以立刻对其使用一张【杀】，此【杀】无视防具且不可被【闪】响应',
      jlsg_zhuiji_info: '锁定技，你对其他角色造成伤害后，你令你与其的距离-1',
      jlsg_xionglie_info: '当你使用【杀】指定目标后，你可以选择一项：1.令此【杀】不能被【闪】响应；2.令此【杀】伤害+1。若你与所有其他角色的距离为1，则改为依次执行两项',
      jlsg_chenqing_info: '每回合限一次，当一名角色进入濒死状态时，你可以令另一名其他角色摸四张牌，然后其弃置X张牌。若其以此法弃置的牌花色各不相同，则视为该角色对濒死的角色使用一张【桃】。(X为此技能发动过的次数)',
      jlsg_mozhi_info: '一名角色的结束阶段开始时，你可以将一张手牌当作其此回合内使用的最后一张基本或普通锦囊牌使用。',
      jlsg_mozhi_append: '<span style="font-family: yuanli">你不能通过此技能使用【酒】</span>',
      jlsg_danqi_info: '觉醒技，回合开始阶段，若你的手牌数大于你的体力值，你失去1点体力上限，恢复2点体力，并获得技能〖拖刀〗。',
      jlsg_zhenlie_info: '当你成为其他角色使用的【杀】或非延时锦囊牌的目标时，你可以失去1点体力，令此牌对你无效，然后你可以弃置一张牌，令该角色展示所有手牌并弃置与之花色相同的牌。若其未以此法弃置牌，其失去1点体力。',
      jlsg_miji_info: '回合开始阶段开始时，若你已受伤，你可以声明一种牌的类别，然后从牌堆随机亮出一张此类别的牌，将之交给一名角色。回合结束阶段开始时，若你的体力为全场最少（或之一），你亦可以如此做。',
      jlsg_pengri_info: '出牌阶段限一次，你可以摸两张牌，然后攻击范围内含有你的其他角色可依次对你使用一张【杀】',
      jlsg_danmou_info: '当你受到伤害后，你可以与伤害来源交换手牌。',
      jlsg_fushe_info: '其他角色的出牌阶段开始时，若其在你的攻击范围内，你可以选择一种花色。若如此做，此阶段结束时，若有此花色的牌进入弃牌堆，你对其造成1点伤害，然后摸一张牌。',
      jlsg_ziguo_info: '出牌阶段限一次，你可以令一名已受伤的角色摸两张牌，若如此做，本回合你的手牌上限-2。',
      jlsg_shangdao_info: '锁定技，一名其他角色的准备阶段开始时，若其手牌数大于你，你展示牌堆顶牌并获得之。',
      jlsg_hengjiang_info: '弃牌阶段开始时，你可以令你的手牌上限+1或-1，若如此做，此阶段结束时，你可以弃置场上的至多X张牌（X为此阶段你弃置的牌数）。',
      jlsg_zhuanshan_info: '回合开始/结束阶段开始时，你可以令一名角色摸一张牌，然后将该角色的一张牌置于牌堆顶。',
      jlsg_hemeng_info: '出牌阶段，若你有手牌，可令一名其他角色观看你的手牌并获得其中一张，然后你观看该角色的手牌并获得其一张牌。每阶段限X+1次，X为你此阶段开始时已损失的体力值。',
      jlsg_sujian_info: '每当你从其他角色处获得一次牌时，可令一名其他角色弃置你一张牌，然后你弃置其一张牌。',
      jlsg_yexi_info: '回合结束阶段，你可以多弃一张手牌， 然后指定你以外的一名角色选择一项:1.使用黑色【杀】时无视防具。2.使用红色【杀】时无视距离。该角色在他的下个出牌阶段中得到此效果。',
      jlsg_kuangyan_info: '锁定技，你受到1点无属性伤害时，该伤害对你无效，你受到两点或以上伤害时，该伤害+1。',
      jlsg_chaochen_info: '出牌阶段限一次，你可以将至少一张手牌交给一名其他角色，若如此做，该角色的下个回合开始阶段开始时，若其手牌数大于体力值，你对其造成1点伤害。',
      jlsg_quanzheng_info: '当你成为其他角色使用的【杀】或非延时类锦囊牌的目标后，若其手牌或装备区的牌数大于你对应的区域，你可以摸一张牌。',
      jlsg_shejian_info: '出牌阶段对每名其他角色限一次，若你未装备防具，你可以弃置一名其他角色的一张牌，然后该角色可以视为对你使用一张【杀】。',
      jlsg_kuangao_info: '当一张对你使用的【杀】结算后，你可以选择一项：弃置所有牌（至少一张），然后该【杀】的使用者弃置所有牌；或令该【杀】的使用者将手牌补至其体力上限的张数（至多5张）。',
      jlsg_yinbing_info: '你攻击范围内的一名其他角色成为【杀】的目标时，你可以获得其装备区的一张牌，然后将该【杀】转移给你（你不得是此【杀】的使用者）；当你成为【杀】的目标时，你可以弃置一张牌，然后摸X张牌（X为你已损失的体力值）。',
      jlsg_fenwei_info: '当你使用【杀】对目标角色造成伤害时，你可以展示该角色的一张手牌：若为【桃】或【酒】，则你获得之；若不为基本牌，你弃掉该牌并令该伤害+1。',
      jlsg_shiyong_info: '锁定技，当你受到一次红色【杀】或【酒】【杀】造成的伤害后，须减1点体力上限。',
      jlsg_angyang_info: '每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或红色的【杀】时，你可以摸一张牌，若对方判定区内有牌，你改为摸两张。',
      jlsg_weifeng_info: '准备阶段，若你的手牌数小于你的体力值，你可以与一名角色拼点，赢的角色摸两张牌。',
      jlsg_xieli_info: '主公技，当你需要打出一张拼点牌时，你可请场上吴将帮你出，所有吴将给出牌后，你必须从中挑选一张作为拼点牌并弃掉其余。',
      jlsg_jushou_info: '回合结束阶段，你可以摸(X+1)张牌，最多5张。若如此做，将你的武将牌翻面。X为仅计算攻击范围和距离时，场上可以攻击到你的人数。',
      jlsg_yicong_info: '锁定技，只要你的体力值大于2点，你计算与其他角色的距离时，始终-1；只要你的体力值为2点或更低，其他角色计算与你的距离时，始终+1。',
      jlsg_muma_info: '锁定技，你的回合外，若你没有装备+1/-1马，则其他角色的+1/-1马从装备区失去时，你获得之。',
      jlsg_suiji_info: '其他角色的弃牌阶段开始时，你可以交给其至少一张手牌，然后其将超出其体力值数量的手牌交给你。',
      jlsg_fengyi_info: '当你成为非延时类锦囊牌的唯一目标后，你可以摸一张牌。',
      jlsg_yalv_info: '当你受到伤害后，或出牌阶段开始时，你可以观看牌堆顶两张牌并以任意顺序置于牌堆顶，然后你可以摸一张牌。',
      jlsg_xiemu_info: '一名角色的回合开始阶段开始时，你可以将一张牌置于牌堆顶，若如此做，该角色回合结束阶段开始时，你可以令其摸一张牌。',
      jlsg_zhejie_info: '其他角色的弃牌阶段结束时，你可以弃置一张手牌，令其弃置一张牌，若该角色弃置的牌为装备牌，你将之交给除该角色外的一名角色。',
      jlsg_fengya_info: '每当你受到一次伤害时，你可以摸一张牌，然后伤害来源可以摸一张牌并令此伤害-1。',
      jlsg_yijian_info: '你可以跳过你的出牌阶段并令一名其他角色摸一张牌，然后若该角色的手牌数不小于你的手牌数，你恢复1点体力。',
      jlsg_feijun_info: '锁定技，出牌阶段开始时，若你的手牌数不小于你的体力值，本阶段你的攻击范围+X且可以额外使用一张【杀】（X为你当前体力值）；若你的手牌数小于你的体力值，你不能使用【杀】直到回合结束。',
      jlsg_muniu_info: '你的回合内，当任意角色装备区的牌发生一次变动时，你可以选择一名角色并选择一项： 弃置其一张手牌，或令其摸一张牌。',
      jlsg_liuma_info: '出牌阶段限一次，你可以弃置一张基本牌，然后令至多两名装备区有牌的其他角色依次选择一项：将其装备区的一张牌交给一名其他角色，或令你获得其一张手牌。',
      jlsg_baozheng_info: '锁定技，回合结束阶段开始时，你令其他有手牌的角色依次选择一项：交给你一张手牌；或弃置两张牌，然后对你造成1点伤害。',
      jlsg_lingnu_info: '锁定技，回合结束时，若你于此回合受到2点或更多的伤害，你减1点体力上限，然后从其他角色处依次获得一张牌。',
      jlsg_zhongyong_info: '回合开始阶段开始时，你可以失去1点体力，若如此做，本回合的摸牌阶段，你可以额外摸X张牌（X为你已损失的体力值）；本回合的出牌阶段，你与其他角色的距离为1；本回合的弃牌阶段结束时，你可以令一名其他角色获得你本阶段弃置的牌。',
      jlsg_bozhan_info: '当你使用或被使用一张【杀】并完成结算后，若此【杀】未造成伤害，则此【杀】的目标或你可以对你或此【杀】的使用者使用一张【杀】(无距离限制）。',
      jlsg_qingxi_info: '锁定技，当你使用【杀】指定一名其他角色为目标后，若你装备区的牌数少于该角色，其不能使用【闪】响应此【杀】。',

      jlsg_danshou_info: '锁定技，当一名角色使用【杀】指定你为目标后，若你与其均有手牌，你与该角色拼点，若你赢，你摸两张牌，然后弃置其一张牌；若你没赢，此【杀】不可被【闪】响应。',
      jlsg_yonglie_info: '当你攻击范围内的一名角色受到【杀】造成的伤害后，你可以失去1点体力，然后对伤害来源造成1点伤害。',
      jlsg_hengshi_info: '弃牌阶段开始时，你可以摸等同于手牌数的牌。',
      jlsg_zhijiao_info: '限定技，回合结束阶段开始时，你可以令一名其他角色获得你的本回合因弃置而进入弃牌堆的牌。',
      // jlsg_jiwux_info: '出牌阶段开始时，你可以展示一张【杀】，令其获得以下效果之一（离开手牌区后失效）：1、此【杀】不计入次数限制，且此杀被【闪】响应时你从牌堆中获得一张【杀】；2、此【杀】无距离限制且可以额外指定1个目标；，若此【杀】未造成伤害，你令你手牌中所有【杀】获得随机一项【戟舞】效果；3、此【杀】的伤害值+1,且你使用此【杀】指定目标后，可以弃置一张【杀】令此【杀】结算时视为拥有其余两项【戟舞】效果。',
      jlsg_jiwux_info: '出牌阶段开始时，你可以展示一张【杀】，令其获得以下效果之一（离开手牌区后失效）：1、此【杀】不计入次数限制；2、此【杀】无距离限制，且可以额外指定1个目标；3、此【杀】的伤害值+1。',
      jlsg_daoshi_info: '一名角色的回合结束阶段开始时，若其装备区有牌，其可以摸一张牌，然后将其装备区的一张牌交给你。',
      jlsg_lirang_info: '一名角色的回合开始阶段结束时，其可以将一张与所有「礼」花色均不同的手牌置于你的武将牌上作为「礼」，然后摸一张牌。你可以将两张「礼」当【桃】使用。',
      jlsg_xianshi_info: '每当你受到一次伤害时，可以令伤害来源选择一项：展示所有手牌并弃置其中一张；或令此伤害-1.',
      jlsg_chengxiang_info: '每当你受到伤害后，你可以亮出牌顶堆的4张牌，然后获得其中的至少一张点数和不大于13的牌，将其余的牌置入弃牌堆。',
      jlsg_renxin_info: '每当一名其他角色处于濒死状态时，你可以翻面并将所有手牌交给该角色，令其恢复1点体力。',
      jlsg_midao_info: '出牌阶段限一次，你可以令手牌数大于你的其他角色依次交给你一张牌，然后若你的手牌数为全场最多，你失去1点体力。',
      jlsg_yishe_info: '出牌阶段限一次，你可以与一名手牌数不大于你的其他角色交换手牌。',
      jlsg_pudu_info: '限定技，出牌阶段，你可以获得所有其他角色的手牌，然后依次交给其他角色一张牌，直到你的手牌数不为全场最多。',
      jlsg_zongqing_info: '摸牌阶段开始时，你可以进行一次判定，若如此做，此阶段摸牌后你须展示之，然后弃置其中与该判定牌颜色不同的牌。若以此法弃置的牌为黑色，视为你使用一张【酒】；若以此法弃置的牌为红色，视为你使用一张【桃】。',
      jlsg_bugua_info: '当一名角色将要进行判定时，你可以展示牌堆顶的一张牌，然后选择一项：1.将一张手牌置于牌堆顶，或令其将一张手牌置于牌堆顶。当一名角色的判定牌为红色且生效后，你可以令其摸一张牌：当一名角色的判定牌为黑色且生效后，你可以令其弃一张牌。',
      jlsg_zhaoxin_info: '当你受到伤害后，你可以展示所有手牌，然后摸X张牌（X为缺少的花色数）。',
      jlsg_zhihe_info: '出牌阶段限一次，你可以展示所有手牌，并将其中每种花色的牌弃置至一张，然后将手牌数翻倍。',
      jlsg_caijie_info: '其他角色的回合开始阶段开始时，若其手牌数不小于你，你可以与其拼点，若你赢，你摸两张牌；若你没赢，视为其对你使用一张【杀】。',
      jlsg_jilei_info: '当你受到伤害后，你可以令伤害来源展示所有手牌并弃置其中类别相同且最多（或之一）的所有牌。',
      jlsg_yanliang_info: '一名角色的回合开始阶段开始时，你可以弃置一张红色牌，令其本回合的摸牌阶段改为在出牌阶段后进行；或弃置一张黑色牌，令其本回合的摸牌阶段改为在弃牌阶段后进行。',
      jlsg_duzhi_info: '当你恢复体力后，你可以令一名其他角色失去X点体力，然后该角色可以对你使用一张【杀】；当你使用红色【杀】造成伤害后，你可以令至多X名其他角色失去1点体力，然后这些角色可以依次对你使用一张【杀】（X为当前体力的改变值）。',
      jlsg_lieyi_info: '锁定技，你的【桃】均视为【杀】；你的【闪】均视为【酒】。',
      jlsg_baoli_info: '出牌阶段限一次，你可以对一名装备区没有牌或判定区有牌的其他角色造成1点伤害。',
      jlsg_huanbing_info: '锁定技，当你成为【杀】的目标时，终止此【杀】的结算，改为将之置于你的武将牌上。回合开始阶段开始时，你须为你武将牌上的每一张【杀】进行一次判定：若结果为红色，你摸一张牌；若结果为黑色，你须失去1点体力。然后将【杀】收入手牌。',
      // jlsg_hongyuan_info: '出牌阶段限一次，你可以弃置两张手牌，将一名角色装备区的牌移动到另一名其他角色对应的区域（不可覆盖）。',
      jlsg_hongyuan_info: '出牌阶段限一次，你可以弃置至多X张手牌，然后选择一名角色获得场上的X张牌（X为你已损失的体力值）。',
      jlsg_huaqiang_info: '出牌阶段限一次，你可以弃置X种不同花色的手牌，然后对一名其他角色造成1点伤害（X为你的体力值且至多为4）。',
      // jlsg_chaohuang_info: '出牌阶段限一次，你可以失去1点体力，然后视为对你攻击范围内的任意名角色依次使用一张【杀】（不计入出牌阶段的使用限制）。',
      jlsg_chaohuang_info: '出牌阶段限一次，你可以失去1点体力视为使用一张【杀】，（不计入出牌阶段的使用限制）指定你攻击范围内的任意名角色为目标。',
      jlsg_huilian_info: '出牌阶段限一次，你可以令一名其他角色进行一次判定并获得生效后的判定牌。若结果为红桃，该角色恢复1点体力。',
      jlsg_wenliang_info: '一名角色的红色判定牌生效后，你可以摸一张牌。',
      jlsg_qianhuan_info: '锁定技，你的每个回合开始时，随机展示3张未上场且你拥有的武将，你获得其中的2个技能（主公技，限定技，觉醒技，隐匿技，使命技，带有Charlotte标签的技能除外），直到你的下个回合开始。若该局游戏为双将模式，则移除你的另一名武将，将“2个”改为“4个”。',
      jlsg_jinglun_info: '你响应其他角色的牌，或其他角色响应你的牌时，你可以获得其使用或响应的牌。每回合限一次。',
      jlsg_ruzong_info: '你可以将【闪】/【无懈可击】当【无懈可击】/【闪】使用或打出。',
      jlsg_leiji_info: '当其他角色使用【闪】时，你可以将牌堆或弃牌堆里的一张【闪电】置入一名角色的判定区。',
      jlsg_shanxi_info: '锁定技，你不能成为【闪电】的目标，其他角色的【闪电】的判定牌生效后，你获得之。',
      jlsg_guhuo_info: '其他角色的回合开始时，你可以与其拼点：若你赢，你视为使用一张基本牌或非延时锦囊牌；若你没赢，其对你造成1点伤害。',
      jlsg_fulu_info: '当你受到一点伤害后，你可以令最近三名对你造成伤害的角色随机弃置一张牌，你最近三次回复体力的来源（若有）各摸一张牌。',
      jlsg_guixiu_info: '若你于此回合内未造成过伤害，你可以跳过弃牌阶段并摸一张牌。',
      jlsg_cunsi_info: '当你死亡时，你可以将区域内的所有牌移出游戏，然后令一名角色获得〖勇决〗',
      jlsg_yongjue_info: '锁定技，你使用【杀】造成的伤害+1；你杀死一名角色后，你获得所有〖存嗣〗移出游戏的牌。',
      jlsg_gongshen_info: '出牌阶段，你可以弃置3张牌，然后摸一张牌，若此时你的手牌数为最少（或之一），你恢复1点体力。',
      jlsg_jianyue_info: '一名角色的回合结束阶段开始时，若该角色的手牌数为最少（或之一），你可以令其从弃牌堆随机获得牌直到其手牌数不为最少（或之一）。',
      jlsgsk_simashi: "SK司马师",
      jlsgsk_xianglang: "SK向朗",
      jlsgsk_luji: "SK陆绩",
      jlsgsk_bianfuren: "SK卞夫人",
      jlsgsk_heqi: "SK贺齐",
      jlsgsk_mateng: "SK马腾",
      jlsgsk_tianfeng: "SK田丰",
      jlsgsk_feiyi: "SK费祎",
      jlsgsk_jiangqin: "SK蒋钦",
      jlsgsk_dongyun: "SK董允",
      jlsgsk_dongxi: "SK董袭",
      jlsgsk_quancong: "SK全琮",
      jlsgsk_yujin: "SK于禁",
      jlsgsk_panfeng: "SK潘凤",
      jlsg_quanlue: "权略",
      jlsg_quanlue_info: "出牌阶段开始时，你可以展示所有手牌并选择其中一种花色的手牌，然后摸与之等量的牌。若如此做，此阶段结束时，你须展示手牌并弃置所有此花色的手牌。",
      jlsg_huaiju: "怀橘",
      jlsg_huntian: "浑天",
      jlsg_huaiju_info: "你的一个阶段结束时，若你的手牌数为3，你可以摸一张牌或弃置两张牌。",
      jlsg_huntian_info: "当你的牌因弃置而进入弃牌堆时，你可将其中任意张置于牌堆顶，然后从牌堆随机获得一张与这些牌类别均不同的牌。",
      jlsg_cangshu: "藏书",
      jlsg_kanwu: "勘误",
      jlsg_kanwu_shan: "勘误",

      jlsg_cangshu_info: "当其他角色使用非延时类锦囊牌时，你可以交给其一张基本牌，然后获得此牌并令其无效。每回合限一次。",
      jlsg_kanwu_info: "当你于回合外需要使用或打出一张基本牌时，你可以弃置一张锦囊牌，视为使用或打出之。",
      jlsg_huage: "化戈",
      jlsg_muyi: "母仪",
      jlsg_huage_info: "出牌阶段限一次，你可以令所有角色依次弃置至少一张牌，目标角色每弃置一张【杀】则摸一张牌。",
      jlsg_muyi_info: "其他角色的回合开始阶段开始时，其可以交给你一至两张牌，然后此回合结束时，你交给其等量的牌。",
      jlsg_diezhang: "迭嶂",
      jlsg_diezhang_info: "出牌阶段，当你使用牌时，若此牌的点数大于本回合你上一张使用的牌，你可以摸一张牌。",
      jlsg_xiongyi: "雄异",
      jlsg_xiongyi_info: "锁定技，准备阶段，若你的体力值为1，你恢复1点体力；若你没有手牌，你摸两张牌。",
      jlsg_sijian: "死谏",
      jlsg_gangzhi: "刚直",
      jlsg_gangzhi2: "刚直",
      jlsg_sijian_info: "当你失去所有手牌后，你可以弃置一名其他角色的X张牌(X为你的体力值)。",
      jlsg_gangzhi_info: "当你受到伤害时，若你有手牌，你可以弃置所有手牌，然后防止此伤害，若你没有手牌，你可以将武将牌翻面，然后将手牌数补至体力上限。",
      jlsg_yanxi: "衍息",
      jlsg_zhige: "止戈",
      jlsg_zhige_3: "止戈·闪",
      jlsg_zhige_4: "止戈·杀",
      jlsg_yanxi_info: "回合开始阶段开始时或回合结束阶段开始时，若你的装备区内没有牌，你可以摸一张牌。",
      jlsg_zhige_info: "你可以弃置你装备区内的所有牌(至少一张)，视为使用一张【杀】或【闪】。",
      jlsg_shangyi: "尚义",
      jlsg_wangsi: "忘私",
      jlsg_shangyi_info: "出牌阶段限一次，你可以令一名其他角色观看你的手牌，然后你选择一项：观看其手牌，并可以弃置其中一张黑色牌；或观看其身份牌。",
      jlsg_wangsi_info: "当你受到伤害后，你可以观看伤害来源的手牌，并可以弃置其中一张红色牌。",
      jlsg_bibu: "裨补",
      jlsg_bibu1: "裨补",
      jlsg_kuangzheng: "匡正",
      jlsg_bibu_info: "其他角色的结束阶段，若你的手牌数大于体力值，你可以将一张手牌交给一名其他角色；否则你可以摸一张牌。",
      jlsg_kuangzheng_info: "你的回合结束时，你可以将一名角色的武将牌恢复至游戏开始时的状态（即将其武将牌翻转至正面朝上并重置之）。",
      jlsg_duanlan: "断缆",
      jlsg_duanlan_info: "出牌阶段限一次，你可以弃置其他角色区域内的1至3张牌，然后选择一项： 1、失去1点体力;2、弃置一张大于这些牌点数之和的牌。",
      jlsg_yaoming: "邀名",
      jlsg_yaoming_1: "邀名",
      jlsg_yaoming_2: "邀名",
      jlsg_yaoming_3: "邀名",
      jlsg_yaoming_4: "邀名",
      jlsg_yaoming_info: "出牌阶段，当你使用或打出一张花色与本阶段皆不相同的牌时：第一种，你可以摸一张牌；第二种，你可以弃置一名其他角色的一张牌；第三种，你可以将场上一张牌移至另一位置；第四种，你可以对一名其他角色造成一点伤害。",
      jlsg_yaoming_3_info: "你可以移动场上的一张牌",
      jlsg_zhengyi: "整毅",
      jlsg_zhengyi_shan: "整毅",
      jlsg_zhengyi_info: "你出牌阶段出牌时，若你的手牌数等于你的体力值+1，你可以视为使用任意一张基本牌，然后弃一张牌；你的回合外，当你需要使用或打出一张基本牌时，若你的手牌数等于你的体力值-1，则你可以摸一张牌并视为使用或打出了此牌。",
      jlsg_kuangfu: "狂斧",
      jlsg_kuangfu_info: "当你使用【杀】对目标角色造成伤害后，你可以获得其装备区里的一张牌。",
      jlsg_hubu: "虎步",
      jlsg_hubu_info: '你每使用【杀】造成一次伤害后或受到一次其他角色使用【杀】造成的伤害后，可以令除你外的任意角色进行一次判定；若结果不为黑桃，则视为你对其使用一张【决斗】（此【决斗】不能被【无懈可击】响应）。',

      jlsg_jianzheng: "谏征",
      jlsg_jianzheng_info: "当其他角色使用基本牌或非延时锦囊牌指定目标时，你可以与其拼点：当你赢后，你可以修改此牌的结算目标；当你没赢后，你也成为此牌的目标且此技能于本回合内无效。",
      jlsg_tianbian: "天辩",
      jlsg_tianbian_info: "当你需要拼点或于回合外需要使用/打出基本牌时，你可以观看牌堆顶的三张牌，然后可以将其中一张用作拼点牌或使用/打出。",
      jlsg_tianbian_hs: "invisible",
      jlsg_xuhe: "虚猲",
      jlsg_xuhe_info: "锁定技，若你未受伤，你使用的牌不能被其他角色响应；若你已受伤，你不能响应其他角色对你使用的牌。每回合限一次，一张牌结算后，若你因此牌触发过此技能，你可以摸X张牌（X为触发此技能的牌的目标数）。",
      jlsg_zhukou: "逐寇",
      jlsg_zhukou_info: "任意角色的出牌阶段结束时，你可以依次选择一名其他角色至多X次，对这些角色依次造成1点伤害（X为你于本阶段内使用过的牌的类型数）。",
      jlsg_duannian: "断念",
      jlsg_duannian_info: "任意角色的出牌阶段开始时，你可以弃置所有手牌并摸等量的牌，然后选择一项1．使用一张牌；2．回复1点体力。",
      jlsg_jingce: "精策",
      jlsg_jingce_info: "出牌阶段限一次，当你于本阶段内使用过的牌数等于你的使用【杀】的次数上限、摸牌数或体力上限时，你可以令此项数值+1，然后摸两张牌。",
      jlsg_guanxu: "观虚",
      jlsg_guanxu_info: "任意角色的回合开始时，你可以观看其手牌，然后你可以。。。",
      jlsg_yashi: "雅士",
      jlsg_yashi_info: "当你受到1点伤害后，你可以摸两张牌，然后若你拥有“观虚”，你可以重置之，否则你可以获得之。",
      jlsg_tunan: "图南",
      jlsg_tunan_info: "任意角色的出牌阶段开始时，你可以令其视为对其下家使用一张无距离限制和不计入次数的【杀】或【顺手牵羊】。",
      jlsg_bijing: "闭境",
      jlsg_bijing_info: "当你称为其他角色使用【杀】或非延时锦囊牌的目标后，你可以弃置其两张牌，然后弃置一张牌，若这些牌颜色均相同，并令其对你使用的牌无效。",
      jlsg_gongao: "功獒",
      jlsg_gongao_info: "锁定技，每回合每名角色限一次，当其他角色进入濒死状态时，你加1点体力上限并回复1点体力。",
      jlsg_juyi: "举义",
      jlsg_juyi_info: "准备阶段，你可以减1点体力上限，令你的摸牌数、手牌上限、攻击范围和使用【杀】的次数上限+1。",
      jlsg_weizhong: "威重",
      jlsg_weizhong_info: "锁定技，当你加或减体力上限后，你摸两张牌。当你进入濒死状态时，若你是本局第一个且第一次进入濒死状态的角色，你回复体力至体力上限。",
      jlsg_youyan: "诱言",
      jlsg_youyan_info: "出牌阶段对每名角色限一次，当你使用基本牌或非延时锦囊牌后，你可以选择一名角色，视为其使用此牌（须选择目标的牌的目标为你），然后你回复1点体力并摸三张牌。",
      jlsg_zhuihuan: "追还",
      jlsg_zhuihuan_info: "准备阶段，你可以对你的上个回合开始后对你造成过伤害的其他角色各造成2点伤害。",
      jlsg_zhuihuan_append: '<span style="font-family: yuanli">记录截取自上个回合开始时至当前回合开始时</span>',
      jlsg_jishe: "极奢",
      jlsg_jishe_info: "出牌阶段，你可以视为使用任意不能造成伤害或只能造成属性伤害的普通锦囊牌。以此法使用的牌结算后，若你于本阶段内发动此技能的次数大于你的体力上限，你减1点体力上限。",
      jlsg_lianhuo: "链祸",
      jlsg_lianhuo_info: "锁定技，当你成为任意角色使用基本牌或锦囊牌的目标后，你横置。当你横置时，你受到的火焰伤害+2。",
      jlsg_lianhua: "炼化",
      jlsg_lianhua_info: "任意角色的出牌阶段开始时，你可以观看其手牌并弃置至少一张，然后令其获得X张随机临时牌（X为以此法弃置的牌数＋1)。",
      jlsg_zhafu: "札符",
      jlsg_zhafu_info: "当临时牌进入弃牌堆后，你可以摸一张牌。",
    },
    dynamicTranslate: {
      jlsg_zhidi: function (player) {
        var flags = player?.storage?.jlsg_zhidi || [false, false, false, false];
        var cnt = flags.reduce((a, b) => a + b);
        var result = '锁定技，准备阶段，你随机获得以下一项你还未获得的效果：';
        var effects = [
          `1.你使用【杀】造成伤害后，你摸一张牌；`,
          `2.你使用【杀】无视防具且不能被【闪】相应；`,
          `3.你使用【杀】无距离限制且次数上限+X；`,
          `4.你使用【杀】可以额外指定X个目标`,
        ];
        for (var i = 0; i != 4; ++i) {
          if (flags[i]) {
            result += `<span class="bluetext">${effects[i]}</span>`
          } else {
            result += effects[i];
          }
        }
        result += `（X为你以此法获得的效果数<span class="legendtext">(${cnt})</span>）`;
        return result;
      },
      jlsg_tiandao(player) {
        let storage = player?.storage?.jlsg_tiandao || [1, 1, 1, 1];
        return `锁定技，回合开始阶段，你摸${storage[0]}张牌，随机获得${storage[1]}个群势力技能，然后可以选择一名角色，令其随机弃置${storage[2]}张牌，对其造成${storage[3]}点雷电伤害。`;
      },
      jlsg_guolun(player) {
        switch (player?.storage?.jlsg_guolun) {
          case 3:
            return lib.translate['jlsg_guolun4_info'];
          case 2:
            return lib.translate['jlsg_guolun3_info'];
          case 1:
            return lib.translate['jlsg_guolun2_info'];
          default:
            return lib.translate['jlsg_guolun_info'];
        }
      },

      jlsg_guanxu: function (player) {
        if (!"jlsg_guanxu" in player.storage || typeof player.storage.jlsg_guanxu != "number") return "任意角色的回合开始时，你可以观看其手牌，然后你可以。。。";
        let map = new Map([
          [0, "获得其中至多X张牌（X为其体力）。"],
          [1, "弃置其中一张牌，令其加1点体力上限并回复1点体力。"],
          [2, "弃置其中点数最大的牌，选择其一个技能于本回合内无效。"],
          [3, "弃置其中点数最小的牌，令其发现一个你拥有的技能。"],
          [4, "弃置其中花色相同且数量最少的所有牌，若这些牌为黑色，你令其减1点体力上限。"],
          [5, "弃置其中花色相同且数量最多的所有牌，令其摸等同于弃牌数双倍的牌。"],
          [6, `将其中一张牌交给另一名角色，视为后者对前者使用"杀"。`],
          [7, `将其中一张牌置于牌堆顶，令其进行"闪电"判定。`],
        ]);
        return "任意角色的回合开始时，你可以观看其手牌，然后你可以" + map.get(player.storage.jlsg_guanxu);
      },
      jlsg_huituo(player) {
        const storage = player.storage?.jlsg_huituo || [true, true, true, true];
        const choiceList = [
          `1.令一名角色回复体力至全场唯一最多`,
          `2.令一名角色摸牌至全场唯一最多`,
          `3.选择一名角色，系统为该角色的每个空装备栏选择一张装备牌，然后该角色使用之`,
          `4.令其他一名角色获得技能〖恢拓〗`
        ];
        for (let i in choiceList) {
          if (!storage[i]) choiceList[i] = `<span style="text-decoration: line-through;">${choiceList[i]}</span>`;
        };
        return `准备阶段，你可以选择一名角色并选择一项：${choiceList.join(";")}。每项限一次。`
      },
    },
  };
  postProcessPack(jlsg_sk);
  return jlsg_sk;
}