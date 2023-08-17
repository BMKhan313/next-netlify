import { render, screen, cleanup,fireEvent,act } from '@testing-library/react'
import "@testing-library/jest-dom";
import CredDashboard from '@/components/cred-dashbaord/page';
import { checkProps } from '../../TestUtils'; 

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
})

describe("CredDashboard Component", () => {
window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<CredDashboard  {...props}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(CredDashboard, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render CredDashboard component", () => {
      const main = testComponent.queryAllByTestId("creddashboard")
      expect(main.length).toBe(1)
    })
  })

  describe("Rendering table", () => {
          it("Should Render table component", () => {
            const main = testComponent.queryAllByTestId("table")
            expect(main.length).toBe(1)
          })
        })
})



