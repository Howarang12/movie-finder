${document}.ready(() =>{
  $('#title').autocomplete({
      source: async function(req, res) {
          let data = await fetch(`http://localhost:8000/search?query=${req.term}`)
              .then(results => results.json())
              .then(results => results.map(result => {
                return {
                  label: result.title,
                  value: result.title,
                  id: result._id
                }
              }))
              res(data)
        }, 
      minLength: 2,
      select: (event, ui) => {
        console.log(ui.item.id)
        fetch(`http://localhost:8000/get/${ui.item.id}`)
            .then(result => result.json())
            .then(result => {
              $('#cast').empty()
              results.cast.forEach(cast => {
                $('#cast').append(`<li>${cast.name}</li>`)
              })
              $('img').attr('src', result.poster)
            })
      }
    })
})