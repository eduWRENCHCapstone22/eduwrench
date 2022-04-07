import React, { useState, useEffect } from "react"
import { Formik } from "formik"
import {Form, Radio} from "semantic-ui-react"
import axios from "axios"
import FeedbackSignIn from "./feedback_signin"

const Feedback = ({feedback_key, useful, quality}) => {
  const [auth, setAuth] = useState("false")

  useEffect(() => {
    setAuth(localStorage.getItem("login"))
  })

//   useEffect(() => {
//     setAuth(localStorage.getItem("login"))
//     axios
//         .post('http://localhost:3000/get/feedback', {
//           // user_name: localStorage.getItem("userName"),
//           // email: localStorage.getItem("currentUser"),
//           feedback_key: feedback_key,
//         })
//         .then((response) => {
//           setFeedbakMsg(response.data.feedbackMsg)
//           setCompleted(response.data.completed)
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }, [])
  
  return (
    auth === "true" ? (
    <>
        <Formik
          initialValues={{
            useful: '',
            quality: '',
            comments: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const feedback = {
                user_name: localStorage.getItem("userName"),
                email: localStorage.getItem("currentUser"),
                feedback_key: feedback_key,
                useful: values.useful,
                quality: values.quality,
                comments: values.comments,
              }
              axios
                .post("http://localhost:3000/update/feedback", feedback)
                .then(response => response)
                .catch(err => {
                  console.error(err)
                })
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            checked,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <p>
                <strong>[#1]</strong> How useful did you find the modules in
                learning the topic?
              </p>
            {useful.map((choice) =>
                <Form.Field key={choice}>
                  <Radio
                      name="useful"
                      label={choice}
                      id={choice}
                      value={choice}
                      checked={values.useful === choice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                </Form.Field>
            )}
              <p>
                <strong>[#2]</strong> Rate the quality of the modules?
              </p>
              {quality.map((choice) =>
                <Form.Field key={choice}>
                  <Radio
                      name="quality"
                      label={choice}
                      id={choice}
                      value={choice}
                      checked={values.quality === choice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                </Form.Field>
            )}
              <p>
                <strong>[#3]</strong> Please provide constructing comments to
                improve the content
              </p>
              <Form.TextArea
                fluid
                name="comments"
                placeholder="Enter answer here..."
                type="text"
                cols="70"
                rows="3"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comments}
              />
              <Form.Button color="teal" type="submit" disabled={isSubmitting}>
                Submit
              </Form.Button>
            </Form>
          )}
        </Formik>
    </>
    ) : (
      <FeedbackSignIn />
    )
  )
}

export default Feedback