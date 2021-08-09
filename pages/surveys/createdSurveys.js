import React, { Component, useEffect, useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import Loader from "components/Spinner";
import ErrorMessage from "components/Error";
import { Link } from "next/link";
import CardsHeader from "components/Headers/CardsHeader.js";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import Admin from "layouts/Admin.js";

//import { getAllSurveysByUserId } from "../../api/surveys";
import { getAllSurveysByUserId } from "../api/surveys";

const CreatedSurveys = () => {
  const [state, setState] = useState({
    loading: false,
    surveys: [],
    error: "",
  });

  

  useEffect(() => {
    setState({ ...state, loading: true });
    const userid = 14;

    const surveys = getAllSurveysByUserId(userid);
    if (surveys && surveys.success) {
      setState({ surveys: surveys.data, loading: false });
    } else {
      setState({
        error: "Server Error while fetching Surveys",
        surveys: [],
        loading: false,
      });
    }
  }, []);

  const { loading, surveys, error } = state;
  console.log('surveys :>> ', surveys);
  console.log('loading :>> ', loading);
  console.log('error :>> ', error);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage errorMessage={error} />;
  if (state.surveys)
    return (
      <>
        <Container className="mt--12" fluid>
          <Row className="justify-content-center">
            <h1>Surveys</h1>
          </Row>
          <Row className="pt--9">
            {state.surveys.map((survey) => {
              const surveyJSON = survey.surveyJSON
                ? JSON.parse(survey.surveyJSON)
                : {};
              console.log("SURVEY JSON", surveyJSON);
              return (
                <Col md="4">
                  <Card className="bg-gradient-default">
                    <CardBody>
                      <CardTitle className="text-white" tag="h3">
                        {survey.surveyname}
                      </CardTitle>
                      <blockquote className="blockquote text-white mb-0">
                        <p>{surveyJSON ? surveyJSON.description : ""}</p>
                        {/* <Link href="/about"> */}
                        <Button
                          className="btn-neutral"
                          color="default"
                          href={`/surveys/editSurvey?id=${survey.id}`}
                          size="sm"
                        >
                          Edit Survey
                        </Button>
                        {/* </Link> */}
                      </blockquote>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        {/* <SimpleHeader name="Buttons" parentName="Examples" /> */}
        {/* <Container className="mt--6" fluid>
          <Row>Hello</Row>
        </Container> */}
      </>
    );

  return <ErrorMessage errorMessage="No Surveys Found" />;
};

CreatedSurveys.layout = Admin;

export default CreatedSurveys;

// class CreatedSurveys extends Component {
//   state = {
//     loading: false,
//     surveys: [],
//     error: "",
//   };

//   async componentDidMount() {
//     this.setState({ ...this.state, loading: true });
//     const userid = 14;

//     const surveys = await getAllSurveysByUserId(userid);
//     if (surveys && surveys.success) {
//       this.setState({ surveys: surveys.data, loading: false });
//     } else {
//       this.setState({
//         error: "Server Error while fetching Surveys",
//         surveys: [],
//         loading: false,
//       });
//     }
//   }

//   render() {
//     const { loading, surveys, error } = this.state;
//     if (loading) return <Loader />;
//     if (error) return <ErrorMessage errorMessage={error} />;
//     if (this.state.surveys)
//       return (
//         <>
//           <Container className="mt--12" fluid>
//             <Row className="justify-content-center">
//               <h1>Surveys</h1>
//             </Row>
//             <Row className="pt--9">
//               {this.state.surveys.map((survey) => {
//                 const surveyJSON = survey.surveyJSON
//                   ? JSON.parse(survey.surveyJSON)
//                   : {};
//                 console.log("SURVEY JSON", surveyJSON);
//                 return (
//                   <Col md="4">
//                     <Card className="bg-gradient-default">
//                       <CardBody>
//                         <CardTitle className="text-white" tag="h3">
//                           {survey.surveyname}
//                         </CardTitle>
//                         <blockquote className="blockquote text-white mb-0">
//                           <p>{surveyJSON ? surveyJSON.description : ""}</p>
//                           {/* <Link href="/about"> */}
//                           <Button
//                             className="btn-neutral"
//                             color="default"
//                             href={`/surveys/editSurvey?id=${survey.id}`}
//                             size="sm"
//                           >
//                             Edit Survey
//                           </Button>
//                           {/* </Link> */}
//                         </blockquote>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 );
//               })}
//             </Row>
//           </Container>
//           {/* <SimpleHeader name="Buttons" parentName="Examples" /> */}
//           {/* <Container className="mt--6" fluid>
//           <Row>Hello</Row>
//         </Container> */}
//         </>
//       );

//     return <ErrorMessage errorMessage="No Surveys Found" />;
//   }
// }

// CreatedSurveys.layout = Admin;

// export default CreatedSurveys;
