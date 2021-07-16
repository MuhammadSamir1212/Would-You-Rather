import React from 'react'
import { Card,Image,Label } from 'semantic-ui-react'

function AvatarCard (props) {
  const {user} = props
  return (
    <div>
      <Card className='card-style' fluid>
        <Label className='label-style' corner ='left'/>
        <Card.Content className='leaderboard-content'>
          <div className='leaderboard-img'>
            <Image src={user.avatarURL} circular/>
          </div>
          <div className='c-style'>
            <Card.Content className='cont-style'>
              <Card.Header className='card-header'>{user.name}</Card.Header>
              <div className='p-card-style'>
                <p>Answered questions</p>
                <p>{user.questionsAnswered}</p>
              </div>
              <div className='p-card-style'>
                <p>Created questions</p>
                <p>{user.createdQuestions}</p>
              </div>
            </Card.Content>
          </div>
          <div className='leaderboard-result'>
            <Card className='leaderboard-result-card'>
              <Card.Header className='result-header'>Score</Card.Header>
              <Card.Content textAlign='center'>
                <Label circular color='red' size='huge'>{user.rank}</Label>
              </Card.Content>
            </Card>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}


export default AvatarCard