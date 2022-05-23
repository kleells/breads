const React = require('react')
const baker_seed = require('../models/baker_seed')
const Default = require('./layouts/default')

function Edit({bread, bakers}) {
    return(
        <Default>
            <h2>Edit a bread</h2>
            <form action={`/breads/${bread.id}?_method=PUT`} method="POST">
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    defaultValue={bread.name}
                />
                <label htmlFor='image'>Image</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    pattern="https?://.+" title="Include http://"
                    required
                    defaultValue={bread.image}
                />
                <label htmlFor="baker">Baker</label>
                    <select name="baker" id="baker" defaultValue={bread.baker}>
                        {bakers.map(baker => {
                            return(
                                <option value={baker.id} key={baker.id}>{baker.name}</option>
                            )
                        })}
                    </select>
                <label htmlFor='hasGluten'>Has Gluten?</label>
                <input
                    type="checkbox"
                    name="hasGluten"
                    id="hasGluten"
                    defaultChecked={bread.hasGluten}
                />
                <br />
                <input type="submit"/>                       
            </form>
            <div className="backButton">
                <a href="/breads"><button>Go back to the index</button></a>
            </div>
        </Default>
    )
}

module.exports = Edit