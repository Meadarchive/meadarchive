import React from "react";
import { render, fireEvent, screen } from "../test-utils";
import Calculator from "../../src/components/calculator/Calculator";
import '@testing-library/jest-dom';
import '@types/jest';

describe("Calculator Component", () => {
	it("renders the calculator title", () => {
		render(<Calculator />);
		const titleElement = screen.getByText("ABV from hydrometer");
		expect(titleElement).toBeInTheDocument();
	});

	it("calculates ABV correctly", () => {
		render(<Calculator />);
		const originalInput = screen.getByLabelText("Original Gravity:");
		const finalInput = screen.getByLabelText("Final Gravity:");

		fireEvent.change(originalInput, { target: { value: "1.050" } });
		fireEvent.change(finalInput, { target: { value: "1.010" } });

		const abvText = screen.getByText("The ABV of your brew is 5.25%");
		expect(abvText).toBeInTheDocument();
	});

	it("displays error when final gravity is greater than original gravity", () => {
		render(<Calculator />);
		const originalInput = screen.getByLabelText("Original Gravity:");
		const finalInput = screen.getByLabelText("Final Gravity:");

		fireEvent.change(originalInput, { target: { value: "1.040" } });
		fireEvent.change(finalInput, { target: { value: "1.050" } });

		const errorText = screen.getByText(
			"Final gravity must be less than original gravity"
		);
		expect(errorText).toBeInTheDocument();
	});

	it("displays error for invalid gravity values", () => {
		render(<Calculator />);
		const originalInput = screen.getByLabelText("Original Gravity:");
		const finalInput = screen.getByLabelText("Final Gravity:");

		fireEvent.change(originalInput, { target: { value: "2.5" } });
		fireEvent.change(finalInput, { target: { value: "0.8" } });

		const errorText = screen.getByText("Gravity must be between 0.9 and 2");
		expect(errorText).toBeInTheDocument();
	});

	it("handles gravity input change correctly", () => {
		render(<Calculator />);
		const originalInput: HTMLInputElement | null = screen.getByLabelText(
			"Original Gravity:"
		) as HTMLInputElement;
		const finalInput: HTMLInputElement | null = screen.getByLabelText(
			"Final Gravity:"
		) as HTMLInputElement;

		fireEvent.change(originalInput, { target: { value: "1.050" } });
		fireEvent.change(finalInput, { target: { value: "abc" } });

		expect(originalInput.value).toBe("1.050");
		expect(finalInput.value).toBe("1.0");
	});
});
