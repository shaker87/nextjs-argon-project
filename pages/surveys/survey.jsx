import React, { useState, useEffect } from "react";
import { getSurveyById } from "../api/surveys";
import dynamic from "next/dynamic";
import Spinner from "components/Spinner";
import { useSession } from "next-auth/client";

import {
  Container,
  Row,
  Button,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import ErrorMessage from "components/Error";

const SurveyView = dynamic(
  () => import("../../components/Survey/surveyView"),
  {
    ssr: false,
  }
);

const surveys = () => {
  const [session, loading] = useSession([]);
  //console.log(`session.id`, userid1);
  const [surveys, setSurveys] = useState();
  const [surveysError, setSurveysError] = useState(false);
  const [surveysData, setSurveysData] = useState([]);
  const [surveysLoading, setSurveysLoading] = useState(true);

  useEffect(() => {
    setSurveysLoading(true);
    const getSurveys = async () => {
      try {
        setSurveysLoading(true);
        const response = await getSurveyById(22);
        setSurveys(response);
        const responseData = response.data;
        setSurveysData(responseData);
        setSurveysLoading(false);
      } catch (error) {
        console.log(error);
        setSurveysError(true);
        setSurveysLoading(false);
      }
    };
    getSurveys();
    setSurveysLoading(false);
  }, []);

  <SimpleHeader title="Test Page for Session" lead="" />;

  if (surveysLoading) return <Spinner />;
  //if (surveysError) return <ErrorMessage errorMessage={error} />;
  if (!surveysData) return null;
  console.log(`surveysData`, surveysData);
  if (surveysData) {
    const data =
      surveysData && surveysData.surveyJSON
        ? JSON.parse(surveysData.surveyJSON)
        : "";
    console.log("DATA", data);

    return (
      <>
        <Container className="mt--12" fluid>
          <Row className="justify-content-center">
            <h1>Survey</h1>
          </Row>
          <Row>
            <SurveyView data={data} survey={surveysData} />
            {/* <Survey.Survey model={model} onComplete={this.onComplete} /> */}
          </Row>
        </Container>
      </>
    );
  }
};
surveys.layout = Admin;

export default surveys;
