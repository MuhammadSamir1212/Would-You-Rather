import React from 'react'

function ErrorPage() {
  return(
    <div>
      <div className='page-404'>
        <p>404</p>
        <h1>
          Sorry, the page or question you're looking for doesn't exist.
        </h1>
        <h2>
          pleas go back to <a href='/'>Home</a>
        </h2>
      </div>
    </div>
  )
}
export default ErrorPage