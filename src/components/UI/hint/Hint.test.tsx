import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Hint from './Hint';

describe("Hint", () => {
    it("should toggle on Enter key", async () => {
        const setActive = vi.fn();
        const user = userEvent.setup();

        render(<Hint active={false} setActive={setActive} label="Hint" />);

        const button = screen.getByLabelText('Hint');
        await user.click(button);
        await user.keyboard('{Enter}');

        expect(setActive).toHaveBeenCalledWith(true);
    });

    it("should toggle on Space key", async () => {
        const setActive = vi.fn();
        const user = userEvent.setup();

        render(<Hint active={false} setActive={setActive} label="Hint" />);

        const button = screen.getByLabelText('Hint');
        await user.click(button);
        await user.keyboard('{ }');

        expect(setActive).toHaveBeenCalledWith(true);
    });

    it("should open on pointer enter", async () => {
        const setActive = vi.fn();
        const user = userEvent.setup();

        render(<Hint active={false} setActive={setActive} label="Hint" />);

        const button = screen.getByLabelText('Hint');
        await user.hover(button);

        expect(setActive).toHaveBeenCalledWith(true);
    });

    it("should close on pointer leave", async () => {
        const setActive = vi.fn();
        const user = userEvent.setup();

        render(<Hint active={true} setActive={setActive} label="Hint" />);

        const button = screen.getByLabelText('Hint');
        await user.hover(button);
        await user.unhover(button);

        expect(setActive).toHaveBeenCalledWith(false);
    });
});