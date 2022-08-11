"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_hooks_1 = require("@testing-library/react-hooks");
var react_1 = require("@testing-library/react");
var useKeyboardListNavigation_1 = require("./useKeyboardListNavigation");
var react_2 = require("react");
jest.useFakeTimers();
describe("useKeyboardListNavigation", function () {
    var list = ["first", "second", "third", "fourth"];
    var noop = function () { };
    it("selects the first element", function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
    });
    it("selects the defaultValue by default", function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, defaultValue: "second", onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(1);
        expect(result.current.index).toBe(1);
        expect(result.current.selected).toBe("second");
    });
    it('selects the second element when the "ArrowDown" key is pressed', function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
        });
        expect(result.current.cursor).toBe(1);
        expect(result.current.index).toBe(1);
        expect(result.current.selected).toBe("second");
    });
    it('selects the third element when the "ArrowDown" key is pressed twice', function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
        });
        expect(result.current.cursor).toBe(2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
    });
    it('selects the last element when the "ArrowUp" key is pressed initially', function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowUp" });
        });
        expect(result.current.cursor).toBe(-1);
        expect(result.current.index).toBe(3);
        expect(result.current.selected).toBe("fourth");
    });
    it('selects the last element when the "End" key is pressed no matter where in the list one is', function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "End" });
        });
        expect(result.current.cursor).toBe(3);
        expect(result.current.index).toBe(3);
        expect(result.current.selected).toBe("fourth");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowUp" });
            react_1.fireEvent.keyDown(window, { key: "ArrowUp" });
        });
        expect(result.current.cursor).toBe(1);
        expect(result.current.index).toBe(1);
        expect(result.current.selected).toBe("second");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "End" });
        });
        expect(result.current.cursor).toBe(3);
        expect(result.current.index).toBe(3);
        expect(result.current.selected).toBe("fourth");
    });
    it('selects the first element when the "Home" key is pressed no matter where in the list one is', function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({
                list: list,
                onEnter: noop,
                waitForInteractive: true,
            });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(-1);
        expect(result.current.selected).toBeUndefined();
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "Home" });
        });
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowUp" });
            react_1.fireEvent.keyDown(window, { key: "ArrowUp" });
        });
        expect(result.current.cursor).toBe(-2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "Home" });
        });
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
    });
    it("selects the third item when the t key is pressed; then narrows down into the fifth once more is typed", function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({
                list: ["first", "second", "third", "fourth", "thirteenth"],
                onEnter: noop,
            });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "t" });
        });
        expect(result.current.cursor).toBe(2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "h" });
            react_1.fireEvent.keyDown(window, { key: "i" });
            react_1.fireEvent.keyDown(window, { key: "r" });
        });
        expect(result.current.cursor).toBe(2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "t" });
        });
        expect(result.current.cursor).toBe(4);
        expect(result.current.index).toBe(4);
        expect(result.current.selected).toBe("thirteenth");
    });
    it("selects the third item when the t key is pressed; after one second, selects the second item when the s key is pressed", function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({
                list: list,
                onEnter: noop,
            });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "t" });
        });
        jest.runAllTimers();
        expect(result.current.cursor).toBe(2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "s" });
        });
        expect(result.current.cursor).toBe(1);
        expect(result.current.index).toBe(1);
        expect(result.current.selected).toBe("second");
    });
    it('calls `onEnter` with the selected items when the "Enter" key is pressed', function () {
        var onEnter = jest.fn();
        (0, react_hooks_1.renderHook)(function () { return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: onEnter }); });
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "Enter" });
        });
        expect(onEnter).toBeCalledTimes(1);
        expect(onEnter).toHaveBeenCalledWith({
            element: "first",
            event: expect.anything(),
            index: 0,
            state: { cursor: 0, interactive: false, length: 4 },
        });
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
        });
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "Enter" });
        });
        expect(onEnter).toBeCalledTimes(2);
        expect(onEnter).toHaveBeenLastCalledWith({
            element: "third",
            event: expect.anything(),
            index: 2,
            state: { cursor: 2, interactive: true, length: 4 },
        });
    });
    it("supports a focusable ref", function () {
        var div = document.createElement("div");
        var result = (0, react_hooks_1.renderHook)(function () {
            var ref = (0, react_2.useRef)(div);
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, ref: ref, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
        });
        expect(result.current.cursor).toBe(0);
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(div, { key: "ArrowDown" });
        });
        expect(result.current.cursor).toBe(1);
    });
    describe("waitForInteractive", function () {
        it("returns an invalid index until some interaction takes place", function () {
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({
                    list: list,
                    onEnter: noop,
                    waitForInteractive: true,
                });
            }).result;
            expect(result.current.cursor).toBe(0);
            expect(result.current.index).toBe(-1);
            expect(result.current.selected).toBeUndefined();
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
            });
            expect(result.current.cursor).toBe(0);
            expect(result.current.index).toBe(0);
            expect(result.current.selected).toEqual("first");
        });
        it("does not trigger `onEnter` if no interaction has taken place", function () {
            var onEnter = jest.fn();
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: onEnter, waitForInteractive: true });
            }).result;
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "Enter" });
            });
            expect(onEnter).toBeCalledTimes(0);
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
            });
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "Enter" });
            });
            expect(onEnter).toBeCalledTimes(1);
        });
    });
    describe("bindAxis", function () {
        it("supports the horizontal axis", function () {
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({
                    list: list,
                    onEnter: noop,
                    bindAxis: "horizontal",
                });
            }).result;
            expect(result.current.cursor).toBe(0);
            expect(result.current.index).toBe(0);
            expect(result.current.selected).toBe("first");
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "ArrowRight" });
            });
            expect(result.current.cursor).toBe(1);
            expect(result.current.index).toBe(1);
            expect(result.current.selected).toBe("second");
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "ArrowLeft" });
            });
            expect(result.current.cursor).toBe(0);
            expect(result.current.index).toBe(0);
            expect(result.current.selected).toBe("first");
        });
        it("supports both axes", function () {
            var result = (0, react_hooks_1.renderHook)(function () {
                return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({
                    list: list,
                    onEnter: noop,
                    bindAxis: "both",
                });
            }).result;
            expect(result.current.cursor).toBe(0);
            expect(result.current.index).toBe(0);
            expect(result.current.selected).toBe("first");
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "ArrowRight" });
            });
            expect(result.current.cursor).toBe(1);
            expect(result.current.index).toBe(1);
            expect(result.current.selected).toBe("second");
            (0, react_hooks_1.act)(function () {
                react_1.fireEvent.keyDown(window, { key: "ArrowUp" });
            });
            expect(result.current.cursor).toBe(0);
            expect(result.current.index).toBe(0);
            expect(result.current.selected).toBe("first");
        });
    });
    it("exposes a reset function that resets the state", function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
            react_1.fireEvent.keyDown(window, { key: "ArrowDown" });
        });
        expect(result.current.cursor).toBe(2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
        (0, react_hooks_1.act)(function () {
            result.current.reset();
        });
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
    });
    it("exposes a set function that allows for updating the cursor manually", function () {
        var result = (0, react_hooks_1.renderHook)(function () {
            return (0, useKeyboardListNavigation_1.useKeyboardListNavigation)({ list: list, onEnter: noop });
        }).result;
        expect(result.current.cursor).toBe(0);
        expect(result.current.index).toBe(0);
        expect(result.current.selected).toBe("first");
        (0, react_hooks_1.act)(function () {
            result.current.set({ cursor: 2 });
        });
        expect(result.current.cursor).toBe(2);
        expect(result.current.index).toBe(2);
        expect(result.current.selected).toBe("third");
        (0, react_hooks_1.act)(function () {
            result.current.set({ cursor: -1 });
        });
        expect(result.current.cursor).toBe(-1);
        expect(result.current.index).toBe(3);
        expect(result.current.selected).toBe("fourth");
    });
});
