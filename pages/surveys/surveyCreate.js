import dynamic from "next/dynamic";
import Admin from "layouts/Admin.js";

const SurveyCreate = dynamic(
  () => import("../../components/Survey/surveyCreate"),
  {
    ssr: false,
  }
);

const SurveyCreator = () => {
  return <SurveyCreate />;
};
SurveyCreator.layout = Admin;
export default SurveyCreator;
