"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboardListNavigation = void 0;
var react_1 = require("react");
var map_cursor_to_max_1 = require("map-cursor-to-max");
var reducer = function (defaults) {
    return function (state, action) {
        switch (action.type) {
            case "RESET":
                return __assign(__assign({}, state), { interactive: false, cursor: defaults.cursor });
            case "INTERACT":
                return __assign(__assign({}, state), { interactive: true });
            case "PREV":
                return __assign(__assign({}, state), { cursor: state.cursor - 1, interactive: true });
            case "NEXT":
                return __assign(__assign({}, state), { cursor: state.cursor + 1, interactive: true });
            case "FIRST":
                return __assign(__assign({}, state), { cursor: 0, interactive: true });
            case "LAST":
                return __assign(__assign({}, state), { cursor: state.length - 1, interactive: true });
            case "SET":
                return __assign(__assign({}, state), action.payload);
        }
    };
};
var IDLE_TIMEOUT_MS = 1000;
var useKeyboardListNavigation = function (_a) {
    var ref = _a.ref, list = _a.list, _b = _a.waitForInteractive, waitForInteractive = _b === void 0 ? false : _b, defaultValue = _a.defaultValue, _c = _a.bindAxis, bindAxis = _c === void 0 ? "vertical" : _c, onEnter = _a.onEnter, _d = _a.extractValue, extractValue = _d === void 0 ? function (item) { return (typeof item === "string" ? item.toLowerCase() : ""); } : _d;
    var defaultCursor = defaultValue ? list.indexOf(defaultValue) : 0;
    var _e = (0, react_1.useReducer)(reducer({ cursor: defaultCursor }), {
        cursor: defaultCursor,
        length: list.length,
        interactive: false,
    }), state = _e[0], dispatch = _e[1];
    var searchTerm = (0, react_1.useRef)("");
    var idleTimeout = (0, react_1.useRef)(null);
    var index = (0, map_cursor_to_max_1.mapCursorToMax)(state.cursor, list.length);
    var handleKeyDown = (0, react_1.useCallback)(function (event) {
        var handleUp = function () {
            event.preventDefault();
            return dispatch({ type: "PREV" });
        };
        var handleDown = function () {
            event.preventDefault();
            if (waitForInteractive && !state.interactive) {
                return dispatch({ type: "INTERACT" });
            }
            return dispatch({ type: "NEXT" });
        };
        switch (event.key) {
            case "ArrowUp": {
                if (bindAxis === "horizontal")
                    return;
                return handleUp();
            }
            case "ArrowDown": {
                if (bindAxis === "horizontal")
                    return;
                return handleDown();
            }
            case "ArrowLeft": {
                if (bindAxis === "vertical")
                    return;
                return handleUp();
            }
            case "ArrowRight": {
                if (bindAxis === "vertical")
                    return;
                return handleDown();
            }
            case "Enter": {
                return onEnter({ event: event, element: list[index], state: state, index: index });
            }
            case "Home": {
                return dispatch({ type: "FIRST" });
            }
            case "End": {
                return dispatch({ type: "LAST" });
            }
            default:
                // Set focus based on search term
                if (/^[a-z0-9_-]$/i.test(event.key)) {
                    searchTerm.current = "".concat(searchTerm.current).concat(event.key);
                    var node = list.find(function (item) {
                        return extractValue(item).startsWith(searchTerm.current);
                    });
                    if (node) {
                        dispatch({
                            type: "SET",
                            payload: { cursor: list.indexOf(node) },
                        });
                    }
                    if (idleTimeout.current)
                        clearTimeout(idleTimeout.current);
                    idleTimeout.current = setTimeout(function () {
                        searchTerm.current = "";
                    }, IDLE_TIMEOUT_MS);
                }
                break;
        }
    }, [index, list, onEnter, state, waitForInteractive, extractValue]);
    (0, react_1.useEffect)(function () {
        var _a;
        var el = (_a = ref === null || ref === void 0 ? void 0 : ref.current) !== null && _a !== void 0 ? _a : window;
        el.addEventListener("keydown", handleKeyDown);
        return function () {
            el.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown, ref, idleTimeout]);
    (0, react_1.useEffect)(function () { return dispatch({ type: "RESET" }); }, [list.length]);
    var interactiveIndex = waitForInteractive && !state.interactive ? -1 : index;
    var reset = (0, react_1.useCallback)(function () {
        dispatch({ type: "RESET" });
    }, []);
    var set = (0, react_1.useCallback)(function (payload) {
        dispatch({ type: "SET", payload: payload });
    }, []);
    return __assign(__assign({}, state), { index: interactiveIndex, selected: list[interactiveIndex], reset: reset, set: set });
};
exports.useKeyboardListNavigation = useKeyboardListNavigation;
