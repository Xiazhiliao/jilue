import {lib,game,ui,get,ai,_status} from '../../../noname.js'

let basicPath = lib.init.getCurrentFileLocation(import.meta.url);

export const basic={
    /**
     * 扩展目录地址，自动生成。
     */
    extensionDirectoryPath:basicPath.slice(0,basicPath.lastIndexOf('main/basic.js')),
    /**
     * 如果参数是function，返回其结果的promise。如果参数是普通对象，返回Promise.resolve(obj);
     * @param {*} obj 
     * @returns 
     */
    resolve:function(obj){
        if(typeof obj == 'function'){
            return Promise.resolve(obj());
        }else{
            return Promise.resolve(obj);
        }
    }
};