import React, { Component } from "react";
import * as SurveyKo from "survey-knockout";
import Router from "next/router";
import { createSurvey, updateSurvey } from "../../pages/api/surveys";

import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";
import { toast } from "react-toastify";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("default");

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class SurveyCreator extends Component {
  surveyCreator;
  componentDidMount() {
    console.log("window.innerHeight", window.innerHeight);
    const data = this.props.data ? this.props.data : {};
    console.log("DATA IN SURVEY CREATOR", data);
    let options = { showEmbededSurveyTab: true };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(null, options);
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    this.surveyCreator.tabs().push({
      name: "survey-templates",
      title: "My Custom Tab",
      template: "custom-tab-survey-templates",
      action: () => {
        this.surveyCreator.makeNewViewActive("survey-templates");
      },
      data: {},
    });
    this.surveyCreator.render("surveyCreatorContainer");
    this.surveyCreator.JSON = this.props.data ? this.props.data : {};
  }
  render() {
    if (typeof window !== "undefined") {
      return (
        // <Container className="mt--12" fluid>
        //   <Row className="justify-content-center">
        //     <h1>Create Surveys</h1>
        //   </Row>
        //   <Row className="pt--9">
        <div>
          <script type="text/html" id="custom-tab-survey-templates">
            {`<div id="test">TEST</div>`}
          </script>

          <div id="surveyCreatorContainer" />
        </div>
        //   </Row>
        // </Container>
      );
    }
  }
  saveMySurvey = async () => {
    if (typeof window === "undefined") {
      return;
    }
    let surveyname = "";
    let surveyDescription = "";
    console.log("THIS IS SURVEY CREATOR TEXT", this.surveyCreator.text);
    const surveyJSON = this.surveyCreator.text;
    // ? JSON.stringify(this.surveyCreator.text)
    // : "";
    console.log("JSON", surveyJSON);
    const surveyObj = this.surveyCreator.text
      ? JSON.parse(this.surveyCreator.text)
      : "";
    console.log("SURVEY OBJE", surveyObj);
    if (surveyObj) {
      surveyname = surveyObj && surveyObj.title ? surveyObj.title : "";
      surveyDescription =
        surveyObj && surveyObj.description ? surveyObj.description : "";
    }
    if (!surveyname) {
      toast.error("Survey title is missing", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        // progress: undefined,
      });
      return;
    }

    if (!surveyDescription) {
      toast.error("Survey Description is missing", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        // progress: undefined,
      });
      return;
    }

    const userid = 14;

    const surveyid = this.props.surveyid ? this.props.surveyid : "";
    if (this.props.data) {
      console.log("HIT");
      const updatedSurvey = await updateSurvey(
        surveyid,
        surveyname,
        surveyJSON,
        userid
      );
      console.log("UPDATED SURVEY", updateSurvey);
      if (updatedSurvey && updatedSurvey.success) {
        toast.success("Successfully saved the survey", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: true,
          draggable: true,
          // progress: undefined,
        });
        Router.push("/surveys/createdSurveys");
        return;
      }
    } else {
      console.log("HIT 2");
      const saveSurvey = await createSurvey(surveyname, surveyJSON, userid);
      if (saveSurvey && saveSurvey.success) {
        toast.success("Successfully saved the survey", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: true,
          draggable: true,
          // progress: undefined,
        });

        Router.reload(window.location.pathname);
        return;
      }
    }

    toast.error("Survey error", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      // pauseOnHover: true,
      draggable: true,
      // progress: undefined,
    });
  };
}

export default SurveyCreator;
