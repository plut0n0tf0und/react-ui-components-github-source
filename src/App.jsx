import React, { useState } from "react";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { 
  SquaresFour, 
  PlusCircle, 
  ChartBar, 
  Truck, 
  ArrowsLeftRight, 
  PaperPlaneTilt, 
  CaretDown, 
  SquareHalf, 
  SpinnerGap, 
  Folder, 
  ArrowLeft, 
  GithubLogo 
} from "@phosphor-icons/react";

// Original components
import AddNewChart from "../components/AddNewChart/AddNewChart";
import ChartModel from "../components/ChartModel/ChartModel";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import Dashboard from "../components/Dashboard/Dashboard";
import DeliveryCards from "../components/DeliveryCards/DeliveryCards";
import Loading from "../components/Loading/Loading";
import MappingData from "../components/MappingData/MappingData";
import Modal from "../components/Modal/Modal";
import ProjectList from "../components/ProjectList/ProjectList";
import PublishSection from "../components/PublishSection/PublishSection";

// Phosphor Icons for cards
const Icons = {
  Dashboard: <SquaresFour size={24} />,
  AddNewChart: <PlusCircle size={24} />,
  ChartModel: <ChartBar size={24} />,
  DeliveryCards: <Truck size={24} />,
  MappingData: <ArrowsLeftRight size={24} />,
  PublishSection: <PaperPlaneTilt size={24} />,
  CustomDropdown: <CaretDown size={24} />,
  Modal: <SquareHalf size={24} />,
  Loading: <SpinnerGap size={24} />,
  ProjectList: <Folder size={24} />,
};

const componentsList = [
  {
    id: "AddNewChart",
    title: "AddNewChart",
    category: "Builder Flow",
    icon: Icons.AddNewChart,
    description: "A step-by-step form to add new charts by mapping API columns.",
    isFullPage: true,
    thumbnail: "/thumbnails/thumbnail_addnewchart.png"
  },
  {
    id: "ChartModel",
    title: "ChartModel",
    category: "Data Visualization",
    icon: Icons.ChartModel,
    description: "Renders different types of graphs like line, bar, pie, and radar.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_chartmodel.png"
  },
  {
    id: "CustomDropdown",
    title: "CustomDropdown",
    category: "Input Control",
    icon: Icons.CustomDropdown,
    description: "A styled dropdown menu with glassmorphism effects.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_customdropdown.png"
  },
  {
    id: "Dashboard",
    title: "Dashboard",
    category: "Page Flow",
    icon: Icons.Dashboard,
    description: "A main dashboard page to search and view multiple charts.",
    isFullPage: true,
    thumbnail: "/thumbnails/thumbnail_dashboard.png"
  },
  {
    id: "DeliveryCards",
    title: "DeliveryCards",
    category: "Layout Module",
    icon: Icons.DeliveryCards,
    description: "Visual cards showing logistics and delivery details.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_deliverycards.png"
  },
  {
    id: "Loading",
    title: "Loading",
    category: "Loading Indicator",
    icon: Icons.Loading,
    description: "A fullscreen background loading spinner.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_loading.png"
  },
  {
    id: "MappingData",
    title: "MappingData",
    category: "Data Utility",
    icon: Icons.MappingData,
    description: "A data mapping table selector for configuring chart data.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_mappingdata.png"
  },
  {
    id: "Modal",
    title: "Modal",
    category: "Feedback Overlay",
    icon: Icons.Modal,
    description: "A reusable modal popup box with transition effects.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_modal.png"
  },
  {
    id: "ProjectList",
    title: "ProjectList",
    category: "List Component",
    icon: Icons.ProjectList,
    description: "A navigation component listing user projects.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_projectlist.png"
  },
  {
    id: "PublishSection",
    title: "PublishSection",
    category: "Widget Module",
    icon: Icons.PublishSection,
    description: "A panel widget displaying lists of developer resources and ratings.",
    isFullPage: false,
    thumbnail: "/thumbnails/thumbnail_publishsection.png"
  }
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowcaseHome />} />
      <Route path="/component/:id" element={<ComponentViewer />} />
      {/* Fallbacks for internal navigate calls inside AddNewChart and Dashboard */}
      <Route path="/dashboard/:id" element={<ComponentViewer idOverride="Dashboard" />} />
      <Route path="/add-new-chart/:id" element={<ComponentViewer idOverride="AddNewChart" />} />
    </Routes>
  );
}

