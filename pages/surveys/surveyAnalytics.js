import dynamic from "next/dynamic";
import React, { Component, useState } from "react";
import router from "next/router";
import Admin from "layouts/Admin.js";
import {
  getSurveyById,
  getAllSurveyResultsBySurveyId,
} from "../../api/surveys";
import { generateSurveyResultsData } from "../../api/utils";
import Loader from "../../components/Spinner";
import ErrorMessage from "../../components/Error";

const SurveyAnalytics = dynamic(
  () => import("../../components/Survey/surveyAnalytics"),
  {
    ssr: false,
  }
);

const SurveyAnalyticsPage = (props) => {
  const [state, setState ] = useState({
    loading: false,
    surveyJSON: {},
    data: [],
    error: "",
  })


  // Get surveyJSON for that particuar survey
  // Get All results of the survey and format the data
  // Pass it to Survey Analtyics
  useEffect(() => {
    setState({ ...state, loading: true });
    if (router && router.query && router.query.id) {
      const survey = await getSurveyById(router.query.id);
      console.log('survey :>> ', survey);
      const surveyResults = await getAllSurveyResultsBySurveyId(
        router.query.id
      );
      console.log(surveyResults);
      if (survey.success && surveyResults.success) {
        const surveyJSON = JSON.parse(survey.data.surveyJSON);
        setState({ ...state, surveyJSON, loading: false });
        if (surveyResults.data) {
          const data = generateSurveyResultsData(surveyResults.data);
          setState({ ...state, data });
        }
      } else
        setState({
          state,
          loading: false,
          error: "Server Error while fetching survey data",
        });
    } else {
      setState({
        ...state,
        loading: false,
        error: "No Survey id provided to fetch survey",
      });
    }
  }, []) 
    


    console.log("PAGE RENDERED");
    const { loading, error, surveyJSON, data } = state;
    if (loading) return <Loader />;
    if (error) return <ErrorMessage errorMessage={error} />;
    if (surveyJSON && data) {
      return <SurveyAnalytics json={surveyJSON} data={data} />;
    }
    // return <ErrorMessage error="No Analytics found for this survey" />;
  }

SurveyAnalyticsPage.layout = Admin;
export default SurveyAnalyticsPage;

// class SurveyAnalyticsPage extends Component {
//   state = {
//     loading: false,
//     surveyJSON: {},
//     data: [],
//     error: "",
//   };

//   // Get surveyJSON for that particuar survey
//   // Get All results of the survey and format the data
//   // Pass it to Survey Analtyics
//   async componentDidMount() {
//     this.setState({ ...this.state, loading: true });
//     if (router && router.query && router.query.id) {
//       const survey = await getSurveyById(router.query.id);
//       const surveyResults = await getAllSurveyResultsBySurveyId(
//         router.query.id
//       );
//       console.log(surveyResults);
//       if (survey.success && surveyResults.success) {
//         const surveyJSON = JSON.parse(survey.data.surveyJSON);
//         this.setState({ ...this.state, surveyJSON, loading: false });
//         if (surveyResults.data) {
//           const data = generateSurveyResultsData(surveyResults.data);
//           this.setState({ ...this.state, data });
//         }
//       } else
//         this.setState({
//           ...this.state,
//           loading: false,
//           error: "Server Error while fetching survey data",
//         });
//     } else {
//       this.setState({
//         ...this.state,
//         loading: false,
//         error: "No Survey id provided to fetch survey",
//       });
//     }
//   }

//   render() {
//     console.log("PAGE RENDERED");
//     const { loading, error, surveyJSON, data } = this.state;
//     if (loading) return <Loader />;
//     if (error) return <ErrorMessage errorMessage={error} />;
//     if (surveyJSON && data) {
//       return <SurveyAnalytics json={surveyJSON} data={data} />;
//     }
//     // return <ErrorMessage error="No Analytics found for this survey" />;
//   }
// }
// SurveyAnalyticsPage.layout = Admin;
// export default SurveyAnalyticsPage;
