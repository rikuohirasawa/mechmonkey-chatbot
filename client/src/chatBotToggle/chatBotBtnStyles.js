"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ToggleBtn = exports.Wrapper = void 0;
var styled_components_1 = require("styled-components");
exports.Wrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: none;"], ["\n    display: none;"])));
exports.ToggleBtn = styled_components_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: none;\n    position: relative;\n\n    .pos-abs {\n        position: absolute;\n        font-weight: 700;\n        font-size: 20px;\n    }\n\n\n"], ["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: none;\n    position: relative;\n\n    .pos-abs {\n        position: absolute;\n        font-weight: 700;\n        font-size: 20px;\n    }\n\n\n"])));
var templateObject_1, templateObject_2;
