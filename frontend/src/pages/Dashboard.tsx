import { useContext, useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/images/mcgill_logo.png";
import "../style/subTopbar.css";
import { UserContext } from "../Provider";
import { UserTypes } from "../enums/UserTypes";
import MenuItems from "../enums/MenuItems";
import ManageProfessors from "../components/sysop/ManageProfessors";
import ManageCourses from "../components/sysop/ManageCourses";
import ManageUsers from "../components/sysop/ManageUsers";
import RateTA from "../components/rateTA/RateTA";
import SelectCoursePopUp from "../components/tamanagement/SelectCourse";
import ManageCourseQuota from "../components/taAdministration/ManageCourseQuota"; 
import ManageTA from "../components/taAdministration/MangeTA";
import ManageTaInfoHistory from "../components/taAdministration/ManageTaInfoHistory";

export function Dashboard() {
  // Tab names
  const enum TABS {
    RATE_TA = "Rate / Review TA by Course",
    MANAGE_PROFS = "Professors",
    MANAGE_COURSES = "Courses",
    MANAGE_USERS = "Users",
    SELECT_COURSE = "Select Course",
    OFFICE_HOURS = "Office Hours / Responsibilities",
    TA_PERFORMANCE_LOG = "TA Performance Log",
    TA_WISHLIST = "TA Wishlist",
    ALL_TAS_REPORT = "All TAs Report",
    TA_ADMIN_COURSES = "Courses List",
    TA_ADMIN_TA_INFO_HISTORY = "TA info/history",
    TA_ADMIN_COURSE_TA_HISTORY = "Course TA history",
    TA_ADMIN_MANAGE = "Manage TA"
  };

  // Tabs available per profile
  const TABS_PER_PROFILE = new Map<MenuItems, Array<TABS>>([
    [MenuItems.TA_ADMIN, [TABS.TA_ADMIN_MANAGE,TABS.TA_ADMIN_COURSES, TABS.TA_ADMIN_TA_INFO_HISTORY, TABS.TA_ADMIN_COURSE_TA_HISTORY]],
    [MenuItems.TA_MANAGEMENT, [TABS.SELECT_COURSE]],
    [MenuItems.RATE_TA, [TABS.RATE_TA]],
    [MenuItems.SYSOP_TASKS, [TABS.MANAGE_USERS, TABS.MANAGE_PROFS, TABS.MANAGE_COURSES]]
  ]);

  // Map tab names to JSX elements
  const TAB_NAMES_TO_JSX = new Map<TABS, JSX.Element>([
    [TABS.MANAGE_PROFS, <ManageProfessors/>],
    [TABS.MANAGE_COURSES, <ManageCourses/>],
    [TABS.MANAGE_USERS, <ManageUsers/>],
    [TABS.RATE_TA, <RateTA/>],
    [TABS.SELECT_COURSE, <SelectCoursePopUp onExit={() => handleNavClick(MenuItems.RATE_TA)}/>],
    [TABS.TA_ADMIN_COURSES, <ManageCourseQuota/>],
    [TABS.TA_ADMIN_TA_INFO_HISTORY, <ManageTaInfoHistory/>],
    [TABS.TA_ADMIN_MANAGE, <ManageTA/>]
  ]);

  // Navigation and global user context
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  // Set a default profile
  const [currentProfile, setCurrentProfile] = useState(MenuItems.RATE_TA);

  // Set the default array of tabs relative to our default profile
  const [currentTabs, setCurrentTabs] = useState(TABS_PER_PROFILE.get(currentProfile)!);

  // Allowed menu items
  const [menuItems, setMenuItems] = useState<Array<MenuItems>>([]);

  // Selected tab
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // On nav bar selection, this function sets the new current profile and associated tabs.
  function handleNavClick(profile: MenuItems): void {
    setCurrentProfile(profile);
    setCurrentTabs(TABS_PER_PROFILE.get(profile)!);
    setSelectedTabIndex(0);
  }

  // Logging out
  function handleLogout(): void {
    navigate("/logout");
  }

  useEffect(() => {
    // If no user redirect to login page
    if (!user.email) {
      navigate("/login");
      return;
    }

    // User type order
    const typeOrder = new Map<UserTypes, number>([
      [UserTypes.Student, 0],
      [UserTypes.TA, 1],
      [UserTypes.Professor, 2],
      [UserTypes.Admin, 3],
      [UserTypes.Sysop, 4],
    ]);

    // Get the highest type of the user
    let highestType: number = typeOrder.get(UserTypes.Student);
    user.userType.forEach(type => {
      const order = typeOrder.get(type);
      if (order > highestType) highestType = order;
    });

    // Menu items
    let menuItemsTemp: Array<MenuItems> = [];

    // If the user is an admin or higher, add TA Admin option
    if (highestType >= typeOrder.get(UserTypes.Admin)) {
      menuItemsTemp.push(MenuItems.TA_ADMIN);
    }

    // If the user is a TA or higher, add TA Management option
    if (highestType >= typeOrder.get(UserTypes.TA)) {
      menuItemsTemp.push(MenuItems.TA_MANAGEMENT);
    }

    // Add rate a TA option no matter what
    menuItemsTemp.push(MenuItems.RATE_TA);

    // Add Sysop tasks if the user is a system operator
    if (highestType === typeOrder.get(UserTypes.Sysop)) {
      menuItemsTemp.push(MenuItems.SYSOP_TASKS);
    }

    // Save them to the state
    setMenuItems(menuItemsTemp);
  }, [user, navigate]);

  // Render nav dropdown options and nav tabs based on state above
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <img className="logo" src={logo} alt="mcgill-logo"/>
          {
            (menuItems.length <= 1)? <div className="me-auto">{menuItems[0]}</div>:
            <Nav className="me-auto">
              <NavDropdown title={currentProfile} id="basic-nav-dropdown">
                {menuItems.map((profile) => (
                  <NavDropdown.Item
                    key={profile.toString()}
                    onClick={() => handleNavClick(profile)}>
                    {profile}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          }
          <button className="logout" onClick={() => handleLogout()}>
            <LogoutIcon/>
          </button>
        </Container>
      </Navbar>

      <Container>
        {(currentTabs.length <= 1)? <><hr/>{TAB_NAMES_TO_JSX.get(currentTabs[0])}</>:
          <Tabs
            activeKey={selectedTabIndex}
            onSelect={e => setSelectedTabIndex(+e)}
            transition={false}
            id="noanim-tab"
            className="sub"
          >
            {currentTabs.map((currentTabName, i) => (
              <Tab defaultChecked className="sub" key={i} eventKey={i} title={currentTabName}>
                {TAB_NAMES_TO_JSX.get(currentTabName)}
              </Tab>
            ))}
          </Tabs>
        }
      </Container>
    </div>
  );
}

export default Dashboard;
