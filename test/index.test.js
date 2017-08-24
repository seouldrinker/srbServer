import { expect } from 'chai'
import axios from 'axios'

it('Main page content', (done) => {
  axios.get('http://localhost:3000').then((response) => {
    console.log(response.data)
    expect(response.data.split('<body>')[1].split('</body>')[0].trim())
      .to.equal('SeolReaBal')
    done()
  }).catch(err => {
    done(err)
  })
})
