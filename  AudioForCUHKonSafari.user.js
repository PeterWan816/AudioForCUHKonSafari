/*

Note that this app is ONLY created for Safari. The author is not responsible for any damage/performance degradation caused by this plugin. PLEASE USE THIS PLUGIN AT YOUR OWN RISK. 
The Author is also not responsible for any liability issues caused by this plugin on any of your workflows.

MIT License

Copyright 2023 Peter Wan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// ==UserScript==
// @name                中大粵音字庫Safari播放插件
// @name:en             Disable YouTube AutoPause
// @name:zh-TW          中大粵音字庫Safari播放插件
// @name:zh-HK          中大粵音字庫Safari播放插件
// @version             2023.01a
// @license             MIT License
// @description         Resolving the issue of Safai no being able to play the audio files in the CUHK cantonese data base
// @description:en      Resolving the issue of Safai no being able to play the audio files in the CUHK cantonese data base
// @description:zh-TW    解決Safari無法播放中大粵語審音配詞字庫的問題
// @description:zh-HK   解決Safari無法播放中大粵語審音配詞字庫的問題
// @author              Peter Wan
// @match               https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/*
// @run-at              document-start
// @unwrap
// @allFrames
// @inject-into page
// ==/UserScript==

/* jshint esversion:8 */
var elements = window.frames['main'].document.getElementsByTagName("a");//gets all "a" tag in the "main" frame
var words = [];//initially though to be a solution to call the audio tag (playing it)
//the function i though would be enough which was not true as frames were involved. this function create the audio tag which is directly linked to the audio file. 
//the funciton allows users to play the audio by clicking "a" 
function Checking(array) {
    if(array.href.includes("sound.php?s=")){
    var tem = array.href.replace("sound.php?s=", "sound/");
    var id = tem.replace("https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/sound/", "");
    words.push(id);
    var url = tem+'.wav';
    var sound      = document.createElement('audio');
    sound.id       = 'audio-player-' + id;
    sound.removeAttribute('autoplay');
    sound.src      = url;
    sound.type     = 'audio/wavx';
    sound.style.display = "none";
    array.appendChild(sound);
    array.setAttribute('onclick', 'document.getElementById(\"audio-player-'+id+'\").play()');
  }}
//Reload the plugin by keeps calling the "Checking" function
function Reloading(){
    elements = window.frames['main'].document.getElementsByTagName("a");
    words = [];
    for (i = 0; i<elements.length; i++){
        Checking(elements[i]);
    }
}
//checking the reload of the frame by seaching for the audio tag being create, if it does not exist, it will keeps calling Reloading funciton which reloads the plugin
function checkForReload() {
    var eleExists = window.frames['main'].document.getElementsByTagName("audio");
    if (eleExists.length == 0){
       Reloading();
    }
}
const test = setInterval(checkForReload, 1000); // setting up interval for checking the reload of the frame