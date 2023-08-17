import { render, screen ,cleanup,fireEvent,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPassword from '@/components/recover/page';
import { checkProps } from '../../TestUtils'; 


describe("checking Rendering ", ()=>{
 window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<ResetPassword  {...props}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(ResetPassword, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render ResetPassword component", () => {
      const main = testComponent.queryAllByTestId("resetpassword")
      expect(main.length).toBe(1)
    })
  })
})


describe("ResetPassword", () => {

  test('render username input', () => {
    render(<ResetPassword />);
 
    const inputEl = screen.getByTestId("username");
    expect(inputEl).toBeInTheDocument();
    // expect(inputEl).toHaveAttribute("type", "email");
  });
 
  test('pass valid username to test username input field', () => {
    render(<ResetPassword />);
 
    const inputEl = screen.getByTestId("username");
    userEvent.type(inputEl, "test@gmail.com");
 
    expect(screen.getByTestId("username")).toHaveValue("test@gmail.com");
    expect(screen.queryByTestId("errormsg")).not.toBeInTheDocument();
  })

})
