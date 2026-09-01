import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useElementHeight } from "./useElementHeight";
import { act } from "react";
import { ResizeObserverMock } from "../test/setup";

describe("useElementHeight", () => {
    it("returns height 0 initially", () => {
        const { result } = renderHook(() => useElementHeight<HTMLDivElement>())

        expect(result.current.height).toBe(0)
    })

    it("updates height when element size changes", () => {
        const { result } = renderHook(() => useElementHeight<HTMLDivElement>())

        const element = document.createElement("div")

        act(() => {
            result.current.ref(element)
        })

        const observer = ResizeObserverMock.instances[0]

        act(() => {
            observer.trigger(150)
        })

        expect(result.current.height).toBe(150)
    })

    it("disconnects observer when component unmounts", () => {
        const { result, unmount } =
            renderHook(() => useElementHeight<HTMLDivElement>())

        const element = document.createElement("div")

        act(() => {
            result.current.ref(element)
        })

        const observer = ResizeObserverMock.instances[0]

        unmount()

        expect(observer.disconnect).toHaveBeenCalled()
    })
})