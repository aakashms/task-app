import React from 'react';
import { useState } from 'react'

function Task({title, due, description}) {

  return (
    <div className='taskLine'>
    <p className='title'>{title}</p>
    <p className='message'>Click to view description</p>
    <p >{due} </p>

   
    </div>
  )
}

export default Task