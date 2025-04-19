import { lib, game, ui, get, ai, _status } from '../../../../noname.js';
export default function (pack) {
  const prefixList = ["SK神", "SP神", "SK", "SR", "SP"];
  for (let name in pack.character) {
    if (!pack.character[name][4]) pack.character[name][4] = [];
    if (!pack.character[name][4].some(j => j.startsWith("die:"))) pack.character[name][4].push(`die:ext:极略/audio/die/${name}.mp3`);
    pack.character[name][4].push(`${(lib.device || lib.node) ? 'ext:' : 'db:extension-'}极略/image/character/${name}.jpg`);
    if (name in pack.translate && !name.startsWith('jlsgsy') && !name.startsWith('jlsgrm')) {
      let translate = pack.translate[name];
      if (!((name + '_ab') in pack.translate)) pack.translate[name + '_ab'] = '极略' + translate;
      for (let prefix of prefixList) {
        if (translate.startsWith(prefix)) {
          pack.translate[name + '_prefix'] = "极略" + prefix;
          break;
        }
      };
    }
  };
};