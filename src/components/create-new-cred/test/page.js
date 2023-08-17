import { render, screen, cleanup,fireEvent,act } from '@testing-library/react'
import "@testing-library/jest-dom";
import CreateNewCred from '@/components/create-new-cred/page';
import React, { useState as useStateMock } from 'react';
import { checkProps } from '../../TestUtils'; 

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})


describe("CreateNewCred Component", () => {
window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<CreateNewCred  {...props}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(CreateNewCred, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render CreateNewCred component", () => {
      const main = testComponent.queryAllByTestId("createnewcred")
      expect(main.length).toBe(1)
    })
  })
})



