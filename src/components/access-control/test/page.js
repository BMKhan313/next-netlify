import { render, screen, cleanup,fireEvent,act } from '@testing-library/react'
import "@testing-library/jest-dom";
import AccessControl from '@/components/access-control/page';
import React, { useState as useStateMock } from 'react';
import { checkProps } from '../../TestUtils'; 

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})


describe("AccessControl Component", () => {
window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<AccessControl  {...props}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(AccessControl, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render AccessControl component", () => {
      const main = testComponent.queryAllByTestId("accesscontrol")
      expect(main.length).toBe(1)
    })
  })
})



