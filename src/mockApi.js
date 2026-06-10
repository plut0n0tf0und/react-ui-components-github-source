// Global fetch interceptor to mock the backend database in localStorage

const MOCK_API_BASE = "https://mock-api-server.local";

// Static mock sales data for previewing and charting
const MOCK_SALES_DATA = [
  { "month": "Jan", "sales": 4000, "profit": 2400, "orders": 120 },
  { "month": "Feb", "sales": 3000, "profit": 1398, "orders": 98 },
  { "month": "Mar", "sales": 6000, "profit": 9800, "orders": 210 },
  { "month": "Apr", "sales": 2780, "profit": 3908, "orders": 85 },
  { "month": "May", "sales": 5890, "profit": 4800, "orders": 190 },
  { "month": "Jun", "sales": 8390, "profit": 6800, "orders": 250 },
  { "month": "Jul", "sales": 9490, "profit": 8300, "orders": 310 }
];

// Initialize localStorage DB if empty
const initDb = () => {
  const dbStr = localStorage.getItem("mock_bento_db");
  if (!dbStr) {
    const defaultData = {
      projects: {
        "demo-project": {
          _id: "demo-project",
          name: "Sales & Metrics Tracker",
          description: "An analytics dashboard containing core e-commerce metrics and graphs."
        }
      },
      sources: [
        {
          _id: "source-1",
          projectId: "demo-project",
          sourceLink: `${MOCK_API_BASE}/sales-data-source.json`
        }
      ],
      charts: [
        {
          _id: "chart-1",
          configName: "Monthly Revenue Growth",
          data: {
            projectId: "demo-project",
            sourceUrl: `${MOCK_API_BASE}/sales-data-source.json`,
            chartType: "line",
            selectListItemOne: "month",
            selectListItemTwo: "sales",
            baseDataKeys: ["month", "sales", "profit", "orders"],
            singleData: MOCK_SALES_DATA[0],
            apiAllData: MOCK_SALES_DATA,
            tableItems: [0, 1, 2, 3, 4, 5, 6],
            chartData: MOCK_SALES_DATA.map(d => ({ label: d.month, value: d.sales }))
          }
        },
        {
          _id: "chart-2",
          configName: "Profit Margins Breakdown",
          data: {
            projectId: "demo-project",
            sourceUrl: `${MOCK_API_BASE}/sales-data-source.json`,
            chartType: "bar",
            selectListItemOne: "month",
            selectListItemTwo: "profit",
            baseDataKeys: ["month", "sales", "profit", "orders"],
            singleData: MOCK_SALES_DATA[0],
            apiAllData: MOCK_SALES_DATA,
            tableItems: [0, 1, 2, 3, 4, 5, 6],
            chartData: MOCK_SALES_DATA.map(d => ({ label: d.month, value: d.profit }))
          }
        },
        {
          _id: "chart-3",
          configName: "Current Month Target",
          data: {
            projectId: "demo-project",
            sourceUrl: `${MOCK_API_BASE}/sales-data-source.json`,
            chartType: "card",
            selectListItemOne: "month",
            selectListItemTwo: "sales",
            baseDataKeys: ["month", "sales", "profit", "orders"],
            singleData: MOCK_SALES_DATA[0],
            apiAllData: MOCK_SALES_DATA,
            tableItems: [6], // July sales
            chartData: [{ label: "Jul Total Revenue", value: 9490 }]
          }
        }
      ]
    };
    localStorage.setItem("mock_bento_db", JSON.stringify(defaultData));
  }
};

initDb();

const getDb = () => JSON.parse(localStorage.getItem("mock_bento_db"));
const saveDb = (db) => localStorage.setItem("mock_bento_db", JSON.stringify(db));

// Original window.fetch
const originalFetch = window.fetch;

// Interceptor
window.fetch = async function (url, options = {}) {
  const urlStr = String(url);

  // If request is not for our mock API server, route to original fetch
  if (!urlStr.startsWith(MOCK_API_BASE)) {
    return originalFetch.apply(this, arguments);
  }

  // Parse method, body, path
  const method = (options.method || "GET").toUpperCase();
  const parsedUrl = new URL(urlStr);
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  const db = getDb();
  let responseData = null;
  let status = 200;

  // Intercept mock sales data source file
  if (pathname === "/sales-data-source.json") {
    responseData = MOCK_SALES_DATA;
  }
  // GET /projects/:projectId
  else if (pathname.startsWith("/projects/")) {
    const projectId = pathname.split("/").pop();
    responseData = db.projects[projectId] || { _id: projectId, name: "New Project" };
  }
  // GET & POST /project-source
  else if (pathname === "/project-source") {
    if (method === "GET") {
      const projectId = searchParams.get("projectId");
      responseData = db.sources.filter(s => s.projectId === projectId);
    } else if (method === "POST") {
      const body = JSON.parse(options.body);
      const newSource = {
        _id: "source-" + Date.now(),
        projectId: body.projectId,
        sourceLink: body.sourceLink
      };
      db.sources.push(newSource);
      saveDb(db);
      responseData = newSource;
    }
  }
  // DELETE /project-source/:sourceId
  else if (pathname.startsWith("/project-source/")) {
    if (method === "DELETE") {
      const sourceId = pathname.split("/").pop();
      db.sources = db.sources.filter(s => s._id !== sourceId);
      saveDb(db);
      responseData = { message: "Source deleted successfully" };
    }
  }
  // GET, POST, & PUT /project-chart
  else if (pathname === "/project-chart") {
    if (method === "GET") {
      const projectId = searchParams.get("projectId");
      responseData = db.charts.filter(c => c.data.projectId === projectId);
    } else if (method === "POST") {
      const body = JSON.parse(options.body);
      const newChart = {
        _id: "chart-" + Date.now(),
        configName: body.configName,
        data: body.data
      };
      db.charts.push(newChart);
      saveDb(db);
      responseData = newChart;
    } else if (method === "PUT") {
      const chartId = searchParams.get("chartId");
      const body = JSON.parse(options.body);
      
      const chartIndex = db.charts.findIndex(c => c._id === chartId);
      if (chartIndex !== -1) {
        if (body.configName !== undefined) {
          db.charts[chartIndex].configName = body.configName;
        } else {
          db.charts[chartIndex].data = {
            ...db.charts[chartIndex].data,
            ...body
          };
        }
        saveDb(db);
        responseData = db.charts[chartIndex];
      } else {
        status = 404;
        responseData = { message: "Chart configuration not found" };
      }
    }
  }

  // Generate fake response
  return {
    ok: status >= 200 && status < 300,
    status: status,
    statusText: status === 200 ? "OK" : "Error",
    headers: new Headers({ "Content-Type": "application/json" }),
    json: async () => responseData,
    text: async () => JSON.stringify(responseData)
  };
};
