import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import HintMessage from './HintMessage';

describe("HintMessage", () => {
    it("should render close message box", async () => {
        render(<HintMessage text='message text' title='message title' open={false} />);

        expect(screen.getByTestId("hint-message")).toHaveClass("close");
    });

    it("should render close message box", async () => {
        render(<HintMessage text='message text' title='message title' open={true} />);

        expect(screen.getByTestId("hint-message")).toHaveClass("open");
    });
});