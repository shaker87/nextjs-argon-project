import React, { Component, useEffect, useState } from "react";
import router from "next/router";
import { useSession } from "next-auth/client";

import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Link } from "next/link";
import CardsHeader from "components/Headers/CardsHeader.js";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import Admin from "layouts/Admin.js";
import Loader from "components/Spinner";
import ErrorMessage from "components/Error";
import { json } from "../../survey_json";
import { getSurveyResultById } from "../../api/surveys";
// Survey.StylesManager.applyTheme("default");
import { updateSurveyResult } from "../../api/surveys";

const SurveyResultSinglePage = (props) => {
 
  const [session, loading] = useSession();
  const [state, setState] = useState({
    loading: true,
    error: "",
    survey: {},
  })

  useEffect(()=>{
 setState({ ...state, loading: true });
    if (router && router.query && router.query.id) {
      const survey =  getSurveyResultById(router.query.id);
      if (survey.success)
       setState({ ...state, survey: survey.data, loading: false });
      else
       setState({
         ...state,
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
  },[])

  

  const onValueChanged = (result) => {}

  const onComplete = async (result) => {

    const resultid = state.survey.id;
    const userid = 14;
    const surveyid = state.survey.surveyid;
    const surveyresultJSON = JSON.stringify(result.data);
    const postSurveyResponse = await updateSurveyResult(
      resultid,
      userid,
      surveyid,
      surveyresultJSON
    );
  };

 
    const { loading, error } = state;
    if (loading) return <Loader />;
    if (error) return <ErrorMessage errorMessage={error} />;
    var model = new Survey.Model(
      state.survey ? state.survey.surveyJSON : ""
    );
    const resultJSON =
      state.survey && state.survey.surveyresultJSON
        ? JSON.parse(state.survey.surveyresultJSON)
        : "";
    if (resultJSON) model.data = resultJSON;

    if (state.survey) {
      return (
        <>
          <Container className="mt--12" fluid>
            <Row className="justify-content-center">
              <h1>Surveys</h1>
            </Row>
            <Row>
              <h2>SurveyJS Library - a sample survey below</h2>
              <Survey.Survey
                model={model}
                onComplete={onComplete}
                onValueChanged={onValueChanged}
              />
            </Row>
          </Container>
          {/* <SimpleHeader name="Buttons" parentName="Examples" /> */}
          {/* <Container className="mt--6" fluid>
              <Row>Hello</Row>
            </Container> */}
        </>
      );
    }

    return <ErrorMessage error="No Survey data found" />;
  }

SurveyResultSinglePage.layout = Admin;

export default SurveyResultSinglePage;
// class SurveyResultSinglePage extends Component {
//   state = {
//     loading: true,
//     error: "",
//     survey: {},
//   };
//   const [session, loading] = useSession();

//   async componentDidMount() {
//     this.setState({ ...this.state, loading: true });
//     if (router && router.query && router.query.id) {
//       const survey = await getSurveyResultById(router.query.id);
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

//   onValueChanged(result) {}

//   onComplete = async (result) => {

//     const resultid = this.state.survey.id;
//     const userid = 14;
//     const surveyid = this.state.survey.surveyid;
//     const surveyresultJSON = JSON.stringify(result.data);
//     const postSurveyResponse = await updateSurveyResult(
//       resultid,
//       userid,
//       surveyid,
//       surveyresultJSON
//     );
//   };

//   render() {
//     const { loading, error } = this.state;
//     if (loading) return <Loader />;
//     if (error) return <ErrorMessage errorMessage={error} />;
//     var model = new Survey.Model(
//       this.state.survey ? this.state.survey.surveyJSON : ""
//     );
//     const resultJSON =
//       this.state.survey && this.state.survey.surveyresultJSON
//         ? JSON.parse(this.state.survey.surveyresultJSON)
//         : "";
//     if (resultJSON) model.data = resultJSON;

//     if (this.state.survey) {
//       return (
//         <>
//           <Container className="mt--12" fluid>
//             <Row className="justify-content-center">
//               <h1>Surveys</h1>
//             </Row>
//             <Row>
//               <h2>SurveyJS Library - a sample survey below</h2>
//               <Survey.Survey
//                 model={model}
//                 onComplete={this.onComplete}
//                 onValueChanged={this.onValueChanged}
//               />
//             </Row>
//           </Container>
//           {/* <SimpleHeader name="Buttons" parentName="Examples" /> */}
//           {/* <Container className="mt--6" fluid>
//               <Row>Hello</Row>
//             </Container> */}
//         </>
//       );
//     }

//     return <ErrorMessage error="No Survey data found" />;
//   }
// }

// SurveyResultSinglePage.layout = Admin;

// export default SurveyResultSinglePage;
