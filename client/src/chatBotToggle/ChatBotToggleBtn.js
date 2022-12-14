"use strict";
exports.__esModule = true;
exports.ChatBotToggleBtn = void 0;
var React = require("react");
var chatBotBtnStyles_1 = require("./chatBotBtnStyles");
var bs_1 = require("react-icons/bs");
var ChatBotToggleBtn = function () {
    return (React.createElement(chatBotBtnStyles_1.Wrapper, null,
        React.createElement(chatBotBtnStyles_1.ToggleBtn, null,
            React.createElement("span", { className: 'pos-abs' }, "Chat"),
            React.createElement(bs_1.BsChatFill, null))));
};
exports.ChatBotToggleBtn = ChatBotToggleBtn;
