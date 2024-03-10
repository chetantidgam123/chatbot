import React, { useEffect, useState } from 'react'
import { post_data } from '../services/ApiService';
import { Modal } from 'react-bootstrap';

const KeyList = () => {
  const [list, setList] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [addtemplateModal, setAddtemplateModal] = useState(false);
  const [form, setForm] = useState({key:'',template_ids:''});

  useEffect(() => {
    getList()
  }, []);

  const getList = async () => {
    await post_data('/getkeys', {}, {}).then((res) => {
      if (res.data.status) {
        setList(res.data.result);
      }
    }).catch((_e) => {
      console.log(_e);
    })
  }
  const AddTemplate = async () => {
    let _json = {
      keyword:form.key,
      template_ids:form.template_ids
    }
    await post_data('/add-keyword', _json, {}).then((res) => {
      if (res.data.status) {
        setAddtemplateModal(false);
        getList();
      }
    }).catch((_e) => {
      console.log(_e);
    })
  }

  const getTemplateList = async () => {
    await post_data('/getTemplaltes', {}, {}).then((res) => {
      if (res.data.status) {
        setAddtemplateModal(true);
        setTemplateList(res.data.result);
      }
    }).catch((_e) => {
      console.log(_e);
    })
  }

  return (
    <div className=''>
      <div className="d-flex justify-content-between my-2">
        <h3>Key List</h3>
        <button className='btn btn-primary' onClick={() => { getTemplateList(); setForm({template_ids:'',key:''}) }}>Add Key</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">sr no</th>
            <th scope="col">Key</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 && list.map((tem, index) =>
            <tr key={'_temp' + index}>
              <td>{index + 1}</td>
              <td>{tem.keyword}</td>
              <td>switch</td>
            </tr>
          )
          }
        </tbody>
      </table>
      <Modal show={addtemplateModal} centered={true} onHide={() => { setAddtemplateModal(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <input name="key" type="text" className='form-control my-2' value={form.key} onChange={(e) => { setForm({...form,key:e.target.value}) }} />
            <select name="template_ids" id="" className='form-select' value={form.template_ids} onChange={(e) => { setForm({...form,template_ids:e.target.value}) }}>
              <option value="">Select template</option>
             {
               templateList.map((temp,index)=>
               <option key={index} value={temp.id}>{temp.content}</option>
               )
             }
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' onClick={AddTemplate}>Submit</button>
          <button className='btn btn-primary' onClick={() => { setAddtemplateModal(false) }}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default KeyList