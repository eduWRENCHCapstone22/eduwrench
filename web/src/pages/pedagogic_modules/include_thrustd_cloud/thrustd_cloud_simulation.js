import React, { useEffect, useState } from "react"
import axios from "axios"
import { Form, Segment, Checkbox, Label, Grid, Container } from "semantic-ui-react"
import { Formik } from "formik"
import SimulationOutput from "../../../components/simulation/simulation_output"
import SimulationScenario from "../../../components/simulation/simulation_scenario"
import GanttChart from "../../../components/charts/gantt_chart"
import HostUtilizationChart from "../../../components/charts/host_utilization_chart"
import TasksData from "../../../components/simulation/tasks_data"
import SimulationSignIn from "../../../components/simulation/simulation_signin"
import TaskSlider from "./task_slider"
import {
    validateFieldInRange
} from "../../../components/simulation/simulation_validation"

import MontageWorkflow from "../../../images/vector_graphs/thrustd/montage_workflow.svg"

const Thrustd_Cloud_Simulation = () => {

    const [simulationResults, setSimulationResults] = useState(<></>)
    const [auth, setAuth] = useState("false")

    useEffect(() => {
        setAuth(localStorage.getItem("login"))
    })

    return (
        auth === "true" ? (
            <>
                <SimulationScenario scenario={<MontageWorkflow/>} />

                <Segment.Group>
                    <Segment color="teal"><strong>Simulation Parameters</strong></Segment>
                    <Segment>
                        <Formik
                            initialValues={{
                                numHosts: 1,
                                pstate: 0,
                                cloudHosts: 0,
                                numVmInstances: 0,
                                mProjectLocal: 0,
                                mDiffFitLocal: 0,
                                mConcatFitLocal: "",
                                mBgModelLocal: "",
                                mBackgroundLocal: 0,
                                mImgtblLocal: "",
                                mAddLocal: "",
                                mViewerLocal: ""
                            }}

                            validate={values => {
                                const errors = {}
                                // if (!validateFieldInRange("num-hosts-label", values.numHosts, 1, 128, "XXX", "Host(s)")) {
                                //     errors.numHosts = "ERROR"
                                // }
                                // if (!validateFieldInRange("pstate-label", values.pstate, 0, 6, "pstate:", "YYY")) {
                                //     errors.pstate = "ERROR"
                                // }
                                return errors
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    if (localStorage.getItem("login") !== "true") {
                                        setSimulationResults(<></>)
                                        return
                                    }
                                    const userEmail = localStorage.getItem("currentUser")
                                    const data = {
                                        userName: userEmail.split("@")[0],
                                        email: userEmail,
                                        num_hosts: values.numHosts,
                                        pstate: values.pstate,
                                        cloudHosts: values.cloudHosts,
                                        numVmInstances: values.numVmInstances,
                                        mProjectLocal: values.mProjectLocal,
                                        mDiffFitLocal: values.mDiffFitLocal,
                                        mConcatFitLocal: values.mConcatFitLocal,
                                        mBgModelLocal: values.mBgModelLocal,
                                        mBackgroundLocal: values.mBackgroundLocal,
                                        mImgtblLocal: values.mImgtblLocal,
                                        mAddLocal: values.mAddLocal,
                                        mViewerLocal: values.mViewerLocal
                                    }
                                    setSimulationResults(<></>)
                                    axios.post(window.location.protocol + "//" + window.location.hostname + ":3000/run/thrustd_cloud", data).then(
                                        response => {
                                            setSimulationResults(
                                                <>
                                                    <SimulationOutput output={response.data.simulation_output} />
                                                    <GanttChart data={response.data.task_data} />
                                                    <HostUtilizationChart data={response.data.task_data} />
                                                    <TasksData data={response.data.task_data} />
                                                </>
                                            )
                                        },
                                        error => {
                                            console.log(error)
                                            alert("Error executing simulation.")
                                        }
                                    )
                                    setSubmitting(false)
                                }, 400)
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group widths="equal">
                                        <Form.Input fluid name="numHosts"
                                                    label="Number of Hosts"
                                                    placeholder="1"
                                                    type="number"
                                                    min={1}
                                                    max={128}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.numHosts}
                                                    error={errors.numHosts && touched.numHosts ? {
                                                        content: "Please provide the number of hosts in the range of [1, 128].",
                                                        pointing: "above"
                                                    } : null}
                                        />
                                        <Form.Input fluid
                                                    name="pstate"
                                                    label="Pstate Value"
                                                    placeholder="0"
                                                    type="number"
                                                    min={0}
                                                    max={6}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.pstate}
                                                    error={errors.pstate && touched.pstate ? {
                                                        content: "Please provide the pstate in the range of [0, 6].",
                                                        pointing: "above"
                                                    } : null}
                                        />
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Input fluid name="cloudHosts"
                                                    label="Number of Cloud Hosts"
                                                    placeholder="0"
                                                    type="number"
                                                    min={0}
                                            // not sure how many is the max for cloud hosts
                                                    max={128}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.cloudHosts}
                                                    error={errors.cloudHosts && touched.cloudHosts ? {
                                                        content: "Please provide the number of cloud hosts in the range of [0, 128].",
                                                        pointing: "above"
                                                    } : null}
                                        />
                                        <Form.Input fluid
                                                    name="numVmInstances"
                                                    label="Number of VM Instances"
                                                    placeholder="0"
                                                    type="number"
                                                    min={0}
                                            // again not sure of the max value
                                                    max={128}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.numVmInstances}
                                                    error={errors.numVmInstances && touched.numVmInstances ? {
                                                        content: "Please provide the number of VM instances in the range of [0, 128].",
                                                        pointing: "above"
                                                    } : null}
                                        />
                                    </Form.Group>
                                    <Segment>
                                        <Segment><strong>Task Distribution</strong></Segment>
                                        <Grid>
                                            <Grid.Row>
                                                <TaskSlider name="mProjectLocal" color="blue" onChange={handleChange} onBlur={handleBlur} value={values.mProjectLocal}/>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <TaskSlider name="mDiffFitLocal" color="pink" onChange={handleChange} onBlur={handleBlur} value={values.mDiffFitLocal}/>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Checkbox slider name="mConcatFitLocal" onChange={handleChange} onBlur={handleBlur} value={values.mConcatFitLocal}/>
                                                <Label horizontal color="orange"> </Label>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Checkbox slider name="mBgModelLocal" onChange={handleChange} onBlur={handleBlur} value={values.mBgModelLocal}/>
                                                <Label horizontal color="green"> </Label>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <TaskSlider name="mBackgroundLocal" color="yellow" onChange={handleChange} onBlur={handleBlur} value={values.mBackgroundLocal}/>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Checkbox slider name="mImgtblLocal" onChange={handleChange} onBlur={handleBlur} value={values.mImgtblLocal}/>
                                                <Label horizontal color="blue"> </Label>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Checkbox slider name="mAddLocal" onChange={handleChange} onBlur={handleBlur} value={values.mAddLocal}/>
                                                <Label horizontal color="violet"> </Label>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Checkbox slider name="mViewerLocal" onChange={handleChange} onBlur={handleBlur} value={values.mViewerLocal}/>
                                                <Label horizontal color="red"> </Label>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                    <Form.Button color="teal" type="submit" disabled={isSubmitting}>Run Simulation</Form.Button>
                                </Form>
                            )}
                        </Formik>
                    </Segment>
                </Segment.Group>

                {simulationResults}

            </>
        ) : (
            <SimulationSignIn />
        )
    )
}

export default Thrustd_Cloud_Simulation
