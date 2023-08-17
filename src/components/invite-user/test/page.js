
import { render, screen ,cleanup,fireEvent,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InviteUser from '@/components/invite-user/page';
import { checkProps } from '../../TestUtils'; 


describe("checking Rendering ", ()=>{
 window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<InviteUser  {...props}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(InviteUser, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render InviteUser component", () => {
      const main = testComponent.queryAllByTestId("inviteuser")
      expect(main.length).toBe(1)
    })
  })
})


describe("InviteUser", () => {

  test('render username input', () => {
    render(<InviteUser />);
 
    const inputEl = screen.getByTestId("username");
    expect(inputEl).toBeInTheDocument();
  });
 
  test('pass valid username to test username input field', () => {
    render(<InviteUser />);
 
    const inputEl = screen.getByTestId("username");
    userEvent.type(inputEl, "test@gmail.com");
 
    expect(screen.getByTestId("username")).toHaveValue("test@gmail.com");
    expect(screen.queryByTestId("errormsg")).not.toBeInTheDocument();
  })

})