import React from "react";
import { connect } from "react-redux";
import { Box, Heading, Meter, Text } from "grommet";
import QuestionnaireForm from "./QuestionnaireForm";

import { questionnaire } from "../actions";

class Questionnaire extends React.Component {
  componentDidMount() {
    this.props.getQuestionnaire();
  }

  render() {
    const {
      questionnaire: { id, title, questions },
      error,
      success,
      message,
      processing
    } = this.props.questionnaire;
    const { submitQuestionnaire } = this.props;
    return (
      <Box pad="medium">
        <Heading level="4" margin="small">
          {title}
        </Heading>
        <Box>
          {processing && (
            <Meter
              values={[
                {
                  value: 60,
                  label: "sixty"
                }
              ]}
              type="circle"
              round={true}
              size="xsmall"
            />
          )}

          {/* Show success or error messages */}
          {success && <Text>Your responses have been recorded</Text>}
          {error && <Text color="status-critical">{message}</Text>}

          {/* Do not show form when processing */}
          {!processing && !success && (
            <QuestionnaireForm
              id={id}
              questions={questions}
              onSubmit={submitQuestionnaire}
            />
          )}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionnaire: state.questionnaire
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestionnaire: id => {
      dispatch(questionnaire.getQuestionnaire(id));
    },
    submitQuestionnaire: form => {
      dispatch(questionnaire.submitQuestionnaire(form));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questionnaire);
