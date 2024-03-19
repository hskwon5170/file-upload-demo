'use server';

import axios from 'axios';

export default async function create(_formData: FormData) {
  const form = new FormData();
  const imageFiles = _formData.getAll('image');
  const image = _formData.get('image');
  console.log('이미지.......!!', image);
  console.log('이미지입니다.sas.', imageFiles);
  imageFiles.forEach((file) => {
    form.append('file', file);
  });

  try {
    const response = await axios.post('http://10.1.1.190:8084/api/files/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.status);
    console.log('응답', response);
  } catch (error) {
    console.error(error);
  }
}
