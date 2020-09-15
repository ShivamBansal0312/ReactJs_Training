import React from 'react';
import './vform.css';

  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  var count=0;
  

class Vform extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          fullName: null,
          assId: null,
          pId: null,
          check: null,
          upload: null,
          comment: null,
          showOffShore: false,
          showOnShore: false,
          errors: {
            fullName: '',
            assId: '',
            pId: '',
            check: '',
            upload: '',
            comment: '',
          }
        };

        this.showOffShore = this.showOffShore.bind(this);
        this.showOnShore = this.showOnShore.bind(this);
      }

      showOffShore(event){
        event.preventDefault();

        this.setState({
          showOffShore: true,
          showOnShore: false,
        });
      }

      showOnShore(event){
        event.preventDefault();

        this.setState({
          showOnShore: true,
          showOffShore: false,
        });
      }
    
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
          case 'fullName': 
            errors.fullName = (value.length === 0 ? 'Please Enter the Associate Name' : ((value.length < 5 || value.length > 30) ? 'Accepts Alphabets, space & Min 5 to Max 30 Char' : ''));
            break;
            case 'assId': 
            var numbers = /^[0-9]+$/;
            errors.assId = (value.match(numbers) ? (value.length === 6 ? '' : 'Invalid Associate Id') : 'Please Enter Associate Id');
            break;
            case 'pId': 
            var letters = /^[0-9a-zA-Z]+$/;
            errors.pId =(value.match(letters) ? (value.length === 12 ? '' : 'Invalid Associate Id') : 'Please Enter Project Id');
            break;
            case 'check': 
            if(document.querySelector('.checkbox').checked){
              count++;
            }
            else{
              count--;
            }
            errors.check = count < 5 ? 'Please Select Min 5 Sills' : '';
            break;
          case 'upload': 
            errors.upload = !value['upload'] ? '':'Please Upload File';
            break;
          case 'comment': 
            errors.comment = value.length < 5 ? 'Please Enter Comments' : '';
            break;
          default:
            break;
        }
    
        this.setState({errors, [name]: value});
        return errors;
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
      }

      cancelForm = () => { 
        document.getElementById("create-form").reset();
      }
    
      render() {
        const {errors} = this.state;
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
              <h2>Form Validation*</h2>
              <form onSubmit={this.handleSubmit} id="create-form" noValidate>
                <div className='associateName'>
                  <label htmlFor="fullname"></label>
                  <input type='text' name='fullName' placeholder='Associate Name' onChange={this.handleChange} noValidate />
                  {errors.fullName.length > 0 && 
                    <span className='error'>{errors.fullName}</span>}
                </div>

                <div className='associateId'>
                  <label htmlFor="assId"></label>
                  <input type='text' name='assId' placeholder='Associate Id' onChange={this.handleChange} noValidate />
                  {errors.assId.length > 0 && 
                    <span className='error'>{errors.assId}</span>}
                </div>

                <div className='projectId'>
                  <label htmlFor="pId"></label>
                  <input type='text' name='pId' placeholder='Project Id' onChange={this.handleChange} noValidate />
                  {errors.pId.length > 0 && 
                    <span className='error'>{errors.pId}</span>}
                </div>
                
                <div>
                  <div className='radioButton'>
                    <input type="radio" name="location" value="offShore" onChange={this.showOffShore} />
                    <label for="offShore">OffShore</label>
                  </div>
                  {
                    this.state.showOffShore ? ( <div className='options'>
                      <select name='offShore'>
                        <option>Select</option>
                        <option value='chennai'>Chennai</option>
                        <option value='bnagalore'>Bangalore</option>
                        <option value='hyderabad'>Hyderabad</option>
                        <option value='pune'>Pune</option>
                        <option value='kochi'>Kochi</option>
                      </select>
                      </div>) : (null)
                  }
                  <div className='radioButton'>
                    <input type="radio" name="location" value="onShore" onChange={this.showOnShore} />
                    <label for="onShore">OnShore</label>
                  </div>
                  {
                    this.state.showOnShore ? ( <div className='options'>
                      <select name='onShore'>
                      <option>Select</option>
                        <option value='us'>US</option>
                        <option value='nonus'>Non US</option>
                      </select>
                      </div>) : (null)
                  }
                </div>

                <div className='checkId'>
                <label htmlFor="check"></label>
                <table>
                  <tr>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />Express JS</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />Angular8</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />HTML5,CSS3,JS</td>
                  </tr>

                  <tr>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />TypeScript</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />React JS</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />SASS</td>
                  </tr>

                  <tr>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />Bootstrap4</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />Node JS</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />ES5,ES6,ES7,...</td>
                  </tr>
                  <tr>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />Mongo DB</td>
                  <td><input type='checkbox' class="checkbox" name='check' onChange={this.handleChange} noValidate />Veu JS</td>
                  </tr>
                </table>
                  {errors.check.length > 0 && 
                    <span className='error'>{errors.check}</span>}
                </div>

                <div className='upload'>
                  <label htmlFor="upload"></label>
                  <input type='file' name='upload' onChange={this.handleChange} noValidate />
                  {errors.upload.length > 0 && 
                    <span className='error'>{errors.upload}</span>}
                </div>
                <div className='comment'>
                  <label htmlFor="comment"></label>
                  <textarea rows='4' cols='20' name='comment' placeholder='Comments' onChange={this.handleChange} noValidate />
                  {errors.comment.length > 0 && 
                    <span className='error'>{errors.comment}</span>}
                </div>
                <div className='submit'>
                  <button>Submit</button>
                </div>
                <div className='reset'>
                <button name="cancelForm" value="Reset" onClick={this.cancelForm}>Reset</button>
                </div>
              </form>
            </div>
          </div>
        );
      }
    }
    

export default Vform;