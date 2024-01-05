import React, { useState ,useEffect} from 'react';
import { onTable ,onComplete} from './connect';
import './sty.css';
import { format } from 'date-fns';
import Select from 'react-select';
import axios from 'axios';


export const EcrInput = () => {

  const [finalArr, setFinalArr] = useState([]);
  const [selectedValues, setSelectedValues] = useState([])

const handleRollNo = (event) => {
  const inputValue = event.target.value;
  const regexPattern = /^(\d{2}[A-Z]{2}\d{3},)*\d{2}[A-Z]{2}\d{3}$/;


  if (regexPattern.test(inputValue)) {
    // If the input matches the regex pattern, split and map the values as before
    const valuesArray = inputValue
      .split(',')
      .map((value) => ({
        value: value.trim(),
        label: value.trim(),
      }));
    setSelectedValues(valuesArray);
    
  } else {
    console.log('Invalid input format');
  }
}
let result=[]
selectedValues.map((item)=>{
  if(!(result.includes(item.value))){
    result.push(item.value)
  }
})
const Validate=()=>{
  handleUpload1();
  handleUpload2();
  handleUpload3();
  handleUpload4();
  handleUpload5();
  result.map(item=>{
      CheckRollWithDb(item)
    })
    alert(finalArr)
}
console.log(finalArr)

const CheckRollWithDb=async(roll)=>{
try{
 const temp=await axios.get(`http://localhost:1234/seminar/compare/${roll}`)
 if((temp.data.results[0].number)!=0){
  if(!(finalArr.includes(roll))){
    setFinalArr(prevArr => [
        ...prevArr,
        roll
    ]);
  }
  console.log(roll+" found")
 }
 else{
  console.log(roll+" not found")
 }
}catch (error) {
  console.error("Error fetching data:", error);
}
 
}

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [option, setOptions] = useState([]);
  const eventOptions = option.map((val, key) => ({
    value: val.faculty_id+'-'+val.faculty_name,
    label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
  }));

  axios.get('http://localhost:1234/seminar/find')
        .then((response) => {
        //   console.log(response);
          setOptions(response.data.rows);
        })
        .catch((error) => {
          console.error('Error fetching options:', error);
        });

    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);
    const [selectedFile5, setSelectedFile5] = useState(null);
    const [newFileName, setNewFileName] = useState('');
    const [formData, setFormData] = useState({
        "completion_date":"",
        "event_photo_1":"",
        "event_photo_2":"",
        "event_photo_3":"",
        "event_photo_4":"",
        "event_photo_5":"",
        "event_po":"",
        "event_date_from":"",
        "event_date_to":"",
        "event_organizing_secretary":"",
        "participants_list":"",
        "event_time":"",
        "event_description":"",
        "event_budget_utilized":""
      });
    //   const report=JSON.parse(sessionStorage.getItem("report_id"))
      
    //   console.log("report_id "+ report.report_id)
    // const [report_id, setreport_id] = useState('');
    // const handlereport_id = (e) => {
    //     setreport_id(e.target.value);
    //   };
    
  const[facid,setFacid]=useState([])

  const handleChange = (eve) => {
      let updatedFacidString = facid;
      for (var i = 0; i < eve.length; i++) {
        const valueToAdd = eve[i].value;
    
        if (!updatedFacidString.includes(valueToAdd)) {
          if (updatedFacidString && updatedFacidString.length>1) {

            updatedFacidString += ','; // Add a comma as a separator
          }
          updatedFacidString += valueToAdd;
          // alert("setFacid works");
        }
      }
      setFacid(updatedFacidString);
      setSelectedOptions(eve);
    
      setFormData((old) => {
        return {
          ...old,
          event_organizing_secretary: updatedFacidString
        }
      })
    }
    // console.log(formData)
    const submit=async()=>{
    
      console.log(formData)
      sessionStorage.removeItem("report_id")
        // alert(Data.report_id)
        try{
        const temp = await onComplete(formData,Data.report_id)
        alert(temp.message)
        }
        catch(err){
            alert("Error in entering data")
        }
        window.location.assign("/ecr")
    }
      const [Data, setData] = useState('');
      const handleNewFileNameChange = () => {
        const report=JSON.parse(sessionStorage.getItem("report_id"))
        setNewFileName(report.event_title);
      };
      useEffect(() =>{
        handlereport();
        
       },[])
      const handlereport = async() => {
        try{
        const report=JSON.parse(sessionStorage.getItem("report_id"))
        // alert(report.report_id)
        const temp=await onTable(report.report_id)
        setData(temp)
        // alert(temp.event_title)
        handleNewFileNameChange();
        }
        catch(err){
          // alert("An error Occur")
          // window.location.assign("/ecr")
        }

      }
      const report=JSON.parse(sessionStorage.getItem("report_id"))
      // alert(report.report_id)
      
        
