"use client"

import { useRef, RefObject, useState, ChangeEvent } from "react"
import classes from "./image-picker.module.css"
import Image from "next/image"

interface ImagePickerProps {
  label: string
  name: string
  register: any
  setValue: any
}

export default function ImagePicker({
  label,
  name,
  register,
  setValue,
}: ImagePickerProps) {
  const imageRef: RefObject<HTMLInputElement> = useRef(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setSelectedImage(fileReader.result as string)
        setValue(name, file) // Set the file in the form state
      }
      fileReader.readAsDataURL(file)
    } else {
      setSelectedImage(null)
      setValue(name, null)
    }
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
          // {...register("image")} // Register the input
          style={{ display: "none" }} // Hide the input
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  )
}
