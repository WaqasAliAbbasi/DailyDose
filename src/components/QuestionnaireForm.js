import React from "react";
import { Box, Text, RadioButtonGroup, Form, Button } from "grommet";
import { Formik } from "formik";

const QuestionnaireForm = ({ id, questions, onSubmit }) => {
  questions = questions || [];
  const initialValues = {};
  questions.forEach(question => (initialValues[question.id] = ""));
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        questions.forEach(question => {
          if (!values[question.id]) {
            errors[question.id] = "Required";
          }
        });
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({
          id,
          responses: { ...values }
        });
        setSubmitting(false);
      }}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        isValid
      }) => (
        <Form onSubmit={handleSubmit}>
          {questions.map(question => {
            return (
              <Box key={question.id} pad="xsmall">
                <Text margin="xsmall">{question.content}</Text>
                <RadioButtonGroup
                  name={`${question.id}`}
                  options={question.choices.map(choice => choice.content)}
                  value={
                    values[question.id] &&
                    question.choices.find(
                      choice => choice.id === values[question.id]
                    ).content
                  }
                  onChange={event => {
                    const valueID = question.choices.find(
                      choice => choice.content === event.target.value
                    ).id;
                    setFieldValue(question.id, valueID);
                  }}
                />
                <Text size="small" color="status-error" margin="xsmall">
                  {errors[question.id]}
                </Text>
              </Box>
            );
          })}
          <Button
            type="submit"
            primary
            label="Submit"
            disabled={isSubmitting || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
};

export default QuestionnaireForm;
