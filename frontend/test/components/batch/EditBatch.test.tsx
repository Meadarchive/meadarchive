// React needs to be in scope for tests to pass, but that makes ts complain
// @ts-ignore
import React from "react"; 
import { render } from "../../test-utils";
import Edit from "../../../src/components/batch/Edit";
import '@testing-library/jest-dom';

describe("edit batch", () => {
	it('renders', () => {
		render(<Edit />)
	})
});
