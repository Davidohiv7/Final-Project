import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from "react-dropzone";
import ImageWrapper from './ImageWrapper/ImageWrapper';
import axios from 'axios';


//Imports Material UI components:
import { Box, CardContent, TextField, InputAdornment, Button, Paper, Typography }from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './styles';

import { getCategories } from '../../../../actions/admin/admin_actions';


export default function CreateForm() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        price: undefined,
        stock: 0,
        description: '',
        categories: [],
        images: []
    })

    useEffect(() => {
        setProduct({
            ...product,
            categories: selectedCategories
        })
    }, [selectedCategories])
    
    const handleSubmit= () => {
        console.log(product)
    }
    
    const categories = useSelector((state) => state.adminReducer.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    },[])

    const classes = useStyles();

    const onDelete = async (file) => {
        try {   
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/image/cloudinary/${file.public_id}`)
            console.log("/////// CLOUDINARY DELETE RESPONSE: ", res);
            setUploadedFiles((curr) => curr.filter((item) => item.name !== file.name));
        } catch (error) {
            console.log("Couldn't delete the selected image.", error)
        }
    }   

    const onDrop = (acceptedFiles) => {
        
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

        acceptedFiles.forEach(async (acceptedFile) => {

            const formData = new FormData();
            formData.append('file', acceptedFile);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);

            const response = await fetch(url, {
                method: "post",
                body: formData,
            });
            const data = await response.json();
            setUploadedFiles((old) => [...old, data]);
        })
    };

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
                    <TextField onChange= {(e)=> setProduct({...product, name: e.target.value})} className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <TextField onChange= {(e)=> setProduct({...product, price: e.target.value})} className= {classes.input} id="outlined-number" label="Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>

                    <TextField onChange= {(e)=> setProduct({...product, stock: e.target.value})} className= {classes.input} id="outlined-number" label="Stock" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>
                    <TextField onChange= {(e)=> setProduct({...product, description: e.target.value})} className= {classes.input} id="outlined-basic" label="Description" variant="outlined" multiline />

                <Autocomplete
                    id= 'categorySelector'
                    className = {classes.input}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
                    onChange={(e, v) => {
                        if(v){
                            if(!selectedCategories.includes(v.name)) {
                                if(selectedCategories.length >= 10) alert('You can set up to 10 categories to a single product.')
                                else setSelectedCategories([...selectedCategories, v.name])
                            }
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
                    Drag & drop product images
                </div>

                <ul>
                    {uploadedFiles.map((file) => (
                    <li key={file.name}>
                        <ImageWrapper
                            file={file}
                            onDelete={onDelete}
                        />
                    </li>
                    ))}
                </ul>
                

                    <Button onClick={handleSubmit} className = {classes.button}>Create</Button>
                </form>
            </CardContent>
    </Box>
    )
}