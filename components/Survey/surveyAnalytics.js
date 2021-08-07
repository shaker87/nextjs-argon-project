import React, { Component, useEffect } from "react";
import { VisualizationPanel } from "survey-analytics";
import "survey-analytics/survey.analytics.css";
import * as Survey from "survey-react";

const SurveyAnalytics = (props) => {
  let visPanel;
  useEffect(()=>{
    if (props.data && props.json) {
      const survey = new Survey.SurveyModel(props.json);
      visPanel = new VisualizationPanel(
        survey.getAllQuestions(),
        props.data
      );
      visPanel.render(document.getElementById("summaryContainer"));
    }
  },[])
  return (
    <div id="summaryContainer"></div>
  )
}

export default SurveyAnalytics;


// export default class SurveyAnalytics extends Component {
//   visPanel;
//   componentDidMount() {
//     if (this.props.data && this.props.json) {
//       const survey = new Survey.SurveyModel(this.props.json);
//       this.visPanel = new VisualizationPanel(
//         survey.getAllQuestions(),
//         this.props.data
//       );
//       this.visPanel.render(document.getElementById("summaryContainer"));
//     }
//   }
//   render() {
//     return <div id="summaryContainer"></div>;
//   }
// }