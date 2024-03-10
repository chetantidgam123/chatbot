import React, { useEffect, useState } from 'react'
import { post_data } from '../services/ApiService';
import { Modal } from 'react-bootstrap';

const TemplateList = () => {
  const [list, setList] = useState([]);
  const [addtemplateModal, setAddtemplateModal] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    getList()
  }, []);

  const getList = async () => {
    await post_data('/getTemplaltes', {}, {}).then((res) => {
      if (res.data.status) {
        setList(res.data.result);
      }
    }).catch((_e) => {
      console.log(_e);
    })
  }
  const AddTemplate = async () => {
    await post_data('/add-template', {content:content}, {}).then((res) => {
      if (res.data.status) {
        setAddtemplateModal(false);
        getList();
      }
    }).catch((_e) => {
      console.log(_e);
    })
  }

  return (
    <div className=''>
      <div className="d-flex justify-content-between my-2">
        <h3>TemplateList</h3>
        <button className='btn btn-primary' onClick={() => { setAddtemplateModal(true);setContent('') }}>Add Tempalte</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">sr no</th>
            <th scope="col">Content</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 && list.map((tem, index) =>
            <tr key={'_temp' + index}>
              <td>{index + 1}</td>
              <td>{tem.content}</td>
              <td>switch</td>
            </tr>
          )
          }
        </tbody>
      </table>
      <Modal show={addtemplateModal} centered={true} onHide={() => { setAddtemplateModal(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <textarea name="content" id="content" cols="30" rows="10" value={content} onChange={(e) => { setContent(e.target.value) }}></textarea>
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

export default TemplateList