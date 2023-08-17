import { render, screen ,cleanup,fireEvent,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmailPopup from '@/components/EmailPopup.js'
import ResetPassword from '@/components/recover/page';
import InviteUser from '@/components/invite-user/page';
import Auth from '@/components/auth/page'
import AccessControl from '@/components/access-control/page';
import CreateNewCred from '@/components/create-new-cred/page';
import CredDashboard from '@/components/cred-dashbaord/page';
import { checkProps } from '../../TestUtils'; 

import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));



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

  // comment one(valid or invalid testcase) during test, dont use both valid and invalid at the same time 

  // test('pass invalid email to test input value', () => {
  //   render(<ResetPassword />);
 
  //   const inputEl = screen.getByTestId("username");
  //   userEvent.type(inputEl, "test@gmail.com");
 
  //   expect(screen.getByTestId("username")).toHaveValue("test@gmail.com");
  //   expect(screen.queryByTestId("errormsg")).toBeInTheDocument();
  //   expect(screen.queryByTestId("errormsg").textContent).toEqual("Required");
  // });

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



 //////////////////cred dashboard///////////////
 
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




//Emailpopup


describe("checking Rendering with props", ()=>{
 window.scrollTo = jest.fn()

  let testComponent
  beforeEach(() => {
     const props = {}
  testComponent = render(<EmailPopup  openPop={false} setOpenPop={false}/>)
  })
 

  describe("Checking PropTypes", () => {
    it("Should NOT throw a warning", () => {
      const expectedProps = {}
      const propsError = checkProps(EmailPopup, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })


  describe("Rendering", () => {
    it("Should Render EmailPopup component", () => {
      const main = testComponent.queryAllByTestId("emailpopup")
      expect(main.length).toBe(1)
     
    })
  })

 
})







///////////////Resetpassword/////

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
  
  // comment one(valid or invalid testcase) during test, dont use both valid and invalid at the same time 

  // test('pass invalid email to test input value', () => {
  //   render(<ResetPassword />);
 
  //   const inputEl = screen.getByTestId("username");
  //   userEvent.type(inputEl, "test@gmail.com");
 
  //   expect(screen.getByTestId("username")).toHaveValue("test@gmail.com");
  //   expect(screen.queryByTestId("errormsg")).toBeInTheDocument();
  //   expect(screen.queryByTestId("errormsg").textContent).toEqual("Required");
  // });

})
















////////invite user////

// import { render, screen ,cleanup,fireEvent,act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import InviteUser from '@/components/invite-user/page';
// import { checkProps } from '../../TestUtils'; 


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
  
  //comment one(valid or invalid testcase) during test, dont use both valid and invalid at the same time 

  // test('pass invalid email to test input value', () => {
  //   render(<InviteUser />);
 
  //   const inputEl = screen.getByTestId("username");
  //   userEvent.type(inputEl, "test@gmail.com");
 
  //   expect(screen.getByTestId("username")).toHaveValue("test@gmail.com");
  //   expect(screen.queryByTestId("errormsg")).toBeInTheDocument();
  //   expect(screen.queryByTestId("errormsg").textContent).toEqual("Required");
  // });

})













// Login

// import { render, screen ,cleanup,fireEvent,act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Auth from '@/components/auth/page'
// import { checkProps } from '../../TestUtils'; 


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





  ///////////////Access control


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