import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { uploadImage } from "../api/cloudinary";

export default function ItemInsert() {
  const [form, setForm] = useState({ name: '', category: '', img1: '', img2: '', img3: '', content: '', price: '', option: [], count: [], tag: [] });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name.startsWith('img')) {
      handleUpload(name, event.target.files[0]);
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    }
  }

  const handleOptionChange = (index, event) => {
    const newOptions = [...form.option];
    newOptions[index] = event.target.value;
    setForm({ ...form, option: newOptions });
  }

  const handleCountChange = (index, event) => {
    const newCounts = [...form.count];
    newCounts[index] = event.target.value;
    setForm({ ...form, count: newCounts });
  }

  const handleTagChange = (index, event) => {
    const newTag = [...form.tag];
    newTag[index] = event.target.value;
    setForm({ ...form, tag: newTag });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const requestData = {
      name: form.name,
      category: form.category,
      img1: form.img1,
      img2: form.img2,
      img3: form.img3,
      content: form.content,
      price: form.price,
      option: form.option,
      count: form.count,
      tag: form.tag
    };
  
    axios
      .post('/ft/item/insert', requestData)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleAddOptionAndCount = () => {
  // 새로운 요소 추가 시 공백 대신 빈 문자열 추가
  const updatedOption = [...form.option, '']; // 빈 문자열 추가
  const updatedCount = [...form.count, '']; // 빈 문자열 추가

  setForm({
    ...form,
    option: updatedOption,
    count: updatedCount
  });
}

  const handleAddTag = () => {
    setForm({ ...form, tag: [...form.tag, ''] });
  }

  const handleUpload = (name, file) => {
    if (file) {
      uploadImage(file).then(url => {
        setForm(prevForm => ({
          ...prevForm,
          [name]: url
        }));
      }).catch(error => {
        console.error('Error uploading image:', error);
      });
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
  <Card style={{ width: '80%', display: 'inline-block' }}>
    <CardContent style={{ width: '90%', display: 'inline-block', textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='상품명' name='name' value={form.name} onChange={handleChange} style={{ marginBottom: '10px', width: '90%' }} />
        </div>
        <div>
          <TextField label='가구종류' name='category' value={form.category} onChange={handleChange} style={{ marginBottom: '10px', width: '90%' }} />
        </div>
        <div>
          <TextField label='가격' name='price' value={form.price} onChange={handleChange} style={{ marginBottom: '10px', width: '90%' }} />
        </div>
        <div>
          <TextField label='내용' name='content' value={form.content} onChange={handleChange} style={{ marginBottom: '10px', width: '90%' }} />
        </div>
        <div style={{ textAlign: 'left' , marginLeft:50, marginBottom: '10px'}}>
          <label>옵션: </label>
          {form.option.map((opt, index) => (
            <TextField key={index} label={`옵션 ${index + 1}`} value={opt} onChange={(e) => handleOptionChange(index, e)} style={{ marginRight: '10px', width: '20%', fontSize: '10px' }} />
          ))}
          <Button variant='contained' onClick={handleAddOptionAndCount} style={{ marginBottom: '10px', padding: '5px 10px', minWidth: 'unset' }}>옵션/갯수 추가</Button>
        </div>
        <div style={{ textAlign: 'left' , marginLeft:50, marginBottom: '10px'}}>
          <label>갯수: </label>
          {form.count.map((cnt, index) => (
            <TextField key={index} label={`갯수 ${index + 1}`} value={cnt} onChange={(e) => handleCountChange(index, e)} style={{ marginRight: '10px', width: '20%' }} />
          ))}
        </div>
        <div style={{ textAlign: 'left' , marginLeft:50, marginBottom: '10px'}}>
          <label>태그: </label>
          {form.tag.map((tag, index) => (
            <TextField key={index} label={`태그 ${index + 1}`} value={tag} onChange={(e) => handleTagChange(index, e)} style={{ marginRight: '10px', width: '20%' }} />
          ))}
          <Button variant='contained' onClick={handleAddTag} style={{ marginBottom: '10px', padding: '5px 10px', minWidth: 'unset' }}>추가</Button>
        </div>
        <div style={{ textAlign: 'left' , marginLeft:50, marginBottom: '10px'}}>
          <img src={form.img1} alt={form.img1} style={{ width: '70%', height: 400 }} />
          <input type="file" accept="image/*" onChange={(e) => handleUpload('img1', e.target.files[0])} />
        </div>
        <div style={{ textAlign: 'left' , marginLeft:50, marginBottom: '10px'}}>
          <img src={form.img2} alt={form.img2} style={{ width: '70%', height: 400 }} />
          <input type="file" accept="image/*" onChange={(e) => handleUpload('img2', e.target.files[0])} />
        </div>
        <div style={{ textAlign: 'left' , marginLeft:50, marginBottom: '10px'}}>
          <img src={form.img3} alt={form.img3} style={{ width: '70%', height: 400 }} />
          <input type="file" accept="image/*" onChange={(e) => handleUpload('img3', e.target.files[0])} />
        </div>
        <Button type='submit' variant='contained' style={{ marginTop: '10px' }}>등록</Button>
      </form>
    </CardContent>
  </Card>
</div>
  );
}