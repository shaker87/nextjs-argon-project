import React, { useState, useEffect } from "react";
import { getAllSurveys } from "../api/surveys";
import Spinner from "components/Spinner";
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

const surveys = () => {
  const [surveys, setSurveys] = useState();
  const [surveysError, setSurveysError] = useState(false);
  const [surveysData, setSurveysData] = useState([]);
  const [surveysLoading, setSurveysLoading] = useState(true);

  useEffect(() => {
    setSurveysLoading(true);
    const getSurveys = async () => {
      try {
        setSurveysLoading(true);
        const response = await getAllSurveys();
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
  if (surveysData) {
    return (
      <>
        <Container className="mt--12" fluid>
          <Row className="justify-content-center">
            <h1>Surveys</h1>
          </Row>
          <Row className="pt--9">
            {surveysData.map((survey, i) => {
              return (
                <Col md="4">
                  <Card className="bg-gradient-default">
                    <CardBody>
                      <CardTitle className="text-white" tag="h3">
                        {survey.surveyname}
                      </CardTitle>
                      <blockquote className="blockquote text-white mb-0">
                        <p>
                          {survey.surveyJSON
                            ? survey.surveyJSON.description
                            : ""}
                        </p>
                        <Button
                          className="btn-neutral"
                          color="default"
                          href={`/surveys/survey?id=${survey.id}`}
                          size="sm"
                        >
                          Take this survey
                        </Button>
                      </blockquote>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
};
surveys.layout = Admin;

export default surveys;
