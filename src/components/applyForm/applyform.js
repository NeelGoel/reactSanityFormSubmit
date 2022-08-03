import { useState } from 'react';
import style from './applyForm.module.css';
import sanityClient from "../../client";

const projectId = 'mnr9tu3f';
const datasetName = 'production';
const tokenWithWriteAccess = 'skAQZbJiFQawxaIkIbuZalP8QaFChZ7AoAW35sJGX3Tm0oPXQYQZYQVokGXTR9B1bpKG7YxDRn12eMSN0VLI8LFCPe0MDsz39f552Bm4ysHjErIU1DndlyX6c4YrGESy2e0uQdsXiskVdld7V1UGCMhJgZd5KGtye0Px6zRqgkga8EzTM1c6';

const ApplyForm  = (props) => {

    const [form, changeForm] = useState({name:'',email:'', number: '', description:''});
    const [disabled, changeDisabled] = useState(false);

    const submitFormData = () => {
        changeDisabled(true);
        const mutations = [{
            createOrReplace: {...form,
              _type: 'applyForm'
            }
          }]
          
          fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
            method: 'post',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${tokenWithWriteAccess}`
            },
            body: JSON.stringify({mutations})
          })
            .then(response => response.json())
            .then((result) => {
                fetchMailType();
            })
            .catch(error => console.error(error))
    }

    const fetchMailType = () => {
        var emailData = {};
        sanityClient.fetch(
            `
            *[_type == 'emailTemplate' && type == 'Query']{
                from,
                subject,
                password,
                body
              }
           `)
        .then((data) => {
            emailData = {
                to: form.email,
                name: form.name,
                desc: form.description,
                from: data[0].from,
                subject: data[0].subject,
                body: data[0].body,
                password: data[0].password
            }
            sendEmail({...emailData});
        })
        .catch(console.error);
    }

    const sendEmail = (emai) => {
        fetch('https://react-sanity-form-submit-server.vercel.app/sendemail',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emai)
        })
        .then(result => result.json())
        .then(data => {
            console.log(`email has been sent to ${data.name}`);
            changeDisabled(false);
            changeForm({name:'',email:'', number: '', description:''});
        })
        .catch((error) => {
            console.error(error);
          });
    }

    return(
        <div id="applyForm" ref={props.formRef} className={`${style.container} flex align_center gap`}>
            <div className='width-50 padding1'>
                <div className={`width-100 ${style.submitHead}`}>Submit Your Details</div>
                <div className='width-100 mg-tp2'>
                    <input id='name' name='name' value={form.name} onChange={(e) => changeForm({...form,[e.target.name]: e.target.value})} className='width-100 paddinghalf' type='text' placeholder='Enter Name' autoComplete='off' disabled={disabled} />
                </div>
                <div className='width-100 mg-tp1'>
                    <input id='email' name='email' value={form.email} onChange={(e) => changeForm({...form,[e.target.name]: e.target.value})} className='width-100 paddinghalf' type='text' placeholder='Enter Email ID' autoComplete='off' disabled={disabled} />
                </div>
                <div className='width-100 mg-tp1'>
                    <input id='number' name='number' value={form.number} onChange={(e) => changeForm({...form,[e.target.name]: e.target.value})} className='width-100 paddinghalf' type='number' placeholder='Enter Mobile Number' autoComplete='off' disabled={disabled} />
                </div>
                <div className='width-100 mg-tp1'>
                    <textarea id='description' name='description' value={form.description} onChange={(e) => changeForm({...form,[e.target.name]: e.target.value})} rows="4" cols="78" placeholder='Enter short description about you' disabled={disabled} />
                </div>
                <div className='width-100 mg-tp1'>
                    <button onClick={submitFormData} disabled={disabled} className={`${style.appBtn} width-100 paddinghalf flex gap justify_center align_center`}>
                        Apply
                        { disabled && <div className="loader"></div>}
                    </button>
                </div>
            </div>
            <div className={`width-50 padding1 ${style.googlecontainer}`}>
            <div className='pin'></div>
            <div className='pulse'></div>
            </div>
        </div>
    )
}

export default ApplyForm;