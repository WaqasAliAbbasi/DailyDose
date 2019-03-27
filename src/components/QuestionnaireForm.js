import React from "react";
import { Box, Text, Form, Button, Select } from "grommet";
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
        const responses = {};
        questions.forEach(question => {
          responses[question.id] = question.choices.find(
            choice => choice.content === values[question.id]
          ).id;
        });
        onSubmit({
          id,
          responses
        });
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        isSubmitting,
        setFieldValue,
        isValid
      }) => (
        <Form onSubmit={handleSubmit}>
          {questions.map(question => {
            return (
              <Box key={question.id} pad="xsmall">
                <Text margin="xsmall">{question.content}</Text>
                <Select
                  options={question.choices.map(choice => choice.content)}
                  value={values[question.id] || ""}
                  onChange={({ option }) => setFieldValue(question.id, option)}
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
