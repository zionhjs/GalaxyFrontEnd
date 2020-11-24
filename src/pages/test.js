import React, { useState, useEffect, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import styles from './test.css'
import json from '../data/blogDetail.json'

export default function () {
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log(value)
  })
  let richText = useMemo(()=>{
    return json.article.replace(/\<img/gi, '<img class="rich-img" ')
  },json)
    return (
    <div className={styles.container}>
      <div className={styles.editor}><ReactQuill value={value} onChange={setValue} /></div>
      <div className={styles.htm} dangerouslySetInnerHTML={{ __html: value }}></div>
      <div className={styles.htm} dangerouslySetInnerHTML={{ __html: richText }}></div>
    </div>
  )
}