
var highest_z_index = -999;

$("*").each(function () {
    var current = parseInt($(this).css("z-index"), 10);
    if (current && highest_z_index < current) {
        highest_z_index = current;
    }
});

$.contextMenu({
    selector: 'body',
    zIndex: highest_z_index + 3,
    callback: function (key, options) {
        var m = "clicked: " + key;
        //window.console && console.log(m) || alert(m); 
    },
    items: {
        "tts": {name: "Text to Speech", icon: ""},
        "translation": {name: "Translation", icon: ""},
        "wikipedia": {name: "Wikipedia", icon: ""},
        "dictionary": {name: "Dictionary", icon: ""},
        "readable_view": {name: "Readable View", icon: ""},
        "sep1": "---------",
        "quit": {name: "Quit", icon: function () {
                return '<i class="fa fa-star"></i>';
            }}
    }
});

var url_icon = chrome.extension.getURL('/img/icon.png');
var url_close = chrome.extension.getURL('/img/close.png');
var url_toolbar = chrome.extension.getURL('/img/toolbar.png');
var url_dict = chrome.extension.getURL('/img/dict.png');
var url_dict_disabled = chrome.extension.getURL('/img/dict-disabled.png');
var url_reader = chrome.extension.getURL('/img/reader-mode.png');
var url_wiki = chrome.extension.getURL('/img/wiki.png');
var url_wiki_disabled = chrome.extension.getURL('/img/wiki-disabled.png');
var url_tts = chrome.extension.getURL('/img/tts.png');
var url_tts_disabled = chrome.extension.getURL('/img/tts-disabled.png');
var url_bookmark = chrome.extension.getURL('/img/bookmark.png');
var url_pin = chrome.extension.getURL('/img/pin.png');
var url_settings = chrome.extension.getURL('/img/settings.png');

var btn_close = '<button id="enaebl-btn-close" type="button" class="enaebl-btn enabled" data-toggle="toggle" data-target="#enaebl-toolbar"></button>';
var btn_dict = '<button id="enaebl-btn-dict" type="button" data-toggle="tooltip" data-placement="top" title="Dictionary" class="enaebl-btn enabled"></button>';
var btn_wiki = '<button id="enaebl-btn-wiki" type="button" data-toggle="tooltip" data-placement="top" title="Wikipedia" class="enaebl-btn enabled"></button>';
var btn_tts = '<button id="enaebl-btn-tts" type="button" data-toggle="tooltip" data-placement="top" title="Text to Speech" class="enaebl-btn enabled"></button>';
var btn_reader = '<button id="enaebl-btn-reader" type="button" data-toggle="tooltip" data-placement="top" title="Reader Mode" class="enaebl-btn enabled"></button>';
var btn_bookmark = '<button id="enaebl-btn-bookmark" type="button" data-toggle="tooltip" data-placement="top" title="Bookmark URL" class="enaebl-btn enabled"></button>';
var btn_pin = '<button id="enaebl-btn-pin" type="button" data-toggle="tooltip" data-placement="top" title="Pin URL" class="enaebl-btn enabled"></button>';
var btn_settings = '<button id="enaebl-btn-settings" type="button" data-toggle="tooltip" data-placement="top" title="Settings" class="enaebl-btn enabled"></button>';

var collapsible_toolbar = '<div id="enaebl-collapsible-toolbar" style="z-index:' + (highest_z_index + 1) + ';"><a id="collapsible-enaebl-btn" data-toggle="toggle" data-target="#enaebl-toolbar" style="float: right; z-index:' + (highest_z_index + 3) + '; cursor: pointer;"><img src="' + url_icon + '" style="border-radius: 50%;" /></a><div id="enaebl-toolbar" style="float: right; z-index:' + (highest_z_index + 2) + ';">' + btn_close + btn_dict + btn_wiki + btn_tts + btn_reader + btn_bookmark + btn_pin + btn_settings + '</div></div>';
var styles = '<style>#enaebl-toolbar {background: url(' + url_toolbar + ') no-repeat;}#enaebl-btn-close {background: url(' + url_close + ') no-repeat;}#enaebl-btn-dict {background: url(' + url_dict + ') no-repeat;}#enaebl-btn-dict.disabled {background: url(' + url_dict_disabled + ') no-repeat;}#enaebl-btn-wiki {background: url(' + url_wiki + ') no-repeat;}#enaebl-btn-wiki.disabled {background: url(' + url_wiki_disabled + ') no-repeat;}#enaebl-btn-tts {background: url(' + url_tts + ') no-repeat;}#enaebl-btn-tts.disabled {background: url(' + url_tts_disabled + ') no-repeat;}#enaebl-btn-reader {background: url(' + url_reader + ') no-repeat;}#enaebl-btn-bookmark {background: url(' + url_bookmark + ') no-repeat;}#enaebl-btn-pin {background: url(' + url_pin + ') no-repeat;}#enaebl-btn-settings {background: url(' + url_settings + ') no-repeat;}</style>';
$('head').append(styles);
$('body').prepend('<div class="msg-div" style="display: none;"></div>');
$('body').append(collapsible_toolbar);

function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea") || (activeElTagName == "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

function playText() {
    var selection = getSelectionText().trim();
    chrome.runtime.sendMessage({msgType: 'tts', text: selection}, function () {
		
    });
}

function openInNewWindow(url) {
    var text = getSelectionText();
    var win = window.open(url + text, '_blank');
    win.focus();
}

$('#enaebl-btn-dict').on('click', function () {
    if ($(this).hasClass('enabled')) {
        openInNewWindow('http://www.logosdictionary.org/index.php?phrase=');
    }
});

$('#enaebl-btn-wiki').on('click', function () {
    if ($(this).hasClass('enabled')) {
        openInNewWindow('https://en.wikipedia.org/w/index.php?search=');
    }
});

$('#enaebl-btn-tts').on('click', function () {
    if ($(this).hasClass('enabled')) {
        playText();
    }
});

$('*').on('click', function () {
    var text = getSelectionText().trim();
    if (text) {
        if (text.indexOf(' ') === -1) {
            $('#enaebl-btn-dict').removeClass('disabled').addClass('enabled');
        }
        $('#enaebl-btn-wiki, #enaebl-btn-tts').removeClass('disabled').addClass('enabled');
    } else {
        $('#enaebl-btn-dict, #enaebl-btn-wiki, #enaebl-btn-tts').removeClass('enabled').addClass('disabled');
    }
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
