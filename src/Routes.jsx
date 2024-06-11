import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./modules/Home";
import Admin from "./admin/Admin";
import AmountSet from "./admin/AmountSet";
import Login from "./modules/Login";
import SignUpForm from "./modules/SignUpForm";
import ProductU from "./admin/ProductU";
import Deposit from "./modules/Deposit";
import Withdraw from "./modules/Withdraw";
import Product1 from "./Product/Product1";

import AdminDetail from "./admin/AdminDetail";
import UserProfile from "./modules/UserProfile";
import Members from "./modules/Members";
import Services from "./modules/Services";
import Asset from "./modules/Asset";
import Bottombar from "./modules/Bottombar";
import Antwerp from "./Product/Antwerp";
import Adani from "./Product/Adani";
import Auckland from "./Product/Auckland";
import Balboa from "./Product/Balboa";
import Boltek from "./Product/Boltek";
import Busan from "./Product/Busan";
import Mumbai from "./Product/Mumbai";
import Demo from "./modules/Demo";
import Payment from "./admin/Payment";
import AcceptReferal from "./modules/AcceptReferal";
import WithdrawlReq from "./admin/WithdrawRequest";
import Confirmation from "./modules/Confirmation";
const Routes = () => {
  const { token } = useAuth();
  const user = JSON.parse(localStorage.getItem("User"));

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/accept-referal/:id",
      element: <AcceptReferal />,
    },
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Routes for admin
  const routesforAdmin = [
    {
      path: "/admin",
      element: (
        <>
          <Admin></Admin>
          <Bottombar></Bottombar>
        </>
      ),
    },
    {
      path: "/admin/amount",
      element: (
        <>
          <AmountSet></AmountSet>
          <Bottombar></Bottombar>
        </>
      ),
    },
    {
      path: "/payment-confirmation/:id",
      element: <Confirmation />,
    },
    {
      path: "/admin/products",
      element: (
        <>
          <ProductU></ProductU>
          <Bottombar></Bottombar>
        </>
      ),
    },
    {
      path: "/accept-referal/:id",
      element: <AcceptReferal />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: (
            <>
              <Home />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/home",
          element: (
            <>
              <Home />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/accept-referal/:id",
          element: <AcceptReferal />,
        },
        {
          path: "/login",
          element: (
            <>
              <Login />
            </>
          ),
        },
        {
          path: "/signup",
          element: (
            <>
              <SignUpForm />
            </>
          ),
        },
        {
          path: "/home/action/deposit",
          element: (
            <>
              <Deposit />
              <Bottombar />
            </>
          ),
        },

        {
          path: "/home/action/withdraw",
          element: (
            <>
              <Withdraw />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/admin/user-detail",
          element: <AdminDetail />,
        },
        {
          path: "/admin/withdraw-request",
          element: <WithdrawlReq />,
        },
        {
          path: "/user-profile",
          element: (
            <>
              <UserProfile />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/user-profile/members",
          element: (
            <>
              <Members />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/asset",
          element: (
            <>
              <Asset />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/services",
          element: (
            <>
              <Services />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/demo",
          element: (
            <>
              <Demo />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/ALGIERS PORT",
          element: (
            <>
              <Product1 />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/ANTWERP PORT",
          element: (
            <>
              <Antwerp />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/ADANI PORT",
          element: (
            <>
              <Adani />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/accept-referal/:id",
          element: <AcceptReferal />,
        },
        {
          path: "/AUCKLAND PORT",
          element: (
            <>
              <Auckland />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/BALBOA PORT",
          element: (
            <>
              <Balboa />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/BOTLEK PORT",
          element: (
            <>
              <Boltek />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/BUSAN PORT",
          element: (
            <>
              <Busan />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/MUMBAI PORT",
          element: (
            <>
              <Mumbai />
              <Bottombar />
            </>
          ),
        },
        {
          path: "/admin/payment",
          element: (
            <>
              <Payment />
            </>
          ),
        },
        {
          path: "/accept-referal/:id",
          element: <AcceptReferal />,
        },
        {
          path: "/payment-confirmation/:id",
          element: <Confirmation />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUpForm />,
    },
    {
      path: "/accept-referal/:id",
      element: <AcceptReferal />,
    },
  ];

  // /:referalCode

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...(user?.accountType === "Admin" ? routesforAdmin : []),
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
