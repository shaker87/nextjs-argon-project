import dynamic from "next/dynamic";
import router from "next/router";
import React, { Component } from "react";
import Admin from "layouts/Admin.js";
import Loader from "components/Spinner";
import ErrorMessage from "components/Error";
import { getSurveyById } from "../../api/surveys";


const SurveyView = (props) =>{
  const onComplete = async (result, options) => {
    // this.setState({ ...this.state, error: "" });
    const user = JSON.parse(localStorage.getItem("user"));

    const userid = user.id;
    const surveyid = props.survey.id;
    const surveyname = props.survey.surveyname;
    const surveydescription = props.survey.surveyJSON.description;
    const surveyresultJSON = JSON.stringify(result.data);
    const postSurveyResponse = await postSurveyResult(
      userid,
      surveyid,
      surveyresultJSON,
      surveyname,
      surveydescription
    );
    if (postSurveyResponse && postSurveyResponse.success) {
      Router.push(`/surveys/surveyAnalytics?id=${surveyid}`);
    } // } else {
    //   this.setState({ ...this.state, error: "Server Error" });
    // }
  };

    const { data } = this.props;
    var model = new Survey.Model(data);
    return (
      <>
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          //   onValueChanged={onValueChanged}
        />
      </>
    );
  }


export default SurveyView;

// const SurveyCreate = dynamic(
//   () => import("../../components/Survey/surveyCreate"),
//   {
//     ssr: false,
//   }
// );

// class EditSurvey extends Component {
//   state = {
//     loading: false,
//     survey: {},
//     error: "",
//   };

//   async componentDidMount() {
//     this.setState({ ...this.state, loading: true });
//     if (router && router.query && router.query.id) {
//       const survey = await getSurveyById(router.query.id);
//       if (survey.success)
//         this.setState({ ...this.state, survey: survey.data, loading: false });
//       else
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
//     const { loading, error } = this.state;
//     if (loading) return <Loader />;
//     if (error) return <ErrorMessage errorMessage={error} />;
//     if (this.state.survey) {
//       const data = this.state.survey.surveyJSON
//         ? JSON.parse(this.state.survey.surveyJSON)
//         : {};
//       console.log("DATA", data);
//       const surveyid = this.state.survey.id ? this.state.survey.id : "";
//       return <SurveyCreate data={data} surveyid={surveyid} />;
//     }

//     return <ErrorMessage error="No Survey data found" />;
//   }
// }
// EditSurvey.layout = Admin;
// export default EditSurvey;
