import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  GroupOutlined,
  PersonOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/images/profile.jpeg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    children: [
      {
        text: "Alumnos",
        icon: <PersonOutlined />,
        path: "home/students",
      },
      {
        text: "Grupos",
        icon: <GroupOutlined />,
        path: "home/groups",
      },
    ],
  },
];

const studentIds = [
  "A00123412",
  "A00123413",
  "A00123414",
  "A00123415",
  "A00123416",
];


const groupIds = [
  "Grupo 1A",
  "Grupo 1B",
  "Grupo 2A",
  "Grupo 2B",
  "Grupo 3A",
  "Grupo 3B",
  "Grupo 4A",

];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [showStudents, setShowStudents] = useState(false);
  const [showGroups, setShowGroups] = useState(false); // add showGroups state
  const [navitemsActive, setNavitemsActive] = useState(false); // add navitemsActive state
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
    setNavitemsActive(pathname === "/home/dashboard"); // set navitemsActive based on the current path
  }, [pathname]);

  const handleClick = (text, path) => {
    const lcText = text.toLowerCase();
    if (path) {
      navigate(path);
      setActive(lcText);
    } else if (studentIds.includes(text)) {
      navigate(`home/students/${text}`);
      setActive(lcText);
      setShowStudents(true);
    } else if (lcText === "grupos") { // handle Grupos item
      navigate("/home/groups");
      setActive(lcText);
      setShowGroups(true);
    } else if (groupIds.includes(text)) { // handle groupIds
      navigate(`home/groups/${encodeURIComponent(text)}`); // navigate to the group page with the groupId parameter
      setActive(lcText);
      setShowGroups(true);
    } else {
      setActive(lcText);
    }
    if (lcText === "alumnos") {
      setShowStudents(true);
    } else {
      setShowStudents(false);
    }
    if (lcText === "grupos" || groupIds.includes(text)) { // handle Grupos item and groupIds
      setShowGroups(true);
    } else {
      setShowGroups(false);
    }
  };

  const handleBackClick = () => {
    setShowStudents(false);
    setShowGroups(false); // set showGroups to false when the back button is clicked
    setActive("dashboard");
    navigate("/home");
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4">CMV</Typography>
                </Box>
                {isNonMobile ? null : (
                  <IconButton onClick={() => setIsSidebarOpen(false)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            {navitemsActive && ( // conditionally render navItems based on navitemsActive state
              <List>
                {navItems.map(({ text, icon, children }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();

                  return (
                    <div key={text}>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            if (children) {
                              setActive(lcText);
                            } else {
                              handleClick(text, null);
                            }
                            if (lcText === "alumnos") {
                              setShowStudents(true);
                            } else {
                              setShowStudents(false);
                            }
                          }}
                          sx={{
                            backgroundColor:
                              active === lcText
                                ? theme.palette.secondary[300]
                                : "transparent",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[100],
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ml: "2rem",
                              color:
                                active === lcText
                                  ? theme.palette.primary[600]
                                  : theme.palette.secondary[200],
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {children && (
                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                          )}
                        </ListItemButton>
                      </ListItem>
                      {children && (
                        <List sx={{ pl: "3rem" }}>
                          {children.map(({ text, icon, path }) => {
                            const lcChildText = text.toLowerCase();
                            return (
                              <ListItem
                                key={text}
                                disablePadding
                                sx={{
                                  backgroundColor:
                                    active === lcChildText
                                      ? theme.palette.secondary[300]
                                      : "transparent",
                                  color:
                                    active === lcChildText
                                      ? theme.palette.primary[600]
                                      : theme.palette.secondary[100],
                                }}
                              >
                                <ListItemButton
                                  onClick={() => {
                                    handleClick(text, path);
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      ml: "2rem",
                                      color:
                                        active === lcChildText
                                          ? theme.palette.primary[600]
                                          : theme.palette.secondary[200],
                                    }}
                                  >
                                    {icon}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                                </ListItemButton>
                              </ListItem>
                            );
                          })}
                        </List>
                      )}
                      <Divider />
                    </div>
                  );
                })}
              </List>
            )}
            {showStudents && (
              <List sx={{ pl: "3rem" }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleBackClick}>
                    <ListItemIcon>
                      <ArrowBackOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Back" />
                  </ListItemButton>
                </ListItem>
                {studentIds.map((id) => (
                  <ListItem key={id} disablePadding>
                    <ListItemButton onClick={() => handleClick(id)}>
                      <ListItemText primary={id} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
            {showGroups && (
              <List sx={{ pl: "3rem" }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleBackClick}>
                    <ListItemIcon>
                      <ArrowBackOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Back" />
                  </ListItemButton>
                </ListItem>
                {groupIds.map((id) => (
                  <ListItem key={id} disablePadding>
                    <ListItemButton onClick={() => handleClick(id)}>
                      <ListItemText primary={id} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;