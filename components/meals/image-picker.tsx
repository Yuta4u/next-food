"use client"

import { useRef, RefObject, useState } from "react"
import classes from "./image-picker.module.css"
import Image from "next/image"

type ImagePickerProps = {
  label: string
  name: string
}

export default function ImagePicker({ label, name }: any) {
  const imageRef: RefObject<HTMLInputElement> = useRef(null)
  const [selectedImage, setSelectedImage]: any = useState(null)

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  const handleOnChange = (event: any) => {
    const file = event.target.files[0]

    if (!file) {
      setSelectedImage(null)
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      setSelectedImage(fileReader.result)
      return
    }

    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.review}>
          {!selectedImage && <p>No Image Selected</p>}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected image"
              width={200}
              height={200}
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpg"
          name={name}
          ref={imageRef}
          onChange={handleOnChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  )
}
