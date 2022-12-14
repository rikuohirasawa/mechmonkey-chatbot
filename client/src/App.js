"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.App = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var react_2 = require("react");
var ChatBotToggleBtn_1 = require("./chatBotToggle/ChatBotToggleBtn");
var chatbot_icon_svg_1 = require("./imgs/chatbot-icon.svg");
var introMessage = {
    greeting: 'Hi there, thanks for visiting MechMonkey! Please select one of the options below, or chat with me if you have any questions.',
    options: ['Pricing', 'Launch date', 'Book a meeting', 'Talk to a live agent']
};
var App = function () {
    var _a = (0, react_2.useState)(''), input = _a[0], setInput = _a[1];
    var _b = (0, react_2.useState)([]), chatData = _b[0], setChatData = _b[1];
    var chatRef = (0, react_2.useRef)([]);
    // useEffect(()=>{
    //   fetch('http://localhost:8000/test')
    //   .then(res=>{
    //     console.log(res)
    //     res.json()})
    //   .then(data=>{
    //     console.log(data)
    //   })
    // }, [])
    var onClickOption = function (e, option) {
        e.preventDefault();
        fetch("http://localhost:8000/options?option=".concat(option))
            .then(function (res) {
            console.log(res);
            return res.json();
        }).then(function (data) {
            setChatData(__spreadArray(__spreadArray([], chatData, true), [data], false));
            console.log(data);
        });
    };
    var onSubmit = function (e) {
        e.preventDefault();
        var userMessage = {
            sentBy: 'user',
            content: input
        };
        // input !== '' && setChatData([...chatData, userMessage])
        // useRef used here, as react batches state updates in event handlers, thus if i were to add to setstate fxs
        // in one event handler, they would be batched together, meaning only the final one would be run.
        if (input !== '') {
            input !== '' && chatRef.current.push(userMessage);
            fetch('http://localhost:8000/user-msg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(userMessage)
            }).then(function (res) {
                console.log(res);
                return res.json();
            })
                .then(function (data) {
                chatRef.current.push(data);
                setChatData(chatRef.current);
                setInput('');
                // setChatData([...chatData, data])
            })["catch"](function (err) {
                setInput('');
                window.alert(err);
            });
        }
        else {
            window.alert('input something');
        }
    };
    var onChange = function (e) {
        setInput(e.target.value);
        console.log(input);
    };
    var onClickButton = function (e) {
        e.preventDefault();
    };
    return (react_1["default"].createElement(Wrapper, null,
        react_1["default"].createElement("div", { className: 'header-icon-container' },
            react_1["default"].createElement("h1", null, "chatti"),
            react_1["default"].createElement("img", { src: chatbot_icon_svg_1["default"], style: { filter: 'invert(34%) sepia(51%) saturate(2877%) hue-rotate(355deg) brightness(103%) contrast(97%)', height: '40px' } })),
        react_1["default"].createElement("form", { onSubmit: function (e) { return onSubmit(e); }, name: 'chat-bot' },
            react_1["default"].createElement("div", { id: 'msg-container' },
                react_1["default"].createElement(ChatBubble, { sentBy: 'default' }, introMessage.greeting),
                react_1["default"].createElement("div", { className: 'options-grid' }, introMessage.options.map(function (el) {
                    return react_1["default"].createElement(OptionButton, { onClick: function (e) { return onClickOption(e, el); } }, el);
                })),
                chatData.length > 0 &&
                    chatData.map(function (e) {
                        return (react_1["default"].createElement(ChatBubble, { sentBy: e.sentBy }, e.content));
                    })),
            react_1["default"].createElement("div", { className: 'input-container' },
                react_1["default"].createElement("input", { type: 'text', name: 'message', onChange: function (e) { onChange(e); }, value: input }),
                react_1["default"].createElement("button", { type: 'submit' }, "Send"))),
        react_1["default"].createElement(ChatBotToggleBtn_1.ChatBotToggleBtn, null)));
};
exports.App = App;
exports["default"] = exports.App;
var Wrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 16px;\n  width: 600px;\n  margin: 0 auto;\n  background-color: var(--mm-black);\n  padding: 18px;\n  \n  .header-icon-container {\n    display: flex;\n    gap: 16px;\n    padding: 8px;\n  }\n\nform {\n  width: 100%;\n}\n#msg-container {\n  height: 500px;\n  border: 1px solid;\n  border-bottom: none;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  padding: 16px 0;\n  overflow-y: auto;\n  width: 100%;\n}\n\n.options-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  justify-content: center;\n  align-items: end;\n  margin: 0 0 4px 16px;\n  max-width: 80%;\n  gap: 3px;\n}\n\n  .input-container {\n    display: flex;\n    height: 30px;\n  }\n  input {\n    width: 100%;\n    height: 100%;\n  }\n"], ["\n  border-radius: 16px;\n  width: 600px;\n  margin: 0 auto;\n  background-color: var(--mm-black);\n  padding: 18px;\n  \n  .header-icon-container {\n    display: flex;\n    gap: 16px;\n    padding: 8px;\n  }\n\nform {\n  width: 100%;\n}\n#msg-container {\n  height: 500px;\n  border: 1px solid;\n  border-bottom: none;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  padding: 16px 0;\n  overflow-y: auto;\n  width: 100%;\n}\n\n.options-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  justify-content: center;\n  align-items: end;\n  margin: 0 0 4px 16px;\n  max-width: 80%;\n  gap: 3px;\n}\n\n  .input-container {\n    display: flex;\n    height: 30px;\n  }\n  input {\n    width: 100%;\n    height: 100%;\n  }\n"])));
var ChatBubble = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n  align-self:", ";\n  margin: ", ";\n  padding: 8px;\n  border-radius: 8px;\n  max-width: 80%;\n"], ["\n  background-color: ", ";\n  color: ", ";\n  align-self:", ";\n  margin: ", ";\n  padding: 8px;\n  border-radius: 8px;\n  max-width: 80%;\n"])), function (props) { return props.sentBy === 'user' ? 'var(--mm-light-blue)' : 'var(--mm-orange)'; }, function (props) { return props.sentBy === 'user' ? 'var(--mm-black)' : 'var(--mm-white)'; }, function (props) { return props.sentBy === 'user' ? 'flex-end' : 'flex-start'; }, function (props) { return props.sentBy === 'user' ? '0 16px 0 0' : '0 0 4px 16px'; });
var OptionButton = styled_components_1["default"].button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: var(--mm-orange);\n  color: var(--mm-white);\n  border: none;\n  font-size: inherit;\n  font-family: inherit;\n  border-radius: 8px;\n  height: 40px;\n  cursor: pointer;\n  transition: all 0.1s ease-in-out;\n\n  &:hover {\n    transform: scale(1.02);\n    background-color: var(--mm-black);\n    color: var(--mm-orange);\n    border: 1px solid var(--mm-orange);\n  }\n"], ["\n  background-color: var(--mm-orange);\n  color: var(--mm-white);\n  border: none;\n  font-size: inherit;\n  font-family: inherit;\n  border-radius: 8px;\n  height: 40px;\n  cursor: pointer;\n  transition: all 0.1s ease-in-out;\n\n  &:hover {\n    transform: scale(1.02);\n    background-color: var(--mm-black);\n    color: var(--mm-orange);\n    border: 1px solid var(--mm-orange);\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
