const React = require('react')
const Default = require('./layouts/Default')

function Index ({breads, title})  {
    return (
      <Default title={title}>
  <h2>Index Page</h2>
    {/* This is a JSX comment. */}
    {/* <p>I have {breads[0].name} bread!</p> */}
    <ul>
      {
        breads.map((breads, index)=> {
          return (<li key={index}>
            <a href={`/breads/${index}`}>
              {breads.name}
            </a>
          </li>)
        })
      }
    </ul>
</Default>

    )
}

module.exports = Index

