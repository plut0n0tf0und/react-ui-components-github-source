// Import raw source code strings of the components for the code viewer panel
import addNewChartJsx from "../components/AddNewChart/AddNewChart.jsx?raw";
import addNewChartCss from "../components/AddNewChart/AddNewChart.css?raw";

import chartModelJsx from "../components/ChartModel/ChartModel.jsx?raw";
import chartModelCss from "../components/ChartModel/ChartModel.css?raw";

import customDropdownJsx from "../components/CustomDropdown/CustomDropdown.jsx?raw";

import dashboardJsx from "../components/Dashboard/Dashboard.jsx?raw";
import dashboardCss from "../components/Dashboard/Dashboard.css?raw";

import deliveryCardsJsx from "../components/DeliveryCards/DeliveryCards.jsx?raw";
import deliveryCardsCss from "../components/DeliveryCards/DeliveryCards.css?raw";

import loadingJsx from "../components/Loading/Loading.jsx?raw";
import loadingCss from "../components/Loading/Loading.css?raw";

import mappingDataJsx from "../components/MappingData/MappingData.jsx?raw";
import mappingDataCss from "../components/MappingData/MappingData.css?raw";

import modalJsx from "../components/Modal/Modal.jsx?raw";
import modalCss from "../components/Modal/Modal.css?raw";

import projectListJsx from "../components/ProjectList/ProjectList.jsx?raw";
import projectListCss from "../components/ProjectList/ProjectList.css?raw";

import publishSectionJsx from "../components/PublishSection/PublishSection.jsx?raw";
import publishSectionCss from "../components/PublishSection/PublishSection.css?raw";

export const sourceCodes = {
  AddNewChart: [
    { name: "AddNewChart.jsx", code: addNewChartJsx, lang: "jsx" },
    { name: "AddNewChart.css", code: addNewChartCss, lang: "css" }
  ],
  ChartModel: [
    { name: "ChartModel.jsx", code: chartModelJsx, lang: "jsx" },
    { name: "ChartModel.css", code: chartModelCss, lang: "css" }
  ],
  CustomDropdown: [
    { name: "CustomDropdown.jsx", code: customDropdownJsx, lang: "jsx" }
  ],
  Dashboard: [
    { name: "Dashboard.jsx", code: dashboardJsx, lang: "jsx" },
    { name: "Dashboard.css", code: dashboardCss, lang: "css" }
  ],
  DeliveryCards: [
    { name: "DeliveryCards.jsx", code: deliveryCardsJsx, lang: "jsx" },
    { name: "DeliveryCards.css", code: deliveryCardsCss, lang: "css" }
  ],
  Loading: [
    { name: "Loading.jsx", code: loadingJsx, lang: "jsx" },
    { name: "Loading.css", code: loadingCss, lang: "css" }
  ],
  MappingData: [
    { name: "MappingData.jsx", code: mappingDataJsx, lang: "jsx" },
    { name: "MappingData.css", code: mappingDataCss, lang: "css" }
  ],
  Modal: [
    { name: "Modal.jsx", code: modalJsx, lang: "jsx" },
    { name: "Modal.css", code: modalCss, lang: "css" }
  ],
  ProjectList: [
    { name: "ProjectList.jsx", code: projectListJsx, lang: "jsx" },
    { name: "ProjectList.css", code: projectListCss, lang: "css" }
  ],
  PublishSection: [
    { name: "PublishSection.jsx", code: publishSectionJsx, lang: "jsx" },
    { name: "PublishSection.css", code: publishSectionCss, lang: "css" }
  ]
};