// console.log(newFileName)
      // console.log(formData)
    
      const handleInputChange = (e) => {
        const { name, value, type} = e.target;
        const newValue = value;
        
        setFormData({
          ...formData,
          [name]: newValue,
        });
      //  if(name=="event_description"){
      //   handleUpload1();
      //  }
        setFormData((old) => {
          const date = new Date(); // Replace with your actual date value
          const currentDate = format(date, 'dd-MM-yyyy');
          
          return {
            ...old,
            completion_date: currentDate
          }})
        try{
        const arrayAsString = formData.event_po.join(", ");
        setFormData({
            ...formData,
            event_po: arrayAsString,
          })
          // alert(arrayAsString)
        }
        catch(err){

        }
      };
    
      const handlePoChange = (e) => {
        const { name, checked } = e.target;
    
        if (checked) {
          setFormData({
            ...formData,
            event_po: [...formData.event_po, name],
          });
        } else {
          setFormData({
            ...formData,
            event_po: formData.event_po.filter((event_po) => event_po !== name),
          });
        }
      };
    
    
  
    const handleFileChange1 = (e) => {
      // alert(JSON.stringify(e.target.files))
      // alert(e.target.files)
      setSelectedFile1(e.target.files[0]);
      const file = e.target.files[0];

      // Check if the file size is below 2MB
      if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
      }
      else{
      
      // alert(selectedFile1);
      
      }
    };
    const handleFileChange2 = (e) => {
        
        const file = e.target.files[0];

      // Check if the file size is below 2MB
      if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
      }
      setSelectedFile2(e.target.files[0]);
     
      };
      const handleFileChange3 = (e) => {
        const file = e.target.files[0];

      // Check if the file size is below 2MB
      if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
      }
        setSelectedFile3(e.target.files[0]);
      
      };
      const handleFileChange4 = (e) => {
        const file = e.target.files[0];

      // Check if the file size is below 2MB
      if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
      }
        setSelectedFile4(e.target.files[0]);
       
      };
      const handleFileChange5 = (e) => {
        const file = e.target.files[0];

      // Check if the file size is below 2MB
      if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
      }
        setSelectedFile5(e.target.files[0]);
       

      };
  
 
  
  
    const handleUpload1 = () => {
      // alert("handle upload working")
      if (selectedFile1) {
          const formData1 = new FormData();
          const currentDate = new Date();

const dd = String(currentDate.getDate()).padStart(2, '0');
const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
const yyyy = currentDate.getFullYear();

const hh = String(currentDate.getHours()).padStart(2, '0');
const min = String(currentDate.getMinutes()).padStart(2, '0');
const ss = String(currentDate.getSeconds()).padStart(2, '0');

const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
 // Maximum value for the random number
let random =Math.random()*Math.random()*1;
          const name1=newFileName+'1_'+dateTimeString+'_'+random+'.png';
          // random =Math.random()*Math.random()*2;
          // setTimeout(() =>  200000);

          setFormData((old)=>{
            return{
            ...old,
            event_photo_1: name1
            }
            // event_photo_2: name2,
            // event_photo_3: name3,
            // event_photo_4: name4,
            // event_photo_5: name5,
          });
          // const name2=newFileName+'2_'+dateTimeString+'_'+random+'.png';
          // random =Math.random()*Math.random()*3;
          // const name3=newFileName+'3_'+dateTimeString+'_'+random+'.png';
          // random =Math.random()*Math.random()*4;
          // const name4=newFileName+'4_'+dateTimeString+'_'+random+'.png';
          // random =Math.random()*Math.random()*5;
          // const name5=newFileName+'5_'+dateTimeString+'_'+random+'.png';
          formData1.append('file',selectedFile1,name1 );
          // alert("Hello");
          
          
          
       
    
          fetch('http://localhost:1234/ecr/upload1', {
            method: 'POST',
            body: formData1,
          })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error('Error uploading the file:', error);
            })
            
            alert(formData.event_photo_1); 
          }
       
      }
      const handleUpload2 = () => {
        if (selectedFile2 ) {
            const formData2 = new FormData();
            const currentDate = new Date();

            const dd = String(currentDate.getDate()).padStart(2, '0');
            const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
            const yyyy = currentDate.getFullYear();
            
            const hh = String(currentDate.getHours()).padStart(2, '0');
            const min = String(currentDate.getMinutes()).padStart(2, '0');
            const ss = String(currentDate.getSeconds()).padStart(2, '0');
            
            const dateTimeString = `${dd}-${mm}-${yyyy} ${hh}-${min}-${ss}`;
            // let random =Math.random()*Math.random()*1;
            // const name1=newFileName+'1_'+dateTimeString+'_'+random+'.png';
            let random =Math.random()*Math.random()*2;
            const name2=newFileName+'2_'+dateTimeString+'_'+random+'.png';
            // random =Math.random()*Math.random()*3;
            // const name3=newFileName+'3_'+dateTimeString+'_'+random+'.png';
            // random =Math.random()*Math.random()*4;
            // const name4=newFileName+'4_'+dateTimeString+'_'+random+'.png';
            // random =Math.random()*Math.random()*5;
            // const name5=newFileName+'5_'+dateTimeString+'_'+random+'.png';
            formData2.append('file', selectedFile2,name2 );
            // alert("Hello");
            setFormData({
              ...formData,
              // event_photo_1: name1,
              event_photo_2: name2,
              // event_photo_3: name3,
              // event_photo_4: name4,
              // event_photo_5: name5,
            });
            fetch('http://localhost:1234/ecr/upload1', {
                method: 'POST',
                body: formData2,
              })
                .then((response) => response.text())
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.error('Error uploading the file 2:', error);
                })
          
               
        }
    }

    const handleUpload3 = () => {
      if (selectedFile3) {
          const formData3 = new FormData();
          const currentDate = new Date();

          const dd = String(currentDate.getDate()).padStart(2, '0');
          const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
          const yyyy = currentDate.getFullYear();
          
          const hh = String(currentDate.getHours()).padStart(2, '0');
          const min = String(currentDate.getMinutes()).padStart(2, '0');
          const ss = String(currentDate.getSeconds()).padStart(2, '0');
          
          const dateTimeString = `${dd}-${mm}-${yyyy} ${hh}-${min}-${ss}`;
          const random =Math.random()*Math.random()*4;
          const name3=newFileName+'3_'+dateTimeString+'_'+random+'.png';
          formData3.append('file', selectedFile3,name3 );
         
          setFormData({
              
            ...formData,
            event_photo_3: name3,
          })

          fetch('http://localhost:1234/ecr/upload1', {
              method: 'POST',
              body: formData3,
            })
              .then((response) => response.text())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error('Error uploading the file 3:', error);
              })
        
             
      }
  }

  const handleUpload4 = () => {
    if (selectedFile4 ) {
        const formData4 = new FormData();
        const currentDate = new Date();

        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy} ${hh}-${min}-${ss}`;
        const random =Math.random()*Math.random()*5;
        const name4=newFileName+'4_'+dateTimeString+'_'+random+'.png';
        formData4.append('file', selectedFile4,name4 );
       
        setFormData({
            
          ...formData,
          event_photo_4: name4,
        })
        fetch('http://localhost:1234/ecr/upload1', {
            method: 'POST',
            body: formData4,
          })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error('Error uploading the file 4:', error);
            })
      
           
    }
}


      const handleUpload5 = () => {

        if (selectedFile5 ) {
            const formData5 = new FormData();
            const currentDate = new Date();

            const dd = String(currentDate.getDate()).padStart(2, '0');
            const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
            const yyyy = currentDate.getFullYear();
            
            const hh = String(currentDate.getHours()).padStart(2, '0');
            const min = String(currentDate.getMinutes()).padStart(2, '0');
            const ss = String(currentDate.getSeconds()).padStart(2, '0');
            
            const dateTimeString = `${dd}-${mm}-${yyyy} ${hh}-${min}-${ss}`;
            let random =Math.random()*Math.random()*1;
            const name1=newFileName+'1_'+dateTimeString+'_'+random+'.png';
            random =Math.random()*Math.random()*2;
            const name2=newFileName+'2_'+dateTimeString+'_'+random+'.png';
            random =Math.random()*Math.random()*3;
            const name3=newFileName+'3_'+dateTimeString+'_'+random+'.png';
            random =Math.random()*Math.random()*4;
            const name4=newFileName+'4_'+dateTimeString+'_'+random+'.png';
            // let random = Math.random()*Math.random()*5;
            const name5=newFileName+'5_'+dateTimeString+'_'+random+'.png';
            formData5.append('file', selectedFile5,name5 );
            // alert("Hello");
            setFormData({
              ...formData,
              event_photo_1: name1,
              event_photo_2: name2,
              event_photo_3: name3,
              event_photo_4: name4,
              event_photo_5: name5,
            });
            fetch('http://localhost:1234/ecr/upload1', {
                method: 'POST',
                body: formData5,
              })
                .then((response) => response.text())
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.error('Error uploading the file 5:', error);
                })
              
                
              
                

        }
    }
   
    // const delay = async () => {
    //   // Introduce a 20-second delay
    //   await new Promise(resolve => setTimeout(resolve, 20000));
    //   // Call the delayed action after the delay
    //   submit();
    // };
console.log(formData);
      
      
  
    return (
        <>
        
    
     <h2>.</h2>
     <div>
        <p>.</p>
        <p>.</p>
     </div>
      <div>
        {/* <input type="file" accept="image/*" onChange={handleFileChange1} /> */}
        {/* <input
          type="text"
          placeholder="Enter new file name"
          value={newFileName}
          onChange={handleNewFileNameChange}
        /> */}
        
         {/* <input
          type="text"
          placeholder="Enter new file name"
          value={report_id}
          onChange={handlereport_id}
        />
     
        <button onClick={handlereport}>send report_id</button> */}
        
      </div>

     
      
      <div className='form'>

      <label htmlFor="event_photo_1">Photo 1: (To be displayed on the front page)</label>
<input
  type="file"
  id="event_photo_1"
  name="event_photo_1"
  accept="image/*"
  onChange={handleFileChange1}
  required  // Add 'required' if the image is mandatory
  maxSize="2MB"  // Maximum allowed size (this is not standard HTML, will need custom handling)
/><br />


      <label htmlFor="event_photo_2">Photo 2: (To be displayed in the front page)</label>
      <input
  type="file"
  id="event_photo_2"
  name="event_photo_2"
  accept="image/*"
  onChange={handleFileChange2}
  required  // Add 'required' if the image is mandatory
  maxSize="2MB"  // Maximum allowed size (this is not standard HTML, will need custom handling)
/><br />

      <label htmlFor="event_photo_3">Photo 3:</label>
      <input
  type="file"
  id="event_photo_3"
  name="event_photo_3"
  accept="image/*"
  onChange={handleFileChange3}
  required  // Add 'required' if the image is mandatory
  maxSize="2MB"  // Maximum allowed size (this is not standard HTML, will need custom handling)
/><br />

      <label htmlFor="event_photo_4">Photo 4:</label>
      <input
  type="file"
  id="event_photo_4"
  name="event_photo_4"
  accept="image/*"
  onChange={handleFileChange4}
  required  // Add 'required' if the image is mandatory
  maxSize="2MB"  // Maximum allowed size (this is not standard HTML, will need custom handling)
/><br />

      <label htmlFor="event_photo_5">Photo 5:</label>
      <input
  type="file"
  id="event_photo_5"
  name="event_photo_5"
  accept="image/*"
  onChange={handleFileChange5}
  required  // Add 'required' if the image is mandatory
  maxSize="2MB"  // Maximum allowed size (this is not standard HTML, will need custom handling)
/><br />
      
     
      
      
      <label htmlFor="event_budget_utilized">Budget Utilized:</label>
      <input type="text" id="event_budget_utilized" name="event_budget_utilized" value={formData.event_budget_utilized} onChange={handleInputChange}  /><br />
      <label htmlFor="event_po">Program Outcomes:</label>
      <div>
        <label>

          <input className='po-checkbox' type="checkbox" name="PO1" checked={formData.event_po.includes('PO1')} onChange={handlePoChange} />
          PO1
       
          <input className='po-checkbox' type="checkbox" name="PO2" checked={formData.event_po.includes('PO2')} onChange={handlePoChange} />
          PO2
        
          <input className='po-checkbox' type="checkbox" name="PO3" checked={formData.event_po.includes('PO3')} onChange={handlePoChange} />
          PO3
      
          <input className='po-checkbox' type="checkbox" name="PO4" checked={formData.event_po.includes('PO4')} onChange={handlePoChange} />
          PO4
       
          <input className='po-checkbox' type="checkbox" name="PO5" checked={formData.event_po.includes('PO5')} onChange={handlePoChange} />
          PO5
        
          <input className='po-checkbox' type="checkbox" name="PO6" checked={formData.event_po.includes('PO6')} onChange={handlePoChange} />
          PO6
          </label>
        <label>
          <input className='po-checkbox' type="checkbox" name="PO7" checked={formData.event_po.includes('PO7')} onChange={handlePoChange} />
          PO7
      
          <input className='po-checkbox' type="checkbox" name="PO8" checked={formData.event_po.includes('PO8')} onChange={handlePoChange} />
          PO8
       
          <input className='po-checkbox' type="checkbox" name="PO9" checked={formData.event_po.includes('PO9')} onChange={handlePoChange} />
          PO9
        
          <input className='po-checkbox' type="checkbox" name="PO10" checked={formData.event_po.includes('PO10')} onChange={handlePoChange} />
          PO10
        
          <input className='po-checkbox' type="checkbox" name="PO11" checked={formData.event_po.includes('PO11')} onChange={handlePoChange} />
          PO11
        
          <input className='po-checkbox' type="checkbox" name="PO12" checked={formData.event_po.includes('PO12')} onChange={handlePoChange} />
          PO12
        </label>
        
      
      </div>

      <label htmlFor="event_date_from">Event Starting Date:</label>
      <input type="date" id="event_date_from" name="event_date_from" value={formData.event_date_from} onChange={handleInputChange}  /><br />

      <label htmlFor="event_date_to">Event End Date:</label>
      <input type="date" id="event_date_to" name="event_date_to" value={formData.event_date_to} onChange={handleInputChange}  /><br />


      <label htmlFor="event_organizing_secretary">Organizing Secretary:</label>
      <Select
        className="form-group"
        isMulti
        name="event_organizing_secretary"
        options={eventOptions}
        value={selectedOptions}
        onChange={handleChange}
        isSearchable
        placeholder="Select options..."
        closeMenuOnSelect={false}
       
      />

      <label htmlFor="participants_list">Students Participated in the event:</label>
      <input
        type="text"
        placeholder="Enter comma-separated roll numbers"
        onChange={handleRollNo}
      />
      <span> </span>
    <input type='button' className='validate-btn' value="Validate" onClick={Validate}/>
      {/* dropdown that show the roll no entered like selected options */}
      <Select
        className='form-group'
        isMulti
        name="participants_list"
        options={finalArr}
        value={finalArr}
        onChange={handleChange}
        isSearchable
        placeholder="Event Participants..."
        closeMenuOnSelect={false}
      />

      <label htmlFor="event_time">Time:</label>
      <input type="time" id="event_time" name="event_time" value={formData.event_time} onChange={handleInputChange} /><br />

      <label htmlFor="event_description">About the Event Paragraph:</label>
<textarea id="event_description" name="event_description" value={formData.event_description} onChange={handleInputChange}></textarea><br />
</div>
      <input type="submit"  onClick={submit} value="Submit" style={{marginLeft:'40%'}}/>
    
      </>
    );
  }
