import { onAuthStateChanged, User } from "@firebase/auth";
import { Fragment, useEffect, useReducer } from "react";
import { auth } from "src/config/firebaseConfig";
import Navbar from "./_components/Navbar";
import { layout_data } from "src/data/layout";
import { Link } from "react-router-dom";
import { PencilEdit02Icon } from "hugeicons-react";
import RenderState from "src/components/shared/RenderState";
import UserProfileDropdown from "./_components/UserProfileDropdown";
import { fetchingReducer } from "src/reducers/fetchingReducer";
import { fetchingStates } from "src/states/states";

const Header = () => {
  const [state, dispatch] = useReducer(fetchingReducer<{ uid: string }>, fetchingStates<{ uid: string }>());

  useEffect(() => {
    try {
      dispatch({ type: "PENDING" });
      onAuthStateChanged(auth, (currentUser) => {
        dispatch({ type: "SUCCESS", payload: currentUser as User });
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Failed to load user" });
    }
  }, []);


  return (
    <Fragment>
      <div className="sticky hidden lg:block top-0 z-50 bg-white py-3">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto">
          <div className="flex items-center">
            <div className="font-bold text-xl">{layout_data.header.title}</div>
            <Navbar list={layout_data.header.navbar} />
          </div>

          <RenderState error={state.error} loading={state.loading}>
            <div className="flex gap-2">
              {state.data ? (
                <div className="flex gap-4 items-center">
                  <Link to="/write" className="flex items-center gap-2 me-5">
                    {layout_data.header.write}
                    <PencilEdit02Icon size={20} />
                  </Link>

                  <UserProfileDropdown uid={state.data?.uid} />
                </div>
              ) : (
                <Navbar list={layout_data.header.auth} />
              )}
            </div>
          </RenderState>
        </div>
      </div>

      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
