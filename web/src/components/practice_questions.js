import React from "react"
import { Header, Segment } from "semantic-ui-react"
import Textbox from "./practice-questions/textbox";
import MultiChoice from "./practice-questions/multichoice"
import Hint from "./practice-questions/hint"

const PracticeQuestions = ({ header = null, questions }) => {

  let questionsHeader = <></>
  const panels = []

  if (header) {
    questionsHeader = (<>{header}</>)
  }

  /* Indexing to go through entries of questions */
  for (const [index, value] of questions.entries()) {
    panels.push({
      key: value.key,
      title: {
        content: (<><strong>[{value.key}]</strong> {value.question}</>)
      },
      content: {
        content: (<Segment style={{ borderLeft: "3px solid #999" }}>{value.content}</Segment>), hint: (<Hint/>)},
      type: value.type
      },)
    }

  return (
    <>
      <Header as="h3" block>
        Practice Questions
      </Header>

      {questionsHeader}
      <div>
        {panels.map(({ title, key, type, content }) => (
            <><p key={key}>{title.content} {content.hint}</p> {(type === "textbox") ? <Textbox/> : <MultiChoice/>} </>
        ))}
      </div>
    </> 
  )
}

export default PracticeQuestions;
