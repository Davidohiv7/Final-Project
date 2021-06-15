import React, { useEffect, useState, useCallBack } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from "react-dropzone";

//Imports Material UI components:
import { Box, CardContent, Tab, Tabs, TextField, InputAdornment, Button, Paper, Typography, useRadioGroup }from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';

import { getCategories } from '../../../../actions/admin/admin_actions';


export default function CreateForm() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const categories = useSelector((state) => state.adminReducer.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    },[])

    const classes = useStyles();

    const onDrop = (acceptedFiles) => {
        setUploadedFiles([...acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })), ...uploadedFiles]);
      }

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [uploadedFiles]);

    // const onDrop = useCallback((acceptedFiles) => {
    //     const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    //     acceptedFiles.forEach(async (acceptedFile) => {
    //         // TODO: get signature and timestamp

    //         const formData = new FormData();
    //         formData.append('file', acceptedFile);
    //         formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    //         // formData.append("signature", signature);
    //         // formData.append("timestamp", timestamp);
    //         formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

    //         const response = await fetch(url, {
    //             method: "post",
    //             body: formData,
    //         });
    //         const data = await response.json();
    //         setUploadedFiles((old) => [...old, data]);
    //     })
    // }, []);

    // Use Dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: true,
        maxFiles: 4
    });


    return (
        <Box className={classes.root}>
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <TextField className= {classes.input} id="outlined-number" label="Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>

                    <TextField className= {classes.input} id="outlined-number" label="Stock" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>
                    <TextField className= {classes.input} id="outlined-basic" label="Description" variant="outlined" multiline />

                <Autocomplete
                    id= 'categorySelector'
                    className = {classes.input}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
                    onChange={(e,v) => {
                        if(!selectedCategories.includes(v.name)) {
                            if(selectedCategories.length >= 10) alert('You can set up to 10 categories to a single product.')
                            else setSelectedCategories([...selectedCategories, v.name])
                        }
                    }}
                />
                <Paper elevation={5} className = {classes.selectedCategories}>
                    {selectedCategories.map((category)=> (
                        <Paper key= {category} className= {classes.selectedCategory}>
                            <Typography>{category}</Typography>
                            <Button onClick= {() =>setSelectedCategories(selectedCategories.filter(c => c !== category))} value={category}  className= {classes.removeCategory}>X</Button>
                        </Paper>
                    ))}
                </Paper>
                
                <div
                    {...getRootProps()}
                    className={`${classes.dropzone} ${isDragActive ? classes.active : null}`}
                >
                    <input {...getInputProps()} />
                    Drop Zone
                </div>

                <ul>
                    {uploadedFiles.map((file) => (
                    <li key={file.name}>
                        <img
                            src={file.preview}
                        />
                        {/* <Image
                        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                        publicId={file.public_id}
                        width="100"
                        crop="scale"
                        /> */}
                    </li>
                    ))}
                </ul>
                

                    <Button className = {classes.button}>Create</Button>
                </form>
            </CardContent>
    </Box>
    )
}