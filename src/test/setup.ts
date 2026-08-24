import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

export class ResizeObserverMock {
    static instances: ResizeObserverMock[] = []

    callback: ResizeObserverCallback

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
        ResizeObserverMock.instances.push(this)
    }

    observe = vi.fn()
    disconnect = vi.fn()
    unobserve = vi.fn()

    trigger(height: number) {
        this.callback(
            [
                {
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