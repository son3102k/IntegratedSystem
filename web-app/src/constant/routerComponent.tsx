import { Account, Password } from "../features/accountFeature";
import LogIn from "../features/LogInRegister/LogIn";
import { AutomationTest, HistoryTest, SearchOnline } from "../features/mainFeature";
import { Upload } from "../features/uploadFeature/Upload";

export const Router_Login = "/log-in";

export const Router_SearchOnline = "/search-online";
export const Router_AutomaticTest = "/automatic-test";
export const Router_History = "/history";
export const Router_Account = "/account";
export const Router_Password = "/password";
export const Router_Upload = "/upload";

export interface Router_Component {
  router: string;
  component: JSX.Element;
}

export const PublicRouter: Router_Component[] = [{ router: Router_Login, component: <LogIn /> }];

export const AfterLogInRouter: Router_Component[] = [
  { router: "/", component: <SearchOnline /> },
  { router: Router_SearchOnline, component: <SearchOnline /> },
  { router: Router_AutomaticTest, component: <AutomationTest /> },
  { router: Router_History, component: <HistoryTest /> },
  { router: Router_Account, component: <Account /> },
  { router: Router_Password, component: <Password /> },
  { router: Router_Upload, component: <Upload /> },
];

export const PrivateRouter: Router_Component[] = [];
