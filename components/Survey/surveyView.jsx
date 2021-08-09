import React from "react";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";
import { postSurveyResult } from "../../pages/api/surveys";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";
import { Component } from "react";
import Router from "next/router";
//import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
//require("icheck");

Survey.StylesManager.applyTheme("winter");

//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);


 const SurveyView = (props) => {
  const onComplete = async (result, options) => {
    // this.setState({ ...this.state, error: "" });
    const user = JSON.parse(localStorage.getItem("user"));

    const userid = user.id;
    console.log('userid :>> ', userid);
    const surveyid = props.survey.id;
    console.log('surveyid :>> ', surveyid);
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


    const { data } = props;
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

// class SurveyView extends Component {
//   onComplete = async (result, options) => {
//     // this.setState({ ...this.state, error: "" });
//     const user = JSON.parse(localStorage.getItem("user"));

//     const userid = user.id;
//     const surveyid = this.props.survey.id;
//     const surveyname = this.props.survey.surveyname;
//     const surveydescription = this.props.survey.surveyJSON.description;
//     const surveyresultJSON = JSON.stringify(result.data);
//     const postSurveyResponse = await postSurveyResult(
//       userid,
//       surveyid,
//       surveyresultJSON,
//       surveyname,
//       surveydescription
//     );
//     if (postSurveyResponse && postSurveyResponse.success) {
//       Router.push(`/surveys/surveyAnalytics?id=${surveyid}`);
//     } // } else {
//     //   this.setState({ ...this.state, error: "Server Error" });
//     // }
//   };

//   render() {
//     const { data } = this.props;
//     var model = new Survey.Model(data);
//     return (
//       <>
//         <Survey.Survey
//           model={model}
//           onComplete={this.onComplete}
//           //   onValueChanged={onValueChanged}
//         />
//       </>
//     );
//   }
// }

// export default SurveyView;
