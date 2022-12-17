import QuizIcon from "@mui/icons-material/Quiz";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Router_Account,
  Router_AutomaticTest,
  Router_History,
  Router_Login,
  Router_Password,
  Router_SearchOnline,
} from "./routerComponent";
export interface redirect {
  name: string;
  router: string;
  icon: JSX.Element;
}

export const Page_SearchOnline = "Search Online";
export const Page_AutomaticTest = "Automatic Test";
export const Page_History = "History";
export const Page_Account = "Account";
export const Page_Password = "Password";
export const Page_GoToLogIn = "Log Out";

export const redirect_Main: redirect[] = [
  { name: Page_SearchOnline, router: Router_SearchOnline, icon: <ContentPasteSearchIcon /> },
  { name: Page_AutomaticTest, router: Router_AutomaticTest, icon: <QuizIcon /> },
  { name: Page_History, router: Router_History, icon: <HistoryIcon /> },
];

export const redirect_Account: redirect[] = [
  { name: Page_Account, router: Router_Account, icon: <AccountCircleIcon /> },
  { name: Page_Password, router: Router_Password, icon: <KeyIcon /> },
  { name: Page_GoToLogIn, router: Router_Login, icon: <ExitToAppIcon /> },
];
