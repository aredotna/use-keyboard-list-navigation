/// <reference types="react" />
export declare type UseKeyboardListNavigationAction = {
    type: "RESET";
} | {
    type: "INTERACT";
} | {
    type: "PREV";
} | {
    type: "NEXT";
} | {
    type: "FIRST";
} | {
    type: "LAST";
} | {
    type: "SET";
    payload: {
        cursor?: number;
        interactive?: boolean;
    };
};
export declare type UseKeyboardListNavigationState = {
    cursor: number;
    length: number;
    interactive: boolean;
};
export declare type UseKeyboardListNavigationProps<T> = {
    ref?: React.MutableRefObject<any>;
    list: T[];
    waitForInteractive?: boolean;
    defaultValue?: T;
    bindAxis?: "vertical" | "horizontal" | "both";
    onEnter({ event, element, state, index, }: {
        event: KeyboardEvent;
        element: T;
        state: UseKeyboardListNavigationState;
        index: number;
    }): void;
    extractValue?(item: T): string;
};
export declare const useKeyboardListNavigation: <T>({ ref, list, waitForInteractive, defaultValue, bindAxis, onEnter, extractValue, }: UseKeyboardListNavigationProps<T>) => {
    index: number;
    selected: T;
    reset: () => void;
    set: (payload: {
        cursor?: number;
        interactive?: boolean;
    }) => void;
    cursor: number;
    length: number;
    interactive: boolean;
};
