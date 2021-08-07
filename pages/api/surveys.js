import axios from "axios";
import { getSession } from "next-auth/client";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;


export const createSurvey = async (surveyname, surveyJSON, userid) => {
  const session = await getSession();
  const jwt = session.jwt;
  const surveysUrl = `${API_URL}/surveys`;

  try {
    const postSurveyResponse = await axios.post(
      postSurveyUrl,
      { surveyname, surveyJSON, userid },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    return {
      success: 1,
    };
  } catch (e) {
    return {
      success: 0,
    };
  }
};

export const getAllSurveys = async () => {
  const session = await getSession();
  const jwt = session.jwt;
  const surveysUrl = `${API_URL}/surveys`;

  try {
    const surveys = await axios.get(surveysUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return {
      success: 1,
      data: surveys.data,
    };
  } catch (e) {
    return { success: 0, data: [] };
  }
};

export const getAllSurveysByUserId = async (userid) => {
  const session = await getSession();
  const jwt = session.jwt;
  const surveysUrl = `${API_URL}/surveys?userid=${session.id}`;

  try {
    const surveys = await axios.get(surveysUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return {
      success: 1,
      data: surveys.data,
    };
  } catch (e) {
    return { success: 0, data: [] };
  }
};

export const getSurveyById = async (id) => {
  const session = await getSession();
  const jwt = session.jwt;
  const surveyUrl = `${API_URL}/surveys/${id}`;

  try {
    const survey = await axios.get(surveyUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log(survey.data);
    return {
      success: 1,
      data: survey.data,
    };
  } catch (e) {
    return {
      success: 0,
      data: {},
    };
  }
};

export const updateSurvey = async (
  surveyid,
  surveyname,
  surveyJSON,
  userid
) => {
  const session = await getSession();
  const jwt = session.jwt;
  const updateSurveyUrl = `${API_URL}/surveys/${surveyid}`;

  try {
    const postSurveyResponse = await axios.put(
      updateSurveyUrl,
      { surveyname, surveyJSON, userid },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    if (postSurveyResponse && postSurveyResponse.data)
      return {
        success: 1,
      };
  } catch (e) {
    return {
      success: 0,
    };
  }
};

export const postSurveyResult = async (
  userid,
  surveyid,
  surveyresultJSON,
  surveyname,
  surveydescription
) => {
  const postSurveyUrl = `${API_URL}/surveyresults`;
  const session = await getSession();
  const jwt = session.jwt;

  try {
    const postSurveyResponse = await axios.post(
      postSurveyUrl,
      { userid, surveyid, surveyresultJSON, surveyname, surveydescription },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    if (postSurveyResponse) {
      return {
        success: 1,
      };
    }
  } catch (e) {
    return { success: 0 };
  }
};

export const updateSurveyResult = async (
  resultid,
  userid,
  surveyid,
  surveyresultJSON
) => {
  const session = await getSession();
  const jwt = session.jwt;
  const postSurveyUrl = `${API_URL}/surveyresults/${resultid}`;

  try {
    const postSurveyResponse = await axios.put(
      postSurveyUrl,
      { userid, surveyid, surveyresultJSON },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
  } catch (e) {}
};

export const getSurveysByUserId = async (userid) => {
  let response = {};
  const session = await getSession();
  const jwt = session.jwt;
  const suverysByUserUrl = `${API_URL}/surveyresults/?userid=${userid}`;

  try {
    const surveys = await axios.get(suverysByUserUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (surveys && surveys.status === 200) {
      response.success = 1;
      response.data = surveys.data;
    }
    return response;
  } catch (e) {
    response.success = 0;
    return response;
  }
};

export const getAllSurveyResultsBySurveyId = async (surveyid) => {
  const session = await getSession();
  const jwt = session.jwt;
  const surveyUrl = `${API_URL}/surveyresults/?surveyid=${surveyid}`;

  let response = {};
  try {
    const surveys = await axios.get(surveyUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (surveys && surveys.status === 200) {
      response.success = 1;

      response.data = surveys.data;
    }
    return response;
  } catch {
    response.success = 0;
    return response;
  }
};

export const getSurveyResultById = async (id) => {
  const surveyUrl = `${API_URL}/surveyresults/${id}`;
  const session = await getSession();
  const jwt = session.jwt;

  let response = {};
  try {
    const survey = await axios.get(surveyUrl, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (survey && survey.status === 200) {
      const surveyFound = await getSurveyById(survey.data.surveyid);

      response.success = 1;
      survey.data.surveyJSON = surveyFound.data.surveyJSON;
      response.data = survey.data;
    }
    return response;
  } catch {
    response.success = 0;
    return response;
  }
};