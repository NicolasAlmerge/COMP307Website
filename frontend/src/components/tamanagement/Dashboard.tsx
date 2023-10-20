import { useContext, useState, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Provider";
import { UserTypes } from "../../enums/UserTypes";
import OfficeHours from "./OfficeHours";
import { Course } from "../../classes/Course";
import TAWishlist from "./TAWishlist";

export function Dashboard({course}: {course: Course}) {
  // Tab names
  const enum TABS {
    OFFICE_HOURS = "Office Hours / Responsibilities",
    TA_PERFORMANCE_LOG = "TA Performance Log",
    TA_WISHLIST = "TA Wishlist"
  };

  // Map tab names to JSX elements
  const TAB_NAMES_TO_JSX = new Map<TABS, JSX.Element>([
    [TABS.OFFICE_HOURS, <OfficeHours course={course}/>],
    [TABS.TA_PERFORMANCE_LOG, <></>],
    [TABS.TA_WISHLIST, <TAWishlist course={course}/>]
  ]);

  // Navigation and global user context
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  // Allowed tabs
  const [tabsItems, setTabsItems] = useState<Array<TABS>>([]);

  // Selected tab
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

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
    let tabsItemTemp: Array<TABS> = [];

    // Add rate the OH tab no matter what
    tabsItemTemp.push(TABS.OFFICE_HOURS);

    // If the user is a prof or higher, add other options
    if (highestType >= typeOrder.get(UserTypes.Professor)) {
      tabsItemTemp.push(TABS.TA_PERFORMANCE_LOG);
      tabsItemTemp.push(TABS.TA_WISHLIST);
    }

    // Save them to the state
    setTabsItems(tabsItemTemp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  // Render nav dropdown options and nav tabs based on state above
  return (
    <div>
      <Container>
        {(tabsItems.length <= 1)? <>{TAB_NAMES_TO_JSX.get(tabsItems[selectedTabIndex])}</>:
          <Tabs
            activeKey={selectedTabIndex}
            onSelect={e => setSelectedTabIndex(+e)}
            transition={false}
            id="noanim-tab"
            className="sub"
          >
            {tabsItems.map((currentTabName, i) => (
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