function ShowcaseHome() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--color-background)", py: { xs: 4, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}>
      
      {/* Resume Navigation Link */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", mb: 4, display: "flex", justifyContent: "flex-start" }}>
        <motion.a 
          href="#"
          className="resume-link-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={16} /> Back to Resume
        </motion.a>
      </Box>

      {/* Visual Header */}
      <Box sx={{ borderBottom: "1px solid var(--color-outline)", pb: 2.5, mb: 2, maxWidth: "1200px", mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: "-0.03em" }}>
            React UI Component
          </Typography>
          <span className="badge" style={{ verticalAlign: "middle" }}>10 Components</span>
        </Box>
        <Typography sx={{ color: "var(--color-on-surface-variant)", mt: 2, maxWidth: "650px", fontSize: "0.95rem" }}>
          Select a card below to view the interactive component in fullscreen format. Every view features GitHub source repository links.
        </Typography>
      </Box>

      {/* Grid of Components */}
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <motion.div 
          className="card-grid"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.04
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {componentsList.map((comp) => (
            <motion.div
              key={comp.id}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ 
                y: -4, 
                transition: { type: "spring", stiffness: 400, damping: 20 } 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={`/component/${comp.id}`} className="component-card" style={{ height: "100%" }}>
                <div className="component-card-image-wrapper">
                  <img 
                    src={comp.thumbnail} 
                    alt={comp.title} 
                    className="component-card-image" 
                    loading="lazy"
                  />
                </div>
                <div className="component-card-content">
                  <div className="component-card-top">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <div className="component-card-icon">{comp.icon}</div>
                      <span className="badge">{comp.category}</span>
                    </Box>
                    <h3>{comp.title}</h3>
                    <p>{comp.description}</p>
                  </div>
                  <div className="component-card-bottom">
                    <span>View</span>
                    <motion.span 
                      className="arrow-link"
                      variants={{
                        hover: { x: 5, transition: { type: "spring", stiffness: 300, damping: 10 } }
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

function ComponentViewer({ idOverride }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const compId = idOverride || routeId;
  const comp = componentsList.find(c => c.id === compId);

  // States for live interactive harnesses
  const [dropdownValue, setDropdownValue] = useState("");
  const [innerModalOpen, setInnerModalOpen] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);

  // MappingData interactive state
  const [mapSelectOne, setMapSelectOne] = useState("month");
  const [mapSelectTwo, setMapSelectTwo] = useState("sales");
  const [mapTableItems, setMapTableItems] = useState([0, 1, 2]);

  if (!comp) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Component not found</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>Go Home</Button>
      </Box>
    );
  }

  const triggerLoaderDemo = () => {
    setLoadingActive(true);
    setTimeout(() => {
      setLoadingActive(false);
    }, 2500);
  };

  // GitHub Component subdirectory path mapping
  const githubRepoUrl = `https://github.com/plut0n0tf0und/react-ui-components-github-source/tree/main/components/${comp.id}`;

  // Render visual preview elements for smaller or non-page components
  const renderVisualShowcase = (id) => {
    switch (id) {
      case "DeliveryCards":
        return <DeliveryCards />;

      case "CustomDropdown":
        return (
          <Box sx={{ width: "100%", maxWidth: 350, mx: "auto" }}>
            <Typography variant="body2" sx={{ mb: 3, color: "var(--color-on-surface-variant)", textAlign: "center" }}>
              Selected Option: <strong style={{ color: "white" }}>{dropdownValue || "None"}</strong>
            </Typography>
            <CustomDropdown
              headerLabel="Choose E-Commerce Metric"
              placeholder="Select custom metric..."
              value={dropdownValue}
              onChange={(val) => setDropdownValue(val)}
              options={[
                { value: "revenue", label: "Gross Revenue ($)" },
                { value: "sales", label: "Volume Sales (units)" },
                { value: "conversions", label: "Conversion Rate (%)", disabled: true },
                { value: "orders", label: "Completed Orders" },
              ]}
            />
          </Box>
        );

      case "ChartModel":
        const mockChartConfig = {
          _id: "preview-chart-id",
          configName: "Monthly Revenue Growth",
          data: {
            projectId: "preview",
            chartType: "line",
            selectListItemOne: "month",
            selectListItemTwo: "sales",
            chartData: [
              { label: "Jan", value: 4000 },
              { label: "Feb", value: 3000 },
              { label: "Mar", value: 6000 },
              { label: "Apr", value: 2780 },
              { label: "May", value: 5890 },
              { label: "Jun", value: 8390 }
            ]
          }
        };
        return (
          <Box sx={{ width: "100%" }}>
            <ChartModel configData={mockChartConfig} dataIndex={0} />
          </Box>
        );

      case "Modal":
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Button 
              variant="outlined" 
              sx={{ borderColor: "white", color: "white", textTransform: "none", px: 4, py: 1, borderRadius: "20px" }} 
              onClick={() => setInnerModalOpen(true)}
            >
              Open Custom Modal Popup
            </Button>
            <Modal isOpen={innerModalOpen} onClose={() => setInnerModalOpen(false)}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Showcase Modal Active</Typography>
              <Typography variant="body2" sx={{ color: "var(--color-on-surface-variant)", mb: 3 }}>
                This modal component triggers dynamic background blurs and zoom-in transitions.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" sx={{ textTransform: "none" }} onClick={() => setInnerModalOpen(false)}>
                  Close
                </Button>
              </Box>
            </Modal>
          </Box>
        );

      case "Loading":
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Button 
              variant="outlined" 
              sx={{ borderColor: "white", color: "white", textTransform: "none", px: 4, py: 1, borderRadius: "20px" }} 
              onClick={triggerLoaderDemo}
            >
              Trigger Spinner (2.5s)
            </Button>
            {loadingActive && <Loading />}
          </Box>
        );

      case "PublishSection":
        const mockGames = [
          { title: "Red Dead Redemption 2", rating: 4.8, developer: "Rockstar Games" },
          { title: "The Witcher 3: Wild Hunt", rating: 4.9, developer: "CD Projekt Red" },
          { title: "Grand Theft Auto V", rating: 4.7, developer: "Rockstar Games" }
        ];
        return (
          <Box sx={{ width: "100%" }}>
            <PublishSection games={mockGames} />
          </Box>
        );

      case "MappingData":
        const mockBaseKeys = ["month", "sales", "profit", "orders"];
        const mockSingleData = { month: "Jan", sales: 4000, profit: 2400, orders: 120 };
        const mockAllData = [
          { month: "Jan", sales: 4000, profit: 2400 },
          { month: "Feb", sales: 3000, profit: 1398 },
          { month: "Mar", sales: 6000, profit: 9800 }
        ];
        return (
          <Box sx={{ width: "100%" }}>
            <MappingData
              parent="chart"
              showMappingData={true}
              mapBaseDataKeys={mockBaseKeys}
              mapSingleData={mockSingleData}
              mapApiAllData={mockAllData}
              mapSelectedChart="line"
              mapSelectListItemOne={mapSelectOne}
              mapSelectListItemTwo={mapSelectTwo}
              mapTableItems={mapTableItems}
              setMapSelectListItemOne={setMapSelectOne}
              setMapSelectListItemTwo={setMapSelectTwo}
              setMapTableItems={setMapTableItems}
            />
          </Box>
        );

      case "ProjectList":
        const mockProjects = [
          { id: 1, name: "Analytics Dashboard System", status: "Active", chartsCount: 5 },
          { id: 2, name: "Warehouse E-Commerce Tracking", status: "Active", chartsCount: 3 }
        ];
        return (
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            {mockProjects.map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#141414", padding: "16px", borderRadius: "10px", border: "1px solid #222" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{p.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#666", marginTop: "2px" }}>Charts: {p.chartsCount}</div>
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", background: "#222", color: "#fff", borderRadius: "4px" }}>
                  {p.status}
                </span>
              </div>
            ))}
            <ProjectList />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="viewer-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* viewer header controls */}
      <div className="viewer-header">
        <div className="viewer-header-left">
          <Link to="/" className="back-link-btn">
            <motion.span 
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Back
            </motion.span>
          </Link>
        </div>
        <h1 className="viewer-title">{comp.title}</h1>
        <div className="viewer-header-right">
          <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer" className="github-link-btn" title="View source in Git repository">
            <GithubLogo size={22} weight="bold" />
          </a>
        </div>
      </div>

      {/* viewer body container */}
      <div className="viewer-body">
        {comp.isFullPage ? (
          // Page flows are loaded in full screen directly
          <motion.div 
            style={{ width: "100%", padding: "16px 0" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {comp.id === "Dashboard" && <Dashboard />}
            {comp.id === "AddNewChart" && <AddNewChart />}
          </motion.div>
        ) : (
          // Smaller modules are centered in a showcase wrapper
          <motion.div 
            className="centered-showcase-box"
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="showcase-desc-box">
              <Typography variant="body2">
                {comp.description}
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              {renderVisualShowcase(comp.id)}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
