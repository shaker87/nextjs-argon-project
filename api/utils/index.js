export const generateSurveyResultsData = (data) => {
  let surveyResultData = [];
  if (data) {
    console.log("DATA IN UTILS", data);
    data.map((survey) => {
      const surveyResult = survey.surveyresultJSON
        ? JSON.parse(survey.surveyresultJSON)
        : {};
      surveyResultData.push(surveyResult);
    });
  }

  return surveyResultData;
};
