import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

export class ResizeObserverMock {
    static instances: ResizeObserverMock[] = []

    callback: ResizeObserverCallback
    element: Element | null = null

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
        ResizeObserverMock.instances.push(this)
    }

    observe = vi.fn((element: Element) => {
        this.element = element
    })

    disconnect = vi.fn()
    unobserve = vi.fn()

    trigger(height: number) {
        vi.spyOn(this.element!, "getBoundingClientRect").mockReturnValue({
            height,
        } as DOMRect)

        this.callback(
            [
                {
                    target: this.element!,
                    contentRect: {
                        height,
                    },
                } as ResizeObserverEntry,
            ],
            this as unknown as ResizeObserver
        )
    }
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock)

beforeEach(() => {
    ResizeObserverMock.instances = []
})