import React from 'react'

function Article(props) {
  return (
    <div className='test'>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
    </div>
  )
}

export default Article