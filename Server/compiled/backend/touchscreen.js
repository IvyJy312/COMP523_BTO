var _this = this;
exports.ws = null;
exports.busy = false;
var send = function (data) {
    var stuffToSend = { callback: String, args: Object };
    if (_this.ws) {
        if (data.callback) {
            stuffToSend.callback = data.callback.slice(data.callback.indexOf("{") + 1, data.callback.lastIndexOf("}"));
            if (data.args) {
                stuffToSend.args = data.args;
            }
        }
        _this.ws.send(JSON.stringify(stuffToSend));
        _this.busy = true;
    }
    else {
        console.log('touchscreen not connected');
    }
};
exports.updatePanel = function (buttonID, state) {
    var funct = function (buttonID, state) {
        var panel = document.getElementById('toolPanel');
        if (panel.childNodes[1] != null) {
            panel.removeChild(panel.childNodes[1]);
        }
        if (state.tools[buttonID].selected == true) {
            var div = document.createElement('div');
            var p = document.createTextNode('Price: $' + state.tools[buttonID].price);
            var newLine = document.createElement('br');
            div.className = 'info';
            var r = document.createTextNode('Impact Ratio: ' + state.tools[buttonID].ratio);
            panel.style.visibility = 'visible';
            div.appendChild(p);
            div.appendChild(newLine);
            div.appendChild(r);
            panel.appendChild(div);
        }
        send({ done: true });
    };
    var data = { callback: funct.toString(), args: { buttonID: buttonID, state: state } };
    send(data);
};
exports.toggleButtonSelected = function (buttonID, state) {
    var funct = function (buttonID, state) {
        document.getElementById(buttonID).style.backgroundColor = state ? '#7FFF00' : '#F5F5DC';
        send({ done: true });
    };
    var data = { callback: funct.toString(), args: { buttonID: buttonID, state: state } };
    send(data);
};
exports.toggleButtonVisibility = function (buttonID, state) {
    var funct = function (buttonID, state) {
        document.getElementById('' + buttonID).style.visibility = state ? 'visible' : 'hidden';
        send({ done: true });
    };
    var data = { callback: funct.toString(), args: { buttonID: buttonID, state: state } };
    send(data);
};
exports.showTools = function () {
    var funct = function () {
        document.getElementById('tools').style.visibility = 'visible';
        document.getElementById('outbreakTypes').style.visibility = 'hidden';
        send({ done: true });
    };
    var data = { callback: funct.toString(), args: {} };
    send(data);
};
exports.reset = function () {
    var funct = function (arg1, arg2) {
        var buttons = Array.prototype.slice.call(document.getElementsByTagName('button'));
        console.log(buttons);
        for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
            var button = buttons_1[_i];
            button.style.backgroundColor = "#F5F5DC";
        }
        document.getElementById('confirm').style.backgroundColor = "#F5F5DC";
        document.getElementById('confirm').style.visibility = 'hidden';
        send({ done: true });
    };
    var data = { callback: funct.toString(), args: {} };
    send(data);
};
//# sourceMappingURL=touchscreen.js.map