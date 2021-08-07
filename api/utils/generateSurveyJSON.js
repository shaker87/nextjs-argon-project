export const generateSurveyJSON = (surveyJSON, results) => {
  results.map((result) => {
    surveyJSON.pages.map((page, pIndex) => {
      page.elements.map((q, qIndex) => {
        if (q.name === result.name) {
          q.value = result.value;
          pageIndex = pIndex;
          questionIndex = qIndex;
        }
      });
    });
  });

  return surveyJSON;
};
