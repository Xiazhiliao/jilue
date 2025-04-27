import { lib, game, ui, get, ai, _status } from '../../../noname.js';
export let config={
  srlose: {
    name: "srlose",
    intro: "是否要求SR武将弃置技能",
    init: true,
  },
  qsRelic: {
    name: "七杀宝物特殊规则",
    intro: "锁定技，当你同时装备了七杀宝物、进攻马与防御马时，你选择将你装备区中的一张坐骑或是七杀宝物置入弃牌堆。",
    init: false,
  },
  // identityZhuSkill: {
  //   name: "极略主公技",
  //   intro: "移除主公的主公技，改为开局从主公技能池中挑选。",
  //   init: false,
  // },
  jlsg_identity_music_image: {
    name: "身份模式背景＆音乐",
    init: false
  },
  jlsg_boss_music_image: {
    name: "挑战模式背景＆音乐",
    init: false
  },

  oldCharacterReplace: {
    name: '旧版替换',
    intro: '设置是否将本扩展某些武将的技能替换为旧极略三国的武将技能 旧将不进行任何维护',
    init: false,
  },
  debug: {
    name: "<span style='color:#808080'>debug</span>",
    intro: "禁用所有其他武将包 <span style='color:#FF0000'>测试用！</span>",
    init: false,
  }
};