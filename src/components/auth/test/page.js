
import { render, screen ,cleanup,fireEvent,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from '@/components/auth/page'
import { checkProps } from '../../TestUtils'; 


describe("checking Rendering ", ()=>{
 window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<Auth  {...props}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(Auth, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render Auth component", () => {
      const main = testComponent.queryAllByTestId("auth")
      expect(main.length).toBe(1)
    })
  })
})


describe("Auth", () => {

  test('render username input', () => {
    render(<Auth />);
 
    const inputEl = screen.getByTestId("username");
    expect(inputEl).toBeInTheDocument();
    // expect(inputEl).toHaveAttribute("type", "email");
  });
 
  test('pass valid username to test username input field', () => {
    render(<Auth />);
 
    const inputEl = screen.getByTestId("username");
    userEvent.type(inputEl, "test@gmail.com");
 
    expect(screen.getByTestId("username")).toHaveValue("test@gmail.com");
    expect(screen.queryByTestId("errormsg")).not.toBeInTheDocument();
  })

  test('render password input', () => {
    render(<Auth />);
 
    const inputEl = screen.getByTestId("password");
    expect(inputEl).toBeInTheDocument();
    // expect(inputEl).toHaveAttribute("type", "email");
  });

  test('pass valid password to test password input field', () => {
    render(<Auth />);
 
    const inputEl = screen.getByTestId("password");
    userEvent.type(inputEl, "test@123");
 
    expect(screen.getByTestId("password")).toHaveValue("test@123");
    expect(screen.queryByTestId("errormsg")).not.toBeInTheDocument();
  })
  


})